'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '../_types';
import IconButton from './IconButton';
import { usePagination } from '@/hooks/usePagination';
import TableEntries from '@/components/common/TableEntris';
import Pagination from '@/components/common/Pagination';

interface UserTableProps {
    users: User[];
    onView: (user: User) => void;
    onLogout: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string | number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-[#E8F5E9]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Picture
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 border-b">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={user.picture}
                                            alt={`${user.name}'s profile`}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        {user.status.map((action) => (
                                            <IconButton
                                                key={action.id}
                                                name={action.name}
                                                onClick={() => handleAction(action.name, user)}
                                            />
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block sm:hidden space-y-4 p-4">
                {currentItems.map((user) => (
                    <div key={user.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="relative w-12 h-12">
                                <Image
                                    src={user.picture}
                                    alt={`${user.name}'s profile`}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Role:</span>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Actions:</span>
                                <div className="flex items-center gap-1">
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
                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
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

export default UserTable;