const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        width: 100vw;
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .row {
        display:flex;
        justify-content:center;
        flex-wrap: wrap;
        width:100%;
        margin-bottom:10px;
    }

    select {
        width:200px;
    }
    input {
        width:195px;
    }

    .cards {
        width: 100%;
        margin-top: 1rem;
        padding-bottom: 2rem;
    }

    .card_item {
        width:20%;
        min-width:300px;
        height:400px;
        margin-top: 2rem;
        margin-left: 2rem;
        margin-right: 2rem;
        padding:15px;
        border-radius: 5px;
        border: 2px solid red;
        display:flex;
        justify-content: center;
    }
</style>
<h1>Web Components : SWAPI</h1>

<div class="row">
    <select name="select_theme" class="select_theme">
    </select>
</div>
<div class="row">
    <input type='text' placeholder="search a theme...">

</div>
`

class SelectThemeApp extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$selectMenuTheme = this._shadowRoot.querySelector('select');

        fetch("https://swapi.dev/api/")
            .then(response => response.json())
            .then(response => this._renderThemeList(response))
            .catch(err => console.log(err.message));

        this.$themeInput = this._shadowRoot.querySelector('input');
        this.$selectMenuTheme.addEventListener('change', this._fetchData.bind(this));
        this.$themeInput.addEventListener('change', this._fetchDataSearch.bind(this));
    }

    _renderThemeList(themes) {
        themes = Object.keys(themes)
        this.$selectMenuTheme.innerHTML = '<option value="">Select a theme</option>';

        themes.forEach((theme, index) => {
            let $themeItem = document.createElement('option');
            $themeItem.value = theme;
            $themeItem.innerHTML = theme.charAt(0).toUpperCase() + theme.slice(1);
            $themeItem.setAttribute('index', index);
            this.$selectMenuTheme.appendChild($themeItem);
        })
    }

    _fetchData() {
        if (this.$selectMenuTheme.value != null) {
            let selectedTheme = this.$selectMenuTheme.value;
            fetch("https://swapi.dev/api/" + selectedTheme)
                .then(response => response.json())
                .then(response => this._renderThemeContent(response.results))
                .catch(err => console.log(err.message));
        }

    }



    _fetchDataSearch() {
        let selectedTheme = this.$selectMenuTheme.value;
        console.log(selectedTheme);
        // Add the task to the list
        this._todos.push({ text: this.$input.value, checked: false })
        this._renderThemeList();
    }

    _renderThemeContent(data) {
        console.log(data);
        let cardsContainer = document.createElement("div");
        cardsContainer.classList.add("row", "cards");
        data.forEach((element, index) => {
            let item = document.createElement("div");
            item.classList.add('card_item');
            item.innerHTML = "Name : " + element.name + "<br>";
            item.innerHTML += "Gender : " + element.gender + "<br>";
            item.innerHTML += "Height : " + element.height + " cm<br>";
            item.innerHTML += "Hair color : " + element.hair_color + "<br>";
            item.innerHTML += "Eye color : " + element.eye_color + "<br>";
            item.innerHTML += "Mass : " + element.mass + " Kg<br>";
            cardsContainer.appendChild(item);

        })
        this._shadowRoot.appendChild(cardsContainer)
    }
}

window.customElements.define('select-theme-app', SelectThemeApp);