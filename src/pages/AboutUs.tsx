import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setError } from "../store/reducers/errorSlice";
import { setInfo } from "../store/reducers/infoSlice";

const AboutUs = () => {
    const dispatch = useAppDispatch()
    const { info } = useAppSelector(state => state.information);

    useEffect(() => {
        if (!info) {
            fetch("http://localhost:3001/info", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        dispatch(setInfo(data.data.info));
                    } else {
                        dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                    }
                })
                .catch(error => console.error("Ошибка загрузки:", error));
        }
    }, []);

    return (
        <Box>
            {info ?
                <Typography variant="h5">
                    {info}
                </Typography>
                :
                <Skeleton width={410} height={32} animation="wave" />
            }

        </Box>
    );
};

export default AboutUs;
