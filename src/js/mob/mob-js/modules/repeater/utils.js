// @ts-check

import { MobCore } from '../../../mob-core';
import { getRepeaterStateById } from '../../component/action/repeater';

/**
 * Extract from collectionA item not found in collectionB
 *
 * - CollectionA && collectionB should be a object
 * - Compare value for specific key
 * - Value should be number or string, comparison is a simple `===.`
 *
 * @param {Record<string, any>[]} collectionA
 * @param {Record<string, any>[]} collectionB
 * @param {string} key
 * @returns {any[]}
 */
export const getItemToRemoveByKey = (
    collectionA = [],
    collectionB = [],
    key = ''
) => {
    const valuesInB = new Set(collectionB.map((item) => item?.[key]));
    return collectionA.filter((item) => !valuesInB.has(item?.[key]));
};

/**
 * Identifies new elements in the current dataset by comparing against previous data.
 *
 * For each element in `current`, checks if it existed in `previous` based on a key value. Returns metadata for each
 * element indicating whether it's new and its position.
 *
 * @example
 *     const current = [{ id: 1 }, { id: 2 }, { id: 3 }];
 *     const previous = [{ id: 1 }, { id: 3 }];
 *
 *     mixPreviousAndCurrentData(current, previous, 'id');
 *
 *     // Returns: [
 *     //   { isNewElement: false, keyValue: 1, index: 0 },
 *     //   { isNewElement: true, keyValue: 2, index: 1 },
 *     //   { isNewElement: false, keyValue: 3, index: 2 }
 *     // ]
 *
 * @param {any[]} collectionA
 * @param {any[]} collectionB
 * @param {string} key
 * @returns {{ isNewElement: boolean; keyValue: string; index: number }[]}
 */
export const mixPreviousAndCurrentData = (
    collectionA = [],
    collectionB = [],
    key = ''
) => {
    const previousKeys = new Set(collectionB.map((el) => el?.[key]));
    return collectionA.map((el, index) => ({
        isNewElement: !previousKeys.has(el?.[key]),
        keyValue: el?.[key],
        index,
    }));
};

/**
 * Check if all new item in list has key.
 *
 * @param {object} obj
 * @param {any[]} obj.arr
 * @param {string} obj.key
 * @returns {boolean}
 */
const arrayhaskey = ({ arr = [], key = '' }) => {
    return arr.every((/** @type {object} */ item) => {
        return MobCore.checkType(Object, item) && key in item;
    });
};

/**
 * Check if current and previous array has key.
 *
 * @param {object} obj
 * @param {any[]} obj.current
 * @param {any[]} obj.previous
 * @param {string} obj.key
 * @returns {boolean}
 */
export const listKeyExist = ({ current, previous, key }) => {
    return (
        arrayhaskey({ arr: current, key }) &&
        arrayhaskey({ arr: previous, key })
    );
};

/**
 * Returns unique elements from an array based on a specific key value.
 *
 * - Keeps only the first occurrence of each key value, removing subsequent duplicates.
 *
 * @param {object} obj
 * @param {any[]} obj.data - Array of objects to deduplicate
 * @param {string} obj.key - Property key used for uniqueness check
 * @returns {Record<string, any>[]} Array with unique elements by key
 */
export const getUnivoqueByKey = ({
    data: currentCollection = [],
    key = '',
}) => {
    const seen = new Set();

    return currentCollection.filter((item) => {
        const value = item?.[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
    });
};

/**
 * Children e previousChildren contengono gli id dei vecchi e nuovi componenti.
 *
 * - Venfono usati i vecchi componenti e i nuovi componenti per avere un `gancio` per raggrupparli piú semplicemente.
 * - Sappiamo il valore fresco di `currentRepeaterState.index` dei nuovi componenti aggiunti, ma lo stesso puo collidere
 *   con i vecchi componenti non ancora aggironati
 * - Con un contronto sui vecchi componenti possiamo disaccoppiare i valori di `currentRepeaterState.index` dei vecchi e
 *   quello dei nuovi che puó collidere.
 *
 * Ribadendo:
 *
 * - Lo scopo é raggruppare i componenti in children per repeater item, sfruttando il valore di
 *   `currentRepeaterState.index`
 * - Ogni gruppo conterrá i componenti definiti all'interno del return del repeater.
 * - Questo permetterá poi di aggiornare per ogni gruppo i valori di `currentRepeaterState`.
 *
 * Logica aper risolvere i conflitti:
 *
 * - I valore di currentRepeaterState per ogni componente persistente non é agiornato.
 * - I valori di currentRepeaterState per i nuovi componenti é fresco e coerente.
 * - Questo vuol dire che il valore di `index` dei nuovi componenti e dei componenti persistenti puó collidere.
 * - Gli elementi persistenti useranno il valore di index corrente ( ma obsoleto ) per identificare il gruppo.
 * - I nuovi elementi usaranno un index univoco che modifica l'ideax reale in modo da non creare conflitti di chiave:
 *   `_${index}`.
 * - In questo modo possono essere raggruppati in un gruppo univoco.
 *
 * @param {object} obj
 * @param {string[]} obj.children - Component id collection
 * @param {string[]} [obj.previousChildren] - Component id collection
 * @returns {string[][]}
 */
export const chunkIdsByCurrentValue = ({ children, previousChildren = [] }) => {
    const previousSet = new Set(previousChildren);
    const hasPrevious = previousChildren.length > 0;

    /** @type{Record<string, any>} */
    const groups = {};

    for (const child of children) {
        const { index } = getRepeaterStateById({ id: child });

        const key =
            hasPrevious && !previousSet.has(child) ? `_${index}` : index;

        if (groups[key]) {
            groups[key].push(child);
        } else {
            groups[key] = [child];
        }
    }

    return Object.values(groups);
};
