require('dotenv').config();

const axios = require('axios').default;

const PORT = process.env.PORT;
const NAME = process.env.NAME;
const API = process.env.API;

const REQUEST_INTERVAL = 5000;

const express = require('express');

const application = express();

application.get('/', async (_, response) => {
    const message = `Hello from ${NAME}`;
    console.info(`Sending back the message: ${message}`);
    return response.json({ message });
});

setInterval(() => {
    if (!API) return;

    const requestUrl = `http://${API}:${PORT}/`;
    console.info(`[${NAME}] Sending request to ${requestUrl}`);
    axios
        .get(requestUrl)
        .then((response) => {
            console.info(response.data);
        })
        .catch((error) => {
            console.error(`Error while executing request to ${requestUrl}`);
            console.error(error?.message);
        });
}, REQUEST_INTERVAL);

application.listen(PORT, () => {
    console.log(`Running application [${NAME}] on [${PORT}]`);
});
