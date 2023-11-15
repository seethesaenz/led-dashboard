const express = require('express');
const axios = require('axios');

const app = express();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

const piAddress = '192.168.1.242:5000'

app.post('/led/color', async (req, res) => {
    const color = req.body.color;
    try {
        const response = await axios.post(`http://${piAddress}/led/color`, {"color": color});
        if (response.headers['content-type'] === 'application/json') {
            res.status(200).send(response.data);
        } else {
            console.log(response);
            res.send(response.data)
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error setting color')
    }
});

app.post('/led/colorChase', async (req, res) => {
    const color = req.body.color;
    const iterations = req.body.iterations;
    
    try {
        const response = await axios.post(`http://${piAddress}/led/colorChase`, {"color": color, "iterations": iterations});
        if (response.headers['content-type'] === 'application/json') {
            res.status(200).send(response.data);
        } else {
            console.log(response);
            res.send(response.data)
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error setting color')
    }
});

app.post('/led/brightness', async (req, res) => {
    const brightness = req.body.brightness;
    try {
        const response = await axios.post(`http://${piAddress}/led/brightness`, {"brightness": brightness});
        if (response.headers['content-type'] === 'application/json') {
            res.status(200).send(response.data);
        } else {
            console.log(response);
            res.send(response.data)
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error setting brightness')
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));