import React from "react";

const students = [
  {
    name: "Ahmed Muhammed",
    fiqh: 85,
    akhlaque: 90,
    lisanulQuran: 88,
    aqeeda: 92,
    tajweed: 87,
    status: "Pass",
  },
  {
    name: "Fatima Noor",
    // fiqh: 76,
    akhlaque: 80,
    lisanulQuran: 79,
    aqeeda: 85,
    tajweed: 82,
    status: "Pass",
  },
  {
    name: "Yusuf Ali",
    // fiqh: 45,
    akhlaque: 50,
    lisanulQuran: 55,
    aqeeda: 40,
    tajweed: 60,
    status: "Fail",
  },
];

// Extract dynamic field names
const fields = Object.keys(students[0]);

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-400 to-green-700 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold text-green-700 mb-4">
          Madrassa Exam Results
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-green-600">
            <thead>
              <tr className="bg-green-600 text-white">
                {fields.map((field, index) => (
                  <th
                    key={index}
                    className="p-3 border border-green-500 capitalize"
                  >
                    {field.replace(/([A-Z])/g, " $1")}{" "}
                    {/* Convert camelCase to words */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    student.status === "Fail" ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {fields.map((field, i) => (
                    <td
                      key={i}
                      className={`p-3 border border-green-500 ${
                        field === "status"
                          ? student[field] === "Fail"
                            ? "text-red-500 font-semibold"
                            : "text-green-600 font-semibold"
                          : ""
                      }`}
                    >
                      {student[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
