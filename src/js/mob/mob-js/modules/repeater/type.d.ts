import {
    MobStoreEmit,
    MobStoreSet,
    MobStoreWatch,
} from '../../../mob-core/store/type';

export type RepeaterRender = (arg0: {
    /**
     * Attribute for component if needed
     */
    sync: () => string;

    /**
     * Initial index value ( static )
     */
    initialIndex: number;

    /**
     * Initial content value ( static )
     */
    initialValue: Record<string, any>;

    /**
     * The proxi that render function return
     */
    current: Record<string | any>;
}) => string;

/**
 * Add new repeater id and props. Tehe repeater will execute after component render.
 */
export interface Repeater {
    beforeUpdate(): Promise<void> | void;
    afterUpdate(): void;

    /**
     * Component id where repeater is contained.
     */
    id: string;

    /**
     * If true remove previous item.
     */
    clean: boolean;

    /**
     * The component inside repeat will not destroyed on page navigation
     */
    persistent?: boolean;

    /**
     * Define id repeater use a key
     */
    key: string | undefined;

    /**
     * Observed state.
     */
    state: string | undefined;

    /**
     * Set state function from component that contain repeater.
     */
    setState: MobStoreSet;

    /**
     * Watch function from component that contain repeater.
     */
    watch: MobStoreWatch;

    /**
     * Emit function from component that contain repeater.
     */
    emit?: MobStoreEmit;

    /**
     * The render function that return repeater item.
     */
    render: RepeaterRender;

    /**
     * If true dataset is add manually by user.
     */
    useSync: boolean;
}

export interface WatchList extends Repeater {
    repeatId: string;
}

export interface CurrentRepeaterState {
    current: Record<string, any>;
    index: number;
}

export type RepeatIdHostMap = Map<string, HTMLElement>;

/**
 * With this map we can get repeater id and function associated by scope component id.
 *
 * - TODO:
 * - Fn && unsubscribe should be store in RepeatIdPlaceHolderMap.
 * - Rename in RepeatIdMap
 * - Puó essere che questa mappa non serve piú ma si puó tenere per sicurezza, potrebbe diventare utile.
 */
export type RepeatFunctionMap = Map<
    /**
     * The component id where repeater is defined ( ScopeId placeholderMap ).
     */
    string,
    {
        /**
         * The repeat ID
         */
        repeatId: string;

        /**
         * Initialize function
         */
        fn: () => void;

        /**
         * Unsubscribe from observed state function.
         */
        unsubscribe: () => void;
    }[]
>;

/**
 * With this map we can get all repeater info by repeater id.
 *
 * - TODO:
 * - Fn && unsubscribe should be store here.
 * - Rename in RepeatDataMap
 */
export type RepeatIdPlaceHolderMap = Map<
    /**
     * The repeat ID
     */
    string,
    {
        /**
         * Parent Element where repeater is contained
         */
        element: HTMLElement | undefined;

        /**
         * Define if repeater is initialized.
         */
        initialized: boolean;

        /**
         * The component id where repeater is created.
         */
        scopeId: string | undefined;

        /**
         * The observed state
         */
        key: string;

        /**
         * Id of component inside repeater.
         */
        componentChildren: string[];

        /**
         * Current state of observed state.
         */
        currentData: any[];

        /**
         * Native DOM node used instead component.
         *
         * - The following params is defined once on repeater creation.
         * - Index: Current state index
         * - Value: Current state value
         * - Element: HTMLNode
         */
        nativeDOMChildren: {
            index: number;
            value: any;
            element: HTMLElement;
        }[];
        initialRenderWithoutSync: Element[];
    }
>;
