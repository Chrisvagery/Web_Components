class ContactForm extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
}

form{
    width: 600px;
    /* text-align: center; */
    margin: auto;
    background-color: #04AA6D;
    padding: 15px;

}

input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  textarea {
    width: 100%;
    height: 300px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
  }
  h1{
    text-align: center;
  }
   .botao {
          display: flex;
          justify-content: flex-end; 
        }
 
  button {
    background-color: #015E3C;
    border: none;
    color: #f8f8f8;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
    margin: auto;
  

  }
      </style>
      <form id="contactForm">
        <h1>Contato</h1>
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Mensagem:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <div class="botao">
          <button type="submit">Enviar</button> <!-- Botão no lado direito -->
        </div>

      </form>
    `;

    this.form = shadow.getElementById("contactForm");
    this.form.addEventListener("submit", this._handleSubmit.bind(this));

    this._loadFormData();
  }

  _handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    console.log("Formulário enviado:", data);

    localStorage.setItem("contactFormData", JSON.stringify(data));

    alert("Formulário enviado com sucesso!");
    this.form.reset();
    localStorage.removeItem("contactFormData");
  }

  _loadFormData() {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      for (const [key, value] of Object.entries(formData)) {
        const input = this.form.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = value;
        }
      }
    }
  }
}

customElements.define("contact-form", ContactForm);
