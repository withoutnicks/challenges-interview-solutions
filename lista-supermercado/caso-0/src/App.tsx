import type { Item } from "./types";

import { useEffect, useRef, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.list().then(setItems);
    inputRef.current?.focus();
  }, []);

  function handleRemoveItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input ref={inputRef} name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text}
            <button onClick={() => handleRemoveItem(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
