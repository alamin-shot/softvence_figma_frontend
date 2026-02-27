export interface Permission {
    id: string | number;
    name: string;      // e.g., "Read", "Write", "Delete"
    module: string;  // e.g., "Users", "Posts", "All"
}


export interface Role {
    id: string | number;
    roleName: string;
    permissions: Permission[];
    createdAt?: string;
    updatedAt?: string;
}

// For the edit modal
export interface EditRoleModalProps {
    role: Role | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedRole: Role) => void;
    onDelete: (roleId: string | number) => void;
}

