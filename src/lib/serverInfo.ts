"use client";

let serverUrl = "";

export async function getServerUrl() {
  if (serverUrl) {
    return serverUrl;
  }

  const response = await fetch("/_info");
  if (!response.ok) {
    throw new Error("failed to fetch personal data server url");
  }

  const { serverUrl: url } = await response.json();
  serverUrl = url;

  return serverUrl;
}
