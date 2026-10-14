// Confidential: keeps this file out of client bundles (see `protected` below)
import "server-only";
import type { CaseStudy } from "@/lib/case-study";
import currentShopAppHome from "./current-shop-app-home.png";
import currentShopifySignup from "./current-shopify-signup.png";
import finalAddProduct from "./final-add-product.png";
import finalBusinessDetails from "./final-business-details.png";
import finalChoosePath from "./final-choose-path.png";
import finalSetupChecklist from "./final-setup-checklist.png";
import finalStoreStyles from "./final-store-styles.png";
import finalStorefrontEmpty from "./final-storefront-empty.png";
import finalStorefrontLive from "./final-storefront-live.png";
import bigcommerceLogo from "./logos/bigcommerce.svg";
import claudeLogo from "./logos/claude.svg";
import etsyLogo from "./logos/etsy.svg";
import instagramLogo from "./logos/instagram.svg";
import squarespaceLogo from "./logos/squarespace.svg";
import tiktokLogo from "./logos/tiktok.svg";
import wixLogo from "./logos/wix.svg";
import userStoryMap from "./user-story-map.png";

/**
 * Copy from the Figma frame "Shopify Case — Structured" (Low-fi v2). Phone
 * mockups come from the "Mockups" page of the Shopify Design file, cut out of
 * their dark backdrop. Images not exported yet are `placeholder` blocks;
 * `[brackets]` mark copy still to be written.
 */
