export type InvalidateIdHostMap = Map<string, HTMLElement>;

/**
 * With this map we can get invalidate id and function associated by scope component id.
 *
 * - ParseComponentsWhile():
 * - Fn && unsubscribe is defined here because when component is parsed:
 * - Get all fn ( initialize function ) defined in the component scope
 * - Then fire all invalidate initialize function
 * - This is why we use an array of item.
 *
 * Extra:
 *
 * - This map should be used to get all invalidate by scope id
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
