import { createContext, useState } from "react";

interface IGlobalContext {
  selectedCourseIndex: number;
  selectedSection: string;
  selectedTerm: string;
  scheduleCourse: string;
  courseFullTitle?: string;
}

export const GlobalContext = createContext<any>({}); // you can set a default value inside createContext if you want

export default function ContextProvider({ children }: any) {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<string | null>(
    null
  );

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const [scheduleCourse, setScheduleCourse] = useState<string | null>(null);

  const [courseFullTitle, setCourseFullTitle] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={[
        selectedCourseIndex,
        setSelectedCourseIndex,
        selectedSection,
        setSelectedSection,
        selectedTerm,
        setSelectedTerm,
        scheduleCourse,
        setScheduleCourse,
        courseFullTitle,
        setCourseFullTitle,
      ]}
    >
      {children}
    </GlobalContext.Provider>
  );
}
