import { useCallback, useEffect, useReducer } from "react";

import { ActionWordle, StateWordle } from "./types";
import api from "./api";

const initialState: StateWordle = {
  answer: "",
  isLoading: true,
  turn: 0,
  status: "playing",
  words: Array.from({ length: 6 }, () => new Array(5).fill("")),
};

const reducer = (state: StateWordle, action: ActionWordle): StateWordle => {
  if (action.type === "SET_ANSWER") {
    return { ...state, answer: action.payload, isLoading: false };
  }
  if (action.type === "SET_STATUS") {
    return { ...state, status: action.payload };
  }
  if (action.type === "SET_TURN") {
    return { ...state, turn: action.payload };
  }
  if (action.type === "UPDATE_WORDS") {
    return { ...state, words: action.payload };
  }
  if (action.type === "RESTART_GAME") {
    return {
      answer: "",
      isLoading: true,
      turn: 0,
      status: "playing",
      words: Array.from({ length: 6 }, () => new Array(5).fill("")),
    };
  }

  return state;
};

function App() {
  // );
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);
  const { answer, isLoading, turn, status, words } = state;

  useEffect(() => {
    api.word.random().then((answer) => {
      dispatch({ type: "SET_ANSWER", payload: answer });
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (status === "playing") {
        switch (event.key) {
          case "Enter": {
            if (words[turn].some((letter) => letter === "")) {
              return;
            }

            if (words[turn].join("") === answer) {
              dispatch({ type: "SET_STATUS", payload: "finished" });
            }

            dispatch({ type: "SET_TURN", payload: turn + 1 });

            return;
          }
          case "Backspace": {
            let firstEmptyIndex = words[turn].findIndex((letter) => letter === "");

            if (firstEmptyIndex === -1) {
              firstEmptyIndex = words[turn].length;
            }

            const _words = [...words];
            const _currentWord = [...words[turn]];

            _currentWord[firstEmptyIndex - 1] = "";

            _words[turn] = _currentWord;
            dispatch({ type: "UPDATE_WORDS", payload: _words });

            return;
          }
          default: {
            if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
              const firstEmptyIndex = words[turn].findIndex((letter) => letter === "");

              if (firstEmptyIndex === -1) return;

              words[turn][firstEmptyIndex] = event.key.toUpperCase();

              dispatch({ type: "UPDATE_WORDS", payload: words.slice() });

              return;
            }
          }
        }
      } else if (status === "finished" && event.key === "Enter") {
        dispatch({ type: "RESTART_GAME" });
      }
    },
    [status, turn, words, answer],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (isLoading) return "Cargando...";

  return (
    <main className="board">
      {words.map((word, wordIndex) => (
        <section className="word">
          {word.map((letter, letterIndex) => {
            const isCorrect = letter && wordIndex < turn && letter === answer[letterIndex];
            const isPresent =
              letter &&
              wordIndex < turn &&
              letter !== answer[letterIndex] &&
              answer.includes(letter);

            return (
              <article className={`letter ${isPresent && "present"} ${isCorrect && "correct"}`}>
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
