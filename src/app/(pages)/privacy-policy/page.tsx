import Link from "@/components/atoms/link";

export default function PrivacyPolicyPage() {
  return (
    <article className="flex flex-1 flex-col items-center gap-2xl pt-2xl">
      <h1 className="font-brand text-xl text-color-primary">
        Privacy Policies
      </h1>
      <ul className="flex flex-1 flex-col pt-xl gap-lg">
        <li>
          <Link
            href="/privacy-policy/website"
            text="Privacy Policy for website"
          />
        </li>
        <li>
          <Link
            href="/privacy-policy/mobile-app"
            text="Privacy Policy for mobile app"
          />
        </li>
      </ul>
    </article>
  );
}
