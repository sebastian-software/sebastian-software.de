---
layout: post
title: "Referrer Spam - Wie wir die Referrer-Müllhalde in Google Analytics vermeiden"
date: 2015-08-20 15:10:00 +0200
tags: Analytics Referrer Spam Google SEO Filter Blacklist
author: werner
signup: true
---

<figure>
  {% image "posts/referrer/reporting-original.png" alt:"Original-Report in Google Analytics ohne Filter" %}
  <figcaption>Das Original-Reporting sieht erst mal nicht direkt verdächtig aus. Normale Schwankungen könnte man denken.</figcaption>
</figure>

Mit dem Aufsetzen einer Homepage gibt es recht überraschend immer wieder neue Tätigkeitsfelder. So kam es auch für uns. Wir wurden recht spontan auf ein Phänomen aufmerksam welches Wikipedia unter dem Begriff [Referrer-Spam](https://de.wikipedia.org/wiki/Referrer-Spam) beschreibt: In *[Google Analytics](http://www.google.com/analytics/)* gibt es jede Menge Traffic, aber vieles, wenn nicht sogar der größte Teil, davon scheint nicht von Menschen sondern von sogenannten Spam-Bots zu kommen.

<!--mehr-->

<blockquote>
  Gefährlich ist Referrer-Spam in der Regel nicht. Lästig ist er aber trotzdem, denn er verfälscht die Ergebnisse der Webseiten-Analyse und erschwert dadurch unter anderem die SEO-Optimierung.
  <footer><a href="http://www.netz24.biz/2014/12/aerger-mit-referral-spam-bei-google-analytics/">Markus Siek, Netz24.biz</a></footer>
</blockquote>

Unserer Überzeugung nach -- damit die Analyse der Besucher überhaupt irgendwie Sinn macht -- muss man im ersten Schritt diese Aufrufe aus den eigenen Statistiken loswerden. Es bringt ja nichts, sich über Erfolge zu freuen die nicht real sind und Besucherzahlen zu Feiern, die nicht der Realität entsprechen.

Uns bleibt bisher verborgen warum Google sich dem Thema nicht direkt selber annimmt. Aber vielleicht gibt es dafür ja Gründe. Auf dem ersten Blick erscheint Referrer-Spam aber nicht viel anders als Spam im Mailboxen: Es geht nur darum, dass jemand auf den Link klickt. Im Falle von Referrer-Spam sind diese Links oft Tools und Lösungen die speziell auf die Bedürfnisse des Webseiten-Anbieters zielen: Einfache Sharing-Funktionen via Buttons, SEO-Analyse und -Optimierung, Spezielle Rabatte für Produkte aber natürlich auch Erwachsenen-Inhalte, etc. In einigen Fällen handelt es sich dabei schlicht um Marketing für eigene Angebote. In den meisten Fällen wird auf echte Shops und Dienste verwiesen, die Prämien/Provisionen für Klicks bzw. die Gewinnung von Neukunden auszahlen.

<blockquote lang="en">
  Spam visits are low engagement, non-converting, high bounce-rate traffic. They skew all "success metrics" downwards.
  <footer><a href="https://brianclifton.com/blog/2015/05/29/removing-referral-spam/">Brian Clifton</a></footer>
</blockquote>
{: .hanging }

## Blocken unerwünschter Zugriffe

Eine erste sinnvolle Idee, wäre das Blocken der Zugriffe direkt im Webserver. Die Idee dabei ist, dass ein Webseiten-Aufruf, der nicht stattfindet auch keine Einträge in der Analyse-Software produziert. [Yong Mook Kim](http://www.mkyong.com/) hat darüber geschrieben wie man [direkt in *NGINX*](http://www.mkyong.com/nginx/nginx-block-referrer-spam/) mit der Analyse des Headers `$http-referer`. Über den [Status-Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) `403`, `405`, etc. kann man dann direkt eine Fehler-Mitteilung an den Aufrufer rausgeben und sich ein weiteres Prozessieren ersparen.


### Basis-Filter mit *NGINX*

```nginx
server{
  # ...

  # Block Referrer SPAM
  if ($http_referer ~* (buttons|free|cheap|porn|semalt|offer|share)) {
    return 405;
  }

  # ...
}
```

In *NGINX* gibt es mittlerweile aber auch ein [Modul *ngx_http_referer_module*](http://wiki.nginx.org/Referrer_Spam_Blocking), welches sich komplett dieser Funktionalität annimmt und in jeder *NGINX*-Installation direkt enthalten ist:

```nginx
location / {
  valid_referers none blocked (buttons|free|cheap|porn|semalt|offer|share);

  if ($invalid_referer) {
    return 405;
  }
}
```

Übrigens ist das Feld `Referer` in der HTTP-Spezifikation (Version 1.0) tatsächlich [falsch geschrieben](https://en.wiktionary.org/wiki/referer). Also wundern Sie sich nicht wegen des einzelnen 'r's in der Wortmitte. In echt heißt es, auch im Englischen, "Referrer".

<blockquote lang="en">
  The spammer is draining your resources, consuming your bandwidth, decreasing your site's performance, and clogging your access and error logs with hundreds or thousands of bogus requests.
  <footer><a href="https://perishablepress.com/4g-ultimate-referrer-blacklist/">Jeff Starr, Perishable Press</a></footer>
</blockquote>
{: .hanging }



### Basis-Filter mit Apache

Eine ähnliche Funktionalität für *Apache* sieht wie folgt aus:

```apache
# Block Referrer SPAM
<IfModule mod_rewrite.c>
  RewriteEngine on
  RewriteCond %{HTTP_REFERER} buttons|free|cheap|porn|semalt|offer|share [NC]
  RewriteRule .* - [F]
</IfModule>
```

Beide Code-Schnipsel müssen in die eigene `sites-enabled/default` bzw `httpd.conf` integriert werden.

Für eine optimale Sicherheit und Performance der eigenen Webseite ist das Sperren von unerwünschten Aufrufen auf jeden Fall eine gute Idee. Statt eigener Listen von bösen Wörtern zu pflegen kann man sich das Ganze aber noch ein wenig einfacher machen.



### Filter mit Blacklisten für Apache

Für einen Großteil der Webseiten, wäre eine der folgenden Listen sicherlich einfacher, als selber alle problematischen Fälle zusammenzutragen:

* [5G Blacklist - Stabil](https://perishablepress.com/5g-blacklist-2013/)
* [6G Blacklist - Beta](https://perishablepress.com/6g-beta/)
* [2013 User-Agent-Blacklist](https://perishablepress.com/2013-user-agent-blacklist/)

<a href="https://perishablepress.com">Jeff Starr von Perishable Press</a> hat sich wirklich über Jahre viel Mühe gemacht um diese Listen zu erstellen und zu warten. Es dürfte der pragmatische Ansatz sein, diese -- zumindest als Basis -- für eigene Filter zu benutzen.

Alle drei Listen sind frei unter der [GPL](https://www.gnu.org/licenses/gpl.html) verfügbar. Alle Blog-Posts zu diesen und vermutlich die Filter selber wurden zuletzt am 03. April 2015 geupdatet. Die ersten beiden sind vollständige Blacklists. Die "6G" verfolgt eine bessere Abdeckung von neuen Spam-Phänomenen - es besteht aber natürlich das Risiko, dass diese auch mehr "gute" Besucher blockt. Wobei man generell bei dem Einsatz von derartigen Blockaden natürlich immer Folgendes im Blick haben sollte:

<blockquote lang="en">
  A perfect firewall would block only bad traffic, but in reality it's inevitable that some good requests get blocked.
  <footer><a href="https://perishablepress.com/6g-beta/">Jeff Starr, Perishable Press</a></footer>
</blockquote>
{: .hanging }

Daher macht es durchaus Sinn die "6G"-Variante zu nutzen und einfach zu beoachten, wie sich der Spam bzw. die Beschwerden entwickeln. Die dritte Liste ist eine kleine Ausnahme und beschränkt sich mehrheitlich auf das Filtern von zugriffen bestimmter User-Agenten. Interessanterweise nutzen die Spammer wohl nur eine begrenzte Zahl von Tools für ihre Aktionen. Der Ansatz User-Agenten zu filtern wäre daher eine Alternative bzw. Ergänzung zu dem konventionelleren Ansatz der "5G"- und "6G"-Listen.

<blockquote lang="en">
  It's one of many ways to improve the security of your site and protect against evil exploits, bad requests, and other nefarious garbage.
  <footer><a href="https://perishablepress.com/5g-blacklist-2013/">Jeff Starr, Perishable Press</a></footer>
</blockquote>
{: .hanging }

Jeder der Listen kann einfach für jeden Apache-Webserver genutzt werden. Hierzu kopiert man die Datei `.htaccess` lediglich in das Stammverzeichnis der eigenen Webseite bzw. fügt es mit der vorherigen Datei zusammen. Das klappt natürlich nur, wenn man nicht direkt in einem sehr günstigen Hosting-Vertrag ist, der keine eigenen `.htaccess`-Dateien erlaubt. Für alle, die vollen Zugriff auf den Webserver haben empfehlen wir eine Integration in die Standard-Konfiguration des Apache.

Für *WordPress*-Nutzer gibt es auch eine Alternative zu dem `.htaccess`-basierten Ansatz...



### Einfache alternative Lösung für WordPress-Blogs

Jeff Starr hat mittlerweile, für die *WordPress*-Nutzer unter Ihnen, auch ein Plugin herausgegeben. <a href="https://wordpress.org/plugins/block-bad-queries/">BBQ</a> schützt vor allen Formen von bösen Requests und Attacken auf *WordPress*. Die Lösung läuft komplett in PHP und kommt ohne Manipulation der `.htaccess` aus.

<blockquote lang="en">
  BBQ checks all incoming traffic and quietly blocks bad requests containing nasty stuff like `eval`, `base64`, and excessively long request-strings. This is a simple yet solid solution that works great for sites where `.htaccess` is not available.
  <footer><a href="https://wordpress.org/plugins/block-bad-queries/">BBQ: Block Bad Queries</a></footer>
</blockquote>
{: .hanging }

Für ambitioniertere *WordPress*-Nutzer erscheint uns die <a href="https://plugin-planet.com/bbq-pro/">Pro-Version von BBQ</a> eine echtes Schnäppchen (nur einmalig $10) zur Absicherung der eigenen Webseite zu sein. Gerade wenn man bedenkt, dass es wirklich schön in *WordPress* integriert ist und alle zukünftigen Updates auch mit enthalten sind.



### PHP-Webseiten fahren mit *ZB Block* gut

Es gibt eine weitere PHP-basierte und kostenlose Alternative zu den Listen bzw. *WordPress*-Plugins von Jeff Starr. [ZB Block](http://www.spambotsecurity.com/zbblock.php) kümmert sich nicht nur um Spam-Zugriffe sondern auch um XSS-Attacken.

Es funktioniert unter anderem mit dieses PHP-basierten Lösungen: *Drupal*,
*phpBB*, *VBulletin*, *Joomla*, *WordPress*, *CodeIgniter*, ...



### Blacklisten für *NGINX*-Nutzer nur nach Konvertierung

Leider haben wir bisher keine vergleichbare Lösung zu den Blacklisten von Jeff Starr für NGINX gefunden. Glücklicherweise sind diese aber recht einfach strukturiert und lassen sich gut - zumindest mit ein wenig Nacharbeit - für NGINX aufbereiten. Eine dieser Lösungen zur Konvertierung von Apache-Konfigurationen nach NGINX ist daher vermutlich für Sie interessant:

* [htaccess-Konverter von Timme Hosting](https://timmehosting.de/htaccess-converter)
* [Alternativer Webservice von Alexei Shabalin](http://winginx.com/en/htaccess)
* [Apache2NGINX - Ein Kommandozeilen-Tool](https://github.com/nhnc-nginx/apache2nginx)




### Referer filtern mit *NGINX* mit Map-Modul

Eine weitere schöne Alternative für *NGINX* ist die Nutzung des Moduls *ngx_http_map_module* (Teil der Standard-Distribution von *NGINX*) die von [Justas Azna](http://fadeit.dk/blog/post/nginx-referer-spam-blacklist) vorgeschlagen wurde.

```nginx
# /etc/nginx/blacklist.conf

map $http_referer $bad_referer {
    hostnames;

    # Standard-Wert toleriert die Abfrage
    default                  0;

    # Wenn etwas aus dieser Liste matcht
    # wird $bad_referer "wahr"
    "~social-buttons.com"    1;
    "~semalt.com"            1;
    "~hulfingtonpost.com"    1;

    # Die Liste kann z.B. aus den Daten von Piwik erstellt werden:
    # https://github.com/piwik/referrer-spam-blacklist

    # ...
}
```

```nginx
# /etc/nginx/nginx.conf

http {
  # ...

  include blacklist.conf;

  # ...
}
```

```
# /etc/nginx/sites-enabled/mysite.conf

server {
  # ...

  if ($bad_referer) {
    return 444;
  }

  # ...
}
```


## Aufräumen in *Google Analytics*

Performance und Sicherheit profitieren nach dem Anwenden der vorher genannten Schritte auf jeden Fall. Leider sind diese Schritte nicht 100%-ig ausreichend bei den typischen Attacken auf *Google Analytics*.

<blockquote>
  Angegriffen wird dabei nicht Ihre Website, sondern Ihr <em>Google Analytics</em>-Konto.
  <footer><a href="http://www.netz24.biz/2014/12/schluss-mit-dem-referral-spam/">Markus Siek, Netz24.biz</a></footer>
</blockquote>
{: .hanging }

Auch Tom Capper hat schon festgestellt, das selbst Profile Log-Inhalte erhalten, die auf gar keiner Homepage verwendet werden:

<blockquote lang="en">
  I can only assume the spammers are randomly cycling through possible tracking IDs.
  <footer><a href="https://www.distilled.net/resources/quick-fix-for-referral-spam-in-google-analytics/">Tom Capper</a></footer>
</blockquote>
{: .hanging }

Man muss daher -- um klare Ergebnisse zu erhalten -- direkt in *Google Analytics* einen Filter einbauen.

<figure>
  {% image "posts/referrer/home-with-two-views.png" alt:"Startseite Google Analytics" %}
  <figcaption>Die Startseite von Google Analytics mit den angelegten Views im Überblick.</figcaption>
</figure>
{: .sidecaption }

Und das macht man am besten über einen neuen View. So bewahrt man immer die Originaldaten und kann im Zweifelsfall immer nochmal ein Blick dort hinein werfen.

<figure>
  {% image "posts/referrer/admin-overview.png" alt:"Überblick Admin-Bereich" %}
  <figcaption>Überblick des Admin-Bereichs in Google Analytics. Markiert sehen Sie direkt unseren jetzigen Arbeitsbereich: *View Settings*</figcaption>
</figure>
{: .sidecaption }

<figure>
  {% image "posts/referrer/view-settings.png" alt:"Einstellungen des Standard-Views" %}
  <figcaption>Hier sieht man die Einstellungen von unserem Standard-View "Alle Websitedaten". Hier sollten alle Filter deaktiviert bleiben, damit die Original-Daten erhalten bleiben.</figcaption>
</figure>
{: .sidecaption }




### Basis-Konfiguration

Ein erster logischer und einfacher Schritt sollte sein, die Option in den Einstellungen der Datenansicht zu ändern. Das Ganze ist etwas versteckt, aber mittels den Screenshots hier dürfte es auffindbar werden:

<figure>
  {% image "posts/referrer/view-settings-botfilter.png" alt:"View Einstellung mit Option zum Filtern von Bots" %}
  <figcaption>Das Leben kann so einfach sein. Einfach die Checkbox anhaken und schon sind Sie zumindest einiges vom Spam los.</figcaption>
</figure>
{: .sidecaption }

<blockquote lang="en">
  This feature will automatically filter all spiders and bots on the IAB/ABC International Spiders &amp; Bots List from your data.
  <footer><a href="http://www.lunametrics.com/blog/2014/08/07/bot-spider-filtering-google-analytics/"> Sayf Sharif, LunaMetrics</a></footer>
</blockquote>
{: .hanging }

Die Datenansicht zu ändern, ändert natürlich nicht die eigentliche Aufzeichnung. Dies ist ein typische Kritikpunkt bei Googles Optionen für *Analytics*. Es bleibt außerdem schleierhaft, warum jemand als Standard überhaupt diese Art von Spam-Bots erfassen wollen würde. Wir jedenfalls nicht. Vielleicht kommt es weil die Option selber [noch relativ neu](https://plus.google.com/+GoogleAnalytics/posts/2tJ79CkfnZk) ist.

Die Verwendung der "Referral Exclusion"-Liste in *Google Analytics* funktioniert übrigens nicht zur Spam-Vermeidung. Der Name würde das zwar suggerieren, aber...

<blockquote lang="en">
  Referrals exclusions list are for modifying how <em>Google Analytics</em> will attribute the visits from those domains, not excluding them.
  <footer><a href="https://brianclifton.com/blog/2015/05/29/removing-referral-spam/comment-page-1/#comment-154360"> David Vallejo</a></footer>
</blockquote>
{: .hanging }

Deshalb widmen wir uns jetzt der richtigen Lösung.


### Filter einrichten

Leider reicht der oben eingerichtete Filter von *Google Analytics* für Bots nicht für viel - er basiert *nur* auf der Erkennung der Software, die den Zugriff macht. Außerdem macht es Sinn fehlerhafte Daten erst gar nicht zu sammeln. Dafür kann man Filter einrichten. Nach einiger Recherche und eigenen Experimenten empfehlen wir folgende drei Filter:

1. Hostname Validierung
2. Bildschirm-Auflösung
3. Referral Quelle

<figure>
  {% image "posts/referrer/view-filters.png" alt:"Filterliste des bereinigten Views" %}
  <figcaption>Unsere 3 Filter für den bereinigten/gefilterten View im Überblick.</figcaption>
</figure>
{: .sidecaption }

### 1. Hostname validieren

Die Validierung des Hostnamens ist trivial und äußerst wirksam. Attacken, die direkt *Google Analytics* betreffen und nicht über die eigentliche Homepage laufen, haben in der Regel keinen oder einen anderen Hostname als die eigentliche Seite. Die Idee ist also alle Log-Anfragen abzuweisen, die nicht den korrekten Hostnamen aufweisen.


### 2. Bildschirm-Auflösung

Die Anfragen, die direkt *Google Analytics* füttern haben in der Regel keine Informationen, die nur bei einem regulären Webseiten-Aufruf stattfinden können. So ist z.B. in der Regel das Feld "Bildschirm-Auflösung" ungesetzt. Diese Lösung haben wir als erstes bei [Tom Capper](https://www.distilled.net/resources/quick-fix-for-referral-spam-in-google-analytics/) entdeckt. Das ganze ist überaus raffiniert da sehr einfach. Weiterhin bedarf es keiner Wartung. Es bietet sich also an, Anfragen zu ignorieren in denen dieses Feld leer ist und damit direkt einen weiteren großen Teil der problematischen Anfragen loszuwerden.


### 3. Referral-Quelle untersuchen

Im Referral findet man in Spam-Anfragen oft immer die gleichen Wörter: `free`, `cheap`, `webmaster`, ... sind recht typisch. Seiten, die von einer Domain kommen, die diese Wörter enthalten will man in der Regel blockieren.

Mit dem [Spam Filter Installer](http://www.simoahava.com/spamfilter/) gibt es übrigens ein Tool für die automatische "Installation" von Filter-Regeln in *Google Analytics*. Dies geschieht über eine Autorisierung des Tools bei *Google*. Wem das nicht geheuer ist, der sollte es wohl lieber manuell machen. Für alle anderen stellt dies eine bequeme Methode dar, die Listen der Referral-Quellen nicht händisch anzulegen und zu pflegen.

Eine gute Basis für einen Filter (Feld: "Campaign Source") wäre beispielsweise die Liste von <a href="http://blog.raventools.com/stop-referrer-spam/">Jon Henshaw</a>:

```
darodar\.|semalt\.|buttons-for-website|blackhatworth|ilovevitaly|prodvigator|cenokos\.|ranksonic\.|adcash\.|simple-share-buttons\.|social-buttons\.
```

Es gibt aber auch hier wieder öffentliche und gepflegte Listen wie z.B. [diese hier vom Piwik Analyse Tool](https://github.com/piwik/referrer-spam-blacklist). Wer Interesse hat: *Piwik* wäre an sich für viele auch eine gute Alternative zu *Google Analytics* - zumindest wenn man nicht auch Werbung über Google macht. In dem Fall ist wohl *Google Analytics* unerlässlich damit man alle Erfolge und zukünftige Potentiale der geschalteten Werbung auch direkt in der Analyse-Software sehen kann.


### Wirkt leider nur für neue Daten

<figure>
  {% image "posts/referrer/reporting-filtered.png" alt:"Die Ansicht des Reports vom neuem gefiltertem View" %}
  <figcaption>Der neue gefilterte View im Einsatz. Da dieser erst in Zukunft Daten erhält ist er bisher noch völlig leer.</figcaption>
</figure>
{: .sidecaption }

Bitte bedenken Sie noch:

- Filter brauchen bis zu 24 Stunden, bis diese auf die neu reinkommenden Daten angewendet werden.
- Sie wirken nur für neu hinzukommende Daten - die alten Zahlen sind daher immer noch falsch.
- Wenn Filter auf dem Hauptview angewendet werden, sind die betroffenen Einträge für immer weg.

Im Idealfall schauen Sie jetzt noch wie Sie die bisherigen Daten aufräumen...



### Aufräumen historischer Daten

Man kann übrigens die Statistik in *Google Analytics* leider nicht resetten: Stattdessen [dupliziert man am besten das Profil](https://productforums.google.com/forum/#!topic/analytics/nfZFLdYQ9ck) und nutzt dieses in Zukunft für neue Einträge. Dazu muss man natürlich die Tracking-ID auch im Client-seitigen Code der Homepage auf den neuen Wert anpassen. Wir halten es aber für genauso praktikabel die historischen Daten mit einfacheren Mitteln leicht zu bereinigen. Das geht am besten über Segmente. Ein Segment dient dazu nur einen Teil der gesammelten Daten in den Views anzuzeigen. Das kann man auch dazu nutzen ein Spam-Filter umzusetzen. Und zwar so:

Gehen Sie zurück in den Admin-Bereich. Dort klicken Sie innerhalb des linken Bereichs auf "Segments". Sie bekommen eine noch leere Liste von Segmenten... wir wollen aber das hier sehen:

<figure>
  {% image "posts/referrer/segment-ueberblick.png" alt:"Segment-Überblick mit neu angelegtem Segment" %}
  <figcaption>Das Segment "Bereinigt" hilft dabei auch in den historischen Daten einen reinen Überblick zu gewinnen.</figcaption>
</figure>
{: .sidecaption }

Klicken Sie auf "New Segment" und legen Sie das Segment "Bereinigt" mit folgenden Daten an:

<figure>
  {% image "posts/referrer/bereinigte-segmente-einrichten.png" alt:"Einstellungen des bereinigten Segments" %}
  <figcaption>Die Einstellungen unseres gefilterten Segments beschränken sich auf die Überprüfung des Hostnames und der Bildschirmauflösung. Wir wollten die Liste von problematischen Referrern nicht doppelt und dreifach pflegen. Das Segment dient ja auch nur dazu historische Daten vom schlimmsten Ballast zu befreien.</figcaption>
</figure>
{: .sidecaption }

Zurück in dem Reporting des Original-Views können Sie nun einfach das Segment "Bereinigt" hinzufügen...

<figure>
  {% image "posts/referrer/reporting-original-segment-hinzufuegen.png" alt:"Segment-Auswähler für Original-View" %}
  <figcaption>Hier fügen wir das neu angelegte Segment unserem bestehenden View hinzu um historische Webseitendaten gefiltert zu betrachten.</figcaption>
</figure>
{: .sidecaption }

Und hier sehen Sie das Ergebnis der Mühe - eine schöne bereinigte Statistik. Sehr eindrucksvoll im Vergleich zum Original in blau:

<figure>
  {% image "posts/referrer/reporting-original-mit-segment.png" alt:"Original-Report mit filternden Segment im Vergleich" %}
  <figcaption>Historische Daten im Überblick mit aktivierten gefilterten Segment im Vergleich zu den Originaldaten. Was auffällt: Die Kurven fallen weit gleichmäßiger und weniger spitz aus.</figcaption>
</figure>
{: .sidecaption }

Wenn Sie es bis hierher geschafft haben, gibt es nun vermutlich eine Webseite mehr, die über brauchbarere Statistiken verfügt.

Wir sind immer dran an weiteren Themen. Verpassen Sie nichts: Melden Sie sich jetzt zu unserem Newsletter an.
