export type componentFunctionType = (
    arg0: import('../type').componentType
) => Promise<string>;

export interface componentListMapType {
    componentFunction: componentFunctionType;
    componentParams: import('../type').componentParsedType;
}
