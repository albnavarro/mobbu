# CaterpillarN2Animation

#### Star example:

```js
squareData.forEach(({ width, height, x, y, rotate, hasFill, opacity }) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    /**
     * Center canvas
     */
    const scaleFactor = 500;
    const scaleX = width / scaleFactor;
    const scaleY = height / scaleFactor;
    const rotation = (Math.PI / 180) * rotate;
    const xx = Math.cos(rotation) * scaleX;
    const xy = Math.sin(rotation) * scaleY;

    /**
     * Apply scale/rotation/scale all together.
     */
    context.setTransform(xx, xy, -xy, xx, centerX + x, centerY + y);

    if (hasFill) {
        context.fillStyle = `#b45757`;
    } else {
        context.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    }

    const path = new Path2D(
        'M 314.66331,372.25958 93.889916,264.46734 -120.06656,385.22612 -85.772782,141.94851 -266.73739,-24.219674 -24.76928,-66.781266 77.344916,-290.23763 192.59565,-73.264538 436.67031,-45.199981 265.93107,131.45836 Z'
    );
    // center rotation
    context.translate(Math.round(-width / 2), Math.round(-height / 2));
    context.stroke(path);
    context.fill(path);

    /**
     * Reset all transform instead save() restore().
     */
    context.setTransform(1, 0, 0, 1, 0, 0);
});
```
