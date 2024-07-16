import { tempSelectedItems } from "./stores/stores";

export default class DialogElement extends HTMLElement {
    private name: string;
    private parentDiv: HTMLElement;
    private checkBox: HTMLInputElement;
    private label: HTMLElement;

    constructor(name: string) {
        super();
        this.attachShadow({mode: "open"});

        this.name = name;

        const style = document.createElement('style');
        style.textContent = `
        .dialogComponent-element {
        margin: 0.5rem;
        }
    `;

        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("dialogComponent-element");
        this.checkBox = document.createElement("input");
        this.checkBox.type = "checkbox";
        this.checkBox.addEventListener("change", () => this.checkBoxHandler());
        this.label = document.createElement("label");
        this.label.textContent = this.name;

        this.parentDiv.append(this.checkBox, this.label);
        this.shadowRoot!.append(style, this.parentDiv);
    }

    get getName () {
        return this.name;
    };

    get getCheckbox () {
        return this.checkBox;
    };

    checkBoxHandler () {
        const items = tempSelectedItems.get();
        if(this.checkBox.checked) {
            tempSelectedItems.set([...items, this.name]);
        } else {
            tempSelectedItems.set(items.filter(item => item !== this.name));
        }        
    };
};

customElements.define("dialog-element", DialogElement);