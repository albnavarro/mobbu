import { HtmlContent } from '@commonComponent/html-content/type';
import { List } from '@commonComponent/typography/list/type';
import { Paragraph } from '@commonComponent/typography/paragraph/type';
import { Title } from '@commonComponent/typography/titles/type';
import { MobJsStore } from '@mobJsType';

export interface SearchListItem {
    title: string;
    uri: string;
    section: string;
    breadCrumbs: string;
    count: number;
}

interface SearchOverlayListState extends Readonly<MobJsStore> {
    list: SearchListItem[];
    loading: boolean;
    noResult: boolean;
    updatePrentSearchKey: (value: string) => void;
}

export interface SearchOverlayList {
    state: SearchOverlayListState;
    methods: {
        update: (data: string) => Promise<void>;
        reset: () => void;
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}

type PropsTitle = Title['state'];
type PropsParagraph = Paragraph['state'];
type PropsList = List['state'];
type PropsHtmlContent = HtmlContent['state'];

interface Data
    extends PropsTitle,
        PropsParagraph,
        PropsHtmlContent,
        PropsList {}

/**
 * If HtmlContet is used all structure is repeat inside data props.
 */
interface DataMerged {
    data?: Data & FetchData;
}

export interface FetchData {
    component: string;
    content?: string;

    // List is parsed PropsList can be added one level up.
    props: DataMerged & Partial<PropsList>;
}
