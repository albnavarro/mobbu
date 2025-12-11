/**
 * @template T
 */
class Node {
    /**
     * @param {T} data
     */
    constructor(data) {
        this.data = data;

        /**
         * Next node
         *
         * @type {Node<T> | null}
         */
        this.next = null;

        /**
         * Previous node
         *
         * @type {Node<T> | null}
         */
        this.prev = null;
    }

    dispose() {
        // @ts-ignore
        this.data = null;
        this.next = null;
        this.prev = null;
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
     * Add node at end of the list
     *
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    add(data) {
        const newNode = new Node(data);

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
        // @ts-expect-error tail exists when head exists
        this.#tail.next = newNode;
        newNode.prev = this.#tail;
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

        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return this;
        }

        newNode.next = this.#head;
        this.#head.prev = newNode;
        this.#head = newNode;
        this.#size++;

        return this;
    }

    /**
     * Add node at specific position
     *
     * @param {T} data
     * @param {number} index
     * @returns {LinkedList<T>}
     */
    insertAt(data, index) {
        if (index < 0 || index > this.#size) {
            throw new Error('Out of range');
        }

        /**
         * Insert at beginning
         */
        if (index === 0) {
            this.addFirst(data);
            return this;
        }

        /**
         * Insert at end
         */
        if (index === this.#size) {
            this.add(data);
            return this;
        }

        const newNode = new Node(data);
        let current = this.#head;
        let count = 0;

        /**
         * Find the node at the specified index
         */
        while (count < index) {
            // @ts-expect-error index is validated
            current = current.next;
            count++;
        }

        /**
         * Insert newNode before current
         */
        // @ts-expect-error current and prev exist
        newNode.prev = current.prev;
        newNode.next = current;
        // @ts-expect-error current.prev exists
        current.prev.next = newNode;
        // @ts-expect-error current exists
        current.prev = newNode;
        this.#size++;

        return this;
    }

    /**
     * Remove from value
     *
     * @param {T} data
     * @returns {LinkedList<T>}
     */
    remove(data) {
        if (this.#head === null) {
            return this;
        }

        let current = this.#head;

        /**
         * Find element to remove
         */
        while (current !== null && current.data !== data) {
            // @ts-expect-error current exists
            current = current.next;
        }

        /**
         * Element not found
         */
        if (current === null) {
            return this;
        }

        /**
         * It is head node. Point head to next node.
         */
        if (current.prev === null) {
            this.#head = current.next;
        }

        /**
         * It is not head, Node before next-pointer now point to next current Node.
         */
        if (current.prev) {
            current.prev.next = current.next;
        }

        /**
         * It is tail, new tail is previous current node.
         */
        if (current.next === null) {
            this.#tail = current.prev;
        }

        /**
         * It is not tail, Next previous pointer now point current previous.
         */
        if (current.next) {
            current.next.prev = current.prev;
        }

        current.dispose();
        this.#size--;
        return this;
    }

    /**
     * Remove element in specific position
     *
     * @param {number} index
     * @returns {LinkedList<T>}
     */
    removeAt(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Indice fuori range');
        }

        let current = this.#head;
        let count = 0;

        /**
         * Find the node to remove
         */
        while (count < index) {
            // @ts-expect-error index is validated
            current = current.next;
            count++;
        }

        /**
         * It is not head, switch previous next-pointer to current next-pointer.
         */
        if (current?.prev) {
            current.prev.next = current.next;
        }

        /**
         * It is head, new head is next pointer
         */
        if (current?.prev === null) {
            this.#head = current.next;
        }

        /**
         * It is not tail, next previous pointer now point to current previous.
         */
        if (current?.next) {
            current.next.prev = current.prev;
        }

        /**
         * It is tail, new tail is current previous.
         */
        if (current?.next === null) {
            this.#tail = current.prev;
        }

        if (current) current.dispose();
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
        if (this.#head) {
            this.#head.prev = null;
        }

        /**
         * If no head, tail is removed too.
         */
        if (this.#head === null) {
            this.#tail = null;
        }

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
        if (this.#tail) {
            this.#tail.next = null;
        }

        /**
         * If no tail, head is removed too.
         */
        if (this.#tail === null) {
            this.#head = null;
        }

        nodeToDispose.dispose();
        this.#size--;
        return this;
    }

    /**
     * Get index by value.
     *
     * @param {T} data
     * @returns {number}
     */
    indexOf(data) {
        let current = this.#head;
        let index = 0;

        while (current !== null) {
            if (current.data === data) {
                return index;
            }

            current = current.next;
            index++;
        }

        /**
         * Index not found
         */
        return -1;
    }

    /**
     * Get element by specific position
     *
     * @param {number} index
     * @returns {Node<T> | null}
     */
    get(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Index out of range');
        }

        /**
         * Perf: start from tail if index is closer to the end
         */
        if (index > this.#size / 2) {
            let current = this.#tail;
            let count = this.#size - 1;

            while (count > index) {
                // @ts-expect-error validated by condition
                current = current.prev;
                count--;
            }

            return current;
        }

        /**
         * Start from head for indices closer to the beginning
         */
        let current = this.#head;
        let count = 0;

        while (count < index) {
            // @ts-expect-error validated by condition
            current = current.next;
            count++;
        }

        return current;
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
     * @param {() => void} callback
     * @returns {LinkedList<T>}
     */
    execute(callback) {
        callback();
        return this;
    }

    /**
     * Async execute custom operation in chaining
     *
     * @param {() => Promise<void>} callback
     * @returns {Promise<LinkedList<T>>}
     */
    async executeAsync(callback) {
        await callback();
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

        console.log(result.join(' <-> '));
        return this;
    }

    /**
     * Print all elements in reverse order
     *
     * @returns {LinkedList<T>}
     */
    printReverse() {
        let current = this.#tail;
        const result = [];

        while (current !== null) {
            result.push(current.data);
            current = current.prev;
        }

        console.log(result.join(' <-> '));
        return this;
    }

    /**
     * Get empty status
     *
     * @returns {boolean}
     */
    isEmpty() {
        return this.#head === null;
    }

    /**
     * Get size
     *
     * @returns {number}
     */
    getSize() {
        return this.#size;
    }

    /**
     * Clear list
     *
     * @returns {LinkedList<T>}
     */
    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;

        return this;
    }

    /**
     * Reverse list
     *
     * @returns {LinkedList<T>}
     */
    reverse() {
        let current = this.#head;
        let temp = null;

        /**
         * Swap head and tail
         */
        this.#tail = this.#head;

        while (current !== null) {
            /**
             * Swap next and prev pointers
             */
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;

            /**
             * Move to next node (which is now prev due to swap)
             */
            this.#head = current;
            current = current.prev;
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
    get head() {
        return this.#head;
    }

    /**
     * Get last node (tail)
     *
     * @returns {Node<T> | null}
     */
    get tail() {
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
