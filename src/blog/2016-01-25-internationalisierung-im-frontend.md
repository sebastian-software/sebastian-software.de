---
layout: post
title: "Internationalisierung im Frontend"
date: 2016-01-27 14:10:00 +0200
tags: Lokalisierung Internationalisierung CLDR Übersetzung Sprache
author: werner
signup: true
---

Die Internationalisierung ist immer wieder ein großes Thema in Software-Projekten. Heutzutage wandern verstärkt Teile des Backends ins Frontend. Für moderne Single Page Applications (SPA) muss hier seitens der Framework-Technologie überlegt werden, wie man am Besten mit der Übersetzung bzw. dem größeren Thema der Internationalisierung — von der die reine Übersetzung nur ein Teilaspekt ist — umgeht. Es gab hier in Vergangenheit vielfältige Entwicklungen, die aber oft nicht ausgereift sind. Ich möchte versuchen einen Überblick zu geben.

<!--mehr-->

<figure>
  {% image "posts/i18n/shutterstock_228803698.png" alt:"Internationalisierung Globus" %}
</figure>

## Bereiche der Internationalisierung

Mit dem Begriff der Internationalisierung fassen wir die Übersetzung von Texten aber auch die Anpassung an andere Länder und Kulturen in einen handlichen Begriff zusammen. Übersetzung hat man in den Anfängen der Software-Entwicklung sehr trivial unterstützt. Es wurden einfache `1:1`-Mappings genutzt, die den Original-Text übersetzten. Dann wurde dieser Text im Quelltext über eine ID bzw. den meist englischsprachigen Originaltext verwiesen. Problem hierbei ist, dass die Übersetzung nicht ganz so trivial ist. So gibt es zum Beispiel folgende "Details", die man beachten sollte:

- **Platzhalter** im Text für dynamische Werte aus der Anwendung
- **Plural-Regeln** der individuellen Regionen und Sprachen müssen berücksichtigt werden. Es gibt Länder mit mehr als nur Singular und Plural - dort gibt es mehrere Gruppen von Formulierungen je nach der auszudrückenden Anzahl - im arabischen z.B. 6 an der Zahl.
- **Gender-Unterstützung** - wir wollen den Nutzer ja möglichst passend und höflich ansprechen. Dazu gehört dann auch das Geschlecht.

