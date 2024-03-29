import Document, {
  DocumentPart,
  DocumentPartType,
} from "@/components/atoms/document";

//prettier-ignore
const document: DocumentPart[] = [
  [ DocumentPartType.Title,     "Terms and Conditions"],
  [ DocumentPartType.Paragraph, "These terms and conditions (“Agreement”) govern your use of our mobile application (“App”). By accessing or using the App, you agree to be bound by this Agreement and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the App."],
  [ DocumentPartType.Header,    "License"],
  [ DocumentPartType.Paragraph, "The App is released under the Apache 2.0 license. By downloading, installing, or using the App, you agree to be bound by the terms and conditions of the Apache 2.0 license. You may obtain a copy of the Apache 2.0 license at https://www.apache.org/licenses/LICENSE-2.0."],
  [ DocumentPartType.Header,    "Data Privacy"],
  [ DocumentPartType.Paragraph, "The App is designed to record and track a User’s daily water intake and calorie intake. The App does not require any registration or login information and operates entirely offline. All data is stored locally on the User’s device and is accessible only by the User. We do not collect, store or transmit any personally identifiable information. We take reasonable precautions to protect the User’s data from unauthorized access, modification, disclosure, or destruction."],
  [ DocumentPartType.Header,    "Warranty Disclaimer"],
  [ DocumentPartType.Paragraph, "The App is provided “as is” without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the App will meet your requirements or that the operation of the App will be uninterrupted or error-free."],
  [ DocumentPartType.Header,    "Limitation of Liability"],
  [ DocumentPartType.Paragraph, "In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the App, even if we have been advised of the possibility of such damages."],
  [ DocumentPartType.Header,    "Indemnification"],
  [ DocumentPartType.Paragraph, "You agree to indemnify, defend, and hold us harmless from and against any and all claims, damages, costs, and expenses, including attorneys’ fees, arising from or related to your use of the App."],
  [ DocumentPartType.Header,    "Termination"],
  [ DocumentPartType.Paragraph, "We may terminate this Agreement at any time without notice if you fail to comply with any of the terms and conditions. Upon termination, you must immediately uninstall the App and destroy any copies of the App in your possession."],
  [ DocumentPartType.Header,    "Governing Law"],
  [ DocumentPartType.Paragraph, "This Agreement shall be governed by and construed in accordance with the laws of Poland. Any dispute arising out of or related to this Agreement shall be resolved in the courts of Poland."],
  [ DocumentPartType.Header,    "Changes to this Agreement"],
  [ DocumentPartType.Paragraph, "We reserve the right to modify this Agreement at any time without prior notice. Your continued use of the App after any changes to this Agreement shall constitute your acceptance of such changes."],
  [ DocumentPartType.Header,    "Entire Agreement"],
  [ DocumentPartType.Paragraph, "This Agreement constitutes the entire agreement between you and us with respect to the App and supersedes all prior or contemporaneous communications and proposals, whether oral or written, between you and us."],
  [ DocumentPartType.Header,    "Contact Information"],
  [ DocumentPartType.Paragraph, "If you have any questions about this Agreement or the App, please contact us at contact@bodypace.org."],
];

export default function TermsAndConditionsPage() {
  return <Document document={document} />;
}
