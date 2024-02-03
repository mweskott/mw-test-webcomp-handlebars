import $ from 'jquery';
import htmlContent from "./app.html";
import handlebars from "handlebars";

export class MyMain extends HTMLElement {
    template = handlebars.compile(htmlContent);
    data = {
        queryText: "",
        suggestions: [],
        results: []
    };

    constructor() {
        super();

    }

    connectedCallback() {
        this.update();
    }

    update() {
        const html = this.template(this.data);
        this.innerHTML = html;
    }

    onFetchResults() {
        this.collectFormData();
        $.get(`/assets/data.json?query=${this.data.queryText}`).then(response => {
            this.data.results = response.docs;
            this.update();
        });
    }

    onFetchSuggestions() {
        this.collectFormData();
        $.get(`/assets/data.json?sugegest=${this.data.queryText}`).then(response => {
            this.data.suggestions = response.docs;
            this.update();
        });
    }

    onClear() {
        this.collectFormData();
        this.data.suggestions = [];
        this.data.results = [];
        this.update();
    }

    collectFormData() {
        this.data.queryText = this.querySelector('#inputTextQuery').value;
    }

}

export function myFunction() {
    console.log("myFunction() called");
}

window.customElements.define('my-main', MyMain);
