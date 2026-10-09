/**
 * Einsatzgebiet-Checker Module
 * Basis: Messelbergstraße 4, 73098 Rechberghausen
 * Einsatzgebiet: Rechberghausen, Göppingen, Schorndorf & Umgebung (max. 25 min)
 */

export const SERVICE_LOCATIONS = [
    // --- KERNGEBIET (<= 15 Min.) ---
    {
        name: 'Rechberghausen',
        plz: ['73098'],
        district: 'Landkreis Göppingen',
        time: 0,
        dist: 0,
        status: 'core',
        highlight: 'Firmenstandort – unmittelbare Nähe & keine Anfahrtszeit',
        aliases: ['rechberghausen', '73098', 'messelberg']
    },
    {
        name: 'Birenbach',
        plz: ['73102'],
        district: 'Landkreis Göppingen',
        time: 4,
        dist: 3,
        status: 'core',
        aliases: ['birenbach', '73102']
    },
    {
        name: 'Börtlingen',
        plz: ['73104'],
        district: 'Landkreis Göppingen',
        time: 6,
        dist: 4,
        status: 'core',
        aliases: ['börtlingen', 'boertlingen', '73104', 'breech', 'zell']
    },
    {
        name: 'Wäschenbeuren',
        plz: ['73116'],
        district: 'Landkreis Göppingen',
        time: 6,
        dist: 5,
        status: 'core',
        aliases: ['wäschenbeuren', 'waeschenbeuren', '73116', 'krettenhof']
    },
    {
        name: 'Wangen',
        plz: ['73117'],
        district: 'Landkreis Göppingen',
        time: 7,
        dist: 5,
        status: 'core',
        aliases: ['wangen', '73117', 'oberwälden', 'oberwaelden']
    },
    {
        name: 'Adelberg',
        plz: ['73099'],
        district: 'Landkreis Göppingen',
        time: 8,
        dist: 7,
        status: 'core',
        aliases: ['adelberg', '73099']
    },
    {
        name: 'Göppingen (Stadt)',
        plz: ['73033'],
        district: 'Landkreis Göppingen',
        time: 8,
        dist: 6,
        status: 'core',
        highlight: 'Kernstadt Göppingen, Bartenbach, Lerchenberg',
        aliases: ['göppingen', 'goeppingen', '73033', 'bartenbach', 'lerchenberg']
    },
    {
        name: 'Göppingen (Faurndau & Bezgenriet)',
        plz: ['73035'],
        district: 'Landkreis Göppingen',
        time: 10,
        dist: 7,
        status: 'core',
        highlight: 'Faurndau, Jebenhausen, Bezgenriet',
        aliases: ['göppingen', 'goeppingen', '73035', 'faurndau', 'jebenhausen', 'bezgenriet']
    },
    {
        name: 'Göppingen (Holzheim & Hohenstaufen)',
        plz: ['73037'],
        district: 'Landkreis Göppingen',
        time: 10,
        dist: 8,
        status: 'core',
        highlight: 'Holzheim, Manzen, St. Gotthardt, Hohenstaufen, Maitis',
        aliases: ['göppingen', 'goeppingen', '73037', 'holzheim', 'manzen', 'hohenstaufen', 'maitis', 'st gotthardt']
    },
    {
        name: 'Uhingen',
        plz: ['73066'],
        district: 'Landkreis Göppingen',
        time: 10,
        dist: 8,
        status: 'core',
        highlight: 'Uhingen, Sparwiesen, Baiereck, Diegelsberg, Nassach',
        aliases: ['uhingen', '73066', 'sparwiesen', 'baiereck', 'diegelsberg', 'nassach']
    },
    {
        name: 'Eislingen/Fils',
        plz: ['73054'],
        district: 'Landkreis Göppingen',
        time: 11,
        dist: 8,
        status: 'core',
        highlight: 'Eislingen, Krummwälden, Eschenbäche',
        aliases: ['eislingen', 'eislingen/fils', 'eislingen an der fils', '73054', 'krummwälden']
    },
    {
        name: 'Ottenbach',
        plz: ['73113'],
        district: 'Landkreis Göppingen',
        time: 10,
        dist: 8,
        status: 'core',
        aliases: ['ottenbach', '73113']
    },
    {
        name: 'Albershausen',
        plz: ['73095'],
        district: 'Landkreis Göppingen',
        time: 12,
        dist: 10,
        status: 'core',
        aliases: ['albershausen', '73095']
    },
    {
        name: 'Salach',
        plz: ['73084'],
        district: 'Landkreis Göppingen',
        time: 13,
        dist: 11,
        status: 'core',
        aliases: ['salach', '73084']
    },
    {
        name: 'Heiningen',
        plz: ['73092'],
        district: 'Landkreis Göppingen',
        time: 13,
        dist: 11,
        status: 'core',
        aliases: ['heiningen', '73092']
    },
    {
        name: 'Schlat',
        plz: ['73114'],
        district: 'Landkreis Göppingen',
        time: 14,
        dist: 12,
        status: 'core',
        aliases: ['schlat', '73114']
    },
    {
        name: 'Lorch',
        plz: ['73547'],
        district: 'Ostalbkreis',
        time: 14,
        dist: 12,
        status: 'core',
        highlight: 'Lorch, Waldhausen, Rattenharz',
        aliases: ['lorch', '73547', 'waldhausen', 'rattenharz']
    },
    {
        name: 'Ebersbach an der Fils',
        plz: ['73061'],
        district: 'Landkreis Göppingen',
        time: 14,
        dist: 13,
        status: 'core',
        highlight: 'Ebersbach, Roßwälden, Bünzwangen, Weiler',
        aliases: ['ebersbach', 'ebersbach an der fils', '73061', 'roßwälden', 'rosswaelden', 'bünzwangen']
    },
    {
        name: 'Süßen',
        plz: ['73079'],
        district: 'Landkreis Göppingen',
        time: 15,
        dist: 14,
        status: 'core',
        aliases: ['süßen', 'suessen', '73079']
    },
    {
        name: 'Schlierbach',
        plz: ['73278'],
        district: 'Landkreis Göppingen',
        time: 15,
        dist: 13,
        status: 'core',
        aliases: ['schlierbach', '73278']
    },
    {
        name: 'Eschenbach',
        plz: ['73107'],
        district: 'Landkreis Göppingen',
        time: 15,
        dist: 13,
        status: 'core',
        aliases: ['eschenbach', '73107']
    },

    // --- KERNGEBIET (16 bis 25 Min. – u. a. Schorndorf & Umgebung) ---
    {
        name: 'Schorndorf',
        plz: ['73614'],
        district: 'Rems-Murr-Kreis',
        time: 19,
        dist: 16,
        status: 'core',
        highlight: 'Schorndorf Zentrum, Haubersbronn, Miedelsbach, Oberberken, Schlichten, Weiler',
        aliases: ['schorndorf', '73614', 'haubersbronn', 'miedelsbach', 'oberberken', 'schlichten', 'schornbach', 'weiler']
    },
    {
        name: 'Plüderhausen',
        plz: ['73655'],
        district: 'Rems-Murr-Kreis',
        time: 16,
        dist: 14,
        status: 'core',
        aliases: ['plüderhausen', 'pluederhausen', '73655']
    },
    {
        name: 'Urbach',
        plz: ['73660'],
        district: 'Rems-Murr-Kreis',
        time: 18,
        dist: 15,
        status: 'core',
        aliases: ['urbach', '73660']
    },
    {
        name: 'Donzdorf',
        plz: ['73072'],
        district: 'Landkreis Göppingen',
        time: 16,
        dist: 15,
        status: 'core',
        highlight: 'Donzdorf, Winzingen, Reichenbach u. R.',
        aliases: ['donzdorf', '73072', 'winzingen', 'reichenbach unter rechberg']
    },
    {
        name: 'Hattenhofen',
        plz: ['73110'],
        district: 'Landkreis Göppingen',
        time: 16,
        dist: 14,
        status: 'core',
        aliases: ['hattenhofen', '73110']
    },
    {
        name: 'Dürnau',
        plz: ['73110'],
        district: 'Landkreis Göppingen',
        time: 16,
        dist: 14,
        status: 'core',
        aliases: ['dürnau', 'duernau', '73110']
    },
    {
        name: 'Gammelshausen',
        plz: ['73108'],
        district: 'Landkreis Göppingen',
        time: 16,
        dist: 14,
        status: 'core',
        aliases: ['gammelshausen', '73108']
    },
    {
        name: 'Zell unter Aichelberg',
        plz: ['73119'],
        district: 'Landkreis Göppingen',
        time: 16,
        dist: 15,
        status: 'core',
        aliases: ['zell', 'zell unter aichelberg', 'zell u. a.', '73119']
    },
    {
        name: 'Aichelberg',
        plz: ['73101'],
        district: 'Landkreis Göppingen',
        time: 17,
        dist: 16,
        status: 'core',
        aliases: ['aichelberg', '73101']
    },
    {
        name: 'Bad Boll',
        plz: ['73087'],
        district: 'Landkreis Göppingen',
        time: 17,
        dist: 15,
        status: 'core',
        aliases: ['bad boll', 'boll', 'eckwälden', '73087']
    },
    {
        name: 'Waldstetten',
        plz: ['73550'],
        district: 'Ostalbkreis',
        time: 17,
        dist: 15,
        status: 'core',
        highlight: 'Waldstetten, Wißgoldingen',
        aliases: ['waldstetten', '73550', 'wißgoldingen', 'wissgoldingen']
    },
    {
        name: 'Gingen an der Fils',
        plz: ['73333'],
        district: 'Landkreis Göppingen',
        time: 18,
        dist: 16,
        status: 'core',
        aliases: ['gingen', 'gingen an der fils', 'gingen/fils', '73333']
    },
    {
        name: 'Ohmden',
        plz: ['73275'],
        district: 'Landkreis Esslingen',
        time: 17,
        dist: 15,
        status: 'core',
        aliases: ['ohmden', '73275']
    },
    {
        name: 'Notzingen',
        plz: ['73274'],
        district: 'Landkreis Esslingen',
        time: 18,
        dist: 17,
        status: 'core',
        highlight: 'Notzingen, Wellingen',
        aliases: ['notzingen', '73274', 'wellingen']
    },
    {
        name: 'Lichtenwald',
        plz: ['73669'],
        district: 'Landkreis Esslingen',
        time: 18,
        dist: 15,
        status: 'core',
        highlight: 'Thomashardt, Hegenlohe',
        aliases: ['lichtenwald', '73669', 'thomashardt', 'hegenlohe']
    },
    {
        name: 'Hochdorf',
        plz: ['73269'],
        district: 'Landkreis Esslingen',
        time: 18,
        dist: 16,
        status: 'core',
        aliases: ['hochdorf', '73269']
    },
    {
        name: 'Reichenbach an der Fils',
        plz: ['73262'],
        district: 'Landkreis Esslingen',
        time: 19,
        dist: 17,
        status: 'core',
        aliases: ['reichenbach', 'reichenbach an der fils', 'reichenbach/fils', '73262']
    },
    {
        name: 'Baltmannsweiler',
        plz: ['73666'],
        district: 'Landkreis Esslingen',
        time: 19,
        dist: 16,
        status: 'core',
        highlight: 'Baltmannsweiler, Hohengehren',
        aliases: ['baltmannsweiler', '73666', 'hohengehren']
    },
    {
        name: 'Holzmaden',
        plz: ['73271'],
        district: 'Landkreis Esslingen',
        time: 19,
        dist: 17,
        status: 'core',
        aliases: ['holzmaden', '73271']
    },
    {
        name: 'Lauterstein',
        plz: ['73111'],
        district: 'Landkreis Göppingen',
        time: 20,
        dist: 18,
        status: 'core',
        highlight: 'Nenningen, Weißenstein',
        aliases: ['lauterstein', '73111', 'nenningen', 'weißenstein', 'weissenstein']
    },
    {
        name: 'Kuchen',
        plz: ['73329'],
        district: 'Landkreis Göppingen',
        time: 20,
        dist: 18,
        status: 'core',
        aliases: ['kuchen', '73329']
    },
    {
        name: 'Schwäbisch Gmünd',
        plz: ['73525', '73527', '73529'],
        district: 'Ostalbkreis',
        time: 21,
        dist: 18,
        status: 'core',
        highlight: 'Gmünd Zentrum, Bettringen, Straßdorf, Rehnenhof, Wetzgau',
        aliases: ['schwäbisch gmünd', 'schwaebisch gmuend', 'gmuend', 'gmünd', '73525', '73527', '73529', 'bettringen', 'strassdorf', 'straßdorf']
    },
    {
        name: 'Winterbach',
        plz: ['73650'],
        district: 'Rems-Murr-Kreis',
        time: 21,
        dist: 19,
        status: 'core',
        aliases: ['winterbach', '73650', 'engelberg']
    },
    {
        name: 'Weilheim an der Teck',
        plz: ['73235'],
        district: 'Landkreis Esslingen',
        time: 21,
        dist: 19,
        status: 'core',
        highlight: 'Weilheim, Hepsisau',
        aliases: ['weilheim', 'weilheim an der teck', 'weilheim/teck', '73235', 'hepsisau']
    },
    {
        name: 'Plochingen',
        plz: ['73207'],
        district: 'Landkreis Esslingen',
        time: 21,
        dist: 20,
        status: 'core',
        aliases: ['plochingen', '73207']
    },
    {
        name: 'Alfdorf',
        plz: ['73553'],
        district: 'Ostalbkreis',
        time: 21,
        dist: 18,
        status: 'core',
        highlight: 'Alfdorf, Pfahlbronn',
        aliases: ['alfdorf', '73553', 'pfahlbronn']
    },
    {
        name: 'Mutlangen',
        plz: ['73557'],
        district: 'Ostalbkreis',
        time: 21,
        dist: 19,
        status: 'core',
        aliases: ['mutlangen', '73557']
    },
    {
        name: 'Kirchheim unter Teck',
        plz: ['73230'],
        district: 'Landkreis Esslingen',
        time: 22,
        dist: 21,
        status: 'core',
        highlight: 'Kirchheim, Lindorf, Ötlingen, Nabern, Jesingen',
        aliases: ['kirchheim', 'kirchheim unter teck', 'kirchheim/teck', '73230', 'lindorf', 'ötlingen', 'oetlingen', 'nabern', 'jesingen']
    },
    {
        name: 'Wernau (Neckar)',
        plz: ['73249'],
        district: 'Landkreis Esslingen',
        time: 22,
        dist: 21,
        status: 'core',
        aliases: ['wernau', 'wernau (neckar)', 'wernau neckar', '73249']
    },
    {
        name: 'Geislingen an der Steige',
        plz: ['73312'],
        district: 'Landkreis Göppingen',
        time: 23,
        dist: 22,
        status: 'core',
        highlight: 'Geislingen, Altenstadt, Eybach, Aufhausen, Weiler',
        aliases: ['geislingen', 'geislingen an der steige', 'geislingen/steige', '73312', 'altenstadt', 'eybach']
    },
    {
        name: 'Deggingen',
        plz: ['73326'],
        district: 'Landkreis Göppingen',
        time: 22,
        dist: 21,
        status: 'core',
        highlight: 'Deggingen, Reichenbach im Täle',
        aliases: ['deggingen', '73326', 'reichenbach im täle']
    },
    {
        name: 'Bad Ditzenbach',
        plz: ['73342'],
        district: 'Landkreis Göppingen',
        time: 23,
        dist: 22,
        status: 'core',
        highlight: 'Bad Ditzenbach, Gosbach, Auendorf',
        aliases: ['bad ditzenbach', 'ditzenbach', 'gosbach', 'auendorf', '73342']
    },
    {
        name: 'Gruibingen',
        plz: ['73344'],
        district: 'Landkreis Göppingen',
        time: 22,
        dist: 21,
        status: 'core',
        aliases: ['gruibingen', '73344']
    },
    {
        name: 'Rudersberg',
        plz: ['73635'],
        district: 'Rems-Murr-Kreis',
        time: 23,
        dist: 21,
        status: 'core',
        highlight: 'Rudersberg, Steinenberg, Schlechtbach',
        aliases: ['rudersberg', '73635', 'steinenberg', 'schlechtbach']
    },
    {
        name: 'Welzheim',
        plz: ['73642'],
        district: 'Rems-Murr-Kreis',
        time: 23,
        dist: 20,
        status: 'core',
        aliases: ['welzheim', '73642']
    },
    {
        name: 'Berglen',
        plz: ['73663'],
        district: 'Rems-Murr-Kreis',
        time: 23,
        dist: 21,
        status: 'core',
        highlight: 'Oppelsbohm, Rettersburg, Erlenhof',
        aliases: ['berglen', '73663', 'oppelsbohm']
    },
    {
        name: 'Deizisau',
        plz: ['73779'],
        district: 'Landkreis Esslingen',
        time: 23,
        dist: 22,
        status: 'core',
        aliases: ['deizisau', '73779']
    },
    {
        name: 'Neidlingen',
        plz: ['73279'],
        district: 'Landkreis Esslingen',
        time: 23,
        dist: 21,
        status: 'core',
        aliases: ['neidlingen', '73279']
    },
    {
        name: 'Bissingen an der Teck',
        plz: ['73266'],
        district: 'Landkreis Esslingen',
        time: 24,
        dist: 22,
        status: 'core',
        aliases: ['bissingen', 'bissingen an der teck', 'bissingen/teck', '73266']
    },
    {
        name: 'Owen',
        plz: ['73277'],
        district: 'Landkreis Esslingen',
        time: 24,
        dist: 23,
        status: 'core',
        aliases: ['owen', 'owen teck', '73277']
    },
    {
        name: 'Mühlhausen im Täle',
        plz: ['73347'],
        district: 'Landkreis Göppingen',
        time: 24,
        dist: 23,
        status: 'core',
        aliases: ['mühlhausen', 'muehlhausen', 'mühlhausen im täle', '73347']
    },
    {
        name: 'Wiesensteig',
        plz: ['73349'],
        district: 'Landkreis Göppingen',
        time: 25,
        dist: 24,
        status: 'core',
        aliases: ['wiesensteig', '73349']
    },
    {
        name: 'Wendlingen am Neckar',
        plz: ['73240'],
        district: 'Landkreis Esslingen',
        time: 24,
        dist: 23,
        status: 'core',
        aliases: ['wendlingen', 'wendlingen am neckar', '73240', 'unterboihingen']
    },
    {
        name: 'Altbach',
        plz: ['73776'],
        district: 'Landkreis Esslingen',
        time: 24,
        dist: 22,
        status: 'core',
        aliases: ['altbach', '73776']
    },
    {
        name: 'Aichwald',
        plz: ['73773'],
        district: 'Landkreis Esslingen',
        time: 24,
        dist: 21,
        status: 'core',
        aliases: ['aichwald', '73773', 'aichelberg (aichwald)']
    },
    {
        name: 'Durlangen',
        plz: ['73568'],
        district: 'Ostalbkreis',
        time: 23,
        dist: 20,
        status: 'core',
        aliases: ['durlangen', '73568']
    },
    {
        name: 'Spraitbach',
        plz: ['73565'],
        district: 'Ostalbkreis',
        time: 24,
        dist: 22,
        status: 'core',
        aliases: ['spraitbach', '73565']
    },
    {
        name: 'Eschach',
        plz: ['73569'],
        district: 'Ostalbkreis',
        time: 24,
        dist: 22,
        status: 'core',
        aliases: ['eschach', '73569']
    },
    {
        name: 'Leinzell',
        plz: ['73575'],
        district: 'Ostalbkreis',
        time: 24,
        dist: 22,
        status: 'core',
        aliases: ['leinzell', '73575']
    },
    {
        name: 'Kaisersbach',
        plz: ['73667'],
        district: 'Rems-Murr-Kreis',
        time: 25,
        dist: 22,
        status: 'core',
        aliases: ['kaisersbach', '73667']
    },
    {
        name: 'Böbingen an der Rems',
        plz: ['73560'],
        district: 'Ostalbkreis',
        time: 25,
        dist: 22,
        status: 'core',
        aliases: ['böbingen', 'boebingen', '73560']
    },
    {
        name: 'Remshalden',
        plz: ['73630'],
        district: 'Rems-Murr-Kreis',
        time: 25,
        dist: 22,
        status: 'core',
        highlight: 'Geradstetten, Grunbach, Buoch',
        aliases: ['remshalden', '73630', 'geradstetten', 'grunbach']
    },

    // --- ERWEITERTER SERVICEBEREICH (26 bis 35 Min.) ---
    {
        name: 'Winnenden',
        plz: ['71364'],
        district: 'Rems-Murr-Kreis',
        time: 27,
        dist: 24,
        status: 'extended',
        highlight: 'Winnenden, Birkmannsweiler, Höfen',
        aliases: ['winnenden', '71364', 'birkmannsweiler', 'höfen']
    },
    {
        name: 'Weinstadt',
        plz: ['71384'],
        district: 'Rems-Murr-Kreis',
        time: 26,
        dist: 23,
        status: 'extended',
        highlight: 'Endersbach, Beutelsbach, Großheppach',
        aliases: ['weinstadt', '71384', 'endersbach', 'beutelsbach', 'großheppach', 'grossheppach']
    },
    {
        name: 'Korb',
        plz: ['71404'],
        district: 'Rems-Murr-Kreis',
        time: 28,
        dist: 26,
        status: 'extended',
        aliases: ['korb', '71404', 'kleinheppach']
    },
    {
        name: 'Waiblingen',
        plz: ['71332', '71334', '71336'],
        district: 'Rems-Murr-Kreis',
        time: 29,
        dist: 28,
        status: 'extended',
        highlight: 'Waiblingen Zentrum, Beinstein, Neustadt, Hegnach',
        aliases: ['waiblingen', '71332', '71334', '71336', 'beinstein', 'neustadt', 'hegnach']
    },
    {
        name: 'Kernen im Remstal',
        plz: ['71394'],
        district: 'Rems-Murr-Kreis',
        time: 27,
        dist: 25,
        status: 'extended',
        highlight: 'Rommelshausen, Stetten',
        aliases: ['kernen', 'kernen im remstal', '71394', 'rommelshausen', 'stetten']
    },
    {
        name: 'Esslingen am Neckar',
        plz: ['73728', '73730', '73732', '73733', '73734'],
        district: 'Landkreis Esslingen',
        time: 28,
        dist: 26,
        status: 'extended',
        highlight: 'Esslingen Zentrum, Oberesslingen, Zell, Berkheim, Sirnau',
        aliases: ['esslingen', 'esslingen am neckar', '73728', '73730', '73732', '73733', '73734', 'oberesslingen', 'berkheim', 'zell am neckar']
    },
    {
        name: 'Köngen',
        plz: ['73257'],
        district: 'Landkreis Esslingen',
        time: 26,
        dist: 24,
        status: 'extended',
        aliases: ['köngen', 'koengen', '73257']
    },
    {
        name: 'Denkendorf',
        plz: ['73770'],
        district: 'Landkreis Esslingen',
        time: 28,
        dist: 27,
        status: 'extended',
        aliases: ['denkendorf', '73770']
    },
    {
        name: 'Ostfildern',
        plz: ['73760'],
        district: 'Landkreis Esslingen',
        time: 29,
        dist: 28,
        status: 'extended',
        highlight: 'Nellingen, Ruit, Parksiedlung, Scharnhausen',
        aliases: ['ostfildern', '73760', 'nellingen', 'ruit', 'scharnhausen']
    },
    {
        name: 'Nürtingen',
        plz: ['72622'],
        district: 'Landkreis Esslingen',
        time: 29,
        dist: 28,
        status: 'extended',
        aliases: ['nürtingen', 'nuertingen', '72622', 'oberensingen', 'rossdorf']
    },
    {
        name: 'Frickenhausen',
        plz: ['72636'],
        district: 'Landkreis Esslingen',
        time: 29,
        dist: 28,
        status: 'extended',
        aliases: ['frickenhausen', '72636']
    },
    {
        name: 'Neuffen',
        plz: ['72639'],
        district: 'Landkreis Esslingen',
        time: 28,
        dist: 27,
        status: 'extended',
        aliases: ['neuffen', '72639']
    },
    {
        name: 'Lenningen',
        plz: ['73252'],
        district: 'Landkreis Esslingen',
        time: 27,
        dist: 26,
        status: 'extended',
        aliases: ['lenningen', '73252', 'unterlenningen', 'oberlenningen']
    },
    {
        name: 'Böhmenkirch',
        plz: ['89558'],
        district: 'Landkreis Heidenheim / Göppingen',
        time: 26,
        dist: 25,
        status: 'extended',
        aliases: ['böhmenkirch', 'boehmenkirch', '89558', 'treffelhausen', 'schnittlingen']
    },
    {
        name: 'Bad Überkingen',
        plz: ['73337'],
        district: 'Landkreis Göppingen',
        time: 26,
        dist: 24,
        status: 'extended',
        aliases: ['bad überkingen', 'bad ueberkingen', 'überkingen', '73337', 'hausen']
    },
    {
        name: 'Amstetten',
        plz: ['73340'],
        district: 'Alb-Donau-Kreis',
        time: 28,
        dist: 28,
        status: 'extended',
        aliases: ['amstetten', '73340']
    },
    {
        name: 'Mögglingen',
        plz: ['73563'],
        district: 'Ostalbkreis',
        time: 27,
        dist: 26,
        status: 'extended',
        aliases: ['mögglingen', 'moegglingen', '73563']
    },
    {
        name: 'Iggingen',
        plz: ['73574'],
        district: 'Ostalbkreis',
        time: 26,
        dist: 24,
        status: 'extended',
        aliases: ['iggingen', '73574']
    },

    // --- BEKANNTE ORTE AUSSERHALB (> 35 Min.) ---
    {
        name: 'Stuttgart',
        plz: ['70173', '70174', '70176', '70178', '70180', '70184', '70188', '70190', '70191', '70192', '70193', '70197', '70199', '70327', '70329', '70372', '70469', '70563', '70565', '70567', '70569'],
        district: 'Stadtkreis Stuttgart',
        time: 42,
        dist: 45,
        status: 'outside',
        highlight: 'Landeshauptstadt Stuttgart',
        aliases: ['stuttgart', 'stuttgart zentrum', 'bad cannstatt', 'untertürkheim', 'vaihingen']
    },
    {
        name: 'Fellbach',
        plz: ['70734', '70736'],
        district: 'Rems-Murr-Kreis',
        time: 34,
        dist: 33,
        status: 'extended',
        aliases: ['fellbach', '70734', '70736', 'schmiden', 'oeftringen']
    },
    {
        name: 'Aalen',
        plz: ['73430', '73431', '73432', '73433', '73434'],
        district: 'Ostalbkreis',
        time: 38,
        dist: 42,
        status: 'outside',
        aliases: ['aalen', '73430', '73431', '73432', '73433', '73434', 'wasseralfingen']
    },
    {
        name: 'Ulm',
        plz: ['89073', '89075', '89077', '89079', '89081'],
        district: 'Stadtkreis Ulm',
        time: 45,
        dist: 55,
        status: 'outside',
        aliases: ['ulm', '89073', '89075', '89077', '89079', '89081']
    },
    {
        name: 'Reutlingen',
        plz: ['72760', '72762', '72764', '72766', '72768', '72770'],
        district: 'Landkreis Reutlingen',
        time: 45,
        dist: 50,
        status: 'outside',
        aliases: ['reutlingen', '72760', '72762', '72764', '72766', '72768', '72770']
    },
    {
        name: 'Ludwigsburg',
        plz: ['71634', '71636', '71638', '71640', '71642'],
        district: 'Landkreis Ludwigsburg',
        time: 48,
        dist: 52,
        status: 'outside',
        aliases: ['ludwigsburg', '71634', '71636', '71638', '71640', '71642']
    }
];

