import React from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => (
    <button
        onClick={onClick}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
    >
        {icon}
    </button>
);

export default IconButton;