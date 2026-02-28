'use client';

import React from 'react';
import Image from 'next/image';

interface UserActionButtonsProps {
    viewMode: 'table' | 'grid';
    onTableView: () => void;
    onGridView: () => void;
    onFileUpload: () => void;
    onExport: () => void;
}

const UserActionButtons: React.FC<UserActionButtonsProps> = ({
    viewMode,
    onTableView,
    onGridView,
    onFileUpload,
    onExport
}) => {
    return (
        <>
            <button
                onClick={onTableView}
                className={`p-2 rounded-full transition-colors ${viewMode === 'table'
                    ? "bg-[#3EC9D6]/20 text-white"
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                title="Table View"
            >
                <Image src="/user.png" alt="Table view" width={14} height={14} />
            </button>
            <button
                onClick={onGridView}
                className={`p-2 rounded-full transition-colors ${viewMode === 'grid'
                    ? "bg-[#3EC9D6]/20 text-white"
                    : 'bg-[#3EC9D6]/20 text-gray-600 hover:bg-[#3EC9D6]/40'
                    }`}
                title="Grid view"
            >
                <Image src="/grid.png" alt="Grid view" width={14} height={14} />
            </button>
            <button
                onClick={onFileUpload}
                className="p-2 bg-[#3EC9D6]/20 text-gray-600 rounded-full hover:bg-[#3EC9D6]/40 transition-colors"
                title="Upload CSV"
            >
                <Image src="/file.png" alt="Upload" width={14} height={14} />
            </button>
            <button
                onClick={onExport}
                className="p-2 bg-[#3EC9D6]/20 text-gray-600 rounded-full hover:bg-[#3EC9D6]/40 transition-colors"
                title="Export"
            >
                <Image src="/plus.png" alt="Export" width={14} height={14} />
            </button>
        </>
    );
};

export default UserActionButtons;