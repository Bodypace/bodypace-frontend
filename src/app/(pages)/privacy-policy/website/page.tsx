import Document, {
  DocumentPart,
  DocumentPartType,
} from "@/components/atoms/document";

// prettier-ignore
const document: DocumentPart[] = [
  [ DocumentPartType.Paragraph, "Last updated on: 2024-04-25"],
  [ DocumentPartType.Title,     "Privacy Policy for website (bodypace.org) free beta version" ],
  [ DocumentPartType.Paragraph, 'Welcome to Bodypace.org (the "Website"). This Privacy Policy is designed to inform you about the types of information we collect, how we use it, and the choices you have regarding your information. By accessing or using our Website, you agree to the terms of this Privacy Policy.'],
  [ DocumentPartType.Header,    "1. Information We Collect" ],
  [ DocumentPartType.SubHeader, "1.1 Personal Information:"],
  [ DocumentPartType.Paragraph, "When you register an account with Bodypace.org, we collect certain personal information from you, including your chosen username and password. Your username can be any alphanumeric sequence of your choice, and we do not require or verify email addresses during registration."],
  [ DocumentPartType.SubHeader, "1.2 Uploaded Files:"],
  [ DocumentPartType.Paragraph, "As a cloud storage service, Bodypace.org allows users to upload files to our servers. These files are encrypted by your browser (client-side) before transmission to our servers. We do not have access to the content of your files, as they remain encrypted at all times."],
  [ DocumentPartType.SubHeader, "1.3 Encryption Keys:"],
  [ DocumentPartType.Paragraph, "Upon registration, a private encryption key is generated for you if your browser does not already have one stored locally. You have the option to set and delete your private encryption key through the settings page while logged in. We do not store or have access to your personal encryption keys. If you delete your personal key and forget it without storing a copy elsewhere, there is no way for you to access your uploaded data."],
  [ DocumentPartType.Header,    "2. Use of Information" ],
  [ DocumentPartType.SubHeader, "2.1 Account Deletion:"],
  [ DocumentPartType.Paragraph, "You can request the deletion of your account by contacting us at contact@bodypace.org. However, please note that even without action on your part, accounts and associated data may be deleted at any time without notice or justification, as Bodypace.org is currently in a free beta phase with no guarantee of data retention."],
  [ DocumentPartType.SubHeader, "2.2 File Management:"],
  [ DocumentPartType.Paragraph, "Logged-in users can upload, download, and delete files stored on Bodypace.org servers. Files are encrypted before transmission and remain encrypted on our servers. Decryption of files occurs client-side, requiring your personal encryption key for access."],
  [ DocumentPartType.SubHeader, "2.3 Service Improvement:"],
  [ DocumentPartType.Paragraph, "We may use aggregated and anonymized data for purposes such as improving our services, analyzing trends, and troubleshooting technical issues. This information does not identify individual users."],
  [ DocumentPartType.Header,    "3. API Usage" ],
  [ DocumentPartType.Paragraph, 'Through api.bodypace.org, users have the capability to upload files to Bodypace.org servers. It is important to note that files uploaded via the API are transmitted to our servers in an unencrypted format. Users are solely responsible for ensuring that any data uploaded via the API is encrypted prior to transmission. Bodypace.org strictly prohibits the upload of unencrypted data through our API, and users must comply with this requirement. We do not accept any liability for the security or privacy of unencrypted data uploaded through the API. Users should be aware that our servers utilize services such as Cloudflare, which may have access to user traffic. Therefore, violating the API Usage policy may compromise the security and privacy of user data.' ],
  [ DocumentPartType.Header,    "4. Third-Party Disclosure" ],
  [ DocumentPartType.SubHeader, "4.1 Disclosure for Correctly Uploaded Files:"],
  [ DocumentPartType.Paragraph, 'Bodypace.org does not disclose your personal information to third parties except as required by law or as necessary to provide our services. This holds true as long as users adhere to the guidelines outlined in "3. API Usage" and ensure that their files are encrypted before uploading. We do not sell, trade, or otherwise transfer your information to outside parties.'],
  [ DocumentPartType.SubHeader, "4.2 Disclosure in Case of API Misuse:"],
  [ DocumentPartType.Paragraph, 'If a user violates the "3. API Usage" policy by uploading unencrypted files, Bodypace.org cannot guarantee the security or privacy of their data. Our servers utilize services such as Cloudflare, which may have access to user traffic. Therefore, violating the "3. API Usage" policy may compromise the security and privacy of user data. If a user violates the "3. API Usage" policy by uploading unencrypted files, we cannot guarantee that their data was not obtained by third parties. Our cloud storage and cloud API is designed for end-to-end encryption, and it is only under these circumstances that we can uphold our promises of data security and privacy.' ],
  [ DocumentPartType.Header,    "5. Security" ],
  [ DocumentPartType.Paragraph, "We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure."],
  [ DocumentPartType.Header,    "6. Children" ],
  [ DocumentPartType.SubHeader, "6.1 Age Restriction:" ],
  [ DocumentPartType.Paragraph, "Our website is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If you are under the age of 13, please do not use our website or provide any personal information to us."],
  [ DocumentPartType.SubHeader, "6.2 Parental Notification:" ],
  [ DocumentPartType.Paragraph, "If you are a parent or guardian and believe that your child under the age of 13 has provided personal information to us, please contact us immediately at contact@bodypace.org. We will take steps to remove such information from our files as soon as possible."],
  [ DocumentPartType.SubHeader, "6.3 Compliance and Data Removal:" ],
  [ DocumentPartType.Paragraph, "If we become aware that we have inadvertently collected personal information from a child under the age of 13, we will take steps to delete that information as soon as possible."],
  [ DocumentPartType.SubHeader, "6.4 Parental Responsibility:" ],
  [ DocumentPartType.Paragraph, "Please note that even though we do not collect personal information from children under the age of 13, we cannot guarantee that a child may not provide personal information without parental consent. Therefore, we encourage parents and guardians to monitor their children’s use of our website and to contact us if they have any concerns."],
  [ DocumentPartType.Header,    "7. Changes to this Privacy Policy" ],
  [ DocumentPartType.Paragraph, "We reserve the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the Website after any changes signifies your acceptance of the revised Privacy Policy."],
  [ DocumentPartType.Header,    "8. Contact Us" ],
  [ DocumentPartType.Paragraph, "If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, please contact us at contact@bodypace.org."],
  [ DocumentPartType.Paragraph, "Thank you for using Bodypace.org!"],
]

export default function PrivacyPolicyPage() {
  return <Document document={document} />;
}
