// Vocabulário canônico das tecnologias dos projetos.
//
// `stack` é uma linha só no frontmatter, fatiada por " · ". Enquanto ela servia
// apenas para imprimir etiquetas, grafia não importava. A partir do momento em
// que uma tecnologia vira rota, importa: sem uma tabela canônica, duas grafias
// da mesma ferramenta nascem como duas páginas.
//
// Isso não é hipótese. "Python" e "Python 3.12" já eram dois termos, e
// "Google Gemini (OCR)" escondia que o Gemini aparece em dois projetos — o que
// bastava para ele não ganhar página.

/** Grafias que apontam para o mesmo nome canônico. */
const ALIAS: Record<string, string> = {
  "Python 3.12": "Python",
  "Google Gemini (OCR)": "Google Gemini",
  "Ollama (opcional)": "Ollama",
  "TensorFlow (LSTM)": "TensorFlow",
};

/**
 * Todo nome canônico que pode aparecer numa `stack`.
 *
 * Termo fora desta lista **falha o build**, de propósito: é a única forma de
 * impedir que `PySpark` e `pyspark` virem rotas separadas sem ninguém notar.
 * Acrescentar tecnologia a um projeto passa a exigir acrescentá-la aqui, e esse
 * atrito é o ponto.
 */
const CANONICAS = new Set([
  "AMPL",
  "Apache Airflow",
  "AWS S3",
  "Busca Tabu",
  "CatBoost",
  "CPLEX",
  "Delta Lake",
  "Docker",
  "DuckDB",
  "FastAPI",
  "FastF1",
  "GitHub Actions",
  "Google Gemini",
  "LightGBM",
  "Matplotlib",
  "Metaheurísticas",
  "MLflow",
  "MySQL",
  "NLTK/RSLP",
  "Ollama",
  "Optuna",
  "Pandas",
  "Plotly",
  "PySpark",
  "pytest",
  "Python",
  "ruff",
  "Scikit-Learn",
  "SHAP",
  "SMOTE/ADASYN",
  "SQL",
  "Streamlit",
  "TensorFlow",
  "TF-IDF",
  "uv",
  "XGBoost",
]);

/**
 * Uma tecnologia só ganha página com pelo menos dois projetos atrás. Com um, a
 * página repetiria a ficha e não acrescentaria caminho nenhum.
 */
export const MINIMO_PARA_PAGINA = 2;

/** O nome canônico de um termo bruto da `stack`. Termo desconhecido lança. */
export function canonica(bruto: string): string {
  const nome = ALIAS[bruto] ?? bruto;
  if (!CANONICAS.has(nome)) {
    throw new Error(
      `Tecnologia fora do vocabulário: "${bruto}". ` +
        `Acrescente em CANONICAS (src/lib/stack.ts) ou mapeie em ALIAS.`,
    );
  }
  return nome;
}

/** As tecnologias canônicas de um projeto, na ordem em que a stack as declara. */
export function tecnologiasDe(stack: string): string[] {
  return [...new Set(stack.split(" · ").map(canonica))];
}

/** O segmento de rota de uma tecnologia: "Google Gemini" → "google-gemini". */
export function slugDaTecnologia(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type ProjetoDaStack = { id: string; data: { stack: string; order: number } };

/**
 * As tecnologias que têm página, com os projetos de cada uma em ordem de
 * catálogo. Fonte única de `getStaticPaths` e dos elos que apontam para lá, para
 * que rota gerada e elo não possam divergir.
 */
export function paginasDeTecnologia<T extends ProjetoDaStack>(projetos: T[]) {
  const porTecnologia = new Map<string, T[]>();
  for (const projeto of [...projetos].sort(
    (a, b) => a.data.order - b.data.order,
  )) {
    for (const tecnologia of tecnologiasDe(projeto.data.stack)) {
      const lista = porTecnologia.get(tecnologia) ?? [];
      lista.push(projeto);
      porTecnologia.set(tecnologia, lista);
    }
  }

  return [...porTecnologia]
    .filter(([, lista]) => lista.length >= MINIMO_PARA_PAGINA)
    .map(([nome, lista]) => ({
      nome,
      slug: slugDaTecnologia(nome),
      projetos: lista,
    }))
    .sort(
      (a, b) =>
        b.projetos.length - a.projetos.length ||
        a.nome.localeCompare(b.nome, "pt"),
    );
}
