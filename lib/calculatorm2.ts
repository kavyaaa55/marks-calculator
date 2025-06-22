"use server"

import type { SubjectMarks, Results, SubjectResult } from "./types"

// Helper function to calculate percentage
function calculatePercentage(obtained: number, total: number): number {
  if (total === 0) return 0
  return (obtained / total) * 100
}

// Calculate AEM marks
function calculateAEM(components: Record<string, { obtained: number; total: number }>): number {
  const lab = calculatePercentage(components.LAB?.obtained || 0, 100)
  const cvv = calculatePercentage(components.CVV?.obtained || 0, 100)
  const cp = calculatePercentage(components.CP?.obtained || 0, 100)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (lab * 20 + cvv * 20 + cp * 20 + ese * 40) / 100
}

// Calculate CAS marks
function calculateCAS(components: Record<string, { obtained: number; total: number }>): number {
  const casestudy = calculatePercentage(components.casestudy?.obtained || 0, 100)
  const ha = calculatePercentage(components.HA?.obtained || 0, 100)
  const mse = calculatePercentage(components.MSE?.obtained || 0, 60)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (casestudy * 20 + ha * 20 + mse * 20 + ese * 40) / 100
}

// Calculate DA marks
function calculateDA(components: Record<string, { obtained: number; total: number }>): number {
  const pres = calculatePercentage(components.Presentation?.obtained || 0, 100)
  const cp = calculatePercentage(components.CP?.obtained || 0, 100)
  const lab = calculatePercentage(components.LAB?.obtained || 0, 100)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (pres * 20 + cp * 20 + lab * 30 + ese * 30) / 100
}

// Calculate PY marks
function calculatePY(components: Record<string, { obtained: number; total: number }>): number {
  const lab = calculatePercentage(components.LAB?.obtained || 0, 100)
  const cvv = calculatePercentage(components.CVV?.obtained || 0, 100)
  const cp = calculatePercentage(components.CP?.obtained || 0, 100)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (lab * 40 + cvv * 20 + cp * 20 + ese * 20) / 100
}

// Calculate RAD marks
function calculateRAD(components: Record<string, { obtained: number; total: number }>): number {
  const rad = calculatePercentage(components.RAD?.obtained || 0, 300)
  return rad
}

// Calculate SA marks
function calculateSA(components: Record<string, { obtained: number; total: number }>): number {
  const sa = calculatePercentage(components.SA?.obtained || 0, 100)
  return sa
}

// Calculate GP marks
function calculateGP(components: Record<string, { obtained: number; total: number }>): number {
  const mse = calculatePercentage(components.MSE?.obtained || 0, 50)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 100)

  return (mse * 30 + ese * 70) / 100
}

// Calculate SRM marks
function calculateSRM(components: Record<string, { obtained: number; total: number }>): number {
  const ha = calculatePercentage(components.HA?.obtained || 0, 100)
  const mse = calculatePercentage(components.MSE?.obtained || 0, 60)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (ha * 20 + mse * 30 + ese * 50) / 100
}

// Calculate ASEP marks
function calculateASEP(components: Record<string, { obtained: number; total: number }>): number {
  const mse = calculatePercentage(components.MSE?.obtained || 0, 50)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 100)

  return (mse * 30 + ese * 70) / 100
}

// Calculate UHV marks
function calculateUHV(components: Record<string, { obtained: number; total: number }>): number {
  const mse = calculatePercentage(components.MSE?.obtained || 0, 60)
  const ese = calculatePercentage(components.ESE?.obtained || 0, 60)

  return (mse * 50 + ese * 50) / 100
}

// Get grade and grade points based on marks
function getGradeInfo(marks: number): { grade: string; gradePoints: number } {
  if (marks > 90) return { grade: "A+", gradePoints: 10 }
  if (marks > 80) return { grade: "A", gradePoints: 9 }
  if (marks > 70) return { grade: "B+", gradePoints: 8 }
  if (marks > 60) return { grade: "B", gradePoints: 7 }
  if (marks > 50) return { grade: "C+", gradePoints: 6 }
  if (marks > 40) return { grade: "C", gradePoints: 5 }
  return { grade: "F", gradePoints: 0 }
}

// Main function to calculate SGPA
export async function calculateSGPAm2(subjectMarks: SubjectMarks): Promise<Results> {
  const subjects: SubjectResult[] = []
  const subjectCredits: Record<string, number> = {
    aem: 4,
    cas: 4,
    py: 2,
    da: 2,
    uhv: 2,
    srm: 1,
    gp: 1,
    rad: 1,
    sa: 1,
    asep: 2,
  }

  let totalGradePoints = 0
  const totalCredits = 20

  // Calculate marks for each subject
  const aemMarks = Math.round(calculateAEM(subjectMarks.aem.components))
  const casMarks = Math.round(calculateCAS(subjectMarks.cas.components))
  const pyMarks = Math.round(calculatePY(subjectMarks.py.components))
  const daMarks = Math.round(calculateDA(subjectMarks.da.components))
  const uhvMarks = Math.round(calculateUHV(subjectMarks.uhv.components))
  const srmMarks = Math.round(calculateSRM(subjectMarks.srm.components))
  const gpMarks = Math.round(calculateGP(subjectMarks.gp.components))
  const radMarks = Math.round(calculateRAD(subjectMarks.rad.components))
  const saMarks = Math.round(calculateSA(subjectMarks.sa.components))
  const asepMarks = Math.round(calculateASEP(subjectMarks.asep.components))

  // Process each subject
  const processSubject = (name: string, marks: number, credits: number) => {
    const { grade, gradePoints } = getGradeInfo(marks)
    subjects.push({ name: name.toUpperCase(), marks, grade, gradePoints, credits })
    totalGradePoints += gradePoints * credits
  }

  // Add all subjects
  processSubject("aem", aemMarks, subjectCredits.aem)
  processSubject("cas", casMarks, subjectCredits.cas)
  processSubject("py", pyMarks, subjectCredits.py)
  processSubject("da", daMarks, subjectCredits.da)
  processSubject("uhv", uhvMarks, subjectCredits.uhv)
  processSubject("srm", srmMarks, subjectCredits.srm)
  processSubject("gp", gpMarks, subjectCredits.gp)
  processSubject("rad", radMarks, subjectCredits.rad)
  processSubject("sa", saMarks, subjectCredits.sa)
  processSubject("asep", asepMarks, subjectCredits.asep)

  // Calculate SGPA
  const sgpa = totalGradePoints / totalCredits

  return {
    subjects,
    totalGradePoints,
    totalCredits,
    sgpa,
  }
}

