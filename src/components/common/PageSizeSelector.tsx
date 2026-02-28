'use client';

import React from 'react';

interface PageSizeSelectorProps {
    pageSize: number;
    onPageSizeChange: (size: number) => void;
    options?: number[];
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
    pageSize,
    onPageSizeChange,
    options = [8, 10, 15, 20, 25]
}) => {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Show</span>
            <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0CAF60] focus:border-[#0CAF60]"
            >
                {options.map(size => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>
            <span>entries</span>
        </div>
    );
};

export default PageSizeSelector;