/**
 * Normalisiert Text für fehlertoleranten Vergleich:
 * Kleinbuchstaben, Umlaute-Ersetzung, Trimmen
 */
export function normalizeSearchTerm(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .trim()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]/g, '');
}

/**
 * Sucht Orte nach PLZ oder Text
 * @param {string} query PLZ oder Stadtname
 * @returns {Array} Liste treffender Orte
 */
export function searchLocations(query) {
    if (!query || query.trim().length === 0) return [];
    
    const cleanRaw = query.trim().toLowerCase();
    const cleanNorm = normalizeSearchTerm(query);
    const digitsOnly = query.replace(/\D/g, '');

    // 1. Suche nach PLZ (exakt oder Anfang)
    if (digitsOnly.length >= 2) {
        const plzMatches = SERVICE_LOCATIONS.filter(loc => 
            loc.plz.some(p => p.startsWith(digitsOnly))
        );
        if (plzMatches.length > 0) {
            return plzMatches.sort((a, b) => a.time - b.time);
        }
    }

    // 2. Suche nach Ortsnamen / Aliases
    const nameMatches = SERVICE_LOCATIONS.filter(loc => {
        // Direkter Teilstring im Namen
        if (loc.name.toLowerCase().includes(cleanRaw)) return true;
        
        // Normalisierter Abgleich
        const normName = normalizeSearchTerm(loc.name);
        if (normName.includes(cleanNorm) || cleanNorm.includes(normName)) return true;

        // Aliases durchsuchen
        return loc.aliases.some(alias => {
            const normAlias = normalizeSearchTerm(alias);
            return normAlias.includes(cleanNorm) || cleanNorm.includes(normAlias);
        });
    });

    if (nameMatches.length > 0) {
        return nameMatches.sort((a, b) => a.time - b.time);
    }

    // 3. Wenn es eine 5-stellige deutsche PLZ ist, die nicht in der Liste vorkommt:
    if (digitsOnly.length === 5) {
        // PLZ im 73xxx-Bereich (Ostalb / Göppingen / Esslingen)
        if (digitsOnly.startsWith('73')) {
            return [{
                name: `PLZ ${digitsOnly} (Region Göppingen / Stauferland / Remstal)`,
                plz: [digitsOnly],
                district: 'Region Göppingen / Stauferland',
                time: 25,
                dist: 22,
                status: 'core',
                highlight: 'PLZ im Raum 73xxx – liegt meist direkt in unserem 25-Minuten-Gebiet!',
                aliases: [digitsOnly]
            }];
        }
        // PLZ im 71xxx-Bereich (Rems-Murr / Ludwigsburg)
        if (digitsOnly.startsWith('71')) {
            return [{
                name: `PLZ ${digitsOnly} (Rems-Murr-Kreis / Großraum Stuttgart)`,
                plz: [digitsOnly],
                district: 'Rems-Murr-Kreis / Umland',
                time: 30,
                dist: 28,
                status: 'extended',
                highlight: 'Erweiterter Servicebereich – auf individuelle Anfrage möglich!',
                aliases: [digitsOnly]
            }];
        }
        // Weit entfernte PLZ (z. B. 0xxxx, 1xxxx, 2xxxx, 3xxxx, 4xxxx, 5xxxx, 6xxxx, 8xxxx, 9xxxx)
        return [{
            name: `PLZ ${digitsOnly}`,
            plz: [digitsOnly],
            district: 'Deutschland',
            time: 60,
            dist: 80,
            status: 'outside',
            highlight: 'Außerhalb unseres primären Einsatzgebiets (> 35 Min. Fahrzeit ab Rechberghausen)',
            aliases: [digitsOnly]
        }];
    }

    return [];
}
