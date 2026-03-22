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
#### getDelta by devicePixelRatio:

- Verificare window.devicePixelRatio su entrambi i display
- Confrontare velocità percepita con stesso movimento trackpad
- Verificare che non rallenti eccessivamente (troppo lento = fastidioso)
- Testare anche con mouse wheel (non solo trackpad)

```javascript
/**
 * Calcola il fattore di scala basato sulla risoluzione dello schermo.
 *
 * Su display Retina (DPR > 1), applica una correzione per compensare
 * la maggiore densità di pixel che rende lo scroll percepito più veloce.
 */
#getDelta() {
    const baseDelta = this.#direction === MobScrollerConstant.DIRECTION_HORIZONTAL
        ? this.#screenWidth / 1920
        : this.#screenHeight / 1080;

    const dpr = window.devicePixelRatio || 1;

    // Correzione DPR: su Retina, riduci leggermente la velocità
    // perché gli eventi di input sono più "densi"
    const dprCorrection = dpr > 1
        ? Math.sqrt(dpr)  // √2 ≈ 1.414 su Retina
        : 1;

    const correctedDelta = baseDelta / dprCorrection;

    // Su display standard, minimo 1 (non rallentare ulteriormente)
    // Su Retina, permetti < 1 per compensare
    const minDelta = dpr > 1 ? 0.6 : 1;

    return clamp(correctedDelta, minDelta, 10);
}
```
