require('dotenv').config();
const express = require("express");
const got = require("got");
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
    const shopIds = [
        "ChIJY9sg1U_xPUcRMJUmEHnfnDg", // Żabka
        "ChIJcVatSK_xPUcRnV0LvEKspkE", // Delikatesy Centrum
        "ChIJ9YyJTzfxPUcRuhHc6ieWB8M", // Carrefour Express
        "ChIJ7cVX8DnxPUcR8-dpVwsYgx8", // Bonus 2
    ];

    try {
        const shopData = [];

        for(const shopId of shopIds) {
            const data = await got(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${shopId}&fields=name,rating,opening_hours&key=${process.env.API_KEY}`);
            shopData.push(JSON.parse(data.body));
        }
            console.log(shopData);
            res.send(shopData);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
