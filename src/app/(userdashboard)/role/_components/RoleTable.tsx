// 'use client';

// import React from 'react';
// import { Role } from '../_types';
// import EditButton from '@/components/buttons/EditButton';
// import PermissionBadge from './PermissionBadge';

// interface RoleTableProps {
//     roles: Role[];
//     onEdit: (role: Role) => void;
// }

// const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit }) => {
//     return (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//             <table className="min-w-full border-collapse">
//                 <thead className="bg-[#E8F5E9]">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider ">
//                             Role
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider ">
//                             Permissions
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-[#0CAF60] uppercase tracking-wider ">
//                             Action
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                     {roles.map((role) => (
//                         <tr key={role.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap  font-medium border ">
//                                 <span style={{ color: '#0CAF60' }}>{role.roleName}</span>
//                             </td>
//                             <td className="px-6 py-4 border ">
//                                 <div className="flex flex-wrap gap-1 ">
//                                     {role.permissions.map((permission, index) => (
//                                         <PermissionBadge key={index} permission={permission} />
//                                     ))}
//                                 </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap border ">
//                                 <EditButton onClick={() => onEdit(role)} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default RoleTable;


'use client';

import React from 'react';
import { Role } from '../_types';
import EditButton from '@/components/buttons/EditButton';
import PermissionBadge from './PermissionBadge';

interface RoleTableProps {
    roles: Role[];
    onEdit: (role: Role) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit }) => {
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
                        {roles.map((role) => (
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
                {roles.map((role) => (
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
        </div>
    );
};

export default RoleTable;