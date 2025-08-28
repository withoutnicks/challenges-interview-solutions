import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleAdd(event: React.FormEvent<Form>) {
    event.preventDefault();
    const _form = new FormData(event.currentTarget);

    const dataForm = {
      id: +new Date(),
      text: _form.get("text") as string,
      completed: false,
    };

    setItems((prev) => prev.concat(dataForm));
    event.currentTarget.reset();
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => setLoading((prev) => !prev));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" />
        <button>Add</button>
      </form>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {items?.map((item) => (
            <li
              key={item.id}
              className={item.completed ? styles.completed : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.text}{" "}
              <button onClick={() => handleRemove(item.id)}>[X]</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
