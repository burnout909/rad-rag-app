export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-10 text-neutral-800">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-black">🛠️ RADRAG</h1>
        <p className="text-lg">
          This project was developed as part of the AGI Agent Application
          Hackathon.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">📌 Overview</h2>
        <p>
          RADRAG aims to solve a critical bottleneck in data standardization for
          healthcare systems. Standardized data is essential not only for
          accurate insurance claims but also for securing competitive,
          high-quality datasets in the AI era.
        </p>
        <p>
          At institutions like Severance Hospital, a dedicated Data Services
          Team is working on structured data, but unstructured clinical texts
          such as free-text descriptions remain largely untouched. This project
          addresses that gap by enabling the standardization of radiology
          free-text reports.
        </p>
        <p>
          RADRAG is a <strong>Retrieval-Augmented Generation (RAG)</strong>{" "}
          based tool that standardizes free-text radiology reports into{" "}
          <strong>SNOMED CT</strong> concepts. It is designed for use in{" "}
          <strong>clinical settings</strong>, integrating external terminology
          knowledge and extraction models to enable precise concept mapping.
        </p>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">
          🚀 Key Features
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>✅ Real-time EMR Integration:</strong> Enables real-time
            standardization of clinical notes directly connected to EMR systems,
            helping to break down data silos.
          </li>
          <li>
            <strong>✅ Batch File Standardization:</strong> Supports one-click
            standardization of existing unstructured report archives.
          </li>
        </ul>
      </section>

      {/* Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">
          🖼️ Demo / Screenshots
        </h2>
        <img
          src="https://github.com/user-attachments/assets/e155609e-34f8-4828-8143-8c9422f2ee0d"
          alt="RADRAG Screenshot"
          className="rounded-lg border shadow-md"
        />
        {/* Optional video link */}
        {/* <a href="https://youtube.com/demo-video" className="text-blue-600 hover:underline" target="_blank">Watch Demo Video</a> */}
      </section>
    </div>
  );
}
