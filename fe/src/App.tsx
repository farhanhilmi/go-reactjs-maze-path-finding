import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
        // <div className="min-h-screen flex justify-center items-center">
        //     <h1 className="text-3xl font-bold text-blue-400">
        //         This a fresh install of react vite and tailwind
        //     </h1>

        //     {/* <div>
        //         <a href="https://vitejs.dev" target="_blank">
        //             <img src={viteLogo} className="logo" alt="Vite logo" />
        //         </a>
        //         <a href="https://react.dev" target="_blank">
        //             <img
        //                 src={reactLogo}
        //                 className="logo react"
        //                 alt="React logo"
        //             />
        //         </a>
        //     </div>
        //     <h1>Vite + React</h1>
        //     <div className="card">
        //         <button onClick={() => setCount((count) => count + 1)}>
        //             count is {count}
        //         </button>
        //         <p>
        //             Edit <code>src/App.tsx</code> and save to test HMR
        //         </p>
        //     </div>
        //     <p className="read-the-docs">
        //         Click on the Vite and React logos to learn more
        //     </p> */}
        // </div>
    );
}

export default App;
