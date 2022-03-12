const { parseFont } = require('./fontLoader')
const svgpath = require('svgpath');
const svgPathProperties = require("svg-path-properties");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')


function getPointsfromText(font, text, stepper) {
  paths = createTextPaths(font, text)
  points = getPoints(paths, stepper)
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
                  //.skew()
                  .rel()
                  //.round(2)
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


function getPoints(paths, stepPoint){
  var data_points = [];
  paths.forEach(path => {
    const properties = new svgPathProperties.svgPathProperties(path.d);

    // get points at regular intervals
    for (var c = 0; c < properties.getTotalLength(); c += stepPoint) {
        var point = properties.getPointAtLength(c);
        data_points.push([point.x, point.y])
    }
  })
  return data_points
}

module.exports = getPointsfromText