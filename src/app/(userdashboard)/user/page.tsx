'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import UserActionButtons from './_components/UserActionButtons';
import UserTable from './_components/UserTable';
import UserGrid from './_components/UserGrid';
import CreateUserModal from './_components/CreateUserModal';
import UploadUserCsvModal from './_components/UploadUserCsvModal';
import EditUserModal from './_components/EditUserModal';
import UserLogHistoryTable from './_components/UserLogHistoryTable';
import { User, CreateUserData } from './_types';

// Dummy data
const DUMMY_USERS: User[] = [
    {
        id: 1,
        picture: "/userImage.jpg",
        name: "John Cooper",
        email: "john.admin@example.com",
        role: "Client",
        status: [
            { id: 1, name: "view", module: "actions" },
            { id: 2, name: "logout", module: "actions" },
            { id: 3, name: "edit", module: "actions" },
            { id: 4, name: "delete", module: "actions" }
        ]
    },
    {
        id: 2,
        picture: "/userImage.jpg",
        name: "Jane Editor",
        email: "jane.editor@example.com",
        role: "Editor",
        status: [
            { id: 5, name: "view", module: "views" },
            { id: 6, name: "logout", module: "views" },
            { id: 7, name: "edit", module: "ratings" },
            { id: 8, name: "delete", module: "ratings" }
        ]
    },
    {
        id: 3,
        picture: "/userImage.jpg",
        name: "Viewer User",
        email: "viewer.user@example.com",
        role: "Viewer",
        status: [
            { id: 9, name: "view", module: "files" },
            { id: 10, name: "logout", module: "files" },
            { id: 11, name: "edit", module: "files" },
            { id: 12, name: "delete", module: "files" }
        ]
    }
];

export default function UserPage() {
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isLogHistoryOpen, setIsLogHistoryOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | number | undefined>();

    // View handlers
    const handleTableView = () => setViewMode('table');
    const handleGridView = () => setViewMode('grid');

    // Modal handlers
    const handleCreateNew = () => setIsCreateModalOpen(true);
    const handleFileUpload = () => setIsUploadModalOpen(true);
    const handleExport = () => {
        console.log('Export users');
        // Implement export logic
    };

    // User action handlers
    const handleView = (user: User) => {
        setSelectedUserId(user.id);
        setIsLogHistoryOpen(true);
    };

    const handleLogout = (user: User) => {
        console.log('Logout user:', user);
        // Implement logout logic
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (userId: string | number) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    // Save handlers
    const handleCreateSave = (newUserData: CreateUserData) => {
        const pictureUrl = typeof newUserData.picture === 'string' ? newUserData.picture : "/userImage.jpg";
        const newUser: User = {
            id: Date.now(),
            picture: pictureUrl,
            name: newUserData.name,
            email: newUserData.email,
            role: newUserData.role,
            status: [
                { id: Date.now() + 1, name: "view", module: "actions" },
                { id: Date.now() + 2, name: "logout", module: "actions" },
                { id: Date.now() + 3, name: "edit", module: "actions" },
                { id: Date.now() + 4, name: "delete", module: "actions" }
            ]
        };
        setUsers([...users, newUser]);
        setIsCreateModalOpen(false);
    };

    const handleEditSave = (updatedUser: User) => {
        setUsers(users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleCsvUpload = (file: File) => {
        console.log('Uploading CSV:', file);
        // Implement CSV upload logic
        setIsUploadModalOpen(false);
    };

    const handleDownloadSample = () => {
        console.log('Downloading sample CSV');
        // Implement sample CSV download
    };

    return (
        <>
            <div className="container mx-auto px-8 py-8">
                <PageHeader
                    title="User"
                    buttonText="Create New User"
                    onButtonClick={handleCreateNew}
                    actionButtons={
                        <UserActionButtons
                            viewMode={viewMode}
                            onTableView={handleTableView}
                            onGridView={handleGridView}
                            onFileUpload={handleFileUpload}
                            onExport={handleExport}
                        />
                    }
                />

                {viewMode === 'table' ? (
                    <UserTable
                        users={users}
                        onView={handleView}
                        onLogout={handleLogout}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <UserGrid
                        users={users}
                        onView={handleView}
                        onLogout={handleLogout}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Modals */}
            {/* <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleCreateSave}
            /> */}

            {/* <EditUserModal
                user={selectedUser}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedUser(null);
                }}
                onSave={handleEditSave}
                onDelete={handleDelete}
            /> */}

            {/* <UploadUserCsvModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleCsvUpload}
                onDownloadSample={handleDownloadSample}
            /> */}

            {/* <UserLogHistoryTable
                userId={selectedUserId}
                isOpen={isLogHistoryOpen}
                onClose={() => {
                    setIsLogHistoryOpen(false);
                    setSelectedUserId(undefined);
                }}
            /> */}
        </>
    );
}