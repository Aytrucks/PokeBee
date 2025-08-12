// In GuessedList.jsx

// Accept props, and destructure `guesses` from it
const GuessedList = ({ guesses }) => {
    const keys = Object.keys(guesses)
    const values = Object.values(guesses)
    return (
        <div>
            <h3>Guessed Pokémon:</h3>
            <ul>
                {/* Map over the `guesses` prop */}
                {keys.map((guess, index) => (
                    <li key={index} className={guesses[guess]}>{guess}</li>
                ))}
            </ul>
        </div>
    );
}

export default GuessedList;