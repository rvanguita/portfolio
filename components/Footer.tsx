import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      {profile.footerTitle}
      <span className="sep" aria-hidden="true">·</span>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <span className="sep" aria-hidden="true">·</span>
      <ExternalLink href={profile.social.github}>GitHub</ExternalLink>
      <span className="sep" aria-hidden="true">·</span>
      <ExternalLink href={profile.social.linkedin}>LinkedIn</ExternalLink>
      <span className="sep" aria-hidden="true">·</span>© 2026
    </footer>
  );
}
