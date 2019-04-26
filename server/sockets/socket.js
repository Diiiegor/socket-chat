const {io} = require('../server');
const {Usuarios} = require('../clases/Usuarios');
const usuarios = new Usuarios();
const {crearMensaje} = require('../utils/utils');


io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'EL nombre/sala es necesario'
            });
        }

        //conectamos el cliente a la sala
        client.join(data.sala);

         usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        callback(usuarios.getPersonasPorSala(data.sala));
    });


    client.on('crearMensaje', (data,callback) => {
        const persona = usuarios.getPersona(client.id);
        const mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });


    client.on('disconnect', () => {
        const personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    //private messages
    client.on('privateMessage', data => {
        const user = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('privateMessage', crearMensaje(user.nombre, data.message));
    })

});
