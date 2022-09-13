class Todo { //* CLASS TODO
    constructor(content) {
        this.id = countTodo;
        this.content = content;
        this.isComplete = false;
    }
}

let countTodo = 1; //* todo count to set the id
let containerTodo = []; //* main container with all todos

const input = document.getElementById('create-todo');

input.addEventListener('keypress', function (e) { //* function when you write on the main input
    if(e.key === 'Enter') {
        createTodo(input.value);
    }
});

/** 
 * * create the object todo and insert it to the article
 * @param {text content}
 */
function createTodo(content) {
    const todo = new Todo(content);
    input.value = '';
    countTodo++;
    containerTodo.push(todo);
    addSection();
}

/**
 * * add all sections to the article filtered by the option
 * @param {option to filter the article} option 
 */
function addSection(option='all'){

    // * RESET THE ARTICLE AND SET THE FOOTER FIRST

    const article = document.getElementsByTagName('article')[0];
    article.innerHTML = 
    `   <div id="article-footer">
        <h4><span id="items-left"></span> items left</h4>
        <div class="main-footer">
            <span onclick="addSection()" class="active">All</span>
            <span onclick="addSection('active')">Active</span>
            <span onclick="addSection('completed')">Completed</span>
        </div>
        <h4 id="clear-completed" onclick="clearCompleted()">Clear Completed</h4>
    </div>`;

    //* SWITCH TO FILTER THE OPTION 
    //* ACTIVE -> LIST WITH TODO NOT COMPLETED
    //* COMPLETED -> LIST WITH TODO COMPLETED
    //* DEFAULT -> LIST WITH ALL TODO

    switch(option) {
        case 'active':
            {
                const arrSpan = document.getElementsByTagName('span');
                for (let span of arrSpan) {
                    if(span.textContent === 'Active') {
                        span.classList.toggle('active');
                    } else {
                        span.removeAttribute('class');
                    }
                }
    
                const arrayActiveTodo = containerTodo.filter((todo) => !todo.isComplete);
                for(let todo of arrayActiveTodo) {
                    document.getElementsByTagName('article')[0].innerHTML += 
                    `<section id="section-${todo.id}" draggable="true">
                        <h2 id="content-${todo.id}">${todo.content}</h2>
                        <img src="images/icon-check.svg" id="check-${todo.id}" class="not-completed" alt="check button">
                        <img src="images/icon-notchecked.svg" onclick="completeTodo(${todo.id})" id="not-check-${todo.id}" alt="icon-notchecked">
                        <img src="images/icon-edit.svg" onclick="editTodo(${todo.id})" alt="edit button">
                        <img src="images/icon-cross.svg" onclick="deleteTodo(${todo.id})" alt="X button">
                    </section>`;
                }
            }
            break;
        case 'completed':
            {
                const arrSpan = document.getElementsByTagName('span');
                for (let span of arrSpan) {
                    if(span.textContent === 'Completed') {
                        span.classList.toggle('active');
                    } else {
                        span.removeAttribute('class');
                    }
                }
                const arrayCompletedTodo = containerTodo.filter((todo) => todo.isComplete);
                for(let todo of arrayCompletedTodo) {
                    document.getElementsByTagName('article')[0].innerHTML += 
                    `<section id="section-${todo.id}" draggable="true">
                    <h2 id="content-${todo.id}" class="completed-text">${todo.content}</h2>
                    <img src="images/icon-check.svg" id="check-${todo.id}" alt="check button">
                    <img src="images/icon-notchecked.svg" onclick="completeTodo(${todo.id})" id="not-check-${todo.id}" alt="icon-notchecked">
                    <img src="images/icon-edit.svg" onclick="editTodo(${todo.id})" alt="edit button">
                    <img src="images/icon-cross.svg" onclick="deleteTodo(${todo.id})" alt="X button">
                    </section>`;
                }
            }
            break;                    
        default:
            for(let todo of containerTodo) {
                if(todo.isComplete){
                    document.getElementsByTagName('article')[0].innerHTML += 
                    `<section id="section-${todo.id}" draggable="true">
                    <h2 id="content-${todo.id}" class="completed-text">${todo.content}</h2>
                    <img src="images/icon-check.svg" id="check-${todo.id}" alt="check button">
                    <img src="images/icon-notchecked.svg" onclick="completeTodo(${todo.id})" id="not-check-${todo.id}" alt="icon-notchecked">
                    <img src="images/icon-edit.svg" onclick="editTodo(${todo.id})" alt="edit button">
                    <img src="images/icon-cross.svg" onclick="deleteTodo(${todo.id})" alt="X button">
                    </section>`;
                } else {
                    document.getElementsByTagName('article')[0].innerHTML += 
                    `<section id="section-${todo.id}" draggable="true">
                        <h2 id="content-${todo.id}">${todo.content}</h2>
                        <img src="images/icon-check.svg" id="check-${todo.id}" class="not-completed" alt="check button">
                        <img src="images/icon-notchecked.svg" onclick="completeTodo(${todo.id})" id="not-check-${todo.id}" alt="icon-notchecked">
                        <img src="images/icon-edit.svg" onclick="editTodo(${todo.id})" alt="edit button">
                        <img src="images/icon-cross.svg" onclick="deleteTodo(${todo.id})" alt="X button">
                    </section>`;
                }
            }
            break;
    }
    itemsLeft();
}

/**
 * * function called when you click on check image, if its checked => uncheck, if its not checked => check and update the values
 * @param {id to set if its complete} id 
 */
function completeTodo(id) {
    for(let todo of containerTodo) {
        if(todo.id === id) {
            todo.isComplete = !todo.isComplete;
            break;
        }
    }
    addSection();
}

/**
 * * function called when you click on edit button, pop up the input and when you click on enter => update the text content
 * @param {id to edit content} id 
 */
function editTodo(id) {
    for(let todo of containerTodo) {
        if(todo.id === id) {
            document.getElementById('pop-up-edit').classList.add('pop-up-edit');
            const textAreaInput = document.getElementById('new-content');
            textAreaInput.addEventListener('keypress', function (e) {
            if(e.key === 'Esc') {
                document.getElementById('pop-up-edit').classList.remove('pop-up-edit');
            } else if (e.key === 'Enter') {
                todo.content = textAreaInput.value;
                document.getElementById('pop-up-edit').classList.remove('pop-up-edit');
                addSection();
            }
        });
        break;
        }
    }
}

/**
 * * function called when you click on cross button, deletes the content selected
 * @param {id to delete todo} id 
 */
function deleteTodo(id) {
    for(let todo of containerTodo) {
        if(todo.id === id) {
            containerTodo.splice(containerTodo.indexOf(todo),1);
        }
    }
    addSection();
}

/**
 * * function called to count the numbers of active todos
 */
function itemsLeft() {
    let count = 0;
    for(const todo of containerTodo) {
        if(!todo.isComplete) {
            count++;
        }
    }
    if(count) {
        document.getElementById('items-left').innerText = count.toString();
    } else {
        document.getElementById('items-left').innerText = '0';
    }
}

/**
 * * delete all completed todos
 */
function clearCompleted() {
    const newArray = containerTodo.filter((todo) => !todo.isComplete);
    containerTodo = newArray;
    addSection();
} 