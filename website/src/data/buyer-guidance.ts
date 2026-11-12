export const dubaiProjectCheck = "https://dubailand.gov.ae/en/eservices/real-estate-project-status-landing/real-estate-project-status";
export const dubaiRest = "https://dubailand.gov.ae/en/eservices/dubai-rest/";
export const dubaiAdvertising = "https://dubailand.gov.ae/en/news-media/dubai-land-department-provides-madmoun-service-to-verify-validity-of-real-estate-ads-via-qr-codes";
export const abuDhabiDocuments = "https://adrec.gov.ae/en/verify-document";

export const consultationSteps = [
  { title: "Understand your brief", text: "Start with how you plan to use the home, your budget, your preferred timing and the places you need to reach regularly." },
  { title: "Review locations and developments", text: "Compare what is already in place with what the developer plans to deliver. Build a shortlist around your priorities, including travel, schools or the kind of neighbourhood you want." },
  { title: "Compare the details", text: "Review layouts, developer documents and instalment schedules side by side. Identify which facts still need confirmation and which compromises you can live with." },
  { title: "Plan the next steps", text: "Take outstanding questions to the developer or brokerage and connect with appropriate independent advisers where needed before making a commitment." },
];

export const buyerQuestions: { question: string; answer: string; link?: { href: string; text: string } }[] = [
  {
    question: "What does off-plan mean?",
    answer: "You buy a unit before it is complete, using the developer’s plans, specification and sale documents to understand what is being delivered. Compare the unit plan and promised specification with the wider masterplan and the payment schedule.",
  },
  {
    question: "How does an off-plan purchase in Dubai usually work?",
    answer: "Start by confirming the project and developer in Dubai REST. For a specific unit, ask for the reservation terms, the draft sale agreement, the project escrow details and the registration process. The exact steps and timing depend on the development and the contract.",
    link: { href: dubaiProjectCheck, text: "Dubai Land Department project status" },
  },
  {
    question: "What should an overseas buyer check first?",
    answer: "Confirm which ownership rights apply to the property and who can buy it. Ask which documents must be signed, whether they can be signed from abroad, and how the instalments will be paid. An independent adviser can review the contract and any cross-border tax implications.",
    link: { href: "https://dubailand.gov.ae/en/frequently-asked-questions", text: "Dubai Land Department buyer FAQs" },
  },
  {
    question: "Why do the developer and location matter?",
    answer: "Look at the developer’s delivered projects and at the exact plot or building in the masterplan. Visit the area where possible. Compare how you would reach work or school today and which roads, amenities and transport links are still planned.",
  },
  {
    question: "What should I ask about the payment schedule?",
    answer: "Ask for the deposit, instalment dates, amounts due at construction milestones and the balance at handover. Check when separate charges apply, what happens if a deadline is missed, and which payments and conditions affect a later transfer.",
  },
  {
    question: "How can I check the project, broker and advertisement?",
    answer: "Use Dubai REST or the Dubai Land Department services to look up Dubai projects and brokers. For a Dubai property advertisement, scan its Madmoun QR code when applicable. For an Abu Dhabi listing, use ADREC’s tool to verify its Madhmoun permit.",
    link: { href: abuDhabiDocuments, text: "Abu Dhabi Real Estate Centre document verification" },
  },
  {
    question: "How do I arrange a consultation with Gescard?",
    answer: "Tell Gescard which areas or developments you are considering, what you want from the property and when you plan to buy. If you are still deciding on a location or budget, you can start with what you already know.",
    link: { href: "/contact/#enquiry", text: "Start an enquiry" },
  },
];

export const projectQuestions: Record<string, string[]> = {
  "marsa-al-saadiyat": [
    "Confirm whether the home is in Talay or Talay Beach and compare the actual plot, outdoor space and villa layout in that collection.",
    "Ask which waterfront facilities are shared across Marsa Al Saadiyat, which are specific to the villa community, and how residents will access them.",
  ],
  "palm-central": [
    "Check which building, floor and orientation a residence occupies. Ask to see the view from the specific stack and where access to the beachfront is shown.",
    "Compare the total area with the internal living area, since terraces can account for a material share of a layout’s advertised size.",
  ],
  "palm-springs": [
    "Compare an Aliso townhouse with a Rancho villa by plot position, privacy and the relationship between indoor rooms and the private garden.",
    "Ask for the phase plan showing the route from the home to Canyon Park and the two clubs, and confirm the intended access arrangements.",
  ],
  "mareva-the-oasis": [
    "Ask which collection the villa belongs to and request its floor plan, plot plan and orientation. Marèva and Marèva 2 have separate release documents.",
    "Compare direct lagoon frontage with proximity to the shared shoreline and confirm the planned access from the specific plot.",
  ],
  "dubai-design-district": [
    "Confirm which launch and neighbourhood you are comparing. Ask for the specific tower, floor, outlook and balcony area, as those vary between releases.",
    "Visit the existing design district and compare the building’s walking route to the waterfront with the paths shown for the future Design Line.",
  ],
};
