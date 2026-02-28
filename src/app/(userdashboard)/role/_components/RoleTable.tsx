'use client';

import React from 'react';
import { Role } from '../_types';
import { usePagination } from '@/hooks/usePagination';
import EditButton from '@/components/buttons/EditButton';
import PermissionBadge from './PermissionBadge';
import TableEntries from '@/components/common/TableEntris';
import Pagination from '@/components/common/Pagination';

interface RoleTableProps {
    roles: Role[];
    onEdit: (role: Role) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit }) => {
    const {
        currentPage,
        pageSize,
        totalPages,
        currentItems,
        handlePageChange
    } = usePagination({
        items: roles,
        pageSize: 8, 
        fixed: true
    });

    if (roles.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No roles found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-[#E8F5E9]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Permissions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((role) => (
                            <tr key={role.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium border">
                                    <span style={{ color: '#0CAF60' }}>{role.roleName}</span>
                                </td>
                                <td className="px-6 py-4 border">
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.map((permission, index) => (
                                            <PermissionBadge key={index} permission={permission} />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border">
                                    <EditButton onClick={() => onEdit(role)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards (visible only on mobile) */}
            <div className="block sm:hidden space-y-4 p-4">
                {currentItems.map((role) => (
                    <div key={role.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold" style={{ color: '#0CAF60' }}>
                                {role.roleName}
                            </h3>
                            <EditButton onClick={() => onEdit(role)} />
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-600">Permissions:</div>
                            <div className="flex flex-wrap gap-1">
                                {role.permissions.map((permission, index) => (
                                    <PermissionBadge key={index} permission={permission} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Section - No page size selector, just entries and pagination */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Entries Counter */}
                    <TableEntries
                        total={roles.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                    />
                </div>

                {/* Pagination Controls */}
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

export default RoleTable;