import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/reducers/userSlice";
import { setError } from "../store/reducers/errorSlice";
import { useNavigate } from "react-router-dom";

interface Formdata {
    email: string,
    password: string
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<Formdata>({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const params = {
            email: formData.email,
            password: formData.password
        }

        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const userData = {
                        token: data.token,
                        loggedIn: true
                    }
                    dispatch(setUser(userData));
                    navigate('/profile');
                } else {
                    dispatch(setError({ errorStatus: true, errorMessage: data.data.message }))
                }
                setLoading(false);
            })
            .catch(error => console.error("Ошибка загрузки:", error));
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isFormValid = formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        isValidEmail(formData.email);

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                Sign In
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 300,
                    margin: '0 auto',
                    padding: 2,
                }}
            >
                <TextField
                    label="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    error={formData.email !== "" && !isValidEmail(formData.email)}
                    helperText={
                        formData.email !== "" && !isValidEmail(formData.email) ? "Некорректный email" : ""
                    }
                    required
                />
                <TextField
                    label="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default Login