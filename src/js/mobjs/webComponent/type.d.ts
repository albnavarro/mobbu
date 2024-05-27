/**
 * TODO: usare la definizione di classe con i metodo al posto o in union-type
 * nella funzione parseComponentRecursive e funzioni utils
 */
export class userComponent extends HTMLElement {
    getComponentName: () => string;
    getId: () => void;
    setId: (arg0: string) => void;
    getParentId: () => string;
    setParentId: (arg0: string) => void;
    getIsPlaceholder: () => boolean;
    getInstanceName: () => string;
    getStaticPropsId: () => string | undefined | null;
    getDynamicPropsid: () => string | undefined | null;
    getBindEventsId: () => string | undefined | null;
    getCurrentKey: () => string | undefined | null;
    setDynamicPropsFromSlotId: (arg0: string) => void;
    getDynamicPropsFromSlotId: () => string;
    setPropsFromSlotId: (arg0: string) => void;
    getPropsFromSlotId: () => string;
    getRepeatValue: () => string | undefined | null;
    getSlotPosition: () => string | undefined | null;
    getDelegateEventId: () => string | undefined | null;
    getComponentRepeatId: () => string | undefined | null;
}
