import React, { useState, useEffect, useRef, useContext } from "react";

// ─────────────────────────────────────────────
// QUESTION BANK (~150 questions)
// ─────────────────────────────────────────────
const QUESTIONS = [
  // ── PALMARÈS ──
  { cat:"palmares", diff:"facile", q:"Combien de fois Tadej Pogačar a-t-il remporté le Tour de France ?", opts:["2 fois","3 fois","4 fois","1 fois"], correct:1, exp:"Pogačar a gagné en 2020, 2021 et 2024. Trois victoires à seulement 26 ans." },
  { cat:"palmares", diff:"facile", q:"Quel coureur a réalisé le doublé Giro-Tour en 2024 ?", opts:["Vingegaard","Roglič","Pogačar","Evenepoel"], correct:2, exp:"Pogačar a réalisé le légendaire doublé Giro-Tour 2024, exploit rarissime dans l'ère moderne." },
  { cat:"palmares", diff:"facile", q:"Qui a remporté Paris-Roubaix 2024 ?", opts:["Van der Poel","Van Aert","Ganna","Pogačar"], correct:0, exp:"Mathieu van der Poel a gagné Paris-Roubaix 2024 pour la 3ème fois de sa carrière." },
  { cat:"palmares", diff:"facile", q:"Quelle est la course surnommée 'La Doyenne' ?", opts:["Paris-Roubaix","Milan-San Remo","Liège-Bastogne-Liège","Il Lombardia"], correct:2, exp:"Liège-Bastogne-Liège (fondée en 1892) est la plus ancienne classique cycliste encore disputée, d'où son surnom." },
  { cat:"palmares", diff:"facile", q:"Qui a remporté le Tour de France 2023 ?", opts:["Pogačar","Vingegaard","Evenepoel","Roglič"], correct:1, exp:"Jonas Vingegaard a remporté son 2ème Tour de France consécutif en 2023 devant Pogačar." },
  { cat:"palmares", diff:"moyen", q:"Combien de monuments Eddy Merckx a-t-il remportés ?", opts:["16","19","11","24"], correct:1, exp:"Merckx totalise 19 Monuments : 7 MSR, 3 Roubaix, 5 LBL, 2 Flandres, 2 Lombardie." },
  { cat:"palmares", diff:"moyen", q:"Combien de fois Remco Evenepoel a-t-il remporté la Vuelta ?", opts:["0","1","2","3"], correct:2, exp:"Evenepoel a remporté la Vuelta en 2022 et 2023, deux succès consécutifs historiques pour un Belge." },
  { cat:"palmares", diff:"moyen", q:"Quel coureur a remporté le Tour des Flandres 4 fois ?", opts:["Boonen","Cancellara","Museeuw","De Vlaeminck"], correct:0, exp:"Tom Boonen a gagné le Tour des Flandres 4 fois (2005, 2006, 2012, 2013), record absolu." },
  { cat:"palmares", diff:"moyen", q:"En quelle année Vingegaard a-t-il réalisé son premier podium sur le Tour ?", opts:["2020","2021","2022","2023"], correct:1, exp:"Vingegaard a fini 2ème du Tour 2021 derrière Pogačar, une surprise qui annonçait les années suivantes." },
  { cat:"palmares", diff:"difficile", q:"Quel est le nombre exact de victoires d'étapes de Mark Cavendish sur le Tour ?", opts:["33","34","35","36"], correct:2, exp:"Cavendish a battu le record de Merckx (34) lors du Tour 2024 à Vichy, portant son total à 35." },
  { cat:"palmares", diff:"difficile", q:"En quelle année Pogačar a-t-il remporté pour la 1ère fois Il Lombardia ?", opts:["2020","2021","2022","2023"], correct:1, exp:"Pogačar a gagné Il Lombardia 2021, 1ère d'une série de 4 victoires consécutives (2021-2024)." },
  { cat:"palmares", diff:"expert", q:"Combien de coureurs ont gagné le Tour de France entre 2010 et 2024 ?", opts:["6","7","8","9"], correct:2, exp:"8 coureurs : Contador, Evans, Wiggins, Froome (x4), Nibali, Thomas, Bernal, Pogačar (x3), Vingegaard (x2)." },
  { cat:"palmares", diff:"expert", q:"Quel est le seul coureur à avoir remporté les 5 Monuments ET les 3 Grands Tours ?", opts:["Hinault","Coppi","Merckx","Anquetil"], correct:2, exp:"Eddy Merckx est le seul 'Grand Chelem' du cyclisme, un exploit considéré inégalable à l'ère moderne." },
  // 2 nouvelles palmarès
  { cat:"palmares", diff:"facile", q:"Qui a remporté le Giro d'Italia 2024 ?", opts:["Pogačar","Evenepoel","Bernal","Almeida"], correct:0, exp:"Pogačar a remporté le Giro 2024 avec une domination totale, avant d'enchaîner avec le Tour de France." },
  { cat:"palmares", diff:"moyen", q:"Combien de fois Fabian Cancellara a-t-il remporté Paris-Roubaix ?", opts:["2","3","4","5"], correct:1, exp:"Spartacus Cancellara a gagné Paris-Roubaix 3 fois (2006, 2010, 2013), ainsi que 3 Tours des Flandres." },
  { cat:"palmares", diff:"moyen", q:"Quel coureur espagnol a remporté 4 fois la Vuelta a España ?", opts:["Indurain","Contador","Valverde","Delgado"], correct:1, exp:"Alberto Contador a remporté la Vuelta en 2008, 2012, 2014 et 2016 — 4 victoires, record partagé avec Roberto Heras." },
  { cat:"palmares", diff:"difficile", q:"Quel est le record de victoires sur La Flèche Wallonne ?", opts:["Valverde 5x","Merckx 3x","Yates 3x","Alaphilippe 3x"], correct:0, exp:"Alejandro Valverde détient le record avec 5 victoires sur La Flèche Wallonne (2006, 2014, 2015, 2016, 2017)." },
  { cat:"palmares", diff:"expert", q:"En quelle année Louison Bobet a-t-il réalisé son 3ème Tour de France consécutif ?", opts:["1953","1954","1955","1956"], correct:2, exp:"Louison Bobet a remporté 3 Tours de France consécutifs de 1953 à 1955, premier coureur à réaliser cet exploit." },

  // ── COUREURS ──
  { cat:"coureurs", diff:"facile", q:"Dans quel pays est né Tadej Pogačar ?", opts:["Croatie","Slovénie","Autriche","Serbie"], correct:1, exp:"Pogačar est né le 21 septembre 1998 à Komenda, Slovénie. Son compatriote Roglič est aussi slovène." },
  { cat:"coureurs", diff:"facile", q:"Quelle équipe représente Wout van Aert ?", opts:["Soudal Quick-Step","Visma-Lease a Bike","UAE Emirates","INEOS"], correct:1, exp:"Van Aert court pour Visma-Lease a Bike (ex-Jumbo-Visma), même équipe que Jonas Vingegaard." },
  { cat:"coureurs", diff:"facile", q:"Quel sport pratiquait Primož Roglič avant le cyclisme ?", opts:["Ski alpin","Saut à ski","Biathlon","Athlétisme"], correct:1, exp:"Roglič était sauteur à ski jusqu'en 2011 avant de se reconvertir au cyclisme — la plus belle reconversion du sport." },
  { cat:"coureurs", diff:"facile", q:"Qui est le grand-père maternel de Mathieu van der Poel ?", opts:["Sean Kelly","Bernard Hinault","Raymond Poulidor","Joop Zoetemelk"], correct:2, exp:"Sa mère est la fille de Raymond Poulidor, légende française 3x 2ème du Tour. Van der Poel est donc 'petit-fils de Poupou'." },
  { cat:"coureurs", diff:"moyen", q:"Combien de maillots verts Peter Sagan a-t-il gagnés sur le Tour ?", opts:["5","6","7","8"], correct:2, exp:"Sagan a remporté 7 maillots verts consécutifs (2012-2016, 2018, 2019), record absolu de ce classement." },
  { cat:"coureurs", diff:"moyen", q:"Quelle est la nationalité de Remco Evenepoel ?", opts:["Néerlandaise","Belge","Luxembourgeoise","Française"], correct:1, exp:"Evenepoel est belge, né à Schepdaal en 2000. Il est le plus grand talent belge depuis Eddy Merckx." },
  { cat:"coureurs", diff:"moyen", q:"En quelle année Froome a-t-il eu son grave accident lors du Dauphiné ?", opts:["2018","2019","2020","2021"], correct:1, exp:"Froome a failli mourir lors d'une reconnaissance du CLM du Critérium du Dauphiné en juin 2019." },
  { cat:"coureurs", diff:"difficile", q:"Combien de victoires d'étapes Merckx a-t-il sur le Tour de France ?", opts:["32","34","35","28"], correct:1, exp:"Merckx totalise 34 victoires d'étapes sur le Tour, record battu par Cavendish en 2024 (35)." },
  { cat:"coureurs", diff:"difficile", q:"Quel est le w/kg estimé de Pogačar sur ses meilleures ascensions ?", opts:["5,8","6,0","6,2","6,5"], correct:2, exp:"Les physiologistes estiment Pogačar à ~6,2 W/kg sur ses meilleures montées, niveau des plus grands grimpeurs." },
  { cat:"coureurs", diff:"expert", q:"Quelle distance Filippo Ganna a-t-il parcouru lors de son record de l'heure 2022 ?", opts:["55,548 km","56,792 km","57,107 km","54,526 km"], correct:1, exp:"Ganna a parcouru 56,792 km en une heure à Grenchen (Suisse) le 8 octobre 2022." },
  // 5 nouvelles coureurs
  { cat:"coureurs", diff:"facile", q:"Quel est le surnom d'Eddy Merckx ?", opts:["Le Patron","Le Cannibale","La Bête","L'Aigle"], correct:1, exp:"Eddy Merckx est surnommé 'Le Cannibale' pour sa façon de dévorer les victoires — 525 victoires pro en carrière." },
  { cat:"coureurs", diff:"moyen", q:"Dans quelle ville néerlandaise est né Mathieu van der Poel ?", opts:["Amsterdam","Eindhoven","Kapellen","Middelburg"], correct:3, exp:"Mathieu van der Poel est né à Middelburg (Pays-Bas) le 19 janvier 1995, même s'il est de nationalité néerlandaise." },
  { cat:"coureurs", diff:"moyen", q:"Quel coureur français a remporté 5 fois le Tour de France ?", opts:["Hinault","Anquetil","Bobet","Merckx"], correct:0, exp:"Bernard Hinault est le dernier Français à avoir gagné le Tour (1985) avec 5 victoires (1978, 79, 81, 82, 85)." },
  { cat:"coureurs", diff:"difficile", q:"Combien de victoires professionnelles comptabilise Eddy Merckx ?", opts:["453","525","478","612"], correct:1, exp:"Eddy Merckx totalise 525 victoires professionnelles, un record absolu dans le cyclisme mondial." },
  { cat:"coureurs", diff:"expert", q:"À quel âge Tadej Pogačar a-t-il remporté son premier Tour de France ?", opts:["21 ans","22 ans","23 ans","24 ans"], correct:0, exp:"Pogačar avait 21 ans et 362 jours lors de sa victoire sur le Tour 2020, 3ème plus jeune vainqueur de l'histoire." },

  // ── COURSES ──
  { cat:"courses", diff:"facile", q:"Quelle est la longueur approximative du Tour de France ?", opts:["2 800 km","3 200 km","3 500 km","4 000 km"], correct:2, exp:"Le Tour fait environ 3 400-3 500 km sur 21 étapes. C'est la plus grande course cycliste du monde." },
  { cat:"courses", diff:"facile", q:"Dans quelle ville se termine le Tour de France ?", opts:["Nice","Paris","Bordeaux","Lyon"], correct:1, exp:"Le Tour se termine sur les Champs-Élysées à Paris depuis 1975." },
  { cat:"courses", diff:"facile", q:"Quel est le surnom de Paris-Roubaix ?", opts:["La Reine","L'Enfer du Nord","La Primavera","La Doyenne"], correct:1, exp:"Paris-Roubaix est 'L'Enfer du Nord' à cause de ses secteurs pavés redoutables." },
  { cat:"courses", diff:"facile", q:"Combien de Grands Tours existent ?", opts:["2","3","4","5"], correct:1, exp:"3 Grands Tours : Tour de France (juillet), Giro d'Italia (mai), Vuelta a España (août-septembre)." },
  { cat:"courses", diff:"moyen", q:"Quelle est la longueur du secteur pavé 'Trouée d'Arenberg' ?", opts:["1,2 km","2,4 km","3,7 km","4,9 km"], correct:1, exp:"La Trouée d'Arenberg fait 2,4 km, notée 5 étoiles. C'est le secteur le plus redouté de Paris-Roubaix." },
  { cat:"courses", diff:"moyen", q:"En quel mois se dispute Liège-Bastogne-Liège ?", opts:["Mars","Avril","Mai","Octobre"], correct:1, exp:"LBL se dispute fin avril, généralement le dernier dimanche. C'est la dernière classique de printemps." },
  { cat:"courses", diff:"moyen", q:"Quel col a été franchi pour la 1ère fois sur le Tour en 1910 ?", opts:["Galibier","Aubisque","Tourmalet","Aspin"], correct:2, exp:"Le Tourmalet (2 115 m) a été franchi pour la 1ère fois en 1910. C'est le col le plus emprunté du Tour (80+ fois)." },
  { cat:"courses", diff:"difficile", q:"Combien de secteurs pavés comporte Paris-Roubaix en 2024 ?", opts:["26","29","32","35"], correct:1, exp:"Paris-Roubaix 2024 comportait 29 secteurs pavés pour ~54,5 km de pavés au total." },
  { cat:"courses", diff:"difficile", q:"Sur quel vélodrome se termine Paris-Roubaix ?", opts:["Jean Stablinski","André Pétrieux","Vélodrome de Roubaix","Vélodrome de Lille"], correct:2, exp:"Paris-Roubaix se termine au Vélodrome de Roubaix (dit André Pétrieux) depuis 1943. Arrivée mythique en cendrée." },
  { cat:"courses", diff:"expert", q:"Quelle est la longueur totale de Paris-Roubaix ?", opts:["220 km","257 km","290 km","310 km"], correct:1, exp:"Paris-Roubaix fait ~257 km entre Compiègne et le Vélodrome de Roubaix." },
  // 5 nouvelles courses
  { cat:"courses", diff:"facile", q:"Quelle course cycliste est disputée en Belgique et surnommée 'Le Mur' ?", opts:["Tour des Flandres","Gand-Wevelgem","Amstel Gold Race","La Flèche Wallonne"], correct:3, exp:"La Flèche Wallonne se termine au Mur de Huy (600 m à 9,3% de moyenne), l'une des arrivées les plus sélectives du calendrier." },
  { cat:"courses", diff:"moyen", q:"Quelle est la dénivelée du Mur de Huy, arrivée de La Flèche Wallonne ?", opts:["200 m","260 m","310 m","380 m"], correct:1, exp:"Le Mur de Huy fait 1 300 m avec 260 m de dénivelé, soit une pente moyenne de 9,3% avec des passages à 19%." },
  { cat:"courses", diff:"moyen", q:"En quelle année le Strade Bianche a-t-il obtenu le statut de Monument ?", opts:["2007","2015","2017","2020"], correct:2, exp:"Le Strade Bianche a été élevé au rang de Monument UCI en 2017. Créé en 2007, il se dispute sur les chemins blancs de Toscane." },
  { cat:"courses", diff:"difficile", q:"Quelle est la longueur approximative de Milan-San Remo ?", opts:["252 km","275 km","298 km","310 km"], correct:2, exp:"Milan-San Remo fait ~298 km, ce qui en fait la plus longue classique d'un jour du calendrier WorldTour." },
  { cat:"courses", diff:"expert", q:"En quelle année le Tour de France a-t-il débuté pour la première fois ?", opts:["1895","1901","1903","1910"], correct:2, exp:"Le premier Tour de France a eu lieu du 1er au 19 juillet 1903. Maurice Garin l'a remporté en 6 étapes." },

  // ── RECORDS ──
  { cat:"records", diff:"facile", q:"Quel est le record de l'heure UCI actuel ?", opts:["54,5 km","55,5 km","56,8 km","57,9 km"], correct:2, exp:"Filippo Ganna détient le record de l'heure avec 56,792 km depuis octobre 2022 à Grenchen." },
  { cat:"records", diff:"facile", q:"Combien d'étapes comporte un Grand Tour ?", opts:["17","19","21","23"], correct:2, exp:"Un Grand Tour comporte 21 étapes sur 23 jours (avec 2 jours de repos)." },
  { cat:"records", diff:"moyen", q:"Combien de victoires à Milan-San Remo détient Eddy Merckx ?", opts:["5","7","8","3"], correct:1, exp:"Merckx a remporté Milan-San Remo 7 fois (1966-1976), record absolu sur cette course." },
  { cat:"records", diff:"moyen", q:"Combien de coureurs partent au départ du Tour de France ?", opts:["120","160","176","200"], correct:2, exp:"176 coureurs (22 équipes de 8) prennent le départ du Tour depuis 2018." },
  { cat:"records", diff:"difficile", q:"Quelle puissance maximale un sprinter top niveau peut-il développer ?", opts:["1 000 W","1 200 W","1 600 W","2 000 W"], correct:2, exp:"Les meilleurs sprinters (Kittel, Greipel, Cavendish) ont enregistré jusqu'à 1 600-1 700 W en pointe de sprint." },
  { cat:"records", diff:"expert", q:"Quelle VAM (m/h) représente un niveau d'élite absolue en montagne ?", opts:["1 500 m/h","1 700 m/h","1 900 m/h","2 100 m/h"], correct:2, exp:"Une VAM de ~1 850-1 950 m/h correspond aux meilleures performances sur le Tour. Coppi dépassait 1 900 m/h sur les grands cols." },
  // 5 nouvelles records
  { cat:"records", diff:"facile", q:"Quel est approximativement le record du Mont Ventoux depuis Bédoin ?", opts:["45 min","55 min","1h05","1h15"], correct:1, exp:"Iban Mayo a grimpé le Ventoux en 55'51\" lors du Tour 2004. Les meilleures performances tournent autour de 55-58 minutes." },
  { cat:"records", diff:"moyen", q:"Combien de points UCI rapporte une victoire sur le Tour de France au vainqueur ?", opts:["500","750","1000","1500"], correct:2, exp:"Une victoire sur le Tour de France rapporte 1 000 points UCI au vainqueur, maximum avec le Mondial." },
  { cat:"records", diff:"moyen", q:"Quel est le record de vitesse moyenne sur le Tour de France ?", opts:["39,7 km/h","41,5 km/h","43,1 km/h","45,0 km/h"], correct:1, exp:"Lance Armstrong a établi le record de vitesse moyenne en 2005 avec 41,654 km/h (résultats ensuite annulés). Le record 'officiel' est légèrement inférieur." },
  { cat:"records", diff:"difficile", q:"Quelle est la pente maximale enregistrée sur un col du Giro d'Italia ?", opts:["18%","22%","27%","31%"], correct:2, exp:"Le Monte Zoncolan et le Mortirolo ont des passages à 27% de pente, parmi les plus raides du monde en compétition." },
  { cat:"records", diff:"expert", q:"À combien s'élevait la puissance développée par Vingegaard lors de sa montée du Granon 2022 (estimation) ?", opts:["5,6 W/kg","5,9 W/kg","6,0 W/kg","6,4 W/kg"], correct:2, exp:"Les analyses estimaient Vingegaard à ~6,0-6,1 W/kg sur le Granon 2022, lors de l'étape qui lui a offert le Tour." },

  // ── ACTUALITÉ ──
  { cat:"actualite", diff:"facile", q:"Quelle équipe WorldTour a recruté Pogačar depuis ses débuts ?", opts:["Jumbo-Visma","UAE Emirates","INEOS","Bahrain"], correct:1, exp:"Pogačar est chez UAE Team Emirates depuis 2019 et y a remporté tous ses grands succès." },
  { cat:"actualite", diff:"facile", q:"Quel est le maillot du leader du classement général sur le Tour ?", opts:["Blanc","Vert","Jaune","À pois"], correct:2, exp:"Le maillot jaune est porté par le leader au général depuis 1919, couleur du papier journal de l'organisateur L'Auto." },
  { cat:"actualite", diff:"facile", q:"Quelle équipe Primož Roglič a-t-il rejoint en 2024 ?", opts:["BORA","UAE","Red Bull-BORA","Quick-Step"], correct:2, exp:"Roglič a rejoint Red Bull-BORA-Hansgrohe en 2024 après son départ de Jumbo-Visma." },
  { cat:"actualite", diff:"moyen", q:"Quelle équipe a dominé le WorldTour par équipes en 2023 ?", opts:["UAE","INEOS","Jumbo-Visma","Quick-Step"], correct:2, exp:"Jumbo-Visma a dominé 2023 : Tour (Vingegaard), Giro+Vuelta (Roglič), classiques (Van Aert)." },
  { cat:"actualite", diff:"moyen", q:"Combien d'équipes WorldTour existent en 2024 ?", opts:["16","18","22","25"], correct:1, exp:"18 équipes WorldTour composent le top niveau du cyclisme en 2024, automatiquement invitées sur tout le calendrier WorldTour." },
  { cat:"actualite", diff:"difficile", q:"Quel est le salaire annuel estimé de Pogačar en 2024 ?", opts:["2-3M€","5-6M€","8-10M€","12-15M€"], correct:2, exp:"Pogačar serait parmi les cyclistes les mieux payés avec un salaire estimé entre 8 et 10 millions d'euros chez UAE." },
  { cat:"actualite", diff:"expert", q:"Quel est le seul Belge à avoir remporté la Vuelta avant Evenepoel en 2022 ?", opts:["Maertens","Thévenet","Van Impe","De Muynck"], correct:3, exp:"Johan De Muynck a remporté la Vuelta en 1978, dernier Belge avant Evenepoel 44 ans plus tard." },
  // 5 nouvelles actualité
  { cat:"actualite", diff:"facile", q:"Qui est le directeur sportif historique de l'équipe UAE Team Emirates ?", opts:["Mauro Gianetti","Dave Brailsford","Richard Plugge","Marc Madiot"], correct:0, exp:"Mauro Gianetti est le manager général d'UAE Team Emirates, l'architecte de l'équipe qui a bâti le projet autour de Pogačar." },
  { cat:"actualite", diff:"moyen", q:"Quel coureur français a terminé meilleur Français du Tour de France 2024 ?", opts:["Bardet","Gaudu","Jorgenson","Martinez"], correct:2, exp:"Matteo Jorgenson (Visma) a été le meilleur 'Français' du Tour 2024, bien que d'origine américaine il roule sous licence française." },
  { cat:"actualite", diff:"moyen", q:"Quel organisme gère le règlement technique et sportif du cyclisme professionnel ?", opts:["ASO","RCS Sport","UCI","Eurosport"], correct:2, exp:"L'UCI (Union Cycliste Internationale), dont le siège est à Aigle (Suisse), gère les règles du cyclisme professionnel mondial." },
  { cat:"actualite", diff:"difficile", q:"Dans quelle ville suisse se trouve le siège de l'UCI ?", opts:["Genève","Lausanne","Aigle","Berne"], correct:2, exp:"L'UCI a son siège à Aigle, dans le canton de Vaud en Suisse, au Centre Mondial du Cyclisme." },
  { cat:"actualite", diff:"expert", q:"Quelle est la durée minimale de suspension pour dopage selon le Code Mondial Antidopage actuel ?", opts:["1 an","2 ans","4 ans","8 ans"], correct:1, exp:"Le Code Mondial Antidopage prévoit une suspension de 2 ans pour un premier manquement aux règles antidopage, pouvant aller jusqu'à 4 ans en cas de faute intentionnelle avérée." },

  // ══════════════════════════════
  // +50 NOUVELLES QUESTIONS
  // ══════════════════════════════

  // ── PALMARÈS (10) ──
  { cat:"palmares", diff:"facile", q:"Qui a remporté Milan-San Remo 2024 ?", opts:["Mathieu van der Poel","Tadej Pogačar","Jasper Philipsen","Julian Alaphilippe"], correct:1, exp:"Pogačar a remporté Milan-San Remo 2024, prouvant encore une fois sa polyvalence exceptionnelle entre classiques et grands tours." },
  { cat:"palmares", diff:"facile", q:"Qui a remporté Strade Bianche 2024 ?", opts:["Van der Poel","Pogačar","Evenepoel","Van Aert"], correct:1, exp:"Pogačar a remporté Strade Bianche 2024 dans une démonstration de force sur les chemins blancs de Toscane." },
  { cat:"palmares", diff:"facile", q:"Quel coureur colombien a remporté le Tour de France 2019 ?", opts:["Nairo Quintana","Rigoberto Urán","Egan Bernal","Miguel Ángel López"], correct:2, exp:"Egan Bernal est devenu à 22 ans le premier Colombien à remporter le Tour de France en 2019, avec Team Ineos." },
  { cat:"palmares", diff:"moyen", q:"Combien de fois Alejandro Valverde a-t-il remporté Liège-Bastogne-Liège ?", opts:["2","3","4","5"], correct:2, exp:"Valverde a remporté LBL 4 fois (2006, 2008, 2015, 2017), son monument de prédilection, à seulement 1 victoire de Merckx." },
  { cat:"palmares", diff:"moyen", q:"Qui a remporté le premier Tour de France de l'histoire en 1903 ?", opts:["Hippolyte Aucouturier","Léon Georget","Maurice Garin","Louis Trousselier"], correct:2, exp:"Maurice Garin a remporté le premier Tour de France en 1903, parcourant 2 428 km en 6 étapes à une moyenne de 25,3 km/h." },
  { cat:"palmares", diff:"moyen", q:"Combien de fois Roger De Vlaeminck a-t-il remporté Paris-Roubaix ?", opts:["2","3","4","5"], correct:2, exp:"Roger De Vlaeminck a gagné Paris-Roubaix 4 fois (1972, 1974, 1975, 1977), lui valant le surnom de 'Monsieur Paris-Roubaix'." },
  { cat:"palmares", diff:"moyen", q:"En quelle année Marco Pantani a-t-il réalisé le doublé Giro-Tour ?", opts:["1996","1997","1998","1999"], correct:2, exp:"Marco Pantani a réalisé le légendaire doublé Giro-Tour en 1998, dernier coureur à réussir cet exploit avant Pogačar en 2024." },
  { cat:"palmares", diff:"difficile", q:"Quel coureur a remporté le plus grand nombre de Vuelta a España ?", opts:["Contador (4)","Anquetil (1)","Roblès (3)","Roglič (4)"], correct:3, exp:"Primož Roglič a égalé le record de 4 victoires sur la Vuelta (2019, 2020, 2021, 2024), rejoignant Alberto Contador et Roberto Heras." },
  { cat:"palmares", diff:"difficile", q:"Quel est le seul Australien à avoir remporté le Tour de France ?", opts:["Michael Rogers","Cadel Evans","Richie Porte","Rohan Dennis"], correct:1, exp:"Cadel Evans est le seul Australien à avoir remporté le Tour de France, en 2011 à 34 ans, le plus vieux vainqueur de l'ère moderne." },
  { cat:"palmares", diff:"expert", q:"Quelle est la plus grande marge de victoire sur le Tour de France depuis 1990 ?", opts:["Indurain 1995 : 4'35\"","Wiggins 2012 : 3'21\"","Froome 2015 : 1'12\"","Pogačar 2020 : 59\""], correct:0, exp:"Miguel Indurain a remporté le Tour 1995 avec 4'35\" d'avance, la plus grande marge dans l'ère moderne du Tour après Armstrong (annulé)." },

  // ── COUREURS (10) ──
  { cat:"coureurs", diff:"facile", q:"Quelle est la nationalité de Jonas Vingegaard ?", opts:["Norvégien","Suédois","Danois","Finlandais"], correct:2, exp:"Jonas Vingegaard est danois, né à Hillerslev le 10 janvier 1997. Il est devenu un héros national au Danemark après ses victoires sur le Tour." },
  { cat:"coureurs", diff:"facile", q:"Dans quelle équipe court Egan Bernal depuis 2019 ?", opts:["UAE Emirates","Movistar","Ineos Grenadiers","Bahrain"], correct:2, exp:"Egan Bernal a rejoint ce qui s'appelait Team Sky en 2017, devenu Team Ineos puis Ineos Grenadiers, où il a remporté le Tour 2019 et le Giro 2021." },
  { cat:"coureurs", diff:"moyen", q:"En quelle année Remco Evenepoel a-t-il remporté la Clásica San Sebastián, sa première grande victoire WorldTour ?", opts:["2018","2019","2020","2021"], correct:1, exp:"Evenepoel a remporté la Clásica San Sebastián en 2019 à seulement 19 ans, annonçant au monde l'émergence d'un prodige." },
  { cat:"coureurs", diff:"moyen", q:"Quel est le poids moyen d'un grimpeur de haut niveau (ex: Pogačar, Vingegaard) ?", opts:["55-58 kg","63-67 kg","70-74 kg","78-82 kg"], correct:1, exp:"Les meilleurs grimpeurs du Tour pèsent généralement entre 63 et 67 kg pour 175-180 cm, donnant un rapport poids/puissance optimal." },
  { cat:"coureurs", diff:"moyen", q:"Dans quelle ville belge est né Eddy Merckx ?", opts:["Liège","Meensel-Kiezegem","Gand","Bruxelles"], correct:1, exp:"Eddy Merckx est né le 17 juin 1945 à Meensel-Kiezegem (Brabant flamand), et a grandi à Woluwé-Saint-Pierre près de Bruxelles." },
  { cat:"coureurs", diff:"moyen", q:"Quel coureur français a remporté Paris-Roubaix 4 fois consécutives dans les années 1960 ?", opts:["Raymond Poulidor","Jacques Anquetil","Rik Van Looy","Rik Van Steenbergen"], correct:0, exp:"Non, c'est une question piège : aucun Français n'a fait cela. Roger De Vlaeminck et Rik Van Looy ont dominé Roubaix dans les années 60-70." },
  { cat:"coureurs", diff:"difficile", q:"À quel âge Bernard Hinault a-t-il remporté son premier Tour de France ?", opts:["22 ans","23 ans","24 ans","25 ans"], correct:1, exp:"Bernard Hinault avait 23 ans lors de sa première victoire sur le Tour 1978, faisant de lui l'un des plus jeunes vainqueurs de l'ère moderne." },
  { cat:"coureurs", diff:"difficile", q:"Quelle est la taille approximative de Tadej Pogačar ?", opts:["168 cm","176 cm","181 cm","186 cm"], correct:1, exp:"Pogačar mesure 176 cm pour 65 kg environ, un gabarit idéal qui lui permet d'exceller aussi bien en montagne que sur les classiques." },
  { cat:"coureurs", diff:"expert", q:"Combien de Grands Tours différents Eddy Merckx a-t-il remportés au moins une fois ?", opts:["1 (que le Tour)","2 (Tour + Giro)","3 (les trois)","Aucun"], correct:2, exp:"Merckx a remporté les 3 Grands Tours : Tour de France (5x), Giro d'Italia (5x) et Vuelta a España (1x) — 11 Grands Tours au total." },
  { cat:"coureurs", diff:"expert", q:"Quel coureur américain a remporté 7 Tours de France, tous ensuite annulés ?", opts:["Greg LeMond","Tyler Hamilton","Floyd Landis","Lance Armstrong"], correct:3, exp:"Lance Armstrong a remporté les Tours 1999-2005, mais l'UCI a annulé ses résultats en 2012 suite à l'enquête antidopage de l'USADA." },

  // ── COURSES (10) ──
  { cat:"courses", diff:"facile", q:"Dans quelle ville belge commence le Tour des Flandres ?", opts:["Bruges","Anvers","Gand","Courtrai"], correct:2, exp:"Le Tour des Flandres part depuis Anvers jusqu'en 2012, puis depuis Bruges, et se termine à Audenarde depuis 2012. Départ actuel : Anvers." },
  { cat:"courses", diff:"facile", q:"Quelle course italienne se dispute sur des 'strade bianche' (chemins blancs) ?", opts:["Milan-San Remo","Strade Bianche","Tirreno-Adriatico","Il Lombardia"], correct:1, exp:"Strade Bianche se dispute à Sienne (Toscane) sur des routes en gravier blanc. Elle est devenue Monument en 2017 et est l'une des courses les plus spectaculaires du calendrier." },
  { cat:"courses", diff:"facile", q:"Quel est le col emblématique à 21 lacets du Tour de France ?", opts:["Galibier","Ventoux","Tourmalet","Alpe d'Huez"], correct:3, exp:"L'Alpe d'Huez est célèbre pour ses 21 virages numérotés à l'envers. Elle a été gravie pour la 1ère fois sur le Tour en 1952, avec la victoire de Coppi." },
  { cat:"courses", diff:"moyen", q:"Combien de lacets comporte la montée de l'Alpe d'Huez ?", opts:["17","21","25","29"], correct:1, exp:"L'Alpe d'Huez compte exactement 21 virages, chacun baptisé du nom d'un vainqueur d'étape. La montée fait 13,8 km à 8,1% de moyenne." },
  { cat:"courses", diff:"moyen", q:"Dans quelle ville espagnole se termine habituellement la Vuelta a España ?", opts:["Barcelone","Bilbao","Madrid","Séville"], correct:2, exp:"La Vuelta se termine traditionnellement à Madrid depuis 1975, avec une arrivée sur le Paseo del Prado ou le circuit de la ville." },
  { cat:"courses", diff:"moyen", q:"En quelle année le Tour de France a-t-il eu son Grand Départ au Royaume-Uni ?", opts:["2007","2010","2014","2018"], correct:2, exp:"Le Grand Départ 2014 s'est déroulé au Yorkshire (Angleterre) les 5 et 6 juillet, avec une foule record estimée à 1,5 million de spectateurs." },
  { cat:"courses", diff:"moyen", q:"Quelle est la longueur de la montée de l'Alpe d'Huez depuis Le Bourg-d'Oisans ?", opts:["10,5 km","13,8 km","17,2 km","21,0 km"], correct:1, exp:"L'Alpe d'Huez fait 13,8 km depuis Le Bourg-d'Oisans avec 1 071 m de dénivelé, soit 8,1% de moyenne et des pointes à 13%." },
  { cat:"courses", diff:"difficile", q:"Combien de fois le Col du Tourmalet a-t-il été gravi sur le Tour de France ?", opts:["Plus de 50 fois","Plus de 70 fois","Plus de 80 fois","Plus de 100 fois"], correct:2, exp:"Le Tourmalet a été franchi plus de 85 fois dans l'histoire du Tour, ce qui en fait le col le plus emprunté. Record absolu sur le Tour de France." },
  { cat:"courses", diff:"difficile", q:"Quel est le record de l'ascension de l'Alpe d'Huez en course (Tour de France) ?", opts:["36'50\"","37'35\"","39'41\"","41'08\""], correct:0, exp:"Marco Pantani détient le record de l'Alpe d'Huez en compétition avec 36'50\" en 1995, un chrono qui reste légendaire malgré les doutes sur les méthodes de l'époque." },
  { cat:"courses", diff:"expert", q:"En quelle année le Tour de France a-t-il été créé et par quel journal ?", opts:["1900 · Le Vélo","1903 · L'Auto","1905 · L'Humanité","1910 · Le Petit Journal"], correct:1, exp:"Le Tour de France a été créé en 1903 par Henri Desgrange, directeur du journal L'Auto (ancêtre de L'Équipe), pour booster les ventes face à son concurrent Le Vélo." },

  // ── RECORDS (10) ──
  { cat:"records", diff:"facile", q:"Quelle vitesse approximative est atteinte lors d'un sprint final sur le Tour de France ?", opts:["55-60 km/h","65-70 km/h","75-80 km/h","85-90 km/h"], correct:1, exp:"Les sprints massifs du Tour se concluent à des vitesses de 65 à 70 km/h, parfois plus sur des arrivées favorables avec beaucoup de peloton dans le dos." },
  { cat:"records", diff:"facile", q:"Combien de jours dure un Grand Tour (avec jours de repos) ?", opts:["18 jours","21 jours","23 jours","25 jours"], correct:2, exp:"Un Grand Tour dure 23 jours au total : 21 étapes + 2 jours de repos, généralement répartis après la 1ère et la 2ème semaine." },
  { cat:"records", diff:"moyen", q:"Quel est le record de vitesse sur un contre-la-montre du Tour de France ?", opts:["52,6 km/h","54,5 km/h","58,2 km/h","61,7 km/h"], correct:1, exp:"Le record de vitesse moyenne sur un CLM du Tour tourne autour de 54-55 km/h sur des parcours plats et favorables. Contre-la-montre de Granville 2016 (Froome) : 54,5 km/h." },
  { cat:"records", diff:"moyen", q:"Quelle est la consommation calorique approximative d'un coureur sur une étape de montagne ?", opts:["2 500 kcal","4 000 kcal","6 500 kcal","9 000 kcal"], correct:2, exp:"Sur une étape de montagne de 5-6 heures, un coureur du Tour dépense environ 6 000 à 7 000 kcal. C'est l'équivalent de 3 repas normaux... par heure." },
  { cat:"records", diff:"moyen", q:"Quel est le poids minimum légal d'un vélo de compétition UCI ?", opts:["5,0 kg","6,8 kg","7,5 kg","8,2 kg"], correct:1, exp:"L'UCI impose un poids minimum de 6,8 kg pour les vélos de course depuis 2000. Cette règle empêche les équipes d'utiliser des vélos trop légers qui pourraient compromettre la sécurité." },
  { cat:"records", diff:"moyen", q:"Combien de vélos utilise approximativement une équipe WorldTour sur le Tour de France ?", opts:["20-30","50-60","90-100","150-200"], correct:2, exp:"Une équipe WorldTour amène environ 90 à 100 vélos sur le Tour (plusieurs par coureur : route, CLM, spare), représentant plusieurs millions d'euros de matériel." },
  { cat:"records", diff:"difficile", q:"Quel est le VO2max approximatif (mL/kg/min) d'un champion comme Pogačar ou Vingegaard ?", opts:["65-70","75-80","85-90","95-100"], correct:2, exp:"Les meilleurs cyclistes de Grand Tour affichent un VO2max estimé entre 85 et 90+ mL/kg/min. Indurain aurait atteint 88, Merckx 83. Ces chiffres sont parmi les plus élevés jamais mesurés." },
  { cat:"records", diff:"difficile", q:"Quelle est la cadence de pédalage (RPM) préconisée par Lance Armstrong, qui a popularisé le 'pédalage rapide' ?", opts:["60-70 RPM","80-90 RPM","100-110 RPM","120-130 RPM"], correct:2, exp:"Armstrong pédalait à 100-110 RPM en montagne, bien au-delà des standards de l'époque (80 RPM). Cette technique a été popularisée et est aujourd'hui la norme chez les pros." },
  { cat:"records", diff:"expert", q:"Quel est le record de vitesse descendante en compétition officielle sur route ?", opts:["112 km/h","128 km/h","143 km/h","167 km/h"], correct:2, exp:"Lors de la descente du Col de la Loze sur le Tour 2020, des vitesses de 128-130 km/h ont été atteintes. Des records non officiels dépassent 143 km/h lors de descentes extrêmes." },
  { cat:"records", diff:"expert", q:"Depuis quelle année l'UCI impose-t-elle la règle du poids minimum de 6,8 kg pour les vélos ?", opts:["1996","2000","2004","2008"], correct:1, exp:"La règle du poids minimum à 6,8 kg a été instituée en 2000 après que des constructeurs aient présenté des vélos de moins de 5 kg, jugés dangereux par l'UCI." },

  // ── ACTUALITÉ (10) ──
  { cat:"actualite", diff:"facile", q:"Quelle course WorldTour française d'une semaine se dispute en juin ?", opts:["Paris-Nice","Critérium du Dauphiné","Tour du Var","Tour de Wallonie"], correct:1, exp:"Le Critérium du Dauphiné se dispute en juin dans les Alpes françaises, c'est le principal tour de préparation avant le Tour de France pour les favoris." },
  { cat:"actualite", diff:"facile", q:"Quel est l'organisateur historique du Tour de France ?", opts:["UCI","RCS Sport","ASO","Eurosport"], correct:2, exp:"ASO (Amaury Sport Organisation) organise le Tour de France depuis des décennies. ASO possède aussi Paris-Roubaix, La Flèche Wallonne, Liège-Bastogne-Liège et le Dakar." },
  { cat:"actualite", diff:"moyen", q:"En quelle année le Tour de France a-t-il eu son Grand Départ pour la 1ère fois hors de France ?", opts:["1954","1958","1965","1973"], correct:0, exp:"Le Tour de France a eu son premier Grand Départ hors de France en 1954, à Amsterdam (Pays-Bas). Depuis, de nombreuses villes étrangères ont accueilli le départ." },
  { cat:"actualite", diff:"moyen", q:"Quel réseau de télévision retransmet le cyclisme WorldTour en France ?", opts:["Canal+","France Télévisions","Eurosport / Discovery+","TF1"], correct:2, exp:"Eurosport (groupe Discovery+) détient les droits exclusifs du cyclisme WorldTour en France, diffusant l'intégralité des étapes du Tour, Giro et Vuelta." },
  { cat:"actualite", diff:"moyen", q:"Quelle technologie a révolutionné la préparation des coureurs depuis les années 2010 ?", opts:["GPS seul","Capteurs de puissance","Cardiofréquencemètre","Pneus tubeless"], correct:1, exp:"Les capteurs de puissance (mesure des watts en temps réel) ont transformé l'entraînement cycliste depuis leur démocratisation dans les années 2010, permettant une préparation ultra-précise." },
  { cat:"actualite", diff:"moyen", q:"Quelle équipe WorldTour a été fondée par le milliardaire Flavio Briatore dans les années 2000 ?", opts:["Astana","Katusha","Benetton Cycling","Aucune, il n'a pas d'équipe cycliste"], correct:3, exp:"Flavio Briatore n'a pas d'équipe cycliste. C'est une question piège : il est connu en F1 (Renault/Benetton) mais pas dans le cyclisme professionnel." },
  { cat:"actualite", diff:"difficile", q:"Quel est le budget annuel approximatif d'une grande équipe WorldTour comme Ineos Grenadiers ?", opts:["5-10 M€","20-30 M€","40-55 M€","80-100 M€"], correct:2, exp:"Une grande équipe WorldTour comme Ineos Grenadiers fonctionne avec un budget estimé entre 40 et 55 millions d'euros par an, couvrant salaires, matériel, staff et logistique." },
  { cat:"actualite", diff:"difficile", q:"Combien de km/an parcourt un coureur WorldTour à l'entraînement et en course ?", opts:["10 000-15 000 km","20 000-25 000 km","30 000-35 000 km","45 000-50 000 km"], correct:2, exp:"Un coureur WorldTour effectue environ 30 000 à 35 000 km par an entre entraînement et courses, soit l'équivalent de presque un tour du monde à vélo." },
  { cat:"actualite", diff:"expert", q:"Quel est le nom du système de points UCI permettant de qualifier les équipes pour le WorldTour ?", opts:["UCI ProScore","UCI WT Index","UCI WorldRanking","Points UCI individuels"], correct:2, exp:"L'UCI WorldRanking est le système de classement individuel et par équipe qui détermine les qualifications et invitations aux épreuves WorldTour. Il est cumulatif sur 12 mois glissants." },
  { cat:"actualite", diff:"expert", q:"Combien d'équipes ProTeam (2ème division) peuvent être invitées sur un Grand Tour ?", opts:["0 (réservé WorldTour)","2 wild-cards","3 wild-cards","5 wild-cards"], correct:2, exp:"Les organisateurs d'un Grand Tour peuvent inviter jusqu'à 3 équipes ProTeam (wild-cards) en plus des 18 équipes WorldTour automatiquement qualifiées, pour un total de 22 équipes." },
];

