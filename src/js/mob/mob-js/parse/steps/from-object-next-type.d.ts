import { CreateComponentReturnType } from '@mobJsType';

/**
 * Tipo ricorsivo per il contenuto.
 */
export type FromObjectNextNodeContent =
    | string
    | FromObjectNextNodeDescriptor
    | (string | FromObjectNextNodeDescriptor)[];

/**
 * Tipo per il nodo del DOM.
 */
export interface FromObjectNextNodeDescriptor {
    component?: CreateComponentReturnType;
    tag?: keyof HTMLElementTagNameMap | (string & {});
    className?: string | string[];
    style?: Record<string, string>;
    dataAttributes?: Record<
        string,
        string | number | boolean | null | undefined
    >;

    /**
     * Attributi HTML standard. Exclude 'class' e 'style'.
     */
    attributes?: Omit<
        Record<string, string | number | boolean | null | undefined>,
        'class' | 'style'
    >;
    modules?: string | string[];
    content?: FromObjectNextNodeContent;
}

export type FromObjectNextType = (
    data: FromObjectNextNodeDescriptor
) => HTMLElement;
