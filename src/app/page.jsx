"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import KidCap from "../../public/kid_cap.png";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchResult = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate loading
      setTimeout(() => {
        if (className) {
          // Redirect to the results page for the selected class
          router.push(`/results/${className}`);
        } else {
          setError("Please select a class to view results");
        }
        setLoading(false);
      }, 1500);
    } catch (error) {
      setError("Something went wrong! Please try again.");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-emerald-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          {/* Header */}
          <div className="w-full max-w-3xl text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={KidCap || "/placeholder.svg"}
                  alt="Madrassa Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
              ANSARUL ISLAM MADRASA
            </h2>
            <h3 className="text-lg md:text-xl text-white/90 mb-4">
              PAPPINISSERI WEST
            </h3>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                <h4 className="text-xl md:text-2xl font-semibold text-white">
                  Examination Results Portal
                </h4>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-md">
            {/* Form Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    <span>Class Results</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Select a class to view examination results
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Student Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none bg-white"
                    >
                      <option value="">Select Class</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="6.A">Class 6-A</option>
                      <option value="6.B">Class 6-B</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="+1">Class +1</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Registration Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter registration number"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={fetchResult}
                  disabled={loading || !className}
                  className={`w-full py-2.5 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-colors ${
                    loading || !className
                      ? "bg-emerald-400 cursor-not-allowed"
                      : "bg-emerald-700 hover:bg-emerald-800"
                  }`}
                >
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {loading ? "Processing..." : "View Results"}
                  </>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-white/80 text-sm">
            <p>
              © {new Date().getFullYear()} Ansarul Islam Madrasa. All rights
              reserved.
            </p>
            <p className="mt-1">
              For any queries, please contact the administration office.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
