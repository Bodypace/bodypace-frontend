export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  return Response.json({
    serverUrl: process.env.BODYPACE_PERSONAL_DATA_SERVER,
  });
}
