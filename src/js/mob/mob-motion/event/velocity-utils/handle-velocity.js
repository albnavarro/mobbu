import { getUnivoqueId } from '@mobCoreUtils';
import MobLerp from '../../animation/lerp/mob-lerp';
import { MobCore } from '@mobCore';

let previousClientX = 0;
let previousClientY = 0;
let previousTime = 0;
let firstMove = false;
let directionX = 1;
let directionY = 1;
let previousDirectionX = 1;
let previousDirectionY = 1;

/**
 * @type {boolean}
 */
let initialized = false;

let debouceFunctionReference = () => {};
let unsubscribeDetectStart = () => {};
let unsubscribeDetectEnd = () => {};
let unsubscribePointerMove = () => {};

/**
 * @type {import('@mobMotionType').MobLerp}
 */
let lerpInstance;

/**
 * @type {import('./type').VelocityMap}
 */
const callbacks = new Map();

/**
 * @param {PointerEvent} params
 */
const updateVelocity = ({ clientX, clientY }) => {
    const diffX = clientX - previousClientX;
    const diffY = clientY - previousClientY;
    const time = MobCore.getTime();
    const diffTime = time - previousTime;

    /**
     * Al primo movimento torniamo un valore 1 neutro.
     *
     * - PreviousClientY & previousClientX non sarebbero coerenti.
     */
    if (firstMove || diffTime === 0) {
        /**
         * Aggiorna storico
         */
        previousClientX = clientX;
        previousClientY = clientY;
        previousTime = time;
        firstMove = false;

        lerpInstance.goTo({
            speed: 1,
            speedX: 1,
            speedY: 1,
        });
        return;
    }

    const vx = diffX / diffTime;
    const vy = diffY / diffTime;
    const speed = Math.hypot(vx, vy);
    previousClientX = clientX;
    previousClientY = clientY;
    previousTime = time;

    lerpInstance.goTo({
        speed: Math.max(1, Math.round((speed + 1) * 10_000) / 10_000),
        speedX: Math.max(1, Math.round((Math.abs(vx) + 1) * 10_000) / 10_000),
        speedY: Math.max(1, Math.round((Math.abs(vy) + 1) * 10_000) / 10_000),
    });

    directionX = Math.sign(vx) || previousDirectionX;
    directionY = Math.sign(vy) || previousDirectionY;
};

/**
 * Detect dell' evento virutale pointerMove.
 *
 * - Dobbiamo riallineare il valore di previousTime.
 */
const initDetectStart = () => {
    unsubscribeDetectStart = MobCore.usePointerMove(() => {
        unsubscribeDetectStart();
        previousTime = MobCore.getTime();
        firstMove = true;
    });
};

/**
 * Detect dell' evento pointerMove reale.
 */
const initPointerMove = () => {
    unsubscribePointerMove = MobCore.usePointerMove((event) => {
        updateVelocity(event);
    });
};

/**
 * Detect dell' evento virtuale pointerEnd.
 */
const initPointerEnd = () => {
    debouceFunctionReference = MobCore.useDebounce(() => {
        /**
         * Back to neutral value at the end
         */
        lerpInstance.goTo({
            speed: 1,
            speedX: 1,
            speedY: 1,
        });

        /**
         * - Il primo evento deve essere sempre start.
         * - L' evento move dese essere sempre successivo a start.
         *
         * Per questo motivo prima dobbiamo:
         *
         * - 1. Rimuovere l'evento move
         * - 2- Iscriversi dopo che l'evento start é stato ricreato
         * - 3. La callback usano Map che garantisce l' ordine di inserimento
         *
         * In questo modo l'ordine degli eventi sará sempre:
         *
         * - 1. Start
         * - 2. Move
         * - 3. End
         */
        unsubscribePointerMove();
        initDetectStart();
        initPointerMove();
    });

    unsubscribeDetectEnd = MobCore.usePointerMove(debouceFunctionReference);
};

const init = () => {
    if (initialized) return;
    initialized = true;

    /**
     * Init handler
     */
    initDetectStart();
    initPointerMove();
    initPointerEnd();

    /**
     * Init Lerp
     *
     * Il valore di speed `neutro` é 1 in quanto verrá usato come moltiplicatore.
     */
    lerpInstance = new MobLerp({
        data: {
            speed: 1,
            speedX: 1,
            speedY: 1,
        },
    });

    /**
     * Subscribe lerp
     *
     * - Restituisce il valore durante l'interpolazione
     * - Quando la velicitá degli assi e 1 per coerenza il valore della direzione sará 1.
     */
    lerpInstance.subscribe(({ speed, speedX, speedY }) => {
        for (const callback of callbacks.values()) {
            callback({
                speed,
                x: {
                    speed: speedX,
                    direction: speedX === 1 ? 1 : directionX,
                },
                y: {
                    speed: speedY,
                    direction: speedY === 1 ? 1 : directionY,
                },
            });
        }

        previousDirectionX = directionX;
        previousDirectionY = directionY;
    });

    /**
     * Alla fine dell' interpolazione resettiamo la direzione a 1 ( valore neutro )
     */
    lerpInstance.onComplete(({ speed, speedX, speedY }) => {
        for (const callback of callbacks.values()) {
            callback({
                speed,
                x: { speed: speedX, direction: 1 },
                y: { speed: speedY, direction: 1 },
            });
        }
    });
};

/**
 * Add callback on page load
 *
 * @example
 *     ```javascript
 *
 *     handleAccelleration(() => {
 *         ...
 *     });
 *
 *     ```;
 *
 * @param {import('./type').VelocityCallBack} cb
 * @returns {() => void}
 */
const addCallback = (cb) => {
    if (globalThis.window === undefined) {
        return () => {};
    }

    const id = getUnivoqueId();
    callbacks.set(id, cb);
    init();

    return () => {
        callbacks.delete(id);

        if (callbacks.size === 0 && initialized) {
            unsubscribeDetectStart();
            unsubscribeDetectEnd();
            unsubscribePointerMove();
            lerpInstance.destroy();
            // @ts-ignore
            lerpInstance = null;
            initialized = false;
        }
    };
};

/**
 * Function to execute a callback on page load
 */
export const handleVelocity = (() => addCallback)();
