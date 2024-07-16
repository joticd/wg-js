import DialogElement from "./dialog-element";
import  SelectedElement from "./selected-element";
import { selectedItems, tempSelectedItems } from "./stores/stores";


const allElements: string[] = Array.from({ length: 300 }, (_, i) => `Element ${i + 1}`);

const dialogComponentList = document.querySelector("#dialogComponentList") as HTMLElement;
const elementSearch = document.querySelector("#elementSearch") as HTMLInputElement;
const selectFilter = document.querySelector("#selectFilter") as HTMLSelectElement;
const elementsSelected = document.querySelector("#elementsSelected") as HTMLElement;
const elementsTempSelected = document.querySelector("#elementsTempSelected") as HTMLElement;
const btnSave = document.querySelector("#btnSave") as HTMLElement;
const btnCancel = document.querySelector("#btnCancel") as HTMLElement;
const dialogAccordian = document.querySelector("#dialogAccordian") as HTMLElement;
const btnAccordian = document.querySelector("#btnAccordian") as HTMLElement;


elementSearch.addEventListener("input", filterElements);
selectFilter.addEventListener("change", filterElements);

filterElements();

tempSelectedItems.subscribe(showTempSelection);
selectedItems.subscribe(showSelection);

btnSave.addEventListener("click", () => {
  const items = tempSelectedItems.get();
  selectedItems.set([...items]);
  changeClasses(dialogAccordian, "grid-row-1", "grid-row-0", false);
});

btnCancel.addEventListener("click", () => {
  changeClasses(dialogAccordian, "grid-row-1", "grid-row-0", false);
});

btnAccordian.addEventListener("click", () => {
  changeClasses(dialogAccordian, "grid-row-1", "grid-row-0");
});


function filterElements () {
  const searchValue = elementSearch.value.toLowerCase();
  const filterValue = parseInt(selectFilter.value, 10);
  const filtered = allElements.filter(element => {
    const optionNumber = parseInt(element.split(" ")[1], 10);
    return element.toLowerCase().includes(searchValue) && optionNumber > filterValue;
  });
  updateDialogList(filtered);
}

function updateDialogList (elements: string[]) {
  dialogComponentList.innerHTML = "";
  for(let i = 0; i < elements.length; i++) {
    const newElement = new DialogElement(elements[i]);
    dialogComponentList.appendChild(newElement);
  }
}

function showTempSelection () {
  const tempItems = tempSelectedItems.get();
  elementsTempSelected.innerHTML = "";  
  for(let i = 0; i < tempItems.length; i++) {
    const newElement = new SelectedElement(tempItems[i], true);
    elementsTempSelected.appendChild(newElement);
  }
  checkbox(tempItems);
}

function showSelection () {
  const items = selectedItems.get();
  elementsSelected.innerHTML = "";  
  for(let i = 0; i < items.length; i++) {
    const newElement = new SelectedElement(items[i], false);
    elementsSelected.appendChild(newElement);
  }
  tempSelectedItems.set(items);
}

function checkbox (tempItems: string[]) {
  const elements = document.querySelectorAll("dialog-element");
  for(const element of elements) {
    const item = element as DialogElement;
    if(tempItems.length === 3 && !tempItems.includes(item.getName)) {
      item.getCheckbox.disabled = true;
    }
    if(tempItems.length < 3 ) {
      item.getCheckbox.disabled = false;
    }
    if(!tempItems.includes(item.getName)) {
      item.getCheckbox.checked = false;
    }
  }
}

function changeClasses (element: HTMLElement, clssOpen: string, clssClose: string, shouldOpen = true) {
  const addClass = shouldOpen ? clssOpen : clssClose;
  const removeClass = shouldOpen ? clssClose : clssOpen;
  if(element.classList.contains(removeClass) ) {
    element.classList.remove(removeClass);
  } 
  if(!element.classList.contains(addClass)){
    element.classList.add(addClass);
  }
}



