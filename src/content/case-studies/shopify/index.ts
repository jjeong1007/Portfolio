// Confidential: keeps this file out of client bundles (see `protected` below)
import "server-only";
import type { CaseStudy } from "@/lib/case-study";
import brainstormPresenting from "./brainstorm-presenting.jpg";
import brainstormSketches from "./brainstorm-sketches.jpg";
import brainstormTeam from "./brainstorm-team.jpg";
import brainstormWhiteboard from "./brainstorm-whiteboard.jpg";
import competitorsSellingPlatforms from "./competitors-selling-platforms.svg";
import competitorsWebsiteBuilders from "./competitors-website-builders.svg";
import currentShopAppHome from "./current-shop-app-home.png";
import currentStateTest from "./current-state-test.png";
import finalAddProduct from "./final-add-product.png";
import finalBusinessDetails from "./final-business-details.png";
import finalChoosePath from "./final-choose-path.png";
import finalSetupChecklist from "./final-setup-checklist.png";
import finalStoreStyles from "./final-store-styles.png";
import finalStorefrontEmpty from "./final-storefront-empty.png";
import finalStorefrontLive from "./final-storefront-live.png";
import ideationV2 from "./ideation-v2.png";
import prototypesV1 from "./prototypes-v1.png";
import storyMapToday from "./story-map-today.png";
import storyMapTomorrow from "./story-map-tomorrow.png";
import synthesisBoard from "./synthesis-board.png";
import testAiChatbot from "./test-ai-chatbot.png";
import testSkip from "./test-skip.png";
import testTrust from "./test-trust.png";
import userFlows from "./user-flows.png";

/**
 * Copy from the Figma frame "Shopify — Jason Jeong" (177:1180), cut down to read
 * as an editorial case study. Figures exported from the same frame; phone
 * mockups come from the "Mockups" page of the Shopify Design file.
 */
