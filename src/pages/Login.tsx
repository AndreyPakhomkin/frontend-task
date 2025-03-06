import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/reducers/userSlice";
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
        try {
            fetch("http://localhost:3001/login")
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        const userData = {
                            email: formData.email,
                            password: formData.password,
                            token: String(data.token),
                            loggedIn: true
                        }
                        dispatch(setUser(userData));
                        setLoading(false);
                        navigate('/profile');
                    }
                });
        } catch (error) {
            console.error(error)
        }
    };

    const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

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