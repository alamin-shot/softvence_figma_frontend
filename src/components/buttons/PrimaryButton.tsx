import React from 'react';

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;