import { css, html, LitElement } from "lit";
import './pokemon-list';
import { AppService } from './services/app-service.js';

class PokemonApp extends LitElement {

    static properties = {
        data: { type: Array }
    }

    static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 40px 0;
    }
    .container {
      width: 600px;
      border: 1px solid lightgray;
    }
    .logo {
        img {
        width: 100%
        }
    }
  `;

    constructor() {
        super();
        this.data = []
    }

    async firstUpdated() {
        try {
            this.data = await AppService.getPokemonAndUpdateAvatar();
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return html`
        <main>
            <div class="container">
                <div class="logo">
                    <img alt="pokedex banner" src="./assets/banner.png"/>
                </div>
                <pokemon-list .data=${this.data}></pokemon-list>
            </div">
        </main>
        `;
    }

}

customElements.define('pokemon-app', PokemonApp);