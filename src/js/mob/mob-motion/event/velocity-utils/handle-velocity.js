import { getUnivoqueId } from '@mobCoreUtils';
import { MobCore } from '@mobCore';
import MobSpring from '../../animation/spring/mob-spring';

let previousClientX = 0;
let previousClientY = 0;
let previousTime = 0;
let firstMove = false;

/**
 * Direction
 *
 * - -1 : left | top
 * - 1 : right | bottom
 * - 0 : neutral position
 */
let currentDirectionX = 0;
let currentDirectionY = 0;

/**
 * Params to detect threshold to detect mouse move.
 */
const directionTresholdBase = 2;
const EXP_GROWTH_FACTOR = 0.6;
const THRESHOLD_CAP = 60;
let previousThreshold = directionTresholdBase;

/**
 * Il threshold scende lentamente con una logica di tupo LERP
 *
 * Più basso = scende più lentamente (0.1-0.5)
 */
const RELEASE_LERP = 0.3;

/**
 * @type {boolean}
 */
let initialized = false;

let debouceFunctionReference = () => {};
let unsubscribeDetectStart = () => {};
let unsubscribeDetectEnd = () => {};
let unsubscribePointerMove = () => {};

/**
 * @type {import('@mobMotionType').MobSpring}
 */
let tweenInstance;

/**
 * @type {import('./type').VelocityMap}
 */
const callbacks = new Map();

/**
 * Calcola il threshold dinamico con curva esponenziale
 *
 * - Minimo: 2px (movimento fermo/lento)
 * - Cresce esponenzialmente con la velocità
 *
 * @param {number} currentSpeed
 * @returns {number}
 */
const getDynamicTreshold = (currentSpeed) => {
    if (currentSpeed <= 1) return directionTresholdBase;

    const exponentialMultiplier = Math.exp(
        (currentSpeed - 1) * EXP_GROWTH_FACTOR
    );

    return Math.min(
        directionTresholdBase * exponentialMultiplier,
        THRESHOLD_CAP
    );
};

/**
 * @param {PointerEvent} params
 */
const updateVelocity = ({ clientX, clientY }) => {
    if (!tweenInstance) return;

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

        /**
         * Reset anche del threshold quando ricomincia
         */
        previousThreshold = directionTresholdBase;

        tweenInstance.goTo(
            {
                speed: 1,
                speedX: 1,
                speedY: 1,
            }
            /**
             * Lerp logic fi needed:{ velocity: 0.02 }
             */
        );
        return;
    }

    const vx = diffX / diffTime;
    const vy = diffY / diffTime;
    const speed = Math.hypot(vx, vy);

    const targetThreshold = getDynamicTreshold(speed);

    /**
     * Asymmetric lerp: sale istantaneo, scende lento
     *
     * Sbailizziamo il valore di trashold su movimenti veloci.
     */
    if (targetThreshold > previousThreshold) {
        /**
         * Attack: istantaneo
         */
        previousThreshold = targetThreshold;
    } else {
        /**
         * Release: lento
         */
        previousThreshold +=
            (targetThreshold - previousThreshold) * RELEASE_LERP;
    }

    if (Math.abs(diffX) > previousThreshold)
        currentDirectionX = Math.sign(diffX);

    if (Math.abs(diffY) > previousThreshold)
        currentDirectionY = Math.sign(diffY);

    tweenInstance.goTo(
        {
            speed: Math.max(1, Math.round((speed + 1) * 10_000) / 10_000),
            speedX: Math.max(1, Math.round((vx + 1) * 10_000) / 10_000),
            speedY: Math.max(1, Math.round((vy + 1) * 10_000) / 10_000),
        }
        /**
         * Lerp logic fi needed:{ velocity: 0.02 }
         *
         * - Quando l'evento end viene scatenato useremo un easing piu secco per tornare al valore neutro.
         */
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
        if (!tweenInstance) return;

        /**
         * Back to neutral value at the end
         */
        tweenInstance.goTo(
            {
                speed: 1,
                speedX: 1,
                speedY: 1,
            }
            /**
             * Lerp logic if needed: { velocity: 0.06 }
             */
        );

        currentDirectionX = 0;
        currentDirectionY = 0;
        previousThreshold = directionTresholdBase;

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
    tweenInstance = new MobSpring({
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
    tweenInstance.subscribe(({ speed, speedX, speedY }) => {
        for (const callback of callbacks.values()) {
            callback({
                speed,
                speedX,
                speedY,
                directionX: currentDirectionX,
                directionY: currentDirectionY,
            });
        }
    });

    /**
     * Alla fine dell' interpolazione resettiamo la direzione a 1 ( valore neutro )
     */
    tweenInstance.onComplete(({ speed, speedX, speedY }) => {
        for (const callback of callbacks.values()) {
            callback({
                speed,
                speedX,
                speedY,
                directionX: 0,
                directionY: 0,
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
            tweenInstance.destroy();
            // @ts-ignore
            tweenInstance = null;
            initialized = false;
        }
    };
};

/**
 * Function to execute a callback on page load
 */
export const handleVelocity = addCallback;
