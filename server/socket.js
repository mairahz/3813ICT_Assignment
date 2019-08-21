module.exports = {
    connect: function(io, PORT) {
        io.on('connection', (socket) => {
            // Output to server console when request comes in
            console.log('User connection on port ' + PORT + ' : ' + socket.id);

            // Subscribe socket to given channel
            socket.join('room1');

            // When message comes in, emit it back to all sockets with the message.
            socket.on('message', (message) => {
                io.in('room1').emit('message', message);
            });
        });
    }
}