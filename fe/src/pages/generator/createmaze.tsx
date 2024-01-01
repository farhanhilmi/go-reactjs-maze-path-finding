// import { MazeProps } from '../../../shared/types';

import { useState } from 'react';
import { Button, GradientButton } from '../../components/Button';
import { Link } from 'react-router-dom';
import { GetMazePath } from '../../../shared/utils/maze';
import { MazeBox } from '../../components/MazeBox';
// import { MazeProps } from '../../../shared/types';

const START = '-';
const PATH = '*';
const WALL = '#';
const EXIT = '+';

export default function CreateMaze() {
    const [xAxis, setXAxis] = useState(0);
    const [yAxis, setYAxis] = useState(0);
    const [mazeData, setMazeData] = useState<string[][]>([]);
    const [isAddingWall, setIsAddingWall] = useState(false);
    const [isAddingStart, setIsAddingStart] = useState(false);
    const [isAddingExit, setIsAddingExit] = useState(false);
    const [actionType, setActionType] = useState('');
    const [countStartPoint, setCountStartPoint] = useState(0);
    const [countExitPoint, setCountExitPoint] = useState(0);

    const [pathCoordinates, setPathCoordinates] = useState<
        { X: number; Y: number }[]
    >([]);

    const handlePathfinding = async () => {
        try {
            const path = await GetMazePath({ maze: mazeData });

            // Clear path coordinates
            setPathCoordinates([]);

            if (path.length === 0 || !path) {
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
            alert('No path found');
        }
    };

    const buildMaze = () => {
        const maze = [];
        for (let i = 0; i < xAxis; i++) {
            const row = [];
            for (let j = 0; j < yAxis; j++) {
                row.push(PATH);
            }
            maze.push(row);
        }
        setMazeData(maze);
    };
    console.log('mazeData', mazeData);

    const handleAddWallClick = () => {
        setIsAddingWall(!isAddingWall);
        setActionType(WALL);
    };

    const handleAddStartClick = () => {
        setIsAddingStart(!isAddingStart);
        setActionType(START);
    };

    const handleAddExitClick = () => {
        setIsAddingExit(!isAddingExit);
        setActionType(EXIT);
    };

    const handleCellClick = (
        actionType: string,
        rowIndex: number,
        columnIndex: number,
    ) => {
        if (actionType === WALL && isAddingWall) {
            const updatedMaze = [...mazeData];
            updatedMaze[rowIndex][columnIndex] = WALL;
            setMazeData(updatedMaze);
        }
        if (actionType === START && isAddingStart) {
            const updatedMaze = [...mazeData];
            updatedMaze[rowIndex][columnIndex] = START;
            setCountStartPoint(countStartPoint + 1);
            setMazeData(updatedMaze);
        }
        if (actionType === EXIT && isAddingExit) {
            const updatedMaze = [...mazeData];
            updatedMaze[rowIndex][columnIndex] = EXIT;
            setCountExitPoint(countExitPoint + 1);
            setMazeData(updatedMaze);
        }
    };

    return (
        <>
            <Link
                to="/"
                className="text-white font-medium flex items-center hover:text-purple-200"
            >
                <span className="mr-2">←</span>
                Return to home
            </Link>
            <div className="flex flex-col justify-center items-center">
                <div className="mb-8 text-white font-medium ">
                    <div className="mb-4">
                        <label className="block ">Length of X</label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                onChange={(e) =>
                                    setXAxis(parseInt(e.target.value))
                                }
                                type="number"
                                name="x"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="type here ..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block ">Length of Y</label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                onChange={(e) =>
                                    setYAxis(parseInt(e.target.value))
                                }
                                type="number"
                                name="y"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="type here ..."
                            />
                        </div>
                    </div>
                    <Button text="Start build maze" onClick={buildMaze} />
                </div>
                <hr />
                {mazeData.length > 0 && (
                    <div className="mt-8 flex ">
                        <div className="flex flex-col">
                            <GradientButton
                                onClick={handleAddWallClick}
                                disabled={isAddingStart || isAddingExit}
                                isActive={isAddingWall}
                                gradientColors={[
                                    'from-blue-500',
                                    'to-green-500',
                                ]}
                                buttonText={
                                    isAddingWall
                                        ? 'Finish Adding Wall'
                                        : 'Add Wall'
                                }
                            />

                            <GradientButton
                                onClick={handleAddStartClick}
                                disabled={isAddingWall || isAddingExit}
                                isActive={isAddingStart}
                                gradientColors={[
                                    'from-purple-500',
                                    'to-green-500',
                                ]}
                                buttonText={
                                    isAddingStart
                                        ? 'Finish Adding Start'
                                        : 'Add Start'
                                }
                            />

                            <GradientButton
                                onClick={handleAddExitClick}
                                disabled={isAddingWall || isAddingStart}
                                isActive={isAddingExit}
                                gradientColors={[
                                    'from-pink-500',
                                    'to-green-500',
                                ]}
                                buttonText={
                                    isAddingExit
                                        ? 'Finish Adding Exit'
                                        : 'Add Exit'
                                }
                            />
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${mazeData[0].length}, 40px)`,
                            }}
                            className="ml-8"
                        >
                            {mazeData.map((row, rowIndex) =>
                                row.map((cell, columnIndex) => (
                                    <MazeBox
                                        cell={cell}
                                        columnIndex={columnIndex}
                                        isDrawing={true}
                                        pathCoordinates={pathCoordinates}
                                        rowIndex={rowIndex}
                                        key={`${rowIndex}-${columnIndex}`}
                                        onClick={() =>
                                            handleCellClick(
                                                actionType,
                                                rowIndex,
                                                columnIndex,
                                            )
                                        }
                                    />
                                )),
                            )}
                        </div>
                        <div className="ml-8 mt-[-8px]">
                            <Button
                                text="Find Path"
                                onClick={handlePathfinding}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
