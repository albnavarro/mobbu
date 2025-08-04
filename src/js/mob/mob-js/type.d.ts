// https://stackoverflow.com/questions/65668969/event-maps-and-type-guards#answer-65890181

import { BindStoreValueType, MobStoreParams } from '../mob-core/store/type';
import { ComponentFunction, MainStore } from './main-store/type';
import {
    ExtractState,
    PartialBindEffect,
    PartialBindEvents,
    PartialBindProps,
    PartialBindText,
    PartialCompunted,
    PartialCurrent,
    PartialDelegateEvents,
    PartialEmit,
    PartialEmitAsync,
    PartialFreezeProp,
    PartialGetChildren,
    PartialGetParentId,
    PartialGetProxi,
    PartialGetProxiState,
    PartialGetRef,
    PartialGetRefs,
    PartialGetState,
    PartialInvalidateComponent,
    PartialMethods,
    PartialOnMount,
    PartialRemove,
    PartialRemoveDOM,
    PartialRenderComponent,
    PartialRepeat,
    PartialReturnBindProps,
    PartialSetRef,
    PartialSetState,
    PartialSetStateByName,
    PartialStaticProps,
    PartialUnBind,
    PartialUnFreezeProp,
    PartialUpdateState,
    PartialUpdateStateByName,
    PartialUseMethodByName,
    PartialWatch,
    PartialWatchParent,
} from './ts-utils/mob-component-props';
import { OnlyStringKey } from './ts-utils/utils';

export type MobJsStore = MainStore;
export type BindProps<T, R = MobComponentMap> = PartialBindProps<T, R>;
export type DelegateEvents = PartialDelegateEvents;
export type BindEffect<T> = PartialBindEffect<T>;
export type BindEvents = PartialBindEvents;
export type GetState<T> = PartialGetState<T>;
export type SetState<T> = PartialSetState<T>;
export type UpdateState<T> = PartialUpdateState<T>;
export type GetProxi<T> = PartialGetProxi<T>;
export type ProxiState<T> = PartialGetProxiState<T>;
export type Emit<T> = PartialEmit<T>;
export type EmitAsync<T> = PartialEmitAsync<T>;
export type Computed<T> = PartialCompunted<T>;
export type Watch<T> = PartialWatch<T>;
export type RemoveDom = PartialRemoveDOM;
export type Remove = PartialRemove;
export type GetChildren = PartialGetChildren;
export type FreezeProp<T> = PartialFreezeProp<T>;
export type UnFreezeProp<T> = PartialUnFreezeProp<T>;
export type GetParentId = PartialGetParentId;
export type WatchParent = PartialWatchParent;
export type UnBind = PartialUnBind;
export type OnMount = PartialOnMount;
export type Repeat<T> = PartialRepeat<T>;
export type Current<T, K> = PartialCurrent<T, K>;
export type RenderComponent = PartialRenderComponent;
export type Invalidate<T> = PartialInvalidateComponent<T>;
export type StaticProps<R = MobComponentMap> = PartialStaticProps<R>;
export type SetStateByName<T> = PartialSetStateByName<T>;
export type UpdateStateByName<T> = PartialUpdateStateByName<T>;
export type Methods<T> = PartialMethods<T>;
export type SetRef<T> = PartialSetRef<T>;
export type GetRef<T> = PartialGetRef<T>;
export type GetRefs<T> = PartialGetRefs<T>;
export type BindText = PartialBindText;
export type BindObject = PartialBindText;
export type ReturnBindProps<T> = PartialReturnBindProps<T>;
export type UseMethodByName<T = { methods: any }> = PartialUseMethodByName<T>;
export type UseMethodArrayByName<T = { methods: any }> =
    PartialUseMethodByName<T>[];

/**
 * Main component.
 */
type MobComponentMap = Record<string, any>;

export interface componentReturnType {
    content: string;
}

export type MobComponent<T = MobComponentMap, R = MobComponentMap> = (
    props: ComponentPropsType<T, R>
) => string;

export type MobComponentAsync<T = MobComponentMap, R = MobComponentMap> = (
    props: ComponentPropsType<T, R>
) => Promise<string>;

export interface ComponentPropsType<T, R> {
    key: string;
    id: string;

