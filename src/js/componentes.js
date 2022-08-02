import { Todo, TodoList } from "../classes";

import { todoList} from '../index';
//referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtImput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorfiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

const htmlTodo = `
<li class="${ (todo.completed) ? 'completed' : ''  }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" "${ (todo.completed) ? 'checked' : ''  }">
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;



const div = document.createElement('div');
div.innerHTML = htmlTodo;



divTodoList.append( div.firstElementChild );

return div.firstElementChild;

}

//Eventos
txtImput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtImput.value.length > 0) {

        console.log (txtImput.value);
        const nuevoTodo = new Todo ( txtImput.value );
        todoList.nuevoTodo ( nuevoTodo );
        
        crearTodoHtml(nuevoTodo);
        txtImput.value = '';
    }
}) 

divTodoList.addEventListener('click', (event) => {

    
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement; 
    const todoId         = todoElemento.getAttribute('data-id');



    if ( nombreElemento.includes ('input') ){// Hizo click en el check
        todoList.marcarCompletado ( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button') ){ // hay que borrar el todo

    todoList.eliminarTodo( todoId );
    divTodoList.removeChild ( todoElemento );
    }
});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i>= 0; i-- ) {

        const elemento = divTodoList.children [i];

        if(elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);            
        }

    }

});

ulFiltros.addEventListener('click',(event) => {

        const filtro = event.target.text;

        if ( !filtro ) { return };

        anchorfiltros.forEach (elem => elem.classList.remove('selected'));
        event.target.classList.add ('selected');

        for ( const elemento of divTodoList.children) {

            elemento.classList.remove('hidden');
            const completado = elemento.classList.contains('completed');

            switch ( filtro ) {

                case 'Pendientes':
                    if( completado ) {
                        elemento.classList.add('hidden');
                    }
                    break; 

                    case 'Completados':
                    if( !completado ) {
                        elemento.classList.add('hidden');
                    }
                    break;
            }
            
        }

});