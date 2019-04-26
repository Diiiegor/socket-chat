// funciones para renderizar usuarios
const paramsurl = new URLSearchParams(window.location.search);
const nombre = paramsurl.get('nombre');
const sala = paramsurl.get('sala');


//referencias de jquery
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const divChatbox=$('#divChatbox');

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
function renderizarMensajes( mensaje ){
    let html='';
    html+=`<li class="animated fadeIn">
                <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/>
                </div>
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-info">${mensaje.mensaje}</div>
                </div>
                <div class="chat-time">10:56 am</div>
            </li>`;
    divChatbox.append(html);
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
        renderizarMensajes(mensaje)
    });
});


