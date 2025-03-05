import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
// import Login from "./pages/login";
// import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import { Box } from "@mui/material";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Box sx={{ margin: '3rem' }}>
                <Routes>
                    <Route path="/" element={<AboutUs />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    {/* <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    /> */}
                </Routes>
            </Box>
        </BrowserRouter>
    );
};

export default AppRoutes;
