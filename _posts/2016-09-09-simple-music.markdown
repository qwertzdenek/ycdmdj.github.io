---
layout: post
title:  "Proč tak složitě?"
date:   2016-09-9 14:20:48 +0200
categories: update
---

Ve středu jsem byl na premiéře největšího srazu datařu u nás, který se 
jmenoval [#datapiknik][piknik]. Byla to skvělá akce. Při jednom rozhovoru se mě 
někdo zeptal, proč jsem generoval hudbu tak složitě. Stačilo by přece 
mixovat dohromady nějaké hotové vzorky. To je totiž metoda, kterou jsem 
tak trošku odmítnul hned na začátku, jako že na tom nic není.

Sednul jsem si tedy včera večer po delší době k *Javascriptu* a napsal 
jednoduchý [JSMusic][js-music] sequencer. Obsahuje 5 předdefinovaných 
zvuků, které běží současně a ovládám jen jejich hlasitost.
Pravděpodobnost zesílení zvuku je dána jejich aktuální hlasitostí.
Čím hlasitější je, tím je menší pravděpodobnost že se zvýší:

\\[
  p^i_{\mathrm{gain}} = \frac{(1-\mathrm{gain}^i)^2}{\mathrm{count}}
\\]

Tato hodnota se přepočítá pro každý zvuk \\(\mathrm{gain}^i\\). Normování počtem
zvuků může, ale ani nemusí být. Sčítání do jedné to stejně nezaručí.
Z tohoto rozdělení navzorkuji cílový zvuk \\(\mathrm{gain}^I\\), který
bude nejvíce zesílen.

Pro změny hlasitosti jsem použil funkci:

\\[
  \Delta \mathrm{gain}^i = \lambda \frac{2-|i - I|}{2},
\\]

pro \\(\\{i\\}_0^{\mathrm{count}-1}\\). To má za následek, že dva okolní
zvuky se zesílí o polovinu méně a ostaní utlumí. Hodnotu \\(\lambda\\)
jsem volil malou okolo \\(0,05\\). Všechny ostatní věci jsou
z [tutoriálu][webaudio] o Web Audio API z HTML5.

Tímto se otvírají nové možnosti. Stavový prostor hlasitosti tvoří 
jednotkovou kružnici se zvuky na jejím obvodu. Pohyb uvnitř 
této kružnice lze tedy řídit určitě lépe než náhodně. Toto řešení má 
jeden podstaný problém a to, že konverguje k normálnímu rozdělení se 
střední hodnotou kolem zvuku 2 a 3. Pohybem v tomto prostoru a také 
přechody mezi nimi pak může vznikat slušná ambientní hudba. Tato metoda 
se nejspíš používá například ve hrách. Skutečnou kreativitu ale takto 
nezískáme a proto jsem šel cestou hlubokého učení, kde je MIDI ještě 
snesitelnou reprezentací hudby.

[piknik]: https://twitter.com/search?q=%23datapiknik
[js-music]: http://ycdmdj.eu/js-music
[webaudio]: http://www.html5rocks.com/en/tutorials/webaudio/intro/