// ─────────────────────────────────────────────
// HISTORICAL WINNERS — WorldTour 1950-2024
// Source : procyclingstats.com
// ─────────────────────────────────────────────
const RACE_GROUPS = {
  "Grands Tours":    { color:"#f97316", icon:"🏔️" },
  "Monuments":       { color:"#facc15", icon:"🏛️" },
  "Classiques":      { color:"#a78bfa", icon:"⚡" },
  "Courses hebdo":   { color:"#34d399", icon:"📅" },
  "1.Pro / 2.Pro":   { color:"#fb923c", icon:"🏁" },
};

const HISTORY = {
  // ══ GRANDS TOURS ══════════════════════════════════════════
  "Tour de France": { group:"Grands Tours", icon:"🇫🇷", winners:[
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"4e Tour"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Jonas Vingegaard",country:"🇩🇰",team:"Jumbo-Visma"},
    {year:2022,winner:"Jonas Vingegaard",country:"🇩🇰",team:"Jumbo-Visma"},
    {year:2021,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2020,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Geraint Thomas",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Team Sky"},
    {year:2017,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2016,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2015,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2014,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Astana"},
    {year:2013,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2012,winner:"Bradley Wiggins",country:"🇬🇧",team:"Team Sky"},
    {year:2011,winner:"Cadel Evans",country:"🇦🇺",team:"BMC Racing"},
    {year:2010,winner:"Andy Schleck",country:"🇱🇺",team:"RadioShack"},
    {year:2009,winner:"Alberto Contador",country:"🇪🇸",team:"Astana"},
    {year:2008,winner:"Carlos Sastre",country:"🇪🇸",team:"CSC"},
    {year:2007,winner:"Alberto Contador",country:"🇪🇸",team:"Discovery Channel"},
    {year:2006,winner:"Óscar Pereiro",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Lance Armstrong *",country:"🇺🇸",team:"Discovery Channel",note:"Annulé UCI 2012"},
    {year:2004,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:2003,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:2002,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:2001,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:2000,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:1999,winner:"Lance Armstrong *",country:"🇺🇸",team:"US Postal",note:"Annulé UCI 2012"},
    {year:1998,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1997,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1996,winner:"Bjarne Riis *",country:"🇩🇰",team:"Deutsche Telekom",note:"Aveux dopage 2007"},
    {year:1995,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1994,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1993,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1990,winner:"Greg LeMond",country:"🇺🇸",team:"Z"},
    {year:1989,winner:"Greg LeMond",country:"🇺🇸",team:"ADR"},
    {year:1988,winner:"Pedro Delgado",country:"🇪🇸",team:"Reynolds"},
    {year:1987,winner:"Stephen Roche",country:"🇮🇪",team:"Carrera"},
    {year:1986,winner:"Greg LeMond",country:"🇺🇸",team:"La Vie Claire"},
    {year:1985,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1984,winner:"Laurent Fignon",country:"🇫🇷",team:"Renault"},
    {year:1983,winner:"Laurent Fignon",country:"🇫🇷",team:"Renault"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1979,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1978,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1977,winner:"Bernard Thévenet",country:"🇫🇷",team:"Peugeot"},
    {year:1976,winner:"Lucien Van Impe",country:"🇧🇪",team:"Gitane"},
    {year:1975,winner:"Bernard Thévenet",country:"🇫🇷",team:"Peugeot"},
    {year:1974,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1967,winner:"Roger Pingeon",country:"🇫🇷",team:"Peugeot"},
    {year:1966,winner:"Lucien Aimar",country:"🇫🇷",team:"Ford"},
    {year:1965,winner:"Felice Gimondi",country:"🇮🇹",team:"Salvarani"},
    {year:1964,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1963,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1962,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1961,winner:"Jacques Anquetil",country:"🇫🇷",team:"Helyett"},
    {year:1960,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1959,winner:"Federico Bahamontes",country:"🇪🇸",team:"Tricofilina"},
    {year:1958,winner:"Charly Gaul",country:"🇱🇺",team:"Faema"},
    {year:1957,winner:"Jacques Anquetil",country:"🇫🇷",team:"Helyett"},
    {year:1956,winner:"Roger Walkowiak",country:"🇫🇷",team:"Nord-Est"},
    {year:1955,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1954,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1953,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1952,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1950,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
  ]},
  "Giro d'Italia": { group:"Grands Tours", icon:"🇮🇹", winners:[
    {year:2025,winner:"Simon Yates",country:"🇬🇧",team:"Visma-Lease a Bike",note:"Colle delle Finestre"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2022,winner:"Jai Hindley",country:"🇦🇺",team:"BORA-hansgrohe"},
    {year:2021,winner:"Egan Bernal",country:"🇨🇴",team:"Ineos Grenadiers"},
    {year:2020,winner:"Tao Geoghegan Hart",country:"🇬🇧",team:"Ineos Grenadiers"},
    {year:2019,winner:"Richard Carapaz",country:"🇪🇨",team:"Movistar"},
    {year:2018,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2017,winner:"Tom Dumoulin",country:"🇳🇱",team:"Team Sunweb"},
    {year:2016,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Astana"},
    {year:2015,winner:"Alberto Contador",country:"🇪🇸",team:"Tinkoff-Saxo"},
    {year:2014,winner:"Nairo Quintana",country:"🇨🇴",team:"Movistar"},
    {year:2013,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Astana"},
    {year:2012,winner:"Ryder Hesjedal",country:"🇨🇦",team:"Garmin-Barracuda"},
    {year:2011,winner:"Michele Scarponi",country:"🇮🇹",team:"Lampre",note:"Contador DQ"},
    {year:2010,winner:"Ivan Basso",country:"🇮🇹",team:"Liquigas"},
    {year:2009,winner:"Denis Menchov",country:"🇷🇺",team:"Rabobank"},
    {year:2008,winner:"Alberto Contador",country:"🇪🇸",team:"Astana"},
    {year:2007,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2006,winner:"Ivan Basso",country:"🇮🇹",team:"CSC"},
    {year:2005,winner:"Paolo Savoldelli",country:"🇮🇹",team:"Discovery Channel"},
    {year:2004,winner:"Damiano Cunego",country:"🇮🇹",team:"Saeco"},
    {year:2003,winner:"Gilberto Simoni",country:"🇮🇹",team:"Saeco"},
    {year:2002,winner:"Paolo Savoldelli",country:"🇮🇹",team:"Index-Alexia"},
    {year:2001,winner:"Gilberto Simoni",country:"🇮🇹",team:"Lampre"},
    {year:2000,winner:"Stefano Garzelli",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1999,winner:"Ivan Gotti",country:"🇮🇹",team:"Polti"},
    {year:1998,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1997,winner:"Ivan Gotti",country:"🇮🇹",team:"Saeco"},
    {year:1996,winner:"Pavel Tonkov",country:"🇷🇺",team:"Mapei"},
    {year:1995,winner:"Tony Rominger",country:"🇨🇭",team:"Mapei"},
    {year:1994,winner:"Eugeni Berzin",country:"🇷🇺",team:"Gewiss"},
    {year:1993,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Franco Chioccioli",country:"🇮🇹",team:"Del Tongo"},
    {year:1990,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Andrew Hampsten",country:"🇺🇸",team:"7-Eleven"},
    {year:1987,winner:"Stephen Roche",country:"🇮🇪",team:"Carrera"},
    {year:1986,winner:"Roberto Visentini",country:"🇮🇹",team:"Carrera"},
    {year:1985,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1984,winner:"Francesco Moser",country:"🇮🇹",team:"Gis Gelati"},
    {year:1983,winner:"Giuseppe Saronni",country:"🇮🇹",team:"Del Tongo"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Giovanni Battaglin",country:"🇮🇹",team:"Inoxpran"},
    {year:1980,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Giuseppe Saronni",country:"🇮🇹",team:"Scic"},
    {year:1978,winner:"Johan De Muynck",country:"🇧🇪",team:"Raleigh"},
    {year:1977,winner:"Michel Pollentier",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1975,winner:"Fausto Bertoglio",country:"🇮🇹",team:"Jolly Ceramica"},
    {year:1974,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Gösta Pettersson",country:"🇸🇪",team:"Ferretti"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faemino"},
    {year:1969,winner:"Felice Gimondi",country:"🇮🇹",team:"Salvarani"},
    {year:1968,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1967,winner:"Felice Gimondi",country:"🇮🇹",team:"Salvarani"},
    {year:1966,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1965,winner:"Vittorio Adorni",country:"🇮🇹",team:"Salvarani"},
    {year:1964,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford France"},
    {year:1963,winner:"Franco Balmamion",country:"🇮🇹",team:"Carpano"},
    {year:1962,winner:"Franco Balmamion",country:"🇮🇹",team:"Carpano"},
    {year:1961,winner:"Arnaldo Pambianco",country:"🇮🇹",team:"Fides"},
    {year:1960,winner:"Jacques Anquetil",country:"🇫🇷",team:"Helyett"},
    {year:1959,winner:"Charly Gaul",country:"🇱🇺",team:"Helyett"},
    {year:1958,winner:"Ercole Baldini",country:"🇮🇹",team:"Legnano"},
    {year:1957,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1956,winner:"Charly Gaul",country:"🇱🇺",team:"Guerra"},
    {year:1955,winner:"Fiorenzo Magni",country:"🇮🇹",team:"Nivea"},
    {year:1954,winner:"Carlo Clerici",country:"🇨🇭",team:"Guerra"},
    {year:1953,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1952,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1950,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
  ]},
  "Vuelta a España": { group:"Grands Tours", icon:"🇪🇸", winners:[
    {year:2025,winner:"Jonas Vingegaard",country:"🇩🇰",team:"Visma-Lease a Bike",note:"1ère Vuelta"},
    {year:2024,winner:"Primož Roglič",country:"🇸🇮",team:"Red Bull-BORA"},
    {year:2023,winner:"Sepp Kuss",country:"🇺🇸",team:"Jumbo-Visma"},
    {year:2022,winner:"Remco Evenepoel",country:"🇧🇪",team:"Quick-Step Alpha Vinyl"},
    {year:2021,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2020,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2019,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2018,winner:"Simon Yates",country:"🇬🇧",team:"Mitchelton-Scott"},
    {year:2017,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2016,winner:"Nairo Quintana",country:"🇨🇴",team:"Movistar"},
    {year:2015,winner:"Fabio Aru",country:"🇮🇹",team:"Astana"},
    {year:2014,winner:"Alberto Contador",country:"🇪🇸",team:"Tinkoff-Saxo"},
    {year:2013,winner:"Chris Horner",country:"🇺🇸",team:"RadioShack-Leopard"},
    {year:2012,winner:"Alberto Contador",country:"🇪🇸",team:"Saxo Bank"},
    {year:2011,winner:"Juan José Cobo",country:"🇪🇸",team:"Geox-TMC"},
    {year:2010,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Liquigas"},
    {year:2009,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2008,winner:"Alberto Contador",country:"🇪🇸",team:"Astana"},
    {year:2007,winner:"Denis Menchov",country:"🇷🇺",team:"Rabobank"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Denis Menchov",country:"🇷🇺",team:"Rabobank"},
    {year:2004,winner:"Roberto Heras *",country:"🇪🇸",team:"Liberty Seguros",note:"Annulé dopage"},
    {year:2003,winner:"Roberto Heras",country:"🇪🇸",team:"US Postal"},
    {year:2002,winner:"Aitor González",country:"🇪🇸",team:"Kelme"},
    {year:2001,winner:"Ángel Casero",country:"🇪🇸",team:"Festina"},
    {year:2000,winner:"Roberto Heras",country:"🇪🇸",team:"Kelme"},
    {year:1999,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1998,winner:"Abraham Olano",country:"🇪🇸",team:"Banesto"},
    {year:1997,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1996,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Tony Rominger",country:"🇨🇭",team:"Mapei"},
    {year:1993,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1992,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1991,winner:"Melchor Mauri",country:"🇪🇸",team:"ONCE"},
    {year:1990,winner:"Marco Giovannetti",country:"🇮🇹",team:"Gatorade"},
    {year:1989,winner:"Pedro Delgado",country:"🇪🇸",team:"Reynolds"},
    {year:1988,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1987,winner:"Luis Herrera",country:"🇨🇴",team:"Café de Colombia"},
    {year:1986,winner:"Álvaro Pino",country:"🇪🇸",team:"Zor"},
    {year:1985,winner:"Pedro Delgado",country:"🇪🇸",team:"Seat-Orbea"},
    {year:1984,winner:"Éric Caritoux",country:"🇫🇷",team:"Skil-Sem"},
    {year:1983,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1982,winner:"Marino Lejarreta",country:"🇪🇸",team:"Zor"},
    {year:1981,winner:"Giovanni Battaglin",country:"🇮🇹",team:"Inoxpran"},
    {year:1980,winner:"Faustino Rupérez",country:"🇪🇸",team:"Zor"},
    {year:1979,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1977,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"José Pesarrodona",country:"🇪🇸",team:"Kas"},
    {year:1975,winner:"Agustín Tamames",country:"🇪🇸",team:"TEKA"},
    {year:1974,winner:"José Manuel Fuente",country:"🇪🇸",team:"KAS"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"José Manuel Fuente",country:"🇪🇸",team:"KAS"},
    {year:1971,winner:"Ferdinand Bracke",country:"🇧🇪",team:"Peugeot"},
    {year:1970,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1969,winner:"Roger Pingeon",country:"🇫🇷",team:"Peugeot"},
    {year:1965,winner:"Rolf Wolfshohl",country:"🇩🇪",team:"Flandria"},
    {year:1964,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1962,winner:"Rudi Altig",country:"🇩🇪",team:"Margnat"},
    {year:1961,winner:"Angelino Soler",country:"🇪🇸",team:"Faema"},
    {year:1959,winner:"Antonio Suárez",country:"🇪🇸",team:"Faema"},
    {year:1958,winner:"Jean Stablinski",country:"🇫🇷",team:"Helyett"},
    {year:1957,winner:"Jesús Loroño",country:"🇪🇸",team:"Faema"},
    {year:1955,winner:"Jean Dotto",country:"🇫🇷",team:"La Perle"},
    {year:1954,winner:"Bernardo Ruiz",country:"🇪🇸",team:"KAS"},
    {year:1950,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Dunlop"},
  ]},
  // ══ MONUMENTS ══════════════════════════════════════════════
  "Milan-San Remo": { group:"Monuments", icon:"🌸", winners:[
    {year:2026,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"4e Monument différent · 11e Monument"},
    {year:2025,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck",note:"2e MSR"},
    {year:2024,winner:"Jasper Philipsen",country:"🇧🇪",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2022,winner:"Matej Mohorič",country:"🇸🇮",team:"Bahrain Victorious"},
    {year:2021,winner:"Jasper Stuyven",country:"🇧🇪",team:"Trek-Segafredo"},
    {year:2020,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2019,winner:"Julian Alaphilippe",country:"🇫🇷",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Bahrain-Merida"},
    {year:2017,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Team Sky"},
    {year:2016,winner:"Arnaud Démare",country:"🇫🇷",team:"FDJ"},
    {year:2015,winner:"John Degenkolb",country:"🇩🇪",team:"Giant-Alpecin"},
    {year:2014,winner:"Alexander Kristoff",country:"🇳🇴",team:"Katusha"},
    {year:2013,winner:"Gerald Ciolek",country:"🇩🇪",team:"MTN-Qhubeka"},
    {year:2012,winner:"Simon Gerrans",country:"🇦🇺",team:"Orica-GreenEdge"},
    {year:2011,winner:"Matthew Goss",country:"🇦🇺",team:"HTC-Highroad"},
    {year:2010,winner:"Oscar Freire",country:"🇪🇸",team:"Rabobank"},
    {year:2009,winner:"Mark Cavendish",country:"🇬🇧",team:"HTC-Columbia"},
    {year:2008,winner:"Fabian Cancellara",country:"🇨🇭",team:"Slipstream Sports"},
    {year:2007,winner:"Oscar Freire",country:"🇪🇸",team:"Rabobank"},
    {year:2006,winner:"Filippo Pozzato",country:"🇮🇹",team:"Quick-Step"},
    {year:2005,winner:"Alessandro Petacchi",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2004,winner:"Oscar Freire",country:"🇪🇸",team:"Rabobank"},
    {year:2003,winner:"Paolo Bettini",country:"🇮🇹",team:"Quick-Step"},
    {year:2002,winner:"Mario Cipollini",country:"🇮🇹",team:"Acqua & Sapone"},
    {year:2001,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:2000,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1999,winner:"Andrea Tafi",country:"🇮🇹",team:"Mapei"},
    {year:1998,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1997,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1996,winner:"Gabriele Colombo",country:"🇮🇹",team:"Mapei"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Giorgio Furlan",country:"🇮🇹",team:"Américo-Wilier"},
    {year:1993,winner:"Maurizio Fondriest",country:"🇮🇹",team:"Lampre"},
    {year:1992,winner:"Sean Kelly",country:"🇮🇪",team:"Festina"},
    {year:1991,winner:"Claudio Chiappucci",country:"🇮🇹",team:"Carrera"},
    {year:1990,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1987,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1986,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1985,winner:"Hennie Kuiper",country:"🇳🇱",team:"Panasonic"},
    {year:1984,winner:"Francesco Moser",country:"🇮🇹",team:"Gis Gelati"},
    {year:1983,winner:"Giuseppe Saronni",country:"🇮🇹",team:"Del Tongo"},
    {year:1982,winner:"Marc Gomez",country:"🇫🇷",team:"Peugeot"},
    {year:1981,winner:"Fons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1980,winner:"Pierino Gavazzi",country:"🇮🇹",team:"Bianchi"},
    {year:1979,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1977,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1976,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1975,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1974,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1973,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Michele Dancelli",country:"🇮🇹",team:"Molteni"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Rudi Altig",country:"🇩🇪",team:"Molteni"},
    {year:1967,winner:"Eddy Merckx",country:"🇧🇪",team:"Peugeot"},
    {year:1966,winner:"Eddy Merckx",country:"🇧🇪",team:"Rik"},
    {year:1965,winner:"Arie den Hartog",country:"🇳🇱",team:"Santini"},
    {year:1964,winner:"Tom Simpson",country:"🇬🇧",team:"Peugeot"},
    {year:1963,winner:"Joseph Groussard",country:"🇫🇷",team:"St Raphaël"},
    {year:1962,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1961,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1960,winner:"René Privat",country:"🇫🇷",team:"Helyett"},
    {year:1959,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1958,winner:"Ercole Baldini",country:"🇮🇹",team:"Legnano"},
    {year:1957,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1954,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1953,winner:"Loretto Petrucci",country:"🇮🇹",team:"Bianchi"},
    {year:1952,winner:"Loretto Petrucci",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1950,winner:"Gino Bartali",country:"🇮🇹",team:"Bartali"},
  ]},
  "Tour des Flandres": { group:"Monuments", icon:"🇧🇪", winners:[
    {year:2026,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"3e Flandres · solo Oude Kwaremont"},
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"2e Flandres"},
    {year:2024,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2022,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2021,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2020,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2019,winner:"Alberto Bettiol",country:"🇮🇹",team:"EF Education First"},
    {year:2018,winner:"Niki Terpstra",country:"🇳🇱",team:"Quick-Step Floors"},
    {year:2017,winner:"Philippe Gilbert",country:"🇧🇪",team:"Quick-Step Floors"},
    {year:2016,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff"},
    {year:2015,winner:"Alexander Kristoff",country:"🇳🇴",team:"Katusha"},
    {year:2014,winner:"Fabian Cancellara",country:"🇨🇭",team:"Trek"},
    {year:2013,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack-Leopard"},
    {year:2012,winner:"Tom Boonen",country:"🇧🇪",team:"Omega Pharma Quick-Step"},
    {year:2011,winner:"Nick Nuyens",country:"🇧🇪",team:"Saxo Bank"},
    {year:2010,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2009,winner:"Stijn Devolder",country:"🇧🇪",team:"Quick-Step"},
    {year:2008,winner:"Stijn Devolder",country:"🇧🇪",team:"Quick-Step"},
    {year:2007,winner:"Alessandro Ballan",country:"🇮🇹",team:"Lampre"},
    {year:2006,winner:"Leif Hoste",country:"🇧🇪",team:"Discovery Channel"},
    {year:2005,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2004,winner:"Steffen Wesemann",country:"🇩🇪",team:"T-Mobile"},
    {year:2003,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:2002,winner:"Andrea Tafi",country:"🇮🇹",team:"Mapei"},
    {year:2001,winner:"Gianluca Bortolami",country:"🇮🇹",team:"Tacconi Sport"},
    {year:2000,winner:"Andrei Tchmil",country:"🇧🇪",team:"Lotto"},
    {year:1999,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:1998,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Rolf Sørensen",country:"🇩🇰",team:"Rabobank"},
    {year:1996,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1995,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1994,winner:"Gianni Faresin",country:"🇮🇹",team:"Gewiss"},
    {year:1993,winner:"Johan Museeuw",country:"🇧🇪",team:"Lotto"},
    {year:1992,winner:"Jacky Durand",country:"🇫🇷",team:"Castorama"},
    {year:1991,winner:"Edwig Van Hooydonck",country:"🇧🇪",team:"Buckler"},
    {year:1990,winner:"Moreno Argentin",country:"🇮🇹",team:"Ariostea"},
    {year:1989,winner:"Edwig Van Hooydonck",country:"🇧🇪",team:"Buckler"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1986,winner:"Adri van der Poel",country:"🇳🇱",team:"Kwantum"},
    {year:1985,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1984,winner:"Johan Lammerts",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1983,winner:"Hennie Kuiper",country:"🇳🇱",team:"Panasonic"},
    {year:1982,winner:"René Martens",country:"🇧🇪",team:"Vermandoise"},
    {year:1981,winner:"Hennie Kuiper",country:"🇳🇱",team:"Peugeot"},
    {year:1980,winner:"Michel Pollentier",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Walter Godefroot",country:"🇧🇪",team:"Ijsboerke"},
    {year:1977,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1976,winner:"Walter Planckaert",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1974,winner:"Cees Bal",country:"🇳🇱",team:"Bic"},
    {year:1973,winner:"Eric Leman",country:"🇧🇪",team:"IJsboerke"},
    {year:1972,winner:"Eric Leman",country:"🇧🇪",team:"IJsboerke"},
    {year:1971,winner:"Evert Dolman",country:"🇳🇱",team:"Bic"},
    {year:1970,winner:"Eric Leman",country:"🇧🇪",team:"IJsboerke"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1967,winner:"Herman Van Springel",country:"🇧🇪",team:"Flandria"},
    {year:1966,winner:"Edward Sels",country:"🇧🇪",team:"Peugeot"},
    {year:1965,winner:"Jo De Roo",country:"🇳🇱",team:"Televizier"},
    {year:1964,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1963,winner:"Noël Fore",country:"🇧🇪",team:"Flandria"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Tom Simpson",country:"🇬🇧",team:"Rapha"},
    {year:1960,winner:"Arthur Decabooter",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1954,winner:"Raymond Impanis",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Fiorenzo Magni",country:"🇮🇹",team:"Nivea"},
    {year:1951,winner:"Fiorenzo Magni",country:"🇮🇹",team:"Nivea"},
    {year:1950,winner:"Fiorenzo Magni",country:"🇮🇹",team:"Nivea"},
  ]},
  "Paris-Roubaix": { group:"Monuments", icon:"🧱", winners:[
    {year:2026,winner:"Wout van Aert",country:"🇧🇪",team:"Visma-Lease a Bike",note:"1er Monument · record vitesse"},
    {year:2025,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck",note:"3e consécutif"},
    {year:2024,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2022,winner:"Dylan van Baarle",country:"🇳🇱",team:"Ineos Grenadiers"},
    {year:2021,winner:"Sonny Colbrelli",country:"🇮🇹",team:"Bahrain Victorious"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Philippe Gilbert",country:"🇧🇪",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Peter Sagan",country:"🇸🇰",team:"BORA-hansgrohe"},
    {year:2017,winner:"Greg Van Avermaet",country:"🇧🇪",team:"BMC Racing"},
    {year:2016,winner:"Mathew Hayman",country:"🇦🇺",team:"Orica-Scott"},
    {year:2015,winner:"John Degenkolb",country:"🇩🇪",team:"Giant-Alpecin"},
    {year:2014,winner:"Niki Terpstra",country:"🇳🇱",team:"Omega Pharma Quick-Step"},
    {year:2013,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack-Leopard"},
    {year:2012,winner:"Tom Boonen",country:"🇧🇪",team:"Omega Pharma Quick-Step"},
    {year:2011,winner:"Johan Vansummeren",country:"🇧🇪",team:"Garmin-Cervélo"},
    {year:2010,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2009,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2008,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2007,winner:"Stuart O'Grady",country:"🇦🇺",team:"CSC"},
    {year:2006,winner:"Fabian Cancellara",country:"🇨🇭",team:"Fassa Bortolo"},
    {year:2005,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2004,winner:"Magnus Bäckstedt",country:"🇸🇪",team:"Alessio-Bianchi"},
    {year:2003,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:2002,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:2001,winner:"Servais Knaven",country:"🇳🇱",team:"Farm Frites"},
    {year:2000,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1999,winner:"Andrea Tafi",country:"🇮🇹",team:"Mapei"},
    {year:1998,winner:"Franco Ballerini",country:"🇮🇹",team:"Mapei"},
    {year:1997,winner:"Frédéric Guesdon",country:"🇫🇷",team:"Française des Jeux"},
    {year:1996,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1995,winner:"Franco Ballerini",country:"🇮🇹",team:"Mapei"},
    {year:1994,winner:"Andrei Tchmil",country:"🇧🇪",team:"Lotto"},
    {year:1993,winner:"Gilbert Duclos-Lassalle",country:"🇫🇷",team:"ZG-Megabike"},
    {year:1992,winner:"Gilbert Duclos-Lassalle",country:"🇫🇷",team:"ZG-Megabike"},
    {year:1991,winner:"Marc Madiot",country:"🇫🇷",team:"Française des Jeux"},
    {year:1990,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1989,winner:"Jean-Marie Wampers",country:"🇧🇪",team:"ADR"},
    {year:1988,winner:"Dirk Demol",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1986,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1985,winner:"Marc Madiot",country:"🇫🇷",team:"Renault"},
    {year:1984,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1983,winner:"Hennie Kuiper",country:"🇳🇱",team:"Panasonic"},
    {year:1982,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1979,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1978,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1977,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1976,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1974,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1971,winner:"Roger Rosiers",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1968,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1967,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1966,winner:"Rudi Altig",country:"🇩🇪",team:"Molteni"},
    {year:1965,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1964,winner:"Peter Post",country:"🇳🇱",team:"Televizier"},
    {year:1963,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1960,winner:"Pino Cerami",country:"🇧🇪",team:"Végétaline"},
    {year:1959,winner:"Noël Fore",country:"🇧🇪",team:"Flandria"},
    {year:1958,winner:"Léon Van Daele",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Leandro Faggin",country:"🇮🇹",team:"Bianchi"},
    {year:1955,winner:"Jean Forestier",country:"🇫🇷",team:"Cilo"},
    {year:1954,winner:"Raymond Impanis",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1951,winner:"Antonio Bevilacqua",country:"🇮🇹",team:"Bianchi"},
    {year:1950,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
  ]},
  "Liège-Bastogne-Liège": { group:"Monuments", icon:"🌲", winners:[
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"3e LBL · 9e Monument"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Remco Evenepoel",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2022,winner:"Remco Evenepoel",country:"🇧🇪",team:"Quick-Step Alpha Vinyl"},
    {year:2021,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2020,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2019,winner:"Jakob Fuglsang",country:"🇩🇰",team:"Astana"},
    {year:2018,winner:"Bob Jungels",country:"🇱🇺",team:"Quick-Step Floors"},
    {year:2017,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2016,winner:"Wout Poels",country:"🇳🇱",team:"Team Sky"},
    {year:2015,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2014,winner:"Simon Gerrans",country:"🇦🇺",team:"Orica-GreenEdge"},
    {year:2013,winner:"Dan Martin",country:"🇮🇪",team:"Garmin-Sharp"},
    {year:2012,winner:"Maxime Monfort",country:"🇧🇪",team:"RadioShack-Nissan"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Alexandre Vinokourov",country:"🇰🇿",team:"Astana"},
    {year:2009,winner:"Andy Schleck",country:"🇱🇺",team:"Saxo Bank"},
    {year:2008,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2007,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Alexandre Vinokourov",country:"🇰🇿",team:"T-Mobile"},
    {year:2004,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2003,winner:"Tyler Hamilton",country:"🇺🇸",team:"CSC"},
    {year:2002,winner:"Axel Merckx",country:"🇧🇪",team:"Domo Farm Frites"},
    {year:2001,winner:"Oscar Freire",country:"🇪🇸",team:"Mapei"},
    {year:2000,winner:"Paolo Bettini",country:"🇮🇹",team:"Mapei"},
    {year:1999,winner:"David Etxebarria",country:"🇪🇸",team:"Euskaltel"},
    {year:1998,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1997,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1996,winner:"Pascal Richard",country:"🇨🇭",team:"MG-Technogym"},
    {year:1995,winner:"Mauro Gianetti",country:"🇨🇭",team:"Helvetia"},
    {year:1994,winner:"Evgeni Berzin",country:"🇷🇺",team:"Gewiss"},
    {year:1993,winner:"Rolf Sørensen",country:"🇩🇰",team:"Ariostea"},
    {year:1992,winner:"Dirk De Wolf",country:"🇧🇪",team:"Lotto"},
    {year:1991,winner:"Moreno Argentin",country:"🇮🇹",team:"Ariostea"},
    {year:1990,winner:"Eric Van Lancker",country:"🇧🇪",team:"Panasonic"},
    {year:1989,winner:"Sean Kelly",country:"🇮🇪",team:"PDM"},
    {year:1988,winner:"Adri van der Poel",country:"🇳🇱",team:"Kwantum"},
    {year:1987,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1986,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1985,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1984,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1983,winner:"Steven Rooks",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1982,winner:"Daniel Willems",country:"🇧🇪",team:"Elro-Snack"},
    {year:1981,winner:"Joseph Fuchs",country:"🇨🇭",team:"Cilo"},
    {year:1980,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Dietrich Thurau",country:"🇩🇪",team:"Ijsboerke"},
    {year:1978,winner:"Dietrich Thurau",country:"🇩🇪",team:"Ijsboerke"},
    {year:1977,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1976,winner:"Joseph Bruyère",country:"🇧🇪",team:"Molteni"},
    {year:1975,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1974,winner:"Georges Pintens",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Dreher"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Valère Van Sweevelt",country:"🇧🇪",team:"Peugeot"},
    {year:1967,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1966,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1965,winner:"Carmine Preziosi",country:"🇮🇹",team:"Carpano"},
    {year:1964,winner:"Willy Bocklant",country:"🇧🇪",team:"Solo"},
    {year:1963,winner:"Frans Melckenbeeck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1960,winner:"Albertus Geldermans",country:"🇳🇱",team:"Margnat"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1957,winner:"Frans Schoubben",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1954,winner:"Marcel Ernzer",country:"🇱🇺",team:"Helyett"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1951,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
    {year:1950,winner:"Brick Schotte",country:"🇧🇪",team:"Mercier"},
  ]},
  "Il Lombardia": { group:"Monuments", icon:"🍂", winners:[
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"5e consécutif · RECORD · 10e Monument"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2022,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2021,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2020,winner:"Jakob Fuglsang",country:"🇩🇰",team:"Astana"},
    {year:2019,winner:"Bauke Mollema",country:"🇳🇱",team:"Trek-Segafredo"},
    {year:2018,winner:"Thibaut Pinot",country:"🇫🇷",team:"Groupama-FDJ"},
    {year:2017,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Bahrain-Merida"},
    {year:2016,winner:"Esteban Chaves",country:"🇨🇴",team:"Orica-BikeExchange"},
    {year:2015,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Astana"},
    {year:2014,winner:"Daniel Martin",country:"🇮🇪",team:"Garmin-Sharp"},
    {year:2013,winner:"Joaquim Rodríguez",country:"🇪🇸",team:"Katusha"},
    {year:2012,winner:"Joaquim Rodríguez",country:"🇪🇸",team:"Katusha"},
    {year:2011,winner:"Oliver Zaugg",country:"🇨🇭",team:"Leopard Trek"},
    {year:2010,winner:"Igor Antón",country:"🇪🇸",team:"Euskaltel-Euskadi"},
    {year:2009,winner:"Philippe Gilbert",country:"🇧🇪",team:"Silence-Lotto"},
    {year:2008,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2007,winner:"Paolo Bettini",country:"🇮🇹",team:"Quick-Step"},
    {year:2006,winner:"Paolo Bettini",country:"🇮🇹",team:"Quick-Step"},
    {year:2005,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2004,winner:"Damiano Cunego",country:"🇮🇹",team:"Saeco"},
    {year:2003,winner:"Michele Bartoli",country:"🇮🇹",team:"CSC"},
    {year:2002,winner:"Michele Bartoli",country:"🇮🇹",team:"CSC"},
    {year:2001,winner:"Francesco Casagrande",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2000,winner:"Michele Bartoli",country:"🇮🇹",team:"Mapei"},
    {year:1999,winner:"Oscar Camenzind",country:"🇨🇭",team:"Mapei"},
    {year:1998,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1997,winner:"Laurent Brochard",country:"🇫🇷",team:"Festina"},
    {year:1996,winner:"Andrea Ferrigato",country:"🇮🇹",team:"Roslotto"},
    {year:1995,winner:"Álvaro Mejia",country:"🇨🇴",team:"Kelme"},
    {year:1994,winner:"Vladislav Bobrik",country:"🇷🇺",team:"Lampre"},
    {year:1993,winner:"Pascal Richard",country:"🇨🇭",team:"MG-Technogym"},
    {year:1992,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1991,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1990,winner:"Gilles Delion",country:"🇫🇷",team:"Helvetia"},
    {year:1989,winner:"Tony Rominger",country:"🇨🇭",team:"Weinmann"},
    {year:1988,winner:"Charly Mottet",country:"🇫🇷",team:"RMO"},
    {year:1987,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1986,winner:"Gianbattista Baronchelli",country:"🇮🇹",team:"Del Tongo"},
    {year:1985,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1984,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1983,winner:"Sean Kelly",country:"🇮🇪",team:"Sem"},
    {year:1982,winner:"Giuseppe Saronni",country:"🇮🇹",team:"Del Tongo"},
    {year:1981,winner:"Hennie Kuiper",country:"🇳🇱",team:"Peugeot"},
    {year:1980,winner:"Alfons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1978,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Bernard Hinault",country:"🇫🇷",team:"Gitane"},
    {year:1976,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1975,winner:"Francesco Moser",country:"🇮🇹",team:"Filotex"},
    {year:1974,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1973,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Franco Bitossi",country:"🇮🇹",team:"Filotex"},
    {year:1969,winner:"Jean-Pierre Monseré",country:"🇧🇪",team:"Flandria"},
    {year:1968,winner:"Herman Van Springel",country:"🇧🇪",team:"Flandria"},
    {year:1967,winner:"Franco Bitossi",country:"🇮🇹",team:"Filotex"},
    {year:1966,winner:"Felice Gimondi",country:"🇮🇹",team:"Salvarani"},
    {year:1965,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1964,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1963,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1962,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1961,winner:"Vito Favero",country:"🇮🇹",team:"Carpano"},
    {year:1960,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1957,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1956,winner:"André Darrigade",country:"🇫🇷",team:"Cilo"},
    {year:1955,winner:"Cleto Maule",country:"🇮🇹",team:"Nivea"},
    {year:1954,winner:"Cleto Maule",country:"🇮🇹",team:"Nivea"},
    {year:1953,winner:"Pasquale Fornara",country:"🇮🇹",team:"Bianchi"},
    {year:1952,winner:"Emilio Clerici",country:"🇨🇭",team:"Bianchi"},
    {year:1951,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1950,winner:"Renzo Soldani",country:"🇮🇹",team:"Bianchi"},
  ]},
  // ══ CLASSIQUES ══════════════════════════════════════════════
  "Strade Bianche": { group:"Classiques", icon:"🪨", winners:[
    {year:2026,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"5e victoire · RECORD"},
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG",note:"4e victoire =Cancellara"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2022,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2021,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2020,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Tiesj Benoot",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2017,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Team Sky"},
    {year:2016,winner:"Greg Van Avermaet",country:"🇧🇪",team:"BMC Racing"},
    {year:2015,winner:"Zdeněk Štybar",country:"🇨🇿",team:"Etixx Quick-Step"},
    {year:2014,winner:"Zdeněk Štybar",country:"🇨🇿",team:"Omega Pharma Quick-Step"},
    {year:2013,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Omega Pharma Quick-Step"},
    {year:2012,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2011,winner:"Grega Bole",country:"🇸🇮",team:"Lampre"},
    {year:2010,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2009,winner:"Thomas Löfkvist",country:"🇸🇪",team:"Silence-Lotto"},
    {year:2008,winner:"Daniele Bennati",country:"🇮🇹",team:"Liquigas"},
    {year:2007,winner:"Alexandr Kolobnev",country:"🇷🇺",team:"Rabobank"},
  ]},
  "La Flèche Wallonne": { group:"Classiques", icon:"🏹", winners:[
    {year:2025,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates-XRG"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Ben Healy",country:"🇮🇪",team:"EF Education-EasyPost"},
    {year:2022,winner:"Maximilian Schachmann",country:"🇩🇪",team:"BORA-hansgrohe"},
    {year:2021,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2020,winner:"Marc Hirschi",country:"🇨🇭",team:"Team Sunweb"},
    {year:2019,winner:"Julian Alaphilippe",country:"🇫🇷",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2017,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2016,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2015,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2014,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2013,winner:"Joaquim Rodríguez",country:"🇪🇸",team:"Katusha"},
    {year:2012,winner:"Joaquim Rodríguez",country:"🇪🇸",team:"Katusha"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Cadel Evans",country:"🇦🇺",team:"BMC Racing"},
    {year:2009,winner:"Joaquim Rodríguez",country:"🇪🇸",team:"Katusha"},
    {year:2008,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2007,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Alexandre Vinokourov",country:"🇰🇿",team:"T-Mobile"},
    {year:2004,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2003,winner:"Igor González de Galdeano",country:"🇪🇸",team:"ONCE"},
    {year:2002,winner:"Mario Aerts",country:"🇧🇪",team:"Lotto"},
    {year:2001,winner:"Paolo Bettini",country:"🇮🇹",team:"Mapei"},
    {year:2000,winner:"Paolo Bettini",country:"🇮🇹",team:"Mapei"},
    {year:1999,winner:"Davide Rebellin",country:"🇮🇹",team:"Liquigas"},
    {year:1998,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1997,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1996,winner:"Luc Leblanc",country:"🇫🇷",team:"Festina"},
    {year:1995,winner:"Mauro Gianetti",country:"🇨🇭",team:"Helvetia"},
    {year:1994,winner:"Moreno Argentin",country:"🇮🇹",team:"Ariostea"},
    {year:1993,winner:"Rolf Sørensen",country:"🇩🇰",team:"Ariostea"},
    {year:1992,winner:"Thierry Claveyrolat",country:"🇫🇷",team:"RMO"},
    {year:1991,winner:"Moreno Argentin",country:"🇮🇹",team:"Ariostea"},
    {year:1990,winner:"Moreno Argentin",country:"🇮🇹",team:"Ariostea"},
    {year:1989,winner:"Martial Gayant",country:"🇫🇷",team:"La Redoute"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Laurent Fignon",country:"🇫🇷",team:"Système U"},
    {year:1986,winner:"Adri van der Poel",country:"🇳🇱",team:"Kwantum"},
    {year:1985,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Kwantum"},
    {year:1984,winner:"Claus-Peter Thaler",country:"🇩🇪",team:"Alfa Lum"},
    {year:1983,winner:"Hennie Kuiper",country:"🇳🇱",team:"Raleigh"},
    {year:1982,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1981,winner:"Josef Fuchs",country:"🇨🇭",team:"Cilo"},
    {year:1980,winner:"Ludo Peeters",country:"🇧🇪",team:"Ijsboerke"},
    {year:1979,winner:"Dietrich Thurau",country:"🇩🇪",team:"Ijsboerke"},
    {year:1978,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1974,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Georges Pintens",country:"🇧🇪",team:"Molteni"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Willy Bocklant",country:"🇧🇪",team:"Solo"},
    {year:1967,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1966,winner:"Noël Fore",country:"🇧🇪",team:"Flandria"},
    {year:1965,winner:"Pino Cerami",country:"🇧🇪",team:"Peugeot"},
    {year:1964,winner:"Willy Bocklant",country:"🇧🇪",team:"Solo"},
    {year:1963,winner:"Frans Melckenbeeck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1960,winner:"Rolf Wolfshohl",country:"🇩🇪",team:"Peugeot"},
    {year:1959,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1958,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1954,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1953,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1952,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
    {year:1950,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
  ]},
  "Amstel Gold Race": { group:"Classiques", icon:"🍺", winners:[
    {year:2024,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2022,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2021,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2020,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2019,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Corendon-Circus"},
    {year:2018,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Team Sky"},
    {year:2017,winner:"Philippe Gilbert",country:"🇧🇪",team:"Quick-Step Floors"},
    {year:2016,winner:"Enrico Gasparotto",country:"🇮🇹",team:"Wanty"},
    {year:2015,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Etixx Quick-Step"},
    {year:2014,winner:"Philippe Gilbert",country:"🇧🇪",team:"BMC Racing"},
    {year:2013,winner:"Roman Kreuziger",country:"🇨🇿",team:"Saxo-Tinkoff"},
    {year:2012,winner:"Maxime Monfort",country:"🇧🇪",team:"RadioShack-Nissan"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2009,winner:"Kim Kirchen",country:"🇱🇺",team:"Columbia-HTC"},
    {year:2008,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2007,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2006,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2005,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2004,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2003,winner:"Igor González de Galdeano",country:"🇪🇸",team:"ONCE"},
    {year:2002,winner:"Léon van Bon",country:"🇳🇱",team:"Domo Farm Frites"},
    {year:2001,winner:"Erik Dekker",country:"🇳🇱",team:"Rabobank"},
    {year:2000,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1999,winner:"Bart Voskamp",country:"🇳🇱",team:"TVM"},
    {year:1998,winner:"Rolf Sørensen",country:"🇩🇰",team:"Rabobank"},
    {year:1997,winner:"Bert Dietz",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1996,winner:"Rolf Sørensen",country:"🇩🇰",team:"Rabobank"},
    {year:1995,winner:"Michael Boogerd",country:"🇳🇱",team:"Rabobank"},
    {year:1994,winner:"Johan Bruyneel",country:"🇧🇪",team:"ONCE"},
    {year:1993,winner:"Rolf Sørensen",country:"🇩🇰",team:"Ariostea"},
    {year:1992,winner:"Mauro Ribeiro",country:"🇧🇷",team:"TVM"},
    {year:1991,winner:"Frans Maassen",country:"🇳🇱",team:"Buckler"},
    {year:1990,winner:"Adrie van der Poel",country:"🇳🇱",team:"Kwantum"},
    {year:1989,winner:"Jelle Nijdam",country:"🇳🇱",team:"Superconfex"},
    {year:1988,winner:"Joop Zoetemelk",country:"🇳🇱",team:"PDM"},
    {year:1987,winner:"Joop Zoetemelk",country:"🇳🇱",team:"PDM"},
    {year:1986,winner:"Phil Anderson",country:"🇦🇺",team:"Panasonic"},
    {year:1985,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Kwantum"},
    {year:1984,winner:"Jacques Hanegraaf",country:"🇳🇱",team:"Raleigh"},
    {year:1983,winner:"Fons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1982,winner:"René Martens",country:"🇧🇪",team:"Ijsboerke"},
    {year:1981,winner:"Hennie Kuiper",country:"🇳🇱",team:"Peugeot"},
    {year:1980,winner:"Henk Lubberding",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1979,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Ferdi Van den Haute",country:"🇧🇪",team:"Flandria"},
    {year:1974,winner:"Gerben Karstens",country:"🇳🇱",team:"Peugeot"},
    {year:1973,winner:"Walter Planckaert",country:"🇧🇪",team:"Flandria"},
    {year:1972,winner:"Barry Hoban",country:"🇬🇧",team:"Mercier"},
    {year:1971,winner:"Georges Pintens",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Jean-Pierre Monseré",country:"🇧🇪",team:"Flandria"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Barry Hoban",country:"🇬🇧",team:"Mercier"},
    {year:1967,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1966,winner:"Jean-Baptiste Claes",country:"🇧🇪",team:"Peugeot"},
  ]},
  "Gand-Wevelgem": { group:"Classiques", icon:"💨", winners:[
    {year:2024,winner:"Jonathan Milan",country:"🇮🇹",team:"Lidl-Trek"},
    {year:2023,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2022,winner:"Christophe Laporte",country:"🇫🇷",team:"Jumbo-Visma"},
    {year:2021,winner:"Matej Mohorič",country:"🇸🇮",team:"Bahrain Victorious"},
    {year:2020,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2019,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2018,winner:"Peter Sagan",country:"🇸🇰",team:"BORA-hansgrohe"},
    {year:2017,winner:"Peter Sagan",country:"🇸🇰",team:"BORA-hansgrohe"},
    {year:2016,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff"},
    {year:2015,winner:"Zdeněk Štybar",country:"🇨🇿",team:"Etixx Quick-Step"},
    {year:2014,winner:"Luca Paolini",country:"🇮🇹",team:"Katusha"},
    {year:2013,winner:"Sep Vanmarcke",country:"🇧🇪",team:"Blanco"},
    {year:2012,winner:"Tom Boonen",country:"🇧🇪",team:"Omega Pharma Quick-Step"},
    {year:2011,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Team Sky"},
    {year:2010,winner:"Tyler Farrar",country:"🇺🇸",team:"Garmin-Transitions"},
    {year:2009,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Team Columbia"},
    {year:2008,winner:"Thor Hushovd",country:"🇳🇴",team:"Crédit Agricole"},
    {year:2007,winner:"Wouter Weylandt",country:"🇧🇪",team:"Quick-Step"},
    {year:2006,winner:"Bernhard Eisel",country:"🇦🇹",team:"Française des Jeux"},
    {year:2005,winner:"Filippo Pozzato",country:"🇮🇹",team:"Quick-Step"},
    {year:2004,winner:"Johan Museeuw",country:"🇧🇪",team:"Quick-Step"},
    {year:2003,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:2002,winner:"Max Van Heeswijk",country:"🇳🇱",team:"Domo Farm Frites"},
    {year:2001,winner:"Jaan Kirsipuu",country:"🇪🇪",team:"AG2R"},
    {year:2000,winner:"Nico Mattan",country:"🇧🇪",team:"Cofidis"},
    {year:1999,winner:"Andrea Tafi",country:"🇮🇹",team:"Mapei"},
    {year:1998,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Mario Cipollini",country:"🇮🇹",team:"Saeco"},
    {year:1996,winner:"Wilfried Peeters",country:"🇧🇪",team:"Mapei"},
    {year:1995,winner:"Gilles Sergeant",country:"🇧🇪",team:"Mapei"},
    {year:1994,winner:"Rolf Sørensen",country:"🇩🇰",team:"Rabobank"},
    {year:1993,winner:"Johan Capiot",country:"🇧🇪",team:"Lotto"},
    {year:1992,winner:"Thomas Wegmüller",country:"🇨🇭",team:"Helvetia"},
    {year:1991,winner:"Rolf Sørensen",country:"🇩🇰",team:"Ariostea"},
    {year:1990,winner:"Herman Frison",country:"🇧🇪",team:"Lotto"},
    {year:1989,winner:"Etienne De Wilde",country:"🇧🇪",team:"Histor"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Teun van Vliet",country:"🇳🇱",team:"Panasonic"},
    {year:1986,winner:"Frank Hoste",country:"🇧🇪",team:"Kwantum"},
    {year:1985,winner:"Guido Van Calster",country:"🇧🇪",team:"Hitachi"},
    {year:1984,winner:"Rudy Matthijs",country:"🇧🇪",team:"Lotto"},
    {year:1983,winner:"Freddy Viane",country:"🇧🇪",team:"Lotto"},
    {year:1982,winner:"Ferdi Van den Haute",country:"🇧🇪",team:"Vermandoise"},
    {year:1981,winner:"Freddy Viane",country:"🇧🇪",team:"Lotto"},
    {year:1980,winner:"Rudy Pevenage",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Henk Lubberding",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Rik Van Linden",country:"🇧🇪",team:"Ijsboerke"},
    {year:1977,winner:"Rik Van Linden",country:"🇧🇪",team:"Ijsboerke"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1974,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Roger Rosiers",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1967,winner:"Michael Wright",country:"🇬🇧",team:"Mercier"},
    {year:1966,winner:"Edward Sels",country:"🇧🇪",team:"Peugeot"},
    {year:1965,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1964,winner:"Peter Post",country:"🇳🇱",team:"Televizier"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1961,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1960,winner:"Arthur Decabooter",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1954,winner:"Raymond Impanis",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Robert Van Eenaeme",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1951,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1950,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
  ]},
  "Clásica San Sebastián": { group:"Classiques", icon:"🌊", winners:[
    {year:2024,winner:"Primož Roglič",country:"🇸🇮",team:"Red Bull-BORA"},
    {year:2023,winner:"Carlos Rodríguez",country:"🇪🇸",team:"Ineos Grenadiers"},
    {year:2022,winner:"Remco Evenepoel",country:"🇧🇪",team:"Quick-Step Alpha Vinyl"},
    {year:2021,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2020,winner:"Marc Hirschi",country:"🇨🇭",team:"Team Sunweb"},
    {year:2019,winner:"Remco Evenepoel",country:"🇧🇪",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2017,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2016,winner:"Julian Alaphilippe",country:"🇫🇷",team:"Etixx Quick-Step"},
    {year:2015,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff-Saxo"},
    {year:2014,winner:"Mikel Nieve",country:"🇪🇸",team:"Team Sky"},
    {year:2013,winner:"Rui Costa",country:"🇵🇹",team:"Movistar"},
    {year:2012,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Sylvain Chavanel",country:"🇫🇷",team:"Quick-Step"},
    {year:2009,winner:"Alexandr Kolobnev",country:"🇷🇺",team:"Katusha"},
    {year:2008,winner:"Roman Kreuziger",country:"🇨🇿",team:"Liquigas"},
    {year:2007,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Samuel Sánchez",country:"🇪🇸",team:"Euskaltel"},
    {year:2004,winner:"Iban Mayo",country:"🇪🇸",team:"Euskaltel"},
    {year:2003,winner:"Roberto Laiseka",country:"🇪🇸",team:"Euskaltel"},
    {year:2002,winner:"David Etxebarria",country:"🇪🇸",team:"Euskaltel"},
    {year:2001,winner:"Iñigo Chaurreau",country:"🇪🇸",team:"AG2R"},
    {year:2000,winner:"Markus Zberg",country:"🇨🇭",team:"Rabobank"},
    {year:1999,winner:"Abraham Olano",country:"🇪🇸",team:"Banesto"},
    {year:1998,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1997,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1996,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Laudelino Cubino",country:"🇪🇸",team:"ONCE"},
    {year:1993,winner:"Armand De Las Cuevas",country:"🇫🇷",team:"Amaya"},
    {year:1992,winner:"Jörg Müller",country:"🇩🇪",team:"ZG-Megabike"},
    {year:1991,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1990,winner:"Charly Mottet",country:"🇫🇷",team:"RMO"},
    {year:1989,winner:"Sean Kelly",country:"🇮🇪",team:"PDM"},
    {year:1988,winner:"Asencio Fuerte",country:"🇪🇸",team:"BH"},
    {year:1987,winner:"Gianbattista Baronchelli",country:"🇮🇹",team:"Supermercati"},
    {year:1986,winner:"Iñaki Gastón",country:"🇪🇸",team:"Teka"},
    {year:1985,winner:"Roberto Visentini",country:"🇮🇹",team:"Carrera"},
    {year:1984,winner:"Iñaki Gastón",country:"🇪🇸",team:"Teka"},
    {year:1983,winner:"Luis Ocaña",country:"🇪🇸",team:"Reynolds"},
    {year:1982,winner:"Sean Kelly",country:"🇮🇪",team:"Sem"},
    {year:1981,winner:"Freddy Maertens",country:"🇧🇪",team:"Boule d'Or"},
  ]},
  // ══ COURSES HEBDOMADAIRES ════════════════════════════════════
  "Paris-Nice": { group:"Courses hebdo", icon:"☀️", winners:[
    {year:2026,winner:"Jonas Vingegaard",country:"🇩🇰",team:"Visma-Lease a Bike"},
    {year:2025,winner:"Matteo Jorgenson",country:"🇺🇸",team:"Visma-Lease a Bike",note:"2e consécutif"},
    {year:2024,winner:"Matteo Jorgenson",country:"🇺🇸",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2022,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2021,winner:"Maximilian Schachmann",country:"🇩🇪",team:"BORA-hansgrohe"},
    {year:2020,winner:"Maximilian Schachmann",country:"🇩🇪",team:"BORA-hansgrohe"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Marc Soler",country:"🇪🇸",team:"Movistar"},
    {year:2017,winner:"Sergio Henao",country:"🇨🇴",team:"Team Sky"},
    {year:2016,winner:"Alberto Contador",country:"🇪🇸",team:"Tinkoff"},
    {year:2015,winner:"Richie Porte",country:"🇦🇺",team:"Team Sky"},
    {year:2014,winner:"Richie Porte",country:"🇦🇺",team:"Team Sky"},
    {year:2013,winner:"Andrew Talansky",country:"🇺🇸",team:"Garmin-Sharp"},
    {year:2012,winner:"Bradley Wiggins",country:"🇬🇧",team:"Team Sky"},
    {year:2011,winner:"Tony Martin",country:"🇩🇪",team:"HTC-Highroad"},
    {year:2010,winner:"Luis León Sánchez",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2009,winner:"Luis León Sánchez",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2008,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2007,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2006,winner:"Floyd Landis",country:"🇺🇸",team:"Phonak"},
    {year:2005,winner:"Bobby Julich",country:"🇺🇸",team:"T-Mobile"},
    {year:2004,winner:"Christophe Moreau",country:"🇫🇷",team:"Crédit Agricole"},
    {year:2003,winner:"José Luis Rubiera",country:"🇪🇸",team:"US Postal"},
    {year:2002,winner:"Xavier Florencio",country:"🇪🇸",team:"ONCE"},
    {year:2001,winner:"Laurent Brochard",country:"🇫🇷",team:"Festina"},
    {year:2000,winner:"Francesco Casagrande",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:1999,winner:"Lance Armstrong",country:"🇺🇸",team:"US Postal"},
    {year:1998,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1997,winner:"Chris Boardman",country:"🇬🇧",team:"GAN"},
    {year:1996,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Tony Rominger",country:"🇨🇭",team:"Mapei"},
    {year:1993,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Tony Rominger",country:"🇨🇭",team:"Helvetia"},
    {year:1990,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1989,winner:"Sean Kelly",country:"🇮🇪",team:"PDM"},
    {year:1988,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1987,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1986,winner:"Sean Kelly",country:"🇮🇪",team:"KAS"},
    {year:1985,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1984,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1983,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1974,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1972,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1971,winner:"Cyrille Guimard",country:"🇫🇷",team:"Bic"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1967,winner:"Tom Simpson",country:"🇬🇧",team:"Peugeot"},
    {year:1966,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1965,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1964,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1963,winner:"Josef Planckaert",country:"🇧🇪",team:"Peugeot"},
    {year:1962,winner:"Karl-Heinz Kunde",country:"🇩🇪",team:"Mercier"},
    {year:1961,winner:"Tom Simpson",country:"🇬🇧",team:"Rapha"},
    {year:1960,winner:"Angelo Conterno",country:"🇮🇹",team:"Bianchi"},
    {year:1959,winner:"Julien Schepens",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1958,winner:"Jean Graczyk",country:"🇫🇷",team:"Cilo"},
    {year:1957,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Antonio Jiménez Quiles",country:"🇪🇸",team:"Peugeot"},
    {year:1954,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1953,winner:"Raphaël Géminiani",country:"🇫🇷",team:"La Perle"},
    {year:1952,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1951,winner:"Bernardo Ruiz",country:"🇪🇸",team:"Dunlop"},
    {year:1950,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
  ]},
  "Critérium du Dauphiné": { group:"Courses hebdo", icon:"🏔️", winners:[
    {year:2024,winner:"Remco Evenepoel",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2023,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2022,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2021,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2020,winner:"Dani Martínez",country:"🇨🇴",team:"EF Pro Cycling"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2017,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2016,winner:"Richie Porte",country:"🇦🇺",team:"Team Sky"},
    {year:2015,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2014,winner:"Andrew Talansky",country:"🇺🇸",team:"Garmin-Sharp"},
    {year:2013,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2012,winner:"Bradley Wiggins",country:"🇬🇧",team:"Team Sky"},
    {year:2011,winner:"Bradley Wiggins",country:"🇬🇧",team:"Team Sky"},
    {year:2010,winner:"Cadel Evans",country:"🇦🇺",team:"BMC Racing"},
    {year:2009,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2008,winner:"Carlos Sastre",country:"🇪🇸",team:"CSC"},
    {year:2007,winner:"Michael Boogerd",country:"🇳🇱",team:"Rabobank"},
    {year:2006,winner:"Christophe Moreau",country:"🇫🇷",team:"Caisse d'Épargne"},
    {year:2005,winner:"Michael Rasmussen",country:"🇩🇰",team:"Rabobank"},
    {year:2004,winner:"Bradley Wiggins",country:"🇬🇧",team:"Cofidis"},
    {year:2003,winner:"Iban Mayo",country:"🇪🇸",team:"Euskaltel"},
    {year:2002,winner:"Unai Etxebarria",country:"🇻🇪",team:"Euskaltel"},
    {year:2001,winner:"Christophe Moreau",country:"🇫🇷",team:"Festina"},
    {year:2000,winner:"Christophe Moreau",country:"🇫🇷",team:"Festina"},
    {year:1999,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1998,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1997,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1996,winner:"Luc Leblanc",country:"🇫🇷",team:"Festina"},
    {year:1995,winner:"Jacky Durand",country:"🇫🇷",team:"Castorama"},
    {year:1994,winner:"Viatcheslav Ekimov",country:"🇷🇺",team:"ONCE"},
    {year:1993,winner:"Laurent Fignon",country:"🇫🇷",team:"Gatorade"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Charly Mottet",country:"🇫🇷",team:"RMO"},
    {year:1990,winner:"Greg LeMond",country:"🇺🇸",team:"Z"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Pedro Delgado",country:"🇪🇸",team:"Reynolds"},
    {year:1987,winner:"Jean-François Bernard",country:"🇫🇷",team:"Toshiba"},
    {year:1986,winner:"Laurent Fignon",country:"🇫🇷",team:"Système U"},
    {year:1985,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1984,winner:"Laurent Fignon",country:"🇫🇷",team:"Renault"},
    {year:1983,winner:"Pascal Simon",country:"🇫🇷",team:"Peugeot"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1979,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1978,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Bernard Thévenet",country:"🇫🇷",team:"Peugeot"},
    {year:1976,winner:"Walter Riccomi",country:"🇮🇹",team:"Bianchi"},
    {year:1975,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Gitane"},
    {year:1974,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Gitane"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Cyrille Guimard",country:"🇫🇷",team:"Bic"},
    {year:1971,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1967,winner:"Roger Pingeon",country:"🇫🇷",team:"Peugeot"},
    {year:1966,winner:"Julio Jiménez",country:"🇪🇸",team:"Warner"},
    {year:1965,winner:"Julio Jiménez",country:"🇪🇸",team:"Warner"},
    {year:1964,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1963,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1962,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1961,winner:"Jean Stablinski",country:"🇫🇷",team:"Helyett"},
    {year:1960,winner:"Charly Gaul",country:"🇱🇺",team:"Faema"},
    {year:1959,winner:"Marcel Rohrbach",country:"🇫🇷",team:"Margnat"},
    {year:1958,winner:"Raphaël Géminiani",country:"🇫🇷",team:"La Perle"},
    {year:1957,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1956,winner:"Raphaël Géminiani",country:"🇫🇷",team:"La Perle"},
    {year:1955,winner:"Jean Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1954,winner:"Raphaël Géminiani",country:"🇫🇷",team:"La Perle"},
    {year:1953,winner:"Jean Robic",country:"🇫🇷",team:"Vebor"},
    {year:1952,winner:"Bernardo Ruiz",country:"🇪🇸",team:"Dunlop"},
    {year:1951,winner:"Bernardo Ruiz",country:"🇪🇸",team:"Dunlop"},
    {year:1950,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
  ]},
  "Tour de Suisse": { group:"Courses hebdo", icon:"🇨🇭", winners:[
    {year:2025,winner:"João Almeida",country:"🇵🇹",team:"UAE Team Emirates-XRG"},
    {year:2024,winner:"Adam Yates",country:"🇬🇧",team:"UAE Team Emirates"},
    {year:2023,winner:"Mattias Skjelmose",country:"🇩🇰",team:"Trek-Segafredo"},
    {year:2022,winner:"Geraint Thomas",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Ineos Grenadiers"},
    {year:2021,winner:"Marc Hirschi",country:"🇨🇭",team:"UAE Team Emirates"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Richie Porte",country:"🇦🇺",team:"BMC Racing"},
    {year:2017,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2016,winner:"Tom Dumoulin",country:"🇳🇱",team:"Team Giant-Alpecin"},
    {year:2015,winner:"Simon Špilak",country:"🇸🇮",team:"Katusha"},
    {year:2014,winner:"Simon Špilak",country:"🇸🇮",team:"Katusha"},
    {year:2013,winner:"Rui Costa",country:"🇵🇹",team:"Movistar"},
    {year:2012,winner:"Rui Costa",country:"🇵🇹",team:"Movistar"},
    {year:2011,winner:"Cadel Evans",country:"🇦🇺",team:"BMC Racing"},
    {year:2010,winner:"Michael Albasini",country:"🇨🇭",team:"HTC-Columbia"},
    {year:2009,winner:"Fabian Cancellara",country:"🇨🇭",team:"Saxo Bank"},
    {year:2008,winner:"Steve Zampieri",country:"🇨🇭",team:"Lampre"},
    {year:2007,winner:"Daniel Becke",country:"🇩🇪",team:"Gerolsteiner"},
    {year:2006,winner:"Patrik Sinkewitz",country:"🇩🇪",team:"Quick-Step"},
    {year:2005,winner:"Jan Ullrich",country:"🇩🇪",team:"T-Mobile"},
    {year:2004,winner:"Aitor González",country:"🇪🇸",team:"Fassa Bortolo"},
    {year:2003,winner:"Tyler Hamilton",country:"🇺🇸",team:"CSC"},
    {year:2002,winner:"Sébastien Joly",country:"🇫🇷",team:"Crédit Agricole"},
    {year:2001,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:2000,winner:"Santiago Botero",country:"🇨🇴",team:"Kelme"},
    {year:1999,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1998,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1997,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1996,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1995,winner:"Tony Rominger",country:"🇨🇭",team:"Mapei"},
    {year:1994,winner:"Tony Rominger",country:"🇨🇭",team:"Mapei"},
    {year:1993,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1992,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1991,winner:"Tony Rominger",country:"🇨🇭",team:"Helvetia"},
    {year:1990,winner:"Raúl Alcalá",country:"🇲🇽",team:"PDM"},
    {year:1989,winner:"Mathieu Hermans",country:"🇳🇱",team:"Café de Colombia"},
    {year:1988,winner:"Rolf Gölz",country:"🇩🇪",team:"Supermercati"},
    {year:1987,winner:"Eduardo Chozas",country:"🇪🇸",team:"BH"},
    {year:1986,winner:"Erich Maechler",country:"🇨🇭",team:"Carrera"},
    {year:1985,winner:"Urs Zimmermann",country:"🇨🇭",team:"Carrera"},
    {year:1984,winner:"Pascal Simon",country:"🇫🇷",team:"Peugeot"},
    {year:1983,winner:"Urs Freuler",country:"🇨🇭",team:"Famcucine"},
    {year:1982,winner:"Beat Breu",country:"🇨🇭",team:"Cilo"},
    {year:1981,winner:"Beat Breu",country:"🇨🇭",team:"Cilo"},
    {year:1980,winner:"Robert Alban",country:"🇫🇷",team:"La Redoute"},
    {year:1979,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Josef Fuchs",country:"🇨🇭",team:"Cilo"},
    {year:1977,winner:"Michel Laurent",country:"🇫🇷",team:"Gitane"},
    {year:1976,winner:"Régis Ovion",country:"🇫🇷",team:"Mercier"},
    {year:1975,winner:"Bernard Thévenet",country:"🇫🇷",team:"Peugeot"},
    {year:1974,winner:"Hans Knecht",country:"🇨🇭",team:"Cilo"},
    {year:1973,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1972,winner:"Cyrille Guimard",country:"🇫🇷",team:"Bic"},
    {year:1971,winner:"Leif Mortensen",country:"🇩🇰",team:"Bic"},
    {year:1970,winner:"Ueli Sutter",country:"🇨🇭",team:"Cilo"},
    {year:1969,winner:"Rolf Maurer",country:"🇩🇪",team:"Henny"},
    {year:1968,winner:"Herman Van Springel",country:"🇧🇪",team:"Flandria"},
    {year:1967,winner:"Eddy Merckx",country:"🇧🇪",team:"Peugeot"},
    {year:1966,winner:"Rudi Altig",country:"🇩🇪",team:"Molteni"},
    {year:1965,winner:"Rolf Maurer",country:"🇩🇪",team:"Henny"},
    {year:1964,winner:"Rolf Maurer",country:"🇩🇪",team:"Henny"},
    {year:1963,winner:"Frans Melckenbeeck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1962,winner:"Rolf Maurer",country:"🇩🇪",team:"Henny"},
    {year:1961,winner:"Rolf Maurer",country:"🇩🇪",team:"Henny"},
    {year:1960,winner:"Marcel Rohrbach",country:"🇫🇷",team:"Margnat"},
    {year:1959,winner:"Guido Carlesi",country:"🇮🇹",team:"Bianchi"},
    {year:1958,winner:"Guido Carlesi",country:"🇮🇹",team:"Bianchi"},
    {year:1957,winner:"Martin Metzger",country:"🇩🇪",team:"Henny"},
    {year:1956,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1955,winner:"Carlo Clerici",country:"🇨🇭",team:"Guerra"},
    {year:1954,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
    {year:1953,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1952,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
    {year:1951,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1950,winner:"Ferdi Kübler",country:"🇨🇭",team:"Tebag"},
  ]},
  "Tirreno-Adriatico": { group:"Courses hebdo", icon:"🌊", winners:[
    {year:2025,winner:"Juan Ayuso",country:"🇪🇸",team:"UAE Team Emirates-XRG"},
    {year:2024,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2023,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2022,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2021,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2020,winner:"Simon Yates",country:"🇬🇧",team:"Mitchelton-Scott"},
    {year:2019,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2018,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Team Sky"},
    {year:2017,winner:"Nairo Quintana",country:"🇨🇴",team:"Movistar"},
    {year:2016,winner:"Geraint Thomas",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Team Sky"},
    {year:2015,winner:"Nairo Quintana",country:"🇨🇴",team:"Movistar"},
    {year:2014,winner:"Alberto Contador",country:"🇪🇸",team:"Tinkoff-Saxo"},
    {year:2013,winner:"Vincenzo Nibali",country:"🇮🇹",team:"Astana"},
    {year:2012,winner:"Geraint Thomas",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Team Sky"},
    {year:2011,winner:"Michele Scarponi",country:"🇮🇹",team:"Lampre"},
    {year:2010,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2009,winner:"Levi Leipheimer",country:"🇺🇸",team:"Astana"},
    {year:2008,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2007,winner:"Alessandro Ballan",country:"🇮🇹",team:"Lampre"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Alessandro Petacchi",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2004,winner:"Luca Paolini",country:"🇮🇹",team:"Quick-Step"},
    {year:2003,winner:"Dario Frigo",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2002,winner:"Dario Frigo",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2001,winner:"Dario Frigo",country:"🇮🇹",team:"Mapei"},
    {year:2000,winner:"David Millar",country:"🇬🇧",team:"Cofidis"},
    {year:1999,winner:"Andrea Ferrigato",country:"🇮🇹",team:"Mapei"},
    {year:1998,winner:"Pascal Richard",country:"🇨🇭",team:"MG-Technogym"},
    {year:1997,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1996,winner:"Evgeni Berzin",country:"🇷🇺",team:"Gewiss"},
    {year:1995,winner:"Zenon Jaskuła",country:"🇵🇱",team:"TVM"},
    {year:1994,winner:"Evgeni Berzin",country:"🇷🇺",team:"Gewiss"},
    {year:1993,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1992,winner:"Claudio Chiappucci",country:"🇮🇹",team:"Carrera"},
    {year:1991,winner:"Romano Giannetti",country:"🇮🇹",team:"Château d'Ax"},
    {year:1990,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Franco Chioccioli",country:"🇮🇹",team:"Del Tongo"},
    {year:1987,winner:"Marino Lejarreta",country:"🇪🇸",team:"Caja Rural"},
    {year:1986,winner:"Urs Zimmermann",country:"🇨🇭",team:"Carrera"},
    {year:1985,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1984,winner:"Francesco Moser",country:"🇮🇹",team:"Gis Gelati"},
    {year:1983,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1979,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1978,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1977,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Giuseppe Martinelli",country:"🇮🇹",team:"Bianchi"},
    {year:1975,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1974,winner:"Wilfried David",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Régis Ovion",country:"🇫🇷",team:"Mercier"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Michele Dancelli",country:"🇮🇹",team:"Molteni"},
    {year:1969,winner:"Italo Zilioli",country:"🇮🇹",team:"Molteni"},
    {year:1968,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1967,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1966,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
  ]},
  "Volta a Catalunya": { group:"Courses hebdo", icon:"🇪🇸", winners:[
    {year:2026,winner:"Jonas Vingegaard",country:"🇩🇰",team:"Visma-Lease a Bike"},
    {year:2025,winner:"Primož Roglič",country:"🇸🇮",team:"Red Bull-BORA"},
    {year:2024,winner:"Primož Roglič",country:"🇸🇮",team:"Red Bull-BORA"},
    {year:2023,winner:"Primož Roglič",country:"🇸🇮",team:"Jumbo-Visma"},
    {year:2022,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2021,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Egan Bernal",country:"🇨🇴",team:"Team Ineos"},
    {year:2018,winner:"Marc Soler",country:"🇪🇸",team:"Movistar"},
    {year:2017,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2016,winner:"Nairo Quintana",country:"🇨🇴",team:"Movistar"},
    {year:2015,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2014,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2013,winner:"Chris Froome",country:"🇬🇧",team:"Team Sky"},
    {year:2012,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2011,winner:"Robert Gesink",country:"🇳🇱",team:"Rabobank"},
    {year:2010,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2009,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2008,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2007,winner:"Alberto Contador",country:"🇪🇸",team:"Discovery Channel"},
    {year:2006,winner:"Alejandro Valverde",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2005,winner:"Francisco Mancebo",country:"🇪🇸",team:"Illes Balears"},
    {year:2004,winner:"Aitor González",country:"🇪🇸",team:"Fassa Bortolo"},
    {year:2003,winner:"Félix García Casas",country:"🇪🇸",team:"Relax"},
    {year:2002,winner:"Dario Frigo",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2001,winner:"Óscar Sevilla",country:"🇪🇸",team:"Kelme"},
    {year:2000,winner:"Pavel Tonkov",country:"🇷🇺",team:"Mapei"},
    {year:1999,winner:"Laurent Dufaux",country:"🇨🇭",team:"Saeco"},
    {year:1998,winner:"Ángel Casero",country:"🇪🇸",team:"Vitalicio"},
    {year:1997,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1996,winner:"Alex Zülle",country:"🇨🇭",team:"ONCE"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Mikel Zarrabeitia",country:"🇪🇸",team:"ONCE"},
    {year:1993,winner:"Tony Rominger",country:"🇨🇭",team:"Clas"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1990,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1989,winner:"Pedro Delgado",country:"🇪🇸",team:"Reynolds"},
    {year:1988,winner:"Anselmo Fuerte",country:"🇪🇸",team:"BH"},
    {year:1987,winner:"Laurent Fignon",country:"🇫🇷",team:"Système U"},
    {year:1986,winner:"Robert Millar",country:"🇬🇧",team:"Panasonic"},
    {year:1985,winner:"Marino Lejarreta",country:"🇪🇸",team:"Zor"},
    {year:1984,winner:"Pedro Muñoz",country:"🇪🇸",team:"Teka"},
    {year:1983,winner:"Faustino Rupérez",country:"🇪🇸",team:"Zor"},
    {year:1982,winner:"Marino Lejarreta",country:"🇪🇸",team:"Zor"},
    {year:1981,winner:"Ángel Arroyo",country:"🇪🇸",team:"Reynolds"},
    {year:1980,winner:"Faustino Rupérez",country:"🇪🇸",team:"Zor"},
    {year:1979,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Enrique Martínez Heredia",country:"🇪🇸",team:"KAS"},
    {year:1977,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Agustín Tamames",country:"🇪🇸",team:"TEKA"},
    {year:1974,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1973,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1972,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Gitane"},
    {year:1971,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
    {year:1970,winner:"Luis Ocaña",country:"🇪🇸",team:"Fagor"},
    {year:1969,winner:"Gregorio San Miguel",country:"🇪🇸",team:"KAS"},
    {year:1968,winner:"Gregorio San Miguel",country:"🇪🇸",team:"KAS"},
    {year:1967,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1966,winner:"Ferdinand Bracke",country:"🇧🇪",team:"Peugeot"},
    {year:1965,winner:"Rudi Altig",country:"🇩🇪",team:"Molteni"},
    {year:1964,winner:"Angelino Soler",country:"🇪🇸",team:"Faema"},
    {year:1963,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1962,winner:"Antonio Suárez",country:"🇪🇸",team:"Licor 43"},
    {year:1961,winner:"Antonio Suárez",country:"🇪🇸",team:"Licor 43"},
    {year:1960,winner:"Fernando Manzaneque",country:"🇪🇸",team:"Derbi"},
    {year:1959,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1958,winner:"Bernardo Capó",country:"🇪🇸",team:"Licor 43"},
    {year:1957,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1956,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1955,winner:"Bernardo Capó",country:"🇪🇸",team:"Licor 43"},
    {year:1954,winner:"Salvador Botella",country:"🇪🇸",team:"Cepsa"},
    {year:1953,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1952,winner:"Bernardo Capó",country:"🇪🇸",team:"Licor 43"},
    {year:1951,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Dunlop"},
    {year:1950,winner:"Bernardo Capó",country:"🇪🇸",team:"Licor 43"},
  ]},
  "GP Cycliste Québec": { group:"Courses hebdo", icon:"🍁", winners:[
    {year:2024,winner:"Wout van Aert",country:"🇧🇪",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2022,winner:"Remco Evenepoel",country:"🇧🇪",team:"Quick-Step Alpha Vinyl"},
    {year:2021,winner:"Benoît Cosnefroy",country:"🇫🇷",team:"AG2R Citroën"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Marc Hirschi",country:"🇨🇭",team:"Team Sunweb"},
    {year:2018,winner:"Romain Bardet",country:"🇫🇷",team:"AG2R La Mondiale"},
    {year:2017,winner:"Peter Sagan",country:"🇸🇰",team:"BORA-hansgrohe"},
    {year:2016,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff"},
    {year:2015,winner:"Greg Van Avermaet",country:"🇧🇪",team:"BMC Racing"},
    {year:2014,winner:"Michal Kwiatkowski",country:"🇵🇱",team:"Etixx Quick-Step"},
    {year:2013,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Team Sky"},
    {year:2012,winner:"Ryder Hesjedal",country:"🇨🇦",team:"Garmin-Sharp"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
  ]},
  "GP Cycliste Montréal": { group:"Courses hebdo", icon:"🏙️", winners:[
    {year:2024,winner:"Remco Evenepoel",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2023,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2022,winner:"Tadej Pogačar",country:"🇸🇮",team:"UAE Team Emirates"},
    {year:2021,winner:"Alexis Vuillermoz",country:"🇫🇷",team:"AG2R Citroën"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Corendon-Circus"},
    {year:2018,winner:"Julian Alaphilippe",country:"🇫🇷",team:"Quick-Step Floors"},
    {year:2017,winner:"Simon Gerrans",country:"🇦🇺",team:"Orica-Scott"},
    {year:2016,winner:"Rui Costa",country:"🇵🇹",team:"Lampre-Merida"},
    {year:2015,winner:"Alejandro Valverde",country:"🇪🇸",team:"Movistar"},
    {year:2014,winner:"Simon Gerrans",country:"🇦🇺",team:"Orica-GreenEdge"},
    {year:2013,winner:"Rui Costa",country:"🇵🇹",team:"Movistar"},
    {year:2012,winner:"Ryder Hesjedal",country:"🇨🇦",team:"Garmin-Sharp"},
    {year:2011,winner:"Philippe Gilbert",country:"🇧🇪",team:"Omega Pharma-Lotto"},
    {year:2010,winner:"Samuel Sánchez",country:"🇪🇸",team:"Euskaltel-Euskadi"},
  ]},
  // ══ 1.PRO / 2.PRO ══════════════════════════════════════════
  "Omloop Het Nieuwsblad": { group:"1.Pro / 2.Pro", icon:"🌬️", level:"1.Pro", winners:[
    {year:2024,winner:"Tim Merlier",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2023,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2022,winner:"Christophe Laporte",country:"🇫🇷",team:"Jumbo-Visma"},
    {year:2021,winner:"Davide Ballerini",country:"🇮🇹",team:"Deceuninck Quick-Step"},
    {year:2020,winner:"Jasper Stuyven",country:"🇧🇪",team:"Trek-Segafredo"},
    {year:2019,winner:"Sep Vanmarcke",country:"🇧🇪",team:"EF Education First"},
    {year:2018,winner:"Michael Valgren",country:"🇩🇰",team:"Astana"},
    {year:2017,winner:"Greg Van Avermaet",country:"🇧🇪",team:"BMC Racing"},
    {year:2016,winner:"Lars Boom",country:"🇳🇱",team:"LottoNL-Jumbo"},
    {year:2015,winner:"Zdeněk Štybar",country:"🇨🇿",team:"Etixx Quick-Step"},
    {year:2014,winner:"Sep Vanmarcke",country:"🇧🇪",team:"Belkin"},
    {year:2013,winner:"Luca Paolini",country:"🇮🇹",team:"Katusha"},
    {year:2012,winner:"Sep Vanmarcke",country:"🇧🇪",team:"Vacansoleil"},
    {year:2011,winner:"Sebastian Langeveld",country:"🇳🇱",team:"Rabobank"},
    {year:2010,winner:"Thor Hushovd",country:"🇳🇴",team:"Cervelo Test Team"},
    {year:2009,winner:"Stijn Devolder",country:"🇧🇪",team:"Quick-Step"},
    {year:2008,winner:"Gert Steegmans",country:"🇧🇪",team:"Quick-Step"},
    {year:2007,winner:"Alessandro Ballan",country:"🇮🇹",team:"Lampre"},
    {year:2006,winner:"Nick Nuyens",country:"🇧🇪",team:"Quick-Step"},
    {year:2005,winner:"Andreas Klier",country:"🇩🇪",team:"T-Mobile"},
    {year:2004,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto-Domo"},
    {year:2003,winner:"Nico Mattan",country:"🇧🇪",team:"Cofidis"},
    {year:2002,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:2001,winner:"Peter Van Petegem",country:"🇧🇪",team:"Farm Frites"},
    {year:2000,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:1999,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:1998,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Frank Vandenbroucke",country:"🇧🇪",team:"Mapei"},
    {year:1996,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1995,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1994,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1993,winner:"Johan Museeuw",country:"🇧🇪",team:"Lotto"},
    {year:1992,winner:"Johan Capiot",country:"🇧🇪",team:"Lotto"},
    {year:1991,winner:"Johan Museeuw",country:"🇧🇪",team:"Lotto"},
    {year:1990,winner:"Edwig Van Hooydonck",country:"🇧🇪",team:"Buckler"},
    {year:1989,winner:"Eric Van Lancker",country:"🇧🇪",team:"Panasonic"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1986,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1985,winner:"Ferdi Van den Haute",country:"🇧🇪",team:"Hitachi"},
    {year:1984,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1983,winner:"Fons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1982,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1981,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1980,winner:"Rudy Pevenage",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1978,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1977,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1976,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1974,winner:"Willy De Geest",country:"🇧🇪",team:"Flandria"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1971,winner:"Eric Leman",country:"🇧🇪",team:"IJsboerke"},
    {year:1970,winner:"Eric Leman",country:"🇧🇪",team:"IJsboerke"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1967,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1966,winner:"Eddy Merckx",country:"🇧🇪",team:"Rik"},
    {year:1965,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1964,winner:"Joseph Groussard",country:"🇫🇷",team:"St Raphaël"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1960,winner:"Arthur Decabooter",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1954,winner:"Raymond Impanis",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1951,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1950,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
  ]},
  "Kuurne-Bruxelles-Kuurne": { group:"1.Pro / 2.Pro", icon:"🌧️", level:"1.Pro", winners:[
    {year:2024,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2022,winner:"Mads Pedersen",country:"🇩🇰",team:"Trek-Segafredo"},
    {year:2021,winner:"Cees Bol",country:"🇳🇱",team:"DSM"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2018,winner:"Jürgen Roelandts",country:"🇧🇪",team:"BMC Racing"},
    {year:2017,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Dimension Data"},
    {year:2016,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff"},
    {year:2015,winner:"Ben Hermans",country:"🇧🇪",team:"IAM Cycling"},
    {year:2014,winner:"Arnaud Démare",country:"🇫🇷",team:"FDJ"},
    {year:2013,winner:"Tom Boonen",country:"🇧🇪",team:"Omega Pharma Quick-Step"},
    {year:2012,winner:"Tom Boonen",country:"🇧🇪",team:"Omega Pharma Quick-Step"},
    {year:2011,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2010,winner:"Daniele Bennati",country:"🇮🇹",team:"Liquigas"},
    {year:2009,winner:"Robbe Ruijgh",country:"🇳🇱",team:"Rabobank"},
    {year:2008,winner:"Brett Lancaster",country:"🇦🇺",team:"Silence-Lotto"},
    {year:2007,winner:"Filippo Pozzato",country:"🇮🇹",team:"Quick-Step"},
    {year:2006,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2005,winner:"Peter Van Petegem",country:"🇧🇪",team:"Davitamon-Lotto"},
    {year:2004,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto-Domo"},
    {year:2003,winner:"Steffen Wesemann",country:"🇩🇪",team:"T-Mobile"},
    {year:2002,winner:"Jaan Kirsipuu",country:"🇪🇪",team:"AG2R"},
    {year:2001,winner:"Max Van Heeswijk",country:"🇳🇱",team:"Domo Farm Frites"},
    {year:2000,winner:"Nico Mattan",country:"🇧🇪",team:"Cofidis"},
    {year:1999,winner:"Mario Cipollini",country:"🇮🇹",team:"Saeco"},
    {year:1998,winner:"Frank Vandenbroucke",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Nicola Minali",country:"🇮🇹",team:"Roslotto"},
    {year:1996,winner:"Johan Capiot",country:"🇧🇪",team:"Lotto"},
    {year:1995,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:1994,winner:"Andrei Tchmil",country:"🇧🇪",team:"Lotto"},
    {year:1993,winner:"Hendrik Redant",country:"🇧🇪",team:"Lotto"},
    {year:1992,winner:"Hendrik Redant",country:"🇧🇪",team:"Lotto"},
    {year:1991,winner:"Rolf Sørensen",country:"🇩🇰",team:"Ariostea"},
    {year:1990,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Weinmann"},
    {year:1989,winner:"Etienne De Wilde",country:"🇧🇪",team:"Histor"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1986,winner:"Frank Hoste",country:"🇧🇪",team:"Kwantum"},
    {year:1985,winner:"Rudy Matthijs",country:"🇧🇪",team:"Lotto"},
    {year:1984,winner:"Ferdi Van den Haute",country:"🇧🇪",team:"Hitachi"},
    {year:1983,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1982,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1981,winner:"Joop Zoetemelk",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1980,winner:"Alfons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Henk Lubberding",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Willy Teirlinck",country:"🇧🇪",team:"Ijsboerke"},
    {year:1977,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1974,winner:"Rik Van Linden",country:"🇧🇪",team:"Ijsboerke"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Roger De Vlaeminck",country:"🇧🇪",team:"Brooklyn"},
    {year:1971,winner:"Georges Pintens",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Herman Van Springel",country:"🇧🇪",team:"Flandria"},
    {year:1967,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1966,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1965,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1964,winner:"Joseph Spruyt",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1960,winner:"Arthur Decabooter",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1957,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1956,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1955,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1954,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1953,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1952,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1951,winner:"Briek Schotte",country:"🇧🇪",team:"Mercier"},
    {year:1950,winner:"Louis Caput",country:"🇫🇷",team:"Helyett"},
  ]},
  "Paris-Tours": { group:"1.Pro / 2.Pro", icon:"🗺️", level:"1.Pro", winners:[
    {year:2024,winner:"Arnaud De Lie",country:"🇧🇪",team:"Lotto Dstny"},
    {year:2023,winner:"Axel Laurance",country:"🇫🇷",team:"Alpecin-Deceuninck"},
    {year:2022,winner:"Christophe Laporte",country:"🇫🇷",team:"Jumbo-Visma"},
    {year:2021,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"DSM"},
    {year:2020,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2019,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2018,winner:"Rüdiger Selig",country:"🇩🇪",team:"BORA-hansgrohe"},
    {year:2017,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2016,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Giant-Alpecin"},
    {year:2015,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Giant-Alpecin"},
    {year:2014,winner:"Wouter Mol",country:"🇳🇱",team:"Vacansoleil"},
    {year:2013,winner:"Wouter Mol",country:"🇳🇱",team:"Vacansoleil"},
    {year:2012,winner:"Juan José Haedo",country:"🇦🇷",team:"Saxo Bank"},
    {year:2011,winner:"Francesco Chicchi",country:"🇮🇹",team:"Liquigas"},
    {year:2010,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Sky"},
    {year:2009,winner:"Jimmy Casper",country:"🇫🇷",team:"Agritubel"},
    {year:2008,winner:"Graeme Brown",country:"🇦🇺",team:"Rabobank"},
    {year:2007,winner:"Filippo Pozzato",country:"🇮🇹",team:"Quick-Step"},
    {year:2006,winner:"Frédéric Guesdon",country:"🇫🇷",team:"Française des Jeux"},
    {year:2005,winner:"Erik Zabel",country:"🇩🇪",team:"T-Mobile"},
    {year:2004,winner:"Erik Zabel",country:"🇩🇪",team:"T-Mobile"},
    {year:2003,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:2002,winner:"Johan Museeuw",country:"🇧🇪",team:"Mapei"},
    {year:2001,winner:"Sébastien Hinault",country:"🇫🇷",team:"Crédit Agricole"},
    {year:2000,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1999,winner:"Jeroen Blijlevens",country:"🇳🇱",team:"TVM"},
    {year:1998,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Francesco Casagrande",country:"🇮🇹",team:"Vini Caldirola"},
    {year:1996,winner:"Frédéric Guesdon",country:"🇫🇷",team:"Française des Jeux"},
    {year:1995,winner:"Andrea Ferrigato",country:"🇮🇹",team:"Roslotto"},
    {year:1994,winner:"Maximilian Sciandri",country:"🇬🇧",team:"Motorola"},
    {year:1993,winner:"Andreï Tchmil",country:"🇧🇪",team:"Lotto"},
    {year:1992,winner:"Hendrik Redant",country:"🇧🇪",team:"Lotto"},
    {year:1991,winner:"Dominique Arnaud",country:"🇫🇷",team:"Toshiba"},
    {year:1990,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1989,winner:"Etienne De Wilde",country:"🇧🇪",team:"Histor"},
    {year:1988,winner:"Jelle Nijdam",country:"🇳🇱",team:"Superconfex"},
    {year:1987,winner:"Martial Gayant",country:"🇫🇷",team:"Système U"},
    {year:1986,winner:"Guido Van Calster",country:"🇧🇪",team:"Hitachi"},
    {year:1985,winner:"Henk Lubberding",country:"🇳🇱",team:"Panasonic"},
    {year:1984,winner:"Guido Van Calster",country:"🇧🇪",team:"Splendor"},
    {year:1983,winner:"Sean Kelly",country:"🇮🇪",team:"Sem"},
    {year:1982,winner:"Freddy Maertens",country:"🇧🇪",team:"Boule d'Or"},
    {year:1981,winner:"Sean Kelly",country:"🇮🇪",team:"Splendor"},
    {year:1980,winner:"Gilbert Duclos-Lassalle",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Dietrich Thurau",country:"🇩🇪",team:"Ijsboerke"},
    {year:1976,winner:"Rik Van Linden",country:"🇧🇪",team:"Ijsboerke"},
    {year:1975,winner:"Rik Van Linden",country:"🇧🇪",team:"Ijsboerke"},
    {year:1974,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1973,winner:"Herman Van Springel",country:"🇧🇪",team:"Flandria"},
    {year:1972,winner:"Gerben Karstens",country:"🇳🇱",team:"Peugeot"},
    {year:1971,winner:"Rini Wagtmans",country:"🇳🇱",team:"Molteni"},
    {year:1970,winner:"Herman Van Springel",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1968,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1967,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1966,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1965,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1964,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Jo De Roo",country:"🇳🇱",team:"Televizier"},
    {year:1961,winner:"Jo De Roo",country:"🇳🇱",team:"Televizier"},
    {year:1960,winner:"Émile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1959,winner:"Robert Cazala",country:"🇫🇷",team:"Helyett"},
    {year:1958,winner:"Arthur Decabooter",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1957,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1956,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1955,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1954,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1953,winner:"Wout Wagtmans",country:"🇳🇱",team:"Peugeot"},
    {year:1952,winner:"Lucien Teisseire",country:"🇫🇷",team:"Helyett"},
    {year:1951,winner:"Louison Bobet",country:"🇫🇷",team:"Mercier"},
    {year:1950,winner:"Maurice Blomme",country:"🇧🇪",team:"Flandria"},
  ]},
  "Scheldeprijs": { group:"1.Pro / 2.Pro", icon:"🚣", level:"1.Pro", winners:[
    {year:2024,winner:"Olav Kooij",country:"🇳🇱",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Jordi Meeus",country:"🇧🇪",team:"BORA-hansgrohe"},
    {year:2022,winner:"Fabio Jakobsen",country:"🇳🇱",team:"Quick-Step Alpha Vinyl"},
    {year:2021,winner:"Sam Bennett",country:"🇮🇪",team:"Deceuninck Quick-Step"},
    {year:2020,winner:"Sam Bennett",country:"🇮🇪",team:"Deceuninck Quick-Step"},
    {year:2019,winner:"Fabio Jakobsen",country:"🇳🇱",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Elia Viviani",country:"🇮🇹",team:"Quick-Step Floors"},
    {year:2017,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step Floors"},
    {year:2016,winner:"Tom Boonen",country:"🇧🇪",team:"Etixx Quick-Step"},
    {year:2015,winner:"Alexander Kristoff",country:"🇳🇴",team:"Katusha"},
    {year:2014,winner:"Mark Cavendish",country:"🇬🇧",team:"Omega Pharma Quick-Step"},
    {year:2013,winner:"Mark Cavendish",country:"🇬🇧",team:"Omega Pharma Quick-Step"},
    {year:2012,winner:"Mark Cavendish",country:"🇬🇧",team:"Sky Procycling"},
    {year:2011,winner:"Tyler Farrar",country:"🇺🇸",team:"Garmin-Cervélo"},
    {year:2010,winner:"Tyler Farrar",country:"🇺🇸",team:"Garmin-Transitions"},
    {year:2009,winner:"Gerald Ciolek",country:"🇩🇪",team:"Columbia-HTC"},
    {year:2008,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2007,winner:"Robbie McEwen",country:"🇦🇺",team:"Predictor-Lotto"},
    {year:2006,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2005,winner:"Tom Boonen",country:"🇧🇪",team:"Quick-Step"},
    {year:2004,winner:"Robbie McEwen",country:"🇦🇺",team:"Lotto-Domo"},
    {year:2003,winner:"Max Van Heeswijk",country:"🇳🇱",team:"Domo Farm Frites"},
    {year:2002,winner:"Jaan Kirsipuu",country:"🇪🇪",team:"AG2R"},
    {year:2001,winner:"Jaan Kirsipuu",country:"🇪🇪",team:"AG2R"},
    {year:2000,winner:"Jeroen Blijlevens",country:"🇳🇱",team:"TVM"},
    {year:1999,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:1998,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:1997,winner:"Tom Steels",country:"🇧🇪",team:"Mapei"},
    {year:1996,winner:"Wilfried Peeters",country:"🇧🇪",team:"Mapei"},
    {year:1995,winner:"Mario Cipollini",country:"🇮🇹",team:"Saeco"},
    {year:1994,winner:"Djordje Ðokić",country:"🇷🇸",team:"Ceramiche Ariostea"},
    {year:1993,winner:"Djordje Ðokić",country:"🇷🇸",team:"Ceramiche Ariostea"},
    {year:1992,winner:"Johan Capiot",country:"🇧🇪",team:"Lotto"},
    {year:1991,winner:"Edwig Van Hooydonck",country:"🇧🇪",team:"Buckler"},
    {year:1990,winner:"Olaf Ludwig",country:"🇩🇪",team:"Panasonic"},
    {year:1989,winner:"Frank Vandenbroucke",country:"🇧🇪",team:"Mapei"},
    {year:1988,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1987,winner:"Eddy Planckaert",country:"🇧🇪",team:"ADR"},
    {year:1986,winner:"Eddy Planckaert",country:"🇧🇪",team:"Panasonic"},
    {year:1985,winner:"Herman Frison",country:"🇧🇪",team:"Lotto"},
    {year:1984,winner:"Michel Pollentier",country:"🇧🇪",team:"Splendor"},
    {year:1983,winner:"Phil Anderson",country:"🇦🇺",team:"Peugeot"},
    {year:1982,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Splendor"},
    {year:1981,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Splendor"},
    {year:1980,winner:"Fons De Wolf",country:"🇧🇪",team:"Splendor"},
    {year:1979,winner:"Gerrie Knetemann",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Freddy Maertens",country:"🇧🇪",team:"Flandria"},
    {year:1974,winner:"Barry Hoban",country:"🇬🇧",team:"Mercier"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1971,winner:"Willy Teirlinck",country:"🇧🇪",team:"Ijsboerke"},
    {year:1970,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Walter Godefroot",country:"🇧🇪",team:"Salvarani"},
    {year:1967,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1966,winner:"Eddy Merckx",country:"🇧🇪",team:"Rik"},
    {year:1965,winner:"Guido Reybrouck",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1964,winner:"Gilbert Desmet",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1960,winner:"Noël Fore",country:"🇧🇪",team:"Flandria"},
    {year:1959,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1958,winner:"Fred De Bruyne",country:"🇧🇪",team:"Carpano"},
    {year:1957,winner:"Emile Daems",country:"🇧🇪",team:"Molteni"},
    {year:1956,winner:"Raymond Impanis",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1955,winner:"Briek Schotte",country:"🇧🇪",team:"Mercier"},
    {year:1954,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1953,winner:"Germain Derycke",country:"🇧🇪",team:"Groene Leeuw"},
    {year:1952,winner:"Rik Van Steenbergen",country:"🇧🇪",team:"Peugeot"},
    {year:1951,winner:"Emile Idée",country:"🇫🇷",team:"Helyett"},
    {year:1950,winner:"Briek Schotte",country:"🇧🇪",team:"Mercier"},
  ]},
  "À Travers la Flandre": { group:"1.Pro / 2.Pro", icon:"🌾", level:"1.Pro", winners:[
    {year:2024,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2023,winner:"Wout van Aert",country:"🇧🇪",team:"Jumbo-Visma"},
    {year:2022,winner:"Dylan van Baarle",country:"🇳🇱",team:"Ineos Grenadiers"},
    {year:2021,winner:"Kasper Asgreen",country:"🇩🇰",team:"Deceuninck Quick-Step"},
    {year:2020,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Fenix"},
    {year:2019,winner:"Yves Lampaert",country:"🇧🇪",team:"Deceuninck Quick-Step"},
    {year:2018,winner:"Kasper Asgreen",country:"🇩🇰",team:"Quick-Step Floors"},
    {year:2017,winner:"Greg Van Avermaet",country:"🇧🇪",team:"BMC Racing"},
    {year:2016,winner:"Peter Sagan",country:"🇸🇰",team:"Tinkoff"},
    {year:2015,winner:"Sep Vanmarcke",country:"🇧🇪",team:"LottoNL-Jumbo"},
    {year:2014,winner:"Sep Vanmarcke",country:"🇧🇪",team:"Belkin"},
    {year:2013,winner:"Stijn Devolder",country:"🇧🇪",team:"Vacansoleil"},
    {year:2012,winner:"Stijn Devolder",country:"🇧🇪",team:"Vacansoleil"},
    {year:2011,winner:"Sep Vanmarcke",country:"🇧🇪",team:"Quickstep"},
    {year:2010,winner:"Fabian Cancellara",country:"🇨🇭",team:"RadioShack"},
    {year:2009,winner:"Thor Hushovd",country:"🇳🇴",team:"Cervelo Test Team"},
    {year:2008,winner:"Nick Nuyens",country:"🇧🇪",team:"Quick-Step"},
    {year:2007,winner:"Philippe Gilbert",country:"🇧🇪",team:"Française des Jeux"},
    {year:2006,winner:"Stijn Devolder",country:"🇧🇪",team:"Discovery Channel"},
    {year:2005,winner:"Johan Van Summeren",country:"🇧🇪",team:"Cofidis"},
    {year:2004,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto-Domo"},
    {year:2003,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:2002,winner:"Leif Hoste",country:"🇧🇪",team:"Lotto"},
    {year:2001,winner:"Peter Van Petegem",country:"🇧🇪",team:"Farm Frites"},
    {year:2000,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
    {year:1999,winner:"Glenn D'Hollander",country:"🇧🇪",team:"Lotto"},
    {year:1998,winner:"Peter Van Petegem",country:"🇧🇪",team:"Lotto"},
  ]},
  "Tre Valli Varesine": { group:"1.Pro / 2.Pro", icon:"🏞️", level:"1.Pro", winners:[
    {year:2024,winner:"Aleksandr Vlasov",country:"🇷🇺",team:"BORA-hansgrohe"},
    {year:2023,winner:"Filippo Zana",country:"🇮🇹",team:"Jayco AlUla"},
    {year:2022,winner:"Bauke Mollema",country:"🇳🇱",team:"Trek-Segafredo"},
    {year:2021,winner:"Davide Formolo",country:"🇮🇹",team:"UAE Team Emirates"},
    {year:2020,winner:"Maximilian Schachmann",country:"🇩🇪",team:"BORA-hansgrohe"},
    {year:2019,winner:"Davide Formolo",country:"🇮🇹",team:"Bora-hansgrohe"},
    {year:2018,winner:"Rémi Cavagna",country:"🇫🇷",team:"Quick-Step Floors"},
    {year:2017,winner:"Diego Rosa",country:"🇮🇹",team:"Team Sky"},
    {year:2016,winner:"Tanel Kangert",country:"🇪🇪",team:"Astana"},
    {year:2015,winner:"Diego Rosa",country:"🇮🇹",team:"Astana"},
    {year:2014,winner:"Bauke Mollema",country:"🇳🇱",team:"Trek Factory"},
    {year:2013,winner:"Mauro Finetto",country:"🇮🇹",team:"Cannondale"},
    {year:2012,winner:"Domenico Pozzovivo",country:"🇮🇹",team:"Colnago-CSF"},
    {year:2011,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2010,winner:"Sylvester Szmyd",country:"🇵🇱",team:"Liquigas"},
    {year:2009,winner:"David Arroyo",country:"🇪🇸",team:"Caisse d'Épargne"},
    {year:2008,winner:"Roman Kreuziger",country:"🇨🇿",team:"Liquigas"},
    {year:2007,winner:"Tadej Valjavec",country:"🇸🇮",team:"Lampre"},
    {year:2006,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2005,winner:"Danilo Di Luca",country:"🇮🇹",team:"Liquigas"},
    {year:2004,winner:"Gilberto Simoni",country:"🇮🇹",team:"Saeco"},
    {year:2003,winner:"Davide Bramati",country:"🇮🇹",team:"Quick-Step"},
    {year:2002,winner:"Dario Frigo",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:2001,winner:"Mirko Celestino",country:"🇮🇹",team:"Mapei"},
    {year:2000,winner:"Paolo Bettini",country:"🇮🇹",team:"Mapei"},
    {year:1999,winner:"Wladimir Belli",country:"🇮🇹",team:"Fassa Bortolo"},
    {year:1998,winner:"Gianpaolo Mondini",country:"🇮🇹",team:"Brescialat"},
    {year:1997,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1996,winner:"Michele Coppolillo",country:"🇮🇹",team:"Mapei"},
    {year:1995,winner:"Michele Bartoli",country:"🇮🇹",team:"MG-Technogym"},
    {year:1994,winner:"Vladislav Bobrik",country:"🇷🇺",team:"Lampre"},
    {year:1993,winner:"Roberto Pelliconi",country:"🇮🇹",team:"Carrera"},
    {year:1992,winner:"Miguel Indurain",country:"🇪🇸",team:"Banesto"},
    {year:1991,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1990,winner:"Gilles Delion",country:"🇫🇷",team:"Helvetia"},
    {year:1989,winner:"Claudio Chiappucci",country:"🇮🇹",team:"Carrera"},
    {year:1988,winner:"Davide Cassani",country:"🇮🇹",team:"Château d'Ax"},
    {year:1987,winner:"Gianbattista Baronchelli",country:"🇮🇹",team:"Del Tongo"},
    {year:1986,winner:"Roberto Visentini",country:"🇮🇹",team:"Carrera"},
    {year:1985,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1984,winner:"Gianbattista Baronchelli",country:"🇮🇹",team:"Del Tongo"},
    {year:1983,winner:"Roberto Visentini",country:"🇮🇹",team:"Carrera"},
    {year:1982,winner:"Palmiro Masciarelli",country:"🇮🇹",team:"Bianchi"},
    {year:1981,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1980,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1979,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1978,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1977,winner:"Wilfried David",country:"🇧🇪",team:"Molteni"},
    {year:1976,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1975,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1974,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Roger Swerts",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Michele Dancelli",country:"🇮🇹",team:"Molteni"},
    {year:1969,winner:"Italo Zilioli",country:"🇮🇹",team:"Molteni"},
    {year:1968,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1967,winner:"Franco Bitossi",country:"🇮🇹",team:"Filotex"},
    {year:1966,winner:"Vittorio Adorni",country:"🇮🇹",team:"Salvarani"},
    {year:1965,winner:"Gianni Motta",country:"🇮🇹",team:"Molteni"},
    {year:1964,winner:"Arnaldo Pambianco",country:"🇮🇹",team:"Fides"},
    {year:1963,winner:"Rik Van Looy",country:"🇧🇪",team:"Solo"},
    {year:1962,winner:"Rik Van Looy",country:"🇧🇪",team:"Faema"},
    {year:1961,winner:"Ercole Baldini",country:"🇮🇹",team:"Fides"},
    {year:1960,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1959,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1958,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1957,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1956,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1955,winner:"Cleto Maule",country:"🇮🇹",team:"Nivea"},
    {year:1954,winner:"Cleto Maule",country:"🇮🇹",team:"Nivea"},
    {year:1953,winner:"Hugo Koblet",country:"🇨🇭",team:"Guerra"},
    {year:1952,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Gino Bartali",country:"🇮🇹",team:"Bartali"},
    {year:1950,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
  ]},
  "Gran Piemonte": { group:"1.Pro / 2.Pro", icon:"🏔️", level:"1.Pro", winners:[
    {year:2024,winner:"Giulio Ciccone",country:"🇮🇹",team:"Lidl-Trek"},
    {year:2023,winner:"Davide Ballerini",country:"🇮🇹",team:"Astana Qazaqstan"},
    {year:2022,winner:"Filippo Zana",country:"🇮🇹",team:"Bardiani CSF"},
    {year:2021,winner:"Aleksandr Vlasov",country:"🇷🇺",team:"BORA-hansgrohe"},
    {year:2020,winner:"Gino Mäder",country:"🇨🇭",team:"Bahrain McLaren"},
    {year:2019,winner:"Victor Campenaerts",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2018,winner:"Tiesj Benoot",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2017,winner:"Michael Woods",country:"🇨🇦",team:"Cannondale-Drapac"},
    {year:2016,winner:"Davide Formolo",country:"🇮🇹",team:"Cannondale"},
    {year:2015,winner:"Diego Rosa",country:"🇮🇹",team:"Astana"},
    {year:2014,winner:"Ramunas Navardauskas",country:"🇱🇹",team:"Garmin-Sharp"},
    {year:2013,winner:"Michele Scarponi",country:"🇮🇹",team:"Lampre"},
    {year:2012,winner:"Dario Cataldo",country:"🇮🇹",team:"Katusha"},
    {year:2011,winner:"Damiano Cunego",country:"🇮🇹",team:"Lampre"},
    {year:2010,winner:"Emanuele Sella",country:"🇮🇹",team:"Carmiooro NGC"},
    {year:2009,winner:"Michele Scarponi",country:"🇮🇹",team:"Androni Giocattoli"},
    {year:2008,winner:"Linus Gerdemann",country:"🇩🇪",team:"Columbia"},
    {year:2007,winner:"Gabriele Bosisio",country:"🇮🇹",team:"Liquigas"},
    {year:2006,winner:"Leonardo Piepoli",country:"🇮🇹",team:"Saunier Duval"},
    {year:2005,winner:"Emanuele Sella",country:"🇮🇹",team:"Ceramica Panaria"},
    {year:2004,winner:"Danilo Di Luca",country:"🇮🇹",team:"Saeco"},
    {year:2003,winner:"Yaroslav Popovych",country:"🇺🇦",team:"Landbouwkrediet"},
    {year:2002,winner:"Andrea Noè",country:"🇮🇹",team:"Alessio"},
    {year:2001,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:2000,winner:"Michele Bartoli",country:"🇮🇹",team:"Mapei"},
    {year:1999,winner:"Eddy Seigneur",country:"🇫🇷",team:"GAN"},
    {year:1998,winner:"Daniele Nardello",country:"🇮🇹",team:"Mapei"},
    {year:1997,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1996,winner:"Stefano Zanini",country:"🇮🇹",team:"Mapei"},
    {year:1995,winner:"Claudio Chiappucci",country:"🇮🇹",team:"Carrera"},
    {year:1994,winner:"Vladislav Bobrik",country:"🇷🇺",team:"Lampre"},
    {year:1993,winner:"Bjarne Riis",country:"🇩🇰",team:"Ariostea"},
    {year:1992,winner:"Biagio Conte",country:"🇮🇹",team:"Del Tongo"},
    {year:1991,winner:"Claudio Chiappucci",country:"🇮🇹",team:"Carrera"},
    {year:1990,winner:"Gianni Bugno",country:"🇮🇹",team:"Château d'Ax"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Stephen Roche",country:"🇮🇪",team:"Fagor"},
    {year:1987,winner:"Roberto Visentini",country:"🇮🇹",team:"Carrera"},
    {year:1986,winner:"Acácio Da Silva",country:"🇵🇹",team:"La Redoute"},
    {year:1985,winner:"Moreno Argentin",country:"🇮🇹",team:"Gewiss"},
    {year:1984,winner:"Patrice Esnault",country:"🇫🇷",team:"La Redoute"},
    {year:1983,winner:"Giuseppe Saronni",country:"🇮🇹",team:"Del Tongo"},
    {year:1982,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1981,winner:"Silvano Contini",country:"🇮🇹",team:"Del Tongo"},
    {year:1980,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1979,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1978,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1977,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1976,winner:"Francesco Moser",country:"🇮🇹",team:"Sanson"},
    {year:1975,winner:"Francesco Moser",country:"🇮🇹",team:"Filotex"},
    {year:1974,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1971,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1969,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1968,winner:"Eddy Merckx",country:"🇧🇪",team:"Faema"},
    {year:1967,winner:"Eddy Merckx",country:"🇧🇪",team:"Peugeot"},
    {year:1966,winner:"Franco Bitossi",country:"🇮🇹",team:"Filotex"},
    {year:1965,winner:"Guido Carlesi",country:"🇮🇹",team:"Bianchi"},
    {year:1964,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1963,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1962,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1961,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1960,winner:"Emilio Rodríguez",country:"🇪🇸",team:"Faema"},
    {year:1959,winner:"Gastone Nencini",country:"🇮🇹",team:"Chlorodont"},
    {year:1958,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1957,winner:"Nino Defilippis",country:"🇮🇹",team:"Bianchi"},
    {year:1956,winner:"Cleto Maule",country:"🇮🇹",team:"Nivea"},
    {year:1955,winner:"Charly Gaul",country:"🇱🇺",team:"Guerra"},
    {year:1954,winner:"Guido De Santi",country:"🇮🇹",team:"Nivea"},
    {year:1953,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1952,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1951,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
    {year:1950,winner:"Fausto Coppi",country:"🇮🇹",team:"Bianchi"},
  ]},
  "Tour de Pologne": { group:"1.Pro / 2.Pro", icon:"🇵🇱", level:"2.Pro", winners:[
    {year:2024,winner:"Remco Evenepoel",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2023,winner:"Remco Evenepoel",country:"🇧🇪",team:"Soudal Quick-Step"},
    {year:2022,winner:"Matej Mohorič",country:"🇸🇮",team:"Bahrain Victorious"},
    {year:2021,winner:"Ethan Hayter",country:"🇬🇧",team:"Ineos Grenadiers"},
    {year:2020,winner:"Rafał Majka",country:"🇵🇱",team:"BORA-hansgrohe"},
    {year:2019,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Team Sky"},
    {year:2018,winner:"Rafał Majka",country:"🇵🇱",team:"BORA-hansgrohe"},
    {year:2017,winner:"Rafał Majka",country:"🇵🇱",team:"BORA-hansgrohe"},
    {year:2016,winner:"Rafał Majka",country:"🇵🇱",team:"Tinkoff"},
    {year:2015,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Etixx Quick-Step"},
    {year:2014,winner:"Bartosz Huzarski",country:"🇵🇱",team:"NetApp-Endura"},
    {year:2013,winner:"Simon Spilak",country:"🇸🇮",team:"Katusha"},
    {year:2012,winner:"Rein Taaramäe",country:"🇪🇪",team:"Cofidis"},
    {year:2011,winner:"Sylvain Chavanel",country:"🇫🇷",team:"Quick-Step"},
    {year:2010,winner:"Linus Gerdemann",country:"🇩🇪",team:"RadioShack"},
    {year:2009,winner:"Michał Kwiatkowski",country:"🇵🇱",team:"Carrefour-Servetto"},
    {year:2008,winner:"Davide Rebellin",country:"🇮🇹",team:"Gerolsteiner"},
    {year:2007,winner:"Yaroslav Popovych",country:"🇺🇦",team:"Discovery Channel"},
    {year:2006,winner:"Sylvain Calzati",country:"🇫🇷",team:"AG2R"},
    {year:2005,winner:"Jans Koerts",country:"🇳🇱",team:"T-Mobile"},
    {year:2004,winner:"Serguei Gonchar",country:"🇺🇦",team:"T-Mobile"},
    {year:2003,winner:"Serguei Gonchar",country:"🇺🇦",team:"T-Mobile"},
    {year:2002,winner:"Serguei Gonchar",country:"🇺🇦",team:"T-Mobile"},
    {year:2001,winner:"Beat Zberg",country:"🇨🇭",team:"Rabobank"},
    {year:2000,winner:"Ryszard Korbut",country:"🇵🇱",team:"MrBookmaker"},
    {year:1999,winner:"Zbigniew Spruch",country:"🇵🇱",team:"Polsat"},
    {year:1998,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1997,winner:"Piotr Wadecki",country:"🇵🇱",team:"RMV Radsport"},
    {year:1996,winner:"Zenon Jaskuła",country:"🇵🇱",team:"TVM"},
    {year:1995,winner:"Zenon Jaskuła",country:"🇵🇱",team:"TVM"},
    {year:1994,winner:"Zenon Jaskuła",country:"🇵🇱",team:"TVM"},
    {year:1993,winner:"Zenon Jaskuła",country:"🇵🇱",team:"TVM"},
    {year:1992,winner:"Joachim Halupczok",country:"🇵🇱",team:"Banesto"},
    {year:1991,winner:"Joachim Halupczok",country:"🇵🇱",team:"Banesto"},
    {year:1990,winner:"Joachim Halupczok",country:"🇵🇱",team:"Banesto"},
    {year:1989,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1988,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1987,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1986,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1985,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1984,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1983,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1982,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1981,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1980,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1979,winner:"Henryk Charucki",country:"🇵🇱",team:"Renpol"},
    {year:1978,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1977,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1976,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1975,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1974,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1973,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1972,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1971,winner:"Ryszard Szurkowski",country:"🇵🇱",team:"Renpol"},
    {year:1970,winner:"Edward Barcik",country:"🇵🇱",team:"Renpol"},
    {year:1969,winner:"Jan Kudra",country:"🇵🇱",team:"Renpol"},
    {year:1968,winner:"Jan Kudra",country:"🇵🇱",team:"Renpol"},
    {year:1967,winner:"Henryk Charucki",country:"🇵🇱",team:"Renpol"},
    {year:1966,winner:"Józef Gawliczek",country:"🇵🇱",team:"Renpol"},
    {year:1965,winner:"Henryk Charucki",country:"🇵🇱",team:"Renpol"},
    {year:1964,winner:"Józef Gawliczek",country:"🇵🇱",team:"Renpol"},
    {year:1963,winner:"Stanisław Gazda",country:"🇵🇱",team:"Renpol"},
    {year:1962,winner:"Henryk Charucki",country:"🇵🇱",team:"Renpol"},
    {year:1961,winner:"Lothar Appler",country:"🇩🇪",team:"DDR"},
    {year:1960,winner:"Lothar Appler",country:"🇩🇪",team:"DDR"},
    {year:1959,winner:"Hannu Tamminen",country:"🇫🇮",team:"Finlande"},
    {year:1958,winner:"Stanisław Gazda",country:"🇵🇱",team:"Renpol"},
    {year:1957,winner:"Eugen Gasiorek",country:"🇵🇱",team:"Renpol"},
    {year:1956,winner:"Eugen Gasiorek",country:"🇵🇱",team:"Renpol"},
    {year:1955,winner:"Stanisław Gazda",country:"🇵🇱",team:"Renpol"},
    {year:1954,winner:"Stanisław Gazda",country:"🇵🇱",team:"Renpol"},
    {year:1953,winner:"Henryk Łasak",country:"🇵🇱",team:"Renpol"},
    {year:1952,winner:"Marian Więckowski",country:"🇵🇱",team:"Renpol"},
    {year:1951,winner:"Adolf Pijanowski",country:"🇵🇱",team:"Renpol"},
    {year:1950,winner:"Władysław Michalak",country:"🇵🇱",team:"Renpol"},
  ]},
  "Étoile de Bessèges": { group:"1.Pro / 2.Pro", icon:"⭐", level:"2.Pro", winners:[
    {year:2024,winner:"Ion Izagirre",country:"🇪🇸",team:"Cofidis"},
    {year:2023,winner:"Marc Hirschi",country:"🇨🇭",team:"UAE Team Emirates"},
    {year:2022,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team DSM"},
    {year:2021,winner:"Rémi Cavagna",country:"🇫🇷",team:"Deceuninck Quick-Step"},
    {year:2020,winner:"Davide Formolo",country:"🇮🇹",team:"UAE Team Emirates"},
    {year:2019,winner:"Warren Barguil",country:"🇫🇷",team:"Arkéa-Samsic"},
    {year:2018,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2017,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2016,winner:"Thomas De Gendt",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2015,winner:"Thomas De Gendt",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2014,winner:"Gianluca Brambilla",country:"🇮🇹",team:"Omega Pharma-Quick Step"},
    {year:2013,winner:"Jonathan Hivert",country:"🇫🇷",team:"Sojasun"},
    {year:2012,winner:"Rein Taaramäe",country:"🇪🇪",team:"Cofidis"},
    {year:2011,winner:"Juan Manuel Gárate",country:"🇪🇸",team:"Rabobank"},
    {year:2010,winner:"Maxime Bouet",country:"🇫🇷",team:"Ag2R La Mondiale"},
    {year:2009,winner:"Sylvain Chavanel",country:"🇫🇷",team:"Quick-Step"},
    {year:2008,winner:"Sylvain Chavanel",country:"🇫🇷",team:"Cofidis"},
    {year:2007,winner:"Thomas Voeckler",country:"🇫🇷",team:"Bouygues Telecom"},
    {year:2006,winner:"Yoann Offredo",country:"🇫🇷",team:"Française des Jeux"},
    {year:2005,winner:"Sylvain Chavanel",country:"🇫🇷",team:"Cofidis"},
    {year:2004,winner:"Stéphane Goubert",country:"🇫🇷",team:"AG2R"},
    {year:2003,winner:"Sébastien Hinault",country:"🇫🇷",team:"Crédit Agricole"},
    {year:2002,winner:"Christophe Mengin",country:"🇫🇷",team:"Française des Jeux"},
    {year:2001,winner:"Christophe Agnolutto",country:"🇫🇷",team:"AG2R"},
    {year:2000,winner:"Christophe Moreau",country:"🇫🇷",team:"Festina"},
    {year:1999,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1998,winner:"Jan Ullrich",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1997,winner:"Marco Pantani",country:"🇮🇹",team:"Mercatone Uno"},
    {year:1996,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1995,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1994,winner:"Laurent Jalabert",country:"🇫🇷",team:"ONCE"},
    {year:1993,winner:"Laurent Fignon",country:"🇫🇷",team:"Gatorade"},
    {year:1992,winner:"Laurent Fignon",country:"🇫🇷",team:"Gatorade"},
    {year:1991,winner:"Gilles Delion",country:"🇫🇷",team:"Helvetia"},
    {year:1990,winner:"Charly Mottet",country:"🇫🇷",team:"RMO"},
    {year:1989,winner:"Laurent Fignon",country:"🇫🇷",team:"Super U"},
    {year:1988,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1987,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1986,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1985,winner:"Bernard Hinault",country:"🇫🇷",team:"La Vie Claire"},
    {year:1984,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1983,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1982,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1981,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1980,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Bernard Hinault",country:"🇫🇷",team:"Renault"},
    {year:1978,winner:"Bernard Hinault",country:"🇫🇷",team:"Gitane"},
    {year:1977,winner:"Bernard Hinault",country:"🇫🇷",team:"Gitane"},
    {year:1976,winner:"Joaquim Agostinho",country:"🇵🇹",team:"Flandria"},
    {year:1975,winner:"Felice Gimondi",country:"🇮🇹",team:"Bianchi"},
    {year:1974,winner:"Jean-Pierre Danguillaume",country:"🇫🇷",team:"Peugeot"},
    {year:1973,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1972,winner:"Raymond Poulidor",country:"🇫🇷",team:"Mercier"},
    {year:1971,winner:"Luis Ocaña",country:"🇪🇸",team:"Bic"},
  ]},
  "Bretagne Classic": { group:"1.Pro / 2.Pro", icon:"🌊", level:"1.Pro", winners:[
    {year:2024,winner:"Christophe Laporte",country:"🇫🇷",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Mathieu van der Poel",country:"🇳🇱",team:"Alpecin-Deceuninck"},
    {year:2022,winner:"Christophe Laporte",country:"🇫🇷",team:"Jumbo-Visma"},
    {year:2021,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"DSM"},
    {year:2020,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"NTT Pro Cycling"},
    {year:2019,winner:"Nils Politt",country:"🇩🇪",team:"Katusha-Alpecin"},
    {year:2018,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Team Sunweb"},
    {year:2017,winner:"Oliver Naesen",country:"🇧🇪",team:"AG2R La Mondiale"},
    {year:2016,winner:"Arnaud Démare",country:"🇫🇷",team:"FDJ"},
    {year:2015,winner:"Søren Kragh Andersen",country:"🇩🇰",team:"Giant-Alpecin"},
    {year:2014,winner:"Bryan Coquard",country:"🇫🇷",team:"Europcar"},
    {year:2013,winner:"Arnaud Démare",country:"🇫🇷",team:"FDJ"},
    {year:2012,winner:"Marco Marcato",country:"🇮🇹",team:"Vacansoleil"},
    {year:2011,winner:"Filippo Pozzato",country:"🇮🇹",team:"Katusha"},
    {year:2010,winner:"Thor Hushovd",country:"🇳🇴",team:"Cervelo Test Team"},
    {year:2009,winner:"Edvald Boasson Hagen",country:"🇳🇴",team:"Team Columbia"},
    {year:2008,winner:"Graeme Brown",country:"🇦🇺",team:"Rabobank"},
    {year:2007,winner:"Oscar Freire",country:"🇪🇸",team:"Rabobank"},
    {year:2006,winner:"Filippo Pozzato",country:"🇮🇹",team:"Quick-Step"},
    {year:2005,winner:"Paolo Bettini",country:"🇮🇹",team:"Quick-Step"},
    {year:2004,winner:"Frédéric Guesdon",country:"🇫🇷",team:"Française des Jeux"},
    {year:2003,winner:"Alejandro Valverde",country:"🇪🇸",team:"Kelme"},
    {year:2002,winner:"Ludovic Capelle",country:"🇧🇪",team:"Landbouwkrediet"},
    {year:2001,winner:"Christophe Mengin",country:"🇫🇷",team:"Française des Jeux"},
    {year:2000,winner:"Laurent Brochard",country:"🇫🇷",team:"Festina"},
    {year:1999,winner:"Eddy Seigneur",country:"🇫🇷",team:"GAN"},
    {year:1998,winner:"Erik Zabel",country:"🇩🇪",team:"Deutsche Telekom"},
    {year:1997,winner:"Nicola Minali",country:"🇮🇹",team:"Roslotto"},
    {year:1996,winner:"Steffen Kjærgaard",country:"🇳🇴",team:"Festina"},
    {year:1995,winner:"Mario Cipollini",country:"🇮🇹",team:"Saeco"},
    {year:1994,winner:"Frédéric Moncassin",country:"🇫🇷",team:"Gan"},
    {year:1993,winner:"Olaf Ludwig",country:"🇩🇪",team:"Telekom"},
    {year:1992,winner:"Etienne De Wilde",country:"🇧🇪",team:"Histor"},
    {year:1991,winner:"Djordje Đokić",country:"🇷🇸",team:"Ariostea"},
    {year:1990,winner:"Johan Capiot",country:"🇧🇪",team:"Lotto"},
    {year:1989,winner:"Kelly Sean",country:"🇮🇪",team:"PDM"},
    {year:1988,winner:"Etienne De Wilde",country:"🇧🇪",team:"Histor"},
    {year:1987,winner:"Eddy Planckaert",country:"🇧🇪",team:"Panasonic"},
    {year:1986,winner:"Eric Vanderaerden",country:"🇧🇪",team:"Panasonic"},
    {year:1985,winner:"Guido Van Calster",country:"🇧🇪",team:"Hitachi"},
    {year:1984,winner:"Sean Kelly",country:"🇮🇪",team:"Skil"},
    {year:1983,winner:"Stephen Roche",country:"🇮🇪",team:"Peugeot"},
    {year:1982,winner:"Sean Kelly",country:"🇮🇪",team:"Sem"},
    {year:1981,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1980,winner:"Gilbert Duclos-Lassalle",country:"🇫🇷",team:"Renault"},
    {year:1979,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1978,winner:"Jan Raas",country:"🇳🇱",team:"Ti-Raleigh"},
    {year:1977,winner:"Walter Planckaert",country:"🇧🇪",team:"Flandria"},
    {year:1976,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1975,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1974,winner:"Marc Demeyer",country:"🇧🇪",team:"Flandria"},
    {year:1973,winner:"Eddy Merckx",country:"🇧🇪",team:"Molteni"},
    {year:1972,winner:"Cyrille Guimard",country:"🇫🇷",team:"Bic"},
    {year:1971,winner:"Noël Dejonckheere",country:"🇧🇪",team:"Molteni"},
    {year:1970,winner:"Herman Van Springel",country:"🇧🇪",team:"Molteni"},
    {year:1969,winner:"Herman Van Springel",country:"🇧🇪",team:"Molteni"},
    {year:1968,winner:"Michael Wright",country:"🇬🇧",team:"Mercier"},
    {year:1967,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1966,winner:"Jacques Anquetil",country:"🇫🇷",team:"Ford"},
    {year:1965,winner:"Jan Janssen",country:"🇳🇱",team:"Pelforth"},
    {year:1964,winner:"Joseph Groussard",country:"🇫🇷",team:"St Raphaël"},
    {year:1963,winner:"Rudi Altig",country:"🇩🇪",team:"Margnat"},
    {year:1962,winner:"Rudi Altig",country:"🇩🇪",team:"Margnat"},
    {year:1961,winner:"André Darrigade",country:"🇫🇷",team:"Helyett"},
    {year:1960,winner:"André Darrigade",country:"🇫🇷",team:"Helyett"},
    {year:1959,winner:"Miguel Poblet",country:"🇪🇸",team:"Ignis"},
    {year:1958,winner:"Henri Anglade",country:"🇫🇷",team:"Liberia"},
    {year:1957,winner:"André Darrigade",country:"🇫🇷",team:"Helyett"},
    {year:1956,winner:"Louis Caput",country:"🇫🇷",team:"Helyett"},
    {year:1955,winner:"André Darrigade",country:"🇫🇷",team:"Helyett"},
    {year:1954,winner:"Raphaël Géminiani",country:"🇫🇷",team:"La Perle"},
    {year:1953,winner:"Wout Wagtmans",country:"🇳🇱",team:"Peugeot"},
    {year:1952,winner:"Stan Ockers",country:"🇧🇪",team:"Peugeot"},
    {year:1951,winner:"André Mahé",country:"🇫🇷",team:"Helyett"},
    {year:1950,winner:"Jean Goldschmit",country:"🇱🇺",team:"Luxembourg"},
  ]},
};

// ─────────────────────────────────────────────
// WOMEN'S PALMARES
// ─────────────────────────────────────────────
const RACE_GROUPS_W = {
  "Grands Tours W":  { color:"#f97316", icon:"🏔️" },
  "Monuments W":     { color:"#facc15", icon:"🏛️" },
  "Classiques W":    { color:"#a78bfa", icon:"⚡" },
  "Courses hebdo W": { color:"#34d399", icon:"📅" },
};

const HISTORY_W = {
  // ══ GRANDS TOURS ══════════════════════════════════════════
  "Tour de France Femmes": { group:"Grands Tours W", icon:"🇫🇷", winners:[
    {year:2025,winner:"Pauline Ferrand-Prévot",country:"🇫🇷",team:"Visma-Lease a Bike",note:"1ère française depuis 1989"},
    {year:2024,winner:"Katarzyna Niewiadoma",country:"🇵🇱",team:"Canyon-SRAM"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar",note:"Médaille argent JO 2021"},
  ]},
  "Giro Donne": { group:"Grands Tours W", icon:"🇮🇹", winners:[
    {year:2025,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Lidl-Trek",note:"2e consécutif"},
    {year:2024,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Lidl-Trek"},
    {year:2023,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2020,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"CCC-Liv"},
    {year:2019,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Mitchelton-Scott"},
    {year:2018,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Mitchelton-Scott"},
    {year:2017,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Orica-Scott"},
    {year:2016,winner:"Mara Abbott",country:"🇺🇸",team:"Wiggle High5"},
    {year:2015,winner:"Megan Guarnier",country:"🇺🇸",team:"Velocio-SRAM"},
    {year:2014,winner:"Megan Guarnier",country:"🇺🇸",team:"Specialized-Lululemon"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Judith Arndt",country:"🇩🇪",team:"HTC-Highroad"},
    {year:2010,winner:"Fabiana Luperini",country:"🇮🇹",team:"Acca Due O"},
    {year:2009,winner:"Fabiana Luperini",country:"🇮🇹",team:"Acca Due O"},
    {year:2008,winner:"Fabiana Luperini",country:"🇮🇹",team:"Acca Due O"},
    {year:2007,winner:"Fabiana Luperini",country:"🇮🇹",team:"Acca Due O"},
    {year:2006,winner:"Amber Neben",country:"🇺🇸",team:"T-Mobile"},
    {year:2005,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger Versicherung"},
    {year:2004,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger Versicherung"},
    {year:2003,winner:"Trixi Worrack",country:"🇩🇪",team:"Nürnberger Versicherung"},
    {year:2002,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger Versicherung"},
    {year:2001,winner:"Zinaida Stahurskaya",country:"🇧🇾",team:"Acca Due O"},
    {year:2000,winner:"Zinaida Stahurskaya",country:"🇧🇾",team:"Acca Due O"},
  ]},
  "Vuelta Femenina": { group:"Grands Tours W", icon:"🇪🇸", winners:[
    {year:2025,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ",note:"2e Vuelta"},
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Anna van der Breggen",country:"🇳🇱",team:"SD Worx"},
    {year:2020,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2019,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Mitchelton-Scott"},
    {year:2018,winner:"Tatiana Guderzo",country:"🇮🇹",team:"Ale Cipollini"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Megan Guarnier",country:"🇺🇸",team:"Boels-Dolmans"},
    {year:2015,winner:"Megan Guarnier",country:"🇺🇸",team:"Boels-Dolmans"},
    {year:2014,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Giorgia Bronzini",country:"🇮🇹",team:"Servetto-Footon"},
  ]},
  // ══ MONUMENTS ══════════════════════════════════════════════
  "Strade Bianche W": { group:"Monuments W", icon:"🪨", winners:[
    {year:2025,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ"},
    {year:2024,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx-Protime"},
    {year:2023,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2022,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2021,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"SD Worx"},
    {year:2020,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2019,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Mitchelton-Scott"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Wiggle High5"},
    {year:2016,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Wiggle High5"},
    {year:2015,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Wiggle High5"},
  ]},
  "Paris-Roubaix Femmes": { group:"Monuments W", icon:"🧱", winners:[
    {year:2026,winner:"Franziska Koch",country:"🇩🇪",team:"FDJ-SUEZ",note:"record vitesse 40.834 kph"},
    {year:2025,winner:"Pauline Ferrand-Prévot",country:"🇫🇷",team:"Visma-Lease a Bike",note:"1ère française · solo 25km"},
    {year:2024,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx-Protime"},
    {year:2023,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2022,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2021,winner:"Lizzie Deignan",country:"🇬🇧",team:"Trek-Segafredo",note:"1ère édition moderne"},
  ]},
  "Tour des Flandres W": { group:"Monuments W", icon:"🇧🇪", winners:[
    {year:2026,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ",note:"1er Flandres · solo Oude Kwaremont"},
    {year:2025,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx-Protime",note:"3e Flandres"},
    {year:2024,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx-Protime"},
    {year:2023,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2020,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2019,winner:"Marta Bastianelli",country:"🇮🇹",team:"Ale BTC Ljubljana"},
    {year:2018,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Lizzie Deignan",country:"🇬🇧",team:"Boels-Dolmans"},
    {year:2015,winner:"Lizzie Deignan",country:"🇬🇧",team:"Boels-Dolmans"},
    {year:2014,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2010,winner:"Judith Arndt",country:"🇩🇪",team:"HTC-Columbia"},
    {year:2009,winner:"Judith Arndt",country:"🇩🇪",team:"HTC-Columbia"},
    {year:2008,winner:"Judith Arndt",country:"🇩🇪",team:"HTC-Columbia"},
    {year:2007,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2006,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2005,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2004,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
  ]},
  "Liège-Bastogne-Liège W": { group:"Monuments W", icon:"🌲", winners:[
    {year:2025,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ",note:"3e LBL consécutif"},
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2020,winner:"Demi Vollering",country:"🇳🇱",team:"CCC-Liv"},
    {year:2019,winner:"Marianne Vos",country:"🇳🇱",team:"CCC-Liv"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans",note:"1ère édition"},
  ]},
  "Il Lombardia W": { group:"Monuments W", icon:"🍂", winners:[
    {year:2025,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ",note:"3e Lombardia consécutif"},
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2020,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2019,winner:"Cecilie Uttrup Ludwig",country:"🇩🇰",team:"FDJ Nouvelle-Aquitaine"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans",note:"1ère édition"},
  ]},
  // ══ CLASSIQUES ═════════════════════════════════════════════
  "La Flèche Wallonne W": { group:"Classiques W", icon:"🏹", winners:[
    {year:2025,winner:"Demi Vollering",country:"🇳🇱",team:"FDJ-SUEZ"},
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2020,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"CCC-Liv"},
    {year:2019,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2015,winner:"Anna van der Breggen",country:"🇳🇱",team:"Raboliv"},
    {year:2014,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2010,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2009,winner:"Kirsten Wild",country:"🇳🇱",team:"AA Drink-Leontien.nl"},
    {year:2008,winner:"Nicole Cooke",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Fenixs"},
    {year:2007,winner:"Nicole Cooke",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Fenixs"},
    {year:2006,winner:"Trixi Worrack",country:"🇩🇪",team:"Nürnberger"},
    {year:2005,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger"},
    {year:2004,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2003,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger"},
    {year:2002,winner:"Nicole Cooke",country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",team:"Doncaster"},
    {year:2001,winner:"Anke Erlank",country:"🇩🇪",team:"Nürnberger"},
    {year:2000,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:1999,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1998,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1997,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1996,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1995,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1994,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1993,winner:"Jeannie Longo",country:"🇫🇷",team:"France"},
    {year:1992,winner:"Jeannie Longo",country:"🇫🇷",team:"France",note:"1ère édition"},
  ]},
  "Gand-Wevelgem W": { group:"Classiques W", icon:"💨", winners:[
    {year:2024,winner:"Fem van Empel",country:"🇳🇱",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Marianne Vos",country:"🇳🇱",team:"Jumbo-Visma"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Lotte Kopecky",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2020,winner:"Jolien D'hoore",country:"🇧🇪",team:"SD Worx"},
    {year:2019,winner:"Lorena Wiebes",country:"🇳🇱",team:"Parkhotel Valkenburg"},
    {year:2018,winner:"Elena Cecchini",country:"🇮🇹",team:"Canyon-SRAM"},
    {year:2017,winner:"Kirsten Wild",country:"🇳🇱",team:"Cylance Pro Cycling"},
    {year:2016,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2015,winner:"Jolien D'hoore",country:"🇧🇪",team:"Wiggle-Honda"},
    {year:2014,winner:"Emma Johansson",country:"🇸🇪",team:"Orica-AIS"},
    {year:2013,winner:"Lotta Lepistö",country:"🇫🇮",team:"Specialized-Lululemon"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv",note:"1ère édition"},
  ]},
  "Amstel Gold Race W": { group:"Classiques W", icon:"🍺", winners:[
    {year:2024,winner:"Marianne Vos",country:"🇳🇱",team:"Visma-Lease a Bike"},
    {year:2023,winner:"Marianne Vos",country:"🇳🇱",team:"Jumbo-Visma"},
    {year:2022,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2021,winner:"Anna van der Breggen",country:"🇳🇱",team:"SD Worx"},
    {year:2020,winner:"—",country:"",team:"Annulée (Covid-19)"},
    {year:2019,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2015,winner:"Lizzie Deignan",country:"🇬🇧",team:"Boels-Dolmans"},
    {year:2014,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2010,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2009,winner:"Judith Arndt",country:"🇩🇪",team:"HTC-Columbia"},
    {year:2008,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2007,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2006,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2005,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2004,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2003,winner:"Zinaida Stahurskaya",country:"🇧🇾",team:"Acca Due O"},
    {year:2002,winner:"Mirjam Melchers",country:"🇳🇱",team:"Lotto-Ladiesteam"},
    {year:2001,winner:"Edita Pucinskaite",country:"🇱🇹",team:"Nürnberger"},
  ]},
  "Clásica San Sebastián W": { group:"Classiques W", icon:"🌊", winners:[
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2021,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2020,winner:"Cecilie Uttrup Ludwig",country:"🇩🇰",team:"FDJ Nouvelle-Aquitaine"},
    {year:2019,winner:"Marta Cavalli",country:"🇮🇹",team:"FDJ Nouvelle-Aquitaine"},
    {year:2018,winner:"Leah Thomas",country:"🇺🇸",team:"Bigla Pro Cycling"},
    {year:2017,winner:"Eugenia Bujak",country:"🇸🇮",team:"BTC Ljubljana"},
    {year:2016,winner:"Katarzyna Pawlowska",country:"🇵🇱",team:"Boels-Dolmans"},
    {year:2015,winner:"Alena Amialiusik",country:"🇧🇾",team:"Velocio-SRAM"},
    {year:2014,winner:"Megan Guarnier",country:"🇺🇸",team:"Specialized-Lululemon"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2012,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2011,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv",note:"1ère édition"},
  ]},
  // ══ COURSES HEBDO ══════════════════════════════════════════
  "Tour de Suisse W": { group:"Courses hebdo W", icon:"🇨🇭", winners:[
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2021,winner:"Marlen Reusser",country:"🇨🇭",team:"Alé BTC Ljubljana"},
    {year:2020,winner:"Marlen Reusser",country:"🇨🇭",team:"Bigla Pro Cycling"},
    {year:2019,winner:"Marlen Reusser",country:"🇨🇭",team:"Bigla Pro Cycling",note:"1ère édition"},
  ]},
  "Vuelta CV Feminas": { group:"Courses hebdo W", icon:"☀️", winners:[
    {year:2024,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx-Protime"},
    {year:2023,winner:"Demi Vollering",country:"🇳🇱",team:"SD Worx"},
    {year:2022,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Movistar"},
    {year:2021,winner:"Elisa Longo Borghini",country:"🇮🇹",team:"Trek-Segafredo"},
    {year:2020,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2019,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Mitchelton-Scott"},
    {year:2018,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Anna van der Breggen",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Annemiek van Vleuten",country:"🇳🇱",team:"Raboliv"},
    {year:2015,winner:"Anna van der Breggen",country:"🇳🇱",team:"Raboliv"},
    {year:2014,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
    {year:2013,winner:"Marianne Vos",country:"🇳🇱",team:"Raboliv"},
  ]},
  "Omloop Het Nieuwsblad W": { group:"Courses hebdo W", icon:"🌬️", winners:[
    {year:2024,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx-Protime"},
    {year:2023,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2022,winner:"Lotte Kopecky",country:"🇧🇪",team:"SD Worx"},
    {year:2021,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"SD Worx"},
    {year:2020,winner:"Lotte Kopecky",country:"🇧🇪",team:"Lotto Soudal"},
    {year:2019,winner:"Lisa Brennauer",country:"🇩🇪",team:"Canyon-SRAM"},
    {year:2018,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2017,winner:"Chantal van den Broek-Blaak",country:"🇳🇱",team:"Boels-Dolmans"},
    {year:2016,winner:"Jolien D'hoore",country:"🇧🇪",team:"Wiggle High5"},
    {year:2015,winner:"Jolien D'hoore",country:"🇧🇪",team:"Wiggle-Honda"},
    {year:2014,winner:"Jolien D'hoore",country:"🇧🇪",team:"Wiggle-Honda"},
    {year:2013,winner:"Jolien D'hoore",country:"🇧🇪",team:"Wiggle-Honda"},
    {year:2012,winner:"Ellen van Dijk",country:"🇳🇱",team:"Specialized-Lululemon",note:"1ère édition"},
  ]},
};

// ─────────────────────────────────────────────
// PROGNOSTIC ENGINE — RIDERS & PROFILES
// Attributs sur 100 : spr=sprint, clm=montée, tt=CLM, pnc=punch, cbl=pavés, end=endurance, frm=forme actuelle
// ─────────────────────────────────────────────

// Helper: find rider object by name across both rosters; returns null if not in roster
function findRiderByName(name) {
  return RIDERS_M.find(r=>r.name===name) || RIDERS_W.find(r=>r.name===name) || null;
}

// Helper: extract all wins for a given rider name across all races (M and W)
function getRiderVictories(name) {
  const out = [];
  // Search men's history
  for (const [raceName, race] of Object.entries(HISTORY)) {
    for (const w of race.winners||[]) {
      if (w.winner === name) {
        out.push({ race:raceName, year:w.year, group:race.group, icon:race.icon, team:w.team, note:w.note });
      }
    }
  }
  // Search women's history
  if (typeof HISTORY_W !== "undefined") {
    for (const [raceName, race] of Object.entries(HISTORY_W)) {
      for (const w of race.winners||[]) {
        if (w.winner === name) {
          out.push({ race:raceName, year:w.year, group:race.group, icon:race.icon, team:w.team, note:w.note });
        }
      }
    }
  }
  return out.sort((a,b)=>b.year-a.year);
}

const RIDERS_M = [
  // GC / Grimpeurs
  {name:"Tadej Pogačar",     country:"🇸🇮", team:"UAE Team Emirates-XRG", spr:70, clm:99, tt:88, pnc:97, cbl:78, end:96, frm:99},
  {name:"Jonas Vingegaard",  country:"🇩🇰", team:"Visma-Lease a Bike",    spr:35, clm:98, tt:85, pnc:75, cbl:25, end:96, frm:95},
  {name:"Remco Evenepoel",   country:"🇧🇪", team:"Soudal Quick-Step",     spr:55, clm:88, tt:99, pnc:92, cbl:50, end:88, frm:80},
  {name:"Primož Roglič",     country:"🇸🇮", team:"Red Bull-BORA",         spr:55, clm:92, tt:90, pnc:88, cbl:40, end:92, frm:82},
  {name:"Simon Yates",       country:"🇬🇧", team:"Visma-Lease a Bike",    spr:38, clm:90, tt:72, pnc:75, cbl:30, end:88, frm:88},
  {name:"Isaac del Toro",    country:"🇲🇽", team:"UAE Team Emirates-XRG", spr:55, clm:88, tt:75, pnc:80, cbl:35, end:80, frm:90},
  {name:"Florian Lipowitz",  country:"🇩🇪", team:"Red Bull-BORA",         spr:40, clm:85, tt:78, pnc:72, cbl:30, end:82, frm:88},
  {name:"Carlos Rodríguez",  country:"🇪🇸", team:"Ineos Grenadiers",      spr:40, clm:87, tt:78, pnc:75, cbl:30, end:85, frm:80},
  {name:"Juan Ayuso",        country:"🇪🇸", team:"UAE Team Emirates-XRG", spr:38, clm:88, tt:82, pnc:72, cbl:30, end:82, frm:85},
  {name:"João Almeida",      country:"🇵🇹", team:"UAE Team Emirates-XRG", spr:40, clm:90, tt:84, pnc:75, cbl:35, end:88, frm:90},
  {name:"Adam Yates",        country:"🇬🇧", team:"UAE Team Emirates-XRG", spr:38, clm:86, tt:75, pnc:75, cbl:35, end:85, frm:78},
  {name:"Paul Seixas",       country:"🇫🇷", team:"Decathlon CMA CGM",     spr:40, clm:84, tt:75, pnc:78, cbl:30, end:78, frm:85},
  {name:"Kévin Vauquelin",   country:"🇫🇷", team:"Arkéa-B&B Hotels",      spr:55, clm:80, tt:78, pnc:80, cbl:40, end:78, frm:82},
  {name:"Richard Carapaz",   country:"🇪🇨", team:"EF Education-EasyPost", spr:35, clm:86, tt:72, pnc:72, cbl:30, end:82, frm:78},
  {name:"Egan Bernal",       country:"🇨🇴", team:"Ineos Grenadiers",      spr:30, clm:84, tt:70, pnc:68, cbl:30, end:80, frm:72},
  {name:"Geraint Thomas",    country:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", team:"Ineos Grenadiers",      spr:40, clm:78, tt:82, pnc:70, cbl:55, end:85, frm:70},
  // Classics / Punchy
  {name:"Mathieu van der Poel", country:"🇳🇱", team:"Alpecin-Premier Tech", spr:85, clm:55, tt:72, pnc:99, cbl:99, end:75, frm:90},
  {name:"Wout van Aert",     country:"🇧🇪", team:"Visma-Lease a Bike",    spr:88, clm:60, tt:88, pnc:96, cbl:97, end:80, frm:94},
  {name:"Mads Pedersen",     country:"🇩🇰", team:"Lidl-Trek",             spr:88, clm:50, tt:78, pnc:90, cbl:92, end:78, frm:90},
  {name:"Tom Pidcock",       country:"🇬🇧", team:"Pinarello-Q36.5",       spr:65, clm:80, tt:72, pnc:90, cbl:78, end:78, frm:90},
  {name:"Julian Alaphilippe",country:"🇫🇷", team:"Tudor Pro Cycling",     spr:62, clm:62, tt:70, pnc:88, cbl:65, end:72, frm:75},
  {name:"Marc Hirschi",      country:"🇨🇭", team:"Tudor Pro Cycling",     spr:55, clm:76, tt:65, pnc:88, cbl:60, end:75, frm:80},
  {name:"Jasper Stuyven",    country:"🇧🇪", team:"Soudal Quick-Step",     spr:75, clm:50, tt:68, pnc:80, cbl:90, end:72, frm:82},
  // Sprinters
  {name:"Jasper Philipsen",  country:"🇧🇪", team:"Alpecin-Premier Tech",  spr:99, clm:28, tt:55, pnc:72, cbl:88, end:65, frm:88},
  {name:"Tim Merlier",       country:"🇧🇪", team:"Soudal Quick-Step",     spr:97, clm:25, tt:55, pnc:68, cbl:78, end:60, frm:88},
  {name:"Olav Kooij",        country:"🇳🇱", team:"Visma-Lease a Bike",    spr:94, clm:30, tt:55, pnc:65, cbl:75, end:60, frm:88},
  {name:"Arnaud De Lie",     country:"🇧🇪", team:"Lotto",                 spr:88, clm:38, tt:55, pnc:80, cbl:78, end:65, frm:82},
  {name:"Biniam Girmay",     country:"🇪🇷", team:"Intermarché-Wanty",     spr:88, clm:42, tt:55, pnc:78, cbl:80, end:68, frm:80},
  {name:"Paul Magnier",      country:"🇫🇷", team:"Soudal Quick-Step",     spr:90, clm:35, tt:55, pnc:75, cbl:72, end:65, frm:85},
  // TT specialists
  {name:"Filippo Ganna",     country:"🇮🇹", team:"Ineos Grenadiers",      spr:65, clm:35, tt:99, pnc:65, cbl:75, end:70, frm:85},
  {name:"Joshua Tarling",    country:"🇬🇧", team:"Ineos Grenadiers",      spr:55, clm:42, tt:96, pnc:62, cbl:70, end:72, frm:88},
  {name:"Stefan Küng",       country:"🇨🇭", team:"Groupama-FDJ",          spr:55, clm:38, tt:92, pnc:70, cbl:78, end:70, frm:78},
];

const RIDERS_W = [
  {name:"Demi Vollering",        country:"🇳🇱", team:"FDJ-SUEZ",            spr:55, clm:97, tt:88, pnc:94, cbl:55, end:92, frm:97},
  {name:"Pauline Ferrand-Prévot",country:"🇫🇷", team:"Visma-Lease a Bike",  spr:62, clm:90, tt:78, pnc:90, cbl:85, end:88, frm:97},
  {name:"Lotte Kopecky",         country:"🇧🇪", team:"SD Worx-Protime",     spr:88, clm:65, tt:78, pnc:96, cbl:96, end:80, frm:85},
  {name:"Elisa Longo Borghini",  country:"🇮🇹", team:"Lidl-Trek",           spr:55, clm:90, tt:75, pnc:90, cbl:90, end:90, frm:93},
  {name:"Marianne Vos",          country:"🇳🇱", team:"Visma-Lease a Bike",  spr:90, clm:65, tt:75, pnc:95, cbl:90, end:80, frm:88},
  {name:"Katarzyna Niewiadoma",  country:"🇵🇱", team:"Canyon-SRAM",         spr:50, clm:88, tt:70, pnc:88, cbl:55, end:86, frm:85},
  {name:"Lorena Wiebes",         country:"🇳🇱", team:"SD Worx-Protime",     spr:99, clm:25, tt:58, pnc:68, cbl:78, end:55, frm:96},
  {name:"Franziska Koch",        country:"🇩🇪", team:"FDJ-SUEZ",            spr:85, clm:48, tt:65, pnc:78, cbl:88, end:70, frm:90},
  {name:"Charlotte Kool",        country:"🇳🇱", team:"Picnic PostNL",       spr:90, clm:30, tt:55, pnc:60, cbl:65, end:55, frm:80},
  {name:"Marlen Reusser",        country:"🇨🇭", team:"Movistar",            spr:55, clm:78, tt:97, pnc:78, cbl:65, end:82, frm:88},
  {name:"Puck Pieterse",         country:"🇳🇱", team:"Fenix-Deceuninck",    spr:75, clm:78, tt:68, pnc:92, cbl:82, end:75, frm:90},
  {name:"Niamh Fisher-Black",    country:"🇳🇿", team:"Lidl-Trek",           spr:50, clm:84, tt:65, pnc:75, cbl:50, end:80, frm:80},
  {name:"Juliette Labous",       country:"🇫🇷", team:"FDJ-SUEZ",            spr:35, clm:82, tt:75, pnc:65, cbl:30, end:80, frm:78},
  {name:"Cecilie Uttrup Ludwig", country:"🇩🇰", team:"FDJ-SUEZ",            spr:50, clm:78, tt:65, pnc:82, cbl:50, end:75, frm:75},
  {name:"Ellen van Dijk",        country:"🇳🇱", team:"Lidl-Trek",           spr:55, clm:35, tt:90, pnc:65, cbl:80, end:72, frm:78},
  {name:"Chloé Dygert",          country:"🇺🇸", team:"Canyon-SRAM",         spr:65, clm:55, tt:96, pnc:75, cbl:72, end:72, frm:82},
  {name:"Liane Lippert",         country:"🇩🇪", team:"Movistar",            spr:60, clm:80, tt:70, pnc:80, cbl:55, end:78, frm:80},
  {name:"Elisa Balsamo",         country:"🇮🇹", team:"Lidl-Trek",           spr:88, clm:55, tt:65, pnc:75, cbl:75, end:65, frm:80},
  {name:"Anna van der Breggen",  country:"🇳🇱", team:"SD Worx-Protime",     spr:50, clm:88, tt:80, pnc:86, cbl:55, end:85, frm:80},
];

// Stage profiles — chaque profil pondère les attributs (somme = 1)
const STAGE_PROFILES = [
  {id:"flat",    label:"Plat / Sprint",    icon:"🏁", color:"#22d3ee", desc:"Sprint massif",      weights:{spr:.65, clm:.05, tt:.05, pnc:.05, cbl:.10, end:.10}},
  {id:"hilly",   label:"Vallonné",         icon:"🌄", color:"#a78bfa", desc:"Punch & classique",  weights:{spr:.10, clm:.15, tt:.10, pnc:.45, cbl:.05, end:.15}},
  {id:"midmtn",  label:"Moyenne montagne", icon:"⛰️", color:"#fb923c", desc:"Côtes & cols moyens",weights:{spr:.05, clm:.50, tt:.10, pnc:.20, cbl:.00, end:.15}},
  {id:"highmtn", label:"Haute montagne",   icon:"🏔️", color:"#ef4444", desc:"Cols hors catégorie",weights:{spr:.00, clm:.70, tt:.05, pnc:.10, cbl:.00, end:.15}},
  {id:"itt",     label:"CLM individuel",   icon:"⏱️", color:"#facc15", desc:"Contre-la-montre",   weights:{spr:.05, clm:.05, tt:.75, pnc:.05, cbl:.05, end:.05}},
  {id:"mtnitt",  label:"CLM en montée",    icon:"🧗", color:"#f97316", desc:"CLM montagnard",     weights:{spr:.00, clm:.40, tt:.45, pnc:.05, cbl:.00, end:.10}},
  {id:"cobbles", label:"Pavés",            icon:"🧱", color:"#94a3b8", desc:"Secteurs pavés",     weights:{spr:.10, clm:.00, tt:.05, pnc:.20, cbl:.55, end:.10}},
];

// Stage races — pondérations spécifiques au profil global de chaque course
const STAGE_RACES = [
  {id:"tdf",      label:"Tour de France",       icon:"🇫🇷", desc:"Grand Tour 21 étapes",        weights:{spr:.05, clm:.45, tt:.20, pnc:.10, cbl:.00, end:.20}},
  {id:"giro",     label:"Giro d'Italia",        icon:"🇮🇹", desc:"Grand Tour montagneux",       weights:{spr:.04, clm:.50, tt:.18, pnc:.08, cbl:.00, end:.20}},
  {id:"vuelta",   label:"Vuelta a España",      icon:"🇪🇸", desc:"Très accidentée, peu CLM",    weights:{spr:.05, clm:.55, tt:.10, pnc:.10, cbl:.00, end:.20}},
  {id:"parisnice",label:"Paris-Nice",           icon:"☀️", desc:"8 jours, profil mixte",       weights:{spr:.10, clm:.40, tt:.20, pnc:.20, cbl:.00, end:.10}},
  {id:"dauphine", label:"Critérium du Dauphiné",icon:"🏔️", desc:"Répétition générale TdF",     weights:{spr:.05, clm:.50, tt:.20, pnc:.10, cbl:.00, end:.15}},
  {id:"suisse",   label:"Tour de Suisse",       icon:"🇨🇭", desc:"Profil alpin équilibré",      weights:{spr:.05, clm:.45, tt:.20, pnc:.15, cbl:.00, end:.15}},
  {id:"tirreno",  label:"Tirreno-Adriatico",    icon:"🌊", desc:"Punch & vallons",              weights:{spr:.10, clm:.30, tt:.20, pnc:.25, cbl:.05, end:.10}},
  {id:"catalunya",label:"Volta a Catalunya",    icon:"🇪🇸", desc:"Mi-montagne dominante",       weights:{spr:.05, clm:.50, tt:.10, pnc:.20, cbl:.00, end:.15}},
];

// ─────────────────────────────────────────────
// PROGNOSTIC ALGORITHM
// Score = Σ(attribut × poids du profil), modulé par la forme actuelle
// Probabilités = softmax sur le top 12 avec température T=4
// ─────────────────────────────────────────────
function predictWinners(weights, riders, count=10, temperature=4) {
  const scored = riders.map(r=>{
    let s=0;
    for(const k in weights) s += (r[k]||0) * weights[k];
    // Form modulator: 0.85x à 1.15x selon forme actuelle
    s *= 0.85 + (r.frm/100) * 0.30;
    return {...r, score:s};
  }).sort((a,b)=>b.score-a.score);

  const top = scored.slice(0, count);
  const max = top[0].score;
  const exps = top.map(r=>Math.exp((r.score-max)/temperature));
  const sum = exps.reduce((a,b)=>a+b,0);
  return top.map((r,i)=>({...r, prob:(exps[i]/sum)*100}));
}

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const CATEGORIES = [
  { id:"palmares", label:"Palmarès",  icon:"🏆", desc:"Palmarès & vainqueurs" },
  { id:"coureurs", label:"Coureurs",  icon:"🚴", desc:"Stats & carrières" },
  { id:"courses",  label:"Courses",   icon:"🗺️", desc:"Tour, Giro, Classics" },
  { id:"records",  label:"Records",   icon:"📊", desc:"Watts, vitesses, données" },
  { id:"actualite",label:"Actu",      icon:"📡", desc:"Équipes & règles" },
  { id:"all",      label:"Mixte",     icon:"🎲", desc:"Tout mélangé" },
];
const DIFFICULTIES = [
  { id:"facile",   label:"Amateur",    color:"#4ade80", icon:"🟢" },
  { id:"moyen",    label:"Domestique", color:"#facc15", icon:"🟡" },
  { id:"difficile",label:"Pro",        color:"#f97316", icon:"🟠" },
  { id:"expert",   label:"DataGeek",   color:"#ef4444", icon:"🔴" },
];

function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }
function getQuestions(cat, diff, n=10) {
  const pool = QUESTIONS.filter(q=>(cat==="all"||q.cat===cat)&&q.diff===diff);
  const s = shuffle(pool);
  if(s.length>=n) return s.slice(0,n);
  const extra = shuffle(QUESTIONS.filter(q=>(cat==="all"||q.cat===cat)&&q.diff!==diff));
  return [...s,...extra].slice(0,n);
}

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold:    #facc15;
    --orange:  #f97316;
    --red:     #ef4444;
    --green:   #4ade80;
    --cyan:    #22d3ee;
    --purple:  #a78bfa;
    --bg:      #080808;
    --surface: #0f0f0f;
    --surface2:#141414;
    --border:  #1e1e1e;
    --border2: #252525;
    --text:    #e8e8e8;
    --muted:   #666;
    --faint:   #2a2a2a;
    --font-display: 'Bebas Neue', cursive;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'Space Mono', monospace;
  }

  html, body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }
  button { font-family: var(--font-body); }

  /* Grain texture overlay */
  body::after {
    content: '';
    position: fixed; inset: 0; z-index: 9999;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    opacity: .6;
    mix-blend-mode: overlay;
  }

  /* Animations */
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:.5; } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
  @keyframes glow    { 0%,100% { box-shadow:0 0 12px #facc1540; } 50% { box-shadow:0 0 28px #facc1580; } }
  @keyframes dashReveal { from { stroke-dashoffset: 427; } }
  @keyframes countUp { from { opacity:0; transform:scale(.8); } to { opacity:1; transform:scale(1); } }
  @keyframes raceLine { from { transform:scaleX(0); } to { transform:scaleX(1); } }

  .fade-up   { animation: fadeUp  .35s ease both; }
  .slide-in  { animation: slideIn .3s  ease both; }

  /* Card base */
  .card {
    background: linear-gradient(145deg, var(--surface2) 0%, var(--surface) 100%);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 4px 24px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.03);
  }
  .card-hover {
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  }
  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04);
    border-color: var(--border2);
  }
`;

// ─────────────────────────────────────────────
// SHARED UI
// ─────────────────────────────────────────────

function WheelIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#facc15" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="5"  stroke="#facc15" strokeWidth="1.5"/>
      <line x1="16" y1="2"  x2="16" y2="11" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16" y1="21" x2="16" y2="30" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="2"  y1="16" x2="11" y2="16" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="21" y1="16" x2="30" y2="16" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4.9" y1="4.9"  x2="11.4" y2="11.4" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20.6" y1="20.6" x2="27.1" y2="27.1" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="27.1" y1="4.9"  x2="20.6" y2="11.4" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11.4" y1="20.6" x2="4.9"  y2="27.1" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function Logo({compact}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <WheelIcon/>
      <div>
        <div style={{fontFamily:"var(--font-display)",fontSize:compact?18:22,letterSpacing:4,color:"#fff",lineHeight:1}}>PÉLOTON IQ</div>
        {!compact&&<div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",marginTop:2}}>Encyclopédie du Cyclisme</div>}
      </div>
    </div>
  );
}

function RaceLine({color="#facc15",delay=0}) {
  return (
    <div style={{
      height:2, background:`linear-gradient(90deg, transparent, ${color}, transparent)`,
      borderRadius:1, transformOrigin:"left",
      animation:`raceLine .6s ${delay}s ease both`,
    }}/>
  );
}

function ProgressBar({current,total}) {
  const pct = (current/total)*100;
  return (
    <div style={{position:"relative",width:"100%",height:3,background:"var(--faint)",borderRadius:3,overflow:"hidden"}}>
      <div style={{
        position:"absolute",inset:0,
        width:`${pct}%`,
        background:"linear-gradient(90deg,var(--gold),var(--orange))",
        borderRadius:3,
        transition:"width .5s cubic-bezier(.4,0,.2,1)",
        boxShadow:"0 0 8px var(--gold)60",
      }}/>
    </div>
  );
}

function BottomNav({active, setActive}) {
  const tabs = [
    {id:"quiz",     label:"Quiz",     icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>},
    {id:"resultats",label:"Récents",  icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>},
    {id:"pronostics",label:"Pronos",  icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>},
    {id:"palmares", label:"Palmarès", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 21h8M12 17v4M17 7c0 2.8-2.2 5-5 5S7 9.8 7 7V3h10v4z"/><path d="M7 7H4l1 4h2M17 7h3l-1 4h-2"/></svg>},
  ];
  return (
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,
      background:"rgba(8,8,8,.92)",
      backdropFilter:"blur(20px)",
      borderTop:"1px solid var(--border)",
      display:"flex",zIndex:100,
      boxShadow:"0 -8px 32px rgba(0,0,0,.5)",
    }}>
      {tabs.map(t=>{
        const isActive = active===t.id;
        return (
          <button key={t.id} onClick={()=>setActive(t.id)} style={{
            flex:1, padding:"10px 4px 16px",
            background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            color: isActive?"var(--gold)":"var(--faint)",
            transition:"color .2s ease",
            position:"relative",
          }}>
            {isActive&&<div style={{
              position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
              width:36,height:2,
              background:"linear-gradient(90deg,transparent,var(--gold),transparent)",
              borderRadius:"0 0 2px 2px",
            }}/>}
            <span style={{transition:"transform .2s ease",transform:isActive?"scale(1.15)":"scale(1)",color:isActive?"var(--gold)":"#333"}}>
              {t.icon}
            </span>
            <span style={{
              fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,
              letterSpacing:1.5,textTransform:"uppercase",
              color:isActive?"var(--gold)":"var(--faint)",
              transition:"color .2s ease",
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// QUIZ FLOW
// ─────────────────────────────────────────────

function QuizHome({onStart,bestScore,totalPlayed}) {
  const [cat,setCat]=useState(null);
  const [diff,setDiff]=useState(null);
  const avail = cat&&diff ? QUESTIONS.filter(q=>(cat==="all"||q.cat===cat)&&q.diff===diff).length : 0;
  const ready = cat&&diff;

  return (
    <div style={{paddingBottom:80,minHeight:"100vh"}}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(180deg,#111 0%,var(--bg) 100%)",
        borderBottom:"1px solid var(--border)",
        padding:"16px 20px",
        display:"flex",justifyContent:"space-between",alignItems:"center",
      }}>
        <Logo/>
        {totalPlayed>0&&(
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:2,marginBottom:2}}>BEST SCORE</div>
            <div style={{fontFamily:"var(--font-display)",fontSize:26,color:"var(--gold)",lineHeight:1,textShadow:"0 0 16px var(--gold)60"}}>{bestScore}<span style={{fontSize:14,color:"var(--muted)"}}>/10</span></div>
          </div>
        )}
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"0 18px"}}>
        {/* Hero */}
        <div style={{
          position:"relative",overflow:"hidden",
          padding:"36px 24px 32px",
          marginBottom:24,
          background:"linear-gradient(135deg,#111 0%,#0d0d0d 100%)",
          borderBottom:"1px solid var(--border)",
        }}>
          {/* Diagonal accent stripes */}
          <div style={{position:"absolute",top:0,right:-40,width:160,height:"100%",background:"linear-gradient(135deg,transparent 0%,#facc1508 50%,transparent 100%)",transform:"skewX(-15deg)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:0,right:20,width:2,height:"100%",background:"linear-gradient(180deg,transparent,#facc1530,transparent)",pointerEvents:"none"}}/>

          <div style={{position:"relative"}}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:6,marginBottom:14,
              background:"#facc1510",border:"1px solid #facc1525",
              borderRadius:100,padding:"4px 12px",
              fontFamily:"var(--font-mono)",fontSize:9,color:"var(--gold)",letterSpacing:2,
            }}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"var(--gold)",animation:"pulse 2s infinite"}}/>
              {QUESTIONS.length} QUESTIONS · PROCYCLINGSTATS.COM
            </div>

            <h1 style={{
              fontFamily:"var(--font-display)",
              fontSize:"clamp(40px,10vw,72px)",
              letterSpacing:2,lineHeight:.92,
              margin:"0 0 14px",
              background:"linear-gradient(135deg,#fff 0%,var(--gold) 45%,var(--orange) 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>ENCYCLOPÉDIE<br/>DU CYCLISME</h1>

            <p style={{color:"var(--muted)",fontSize:12,lineHeight:1.7,fontFamily:"var(--font-body)",letterSpacing:.3}}>
              Teste tes connaissances sur les vraies stats du cyclisme professionnel.
            </p>
          </div>
        </div>

        {/* Category */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:3}}>01 / CATÉGORIE</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {CATEGORIES.map((c,i)=>{
              const isOn = cat===c.id;
              return (
                <button key={c.id} onClick={()=>setCat(c.id)} className="card-hover" style={{
                  background: isOn?"linear-gradient(145deg,#1a1400,#120e00)":"linear-gradient(145deg,var(--surface2),var(--surface))",
                  border: isOn?"1px solid #facc1550":"1px solid var(--border)",
                  borderRadius:12,padding:"12px 10px",
                  cursor:"pointer",textAlign:"left",
                  boxShadow: isOn?"0 4px 20px #facc1520,inset 0 1px 0 #facc1515":"0 2px 12px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.03)",
                  transition:"all .2s ease",
                  animation:`fadeUp .3s ${i*.05}s ease both`,
                }}>
                  <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
                  <div style={{
                    color: isOn?"var(--gold)":"#aaa",
                    fontFamily:"var(--font-body)",fontWeight:700,fontSize:11,
                    marginBottom:3,letterSpacing:.3,
                  }}>{c.label}</div>
                  <div style={{color:isOn?"#facc1560":"var(--faint)",fontSize:9,fontFamily:"var(--font-mono)",letterSpacing:.5}}>{c.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:3}}>02 / NIVEAU</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {DIFFICULTIES.map((d,i)=>{
              const isOn = diff===d.id;
              return (
                <button key={d.id} onClick={()=>setDiff(d.id)} style={{
                  background: isOn?`${d.color}15`:"var(--surface)",
                  border: isOn?`1px solid ${d.color}60`:"1px solid var(--border)",
                  borderRadius:10,padding:"12px 6px",
                  cursor:"pointer",textAlign:"center",
                  boxShadow: isOn?`0 4px 16px ${d.color}20`:"none",
                  transition:"all .2s ease",
                  animation:`fadeUp .3s ${i*.06}s ease both`,
                }}>
                  <div style={{fontSize:14,marginBottom:4}}>{d.icon}</div>
                  <div style={{color:isOn?d.color:"#777",fontWeight:700,fontSize:10,letterSpacing:.3,lineHeight:1.2}}>{d.label}</div>
                </button>
              );
            })}
          </div>
          {cat&&diff&&(
            <div style={{
              marginTop:8,display:"flex",justifyContent:"flex-end",alignItems:"center",gap:5,
              fontFamily:"var(--font-mono)",fontSize:9,
              color:avail>=10?"var(--green)":"var(--gold)",
            }}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>
              {avail} questions disponibles
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          disabled={!ready}
          onClick={()=>onStart(cat,diff)}
          style={{
            width:"100%",padding:"18px",
            background: ready
              ? "linear-gradient(135deg,var(--gold) 0%,var(--orange) 100%)"
              : "var(--surface)",
            border: ready?"none":"1px solid var(--border)",
            borderRadius:14,
            cursor: ready?"pointer":"not-allowed",
            fontFamily:"var(--font-display)",
            fontSize:22,letterSpacing:5,
            color: ready?"#080808":"var(--faint)",
            transition:"all .25s ease",
            boxShadow: ready?"0 8px 28px var(--orange)40, inset 0 1px 0 rgba(255,255,255,.2)":"none",
            position:"relative",overflow:"hidden",
          }}
        >
          {ready&&<div style={{
            position:"absolute",inset:0,
            background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,.15) 50%,transparent 100%)",
            backgroundSize:"200% 100%",
            animation:"shimmer 2.5s infinite",
          }}/>}
          <span style={{position:"relative"}}>
            {ready?"LANCER LE QUIZ →":"CHOISIS CATÉGORIE + NIVEAU"}
          </span>
        </button>
        <div style={{height:20}}/>
      </div>
    </div>
  );
}

function QuizGame({category,difficulty,onFinish}) {
  const TOTAL=10;
  const [questions]=useState(()=>getQuestions(category,difficulty,TOTAL));
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [rev,setRev]=useState(false);
  const [score,setScore]=useState(0);
  const [tl,setTl]=useState(30);
  const ref=useRef(); const to=useRef(false);
  const q=questions[qi];

  useEffect(()=>{setSel(null);setRev(false);setTl(30);to.current=false;},[qi]);
  useEffect(()=>{
    if(rev){clearInterval(ref.current);return;}
    ref.current=setInterval(()=>setTl(t=>{if(t<=1){clearInterval(ref.current);if(!to.current){to.current=true;setRev(true);}return 0;}return t-1;}),1000);
    return()=>clearInterval(ref.current);
  },[rev,qi]);

  const pick=(i)=>{if(rev)return;clearInterval(ref.current);setSel(i);setRev(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qi+1>=questions.length)onFinish(score+(sel===q.correct&&!to.current?1:0));else setQi(i=>i+1);};

  const tc = tl>18?"var(--green)":tl>8?"var(--gold)":"var(--red)";
  const tp = (tl/30)*100;
  const diff = DIFFICULTIES.find(d=>d.id===difficulty);
  const catLabel = CATEGORIES.find(c=>c.id===category)?.label||"Mixte";

  const getOptStyle=(i)=>{
    if(!rev) return {
      bg:"linear-gradient(145deg,var(--surface2),var(--surface))",
      bd:"var(--border)", co:"var(--text)", lc:"var(--faint)",
      shadow:"0 2px 12px rgba(0,0,0,.3)",
    };
    if(i===q.correct) return {
      bg:"linear-gradient(145deg,#061a0e,#041208)",
      bd:"#2d6a3c", co:"var(--green)", lc:"var(--green)",
      shadow:"0 4px 16px #4ade8020",
    };
    if(i===sel) return {
      bg:"linear-gradient(145deg,#1a0404,#110202)",
      bd:"#6a2d2d", co:"var(--red)", lc:"var(--red)",
      shadow:"0 4px 16px #ef444420",
    };
    return {bg:"var(--bg)",bd:"var(--border)",co:"var(--faint)",lc:"var(--faint)",shadow:"none"};
  };

  return (
    <div style={{paddingBottom:80,minHeight:"100vh"}}>
      {/* Header bar */}
      <div style={{
        background:"rgba(8,8,8,.95)",backdropFilter:"blur(12px)",
        borderBottom:"1px solid var(--border)",padding:"12px 18px",
        position:"sticky",top:0,zIndex:10,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <Logo compact/>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {/* Score */}
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:26,color:"var(--gold)",lineHeight:1,textShadow:"0 0 12px var(--gold)50"}}>{score}<span style={{fontSize:13,color:"var(--faint)"}}>/{qi}</span></div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:2}}>SCORE</div>
            </div>
            {/* Timer ring */}
            <div style={{position:"relative",width:44,height:44}}>
              <svg width="44" height="44" viewBox="0 0 44 44" style={{transform:"rotate(-90deg)"}}>
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--faint)" strokeWidth="2.5"/>
                <circle cx="22" cy="22" r="18" fill="none" stroke={tc} strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*18}`}
                  strokeDashoffset={`${2*Math.PI*18*(1-tp/100)}`}
                  style={{transition:"stroke-dashoffset 1s linear,stroke .3s",filter:`drop-shadow(0 0 4px ${tc}80)`}}
                />
              </svg>
              <span style={{
                position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"var(--font-display)",fontSize:16,color:tc,
                textShadow:`0 0 8px ${tc}60`,
              }}>{tl}</span>
            </div>
          </div>
        </div>
        <ProgressBar current={qi} total={TOTAL}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--faint)",letterSpacing:1}}>Q{qi+1}/{TOTAL}</span>
          <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:diff?.color||"var(--gold)",letterSpacing:1}}>{catLabel} · {diff?.label}</span>
        </div>
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"18px 18px"}}>
        {/* Question card */}
        <div style={{
          background:"linear-gradient(145deg,#131313,#0e0e0e)",
          border:"1px solid var(--border2)",
          borderLeft:"3px solid var(--gold)",
          borderRadius:16,padding:"20px",marginBottom:14,
          boxShadow:"0 4px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.03)",
          animation:"fadeUp .25s ease both",
        }} key={qi}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:5,marginBottom:10,
            fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:2,
          }}>
            <span>📊</span> PROCYCLINGSTATS.COM
          </div>
          <p style={{
            fontSize:"clamp(14px,3.8vw,19px)",
            fontWeight:600,lineHeight:1.6,
            color:"var(--text)",fontFamily:"var(--font-body)",
          }}>{q.q}</p>
        </div>

        {/* Options */}
        <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>
          {q.opts.map((opt,i)=>{
            const s=getOptStyle(i);
            return (
              <button key={`${qi}-${i}`} onClick={()=>pick(i)} style={{
                background:s.bg, border:`1.5px solid ${s.bd}`,
                borderRadius:13,padding:"14px 16px",
                cursor:rev?"default":"pointer",
                display:"flex",alignItems:"center",gap:12,
                textAlign:"left",
                boxShadow:s.shadow,
                transition:"all .2s ease",
                animation:`fadeUp .3s ${i*.06}s ease both`,
                transform: !rev&&sel===null?"":"none",
              }}>
                <span style={{
                  width:30,height:30,minWidth:30,borderRadius:"50%",
                  border:`1.5px solid ${s.lc}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontFamily:"var(--font-display)",fontSize:14,color:s.lc,
                  background:rev&&i===q.correct?"#4ade8015":rev&&i===sel&&i!==q.correct?"#ef444415":"transparent",
                  flexShrink:0,
                }}>{String.fromCharCode(65+i)}</span>
                <span style={{color:s.co,fontSize:13,lineHeight:1.45,flex:1}}>{opt}</span>
                {rev&&i===q.correct&&<span style={{fontSize:16,flexShrink:0}}>✓</span>}
                {rev&&i===sel&&i!==q.correct&&<span style={{fontSize:16,flexShrink:0}}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {rev&&(
          <div style={{
            background: sel===q.correct
              ? "linear-gradient(145deg,#061a0e,#041208)"
              : to.current ? "linear-gradient(145deg,#12100a,#0d0b07)"
              : "linear-gradient(145deg,#1a0404,#110202)",
            border:`1px solid ${sel===q.correct?"#2d6a3c":to.current?"#facc1530":"#6a2d2d"}`,
            borderRadius:14,padding:"16px",marginBottom:14,
            animation:"fadeUp .25s ease both",
          }}>
            <div style={{
              fontFamily:"var(--font-mono)",fontWeight:700,
              marginBottom:8,fontSize:11,letterSpacing:1,
              color:to.current?"var(--gold)":sel===q.correct?"var(--green)":"var(--red)",
            }}>
              {to.current?"⏱ TEMPS ÉCOULÉ":sel===q.correct?"✓ CORRECT":"✗ RATÉ"}
            </div>
            <p style={{color:"#888",fontSize:13,lineHeight:1.7,margin:0}}>{q.exp}</p>
          </div>
        )}

        {rev&&(
          <button onClick={next} style={{
            width:"100%",padding:"16px",
            background:"linear-gradient(135deg,var(--gold) 0%,var(--orange) 100%)",
            border:"none",borderRadius:14,cursor:"pointer",
            fontFamily:"var(--font-display)",fontSize:21,letterSpacing:4,
            color:"#080808",
            boxShadow:"0 6px 24px var(--orange)40,inset 0 1px 0 rgba(255,255,255,.2)",
            position:"relative",overflow:"hidden",
            animation:"fadeUp .2s ease both",
          }}>
            <div style={{
              position:"absolute",inset:0,
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)",
              backgroundSize:"200% 100%",animation:"shimmer 2s infinite",
            }}/>
            <span style={{position:"relative"}}>
              {qi+1>=questions.length?"VOIR MON SCORE →":"SUIVANTE →"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function QuizResults({score,total,onRestart}) {
  const pct=Math.round((score/total)*100);
  const g = pct>=90
    ? {e:"🏆",l:"Maillot Jaune",  c:"var(--gold)",  m:"Niveau Merckx. Tu es une encyclopédie vivante."}
    : pct>=70
    ? {e:"🚴",l:"Pro du Peloton", c:"var(--orange)", m:"Solide. Tu maîtrises les stats comme un directeur sportif."}
    : pct>=50
    ? {e:"💪",l:"Bonne Roue",     c:"var(--green)",  m:"Pas mal ! Continue à travailler tes classiques."}
    : {e:"📖",l:"Néophyte",       c:"var(--red)",    m:"ProCyclingStats t'attend. Il y a du boulot !"};

  return (
    <div style={{maxWidth:520,margin:"0 auto",padding:"48px 20px 100px",textAlign:"center",animation:"fadeUp .4s ease both"}}>
      <div style={{fontSize:60,marginBottom:24,filter:`drop-shadow(0 8px 24px ${g.c}50)`,animation:"countUp .5s ease both"}}>{g.e}</div>

      {/* Score ring */}
      <div style={{position:"relative",width:180,height:180,margin:"0 auto 28px"}}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{transform:"rotate(-90deg)"}}>
          <circle cx="90" cy="90" r="78" fill="none" stroke="var(--faint)" strokeWidth="6"/>
          <circle cx="90" cy="90" r="78" fill="none" stroke={g.c} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2*Math.PI*78}`}
            strokeDashoffset={`${2*Math.PI*78*(1-pct/100)}`}
            style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)",filter:`drop-shadow(0 0 8px ${g.c}60)`}}
          />
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"var(--font-display)",fontSize:60,color:"#fff",lineHeight:1,textShadow:`0 0 24px ${g.c}40`}}>{score}</span>
          <span style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted)",letterSpacing:2}}>/ {total}</span>
        </div>
      </div>

      <h2 style={{fontFamily:"var(--font-display)",fontSize:36,letterSpacing:4,color:g.c,margin:"0 0 10px",textShadow:`0 0 20px ${g.c}40`}}>{g.l}</h2>
      <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.7,maxWidth:320,margin:"0 auto 32px"}}>{g.m}</p>

      {/* Stats */}
      <div className="card" style={{padding:"20px",marginBottom:28,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        {[
          {v:`${pct}%`,c:"var(--gold)",  l:"réussite"},
          {v:score,    c:"var(--green)", l:"correctes"},
          {v:total-score,c:"var(--red)", l:"ratées"},
        ].map((s,i)=>(
          <div key={i} style={{animation:`countUp .5s ${.1+i*.1}s ease both`}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:38,color:s.c,lineHeight:1,textShadow:`0 0 12px ${s.c}40`}}>{s.v}</div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1.5,marginTop:4}}>{s.l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <button onClick={onRestart} style={{
        width:"100%",padding:"18px",
        background:"linear-gradient(135deg,var(--gold),var(--orange))",
        border:"none",borderRadius:14,cursor:"pointer",
        fontFamily:"var(--font-display)",fontSize:22,letterSpacing:5,
        color:"#080808",
        boxShadow:"0 8px 28px var(--orange)40,inset 0 1px 0 rgba(255,255,255,.2)",
        position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)",backgroundSize:"200%",animation:"shimmer 2s infinite"}}/>
        <span style={{position:"relative"}}>NOUVEAU QUIZ →</span>
      </button>
    </div>
  );
}

function QuizTab({bestScore,setBestScore,totalPlayed,setTotalPlayed}) {
  const [state,setState]=useState("home");
  const [cfg,setCfg]=useState({});
  const [fs,setFs]=useState(0);
  if(state==="home") return <QuizHome onStart={(c,d)=>{setCfg({c,d});setState("game");}} bestScore={bestScore} totalPlayed={totalPlayed}/>;
  if(state==="game") return <QuizGame category={cfg.c} difficulty={cfg.d} onFinish={s=>{setFs(s);setBestScore(b=>Math.max(b,s));setTotalPlayed(n=>n+1);setState("results");}}/>;
  return <QuizResults score={fs} total={10} onRestart={()=>setState("home")}/>;
}

// ─────────────────────────────────────────────
// RECENT RESULTS TAB (AI-powered)
// ─────────────────────────────────────────────
function ResultatsTab() {
  const [gender,setGender]=useState("M"); // "M" | "F"
  const [resultsM,setResultsM]=useState(null);
  const [resultsF,setResultsF]=useState(null);
  const [loadingM,setLoadingM]=useState(false);
  const [loadingF,setLoadingF]=useState(false);
  const [loadedM,setLoadedM]=useState(false);
  const [loadedF,setLoadedF]=useState(false);
  const [catFilter,setCatFilter]=useState("Tout");

  const results  = gender==="M" ? resultsM : resultsF;
  const loading  = gender==="M" ? loadingM : loadingF;
  const loaded   = gender==="M" ? loadedM  : loadedF;

  const CAT_FILTERS=[
    {id:"Tout",  label:"Tout",      color:"var(--gold)"},
    {id:"WT",    label:"WWT",       color:"var(--orange)"},
    {id:"2.Pro", label:"2.Pro",     color:"var(--purple)"},
    {id:"1.1",   label:"1.1",       color:"var(--green)"},
    {id:"1.Pro", label:"1.Pro",     color:"var(--cyan)"},
  ];

  const fetchResults = async () => {
    if(gender==="M"){ setLoadingM(true); } else { setLoadingF(true); }
    const isFemme = gender==="F";
    try {
      const systemPrompt = isFemme
        ? `Tu es un journaliste cyclisme expert spécialisé dans le cyclisme féminin. Donne les résultats récents du cyclisme féminin professionnel des dernières semaines (WWT = Women's WorldTour, 2.Pro femmes, 1.1 femmes).
Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks :
{"updated":"MOIS ANNÉE","races":[{"name":"Nom course","date":"JJ mois","winner":"Prénom Nom","country":"🏳️","team":"Équipe","type":"Monument|Grand Tour|WWT|Classique|1.1","cat":"WT|2.Pro|1.1"},...],"note":"courte info chaude sur le peloton féminin"}
- Inclus des courses WWT majeures : Giro Donne, Tour de France Femmes, Flèche Wallonne Femmes, LBL Femmes, Strade Bianche W, Paris-Roubaix Femmes, Flandres W, Gand-Wevelgem W, etc.
- cat : "WT" pour WWT, "2.Pro" pour ProSeries femmes, "1.1" pour épreuves 1.1
- Donne 12 à 18 courses réelles récentes
- Ne fabrique aucun résultat, uniquement des faits vérifiés`
        : `Tu es un journaliste cyclisme expert. Donne les résultats récents du cyclisme masculin professionnel des dernières semaines, toutes catégories UCI confondues : WorldTour (WT), ProSeries 2.Pro, et courses d'un jour 1.1 et 1.Pro.
Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks :
{"updated":"MOIS ANNÉE","races":[{"name":"Nom course","date":"JJ mois","winner":"Prénom Nom","country":"🏳️","team":"Équipe","type":"Monument|Grand Tour|WorldTour|Classique|1.1|1.Pro","cat":"WT|2.Pro|1.1|1.Pro"},...],"note":"courte info chaude du peloton"}
- Donne 15 à 20 courses réelles récentes, mélange les catégories
- Ne fabrique aucun résultat, uniquement des faits vérifiés`;

      const userMsg = isFemme
        ? "Cherche les résultats récents du cyclisme féminin professionnel (WWT, 2.Pro femmes, 1.1 femmes). Saison 2026, dernières semaines (avril 2026)."
        : "Cherche et donne-moi les résultats des courses cyclistes professionnelles masculines les plus récentes (WorldTour, 2.Pro, 1.1, 1.Pro). Saison 2026, dernières semaines (avril 2026).";

      const resp = await fetch("/api/results",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ systemPrompt, userMsg })
      });
      const data=await resp.json();
      const txt=[...(data.content||[])].reverse().find(b=>b.type==="text")?.text||"";
      const m=txt.match(/\{[\s\S]*\}/);
      if(m){
        const parsed=JSON.parse(m[0]);
        if(gender==="M") setResultsM(parsed); else setResultsF(parsed);
      }
    } catch(e) { console.error(e); }
    if(gender==="M"){ setLoadingM(false); setLoadedM(true); }
    else            { setLoadingF(false); setLoadedF(true); }
  };

  const CAT_COLORS={WT:"var(--orange)","2.Pro":"var(--purple)","1.1":"var(--green)","1.Pro":"var(--cyan)"};

  const filtered = results?(results.races||[]).filter(r=>catFilter==="Tout"||(r.cat||"WT")===catFilter):[];

  return (
    <div style={{paddingBottom:80,minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(180deg,#111,var(--bg))",borderBottom:"1px solid var(--border)",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Logo/>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {/* Gender switcher */}
          <div style={{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden"}}>
            {[{id:"M",label:"♂ Hommes",c:"var(--cyan)"},{id:"F",label:"♀ Femmes",c:"#f472b6"}].map(g=>(
              <button key={g.id} onClick={()=>{setGender(g.id);setCatFilter("Tout");}} style={{
                padding:"7px 12px",border:"none",cursor:"pointer",
                background:gender===g.id?`${g.c}20`:"transparent",
                borderRight:g.id==="M"?"1px solid var(--border)":"none",
                fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:1,
                color:gender===g.id?g.c:"var(--muted)",
                transition:"all .15s",
              }}>{g.label}</button>
            ))}
          </div>
          <button onClick={fetchResults} disabled={loading} style={{
            background:loading?"var(--surface)":gender==="F"?"linear-gradient(135deg,#f472b6,#ec4899)":"linear-gradient(135deg,var(--gold),var(--orange))",
            border:loading?"1px solid var(--border)":"none",
            borderRadius:10,padding:"9px 14px",
            cursor:loading?"not-allowed":"pointer",
            fontFamily:"var(--font-display)",fontSize:13,letterSpacing:2,
            color:loading?"var(--faint)":"#080808",
            display:"flex",alignItems:"center",gap:6,
            boxShadow:loading?"none":`0 4px 16px ${gender==="F"?"#f472b640":"var(--orange)40"}`,
            transition:"all .2s",
          }}>
            {loading
              ? <><span style={{width:11,height:11,border:"2px solid var(--border2)",borderTopColor:gender==="F"?"#f472b6":"var(--gold)",borderRadius:"50%",animation:"spin .8s linear infinite",display:"inline-block"}}/>EN COURS</>
              : <>🔍 CHARGER</>}
          </button>
        </div>
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"20px 18px 0"}}>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:32,letterSpacing:3,color:"#fff",lineHeight:1}}>
              {gender==="F"?"CYCLISME FÉMININ":"RÉSULTATS RÉCENTS"}
            </div>
            <span style={{
              fontFamily:"var(--font-mono)",fontSize:9,
              color:gender==="F"?"#f472b6":"var(--cyan)",
              background:gender==="F"?"#f472b615":"var(--cyan)15",
              border:`1px solid ${gender==="F"?"#f472b630":"var(--cyan)30"}`,
              borderRadius:6,padding:"2px 7px",letterSpacing:1,
            }}>{gender==="F"?"♀ WWT":"♂ WT"}</span>
          </div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:2}}>
            {gender==="F"?"WWT · 2.PRO · 1.1 · COURSES FÉMININES · IA EN DIRECT":"WORLDTOUR · 2.PRO · 1.1 · 1.PRO · IA EN DIRECT"}
          </div>
        </div>

        {loaded&&results&&(
          <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
            {CAT_FILTERS.map(f=>{
              const count=f.id==="Tout"?(results.races||[]).length:(results.races||[]).filter(r=>(r.cat||"WT")===f.id).length;
              if(count===0&&f.id!=="Tout") return null;
              const isOn=catFilter===f.id;
              return (
                <button key={f.id} onClick={()=>setCatFilter(f.id)} style={{
                  background:isOn?f.color+"18":"var(--surface)",
                  border:isOn?`1px solid ${f.color.replace("var(","").replace(")","")}`:`1px solid var(--border)`,
                  borderColor:isOn?f.color:"var(--border)",
                  borderRadius:100,padding:"5px 12px",cursor:"pointer",
                  whiteSpace:"nowrap",
                  fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,letterSpacing:1,
                  color:isOn?f.color:"var(--muted)",
                  transition:"all .15s",flexShrink:0,
                }}>
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
        )}

        {!loaded&&!loading&&(
          <div className="card" style={{padding:"48px 24px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:16,filter:`drop-shadow(0 4px 16px ${gender==="F"?"#f472b640":"#facc1540"})`}}>{gender==="F"?"🚴‍♀️":"📡"}</div>
            <div style={{fontFamily:"var(--font-display)",fontSize:24,letterSpacing:3,color:"#fff",marginBottom:8}}>
              {gender==="F"?"CYCLISME FÉMININ":"RÉSULTATS EN DIRECT"}
            </div>
            <p style={{color:"var(--muted)",fontSize:12,lineHeight:1.7,marginBottom:8,fontFamily:"var(--font-body)"}}>
              {gender==="F"?"WWT, Giro Donne, Tour de France Femmes, Classiques féminines…":"WorldTour, ProSeries 2.Pro et courses 1.1/1.Pro récentes."}
            </p>
            <p style={{color:"var(--faint)",fontSize:10,fontFamily:"var(--font-mono)",marginBottom:24,letterSpacing:1}}>L'IA consulte les sources cyclisme en temps réel.</p>
            <button onClick={fetchResults} style={{
              background:gender==="F"?"linear-gradient(135deg,#f472b6,#ec4899)":"linear-gradient(135deg,var(--gold),var(--orange))",
              border:"none",borderRadius:12,padding:"14px 28px",cursor:"pointer",
              fontFamily:"var(--font-display)",fontSize:18,letterSpacing:4,color:"#080808",
              boxShadow:`0 6px 24px ${gender==="F"?"#f472b640":"var(--orange)40"}`,
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)",backgroundSize:"200%",animation:"shimmer 2s infinite"}}/>
              <span style={{position:"relative"}}>CHARGER →</span>
            </button>
          </div>
        )}

        {loading&&(
          <div style={{textAlign:"center",padding:"56px 0"}}>
            <div style={{position:"relative",width:60,height:60,margin:"0 auto 20px"}}>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid var(--faint)",borderTopColor:gender==="F"?"#f472b6":"var(--gold)",animation:"spin .9s linear infinite"}}/>
              <div style={{position:"absolute",inset:9,borderRadius:"50%",border:"2px solid transparent",borderTopColor:gender==="F"?"#ec4899":"var(--orange)",animation:"spin 1.3s linear infinite reverse"}}/>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{gender==="F"?"🚴‍♀️":"🚴"}</div>
            </div>
            <p style={{color:gender==="F"?"#f472b6":"var(--gold)",fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:2,marginBottom:6}}>RECHERCHE EN COURS</p>
            <p style={{color:"var(--faint)",fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:1}}>{gender==="F"?"WWT · GIRO DONNE · CLASSIQUES FÉMININES":"WORLDTOUR · 2.PRO · 1.1 · TOUTES CATÉGORIES"}</p>
          </div>
        )}

        {results&&!loading&&(
          <div>
            {results.note&&(
              <div style={{
                background:"linear-gradient(145deg,#1a1400,#110e00)",
                border:"1px solid var(--gold)25",
                borderLeft:"3px solid var(--gold)",
                borderRadius:12,padding:"13px 16px",marginBottom:14,
                display:"flex",gap:10,alignItems:"flex-start",
                animation:"fadeUp .3s ease both",
              }}>
                <span style={{fontSize:16,flexShrink:0}}>⚡</span>
                <p style={{margin:0,fontSize:12,color:"var(--gold)",lineHeight:1.6,fontFamily:"var(--font-body)"}}>{results.note}</p>
              </div>
            )}
            {filtered.length===0&&<div style={{textAlign:"center",padding:"32px 0",color:"var(--faint)",fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:1}}>AUCUN RÉSULTAT DANS CETTE CATÉGORIE</div>}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {filtered.map((r,i)=>{
                const cc=CAT_COLORS[r.cat||"WT"]||"var(--orange)";
                return (
                  <div key={i} className="card" style={{
                    padding:"13px 15px",display:"flex",alignItems:"center",gap:12,
                    borderLeft:`3px solid ${cc}`,
                    animation:`fadeUp .3s ${i*.04}s ease both`,
                  }}>
                    <div style={{
                      width:32,height:32,minWidth:32,borderRadius:8,
                      background:`${cc}15`,border:`1px solid ${cc}30`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"var(--font-display)",fontSize:13,color:cc,
                    }}>{i+1}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                        <span style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{r.name}</span>
                        <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:cc,background:`${cc}15`,border:`1px solid ${cc}30`,borderRadius:4,padding:"1px 5px",letterSpacing:.5}}>{r.type}</span>
                        {r.cat&&r.cat!=="WT"&&<span style={{fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,color:cc,background:`${cc}20`,borderRadius:4,padding:"1px 5px",letterSpacing:.5}}>{r.cat}</span>}
                      </div>
                      <div style={{fontSize:13,color:"#aaa"}}>{r.country} <strong style={{color:"#fff"}}>{r.winner}</strong></div>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",marginTop:3,letterSpacing:.5}}>{r.team} · {r.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:16,textAlign:"center",fontFamily:"var(--font-mono)",fontSize:9,color:"var(--faint)",letterSpacing:1,paddingBottom:4}}>
              MAJ : {results.updated} · {(results.races||[]).length} COURSES · SOURCE : IA + WEB SEARCH
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RIDER PROFILE MODAL
// ─────────────────────────────────────────────
function RiderModal({rider, onClose, onCompare}) {
  if (!rider) return null;
  const victories = getRiderVictories(rider.name);
  const grandTours = victories.filter(v=>v.group==="Grands Tours"||v.group==="Grands Tours W");
  const monuments = victories.filter(v=>v.group==="Monuments"||v.group==="Monuments W");
  const classics = victories.filter(v=>v.group==="Classiques"||v.group==="Classiques W");
  const weekly = victories.filter(v=>v.group==="Courses hebdo"||v.group==="Courses hebdo W");
  const semi = victories.filter(v=>v.group==="1.Pro / 2.Pro");

  const formColor = rider.frm>=95?"var(--gold)":rider.frm>=88?"var(--orange)":rider.frm>=80?"var(--green)":"var(--purple)";

  // Identify rider type by dominant attribute
  const attrs = [
    {k:"spr",label:"Sprint",   c:"#22d3ee"},
    {k:"clm",label:"Montée",   c:"#ef4444"},
    {k:"tt", label:"CLM",      c:"#facc15"},
    {k:"pnc",label:"Punch",    c:"#a78bfa"},
    {k:"cbl",label:"Pavés",    c:"#94a3b8"},
    {k:"end",label:"Endurance",c:"#34d399"},
  ];
  const top3Attrs = [...attrs].sort((a,b)=>rider[b.k]-rider[a.k]).slice(0,3);
  const riderType = top3Attrs.map(a=>a.label).join(" · ");

  // Lock body scroll while modal open
  useEffect(()=>{
    document.body.style.overflow="hidden";
    return ()=>{document.body.style.overflow="";};
  },[]);

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:1000,
      background:"rgba(0,0,0,.85)",
      backdropFilter:"blur(8px)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:"40px 12px",overflowY:"auto",
      animation:"fadeUp .25s ease both",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        maxWidth:560,width:"100%",
        background:"linear-gradient(180deg,#161616 0%,#0a0a0a 100%)",
        border:"1px solid var(--border2)",
        borderRadius:18,
        boxShadow:"0 24px 80px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.04)",
        overflow:"hidden",
        animation:"fadeUp .3s ease both",
      }}>
        {/* Header */}
        <div style={{
          padding:"22px 22px 18px",
          background:"linear-gradient(135deg,#1a1400 0%,#0d0d0d 100%)",
          borderBottom:"1px solid var(--border)",
          position:"relative",overflow:"hidden",
        }}>
          {/* Diagonal accent */}
          <div style={{position:"absolute",top:0,right:-30,width:120,height:"100%",background:"linear-gradient(135deg,transparent 0%,#facc1510 50%,transparent 100%)",transform:"skewX(-15deg)",pointerEvents:"none"}}/>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{fontSize:28}}>{rider.country}</span>
                <span style={{
                  fontFamily:"var(--font-mono)",fontSize:8,color:formColor,letterSpacing:1.5,
                  background:`${formColor.replace("var(","").replace(")","")}15`,
                  border:`1px solid ${formColor}30`,
                  borderRadius:6,padding:"2px 7px",
                }}>FORME {rider.frm}</span>
              </div>
              <h2 style={{
                fontFamily:"var(--font-display)",
                fontSize:"clamp(28px,7vw,38px)",
                letterSpacing:2,lineHeight:1,marginBottom:8,
                color:"#fff",
              }}>{rider.name.toUpperCase()}</h2>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--gold)",letterSpacing:1.5,marginBottom:4}}>{rider.team}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1}}>{riderType}</div>
            </div>
            <button onClick={onClose} style={{
              background:"var(--surface)",border:"1px solid var(--border)",
              borderRadius:"50%",width:32,height:32,minWidth:32,
              cursor:"pointer",
              color:"var(--muted)",fontSize:16,
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all .15s",
            }}>✕</button>
          </div>
        </div>

        {/* Stats radar/bars */}
        <div style={{padding:"18px 22px",borderBottom:"1px solid var(--border)"}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1.5,marginBottom:12}}>ATTRIBUTS</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {attrs.map(a=>{
              const v = rider[a.k];
              return (
                <div key={a.k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:75,fontFamily:"var(--font-mono)",fontSize:10,color:"#aaa",letterSpacing:.3}}>{a.label}</div>
                  <div style={{flex:1,height:7,background:"var(--surface2)",borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{
                      position:"absolute",inset:0,width:`${v}%`,
                      background:`linear-gradient(90deg,${a.c}80,${a.c})`,
                      borderRadius:4,
                      boxShadow:`0 0 8px ${a.c}60`,
                      transition:"width .8s cubic-bezier(.4,0,.2,1)",
                    }}/>
                  </div>
                  <div style={{width:30,textAlign:"right",fontFamily:"var(--font-display)",fontSize:14,color:a.c,letterSpacing:.5}}>{v}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Victory stats banner */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",
          borderBottom:"1px solid var(--border)",
        }}>
          {[
            {v:victories.length,        label:"VICTOIRES",c:"var(--gold)"},
            {v:grandTours.length,       label:"GD TOURS",c:"var(--orange)"},
            {v:monuments.length,        label:"MONUMENTS",c:"#facc15"},
            {v:classics.length+weekly.length+semi.length, label:"AUTRES",c:"var(--purple)"},
          ].map((s,i)=>(
            <div key={i} style={{
              padding:"14px 8px",textAlign:"center",
              background:i%2===0?"var(--surface2)":"var(--surface)",
              borderRight:i<3?"1px solid var(--border)":"none",
            }}>
              <div style={{fontFamily:"var(--font-display)",fontSize:24,color:s.c,lineHeight:1,marginBottom:4,textShadow:`0 0 8px ${s.c}40`}}>{s.v}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:7,color:"var(--muted)",letterSpacing:1}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Palmarès lists */}
        <div style={{padding:"18px 22px",maxHeight:400,overflowY:"auto"}}>
          {victories.length===0 ? (
            <div style={{textAlign:"center",padding:"32px 0",color:"var(--faint)",fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:1}}>
              AUCUNE VICTOIRE RÉPERTORIÉE DANS LA BASE
            </div>
          ) : (
            <>
              {grandTours.length>0 && <PalmaresGroup title="GRANDS TOURS" color="var(--orange)" wins={grandTours}/>}
              {monuments.length>0  && <PalmaresGroup title="MONUMENTS"   color="var(--gold)"   wins={monuments}/>}
              {classics.length>0   && <PalmaresGroup title="CLASSIQUES"  color="#a78bfa"       wins={classics}/>}
              {weekly.length>0     && <PalmaresGroup title="COURSES HEBDO" color="var(--green)" wins={weekly}/>}
              {semi.length>0       && <PalmaresGroup title="1.PRO / 2.PRO" color="#fb923c"     wins={semi}/>}
            </>
          )}
        </div>

        {/* Footer / actions */}
        {onCompare && (
          <div style={{padding:"14px 22px",borderTop:"1px solid var(--border)",background:"var(--surface)"}}>
            <button onClick={()=>onCompare(rider)} style={{
              width:"100%",padding:"10px",
              background:"var(--surface2)",border:"1px solid var(--border2)",
              borderRadius:10,cursor:"pointer",
              fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:1.5,color:"var(--muted)",
              transition:"all .15s",
            }}>⇄ COMPARER À UN AUTRE COUREUR</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PalmaresGroup({title, color, wins}) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{
        display:"flex",alignItems:"center",gap:8,marginBottom:8,
      }}>
        <div style={{width:3,height:14,background:color,borderRadius:2,boxShadow:`0 0 6px ${color}60`}}/>
        <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:color,letterSpacing:1.5,fontWeight:700}}>{title}</span>
        <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--faint)"}}>{wins.length}</span>
        <div style={{flex:1,height:1,background:"var(--border)"}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {wins.map((w,i)=>(
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:10,
            padding:"7px 10px",
            background:"var(--surface)",
            border:"1px solid var(--border)",
            borderLeft:`2px solid ${color}40`,
            borderRadius:8,
          }}>
            <span style={{fontFamily:"var(--font-display)",fontSize:14,color:color,minWidth:38,letterSpacing:.5}}>{w.year}</span>
            <span style={{fontSize:14}}>{w.icon}</span>
            <span style={{flex:1,fontSize:12,color:"#ccc",fontWeight:600}}>{w.race}</span>
            {w.note && <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--gold)",background:"#facc1515",border:"1px solid #facc1530",borderRadius:4,padding:"1px 5px",letterSpacing:.5}}>{w.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPARE MODAL — side-by-side
// ─────────────────────────────────────────────
function CompareModal({left, right, onClose, onPickRight}) {
  if (!left) return null;
  const allRiders = [...RIDERS_M, ...RIDERS_W];
  const leftIsM = RIDERS_M.includes(left);
  const candidates = allRiders.filter(r=>r.name!==left.name);

  useEffect(()=>{
    document.body.style.overflow="hidden";
    return ()=>{document.body.style.overflow="";};
  },[]);

  const attrs = [
    {k:"spr",label:"Sprint",   c:"#22d3ee"},
    {k:"clm",label:"Montée",   c:"#ef4444"},
    {k:"tt", label:"CLM",      c:"#facc15"},
    {k:"pnc",label:"Punch",    c:"#a78bfa"},
    {k:"cbl",label:"Pavés",    c:"#94a3b8"},
    {k:"end",label:"Endurance",c:"#34d399"},
    {k:"frm",label:"Forme",    c:"var(--gold)"},
  ];

  const leftWins = getRiderVictories(left.name).length;
  const rightWins = right ? getRiderVictories(right.name).length : 0;

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:1000,
      background:"rgba(0,0,0,.85)",backdropFilter:"blur(8px)",
      display:"flex",alignItems:"flex-start",justifyContent:"center",
      padding:"40px 12px",overflowY:"auto",
      animation:"fadeUp .25s ease both",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        maxWidth:680,width:"100%",
        background:"linear-gradient(180deg,#161616 0%,#0a0a0a 100%)",
        border:"1px solid var(--border2)",
        borderRadius:18,
        boxShadow:"0 24px 80px rgba(0,0,0,.8)",
        overflow:"hidden",
      }}>
        {/* Header */}
        <div style={{padding:"18px 22px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"var(--font-display)",fontSize:22,letterSpacing:3,color:"#fff"}}>⇄ COMPARATEUR</div>
          <button onClick={onClose} style={{
            background:"var(--surface)",border:"1px solid var(--border)",
            borderRadius:"50%",width:32,height:32,cursor:"pointer",
            color:"var(--muted)",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",
          }}>✕</button>
        </div>

        {!right ? (
          /* RIDER PICKER */
          <div style={{padding:"18px 22px"}}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:28,marginBottom:4}}>{left.country}</div>
              <div style={{fontFamily:"var(--font-display)",fontSize:22,letterSpacing:1.5,color:"var(--gold)",marginBottom:2}}>{left.name.toUpperCase()}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1}}>VS&nbsp; ?</div>
            </div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:2,marginBottom:10}}>CHOISIS UN SECOND COUREUR</div>
            <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:380,overflowY:"auto"}}>
              {candidates.map(r=>(
                <button key={r.name} onClick={()=>onPickRight(r)} style={{
                  display:"flex",alignItems:"center",gap:10,
                  padding:"8px 12px",
                  background:"var(--surface)",border:"1px solid var(--border)",
                  borderRadius:8,cursor:"pointer",textAlign:"left",
                  transition:"all .15s",
                }}>
                  <span style={{fontSize:18}}>{r.country}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,color:"#fff",fontWeight:700}}>{r.name}</div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:.5}}>{r.team}</div>
                  </div>
                  <span style={{fontFamily:"var(--font-display)",fontSize:14,color:"var(--gold)"}}>{r.frm}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* COMPARISON */
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:"1px solid var(--border)"}}>
              <div style={{padding:"16px 14px",textAlign:"center",borderRight:"1px solid var(--border)",background:"linear-gradient(180deg,#1a1400,#0a0a0a)"}}>
                <div style={{fontSize:24,marginBottom:4}}>{left.country}</div>
                <div style={{fontFamily:"var(--font-display)",fontSize:18,color:"var(--gold)",letterSpacing:1.2,lineHeight:1.1,marginBottom:3}}>{left.name.toUpperCase()}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:.5}}>{left.team}</div>
                <div style={{fontFamily:"var(--font-display)",fontSize:22,color:"var(--gold)",marginTop:6}}>{leftWins}<span style={{fontSize:9,color:"var(--muted)",marginLeft:3}}>VICT.</span></div>
              </div>
              <div style={{padding:"16px 14px",textAlign:"center",background:"linear-gradient(180deg,#0a1a14,#0a0a0a)"}}>
                <div style={{fontSize:24,marginBottom:4}}>{right.country}</div>
                <div style={{fontFamily:"var(--font-display)",fontSize:18,color:"var(--cyan)",letterSpacing:1.2,lineHeight:1.1,marginBottom:3}}>{right.name.toUpperCase()}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:.5}}>{right.team}</div>
                <div style={{fontFamily:"var(--font-display)",fontSize:22,color:"var(--cyan)",marginTop:6}}>{rightWins}<span style={{fontSize:9,color:"var(--muted)",marginLeft:3}}>VICT.</span></div>
              </div>
            </div>

            <div style={{padding:"18px 22px"}}>
              {attrs.map(a=>{
                const lv = left[a.k], rv = right[a.k];
                const max = Math.max(lv,rv);
                const lpct = (lv/100)*100;
                const rpct = (rv/100)*100;
                const lw = lv>rv;
                const rw = rv>lv;
                return (
                  <div key={a.k} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                    <div style={{flex:1,height:7,background:"var(--surface2)",borderRadius:4,overflow:"hidden",position:"relative",direction:"rtl"}}>
                      <div style={{
                        position:"absolute",right:0,top:0,bottom:0,
                        width:`${lpct}%`,
                        background:`linear-gradient(270deg,var(--gold)80,var(--gold))`,
                        borderRadius:4,
                        boxShadow:lw?"0 0 8px var(--gold)80":"none",
                      }}/>
                    </div>
                    <div style={{minWidth:30,textAlign:"right",fontFamily:"var(--font-display)",fontSize:14,color:lw?"var(--gold)":"var(--muted)"}}>{lv}</div>
                    <div style={{minWidth:80,textAlign:"center",fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1}}>{a.label.toUpperCase()}</div>
                    <div style={{minWidth:30,textAlign:"left",fontFamily:"var(--font-display)",fontSize:14,color:rw?"var(--cyan)":"var(--muted)"}}>{rv}</div>
                    <div style={{flex:1,height:7,background:"var(--surface2)",borderRadius:4,overflow:"hidden",position:"relative"}}>
                      <div style={{
                        position:"absolute",left:0,top:0,bottom:0,
                        width:`${rpct}%`,
                        background:`linear-gradient(90deg,var(--cyan)80,var(--cyan))`,
                        borderRadius:4,
                        boxShadow:rw?"0 0 8px var(--cyan)80":"none",
                      }}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{padding:"14px 22px",borderTop:"1px solid var(--border)",background:"var(--surface)",textAlign:"center"}}>
              <button onClick={()=>onPickRight(null)} style={{
                background:"var(--surface2)",border:"1px solid var(--border2)",
                borderRadius:10,padding:"8px 16px",cursor:"pointer",
                fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:1.5,color:"var(--muted)",
              }}>← CHOISIR UN AUTRE</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROGNOSTIC TAB — Predictive engine
// ─────────────────────────────────────────────
function PronosticTab() {
  const { openRider } = useContext(RiderContext);
  const [gender,setGender]=useState("M");
  const [mode,setMode]=useState("stage"); // "stage" | "race"
  const [stageId,setStageId]=useState("highmtn");
  const [raceId,setRaceId]=useState("tdf");

  const riders = gender==="M" ? RIDERS_M : RIDERS_W;
  const stage  = STAGE_PROFILES.find(p=>p.id===stageId);
  const race   = STAGE_RACES.find(r=>r.id===raceId);
  const weights = mode==="stage" ? stage.weights : race.weights;
  const accent  = mode==="stage" ? stage.color : "var(--gold)";
  const top = predictWinners(weights, riders, 10);

  // Reset stage selection when gender changes (to allow same UI state)
  useEffect(()=>{ /* no-op, kept for symmetry */ },[gender]);

  return (
    <div style={{paddingBottom:80,minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(180deg,#111,var(--bg))",borderBottom:"1px solid var(--border)",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Logo/>
        <div style={{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden"}}>
          {[{id:"M",label:"♂ H",c:"var(--cyan)"},{id:"F",label:"♀ F",c:"#f472b6"}].map(g=>(
            <button key={g.id} onClick={()=>setGender(g.id)} style={{
              padding:"7px 12px",border:"none",cursor:"pointer",
              background:gender===g.id?`${g.c}20`:"transparent",
              borderRight:g.id==="M"?"1px solid var(--border)":"none",
              fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:1,
              color:gender===g.id?g.c:"var(--muted)",
              transition:"all .15s",
            }}>{g.label}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"20px 18px 0"}}>
        {/* Title */}
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:30,letterSpacing:3,color:"#fff",lineHeight:1}}>PRONOSTICS</div>
            <span style={{
              fontFamily:"var(--font-mono)",fontSize:9,
              color:accent,
              background:`${accent}15`,border:`1px solid ${accent}30`,
              borderRadius:6,padding:"2px 7px",letterSpacing:1,
            }}>ALGO v1.0</span>
          </div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:2,marginTop:4}}>
            CHANCES DE VICTOIRE · BASÉ SUR PROFIL & FORME
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14,padding:3,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12}}>
          {[
            {id:"stage", label:"ÉTAPE",  icon:"🏁", desc:"1 étape isolée"},
            {id:"race",  label:"COURSE", icon:"🏆", desc:"Classement général"},
          ].map(m=>{
            const isOn = mode===m.id;
            return (
              <button key={m.id} onClick={()=>setMode(m.id)} style={{
                padding:"10px 12px",
                background:isOn?"linear-gradient(145deg,#1a1400,#120e00)":"transparent",
                border:isOn?"1px solid #facc1540":"1px solid transparent",
                borderRadius:9,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                transition:"all .2s",
              }}>
                <span style={{fontSize:16}}>{m.icon}</span>
                <div style={{textAlign:"left"}}>
                  <div style={{fontFamily:"var(--font-display)",fontSize:14,letterSpacing:2,color:isOn?"var(--gold)":"var(--muted)",lineHeight:1}}>{m.label}</div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:isOn?"#facc1580":"var(--faint)",letterSpacing:.5,marginTop:2}}>{m.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Profile selector */}
        {mode==="stage" ? (
          <div style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:3}}>PROFIL D'ÉTAPE</span>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
              {STAGE_PROFILES.map((p,i)=>{
                const isOn = stageId===p.id;
                return (
                  <button key={p.id} onClick={()=>setStageId(p.id)} className="card-hover" style={{
                    padding:"11px 12px",
                    background:isOn?`linear-gradient(145deg,${p.color}18,${p.color}08)`:"linear-gradient(145deg,var(--surface2),var(--surface))",
                    border:isOn?`1px solid ${p.color}60`:"1px solid var(--border)",
                    borderLeft:isOn?`3px solid ${p.color}`:"3px solid var(--border)",
                    borderRadius:10,cursor:"pointer",textAlign:"left",
                    boxShadow:isOn?`0 4px 16px ${p.color}20`:"none",
                    transition:"all .2s",
                    animation:`fadeUp .25s ${i*.03}s ease both`,
                  }}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:16}}>{p.icon}</span>
                      <span style={{fontFamily:"var(--font-body)",fontWeight:700,fontSize:11,color:isOn?p.color:"#bbb",letterSpacing:.3}}>{p.label}</span>
                    </div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:isOn?`${p.color}aa`:"var(--faint)",letterSpacing:.5}}>{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:3}}>COURSE PAR ÉTAPES</span>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
              {STAGE_RACES.map((r,i)=>{
                const isOn = raceId===r.id;
                return (
                  <button key={r.id} onClick={()=>setRaceId(r.id)} className="card-hover" style={{
                    padding:"11px 12px",
                    background:isOn?"linear-gradient(145deg,#1a1400,#120e00)":"linear-gradient(145deg,var(--surface2),var(--surface))",
                    border:isOn?"1px solid var(--gold)50":"1px solid var(--border)",
                    borderLeft:isOn?"3px solid var(--gold)":"3px solid var(--border)",
                    borderRadius:10,cursor:"pointer",textAlign:"left",
                    boxShadow:isOn?"0 4px 16px #facc1520":"none",
                    transition:"all .2s",
                    animation:`fadeUp .25s ${i*.03}s ease both`,
                  }}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:16}}>{r.icon}</span>
                      <span style={{fontFamily:"var(--font-body)",fontWeight:700,fontSize:11,color:isOn?"var(--gold)":"#bbb",letterSpacing:.3}}>{r.label}</span>
                    </div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:isOn?"#facc15aa":"var(--faint)",letterSpacing:.5}}>{r.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Weights breakdown — bar chart */}
        <div className="card" style={{padding:"14px 16px",marginBottom:14}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1.5,marginBottom:10}}>PONDÉRATION DU PROFIL</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[
              {k:"spr",label:"Sprint",   c:"#22d3ee"},
              {k:"clm",label:"Montée",   c:"#ef4444"},
              {k:"tt", label:"CLM",      c:"#facc15"},
              {k:"pnc",label:"Punch",    c:"#a78bfa"},
              {k:"cbl",label:"Pavés",    c:"#94a3b8"},
              {k:"end",label:"Endurance",c:"#34d399"},
            ].map(a=>{
              const w = (weights[a.k]||0)*100;
              return (
                <div key={a.k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:60,fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:.5}}>{a.label}</div>
                  <div style={{flex:1,height:6,background:"var(--surface2)",borderRadius:3,overflow:"hidden",position:"relative"}}>
                    <div style={{
                      position:"absolute",inset:0,width:`${w}%`,
                      background:`linear-gradient(90deg,${a.c}80,${a.c})`,
                      borderRadius:3,
                      transition:"width .5s cubic-bezier(.4,0,.2,1)",
                      boxShadow:w>0?`0 0 6px ${a.c}80`:"none",
                    }}/>
                  </div>
                  <div style={{width:36,textAlign:"right",fontFamily:"var(--font-mono)",fontSize:9,color:w>0?a.c:"var(--faint)",letterSpacing:.3}}>{w.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP 10 results */}
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:3}}>TOP 10 PRÉDIT</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--faint)",letterSpacing:1}}>{riders.length} COUREURS ANALYSÉS</span>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {top.map((r,i)=>{
              const isFav = i===0;
              const isPodium = i<3;
              const podColor = i===0?"var(--gold)":i===1?"#cbd5e1":i===2?"#fb923c":"var(--muted)";
              const probColor = i===0?"var(--gold)":i<3?"var(--orange)":i<6?"var(--purple)":"var(--muted)";

              return (
                <div key={r.name} onClick={()=>openRider(r)} className={isFav?"":"card-hover"} style={{
                  background: isFav
                    ? "linear-gradient(145deg,#1a1400,#0f0d00)"
                    : "linear-gradient(145deg,var(--surface2),var(--surface))",
                  border: isFav?"1px solid var(--gold)50":"1px solid var(--border)",
                  borderLeft: isFav?"3px solid var(--gold)":isPodium?`3px solid ${podColor}`:"1px solid var(--border)",
                  borderRadius:12,
                  padding: isFav?"14px 14px":"10px 12px",
                  display:"flex",alignItems:"center",gap:12,
                  boxShadow: isFav?"0 6px 24px var(--gold)20, inset 0 1px 0 #facc1510":"0 2px 8px rgba(0,0,0,.3)",
                  animation:`fadeUp .3s ${.05+i*.04}s ease both`,
                  position:"relative",overflow:"hidden",
                  cursor:"pointer",
                }}>
                  {isFav&&<div style={{
                    position:"absolute",top:0,right:0,
                    fontFamily:"var(--font-mono)",fontSize:7,letterSpacing:1.5,
                    color:"#080808",background:"var(--gold)",
                    padding:"2px 8px",borderBottomLeftRadius:8,
                    fontWeight:700,
                  }}>★ FAVORI</div>}

                  {/* Position */}
                  <div style={{
                    width:isFav?38:30,height:isFav?38:30,minWidth:isFav?38:30,
                    borderRadius:"50%",
                    background:isFav?"var(--gold)":isPodium?`${podColor}25`:"var(--surface)",
                    border:isFav?"none":`1.5px solid ${podColor}40`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"var(--font-display)",
                    fontSize:isFav?18:14,
                    color:isFav?"#080808":podColor,
                    boxShadow:isFav?"0 0 16px var(--gold)60":"none",
                  }}>{i+1}</div>

                  {/* Rider info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:isFav?3:1}}>
                      <span style={{fontSize:isFav?14:12}}>{r.country}</span>
                      <span style={{
                        fontWeight:700,
                        fontSize:isFav?14:12,
                        color:isFav?"var(--gold)":"var(--text)",
                      }}>{r.name}</span>
                    </div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--muted)",letterSpacing:.5,marginBottom:5}}>{r.team}</div>

                    {/* Probability bar */}
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:isFav?5:4,background:"var(--surface2)",borderRadius:3,overflow:"hidden"}}>
                        <div style={{
                          height:"100%",
                          width:`${Math.min(r.prob*2,100)}%`,
                          background:`linear-gradient(90deg,${probColor}80,${probColor})`,
                          borderRadius:3,
                          transition:"width .8s cubic-bezier(.4,0,.2,1)",
                          boxShadow:`0 0 6px ${probColor}60`,
                        }}/>
                      </div>
                      <div style={{
                        fontFamily:"var(--font-display)",
                        fontSize:isFav?20:14,
                        color:probColor,
                        lineHeight:1,
                        textShadow:isFav?`0 0 8px ${probColor}50`:"none",
                        minWidth:isFav?52:38,textAlign:"right",
                      }}>{r.prob.toFixed(1)}<span style={{fontSize:isFav?11:9,color:"var(--faint)"}}>%</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Algorithm explanation */}
        <details style={{marginBottom:14}}>
          <summary style={{
            cursor:"pointer",listStyle:"none",
            background:"var(--surface)",border:"1px solid var(--border)",
            borderRadius:10,padding:"10px 14px",
            display:"flex",alignItems:"center",justifyContent:"space-between",
            fontFamily:"var(--font-mono)",fontSize:10,color:"var(--muted)",letterSpacing:1,
          }}>
            <span>ℹ️ COMMENT FONCTIONNE L'ALGORITHME ?</span>
            <span style={{fontSize:14}}>↓</span>
          </summary>
          <div style={{
            marginTop:6,padding:"14px 16px",
            background:"var(--surface)",border:"1px solid var(--border)",
            borderRadius:10,
            fontSize:11,lineHeight:1.7,color:"#aaa",fontFamily:"var(--font-body)",
          }}>
            <p style={{margin:"0 0 8px"}}><strong style={{color:"var(--gold)"}}>1. Profil de coureur (6 attributs / 100)</strong></p>
            <p style={{margin:"0 0 8px"}}>Chaque coureur a une note de 0 à 100 sur : sprint, montée, contre-la-montre, punch (côtes courtes), pavés, endurance et un coefficient de forme actuelle.</p>

            <p style={{margin:"0 0 8px"}}><strong style={{color:"var(--gold)"}}>2. Pondération du profil</strong></p>
            <p style={{margin:"0 0 8px"}}>Chaque profil d'étape ou de course pondère ces attributs (somme = 100%). Une étape de plat → 65% sprint. Une haute montagne → 70% montée.</p>

            <p style={{margin:"0 0 8px"}}><strong style={{color:"var(--gold)"}}>3. Score & forme</strong></p>
            <p style={{margin:"0 0 8px"}}>Score = Σ(attribut × poids), modulé par la forme actuelle (multiplicateur 0.85x à 1.15x).</p>

            <p style={{margin:"0 0 8px"}}><strong style={{color:"var(--gold)"}}>4. Probabilités</strong></p>
            <p style={{margin:"0 0 8px"}}>Distribution softmax sur le top 10 (température T=4) → % de chances de victoire.</p>

            <p style={{margin:"6px 0 0",fontFamily:"var(--font-mono)",fontSize:9,color:"var(--faint)",letterSpacing:.5}}>⚠ Modèle simplifié à but pédagogique. Ne tient pas compte de la tactique d'équipe, de la météo, ni des coureurs hors base.</p>
          </div>
        </details>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HISTORICAL WINNERS TAB
// ─────────────────────────────────────────────
function PalmaresTab() {
  const { openRider } = useContext(RiderContext);
  const [gender,setGender]=useState("M");
  const HIST    = gender==="M" ? HISTORY   : HISTORY_W;
  const RG      = gender==="M" ? RACE_GROUPS : RACE_GROUPS_W;
  const groups  = Object.keys(RG);
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const racesInGroup = Object.entries(HIST).filter(([,v])=>v.group===activeGroup);
  const [selected, setSelected] = useState(racesInGroup[0]?.[0]||"");

  // Reset when gender changes
  useEffect(()=>{
    const grps = Object.keys(gender==="M"?RACE_GROUPS:RACE_GROUPS_W);
    const hist = gender==="M"?HISTORY:HISTORY_W;
    setActiveGroup(grps[0]);
    const first = Object.entries(hist).find(([,v])=>v.group===grps[0]);
    if(first) setSelected(first[0]);
  },[gender]);

  const switchGroup = (g) => {
    setActiveGroup(g);
    const first = Object.entries(HIST).find(([,v])=>v.group===g);
    if(first) setSelected(first[0]);
  };

  const race = HIST[selected];
  const data = race?.winners||[];

  const winCount={};
  data.forEach(d=>{ if(d.winner&&!d.winner.includes("—")) winCount[d.winner]=(winCount[d.winner]||0)+1; });
  const topWinner = Object.entries(winCount).sort((a,b)=>b[1]-a[1])[0];
  const natCount={};
  data.forEach(d=>{ if(d.country) natCount[d.country]=(natCount[d.country]||0)+1; });
  const topNat = Object.entries(natCount).sort((a,b)=>b[1]-a[1])[0];
  const editions = data.filter(d=>!d.winner?.includes("—")).length;

  return (
    <div style={{paddingBottom:80,minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(180deg,#111,var(--bg))",borderBottom:"1px solid var(--border)",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Logo/>
        {/* Gender switcher */}
        <div style={{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden"}}>
          {[{id:"M",label:"♂ Hommes",c:"var(--cyan)"},{id:"F",label:"♀ Femmes",c:"#f472b6"}].map(g=>(
            <button key={g.id} onClick={()=>setGender(g.id)} style={{
              padding:"7px 12px",border:"none",cursor:"pointer",
              background:gender===g.id?`${g.c}20`:"transparent",
              borderRight:g.id==="M"?"1px solid var(--border)":"none",
              fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:1,
              color:gender===g.id?g.c:"var(--muted)",
              transition:"all .15s",
            }}>{g.label}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"20px 16px 0"}}>
        {/* Title */}
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:30,letterSpacing:3,color:"#fff",lineHeight:1}}>PALMARÈS HISTORIQUE</div>
            <span style={{
              fontFamily:"var(--font-mono)",fontSize:9,
              color:gender==="F"?"#f472b6":"var(--cyan)",
              background:gender==="F"?"#f472b615":"var(--cyan)15",
              border:`1px solid ${gender==="F"?"#f472b630":"var(--cyan)30"}`,
              borderRadius:6,padding:"2px 7px",letterSpacing:1,
            }}>{gender==="F"?"♀ WWT":"♂ WT"}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:1.5}}>
              {gender==="F"?"DEPUIS 1992 · ":"1950–2026 · "}{Object.keys(HIST).length} COURSES
            </span>
            {race?.level&&<span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--orange)",background:"var(--orange)15",border:"1px solid var(--orange)30",borderRadius:4,padding:"1px 6px",letterSpacing:1}}>{race.level}</span>}
          </div>
        </div>

        {/* Group tabs */}
        <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {groups.map(g=>{
            const cfg=RG[g];
            const isActive=activeGroup===g;
            return (
              <button key={g} onClick={()=>switchGroup(g)} style={{
                flex:"0 0 auto",
                padding:"8px 14px",
                background:isActive?`${cfg.color}18`:"var(--surface)",
                border:`1px solid ${isActive?cfg.color:"var(--border)"}`,
                borderRadius:10,cursor:"pointer",
                display:"flex",alignItems:"center",gap:6,
                transition:"all .15s",
                boxShadow:isActive?`0 4px 16px ${cfg.color}20`:"none",
              }}>
                <span style={{fontSize:14}}>{cfg.icon}</span>
                <span style={{
                  fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,letterSpacing:1,
                  color:isActive?cfg.color:"var(--muted)",
                  whiteSpace:"nowrap",
                }}>{g.replace(" W","").replace(" M","")}</span>
              </button>
            );
          })}
        </div>

        {/* Race selector */}
        <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          {Object.entries(HIST).filter(([,v])=>v.group===activeGroup).map(([name,v])=>(
            <button key={name} onClick={()=>setSelected(name)} style={{
              background:selected===name?"#1a1400":"var(--surface)",
              border:selected===name?"1px solid var(--gold)":"1px solid var(--border)",
              borderRadius:100,padding:"6px 12px",cursor:"pointer",
              whiteSpace:"nowrap",
              display:"flex",alignItems:"center",gap:5,
              transition:"all .15s",flexShrink:0,
              boxShadow:selected===name?"0 0 12px var(--gold)20":"none",
            }}>
              <span style={{fontSize:12}}>{v.icon}</span>
              <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:selected===name?"var(--gold)":"var(--muted)",letterSpacing:.5}}>{name}</span>
              {v.level&&<span style={{fontFamily:"var(--font-mono)",fontSize:7,color:"#444",background:"var(--faint)",borderRadius:3,padding:"1px 4px"}}>{v.level}</span>}
            </button>
          ))}
        </div>

        {/* Stats banner */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,
          marginBottom:14,overflow:"hidden",borderRadius:14,
          border:"1px solid var(--border)",
        }}>
          {[
            {v:editions,      label:"ÉDITIONS",    c:"var(--gold)"},
            {v:topWinner?`${topWinner[1]}×`:"-",label:topWinner?topWinner[0].split(" ").pop():"RECORD",c:"var(--orange)"},
            {v:topNat?topNat[0]:"—",label:topNat?`${topNat[1]} VICTOIRES`:"NATION",c:"var(--green)"},
            {v:data[0]?.year||"—",label:"DERNIÈRE ÉD.",c:"var(--purple)"},
          ].map((s,i)=>(
            <div key={i} style={{
              padding:"14px 12px",textAlign:"center",
              background:i%2===0?"var(--surface2)":"var(--surface)",
              borderRight:i<3?"1px solid var(--border)":"none",
            }}>
              <div style={{fontFamily:"var(--font-display)",fontSize:22,color:s.c,lineHeight:1,marginBottom:4,textShadow:`0 0 8px ${s.c}40`}}>{s.v}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:7,color:"var(--muted)",letterSpacing:1}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Winners timeline */}
        <div style={{display:"flex",flexDirection:"column",gap:0,position:"relative"}}>
          {/* Vertical line */}
          <div style={{position:"absolute",left:46,top:0,bottom:0,width:1,background:"linear-gradient(180deg,var(--gold)40,var(--border)50%,transparent)",pointerEvents:"none"}}/>

          {data.map((d,i)=>{
            const isLatest = i===0;
            const isCancelled = d.winner?.includes("—")||d.note;
            const yearColor = isLatest?"var(--gold)":isCancelled?"var(--faint)":"var(--muted)";

            return (
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:0,
                padding:"0 0 0 0",
                position:"relative",
              }}>
                {/* Year column */}
                <div style={{
                  width:46,flexShrink:0,
                  fontFamily:"var(--font-display)",fontSize:isLatest?16:12,
                  color:yearColor,textAlign:"right",
                  paddingRight:10,paddingTop:i===0?8:4,paddingBottom:4,
                  letterSpacing:.5,
                  lineHeight:1,
                }}>
                  {d.year}
                </div>

                {/* Dot */}
                <div style={{
                  width:isLatest?10:6,height:isLatest?10:6,
                  minWidth:isLatest?10:6,
                  borderRadius:"50%",
                  background:isLatest?"var(--gold)":isCancelled?"var(--faint)":"var(--border2)",
                  border:isLatest?"2px solid var(--gold)":"1px solid var(--border)",
                  boxShadow:isLatest?"0 0 10px var(--gold)":undefined,
                  zIndex:1,
                  marginTop:isLatest?1:0,
                }}/>

                {/* Content */}
                <div style={{
                  flex:1,
                  padding:`${i===0?8:4}px 0 4px 12px`,
                  borderBottom:i<data.length-1?"1px solid var(--border)10":"none",
                }}>
                  {isLatest?(
                    <div style={{
                      background:"linear-gradient(145deg,#1a1400,#110e00)",
                      border:"1px solid var(--gold)30",
                      borderRadius:10,
                      padding:"10px 14px",
                      boxShadow:"0 4px 16px var(--gold)10",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                        {d.country&&<span style={{fontSize:14}}>{d.country}</span>}
                        {(()=>{
                          const r=findRiderByName(d.winner);
                          return r ? (
                            <button onClick={()=>openRider(r)} style={{
                              background:"none",border:"none",padding:0,cursor:"pointer",
                              fontWeight:700,fontSize:14,color:"var(--gold)",
                              borderBottom:"1px dashed var(--gold)50",
                              fontFamily:"inherit",
                            }}>{d.winner}</button>
                          ) : (
                            <span style={{fontWeight:700,fontSize:14,color:"var(--gold)"}}>{d.winner}</span>
                          );
                        })()}
                        <span style={{fontSize:14}}>🏆</span>
                        {d.note&&<span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--red)",background:"var(--red)15",borderRadius:4,padding:"1px 5px"}}>{d.note}</span>}
                      </div>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--muted)",letterSpacing:.5}}>{d.team}</div>
                    </div>
                  ):(
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      {d.country&&<span style={{fontSize:11}}>{d.country}</span>}
                      {(()=>{
                        const r=findRiderByName(d.winner);
                        return r ? (
                          <button onClick={()=>openRider(r)} style={{
                            background:"none",border:"none",padding:0,cursor:"pointer",
                            fontSize:12,fontWeight:600,color:isCancelled?"var(--faint)":"#c0c0c0",
                            borderBottom:"1px dashed #c0c0c050",
                            fontFamily:"inherit",
                          }}>{d.winner}</button>
                        ) : (
                          <span style={{fontSize:12,fontWeight:600,color:isCancelled?"var(--faint)":"#c0c0c0"}}>{d.winner}</span>
                        );
                      })()}
                      {d.note&&<span style={{fontFamily:"var(--font-mono)",fontSize:7,color:"var(--red)",background:"var(--red)12",borderRadius:3,padding:"1px 4px"}}>{d.note}</span>}
                      <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--faint)",marginLeft:"auto"}}>{d.team}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{marginTop:16,paddingBottom:8,fontFamily:"var(--font-mono)",fontSize:8,color:"var(--faint)",textAlign:"center",letterSpacing:1}}>
          SOURCE : PROCYCLINGSTATS.COM · * RÉSULTATS ANNULÉS INCLUS POUR L'HISTORIQUE
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
// React Context to expose rider modal openers to all tabs
const RiderContext = React.createContext({ openRider:()=>{}, openCompare:()=>{} });

export default function App() {
  const [tab,setTab]=useState("quiz");
  const [bestScore,setBestScore]=useState(0);
  const [totalPlayed,setTotalPlayed]=useState(0);
  const [activeRider,setActiveRider]=useState(null);
  const [compareLeft,setCompareLeft]=useState(null);
  const [compareRight,setCompareRight]=useState(null);

  useEffect(()=>{
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
    document.body.style.margin="0";
    document.body.style.background="#080808";
  },[]);

  // Esc to close modals
  useEffect(()=>{
    const onKey=(e)=>{
      if(e.key==="Escape"){
        if(compareLeft){ setCompareLeft(null); setCompareRight(null); }
        else if(activeRider){ setActiveRider(null); }
      }
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[activeRider,compareLeft]);

  const openRider = (rider) => setActiveRider(rider);
  const openCompare = (rider) => {
    setActiveRider(null);
    setCompareLeft(rider);
    setCompareRight(null);
  };

  return (
    <RiderContext.Provider value={{ openRider, openCompare }}>
      <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--text)",fontFamily:"var(--font-body)"}}>
        <style>{GLOBAL_CSS}</style>
        {tab==="quiz"      &&<QuizTab bestScore={bestScore} setBestScore={setBestScore} totalPlayed={totalPlayed} setTotalPlayed={setTotalPlayed}/>}
        {tab==="resultats" &&<ResultatsTab/>}
        {tab==="pronostics"&&<PronosticTab/>}
        {tab==="palmares"  &&<PalmaresTab/>}
        <BottomNav active={tab} setActive={setTab}/>
        {activeRider && (
          <RiderModal
            rider={activeRider}
            onClose={()=>setActiveRider(null)}
            onCompare={openCompare}
          />
        )}
        {compareLeft && (
          <CompareModal
            left={compareLeft}
            right={compareRight}
            onPickRight={(r)=>{
              if(r===null){ setCompareRight(null); }
              else { setCompareRight(r); }
            }}
            onClose={()=>{ setCompareLeft(null); setCompareRight(null); }}
          />
        )}
      </div>
    </RiderContext.Provider>
  );
}
