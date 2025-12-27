### pinch
```js
if (usePrespective) {
    // Wheel per desktop
    child.addEventListener(
        'wheel',
        (event) => {
            const { spinY } = MobCore.normalizeWheel(event);
            depth = depth + spinY * depthThreshold;
            updatePerspectiveLimits();
            spring.goTo({ z: depth }).catch(() => {});
        },
        { passive: true }
    );

    // Pinch per mobile/touch
    let initialPinchDistance = 0;
    let initialDepth = 0;

    const getPinchDistance = (touch1, touch2) => {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    child.addEventListener(
        'touchstart',
        (event) => {
            if (event.touches.length === 2) {
                initialPinchDistance = getPinchDistance(
                    event.touches[0],
                    event.touches[1]
                );
                initialDepth = depth;
            }
        },
        { passive: true }
    );

    child.addEventListener(
        'touchmove',
        (event) => {
            if (event.touches.length === 2) {
                const currentDistance = getPinchDistance(
                    event.touches[0],
                    event.touches[1]
                );
                const distanceDiff = currentDistance - initialPinchDistance;

                // Sensibilità del pinch (regola questo valore)
                const pinchSensitivity = 2;
                depth = initialDepth + distanceDiff * pinchSensitivity;

                updatePerspectiveLimits();
                spring.goTo({ z: depth }).catch(() => {});
            }
        },
        { passive: true }
    );
}
```
