import { checkType } from '../../../../mob-core/store/store-type.js';
import { sliceIntoChunks, arrayColumn } from '../animation-utils.js';
import {
    STAGGER_START,
    STAGGER_END,
    STAGGER_CENTER,
    STAGGER_EDGES,
    STAGGER_RANDOM,
    DIRECTION_ROW,
} from './stagger-costant.js';
import { getEachByFps } from './stagger-utils.js';

/**
 * @param {number} num
 * @returns Boolean
 */
const isOdd = (num) => num % 2;

/**
 * @param {number} max
 * @returns Number
 */
const getRandomInt = (max) => Math.floor(Math.random() * max);

/**
 * Get random frame without duplicate
 *
 * @template {any[]} T
 * @param {T} arrayChunk
 * @param {number} each
 * @param {number} index
 * @returns Number
 */
export const getRandomChoice = (arrayChunk, each, index) => {
    // Get previous result
    const previousFrame = new Set(
        arrayChunk.slice(0, index).map((item) => item.frame)
    );

    // Get possible result
    const posibileFrame = arrayChunk.map((_item, i) => i * each);

    // Get array of possible result without previous
    const randomChoice = posibileFrame.filter((x) => !previousFrame.has(x));

    return randomChoice;
};

/**
 * Get frame per index
 *
 * @param {number} index
 * @param {number} arraylenght
 * @param {import('./type.js').StaggerObject} stagger
 * @param {number[]} randomChoice
 * @returns {{ index: number; frame: number }}
 */
const getStaggerIndex = (index, arraylenght, stagger, randomChoice = []) => {
    const { from, each } = stagger;
    /*
    Get stagger each by fps
    */
    const eachByFps = getEachByFps(each);

    if (from === STAGGER_RANDOM) {
        return {
            index: index,
            frame: (() => randomChoice[getRandomInt(randomChoice.length)])(),
        };
    }

    if (from === STAGGER_START) {
        return {
            index: index,
            frame: index * eachByFps,
        };
    }

    if (from === STAGGER_END) {
        return {
            index: index,
            frame: (arraylenght - 1 - index) * eachByFps,
        };
    }

    if (from === STAGGER_CENTER) {
        const half = Math.trunc(arraylenght / 2);

        return (() => {
            if (index > half) {
                // From 0 half
                return {
                    index: index,
                    frame: (index - half) * eachByFps,
                };
            }

            if (index < half) {
                // From half to end half
                return isOdd(arraylenght) === 0 && half - index === 1
                    ? {
                          index: index,
                          frame: 0,
                      } // Center with even array
                    : (() => {
                          return isOdd(arraylenght) === 0
                              ? {
                                    index: index,
                                    frame: (half - index - 1) * eachByFps,
                                }
                              : {
                                    index: index,
                                    frame: (half - index) * eachByFps,
                                };
                      })();
            }

            return {
                index: index,
                frame: 0,
            }; // center item
        })();
    }

    if (from === STAGGER_EDGES) {
        const half = Math.trunc(arraylenght / 2);

        return (() => {
            if (index > half) {
                // From 0 half
                return {
                    index: index,
                    frame:
                        (arraylenght - half - 1 - (index - half)) * eachByFps,
                };
            }

            if (index < half) {
                // From half to end half
                return isOdd(arraylenght) === 0 && half - index === 1
                    ? {
                          index: index,
                          frame: (half - 1) * eachByFps,
                      }
                    : (() => {
                          return isOdd(arraylenght) === 0
                              ? {
                                    index: index,
                                    frame:
                                        (arraylenght - half - (half - index)) *
                                        eachByFps,
                                }
                              : {
                                    index: index,
                                    frame:
                                        (arraylenght -
                                            half -
                                            1 -
                                            (half - index)) *
                                        eachByFps, // dfault,
                                };
                      })();
            }

            return isOdd(arraylenght)
                ? {
                      index: index,
                      frame: half * eachByFps, // dfault,
                  }
                : {
                      index: index,
                      frame: (half - 1) * eachByFps, // dfault,
                  }; // center item
        })();
    }

    if (from && checkType(Number, from)) {
        // Secure check from must be a value in array length

        // @ts-ignore
        const half = from >= arraylenght ? arraylenght - 1 : from;

        return (() => {
            // @ts-ignore
            if (index > half) {
                // From 0 half
                return {
                    index: index,
                    // @ts-ignore
                    frame: (index - half) * each,
                };
            }

            // @ts-ignore
            if (index < half) {
                // From half to end half
                return {
                    index: index,
                    // @ts-ignore
                    frame: (half - index) * each,
                };
            }

            return {
                index: index,
                frame: 0,
            };
        })();
    }

    return {
        index: 0,
        frame: 0,
    };
};

