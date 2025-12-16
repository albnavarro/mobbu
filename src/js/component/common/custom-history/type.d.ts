import {
    LinkedList,
    LinkedListNode,
} from 'src/js/mob/mob-core/data-set/linked-list';

export interface NodeData {
    id: string;
    url: string;
    params: any;
}

export interface CustomHistory {
    state: {
        linkedList: LinkedList<NodeData>;
        listParsed: NodeData[];
        selectedNodes: Set<string>;
        currentNode?: LinkedListNode<NodeData> | null;
        active: boolean;
    };
    methods: {
        toggle: () => void;
        addRouteWithoutUpdate: (arg0: { id: string }) => void;
        addSelectedNodes: (arg0: { id: string; add: boolean }) => void;
    };
}