export const shopify: CaseStudy = {
  slug: "shopify",
  protected: true,
  layout: "editorial",
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
    { label: "Role", values: ["Product Designer"] },
    { label: "Timeline", values: ["April 2026 - June 2026"] },
    { label: "Team", values: ["3 UX Researchers", "3 Designers"] },
    { label: "Tools", values: ["Figma", "Claude Code", "Vercel"] },
  ],
  contributions: [
    {
      title: "Leadership",
      body: "Led a team through 12+ user interviews and 20+ user testing sessions, designing a two-sided marketplace that reached an 83% approval rating.",
    },
    {
      title: "Framing the opportunity",
      body: "Built the comps analysis, Golden Circle, ICPs and JTBD map to define where Shopify could win with students.",
    },
  ],
  sections: [
    {
      eyebrow: "The problem",
      title: "How might Shopify lower the barrier of entry for students to take their passion project to the next level?",
      variant: "callout",
    },
    {
      eyebrow: "Our solution",
      title: "Introducing Shop Marketplace.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "A full two-sided marketplace inside the Shop app. Shoppers still buy directly on the platform, and new sellers can open a storefront right in the app, without building a full Shopify site first.",
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
        {
          type: "stats",
          items: [
            { value: "83%", label: "approval rating in final validation" },
            { value: "7", label: "user tests with college students" },
          ],
        },
      ],
    },

    // ---- Part one · Research -------------------------------------------------
    {
      part: "Part one · Research",
      eyebrow: "Project context",
      title: "80% of Gen Z knows the Shopify brand, but doesn't use it.",
      blocks: [
        {
          type: "text",
          paragraphs: ["It has never been easier to start a business. So why aren't more students doing it?"],
        },
      ],
    },
    {
      eyebrow: "Where we started",
      title: "How might we help college students get their businesses started using AI?",
      variant: "callout",
      tone: "muted",
    },
    {
      eyebrow: "Macro context",
      title: "Three shifts are making entrepreneurship more accessible than ever.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Social commerce",
              body: "TikTok and other social platforms have accelerated the growth of mobile commerce.",
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
      title: "Shopify competes with other store builders, and with every place students already sell.",
      blocks: [
        {
          type: "figures",
          columns: 2,
          figures: [
            {
              src: competitorsWebsiteBuilders,
              alt: "Shopify surrounded by its website-building competitors: BigCommerce, Wix, Squarespace and Claude Code",
              caption: "Website builders: BigCommerce, Wix, Squarespace and Claude Code",
              maxWidth: 320,
            },
            {
              src: competitorsSellingPlatforms,
              alt: "Shopify surrounded by the selling platforms it competes with: TikTok Shop, Etsy and Instagram",
              caption: "Selling platforms: TikTok Shop, Etsy and Instagram",
              maxWidth: 320,
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Surveying",
      title: "Over half of students without a business pointed to a lack of funding.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We surveyed 35 students, 33 of whom don't currently run a business."],
        },
        {
          type: "bars",
          title: "Top five hesitations",
          note: "Students without a business (n=33)",
          items: [
            { label: "Lack of funding / resources", value: 52 },
            { label: "Time constraints", value: 48 },
            { label: "Skillset concerns", value: 30 },
            { label: "Difficulty with ideation", value: 15 },
            { label: "Unaware of how to start", value: 9 },
          ],
        },
      ],
    },
    {
      eyebrow: "Interviews",
      title: "Students don't have the time, money or skills to get going.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We ran 6 semi-structured interviews to understand the why behind the numbers. Starting a business is a huge time commitment, and most students don't have the capacity for it.",
          ],
        },
        {
          type: "quotes",
          items: [
            { quote: "Trying to get that first sale genuinely takes forever..." },
            {
              quote:
                "I just can't find the right time to start... It takes up too much time and money, both of which I just don't have.",
            },
            {
              quote:
                "I don't even know where to start. I feel like I don't have the right skills to run a full-fledged business.",
            },
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
            "We ran 5 tests on UserTesting.com covering Shopify's onboarding and a walkthrough of the platform. Onboarding was fast but not personalized. Once inside, the full platform felt overwhelming and hard to use.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            {
              src: currentStateTest,
              alt: "UserTesting.com session on Shopify's admin home, with the task prompt asking the participant to explore the platform and describe what feels confusing or easy",
              callouts: [
                { quote: "Oh gosh, this is a lot.", x: 60, y: 36 },
                { quote: "Okay, so how exactly am I supposed to start a business with this?", x: 14, y: 58 },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "User story map",
      title: "Mapping a student's journey from idea to execution.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We used what we heard in interviews to map the end-to-end journey of a student launching their first business today.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            {
              src: storyMapToday,
              alt: "Story map: Dorianne wants to sell her baked goods, tries to set up a Shopify store, gets lost in long website tutorials and gives up to study for a midterm",
              caption: "Today: starting a business with Shopify",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Jobs to be done",
      title: "We mapped the job students hire Shopify to do, and where each step breaks down.",
      blocks: [
        {
          type: "job-map",
          job: "I want to just start selling something and gain money.",
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
      ],
    },
    {
      eyebrow: "Initial hypotheses",
      title: "We believed students needed clear guidance.",
      blocks: [
        {
          type: "findings",
          tone: "negative",
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
      eyebrow: "Target persona",
      title: "Meet Dorianne: an aspiring entrepreneur, but short on resources.",
      blocks: [
        {
          type: "personas",
          items: [
            {
              name: "Dorianne",
              age: 20,
              role: "NU sophomore, aspiring baker",
              body: "Dorianne wants to start a baking business. She has ideas and motivation but struggles to turn them into action because of time constraints and a small skillset for running a business. She wants to turn her passion into passive income while keeping independence and creative control.",
              lines: [
                "I have a whole notebook of recipes. I just need a weekend to start.",
                "Between midterms and my shifts, when would I even set up a store?",
                "I’d love for my baking to pay for itself, and then some.",
                "Website? Instagram? Farmers market? Where do I even begin?",
              ],
              portrait: "dorianne",
            },
          ],
        },
      ],
    },

    // ---- Part two · Ideation & testing ----------------------------------------
    {
      part: "Part two · Ideation & testing",
      eyebrow: "Brainstorming",
      title: "We took to the whiteboard to explore every way Shopify could meet students where they are.",
      blocks: [
        {
          type: "figures",
          fit: "bento",
          figures: [
            {
              src: brainstormTeam,
              alt: "Two teammates look up at a wall of whiteboards covered in Shopify ideas, from a student grant program to a Shopify x Instagram store builder",
            },
            {
              src: brainstormWhiteboard,
              alt: "Whiteboard of early Shopify ideas: an idea graveyard, a matchmaker for businesses, a student challenge and a browser extension",
            },
            {
              src: brainstormPresenting,
              alt: "A teammate walks the group through numbered concepts sketched on the whiteboard",
            },
            {
              src: brainstormSketches,
              alt: "Whiteboard sketches of concepts including an interactive Sidekick, Sidekick onboarding conversations, an infinite canvas site builder and a Shopify store competition",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Sketches & flows",
      title: "A clear user flow before any prototype.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Before building, I mapped the flows and system architecture so that our user testing sessions would hold together.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [{ src: userFlows, alt: "User flow diagram for AI-personalized, mobile-first onboarding" }],
        },
      ],
    },
    {
      eyebrow: "First round of prototypes",
      title: "AI-personalized, mobile-first onboarding.",
      blocks: [
        {
          type: "text",
          paragraphs: ["Working from Shopify's design system, I built the initial prototypes for testing."],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            {
              src: prototypesV1,
              alt: "First-round prototype screens with AI-guided onboarding questions",
              caption: "Prototype v1: AI-guided onboarding",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "User testing",
      title: "Gen Z didn't want AI to guide them.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Testing challenged our core hypothesis. Instead of making Shopify feel approachable, AI made users less inclined to use the platform.",
          ],
        },
        {
          type: "tests",
          items: [
            {
              figure: { src: testAiChatbot, alt: "Prototype AI chat onboarding screen" },
              quote: "Oh great. Another AI chatbot...",
              finding: "Users were less inclined to use the platform because of AI.",
            },
            {
              figure: { src: testTrust, alt: "Prototype screen where AI styles the store" },
              quote: "I personally wouldn't trust AI to stylize my website or business. I still want to do that myself.",
              finding: "Students had little trust in AI to set up something as personal as their business.",
            },
            {
              figure: { src: testSkip, alt: "Prototype onboarding questionnaire screen" },
              quote: "I usually always skip these questions because I just wanna see the platform.",
              finding: "Users still wanted to get through onboarding as fast as possible.",
            },
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
            "We went back to students who already run small businesses. They loved how simple it is to sell on mobile through Depop and Instagram, and saw Shopify as a tool for established businesses rather than for them.",
          ],
        },
        {
          type: "quotes",
          items: [
            {
              quote:
                "I try to avoid [AI], because I want to think for myself when creating content... my business at the end of the day should represent me and feel authentic.",
            },
            {
              quote:
                "I feel like Shopify is more for seeing the established businesses... with Depop, it's just for everybody. You don't have to have a business.",
            },
            { quote: "...it was very easy to update people on Instagram and keep things live." },
          ],
        },
      ],
    },

    // ---- Part three · Reframing ---------------------------------------------
    {
      part: "Part three · Reframing",
      eyebrow: "Synthesis",
      title: "Start small, then grow into Shopify.",
      blocks: [
        {
          type: "text",
          paragraphs: ["We synthesized every survey, interview and test on our FigJam boards."],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            {
              src: synthesisBoard,
              alt: "FigJam affinity board of sticky notes grouped by interviewee and testing round",
              caption: "Affinity mapping across interviews and both rounds of testing",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Design principles",
      title: "Three principles to drive the product.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "A casual marketplace",
              body: "Counter the feeling that Shopify is overwhelmingly professional with something casual and approachable.",
            },
            {
              title: "Mobile centered",
              body: "Students already sell on mobile-first platforms like Depop and Vinted. Meet them there.",
            },
            {
              title: "Authenticity",
              body: "Give sellers control over how their business looks, while keeping the process simple.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Core learning",
      title: "We were framing “business” too broadly.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "A business implies full-time commitment and nearly all of your energy, and Shopify gives students the impression they're starting one. Reframing it as a side hustle or passion project lowers the anxiety of getting started.",
          ],
        },
        { type: "reframe", from: "Business", to: "Passion project / side hustle" },
      ],
    },
    {
      eyebrow: "Reframing the problem",
      title: "How might Shopify lower the barrier of entry for students to take their passion project to the next level?",
      variant: "callout",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We dropped “using AI” to focus on a lower barrier to entry, and swapped “business” for “passion project,” because the word itself intimidates.",
          ],
        },
      ],
    },
    {
      eyebrow: "Ideation v2",
      title: "What would a simplified store look like?",
      blocks: [
        {
          type: "figures",
          fit: "bleed",
          figures: [{ src: ideationV2, alt: "Second-round ideation sketches of a simplified mobile store" }],
        },
      ],
    },
    {
      eyebrow: "Current state of the Shop app",
      title: "The Shop app is one-sided.",
      blocks: [
        {
          type: "spotlights",
          items: [
            {
              title: "Built for shoppers",
              body: "It's filled with storefronts from established Shopify merchants, who build a professional website first and then add Shop as an extra channel. But that means the audience a new seller needs is already there.",
              figures: [{ src: currentShopAppHome, alt: "The Shop app home feed showing brand cards and deals" }],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "A new flow for selling",
      title: "What if we reversed the order?",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Instead of starting on a laptop, spending hours designing a store and then setting up payments and taxes, students start right in the Shop app and launch their first storefront without a website.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            {
              src: storyMapTomorrow,
              alt: "Story map comparing today's path, where Dorianne gives up, with Shop Marketplace, where she launches a storefront from her phone",
              caption: "Tomorrow: starting a business with Shop Marketplace",
            },
          ],
        },
      ],
    },

    // ---- Final design ---------------------------------------------------------
    {
      part: "Final design",
      eyebrow: "Shop Marketplace",
      title: "A simpler way for students to start selling.",
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
              body: "Quick actions break setup into small tasks (style, shipping, products, payments), so students always know what's next.",
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

    // ---- Looking back ---------------------------------------------------------
    {
      part: "Looking back",
      eyebrow: "Final validation",
      title: "83% of testers approved, and wanted to start selling right away.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "83%", label: "approval rating" },
            { value: "7", label: "user tests" },
          ],
        },
        {
          type: "testimonial",
          quote:
            "I would definitely start using this app right away because it was incredibly easy to get started and sales can start the very same day that the page launches.",
          attribution: "Test participant",
        },
      ],
    },
    {
      eyebrow: "Risk roadmap",
      title: "Every part of this bet carries risk. Here's how we'd de-risk it.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Value risk",
              body: "Continuously measure adoption in the Shop app and the number of new storefronts created.",
            },
            {
              title: "Tech risk",
              body: "Plan performance capacity on new infrastructure, since much more traffic will flow into the Shop app.",
            },
            {
              title: "Financial risk",
              body: "Weigh upkeep costs against new transaction fee revenue through Shop Pay and the Shop platform.",
            },
            {
              title: "GTM risk",
              body: "A new marketplace needs heavy marketing spend, so we'd track customer acquisition cost closely.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Reflection",
      title: "What I learned.",
      blocks: [
        {
          type: "findings",
          tone: "positive",
          items: [
            {
              title: "Kill your darlings",
              body: "AI was our starting point, not the answer. Testing early let us drop it before we over-invested.",
            },
            {
              title: "Meet users where they already are",
              body: "Students were already selling on their phones. The win was bringing Shopify to that habit, not asking them to adopt a new one.",
            },
            {
              title: "Words shape behavior",
              body: "Swapping “business” for “passion project” changed how intimidating the whole product felt.",
            },
          ],
        },
      ],
    },
  ],
};
