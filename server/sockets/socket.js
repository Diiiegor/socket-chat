const {io} = require('../server');
const {Usuarios} = require('../clases/Usuarios');
const usuarios = new Usuarios();
const {crearMensaje} = require('../utils/utils');


io.on('connection', (client) => {


    client.on('entrarChat', (data, callback) => {
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'EL nombre es necesario'
            });
        }
        const personas = usuarios.agregarPersona(client.id, data.nombre);
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        callback(personas);
    });


    client.on('crearMensaje',(data)=>{
        const persona=usuarios.getPersona(client.id);
        const mensaje=crearMensaje(persona.nombre,data.mensaje);
        client.broadcast.emit('crearMensaje',mensaje);
    });


    client.on('disconnect', () => {
        const personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });

});
