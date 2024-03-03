import { simpleStoreWatchCallbackType } from '../../../mobCore/store/type';

/**
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export interface repeaterType {
    afterUpdate(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: Array<string>;
    }): void;
    beforeUpdate(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: Array<string>;
    }): void;
    getChildren: () => void;
    id: string;
    clean: boolean;
    key: string | undefined;
    state: string | undefined;
    setState(
        prop: string,
        newValue: any,
        fireCallback?: boolean,
        clone?: boolean
    ): void;
    watch: (
        propierties: string,
        callback: simpleStoreWatchCallbackType
    ) => void;
    emit: (arg0: string) => void;
    render: (arg0: { sync: object; html: (arg0: string) => string }) => string;
}

export interface watchListType extends repeaterType {
    repeaterParentElement: HTMLElement;
    repeatId: string;
}
