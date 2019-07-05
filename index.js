'use strict'

const normalize = require('normalize-for-search')

const transformationsRaw = [
	[/(?<!\w)\(?S\+U\)?(?=$|\s|,)/g, 'sbahn ubahn'],
	[/(?<!\w)\(?U(-Bahn)?\)?(?=$|\s|,)/g, 'ubahn'],
	[/(?<!\w)\(?S(-Bahn)?\)?(?=$|\s|,)/g, 'sbahn']
]

const transformationsNormalized = [
	[/(?<!\w)bay(?=$|\s|,)/g, 'bayern'],
	[/(?<!\w)thuer(?=$|\s|,)/g, 'thueringen'],
	[/(?<!\w)sachs(?=$|\s|,)/g, 'sachsen'],
	[/(?<!\w)anh(?=$|\s|,)/g, 'anhalt'],
	[/(?<!\w)westf(?=$|\s|,)/g, 'westfalen'],
	[/(?<!\w)wuertt(?=$|\s|,)/g, 'wuerttemberg'],
	[/(?<!\w)oberpf(?=$|\s|,)/g, 'oberpfalz'],
	[/(?<!\w)schwab(?=$|\s|,)/g, 'schwaben'],
	[/(?<!\w)oberbay(?=$|\s|,)/g, 'oberbayern'],
	[/(?<!\w)holst(?=$|\s|,)/g, 'holstein'],
	[/(?<!\w)braunschw(?=$|\s|,)/g, 'braunschweig'],
	[/(?<!\w)saalkr(?=$|\s|,)/g, 'saalekreis'],
	[/(?<!\w)saalkr(?=$|\s|,)/g, 'saalekreis'],
	[/(?<!\w)niederbay(?=$|\s|,)/g, 'niederbayern'],
	[/(?<!\w)schwarzw(?=$|\s|,)/g, 'schwarzwald'],
	[/(?<!\w)oldb(?=$|\s|,)/g, 'oldenburg'],
	[/(?<!\w)uckerm(?=$|\s|,)/g, 'uckermark'],
	[/(?<!\w)rheinl(?=$|\s|,)/g, 'rheinland'],
	[/(?<!\w)oberfr(?=$|\s|,)/g, 'oberfranken'],
	[/(?<!\w)rheinhess(?=$|\s|,)/g, 'rheinhessen'],
	[/(?<!\w)hess(?=$|\s|,)/g, 'hessen'],
	[/(?<!\w)altm(?=$|\s|,)/g, 'altmark'],
	[/(?<!\w)limes(?=$|\s|,)/g, 'limesstadt'],
	[/(?<!\w)vogtl(?=$|\s|,)/g, 'vogtland'],
	[/(?<!\w)meckl(?=$|\s|,)/g, 'mecklenburg'],
	[/(?<!\w)mittelfr(?=$|\s|,)/g, 'mittelfranken'],
	[/(?<!\w)dillkr(?=$|\s|,)/g, 'dillkreis'],
	[/(?<!\w)odenw(?=$|\s|,)/g, 'odenwald'],
	[/(?<!\w)erzgeb(?=$|\s|,)/g, 'erzgebirge'],
	[/(?<!\w)prign(?=$|\s|,)/g, 'prignitz'],
	[/(?<!\w)oberhess(?=$|\s|,)/g, 'oberhessen'],
	[/(?<!\w)ostfriesl(?=$|\s|,)/g, 'ostfriesland'],
	[/(?<!\w)schlesw(?=$|\s|,)/g, 'schleswig'],
	[/(?<!\w)saechs\sschweiz(?=$|\s|,)/g, 'saechsische schweiz'],
	[/(?<!\w)unterfr(?=$|\s|,)/g, 'unterfranken'],
	[/(?<!\w)westerw(?=$|\s|,)/g, 'westerwald'],
	[/(?<!\w)dithm(?=$|\s|,)/g, 'dithmarschen'],
	[/(?<!\w)thueringerw(?=$|\s|,)/g, 'thueringer wald'],
	[/(?<!\w)schaumb\slippe(?=$|\s|,)/g, 'schaumburg lippe'],

	[/(?<!\w)ob(?=$|\s|,)/g, 'oben'],
	[/(?<!\w)unt(?=$|\s|,)/g, 'unten'],
	[/(?<!\w)bf(?=$|\s|,)/g, 'bahnhof'],
	[/(?<!\w)hbf(?=$|\s|,)/g, 'hauptbahnhof'],
	[/(?<!\w)b(?=\s\w)/g, 'bei'], // "foo b berlin" -> "foo bei berlin"
	[/str(?=$|\s|,)/g, ' strasse'], // "weinstr foo" -> "wein strasse foo"
	[/(?<=\w)strasse(?=$|\s|,)/g, ' strasse'] // "seestrasse" -> "see strasse"
]

const tokenize = (name) => {
	if ('string' !== typeof name) throw new Error('name must be a string')
	if (name.length === 0) return []

	for (let [pattern, replacement] of transformationsRaw) {
		name = name.replace(pattern, replacement)
	}

	name = normalize(name)
	.replace(/[\/\(\)\-,\.\+]+/g, ' ') // remove special chars
	.replace(/\s+/g, ' ') // remove unnecessary whitespace
	.trim()

	for (let [pattern, replacement] of transformationsNormalized) {
		name = name.replace(pattern, replacement)
	}

	return name.split(' ')
}

module.exports = tokenize
