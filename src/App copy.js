import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

function App() {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = async () => {
        try {
            const response = await axios.post('http://localhost:3001/start_game');
            console.log(response.data.targetNumber)
            setMessage(response.data.message);
            setGameStarted(true);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    const submitGuess = async () => {
        try {
            const response = await axios.post('http://localhost:3001/guess', { guess: Number(guess) });
            const resultMessage = response.data.result === 'less'
                ? 'The number is less.'
                : response.data.result === 'greater'
                    ? 'The number is greater.'
                    : 'Congratulations! You guessed the number!';

            setMessage(resultMessage);
            if (response.data.result === 'correct') {
                setGameStarted(false);
            }
        } catch (error) {
            console.error('Error submitting guess:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Guess the Number
            </Typography>
            {!gameStarted ? (
                <Button variant="contained" color="primary" onClick={startGame}>
                    Start Game
                </Button>
            ) : (
                <div>
                    <TextField
                        type="number"
                        label="Your Guess"
                        variant="outlined"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        style={{ marginRight: '1rem' }}
                    />
                    <Button variant="contained" color="secondary" onClick={submitGuess}>
                        Submit Guess
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
