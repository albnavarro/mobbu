import { emitType, setType, watchType } from '../../../mobCore/store/type';

/**
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export interface repeaterType {
    beforeUpdate(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: string[];
    }): Promise<void>;
    afterUpdate(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: string[];
    }): void;
    id: string;
    clean: boolean;
    key: string | undefined;
    state: string | undefined;
    setState: setType;
    watch: watchType;
    emit?: emitType;
    render: (arg0: {
        sync: () => string;
        html?: (
            template: { raw: readonly string[] | ArrayLike<string> },
            ...substitutions: any[]
        ) => string;
    }) => string;
}

export interface watchListType extends repeaterType {
    repeatId: string;
}

export interface currentRepeaterState {
    current: object;
    index: number;
}
