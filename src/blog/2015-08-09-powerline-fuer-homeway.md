---
layout: post
title: "Homeway Evolution besser mit Powerline?"
date: 2015-08-09 22:00:00 +0200
tags: Homeway Powerline Multimedia Cat7 FritzBox
author: werner
signup: true
---

Neue Ansätze der Heim-Verkabelung basieren unter anderem auf dem [Homeway System](http://www.homeway.de/die-systeme.html). Über dieses System ist es möglich über eine einheitliche Verkabelung in den Räumen diverse Signale zu transportieren - Internet, Telefon und Fernsehen. Manchmal kann es aber vorkommen, dass selbst das modernste System, Lücken aufweist, die einer Lösung bedürfen.

<figure>
  {% image "posts/homeway/homeway-evolution-kabel.jpg" alt:"Homeway Evolution Kabel" %}
  <figcaption>Ein echtes kleines Kunstwerk dieses Kabel. Jede Menge Abschirmung und Sonderfinessen. Sozusagen ein "Cat7+"-Kabel.</figcaption>
</figure>

<!--mehr-->

In den meisten Fällen befindet sich die so genannte [Homeway-Zentrale](https://www.homeway.de/die-systeme/systemkomponenten/homeway-zentrale.html), dort wo alle Kabel zusammenlaufen, im Abstellraum der Wohnung. Dort wird in der Regel mit einem so genannten Kleinverteiler gearbeitet. Dieser ist durch äußere Einflüsse abgeschirmt und bietet die komfortable Möglichkeit alle Verkabelungen zentral an einer Stelle zu erledigen und umzukonfigurieren.

Leider hat das System auch ein paar Hindernisse:

- eine mögliche Überhitzung der dort einen eingeschlossen Geräte ist nicht ganz auszuschließen
- das DECT- und das WLAN-Signal der {% amazonlink B00EO777DI %}FritzBox{% endamazonlink %} wird durch die Abschirmung natürlich auch beeinträchtigt
- der Platz für einen alternativen Router ist in dem so genannten Kleinverteiler nicht gegeben
- Aus dem gleichen Grund dürfte es schwierig sein, die Server-Funktionalität der {% amazonlink B00EO777DI %}FritzBox{% endamazonlink %} zu nutzen. Platz für Festplatten. Sorry, den gibt es nicht.

<figure>
  {% image "posts/homeway/homeway-kleinverteiler.jpg" alt:"Homeway Kleinverteiler" %}
  <figcaption>So sieht der typische Homeway-Kleinverteiler aus. Nicht viel anders als ein beliebiger Stromkasten.</figcaption>
</figure>

Ich möchte heute eine Lösung mit Ihnen teilen, die meinen Bedürfnissen gerecht wird. Vielleicht hilft diese ja auch Ihnen bzw. inspiriert ein wenig zum querdenken. Meine Lösung begann mit folgender Idee:

- die Verkabelung aller Ethernet-Ports der Wohnung in dem Kleinverteiler mit einem einfachen Gigabit-Switch.
- die Weiterleitung des Signals von dem Glasfasermodem in einen anderen Raum (im Idealfall zum Beispiel ein Büroraum)

<figure>
  {% image "posts/homeway/homeway-verteilerfeld.jpg" alt:"Homeway Verteilerfeld" %}
  <figcaption>Das Verteilerfeld des Homeway-Systems ist die Zentrale bei der alle Anschlussdosen sauber miteinander verbunden werden können. Ich benutze einfache Cat7-Netzwerkkabel für den Anschluss an den Switch. Es gibt aber beispielsweise auch Y-Kabel zur Aufteilung von Ethernet und Telefon.</figcaption>
</figure>

Es gibt leider ein großes Hindernis auf dem Weg zu dieser Lösung zwar: Die interne Hausverkabelung kann für die Weiterleitung des Glasfasermodems nicht verwendet werden. Das würde nur gehen wenn es an (mindestens) einer Stelle in der Wohnung zwei Ethernet-Verbindungen geben würde:

1. Eine Leitung zur Weiterleitung des Signals vom Glasfasermodem
2. Die andere Leitung für das Rückverbindung des Internets (hinter der Firewall) zur Heimverkabelung der restlichen Anschlüsse

<figure>
  {% image "posts/homeway/homeway-anschlussdose.jpg" alt:"Homeway Anschlussdose" %}
  <figcaption>So sieht eine typische 10GBit-Anschlussdose im Homeway-Evolution-System aus. Telefonanschlüsse darf man natürlich nicht brauchen.</figcaption>
</figure>

Leider gibt es bei uns aber nirgendwo zwei Gigabit-Ports. In der Regel wird bei dem [Homeway System](http://www.homeway.de/die-systeme.html) nur eine Anschlussdose pro "Region" der Wohnung installiert. Das wird sicherlich auch in der Form vermarktet, da das System zugegebenermaßen zu sehr viel aufgeräumteren Wänden führt. Im Gegensatz zu früher ist ja bei diesem System wirklich alles in einer Anschlussdose untergebracht.

Eine halbe Alternative wäre noch eine Konfiguration ohne Gigabit-Unterstützung, was dann wieder zwei Leitungen innerhalb einer Anschlussdose erlauben würde, reicht leider nicht, da in dem Fall das Internet potentiell schneller ist, als die Heimverkabelung. Zumindest in unserem Glasfaser-Fall.

<figure>
  {% image "posts/homeway/powerline-adapter-in-zentrale.jpg" alt:"Powerline-Adapter im Einsatz" %}
  <figcaption>Powerline-Adapter von TP Link wie er bei mir in der Homeway-Zentrale verbaut ist. Der Empfänger ist 3 Meter Luftlinie weiter in meinem Büroraum.</figcaption>
</figure>

Die Lösung, die ich jetzt umgesetzt habe, bedarf der Nutzung eines zusätzlichen {% amazonlink B00SWI2UUK %}Powerline-Sets{% endamazonlink %}, welches genutzt wird um das Glasfasermodem Signal in mein Büroraum weiterzuleiten. Das ist Premiere für mich. Ich hatte Powerline bisher nie im Einsatz.

<figure>
  {% image "posts/homeway/fritzbox-7490.jpg" alt:"FritzBox 7490" %}
  <figcaption>Die FritzBox 7490 benutze ich zur Aufteilung des Internets auf den Asus- und den Freifunk-Router und natürlich als DECT-Basisstation. Ich fürchte die FritzBox fühlt sich etwas unterfordert.</figcaption>
</figure>

Ich habe mich für die heute modernste Variante von Powerline entschieden. Diese unterstützt {% amazonlink B00SWI2UUK %}bis zu 1200Mbit/s{% endamazonlink %}. In der Praxis dürfte es eher die Hälfte sein. Trotzdem sollte diese Lösung auch einigen zukünftigen Anpassungen der Tarife unseres Glasfaseranschlusses genügen.

Die Telefone waren übrigens bereits ausschließlich per DECT direkt mit der FritzBox verbunden - hier ist also keine Änderung notwendig bzw. das macht die Idee mit der "Weiterleitung" überhaupt erst denkbar. Wenn man echte Kabeltelefone direkt mit der FritzBox verbinden wollen würde, müsste diese leider im Kleinverteiler verbleiben.

<figure>
  {% image "posts/homeway/mein-innenaufbau-im-kleinverteiler.jpg" alt:"Innenaufbaue Homeway Kleinverteiler" %}
  <figcaption>Mein Aufbau im Innenraum des Homeway-Kleinverteilers. Normalerweise wäre hier unter anderem die FritzBox. Bei mir gibt es nur Glasfasermodem, Switch, Powerline-Adapter und das Homeway-Verteilerfeld. Verhältnismäßig übersichtlich.</figcaption>
</figure>

Mein zugegebenermaßen kompliziertes Setup sieht heute wie folgt aus:

- Ein Glasfasermodem/ONT, welches vom Provider gestellt wird [Kleinverteiler]
- 1GBit taugliches {% amazonlink B00SWI2UUK %}TP-Link Powerline-Set{% endamazonlink %} für die Verkabelung zwischen Glasfasermodem und Büroraum [Kleinverteiler + Büro]
- Einfacher Gigabit-Switch der im Kleinverteiler die verschiedenen Ausgangspunkte des Verteilerfeldes direkt miteinander verbindet [Kleinverteiler]
- Das eigentliche Homeway-System für die interne Verkabelung der verschiedenen Räumen untereinander [Wohnzimmer + Büro + Schlafzimmer]
- {% amazonlink B00EO777DI %}FritzBox 7490{% endamazonlink %} als erster Kontakt für die Powerline-Verbindung zum Glasfasermodem [Büro]
- TP Link-Router für den Freifunk Rhein-Neckar, der direkt an einem Port der {% amazonlink B00EO777DI %}FritzBox{% endamazonlink %} hängt. [Büro]
- Ein moderner {% amazonlink B00XJKH67I %}Asus RT-AC3200 Router{% endamazonlink %}, den ich für die interne Verkabelung und das interne WLAN ausgesucht haben. [Büro]

<figure>
  {% image "posts/homeway/asus-router-rt-ac3200.jpg" alt:"Asus RT-AC3200 Router" %}
  <figcaption>Asus RT-AC3200 Router - unendlich viel Power für einen WLAN-Router mit der vermutlich besten Firmware im Markt. Leider ist aber nicht alles schon ausgereift.</figcaption>
</figure>

Bisher scheint alles tadellos zu funktionieren. Powerline macht auch keine Probleme - ist ja auch eine recht kurze Distanz, die zu überwinden ist.
