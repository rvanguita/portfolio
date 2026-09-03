import { Rich } from "@/components/ui/Rich";
import { profile } from "@/lib/data/profile";

/** Seção "Perfil profissional" (#sobre). */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-heading">
      <div className="about-card">
        <div className="about-intro">
          <span className="section-tag">Perfil profissional</span>
          <h2 id="sobre-heading">{profile.aboutHeading}</h2>
        </div>
        <Rich as="div" className="about-copy" html={profile.aboutBio} />
      </div>
    </section>
  );
}
