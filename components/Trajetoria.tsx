import { trajetoria, railYear } from "@/lib/timeline-merge";

export function Trajetoria() {
  return (
    <section id="trajetoria" className="block" aria-labelledby="trajetoria-h">
      <h2 id="trajetoria-h" className="kicker">
        Trajetória
      </h2>
      <div className="rail">
        {trajetoria.map((e) => (
          <div key={`${e.degree}-${e.year}`} className="entry">
            <div className="entry-year">{railYear(e)}</div>
            <div>
              <div className="entry-title">{e.degree}</div>
              <div className="entry-org">{e.institution}</div>
              {e.description ? (
                <p className="entry-note">{e.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
