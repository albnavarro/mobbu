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
