/**
 * TODO:
 *
 * - MoveAfter(nodeToMove, targetNode)
 * - MoveBefore(nodeToMove, targetNode)
 * - Swap(NodeA, NodeB)
 */

/**
 * Define symbols for internal setter use in module.
 */
const SET_NEXT = Symbol('LinkedList.setNext');
const SET_PREV = Symbol('LinkedList.setPrev');

/**
 * @template T
 */
class Node {
    /**
     * Next node
     *
     * @type {Node<T> | null}
     */
    #next = null;

    /**
     * Previous node
     *
     * @type {Node<T> | null}
     */
    #prev = null;

    /**
     * @param {T} data
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * @returns {Node<T> | null}
     */
    get next() {
        return this.#next;
    }

    /**
     * @param {Node<T> | null} value
     */
    [SET_NEXT](value) {
        this.#next = value;
    }

    /**
     * @returns {Node<T> | null}
     */
    get prev() {
        return this.#prev;
    }

    /**
     * @param {Node<T> | null} value
     */
    [SET_PREV](value) {
        this.#prev = value;
    }

    dispose() {
        // @ts-ignore
        this.data = null;
        this.#next = null;
        this.#prev = null;
    }
}

/**
 * @template T
 */
export class LinkedList {
    /**
     * First node of list
     *
     * @type {Node<T> | null}
     */
    #head = null;

    /**
     * Last node of list
     *
     * @type {Node<T> | null}
     */
    #tail = null;

    /**
     * Number of element of list
     */
    #size = 0;

    /**
     * Use to check if node to remove is in map
     *
     * @type {WeakSet<Node<T>>}
     */
    #nodes = new WeakSet();

