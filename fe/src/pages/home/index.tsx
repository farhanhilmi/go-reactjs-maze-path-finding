// Maze.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MazeProps } from '../../../shared/types';

const START = '-';
const PATH = '*';
const WALL = '#';
const EXIT = '+';
// const STARTCOLOR = '#00F';
// const EXITCOLOR = '#F00';

const mazeData = [
    [START, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, PATH],
    [WALL, PATH, WALL, PATH, PATH, PATH, PATH, PATH, WALL, PATH],
    [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
    [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
    [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
    [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
    [WALL, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, WALL],
    [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
    [PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, PATH, WALL],
];

const Maze: React.FC<MazeProps> = ({ mazeData }) => {
    const [pathCoordinates, setPathCoordinates] = useState<
        { X: number; Y: number }[]
    >([]);

    const handlePathfinding = async () => {
        try {
            const response = await fetch('http://localhost:8080/findPath', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ maze: mazeData }),
            });
            const data = await response.json();
            const path = data.path;

            // Clear path coordinates
            setPathCoordinates([]);

            // Visualize the pathfinding process with a delay
            for (let i = 0; i < path.length; i++) {
                await new Promise((resolve) => setTimeout(resolve, 150));
                setPathCoordinates((prevCoordinates) => [
                    ...prevCoordinates,
                    path[i],
                ]);
            }
        } catch (error) {
            console.error('Error fetching path:', error);
        }
    };

    return (
        <>
            <div className="mb-4">
                <Link
                    to={'/maze/create'}
                    className="bg-purple-400 py-2 px-4 rounded-xl text-white font-medium"
                >
                    Create new maze
                </Link>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${mazeData[0].length}, 40px)`,
                }}
            >
                {mazeData.map((row, rowIndex) =>
                    row.map((cell, columnIndex) => (
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
                                        ? 'green'
                                        : cell === EXIT
                                        ? 'red'
                                        : 'white',
                                position: 'relative',
                            }}
                        >
                            {/* Render path line in the cell if it's part of the pathCoordinates */}
                            {pathCoordinates.find(
                                ({ X, Y }) =>
                                    X === columnIndex && Y === rowIndex,
                            ) && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: '4px',
                                        height: '4px',
                                        background: 'blue',
                                        transform: 'translate(-50%, -50%)',
                                        // animation: 'fadeIn 0.5s ease-out',
                                    }}
                                ></div>
                            )}
                        </div>
                    )),
                )}
            </div>

            {/* Button to trigger pathfinding */}
            <button onClick={handlePathfinding}>Find Path</button>
        </>
    );
};

const Home: React.FC = () => {
    // const [maze, setMaze] = useState(mazeData);
    return (
        <div>
            <Maze mazeData={mazeData} />
        </div>
    );
};

export default Home;
