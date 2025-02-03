import { OnlyStringKey } from '../../../mobCore/store/type';
import { GetState } from '../../tsUtils/mobComponentProps';

export interface BindClassObject<T> {
    bind: OnlyStringKey<GetState<T>>[] | OnlyStringKey<GetState<T>>;
    toggle: Record<string, () => boolean>;
}

export interface BindClassMapValue {
    parentId: string;
    items: {
        bind: string[];
        toggle: Record<string, () => boolean>;
    }[];
}

export type BindClassMap = Map<string, BindClassMapValue>;

export type BindClassSet = (arg0: {
    data: BindClassObject;
    id: string;
}) => string;
