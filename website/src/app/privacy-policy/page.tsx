import LegalPage from "@/components/LegalPage";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Gescard Akiki website handles personal data from enquiries, WhatsApp, email and embedded videos.",
  path: "/privacy-policy/",
});

// Template: review with a legal professional (UAE PDPL and, where relevant, GDPR) before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="2 November 2026">
      <p>This policy explains how personal information is handled when you use this website, operated by {profile.name}, a real estate consultant with {profile.agency.name}, {profile.address.full}.</p>

      <h2>What this website collects</h2>
      <p>This website does not store your personal data on its own servers, does not use analytics or advertising trackers and does not set cookies.</p>
      <p>When you complete the enquiry form, the details you enter (name, email address, phone number, interests, budget range, preferred location and message) are checked in your browser and used to prepare a WhatsApp message. Nothing is sent until you choose to send that message from WhatsApp. If you choose to email instead, your email application prepares the message and you decide whether to send it.</p>

      <h2>How your information is used</h2>
      <ul>
        <li>To respond to your enquiry and discuss your property requirements.</li>
        <li>To share property information relevant to your request.</li>
        <li>To keep a record of our communication.</li>
      </ul>
      <p>Your information is not sold. It may be shared with {profile.agency.name} where necessary to handle your enquiry.</p>

      <h2>Third-party services</h2>
      <h3>WhatsApp</h3>
      <p>Messages you send via WhatsApp are processed by WhatsApp (Meta Platforms) under its own privacy policy.</p>
      <h3>YouTube</h3>
      <p>Videos are only loaded after you press play, using YouTube&rsquo;s privacy-enhanced mode (youtube-nocookie.com). Once a video plays, Google may process data under its own privacy policy.</p>
      <h3>Instagram and external links</h3>
      <p>Links to Instagram, YouTube, Google Maps and other sites open those services, which have their own privacy policies.</p>

      <h2>Retention</h2>
      <p>Enquiry conversations are kept for as long as needed to respond to you and for legitimate record-keeping, after which they are deleted.</p>

      <h2>Your rights</h2>
      <p>You may ask to access, correct or delete the personal information held about you, or object to its use, by contacting <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>

      <h2>Contact</h2>
      <p>For privacy questions, email <a href={`mailto:${profile.email}`}>{profile.email}</a> or call {profile.phone.display}.</p>
    </LegalPage>
  );
}
