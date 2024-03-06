const mockedKey = {
  plain: "Mocked personal key don't use it",
  base64: "TW9ja2VkIHBlcnNvbmFsIGtleSBkb24ndCB1c2UgaXQ",
};

if (mockedKey.plain.length !== 32) {
  throw new Error("Mocked personal key should be 32 bytes long");
}

if (!btoa(mockedKey.plain).startsWith(mockedKey.base64)) {
  throw new Error("Mocked personal key should be base64 encoded correctly");
}

export default mockedKey;
