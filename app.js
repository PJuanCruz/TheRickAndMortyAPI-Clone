import * as dotenv from 'dotenv';
import Database from './src/database/index.js';
import Server from './src/server/index.js';

dotenv.config();

class App {
  constructor() {
    this.database = new Database();
    this.server = new Server();
  }

  async start() {
    await this.database.checkConnection();
    await this.server.init();
  }
}

const app = new App();

app.start();
