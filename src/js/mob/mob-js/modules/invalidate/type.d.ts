export type InvalidateIdHostMap = Map<string, HTMLElement>;

/**
 * With this map we can get invalidate id and function associated by scope component id.
 *
 * - TODO:
 * - Fn && unsubscribe should be store in InvalidateIdPlaceHolderMap.
 * - Rename in RepeatIdMap
 * - Puó essere che questa mappa non serve piú ma si puó tenere per sicurezza, potrebbe diventare utile.
 */
export type InvalidateFunctionMap = Map<
    /**
     * The component id where invalidate is defined ( ScopeId placeholderMap ).
     */
    string,
    {
        /**
         * The invalidate ID
         */
        invalidateId: string;

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
    }[]
>;

/**
 * With this map we can get all invalidate info by invalidate id.
 *
 * - TODO:
 * - Fn && unsubscribe should be store here.
 * - Rename in InvalidateDataMap
 */
export type InvalidateIdPlaceHolderMap = Map<
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
    }
>;
