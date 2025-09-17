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

/**
 * Store repeater webComponent host Element.
 *
 * - When parent element is get from getRepeatParent()
 * - The host ( web-component ) will be removed from DOM
 *
 * Look at nested repeat issue for more detail:
 *
 * - Src/js/mob/mob-js/modules/repeater/watch/index.js:
 * - Const parentByElement = getRepeatParent({ id: repeatId });
 */
export type RepeatIdHostMap = Map<
    /**
     * Repeat ID
     */
    string,
    /**
     * Repeater web Element Host.
     */
    HTMLElement
>;

/**
 * - This map should be used to get all repeater by scope id
 */
export type RepeatIdsMap = Map<
    /**
     * The component id where repeater is defined ( ScopeId placeholderMap ).
     */
    string,
    {
        /**
         * The repeat ID
         */
        repeatId: string;
    }[]
>;

/**
 * With this map we can get all repeater info by repeater id.
 */
export type RepeatInstancesMap = Map<
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

        /**
         * First render with item prerenderd with dataset added by library.
         */
        initialRenderWithoutSync: Element[];

        /**
         * Initialize function
         */
        fn: () => void;

        /**
         * Unsubscribe from observed state function.
         */
        unsubscribe: () => void;
    }
>;
