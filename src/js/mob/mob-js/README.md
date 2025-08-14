## Premise
This module, like the others, is designed for **personal use**, but it might (a rather remote hypothesis) be of interest to others.<br/><br/>
The following document aims to provide **general ideas**, having used them myself, I believe they are valid.<br/>
Even though the site has extensive documentation, it is primarily intended to **test the system** and for **my own use as a user**.<br/><br/>
This is why no **npm** package will be created. Consider that all of this was written to avoid **npm dependencies**.<br/><br/>
If there is any interest, simply download the **repository**.

## Basic Concepts of the MobJs Module:
Below are the basic concepts of the module to broadly understand its underlying logic.<br/>
The recurring theme is the search for an abstraction that is as **simple** and immediate as possible. The trick is to always have **instant access** to various elements without the need to filter large data structures.<br/>
- The module must be maintainable and, consequently, **must** be as simple and clear as possible.<br/>
- The module **must not** have **external dependencies** and must run natively in browsers without compilation steps.

### Typing
A **typing** system via **jsDoc** and **d.ts** has proven more than sufficient to achieve good type control without compilation steps.

### Data Structures:
Extensive use is made of **Map**/**Set** data structures, and in specific cases, **WeakMap**/**WeakSet**/**WeakRef**.<br/>
These structures are among the most efficient and convenient for accessing data, as they are specifically designed for direct access.<br/> When dealing with **unique HTMLElements**, they also make the entire system more robust, being designed precisely for this purpose.<br/>
The module is structured to maximize the potential of these data structures. DOM queries are considered a last resort, as they are **slow** and often **non-deterministic** when dealing with large numbers. Reasoning in terms of **1:1 relationships** makes the entire system more efficient and less prone to errors.

### Why Custom Components?
Components are added to the DOM as **custom-elements**. These elements use the **connectedCallback** method to intercept the **root** node of the element (`host`) and add it to a specific **Set**. If the node changes position (we use slots) and is added multiple times, it won't cause any issues since it's a **unique** data structure.<br/> The final **Set** will naturally reflect the insertion order of the **components** (**Preorder traversal**).<br/><br/>
**It won't be the module searching for components to render, but the components themselves making themselves available.**<br/><br/>
Once our DOM with all the components has been added, we can simply loop through the updated **Set** and, for each **occurrence**, retrieve the function responsible for **rendering** the final component via its **tag**. This type of operation is remarkably simple and extremely effective.<br/><br/>
In this case, we can't have direct access, but by default, we'll always use the element with the lowest index. If we think in terms of **find**, we'll have a **single iteration** in 99% of cases.<br/><br/>
The only precaution is to check that the **first available node** is a child of the **root node** of the DOM block we're analyzing. Otherwise, we move to the next one. In 99% of situations, this check is unnecessary, but since it has no performance impact, it's still performed.<br/><br/>
Even though creating a component starts from a **custom-element**, the final component doesn't necessarily have to be a **custom-component**. The DOM of the final component is returned by the **component-function**.<br/>

### Component Map.
All components refer to a map that manages the current state of the component and all its parameters at a given moment. **This map represents the heart of the module**. Knowing the component's **id**, we always have instant access to all its information.<br/><br/>
A specific **WeakMap** is also implemented, with the component's **root** node as the key and its **id** as the value. This allows direct access even starting from the **HTML node** rather than its **id**. Here too, we leverage the ability to have only **unique elements**.<br/><br/>
**Note**: This latter map is also used to find the **parent component's id** in an optimal and fast way, retracing the tree backward starting from a component's **root node** and querying the map for the **id** of the current node. Generally, in **2/3 cycles**, the closest **parent component node** is identified by performing very simple DOM operations (**node.parentNode**).<br/><br/>
**The component map will consequently also have all the information needed to generate a hierarchical tree of the current components.**<br/><br/>
**Note**: The **repeater** module (dynamic list) will track these **ids** in its data structure to efficiently access the contained components. Similarly, the component itself will track the **id** of the **repeater** module it's nested in. It's a simple but effective approach, just an example to understand the module's overall logic.

### Component State.
The component's **state** is a simple instance of **[MobStore](https://github.com/albnavarro/mobbu/tree/main/src/js/mob/mob-core/store)**. Nothing is done to adapt it to the structure. For each created component, a new **store** is created and, if necessary, populated with data from various modules. Its parameters are then passed as arguments to the **component-function**, and the store itself is linked to the component in the **general map**.<br/><br/>

The **goal** in this case was to include the **store** without adding any specifics, leaving it to function as an external module. Working on a module without having to think it will be an integral part of a component has **greatly simplified** the entire process.<br/><br/>
**The component library will simply use its APIs as a user would in standalone usage**.
<br/></br>

The **store** leverages the classic **pub/sub** pattern, also implementing utilities like **proxies** and **computed**.<br/><br/>
Like **MobJs**, no **classes** are used, but rather a primitive of type **Map** that associates a key with data.
This allows each **store** to associate multiple **keys** to **derive** data from other **stores** in a simple way (without write permissions, we're talking about **bindStore**).<br/><br/>

Here too, data access is always direct **1:1**.<br/><br/>

Leveraging the **pub/sub** concept, the **chaining** of states between components is automatic and requires no additional effort. Reactions will **propagate cascadingly in a natural way**.<br/><br/>

**MobStore** also manages an internal implementation of the **signal** pattern for an **auto-detect** dependency system (think of **computed**). It's important to note that this is **optional**. I believe that explicit dependency declaration can also be useful in some cases.

Additionally, **MobStore** adds interesting functionalities such as:
- Dynamic type control.
- A flow for each state that includes:
    - Validation
    - Value transformation
    - Mutation control (blocking/non-blocking).

### Initialization of Component Modules.
**Custom components** leverage the concept of **attributes**. The various modules (**bindProps**, **bindEffect**, etc.) are defined as **functions that return a key**.<br/><br/> When these modules are executed, they save their **input parameters** in a specific **map**, whose key will be added to the **custom-component** as an attribute, which can read and save it.

At this point, during creation, it will suffice to **query** the **custom-component** to be rendered and retrieve the **accumulated keys** to obtain the **original data** to use.

### Modules for Non-Component Nodes.
Modules like **bindEffect** or **delegateEvents** act on both **components** and **simple nodes** not tracked by the application.<br/><br/>
In these cases, the mechanism is similar to the previous one (function returning a key), but the node related to the module will be stored in a **weakRef()**. When this becomes **undefined**, the module will automatically disconnect. This simple mechanism has allowed most modules to have a **single code file** that is entirely independent.<br/><br/>
Note that the life of the **weakRef()** is autonomously managed by the **garbage collector**, so it's common to have an active module and a **ref** disconnected from the DOM. In these cases, a **fallback value** (the last valid value obtained) is always provided to avoid errors.<br/><br/>
For modules that live **inside a tag** rather than **on the tag** (**bindText**, **bindObject**, **invalidate**, **repeat**), specific **custom-elements** are provided. Once connected to the DOM, they will locate their **parent element** and retrieve the relevant **attributes** before **self-deleting**.<br/><br/>

For **simplification**, all dynamic operations inside a **node** always involve **replacing the entire node content**. This limitation is, in my opinion, entirely **acceptable**. The simplification it brings far outweighs the minimal disadvantages.<br/><br/>

**bindText** and **bindObject** heavily use **String.raw** to update textual content. Every occurrence in a string will always be converted to its **current value**.<br/>

### Repeat/Invalidate.
These are the most complex modules. They generally work like the previous ones but with a larger number of support maps (two per module), which, unlike the others, will persist for the entire life of the specific module.

### Routing
An implementation of a client-side **routing** system (`hash`) is already included with everything needed.

### Slot
**Slots** are managed with a specific **custom-element**.

### Tick
An internal **tick** (clock) of the application is useful for sequencing events and avoiding issues. For example, props should only update after all DOM updates are completed, or a click event should be blocked if the system isn't ready to receive it (e.g., while rendering a new DOM block).<br/>

### Memory
Memory consumption depends on the number of active components/operations at a given moment. It tends to grow and shrink based on the page content. **No memory leaks are detected**. Returning to the first visited page, consumption should be similar to the initial visit.

### Generic Code References:
- [Main APP](https://albnavarro.github.io/mobbu/#)
- [DOCS](https://albnavarro.github.io/mobbu/#mobJs-overview)

### Benchmark
There are specific pages to monitor performance when handling large lists of up to 1000 components, where each component uses `reactive props` and `dynamic class management`.

- [Invalidate](https://albnavarro.github.io/mobbu/#mobJs-benchmark-invalidate)
- [Repeat without key](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-no-key)
- [Repeat with key](https://albnavarro.github.io/mobbu/#mobJs-benchmark-repeat-key)
