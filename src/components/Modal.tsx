import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface AuthorQuote {
    author: boolean;
    quote: boolean;
}

interface MuiModalProps {
    authorQuote: AuthorQuote;
    onCancel: () => void;
    open: boolean;
}

const MuiModal: React.FC<MuiModalProps> = ({ authorQuote, onCancel, open }) => {
    const { author, quote } = authorQuote;

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Requesting the quote
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Step 1. Requesting author... {author && ' Done'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Step 2. Requesting quote... {quote && ' Done'}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onCancel}
                        sx={{
                            width: '120px',
                            marginTop: '1rem'
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default MuiModal