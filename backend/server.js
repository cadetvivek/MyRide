const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const socketSetup = require('./socket');
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const server = http.createServer(app);
socketSetup(server);

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB()
app.get("/",(req,res)=>{
    res.send('BikeRide Api is Activated!')
})

app.use('/auth', authRoutes);
app.use('/ride', rideRoutes);
app.use('/admin', adminRoutes);




server.listen(PORT, () => 
    console.log(`Server running on port http://localhost:${PORT}`)
);

