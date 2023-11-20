### NEXT TICK

Creare utils nexTick(fn) per racogliere tutti i setTimeout() | promise.resolve().then(fn).

- Store
- BindEvent.

Cosi da avere un punto solo nel caso si trovi una sluzione piu solida.

### CLEAN DOM

- remove | removeDOM from registerComponent.
- add removeOrphanComponent() in remove come fatto in removeDOM.


### DOCS

- mobJs add parseDOM/remove/remvoeDOM a parte nella lista di rotte.
- removeOrphanComponent => da index esportare cleanDOM function.

### ParseDom

- Passare componentId che entrerá come parametro in parseComponentRcursive.
Cosi da permettereai nuovi componenti di avere l'id del parent.
