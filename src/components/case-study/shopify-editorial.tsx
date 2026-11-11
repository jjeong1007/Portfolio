// Confidential: only rendered behind the password gate, never bundled for the client
import "server-only";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import brainstorm from "@/content/case-studies/shopify/editorial/brainstorm.jpg";
import competitors from "@/content/case-studies/shopify/editorial/competitors.png";
import cover from "@/content/case-studies/shopify/editorial/cover.png";
import currentState from "@/content/case-studies/shopify/editorial/current-state.png";
import finalHeroSplash from "@/content/case-studies/shopify/editorial/final-hero-splash.png";
import finalHeroStorefront from "@/content/case-studies/shopify/editorial/final-hero-storefront.png";
import flows from "@/content/case-studies/shopify/editorial/flows.png";
import ideationV2 from "@/content/case-studies/shopify/editorial/ideation-v2.png";
import jtbd from "@/content/case-studies/shopify/editorial/jtbd.png";
import prototypesV1 from "@/content/case-studies/shopify/editorial/prototypes-v1.png";
import setupDetails from "@/content/case-studies/shopify/editorial/step-setup-1.png";
import setupProduct from "@/content/case-studies/shopify/editorial/step-setup-2.png";
import setupStyles from "@/content/case-studies/shopify/editorial/step-setup-3.png";
import appStorefront from "@/content/case-studies/shopify/editorial/step-app-1.png";
import appDashboard from "@/content/case-studies/shopify/editorial/step-app-2.png";
import appDiscovery from "@/content/case-studies/shopify/editorial/step-app-3.png";
import shopAppToday from "@/content/case-studies/shopify/editorial/shop-app-today.png";
import solutionShowcase from "@/content/case-studies/shopify/editorial/solution-showcase.png";
import storyToday from "@/content/case-studies/shopify/editorial/story-today.png";
import storyTomorrow from "@/content/case-studies/shopify/editorial/story-tomorrow.png";
import synthesis from "@/content/case-studies/shopify/editorial/synthesis.png";
import testAiChatbot from "@/content/case-studies/shopify/editorial/test-ai-chatbot.png";
import testSkip from "@/content/case-studies/shopify/editorial/test-skip.png";
import testTrust from "@/content/case-studies/shopify/editorial/test-trust.png";
import type { CSSProperties } from "react";
import { BlinkingPersona } from "./blinking-persona";
import { dmMono } from "./editorial-font";
import "./editorial.css";

/** The project accent the editorial styles read (editorial.css). */
const ACCENT = { "--cs-accent": "var(--color-shopify)", "--cs-accent-text": "var(--color-shopify-text)" } as CSSProperties;

const FULL = "(min-width: 1440px) 1152px, 100vw";
const HALF = "(min-width: 810px) 50vw, 100vw";

/** A final design step: one exported image, or bare Figma screens shown in phone frames. */
type FinalStep = { title: string; body: string } & (
  | { src: StaticImageData; alt: string }
  | { screens: { src: StaticImageData; alt: string }[] }
);

function Img({ src, alt, sizes = FULL, priority }: { src: StaticImageData; alt: string; sizes?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} sizes={sizes} placeholder="blur" preload={priority} />;
}

/**
 * A bare Figma screen in an iPhone drawn in CSS (editorial.css `.phone`): titanium edge,
 * black bezel, side buttons and a Dynamic Island, like the Our Solution mockups.
 */
function Phone({ src, alt, sizes }: { src: StaticImageData; alt: string; sizes: string }) {
  return (
    <div className="phone">
      <div className="phone-body">
        <span className="island" aria-hidden />
        <Img src={src} alt={alt} sizes={sizes} />
      </div>
    </div>
  );
}

/**
 * The Shopify case study, ported 1:1 from the static editorial template
 * (case-study-template/shopify/index.html). Styles live in editorial.css (shared
 * with the other case studies), scoped under `.editorial-cs`. Headings are Bricolage Grotesque, body Karla.
 */
