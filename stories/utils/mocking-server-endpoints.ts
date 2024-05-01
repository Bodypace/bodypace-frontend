import { http, HttpResponse } from "msw";
import { type FileFixture } from "@fixtures/files";
import sodium, { Base64, toBase64 } from "@/lib/sodium";

export const mockServerEndpoint = {
  _info: {
    get: () =>
      http.get("/_info", () =>
        HttpResponse.json({
          serverUrl: "http://localhost:8080",
        }),
      ),
  },
  accounts: {
    get: (data: { sub: number } | null) =>
      // NOTE: Response type is specified here because TypeScript complains (and idk why)
      // when it's left unspecified (looks like inferring return type fails, idk why)
      http.get("http://localhost:8080/accounts", (): Response => {
        if (data === null) {
          return HttpResponse.json(
            {
              message: "Unauthorized",
              statusCode: 401,
            },
            {
              status: 401,
            },
          );
        }
        return HttpResponse.json({ ...data, username: "Jane Doe" });
      }),
  },
  documents: {
    upload: (data: FileFixture[]) =>
      http.post("http://localhost:8080/documents", async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get("name") as Base64;
        const content = formData.get("file") as Blob;
        const keys = formData.get("keys") as Base64;

        const newFile: FileFixture = {
          id: data.length + 1,
          name,
          keys,
          userId: 1,
          base64content: await toBase64(
            new Uint8Array(await content.arrayBuffer()),
          ),
        };

        data.push(newFile);

        return HttpResponse.json({});
      }),
    get: (data: FileFixture[] | null) =>
      http.get("http://localhost:8080/documents", () => {
        if (data === null) {
          return HttpResponse.error();
        }
        return HttpResponse.json(data);
      }),
    download: (data: FileFixture[]) =>
      http.get("http://localhost:8080/documents/:id", async ({ params }) => {
        const { id } = params;
        const file = data.find((file: FileFixture) => file.id === Number(id));
        if (file) {
          const blob = new Blob([
            await sodium.toBinaryFromBase64(file.base64content),
          ]);

          return new HttpResponse(blob, {
            headers: {
              "Content-Disposition": `attachment; filename="${file.name}"`,
              "Content-Type": "application/octet-stream",
            },
          });
        }
        return HttpResponse.error();
      }),
    delete: (data: FileFixture[]) =>
      http.delete("http://localhost:8080/documents/:id", ({ params }) => {
        const { id } = params;
        const fileIndex = data.findIndex(
          (file: FileFixture) => file.id === Number(id),
        );
        if (fileIndex !== -1) {
          data.splice(fileIndex, 1);
        }
        return HttpResponse.json({});
      }),
  },
};
