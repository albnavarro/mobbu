/**
 * Store invalidate webComponent host Element.
 *
 * - When parent element is get from getRepeatParent()
 * - The host ( web-component ) will be removed from DOM
 *
 * Look at nested repeat issue for more detail:
 *
 * - Src/js/mob/mob-js/modules/invalidate/action/inizialize-invalidate-watch.js
 * - Const fallBackParentId = ....
 */
export type InvalidateIdHostMap = Map<
    /**
     * Invalidate ID
     */
    string,
    /**
     * Invalidate web Element Host.
     */
    HTMLElement
>;

/**
 * - This map should be used to get all invalidate by scope id
 */
export type InvalidateIdsMap = Map<
    /**
     * The component id where invalidate is defined ( ScopeId placeholderMap ).
     */
    string,
    {
        /**
         * The invalidate ID
         */
        invalidateId: string;
    }[]
>;

/**
 * With this map we can get all invalidate info by invalidate id.
 */
export type InvalidateInstancesMap = Map<
    /**
     * The invalidate ID
     */
    string,
    {
        /**
         * Parent Element where invalidate is contained
         */
        element: HTMLElement | undefined;

        /**
         * Define if invalidate is initialized.
         */
        initialized: boolean;

        /**
         * The component id where invalidate is created.
         */
        scopeId: string | undefined;

        /**
         * Initialize function
         */
        fn: () => void;

        /**
         * Unsubscribe from observed state function.
         *
         * - Since the observe property receives an array of states and not just one, it needs an array of unsubscribes.
         */
        unsubscribe: (() => void)[];
    }
>;
