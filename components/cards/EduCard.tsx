import type { TimelineEntry } from "@/lib/types";

/** Porte de _includes/edu-card.html — usado em Experiência e Formação. */
export function EduCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="edu-card">
      <div className="edu-card-top">
        <span className="edu-degree">{entry.degree}</span>
        <span className="edu-year">{entry.year}</span>
      </div>
      <span className="edu-institution">{entry.institution}</span>
      {entry.description ? (
        <p className="edu-description">{entry.description}</p>
      ) : null}
    </div>
  );
}
