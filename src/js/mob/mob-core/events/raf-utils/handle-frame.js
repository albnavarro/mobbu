import { handleVisibilityChange } from '../visibility-change/handle-visibility-change.js';
import { handleCache } from './handle-cache.js';
import { handleNextTick } from './handle-next-tick.js';
import { handleNextFrame } from './handle-next-frame.js';
import { handleFrameIndex } from './handle-frame-index.js';
import { catchAnimationReject } from '../error-handler/catch-animation-reject.js';
import { loadFps } from './load-fps.js';
import { eventStore } from '../event-store.js';
import { defaultTimestep, getTime } from './time.js';
import { useNextLoop } from '../../utils/next-tick.js';

/**
 * 10000 is maximum stagger frame delay
 */
const currentFrameLimit = 10_000_000;

/**
 * @type {number}
 */
const firstRunDuration = 2000;

/**
 * @type {boolean}
 */
let isFrameRuning = false;

/**
 * @type {import('./type.js').HandleFrameArray}
 */
let callback = [];

/**
 * @type {number}
 */
let time = getTime();

/**
 * @type {number}
 */
let startTime = 0;

/**
 * RawTime accumula il tempo reale del browser.
 *
 * - Nella prima versione il valore di rawTime partiva da 0.
 * - Nella versioen attuale il tempo parte allineato a time.
 *
 * @type {number}
 */
let rawTime = getTime();

/**
 * @type {number}
 */
let timeElapsed = 0;

/**
 * @type {number}
 */
let lastTime = 0;

/**
 * @type {number}
 */
let timeLost = 0;

/**
 * ATTENZIONE: isStopped ha due significati:
 *
 * 1. Tab in background (da handleVisibilityChange)
 * 2. Loop fermo per mancanza di lavoro (da nextTickFn)
 *
 * @type {boolean}
 */
let isStopped = false;

/**
 * Stable fps
 *
 * @type {number}
 */
let fps = 60;

/**
 * @type {number}
 */
let maxFps = fps;

/**
 * @type {number}
 */
let frames = 0;

/**
 * @type {number}
 */
let fpsPrevTime = 0;

/**
 * @type {number}
 */
let currentFrame = 0;

/**
 * @type {boolean}
 */
let requiresMakeSomethingState = false;

/**
 * @type {boolean}
 */
let shouldMakeSomethingState = false;

/**
 * Real fps (rilevazione cali di performance).
 *
 * - `fps` é una media su 1s calcolata sul tempo compensato: stabile, ma lenta e cieca ai freeze.
 * - `realFps` é la media mobile delle durate reali (timestamp rAF grezzo) degli ultimi N frame.
 * - Media delle durate e non degli fps: la media degli fps sovrastima i frame veloci e nasconde i cali.
 * - Ogni durata é limitata a 100ms (stessa soglia percettiva della compensazione lag) cosí un singolo freeze non domina
 *   la finestra.
 * - Usato solo per should/mustMakeSomething, `fps` e `maxFps` restano invariati.
 */

/**
 * Numero di frame nella finestra di misura.
 *
 * @type {number}
 */
const realFpsSamples = 10;

/**
 * @type {number}
 */
const realFpsMaxFrameDuration = 100;

/**
 * @type {number[]}
 */
const frameDurations = Array.from({ length: realFpsSamples }, () => 0);

/**
 * @type {number}
 */
let frameDurationsCursor = 0;

/**
 * @type {number}
 */
let frameDurationsCount = 0;

/**
 * @type {number}
 */
let realFps = fps;

/**
 * Svuota la finestra.
 *
 * - Ripresa dopo loop fermo / tab in background: la durata del frame contiene il tempo di inattivitá.
 * - Finché la finestra non é piena non viene rilevato nessun calo.
 *
 * @returns {void}
 */
const resetRealFps = () => {
    frameDurationsCursor = 0;
    frameDurationsCount = 0;
};

/**
 * Calcola il valore reale degli fps correnti basandosi su un sample degli ultimi `realFpsSamples` frame. Aggiorna
 * `realFps` solo a finestra piena.
 *
 * @param {number} duration - Durata reale del frame in ms.
 * @returns {void}
 */
