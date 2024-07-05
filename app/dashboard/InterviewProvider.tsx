"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import {
  InterviewData,
  MockInterviewQuestion,
} from "./interview/[interviewId]/start/page";

interface InterviewContextProps {
  interviewData: InterviewData | null;
  mockInterviewQuestion: MockInterviewQuestion[];
  activeQuestionIndex: number;
  setInterviewData: Dispatch<SetStateAction<InterviewData | null>>;
  setMockInterviewQuestion: Dispatch<SetStateAction<MockInterviewQuestion[]>>;
  setActiveQuestionIndex: Dispatch<SetStateAction<number>>;
}

export const InterviewContext = createContext<InterviewContextProps | undefined>(undefined);

interface InterviewProviderProps {
  children: ReactNode;
}

export const InterviewProvider: React.FC<InterviewProviderProps> = ({ children }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<MockInterviewQuestion[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        mockInterviewQuestion,
        activeQuestionIndex,
        setInterviewData,
        setMockInterviewQuestion,
        setActiveQuestionIndex,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};