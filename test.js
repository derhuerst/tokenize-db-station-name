'use strict'

const tokenize = require('.')
const a = require('assert')

const l = str => process.stdout.write(str + '\n')

// todo:
// - Wolterdingen (Han)
// - Soltau (Han)
// - `grep '(Kr '`
// - `grep '(Bz '`
// - `grep '(b '`
// - `grep 'Bergstr)`
// - `grep 'DB`
// - Sachsenhausen (Nordb) -> "nordbahnhof"
// - https://mobile.twitter.com/RecumbentTravel/status/926932596222722048

const tests = [
	['Foo BAR baz', 'foo bar baz'],
	['foo  bar', 'foo bar'],

	['Zwiesel (Bay)', 'zwiesel bayern'],
	['Wurzbach (Thür)', 'wurzbach thueringen'],
	['Zwickau (Sachs) Hbf', 'zwickau sachsen hauptbahnhof'],
	['Wulfen (Anh)', 'wulfen anhalt'],
	['Wulfen (Westf)', 'wulfen westfalen'],
	['Wildberg (Württ)', 'wildberg wuerttemberg'],
	['Wiesau (Oberpf)', 'wiesau oberpfalz'],
	['Westheim (Schwab)', 'westheim schwaben'],
	['Weßling (Oberbay)', 'wessling oberbayern'],
	['Wedel (Holst)', 'wedel holstein'],
	['Weddel (Braunschw)', 'weddel braunschweig'],
	['Wallwitz (Saalkr)', 'wallwitz saalekreis'],
	['Domnitz (SaalKr)', 'domnitz saalekreis'],
	['Vilshofen (Niederbay)', 'vilshofen niederbayern'],
	['Villingen (Schwarzw)', 'villingen schwarzwald'],
	['Varel (Oldb)', 'varel oldenburg'],
	['Strasburg (Uckerm)', 'strasburg uckermark'],
	['Langenfeld (Rheinl)-Berghausen', 'langenfeld rheinland berghausen'],
	['Stockheim (Oberfr)', 'stockheim oberfranken'],
	['Sprendlingen (Rheinhess)', 'sprendlingen rheinhessen'],
	['Seligenstadt (Hess)', 'seligenstadt hessen'],
	['Seehausen (Altm)', 'seehausen altmark'],
	// todo: use "stadt limes" instead?
	['Schwalbach a Ts (Limes)', 'schwalbach a ts limesstadt'],
	['Schöneck (Vogtl)', 'schoeneck vogtland'],
	['Reuth (b Plauen/Vogtl)', 'reuth bei plauen vogtland'],
	['Schönberg (Meckl)', 'schoenberg mecklenburg'],
	['Rückersdorf (Mittelfr)', 'rueckersdorf mittelfranken'],
	['Rodenbach (Dillkr)', 'rodenbach dillkreis'],
	['Reinheim (Odenw)', 'reinheim odenwald'],
	['Oelsnitz (Erzgeb)', 'oelsnitz erzgebirge'],
	['Neustadt (Weinstr) Hbf', 'neustadt wein strasse hauptbahnhof'],
	['Liebenthal (Prign)', 'liebenthal prignitz'],
	['Lich (Oberhess)', 'lich oberhessen'],
	['Leer (Ostfriesl)', 'leer ostfriesland'],
	['Langenhorn (Schlesw)', 'langenhorn schleswig'],
	['Königstein (Sächs Schweiz)', 'koenigstein saechsische schweiz'],
	['Kirchheim (Unterfr)', 'kirchheim unterfranken'],
	['Dernbach (Westerw)', 'dernbach westerwald'],
	['Burg (Dithm)', 'burg dithmarschen'],
	['Bad Blankenburg (Thüringerw)', 'bad blankenburg thueringer wald'],
	['Lindhorst (Schaumb-Lippe)', 'lindhorst schaumburg lippe'],

	['Pößneck ob Bf', 'poessneck oben bahnhof'],
	['Wittgensdorf ob Bf', 'wittgensdorf oben bahnhof'],
	['Pößneck unt Bf', 'poessneck unten bahnhof'],

	['Schweinfurt Hbf', 'schweinfurt hauptbahnhof'],
	['Frankfurt(M) Flughafen Fernbf', 'frankfurt main flughafen fernbahnhof'],
	['Frankfurt am Main Flughafen Fernbf', 'frankfurt main flughafen fernbahnhof'],

	['Berlin Hbf (S-Bahn)', 'berlin hauptbahnhof sbahn'],
	['Charlottenburg Bahnhof (S), Berlin', 'charlottenburg bahnhof sbahn berlin'],
	['Berlin Hauptbahnhof (S+U), Berlin', 'berlin hauptbahnhof sbahn ubahn berlin'],
	['Hermannplatz (U), Berlin', 'hermannplatz ubahn berlin'],

	['Neukölln [U7], Berlin', 'neukoelln u7 berlin'],
	['Turmstr. [Bus Alt-Moabit] (U), Berlin', 'turm strasse bus alt moabit ubahn berlin'],

	['Angermünde', 'angermuende'],
	['Plön', 'ploen'],
	['Plänterwald', 'plaenterwald'],
	['Weißenau', 'weissenau'],

	['Seestraße', 'see strasse'],
	['Wiebestr/Huttenstr (Berlin)', 'wiebe strasse hutten strasse berlin'],

	['Taucha (b Leipzig)', 'taucha bei leipzig'],
	['Horb', 'horb'],

	['Heinrich-von-Kleist-Str., Potsdam', 'heinrich von kleist strasse potsdam']
]

l('TAP version 13')
let i = 0
for (const [input, expected] of tests) {
	l(`# ${input} -> ${expected}`)
	a.deepStrictEqual(tokenize(input), expected.split(' '))
	l('ok ' + (++i))
}
l(`1..${i}\n# ok`)
