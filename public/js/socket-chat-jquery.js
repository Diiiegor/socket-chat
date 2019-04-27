// funciones para renderizar usuarios
const paramsurl = new URLSearchParams(window.location.search);
const nombre = paramsurl.get('nombre');
const sala = paramsurl.get('sala');


//referencias de jquery
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const divChatbox = $('#divChatbox');

function renderizarUsuarios(personas) {
    var html = '';
    html += `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span> ${paramsurl.get('sala')}</span></a>
            </li>`;


    for (let i in personas) {
        html += `<li>
                    <a data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
                </li>`;
    }

    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, yo) {
    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ":" + fecha.getMinutes();
    let adminclass="info";
    if (mensaje.nombre==='Administrador') {
        adminclass='danger';
    }

    if (yo) {
        html += `<li class="reverse">
        <div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-inverse">${mensaje.mensaje}</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user"/>
        </div>
        <div class="chat-time">${hora}</div>
    </li>`;
    } else {

        let imagen='';
        if (mensaje.nombre!=='Administrador'){
            imagen='<img src="assets/images/users/1.jpg" alt="user"/>';
        }

        html += `<li class="animated fadeIn">
                <div class="chat-img">${imagen}
                </div>
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-${adminclass}">${mensaje.mensaje}</div>
                </div>
                <div class="chat-time">${hora}</div>
            </li>`;
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listeners
divUsuarios.on('click', 'a', function () {
    let id = $(this).data('id');
    if (id) {
        console.log(id)
    }
});

formEnviar.on('submit', function (e) {
    e.preventDefault();
    let mensaje = txtMensaje.val();
    if (mensaje.trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: mensaje
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje,true);
        scrollBottom()
    });
});


