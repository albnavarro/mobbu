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
    getChildren: function;
    id: string;
    clean: boolean;
    key: string | undefined;
    state: string | undefined;
    setState(
        prop: string,
        newValue: any,
        fireCallback?: Boolean,
        clone?: Boolean
    ): void;
    watch: (
        propierties: string,
        callback: simpleStoreWatchCallbackType
    ) => void;
    emit: function;
    render: function;
}
