/**
 * Invalidate as a different unsubscribe type respect repeat.
 *
 * Since the observe property receives an array of states and not just one, it needs an array of unsubscribes.
 */
export type InvalidateFunctionMap = Map<
    string,
    { invalidateId: string; fn: () => void; unsubscribe: (() => void)[] }[]
>;

export type InvalidateIdHostMap = Map<string, HTMLElement>;

export type InvalidateIdPlaceHolderMap = Map<
    string,
    {
        element: HTMLElement | undefined;
        initialized: boolean;
        scopeId: string | undefined;
    }
>;
