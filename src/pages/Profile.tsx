import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch } from "../store/hooks";
import { setError } from "../store/reducers/errorSlice";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);
    const [userFullName, setUserFullName] = useState<string>();
    const [userInitials, setUserInitials] = useState<string>("UN");
    const [quote, setQuote] = useState<string>();

    useEffect(() => {
        const params = '?token=' + user.token

        fetch("http://localhost:3001/profile" + params, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserFullName(data.data.fullname);
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                }
            })
            .catch(error => console.error("Ошибка загрузки:", error));
    }, []);

    useEffect(() => {
        if (userFullName) {
            const names = userFullName.trim().split(/\s+/);
            const initials = names
                .slice(0, 2)
                .map(name => name.charAt(0).toUpperCase())
                .join("");

            setUserInitials(initials);
        }
    }, [userFullName]);

    return (
        <Box sx={{
            width: '50vw',
        }}>
            <Box sx={{
                display: 'flex',
                marginBottom: '2rem',
                marginLeft: '3.5rem'
            }}>
                <Avatar
                    sx={{
                        bgcolor: deepPurple[500],
                        width: 85,
                        height: 85,
                        marginRight: '1.5rem',
                        fontSize: '3rem'
                    }}
                >
                    {userFullName ? userInitials : 'UN'}
                </Avatar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{

                        }}
                    >
                        {userFullName ? `Welcome, ${userFullName}!` : 'Loading...'}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            width: '120px'
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </Box >
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center"
                }}
            >
                {quote || 'Here will be a quote for you.'}
            </Typography>
        </Box>
    )
}

export default Profile