const updateRealFps = (duration) => {
    /**
     * Limita la durata del frame a un massimo di 100ms anche se il freeze dura di piu, questo per avere una media coerente.
     * Qui salviamo la durata del singolo frame, il valore in fps verrá calcolato in seguito.
     */
    frameDurations[frameDurationsCursor] = Math.min(
        Math.max(duration, 0),
        realFpsMaxFrameDuration
    );

    /**
     * Buffer circolare: il cursore ( indice usato da frameDurations ) passa alla posizione successiva.
     * Il modulo lo riporta a 0 dopo l'ultima posizione ( realFpsSamples - 1 ), quindi il prossimo frame sovrascrive il
     * piú vecchio.
     */
    frameDurationsCursor = (frameDurationsCursor + 1) % realFpsSamples;

    /**
     * Campioni validi nella finestra, massimo realFpsSamples.
     * L'array non viene mai svuotato: i vecchi valori restano e vengono sovrascritti uno alla volta ( buffer circolare
     * per performance ). `resetRealFps()` azzera cursore e count, quindi finché count < realFpsSamples i vecchi valori
     * non vengono letti.
     *
     * Il valore sale da 0 a realFpsSamples e poi resta fisso.
     * Torna a 0 solo con `resetRealFps()` ( primi 2s, tab in background, loop fermo ), poi risale una volta fino a
     * realFpsSamples.
     */
    frameDurationsCount = Math.min(frameDurationsCount + 1, realFpsSamples);

    /**
     * Se non raggiungiamo la finestra di 10 frame non facciamo nulla.
     */
    if (frameDurationsCount < realFpsSamples) return;

    /**
     * Somma ricalcolata ad ogni frame (10 elementi): nessun drift da somma incrementale in float.
     */
    let sum = 0;
    for (const value of frameDurations) sum += value;
    if (sum > 0) realFps = (1000 * realFpsSamples) / sum;
};

/**
 * @returns {boolean}
 */
const isRealFpsReady = () => frameDurationsCount >= realFpsSamples;

/**
 * Check if frame dropped a lot.
 *
 * @returns {boolean}
 */
const requiresMakeSomethingInstant = () =>
    isRealFpsReady() && realFps < (maxFps / 5) * 3;

/**
 * @returns {boolean} Check
 *
 *   If frame dropped medium.
 */
const shouldMakeSomethingInstant = () =>
    isRealFpsReady() && realFps < (maxFps / 5) * 4;

/**
 * If frame dropper for X seconds mustMakeSomethingIsActive = true
 *
 * @returns {void}
 */
const startRequiresMakeSomething = () => {
    if (requiresMakeSomethingState || !requiresMakeSomethingInstant()) return;

    requiresMakeSomethingState = true;
    setTimeout(() => {
        requiresMakeSomethingState = false;
    }, 4000);
};

/**
 * If frame dropper for X seconds shouldMakeSomethingIsActive = true
 *
 * @returns {void}
 */
const startShouldMakeSomething = () => {
    if (shouldMakeSomethingState || !shouldMakeSomethingInstant()) return;

    shouldMakeSomethingState = true;
    setTimeout(() => {
        shouldMakeSomethingState = false;
    }, 4000);
};

/**
 * Reset frame counter.
 *
 * - CurrentFrame > frame limit
 */
const performFrameCounterReset = () => {
    currentFrame = 0;
    eventStore.quickSetProp('currentFrame', currentFrame);
    handleFrameIndex.updateKeys(currentFrameLimit);
    handleCache.updateFrameId(currentFrameLimit);
};

/**
 * Next tick function
 *
 * @returns {void}
 */
const nextTickFn = () => {
    /*
     * If currentFrame reach currentFrameLimit back to zero to avoid big numbers
     * executte the operation outside requestAnimationFrame if deferredNextTick is active
     */
    if (currentFrame >= currentFrameLimit) {
        performFrameCounterReset();
    }

    /*
        Fire next tick
        */
    handleNextTick.fire({ time, fps });

    /**
     * Get next callback
     */
    const nextFrames = handleNextFrame.get();
    for (const nextFrame of nextFrames) {
        callback.push(nextFrame);
    }

    /**
     * Next frame condition
     */

    /**
     * RequestAnimationFrame is ended, ready for another
     */
    isFrameRuning = false;

    if (
        callback.length > 0 ||
        handleFrameIndex.getAmountOfFrameToFire() > 0 ||
        handleCache.getCacheCounter() > 0 ||
        time < firstRunDuration
    ) {
        /**
         * Call Next animationFrame
         */
        initFrame();
    } else {
        isStopped = true;

        /**
         * - Non ci sono piu frame futuri.
         * - PerformReset non é necessario ( non abbiamo callback in coda da riallineare ) ).
         * - Avendo una cosa vuota basta resettare currentFrame per poter partire da un counter 0.
         */
        currentFrame = 0;
        lastTime = time;
        eventStore.quickSetProp('currentFrame', currentFrame);
    }
};

/**
 * @param {number} timestamp
 * @returns {void}
 */