    getState: GetState<T>;
    setState: SetState<T>;
    updateState: UpdateState<T>;
    getProxi: GetProxi<T>;
    emit: Emit<T>;
    emitAsync: EmitAsync<T>;
    computed: Computed<T>;
    watch: Watch<T>;
    removeDOM: RemoveDom;
    remove: Remove;
    getChildren: GetChildren;
    freezeProp: FreezeProp<T>;
    unFreezeProp: UnFreezeProp<T>;
    getParentId: GetParentId;
    watchParent: WatchParent;
    staticProps: StaticProps<R>;
    unBind: UnBind;
    bindProps: BindProps<T, R>;
    bindEvents: BindEvents;
    delegateEvents: DelegateEvents;
    bindEffect: BindEffect<T>;
    addMethod: PartialMethods<T>;
    setRef: PartialSetRef<T>;
    getRef: PartialGetRef<T>;
    getRefs: PartialGetRefs<T>;
    bindText: PartialBindText;
    bindObject: PartialBindText;
    onMount: OnMount;
    repeat: Repeat<T>;
    bindEventsId: string | undefined;
    repeatIdArray: string[];
    renderComponent: RenderComponent;
    invalidate: Invalidate<T>;
    debug: () => void;
}

/**
 * CreateComponent
 */

export interface ComponentParsed<T> {
    exportState?: OnlyStringKey<ExtractState<T>>[];

    /**
     * Fire onMount callback immediately, normally onMount is fired at the end of current parse. This means that if
     * `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no
     * effect to child component. `default = false`.
     */
    scoped?: boolean;
    connectedCallback?: (arg0: {
        context: object;
        params: ComponentPropsType<T, T>;
    }) => void;
    disconnectedCallback?: (arg0: {
        context: object;
        params: ComponentPropsType<T, T>;
    }) => void;
    adoptedCallback?: (arg0: {
        context: object;
        params: ComponentPropsType<T, T>;
    }) => void;
    attributeChangedCallback?: (arg0: {
        name: string;
        oldValue: string;
        newValue: string;
        context: object;
        params: ComponentPropsType<T, T>;
    }) => void;
    attributeToObserve?: string[];
    style?: string;
    state?: Partial<MobStoreParams<ExtractState<T>>>;
    bindStore?: BindStoreValueType;
    child?: CreateComponentReturnType[];
}

export interface CreateComponentParams<T> extends ComponentParsed<T> {
    tag: string;
    component: ComponentFunction;
}

export type CreateComponentReturnType = Record<
    string,
    {
        componentFunction: ComponentFunction;
        componentParams: ComponentParsed;
    }
>;

export type CreateComponent = <T>(
    arg0: CreateComponentParams<T>
) => CreateComponentReturnType;

/**
 * Default component params
 */

export interface DefaultComponent {
    scoped?: boolean;
    maxParseIteration?: number;
    debug?: boolean;
}

/**
 * Routing
 */

export type BeforePageTransition = (arg0: {
    oldNode: HTMLElement;
    oldRoute: string;
    newRoute: string;
    oldTemplateName: string;
    newTemplateName: string;
}) => Promise<any>;

export type PageTransition = (arg0: {
    oldNode: HTMLElement | Node;
    newNode: HTMLElement | Node;
    oldRoute: string;
    newRoute: string;
    oldTemplateName: string;
    newTemplateName: string;
}) => Promise<any>;

export interface Route {
    name: string;
    templateName?: string;
    layout:
        | ((arg0: { params: any; props: any }) => Promise<string>)
        | ((arg0: { params: any; props: any }) => string);
    restoreScroll?: boolean;
    props: any;
}

export type PageAsync<
    T = Record<string, any>,
    P = Record<string, any>,
> = (arg0: { params: T; props: P }) => Promise<string>;

export type Page<T = Record<string, any>, P = Record<string, any>> = (arg0: {
    params: T;
    props: P;
}) => string;

/**
 * Redirect function
 */
export type RedirectFunction = (arg0: { route: string }) => string;

/**
 * App
 */
export interface InizializeApp {
    rootId: string;
    wrapper: () => Promise<any>;
    contentId: string;
    routes: Route[];
    afterInit?: () => void;
    redirect?: RedirectFunction;
    index: string;
    pageNotFound: string;
    beforePageTransition?: BeforePageTransition;
    pageTransition?: PageTransition;
    restoreScroll?: boolean;
    componentDefaultProps?: {
        scoped?: boolean;
        maxParseIteration?: number;
        debug?: boolean;
    };
}
