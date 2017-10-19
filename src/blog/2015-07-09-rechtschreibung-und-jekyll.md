---
layout: post
title: "Rechtschreibung mit Hunspell und Jekyll"
date: 2015-07-09 9:35:32 +0200
tags: Jekyll Rechtschreibung Hunspell
author: werner
signup: true
---

Wer es mit Jekyll ernst meint wird wohl früher oder später feststellen, dass es gar nicht so einfach ist, in dem System mit typischen Redaktionstools zu arbeiten. Die meisten werden einen einfachen Text-Editor wie Sublime Text benutzen, in dem eine Rechtschreibprüfung wie in Word, nicht mal eben eingebaut ist. Wir dachten uns daher, ob man dies nicht besser sei, dies unabhängig vom Redakteur und seinem eigenen System auch lösen kann. Jede Homepage soll mit einem Wörterbuch kommen und eine eingebaute Rechtschreibprüfung besitzen.

<!--mehr-->

Und ja es geht. Innerhalb der typischen Unix-Kommandozeilen-Tools gab es schon lange eine Rechtschreibkontrolle mit dem Namen [Ispell](http://www.gnu.org/software/ispell/) von 2006. Dann kam [Aspell](http://aspell.net/) - welches seit 2011 nicht mehr weiterentwickelt wird. Aktuell ist wohl [Hunspell](http://hunspell.sourceforge.net/) die Wahl unter den Rechtschreibtools. Auch in der Unix-Welt gibt es also stetige Weiterentwicklung. Hunspell steckt wohl beinahe überall drin. In der OpenOffice-Suite, dem Chrome-Browser und sogar in Mac OS.



## Hunspell installieren

Die aktuelle Version von Hunspell kann man am einfachsten via [Homebrew](http://brew.sh) auf dem Mac installieren.

```bash
brew install hunspell
```

Im Gegensatz zu Aspell gibt es bei Homebrew aber keine Wörterbücher zur direkten Installation via Homebrew. Diese werden nämlich außerhalb der typischen Homebrew-Verzeichnisse systemweit in `/Library/Spelling/` oder im Nutzerverzeichnis `~/Library/Spelling/` installiert.

Es ist empfehlenswert auch noch Python 3 zu installieren, da wir dieses im folgenden Ablauf noch benötigen:

```bash
brew install python3
```


## Wörterbücher beziehen

Aktuelle Wörterbücher gibt es z.B. bei:

- [Mozilla](https://addons.mozilla.org/de-DE/firefox/language-tools)
- [OpenOffice](http://extensions.services.openoffice.org/de/dictionaries)

Beide Dateien sind im Prinzip ZIP-Dateien und lassen sich über normale Archivprogramme entpacken. Dafür ist es unter Umständen notwendig die Endungen nach `.zip` anzupassen. Die relevanten Dateien findet man dann in:

- Mozilla: `dictionaries/de-DE.aff` und `dictionaries/de-DE.dic`
- OpenOffice: `de_DE_frami/de_DE_frami.aff` und `de_DE_frami/de_DE_frami.dic`

Das Wörterbuch von OpenOffice ist weit größer und enthält zusätzlich auch die Datenbanken für Thesaurus und Silbentrennung. Beides ist für Hunspell jetzt nicht direkt sinnvoll nutzbar und somit eher in der Office-Suite relevant.

Das heruntergeladene Wörterbuch muss dann in das entsprechende Spelling-Verzeichnis als `~/Library/Spelling/de_DE.dic` und `~/Library/Spelling/de_DE.aff` oder alternativ in das entsprechende systemweite Verzeichnis kopiert werden.


## Rechtschreibung mit Jekyll verbinden

Um die Rechtschreibung zu überprüfen macht es Sinn, die Seiten über den normalen Ablauf in Jekyll zu generieren und dann die resultierenden Seiten zu testen. Das hat nämlich den Vorteil, dass man die Inhalte in der gleichen Form überprüfen kann, wie sie später auch die Besucher sehen können. Dafür kann man ein schnelles Shell-Skript `tools/check-spelling.sh` benutzen:

<script src="https://gist.github.com/swernerx/309b7122e6e0cd8f355c.js"></script>

Der letzte Block ist etwas komplizierter. Er löst folgende Punkte:

1. Er wandelt mit einem Python-Skript die HTML-Inhalte in puren Text um.
2. Er überprüft parallel in sowohl Deutsch als auch US-Englisch und erlaubt so auch eine Vielzahl typischer [Denglischer-Ausdrücke](https://de.wikipedia.org/wiki/Denglisch) und gemischte Sprachen innerhalb von Seiten (sinnvoll z.B. für Zitate, Auszüge, etc.). Dafür müssen natürlich beide Sprachdateien installiert worden sein.
3. Es fügt ein eigenes Wörterbuch hinzu, welches direkt im Jekyll-Ordner liegt. Dies kann relevant sein um z.B. eigene Fachbegriffe hinzuzufügen.
4. Es führt Hunspell im nicht interaktiven Modus aus und sortiert und normalisiert die Ausgabe im Anschluss um doppelte Falschschreibweisen zu ignorieren und die Übersichtlichkeit zu wahren.

Das `plaintext.py`-Skript findet man bei Github:

<script src="https://gist.github.com/swernerx/4eca15dc6012044c848b.js"></script>



## Installation

- Die Ordner `tools` und `tools/dict` anlegen.
- Unterhalb des Ordners `tools/dict` eine Datei `custom.txt` mit eigenen Wörtern pflegen. Ein Wort pro Zeile.
- Die Skripte `check-spelling.sh` und `plaintext.py` im `tools`-Ordner ablegen und ausführbar machen.


## Benutzung

Im Anschluss an die Installation sollte die Ausführung von `tools/check-spelling.sh` ein Resultat wie dieses hier produzieren:

```
>>> Preparing custom dictionary...
>>> Cleaning up old files...
>>> Building jekyll files...
Configuration file: /Users/Sebastian/Workspace/sebastian-software/homepage/_config.yml
            Source: /Users/Sebastian/Workspace/sebastian-software/homepage
       Destination: /Users/Sebastian/Workspace/sebastian-software/homepage/_site
      Generating...
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
>>> Check spelling...
>>> FILE: _site/404/index.html
>>> FILE: _site/50x/index.html
>>> FILE: _site/blog/2015-03/hochmoderne-bahnstadt-mit-schwachem-internet/index.html
   1 Hochgeschwindigkeits
   1 Reaktions
>>> FILE: _site/blog/2015-06/falsche-farben/index.html
   1 Eclairage
   1 Fairchild
   1 Lch
   1 Lindbloom
   1 MacEvoy
   1 colorimetric
   1 emissive
   1 rötlicheres
   1 stretcht
   2 ig
>>> FILE: _site/blog/2015-06/live-einrichtung-mit-unreal-engine/index.html
   2 Wohnungs
>>> FILE: _site/blog/2015-06/sommerlektuere-von-bill-gates/index.html
>>> FILE: _site/blog/2015-07/rechtschreibung-und-jekyll/index.html
   1 Denglischer
   1 Redaktionstools
   1 Skripte
   2 Homebrew
```

Wir nutzen das Skript regelmäßig - auch schon während der Verfassung neuer Artikel. Natürlich ist nicht immer alles was berichtet wird auch korrekturbedürftig. Aber es hilft schnell einen Überblick zu bekommen bei den typischen Tipp-Fehlern. Und nach und nach kann man auch ein Wörterbuch von "erlaubten" Wörtern aufbauen.

Ich hoffe ich habe mit dieser Erklärung dazu beigetragen ein paar mehr Jekyll-basierte Blogs von Rechtschreibfehlern zu befreien. Es handelt sich sicherlich um einen sehr pragmatischen Ansatz, der noch etwas Feinschliff gebrauchen kann.
