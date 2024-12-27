import { BrowserRouter } from "react-router-dom"
import AppRouters from "./routers"

export const App = () => {
    return (
        <BrowserRouter>
            <AppRouters />
        </BrowserRouter>
    )
}