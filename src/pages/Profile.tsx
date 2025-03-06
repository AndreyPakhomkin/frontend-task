import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch } from "../store/hooks";
import { setError } from "../store/reducers/errorSlice";
import MuiModal from "../components/Modal";
import Skeleton from "@mui/material/Skeleton";
import { setUserName } from "../store/reducers/userSlice";
import { setQuote } from "../store/reducers/infoSlice";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();

    const { token, fullName } = useAppSelector(state => state.user);
    const { author, quote } = useAppSelector(state => state.information.quote);
    const [userInitials, setUserInitials] = useState<string>("UN");
    const [fetchQuoteStatus, setFetchQuoteStatus] = useState({ author: false, quote: false });
    const [loadingQuote, setLoadingQuote] = useState(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    useEffect(() => {
        if (!fullName) {
            fetch(`http://localhost:3001/profile?token=${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        dispatch(setUserName(data.data.fullname));
                    } else {
                        dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                    }
                })
                .catch(error => console.error("Ошибка загрузки:", error));
        }
    }, []);

    useEffect(() => {
        if (fullName) {
            const names = fullName.trim().split(/\s+/);
            const initials = names
                .slice(0, 2)
                .map(name => name.charAt(0).toUpperCase())
                .join("");

            setUserInitials(initials);
        }
    }, [fullName]);

    async function fetchQuote() {
        const controller = new AbortController();
        const { signal } = controller;
        setAbortController(controller);
        setFetchQuoteStatus({ author: false, quote: false })
        setLoadingQuote(true);

        const newQuote = { author: null, quote: null };

        fetch(`http://localhost:3001/author?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            signal
        })
            .then(res => res.json())
            .then(data1 => {
                if (!data1.success) {
                    dispatch(setError({ errorStatus: true, errorMessage: data1.data.message }));
                }

                newQuote.author = data1.data.name;
                setFetchQuoteStatus(prev => ({ ...prev, author: true }));

                return fetch(`http://localhost:3001/quote?token=${token}&authorId=${data1.data.authorId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    signal
                });
            })
            .then(res => res.json())
            .then(data2 => {
                if (data2.success) {
                    newQuote.quote = data2.data.quote
                    setFetchQuoteStatus(prev => ({ ...prev, quote: true }));
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: data2.data.message }));
                }
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    dispatch(setError({ errorStatus: true, errorMessage: 'Request aborted' }));
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: error.message }));
                }
            })
            .finally(() => {
                if (newQuote.author && newQuote.quote) {
                    dispatch(setQuote(newQuote));
                    setTimeout(() => setLoadingQuote(false), 1000);
                }
            });

        return controller.abort;
    }

    const handleCancel = () => {
        if (abortController) {
            abortController.abort();
            setLoadingQuote(false);
        }
    }

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
                    {fullName ? userInitials : '...'}
                </Avatar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    {fullName ?
                        <Typography
                            variant="h4"
                            sx={{

                            }}
                        >
                            Welcome, {fullName}!
                        </Typography>
                        :
                        <Skeleton variant="rounded" width={300} height={42} animation="wave" />
                    }

                    <Button
                        variant="contained"
                        onClick={fetchQuote}
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
                {quote ? `${author}: "${quote}"` : 'Here will be a quote for you.'}
            </Typography>
            <MuiModal authorQuote={fetchQuoteStatus} onCancel={handleCancel} open={loadingQuote} />
        </Box>
    )
}

export default Profile