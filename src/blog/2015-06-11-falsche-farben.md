---
layout: post
title: "Falsche Farben — So gelingt die Arbeit mit Farben besser"
date: 2015-06-12 9:40:03 +0200
tags: Design Farben
author: werner
signup: true
---

<figure>
  {% image posts/farben/title.jpg alt:"Color Splash" %}
</figure>

Ein umfangreiches Verständnis für Farben ist unter Web-Entwicklern und sogar Designern oft nicht vorhanden. Der Mensch nimmt Farben nicht in der gleichen Form wahr, wie diese technisch erfasst werden. Vielmehr hat er durch unterschiedlich gut ausgebaute Fähigkeiten verschiedener Rezeptoren im Auge erhebliche Unterschiede in der Wahrnehmung verschiedener Farbgruppen. Noch dazu wird durch eine Vielzahl von Effekten der Umgebung diese Wahrnehmung noch massiv beeinflusst.

<!--mehr-->

<figure>
  {% image "posts/farben/munsell-system.png" alt:"Das Munsell-Farbsystem" %}
  <figcaption>Hier ein Blick auf das historische Munsell-Farbsystem von 1898.</figcaption>
</figure>

Zur Definition von Farben gibt es unterschiedliche Modelle und Formate. Viele davon haben eine sehr lange Historie. Nur Wenige beachten den Menschen umfassend genug um als sinnvoll für eine Vielzahl von Arbeiten zu gelten. Beispiele hierfür wären die Bearbeitung von Bildern oder das mathematische Arbeiten mit Farben z.B. das prozentuale Anpassen der Helligkeit. Auch Harmonien bzw. Unterschiede zwischen Farben — es gibt hierzu diverse Ideen — machen genau genommen keinen Sinn, wenn das fundamentale Modell dahinter eine massiv verzerrte Darstellung im Vergleich zur menschlichen Wahrnehmung nutzt.


## RGB und Hex

<figure class="hanging">
  {% image "posts/farben/srgb-gamut.png" alt:"Das Gamut von sRGB" %}
  <figcaption>Hier sieht man den Bereich den sRGB im Bereich des sichtbaren Lichts abdeckt.</figcaption>
</figure>

