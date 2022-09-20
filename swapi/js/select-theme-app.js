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
        margin-top: 2rem;
        margin-left: 2rem;
        margin-right: 2rem;
        padding:15px;
        border-radius: 5px;
        border: 2px solid rgb(79 70 229);
        font-family: "Helvetica Neue",Helvetica,sans-serif;
        font-weight: 500;
        display:flex;
        justify-content: center;
    }
</style>
<h1>Web Components : SWAPI</h1>

<div class="row">
    <select name="select_theme" class="select_theme">
    </select>
</div>

<div class="row cards">

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
            this.selectedTheme = this.$selectMenuTheme.value;
            fetch("https://swapi.dev/api/" + this.selectedTheme)
                .then(response => response.json())
                .then(response => this._renderThemeContent(response.results))
                .catch(err => console.log(err.message));
        }

    }

    _fetchDataSearch() {
        this.selectedTheme = this.$selectMenuTheme.value;
        console.log(this.selectedTheme);

    }

    _renderThemeContent(data) {
        console.log(data);
        let cardsContainer = this._shadowRoot.querySelector('.cards');
        if (this.selectedTheme == "people") {
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Name : " + element.name + "<br><br>";
                item.innerHTML += "Gender : " + element.gender + "<br><br>";
                item.innerHTML += "Height : " + element.height + " cm<br><br>";
                item.innerHTML += "Hair color : " + element.hair_color + "<br><br>";
                item.innerHTML += "Eye color : " + element.eye_color + "<br><br>";
                item.innerHTML += "Mass : " + element.mass + " Kg<br><br>";
                cardsContainer.appendChild(item);

            })
        } else if(this.selectedTheme == "planets"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Planet Name : " + element.name + "<br><br>";
                item.innerHTML += "Rotation Period : " + element.rotation_period + " Hours<br><br>";
                item.innerHTML += "Orbital Period : " + element.orbital_period + " Km/h<br><br>";
                item.innerHTML += "Diameter : " + element.diameter + " Km<br><br>";
                item.innerHTML += "Climate : " + element.climate + "<br><br>";
                item.innerHTML += "Gravity : " + element.gravity + " Kg<br><br>";
                item.innerHTML += "Terrain : " + element.terrain + " Kg<br><br>";
                item.innerHTML += "Population : " + element.population + " Habitants<br><br>";
                cardsContainer.appendChild(item);
            })
        } else if(this.selectedTheme == "planets"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Name : " + element.name + "<br><br>";
                item.innerHTML += "Gender : " + element.gender + "<br><br>";
                item.innerHTML += "Height : " + element.height + " cm<br><br>";
                item.innerHTML += "Hair color : " + element.hair_color + "<br><br>";
                item.innerHTML += "Eye color : " + element.eye_color + "<br><br>";
                item.innerHTML += "Mass : " + element.mass + " Kg<br><br>";
                cardsContainer.appendChild(item);
            })
        } else if(this.selectedTheme == "films"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Title : " + element.title + "<br><br>";
                item.innerHTML += "Opening crawl : " + element.opening_crawl + "<br><br>";
                item.innerHTML += "Director : " + element.director + "<br><br>";
                item.innerHTML += "Producer : " + element.producer + "<br><br>";
                item.innerHTML += "Release date : " + element.release_date + "<br><br>";
                cardsContainer.appendChild(item);
            })
        } else if(this.selectedTheme == "species"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Name : " + element.name + "<br><br>";
                item.innerHTML += "Classification : " + element.classification + "<br><br>";
                item.innerHTML += "Designation : " + element.designation + " cm<br><br>";
                item.innerHTML += "Hair colors : " + element.hair_colors + "<br><br>";
                item.innerHTML += "Eyes colors : " + element.eye_colors + "<br><br>";
                item.innerHTML += "Average lifespan : " + element.average_lifespan + " Years<br><br>";
                item.innerHTML += "Language : " + element.language + "<br><br>";
                cardsContainer.appendChild(item);
            })
        } else if(this.selectedTheme == "vehicles"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Name : " + element.name + "<br><br>";
                item.innerHTML += "Model : " + element.model + "<br><br>";
                item.innerHTML += "Manufacturer : " + element.manufacturer + " cm<br><br>";
                item.innerHTML += "Cost in credits : " + element.cost_in_credits + " €<br><br>";
                item.innerHTML += "Length : " + element.length + " cm<br><br>";
                item.innerHTML += "Crew : " + element.crew + "<br><br>";
                item.innerHTML += "Passengers : " + element.passengers + "<br><br>";
                item.innerHTML += "Vehicle class : " + element.vehicle_class + "<br><br>";
                cardsContainer.appendChild(item);
            })
        } else if(this.selectedTheme == "starships"){
            cardsContainer.innerHTML = "";
            data.forEach((element, index) => {
                let item = document.createElement("div");
                item.classList.add('card_item');
                item.innerHTML = "Name : " + element.name + "<br><br>";
                item.innerHTML += "Model : " + element.model + "<br><br>";
                item.innerHTML += "Manufacturer : " + element.manufacturer + " cm<br><br>";
                item.innerHTML += "Cost in credits : " + element.cost_in_credits + " €<br><br>";
                item.innerHTML += "Length : " + element.length + " cm<br><br>";
                item.innerHTML += "Maximum atmosphering speed : " + element.max_atmosphering_speed + "<br><br>";
                item.innerHTML += "Crew : " + element.crew + "<br><br>";
                item.innerHTML += "Passengers : " + element.passengers + "<br><br>";
                item.innerHTML += "Cargo capacity : " + element.cargo_capacity + " People<br><br>";
                item.innerHTML += "Consumables : " + element.consumables + "<br><br>";
                item.innerHTML += "Hyperdrive rating : " + element.hyperdrive_rating + "<br><br>";
                item.innerHTML += "MGLT : " + element.MGLT + "<br><br>";
                item.innerHTML += "Starship class : " + element.starship_class + "<br><br>";
                cardsContainer.appendChild(item);
            })
        } else {
            let item = document.createElement("div");
            item.innerHTML = "<h3>No records found</h3>";
            cardsContainer.appendChild(item);
        }
        this._shadowRoot.appendChild(cardsContainer)
    }
}

window.customElements.define('select-theme-app', SelectThemeApp);