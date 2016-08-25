V prvním dílu tohoto seriálu bych rád představil svojí *diplomovou 
práci*. Zaměřil jsem se na generování hudby, která slouží jako 
podkres do výtahů, odchodů nebo hotelů. Tato hudba se vyznačuje tím, že 
nemá definován žádný konec ani začátek a nemění svoji náladu. Nutné je, 
aby byl generátor kreativní a může být i vícehlasý.

Vývoj generované hudby není zdaleka u konce. Již dlouhou dobu se 
snažíme napodobit počítačem člověka v mnoha činnostech a nejvíce je 
třeba dohnat jeho kreativitu. Nejdříve byla hudba jen živá, poté 
reprodukovaná a nyní přichází hudba generativní, která kombinuje výhody 
obou předků. Stejně jak je živá hudba pokaždé interpretována jinak, tak 
je možné ji poslouchat kdekoli. Jednou se možná dočkáme mobilní 
aplikace, která nám bude skládat hudbu na míru naší nálady. Další 
výhodou je, že se neplatí autorské poplatky, protože stroj nemůže nic 
vlastnit.

Hudba je velmi komplexní systém. Skládá se z tónů, které zní v určitém 
čase po nějakou dobu. Tuto reprezentaci hudby můžeme najít již v 
hracích strojcích ze 16 století, které měly zaznamenanou hudbu na 
válečku. Váleček se točil a podle toho jaké výstupky v konkrétním čase 
zvedly příslušnou páčku, takové hrály tóny.

Pokud chceme modelovat takový systém, potřebujeme znát vazby mezi tóny. 
Dále je nezbytná paměť, která uchovává minulé výstupy, protože výstup v 
čase *t* závisí teoreticky na všech předchozích výstupech.

V praxi jsou závislosti tónů nepozorovatelné. Takové stavy modelu se 
nazývají *latentní náhodné proměnné*. Ty získáme jen pomocí 
odvozování z viditelných proměnných a nelze je nikde změřit. V 
angličtině se nazývají takové modely *Latent Variable Model 
(LVM)*. Jestliže odhalíme tyto neviditelné závislosti, 
nepotřebujeme tak komplikovaný model. Nevýhodou takového přístupu je 
těžší trénování.

V další části představím *grafické modely*, jak fungují a proč 
jsem použil jeden z nich - RBM. Poté přijde na řadu temporální 
modelování pomocí *rekurentních neuronových sítí*.
