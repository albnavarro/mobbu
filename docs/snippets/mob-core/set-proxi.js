const proxi = myStore.getProxi();
myStore.set(() => proxi.prop, 2);
myStore.set(() => proxi.myObject, { prop: 10 });
