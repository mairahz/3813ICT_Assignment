module.exports = {
    connect: function(io, PORT) {
        io.on('connection', (socket) => {
            // Output to server console when request comes in
            console.log('User connection on port ' + PORT + ' : ' + socket.id);
            socket.on('create', function(room) {
                socket.join(room);
                io.to(room).emit('join', 'A user has joined the room.');
                // When message comes in, emit it back to all sockets with the message.
                socket.on('message', (message) => {
                    console.log(message)
                    io.in(room).emit('message', message);
                });
            })

            // Subscribe socket to given channel
            // socket.join('room1');
        });
    }
}