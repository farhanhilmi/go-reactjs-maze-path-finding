// import { MazeProps } from '../../../shared/types';

import { useState } from 'react';
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

    const buildMaze = () => {
        console.log('buildMaze');
        console.log(xAxis);
        console.log(yAxis);
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
            setMazeData(updatedMaze);
        }
        if (actionType === EXIT && isAddingExit) {
            const updatedMaze = [...mazeData];
            updatedMaze[rowIndex][columnIndex] = EXIT;
            setMazeData(updatedMaze);
        }
    };

    return (
        <>
            <div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Length of X
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setXAxis(parseInt(e.target.value))}
                            type="number"
                            name="x"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="type here ..."
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Length of Y
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setYAxis(parseInt(e.target.value))}
                            type="number"
                            name="y"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="type here ..."
                        />
                    </div>
                </div>
                <button className="mt-4" onClick={buildMaze}>
                    Build Maze
                </button>
            </div>
            <hr />
            {mazeData.length > 0 && (
                <div className="mt-8">
                    <div className="flex flex-col ">
                        <button
                            onClick={handleAddWallClick}
                            disabled={isAddingStart || isAddingExit}
                            className={`${
                                isAddingWall ? 'bg-blue-500' : 'bg-green-500'
                            } text-white px-4 py-2 rounded ${
                                (isAddingStart || isAddingExit) &&
                                'opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {isAddingWall ? 'Finish Adding Wall' : 'Add Wall'}
                        </button>
                        <button
                            onClick={handleAddStartClick}
                            disabled={isAddingWall || isAddingExit}
                            className={`${
                                isAddingStart ? 'bg-blue-500' : 'bg-green-500'
                            } text-white px-4 py-2 rounded ${
                                (isAddingWall || isAddingExit) &&
                                'opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {isAddingStart
                                ? 'Finish Adding Start'
                                : 'Add Start'}
                        </button>
                        <button
                            onClick={handleAddExitClick}
                            disabled={isAddingWall || isAddingStart}
                            className={`${
                                isAddingExit ? 'bg-blue-500' : 'bg-green-500'
                            } text-white px-4 py-2 rounded ${
                                (isAddingWall || isAddingStart) &&
                                'opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {isAddingExit ? 'Finish Adding Exit' : 'Add Exit'}
                        </button>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${mazeData[0].length}, 40px)`,
                        }}
                        className="mt-8"
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
                                    onClick={() =>
                                        handleCellClick(
                                            actionType,
                                            rowIndex,
                                            columnIndex,
                                        )
                                    }
                                >
                                    {/* Render path line in the cell if it's part of the pathCoordinates */}
                                    {/* {pathCoordinates.find(
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
                            )} */}
                                </div>
                            )),
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
