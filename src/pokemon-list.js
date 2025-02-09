import { css, html, LitElement, nothing } from "lit";
import './pokemon-details';

// @customElement('simple-greeting')
class PokemonList extends LitElement {

    static properties = {
        data: { type: Array },
        selectedPokemon: { type: Object },
        showDetail: { type: Boolean }
    }

    constructor() {
        super();
        this.data = [];
        this.selectedPokemon = null;
        this.showDetail = false;
    }

    static styles = css`
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Tres columnas */
        gap: 16px;
        padding: 20px;
    }
      .card {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 12px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        font-family: Arial, sans-serif;
    }
    `
    _viewEvolutions(pokemon) {
        this.selectedPokemon = pokemon;
        this.showDetail = true;
    }

    _backToList() {
        this.selectedPokemon = null;
        this.showDetail = false;
    }

    _renderDetail() {
        if (this.showDetail) {
            return html`
            <pokemon-details .evolutions="${this.selectedPokemon.evolutions}" @back-to-list="${this._backToList}">
            </pokemon-details>
          `;
        }
    }

    render() {
        return html`
        ${!this.showDetail ? html`
            <div class="container">
            ${this.data.map(pokemon => html`
            <div class="card" @click="${() => this._viewEvolutions(pokemon)}">
            <img src="${pokemon.image}" alt="${pokemon.name}" />
            <span>${pokemon.type}</span>
            <p class="name">${pokemon.name}</p>
            </div>
            `)}
            </div>
            ` : this._renderDetail()}
        `
    }
}

customElements.define('pokemon-list', PokemonList);