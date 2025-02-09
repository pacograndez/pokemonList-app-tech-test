import { css, html, LitElement } from "lit";
import './pokemon-form';

class PokemonDetails extends LitElement {
  static properties = {
    evolutions: { type: Array },
    selectedEvolution: { type: Object },
    showForm: { type: Boolean }
  };

  static styles = css`
        .container {
          padding: 20px;
      }

      ul {
      display: grid;
      gap:16px;
      list-style: none;
      }

      .card-container {
        display: flex;
        gap: 16px;
      }
        .card.slot1 {
        width:80%;
        border-radius: 12px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        background: #f8f9fa;
        text-align: center;
        align-content: center;
      }

      .card.slot2 {
        width:20%;
        border-radius: 12px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        background: #f8f9fa;
        text-align: center;
        align-content: center;
      `


  constructor() {
    super();
    this.evolutions = [];
    this.selectedEvolution = null;
    this.showForm = false;
  }

  _backToList() {
    const event = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('back-to-list', event));
  }

  _editEvolution(evolution, index) {
    this.selectedEvolution = {
      evolution,
      id: index
    };
    this.showForm = true;
  }

  _onFormSubmitted(event) {
    this.evolutions = this.evolutions.find((e, index) => index !== event.detail.id) ||  [];
    this.evolutions.push(event.detail.evolution);
  }

  _renderForm() {
    return html`
        <pokemon-form .pokemon="${this.selectedEvolution}" @form-submitted="${this._onFormSubmitted}"></pokemon-form>
      `;
  }

  render() {
    return html `
    <div class="container">
            <button @click="${this._backToList}">Volver</button>
          <ul>
            ${this.evolutions.map(
      (evolution, index) => html`
                <li @click="${() => this._editEvolution(evolution, index)}">
                  <div class="card-container">
                  <div class="card slot1">
                  ${evolution.name}
                  </div>
                  <div class="card slot2">
                      <img src="${evolution.image}" alt="${evolution.name}" width="50" />
                  </div>
                  </div>
                </li>
              `
    )}
          </ul>
            </div>
            ${this.showForm ? this._renderForm() : ''}
    `
  }
}

customElements.define('pokemon-details', PokemonDetails);