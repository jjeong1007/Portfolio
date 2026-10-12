import type { CaseStudy } from "@/lib/case-study";
import affinityDiagram from "./affinity-diagram.png";
import finalFantasyLeagues from "./final-fantasy-leagues.png";
import finalMusicPact from "./final-music-pact.png";
import finalNotification from "./final-notification.png";
import finalSplash from "./final-splash.png";
import interviewInsights from "./interview-insights.png";
import portraitLurkingLouise from "./portrait-lurking-louise.png";
import portraitQuietQuincy from "./portrait-quiet-quincy.png";
import portraitSocialSally from "./portrait-social-sally.png";
import sharingFlows from "./sharing-flows.png";
import sharingHabits from "./sharing-habits.png";
import showcase from "./showcase.jpg";
import streamingPlatforms from "./streaming-platforms.png";
import whiteboarding from "./whiteboarding.png";
import wireframeConcept1 from "./wireframe-concept-1.png";
import wireframeConcept2 from "./wireframe-concept-2.png";
import wireframeConcept3 from "./wireframe-concept-3.png";

/** Copy carried over from the old Framer portfolio (assets/Amazon-music). */
export const amazonMusic: CaseStudy = {
  slug: "amazon-music",
  name: "Amazon Music",
  tagline: "Harmony: transforming Amazon Music into something more than just a simple streaming platform.",
  cover: [
    { src: finalFantasyLeagues, alt: "Harmony's The Latest feed featuring Fantasy Music Leagues" },
    { src: finalSplash, alt: "The Harmony splash screen" },
    { src: finalMusicPact, alt: "Harmony's The Latest feed featuring the Amazon Music Pact campus match" },
  ],
  context:
    "During Winter 2024, I was given the opportunity to work with Amazon Music through a design practicum in the San Francisco Bay Area through a Northwestern Medill & SEGAL sponsored program called the “Bay Area Immersion Program.” Through this program, us students were given the opportunity to work with real project partners such as Amazon Music to deliver an entirely new and wholistic product with the possibility of being launched.",
  meta: [
    { label: "Role", values: ["Product Designer"] },
    { label: "Timeline", values: ["January 2025 - March 2025"] },
    { label: "Team", values: ["1 Project Partner", "4 Product Designers"] },
    { label: "Tools", values: ["Figma", "Marvel Pop"] },
  ],
  contributions: [
    {
      title: "User Research",
      body: "Conducted user research through 20+ user interviews and 5+ usability tests to finalize our concept.",
    },
    {
      title: "Iterative Design",
      body: "Balanced stakeholder requirements, technical constraints, and user needs through iterative design.",
    },
    {
      title: "Building & Designing",
      body: "Responsible for the user interface design and turning research insights into tangible design items.",
    },
  ],
  sections: [
    {
      eyebrow: "Music is connection",
      title: "One song shared can enrich both a bond and oneself.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Sharing music strengthens bonds and shapes a personal identity. A song carries memories, emotions, and pieces of ourselves. When shared, it creates space for joy, vulnerability, and recognition. Whether it’s showing off favorite tracks or singing along to nostalgic anthems, music unites us with others while reconnecting us with who we are.",
          ],
        },
      ],
    },
    {
      eyebrow: "Problem discovery",
      title: "Gen Z music listeners love to share what they’re listening.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "In early conversations and interviews with Northwestern students about their music listening habits, many emphasized that sharing music is a central part of the experience. From posting their Spotify Wrapped to highlighting favorite tracks on Instagram, sharing music allows them to express identity and connect with others.",
            "Some ways Gen Z shares music include:",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: sharingHabits,
              alt: "Examples of how Gen Z shares music: Spotify Wrapped, a Spotify Jam queue, a receipt-style top tracks list and a song shared to an Instagram story",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "The problem",
      title: "HMW evolve Amazon Music into a vibrant platform where fans can connect beyond just streaming?",
      variant: "statement",
    },
    {
      eyebrow: "Competitive analysis",
      title: "The audio streaming market is saturated with platforms offering similar core features.",
      blocks: [
        {
          type: "list",
          items: [
            "Spotify leads with rich social features like Jams, Blends, shared playlists, and friend activity.",
            "Apple Music offers limited social tools, mainly viewing friend activity in the “For You” tab.",
            "YouTube Music, SoundCloud, Pandora, and others offer basic, standard streaming features.",
          ],
        },
        { type: "emphasis", text: "So how can we create something that is “uniquely Amazon?”" },
        {
          type: "figures",
          figures: [
            {
              src: streamingPlatforms,
              alt: "Logos of the streaming platforms compared: YouTube Music, Spotify, Amazon Music, Apple Music, SoundCloud and Pandora",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Competitive differentiation",
      title: "Amazon Music can stand out by enhancing the music sharing experience.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With so much “noise” in a crowded market of streaming platforms offering nearly identical features, Amazon Music has the opportunity to truly experiment and push boundaries. Instead of focusing only on enhancing the listening experience through Ultra HD music, Amazon Music can stand out by reimagining how effortlessly users share songs across platforms and with peers.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: sharingFlows,
              alt: "Song sharing flows in current streaming apps: share sheets, story sharing and lyric cards",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Research validation",
      title: "Interviewing 20+ Gen Z music listeners revealed that users crave social listening and sharing experiences",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "We as a team conducted semi-structured interviews with current Spotify, Apple Music, YouTube Music, and Amazon Music listeners to validate our initial findings, understand different methods of music sharing experiences, and gather the emotional ties that music sharing as on users.",
          ],
        },
      ],
    },
    {
      eyebrow: "Understanding key insights",
      title: "Sharing music is more than an experience. It reflects identity and carries emotional value.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "From our interview notes, we found that sharing music has a deeper impact than expected. It is closely tied to personal identity and can bridge connections between people, strengthening existing bonds or creating new ones. Beyond posting songs on social media, sharing also happens through concerts or even simple conversations about music.",
          ],
        },
        {
          type: "figures",
          figures: [
            {
              src: interviewInsights,
              alt: "Illustrated conversation between two friends recommending songs to each other and bonding over them",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Who are we designing for?",
      title: "Creating user personas to guide and ground ideation.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "From our research, we developed three distinct personas. These serve as key references to our user groups, guiding brainstorming and ensuring that our designs remain user-centered.",
          ],
        },
        {
          type: "personas",
          items: [
            {
              name: "Social Sally",
              age: 20,
              favoriteArtist: "Charli XCX",
              body: "Sally loves talking about music, especially Charli XCX. Concerts and fan moments help her feel connected and make new friends.",
              lines: [
                "Charli XCX live? I would never miss it. That’s where I meet my people!",
                "Every new drop, I’m texting the group chat within five minutes.",
                "Music is honestly how I make friends.",
              ],
              portrait: portraitSocialSally,
            },
            {
              name: "Lurking Louise",
              age: 22,
              favoriteArtist: "Daniel Caesar",
              body: "Louise loves following music on social media. She made her first college friend by bonding over a Daniel Caesar album post.",
              lines: [
                "I don’t post much… but I see everything you share.",
                "I made my first college friend over a Daniel Caesar post!",
                "Scrolling music TikTok is half my personality.",
              ],
              portrait: portraitLurkingLouise,
            },
            {
              name: "Quiet Quincy",
              age: 21,
              favoriteArtist: "Adrianne Lenker",
              body: "Quincy enjoys listening to music alone and values Spotify Premium for its unlimited access to songs.",
              lines: [
                "Headphones on, world off. That’s my happy place.",
                "Spotify Premium is worth it. Unlimited songs, no ads, no fuss.",
                "Switch apps? All my playlists live on Spotify.",
              ],
              portrait: portraitQuietQuincy,
            },
          ],
        },
        {
          type: "subheading",
          title: "Considering brand loyalty when defining user groups.",
          paragraphs: [
            "Although the Quiet Quincy persona appeared in our research, we concluded that users deeply committed to a specific brand are unlikely to switch platforms. As a result, we chose to focus on Social Sally and Lurking Louise, exploring how their behaviors and experiences could be better supported on Amazon Music.",
          ],
        },
      ],
    },
    {
      eyebrow: "Brainstorming & ideation",
      title: "Brainstorming and ideating with our main personas in mind.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With a clearer understanding of how and why people share music, our team began brainstorming solutions tailored to our target audience and personas. We organized insights through affinity diagramming and held open whiteboarding sessions to generate a wide range of ideas and bring our early concepts to life.",
          ],
        },
        {
          type: "figures",
          fit: "bleed",
          columns: 2,
          figures: [
            { src: affinityDiagram, alt: "Affinity diagram of sticky notes on a window" },
            { src: whiteboarding, alt: "Concept sketching and whiteboarding session" },
          ],
        },
      ],
    },
    {
      eyebrow: "A focused solution",
      title: "Emphasizing community engagement and social interaction",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Leveraging insights from user interviews, we narrowed our solutions into a single page called Harmony, designed to host features that help users connect and build bonds with both new and familiar connections.",
            "Key features include:",
          ],
        },
        {
          type: "features",
          items: [
            {
              icon: "locate",
              title: "Local Events",
              body: "Local events help nearby users connect in person, whether to form new friendships or simply hang out with friends who share their music taste.",
            },
            {
              icon: "gamepad",
              title: "Interactives",
              body: "Alongside physical events, Amazon Music hosts digital events and games, offering a more playful way for people to connect through music than traditional methods.",
            },
            {
              icon: "inbox",
              title: "Sandbox",
              body: "Amazon Music could create a dedicated space for exclusive digital “interactives,” serving as a testing ground to experiment with what types of events resonate best.",
            },
            {
              icon: "mic",
              title: "Artist Events",
              body: "Showcasing events like artist-hosted concerts or meet-and-greets would strengthen community building, as fans seek these experiences to connect more deeply with both artists and like-minded listeners.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Wireframing & low-fidelities",
      title: "Wireframes reflecting the requirements of different users.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After extensive research and ideation, our team began creating the initial mockups to present to project stakeholders. These included basic grayscale wireframes and team-generated sketches.",
          ],
        },
        {
          type: "figures",
          columns: 3,
          figures: [
            {
              src: wireframeConcept1,
              alt: "Grayscale wireframe of a scrolling feed headed The Latest",
              caption: "Concept 1: Scrolling feed",
            },
            {
              src: wireframeConcept2,
              alt: "Grayscale wireframe of categorized pages: Local Events, Sandbox, Pop Up and Archives",
              caption: "Concept 2: Categorized pages",
            },
            {
              src: wireframeConcept3,
              alt: "Hand-sketched community page with a Music Match banner and upcoming event listings",
              caption: "Concept 3: Event listings",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Mid quarter shareouts",
      title: "Pivot following discussions with Amazon Music’s product manager.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "After presenting our initial concepts to the stakeholder, we noticed potential confusion and disorganization in some features. This led us to revise our designs, creating a clearer categorization to better address both user and stakeholder needs.",
          ],
        },
        {
          type: "subheading",
          title: "Pivot to simpler categorization.",
          paragraphs: [
            "We realized some solution features were overlapping, both aiming to create exclusive, trend-driven experiences like Spotify Wrapped. Sandbox and Interactives were intended to spark these interactions, but separating them added complexity. We merged them into a single feature, Time Sensitive Events, simplifying the user flow while maintaining excitement and engagement.",
          ],
        },
        {
          type: "merge",
          from: [
            { icon: "gamepad", title: "Interactives" },
            { icon: "inbox", title: "Sandbox" },
          ],
          to: { icon: "calendar", title: "Time Sensitive Events" },
        },
      ],
    },
    {
      eyebrow: "Iterated solution",
      title: "Simplifying event categorization.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "With the updated event categories, we further simplified our solution by organizing events by type. Digital events are labeled as Time Sensitive, while location-based or physical events are categorized as Physical.",
            "The new solution includes the following features:",
          ],
        },
        {
          type: "features",
          items: [
            {
              icon: "locate",
              title: "Physical Events",
              body: "Physical events provide meaningful opportunities to meet new people and build connections through shared music experiences in dedicated, in-person settings.",
            },
            {
              icon: "calendar",
              title: "Time Sensitive Events",
              body: "Time-Sensitive events include interactive experiences and digital games that can be played directly within the Amazon Music mobile app with other individuals.",
            },
          ],
        },
      ],
    },
    {
      eyebrow: "Final design",
      title: "An experience far beyond just streaming.",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Through an iterative design process and continuous revisions, we finalized our design and had the opportunity to present our findings and deliverables to a team of developers and designers at Amazon Music.",
          ],
        },
        {
          type: "figures",
          columns: 4,
          figures: [
            { src: finalNotification, alt: "Lock screen notification inviting users to this month's Music Pact" },
            { src: finalSplash, alt: "Harmony splash screen" },
            { src: finalFantasyLeagues, alt: "The Latest feed featuring Fantasy Music Leagues" },
            { src: finalMusicPact, alt: "The Latest feed featuring the Amazon Music Pact campus match" },
          ],
        },
        {
          type: "subheading",
          title: "Showcasing our work from the past quarter.",
          paragraphs: [],
        },
        {
          type: "figures",
          fit: "bleed",
          figures: [{ src: showcase, alt: "Our team presenting the final design to Amazon Music" }],
        },
      ],
    },
    {
      eyebrow: "Major takeaways & learnings",
      title: "Strong communication skills benefit both team collaboration and stakeholder engagement.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Understanding Individual Skillsets",
              body: "Throughout this project, I worked with teammates from diverse backgrounds, including journalism, computer science, and design like myself. Recognizing these unique skillsets and fostering an effective team environment enabled highly productive brainstorming sessions that allowed each of us to showcase our strengths.",
            },
            {
              title: "Proper Storytelling and Communication is Key",
              body: "This project involved frequent presentations and communication with key stakeholders. It required us not only to clearly articulate our ideas but also to engage the audience through compelling storytelling of our ideas.",
            },
          ],
        },
      ],
    },
  ],
};
