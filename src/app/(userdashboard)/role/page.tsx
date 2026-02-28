'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import AddButton from '@/components/buttons/AddButton';
import RoleTable from './_components/RoleTable';
import EditRoleModal from './_components/EditRoleModal';
import { Role } from './_types';


// Dummy data
const DUMMY_ROLES: Role[] = [
    {
        id: 1,
        roleName: "Admin",
        permissions: [
            { id: 7, name: "Read", module: "All" },
            { id: 8, name: "Write", module: "All" },
            { id: 9, name: "Delete", module: "All" }
        ]
    },
    {
        id: 2,
        roleName: "Editor",
        permissions: [
            { id: 4, name: "Read", module: "Posts" },
            { id: 5, name: "Write", module: "Posts" }
        ]
    },
    {
        id: 3,
        roleName: "Viewer",
        permissions: [
            { id: 1, name: "Read", module: "Users" },
            { id: 4, name: "Read", module: "Posts" }
        ]
    }
];

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>(DUMMY_ROLES);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Creating new Role
    const handleCreateNew = () => {
        // For now, create a dummy new role
        const newRole: Role = {
            id: Date.now(),
            roleName: "New Role",
            permissions: []
        };
        setSelectedRole(newRole);
        setIsModalOpen(true);
    };

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleSave = (updatedRole: Role) => {
        console.log('=== SAVE ATTEMPT ===');

        // Check if this is a new role (doesn't exist in current roles)
        const existingRoleIndex = roles.findIndex(r => r.id === updatedRole.id);
        const isNewRole = existingRoleIndex === -1;

        console.log('Is new role?', isNewRole);

        if (isNewRole) {
            // Add new role to the array
            console.log('Adding new role:', updatedRole);
            setRoles([...roles, updatedRole]);
        } else {
            // Update existing role
            console.log('Updating existing role:', updatedRole);
            setRoles(roles.map(role =>
                role.id === updatedRole.id ? updatedRole : role
            ));
        }

        console.log('Roles after save:', isNewRole ? [...roles, updatedRole] : roles);
    };
    const handleDelete = (roleId: string | number) => {
        setRoles(roles.filter(role => role.id !== roleId));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRole(null);
    };

    return (
        <div className="container mx-auto px-8 py-8">
            <PageHeader
                title="Manage Roles"
                buttonText="Create New Role"
                onButtonClick={handleCreateNew}
                customButton={<AddButton onClick={handleCreateNew} />}
            />

            <RoleTable
                roles={roles}
                onEdit={handleEdit}
            />

            <EditRoleModal
                key={selectedRole?.id || 'new'} 
                role={selectedRole}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}