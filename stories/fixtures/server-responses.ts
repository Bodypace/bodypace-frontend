import { http, HttpResponse } from "msw";
import { storyFiles } from "./files";
import { type File } from "@/lib/files";

export const serverData = {
  documents: [...storyFiles],
};

export const serverLoaders = {
  account: {},
  documents: {
    loadNoDocuments: () => {
      serverData.documents = [];
    },
    loadFewDocuments: () => {
      serverData.documents = storyFiles.slice(0, 3);
    },
    loadManyDocuments: () => {
      serverData.documents = [...storyFiles];
    },
  },
};

const serverResponses = {
  account: {
    exists: http.get("http://localhost:8080/accounts", () => {
      return HttpResponse.json({
        sub: 12,
      });
    }),
    unknown: http.get("http://localhost:8080/accounts", () => {
      return HttpResponse.json(
        {
          message: "Unauthorized",
          statusCode: 401,
        },
        {
          status: 401,
        },
      );
    }),
  },
  documents: {
    networkError: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.error();
    }),
    empty: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json([]);
    }),
    few: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json(storyFiles.slice(0, 3));
    }),
    many: http.get("http://localhost:8080/documents", () => {
      return HttpResponse.json(storyFiles);
    }),
  },
  newapi: {
    documents: {
      get: http.get("http://localhost:8080/documents", () => {
        return HttpResponse.json(serverData.documents);
      }),
      delete: http.delete(
        "http://localhost:8080/documents/:id",
        ({ params }) => {
          const { id } = params;
          const fileIndex = serverData.documents.findIndex(
            (file: File) => file.id === Number(id),
          );
          if (fileIndex !== -1) {
            serverData.documents.splice(fileIndex, 1);
          }
          return HttpResponse.json({});
        },
      ),
    },
  },
};

export default serverResponses;
