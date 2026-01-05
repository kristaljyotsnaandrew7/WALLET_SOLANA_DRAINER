const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const middleware = require('./middleware/core');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.securityHeaders);
app.use(middleware.botDetection);

app.use('/css', express.static(path.join(__dirname, 'public/assets/css')));
app.use('/js', express.static(path.join(__dirname, 'public/assets/js')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(config.port, () => {
    console.log(`==========================================`);
    console.log(`   ${config.siteName} Server Started`);
    console.log(`   PORT: ${config.port}`);
    console.log(`   ENV:  ${config.environment}`);
    console.log(`==========================================`);
});
