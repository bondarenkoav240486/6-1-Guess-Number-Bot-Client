import React, { useState } from 'react';

function App() {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = async () => {
        const response = await fetch('http://localhost:3001/start_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setMessage(data.message);
        setGameStarted(true);
    };

    const submitGuess = async () => {
        const response = await fetch('http://localhost:3001/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess: Number(guess) }),
        });
        const data = await response.json();
        let resultMessage = '';
        if (data.result === 'less') {
            resultMessage = 'The number is less.';
        } else if (data.result === 'greater') {
            resultMessage = 'The number is greater.';
        } else if (data.result === 'correct') {
            resultMessage = 'Congratulations! You guessed the number!';
            setGameStarted(false);
        }
        setMessage(resultMessage);
    };

    return (
        <div>
            <h1>Guess the Number</h1>
            {!gameStarted ? (
                <button onClick={startGame}>Start Game</button>
            ) : (
                <div>
                    <input
                        type="number"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                    />
                    <button onClick={submitGuess}>Submit Guess</button>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
}

export default App;