Es gibt auch [ein paar gute, englischsprachige Slides von Google](https://docs.google.com/presentation/d/1ZyN8-0VXmod5hbHveq-M1AeQ61Ga3BmVuahZjbmbBxo/pub?) zu dem Thema.



## Übersetzungs-Technologien

- **ICU**: Das aktuell leistungsstärkste Format. Hier verpackt man die Logik zur Übersetzung mit in den Überset­zungs­text. Dies reduziert die Menge an Doppeldefinitionen in der Übersetzung. Gleichzeitig läuft ICU in Gefahr, dass die Erstellung der Übersetzung nicht so trivial ist wie bei einfachen Key-Value-Paaren. [MacOS und iOS nutzen das XLIFF-Format](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LocalizingYourApp/LocalizingYourApp.html) für die Übersetzung mittels ICU. Gibt's zum Beispiel auch [von IBM für Java-Entwickler](http://icu-project.org/apiref/icu4j/com/ibm/icu/text/MessageFormat.html).

<figure>
  {% image "posts/i18n/icu-message-format.png" alt:"Textauszeichnung mit ICU" %}
  <figcaption>Das ICU-Format nutzt speziell formatierte Ausdrücke innerhalb der Übersetzung für die Logikteile.</figcaption>
</figure>
{: .sidecaption }

- **Gettext**: Älteres Format, welches noch oft im OpenSource-Bereich verwendet wird. Es handelt sich um [eine Entwicklung der Free Software Foundation](https://www.gnu.org/software/gettext/). Leider verfügt Gettext über keine Gender-Unterstützung und nur reduzierte Plural-Unterstützung (im Vergleich zu ICU nur eine Plural-Logik pro Text) lassen es aktuell als weniger sinnvoll einsetzbaren Kandidaten erscheinen.
- **Eigene XML- bzw. Text-Dateien**: Android scheint auf ein [XML-basiertes triviales Key-Value-System](http://developer.android.com/training/basics/supporting-devices/languages.html) aufzusetzen. Von Gender-Unterstützung wird leider nichts gesagt. Plural-Unterstützung gibt es mit den sogenannten [Quantity Strings](http://developer.android.com/guide/topics/resources/string-resource.html#Plurals). In der alten Java-Welt gibt es Property-Files - auch in einem XML-Dialekt.


## Lokalisierungsdaten

Es gibt hier eigentlich nur einen Spieler und zwar das sogenannte [CLDR-Archiv des Unicode-Konsortiums](http://cldr.unicode.org/). Die dort gesammelten Daten werden von allen großen IT-Unternehmen wie Apple, Google, Microsoft und IBM genutzt.

Enthalten ist in diesem Repository z.B. folgendes:

- **Daten für die Formatierung und das Parsen** von Zahlen, Währungen, Datumswerten, Zeiten und Zeitzonen.
- **Übersetzung von feststehenden Namen** für Sprachen, Länder, Regionen, Währungen, Wochentagen, Einheiten und mehr
- **Informationen zur Sprache**: Plural-Formen, Geschlechter, Regeln für Sortierung und Suche, Laufrichtung der Schrift, etc.
- **Länderinformationen**: Telefonnummern, Währungen, Kalender-Formate, Tastaturlayouts, etc.

<figure>
  {% image "posts/i18n/unicode.png" alt:"Unicode Projekt" %}
  <figcaption>Das Unicode Projekt beherbergt auch das Archiv Common Locale Data Repository (CLDR).</figcaption>
</figure>
{: .sidecaption }

Wie man sieht ist dies eine ganze Menge. Es macht also unbedingt Sinn diese mühevoll gesammelten und gepflegten Daten für eigene Anwendungen zu nutzen.

Für das Frontend besteht durch [den Übergang zu JSON als Ausgangsformat](http://cldr.unicode.org/index/json-format-data) hier im Prinzip eine einfache Möglichkeit zur Nutzung dieser Daten. Leider stellt sich im Detail dann raus, dass die Daten oft ungünstig strukturiert (z.B. gibt es die Namen der Jahrzehnte des indischen Kalenders auch im Deutschen Datenbestand) sind und es daher oft erforderlich erscheint die Daten für eigene Zwecke neu zusammenzustellen bzw. zu reduzieren.

Glücklicherweise gibt es mittlerweile die gleichen Daten auch auf Github und in NPM. Dort aber besser strukturiert. [Details dazu finden sich hier im README](https://github.com/unicode-cldr/cldr-json).


## Optionen im Frontend

Dieses hier ist jetzt keine Liste mit Anspruch auf Vollständigkeit. Dazu ist die Frontend-Landschaft viel zu diffus. Es handelt sich vielmehr um eine Liste der fundamentalen Technologien. Die hier genannten Lösungen machen einen etablierten Eindruck und werden auch oft tief in Frameworks versteckt als Basis-Technologie verwendet:


### Intl

Die neue [Standard-API, die in modernen Browsern verbaut ist](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl). Enthält aktuell nur Funktionalitäten zur Formatierung von Datumswerten und Zahlen. Interessanterweise sind nicht mal die passenden Parser an Board. Weiterhin gibt es Möglichkeiten Strings sprachspezifisch zu vergleichen. Aufgrund der großen Datenmenge ist dies aber nicht im [sonst umfangreichen Polyfill](https://github.com/andyearnshaw/Intl.js/) möglich (notwendig für aktuelle Versionen von Safari + alte Versionen von Internet Explorer (vor Version 11), Chrome (vor Version 24) und Firefox (vor Version 29).

Während die Browser zumindest die für den Nutzer relevante Sprache in der nativen API mitbringen sollten, kann dies für den Polyfill aufwendiger sein. So ist zum Beispiel allein die Deutsche Übersetzung aktuell [rund 75KB gross](https://github.com/andyearnshaw/Intl.js/blob/master/locale-data/json/de.json). Vieles was enthalten ist, ist für die meisten Nutzer eher wenig relevant (indische Kalender, etc.). Eine Beschränkung — zumindest für die meisten Locales — auf den [Gregorianischen Kalender](https://de.wikipedia.org/wiki/Gregorianischer_Kalender) wäre sicher zweckmäßiger.

Für die Nutzung wird das Paket [cldr-core](https://github.com/unicode-cldr/cldr-core) und weitere Pakete von [CLDR-JSON](https://github.com/unicode-cldr/cldr-json) benötigt. Dieses Projekt hat den großen Vorteil, dass es von John Emmons — einem IBM Mitarbeiter der seit 2005 intensiv im Unicode-Umfeld tätig ist — betreut wird. Interessant ist, im Vergleich zur vorherigen Kritik, dass diese Daten recht fein strukturiert sind und so auch im Frontend-Umfeld Sinn machen würden. Es ist demnach so, dass erst durch die Verarbeitung durch die (Grunt-basierten) Build-Tools vom *IntlPolyfill* die in NPM vorhandenen Daten zusammengelegt und in der Größe unhandlicher werden. Hier wäre für zukünftige Versionen eine Verbesserung wünschenswert.


### Globalize

[jQuery-Projekt für die Globalisierung](https://github.com/jquery/globalize) (vermutlich benutzt man hier Globalisierung um den Projektnamen wiederaufzugreifen). Unterstützt die Formatierung und das Parsen von sowohl Datums als auch Zahlenwerten. Bei Währungen wird nur die Formatierung unterstützt. Soweit man keinen Wert auf die Erkennung der Währung liegt kann man natürlich den Zahlenparser auch als Währungsparser zweckentfremden. Es gibt auch eine Funktionalität zur Formatierung von relativen Datumsinformationen wie z.B. "vor einem Monat". *Globalize* kann als eines der Urgesteine gelten, da es schon seit rund 5 Jahren auf dem Markt ist.

<figure>
  {% image "posts/i18n/globalize-mark-dark.png" alt:"Logo des Globalize Projektes" %}
  <figcaption>Das Globalize-Projekt ist Teil der jQuery-Community.</figcaption>
</figure>
{: .sidecaption }

Im Rahmen der Entwicklung von *Globalize* sind einige weitere Tools zum Umgang (Download + Prozessierung) mit *CLDR*-Daten entstanden (nachdem man von eigenen Daten gewechselt ist). *Globalize* liefert die *CLDR*-Daten nicht mit, aber kommt mit einer Armee von Abhängigkeiten z.B. dem [*CLDR*-Daten-Downloader](https://github.com/rxaviers/cldr-data-downloader). Hier muss jeder Entwickler neben der Installation des Paketes im Anschluss auch die notwendigen *CLDR*-Daten via Kommandozeile downloaden. Man kann so natürlich gewährleisten dort immer den aktuellen Stand zu besitzen - soweit die Entwickler daran denken auch immer alles fleissig zu updaten.

Die Daten, die im Paket mit *Globalize* geladen werden, sind noch größer, als die vom *Intl Polyfill*. Hier ist allein die Liste der Währungen über 70KB. Diese Mengen an Daten sind im Umfeld von *NodeJS* vielleicht okay. Im Frontend-Umfeld ist diese Datenmenge definitiv problematisch. Natürlich gibt es Bilder, die größer sind - der elementare Unterschied bei JSON-Datenstrukturen ist, dass diese Daten durch den JavaScript-Parser laufen und nicht so klein (im Speicher) bleiben wie die eigentlich Dateigröße suggerieren würde.


### FormatJS

[FormatJS](http://formatjs.io/) ist eine auf *Intl* aufsetzende Schicht mit zusätzlichen Funktionen zur Formatierung von relativen Zeiten und ein *ICU*-kompatibles Message-Format. Hauptaugenmerk liegt auf der Integration der verschiedenen Features mit Frameworks wie React, Amber und Templating-Libraries wie Handlebars oder Dust. Weiterhin kommt eine recht interessante Funktionalität eines sogenannten Format-Caches, welches die Neuverarbeitung von Ausdrücken reduziert und somit für die Ausführungsgeschwindigkeit zuträglich ist. FormatJS nutzt eine Weiterentwicklung von [Messageformat.js](https://github.com/SlexAxton/messageformat.js/) des *ICU* Messageformats in JavaScript.

<figure>
  {% image "posts/i18n/formatjs-logo.png" alt:"Logo des FormatJS Projektes" %}
  <figcaption>Das FormatJS-Projekt wurde von Yahoo als OpenSource veröffentlicht.</figcaption>
</figure>
{: .sidecaption }

Während Globalize für sich allein stehend, unabhängig von *Intl* funktioniert, erfordert [FormatJS](http://formatjs.io/) die Existenz der API bzw. des [Polyfills](https://github.com/andyearnshaw/Intl.js/). [FormatJS](http://formatjs.io/) ist eine Entwicklung von Yahoo. Was im Prinzip erstmal gut klingt ist bei genauerer Betrachtung leider nicht ganz so positiv, da der Footer der Webseite suggeriert, dass diese Library seit 2014 keine größeren Updates mehr erhalten hat.

*FormatJS* kommt weitestgehend mit den Daten von *Intl* bzw. dem *Intl Polyfill* aus. Das MessageFormat benötigt weiterhin eine `pluralRuleFunction` pro Sprache. Das relative Formatieren von Datum/Zeit benötigt eine zusätzliche Datenstruktur vom *CLDR*-Bestand. Diese umfassen aber je nach Sprache nur rund 2KB. Das ist im Vergleich zu den anderen genannten Werten geradezu wenig. Die Daten liegen im Projekt `intl-relativeformat` offline vor (soweit dieses über das NPM-Paket installiert wird). Leider sind diese Pakete nur in Form von JSONP-ähnlichen Daten vorhanden, die sich automatisch an das globale `IntlRelativeFormat` binden. Dieses Vorgehen ist aber für moderne ES2015(ES6)-Buildprozesse eher hinderlich, da auf diesen Wege die Daten nicht einfach integriert werden können. Die Daten sind aber eigentlich in dem [CLDR-JSON](https://github.com/unicode-cldr/cldr-json)-Paket auch feingranularer vorhanden. Hier wäre es sinnvoll sich eine bessere ES2015(ES6)-konforme Integration zu überlegen. Die Daten werden durch das Yahoo eigene Tool [formatjs-extract-cldr-data](https://github.com/yahoo/formatjs-extract-cldr-data) zusammengestellt. Evtl. kann dieses in Zukunft entsprechend verbessert werden.



## Zusammenfassung

Zusammengefasst könnte man die Entscheidung zum Einsatz der Technologie wie folgt vereinfachen:

- **Übersetzung von Texten**: MessageFormat/ICU
- **Datumsformatierung**: natives Intl-Objekt bzw. Polyfill
- **Zahlenformatierung**: natives Intl-Objekt bzw. Polyfill
- **Formatierung relative Datumswerte**: FormatJS oder Globalize
- **Parsen von Zahlen**: Globalize oder eigene Lösung
- **Parsen von Währungen**: eigene Lösung
- **Parsen von Datum/Zeit**: eigene Lösung



## Einfache Textübersetzungslösungen

Ein kleine Liste von einzelnen Libraries für die Übersetzung von Texten:

- [messageformat.js](https://github.com/SlexAxton/messageformat.js): ICU MessageFormat für JavaScript - i18n Plural und Gender Varianten werden unterstützt
- [Jed](http://slexaxton.github.io/Jed/): Gleicher Autor wie MessageFormatJS - aber diesmal mit Gettext statt ICU als Basis/Inspiration
- [polyglot.js](http://airbnb.io/polyglot.js): Von Airbnb entwickelte einfache Lösung (Keine Abhängigkeiten) zur Übersetzung. Enthält hard-coded die Pluralization-Rules für aktuell 7 Varianten (mit rund 30 Sprachen).


## Spezielle Bibiliotheken

- [MomentJS](http://momentjs.com/): Bibiliothek zur Arbeit mit Datumswerten z.B. die einfache Berechnung sowie deren Formatierung. Die Locales werden als seperate JavaScript-Dateien via NPM/GitHub mit ausgeliefert. Die Daten werden scheinbar manuell von Autoren gepflegt und basieren nicht auf *CLDR*-Daten. (Es gab dazu mal einen Versuch - der aber nach zwei Jahren Inaktivität wohl als gescheitert betrachtet werden muss.) Man kann aber auch via *Grunt* einen eigenen Build mit den benötigten Locales bauen.
- [Moment Timezones](http://momentjs.com/timezone/): Bibilothek zur Arbeit mit Zeitzonen.


## (MVC-)Framework-Lösungen für i18n/l10n

Hier noch eine kleine Liste von Framework-spezifischen Übersetzungs- und Lokalisierungslösungen:

- [ember-i18n](https://github.com/jamesarosen/ember-i18n): Einfache Übersetzungslösung für Ember. Nur Messages mit Plural-Regeln vom CLDR.
- [ember-intl](https://github.com/yahoo/ember-intl) - Internationalisierung für Ember mittels FormatJS.
- [react-intl](https://github.com/yahoo/react-intl): Meist genutzt Lösung für React wie es scheint
- [i18n-msg](https://github.com/ebidel/i18n-msg): Ein Custom-Element für Polymer zur Übersetzung von Texten
- [angular-i18n](https://docs.angularjs.org/guide/i18n): Dokumentation zur einbauten Lokalisierung in Angular. Formatierung für Zahlen, Datum und Geldwerte. Pluralformen und Genderformen werden unterstützt.
- [angular-translate](https://angular-translate.github.io/): AngularJS module with support of i18n and l10n including lazy loading and pluralization.


## Links / Ressourcen

- [Lesenswerte Übersicht von Lokalisierungslösungen](http://rxaviers.github.io/javascript-globalization/)
