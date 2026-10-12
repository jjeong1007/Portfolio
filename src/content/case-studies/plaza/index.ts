import type { CaseStudy } from "@/lib/case-study";
import brandExplorationAi from "./brand-exploration-ai.png";
import brandExplorationTrust from "./brand-exploration-trust.png";
import brandFinal from "./brand-final.png";
import currentChatter from "./current-chatter.png";
import currentCommunity from "./current-community.png";
import currentExplore from "./current-explore.png";
import currentSellerReviews from "./current-seller-reviews.png";
import ddayBanner from "./dday-banner.jpg";
import ddayFestival from "./dday-festival.jpg";
import ddayMerch from "./dday-merch.jpg";
import ddayStickers from "./dday-stickers.jpg";
import designSystem from "./design-system.png";
import finalCommunityCollection from "./final-community-collection.png";
import finalCommunityPosts from "./final-community-posts.png";
import finalDiscoverCatalog from "./final-discover-catalog.png";
import finalDiscoverFeed from "./final-discover-feed.png";
import finalFestivalsEvents from "./final-festivals-events.png";
import finalFestivalsMap from "./final-festivals-map.png";
import finalUploadCreate from "./final-upload-create.png";
import finalUploadListing from "./final-upload-listing.png";
import lofiMarket from "./lofi-market.png";
import lofiOnboarding from "./lofi-onboarding.png";
import lofiPlaza from "./lofi-plaza.png";
import midfiMarket from "./midfi-market.png";
import midfiPlaza from "./midfi-plaza.png";
import midfiUploadInbox from "./midfi-upload-inbox.png";
import partnershipJackalope from "./partnership-jackalope.png";
import partnershipShopify from "./partnership-shopify.png";
import pastResearch from "./past-research.png";
import problemArtisanReels from "./problem-artisan-reels.png";
import problemViralReels from "./problem-viral-reels.png";
import userFlows from "./user-flows.png";

/**
 * Copy carried over from the old Framer portfolio (assets/plaza 2). The final
 * screens are cut out of the old phone mockups; text-heavy graphics (improvement
 * areas, stakeholder requirements, developer quotes, metrics) are rebuilt as blocks.
 */
