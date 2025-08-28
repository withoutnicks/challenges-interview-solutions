import type {Pokemon} from "./types";

import {useEffect, useState} from "react";

import {POKEMONS} from "./constants";

function App() {
  const [cart, setCart] = useState<Map<string, number>>(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? new Map(JSON.parse(storedCart)) : new Map();
  });

  const handleRemove = (pk: Pokemon) => {
    setCart((prev) => {
      const _cart = new Map(prev);
      const currentQty = _cart.get(pk.id);

      if (!currentQty) return _cart;
      if (currentQty > 1) {
        _cart.set(pk.id, currentQty - 1);
      } else {
        _cart.delete(pk.id);
      }

      return _cart;
    });
  };

  const handleAdd = (pk: Pokemon) => {
    setCart((prev) => {
      const _cart = new Map(prev);
      const currentQty = _cart.get(pk.id) ?? 0;

      _cart.set(pk.id, currentQty + 1);

      return _cart;
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  }, [cart]);

  return (
    <>
      <nav>
        <input className="nes-input" id="name_field" placeholder="Charmander" type="text" />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => {
          const quantity = cart.get(pokemon.id) ?? 0;

          return (
            <article key={pokemon.id}>
              <img className="nes-container" src={pokemon.image} />
              <div>
                <p>{pokemon.name}</p>
                <p>{pokemon.description}</p>
              </div>
              {quantity > 0 ? (
                <footer>
                  <button className="nes-btn is-error" onClick={() => handleRemove(pokemon)}>
                    -
                  </button>
                  <p>{quantity}</p>
                  <button className="nes-btn is-success" onClick={() => handleAdd(pokemon)}>
                    +
                  </button>
                </footer>
              ) : (
                <button className="nes-btn" onClick={() => handleAdd(pokemon)}>
                  Agregar
                </button>
              )}
            </article>
          );
        })}
      </section>
      <aside>
        <button className="nes-btn is-primary">{cart.size} items (total $0)</button>
      </aside>
    </>
  );
}

export default App;
