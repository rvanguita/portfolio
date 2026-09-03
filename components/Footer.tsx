import { Eyebrow } from "@/components/ui/Eyebrow";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <Eyebrow>Contato</Eyebrow>
          <h3>{profile.footerTitle}</h3>
          <p>{profile.footerTagline}</p>
        </div>
        <div className="footer-socials">
          <ExternalLink href={profile.social.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.social.linkedin}>LinkedIn</ExternalLink>
          <a href={`mailto:${profile.email}`}>E-mail</a>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 Rene Verinaud Anguita Junior • Desenvolvido com Next.js &amp;
            GitHub Actions
          </p>
        </div>
      </div>
    </footer>
  );
}
