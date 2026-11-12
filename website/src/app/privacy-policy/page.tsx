import LegalPage from "@/components/LegalPage";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { analyticsId, enquiryIntegration } from "@/lib/integrations";
import { PrivacyPreferences } from "@/components/AnalyticsConsent";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Gescard Akiki website handles personal data from enquiries, WhatsApp, email and embedded videos.",
  path: "/privacy-policy/",
});

// Template: review with a legal professional (UAE PDPL and, where relevant, GDPR) before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="12 November 2026">
      <p>This policy explains how personal information is handled when you use this website, operated by {profile.name}, a property advisor with {profile.agency.name}, {profile.address.full}.</p>

      <h2>What this website collects</h2>
      <p>The site uses static hosting. The host and providers may receive technical information such as your IP address and browser type when your browser connects to their services.</p>
      {enquiryIntegration ? (
        <p>If you submit an online enquiry, we use your name, email and any details you choose to provide about your phone number, interests, project, budget or message to respond. Cloudflare processes the request and checks for abuse using Turnstile, which can receive technical data including your IP address. Resend relays the enquiry to Gescard’s business inbox. The website does not maintain a separate enquiry database.</p>
      ) : (
        <p>The form prepares a message using the details you enter. You decide whether to send it from WhatsApp or your email application. The website does not submit those details to an enquiry server.</p>
      )}

      <h2>How your information is used</h2>
      <ul>
        <li>To respond to your enquiry and discuss your property requirements.</li>
        <li>To share property information relevant to your request.</li>
        <li>To keep a record of our communication.</li>
      </ul>
      <p>{profile.agency.name} may receive the information needed to handle your enquiry. An enquiry does not subscribe you to marketing.</p>

      <h2>Analytics choices</h2>
      {analyticsId ? (
        <>
          <p>Google Analytics loads only if you allow it. It uses cookies to measure pages visited, traffic sources and interactions such as opening a gallery or completing an enquiry. The site does not send form values or contact details as analytics events. Your preference is kept in this browser for up to 180 days.</p>
          <p><PrivacyPreferences /> · <a href="https://policies.google.com/privacy">Google Privacy Policy</a></p>
        </>
      ) : <p>Google Analytics and advertising tags are disabled on this version of the site.</p>}

      <h2>Third-party services</h2>
      <h3>WhatsApp</h3>
      <p>Messages you send via WhatsApp are processed by WhatsApp (Meta Platforms) under its own privacy policy.</p>
      <h3>YouTube</h3>
      <p>Public video information and thumbnails come from YouTube. The player loads after you press play, using YouTube&rsquo;s privacy-enhanced mode (youtube-nocookie.com). Your use is subject to the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.</p>
      <h3>Instagram and external links</h3>
      <p>Public Reel thumbnails may load from Meta. Reel players load from Instagram when you select &ldquo;Load preview&rdquo;. Links to Instagram, YouTube, Google Maps and other sites open those services, which have their own privacy policies.</p>
      <h3>Media cache</h3>
      <p>The site retrieves a public media list from GitHub and keeps a copy of that list in your browser for the current session. The list contains public video and Reel details.</p>

      <h2>Retention</h2>
      <p>Enquiry correspondence is handled through Gescard’s business inbox or the channel you choose. The applicable retention depends on the purpose of the correspondence, provider settings and any record-keeping obligations. Contact us if you want to ask about a particular enquiry.</p>
      <p>Third-party providers may process data in other countries. For information about an applicable transfer or how long particular data is retained, use the privacy contact below.</p>

      <h2>Your rights</h2>
      <p>You may ask to access, correct or delete the personal information held about you, or object to its use, by contacting <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>

      <h2>Contact</h2>
      <p>For privacy questions, email <a href={`mailto:${profile.email}`}>{profile.email}</a> or call {profile.phone.display}.</p>
    </LegalPage>
  );
}
