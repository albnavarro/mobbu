"use strict";(()=>{var sC=Object.create;var Uc=Object.defineProperty;var iC=Object.getOwnPropertyDescriptor;var aC=Object.getOwnPropertyNames;var cC=Object.getPrototypeOf,lC=Object.prototype.hasOwnProperty;var uC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),vo=(e,t)=>{for(var r in t)Uc(e,r,{get:t[r],enumerable:!0})},pC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of aC(t))!lC.call(e,n)&&n!==r&&Uc(e,n,{get:()=>t[n],enumerable:!(o=iC(t,n))||o.enumerable});return e};var mC=(e,t,r)=>(r=e!=null?sC(cC(e)):{},pC(t||!e||!e.__esModule?Uc(r,"default",{value:e,enumerable:!0}):r,e));var Xv=uC((sJ,Yv)=>{function Dv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Dv(r)}),e}var ec=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Fv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function mo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var TI="</span>",Pv=e=>!!e.scope,_I=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Vu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Fv(t)}openNode(t){if(!Pv(t))return;let r=_I(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Pv(t)&&(this.buffer+=TI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Nv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Wu=class e{constructor(){this.rootNode=Nv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Nv({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},zu=class extends Wu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Vu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Ks(e){return e?typeof e=="string"?e:e.source:null}function Bv(e){return Wo("(?=",e,")")}function SI(e){return Wo("(?:",e,")*")}function xI(e){return Wo("(?:",e,")?")}function Wo(...e){return e.map(r=>Ks(r)).join("")}function CI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Uu(...e){return"("+(CI(e).capture?"":"?:")+e.map(o=>Ks(o)).join("|")+")"}function Vv(e){return new RegExp(e.toString()+"|").exec("").length-1}function EI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var wI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Hu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Ks(o),i="";for(;s.length>0;){let a=wI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var II=/\b\B/,Wv="[a-zA-Z]\\w*",Gu="[a-zA-Z_]\\w*",zv="\\b\\d+(\\.\\d+)?",jv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Uv="\\b(0b[01]+)",MI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",kI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Wo(t,/.*\b/,e.binary,/\b.*/)),mo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Qs={begin:"\\\\[\\s\\S]",relevance:0},RI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Qs]},PI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Qs]},NI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},rc=function(e,t,r={}){let o=mo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Uu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Wo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},AI=rc("//","$"),OI=rc("/\\*","\\*/"),$I=rc("#","$"),LI={scope:"number",begin:zv,relevance:0},DI={scope:"number",begin:jv,relevance:0},FI={scope:"number",begin:Uv,relevance:0},BI={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Qs,{begin:/\[/,end:/\]/,relevance:0,contains:[Qs]}]},VI={scope:"title",begin:Wv,relevance:0},WI={scope:"title",begin:Gu,relevance:0},zI={begin:"\\.\\s*"+Gu,relevance:0},jI=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Za=Object.freeze({__proto__:null,APOS_STRING_MODE:RI,BACKSLASH_ESCAPE:Qs,BINARY_NUMBER_MODE:FI,BINARY_NUMBER_RE:Uv,COMMENT:rc,C_BLOCK_COMMENT_MODE:OI,C_LINE_COMMENT_MODE:AI,C_NUMBER_MODE:DI,C_NUMBER_RE:jv,END_SAME_AS_BEGIN:jI,HASH_COMMENT_MODE:$I,IDENT_RE:Wv,MATCH_NOTHING_RE:II,METHOD_GUARD:zI,NUMBER_MODE:LI,NUMBER_RE:zv,PHRASAL_WORDS_MODE:NI,QUOTE_STRING_MODE:PI,REGEXP_MODE:BI,RE_STARTERS_RE:MI,SHEBANG:kI,TITLE_MODE:VI,UNDERSCORE_IDENT_RE:Gu,UNDERSCORE_TITLE_MODE:WI});function UI(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function HI(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function GI(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=UI,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function qI(e,t){Array.isArray(e.illegal)&&(e.illegal=Uu(...e.illegal))}function JI(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function YI(e,t){e.relevance===void 0&&(e.relevance=1)}var XI=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Wo(r.beforeMatch,Bv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},KI=["of","and","for","in","not","or","if","then","parent","list","value"],QI="keyword";function Hv(e,t,r=QI){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Hv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,ZI(c[0],c[1])]})}}function ZI(e,t){return t?Number(t):eM(e)?0:1}function eM(e){return KI.includes(e.toLowerCase())}var Av={},Vo=e=>{console.error(e)},Ov=(e,...t)=>{console.log(`WARN: ${e}`,...t)},zn=(e,t)=>{Av[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Av[`${e}/${t}`]=!0)},tc=new Error;function Gv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Vv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function tM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Vo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),tc;if(typeof e.beginScope!="object"||e.beginScope===null)throw Vo("beginScope must be object"),tc;Gv(e,e.begin,{key:"beginScope"}),e.begin=Hu(e.begin,{joinWith:""})}}function rM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Vo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),tc;if(typeof e.endScope!="object"||e.endScope===null)throw Vo("endScope must be object"),tc;Gv(e,e.end,{key:"endScope"}),e.end=Hu(e.end,{joinWith:""})}}function oM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function nM(e){oM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),tM(e),rM(e)}function sM(e){function t(i,a){return new RegExp(Ks(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Vv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Hu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[HI,JI,nM,XI].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[GI,qI,YI].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Hv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ks(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return iM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=mo(e.classNameAliases||{}),s(e)}function qv(e){return e?e.endsWithParent||qv(e.starts):!1}function iM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return mo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:qv(e)?mo(e,{starts:e.starts?mo(e.starts):null}):Object.isFrozen(e)?mo(e):e}var aM="11.11.1",ju=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Bu=Fv,$v=mo,Lv=Symbol("nomatch"),cM=7,Jv=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:zu};function c(C){return a.noHighlightRe.test(C)}function l(C){let k=C.className+" ";k+=C.parentNode?C.parentNode.className:"";let O=a.languageDetectRe.exec(k);if(O){let B=N(O[1]);return B||(Ov(s.replace("{}",O[1])),Ov("Falling back to no-highlight mode for this block.",C)),B?O[1]:"no-highlight"}return k.split(/\s+/).find(B=>c(B)||N(B))}function p(C,k,O){let B="",V="";typeof k=="object"?(B=C,O=k.ignoreIllegals,V=k.language):(zn("10.7.0","highlight(lang, code, ...args) has been deprecated."),zn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=C,B=k),O===void 0&&(O=!0);let q={code:B,language:V};D("before:highlight",q);let ee=q.result?q.result:h(q.language,q.code,O);return ee.code=q.code,D("after:highlight",ee),ee}function h(C,k,O,B){let V=Object.create(null);function q(W,H){return W.keywords[H]}function ee(){if(!X.keywords){Ue.addText(Me);return}let W=0;X.keywordPatternRe.lastIndex=0;let H=X.keywordPatternRe.exec(Me),ae="";for(;H;){ae+=Me.substring(W,H.index);let xe=Xe.case_insensitive?H[0].toLowerCase():H[0],tt=q(X,xe);if(tt){let[hr,oC]=tt;if(Ue.addText(ae),ae="",V[xe]=(V[xe]||0)+1,V[xe]<=cM&&(pi+=oC),hr.startsWith("_"))ae+=H[0];else{let nC=Xe.classNameAliases[hr]||hr;ye(H[0],nC)}}else ae+=H[0];W=X.keywordPatternRe.lastIndex,H=X.keywordPatternRe.exec(Me)}ae+=Me.substring(W),Ue.addText(ae)}function ue(){if(Me==="")return;let W=null;if(typeof X.subLanguage=="string"){if(!t[X.subLanguage]){Ue.addText(Me);return}W=h(X.subLanguage,Me,!0,ts[X.subLanguage]),ts[X.subLanguage]=W._top}else W=d(Me,X.subLanguage.length?X.subLanguage:null);X.relevance>0&&(pi+=W.relevance),Ue.__addSublanguage(W._emitter,W.language)}function re(){X.subLanguage!=null?ue():ee(),Me=""}function ye(W,H){W!==""&&(Ue.startScope(H),Ue.addText(W),Ue.endScope())}function ve(W,H){let ae=1,xe=H.length-1;for(;ae<=xe;){if(!W._emit[ae]){ae++;continue}let tt=Xe.classNameAliases[W[ae]]||W[ae],hr=H[ae];tt?ye(hr,tt):(Me=hr,ee(),Me=""),ae++}}function ge(W,H){return W.scope&&typeof W.scope=="string"&&Ue.openNode(Xe.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ye(Me,Xe.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Me=""):W.beginScope._multi&&(ve(W.beginScope,H),Me="")),X=Object.create(W,{parent:{value:X}}),X}function Ne(W,H,ae){let xe=EI(W.endRe,ae);if(xe){if(W["on:end"]){let tt=new ec(W);W["on:end"](H,tt),tt.isMatchIgnored&&(xe=!1)}if(xe){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Ne(W.parent,H,ae)}function Be(W){return X.matcher.regexIndex===0?(Me+=W[0],1):(jc=!0,0)}function J(W){let H=W[0],ae=W.rule,xe=new ec(ae),tt=[ae.__beforeBegin,ae["on:begin"]];for(let hr of tt)if(hr&&(hr(W,xe),xe.isMatchIgnored))return Be(H);return ae.skip?Me+=H:(ae.excludeBegin&&(Me+=H),re(),!ae.returnBegin&&!ae.excludeBegin&&(Me=H)),ge(ae,W),ae.returnBegin?0:H.length}function Te(W){let H=W[0],ae=k.substring(W.index),xe=Ne(X,W,ae);if(!xe)return Lv;let tt=X;X.endScope&&X.endScope._wrap?(re(),ye(H,X.endScope._wrap)):X.endScope&&X.endScope._multi?(re(),ve(X.endScope,W)):tt.skip?Me+=H:(tt.returnEnd||tt.excludeEnd||(Me+=H),re(),tt.excludeEnd&&(Me=H));do X.scope&&Ue.closeNode(),!X.skip&&!X.subLanguage&&(pi+=X.relevance),X=X.parent;while(X!==xe.parent);return xe.starts&&ge(xe.starts,W),tt.returnEnd?0:H.length}function Ge(){let W=[];for(let H=X;H!==Xe;H=H.parent)H.scope&&W.unshift(H.scope);W.forEach(H=>Ue.openNode(H))}let lt={};function Tt(W,H){let ae=H&&H[0];if(Me+=W,ae==null)return re(),0;if(lt.type==="begin"&&H.type==="end"&&lt.index===H.index&&ae===""){if(Me+=k.slice(H.index,H.index+1),!n){let xe=new Error(`0 width match regex (${C})`);throw xe.languageName=C,xe.badRule=lt.rule,xe}return 1}if(lt=H,H.type==="begin")return J(H);if(H.type==="illegal"&&!O){let xe=new Error('Illegal lexeme "'+ae+'" for mode "'+(X.scope||"<unnamed>")+'"');throw xe.mode=X,xe}else if(H.type==="end"){let xe=Te(H);if(xe!==Lv)return xe}if(H.type==="illegal"&&ae==="")return Me+=`
`,1;if(zc>1e5&&zc>H.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Me+=ae,ae.length}let Xe=N(C);if(!Xe)throw Vo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let es=sM(Xe),$r="",X=B||es,ts={},Ue=new a.__emitter(a);Ge();let Me="",pi=0,yo=0,zc=0,jc=!1;try{if(Xe.__emitTokens)Xe.__emitTokens(k,Ue);else{for(X.matcher.considerAll();;){zc++,jc?jc=!1:X.matcher.considerAll(),X.matcher.lastIndex=yo;let W=X.matcher.exec(k);if(!W)break;let H=k.substring(yo,W.index),ae=Tt(H,W);yo=W.index+ae}Tt(k.substring(yo))}return Ue.finalize(),$r=Ue.toHTML(),{language:C,value:$r,relevance:pi,illegal:!1,_emitter:Ue,_top:X}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:Bu(k),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:k.slice(yo-100,yo+100),mode:W.mode,resultSoFar:$r},_emitter:Ue};if(n)return{language:C,value:Bu(k),illegal:!1,relevance:0,errorRaised:W,_emitter:Ue,_top:X};throw W}}function f(C){let k={value:Bu(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return k._emitter.addText(C),k}function d(C,k){k=k||a.languages||Object.keys(t);let O=f(C),B=k.filter(N).filter(I).map(re=>h(re,C,!1));B.unshift(O);let V=B.sort((re,ye)=>{if(re.relevance!==ye.relevance)return ye.relevance-re.relevance;if(re.language&&ye.language){if(N(re.language).supersetOf===ye.language)return 1;if(N(ye.language).supersetOf===re.language)return-1}return 0}),[q,ee]=V,ue=q;return ue.secondBest=ee,ue}function v(C,k,O){let B=k&&r[k]||O;C.classList.add("hljs"),C.classList.add(`language-${B}`)}function y(C){let k=null,O=l(C);if(c(O))return;if(D("before:highlightElement",{el:C,language:O}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new ju("One of your code blocks includes unescaped HTML.",C.innerHTML);k=C;let B=k.textContent,V=O?p(B,{language:O,ignoreIllegals:!0}):d(B);C.innerHTML=V.value,C.dataset.highlighted="yes",v(C,O,V.language),C.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(C.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),D("after:highlightElement",{el:C,result:V,text:B})}function T(C){a=$v(a,C)}let S=()=>{x(),zn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),zn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let M=!1;function x(){function C(){x()}if(document.readyState==="loading"){M||window.addEventListener("DOMContentLoaded",C,!1),M=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function E(C,k){let O=null;try{O=k(e)}catch(B){if(Vo("Language definition for '{}' could not be registered.".replace("{}",C)),n)Vo(B);else throw B;O=i}O.name||(O.name=C),t[C]=O,O.rawDefinition=k.bind(null,e),O.aliases&&F(O.aliases,{languageName:C})}function w(C){delete t[C];for(let k of Object.keys(r))r[k]===C&&delete r[k]}function A(){return Object.keys(t)}function N(C){return C=(C||"").toLowerCase(),t[C]||t[r[C]]}function F(C,{languageName:k}){typeof C=="string"&&(C=[C]),C.forEach(O=>{r[O.toLowerCase()]=k})}function I(C){let k=N(C);return k&&!k.disableAutodetect}function R(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=k=>{C["before:highlightBlock"](Object.assign({block:k.el},k))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=k=>{C["after:highlightBlock"](Object.assign({block:k.el},k))})}function P(C){R(C),o.push(C)}function L(C){let k=o.indexOf(C);k!==-1&&o.splice(k,1)}function D(C,k){let O=C;o.forEach(function(B){B[O]&&B[O](k)})}function $(C){return zn("10.7.0","highlightBlock will be removed entirely in v12.0"),zn("10.7.0","Please use highlightElement now."),y(C)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:y,highlightBlock:$,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:E,unregisterLanguage:w,listLanguages:A,getLanguage:N,registerAliases:F,autoDetection:I,inherit:$v,addPlugin:P,removePlugin:L}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=aM,e.regex={concat:Wo,lookahead:Bv,either:Uu,optional:xI,anyNumberOfTimes:SI};for(let C in Za)typeof Za[C]=="object"&&Dv(Za[C]);return Object.assign(e,Za),e},jn=Jv({});jn.newInstance=()=>Jv({});Yv.exports=jn;jn.HighlightJS=jn;jn.default=jn});var u={};vo(u,{ANIMATION_STOP_REJECT:()=>nl,checkType:()=>Ie,createStore:()=>bE,debounce:()=>To,getFps:()=>vE,getInstantFps:()=>yE,getTime:()=>Ot,getTypeName:()=>os,getUnivoqueId:()=>ke,mustMakeSomething:()=>TE,normalizeWheel:()=>ls,shouldMakeSomething:()=>_E,store:()=>XE,throttle:()=>mi,useCache:()=>ME,useDebounce:()=>To,useFps:()=>wE,useFrame:()=>SE,useFrameIndex:()=>EE,useLinkedList:()=>KE,useLoad:()=>IE,useMouseClick:()=>PE,useMouseDown:()=>NE,useMouseMove:()=>OE,useMouseUp:()=>LE,useMouseWheel:()=>FE,useNextFrame:()=>CE,useNextLoop:()=>$t,useNextTick:()=>xE,usePointerDown:()=>HE,usePointerLeave:()=>YE,usePointerMove:()=>GE,usePointerOut:()=>JE,usePointerOver:()=>UE,usePointerUp:()=>qE,useResize:()=>kE,useScroll:()=>BE,useScrollEnd:()=>jE,useScrollImmediate:()=>VE,useScrollStart:()=>zE,useScrollThrottle:()=>WE,useTouchEnd:()=>DE,useTouchMove:()=>$E,useTouchStart:()=>AE,useVisibilityChange:()=>RE});var Ot=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Tp=16.666666666666668;var mi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Ot()-o>=t&&(e.apply(n,s),o=Ot())},t-(Ot()-o))):(e.apply(n,s),o=Ot())}};var To=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function se(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Ve(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function de(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function _t(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function rs(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function _o(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Hc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ke=()=>`_${Math.random().toString(36).slice(2,9)}`;function _p(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Gc=(e,t,r)=>Math.min(Math.max(e,t),r);var hi=new Set,$t=e=>{hi.add(e),hi.size===1&&setTimeout(()=>{hi.forEach(t=>{t()}),hi.clear()})};var qc="UNTYPED",Sp="STRING",xp="NUMBER",Cp="OBJECT",Ep="FUNCTION",di="ARRAY",wp="BOOLEAN",Ip="ELEMENT",Mp="HTMLELEMENT",kp="NODELIST";var Ee={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},os=e=>{switch(e){case String:case Sp:return"String";case Number:case xp:return"Number";case Object:case Cp:return"Object";case Function:case Ep:return"Function";case Array:case di:return"Array";case Boolean:case wp:return"Boolean";case Element:case Ip:return"Element";case HTMLElement:case Mp:return"HTMLElement";case NodeList:case kp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return qc}},Ie=(e,t)=>{switch(e){case String:case Sp:return Ee.isString(t);case Number:case xp:return Ee.isNumber(t);case Object:case Cp:return Ee.isObject(t);case Function:case Ep:return Ee.isFunction(t);case Array:case di:return Ee.isArray(t);case Boolean:case wp:return Ee.isBoolean(t);case Element:case Ip:return Ee.isElement(t);case HTMLElement:case Mp:return Ee.isHTMLElement(t);case NodeList:case kp:return Ee.isNodeList(t);case Set:case"SET":return Ee.isSet(t);case Map:case"MAP":return Ee.isMap(t);case"ANY":return!0;default:return!0}};var fC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),gC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),bC=(e,t)=>{if(e.length!==t.length)return!1;for(let[r,o]of e.entries())if(!ns(o,t[r]))return!1;return!0},ns=(e,t,r=new WeakMap)=>{if(e===t)return!0;if(e==null||t==null)return!1;let o=typeof e;if(o!==typeof t||o!=="object")return!1;if(r.has(e)&&r.get(e)?.has(t))return!0;r.has(e)||r.set(e,new WeakSet),r.get(e)?.add(t);let s=Array.isArray(e),i=Array.isArray(t);if(s!==i)return!1;if(s){if(e.length!==t.length)return!1;for(let[l,p]of e.entries())if(!ns(p,t[l],r))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(e instanceof Date||t instanceof Date)return!1;if(e instanceof RegExp&&t instanceof RegExp)return e.source===t.source&&e.flags===t.flags;if(e instanceof RegExp||t instanceof RegExp)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[l,p]of e)if(!t.has(l)||!ns(p,t.get(l),r))return!1;return!0}if(e instanceof Map||t instanceof Map)return!1;if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}if(e instanceof Set||t instanceof Set)return!1;let a=Object.keys(e),c=Object.keys(t);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(t,l)||!ns(e[l],t[l],r))return!1;return!0},fi=(e,t,r)=>{switch(e){case"ANY":return ns(t,r);case di:case Array:return bC(t,r);case"SET":case Set:return gC(t,r);case"MAP":case Map:return fC(t,r);default:return t===r}};var gi="UPDATE";var Re={};vo(Re,{extractKeysFromArray:()=>Xc,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>Jc,getFirstCurrentDependencies:()=>Yc,initializeCurrentDependencies:()=>ss,setCurrentDependencies:()=>yi});var Uo=[],bi=!1,ss=()=>{bi=!0,Uo.length=0},Jc=()=>(bi=!1,[...Uo]),Yc=()=>(bi=!1,[...Uo]?.[0]??"missing_prop"),yi=e=>{!bi||!e||Uo.includes(e)||(Uo=[...Uo,e])},Lr=e=>Ie(String,e)?e:(ss(),e(),Yc()),Xc=e=>e.map(t=>Ie(String,t)?t:(ss(),t(),Yc()));var is=new Map,Rp=e=>{is.delete(e)},Ho=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=is.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),is.set(s,l),p&&$t(()=>{let d=is.get(s),v=d?.get(t);if(v&&v.newValue!==void 0&&v.newValue!==null)for(let y of v.callbacks)y(v.newValue,v.oldValue,v.validationValue);d?.delete(t),d?.size===0&&is.delete(s)})}}},Pp=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var yC="padding: 10px;",We=()=>yC;var dr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=dr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(dr(s,t),dr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(dr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:dr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:dr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Kc="store_shallow_copy",Np="store_custom_copy",Ap="store_deep_copy",vi=Kc;var De=new Map,oe=e=>{if(vi===Kc){let t=De.get(e);return t?{...t}:void 0}if(vi===Np){let t=De.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(vi===Ap){let t=De.get(e);return t?{...t,store:dr(t.store),validationStatusObject:dr(t.validationStatusObject)}:void 0}return De.get(e)},Ae=(e,t)=>{De.set(e,t)},Op=e=>{De.delete(e)};var Qc=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var $p=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Lp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Dp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Fp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${os(r)}`,o)},Bp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Vp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Wp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},zp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},jp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${os(o)}`,n)},Up=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},Zc=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Hp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Gp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},qp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Jp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},el=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var as=e=>{if(!Ee.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>as(r)))+1},Yp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ee.isObject(o)&&t)return[r,Yp(o,!1)];if(Ee.isFunction(o)){let n=o();if(Ee.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),Xp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ee.isObject(s)&&o)return[n,Xp(s,t,r,!1)];if(Ee.isFunction(s)){let i=s();if(Ee.isObject(i)&&"value"in i&&t in i){let a=Ee.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Kp=({data:e,depth:t,logStyle:r})=>t>2?(Qc(t,r),{}):Yp(e),Go=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(Qc(r,o),{}):Xp(e,t,n),Qp=({value:e})=>Ie(Map,e)?new Map(e):Ie(Set,e)?new Set(e):Ie(Object,e)?{...e}:Ie(Array,e)?[...e]:e,Dr=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var vC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=We(),S=a[t]==="ANY";if(Ee.isObject(r)&&!S){Lp(t,r,T);return}if(Ee.isObject(l[t])&&!S){Dp(t,T);return}let _=l[t],M=c[t]?.(r,_)??r;if(!Ie(a[t],M)){Fp(t,M,a[t],T);return}let E=p[t]?.(M,_);!E&&s&&el(t,T),!(h[t]&&!E&&n||(f[t]=E,(d[t]?fi(a[t],_,M):!1)&&!s))&&(l[t]=M,Ae(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:M,oldValue:_,validationValue:f[t],instanceId:e}),fr({instanceId:e,prop:t}),y.forEach(A=>{fr({instanceId:A,prop:t})})))},TC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=We();if(!Ee.isObject(r)){Bp(t,r,T);return}if(!Ee.isObject(a[t])){Vp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(D=>_.includes(D))){Wp(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(D=>{let[$,C]=D,k=a[t][$];return!s&&fi(c[t][$],C,k)?[$,C]:[$,p[t][$]?.(C,k)??C]}));if(!Object.entries(x).map(D=>{let[$,C]=D,k=Ie(c[t][$],C);return k||jp(t,$,C,c[t][$],T),k}).every(D=>D===!0))return;let w=Object.entries(x).map(D=>{let[$,C]=D,k=a[t][$];return l[t][$]&&n?{strictCheck:h[t][$]?.(C,k),item:D}:{strictCheck:!0,item:D}}).filter(({strictCheck:D})=>D===!0);if(w.length===0)return;let N=Object.fromEntries(w.map(({item:D})=>D).map(([D,$])=>[D,$]));Object.entries(N).forEach(D=>{let[$,C]=D,k=a[t][$],O=h[t][$]?.(C,k);!O&&s&&el(t,T),O===void 0&&qp(T,"ANY"),f[t][$]=O});let F=a[t],I={...a[t],...N},R=Object.keys(N).every(D=>d[t][D]===!0),P=!0;for(let[D,$]of Object.entries(N)){let C=c[t][D]==="ANY";as($)>1&&!C&&(zp(t,x,T),f[t][D]=!1,P=!1)}if(!P){Ae(e,{...i,validationStatusObject:f});return}R&&Object.entries(I).every(([D,$])=>fi(c[t][D],F[D],$))&&!s||(a[t]=I,Ae(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:a[t],oldValue:F,validationValue:f[t],instanceId:e}),fr({instanceId:e,prop:t}),y.forEach(D=>{fr({instanceId:D,prop:t})})))},gr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=oe(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=We();if(!(t in l)){$p(t,h);return}let f=n?Qp({value:l[t]}):l[t],d=i===gi?r(f):r,v=p[t]==="ANY";if(Ee.isObject(f)&&!v){TC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}vC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},Zp=({instanceId:e,prop:t,value:r})=>{let o=oe(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,Ae(e,{...o,store:n}),Ho({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},em=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=oe(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),_C=e=>{let t=oe(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=em({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Ae(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{gr({instanceId:e,prop:l,value:p,action:"SET"})})},fr=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Ae(e,{...r,computedPropsQueque:n}),!s)){let i=oe(e);if(!i)return;Ae(e,{...i,computedRunning:!0}),$t(()=>_C(e))}},SC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=oe(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Hp(r,We());return}s.add({prop:t,keys:r,fn:o}),Ae(e,{...n,callBackComputed:s})},xC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=oe(e);if(!n)return;let{store:s,bindInstance:i}=n,a=em({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);gr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},tm=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Dr({instanceId:e,prop:t}))return;let s=r.length===0?(ss(),o({}),Jc()):r;xC({instanceId:e,prop:t,keys:s,callback:o}),SC({instanceId:e,prop:t,keys:s,fn:o})};var rm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ee.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},om=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;gr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var CC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=We();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Gp(t,a),{state:void 0,unsubscribeId:""};let c=ke();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},EC=({instanceId:e,unsubscribeId:t})=>{let r=oe(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),Ae(e,{...r,watcherByProp:o,watcherMetadata:n}))},nm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=CC({state:n,prop:t,callback:r,wait:o});return s?(Ae(e,s),()=>{EC({instanceId:e,unsubscribeId:i})}):()=>{}},sm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return nm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=oe(p)?.store;return h&&t in h})??"",c=nm({instanceId:a,prop:t,callback:r,wait:o}),l=oe(e);return l?(Ae(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=oe(e);p&&Ae(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var im=e=>{let t=as(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Kp({data:e,depth:t,logStyle:We()}),type:Go({data:e,prop:"type",depth:t,logStyle:We(),fallback:qc}),fnTransformation:Go({data:e,prop:"transform",depth:t,logStyle:We(),fallback:r=>r}),fnValidate:Go({data:e,prop:"validate",depth:t,logStyle:We(),fallback:()=>!0}),strict:Go({data:e,prop:"strict",depth:t,logStyle:We(),fallback:!1}),skipEqual:Go({data:e,prop:"skipEqual",depth:t,logStyle:We(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var am=e=>{let t=oe(e);if(!t)return{};let{store:r}=t;return r??{}},lm=e=>{let t=oe(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?am(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(am(o))))},cm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Up(t,We())},um=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return cm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";return cm({instanceId:n,prop:t})};var pm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Ho({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),fr({instanceId:e,prop:t}),i.forEach(a=>{fr({instanceId:a,prop:t})})):Zc(t,We()))},Ti=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){pm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";pm({instanceId:n,prop:t})},mm=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Pp({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),fr({instanceId:e,prop:t}),i.forEach(a=>{fr({instanceId:a,prop:t})}),{success:!0}):(Zc(t,We()),{success:!1}):new Promise(a=>a({success:!1}))},hm=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return mm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";return mm({instanceId:n,prop:t})};var dm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;return r},fm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{store:r}=t;console.log(r)},gm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},bm=({instanceId:e})=>{let t=oe(e);console.log(t)};var wC=e=>!(e==null||!Ie(Object,e)||Ie(Map,e)||Ie(Set,e)||Ie(Function,e)),IC=e=>{let t=We();return new Proxy({},{set(r,o,n){let s=De.get(e);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&Jp(o,t),i||a?!1:(gr({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!De.has(e))return;let n=De.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],yi(o)),!(o in n.store))for(let i of n.bindInstance){let a=De.get(i);if(a&&o in a.store){s=a.store[o],yi(o);break}}if(s!==void 0)return wC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!De.has(e))return!1;let n=De.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=De.get(s);if(i&&o in i.store)return!0}return!1}})},ym=({instanceId:e})=>{let t=De.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=IC(e);return Ae(e,{...t,proxiObject:r}),r};var MC=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Ae(t,{...r,bindInstanceBy:n})},vm=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Ae(t,{...r,bindInstanceBy:n})},kC=({bindStores:e,selfStore:t})=>{let o=[...Ie(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Tm=({value:e,instanceId:t})=>{let r=oe(t);if(!r)return;kC({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Ie(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Ae(t,{...r,bindInstance:l}),s.forEach(p=>{MC({selfId:t,bindId:p})})};var _m=e=>{let t=De.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{vm({selfId:e,bindId:n})}),Rp(e),Op(e)};var Sm=({instanceId:e,values:t})=>{let r=oe(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Ae(e,r)};var _i=(e={})=>{let t=ke(),r=im(e),o=rm(r);return Ae(t,o),om(t,r),{getId:()=>t,bindStore:n=>{Tm({value:n,instanceId:t})},get:()=>lm(t),getProp:n=>um({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:t,prop:c})||gr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:t,prop:l})||gr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:gi})},getProxi:()=>ym({instanceId:t}),quickSetProp:(n,s)=>{Dr({instanceId:t,prop:n})||Zp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=sm({instanceId:t,prop:c,callback:s,wait:i});return a&&$t(()=>{Ti({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=Xc(i);tm({instanceId:t,prop:c,keys:l,callback:s}),$t(()=>{Ti({instanceId:t,prop:c})})},emit:n=>{let s=Lr(n);Ti({instanceId:t,prop:s})},emitAsync:async n=>{let s=Lr(n);return hm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Sm({instanceId:t,values:n})},getValidation:()=>dm({instanceId:t}),debug:()=>{bm({instanceId:t})},debugStore:()=>{fm({instanceId:t})},debugValidate:()=>{gm({instanceId:t})},destroy:()=>{_m(t)}}};var Ce=_i({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var tl=!1,cs=new Map;function xm(){if(cs.size===0){globalThis.removeEventListener("DOMContentLoaded",xm),tl=!1;return}for(let e of cs.values())e();cs.clear()}function RC(){tl||(tl=!0,globalThis.addEventListener("DOMContentLoaded",xm,{passive:!1}))}var PC=e=>{let t=ke();return cs.set(t,e),typeof globalThis<"u"&&RC(),()=>cs.delete(t)},Cm=PC;function ls(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function NC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=Ce.get();Ce.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=NC({type:c,event:a}),d=a.target,v={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=Ce.getProp("spinYMaxValue"),T=Ce.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:M,pixelY:x}=ls(a);v.spinX=Gc(S,-T,T),v.spinY=Gc(_,-y,y),v.pixelX=M,v.pixelY=x}for(let y of r.values())y(v)}function s(){t||(t=!0,o=Ce.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=ke();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&t&&(globalThis.removeEventListener(e,n),t=!1)}}}var Em=Br("click"),wm=Br("mousedown"),Im=Br("touchstart"),Mm=Br("mousemove"),km=Br("touchmove"),Rm=Br("mouseup"),Pm=Br("touchend"),Nm=Br("wheel");var So=0,Ke=new Map,AC=(e=()=>{})=>{let t=ke();return Ke.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ke.has(t)){let r=Ke.get(t);if(!r)return;let o=r.data.size;if(Ke.delete(t),!o)return;So=So-o}}}},OC=({id:e,callBackObject:t,frame:r})=>{if(!Ke.has(e))return;let o=Math.max(r,0),{currentFrame:n}=Ce.get(),s=Ke.get(e);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,t),So++)},$C=e=>{Ke.has(e)&&Ke.delete(e)},LC=e=>{let t=Ke.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Ce.get();t.freeze={active:!0,atFrame:r}},DC=({id:e,update:t=!0})=>{let r=Ke.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ce.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},FC=e=>{let t=Ke.get(e);if(!t)return;let r=t.data.size;So=So-r,t.data.clear()},BC=e=>Ke.get(e)??{},VC=e=>{for(let t of Ke.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),So--)}},WC=({id:e,obj:t={}})=>{if(!Ke.has(e))return;let r=Ke.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},zC=()=>So,jC=e=>{for(let[t,r]of Ke){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ke.set(t,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-e}:s})}},qo={add:AC,get:BC,update:OC,remove:$C,clean:FC,fire:VC,fireObject:WC,getCacheCounter:zC,updateFrameId:jC,freeze:LC,unFreeze:DC};var rl=!1,Si=new Map;function Am(){if(Si.size===0){globalThis.removeEventListener("visibilitychange",Am),rl=!1;return}let e={visibilityState:document.visibilityState};for(let t of Si.values())t(e)}function UC(){rl||(rl=!0,globalThis.addEventListener("visibilitychange",Am,{passive:!1}))}var HC=e=>{let t=ke();return Si.set(t,e),typeof globalThis<"u"&&UC(),()=>Si.delete(t)},xi=HC;var us=[],GC=(e=()=>{},t=100)=>{us.push({cb:e,priority:t})},qC=({time:e,fps:t})=>{us.length!==0&&(us.sort((r,o)=>r.priority-o.priority),us.forEach(({cb:r})=>r({time:e,fps:t})),us.length=0)},St={add:GC,fire:qC};var ol=[],JC=e=>{ol.push(e)},YC=()=>{let e=[...ol];return ol.length=0,e},Jo={add:JC,get:YC};var Vr=new Map,XC=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},KC=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},QC=(e,t)=>{let o=Math.max(t,0)+Ce.getProp("currentFrame"),n=Vr.get(o)??[];Vr.set(o,[...n,e]),Ce.emit("requestFrame")},ZC=()=>Vr.size,Yo={add:QC,fire:KC,updateKeys:XC,getAmountOfFrameToFire:ZC};var nl="animationStop",Om=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===nl&&e.preventDefault()})};var $m=!1,Ci=({force:e=!1,duration:t=30}={})=>{if($m&&!e){let{instantFps:r}=Ce.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,v=Math.max(d,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){Ce.quickSetProp("instantFps",y),$m=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ci();var cl=1e7,Bm=2e3,ll=!1,xo=[],Qe=Ot(),Lm=0,sl=Ot(),il=0,ul=0,al=0,Xo=!1,xt=60,ki=xt,Ei=0,wi=0,br=0,Ii=!1,Mi=!1,eE=()=>xt<ki/5*3,tE=()=>xt<ki/5*4,rE=()=>{!eE()||Ii||(Ii=!0,setTimeout(()=>{Ii=!1},4e3))},oE=()=>{!tE()||Mi||(Mi=!0,setTimeout(()=>{Mi=!1},4e3))},nE=()=>{br=0,Ce.quickSetProp("currentFrame",br),Yo.updateKeys(cl),qo.updateFrameId(cl)};xi(({visibilityState:e})=>{Xo=e!=="visible"});Om();Ce.watch("requestFrame",()=>{Ri()});var Dm=()=>{br>=cl&&nE(),St.fire({time:Qe,fps:xt});let e=Jo.get();if(e.length>0)for(let t of e)xo.push(t);ll=!1,xo.length>0||Yo.getAmountOfFrameToFire()>0||qo.getCacheCounter()>0||Qe<Bm?Ri():(Xo=!0,br=0,ul=Qe,Ce.quickSetProp("currentFrame",br))},Fm=e=>{Qe=e,il=Qe-sl,Xo&&(Lm+=il),sl+=il,Qe=Math.round(sl-Lm);let t=Math.round(1e3/xt);al=Math.abs(Qe-ul-t);let r=al>100?al:0;Qe=Qe-r,ul=Qe,Xo?(wi=Qe,Ei=0,xt=Ce.getProp("instantFps")):Ei++,Qe>wi+1e3&&!Xo&&(xt=Qe>Bm?Math.round(Ei*1e3/(Qe-wi)):Ce.getProp("instantFps"),wi=Qe,Ei=0),xt>ki&&(ki=xt),rE(),oE(),xo.forEach(n=>n({time:Qe,fps:xt})),Yo.fire({currentFrame:br,time:Qe,fps:xt}),qo.fire(br),br++,Ce.quickSetProp("currentFrame",br),xo.length=0,Xo=!1,Ce.getProp("deferredNextTick")?$t(()=>Dm()):Dm()},Ri=()=>{ll||(typeof globalThis>"u"?setTimeout(()=>Fm(Ot()),Tp):requestAnimationFrame(Fm),ll=!0)},Lt={add:s=>{xo.push(s),Ri()},addMultiple:(s=[])=>{xo=[...xo,...s],Ri()},getFps:()=>xt,mustMakeSomething:()=>Ii,shouldMakeSomething:()=>Mi};var ms=!1,ps=new Map,Pi=()=>{},pl=0,ml=0;function sE(){if(ps.size===0){globalThis.removeEventListener("resize",Pi),ms=!1;return}let e=globalThis.innerHeight,t=globalThis.innerWidth,r=e!==pl,o=t!==ml;pl=e,ml=t;let n={scrollY:globalThis.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ps.values())s(n)}function iE(){ms||(ms=!0,pl=globalThis.window.innerHeight,ml=globalThis.window.innerWidth,Pi=To(()=>sE()),globalThis.addEventListener("resize",Pi,{passive:!1}))}var aE=e=>{if(globalThis.window===void 0)return()=>{};let t=ke();return ps.set(t,e),iE(),()=>{ps.delete(t),ps.size===0&&ms&&(globalThis.removeEventListener("resize",Pi),ms=!1)}},Vm=aE;var ds=!1,hs=new Map,cE="UP",zm="DOWN",hl=0,Ko=0,dl=zm,Wm={scrollY:Ko,direction:dl};function fl(){if(hs.size===0){globalThis.removeEventListener("scroll",fl),ds=!1;return}hl=Ko,Ko=globalThis.scrollY,dl=Ko>hl?zm:cE,Wm={scrollY:Ko,direction:dl};for(let e of hs.values())e(Wm)}function lE(){ds||(ds=!0,hl=globalThis.scrollY,Ko=globalThis.scrollY,window.addEventListener("scroll",fl,{passive:!0}))}var uE=e=>{if(globalThis.window===void 0)return()=>{};let t=ke();return hs.set(t,e),lE(),()=>{hs.delete(t),hs.size===0&&ds&&(globalThis.removeEventListener("scroll",fl),ds=!1)}},yr=uE;var gs=!1,fs=new Map,gl=()=>{};function pE(e){if(fs.size===0){gl(),gs=!1;return}Lt.add(()=>{St.add(()=>{for(let t of fs.values())t(e)},0)})}function mE(){gs||(gs=!0,gl=yr(pE))}var hE=e=>{if(globalThis.window===void 0)return()=>{};let t=ke();return fs.set(t,e),mE(),()=>{fs.delete(t),fs.size===0&&gs&&(gl(),gs=!1)}},jm=hE;var ys=!1,bs=new Map,Um=()=>{},bl=()=>{};function dE(e){if(bs.size===0){bl(),ys=!1;return}Lt.add(()=>{St.add(()=>{for(let t of bs.values())t(e)},0)})}function fE(){ys||(ys=!0,Um=mi(e=>dE(e),Ce.getProp("throttle")),bl=yr(Um))}var gE=e=>{if(globalThis.window===void 0)return()=>{};let t=ke();return bs.set(t,e),fE(),()=>{bs.delete(t),bs.size===0&&ys&&(bl(),ys=!1)}},Hm=gE;function Gm(e){let t=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),e==="START"&&t(),n=!1;return}Lt.add(()=>{St.add(()=>{let p={scrollY:globalThis.scrollY};if(e==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=To(()=>a()),r=yr(o),e==="START"&&(t=yr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=ke();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var qm=Gm("START"),Jm=Gm("END");function Qo(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=ke();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&t&&(globalThis.removeEventListener(e,o),t=!1)}}}var Ym=Qo("pointerover"),Xm=Qo("pointerdown"),Km=Qo("pointermove"),Qm=Qo("pointerup"),Zm=Qo("pointerout"),eh=Qo("pointerleave");var ze=Symbol("LinkedList.setNext"),je=Symbol("LinkedList.setPrev"),Ni="after",yl="before",Zo=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[ze](t){this.#n=t}get prev(){return this.#t}[je](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},Ai=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new Zo(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[ze](r),r[je](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new Zo(t);return this.#l.add(r),this.#n?(r[ze](this.#n),this.#n[je](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[ze](t.next),t.next&&t.next[je](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[je](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[ze](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new Zo(r);return this.#l.add(o),o[je](t),o[ze](t.next),t.next&&t.next[je](o),t[ze](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new Zo(r);return this.#l.add(o),o[ze](t),o[je](t.prev),t.prev&&t.prev[ze](o),t[je](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Ni){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Ni&&r.next===t?this:o===yl&&r.prev===t?this:(t.prev&&t.prev[ze](t.next),t.next&&t.next[je](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Ni&&(t[je](r),t[ze](r.next),r.next&&r.next[je](t),r[ze](t),r===this.#t&&(this.#t=t)),o==yl&&(t[je](r.prev),t[ze](r),r.prev&&r.prev[ze](t),r[je](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Ni)}moveBefore(t,r){return this.move(t,r,yl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[ze](n),n&&n[je](o),s&&s[ze](i),i&&i[je](s),t[je](s),t[ze](i),r[je](o),r[ze](n),s&&s[ze](t),i&&i[je](t),o&&o[ze](r),n&&n[je](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[ze](o),t[je](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function bE(e){return _i(e)}function yE(){return Ce.getProp("instantFps")}function vE(){return Lt.getFps()}function TE(){return Lt.mustMakeSomething()}function _E(){return Lt.shouldMakeSomething()}function SE(e=()=>{}){return Lt.add(e)}function xE(e=()=>{}){return St.add(e)}function CE(e=()=>{}){return Jo.add(e)}function EE(e=()=>{},t=0){return Yo.add(e,t)}async function wE({force:e=!1,duration:t=30}={}){return await Ci({force:e,duration:t})}function IE(e=()=>{}){return Cm(e)}var ME=qo;function kE(e=()=>{}){return Vm(e)}function RE(e=()=>{}){return xi(e)}function PE(e=()=>{}){return Em(e)}function NE(e=()=>{}){return wm(e)}function AE(e=()=>{}){return Im(e)}function OE(e=()=>{}){return Mm(e)}function $E(e=()=>{}){return km(e)}function LE(e=()=>{}){return Rm(e)}function DE(e=()=>{}){return Pm(e)}function FE(e=()=>{}){return Nm(e)}function BE(e=()=>{}){return jm(e)}function VE(e=()=>{}){return yr(e)}function WE(e=()=>{}){return Hm(e)}function zE(e=()=>{}){return qm(e)}function jE(e=()=>{}){return Jm(e)}function UE(e=()=>{}){return Ym(e)}function HE(e=()=>{}){return Xm(e)}function GE(e=()=>{}){return Km(e)}function qE(e=()=>{}){return Qm(e)}function JE(e=()=>{}){return Zm(e)}function YE(e=()=>{}){return eh(e)}var XE=Ce;function KE(){return new Ai}var m={};vo(m,{afterRouteChange:()=>sh,beforeRouteChange:()=>nh,componentMap:()=>z,createComponent:()=>Bd,eventDelegationMap:()=>yn,getActiveParams:()=>ch,getActiveRoute:()=>ah,getChildrenIdByName:()=>Oi,getComponentNameById:()=>bh,getDebugMode:()=>Fd,getIdByInstanceName:()=>qt,getNumberOfActiveInvalidate:()=>Gg,getNumberOfActiveRepeater:()=>qg,getParentIdById:()=>vs,getPropsFromParent:()=>ba,getRoot:()=>ua,getStateById:()=>Yt,getStateByName:()=>Gh,getTree:()=>_h,inizializeApp:()=>Hg,loadUrl:()=>Ug,mainStore:()=>me,onRouteLoading:()=>ih,removeAndDestroyById:()=>nt,setStateById:()=>hn,setStateByName:()=>Od,staticProps:()=>ya,tempDelegateEventMap:()=>ws,tick:()=>Sr,updateStateByName:()=>Ld,useComponent:()=>Qi,useMethodArrayByName:()=>Eh,useMethodByName:()=>Ch,watchById:()=>Ct});var en="activeRoute",tn="activeParams",Co="beforeRouteChange",rn="afterRouteChange",Gt="routeIsLoading",ut="parserAsync",Wr="default",th="repeater",rh="invalidate",oh="render_component";var me=u.createStore({[en]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[tn]:()=>({value:{},type:"any",skipEqual:!1}),[Co]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[rn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Gt]:()=>({value:!1,type:Boolean}),[ut]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),on=()=>{me.set(ut,{element:document.createElement("div"),parentId:"",persistent:!1,source:Wr},{emit:!1})};var nh=e=>me.watch(Co,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),sh=e=>me.watch(rn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),ih=e=>me.watch(Gt,t=>{e(t)}),ah=()=>{let{activeRoute:e}=me.get();return e},ch=()=>{let{activeParams:e}=me.get();return e};var z=new Map;var Oi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=z.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var lh="",uh,ph=({contentId:e=""})=>{lh=e};var mh=()=>{uh=document?.querySelector(lh)},$i=()=>uh;var zr=new Map,hh=({instanceName:e,id:t})=>{let r=zr.get(e)??[];zr.set(e,[...r,t])},dh=({instanceName:e,id:t})=>{let r=zr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&zr.delete(e),o.length>0&&zr.set(e,o)},vl=({instanceName:e})=>zr.get(e)??[];var fh=new WeakMap,gh=({element:e,id:t})=>{fh.set(e,t)},nn=({element:e})=>fh.get(e);var bh=(e="")=>{if(!e||e==="")return;let r=z.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},yh=e=>{if(!e)return"name-not-found";let t=nn({element:e})??"",r=z.get(t);return r?r.componentName:"name-not-found"},qt=(e="")=>e?vl({instanceName:e})?.[0]:void 0,vh=(e="")=>e?vl({instanceName:e})??[]:[];var Li=(e="")=>{if(!e||e==="")return!1;let r=z.get(e)?.element;return r?!$i()?.contains(r):!1};var Th=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of z.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Th({chunk:l})}]},[]),_h=()=>{let e=[...z.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Th({chunk:e})};var Sh=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=z.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}z.set(e,{...o,methods:{...n,[t]:r}})}},xh=({id:e})=>{if(!e||e==="")return{};let r=z.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Ch=e=>{let t=qt(e);if(!t||t==="")return;let r=xh({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Eh=e=>vh(e).map(r=>xh({id:r})).filter(r=>Object.keys(r).length>0);function*Jt(e){if(e){yield e;for(let t of e.children)yield*Jt(t)}}function QE(e,t){let r=[];for(let o of Jt(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var jr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...QE(n,t)];return r};var Eo=new Set,wh=!1,Ih=e=>{Eo.add(e)},Mh=e=>{Eo.delete(e)},kh=e=>{let t;for(let r of Eo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Eo.delete(t),[t]):[]},Rh=({element:e})=>[...Eo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Ph=({element:e})=>[...Eo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],Nh=()=>Eo.size;var ot=e=>{wh=e},Dt=()=>wh;var Ah=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r];return o?o.push(t):e[r]=[t],e},Oh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return{...e,[r]:o.filter(n=>n!==t)}},$h=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Di=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var vs=(e="")=>{if(!e||e==="")return;let r=z.get(e)?.parentId;if(r)return r},Lh=({id:e=""})=>{if(!e||e==="")return;let t=z.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=z.get(r);if(!n)return;let{child:s}=n;s&&z.set(r,{...n,child:Ah({currentChild:s,id:e,componentName:o})})},Dh=({element:e,id:t})=>{if(!e)return;if(!0){jr(e,!1).forEach(n=>{n.setParentId(t)});return}Rh({element:e}).forEach(o=>{o.setParentId(t)})},sn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=nn({element:t}),r||(t=t.parentNode);return r??""},Tl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=z.get(e);if(!r)return!1;let o=r?.parentId??"";return Tl({moduleScopeId:o,targetComponentId:t})};var yt=new Map,Ts=new Map;var Fh=({componentId:e})=>{if(e)for(let[t,r]of yt){let{componentId:o}=r;o===e&&yt.delete(t)}};var Ze=new Map;var be=new Map;var Bh=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{be.has(r)&&be.delete(r)}),Ze.delete(e)}};var et=new Map;var G=new Map;var Vh=({id:e})=>{if(et.has(e)){let t=et.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),et.delete(e)}};var Wh=({id:e,parentId:t,componentName:r})=>{if(!e||!t)return;let o=z.get(t);o?.child&&z.set(t,{...o,child:Oh({currentChild:o.child,id:e,componentName:r})})};var zh=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},jh=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},_l=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Uh=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var an=new Set;var Hh=e=>{an.delete(e)};var nt=({id:e=""})=>{if(!e||e==="")return;let t=z.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{nt({id:f})}),Wh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),Bh({id:e}),Vh({id:e}),l&&l.length>0&&jh({componentId:e,repeatId:l}),p&&p.length>0&&dh({instanceName:p,id:e}),h||Hh(e),Fh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,z.delete(e)};var Yt=(e="")=>!e||e===""?void 0:z.get(e)?.state?.get();var Gh=(e="")=>{let t=qt(e);return t||console.warn(`component ${e}, not found`),Yt(t)};var cn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=z.get(e);if(!r)return;let{freezedPros:o}=r;o&&z.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Ur=({id:e="",prop:t})=>{if(!e||e==="")return;let r=z.get(e);if(!r)return;let{freezedPros:o}=r;o&&z.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},wo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=z.get(e)?.freezedPros;return o?o.includes(t):!1};var Hr=new Map;var qh=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(e,t)};var Jh="data-mobjs",Io="componentid",Fi="bindtextid",Bi="bindobjectid";var ln="staticprops",Vi="bindprops",Yh="name",Xh="name",Kh="slot",Ft="repeaterchild";var Xt="currentRepeaterValue",Kt="repeatPropBind",Wi="bindevents",Qt="weakbindevents",un="bindeffect",Qh="parentid";var Zt="bindrefid",vr="bindrefname",zi="invalidateid",ji="mobjsrepeat";var er={current:{},index:-1},Zh="QUEQUE_BINDPROPS",Sl="QUEQUE_REPEATER",xl="QUEQUE_INVALIDATE";var ed=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Dt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(ji)??"";qh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Gr=new Map;var td=({invalidateId:e,host:t})=>{let r=be.get(e);if(!r)return;let o=t.parentNode;be.set(e,{...r,element:o}),Gr.set(e,t)};var rd=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(zi)??"";td({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Set,od=e=>{qr.add(e)},nd=()=>{qr.clear()},sd=({element:e})=>[...qr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&qr.delete(t),r}),id=({name:e,element:t})=>[...qr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&qr.delete(r),o}),ad=()=>[...qr],Ui=()=>qr.size;var cd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Xh))}connectedCallback(){let e=this.shadowRoot?.host;e&&od(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Cl=new Set,ld=e=>{Cl.add(e)},Hi=()=>[...Cl],Gi=e=>Cl.delete(e);var ud=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Dt();if(p&&!!1&&ld(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Dt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#x]=[Yh,ln,Vi,"key",Wi,Xt,Kh,Qh,Ft,Qt,Kt,Zt,vr].map(h=>p.getAttribute(h)??"")),Ih(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Mh(l),Gi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Ct=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:z.get(e)?.state?.watch(t,r,{wait:o??!1});function Xr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Mo=new Map,md=()=>Mo.size===0,El=1e3,hd=e=>{if(Mo.size>=El)return console.warn(`maximum loop event reached: (${El})`),()=>{};let t=u.getUnivoqueId();return Mo.set(t,e),()=>Mo.delete(t)},pd=()=>Mo.size===0||Mo.size>=El,Et=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&Mo.forEach(r=>{console.log(r)}),pd()&&t){t();return}return new Promise(r=>{if(pd()){r();return}Et({debug:e,previousResolve:t??r})})};var ko=new Map,fd=()=>ko.size===0,wl=1e3,gd=e=>{if(ko.size>=wl)return console.warn(`maximum loop event reached: (${wl})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},dd=()=>ko.size===0||ko.size>=wl,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&ko.forEach(r=>{console.log(r)}),dd()&&t){t();return}return new Promise(r=>{if(dd()){r();return}wt({debug:e,previousResolve:t??r})})};var pn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.invalidateId).map(r=>be.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var mn=({id:e})=>{let t=et.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var Ji=new Map,bd=(e,t)=>{Ji.set(e,t)},Yi=new Map,yd=({host:e,componentId:t,bindTextId:r})=>{Yi.set(e,{componentId:t,bindTextId:r})},vd=e=>e.match(/(?<=\[).+?(?=])/g),Td=e=>e.split("[")?.[0],ew=({previous:e,current:t})=>{let r=vd(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Td(t)]):e?.[t]},_d=(e,t,...r)=>{let o=Yt(e),n=r.map(s=>s.split(".").reduce((a,c)=>ew({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Sd=()=>{[...Yi].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){Ji.delete(t);return}let o=Ji.get(t);o&&(Ji.delete(t),tw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Yi.clear()},xd=()=>Yi.size,tw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=mn({id:e}),a=pn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=vd(f),y=d&&d?.length>0?Td(f):f;if(y)return Ct(e,y,async()=>{await wt(),await Et(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Cd=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Fi)??"";yd({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xi=new Map,Ed=(e,t)=>{Xi.set(e,t)},Il=new Map,wd=({host:e,componentId:t,bindObjectId:r})=>{Il.set(e,{componentId:t,bindObjectId:r})},Id=e=>e.map(t=>"observe"in t?Re.extractkeyFromProp(t.observe):(Re.initializeCurrentDependencies(),"value"in t?t?.value():t(),Re.getFirstCurrentDependencies())),Md=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),kd=()=>{[...Il].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Xi.delete(t);return}let o=Xi.get(t);o&&(Xi.delete(t),rw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Il.clear()},rw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=mn({id:e}),a=pn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Ct(e,p,async()=>{await wt(),await Et(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Rd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Bi)??"";wd({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Ki={},Ro=()=>Ki,Pd=new Set,Nd=()=>{Ki=Object.fromEntries([...Pd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(Ki).length}`),ud(Ki),cd(),rd(),ed(),Cd(),Rd()},Qi=e=>{!e||e?.length===0||e.forEach(t=>{Pd.add(t)})};var Zi=({componentName:e,propName:t})=>(Ro()?.[e]?.componentParams?.exportState??[]).includes(t),Ad=({componentName:e})=>Ro()?.[e]?.componentParams?.exportState??[];var hn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let s=z.get(e),i=s?.state,a=s?.componentName??"";if(!Zi({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Od=(e="")=>{let t=qt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>hn(t,r,o,{emit:n})};var $d=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let i=z.get(e),a=i?.state,c=i?.componentName??"";if(!Zi({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Ld=(e="")=>{let t=qt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>$d(t,r,o,{emit:n,clone:s})};var Ml={scoped:!1,maxParseIteration:5e3,debug:!1},Dd=e=>{Ml={...Ml,...e}},It=()=>Ml,Fd=()=>{let{debug:e}=It();return e},Bd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(Qi(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Vd=[],Wd="",zd="",jd=e=>{Vd=[...e]},dn=({hash:e=""})=>Vd.find(({hash:t})=>e===t),Ud=({hash:e=""})=>{Wd=e},ea=()=>Wd,Hd=({hash:e=""})=>{zd=e},Gd=()=>zd;var qd=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=z.get(e);r&&(z.set(e,{...r,element:t}),gh({element:t,id:e}))},ta=({id:e=""})=>!e||e===""?void 0:z.get(e)?.element,Jd=({element:e})=>e?nn({element:e}):"",kl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:_l({repeatId:t}).map(n=>z.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),Rl=({id:e,repeatId:t})=>!e||e===""?[]:_l({repeatId:t}).map(o=>z.get(o)).filter(o=>o!==void 0).map(o=>o.id);function ow(e){let t=[];for(let r of Jt(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var Yd=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...ow(o)];return t};function nw(e){let t=[];for(let r of Jt(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var Xd=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...nw(o)];return t};function sw(e,t){for(let r of Jt(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var Kd=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=sw(o,t);if(n)return n}return null};function iw(e){for(let t of Jt(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var Qd=e=>{let t=e||document.body;for(let r of t.children){let o=iw(r);if(o)return o}return null};var _s=new Map,Po=e=>{let t=u.getUnivoqueId();return _s.set(t,e),t},Zd=(e="")=>{if(!e)return er;let t=_s.get(e);return _s.delete(e),t??er};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var ra=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Xt)||i.deref()?.setAttribute(Xt,Po({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Kt)||i.deref()?.setAttribute(Kt,`${o}`),i.deref()?.hasAttribute(Ft)||i.deref()?.setAttribute(Ft,`${n}`)})},oa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Ft)){Gi(i);return}i.setAttribute(Xt,Po({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Kt,`${o}`),i.setAttribute(Ft,`${n}`)})},Kr=({stringDOM:e,parent:t,position:r})=>{ot(!0);let o=document.createRange().createContextualFragment(e);ot(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Ss=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;ot(!0),e.forEach(n=>{n&&o.append(n)}),ot(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var cw=({element:e,content:t})=>{let{debug:r}=It();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},lw=({element:e})=>{ad().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},uw=({element:e})=>{if(!!1&&Ui()===0)return;let t=Yd(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=id({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},pw=({element:e,content:t})=>{let r=cw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=sd({element:r});a&&(Ss({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Ss({parent:r,elements:[...e.childNodes],position:"afterbegin"}),uw({element:r}),lw({element:r}),n&&n.length>0&&r.setAttribute(Qt,n),s&&s.length>0&&r.setAttribute(Zt,s),i&&i.length>0&&r.setAttribute(vr,i);let{debug:c}=It();c&&r.setAttribute(Jh,o??"")}return e.remove(),r},ef=({element:e,content:t})=>({newElement:pw({element:e,content:t})});var Pl=0,tf=()=>{Pl+=1},Nl=()=>Pl,rf=()=>{Pl=0},Al=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=kh(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var of=({cb:e=()=>{},id:t})=>{if(!t)return;let r=z.get(t);r&&z.set(t,{...r,destroy:e})};var xs=new Map,nf=({id:e,cb:t=()=>{}})=>{xs.set(e,t)},Ol=async({id:e,element:t})=>{let o=await xs.get(e)?.({element:t});of({cb:o,id:e}),xs.delete(e)};var Cs=({id:e})=>{if(!G.has(e))return;if(Hr.has(e)){let r=Hr.get(e);r?.removeCustomComponent(),r?.remove(),Hr.delete(e)}return G.get(e)?.element};var na=({id:e="",value:t})=>{if(!e||e==="")return;let r=z.get(e);r&&z.set(e,{...r,currentRepeaterState:t})},sf=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:sf({rootNode:e,currentNode:t.parentElement})},mw=({rootNode:e,node:t})=>{if(e)return sf({rootNode:e,currentNode:t.parentElement})},_r=({id:e=""})=>{if(!e||e==="")return er;let r=z.get(e)?.currentRepeaterState;return r||er};var af=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=z.get(e);if(!o)return;let n=Cs({id:t}),s=mw({rootNode:n,node:r});z.set(e,{...o,repeaterInnerWrap:s})},Es=({id:e})=>!e||e===""?void 0:z.get(e)?.repeaterInnerWrap;var fn=new Map,$l=1e5,gn=e=>{if(fn.size>=$l)return console.warn(`maximum loop event reached: (${$l})`),()=>{};let t=u.getUnivoqueId();return fn.set(t,e),()=>fn.delete(t)},cf=()=>fn.size===0||fn.size>=$l,Sr=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&fn.forEach(r=>{console.log(r)}),cf()&&t){t();return}return new Promise(r=>{if(cf()){r();return}Sr({debug:e,previousResolve:t??r})})};var Ll=!0,sa=()=>{Ll=!0},ia=()=>{Ll=!1},aa=()=>Ll;var bn=new Map,lf=(e=[])=>{let t=Ie(Object,e)?[e]:e,r=u.getUnivoqueId();return bn.set(r,t),r},uf=({element:e,componentId:t,bindEventsId:r})=>{let o=bn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!aa())return;ia(),await Sr(),sa();let c=_r({id:t});i(a,c?.current,c?.index)})}),bn.delete(r))},pf=()=>{bn.clear()};var ca=({id:e="",unWatchArray:t=[]})=>{let r=z.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&z.set(e,{...r,parentPropsWatcher:[...o,...t]})},mf=({id:e=""})=>{if(!e||e==="")return;(z.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var hf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Re.extractkeyFromProp(s)):(Re.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Re.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},la=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Yt(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!z.has(e))return;let l=_r({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{hn(e,h,f,{emit:n})})},df=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=yt.get(e);o&&(yt.set(e,{...o,componentId:r}),Ts.set(r,e),Dl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Dl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=Ts.get(e);if(!o)return;r&&Ts.delete(e);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!fd()&&(await wt(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!md()&&(await Et(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Ct(a,h,async()=>{if(await wt(),await Et(),l)return;let f=gn({state:h,id:e,type:Zh});l=!0,u.useNextLoop(()=>{la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ca({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===e&&yt.delete(h)}},ff=()=>{yt.clear(),Ts.clear()};var tr=({id:e,container:t})=>{let o=z.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=z.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){nt({id:s});return}else tr({id:c,container:t})})};var Fl=new Map,hw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r)),dw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Re.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Re.getCurrentDependencies()),vf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?hw(i):dw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Fl.set(s,n),s},Tf=e=>{[...e.querySelectorAll(`[${un}]`)].forEach(r=>{let o=r.getAttribute(un);if(!o)return;let n=Fl.get(o);n&&(r.removeAttribute(un),fw({data:n,element:r}),Fl.delete(o))})},gf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},bf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},yf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},fw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=mn({id:o}),f=pn({id:o});return[...new Set([...i,...h,...f])].map(v=>(a&&u.useFrame(()=>{gf({ref:r,data:a})}),c&&u.useFrame(()=>{bf({ref:r,data:c})}),l&&u.useFrame(()=>{yf({ref:r,data:l})}),Ct(o,v,async()=>{if(await wt(),await Et(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&gf({ref:r,data:a}),c&&r.deref()&&bf({ref:r,data:c}),l&&r.deref()&&yf({ref:r,data:l}),p=!1})}))})))})};var _f=({element:e})=>{let t=e.querySelectorAll(`[${Zt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Zt),i=n.getAttribute(vr);if(n.removeAttribute(Zt),n.removeAttribute(vr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},gw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],bw=({refs:e,refName:t,element:r})=>({...e,[t]:gw([...e[t],r])}),Sf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=z.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?bw({refs:i,refName:t,element:o}):{...i,[t]:[o]};z.set(n,{...s,refs:a})})})},Bl=({id:e})=>{let t=z.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return z.set(e,{...t,refs:n}),n},xf=({id:e})=>{let t=Bl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Cf=document.createElement("div"),Ef=({element:e})=>{Cf=e},ua=()=>Cf;var wf=":FORCE",ws=new Map,yn=new WeakMap,Vl=[],If=[],Mf=(e=[])=>{let t=Ie(Object,e)?[e]:e,r=u.getUnivoqueId();return ws.set(r,t),r},yw=e=>{let t=e?.parentNode;for(;t;){if(yn.has(t))return{target:t,data:yn.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},vw=e=>{let t=yn.get(e);return t?{target:e,data:t}:yw(e)};async function Tw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=vw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!aa()&&!a||(ia(),await Sr(),sa(),!document.contains(o)))return;let c=Jd({element:o}),l=c?_r({id:c}):er;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var kf=async e=>{await wt(),await Et(),[...e.parentNode?.querySelectorAll(`[${Qt}]`)??[]].forEach(n=>{let s=n.getAttribute(Qt)??"";n.removeAttribute(Qt);let i=ws.get(s);ws.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(wf),d=p.toUpperCase().replaceAll(wf,"").toLowerCase();return Vl.includes(d)||Vl.push(d),{event:d,callback:h,force:f}}));yn.set(n,a)});let o=ua();Vl.forEach(n=>{If.includes(n)||(If.push(n),o.addEventListener(n,Tw.bind(null,n)))})};var vn="repeater",pa="invalidate",Qr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===vn?G.entries():be.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Tl({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===vn?[d]:d})}return i};var Rf=({id:e,repeatId:t})=>{if(!et.has(e))return;let r=et.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),et.set(e,o)};var Zr=({id:e,repeatParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:vn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Rf({id:e,repeatId:n})})};var ma=({repeatParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:vn}).forEach(({initializeModule:o})=>{o()})};var Pf=({invalidateId:e,unsubscribe:t})=>{let r=be.get(e);r&&be.set(e,{...r,unsubscribe:t})};var Nf=({id:e,invalidateId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);be.has(t)&&be.delete(t),Ze.set(e,o)};var eo=({id:e,invalidateParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:pa}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Nf({id:e,invalidateId:n})})};var Wl=({id:e})=>{if(!be.has(e))return;if(Gr.has(e)){let r=Gr.get(e);r?.removeCustomComponent(),r?.remove(),Gr.delete(e)}return be.get(e)?.element};var ha=({invalidateParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:pa}).forEach(({initializeModule:o})=>{o()})};var Af=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=sn({element:Wl({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;cn({id:n,prop:h});let d=Wl({id:s}),v=gn({state:h,id:n,type:xl}),y=hd({state:h,id:n,type:xl});c=!0,u.useNextLoop(async()=>{if(!d){Ur({id:n,prop:h});return}await t(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),tr({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),me.set(ut,{element:d,parentId:l??n,persistent:i,source:rh},{emit:!1}),await me.emitAsync(ut),on(),c=!1,v(),y(),ha({invalidateParent:d,id:n}),ma({repeatParent:d,id:n}),Ur({id:n,prop:h}),r()})}));Pf({invalidateId:s,unsubscribe:p})};var Of=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r));var $f=({invalidateId:e,initializeModule:t})=>{let r=be.get(e);r&&be.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Lf=({invalidateId:e})=>{let t=be.get(e);t&&be.set(e,{...t,initialized:!0})};var Df=({invalidateId:e,scopeId:t,observe:r})=>{be.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Ff=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var Tn=new Set,Bf=({id:e,state:t,container:r})=>{Tn.add({id:e,state:t,container:r})},Vf=({id:e,state:t,container:r})=>{r&&Tn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Tn.delete(o)})},Wf=({id:e="",state:t="",container:r})=>[...Tn].some(n=>e===n.id&&t===n.state&&r===n.container);var jf=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.filter(n=>!o.has(n?.[r]))},Uf=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},zf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Hf=({current:e,previous:t,key:r})=>zf({arr:e,key:r})&&zf({arr:t,key:r}),da=({data:e=[],key:t=""})=>{let r=new Set;return e.filter(o=>{let n=o?.[t];return r.has(n)?!1:(r.add(n),!0)})},fa=({children:e,previousChildren:t=[],hasKey:r})=>{let o=new Set(t),n=t.length>0,s={};for(let i of e){let{index:a}=_r({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},Gf=({children:e,key:t,data:r})=>{if(!e?.length||!r?.length)return[];let o=new Map(e.map(n=>{let{current:s}=_r({id:n[0]});return[s[t],n]}));return r.map(n=>o.get(n[t])).filter(n=>n!==void 0)};var _n=new Map,ga=(e={})=>{let t=u.getUnivoqueId();return _n.set(t,e),t},ba=(e="")=>{let t=_n.get(e);return _n.delete(e),t??{}};var qf=()=>{_n.clear()};var ya=(e={})=>`${ln}="${ga(e)}"`,va=(e,t,r)=>Math.min(Math.max(e,t),r);var zl=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var _w="index",No=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=zl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Re.setCurrentDependencies(e);let f=zl({repeatId:s}),d=Math.max(f?.length-1,0);if(h===_w){if(t){let v=f?.findIndex(y=>y[r]===o);return va(v,0,d)}return va(n,0,d)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[va(n,0,d)],c??l)},set(){return!1}})};var Jf=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=No({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),v=Dt();ot(!0);let y=i.createContextualFragment(d);if(ot(v),!1){let T=jr(y,!1).map(S=>new WeakRef(S));ra({components:T,current:p,index:h,observe:n,repeatId:s,key:void 0})}return oa({components:Hi(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},Sw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Xt}="${Po({current:t,index:e})}"
    ${Kt}="${r}" ${Ft}="${o}"`,Yf=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=No({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Sw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),Xf=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Dt();ot(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(ot(c),!1){let p=jr(l,!1).map(h=>new WeakRef(h));ra({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return oa({components:Hi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},xw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Kt}="${o}"
    ${Xt}="${Po({current:r,index:t})}"
    ${Ft}="${n}"`,Kf=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>xw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},Qf=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=No({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Dt();ot(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(ot(h),!1){let d=jr(f,!1).map(v=>new WeakRef(v));ra({components:d,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return oa({components:Hi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},Zf=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Xt}="${Po({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Kt}="${r}"
                            ${Ft}="${o}"`,p=No({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Ta=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Yt(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Is=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var Sn=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Cw=({element:e,container:t})=>{let r=yh(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},eg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=da({data:t,key:n});Sn({repeatId:a,currentData:l});let p=jf(r,l,n),h=p.map(T=>{let S=T?.[n];return kl({keyValue:S,repeatId:a})}).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let M=Es({id:_}),x=M??S;eo({id:s,invalidateParent:x}),Zr({id:s,repeatParent:x}),T.forEach(({id:E})=>{nt({id:E})}),M&&M.remove()}),f||Is({repeatId:a}).filter(_=>p.map(M=>M?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:M}=_;eo({id:s,invalidateParent:M}),Zr({id:s,repeatParent:M}),tr({id:s,container:M})});let d=Uf(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let M=kl({keyValue:T,repeatId:a}),x=M[0]?.element?Es({id:M[0]?.id??""}):Is({repeatId:a}).find(w=>w.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:M,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:M,persistentDOMwrapper:x})=>{if(!T){let{debug:N}=It();x&&y.append(x);let F=M?.[0]?.element;!x&&F&&(y.append(F),N&&Cw({element:M[0]?.element,container:o}));return}let E=l?.[_],w=c?Kf({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):Xf({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),A=Dt();if(ot(!0),c){let N=v.createContextualFragment(w);y.append(N)}!c&&w&&y.append(w),ot(A)}),o.append(y),l};var Ew=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},tg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{Sn({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?Yf({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):Jf({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||Ss({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=fa({children:c,hasKey:!1});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let M=ta({id:_}),x=Es({id:_}),E=x??M;eo({id:i,invalidateParent:E}),Zr({id:i,repeatParent:E}),nt({id:_}),x&&x.remove()})});let{debug:v}=It();if(v&&Ew(o),f.length>0)return t;let y=Is({repeatId:s});if(!y)return t;y.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;eo({id:i,invalidateParent:_}),Zr({id:i,repeatParent:_}),tr({id:i,container:_}),_.remove()})}return t};var rg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:h=[]})=>{let v=(Hf({current:o,previous:n,key:s})?eg:tg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:h});return me.set(ut,{element:r,parentId:a??i,persistent:t,source:th},{emit:!1}),await me.emitAsync(ut),on(),v};var og=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ta({id:c}),d=Cs({id:l}),v=d?sn({element:d})??"":"";return i(),o(e,async(T,S)=>{if(!u.checkType(Array,T))return;let _=Cs({id:l}),M=gn({state:e,id:c,type:Sl}),x=gd({state:e,id:c,type:Sl});if(cn({id:c,prop:e}),Wf({id:c,state:e,container:_})){Ur({id:c,prop:e}),t(e,S,{emit:!1}),M(),x();return}let w=Rl({id:c,repeatId:l});f&&await s(),n&&(w.forEach(P=>{nt({id:P})}),_&&(_.textContent="")),_&&Bf({id:c,state:e,container:_});let A=await rg({state:e,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:h,currentChildren:n?[]:w}),N=Rl({id:c,repeatId:l}),F=!!a,I=fa({children:N,previousChildren:w,hasKey:F}),R=F?[...Gf({children:I,key:a,data:A})]:I;R.forEach((P,L)=>{P.forEach(D=>{let $=A?.[L];if(!$)return;let C=F?T.findIndex(k=>`${k?.[a]}`==`${A?.[L]?.[a]}`):L;na({id:D,value:{current:$,index:C}})})}),u.useNextLoop(async()=>{f&&i(),Vf({id:c,state:e,container:_}),Ur({id:c,prop:e}),M(),x(),ha({invalidateParent:_,id:c}),ma({repeatParent:_,id:c}),R.length===0&&Ta({repeatId:l,id:c})})})};var ng=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=og({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});Ff({repeatId:e,unsubscribe:d})};var sg=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var ig=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var ag=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var cg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var lg=({repeatId:e,scopeId:t})=>{let r=et.get(t)??[];et.set(t,[...r,{repeatId:e}])};var ug=({invalidateId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{invalidateId:e}])};var pg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(tr({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,v),me.set(ut,{element:d,parentId:c,persistent:Li(c),source:oh},{emit:!1}),await me.emitAsync(ut),on()},getChildren:d=>Oi({id:c,componentName:d}),freezeProp:d=>{let v=Re.extractkeyFromProp(d);return cn({id:c,prop:v.toString()})},unFreezeProp:d=>{let v=Re.extractkeyFromProp(d);return Ur({id:c,prop:v.toString()})},unBind:()=>mf({id:c}),bindProps:d=>{let v="props"in d?d:{props:d};return`${Vi}="${hf({...v,parentId:c})}" `},staticProps:d=>` ${ln}="${ga(d)}" `,remove:()=>{nt({id:c})},removeDOM:d=>{tr({id:c,container:d}),d.textContent=""},getParentId:()=>vs(c),watchParent:(d,v)=>{let y=Ct(vs(c),d,v);y&&ca({id:c,unWatchArray:[y]})},onMount:d=>nf({id:c,cb:d}),bindEvents:d=>`${Wi}="${lf(d)}"`,delegateEvents:d=>`${Qt}="${Mf(d)}"`,bindEffect:d=>`${un}="${vf({data:d,id:c})}"`,addMethod:(d,v)=>{Sh({id:c,name:d,fn:v})},setRef:d=>`${Zt}="${c}" ${vr}="${d}"`,getRef:()=>xf({id:c}),getRefs:()=>Bl({id:c}),bindText:(d,...v)=>{let y=u.getUnivoqueId(),T=()=>_d(c,d,...v);return bd(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Io}="${c}" ${Fi}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...v)=>{let y=Id(v),T=u.getUnivoqueId(),S=()=>Md(d,...v);return Ed(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Io}="${c}" ${Bi}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Of(d),_=u.getUnivoqueId(),M=`${zi}=${_}`,x=()=>v(),E=!1;return ug({invalidateId:_,scopeId:c}),Df({invalidateId:_,scopeId:c,observe:S}),$f({invalidateId:_,initializeModule:()=>{E||(Af({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Li(c),id:c,invalidateId:_,renderFunction:x}),E=!0,Lf({invalidateId:_}))}}),`<mobjs-invalidate ${M} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:M=!1})=>{let x=Re.extractkeyFromProp(d),E=u.getUnivoqueId(),w=S!=="";lg({repeatId:E,scopeId:c}),cg({repeatId:E,scopeId:c,observe:x});let A=e()?.[x],N=w?da({data:A,key:S}):A;Sn({repeatId:E,currentData:N});let F=M?Zf({currentUnique:N,key:S,observe:x,repeatId:E,hasKey:w,render:_}):"",I=M?[]:Qf({currentUnique:N,render:_,observe:x,repeatId:E,key:S,hasKey:w}),R=!1;return ag({repeatId:E,initialDOMRender:I}),sg({repeatId:E,initializeModule:()=>{R||(ng({repeatId:E,persistent:Li(c),state:x,setState:t,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:M}),R=!0,ig({repeatId:E}),Uh({repeatId:E})||Ta({repeatId:E,id:c}))}}),`<mobjs-repeat ${ji}="${E}" style="display:none;"></mobjs-repeat>${F}`}});var jl=({componentName:e,currentProps:t={}})=>{let o=Ro()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var mg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=sn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),h=e.getCurrentKey()??"",f=e.getComponentName(),d=i?.split(" ").join(""),v=ba(d),y={...e.dataset},T=e.getRepeaterPropBind(),S=Zd(l);return{element:e,props:{...jl({componentName:f,currentProps:y}),...jl({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:h,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var hg=e=>{an.add(e)};var dg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=er,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:M=""})=>{let x=u.createStore(o);$h({props:r,store:x}),n&&x.bindStore(n),y||hg(_),p&&p.length>0&&zh({componentId:_,repeatId:p}),t&&t.length>0&&hh({instanceName:t,id:_});let E=Ad({componentName:M}),w=new Set(E);return x.setProxiReadOnlyProp(E),z.set(_,{element:e,componentName:M,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(A="",N={},{emit:F=!0}={})=>{let I=wo({id:_,prop:A}),R=Re.extractkeyFromProp(A),P=w.has(R);P&&Di({prop:R,componentName:M,action:"updateState"}),!(I||P)&&x.set(R,N,{emit:F??!0,usePropAsString:!0})},updateState:(A="",N=()=>({}),{emit:F=!0,clone:I=!1}={})=>{let R=wo({id:_,prop:A}),P=Re.extractkeyFromProp(A),L=w.has(P);L&&Di({prop:P,componentName:M,action:"updateState"}),!(R||L)&&x.update(P,N,{emit:F??!0,clone:I??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(A="")=>x.emit(A),emitAsync:async(A="")=>await x.emitAsync(A),computed:(A="",N=()=>{},F=[])=>{let I=Re.extractkeyFromProp(A);if(w.has(I)){Di({prop:I,componentName:M,action:"computed"});return}return x.computed(I,N,F,{usePropAsString:!0})},watch:(A="",N=()=>{},{wait:F=!1,immediate:I=!1}={})=>x.watch(A,N,{wait:F??!1,immediate:I??!1}),debug:()=>x.debug()}};var fg=({id:e})=>(Ze.get(e)??[]).map(({invalidateId:r})=>{let o=be.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var gg=({id:e})=>(et.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var bg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Wr})=>{let{debug:n}=It();n&&console.log("parse source:",o);let s=Ro(),i=[],a=Al({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let h=l.getComponentName(),f=s?.[h]?.componentFunction,d=s?.[h]?.componentParams,{scoped:v,bindStore:y}=d,{props:T,id:S,componentName:_,instanceName:M,key:x,dynamicPropsId:E,currentRepeatValue:w,bindEventsId:A,parentId:N,componentRepeatId:F,repeatPropBind:I}=mg({element:l,parentIdForced:r}),R=d?.state??{},{getState:P,setState:L,updateState:D,getProxi:$,emit:C,emitAsync:k,computed:O,watch:B,debug:V}=dg({element:l,props:T,state:R,id:S,componentName:_,instanceName:M,key:x,repeatPropBind:I,persistent:t,parentId:N,componentRepeatId:F,bindStore:y});Lh({id:S}),F&&F?.length>0&&(na({id:S,value:w}),af({id:S,repeatId:F,element:l})),df({propsId:E,repeatPropBind:I,componentId:S});let q=pg({getState:P,setState:L,updateState:D,getProxi:$,emit:C,emitAsync:k,computed:O,watch:B,id:S,key:x,bindEventsId:A,debug:V}),ee=await f(q),ue=l.classList,{newElement:re}=ef({content:ee,element:l});if(nd(),ue.length>0&&re?.classList.add(...ue),!0,!re)return;qd({id:S,newElement:re});let ye=fg({id:S}),ve=gg({id:S});A&&uf({element:re,componentId:S,bindEventsId:A});let ge=v??It().scoped;ge&&await Ol({id:S,element:re}),re?.inizializeCustomComponent?.(q),i.push({onMount:async()=>{ge||await Ol({id:S,element:re})},initializeBindPropsWatcher:()=>{Dl({componentId:S,repeatPropBind:I,inizilizeWatcher:!0})},fireInvalidateFunction:ye.length>0?()=>{ye.forEach(({initializeModule:J})=>{J?.()})}:()=>{},fireRepeatFunction:ve.length>0?()=>{ve.forEach(({initializeModule:J})=>{J?.()})}:()=>{}});let Ne=Al({element:e,currentSelectors:c});c=Ne.parseSourceArray,l=Ne.componentToParse;let Be=Nl()===It().maxParseIteration;if(tf(),Be){console.warn(`dom parse reached max parse limit: ${Nl()}`);break}}let p=_f({element:e});Object.keys(p).length>0&&Sf(p);for(let h of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:d,fireInvalidateFunction:v,fireRepeatFunction:y}=h;await f(),y(),v(),d()}i.length=0,c.length=0,l=null,kf(e),Tf(e),Sd(),kd()};var Ms=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Wr})=>{await bg({element:e,persistent:t,parentIdForced:r,source:o}),rf()},yg=()=>{me.watch(ut,async({element:e,parentId:t,persistent:r=!1,source:o=Wr})=>{await Ms({element:e,parentIdForced:t??"",persistent:r,source:o})})};var vg=()=>{qf(),pf(),ff()};var Tg,_g,Sg=({fn:e})=>{e&&(_g=e)},xg=({fn:e})=>{e&&(Tg=e)},Cg=()=>_g,Eg=()=>Tg;var wg=!0,Ig=e=>{wg=e},Mg=()=>wg;var kg=()=>{for(let e of an)nt({id:e})};var Rg=new Map,Pg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Ng=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{me.set(Gt,!0),await Sr();let s=$i();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=me.get(),c=Pg({route:e,params:o}),l=Pg({route:i.route,params:a}),p=window.scrollY;Rg.set(l,p);let h=Rg.get(c)??0;me.set(Co,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=me.watch(Co,()=>{f=!0});vg(),me.set(en,{route:e,templateName:t}),me.set(tn,o);let v=dn({hash:e}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Cg(),M=s.cloneNode(!0);_&&M&&!y&&(await _({oldNode:M,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(M,s)),s.replaceChildren(),kg(),Kr({stringDOM:S,parent:s,position:"afterbegin"}),await Ms({element:s}),y||(s.style.visibility=""),f||me.set(rn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Mg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=Eg();x&&!y&&(await x({oldNode:M,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),M.remove()),M=null,d?.(),me.set(Gt,!1)};var Ag=({route:e})=>e,Og=e=>{Ag=e},$g=({route:e})=>{let t=Ag({route:e});return{route:t,isRedirect:t!==e}};var Lg=({hash:e=""})=>{let t=ea(),r=Gd();return e===""?t:dn({hash:e})?e:r},Dg=({hash:e=""})=>dn({hash:e})?.templateName??"",Fg=({hash:e=""})=>dn({hash:e})?.restoreScroll??!0;var Bg="",Vg=!0,xr="",Wg="",to,Hl,ks,Gl=e=>e.replace("?","").replace("/",""),zg=e=>e.replace("#","").replace("/","").replace(".",""),ww=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Gl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Iw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&me.getProp(Gt)&&e.preventDefault()},{passive:!1});var _a=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=me.get();if(o){globalThis.location.hash=Bg.replace("#","");return}ks||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=$g({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Gl(i?.[1]??"");Wg=xr,xr=zg(i?.[0]??"");let c=ww(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Lg({hash:xr}),h=Dg({hash:xr&&xr.length>0?xr:ea()}),f=xr===Wg&&l.length===0&&!Vg;e&&!f&&(Bg=`#${xr}${l}`,await Ng({route:p,templateName:h,isBrowserNavigation:Fg({hash:xr})&&!!ks,params:c,skipTransition:!!(ks??Hl)})),e||(me.set(en,{route:p,templateName:h}),me.set(tn,c)),Hl=void 0,u.useNextLoop(()=>{Vg=!1})},jg=()=>{_a(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ks=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),_a()})},Ug=({url:e,params:t,skipTransition:r})=>{if(!e||me.getProp(Gt))return;Hl=r;let o=e.split("?"),n=zg(o?.[0]??""),s=Iw(t),i=Gl(o?.[1]??""),a=s??i;to=a.length>0?a:"",ks=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Hg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Dd(h);let f=document.querySelector(e),d=await t();Og(s),!(!r||!f)&&(ph({contentId:r}),Ef({element:f}),xg({fn:l}),Sg({fn:c}),Ig(p),yg(),Nd(),jd(o),Ud({hash:i}),Hd({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),mh(),_a({shouldLoadRoute:!1}),await Ms({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),jg())};var Gg=()=>be.size;var qg=()=>G.size;var le={};vo(le,{clamp:()=>rt,getDefault:()=>Fw,mq:()=>Vw,printDefault:()=>Bw,setDefault:()=>Dw});var Ao={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var he={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},Ns="min",Jg="max",Jl="desktop",As="easeLinear",Rs="default",Yl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Xl=10,Ps=.06,Kl="#ff0000",Ql="#14df3b",Zl=8,eu=10,tu=1e3,ru=!1,kw=!1,Rw=!1,Pw=.01,Nw=.06,Yg=e=>{let t=He({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=He({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=He({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Aw(e?.mq??{}),s=He({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Jl,type:String}),i=He({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:Ns,type:String}),a=He({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Xl,type:Number}),c=ql(e?.sequencer?.ease,"sequencer"),l=He({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Rs,type:String}),p=He({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ps,type:Number}),h=He({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Kl,type:String}),f=He({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:Ql,type:String}),d=He({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Zl,type:Number}),v=He({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Rs,type:String}),y=He({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ps,type:Number}),T=He({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:eu,type:Number}),S=ql(e?.parallaxTween?.ease,"parallaxTween"),_=He({prop:"tween.duration",value:e?.tween?.duration,defaultValue:tu,type:Number}),M=ql(e?.tween?.ease,"tween"),x=He({prop:"tween.relative",value:e?.tween?.relative,defaultValue:ru,type:Boolean}),E=He({prop:"spring.relative",value:e?.spring?.relative,defaultValue:kw,type:Boolean}),w=He({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Rw,type:Boolean}),A=He({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Pw,type:Number}),N=He({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Nw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:M,relative:x},spring:{relative:E,config:e?.spring?.config?{...Ao,...e.spring.config}:Ao},lerp:{relative:w,precision:A,velocity:N}}},He=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Aw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Yl},ql=(e,t)=>{let r=Object.keys(he).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:As};var st=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:st(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=st(Object.assign({},s),i,r):e[n]=i}),e)};function Xg(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Yl,defaultMq:{value:Jl,type:Ns},sequencer:{duration:Xl,ease:As},scrollTrigger:{springConfig:Rs,lerpConfig:Ps,markerColor:{startEnd:Kl,item:Ql}},parallax:{defaultRange:Zl,springConfig:Rs,lerpConfig:Ps},parallaxTween:{duration:eu,ease:As},tween:{duration:tu,ease:As,relative:ru},spring:{relative:!1,config:Ao},lerp:{relative:!1,precision:.01,velocity:.06}}}var ce=(()=>{let e=Xg();return{set:n=>{e=Yg(st(Xg(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Ow=(e="desktop")=>window.innerWidth<ce.get("mq")[e],$w=(e="desktop")=>window.innerWidth>=ce.get("mq")[e],Lw=(e="desktop")=>ce.get("mq")[e],fe={max:Ow,min:$w,getBreackpoint:Lw};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},rt=(e,t,r)=>Math.min(Math.max(e,t),r),Kg=(e,t,r)=>(1-r)*e+r*t,ro=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Os=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},Qg=(e,t)=>e.map(r=>r[t]);function Dw(e){ce.set(e)}function Fw(e){return ce.get(e)}function Bw(){ce.print()}function Vw(e,t){switch(e){case"min":return fe.min(t);case"max":return fe.max(t);case"get":return fe.getBreackpoint(t)}}var U={};vo(U,{createLerp:()=>rI,createMasterSequencer:()=>Qw,createScrollerTween:()=>Xw,createSequencer:()=>Kw,createSpring:()=>tI,createStaggers:()=>Zw,createTimeTween:()=>eI});var Sa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Cr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),xn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Er=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Cn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var ou=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var xa="radial",rr="start";var En="center",wn="edges",In="random",Zg="MERGE_FROM_UP",nu="MERGE_FROM_DOWN",Oo="equal",$o="start";var Lo="center",Mn={type:Oo,each:0,waitComplete:!1,from:rr,grid:{col:1,row:1,direction:"col"}},qe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var wr=e=>e.map(t=>`${t} | `).join(""),oo=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Mt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Ir=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},eb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},tb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},rb=()=>{console.warn("relative prop is not allowed inside a timeline")},ob=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},nb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},sb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},ib=e=>{console.warn(`timeline setTween: ${e} is not a string`)},ab=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},cb=()=>{console.warn("setTween fail")},lb=e=>{console.warn(`label ${e} not founded`)},ub=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},pb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},su=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},mb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},hb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Do=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ca=()=>{console.warn("stagger each must be a Number ")},db=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},fb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},gb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var bb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},yb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},vb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Tb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},_b=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Sb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},xb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Cb=()=>{console.warn("createStaggers error: items array can not be empty")},Eb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},wb=()=>{console.warn(`screateStaggers error: type should be: ${Oo} || ${rr} || ${"end"} || ${Lo}`)},Ib=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Mb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},iu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},kb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Rb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Pb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Nb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Ab=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Rn=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Ob=e=>{console.warn(`${e} value must be a string`)},$b=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Lb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Db=e=>{console.warn(`${e} not found`)},Fb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Bb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},Vb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Wb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},zb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},jb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)} or a Number between 0 and 100`)},Ub=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)}`)},Hb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Gb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${wr(t)}`)},qb=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${wr(t)} or a custom css propierites like margin|line-height|...`)},Jb=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${wr(t)}`)},Yb=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${wr(t)}`)},Xb=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},Kb=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${wr(t)}`)},Qb=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},Zb=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},au=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${wr(t)}`)},ey=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},ty=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ry=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},oy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},ny=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},cu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${wr(r)}, es: 45deg|100px|50vw etc..`)},sy=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},iy=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Bt={[he.easeLinear]:(e,t,r,o)=>r*e/o+t,[he.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[he.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[he.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[he.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[he.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[he.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[he.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[he.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[he.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[he.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[he.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[he.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[he.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[he.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[he.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[he.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[he.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[he.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[he.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[he.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[he.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[he.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[he.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[he.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[he.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[he.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[he.easeInBounce]:(e,t,r,o)=>r-Bt[he.easeOutBounce](o-e,0,r,o)+t,[he.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[he.easeInOutBounce]:(e,t,r,o)=>e<o/2?Bt[he.easeInBounce](e*2,0,r,o)*.5+t:Bt[he.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var pt=e=>e in Bt?Bt[e]:(Do(e),Bt[ce.get("tween").ease]);var ay=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",lu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),cy=e=>/^\d+\.\d+$|^\d+$/.test(e),Oe=(e,t)=>{let r=new RegExp(`^${ay(t)}$`,"i");return(e.match(r)||[]).length},or=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},uu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),pu=(e,t)=>e.some(r=>{let o=new RegExp(`^${ay(r)}$`,"i");return(t.match(o)||[]).length});var ly=e=>e&&(Oe(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:Oe(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:Oe(e,b.PROP_ROTATE)?b.PROP_ROTATE:Oe(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:Oe(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:Oe(e,b.PROP_OPACITY)?b.PROP_OPACITY:Oe(e,b.PROP_SCALE)?b.PROP_SCALE:Oe(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:Oe(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:Oe(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),uy=e=>{if(e){if(or(e,b.PX))return b.PX;if(or(e,b.VH))return b.VH;if(or(e,b.VW))return b.VW}return""},Ea=e=>Oe(e,b.POSITION_TOP)?b.POSITION_TOP:Oe(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:Oe(e,b.POSITION_LEFT)?b.POSITION_LEFT:Oe(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",py=e=>or(e,b.PX)?b.PX:or(e,b.VH)?b.VH:or(e,b.VW)?b.VW:or(e,b.WPERCENT)?b.WPERCENT:or(e,b.HPERCENT)?b.HPERCENT:or(e,b.DEGREE)?b.DEGREE:b.PX;var Vt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ia=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||eb(e),o||tb(t),r&&o},no=e=>{let t=u.checkType(Number,e);return!t&&e&&vb(e),t?e:ce.get("sequencer").duration},Ma=e=>{let t=u.checkType(Number,e);return!t&&e&&_b(e),t&&e?e:1},my=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?e:ce.get("sequencer").ease},hy=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?pt(e):pt(ce.get("parallaxTween").ease)},dy=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Sb(e),o||xb(t),r&&o},fy=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ca(),t},gy=e=>{if(!e)return;let r=[rr,"end",En,wn,In].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||yb(e),s},hu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||db(e),t},by=e=>{if(!e)return;let r=[xa,"row","col"].includes(e);return r||gb(),r},yy=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||fb(),t},vy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Cb(),t},Ty=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],_y=e=>{if(!e)return;let r=[Oo,$o,"end",Lo].includes(e);if(!r){wb();return}return r};var so=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Mb(e,t),r?e:ce.get(t).relative},ka=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?pt(e):pt(ce.get("tween").ease)},Ra=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?e:ce.get("tween").ease},du=e=>{let{config:t}=ce.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&su(e),!s&&r&&hb(e),s?t[e]:t.default},Sy=e=>{let{config:t}=ce.get("spring"),r=e&&e in t;return!r&&e&&su(e),r},fu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&mb(),t?e:{}},gu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Tb(e),o?r:ce.get("tween").duration},kt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&iu(e,t),r&&e===!0},pe=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&iu(e,t),o?e:r},Pa=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&kb(e,t),o?e:r},nr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Rb(e,t),o?e:r},it=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Pb(e,t),o?e:r},Na=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Nb(),t?e:ce.get("lerp").velocity},Aa=e=>{let t=u.checkType(Number,e);return!t&&e&&Ab(),t?e:ce.get("lerp").precision},xy=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Ob(t),r},Ls=e=>{let t=u.checkType(Number,e);return!t&&e&&Lb(),t?e:void 0},Ds=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&$b(),t},Cy=(e,t)=>{e===-1&&Db(t)},io=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&ny(r,e),o?e:t},Ey=e=>{let t=u.checkType(Function,e);return!t&&e&&Fb(e),t?e:({resolve:r})=>{r()}},wy=e=>{let t=u.checkType(Array,e);return!t&&e&&sb(e),t},Iy=e=>{let t=u.checkType(String,e);return!t&&e&&ib(e),t},Pn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},bu=e=>u.checkType(Element,e)?e:document.querySelector(e),Fs=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Bb(e,t),o?e:b.DIRECTION_VERTICAL},yu=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Vb(t),i?e:null},My=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Wb(),t?e:void 0},ky=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&zb(),t?e:{}},Ry=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&jb(e,t),r?e:b.ALIGN_CENTER},Py=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&Ub(e,t),r?e:!1},vu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Hb(e,t),o?e:r},Ny=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Gb(t,r),o?t:b.TYPE_PARALLAX},Ay=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=cy(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&Qb(e),n?10-e:10-ce.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&Zb(e),o?e:"0px"}})(),Fo=(e,t,r)=>{let o=ce.get("defaultMq").value;if(!e)return o;let n=ce.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&au(e,s,t,r),i?e:o},Bo=(e,t,r)=>{let o=ce.get("defaultMq").type;if(!e)return o;let n=[Jg,Ns],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&au(e,n,t,r),s?e:o},Oy=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&qb(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&ry(),(r||o)&&e!==b.PROP_TWEEN&&oy(),a&&ey();let c=a?b.PROP_VERTICAL:e,l=ly(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},$y=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||Jb(e,t);let o=r?e:b.EASE_LERP;return r?e:o},Oa=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&Yb(e,r,t),o?e:b.EASE_LERP},Ly=(e,t)=>{let r=t===b.TYPE_PARALLAX?ce.get("parallax").springConfig:ce.get("scrollTrigger").springConfig;if(!e)return r;let o=ce.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&Kb(e,n),s?e:r},Dy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&ty();let o=t===b.TYPE_PARALLAX?ce.get("parallax").lerpConfig:ce.get("scrollTrigger").lerpConfig;return r?e:o},Fy=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=uu(r,e);return n||cu(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=uu([b.DEGREE],e);return n||cu(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=lu(e);return n||iy(e,t),n?e:"0"}let o=lu(e);return o||sy(t),o?e:"0"};var $a=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Rt=e=>({type:_y(e?.stagger?.type)?e.stagger.type:Mn.type,each:fy(e?.stagger?.each)?e.stagger.each:Mn.each,from:gy(e?.stagger?.from)?e?.stagger?.from:$o,grid:{col:hu(e?.stagger?.grid?.col)?e.stagger.grid.col:Mn.grid.col,row:hu(e?.stagger?.grid?.row)?e.stagger.grid.row:Mn.grid.row,direction:by(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:yy(e?.stagger?.waitComplete)?e.stagger.waitComplete:Mn.waitComplete}),sr=(e,t)=>e.length>t.length?e:t;var Bs=e=>e%2,Ww=e=>Math.floor(Math.random()*e),zw=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},jw=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=$a(s);if(n===In)return{index:e,frame:o[Ww(o.length)]};if(n===rr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===En){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:0}:Bs(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===wn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Bs(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Bs(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Ie(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},By=(e,t,r)=>{if(t.grid.direction==="row"){let o=Os(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...Qg(o,a)],[])].flat()}else return e},Vy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=By(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=By(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Os(c,h),d=f[0];return d.forEach((y,T)=>{let{index:S,frame:_}=jw(T,f[0].length,r,zw(d,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var Uw=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),Hw=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)La(o,r+f,l)&&c.push(o[r+f][l]),La(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(La(o,r-f,l)&&c.push(o[r-f][l]),La(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),La=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Tu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Os(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=Uw(s,o,n),a=Hw(i,o,n,s),c=i.reduce((d,v,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?Zg:nu)===nu?c.reduce((d,v,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return d.push(S),d}},[]):c.reduce((d,v,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return d.push(S),d}},[]).toReversed()).reduce((d,v)=>v.length===0?d:[...d,v],[])}};var Gw=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Tu(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=$a(r.each),v=h*d;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Tu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},qw=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[rr,"end",En,wn,In];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(bb(),r.from=rr),Vy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Pt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===xa?Gw({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):qw({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Nn=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},An=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var at=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},ir=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),On=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),$n=(e,t)=>Object.keys(e).map(r=>{if(!Vt(t[r])||!Vt(e[r]))return Ir(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Mr=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Ln=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Dn=(e,t,r,o)=>(u.checkType(Number,e)||Ca(),e>0&&t&&(r.length>0||o.length>0));var Da=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var $e=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Fn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Bn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Vn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),_u=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Wy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=Kg(s,i,r/t*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var kr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;constructor(t){this.#n=Rt(t??{}),this.#t=so(t?.relative,"lerp"),this.#i=Na(t?.velocity),this.#l=Aa(t?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#x=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=qe,this.#_=qe;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Wy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=$e(this.#e,"currentValue");if(this.#m||Nn({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=$e(this.#e,"toValue");An({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#N(t,r){this.#w(t,r)}async#R(){if(Dn(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("lerp",t);let r=sr(this.#d,this.#a);if(this.#n.grid.col>r.length){Mt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#C=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#C&&(this.#y=!0,await this.#R(),this.#y=!1),Ln({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#N(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=xn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=Sa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Da((t,r)=>this.#N(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=st(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=so(s,"lerp"),this.#i=Na(o),this.#l=Aa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=ao(t);return this.#A(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=On(t);return this.#A(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ro(t,r))return oo("lerp goFromTo:",t,r),new Promise(s=>s);let n=$n(t,r);return this.#A(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Mr(t);return this.#A(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#x=!1;let o=Mr(t);this.#e=Vn(o,this.#e);let{reverse:n}=this.#E(r??{});kt(n,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=Cn(this.#e,this.#t),this.#e=Cr(this.#e)}#A(t,r,o={}){this.#e=Vn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(kt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=Cn(this.#e,this.#t),kt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#e,"currentValue")}getInitialData(){return $e(this.#p,"currentValue")}getFrom(){return $e(this.#e,"fromValue")}getTo(){return $e(this.#e,"toValue")}getFromNativeType(){return Bn(this.#e)}getToNativeType(){return Fn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(t){this.#i=Na(t),this.#T=st(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Aa(t),this.#T=st(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ir(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Fa=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Vs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(t){this.#n=hy(t?.ease),this.#t=no(t?.duration),this.#i=Rt(t),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=sr(this.#s,this.#u);if(this.#i.grid.col>t.length){Mt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:qe,fastestStagger:qe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,v=this.#n(t,f,d,this.#t);n.currentValue=_e(v)}let o=$e(this.#l,"currentValue");u.useNextTick(()=>{Fa({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=ao(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ir(t,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Ws=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var zy=(e,t)=>Object.keys(e).map(r=>Vt(e[r])?{prop:r,toValue:e[r],ease:pt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:pt(t)})),jy=(e,t)=>Object.keys(e).map(r=>Vt(e[r])?{prop:r,fromValue:e[r],ease:pt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:pt(t)})),Uy=(e,t,r)=>Object.keys(e).map(o=>!Vt(t[o])||!Vt(e[o])?(Ir(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:pt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:pt(r)});var Fe={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Su={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Hy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Su[o].get]:n},void 0),Gy=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var qy=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:S,end:_,values:M}=e[T],x=null;for(let A of M)if(A.prop===o.prop){x=A;break}if(!x||!x.active)continue;let{prop:E}=x;if(Gy(e,T,E,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,v;r>=s&&r<=i?v=l(r-s,h,p-h,f):v=d;let y=Number.isNaN(v)?d:v;o.currentValue=_e(y),o.settled=!0}return t};var xu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Hy(e,o,c,s);return!p&&p!==0?a:{...a,[Su[s].set]:p}});return{...r,values:i}});var Cu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Ba=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Cu(a,"start");return Cu(c,"priority")};var Va=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var zs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=no(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:my(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Rt(t),this.#m=!0,this.#C=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let t=sr(this.#h,this.#l);if(this.#g.grid.col>t.length){Mt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:qe,fastestStagger:qe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=Fe.NONE}){if(o){this.#x({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:t,isLastDraw:r,direction:n}))}#x({partial:t=0,isLastDraw:r=!1,direction:o=Fe.NONE}){this.#a&&(this.#r=t,this.#v(t)),!this.#a&&this.#r&&(!o||o===Fe.NONE)&&(this.#f=t>=this.#r?Fe.FORWARD:Fe.BACKWARD),!this.#a&&(o===Fe.BACKWARD||o===Fe.FORWARD)&&(this.#f=o),this.#n=qy({timeline:this.#t,valuesState:this.#n,partial:t});let n=$e(this.#n,"currentValue");Fa({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#r=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#v(t=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:Fe.FORWARD},s={shouldFire:t<=o,direction:Fe.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===Fe.FORWARD&&t>o&&this.#r<=o,s=this.#f===Fe.BACKWARD&&t<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=dy(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:pt(ce.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=zy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=xu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=jy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=xu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ia({start:s,end:i}))return this;if(!ro(t,r))return oo("sequencer goFromTo:",t,r),this;let c=Uy(t,r,a),l=Va({data:c,values:this.#n});return this.#t=Ba({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||ub(t),n||pb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ir(t,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(t=0){this.#o=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Jy=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,v=a+d*1/s,y=_e(v),T=Math.abs(d)<=.1,S=t===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Wt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;constructor(t){this.#n=Rt(t??{}),this.#t=so(t?.relative,"spring"),this.#i=du(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#x=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=qe,this.#k=qe;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#h=!0,this.#o=Jy({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=$e(this.#o,"currentValue");if(this.#g||Nn({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=$e(this.#o,"toValue");An({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#_(l,p,o,n,s,i)})})}#w(t,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#N(){if(Dn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();co("spring",t);let r=sr(this.#a,this.#p);if(this.#n.grid.col>r.length){Mt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#N(),this.#v=!1),Ln({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=xn(this.#o)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#x=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=Sa(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&Da((t,r)=>this.#w(t,r)))}setData(t){this.#o=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=st(this.#o,this.#e)}#O(t){let o=ce.get("spring").config,n=Sy(t?.config)?o?.[t?.config??"default"]??Ao.default:this.#y.configProps,s=fu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=ao(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=On(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!ro(t,r))return oo("spring goFromTo:",t,r),new Promise(s=>s);let n=$n(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Mr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Mr(t);this.#o=Vn(o,this.#o);let{reverse:n}=this.#O(r??{});kt(n,"reverse")&&(this.#o=Er(t,this.#o)),this.#o=Cn(this.#o,this.#t),this.#o=Cr(this.#o)}#E(t,r,o={}){this.#o=Vn(t,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(kt(n,"reverse")&&(this.#o=Er(r,this.#o)),this.#o=Cn(this.#o,this.#t),kt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=Cr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#o,"currentValue")}getInitialData(){return $e(this.#e,"currentValue")}getFrom(){return $e(this.#o,"fromValue")}getTo(){return $e(this.#o,"toValue")}getFromNativeType(){return Bn(this.#o)}getToNativeType(){return Fn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(t={}){let r=fu(t);this.#i={...this.#i,...r},this.#y=st(this.#y,{configProps:r})}updateConfig(t){this.#i=du(t),this.#y=st(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ir(t,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(t=>t()),this.#r=[]}};var Yy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Rr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;constructor(t){this.#n=ka(t?.ease),this.#t=gu(t?.duration),this.#i=so(t?.relative,"tween"),this.#l=Rt(t??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#x=0,this.#v=0,this.#y=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:Ra(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#N=qe,this.#R=qe;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#C-this.#x),this.#x=t-this.#C-this.#v,Math.round(this.#x)>=this.#t&&(this.#x=this.#t),this.#e=Yy({values:this.#e,timeElapsed:this.#x,duration:this.#t,ease:this.#n});let r=Math.round(this.#x)===this.#t,o=$e(this.#e,"currentValue");if(this.#m||Nn({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){An({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#C=t,this.#O(t)}async#A(){if(Dn(this.#l.each,this.#y,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("tween",t);let r=sr(this.#d,this.#a);if(this.#l.grid.col>r.length){Mt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#N=i,this.#R=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#_||(this.#s=t,this.#c=r,this.#y&&(this.#_=!0,await this.#A(),this.#_=!1),Ln({validationFunction:this.#r,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=xn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=st(this.#e,this.#p)}#b(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#F(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=ka(o),this.#i=so(s,"tween"),this.#t=gu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(t);return this.#L(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=On(t);return this.#L(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(t,r))return oo("tween goFromTo:",t,r),new Promise(s=>s);let n=$n(t,r);return this.#L(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};return this.#L(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};this.#e=_u(o,this.#e);let{reverse:s}=this.#F(n);kt(s,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=ou(this.#e,this.#i),this.#e=Cr(this.#e)}#L(t,r,o={}){this.#e=_u(t,this.#e);let{reverse:n,immediate:s}=this.#F(o);if(kt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=ou(this.#e,this.#i),kt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#e,"currentValue")}getInitialData(){return $e(this.#p,"currentValue")}getFrom(){return $e(this.#e,"fromValue")}getTo(){return $e(this.#e,"toValue")}getFromNativeType(){return Bn(this.#e)}getToNativeType(){return Fn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(t){this.#n=ka(t),this.#w=st(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ir(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=at(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Jw=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},Yw=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===$o)return{start:0,end:_e(e-(i-c))};if(n===Lo){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},Xy=e=>{let t=Ty(e?.items),r=Rt(e),o=no(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,v)=>({item:d,start:0,end:o,index:v}));if(!vy(t))return i;r.grid?.col>t.length&&(Mt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Ib(n),s=1);let{staggerArray:a}=Pt({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:qe,fastestStagger:qe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Eb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,v)=>d-v),h=p.length;return c.map(({item:d,frame:v})=>{let y=p.indexOf(v),T=s*h/n,{start:S,end:_}=r.type===Oo?Jw({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===$o||r.type==="end"||r.type===Lo?Yw({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:y}})};function Xw(e){return new Vs(e)}function Kw(e){return new zs(e)}function Qw(){return new Ws}function Zw(e){return Xy(e)}function eI(e){return new Rr(e)}function tI(e){return new Wt(e)}function rI(e){return new kr(e)}var we={};vo(we,{createAsyncTimeline:()=>nI,createSyncTimeline:()=>oI});var Q=()=>{},Wa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var za=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var lo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?za({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Eu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Q;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var js=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;constructor(t){this.#n=Ma(t?.repeat),this.#t=pe(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=pe(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=pe(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=pe(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=pe(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#x=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#N=0,this.#R=0,this.#O=!1,this.#E=[],this.#A=!1,this.#P=0,this.#b=[],this.#F=[],this.#L=void 0,this.#I=void 0}#B(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=za({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:v}=a,y={...d};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,rb()),this.#E.push({id:v,action:p});let M=r.find(({id:E,action:w})=>E===v&&w===p),x={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>M?new Promise(E=>E({resolve:!0})):new Promise(E=>{if(_){E({resolve:!0});return}let w=this.getDirection();l({direction:w,loop:this.#m}),E({resolve:!0})}),addAsync:()=>{this.#k=!0;let E=this.#w;return M?new Promise(w=>w({resolve:!0})):new Promise((w,A)=>{if(_){w({resolve:!0});return}let N=this.getDirection();l({direction:N,loop:this.#m,resolve:()=>{if(E===this.#w){w({resolve:!0});return}A()}})})},createGroup:()=>new Promise(E=>E({resolve:!0})),closeGroup:()=>new Promise(E=>E({resolve:!0})),label:()=>new Promise(E=>E({resolve:!0})),suspend:()=>{if(M)return new Promise(A=>A({resolve:!0}));let E=u.checkType(Boolean,l());E||ob(l);let w=E?l():!0;return new Promise(A=>{!_&&w&&(this.#T=!0),A({resolve:!0})})}};return new Promise((E,w)=>{let A=_?!1:d?.delay,N=this.#w;if(A){let F=u.getTime();requestAnimationFrame(()=>{this.#$({start:F,deltaTimeOnpause:0,delay:A,mainReject:w,mainResolve:E,previousSessionId:N,tween:c,stepFunction:x,action:p})});return}Eu({mainReject:w,mainResolve:E,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:F=>this.#Y(F),currentSessionId:()=>this.#w,previousSessionId:N,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#U(),this.#B();return}if(this.#g<this.#s.length-1){this.#g++,this.#B();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=lo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,v)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#F.forEach(({cb:p})=>p()),this.#_=!0,this.#L&&Jo.add(()=>{St.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#y&&(r=p-this.#R),h-r>=o||this.#_||this.#C){Eu({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#x)&&this.#U(),this.#x=!1,this.#B()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Q;let o=this.#N;return this.#N++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#U(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(nb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#o.push(n)}#D(){this.#o.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=this.#h?lo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=lo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=lo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Ds(t))return this;n.delay=Ls(n?.delay);let s=this.#h?lo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Q){let r=io(t,()=>{},"timeline add function");return this.#f?(Rn("add"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Ey(t);return this.#f?(Rn("addAsync"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(Rn("createGroup"),this):(this.#r++,this.#M({...this.#p,id:this.#r,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#M({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(Rn("suspend"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(Rn("label"),this):xy(t?.name,"asyncTimeline label:")?(this.#r++,this.#M({...this.#p,id:this.#r,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#H(){this.#O||(this.#O=!0,this.#o.forEach(({tween:t})=>{let r=t.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:t})=>{let r=lo({timeline:this.#s,tween:t,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=wy(r),n=Iy(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(ab(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=lo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{cb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#te(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(t){return await this.#te(),this.#K(t,!1)}async playFromReverse(t){return await this.#te(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#v&&this.#U(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Cy(this.#a.index,t),this.#B())}})})}async play(){return await this.#te(),new Promise((t,r)=>{if(this.#l&&this.#H(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#v&&this.#U(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#L=t,this.#B()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#L=t,this.#B()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#te(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#H(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#L=a,this.#I=c,this.#B()},1))})}reverseNext(){this.#C=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#C=!1,this.#Q(),this.#x=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#U(),this.#v=!1,this.#i||this.#D()}pause(){this.#y||(this.#y=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#B();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#U(),this.#m++,this.#B())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#_?Fe.NONE:this.#v?Fe.BACKWARD:Fe.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#F.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#F=this.#F.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#F=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Us=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;constructor(t={}){this.#n=no(t?.duration),this.#t=pe(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Ma(t?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#x=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#N=void 0,this.#R=void 0,this.#O={time:0,direction:Fe.NONE},this.#E={direction:Fe.NONE,loop:0}}#A(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#h-this.#u-this.#e),this.#u=Math.trunc(t-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#y||(this.#s=rt(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#w.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#x=!1,this.#P();return}if(this.#S(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#P();return}if(u.useNextFrame(()=>{!this.#v&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#E.direction=s,this.#E.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#E)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#N&&this.#N(!0);return}if(this.#t){this.reverse(),this.#P();return}if(this.#d){this.#b(),this.#h=t,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#P();return}this.#b(),this.#h=t,this.#p&&(this.#d=!this.#d),this.#P()}#P(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#A(t,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#F(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||lb(t),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#I()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#I(s)})}#I(t=0){this.#S(),this.#b(),this.#s=t,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#v=!0,this.#$(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#S(),this.#u=t,this.#s=t,this.#c=t,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#v=!0,this.#$(t)}async#$(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#S(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#L(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#S(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?Fe.NONE:this.#p?Fe.BACKWARD:Fe.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function oI(e){return new Us(e)}function nI(e){return new js(e)}var Je={};vo(Je,{createParallax:()=>uI,createScrollTrigger:()=>pI});var sI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function Ky({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(sI({prevValue:e,value:t,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var iI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},aI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},cI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},lI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},Qy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=iI({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=aI({screen:n}),v=cI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=lI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:ce.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var Zy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ce.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var ja=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#x=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#M="left",this.#D=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#N=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#A=0,this.#P=0,this.#b=!1,this.#F=1.5,this.#L=!1,this.#I=!1,this.#B=0,this.#$=0,this.#S=!1,this.#Y=0,this.#U=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#D=t.anticipatePinOnLoad,this.#L=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#te(),this.#se(),this.#K(),this.#H(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#H(){this.#p=new Wt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${t}px)`:this.#r&&(this.#r.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#te(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#z(),i=Zy({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#re()}#K(){if(!this.#r||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${t}px`,this.#r.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#w.map(r=>this.#ee(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#re(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#h=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?_t(this.#f).top:_t(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#x(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#B=0,this.#I=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===b.DIRECTION_VERTICAL?_t(this.#a).top-this.#i:_t(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#h:this.#ce()+this.#h;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#r||!this.#M)return;let r=this.#r?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#J(){if(!this.#r)return;let t=this.#c===b.DIRECTION_VERTICAL?_t(this.#r).left:_t(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${t}px`,this.#I=!0,this.#S=!0)})}#z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#N.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#oe(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#z(),o=this.#Z();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#oe()),this.#a?.append(this.#r))})}#me(t){let r=this.#S&&this.#Y<3?this.#$:rt(Math.abs(t-this.#A),0,250);return this.#S&&this.#Y<this.#U?this.#Y++:(this.#Y=0,this.#S=!1),this.#$=r,r*this.#F}#j(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#B<this.#U){this.#B++;return}else this.#B=0,this.#I=!1;let r=this.#A>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?_t(this.#a).top:_t(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#j(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#X(),this.#ne(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=t,this.#T=!1}};var ev=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},tv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},rv=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var wu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),ov=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},nv=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,sv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),iv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=uy(r);if(r&&!o)return ev(),wu();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return tv(),wu();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return rv(),wu();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>pu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>pu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},av=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=iv(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:Ea(c)}:{value:e*p,additionalVal:a,position:Ea(c)}},cv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=iv(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,v=Ea(h),y=v===b.POSITION_TOP||v===b.POSITION_LEFT;return l===b.PX?{value:ov(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}:{value:nv(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}},Iu=(e,t,r,o)=>{let n=String(t);return Oe(n,b.PLUS_HEIGHT_HALF)?e+r/2:Oe(n,b.PLUS_HEIGHT)?e+r:Oe(n,b.PLUS_WIDTH_HALF)?e+o/2:Oe(n,b.PLUS_WIDTH)?e+o:Oe(n,b.MINUS_HEIGHT_HALF)?e-r/2:Oe(n,b.MINUS_HEIGHT)?e-r:Oe(n,b.MINUS_WIDTH_HALF)?e-o/2:Oe(n,b.MINUS_WIDTH)?e-o:e},lv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},uv=(e,t)=>e===b.PROP_OPACITY?1-t:-t,Mu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var uo=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;#H;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#z;#Z;#oe;#V;#ne;#me;#j;#ve;#he;#de;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#x=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#N=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#A="",this.#P=0,this.#b=0,this.#F=()=>{},this.#L=()=>{},this.#M=!1,this.#I=pe(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#B=pe(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=pe(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=pe(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Pa(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#U=Pa(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Pa(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#D=t?.dynamicStart?yu(t.dynamicStart,"dynamicStart"):null,this.#H=t?.dynamicEnd?yu(t.dynamicEnd,"dynamicEnd"):null,this.#G=My(t?.dynamicRange),this.#te=pe(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=io(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=io(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=io(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=io(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#re=io(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Ry(t?.align),this.#ue=Py(t?.onSwitch),this.#ce=pe(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=vu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=vu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=pe(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=ky(t?.tween);let r=this.#X?.getType&&this.#X.getType()===b.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===b.TWEEN_TWEEN;this.#q=Pn(t?.item,!1),this.#J=Pn(t?.scroller,!0),this.#z=Pn(t?.screen,!0),this.#Z=bu(t?.trigger),this.#oe=bu(t?.applyTo),this.#V=Fs(t?.direction,"Parallax/Scrolltrigger"),this.#ne=pe(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=pe(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#j=Ny(t?.type),this.#ve=nr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#he=Fo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#de=Bo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Oy(t?.propierties,this.#j,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Ay(t?.range,this.#j),this.#ye=pe(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&Xb(),this.#Ce=r?b.EASE_LERP:$y(t?.easeType),this.#we=Ly(t?.springConfig,this.#j),this.#Ie=Dy(t?.lerpConfig,this.#j),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ae=this.#Ce===b.EASE_SPRING?new Wt:new kr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#j==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Ne(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#r=Mu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#r=Mu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new ja,fe[this.#de](this.#he)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Pe()),this.#E?.onScroll(this.#c)}))}#Pe(){return{item:this.#q,marker:this.#W,screen:this.#z,animatePin:this.#B,anticipatePinOnLoad:this.#S,forceTranspond:this.#$,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=Pn(t,!0)}setScreen(t){this.#z=Pn(t,!0)}setDirection(t){this.#V=Fs(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#he=Fo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#de=Bo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#We(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#F=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===b.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!0})}))}),this.#L=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Ne(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#A=b.PX}else{let t=String(this.#Te),r=Fy(t,this.#le),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#A=py(r)}}#Me(){let t=this.#o/100;if(this.#D&&this.#D?.position&&this.#D?.value?.()!==void 0){let{position:l,value:p}=this.#D,h=p();Number.isNaN(h)||(this.#Y=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=av(t,this.#Y,this.#V);if(this.#M=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#P=Iu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#H&&this.#H?.position&&this.#H?.value?.()!==void 0){let{position:l,value:p}=this.#H,h=p();Number.isNaN(h)||(this.#U=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=cv(t,this.#U,this.#P,this.#o,this.#M,this.#V),c=this.#M?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=Iu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#ze(),this.#M&&(this.#P-=this.#u)}#ze(){if(this.#W){let{startMarker:t,endMarker:r}=Qy({startMarker:this.#x,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#z,direction:this.#V,invertSide:this.#M,label:this.#W});this.#x=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=_o(this.#Z)?.x??0,o=_o(this.#Z)?.y??0,n=_o(this.#Z)?.z??0),t.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(de(t).top):Math.trunc(de(t).top)-de(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(de(t).left):Math.trunc(de(t).left)-de(this.#J).left,this.#z&&this.#z!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(de(this.#z).top):Math.trunc(_t(this.#z).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#z===globalThis||!this.#z||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(de(this.#z).top):Math.trunc(_t(this.#z).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-de(this.#J).top:-de(this.#J).left)}#Fe(){this.#z&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#z===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#z.offsetHeight):Math.trunc(this.#z.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#j==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Ne(),this.#I&&this.#E&&fe[this.#de](this.#he)&&this.#E?.init(this.#Pe())),this.#y=void 0,this.#w=!0,fe[this.#de](this.#he)?this.#ye?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#oe?(this.#Be(this.#oe),Object.assign(this.#oe.style,this.#Ve())):(this.#Be(this.#q),this.#q&&Object.assign(this.#q.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!fe[this.#de](this.#he)||!t)return;this.#R=!0;let o=this.#je(t);if(this.#ye)this.#xe(o);else{this.#Se(o);let n=this.#N||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#_e({forceRender:!0})}#je(t){if(t!==void 0)return this.#z!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#Se(t){if(!fe[this.#de](this.#he)||(t?this.#c=-t:this.#De(),this.#N=sv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#N&&!this.#be&&this.#j===b.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#j===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#Ue()):this.#le===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ce&&this.#j!==b.TYPE_SCROLLTRIGGER?uv(this.#le,this.#h):this.#h;this.#h=this.#j===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#xe(t){if(!fe[this.#de](this.#he)||(this.#Se(t),!this.#k&&!this.#w&&this.#j===b.TYPE_SCROLLTRIGGER)||!this.#N&&!this.#w&&this.#j===b.TYPE_PARALLAX)return;let r=this.#w&&!this.#te?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#h},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){fe[this.#de](this.#he)&&u.useFrame(()=>{this.#h===this.#y&&!t||!this.#N&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#N),this.#le===b.PROP_TWEEN?(this.#X.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#h,this.#w=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#re&&this.#re({value:this.#h,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#d,o=t/100*this.#d,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-rt(n,0,r):-rt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#h;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&Ky({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#He(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#He(t){switch(this.#A){case b.VW:return this.#e/100*-t;case b.VH:return this.#p/100*-t;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#Ge(){let t=this.#o/100*this.#pe,r=this.#o-this.#o/100*this.#fe,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-t);return rt(n,0,1)}#qe(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#o/100*t-this.#i)/r}#Ye(t){return lv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#y=t,this.#w=!1;let r=this.#oe||this.#q;if(!r||this.#Ee)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${t}`;break}case b.PROP_SCALE:{let i=this.#j===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#j===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#j===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#le.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#X&&t&&(t.style="")}#Ve(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#F(),this.#L(),this.#C(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#D?.value&&(this.#D.value=()=>0),this.#H?.value&&(this.#H.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#re=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#v&&this.#v?.remove?.(),this.#x=void 0,this.#v=void 0,this.#E=void 0,this.#h=0;let t=this.#oe??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#z=null,this.#Z=null,this.#oe=null}};function uI(e){return new uo({...e,type:b.TYPE_PARALLAX})}function pI(e){return new uo({...e,type:b.TYPE_SCROLLTRIGGER})}var ku=window.innerHeight,Ru=document.body.offsetHeight,po=!1,Pu=!0,zt=window.scrollY,Hs=!0,jt=!1,Nu=()=>{},Au=()=>{},Ha=()=>{},Ua,pv=()=>{document.body.classList.remove("is-whelling")},mI=()=>{document.body.classList.add("is-whelling")};le.setDefault({usePassive:!1});var hI=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ua=t;let o=r.subscribe(({scrollValue:h})=>{jt||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(h=>{if(jt)return;h.preventDefault(),Hs=!1,mI();let f=h.spinY??0,d=le.clamp(f*e+zt,0,Ru-ku);zt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Pu&&h()}),i=u.useMouseWheel(u.debounce(()=>{pv()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!Hs)return;let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{jt||(pv(),r.stop(),zt=window.scrollY,Hs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,ku=window.innerHeight,Ru=document.body.offsetHeight});return p.observe(t),{destroy:()=>{po=!1,zt=0,Hs=!0,jt=!1,Ua&&(p.unobserve(Ua),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ua=null,o(),c(),a(),n(),l(),i(),s(),Nu=()=>{},Au=()=>{},Ha=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Ga=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{po||(zt=window.scrollY,po=!0,jt=!1,ku=window.innerHeight,Ru=document.body.offsetHeight,Pu=!0,Hs=!1,{destroy:Nu,stop:Au,update:Ha}=hI({velocity:e,rootElement:t}))},ar=()=>{!po||jt||(Au(),jt=!0)},Ut=()=>{!po||!jt||(jt=!1)},Gs=()=>{!po||!jt||(Ha(),zt=window.scrollY,jt=!1)},Ou=()=>{po&&Ha()},$u=()=>{Nu()},mv=()=>{Pu=!0};var hv=()=>po;var dv="easeOutQuad",qs=new Rr({ease:dv,data:{val:0}}),qa=!1,Lu=!1;qs.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Ou()});var Du=()=>{Lu&&(document.body.style.overflow=""),qs?.updateEase?.(dv),Gs()},Fu=()=>{qa&&(qs.stop(),Du())};u.useMouseWheel(()=>{Fu()});u.useMouseDown(()=>{Fu()});u.useTouchStart(()=>{Fu()});var Pr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Hc(t)||u.checkType(Number,t)?Hc(t)?de(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=nr(r?.duration,"bodyScroll: duration",500);return Lu=pe(r?.overflow,"bodyScroll: overflow",!1),Ra(r?.ease)&&qs?.updateEase?.(r?.ease),Lu&&(document.body.style.overflow="hidden"),new Promise(s=>{qa=!0,ar(),qs.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Du(),qa=!1,s(!0)}).catch(()=>{Du(),qa=!1,s(!0)})})}};var Js={END:"END",START:"START",CENTER:"CENTER"};var dI=e=>{switch(e){case Js.END:return"align-items:flex-end;";case Js.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},fv=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=fe.getBreackpoint(r),d="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=dI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,M=document.createElement("div");M.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),M.append(x),e.prepend(M)};var Ys=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;#H;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#o=()=>{},this.#pe=0,this.#B=t?.container??"",this.#W=[],this.#D=!1,this.#H=0,this.#G={},this.#te=0,this.#K=t?.children||[],this.#e=pe(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=nr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=pe(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Fo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Bo(t?.queryType,"queryType","horizontalScroller"),this.#r=pe(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=pe(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=pe(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=pe(t?.ease,"HorizontalScroller: ease",!1),this.#x=Oa(t?.easeType??"","HorizontalScroller"),this.#v=pe(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=pe(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=pe(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=pe(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=nr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=nr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#N=t?.columnAlign?t.columnAlign.toUpperCase():Js.START,this.#R=it(t?.onEnter,"HorizontalScroller: onEnter",Q),this.#O=it(t?.onEnterBack,"HorizontalScroller: onEnterBack",Q),this.#E=it(t?.onLeave,"HorizontalScroller: onLeave",Q),this.#A=it(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Q),this.#P=it(t?.afterInit,"HorizontalScroller: afterInit",Q),this.#b=it(t?.afterRefresh,"HorizontalScroller: afterRefresh",Q),this.#F=it(t?.afterDestroy,"HorizontalScroller: afterDestroy",Q),this.#L=it(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#B)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#I.querySelector(t.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#I.querySelector(t.row),this.#S||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#U=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#S.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&fv({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#d,container:this.#B,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#N}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{fe[this.#f](this.#d)&&(ar(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#re=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ie=n=>{fe[this.#f](this.#d)&&(ar(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Ut(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Wa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#j(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#h+this.#H>t+window.innerHeight}#J(){this.#o=u.useScroll(()=>this.#q()),this.#q(),this.#S.addEventListener("click",this.#fe,{passive:!1}),this.#S.addEventListener("mousedown",this.#ee,{passive:!0}),this.#S.addEventListener("mouseup",this.#Q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#re,{passive:!0}),this.#S.addEventListener("touchstart",this.#ie,{passive:!0}),this.#S.addEventListener("touchend",this.#ue,{passive:!0}),this.#S.addEventListener("mousemove",this.#se,{passive:!0}),this.#S.addEventListener("touchmove",this.#ce,{passive:!0})}#z(){this.#o(),this.#S.removeEventListener("click",this.#fe),this.#S.removeEventListener("mousedown",this.#ee),this.#S.removeEventListener("mouseup",this.#Q),this.#S.removeEventListener("mouseleave",this.#re),this.#S.removeEventListener("touchstart",this.#ie),this.#S.removeEventListener("touchend",this.#ue),this.#S.removeEventListener("mousemove",this.#se),this.#S.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#$||!this.#I||!this.#S?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#H;this.#te=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#S.style.width=`${r}px`),t(!0)})})}#oe(){return new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#d)){t(!0);return}this.#H=[...this.#Y].map(r=>Ve(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#$?new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#d)||!this.#U){t(!0);return}let r=[...this.#U].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#M} ${this.#M}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#M}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#M}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#M}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#M}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#$.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#$&&(this.#$.innerHTML="")}#me(){return new Promise(t=>{if(!fe[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#U&&([...this.#U].forEach(r=>{let o=this.#te/100,n=r.dataset.shadow,s=Ve(r),i=se(this.#S),a=_o(this.#S)?.x??0,c=this.#T?this.#H-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=d?.querySelector(`.${this.#M}--in-center`),y=d?.querySelector(`.${this.#M}--out-center`),T=d?.querySelector(`.${this.#M}--left`),S=d?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,M=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,E=(()=>{let N=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:N})(),w=(()=>{let N=s/l,F=(s-s/l)/o;return N+F+E})(),A=w/2+M;this.#v&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),v&&(v.style.height=`${A}px`),y&&(y.style.height=`${A}px`),y&&(y.style.top=`${A}px`),T&&(T.style.height=`${E}px`),S&&(S.style.height=`${w+_}px`),d&&(d.style.height=`${E}px`)}),t(!0))})})}#j(){if(!this.#$||!fe[this.#f](this.#d))return;let t=new uo({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#H-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#H},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#H-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#A});t.init(),this.#D=!0,this.#G=t,this.#t=de(this.#$).top,this.#be()}#ve(){Wa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#j(),this.#he()})}#he(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#D||!fe[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{Wa(this.#oe.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=de(this.#$).top,this.#D&&(this.#G?.refresh?.(),this.#he()),t(!0)})})}#de({destroyAll:t=!1}){(this.#D||t)&&(this.#G?.destroy?.(),this.#G=null,this.#$&&(this.#$.style.height=""),this.#I&&(this.#I.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#ne(),this.#ge(),this.#D=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),t&&this.#I){this.#e&&this.#z();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#$=null,this.#S=null,this.#Y=[],this.#U=[],this.#P=Q,this.#b=Q,this.#L=Q,this.#R=Q,this.#O=Q,this.#E=Q,this.#A=Q,this.#G=null,this.#D=!1,this.#W=[],this.#I=null,this.#B=null,this.#$=null,this.#S=null,u.useNextTick(()=>{this.#F?.(),this.#F=Q,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#D&&fe[this.#f](this.#d)?t&&this.refresh():!this.#D&&fe[this.#f](this.#d)?this.#ve():this.#D&&!fe[this.#f](this.#d)&&this.#de({destroyAll:!1})}destroy(){this.#de({destroyAll:!0})}};var Xs=new Map,Ja=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},fI=e=>{let t=new Rr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Nr={subscribe:n=>{if(!Ja(n))return()=>{};if(Xs.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=fI(n);return Xs.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Xs.delete(n)}},reset:n=>{Ja(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ja(n))return new Promise(c=>c(!0));let s=Xs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=se(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ja(n))return new Promise(l=>l(!0));let s=Xs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=se(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var vt=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W=!1;#D;#H;#G;#te=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Q,this.#d=Q,this.#f=Q,this.#r=Q,this.#g=Q,this.#m=Q,this.#C=Q,this.#x=Q,this.#v=Q,this.#y=Q,this.#T=Q,this.#k=Q,this.#_={},this.#w=Q,this.#N=Q,this.#R=Fs(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Oa(t?.easeType??"","SmoothScroller"),this.#A=Fo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Bo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#F=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#F||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=pe(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=nr(t?.speed,"SmoothScroller: speed",60),this.#B=pe(t?.drag,"SmoothScroller: drag",!1),this.#$=it(t?.onTick,"SmoothScroller: onTick",Q),this.#S=it(t?.onUpdate,"SmoothScroller: onUpdate",Q),this.#Y=it(t?.onSwipe,"SmoothScroller: onSwipe",Q),this.#ee=pe(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=pe(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=pe(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#U=it(t?.afterRefresh,"SmoothScroller: afterRefresh",Q),this.#M=it(t?.afterInit,"SmoothScroller: afterInit",Q),this.#D=t?.children||[],this.#D.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#F),r.setBreakPoint(this.#A),r.setQueryType(this.#P),r.init()}),this.#H=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#re()},500))}#re(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===b.EASE_SPRING?this.#_=new Wt:(this.#_=new kr,this.#_.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#H,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#L||(this.#x=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#oe(t)),this.#y=u.useTouchMove(t=>this.#oe(t))),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#r=u.useTouchStart(t=>this.#z(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#z(t)),this.#C=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Ut()}),this.#B&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),fe[this.#P](this.#A)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#D.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!0}),this.#D.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#N=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!1}),this.#D.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#F&&(this.#l=this.#F===document.documentElement?window.innerWidth:Ve(this.#F),this.#h=this.#F===document.documentElement?window.innerHeight:se(this.#F),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#o||!this.#B||(this.#e=this.#p,this.#p=this.#j({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080}#J({spinY:t=0}){if(!fe[this.#P](this.#A))return;this.#o=!1;let r=this.#q(),o=rt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#z({target:t,client:r}){fe[this.#P](this.#A)&&(t===this.#b||rs(this.#b,t))&&(this.#u=this.#t,this.#o=!0,this.#e=this.#j({x:r?.x??0,y:r?.y??0}),this.#p=this.#j({x:r?.x??0,y:r?.y??0}))}#Z(){this.#o=!1}#oe({target:t,client:r,preventDefault:o}){if((t===this.#b||rs(this.#b,t))&&this.#o&&this.#B){o(),this.#e=this.#p,this.#p=this.#j({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(fe[this.#P](this.#A)&&(this.#ie(),t===this.#b||rs(this.#b,t))){this.#o=!1,n?.(),ar();let s=Math.abs(this.#te-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=rt(a,-1,1)*this.#I*rt(c,1,10),this.#ne(),this.#K=r,this.#te=o}}move(t){return fe[this.#P](this.#A)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){fe[this.#P](this.#A)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=rt(t,0,100),this.#t=rt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#S?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){fe[this.#P](this.#A)&&(t===this.#b||rs(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#j({x:t,y:r}){return!t||!r?0:this.#R===b.DIRECTION_VERTICAL?r:t}refresh(){if(!fe[this.#P](this.#A)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#U?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#x(),this.#v(),this.#y(),this.#T(),this.#w(),this.#N(),this.#k(),this.#_?.destroy(),this.#_=null,this.#D.forEach(t=>{t?.destroy?.()}),this.#D=[],this.#$=Q,this.#S=Q,this.#U=Q,this.#M=Q,this.#L&&(this.#b?.removeEventListener("wheel",this.#H),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#F=null})},3)}};var gv=!1,gI=new Set(["scrollerN0","scrollerN1"]),bv=()=>{let e=document.querySelector("#root");e&&(Ga({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{ar(),mv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;gv=gI.has(t),u.useFrameIndex(()=>{if(gv){$u();return}!hv()&&Ga({rootElement:e}),Gs()},30)}))};function yv(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Nt=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Ht(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var vv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Tv,_v={},bI="./asset/svg/icons/",yI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],cr=()=>Tv,Wn=()=>_v,Sv=async()=>{let{success:e,data:t}=await Nt({source:"./data/common.json"});e||console.warn("data fail to load"),Tv=t},xv=async()=>{let e=yI.map(({name:r,source:o})=>te({source:`${bI}${o}`}).then(n=>({name:r,result:n})));_v=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Cv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Ev=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new vt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var vI=e=>e<10?`0${e}`:`${e}`,wv=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Ev({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
        <div class="l-links__under-container">
            <div
                class="l-links__under is-white"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                ${s.title}
            </div>
        </div>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row" ${e("screenElement")}>
                <div
                    class="l-links__row__white"
                    ${o({toggleClass:{active:()=>s.isMounted}})}
                >
                    <h6 class="l-links__over is-black">${s.title}</h6>
                </div>
                <div
                    class="l-links__title"
                    ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
                >
                    <h1 class="title-big">${s.title}</h1>
                </div>
                <div
                    class="l-links__scroller"
                    ${e("scrollerElement")}
                    ${o({toggleClass:{"use-drag-cursor":()=>s.showControls}})}
                >
                    <ul class="l-links__list">
                        ${s.items.map((c,l)=>`
                                    <li class="l-links__list__item">
                                        <a
                                            class="l-links__list__link index-${l} ${l%2?"is-odd":"is-even"}"
                                            href="${c.url}"
                                            ${o({toggleClass:{active:()=>s.isMounted}})}
                                        >
                                            <span
                                                class="l-links__list__counter index-${l}"
                                                >${vI(l)}</span
                                            >
                                            <span class="index-${l}"
                                                >${c.title}</span
                                            >
                                        </a>
                                    </li>
                                `).join("")}
                    </ul>
                </div>
            </div>
            <h6
                class="l-links__scroll"
                ${o({toggleClass:{active:()=>s.showControls}})}
            >
                Scroll or drag
            </h6>
        </div>
    </div>`};var Iv=m.createComponent({tag:"layout-links",component:wv,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Iv]);var Ya=async({props:e})=>{let{source:t}=e,{data:r}=await Nt({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Mv=()=>g`
        <div class="c-doc-container">
            <div class="c-doc-container__left-sidebar"></div>
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__right-sidebar">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;var Xa=m.createComponent({tag:"doc-container",component:Mv});var kv=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Ka=m.createComponent({tag:"doc-title",component:kv,state:{}});var Rv=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Qa=m.createComponent({tag:"doc-title-small",component:Rv,state:{}});var Kv=mC(Xv(),1);var qu=Kv.default;var Qv="[A-Za-z$_][0-9A-Za-z$_]*",lM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],uM=["true","false","null","undefined","NaN","Infinity"],Zv=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],eT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],tT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],pM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],mM=[].concat(tT,Zv,eT);function rT(e){let t=e.regex,r=(O,{after:B})=>{let V="</"+O[0].slice(1);return O.input.indexOf(V,B)!==-1},o=Qv,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(O,B)=>{let V=O[0].length+O.index,q=O.input[V];if(q==="<"||q===","){B.ignoreMatch();return}q===">"&&(r(O,{after:V})||B.ignoreMatch());let ee,ue=O.input.substring(V);if(ee=ue.match(/^\s*=/)){B.ignoreMatch();return}if((ee=ue.match(/^\s+extends\s+/))&&ee.index===0){B.ignoreMatch();return}}},a={$pattern:Qv,keyword:lM,literal:uM,built_in:mM,"variable.language":pM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},M=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,{match:/\$\d+/},h];f.contains=M.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(M)});let x=[].concat(_,f.contains),E=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),w={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},N={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Zv,...eT]}},F={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[w],illegal:/%/},R={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function P(O){return t.concat("(?!",O.join("|"),")")}let L={match:t.concat(/\b/,P([...tT,"super","import"].map(O=>`${O}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},D={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},$={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},w]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",k={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[w]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:N},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),F,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,_,{match:/\$\d+/},h,N,{scope:"attr",match:o+t.lookahead(":"),relevance:0},k,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[w,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},D,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[w]},L,R,A,$,{match:/\$[(.]/}]}}qu.registerLanguage("javascript",rT);var oT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,qu.highlightElement(e),e.style.height=""},hM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),nT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=hM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await oT({ref:d,source:a.source}):oT({ref:d,source:a.source}),()=>{}}),g`<div
        class="snippet"
        style="--snippet-height:${f};--closed-height:${l}"
    >
        <code
            ${n({toggleClass:{close:()=>p&&!a.isExpanded,open:()=>p&&a.isExpanded}})}
        >
            <pre
                ${t("codeEl")}
                style="height:${p?l:f}"
            >
                 Loading snippet ...</pre
            >
        </code>
        <button
            class="snippet__expand ${h}"
            ${!p&&"disabled"}
            ${o({click:()=>{a.isExpanded=!a.isExpanded}})}
        >
            ${i`${()=>a.isExpanded?"close":"expand"}`}
        </button>
    </div>`};var sT=m.createComponent({tag:"mob-snippet",component:nT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Zs="debug_component",oc="debug_filter_list",nc="debug_overlay",sc="debug_tree",ei="quick_nav",ti="scroll_down_label",ri="scroll_to",iT="header",ic="mob_navigation",oi="mob_navigation_container",ac="search_overlay",ni="search_overlay_list",zo="search_overlay_header",cc="right-sidebar",lc="route-loader";var aT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(ri)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},cT=e=>{m.useMethodByName(ri)?.setActiveLabel?.(e)};function dM({label:e}){return e?.length>0}var fM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),aT({id:e,label:t,element:r,isSection:o,isNote:n}),_p(r)&&!o&&cT(t)},lT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{dM({label:s})&&fM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var uT=m.createComponent({tag:"mob-spacer",component:lT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var pT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=de(n).top-50;Pr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var mT=m.createComponent({tag:"anchor-button",component:pT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var gM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),hT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${gM({items:o,links:n})}
    </ul>`};var dT=m.createComponent({tag:"mob-list",component:hT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var fT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var gT=m.createComponent({tag:"mob-paragraph",component:fT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var bM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",bT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${bM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var yT=m.createComponent({tag:"mob-title",component:bT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var yM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),vM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Nt({source:e});return r?o.data:[]},vT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await vM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${yM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var TM=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},TT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{TM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var _T=m.createComponent({tag:"doc-svg",component:TT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var uc=m.createComponent({tag:"html-content",component:vT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[dT,gT,yT,sT,uT,mT,_T]});var ST=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var xT=m.createComponent({tag:"scroll-to-button",component:ST,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var si=!1;function _M({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:de(a).top-50;si=!0,r.activeLabel=i,await Pr.to(c),setTimeout(()=>{si=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var CT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},ET=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:v,isNote:y}])}),s("setActiveLabel",h=>{si||(c.activeLabel=h)}),e(()=>{if(le.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:de(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=de(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{si||CT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{si||CT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>_M({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var wT=m.createComponent({tag:"scroll-to",component:ET,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[xT]});var pc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var mc=e=>{m.useMethodByName(cc)?.updateList(e??[])};m.useComponent([Xa,Qa,wT,Ka,uc]);var Le=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Nt({source:t});return mc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${pc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${ri}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([Xa,Qa,Ka,uc]);var ne=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Nt({source:t});return mc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${pc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var IT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:v})=>{v||d==="backward"||o(2)},1.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(3)},5.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(4)},9.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(1)},1.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(2)},5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:E,ey:w,fx:A,fy:N,gx:F,gy:I})=>{s.ax=d,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=M,s.dy=x,s.ex=E,s.ey=w,s.fx=A,s.fy=N,s.gx=F,s.gy=I});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:E,ey:w,fx:A,fy:N,gx:F,gy:I})=>{i.ax=d,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=M,i.dy=x,i.ex=E,i.ey=w,i.fx=A,i.fy=N,i.gx=F,i.gy=I});let l=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Ht(-3,3),ay:()=>Ht(-3,3),bx:()=>Ht(-3,3),by:()=>Ht(-3,3),cx:()=>Ht(-3,3),cy:()=>Ht(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Ht(-3,3),fy:()=>Ht(-3,3),gx:()=>Ht(-3,3),gy:()=>Ht(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},M={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${M.x}% ${M.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Je.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Ve(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Ve(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var MT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Je.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Je.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var hc=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Je.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var kT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h})=>{let f=new WeakRef(t),d=new WeakRef(i),v=new WeakRef(a),y=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:M,pathTimeline:x,pathTween:E,stopLoop:w,destroy:A}=IT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:N,title2parallax:F,title1tween:I,title2tween:R}=MT({title_1:n,title_2:s}),{sectionContentScroller:P,destroy:L}=hc({title:d}),{sectionContentScroller:D,destroy:$}=hc({title:v}),{sectionContentScroller:C,destroy:k}=hc({title:y}),O=new vt({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,N,F,P,D,C],onUpdate:({value:B})=>{p(B),h()}});return O.init(),setTimeout(()=>{O?.refresh?.()},500),{goTo:B=>{!B&&B!==0||O?.move?.(B).catch(()=>{})},destroy:()=>{O.destroy(),O=null,M.destroy(),_.destroy(),x.destroy(),E.destroy(),N.destroy(),F.destroy(),I.destroy(),R.destroy(),P.destroy(),D.destroy(),w(),A(),L(),$(),k()}}};var RT=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var ai=()=>{},ii=e=>Promise.resolve(e),dc=()=>{},Ju={1:0,2:100/3,3:100/3*2,4:100},SM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
        <section
            class="l-about__section l-about__section l-about__section--first "
        >
            <div class="l-about__section__top has-overflow">
                <h1 class="title-big" ${e("title_1")}>${r}</h1>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <h1 class="title-biggest" ${e("title_2")}>
                    ${o}
                </h1>
            </div>
        </section>
    `},xM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${e("section2_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p class="l-about__section__copy">${o}</p>
                </div>
            </div>
        </section>
    `},CM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${e("section3_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p class="l-about__section__copy">${o}</p>
                </div>
            </div>
        </section>
    `},EM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
        <section class="l-about__section l-about__section--last">
            <div class="l-about__section__top">
                <h1 class="title-biggest" ${e("section4_title")}>
                    ${r}
                </h1>
            </div>
            <div class="l-about__section__bottom">
                <ul class="l-about__list">
                    ${o.map(n=>g` <li>[ ${n} ]</li> `).join("")}
                </ul>
            </div>
        </section>
    `},wM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{ai(Ju[o]),dc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,IM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,PT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:M}=r(),{svg:x}=o(),E=0,w=!1,A=0,{svgSpring:N,destroySvgSpring:F}=RT({elements:x});ii=async P=>{if(u.shouldMakeSomething()||p){N.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let D=-Math.abs(P/30);Number.isNaN(D)||await N.goTo({x:D}).catch(()=>{})},dc=()=>{ii(3e3),setTimeout(()=>{ii(0)},500)};let{destroy:I,goTo:R}=kT({screenElement:h,scrollerElement:f,pathElement:M,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,setActiveItem:P=>{c.activenavItem=P},onMove:P=>{w||(E=P),w=!0,A=E-P,ii(A)},onScrollEnd:u.useDebounce(()=>{w=!1,A=0,ii(A)},500)});return ai=R,c.isMounted=!0,()=>{ai=()=>{},I(),F()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${IM()}</div>
        <span class="l-about__background">
            <div
                class="l-about__about-svg l-about__about-svg--bottom"
                ${t("svg")}
            >
                ${c.aboutSvg}
            </div>
        </span>
        <div
            class="l-about__about-svg l-about__about-svg--back"
            ${t("svg")}
        >
            ${c.aboutSvg}
        </div>
        <div
            class="l-about__shape l-about__shape--front"
            ${t("pathElement")}
        >
            <div class="l-about__about-svg l-about__about-svg--front">
                ${c.aboutSvg}
            </div>
        </div>
        <div class="l-about__screen" ${t("screenElement")}>
            <div class="l-about__scroller" ${t("scrollerElement")}>
                <div class="l-about__wrap" ${t("wrapElement")}>
                    ${SM({setRef:t,getState:n})}
                    ${xM({setRef:t,getState:n})}
                    ${CM({setRef:t,getState:n})}
                    ${EM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{ai(Ju[le.clamp(c.activenavItem-1,1,4)]),dc()}})}
        ></button>
        ${wM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{ai(Ju[le.clamp(c.activenavItem+1,1,4)]),dc()}})}
        ></button>
    </div>`};var NT=m.createComponent({tag:"about-component",component:PT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>le.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([NT]);var AT=async()=>{let{data:e}=await Nt({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var OT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
        class="benchmark-fake"
        ${s({toggleClass:{selected:()=>i.isSelected}})}
    >
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${n}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>index:</strong><br/> ${()=>i.index}`}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>label:</strong><br/> ${()=>i.label}`}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>counter: </strong><br/> ${()=>i.counter}`}
        </div>
        <div class="benchmark-fake__row">
            <button
                class="benchmark-fake__button"
                type="button"
                ${r({click:()=>{i.isSelected=!i.isSelected}})}
            >
                Select
            </button>
        </div>
    </div> `};var fc=m.createComponent({tag:"benchmark-fake-component",component:OT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var mt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[fc]});var Xu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},ci=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Yu=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?Xu(ci(t)):ci(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},ht=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
        <div
            class="benchmark__loading"
            ${o({observe:"isLoading",toggleClass:{active:()=>n.isLoading}})}
        >
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);Yu({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Yu({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Yu({proxi:n,value:n.data.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{n.counter=n.counter+1}})}
            >
                Update counter
            </button>
        </div>
    `;var $T=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Invalidate:</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            <p>
                Invalidate a large list of components with 5 reactive elements
                inside.<br />
                ( max component <strong>1000</strong> ).
            </p>
            ${ht({setRef:i,getRef:a,proxi:h,delegateEvents:t,bindEffect:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${o({observe:()=>h.data,render:()=>{let{data:f}=n();return g`
                        ${f.map(({label:d},v)=>g`
                                    <benchmark-fake-component
                                        ${s({label:d,index:v})}
                                        ${c(()=>({counter:h.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var LT=m.createComponent({tag:"benchmark-invalidate",component:$T,...mt()});var gc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var DT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,v)=>({index:v,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var FT=m.createComponent({tag:"benchmark-repeat-key",component:DT,...mt()});var BT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,key:"label",useSync:!0,render:({current:h})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>h.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,key:"label",render:({sync:f,current:d})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:d.index,label:d.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var VT=m.createComponent({tag:"benchmark-repeat-key-nested",component:BT,...mt(31)});var WT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,v)=>({index:v,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var zT=m.createComponent({tag:"benchmark-repeat-no-key",component:WT,...mt()});var At=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var Ku=({value:e,useShuffle:t=!1})=>{At.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();At.set("data",t?Xu(ci(e)):ci(e)),await m.tick();let n=performance.now()-r;At.set("time",n),At.set("isLoading",!1)})},2)},jT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
        <div
            class="benchmark__loading"
            ${n({observe:"isLoading",toggleClass:{active:()=>o().isLoading}})}
        >
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);Ku({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Ku({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();Ku({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{At.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var UT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),At.set("data",[]),At.set("time",0),At.set("counter",0)}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat bind external store ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            <p class="benchmark__head__title">
                Use extrernal store as state ( bindStore module ).<br />
                ( max value <strong>1000</strong> ).
            </p>
            ${jT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:h,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:d},v,y)=>({index:y,label:v.label,counter:d})})}
                                  ${h()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var HT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:UT,bindStore:At,child:[fc]});var GT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,useSync:!0,render:({current:h})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>h.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,render:({sync:f,current:d})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:d.index,label:d.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var qT=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:GT,...mt(31)});var bc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var JT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${s({observe:()=>l.data,render:({current:p})=>g`
                        <div
                            class="benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="benchmark-fake__row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="benchmark-fake__row">
                                <button
                                    class="benchmark-fake__button"
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var YT=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:JT,...mt(1001)});var XT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${ht({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${s({observe:()=>l.data,key:"label",render:({current:p})=>g`
                        <div
                            class="benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="benchmark-fake__row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="benchmark-fake__row">
                                <button
                                    class="benchmark-fake__button"
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var KT=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:XT,...mt(1001)});m.useComponent([LT,zT,FT,VT,qT,HT,YT,KT]);var Ar=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var Se=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ei);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ei);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var dt=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},ft=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},gt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},ho=e=>"roundRect"in e;var fo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,v=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:v,centerX:d+o/2,centerY:v+n/2,offsetXCenter:MM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:kM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},MM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,kM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var QT=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=dt({disableOffcanvas:n}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=ft({useOffscreen:h,canvas:e}),_=h?S:v,M=ho(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=fo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,E=i?x.map((R,P)=>({...R,scale:1,rotate:0,hasFill:o.includes(P)})).toSorted(R=>R.hasFill?-1:1).toReversed():x.map((R,P)=>{let L=o.includes(P);return{...R,scale:1,rotate:0,hasFill:L}}),w=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});E.forEach(R=>{w.subscribeCache(({scale:P,rotate:L})=>{R.rotate=L,R.scale=P})});let A=()=>{if(!v)return;h&&T&&(T.width=e.width,T.height=e.height);let R=h?S:v;R&&(e.width=e.width,E.forEach(({x:P,y:L,width:D,height:$,rotate:C,scale:k,hasFill:O,offsetXCenter:B,offsetYCenter:V})=>{let q=Math.PI/180*C,ee=Math.cos(q)*k,ue=Math.sin(q)*k;R.setTransform(ee,ue,-ue,ee,Math.floor(B+P),Math.floor(V+L)),M?(R.beginPath(),R.roundRect(Math.floor(-D/2),Math.floor(-$/2),D,$,150)):(R.beginPath(),R.rect(Math.floor(-D/2),Math.floor(-$/2),D,$)),O?(R.fillStyle="#000000",R.fill()):(R.fillStyle="rgba(255, 255, 255, 1)",R.fill()),R.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:h,offscreen:T,ctx:v}))},N=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&N.goTo(w,{scale:.2,rotate:90},{duration:1e3}).goTo(w,{scale:1},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:.3,rotate:0},{duration:500}).goTo(w,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&N.goTo(w,{scale:.3,rotate:0},{duration:1e3}).goTo(w,{scale:1},{duration:1e3}),N.onLoopEnd(({direction:R,loop:P})=>{console.log(`loop end: ${R}, ${P}`)}),N.play();let F=()=>{A(),d&&u.useNextFrame(()=>F())};u.useFrame(()=>{F()});let I=Z.watch("navigationIsOpen",R=>{if(R){N?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(N?.resume(),u.useFrame(()=>F()))},500)});return()=>{w.destroy(),N.destroy(),I(),w=null,N=null,v=null,T=null,S=null,x=[],d=!1,E=null,f=null}};var Qu=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var Zu=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=QT({canvas:t().canvas,...Qu[e.currentParamsId].params,disableOffcanvas:!0})};function RM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return Qu.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,Zu({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var ZT=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{Zu({proxi:i,getRef:r})})});let a=u.useResize(()=>{Zu({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${RM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var e_=m.createComponent({tag:"animatedpattern-n0",component:ZT,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([e_]);var t_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var ep=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=dt({disableOffcanvas:t}),p=!0,{top:h,left:f}=de(e),d=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=ft({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=fo({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((P,L)=>({...P,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(L)})).toSorted(P=>P.hasFill?-1:1),M=U.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(P=>{M.subscribeCache(({mouseX:L,mouseY:D})=>{P.mouseX=L,P.mouseY=D})});let x=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(P=>{x.subscribeCache(({scale:L})=>{P.scale=L})});let E=()=>{if(!d)return;c&&y&&(y.width=e.width,y.height=e.height);let P=c?T:d;P&&(e.width=e.width,_.forEach(({x:L,y:D,width:$,height:C,mouseX:k,mouseY:O,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(!V)return;let ue=k-(e.width-($+i)*s)/2,re=O-(e.height-(C+i)*n)/2,ye=(L-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),Be=0,J=Math.cos(Be)*(Ne+B),Te=Math.sin(Be)*(Ne+B);P.setTransform(J,Te,-Te,J,Math.floor(q+L),Math.floor(ee+D)),P.beginPath(),P.rect(Math.floor(-$/2),Math.floor(-C/2),$,C),P.fillStyle="#000000",P.fill(),P.setTransform(1,0,0,1,0,0)}),P.globalCompositeOperation="destination-out",_.forEach(({x:L,y:D,width:$,height:C,mouseX:k,mouseY:O,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(V)return;let ue=k-(e.width-($+i)*s)/2,re=O-(e.height-(C+i)*n)/2,ye=(L-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),Be=0,J=Math.cos(Be)*(Ne+B),Te=Math.sin(Be)*(Ne+B);P.setTransform(J,Te,-Te,J,Math.floor(q+L),Math.floor(ee+D)),P.beginPath(),P.rect(Math.floor(-$/2),Math.floor(-C/2),$,C),P.fill(),P.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:c,offscreen:y,ctx:d}))},w=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});w.play();let A=({x:P,y:L})=>{M.goTo({mouseX:P-f,mouseY:L-h}).catch(()=>{})},N=u.useMouseMove(({client:P})=>{let{x:L,y:D}=P;A({x:L,y:D})}),F=u.useTouchMove(({client:P})=>{let{x:L,y:D}=P;A({x:L,y:D})}),I=()=>{E(),p&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let R=Z.watch("navigationIsOpen",P=>{if(P){w?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(w?.play(),u.useFrame(()=>I()))},500)});return()=>{x.destroy(),w.destroy(),M.destroy(),N(),F(),R(),x=null,w=null,M=null,d=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var r_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=ep({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=ep({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var o_=m.createComponent({tag:"animatedpattern-n1",component:r_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([o_]);var n_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var s_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,{useOffscreen:h,context:f}=dt({disableOffcanvas:t}),d=!0,v=e.getContext(f,{alpha:!0}),{top:y,left:T}=de(e),S=m.getActiveRoute(),{offscreen:_,offScreenCtx:M}=ft({useOffscreen:h,canvas:e}),x=!0;e.width=e.clientWidth,e.height=e.clientHeight;let E=[...Array.from({length:19}).keys()].map((k,O)=>{let B=O>=9.5?9.5+(9.5-O):O,V=s.includes(O)?1:B*i;return{width:B*o,height:B*n,x:0,y:0,hasFill:s.includes(O),opacity:V,radius:a,rotate:0,relativeIndex:B}}),w=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=[...E].map(k=>w.subscribeCache(({rotate:O})=>{k.rotate=O})),N=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...E].forEach(k=>{N.subscribeCache(({x:O,y:B})=>{k.x=O,k.y=B})});let F=()=>{if(!v)return;h&&_&&(_.width=e.width,_.height=e.height);let k=h?M:v;k&&(e.width=e.width,E.forEach(({width:O,height:B,x:V,y:q,rotate:ee,hasFill:ue,opacity:re},ye)=>{let ve=E.length-ye,ge=e.width/2,Ne=e.height/2,Be=1,J=Math.PI/180*ee,Te=Math.cos(J)*Be,Ge=Math.sin(J)*Be;k.setTransform(Te,Ge,-Ge,Te,ge+V+ve*V/20,Ne+q+ve*q/20),x?(k.beginPath(),k.roundRect(Math.round(-O/2),Math.round(-B/2),O,B,130)):(k.beginPath(),k.rect(Math.round(-O/2),Math.round(-B/2),O,B)),ue?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${re})`,k.strokeStyle=`rgba(0, 0, 0, ${re})`,k.stroke()),k.fill(),k.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:h,offscreen:_,ctx:v}))},I=we.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});I.goTo(w,{rotate:360},{duration:p}),I.play();let R=()=>{F(),d&&u.useNextFrame(()=>R())};u.useFrame(()=>R());let P=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,y=de(e).top,T=de(e).left,F()}),L=({x:k,y:O})=>{let B=window.innerWidth,V=window.innerHeight,q=k-e.width/2-T,ee=O-e.height/2-y;N.goTo({x:le.clamp(q,-B/2+400+T,B/2-400-T),y:le.clamp(ee,-V/2+200+y,V/2-200-y)}).catch(()=>{})},D=u.useMouseMove(({client:k})=>{let{x:O,y:B}=k;L({x:O,y:B})}),$=u.useTouchMove(({client:k})=>{let{x:O,y:B}=k;L({x:O,y:B})}),C=Z.watch("navigationIsOpen",k=>{if(k){d=!1,I?.pause(),w?.pause(),N?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===S.route&&(I?.resume(),w?.resume(),N?.resume(),u.useFrame(()=>R()))},500)});return{destroy:()=>{w.destroy(),N.destroy(),I.destroy(),P(),D(),$(),C(),A.forEach(k=>{k()}),A.length=0,w=null,N=null,I=null,v=null,_=null,M=null,d=!1,E=null,f=null},stopBlackOne:()=>{s.forEach(k=>{A[k]?.()})}}};function PM({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
        <button
            type="button"
            class="c-canvas__controls__btn"
            ${e({click:()=>{o.stopBlackOne(),o.blackOneIsStopped=!0}})}
            ${t({toggleAttribute:{disabled:()=>o.blackOneIsStopped}})}
        >
            Stop black one rotation
        </button>
        <p class="c-canvas__controls__status">
            ${r`${()=>o.blackOneIsStopped?"Black one rotation is off":""}`}
        </p>
    </li>`}var i_=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=s_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${a.background}</div>

                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${PM({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var a_=m.createComponent({tag:"caterpillar-n1",component:i_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([a_]);var c_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var tp=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},l_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=dt({disableOffcanvas:t.disableOffcanvas}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=ft({useOffscreen:h,canvas:e}),_=!0,M=[...Array.from({length:20}).keys()].map((I,R)=>{let P=R>=10?10+(10-R):R,L=o+o/3*P,D=n+n/3*P,$=s.includes(R)?1:(20-R)*i;return{width:L,height:D,x:0,y:0,hasFill:s.includes(R),opacity:$,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:1})},1).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:5})},5).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:9})},9);M.forEach(I=>{x.subscribeCache(({x:R,rotate:P})=>{let L=R/p,D=2/(3-Math.cos(2*L)),$=D*Math.cos(L)*a,C=D*Math.sin(2*L)/2*c;I.x=$,I.y=C,I.rotate=P})});let E=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);E.onLoopEnd(({loop:I,direction:R})=>{console.log(`loop end: ${I} , ${R}`)});let w=()=>{if(!v)return;h&&T&&(T.width=e.width,T.height=e.height);let I=h?S:v;I&&(e.width=e.width,M.forEach(({width:R,height:P,x:L,y:D,rotate:$,hasFill:C,opacity:k})=>{let O=e.width/2,B=e.height/2,V=1,q=Math.PI/180*$,ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,O+L,B+D),_?(I.beginPath(),I.roundRect(Math.round(-R/2),Math.round(-P/2),R,P,[40,40])):(I.beginPath(),I.rect(Math.round(-R/2),Math.round(-P/2),R,P)),C?I.fillStyle="#000000":(I.strokeStyle=`rgba(0, 0, 0, ${k})`,I.fillStyle="rgba(238, 238, 238, 0)",I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:h,offscreen:T,ctx:v}))},A=()=>{w(),d&&u.useNextFrame(()=>A())};u.useFrame(()=>A()),E.play();let N=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,w()}),F=Z.watch("navigationIsOpen",I=>{if(I){d=!1,E?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(E?.resume(),u.useFrame(()=>A()))},500)});return{destroy:()=>{d=!1,N(),F(),x.destroy(),x=null,E.destroy(),E=null,v=null,T=null,S=null,M=null,f=null},play:()=>{E.play()},playReverse:()=>{E.playReverse()},playUseCurrent:()=>{E.play({useCurrent:!0})},playReverseUseCurrent:()=>{E.playReverse({useCurrent:!0})},playFromLabel:()=>{E.playFrom("mylabel")},plaFromLabelReverse:()=>{E.playFromReverse("mylabel")},stop:()=>E.stop(),pause:()=>E.pause(),resume:()=>E.resume(),reverse:()=>E.reverse()}};function NM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var u_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=l_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape background-shape--light">
                    ${a.background}
                </div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${s({click:()=>{a.controlsActive=!0}})}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${o({toggleClass:{active:()=>a.controlsActive}})}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${s({click:()=>{a.controlsActive=!1}})}
                        ></button>
                        ${NM({buttons:a.buttons})}
                        <li class="c-canvas__controls__item">
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${a.rotation}"
                                    step="1"
                                    id=${c}
                                    ${s({"change:force":l=>{let p=l.currentTarget;p&&(a.rotation=Number(p.value))},input:l=>{let p=l.currentTarget;p&&(a.rotationlabel=Number(p.value))}})}
                                />
                            </div>
                            <label
                                for=${c}
                                class="c-canvas__controls__range-value"
                            >
                                ${i`deg: ${()=>a.rotationlabel}`}
                            </label>
                        </li>
                    </ul>
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var AM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},p_=m.createComponent({tag:"caterpillar-n2",component:u_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:AM,type:"Any"})}});m.useComponent([p_]);var m_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var yc=()=>{m.useMethodByName(ti).update(!0)},vc=()=>{m.useMethodByName(ti).update(!1)};var h_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=dt({disableOffcanvas:o}),d=!0,v=U.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=ft({useOffscreen:h,canvas:e}),M=h?_:y,x=ho(M);M=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=fo({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,w=l?E.map((L,D)=>({...L,scale:1,rotate:0,hasFill:p.includes(D)})).toSorted(L=>L.hasFill?-1:1):E.map((L,D)=>({...L,scale:1,rotate:0,hasFill:p.includes(D)})),A=U.createStaggers({items:w,stagger:r}),N=A.map(({item:L,start:D,end:$})=>{let C=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:D,end:$,ease:"easeInOutQuad"}),k=C.subscribe(({scale:O})=>{L.scale=O});return v.add(C),{sequencer:C,unsubscribe:k}}),F=()=>{if(!y)return;h&&S&&(S.width=e.width,S.height=e.height);let L=h?_:y;L&&(e.width=e.width,w.forEach(({x:D,y:$,width:C,height:k,rotate:O,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{let ue=Math.PI/180*O,re=Math.cos(ue)*B,ye=Math.sin(ue)*B;L.setTransform(re,ye,-ye,re,Math.floor(q+D),Math.floor(ee+$)),x?(L.beginPath(),L.roundRect(Math.floor(-C/2),Math.floor(-k/2),C,k,150)):(L.beginPath(),L.rect(Math.floor(-C/2),Math.floor(-k/2),C,k)),V?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc")),L.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:h,offscreen:S,ctx:y}))},I=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},reverse:!1,ease:!0,easeType:"lerp"});I.init();let R=()=>{F(),d&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let P=Z.watch("navigationIsOpen",L=>{if(L){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>R())},500)});return()=>{P(),N.forEach(({sequencer:L,unsubscribe:D})=>{L.destroy(),D()}),N=[],v.destroy(),v=null,A=[],I.destroy(),I=null,y=null,S=null,_=null,E=[],d=!1,w=null,f=null}};var rp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var op=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=h_({canvas:t().canvas,canvasScroller:t().canvasScroller,...rp[e.currentParamsId].params,disableOffcanvas:!0})};function OM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return rp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,op({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var d_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{yc(),u.useFrame(()=>{u.useNextTick(()=>{op({proxi:i,getRef:r})})});let a=u.useResize(()=>{op({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},vc(),a()}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${OM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var f_=m.createComponent({tag:"scroller-n0",component:d_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([f_]);var g_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function $M({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function LM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var b_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=dt({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=ft({useOffscreen:p,canvas:e}),S=p?T:d,_=ho(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let M=[...Array.from({length:17}).keys()].map((I,R)=>{let P=R>=8.5?8.5+(8.5-R):R;return{width:Math.floor($M({width:15,relativeIndex:P,amountOfPath:17})),height:Math.floor(LM({height:30,relativeIndex:P,amountOfPath:17})),opacity:P*.09,hasFill:l.has(R),rotate:0,relativeIndex:P,index:R}}),x=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});[...M].forEach(I=>{x.subscribeCache(({rotate:R})=>{I.rotate=R})});let E=()=>{if(!d)return;p&&y&&(y.width=e.width,y.height=e.height);let I=p?T:d;if(!I)return;let R=e.width/2,P=e.height/2;e.width=e.width,M.forEach(({width:L,height:D,opacity:$,rotate:C,index:k,hasFill:O})=>{let B=M.length/2-k,V=1,q=Math.PI/180*(C-33),ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,R,P+B*19),_?(I.beginPath(),I.roundRect(-L/2,-D/2+B*19,L,D,150)):(I.beginPath(),I.rect(Math.round(-L/2),Math.round(-D/2),L,D)),O?I.fillStyle="#000":(I.fillStyle=`rgba(238, 238, 238, ${$})`,I.strokeStyle=`rgba(0, 0, 0, ${$})`,I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),gt({useOffscreen:p,offscreen:y,ctx:d})},w=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},ease:!0,easeType:"spring"});w.init();let A=()=>{E(),f&&u.useNextFrame(()=>A())};u.useFrame(()=>{A()});let N=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),F=Z.watch("navigationIsOpen",I=>{if(I){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>A())},500)});return()=>{x.destroy(),N(),F(),x.destroy(),x=null,w.destroy(),w=null,d=null,y=null,T=null,x=null,f=!1,M=null,h=null}};function DM({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
        <div class="c-canvas__controls__range">
            <input
                type="range"
                min="360"
                max="2220"
                value="${e.rotation}"
                step="10"
                id=${o}
                ${t({"change:force":n=>{let s=n.currentTarget;s&&(e.rotation=Number(s.value))},input:n=>{let s=n.currentTarget;s&&(e.rotationlabel=Number(s.value))}})}
            />
        </div>
        <label for=${o} class="c-canvas__controls__range-value">
            ${r`rotationValue: ${()=>e.rotationlabel}`}
        </label>
    </li>`}var y_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};yc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=b_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),vc(),c=null}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div class="background-shape">${a.background}</div>
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${DM({proxi:a,delegateEvents:s,bindObject:i})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var v_=m.createComponent({tag:"scroller-n1",component:y_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([v_]);var T_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var __=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Un=m.createComponent({tag:"dynamic-list-button",component:__,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Tc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],S_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],x_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],C_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Hn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var FM=[{buttonLabel:"sample1",data:S_},{buttonLabel:"salmple2",data:x_},{buttonLabel:"sample3",data:C_},{buttonLabel:"Initial",data:Tc}],BM=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function VM({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return FM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function WM({bindProps:e,staticProps:t,proxi:r}){return BM.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var E_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${VM({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${t({label:"+ counter ( max: 10 )"})}
                        ${o({click:async()=>{e("counter",c=>c+1)}})}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${t({label:"- counter: ( min 0 )"})}
                        ${o({click:async()=>{e("counter",c=>c>0?c-=1:c)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="c-dynamic-list__invalidate">
                <h4 class="c-dynamic-list__invalidate__title">
                    Invalidate component on counter mutation:
                </h4>
                <div class="c-dynamic-list__invalidate__wrap">
                    ${n({observe:()=>a.counter,render:()=>g`<div class="validate-test-wrapper">
                                <dynamic-list-card-inner
                                    ${r(()=>({key:`${a.counter}`}))}
                                ></dynamic-list-card-inner>
                            </div>`})}
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span>${s`${"counter"}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${WM({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function zM({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${e({parentListId:n.listId})}
                ${t(()=>({counter:n.counter,label:o.value.label,index:o.index}))}
                ${r({click:()=>{console.log(o.value?.label,o.index)}})}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${t(()=>({label:`label: ${o.value.label} <br/> counter: ${n.counter}`}))}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `}var w_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>zM({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function jM(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var UM=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${jM(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,I_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let v=f.isFull?"is-full":"";return g`
        <div
            class="c-dynamic-card ${v}"
            ${l({toggleClass:{active:()=>f.isMounted,"is-selected":()=>f.isSelected}})}
        >
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
                    ${s({click:()=>{f.isSelected=!f.isSelected}})}
                    ${o(()=>({active:f.isSelected}))}
                >
                    Select
                </dynamic-list-button>
                <div class="id">id: ${n}</div>
                <div class="parentId">list index: ${f.parentListId}</div>
                <div class="index">${c`index: ${"index"}`}</div>
                <div class="label">${c`label: ${"label"}`}</div>
                <div class="counter">${c`counter: ${"counter"}`}</div>
                <div class="key">key: ${t.length>0?t:"no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${r({parentListId:f.parentListId})}
                        ${o(()=>({counter:f.counter}))}
                    />
                </dynamic-list-empty>

                <!-- Inner repeater -->
                <div class="c-dynamic-card__repeater-container">
                    <p><strong>Inner repeater:</strong></p>
                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${s({click:async()=>{d=d<Hn.length-1?d+1:0,f.innerData=Hn[d],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:y})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${y.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerData,render:({current:y})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${y.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>
                </div>

                <!-- Invalidate -->
                <div class="c-dynamic-card__invalidate">
                    <p>
                        <strong
                            >Inner invalidate<br />
                            on counter mutation:</strong
                        >
                    </p>
                    <div class="c-dynamic-card__invalidate__wrap">
                        ${i({observe:()=>f.counter,render:()=>UM({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var M_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var _c=m.createComponent({tag:"dynamic-list-card-inner",component:M_,props:{key:()=>({value:"",type:String})}});var k_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var R_=m.createComponent({tag:"dynamic-list-counter",component:k_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var P_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var N_=m.createComponent({tag:"dynamic-list-empty",component:P_});var A_=m.createComponent({tag:"dynamic-list-card",component:I_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Hn[0],type:Array}),innerDataUnivoque:()=>({value:Hn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[R_,N_,_c,Un]});var O_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var $_=m.createComponent({tag:"dynamic-slotted-label",component:O_,props:{label:()=>({value:"",type:String})}});var L_=m.createComponent({tag:"dynamic-list-repeater",component:w_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[A_,$_]});var D_=m.createComponent({tag:"dynamic-list",component:E_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Tc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Un,L_,_c]});m.useComponent([D_]);var F_=()=>g` <dynamic-list> </dynamic-list> `;var B_=({refs:e})=>{let t=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=we.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var HM=async({playIntro:e,playSvg:t})=>{await e(),t()},V_=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=B_({refs:s});return setTimeout(()=>{HM({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var W_=m.createComponent({tag:"home-component",component:V_,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var go=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),vv(r)};m.useComponent([W_]);var z_=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>go({svg:e,id:d}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var j_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function GM(e){return Math.floor(Math.random()*e)}var Sc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${j_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:GM(1e3),value:u.getUnivoqueId()}])}})}
                        >${n.label_plus}</dynamic-list-button
                    >
                    <div class="matrioska__head__counter">
                        ${r({observe:n.state,render:()=>{let s=o?.[n.state];return g`
                                    Number of items: ${s.length} ( max
                                    ${n.maxItem} )
                                `}})}
                    </div>
                </div>`).join("")}
        <div class="matrioska__head__cta-counter">
            <dynamic-list-button
                class="matrioska__button"
                ${e({click:()=>{t("counter",n=>n+1)}})}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;var Gn=e=>{m.useMethodByName(e).toggleActive()};var U_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--3">
            ${e({observe:()=>n.level3,render:({current:s})=>{let i=u.getUnivoqueId(),a=u.getUnivoqueId();return g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${i}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Gn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Gn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var H_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${e({observe:()=>n.level2,render:({current:s})=>g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${t({level:"level 2"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                            >
                                ${U_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var G_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Sc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${r({observe:()=>a.level1,render:({current:c})=>g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${o({level:"level 1"})}
                                    ${n(()=>({key:`${c.value.key}`,value:`${c.value.value}`,index:c.index,counter:a.counter}))}
                                >
                                    ${H_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var q_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
        class="matrioska-item"
        ${o({toggleClass:{active:()=>s.active}})}
    >
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${s.level}:</h4>
            <h6 class="matrioska-item__key">
                ${t`key: <span>${"key"}</span>`}
            </h6>
            <h6 class="matrioska-item__key">
                ${t`index: <span>${"index"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${t`Value: <span>${"value"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${t`counter: <span>${"counter"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                Component id: <span>${r}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`};var J_=m.createComponent({tag:"matrioska-item",component:q_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var Y_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Gn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Gn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var X_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${o({observe:()=>n.level2,render:()=>n.level2.map((s,i)=>g`
                                <div
                                    class="matrioska__item-wrap matrioska__item-wrap--2"
                                >
                                    <matrioska-item
                                        class="matrioska-item--2"
                                        ${e({level:"level 2",index:i,key:`${s.key}`,value:`${s.value}`})}
                                        ${t(()=>({counter:n.counter}))}
                                    >
                                        ${Y_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var K_=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Sc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
        </div>
        <h4 class="matrioska__head__title">
            Nested invalidate like matrioska in same component.
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${n({observe:"level1",render:()=>i.level1.map((a,c)=>g`
                                    <div
                                        class="matrioska__item-wrap matrioska__item-wrap--1"
                                    >
                                        <matrioska-item
                                            class="matrioska-item--1"
                                            ${r({level:"level 1",key:`${a.key}`,index:c,value:`${a.value}`})}
                                            ${o(()=>({counter:i.counter}))}
                                        >
                                            ${X_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var qM=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},Q_={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?qM(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Un,J_]},Z_=m.createComponent({tag:"page-matrioska-repeat",component:G_,...Q_}),eS=m.createComponent({tag:"page-matrioska-invalidate",component:K_,...Q_});m.useComponent([Z_,eS]);var tS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,rS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var np=0,JM=({indicators:e,proxi:t})=>[...e].map((r,o)=>Je.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+np-Ve(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),oS=({pins:e})=>{e.forEach(t=>t.refresh())},YM=({titles:e})=>[...e].map(t=>Je.createParallax({item:t,propierties:"x",reverse:!0,range:9})),nS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},sS=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},iS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=JM({indicators:e,proxi:n}),a=YM({titles:t}),c=document.querySelector(".l-navcontainer__side");np=Ve(c)/2;let l=u.useResize(()=>{np=Ve(c)/2}),p=new Ys({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{oS({pins:i}),nS({nav:r})},onEnterBack:()=>{oS({pins:i}),nS({nav:r})},onLeave:()=>{sS({nav:r})},onLeaveBack:()=>{sS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var XM=(e,t)=>e===0?1:e===t-1?-1:0,KM=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},QM=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),aS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(le.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=iS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=de(T),_=se(T),M=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),E=2e3,A=1+(l-x)/l*.9,N=x/l*E*A;Pr.to(M+XM(v,l),{duration:N})}),()=>{d()}}),le.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${QM({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${KM({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var cS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var lS=m.createComponent({tag:"horizontal-scroller-button",component:cS,props:{id:()=>({value:-1,type:Number})}});var uS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${t}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${r}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${t}</h1>
                </div>
            </div>
        </section>
    `};var pS=m.createComponent({tag:"horizontal-scroller-section",component:uS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var mS=m.createComponent({tag:"horizontal-scroller",component:aS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[lS,pS]});m.useComponent([mS]);var hS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var dS=({getState:e})=>{let{fill:t}=e();return g`
        <svg
            viewBox="0 0 105.83333 105.83334"
            version="1.1"
            id="svg1713"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
            fill=${t}
        >
            <path
                d="M 314.66331,372.25958 93.889916,264.46734 -120.06656,385.22612 -85.772782,141.94851 -266.73739,-24.219674 -24.76928,-66.781266 77.344916,-290.23763 192.59565,-73.264538 436.67031,-45.199981 265.93107,131.45836 Z"
                transform="matrix(0.13816225,0,0,0.13816225,41.19189,46.490067)"
            />
        </svg>
    `};var fS=m.createComponent({tag:"svg-star",component:dS,props:{fill:()=>({value:"#000000",type:String})}});var ZM=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
        class="c-move3d-page__controls"
        ${t({toggleClass:{active:()=>o.controlsActive}})}
    >
        <button
            type="button"
            class="c-canvas__controls__close"
            ${e({click:()=>{o.controlsActive=!1}})}
        ></button>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.factor}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xDepth=Number(s)}})}
                />
            </div>
            <div>${r`xDepth: ${()=>o.xDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xLimit}
                    max=${o.xLimit}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yDepth=Number(s)}})}
                />
            </div>
            <div>${r`yDepth: ${()=>o.yDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yLimit}
                    max=${o.yLimit}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yLimit=Number(s)}})}
                />
            </div>
            <div>${r`yLimit: ${()=>o.yLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${e({click:()=>{o.debug=!o.debug}})}
            >
                Toggle Debug
            </button>
        </div>
    </div>`,gS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${ZM({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var ek=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",sp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${ek({debug:o,id:s.id})}
                ${sp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var ip=({element:e})=>({height:se(e),width:Ve(e),offSetLeft:de(e).left,offSetTop:de(e).top}),bS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),yS=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var qn=()=>{},vS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,v=0,y=0,T=0,S=0,_=!1,M=!1,x={x:0,y:0},E=0,w=qn,A=qn,N=qn,F=qn,I=qn,R=qn,P=[],L=U.createSpring({data:{delta:0,ax:0,ay:0}}),D=()=>{_=!1},$=()=>{let{vw:V,vh:q}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},ee=x.x,ue=x.y,{xgap:re,ygap:ye}=_?M?(M=!1,{xgap:0,ygap:0}):{xgap:ee-v,ygap:ue-T}:{xgap:0,ygap:0};_&&(y+=re,S+=ye);let{xInMotion:ve,yInMotion:ge}=_?{xInMotion:y,yInMotion:S}:{xInMotion:ee,yInMotion:ue},{ax:Ne,ay:Be}=l.centerToViewoport||l.drag?{ax:-(V/2-ve)/l.xDepth,ay:(q/2-ge)/l.yDepth}:{ax:-(V/2-(ve-f))/l.xDepth,ay:(q/2-(ge-d))/l.yDepth};v=ee,T=ue;let J=Ne>l.xLimit||Ne<-l.xLimit,Te=Be>l.yLimit||Be<-l.yLimit;J&&(y-=re),Te&&(S-=ye);let Ge=le.clamp(Ne,-l.xLimit,l.xLimit),lt=le.clamp(Be,-l.yLimit,l.yLimit),Tt=Math.sqrt(Math.pow(Math.abs(lt),2)+Math.pow(Math.abs(Ge),2));L.goTo({delta:Tt,ax:Ge,ay:lt}).catch(()=>{}),P.forEach(Xe=>{Xe({delta:Tt,factor:l.factor})})},C=V=>{E!==V&&(x.y-=E,E=V,x.y+=E),$()},k=({page:V})=>V.y>d&&V.y<d+p&&V.x>f&&V.x<f+h,O=({page:V})=>{k({page:V})&&(_=!0,M=!0)},B=()=>{R(),R=l.useScroll?u.useScroll(({scrollY:V})=>{C(V)}):()=>{}};return e(({element:V})=>{let{container:q}=r();l.afterInit(V);let ee=L.subscribe(({delta:ve,ax:ge,ay:Ne})=>{q.style.transform=`translate3D(0,0,0) rotateY(${ge}deg) rotateX(${Ne}deg)`,"onUpdate"in l&&l.onUpdate({delta:ve,deltaX:ge,deltaY:Ne})}),ue=L.onComplete(({ax:ve,ay:ge})=>{q.style.transform=`rotateY(${ve}deg) rotateX(${ge}deg)`}),re=u.useMouseMove(({page:ve})=>{x={x:ve.x,y:ve.y},$()}),ye=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=ip({element:V}))});return o(()=>l.drag,ve=>{if(I(),F(),N(),A(),w(),ve){y=window.innerWidth/2,S=window.innerHeight/2,w=u.useTouchStart(({page:ge})=>{O({page:ge})}),A=u.useTouchEnd(()=>{D()}),N=u.useMouseDown(({page:ge})=>{O({page:ge})}),F=u.useMouseUp(()=>{D()}),I=u.useTouchMove(({page:ge})=>{x={x:ge.x,y:ge.y},$()});return}},{immediate:!0}),o(()=>l.useScroll,(ve,ge)=>{if(ve){B();return}ve!==ge&&R()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=ip({element:V})),x={x:window.innerWidth/2,y:window.innerHeight/2},$()}),()=>{ee(),ue(),ye(),re(),R(),w(),A(),N(),F(),I(),L.destroy(),P=[],L=null,p=null,h=null,f=null,d=null,v=null,y=null,T=null,S=null,_=null,M=null,x=null,E=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{P=bS({childrenId:c})},render:()=>sp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var ap=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),TS=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var tk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,rk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=ap(l),h=ap(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:v}=TS(f);a.goTo({depth:c,rotateX:d,rotateY:v}).catch(()=>{})},_S=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:v,classList:y,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,M=`--item-height:${l};`,x=`--offset-x:${p};`,E=`--offset-y:${h};`,w=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:A,factor:N})=>{s&&rk({delta:A,factor:N,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:w})}),r(({element:A})=>{let N=w.subscribe(({depth:R,rotateX:P,rotateY:L})=>{let D=R+v;A.style.transform=`translate3D(0,0,${D}px) rotateX(${P}deg) rotateY(${L}deg)`}),F=w.onComplete(({depth:R,rotateX:P,rotateY:L})=>{let D=R+v;A.style.transform=`translateZ(${D}px) rotateX(${P}deg) rotateY(${L}deg)`}),I=v;return A.style.transform=`translateZ(${I}px)`,()=>{N(),F(),w.destroy(),w=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${M}${x}${E}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${tk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var SS=m.createComponent({tag:"move-3d-item",component:_S,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Jn=m.createComponent({tag:"move-3d",component:vS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[SS]});var xS=m.createComponent({tag:"move-3d-page",component:gS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Jn]});m.useComponent([xS,fS]);var CS=async({props:e})=>{let{data:t,drag:r,prevRoute:o,nextRoute:n}=e,{data:s}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:t,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:j}=yS({ratio:1980}),ES=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:j(150),height:j(150)},children:[{props:{id:1,depth:200,width:j(150),height:j(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:j(80),height:j(80),offsetX:j(40),offsetY:j(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:j(80),height:j(80),offsetX:j(-10),offsetY:j(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:j(80),height:j(80),offsetX:j(80),offsetY:j(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:j(80),height:j(80),offsetX:j(-10),offsetY:j(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:j(80),height:j(80),offsetX:j(80),offsetY:j(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:j(150),height:j(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:j(150),height:j(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:j(150),height:j(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:j(150),height:j(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:j(150),height:j(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:j(150),height:j(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:j(150),height:j(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:j(150),height:j(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:j(150),height:j(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:j(150),height:j(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:j(150),height:j(150),offsetX:j(20),offsetY:j(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:j(150),height:j(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:j(150),height:j(150),offsetX:j(20),offsetY:j(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:j(150),height:j(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:j(150),height:j(150),offsetX:j(20),offsetY:j(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:j(150),height:j(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:j(150),height:j(150),offsetX:j(20),offsetY:j(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:j(150),height:j(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var wS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:ES,drag:!0}};var IS=({getState:e})=>{let{content:t}=e();return g`${t}`};var Yn=m.createComponent({tag:"any-component",component:IS,props:{content:()=>({value:"",type:String})}});var MS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,v=d-n,y=f-s;if(Math.hypot(y,v)>10){n=d,s=f;let _=Math.atan2(v,y)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var ok=5,kS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=Wn(),n=[...Array.from({length:ok}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=MS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var xc=m.createComponent({tag:"mouse-trail",component:kS});var RS=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Jn,Yn,xc]);var PS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,v,y,T,S,_,M,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(E=>go({svg:e,id:E}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:RS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:M,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var NS=()=>le.mq("min","desktop"),AS="#home",cp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(cp=m.getActiveParams(),AS=e)});var OS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=NS(),e(()=>{let s=u.useResize(()=>{n.active=NS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:AS,params:cp??{}})}),()=>{s(),cp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var $S=m.createComponent({tag:"only-desktop-cta",component:OS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([$S]);var LS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <div class="background-shape">${t}</div>
                <h1 class="l-only-desktop__title">MobProject v0.1</h1>
                <h2 class="l-only-desktop__subtitle">ops...<br /></h2>
                <p>
                    This site is designed<br />
                    for a desktop experience,<br />
                    the minimum resolution is
                    <strong>992px</strong>.<br /><br />
                    <strong>
                        Please resize your browser<br />
                        or use a different device.
                    </strong>
                </p>
                <h3 class="l-only-desktop__subtitle">My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${e}</div>
            </div>
        </div>
    `};var lp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=dt({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=ft({useOffscreen:r,canvas:e}),l=r?c:s,p=ho(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,v=window.innerHeight/20,T=fo({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:v,gutter:1}).items,S=T.map($=>({...$,scale:1,rotate:0})),_=({row:$,col:C})=>{let k=(f+1)*$;return S[k+C]},x={..._({row:1,col:1}),scale:1,rotate:0},w={..._({row:4,col:5}),scale:1,rotate:0},A=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),N=U.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),F=U.createSpring({data:w});S.forEach($=>{A.subscribeCache(({scale:C,rotate:k})=>{$.rotate=k,$.scale=C})}),N.subscribe($=>{x=$}),F.subscribe($=>{w=$});let I=we.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});I.goTo(A,{scale:.2,rotate:90},{duration:1e3});let R=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});R.goTo(N,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(N,{y:_({row:8,col:8}).y,rotate:180}).goTo(F,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(N,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo(F,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(N,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(F,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let P=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let $=r?c:s;if($){e.width=e.width,S.forEach(({x:C,y:k,width:O,height:B,rotate:V,scale:q,offsetXCenter:ee,offsetYCenter:ue},re)=>{if(re===40){let Ne=Math.PI/180*x.rotate,Be=Math.cos(Ne)*x.scale,J=Math.sin(Ne)*x.scale;$.setTransform(Be,J,-J,Be,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?($.beginPath(),$.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):($.beginPath(),$.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),$.fillStyle="#000000",$.fill()}let ye=Math.PI/180*V,ve=Math.cos(ye)*q,ge=Math.sin(ye)*q;$.setTransform(ve,ge,-ge,ve,Math.floor(ee+C),Math.floor(ue+k)),p?($.beginPath(),$.roundRect(Math.floor(-O/2),Math.floor(-B/2),O,B,150)):($.beginPath(),$.rect(Math.floor(-O/2),Math.floor(-B/2),O,B)),$.fillStyle="rgba(238, 238, 238, 0.9)",$.fill()});{let C=Math.PI/180*w.rotate,k=Math.cos(C)*w.scale,O=Math.sin(C)*w.scale;$.setTransform(k,O,-O,k,Math.floor(w.offsetXCenter+w.x),Math.floor(w.offsetYCenter+w.y)),p?($.beginPath(),$.roundRect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height),150)):($.beginPath(),$.rect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height))),$.fillStyle="#a86464",$.fill()}gt({useOffscreen:r,offscreen:a,ctx:s})}},L=()=>{P(),n&&u.useNextFrame(()=>L())};u.useFrame(()=>{L()});let D=Z.watch("navigationIsOpen",u.useDebounce($=>{if($){R.pause(),I.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(R.resume(),I.resume(),n=!0,u.useFrame(()=>L()))},200)},200));return{destroy:()=>{D(),s=null,a=null,c=null,T=[],n=!1,A?.destroy?.(),N?.destroy?.(),F?.destroy?.(),R?.destroy?.(),I?.destroy?.(),S=null,x=null,w=null,o=null,A=null,N=null,F=null,R=null,I=null},play:()=>{R.play(),I.isActive()||I.play()},playReverse:()=>{R.playReverse(),I.isActive()||I.play()},playFromLabel:()=>{R.setTween("my-label",[N,F]).then(()=>{R.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},playFromLabelReverse:()=>{R.setTween("my-label",[N,F]).then(()=>{R.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},revertNext:()=>{R.reverseNext()},pause:()=>{R.pause(),I.pause()},resume:()=>{R.resume(),I.resume()},stop:()=>{R.stop(),I.stop()}}};function nk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var DS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=lp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=lp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${a.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>a.isMounted}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${i({click:()=>{a.controlsActive=!0}})}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${n({toggleClass:{active:()=>a.controlsActive}})}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${i({click:()=>{a.controlsActive=!1}})}
                        ></button>
                        ${nk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var sk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},FS=m.createComponent({tag:"async-timeline",component:DS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:sk,type:"Any"})}});m.useComponent([FS]);var BS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var VS=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Jn,Yn,xc]);var WS=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>go({svg:e,id:v}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:VS({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var zS=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Je.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new vt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var jS=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=zS({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var US=m.createComponent({tag:"mobbu-2025",component:jS,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([US]);var HS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>go({svg:e,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${ya({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var GS="TOP-LEFT",qS="TOP-RIGHT",JS="BOTTOM-LEFT",YS="BOTTOM-RIGHT",XS="CENTER";var ik=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},KS=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],v=d.map(J=>{let Te=window.innerWidth,Ge=window.innerHeight,lt=J.offsetWidth,Tt=J.offsetHeight,Xe=ik(J),es=s-s*lt/(Te*h)-Xe,$r=s-s*Tt/(Ge*h)-Xe;return Math.min(es,$r)}),y=()=>{d.forEach((J,Te)=>{let Ge=_>v[Te];J.classList.toggle("hide",Ge)})},T=0,S=0,_=0,M=0,x=0,E=r.offsetWidth,w=r.offsetHeight,A=t.offsetWidth,N=t.offsetHeight,F=(E-A)/2,I=(w-N)/2,R={x:0,y:0},P=!1,L=!1,D=30,$=()=>{if(i&&s>0){let J=s/(s-_);F=(E-A/J)/2,I=(w-N/J)/2}else F=(E-A)/2,I=(w-N)/2};$();let C={xValue:0,yValue:0},k=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case GS:{C={xValue:F,yValue:I},S=E,T=w;break}case qS:{C={xValue:-F,yValue:I},S=-E,T=w;break}case JS:{C={xValue:F,yValue:-I},S=E,T=-w;break}case YS:{C={xValue:-F,yValue:-I},S=-E,T=-w;break}}let O=k.subscribe(({x:J,y:Te,z:Ge})=>{r&&(r.style.transform=`translate3D(${J}px, ${Te}px, ${Ge}px)`)});k.set({x:C.xValue,y:C.yValue}),[...t.querySelectorAll("a, button")].forEach(J=>{J.setAttribute("draggable","false"),J.style.userSelect="none"});let V=({page:J})=>{P=!0,L=!0,R={x:J.x,y:J.y}},q=({page:J})=>{let{x:Te,y:Ge}=J,{xgap:lt,ygap:Tt}=P?L?(L=!1,{xgap:0,ygap:0}):{xgap:Te-M,ygap:Ge-x}:{xgap:0,ygap:0},Xe=F>0?le.clamp(S+lt,-F,F):le.clamp(S+lt,F,-F),es=I>0?le.clamp(T+Tt,-I,I):le.clamp(T+Tt,I,-I),$r=P?Xe:S,X=P?es:T,{xComputed:ts,yComputed:Ue}=P?{xComputed:$r,yComputed:X}:{xComputed:Te,yComputed:Ge};S=$r,T=X,M=Te,x=Ge,P&&(C={xValue:ts,yValue:Ue},k.goTo({x:ts,y:Ue}).catch(()=>{}))},ee=u.useTouchStart(({page:J,target:Te})=>{V({page:J,target:Te})}),ue=u.useMouseDown(({page:J,target:Te})=>{V({page:J,target:Te})}),re=u.useTouchEnd(()=>{P=!1}),ye=u.useMouseUp(()=>{P=!1}),ve=u.useMouseMove(({page:J})=>{q({page:J})}),ge=u.useTouchMove(({page:J})=>{q({page:J})});f&&f.addEventListener("click",J=>{let{x:Te,y:Ge}=R,lt=Math.abs(M-Te)>D,Tt=Math.abs(x-Ge)>D;(lt||Tt)&&J.preventDefault()},!1),i&&f&&f.addEventListener("wheel",J=>{let{spinY:Te}=u.normalizeWheel(J);_=le.clamp(_+Te*p,a,c),$(),S=F>0?le.clamp(S,-F,F):le.clamp(S,F,-F),T=I>0?le.clamp(T,-I,I):le.clamp(T,I,-I),l({depth:_}),k.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Ne=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Be=u.useResize(()=>{E=r.offsetWidth,w=r.offsetHeight,A=t.offsetWidth,N=t.offsetHeight,$()});return{destroy:()=>{O(),ee(),re(),ue(),ye(),ve(),ge(),Be(),Ne(),k.destroy(),k=null,f=null,d=null,t=null,r=null}}};var QS=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=KS({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper"
            ${t("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var ZS=m.createComponent({tag:"c-dragger",component:QS,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:XS,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([ZS,Yn]);var ex=!1,tx=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
        <div class="dragger-border">
            <h3 class="dragger-border__title">Drag and zoom</h3>
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `,o=g`<div class="dragger-child-container">
        <div class="dragger-child dragger-child--1"></div>
        <div class="dragger-child dragger-child--2"></div>
        <div class="dragger-child dragger-child--3"></div>
        <div class="dragger-child dragger-child--4"></div>
        <div class="dragger-child dragger-child--5"></div>
        <div class="dragger-child dragger-child--6"></div>
        <div class="dragger-child dragger-child--7"></div>
        <div class="dragger-child dragger-child--8"></div>
        <div class="dragger-child dragger-child--9"></div>
        <div class="dragger-child dragger-child--10"></div>
        <div class="dragger-child dragger-child--svg">${e}</div>
    </div>`;return g`<div class="l-dragger">
        <div class="background-shape">${t}</div>
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{ex&&console.log(n)},onDepthChange:({depth:n})=>{ex&&console.log(n)}})}
        >
            <!-- Root border -->
            <any-component
                slot="root-slot"
                ${m.staticProps({content:r})}
            ></any-component>

            <!-- Child -->
            <any-component
                slot="child-slot"
                ${m.staticProps({content:o})}
            ></any-component>
        </c-dragger>
    </div>`};var rx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(se(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>se(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let S=y.firstChild;h.subscribeCache(({angleInRadian:_,scale:M})=>{let x=a+c*_,E=x*Math.cos(_),w=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${E-p[T]}px, ${w-p[T]}px)`,S&&(S.style.scale=`${M}`)})});let f=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let M=i/S*_,x=a+c*M,E=y+x*Math.cos(M),w=T+x*Math.sin(M);_===0?o.moveTo(E,w):o.lineTo(E,w)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),v(),o=null,h=null,f=null,e=null}}};var ox=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=se(t)/2-100,a=e.map(d=>se(d)/2);e.forEach((d,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var nx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>se(d)/2),s=Ve(t)/2-100,i=se(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,v)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,M=2/(3-Math.cos(2*_)),x=M*Math.cos(_)*s,E=M*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${E-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),M=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+M,v+x):o.lineTo(d+M,v+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function ak(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var sx=(e,t)=>t===0?e:sx(t,e%t);function ck(e,t){let r=sx(e,t),o=t/r;return 2*Math.PI*o}var ix=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(se(t)-100)/2,p=n/s,h=ck(n,s),f=ak(l,p,h),d=i*(f/l),v=e.map(A=>se(A)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let M=0;T.forEach(A=>{let N=A/h*10,F=Math.abs((N-M)/2);M=N;let I=Math.max(0,N-F),R=N,P=Math.min(10,N+F);P>I&&(y.goTo({scale:0},{start:I,end:R,ease:"easeInQuad"}),y.goTo({scale:1},{start:R,end:P,ease:"easeOutQuad"}))}),e.forEach((A,N)=>{let F=A.firstChild;y.subscribeCache(({angleInRadian:I,scale:R})=>{let P=l*Math.cos(p*I),L=P*Math.cos(I),D=P*Math.sin(I);A.style.transform=`translate3D(0px,0px,0px) translate(${L-v[N]}px, ${D-v[N]}px)`,F&&(F.style.scale=`${R}`)})});let x=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function E(){if(!c||!r)return;let A=r.width/2,N=r.height/2,F=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let I=0;I<=F;I++){let R=h/F*I,P=l*Math.cos(p*R),L=A+P*Math.cos(R),D=N+P*Math.sin(R);I===0?c.moveTo(L,D):c.lineTo(L,D)}c.stroke()}let w=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,E()});return E(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),w(),c=null,y=null,x=null,e=null}}};var ax=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Ve(t)-200,s=se(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>se(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:M,scale:x})=>{let E=Math.sign(M-T)||1,w=Math.sin(M/a)*s*E;v.style.transform=`translate3D(0px,0px,0px) translate(${M+_}px, ${w-l[y]}px)`,S&&(S.style.scale=`${x}`),T=M})});let h=we.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:M,y:x}=(()=>{if(_<=T){let E=_/T*n,w=Math.sin(E/a)*s;return{x:E,y:w}}if(_>T){let w=(S-_)/T*n,A=Math.sin(w/a)*s*-1;return{x:w,y:A}}return{x:0,y:0}})();_===0?o.moveTo(v+M-n/2,y+x):o.lineTo(v+M-n/2,y+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var up={sin:ax,circle:ox,infinite:nx,archimede:rx,rosaDiGrandi:ix};var cx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var lx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=cx(),{destroy:f,play:d,stop:v,resume:y}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:v,resume:y}=up[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let M=u.useResize(()=>{v(),f(),{destroy:f,play:d,stop:v,resume:y}=up[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),M(),f=null,d=null,v=null,y=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${t("canvas")}></canvas>
        <div class="c-math__nav ${a}">
            <button
                type="button"
                class="c-math__play"
                ${n({click:()=>{y()}})}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${n({click:()=>{v()}})}
            ></button>
        </div>
        <div class="c-math__circle-container">
            ${p.map(({size:T,opacity:S})=>g`<span
                        class="c-math__circle"
                        ${t("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${S}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Cc=m.createComponent({tag:"math-animation",component:lx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Cc]);var ux=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var lk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
        <li class="l-rosa__controls__item">
            <span for="numerators" class="l-rosa__controls__label">
                ${r`numerators: <strong>${()=>e.numeratorsLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    id="numerators"
                    type="range"
                    min="0"
                    max="10"
                    value="${e.numerators}"
                    step="1"
                    ${t({input:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numeratorsLabel=Number(s)},change:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numerators=Number(s)}})}
                />
            </div>
        </li>
        <li class="l-rosa__controls__item">
            <span for="denominator" class="l-rosa__controls__label">
                ${r`denominator: <strong>${()=>e.denominatorLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    type="range"
                    id="denominator"
                    min="0"
                    max="10"
                    value="${e.denominator}"
                    step="1"
                    ${t({input:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominatorLabel=Number(s)},change:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominator=Number(s)}})}
                />
            </div>
        </li>
    `,px=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
        <button
            type="button"
            class="l-rosa__controls__open"
            ${t({click:()=>{a.controlsActive=!0}})}
        >
            show controls
        </button>
        <ul
            class="l-rosa__controls"
            ${o({toggleClass:{active:()=>a.controlsActive}})}
        >
            <button
                type="button"
                class="l-rosa__controls__close"
                ${t({click:()=>{a.controlsActive=!1}})}
            ></button>
            ${lk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var mx=m.createComponent({tag:"rosa-di-grandi-page",component:px,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Cc]});m.useComponent([mx]);var hx=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var mp="home",wc="about",K="template-mobJs-component",Pe="template-doc-default",Xn="template-listing",ct="template-animation",bt="template-test",Ic=new Set([K,Pe]),ie=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Ye=[{url:"./#mobJs-overview",title:"mobJs"}],pp=[{url:"./#mobCore-overview",title:"mobCore"}],Or=[{url:"./#mobMotion-overview",title:"mobMotion"}],Ec=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],Y=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],lr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Mc=[{hash:"pageNotFound",layout:Cv,props:{}},{hash:"onlyDesktop",layout:LS,props:{}},{hash:"about",layout:AT,templateName:wc,props:{}},{hash:"canvas-overview",layout:Ya,templateName:Xn,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:t_,templateName:ct,props:{}},{hash:"animatedPatternN1",layout:n_,templateName:ct,props:{}},{hash:"caterpillarN1",layout:c_,templateName:ct,props:{}},{hash:"caterpillarN2",layout:m_,templateName:ct,props:{}},{hash:"async-timeline",layout:BS,templateName:ct,props:{}},{hash:"scrollerN0",layout:g_,templateName:ct,props:{}},{hash:"scrollerN1",layout:T_,templateName:ct,props:{}},{hash:"dynamic-list",layout:F_,templateName:bt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Ye,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:tS,templateName:bt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:rS,templateName:bt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:z_,templateName:mp,props:{}},{hash:"mobCore-overview",layout:Le,skipTransition:!0,templateName:Pe,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-defaults",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:pp,section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-events",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:pp,section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-store",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:pp,section:"mobCore",rightSidebar:Ec}},{hash:"mobJs-overview",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:Y}},{hash:"mobJs-initialization",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-component",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-routing",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-benchmark-invalidate",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Ye,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Ar,templateName:bt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-utils",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-memory-management",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-debug",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-onMount",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getProxi",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watch",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-staticProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-dataAttribute",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-delegateEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindtext",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindObject",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bind-effect",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-methods",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-refs",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-runtime",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-repeat",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-web-component",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-slot",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unBind",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emit",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emitAsync",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-computed",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindStore",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-removeDom",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-remove",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getChildren",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-freezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unFreezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getParentId",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watchParent",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-instanceName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-class-list",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobMotion-stagger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-defaults",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-overview",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-parallax",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-sequencer",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-scrolltrigger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-sync-timeline",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-create-stagger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-async-timeline",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"mobMotion-tween-spring-lerp",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Or,section:"mobMotion",rightSidebar:lr}},{hash:"horizontalScroller",layout:hS,templateName:ct,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ct,layout:CS,props:wS.shape1},{hash:"plugin-dragger",layout:tx,templateName:ct,props:{}},{hash:"math-animation-01",layout:ux,templateName:ct,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:hx,templateName:ct,props:{}},{hash:"plugin-overview",layout:Ya,templateName:Xn,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Ya,templateName:Xn,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:PS,templateName:ct,props:{}},{hash:"mob-02",layout:HS,templateName:ct,props:{}},{hash:"rdp-01",layout:WS,templateName:ct,props:{}}];var dx=0;m.beforeRouteChange(()=>{dx=window.scrollY});var uk=new Set([K,Pe,Xn,wc,bt]),pk=new Set([K,Pe,Xn,wc,mp,bt]),fx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=uk.has(t)?"var(--header-height)":"0",e.style.left=pk.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${dx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},gx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=we.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var bx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},yx=()=>{bx(),u.useResize(()=>{bx()})};var Kn="reset",ur="tree",ui="filter_component";var pr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new vt({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=se(t),s=se(e),i=Ve(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var Qn=u.createStore({currentId:()=>({value:"",type:String})});var vx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Tx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),mk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),hk=e=>e?e.map(t=>`${t}, `).join(""):"",_x=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),dk=({getState:e})=>{let{id:t}=e();if(t===Kn)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${vx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Tx(r.methods)}</div>
        <div><strong>refs:</strong>: ${Tx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${mk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${vx(r?.repeaterInnerWrap?.classList)}
        </div>
        <div><strong>repeat key</strong>: ${r.key}</div>
        <div>
            <strong>repeat current state</strong>:
            ${JSON.stringify(r.currentRepeaterState?.current)}
        </div>
        <div>
            <strong>repeat current index</strong>:
            ${JSON.stringify(r.currentRepeaterState?.index)}
        </div>

        <!-- State -->
        <h3 class="c-debug-component__section-title">State:</h3>
        <div>
            <strong>Freezed prop:</strong>
            ${hk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${_x(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${_x(r.state.getValidation())}
        </div>
    </div>`:"component not found"},fk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=pr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Sx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,Qn.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:v}=fk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${n("scrollbar")}
            class="c-debug-component__scrollbar"
        />
        <div class="c-debug-component__container" ${n("scroller")}>
            ${o({observe:()=>l.id,render:()=>dk({getState:r})})}
        </div>
    </div>`};var xx=m.createComponent({tag:"debug-component",component:Sx,state:{id:()=>({value:Kn,type:String,skipEqual:!1})}});var Cx=e=>{m.useMethodByName(oc)?.refreshList?.({testString:e})};var hp=async(e="")=>{await m.tick(),Cx(e)},Ex=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(hp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;hp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;hp(s)}})}
        >
            find
        </button>
    </div>`);var wx=m.createComponent({tag:"debug-filter-head",component:Ex});var gk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=pr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Ix=e=>`~${e}`,bk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Ix(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Ix(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Mx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=bk({testString:y}),await m.tick(),d?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:v}=await gk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},v=()=>{},f=()=>{}}}),g`
        <div class="c-debug-filter-list">
            <div class="c-debug-filter-list__list" ${t("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${t("scrollbar")}
                    class="c-debug-filter-list__scrollbar"
                />
                <span
                    class="c-debug-filter-list__status"
                    ${a({toggleClass:{visible:()=>p.isLoading}})}
                    >Generate list</span
                >
                <span
                    class="c-debug-filter-list__status"
                    ${a({toggleClass:{visible:()=>p.noResult}})}
                    >no result</span
                >
                <div
                    class="c-debug-filter-list__scroller"
                    ${t("scroller")}
                >
                    ${n({observe:()=>p.data,key:"id",useSync:!0,render:({sync:y,current:T})=>g`
                                <debug-filter-list-item
                                    ${s({id:T.value.id,name:T.value.name})}
                                    ${i(()=>({tag:T.value.tag}))}
                                    ${y()}
                                ></debug-filter-list-item>
                            `})}
                </div>
            </div>
        </div>
    `};var mr=e=>{m.useMethodByName(Zs)?.updateId(e)},kx=()=>{m.useMethodByName(Zs)?.refreshId()};var Rx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${s.id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${t`${"tag"}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${s.name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${e({click:()=>{mr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Px=m.createComponent({tag:"debug-filter-list-item",component:Rx,bindStore:Qn,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Nx=m.createComponent({tag:"debug-filter-list",component:Mx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Px]});var Ax=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${e({observe:()=>r.active,render:()=>r.active?g`
                        <div>
                            <strong> Debug activated: </strong>
                            ${m.getDebugMode()}
                        </div>
                        <div class="c-debug-head__total">
                            <strong>Number of component</strong>:
                            ${m.componentMap.size} ( excluded generated
                            debug )
                        </div>
                        <div class="c-debug-head__repeater">
                            <strong>Active repeater: </strong>:
                            ${m.getNumberOfActiveRepeater()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active invalidate: </strong>:
                            ${m.getNumberOfActiveInvalidate()}
                        </div>
                    `:""})}
        </div>
        <div class="c-debug-head__search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`};var Ox=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;mr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;mr(n??"")}})}
            >
                find
            </button>
        </div>
        <div>
            <span class="c-debug-search__label">
                <strong>Search by InstanceName:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("instance_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);mr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);mr(s??"")}})}
            >
                find
            </button>
            <div>
                <span class="c-debug-search__label">
                    <strong>Clear:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",mr(Kn)}})}
                >
                    clear
                </button>
            </div>
            <div>
                <span class="c-debug-search__label">
                    <strong>Refresh:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${r({click:()=>{kx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var $x=m.createComponent({tag:"debug-search",component:Ox});var Lx=m.createComponent({tag:"debug-head",component:Ax,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[$x]});var kc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",bn),console.log("currentListValueMap",_s),console.log("activeRepeatMap",Tn),console.log("onMountCallbackMap",xs),console.log("staticPropsMap",_n),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Gr.size),console.log("invalidateIdsMap",Ze),console.log("invalidateInstancesMap",be),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",et),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",Nh()),console.log("slotPlaceholderSize",Ui()),console.log("bindTextPlaceholderMapSize",xd()),console.log("instanceMap",zr)};var Dx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=ur});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=ur}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=ur}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{kc()}})}
            >
                console log
            </button>

            <div class="c-debug-overlay__head">
                <debug-head
                    ${r(()=>({active:a.active}))}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===ur&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===ui&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=ur}})}
                            ${n({toggleClass:{active:()=>a.listType===ur}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=ui}})}
                            ${n({toggleClass:{active:()=>a.listType===ui}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===ur&&a.active?g`
                                    <debug-tree
                                        name="${sc}"
                                    ></debug-tree>
                                `:a.listType===ui&&a.active?g`
                                    <debug-filter-list
                                        name="${oc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${Zs}"></debug-component>
            </div>
        </div>
    </div>`};var Rc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var yk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=pr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Fx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await yk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
        <div class="c-debug-tree">
            <div class="c-debug-tree__list" ${o("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${o("scrollbar")}
                    class="c-debug-tree__scrollbar"
                />
                <span
                    class="c-debug-tree__status"
                    ${i({toggleClass:{visible:()=>c.isLoading}})}
                    >Generate tree</span
                >
                <div class="c-debug-tree__scroller" ${o("scroller")}>
                    ${t({observe:()=>c.data,render:()=>Rc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var Bx=()=>{m.useMethodByName(sc)?.refresh()};var vk=e=>e>0?`( ${e} ) `:"",Vx=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>Vx({id:i,value:t}))},Wx=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>Vx({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=Nr.subscribe(h);return Nr.reset(h),s(()=>l.isOpen,async d=>{await Nr[d?"down":"up"](h),Bx()}),()=>{f()}}),g`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head ${p}"
            ${n({click:()=>{l.isOpen=!l.isOpen}})}
            ${i([{toggleClass:{open:()=>l.isOpen}},{toggleClass:{"has-children-selected":()=>l.hasActiveChildren}}])}
        >
            <span class="c-debug-tree-item__id">${l.id}</span> |
            <span class="c-debug-tree-item__component"
                >${l.componentName}</span
            >
            |
            <span class="c-debug-tree-item__instance"
                >${l.instanceName}</span
            >
            <span>${vk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{mr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${Rc({data:l.children,staticProps:t})}
        </div>
    </div>`};var zx=m.createComponent({tag:"debug-tree-item",component:Wx,bindStore:Qn,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var jx=m.createComponent({tag:"debug-tree",component:Fx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[zx]});var Ux=m.createComponent({tag:"debug-overlay",component:Dx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:ur,type:String})},child:[jx,xx,Lx,wx,Nx]});var dp=()=>{},Pc=()=>{},Nc=()=>{},Ac=()=>{},Tk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),Hx=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=cr(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),v=!1;d.addEventListener("input",()=>{Nc?.(d.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Ac();return}({init:dp,destroy:Pc,move:Nc,updateScroller:Ac}=pr({screen:h,scroller:f,scrollbar:d})),v=!0,dp(),Ac(),Nc(0)}_.length===0&&(l.hide=!0,Pc?.(),v=!1)});return()=>{Pc?.(),y(),dp=()=>{},Pc=()=>{},Nc=()=>{},Ac=()=>{}}}),g`<div
        class="c-params-mobjs"
        ${t("screenEl")}
        ${i({toggleClass:{hide:()=>l.hide,shift:()=>l.shift}})}
    >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${t("scrollbar")}
            class="c-params-mobjs__scrollbar hide-scrollbar"
        />
        <ul ${t("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>Tk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var Gx=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var qx=m.createComponent({tag:"links-mobjs-button",component:Gx,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Jx=m.createComponent({tag:"links-mobjs",component:Hx,child:[qx],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var Yx=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,v=null}}),g`<div
        class="c-quick-nav-container"
        ${t([{toggleClass:{active:()=>a.active}}])}
    >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${o("previous")}
            ${t({toggleClass:{"is-disable":()=>!a.prevRoute},toggleAttribute:{href:()=>{let l=a.prevRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--back"
            ${o("back")}
            ${t({toggleClass:{"is-disable":()=>!a.backRoute},toggleAttribute:{href:()=>{let l=a.backRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--next"
            ${o("next")}
            ${t({toggleClass:{"is-disable":()=>!a.nextRoute},toggleAttribute:{href:()=>{let l=a.nextRoute;return l&&l.length>0?l:null}}})}
        >
        </a>
        <div class="c-quick-nav__label-container">
            <div class="c-quick-nav__label" ${o("labels")}>
                <div
                    class="c-quick-nav__label__container"
                    ${o("labelList")}
                >
                    <span class="c-quick-nav__label__item">previous item</span>
                    <span class="c-quick-nav__label__item">all items</span>
                    <span class="c-quick-nav__label__item">next item</span>
                </div>
            </div>
        </div>
    </div>`};var Xx=m.createComponent({tag:"quick-nav",component:Yx,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var _k=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),Kx=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Ic.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>_k({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var Qx=m.createComponent({tag:"right-sidebar",component:Kx,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var Zx=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var e0=m.createComponent({tag:"route-loader",component:Zx,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var t0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var r0=m.createComponent({tag:"scroll-down-label",component:t0,state:{active:()=>({value:!1,type:Boolean})}});var o0=()=>{m.useMethodByName(zo)?.setInputFocus()},fp=e=>{m.useMethodByName(zo)?.updateCurrentSearchFromSuggestion(e)},n0=e=>{m.useMethodByName(zo)?.shouldCloseSuggestion(e)},Oc=()=>{m.useMethodByName(zo)?.closeSuggestion()};var s0=({proxi:e})=>{e.active=!1,Oc()},Sk=({target:e})=>{e&&n0(e)},i0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{s0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{s0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Sk({target:a.target})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${zo}"
                ></search-overlay-header>
            </div>
            <div class="search-overlay__current-search">
                <p>
                    ${n`search for: <strong>${()=>i.currentSearch}</strong>`}
                </p>
            </div>

            <!-- List -->
            <div class="search-overlay__list">
                <search-overlay-list
                    ${s({updatePrentSearchKey:a=>{i.currentSearch=a}})}
                    name="${ni}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var a0=e=>{m.useMethodByName(ni)?.update(e)},c0=()=>{m.useMethodByName(ni)?.reset()};var xk=async({currentSearch:e})=>{a0(e)},gp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;xk({currentSearch:r})},l0=({getRef:e,proxi:t})=>{c0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},u0=e=>`~${e}`,Ck=({currentSearch:e,proxi:t})=>{let o=cr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${u0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${u0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},p0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),gp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Ck({currentSearch:h,proxi:l})},60)})}
            />
            <div
                class="search-overlay-header__suggestion-container"
                ${r("suggestionElement")}
                ${c({toggleClass:{active:()=>l.suggestionListActive}})}
            >
                <search-overlay-suggestion
                    ${n(()=>({list:l.suggestionListData}))}
                ></search-overlay-suggestion>
            </div>
        </div>

        <!-- Submit -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{gp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&gp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{l0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&l0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var m0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
        <div class="search-overlay-suggestion">
            <ul class="search-overlay-suggestion__list">
                ${t({observe:()=>o.list,key:"word",render:({current:n})=>g`
                            <search-overlay-suggestion-item
                                ${r(()=>({word:n.value.word,wordHiglight:n.value.wordHiglight}))}
                            >
                            </search-overlay-suggestion-item>
                        `})}
            </ul>
        </div>
    </div>`};var Ek=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){fp(t);return}if(e.toLowerCase()==="escape"){Oc();return}},h0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{fp(o.word)},keydown:n=>{n.preventDefault(),Ek({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var d0=m.createComponent({tag:"search-overlay-suggestion-item",component:h0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var f0=m.createComponent({tag:"search-overlay-suggestion",component:m0,props:{list:()=>({value:[],type:Array})},child:[d0]});var g0=m.createComponent({tag:"search-overlay-header",component:p0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[f0]});var wk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Ik=new Set(["mob-title","mob-paragraph","mob-list"]),Mk=new Set(["mob-title","mob-paragraph"]),kk=new Set(["mob-list"]),b0=async({currentSearch:e=""})=>{let t=Mc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:wk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>Ik.has(y)).flatMap(y=>Mk.has(y?.component)?y.content:kk.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var Rk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=pr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},y0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await b0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:v,refresh:y}=Rk({getRef:o});return h=v,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
        <span
            class="search-overlay-list__loading"
            ${a({toggleClass:{active:()=>p.loading}})}
            >fetch data</span
        >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${r("scrollbar")}
            class="search-overlay-list__scrollbar"
        />

        <!-- no result -->
        <div>
            ${c({observe:()=>p.noResult,render:()=>p.noResult?g`
                              <ul class="search-overlay-list__ul">
                                  <li class="search-overlay-list__item">
                                      <div class="search-overlay-list__section">
                                          <p><strong>no result</strong></p>
                                      </div>
                                  </li>
                              </ul>
                          `:""})}
        </div>

        <!-- result list -->
        <ul class="search-overlay-list__ul" ${r("scroller")}>
            ${t({observe:()=>p.list,render:({current:f})=>g`
                        <search-overlay-list-item
                            ${l(()=>({active:p.activeRoute.route===f.value.uri,uri:f.value.uri,breadCrumbs:f.value.breadCrumbs,count:f.value.count,title:f.value.title}))}
                        >
                        </search-overlay-list-item>
                    `})}
        </ul>
    </div>`};var $c=()=>{m.useMethodByName(ac)?.toggle()};var Pk=({uri:e})=>{m.loadUrl({url:e}),$c()},v0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Pk({uri:n.uri})}})}
            >
                <div class="search-overlay-list__section">
                    <p>
                        ${o`<strong>${()=>n.breadCrumbs}</strong> (${()=>n.count})`}
                    </p>
                </div>
                <div class="search-overlay-list__title">
                    <h6>${o`${()=>n.title}`}</h6>
                </div>
            </button>
        </li>
    `};var T0=m.createComponent({tag:"search-overlay-list-item",component:v0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var _0=m.createComponent({tag:"search-overlay-list",component:y0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[T0]});var S0=m.createComponent({tag:"search-overlay",component:i0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[g0,_0]});var x0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var C0=m.createComponent({tag:"test-scss-grid",component:x0});var bo=()=>{let{templateName:e}=m.getActiveRoute();return Ic.has(e)?0:40};var E0=()=>{m.useMethodByName(nc)?.toggle()};var Nk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Ak=()=>g`
        <ul class="l-footer__bio">
            ${Nk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,w0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Ak()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{E0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{kc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var I0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var M0=m.createComponent({tag:"debug-button",component:I0});var k0=m.createComponent({tag:"mob-footer",component:w0,child:[M0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Lc=()=>{m.useMethodByName(oi)?.scrollTop()},Dc=()=>{m.useMethodByName(oi)?.refresh()};var Zn=({fireCallback:e=!0}={})=>{m.useMethodByName(ic)?.closeAllAccordion({fireCallback:e})};function Ok(){m.loadUrl({url:"home"}),Zn(),Z.set("navigationIsOpen",!1),Lc()}var R0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>se(i)),u.useFrameIndex(()=>{s.isMounted=!0},bo())}),g`
        <header
            class="l-header"
            ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${e({click:()=>{Ok()}})}
                    >
                        <div class="l-header__title-container">
                            <h3
                                ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                            >
                                v 1.0
                            </h5>
                        </div>
                    </button>
                    <div class="l-header__main-menu">
                        <header-main-menu></header-main-menu>
                    </div>
                    <div
                        class="l-header__utils"
                        ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                    >
                        <mob-header-utils></mob-header-utils>
                    </div>
                </div>
            </div>
        </header>
    `};var P0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{Z.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ut()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var N0=m.createComponent({tag:"mob-header-toggle",component:P0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var $k=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function Lk({delegateEvents:e}){let t=cr().header,{links:r}=t,o={github:Wn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{$k({event:c})}})}
                          >
                              ${o[s]}
                          </button>
                      `:g`
                          <a
                              href="${i}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${o[s]}
                          </a>
                      `}
            </li>`}).join("")}var A0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Lk({delegateEvents:e})}
        </ul>
    `;var Dk=()=>{$c(),o0()},O0=({delegateEvents:e})=>{let t=Wn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{Dk()}})}
    >
        ${t}
    </button>`};var $0=m.createComponent({tag:"search-cta",component:O0});var L0=m.createComponent({tag:"mob-header-utils",component:A0,child:[$0]});var Fk=({delegateEvents:e,staticProps:t})=>cr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),D0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${Fk({delegateEvents:e,staticProps:t})}
        </ul>
    `};var F0=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var B0=m.createComponent({tag:"header-main-menu-button",component:F0,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var V0=m.createComponent({tag:"header-main-menu",component:D0,child:[B0],state:{isMounted:()=>({value:!1,type:Boolean})}});var W0=m.createComponent({tag:"mob-header",component:R0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[V0,L0,N0]});var bp=0,z0=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new vt({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(bp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${bp})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=se(r),h=se(c),f=se(l),v=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(v)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${bp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function Bk({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function Vk({main:e,proxi:t}){Dc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function Wk({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),Ut()})}var zk=()=>{Lc(),Zn();let{navigationIsOpen:e}=Z.get();e||Pr.to(0)},j0=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){Vk({main:a,proxi:s});return}Bk({main:a,proxi:s})}),Wk({main:a});let{scrollNativationToTop:c,refreshScroller:l}=z0({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},bo()),()=>{}}),g`
        <div
            class="l-navcontainer"
            ${o({toggleClass:{active:()=>s.isOpen}})}
        >
            <div
                class="l-navcontainer__side"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                <div class="l-navcontainer__percent"></div>
                <button
                    class="l-navcontainer__totop"
                    ${r({click:()=>{zk()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${ic}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function jk({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:v}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:h,hide:!!v})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:y=!1})=>{if(y){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var U0=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=cr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${jk({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var H0=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var G0=m.createComponent({tag:"mob-navigation-label",component:H0,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function Uk({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var q0=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return Nr.subscribe(h),Nr.reset(h),o(()=>a.isOpen,async f=>{await Nr[f?"down":"up"](h),Dc(),!f&&Zn({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${Uk({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var J0=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===y&&S,M=f.includes(d);o.isCurrent=_||M,_&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Fc=m.createComponent({tag:"mob-navigation-button",component:J0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var Y0=m.createComponent({tag:"mob-navigation-submenu",component:q0,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Fc]});var X0=m.createComponent({tag:"mob-navigation",component:U0,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[G0,Y0,Fc]});var K0=m.createComponent({tag:"mob-navigation-container",component:j0,child:[X0],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([W0,K0,k0,Xx,e0,r0,Jx,Ux,C0,S0,Qx]);var Q0=async()=>g`
        ${""}
        <debug-overlay name="${nc}"></debug-overlay>
        <mob-header name="${iT}"></mob-header>
        <mob-navigation-container
            name="${oi}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ei}"></quick-nav>
        <route-loader name="${lc}"></route-loader>
        <scroll-down-label name="${ti}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${cc}"></right-sidebar>
        <search-overlay name="${ac}"></search-overlay>
    `;var yp=0,vp=document.querySelector(".js-main-loader-track"),Z0=(e=60)=>{let t=()=>{if(yp++,!vp)return;let r=100*yp/e;if(vp.style.transform=`scaleX(${r/100})`,yp>=e){vp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var eC=e=>{m.useMethodByName(lc).skip(e)};var tC=60,rC=()=>le.mq("max","desktop"),Hk=()=>{u.useResize(()=>{rC()&&m.loadUrl({url:"onlyDesktop"})})},Vc=document.body.querySelector(".js-main-loader"),Wc=document.body.querySelector(".js-main-loader-background"),Bc=U.createTimeTween({data:{opacity:1},duration:1e3});Vc&&Wc&&[Vc,Wc].forEach(e=>{Bc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var Gk=async()=>{await Sv(),await xv(),Z0(tC),await u.useFps({duration:tC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:Q0,routes:Mc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:fx,pageTransition:gx,afterInit:async()=>{await Bc.goTo({opacity:0}),Bc.destroy(),Bc=null,Vc?.remove(),Wc?.remove(),Vc=null,Wc=null,yx(),Hk(),eC(!1)},redirect:({route:e})=>rC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{yv(),le.setDefault({deferredNextTick:!0,throttle:100}),Gk(),bv()});})();
//# sourceMappingURL=main.js.map
