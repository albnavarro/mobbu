### Multiple instance.

## Premessa

# 1 - comune.
ComponentStore / mainStore sono condivisi da tutte le istanze.
Isolare una funzione ( createApp ? ) in cui passare per tutte le "istanze".
Non vanno fatte modifiche alla logica.

- components: setComponentList(components).
- pages: setRouteList(pages).


# 2 - singola "istanza"
Creare una funzione ( inizializeApp ? ) che inizializza ogni singola "instanza".
Parametri per ogni singola "istanza":
- rootId ( viene usato solo qui )
- contentId ( parametro chiave )
- wrapper ( viene usato solo qui )
- index
- pageNotFound
- afterInit ( viene usato solo qui )

Il trick é che inizializeApp avrá in entrata un paramantro name.
Al nodo root si puó aggiungere un data-attribute data-mobjsroot="<contentId>" .. index .. pageNotFound ..
Il contentId sará un oggetto come il seguente:

contentId: [
    {
        [name]: value
    },
    {
        [name]: value
    }
]

index: [
    {
        [name]: value
    },
    {
        [name]: value
    }
]

pageNotFound: [
    {
        [name]: value
    },
    {
        [name]: value
    }
]

La funzione di cambio rotta andra a carcare il parent root e da li puó recupeare il
contentId da passare a LoadRoute ( o chi per lei )

LoadRoute si avrá in ingresso il paramanto name.
getContent diventa getContent({name: myName})
In assenza di valore userá il primo.


E questi ? come li gestiamo senza creare uno store apposito ?
Oppure con piu istanza muoiono ?
Oppure vanno bene cosi ?
Sarebbe da usare la funzione di cambio rotta bypassando il concetto di hash nell'url.

activeRoute: "test"
atfterRouteChange: "test"
beforeRouteChange: "test"
beforeRouteLeave: ""
