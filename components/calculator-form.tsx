"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateSGPA } from "@/lib/calculator"
import { SubjectForm } from "@/components/subject-form"
import { ResultsDisplay } from "@/components/results-display"
import type { SubjectMarks, Results } from "@/lib/types"

export function CalculatorForm({ module }: { module: string }) {
  const [activeTab, setActiveTab] = useState("aem")

  const [results, setResults] = useState<Results | null>(null)
  const [subjectMarks, setSubjectMarks] = useState<SubjectMarks>({
    aem: { components: {} },
    cas: { components: {} },
    py: { components: {} },
    da: { components: {} },
    uhv: { components: {} },
    srm: { components: {} },
    gp: { components: {} },
    rad: { components: {} },
    sa: { components: {} },
    asep: { components: {} },
  })

  useEffect(() => {
    if (module === "1") {
      setActiveTab("coaa")
    } else {
      setActiveTab("aem")
    }
    const localSubjectMarks = localStorage.getItem("subjectMarks" + module)
    if (localSubjectMarks) {
      setSubjectMarks(JSON.parse(localSubjectMarks))
    } else {
      if (module === "1") {
        setSubjectMarks({
          coaa: { components: {} },
          laade: { components: {} },
          psnp: { components: {} },
          wd: { components: {} },
          iks: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        })
      } else {
        setSubjectMarks({
          aem: { components: {} },
          cas: { components: {} },
          py: { components: {} },
          da: { components: {} },
          uhv: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        })
      }
    }

  }, [])

  useEffect(() => {
    if (module === "1") {
      setActiveTab("coaa")
    } else {
      setActiveTab("aem")
    }
    const localSubjectMarks = localStorage.getItem("subjectMarks" + module)
    if (localSubjectMarks) {
      setSubjectMarks(JSON.parse(localSubjectMarks))
    } else {
      if (module === "1") {
        setSubjectMarks({
          coaa: { components: {} },
          laade: { components: {} },
          psnp: { components: {} },
          wd: { components: {} },
          iks: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        })
        setActiveTab("coaa")
      }
      else {
        setSubjectMarks({
          aem: { components: {} },
          cas: { components: {} },
          py: { components: {} },
          da: { components: {} },
          uhv: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        })
        setActiveTab("aem")
      }
    }
  }, [module])


  const handleCalculate = async () => {
    try {
      const results = await calculateSGPA(subjectMarks, module)
      setResults(results)
    } catch (error) {
      console.error("Error calculating SGPA:", error)
      alert("Please fill in all required fields")
    }
  }

  const handleReset = () => {
    localStorage.removeItem("subjectMarks" + module)
    setSubjectMarks(
      module === "1"
        ? {
          coaa: { components: {} },
          laade: { components: {} },
          psnp: { components: {} },
          wd: { components: {} },
          iks: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        }
        : {
          aem: { components: {} },
          cas: { components: {} },
          py: { components: {} },
          da: { components: {} },
          uhv: { components: {} },
          srm: { components: {} },
          gp: { components: {} },
          rad: { components: {} },
          sa: { components: {} },
          asep: { components: {} },
        }
    )

    setResults(null)
  }

  const updateSubjectMarks = (subject: string, components: Record<string, { obtained: number; total: number }>) => {
    setSubjectMarks((prev) => ({
      ...prev,
      [subject]: { components },

    }))
    localStorage.setItem("subjectMarks" + module, JSON.stringify(subjectMarks))
  }
  let SubjectData = []
  if (module === "1") {

    SubjectData = [
      { name: "coaa", components: ["MSE", "ESE"] },
      { name: "laade", components: ["casestudy", "HA", "MSE", "ESE"] },
      { name: "psnp", components: ["LAB", "CVV", "CP", "ESE"] },
      { name: "wd", components: ["Presentation", "CP", "LAB", "ESE"] },
      { name: "iks", components: ["MSE", "ESE"] },
      { name: "srm", components: ["HA", "MSE", "ESE"] },
      { name: "gp", components: ["MSE", "ESE"] },
      { name: "rad", components: ["RAD"] },
      { name: "sa", components: ["SA"] },
      { name: "asep", components: ["MSE", "ESE"] },
    ]

  } else {
    SubjectData = [
      { name: "aem", components: ["LAB", "CVV", "CP", "ESE"] },
      { name: "cas", components: ["casestudy", "HA", "MSE", "ESE"] },
      { name: "py", components: ["LAB", "CVV", "CP", "ESE"] },
      { name: "da", components: ["Presentation", "CP", "LAB", "ESE"] },
      { name: "uhv", components: ["MSE", "ESE"] },
      { name: "srm", components: ["HA", "MSE", "ESE"] },
      { name: "gp", components: ["MSE", "ESE"] },
      { name: "rad", components: ["RAD"] },
      { name: "sa", components: ["SA"] },
      { name: "asep", components: ["MSE", "ESE"] },
    ]
  }
  return (
    <div>
      {results ? (
        <div>
          <ResultsDisplay results={results} />
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      ) : (

        <div>
          <Tabs value={activeTab} onValueChange={(val) => val !== activeTab && setActiveTab(val)}>
            <div className="flex justify-center items-center">

              <TabsList className="grid md:grid-cols-10 grid-cols-5 mb-8">
                {
                  SubjectData.map((sub, i) => (

                    <TabsTrigger key={i} value={sub.name}>{sub.name.toUpperCase()}</TabsTrigger>
                  ))}
              </TabsList>
            </div>
            {
              SubjectData.map((sub, i) => (
                <TabsContent key={i} value={sub.name}>
                  <SubjectForm module={module} subject={sub.name} subjectMarks={subjectMarks[sub.name]} components={sub.components} updateMarks={updateSubjectMarks} />
                </TabsContent>
              ))}
          </Tabs>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleCalculate}>Calculate SGPA</Button>
          </div>
        </div>
      )}
    </div>
  )
}

