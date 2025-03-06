import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Alert } from "@mui/material";
import { setError } from "../store/reducers/errorSlice";


const ErrorAlert: React.FC = () => {
    const dispatch = useAppDispatch();
    const { errorStatus, errorMessage } = useAppSelector(state => state.error);

    useEffect(() => {
        if (errorStatus) {
            const timer = setTimeout(() => {
                dispatch(setError({ errorStatus: false, errorMessage: null }));
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorStatus])

    if (errorStatus) {
        return (
            <Alert
                severity="warning"
                sx={{
                    width: "fit-content",
                    position: "absolute",
                    top: 10,
                }}
            >
                {errorMessage}
            </Alert>
        )
    } else return null
}

export default ErrorAlert