export const plaza: CaseStudy = {
  slug: "plaza",
  name: "Plaza",
  tagline: "A social marketplace connecting local artisans with the right community to improve customer relations.",
  cover: [
    { src: finalCommunityPosts, alt: "Plaza's Jackalope Festival group page with community posts" },
    { src: finalDiscoverFeed, alt: "Plaza's For You feed playing a short video of a ceramicist at the wheel" },
    { src: finalFestivalsMap, alt: "Plaza's interactive Arts Festival Map with numbered booths" },
  ],
  context:
    "In March of 2025, I was invited to a meeting with the CEO of Plaza to discuss a potential role as a product designer within the startup. Plaza is a social marketplace dedicated to local artisans and craftsmen to showcase their work and connect with their community in a much more intimate and social setting.",
  meta: [
    { label: "Role", values: ["Product Designer"] },
    { label: "Timeline", values: ["March 2025 - June 2025"] },
    { label: "Team", values: ["1 Team Lead", "2 Front/Back End Developers", "1 Marketer"] },
    { label: "Tools", values: ["Figma", "Spline"] },
  ],
  contributions: [
    {
      title: "Iteration & Improvement",
      body: "Redesigned onboarding and product flows, achieving 48% activation and driving 130+ listings and 30+ video uploads in the first launch cycle.",
    },
    {
      title: "Rapid Design",
      body: "Designed and launched an end-to-end mobile app experience on the Apple App Store within one month, driving 250+ organic downloads.",
    },
    {
      title: "Design System",
      body: "Created a scalable branding guide and design system for faster development, reducing development time by 75%.",
    },
  ],
  sections: [
    {
      eyebrow: "The problem",
      title: "Arts and crafts sellers are being overshadowed by other creators on social media.",
      variant: "statement",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "The authenticity of arts and crafts sellers is unlike any other, yet it is increasingly overshadowed by the overwhelming saturation of content across social media platforms like Instagram and TikTok.",
          ],
        },
        {
          type: "figures",
          columns: 2,
          figures: [
            {
              src: problemViralReels,
              alt: "Three viral Reels with hundreds of thousands to millions of likes",
              caption: "Viral content",
            },
            {
              src: problemArtisanReels,
              alt: "Reels and posts from arts and crafts sellers with only a few hundred likes",
              caption: "Arts and crafts sellers",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "The current state",
      title: "Getting familiar with the current interface.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After onboarding and gaining a clear understanding of the problem, I reviewed the team’s existing screens and designs. The UI felt bland and lacked a clear brand identity, so I took the initiative to define a stronger visual direction and collaborated with a marketing teammate to build the brand from the ground up.",
          ],
        },
        {
          type: "figures",
          columns: 4,
          figures: [
            { src: currentExplore, alt: "The original Explore feed showing a seller's video" },
            { src: currentSellerReviews, alt: "The original seller sheet with star ratings and reviews" },
            { src: currentChatter, alt: "The original Chatter feed of purchases, questions and reviews" },
            { src: currentCommunity, alt: "The original Pottery Heads community page with a photo collection" },
          ],
        },
        {
          type: "subheading",
          title: "Parsing through previous research conducted by the team.",
          paragraphs: [
            "Because I joined the team mid-project, I initially had limited context around the problem space and prior research. To get up to speed, I reviewed existing interview findings, identifying recurring themes, patterns, and key insights to better understand the project’s direction.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: pastResearch,
              alt: "Affinity map of interview notes grouped into quality platform features, trustworthy reviews, seller authenticity and platform reputation",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Notable insights",
      title: "Highlighting major areas for improvement.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After extensive analysis of the current company mission and user interfaces, I identified three major areas of improvement that could be made in order to optimize the application before launching into the Apple Store.",
          ],
        },
        {
          type: "features",
          items: [
            {
              icon: "palette",
              title: "Brand Image",
              body: "Creating a unique brand identity for the startup in order to better shape the visuals of the company.",
            },
            {
              icon: "layout",
              title: "Visual Design",
              body: "Establishing a clear and consistent interface that reflects the brand’s values and resonates with users.",
            },
            {
              icon: "route",
              title: "User Flows",
              body: "Ensuring a clearer user flow for more efficient and effective mobile app navigation.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Partnership deadline",
      title: "We partnered with the second biggest Arts & Crafts Festival in Los Angeles.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With our new partnership with the Jackalope Arts Fair, establishing a clear brand identity and a functional mobile app by April 23rd became critical. Our goal was to attend the Pasadena Arts & Crafts festival and pitch the concept directly to sellers and buyers on-site.",
          ],
        },
        {
          type: "figures",
          figures: [{ src: partnershipJackalope, alt: "The Plaza vase mark beside the Jackalope Indie Artisan Fair logo" }],
        },
      ],
    },
    {
      eyebrow: "Branding process · 8 weeks left",
      title: "Creating brand alignment for our ICPs.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "A key insight shared by both marketing and myself was concern around companies handling payments and orders. In response, our team’s marketer and I focused on building a brand identity that builds trust and reflects user needs.",
          ],
        },
        {
          type: "subheading",
          title: "Creating a trusting identity with only the business in mind.",
          paragraphs: [
            "With the goal of creating a platform where users can comfortably browse, shop, and make payments, we designed the brand with business objectives in mind. We initially centered the identity around a vibrant blue palette to evoke trust, while preserving the concept of a real “Plaza” in both name and feel.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: brandExplorationTrust,
              alt: "Hand-drawn logo sketches beside blue Plaza wordmark explorations",
            },
          ],
        },
        {
          type: "subheading",
          title: "But… who is our target audience?",
          paragraphs: [
            "While this approach aligned with our business goals, it didn’t fully meet the aesthetic of our users. Our primary audience consists of arts and crafts artisans who deeply value aesthetics, authenticity, and creative expression. With this in mind, we realized that our previous, more corporate-leaning brand identity would not reflect the artistic community we aimed to support.",
          ],
        },
        {
          type: "subheading",
          title: "A new approach to branding for our target audience.",
          paragraphs: [
            "After reassessing our users’ needs and target audience, we shifted our branding direction. Using generative AI tools, we explored creative concepts and settled on a style that felt more whimsical, authentic, and visually expressive, better reflecting the artistic community we aimed to serve.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: brandExplorationAi,
              alt: "AI-generated vase illustrations, earthy color swatches and app icon explorations",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Final brand · 7 weeks left",
      title: "A brand that speaks to our audience.",
      blocks: [
        {
          type: "figures",
          figures: [{ src: brandFinal, alt: "The final Plaza logo: a terracotta vase mark beside the PLAZA wordmark" }],
        },
      ],
    },
    {
      eyebrow: "Stakeholder interview · 7 weeks left",
      title: "Interviewing stakeholders to understand new business goals.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We scheduled a call with Jackalope representatives to understand their goals for the arts and crafts festival. They highlighted key requirements, most notably an interactive Arts Festival Map to help attendees navigate the event, which we then incorporated into our project scope.",
          ],
        },
        {
          type: "features",
          items: [
            {
              icon: "map",
              title: "Arts Festival Map",
              body: "Provide Jackalope goers with a seamless navigation experience around the in-person festival.",
            },
            {
              icon: "video",
              title: "Product Videos",
              body: "Short form videos to allow artists to showcase their products.",
            },
            {
              icon: "bag",
              title: "Product Purchasing",
              body: "Providing a smooth experience in supporting arts & crafts sellers.",
            },
            {
              icon: "users",
              title: "Community Groups",
              body: "Creating an arts & crafts community on the platform.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Optimizing user flows · 7 weeks left",
      title: "Creating multiple flows for a multitude of screens.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With the existing product requirements and new stakeholder needs in mind, the CEO and I mapped potential user flows for the mobile app. This clarified navigation and ensured each feature aligned with both our original goals and Jackalope’s expectations.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: userFlows,
              alt: "User flow diagrams for joining a group, adding to a collection and starting a conversation",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Low fidelity building · 6 weeks left",
      title: "Feeling out the flow of the application.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Once the user flows were finalized, we created low-fidelity prototypes of the mobile app. These were tested internally to identify experience gaps and refine the design through rapid iteration.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            { src: lofiOnboarding, alt: "Low-fidelity onboarding screens" },
            { src: lofiMarket, alt: "Low-fidelity Market page screens" },
            { src: lofiPlaza, alt: "Low-fidelity Plaza page screens" },
          ],
        },
      ],
    },
    {
      eyebrow: "Dev + design · 4 weeks left",
      title: "I wanted to understand the needs of the developers.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After defining the app’s general flow, I held informal discussions with the development team to explore ways to streamline the design-to-development handoff. Key pain points that emerged are listed below.",
          ],
        },
        {
          type: "quotes",
          items: [
            {
              label: "Time consuming",
              quote:
                "With the amount of time I spend on front-end, I think I could’ve solved every single bug that we have in the mobile application right now.",
              attribution: "Developer",
            },
            {
              label: "Tedious work",
              quote:
                "Just having to go back and forth to each individual screen can be really tedious and just causes too much back and forth.",
              attribution: "Developer",
            },
          ],
        },
        {
          type: "subheading",
          title: "To reduce development time, a design system was implemented.",
          paragraphs: [
            "As a startup, speed was critical in both design and development. To support this, I created a design system while building mid-fidelity prototypes, ensuring consistency and streamlining the handoff to developers.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: designSystem,
              alt: "Plaza design system: button components, color scheme, iconography and form components",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Connecting it all together · 2 weeks left",
      title: "Connecting everything that was built to start a mid-fidelity.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With branding, visual identity, user flows, and a complete design system in place, I created a mid-fidelity mockup that integrated all visual and functional elements of the app.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [
            { src: midfiMarket, alt: "Mid-fidelity Market, Basket and Profile screens" },
            { src: midfiPlaza, alt: "Mid-fidelity Plaza page screens" },
            { src: midfiUploadInbox, alt: "Mid-fidelity Upload and Inbox screens" },
          ],
        },
      ],
    },
    {
      eyebrow: "Stakeholder feedback · 2 weeks left",
      title: "We gained valuable feedback from our stakeholders in the project.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After completing the mid-fidelity mockup, we met with Jackalope representatives to gather feedback and assess alignment with their expectations. A pivotal insight emerged: the opportunity to integrate Shopify transfers, which became a key feature for smooth user onboarding and overall platform success.",
          ],
        },
        {
          type: "figures",
          figures: [{ src: partnershipShopify, alt: "The Plaza vase mark beside the Shopify logo" }],
        },
      ],
    },
    {
      eyebrow: "Final solution",
      title: "Bringing the arts & crafts community closer.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Plaza is a place where all arts & crafts sellers and buyers can come and create their own niche communities and connect with one another all within a single platform.",
          ],
        },
        {
          type: "spotlights",
          items: [
            {
              title: "Discover New Artists & Crafts",
              body: "Through short form video content and a catalog of products, users can browse and discover various artists and products.",
              figures: [
                { src: finalDiscoverFeed, alt: "For You feed playing a seller's video" },
                { src: finalDiscoverCatalog, alt: "Catalog grid of handmade products" },
              ],
            },
            {
              title: "Upload & Transfer Products with Ease",
              body: "Manage and upload various products by adding them in manually or through the Shopify transfers feature.",
              figures: [
                { src: finalUploadCreate, alt: "Create menu: list a product, upload a video or transfer from Shopify" },
                { src: finalUploadListing, alt: "List a Product form with photos, name, description and price" },
              ],
            },
            {
              title: "Explore Arts & Crafts Festivals",
              body: "Browse and interact with various different Arts & Crafts Festivals that are going on. This is the perfect opportunity to go to these in-person events and engage with the community!",
              figures: [
                { src: finalFestivalsEvents, alt: "Events tab listing live and upcoming festivals nearby" },
                { src: finalFestivalsMap, alt: "Interactive festival map with numbered booths" },
              ],
            },
            {
              title: "Engage in the Community",
              body: "Community groups and posts allow users to interact with one another to develop a close-knit Arts & Crafts Community!",
              figures: [
                { src: finalCommunityCollection, alt: "Jewelry Jammers group page showing its product collection" },
                { src: finalCommunityPosts, alt: "Jackalope Festival group page showing community posts" },
              ],
            },
          ],
        },
      ],
    },
    {
      eyebrow: "D-Day",
      title: "A story I’ll tell my grandchildren.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After several intense weeks of development, we successfully launched the mobile app on the Apple Store. We also had the opportunity to travel to Los Angeles and pitch our product directly to the arts and crafts community at the festival.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          columns: 2,
          figures: [
            { src: ddayBanner, alt: "The team holding up a Plaza banner with a QR code to join" },
            { src: ddayFestival, alt: "The team with festival passes at the Jackalope Arts Fair" },
            { src: ddayStickers, alt: "A sheet of freshly printed Plaza × Jackalope stickers" },
            { src: ddayMerch, alt: "Jason flexing in a Plaza t-shirt" },
          ],
        },
      ],
    },
    {
      eyebrow: "Impact & metrics",
      title: "Front-end development time was reduced by approximately 75%.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After creating the design system, I conducted brief interviews with the developers to assess its impact. Both reported that it was beneficial and greatly improved their efficiency.",
          ],
        },
        {
          type: "quotes",
          items: [
            {
              quote:
                "The design system has been actually really helpful. Now I don’t have to slave away at doing front-end anymore!",
              attribution: "J. P., developer",
            },
            {
              quote: "I always hate doing front end, but [the design system] makes it a lot more manageable and digestible.",
              attribution: "J. L., developer",
            },
          ],
        },
        {
          type: "subheading",
          title: "Key metrics post launch.",
          paragraphs: [
            "Some of the most notable metrics were the total number of downloads we reached after the first month of launch, the number of product and video uploads, and the overall activation rate from onboarding:",
          ],
        },
        {
          type: "stats",
          items: [
            { value: "130+", label: "Product listings" },
            { value: "30+", label: "Uploaded videos" },
            { value: "250+", label: "Natural downloads" },
            { value: "48%", label: "Activation rate" },
          ],
        },
      ],
    },
    {
      eyebrow: "Major takeaways & learnings",
      title: "The biggest learning experience yet!",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Flexibility and Adaptability",
              body: "Throughout this experience, I’ve had to stay flexible in my role as a product designer. I initially expected to focus on the mobile application, but I often ended up leading the design of marketing materials, promotional assets, and posters as well. This showed me that in a startup, roles shift quickly, and it’s important to adapt to new responsibilities while still delivering strong work. It also reinforced how valuable versatility and a willingness to step in can be.",
            },
            {
              title: "Cross-collaboration is a Pillar to Success",
              body: "Throughout this journey, I collaborated with people from many different backgrounds. For branding, I worked with marketers; for the user flow, I worked with our CEO; and for the design system, I partnered with developers. Through each of these collaborations, I learned what it truly takes to work in a cross-functional team and bring together a wide range of perspectives.",
            },
            {
              title: "Failure Can Only Lead to Growth",
              body: "Because of the nature of a startup, the work can be incredibly time-consuming and demanding. During the festival, there were several moments when our mobile app would break or stop working, forcing our team to scramble for time to fix it. We also faced repeated rejections from the Apple App Store, which only added to the frustration. There were countless days when all of us felt ready to give up. Yet despite the setbacks and failures, we kept pushing forward and stayed committed to building this app. Every mistake and every failure ultimately guided us to where we needed to be.",
            },
          ],
        },
      ],
    },
  ],
};
