module.exports = {
    connect: function(io, PORT) {
        io.on('connection', (socket) => {
            // Output to server console when request comes in
            console.log('User connection on port ' + PORT + ' : ' + socket.id);

            // When message comes in, emit it back to all sockets with the message.
            socket.on('message', (message) => {
                io.emit('message', message);
            });
        });
    }
}