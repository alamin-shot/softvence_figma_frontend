import React from 'react';

interface PageHeaderProps {
    title: string;
    buttonText: string;
    onButtonClick: () => void;
    customButton?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    buttonText,
    onButtonClick,
    customButton
}) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {customButton ? (
                customButton
            ) : (
                // Default button if no custom button provided
                <button
                    onClick={onButtonClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PageHeader;