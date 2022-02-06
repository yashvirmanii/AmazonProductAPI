const express = require('express');
const request = require('request-promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScrapeUrl = (apiKey) => {
    return (`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`)
}

app.use(express.json());
app.use(cors());
//ROUTES
app.get('/', (req, res) => {
    res.send("Welcome to my Amazon scraper API")
})

//GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_Key)}&url=https://www.amazon.co.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})
//GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_Key)}&url=https://www.amazon.co.in/product-review/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {

    }
})
//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_Key)}&url=https://www.amazon.co.in/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {

    }
})
//GET SEARCH RESULT
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_Key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_Key)}&url=https://www.amazon.co.in/s?k=${searchQuery}`)
        res.json(JSON.parse(response.results));
    } catch (error) {

    }
})

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
});