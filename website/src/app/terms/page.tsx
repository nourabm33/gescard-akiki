import LegalPage from "@/components/LegalPage";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms of use for the Gescard Akiki Dubai real estate website.",
  path: "/terms/",
});

// Template: review with a legal professional before launch.
export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms and Conditions" updated="2 November 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the website.</p>

      <h2>About this website</h2>
      <p>This is the personal website of {profile.name}, a real estate consultant with {profile.agency.name}. It presents his services and provides ways to contact him.</p>

      <h2>Property information</h2>
      <p>Property details, prices, availability, images and specifications are provided for general information only, may be supplied by third parties such as developers or owners, and can change without notice. They do not constitute an offer or form part of any contract. Images may be illustrative. Always confirm details directly before making any decision.</p>

      <h2>No financial, legal or tax advice</h2>
      <p>Nothing on this website is financial, investment, mortgage, legal or tax advice. {profile.name} is not a licensed financial or legal adviser. Property values can go down as well as up and no return is guaranteed. Please obtain independent professional advice before investing.</p>

      <h2>Videos and social media</h2>
      <p>Video and social media content reflects general views and market commentary at the time of publication and should not be relied upon as advice.</p>

      <h2>Intellectual property</h2>
      <p>Text, branding and original photographs on this website belong to {profile.name} or are used under licence, and may not be reproduced without permission.</p>

      <h2>External links</h2>
      <p>Links to third-party websites are provided for convenience. Their content and policies are not controlled by this website.</p>

      <h2>Liability</h2>
      <p>To the extent permitted by law, no liability is accepted for any loss arising from the use of, or reliance on, information on this website.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
    </LegalPage>
  );
}
