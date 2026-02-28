// components/common/TableEntries.tsx
import React from 'react';

interface TableEntriesProps {
    total: number;
    currentPage?: number;
    pageSize?: number;
    className?: string;
    showEntries?: boolean;
}

const TableEntries: React.FC<TableEntriesProps> = ({
    total,
    currentPage = 1,
    pageSize = 10,
    className = '',
    showEntries = true
}) => {
    if (!showEntries) return null;

    const showingFrom = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const showingTo = Math.min(currentPage * pageSize, total);

    return (
        <div className={`px-6 py-4 border-t bg-white text-sm text-gray-500 flex items-center justify-center ${className}`}>
            <span>
                Showing <span className="font-medium">{showingFrom}</span> to{' '}
                <span className="font-medium">{showingTo}</span> of{' '}
                <span className="font-medium">{total}</span> entries
            </span>
        </div>
    );
};

export default TableEntries;