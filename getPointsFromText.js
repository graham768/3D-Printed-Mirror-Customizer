const { parseFont } = require('./fontLoader')
const svgpath = require('svgpath');
const svgPathProperties = require("svg-path-properties");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');


function getPointsfromText(font, text, hexNumber) {
  paths = createTextPaths(font, text)
  points = getPoints(paths, hexNumber)
  return points
}


function createTextPaths(font, text) {
  paths = [];
  const fontData = loadFont(font.selected, font.size)
  // Generate SVGs in a grid inside of SVG file
  let originX = 0;
  let lineWidth = 0;
  let originY = 0;
  let lineWidths = [];
  let lineIndex = 0;
  let maxLineWidth = 0;
  let characters = text.split('');
  if (font.alignment !== 'left') {
    // First calculate line widths
    characters.forEach((character, index) => {
      if (character === '\n') {
        lineWidths.push(lineWidth);
        lineWidth = 0
      }
      if (fontData[character]) {
        lineWidth += fontData[character].width + font.characterSpacing;
        // if last character, add to line widths
        if (index + 1 === characters.length) {
          lineWidths.push(lineWidth)
        }
      }
    });
    maxLineWidth = Math.max(...lineWidths)
  }

  characters.forEach((character) => {
    if (character === '\n') {
      lineIndex = lineIndex + 1;
      originX = 0;
      originY += font.size * font.lineHeight
    }
    if (fontData[character]) {
      if (fontData[character].d) {
        let characterXPosition = originX;
        if (font.alignment === 'center') characterXPosition = originX - (lineWidths[lineIndex] / 2);
        if (font.alignment === 'right') characterXPosition = originX - maxLineWidth - (lineWidths[lineIndex]);
        paths.push({
          d: new svgpath(fontData[character].d)
                  .translate(characterXPosition, originY)
                  .rel()
                  .toString()
        })
      }
      originX += fontData[character].width + font.characterSpacing
    }
  })
  return paths
}

function loadFont(fontName, size) {
  let fontText = fs.readFileSync(`fonts/${fontName}.svg`,'utf8')
  let dom = (new JSDOM(fontText)).window.document
  let data = parseFont(dom, size);
  return data
}


// Could also leave it to user to request - drop down list with calls to the endpoint updating the graphic on the spot
// const hexNumbers = [1, 7, 19, 37, 61, 91, 127, 169, 217, 271, 331, 397, 469, 547, 631, 721, 817, 919]

function getPoints(paths, hexNumber){
  var data_points = [];
  all_path_total_length = 0
  paths.forEach(path => {
    const properties = new svgPathProperties.svgPathProperties(path.d);
    all_path_total_length += properties.getTotalLength()
  })
  
  // always add first and last for each path, so reduce stepPoint by paths.length*2
  stepPoint = all_path_total_length / (hexNumber - paths.length*2)
  let remainder = 0
  paths.forEach(path => {
    const properties = new svgPathProperties.svgPathProperties(path.d);

    // Always record first point
    var point = properties.getPointAtLength(0);
    data_points.push([+point.x.toFixed(2), +point.y.toFixed(2)])

    // get points at regular intervals with remainder from last path
    total_length = properties.getTotalLength()
    var c;
    for (c = remainder; c < total_length; c += stepPoint) {
        var point = properties.getPointAtLength(c);
        data_points.push([+point.x.toFixed(2), +point.y.toFixed(2)])
    }
    remainder = c - total_length

    // Always record last point
    var point = properties.getPointAtLength(total_length);
    data_points.push([+point.x.toFixed(2), +point.y.toFixed(2)])
  })
  return data_points
}

module.exports = getPointsfromText