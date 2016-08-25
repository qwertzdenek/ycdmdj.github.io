---
layout: post
title:  "Generátor hudby, část druhá"
date:   2016-08-26 13:02:48 +0200
categories: update
---

V předchozí kapitole jsem představil základní myšlenky generátoru 
hudby. V této části připomenu jak fungují <em>Omezené boltzmannovy 
stroje</em> (angl. Restricted Boltzmann Machines, RBM). Jedná se o 
neorientovaný <em>grafický model</em> tvořený ze skrytých a viditelných 
uzlů, které tvoří bipartitní graf. Grafické modely vznikly spojením 
grafové a pravděpodobností teorie.<img class="aligncenter wp-image-25" 
src="http://ycdmdj.eu/wp-content/uploads/2016/06/graph.png" alt="graph 
model" width="197" height="162" />Uzly představují náhodné proměnné a 
hrany podmíněnou pravděpodobnost. Předchozí obrázek představuje 
závislost [latex]p(V | H_1, H_2) = p(V | H_1) p(V | H_2)[/latex]. Tento 
model je orientovaný, ale stejnou znalost vyjadřuje také neorientovaný 
graf. Díky odstranění orientace je snazší odvozování ze sdružené 
pravděpodobnosti [latex]p(\mathbf{v}, \mathbf{h})[/latex], ale 
komplikuje se trénování. Zmíněná sdružená pravděpodobnost je definována 
pomocí součinu potenciálů (nazvaný energie modelu) děleno dělící 
funkce, která je nespočitatelná. Můžeme ale vzorkovat podmíněné 
pravděpodobnosti pro binární aktivace:

[latex]
p(\mathbf{h}|\mathbf{v}, \mathbf{\theta}) = \sigma(\mathbf{W}^T \mathbf{v} + \mathbf{c}),\\
p(\mathbf{v}|\mathbf{h}, \mathbf{\theta}) = \sigma(\mathbf{W} \mathbf{h} + \mathbf{b}),
[/latex]

kde [latex]\mathbf{\theta}=\mathbf{W}, \mathbf{b}, \mathbf{c}[/latex], 
jedná se o matici vah, viditelný a skrytý bias. Základní aktivační 
funkcí je sigmoida, ale je možné použít i oblíbené ReLU. Přímý výpočet 
gradientu pravděpodobnosti podle parametrů 
[latex]\mathbf{\theta}[/latex] není možný (podrobnosti na <a 
href="http://deeplearning.net/tutorial/rbm.html">http://deeplearning.net/tutorial/rbm.html</a>), 
proto se používá aproximace pomocí <em>Kontrastivní divergence</em>. 
Tento algoritmus je založen na KL-divergenci. Energie modelu se bude 
snižovat pokud přičteme očekávanou hodnotu derivace parametru 
[latex]\mathbf{\theta}[/latex] pro vstupní vzorek z trénovacích dat a 
odečteme to, co generuje model. Podrobnosti se sem nevejdou (viz <a 
href="https://www.cs.toronto.edu/~hinton/absps/guideTR.pdf">https://www.cs.toronto.edu/~hinton/absps/guideTR.pdf</a>).

Když aplikujeme gradient pro dostatek vzorků a epoch dostaneme 
teoreticky natrénované parametry. Ve skutečnosti je třeba správně řídit 
parametr učení (angl. learning rate) a moment. Dále regularizujeme 
hodnoty vah a také se snažíme zajistit řídkost skrytých aktivací. 
Implementace je ta lehčí část, ale naladit správně parametry může v 
závislosti na charakteru dat trvat dlouho. Učení je sice bez učitele, 
ale nastavení parametrů potřebuje vnější zásah.

[caption id="attachment_36" align="aligncenter" width="625"]<img class="wp-image-36 size-full" src="http://ycdmdj.eu/wp-content/uploads/2016/06/weight-map_70.png" alt="weights image" width="625" height="407" /> Natrénované váhy po 70 epochách.[/caption]

Na ilustračním obrázku lze poznat jaké filtry vznikají. 150 skrytých 
stavů je takové minimum které funguje, ale pro ilustraci stačí. 
Viditelným stavem je binární vektor o velikosti 88 tónů. Jednička 
znamená, že tón hraje a nula naopak. RBM se naučí jaké intervaly mezi 
tóny jsou přípustné. Použil jsem následující parametry:
<ul>
 	<li>parametr učení=0,018</li>
 	<li>moment=0,5 s přechodem na 0,9</li>
 	<li>L1=0,0008</li>
 	<li>řídkost alfa=0,9</li>
 	<li>řídkost=0,08</li>
 	<li>parametr řídkosti=0,0006</li>
 	<li>minibatch=100</li>
</ul>

V další kapitole představím generativní rekurentní model 
využívající právě natrénované RBM pro výstup. Tím jsem zajistil 
temporální závislosti mezi tóny a mohl tak začít generovat sekvence 
právě namodelovaných tónových vektorů.

Zdrojové kódy jsou na adrese <a 
href="https://github.com/qwertzdenek/elevator-music-generator">https://github.com/qwertzdenek/elevator-music-generator</a>.
