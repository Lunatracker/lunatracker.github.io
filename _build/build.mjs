// Builds every page of lunatracker.app from the data in content.mjs.
// Run from anywhere:  node _build/build.mjs
// No dependencies. The generated .html files are committed; GitHub Pages
// ignores this underscore folder.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  APP_STORE,
  PLAY_STORE,
  SITE,
  CONTACT,
  colors,
  articles,
  questionSections,
  homeFaq,
} from "./content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..");
const icons = JSON.parse(readFileSync(join(here, "icons.json"), "utf8"));
const CSS_VERSION = "20260916k";
const YEAR = 2026;

/* ---------------------------------------------------------------- helpers */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const paras = (text) =>
  text
    .split("\n\n")
    .map((p) => `<p>${esc(p)}</p>`)
    .join("\n");

const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${icons[name]}"/></svg>`;

// White titles on every colored card, as in the app's Learn tab.
const tone = () => "tone-light";
const accentStyle = (color) => `--accent:${colors[color]}`;

const wordCount = (a) =>
  [a.intro || "", ...a.sections.map((s) => `${s.header || ""} ${s.text}`),
    ...(a.parts || []).map((p) => p.text)]
    .join(" ")
    .split(/\s+/).length;
const readMins = (a) => Math.max(1, Math.round(wordCount(a) / 200));

// The app's CardDecor: four dots and an arc, five fixed layouts.
const DOTS = [
  [[16, "top:10px;left:18px"], [24, "top:22px;left:38px"], [10, "top:60px;left:48px"], [18, "top:20px;right:22px"]],
  [[20, "top:18px;right:20px"], [14, "top:42px;right:32px"], [10, "top:65px;right:18px"], [12, "bottom:20px;left:20px"]],
  [[18, "top:16px;right:24px"], [12, "bottom:18px;left:20px"], [22, "bottom:40px;right:30px"], [8, "top:50px;left:25px"]],
  [[16, "top:20px;left:22px"], [20, "top:50px;right:40px"], [12, "bottom:30px;right:20px"], [14, "bottom:55px;left:45px"]],
  [[22, "top:22px;right:18px"], [14, "top:55px;right:28px"], [10, "top:85px;right:16px"], [16, "bottom:25px;left:22px"]],
];
const decor = (index) =>
  `<span class="decor" aria-hidden="true"><span class="decor-arc"></span>${DOTS[index % DOTS.length]
    .map(([size, pos], i) => `<span class="dot dot-${i}" style="width:${size}px;height:${size}px;${pos}"></span>`)
    .join("")}</span>`;

const brandMark = (size = 40) =>
  `<span class="brand-mark" style="--size:${size}px" aria-hidden="true">${icon("moonWaningCrescent")}</span>`;

/* ------------------------------------------------------------- page parts */

const NAV = [
  ["features.html", "Features", "features"],
  ["learn.html", "Learn", "learn"],
  ["questions.html", "Question Box", "questions"],
  ["parents.html", "For Parents", "parents"],
];

function head({ title, description, path, root, extra = "", ogImage }) {
  const url = SITE + path;
  const image = ogImage ? SITE + ogImage : `${SITE}images/phone.png`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" type="image/png" href="${root}images/base.png" />
    <link rel="apple-touch-icon" href="${root}images/base.png" />
    <meta name="theme-color" content="#fff0db" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&family=Caveat:wght@600&family=Outfit:wght@500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${root}styles.css?v=${CSS_VERSION}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Luna" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="apple-itunes-app" content="app-id=1607897488" />
${extra}
    <script>document.documentElement.classList.add("js")</script>
    <script src="${root}site.js?v=${CSS_VERSION}" defer></script>
  </head>`;
}

function nav(root, active) {
  const links = NAV.map(
    ([href, label, key]) =>
      `<a href="${root}${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("\n          ");
  return `
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="nav-inner">
        <a class="brand brand-header" href="${root}index.html" aria-label="Luna home">
          <img class="brand-moon" src="${root}images/splash-icon.png" alt="" width="454" height="495" />
          <span class="wordmark">Luna</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="visually-hidden">Menu</span>
          ${icon("menu", "icon-open")}${icon("close", "icon-close")}
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Main">
          ${links}
          <a class="btn btn-small" href="${root}index.html#download">Get the app</a>
        </nav>
      </div>
    </header>`;
}

const badges = (root, id) => `<div class="store-badges">
          <a href="${APP_STORE}" target="_blank" rel="noopener noreferrer" id="${id}-app-store">
            <img src="${root}images/appstore.png" alt="Download Luna on the App Store" width="219" height="65" />
          </a>
          <a href="${PLAY_STORE}" target="_blank" rel="noopener noreferrer" id="${id}-play-store">
            <img src="${root}images/playstore.png" alt="Get Luna on Google Play" width="221" height="66" />
          </a>
        </div>`;

function downloadBand(root, id = "download") {
  return `
    <section class="download-band" id="${id}" aria-labelledby="${id}-title">
      <div class="hero-card download-card" style="${accentStyle("purple")}">
        ${decor(2)}
        <span class="hero-ring"><span class="moon-badge"><img src="${root}images/splash-icon.png" alt="" width="454" height="495" /></span></span>
        <h2 id="${id}-title">Get Luna on your phone</h2>
        <p>Track your period, get a heads-up before it starts, and learn how your body works.</p>
        ${badges(root, id)}
      </div>
    </section>`;
}

