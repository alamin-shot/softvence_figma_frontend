import React from 'react';
import Image from 'next/image';
interface AddButtonProps {
    onClick: () => void;
    className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1  ${className}`}
        >
            <Image src='/addIcon.png' alt='edit icon' height={28} width={28} />
        </button>
    );
};

export default AddButton;