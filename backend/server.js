const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverMySql/config/sequelize.config.js');

const allUsuariosRoutes = require('./serverMySql/routes/usuario.routes.js');
allUsuariosRoutes(app);

const allVehiculosRoutes = require('./serverMySql/routes/vehiculo.routes.js');
allVehiculosRoutes(app);

const allBarriosRoutes = require('./serverMySql/routes/barrio.routes.js');
allBarriosRoutes(app);

const allSectoresRoutes = require('./serverMySql/routes/sector.routes.js');
allSectoresRoutes(app);

const allMarcasRoutes = require('./serverMySql/routes/marca.routes.js');
allMarcasRoutes(app);

const allTipoVehiculosRoutes = require('./serverMySql/routes/tipoVehiculo.routes.js');
allTipoVehiculosRoutes(app);

const allNivelRiesgosRoutes = require('./serverMySql/routes/nivelRiesgo.routes.js');
allNivelRiesgosRoutes(app);

const allTipoIncidenteRoutes = require('./serverMySql/routes/tipoIncidente.routes.js');
allTipoIncidenteRoutes(app);

const allNuevaPublicacionRoutes = require('./serverMySql/routes/nuevaPublicacion.routes.js');
allNuevaPublicacionRoutes(app);

app.listen(port,()=>{
    console.log("Server listening at port",port);
})