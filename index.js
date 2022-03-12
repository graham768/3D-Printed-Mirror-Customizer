const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const getPointsfromText = require("./getPointsFromText")

const font = {
  alignment: 'left',
  selected: 'EMSOsmotron',
  sizeInPixels: 75,
  size: 75,
  lineHeight: 1,
  color: false,
  loading: false,
  strokeWidth: 1,
  widthUnit: 'px',
  characterSpacing: 2
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res) {
  fontName = req.body.font
  text = req.body.text

  font.selected = fontName
  // paths = createTextPaths(font, text)
  // paths.forEach((path) =>{
  //   console.log(path["d"])
  // })
  // res.send(paths)
  points = getPointsfromText(font, text, 10)
  res.send(points)
})

port = 3000
app.listen(port, () => console.log(`Listening on ${port}`))