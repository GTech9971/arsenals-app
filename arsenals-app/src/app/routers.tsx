import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./routes/home";

const AppRouters = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouters;