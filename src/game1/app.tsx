"use client";
import {  useState } from 'react';
import './app.css';

const GameOne = () => {

    const [player, setPlayer] = useState(false); //flag to check player's 
    const [turn, setTurn] = useState(0);
    const [divContents, setDivContents] = useState(Array(9).fill(''));
    const [win, setWin] = useState<string | null>(null);

    const winningCombinations = [
        // Horizontales
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Verticales
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonales
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (currentDivContents:string[]) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                currentDivContents[a] !== '' &&
                currentDivContents[a] === currentDivContents[b] &&
                currentDivContents[b] === currentDivContents[c]
            ) {
                return currentDivContents[a];
            }
        }
        return null;
    };

    const clicked = (index: number) => {
        if (divContents[index] === '' && !win) {
            const newDivContents = [...divContents];
            newDivContents[index] = player ? 'O' : 'X';
    
            setDivContents(newDivContents);
    
            setTimeout(() => {
                const winnerPlayer = checkWinner(newDivContents);
    
                if (winnerPlayer) {
                    setWin(`${winnerPlayer} Winner`);
                } else {
                    setPlayer(!player);
                    setTurn(turn + 1);
                }
            }, 0);
        }
    };

    const onReset = () => {
        setDivContents(Array(9).fill(''));
        setTurn(0);
        setPlayer(false);
        setWin(null);
    };

    return (
        <>
            <section className='gameOne-container'>
                <h2>Three in a Row</h2>
                <p>El ganador es: {win || 'No one'}</p>
                <div className='three-container'>
                    {divContents.map((content, index) => (
                        <div
                            key={index}
                            onClick={() => clicked(index)}
                            className={`three-content ${win !== null ? 'disabled' : ''}`}
                        >
                            <span className='innerXO'>{content}</span>
                        </div>
                    ))}
                </div>
                <div className='three-menu'>
                    {player ? <p>Turno para <b>O</b></p> : <p>Turno para <b>X</b></p>}
                    <p>Turno actual: {turn}</p>
                    <button onClick={onReset}>Reiniciar</button>
                </div>
            </section>
        </>
    );
};

export default GameOne;