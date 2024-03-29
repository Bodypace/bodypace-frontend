import { http, HttpResponse } from "msw";
import { type FileFixture } from "@fixtures/files";
import sodium from "@/lib/sodium";

export const mockServerEndpoint = {
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
        return HttpResponse.json(data);
      }),
  },
  documents: {
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
