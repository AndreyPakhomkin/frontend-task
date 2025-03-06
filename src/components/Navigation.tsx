import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { setError } from "../store/reducers/errorSlice";
import { deleteQuote } from "../store/reducers/infoSlice";

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const logOut = () => {

        fetch(`http://localhost:3001/logout?token=${user.token}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(deleteUser());
                    dispatch(deleteQuote());
                    navigate('/');
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                }
            })
            .catch(error => console.error("Ошибка:", error));
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                gap: '0.5rem'
            }}
        >
            <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/"
                sx={{
                    color: 'primary.main',
                    textDecoration: 'none'
                }}
            >
                About us
            </Button>
            {!user.loggedIn &&
                <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{
                        color: 'primary.main',
                        textDecoration: 'none'
                    }}
                >
                    Sing In
                </Button>
            }
            {user.loggedIn &&
                <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/profile"
                    sx={{
                        color: 'primary.main',
                        textDecoration: 'none'
                    }}
                >
                    Profile
                </Button>
            }
            {user.loggedIn &&
                <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        color: 'primary.main',
                        textDecoration: 'none'
                    }}
                    onClick={logOut}
                >
                    Sign Out
                </Button>
            }
        </ Container >
    )
}

export default Navigation