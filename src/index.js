require('dotenv').config();
const express = require("express");
const got = require("got");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3003;

const whitelist = ["http://localhost:3000", "https://k4-nearby-shops.herokuapp.com"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};


app.get("/", cors(corsOptions), async (req, res) => {
    const shopIds = [
        "ChIJY9sg1U_xPUcRMJUmEHnfnDg", // Żabka
        "ChIJcVatSK_xPUcRnV0LvEKspkE", // Delikatesy Centrum
        "ChIJ9YyJTzfxPUcRuhHc6ieWB8M", // Carrefour Express
        "ChIJ7cVX8DnxPUcR8-dpVwsYgx8", // Bonus 2
    ];

    try {
        const shopData = [];

        for (const shopId of shopIds) {
            const response = await got(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${shopId}&fields=name,rating,opening_hours&key=${process.env.API_KEY}`);
            const data = JSON.parse(response.body);
            const filteredData = {
                name: data.result.name,
                openingHours: data.result.opening_hours
            };
            shopData.push(filteredData);
        }
        res.send(shopData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
