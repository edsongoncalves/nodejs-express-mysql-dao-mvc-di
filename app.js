const Application = require('./Application')
const app = new Application
app.init()
app.server().listen( 3000, () => {console.log(`Servidor Iniciado`)} )