import { useState } from "react";
import resetIcon from "../assets/refreshIcon.svg";
import Dropzone from "../components/Dropzone";

export default function Folder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleUploadPrepare = (file: File) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("❌ CSV, PDF 또는 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFile(file);
    setUploadStatus(`✅ "${file.name}" Upload complete`);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setUploadStatus(`📤 "${selectedFile.name}" loading...`);

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
      setUploadStatus("❌ 서버 요청 실패");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus("");
    setResult(null);
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-10 font-pretendard text-neutral-1">
      <div className="flex items-center gap-3 mb-8 w-[900px] mx-auto">
        <img
          id="resetIcon"
          src={resetIcon}
          alt="반복 아이콘"
          className="w-6 h-6 cursor-pointer"
          onClick={handleReset}
        />
        <h1 className="text-xl font-bold text-left">
          Now You can do this for file dummies.
        </h1>
      </div>

      {result ? (
        <div className="w-full min-h-[477px] bg-neutral-7 rounded-xl p-6 border border-neutral-5 text-sm text-neutral-2 leading-relaxed">
          <h2 className="text-lg font-semibold mb-4">📋 추출 결과</h2>
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : (
        <Dropzone
          selectedFile={selectedFile}
          onFileSelect={handleUploadPrepare}
          onSubmit={handleSubmit}
          uploadStatus={uploadStatus}
        />
      )}
    </main>
  );
}
