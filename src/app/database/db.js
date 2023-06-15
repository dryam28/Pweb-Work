import '../models/User_Model.js';
import '../models/Worker_Model.js'
import '../models/Requests_Model.js'
import connect from './connect.js'
connect.sync({ alter: true })
