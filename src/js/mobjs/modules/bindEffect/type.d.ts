import { OnlyStringKey } from '../../../mobCore/store/type';
import { GetState } from '../../tsUtils/mobComponentProps';

export interface BindEffectObject<T> {
    bind: OnlyStringKey<GetState<T>>[] | OnlyStringKey<GetState<T>>;
    toggleClass?: Record<string, () => boolean>;
    toggleStyle?: Record<string, () => string>;
    toggleAttribute?: Record<string, () => string | null | undefined>;
}

export interface BindEffectMapValue {
    parentId: string;
    items: {
        bind: string[];
        toggleClass?: Record<string, () => boolean>;
        toggleStyle?: Record<string, () => string>;
        toggleAttribute?: Record<string, () => string | null | undefined>;
    }[];
}

export type BindEffectMap = Map<string, BindEffectMapValue>;

export type BindEffectSet = (arg0: {
    data: BindEffectObject;
    id: string;
}) => string;
