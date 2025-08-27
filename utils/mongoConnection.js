const mongoose = require('mongoose');
                            //USER  //PASSWORD                                  //BD
mongoose.connect('mongodb+srv://root:LFqqbmZisswvyZkA@lepton-cluster.ntvf8.mongodb.net/Lepton-Administrativo?retryWrites=true&w=majority&appName=Lepton-Cluster'
).then(() => console.log('Conexion exitosa a MongoDB'))
.catch(err => console.log('Error al conectar a MongoDB: ', err));

module.exports = mongoose;