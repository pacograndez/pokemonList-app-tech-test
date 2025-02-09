import { css, html, LitElement } from "lit";

class PokemonForm extends LitElement {

  static properties = {
    pokemon: { type: Object },
  };

  static styles = css`
        .container {
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          gap: 16px;
          padding: 20px;
          width: 300px;
          margin: auto;
      }
      `

  constructor() {
    super();
    this.pokemon = {};
  }

  handleInputChange(event) {
    const field = event.target.name;
    this.pokemon.evolution = { ...this.pokemon.evolution, [field]: event.target.value };
  }

  // Maneja el cambio del checkbox
  handleRepeatChange(event) {
    this.showAlert = event.target.checked;
  }

  // Maneja el evento de guardar
  handleSave(event) {
    event.preventDefault();
    if (this.showAlert) {
      // Si el checkbox está marcado, muestra una alerta
      alert('Este Pokémon está repetido. No se guardaron los cambios.');
    } else {
      // Si el checkbox no está marcado, se "guardan" los cambios
      alert(`Cambios guardados: ${this.pokemon.evolution.name} - ${this.pokemon.evolution.type}`);
      // Aquí podrías agregar lógica para actualizar el Pokémon en tu aplicación
      this.onSubmitted();
    }
  }

  onSubmitted() {
    const event = {
      detail: this.pokemon,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('form-submitted', event));
  }

  render() {
    return html`
    <form @submit="${this.handleSave}">
          <div class="container">
          <label class="input-field">
            Nombre:
            <input
              type="text"
              name="name"
              .value="${this.pokemon.evolution.name}"
              @input="${this.handleInputChange}"
            />
          </label>
          <label class="input-field">
            Tipo:
            <input
              type="text"
              name="type"
              .value="${this.pokemon.evolution.type}"
              @input="${this.handleInputChange}"
            />
          </label>

          <label class="input-field">
            ¿Pokémon repetido?:
            <input type="checkbox" @change="${this.handleRepeatChange}" />
          </label>

          <!-- Botón guardar -->
          <button type="submit">Guardar</button>
          </div>
        </form>
    `
  }
}

customElements.define('pokemon-form', PokemonForm);