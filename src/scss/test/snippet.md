## Responsive grid.

```scss
display: grid;
grid-template-columns: repeat(auto-fit,minmax(min(10rem, 100%), 1fr));
```

#### auto-fit:
calcola automaticamente quante colonne entrano nello spazio disponibile.<br/> Se hai 6 elementi ma entrano solo 3 colonne, auto-fit ne crea 3 e manda il resto a capo (a differenza di auto-fill che creerebbe slot vuoti.

#### minmax(min(10rem, 100%), 1fr):
La funzione minmax() definisce il range di larghezza per ogni colonna:

##### Minimo: min(10rem, 100%)
- Funzione min() sceglie il valore più piccolo tra i due
- Su desktop: 10rem (160px con font-base 16px) è più piccolo di 100% -> larghezza minima 10rem
- Su mobile (schermo < 10rem): 100% è più piccolo → la colonna occupa tutta la larghezza (evita overflow orizzontale!)

##### Massimo: 1fr (frazione)
- Ogni colonna cresce equamente per occupare tutto lo spazio rimanente
- Se hai 3 colonne: ognuna fa 1fr → dividono lo spazio in 3 parti uguali
