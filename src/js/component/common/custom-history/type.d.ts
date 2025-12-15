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
        selectedNode: LinkedListNode<NodeData>[];
        currentNode?: LinkedListNode<NodeData> | null;
        active: boolean;
    };
    methods: {
        toggle: () => void;
        addRouteWithoutUpdate: (arg0: { id: string }) => void;
    };
}