/**
 * Default grid direction is COL In case of ROW grid convert col to row, something like rotate the matrix
 *
 * @template {any[]} T
 * @param {T} arrayDefault
 * @param {import('./type.js').StaggerObject} stagger
 * @param {number} chunckSizeCol
 * @returns {T} Arr
 */
const getItemsByRow = (arrayDefault, stagger, chunckSizeCol) => {
    // Reorder main array if direction === row
    if (stagger.grid.direction === DIRECTION_ROW) {
        const chunkByCol = sliceIntoChunks(arrayDefault, chunckSizeCol);

        const colToRowArray = [
            ...Array.from({ length: stagger.grid.col }).keys(),
            // @ts-ignore
        ].reduce((p, _c, i) => {
            return [...p, ...arrayColumn(chunkByCol, i)];
        }, []);

        // @ts-ignore
        return [...colToRowArray].flat();
    } else {
        return arrayDefault;
    }
};

/**
 * @type {import('./type.js').SetStagger}
 */
export const getDefaultStagger = ({
    arrayDefault,
    arrayOnStop,
    stagger,
    slowlestStagger,
    fastestStagger,
}) => {
    /**
     * If col/row is 1 use length of array, is used for default stagger without grid. With a value greater than 1
     * row/col logic is active
     */
    const chunckSizeCol =
        stagger?.grid?.col <= 1 ? arrayDefault.length : stagger.grid.col;
    const chunckSizeRow =
        stagger?.grid?.row <= 1 ? arrayDefault.length : stagger.grid.row;

    // main callBack
    const itemByRow = getItemsByRow(arrayDefault, stagger, chunckSizeCol);
    const staggerArray = itemByRow.map((item) => {
        return item && item !== undefined ? item : { index: 0, frame: 0 };
    });

    // onComplete callBack
    const itemCompleteByRow = getItemsByRow(
        arrayOnStop,
        stagger,
        chunckSizeCol
    );
    const staggerArrayOnComplete = itemCompleteByRow.map((item) => {
        return item && item !== undefined ? item : { index: 0, frame: 0 };
    });

    const chunksize =
        stagger.grid.direction === DIRECTION_ROW
            ? chunckSizeRow
            : chunckSizeCol;

    // get chunkes array
    const chunked = sliceIntoChunks(staggerArray, chunksize);
    const firstChunk = chunked[0];

    // Get First row stagger
    firstChunk.forEach((item, i) => {
        const { index, frame } = getStaggerIndex(
            i,
            chunked[0].length,
            stagger,
            getRandomChoice(firstChunk, stagger.each, i)
        );

        item.index = index;
        item.frame = frame;

        if (frame >= slowlestStagger.frame)
            slowlestStagger = {
                index,
                frame,
            };

        if (frame <= fastestStagger.frame)
            fastestStagger = {
                index,
                frame,
            };
    });

    // Set other chunk, copy from first [0]
    chunked.forEach((chunkItem) => {
        chunkItem.forEach((item, i) => {
            if (item) {
                item.index = chunked[0][i].index;
                item.frame = chunked[0][i].frame;
            }
        });
    });

    // Flat the chunked array
    const flatArray = chunked.flat();

    // set data to original (this.callback) array
    flatArray.forEach((item, i) => {
        staggerArray[i].index = item.index;
        staggerArray[i].frame = item.frame;

        // If there an OnCompelte callback
        if (staggerArrayOnComplete.length > 0) {
            staggerArrayOnComplete[i].index = item.index;
            staggerArrayOnComplete[i].frame = item.frame;
        }
    });

    return {
        staggerArray,
        staggerArrayOnComplete,
        fastestStagger,
        slowlestStagger,
    };
};
