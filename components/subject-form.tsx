"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface SubjectFormProps {
  subject: string
  components: string[]
  updateMarks: (subject: string, components: Record<string, { obtained: number; total: number }>) => void
  module: string
  subjectMarks: {
    components: Record<string, { obtained: number; total: number }>
  }
}
export function SubjectForm({ subject, components, updateMarks, module, subjectMarks }: SubjectFormProps) {


  let defaultTotalMarks: Record<string, Record<string, number>>
  if (module == "1") {
    defaultTotalMarks = {
      coaa: { MSE: 60, ESE: 60 },
      laade: { casestudy: 20, HA: 20, MSE: 60, ESE: 60 },
      psnp: { LAB: 100, CVV: 100, CP: 100, ESE: 60 },
      wd: { Presentation: 100, CP: 100, LAB: 100, ESE: 60 },
      iks: { MSE: 60, ESE: 60 },
      srm: { HA: 100, MSE: 60, ESE: 60 },
      gp: { MSE: 50, ESE: 100 },
      rad: { RAD: 300 },
      sa: { SA: 100 },
      asep: { MSE: 50, ESE: 100 }
    }

  } else {
    defaultTotalMarks = {
      aem: { LAB: 100, CVV: 100, CP: 100, ESE: 60 },
      cas: { casestudy: 100, HA: 100, MSE: 60, ESE: 60 },
      py: { LAB: 100, CVV: 100, CP: 100, ESE: 60 },
      da: { Presentation: 100, CP: 100, LAB: 100, ESE: 60 },
      uhv: { MSE: 60, ESE: 60 },
      srm: { HA: 100, MSE: 60, ESE: 60 },
      gp: { MSE: 50, ESE: 100 },
      rad: { RAD: 300 },
      sa: { SA: 100 },
      asep: { MSE: 50, ESE: 100 }
    }
  }





  const [marks, setMarks] = useState<Record<string, { obtained: number; total: number }>>(() => {
    const initialMarks: Record<string, { obtained: number; total: number }> = {}
    components.forEach((component) => {
      const totalMark = defaultTotalMarks[subject]?.[component] || 100
      initialMarks[component] = { obtained: subjectMarks.components[component]?.obtained || 0, total: totalMark }
    })
    return initialMarks
  })

  useEffect(() => {
    updateMarks(subject, marks)
  }, [marks])

  const handleChange = (component: string, field: "obtained" | "total", value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)

    setMarks((prev) => ({
      ...prev,
      [component]: {
        ...prev[component],
        [field]: numValue,
      },
    }))
  }
  //
  // const handleSave = () => {
  //   setSavedMarks(marks)
  // }
  //
  // const handleBack = () => {
  //   setMarks(savedMarks)
  // }
  //
  // const handleChangeMarks = () => {
  //   setSavedMarks(marks)
  //   router.push("/main-page") // Replace with the actual path to your main page
  // }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium capitalize">{subject} Components</h3>

      {components.map((component) => (
        <div key={component} className="grid grid-cols-2 gap-4 p-4 border rounded-md">
          <div>
            <label
              htmlFor={`${subject}-${component}-obtained`}
              className="block text-sm font-medium bg-background text-foreground mb-1"
            >
              {subject.toUpperCase()} {component} (Obtained Marks)
            </label>
            <Input
              id={`${subject}-${component}-obtained`}
              type="number"
              min="0"
              max={marks[component]?.total || 100}
              value={marks[component]?.obtained || ""}
              onChange={(e) => handleChange(component, "obtained", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${subject}-${component}-total`} className="block text-sm font-medium bg-background text-foreground mb-1">
              {subject.toUpperCase()} {component} (Total Marks)
            </label>
            <div className="flex items-center">
              <span className="m-2  text-md text-foreground bg-background">{marks[component]?.total || ""}</span>
            </div>
          </div>
        </div>
      ))}


    </div>
  )
}
