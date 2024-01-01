// Maze.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MazeProps } from '../../../shared/types';
import { Button } from '../../components/Button';
import { GetMazePath } from '../../../shared/utils/maze';
import { MazeBox } from '../../components/MazeBox';

const START = '-';
const PATH = '*';
const WALL = '#';
const EXIT = '+';
const STARTCOLOR = '#68D391';
const EXITCOLOR = '#EF4444';

const mazeOptions = [
    {
        label: 'Maze 1',
        value: [
            [START, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, EXIT],
            [WALL, PATH, WALL, PATH, PATH, PATH, PATH, PATH, WALL, PATH],
            [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
            [PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, PATH, EXIT],
        ],
    },
    {
        label: 'Maze 2',
        value: [
            [START, WALL, PATH, WALL, WALL, PATH, PATH, WALL, PATH, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, PATH],
            [PATH, WALL, PATH, PATH, PATH, WALL, PATH, PATH, WALL, PATH],
            [PATH, PATH, PATH, WALL, WALL, PATH, WALL, PATH, WALL, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, PATH, PATH, EXIT],
            [PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, PATH, WALL],
        ],
    },
    {
        label: 'Maze 3',
        value: [
            [WALL, PATH, START, WALL, WALL, PATH, PATH, WALL, PATH, EXIT],
            [PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, PATH, PATH],
            [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
            [EXIT, WALL, WALL, PATH, PATH, PATH, PATH, START, PATH, WALL],
        ],
    },
    {
        label: 'Maze 4',
        value: [
            [WALL, PATH, START, WALL, WALL, PATH, PATH, WALL, PATH, EXIT],
            [PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, PATH, PATH],
            [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
            [EXIT, WALL, WALL, PATH, PATH, PATH, PATH, START, PATH, WALL],
        ],
    },
    {
        label: 'Maze 5',
        value: [
            [WALL, PATH, START, WALL, WALL, PATH, PATH, WALL, PATH, EXIT],
            [PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, PATH, PATH],
            [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
            [EXIT, WALL, WALL, PATH, PATH, PATH, PATH, START, PATH, WALL],
        ],
    },
    {
        label: 'Maze 6',
        value: [
            [START, WALL, WALL, PATH, WALL, PATH, WALL, PATH, WALL, EXIT],
            [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, PATH],
            [PATH, WALL, PATH, PATH, PATH, WALL, PATH, WALL, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH],
            [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
            [WALL, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH, PATH],
            [WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, WALL],
            [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
            [PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, PATH, EXIT],
        ],
    },
];

const mazeData = [
    [START, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, EXIT],
    [WALL, PATH, WALL, PATH, PATH, PATH, PATH, PATH, WALL, PATH],
    [PATH, PATH, PATH, WALL, PATH, WALL, PATH, WALL, PATH, PATH],
    [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
    [PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL, PATH, WALL],
    [WALL, PATH, PATH, PATH, PATH, WALL, PATH, PATH, PATH, PATH],
    [WALL, PATH, WALL, PATH, WALL, WALL, PATH, WALL, PATH, WALL],
    [PATH, PATH, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL],
    [PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, PATH, WALL],
];

const findPointCoordinates = (maze: string[][], point: string) => {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === point) {
                return `X: ${j}, Y: ${i}`;
            }
        }
    }

    return null;
};

const Maze: React.FC<MazeProps> = () => {
    const [pathCoordinates, setPathCoordinates] = useState<
        { X: number; Y: number }[]
    >([]);
    const [maze, setMaze] = useState(mazeData);

    const handlePathfinding = async () => {
        try {
            const path = await GetMazePath({ maze });

            // Clear path coordinates
            setPathCoordinates([]);

            if (!path) {
                console.log('No path found');
                alert('No path found');
                return;
            }

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

    const changeMaze = (maze: string[][]) => {
        setPathCoordinates([]);
        setMaze(maze);
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="grid grid-cols-2 ">
                <div>
                    <div className="mb-4">
                        <Link
                            to={'/maze/create'}
                            className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-md hover:bg-opacity-10 focus:outline-none focus:ring focus:border-blue-700"
                        >
                            Create new maze
                        </Link>
                        <div className="mt-10 text-white font-medium">
                            <span>
                                Start Point:{' '}
                                <span className="px-3 bg-gradient-to-r from-green-300 to-green-500 py-1 rounded-xl">
                                    {findPointCoordinates(
                                        maze,
                                        START,
                                    )?.toString()}
                                </span>
                            </span>
                            <span className="ml-4">
                                Exit Point:{' '}
                                <span className="px-3 bg-gradient-to-r from-red-300 to-red-500 py-1 rounded-xl">
                                    {findPointCoordinates(maze, EXIT)
                                        ? findPointCoordinates(maze, EXIT)
                                        : 'No exit point'}
                                </span>
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div
                        className="mb-4 mt-4"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${maze[0].length}, 40px)`,
                        }}
                    >
                        {maze.map((row, rowIndex) =>
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
                                                ? STARTCOLOR
                                                : cell === EXIT
                                                ? EXITCOLOR
                                                : 'white',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Render path line in the cell if it's part of the pathCoordinates */}
                                    {pathCoordinates.find(
                                        ({ X, Y }) =>
                                            X === columnIndex && Y === rowIndex,
                                    ) && (
                                        <MazeBox
                                            cell={cell}
                                            columnIndex={columnIndex}
                                            isDrawing={true}
                                            pathCoordinates={pathCoordinates}
                                            rowIndex={rowIndex}
                                            key={`${rowIndex}-${columnIndex}`}
                                        />
                                    )}
                                </div>
                            )),
                        )}
                    </div>

                    <Button text="Find Path" onClick={handlePathfinding} />
                </div>
                <div className="rounded-sm">
                    <h4 className="mb-6 font-medium text-lg text-white">
                        Try other maze pattern here
                    </h4>
                    <div className="grid grid-cols-2">
                        {mazeOptions.map((maze, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-4 mt-4 group p-4 relative hover:bg-gray-400 transition justify-center"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(${maze.value[0].length}, 25px)`,
                                    }}
                                >
                                    {maze.value.map((row, rowIndex) =>
                                        row.map((cell, columnIndex) => (
                                            <div
                                                key={`${rowIndex}-${columnIndex}`}
                                                style={{
                                                    width: '25px',
                                                    height: '25px',
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
                                            ></div>
                                        )),
                                    )}
                                    <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center rounded">
                                        <Button
                                            text="Choose this maze"
                                            onClick={() =>
                                                changeMaze(maze.value)
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
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
