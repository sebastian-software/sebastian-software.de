---
layout: post
title: "Node.js-App als ausführbare Einzeldatei"
date: 2015-07-12 14:00:00 +0200
tags: Nodejs iojs Ausführbar Datei Linker
author: fastner
signup: true
---

<figure>
  {% image "posts/jslinker/chain-257492.jpg" alt:"Chain" %}
</figure>

Unsere Kunden sind immer wieder ein Quell guter Inspirationen. In diesem Fall wollte unser Kunde seine Webseiten aus der Git-Quelle auf dem Server fertig zusammenbauen. Das ist an sich noch nichts besonderes. Doch die Optimierung der HTML-Dateigrößen durch einen HTML-Kompressor gehört heute zum guten Ton der Entwicklung.

<!--mehr-->

In besagtem Projekt wird UglifyJS verwendet. Um nicht Node.js - die Ausführungsumgebung für UglifyJS - auf dem Server installieren zu müssen haben wir [JSLinker](https://github.com/sebastian-software/jslinker) entwickelt.

*JSLinker* baut aus der Node.js-Laufzeitumgebung und einer Node.js-Applikation eine einzelne ausführbare Datei.


## JSLinker installieren

Die Benutzung von *JSLinker* setzt eine installierte Node.js- oder io.js-Umgebung voraus. Danach ist die Installation von *JSLinker* einfach.

```bash
npm install -g jslinker
```

Ab sofort steht der Befehl `jslinker` auf der Kommandozeile zur Verfügung.



## JSLinker benutzen

*JSLinker* kann sowohl lokale Node.js-Applikationen als auch *npm*-Pakete umwandeln. Außerdem muss man sich für die Zielplattform entscheiden.


## JSLinker mit einem npm-Paket verwenden

*JSLinker* verwendet das von dem Paketbetreuer festgelegt Startskript. Dies ist in der `package.json` unter `scripts.start definiert. Ebenfalls wird - ohne weitere Parameter - die aktuelle Plattform als Zielsystem für die ausführbare Datei verwendet.

```bash
jslinker --npm uglify-js
```

Leider hat UglifyJS kein Skript als Startskript definiert. Daher die Fehlermeldung `Error: No start script found, please specify by command line parameter --main`. UglifyJS wird per `bin/uglifyjs` gestartet.

```bash
jslinker --npm uglify-js --main bin/uglifyjs
```

Wenn die Meldung `<name>-<version>-<platform>-<arch> created` erscheint hat alles funktioniert. Diese Datei kann jetzt ausgeführt werden, ohne dass Node.js installiert sein muss.



## JSLinker für eigene Projekte verwenden

*JSLinker* kann auch ohne `--npm` verwendet werden. Dazu muss im aktuellen Verzeichnis eine `package.json` bestehen.

```bash
jslinker
```



## Ausführbare Datei für andere Plattformen bauen

Als Standard baut *jslinker* eine ausführbare Datei für die aktuelle Plattform. Dieses Verhalten kann über Parameter verändert werden. Alle Parameter sind mit `jslinker --help` zu sehen.

```bash
jslinker --engine iojs --version v2.3.1 --platform linux --arch x64
```

Die erstelle ausführbare Datei kann unter Linux auf einer 64-Bit-Architektur ausgeführt werden. Als Laufzeitumgebung wird *io.js* in der Version 2.3.1 verwendet.



## Technischer Hintergrund

Die erstellte ausführbare Datei ist ein kleines Shellskript mit angehängter .tar.gz-Datei. Dieses Archiv wird in ein temporäres Verzeichnis entpackt. In dem Archiv ist sowohl die Node.js-Laufzeitumgebung als auch die Node.js-Anwendung inklusive aller NPM-Abhängigkeiten enthalten. Das Skript gibt alle eigenen Parameter weiter an das definierte Startskript. Nach der Ausführung wird das temporäre Verzeichnis wieder gelöscht.

Für die Ausführung des Shellskripts werden sowohl *tar* inklusive GZip, *awk* als auch *tail* benötigt. Daher kann *jslinker* derzeit nur ausführbare Dateien für Linux und Apple OS X bauen.
