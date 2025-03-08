"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import KidCap from "../../public/kid_cap.png";

export default function Home() {
  const [madrassa, setMadrassa] = useState("");
  const [className, setClassName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchResult = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      setTimeout(() => {
        if (madrassa && className && regNumber) {
          router.push("results/10");
        } else {
          setError("Result not found!");
        }
        setLoading(false);
      }, 1500);
    } catch (error) {
      // ✅ FIXED: Added 'error' inside catch
      setError("Something went wrong!");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br from-green-500 to-green-700 text-white">
      <h2 className="text-2xl font-bold uppercase text-center w-full">
        ANSARUL ISLAM MADRASA, PAPPINISSERI WEST
      </h2>
      <h2 className="text-4xl font-bold mb-6 text-center w-full">
        Exam Results
      </h2>

      {/* <div className="absolute inset-0 flex justify-center items-center pointer-events-none mix-blend-overlay opacity-20">
        <Image
          src={KidCap}
          alt="Arab Business"
          width={300}
          height={150}
          className="rounded-lg"
        />
      </div> */}

      {/* Input Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-900">
        {/* Name Input (Replaces Madrassa Dropdown) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-400"
            placeholder="Enter Student Name"
            value={madrassa}
            onChange={(e) => setMadrassa(e.target.value)}
          />
        </div>

        {/* Class Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Class</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-400"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6-A">6-A</option>
            <option value="6-B">6-B</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="+1">+1</option>
          </select>
        </div>

        {/* Registration Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Reg No</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-400"
            placeholder="Enter Registration Number"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={fetchResult}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
          disabled={loading || !madrassa || !className || !regNumber}
        >
          {loading ? "Loading..." : "Check Result"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Result Card */}
      {result && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-gray-900">
          <h2 className="text-lg font-semibold">Student: {result.name}</h2>
          <p>
            Status:{" "}
            <span
              className={`font-bold ${
                result.status === "Passed" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.status}
            </span>
          </p>
          <div className="mt-2">
            <h3 className="font-semibold">Marks:</h3>
            <ul className="list-disc ml-5">
              {Object.entries(result.marks).map(([subject, mark]) => (
                <li key={subject}>
                  {subject}: <span className="font-bold">{mark}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
