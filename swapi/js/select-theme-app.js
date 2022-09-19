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
</style>
<h1>Web Components : SWAPI</h1>

<div class="row">
    <select name="select_theme" class="select_theme">
    </select>
</div>
<div className="row">
    <input type='text' placeholder="search a theme...">

</div>
`

class SelectThemeApp extends HTMLElement
{
    constructor()
    {
        super();
        this._shadowRoot = this.attachShadow({mode : "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$themeSelect = this._shadowRoot.querySelector('select');

        fetch("https://swapi.dev/api/")
        .then(response => response.json())
        .then(response => this._renderThemeList(response))
        .catch( err => console.log(err.message));

        this._themes = ["nature", "espace", "city", "Italy","Morrocco","France", "Singapore"]
        this.$themeInput = this._shadowRoot.querySelector('input');
        this.$themeSelect.addEventListener('change', this._fetchData.bind(this));
        this.$themeInput.addEventListener('change', this._fetchDataSearch.bind(this));
    }

    _renderThemeList(themes) {
        themes = Object.keys(themes)
        this.$themeSelect.innerHTML = '<option value="">Select a theme</option>';

        themes.forEach((theme,index) => {
            let $themeItem = document.createElement('option');
            $themeItem.value = theme;
            $themeItem.innerHTML = theme.charAt(0).toUpperCase() + theme.slice(1);
            $themeItem.setAttribute('index', index);
            this.$themeSelect.appendChild($themeItem);
        })
    }

    _fetchData()
    {
        if (this.$themeSelect.value != null) {
        let selectedTheme = this.$themeSelect.value;
        console.log(selectedTheme);
        }

    }

    

    _fetchDataSearch()
    {
        let selectedTheme = this.$themeSelect.value;
        console.log(selectedTheme);
        // Add the task to the list
        this._todos.push({ text: this.$input.value, checked: false })
        this._renderThemeList();
    }

    _showContent()
    {
        return ;
    }
}

window.customElements.define('select-theme-app', SelectThemeApp);