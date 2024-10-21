import React from "react";

interface TaskItemProps {
  label: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ label }) => {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox" />
      <span>{label}</span>
    </div>
  );
};

export default TaskItem;