function footer(root) {
  const learnLinks = articles
    .map((a) => `<li><a href="${root}learn/${a.slug}.html">${esc(a.card)}</a></li>`)
    .join("\n              ");
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <a class="brand" href="${root}index.html">${brandMark(34)}<span class="wordmark">Luna</span></a>
          <p>The period tracker made for teens and tweens. Made by a teacher.</p>
          ${badges(root, "footer")}
        </div>
        <div class="footer-cols">
          <div>
            <h2>The app</h2>
            <ul>
              <li><a href="${root}features.html">Features</a></li>
              <li><a href="${root}parents.html">For parents</a></li>
              <li><a href="${root}index.html#faq">FAQ</a></li>
              <li><a href="${root}index.html#download">Download</a></li>
            </ul>
          </div>
          <div>
            <h2>Learn</h2>
            <ul>
              <li><a href="${root}learn.html">All articles</a></li>
              ${learnLinks}
              <li><a href="${root}questions.html">Question Box</a></li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="mailto:${CONTACT}">Contact us</a></li>
              <li><a href="${root}privacy.html">Privacy Policy</a></li>
              <li><a href="${root}terms.html">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p class="footer-note">
        Luna's articles are for learning, not medical advice. If you're worried about your health, talk to a doctor or a trusted adult.
      </p>
      <p class="footer-copy">&copy; Dotty Apps LLC ${YEAR}. All rights reserved.</p>
    </footer>
  </body>
</html>
`;
}

function learnCard(a, root, index, headingLevel = "h3") {
  return `<a class="learn-card ${tone(a.color)}" href="${root}learn/${a.slug}.html" style="${accentStyle(a.color)}">
            <span class="learn-card-top">
              ${decor(index)}
              <span class="icon-ring">${icon(a.icon)}</span>
              <${headingLevel} class="learn-card-title">${esc(a.card)}</${headingLevel}>
            </span>
            <span class="learn-card-body">
              <span class="learn-card-blurb">${esc(a.blurb)}</span>
              <span class="learn-card-meta">${a.kind ? "Interactive · " : ""}${readMins(a)} min read ${icon("arrowRight")}</span>
            </span>
          </a>`;
}

const questionBoxCard = (root, index, headingLevel = "h3") => {
  return `<a class="learn-card tone-light" href="${root}questions.html" style="${accentStyle("blue")}">
            <span class="learn-card-top">
              ${decor(index)}
              <span class="icon-ring">${icon("cloudQuestion")}</span>
              <${headingLevel} class="learn-card-title">Question Box</${headingLevel}>
            </span>
            <span class="learn-card-body">
              <span class="learn-card-blurb">Real questions about periods, puberty and more, answered in plain words.</span>
              <span class="learn-card-meta">${questionSections.length} topics ${icon("arrowRight")}</span>
            </span>
          </a>`;
};

function sourceLink(src) {
  if (!src) return "";
  return `<p class="source">Source: <a href="${src.url}" target="_blank" rel="noopener noreferrer">${esc(src.label)}</a></p>`;
}

const jsonLd = (obj) =>
  `    <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>`;

function write(path, html) {
  const file = join(out, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log("wrote", path);
}

/* ------------------------------------------------------------------ home */

function homePage() {
  const root = "";
  const app = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Luna Period Tracker For Teens",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    url: SITE,
    image: `${SITE}images/phone.png`,
    description:
      "Luna is a period tracker built for teens, tweens, and anyone starting their period. Cycle predictions designed for teen bodies, prep-day reminders, interactive lessons, and a Question Box of answers. No ads, and your data is never sold.",
    author: { "@type": "Organization", name: "Dotty Apps LLC" },
    installUrl: APP_STORE,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const sampleQs = [
    questionSections[0].items[1],
    questionSections[1].items[2],
    questionSections[2].items[2],
  ];

  return (
    head({
      title: "Luna: Period Tracker for Teens & Tweens",
      description:
        "A period tracker made for teens and tweens. Predictions designed for young cycles, prep-day reminders, interactive lessons, and answers to your period questions. No ads, ever.",
      path: "",
      root,
      extra: `${jsonLd(app)}\n${jsonLd(faq)}`,
    }) +
    nav(root, "home") +
    `
    <main id="main">
      <section class="home-hero">
        <div class="home-hero-inner">
          <div class="home-hero-copy reveal">
            <div class="hero-lockup">
              <p class="hero-tagline">Period tracker <span class="squiggle">for teens</span> <span class="tagline-note">and tweens</span></p>
            </div>
            <h1>Feel <span class="highlight">great</span> about your period.</h1>
            <p class="lede">
              Luna helps you know when your period is coming, get ready for it,
              and understand what your body is doing. Made by a teacher, for
              the students who asked for it.
            </p>
            ${badges(root, "hero")}
            <ul class="hero-points">
              <li>${icon("checkCircle")} No ads, ever</li>
              <li>${icon("checkCircle")} Your data is never sold</li>
              <li>${icon("checkCircle")} Passcode lock</li>
            </ul>
          </div>
          <div class="home-hero-art reveal">
            <span class="blob blob-pink" aria-hidden="true"></span>
            <span class="blob blob-teal" aria-hidden="true"></span>
            <span class="blob blob-orange" aria-hidden="true"></span>
            <img class="phone" src="images/phone.png" alt="The Luna calendar, with period days in purple and prep days in teal" width="452" height="928" fetchpriority="high" />
            <div class="float-chip chip-reminder" aria-hidden="true">
              <span class="chip-icon">${icon("bellRing")}</span>
              <span><strong>Reminder</strong><br />Event tomorrow.</span>
            </div>
            <div class="float-chip chip-prep" aria-hidden="true">
              <span class="swatch swatch-prep"></span> Prep day
              <span class="swatch swatch-period"></span> Period day
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="peek-title">
        <div class="container">
          <header class="section-head reveal">
            <p class="eyebrow">What's inside</p>
            <h2 id="peek-title">Everything you need, nothing you don't</h2>
            <p>Having a period is a lot to manage, but there's no need to be surprised.</p>
          </header>
          <div class="tile-grid">
            ${[
              ["pink", "calendarHeart", "A calendar that's yours", "Pick your own colors, add stickers, and see when your next period is coming."],
              ["blue", "imageMultiple", "Backgrounds and themes", "Choose a photo, a color, or use a picture of your own."],
              ["green", "bookOpenVariant", "Learn the real stuff", "Short, honest answers to the things everyone wonders about."],
              ["purple", "accountHeart", "Link a parent, if you want", "A parent or guardian can follow along and help. Your notes are never shared."],
            ]
              .map(
                ([c, i, t, d], n) => `<article class="feature-tile reveal" style="${accentStyle(c)}">
              <span class="feature-tile-art">${decor(n)}<span class="icon-ring">${icon(i)}</span></span>
              <h3>${t}</h3>
              <p>${d}</p>
            </article>`
              )
              .join("\n            ")}
          </div>
          <p class="center"><a class="btn btn-outline" href="features.html">See all features ${icon("arrowRight")}</a></p>
        </div>
      </section>

      <section class="section section-white" aria-label="How Luna helps">
        <div class="container rows">
          <article class="row reveal">
            <div class="row-media">
              <img src="images/pic02.jpg" alt="Luna calendar showing predicted period days and prep days" width="620" height="769" loading="lazy" />
              <span class="note note-a" aria-hidden="true">no surprises!</span>
            </div>
            <div class="row-copy">
              <p class="eyebrow" style="${accentStyle("pink")}">Track</p>
              <h2>Know when it's coming</h2>
              <p>
                Log your period and Luna learns your rhythm, with predictions
                designed for teen bodies, whose cycles are often still settling
                in. Prep days and a discreet reminder give you time to pack a
                pad before the next one starts.
              </p>
              <a class="text-link" href="features.html#track">How tracking works ${icon("arrowRight")}</a>
            </div>
          </article>
          <article class="row row-flip reveal">
            <div class="row-media">
              <img src="images/pic01.jpg" alt="Interactive lesson in Luna showing the menstrual cycle at ovulation" width="620" height="760" loading="lazy" />
              <span class="note note-b" aria-hidden="true">actually interesting</span>
            </div>
            <div class="row-copy">
              <p class="eyebrow" style="${accentStyle("green")}">Learn</p>
              <h2>See how periods work</h2>
              <p>
                What actually makes a period happen? Interactive lessons walk
                you through your cycle step by step, so your body makes sense
                instead of feeling like a mystery.
              </p>
              <a class="text-link" href="learn/how-periods-work.html">Try the cycle lesson ${icon("arrowRight")}</a>
            </div>
          </article>
          <article class="row reveal">
            <div class="row-media">
              <img src="images/pic03.jpg" alt="Luna's Question Box, with topics like periods as a teen, how periods work, and self care" width="620" height="760" loading="lazy" />
              <span class="note note-c" aria-hidden="true">ask away!</span>
            </div>
            <div class="row-copy">
              <p class="eyebrow" style="${accentStyle("blue")}">Ask</p>
              <h2>Questions? Answered.</h2>
              <p>
                "How do I use pads and tampons?" "Is there a lot of blood?"
                The Question Box has clear, judgment-free answers, sorted by
                topic.
              </p>
              <a class="text-link" href="questions.html">Open the Question Box ${icon("arrowRight")}</a>
            </div>
          </article>
        </div>
      </section>

      <section class="section" aria-labelledby="learn-title">
        <div class="container">
          <header class="section-head reveal">
            <p class="eyebrow">From the Learn tab</p>
            <h2 id="learn-title">Read it here, too</h2>
            <p>Every lesson from the app, now on the web.</p>
          </header>
          <div class="learn-grid">
          ${articles.slice(0, 3).map((a, i) => learnCard(a, root, i)).join("\n          ")}
          </div>
          <p class="center"><a class="btn btn-outline" href="learn.html">See all articles ${icon("arrowRight")}</a></p>
        </div>
      </section>

      <section class="section section-white" aria-labelledby="qbox-title">
        <div class="container narrow">
          <header class="section-head reveal">
            <p class="eyebrow">Question Box</p>
            <h2 id="qbox-title">Things everyone wonders about</h2>
          </header>
          <div class="qa-list reveal">
            ${sampleQs.map((item) => qa(item)).join("\n            ")}
          </div>
          <p class="center"><a class="btn" href="questions.html">See all the questions ${icon("arrowRight")}</a></p>
        </div>
      </section>

      <section class="section" aria-labelledby="parents-title">
        <div class="container">
          <div class="split-card reveal" style="${accentStyle("blue")}">
            <div class="split-card-copy">
              <p class="eyebrow">For parents &amp; guardians</p>
              <h2 id="parents-title">Help without hovering</h2>
              <p>
                With a parent account, you can link to your child's Luna, see
                when their next period is likely, and get a heads-up so
                supplies are ready. Their private notes stay private.
              </p>
              <a class="btn" href="parents.html">Luna for parents ${icon("arrowRight")}</a>
            </div>
            <div class="split-card-art" aria-hidden="true">
              ${decor(4)}
              <span class="icon-ring big">${icon("handHeart")}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="promise" aria-labelledby="promise-title">
        <h2 id="promise-title" class="handwritten">the Luna promise ♡</h2>
        <ul>
          <li>${icon("advertisementsOff")} No ads, ever</li>
          <li>${icon("shieldCheck")} Your data is never sold</li>
          <li>${icon("lock")} Optional passcode lock</li>
        </ul>
      </section>

      <section class="section" aria-labelledby="about-title">
        <div class="container narrow">
          <div class="about-tile reveal">
            <span class="icon-ring solid" style="${accentStyle("orange")}">${icon("school")}</span>
            <div>
              <p class="eyebrow">Why Luna exists</p>
              <h2 id="about-title">Made by a teacher</h2>
              <p>
                Luna was created by a middle school teacher who wanted
                something genuinely helpful for their students: a period
                tracker without ads or grown-up assumptions.
              </p>
              <a class="text-link" href="mailto:${CONTACT}">${icon("email")} ${CONTACT}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-white" id="faq" aria-labelledby="faq-title">
        <div class="container narrow">
          <header class="section-head reveal">
            <p class="eyebrow">FAQ</p>
            <h2 id="faq-title">Questions about the app</h2>
          </header>
          <div class="qa-list">
            ${homeFaq.map((item) => qa({ q: item.q, a: item.a })).join("\n            ")}
          </div>
        </div>
      </section>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

function qa(item, id) {
  return `<details class="qa"${id ? ` id="${id}"` : ""}>
              <summary><span>${esc(item.q)}</span>${icon("chevronDown", "qa-chevron")}</summary>
              <div class="qa-body">
                ${paras(item.a)}
                ${sourceLink(item.source)}
              </div>
            </details>`;
}

/* -------------------------------------------------------------- features */

function featuresPage() {
  const root = "";
  const blocks = [
    {
      id: "track",
      color: "pink",
      icon: "calendarHeart",
      eyebrow: "Track",
      title: "A calendar that knows teen cycles",
      text: "Log period days with a tap and Luna predicts what's next. Predictions are built for young cycles, which can be anywhere from about 20 to 45 days apart while they settle in, and they keep getting better as you log.",
      points: [
        "Period days and prep days, right on the calendar",
        "Pick your own period, prep-day and today colors",
        "Adjust how Luna predicts in Settings",
      ],
      img: ["images/pic02.jpg", "Luna calendar with predicted period and prep days", 620, 769],
    },
    {
      id: "prep",
      color: "primary",
      icon: "bellRing",
      eyebrow: "Get ready",
      title: "Prep days and discreet reminders",
      text: "Prep days show up before your period is expected, so you have time to pack a pad or pop some supplies in your bag. Turn on notifications and Luna sends a reminder that just says \"Event tomorrow.\" Nobody looking over your shoulder will know what it's about.",
      points: ["Turn prep days on or off", "Reminders that don't give anything away"],
    },
    {
      id: "log",
      color: "orange",
      icon: "notebook",
      eyebrow: "Log your day",
      title: "Symptoms, flow and notes",
      text: "Tap a day to log how it went. Over time you'll learn the signs that your period is on its way.",
      points: [
        "Flow: spotting, light, medium or heavy",
        "Cramps, bloating, sore breasts, headaches, back pain, nausea and discharge",
        "Moods, plus your own custom symptoms",
        "Private notes for anything else",
      ],
      symptoms: true,
    },
    {
      id: "yours",
      color: "blue",
      icon: "palette",
      eyebrow: "Make it yours",
      title: "Backgrounds, colors and stickers",
      text: "Choose a photo background, a color, or a picture of your own. Decorate your calendar with stickers, and pick what shows on your home page.",
      points: ["Photo and color themes", "Use your own picture", "Calendar stickers"],
    },
    {
      id: "learn",
      color: "green",
      icon: "bookOpenVariant",
      eyebrow: "Learn",
      title: "Lessons and a Question Box",
      text: "Lessons cover first periods, supplies, cramps, hormones and more, including interactive diagrams of the reproductive system and the menstrual cycle. The Question Box answers real questions, sorted by topic.",
      points: [],
      links: true,
      img: ["images/pic03.jpg", "Luna's Question Box topics", 620, 760],
    },
    {
      id: "private",
      color: "purple",
      icon: "shieldLock",
      eyebrow: "Private",
      title: "Private by design",
      text: "Luna has no ads and never sells your data. Lock the app with a passcode, and keep your notes to yourself, even from a linked parent.",
      points: ["Optional passcode lock", "No ads, ever", "Your data is never sold", "Notes are never shared with a parent"],
    },
    {
      id: "plus",
      color: "pink",
      icon: "cloudUpload",
      eyebrow: "Luna+",
      title: "Back up with Luna+",
      text: "Luna+ is Luna's subscription. Sign in to back up your data, so it's safe if you lose your phone and ready on a new one. Luna+ also unlocks photo backgrounds and calendar stickers.",
      points: ["Cloud backup and restore", "Photo backgrounds and your own pictures", "Calendar stickers", "A parent's Luna+ can cover their linked child's backup"],
    },
    {
      id: "parents",
      color: "blue",
      icon: "accountHeart",
      eyebrow: "Family",
      title: "Link a parent, if you want",
      text: "A parent or guardian can link to your Luna with a short code, follow along with your cycle, and get a heads-up before your period so they can help.",
      points: [],
      more: ["parents.html", "Luna for parents"],
    },
  ];

  const symptomRow = `<div class="symptom-row" aria-hidden="true">
                ${["cramps", "bloat", "headache", "moody", "happy", "acne"]
                  .map((s) => `<img src="images/symptoms/${s}.png" alt="" width="48" height="48" loading="lazy" />`)
                  .join("")}
              </div>`;

  const body = blocks
    .map((b, i) => {
      const media = b.img
        ? `<div class="row-media"><img src="${b.img[0]}" alt="${esc(b.img[1])}" width="${b.img[2]}" height="${b.img[3]}" loading="lazy" /></div>`
        : `<div class="row-media row-media-art ${tone(b.color)}" style="${accentStyle(b.color)}" aria-hidden="true">${decor(i)}<span class="icon-ring big">${icon(b.icon)}</span></div>`;
      const links = b.links
        ? `<ul class="chip-list">${articles
            .map((a) => `<li><a class="chip" style="${accentStyle(a.color)}" href="learn/${a.slug}.html">${esc(a.card)}</a></li>`)
            .join("")}<li><a class="chip" style="${accentStyle("blue")}" href="questions.html">Question Box</a></li></ul>`
        : "";
      return `
          <article class="row${i % 2 ? " row-flip" : ""} reveal" id="${b.id}">
            ${media}
            <div class="row-copy">
              <p class="eyebrow" style="${accentStyle(b.color)}">${icon(b.icon)} ${b.eyebrow}</p>
              <h2>${esc(b.title)}</h2>
              <p>${esc(b.text)}</p>
              ${b.symptoms ? symptomRow : ""}
              ${b.points.length ? `<ul class="checks">${b.points.map((p) => `<li>${icon("checkCircle")} ${esc(p)}</li>`).join("")}</ul>` : ""}
              ${links}
              ${b.more ? `<a class="text-link" href="${b.more[0]}">${b.more[1]} ${icon("arrowRight")}</a>` : ""}
            </div>
          </article>`;
    })
    .join("");

  return (
    head({
      title: "Features: Luna Period Tracker for Teens",
      description:
        "Everything in Luna: teen-friendly period predictions, prep days, discreet reminders, symptom and mood logging, themes, stickers, lessons, a Question Box, passcode lock and parent linking.",
      path: "features.html",
      root,
    }) +
    nav(root, "features") +
    `
    <main id="main">
      <section class="page-hero">
        <div class="hero-card page-hero-card tone-light" style="${accentStyle("pink")}">
          ${decor(1)}
          <span class="icon-ring">${icon("star")}</span>
          <h1>What Luna can do</h1>
        </div>
        <p class="page-hero-sub">A period tracker that fits the way young cycles actually work, and looks the way you want it to.</p>
        <nav class="jump-links" aria-label="Features on this page">
          ${blocks.map((b) => `<a href="#${b.id}" style="${accentStyle(b.color)}">${b.eyebrow}</a>`).join("\n          ")}
        </nav>
      </section>
      <section class="section section-white">
        <div class="container rows">${body}
        </div>
      </section>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

/* --------------------------------------------------------------- parents */

function parentsPage() {
  const root = "";
  const talking = questionSections.find((s) => s.id === "talking-to-adults");
  const steps = [
    ["Set up your parent account", "Download Luna, choose \"I'm a parent,\" and create your account."],
    ["Get a link code", "Luna gives you a short code to share with your child."],
    ["Help your child track", "You'll see their cycle and get a heads-up before their period."],
  ];
  const faq = [
    {
      q: "What can I see once we're linked?",
      a: "You can see what your child tracks in Luna, like their period days, symptoms, and when the next period is likely to start. Everything except their notes. You can also turn on reminders that give you a heads-up before a period is likely to begin.",
    },
    {
      q: "My child is young. Do I need to be involved?",
      a: "Yes. A child under 13 (or the age of privacy consent in your country) needs a linked parent account, and a parent gives consent before any of their data is stored in the cloud. Older teens can choose whether to link a parent.",
    },
    {
      q: "Does my child need their own subscription?",
      a: "No. Linking and backup are part of Luna+, and your Luna+ can cover your linked child's backup.",
    },
    {
      q: "Can I link more than one child?",
      a: "Yes, you can link up to four children and switch between them. Reminders follow the child you're currently viewing.",
    },
  ];

  return (
    head({
      title: "For Parents: Luna Period Tracker for Teens",
      description:
        "How Luna helps parents and guardians support a child's first periods: link with a code, see upcoming periods, get a heads-up, and keep their notes private.",
      path: "parents.html",
      root,
    }) +
    nav(root, "parents") +
    `
    <main id="main">
      <section class="page-hero">
        <div class="hero-card page-hero-card tone-light" style="${accentStyle("blue")}">
          ${decor(3)}
          <span class="icon-ring">${icon("handHeart")}</span>
          <h1>Link to your child's Luna</h1>
        </div>
        <p class="page-hero-sub sub-black">With a parent account, you can follow your child's cycle and get a heads-up before their period is likely to start, so supplies are ready and nobody is caught off guard.</p>
      </section>

      <section class="section section-tight" aria-label="How to link">
        <div class="container">
          <ol class="steps">
            ${steps
              .map(
                ([t, d], i) => `<li class="step reveal">
              <span class="step-num">${i + 1}</span>
              <h3>${t}</h3>
              <p>${esc(d)}</p>
            </li>`
              )
              .join("\n            ")}
          </ol>
        </div>
      </section>

      <section class="section section-white">
        <div class="container">
          <div class="tile-grid three">
            ${[
              ["green", "bookOpenVariant", "They learn the basics", "Lessons written for kids and teens cover first periods, supplies, cramps and hormones, in a calm, shame-free voice."],
              ["pink", "calendarClock", "They're ready in time", "Predictions made for irregular early cycles, plus prep days, mean fewer surprises at school."],
              ["purple", "shieldLock", "Their space stays safe", "No ads, no data selling, an optional passcode, and notes that stay private."],
            ]
              .map(
                ([c, i, t, d], n) => `<article class="feature-tile reveal" style="${accentStyle(c)}">
              <span class="feature-tile-art">${decor(n + 1)}<span class="icon-ring">${icon(i)}</span></span>
              <h2>${t}</h2>
              <p>${d}</p>
            </article>`
              )
              .join("\n            ")}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="talk-title">
        <div class="container narrow">
          <header class="section-head reveal">
            <p class="eyebrow">From the Question Box</p>
            <h2 id="talk-title">What we tell teens about talking to you</h2>
            <p>If your child seems hesitant, these answers from the app might help you start the conversation, too.</p>
          </header>
          <div class="qa-list">
            ${talking.items.map((item) => qa(item)).join("\n            ")}
          </div>
          <p class="center"><a class="btn btn-outline" href="learn.html">Read the lessons your child sees ${icon("arrowRight")}</a></p>
        </div>
      </section>

      <section class="section section-white" aria-labelledby="pfaq-title">
        <div class="container narrow">
          <header class="section-head reveal">
            <p class="eyebrow">FAQ</p>
            <h2 id="pfaq-title">Questions from parents</h2>
          </header>
          <div class="qa-list">
            ${faq.map((item) => qa(item)).join("\n            ")}
          </div>
          <p class="center muted">Something else? Email us at <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
        </div>
      </section>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

/* ----------------------------------------------------------------- learn */

function learnHub() {
  const root = "";
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}learn/${a.slug}.html`,
      name: a.title,
    })),
  };
  return (
    head({
      title: "Learn: Period Lessons for Teens | Luna",
      description:
        "Every lesson from Luna's Learn tab: normal teen periods, period supplies, handling cramps, your first period, the reproductive system, the menstrual cycle, and hormones.",
      path: "learn.html",
      root,
      extra: jsonLd(list),
    }) +
    nav(root, "learn") +
    `
    <main id="main">
      <section class="page-hero">
        <div class="hero-card page-hero-card tone-light" style="${accentStyle("green")}">
          ${decor(0)}
          <span class="icon-ring">${icon("bookOpenVariant")}</span>
          <h1>Learn the real stuff</h1>
        </div>
        <p class="page-hero-sub">Every lesson from the app's Learn tab. Short, honest, and written for teens and tweens.</p>
      </section>
      <section class="section">
        <div class="container">
          <div class="learn-grid">
          ${articles.map((a, i) => learnCard(a, root, i, "h2")).join("\n          ")}
          ${questionBoxCard(root, articles.length, "h2")}
          </div>
        </div>
      </section>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

function bodyInteractive(a) {
  const layers = a.parts
    .map(({ id, img, box: [x, y, w, h], name }) => {
      const style = `left:${((x / 721) * 100).toFixed(3)}%;top:${((y / 596) * 100).toFixed(3)}%;width:${((w / 721) * 100).toFixed(3)}%;height:${((h / 596) * 100).toFixed(3)}%`;
      return `<img class="body-layer" data-part="${id}" src="../${img}" alt="" style="${style}" />`;
    })
    .join("\n              ");
  const buttons = a.parts
    .map(({ id, name }) => `<button type="button" class="chip" data-part="${id}" aria-pressed="false">${name}</button>`)
    .join("\n              ");
  const texts = a.parts
    .map(({ id, name, text }) => `<template data-part="${id}"><h2>${name}</h2><p>${esc(text)}</p></template>`)
    .join("\n            ");
  return `
        <div class="interactive body-diagram tile" data-body-diagram>
          <div class="body-stage">
            <img class="body-base" src="../images/learn/body/FRSdiagram.png" alt="Diagram of the internal female reproductive system" width="721" height="596" />
              ${layers}
          </div>
          <div class="body-panel">
            <div class="chip-list" role="group" aria-label="Parts of the reproductive system">
              ${buttons}
            </div>
            <div class="body-text" aria-live="polite">
              <p>${esc(a.intro)}</p>
            </div>
            ${texts}
          </div>
        </div>`;
}

function cycleInteractive(a) {
  // Donut proportions follow the app's chart: period, lining, ovulation, lining.
  const phases = [
    ["period", 0.18, colors.purple, "Period"],
    ["lining1", 0.28, colors.primary, "Lining builds"],
    ["ovulation", 0.07, "#FF9F1C", "Ovulation"],
    ["lining2", 0.47, colors.primary, "Lining builds"],
  ];
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = phases
    .map(([id, frac, color]) => {
      const len = frac * c;
      const arc = `<circle class="cycle-arc" data-phase="${id}" r="${r}" cx="100" cy="100" stroke="${color}" stroke-dasharray="${(len - 3).toFixed(2)} ${(c - len + 3).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" />`;
      offset += len;
      return arc;
    })
    .join("\n                ");
  const steps = a.sections
    .map(
      (s, i) => `<li class="cycle-step${i === 0 ? " is-active" : ""}" data-phase="${s.phase}" data-img="../${s.img}"${i ? " hidden" : ""}>
                <p class="cycle-count">Step ${i + 1} of ${a.sections.length}</p>
                <h2>${esc(s.header)}</h2>
                ${paras(s.text)}
              </li>`
    )
    .join("\n              ");
  return `
        <div class="interactive cycle tile" data-cycle>
          <div class="cycle-visual">
            <img class="cycle-img" src="../${a.sections[0].img}" alt="The uterus and ovaries at this step of the cycle" width="490" height="490" />
            <svg class="cycle-wheel" viewBox="0 0 200 200" role="img" aria-label="Menstrual cycle wheel">
              <g transform="rotate(-90 100 100)">
                ${arcs}
              </g>
              <text x="100" y="106" text-anchor="middle" class="cycle-label">${phases[0][3]}</text>
            </svg>
          </div>
          <div class="cycle-copy">
            <ol class="cycle-steps">
              ${steps}
            </ol>
            <div class="cycle-controls">
              <button type="button" class="btn btn-outline" data-cycle-prev disabled>${icon("arrowLeft")} Back</button>
              <button type="button" class="btn" data-cycle-next>Next ${icon("arrowRight")}</button>
            </div>
          </div>
        </div>`;
}

function articlePage(a, index) {
  const root = "../";
  const others = articles
    .map((x, i) => [x, i])
    .filter(([x]) => x !== a);
  const next = [others[index % others.length], others[(index + 1) % others.length]];

  let body;
  if (a.kind === "body") {
    body = bodyInteractive(a);
  } else if (a.kind === "cycle") {
    body = `${cycleInteractive(a)}
        <noscript>${a.sections.map((s) => `<h2>${esc(s.header)}</h2>${paras(s.text)}`).join("")}</noscript>`;
  } else {
    body = a.sections
      .map((s, i) => {
        const img = s.img
          ? `<div class="section-art" style="${accentStyle(a.color)}"><img src="../${s.img}" alt="" loading="lazy" /></div>`
          : "";
        if (i === 0 && !s.header) {
          return `
        <div class="article-intro tile">
          <div class="section-art" style="${accentStyle(a.color)}"><img src="../${a.image}" alt="" /></div>
          <div>${paras(s.text)}</div>
        </div>`;
        }
        return `
        <section class="article-section tile${img ? " has-art" : ""}">
          ${img}
          <div>
            <h2>${esc(s.header)}</h2>
            ${paras(s.text)}
          </div>
        </section>`;
      })
      .join("");
    if (a.sections[0].header) {
      body =
        `
        <div class="article-intro tile only-art">
          <div class="section-art" style="${accentStyle(a.color)}"><img src="../${a.image}" alt="" /></div>
        </div>` + body;
    }
  }

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.blurb,
    image: SITE + a.image,
    url: `${SITE}learn/${a.slug}.html`,
    publisher: { "@type": "Organization", name: "Dotty Apps LLC" },
    audience: { "@type": "PeopleAudience", suggestedMinAge: 9 },
  };

  return (
    head({
      title: `${a.title} | Luna`,
      description: a.blurb,
      path: `learn/${a.slug}.html`,
      root,
      extra: jsonLd(ld),
      ogImage: a.image,
    }) +
    nav(root, "learn") +
    `
    <main id="main" class="article">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../learn.html">${icon("arrowLeft")} All articles</a>
      </nav>
      <header class="page-hero">
        <div class="hero-card page-hero-card ${tone(a.color)}" style="${accentStyle(a.color)}">
          ${decor(index)}
          <span class="icon-ring">${icon(a.icon)}</span>
          <h1>${esc(a.title)}</h1>
        </div>
        <p class="page-hero-sub">${esc(a.blurb)}</p>
        <p class="article-meta">${a.kind ? "Interactive · " : ""}${readMins(a)} min read · From the Luna app's Learn tab</p>
      </header>
      <div class="article-body">${body}
        ${sourceLink(a.source)}
      </div>

      <section class="section" aria-labelledby="more-title">
        <div class="container">
          <h2 class="more-title" id="more-title">Keep learning</h2>
          <div class="learn-grid">
          ${next.map(([x, i]) => learnCard(x, root, i)).join("\n          ")}
          ${questionBoxCard(root, index + 2)}
          </div>
        </div>
      </section>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

/* ------------------------------------------------------------- questions */

function questionsPage() {
  const root = "";
  const sections = questionSections
    .map(
      (s, i) => `
          <section class="q-section" id="${s.id}" aria-labelledby="${s.id}-title" data-q-section>
            <div class="q-section-head ${tone(s.color)}" style="${accentStyle(s.color)}">
              ${decor(i)}
              <span class="icon-ring">${icon(s.icon)}</span>
              <h2 id="${s.id}-title">${esc(s.title)}</h2>
              <span class="q-count">${s.items.length} questions</span>
            </div>
            <div class="qa-list">
            ${s.items.map((item, j) => qa(item, `${s.id}-${j + 1}`)).join("\n            ")}
            </div>
          </section>`
    )
    .join("");

  return (
    head({
      title: "Question Box: Period & Puberty Questions Answered | Luna",
      description: `Real questions from teens about periods, puberty, self care, the reproductive system and more, answered in plain words by the Luna app.`,
      path: "questions.html",
      root,
    }) +
    nav(root, "questions") +
    `
    <main id="main">
      <section class="page-hero">
        <div class="hero-card page-hero-card tone-light" style="${accentStyle("blue")}">
          ${decor(2)}
          <span class="icon-ring">${icon("cloudQuestion")}</span>
          <h1>Question Box</h1>
        </div>
        <p class="page-hero-sub">Questions about periods and growing up, answered in plain words. No question is weird.</p>
        <div class="q-search tile">
          ${icon("magnify")}
          <label class="visually-hidden" for="q-search">Search the questions</label>
          <input id="q-search" type="search" placeholder="Search, like &quot;cramps&quot; or &quot;tampon&quot;" autocomplete="off" data-q-search />
        </div>
        <p class="q-empty" data-q-empty hidden>No questions match that. Try another word.</p>
        <nav class="jump-links" aria-label="Question topics">
          ${questionSections.map((s) => `<a href="#${s.id}" style="${accentStyle(s.color)}">${esc(s.title)}</a>`).join("\n          ")}
        </nav>
      </section>
      <div class="container narrow q-sections">${sections}
      </div>
${downloadBand(root)}
    </main>` +
    footer(root)
  );
}

/* ----------------------------------------------------------------- legal */

function legalPage(slug, title, description) {
  const root = "";
  const inner = readFileSync(join(here, "content", `${slug}.html`), "utf8");
  return (
    head({ title, description, path: `${slug}.html`, root }) +
    nav(root, slug) +
    `
    <main id="main" class="legal tile">
${inner}
    </main>` +
    footer(root)
  );
}

/* ----------------------------------------------------------------- build */

write("index.html", homePage());
write("features.html", featuresPage());
write("parents.html", parentsPage());
write("learn.html", learnHub());
articles.forEach((a, i) => write(`learn/${a.slug}.html`, articlePage(a, i)));
write("questions.html", questionsPage());
write(
  "privacy.html",
  legalPage(
    "privacy",
    "Privacy Policy | Luna Period Tracker",
    "Luna's Privacy Policy: what we collect, why we collect it, and your rights. Luna never sells your data and never shows ads."
  )
);
write(
  "terms.html",
  legalPage(
    "terms",
    "Terms of Service | Luna Period Tracker",
    "Luna's Terms of Service: who can use the app, subscriptions, your content, and the rules we all agree to."
  )
);

const pages = [
  ["", "monthly"],
  ["features.html", "monthly"],
  ["parents.html", "monthly"],
  ["learn.html", "monthly"],
  ...articles.map((a) => [`learn/${a.slug}.html`, "yearly"]),
  ["questions.html", "monthly"],
  ["privacy.html", "yearly"],
  ["terms.html", "yearly"],
];
const today = new Date().toISOString().slice(0, 10);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([p, freq]) => `  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`
);
