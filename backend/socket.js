const socketIO = require('socket.io');

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        socket.on('joinRide', (rideId) => {
            socket.join(rideId);
        });

        socket.on('updateLocation', ({ rideId, location }) => {
            socket.to(rideId).emit('driverLocationUpdate', location);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
};

module.exports = setupSocket;
