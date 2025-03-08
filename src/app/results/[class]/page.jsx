"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import studentsData from "../../../common/data/results";

export default function ClassResults() {
  const params = useParams();
  const router = useRouter();
  const classId = params.class;

  // Filter students by class
  const classStudents = studentsData.filter(
    (student) => student.class === classId
  );

  console.log(studentsData, classStudents, "CLASS STUDENTS");

  // Get all possible subject fields from the students in this class
  const allFields = new Set();
  classStudents.forEach((student) => {
    Object.keys(student).forEach((key) => {
      if (key !== "name" && key !== "class" && key !== "status") {
        allFields.add(key);
      }
    });
  });

  const subjectFields = Array.from(allFields);

  // Format class name for display
  const formatClassName = (classId) => {
    if (classId === "+1") return "Class +1";
    if (classId?.includes(".")) {
      const [num, section] = classId?.split(".");
      return `Class ${num}-${section}`;
    }
    return `Class ${classId}`;
  };

  // Format subject name for display
  const formatSubjectName = (subject) => {
    // Convert camelCase to words with spaces and capitalize first letter
    return subject
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  if (classStudents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-emerald-900/90">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-amber-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Results Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any results for {formatClassName(classId)}.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-emerald-700 text-white font-medium rounded-md hover:bg-emerald-800 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-emerald-900/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-4 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Search
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 font-arabic">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
            ANSARUL ISLAM MADRASA
          </h2>
          <h3 className="text-lg md:text-xl text-white/90 mb-4">
            PAPPINISSERI WEST
          </h3>

          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
            <h4 className="text-xl md:text-2xl font-semibold text-white">
              {formatClassName(classId)} Results
            </h4>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-4 bg-emerald-700 text-white">
            <h3 className="text-lg font-bold">Examination Results</h3>
            <p className="text-sm opacity-90">
              Academic Year: {new Date().getFullYear()}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-50 border-b border-emerald-200">
                  <th className="p-3 text-left text-emerald-800 font-semibold">
                    Student Name
                  </th>
                  {subjectFields.map((subject) => (
                    <th
                      key={subject}
                      className="p-3 text-center text-emerald-800 font-semibold"
                    >
                      {formatSubjectName(subject)}
                    </th>
                  ))}
                  <th className="p-3 text-center text-emerald-800 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student, index) => (
                  <tr
                    key={index}
                    className={`border-b border-emerald-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-emerald-50/50"
                    } ${
                      student.status === "Fail" ? "bg-red-50" : ""
                    } hover:bg-emerald-50 transition-colors`}
                  >
                    <td className="p-3 font-extrabold">{student.name}</td>
                    {subjectFields.map((subject) => (
                      <td key={subject} className="p-3 text-center">
                        {student[subject] !== undefined ? (
                          <span
                            className={`${
                              Number(student[subject]) < 50
                                ? "text-red-600"
                                : Number(student[subject]) >= 80
                                ? "text-black font-medium"
                                : "text-black-700"
                            }`}
                          >
                            {student[subject]}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                    <td
                      className={`p-3 text-center font-bold ${
                        student.status === "Pass"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {student?.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-emerald-50 border-t border-emerald-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-emerald-800 mb-2 md:mb-0">
                <span className="font-medium">Total Students:</span>{" "}
                {classStudents?.length}
              </div>
              <div className="text-sm text-emerald-800 text-center font-arabic">
                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4 mb-8">
          <h4 className="font-semibold text-emerald-800 mb-2">
            Grading Legend
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-600 mr-2"></span>
              <span>80-100: Excellent</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              <span>70-79: Very Good</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              <span>60-69: Good</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              <span>Below 50: Needs Improvement</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white/80 text-sm">
          <p>
            © {new Date().getFullYear()} Ansarul Islam Madrasa. All rights
            reserved.
          </p>
          <p className="mt-1">
            For any queries, please contact the administration office.
          </p>
        </footer>
      </div>
    </main>
  );
}
