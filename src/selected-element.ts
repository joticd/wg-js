import { selectedItems, tempSelectedItems } from "./stores/stores";

export default class SelectedElement extends HTMLElement {
    private name: string;
    private temp: boolean;
    private parentDiv: HTMLElement;
    private nameDiv: HTMLElement;
    private closeDiv: HTMLElement;
    private closeSpan: HTMLElement;

    constructor(name: string, temp:boolean) {
        super();
        this.attachShadow({mode: "open"});

        this.name = name;
        this.temp = temp;

        const style = document.createElement('style');
        style.textContent = `
        .flex {
            display: flex;
        }
        .justify-between {
            justify-content: space-between; 
        }

        .pointer {
            cursor: pointer;
        }

        .element-divider {
            border-left: 1px solid #fff;
            padding-left: 0.75rem;
        }

        .element {
            background-color: #000;
            padding: 0.5rem 0.75rem;
            line-height: 1;
            min-width: 8rem;
            color: #fff;
        }
    `;

        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("flex", "justify-between", "element");
        this.nameDiv = document.createElement("div");
        this.nameDiv.textContent = this.name;

        this.closeDiv = document.createElement("div");
        this.closeDiv.classList.add("element-divider");
        this.closeSpan = document.createElement("span");
        this.closeSpan.textContent = "X";
        this.closeSpan.classList.add("pointer");
        this.closeSpan.addEventListener("click", ()=> this.closeHandler());
        this.closeDiv.appendChild(this.closeSpan);
        this.parentDiv.append(this.nameDiv, this.closeDiv);

        this.shadowRoot!.append(style, this.parentDiv);
    }

    closeHandler () {
        if(this.temp){
            const items = tempSelectedItems.get();
            tempSelectedItems.set(items.filter(item => item !== this.name));
        } else {
            const items = selectedItems.get();
            selectedItems.set(items.filter(item => item !== this.name));
        }
    }
}

customElements.define("selected-element", SelectedElement);