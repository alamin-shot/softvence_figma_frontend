'use client';

import { useState, useEffect } from 'react';

interface UsePaginationProps<T> {
    items: T[];
    pageSize?: number; 
    fixed?: boolean; 
}

interface UsePaginationReturn<T> {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    currentItems: T[];
    handlePageChange: (page: number) => void;
}

export function usePagination<T>({ 
    items, 
    pageSize = 8, 
    fixed = true 
}: UsePaginationProps<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to first page when items change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [items.length]);

    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = items.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        currentPage,
        pageSize, 
        totalPages,
        currentItems,
        handlePageChange
    };
}