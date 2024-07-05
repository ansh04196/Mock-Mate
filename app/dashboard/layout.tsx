import React from "react";
import Header from "./_components/Header";
import { InterviewProvider } from "./InterviewProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <InterviewProvider>
        <div className="mx-5 md:mx-20 lg:mx-36 mt-8">{children}</div>
      </InterviewProvider>
    </div>
  );
};

export default DashboardLayout;