import {useEffect, useState} from "react";

import api from "./api";
import {Pokemon} from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Pokemon[]>([]);

  useEffect(() => {
    api
      .list()
      .then(setPokemons)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="nes-container is-centered">
        <p>Cargando...</p>
      </div>
    );
  }

  function handleAddToCart(pokemon: Pokemon) {
    setCart((prev) => {
      if (prev.length >= 3) return prev;

      return prev.concat(pokemon);
    });
  }

  return (
    <>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <img className="nes-container" src={pokemon.image} />
            <div>
              <p className="card-title">
                {pokemon.name}
                <span className="nes-text is-primary">${pokemon.price}</span>
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => handleAddToCart(pokemon)}>
              Agregar
            </button>
          </article>
        ))}
      </section>
      {cart.length > 0 && (
        <aside>
          <button className="nes-btn is-primary">{cart.length} items</button>
        </aside>
      )}
    </>
  );
}

export default App;
