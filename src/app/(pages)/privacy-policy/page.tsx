import Document from "@/components/atoms/document";
import Footer from "@/components/molecules/footer";

const TITLE = 1;
const HEADER = 2;
const PARAGRAPH = 3;

type DocumentPart = [number, string];

const document: DocumentPart[] = [
  [PARAGRAPH, "Last updated on: 2023-04-15"],
  [TITLE, "Privacy Policy"],
  [
    PARAGRAPH,
    "This privacy policy governs the manner in which our mobile application collects, uses, maintains and discloses information collected from users (each, a “User”) of the app.",
  ],
  [HEADER, "Information collection and use"],
  [
    PARAGRAPH,
    "The app is designed to record and track a User’s daily water intake and calorie intake (i.e., what the User has eaten during the day). No personally identifiable information is collected, stored or transmitted by the app. The app does not require any registration or login information and operates entirely offline. All data is stored locally on the User’s device and is accessible only by the User.",
  ],
  [HEADER, "Sharing of information"],
  [
    PARAGRAPH,
    "The app does not share any information with third parties or other users. The data is stored locally on the User’s device and is not transmitted or shared in any way.",
  ],
  [HEADER, "Security"],
  [
    PARAGRAPH,
    "The app takes reasonable precautions to protect the User’s data from unauthorized access, modification, disclosure, or destruction. However, no security measures are perfect, and we cannot guarantee the security of User data stored on the device.",
  ],
  [HEADER, "Children"],
  [
    PARAGRAPH,
    "Our app is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If you are under the age of 13, please do not use our app or provide any personal information to us.",
  ],
  [
    PARAGRAPH,
    "If you are a parent or guardian and believe that your child under the age of 13 has provided personal information to us, please contact us immediately at contact@bodypace.org. We will take steps to remove such information from our files as soon as possible.",
  ],
  [
    PARAGRAPH,
    "If we become aware that we have inadvertently collected personal information from a child under the age of 13, we will take steps to delete that information as soon as possible.",
  ],
  [
    PARAGRAPH,
    "Please note that even though we do not collect personal information from children under the age of 13, we cannot guarantee that a child may not provide personal information without parental consent. Therefore, we encourage parents and guardians to monitor their children’s use of our app and to contact us if they have any concerns.",
  ],
  [HEADER, "Changes to this privacy policy"],
  [
    PARAGRAPH,
    "This privacy policy may be updated from time to time. Users are encouraged to review this page periodically for any changes. The date of the last update will be displayed at the top of the page.",
  ],
  [HEADER, "Contact us"],
  [
    PARAGRAPH,
    "If you have any questions about this privacy policy or the app’s practices, please contact us at contact@bodypace.org.",
  ],
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <article className="flex flex-1 flex-col gap-xl w-3/5 pt-2xl">
        {document.map(([type, text]) => {
          if (type === TITLE) return <Document.Title key={text} text={text} />;
          if (type === HEADER)
            return <Document.Header key={text} text={text} />;
          if (type === PARAGRAPH)
            return <Document.Paragraph key={text} text={text} />;
        })}
      </article>
    </>
  );
}
