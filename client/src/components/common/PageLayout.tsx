import React, { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
      <div className="flex-grow p-6 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
