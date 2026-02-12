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
 * Ragguppa tutti gli id dei componenti per gruppi, ogni gruppo conterrá i componenti definiti nel return del repeat.
 *
 * Children e previousChildren contengono gli id dei vecchi e nuovi componenti.
 *
 * - Vengono usati i vecchi componenti e i nuovi componenti per avere un `gancio` per raggrupparli piú semplicemente.
 * - Sappiamo il valore fresco di `currentRepeaterState.index` dei nuovi componenti aggiunti, ma lo stesso puo collidere
 *   con il valore corrispondente dei componenti persistenti non ancora aggiornati.
 * - Con un confronto sui vecchi componenti possiamo disaccoppiare i valori di `currentRepeaterState.index` dei vecchi e
 *   quello dei nuovi che puó collidere con un trick ( aggiungenedo il prefisso `_` ).
 *
 * Logica aper risolvere i conflitti:
 *
 * - I valore di currentRepeaterState.index per ogni componente persistente non é agiornato.
 * - I valori di currentRepeaterState.index per i nuovi componenti é fresco e coerente.
 * - Questo vuol dire che il valore di `index` dei nuovi componenti e dei componenti persistenti puó collidere.
 * - Gli elementi persistenti useranno il valore di index corrente ( ma obsoleto ) per identificare il gruppo.
 * - I nuovi elementi usaranno un index univoco che modifica l'ideax reale in modo da non creare conflitti di chiave:
 *   `_${index}`.
 * - In questo modo possono essere raggruppati in un gruppo univoco.
 *
 * SE REPATER NON USA LA CHIAVE ( KEY ):
 *
 * - In questo caso children e previousChildren non avranno valori di index in comune.
 * - Gli elementi vengono solo tolti o aggiunti e mai rimescolati, i componenti persisitenti conservano la propia index.
 * - I gruppi persisitenti e nuovi saranno ordinati ripetto a index.
 * - Questo vuol dire che se children non fosse ordinato i componenti persisitenti uscirebbero riordinati rispetto a index
 * - Ricordiamoci che in javascript:
 *
 *   ```javascript
 *   const obj = {};
 *   obj[5] = 'cinque';
 *   obj[0] = 'zero';
 *   obj[10] = 'dieci';
 *
 *   Object.values(obj);
 *
 *   ['zero', 'cinque', 'diece'];
 *   ```
 *
 * @param {object} obj
 * @param {string[]} obj.children - Component id collection
 * @param {string[]} [obj.previousChildren] - Component id collection
 * @param {boolean} obj.hasKey
 * @returns {string[][]}
 */
export const chunkIdsByCurrentValue = ({
    children,
    previousChildren = [],
    hasKey,
}) => {
    const previousSet = new Set(previousChildren);
    const hasPrevious = previousChildren.length > 0;

    /** @type{Record<string, any>} */
    const groups = {};

    for (const child of children) {
        const { index } = getRepeaterStateById({ id: child });

        /**
         * Senza chiave non ci possono essere conflitti di index.
         *
         * - Uisamo sempre index per mantenere l'ordinamento del valore di index originale.
         */
        const key =
            hasKey && hasPrevious && !previousSet.has(child)
                ? `_${index}`
                : index;

        if (groups[key]) {
            groups[key].push(child);
        } else {
            groups[key] = [child];
        }
    }

    return Object.values(groups);
};

/**
 * Ordiniamo i gruppi di figli in base a una propietá condivisa tra i due set:
 *
 * - I dati : currentUnivoque
 * - I gruppi di componenti : children
 * - I gruppo verrano ordinati usando key come propietá condivisa.
 *
 * @param {object} obj
 * @param {string[][]} obj.children
 * @param {string} obj.key
 * @param {Record<string, any>[]} obj.data
 * @returns {string[][]}
 */
export const getOrderedChunkByCurrentRepeatValue = ({
    children,
    key,
    data,
}) => {
    /**
     * Se il repeat corrente non usa componenti children puó avere lunghezza pari a 0.
     */
    if (!children?.length || !data?.length) return [];

    /**
     * Creiamo una new Map dove:
     *
     * - Key: é il valore associato alla chiave del repeter.
     * - Value: é il gruppo con gli id dei componenti.
     */
    const childrenMap = new Map(
        children.map((group) => {
            /**
             * - Prendiamo in considerazione solo il primo id del gruppo
             * - Fanno parte dello stesso gruppo e condividono gli stessi dati.
             * - GetRepeaterStateById riterá sempre un valore, gestisce internamente il fallback.
             */
            const { current } = getRepeaterStateById({ id: group[0] });
            return [current[key], group];
        })
    );

    /**
     * A questo punto il controllo e semplice.
     *
     * - Il valore corrispondente a key in data corrisponda ad una chiave nella nuova mappa.
     * - `childrenMap.get(item[key])`, qui prederemo il gruppo di id ( component id ) corrispondente alla chiave.
     */
    return data
        .map((item) => childrenMap.get(item[key]))
        .filter((item) => item !== undefined);
};
