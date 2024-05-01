import Document, {
  DocumentPart,
  DocumentPartType,
} from "@/components/atoms/document";

//prettier-ignore
const document: DocumentPart[] = [
  [ DocumentPartType.Paragraph, "Last updated on: 2024-04-25"],
  [ DocumentPartType.Title,     "Privacy Policy for mobile app"],
  [ DocumentPartType.Paragraph, "This privacy policy governs the manner in which our mobile application collects, uses, maintains and discloses information collected from users (each, a “User”) of the app."],
  [ DocumentPartType.Header,    "1. Information collection and use"],
  [ DocumentPartType.Paragraph, "The app is designed to record and track a User’s daily water intake and calorie intake (i.e., what the User has eaten during the day). No personally identifiable information is collected, stored or transmitted by the app. The app does not require any registration or login information and operates entirely offline. All data is stored locally on the User’s device and is accessible only by the User."],
  [ DocumentPartType.Header,    "2. Sharing of information"],
  [ DocumentPartType.Paragraph, "The app does not share any information with third parties or other users. The data is stored locally on the User’s device and is not transmitted or shared in any way."],
  [ DocumentPartType.Header,    "3. Security"],
  [ DocumentPartType.Paragraph, "The app takes reasonable precautions to protect the User’s data from unauthorized access, modification, disclosure, or destruction. However, no security measures are perfect, and we cannot guarantee the security of User data stored on the device."],
  [ DocumentPartType.Header,    "4. Children"],
  [ DocumentPartType.SubHeader, "4.1 Age Restriction:" ],
  [ DocumentPartType.Paragraph, "Our app is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If you are under the age of 13, please do not use our app or provide any personal information to us."],
  [ DocumentPartType.SubHeader, "4.2 Parental Notification:" ],
  [ DocumentPartType.Paragraph, "If you are a parent or guardian and believe that your child under the age of 13 has provided personal information to us, please contact us immediately at contact@bodypace.org. We will take steps to remove such information from our files as soon as possible."],
  [ DocumentPartType.SubHeader, "4.3 Compliance and Data Removal:" ],
  [ DocumentPartType.Paragraph, "If we become aware that we have inadvertently collected personal information from a child under the age of 13, we will take steps to delete that information as soon as possible."],
  [ DocumentPartType.SubHeader, "4.4 Parental Responsibility:" ],
  [ DocumentPartType.Paragraph, "Please note that even though we do not collect personal information from children under the age of 13, we cannot guarantee that a child may not provide personal information without parental consent. Therefore, we encourage parents and guardians to monitor their children’s use of our app and to contact us if they have any concerns."],
  [ DocumentPartType.Header,    "5. Changes to this Privacy Policy"],
  [ DocumentPartType.Paragraph, "This privacy policy may be updated from time to time. Users are encouraged to review this page periodically for any changes. The date of the last update will be displayed at the top of the page."],
  [ DocumentPartType.Header,    "6. Contact us"],
  [ DocumentPartType.Paragraph, "If you have any questions about this privacy policy or the app’s practices, please contact us at contact@bodypace.org."],
];

export default function PrivacyPolicyPage() {
  return <Document document={document} />;
}
