import { BrowserRouter, Navigate, Route, Routes as RoutesPath } from "react-router-dom";
import Home from "../screens/home/Home";
import Users from "../screens/users/Users";


function RoutesIndex () {
    return (
        <BrowserRouter>
            <RoutesPath>
                <Route path='/home' element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<Navigate to="/users" />} />
                
            </RoutesPath>
        </BrowserRouter>
    )
}
export default RoutesIndex