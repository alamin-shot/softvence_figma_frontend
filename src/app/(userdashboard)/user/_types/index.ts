export interface UserAction {
    id: string | number;
    name: string;      // 'view' | 'logout' | 'edit' | 'delete'
    module: string;    // for grouping/future use
}

export interface User {
    id: string | number;
    picture: string;
    name: string;
    email: string;
    role: string;
    status: UserAction[];  // array of available actions for this user
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    role: string;
    picture?: File | string;
}

export interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
    onDelete: (userId: string | number) => void;
}

export interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newUser: CreateUserData) => void;
}

export interface UploadCsvModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
    onDownloadSample: () => void;
}

export interface UserLogHistoryProps {
    userId?: string | number;
    isOpen: boolean;
    onClose: () => void;
}