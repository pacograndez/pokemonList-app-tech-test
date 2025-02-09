export class AppService {

    static async getPokemonList() {
        try {
            const response = await fetch('./assets/mock.json');
            const data = await response.json();
            return data.pokemon;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw error;
        }
    }

    static async getPokemonAvatar(name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
            const data = await response.json();
            return data['sprites']['front_default'];
        } catch (error) {
            
        }
    }

    static async getPokemonAndUpdateAvatar() {
        try {
            const pokemons = await fetch('./assets/mock.json');
            const data = await pokemons.json();
            const pokemonList = data.pokemon;

            const pokemonUpdateAvatar = await Promise.all(pokemonList.map(async (pokemon) => {
                const avatar = await this.getPokemonAvatar(pokemon.name);

                const evolutionsUpdateAvatar = await Promise.all(pokemon.evolutions.map(async (evolution) => {
                    const evolutionAvatar = await this.getPokemonAvatar(evolution.name);

                    return {
                        name: evolution.name,
                        type: evolution.type,
                        image: evolutionAvatar
                    };
                }))

                return {
                    name: pokemon.name,
                    type: pokemon.type,
                    image: avatar,
                    evolutions: evolutionsUpdateAvatar
                };
            }))

            return pokemonUpdateAvatar;
        } catch (error) {
            
        }
    }
}