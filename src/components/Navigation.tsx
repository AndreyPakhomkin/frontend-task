import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/reducers/userSlice";

const Navigation: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const logOut = () => {
        dispatch(setUser({
            loggedIn: false,
            token: null
        }))
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
                    Sing Out
                </Button>
            }
        </ Container >
    )
}

export default Navigation