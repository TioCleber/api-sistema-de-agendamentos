import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';


const models = [User, File, Appointment];

class DBConnection {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new DBConnection();