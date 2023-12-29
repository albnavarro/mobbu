## AsyncTimeline
- Loop label start/ label end al posto di fare ( repaat = -1 ) un loop tra 0 e arr.length.
- Possibilita di loppare tra label-start e label-end.
- Vedi index animation.
- Into animation poi il loop avviene solo sulla parte di timeline che scala.


## Mobjs - params:

example:

`
var hash = window.location.hash.substr(1);

var result = hash.split('&').reduce(function (res, item) {
    var parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
}, {});
`
