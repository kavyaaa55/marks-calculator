import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Results } from "@/lib/types"
import { toast } from "react-hot-toast" // Changed: import toast as named import
import { useEffect, useRef, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "@react-hook/window-size";
import Link from "next/link"

interface ResultsDisplayProps {
  results: Results
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const shownRef = useRef(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (!shownRef.current && results.sgpa >= 9) {
      shownRef.current = true;
      setShowConfetti(true);
      toast.success(
        () => (
          <Link href="/coffee">
            <div className="text-center px-2 py-1">
              <div className="text-lg sm:text-xl font-bold mb-1 flex justify-center items-center gap-2">
                🎉 <span>Congratulations!</span> 🎉
              </div>
              <div className="text-sm sm:text-base font-semibold">
                SGPA: <span className="text-white bg-black px-2 py-0.5 rounded">{results.sgpa}</span>
              </div>
              <div className="text-xs sm:text-sm mt-1 text-muted-foreground italic">
                Give us a party! 🥳
              </div>
            </div>
          </Link>
        ),
        {
          duration: 5000,
          style: {
            background: '#1f2937', // slate-800 like tone
            color: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        }
      );

      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [results.sgpa]);


  return (
    <div className="space-y-6">
      {showConfetti && <Confetti width={width} height={height} />}
      <Card>
        <CardHeader>
          <CardTitle>Your SGPA Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold">{results.sgpa.toFixed(2)}</div>
            <p className="text-muted-foreground mt-2">Semester GPA</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-center">Marks</th>
                  <th className="p-2 text-center">Grade</th>
                  <th className="p-2 text-center">Grade Points</th>
                  <th className="p-2 text-center">Credits</th>
                </tr>
              </thead>
              <tbody>
                {results.subjects.map((subject) => (
                  <tr key={subject.name} className="border-b">
                    <td className="p-2 font-medium">{subject.name}</td>
                    <td className="p-2 text-center">{subject.marks}</td>
                    <td className="p-2 text-center">{subject.grade}</td>
                    <td className="p-2 text-center">{subject.gradePoints}</td>
                    <td className="p-2 text-center">{subject.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-muted p-3 rounded-md">
              <span className="font-medium">Total Grade Points:</span> {results.totalGradePoints}
            </div>
            <div className="bg-muted p-3 rounded-md">
              <span className="font-medium">Total Credits:</span> {results.totalCredits}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
