/**
 * TODO: add Generic and d.ts notation
 */

class Node {
    /**
     * @param {any} data
     */
    constructor(data) {
        this.data = data;

        /**
         * Next node
         *
         * @type {Node | null}
         */
        this.next = null;

        /**
         * Previous node
         *
         * @type {Node | null}
         */
        this.prev = null;
    }
}

export class LinkedList {
    /**
     * First node of list
     *
     * @type {Node | null}
     */
    #head = null;

    /**
     * Last node of list
     *
     * @type {Node | null}
     */
    #tail = null;

    /**
     * Number of element of list
     */
    #size = 0;

    /**
     * Add node at end of the list
     *
     * @param {any} data
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
            return;
        }

        /**
         * Add to the end using tail reference
         */
        // @ts-expect-error tail exists when head exists
        this.#tail.next = newNode;
        newNode.prev = this.#tail;
        this.#tail = newNode;
        this.#size++;
    }

    /**
     * Add node at beginning of the list
     *
     * @param {any} data
     */
    addFirst(data) {
        const newNode = new Node(data);

        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return;
        }

        newNode.next = this.#head;
        this.#head.prev = newNode;
        this.#head = newNode;
        this.#size++;
    }

    /**
     * Add node at specific position
     *
     * @param {any} data
     * @param {number} index
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
            return;
        }

        /**
         * Insert at end
         */
        if (index === this.#size) {
            this.add(data);
            return;
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
    }

    /**
     * Remove from value
     *
     * @param {any} data
     */
    remove(data) {
        if (this.#head === null) {
            return null;
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
            return null;
        }

        /**
         * Remove the node by updating pointers
         */
        if (current.prev === null) {
            /**
             * Remove head
             */
            this.#head = current.next;
        } else {
            current.prev.next = current.next;
        }

        if (current.next === null) {
            /**
             * Remove tail
             */
            this.#tail = current.prev;
        } else {
            current.next.prev = current.prev;
        }

        this.#size--;
        return data;
    }

    /**
     * Remove element in specific position
     *
     * @param {number} index
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
         * Update pointers to remove the node
         */
        // @ts-expect-error current exists
        if (current.prev) {
            // @ts-expect-error current exists
            current.prev.next = current.next;
        } else {
            /**
             * Removing head
             */
            // @ts-expect-error current exists
            this.#head = current.next;
        }

        // @ts-expect-error current exists
        if (current.next) {
            // @ts-expect-error current exists
            current.next.prev = current.prev;
        } else {
            /**
             * Removing tail
             */
            // @ts-expect-error current exists
            this.#tail = current.prev;
        }

        this.#size--;

        // @ts-expect-error current exists
        return current.data;
    }

    /**
     * Remove first element (head)
     */
    removeFirst() {
        if (this.#head === null) {
            return null;
        }

        const data = this.#head.data;
        this.#head = this.#head.next;

        if (this.#head) {
            this.#head.prev = null;
        } else {
            /**
             * List is now empty
             */
            this.#tail = null;
        }

        this.#size--;
        return data;
    }

    /**
     * Remove last element.
     */
    removeLast() {
        if (this.#tail === null) {
            return null;
        }

        const data = this.#tail.data;
        this.#tail = this.#tail.prev;

        if (this.#tail) {
            this.#tail.next = null;
        } else {
            /**
             * List is now empty
             */
            this.#head = null;
        }

        this.#size--;
        return data;
    }

    /**
     * Get index by value.
     *
     * @param {any} data
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
     */
    get(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Index out of range');
        }

        /**
         * Optimization: start from tail if index is closer to the end
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
     * Traverse forward through the list
     *
     * @param {(node: Node) => void} callback
     */
    traverse(callback) {
        let current = this.#head;

        while (current !== null) {
            callback(current);
            current = current.next;
        }
    }

    /**
     * Traverse backward through the list
     *
     * @param {(node: Node) => void} callback
     */
    traverseReverse(callback) {
        let current = this.#tail;

        while (current !== null) {
            callback(current);
            current = current.prev;
        }
    }

    /**
     * Print all elements in the list
     */
    print() {
        let current = this.#head;
        const result = [];

        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }

        console.log(result.join(' <-> '));
    }

    /**
     * Print all elements in reverse order
     */
    printReverse() {
        let current = this.#tail;
        const result = [];

        while (current !== null) {
            result.push(current.data);
            current = current.prev;
        }

        console.log(result.join(' <-> '));
    }

    /**
     * Get empty status
     */
    isEmpty() {
        return this.#head === null;
    }

    /**
     * Get size
     */
    getSize() {
        return this.#size;
    }

    /**
     * Clear list
     */
    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    /**
     * Reverse list
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
    }

    /**
     * Convert to array
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
     * @returns {Node | null}
     */
    get head() {
        return this.#head;
    }

    /**
     * Get last node (tail)
     *
     * @returns {Node | null}
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
