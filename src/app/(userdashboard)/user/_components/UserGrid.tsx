'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '../_types';
import IconButton from './IconButton';
import { usePagination } from '@/hooks/usePagination';
import TableEntries from '@/components/common/TableEntris';
import Pagination from '@/components/common/Pagination';

interface UserGridProps {
    users: User[];
    onView: (user: User) => void;
    onLogout: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string | number) => void;
}

const UserGrid: React.FC<UserGridProps> = ({
    users,
    onView,
    onLogout,
    onEdit,
    onDelete
}) => {
    const {
        currentPage,
        pageSize,
        totalPages,
        currentItems,
        handlePageChange
    } = usePagination({
        items: users,
        pageSize: 8,
        fixed: true
    });

    const handleAction = (actionName: string, user: User) => {
        switch (actionName) {
            case 'view':
                onView(user);
                break;
            case 'logout':
                onLogout(user);
                break;
            case 'edit':
                onEdit(user);
                break;
            case 'delete':
                onDelete(user.id);
                break;
        }
    };

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No users found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentItems.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-20 h-20 mb-3">
                                <Image
                                    src={user.picture}
                                    alt={`${user.name}'s profile`}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 mb-3">
                                {user.role}
                            </span>
                            <div className="flex items-center justify-center gap-1 mt-2">
                                {user.status.map((action) => (
                                    <IconButton
                                        key={action.id}
                                        name={action.name}
                                        onClick={() => handleAction(action.name, user)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <TableEntries
                        total={users.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                    />
                </div>

                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserGrid;