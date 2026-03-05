// Exercise 1: Add a paragraph ("Hello DOM") when button is clicked.
const addParagraphButton = document.getElementById("addParagraphButton");
const paragraphContainer = document.getElementById("paragraphContainer");

addParagraphButton.addEventListener("click", function () {
    const p = document.createElement("p");
    p.textContent = "Hello DOM";
    paragraphContainer.appendChild(p);
});

// Exercise 2: Add list items with increasing number (Item 1, Item 2, ...).
const addItemButton = document.getElementById("addItemButton");
const simpleItemList = document.getElementById("simpleItemList");
let itemCount = 0;

addItemButton.addEventListener("click", function () {
    itemCount = itemCount + 1;
    const li = document.createElement("li");
    li.textContent = "Item " + itemCount;
    simpleItemList.appendChild(li);
});

// Exercise 3: Read input text, print it as <p>, then clear input.
const echoInput = document.getElementById("echoInput");
const echoAddButton = document.getElementById("echoAddButton");
const echoOutputContainer = document.getElementById("echoOutputContainer");

echoAddButton.addEventListener("click", function () {
    const text = echoInput.value.trim();
    if (text === "") return;

    const p = document.createElement("p");
    p.textContent = text;
    echoOutputContainer.appendChild(p);

    echoInput.value = "";
});

// Exercise 4: Mini todo Ignore empty input.
const miniTodoInput = document.getElementById("miniTodoInput");
const miniTodoAddButton = document.getElementById("miniTodoAddButton");
const miniTodoList = document.getElementById("miniTodoList");

miniTodoAddButton.addEventListener("click", function () {
    const job = miniTodoInput.value.trim();
    if (job === "") return;

    const li = document.createElement("li");
    li.textContent = job;
    miniTodoList.appendChild(li);

    miniTodoInput.value = "";
});

// Exercise 5: Toggle text color red/black when each <li> is clicked.
const colorToggleItems = document.querySelectorAll("#colorToggleList li");

for (let i = 0; i < colorToggleItems.length; i++) {
    colorToggleItems[i].addEventListener("click", function () {
        if (this.style.color === "red") {
            this.style.color = "black";
        } else {
            this.style.color = "red";
        }
    });
}

// Exercise 6: Add item with X button to remove that specific <li>.
const removableItemInput = document.getElementById("removableItemInput");
const removableItemAddButton = document.getElementById("removableItemAddButton");
const removableItemList = document.getElementById("removableItemList");

removableItemAddButton.addEventListener("click", function () {
    const text = removableItemInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = text;

    const btnX = document.createElement("button");
    btnX.textContent = "X";
    btnX.className = "btn-delete";
    btnX.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(btnX);
    removableItemList.appendChild(li);

    removableItemInput.value = "";
});

// Exercise 7: Todo status. Click text to strike through, click Delete to remove.
const statusTodoInput = document.getElementById("statusTodoInput");
const statusTodoAddButton = document.getElementById("statusTodoAddButton");
const statusTodoList = document.getElementById("statusTodoList");

statusTodoAddButton.addEventListener("click", function () {
    const text = statusTodoInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = text;
    span.style.cursor = "pointer";
    span.addEventListener("click", function () {
        span.classList.toggle("done-text");
    });

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.className = "btn-delete";
    btnDelete.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(btnDelete);
    statusTodoList.appendChild(li);

    statusTodoInput.value = "";
});

// Exercise 8: Single-select list. Only one item can be selected at a time.
const singleSelectItems = document.querySelectorAll("#singleSelectList li");

for (let j = 0; j < singleSelectItems.length; j++) {
    singleSelectItems[j].addEventListener("click", function () {
        for (let k = 0; k < singleSelectItems.length; k++) {
            singleSelectItems[k].classList.remove("selected");
        }
        this.classList.add("selected");
    });
}

// Exercise 9: Advanced todo with Done toggle, Delete, Search, and Done-only filter.
const advancedTodoInput = document.getElementById("advancedTodoInput");
const advancedTodoAddButton = document.getElementById("advancedTodoAddButton");
const advancedTodoSearchInput = document.getElementById("advancedTodoSearchInput");
const advancedTodoDoneOnlyCheckbox = document.getElementById("advancedTodoDoneOnlyCheckbox");
const advancedTodoList = document.getElementById("advancedTodoList");

function updateAdvancedTodoFilter() {
    const keyword = advancedTodoSearchInput.value.trim().toLowerCase();
    const onlyDone = advancedTodoDoneOnlyCheckbox.checked;
    const items = advancedTodoList.querySelectorAll("li");

    for (let i = 0; i < items.length; i++) {
        const li = items[i];
        const text = li.querySelector(".todo-text").textContent.toLowerCase();
        const isDone = li.dataset.done === "true";

        let show = true;

        if (keyword !== "" && text.indexOf(keyword) === -1) {
            show = false;
        }

        if (onlyDone && !isDone) {
            show = false;
        }

        li.style.display = show ? "flex" : "none";
    }
}

advancedTodoAddButton.addEventListener("click", function () {
    const job = advancedTodoInput.value.trim();
    if (job === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.done = "false";

    const span = document.createElement("span");
    span.textContent = job;
    span.className = "todo-text";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "btn-done";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-delete";

    doneBtn.addEventListener("click", function () {
        const currentDone = li.dataset.done === "true";

        if (currentDone) {
            li.dataset.done = "false";
            doneBtn.style.backgroundColor = "#facc15";
        } else {
            li.dataset.done = "true";
            doneBtn.style.backgroundColor = "#22c55e";
        }

        updateAdvancedTodoFilter();
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    advancedTodoList.appendChild(li);

    advancedTodoInput.value = "";
    updateAdvancedTodoFilter();
});

advancedTodoSearchInput.addEventListener("input", updateAdvancedTodoFilter);
advancedTodoDoneOnlyCheckbox.addEventListener("change", updateAdvancedTodoFilter);