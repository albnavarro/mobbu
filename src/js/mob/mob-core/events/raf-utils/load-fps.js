import { eventStore } from '../event-store';

/**
@type {boolean}
*/
let isFpsReady = false;

/**
@type {Promise<import('./type').LoadFps> | null}
*/
let pendingPromise = null;

/**
 * Primi frame scartati (warm-up).
 *
 * - Al caricamento il main thread è occupato (parsing, layout, font, immagini).
 * - I primi frame sono spesso lunghi e seguiti da frame di recupero molto brevi.
 *
 * @type {number}
 */
const WARMUP_FRAMES = 5;

/**
 * Numero minimo di intervalli misurati, anche se `duration` è molto basso.
 *
 * @type {number}
 */
const MIN_MEASURED_FRAMES = 10;

/**
 * Range accettato per il valore finale.
 *
 * - Il limite inferiore si applica solo al risultato, non ai singoli frame: un clamp per frame rende la media
 *   asimmetrica e la sovrastima.
 *
 * @type {number}
 */
const MIN_FPS = 60;

/**
 * @type {number}
 */
const MAX_FPS = 240;

/**
 * Refresh rate comuni dei monitor.
 *
 * @type {number[]}
 */
const COMMON_REFRESH_RATES = [60, 72, 75, 90, 100, 120, 144, 165, 180, 240];

/**
 * Tolleranza relativa simmetrica: aggancio al refresh rate comune più vicino (sopra o sotto).
 *
 * @type {number}
 */
const SNAP_TOLERANCE_NEAREST = 0.03;

/**
 * Tolleranza relativa verso l'alto: aggancio al primo refresh rate comune superiore.
 *
 * - L'errore di misura è quasi sempre per difetto: frame persi o in ritardo allungano il tempo misurato, mentre i
 *   frame non possono arrivare più spesso del vsync.
 * - Per questo si recupera un margine più ampio solo verso l'alto.
 *
 * @type {number}
 */
const SNAP_TOLERANCE_UP = 0.1;

/**
 * Normalizza il valore misurato. Il risultato è limitato a [MIN_FPS, MAX_FPS].
 *
 * 1. Se entro SNAP_TOLERANCE_NEAREST da un refresh rate comune -> quel valore.
 * 2. Altrimenti se entro SNAP_TOLERANCE_UP dal primo refresh rate comune superiore -> quel valore.
 * 3. Altrimenti il valore arrotondato.
 *
 * @param {number} fps
 * @returns {number}
 */
const normalizeFps = (fps) => {
    if (!Number.isFinite(fps) || fps <= 0) return MIN_FPS;

    const clamped = Math.min(Math.max(fps, MIN_FPS), MAX_FPS);

    const nearest = COMMON_REFRESH_RATES.reduce((prev, current) =>
        Math.abs(current - clamped) < Math.abs(prev - clamped)
            ? current
            : prev
    );

    if (Math.abs(nearest - clamped) / nearest <= SNAP_TOLERANCE_NEAREST)
        return nearest;

    const nextUp = COMMON_REFRESH_RATES.find((rate) => rate >= clamped);

    return nextUp && (nextUp - clamped) / nextUp <= SNAP_TOLERANCE_UP
        ? nextUp
        : Math.round(clamped);
};

/**
 * - Runs a request animation frame loop to detect the frame rate of the monitor. After the method will be resolved the
 *   first time, subsequent calls will be resolved immediately returning the previously calculated value. The method is
 *   launched the first time automatically at the first loading.
 * - Fps is calculated as measured frames / elapsed time (not as average of per-frame fps, that is biased by short
 *   frames), after discarding the first warm-up frames, then snapped to the nearest common refresh rate.
 *
 * @param {object} params
 * @param {boolean} [params.force]
 * @param {number} [params.duration] - Total number of frames, warm-up included.
 * @returns {Promise<import('./type').LoadFps>} The promise launched after the loop
 */
export const loadFps = ({ force = false, duration = 30 } = {}) => {
    if (isFpsReady && !force) {
        const { instantFps } = eventStore.get();
        return Promise.resolve({ averageFPS: instantFps });
    }

    /**
     * Concurrency.
     *
     * - Return always first primise generated.
     */
    if (pendingPromise) {
        return pendingPromise;
    }

    /**
     * Intervalli da misurare dopo il warm-up.
     *
     * @type {number}
     */
    const measuredFrames = Math.max(
        duration - WARMUP_FRAMES,
        MIN_MEASURED_FRAMES
    );

    pendingPromise = new Promise((resolve) => {
        /**
         * Frame ricevuti finora.
         *
         * @type {number}
         */
        let frameCounter = 0;

        /**
         * Timestamp di inizio misura (fine warm-up).
         *
         * @type {number}
         */
        let startTime = 0;

        /**
         * @param {number} now
         */
        const render = (now) => {
            frameCounter++;

            /**
             * Warm-up: l'ultimo frame del warm-up diventa il punto di partenza della misura.
             */
            if (frameCounter <= WARMUP_FRAMES) {
                startTime = now;
                requestAnimationFrame(render);
                return;
            }

            const intervals = frameCounter - WARMUP_FRAMES;

            if (intervals < measuredFrames) {
                requestAnimationFrame(render);
                return;
            }

            /**
             * Fps = intervalli / tempo totale. Un singolo frame anomalo (molto lungo o molto breve) incide solo per la
             * sua durata reale, senza sbilanciare il risultato.
             */
            const elapsed = now - startTime;
            const averageFPS = normalizeFps((intervals * 1000) / elapsed);

            eventStore.quickSetProp('instantFps', averageFPS);
            isFpsReady = true;
            pendingPromise = null;
            resolve({ averageFPS });
        };

        requestAnimationFrame(render);
    });

    return pendingPromise;
};
