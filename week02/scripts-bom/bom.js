const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // o 'ul'

// 1) Click listener del botón Add Chapter
button.addEventListener('click', function (e) {
    e.preventDefault(); // útil si está dentro de un <form>

    const chapter = input.value.trim(); // trim quita espacios al inicio y al final

    // 2) Validar que no esté vacío
    if (chapter !== '') {
        // 3) Crear li y botón de borrar SOLO si hay texto
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = chapter;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', 'Delete chapter');
        deleteButton.classList.add('delete');

        li.append(deleteButton);
        list.append(li);

        // 4) Limpiar input
        input.value = '';
    }

    // 5) Siempre regresar el foco al input
    input.focus();
});

// 6) Event delegation: un solo listener para borrar
list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove(); // borra el <li>
        input.focus();
    }
});



