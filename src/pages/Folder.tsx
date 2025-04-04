import { useState, useRef, useEffect } from "react";
import resetIcon from "../assets/Group 212.png";

export default function Folder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const dropZone = document.getElementById("dropZone");
    if (!dropZone) return;

    const handleClick = (e: MouseEvent) => {
      if (selectedFile) {
        e.preventDefault();
        return;
      }
      fileInputRef.current?.click();
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.add(
        "border-2",
        "border-dashed",
        "border-blue-400",
        "bg-blue-100"
      );
    };

    const handleDragLeave = () => {
      dropZone.classList.remove(
        "border-2",
        "border-dashed",
        "border-blue-400",
        "bg-blue-100"
      );
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove(
        "border-2",
        "border-dashed",
        "border-blue-400",
        "bg-blue-100"
      );
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length > 0) handleUploadPrepare(files[0]);
    };

    dropZone.addEventListener("click", handleClick);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("click", handleClick);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [selectedFile]);

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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-10 font-pretendard text-neutral-1">
      {/* 상단 아이콘 + 텍스트 */}
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

      {/* 결과 출력 */}
      {result ? (
        <div className="w-full min-h-[477px] bg-neutral-7 rounded-xl p-6 border border-neutral-5 text-sm text-neutral-2 leading-relaxed">
          <h2 className="text-lg font-semibold mb-4">📋 추출 결과</h2>
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : (
        // 파일 업로드 박스
        <div
          id="dropZone"
          className="w-full h-[477px] bg-neutral-6 rounded-md flex flex-col justify-center items-center text-xl font-bold text-neutral-1 text-center cursor-pointer px-4 transition"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,application/pdf,image/png,image/jpeg"
            hidden
            onChange={(e) => {
              if (e.target.files?.length) {
                handleUploadPrepare(e.target.files[0]);
              }
            }}
          />
          <p className="text-lg font-semibold">파일 업로드 창</p>
          <div id="fileList" className="mt-4 text-sm text-center max-w-[90%] break-words">
            {uploadStatus && <p>{uploadStatus}</p>}
            {selectedFile && !result && (
              <button
                id="submitBtn"
                className="mt-4 px-4 py-2 bg-main-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                onClick={handleSubmit}
              >
                Go!
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
