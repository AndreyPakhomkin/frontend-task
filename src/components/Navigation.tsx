import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
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
                Sing Out
            </Button>
        </ Container>
    )
}

export default Navigation