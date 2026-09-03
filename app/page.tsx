import { Intro } from "@/components/Intro";
import { Projetos } from "@/components/Projetos";
import { Trajetoria } from "@/components/Trajetoria";
import { Competencias } from "@/components/Competencias";
import { Certificacoes } from "@/components/Certificacoes";

export default function HomePage() {
  return (
    <article className="wrap">
      <Intro />
      <Projetos />
      <Trajetoria />
      <Competencias />
      <Certificacoes />
    </article>
  );
}
