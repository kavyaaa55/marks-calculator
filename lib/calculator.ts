import { calculateSGPAm1 } from "./calculatorm1";
import { calculateSGPAm2 } from "./calculatorm2";


import type { SubjectMarks } from "./types"

export const calculateSGPA = (
  SubjectMarks: SubjectMarks,
  module: string,
) => {
  if (module === "1") {
    return calculateSGPAm1(SubjectMarks);
  } else {
    return calculateSGPAm2(SubjectMarks);
  }
};
