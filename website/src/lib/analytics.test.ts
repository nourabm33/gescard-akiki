import { afterEach, expect, it, vi } from "vitest";

vi.mock("./integrations", () => ({ analyticsId: "G-V3FIXTURE" }));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

it("loads analytics only after consent, strips URL data, and stops reporting on withdrawal", async () => {
  const location = new URL("https://gescardakiki.com/properties/mareva-the-oasis/?email=visitor@example.com#gallery");
  const append = vi.fn();
  const browser = { location, dataLayer: [] as IArguments[] };
  vi.stubGlobal("window", browser);
  vi.stubGlobal("location", location);
  vi.stubGlobal("document", {
    referrer: "https://example.org/private/path?name=Visitor",
    cookie: "",
    head: { append },
    createElement: () => ({}),
  });
  const { disableAnalytics, enableAnalytics, trackLink, trackPage } = await import("./analytics");
  trackPage(location.pathname);
  expect(append).not.toHaveBeenCalled();
  expect(browser.dataLayer).toHaveLength(0);

  enableAnalytics();
  trackPage(location.pathname);
  trackPage(location.pathname);
  trackLink({ href: "https://wa.me/123?text=Private+message", dataset: { projectEnquiry: "whatsapp" } } as unknown as HTMLAnchorElement);
  const commands = browser.dataLayer.map((command) => Array.from(command));
  expect(append).toHaveBeenCalledTimes(1);
  expect(commands[0]).toMatchObject(["consent", "default", { analytics_storage: "denied", ad_storage: "denied" }]);
  expect(commands[1]).toMatchObject(["consent", "update", { analytics_storage: "granted", ad_storage: "denied" }]);
  expect(commands.filter(([kind]) => kind === "event").map(([, name]) => name))
    .toEqual(["page_view", "project_view", "whatsapp_click", "project_enquiry_click"]);
  expect(JSON.stringify(commands)).not.toMatch(/visitor@example.com|Private\+message|\/private\/path/);
  disableAnalytics();
  const length = browser.dataLayer.length;
  trackPage("/contact/");
  expect(browser.dataLayer).toHaveLength(length);
  expect(browser).toHaveProperty("ga-disable-G-V3FIXTURE", true);
});
