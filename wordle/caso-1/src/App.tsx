import {useCallback, useEffect, useState} from "react";

import api from "./api";

function App() {
  const [answer, setAnswer] = useState("");
  const [turn, setTurn] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "finished">("playing");
  const [words, setWords] = useState<string[][]>(() =>
    Array.from({length: 6}, () => new Array(5).fill("")),
  );

  const resetGame = useCallback(async () => {
    const newAnswer = await api.word.random();

    setAnswer(newAnswer);
    setWords(Array.from({length: 6}, () => new Array(5).fill("")));
    setTurn(0);
    setStatus("playing");
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (status === "finished") {
        resetGame();

        return;
      }

      if (status === "playing") {
        switch (event.key) {
          case "Enter": {
            if (words[turn].some((letter) => letter === "")) {
              return;
            }

            if (words[turn].join("") === answer) {
              setStatus("finished");
            }

            setTurn((turn) => turn + 1);

            return;
          }
          case "Backspace": {
            let firstEmptyIndex = words[turn].findIndex((letter) => letter === "");

            if (firstEmptyIndex === -1) {
              firstEmptyIndex = words[turn].length;
            }

            words[turn][firstEmptyIndex - 1] = "";

            setWords(words.slice());

            return;
          }
          default: {
            if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
              const firstEmptyIndex = words[turn].findIndex((letter) => letter === "");

              if (firstEmptyIndex === -1) return;

              words[turn][firstEmptyIndex] = event.key.toUpperCase();

              setWords(words.slice());

              return;
            }
          }
        }
      }
    },
    [answer, status, turn, words],
  );

  useEffect(() => {
    api.word.random().then(setAnswer);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="board">
      {words.map((word, wordIndex) => (
        <section key={wordIndex} className="word">
          {word.map((letter, letterIndex) => {
            const isPresent =
              letter &&
              wordIndex < turn &&
              letter !== answer[letterIndex] &&
              answer.includes(letter);
            const isCorrect = letter && wordIndex < turn && letter === answer[letterIndex];

            return (
              <article className={`letter ${isPresent ? "present" : ""} ${isCorrect && "correct"}`}>
                {letter}
              </article>
            );
          })}
        </section>
      ))}
    </main>
  );
}

export default App;
