# General
- Portare tutti i tipi da jsDoc a d.ts

# MobCore

### Default:
- Spostare mq da mobMotion a mobCore.


# Mob motion

### AsyncTimeline
- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

### Sequencer
- default `start`: ultimo `end` in ordine di inserimento.
- Aggiungere span:<br/>

```
    mySequencer
        .goTo( { x:10 }, { start: 2, end: 4}); // 1
        .goTo( { x:20 }, { span: 2 }); // 3
        .goTo( { y:20 }, { start: 2, span: 2 }); // 3
```
- 1: parte da 2 e finisce a 4. ( logica corrente ).
- 2: parte da 4 e finisce a 6.
- 3: parte da 2 e finisce a 4.



# MobJs

### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

### WebComponent type definition
- Applicare il nuovo tipo `userComponent` ad ora solo abbozzato all' elemento `componentToParse` all' interno di `parseComponentRecursive` e funzioni accessorie. Cosi da avere controllo su tutti i metodi del webcomponent. <br/>
src/js/mobjs/webComponent/type.d.ts

### parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.
- FallBack se i vari tentativi di precompilare/resuperare il parentId falliscono dovrebbe evitare di usare qualsiasi tipo di querySelector ( setParentsIdFallback ).

## tick ?
- Tutti i bindProps dovrebbero partire quando i repeater sono stati completati. Vedi codeOverlay component quando si usa await tick().
    - se il type é QUEQUE_TYPE_REPEATER alimentare una mappa parallela.
    - tickRepeater() ?

## src/js/mobjs/webComponent/
Le propieta private dell classe possono essere null|undefined.
Controllare che tutti i gatter quando vengono usati abbiano un fallback o uno skip in caso di unfdefined.





