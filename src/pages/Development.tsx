export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-10 text-neutral-800">
      <h1 className="text-4xl font-bold text-black">📦 Development</h1>

      {/* Preparing the Dataset */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📁 Preparing the Dataset</h2>

        <h3 className="text-xl font-semibold">1. Download SNOMED CT</h3>
        <p>
          Download the{" "}
          <a
            href="https://www.nlm.nih.gov/healthit/snomedct/index.html"
            className="text-blue-600 underline"
            target="_blank"
          >
            SNOMED CT International version
          </a>{" "}
          from the UMLS website. Registration and license approval are required.
          Once downloaded, store the vocabulary files in the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">data/</code>{" "}
          directory. ⚠️ The SNOMED CT files are <strong>not included</strong> in
          this repository due to licensing restrictions.
        </p>

        <h3 className="text-xl font-semibold">
          2. Flatten SNOMED CT Hierarchy
        </h3>
        <p>
          SNOMED CT is hierarchical by design. To enable effective embedding and
          search, a flat version is needed:
        </p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>python process_data.py make-flattened-terminology</code>
        </pre>

        <h3 className="text-xl font-semibold">
          3. Generate SNOMED CT Dictionary
        </h3>
        <p>
          This step creates a dictionary file containing terms related to the
          flattened concept list:
        </p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
            python process_data.py generate-sct-dictionary --output-path
            assets/newdict_snomed.txt
          </code>
        </pre>
      </section>

      {/* FAISS Index */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🧠 Building the FAISS Index</h2>
        <p>
          We use <code>sentence-transformers/all-MiniLM-L12-v2</code> as our
          embedding model. Concepts are grouped by{" "}
          <code>concept_type_subset</code>, and separate FAISS indices are built
          for each group.
        </p>
        <p>
          Relevant code:{" "}
          <a
            href="https://github.com/burnout909/RADRAG/blob/main/rag/generate_snomedct_faiss.py"
            target="_blank"
            className="text-blue-600 underline"
          >
            generate_snomedct_faiss.py
          </a>
        </p>
      </section>

      {/* Free-text Extraction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          🔍 Free-text Extraction & Mapping
        </h2>
        <p>
          We use the <strong>Upstage Information Extraction API</strong>, which
          supports key-based entity extraction. Keys are aligned with the{" "}
          <code>concept_type_subset</code> definitions used for SNOMED CT.
        </p>
        <p>
          The extracted results are mapped to the nearest concepts in the
          corresponding FAISS index.
        </p>
        <p>
          Relevant code:{" "}
          <a
            href="https://github.com/burnout909/RADRAG/blob/main/rag/extraction.py"
            target="_blank"
            className="text-blue-600 underline"
          >
            extraction.py
          </a>
        </p>
      </section>
    </div>
  );
}
