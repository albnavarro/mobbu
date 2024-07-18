export class userComponent extends HTMLElement {
    getComponentName: () => string;
    getId: () => string;
    setId: (arg0: string) => void;
    getParentId: () => string;
    setParentId: (arg0: string) => void;
    getIsPlaceholder: () => boolean;
    getInstanceName: () => string;
    getStaticPropsId: () => string | undefined;
    getDynamicPropsid: () => string | undefined;
    getBindEventsId: () => string | undefined;
    getCurrentKey: () => string | undefined;
    setDynamicPropsFromSlotId: (arg0: string) => void;
    getDynamicPropsFromSlotId: () => string;
    setPropsFromSlotId: (arg0: string) => void;
    getPropsFromSlotId: () => string;
    getRepeatValue: () => string | undefined;
    getSlotPosition: () => string | undefined;
    getDelegateEventId: () => string | undefined;
    getComponentRepeatId: () => string | undefined;
    getRepeaterPropBind: () => string | undefined;
    getComponentRepeatContext: () => string | undefined;
    setComponentRepeaterContext: (arg0: string) => void;
}

export class repeaterComponent extends HTMLElement {
    removeCustomComponent: () => void;
    getRepeatId: () => string | undefined;
}

export class slotComponent extends HTMLElement {
    removeCustomComponent: () => void;
    getSlotName: () => string | undefined;
    getStaticProps: () => string | undefined;
    getDynamicProps: () => string | undefined;
}
