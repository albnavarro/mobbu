### Controllo della velocitá sinamico in #goToNextSnap.
- `#velocityThreshold` puó variare in base alla distanza trail `ora` e il punto di snap piu vicino.
- Quando sono vicino a un punto di snap mi servirá meno velocitá per `snappare`.
- Quando sono lontano a un punto di snap mi servirá piú velocitá.

### Velocity;
- Calcolare la velocitá a prescindere dallo snap attivo e passarla nella callback.

### triggerScrollStart.

- `triggerScrollStart()` andrebbe chiamato una sola volta quando il movimento parte/riparte.
- Al momento non abbiamo un evento dedicato per il primo movimento.
- Di conseguenza chiamiamo la funzione ad ogni movimento
- `triggerScrollStart` non fá altro che settare `this.#force3D = true` all' interno dei `children`.

```js
#isMoving = false;

// dentro subscribe:
if (!this.#isMoving) {
    this.#isMoving = true;
    this.#children.forEach((element) => element.triggerScrollStart());
}

// dentro onComplete:
this.#isMoving = false;
this.#children.forEach((element) => element.triggerScrollEnd());
```
