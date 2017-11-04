'use strict'

const test = require('tape')

const tokenize = require('.')

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

test('returns lower case tokens, split by spaces', (t) => {
	t.plan(3)
	const r = tokenize('Foo BAR baz')
	t.equal(r[0], 'foo')
	t.equal(r[1], 'bar')
	t.equal(r[2], 'baz')
})

test('expands shortened state/region/city names', (t) => {
	t.plan(40)
	t.ok(tokenize('Zwiesel (Bay)').includes('bayern'))
	t.ok(tokenize('Wurzbach (Thür)').includes('thueringen'))
	t.ok(tokenize('Zwickau (Sachs) Hbf').includes('sachsen'))
	t.ok(tokenize('Wulfen (Anh)').includes('anhalt'))
	t.ok(tokenize('Wulfen (Westf)').includes('westfalen'))
	t.ok(tokenize('Wildberg (Württ)').includes('wuerttemberg'))
	t.ok(tokenize('Wiesau (Oberpf)').includes('oberpfalz'))
	t.ok(tokenize('Westheim (Schwab)').includes('schwaben'))
	t.ok(tokenize('Weßling (Oberbay)').includes('oberbayern'))
	t.ok(tokenize('Wedel (Holst)').includes('holstein'))
	t.ok(tokenize('Weddel (Braunschw)').includes('braunschweig'))
	t.ok(tokenize('Wallwitz (Saalkr)').includes('saalekreis'))
	t.ok(tokenize('Domnitz (SaalKr)').includes('saalekreis'))
	t.ok(tokenize('Vilshofen (Niederbay)').includes('niederbayern'))
	t.ok(tokenize('Villingen (Schwarzw)').includes('schwarzwald'))
	t.ok(tokenize('Varel (Oldb)').includes('oldenburg'))
	t.ok(tokenize('Strasburg (Uckerm)').includes('uckermark'))
	t.ok(tokenize('Langenfeld (Rheinl)-Berghausen').includes('rheinland'))
	t.ok(tokenize('Stockheim (Oberfr)').includes('oberfranken'))
	t.ok(tokenize('Sprendlingen (Rheinhess)').includes('rheinhessen'))
	t.ok(tokenize('Seligenstadt (Hess)').includes('hessen'))
	t.ok(tokenize('Seehausen (Altm)').includes('altmark'))
	// todo: use "stadt limes" instead?
	t.ok(tokenize('Schwalbach a Ts (Limes)').includes('limesstadt'))
	t.ok(tokenize('Schöneck (Vogtl)').includes('vogtland'))
	t.ok(tokenize('Reuth (b Plauen/Vogtl)').includes('vogtland'))
	t.ok(tokenize('Schönberg (Meckl)').includes('mecklenburg'))
	t.ok(tokenize('Rückersdorf (Mittelfr)').includes('mittelfranken'))
	t.ok(tokenize('Rodenbach (Dillkr)').includes('dillkreis'))
	t.ok(tokenize('Reinheim (Odenw)').includes('odenwald'))
	t.ok(tokenize('Oelsnitz (Erzgeb)').includes('erzgebirge'))
	t.ok(tokenize('Neustadt (Weinstr) Hbf').includes('weinstrasse'))
	t.ok(tokenize('Liebenthal (Prign)').includes('prignitz'))
	t.ok(tokenize('Lich (Oberhess)').includes('oberhessen'))
	t.ok(tokenize('Leer (Ostfriesl)').includes('ostfriesland'))
	t.ok(tokenize('Langenhorn (Schlesw)').includes('schleswig'))
	t.ok(tokenize('Königstein (Sächs Schweiz)').includes('saechsische'))
	t.ok(tokenize('Kirchheim (Unterfr)').includes('unterfranken'))
	t.ok(tokenize('Dernbach (Westerw)').includes('westerwald'))
	t.ok(tokenize('Burg (Dithm)').includes('dithmarschen'))
	t.ok(tokenize('Bad Blankenburg (Thüringerw)').includes('thueringer wald'))
})

test('replaces "Bf" by "bahnhof"', (t) => {
	t.plan(1)
	t.ok(tokenize('Pößneck ob Bf').includes('bahnhof'))
})

test('replaces "Hbf" by "hauptbahnhof"', (t) => {
	t.plan(1)
	t.ok(tokenize('Schweinfurt Hbf').includes('hauptbahnhof'))
})

test('replaces "ob" by "oben" and "unt" by "unten"', (t) => {
	t.plan(2)
	t.ok(tokenize('Wittgensdorf ob Bf').includes('oben'))
	t.ok(tokenize('Pößneck unt Bf').includes('unten'))
})

test('replaces German umlauts', (t) => {
	t.plan(4 * 2)

	const a = tokenize('Angermünde')
	t.ok(a.includes('angermuende'))
	t.notOk(a.join('').includes('ü'))

	const b = tokenize('Plön')
	t.ok(b.includes('ploen'))
	t.notOk(b.join('').includes('ö'))

	const c = tokenize('Plänterwald')
	t.ok(c.includes('plaenterwald'))
	t.notOk(c.join('').includes('ä'))

	const d = tokenize('Weißenau')
	t.ok(d.includes('weissenau'))
	t.notOk(d.join('').includes('ß'))
})

test('replaces "b " with "bei " if followed by a word', (t) => {
	t.plan(4)

	const r1 = tokenize('Taucha (b Leipzig)')
	t.ok(r1.includes('bei'))
	t.notOk(r1.includes('b'))

	const r2 = tokenize('Horb')
	t.ok(r2.includes('horb'))
	t.notOk(r2.includes('bei'))
})
