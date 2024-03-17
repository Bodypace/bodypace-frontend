import sodium, { type Base64 } from "@/lib/sodium";
import { type FileMetadata } from "@/lib/files";
import mockedKey from "@fixtures/personal-key";

function generateKeyString(index: number) {
  const key = "this-is-mocked-key-for-file-#-" + String(index).padStart(2, "0");
  if (key.length !== 32) throw new Error("Key length is not 32");
  return key;
}

async function generateSampleFiles(
  fileNames: FileMetadata["name"][],
  personalKey: Base64,
) {
  return await Promise.all(
    fileNames.map(async (filename, index) => {
      const fileKey = await sodium.toBase64(generateKeyString(index));

      const name = await sodium.toBase64(
        await sodium.encryptData(
          await sodium.toBinaryFromUnicode(filename),
          await sodium.toBinaryFromBase64(fileKey),
        ),
      );

      const keys = await sodium.toBase64(
        await sodium.encryptData(
          await sodium.toBinaryFromBase64(fileKey),
          await sodium.toBinaryFromBase64(personalKey),
        ),
      );

      const base64content = await sodium.toBase64(
        await sodium.encryptData(
          await sodium.toBinaryFromUnicode(
            `This is mocked content for file #${index + 1}`,
          ),
          await sodium.toBinaryFromBase64(fileKey),
        ),
      );

      return {
        id: index + 1,
        name,
        keys,
        userId: 1,
        base64content,
      };
    }),
  );
}

export const fileNames: string[] = [
  "blood_work.pdf",
  "xray.jpg",
  "mri.jpg",
  "prescription.pdf",
  "blood_work_2.pdf",
  "cbct.jpg",
  "PET.dicom",
  "xray_interpretation.pdf",
  "diet_plan.pdf",
  "allergies_cheatsheet.jpg",
  "xray_lower_spine.jpg",
  "xray_pelvis.pdf",
  "allergies_test_result.pdf",
  "xray_knee.jpg",
  "urine_test_result.pdf",
  "medical_bill_1.pdf",
  "medical_bill_2.pdf",
  "medical_bill_3.pdf",
  "medical_bill_4.pdf",
  "medical_bill_5.pdf",
  "medical_bill_6.pdf",
];

if (new Set(fileNames).size !== fileNames.length) {
  // We need to assert that because checkboxes are labelled by file names.
  // (btw. don't worry, actual backend also does not allow duplicate file names)
  throw new Error("File names are not unique");
}

generateSampleFiles(fileNames, mockedKey.base64).then((generated) => {
  console.log(JSON.stringify(generated));
});
