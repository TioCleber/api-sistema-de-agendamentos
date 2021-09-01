import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import  mongoose  from 'mongoose';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';


const models = [User, File, Appointment];

class DBConnection {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo(){
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://sistemadeagendamento:sistemadeagendamento@cluster0.y9nkp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
}

export default new DBConnection();