/* eslint-disable no-unused-vars */
/**
 * Evente delegation possible logic.
 * Sicuramante sulla root del componente element
 * Si potrebbe utilizzare anche per le "refs"
 **/

const root = document.querySelector('div');

// Usando una weakMap possiamo rimuovere ogni elmento che sia
// root O NO => REFS ogni qual volta viene eliminato dal DOM in automatico ?
const delegationMap = new WeakMap();
const eventToAdd = new Set();
const eventRegistered = new Set();

// Example.
const myDomElement = document.querySelector('div');

/****************
 * Add event
 ***************/

/**
 * Update di delegationMap quando trovo un bindEvent.
 **/

delegationMap.set(myDomElement, [
    {
        event: 'click',
        callback: () => {
            ///
        },
    },
    {
        event: 'mosueEnter',
        callback: () => {
            ///
        },
    },
]);

// Aggiungo se non gia presente la nuova action.
eventToAdd.add('click');
eventToAdd.add('mouseEnter');

/**
 * Ciclo su tutti gli eventi registrati
 * Lancio questa funzione ogni volta che torna un bindEvent.
 */
for (const eventKey of eventToAdd) {
    // Se l'evento é giá associato skippo
    if (eventRegistered.has(eventKey)) break;

    // add listener
    root.addEventListener(eventKey, (event) => {
        // Segno l'action come giá registrata.
        eventRegistered.add(eventKey);

        // ciclo su tutti gli eventi
        for (const [element, values] of delegationMap) {
            // se il current target coincide con l'elemento del dom
            if (event.currentTarget === element) {
                // Controllo se "element" contiene una callaback per 'click' o altro.
                const callback = values.find(({ event }) => event === eventKey);

                // Lancio la callback associata.
                if (callback) callback(event);
                // if (callback) callback(event, { current });
            }
        }
    });
}

/****************
 * Remove event
 ***************/

// Se weackMap ( rimozione automatica quando il nodo viene rimosso dal dom )
// non é utilizzabile. Ma confido che questo passaggio non serva.
delegationMap.delete(myDomElement);

// Come rimuovere il lsitener ?
// C'é veramante bisogno di rimuoverlo ?
// Daprovare in un secondo momento:

// Si potrebbero associale glie venti con oggoo cosi in modo da poterli puoi rimuovere
function commonEvent(event) {
    // quello di cui sopra
}

function onClick(event) {
    commonEvent(event);
}

function onMouseEnter(event) {
    commonEvent(event);
}

const handler = {
    click: onClick,
    mouseenter: onMouseEnter,
};
