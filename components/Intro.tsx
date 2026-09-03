import { Rich } from "@/components/ui/Rich";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/lib/data/profile";

/** Cabeçalho do dossiê: nome, função, síntese e contato. */
export function Intro() {
  return (
    <header className="intro">
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
      <hr className="sig" aria-hidden="true" />
      <Rich as="div" className="lead" html={profile.aboutBio} />
      <p className="contact">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span className="sep" aria-hidden="true">·</span>
        <ExternalLink href={profile.social.github}>GitHub</ExternalLink>
        <span className="sep" aria-hidden="true">·</span>
        <ExternalLink href={profile.social.linkedin}>LinkedIn</ExternalLink>
        <span className="sep" aria-hidden="true">·</span>
        {profile.location}
      </p>
    </header>
  );
}