Im Internet verwenden die meisten Web-Entwickler [RGB-Farben](http://de.wikipedia.org/wiki/RGB-Farbraum), die auch gerne als Hex-Werte angegeben werden. Man stellt bei der Verwendung von RGB-basierten Farben schnell fest, dass Änderungen an den Einzelwerten keine nachvollziehbaren Änderungen bewirken. Das ergibt sich durch eine ganze Reihe von Gründen. RGB definiert die Ausprägung der Farben Rot, Grün und Blau und damit deren Mischungsverhältnis. Intuitiv würde man denken, dass man hiermit gut alle Farben sinnvoll abbilden kann: Die meisten Farbtöne entstehen durch Mischungen dieser Einzelfarben. Das ist auch soweit nicht ganz falsch. Problembehaftet ist hierbei aber, dass die Helligkeit und Sättigung (bzw. zum besseren Verständnis: Kräftigkeit) der Farben sich eher indirekt ergibt: Wenn sich der Wert aller Grundfarben reduziert sinkt sowohl die Helligkeit als auch die Sättigung.

Am gebräuchlichsten unter den RGB-Farbräumen (es gibt mehr als eine Variante zur Verwendung in unterschiedlicher Software und Hardware) ist heute [sRGB](http://de.wikipedia.org/wiki/SRGB) (von 1996), der sowohl zur Kalibrierung von Monitoren (Ziel ist oft eine >99%-ig korrekte Abbildung des sRGB-Farbraumes) als auch im Web als Standard verwendet wird. Durch das geringe Gamut — eine Bezeichnung für den Anteil des abgedeckten sichtbaren Spektrums — präferieren Bildverarbeitungsexperten aber [Adobe RGB](http://de.wikipedia.org/wiki/Adobe-RGB-Farbraum) (von 1998) oder das [ECI-RGB](http://www.eci.org/doku.php?id=de:colourstandards:workingcolorspaces). Beide können einen weitaus größeren Anteil der sichtbaren Farben abbilden als sRGB.



## CMYK

<figure class="hanging">
  {% image "posts/farben/rgb-vs-cmyk.png" alt:"RGB vs. CMYK" %}
  <figcaption>Links: Das additive Verhalten von RGB; Rechts: Das subtraktive Verhalten von CMYK.</figcaption>
</figure>

Für den Vierfarbdruck durch Offset-Drucker bzw. Druckereien wird meistens CMYK genutzt. Für den Einsatz am Bildschirm hat dieses Farbmodell keine Relevanz und wird nach dem Design am Bildschirm (das meist in anderen Farbräumen stattfindet) nur entsprechend umgerechnet. Druckereien verwenden sogenannte ICC-Profile für das Farbmanagement um die rohen CMYK-Daten an die Fähigkeiten bzw. Unfähigkeiten des Ausgabegerätes anzupassen.

CMYK findet man hauptsächlich in Programmen, die ursprünglich für die Erzeugung von Druckprodukten entwickelt worden sind. Unter anderem in der der Adobe-Kollektion aber auch z.B. in Gimp und Affinity Designer.




## HSL und HSB

Seit ein paar Jahren kann man im Web auch Farben über HSL definieren. Mit HSL werden Farben mittels Hue (Farbton), Saturation (Sättigung) und Luminanz (Helligkeit) definiert. Dies löst einen Großteil der Probleme von RGB. Endlich hat man eine gute Kontrolle über Sättigung und Helligkeit — und das ohne den Farbton zu ändern. HSB und HSL sind in der Art und Weise vergleichbar, aber nicht identisch. Man kann beide ineinander umrechnen, aber man kann nicht einfach den gleichen Einzelwert im anderen Modell einsetzen (außer für Hue/Farbton).

<figure class="hanging">
  {% image "posts/farben/hue.jpg" alt:"Farbauswahl via HSL/HSB" %}
  <figcaption>Die typische Farbauswahl via HSB/HSL.</figcaption>
</figure>

Es gibt allerdings noch ein paar Probleme, die gegen die Verwendung von HSL/HSB zur Definition und Berechnung von Farben und Paletten von Farben sprechen. Alle bisher genannten Modelle beziehen sich nur auf technische Gegebenheiten und lassen den Menschen und seine Wahrnehmung komplett außen vor. Das führt dann z.B. dazu, dass unterschiedliche Farbtöne bei gleicher Sättigung völlig unterschiedlich gesättigt erscheinen.

Außerdem bilden alle diese Modelle nur einen Teil des durch Menschen wahrnehmbaren Spektrums ab. Das Gamut (Menge aller Farben, die ein Gerät darstellen, wiedergeben bzw. aufzeichnen kann) ist bei diesen verhältnismäßig klein. Umrechnungen zwischen den Modellen können, da sich die Modelle zusätzlich auch nicht 100%-ig überlagern, verlustbehaftet sein (gerade weil in der Regel mit den gerundeten Werten des jeweiligen Modells gearbeitet wird).

Wir empfehlen grundsätzlich auf Methoden zur Manipulation von Farben, die HSL/HSB-basiert sind, zu verzichten. Das schließt dann z.B. auch die elegant wirkenden Farbmethoden von [Sass](http://sass-lang.com) (einem Tool zur Arbeit mit CSS) wie [adjust_color](http://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) mit ein. Es hilt natürlich auch nichts [HSB in HSL umzurechnen](http://www.sitepoint.com/hsb-colors-with-sass/) auch wenn man dann natürlich Farbtöne direkt aus Photoshop, Illustrator, Gimp und Co kopieren kann. HSB, welches unter anderem in der Adobe Kollektion, Gimp und als Standard unter Mac OS genutzt wird, ist allgemein weiter verbreitet als HSL, welches unter anderem Teil der CSS3-Spezifikation und in Affinity Designer zur Farbauswahl angeboten wird.


## CIEXYZ

Das CIEXYZ-Farbraum ist ein erster Versuch gewesen Farben so abzubilden wie der Mensch diese wahrnimmt. Außerdem sollte mir CIEXYZ ein einheitlicher Standard zur Definition aller wahrnehmbaren Farben gefunden werden.

<figure class="hanging">
  {% image "posts/farben/cie-1931.png" alt:"Das volle Farbspektrum des CIE-Raumes" %}
  <figcaption>Hier sehen Sie den vollen Umfang der Farben, die der Mensch wahrnehmen kann.</figcaption>
</figure>

CIEXYZ ist entsprechend schon alt. Der Standard wurde im Jahr 1931 spezifiziert (nach Forschungen, die schon 1920 begonnen haben). CIEXYZ stellt die Basis für den reellen CIERGB-Farbraum dar und ist einer der ersten RGB-Farbräume überhaupt. CIERGB bildet nur einen Teil des CIEXYZ-Farbraums ab — beinhaltet aber im Gegensatz zu diesem auch nur darstellbare Farben. Die Limitierungen lagen vor allem in weniger Feinheiten und fehlenden Farben im grün-blauen Bereich des Farbspektrums.

Das CIEXYZ-System wurde in den Jahren bis 1931 erstellt. Die damalige Präzision für exakte wissenschaftliche Zwecke ist unter heutigen technischen Möglichkeiten unzureichend. Trotzdem basieren alle weiteren CIE-Modelle bisher weiterhin auf dem klassische CIEXYZ-Modell.

Das CIEXYZ-System wird heute meist nur als Umrechnungsbasis zwischen RGB und anderen CIE*-Farbräumen verwendet.



## CIELAB und CIELUV

Die beiden Farbräume CIELAB und CIELUV (von 1976) sind eine Verbesserung des CIEXYZ-Farbmodells um die menschliche Wahrnehmung bei der Definition von Farben noch besser in Betracht zu ziehen. Beide transformieren über mathematische Formeln, den Ursprungsfarbraum CIEXYZ. Ziel war es, dass eine gleichmäßige Anpassungen der Werte auch dazu führt, dass sich die Farbe — relativ betrachtet — genauso viel verändert.

<blockquote lang="en">Unlike the RGB and CMYK color models, Lab color is designed to approximate human vision. It aspires to perceptual uniformity, and its L component closely matches human perception of lightness.
  <footer><a href="http://en.wikipedia.org/wiki/Lab_color_space">Wikipedia</a></footer>
</blockquote>

Mit Erreichung dieses Zieles wäre eine mathematische Anpassung von Farben korrekt möglich. Mit HSL/HSB — wie bereits erwähnt — ist das leider nicht der Fall. In der Konsequenz heißt das, dass alle Tools und Lösungen, die Farben auf Basis von HSL/HSB anpassen z.B. via Methoden wie `lighten` oder `darken` zwangsweise falsche Ergebnisse liefern. Falsch bedeutet in dem Fall aber nicht, dass diese völlig daneben liegen. Immerhin wird ein Bild schon dunkler bei der Verwendung von 'darken()' — allerdings kann z.B. ein rötlicheres Bild nach der Abdunklung weniger dunkel erscheinen als ein Türkises.

<blockquote lang="en">CIELAB is one of the most widely used because it has become one of the building blocks of color management with ICC profiles. Therefore, it is basically omnipresent in digital imaging.
  <footer><a href="http://en.wikipedia.org/wiki/Color_appearance_model#CIELAB">Wikipedia</a></footer>
</blockquote>

<figure class="hanging">
  {% image "posts/farben/hsb-vs-cielab.png" alt:"Der Farbton im Vergleich: HSB und CIELAB" %}
  <figcaption>Die rechte Seite mit CIELAB ist weit gleichförmiger als HSB links.</figcaption>
</figure>

CIELAB und CIELUV unterscheiden sich in soweit, dass CIELUV ursprünglich für beleuchte Flächen gedacht war — also z.B. Bildschirme — während CIELAB eher für passive Flächen wie für den Ausdruck gedacht war. CIELUV spielt heute allerdings, trotz der riesigen Menge an Displays heutzutage, überraschenderweise keine große Rolle mehr. Wenn man sich im professionellen Umfeld umsieht, ist meist nur die Rede von CIELAB bzw. kürzer auch LAB. Programme wie Photoshop und auch neue Kandidaten wie Affinity Designer bieten neben den Klassikern wie RGB auch eine Eingabe als LAB-Farben an. CIELAB dient diesen Programmen oft auch intern als Speicherformat — alle anderen Farbräume werden entsprechend umgerechnet.

<blockquote lang="en">The consensus among the attendees was that CIELUV was not really needed anymore (all current color science development revolved around CIELAB and CIECAM worldwide) it was agreed to keep it around for 'emissive' people.
  <footer><a href="http://lists.apple.com/archives/colorsync-users/2007/Nov/msg00351.html">Apple Colorsync Mailing List</a></footer>
</blockquote>

Ein Grund der gegen CIELUV spricht, ist aber auch, dass CIELUV nicht ganz so gleichmäßige Abstände bei der Abbildung der Farben realisiert hat. CIELAB hat dieses Ziel also besser erfüllt und erlaubt die Beschreibung aller wahrnehmbaren Farben mit sehr gleichmäßigen Abständen.

CIELAB findet man in allen professionellen Grafikprogrammen: Adobe Photoshop, Affinity Designer, Corel Graphics, Gimp und vielen mehr. CIELUV hat sich nicht durchgesetzt, ist aber z.B. die Basis von HUSL (siehe nächster Absatz).


## HUSL — Das CIELUV-Derivat

[HUSL](http://www.husl-colors.org) verfolgt die Anpassung des CIELUV-Farbraumes, um diese verwendbarer zu gestalten. Ein Problem bei der Verwendung von CIE-Farben ist nämlich, dass es möglich ist, Farben zu definieren, die im Endeffekt nicht abbildbar sind. HUSL stretcht daher den Farbraum so, dass dieser eine Abbildung in einer HSL-typischen Aufbereitung erlaubt.

<figure class="hanging">
  {% image "posts/farben/husl-stretching.png" alt:"HUSL ist CIELUV gestreckt" %}
  <figcaption>HUSL (rechts) ist eine Transformation von CIELUV (links).</figcaption>
</figure>

Diese Anpassung verzieht allerdings den Farbraum derart, dass die Sättigung, wenn man unterschiedliche Farbtöne vergleicht, nicht mehr gleichmäßig ist. Das rechnen mit Farben, also das mathematische heller/dunkler bzw. intensiver/sanfter machen der Farben, ist daher mit HUSL kaum möglich. Trotzdem dürfte HUSL, aufgrund der Beachtung des Menschen, die bessere Wahl zur Definition von Farben sein als das weiter verbreitete HSL/HSB.

Es gibt unseres Wissens nach keine Programme für die Arbeit HUSL. Es gibt aber Umsetzungen zur Verwendung in JavaScript-, Python- und C#-Anwendungen.



## HLC — CIELAB in einfacher

HLC (bzw. L\*C\*h° oder LCHab) erlaubt die [einfachere Handhabung von CIELAB-Farben](http://cielab-farben.de/hlc_in_5_minuten.html). Im Kern also vergleichbar mit der Idee von HUSL für CIELUV (oder LCHuv). Genau wie in HSL/HSB gibt es wieder einen mit 360 Grad ausgestatteten Farbton-Radius. (Die Werte dafür sind aber wieder nur ähnlich und nicht identisch.) Ein Nachteil ist allerdings, dass HLC etwas reduziert ist bzgl. Farbumfang/Gamut und daher nicht alle in CIELAB realisierbaren Farben korrekt bzw. über gerade Werte, abbilden kann.

Lch kann man über diverse APIs wie z.B. "Color Science" für Python nutzen. Für die nutzerfreundlichere Variante HLC gibt es Farbfächer vom [DTP Studio](http://dtpstudio.de/) in denen man auch die CIELAB-Werte ablesen kann und somit die Werte in ein Grafikprogramm übertragen kann.


## CIECAM

CIECAM97 (von 1997) und CIECAM02 (von 2002) sind weiter verbesserte Versionen eines Farbraums auf Basis der Erkenntnisse von CIELAB, die neben der verbesserten menschlichen Wahrnehmung auch noch weitere Umgebungsvariablen mit einbeziehen. Man bezeichnet sie daher auch als "Farberscheinungsmodell" — das passt aber auch schon in reduzierter Art und Weise für CIELAB (Beachtet die Adaption an den Weißpunkt und die sogenannte Kompression der Helligkeitswahrnehmung).

CIECAM97 spielt heute keine Rolle mehr. Es war nur ein Zwischenschritt zum einfacheren und gleichzeitig besseren CIECAM02.

<blockquote lang="en">Neither CIELAB or CIELUV are considered "perceptually uniform" nowadays.
  <footer><a href="http://lists.apple.com/archives/colorsync-users/2007/Nov/msg00340.html">Apple Colorsync Mailing List</a></footer>
</blockquote>

<figure class="hanging" >
  {% image "posts/farben/surround-red-ciecam02.png" alt:"CIECAM beachtet die Umgebung" %}
  <figcaption>CIECAM Anpassung in Aktion: Die Farben auf der gleichen Zeile sehen gleich aus... sind es aber nicht.</figcaption>
</figure>

CIECAM korrigiert viele Effekte (z.B. die Stevens- und Hunt-Effekte), die im Laufe der Zeit identifiziert wurden. Somit kann man mit CIECAM Farben korrekter in Relation zueinander bringen. Abstände innerhalb von CIECAM entsprechen noch besser den Abständen der menschlichen Wahrnehmung. Es berücksichtigt in größerem Umfang Dinge wie etwa Bildhelligkeit, Farbhintergrund, Bildumgebung, Weißpunkt, Adaptation und Simultankontrast. Daher ist CIECAM besser als CIELAB zur Definition und Berechnung von Farben.

CIECAM ist allerdings auch weit komplexer als CIELAB und benötigt zur Berechnung z.B. viel mehr Informationen zur Umgebung etc. Diese Variablen können natürlich alle auf Standard-Werten belassen werden. Wobei es natürlich am besten wäre die meisten dieser Werte automatisch zu bestimmen.

<blockquote>CIECAM02 ist das letzte international empfohlene Modell.
  <footer><a href="http://www.uni-koblenz.de/~cg/ss09/Proseminar_Farbmanagement/Color%20Appearance%20Models.pdf">Uni Koblenz</a></footer>
</blockquote>

Ein weiter verbessertes Model nach CIECAM ist laut [Mark Fairchild](http://rit-mcsl.org/fairchild/) — einem anerkannten Professor zur Farblehre — nicht so schnell in Sicht. Weitere Verbesserungen würden in erheblichen Umfang sehr detaillierte Forschungen erfordern. Die Arbeit geht aber natürlich weiter mit Modellen wie iCAM, die sich aber eher auf den Eindruck ganzer Bilder (sogenannte Image Color Appearance Modelle) fokussieren und sehr relevant sind z.B. für die HDR-Fotografie.

CIECAM ist die Basis für das Windows Farbmanagement-System, ist Kerntechnologie der HDR-Software Enblend und steht im RAW-Entwickler RawTherapee zur Anpassung von Bildern zur Verfügung.


## Pantone, RAL, HKS und Co

Diese nicht freien Farbsysteme wie [Pantone](http://de.wikipedia.org/wiki/Pantone_Matching_System), [RAL](http://de.wikipedia.org/wiki/RAL-Farbe) und [HKS](http://de.wikipedia.org/wiki/HKS-Farbfächer) kosten eine gute Menge an Geld und [helfen im Prinzip nicht mehr als die freien Standards](http://freiefarbe.de) der CIE-Gruppe. In großen Konzernen werden diese Farbsysteme oft verwendet. Klassischerweise kommen sie aus dem Druckbereich und garantieren auch wirklich die passende Ausgabefarbe zu erhalten.

<figure class="hanging">
  {% image "posts/farben/pantone-art.jpg" alt:"Pantone Kunst" %}
  <figcaption>Man kann mit Pantone-Farben auch die Wände schmücken.</figcaption>
</figure>

Pantone arbeitet zum Beispiel mit extra gemischten Volltonfarben und umgeht daher die reduzierten Möglichkeiten eines auf der Mischung von vier Farben basierenden CMYK-Druckes. Für den Bildschirm ist aber in jedem Fall eine Umrechnung nach sRGB zur Anzeige erforderlich.

RAL basiert im Kern auf CIELAB, aber bringt nach Auffassung des Herstellers wohl Ordnung und Beherrschbarkeit in das System.

Interessant ist weiterhin, dass es einige Farben in diesen Systemen gibt, die durch große Marken und Unternehmen gesperrt sind. Ein paar bekannte Beispiele wären hier:

- Beiersdorf-Blau (Pantone 280)
- Telekom-Magenta (RAL 4010)
- Langenscheidt-Gelb
- Milka-Lila

In den genannten Farbsystemen wird mit festen Tabellen statt mit Mathematik gearbeitet (daher wird auch oft von Farbtabellen, Farbreihen bzw. Sonderfarben statt Farbsystemen gesprochen). Für Abstufungen sucht man — je nach System — z.B. innerhalb einer Tabelle nach dem nächsten Farbton in der jeweiligen Richtung. Es handelt sich um Variation von Pigmentanteilen statt auf Empfindung basierender Verfahren.

Feiner als mit den Tabellen des Anbieters kann man in diesen Systemen nicht arbeiten. Harmonien lassen sich auch schwer berechnen und auch nicht mathematisch darlegen.

Man kann alle Farben — bis auf Schmuckfarben wie Gold — aus diesen Systemen auch als CIELAB/CIECAM definieren. Was im Gegenzug aber nicht bedeutet, dass man diese im Anschluss über CMYK auch drucken kann. CMYK deckt schließlich nicht das volle wahrnehmbare Spektrum ab und so kann man via Pantone, HKS und Co Farben produzieren, die es in der CMYK-Welt nicht gibt.

Pantone, RAL, HKS und Co begegnen einem mehrheitlich im Umfeld des Offset-Drucks bzw. dem Druck mit Lack-Farben. Für das Branding großer Marken wird außerdem häufig auf diese Farbpaletten zurückgegriffen.


## Fazit

Berechnete Farben sind Urheber- und Lizenz-frei. Und oft möchte man berechnen — jedenfalls sobald man in der Lage ist, Farben wirklich anhand der menschlichen Empfindung zu behandeln.

RGB und CMYK fallen aufgrund des begrenzten Farbumfangs/Gamuts wie erwähnt aus. Feste Tabellen wie Pantone erlauben keine Berechnung und zwingen einen in feste unflexible Systeme.

<blockquote>Die Internationale Beleuchtungskommission (Commission Internationale de l'Eclairage, CIE) ist keine Firma, sondern ein recht kleiner weltweit aktiver wissenschaftlich arbeitender Verein, der sich der Weiterentwicklung von Farbmodellen und Standardisierung von Lichtquellen verschrieben hat.
  <footer><a href="http://cielab-farben.de/was_ist_cielab.html">CIELAB Farben</a></footer>
</blockquote>

Was bleibt sind die neueren CIE-Standards wie CIECAM und CIELAB. Nach unserer Einschätzung macht es Sinn bei der Entwicklung von neuen Designs konsequent auf eines dieser Modelle zu setzen.

<blockquote lang="en">CIELAB has become a standard colorimetric space and is one of the most practical and widely implemented color models available.
  <footer><a href="http://www.handprint.com/HP/WCL/color7.html">Bruce MacEvoy</a></footer>
</blockquote>

<figure>
  {% image "posts/farben/hlc-faecher.jpg" alt:"HLC-Fächer zur einfachen Farbauswahl" %}
  <figcaption>Für HLC gibt es wunderschön gefertigte Fächer zu kaufen.</figcaption>
</figure>

- CIECAM ist dabei unser Favorit zur Berechnung von Farben, da er eine sehr gute Gleichmäßigkeit bei Farbton und Sättigung aufweist und einige relevante Informationen der Umgebung mit beachtet.
- CIELAB bzw. HLC ist vermutlich der sinnvolle Kompromiss, da dieser aktuell eine weit bessere Verbreitung aufweist und es neben weitreichendem Support in Grafikprogrammen auch z.B. [Farbfächer zu kaufen](http://dtpstudio.de/cielab/shop.php) gibt.

CIELAB als auch CIECAM bilden das volle sichtbare Gamut ab. Solange man die Einzelwerte nicht rundet, lassen sich beide Farbräume verlustfrei konvertieren. Man kann z.B. über einen HLC-Farbfächer eine Farbe auswählen und anschließende Berechnungen zu Harmonien oder Abstufungen über CIECAM realisieren. Am Ende gibt man dann RGB für den Bildschirm aus bzw. CMYK für den Druck.


## Ressourcen

- [Watercolors](http://www.handprint.com/HP/WCL/color7.html)
- [Bruce Justin Lindbloom](http://www.brucelindbloom.com/index.html?Math.html)

*[API]: Schnittstelle zur Anwendungsprogrammierung
*[CAM]: Farberscheinungsmodell
*[CIE]: Internationale Beleuchtungskommission
*[CIECAM]: Farberscheinungsmodell von 2002
*[CIELAB]: Farbmodell zur Beschreibung aller wahrnehmbaren Farben
*[CIELUV]: Alternatives Farbmodell zu CIELAB für Bildschirme
*[CIERGB]: RGB-Farbraum der CIE
*[CIEXYZ]: Klassisches Basis-Farbmodell zur Erfassung aller wahrnehmbaren Farben
*[CMYK]: Ein subtraktives Farbmodell, das die technische Grundlage für den modernen Vierfarbdruck bildet.
*[CSS]: Zur Definition der Formatierung von HTML-Dokumenten
*[DTP]: Gestaltung von Dokumenten, die aus Texten und Bildern bestehen und später als Publikationen, wie zum Beispiel Broschüren, Magazine, Bücher oder Kataloge, ihre Verwendung finden.
*[HDR]: Bild mit hohem Dynamikumfang
*[HKS]: Basis- und Volltonfarben für Kunstdruck- und Naturpapiere
*[HLC]: Abkürzung für Hue-Lightness-Chroma
*[HSB]: Farbmodell welches eine Farbe mit Hilfe des Farbwerts (Hue), der Farbsättigung (Saturation) und der absoluten Helligkeit (Brightness) definiert.
*[HSL]: Farbmodell welches eine Farbe mit Hilfe des Farbwerts (Hue), der Farbsättigung (Saturation) und der relativen Helligkeit (Lightness) definiert.
*[HUSL]: Vereinfachte Variante von CIELUV
*[ICC]: Internationale Vereinigung von Kozernen zur Vereinheitlichung von Farben
*[LAB]: Siehe CIELAB
*[LCH]: Abkürzung für Lightness-Chroma-Hue
*[RAL]: Eine normierte Farbtabelle der RAL gGmbH
*[RGB]: Ein additiver Farbraum, der Farbwahrnehmungen durch das additive Mischen dreier Grundfarben (Rot, Grün und Blau) nachbildet. Siehe auch CMYK.
*[SRGB]: Versuch einen Standard-RGB-Farbraum zu schaffen.
*[WCS]: Farbmanagement-Software die in Windows seit Vista verwendet wird.
