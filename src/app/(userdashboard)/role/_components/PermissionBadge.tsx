import React from 'react';
import { Permission } from '../_types';

interface PermissionBadgeProps {
    permission: Permission;
}

const PermissionBadge: React.FC<PermissionBadgeProps> = ({ permission }) => {
    // Different colors for different permission types
    const getColorClasses = (permissionName: string) => {
        switch (permissionName.toLowerCase()) {
            case 'read':
                return 'bg-green-500 ';
            case 'write':
                return 'bg-blue-500 ';
            case 'delete':
                return 'bg-red-500 ';
            default:
                return 'bg-gray-500 ';
        }
    };

    return (
        <span className={`inline-flex items-center px-3.5 py-1.5 rounded text-sm font-medium text-gray-50 ${getColorClasses(permission.name)}`}>
            {permission.name}
        </span>
    );
};

export default PermissionBadge;