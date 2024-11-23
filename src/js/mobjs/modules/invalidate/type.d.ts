export type InvalidateFunctionMap = Map<
    string,
    { invalidateId: string; fn: () => void; unsubscribe: (() => void)[] }[]
>;

export type InvalidateIdPlaceHolderMap = Map<
    string,
    { element: HTMLElement; initialized: boolean; scopeId: string | undefined }
>;
