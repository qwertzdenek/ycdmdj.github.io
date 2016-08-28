---
layout: post
title:  "Generátor hudby, část třetí"
date:   2016-08-28 15:20:48 +0200
categories: update
---

Vítejte u třetího dílu mého nepravidelného seriálu o generování hudby.
Z předchozí kapitoly umíme generovat smysluplné vícehlasé vzorky.
Nyní je hlavním úkolem pospojovat tyto kusy do smysluplné hudby.

Stejně jako přirozené jazyky, tak hudba je tvořena ze slov (akord, tón),
opakujících se význačných témat a určitou rytmickou strukturou.
Přirozeně tak vznikají závislosti a to někdy dlouhodobé. Kvůli tomu
potřebujeme určitý druh paměti.

Oblíbeným modelem pro stochastické sekvence jsou Markovské modely.
Jejich problém je jak reprezentace vzorků, tak celková omezenost
kreativity. V současné době se chceme přiblížit tomu, jak funguje
náš mozek, a proto přichází na scénu neuronové sítě.

![Rekurentní neuronová síť]({{ site.url }}/assets/rnn.jpg)

Samotné dopředné sítě jsou snad čtenáři známé. Vytvoříme-li v takové 
síti zpětné smyčky se zpožděním, získáme tak temporální model. Každý 
neuron tedy pracuje jak s aktuálním vstupem, tak s vnitřním stavem z 
minulosti. Při rozbalení sítě přes čas tak dostáváme opět dopřednou 
síť. Správným řízením tohoto stavu můžeme uchovávat poznatky z 
minulosti. Již na počátku devadesátých let ukázal *Yoshua Bengio* jaký 
je problém uchovávat dlouho dobu jenom jeden stavový bit a to kvůli 
mizejícím gradientům. Mizející gradienty vznikají stejným způsobem jako 
v hluboké síti jenom s tím rozdílem, že rekurentní síť sdílí své váhy 
přes časové kroky. Aby docházelo k optimalizaci, musí být gradienty 
kontraktivní. To znamená že jsou vlastní čísla (ve skutečnosti 
Jakobián) menší než jedna. Derivace tak jde exponencielně k nule a díky 
tomu ztrácíme dlouhodobé závislosti na úkor těch krátkodobých.

Řešením zmíněných problémů je naštěstí *Long Short-Term Memory* (LSTM). 
Při učení je to tiž třeba občas něco zapomenout aby se uvolnilo místo 
pro nové poznatky. Příkladem z přirozeného jazyka je například v 
češtině změna podmětu ve větě, který ovlivňuje výsledný tvar slov.

![RNN-RBM model]({{ site.url }}/assets/rnnrbm.png)

Spojením těchto zalostí vznikla LSTM-RBM síť. Na předchozím obrázku je 
tak možné nahradit \\(\mathbf{\hat{h}}^{(t)}\\) krabičku například LSTM 
modulem, ale může to být také nové GRU. Paměťový modul se stará o 
dlouhodobé závislosti a RBM podle aktuálního skrytého stavu generuje 
výstupní vzorek v čase \\(t\\). Při trénování Zpětnou propagací v čase 
(BPTT) tak potřebujeme znát celou historii. Výpočet gradientů 
neprobíhá online, ale zpětně. To má důvod čistě výpočetní. Složitost 
výpočtu je mnohem menší, ale zase je potřeba více paměti. Tak to holt v 
programování chodí.

Trénování probíhá v následujících krocích:

*  Spočítej nový skrytý stav \\(\mathbf{\hat{h}}^{(t)}\\),
*  dopočítej parametry RBM z předchozího stavu \\(\mathbf{\hat{h}}^{(t-1)}\\)
   a spusť CD-k (kontrastivní divergence) pro nalezní nového výstupu,
*  z předchozích výsledků a vstupu spočítej gradient logaritmické
   věrohodnosti cenové funkce pro váhy a biasy RBM,
*  propaguj nalezený gradient zpětně v čase.

Při trénování se pro výpočet CD-k vkládá přesný vzorek a při generování
se zapisuje na výstup. 

Zmínil jsem jakousi Kontrastivní divergenci. Na to tento článek nestačí.
Věřte ale tomu, že jde o užitečný algoritmus (založen na metodě
Monte Carlo) jak vůbec něco z RBM v rozumném čase dostat.
