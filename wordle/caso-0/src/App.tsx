import {useCallback, useEffect, useRef, useState} from "react";

function App() {
  const answer = "RIGHT";
  const [turn, setTurn] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "finished">("playing");
  const [words, setWords] = useState<string[][]>(() =>
    Array.from({length: 6}, () => new Array(5).fill("")),
  );
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boardRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (status !== "playing") return;

      switch (event.key) {
        case "Enter": {
          if (words[turn].join("").length !== 5) return;

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
    },
    [status, words, turn],
  );

  return (
    <main ref={boardRef} className="board" tabIndex={0} onKeyDown={handleKeyDown}>
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
              <article
                key={letterIndex}
                className={`letter ${isPresent && "present"} ${isCorrect && "correct"}`}
              >
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
