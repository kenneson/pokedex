import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Card from '../components/Card'

export async function getStaticProps() {

    const maxPokemons = 256
    const api = 'https://pokeapi.co/api/v2/pokemon/'

    const res = await fetch(`${api}/?limit=${maxPokemons}`)
    const data = await res.json()

    // add pokemon index
    const pokemons = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
      }));

    return {
        props: {
            pokemons,
        },
    }

}

export default function Home( {pokemons} ) {

    const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

    return (<>
     <SpeedInsights />
    <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>Next</span></h1>
        <Image src="/images/pokeball.png"
        width="50" 
        height="50" 
        alt="Pokenext" 
        />
    </div>
    <div className={styles.search_container}>
        <input
        className={styles.search_input}
          type="text"
          placeholder=" Pesquise seu Pokémon"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    <div className={styles.pokemon_container}> 
       {filteredPokemons.map((pokemon) => (
        <Card key={pokemon.id}pokemon={pokemon} />
       ))} 
    </div>
    </>      
    )
}