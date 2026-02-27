import React from 'react';
import Image from 'next/image';

interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'icon';
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
    className = ''
}) => {


    return (
        <button
            onClick={onClick}
            className={`px-3 py-1  ${className}`}
        >
            <Image src='/deleteIcon.png' alt='deleteIcon' height={28} width={28} />
        </button>
    );
};

export default DeleteButton;


// text - sm bg - red - 500 text - white rounded hover: bg - red - 600 transition - colors