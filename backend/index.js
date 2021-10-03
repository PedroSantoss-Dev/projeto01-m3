const express = require('express')
const app = express() ;
const port = 3003;
const routes = require('./routes/routes')
const cors = require('cors')


app.use(express.json());
app.use(cors())
app.use( routes);



app.listen(port, () => {
    console.log(`server rodando na porta : http://localhost${port}`)
});