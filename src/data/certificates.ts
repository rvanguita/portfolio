// Certificações — 3 grupos (12 / 9 / 3 = 24). `file` é o caminho sob
// public/certificates/ com espaços legíveis; o componente codifica cada segmento.
// Texto e arquivos preservados do site anterior (#certificacoes).
export interface Certificate {
  name: string;
  issuer: string;
  file: string;
}
export interface CertGroup {
  title: string;
  short: string;
  items: Certificate[];
}

export const certGroups: CertGroup[] = [
  {
    title: "Ciência de Dados e Python Avançado",
    short: "Ciência de Dados e Python",
    items: [
      { name: "Introduction to Data Science in Python", issuer: "Coursera / UMich", file: "Applied Data Science with Python Specialization/Introduction to Data Science in Python/Coursera 6X7MSJM9ZW7S.pdf" },
      { name: "Applied Machine Learning in Python", issuer: "Coursera / UMich", file: "Applied Data Science with Python Specialization/Applied Machine Learning in Python/Coursera 9LT6NMT6QFUF.pdf" },
      { name: "Statistics with Python Specialization (Completo)", issuer: "Especialização", file: "Statistics with Python Specialization/Coursera 8THKRDG2LVQ1.pdf" },
      { name: "Understanding & Visualizing Data with Python", issuer: "Coursera / UMich", file: "Statistics with Python Specialization/Understanding and Visualizing Data with Python/Coursera HUY6PDI3FNM8.pdf" },
      { name: "Inferential Statistical Analysis with Python", issuer: "Coursera / UMich", file: "Statistics with Python Specialization/Inferential Statistical Analysis with Python/Coursera J5O0MHPLQWOA.pdf" },
      { name: "Fitting Statistical Models to Data with Python", issuer: "Coursera / UMich", file: "Statistics with Python Specialization/Fitting Statistical Models to Data with Python/Coursera 8THKRDG2LVQ1.pdf" },
      { name: "Python for Everybody Specialization (Completo)", issuer: "Especialização", file: "Python for Everybody/Coursera QJN7QJTLGFLT.pdf" },
      { name: "Programming for Everybody (Getting Started with Python)", issuer: "Coursera / UMich", file: "Python for Everybody/Programming for Everybody (Getting Started with Python)/Coursera L93RZWK9WZB8.pdf" },
      { name: "Python Data Structures", issuer: "Coursera / UMich", file: "Python for Everybody/Python Data Structures/Coursera CABEC4D9W5QF.pdf" },
      { name: "Using Databases with Python (SQL)", issuer: "Coursera / UMich", file: "Python for Everybody/Using Databases with Python/Coursera FN7JP8SM77S9.pdf" },
      { name: "Using Python to Access Web Data", issuer: "Coursera / UMich", file: "Python for Everybody/Using Python to Access Web Data/Coursera LV7GTE5D9VTJ.pdf" },
      { name: "Capstone: Retrieving, Processing, and Visualizing Data with Python", issuer: "Coursera / UMich", file: "Python for Everybody/Capstone: Retrieving, Processing, and Visualizing Data with Python/Coursera QJN7QJTLGFLT.pdf" },
    ],
  },
  {
    title: "Matemática, Álgebra Linear e Machine Learning",
    short: "Matemática & ML",
    items: [
      { name: "Mathematics for Machine Learning (Completo)", issuer: "Imperial College", file: "Mathematics for Machine Learning/Coursera AVCUZHDPGLI5.pdf" },
      { name: "Linear Algebra for Machine Learning", issuer: "Imperial College", file: "Mathematics for Machine Learning/Linear Algebra/Coursera SRTBX3X4EWBT.pdf" },
      { name: "Multivariate Calculus", issuer: "Imperial College", file: "Mathematics for Machine Learning/Multivariate Calculus/Coursera LGDZ8QKKTQHR.pdf" },
      { name: "PCA (Principal Component Analysis)", issuer: "Imperial College", file: "Mathematics for Machine Learning/PCA/Coursera IZ46EUD7BH7B.pdf" },
      { name: "Essential Math Specialization (Completo)", issuer: "CU Boulder", file: "Expressway to Data Science: Essential Math Specialization/Coursera 9LS7323MCHAF.pdf" },
      { name: "Algebra & Differential Calculus for Data Science", issuer: "CU Boulder", file: "Expressway to Data Science: Essential Math Specialization/Algebra and Differential Calculus for Data Science/Coursera CBXVZ8C9EZQ2.pdf" },
      { name: "Essential Linear Algebra for Data Science", issuer: "CU Boulder", file: "Expressway to Data Science: Essential Math Specialization/Essential Linear Algebra for Data Science/Coursera QPLE6TXDE9GM.pdf" },
      { name: "Integral Calculus & Numerical Analysis", issuer: "CU Boulder", file: "Expressway to Data Science: Essential Math Specialization/Integral Calculus and Numerical Analysis for Data Science/Coursera PYQBRSQCBQRU.pdf" },
      { name: "Stochastic Processes", issuer: "Certificação", file: "Stochastic processes/Certificate.pdf" },
    ],
  },
  {
    title: "Estatística Empresarial e Análise de Negócios",
    short: "Estatística & Negócios",
    items: [
      { name: "Introduction to Data Analysis Using Excel", issuer: "Rice University", file: "Business Statistics and Analysis Specialization/Introduction to Data Analysis Using Excel/Coursera 5BVSFVK7NALP.pdf" },
      { name: "Basic Data Descriptors & Distributions", issuer: "Rice University", file: "Business Statistics and Analysis Specialization/Basic Data Descriptors, Statistical Distributions, and Application to Business Decisions/Coursera ZZCVHIGNDVDE.pdf" },
      { name: "General Business Program", issuer: "BTC", file: "General Business Program/btc.pdf" },
    ],
  },
];

export const certTotal = certGroups.reduce((n, g) => n + g.items.length, 0);
