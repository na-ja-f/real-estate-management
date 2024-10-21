import React from "react";

interface StatBoxProps {
  label: string;
  value: number;
  icon: JSX.Element;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4">
      <div className="">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatBox;
