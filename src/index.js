require('dotenv').config();
const express = require("express");
const got = require("got");
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
    try {
        const data = await got(`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJY9sg1U_xPUcRMJUmEHnfnDg&fields=name,rating,opening_hours&key=${process.env.API_KEY}`);
            res.send(data.body);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
