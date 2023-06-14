import Migration from './index.js';
import Database from './../index.js';

const migration = new Migration(Database);

migration.down();
