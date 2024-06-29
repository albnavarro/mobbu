export type componentFunctionType = (
    arg0: import('../type').componentPropsType
) => Promise<string> | string;

export interface componentListMapType {
    componentFunction: componentFunctionType;
    componentParams: import('../type').componentParsedType;
}
