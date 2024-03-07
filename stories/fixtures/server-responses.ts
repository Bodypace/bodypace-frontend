import { http, HttpResponse } from "msw";
import { storyFiles } from "./files";

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
};

export default serverResponses;
