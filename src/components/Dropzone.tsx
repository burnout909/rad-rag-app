import { useRef } from "react";

interface DropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onSubmit: () => void;
  uploadStatus: string;
}

export default function Dropzone({
  selectedFile,
  onFileSelect,
  onSubmit,
  uploadStatus,
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileSelect(e.target.files[0]);
      
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onFileSelect(files[0]);
  };

  const handleClick = () => {
    if (!selectedFile) fileInputRef.current?.click();
  };

  const getMessageColor = () => {
    if (!uploadStatus) return "";
    if (uploadStatus.toLowerCase().includes("fail") || uploadStatus.toLowerCase().includes("only")) {
      return "#FF6767"; 
    }
    return "#3FA780"; 
  };

  return (
    <div
      id="dropZone"
      className="w-[90%] h-[440px] rounded-md flex flex-col justify-center items-center text-xl font-bold text-center cursor-pointer px-4 transition mx-auto"
      style={{ backgroundColor: "#D9D9D9", color: "#26262C" }}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        key={selectedFile?.name || "input-key"}
        ref={fileInputRef}
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, image/png, image/jpeg"
        hidden
        onChange={handleFileChange}
      />
      <p className="text-lg font-semibold">Upload your file here</p>
      <div className="mt-4 text-sm text-center max-w-[90%] break-words" style={{ color: getMessageColor() }}>
        {uploadStatus && <p>{uploadStatus}</p>}
        {selectedFile && (
          <button
            id="submitBtn"
            className="mt-4 px-4 py-2 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            style={{ backgroundColor: "#678AFF" }}
            onClick={onSubmit}
          >
            Go!
          </button>
        )}
      </div>
    </div>
  );
}