import { componentMap } from '../component-map';
import { getRepeaterStateById } from './repeater';

/**
 * Get children id.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {string[] | []}
 */
export const getChildrenById = ({ id = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return Object.values(child).reduce(
        (current, previous) => [...previous, ...current],
        []
    );
};

/**
 * Get children id.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {string[] | []}
 */
export const getChildrenIdByName = ({ id = '', componentName = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return child?.[componentName] ?? [];
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
