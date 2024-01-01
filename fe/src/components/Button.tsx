import React from 'react';

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
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
