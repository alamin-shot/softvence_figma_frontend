import React from 'react';

interface SecondaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    onClick,
    children,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-[#d1f0e0] text-sm sm:text-base rounded-lg text-[#0CAF60] hover:bg-[#c1e0d0] transition-colors font-medium ${className}`}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;