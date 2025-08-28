import type {Pokemon} from "./types";

import {useEffect, useState} from "react";

import {POKEMONS} from "./constants";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      return new Set(JSON.parse(stored));
    }

    return new Set();
  });
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const filteredPokemons = POKEMONS.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleAddToCart(pokemon: Pokemon) {
    if (totalPrice + pokemon.price > 10) return alert("El carrito está lleno!");

    setCart((prev) => prev.concat(pokemon));
  }

  function toggleFavorite(pokemonId: number) {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);

      if (newFavorites.has(pokemonId)) {
        newFavorites.delete(pokemonId);
      } else {
        newFavorites.add(pokemonId);
      }

      return newFavorites;
    });
  }

  useEffect(() => {
    const delay = 500;
    const debounce = setTimeout(() => {
      setSearchTerm(inputValue);
    }, delay);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </nav>
      <section>
        {filteredPokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure onClick={() => toggleFavorite(+pokemon.id)}>
              <i
                className={`nes-icon is-medium heart ${
                  favorites.has(+pokemon.id) ? "" : "is-transparent"
                }`}
                role="button"
              />
              <img className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => handleAddToCart(pokemon)}>
              Agregar
            </button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">
          {cart.length} items (total ${totalPrice})
        </button>
      </aside>
    </>
  );
}

export default App;
