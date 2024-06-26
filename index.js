const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const getPointsfromText = require("./getPointsFromText")

const font = {
  alignment: 'left',
  selected: 'EMSOsmotron',
  size: 75,
  lineHeight: 1,
  characterSpacing: 2
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', function (req, res) {
  fontName = req.body.font
  text = req.body.text
  hexNumber = req.body.hex

  font.selected = fontName
  points = getPointsfromText(font, text, hexNumber)
  res.send(points)
  // res.send(`Points: ${points}\nLength: ${points.length}`)
})

port = 8000
app.listen(port, () => console.log(`Listening on ${port}`))