export const shopify: CaseStudy = {
  slug: "shopify",
  protected: true,
  name: "Shopify",
  tagline:
    "Lowering the barrier of entry for college students to turn their passion projects into real businesses, starting right from the Shop app.",
  cover: [
    { src: finalChoosePath, alt: "Onboarding choice between Sell on Shop and building a full storefront" },
    { src: finalStorefrontLive, alt: "A live student storefront in the Shop app with followers, reviews and products" },
    { src: finalAddProduct, alt: "Add a product form with images, title, category, price and shipping" },
  ],
  context:
    "Shopify powers millions of merchants, but college students, the next generation of founders, often stall before they ever launch. We set out to understand what holds them back and how Shopify could meet them where they already are.",
  meta: [
    { label: "Role", values: ["[Your role]"] },
    { label: "Timeline", values: ["[Month YYYY] - [Month YYYY]"] },
    { label: "Team", values: ["[# teammates + roles]"] },
    { label: "Tools", values: ["Figma", "Shopify Polaris", "[AI prototyping tool]"] },
  ],
  contributions: [
    {
      title: "Discovery & Validation",
      body: "Surveyed students (n=33 without a business), ran [#] interviews, and led current-state and prototype usability tests.",
    },
    {
      title: "Framing the Opportunity",
      body: "Built the comps analysis, Golden Circle, ICPs, and JTBD map to define where Shopify could win with students.",
    },
    {
      title: "Prototyping & Iteration",
      body: "[Describe your role] in AI-assisted prototyping with Shopify's design system, through to the final Shop app concept.",
    },
  ],
  sections: [
    {
      eyebrow: "The problem",
      title: "How might Shopify lower the barrier of entry for students to take their passion project to the next level?",
      variant: "statement",
    },
    {
      eyebrow: "Our solution",
      title: "Introducing [solution name].",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "[One-sentence pitch, e.g. a simple way for students to start selling inside the Shop app before committing to a full Shopify storefront.]",
          ],
        },
        {
          type: "stats",
          items: [
            { value: "83%", label: "approval rating in final validation" },
            { value: "7", label: "user tests with college students" },
            { value: "Same day", label: "from idea to first sale" },
          ],
        },
        {
          type: "figures",
          columns: 4,
          figures: [
            { src: finalChoosePath, alt: "Choosing Sell on Shop over a full storefront", caption: "1. Pick the fast path" },
            { src: finalStoreStyles, alt: "Uploading a store logo and banner", caption: "2. Set up the store" },
            { src: finalSetupChecklist, alt: "Setup checklist with quick actions", caption: "3. Finish the checklist" },
            { src: finalStorefrontLive, alt: "A live storefront inside the Shop app", caption: "4. Start selling" },
          ],
        },
      ],
    },
    {
      eyebrow: "Project context",
      title: "It has never been easier to start a business. So why aren't more students doing it?",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Shopify powers millions of merchants, but college students, the next generation of founders, often stall before they ever launch. We set out to understand what holds them back and how Shopify could meet them where they already are.",
          ],
        },
      ],
    },
    {
      eyebrow: "Where we started",
      title: "How might we help college students get their businesses started using AI?",
      variant: "statement",
      blocks: [{ type: "text", paragraphs: ["Our starting question. Research would push us to rewrite it."] }],
    },
    {
      eyebrow: "Macro context",
      title: "Three shifts are making entrepreneurship more accessible than ever.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We started by looking at the market students are entering."],
        },
        {
          type: "cards",
          items: [
            {
              title: "Social commerce",
              body: "TikTok and social platforms have accelerated the growth of mobile commerce.",
            },
            {
              title: "COVID-19",
              body: "The pandemic permanently increased how often people shop and interact online.",
            },
            {
              title: "The rise of AI",
              body: "AI tools have lowered the skill barrier, fueling a wave of new entrepreneurs.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Competitors",
      title: "Shopify competes with other store builders, and with every place students already build or sell.",
      blocks: [
        { type: "subheading", title: "Direct competitors", paragraphs: [] },
        {
          type: "logos",
          items: [
            { name: "BigCommerce", src: bigcommerceLogo },
            { name: "Wix", src: wixLogo },
            { name: "Squarespace", src: squarespaceLogo },
          ],
        },
        { type: "subheading", title: "Indirect competitors", paragraphs: [] },
        {
          type: "logos",
          items: [
            { name: "TikTok Shop", src: tiktokLogo },
            { name: "Etsy", src: etsyLogo },
            { name: "Instagram", src: instagramLogo },
            { name: "Claude Code", src: claudeLogo },
          ],
        },
      ],
    },
    {
      eyebrow: "Framing the opportunity",
      title: "Before talking to users, we grounded the work in Shopify's why and who.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We used the Golden Circle to articulate why this matters for Shopify and defined our ideal customer profiles (ICPs).",
          ],
        },
        {
          type: "subheading",
          title: "Golden Circle",
          paragraphs: ["Shopify's purpose, how it delivers on it, and what it actually sells."],
        },
        {
          type: "golden-circle",
          why: [
            { text: "“Make commerce better for everyone”" },
            { text: "Accessible entrepreneurship" },
            { text: "More independence, less dependence" },
          ],
          how: [
            { text: "Being at the forefront of technology", note: "“Wanting to be relevant for the next 100 years”" },
            { text: "Simple and easy to use systems and designs", note: "“Plug-and-play layout” user experience" },
            { text: "Merchant success = Shopify success", note: "2.9% service fees" },
          ],
          what: [
            { text: "All in one SaaS platform" },
            { text: "Payment management" },
            { text: "Remote + physical storefronts" },
          ],
        },
        {
          type: "subheading",
          title: "Ideal customer profiles",
          paragraphs: ["Shopify's ICPs range from small and medium businesses to enterprises, and 75% are SMBs."],
        },
        {
          type: "breakdown",
          from: "Smaller businesses",
          to: "Larger businesses",
          items: [
            { label: "Small & medium businesses", value: 75 },
            { label: "Mid-market & enterprise", value: 25 },
          ],
        },
      ],
    },
    {
      eyebrow: "Jobs to be done",
      title: "Our hypothesis: students don't lack ideas. They lack a clear path to start.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We mapped the job students hire a platform like Shopify to do, step by step, and where each step breaks down."],
        },
        {
          type: "job-map",
          job: "Start my first business selling items.",
          steps: [
            {
              stage: "Define",
              job: "Decide what to sell",
              struggle: "“Where do I even start?”",
              supports: "Students need the fundamentals",
            },
            {
              stage: "Locate",
              job: "Find the tools and platform to sell on",
              struggle: "Too many options to compare",
              supports: "Shopify overwhelms",
            },
            {
              stage: "Learn",
              job: "Learn the fundamentals of running a business",
              struggle: "Pricing, taxes and shipping are all new",
              supports: "Students need the fundamentals",
            },
            {
              stage: "Prepare",
              job: "Set up products and payments",
              struggle: "Setup feels overwhelming",
              supports: "Shopify overwhelms",
            },
            { stage: "Execute", job: "Launch the store" },
            { stage: "Monitor", job: "Track first sales" },
          ],
        },
        {
          type: "text",
          paragraphs: ["The struggles came back to two core assumptions:"],
        },
        {
          type: "cards",
          items: [
            {
              title: "Students need the fundamentals",
              body: "Students need to understand the fundamentals of starting a business before they can build one.",
            },
            {
              title: "Shopify overwhelms",
              body: "Students, and people in general, are overwhelmed by the sheer number of features Shopify offers.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Initial hypotheses",
      title: "Two bets we wanted to test.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              icon: "graduation",
              title: "Teach as you go",
              body: "A more educational, informative experience will give students the confidence to start on Shopify.",
            },
            {
              icon: "sparkles",
              title: "AI-led onboarding",
              body: "Onboarding led by AI that auto-tailors the platform to each student will cut through the overwhelm.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "User story map",
      title: "Mapping a student's path from idea to first sale.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We mapped the end-to-end journey of a student launching their first business."],
        },
        {
          type: "figures",
          columns: 1,
          figures: [
            {
              src: userStoryMap,
              alt: "User story map for a modified Shopify Academy, with activities, steps and details on sticky notes and the happy path starred",
              maxWidth: 640,
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Hypothesis persona",
      title: "Meet Dorianne: an aspiring founder who's short on time and resources.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We distilled our assumptions into a hypothesis persona to test against in research."],
        },
        {
          type: "subheading",
          title: "Dorianne, 20",
          paragraphs: [
            "A Northwestern sophomore who wants to start a baking business. She has ideas and motivation but struggles to turn them into action due to time and resource constraints. She wants to turn her passion into passive income while having independence and creative control.",
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Needs",
              body: "A clear starting point with no guesswork, and time-saving tools to balance business and school.",
            },
            {
              title: "Pain points",
              body: "A high time commitment alongside school, a lack of funding (“need to sell just to cover tools”), and uncertainty about where to begin.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Surveying",
      title: "Over half of students without a business pointed to a lack of funding and resources.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We surveyed [#] students, including 33 who don't currently run a business, to understand what's holding them back. These were their top five hesitations:",
          ],
        },
        {
          type: "stats",
          items: [
            { value: "52%", label: "Lack of funding / resources" },
            { value: "48%", label: "Time constraints" },
            { value: "30%", label: "Skillset concerns" },
            { value: "15%", label: "Difficulty with ideation" },
          ],
        },
        { type: "text", paragraphs: ["Another 9% simply didn't know how to start."] },
      ],
    },
    {
      eyebrow: "Interviews",
      title: "Students don't have the time, money, or skills, and they live on their phones.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We followed up with [#] semi-structured interviews to understand the why behind the numbers."],
        },
        {
          type: "cards",
          items: [
            { title: "No time, no money", body: "Students don't have the time or money to start." },
            { title: "Starting is slow", body: "Getting off the ground feels hard because it takes so much time." },
            { title: "“I don't have the skills”", body: "Many feel they lack the skills needed to run a business." },
            { title: "Mobile-first", body: "Students tend to do everything, including selling, from their phones." },
          ],
        },
      ],
    },
    {
      eyebrow: "Current state tests",
      title: "5 out of 5 users felt overloaded by Shopify's current experience.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We ran usability tests on Shopify's existing onboarding. It was super fast, but not personalized. Once inside, the full platform felt overwhelming and hard to use.",
          ],
        },
        {
          type: "spotlights",
          items: [
            {
              title: "Signing up today",
              body: "Shopify's mobile sign-up drops students straight into a free trial for a full storefront, before they know whether they need one.",
              figures: [{ src: currentShopifySignup, alt: "Shopify's current mobile sign-up screen for a free trial" }],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "First round of prototypes",
      title: "Prototyping AI-personalized, mobile-first onboarding.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Using AI and connecting it to Shopify's design system, we rapidly built initial prototypes to test our two hypotheses.",
          ],
        },
        {
          type: "placeholder",
          labels: ["Concept 1: Mobile-first AI onboarding", "Concept 2: AI-assisted personalized onboarding"],
          columns: 2,
          tall: true,
        },
      ],
    },
    {
      eyebrow: "User testing",
      title: "Gen Z didn't want AI to guide them. They wanted to get through it.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Testing with Gen Z users challenged our core hypothesis. Instead of making Shopify feel approachable, AI made users less inclined to use the platform.",
          ],
        },
        {
          type: "cards",
          items: [
            { title: "AI lowered intent", body: "Users were actually less inclined to use the platform because of AI." },
            {
              title: "Low trust in AI",
              body: "Students had little trust in AI to set up something as personal as their business.",
            },
            { title: "Speed still wins", body: "Users still wanted to skip through onboarding as fast as possible." },
          ],
        },
      ],
    },
    {
      eyebrow: "Back to interviews",
      title: "Shopify felt too professional to students who were already selling.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We went back to students who already run small businesses. They loved the simplicity of selling on mobile through platforms like Depop and Instagram, and saw Shopify as a tool for established businesses rather than for them.",
          ],
        },
        {
          type: "quotes",
          items: [
            {
              quote:
                "I feel like Shopify is more for, like, seeing the established businesses... with Depop, I feel like that platform... [complete quote]",
            },
            { quote: "...it was very easy to update people on Instagram and keep things live." },
            {
              quote:
                "I was like thinking the AI thing is kind of annoying. I'm just trying to understand how this works first. [complete quote]",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Synthesis",
      title: "Start small, then grow into Shopify.",
      blocks: [
        {
          type: "text",
          paragraphs: ["Synthesizing everything on our [FigJam] boards, three insights reshaped our direction:"],
        },
        { type: "placeholder", labels: ["Synthesis / FigJam boards"] },
        {
          type: "cards",
          items: [
            { title: "Shopify feels professional, but intimidating", body: "[Supporting detail]" },
            { title: "Students already sell through mobile-first platforms", body: "[Supporting detail]" },
            { title: "A simpler mobile selling path feels more accessible", body: "[Supporting detail]" },
          ],
        },
        { type: "subheading", title: "Design principles", paragraphs: [] },
        {
          type: "list",
          items: [
            "Give users a simple way to start selling before asking them to build a full storefront.",
            "Start small, then let users grow into the full Shopify experience.",
          ],
        },
      ],
    },
    {
      eyebrow: "Reframing the problem",
      title: "How might Shopify lower the barrier of entry for students to take their passion project to the next level?",
      variant: "statement",
      blocks: [
        {
          type: "text",
          paragraphs: ["No more “using AI.” The goal is a lower barrier, not a smarter onboarding."],
        },
      ],
    },
    {
      eyebrow: "Validated persona",
      title: "[Headline: who we're really designing for]",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "[How the persona changed from Dorianne after research, e.g. already selling on mobile, intimidated by Shopify, wants to start small.]",
          ],
        },
        { type: "placeholder", labels: ["Validated persona"] },
      ],
    },
    {
      eyebrow: "Ideation v2",
      title: "[Headline, e.g. Reimagining where a student's business begins.]",
      blocks: [
        { type: "text", paragraphs: ["[Describe the second round of ideation and the concepts you explored.]"] },
        { type: "placeholder", labels: ["Ideation v2 sketches / concepts"] },
      ],
    },
    {
      eyebrow: "Current state of the Shop app",
      title: "[Headline: why the Shop app is the right home for new sellers]",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "[Explain what the Shop app does today and why building here fits students who are mobile-first and want to start small.]",
          ],
        },
        {
          type: "spotlights",
          items: [
            {
              title: "Built for shoppers",
              body: "Today the Shop app is a buyer's feed of brands, deals and products, so the audience a new seller needs is already there.",
              figures: [{ src: currentShopAppHome, alt: "The Shop app home feed showing brand cards and deals" }],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Final design",
      title: "[Solution name]: a simpler way for students to start selling.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Students start selling inside the Shop app in a few guided steps, then grow into a full Shopify storefront when they're ready.",
          ],
        },
        {
          type: "spotlights",
          items: [
            {
              title: "Start small with Sell on Shop",
              body: "Onboarding opens on one choice. Sell on Shop lists products inside the Shop app, ready in minutes with a built-in audience. A full storefront is still there for students who want it.",
              figures: [
                { src: finalChoosePath, alt: "Choice between Sell on Shop and building a storefront" },
                { src: finalBusinessDetails, alt: "Business details step asking for a name and email" },
              ],
            },
            {
              title: "Make it yours in two steps",
              body: "A business name, a logo, a banner and a theme are all it takes, and every step can be skipped and finished later.",
              figures: [
                { src: finalStoreStyles, alt: "Store styles step for uploading a logo and banner" },
                { src: finalStorefrontEmpty, alt: "A new, empty storefront ready for its first products" },
              ],
            },
            {
              title: "A checklist to the first sale",
              body: "Quick actions break setup into small tasks (style, shipping, products, payments) so students always know what's next.",
              figures: [
                { src: finalSetupChecklist, alt: "Setup progress with quick actions for style, shipping, products and payments" },
                { src: finalAddProduct, alt: "Add a product form with images, title, price and shipping" },
              ],
            },
            {
              title: "Sell where shoppers already are",
              body: "The finished store lives in the Shop app with followers and reviews, and it can grow into the full Shopify experience as the business does.",
              figures: [{ src: finalStorefrontLive, alt: "A live storefront with followers, reviews and products" }],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Final validation",
      title: "83% of testers approved, and they wanted to start selling right away.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "7", label: "user tests" },
            { value: "83%", label: "approval rating" },
          ],
        },
        {
          type: "quotes",
          items: [
            {
              label: "Final validation",
              quote:
                "I would definitely start using this app right away because it was incredibly easy to get started and sales can start the very same day that the page launches, which I think is wonderful.",
              attribution: "Test participant",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Risk roadmap",
      title: "Every part of this bet carries risk. Here's how we'd de-risk each one.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Value risk",
              body: "Continuously measure adoption in the Shop app and the number of new storefronts created.",
            },
            {
              title: "Usability risk",
              body: "[How you'd keep validating ease of use as the experience scales.]",
            },
            {
              title: "Tech risk",
              body: "Plan for performance capacity on new infrastructure, since much more traffic will now flow into the Shop app.",
            },
            {
              title: "Financial risk",
              body: "Weigh upkeep costs against new transactions through Shop Pay and the Shop platform to understand transaction fee revenue gained.",
            },
            {
              title: "GTM risk",
              body: "Creating a new marketplace requires heavy marketing and GTM spend, so we'd look at CAC not just from a user standpoint, but from [finish thought].",
            },
            {
              title: "Legal risk",
              body: "[e.g. seller verification, payments compliance, or selling restrictions for student sellers.]",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Reflection",
      title: "[What this project taught me]",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "[Takeaway 1]", body: "[e.g. Kill your darlings: AI was our starting point, not the answer.]" },
            { title: "[Takeaway 2]", body: "[e.g. Meet users where they already are.]" },
            { title: "[Takeaway 3]", body: "[What you'd do differently next time.]" },
          ],
        },
      ],
    },
  ],
};
