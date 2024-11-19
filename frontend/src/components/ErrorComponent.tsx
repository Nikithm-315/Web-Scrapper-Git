import React from 'react';
import { Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <ErrorOutlineIcon style={{ fontSize: '100px', color: 'red' }} />
            <Typography variant="h4" component="h1" gutterBottom>
                Something went wrong
            </Typography>
            <Typography variant="body1" gutterBottom>
                {message}
            </Typography>
        </Container>
    );
};

export default ErrorComponent;