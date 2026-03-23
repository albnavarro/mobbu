### VelocityTreshold

- Esporre come parametro la `velocitá` minima per far scattare lo snap.

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

### test delta:
- Provare a limitare il valore `max` per il trackpad.

```javascript
this.#endValue +=
    clamp(spinValue, -1, 1) * this.#speed * clamp(delta, 1, 10);
```
