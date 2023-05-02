const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/scrape', async (req, res) => {
    try {
        const url = req.query.url

        //fetch html of page
        const { data } = await axios.get(url)

        //load html into cheerio
        const $ = cheerio.load(data)

        //extract desired data from html
        const title = $('title').text()
        const metaDescription = $('meta[name="description"]').attr('content')
        const paragraphs = []

        $('p').each(function() {
            paragraphs.push($(this).text().trim())
        })

        res.json({
            title,
            metaDescription,
            paragraphs
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error'})
    }
})


app.listen(4000, () => {
    console.log('Server started on port 4000')
})