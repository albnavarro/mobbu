"use strict";(()=>{var TC=Object.create;var ol=Object.defineProperty;var _C=Object.getOwnPropertyDescriptor;var SC=Object.getOwnPropertyNames;var xC=Object.getPrototypeOf,CC=Object.prototype.hasOwnProperty;var EC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var r in t)ol(e,r,{get:t[r],enumerable:!0})},wC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of SC(t))!CC.call(e,n)&&n!==r&&ol(e,n,{get:()=>t[n],enumerable:!(o=_C(t,n))||o.enumerable});return e};var IC=(e,t,r)=>(r=e!=null?TC(xC(e)):{},wC(t||!e||!e.__esModule?ol(r,"default",{value:e,enumerable:!0}):r,e));var pT=EC((xJ,uT)=>{function Qy(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Qy(r)}),e}var hc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Zy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ho(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var HI="</span>",Gy=e=>!!e.scope,UI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Ku=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Zy(t)}openNode(t){if(!Gy(t))return;let r=UI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Gy(t)&&(this.buffer+=HI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},qy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Qu=class e{constructor(){this.rootNode=qy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=qy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Zu=class extends Qu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Ku(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ni(e){return e?typeof e=="string"?e:e.source:null}function eT(e){return Vo("(?=",e,")")}function GI(e){return Vo("(?:",e,")*")}function qI(e){return Vo("(?:",e,")?")}function Vo(...e){return e.map(r=>ni(r)).join("")}function JI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function tp(...e){return"("+(JI(e).capture?"":"?:")+e.map(o=>ni(o)).join("|")+")"}function tT(e){return new RegExp(e.toString()+"|").exec("").length-1}function YI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var XI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function rp(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=ni(o),i="";for(;s.length>0;){let a=XI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var KI=/\b\B/,rT="[a-zA-Z]\\w*",op="[a-zA-Z_]\\w*",oT="\\b\\d+(\\.\\d+)?",nT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",sT="\\b(0b[01]+)",QI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ZI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Vo(t,/.*\b/,e.binary,/\b.*/)),ho({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},si={begin:"\\\\[\\s\\S]",relevance:0},eM={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[si]},tM={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[si]},rM={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},fc=function(e,t,r={}){let o=ho({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=tp("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Vo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},oM=fc("//","$"),nM=fc("/\\*","\\*/"),sM=fc("#","$"),iM={scope:"number",begin:oT,relevance:0},aM={scope:"number",begin:nT,relevance:0},cM={scope:"number",begin:sT,relevance:0},lM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[si,{begin:/\[/,end:/\]/,relevance:0,contains:[si]}]},uM={scope:"title",begin:rT,relevance:0},pM={scope:"title",begin:op,relevance:0},mM={begin:"\\.\\s*"+op,relevance:0},hM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},mc=Object.freeze({__proto__:null,APOS_STRING_MODE:eM,BACKSLASH_ESCAPE:si,BINARY_NUMBER_MODE:cM,BINARY_NUMBER_RE:sT,COMMENT:fc,C_BLOCK_COMMENT_MODE:nM,C_LINE_COMMENT_MODE:oM,C_NUMBER_MODE:aM,C_NUMBER_RE:nT,END_SAME_AS_BEGIN:hM,HASH_COMMENT_MODE:sM,IDENT_RE:rT,MATCH_NOTHING_RE:KI,METHOD_GUARD:mM,NUMBER_MODE:iM,NUMBER_RE:oT,PHRASAL_WORDS_MODE:rM,QUOTE_STRING_MODE:tM,REGEXP_MODE:lM,RE_STARTERS_RE:QI,SHEBANG:ZI,TITLE_MODE:uM,UNDERSCORE_IDENT_RE:op,UNDERSCORE_TITLE_MODE:pM});function dM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function fM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function gM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=dM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function bM(e,t){Array.isArray(e.illegal)&&(e.illegal=tp(...e.illegal))}function vM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function yM(e,t){e.relevance===void 0&&(e.relevance=1)}var TM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Vo(r.beforeMatch,eT(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},_M=["of","and","for","in","not","or","if","then","parent","list","value"],SM="keyword";function iT(e,t,r=SM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,iT(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,xM(c[0],c[1])]})}}function xM(e,t){return t?Number(t):CM(e)?0:1}function CM(e){return _M.includes(e.toLowerCase())}var Jy={},Bo=e=>{console.error(e)},Yy=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Hn=(e,t)=>{Jy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Jy[`${e}/${t}`]=!0)},dc=new Error;function aT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=tT(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function EM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Bo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),dc;if(typeof e.beginScope!="object"||e.beginScope===null)throw Bo("beginScope must be object"),dc;aT(e,e.begin,{key:"beginScope"}),e.begin=rp(e.begin,{joinWith:""})}}function wM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Bo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),dc;if(typeof e.endScope!="object"||e.endScope===null)throw Bo("endScope must be object"),dc;aT(e,e.end,{key:"endScope"}),e.end=rp(e.end,{joinWith:""})}}function IM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function MM(e){IM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),EM(e),wM(e)}function kM(e){function t(i,a){return new RegExp(ni(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=tT(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(rp(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[fM,vM,MM,TM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[gM,bM,yM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=iT(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=ni(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return RM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ho(e.classNameAliases||{}),s(e)}function cT(e){return e?e.endsWithParent||cT(e.starts):!1}function RM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ho(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:cT(e)?ho(e,{starts:e.starts?ho(e.starts):null}):Object.isFrozen(e)?ho(e):e}var NM="11.11.1",ep=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Xu=Zy,Xy=ho,Ky=Symbol("nomatch"),PM=7,lT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Zu};function c(C){return a.noHighlightRe.test(C)}function l(C){let M=C.className+" ";M+=C.parentNode?C.parentNode.className:"";let F=a.languageDetectRe.exec(M);if(F){let V=A(F[1]);return V||(Yy(s.replace("{}",F[1])),Yy("Falling back to no-highlight mode for this block.",C)),V?F[1]:"no-highlight"}return M.split(/\s+/).find(V=>c(V)||A(V))}function p(C,M,F){let V="",B="";typeof M=="object"?(V=C,F=M.ignoreIllegals,B=M.language):(Hn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Hn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=C,V=M),F===void 0&&(F=!0);let z={code:V,language:B};k("before:highlight",z);let ee=z.result?z.result:h(z.language,z.code,F);return ee.code=z.code,k("after:highlight",ee),ee}function h(C,M,F,V){let B=Object.create(null);function z(W,G){return W.keywords[G]}function ee(){if(!Y.keywords){Ve.addText(xe);return}let W=0;Y.keywordPatternRe.lastIndex=0;let G=Y.keywordPatternRe.exec(xe),me="";for(;G;){me+=xe.substring(W,G.index);let Ce=$e.case_insensitive?G[0].toLowerCase():G[0],ot=z(Y,Ce);if(ot){let[mr,vC]=ot;if(Ve.addText(me),me="",B[Ce]=(B[Ce]||0)+1,B[Ce]<=PM&&(vi+=vC),mr.startsWith("_"))me+=G[0];else{let yC=$e.classNameAliases[mr]||mr;ne(G[0],yC)}}else me+=G[0];W=Y.keywordPatternRe.lastIndex,G=Y.keywordPatternRe.exec(xe)}me+=xe.substring(W),Ve.addText(me)}function ae(){if(xe==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){Ve.addText(xe);return}W=h(Y.subLanguage,xe,!0,$r[Y.subLanguage]),$r[Y.subLanguage]=W._top}else W=d(xe,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(vi+=W.relevance),Ve.__addSublanguage(W._emitter,W.language)}function q(){Y.subLanguage!=null?ae():ee(),xe=""}function ne(W,G){W!==""&&(Ve.startScope(G),Ve.addText(W),Ve.endScope())}function re(W,G){let me=1,Ce=G.length-1;for(;me<=Ce;){if(!W._emit[me]){me++;continue}let ot=$e.classNameAliases[W[me]]||W[me],mr=G[me];ot?ne(mr,ot):(xe=mr,ee(),xe=""),me++}}function ce(W,G){return W.scope&&typeof W.scope=="string"&&Ve.openNode($e.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ne(xe,$e.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),xe=""):W.beginScope._multi&&(re(W.beginScope,G),xe="")),Y=Object.create(W,{parent:{value:Y}}),Y}function Oe(W,G,me){let Ce=YI(W.endRe,me);if(Ce){if(W["on:end"]){let ot=new hc(W);W["on:end"](G,ot),ot.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Oe(W.parent,G,me)}function Je(W){return Y.matcher.regexIndex===0?(xe+=W[0],1):(rl=!0,0)}function Q(W){let G=W[0],me=W.rule,Ce=new hc(me),ot=[me.__beforeBegin,me["on:begin"]];for(let mr of ot)if(mr&&(mr(W,Ce),Ce.isMatchIgnored))return Je(G);return me.skip?xe+=G:(me.excludeBegin&&(xe+=G),q(),!me.returnBegin&&!me.excludeBegin&&(xe=G)),ce(me,W),me.returnBegin?0:G.length}function ye(W){let G=W[0],me=M.substring(W.index),Ce=Oe(Y,W,me);if(!Ce)return Ky;let ot=Y;Y.endScope&&Y.endScope._wrap?(q(),ne(G,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(q(),re(Y.endScope,W)):ot.skip?xe+=G:(ot.returnEnd||ot.excludeEnd||(xe+=G),q(),ot.excludeEnd&&(xe=G));do Y.scope&&Ve.closeNode(),!Y.skip&&!Y.subLanguage&&(vi+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&ce(Ce.starts,W),ot.returnEnd?0:G.length}function ke(){let W=[];for(let G=Y;G!==$e;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Ve.openNode(G))}let Ae={};function Ye(W,G){let me=G&&G[0];if(xe+=W,me==null)return q(),0;if(Ae.type==="begin"&&G.type==="end"&&Ae.index===G.index&&me===""){if(xe+=M.slice(G.index,G.index+1),!n){let Ce=new Error(`0 width match regex (${C})`);throw Ce.languageName=C,Ce.badRule=Ae.rule,Ce}return 1}if(Ae=G,G.type==="begin")return Q(G);if(G.type==="illegal"&&!F){let Ce=new Error('Illegal lexeme "'+me+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(G.type==="end"){let Ce=ye(G);if(Ce!==Ky)return Ce}if(G.type==="illegal"&&me==="")return xe+=`
`,1;if(tl>1e5&&tl>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return xe+=me,me.length}let $e=A(C);if(!$e)throw Bo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let Or=kM($e),$t="",Y=V||Or,$r={},Ve=new a.__emitter(a);ke();let xe="",vi=0,yo=0,tl=0,rl=!1;try{if($e.__emitTokens)$e.__emitTokens(M,Ve);else{for(Y.matcher.considerAll();;){tl++,rl?rl=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=yo;let W=Y.matcher.exec(M);if(!W)break;let G=M.substring(yo,W.index),me=Ye(G,W);yo=W.index+me}Ye(M.substring(yo))}return Ve.finalize(),$t=Ve.toHTML(),{language:C,value:$t,relevance:vi,illegal:!1,_emitter:Ve,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:Xu(M),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:M.slice(yo-100,yo+100),mode:W.mode,resultSoFar:$t},_emitter:Ve};if(n)return{language:C,value:Xu(M),illegal:!1,relevance:0,errorRaised:W,_emitter:Ve,_top:Y};throw W}}function f(C){let M={value:Xu(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return M._emitter.addText(C),M}function d(C,M){M=M||a.languages||Object.keys(t);let F=f(C),V=M.filter(A).filter(N).map(q=>h(q,C,!1));V.unshift(F);let B=V.sort((q,ne)=>{if(q.relevance!==ne.relevance)return ne.relevance-q.relevance;if(q.language&&ne.language){if(A(q.language).supersetOf===ne.language)return 1;if(A(ne.language).supersetOf===q.language)return-1}return 0}),[z,ee]=B,ae=z;return ae.secondBest=ee,ae}function v(C,M,F){let V=M&&r[M]||F;C.classList.add("hljs"),C.classList.add(`language-${V}`)}function y(C){let M=null,F=l(C);if(c(F))return;if(k("before:highlightElement",{el:C,language:F}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new ep("One of your code blocks includes unescaped HTML.",C.innerHTML);M=C;let V=M.textContent,B=F?p(V,{language:F,ignoreIllegals:!0}):d(V);C.innerHTML=B.value,C.dataset.highlighted="yes",v(C,F,B.language),C.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(C.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),k("after:highlightElement",{el:C,result:B,text:V})}function T(C){a=Xy(a,C)}let S=()=>{x(),Hn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),Hn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function x(){function C(){x()}if(document.readyState==="loading"){w||window.addEventListener("DOMContentLoaded",C,!1),w=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function E(C,M){let F=null;try{F=M(e)}catch(V){if(Bo("Language definition for '{}' could not be registered.".replace("{}",C)),n)Bo(V);else throw V;F=i}F.name||(F.name=C),t[C]=F,F.rawDefinition=M.bind(null,e),F.aliases&&$(F.aliases,{languageName:C})}function I(C){delete t[C];for(let M of Object.keys(r))r[M]===C&&delete r[M]}function P(){return Object.keys(t)}function A(C){return C=(C||"").toLowerCase(),t[C]||t[r[C]]}function $(C,{languageName:M}){typeof C=="string"&&(C=[C]),C.forEach(F=>{r[F.toLowerCase()]=M})}function N(C){let M=A(C);return M&&!M.disableAutodetect}function R(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=M=>{C["before:highlightBlock"](Object.assign({block:M.el},M))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=M=>{C["after:highlightBlock"](Object.assign({block:M.el},M))})}function O(C){R(C),o.push(C)}function D(C){let M=o.indexOf(C);M!==-1&&o.splice(M,1)}function k(C,M){let F=C;o.forEach(function(V){V[F]&&V[F](M)})}function L(C){return Hn("10.7.0","highlightBlock will be removed entirely in v12.0"),Hn("10.7.0","Please use highlightElement now."),y(C)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:y,highlightBlock:L,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:E,unregisterLanguage:I,listLanguages:P,getLanguage:A,registerAliases:$,autoDetection:N,inherit:Xy,addPlugin:O,removePlugin:D}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=NM,e.regex={concat:Vo,lookahead:eT,either:tp,optional:qI,anyNumberOfTimes:GI};for(let C in mc)typeof mc[C]=="object"&&Qy(mc[C]);return Object.assign(e,mc),e},Un=lT({});Un.newInstance=()=>lT({});uT.exports=Un;Un.HighlightJS=Un;Un.default=Un});var u={};To(u,{ANIMATION_STOP_REJECT:()=>bl,checkType:()=>Re,createStore:()=>PE,debounce:()=>_o,getFps:()=>OE,getInstantFps:()=>AE,getTime:()=>Lt,getTypeName:()=>os,getUnivoqueId:()=>we,mustMakeSomething:()=>$E,normalizeWheel:()=>ls,shouldMakeSomething:()=>LE,store:()=>pw,throttle:()=>yi,useCache:()=>zE,useDebounce:()=>_o,useFps:()=>WE,useFrame:()=>DE,useFrameIndex:()=>VE,useLinkedList:()=>mw,useLoad:()=>jE,useMouseClick:()=>GE,useMouseDown:()=>qE,useMouseMove:()=>YE,useMouseUp:()=>KE,useMouseWheel:()=>ZE,useNextFrame:()=>BE,useNextLoop:()=>Dt,useNextTick:()=>FE,usePointerDown:()=>iw,usePointerLeave:()=>uw,usePointerMove:()=>aw,usePointerOut:()=>lw,usePointerOver:()=>sw,usePointerUp:()=>cw,useResize:()=>HE,useScroll:()=>ew,useScrollEnd:()=>nw,useScrollImmediate:()=>tw,useScrollStart:()=>ow,useScrollThrottle:()=>rw,useTouchEnd:()=>QE,useTouchMove:()=>XE,useTouchStart:()=>JE,useVisibilityChange:()=>UE});var Lt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Np=16.666666666666668;var yi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Lt()-o>=t&&(e.apply(n,s),o=Lt())},t-(Lt()-o))):(e.apply(n,s),o=Lt())}};var _o=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function je(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function be(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function St(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function rs(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function So(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function nl(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function Pp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var sl=(e,t,r)=>Math.min(Math.max(e,t),r);var Ti=new Set,Dt=e=>{Ti.add(e),Ti.size===1&&setTimeout(()=>{Ti.forEach(t=>{t()}),Ti.clear()})};var il="UNTYPED",Ap="STRING",Op="NUMBER",$p="OBJECT",Lp="FUNCTION",_i="ARRAY",Dp="BOOLEAN",Fp="ELEMENT",Bp="HTMLELEMENT",Vp="NODELIST";var Ie={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},os=e=>{switch(e){case String:case Ap:return"String";case Number:case Op:return"Number";case Object:case $p:return"Object";case Function:case Lp:return"Function";case Array:case _i:return"Array";case Boolean:case Dp:return"Boolean";case Element:case Fp:return"Element";case HTMLElement:case Bp:return"HTMLElement";case NodeList:case Vp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return il}},Re=(e,t)=>{switch(e){case String:case Ap:return Ie.isString(t);case Number:case Op:return Ie.isNumber(t);case Object:case $p:return Ie.isObject(t);case Function:case Lp:return Ie.isFunction(t);case Array:case _i:return Ie.isArray(t);case Boolean:case Dp:return Ie.isBoolean(t);case Element:case Fp:return Ie.isElement(t);case HTMLElement:case Bp:return Ie.isHTMLElement(t);case NodeList:case Vp:return Ie.isNodeList(t);case Set:case"SET":return Ie.isSet(t);case Map:case"MAP":return Ie.isMap(t);case"ANY":return!0;default:return!0}};var RC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),NC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),PC=(e,t)=>{if(e.length!==t.length)return!1;for(let[r,o]of e.entries())if(!ns(o,t[r]))return!1;return!0},ns=(e,t,r=new WeakMap)=>{if(e===t)return!0;if(e==null||t==null)return!1;let o=typeof e;if(o!==typeof t||o!=="object")return!1;if(r.has(e)&&r.get(e)?.has(t))return!0;r.has(e)||r.set(e,new WeakSet),r.get(e)?.add(t);let s=Array.isArray(e),i=Array.isArray(t);if(s!==i)return!1;if(s){if(e.length!==t.length)return!1;for(let[l,p]of e.entries())if(!ns(p,t[l],r))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(e instanceof Date||t instanceof Date)return!1;if(e instanceof RegExp&&t instanceof RegExp)return e.source===t.source&&e.flags===t.flags;if(e instanceof RegExp||t instanceof RegExp)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[l,p]of e)if(!t.has(l)||!ns(p,t.get(l),r))return!1;return!0}if(e instanceof Map||t instanceof Map)return!1;if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}if(e instanceof Set||t instanceof Set)return!1;let a=Object.keys(e),c=Object.keys(t);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(t,l)||!ns(e[l],t[l],r))return!1;return!0},Si=(e,t,r)=>{switch(e){case"ANY":return ns(t,r);case _i:case Array:return PC(t,r);case"SET":case Set:return NC(t,r);case"MAP":case Map:return RC(t,r);default:return t===r}};var xi="UPDATE";var Pe={};To(Pe,{extractKeysFromArray:()=>ll,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>al,getFirstCurrentDependencies:()=>cl,initializeCurrentDependencies:()=>ss,setCurrentDependencies:()=>Ei});var zo=[],Ci=!1,ss=()=>{Ci=!0,zo.length=0},al=()=>(Ci=!1,[...zo]),cl=()=>(Ci=!1,[...zo]?.[0]??"missing_prop"),Ei=e=>{!Ci||!e||zo.includes(e)||(zo=[...zo,e])},Lr=e=>Re(String,e)?e:(ss(),e(),cl()),ll=e=>e.map(t=>Re(String,t)?t:(ss(),t(),cl()));var is=new Map,Wp=e=>{is.delete(e)},Ho=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=is.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),is.set(s,l),p&&Dt(()=>{let d=is.get(s),v=d?.get(t);if(v&&v.newValue!==void 0&&v.newValue!==null)for(let y of v.callbacks)y(v.newValue,v.oldValue,v.validationValue);d?.delete(t),d?.size===0&&is.delete(s)})}}},jp=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var AC="padding: 10px;",ze=()=>AC;var ul="store_shallow_copy",zp=ul;var Ge=new Map,se=e=>{if(zp===ul){let t=Ge.get(e);return t?{...t}:void 0}return Ge.get(e)},Le=(e,t)=>{Ge.set(e,t)},Hp=e=>{Ge.delete(e)};var pl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Up=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Gp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},qp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Jp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${os(r)}`,o)},Yp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Xp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Kp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Qp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},Zp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${os(o)}`,n)},em=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},ml=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},tm=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},rm=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},om=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var nm=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},hl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var as=e=>{if(!Ie.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>as(r)))+1},sm=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ie.isObject(o)&&t)return[r,sm(o,!1)];if(Ie.isFunction(o)){let n=o();if(Ie.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),im=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ie.isObject(s)&&o)return[n,im(s,t,r,!1)];if(Ie.isFunction(s)){let i=s();if(Ie.isObject(i)&&"value"in i&&t in i){let a=Ie.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),am=({data:e,depth:t,logStyle:r})=>t>2?(pl(t,r),{}):sm(e),Uo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(pl(r,o),{}):im(e,t,n),cm=({value:e})=>Re(Map,e)?new Map(e):Re(Set,e)?new Set(e):Re(Object,e)?{...e}:Re(Array,e)?[...e]:e,Dr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var OC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze(),S=a[t]==="ANY";if(Ie.isObject(r)&&!S){Gp(t,r,T);return}if(Ie.isObject(l[t])&&!S){qp(t,T);return}let _=l[t],w=c[t]?.(r,_)??r;if(!Re(a[t],w)){Jp(t,w,a[t],T);return}let E=p[t]?.(w,_);!E&&s&&hl(t,T),!(h[t]&&!E&&n||(f[t]=E,(d[t]?Si(a[t],_,w):!1)&&!s))&&(l[t]=w,Le(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:w,oldValue:_,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(P=>{hr({instanceId:P,prop:t})})))},$C=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze();if(!Ie.isObject(r)){Yp(t,r,T);return}if(!Ie.isObject(a[t])){Xp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(k=>_.includes(k))){Kp(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[L,C]=k,M=a[t][L];return!s&&Si(c[t][L],C,M)?[L,C]:[L,p[t][L]?.(C,M)??C]}));if(!Object.entries(x).map(k=>{let[L,C]=k,M=Re(c[t][L],C);return M||Zp(t,L,C,c[t][L],T),M}).every(k=>k===!0))return;let I=Object.entries(x).map(k=>{let[L,C]=k,M=a[t][L];return l[t][L]&&n?{strictCheck:h[t][L]?.(C,M),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:k})=>k).map(([k,L])=>[k,L]));Object.entries(A).forEach(k=>{let[L,C]=k,M=a[t][L],F=h[t][L]?.(C,M);!F&&s&&hl(t,T),F===void 0&&om(T,"ANY"),f[t][L]=F});let $=a[t],N={...a[t],...A},R=Object.keys(A).every(k=>d[t][k]===!0),O=!0;for(let[k,L]of Object.entries(A)){let C=c[t][k]==="ANY";as(L)>1&&!C&&(Qp(t,x,T),f[t][k]=!1,O=!1)}if(!O){Le(e,{...i,validationStatusObject:f});return}R&&Object.entries(N).every(([k,L])=>Si(c[t][k],$[k],L))&&!s||(a[t]=N,Le(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:a[t],oldValue:$,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(k=>{hr({instanceId:k,prop:t})})))},dr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=se(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=ze();if(!(t in l)){Up(t,h);return}let f=n?cm({value:l[t]}):l[t],d=i===xi?r(f):r,v=p[t]==="ANY";if(Ie.isObject(f)&&!v){$C({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}OC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},lm=({instanceId:e,prop:t,value:r})=>{let o=se(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,Le(e,{...o,store:n}),Ho({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},um=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=se(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),LC=e=>{let t=se(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=um({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Le(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{dr({instanceId:e,prop:l,value:p,action:"SET"})})},hr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Le(e,{...r,computedPropsQueque:n}),!s)){let i=se(e);if(!i)return;Le(e,{...i,computedRunning:!0}),Dt(()=>LC(e))}},DC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=se(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){tm(r,ze());return}s.add({prop:t,keys:r,fn:o}),Le(e,{...n,callBackComputed:s})},FC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=se(e);if(!n)return;let{store:s,bindInstance:i}=n,a=um({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);dr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},pm=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Dr({instanceId:e,prop:t}))return;let s=r.length===0?(ss(),o({}),al()):r;FC({instanceId:e,prop:t,keys:s,callback:o}),DC({instanceId:e,prop:t,keys:s,fn:o})};var mm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ie.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},hm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;dr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var BC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=ze();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return rm(t,a),{state:void 0,unsubscribeId:""};let c=we();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},VC=({instanceId:e,unsubscribeId:t})=>{let r=se(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),Le(e,{...r,watcherByProp:o,watcherMetadata:n}))},dm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=BC({state:n,prop:t,callback:r,wait:o});return s?(Le(e,s),()=>{VC({instanceId:e,unsubscribeId:i})}):()=>{}},fm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return dm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=se(p)?.store;return h&&t in h})??"",c=dm({instanceId:a,prop:t,callback:r,wait:o}),l=se(e);return l?(Le(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=se(e);p&&Le(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var gm=e=>{let t=as(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:am({data:e,depth:t,logStyle:ze()}),type:Uo({data:e,prop:"type",depth:t,logStyle:ze(),fallback:il}),fnTransformation:Uo({data:e,prop:"transform",depth:t,logStyle:ze(),fallback:r=>r}),fnValidate:Uo({data:e,prop:"validate",depth:t,logStyle:ze(),fallback:()=>!0}),strict:Uo({data:e,prop:"strict",depth:t,logStyle:ze(),fallback:!1}),skipEqual:Uo({data:e,prop:"skipEqual",depth:t,logStyle:ze(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var bm=e=>{let t=se(e);if(!t)return{};let{store:r}=t;return r??{}},ym=e=>{let t=se(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?bm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(bm(o))))},vm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];em(t,ze())},Tm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return vm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return vm({instanceId:n,prop:t})};var _m=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Ho({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})})):ml(t,ze()))},wi=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){_m({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";_m({instanceId:n,prop:t})},Sm=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await jp({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})}),{success:!0}):(ml(t,ze()),{success:!1}):new Promise(a=>a({success:!1}))},xm=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return Sm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return Sm({instanceId:n,prop:t})};var Cm=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;return r},Em=({instanceId:e})=>{let t=se(e);if(!t)return;let{store:r}=t;console.log(r)},wm=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},Im=({instanceId:e})=>{let t=se(e);console.log(t)};var WC=e=>!(e==null||!Re(Object,e)||Re(Map,e)||Re(Set,e)||Re(Function,e)),jC=e=>{let t=ze();return new Proxy({},{set(r,o,n){let s=Ge.get(e);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&nm(o,t),i||a?!1:(dr({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!Ge.has(e))return;let n=Ge.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Ei(o)),!(o in n.store))for(let i of n.bindInstance){let a=Ge.get(i);if(a&&o in a.store){s=a.store[o],Ei(o);break}}if(s!==void 0)return WC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!Ge.has(e))return!1;let n=Ge.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=Ge.get(s);if(i&&o in i.store)return!0}return!1}})},Mm=({instanceId:e})=>{let t=Ge.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=jC(e);return Le(e,{...t,proxiObject:r}),r};var zC=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Le(t,{...r,bindInstanceBy:n})},km=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Le(t,{...r,bindInstanceBy:n})},HC=({bindStores:e,selfStore:t})=>{let o=[...Re(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Rm=({value:e,instanceId:t})=>{let r=se(t);if(!r)return;HC({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Re(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Le(t,{...r,bindInstance:l}),s.forEach(p=>{zC({selfId:t,bindId:p})})};var Nm=e=>{let t=Ge.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{km({selfId:e,bindId:n})}),Wp(e),Hp(e)};var Pm=({instanceId:e,values:t})=>{let r=se(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Le(e,r)};var Ii=(e={})=>{let t=we(),r=gm(e),o=mm(r);return Le(t,o),hm(t,r),{getId:()=>t,bindStore:n=>{Rm({value:n,instanceId:t})},get:()=>ym(t),getProp:n=>Tm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:t,prop:c})||dr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:t,prop:l})||dr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:xi})},getProxi:()=>Mm({instanceId:t}),quickSetProp:(n,s)=>{Dr({instanceId:t,prop:n})||lm({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=fm({instanceId:t,prop:c,callback:s,wait:i});return a&&Dt(()=>{wi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=ll(i);pm({instanceId:t,prop:c,keys:l,callback:s}),Dt(()=>{wi({instanceId:t,prop:c})})},emit:n=>{let s=Lr(n);wi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Lr(n);return xm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Pm({instanceId:t,values:n})},getValidation:()=>Cm({instanceId:t}),debug:()=>{Im({instanceId:t})},debugStore:()=>{Em({instanceId:t})},debugValidate:()=>{wm({instanceId:t})},destroy:()=>{Nm(t)}}};var Ee=Ii({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var dl=!1,cs=new Map;function Am(){if(cs.size===0){globalThis.removeEventListener("DOMContentLoaded",Am),dl=!1;return}for(let e of cs.values())e();cs.clear()}function UC(){dl||(dl=!0,globalThis.addEventListener("DOMContentLoaded",Am,{passive:!1}))}var GC=e=>{let t=we();return cs.set(t,e),typeof globalThis<"u"&&UC(),()=>cs.delete(t)},Om=GC;function ls(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function qC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=Ee.get();Ee.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=qC({type:c,event:a}),d=a.target,v={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=Ee.getProp("spinYMaxValue"),T=Ee.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:w,pixelY:x}=ls(a);v.spinX=sl(S,-T,T),v.spinY=sl(_,-y,y),v.pixelX=w,v.pixelY=x}for(let y of r.values())y(v)}function s(){t||(t=!0,o=Ee.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=we();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&t&&(globalThis.removeEventListener(e,n),t=!1)}}}var $m=Br("click"),Lm=Br("mousedown"),Dm=Br("touchstart"),Fm=Br("mousemove"),Bm=Br("touchmove"),Vm=Br("mouseup"),Wm=Br("touchend"),jm=Br("wheel");var xo=0,Ze=new Map,JC=(e=()=>{})=>{let t=we();return Ze.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ze.has(t)){let r=Ze.get(t);if(!r)return;let o=r.data.size;if(Ze.delete(t),!o)return;xo=xo-o}}}},YC=({id:e,callBackObject:t,frame:r})=>{if(!Ze.has(e))return;let o=Math.max(r,0),{currentFrame:n}=Ee.get(),s=Ze.get(e);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,t),xo++)},XC=e=>{Ze.has(e)&&Ze.delete(e)},KC=e=>{let t=Ze.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Ee.get();t.freeze={active:!0,atFrame:r}},QC=({id:e,update:t=!0})=>{let r=Ze.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ee.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},ZC=e=>{let t=Ze.get(e);if(!t)return;let r=t.data.size;xo=xo-r,t.data.clear()},eE=e=>Ze.get(e)??{},tE=e=>{for(let t of Ze.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),xo--)}},rE=({id:e,obj:t={}})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},oE=()=>xo,nE=e=>{for(let[t,r]of Ze){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ze.set(t,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-e}:s})}},Go={add:JC,get:eE,update:YC,remove:XC,clean:ZC,fire:tE,fireObject:rE,getCacheCounter:oE,updateFrameId:nE,freeze:KC,unFreeze:QC};var fl=!1,Mi=new Map;function zm(){if(Mi.size===0){globalThis.removeEventListener("visibilitychange",zm),fl=!1;return}let e={visibilityState:document.visibilityState};for(let t of Mi.values())t(e)}function sE(){fl||(fl=!0,globalThis.addEventListener("visibilitychange",zm,{passive:!1}))}var iE=e=>{let t=we();return Mi.set(t,e),typeof globalThis<"u"&&sE(),()=>Mi.delete(t)},ki=iE;var us=[],aE=(e=()=>{},t=100)=>{us.push({cb:e,priority:t})},cE=({time:e,fps:t})=>{us.length!==0&&(us.sort((r,o)=>r.priority-o.priority),us.forEach(({cb:r})=>r({time:e,fps:t})),us.length=0)},xt={add:aE,fire:cE};var gl=[],lE=e=>{gl.push(e)},uE=()=>{let e=[...gl];return gl.length=0,e},qo={add:lE,get:uE};var Vr=new Map,pE=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},mE=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},hE=(e,t)=>{let o=Math.max(t,0)+Ee.getProp("currentFrame"),n=Vr.get(o)??[];Vr.set(o,[...n,e]),Ee.emit("requestFrame")},dE=()=>Vr.size,Jo={add:hE,fire:mE,updateKeys:pE,getAmountOfFrameToFire:dE};var bl="animationStop",Hm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===bl&&e.preventDefault()})};var Um=!1,Ri=({force:e=!1,duration:t=30}={})=>{if(Um&&!e){let{instantFps:r}=Ee.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,v=Math.max(d,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){Ee.quickSetProp("instantFps",y),Um=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ri();var _l=1e7,Ym=2e3,Sl=!1,Co=[],et=Lt(),Gm=0,vl=Lt(),yl=0,xl=0,Tl=0,Yo=!1,Ct=60,$i=Ct,Ni=0,Pi=0,fr=0,Ai=!1,Oi=!1,fE=()=>Ct<$i/5*3,gE=()=>Ct<$i/5*4,bE=()=>{!fE()||Ai||(Ai=!0,setTimeout(()=>{Ai=!1},4e3))},vE=()=>{!gE()||Oi||(Oi=!0,setTimeout(()=>{Oi=!1},4e3))},yE=()=>{fr=0,Ee.quickSetProp("currentFrame",fr),Jo.updateKeys(_l),Go.updateFrameId(_l)};ki(({visibilityState:e})=>{Yo=e!=="visible"});Hm();Ee.watch("requestFrame",()=>{Li()});var qm=()=>{fr>=_l&&yE(),xt.fire({time:et,fps:Ct});let e=qo.get();if(e.length>0)for(let t of e)Co.push(t);Sl=!1,Co.length>0||Jo.getAmountOfFrameToFire()>0||Go.getCacheCounter()>0||et<Ym?Li():(Yo=!0,fr=0,xl=et,Ee.quickSetProp("currentFrame",fr))},Jm=e=>{et=e,yl=et-vl,Yo&&(Gm+=yl),vl+=yl,et=Math.round(vl-Gm);let t=Math.round(1e3/Ct);Tl=Math.abs(et-xl-t);let r=Tl>100?Tl:0;et=et-r,xl=et,Yo?(Pi=et,Ni=0,Ct=Ee.getProp("instantFps")):Ni++,et>Pi+1e3&&!Yo&&(Ct=et>Ym?Math.round(Ni*1e3/(et-Pi)):Ee.getProp("instantFps"),Pi=et,Ni=0),Ct>$i&&($i=Ct),bE(),vE(),Co.forEach(n=>n({time:et,fps:Ct})),Jo.fire({currentFrame:fr,time:et,fps:Ct}),Go.fire(fr),fr++,Ee.quickSetProp("currentFrame",fr),Co.length=0,Yo=!1,Ee.getProp("deferredNextTick")?Dt(()=>qm()):qm()},Li=()=>{Sl||(typeof globalThis>"u"?setTimeout(()=>Jm(Lt()),Np):requestAnimationFrame(Jm),Sl=!0)},Ft={add:s=>{Co.push(s),Li()},addMultiple:(s=[])=>{Co=[...Co,...s],Li()},getFps:()=>Ct,mustMakeSomething:()=>Ai,shouldMakeSomething:()=>Oi};var ms=!1,ps=new Map,Di=()=>{},Cl=0,El=0;function TE(){if(ps.size===0){globalThis.removeEventListener("resize",Di),ms=!1;return}let e=globalThis.innerHeight,t=globalThis.innerWidth,r=e!==Cl,o=t!==El;Cl=e,El=t;let n={scrollY:globalThis.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ps.values())s(n)}function _E(){ms||(ms=!0,Cl=globalThis.window.innerHeight,El=globalThis.window.innerWidth,Di=_o(()=>TE()),globalThis.addEventListener("resize",Di,{passive:!1}))}var SE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return ps.set(t,e),_E(),()=>{ps.delete(t),ps.size===0&&ms&&(globalThis.removeEventListener("resize",Di),ms=!1)}},Xm=SE;var ds=!1,hs=new Map,xE="UP",Qm="DOWN",wl=0,Xo=0,Il=Qm,Km={scrollY:Xo,direction:Il};function Ml(){if(hs.size===0){globalThis.removeEventListener("scroll",Ml),ds=!1;return}wl=Xo,Xo=globalThis.scrollY,Il=Xo>wl?Qm:xE,Km={scrollY:Xo,direction:Il};for(let e of hs.values())e(Km)}function CE(){ds||(ds=!0,wl=globalThis.scrollY,Xo=globalThis.scrollY,window.addEventListener("scroll",Ml,{passive:!0}))}var EE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return hs.set(t,e),CE(),()=>{hs.delete(t),hs.size===0&&ds&&(globalThis.removeEventListener("scroll",Ml),ds=!1)}},gr=EE;var gs=!1,fs=new Map,kl=()=>{};function wE(e){if(fs.size===0){kl(),gs=!1;return}Ft.add(()=>{xt.add(()=>{for(let t of fs.values())t(e)},0)})}function IE(){gs||(gs=!0,kl=gr(wE))}var ME=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return fs.set(t,e),IE(),()=>{fs.delete(t),fs.size===0&&gs&&(kl(),gs=!1)}},Zm=ME;var vs=!1,bs=new Map,eh=()=>{},Rl=()=>{};function kE(e){if(bs.size===0){Rl(),vs=!1;return}Ft.add(()=>{xt.add(()=>{for(let t of bs.values())t(e)},0)})}function RE(){vs||(vs=!0,eh=yi(e=>kE(e),Ee.getProp("throttle")),Rl=gr(eh))}var NE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return bs.set(t,e),RE(),()=>{bs.delete(t),bs.size===0&&vs&&(Rl(),vs=!1)}},th=NE;function rh(e){let t=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),e==="START"&&t(),n=!1;return}Ft.add(()=>{xt.add(()=>{let p={scrollY:globalThis.scrollY};if(e==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=_o(()=>a()),r=gr(o),e==="START"&&(t=gr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=we();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var oh=rh("START"),nh=rh("END");function Ko(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=we();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&t&&(globalThis.removeEventListener(e,o),t=!1)}}}var sh=Ko("pointerover"),ih=Ko("pointerdown"),ah=Ko("pointermove"),ch=Ko("pointerup"),lh=Ko("pointerout"),uh=Ko("pointerleave");var He=Symbol("LinkedList.setNext"),Ue=Symbol("LinkedList.setPrev"),Fi="after",Nl="before",Qo=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[He](t){this.#n=t}get prev(){return this.#t}[Ue](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},Bi=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new Qo(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[He](r),r[Ue](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new Qo(t);return this.#l.add(r),this.#n?(r[He](this.#n),this.#n[Ue](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ue](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[He](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new Qo(r);return this.#l.add(o),o[Ue](t),o[He](t.next),t.next&&t.next[Ue](o),t[He](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new Qo(r);return this.#l.add(o),o[He](t),o[Ue](t.prev),t.prev&&t.prev[He](o),t[Ue](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Fi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Fi&&r.next===t?this:o===Nl&&r.prev===t?this:(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Fi&&(t[Ue](r),t[He](r.next),r.next&&r.next[Ue](t),r[He](t),r===this.#t&&(this.#t=t)),o==Nl&&(t[Ue](r.prev),t[He](r),r.prev&&r.prev[He](t),r[Ue](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Fi)}moveBefore(t,r){return this.move(t,r,Nl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[He](n),n&&n[Ue](o),s&&s[He](i),i&&i[Ue](s),t[Ue](s),t[He](i),r[Ue](o),r[He](n),s&&s[He](t),i&&i[Ue](t),o&&o[He](r),n&&n[Ue](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[He](o),t[Ue](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function PE(e){return Ii(e)}function AE(){return Ee.getProp("instantFps")}function OE(){return Ft.getFps()}function $E(){return Ft.mustMakeSomething()}function LE(){return Ft.shouldMakeSomething()}function DE(e=()=>{}){return Ft.add(e)}function FE(e=()=>{}){return xt.add(e)}function BE(e=()=>{}){return qo.add(e)}function VE(e=()=>{},t=0){return Jo.add(e,t)}async function WE({force:e=!1,duration:t=30}={}){return await Ri({force:e,duration:t})}function jE(e=()=>{}){return Om(e)}var zE=Go;function HE(e=()=>{}){return Xm(e)}function UE(e=()=>{}){return ki(e)}function GE(e=()=>{}){return $m(e)}function qE(e=()=>{}){return Lm(e)}function JE(e=()=>{}){return Dm(e)}function YE(e=()=>{}){return Fm(e)}function XE(e=()=>{}){return Bm(e)}function KE(e=()=>{}){return Vm(e)}function QE(e=()=>{}){return Wm(e)}function ZE(e=()=>{}){return jm(e)}function ew(e=()=>{}){return Zm(e)}function tw(e=()=>{}){return gr(e)}function rw(e=()=>{}){return th(e)}function ow(e=()=>{}){return oh(e)}function nw(e=()=>{}){return nh(e)}function sw(e=()=>{}){return sh(e)}function iw(e=()=>{}){return ih(e)}function aw(e=()=>{}){return ah(e)}function cw(e=()=>{}){return ch(e)}function lw(e=()=>{}){return lh(e)}function uw(e=()=>{}){return uh(e)}var pw=Ee;function mw(){return new Bi}var m={};To(m,{afterRouteChange:()=>fh,beforeRouteChange:()=>dh,componentMap:()=>j,createComponent:()=>Jd,eventDelegationMap:()=>yn,getActiveParams:()=>vh,getActiveRoute:()=>bh,getChildrenIdByName:()=>Vi,getComponentNameById:()=>Ih,getDebugMode:()=>qd,getIdByInstanceName:()=>Jt,getNumberOfActiveInvalidate:()=>rb,getNumberOfActiveRepeater:()=>ob,getParentIdById:()=>ys,getPropsFromParent:()=>xa,getRoot:()=>ga,getStateById:()=>Yt,getStateByName:()=>Jh,getTree:()=>Nh,inizializeApp:()=>tb,loadUrl:()=>eb,mainStore:()=>fe,onRouteLoading:()=>gh,removeAndDestroyById:()=>st,setStateById:()=>hn,setStateByName:()=>zd,staticProps:()=>Ca,tempDelegateEventMap:()=>ws,tick:()=>_r,updateStateByName:()=>Ud,useComponent:()=>na,useMethodArrayByName:()=>$h,useMethodByName:()=>Oh,watchById:()=>Et});var Zo="activeRoute",en="activeParams",Eo="beforeRouteChange",tn="afterRouteChange",qt="routeIsLoading",ut="parserAsync",Wr="default",ph="repeater",mh="invalidate",hh="render_component";var fe=u.createStore({[Zo]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[en]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[tn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[qt]:()=>({value:!1,type:Boolean}),[ut]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),rn=()=>{fe.set(ut,{element:document.createElement("div"),persistent:!1,source:Wr},{emit:!1})};var dh=e=>fe.watch(Eo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),fh=e=>fe.watch(tn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),gh=e=>fe.watch(qt,t=>{e(t)}),bh=()=>{let{activeRoute:e}=fe.get();return e},vh=()=>{let{activeParams:e}=fe.get();return e};var j=new Map;var Vi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var yh="",Th,_h=({contentId:e=""})=>{yh=e};var Sh=()=>{Th=document?.querySelector(yh)},Wi=()=>Th;var jr=new Map,xh=({instanceName:e,id:t})=>{let r=jr.get(e)??[];jr.set(e,[...r,t])},Ch=({instanceName:e,id:t})=>{let r=jr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&jr.delete(e),o.length>0&&jr.set(e,o)},Pl=({instanceName:e})=>jr.get(e)??[];var Eh=new WeakMap,wh=({element:e,id:t})=>{Eh.set(e,t)},on=({element:e})=>Eh.get(e);var Ih=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Mh=e=>{if(!e)return"name-not-found";let t=on({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},Jt=(e="")=>e?Pl({instanceName:e})?.[0]:void 0,kh=(e="")=>e?Pl({instanceName:e})??[]:[];var ji=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Wi()?.contains(r):!1};var Rh=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Rh({chunk:l})}]},[]),Nh=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Rh({chunk:e})};var Ph=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Ah=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Oh=e=>{let t=Jt(e);if(!t||t==="")return;let r=Ah({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},$h=e=>kh(e).flatMap(r=>{let o=Ah({id:r});return Object.keys(o).length===0?[]:[o]});var Lh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r];return o?o.push(t):e[r]=[t],e},Dh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return{...e,[r]:o.filter(n=>n!==t)}},Fh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},zi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var ys=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},Bh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Lh({currentChild:s,id:e,componentName:o})})},Hi=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=on({element:t}),r||(t=t.parentNode);return r??""},Al=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Al({moduleScopeId:o,targetComponentId:t})};var yt=new Map,Ts=new Map;var Vh=({componentId:e})=>{if(e)for(let[t,r]of yt){let{componentId:o}=r;o===e&&yt.delete(t)}};var tt=new Map;var Te=new Map;var Wh=({id:e})=>{if(tt.has(e)){let t=tt.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{Te.has(r)&&Te.delete(r)}),tt.delete(e)}};var rt=new Map;var J=new Map;var jh=({id:e})=>{if(rt.has(e)){let t=rt.get(e);if(!t)return;t.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),rt.delete(e)}};var zh=({id:e,parentId:t,componentName:r})=>{if(!e||!t)return;let o=j.get(t);o?.child&&j.set(t,{...o,child:Dh({currentChild:o.child,id:e,componentName:r})})};var Hh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:[...o,e]})},Uh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},_s=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Gh=({repeatId:e})=>{let t=J.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var nn=new Set;var qh=e=>{nn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),zh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),Wh({id:e}),jh({id:e}),l&&l.length>0&&Uh({componentId:e,repeatId:l}),p&&p.length>0&&Ch({instanceName:p,id:e}),h||qh(e),Vh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var Yt=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var Jh=(e="")=>{let t=Jt(e);return t||console.warn(`component ${e}, not found`),Yt(t)};var sn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},zr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},wo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var Hr=new Map;var Yh=({repeatId:e,host:t})=>{let r=J.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(e,t)};var Xh="data-mobjs",Io="componentid",Ui="bindtextid",Gi="bindobjectid";var an="staticprops",qi="bindprops",Kh="name",Qh="name",Zh="slot",br="repeaterchild";var Ur="currentRepeaterValue",Gr="repeatPropBind",Ji="bindevents",Xt="weakbindevents",cn="bindeffect",ed="parentid";var Kt="bindrefid",vr="bindrefname",Yi="invalidateid",Xi="mobjsrepeat";var Qt={current:{},index:-1},td="QUEQUE_BINDPROPS",Ol="QUEQUE_REPEATER",$l="QUEQUE_INVALIDATE";var ln=new Set,rd=!1,od=e=>{ln.add(e)},nd=e=>{ln.delete(e)},Ll=e=>{let t;for(let r of ln)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}if(t)return ln.delete(t),t};var sd=({element:e})=>[...ln].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],id=()=>ln.size;var it=e=>{rd=e},Bt=()=>rd;var ad=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Bt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Xi)??"";Yh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Map;var cd=({invalidateId:e,host:t})=>{let r=Te.get(e);if(!r)return;let o=t.parentNode;Te.set(e,{...r,element:o}),qr.set(e,t)};var ld=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Yi)??"";cd({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Set,ud=e=>{Jr.add(e)},pd=()=>{Jr.clear()},md=({element:e})=>[...Jr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Jr.delete(t),r}),hd=({name:e,element:t})=>[...Jr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Jr.delete(r),o}),dd=()=>[...Jr],Ki=()=>Jr.size;var fd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Qh))}connectedCallback(){let e=this.shadowRoot?.host;e&&ud(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Dl=new Set,gd=e=>{Dl.add(e)},Qi=()=>[...Dl],Zi=e=>Dl.delete(e);var bd=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;if(Bt()){gd(l);return}if(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot)return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Bt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#x]=[Kh,an,qi,"key",Ji,Ur,Zh,ed,br,Xt,Gr,Kt,vr].map(h=>p.getAttribute(h)??"")),od(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;nd(l),Zi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Et=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Xr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Mo=new Map,Td=()=>Mo.size===0,vd=1e3,_d=e=>{if(Mo.size>=vd)return console.warn(`InvalidateTick: maximum queue size reached (${vd}). Likely an infinite watch loop. Queue force-cleared. `),Mo.clear(),()=>{};let t=u.getUnivoqueId();return Mo.set(t,e),()=>Mo.delete(t)},yd=()=>Mo.size===0,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&Mo.forEach(r=>{console.log(r)}),yd()&&t){t();return}return new Promise(r=>{if(yd()){r();return}wt({debug:e,previousResolve:t??r})})};var ko=new Map,Cd=()=>ko.size===0,Sd=1e3,Ed=e=>{if(ko.size>=Sd)return console.warn(`RepeaterTick: maximum queue size reached (${Sd}). Likely an infinite watch loop. Queue force-cleared. `),ko.clear(),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},xd=()=>ko.size===0,It=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&ko.forEach(r=>{console.log(r)}),xd()&&t){t();return}return new Promise(r=>{if(xd()){r();return}It({debug:e,previousResolve:t??r})})};var pn=({id:e})=>{let t=tt.get(e);return t?t.flatMap(({invalidateId:r})=>Te.get(r)?.observed??[]):[]};var mn=({id:e})=>{let t=rt.get(e);return t?t.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var ea=new Map,wd=(e,t)=>{ea.set(e,t)},ta=new Map,Id=({host:e,componentId:t,bindTextId:r})=>{ta.set(e,{componentId:t,bindTextId:r})},Md=e=>e.match(/(?<=\[).+?(?=])/g),kd=e=>e.split("[")?.[0],hw=({previous:e,current:t})=>{let r=Md(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[kd(t)]):e?.[t]},Rd=(e,t,...r)=>{let o=Yt(e),n=r.map(s=>s.split(".").reduce((a,c)=>hw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Nd=()=>{[...ta].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){ea.delete(t);return}let o=ea.get(t);o&&(ea.delete(t),dw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),ta.clear()},Pd=()=>ta.size,dw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=mn({id:e}),a=pn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=Md(f),y=d&&d?.length>0?kd(f):f;if(y)return Et(e,y,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Ad=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Ui)??"";Id({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ra=new Map,Od=(e,t)=>{ra.set(e,t)},Fl=new Map,$d=({host:e,componentId:t,bindObjectId:r})=>{Fl.set(e,{componentId:t,bindObjectId:r})},Ld=e=>e.map(t=>"observe"in t?Pe.extractkeyFromProp(t.observe):(Pe.initializeCurrentDependencies(),"value"in t?t?.value():t(),Pe.getFirstCurrentDependencies())),Dd=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Fd=()=>{[...Fl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){ra.delete(t);return}let o=ra.get(t);o&&(ra.delete(t),fw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Fl.clear()},fw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=mn({id:e}),a=pn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Et(e,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Bd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Gi)??"";$d({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var oa={},Ro=()=>oa,Vd=new Set,Wd=()=>{oa=Object.fromEntries([...Vd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(oa).length}`),bd(oa),fd(),ld(),ad(),Ad(),Bd()},na=e=>{!e||e?.length===0||e.forEach(t=>{Vd.add(t)})};var sa=({componentName:e,propName:t})=>(Ro()?.[e]?.componentParams?.exportState??[]).includes(t),jd=({componentName:e})=>Ro()?.[e]?.componentParams?.exportState??[];var hn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!sa({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var zd=(e="")=>{let t=Jt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>hn(t,r,o,{emit:n})};var Hd=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!sa({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Ud=(e="")=>{let t=Jt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Hd(t,r,o,{emit:n,clone:s})};var Bl={scoped:!1,maxParseIteration:5e3,debug:!1},Gd=e=>{Bl={...Bl,...e}},Mt=()=>Bl,qd=()=>{let{debug:e}=Mt();return e},Jd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(na(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Yd=[],Xd="",Kd="",Qd=e=>{Yd=[...e]},dn=({hash:e=""})=>Yd.find(({hash:t})=>e===t),Zd=({hash:e=""})=>{Xd=e},ia=()=>Xd,ef=({hash:e=""})=>{Kd=e},tf=()=>Kd;var rf=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),wh({element:t,id:e}))},aa=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,of=({element:e})=>e?on({element:e}):"",Vl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:_s({repeatId:t}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${e}`?[{element:s,id:o}]:[]});function*yr(e){if(e){yield e;for(let t of e.children)yield*yr(t)}}function gw(e){let t=[];for(let r of yr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var nf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...gw(o)];return t};function bw(e){let t=[];for(let r of yr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var sf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...bw(o)];return t};function vw(e,t){for(let r of yr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var af=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=vw(o,t);if(n)return n}return null};function yw(e){for(let t of yr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var cf=e=>{let t=e||document.body;for(let r of t.children){let o=yw(r);if(o)return o}return null};var Ss=new Map,fn=e=>{let t=u.getUnivoqueId();return Ss.set(t,e),t},lf=(e="")=>{if(!e)return Qt;let t=Ss.get(e);return Ss.delete(e),t??Qt};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var ca=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(br)){Zi(i);return}i.setAttribute(Ur,fn({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Gr,`${o}`),i.setAttribute(br,`${n}`)})},Kr=({stringDOM:e,parent:t,position:r})=>{it(!0);let o=document.createRange().createContextualFragment(e);it(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},xs=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;it(!0),e.forEach(n=>{n&&o.append(n)}),it(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var _w=({element:e,content:t})=>{let{debug:r}=Mt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Sw=({element:e})=>{dd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},xw=({element:e})=>{if(!!1&&Ki()===0)return;let t=nf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=hd({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Cw=({element:e,content:t})=>{let r=_w({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=md({element:r});a&&(xs({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||xs({parent:r,elements:[...e.childNodes],position:"afterbegin"}),xw({element:r}),Sw({element:r}),n&&n.length>0&&r.setAttribute(Xt,n),s&&s.length>0&&r.setAttribute(Kt,s),i&&i.length>0&&r.setAttribute(vr,i);let{debug:c}=Mt();c&&r.setAttribute(Xh,o??"")}return e.remove(),r},uf=({element:e,content:t})=>({newElement:Cw({element:e,content:t})});var Wl=0,pf=()=>{Wl+=1},jl=()=>Wl,mf=()=>{Wl=0};var hf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var Cs=new Map,df=({id:e,cb:t=()=>{}})=>{Cs.set(e,t)},zl=async({id:e,element:t})=>{let o=await Cs.get(e)?.({element:t});hf({cb:o,id:e}),Cs.delete(e)};var Hl=({id:e})=>{if(Hr.has(e)){let t=Hr.get(e);t?.removeCustomComponent(),t?.remove(),Hr.delete(e)}},la=({id:e})=>J.has(e)?(Hl({id:e}),J.get(e)?.element):void 0;var ua=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},ff=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:ff({rootNode:e,currentNode:t.parentElement})},Ew=({rootNode:e,node:t})=>{if(e)return ff({rootNode:e,currentNode:t.parentElement})},Tr=({id:e=""})=>{if(!e||e==="")return Qt;let r=j.get(e)?.currentRepeaterState;return r||Qt};var gf=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=la({id:t}),s=Ew({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},Es=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var gn=new Map,bf=1e5,bn=e=>{if(gn.size>=bf)return console.warn(`Tick: maximum queue size reached (${bf}). Likely an infinite watch loop. Queue force-cleared. `),gn.clear(),()=>{};let t=u.getUnivoqueId();return gn.set(t,e),()=>gn.delete(t)},vf=()=>gn.size===0,_r=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&gn.forEach(r=>{console.log(r)}),vf()&&t){t();return}return new Promise(r=>{if(vf()){r();return}_r({debug:e,previousResolve:t??r})})};var Ul=!0,pa=()=>{Ul=!0},ma=()=>{Ul=!1},ha=()=>Ul;var vn=new Map,yf=(e=[])=>{let t=Re(Object,e)?[e]:e,r=u.getUnivoqueId();return vn.set(r,t),r},Tf=({element:e,componentId:t,bindEventsId:r})=>{let o=vn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ha())return;ma(),await _r(),pa();let c=Tr({id:t});i(a,c?.current,c?.index)})}),vn.delete(r))},_f=()=>{vn.clear()};var da=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},Sf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var xf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Pe.extractkeyFromProp(s)):(Pe.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Pe.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},fa=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Yt(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Tr({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{hn(e,h,f,{emit:n})})},Cf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=yt.get(e);o&&(yt.set(e,{...o,componentId:r}),Ts.set(r,e),Gl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Gl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=Ts.get(e);if(!o)return;r&&Ts.delete(e);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Cd()&&(await It(),fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Td()&&(await wt(),fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Et(a,h,async()=>{if(await It(),await wt(),l)return;let f=bn({state:h,componentId:e,moduleId:"",type:td});l=!0,u.useNextLoop(()=>{fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(da({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===e&&yt.delete(h)}},Ef=()=>{yt.clear(),Ts.clear()};var Zt=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else Zt({id:c,container:t})})};var ql=new Map,ww=e=>(u.checkType(Array,e)?e:[e]).map(r=>Pe.extractkeyFromProp(r)),Iw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Pe.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Pe.getCurrentDependencies()),kf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?ww(i):Iw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return ql.set(s,n),s},Rf=e=>{[...e.querySelectorAll(`[${cn}]`)].forEach(r=>{let o=r.getAttribute(cn);if(!o)return;let n=ql.get(o);n&&(r.removeAttribute(cn),Mw({data:n,element:r}),ql.delete(o))})},wf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},If=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Mf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Mw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=mn({id:o}),f=pn({id:o});return[...new Set([...i,...h,...f])].map(v=>(a&&u.useFrame(()=>{wf({ref:r,data:a})}),c&&u.useFrame(()=>{If({ref:r,data:c})}),l&&u.useFrame(()=>{Mf({ref:r,data:l})}),Et(o,v,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&wf({ref:r,data:a}),c&&r.deref()&&If({ref:r,data:c}),l&&r.deref()&&Mf({ref:r,data:l}),p=!1})}))})))})};var Nf=({element:e})=>{let t=e.querySelectorAll(`[${Kt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Kt),i=n.getAttribute(vr);if(n.removeAttribute(Kt),n.removeAttribute(vr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},kw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Rw=({refs:e,refName:t,element:r})=>({...e,[t]:kw([...e[t],r])}),Pf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Rw({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Jl=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Af=({id:e})=>{let t=Jl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Of=document.createElement("div"),$f=({element:e})=>{Of=e},ga=()=>Of;var Lf=":FORCE",ws=new Map,yn=new WeakMap,Yl=[],Df=[],Ff=(e=[])=>{let t=Re(Object,e)?[e]:e,r=u.getUnivoqueId();return ws.set(r,t),r},Nw=e=>{let t=e?.parentNode;for(;t;){if(yn.has(t))return{target:t,data:yn.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Pw=e=>{let t=yn.get(e);return t?{target:e,data:t}:Nw(e)};async function Aw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=Pw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!ha()&&!a||(ma(),await _r(),pa(),!document.contains(o)))return;let c=of({element:o}),l=c?Tr({id:c}):Qt;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var Bf=async e=>{await It(),await wt(),[...e.parentNode?.querySelectorAll(`[${Xt}]`)??[]].forEach(n=>{let s=n.getAttribute(Xt)??"";n.removeAttribute(Xt);let i=ws.get(s);ws.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Lf),d=p.toUpperCase().replaceAll(Lf,"").toLowerCase();return Yl.includes(d)||Yl.push(d),{event:d,callback:h,force:f}}));yn.set(n,a)});let o=ga();Yl.forEach(n=>{Df.includes(n)||(Df.push(n),o.addEventListener(n,Aw.bind(null,n)))})};var Tn="repeater",ba="invalidate",Qr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===Tn?J.entries():Te.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Al({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===Tn?[d]:d})}return i};var Vf=({id:e,repeatId:t})=>{if(!rt.has(e))return;let r=rt.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);J.has(t)&&J.delete(t),rt.set(e,o)};var Zr=({id:e,repeatParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Tn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Vf({id:e,repeatId:n})})};var va=({repeatParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Tn}).forEach(({initializeModule:o})=>{o()})};var Wf=({invalidateId:e,unsubscribe:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,unsubscribe:t})};var jf=({id:e,invalidateId:t})=>{if(!tt.has(e))return;let r=tt.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);Te.has(t)&&Te.delete(t),tt.set(e,o)};var eo=({id:e,invalidateParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:ba}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),jf({id:e,invalidateId:n})})};var Xl=({id:e})=>{if(!Te.has(e))return;if(qr.has(e)){let r=qr.get(e);r?.removeCustomComponent(),r?.remove(),qr.delete(e)}return Te.get(e)?.element};var ya=({invalidateParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:ba}).forEach(({initializeModule:o})=>{o()})};var zf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=Hi({element:Xl({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;sn({id:n,prop:h});let d=Xl({id:s}),v=bn({state:h,componentId:n,moduleId:s,type:$l}),y=_d({state:h,componentId:n,invalidateId:s,type:$l});c=!0,u.useNextLoop(async()=>{if(!d){zr({id:n,prop:h});return}await t(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),Zt({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(ut,{element:d,persistent:i,source:mh},{emit:!1}),await fe.emitAsync(ut),rn(),c=!1,v(),y(),ya({invalidateParent:d,id:n}),va({repeatParent:d,id:n}),zr({id:n,prop:h}),r()})}));Wf({invalidateId:s,unsubscribe:p})};var Hf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Pe.extractkeyFromProp(r));var Uf=({invalidateId:e,initializeModule:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Gf=({invalidateId:e})=>{let t=Te.get(e);t&&Te.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var qf=({invalidateId:e,scopeId:t,observe:r})=>{Te.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Jf=({repeatId:e,unsubscribe:t})=>{let r=J.get(e);r&&J.set(e,{...r,unsubscribe:t})};var _n=new Set,Yf=({id:e,state:t,container:r})=>{_n.add({id:e,state:t,container:r})},Xf=({id:e,state:t,container:r})=>{r&&_n.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&_n.delete(o)})},Kf=({id:e="",state:t="",container:r})=>[..._n].some(n=>e===n.id&&t===n.state&&r===n.container);var Zf=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.filter(n=>!o.has(n?.[r]))},eg=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},Qf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),tg=({current:e,previous:t,key:r})=>Qf({arr:e,key:r})&&Qf({arr:t,key:r}),Ta=({data:e=[],key:t=""})=>{let r=new Set;return e.filter(o=>{let n=o?.[t];return r.has(n)?!1:(r.add(n),!0)})},_a=({children:e,previousChildren:t=[],hasKey:r})=>{let o=new Set(t),n=t.length>0,s={};for(let i of e){let{index:a}=Tr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},rg=({children:e,key:t,data:r})=>{if(!e?.length||!r?.length)return[];let o=new Map(e.map(n=>{let{current:s}=Tr({id:n[0]});return[s[t],n]}));return r.map(n=>o.get(n[t])).filter(n=>n!==void 0)};var Sn=new Map,Sa=(e={})=>{let t=u.getUnivoqueId();return Sn.set(t,e),t},xa=(e="")=>{let t=Sn.get(e);return Sn.delete(e),t??{}};var og=()=>{Sn.clear()};var Ca=(e={})=>`${an}="${Sa(e)}"`,Ea=(e,t,r)=>Math.min(Math.max(e,t),r);var Kl=({repeatId:e})=>{let t=J.get(e);return t?t.currentData:[]};var Ow="index",No=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Kl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Pe.setCurrentDependencies(e);let f=Kl({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Ow){if(t){let v=f?.findIndex(y=>y[r]===o);return Ea(v,0,d)}return Ea(n,0,d)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[Ea(n,0,d)],c??l)},set(){return!1}})};var ng=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=No({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),v=Bt();it(!0);let y=i.createContextualFragment(d);return it(v),ca({components:Qi(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},$w=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Ur}="${fn({current:t,index:e})}"
    ${Gr}="${r}" ${br}="${o}"`,sg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=No({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>$w({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),ig=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Bt();it(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));return it(c),ca({components:Qi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Lw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Gr}="${o}"
    ${Ur}="${fn({current:r,index:t})}"
    ${br}="${n}"`,ag=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Lw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},cg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=No({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Bt();it(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));return it(h),ca({components:Qi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},lg=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Ur}="${fn({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Gr}="${r}"
                            ${br}="${o}"`,p=No({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var wa=({repeatId:e,id:t})=>{let r=J.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Yt(t)[n];J.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Is=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var xn=({repeatId:e,currentData:t})=>{let r=J.get(e);r&&J.set(e,{...r,currentData:t})};var Dw=({element:e,container:t})=>{let r=Mh(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},ug=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=Ta({data:t,key:n});xn({repeatId:a,currentData:l});let p=Zf(r,l,n),h=p.map(T=>Vl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let w=Es({id:_}),x=w??S;eo({id:s,invalidateParent:x}),Zr({id:s,repeatParent:x}),T.forEach(({id:E})=>{st({id:E})}),w&&w.remove()}),f||Is({repeatId:a}).filter(_=>p.map(w=>w?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:w}=_;eo({id:s,invalidateParent:w}),Zr({id:s,repeatParent:w}),Zt({id:s,container:w})});let d=eg(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let w=Vl({keyValue:T,repeatId:a}),x=w[0]?.element?Es({id:w[0]?.id??""}):Is({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:w,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:w,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&y.append(x);let $=w?.[0]?.element;!x&&$&&(y.append($),A&&Dw({element:w[0]?.element,container:o}));return}let E=l?.[_],I=c?ag({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):ig({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),P=Bt();if(it(!0),c){let A=v.createContextualFragment(I);y.append(A)}!c&&I&&y.append(I),it(P)}),o.append(y),l};var Fw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},pg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{xn({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?sg({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):ng({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||xs({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=_a({children:c,hasKey:!1});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let w=aa({id:_}),x=Es({id:_}),E=x??w;eo({id:i,invalidateParent:E}),Zr({id:i,repeatParent:E}),st({id:_}),x&&x.remove()})});let{debug:v}=Mt();if(v&&Fw(o),f.length>0)return t;let y=Is({repeatId:s});if(!y)return t;y.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;eo({id:i,invalidateParent:_}),Zr({id:i,repeatParent:_}),Zt({id:i,container:_}),_.remove()})}return t};var mg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,render:a,repeatId:c,useSync:l,currentChildren:p=[]})=>{let d=(tg({current:o,previous:n,key:s})?ug:pg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:a,repeatId:c,useSync:l,currentChildren:p});return fe.set(ut,{element:r,persistent:t,source:ph},{emit:!1}),await fe.emitAsync(ut),rn(),d};var hg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=aa({id:c});return Hl({id:l}),i(),o(e,async(v,y)=>{if(!u.checkType(Array,v))return;let T=la({id:l}),S=bn({state:e,componentId:c,moduleId:l,type:Ol}),_=Ed({state:e,componentId:c,repeatId:l,type:Ol});if(sn({id:c,prop:e}),Kf({id:c,state:e,container:T})){zr({id:c,prop:e}),t(e,y,{emit:!1}),S(),_();return}let x=_s({repeatId:l});f&&await s(),n&&(x.forEach(R=>{st({id:R})}),T&&(T.textContent="")),T&&Yf({id:c,state:e,container:T});let E=await mg({state:e,persistent:r,repeaterParentElement:T??document.createElement("div"),current:v,previous:n?[]:y,key:a,id:c,render:p,repeatId:l,useSync:h,currentChildren:n?[]:x}),I=_s({repeatId:l}),P=!!a,A=_a({children:I,previousChildren:x,hasKey:P}),$=P?[...rg({children:A,key:a,data:E})]:A,N=P?new Map(v.map((R,O)=>[`${R?.[a]}`,O])):new Map;$.forEach((R,O)=>{let D=E?.[O];if(!D)return;let k=P?N.get(`${D?.[a]}`)??-1:O;R.forEach(L=>{ua({id:L,value:{current:D,index:k}})})}),u.useNextLoop(async()=>{f&&i(),Xf({id:c,state:e,container:T}),zr({id:c,prop:e}),S(),_(),ya({invalidateParent:T,id:c}),va({repeatParent:T,id:c}),$.length===0&&wa({repeatId:l,id:c})})})};var dg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=hg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});Jf({repeatId:e,unsubscribe:d})};var fg=({repeatId:e,initializeModule:t})=>{let r=J.get(e);r&&J.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var gg=({repeatId:e})=>{let t=J.get(e);t&&J.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var bg=({repeatId:e,initialDOMRender:t})=>{let r=J.get(e);r&&J.set(e,{...r,initialRenderWithoutSync:t})};var vg=({repeatId:e,scopeId:t,observe:r})=>{J.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var yg=({repeatId:e,scopeId:t})=>{let r=rt.get(t)??[];rt.set(t,[...r,{repeatId:e}])};var Tg=({invalidateId:e,scopeId:t})=>{let r=tt.get(t)??[];tt.set(t,[...r,{invalidateId:e}])};var _g=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(Zt({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,v),fe.set(ut,{element:d,persistent:ji(c),source:hh},{emit:!1}),await fe.emitAsync(ut),rn()},getChildren:d=>Vi({id:c,componentName:d}),freezeProp:d=>{let v=Pe.extractkeyFromProp(d);return sn({id:c,prop:v.toString()})},unFreezeProp:d=>{let v=Pe.extractkeyFromProp(d);return zr({id:c,prop:v.toString()})},unBind:()=>Sf({id:c}),bindProps:d=>{let v="props"in d?d:{props:d};return`${qi}="${xf({...v,parentId:c})}" `},staticProps:d=>` ${an}="${Sa(d)}" `,remove:()=>{st({id:c})},removeDOM:d=>{Zt({id:c,container:d}),d.textContent=""},getParentId:()=>ys(c),watchParent:(d,v)=>{let y=Et(ys(c),d,v);y&&da({id:c,unWatchArray:[y]})},onMount:d=>df({id:c,cb:d}),bindEvents:d=>`${Ji}="${yf(d)}"`,delegateEvents:d=>`${Xt}="${Ff(d)}"`,bindEffect:d=>`${cn}="${kf({data:d,id:c})}"`,addMethod:(d,v)=>{Ph({id:c,name:d,fn:v})},setRef:d=>`${Kt}="${c}" ${vr}="${d}"`,getRef:()=>Af({id:c}),getRefs:()=>Jl({id:c}),bindText:(d,...v)=>{let y=u.getUnivoqueId(),T=()=>Rd(c,d,...v);return wd(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Io}="${c}" ${Ui}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...v)=>{let y=Ld(v),T=u.getUnivoqueId(),S=()=>Dd(d,...v);return Od(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Io}="${c}" ${Gi}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Hf(d),_=u.getUnivoqueId(),w=`${Yi}=${_}`,x=()=>v(),E=!1;return Tg({invalidateId:_,scopeId:c}),qf({invalidateId:_,scopeId:c,observe:S}),Uf({invalidateId:_,initializeModule:()=>{E||(zf({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:ji(c),id:c,invalidateId:_,renderFunction:x}),E=!0,Gf({invalidateId:_}))}}),`<mobjs-invalidate ${w} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:w=!1})=>{let x=Pe.extractkeyFromProp(d),E=u.getUnivoqueId(),I=S!=="";yg({repeatId:E,scopeId:c}),vg({repeatId:E,scopeId:c,observe:x});let P=e()?.[x],A=I?Ta({data:P,key:S}):P;xn({repeatId:E,currentData:A});let $=w?lg({currentUnique:A,key:S,observe:x,repeatId:E,hasKey:I,render:_}):"",N=w?[]:cg({currentUnique:A,render:_,observe:x,repeatId:E,key:S,hasKey:I}),R=!1;return bg({repeatId:E,initialDOMRender:N}),fg({repeatId:E,initializeModule:()=>{R||(dg({repeatId:E,persistent:ji(c),state:x,setState:t,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:w}),R=!0,gg({repeatId:E}),Gh({repeatId:E})||wa({repeatId:E,id:c}))}}),`<mobjs-repeat ${Xi}="${E}" style="display:none;"></mobjs-repeat>${$}`}});var Ql=({componentName:e,currentProps:t={}})=>{let o=Ro()?.[e]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(t).filter(([n])=>o.includes(n)))};var Sg=({element:e})=>{let t=e.getId(),r=e.getInstanceName(),o=Hi({element:e}),n=e.getStaticPropsId(),s=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getRepeatValue(),c=e.getComponentRepeatId(),l=e.getCurrentKey()??"",p=e.getComponentName(),h=n?.split(" ").join(""),f=xa(h),d={...e.dataset},v=e.getRepeaterPropBind(),y=lf(a);return{element:e,props:{...Ql({componentName:p,currentProps:d}),...Ql({componentName:p,currentProps:f})},id:t,componentName:p,instanceName:r,key:l,dynamicPropsId:s,repeatPropBind:v,bindEventsId:i,currentRepeatValue:y,parentId:o,componentRepeatId:c}};var xg=e=>{nn.add(e)};var Cg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Qt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:w=""})=>{let x=u.createStore(o);Fh({props:r,store:x}),n&&x.bindStore(n),y||xg(_),p&&p.length>0&&Hh({componentId:_,repeatId:p}),t&&t.length>0&&xh({instanceName:t,id:_});let E=jd({componentName:w}),I=new Set(E);return x.setProxiReadOnlyProp(E),j.set(_,{element:e,componentName:w,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(P="",A={},{emit:$=!0}={})=>{let N=wo({id:_,prop:P}),R=Pe.extractkeyFromProp(P),O=I.has(R);O&&zi({prop:R,componentName:w,action:"updateState"}),!(N||O)&&x.set(R,A,{emit:$??!0,usePropAsString:!0})},updateState:(P="",A=()=>({}),{emit:$=!0,clone:N=!1}={})=>{let R=wo({id:_,prop:P}),O=Pe.extractkeyFromProp(P),D=I.has(O);D&&zi({prop:O,componentName:w,action:"updateState"}),!(R||D)&&x.update(O,A,{emit:$??!0,clone:N??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(P="")=>x.emit(P),emitAsync:async(P="")=>await x.emitAsync(P),computed:(P="",A=()=>{},$=[])=>{let N=Pe.extractkeyFromProp(P);if(I.has(N)){zi({prop:N,componentName:w,action:"computed"});return}return x.computed(N,A,$,{usePropAsString:!0})},watch:(P="",A=()=>{},{wait:$=!1,immediate:N=!1}={})=>x.watch(P,A,{wait:$??!1,immediate:N??!1}),debug:()=>x.debug()}};var Eg=({id:e})=>(tt.get(e)??[]).map(({invalidateId:r})=>{let o=Te.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var wg=({id:e})=>(rt.get(e)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Ig=async({element:e,persistent:t=!1,source:r=Wr})=>{let{debug:o}=Mt();o&&console.log("parse source:",r);let n=Ro(),s=[],i=Ll(e);for(;i;){let c=i.getComponentName(),l=n?.[c]?.componentFunction,p=n?.[c]?.componentParams,{scoped:h,bindStore:f}=p,{props:d,id:v,componentName:y,instanceName:T,key:S,dynamicPropsId:_,currentRepeatValue:w,bindEventsId:x,parentId:E,componentRepeatId:I,repeatPropBind:P}=Sg({element:i}),A=p?.state??{},{getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,debug:M}=Cg({element:i,props:d,state:A,id:v,componentName:y,instanceName:T,key:S,repeatPropBind:P,persistent:t,parentId:E,componentRepeatId:I,bindStore:f});Bh({id:v}),I&&I?.length>0&&(ua({id:v,value:w}),gf({id:v,repeatId:I,element:i})),Cf({propsId:_,repeatPropBind:P,componentId:v});let F=_g({getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,id:v,key:S,bindEventsId:x,debug:M}),V=await l(F),B=i.classList,{newElement:z}=uf({content:V,element:i});if(pd(),B.length>0&&z?.classList.add(...B),!z)return;rf({id:v,newElement:z});let ee=Eg({id:v}),ae=wg({id:v});x&&Tf({element:z,componentId:v,bindEventsId:x});let q=h??Mt().scoped;q&&await zl({id:v,element:z}),z?.inizializeCustomComponent?.(F),s.push({onMount:async()=>{q||await zl({id:v,element:z})},initializeBindPropsWatcher:()=>{Gl({componentId:v,repeatPropBind:P,inizilizeWatcher:!0})},fireInvalidateFunction:ee.length>0?()=>{ee.forEach(({initializeModule:re})=>{re?.()})}:()=>{},fireRepeatFunction:ae.length>0?()=>{ae.forEach(({initializeModule:re})=>{re?.()})}:()=>{}}),i=Ll(e);let ne=jl()===Mt().maxParseIteration;if(pf(),ne){console.warn(`dom parse reached max parse limit: ${jl()}`);break}}let a=Nf({element:e});Object.keys(a).length>0&&Pf(a);for(let c of s.toReversed()){let{onMount:l,initializeBindPropsWatcher:p,fireInvalidateFunction:h,fireRepeatFunction:f}=c;await l(),f(),h(),p()}s.length=0,i=null,Bf(e),Rf(e),Nd(),Fd()};var Ms=async({element:e,persistent:t=!1,source:r=Wr})=>{await Ig({element:e,persistent:t,source:r}),mf()},Mg=()=>{fe.watch(ut,async({element:e,persistent:t=!1,source:r=Wr})=>{await Ms({element:e,persistent:t,source:r})})};var kg=()=>{og(),_f(),Ef()};var Rg,Ng,Pg=({fn:e})=>{e&&(Ng=e)},Ag=({fn:e})=>{e&&(Rg=e)},Og=()=>Ng,$g=()=>Rg;var Lg=!0,Dg=e=>{Lg=e},Fg=()=>Lg;var Bg=()=>{for(let e of nn)st({id:e})};var Vg=new Map,Wg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),jg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(qt,!0),await _r();let s=Wi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=Wg({route:e,params:o}),l=Wg({route:i.route,params:a}),p=window.scrollY;Vg.set(l,p);let h=Vg.get(c)??0;fe.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=fe.watch(Eo,()=>{f=!0});kg(),fe.set(Zo,{route:e,templateName:t}),fe.set(en,o);let v=dn({hash:e}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Og(),w=s.cloneNode(!0);_&&w&&!y&&(await _({oldNode:w,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(w,s)),s.replaceChildren(),Bg(),Kr({stringDOM:S,parent:s,position:"afterbegin"}),await Ms({element:s}),y||(s.style.visibility=""),f||fe.set(tn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Fg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=$g();x&&!y&&(await x({oldNode:w,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),w.remove()),w=null,d?.(),fe.set(qt,!1)};var zg=({route:e})=>e,Hg=e=>{zg=e},Ug=({route:e})=>{let t=zg({route:e});return{route:t,isRedirect:t!==e}};var Gg=({hash:e=""})=>{let t=ia(),r=tf();return e===""?t:dn({hash:e})?e:r},qg=({hash:e=""})=>dn({hash:e})?.templateName??"",Jg=({hash:e=""})=>dn({hash:e})?.restoreScroll??!0;var Yg="",Xg=!0,Sr="",Kg="",to,Zl,ks,eu=e=>e.replace("?","").replace("/",""),Qg=e=>e.replace("#","").replace("/","").replace(".",""),Bw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=eu(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Vw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&fe.getProp(qt)&&e.preventDefault()},{passive:!1});var Ia=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Yg.replace("#","");return}ks||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Ug({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=eu(i?.[1]??"");Kg=Sr,Sr=Qg(i?.[0]??"");let c=Bw(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Gg({hash:Sr}),h=qg({hash:Sr&&Sr.length>0?Sr:ia()}),f=Sr===Kg&&l.length===0&&!Xg;e&&!f&&(Yg=`#${Sr}${l}`,await jg({route:p,templateName:h,isBrowserNavigation:Jg({hash:Sr})&&!!ks,params:c,skipTransition:!!(ks??Zl)})),e||(fe.set(Zo,{route:p,templateName:h}),fe.set(en,c)),Zl=void 0,u.useNextLoop(()=>{Xg=!1})},Zg=()=>{Ia(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ks=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),Ia()})},eb=({url:e,params:t,skipTransition:r})=>{if(!e||fe.getProp(qt))return;Zl=r;let o=e.split("?"),n=Qg(o?.[0]??""),s=Vw(t),i=eu(o?.[1]??""),a=s??i;to=a.length>0?a:"",ks=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var tb=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Gd(h);let f=document.querySelector(e),d=await t();Hg(s),!(!r||!f)&&(_h({contentId:r}),$f({element:f}),Ag({fn:l}),Pg({fn:c}),Dg(p),Mg(),Wd(),Qd(o),Zd({hash:i}),ef({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),Sh(),Ia({shouldLoadRoute:!1}),await Ms({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Zg())};var rb=()=>Te.size;var ob=()=>J.size;var ue={};To(ue,{clamp:()=>nt,getDefault:()=>dI,mq:()=>bI,printDefault:()=>fI,setDefault:()=>hI,useVelocity:()=>gI});var Po={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},Ps="min",nb="max",ru="desktop",As="easeLinear",Rs="default",ou={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},nu=10,Ns=.06,su="#ff0000",iu="#14df3b",au=8,cu=10,lu=1e3,uu=!1,jw=!1,zw=!1,Hw=.01,Uw=.06,sb=e=>{let t=qe({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=qe({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=qe({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Gw(e?.mq??{}),s=qe({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:ru,type:String}),i=qe({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:Ps,type:String}),a=qe({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:nu,type:Number}),c=tu(e?.sequencer?.ease,"sequencer"),l=qe({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Rs,type:String}),p=qe({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ns,type:Number}),h=qe({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:su,type:String}),f=qe({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:iu,type:String}),d=qe({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:au,type:Number}),v=qe({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Rs,type:String}),y=qe({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ns,type:Number}),T=qe({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:cu,type:Number}),S=tu(e?.parallaxTween?.ease,"parallaxTween"),_=qe({prop:"tween.duration",value:e?.tween?.duration,defaultValue:lu,type:Number}),w=tu(e?.tween?.ease,"tween"),x=qe({prop:"tween.relative",value:e?.tween?.relative,defaultValue:uu,type:Boolean}),E=qe({prop:"spring.relative",value:e?.spring?.relative,defaultValue:jw,type:Boolean}),I=qe({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:zw,type:Boolean}),P=qe({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Hw,type:Number}),A=qe({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Uw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:w,relative:x},spring:{relative:E,config:e?.spring?.config?{...Po,...e.spring.config}:Po},lerp:{relative:I,precision:P,velocity:A}}},qe=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Gw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:ou},tu=(e,t)=>{let r=Object.keys(ge).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:As};var at=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=at(Object.assign({},s),i,r):e[n]=i}),e)};function ib(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:ou,defaultMq:{value:ru,type:Ps},sequencer:{duration:nu,ease:As},scrollTrigger:{springConfig:Rs,lerpConfig:Ns,markerColor:{startEnd:su,item:iu}},parallax:{defaultRange:au,springConfig:Rs,lerpConfig:Ns},parallaxTween:{duration:cu,ease:As},tween:{duration:lu,ease:As,relative:uu},spring:{relative:!1,config:Po},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let e=ib();return{set:n=>{e=sb(at(ib(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var qw=(e="desktop")=>window.innerWidth<he.get("mq")[e],Jw=(e="desktop")=>window.innerWidth>=he.get("mq")[e],Yw=(e="desktop")=>he.get("mq")[e],ve={max:qw,min:Jw,getBreackpoint:Yw};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},nt=(e,t,r)=>Math.min(Math.max(e,t),r),ab=(e,t,r)=>(1-r)*e+r*t,ro=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Os=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},cb=(e,t)=>e.map(r=>r[t]);var Ma=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),xr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Cn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Cr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},En=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var pu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var ka="radial",er="start";var wn="center",In="edges",Mn="random",lb="MERGE_FROM_UP",mu="MERGE_FROM_DOWN",Ao="equal",Oo="start";var $o="center",kn={type:Ao,each:0,waitComplete:!1,from:er,grid:{col:1,row:1,direction:"col"}},Xe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Er=e=>e.map(t=>`${t} | `).join(""),oo=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},kt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},wr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},ub=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},pb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},mb=()=>{console.warn("relative prop is not allowed inside a timeline")},hb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},db=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},fb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},gb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},bb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},vb=()=>{console.warn("setTween fail")},yb=e=>{console.warn(`label ${e} not founded`)},Tb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},_b=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},hu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Sb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},xb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Lo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ra=()=>{console.warn("stagger each must be a Number ")},Cb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Eb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},wb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Ib=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Mb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},kb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Rb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Nb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Pb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Ab=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Ob=()=>{console.warn("createStaggers error: items array can not be empty")},$b=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Lb=()=>{console.warn(`screateStaggers error: type should be: ${Ao} || ${er} || ${"end"} || ${$o}`)},Db=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Fb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},du=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Bb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Vb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Wb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},jb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},zb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Nn=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Hb=e=>{console.warn(`${e} value must be a string`)},Ub=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Gb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},qb=e=>{console.warn(`${e} not found`)},Jb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Yb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},Xb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Kb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Qb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Zb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Er(t)} or a Number between 0 and 100`)},ev=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Er(t)}`)},tv=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},rv=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Er(t)}`)},ov=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Er(t)} or a custom css propierites like margin|line-height|...`)},nv=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Er(t)}`)},sv=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Er(t)}`)},iv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},av=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Er(t)}`)},cv=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},lv=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},fu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Er(t)}`)},uv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},pv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},mv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},hv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},dv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},gu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Er(r)}, es: 45deg|100px|50vw etc..`)},fv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},gv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Vt={[ge.easeLinear]:(e,t,r,o)=>r*e/o+t,[ge.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[ge.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[ge.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[ge.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[ge.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[ge.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[ge.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[ge.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[ge.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[ge.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[ge.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[ge.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[ge.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[ge.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[ge.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[ge.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[ge.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[ge.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[ge.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[ge.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[ge.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[ge.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[ge.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[ge.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[ge.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[ge.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[ge.easeInBounce]:(e,t,r,o)=>r-Vt[ge.easeOutBounce](o-e,0,r,o)+t,[ge.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[ge.easeInOutBounce]:(e,t,r,o)=>e<o/2?Vt[ge.easeInBounce](e*2,0,r,o)*.5+t:Vt[ge.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var pt=e=>e in Vt?Vt[e]:(Lo(e),Vt[he.get("tween").ease]);var bv=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",bu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),vv=e=>/^\d+\.\d+$|^\d+$/.test(e),De=(e,t)=>{let r=new RegExp(`^${bv(t)}$`,"i");return(e.match(r)||[]).length},tr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},vu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),yu=(e,t)=>e.some(r=>{let o=new RegExp(`^${bv(r)}$`,"i");return(t.match(o)||[]).length});var yv=e=>e&&(De(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:De(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:De(e,b.PROP_ROTATE)?b.PROP_ROTATE:De(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:De(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:De(e,b.PROP_OPACITY)?b.PROP_OPACITY:De(e,b.PROP_SCALE)?b.PROP_SCALE:De(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:De(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:De(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),Tv=e=>{if(e){if(tr(e,b.PX))return b.PX;if(tr(e,b.VH))return b.VH;if(tr(e,b.VW))return b.VW}return""},Na=e=>De(e,b.POSITION_TOP)?b.POSITION_TOP:De(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:De(e,b.POSITION_LEFT)?b.POSITION_LEFT:De(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",_v=e=>tr(e,b.PX)?b.PX:tr(e,b.VH)?b.VH:tr(e,b.VW)?b.VW:tr(e,b.WPERCENT)?b.WPERCENT:tr(e,b.HPERCENT)?b.HPERCENT:tr(e,b.DEGREE)?b.DEGREE:b.PX;var Wt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Aa=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||ub(e),o||pb(t),r&&o},no=e=>{let t=u.checkType(Number,e);return!t&&e&&kb(e),t?e:he.get("sequencer").duration},Oa=e=>{let t=u.checkType(Number,e);return!t&&e&&Nb(e),t&&e?e:1},Sv=e=>{let t=e&&e in Vt;return!t&&e&&Lo(e),t?e:he.get("sequencer").ease},xv=e=>{let t=e&&e in Vt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("parallaxTween").ease)},Cv=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Pb(e),o||Ab(t),r&&o},Ev=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ra(),t},wv=e=>{if(!e)return;let r=[er,"end",wn,In,Mn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||Mb(e),s},_u=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Cb(e),t},Iv=e=>{if(!e)return;let r=[ka,"row","col"].includes(e);return r||wb(),r},Mv=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Eb(),t},kv=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Ob(),t},Rv=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],Nv=e=>{if(!e)return;let r=[Ao,Oo,"end",$o].includes(e);if(!r){Lb();return}return r};var so=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Fb(e,t),r?e:he.get(t).relative},$a=e=>{let t=e&&e in Vt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("tween").ease)},La=e=>{let t=e&&e in Vt;return!t&&e&&Lo(e),t?e:he.get("tween").ease},Su=e=>{let{config:t}=he.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&hu(e),!s&&r&&xb(e),s?t[e]:t.default},Pv=e=>{let{config:t}=he.get("spring"),r=e&&e in t;return!r&&e&&hu(e),r},xu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&Sb(),t?e:{}},Cu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Rb(e),o?r:he.get("tween").duration},Rt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&du(e,t),r&&e===!0},de=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&du(e,t),o?e:r},Da=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Bb(e,t),o?e:r},rr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Vb(e,t),o?e:r},mt=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Wb(e,t),o?e:r},Fa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&jb(),t?e:he.get("lerp").velocity},Ba=e=>{let t=u.checkType(Number,e);return!t&&e&&zb(),t?e:he.get("lerp").precision},Av=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Hb(t),r},Ls=e=>{let t=u.checkType(Number,e);return!t&&e&&Gb(),t?e:void 0},Ds=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Ub(),t},Ov=(e,t)=>{e===-1&&qb(t)},io=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&dv(r,e),o?e:t},$v=e=>{let t=u.checkType(Function,e);return!t&&e&&Jb(e),t?e:({resolve:r})=>{r()}},Lv=e=>{let t=u.checkType(Array,e);return!t&&e&&fb(e),t},Dv=e=>{let t=u.checkType(String,e);return!t&&e&&gb(e),t},Pn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},Eu=e=>u.checkType(Element,e)?e:document.querySelector(e),Fs=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Yb(e,t),o?e:b.DIRECTION_VERTICAL},wu=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Xb(t),i?e:null},Fv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Kb(),t?e:void 0},Bv=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&Qb(),t?e:{}},Vv=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Zb(e,t),r?e:b.ALIGN_CENTER},Wv=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&ev(e,t),r?e:!1},Iu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&tv(e,t),o?e:r},jv=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&rv(t,r),o?t:b.TYPE_PARALLAX},zv=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=vv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&cv(e),n?10-e:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&lv(e),o?e:"0px"}})(),Do=(e,t,r)=>{let o=he.get("defaultMq").value;if(!e)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&fu(e,s,t,r),i?e:o},Fo=(e,t,r)=>{let o=he.get("defaultMq").type;if(!e)return o;let n=[nb,Ps],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&fu(e,n,t,r),s?e:o},Hv=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&ov(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&mv(),(r||o)&&e!==b.PROP_TWEEN&&hv(),a&&uv();let c=a?b.PROP_VERTICAL:e,l=yv(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Uv=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||nv(e,t);let o=r?e:b.EASE_LERP;return r?e:o},Va=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&sv(e,r,t),o?e:b.EASE_LERP},Gv=(e,t)=>{let r=t===b.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!e)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&av(e,n),s?e:r},qv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&pv();let o=t===b.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?e:o},Jv=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=vu(r,e);return n||gu(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=vu([b.DEGREE],e);return n||gu(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=bu(e);return n||gv(e,t),n?e:"0"}let o=bu(e);return o||fv(t),o?e:"0"};var Wa=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Nt=e=>({type:Nv(e?.stagger?.type)?e.stagger.type:kn.type,each:Ev(e?.stagger?.each)?e.stagger.each:kn.each,from:wv(e?.stagger?.from)?e?.stagger?.from:Oo,grid:{col:_u(e?.stagger?.grid?.col)?e.stagger.grid.col:kn.grid.col,row:_u(e?.stagger?.grid?.row)?e.stagger.grid.row:kn.grid.row,direction:Iv(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Mv(e?.stagger?.waitComplete)?e.stagger.waitComplete:kn.waitComplete}),or=(e,t)=>e.length>t.length?e:t;var Bs=e=>e%2,Xw=e=>Math.floor(Math.random()*e),Kw=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},Qw=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Wa(s);if(n===Mn)return{index:e,frame:o[Xw(o.length)]};if(n===er)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===wn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:0}:Bs(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===In){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Bs(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Bs(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Re(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Yv=(e,t,r)=>{if(t.grid.direction==="row"){let o=Os(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...cb(o,a)],[])].flat()}else return e},Xv=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Yv(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=Yv(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Os(c,h),d=f[0];return d.forEach((y,T)=>{let{index:S,frame:_}=Qw(T,f[0].length,r,Kw(d,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var Zw=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),eI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)ja(o,r+f,l)&&c.push(o[r+f][l]),ja(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(ja(o,r-f,l)&&c.push(o[r-f][l]),ja(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),ja=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Mu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Os(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=Zw(s,o,n),a=eI(i,o,n,s),c=i.reduce((d,v,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?lb:mu)===mu?c.reduce((d,v,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return d.push(S),d}},[]):c.reduce((d,v,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return d.push(S),d}},[]).toReversed()).reduce((d,v)=>v.length===0?d:[...d,v],[])}};var tI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Mu(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Wa(r.each),v=h*d;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Mu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},rI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[er,"end",wn,In,Mn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Ib(),r.from=er),Xv({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Pt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===ka?tI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):rI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var An=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},On=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},nr=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),$n=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Ln=(e,t)=>Object.keys(e).map(r=>{if(!Wt(t[r])||!Wt(e[r]))return wr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Ir=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Dn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Fn=(e,t,r,o)=>(u.checkType(Number,e)||Ra(),e>0&&t&&(r.length>0||o.length>0));var za=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Fe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Bn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Vn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Wn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),ku=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Kv=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,v=a+d*1/s,y=_e(v),T=Math.abs(d)<=.1,S=t===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Tt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;constructor(t){this.#n=Nt(t??{}),this.#t=so(t?.relative,"spring"),this.#i=Su(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#x=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Xe,this.#k=Xe;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#h=!0,this.#o=Kv({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#o,"currentValue");if(this.#g||An({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#o,"toValue");On({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#_(l,p,o,n,s,i)})})}#I(t,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#P(){if(Fn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();co("spring",t);let r=or(this.#a,this.#p);if(this.#n.grid.col>r.length){kt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#y||(this.#u=t,this.#s=r,this.#m&&(this.#y=!0,await this.#P(),this.#y=!1),Dn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#I(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=Cn(this.#o)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#x=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=Ma(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&za((t,r)=>this.#I(t,r)))}setData(t){this.#o=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=at(this.#o,this.#e)}#O(t){let o=he.get("spring").config,n=Pv(t?.config)?o?.[t?.config??"default"]??Po.default:this.#v.configProps,s=xu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#v.reverse,relative:t?.relative??this.#v.relative,immediate:t?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=ao(t);return this.#w(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=$n(t);return this.#w(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!ro(t,r))return oo("spring goFromTo:",t,r),new Promise(s=>s);let n=Ln(t,r);return this.#w(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Ir(t);return this.#w(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Ir(t);this.#o=Wn(o,this.#o);let{reverse:n}=this.#O(r??{});Rt(n,"reverse")&&(this.#o=Cr(t,this.#o)),this.#o=En(this.#o,this.#t),this.#o=xr(this.#o)}#w(t,r,o={}){this.#o=Wn(t,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(Rt(n,"reverse")&&(this.#o=Cr(r,this.#o)),this.#o=En(this.#o,this.#t),Rt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=xr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#o,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#o,"fromValue")}getTo(){return Fe(this.#o,"toValue")}getFromNativeType(){return Vn(this.#o)}getToNativeType(){return Bn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(t={}){let r=xu(t);this.#i={...this.#i,...r},this.#v=at(this.#v,{configProps:r})}updateConfig(t){this.#i=Su(t),this.#v=at(this.#v,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(t=>t()),this.#r=[]}};var Ha=0,Ua=0,Vs=0,zs=!1,Ga=0,qa=0,Hs=!1,Us=1,Gs=!1,Ya=0,Xa=0,jn=2,oI=.6,nI=60,Mr=jn,sI=.1,Ja=!1,Ws=null,iI=200,aI=120,lo=null,Ru=()=>{},Nu=()=>{},Pu=()=>{},sr,js=new Map,cI=e=>{if(e<=1)return jn;let t=Math.exp((e-1)*oI);return Math.min(jn*t,nI)},lI=({clientX:e,clientY:t})=>{if(!sr)return;Ga=e,qa=t;let r=e-Ha,o=t-Ua,n=u.getTime(),s=n-Vs;if(zs||s===0){Ha=e,Ua=t,Vs=n,Mr=jn,sr.goTo({speed:1,speedX:1,speedY:1});return}let i=Math.hypot(r,o);Us+=i;let a=r/s,c=o/s,l=Math.hypot(a,c),p=cI(l);p>Mr?Mr=p:Mr+=(p-Mr)*sI,Math.abs(r)>Mr&&(Ya=Math.sign(r)),Math.abs(o)>Mr&&(Xa=Math.sign(o)),sr.goTo({speed:Math.max(1,Math.round((l+1)*1e4)/1e4),speedX:Math.max(1,Math.round((a+1)*1e4)/1e4),speedY:Math.max(1,Math.round((c+1)*1e4)/1e4)}),Ha=e,Ua=t,Vs=n},Zv=()=>{Ru=u.usePointerMove(()=>{Ru(),Vs=u.getTime(),Gs=!1,lo?(clearTimeout(lo),lo=null):(Us=1,Hs=!1),zs=!0})},ey=()=>{Pu=u.usePointerMove(e=>{lI(e),zs&&(zs=!1)})},Qv=()=>{Ws&&(clearTimeout(Ws),Ws=null)},uI=()=>{sr&&(sr.goTo({speed:1,speedX:1,speedY:1}),Ya=0,Xa=0,Mr=jn,lo=setTimeout(()=>{lo=null,Gs=!0,Hs=!0},aI),Pu(),Nu(),Zv(),ey(),ty())},ty=()=>{Qv();let e=()=>{Qv(),Ws=setTimeout(()=>{Ws=null,uI()},iI)};Nu=u.usePointerMove(e)},pI=()=>{Ja||(Ja=!0,Zv(),ey(),ty(),sr=new Tt({data:{speed:1,speedX:1,speedY:1}}),sr.subscribe(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of js.values())o({speed:e,speedX:t,speedY:r,clientX:Ga,clientY:qa,directionX:Ya,directionY:Xa,distance:Us,completed:Gs,pointerEnd:Hs})})}),sr.onComplete(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of js.values())o({speed:e,speedX:t,speedY:r,clientX:Ga,clientY:qa,directionX:0,directionY:0,distance:Us,completed:Gs,pointerEnd:Hs})})}))},mI=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return js.set(t,e),pI(),()=>{js.delete(t),js.size===0&&Ja&&(lo&&(clearTimeout(lo),lo=null),Ru(),Nu(),Pu(),sr.destroy(),sr=null,Ja=!1,Ha=0,Ua=0,Vs=0,zs=!1,Ya=0,Xa=0,Ga=0,qa=0,Mr=jn,Us=1,Gs=!1,Hs=!1)}},ry=mI;function hI(e){he.set(e)}function dI(e){return he.get(e)}function fI(){he.print()}function gI(e=()=>{}){return ry(e)}function bI(e,t){switch(e){case"min":return ve.min(t);case"max":return ve.max(t);case"get":return ve.getBreackpoint(t)}}var U={};To(U,{createLerp:()=>wI,createMasterSequencer:()=>SI,createScrollerTween:()=>TI,createSequencer:()=>_I,createSpring:()=>EI,createStaggers:()=>xI,createTimeTween:()=>CI});var oy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ab(s,i,r/t*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var kr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;constructor(t){this.#n=Nt(t??{}),this.#t=so(t?.relative,"lerp"),this.#i=Fa(t?.velocity),this.#l=Ba(t?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#x=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Xe,this.#_=Xe;let r=t?.data;r&&this.setData(r)}#I(t,r){this.#u=!0,this.#e=oy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Fe(this.#e,"currentValue");if(this.#m||An({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Fe(this.#e,"toValue");On({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#I(s,i)})})}#P(t,r){this.#I(t,r)}async#R(){if(Fn(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("lerp",t);let r=or(this.#d,this.#a);if(this.#n.grid.col>r.length){kt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#C=!1}return{ready:!0}}async#O(t,r){this.#v||(this.#s=t,this.#c=r,this.#C&&(this.#v=!0,await this.#R(),this.#v=!1),Dn({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#P(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=Cn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=Ma(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&za((t,r)=>this.#P(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#w(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=so(s,"lerp"),this.#i=Fa(o),this.#l=Ba(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=ao(t);return this.#A(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=$n(t);return this.#A(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ro(t,r))return oo("lerp goFromTo:",t,r),new Promise(s=>s);let n=Ln(t,r);return this.#A(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Ir(t);return this.#A(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#x=!1;let o=Ir(t);this.#e=Wn(o,this.#e);let{reverse:n}=this.#w(r??{});Rt(n,"reverse")&&(this.#e=Cr(t,this.#e)),this.#e=En(this.#e,this.#t),this.#e=xr(this.#e)}#A(t,r,o={}){this.#e=Wn(t,this.#e);let{reverse:n,immediate:s}=this.#w(o??{});if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=En(this.#e,this.#t),Rt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=xr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return Vn(this.#e)}getToNativeType(){return Bn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(t){this.#i=Fa(t),this.#T=at(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Ba(t),this.#T=at(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Ka=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var qs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(t){this.#n=xv(t?.ease),this.#t=no(t?.duration),this.#i=Nt(t),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=or(this.#s,this.#u);if(this.#i.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:Xe,fastestStagger:Xe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,v=this.#n(t,f,d,this.#t);n.currentValue=_e(v)}let o=Fe(this.#l,"currentValue");u.useNextTick(()=>{Ka({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=ao(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Js=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var ny=(e,t)=>Object.keys(e).map(r=>Wt(e[r])?{prop:r,toValue:e[r],ease:pt(t)}:(wr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:pt(t)})),sy=(e,t)=>Object.keys(e).map(r=>Wt(e[r])?{prop:r,fromValue:e[r],ease:pt(t)}:(wr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:pt(t)})),iy=(e,t,r)=>Object.keys(e).map(o=>!Wt(t[o])||!Wt(e[o])?(wr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:pt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:pt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Au={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},ay=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Au[o].get]:n},void 0),cy=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var ly=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:S,end:_,values:w}=e[T],x=null;for(let P of w)if(P.prop===o.prop){x=P;break}if(!x||!x.active)continue;let{prop:E}=x;if(cy(e,T,E,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,v;r>=s&&r<=i?v=l(r-s,h,p-h,f):v=d;let y=Number.isNaN(v)?d:v;o.currentValue=_e(y),o.settled=!0}return t};var Ou=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=ay(e,o,c,s);return!p&&p!==0?a:{...a,[Au[s].set]:p}});return{...r,values:i}});var $u=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Qa=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=$u(a,"start");return $u(c,"priority")};var Za=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Ys=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=no(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:Sv(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Nt(t),this.#m=!0,this.#C=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let t=or(this.#h,this.#l);if(this.#g.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Xe,fastestStagger:Xe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#x({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:t,isLastDraw:r,direction:n}))}#x({partial:t=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#r=t,this.#y(t)),!this.#a&&this.#r&&(!o||o===We.NONE)&&(this.#f=t>=this.#r?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#n=ly({timeline:this.#t,valuesState:this.#n,partial:t});let n=Fe(this.#n,"currentValue");Ka({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#v(t),this.#m=!0,this.#r=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#y(t=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:We.FORWARD},s={shouldFire:t<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#v(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&t>o&&this.#r<=o,s=this.#f===We.BACKWARD&&t<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=Cv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:pt(he.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Aa({start:n,end:s}))return this;let a=ny(t,i),c=Za({data:a,values:this.#n}),l=Object.keys(t),p=Qa({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=Ou({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Aa({start:n,end:s}))return this;let a=sy(t,i),c=Za({data:a,values:this.#n}),l=Object.keys(t),p=Qa({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=Ou({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Aa({start:s,end:i}))return this;if(!ro(t,r))return oo("sequencer goFromTo:",t,r),this;let c=iy(t,r,a),l=Za({data:c,values:this.#n});return this.#t=Qa({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||Tb(t),n||_b(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(t=0){this.#o=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var uy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Rr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;constructor(t){this.#n=$a(t?.ease),this.#t=Cu(t?.duration),this.#i=so(t?.relative,"tween"),this.#l=Nt(t??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#x=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#I={duration:this.#t,ease:La(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#P=Xe,this.#R=Xe;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#y=t-this.#C-this.#x),this.#x=t-this.#C-this.#y,Math.round(this.#x)>=this.#t&&(this.#x=this.#t),this.#e=uy({values:this.#e,timeElapsed:this.#x,duration:this.#t,ease:this.#n});let r=Math.round(this.#x)===this.#t,o=Fe(this.#e,"currentValue");if(this.#m||An({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){On({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#P,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#w(t){this.#C=t,this.#O(t)}async#A(){if(Fn(this.#l.each,this.#v,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("tween",t);let r=or(this.#d,this.#a);if(this.#l.grid.col>r.length){kt(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#P,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#P=i,this.#R=s,this.#v=!1}return{ready:!0}}async#N(t,r){this.#_||(this.#s=t,this.#c=r,this.#v&&(this.#_=!0,await this.#A(),this.#_=!1),Dn({validationFunction:this.#r,defaultRafInit:o=>this.#w(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=Cn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#b(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#D(t){let r={...this.#I,...t},{ease:o,duration:n,relative:s}=r;return this.#n=$a(o),this.#i=so(s,"tween"),this.#t=Cu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(t);return this.#L(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=$n(t);return this.#L(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(t,r))return oo("tween goFromTo:",t,r),new Promise(s=>s);let n=Ln(t,r);return this.#L(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Ir(t),n=r?{...r,duration:1}:{duration:1};return this.#L(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Ir(t),n=r?{...r,duration:1}:{duration:1};this.#e=ku(o,this.#e);let{reverse:s}=this.#D(n);Rt(s,"reverse")&&(this.#e=Cr(t,this.#e)),this.#e=pu(this.#e,this.#i),this.#e=xr(this.#e)}#L(t,r,o={}){this.#e=ku(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=pu(this.#e,this.#i),Rt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=xr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#N(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return Vn(this.#e)}getToNativeType(){return Bn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(t){this.#n=$a(t),this.#I=at(this.#I,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var vI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},yI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Oo)return{start:0,end:_e(e-(i-c))};if(n===$o){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},py=e=>{let t=Rv(e?.items),r=Nt(e),o=no(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,v)=>({item:d,start:0,end:o,index:v}));if(!kv(t))return i;r.grid?.col>t.length&&(kt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Db(n),s=1);let{staggerArray:a}=Pt({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Xe,fastestStagger:Xe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return $b(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,v)=>d-v),h=p.length;return c.map(({item:d,frame:v})=>{let y=p.indexOf(v),T=s*h/n,{start:S,end:_}=r.type===Ao?vI({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===Oo||r.type==="end"||r.type===$o?yI({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:y}})};function TI(e){return new qs(e)}function _I(e){return new Ys(e)}function SI(){return new Js}function xI(e){return py(e)}function CI(e){return new Rr(e)}function EI(e){return new Tt(e)}function wI(e){return new kr(e)}var Me={};To(Me,{createAsyncTimeline:()=>MI,createSyncTimeline:()=>II});var te=()=>{},ec=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var tc=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var uo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?tc({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Lu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):te;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Xs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;constructor(t){this.#n=Oa(t?.repeat),this.#t=de(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=de(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=de(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=de(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#I=0,this.#P=0,this.#R=0,this.#O=!1,this.#w=[],this.#A=!1,this.#N=0,this.#b=[],this.#D=[],this.#L=void 0,this.#M=void 0}#F(){let t=this.#s[this.#g],r=this.#w;if(this.#w=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=tc({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:v}=a,y={...d};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,mb()),this.#w.push({id:v,action:p});let w=r.find(({id:E,action:I})=>E===v&&I===p),x={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>w?new Promise(E=>E({resolve:!0})):new Promise(E=>{if(_){E({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),E({resolve:!0})}),addAsync:()=>{this.#k=!0;let E=this.#I;return w?new Promise(I=>I({resolve:!0})):new Promise((I,P)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(E===this.#I){I({resolve:!0});return}P()}})})},createGroup:()=>new Promise(E=>E({resolve:!0})),closeGroup:()=>new Promise(E=>E({resolve:!0})),label:()=>new Promise(E=>E({resolve:!0})),suspend:()=>{if(w)return new Promise(P=>P({resolve:!0}));let E=u.checkType(Boolean,l());E||hb(l);let I=E?l():!0;return new Promise(P=>{!_&&I&&(this.#T=!0),P({resolve:!0})})}};return new Promise((E,I)=>{let P=_?!1:d?.delay,A=this.#I;if(P){let $=u.getTime();requestAnimationFrame(()=>{this.#$({start:$,deltaTimeOnpause:0,delay:P,mainReject:I,mainResolve:E,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}Lu({mainReject:I,mainResolve:E,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:$=>this.#Y($),currentSessionId:()=>this.#I,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#z(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=uo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,v)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#D.forEach(({cb:p})=>p()),this.#_=!0,this.#L&&qo.add(()=>{xt.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#v&&(r=p-this.#R),h-r>=o||this.#_||this.#C){Lu({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#I,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#x)&&this.#z(),this.#x=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return te;let o=this.#P;return this.#P++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#z(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(db(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#E(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#o.push(n)}#B(){this.#o.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=this.#h?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#E({...this.#p,id:this.#r,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#E({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#E({...this.#p,id:this.#r,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#E({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#E({...this.#p,id:this.#r,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Ds(t))return this;n.delay=Ls(n?.delay);let s=this.#h?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#E({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=te){let r=io(t,()=>{},"timeline add function");return this.#f?(Nn("add"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=$v(t);return this.#f?(Nn("addAsync"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(Nn("createGroup"),this):(this.#r++,this.#E({...this.#p,id:this.#r,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#E({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(Nn("suspend"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(Nn("label"),this):Av(t?.name,"asyncTimeline label:")?(this.#r++,this.#E({...this.#p,id:this.#r,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#o.forEach(({tween:t})=>{let r=t.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:t})=>{let r=uo({timeline:this.#s,tween:t,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Lv(r),n=Dv(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(bb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=uo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{vb()})})}#G(){this.#M&&(this.#M(u.ANIMATION_STOP_REJECT),this.#M=void 0)}async#te(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(t){return await this.#te(),this.#Z(t,!1)}async playFromReverse(t){return await this.#te(),this.#Z(t,!0)}#Z(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#z(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Ov(this.#a.index,t),this.#F())}})})}async play(){return await this.#te(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#y&&this.#z(),this.#I++,u.useFrameIndex(()=>{this.#M=r,this.#L=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#M=r,this.#L=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#te(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#I++,u.useFrameIndex(()=>{this.#L=a,this.#M=c,this.#F()},1))})}reverseNext(){this.#C=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#C=!1,this.#Q(),this.#x=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#z(),this.#y=!1,this.#i||this.#B()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#oe())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#re()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#z(),this.#m++,this.#F())}}#oe(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#re(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#_?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#N});let r=this.#N;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#N});let r=this.#N;return this.#N++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Ks=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;constructor(t={}){this.#n=no(t?.duration),this.#t=de(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Oa(t?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#_=[],this.#I=[],this.#P=void 0,this.#R=void 0,this.#O={time:0,direction:We.NONE},this.#w={direction:We.NONE,loop:0}}#A(t,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=t-this.#h-this.#u-this.#e),this.#u=Math.trunc(t-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#v||(this.#s=nt(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#I.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#x=!1,this.#N();return}if(this.#S(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#N();return}if(u.useNextFrame(()=>{!this.#y&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#w.direction=s,this.#w.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#w)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#P&&this.#P(!0);return}if(this.#t){this.reverse(),this.#N();return}if(this.#d){this.#b(),this.#h=t,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#N();return}this.#b(),this.#h=t,this.#p&&(this.#d=!this.#d),this.#N()}#N(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#A(t,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#D(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||yb(t),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#P=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#M()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#L(),this.#P=r,this.#R=o,this.#M(s)})}#M(t=0){this.#S(),this.#b(),this.#s=t,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#y=!0,this.#$(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#L(),this.#P=r,this.#R=o,this.#F(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#P=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#F(this.#n,!0)}})}#F(t=0){this.#S(),this.#u=t,this.#s=t,this.#c=t,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#y=!0,this.#$(t)}async#$(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#S(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#L(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#S(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?We.NONE:this.#p?We.BACKWARD:We.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#I.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#I=this.#I.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#I=[],this.#k=[],this.#_=[]}};function II(e){return new Ks(e)}function MI(e){return new Xs(e)}var Ke={};To(Ke,{createParallax:()=>OI,createScrollTrigger:()=>$I});var kI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function my({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(kI({prevValue:e,value:t,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var RI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},NI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},PI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},AI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},hy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=RI({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=NI({screen:n}),v=PI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=AI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var dy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var rc=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#S;#Y;#z;#E;#W;#B;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#x=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#E="left",this.#B=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#I=["text-align"],this.#P=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#w=!1,this.#A=0,this.#N=0,this.#b=!1,this.#D=1.5,this.#L=!1,this.#M=!1,this.#F=0,this.#$=0,this.#S=!1,this.#Y=0,this.#z=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#B=t.anticipatePinOnLoad,this.#L=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#N=window.scrollY,this.#n=t?.scrollerHeight,this.#ie(),this.#E=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#w=!0,this.#T=!0,this.#te(),this.#oe(),this.#Z(),this.#U(),this.#y=u.useScrollStart(()=>{this.#w&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#w&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ie();let o=r-this.#N;if(this.#N=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${t}px)`:this.#r&&(this.#r.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#te(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#H(),i=dy({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#ee()}#Z(){if(!this.#r||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${t}px`,this.#r.style.width=`${r}px`}#oe(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#re(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#I.map(r=>this.#re(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#ee(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#re(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#se(){this.#t=this.#u(),this.#h=this.#s()}#ie(){this.#se(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#w&&(this.#p?.stop?.(),this.#v(),this.#x(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#M=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#w=!1))}#ae(){return this.#a?this.#c===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#me(){let t=this.#ae();this.#de(t)}#he(){let t=this.#l?this.#ae()-this.#h:this.#ae()+this.#h;this.#de(t)}#de(t){u.useFrame(()=>{if(!this.#r||!this.#E)return;let r=this.#r?.style??{};r[this.#E]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ve()}).catch(()=>{})}#ve(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#X(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#j(){if(!this.#r)return;let t=this.#c===b.DIRECTION_VERTICAL?St(this.#r).left:St(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${t}px`,this.#M=!0,this.#S=!0)})}#H(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#P.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#J(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#ce(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#H(),o=this.#J();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#fe(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#ce()),this.#a?.append(this.#r))})}#ge(t){let r=this.#S&&this.#Y<3?this.#$:nt(Math.abs(t-this.#A),0,250);return this.#S&&this.#Y<this.#z?this.#Y++:(this.#Y=0,this.#S=!1),this.#$=r,r*this.#D}#K(t,r){if(this.#b&&!this.#T||this.#T&&!this.#B)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#ge(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#b&&!this.#T||this.#T&&!this.#B)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#ge(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#w||!this.#a)return;if(this.#M&&this.#F<this.#z){this.#F++;return}else this.#F=0,this.#M=!1;let r=this.#A>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ye(t,r):this.#K(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#q(),this.#fe(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#j();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#me():this.#he(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#X(),this.#fe(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=t,this.#T=!1}};var fy=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},gy=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},by=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Du=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),vy=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},yy=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,Ty=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),_y=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=Tv(r);if(r&&!o)return fy(),Du();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return gy(),Du();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return by(),Du();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>yu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>yu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},Sy=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=_y(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:Na(c)}:{value:e*p,additionalVal:a,position:Na(c)}},xy=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=_y(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,v=Na(h),y=v===b.POSITION_TOP||v===b.POSITION_LEFT;return l===b.PX?{value:vy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}:{value:yy(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}},Fu=(e,t,r,o)=>{let n=String(t);return De(n,b.PLUS_HEIGHT_HALF)?e+r/2:De(n,b.PLUS_HEIGHT)?e+r:De(n,b.PLUS_WIDTH_HALF)?e+o/2:De(n,b.PLUS_WIDTH)?e+o:De(n,b.MINUS_HEIGHT_HALF)?e-r/2:De(n,b.MINUS_HEIGHT)?e-r:De(n,b.MINUS_WIDTH_HALF)?e-o/2:De(n,b.MINUS_WIDTH)?e-o:e},Cy=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Ey=(e,t)=>e===b.PROP_OPACITY?1-t:-t,Bu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var po=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#S;#Y;#z;#E;#W;#B;#U;#G;#te;#Z;#oe;#re;#Q;#ee;#se;#ie;#ae;#me;#he;#de;#ve;#q;#X;#j;#H;#J;#ce;#V;#fe;#ge;#K;#ye;#ue;#pe;#le;#Ee;#Te;#be;#Ce;#we;#Ie;#Re;#ne;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#x=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#I=!0,this.#P=!1,this.#R=!1,this.#O=!1,this.#w=void 0,this.#A="",this.#N=0,this.#b=0,this.#D=()=>{},this.#L=()=>{},this.#E=!1,this.#M=de(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=de(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=de(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=de(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Da(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#z=Da(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Da(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#B=t?.dynamicStart?wu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?wu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Fv(t?.dynamicRange),this.#te=de(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#Z=io(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#oe=io(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#re=io(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=io(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#ee=io(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#se=Vv(t?.align),this.#ie=Wv(t?.onSwitch),this.#ae=de(t?.reverse,"Parallax reverse propierties error:",!1),this.#me=Iu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#he=Iu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#de=de(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ve=t?.useWillChange,this.#q=Bv(t?.tween);let r=this.#q?.getType&&this.#q.getType()===b.TWEEN_TIMELINE,o=this.#q?.getType&&this.#q.getType()===b.TWEEN_TWEEN;this.#X=Pn(t?.item,!1),this.#j=Pn(t?.scroller,!0),this.#H=Pn(t?.screen,!0),this.#J=Eu(t?.trigger),this.#ce=Eu(t?.applyTo),this.#V=Fs(t?.direction,"Parallax/Scrolltrigger"),this.#fe=de(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#ge=de(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#K=jv(t?.type),this.#ye=rr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#ue=Do(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#pe=Fo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Hv(t?.propierties,this.#K,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":zv(t?.range,this.#K),this.#be=de(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&iv(),this.#Ce=r?b.EASE_LERP:Uv(t?.easeType),this.#we=Gv(t?.springConfig,this.#K),this.#Ie=qv(t?.lerpConfig,this.#K),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ne=this.#Ce===b.EASE_SPRING?new Tt:new kr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#q?.getDuration?this.#q.getDuration():0,this.#G=()=>this.#Te,this.#q?.inzializeStagger?.()),this.#K==b.TYPE_SCROLLTRIGGER&&(this.#de=!0,this.#Pe(),this.#Me()),this.#be&&(this.#g=u.useScrollStart(()=>{this.#fe||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#j===globalThis&&(this.#r=Bu({pin:this.#M,ease:this.#be,useThrottle:this.#ge,callback:()=>{this.#xe()}})),this.#xe()),this.#be||(this.#j===globalThis&&(this.#r=Bu({pin:this.#M,ease:this.#be,useThrottle:this.#ge,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#j!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#M&&(this.#w=new rc,ve[this.#pe](this.#ue)&&u.useNextTick(()=>{this.#De(),this.#w?.init(this.#Ne()),this.#w?.onScroll(this.#c)}))}#Ne(){return{item:this.#X,marker:this.#W,screen:this.#H,animatePin:this.#F,anticipatePinOnLoad:this.#S,forceTranspond:this.#$,invertSide:this.#E,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#N,getEnd:()=>this.#b}}setScroller(t){this.#j=Pn(t,!0)}setScreen(t){this.#H=Pn(t,!0)}setDirection(t){this.#V=Fs(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#ue=Do(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#pe=Fo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#X&&this.#X.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#X.parentNode;Object.assign(r.style,t)}}#We(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ne.setData({val:t}),this.#D=this.#ne.subscribe(({val:r})=>{r!==this.#v&&(this.#le===b.PROP_TWEEN&&this.#q?.draw?(this.#q.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#I=!1):this.#ke(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!0})}))}),this.#L=this.#ne.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#q?.draw?this.#q.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ne&&this.#ne?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ne&&this.#ne?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#A=b.PX}else{let t=String(this.#Te),r=Jv(t,this.#le),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#A=_v(r)}}#Me(){let t=this.#o/100;if(this.#B&&this.#B?.position&&this.#B?.value?.()!==void 0){let{position:l,value:p}=this.#B,h=p();Number.isNaN(h)||(this.#Y=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=Sy(t,this.#Y,this.#V);if(this.#E=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#N=Fu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#z=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=xy(t,this.#z,this.#N,this.#o,this.#E,this.#V),c=this.#E?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=Fu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#je(),this.#E&&(this.#N-=this.#u)}#je(){if(this.#W){let{startMarker:t,endMarker:r}=hy({startMarker:this.#x,endMarker:this.#y,startPoint:this.#N,endPoint:this.#b,screen:this.#H,direction:this.#V,invertSide:this.#E,label:this.#W});this.#x=t,this.#y=r}}#Ae(){let t=this.#J??this.#X;if(!t)return;let r=0,o=0,n=0;this.#J&&(r=So(this.#J)?.x??0,o=So(this.#J)?.y??0,n=So(this.#J)?.z??0),t.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#j===globalThis?Math.trunc(be(t).top):Math.trunc(be(t).top)-be(this.#j).top:this.#i=this.#j===globalThis?Math.trunc(be(t).left):Math.trunc(be(t).left)-be(this.#j).left,this.#H&&this.#H!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#H).top):Math.trunc(St(this.#H).left)),this.#J&&(r!==0||o!==0||n!==0)&&(this.#J.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#H===globalThis||!this.#H||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#H).top):Math.trunc(St(this.#H).left))}#$e(){let t=this.#J??this.#X;t&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#J??this.#X;t&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#j&&(this.#j===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#j.scrollY:this.#j.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-be(this.#j).top:-be(this.#j).left)}#Fe(){this.#H&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#H===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#H.offsetHeight):Math.trunc(this.#H.offsetWidth))}refresh(){this.#M&&this.#w&&this.#w.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#K==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#M&&this.#w&&ve[this.#pe](this.#ue)&&this.#w?.init(this.#Ne())),this.#v=void 0,this.#I=!0,ve[this.#pe](this.#ue)?this.#be?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#be&&this.#ne?.stop?.(),u.useFrameIndex(()=>{this.#ce?(this.#Be(this.#ce),Object.assign(this.#ce.style,this.#Ve())):(this.#Be(this.#X),this.#X&&Object.assign(this.#X.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ve[this.#pe](this.#ue)||!t)return;this.#R=!0;let o=this.#ze(t);if(this.#be)this.#xe(o);else{this.#Se(o);let n=this.#P||this.#I||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#be&&(this.#fe||(this.#O=!0))}triggerScrollEnd(){this.#be||this.#_e({forceRender:!0})}#ze(t){if(t!==void 0)return this.#H!==globalThis?t+this.#l:t}stopMotion(){this.#ne?.stop?.()}#Se(t){if(!ve[this.#pe](this.#ue)||(t?this.#c=-t:this.#De(),this.#P=Ty({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#P&&!this.#de&&this.#K===b.TYPE_PARALLAX))return;this.#M&&this.#w&&this.#w.onScroll(this.#c),this.#K===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#He()):this.#le===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#se))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ae&&this.#K!==b.TYPE_SCROLLTRIGGER?Ey(this.#le,this.#h):this.#h;this.#h=this.#K===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#xe(t){if(!ve[this.#pe](this.#ue)||(this.#Se(t),!this.#k&&!this.#I&&this.#K===b.TYPE_SCROLLTRIGGER)||!this.#P&&!this.#I&&this.#K===b.TYPE_PARALLAX)return;let r=this.#I&&!this.#te?"set":"goTo";this.#ne&&this.#ne[r]({val:this.#h},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){ve[this.#pe](this.#ue)&&u.useFrame(()=>{this.#h===this.#v&&!t||!this.#P&&!t||(!this.#fe&&!this.#R&&(this.#O=!t),!this.#fe&&this.#R&&(this.#O=r&&this.#P),this.#le===b.PROP_TWEEN?(this.#q.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#h,this.#I=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#ee&&this.#ee({value:this.#h,parentIsMoving:this.#O})}))})}#He(){let t=this.#E?-(this.#c+this.#N+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#N-(this.#i+this.#b)),r=this.#b/100*this.#d,o=t/100*this.#d,n=this.#ae?this.#E?r-o:o:this.#E?o:r-o,s=r>0?-nt(n,0,r):-nt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#I)return this.#h;let i=s*100/this.#b;switch((this.#Z||this.#oe||this.#re||this.#Q)&&my({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#Z,onEnterBack:this.#oe,onLeave:this.#re,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ue(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ue(t){switch(this.#A){case b.VW:return this.#e/100*-t;case b.VH:return this.#p/100*-t;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#Ge(){let t=this.#o/100*this.#he,r=this.#o-this.#o/100*this.#me,o=this.#se==b.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#se==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-t);return nt(n,0,1)}#qe(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#se){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let t=Number(this.#se),r=Number(this.#Te);return(this.#c+this.#o/100*t-this.#i)/r}#Ye(t){return Cy({switchPropierties:this.#ie,isReverse:this.#ae,value:t})}#ke(t){this.#v=t,this.#I=!1;let r=this.#ce||this.#X;if(!r||this.#Ee)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ve?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${t}`;break}case b.PROP_SCALE:{let i=this.#K===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#K===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#K===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#le.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#q&&t&&(t.style="")}#Ve(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ne?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#D(),this.#L(),this.#C(),this.#ne?.destroy?.(),this.#ne=null,this.#G=()=>{},this.#B?.value&&(this.#B.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#Z=()=>{},this.#oe=()=>{},this.#re=()=>{},this.#Q=()=>{},this.#ee=()=>{},this.#M&&this.#w&&this.#w?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#y&&this.#y?.remove?.(),this.#x=void 0,this.#y=void 0,this.#w=void 0,this.#h=0;let t=this.#ce??this.#X;t&&"style"in t&&(t.style=""),this.#X=null,this.#j=null,this.#H=null,this.#J=null,this.#ce=null}};function OI(e){return new po({...e,type:b.TYPE_PARALLAX})}function $I(e){return new po({...e,type:b.TYPE_SCROLLTRIGGER})}var Vu=window.innerHeight,Wu=document.body.offsetHeight,mo=!1,ju=!0,jt=window.scrollY,Qs=!0,zt=!1,zu=()=>{},Hu=()=>{},nc=()=>{},oc,wy=()=>{document.body.classList.remove("is-whelling")},LI=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var DI=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});oc=t;let o=r.subscribe(({scrollValue:h})=>{zt||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{jt=window.scrollY});let n=u.useMouseWheel(h=>{if(zt)return;h.preventDefault(),Qs=!1,LI();let f=h.spinY??0,d=ue.clamp(f*e+jt,0,Wu-Vu);jt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{ju&&h()}),i=u.useMouseWheel(u.debounce(()=>{wy()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!Qs)return;let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{zt||(wy(),r.stop(),jt=window.scrollY,Qs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),jt=window.scrollY,Vu=window.innerHeight,Wu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{mo=!1,jt=0,Qs=!0,zt=!1,oc&&(p.unobserve(oc),p.disconnect()),r?.stop(),r?.destroy(),r=null,oc=null,o(),c(),a(),n(),l(),i(),s(),zu=()=>{},Hu=()=>{},nc=()=>{}},stop:()=>{r.stop(),jt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},sc=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{mo||(jt=window.scrollY,mo=!0,zt=!1,Vu=window.innerHeight,Wu=document.body.offsetHeight,ju=!0,Qs=!1,{destroy:zu,stop:Hu,update:nc}=DI({velocity:e,rootElement:t}))},ir=()=>{!mo||zt||(Hu(),zt=!0)},Ht=()=>{!mo||!zt||(zt=!1)},Zs=()=>{!mo||!zt||(nc(),jt=window.scrollY,zt=!1)},Uu=()=>{mo&&nc()},Gu=()=>{zu()},Iy=()=>{ju=!0};var My=()=>mo;var ky="easeOutQuad",ei=new Rr({ease:ky,data:{val:0}}),ic=!1,qu=!1;ei.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Uu()});var Ju=()=>{qu&&(document.body.style.overflow=""),ei?.updateEase?.(ky),Zs()},Yu=()=>{ic&&(ei.stop(),Ju())};u.useMouseWheel(()=>{Yu()});u.useMouseDown(()=>{Yu()});u.useTouchStart(()=>{Yu()});var Nr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?nl(t)||u.checkType(Number,t)?nl(t)?be(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=rr(r?.duration,"bodyScroll: duration",500);return qu=de(r?.overflow,"bodyScroll: overflow",!1),La(r?.ease)&&ei?.updateEase?.(r?.ease),qu&&(document.body.style.overflow="hidden"),new Promise(s=>{ic=!0,ir(),ei.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Ju(),ic=!1,s(!0)}).catch(()=>{Ju(),ic=!1,s(!0)})})}};var ti={END:"END",START:"START",CENTER:"CENTER"};var FI=e=>{switch(e){case ti.END:return"align-items:flex-end;";case ti.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Ry=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=FI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,w=document.createElement("div");w.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),w.append(x),e.prepend(w)};var ri=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#S;#Y;#z;#E;#W;#B;#U;#G;#te;#Z;#oe;#re;#Q;#ee;#se;#ie;#ae;#me;#he;constructor(t){this.#o=()=>{},this.#he=0,this.#F=t?.container??"",this.#W=[],this.#B=!1,this.#U=0,this.#G={},this.#te=0,this.#Z=t?.children||[],this.#e=de(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=rr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=de(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Do(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Fo(t?.queryType,"queryType","horizontalScroller"),this.#r=de(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=de(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=de(t?.ease,"HorizontalScroller: ease",!1),this.#x=Va(t?.easeType??"","HorizontalScroller"),this.#y=de(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=de(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=de(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=rr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#I=rr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#P=t?.columnAlign?t.columnAlign.toUpperCase():ti.START,this.#R=mt(t?.onEnter,"HorizontalScroller: onEnter",te),this.#O=mt(t?.onEnterBack,"HorizontalScroller: onEnterBack",te),this.#w=mt(t?.onLeave,"HorizontalScroller: onLeave",te),this.#A=mt(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",te),this.#N=mt(t?.afterInit,"HorizontalScroller: afterInit",te),this.#b=mt(t?.afterRefresh,"HorizontalScroller: afterRefresh",te),this.#D=mt(t?.afterDestroy,"HorizontalScroller: afterDestroy",te),this.#L=mt(t?.onTick,"HorizontalScroller: onTick",void 0),this.#M=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#M||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#M.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#M.querySelector(t.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#M.querySelector(t.row),this.#S||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#M.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#z=this.#M.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#E=o.replace(".",""),this.#W=this.#S.querySelectorAll("a, button"),this.#Z.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&Ry({mainContainer:this.#M,queryType:this.#f,breakpoint:this.#d,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#E,useSticky:this.#y,columnHeight:this.#_,columnWidth:this.#I,columnAlign:this.#P}),this.#oe=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#q(i)},this.#re=()=>{ve[this.#f](this.#d)&&(ir(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#i=!0,this.#he=this.#c)},this.#Q=()=>{Ht(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ee=()=>{Ht(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#se=n=>{ve[this.#f](this.#d)&&(ir(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#he=this.#c)},this.#ie=()=>{Ht(),this.#i=!1},this.#ae=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#q(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#me=n=>{Math.abs(this.#c-this.#he)>this.#p&&n.preventDefault()}}init(){this.#n&&ec(this.#ce.bind(this),this.#J.bind(this),this.#V.bind(this),this.#ge.bind(this))().then(()=>{this.#K(),this.#e&&this.#j(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#N?.(),this.#Z.forEach(t=>{t.refresh()})})},3)})}#de(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ve(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#q(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#X(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#h+this.#U>t+window.innerHeight}#j(){this.#o=u.useScroll(()=>this.#X()),this.#X(),this.#S.addEventListener("click",this.#me,{passive:!1}),this.#S.addEventListener("mousedown",this.#re,{passive:!0}),this.#S.addEventListener("mouseup",this.#Q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#ee,{passive:!0}),this.#S.addEventListener("touchstart",this.#se,{passive:!0}),this.#S.addEventListener("touchend",this.#ie,{passive:!0}),this.#S.addEventListener("mousemove",this.#oe,{passive:!0}),this.#S.addEventListener("touchmove",this.#ae,{passive:!0})}#H(){this.#o(),this.#S.removeEventListener("click",this.#me),this.#S.removeEventListener("mousedown",this.#re),this.#S.removeEventListener("mouseup",this.#Q),this.#S.removeEventListener("mouseleave",this.#ee),this.#S.removeEventListener("touchstart",this.#se),this.#S.removeEventListener("touchend",this.#ie),this.#S.removeEventListener("mousemove",this.#oe),this.#S.removeEventListener("touchmove",this.#ae)}#J(){return!this.#$||!this.#M||!this.#S?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#te=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#M.style.height=`${r}px`,this.#S.style.width=`${r}px`),t(!0)})})}#ce(){return new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){t(!0);return}this.#U=[...this.#Y].map(r=>je(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#$?new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#z){t(!0);return}let r=[...this.#z].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#E} ${this.#E}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#E}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#E}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#E}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#E}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#$.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#fe(){this.#$&&(this.#$.innerHTML="")}#ge(){return new Promise(t=>{if(!ve[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#z&&([...this.#z].forEach(r=>{let o=this.#te/100,n=r.dataset.shadow,s=je(r),i=le(this.#S),a=So(this.#S)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#M.querySelector(`.${this.#E}[data-shadow="${n}"]`),v=d?.querySelector(`.${this.#E}--in-center`),y=d?.querySelector(`.${this.#E}--out-center`),T=d?.querySelector(`.${this.#E}--left`),S=d?.querySelector(`.${this.#E}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,w=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,E=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,$=(s-s/l)/o;return A+$+E})(),P=I/2+w;this.#y&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),v&&(v.style.height=`${P}px`),y&&(y.style.height=`${P}px`),y&&(y.style.top=`${P}px`),T&&(T.style.height=`${E}px`),S&&(S.style.height=`${I+_}px`),d&&(d.style.height=`${E}px`)}),t(!0))})})}#K(){if(!this.#$||!ve[this.#f](this.#d))return;let t=new po({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#Z.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#w,onLeaveBack:this.#A});t.init(),this.#B=!0,this.#G=t,this.#t=be(this.#$).top,this.#de()}#ye(){ec(this.#ce.bind(this),this.#J.bind(this),this.#V.bind(this),this.#ge.bind(this))().then(()=>{this.#K(),this.#ue()})}#ue(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#Z.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#B||!ve[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{ec(this.#ce.bind(this),this.#J.bind(this),this.#ge.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=be(this.#$).top,this.#B&&(this.#G?.refresh?.(),this.#ue()),t(!0)})})}#pe({destroyAll:t=!1}){(this.#B||t)&&(this.#G?.destroy?.(),this.#G=null,this.#$&&(this.#$.style.height=""),this.#M&&(this.#M.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#fe(),this.#ve(),this.#B=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),t&&this.#M){this.#e&&this.#H();let r=this.#M.querySelector(".scroller-style");r&&r.remove(),this.#M=null,this.#$=null,this.#S=null,this.#Y=[],this.#z=[],this.#N=te,this.#b=te,this.#L=te,this.#R=te,this.#O=te,this.#w=te,this.#A=te,this.#G=null,this.#B=!1,this.#W=[],this.#M=null,this.#F=null,this.#$=null,this.#S=null,u.useNextTick(()=>{this.#D?.(),this.#D=te,this.#Z.forEach(o=>{o?.destroy?.(),o=null}),this.#Z=[]})}},3))}onResize(t){this.#B&&ve[this.#f](this.#d)?t&&this.refresh():!this.#B&&ve[this.#f](this.#d)?this.#ye():this.#B&&!ve[this.#f](this.#d)&&this.#pe({destroyAll:!1})}destroy(){this.#pe({destroyAll:!0})}};var oi=new Map,ac=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},BI=e=>{let t=new Rr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Pr={subscribe:n=>{if(!ac(n))return()=>{};if(oi.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=BI(n);return oi.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),oi.delete(n)}},reset:n=>{ac(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!ac(n))return new Promise(c=>c(!0));let s=oi.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!ac(n))return new Promise(l=>l(!0));let s=oi.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#S;#Y;#z;#E;#W;#B;#U=0;#G=0;#te;constructor(t){this.#a=te,this.#d=te,this.#f=te,this.#r=te,this.#g=te,this.#m=te,this.#C=te,this.#x=te,this.#y=te,this.#v=te,this.#T=te,this.#k=te,this.#_={},this.#I=te,this.#P=te,this.#R=Fs(t?.direction,"SmoothScroller"),this.#O=!1,this.#w=Va(t?.easeType??"","SmoothScroller"),this.#A=Do(t?.breakpoint,"breakpoint","SmoothScroller"),this.#N=Fo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=de(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#M=rr(t?.speed,"SmoothScroller: speed",60),this.#F=de(t?.drag,"SmoothScroller: drag",!1),this.#$=mt(t?.onTick,"SmoothScroller: onTick",te),this.#S=mt(t?.onUpdate,"SmoothScroller: onUpdate",te),this.#te=de(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#Y=mt(t?.afterRefresh,"SmoothScroller: afterRefresh",te),this.#z=mt(t?.afterInit,"SmoothScroller: afterInit",te),this.#E=t?.children||[],this.#E.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#A),r.setQueryType(this.#N),r.init()}),this.#W=r=>{this.#oe();let{spinY:o}=u.normalizeWheel(r);this.#he({spinY:o})},this.#B=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#ae({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#Z()},500))}#Z(){this.#b&&this.#b.classList.remove("is-whelling")}#oe(){this.#b&&this.#b.classList.add("is-whelling")}#re(){return this.#c>0}init(){this.#n&&(this.#w===b.EASE_SPRING?this.#_=new Tt:(this.#_=new kr,this.#_.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#W,{passive:!0}),this.#b.addEventListener("mousemove",this.#B,{passive:!0}),this.#b.addEventListener("touchmove",this.#B,{passive:!0})),this.#L||(this.#x=u.useMouseWheel(t=>{this.#X(t)}),this.#y=u.useMouseMove(t=>{this.#q(t)}),this.#v=u.useTouchMove(t=>{this.#q(t)})),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#ie()),this.#f=u.useScrollEnd(()=>this.#ie()),this.#r=u.useTouchStart(t=>this.#de(t)),this.#g=u.useTouchEnd(t=>this.#ve(t)),this.#m=u.useMouseDown(t=>this.#de(t)),this.#C=u.useMouseUp(t=>this.#ve(t)),this.#b.addEventListener("mouseleave",()=>{Ht()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#H({target:t,preventDefault:r})})),this.#se(),ve[this.#N](this.#A)&&(this.#Q(),this.#ie()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#z?.({shouldScroll:this.#re()}),this.#E.forEach(t=>{t.refresh()}))})},3))}#Q(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#ee(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#se(){this.#_&&(this.#_.setData({val:0}),this.#I=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#E.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!0}),this.#E.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#P=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!1}),this.#E.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ie(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:je(this.#D),this.#h=this.#D===document.documentElement?window.innerHeight:le(this.#D),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#j())}#ae({client:t}){!this.#o||!this.#F||(this.#e=this.#p,this.#p=this.#J({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#j())}#me(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080}#he({spinY:t=0}){if(!ve[this.#N](this.#A))return;this.#o=!1;let r=this.#me(),o=nt(t,-1,1);this.#t+=o*this.#M*r,this.#j()}#de({target:t,client:r}){ve[this.#N](this.#A)&&(t===this.#b||rs(this.#b,t))&&(this.#u=this.#t,this.#o=!0,this.#e=this.#J({x:r?.x??0,y:r?.y??0}),this.#p=this.#J({x:r?.x??0,y:r?.y??0}))}#ve(){this.#o=!1}#q({target:t,client:r,preventDefault:o}){if((t===this.#b||rs(this.#b,t))&&this.#o&&this.#F){o(),this.#e=this.#p,this.#p=this.#J({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#j()}}#X({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#N](this.#A)&&(this.#oe(),t===this.#b||rs(this.#b,t))){this.#o=!1,n?.(),ir();let s=Math.abs(this.#U-o),i=Math.abs(this.#G-r),a=this.#te&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#me();this.#t+=nt(a,-1,1)*this.#M*nt(c,1,10),this.#j(),this.#G=r,this.#U=o}}move(t){return ve[this.#N](this.#A)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){ve[this.#N](this.#A)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#j(){let t=this.#t*100/this.#c;this.#i=nt(t,0,100),this.#t=nt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#S?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#H({target:t,preventDefault:r}){ve[this.#N](this.#A)&&(t===this.#b||rs(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#J({x:t,y:r}){return!t||!r?0:this.#R===b.DIRECTION_VERTICAL?r:t}refresh(){if(!ve[this.#N](this.#A)){this.#ee(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ie(),this.#Q(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#Y?.({shouldScroll:this.#re()}),this.#E.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#ee(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#x(),this.#y(),this.#v(),this.#T(),this.#I(),this.#P(),this.#k(),this.#_?.destroy(),this.#_=null,this.#E.forEach(t=>{t?.destroy?.()}),this.#E=[],this.#$=te,this.#S=te,this.#Y=te,this.#z=te,this.#L&&(this.#b?.removeEventListener("wheel",this.#W),this.#b?.removeEventListener("mousemove",this.#B),this.#b?.removeEventListener("touchmove",this.#B)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Ny=!1,VI=new Set(["scrollerN0","scrollerN1"]),Py=()=>{let e=document.querySelector("#root");e&&(sc({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{ir(),Iy()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Ny=VI.has(t),u.useFrameIndex(()=>{if(Ny){Gu();return}!My()&&sc({rootElement:e}),Zs()},30)}))};function Ay(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var oe=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},At=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Ut(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var Oy=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var $y,Ly={},WI="./asset/svg/icons/",jI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],ar=()=>$y,zn=()=>Ly,Dy=async()=>{let{success:e,data:t}=await At({source:"./data/common.json"});e||console.warn("data fail to load"),$y=t},Fy=async()=>{let e=jI.map(({name:r,source:o})=>oe({source:`${WI}${o}`}).then(n=>({name:r,result:n})));Ly=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var By=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Vy=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var zI=e=>e<10?`0${e}`:`${e}`,Wy=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Vy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${zI(l)}</span
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
    </div>`};var jy=m.createComponent({tag:"layout-links",component:Wy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([jy]);var cc=async({props:e})=>{let{source:t}=e,{data:r}=await At({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var zy=()=>g`
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
    `;var lc=m.createComponent({tag:"doc-container",component:zy});var Hy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var uc=m.createComponent({tag:"doc-title",component:Hy,state:{}});var Uy=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var pc=m.createComponent({tag:"doc-title-small",component:Uy,state:{}});var mT=IC(pT(),1);var np=mT.default;var hT="[A-Za-z$_][0-9A-Za-z$_]*",AM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],OM=["true","false","null","undefined","NaN","Infinity"],dT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],fT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],gT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],$M=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],LM=[].concat(gT,dT,fT);function bT(e){let t=e.regex,r=(F,{after:V})=>{let B="</"+F[0].slice(1);return F.input.indexOf(B,V)!==-1},o=hT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(F,V)=>{let B=F[0].length+F.index,z=F.input[B];if(z==="<"||z===","){V.ignoreMatch();return}z===">"&&(r(F,{after:B})||V.ignoreMatch());let ee,ae=F.input.substring(B);if(ee=ae.match(/^\s*=/)){V.ignoreMatch();return}if((ee=ae.match(/^\s+extends\s+/))&&ee.index===0){V.ignoreMatch();return}}},a={$pattern:hT,keyword:AM,literal:OM,built_in:LM,"variable.language":$M},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},w=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,{match:/\$\d+/},h];f.contains=w.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(w)});let x=[].concat(_,f.contains),E=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E},P={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...dT,...fT]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},N={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},R={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function O(F){return t.concat("(?!",F.join("|"),")")}let D={match:t.concat(/\b/,O([...gT,"super","import"].map(F=>`${F}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,_,{match:/\$\d+/},h,A,{scope:"attr",match:o+t.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},N,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},D,R,P,L,{match:/\$[(.]/}]}}np.registerLanguage("javascript",bT);var vT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await oe({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,np.highlightElement(e),e.style.height=""},DM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),yT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=DM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await vT({ref:d,source:a.source}):vT({ref:d,source:a.source}),()=>{}}),g`<div
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
    </div>`};var TT=m.createComponent({tag:"mob-snippet",component:yT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var ii="debug_component",gc="debug_filter_list",bc="debug_overlay",vc="debug_tree",ai="quick_nav",ci="scroll_down_label",li="scroll_to",_T="header",yc="mob_navigation",ui="mob_navigation_container",Tc="search_overlay",pi="search_overlay_list",Wo="search_overlay_header",_c="right-sidebar",Sc="route-loader";var ST=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(li)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},xT=e=>{m.useMethodByName(li)?.setActiveLabel?.(e)};function FM({label:e}){return e?.length>0}var BM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),ST({id:e,label:t,element:r,isSection:o,isNote:n}),Pp(r)&&!o&&xT(t)},CT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{FM({label:s})&&BM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var ET=m.createComponent({tag:"mob-spacer",component:CT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var wT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;Nr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var IT=m.createComponent({tag:"anchor-button",component:wT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var VM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),MT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${VM({items:o,links:n})}
    </ul>`};var kT=m.createComponent({tag:"mob-list",component:MT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var RT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var NT=m.createComponent({tag:"mob-paragraph",component:RT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var WM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",PT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${WM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var AT=m.createComponent({tag:"mob-title",component:PT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var jM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),zM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await At({source:e});return r?o.data:[]},OT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await zM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${jM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var HM=async({proxi:e})=>{let{success:t,data:r}=await oe({source:e.url});t&&(e.source=r)},$T=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{HM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var LT=m.createComponent({tag:"doc-svg",component:$T,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var xc=m.createComponent({tag:"html-content",component:OT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[kT,NT,AT,TT,ET,IT,LT]});var DT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var FT=m.createComponent({tag:"scroll-to-button",component:DT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var mi=!1;function UM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;mi=!0,r.activeLabel=i,await Nr.to(c),setTimeout(()=>{mi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var BT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},VT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:v,isNote:y}])}),s("setActiveLabel",h=>{mi||(c.activeLabel=h)}),e(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:be(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=be(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{mi||BT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{mi||BT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>UM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var WT=m.createComponent({tag:"scroll-to",component:VT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[FT]});var Cc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var Ec=e=>{m.useMethodByName(_c)?.updateList(e??[])};m.useComponent([lc,pc,WT,uc,xc]);var Be=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return Ec(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Cc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${li}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([lc,pc,uc,xc]);var ie=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return Ec(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Cc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var jT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:v})=>{v||d==="backward"||o(2)},1.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(3)},5.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(4)},9.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(1)},1.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(2)},5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{s.ax=d,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=w,s.dy=x,s.ex=E,s.ey=I,s.fx=P,s.fy=A,s.gx=$,s.gy=N});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{i.ax=d,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=w,i.dy=x,i.ex=E,i.ey=I,i.fx=P,i.fy=A,i.gx=$,i.gy=N});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Ut(-3,3),ay:()=>Ut(-3,3),bx:()=>Ut(-3,3),by:()=>Ut(-3,3),cx:()=>Ut(-3,3),cy:()=>Ut(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Ut(-3,3),fy:()=>Ut(-3,3),gx:()=>Ut(-3,3),gy:()=>Ut(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},w={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${w.x}% ${w.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Ke.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>je(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>je(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var zT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Ke.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Ke.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var wc=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Ke.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var HT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h})=>{let f=new WeakRef(t),d=new WeakRef(i),v=new WeakRef(a),y=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:w,pathTimeline:x,pathTween:E,stopLoop:I,destroy:P}=jT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:A,title2parallax:$,title1tween:N,title2tween:R}=zT({title_1:n,title_2:s}),{sectionContentScroller:O,destroy:D}=wc({title:d}),{sectionContentScroller:k,destroy:L}=wc({title:v}),{sectionContentScroller:C,destroy:M}=wc({title:y}),F=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,children:[_,A,$,O,k,C],onUpdate:({value:V})=>{p(V),h()}});return F.init(),setTimeout(()=>{F?.refresh?.()},500),{goTo:V=>{!V&&V!==0||F?.move?.(V).catch(()=>{})},destroy:()=>{F.destroy(),F=null,w.destroy(),_.destroy(),x.destroy(),E.destroy(),A.destroy(),$.destroy(),N.destroy(),R.destroy(),O.destroy(),k.destroy(),I(),P(),D(),L(),M()}}};var UT=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var di=()=>{},hi=e=>Promise.resolve(e),Ic=()=>{},sp={1:0,2:100/3,3:100/3*2,4:100},GM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},qM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},JM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},YM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},XM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{di(sp[o]),Ic()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,KM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,GT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:w}=r(),{svg:x}=o(),E=0,I=!1,P=0,{svgSpring:A,destroySvgSpring:$}=UT({elements:x});hi=async O=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs(O/30);Number.isNaN(k)||await A.goTo({x:k}).catch(()=>{})},Ic=()=>{hi(3e3),setTimeout(()=>{hi(0)},500)};let{destroy:N,goTo:R}=HT({screenElement:h,scrollerElement:f,pathElement:w,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,setActiveItem:O=>{c.activenavItem=O},onMove:O=>{I||(E=O),I=!0,P=E-O,hi(P)},onScrollEnd:u.useDebounce(()=>{I=!1,P=0,hi(P)},500)});return di=R,c.isMounted=!0,()=>{di=()=>{},N(),$()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${KM()}</div>
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
                    ${GM({setRef:t,getState:n})}
                    ${qM({setRef:t,getState:n})}
                    ${JM({setRef:t,getState:n})}
                    ${YM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{di(sp[ue.clamp(c.activenavItem-1,1,4)]),Ic()}})}
        ></button>
        ${XM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{di(sp[ue.clamp(c.activenavItem+1,1,4)]),Ic()}})}
        ></button>
    </div>`};var qT=m.createComponent({tag:"about-component",component:GT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ue.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([qT]);var JT=async()=>{let{data:e}=await At({source:"./data/about/index.json"}),{data:t}=await oe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var YT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var Mc=m.createComponent({tag:"benchmark-fake-component",component:YT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[Mc]});var ap=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},fi=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},ip=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?ap(fi(t)):fi(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},dt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);ip({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);ip({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{ip({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var XT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${dt({setRef:i,getRef:a,proxi:h,delegateEvents:t,bindEffect:l})}

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
    </div>`};var KT=m.createComponent({tag:"benchmark-invalidate",component:XT,...ht()});var kc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var QT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${kc()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var ZT=m.createComponent({tag:"benchmark-repeat-key",component:QT,...ht()});var e_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var t_=m.createComponent({tag:"benchmark-repeat-key-nested",component:e_,...ht(31)});var r_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${kc()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var o_=m.createComponent({tag:"benchmark-repeat-no-key",component:r_,...ht()});var Ot=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var cp=({value:e,useShuffle:t=!1})=>{Ot.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ot.set("data",t?ap(fi(e)):fi(e)),await m.tick();let n=performance.now()-r;Ot.set("time",n),Ot.set("isLoading",!1)})},2)},n_=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);cp({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);cp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();cp({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ot.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var s_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Ot.set("data",[]),Ot.set("time",0),Ot.set("counter",0)}),g`<div class="benchmark">
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
            ${n_({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

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
    </div>`};var i_=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:s_,bindStore:Ot,child:[Mc]});var a_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var c_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:a_,...ht(31)});var Rc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var l_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Rc(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var u_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:l_,...ht(1001)});var p_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Rc(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var m_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:p_,...ht(1001)});m.useComponent([KT,o_,ZT,t_,c_,i_,u_,m_]);var Ar=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var Se=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ai);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ai);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var ft=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},gt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},fo=e=>"roundRect"in e;var go=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,v=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:v,centerX:d+o/2,centerY:v+n/2,offsetXCenter:QM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:ZM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},QM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,ZM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var h_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=h?S:v,w=fo(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,E=i?x.map((R,O)=>({...R,scale:1,rotate:0,hasFill:o.includes(O)})).toSorted(R=>R.hasFill?-1:1).toReversed():x.map((R,O)=>{let D=o.includes(O);return{...R,scale:1,rotate:0,hasFill:D}}),I=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});E.forEach(R=>{I.subscribeCache(({scale:O,rotate:D})=>{R.rotate=D,R.scale=O})});let P=()=>{if(!v)return;let R=e.width,O=e.height,D=h?S:v;D&&(h&&T?(T.width=R,T.height=O):D.reset(),E.forEach(({x:k,y:L,width:C,height:M,rotate:F,scale:V,hasFill:B,offsetXCenter:z,offsetYCenter:ee})=>{let ae=Math.PI/180*F,q=Math.cos(ae)*V,ne=Math.sin(ae)*V;D.setTransform(q,ne,-ne,q,Math.floor(z+k),Math.floor(ee+L));let re=Math.round(-C/2),ce=Math.round(-M/2);w?(D.beginPath(),D.roundRect(re,ce,C,M,150)):(D.beginPath(),D.rect(re,ce,C,M)),B?(D.fillStyle="#000000",D.fill()):(D.fillStyle="rgba(255, 255, 255, 1)",D.fill())}),bt({useOffscreen:h,offscreen:T,ctx:v}))},A=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(I,{scale:.2,rotate:90},{duration:1e3}).goTo(I,{scale:1},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:.3,rotate:0},{duration:500}).goTo(I,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(I,{scale:.3,rotate:0},{duration:1e3}).goTo(I,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:R,loop:O})=>{console.log(`loop end: ${R}, ${O}`)}),A.play();let $=()=>{P(),d&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let N=Z.watch("navigationIsOpen",R=>{if(R){A?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(A?.resume(),u.useFrame(()=>$()))},500)});return()=>{I.destroy(),A.destroy(),N(),I=null,A=null,v=null,T=null,S=null,x=[],d=!1,E=null,f=null}};var lp=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var up=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=h_({canvas:t().canvas,...lp[e.currentParamsId].params,disableOffcanvas:!0})};function ek({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return lp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,up({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var d_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{up({proxi:i,getRef:r})})});let a=u.useResize(()=>{up({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    ${ek({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var f_=m.createComponent({tag:"animatedpattern-n0",component:d_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([f_]);var g_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var pp=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:t}),p=!0,{top:h,left:f}=be(e),d=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=go({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((O,D)=>({...O,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(D)})).toSorted(O=>O.hasFill?-1:1),w=U.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(O=>{w.subscribeCache(({mouseX:D,mouseY:k})=>{O.mouseX=D,O.mouseY=k})});let x=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(O=>{x.subscribeCache(({scale:D})=>{O.scale=D})});let E=()=>{if(!d)return;let O=e.width,D=e.height,k=c?T:d;k&&(c&&y?(y.width=O,y.height=D):k.reset(),_.forEach(({x:L,y:C,width:M,height:F,mouseX:V,mouseY:B,scale:z,hasFill:ee,offsetXCenter:ae,offsetYCenter:q})=>{if(!ee)return;let ne=V-(e.width-(M+i)*s)/2,re=B-(e.height-(F+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Q=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Q+z),Ae=Math.sin(ye)*(Q+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-F/2),M,F),k.fillStyle="#000000",k.fill()}),k.globalCompositeOperation="destination-out",_.forEach(({x:L,y:C,width:M,height:F,mouseX:V,mouseY:B,scale:z,hasFill:ee,offsetXCenter:ae,offsetYCenter:q})=>{if(ee)return;let ne=V-(e.width-(M+i)*s)/2,re=B-(e.height-(F+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Q=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Q+z),Ae=Math.sin(ye)*(Q+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-F/2),M,F),k.fill()}),bt({useOffscreen:c,offscreen:y,ctx:d}))},I=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});I.play();let P=({x:O,y:D})=>{w.goTo({mouseX:O-f,mouseY:D-h}).catch(()=>{})},A=u.useMouseMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),$=u.useTouchMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),N=()=>{E(),p&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let R=Z.watch("navigationIsOpen",O=>{if(O){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(I?.play(),u.useFrame(()=>N()))},500)});return()=>{x.destroy(),I.destroy(),w.destroy(),A(),$(),R(),x=null,I=null,w=null,d=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var b_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=pp({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=pp({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var v_=m.createComponent({tag:"animatedpattern-n1",component:b_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([v_]);var y_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var T_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:t}),v=!0,y=e.getContext(d,{alpha:!0}),{top:T,left:S}=be(e),_=m.getActiveRoute(),{offscreen:w,offScreenCtx:x}=gt({useOffscreen:f,canvas:e}),E=!0;e.width=e.clientWidth,e.height=e.clientHeight;let I=[...Array.from({length:19}).keys()].map((V,B)=>{let z=B>=9.5?9.5+(9.5-B):B,ee=s.includes(B)?1:z*i;return{width:z*o,height:z*n,x:0,y:0,hasFill:s.includes(B),opacity:ee,radius:a,rotate:0,relativeIndex:z,scale:1}}),P=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=I.map(V=>P.subscribeCache(({rotate:B})=>{V.rotate=B})),$=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});I.forEach(V=>{$.subscribeCache(({x:B,y:z})=>{V.x=B,V.y=z,V.scale=h})});let N=()=>{if(!y)return;let V=e.width,B=e.height,z=e.width/2,ee=e.height/2,ae=I.length,q=f?x:y;q&&(f&&w?(w.width=V,w.height=B):q.reset(),I.forEach(({width:ne,height:re,x:ce,y:Oe,rotate:Je,hasFill:Q,opacity:ye,scale:ke},Ae)=>{let Ye=ae-Ae,$e=Math.max(1,ke/4),Or=1,$t=Math.PI/180*Je,Y=Math.cos($t)*Or,$r=Math.sin($t)*Or;q.setTransform(Y,$r,-$r,Y,z+ce+Ye*ce/20,ee+Oe+Ye*Oe/20);let Ve=Math.round(-ne/2)*$e,xe=Math.round(-re/2)*$e;E?(q.beginPath(),q.roundRect(Ve,xe,ne*$e,re*$e,130)):(q.beginPath(),q.rect(Ve,xe,ne*$e,re*$e)),Q?q.fillStyle="#000":(q.fillStyle=`rgba(238, 238, 238, ${ye})`,q.strokeStyle=`rgba(0, 0, 0, ${ye})`,q.stroke()),q.fill()}),bt({useOffscreen:f,offscreen:w,ctx:y}))},R=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});R.goTo(P,{rotate:360},{duration:p}),R.play();let O=()=>{N(),v&&u.useNextFrame(()=>O())};u.useFrame(()=>O());let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=be(e).top,S=be(e).left,N()}),k=ue.useVelocity(({speed:V})=>{h=V}),L=({x:V,y:B})=>{let z=window.innerWidth,ee=window.innerHeight,ae=V-e.width/2-S,q=B-e.height/2-T;$.goTo({x:ue.clamp(ae,-z/2+400+S,z/2-400-S),y:ue.clamp(q,-ee/2+200+T,ee/2-200-T)}).catch(()=>{})},C=u.useMouseMove(({client:V})=>{let{x:B,y:z}=V;L({x:B,y:z})}),M=u.useTouchMove(({client:V})=>{let{x:B,y:z}=V;L({x:B,y:z})}),F=Z.watch("navigationIsOpen",V=>{if(V){v=!1,R?.pause(),P?.pause(),$?.pause();return}setTimeout(()=>{v=!0,m.getActiveRoute().route===_.route&&(R?.resume(),P?.resume(),$?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{P.destroy(),$.destroy(),R.destroy(),D(),C(),M(),k(),F(),A.forEach(V=>{V()}),A.length=0,P=null,$=null,R=null,y=null,w=null,x=null,v=!1,I=null,d=null},stopBlackOne:()=>{s.forEach(V=>{A[V]?.()})}}};function tk({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
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
    </li>`}var __=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=T_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
                    ${tk({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var S_=m.createComponent({tag:"caterpillar-n1",component:__,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([S_]);var x_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var mp=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},C_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:t.disableOffcanvas}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=!0,w=[...Array.from({length:20}).keys()].map((N,R)=>{let O=R>=10?10+(10-R):R,D=o+o/3*O,k=n+n/3*O,L=s.includes(R)?1:(20-R)*i;return{width:D,height:k,x:0,y:0,hasFill:s.includes(R),opacity:L,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:N,direction:R})=>{mp({isForced:N,direction:R,value:1})},1).add(({isForced:N,direction:R})=>{mp({isForced:N,direction:R,value:5})},5).add(({isForced:N,direction:R})=>{mp({isForced:N,direction:R,value:9})},9);w.forEach(N=>{x.subscribeCache(({x:R,rotate:O})=>{let D=R/p,k=2/(3-Math.cos(2*D)),L=k*Math.cos(D)*a,C=k*Math.sin(2*D)/2*c;N.x=L,N.y=C,N.rotate=O})});let E=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);E.onLoopEnd(({loop:N,direction:R})=>{console.log(`loop end: ${N} , ${R}`)});let I=()=>{if(!v)return;let N=e.width,R=e.height,O=e.width/2,D=e.height/2,k=h?S:v;k&&(h&&T?(T.width=N,T.height=R):k.reset(),w.forEach(({width:L,height:C,x:M,y:F,rotate:V,hasFill:B,opacity:z})=>{let ae=Math.PI/180*V,q=Math.cos(ae)*1,ne=Math.sin(ae)*1;k.setTransform(q,ne,-ne,q,O+M,D+F);let re=Math.round(-L/2),ce=Math.round(-C/2);_?(k.beginPath(),k.roundRect(re,ce,L,C,[40,40])):(k.beginPath(),k.rect(re,ce,L,C)),B?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${z})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill()}),bt({useOffscreen:h,offscreen:T,ctx:v}))},P=()=>{I(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>P()),E.play();let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,I()}),$=Z.watch("navigationIsOpen",N=>{if(N){d=!1,E?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(E?.resume(),u.useFrame(()=>P()))},500)});return{destroy:()=>{d=!1,A(),$(),x.destroy(),x=null,E.destroy(),E=null,v=null,T=null,S=null,w=null,f=null},play:()=>{E.play()},playReverse:()=>{E.playReverse()},playUseCurrent:()=>{E.play({useCurrent:!0})},playReverseUseCurrent:()=>{E.playReverse({useCurrent:!0})},playFromLabel:()=>{E.playFrom("mylabel")},plaFromLabelReverse:()=>{E.playFromReverse("mylabel")},stop:()=>E.stop(),pause:()=>E.pause(),resume:()=>E.resume(),reverse:()=>E.reverse()}};function rk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var E_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=C_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
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
                        ${rk({buttons:a.buttons})}
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
    `};var ok={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},w_=m.createComponent({tag:"caterpillar-n2",component:E_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:ok,type:"Any"})}});m.useComponent([w_]);var I_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var Nc=()=>{m.useMethodByName(ci).update(!0)},Pc=()=>{m.useMethodByName(ci).update(!1)};var M_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,v=U.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:e}),w=h?_:y,x=fo(w);w=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=go({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})).toSorted(D=>D.hasFill?-1:1):E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})),P=U.createStaggers({items:I,stagger:r}),A=P.map(({item:D,start:k,end:L})=>{let C=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:k,end:L,ease:"easeInOutQuad"}),M=C.subscribe(({scale:F})=>{D.scale=F});return v.add(C),{sequencer:C,unsubscribe:M}}),$=()=>{if(!y)return;let D=e.width,k=e.height,L=h?_:y;L&&(h&&S?(S.width=D,S.height=k):L.reset(),I.forEach(({x:C,y:M,width:F,height:V,rotate:B,scale:z,hasFill:ee,offsetXCenter:ae,offsetYCenter:q})=>{let ne=Math.PI/180*B,re=Math.cos(ne)*z,ce=Math.sin(ne)*z;L.setTransform(re,ce,-ce,re,Math.floor(ae+C),Math.floor(q+M));let Oe=Math.round(-F/2),Je=Math.round(-V/2);x?(L.beginPath(),L.roundRect(Oe,Je,F,V,150)):(L.beginPath(),L.rect(Oe,Je,F,V)),ee?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:S,ctx:y}))},N=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},reverse:!1,ease:!0,easeType:"lerp"});N.init();let R=()=>{$(),d&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let O=Z.watch("navigationIsOpen",D=>{if(D){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>R())},500)});return()=>{O(),A.forEach(({sequencer:D,unsubscribe:k})=>{D.destroy(),k()}),A=[],v.destroy(),v=null,P=[],N.destroy(),N=null,y=null,S=null,_=null,E=[],d=!1,I=null,f=null}};var hp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var dp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=M_({canvas:t().canvas,canvasScroller:t().canvasScroller,...hp[e.currentParamsId].params,disableOffcanvas:!0})};function nk({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return hp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,dp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var k_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{Nc(),u.useFrame(()=>{u.useNextTick(()=>{dp({proxi:i,getRef:r})})});let a=u.useResize(()=>{dp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},Pc(),a()}}),g`
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
                    ${nk({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var R_=m.createComponent({tag:"scroller-n0",component:k_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([R_]);var N_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function sk({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function ik({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var P_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:p,canvas:e}),S=p?T:d,_=fo(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:17}).keys()].map((N,R)=>{let O=R>=8.5?8.5+(8.5-R):R;return{width:Math.floor(sk({width:15,relativeIndex:O,amountOfPath:17})),height:Math.floor(ik({height:30,relativeIndex:O,amountOfPath:17})),opacity:O*.09,hasFill:l.has(R),rotate:0,relativeIndex:O,index:R}}),x=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});w.forEach(N=>{x.subscribeCache(({rotate:R})=>{N.rotate=R})});let E=()=>{if(!d)return;let N=e.width,R=e.height,O=e.width/2,D=e.height/2,k=p?T:d;k&&(p&&y?(y.width=N,y.height=R):k.reset(),w.forEach(({width:L,height:C,opacity:M,rotate:F,index:V,hasFill:B})=>{let z=w.length/2-V,ee=1,ae=Math.PI/180*(F-33),q=Math.cos(ae)*ee,ne=Math.sin(ae)*ee;k.setTransform(q,ne,-ne,q,O,D+z*19),_?(k.beginPath(),k.roundRect(-L/2,-C/2+z*19,L,C,150)):(k.beginPath(),k.rect(Math.round(-L/2),Math.round(-C/2),L,C)),B?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${M})`,k.strokeStyle=`rgba(0, 0, 0, ${M})`,k.stroke()),k.fill()}),bt({useOffscreen:p,offscreen:y,ctx:d}))},I=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},ease:!0,easeType:"spring"});I.init();let P=()=>{E(),f&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),$=Z.watch("navigationIsOpen",N=>{if(N){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>P())},500)});return()=>{x.destroy(),A(),$(),x.destroy(),x=null,I.destroy(),I=null,d=null,y=null,T=null,x=null,f=!1,w=null,h=null}};function ak({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
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
    </li>`}var A_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};Nc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=P_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),Pc(),c=null}}),g`
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
                    ${ak({proxi:a,delegateEvents:s,bindObject:i})}
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
    `};var O_=m.createComponent({tag:"scroller-n1",component:A_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([O_]);var $_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var L_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Gn=m.createComponent({tag:"dynamic-list-button",component:L_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Ac=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],D_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],F_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],B_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],qn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var ck=[{buttonLabel:"sample1",data:D_},{buttonLabel:"salmple2",data:F_},{buttonLabel:"sample3",data:B_},{buttonLabel:"Initial",data:Ac}],lk=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function uk({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return ck.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function pk({bindProps:e,staticProps:t,proxi:r}){return lk.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var V_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${uk({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${pk({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function mk({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var W_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>mk({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function hk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var dk=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${hk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,j_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{d=d<qn.length-1?d+1:0,f.innerData=qn[d],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>dk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var z_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var Oc=m.createComponent({tag:"dynamic-list-card-inner",component:z_,props:{key:()=>({value:"",type:String})}});var H_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var U_=m.createComponent({tag:"dynamic-list-counter",component:H_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var G_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var q_=m.createComponent({tag:"dynamic-list-empty",component:G_});var J_=m.createComponent({tag:"dynamic-list-card",component:j_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:qn[0],type:Array}),innerDataUnivoque:()=>({value:qn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[U_,q_,Oc,Gn]});var Y_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var X_=m.createComponent({tag:"dynamic-slotted-label",component:Y_,props:{label:()=>({value:"",type:String})}});var K_=m.createComponent({tag:"dynamic-list-repeater",component:W_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[J_,X_]});var Q_=m.createComponent({tag:"dynamic-list",component:V_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Ac,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Gn,K_,Oc]});m.useComponent([Q_]);var Z_=()=>g` <dynamic-list> </dynamic-list> `;var eS=({refs:e})=>{let t=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var fk=async({playIntro:e,playSvg:t})=>{await e(),t()},tS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=eS({refs:s});return setTimeout(()=>{fk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var rS=m.createComponent({tag:"home-component",component:tS,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var bo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),Oy(r)};m.useComponent([rS]);var oS=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>bo({svg:e,id:d}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var nS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function gk(e){return Math.floor(Math.random()*e)}var $c=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${nS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:gk(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Jn=e=>{m.useMethodByName(e).toggleActive()};var sS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Jn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Jn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var iS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${sS({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var aS=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${$c({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${iS({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var cS=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var lS=m.createComponent({tag:"matrioska-item",component:cS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var uS=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Jn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Jn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var pS=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${uS({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var mS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${$c({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${pS({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var bk=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},hS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?bk(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Gn,lS]},dS=m.createComponent({tag:"page-matrioska-repeat",component:aS,...hS}),fS=m.createComponent({tag:"page-matrioska-invalidate",component:mS,...hS});m.useComponent([dS,fS]);var gS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,bS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var fp=0,vk=({indicators:e,proxi:t})=>[...e].map((r,o)=>Ke.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+fp-je(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),vS=({pins:e})=>{e.forEach(t=>t.refresh())},yk=({titles:e})=>[...e].map(t=>Ke.createParallax({item:t,propierties:"x",reverse:!0,range:9})),yS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},TS=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},_S=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=vk({indicators:e,proxi:n}),a=yk({titles:t}),c=document.querySelector(".l-navcontainer__side");fp=je(c)/2;let l=u.useResize(()=>{fp=je(c)/2}),p=new ri({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{vS({pins:i}),yS({nav:r})},onEnterBack:()=>{vS({pins:i}),yS({nav:r})},onLeave:()=>{TS({nav:r})},onLeaveBack:()=>{TS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Tk=(e,t)=>e===0?1:e===t-1?-1:0,_k=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Sk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),SS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=_S({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=be(T),_=le(T),w=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),E=2e3,P=1+(l-x)/l*.9,A=x/l*E*P;Nr.to(w+Tk(v,l),{duration:A})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${Sk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${_k({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var xS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var CS=m.createComponent({tag:"horizontal-scroller-button",component:xS,props:{id:()=>({value:-1,type:Number})}});var ES=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var wS=m.createComponent({tag:"horizontal-scroller-section",component:ES,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var IS=m.createComponent({tag:"horizontal-scroller",component:SS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[CS,wS]});m.useComponent([IS]);var MS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var kS=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var RS=m.createComponent({tag:"svg-star",component:kS,props:{fill:()=>({value:"#000000",type:String})}});var xk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,NS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${xk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var Ck=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",gp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${Ck({debug:o,id:s.id})}
                ${gp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var bp=({element:e})=>({height:le(e),width:je(e),offSetLeft:be(e).left,offSetTop:be(e).top}),PS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),AS=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Yn=()=>{},OS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,v=0,y=0,T=0,S=0,_=!1,w=!1,x={x:0,y:0},E=0,I=Yn,P=Yn,A=Yn,$=Yn,N=Yn,R=Yn,O=[],D=U.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{_=!1},L=()=>{let{vw:B,vh:z}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},ee=x.x,ae=x.y,{xgap:q,ygap:ne}=_?w?(w=!1,{xgap:0,ygap:0}):{xgap:ee-v,ygap:ae-T}:{xgap:0,ygap:0};_&&(y+=q,S+=ne);let{xInMotion:re,yInMotion:ce}=_?{xInMotion:y,yInMotion:S}:{xInMotion:ee,yInMotion:ae},{ax:Oe,ay:Je}=l.centerToViewoport||l.drag?{ax:-(B/2-re)/l.xDepth,ay:(z/2-ce)/l.yDepth}:{ax:-(B/2-(re-f))/l.xDepth,ay:(z/2-(ce-d))/l.yDepth};v=ee,T=ae;let Q=Oe>l.xLimit||Oe<-l.xLimit,ye=Je>l.yLimit||Je<-l.yLimit;Q&&(y-=q),ye&&(S-=ne);let ke=ue.clamp(Oe,-l.xLimit,l.xLimit),Ae=ue.clamp(Je,-l.yLimit,l.yLimit),Ye=Math.hypot(Math.abs(Ae),Math.abs(ke));D.goTo({delta:Ye,ax:ke,ay:Ae}).catch(()=>{}),O.forEach($e=>{$e({delta:Ye,factor:l.factor})})},C=B=>{E!==B&&(x.y-=E,E=B,x.y+=E),L()},M=({page:B})=>B.y>d&&B.y<d+p&&B.x>f&&B.x<f+h,F=({page:B})=>{M({page:B})&&(_=!0,w=!0)},V=()=>{R(),R=l.useScroll?u.useScroll(({scrollY:B})=>{C(B)}):()=>{}};return e(({element:B})=>{let{container:z}=r();l.afterInit(B);let ee=D.subscribe(({delta:re,ax:ce,ay:Oe})=>{z.style.transform=`translate3D(0,0,0) rotateY(${ce}deg) rotateX(${Oe}deg)`,"onUpdate"in l&&l.onUpdate({delta:re,deltaX:ce,deltaY:Oe})}),ae=D.onComplete(({ax:re,ay:ce})=>{z.style.transform=`rotateY(${re}deg) rotateX(${ce}deg)`}),q=u.useMouseMove(({page:re})=>{x={x:re.x,y:re.y},L()}),ne=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=bp({element:B}))});return o(()=>l.drag,re=>{if(N(),$(),A(),P(),I(),re){y=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:ce})=>{F({page:ce})}),P=u.useTouchEnd(()=>{k()}),A=u.useMouseDown(({page:ce})=>{F({page:ce})}),$=u.useMouseUp(()=>{k()}),N=u.useTouchMove(({page:ce})=>{x={x:ce.x,y:ce.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(re,ce)=>{if(re){V();return}re!==ce&&R()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=bp({element:B})),x={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{ee(),ae(),ne(),q(),R(),I(),P(),A(),$(),N(),D.destroy(),O=[],D=null,p=null,h=null,f=null,d=null,v=null,y=null,T=null,S=null,_=null,w=null,x=null,E=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{O=PS({childrenId:c})},render:()=>gp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var vp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),$S=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var Ek=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,wk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=vp(l),h=vp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:v}=$S(f);a.goTo({depth:c,rotateX:d,rotateY:v}).catch(()=>{})},LS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:v,classList:y,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,w=`--item-height:${l};`,x=`--offset-x:${p};`,E=`--offset-y:${h};`,I=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:P,factor:A})=>{s&&wk({delta:P,factor:A,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:P})=>{let A=I.subscribe(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translate3D(0,0,${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),$=I.onComplete(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translateZ(${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),N=v;return P.style.transform=`translateZ(${N}px)`,()=>{A(),$(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${w}${x}${E}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${Ek({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var DS=m.createComponent({tag:"move-3d-item",component:LS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Xn=m.createComponent({tag:"move-3d",component:OS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[DS]});var FS=m.createComponent({tag:"move-3d-page",component:NS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Xn]});m.useComponent([FS,RS]);var BS=async({props:e})=>{let{data:t,drag:r,prevRoute:o,nextRoute:n}=e,{data:s}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:t,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=AS({ratio:1980}),VS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var WS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:VS,drag:!0}};var jS=({getState:e})=>{let{content:t}=e();return g`${t}`};var Kn=m.createComponent({tag:"any-component",component:jS,props:{content:()=>({value:"",type:String})}});var zS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,v=d-n,y=f-s;if(Math.hypot(y,v)>10){n=d,s=f;let _=Math.atan2(v,y)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var Ik=5,HS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=zn(),n=[...Array.from({length:Ik}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=zS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Lc=m.createComponent({tag:"mouse-trail",component:HS});var US=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Xn,Kn,Lc]);var GS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await oe({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,v,y,T,S,_,w,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(E=>bo({svg:e,id:E}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:US({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:w,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var qS=()=>ue.mq("min","desktop"),JS="#home",yp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(yp=m.getActiveParams(),JS=e)});var YS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=qS(),e(()=>{let s=u.useResize(()=>{n.active=qS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:JS,params:yp??{}})}),()=>{s(),yp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var XS=m.createComponent({tag:"only-desktop-cta",component:YS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([XS]);var KS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var Tp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:e}),l=r?c:s,p=fo(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,v=window.innerHeight/20,T=go({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:v,gutter:1}).items,S=T.map(L=>({...L,scale:1,rotate:0})),_=({row:L,col:C})=>{let M=(f+1)*L;return S[M+C]},x={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},P=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=U.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),$=U.createSpring({data:I});S.forEach(L=>{P.subscribeCache(({scale:C,rotate:M})=>{L.rotate=M,L.scale=C})}),A.subscribe(L=>{x=L}),$.subscribe(L=>{I=L});let N=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});N.goTo(P,{scale:.2,rotate:90},{duration:1e3});let R=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});R.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo($,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo($,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo($,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let O=()=>{if(!s)return;let L=e.width,C=e.height,M=r?c:s;if(M){r&&a?(a.width=L,a.height=C):M.reset(),S.forEach(({x:F,y:V,width:B,height:z,rotate:ee,scale:ae,offsetXCenter:q,offsetYCenter:ne},re)=>{if(re===40){let ke=Math.PI/180*x.rotate,Ae=Math.cos(ke)*x.scale,Ye=Math.sin(ke)*x.scale;M.setTransform(Ae,Ye,-Ye,Ae,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(M.beginPath(),M.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(M.beginPath(),M.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),M.fillStyle="#000000",M.fill()}let ce=Math.PI/180*ee,Oe=Math.cos(ce)*ae,Je=Math.sin(ce)*ae;M.setTransform(Oe,Je,-Je,Oe,Math.floor(q+F),Math.floor(ne+V));let Q=Math.round(-B/2),ye=Math.round(-z/2);p?(M.beginPath(),M.roundRect(Q,ye,B,z,150)):(M.beginPath(),M.rect(Q,ye,B,z)),M.fillStyle="rgba(238, 238, 238, 0.9)",M.fill()});{let F=Math.PI/180*I.rotate,V=Math.cos(F)*I.scale,B=Math.sin(F)*I.scale;M.setTransform(V,B,-B,V,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(M.beginPath(),M.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),150)):(M.beginPath(),M.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),M.fillStyle="#a86464",M.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},D=()=>{O(),n&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let k=Z.watch("navigationIsOpen",u.useDebounce(L=>{if(L){R.pause(),N.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(R.resume(),N.resume(),n=!0,u.useFrame(()=>D()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,P?.destroy?.(),A?.destroy?.(),$?.destroy?.(),R?.destroy?.(),N?.destroy?.(),S=null,x=null,I=null,o=null,P=null,A=null,$=null,R=null,N=null},play:()=>{R.play(),N.isActive()||N.play()},playReverse:()=>{R.playReverse(),N.isActive()||N.play()},playFromLabel:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},playFromLabelReverse:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},revertNext:()=>{R.reverseNext()},pause:()=>{R.pause(),N.pause()},resume:()=>{R.resume(),N.resume()},stop:()=>{R.stop(),N.stop()}}};function Mk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var QS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=Tp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=Tp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
                        ${Mk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var kk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},ZS=m.createComponent({tag:"async-timeline",component:QS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:kk,type:"Any"})}});m.useComponent([ZS]);var ex=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var tx=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Xn,Kn,Lc]);var rx=async()=>{let{data:e}=await oe({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>bo({svg:e,id:v}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:tx({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var ox=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Ke.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var nx=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=ox({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var sx=m.createComponent({tag:"mobbu-2025",component:nx,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([sx]);var ix=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>bo({svg:e,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${Ca({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var ax="TOP-LEFT",cx="TOP-RIGHT",lx="BOTTOM-LEFT",ux="BOTTOM-RIGHT",px="CENTER";var Rk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},mx=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],v=d.map(Q=>{let ye=window.innerWidth,ke=window.innerHeight,Ae=Q.offsetWidth,Ye=Q.offsetHeight,$e=Rk(Q),Or=s-s*Ae/(ye*h)-$e,$t=s-s*Ye/(ke*h)-$e;return Math.min(Or,$t)}),y=()=>{d.forEach((Q,ye)=>{let ke=_>v[ye];Q.classList.toggle("hide",ke)})},T=0,S=0,_=0,w=0,x=0,E=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,A=t.offsetHeight,$=(E-P)/2,N=(I-A)/2,R={x:0,y:0},O=!1,D=!1,k=30,L=()=>{if(i&&s>0){let Q=s/(s-_);$=(E-P/Q)/2,N=(I-A/Q)/2}else $=(E-P)/2,N=(I-A)/2};L();let C={xValue:0,yValue:0},M=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case ax:{C={xValue:$,yValue:N},S=E,T=I;break}case cx:{C={xValue:-$,yValue:N},S=-E,T=I;break}case lx:{C={xValue:$,yValue:-N},S=E,T=-I;break}case ux:{C={xValue:-$,yValue:-N},S=-E,T=-I;break}}let F=M.subscribe(({x:Q,y:ye,z:ke})=>{r&&(r.style.transform=`translate3D(${Q}px, ${ye}px, ${ke}px)`)});M.set({x:C.xValue,y:C.yValue}),[...t.querySelectorAll("a, button")].forEach(Q=>{Q.setAttribute("draggable","false"),Q.style.userSelect="none"});let B=({page:Q})=>{O=!0,D=!0,R={x:Q.x,y:Q.y}},z=({page:Q})=>{let{x:ye,y:ke}=Q,{xgap:Ae,ygap:Ye}=O?D?(D=!1,{xgap:0,ygap:0}):{xgap:ye-w,ygap:ke-x}:{xgap:0,ygap:0},$e=$>0?ue.clamp(S+Ae,-$,$):ue.clamp(S+Ae,$,-$),Or=N>0?ue.clamp(T+Ye,-N,N):ue.clamp(T+Ye,N,-N),$t=O?$e:S,Y=O?Or:T,{xComputed:$r,yComputed:Ve}=O?{xComputed:$t,yComputed:Y}:{xComputed:ye,yComputed:ke};S=$t,T=Y,w=ye,x=ke,O&&(C={xValue:$r,yValue:Ve},M.goTo({x:$r,y:Ve}).catch(()=>{}))},ee=u.useTouchStart(({page:Q,target:ye})=>{B({page:Q,target:ye})}),ae=u.useMouseDown(({page:Q,target:ye})=>{B({page:Q,target:ye})}),q=u.useTouchEnd(()=>{O=!1}),ne=u.useMouseUp(()=>{O=!1}),re=u.useMouseMove(({page:Q})=>{z({page:Q})}),ce=u.useTouchMove(({page:Q})=>{z({page:Q})});f&&f.addEventListener("click",Q=>{let{x:ye,y:ke}=R,Ae=Math.abs(w-ye)>k,Ye=Math.abs(x-ke)>k;(Ae||Ye)&&Q.preventDefault()},!1),i&&f&&f.addEventListener("wheel",Q=>{let{spinY:ye}=u.normalizeWheel(Q);_=ue.clamp(_+ye*p,a,c),L(),S=$>0?ue.clamp(S,-$,$):ue.clamp(S,$,-$),T=N>0?ue.clamp(T,-N,N):ue.clamp(T,N,-N),l({depth:_}),M.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Oe=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Je=u.useResize(()=>{E=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,A=t.offsetHeight,L()});return{destroy:()=>{F(),ee(),q(),ae(),ne(),re(),ce(),Je(),Oe(),M.destroy(),M=null,f=null,d=null,t=null,r=null}}};var hx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=mx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var dx=m.createComponent({tag:"c-dragger",component:hx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:px,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([dx,Kn]);var fx=!1,gx=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{fx&&console.log(n)},onDepthChange:({depth:n})=>{fx&&console.log(n)}})}
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
    </div>`};var bx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>le(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let S=y.firstChild;h.subscribeCache(({angleInRadian:_,scale:w})=>{let x=a+c*_,E=x*Math.cos(_),I=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${E-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${w}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let w=i/S*_,x=a+c*w,E=y+x*Math.cos(w),I=T+x*Math.sin(w);_===0?o.moveTo(E,I):o.lineTo(E,I)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),v(),o=null,h=null,f=null,e=null}}};var vx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(t)/2-100,a=e.map(d=>le(d)/2);e.forEach((d,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var yx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>le(d)/2),s=je(t)/2-100,i=le(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,v)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,w=2/(3-Math.cos(2*_)),x=w*Math.cos(_)*s,E=w*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${E-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),w=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+w,v+x):o.lineTo(d+w,v+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function Nk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var Tx=(e,t)=>t===0?e:Tx(t,e%t);function Pk(e,t){let r=Tx(e,t),o=t/r;return 2*Math.PI*o}var _x=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(t)-100)/2,p=n/s,h=Pk(n,s),f=Nk(l,p,h),d=i*(f/l),v=e.map(P=>le(P)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let w=0;T.forEach(P=>{let A=P/h*10,$=Math.abs((A-w)/2);w=A;let N=Math.max(0,A-$),R=A,O=Math.min(10,A+$);O>N&&(y.goTo({scale:0},{start:N,end:R,ease:"easeInQuad"}),y.goTo({scale:1},{start:R,end:O,ease:"easeOutQuad"}))}),e.forEach((P,A)=>{let $=P.firstChild;y.subscribeCache(({angleInRadian:N,scale:R})=>{let O=l*Math.cos(p*N),D=O*Math.cos(N),k=O*Math.sin(N);P.style.transform=`translate3D(0px,0px,0px) translate(${D-v[A]}px, ${k-v[A]}px)`,$&&($.style.scale=`${R}`)})});let x=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function E(){if(!c||!r)return;let P=r.width/2,A=r.height/2,$=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let N=0;N<=$;N++){let R=h/$*N,O=l*Math.cos(p*R),D=P+O*Math.cos(R),k=A+O*Math.sin(R);N===0?c.moveTo(D,k):c.lineTo(D,k)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,E()});return E(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),I(),c=null,y=null,x=null,e=null}}};var Sx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=je(t)-200,s=le(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>le(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:w,scale:x})=>{let E=Math.sign(w-T)||1,I=Math.sin(w/a)*s*E;v.style.transform=`translate3D(0px,0px,0px) translate(${w+_}px, ${I-l[y]}px)`,S&&(S.style.scale=`${x}`),T=w})});let h=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:w,y:x}=(()=>{if(_<=T){let E=_/T*n,I=Math.sin(E/a)*s;return{x:E,y:I}}if(_>T){let I=(S-_)/T*n,P=Math.sin(I/a)*s*-1;return{x:I,y:P}}return{x:0,y:0}})();_===0?o.moveTo(v+w-n/2,y+x):o.lineTo(v+w-n/2,y+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var _p={sin:Sx,circle:vx,infinite:yx,archimede:bx,rosaDiGrandi:_x};var xx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var Cx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=xx(),{destroy:f,play:d,stop:v,resume:y}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:v,resume:y}=_p[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let w=u.useResize(()=>{v(),f(),{destroy:f,play:d,stop:v,resume:y}=_p[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),w(),f=null,d=null,v=null,y=null}}),g`<div class="c-math">
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
    </div>`};var Dc=m.createComponent({tag:"math-animation",component:Cx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Dc]);var Ex=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Ak=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,wx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Ak({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var Ix=m.createComponent({tag:"rosa-di-grandi-page",component:wx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Dc]});m.useComponent([Ix]);var Mx=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var xp="home",Bc="about",K="template-mobJs-component",Ne="template-doc-default",Qn="template-listing",lt="template-animation",vt="template-test",Vc=new Set([K,Ne]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Qe=[{url:"./#mobJs-overview",title:"mobJs"}],Sp=[{url:"./#mobCore-overview",title:"mobCore"}],cr=[{url:"./#mobMotion-overview",title:"mobMotion"}],Fc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],X=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],Gt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Wc=[{hash:"pageNotFound",layout:By,props:{}},{hash:"onlyDesktop",layout:KS,props:{}},{hash:"about",layout:JT,templateName:Bc,props:{}},{hash:"canvas-overview",layout:cc,templateName:Qn,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:g_,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:y_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:x_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:I_,templateName:lt,props:{}},{hash:"async-timeline",layout:ex,templateName:lt,props:{}},{hash:"scrollerN0",layout:N_,templateName:lt,props:{}},{hash:"scrollerN1",layout:$_,templateName:lt,props:{}},{hash:"dynamic-list",layout:Z_,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Qe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:gS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:bS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:oS,templateName:xp,props:{}},{hash:"mobCore-overview",layout:Be,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Fc}},{hash:"mobCore-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:Sp,section:"mobCore",rightSidebar:Fc}},{hash:"mobCore-events",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:Sp,section:"mobCore",rightSidebar:Fc}},{hash:"mobCore-store",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:Sp,section:"mobCore",rightSidebar:Fc}},{hash:"mobJs-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:X}},{hash:"mobJs-initialization",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-component",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-routing",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-benchmark-invalidate",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Qe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-memory-management",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-debug",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Qe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-onMount",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-getState",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-setState",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-updateState",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-getProxi",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-watch",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-staticProps",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-dataAttribute",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bindProps",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bindEvents",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-delegateEvents",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bindtext",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bindObject",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bind-effect",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-methods",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-useMethodByName",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-setStateByName",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-updateStateByName",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-refs",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-runtime",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-repeat",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-invalidate",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-web-component",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-slot",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-unBind",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-emit",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-emitAsync",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-computed",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-bindStore",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-removeDom",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-remove",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-getChildren",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-freezeProp",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-unFreezeProp",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-getParentId",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-watchParent",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-instanceName",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobJs-class-list",templateName:K,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:X}},{hash:"mobMotion-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-parallax",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-sequencer",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-scrolltrigger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-sync-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-create-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-async-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-tween-spring-lerp",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"horizontalScroller",layout:MS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:BS,props:WS.shape1},{hash:"plugin-dragger",layout:gx,templateName:lt,props:{}},{hash:"math-animation-01",layout:Ex,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:Mx,templateName:lt,props:{}},{hash:"plugin-overview",layout:cc,templateName:Qn,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:cc,templateName:Qn,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:GS,templateName:lt,props:{}},{hash:"mob-02",layout:ix,templateName:lt,props:{}},{hash:"rdp-01",layout:rx,templateName:lt,props:{}}];var kx=0;m.beforeRouteChange(()=>{kx=window.scrollY});var Ok=new Set([K,Ne,Qn,Bc,vt]),$k=new Set([K,Ne,Qn,Bc,xp,vt]),Rx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Ok.has(t)?"var(--header-height)":"0",e.style.left=$k.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${kx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Nx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Px=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Ax=()=>{Px(),u.useResize(()=>{Px()})};var Zn="reset",lr="tree",bi="filter_component";var ur=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(t),s=le(e),i=je(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var es=u.createStore({currentId:()=>({value:"",type:String})});var Ox=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",$x=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Lk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Dk=e=>e?e.map(t=>`${t}, `).join(""):"",Lx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Fk=({getState:e})=>{let{id:t}=e();if(t===Zn)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Ox(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${$x(r.methods)}</div>
        <div><strong>refs:</strong>: ${$x(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${Lk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Ox(r?.repeaterInnerWrap?.classList)}
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
            ${Dk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Lx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Lx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Bk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Dx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,es.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:v}=Bk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Fk({getState:r})})}
        </div>
    </div>`};var Fx=m.createComponent({tag:"debug-component",component:Dx,state:{id:()=>({value:Zn,type:String,skipEqual:!1})}});var Bx=e=>{m.useMethodByName(gc)?.refreshList?.({testString:e})};var Cp=async(e="")=>{await m.tick(),Bx(e)},Vx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(Cp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;Cp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;Cp(s)}})}
        >
            find
        </button>
    </div>`);var Wx=m.createComponent({tag:"debug-filter-head",component:Vx});var Vk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},jx=e=>`~${e}`,Wk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${jx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${jx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},zx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Wk({testString:y}),await m.tick(),d?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:v}=await Vk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},v=()=>{},f=()=>{}}}),g`
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
    `};var pr=e=>{m.useMethodByName(ii)?.updateId(e)},Hx=()=>{m.useMethodByName(ii)?.refreshId()};var Ux=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{pr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Gx=m.createComponent({tag:"debug-filter-list-item",component:Ux,bindStore:es,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var qx=m.createComponent({tag:"debug-filter-list",component:zx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Gx]});var Jx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Yx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;pr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;pr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);pr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);pr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",pr(Zn)}})}
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
                    ${r({click:()=>{Hx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Xx=m.createComponent({tag:"debug-search",component:Yx});var Kx=m.createComponent({tag:"debug-head",component:Jx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Xx]});var jc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",vn),console.log("currentListValueMap",Ss),console.log("activeRepeatMap",_n),console.log("onMountCallbackMap",Cs),console.log("staticPropsMap",Sn),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",qr.size),console.log("invalidateIdsMap",tt),console.log("invalidateInstancesMap",Te),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",rt),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",id()),console.log("slotPlaceholderSize",Ki()),console.log("bindTextPlaceholderMapSize",Pd()),console.log("instanceMap",jr)};var Qx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=lr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{jc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===bi&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=lr}})}
                            ${n({toggleClass:{active:()=>a.listType===lr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=bi}})}
                            ${n({toggleClass:{active:()=>a.listType===bi}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`
                                    <debug-tree
                                        name="${vc}"
                                    ></debug-tree>
                                `:a.listType===bi&&a.active?g`
                                    <debug-filter-list
                                        name="${gc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${ii}"></debug-component>
            </div>
        </div>
    </div>`};var zc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var jk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Zx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await jk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>zc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var e0=()=>{m.useMethodByName(vc)?.refresh()};var zk=e=>e>0?`( ${e} ) `:"",t0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>t0({id:i,value:t}))},r0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>t0({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=Pr.subscribe(h);return Pr.reset(h),s(()=>l.isOpen,async d=>{await Pr[d?"down":"up"](h),e0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${zk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{pr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${zc({data:l.children,staticProps:t})}
        </div>
    </div>`};var o0=m.createComponent({tag:"debug-tree-item",component:r0,bindStore:es,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var n0=m.createComponent({tag:"debug-tree",component:Zx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[o0]});var s0=m.createComponent({tag:"debug-overlay",component:Qx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:lr,type:String})},child:[n0,Fx,Kx,Wx,qx]});var Ep=()=>{},Hc=()=>{},Uc=()=>{},Gc=()=>{},Hk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),i0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=ar(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),v=!1;d.addEventListener("input",()=>{Uc?.(d.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Gc();return}({init:Ep,destroy:Hc,move:Uc,updateScroller:Gc}=ur({screen:h,scroller:f,scrollbar:d})),v=!0,Ep(),Gc(),Uc(0)}_.length===0&&(l.hide=!0,Hc?.(),v=!1)});return()=>{Hc?.(),y(),Ep=()=>{},Hc=()=>{},Uc=()=>{},Gc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Hk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var a0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var c0=m.createComponent({tag:"links-mobjs-button",component:a0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var l0=m.createComponent({tag:"links-mobjs",component:i0,child:[c0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var u0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,v=null}}),g`<div
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
    </div>`};var p0=m.createComponent({tag:"quick-nav",component:u0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Uk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),m0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Vc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Uk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var h0=m.createComponent({tag:"right-sidebar",component:m0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var d0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var f0=m.createComponent({tag:"route-loader",component:d0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var g0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var b0=m.createComponent({tag:"scroll-down-label",component:g0,state:{active:()=>({value:!1,type:Boolean})}});var v0=()=>{m.useMethodByName(Wo)?.setInputFocus()},wp=e=>{m.useMethodByName(Wo)?.updateCurrentSearchFromSuggestion(e)},y0=e=>{m.useMethodByName(Wo)?.shouldCloseSuggestion(e)},qc=()=>{m.useMethodByName(Wo)?.closeSuggestion()};var T0=({proxi:e})=>{e.active=!1,qc()},Gk=({target:e})=>{e&&y0(e)},_0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{T0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{T0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Gk({target:a.target})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${Wo}"
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
                    name="${pi}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var S0=e=>{m.useMethodByName(pi)?.update(e)},x0=()=>{m.useMethodByName(pi)?.reset()};var qk=async({currentSearch:e})=>{S0(e)},Ip=({getRef:e})=>{let{search_input:t}=e(),r=t.value;qk({currentSearch:r})},C0=({getRef:e,proxi:t})=>{x0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},E0=e=>`~${e}`,Jk=({currentSearch:e,proxi:t})=>{let o=ar().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${E0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${E0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},w0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Ip({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Jk({currentSearch:h,proxi:l})},60)})}
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
            ${e({click:()=>{Ip({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Ip({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{C0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&C0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var I0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var Yk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){wp(t);return}if(e.toLowerCase()==="escape"){qc();return}},M0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{wp(o.word)},keydown:n=>{n.preventDefault(),Yk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var k0=m.createComponent({tag:"search-overlay-suggestion-item",component:M0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var R0=m.createComponent({tag:"search-overlay-suggestion",component:I0,props:{list:()=>({value:[],type:Array})},child:[k0]});var N0=m.createComponent({tag:"search-overlay-header",component:w0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[R0]});var Xk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Kk=new Set(["mob-title","mob-paragraph","mob-list"]),Qk=new Set(["mob-title","mob-paragraph"]),Zk=new Set(["mob-list"]),P0=async({currentSearch:e=""})=>{let t=Wc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Xk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>Kk.has(y)).flatMap(y=>Qk.has(y?.component)?y.content:Zk.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var eR=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},A0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await P0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:v,refresh:y}=eR({getRef:o});return h=v,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Jc=()=>{m.useMethodByName(Tc)?.toggle()};var tR=({uri:e})=>{m.loadUrl({url:e}),Jc()},O0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{tR({uri:n.uri})}})}
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
    `};var $0=m.createComponent({tag:"search-overlay-list-item",component:O0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var L0=m.createComponent({tag:"search-overlay-list",component:A0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[$0]});var D0=m.createComponent({tag:"search-overlay",component:_0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[N0,L0]});var F0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var B0=m.createComponent({tag:"test-scss-grid",component:F0});var vo=()=>{let{templateName:e}=m.getActiveRoute();return Vc.has(e)?0:40};var V0=()=>{m.useMethodByName(bc)?.toggle()};var rR=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],oR=()=>g`
        <ul class="l-footer__bio">
            ${rR.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,W0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${oR()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{V0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{jc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var j0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var z0=m.createComponent({tag:"debug-button",component:j0});var H0=m.createComponent({tag:"mob-footer",component:W0,child:[z0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Yc=()=>{m.useMethodByName(ui)?.scrollTop()},Xc=()=>{m.useMethodByName(ui)?.refresh()};var ts=({fireCallback:e=!0}={})=>{m.useMethodByName(yc)?.closeAllAccordion({fireCallback:e})};function nR(){m.loadUrl({url:"home"}),ts(),Z.set("navigationIsOpen",!1),Yc()}var U0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
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
                        ${e({click:()=>{nR()}})}
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
    `};var G0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{Z.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ht()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var q0=m.createComponent({tag:"mob-header-toggle",component:G0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var sR=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function iR({delegateEvents:e}){let t=ar().header,{links:r}=t,o={github:zn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{sR({event:c})}})}
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
            </li>`}).join("")}var J0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${iR({delegateEvents:e})}
        </ul>
    `;var aR=()=>{Jc(),v0()},Y0=({delegateEvents:e})=>{let t=zn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{aR()}})}
    >
        ${t}
    </button>`};var X0=m.createComponent({tag:"search-cta",component:Y0});var K0=m.createComponent({tag:"mob-header-utils",component:J0,child:[X0]});var cR=({delegateEvents:e,staticProps:t})=>ar().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),Q0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${cR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var Z0=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var eC=m.createComponent({tag:"header-main-menu-button",component:Z0,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var tC=m.createComponent({tag:"header-main-menu",component:Q0,child:[eC],state:{isMounted:()=>({value:!1,type:Boolean})}});var rC=m.createComponent({tag:"mob-header",component:U0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[tC,K0,q0]});var Mp=0,oC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(Mp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${Mp})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=le(r),h=le(c),f=le(l),v=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(v)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${Mp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function lR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function uR({main:e,proxi:t}){Xc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function pR({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),Ht()})}var mR=()=>{Yc(),ts();let{navigationIsOpen:e}=Z.get();e||Nr.to(0)},nC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){uR({main:a,proxi:s});return}lR({main:a,proxi:s})}),pR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=oC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
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
                    ${r({click:()=>{mR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${yc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function hR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:v}=n;return p?g`
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
                  `}).join("")}var sC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=ar();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${hR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var iC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var aC=m.createComponent({tag:"mob-navigation-label",component:iC,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function dR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var cC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return Pr.subscribe(h),Pr.reset(h),o(()=>a.isOpen,async f=>{await Pr[f?"down":"up"](h),Xc(),!f&&ts({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${dR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var lC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===y&&S,w=f.includes(d);o.isCurrent=_||w,_&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Kc=m.createComponent({tag:"mob-navigation-button",component:lC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var uC=m.createComponent({tag:"mob-navigation-submenu",component:cC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Kc]});var pC=m.createComponent({tag:"mob-navigation",component:sC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[aC,uC,Kc]});var mC=m.createComponent({tag:"mob-navigation-container",component:nC,child:[pC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([rC,mC,H0,p0,f0,b0,l0,s0,B0,D0,h0]);var hC=async()=>g`
        ${""}
        <debug-overlay name="${bc}"></debug-overlay>
        <mob-header name="${_T}"></mob-header>
        <mob-navigation-container
            name="${ui}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ai}"></quick-nav>
        <route-loader name="${Sc}"></route-loader>
        <scroll-down-label name="${ci}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${_c}"></right-sidebar>
        <search-overlay name="${Tc}"></search-overlay>
    `;var kp=0,Rp=document.querySelector(".js-main-loader-track"),dC=(e=60)=>{let t=()=>{if(kp++,!Rp)return;let r=100*kp/e;if(Rp.style.transform=`scaleX(${r/100})`,kp>=e){Rp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var fC=e=>{m.useMethodByName(Sc).skip(e)};var gC=60,bC=()=>ue.mq("max","desktop"),fR=()=>{u.useResize(()=>{bC()&&m.loadUrl({url:"onlyDesktop"})})},Zc=document.body.querySelector(".js-main-loader"),el=document.body.querySelector(".js-main-loader-background"),Qc=U.createTimeTween({data:{opacity:1},duration:1e3});Zc&&el&&[Zc,el].forEach(e=>{Qc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var gR=async()=>{await Dy(),await Fy(),dC(gC),await u.useFps({duration:gC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:hC,routes:Wc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Rx,pageTransition:Nx,afterInit:async()=>{await Qc.goTo({opacity:0}),Qc.destroy(),Qc=null,Zc?.remove(),el?.remove(),Zc=null,el=null,Ax(),fR(),fC(!1)},redirect:({route:e})=>bC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Ay(),ue.setDefault({deferredNextTick:!0,throttle:100}),gR(),Py()});})();
//# sourceMappingURL=main.js.map