    /**
     * Add node at end of the list
     *
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    addLast(data) {
        const newNode = new Node(data);
        this.#nodes.add(newNode);

        /**
         * List is empty: new node is both head and tail
         */
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return this;
        }

        /**
         * Add to the end using tail reference
         */
        if (this.#tail) this.#tail[SET_NEXT](newNode);
        newNode[SET_PREV](this.#tail);
        this.#tail = newNode;
        this.#size++;

        return this;
    }

    /**
     * Add node at beginning of the list
     *
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    addFirst(data) {
        const newNode = new Node(data);
        this.#nodes.add(newNode);

        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return this;
        }

        newNode[SET_NEXT](this.#head);
        this.#head[SET_PREV](newNode);
        this.#head = newNode;
        this.#size++;

        return this;
    }

    /**
     * Remove node
     *
     * @param {Node<T>} node
     * @returns {LinkedList<T>}
     */
    removeNode(node) {
        if (!node || !this.#nodes.has(node)) return this;

        if (node === this.#head) return this.removeFirst();
        if (node === this.#tail) return this.removeLast();

        /**
         * Rimuovi nodi intermedi.
         */
        if (node.prev) node.prev[SET_NEXT](node.next);
        if (node.next) node.next[SET_PREV](node.prev);

        node.dispose();
        this.#size--;
        return this;
    }

    /**
     * Remove first element (head)
     *
     * @returns {LinkedList<T>}
     */
    removeFirst() {
        /**
         * List is empty
         */
        if (this.#head === null) {
            return this;
        }

        const nodeToDispose = this.#head;

        /**
         * New head is next node.
         */
        this.#head = this.#head.next;

        /**
         * Set head previous to null ( is first element )
         */
        if (this.#head) this.#head[SET_PREV](null);

        /**
         * If no head, tail is removed too.
         */
        if (this.#head === null) this.#tail = null;

        nodeToDispose.dispose();
        this.#size--;
        return this;
    }

    /**
     * Remove last element.
     *
     * @returns {LinkedList<T>}
     */
    removeLast() {
        if (this.#tail === null) {
            return this;
        }

        const nodeToDispose = this.#tail;

        /**
         * Now tail is previous node.
         */
        this.#tail = this.#tail.prev;

        /**
         * Set tail next to null ( is last element )
         */
        if (this.#tail) this.#tail[SET_NEXT](null);

        /**
         * If no tail, head is removed too.
         */
        if (this.#tail === null) this.#head = null;

        nodeToDispose.dispose();
        this.#size--;
        return this;
    }

    /**
     * Create node after other node.
     *
     * @param {Node<T>} node
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    insertAfter(node, data) {
        if (!node || !this.#nodes.has(node)) return this;

        const newNode = new Node(data);
        this.#nodes.add(newNode);

        newNode[SET_PREV](node);
        newNode[SET_NEXT](node.next);

        if (node.next) node.next[SET_PREV](newNode);
        node[SET_NEXT](newNode);

        if (node === this.#tail) this.#tail = newNode;

        this.#size++;
        return this;
    }

    /**
     * Create node before other node.
     *
     * @param {Node<T>} node
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    insertBefore(node, data) {
        if (!node || !this.#nodes.has(node)) return this;

        const newNode = new Node(data);
        this.#nodes.add(newNode);

        newNode[SET_NEXT](node);
        newNode[SET_PREV](node.prev);

        if (node.prev) node.prev[SET_NEXT](newNode);
        node[SET_PREV](newNode);

        if (node === this.#head) this.#head = newNode;

        this.#size++;
        return this;
    }

    /**
     * Find specific node
     *
     * @param {(node: Node<T>) => boolean} callback
     * @returns {Node<T> | undefined}
     */
    find(callback) {
        let current = this.#head;
        let returnNode;

        while (current !== null) {
            if (callback(current)) {
                returnNode = current;
                break;
            }

            current = current.next;
        }

        return returnNode;
    }

    /**
     * Filter list and create new list.
     *
     * @param {(arg0: Node<T>, index: number) => boolean} callback
     * @returns {LinkedList<T>}
     */
    filter(callback) {
        let current = this.#head;
        const newList = new LinkedList();
        let index = 0;

        while (current !== null) {
            if (callback(current, index)) newList.addLast(current.data);
            current = current.next;
            index++;
        }

        return newList;
    }

    /**
     * Create new List
     *
     * @template K
     * @param {(arg0: Node<T>, index: number) => K} callback
     * @returns {LinkedList<K>}
     */
    map(callback) {
        let current = this.#head;
        const newList = new LinkedList();
        let index = 0;

        while (current !== null) {
            newList.addLast(callback(current, index));
            current = current.next;
            index++;
        }

        return newList;
    }

    /**
     * Iterator
     */
    *[Symbol.iterator]() {
        let current = this.#head;

        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    /**
     * Sync traverse forward through the list
     *
     * @param {(node: Node<T>) => void} callback
     * @returns {LinkedList<T>}
     */
    traverse(callback) {
        let current = this.#head;

        while (current !== null) {
            callback(current);
            current = current.next;
        }

        return this;
    }

    /**
     * Async traverse forward through the list
     *
     * @param {(node: Node<T>) => Promise<void>} callback
     * @returns {Promise<LinkedList<T>>}
     */
    async traverseAsync(callback) {
        let current = this.#head;

        while (current !== null) {
            await callback(current);
            current = current.next;
        }

        return this;
    }

    /**
     * Traverse backward through the list
     *
     * @param {(node: Node<T>) => void} callback
     * @returns {LinkedList<T>}
     */
    traverseReverse(callback) {
        let current = this.#tail;

        while (current !== null) {
            callback(current);
            current = current.prev;
        }

        return this;
    }

    /**
     * Async Traverse backward through the list
     *
     * @param {(node: Node<T>) => Promise<void>} callback
     * @returns {Promise<LinkedList<T>>}
     */
    async traverseReverseAsync(callback) {
        let current = this.#tail;

        while (current !== null) {
            await callback(current);
            current = current.prev;
        }

        return this;
    }

    /**
     * Execute custom operation in chaining
     *
     * @param {(list: LinkedList<T>) => void} callback
     * @returns {LinkedList<T>}
     */
    execute(callback) {
        callback(this);
        return this;
    }

    /**
     * Async execute custom operation in chaining
     *
     * @param {(list: LinkedList<T>) => Promise<void>} callback
     * @returns {Promise<LinkedList<T>>}
     */
    async executeAsync(callback) {
        await callback(this);
        return this;
    }

    /**
     * Print all elements in the list
     *
     * @returns {LinkedList<T>}
     */
    print() {
        let current = this.#head;
        const result = [];

        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }

        console.log(result);
        return this;
    }

    /**
     * Clear list
     *
     * @returns {LinkedList<T>}
     */
    clear() {
        let current = this.#head;

        /**
         * First extract node list, then dispose one by one.
         */
        const nodes = [];
        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }

        /**
         * Then dispose all to remove all reference ( like data ).
         */
        for (const node of nodes) {
            node.dispose();
        }

        this.#head = null;
        this.#tail = null;
        this.#size = 0;
        nodes.length = 0;

        return this;
    }

    /**
     * Reverse list
     *
     * @returns {LinkedList<T>}
     */
    reverse() {
        let current = this.#head;
        this.#head = this.#tail;
        this.#tail = current;

        while (current !== null) {
            // Salva next originale
            const nextNode = current.next;

            // Swap direttamente
            current[SET_NEXT](current.prev);
            current[SET_PREV](nextNode);

            // Avanza
            current = nextNode;
        }

        return this;
    }

    /**
     * Convert to array
     *
     * @returns {T[]}
     */
    toArray() {
        const arr = [];
        let current = this.#head;

        while (current !== null) {
            arr.push(current.data);
            current = current.next;
        }

        return arr;
    }

    /**
     * Convert to array in reverse order
     *
     * @returns {T[]}
     */
    toArrayReverse() {
        const arr = [];
        let current = this.#tail;

        while (current !== null) {
            arr.push(current.data);
            current = current.prev;
        }

        return arr;
    }

    /**
     * Get first node (head)
     *
     * @returns {Node<T> | null}
     */
    get first() {
        return this.#head;
    }

    /**
     * Get last node (tail)
     *
     * @returns {Node<T> | null}
     */
    get last() {
        return this.#tail;
    }

    /**
     * Get size
     *
     * @returns {number}
     */
    get size() {
        return this.#size;
    }
}
