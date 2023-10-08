// frontend/src/components/Notification.tsx
import React from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<Props> = ({ message, onClose }) => {
  return (
    <>
      {message && (
        <div className="bg-red-500 text-white py-2 px-4 fixed top-0 right-0 m-4 rounded">
          {message}
          <button className="ml-2" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
