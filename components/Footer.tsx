import { profile } from "@/lib/data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <span className="section-tag">CH∞ · Fim da transmissão</span>
          <h3>{profile.footerTitle}</h3>
          <p>{profile.footerTagline}</p>
        </div>
        <div className="footer-socials">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
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
