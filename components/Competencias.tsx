import { skills } from "@/lib/data/skills";

export function Competencias() {
  return (
    <section
      id="competencias"
      className="block"
      aria-labelledby="competencias-h"
    >
      <h2 id="competencias-h" className="kicker">
        Competências
      </h2>
      <dl className="skills">
        {skills.map((group) => (
          <div key={group.title}>
            <dt>{group.title}</dt>
            <dd>{group.tags.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
