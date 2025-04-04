import { useNavigate } from "react-router-dom";
import computerImage from "../assets/computer.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-16 flex-col-reverse lg:flex-row">
      <div className="max-w-lg">
        <div className="text-[3rem] text-neutral-1 mb-1 font-bold">RADRAG</div>
        <div className="text-[2rem] text-neutral-2 mb-3 font-bold">
          Standardization Tool of Radiology Free-text
        </div>
        <div className="text-body1 text-[#6B6A7B] mb-8">
          Make smart clinical decisions and seamless claims with RADRAG – your
          LLM-based standardization tool for radiology free-text.
        </div>
        <button
          onClick={() => navigate("/playground")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md text-body1 hover:bg-blue-400 font-semibold"
        >
          GET STARTED
        </button>
      </div>
      <img
        src={computerImage}
        alt="illustration"
        className="max-w-xl mb-8 lg:mb-0"
      />
    </div>
  );
}