export function ShopifyEditorial() {
  return (
    <main className={`editorial-cs ${dmMono.variable}`} style={ACCENT}>
      <div className="wrap">
        <nav className="back" aria-label="Breadcrumb">
          <Link href="/#projects">← Back to projects</Link>
        </nav>

        {/* ========== HERO ========== */}
        <header className="hero">
          <p className="eyebrow">Product strategy</p>
          <h1 className="display">Shopify</h1>
          <p className="lead">
            Lowering the barrier of entry for college students to turn their passion projects into real businesses,
            starting right from the Shop app.
          </p>
          <div className="meta">
            <div><span>Role</span><span>Product Designer</span></div>
            <div><span>Timeline</span><span>Apr – Jun 2026</span></div>
            <div><span>Team</span><span>3 UX Researchers</span><span>3 Designers</span></div>
            <div><span>Tools</span><span>Figma, Claude Code, Vercel</span></div>
          </div>
        </header>

        <figure style={{ margin: 0 }}>
          <Img
            src={cover}
            alt="Three Shop Marketplace screens: choosing how to start a store, a finished storefront, and adding a product"
            priority
          />
        </figure>

        {/* ========== OVERVIEW ========== */}
        <section className="narrow">
          <p className="eyebrow">Context</p>
          <h2>80% of Gen Z knows the Shopify brand, but doesn’t use it</h2>
          <p>
            Shopify powers millions of merchants, but college students, the next generation of founders, often stall
            before they ever launch. We set out to understand what holds them back and how Shopify could meet them
            where they already are.
          </p>
        </section>

        <section className="tight">
          <p className="eyebrow">My contributions</p>
          <div className="grid-2">
            <div className="card">
              <h4>Leadership</h4>
              <p>
                Led a team through 12+ user interviews and 20+ user testing sessions, designing a two-sided marketplace
                that reached an 83% approval rating.
              </p>
            </div>
            <div className="card">
              <h4>Design &amp; iteration</h4>
              <p>
                Mapped the flows and built AI-assisted prototypes on Shopify’s design system, then iterated through
                testing to the final Shop Marketplace concept.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="callout">
            <p className="eyebrow">The problem</p>
            <h3>How might Shopify lower the barrier of entry for students to take their passion project to the next level?</h3>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Our solution</p>
            <h2>Introducing Shop Marketplace</h2>
            <p>
              A full two-sided marketplace inside the Shop app. Shoppers still buy directly on the platform, and new
              sellers can open a storefront right in the app, without building a full Shopify site first.
            </p>
          </div>
          <figure>
            <Img
              src={solutionShowcase}
              alt="Four iPhones: the Shop Marketplace splash screen, store setup, the live storefront, and the seller dashboard"
            />
          </figure>
          <div className="stats">
            <div className="stat"><span className="big">83%</span><p>approval rating in final validation</p></div>
            <div className="stat"><span className="big">7</span><p>user tests with college students</p></div>
          </div>
        </section>

        {/* ========== PART ONE · RESEARCH ========== */}
        <div className="divider"><p className="eyebrow good">Part one · Research</p></div>

        <section className="tight">
          <div className="callout grey">
            <p className="eyebrow">Where we started</p>
            <h3>How might we help college students get their businesses started using AI?</h3>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Macro context</p>
            <h2>Three shifts are making entrepreneurship more accessible than ever</h2>
          </div>
          <div className="grid-3">
            <div className="card"><span className="num">01</span><h4>Social commerce</h4><p>TikTok and other social platforms have accelerated the growth of mobile commerce.</p></div>
            <div className="card"><span className="num">02</span><h4>COVID-19</h4><p>The pandemic permanently increased how often people shop and interact online.</p></div>
            <div className="card"><span className="num">03</span><h4>The rise of AI</h4><p>AI tools have lowered the skill barrier, fueling a wave of new entrepreneurs.</p></div>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Competitors</p>
            <h3>Shopify competes with other store builders, and with every place students already sell</h3>
          </div>
          <figure>
            <Img
              src={competitors}
              alt="Competitor landscape: website builders BigCommerce, Wix, Squarespace and Claude Code; selling platforms TikTok Shop, Etsy and Instagram"
            />
            <figcaption>Website builders vs. selling platforms</figcaption>
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Surveying</p>
            <h2>Over half of students without a business pointed to a lack of funding</h2>
            <p>We surveyed 35 students, 33 of whom don’t currently run a business.</p>
          </div>
          <div className="chart narrow" role="figure" aria-label="Top five hesitations among students without a business">
            <div className="chart-head"><strong>Top five hesitations</strong><span>Students without a business (n=33)</span></div>
            {[
              ["Lack of funding / resources", 52],
              ["Time constraints", 48],
              ["Skillset concerns", 30],
              ["Difficulty with ideation", 15],
              ["Unaware of how to start", 9],
            ].map(([label, pct]) => (
              <div className="bar-row" key={label}>
                <span className="label">{label}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
                <span className="pct">{pct}%</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Interviews</p>
            <h3>Students don’t have the time, money or skills to get going</h3>
            <p>
              We ran 6 semi-structured interviews to understand the why behind the numbers. Starting a business is a
              huge time commitment, and most students don’t have the capacity for it.
            </p>
          </div>
          <div className="quotes">
            <blockquote className="quote">Trying to get that first sale genuinely takes forever...</blockquote>
            <blockquote className="quote">
              I just can’t find the right time to start... It takes up too much time and money, both of which I just
              don’t have.
            </blockquote>
            <blockquote className="quote">
              I don’t even know where to start. I feel like I don’t have the right skills to run a full-fledged business.
            </blockquote>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Current state tests</p>
            <h3>5 out of 5 users felt overloaded by Shopify’s current experience</h3>
            <p>
              We ran 5 tests on UserTesting.com covering Shopify’s onboarding and a walkthrough of the platform.
              Onboarding was fast but not personalized. Once inside, the full platform felt overwhelming and hard to use.
            </p>
          </div>
          <figure>
            <Img src={currentState} alt="Screenshots of Shopify's current onboarding and admin dashboard" />
            <figcaption>
              <span className="before">Current state</span> — “Oh gosh, this is a lot.” · “Okay, so how exactly am I
              supposed to start a business with this?”
            </figcaption>
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">User story map</p>
            <h3>Mapping a student’s journey from idea to execution</h3>
            <p>We used what we heard in interviews to map the end-to-end journey of a student launching their first business today.</p>
          </div>
          <figure>
            <Img
              src={storyToday}
              alt="Story map: a student wants to sell baked goods, tries Shopify, gets lost in website tutorials and gives up to study for a midterm"
            />
            <figcaption><span className="before">Today</span> — Starting a business with Shopify</figcaption>
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Jobs to be done</p>
            <h3>“I want to just start selling something and gain money.”</h3>
            <p>
              We mapped the job students hire a platform like Shopify to do, step by step, and where each step breaks
              down. The struggles cluster early: deciding what to sell, choosing a platform, learning the fundamentals
              and setting up.
            </p>
          </div>
          <figure>
            <Img src={jtbd} alt="Job map: Define, Locate, Learn, Prepare, Execute, Monitor, with struggles marked on the first four steps" />
            <figcaption>Main functional job, broken into six steps</figcaption>
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Initial hypotheses</p>
            <h2>We believed students needed clear guidance</h2>
          </div>
          <div className="grid-2">
            <div className="item bad">
              <p className="tag">Students need the fundamentals</p>
              <p>Students need to understand the fundamentals of starting a business before they can build one.</p>
            </div>
            <div className="item bad">
              <p className="tag">Shopify overwhelms</p>
              <p>Students, and people in general, are overwhelmed by the sheer number of features Shopify offers.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Target persona</p>
            <h2>Meet Dorianne: an aspiring entrepreneur, but short on resources</h2>
          </div>
          <article className="persona" aria-label="Persona: Dorianne">
            {/* Who she is: the drawn character, name and quick facts */}
            <div className="persona-id">
              <div className="persona-art">
                <BlinkingPersona persona="dorianne" />
              </div>
              <p className="persona-name">Dorianne, 20</p>
              <ul className="persona-tags" aria-label="About Dorianne">
                <li>Sophomore</li>
                <li>NU student</li>
                <li>Baker</li>
              </ul>
              <p className="persona-trait">High ambition, limited time</p>
            </div>

            {/* What drives her, what she needs, what gets in the way */}
            <div className="persona-body">
              <p className="persona-bio">
                Dorianne wants to start a baking business. She has ideas and motivation, but struggles to turn them into
                action because of time constraints and a small skillset for running a business.
              </p>
              <div className="persona-motivation">
                <p className="persona-label">Motivation</p>
                <p>Turn her passion into passive income, with independence and creative control.</p>
              </div>
              <div className="persona-cols">
                <div>
                  <p className="persona-label good">Needs</p>
                  <ul className="persona-list good">
                    <li>A clear starting point with no guesswork</li>
                    <li>Time-saving tools to balance business and school</li>
                    <li>Guidance that teaches her as she builds</li>
                  </ul>
                </div>
                <div>
                  <p className="persona-label bad">Pain points</p>
                  <ul className="persona-list bad">
                    <li>A high time commitment alongside school</li>
                    <li>No funding: “I need to sell just to cover tools”</li>
                    <li>Unsure where to start</li>
                    <li>Setup feels overwhelming and complex</li>
                    <li>Manual, time-consuming tasks like outreach and payments</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* ========== PART TWO · IDEATION & TESTING ========== */}
        <div className="divider"><p className="eyebrow good">Part two · Ideation &amp; testing</p></div>

        <section className="tight">
          <div className="narrow">
            <p className="eyebrow">Brainstorming</p>
            <h3>We took to the whiteboard to explore every way Shopify could meet students where they are</h3>
          </div>
          <figure>
            <Img src={brainstorm} alt="Whiteboard brainstorming sketches and sticky notes" />
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Sketches &amp; flows</p>
            <h3>A clear user flow before any prototype</h3>
            <p>Before building, I mapped the flows and system architecture so that our user testing sessions would hold together.</p>
          </div>
          <figure>
            <Img src={flows} alt="User flow diagram for AI-personalized onboarding" />
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">First round of prototypes</p>
            <h3>AI-personalized, mobile-first onboarding</h3>
            <p>Working from Shopify’s design system, I built the initial prototypes for testing.</p>
          </div>
          <figure>
            <Img src={prototypesV1} alt="First-round prototype screens with AI-guided onboarding questions" />
            <figcaption>Prototype v1 — AI-guided onboarding</figcaption>
          </figure>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">User testing</p>
            <h2>Gen Z didn’t want AI to guide them</h2>
            <p>
              Testing challenged our core hypothesis. Instead of making Shopify feel approachable, AI made users less
              inclined to use the platform.
            </p>
          </div>
          <div className="stack">
            {[
              {
                src: testAiChatbot,
                alt: "Prototype AI chat onboarding screen",
                quote: "“Oh great. Another AI chatbot...”",
                finding: "Users were less inclined to use the platform because of AI.",
              },
              {
                src: testTrust,
                alt: "Prototype AI store styling screen",
                quote: "“I personally wouldn’t trust AI to stylize my website or business. I still want to do that myself.”",
                finding: "Students had little trust in AI to set up something as personal as their business.",
              },
              {
                src: testSkip,
                alt: "Prototype onboarding questionnaire screen",
                quote: "“I usually always skip these questions because I just wanna see the platform.”",
                finding: "Users still wanted to get through onboarding as fast as possible.",
              },
            ].map((t) => (
              <div className="test-row" key={t.quote}>
                <Img src={t.src} alt={t.alt} sizes="160px" />
                <div>
                  <blockquote>{t.quote}</blockquote>
                  <p>{t.finding}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Back to interviews</p>
            <h3>Shopify felt too professional to students who were already selling</h3>
            <p>
              We went back to students who already run small businesses. They loved how simple it is to sell on mobile
              through Depop and Instagram, and saw Shopify as a tool for established businesses rather than for them.
            </p>
          </div>
          <div className="quotes">
            <blockquote className="quote">
              I try to avoid [AI], because I want to think for myself... my business at the end of the day should
              represent me and feel authentic.
            </blockquote>
            <blockquote className="quote">
              I feel like Shopify is more for seeing the established businesses... with Depop, it’s just for everybody.
              You don’t have to have a business.
            </blockquote>
            <blockquote className="quote">...it was very easy to update people on Instagram and keep things live.</blockquote>
          </div>
        </section>

        {/* ========== PART THREE · REFRAMING ========== */}
        <div className="divider"><p className="eyebrow good">Part three · Reframing</p></div>

        <section className="tight">
          <div className="narrow">
            <p className="eyebrow">Synthesis</p>
            <h2>Start small, then grow into Shopify</h2>
            <p>We synthesized every survey, interview and test on our FigJam boards.</p>
          </div>
          <figure>
            <Img src={synthesis} alt="FigJam affinity board of sticky notes grouped by interviewee and testing round" />
            <figcaption>Affinity mapping across interviews and both rounds of testing</figcaption>
          </figure>
        </section>

        <section>
          <p className="eyebrow">Design principles</p>
          <h2 className="narrow">Three principles to drive the product</h2>
          <div className="grid-3">
            <div className="card"><span className="num">01</span><h4>A casual marketplace</h4><p>Counter the feeling that Shopify is overwhelmingly professional with something casual and approachable.</p></div>
            <div className="card"><span className="num">02</span><h4>Mobile centered</h4><p>Students already sell on mobile-first platforms like Depop and Vinted. Meet them there.</p></div>
            <div className="card"><span className="num">03</span><h4>Authenticity</h4><p>Give sellers control over how their business looks, while keeping the process simple.</p></div>
          </div>
        </section>

        <section className="narrow">
          <p className="eyebrow">Core learning</p>
          <h3>We were framing “business” too broadly</h3>
          <p>
            A business implies full-time commitment and nearly all of your energy. Shopify gives students the impression
            they’re starting one. Reframing it as a side hustle or passion project lowers the anxiety of getting started.
          </p>
          <div className="reframe">
            <span className="pill old">Business</span>
            <span className="arrow" aria-hidden>→</span>
            <span className="pill new">Passion project / side hustle</span>
          </div>
        </section>

        <section>
          <div className="callout">
            <p className="eyebrow">Reframing the problem</p>
            <h3>How might Shopify lower the barrier of entry for students to take their passion project to the next level?</h3>
            <p>
              We dropped “using AI” and focused on a lower barrier to entry, and swapped “business” for “passion
              project,” because the word itself intimidates.
            </p>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Ideation v2</p>
            <h3>What would a simplified store look like?</h3>
          </div>
          <figure>
            <Img src={ideationV2} alt="Second-round ideation sketches of a simplified mobile store" />
          </figure>
        </section>

        <div className="split">
          <figure>
            <Img src={shopAppToday} alt="The current Shop app: a shopping feed of established brands" sizes={HALF} />
            <figcaption><span className="before">Today</span> — The Shop app, built for shoppers</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Current state of the Shop app</p>
            <h3>The Shop app is one-sided</h3>
            <p className="muted">
              It’s filled with storefronts from established Shopify merchants, who build a professional website first
              and then add Shop as an extra channel. But that means the audience a new seller needs is already there.
            </p>
          </div>
        </div>

        <section>
          <div className="narrow">
            <p className="eyebrow">A new flow for selling</p>
            <h2>What if we reversed the order?</h2>
            <p>
              Instead of starting on a laptop, spending hours designing a store and then setting up payments and taxes,
              students start right in the Shop app and launch their first storefront without a website.
            </p>
          </div>
          <figure>
            <Img
              src={storyTomorrow}
              alt="Story map comparing today's path, where the student gives up, with Shop Marketplace, where she launches a storefront from her phone"
            />
            <figcaption><span className="after">Tomorrow</span> — Starting a business with Shop Marketplace</figcaption>
          </figure>
        </section>

        {/* ========== FINAL DESIGN ========== */}
        {/* No divider here: the chapter label sits centered above the header instead */}
        <section className="chapter">
          <div className="narrow showcase-head">
            <p className="eyebrow good">Final design</p>
            <h2>Shop Marketplace: a simpler way for students to start selling</h2>
            <p>
              Students start selling inside the Shop app in a few guided steps, then grow into a full Shopify storefront
              when they’re ready.
            </p>
          </div>
          {/* The primary mockups (Figma: Shop App Profile Page NEW / MATURED), centered under the header */}
          <figure className="phones hero">
            <Phone src={finalHeroSplash} alt="The Shop Marketplace splash screen" sizes="260px" />
            <Phone
              src={finalHeroStorefront}
              alt="A finished student storefront in the Shop app with followers, reviews and jewelry products"
              sizes="260px"
            />
          </figure>
        </section>

        {[
          {
            screens: [
              { src: setupDetails, alt: "Let’s build your store: the business name and email step" },
              { src: setupStyles, alt: "Store styles: uploading a logo and banner, or choosing a banner theme" },
              { src: setupProduct, alt: "Adding a product: images, title, description, category, price and shipping" },
            ],
            title: "Easy to setup",
            body: "A few guided screens take students from a business name to a styled store and their first product listing, and every step can be skipped and finished later.",
          },
          {
            screens: [
              { src: appStorefront, alt: "Your Storefront: followers, reviews and the product grid" },
              { src: appDashboard, alt: "Seller dashboard: total sales, visitors, a sales chart and product listings" },
              { src: appDiscovery, alt: "The Shop discovery feed with the student’s store beside established brands" },
            ],
            title: "Everything all in one app",
            body: "The storefront, the sales dashboard and the shoppers all live in the Shop app, so students can run their store and reach buyers without ever leaving it.",
          },
        ].map((f: FinalStep, i) => (
          <div className={`split ${i % 2 ? "flip" : ""}`} key={f.title}>
            {"screens" in f ? (
              // Bare Figma screens, each set in a phone frame drawn in CSS (editorial.css .phone)
              <figure className="phones">
                {f.screens.map((sc) => (
                  <Phone key={sc.alt} src={sc.src} alt={sc.alt} sizes="180px" />
                ))}
              </figure>
            ) : (
              <figure>
                <Img src={f.src} alt={f.alt} sizes={HALF} />
              </figure>
            )}
            <div>
              <span className="step">{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p className="muted">{f.body}</p>
            </div>
          </div>
        ))}

        {/* ========== LOOKING BACK ========== */}
        <div className="divider"><p className="eyebrow good">Looking back</p></div>

        <section className="tight">
          <div className="narrow">
            <p className="eyebrow">Final validation</p>
            <h2>83% of testers approved, and wanted to start selling right away</h2>
          </div>
          <div className="stats">
            <div className="stat"><span className="big">83%</span><p>approval rating</p></div>
            <div className="stat"><span className="big">7</span><p>user tests</p></div>
          </div>
          <div className="testimonial">
            <blockquote>
              “I would definitely start using this app right away because it was incredibly easy to get started and
              sales can start the very same day that the page launches.”
            </blockquote>
            <cite>— Test participant</cite>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Risk roadmap</p>
            <h3>Every part of this bet carries risk. Here’s how we’d de-risk it.</h3>
          </div>
          <div className="grid-2">
            <div className="card"><h4>Value risk</h4><p>Continuously measure adoption in the Shop app and the number of new storefronts created.</p></div>
            <div className="card"><h4>Tech risk</h4><p>Plan performance capacity on new infrastructure, since much more traffic will flow into the Shop app.</p></div>
            <div className="card"><h4>Financial risk</h4><p>Weigh upkeep costs against new transaction fee revenue through Shop Pay and the Shop platform.</p></div>
            <div className="card"><h4>GTM risk</h4><p>A new marketplace needs heavy marketing spend, so we’d track customer acquisition cost closely.</p></div>
          </div>
        </section>

        <section>
          <div className="narrow">
            <p className="eyebrow">Takeaways</p>
            <h2>What I learned</h2>
          </div>
          {/* Numbered cards, three across, like the other case studies' takeaways */}
          <div className="grid-3">
            <div className="card"><span className="num">01</span><h4>Kill your darlings</h4><p>AI was our starting point, not the answer. Testing early let us drop it before we over-invested.</p></div>
            <div className="card"><span className="num">02</span><h4>Meet users where they already are</h4><p>Students were already selling on their phones. The win was bringing Shopify to that habit, not asking them to adopt a new one.</p></div>
            <div className="card"><span className="num">03</span><h4>Words shape behavior</h4><p>Swapping “business” for “passion project” changed how intimidating the whole product felt.</p></div>
          </div>
        </section>

        <footer>
          <p className="display">Thanks for reading</p>
          <div className="links">
            <Link href="/#projects">Back to projects</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
