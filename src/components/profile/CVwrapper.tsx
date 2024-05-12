import React from "react";

const CVWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="px-2 flex flex-col w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-semibold text-[#AB0E66]">{label}</h1>
      </div>

      <div className="rounded-3xl space-y-4 flex flex-col p-4 mx-2 relative bg-white text-black w-full">
        {children}
      </div>
    </div>
  );
};

export default CVWrapper;
