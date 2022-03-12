// For loading the initial fonts/ directory. Need to create EMS/ and Hershey/ in fonts and then also install axios bc I removed from package.json

const axios = require('axios')
const fs = require('fs')

const FONT_URL_ROOT = 'https://glcdn.githack.com/oskay/svg-fonts/raw/master/fonts/';

async function writeFont(font) {
  const content = await loadFontFromURL(`${FONT_URL_ROOT}${font.filename}.svg`)

  fs.writeFile(`fonts/${font.filename}.svg`, content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

async function loadFontFromURL(url) {
  let { data } = await axios.get(url);
  // Remove anything before first <svg
  let firstOccurenceOfSVG = data.indexOf('<svg ');
  if (firstOccurenceOfSVG === -1) {
    firstOccurenceOfSVG = data.indexOf('<SVG ')
  }
  // Remove everything that occurs prior to SVG opening tag
  return data.substring(firstOccurenceOfSVG);
}

const fonts = {
  EMSAllure: {
    filename: 'EMS/EMSAllure',
    data: null,
    string: '',
    size: 24
  },
  EMSBird: {
    filename: 'EMS/EMSBird',
    data: null,
    string: '',
    size: 24
  },
  EMSBirdSwashCaps: {
    filename: 'EMS/EMSBirdSwashCaps',
    data: null,
    string: '',
    size: 24
  },
  EMSBrush: {
    filename: 'EMS/EMSBrush',
    data: null,
    string: '',
    size: 24
  },
  EMSCapitol: {
    filename: 'EMS/EMSCapitol',
    data: null,
    string: '',
    size: 24
  },
  EMSCasualHand: {
    filename: 'EMS/EMSCasualHand',
    data: null,
    string: '',
    size: 24
  },
  EMSDecorousScript: {
    filename: 'EMS/EMSDecorousScript',
    data: null,
    string: '',
    size: 24
  },
  EMSDelight: {
    filename: 'EMS/EMSDelight',
    data: null,
    string: '',
    size: 24
  },
  EMSDelightSwashCaps: {
    filename: 'EMS/EMSDelightSwashCaps',
    data: null,
    string: '',
    size: 24
  },
  EMSElfin: {
    filename: 'EMS/EMSElfin',
    data: null,
    string: '',
    size: 24
  },
  EMSFelix: {
    filename: 'EMS/EMSFelix',
    data: null,
    string: '',
    size: 24
  },
  EMSHerculean: {
    filename: 'EMS/EMSHerculean',
    data: null,
    string: '',
    size: 24
  },
  EMSInvite: {
    filename: 'EMS/EMSInvite',
    data: null,
    string: '',
    size: 24
  },
  EMSLeague: {
    filename: 'EMS/EMSLeague',
    data: null,
    string: '',
    size: 24
  },
  EMSLittlePrincess: {
    filename: 'EMS/EMSLittlePrincess',
    data: null,
    string: '',
    size: 24
  },
  EMSMistyNight: {
    filename: 'EMS/EMSMistyNight',
    data: null,
    string: '',
    size: 24
  },
  EMSNeato: {
    filename: 'EMS/EMSNeato',
    data: null,
    string: '',
    size: 24
  },
  EMSNixish: {
    filename: 'EMS/EMSNixish',
    data: null,
    string: '',
    size: 24
  },
  EMSNixishItalic: {
    filename: 'EMS/EMSNixishItalic',
    data: null,
    string: '',
    size: 24
  },
  EMSOsmotron: {
    filename: 'EMS/EMSOsmotron',
    data: null,
    string: '',
    size: 24
  },
  EMSPancakes: {
    filename: 'EMS/EMSPancakes',
    data: null,
    string: '',
    size: 24
  },
  EMSPepita: {
    filename: 'EMS/EMSPepita',
    data: null,
    string: '',
    size: 24
  },
  EMSQwandry: {
    filename: 'EMS/EMSQwandry',
    data: null,
    string: '',
    size: 24
  },
  EMSReadability: {
    filename: 'EMS/EMSReadability',
    data: null,
    string: '',
    size: 24
  },
  EMSReadabilityItalic: {
    filename: 'EMS/EMSReadabilityItalic',
    data: null,
    string: '',
    size: 24
  },
  EMSSociety: {
    filename: 'EMS/EMSSociety',
    data: null,
    string: '',
    size: 24
  },
  EMSSpaceRocks: {
    filename: 'EMS/EMSSpaceRocks',
    data: null,
    string: '',
    size: 24
  },
  EMSSwiss: {
    filename: 'EMS/EMSSwiss',
    data: null,
    string: '',
    size: 24
  },
  EMSTech: {
    filename: 'EMS/EMSTech',
    data: null,
    string: '',
    size: 24
  },
  HersheyGothEnglish: {
    filename: 'Hershey/HersheyGothEnglish',
    data: null,
    string: '',
    size: 24
  },
  HersheyGothGerman: {
    filename: 'Hershey/HersheyGothGerman',
    data: null,
    string: '',
    size: 24
  },
  HersheyGothItalian: {
    filename: 'Hershey/HersheyGothItalian',
    data: null,
    string: '',
    size: 24
  },
  HersheySans1: {
    filename: 'Hershey/HersheySans1',
    data: null,
    string: '',
    size: 24
  },
  HersheySansMed: {
    filename: 'Hershey/HersheySansMed',
    data: null,
    string: '',
    size: 24
  },
  HersheyScript1: {
    filename: 'Hershey/HersheyScript1',
    data: null,
    string: '',
    size: 24
  },
  HersheyScriptMed: {
    filename: 'Hershey/HersheyScriptMed',
    data: null,
    string: '',
    size: 24
  },
  HersheySerifBold: {
    filename: 'Hershey/HersheySerifBold',
    data: null,
    string: '',
    size: 24
  },
  HersheySerifBoldItalic: {
    filename: 'Hershey/HersheySerifBoldItalic',
    data: null,
    string: '',
    size: 24
  },
  HersheySerifMed: {
    filename: 'Hershey/HersheySerifMed',
    data: null,
    string: '',
    size: 24
  },
  HersheySerifMedItalic: {
    filename: 'Hershey/HersheySerifMedItalic',
    data: null,
    string: '',
    size: 24
  }
}

for (var key in fonts) {
  writeFont(fonts[key])
}