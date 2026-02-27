'use client';

import React, { useState, useEffect } from 'react';
import { Permission, EditRoleModalProps } from '../_types';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import PageHeader from '@/components/layout/PageHeader';
import CloseButton from '@/components/buttons/CloseButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';

// CRM permissions
const CRM_PERMISSIONS: Permission[] = [
    // CRM module permissions
    { id: 1, name: 'Read', module: 'CRM' },
    { id: 2, name: 'Write', module: 'CRM' },
    { id: 3, name: 'Delete', module: 'CRM' },

    // Products module permissions
    { id: 4, name: 'sell', module: 'LEAD' },
    { id: 5, name: 'buy', module: 'LEAD' },
    { id: 6, name: 'stock', module: 'LEAD' },

    // Orders module permissions
    { id: 7, name: 'burger', module: 'ORDER' },
    { id: 8, name: 'pizza', module: 'ORDER' },
    { id: 9, name: 'pasta', module: 'ORDER' },
];

// ACCOUNTING permissions
const ACCOUNTING_PERMISSIONS: Permission[] = [
    // Accounting module permissions
    { id: 1, name: 'Read', module: 'ACCOUNTING' },
    { id: 2, name: 'Write', module: 'ACCOUNTING' },
    { id: 3, name: 'Delete', module: 'ACCOUNTING' },

    // Products module permissions
    { id: 4, name: 'prime', module: 'BANK' },
    { id: 5, name: 'priemier', module: 'BANK' },
    { id: 6, name: 'brac', module: 'BANK' },

    // Orders module permissions
    { id: 7, name: 'john', module: 'CUSTOMER' },
    { id: 8, name: 'haddy', module: 'CUSTOMER' },
    { id: 9, name: 'unc', module: 'CUSTOMER' },
];

const EditRoleModal: React.FC<EditRoleModalProps> = ({
    role,
    isOpen,
    onClose,
    onSave,
}) => {
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
    const [activeModule, setActiveModule] = useState<'crm' | 'accounting'>('crm');

    useEffect(() => {
        if (role) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRoleName(role.roleName);
            setSelectedPermissions(role.permissions);
        }
    }, [role]);

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !role) return null;

    const handlePermissionToggle = (permission: Permission) => {
        const exists = selectedPermissions.some(
            p => p.id === permission.id
        );

        if (exists) {
            setSelectedPermissions(selectedPermissions.filter(p => p.id !== permission.id));
        } else {
            setSelectedPermissions([...selectedPermissions, permission]);
        }
    };

    const handleSave = () => {
        if (role) {
            onSave({
                ...role,
                roleName,
                permissions: selectedPermissions
            });
        }
        onClose();
    };

    // Get current permissions based on active module
    const currentPermissions = activeModule === 'crm' ? CRM_PERMISSIONS : ACCOUNTING_PERMISSIONS;

    const permissionsByModule = currentPermissions.reduce((acc, permission) => {
        if (!acc[permission.module]) {
            acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
            onClick={onClose} // Close when clicking backdrop
        >
            {/* Blurry Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Modal Content - stops click from closing */}
            <div
                style={{
                    backgroundColor: '#F6F8FA'
                }}
                className="relative bg-white border-gray-600 rounded-lg p-4 sm:p-6 w-full 
                          max-w-[95%] sm:max-w-2xl lg:max-w-4xl 
                          max-h-[90vh] overflow-y-auto 
                          shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <PageHeader
                    title="Create New Role"
                    buttonText="Create New Role"
                    onButtonClick={handleSave}
                    customButton={<CloseButton onClick={onClose} />}
                />

                {/* Name input Field */}
                <div className="mb-3 sm:mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-[14px] sm:text-[16px]">
                        Name
                    </label>
                    <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        style={{
                            backgroundColor: '#ECEFF3'
                        }}
                        className="w-full px-3 py-2 border text-gray-900 border-gray-300 
                                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                                 text-sm sm:text-base"
                    />
                </div>

                {/* Module Selection Buttons */}
                <div className="flex mb-4 rounded-lg border-gray-400 justify-start">
                    <div className='flex flex-wrap gap-2 bg-white rounded-lg border-2 border-gray-300 p-2 sm:px-3 sm:py-2 w-full'>
                        <button
                            onClick={() => setActiveModule('accounting')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors 
                                       font-medium text-sm sm:text-base flex-1 sm:flex-none
                                       ${activeModule === 'accounting'
                                    ? 'bg-[#0CAF60] text-white'
                                    : 'bg-[#d1f0e0] text-[#0CAF60] hover:bg-[#c1e0d0]'
                                }`}
                        >
                            Accounting
                        </button>
                        <button
                            onClick={() => setActiveModule('crm')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors 
                                       font-medium text-sm sm:text-base flex-1 sm:flex-none
                                       ${activeModule === 'crm'
                                    ? 'bg-[#0CAF60] text-white'
                                    : 'bg-[#d1f0e0] text-[#0CAF60] hover:bg-[#c1e0d0]'
                                }`}
                        >
                            CRM
                        </button>
                    </div>
                </div>

                {/* Permissions Table - Made scrollable on mobile */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                        <table className="min-w-full border-collapse rounded-lg shadow overflow-hidden">
                            <thead className="bg-[#E8F5E9]">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium 
                                               text-[#0CAF60] uppercase tracking-wider">
                                        Module
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium 
                                               text-[#0CAF60] uppercase tracking-wider">
                                        Permissions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {Object.entries(permissionsByModule).map(([module, permissions]) => (
                                    <tr key={module} className="hover:bg-gray-50">
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm border">
                                            <span className='text-black font-medium'>{module}</span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 border">
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                {permissions.map((permission) => (
                                                    <label
                                                        key={permission.id}
                                                        className="flex items-center space-x-1 px-2 sm:px-3 py-1 
                                                                 rounded bg-gray-50 hover:bg-gray-100 
                                                                 transition-colors cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPermissions.some(p => p.id === permission.id)}
                                                            onChange={() => handlePermissionToggle(permission)}
                                                            className="rounded text-blue-600 focus:ring-blue-500 
                                                                     w-3 h-3 sm:w-4 sm:h-4"
                                                        />
                                                        <span className="text-xs sm:text-sm text-gray-700">
                                                            {permission.name}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Button fields */}
                <div className="flex justify-end mt-4 sm:mt-6">
                    <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
                        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                        <PrimaryButton onClick={handleSave}>Upload</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoleModal;