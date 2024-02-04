

export class HomepageTestSearchPage extends HTMLElement {
    template = require("./homepage-test-search-page.html");
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
        this.id = "HomepageTestSearchPage_" + Math.floor(Math.random() * 100000000);
        this.model.controller = `getElementById('${this.id}')`;

        this.collectUrlParams();

        this.update();
    }

    update() {
        const html = this.template(this.model);
        this.innerHTML = html;
    }

    onFetchResults() {
        this.collectFormData();

        const url = new URL(location);
        url.searchParams.set("queryText", this.model.queryText);
        history.pushState({}, "", url);

        fetch(`/assets/results.json?query=${this.model.queryText}`).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    this.model.results = result.docs;
                    this.update();    
                })
            } else {
                console.log(response);
            }
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

    collectUrlParams() {
        const url = new URL(location);
        for (const [key, value] of url.searchParams.entries()) {
            this.model[key] = value;
        }
    }

    collectFormData() {
        const formData = new FormData(this.querySelector("#queryForm"));
        for(const [key, value] of formData.entries()) {
            this.model[key] = value;
        }
    }

}

window.customElements.define('homepage-test-search-page', HomepageTestSearchPage);
