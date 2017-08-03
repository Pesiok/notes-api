const express = require('express');
const path = require('path');
const compression = require('compression');

const resourcesController = app => {

    app.use(compression());
    app.use(express.static(path.join(__dirname, '../resources/public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../resources/public/index.html'));
    });
}

module.exports = resourcesController;