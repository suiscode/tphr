import React from "react";

function Wrapper({ children, label }: any) {
  return (
    <div className="w-[400px] py-4 flex justify-center px-8">
      <div className="flex flex-col justify-center items-center gap-2 w-full text-primary">
        <h1 className="text-2xl font-bold mb-8">{label}</h1>
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
