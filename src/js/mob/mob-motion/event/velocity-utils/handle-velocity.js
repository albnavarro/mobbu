import { getUnivoqueId } from '@mobCoreUtils';
import MobLerp from '../../animation/lerp/mob-lerp';
import { MobCore } from '@mobCore';

let previousClientX = 0;
let previousClientY = 0;
let previousTime = 0;
let firstMove = false;

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
    if (!lerpInstance) return;

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

        lerpInstance.goTo(
            {
                speed: 1,
                speedX: 1,
                speedY: 1,
            },
            { velocity: 0.02 }
        );
        return;
    }

    const vx = diffX / diffTime;
    const vy = diffY / diffTime;
    const speed = Math.hypot(vx, vy);

    /**
     * Durante il movimento usiamo un esasing molto morbido.
     *
     * - Quando l'evento end viene scatenato useremo un easing piu secco per tornare al valore neutro.
     */
    lerpInstance.goTo(
        {
            speed: Math.max(1, Math.round((speed + 1) * 10_000) / 10_000),
            speedX: Math.max(1, Math.round((vx + 1) * 10_000) / 10_000),
            speedY: Math.max(1, Math.round((vy + 1) * 10_000) / 10_000),
        },
        { velocity: 0.02 }
    );

    previousClientX = clientX;
    previousClientY = clientY;
    previousTime = time;
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

        /**
         * Set first iteration
         */
        firstMove = true;
    });
};

/**
 * Detect dell' evento pointerMove reale.
 */
const initPointerMove = () => {
    unsubscribePointerMove = MobCore.usePointerMove((event) => {
        updateVelocity(event);

        /**
         * After start => move first iteration is consumed.
         */
        if (firstMove) firstMove = false;
    });
};

/**
 * Detect dell' evento virtuale pointerEnd.
 */
const initPointerEnd = () => {
    debouceFunctionReference = MobCore.useDebounce(() => {
        if (!lerpInstance) return;

        /**
         * Back to neutral value at the end
         */
        lerpInstance.goTo(
            {
                speed: 1,
                speedX: 1,
                speedY: 1,
            },
            { velocity: 0.06 }
        );

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
        unsubscribeDetectEnd();
        initDetectStart();
        initPointerMove();
        initPointerEnd();
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
                speedX,
                speedY,
            });
        }
    });

    /**
     * Alla fine dell' interpolazione resettiamo la direzione a 1 ( valore neutro )
     */
    lerpInstance.onComplete(({ speed, speedX, speedY }) => {
        for (const callback of callbacks.values()) {
            callback({
                speed,
                speedX,
                speedY,
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
 *     const unsubscribe = handleVelocity(() => {
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
export const handleVelocity = addCallback;
