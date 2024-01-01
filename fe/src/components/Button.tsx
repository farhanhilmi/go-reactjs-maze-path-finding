import React from 'react';

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}

interface GradientButtonProps {
    onClick: () => void;
    disabled: boolean;
    isActive: boolean;
    gradientColors: string[];
    buttonText: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button
            onClick={onClick}
            className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-md hover:bg-opacity-10 focus:outline-none focus:ring focus:border-blue-700"
        >
            {text}
        </button>
    );
};

export const GradientButton: React.FC<GradientButtonProps> = ({
    onClick,
    disabled,
    isActive,
    gradientColors,
    buttonText,
}) => {
    const buttonClasses = `mb-2 ${
        isActive
            ? `bg-gradient-to-r ${gradientColors.join(', ')}`
            : 'bg-gradient-to-r from-blue-400 to-purple-500'
    } text-white px-4 py-2 rounded ${
        disabled && 'opacity-50 cursor-not-allowed'
    }`;

    return (
        <button onClick={onClick} disabled={disabled} className={buttonClasses}>
            {buttonText}
        </button>
    );
};
