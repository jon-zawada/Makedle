import React, { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
      {description && <h2 className="text-xl text-gray-400">{description}</h2>}
      <div className="flex-grow p-6 rounded-md">{children}</div>
    </div>
  );
};

export default PageLayout;
