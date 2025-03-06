import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setError } from "../store/reducers/errorSlice";

const AboutUs = () => {
    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:3001/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setInfo(data.data.info);
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                }
            })
            .catch(error => console.error("Ошибка загрузки:", error));
    }, []);

    return (
        <Box>
            <Typography variant="h5">
                {info || "Loading..."}
            </Typography>
        </Box>
    );
};

export default AboutUs;
