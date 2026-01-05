const path = require('path');
const appConfig = require('../config/appConfig');

exports.renderHome = (req, res) => {

    res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.healthCheck = (req, res) => {
    res.status(200).json({
        status: 'online',
        uptime: process.uptime(),
        environment: appConfig.environment,
        timestamp: Date.now()
    });
};
