---
layout: post
title:  "Generátor hudby, část druhá"
date:   2016-08-27 23:40:48 +0200
categories: update
---

V předchozí kapitole jsem představil základní myšlenky generátoru 
hudby. V této části připomenu jak fungují *Omezené boltzmannovy 
stroje* (angl. Restricted Boltzmann Machines, RBM). Jedná se o 
neorientovaný *grafický model* tvořený ze skrytých a viditelných 
uzlů, které tvoří bipartitní graf. Grafické modely vznikly spojením 
grafové a pravděpodobností teorie.

![Orientovaný grafický model]({{ site.url }}/assets/graph.png)

Uzly představují náhodné proměnné a hrany podmíněnou pravděpodobnost. 
Předchozí obrázek představuje závislost \\(p(V | H_1, H_2) = p(V | H_1) 
p(V | H_2)\\). Tento model je orientovaný, ale stejnou znalost 
vyjadřuje také jeho neorientovaná podoba. Díky odstranění orientace je 
snazší odvozování ze sdružené pravděpodobnosti \\(p(\mathbf{v}, 
\mathbf{h})\\), ale komplikuje se trénování. Těmto modelům s plně 
propojenou viditelnou \\(\mathbf{v}\\) a skrytou \\(\mathbf{h}\\) 
vrstvou bez vnitřních vazeb se říká RBM. Zmíněná sdružená pravděpodobnost 
je definována pomocí součinu potenciálů dělené dělící funkcí \\(Z\\), 
která je nespočitatelná. Můžeme ale vzorkovat podmíněné 
pravděpodobnosti pro binární aktivace:

\\[
p(\mathbf{h}|\mathbf{v}, \mathbf{\theta}) = \sigma(\mathbf{W}^T \mathbf{v} + \mathbf{c}),\quad\\
p(\mathbf{v}|\mathbf{h}, \mathbf{\theta}) = \sigma(\mathbf{W} \mathbf{h} + \mathbf{b}),
\\]

kde \\(\mathbf{\theta}=\mathbf{W}, \mathbf{b}, \mathbf{c}\\), 
jedná se o matici vah, viditelný a skrytý bias. Základní aktivační 
funkcí je sigmoida, ale je možné použít i oblíbené ReLU. Přímý výpočet 
gradientu pravděpodobnosti podle parametrů 
\\(\mathbf{\theta}\\) není možný (podrobnosti na [RBM tutorial][rbm-tutorial]), 
proto se používá aproximace pomocí *Kontrastivní divergence*. 
Tento algoritmus je založen na KL-divergenci. Energie modelu se bude 
snižovat pokud přičteme očekávanou hodnotu derivace parametru 
\\(\mathbf{\theta}\\) pro vstupní vzorek z trénovacích dat a 
odečteme to, co generuje model. Podrobnosti se sem nevejdou
(viz [A Practical Guide to Training Restricted Boltzmann Machines][guide-tr]).

Když aplikujeme gradient pro dostatek vzorků a epoch dostaneme 
teoreticky natrénované parametry. Ve skutečnosti je třeba správně řídit 
parametr učení (angl. learning rate) a moment. Dále regularizujeme 
hodnoty vah a také se snažíme zajistit řídkost skrytých aktivací. 
Implementace je ta lehčí část, ale naladit správně parametry může v 
závislosti na charakteru dat trvat dlouho. Učení je sice bez učitele, 
ale nastavení parametrů potřebuje vnější zásah.

![Natrénované váhy po 70 epochách.]({{site.url}}/assets/weight-map_70.png)

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

Zdrojové kódy jsou na mém github [repozitáři][github-page].

[rbm-tutorial]: http://deeplearning.net/tutorial/rbm.html
[guide-tr]: https://www.cs.toronto.edu/~hinton/absps/guideTR.pdf
[github-page]: https://github.com/qwertzdenek/elevator-music-generator
