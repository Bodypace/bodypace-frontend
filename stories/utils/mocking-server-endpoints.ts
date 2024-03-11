import { http, HttpResponse } from "msw";
import { type File } from "@/lib/files";

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
    get: (data: File[] | null) =>
      http.get("http://localhost:8080/documents", () => {
        if (data === null) {
          return HttpResponse.error();
        }
        return HttpResponse.json(data);
      }),
    delete: (data: File[]) =>
      http.delete("http://localhost:8080/documents/:id", ({ params }) => {
        const { id } = params;
        const fileIndex = data.findIndex(
          (file: File) => file.id === Number(id),
        );
        if (fileIndex !== -1) {
          data.splice(fileIndex, 1);
        }
        return HttpResponse.json({});
      }),
  },
};
