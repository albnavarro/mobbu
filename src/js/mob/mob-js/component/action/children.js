import { componentMap } from '../component-map';
import { getElementById } from './element';
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
 * Update children order of a component
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @param {(HTMLElement | undefined)[]} [obj.filterBy]
 * @returns {void}
 */
export const updateChildrenOrder = ({ id, componentName, filterBy = [] }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    const components = getChildrenIdByName({ id, componentName });
    const componentsIdFiltered = components
        .map((id) => {
            return { id, element: getElementById({ id }) };
        })
        .filter(({ element }) => {
            return filterBy.length > 0 ? filterBy.includes(element) : true;
        })
        .toSorted((a, b) => {
            const { element: elementA } = a;
            const { element: elementB } = b;
            if (elementA === elementB || !elementA || !elementB) return 0;
            if (elementA.compareDocumentPosition(elementB) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ id }) => id);

    const item = componentMap.get(id);
    if (!item) return;

    const { child } = item;
    componentMap.set(id, {
        ...item,
        child: {
            ...child,
            [componentName]: componentsIdFiltered,
        },
    });
};

/**
 * Get a chunked array of children sorted by DOM position Compare the first element of each chunk
 *
 * @param {object} obj
 * @param {string[][]} obj.children
 * @returns {string[][]}
 */
export const gerOrderedChunkByDOMPosition = ({ children }) => {
    return children
        .map((currentChildren) => {
            return {
                childrenId: currentChildren,
                element: getElementById({ id: currentChildren?.[0] }),
            };
        })
        .toSorted((a, b) => {
            // @ts-ignore
            if (a.element.compareDocumentPosition(b.element) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ childrenId }) => childrenId);
};

/**
 * Ordiniamo i gruppi di figli in base a una propietá condivisa tra i due set:
 *
 * - I dati : current | currentParsed
 * - I gruppi di componenti : children
 *
 * Se abbiamo una chiave ordinamo i gruppi di componenti in base alla sua posizione nei dati.
 *
 * UseIndex
 *
 * Case useIndex = false ( repater con chiave );
 *
 * - Usiamo il valore di key per eseguire l' ordinamento.
 *
 * Case useIndex = true ( repater senza chiave );
 *
 * - Opzione non usata in quanto ridondante.
 * - ChunkIdsByCurrentValue non puó avere creato conflitti di index
 * - Non ci possono essere indici 0 e _0, gli elementi vengono sempre aggiunti o tolti.
 * - Se si aggiuno nuovi componenti la situazione sará sempre:
 * - Valori di groups prima di uscire da chunkIdsByCurrentValue sono: 0, 1, 2, _3, _4, ( _3, _4 sono nuove aggiunte ).
 * - Valori in uscita da chunkIdsByCurrentValue 0, 1, 2, 3, 4 etc...
 * - Potrebbe essere un' opzione di sicurezza se i children non dovessero essere presi dalla mappa in ordine corretto.
 * - Ma é un caso estremo:
 * - GetIdsByByRepeatId: Dovrebbe giá tornare i componenti nel giusto ordine.
 * - ChunkIdsByCurrentValue: Questo modulo poi si assicura che se non ci sono conflitti di index i componenti siano
 *   ordinati secondo la loro index corrente.
 *
 * @param {object} obj
 * @param {string[][]} obj.children
 * @param {string} obj.key
 * @param {Record<string, any>[]} obj.current
 * @param {Record<string, any>[]} obj.currentUnivoque
 * @param {boolean} [obj.useIndex]
 * @returns {string[][]}
 */
export const getOrderedChunkByCurrentRepeatValue = ({
    children,
    key,
    current,
    currentUnivoque,
    useIndex = false,
}) => {
    const currentParsed = useIndex ? current : currentUnivoque;

    /**
     * - Aggiungiamo le propietá index && key ai gruppi di componenti.
     * - Index && key vengono prese direttamante dell' oggetto currentRepeaterState specifico pe rogni componente.
     */
    const childrenRemapped = children.map((items) => {
        /**
         * Per ogni gruppo ci basta sapere il valore di un elemento, ogni gruppo condivide le stesse informazioni.
         */
        const { index: indexValue, current: currentValue } =
            getRepeaterStateById({
                id: items?.[0],
            });

        return {
            index: indexValue,
            key: currentValue?.[key],
            items,
        };
    });

    /**
     * Creiamo un nuovo array parentedo da currentParsed in cui mappiamo le seguenti propietá:
     *
     * - Index:
     * - Key props
     */
    const currentRemapped = currentParsed.map((item, index) => ({
        index,
        key: item?.[key],
    }));

    /**
     * TODO: questa operazione puó essere semplificata nella complessita algoritmica.
     *
     * La mappa dei dati rispetta l'ordine corretto.
     *
     * - Creiamo da questa un nuvo array usando come riferimento la propietá `key` o `index`.
     * - Usiamo l'ordine corretto dei dati per ordinare i gruppi di figli.
     */
    const orderdChildren = currentRemapped
        .map((currentItem) => {
            const prop = useIndex ? 'index' : 'key';

            return childrenRemapped.find(
                (childrenItem) => childrenItem[prop] === currentItem[prop]
            );
        })
        .filter((item) => item !== undefined);

    /**
     * Return chunk of ids.
     */
    return orderdChildren.map(({ items }) => items);
};
