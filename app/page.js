'use client'
// Hack2Launch – Premium Neon Landing (React + Tailwind + Framer Motion + Lenis)
// Libraries used: framer-motion (animations), @studio-freight/lenis (buttery smooth scroll)
// Notes:
// - Drop your images where you see ASSET SLOT comments.
// - All sections preserved; upgraded visuals, motion, and micro-interactions.

import React, { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Link, animateScroll as scroll } from 'react-scroll';
import { twMerge } from "tailwind-merge";
import { BackgroundBeams } from "./components/ui/background-beams";
import { WavyBackground } from "./components/ui/wavy-background";



export default function Hack2LaunchLanding() {
  // Smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0b0d0f] text-white antialiased [--lime:#C5F32C]">
      {/* <DottedGlowBackground
      className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="#C5F32C"
        glowColorLightVar="#C5F32C"
        colorDarkVar="#C5F32C"
        glowColorDarkVar="#C5F32C"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1} 
      /> */}
      {/* <Boxes className={"z-20"}/> */}
      <GlobalFX />
      <ScrollProgress />
      <Header />
      <Hero />
      <Band />
      {/* ORDER: Partners/Projects before About */}
      <PartnersProjects />
      <AboutSupport />
      <Pillars />
      <JoinPaths />
      <Eligibility />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ----------------------------- Global Effects ------------------------------ */
function GlobalFX() {
  return (
    <>
      {/* Subtle grain + gradient sheen + custom scrollbar */}
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
        :root { --lime: #C5F32C; }
        
        html { scroll-behavior: auto; }
        /* Hide scrollbars globally but keep scroll */
        html, body { -ms-overflow-style: none; scrollbar-width: none; }
        ::-webkit-scrollbar { width: 0 !important; height: 0 !important; }
        .orbitron {
  font-family: 'Orbitron', sans-serif !important;
}
        /* Subtle noise overlay */
        .grain:before { content: ""; position: fixed; inset: -100px; pointer-events:none; background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"2\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.04\"/></svg>'); mix-blend-mode:soft-light; }
      `}</style>
      <div className="grain fixed inset-0 -z-10" />
    </>
  );
}

function ScrollProgress(){
  const { scrollYProgress } = useScroll();
  return (
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[var(--lime)]"/>
  );
}

/* ----------------------------- Small primitives ---------------------------- */
const Lime = ({ children }) => (<span className="text-[var(--lime)]">{children}</span>);
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);
const Dot = () => (<span className="inline-block h-2 w-2 rounded-full bg-[var(--lime)]" />);

function ShinyButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center gap-2 rounded-4xl px-6 py-3 text-sm font-semibold text-black overflow-hidden"
    >
      {/* Background gradient glow */}
      <span className="absolute inset-0 rounded-4xl bg-gradient-to-r from-[var(--lime)] to-emerald-300 opacity-90 blur-[1px]" />
      {/* Inner dark layer */}
      <span className="absolute inset-[2px] rounded-4xl bg-slate-800 m-[0.5px]"></span>
      <span className="absolute inset-[2px] rounded-3xl bg-(--lime) m-[3px]" />

      {/* Button text and arrow */}
      <span className="relative z-10 flex items-center gap-2 text-slate-800 transition-colors">
        {children}
        <span
          className="flex justify-center items-center transform transition-transform duration-300 group-hover:translate-x-[5px] bg-slate-800 rounded-full w-8 h-6 text-(--lime) text-xl"
          aria-hidden="true"
        >
          &#8640;
        </span>
      </span>
    </a>
  );
}



function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
  }

  function resetTilt() {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      className={`relative [perspective:1200px] ${className}`}
    >
      {/* The layer that tilts */}
      <div
        ref={ref}
        className="transition-transform duration-300 [transform-style:preserve-3d] [transform:rotateX(var(--rx))_rotateY(var(--ry))] py-4"
      >
        {/* Visual background layer */}
        <div className="absolute inset-0 rounded-2xl bg-[#0f1215] ring-1 ring-[#1b2025] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_20px_50px_rgba(0,0,0,0.45)]" />

        {/* Content layer — stays interactive */}
        <div className="relative rounded-2xl px-6 z-10 pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Header --------------------------------- */
function Header(){
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#171a1e] bg-[#0b0d0f]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-center gap-2">
          {/* <div className="grid h-9 w-9 place-items-center rounded-full bg-[#101417] ring-1 ring-[#222831] shadow-[0_10px_30px_rgba(197,243,44,0.15)]">
            <span className="text-sm font-bold text-[var(--lime)]">H2L</span>
          </div>
          <div className="text-sm/5 text-zinc-300">
            <div className="font-semibold text-white">Hack2Launch</div>
            <div className="text-xs text-zinc-400">by DcodeBlock</div>
          </div> */}
          <img src="/dcodeblock.png" className="sm:w-[250px] w-[180px]" />
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {[
            ["About", "about"],
            ["Ecosystem", "partners"],
            ["Pillars", "pillars"],
            ["Join", "join"],
            ["Eligibility", "eligibility"],
            ["FAQ", "faq"],
          ].map(([l,h], i) => (
            <Link key={l} to={h} smooth={true} duration={(i+1)*500} className="hover:text-white transition-colors cursor-pointer">{l}</Link>
          ))}
        </nav>
        <ShinyButton href="https://t.co/WMiU1WN8ow">Apply</ShinyButton>
      </div>
    </header>
  );
}

/* ----------------------------------- Hero ---------------------------------- */
function Hero(){
  const ref = useRef(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set your registration end date (UTC or local)
    const targetDate = new Date("2025-11-12T11:59:59Z"); // midnight UTC on Nov 12

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const y = useTransform(scrollYProgress, [0,1], [0, -120]);
  return (
    <div id="hero" ref={ref} className="relative overflow-hidden">
      <BackgroundBeams className="pointer-events-none"/>
      {/* layered glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-24 h-[36rem] w-[36rem] rounded-full bg-[var(--lime)]/12 blur-3xl"/>
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-emerald-400/10 blur-3xl"/>
      </div>

      <Section className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#14171a] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--lime)] ring-1 ring-[#2a2f34]"><Dot className="animate-pulse"/>{timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0
        ? <>Application ends in {timeLeft.days} D {timeLeft.hours} H {timeLeft.minutes} M</>
        : <>Registration closed</>}</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl orbitron leading-16">
              From <Lime>Pre‑MVP</Lime> to <span className="text-white">Successful Launches</span>
            </h1>
            <p className="mt-4 max-w-xl text-zinc-300">
              Hack2Launch is the sprint where real projects are forged—from prototype to public launch—with hands‑on token design, launch ops, and growth.
            </p>
            {/* <p className="text-(--lime) font-black mt-5"><span className="animate-pulse">📅</span>{" "}Deadline for Hack2Launch 1: November 11th, 2025</p> */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ShinyButton href="https://t.co/WMiU1WN8ow" target="_blank" rel="noopener noreferrer">Apply for Hack2Launch</ShinyButton>
              <a href="https://dcodeblock.com" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#2a2f34] px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">See Past Launches</a>
            </div>
          </motion.div>

          {/* ASSET SLOT: Hero media */}
          <motion.div style={{y}} className="relative">
            {/* <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-[#1b2025] bg-[#0f1215] grid place-items-center shadow-[0_20px_60px_rgba(197,243,44,0.08)]">
              <span className="text-zinc-400 text-sm">ASSET SLOT — Hero Image/Video (team + product collage)</span>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-28 w-28 rounded-2xl bg-[var(--lime)]/20 blur-2xl md:block"/> */}
            <img src={"https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438800/hero_dxxnal.png"} className=" scale-[1.4]" />
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

/* ----------------------------------- Band ---------------------------------- */
function Band(){
  const items = ["GROWTH","BUILD THE FUTURE","STARTUP SUPPORT","CREATE","LAUNCH" ];
  return (
    <div className="orbitron">
      {/* <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 text-xs font-semibold tracking-widest text-[var(--lime)]">
        {items.map((t, i) => (
          <motion.div key={i} initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="flex items-center gap-3">
            <span>{t}</span>
            <span className="text-zinc-600">✳︎</span>
          </motion.div>
        ))}
      </div> */}
        <div className="flex flex-none gap-4 py-3 pr-4 animate-marquee [animation-duration:18s] -rotate-[1.2deg] relative">
      <motion.div className="bg-(--lime) flex py-4">
            {[...new Array(30)].fill(0).map((_, idx) => (
      <Fragment key={idx} >
        <ul className="flex gap-5 text-slate-700 text-xs font-semibold tracking-widest mr-5">
          {items.map((item, index) => (
          <motion.div key={index} initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*0.05}} className="flex items-center gap-5">
            <span>{item}</span>
            <span className="text-zinc-600 animate-spin">✳︎</span>
          </motion.div>
          ))}
        </ul>
      </Fragment>
    ))}
      </motion.div>
  </div>
    </div>
  );
}

/* ----------------------------- Partners/Projects ---------------------------- */
function PartnersProjects(){
  const partners = [
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438794/vercel_rv09a6.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438795/cyrene_bpf11z.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438794/buidlguidl_md6lzy.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438794/sailfish_bosyd1.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438793/onairos_wrtbqn.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438796/yardhub_e9lko6.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438796/educhain_ptjpmw.png"];
  const projects = ["Aytes","Senku’s Elixir","Signiq","Cromafun","CrossFund"];
  const projectBanners = ["https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438802/aytes_euwfat.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438802/senku_oibjlw.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438804/signiq_yxls8h.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438800/croma_lndqog.png",
    "https://res.cloudinary.com/dnafhcsfp/image/upload/v1762438801/crossfund_az5jbk.png"];
  const projectLinks = ["https://aytes.xyz","https://senkuselixir.xyz","https://signiq.xyz","https://cromafun.app","https://crossfund.xyz"];
  return (
    <Section id="partners" className="py-16">
      <H2 kicker="ECOSYSTEM">Trusted by our partners</H2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {partners.map((p, i) => (
          <TiltCard key={i} className="py-0!">
            <div className="grid place-items-center">
              <img src={p} />
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="mt-14">
        <H2 kicker="FEATURED PROJECTS">Ecosystem Projects</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 z-30">
{projects.map((p, i) => (
  <TiltCard
    key={i}
    className="group relative overflow-hidden rounded-xl" // group for hover detection
  >
    {/* ASSET SLOT: project cover */}
    {/* <div className="aspect-16/10 w-full rounded-xl bg-[#111418] grid place-items-center">
      <span className="text-xs text-zinc-500">ASSET SLOT — {p} cover</span>
    </div> */}
    <img src={projectBanners[i]} />

    <div className="pt-4">
      <div className="mb-1 text-sm text-zinc-400">Project</div>
      <div className="text-lg font-semibold">{p}</div>
    </div>

    {/* Animated arrow in bottom-right */}
    <a href={projectLinks[i]} target="_blank" rel="noopener noreferrer" className="absolute bottom-5 right-5 text-slate-700 transition-transform duration-300 ease-out group-hover:translate-x-[5px] group-hover:-translate-y-[5px] bg-(--lime) rounded-full w-8 h-8 flex items-center justify-center text-2xl">
      ↗
    </a>
  </TiltCard>
))}

        </div>
        <div className="mt-6 text-right"><a href="https://cyreneai.com/" rel="noopener noreferrer" target="_blank" className="text-sm text-zinc-400 underline-offset-4 hover:underline">See all launches</a></div>
      </div>
    </Section>
  );
}

/* ---------------------------- About & Support ------------------------------ */
function AboutSupport(){
  return (
    <Section id="about" className="py-16">
      <H2 kicker="ABOUT HACK2LAUNCH & SUPPORT">We bridge the gap between <Lime>Hackathons</Lime> and <Lime>Launches</Lime>.</H2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TiltCard className="md:col-span-2">
          <p className="text-zinc-300">
            The Hack2Launch Sprint turns promising MVPs into live, revenue‑earning on‑chain products — guided, supported, and amplified by the right systems.
          </p>
          <ul className="mt-5 space-y-3">
            {["Design your token utility","Execute strategic launch operations","Build community & narrative","Run end‑to‑end marketing & branding"].map((x, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-200"><CheckIcon/><span>{x}</span></li>
            ))}
          </ul>
          <div className="mt-6"><ShinyButton href="https://t.co/WMiU1WN8ow">Start your application</ShinyButton></div>
        </TiltCard>
        <div className="flex flex-col justify-between">
                  <TiltCard>
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 mb-1">Over</div>
              <div className="text-5xl font-black text-[var(--lime)]">$1 M+</div>
              
              <div className="mt-1 text-sm text-zinc-400">in on-chain transactions across Season 0 launches.</div>
            </div>
          </div>
        </TiltCard>
                          <TiltCard>
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 mb-1">Over</div>
              <div className="text-5xl font-black text-[var(--lime)]">600 K+</div>
              
              <div className="mt-1 text-sm text-zinc-400">impressions and visibility across projects&apos; socials.</div>
            </div>
          </div>
        </TiltCard>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          {t:"Direct access", d:"Protocols, partners, early‑stage ecosystems", img: "/direct_access.svg"},
          {t:"Growth playbooks", d:"Pre-launch & post‑launch traction + retention", img: "/growth_playbook.svg"},
          {t:"Network visibility", d:"Showcases and community streams featuring projects", img: "/network_visibility.svg"},
          {t:"Sustained momentum", d:"Launch → iterate with credibility support", img: "/sustained_momentum.svg"},
        ].map((c,i)=> (
          <TiltCard key={i}>
            <img src={c.img} className="w-16 h-16 mb-[5px]" />
            <div className="mb-[2px] text-lg font-semibold">{c.t}</div><p className="text-sm text-zinc-300">{c.d}</p>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- Pillars --------------------------------- */
function Pillars(){
  const items = [
    { t:"Earn from Day One", d:"Builders earn 1% of trading volume from launch — no upfront cost.", img: "/day_one.svg" },
    { t:"Aligned Incentives", d:"50% team tokens with a 6‑month cliff and 1‑year vesting for sustainable growth.", img: "/aligned_incentives.svg" },
    { t:"Internet Capital Markets", d:"Launch early, build community, and raise seed capital on‑chain with ownership and transparency.", img: "int_capital.svg" },
  ];
  return (
    <Section id="pillars" className="py-16">
      <H2 kicker="THREE PILLARS — POWERED BY CYRENE AI">The Launch Engine</H2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((c, i)=> (
          <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.05*i}} className="rounded-2xl bg-[#0f1215] p-6 ring-1 ring-[#1b2025] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_20px_50px_rgba(0,0,0,0.45)]">
            <img src={c.img} className="w-18 h-18 mb-[5px]" />
            <div className="text-lg font-semibold">{c.t}</div>
            <p className="mt-2 text-sm text-zinc-300">{c.d}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-500">Cyrene AI handles the launch mechanics. DcodeBlock amplifies the visibility.</p>
    </Section>
  );
}

/* -------------------------------- Join Paths ------------------------------- */
function JoinPaths(){
  const cards = [
    { t: "Hackathon Track", d: "Top performers from DcodeBlock hackathons are invited directly into the Sprint.", a: "Get invited", href: "https://dcodeblock.com/compete/hackathon", img: "/hackathon.svg" },
    { t: "Direct Application Path", d: "Missed the hackathon but ready to launch? Apply → shortlist → interview → Sprint.", a: "Apply now", href: "https://t.co/WMiU1WN8ow", img: "/direct-appln.svg" },
  ];
  return (
    <Section id="join" className="py-16">
      <H2 kicker="TWO WAYS TO JOIN">Choose your entry</H2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((c,i)=> (
          <TiltCard key={i}>
            <img src={c.img} className="h-18 w-18 mb-2" />
            <div className="mb-1 text-lg font-semibold">{c.t}</div>
            <p className="text-sm text-zinc-300">{c.d}</p>
            <div className="mt-5"><ShinyButton href={c.href}>{c.a}</ShinyButton></div>
          </TiltCard>
        ))}
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Limited slots • Rolling selections</div>
    </Section>
  );
}

/* ------------------------------- Eligibility ------------------------------- */
function Eligibility(){
  const bullets = [
    "Working MVP or near‑MVP ready to refine and launch",
    "Clear on‑chain utility or user problem",
    "Commitment to ship cleanly (not short‑term hype)",
    "Good listeners who follow mentorship, structure, and execution discipline",
  ];
  const weights = [
    {k:"Team Grit", v:30}, {k:"Utility & Clarity", v:20}, {k:"Velocity & Execution", v:20}, {k:"Market Narrative", v:20}, {k:"Security Readiness", v:10},
  ];
  return (
    <Section id="eligibility" className="py-16">
      <H2 kicker="ELIGIBILITY & CRITERIA">Who can apply</H2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TiltCard>
          <ul className="space-y-3">
            {bullets.map((b,i)=> (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-200"><CheckIcon/><span>{b}</span></li>
            ))}
          </ul>
        </TiltCard>
        <TiltCard>
          <div className="mb-3 text-sm text-zinc-400">Evaluation signals</div>
          <div className="space-y-3">
            {weights.map((w,i)=> (
              <div key={i} className="text-sm">
                <div className="mb-1 flex items-center justify-between"><span>{w.k}</span><span className="text-zinc-400">{w.v}%</span></div>
                <div className="h-2 w-full overflow-hidden rounded bg-[#0c0f12]"><div className="h-full bg-[var(--lime)]" style={{width: `${w.v}%`}}/></div>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */
function FAQ() {
  const faqs = [
    { q: "Who can apply?", a: "Any builder or team with an MVP (or even pre‑MVP) ready to ship and grow into a full launch." },
    { q: "Do I need to join a hackathon first?", a: "No. Hackathons are one entry point, but direct applications are equally valid." },
    { q: "Do I need a token to start?", a: "Not necessarily. Mentors guide you on when and how to integrate a token model effectively." },
    { q: "How early can a project be?", a: "We mentor very early‑stage teams — from pre‑MVP to launch with real users. Builders can earn from day one of launch." },
    { q: "What’s the program fee?", a: "Mentorship and launch support require a 5% token allocation to DcodeBlock to align incentives for long‑term growth." },
    { q: "What kind of support do I receive?", a: "Hands‑on guidance across token design, launch strategy, marketing, branding, and community building — plus partner access and visibility." },
    { q: "Which chains are supported?", a: "Season 1 is Solana‑focused, with cross‑chain support coming soon." },
    { q: "Who retains ownership?", a: "You do. Code, tokens, and creative control remain fully yours." },
  ];

   const [selectedIndex, setSelectedIndex] = useState(null);

  return (
 <Section id="faq" className="py-16">
      <div className="mx-auto space-y-6">
        <H2 kicker="FAQs">Questions, Answered</H2>
        <div className="space-y-4">
          {faqs.map(({ q, a }, faqIndex) => (
            <div
              key={faqIndex}
              className="group rounded-xl bg-[#0f1215] ring-1 ring-[#1b2025] px-4 py-6"
              onClick={() => {
                setSelectedIndex(selectedIndex === faqIndex ? null : faqIndex);
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-zinc-100">{q}</span>
                <div
                  className={twMerge(
                    "inline-flex items-center justify-center w-8 h-8 bg-[#2a2f34] border border-[#2a2f34] text-xs text-zinc-400 rounded-full transition-transform duration-300",
                    selectedIndex === faqIndex && "rotate-45"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>

              <AnimatePresence>
                {selectedIndex === faqIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "20px", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-sm text-zinc-300">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */
function FinalCTA(){
  return (
    <div id="apply" className="relative border-y border-[#171a1e] bg-[#0e1114] py-16 overflow-clip">
      {/* Enhanced background: radial glows + grid */}
    <WavyBackground containerClassName={"h-70"}>
            <div className="pointer-events-none absolute inset-0 -z-10">

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#ffffff1a_1px,transparent_1px),linear-gradient(90deg,#ffffff1a1a_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <Section>
        <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="grid items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black orbitron">Ready to launch for real?</h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">Turn your build into a live, on‑chain product with real users, earnings, and visibility.</p>
          </div>
          <div className="md:justify-self-end">
            <ShinyButton href="https://t.co/WMiU1WN8ow">Apply for Hack2Launch</ShinyButton>
          </div>
        </motion.div>
      </Section>
    </WavyBackground>
    </div>
  );
}

/* --------------------------------- Footer ---------------------------------- */
function Footer(){
  return (
    <footer className="py-14">
      <Section>
        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <img src="/dcodeblock.png" className="mb-2 -left-4 relative" />
            <p className="text-xs text-zinc-400">The high‑velocity builder funnel by DcodeBlock.</p>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Navigate</div>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#partners" className="hover:text-white">Ecosystem</a></li>
              <li><a href="#pillars" className="hover:text-white">Pillars</a></li>
              <li><a href="#join" className="hover:text-white">Join</a></li>
              <li><a href="#eligibility" className="hover:text-white">Eligibility</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Legal</div>
            <p className="text-xs text-zinc-500">Terms for token allocations and launchpad splits may vary per project and partner. All terms disclosed before onboarding.</p>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Contact</div>
            <a href="mailto:rasesh@dcodeblock.com" className="text-xs text-zinc-400">rasesh@dcodeblock.com</a>
            <div className="mt-3 text-xs text-zinc-500">© {new Date().getFullYear()} DcodeBlock</div>
          </div>
        </div>
      </Section>
    </footer>
  );
}

/* ------------------------------ UI helpers --------------------------------- */
function H2({ kicker, children }){
  return (
    <div className="mb-8">
      {kicker && (
        <motion.div initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#14171a] px-3 py-1 text-xs font-medium tracking-wide text-[var(--lime)] ring-1 ring-[#2a2f34]">
          <Dot />{kicker}
        </motion.div>
      )}
      <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl orbitron">{children}</motion.h2>
    </div>
  );
}

function CheckIcon(){
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none"><path fill="currentColor" className="text-[var(--lime)]" d="M9.2 16.6 4.8 12.2l1.4-1.4 3 3 7.6-7.6 1.4 1.4z"/></svg>
  );
}
