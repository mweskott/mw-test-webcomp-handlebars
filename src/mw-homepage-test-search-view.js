

export class HomepageTestSearchView extends HTMLElement {
    template = require("./mw-homepage-test-search-view.html");
    model = {
        controller: "",
        queryText: "",
        suggestions: [],
        results: []
    };

    constructor() {
        super();
    }

    connectedCallback() {
        this.id = "mw-homepage-test-search-view_" + Math.floor(Math.random() * 100000000);
        this.model.controller = `getElementById('${this.id}')`;
        this.update();
        this.addEventListener("click", (event) => {
            console.log("click received", event.target);
        })
    }

    update() {
        const html = this.template(this.model);
        this.innerHTML = html;
    }

    onFetchResults() {
        this.collectFormData();
        fetch(`/assets/results.json?query=${this.model.queryText}`).then(response => {
            response.json().then(result => {
                this.model.results = result.docs;
                this.update();    
            });
        });
    }

    onFetchSuggestions() {
        this.collectFormData();
        fetch(`/assets/suggestions.json?query=${this.model.queryText}`).then(response => {
            response.json().then(result => {
                this.model.suggestions = result.suggestions;
                this.update();    
            });
        });
    }

    onClear() {
        this.collectFormData();
        this.model.suggestions = [];
        this.model.results = [];
        this.update();
    }

    collectFormData() {
        this.model.queryText = this.querySelector("#mw-homepage-test-search-view_form").elements["queryText"].value;
    }

}

window.customElements.define('mw-homepage-test-search-view', HomepageTestSearchView);
