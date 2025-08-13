## Basic Concepts of MobJs Module:
Below are the fundamental concepts to understand the core logic at a high level.<br/>
The recurring theme is the pursuit of an abstraction that is as simple and immediate as possible. The trick is to always have instant access to various elements without the need to filter large data structures.<br/>
The module must be maintainable and, consequently, **must** be as simple and clear as possible.<br/>
The module **must not** have external dependencies and must run natively in browsers without compilation steps.

### Typing

Typing via `jsDoc` and `d.ts` has proven more than sufficient to achieve good type control without compilation steps.

### Component Creation:

Components are added to the DOM as `custom elements`. These elements, leveraging the `connectedCallback` method, can instantly intercept the `root` node of the element (`host`) and add it to a specific `Set`. The final `Set` will naturally reflect the insertion order of the components.
Once our DOM with all components has been added, we can simply loop through the updated `Set` and, for each occurrence, retrieve the function responsible for creating the final component via the `tag`. This type of operation is remarkably simple and extremely effective, requiring no search or filtering—it's always a direct access.<br/><br/>
Even though component creation starts from a `custom-element`, the final component does not necessarily have to be a `custom-component`. The DOM of the final component is returned by the `component-function`.

### Component Map.

All components reference a map that manages the current state of the component and all its parameters at a given time.<br/> This map uses a random `hash` as the key for quick access to information. Once the component is unmounted, it will be removed from the map.
A specific `WeakMap` is also implemented, associating the component's `root` node with its `hash` for instant access to the component's information via the `HTMLElement`. The goal is to always have direct access without search operations.<br/><br/>
For example, this latter map is also used to find the parent component's `hash` in an optimal and fast way by traversing the tree backward, starting from a component's `root` node and querying the map for the `hash` of the current node. Typically, the closest parent node/component is identified in 2-3 requests.<br/><br/>
The component map will, consequently, also have all the information needed to generate a hierarchical tree of current components.

### Component State.

The component state is a simple instance of [MobStore](https://github.com/albnavarro/mobbu/tree/main/src/js/mob/mob-core/store). Nothing is done to adapt it to the structure. For each component created, a new `store` is created and, if necessary, populated with data from various modules. Its parameters will then be passed to the component-function—nothing more.

The store leverages the classic `pub/sub` pattern, also implementing utilities like `proxy` and `computed`.<br/>
As with `MobJs`, no classes are used. Instead, we have a map where the key is a random `hash` associated with the specific store's information.<br/>
This allows associating multiple `hashes` with each store to derive data from other stores in a simple way without write permissions (`bindStore`).<br/><br/>

In this case as well, data access is always direct `1:1`.<br/><br/>

By leveraging the `pub/sub` concept, state chaining between components is automatic and requires no additional effort. Reactions propagate naturally in a cascading manner, and having direct access to various `instances` proves highly performant without overly complicating the structure.<br/><br/>

Using the `MobStore` module in its purest form makes its usage standalone or within a component entirely identical.

`MobStore` also manages an internal implementation of the `signal` pattern to provide an `auto-detect` system for dependencies. It's important to note that this is `optional`, as an explicit declaration of dependencies can also be useful in some cases.

Additionally, `MobStore` adds interesting functionalities such as:
- Dynamic type checking.
- A specific flow for each state with dedicated functions for:
    - Validation
    - Value transformation
    - Blocking/non-blocking mutation control.

### Initialization of Support Modules.

`Custom components` leverage the concept of `attributes`. Various modules (`bindProps`, `bindEffect`, etc.) are defined as functions that return a `random hash`. When these modules are executed, they store the input parameter(s) in a specific `Map` where the key is the hash added to the component as an `attribute`.<br/><br/>

At this point, retrieving any modules to initialize during creation becomes extremely simple, and again, this involves direct access.

### Modules for Non-Component Nodes.

Modules like `bindEffect` or `delegateEvents` work on both components and `simple nodes` not tracked by the application.<br/>
In these cases, the mechanism is similar to the previous one (a function that returns a `hash`), but the node related to the module will be stored in a `weakRef()`. When this returns `undefined`, the module will automatically disconnect.<br/>
Note that the life of the `weakRef()` is managed autonomously by the `GC`, so it's common to have an active module and a `ref` disconnected from the DOM. In these cases, a fallback value is always provided (for example, if the `repeat` proxy refers to an array element that no longer exists).<br/><br/>
For modules that live `inside` a tag rather than `on` the tag (`bindText`, `bindObject`, `invalidate`, `repeat`), specific `custom-elements` are used. Once connected to the DOM, they will locate their parent element and read the relevant attributes before self-deleting.

### Repeat/Invalidate.

These are the most complex modules. Broadly, they work like the previous ones but with a larger number of support maps (two per module), which, unlike the others, will persist for the entire life of the specific module.

### Routing
An implementation of a client-side (`hash`) routing system is already included with all necessary features.

### Slot
Slots are managed with a specific custom-element.

### Memory
Memory consumption depends on the number of components/operations active at a specific moment. It typically grows and shrinks based on the page content. No memory leaks are detected. When returning to the first visited page, consumption should be similar to the initial visit.

### General Code References:

- [Main APP](https://albnavarro.github.io/mobbu/#)
- [DOCS](https://albnavarro.github.io/mobbu/#mobJs-overview)
- [Main parsing cycle](https://github.com/albnavarro/mobbu/blob/main/src/js/mob/mob-js/parse/parse-function-while.js) with the general flow of component creation.
- [Example](https://github.com/albnavarro/mobbu/blob/main/src/js/mob/mob-js/modules/bind-object/index.js) of a generic module with weak references.

### Benchmark

There are specific pages to monitor performance when handling large lists of up to 1000 components, where each component uses `reactive props` and `dynamic class management`.

- [Invalidate](https://albnavarro.github.io/mobbu/#mobJs-benchmark-invalidate)
- [Repeat without key](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-no-key)
- [Repeat with key](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-key)
