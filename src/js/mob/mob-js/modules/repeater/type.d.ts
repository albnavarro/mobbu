import {
    MobStoreEmit,
    MobStoreSet,
    MobStoreWatch,
} from '../../../mob-core/store/type';

export type RepeaterRender = (arg0: {
    sync: () => string;
    initialIndex: number;
    initialValue: Record<string, any>;
    current: any;
}) => string;

/**
 * Add new repeater id and props. Tehe repeater will execute after component render.
 */
export interface Repeater {
    beforeUpdate(): Promise<void> | void;
    afterUpdate(): void;
    id: string;
    clean: boolean;
    persistent?: boolean;
    key: string | undefined;
    state: string | undefined;
    setState: MobStoreSet;
    watch: MobStoreWatch;
    emit?: MobStoreEmit;
    render: RepeaterRender;
    useSync: boolean;
}

export interface WatchList extends Repeater {
    repeatId: string;
}

export interface CurrentRepeaterState {
    current: Record<string, any>;
    index: number;
}

export type RepeatFunctionMap = Map<
    string,
    { repeatId: string; fn: () => void; unsubscribe: () => void }[]
>;

export type RepeatIdHostMap = Map<string, HTMLElement>;

export type RepeatIdPlaceHolderMap = Map<
    string,
    {
        element: HTMLElement | undefined;
        initialized: boolean;
        scopeId: string | undefined;
        key: string;
        children: {
            index: number;
            value: any;
            element: HTMLElement;
        }[];
        initialRenderWithoutSync: Element[];
    }
>;
