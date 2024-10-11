import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [listaPersonagens, setListPersonagens] = useState();
  const [personagemPesquisa, setPersonagemPesquisa] = useState("");

  async function carregarPaginas() {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    setListPersonagens(data.results);
  }
  useEffect(() => {
    carregarPaginas();
  }, []);

  async function filtrarPersonagem() {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${personagemPesquisa}`
    );
    setListPersonagens(data.results);
  }
  useEffect(()=>{
    filtrarPersonagem()
  }, [personagemPesquisa])

  return (
    <>
      <h1>Projeto Rick and Morty</h1>

      <input
        type="text"
        id="pesquisa"
        name="pesquisa"
        placeholder="Digite um personagem"
        className="pesquisa"
        onChange={(e) => setPersonagemPesquisa(e.target.value)}
      />

      <section className="container">
        {listaPersonagens &&
          listaPersonagens.map((element) => (
            <div className="card" key={element.id}>
              <img
                className="foto"
                src={element.image}
                alt="foto do personagem"
              />
              <h2>Nome: {element.name}</h2>
              <p>Espécie:{element.species}</p>
              <p>Status: {element.status}</p>
              <p>Localizaçao: {element.location.name}</p>
            </div>
          ))}
      </section>
    </>
  );
}

export default App;
