import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";

const Profile: React.FC = () => {
    const user = useAppSelector(state => state.user);

    return (
        <Box>

        </Box>
    )
}

export default Profile