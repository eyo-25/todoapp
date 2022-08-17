import { BrowserRouter, Routes, Route } from "react-router-dom"
import TodoList from "./component/TodoList"

export function Router(){
    return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<TodoList/>}>
                        <Route path={`myplan`} element={<TodoList/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
    )
}