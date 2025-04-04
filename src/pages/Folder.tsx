import { useState } from "react";
import resetIcon from "../assets/refreshIcon.svg";
import Dropzone from "../components/Dropzone";

export default function Folder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [uploadKey, setUploadKey] = useState<number>(0); 

  const handleUploadPrepare = (file: File) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("Only CSV, XLSX, PDF, or image files are allowed.");
      return;
    }

    setSelectedFile(file);
    setUploadStatus(`"${file.name}" uploaded successfully.`);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setUploadStatus(`Uploading "${selectedFile.name}"...`);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/extract", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setResult(result);
    } catch (err) {
      setUploadStatus("Failed to request server.");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus("");
    setResult(null);
    setUploadKey(prev => prev + 1); 
  };

  return (
    <main
      className="max-w-[1000px] mx-auto px-4 py-10 font-pretendard"
      style={{ color: "#26262C" }}
    >
      {/* 헤더 영역 */}
      <div className="flex items-center gap-3 mb-8 w-[900px] mx-auto">
        <img
          id="resetIcon"
          src={resetIcon}
          alt="Reset"
          className="w-6 h-6 cursor-pointer"
          onClick={handleReset}
        />
        <h1 className="text-xl font-bold text-left">
          Now You can do this for file dummies.
        </h1>
      </div>

      {/* 결과 출력 또는 업로드 영역 */}
      {result ? (
        <div
          className="w-full min-h-[477px] rounded-xl p-6 border text-sm leading-relaxed"
          style={{
            backgroundColor: "#EFEFF1", 
            borderColor: "#CECDD5",     
            color: "#6B6A7B",          
          }}
        >
          <h2 className="text-lg font-semibold mb-4">Extracted Result</h2>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : (
        <Dropzone
          key={uploadKey}
          selectedFile={selectedFile}
          onFileSelect={handleUploadPrepare}
          onSubmit={handleSubmit}
          uploadStatus={uploadStatus}
        />
      )}
    </main>
  );
}
