import { OnlyStringKey } from '../../../mobCore/store/type';
import { GetState } from '../../tsUtils/mobComponentProps';

export interface BindEffectObject<T> {
    bind: OnlyStringKey<GetState<T>>[] | OnlyStringKey<GetState<T>>;
    toggle: Record<string, () => boolean>;
}

export interface BindEffectMapValue {
    parentId: string;
    items: {
        bind: string[];
        toggle: Record<string, () => boolean>;
    }[];
}

export type BindEffectMap = Map<string, BindEffectMapValue>;

export type BindEffectSet = (arg0: {
    data: BindEffectObject;
    id: string;
}) => string;
