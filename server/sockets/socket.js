const {io} = require('../server');
const {Usuarios} = require('../clases/Usuarios');
const usuarios = new Usuarios();

io.on('connection', (client) => {


    client.on('entrarChat', (data, callback) => {
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'EL nombre es necesario'
            });
        }
        const personas=usuarios.agregarPersona(client.id, data.nombre);
        callback(personas);
    })

});
