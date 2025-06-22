export interface SubjectMarks {
  [subject: string]: {
    components: Record<string, { obtained: number; total: number }>
  }
}

export interface SubjectResult {
  name: string
  marks: number
  grade: string
  gradePoints: number
  credits: number
}

export interface Results {
  subjects: SubjectResult[]
  totalGradePoints: number
  totalCredits: number
  sgpa: number
}

