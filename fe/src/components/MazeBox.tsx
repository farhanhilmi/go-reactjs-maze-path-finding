import React from 'react';

interface MazeBoxProps {
    cell: string;
    rowIndex: number;
    columnIndex: number;
    pathCoordinates: { X: number; Y: number }[];
    isDrawing: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const START = '-';
const WALL = '#';
const EXIT = '+';
const STARTCOLOR = '#68D391';
const EXITCOLOR = '#EF4444';

export const MazeBox: React.FC<MazeBoxProps> = ({
    cell,
    rowIndex,
    columnIndex,
    pathCoordinates,
    isDrawing,
    onClick,
}) => {
    return (
        <div
            key={`${rowIndex}-${columnIndex}`}
            style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                background:
                    cell === WALL
                        ? '#000'
                        : cell === START
                        ? STARTCOLOR
                        : cell === EXIT
                        ? EXITCOLOR
                        : 'white',
                position: 'relative',
            }}
            onClick={onClick}
        >
            {/* Render path line in the cell if it's part of the pathCoordinates */}
            {isDrawing &&
                pathCoordinates.find(
                    ({ X, Y }) => X === columnIndex && Y === rowIndex,
                ) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '8px',
                            height: '8px',
                            background: '#60a5fa',
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                )}
        </div>
    );
};
