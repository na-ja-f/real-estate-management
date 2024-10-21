import React from 'react';

interface NotificationItemProps {
  message: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message, time }) => {
  return (
    <div className="flex justify-between text-sm py-2 border-b">
      <span>{message}</span>
      <span className="text-gray-500">{time}</span>
    </div>
  );
};

export default NotificationItem;
