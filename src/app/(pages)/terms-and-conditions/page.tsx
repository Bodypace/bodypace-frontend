import Link from "@/components/atoms/link";

export default function TermsAndConditionsPage() {
  return (
    <article className="flex flex-1 flex-col items-center gap-2xl pt-2xl">
      <h1 className="font-brand text-xl text-color-primary">
        Terms and Conditions
      </h1>
      <ul className="flex flex-1 flex-col pt-xl gap-lg">
        <li>
          <Link
            href="/terms-and-conditions/website"
            text="Terms and Conditions for website"
          />
        </li>
        <li>
          <Link
            href="/terms-and-conditions/mobile-app"
            text="Terms and Conditions for mobile app"
          />
        </li>
      </ul>
    </article>
  );
}
