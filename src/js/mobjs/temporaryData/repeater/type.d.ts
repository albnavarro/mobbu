import { emitType, setType, watchType } from '../../../mobCore/store/type';

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
    getChildren: (arg0: string) => string[];
    id: string;
    clean: boolean;
    key: string | undefined;
    state: string | undefined;
    setState: setType;
    watch: watchType;
    emit: emitType;
    render: (arg0: { sync: object; html: (arg0: string) => string }) => string;
}

export interface watchListType extends repeaterType {
    repeaterParentElement: HTMLElement;
    repeatId: string;
}
