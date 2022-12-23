const express = require('express');
const uploader = require('express-fileupload');
const cors = require('cors');
const config = require('config');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const app = express();
const PORT = config.get("PORT");

app.use(cors({}));
app.use(express.json());
app.use(uploader({}))
app.use('/nds-shop/api', router);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname,  '../client/build')));
app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})
app.use(errorHandler);

async function start() {
    try {
        app.listen(PORT, ()=> console.log(`app has been started on port ${PORT}`));
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
start();
