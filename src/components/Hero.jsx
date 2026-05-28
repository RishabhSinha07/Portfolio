import { useState } from "react";
import { CONFIG } from "../config.js";
import { Reveal } from "./Reveal.jsx";
import { GitHubIcon, LinkedInIcon, MailIcon, GlobeIcon } from "./icons.jsx";

// ─── Hero ─────────────────────────────────────────────────────────────────
export function Hero({ user, loading }) {
  return (
    <Reveal index={0} as="header" style={hero.wrap}>
      <div style={hero.topRow}>
        {loading || !user?.avatar_url ? (
          <div style={hero.avatarSkel} />
        ) : (
          <img src={user.avatar_url + "&s=96"} alt="" style={hero.avatar} />
        )}
        <div style={hero.handle}>@{CONFIG.githubUsername}</div>
      </div>

      <h1 style={hero.name}>{user?.name || CONFIG.name}</h1>
      <div style={hero.title}>{CONFIG.title}</div>
      <p style={hero.bio}>{user?.bio || CONFIG.bio}</p>

      <div style={hero.socials}>
        <SocialIcon href={`https://github.com/${CONFIG.githubUsername}`} label="GitHub">
          <GitHubIcon />
        </SocialIcon>
        <SocialIcon href={CONFIG.linkedin} label="LinkedIn">
          <LinkedInIcon />
        </SocialIcon>
        <SocialIcon href={`mailto:${CONFIG.email}`} label="Email">
          <MailIcon />
        </SocialIcon>
        {user?.blog && (
          <SocialIcon
            href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
            label="Website"
          >
            <GlobeIcon />
          </SocialIcon>
        )}
      </div>
    </Reveal>
  );
}

function SocialIcon({ href, label, children }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...hero.socialIcon, color: hover ? "var(--text)" : "var(--text-2)" }}
    >
      {children}
    </a>
  );
}

const hero = {
  wrap: { paddingTop: 96, paddingBottom: 24 },
  topRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 36 },
  avatar: { width: 48, height: 48, borderRadius: "50%", display: "block" },
  avatarSkel: { width: 48, height: 48, borderRadius: "50%", background: "var(--surface)" },
  handle: { fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--text-2)" },
  name: {
    fontFamily: "var(--f-disp)",
    fontWeight: 700,
    fontSize: "clamp(56px, 9vw, 96px)",
    lineHeight: 1.0,
    letterSpacing: "-0.025em",
    color: "var(--text)",
  },
  title: {
    marginTop: 18,
    fontFamily: "var(--f-mono)",
    fontSize: 14,
    color: "var(--text)",
    fontWeight: 400,
  },
  bio: {
    marginTop: 28,
    fontFamily: "var(--f-mono)",
    fontSize: 14,
    lineHeight: 1.65,
    color: "var(--text-2)",
    // No maxWidth — span the same width as the name and title above for a
    // balanced hero block.
    textWrap: "pretty",
    fontWeight: 400,
  },
  socials: { marginTop: 40, display: "flex", alignItems: "center", gap: 18 },
  socialIcon: { display: "inline-flex", padding: 4, transition: "color 150ms ease" },
};
