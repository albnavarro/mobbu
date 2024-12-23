import { emitType, setType, watchType } from '../../../mobCore/store/type';

export type RepeaterRender = (arg0: {
    sync: () => string;
    initialIndex: number;
    initialValue: Record<string, any>;
    current: any;
    html?: (
        template: { raw: readonly string[] | ArrayLike<string> },
        ...substitutions: any[]
    ) => string;
}) => string;

/**
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export interface repeaterType {
    beforeUpdate(): Promise<void> | void;
    afterUpdate(): void;
    id: string;
    clean: boolean;
    persistent?: boolean;
    key: string | undefined;
    state: string | undefined;
    setState: setType;
    watch: watchType;
    emit?: emitType;
    render: RepeaterRender;
    useSync: boolean;
}

export interface watchListType extends repeaterType {
    repeatId: string;
}

export interface currentRepeaterState {
    current: object;
    index: number;
}

export type RepeatFunctionMap = Map<
    string,
    { repeatId: string; fn: () => void; unsubscribe: () => void }[]
>;

export type RepeatIdHostMap = Map<string, HTMLElement>;

export type RepeatIdPlaceHolderMap = Map<
    string,
    { element: HTMLElement; initialized: boolean; scopeId: string | undefined }
>;
