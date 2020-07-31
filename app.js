// selectors
const todoInput=document.querySelector('.todo-input');
const todoList=document.querySelector('.todo-list');
const todoAddBtn=document.querySelector('.todo-add-btn');
const filterOption=document.querySelector('.todo-filter');

// event listeners
document.addEventListener('DOMContentLoaded',getTodos);
document.addEventListener('DOMContentLoaded',random_bg_color);
todoAddBtn.addEventListener('click',addTodoTask);
todoList.addEventListener('click',deleteCompleteTask);
filterOption.addEventListener('click',filterTodo);

// functions
function addTodoTask(event){
//  prevent page reloading
    event.preventDefault();
    
    if (todoInput.value.trim().length==0){
        console.log("empty todo");
        return;
    }

    console.log(todoInput.value);

    // creating todo div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add('todo-div');

    // creating completed button
    const completedBtn=document.createElement('button');
    completedBtn.innerHTML='<i class="fa fa-check" ></i>';
    completedBtn.classList.add('completed-btn');

    todoDiv.appendChild(completedBtn);


    // creating todo li
    const todoTask=document.createElement('li');
    todoTask.innerText=todoInput.value.trim();
    todoTask.classList.add('todo-task');

    todoDiv.appendChild(todoTask);

    


    // creating completed button
    const trashBtn=document.createElement('button');
    trashBtn.innerHTML='<i class="fa fa-trash" ></i>';
    trashBtn.classList.add('trash-btn');
 
    todoDiv.appendChild(trashBtn);

    // append todo task in the todo list
    todoList.appendChild(todoDiv);

    // save todo in local storage
    saveTodosLocally(todoInput.value.trim());  

    // clearing todo input
    todoInput.value="";
     
 

}



function deleteCompleteTask(event){
    const item=event.target;
    const todo=item.parentElement;
    if(item.classList[0]==="completed-btn"){  //complete todo
        console.log("completed-btn");
        todo.classList.toggle('completed');
        todoFiltering(filterOption.value);

  
    }else if(item.classList[0]==="trash-btn") { 
        removeTodoFromLocal(todo);
        todo.remove();

    }
}

function saveTodosLocally(todo){
    var todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    console.log("TODOS IN LOCAL STORAGE::",todos);
    localStorage.setItem('todos',JSON.stringify(todos));

}

function getTodos(){
    var todos;
    console.log(localStorage.getItem('todos'));
    if(localStorage.getItem('todos')===null){

        todos=[];
    }else{
        console.log(localStorage.getItem('todos'));
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
            // creating todo div
        const todoDiv= document.createElement('div');
        todoDiv.classList.add('todo-div');

        // creating completed button
        const completedBtn=document.createElement('button');
        completedBtn.innerHTML='<i class="fa fa-check" ></i>';
        completedBtn.classList.add('completed-btn');

        todoDiv.appendChild(completedBtn);

        // creating todo li
        const todoTask=document.createElement('li');
        todoTask.innerText=todo;
        todoTask.classList.add('todo-task');

        todoDiv.appendChild(todoTask);

        // creating completed button
        const trashBtn=document.createElement('button');
        trashBtn.innerHTML='<i class="fa fa-trash" ></i>';
        trashBtn.classList.add('trash-btn');
    
        todoDiv.appendChild(trashBtn);

        // append todo task in the todo list
        todoList.appendChild(todoDiv);  

        
    });


}




function removeTodoFromLocal(todo){
    var todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndexInLocal=todos.indexOf(todo.children[1].innerText);
    if(todoIndexInLocal>=0){
        todos.splice(todoIndexInLocal,1);
        localStorage.setItem('todos',JSON.stringify(todos));

    }

    
}


function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgba(" + x + "," + y + "," + z + ","+0.8+  ")";
 console.log(bgColor);
  
    document.body.style.background = bgColor;

}
 

function filterTodo(event){
    const filterSelected=event.target.value;

    todoFiltering(filterSelected);
}

function todoFiltering(filterSelected){
    const todos=todoList.childNodes;
    
    console.log(todos);
    todos.forEach(function(todo){
        console.log(todo.classList);
        switch(filterSelected){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":

                if(todo.classList.contains("completed")){
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":

                if(!todo.classList.contains("completed")){
                    todo.style.display='flex';
                        }else{
                        todo.style.display='none';
                    }
                break;
                        
         
    

        }

    });
}