const render = (timestamp) => {
    /**
     * Update time
     */
    time = timestamp;
    timeElapsed = time - rawTime;

    if (isStopped) startTime += timeElapsed;

    /**
     * Default time calculation.
     */
    rawTime += timeElapsed;
    time = Math.round(rawTime - startTime);

    /**
     * Get frame duration.
     */
    const frameDuration = Math.round(1000 / fps);

    /**
     * Compensazione lag non rilevato da visibilitychange.
     *
     * Meccanismo: quando rilevato scostamento significativo (>100ms):
     *
     * - Applica correzione costante frame-dopo-frame.
     * - Il delta-time viene mantenuto stabile.
     * - L'offset rimane fisso fino al reset del loop.
     *
     * Priorità: garantire avanzamento fluido delle animazioni piuttosto che sincronizzazione assoluta col tempo di
     * sistema.
     *
     * - Soglia 100ms: valore percettivo, non tecnico.
     * - Rappresenta il tempo minimo di freeze percepibile dall'utente.
     * - Costante indipendentemente dal frame rate (30/60/144Hz)
     */
    timeLost = Math.abs(time - lastTime - frameDuration);
    const timeToSubsctract = timeLost > 100 ? timeLost : 0;
    time -= timeToSubsctract;
    lastTime = time;

    /**
     * Update frame counter for fps or reset id tab change.
     */
    if (isStopped) {
        fpsPrevTime = time;
        frames = 0;
        fps = eventStore.getProp('instantFps');
    } else {
        frames++;
    }

    /**
     * Real fps:
     *
     * - TimeElapsed é la durata reale del frame (non arrotondata, non compensata).
     * - Primi 2s esclusi (caricamento pagina), come per `fps`.
     */
    if (isStopped || time <= firstRunDuration) {
        resetRealFps();
    } else {
        updateRealFps(timeElapsed);
    }

    /**
     * - Calcolo FPS ogni secondo.
     * - Condizione time > fpsPrevTime + 1000 garantisce timeDelta > 1000,
     * - Quindi divisione sempre sicura.
     */
    if (!isStopped && time > fpsPrevTime + 1000) {
        /**
         * Calc fps Set fps when stable after 2 seconds otherwise use instantFps
         */
        fps =
            time > firstRunDuration
                ? Math.round((frames * 1000) / (time - fpsPrevTime))
                : eventStore.getProp('instantFps');
        fpsPrevTime = time;
        frames = 0;
    }

    /**
     * Update max fps
     */
    if (fps > maxFps) maxFps = fps;

    /**
     * Start frame check for mustMakeSomething methods.
     */
    startRequiresMakeSomething();

    /**
     * Start frame check for shouldMakeSomething methods.
     */
    startShouldMakeSomething();

    /**
     * Fire callbnack
     */
    for (const item of callback) item({ time, fps });

    /*
     * Fire callback related to specific index frame
     */
    handleFrameIndex.fire({ currentFrame, time, fps });

    /**
     * Fire handleCache callback
     */
    handleCache.fire(currentFrame);

    /**
     * Update currentFrame
     */
    currentFrame++;
    eventStore.quickSetProp('currentFrame', currentFrame);

    /**
     * Reset props
     */
    callback.length = 0;
    isStopped = false;

    const deferredNextTick = eventStore.getProp('deferredNextTick');

    if (deferredNextTick) {
        useNextLoop(() => nextTickFn());
    } else {
        nextTickFn();
    }
};

/**
 * Init new frame if is not running
 *
 * @returns {void}
 */
const initFrame = () => {
    if (isFrameRuning) return;

    if (typeof globalThis === 'undefined') {
        setTimeout(() => render(getTime()), defaultTimestep);
    } else {
        requestAnimationFrame(render);
    }

    isFrameRuning = true;
};

/**
 * Execute a callback within the first available request animation frame. Use this method to modify elements of the DOM
 */
export const handleFrame = (() => {
    /**
     * Calculate a precise fps
     */
    loadFps();

    /**
     * Stop timer when user change tab
     */
    handleVisibilityChange(({ visibilityState }) => {
        isStopped = visibilityState !== 'visible';
    });

    catchAnimationReject();

    // Call new requestAnimationFrame on event emit
    eventStore.watch('requestFrame', () => {
        initFrame();
    });

    /**
     * Get current fps
     *
     * @returns {number}
     */
    const getFps = () => fps;

    /**
     * Return the mustMakeSomethingIsActive status. If frame dropped the value is true for X seconds.
     *
     * @returns {boolean}
     */
    const mustMakeSomething = () => requiresMakeSomethingState; // eslint-disable-line unicorn/consistent-boolean-name -- public MobCore API name

    /**
     * Return the mustMakeSomethingIsActive status. If frame dropped the value is true for X seconds.
     *
     * @returns {boolean}
     */
    const shouldMakeSomething = () => shouldMakeSomethingState;

    /**
     * Add callback
     *
     * @example
     *     ```javascript
     *     handleFrame.add(({ fps, time }) => {
     *         // code ...
     *     });
     *
     *     ```;
     *
     * @param {import('./type.js').HandleFrameCallbak} cb - Callback function
     * @returns {void}
     */
    const add = (cb) => {
        callback.push(cb);
        initFrame();
    };

    /**
     * Add an array of callback
     *
     * @param {import('./type.js').HandleFrameArray} arr - Array of callback
     */
    const addMultiple = (arr = []) => {
        callback = [...callback, ...arr];
        initFrame();
    };

    return {
        add,
        addMultiple,
        getFps,
        mustMakeSomething,
        shouldMakeSomething,
    };
})();
