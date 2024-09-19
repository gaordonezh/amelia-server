const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./src/users/user.routes');
const DeviceRoutes = require('./src/devices/device.routes');

dotenv.config();

class AmeliaServer {
  constructor() {
    this.puerto = process.env.PORT;
    this.app = express();

    this.configurarBodyParser();
    this.rutas();
    this.conectarBD();
  }

  iniciarServidor() {
    this.app.listen(this.puerto, () => {
      console.log(`Server on PORT ${this.puerto}`);
    });
  }

  configurarBodyParser() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    console.log('Parser is configured');
  }

  rutas() {
    this.app.get('/', (_, res) => {
      return res.json({ message: 'SERVIDOR AMELIA' });
    });

    this.app.use('/api/users', UserRoutes);
    this.app.use('/api/devices', DeviceRoutes);

    console.log('Router is configured');
  }

  async conectarBD() {
    try {
      await mongoose.connect(String(process.env.MONGODB_URI));
      console.log('DB is connected');
    } catch (error) {
      console.log('Failed to connect to DB');
    }
  }
}

module.exports = AmeliaServer;
