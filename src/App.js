import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    // Використання змінної оточення для URL сервера
    const baseURL = process.env.REACT_APP_API_URL; // Додано змінну для базового URL

    const startGame = async () => {
        try {
            const response = await axios.post(`${baseURL}/start_game`); // Використання змінної оточення
            console.log(response.data.targetNumber)
            setMessage(response.data.message);
            setGameStarted(true);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    const submitGuess = async () => {
        try {
            const response = await axios.post(`${baseURL}/guess`, { guess: Number(guess) }); // Використання змінної оточення
            const resultMessage = response.data.result === 'less'
                ? 'Загадане число меньше.'
                : response.data.result === 'greater'
                    ? 'Загадане число більше.'
                    : 'Число вгадано!';

            setMessage(resultMessage);
            if (response.data.result === 'correct') {
                setGameStarted(false);
            }
        } catch (error) {
            console.error('Error submitting guess:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}
            className='wrapper'
        >
            <Typography variant="h4" gutterBottom>
                Вгадай Число
            </Typography>
            {!gameStarted ? (
                <Button variant="contained" color="primary" onClick={startGame}>
                    Почати гру
                </Button>
            ) : (
                <div className='textField-and-button'>
                    <TextField
                        type="number"
                        label="Ваша Спроба"
                        variant="outlined"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        style={{ marginRight: '1rem' }}
                    />
                    <Button variant="contained" color="secondary" onClick={submitGuess}>
                        Надішліть спробу
                    </Button>
                </div>
            )}
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
                {message}
            </Typography>
        </Container>
    );
}

export default App;
