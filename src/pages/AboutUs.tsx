import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const AboutUs = () => {
    const [info, setInfo] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:3001/info")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setInfo(data.data.info);
                }
            });
    }, []);

    return (
        <Box>
            <Typography variant="h5">
                {info === null ?
                    'Загрузка...'
                    :
                    info
                }
            </Typography>
        </Box>
    );
};

export default AboutUs;
