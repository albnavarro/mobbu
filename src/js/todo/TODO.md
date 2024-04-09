# MobJs

### App:
- Possibilitá di avere multiple istanze che condividono gli stessi componenti.

### parentId
- ParentId sarebbe meglio che fosse undefined o 'root' rispetto a ''.
- FallBack se i vari tentativi di precompilare/resuperare il parentId falliscono dovrebbe evitare di usare qualsiasi tipo di querySelector ( setParentsIdFallback ).

## tick ?
- Tutti i bindProps dovrebbero partire quando i repeater sono stati completati. Vedi codeOverlay component quando si usa await tick().
    - se il type é QUEQUE_TYPE_REPEATER alimentare una mappa parallela.
    - tickRepeater() ?


# Mob motion

### AsyncTimeline
- Loop label-start / label-end al posto di fare ( repeat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.

