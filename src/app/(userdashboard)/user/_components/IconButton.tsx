'use client';

import React from 'react';
import Image from 'next/image';

interface IconButtonProps {
    name: string;
    onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ name, onClick }) => {
    const getIconConfig = (iconName: string) => {
        const config: Record<string, { path: string; bgColor: string }> = {
            view: {
                path: "/eye.png",
                bgColor: "bg-[#3EC9D6]/20"
            },
            logout: {
                path: "/logout.png",
                bgColor: "bg-[#FFA21D]/20"
            },
            edit: {
                path: "/pen-line.png",
                bgColor: "bg-[#3EC9D6]/20"
            },
            delete: {
                path: "/trash.png",
                bgColor: "bg-[#FF4D4D]/20"
            },
        };

        return config[iconName] || {
            path: "",
            bgColor: "bg-gray-100"
        };
    };

    const config = getIconConfig(name);

    return (
        <button
            onClick={onClick}
            className={`p-2 ${config.bgColor} hover:opacity-80 rounded-full transition-all`}
            title={name}
        >
            <Image
                src={config.path}
                alt={name}
                height={14}
                width={14}
                className="object-contain"
            />
        </button>
    );
};

export default IconButton;