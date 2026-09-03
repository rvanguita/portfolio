import type { CertificateGroup } from "@/lib/types";

/**
 * Migrado de _data/certificates.yml — conteúdo inalterado. Os `path` apontam
 * para PDFs em /public/certificates/**; hrefs montados via asset() (encodeURI).
 */
export const certificates: CertificateGroup[] = [
  {
    key: "ds-python",
    title: "Data Science & Python Avançado",
    items: [
      {
        title: "Introduction to Data Science in Python",
        tag: "Coursera / UMich",
        path: "/certificates/Applied Data Science with Python Specialization/Introduction to Data Science in Python/Coursera 6X7MSJM9ZW7S.pdf",
      },
      {
        title: "Applied Machine Learning in Python",
        tag: "Coursera / UMich",
        path: "/certificates/Applied Data Science with Python Specialization/Applied Machine Learning in Python/Coursera 9LT6NMT6QFUF.pdf",
      },
      {
        title: "Statistics with Python Specialization (Completo)",
        tag: "Especialização",
        path: "/certificates/Statistics with Python Specialization/Coursera 8THKRDG2LVQ1.pdf",
      },
      {
        title: "Understanding & Visualizing Data with Python",
        tag: "Coursera / UMich",
        path: "/certificates/Statistics with Python Specialization/Understanding and Visualizing Data with Python/Coursera HUY6PDI3FNM8.pdf",
      },
      {
        title: "Inferential Statistical Analysis with Python",
        tag: "Coursera / UMich",
        path: "/certificates/Statistics with Python Specialization/Inferential Statistical Analysis with Python/Coursera J5O0MHPLQWOA.pdf",
      },
      {
        title: "Fitting Statistical Models to Data with Python",
        tag: "Coursera / UMich",
        path: "/certificates/Statistics with Python Specialization/Fitting Statistical Models to Data with Python/Coursera 8THKRDG2LVQ1.pdf",
      },
      {
        title: "Python for Everybody Specialization (Completo)",
        tag: "Especialização",
        path: "/certificates/Python for Everybody/Coursera QJN7QJTLGFLT.pdf",
      },
      {
        title: "Programming for Everybody (Getting Started with Python)",
        tag: "Coursera / UMich",
        path: "/certificates/Python for Everybody/Programming for Everybody (Getting Started with Python)/Coursera L93RZWK9WZB8.pdf",
      },
      {
        title: "Python Data Structures",
        tag: "Coursera / UMich",
        path: "/certificates/Python for Everybody/Python Data Structures/Coursera CABEC4D9W5QF.pdf",
      },
      {
        title: "Using Databases with Python (SQL)",
        tag: "Coursera / UMich",
        path: "/certificates/Python for Everybody/Using Databases with Python/Coursera FN7JP8SM77S9.pdf",
      },
      {
        title: "Using Python to Access Web Data",
        tag: "Coursera / UMich",
        path: "/certificates/Python for Everybody/Using Python to Access Web Data/Coursera LV7GTE5D9VTJ.pdf",
      },
      {
        title:
          "Capstone: Retrieving, Processing, and Visualizing Data with Python",
        tag: "Coursera / UMich",
        path: "/certificates/Python for Everybody/Capstone: Retrieving, Processing, and Visualizing Data with Python/Coursera QJN7QJTLGFLT.pdf",
      },
    ],
  },
  {
    key: "math-ml",
    title: "Matemática, Álgebra Linear & Machine Learning",
    items: [
      {
        title: "Mathematics for Machine Learning (Completo)",
        tag: "Imperial College",
        path: "/certificates/Mathematics for Machine Learning/Coursera AVCUZHDPGLI5.pdf",
      },
      {
        title: "Linear Algebra for Machine Learning",
        tag: "Imperial College",
        path: "/certificates/Mathematics for Machine Learning/Linear Algebra/Coursera SRTBX3X4EWBT.pdf",
      },
      {
        title: "Multivariate Calculus",
        tag: "Imperial College",
        path: "/certificates/Mathematics for Machine Learning/Multivariate Calculus/Coursera LGDZ8QKKTQHR.pdf",
      },
      {
        title: "PCA (Principal Component Analysis)",
        tag: "Imperial College",
        path: "/certificates/Mathematics for Machine Learning/PCA/Coursera IZ46EUD7BH7B.pdf",
      },
      {
        title: "Essential Math Specialization (Completo)",
        tag: "CU Boulder",
        path: "/certificates/Expressway to Data Science: Essential Math Specialization/Coursera 9LS7323MCHAF.pdf",
      },
      {
        title: "Algebra & Differential Calculus for Data Science",
        tag: "CU Boulder",
        path: "/certificates/Expressway to Data Science: Essential Math Specialization/Algebra and Differential Calculus for Data Science/Coursera CBXVZ8C9EZQ2.pdf",
      },
      {
        title: "Essential Linear Algebra for Data Science",
        tag: "CU Boulder",
        path: "/certificates/Expressway to Data Science: Essential Math Specialization/Essential Linear Algebra for Data Science/Coursera QPLE6TXDE9GM.pdf",
      },
      {
        title: "Integral Calculus & Numerical Analysis",
        tag: "CU Boulder",
        path: "/certificates/Expressway to Data Science: Essential Math Specialization/Integral Calculus and Numerical Analysis for Data Science/Coursera PYQBRSQCBQRU.pdf",
      },
      {
        title: "Stochastic Processes",
        tag: "Certificação",
        path: "/certificates/Stochastic processes/Certificate.pdf",
      },
    ],
  },
  {
    key: "biz-stats",
    title: "Estatística Empresarial & Business Analytics",
    items: [
      {
        title: "Introduction to Data Analysis Using Excel",
        tag: "Rice University",
        path: "/certificates/Business Statistics and Analysis Specialization/Introduction to Data Analysis Using Excel/Coursera 5BVSFVK7NALP.pdf",
      },
      {
        title: "Basic Data Descriptors & Distributions",
        tag: "Rice University",
        path: "/certificates/Business Statistics and Analysis Specialization/Basic Data Descriptors, Statistical Distributions, and Application to Business Decisions/Coursera ZZCVHIGNDVDE.pdf",
      },
      {
        title: "General Business Program",
        tag: "BTC",
        path: "/certificates/General Business Program/btc.pdf",
      },
    ],
  },
];
