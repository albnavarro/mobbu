import { OnlyStringKey } from '../../../mob-core/store/type';
import { ExtractState } from '../../ts-utils/mob-component-props';

export interface BindEffectObject<T> {
    observe?: OnlyStringKey<ExtractState<T>>[] | OnlyStringKey<ExtractState<T>>;
    toggleClass?: Record<string, () => boolean>;
    toggleStyle?: Record<string, () => string>;
    toggleAttribute?: Record<string, () => string | null | undefined>;
}

export interface BindEffectMapValue {
    parentId: string;
    items: {
        observe: string[];
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
