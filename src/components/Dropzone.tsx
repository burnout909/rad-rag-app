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

  return (
    <div
      id="dropZone"
      className="w-full h-[477px] bg-neutral-6 rounded-md flex flex-col justify-center items-center text-xl font-bold text-neutral-1 text-center cursor-pointer px-4 transition"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,application/pdf,image/png,image/jpeg"
        hidden
        onChange={handleFileChange}
      />
      <p className="text-lg font-semibold">파일 업로드 창</p>
      <div className="mt-4 text-sm text-center max-w-[90%] break-words">
        {uploadStatus && <p>{uploadStatus}</p>}
        {selectedFile && (
          <button
            id="submitBtn"
            className="mt-4 px-4 py-2 bg-main-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={onSubmit}
          >
            Go!
          </button>
        )}
      </div>
    </div>
  );
}
