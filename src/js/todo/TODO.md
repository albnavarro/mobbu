# MobCore

### eslint:
- passare a defineConfig
- https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/

### useSwipe.
- Implementare.

### DOCS
- Aggiungere i tipi allo store.

### set/update
- Sostuire le strighe rimaste in tutto il progetto `fireCallback ` con `emit` per pulizia.
- ( stringhe non referenze ).

# MobJs

## Props
- Aggiungere doc per passare  i valori come `data-prop`.

## bind
- La chiave 'bind', puó entrare in conflitto con `bind` function nativa.
- In `bindObject` é stato fatto un controllo che bind sia una `stringa` e non una `funzione` ( myfunction.bind() )
- Sarebbe da cambiare un' altra key piú idonea.
- Quensto si riflette su `repeat` `invalidate` etc..

## bindProp
- Sarebbe interessante capire come ( piú che altro a livello di `TS`) avere un funzione in modalitá auto come:
- senza dover tornare l' oggetto con `prop: () => ...`

```js
${bindProp(() => ({
    prop: proxi.prop
    prop2: proxi.prop2
}))}
```

## Page transition.
- Possibilitá di sovrascrivere le due funzioni per rotta.

## Props ( export props ), da valutare ??
- Prevedere che gli stati esportati all' interno del componente siano usati `readOnly`
- Tenere conto del proxi.


## Repeat
#### Use object
- Possibilità di usare un oggetto nel repeat secondo lo schema `Object.values()`.

## Quickset
- Aggiungere `Quickset`.

## Debug
- Add `debug` ( params in componentFunction ) in DOCS.

## Docs
- In ognisezione corrispondente aggiungere glie sempi tipi.
    - `ReturnBindProps`.
    - `UseMethodByName` && `useMethodArrayByName`


# Mobmotion

### SmoothScroller - horizontal swipe
- aggiungere `useSwipe`, se true verrá disabilitato `useHorizontalScroll`.
- Freezare `calculateValue` per 1 secondo in caso di swipe ( aggiunge propietá con return ).
- Usare una `callBack` come le altre.
- La `callback` avrá in entrata il valore percent come `move()`,
- La `callback` lancerá il metodo `move` mentre `calculateValue` é freezato.
- I metodi `touchstart` e `touchend` giá esistono.

```js
this.#subscribeTouchStart = MobCore.useTouchStart((data) => {
    this.#detectSwipeStart(data); // <--
    this.#onMouseDown(data);
});

this.#subscribeTouchEnd = MobCore.useTouchEnd((data) => {
    this.#detectSwipeEnd(data); // <--
    this.#onMouseUp(data);
});
```

- https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
```js
let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.getElementById('modalContent');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture(e) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                console.log("left");
            } else {
                console.log("right");
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                console.log("top");
            } else {
                console.log("bottom");
            }
        }
    } else {
        console.log("tap");
    }
```


### MobScroller
- Usare `reverse` al posto di `fromTo`


### AsyncTimeline
- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

### Sequencer
- default `start`: ultimo `end` in ordine di inserimento.
- Aggiungere span:<br/>

```
    mySequencer
        .goTo( { x:10 }, { start: 2, end: 4}); // 1
        .goTo( { x:20 }, { span: 2 }); // 3
        .goTo( { y:20 }, { start: 2, span: 2 }); // 3
```
- 1: parte da 2 e finisce a 4. ( logica corrente ).
- 2: parte da 4 e finisce a 6.
- 3: parte da 2 e finisce a 4.
