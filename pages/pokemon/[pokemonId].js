import Image from "next/image"
import Link from "next/link"

import styles from "../../styles/Pokemon.module.css"


import {useRouter} from 'next/router'

export const getStaticPaths = async() => {

    const maxPokemons = 251
    const api = 'https://pokeapi.co/api/v2/pokemon/'

    const res = await fetch(`${api}/?limit=${maxPokemons}`)
    const data = await res.json()

    // params
    const paths = data.results.map((pokemon, index) => {
        return {
            params: {pokemonId: (index+ 1).toString() },
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps = async (context) => {

    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    return {
        props: {pokemon: data},
    }
}

export default function Pokemon({ pokemon }) {
    const router = useRouter()

    if(router.isFallback) {
        return <div>Pesquisando Pokémon...</div>
    }


    const imageUrl = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif`

    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <Image 
                src={imageUrl} alt={pokemon.name} width={90} height={150}
            />
            <div>
                <h3>Número:</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>  
            <div className={styles.types_container}>
                {pokemon.types.map((item, index) => (
                    <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
                ))}
            </div>
        </div>
        <div className={styles.data_container}>
           <div className={styles.data_height}> 
            <h4>Altura:</h4>
            <p>{pokemon.height * 10} cm</p>
            </div> 
            <div className={styles.data_weight}>
            <h4>Peso:</h4>
            <p>{pokemon.weight / 10} kg</p>
            </div> 
        </div> 
        <div className={styles.buttons_container}>
        <Link href={`/pokemon/${Number(pokemon.id) - 1}`}>
            <button className={styles.buttonPoke}>Anterior</button>
        </Link>
        <Link href={`/pokemon/${Number(pokemon.id) + 1}`}>
            <button className={styles.buttonPoke}>Próximo</button>
        </Link>
        </div>             
        </div>
    )
}