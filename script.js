let notas = [];
let coloresCategorias = {
    trabajo: '#41AEFF',
    personal: '#4CAF50',
    escolar: '#FF41FF',
    otros: '#FFF641'
};

function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('SW registrado correctamente');
        }, function(err) {
            console.log('SW fallo', err);
        });
    } else {
        console.log("ERROR");
    }

    let fecha = new Date();
    let mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById('fecha').innerHTML = `${fecha.getDate()} de ${mes[fecha.getMonth()]}`;

    if (localStorage.getItem('notas')) {
        notas = JSON.parse(localStorage.getItem('notas'));
        cargarNotas();
    } else {
        localStorage.setItem('notas', JSON.stringify(notas));
    }
}

function cargarNotas() {
    let contenedor = document.querySelector('.notas-container');
    contenedor.innerHTML = '';
    for (let i = 0; i < notas.length; i++) {
        let nota = document.createElement('div');
        nota.className = 'nota';
        nota.innerHTML = `
            <div class="text">${notas[i].texto}</div>
            <div class="category" style="background-color: ${coloresCategorias[notas[i].categoria]}"></div>
            <div class="actions">
                <i class="fas fa-edit" onclick="editarNota(${i})"></i>
                <i class="fas fa-trash" onclick="eliminarNota(${i})"></i>
            </div>
        `;
        contenedor.appendChild(nota);
    }
}

function agregarNota(event) {
    event.preventDefault();
    let textoNota = document.getElementById('nuevaNota').value;
    let categoriaNota = document.getElementById('categoriaNota').value;

    let nuevaNota = {
        texto: textoNota,
        categoria: categoriaNota
    };

    notas.push(nuevaNota);
    localStorage.setItem('notas', JSON.stringify(notas));
    document.getElementById('nuevaNota').value = '';
    cargarNotas();
}

function editarNota(index) {
    let nuevoTexto = prompt("Editar nota:", notas[index].texto);
    if (nuevoTexto !== null) {
        notas[index].texto = nuevoTexto;
        localStorage.setItem('notas', JSON.stringify(notas));
        cargarNotas();
    }
}

function eliminarNota(index) {
    notas.splice(index, 1);
    localStorage.setItem('notas', JSON.stringify(notas));
    cargarNotas();
}

function limpiarTodo() {
    notas = [];
    localStorage.setItem('notas', JSON.stringify(notas));
    cargarNotas();
}

window.addEventListener('load', init);
