import { getUnivoqueId } from '@mobCoreUtils';
import { debounceFuncion } from '../debounce';
import { handlePointerMove } from '../pointer-event/handle-pointer';
import { getTime } from '../raf-utils/time';

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
 * @type {Map<string, any>}
 */
const callbacks = new Map();

/**
 * @param {PointerEvent} params
 */
const getVelocity = ({ clientX, clientY }) => {
    const diffX = clientX - previousClientX;
    const diffY = clientY - previousClientY;
    const time = getTime();
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

        return {
            speed: 1,
            x: { speed: 1, direction: 1 },
            y: { speed: 1, direction: 1 },
        };
    }

    const vx = diffX / diffTime;
    const vy = diffY / diffTime;
    const speed = Math.hypot(vx, vy);
    previousClientX = clientX;
    previousClientY = clientY;
    previousTime = time;

    return {
        speed: Math.max(1, Math.round((speed + 1) * 10_000) / 10_000),
        x: {
            speed: Math.max(
                1,
                Math.round((Math.abs(vx) + 1) * 10_000) / 10_000
            ),
            direction: Math.sign(vx) || 1,
        },
        y: {
            speed: Math.max(
                1,
                Math.round((Math.abs(vy) + 1) * 10_000) / 10_000
            ),
            direction: Math.sign(vy) || 1,
        },
    };
};

/**
 * Detect dell' evento virutale pointerMove.
 *
 * - Dobbiamo riallineare il valore di previousTime.
 */
const initDetectStart = () => {
    unsubscribeDetectStart = handlePointerMove(() => {
        unsubscribeDetectStart();
        previousTime = getTime();
        firstMove = true;
    });
};

/**
 * Detect dell' evento pointerMove reale.
 */
const initPointerMove = () => {
    unsubscribePointerMove = handlePointerMove((event) => {
        for (const callback of callbacks.values()) {
            callback(getVelocity(event));
        }
    });
};

/**
 * Detect dell' evento virtuale pointerEnd.
 */
const initPointerEnd = () => {
    debouceFunctionReference = debounceFuncion(() => {
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

    unsubscribeDetectEnd = handlePointerMove(debouceFunctionReference);
};

const init = () => {
    if (initialized) return;
    initialized = true;

    initDetectStart();
    initPointerMove();
    initPointerEnd();
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
 * @param {(event: any) => void} cb
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

        if (callbacks.size === 0) {
            unsubscribeDetectStart();
            unsubscribeDetectEnd();
            unsubscribePointerMove();
            initialized = false;
        }
    };
};

/**
 * Function to execute a callback on page load
 */
export const handleVelocity = (() => addCallback)();
