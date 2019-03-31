var socket = io();

const params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es requerido');
}

const usuario = {
    nombre: params.get('nombre')
}


socket.on('connect', function () {
    console.log('Conectado al servidor');


    socket.emit('entrarChat', usuario, function (resp) {
            console.log(resp)
        }
    )


});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);
});

//cuando un usuario entra o sale del chat recuperatoda la lisa de personas
socket.on('listaPersonas',function (resp) {
    console.log(resp)
});