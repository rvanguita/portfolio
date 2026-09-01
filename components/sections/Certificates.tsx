"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { CertBadge } from "@/components/cards/CertBadge";
import { certificates } from "@/lib/data/certificates";
import type { CertCategory, CertificateGroup } from "@/lib/types";
import { ALL_CATEGORY, useCategoryFilter } from "@/hooks/useCategoryFilter";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";

const FILTERS: { value: CertCategory | typeof ALL_CATEGORY; label: string }[] = [
  { value: "all", label: "Todas as Categorias" },
  { value: "ds-python", label: "Data Science & Python" },
  { value: "math-ml", label: "Matemática & Machine Learning" },
  { value: "biz-stats", label: "Estatística & Negócios" },
];

function CertGroupInner({ group }: { group: CertificateGroup }) {
  return (
    <>
      <div className="cert-category-header">
        <Icon name={group.icon} className="cert-icon" />
        <h3>{group.title}</h3>
      </div>
      <div className="cert-items-grid">
        {group.items.map((cert) => (
          <CertBadge key={`${cert.title}-${cert.path}`} cert={cert} />
        ))}
      </div>
    </>
  );
}

function CertGroup({ group }: { group: CertificateGroup }) {
  return (
    <div className="cert-category-group" data-cert-category={group.key}>
      <CertGroupInner group={group} />
    </div>
  );
}

export function Certificates() {
  const getCategory = useCallback((group: CertificateGroup) => group.key, []);
  const { active, setActive, filtered } = useCategoryFilter(
    certificates,
    getCategory,
  );
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="certificados">
      <SectionHeader
        tag="Educação Continuada"
        title="Certificações & Especializações"
        icon="document"
        desc="Formação contínua em ciência de dados, matemática aplicada, estatística e análise de negócios."
      />

      <div
        className="category-filter-nav"
        role="group"
        aria-label="Filtrar certificados por categoria"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={cx(
              "cert-filter-btn",
              active === filter.value && "active",
            )}
            data-cert-category={filter.value}
            aria-pressed={active === filter.value}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="cert-categories-container">
        {reduceMotion ? (
          filtered.map((group) => (
            <CertGroup key={group.key} group={group} />
          ))
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((group) => (
              <motion.div
                key={group.key}
                className="cert-category-group"
                data-cert-category={group.key}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                <CertGroupInner group={group} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
