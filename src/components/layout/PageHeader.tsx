// import React from 'react';

// interface PageHeaderProps {
//     title: string;
//     buttonText: string;
//     onButtonClick: () => void;
//     customButton?: React.ReactNode;
// }

// const PageHeader: React.FC<PageHeaderProps> = ({
//     title,
//     buttonText,
//     onButtonClick,
//     customButton
// }) => {
//     return (
//         <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
//             {customButton ? (
//                 customButton
//             ) : (
//                 // Default button if no custom button provided
//                 <button
//                     onClick={onButtonClick}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                     {buttonText}
//                 </button>
//             )}
//         </div>
//     );
// };

// export default PageHeader;

// components/PageHeader.tsx
import React from 'react';
// Your existing AddButton component
import AddButton from '@/components/buttons/AddButton';

interface PageHeaderProps {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
    customButton?: React.ReactNode;
    actionButtons?: React.ReactNode; // For additional buttons
    children?: React.ReactNode; // For custom content
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    buttonText,
    onButtonClick,
    customButton,
    actionButtons,
    children
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Left side - Title */}
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

            {/* Right side - Buttons */}
            <div className="flex items-center gap-2">
                {/* Additional action buttons (grid view, file, etc.) */}
                {actionButtons}

                {/* Main create button */}
                {customButton ? (
                    customButton
                ) : (
                    buttonText && onButtonClick && (
                        <AddButton onClick={onButtonClick}>
                        </AddButton>
                    )
                )}
            </div>

            {/* Optional children for more complex layouts */}
            {children}
        </div>
    );
};

export default PageHeader;