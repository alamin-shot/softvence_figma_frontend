import React from 'react';
import Image from 'next/image';
interface EditButtonProps {
    onClick: () => void;
    className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1  ${className}`}
        >
            <Image src='/editIcon.png' alt='edit icon' height={24} width={24} />
        </button>
    );
};

export default EditButton;