"use strict";(()=>{var wE=Object.create;var al=Object.defineProperty;var IE=Object.getOwnPropertyDescriptor;var ME=Object.getOwnPropertyNames;var RE=Object.getPrototypeOf,NE=Object.prototype.hasOwnProperty;var PE=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var r in t)al(e,r,{get:t[r],enumerable:!0})},kE=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ME(t))!NE.call(e,n)&&n!==r&&al(e,n,{get:()=>t[n],enumerable:!(o=IE(t,n))||o.enumerable});return e};var AE=(e,t,r)=>(r=e!=null?wE(RE(e)):{},kE(t||!e||!e.__esModule?al(r,"default",{value:e,enumerable:!0}):r,e));var gT=PE((NJ,fT)=>{function oT(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&oT(r)}),e}var gc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function nT(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ho(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var XM="</span>",Ky=e=>!!e.scope,KM=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},tp=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=nT(t)}openNode(t){if(!Ky(t))return;let r=KM(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Ky(t)&&(this.buffer+=XM)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Qy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},rp=class e{constructor(){this.rootNode=Qy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Qy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},op=class extends rp{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new tp(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ai(e){return e?typeof e=="string"?e:e.source:null}function sT(e){return zo("(?=",e,")")}function QM(e){return zo("(?:",e,")*")}function ZM(e){return zo("(?:",e,")?")}function zo(...e){return e.map(r=>ai(r)).join("")}function eR(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function sp(...e){return"("+(eR(e).capture?"":"?:")+e.map(o=>ai(o)).join("|")+")"}function iT(e){return new RegExp(e.toString()+"|").exec("").length-1}function tR(e,t){let r=e&&e.exec(t);return r&&r.index===0}var rR=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ip(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=ai(o),i="";for(;s.length>0;){let a=rR.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var oR=/\b\B/,aT="[a-zA-Z]\\w*",ap="[a-zA-Z_]\\w*",cT="\\b\\d+(\\.\\d+)?",lT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",uT="\\b(0b[01]+)",nR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",sR=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=zo(t,/.*\b/,e.binary,/\b.*/)),ho({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},ci={begin:"\\\\[\\s\\S]",relevance:0},iR={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ci]},aR={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ci]},cR={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},vc=function(e,t,r={}){let o=ho({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=sp("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},lR=vc("//","$"),uR=vc("/\\*","\\*/"),pR=vc("#","$"),mR={scope:"number",begin:cT,relevance:0},hR={scope:"number",begin:lT,relevance:0},dR={scope:"number",begin:uT,relevance:0},fR={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ci,{begin:/\[/,end:/\]/,relevance:0,contains:[ci]}]},gR={scope:"title",begin:aT,relevance:0},bR={scope:"title",begin:ap,relevance:0},vR={begin:"\\.\\s*"+ap,relevance:0},yR=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},fc=Object.freeze({__proto__:null,APOS_STRING_MODE:iR,BACKSLASH_ESCAPE:ci,BINARY_NUMBER_MODE:dR,BINARY_NUMBER_RE:uT,COMMENT:vc,C_BLOCK_COMMENT_MODE:uR,C_LINE_COMMENT_MODE:lR,C_NUMBER_MODE:hR,C_NUMBER_RE:lT,END_SAME_AS_BEGIN:yR,HASH_COMMENT_MODE:pR,IDENT_RE:aT,MATCH_NOTHING_RE:oR,METHOD_GUARD:vR,NUMBER_MODE:mR,NUMBER_RE:cT,PHRASAL_WORDS_MODE:cR,QUOTE_STRING_MODE:aR,REGEXP_MODE:fR,RE_STARTERS_RE:nR,SHEBANG:sR,TITLE_MODE:gR,UNDERSCORE_IDENT_RE:ap,UNDERSCORE_TITLE_MODE:bR});function TR(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function SR(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function xR(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=TR,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function CR(e,t){Array.isArray(e.illegal)&&(e.illegal=sp(...e.illegal))}function ER(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function wR(e,t){e.relevance===void 0&&(e.relevance=1)}var IR=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=zo(r.beforeMatch,sT(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},MR=["of","and","for","in","not","or","if","then","parent","list","value"],RR="keyword";function pT(e,t,r=RR){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,pT(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,NR(c[0],c[1])]})}}function NR(e,t){return t?Number(t):PR(e)?0:1}function PR(e){return MR.includes(e.toLowerCase())}var Zy={},jo=e=>{console.error(e)},eT=(e,...t)=>{console.log(`WARN: ${e}`,...t)},qn=(e,t)=>{Zy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Zy[`${e}/${t}`]=!0)},bc=new Error;function mT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=iT(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function kR(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),bc;if(typeof e.beginScope!="object"||e.beginScope===null)throw jo("beginScope must be object"),bc;mT(e,e.begin,{key:"beginScope"}),e.begin=ip(e.begin,{joinWith:""})}}function AR(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),bc;if(typeof e.endScope!="object"||e.endScope===null)throw jo("endScope must be object"),bc;mT(e,e.end,{key:"endScope"}),e.end=ip(e.end,{joinWith:""})}}function OR(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function _R(e){OR(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),kR(e),AR(e)}function $R(e){function t(i,a){return new RegExp(ai(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=iT(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(ip(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[SR,ER,_R,IR].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[xR,CR,wR].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=pT(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=ai(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return LR(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ho(e.classNameAliases||{}),s(e)}function hT(e){return e?e.endsWithParent||hT(e.starts):!1}function LR(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ho(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:hT(e)?ho(e,{starts:e.starts?ho(e.starts):null}):Object.isFrozen(e)?ho(e):e}var DR="11.11.1",np=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},ep=nT,tT=ho,rT=Symbol("nomatch"),FR=7,dT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:op};function c(E){return a.noHighlightRe.test(E)}function l(E){let R=E.className+" ";R+=E.parentNode?E.parentNode.className:"";let B=a.languageDetectRe.exec(R);if(B){let V=O(B[1]);return V||(eT(s.replace("{}",B[1])),eT("Falling back to no-highlight mode for this block.",E)),V?B[1]:"no-highlight"}return R.split(/\s+/).find(V=>c(V)||O(V))}function p(E,R,B){let V="",F="";typeof R=="object"?(V=E,B=R.ignoreIllegals,F=R.language):(qn("10.7.0","highlight(lang, code, ...args) has been deprecated."),qn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),F=E,V=R),B===void 0&&(B=!0);let z={code:V,language:F};N("before:highlight",z);let te=z.result?z.result:h(z.language,z.code,B);return te.code=z.code,N("after:highlight",te),te}function h(E,R,B,V){let F=Object.create(null);function z(W,G){return W.keywords[G]}function te(){if(!Y.keywords){Ve.addText(Ce);return}let W=0;Y.keywordPatternRe.lastIndex=0;let G=Y.keywordPatternRe.exec(Ce),me="";for(;G;){me+=Ce.substring(W,G.index);let Ee=$e.case_insensitive?G[0].toLowerCase():G[0],nt=z(Y,Ee);if(nt){let[mr,CE]=nt;if(Ve.addText(me),me="",F[Ee]=(F[Ee]||0)+1,F[Ee]<=FR&&(Si+=CE),mr.startsWith("_"))me+=G[0];else{let EE=$e.classNameAliases[mr]||mr;ne(G[0],EE)}}else me+=G[0];W=Y.keywordPatternRe.lastIndex,G=Y.keywordPatternRe.exec(Ce)}me+=Ce.substring(W),Ve.addText(me)}function ae(){if(Ce==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){Ve.addText(Ce);return}W=h(Y.subLanguage,Ce,!0,$r[Y.subLanguage]),$r[Y.subLanguage]=W._top}else W=d(Ce,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(Si+=W.relevance),Ve.__addSublanguage(W._emitter,W.language)}function q(){Y.subLanguage!=null?ae():te(),Ce=""}function ne(W,G){W!==""&&(Ve.startScope(G),Ve.addText(W),Ve.endScope())}function re(W,G){let me=1,Ee=G.length-1;for(;me<=Ee;){if(!W._emit[me]){me++;continue}let nt=$e.classNameAliases[W[me]]||W[me],mr=G[me];nt?ne(mr,nt):(Ce=mr,te(),Ce=""),me++}}function ce(W,G){return W.scope&&typeof W.scope=="string"&&Ve.openNode($e.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ne(Ce,$e.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Ce=""):W.beginScope._multi&&(re(W.beginScope,G),Ce="")),Y=Object.create(W,{parent:{value:Y}}),Y}function _e(W,G,me){let Ee=tR(W.endRe,me);if(Ee){if(W["on:end"]){let nt=new gc(W);W["on:end"](G,nt),nt.isMatchIgnored&&(Ee=!1)}if(Ee){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return _e(W.parent,G,me)}function Ye(W){return Y.matcher.regexIndex===0?(Ce+=W[0],1):(il=!0,0)}function Z(W){let G=W[0],me=W.rule,Ee=new gc(me),nt=[me.__beforeBegin,me["on:begin"]];for(let mr of nt)if(mr&&(mr(W,Ee),Ee.isMatchIgnored))return Ye(G);return me.skip?Ce+=G:(me.excludeBegin&&(Ce+=G),q(),!me.returnBegin&&!me.excludeBegin&&(Ce=G)),ce(me,W),me.returnBegin?0:G.length}function ye(W){let G=W[0],me=R.substring(W.index),Ee=_e(Y,W,me);if(!Ee)return rT;let nt=Y;Y.endScope&&Y.endScope._wrap?(q(),ne(G,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(q(),re(Y.endScope,W)):nt.skip?Ce+=G:(nt.returnEnd||nt.excludeEnd||(Ce+=G),q(),nt.excludeEnd&&(Ce=G));do Y.scope&&Ve.closeNode(),!Y.skip&&!Y.subLanguage&&(Si+=Y.relevance),Y=Y.parent;while(Y!==Ee.parent);return Ee.starts&&ce(Ee.starts,W),nt.returnEnd?0:G.length}function Ne(){let W=[];for(let G=Y;G!==$e;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Ve.openNode(G))}let Oe={};function Xe(W,G){let me=G&&G[0];if(Ce+=W,me==null)return q(),0;if(Oe.type==="begin"&&G.type==="end"&&Oe.index===G.index&&me===""){if(Ce+=R.slice(G.index,G.index+1),!n){let Ee=new Error(`0 width match regex (${E})`);throw Ee.languageName=E,Ee.badRule=Oe.rule,Ee}return 1}if(Oe=G,G.type==="begin")return Z(G);if(G.type==="illegal"&&!B){let Ee=new Error('Illegal lexeme "'+me+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ee.mode=Y,Ee}else if(G.type==="end"){let Ee=ye(G);if(Ee!==rT)return Ee}if(G.type==="illegal"&&me==="")return Ce+=`
`,1;if(sl>1e5&&sl>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Ce+=me,me.length}let $e=O(E);if(!$e)throw jo(s.replace("{}",E)),new Error('Unknown language: "'+E+'"');let _r=$R($e),Lt="",Y=V||_r,$r={},Ve=new a.__emitter(a);Ne();let Ce="",Si=0,yo=0,sl=0,il=!1;try{if($e.__emitTokens)$e.__emitTokens(R,Ve);else{for(Y.matcher.considerAll();;){sl++,il?il=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=yo;let W=Y.matcher.exec(R);if(!W)break;let G=R.substring(yo,W.index),me=Xe(G,W);yo=W.index+me}Xe(R.substring(yo))}return Ve.finalize(),Lt=Ve.toHTML(),{language:E,value:Lt,relevance:Si,illegal:!1,_emitter:Ve,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:E,value:ep(R),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:R.slice(yo-100,yo+100),mode:W.mode,resultSoFar:Lt},_emitter:Ve};if(n)return{language:E,value:ep(R),illegal:!1,relevance:0,errorRaised:W,_emitter:Ve,_top:Y};throw W}}function f(E){let R={value:ep(E),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return R._emitter.addText(E),R}function d(E,R){R=R||a.languages||Object.keys(t);let B=f(E),V=R.filter(O).filter(k).map(q=>h(q,E,!1));V.unshift(B);let F=V.sort((q,ne)=>{if(q.relevance!==ne.relevance)return ne.relevance-q.relevance;if(q.language&&ne.language){if(O(q.language).supersetOf===ne.language)return 1;if(O(ne.language).supersetOf===q.language)return-1}return 0}),[z,te]=F,ae=z;return ae.secondBest=te,ae}function b(E,R,B){let V=R&&r[R]||B;E.classList.add("hljs"),E.classList.add(`language-${V}`)}function y(E){let R=null,B=l(E);if(c(B))return;if(N("before:highlightElement",{el:E,language:B}),E.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",E);return}if(E.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(E)),a.throwUnescapedHTML))throw new np("One of your code blocks includes unescaped HTML.",E.innerHTML);R=E;let V=R.textContent,F=B?p(V,{language:B,ignoreIllegals:!0}):d(V);E.innerHTML=F.value,E.dataset.highlighted="yes",b(E,B,F.language),E.result={language:F.language,re:F.relevance,relevance:F.relevance},F.secondBest&&(E.secondBest={language:F.secondBest.language,relevance:F.secondBest.relevance}),N("after:highlightElement",{el:E,result:F,text:V})}function T(E){a=tT(a,E)}let x=()=>{C(),qn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function S(){C(),qn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let I=!1;function C(){function E(){C()}if(document.readyState==="loading"){I||window.addEventListener("DOMContentLoaded",E,!1),I=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function w(E,R){let B=null;try{B=R(e)}catch(V){if(jo("Language definition for '{}' could not be registered.".replace("{}",E)),n)jo(V);else throw V;B=i}B.name||(B.name=E),t[E]=B,B.rawDefinition=R.bind(null,e),B.aliases&&$(B.aliases,{languageName:E})}function M(E){delete t[E];for(let R of Object.keys(r))r[R]===E&&delete r[R]}function A(){return Object.keys(t)}function O(E){return E=(E||"").toLowerCase(),t[E]||t[r[E]]}function $(E,{languageName:R}){typeof E=="string"&&(E=[E]),E.forEach(B=>{r[B.toLowerCase()]=R})}function k(E){let R=O(E);return R&&!R.disableAutodetect}function P(E){E["before:highlightBlock"]&&!E["before:highlightElement"]&&(E["before:highlightElement"]=R=>{E["before:highlightBlock"](Object.assign({block:R.el},R))}),E["after:highlightBlock"]&&!E["after:highlightElement"]&&(E["after:highlightElement"]=R=>{E["after:highlightBlock"](Object.assign({block:R.el},R))})}function _(E){P(E),o.push(E)}function D(E){let R=o.indexOf(E);R!==-1&&o.splice(R,1)}function N(E,R){let B=E;o.forEach(function(V){V[B]&&V[B](R)})}function L(E){return qn("10.7.0","highlightBlock will be removed entirely in v12.0"),qn("10.7.0","Please use highlightElement now."),y(E)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:C,highlightElement:y,highlightBlock:L,configure:T,initHighlighting:x,initHighlightingOnLoad:S,registerLanguage:w,unregisterLanguage:M,listLanguages:A,getLanguage:O,registerAliases:$,autoDetection:k,inherit:tT,addPlugin:_,removePlugin:D}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=DR,e.regex={concat:zo,lookahead:sT,either:sp,optional:ZM,anyNumberOfTimes:QM};for(let E in fc)typeof fc[E]=="object"&&oT(fc[E]);return Object.assign(e,fc),e},Jn=dT({});Jn.newInstance=()=>dT({});fT.exports=Jn;Jn.HighlightJS=Jn;Jn.default=Jn});var u={};To(u,{ANIMATION_STOP_REJECT:()=>Sl,checkType:()=>Pe,createStore:()=>Dw,debounce:()=>So,getFps:()=>Bw,getInstantFps:()=>Fw,getTime:()=>Dt,getTypeName:()=>is,getUnivoqueId:()=>Ie,mustMakeSomething:()=>Vw,normalizeWheel:()=>ms,shouldMakeSomething:()=>Ww,store:()=>gI,throttle:()=>xi,useCache:()=>Jw,useDebounce:()=>So,useFps:()=>Gw,useFrame:()=>jw,useFrameIndex:()=>Uw,useLinkedList:()=>bI,useLoad:()=>qw,useMouseClick:()=>Kw,useMouseDown:()=>Qw,useMouseMove:()=>eI,useMouseUp:()=>rI,useMouseWheel:()=>nI,useNextFrame:()=>Hw,useNextLoop:()=>Ft,useNextTick:()=>zw,usePointerDown:()=>pI,usePointerLeave:()=>fI,usePointerMove:()=>mI,usePointerOut:()=>dI,usePointerOver:()=>uI,usePointerUp:()=>hI,useResize:()=>Yw,useScroll:()=>sI,useScrollEnd:()=>lI,useScrollImmediate:()=>iI,useScrollStart:()=>cI,useScrollThrottle:()=>aI,useTouchEnd:()=>oI,useTouchMove:()=>tI,useTouchStart:()=>Zw,useVisibilityChange:()=>Xw});var Dt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),_p=16.666666666666668;var xi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Dt()-o>=t&&(e.apply(n,s),o=Dt())},t-(Dt()-o))):(e.apply(n,s),o=Dt())}};var So=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function je(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function be(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function xt(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ss(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function xo(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function cl(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var Ie=()=>`_${Math.random().toString(36).slice(2,9)}`;function $p(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var ll=(e,t,r)=>Math.min(Math.max(e,t),r);var Ci=new Set,Ft=e=>{Ci.add(e),Ci.size===1&&setTimeout(()=>{Ci.forEach(t=>{t()}),Ci.clear()})};var ul="UNTYPED",Lp="STRING",Dp="NUMBER",Fp="OBJECT",Bp="FUNCTION",Ei="ARRAY",Vp="BOOLEAN",Wp="ELEMENT",jp="HTMLELEMENT",zp="NODELIST";var Me={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},is=e=>{switch(e){case String:case Lp:return"String";case Number:case Dp:return"Number";case Object:case Fp:return"Object";case Function:case Bp:return"Function";case Array:case Ei:return"Array";case Boolean:case Vp:return"Boolean";case Element:case Wp:return"Element";case HTMLElement:case jp:return"HTMLElement";case NodeList:case zp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return ul}},Pe=(e,t)=>{switch(e){case String:case Lp:return Me.isString(t);case Number:case Dp:return Me.isNumber(t);case Object:case Fp:return Me.isObject(t);case Function:case Bp:return Me.isFunction(t);case Array:case Ei:return Me.isArray(t);case Boolean:case Vp:return Me.isBoolean(t);case Element:case Wp:return Me.isElement(t);case HTMLElement:case jp:return Me.isHTMLElement(t);case NodeList:case zp:return Me.isNodeList(t);case Set:case"SET":return Me.isSet(t);case Map:case"MAP":return Me.isMap(t);case"ANY":return!0;default:return!0}};var $E=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),LE=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),DE=(e,t)=>{if(e.length!==t.length)return!1;for(let[r,o]of e.entries())if(!as(o,t[r]))return!1;return!0},as=(e,t,r=new WeakMap)=>{if(e===t)return!0;if(e==null||t==null)return!1;let o=typeof e;if(o!==typeof t||o!=="object")return!1;if(r.has(e)&&r.get(e)?.has(t))return!0;r.has(e)||r.set(e,new WeakSet),r.get(e)?.add(t);let s=Array.isArray(e),i=Array.isArray(t);if(s!==i)return!1;if(s){if(e.length!==t.length)return!1;for(let[l,p]of e.entries())if(!as(p,t[l],r))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(e instanceof Date||t instanceof Date)return!1;if(e instanceof RegExp&&t instanceof RegExp)return e.source===t.source&&e.flags===t.flags;if(e instanceof RegExp||t instanceof RegExp)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[l,p]of e)if(!t.has(l)||!as(p,t.get(l),r))return!1;return!0}if(e instanceof Map||t instanceof Map)return!1;if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}if(e instanceof Set||t instanceof Set)return!1;let a=Object.keys(e),c=Object.keys(t);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(t,l)||!as(e[l],t[l],r))return!1;return!0},wi=(e,t,r)=>{switch(e){case"ANY":return as(t,r);case Ei:case Array:return DE(t,r);case"SET":case Set:return LE(t,r);case"MAP":case Map:return $E(t,r);default:return t===r}};var Ii="UPDATE";var Ae={};To(Ae,{extractKeysFromArray:()=>hl,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>pl,getFirstCurrentDependencies:()=>ml,initializeCurrentDependencies:()=>cs,setCurrentDependencies:()=>Ri});var Go=[],Mi=!1,cs=()=>{Mi=!0,Go.length=0},pl=()=>(Mi=!1,[...Go]),ml=()=>(Mi=!1,[...Go]?.[0]??"missing_prop"),Ri=e=>{!Mi||!e||Go.includes(e)||(Go=[...Go,e])},Lr=e=>Pe(String,e)?e:(cs(),e(),ml()),hl=e=>e.map(t=>Pe(String,t)?t:(cs(),t(),ml()));var ls=new Map,Hp=e=>{ls.delete(e)},qo=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=ls.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),ls.set(s,l),p&&Ft(()=>{let d=ls.get(s),b=d?.get(t);if(b&&b.newValue!==void 0&&b.newValue!==null)for(let y of b.callbacks)y(b.newValue,b.oldValue,b.validationValue);d?.delete(t),d?.size===0&&ls.delete(s)})}}},Up=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var FE="padding: 10px;",ze=()=>FE;var dl="store_shallow_copy",Gp=dl;var Ge=new Map,se=e=>{if(Gp===dl){let t=Ge.get(e);return t?{...t}:void 0}return Ge.get(e)},Le=(e,t)=>{Ge.set(e,t)},qp=e=>{Ge.delete(e)};var fl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Jp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Yp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Xp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Kp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${is(r)}`,o)},Qp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Zp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},em=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},tm=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},rm=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${is(o)}`,n)},om=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},gl=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},nm=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},sm=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},im=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var am=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},bl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var us=e=>{if(!Me.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>us(r)))+1},cm=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Me.isObject(o)&&t)return[r,cm(o,!1)];if(Me.isFunction(o)){let n=o();if(Me.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),lm=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Me.isObject(s)&&o)return[n,lm(s,t,r,!1)];if(Me.isFunction(s)){let i=s();if(Me.isObject(i)&&"value"in i&&t in i){let a=Me.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),um=({data:e,depth:t,logStyle:r})=>t>2?(fl(t,r),{}):cm(e),Jo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(fl(r,o),{}):lm(e,t,n),pm=({value:e})=>Pe(Map,e)?new Map(e):Pe(Set,e)?new Set(e):Pe(Object,e)?{...e}:Pe(Array,e)?[...e]:e,Dr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var BE=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:b,bindInstanceBy:y}=i,T=ze(),x=a[t]==="ANY";if(Me.isObject(r)&&!x){Yp(t,r,T);return}if(Me.isObject(l[t])&&!x){Xp(t,T);return}let S=l[t],I=c[t]?.(r,S)??r;if(!Pe(a[t],I)){Kp(t,I,a[t],T);return}let w=p[t]?.(I,S);!w&&s&&bl(t,T),!(h[t]&&!w&&n||(f[t]=w,(d[t]?wi(a[t],S,I):!1)&&!s))&&(l[t]=I,Le(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:b,prop:t,newValue:I,oldValue:S,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(A=>{hr({instanceId:A,prop:t})})))},VE=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:b,bindInstanceBy:y}=i,T=ze();if(!Me.isObject(r)){Qp(t,r,T);return}if(!Me.isObject(a[t])){Zp(t,T);return}let x=Object.keys(r),S=Object.keys(a[t]);if(!x.every(N=>S.includes(N))){em(x,t,T);return}let C=Object.fromEntries(Object.entries(r).map(N=>{let[L,E]=N,R=a[t][L];return!s&&wi(c[t][L],E,R)?[L,E]:[L,p[t][L]?.(E,R)??E]}));if(!Object.entries(C).map(N=>{let[L,E]=N,R=Pe(c[t][L],E);return R||rm(t,L,E,c[t][L],T),R}).every(N=>N===!0))return;let M=Object.entries(C).map(N=>{let[L,E]=N,R=a[t][L];return l[t][L]&&n?{strictCheck:h[t][L]?.(E,R),item:N}:{strictCheck:!0,item:N}}).filter(({strictCheck:N})=>N===!0);if(M.length===0)return;let O=Object.fromEntries(M.map(({item:N})=>N).map(([N,L])=>[N,L]));Object.entries(O).forEach(N=>{let[L,E]=N,R=a[t][L],B=h[t][L]?.(E,R);!B&&s&&bl(t,T),B===void 0&&im(T,"ANY"),f[t][L]=B});let $=a[t],k={...a[t],...O},P=Object.keys(O).every(N=>d[t][N]===!0),_=!0;for(let[N,L]of Object.entries(O)){let E=c[t][N]==="ANY";us(L)>1&&!E&&(tm(t,C,T),f[t][N]=!1,_=!1)}if(!_){Le(e,{...i,validationStatusObject:f});return}P&&Object.entries(k).every(([N,L])=>wi(c[t][N],$[N],L))&&!s||(a[t]=k,Le(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:b,prop:t,newValue:a[t],oldValue:$,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(N=>{hr({instanceId:N,prop:t})})))},dr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=se(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=ze();if(!(t in l)){Jp(t,h);return}let f=n?pm({value:l[t]}):l[t],d=i===Ii?r(f):r,b=p[t]==="ANY";if(Me.isObject(f)&&!b){VE({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}BE({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},mm=({instanceId:e,prop:t,value:r})=>{let o=se(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,Le(e,{...o,store:n}),qo({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},hm=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=se(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),WE=e=>{let t=se(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=hm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Le(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{dr({instanceId:e,prop:l,value:p,action:"SET"})})},hr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Le(e,{...r,computedPropsQueque:n}),!s)){let i=se(e);if(!i)return;Le(e,{...i,computedRunning:!0}),Ft(()=>WE(e))}},jE=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=se(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){nm(r,ze());return}s.add({prop:t,keys:r,fn:o}),Le(e,{...n,callBackComputed:s})},zE=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=se(e);if(!n)return;let{store:s,bindInstance:i}=n,a=hm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);dr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},dm=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Dr({instanceId:e,prop:t}))return;let s=r.length===0?(cs(),o({}),pl()):r;zE({instanceId:e,prop:t,keys:s,callback:o}),jE({instanceId:e,prop:t,keys:s,fn:o})};var fm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Me.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},gm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;dr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var HE=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=ze();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return sm(t,a),{state:void 0,unsubscribeId:""};let c=Ie();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},UE=({instanceId:e,unsubscribeId:t})=>{let r=se(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),Le(e,{...r,watcherByProp:o,watcherMetadata:n}))},bm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=HE({state:n,prop:t,callback:r,wait:o});return s?(Le(e,s),()=>{UE({instanceId:e,unsubscribeId:i})}):()=>{}},vm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return bm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=se(p)?.store;return h&&t in h})??"",c=bm({instanceId:a,prop:t,callback:r,wait:o}),l=se(e);return l?(Le(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=se(e);p&&Le(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var ym=e=>{let t=us(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:um({data:e,depth:t,logStyle:ze()}),type:Jo({data:e,prop:"type",depth:t,logStyle:ze(),fallback:ul}),fnTransformation:Jo({data:e,prop:"transform",depth:t,logStyle:ze(),fallback:r=>r}),fnValidate:Jo({data:e,prop:"validate",depth:t,logStyle:ze(),fallback:()=>!0}),strict:Jo({data:e,prop:"strict",depth:t,logStyle:ze(),fallback:!1}),skipEqual:Jo({data:e,prop:"skipEqual",depth:t,logStyle:ze(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var Tm=e=>{let t=se(e);if(!t)return{};let{store:r}=t;return r??{}},xm=e=>{let t=se(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?Tm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(Tm(o))))},Sm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];om(t,ze())},Cm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return Sm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return Sm({instanceId:n,prop:t})};var Em=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(qo({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})})):gl(t,ze()))},Ni=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){Em({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";Em({instanceId:n,prop:t})},wm=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Up({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})}),{success:!0}):(gl(t,ze()),{success:!1}):new Promise(a=>a({success:!1}))},Im=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return wm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return wm({instanceId:n,prop:t})};var Mm=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;return r},Rm=({instanceId:e})=>{let t=se(e);if(!t)return;let{store:r}=t;console.log(r)},Nm=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},Pm=({instanceId:e})=>{let t=se(e);console.log(t)};var GE=e=>!(e==null||!Pe(Object,e)||Pe(Map,e)||Pe(Set,e)||Pe(Function,e)),qE=e=>{let t=ze();return new Proxy({},{set(r,o,n){let s=Ge.get(e);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&am(o,t),i||a?!1:(dr({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!Ge.has(e))return;let n=Ge.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Ri(o)),!(o in n.store))for(let i of n.bindInstance){let a=Ge.get(i);if(a&&o in a.store){s=a.store[o],Ri(o);break}}if(s!==void 0)return GE(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!Ge.has(e))return!1;let n=Ge.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=Ge.get(s);if(i&&o in i.store)return!0}return!1}})},km=({instanceId:e})=>{let t=Ge.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=qE(e);return Le(e,{...t,proxiObject:r}),r};var JE=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Le(t,{...r,bindInstanceBy:n})},Am=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Le(t,{...r,bindInstanceBy:n})},YE=({bindStores:e,selfStore:t})=>{let o=[...Pe(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Om=({value:e,instanceId:t})=>{let r=se(t);if(!r)return;YE({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Pe(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Le(t,{...r,bindInstance:l}),s.forEach(p=>{JE({selfId:t,bindId:p})})};var _m=e=>{let t=Ge.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{Am({selfId:e,bindId:n})}),Hp(e),qp(e)};var $m=({instanceId:e,values:t})=>{let r=se(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Le(e,r)};var Pi=(e={})=>{let t=Ie(),r=ym(e),o=fm(r);return Le(t,o),gm(t,r),{getId:()=>t,bindStore:n=>{Om({value:n,instanceId:t})},get:()=>xm(t),getProp:n=>Cm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:t,prop:c})||dr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:t,prop:l})||dr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:Ii})},getProxi:()=>km({instanceId:t}),quickSetProp:(n,s)=>{Dr({instanceId:t,prop:n})||mm({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=vm({instanceId:t,prop:c,callback:s,wait:i});return a&&Ft(()=>{Ni({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=hl(i);dm({instanceId:t,prop:c,keys:l,callback:s}),Ft(()=>{Ni({instanceId:t,prop:c})})},emit:n=>{let s=Lr(n);Ni({instanceId:t,prop:s})},emitAsync:async n=>{let s=Lr(n);return Im({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{$m({instanceId:t,values:n})},getValidation:()=>Mm({instanceId:t}),debug:()=>{Pm({instanceId:t})},debugStore:()=>{Rm({instanceId:t})},debugValidate:()=>{Nm({instanceId:t})},destroy:()=>{_m(t)}}};var we=Pi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var vl=!1,ps=new Map;function Lm(){if(ps.size===0){globalThis.removeEventListener("DOMContentLoaded",Lm),vl=!1;return}for(let e of ps.values())e();ps.clear()}function XE(){vl||(vl=!0,globalThis.addEventListener("DOMContentLoaded",Lm,{passive:!1}))}var KE=e=>{let t=Ie();return ps.set(t,e),typeof globalThis<"u"&&XE(),()=>ps.delete(t)},Dm=KE;function ms(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function QE({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=we.get();we.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=QE({type:c,event:a}),d=a.target,b={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=we.getProp("spinYMaxValue"),T=we.getProp("spinXMaxValue"),{spinX:x,spinY:S,pixelX:I,pixelY:C}=ms(a);b.spinX=ll(x,-T,T),b.spinY=ll(S,-y,y),b.pixelX=I,b.pixelY=C}for(let y of r.values())y(b)}function s(){t||(t=!0,o=we.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=Ie();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&t&&(globalThis.removeEventListener(e,n),t=!1)}}}var Fm=Br("click"),Bm=Br("mousedown"),Vm=Br("touchstart"),Wm=Br("mousemove"),jm=Br("touchmove"),zm=Br("mouseup"),Hm=Br("touchend"),Um=Br("wheel");var Co=0,et=new Map,ZE=(e=()=>{})=>{let t=Ie();return et.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(et.has(t)){let r=et.get(t);if(!r)return;let o=r.data.size;if(et.delete(t),!o)return;Co=Co-o}}}},ew=({id:e,callBackObject:t,frame:r})=>{if(!et.has(e))return;let o=Math.max(r,0),{currentFrame:n}=we.get(),s=et.get(e);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,t),Co++)},tw=e=>{et.has(e)&&et.delete(e)},rw=e=>{let t=et.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=we.get();t.freeze={active:!0,atFrame:r}},ow=({id:e,update:t=!0})=>{let r=et.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=we.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},nw=e=>{let t=et.get(e);if(!t)return;let r=t.data.size;Co=Co-r,t.data.clear()},sw=e=>et.get(e)??{},iw=e=>{for(let t of et.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),Co--)}},aw=({id:e,obj:t={}})=>{if(!et.has(e))return;let r=et.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},cw=()=>Co,lw=e=>{for(let[t,r]of et){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);et.set(t,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-e}:s})}},Yo={add:ZE,get:sw,update:ew,remove:tw,clean:nw,fire:iw,fireObject:aw,getCacheCounter:cw,updateFrameId:lw,freeze:rw,unFreeze:ow};var yl=!1,ki=new Map;function Gm(){if(ki.size===0){globalThis.removeEventListener("visibilitychange",Gm),yl=!1;return}let e={visibilityState:document.visibilityState};for(let t of ki.values())t(e)}function uw(){yl||(yl=!0,globalThis.addEventListener("visibilitychange",Gm,{passive:!1}))}var pw=e=>{let t=Ie();return ki.set(t,e),typeof globalThis<"u"&&uw(),()=>ki.delete(t)},Ai=pw;var hs=[],mw=(e=()=>{},t=100)=>{hs.push({cb:e,priority:t})},hw=({time:e,fps:t})=>{hs.length!==0&&(hs.sort((r,o)=>r.priority-o.priority),hs.forEach(({cb:r})=>r({time:e,fps:t})),hs.length=0)},Ct={add:mw,fire:hw};var Tl=[],dw=e=>{Tl.push(e)},fw=()=>{let e=[...Tl];return Tl.length=0,e},Xo={add:dw,get:fw};var Vr=new Map,gw=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},bw=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},vw=(e,t)=>{let o=Math.max(t,0)+we.getProp("currentFrame"),n=Vr.get(o)??[];Vr.set(o,[...n,e]),we.emit("requestFrame")},yw=()=>Vr.size,Ko={add:vw,fire:bw,updateKeys:gw,getAmountOfFrameToFire:yw};var Sl="animationStop",qm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===Sl&&e.preventDefault()})};var Jm=!1,Oi=({force:e=!1,duration:t=30}={})=>{if(Jm&&!e){let{instantFps:r}=we.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,b=Math.max(d,60);a+=b-(o[s]||0),o[s++]=b,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){we.quickSetProp("instantFps",y),Jm=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Oi();var wl=1e7,Qm=2e3,Il=!1,Eo=[],tt=Dt(),Ym=0,xl=Dt(),Cl=0,Ml=0,El=0,Qo=!1,Et=60,Fi=Et,_i=0,$i=0,fr=0,Li=!1,Di=!1,Tw=()=>Et<Fi/5*3,Sw=()=>Et<Fi/5*4,xw=()=>{!Tw()||Li||(Li=!0,setTimeout(()=>{Li=!1},4e3))},Cw=()=>{!Sw()||Di||(Di=!0,setTimeout(()=>{Di=!1},4e3))},Ew=()=>{fr=0,we.quickSetProp("currentFrame",fr),Ko.updateKeys(wl),Yo.updateFrameId(wl)};Ai(({visibilityState:e})=>{Qo=e!=="visible"});qm();we.watch("requestFrame",()=>{Bi()});var Xm=()=>{fr>=wl&&Ew(),Ct.fire({time:tt,fps:Et});let e=Xo.get();if(e.length>0)for(let t of e)Eo.push(t);Il=!1,Eo.length>0||Ko.getAmountOfFrameToFire()>0||Yo.getCacheCounter()>0||tt<Qm?Bi():(Qo=!0,fr=0,Ml=tt,we.quickSetProp("currentFrame",fr))},Km=e=>{tt=e,Cl=tt-xl,Qo&&(Ym+=Cl),xl+=Cl,tt=Math.round(xl-Ym);let t=Math.round(1e3/Et);El=Math.abs(tt-Ml-t);let r=El>100?El:0;tt=tt-r,Ml=tt,Qo?($i=tt,_i=0,Et=we.getProp("instantFps")):_i++,tt>$i+1e3&&!Qo&&(Et=tt>Qm?Math.round(_i*1e3/(tt-$i)):we.getProp("instantFps"),$i=tt,_i=0),Et>Fi&&(Fi=Et),xw(),Cw(),Eo.forEach(n=>n({time:tt,fps:Et})),Ko.fire({currentFrame:fr,time:tt,fps:Et}),Yo.fire(fr),fr++,we.quickSetProp("currentFrame",fr),Eo.length=0,Qo=!1,we.getProp("deferredNextTick")?Ft(()=>Xm()):Xm()},Bi=()=>{Il||(typeof globalThis>"u"?setTimeout(()=>Km(Dt()),_p):requestAnimationFrame(Km),Il=!0)},Bt={add:s=>{Eo.push(s),Bi()},addMultiple:(s=[])=>{Eo=[...Eo,...s],Bi()},getFps:()=>Et,mustMakeSomething:()=>Li,shouldMakeSomething:()=>Di};var fs=!1,ds=new Map,Vi=()=>{},Rl=0,Nl=0;function ww(){if(ds.size===0){globalThis.removeEventListener("resize",Vi),fs=!1;return}let e=globalThis.innerHeight,t=globalThis.innerWidth,r=e!==Rl,o=t!==Nl;Rl=e,Nl=t;let n={scrollY:globalThis.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ds.values())s(n)}function Iw(){fs||(fs=!0,Rl=globalThis.window.innerHeight,Nl=globalThis.window.innerWidth,Vi=So(()=>ww()),globalThis.addEventListener("resize",Vi,{passive:!1}))}var Mw=e=>{if(globalThis.window===void 0)return()=>{};let t=Ie();return ds.set(t,e),Iw(),()=>{ds.delete(t),ds.size===0&&fs&&(globalThis.removeEventListener("resize",Vi),fs=!1)}},Zm=Mw;var bs=!1,gs=new Map,Rw="UP",th="DOWN",Pl=0,Zo=0,kl=th,eh={scrollY:Zo,direction:kl};function Al(){if(gs.size===0){globalThis.removeEventListener("scroll",Al),bs=!1;return}Pl=Zo,Zo=globalThis.scrollY,kl=Zo>Pl?th:Rw,eh={scrollY:Zo,direction:kl};for(let e of gs.values())e(eh)}function Nw(){bs||(bs=!0,Pl=globalThis.scrollY,Zo=globalThis.scrollY,window.addEventListener("scroll",Al,{passive:!0}))}var Pw=e=>{if(globalThis.window===void 0)return()=>{};let t=Ie();return gs.set(t,e),Nw(),()=>{gs.delete(t),gs.size===0&&bs&&(globalThis.removeEventListener("scroll",Al),bs=!1)}},gr=Pw;var ys=!1,vs=new Map,Ol=()=>{};function kw(e){if(vs.size===0){Ol(),ys=!1;return}Bt.add(()=>{Ct.add(()=>{for(let t of vs.values())t(e)},0)})}function Aw(){ys||(ys=!0,Ol=gr(kw))}var Ow=e=>{if(globalThis.window===void 0)return()=>{};let t=Ie();return vs.set(t,e),Aw(),()=>{vs.delete(t),vs.size===0&&ys&&(Ol(),ys=!1)}},rh=Ow;var Ss=!1,Ts=new Map,oh=()=>{},_l=()=>{};function _w(e){if(Ts.size===0){_l(),Ss=!1;return}Bt.add(()=>{Ct.add(()=>{for(let t of Ts.values())t(e)},0)})}function $w(){Ss||(Ss=!0,oh=xi(e=>_w(e),we.getProp("throttle")),_l=gr(oh))}var Lw=e=>{if(globalThis.window===void 0)return()=>{};let t=Ie();return Ts.set(t,e),$w(),()=>{Ts.delete(t),Ts.size===0&&Ss&&(_l(),Ss=!1)}},nh=Lw;function sh(e){let t=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),e==="START"&&t(),n=!1;return}Bt.add(()=>{Ct.add(()=>{let p={scrollY:globalThis.scrollY};if(e==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=So(()=>a()),r=gr(o),e==="START"&&(t=gr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=Ie();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var ih=sh("START"),ah=sh("END");function en(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=Ie();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&t&&(globalThis.removeEventListener(e,o),t=!1)}}}var ch=en("pointerover"),lh=en("pointerdown"),uh=en("pointermove"),ph=en("pointerup"),mh=en("pointerout"),hh=en("pointerleave");var He=Symbol("LinkedList.setNext"),Ue=Symbol("LinkedList.setPrev"),Wi="after",$l="before",tn=class{#i=null;#o=null;constructor(t){this.data=t}get next(){return this.#i}[He](t){this.#i=t}get prev(){return this.#o}[Ue](t){this.#o=t}dispose(){this.data=null,this.#i=null,this.#o=null}},ji=class e{#i=null;#o=null;#n=0;#c=new WeakSet;addLast(t){let r=new tn(t);return this.#c.add(r),this.#i?(this.#o&&this.#o[He](r),r[Ue](this.#o),this.#o=r,this.#n++,this):(this.#i=r,this.#o=r,this.#n++,this)}addFirst(t){let r=new tn(t);return this.#c.add(r),this.#i?(r[He](this.#i),this.#i[Ue](r),this.#i=r,this.#n++,this):(this.#i=r,this.#o=r,this.#n++,this)}removeNode(t){return!t||!this.#c.has(t)?this:t===this.#i?this.removeFirst():t===this.#o?this.removeLast():(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t.dispose(),this.#n--,this)}removeFirst(){if(this.#i===null)return this;let t=this.#i;return this.#i=this.#i.next,this.#i&&this.#i[Ue](null),this.#i===null&&(this.#o=null),t.dispose(),this.#n--,this}removeLast(){if(this.#o===null)return this;let t=this.#o;return this.#o=this.#o.prev,this.#o&&this.#o[He](null),this.#o===null&&(this.#i=null),t.dispose(),this.#n--,this}insertAfter(t,r){if(!t||!this.#c.has(t))return this;let o=new tn(r);return this.#c.add(o),o[Ue](t),o[He](t.next),t.next&&t.next[Ue](o),t[He](o),t===this.#o&&(this.#o=o),this.#n++,this}insertBefore(t,r){if(!t||!this.#c.has(t))return this;let o=new tn(r);return this.#c.add(o),o[He](t),o[Ue](t.prev),t.prev&&t.prev[He](o),t[Ue](o),t===this.#i&&(this.#i=o),this.#n++,this}move(t,r,o=Wi){return!this.#c.has(t)||!this.#c.has(r)?this:t===r?this:o===Wi&&r.next===t?this:o===$l&&r.prev===t?this:(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t===this.#i&&(this.#i=t.next),t===this.#o&&(this.#o=t.prev),o==Wi&&(t[Ue](r),t[He](r.next),r.next&&r.next[Ue](t),r[He](t),r===this.#o&&(this.#o=t)),o==$l&&(t[Ue](r.prev),t[He](r),r.prev&&r.prev[He](t),r[Ue](t),r===this.#i&&(this.#i=t)),this)}moveAfter(t,r){return this.move(t,r,Wi)}moveBefore(t,r){return this.move(t,r,$l)}swap(t,r){if(!this.#c.has(t)||!this.#c.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#i,c=t===this.#o,l=r===this.#i,p=r===this.#o;return o&&o[He](n),n&&n[Ue](o),s&&s[He](i),i&&i[Ue](s),t[Ue](s),t[He](i),r[Ue](o),r[He](n),s&&s[He](t),i&&i[Ue](t),o&&o[He](r),n&&n[Ue](r),a?this.#i=r:l&&(this.#i=t),c?this.#o=r:p&&(this.#o=t),this}find(t){let r=this.#i,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#i,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#i,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#i;for(;t;)yield t,t=t.next}traverse(t){let r=this.#i;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#i;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#o;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#o;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#i,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#i,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#i=null,this.#o=null,this.#n=0,r.length=0,this}reverse(){let t=this.#i;for(this.#i=this.#o,this.#o=t;t!==null;){let r=t.next,o=t.prev;t[He](o),t[Ue](r),t=r}return this}toArray(){let t=[],r=this.#i;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#o;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#i}get last(){return this.#o}get size(){return this.#n}};function Dw(e){return Pi(e)}function Fw(){return we.getProp("instantFps")}function Bw(){return Bt.getFps()}function Vw(){return Bt.mustMakeSomething()}function Ww(){return Bt.shouldMakeSomething()}function jw(e=()=>{}){return Bt.add(e)}function zw(e=()=>{}){return Ct.add(e)}function Hw(e=()=>{}){return Xo.add(e)}function Uw(e=()=>{},t=0){return Ko.add(e,t)}async function Gw({force:e=!1,duration:t=30}={}){return await Oi({force:e,duration:t})}function qw(e=()=>{}){return Dm(e)}var Jw=Yo;function Yw(e=()=>{}){return Zm(e)}function Xw(e=()=>{}){return Ai(e)}function Kw(e=()=>{}){return Fm(e)}function Qw(e=()=>{}){return Bm(e)}function Zw(e=()=>{}){return Vm(e)}function eI(e=()=>{}){return Wm(e)}function tI(e=()=>{}){return jm(e)}function rI(e=()=>{}){return zm(e)}function oI(e=()=>{}){return Hm(e)}function nI(e=()=>{}){return Um(e)}function sI(e=()=>{}){return rh(e)}function iI(e=()=>{}){return gr(e)}function aI(e=()=>{}){return nh(e)}function cI(e=()=>{}){return ih(e)}function lI(e=()=>{}){return ah(e)}function uI(e=()=>{}){return ch(e)}function pI(e=()=>{}){return lh(e)}function mI(e=()=>{}){return uh(e)}function hI(e=()=>{}){return ph(e)}function dI(e=()=>{}){return mh(e)}function fI(e=()=>{}){return hh(e)}var gI=we;function bI(){return new ji}var m={};To(m,{afterRouteChange:()=>vh,beforeRouteChange:()=>bh,componentMap:()=>j,createComponent:()=>Kd,eventDelegationMap:()=>xn,getActiveParams:()=>Sh,getActiveRoute:()=>Th,getChildrenIdByName:()=>zi,getComponentNameById:()=>Ph,getDebugMode:()=>Xd,getIdByInstanceName:()=>Yt,getNumberOfActiveInvalidate:()=>sb,getNumberOfActiveRepeater:()=>ib,getParentIdById:()=>xs,getPropsFromParent:()=>Ia,getRoot:()=>ya,getStateById:()=>Xt,getStateByName:()=>Kh,getTree:()=>_h,inizializeApp:()=>nb,loadUrl:()=>ob,mainStore:()=>fe,onRouteLoading:()=>yh,removeAndDestroyById:()=>st,setStateById:()=>gn,setStateByName:()=>Gd,staticProps:()=>Ma,tempDelegateEventMap:()=>Ns,tick:()=>Sr,updateStateByName:()=>Jd,useComponent:()=>aa,useMethodArrayByName:()=>Fh,useMethodByName:()=>Dh,watchById:()=>wt});var rn="activeRoute",on="activeParams",wo="beforeRouteChange",nn="afterRouteChange",Jt="routeIsLoading",ut="parserAsync",Wr="default",dh="repeater",fh="invalidate",gh="render_component";var fe=u.createStore({[rn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[on]:()=>({value:{},type:"any",skipEqual:!1}),[wo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Jt]:()=>({value:!1,type:Boolean}),[ut]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),sn=()=>{fe.set(ut,{element:document.createElement("div"),persistent:!1,source:Wr},{emit:!1})};var bh=e=>fe.watch(wo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),vh=e=>fe.watch(nn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),yh=e=>fe.watch(Jt,t=>{e(t)}),Th=()=>{let{activeRoute:e}=fe.get();return e},Sh=()=>{let{activeParams:e}=fe.get();return e};var j=new Map;var zi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var xh="",Ch,Eh=({contentId:e=""})=>{xh=e};var wh=()=>{Ch=document?.querySelector(xh)},Hi=()=>Ch;var jr=new Map,Ih=({instanceName:e,id:t})=>{let r=jr.get(e)??[];jr.set(e,[...r,t])},Mh=({instanceName:e,id:t})=>{let r=jr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&jr.delete(e),o.length>0&&jr.set(e,o)},Ll=({instanceName:e})=>jr.get(e)??[];var Rh=new WeakMap,Nh=({element:e,id:t})=>{Rh.set(e,t)},an=({element:e})=>Rh.get(e);var Ph=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},kh=e=>{if(!e)return"name-not-found";let t=an({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},Yt=(e="")=>e?Ll({instanceName:e})?.[0]:void 0,Ah=(e="")=>e?Ll({instanceName:e})??[]:[];var Ui=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Hi()?.contains(r):!1};var Oh=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Oh({chunk:l})}]},[]),_h=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Oh({chunk:e})};var $h=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Lh=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Dh=e=>{let t=Yt(e);if(!t||t==="")return;let r=Lh({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Fh=e=>Ah(e).flatMap(r=>{let o=Lh({id:r});return Object.keys(o).length===0?[]:[o]});var Bh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r];return o?o.push(t):e[r]=[t],e},Vh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return{...e,[r]:o.filter(n=>n!==t)}},Wh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Gi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var xs=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},jh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Bh({currentChild:s,id:e,componentName:o})})},qi=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=an({element:t}),r||(t=t.parentNode);return r??""},Dl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Dl({moduleScopeId:o,targetComponentId:t})};var yt=new Map,Cs=new Map;var zh=({componentId:e})=>{if(e)for(let[t,r]of yt){let{componentId:o}=r;o===e&&yt.delete(t)}};var rt=new Map;var Te=new Map;var Hh=({id:e})=>{if(rt.has(e)){let t=rt.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{Te.has(r)&&Te.delete(r)}),rt.delete(e)}};var ot=new Map;var J=new Map;var Uh=({id:e})=>{if(ot.has(e)){let t=ot.get(e);if(!t)return;t.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),ot.delete(e)}};var Gh=({id:e,parentId:t,componentName:r})=>{if(!e||!t)return;let o=j.get(t);o?.child&&j.set(t,{...o,child:Vh({currentChild:o.child,id:e,componentName:r})})};var qh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:[...o,e]})},Jh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},Es=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Yh=({repeatId:e})=>{let t=J.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var cn=new Set;var Xh=e=>{cn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),Gh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),Hh({id:e}),Uh({id:e}),l&&l.length>0&&Jh({componentId:e,repeatId:l}),p&&p.length>0&&Mh({instanceName:p,id:e}),h||Xh(e),zh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var Xt=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var Kh=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),Xt(t)};var ln=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},zr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Io=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var Hr=new Map;var Qh=({repeatId:e,host:t})=>{let r=J.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(e,t)};var Zh="data-mobjs",Mo="componentid",Ji="bindtextid",Yi="bindobjectid";var un="staticprops",Xi="bindprops",ed="name",td="name",rd="slot",br="repeaterchild";var Ur="currentRepeaterValue",Gr="repeatPropBind",Ki="bindevents",Kt="weakbindevents",pn="bindeffect",od="parentid";var Qt="bindrefid",vr="bindrefname",Qi="invalidateid",Zi="mobjsrepeat";var Zt={current:{},index:-1},nd="QUEQUE_BINDPROPS",Fl="QUEQUE_REPEATER",Bl="QUEQUE_INVALIDATE";var mn=new Set,sd=!1,id=e=>{mn.add(e)},ad=e=>{mn.delete(e)},Vl=e=>{let t;for(let r of mn)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}if(t)return mn.delete(t),t};var cd=({element:e})=>[...mn].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],ld=()=>mn.size;var it=e=>{sd=e},Vt=()=>sd;var ud=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Vt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Zi)??"";Qh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Map;var pd=({invalidateId:e,host:t})=>{let r=Te.get(e);if(!r)return;let o=t.parentNode;Te.set(e,{...r,element:o}),qr.set(e,t)};var md=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Qi)??"";pd({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Set,hd=e=>{Jr.add(e)},dd=()=>{Jr.clear()},fd=({element:e})=>[...Jr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Jr.delete(t),r}),gd=({name:e,element:t})=>[...Jr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Jr.delete(r),o}),bd=()=>[...Jr],ea=()=>Jr.size;var vd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#i;constructor(){super(),this.attachShadow({mode:"open"}),this.#i="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#i=this.shadowRoot?.host.getAttribute(td))}connectedCallback(){let e=this.shadowRoot?.host;e&&hd(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#i}})};var Wl=new Set,yd=e=>{Wl.add(e)},ta=()=>[...Wl],ra=e=>Wl.delete(e);var Td=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#o=u.getUnivoqueId(),this.#n={},this.#i=t,this.#c=!0,this.isUserComponent=!0,this.#t="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;if(Vt()){yd(l);return}if(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot)return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#i}setId(l){this.#o=l}getId(){return this.#o}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#c}getInstanceName(){return this.#h}getStaticPropsId(){return this.#l}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#u}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#t=l}getDynamicPropsFromSlotId(){return this.#t}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#m=l}getRepeatValue(){return this.#m}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#p??void 0}setRepeaterPropBind(l){this.#p=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#o="",this.#n={}}disablePlaceHolderState(){this.#c=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#o=l.id,this.#n=l,this.#c=!1,o?.({context:this,params:this.#n}))}connectedCallback(){if(!Vt()&&this.#c){let p=this.shadowRoot?.host;p&&([this.#h,this.#l,this.#s,this.#d,this.#u,this.#m,this.#a,this.#f,this.#r,this.#g,this.#p,this.#C,this.#x]=[ed,un,Xi,"key",Ki,Ur,rd,od,br,Kt,Gr,Qt,vr].map(h=>p.getAttribute(h)??"")),id(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;ad(l),ra(l),this.active&&(n?.({context:this,params:this.#n}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#n})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#n})}})})};var wt=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Xr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Ro=new Map,Cd=()=>Ro.size===0,Sd=1e3,Ed=e=>{if(Ro.size>=Sd)return console.warn(`InvalidateTick: maximum queue size reached (${Sd}). Likely an infinite watch loop. Queue force-cleared. `),Ro.clear(),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},xd=()=>Ro.size===0,It=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&Ro.forEach(r=>{console.log(r)}),xd()&&t){t();return}return new Promise(r=>{if(xd()){r();return}It({debug:e,previousResolve:t??r})})};var No=new Map,Md=()=>No.size===0,wd=1e3,Rd=e=>{if(No.size>=wd)return console.warn(`RepeaterTick: maximum queue size reached (${wd}). Likely an infinite watch loop. Queue force-cleared. `),No.clear(),()=>{};let t=u.getUnivoqueId();return No.set(t,e),()=>No.delete(t)},Id=()=>No.size===0,Mt=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&No.forEach(r=>{console.log(r)}),Id()&&t){t();return}return new Promise(r=>{if(Id()){r();return}Mt({debug:e,previousResolve:t??r})})};var dn=({id:e})=>{let t=rt.get(e);return t?t.flatMap(({invalidateId:r})=>Te.get(r)?.observed??[]):[]};var fn=({id:e})=>{let t=ot.get(e);return t?t.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var oa=new Map,Nd=(e,t)=>{oa.set(e,t)},na=new Map,Pd=({host:e,componentId:t,bindTextId:r})=>{na.set(e,{componentId:t,bindTextId:r})},kd=e=>e.match(/(?<=\[).+?(?=])/g),Ad=e=>e.split("[")?.[0],vI=({previous:e,current:t})=>{let r=kd(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Ad(t)]):e?.[t]},Od=(e,t,...r)=>{let o=Xt(e),n=r.map(s=>s.split(".").reduce((a,c)=>vI({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},_d=()=>{[...na].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){oa.delete(t);return}let o=oa.get(t);o&&(oa.delete(t),yI({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),na.clear()},$d=()=>na.size,yI=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=kd(f),y=d&&d?.length>0?Ad(f):f;if(y)return wt(e,y,async()=>{await Mt(),await It(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Ld=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Mo)??"",o=t?.getAttribute(Ji)??"";Pd({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var sa=new Map,Dd=(e,t)=>{sa.set(e,t)},jl=new Map,Fd=({host:e,componentId:t,bindObjectId:r})=>{jl.set(e,{componentId:t,bindObjectId:r})},Bd=e=>e.map(t=>"observe"in t?Ae.extractkeyFromProp(t.observe):(Ae.initializeCurrentDependencies(),"value"in t?t?.value():t(),Ae.getFirstCurrentDependencies())),Vd=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Wd=()=>{[...jl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){sa.delete(t);return}let o=sa.get(t);o&&(sa.delete(t),TI({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),jl.clear()},TI=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>wt(e,p,async()=>{await Mt(),await It(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var jd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Mo)??"",o=t?.getAttribute(Yi)??"";Fd({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ia={},Po=()=>ia,zd=new Set,Hd=()=>{ia=Object.fromEntries([...zd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(ia).length}`),Td(ia),vd(),md(),ud(),Ld(),jd()},aa=e=>{!e||e?.length===0||e.forEach(t=>{zd.add(t)})};var ca=({componentName:e,propName:t})=>(Po()?.[e]?.componentParams?.exportState??[]).includes(t),Ud=({componentName:e})=>Po()?.[e]?.componentParams?.exportState??[];var gn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!ca({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Gd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>gn(t,r,o,{emit:n})};var qd=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!ca({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Jd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>qd(t,r,o,{emit:n,clone:s})};var zl={scoped:!1,maxParseIteration:5e3,debug:!1},Yd=e=>{zl={...zl,...e}},Rt=()=>zl,Xd=()=>{let{debug:e}=Rt();return e},Kd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(aa(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Qd=[],Zd="",ef="",tf=e=>{Qd=[...e]},bn=({hash:e=""})=>Qd.find(({hash:t})=>e===t),rf=({hash:e=""})=>{Zd=e},la=()=>Zd,of=({hash:e=""})=>{ef=e},nf=()=>ef;var sf=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),Nh({element:t,id:e}))},ua=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,af=({element:e})=>e?an({element:e}):"",Hl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:Es({repeatId:t}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${e}`?[{element:s,id:o}]:[]});function*yr(e){if(e){yield e;for(let t of e.children)yield*yr(t)}}function SI(e){let t=[];for(let r of yr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var cf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...SI(o)];return t};function xI(e){let t=[];for(let r of yr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var lf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...xI(o)];return t};function CI(e,t){for(let r of yr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var uf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=CI(o,t);if(n)return n}return null};function EI(e){for(let t of yr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var pf=e=>{let t=e||document.body;for(let r of t.children){let o=EI(r);if(o)return o}return null};var ws=new Map,vn=e=>{let t=u.getUnivoqueId();return ws.set(t,e),t},mf=(e="")=>{if(!e)return Zt;let t=ws.get(e);return ws.delete(e),t??Zt};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var pa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(br)){ra(i);return}i.setAttribute(Ur,vn({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Gr,`${o}`),i.setAttribute(br,`${n}`)})},Kr=({stringDOM:e,parent:t,position:r})=>{it(!0);let o=document.createRange().createContextualFragment(e);it(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Is=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;it(!0),e.forEach(n=>{n&&o.append(n)}),it(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var II=({element:e,content:t})=>{let{debug:r}=Rt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},MI=({element:e})=>{bd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},RI=({element:e})=>{if(!!1&&ea()===0)return;let t=cf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=gd({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},NI=({element:e,content:t})=>{let r=II({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=fd({element:r});a&&(Is({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Is({parent:r,elements:[...e.childNodes],position:"afterbegin"}),RI({element:r}),MI({element:r}),n&&n.length>0&&r.setAttribute(Kt,n),s&&s.length>0&&r.setAttribute(Qt,s),i&&i.length>0&&r.setAttribute(vr,i);let{debug:c}=Rt();c&&r.setAttribute(Zh,o??"")}return e.remove(),r},hf=({element:e,content:t})=>({newElement:NI({element:e,content:t})});var Ul=0,df=()=>{Ul+=1},Gl=()=>Ul,ff=()=>{Ul=0};var gf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var Ms=new Map,bf=({id:e,cb:t=()=>{}})=>{Ms.set(e,t)},ql=async({id:e,element:t})=>{let o=await Ms.get(e)?.({element:t});gf({cb:o,id:e}),Ms.delete(e)};var Jl=({id:e})=>{if(Hr.has(e)){let t=Hr.get(e);t?.removeCustomComponent(),t?.remove(),Hr.delete(e)}},ma=({id:e})=>J.has(e)?(Jl({id:e}),J.get(e)?.element):void 0;var ha=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},vf=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:vf({rootNode:e,currentNode:t.parentElement})},PI=({rootNode:e,node:t})=>{if(e)return vf({rootNode:e,currentNode:t.parentElement})},Tr=({id:e=""})=>{if(!e||e==="")return Zt;let r=j.get(e)?.currentRepeaterState;return r||Zt};var yf=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=ma({id:t}),s=PI({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},Rs=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var yn=new Map,Tf=1e5,Tn=e=>{if(yn.size>=Tf)return console.warn(`Tick: maximum queue size reached (${Tf}). Likely an infinite watch loop. Queue force-cleared. `),yn.clear(),()=>{};let t=u.getUnivoqueId();return yn.set(t,e),()=>yn.delete(t)},Sf=()=>yn.size===0,Sr=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&yn.forEach(r=>{console.log(r)}),Sf()&&t){t();return}return new Promise(r=>{if(Sf()){r();return}Sr({debug:e,previousResolve:t??r})})};var Yl=!0,da=()=>{Yl=!0},fa=()=>{Yl=!1},ga=()=>Yl;var Sn=new Map,xf=(e=[])=>{let t=Pe(Object,e)?[e]:e,r=u.getUnivoqueId();return Sn.set(r,t),r},Cf=({element:e,componentId:t,bindEventsId:r})=>{let o=Sn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ga())return;fa(),await Sr(),da();let c=Tr({id:t});i(a,c?.current,c?.index)})}),Sn.delete(r))},Ef=()=>{Sn.clear()};var ba=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},wf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var If=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Ae.extractkeyFromProp(s)):(Ae.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Ae.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},va=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Xt(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Tr({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{gn(e,h,f,{emit:n})})},Mf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=yt.get(e);o&&(yt.set(e,{...o,componentId:r}),Cs.set(r,e),Xl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Xl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=Cs.get(e);if(!o)return;r&&Cs.delete(e);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Md()&&(await Mt(),va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Cd()&&(await It(),va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>wt(a,h,async()=>{if(await Mt(),await It(),l)return;let f=Tn({state:h,componentId:e,moduleId:"",type:nd});l=!0,u.useNextLoop(()=>{va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ba({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===e&&yt.delete(h)}},Rf=()=>{yt.clear(),Cs.clear()};var er=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else er({id:c,container:t})})};var Kl=new Map,kI=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ae.extractkeyFromProp(r)),AI=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Ae.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Ae.getCurrentDependencies()),Af=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?kI(i):AI({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Kl.set(s,n),s},Of=e=>{[...e.querySelectorAll(`[${pn}]`)].forEach(r=>{let o=r.getAttribute(pn);if(!o)return;let n=Kl.get(o);n&&(r.removeAttribute(pn),OI({data:n,element:r}),Kl.delete(o))})},Nf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},Pf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},kf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},OI=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=fn({id:o}),f=dn({id:o});return[...new Set([...i,...h,...f])].map(b=>(a&&u.useFrame(()=>{Nf({ref:r,data:a})}),c&&u.useFrame(()=>{Pf({ref:r,data:c})}),l&&u.useFrame(()=>{kf({ref:r,data:l})}),wt(o,b,async()=>{if(await Mt(),await It(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Nf({ref:r,data:a}),c&&r.deref()&&Pf({ref:r,data:c}),l&&r.deref()&&kf({ref:r,data:l}),p=!1})}))})))})};var _f=({element:e})=>{let t=e.querySelectorAll(`[${Qt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Qt),i=n.getAttribute(vr);if(n.removeAttribute(Qt),n.removeAttribute(vr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},_I=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],$I=({refs:e,refName:t,element:r})=>({...e,[t]:_I([...e[t],r])}),$f=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?$I({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Ql=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Lf=({id:e})=>{let t=Ql({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Df=document.createElement("div"),Ff=({element:e})=>{Df=e},ya=()=>Df;var Bf=":FORCE",Ns=new Map,xn=new WeakMap,Zl=[],Vf=[],Wf=(e=[])=>{let t=Pe(Object,e)?[e]:e,r=u.getUnivoqueId();return Ns.set(r,t),r},LI=e=>{let t=e?.parentNode;for(;t;){if(xn.has(t))return{target:t,data:xn.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},DI=e=>{let t=xn.get(e);return t?{target:e,data:t}:LI(e)};async function FI(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=DI(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!ga()&&!a||(fa(),await Sr(),da(),!document.contains(o)))return;let c=af({element:o}),l=c?Tr({id:c}):Zt;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var jf=async e=>{await Mt(),await It(),[...e.parentNode?.querySelectorAll(`[${Kt}]`)??[]].forEach(n=>{let s=n.getAttribute(Kt)??"";n.removeAttribute(Kt);let i=Ns.get(s);Ns.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Bf),d=p.toUpperCase().replaceAll(Bf,"").toLowerCase();return Zl.includes(d)||Zl.push(d),{event:d,callback:h,force:f}}));xn.set(n,a)});let o=ya();Zl.forEach(n=>{Vf.includes(n)||(Vf.push(n),o.addEventListener(n,FI.bind(null,n)))})};var Cn="repeater",Ta="invalidate",Qr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===Cn?J.entries():Te.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Dl({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===Cn?[d]:d})}return i};var zf=({id:e,repeatId:t})=>{if(!ot.has(e))return;let r=ot.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);J.has(t)&&J.delete(t),ot.set(e,o)};var Zr=({id:e,repeatParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Cn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),zf({id:e,repeatId:n})})};var Sa=({repeatParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Cn}).forEach(({initializeModule:o})=>{o()})};var Hf=({invalidateId:e,unsubscribe:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,unsubscribe:t})};var Uf=({id:e,invalidateId:t})=>{if(!rt.has(e))return;let r=rt.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);Te.has(t)&&Te.delete(t),rt.set(e,o)};var eo=({id:e,invalidateParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Ta}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Uf({id:e,invalidateId:n})})};var eu=({id:e})=>{if(!Te.has(e))return;if(qr.has(e)){let r=qr.get(e);r?.removeCustomComponent(),r?.remove(),qr.delete(e)}return Te.get(e)?.element};var xa=({invalidateParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Ta}).forEach(({initializeModule:o})=>{o()})};var Gf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=qi({element:eu({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;ln({id:n,prop:h});let d=eu({id:s}),b=Tn({state:h,componentId:n,moduleId:s,type:Bl}),y=Ed({state:h,componentId:n,invalidateId:s,type:Bl});c=!0,u.useNextLoop(async()=>{if(!d){zr({id:n,prop:h});return}await t(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),er({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(ut,{element:d,persistent:i,source:fh},{emit:!1}),await fe.emitAsync(ut),sn(),c=!1,b(),y(),xa({invalidateParent:d,id:n}),Sa({repeatParent:d,id:n}),zr({id:n,prop:h}),r()})}));Hf({invalidateId:s,unsubscribe:p})};var qf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ae.extractkeyFromProp(r));var Jf=({invalidateId:e,initializeModule:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Yf=({invalidateId:e})=>{let t=Te.get(e);t&&Te.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var Xf=({invalidateId:e,scopeId:t,observe:r})=>{Te.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Kf=({repeatId:e,unsubscribe:t})=>{let r=J.get(e);r&&J.set(e,{...r,unsubscribe:t})};var En=new Set,Qf=({id:e,state:t,container:r})=>{En.add({id:e,state:t,container:r})},Zf=({id:e,state:t,container:r})=>{r&&En.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&En.delete(o)})},eg=({id:e="",state:t="",container:r})=>[...En].some(n=>e===n.id&&t===n.state&&r===n.container);var rg=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.filter(n=>!o.has(n?.[r]))},og=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},tg=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),ng=({current:e,previous:t,key:r})=>tg({arr:e,key:r})&&tg({arr:t,key:r}),Ca=({data:e=[],key:t=""})=>{let r=new Set;return e.filter(o=>{let n=o?.[t];return r.has(n)?!1:(r.add(n),!0)})},Ea=({children:e,previousChildren:t=[],hasKey:r})=>{let o=new Set(t),n=t.length>0,s={};for(let i of e){let{index:a}=Tr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},sg=({children:e,key:t,data:r})=>{if(!e?.length||!r?.length)return[];let o=new Map(e.map(n=>{let{current:s}=Tr({id:n[0]});return[s[t],n]}));return r.map(n=>o.get(n[t])).filter(n=>n!==void 0)};var wn=new Map,wa=(e={})=>{let t=u.getUnivoqueId();return wn.set(t,e),t},Ia=(e="")=>{let t=wn.get(e);return wn.delete(e),t??{}};var ig=()=>{wn.clear()};var Ma=(e={})=>`${un}="${wa(e)}"`,Ra=(e,t,r)=>Math.min(Math.max(e,t),r);var tu=({repeatId:e})=>{let t=J.get(e);return t?t.currentData:[]};var BI="index",ko=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=tu({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Ae.setCurrentDependencies(e);let f=tu({repeatId:s}),d=Math.max(f?.length-1,0);if(h===BI){if(t){let b=f?.findIndex(y=>y[r]===o);return Ra(b,0,d)}return Ra(n,0,d)}return t?(l=c??l,c=f?.find(b=>b[r]===o),c??l):(l=c??l,c=f?.[Ra(n,0,d)],c??l)},set(){return!1}})};var ag=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=ko({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),b=Vt();it(!0);let y=i.createContextualFragment(d);return it(b),pa({components:ta(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},VI=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Ur}="${vn({current:t,index:e})}"
    ${Gr}="${r}" ${br}="${o}"`,cg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=ko({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>VI({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),lg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=ko({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Vt();it(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));return it(c),pa({components:ta(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},WI=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Gr}="${o}"
    ${Ur}="${vn({current:r,index:t})}"
    ${br}="${n}"`,ug=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=ko({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>WI({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},pg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=ko({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Vt();it(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));return it(h),pa({components:ta(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},mg=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Ur}="${vn({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Gr}="${r}"
                            ${br}="${o}"`,p=ko({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Na=({repeatId:e,id:t})=>{let r=J.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Xt(t)[n];J.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Ps=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var In=({repeatId:e,currentData:t})=>{let r=J.get(e);r&&J.set(e,{...r,currentData:t})};var jI=({element:e,container:t})=>{let r=kh(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},hg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=Ca({data:t,key:n});In({repeatId:a,currentData:l});let p=rg(r,l,n),h=p.map(T=>Hl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let x=T[0].element,S=T[0].id;if(!S)return;let I=Rs({id:S}),C=I??x;eo({id:s,invalidateParent:C}),Zr({id:s,repeatParent:C}),T.forEach(({id:w})=>{st({id:w})}),I&&I.remove()}),f||Ps({repeatId:a}).filter(S=>p.map(I=>I?.[n]).includes(S.value?.[n])).forEach(S=>{let{element:I}=S;eo({id:s,invalidateParent:I}),Zr({id:s,repeatParent:I}),er({id:s,container:I})});let d=og(l,r,n).map(({keyValue:T,isNewElement:x,index:S})=>{if(x)return{keyValue:T,isNewElement:x,index:S,wrapper:void 0};let I=Hl({keyValue:T,repeatId:a}),C=I[0]?.element?Rs({id:I[0]?.id??""}):Ps({repeatId:a}).find(M=>M.value?.[n]===T)?.element;return{keyValue:T,isNewElement:x,index:S,persistentElement:I,persistentDOMwrapper:C}});o.replaceChildren();let b=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:x,index:S,persistentElement:I,persistentDOMwrapper:C})=>{if(!T){let{debug:O}=Rt();C&&y.append(C);let $=I?.[0]?.element;!C&&$&&(y.append($),O&&jI({element:I[0]?.element,container:o}));return}let w=l?.[S],M=c?ug({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:x,render:i}):lg({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:x,render:i}),A=Vt();if(it(!0),c){let O=b.createContextualFragment(M);y.append(O)}!c&&M&&y.append(M),it(A)}),o.append(y),l};var zI=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},dg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{In({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?cg({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):ag({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||Is({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=Ea({children:c,hasKey:!1});f.filter((x,S)=>S>=t.length).forEach(x=>{x.forEach(S=>{let I=ua({id:S}),C=Rs({id:S}),w=C??I;eo({id:i,invalidateParent:w}),Zr({id:i,repeatParent:w}),st({id:S}),C&&C.remove()})});let{debug:b}=Rt();if(b&&zI(o),f.length>0)return t;let y=Ps({repeatId:s});if(!y)return t;y.filter(({index:x})=>x>=t.length).forEach(x=>{let{element:S}=x;eo({id:i,invalidateParent:S}),Zr({id:i,repeatParent:S}),er({id:i,container:S}),S.remove()})}return t};var fg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,render:a,repeatId:c,useSync:l,currentChildren:p=[]})=>{let d=(ng({current:o,previous:n,key:s})?hg:dg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:a,repeatId:c,useSync:l,currentChildren:p});return fe.set(ut,{element:r,persistent:t,source:dh},{emit:!1}),await fe.emitAsync(ut),sn(),d};var gg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ua({id:c});return Jl({id:l}),i(),o(e,async(b,y)=>{if(!u.checkType(Array,b))return;let T=ma({id:l}),x=Tn({state:e,componentId:c,moduleId:l,type:Fl}),S=Rd({state:e,componentId:c,repeatId:l,type:Fl});if(ln({id:c,prop:e}),eg({id:c,state:e,container:T})){zr({id:c,prop:e}),t(e,y,{emit:!1}),x(),S();return}let C=Es({repeatId:l});f&&await s(),n&&(C.forEach(P=>{st({id:P})}),T&&(T.textContent="")),T&&Qf({id:c,state:e,container:T});let w=await fg({state:e,persistent:r,repeaterParentElement:T??document.createElement("div"),current:b,previous:n?[]:y,key:a,id:c,render:p,repeatId:l,useSync:h,currentChildren:n?[]:C}),M=Es({repeatId:l}),A=!!a,O=Ea({children:M,previousChildren:C,hasKey:A}),$=A?[...sg({children:O,key:a,data:w})]:O,k=A?new Map(b.map((P,_)=>[`${P?.[a]}`,_])):new Map;$.forEach((P,_)=>{let D=w?.[_];if(!D)return;let N=A?k.get(`${D?.[a]}`)??-1:_;P.forEach(L=>{ha({id:L,value:{current:D,index:N}})})}),u.useNextLoop(async()=>{f&&i(),Zf({id:c,state:e,container:T}),zr({id:c,prop:e}),x(),S(),xa({invalidateParent:T,id:c}),Sa({repeatParent:T,id:c}),$.length===0&&Na({repeatId:l,id:c})})})};var bg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=gg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});Kf({repeatId:e,unsubscribe:d})};var vg=({repeatId:e,initializeModule:t})=>{let r=J.get(e);r&&J.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var yg=({repeatId:e})=>{let t=J.get(e);t&&J.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var Tg=({repeatId:e,initialDOMRender:t})=>{let r=J.get(e);r&&J.set(e,{...r,initialRenderWithoutSync:t})};var Sg=({repeatId:e,scopeId:t,observe:r})=>{J.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var xg=({repeatId:e,scopeId:t})=>{let r=ot.get(t)??[];ot.set(t,[...r,{repeatId:e}])};var Cg=({invalidateId:e,scopeId:t})=>{let r=rt.get(t)??[];rt.set(t,[...r,{invalidateId:e}])};var Eg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:b,position:y="afterbegin",clean:T=!0})=>{T&&(er({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,b),fe.set(ut,{element:d,persistent:Ui(c),source:gh},{emit:!1}),await fe.emitAsync(ut),sn()},getChildren:d=>zi({id:c,componentName:d}),freezeProp:d=>{let b=Ae.extractkeyFromProp(d);return ln({id:c,prop:b.toString()})},unFreezeProp:d=>{let b=Ae.extractkeyFromProp(d);return zr({id:c,prop:b.toString()})},unBind:()=>wf({id:c}),bindProps:d=>{let b="props"in d?d:{props:d};return`${Xi}="${If({...b,parentId:c})}" `},staticProps:d=>` ${un}="${wa(d)}" `,remove:()=>{st({id:c})},removeDOM:d=>{er({id:c,container:d}),d.textContent=""},getParentId:()=>xs(c),watchParent:(d,b)=>{let y=wt(xs(c),d,b);y&&ba({id:c,unWatchArray:[y]})},onMount:d=>bf({id:c,cb:d}),bindEvents:d=>`${Ki}="${xf(d)}"`,delegateEvents:d=>`${Kt}="${Wf(d)}"`,bindEffect:d=>`${pn}="${Af({data:d,id:c})}"`,addMethod:(d,b)=>{$h({id:c,name:d,fn:b})},setRef:d=>`${Qt}="${c}" ${vr}="${d}"`,getRef:()=>Lf({id:c}),getRefs:()=>Ql({id:c}),bindText:(d,...b)=>{let y=u.getUnivoqueId(),T=()=>Od(c,d,...b);return Nd(y,{id:c,render:T,props:b}),`<mobjs-bind-text ${Mo}="${c}" ${Ji}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...b)=>{let y=Bd(b),T=u.getUnivoqueId(),x=()=>Vd(d,...b);return Dd(T,{id:c,keys:y,render:x}),`<mobjs-bind-object ${Mo}="${c}" ${Yi}="${T}"></mobjs-bind-object>${x()}`},invalidate:({observe:d,render:b,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let x=qf(d),S=u.getUnivoqueId(),I=`${Qi}=${S}`,C=()=>b(),w=!1;return Cg({invalidateId:S,scopeId:c}),Xf({invalidateId:S,scopeId:c,observe:x}),Jf({invalidateId:S,initializeModule:()=>{w||(Gf({observe:x,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Ui(c),id:c,invalidateId:S,renderFunction:C}),w=!0,Yf({invalidateId:S}))}}),`<mobjs-invalidate ${I} style="display:none;"></mobjs-invalidate>${C()}`},repeat:({observe:d,clean:b=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:x="",render:S,useSync:I=!1})=>{let C=Ae.extractkeyFromProp(d),w=u.getUnivoqueId(),M=x!=="";xg({repeatId:w,scopeId:c}),Sg({repeatId:w,scopeId:c,observe:C});let A=e()?.[C],O=M?Ca({data:A,key:x}):A;In({repeatId:w,currentData:O});let $=I?mg({currentUnique:O,key:x,observe:C,repeatId:w,hasKey:M,render:S}):"",k=I?[]:pg({currentUnique:O,render:S,observe:C,repeatId:w,key:x,hasKey:M}),P=!1;return Tg({repeatId:w,initialDOMRender:k}),vg({repeatId:w,initializeModule:()=>{P||(bg({repeatId:w,persistent:Ui(c),state:C,setState:t,emit:n,watch:a,clean:b,beforeUpdate:y,afterUpdate:T,key:x,id:c,render:S,useSync:I}),P=!0,yg({repeatId:w}),Yh({repeatId:w})||Na({repeatId:w,id:c}))}}),`<mobjs-repeat ${Zi}="${w}" style="display:none;"></mobjs-repeat>${$}`}});var ru=({componentName:e,currentProps:t={}})=>{let o=Po()?.[e]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(t).filter(([n])=>o.includes(n)))};var wg=({element:e})=>{let t=e.getId(),r=e.getInstanceName(),o=qi({element:e}),n=e.getStaticPropsId(),s=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getRepeatValue(),c=e.getComponentRepeatId(),l=e.getCurrentKey()??"",p=e.getComponentName(),h=n?.split(" ").join(""),f=Ia(h),d={...e.dataset},b=e.getRepeaterPropBind(),y=mf(a);return{element:e,props:{...ru({componentName:p,currentProps:d}),...ru({componentName:p,currentProps:f})},id:t,componentName:p,instanceName:r,key:l,dynamicPropsId:s,repeatPropBind:b,bindEventsId:i,currentRepeatValue:y,parentId:o,componentRepeatId:c}};var Ig=e=>{cn.add(e)};var Mg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Zt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:b=[],persistent:y=!1,child:T={},parentId:x="",id:S="",componentName:I=""})=>{let C=u.createStore(o);Wh({props:r,store:C}),n&&C.bindStore(n),y||Ig(S),p&&p.length>0&&qh({componentId:S,repeatId:p}),t&&t.length>0&&Ih({instanceName:t,id:S});let w=Ud({componentName:I}),M=new Set(w);return C.setProxiReadOnlyProp(w),j.set(S,{element:e,componentName:I,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:S,parentId:x,freezedPros:b,child:T,state:C}),{getState:()=>C.get(),setState:(A="",O={},{emit:$=!0}={})=>{let k=Io({id:S,prop:A}),P=Ae.extractkeyFromProp(A),_=M.has(P);_&&Gi({prop:P,componentName:I,action:"updateState"}),!(k||_)&&C.set(P,O,{emit:$??!0,usePropAsString:!0})},updateState:(A="",O=()=>({}),{emit:$=!0,clone:k=!1}={})=>{let P=Io({id:S,prop:A}),_=Ae.extractkeyFromProp(A),D=M.has(_);D&&Gi({prop:_,componentName:I,action:"updateState"}),!(P||D)&&C.update(_,O,{emit:$??!0,clone:k??!1,usePropAsString:!0})},getProxi:()=>C.getProxi(),emit:(A="")=>C.emit(A),emitAsync:async(A="")=>await C.emitAsync(A),computed:(A="",O=()=>{},$=[])=>{let k=Ae.extractkeyFromProp(A);if(M.has(k)){Gi({prop:k,componentName:I,action:"computed"});return}return C.computed(k,O,$,{usePropAsString:!0})},watch:(A="",O=()=>{},{wait:$=!1,immediate:k=!1}={})=>C.watch(A,O,{wait:$??!1,immediate:k??!1}),debug:()=>C.debug()}};var Rg=({id:e})=>(rt.get(e)??[]).map(({invalidateId:r})=>{let o=Te.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Ng=({id:e})=>(ot.get(e)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Pg=async({element:e,persistent:t=!1,source:r=Wr})=>{let{debug:o}=Rt();o&&console.log("parse source:",r);let n=Po(),s=[],i=Vl(e);for(;i;){let c=i.getComponentName(),l=n?.[c]?.componentFunction,p=n?.[c]?.componentParams,{scoped:h,bindStore:f}=p,{props:d,id:b,componentName:y,instanceName:T,key:x,dynamicPropsId:S,currentRepeatValue:I,bindEventsId:C,parentId:w,componentRepeatId:M,repeatPropBind:A}=wg({element:i}),O=p?.state??{},{getState:$,setState:k,updateState:P,getProxi:_,emit:D,emitAsync:N,computed:L,watch:E,debug:R}=Mg({element:i,props:d,state:O,id:b,componentName:y,instanceName:T,key:x,repeatPropBind:A,persistent:t,parentId:w,componentRepeatId:M,bindStore:f});jh({id:b}),M&&M?.length>0&&(ha({id:b,value:I}),yf({id:b,repeatId:M,element:i})),Mf({propsId:S,repeatPropBind:A,componentId:b});let B=Eg({getState:$,setState:k,updateState:P,getProxi:_,emit:D,emitAsync:N,computed:L,watch:E,id:b,key:x,bindEventsId:C,debug:R}),V=await l(B),F=i.classList,{newElement:z}=hf({content:V,element:i});if(dd(),F.length>0&&z?.classList.add(...F),!z)return;sf({id:b,newElement:z});let te=Rg({id:b}),ae=Ng({id:b});C&&Cf({element:z,componentId:b,bindEventsId:C});let q=h??Rt().scoped;q&&await ql({id:b,element:z}),z?.inizializeCustomComponent?.(B),s.push({onMount:async()=>{q||await ql({id:b,element:z})},initializeBindPropsWatcher:()=>{Xl({componentId:b,repeatPropBind:A,inizilizeWatcher:!0})},fireInvalidateFunction:te.length>0?()=>{te.forEach(({initializeModule:re})=>{re?.()})}:()=>{},fireRepeatFunction:ae.length>0?()=>{ae.forEach(({initializeModule:re})=>{re?.()})}:()=>{}}),i=Vl(e);let ne=Gl()===Rt().maxParseIteration;if(df(),ne){console.warn(`dom parse reached max parse limit: ${Gl()}`);break}}let a=_f({element:e});Object.keys(a).length>0&&$f(a);for(let c of s.toReversed()){let{onMount:l,initializeBindPropsWatcher:p,fireInvalidateFunction:h,fireRepeatFunction:f}=c;await l(),f(),h(),p()}s.length=0,i=null,jf(e),Of(e),_d(),Wd()};var ks=async({element:e,persistent:t=!1,source:r=Wr})=>{await Pg({element:e,persistent:t,source:r}),ff()},kg=()=>{fe.watch(ut,async({element:e,persistent:t=!1,source:r=Wr})=>{await ks({element:e,persistent:t,source:r})})};var Ag=()=>{ig(),Ef(),Rf()};var Og,_g,$g=({fn:e})=>{e&&(_g=e)},Lg=({fn:e})=>{e&&(Og=e)},Dg=()=>_g,Fg=()=>Og;var Bg=!0,Vg=e=>{Bg=e},Wg=()=>Bg;var jg=()=>{for(let e of cn)st({id:e})};var zg=new Map,Hg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Ug=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(Jt,!0),await Sr();let s=Hi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=Hg({route:e,params:o}),l=Hg({route:i.route,params:a}),p=window.scrollY;zg.set(l,p);let h=zg.get(c)??0;fe.set(wo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=fe.watch(wo,()=>{f=!0});Ag(),fe.set(rn,{route:e,templateName:t}),fe.set(on,o);let b=bn({hash:e}),y=n||b?.skipTransition,T=b?.props??{},x=await b?.layout?.({params:o,props:T})??"",S=Dg(),I=s.cloneNode(!0);S&&I&&!y&&(await S({oldNode:I,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(I,s)),s.replaceChildren(),jg(),Kr({stringDOM:x,parent:s,position:"afterbegin"}),await ks({element:s}),y||(s.style.visibility=""),f||fe.set(nn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Wg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let C=Fg();C&&!y&&(await C({oldNode:I,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),I.remove()),I=null,d?.(),fe.set(Jt,!1)};var Gg=({route:e})=>e,qg=e=>{Gg=e},Jg=({route:e})=>{let t=Gg({route:e});return{route:t,isRedirect:t!==e}};var Yg=({hash:e=""})=>{let t=la(),r=nf();return e===""?t:bn({hash:e})?e:r},Xg=({hash:e=""})=>bn({hash:e})?.templateName??"",Kg=({hash:e=""})=>bn({hash:e})?.restoreScroll??!0;var Qg="",Zg=!0,xr="",eb="",to,ou,As,nu=e=>e.replace("?","").replace("/",""),tb=e=>e.replace("#","").replace("/","").replace(".",""),HI=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=nu(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),UI=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&fe.getProp(Jt)&&e.preventDefault()},{passive:!1});var Pa=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Qg.replace("#","");return}As||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Jg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=nu(i?.[1]??"");eb=xr,xr=tb(i?.[0]??"");let c=HI(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Yg({hash:xr}),h=Xg({hash:xr&&xr.length>0?xr:la()}),f=xr===eb&&l.length===0&&!Zg;e&&!f&&(Qg=`#${xr}${l}`,await Ug({route:p,templateName:h,isBrowserNavigation:Kg({hash:xr})&&!!As,params:c,skipTransition:!!(As??ou)})),e||(fe.set(rn,{route:p,templateName:h}),fe.set(on,c)),ou=void 0,u.useNextLoop(()=>{Zg=!1})},rb=()=>{Pa(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{As=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),Pa()})},ob=({url:e,params:t,skipTransition:r})=>{if(!e||fe.getProp(Jt))return;ou=r;let o=e.split("?"),n=tb(o?.[0]??""),s=UI(t),i=nu(o?.[1]??""),a=s??i;to=a.length>0?a:"",As=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var nb=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Yd(h);let f=document.querySelector(e),d=await t();qg(s),!(!r||!f)&&(Eh({contentId:r}),Ff({element:f}),Lg({fn:l}),$g({fn:c}),Vg(p),kg(),Hd(),tf(o),rf({hash:i}),of({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),wh(),Pa({shouldLoadRoute:!1}),await ks({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),rb())};var sb=()=>Te.size;var ib=()=>J.size;var ue={};To(ue,{clamp:()=>Je,getDefault:()=>yM,mq:()=>xM,printDefault:()=>TM,setDefault:()=>vM,useVelocity:()=>SM});var Ao={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},$s="min",ab="max",iu="desktop",Ls="easeLinear",Os="default",au={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},cu=10,_s=.06,lu="#ff0000",uu="#14df3b",pu=8,mu=10,hu=1e3,du=!1,qI=!1,JI=!1,YI=.01,XI=.06,cb=e=>{let t=qe({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=qe({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=qe({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=KI(e?.mq??{}),s=qe({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:iu,type:String}),i=qe({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:$s,type:String}),a=qe({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:cu,type:Number}),c=su(e?.sequencer?.ease,"sequencer"),l=qe({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Os,type:String}),p=qe({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:_s,type:Number}),h=qe({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:lu,type:String}),f=qe({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:uu,type:String}),d=qe({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:pu,type:Number}),b=qe({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Os,type:String}),y=qe({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:_s,type:Number}),T=qe({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:mu,type:Number}),x=su(e?.parallaxTween?.ease,"parallaxTween"),S=qe({prop:"tween.duration",value:e?.tween?.duration,defaultValue:hu,type:Number}),I=su(e?.tween?.ease,"tween"),C=qe({prop:"tween.relative",value:e?.tween?.relative,defaultValue:du,type:Boolean}),w=qe({prop:"spring.relative",value:e?.spring?.relative,defaultValue:qI,type:Boolean}),M=qe({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:JI,type:Boolean}),A=qe({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:YI,type:Number}),O=qe({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:XI,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:b,lerpConfig:y},parallaxTween:{duration:T,ease:x},tween:{duration:S,ease:I,relative:C},spring:{relative:w,config:e?.spring?.config?{...Ao,...e.spring.config}:Ao},lerp:{relative:M,precision:A,velocity:O}}},qe=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},KI=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:au},su=(e,t)=>{let r=Object.keys(ge).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Ls};var at=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=at(Object.assign({},s),i,r):e[n]=i}),e)};function lb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:au,defaultMq:{value:iu,type:$s},sequencer:{duration:cu,ease:Ls},scrollTrigger:{springConfig:Os,lerpConfig:_s,markerColor:{startEnd:lu,item:uu}},parallax:{defaultRange:pu,springConfig:Os,lerpConfig:_s},parallaxTween:{duration:mu,ease:Ls},tween:{duration:hu,ease:Ls,relative:du},spring:{relative:!1,config:Ao},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let e=lb();return{set:n=>{e=cb(at(lb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var QI=(e="desktop")=>window.innerWidth<he.get("mq")[e],ZI=(e="desktop")=>window.innerWidth>=he.get("mq")[e],eM=(e="desktop")=>he.get("mq")[e],ve={max:QI,min:ZI,getBreackpoint:eM};var Se=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},Je=(e,t,r)=>Math.min(Math.max(e,t),r),ub=(e,t,r)=>(1-r)*e+r*t,ro=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ds=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},pb=(e,t)=>e.map(r=>r[t]);var ka=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Cr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Mn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Er=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Rn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var fu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Aa="radial",tr="start";var Nn="center",Pn="edges",kn="random",mb="MERGE_FROM_UP",gu="MERGE_FROM_DOWN",Oo="equal",_o="start";var $o="center",An={type:Oo,each:0,waitComplete:!1,from:tr,grid:{col:1,row:1,direction:"col"}},Ke={index:0,frame:0};var v={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var wr=e=>e.map(t=>`${t} | `).join(""),oo=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Nt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Ir=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},hb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},db=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},fb=()=>{console.warn("relative prop is not allowed inside a timeline")},gb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},bb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},vb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},yb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},Tb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},Sb=()=>{console.warn("setTween fail")},xb=e=>{console.warn(`label ${e} not founded`)},Cb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Eb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},bu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},wb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},Ib=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Lo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Oa=()=>{console.warn("stagger each must be a Number ")},Mb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Rb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Nb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Pb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},kb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Ab=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Ob=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},_b=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var $b=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Lb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Db=()=>{console.warn("createStaggers error: items array can not be empty")},Fb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Bb=()=>{console.warn(`screateStaggers error: type should be: ${Oo} || ${tr} || ${"end"} || ${$o}`)},Vb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Wb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},vu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},jb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},zb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Hb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Ub=(e,t)=>{console.warn(`${t}: '${e}' is not a Array`)},Gb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},qb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},_n=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Jb=e=>{console.warn(`${e} value must be a string`)},Yb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Xb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Kb=e=>{console.warn(`${e} not found`)},Qb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Zb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${v.DIRECTION_VERTICAL} | ${v.DIRECTION_HORIZONTAL}`)},ev=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},tv=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},rv=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},ov=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)} or a Number between 0 and 100`)},nv=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)}`)},sv=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},iv=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${wr(t)}`)},av=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${wr(t)} or a custom css propierites like margin|line-height|...`)},cv=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${wr(t)}`)},lv=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${wr(t)}`)},uv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},pv=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${wr(t)}`)},mv=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},hv=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},yu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${wr(t)}`)},dv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},fv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},gv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},bv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},vv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},Tu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${wr(r)}, es: 45deg|100px|50vw etc..`)},yv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},Tv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Wt={[ge.easeLinear]:(e,t,r,o)=>r*e/o+t,[ge.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[ge.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[ge.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[ge.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[ge.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[ge.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[ge.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[ge.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[ge.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[ge.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[ge.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[ge.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[ge.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[ge.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[ge.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[ge.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[ge.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[ge.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[ge.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[ge.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[ge.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[ge.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[ge.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[ge.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[ge.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[ge.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[ge.easeInBounce]:(e,t,r,o)=>r-Wt[ge.easeOutBounce](o-e,0,r,o)+t,[ge.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[ge.easeInOutBounce]:(e,t,r,o)=>e<o/2?Wt[ge.easeInBounce](e*2,0,r,o)*.5+t:Wt[ge.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var pt=e=>e in Wt?Wt[e]:(Lo(e),Wt[he.get("tween").ease]);var Sv=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",Su=e=>/^[+-]?\d+(\.\d+)?$/.test(e),xv=e=>/^\d+\.\d+$|^\d+$/.test(e),De=(e,t)=>{let r=new RegExp(`^${Sv(t)}$`,"i");return(e.match(r)||[]).length},rr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},xu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),Cu=(e,t)=>e.some(r=>{let o=new RegExp(`^${Sv(r)}$`,"i");return(t.match(o)||[]).length});var Cv=e=>e&&(De(e,v.PROP_VERTICAL)?v.PROP_VERTICAL:De(e,v.PROP_HORIZONTAL)?v.PROP_HORIZONTAL:De(e,v.PROP_ROTATE)?v.PROP_ROTATE:De(e,v.PROP_ROTATEY)?v.PROP_ROTATEY:De(e,v.PROP_ROTATEX)?v.PROP_ROTATEX:De(e,v.PROP_OPACITY)?v.PROP_OPACITY:De(e,v.PROP_SCALE)?v.PROP_SCALE:De(e,v.PROP_SCALE_X)?v.PROP_SCALE_X:De(e,v.PROP_SCALE_Y)?v.PROP_SCALE_Y:De(e,v.PROP_TWEEN)?v.PROP_TWEEN:e),Ev=e=>{if(e){if(rr(e,v.PX))return v.PX;if(rr(e,v.VH))return v.VH;if(rr(e,v.VW))return v.VW}return""},_a=e=>De(e,v.POSITION_TOP)?v.POSITION_TOP:De(e,v.POSITION_BOTTOM)?v.POSITION_BOTTOM:De(e,v.POSITION_LEFT)?v.POSITION_LEFT:De(e,v.POSITION_RIGHT)?v.POSITION_RIGHT:"",wv=e=>rr(e,v.PX)?v.PX:rr(e,v.VH)?v.VH:rr(e,v.VW)?v.VW:rr(e,v.WPERCENT)?v.WPERCENT:rr(e,v.HPERCENT)?v.HPERCENT:rr(e,v.DEGREE)?v.DEGREE:v.PX;var jt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),La=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||hb(e),o||db(t),r&&o},no=e=>{let t=u.checkType(Number,e);return!t&&e&&Ab(e),t?e:he.get("sequencer").duration},Da=e=>{let t=u.checkType(Number,e);return!t&&e&&_b(e),t&&e?e:1},Iv=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?e:he.get("sequencer").ease},Mv=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("parallaxTween").ease)},Rv=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||$b(e),o||Lb(t),r&&o},Nv=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Oa(),t},Pv=e=>{if(!e)return;let r=[tr,"end",Nn,Pn,kn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||kb(e),s},wu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Mb(e),t},kv=e=>{if(!e)return;let r=[Aa,"row","col"].includes(e);return r||Nb(),r},Av=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Rb(),t},Ov=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Db(),t},_v=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],$v=e=>{if(!e)return;let r=[Oo,_o,"end",$o].includes(e);if(!r){Bb();return}return r};var so=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Wb(e,t),r?e:he.get(t).relative},Fa=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("tween").ease)},Ba=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?e:he.get("tween").ease},Iu=e=>{let{config:t}=he.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&bu(e),!s&&r&&Ib(e),s?t[e]:t.default},Lv=e=>{let{config:t}=he.get("spring"),r=e&&e in t;return!r&&e&&bu(e),r},Mu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&wb(),t?e:{}},Ru=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Ob(e),o?r:he.get("tween").duration},Pt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&vu(e,t),r&&e===!0},de=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&vu(e,t),o?e:r},Va=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&jb(e,t),o?e:r},kt=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&zb(e,t),o?e:r},mt=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Hb(e,t),o?e:r},Dv=(e,t,r)=>{let o=u.checkType(Array,e);return!o&&e&&Ub(e,t),o?e:r},Wa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Gb(),t?e:he.get("lerp").velocity},ja=e=>{let t=u.checkType(Number,e);return!t&&e&&qb(),t?e:he.get("lerp").precision},Fv=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Jb(t),r},Bs=e=>{let t=u.checkType(Number,e);return!t&&e&&Xb(),t?e:void 0},Vs=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Yb(),t},Bv=(e,t)=>{e===-1&&Kb(t)},io=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&vv(r,e),o?e:t},Vv=e=>{let t=u.checkType(Function,e);return!t&&e&&Qb(e),t?e:({resolve:r})=>{r()}},Wv=e=>{let t=u.checkType(Array,e);return!t&&e&&vb(e),t},jv=e=>{let t=u.checkType(String,e);return!t&&e&&yb(e),t},$n=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},Nu=e=>u.checkType(Element,e)?e:document.querySelector(e),Ws=(e,t)=>{if(!e)return v.DIRECTION_VERTICAL;let o=[v.DIRECTION_VERTICAL,v.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Zb(e,t),o?e:v.DIRECTION_VERTICAL},Pu=(e,t)=>{let r=[v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT,v.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||ev(t),i?e:null},zv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&tv(),t?e:void 0},Hv=e=>{let t=e?.getType?.()&&(e.getType()===v.TWEEN_TWEEN||e.getType()===v.TWEEN_TIMELINE);return!t&&e&&rv(),t?e:{}},Uv=e=>{if(!e&&e!==0)return v.ALIGN_CENTER;let t=[v.ALIGN_START,v.ALIGN_TOP,v.ALIGN_RIGHT,v.ALIGN_CENTER,v.ALIGN_BOTTOM,v.ALIGN_LEFT,v.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&ov(e,t),r?e:v.ALIGN_CENTER},Gv=e=>{if(!e)return!1;let t=[v.IN_BACK,v.IN_STOP,v.OUT_BACK,v.OUT_STOP],r=t.includes(e);return!r&&e&&nv(e,t),r?e:!1},ku=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&sv(e,t),o?e:r},qv=e=>{if(!e)return v.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[v.TYPE_PARALLAX,v.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&iv(t,r),o?t:v.TYPE_PARALLAX},Jv=(e,t)=>(()=>{if(t===v.TYPE_PARALLAX){let o=xv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&mv(e),n?10-e:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&hv(e),o?e:"0px"}})(),Do=(e,t,r)=>{let o=he.get("defaultMq").value;if(!e)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&yu(e,s,t,r),i?e:o},Fo=(e,t,r)=>{let o=he.get("defaultMq").type;if(!e)return o;let n=[ab,$s],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&yu(e,n,t,r),s?e:o},Yv=(e,t,r,o)=>{if(!e&&o)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===v.TYPE_SCROLLTRIGGER&&!e,s=[v.PROP_VERTICAL,v.PROP_HORIZONTAL,v.PROP_ROTATE,v.PROP_ROTATEY,v.PROP_ROTATEX,v.PROP_ROTATEZ,v.PROP_OPACITY,v.PROP_SCALE,v.PROP_SCALE_X,v.PROP_SCALE_Y,v.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&av(e,s);let a=t===v.TYPE_PARALLAX&&e===v.PROP_TWEEN&&!r;!r&&!o&&e===v.PROP_TWEEN&&gv(),(r||o)&&e!==v.PROP_TWEEN&&bv(),a&&dv();let c=a?v.PROP_VERTICAL:e,l=Cv(c);return{propierties:i?l??v.PROP_VERTICAL:v.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Xv=e=>{if(!e)return v.EASE_LERP;let t=[v.EASE_SPRING,v.EASE_LERP],r=t.includes(e);r||cv(e,t);let o=r?e:v.EASE_LERP;return r?e:o},za=(e,t)=>{let r=[v.EASE_SPRING,v.EASE_LERP],o=r.includes(e);return!o&&e&&lv(e,r,t),o?e:v.EASE_LERP},Kv=(e,t)=>{let r=t===v.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!e)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&pv(e,n),s?e:r},Qv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&fv();let o=t===v.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?e:o},Zv=(e,t)=>{let r=[v.PX,v.VW,v.VH,v.WPERCENT,v.HPERCENT];if(t===v.PROP_VERTICAL||t===v.PROP_HORIZONTAL){let n=xu(r,e);return n||Tu(e,t,r),n?e:"0px"}if(t===v.PROP_ROTATE||t===v.PROP_ROTATEX||t===v.PROP_ROTATEY||t===v.PROP_ROTATEZ){let n=xu([v.DEGREE],e);return n||Tu(e,t,[v.DEGREE]),n?e:"0"}if(t===v.PROP_SCALE||t===v.PROP_SCALE_X||t===v.PROP_SCALE_Y){let n=Su(e);return n||Tv(e,t),n?e:"0"}let o=Su(e);return o||yv(t),o?e:"0"};var Ha=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},At=e=>({type:$v(e?.stagger?.type)?e.stagger.type:An.type,each:Nv(e?.stagger?.each)?e.stagger.each:An.each,from:Pv(e?.stagger?.from)?e?.stagger?.from:_o,grid:{col:wu(e?.stagger?.grid?.col)?e.stagger.grid.col:An.grid.col,row:wu(e?.stagger?.grid?.row)?e.stagger.grid.row:An.grid.row,direction:kv(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Av(e?.stagger?.waitComplete)?e.stagger.waitComplete:An.waitComplete}),or=(e,t)=>e.length>t.length?e:t;var js=e=>e%2,tM=e=>Math.floor(Math.random()*e),rM=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},oM=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Ha(s);if(n===kn)return{index:e,frame:o[tM(o.length)]};if(n===tr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Nn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:0}:js(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Pn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:js(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:js(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Pe(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},ey=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ds(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...pb(o,a)],[])].flat()}else return e},ty=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=ey(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=ey(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Ds(c,h),d=f[0];return d.forEach((y,T)=>{let{index:x,frame:S}=oM(T,f[0].length,r,rM(d,r.each,T));y.index=x,y.frame=S,S>=o.frame&&(o={index:x,frame:S}),S<=n.frame&&(n={index:x,frame:S})}),f.forEach(y=>{y.forEach((T,x)=>{T&&(T.index=f[0][x].index,T.frame=f[0][x].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var nM=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),sM=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Ua(o,r+f,l)&&c.push(o[r+f][l]),Ua(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Ua(o,r-f,l)&&c.push(o[r-f][l]),Ua(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),Ua=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Au=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ds(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=nM(s,o,n),a=sM(i,o,n,s),c=i.reduce((d,b,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?mb:gu)===gu?c.reduce((d,b,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],x=[...c[y],...T];return d.push(x),d}},[]):c.reduce((d,b,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],x=[...c[y],...T];return d.push(x),d}},[]).toReversed()).reduce((d,b)=>b.length===0?d:[...d,b],[])}};var iM=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Au(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Ha(r.each),b=h*d;f.index=i,f.frame=b,b>=o.frame&&(o={index:i,frame:b}),b<=n.frame&&(n={index:i,frame:b}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Au(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},aM=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[tr,"end",Nn,Pn,kn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Pb(),r.from=tr),ty({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Ot=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Aa?iM({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):aM({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Ln=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Dn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},nr=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Bn=(e,t)=>Object.keys(e).map(r=>{if(!jt(t[r])||!jt(e[r]))return Ir(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Mr=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Vn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Wn=(e,t,r,o)=>(u.checkType(Number,e)||Oa(),e>0&&t&&(r.length>0||o.length>0));var Ga=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Fe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),jn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),zn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Hn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Ou=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var ry=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,b=a+d*1/s,y=Se(b),T=Math.abs(d)<=.1,x=t===0?!0:Math.abs(c-y)<=n;return T&&x?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Tt=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;constructor(t){this.#i=At(t??{}),this.#o=so(t?.relative,"spring"),this.#n=Iu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#c=u.getUnivoqueId(),this.#h=!1,this.#l=void 0,this.#s=void 0,this.#u=void 0,this.#t=[],this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#p=!0,this.#C=!0,this.#x=!1,this.#y=!1,this.#b={reverse:!1,configProps:this.#n,relative:this.#o,immediate:!1},this.#T=Ke,this.#P=Ke;let r=t?.data;r&&this.setData(r)}#M(t,r,o,n,s,i){this.#h=!0,this.#t=ry({values:this.#t,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#t,"currentValue");if(this.#g||Ln({stagger:this.#i,callback:this.#m,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#t.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#t)h.fromValue=h.toValue;this.#l?.(!0),this.#u=void 0,this.#s=void 0,this.#l=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#t,"toValue");Dn({onComplete:l,callback:this.#m,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#i,slowlestStagger:this.#T,fastestStagger:this.#P,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#M(l,p,o,n,s,i)})})}#R(t,r){for(let a of this.#t)a.velocity=Math.trunc(this.#n.velocity);let o=this.#n.tension,n=this.#n.friction,s=Math.max(1,this.#n.mass),i=this.#n.precision;this.#M(t,r,o,n,s,i)}async#I(){if(Wn(this.#i.each,this.#p,this.#a,this.#m)){let{averageFPS:t}=await u.useFps();co("spring",t);let r=or(this.#a,this.#m);if(this.#i.grid.col>r.length){Nt(r.length),this.#p=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:this.#T,fastestStagger:this.#P});this.#a.length>this.#m.length?this.#a=o:this.#m=o,this.#d=n,this.#T=i,this.#P=s,this.#p=!1}return{ready:!0}}async#A(t,r){this.#y||(this.#l=t,this.#s=r,this.#p&&(this.#y=!0,await this.#I(),this.#y=!1),Vn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#R(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#u=void 0,this.#s=void 0,this.#l=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#t=Mn(this.#t)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#u=void 0,this.#s=void 0,this.#l=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#x=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#t=ka(this.#t),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#l&&Ga((t,r)=>this.#R(t,r)))}setData(t){this.#t=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#n.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#t.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#t=at(this.#t,this.#e)}#O(t){let o=he.get("spring").config,n=Lv(t?.config)?o?.[t?.config??"default"]??Ao.default:this.#b.configProps,s=Mu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#b.reverse,relative:t?.relative??this.#b.relative,immediate:t?.immediate??this.#b.immediate,configProps:i},{relative:c}=a;return this.#n=i,this.#o=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=ao(t);return this.#w(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=Fn(t);return this.#w(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!ro(t,r))return oo("spring goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#w(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Mr(t);return this.#w(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Mr(t);this.#t=Hn(o,this.#t);let{reverse:n}=this.#O(r??{});Pt(n,"reverse")&&(this.#t=Er(t,this.#t)),this.#t=Rn(this.#t,this.#o),this.#t=Cr(this.#t)}#w(t,r,o={}){this.#t=Hn(t,this.#t);let{reverse:n,immediate:s}=this.#O(o);if(Pt(n,"reverse")&&(this.#t=Er(r,this.#t)),this.#t=Rn(this.#t,this.#o),Pt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#t=Cr(this.#t),Promise.resolve();let i=!this.#h&&!this.#u;return i&&(this.#u=new Promise((a,c)=>{this.#A(a,c)})),i&&this.#u?this.#u:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#t,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#t,"fromValue")}getTo(){return Fe(this.#t,"toValue")}getFromNativeType(){return zn(this.#t)}getToNativeType(){return jn(this.#t)}getType(){return"SPRING"}getId(){return this.#c}isActive(){return this.#h}updateConfigProp(t={}){let r=Mu(t);this.#n={...this.#n,...r},this.#b=at(this.#b,{configProps:r})}updateConfig(t){this.#n=Iu(t),this.#b=at(this.#b,{configProps:this.#n})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#m);return this.#m=r,()=>this.#m=o(this.#m)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#u&&this.stop(),this.#d=[],this.#f=[],this.#m=[],this.#a=[],this.#t=[],this.#u=void 0,this.#r.forEach(t=>t()),this.#r=[]}};var qa=0,Ja=0,zs=0,Gs=!1,Ya=0,Xa=0,qs=!1,Bo=1,Vo=1,Wo=1,Js=1,Ys=!1,Qa=0,Za=0,Un=2,cM=.6,lM=60,Rr=Un,uM=.1,Ka=!1,Hs=null,pM=200,mM=120,lo=null,_u=()=>{},$u=()=>{},Lu=()=>{},sr,Us=new Map,hM=e=>{if(e<=1)return Un;let t=Math.exp((e-1)*cM);return Math.min(Un*t,lM)},dM=({clientX:e,clientY:t})=>{if(!sr)return;Ya=e,Xa=t;let r=e-qa,o=t-Ja,n=u.getTime(),s=n-zs;if(Gs||s===0){qa=e,Ja=t,zs=n,Bo=1,Vo=1,Wo=1,Rr=Un,sr.goTo({speed:1,speedX:1,speedY:1});return}let i=Math.hypot(r,o);Js+=i;let a=r/s,c=o/s,l=Math.hypot(a,c),p=hM(l);p>Rr?Rr=p:Rr+=(p-Rr)*uM,Math.abs(r)>Rr&&(Qa=Math.sign(r)),Math.abs(o)>Rr&&(Za=Math.sign(o)),Bo=Math.max(1,Math.round((l+1)*1e4)/1e4),Vo=Math.max(1,Math.round((Math.abs(a)+1)*1e4)/1e4),Wo=Math.max(1,Math.round((Math.abs(c)+1)*1e4)/1e4),sr.goTo({speed:Bo,speedX:Vo,speedY:Wo}),qa=e,Ja=t,zs=n},ny=()=>{_u=u.usePointerMove(()=>{_u(),zs=u.getTime(),Ys=!1,lo?(clearTimeout(lo),lo=null):(Js=1,qs=!1),Gs=!0})},sy=()=>{Lu=u.usePointerMove(e=>{dM(e),Gs&&(Gs=!1)})},oy=()=>{Hs&&(clearTimeout(Hs),Hs=null)},fM=()=>{sr&&(sr.goTo({speed:1,speedX:1,speedY:1}),Qa=0,Za=0,Rr=Un,lo=setTimeout(()=>{lo=null,Ys=!0,Bo=1,Vo=1,Wo=1,qs=!0},mM),Lu(),$u(),ny(),sy(),iy())},iy=()=>{oy();let e=()=>{oy(),Hs=setTimeout(()=>{Hs=null,fM()},pM)};$u=u.usePointerMove(e)},gM=()=>{Ka||(Ka=!0,ny(),sy(),iy(),sr=new Tt({data:{speed:1,speedX:1,speedY:1}}),sr.subscribe(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,clientX:Ya,clientY:Xa,directionX:Qa,directionY:Za,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}),sr.onComplete(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,clientX:Ya,clientY:Xa,directionX:0,directionY:0,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}))},bM=e=>{if(globalThis.window===void 0)return()=>{};let t=Ie();return Us.set(t,e),gM(),()=>{Us.delete(t),Us.size===0&&Ka&&(lo&&(clearTimeout(lo),lo=null),_u(),$u(),Lu(),sr.destroy(),sr=null,Ka=!1,qa=0,Ja=0,zs=0,Gs=!1,Qa=0,Za=0,Ya=0,Xa=0,Rr=Un,Js=1,Ys=!1,qs=!1,Bo=1,Vo=1,Wo=1)}},ay=bM;function vM(e){he.set(e)}function yM(e){return he.get(e)}function TM(){he.print()}function SM(e=()=>{}){return ay(e)}function xM(e,t){switch(e){case"min":return ve.min(t);case"max":return ve.max(t);case"get":return ve.getBreackpoint(t)}}var U={};To(U,{createLerp:()=>kM,createMasterSequencer:()=>MM,createScrollerTween:()=>wM,createSequencer:()=>IM,createSpring:()=>PM,createStaggers:()=>RM,createTimeTween:()=>NM});var cy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ub(s,i,r/t*60),c=Se(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Nr=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;constructor(t){this.#i=At(t??{}),this.#o=so(t?.relative,"lerp"),this.#n=Wa(t?.velocity),this.#c=ja(t?.precision),this.#h=u.getUnivoqueId(),this.#l=!1,this.#s=void 0,this.#u=void 0,this.#t=void 0,this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#p=!1,this.#C=!0,this.#x=!0,this.#y=!1,this.#b=!1,this.#T={reverse:!1,velocity:this.#n,precision:this.#c,relative:this.#o,immediate:!1},this.#P=Ke,this.#M=Ke;let r=t?.data;r&&this.setData(r)}#R(t,r){this.#l=!0,this.#e=cy({values:this.#e,fps:r,velocity:this.#n,precision:this.#c});let o=Fe(this.#e,"currentValue");if(this.#p||Ln({stagger:this.#i,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#l=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#t=void 0,this.#u=void 0,this.#s=void 0,this.#p=!1,this.#l=!1},i=Fe(this.#e,"toValue");Dn({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#i,slowlestStagger:this.#P,fastestStagger:this.#M,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#l&&this.#R(s,i)})})}#I(t,r){this.#R(t,r)}async#A(){if(Wn(this.#i.each,this.#C,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("lerp",t);let r=or(this.#d,this.#a);if(this.#i.grid.col>r.length){Nt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#i,slowlestStagger:this.#P,fastestStagger:this.#M});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#P=i,this.#M=s,this.#C=!1}return{ready:!0}}async#O(t,r){this.#b||(this.#s=t,this.#u=r,this.#C&&(this.#b=!0,await this.#A(),this.#b=!1),Vn({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#I(o,n)}))}clearCurretPromise(){this.#p||(this.#u?.(u.ANIMATION_STOP_REJECT),this.#t=void 0,this.#u=void 0,this.#s=void 0,this.#l=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#p&&(this.#p=!1),r&&(this.#e=Mn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#u&&(this.#u(u.ANIMATION_STOP_REJECT),this.#t=void 0,this.#u=void 0,this.#s=void 0),this.#l=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#p||(this.#p=!0,this.#l=!1,this.#e=ka(this.#e),this.freezeStagger())}resume(){this.#p&&(this.#p=!1,this.unFreezeStagger(),!this.#l&&this.#s&&Ga((t,r)=>this.#I(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#m=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#m)}#w(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#o=so(s,"lerp"),this.#n=Wa(o),this.#c=ja(n),r}goTo(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=ao(t);return this.#F(o,t,r)}goFrom(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Fn(t);return this.#F(o,t,r)}goFromTo(t,r,o={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ro(t,r))return oo("lerp goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#F(n,t,o)}set(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Mr(t);return this.#F(o,t,r)}setImmediate(t,r={}){if(this.#l&&this.stop({clearCache:!1,updateValues:!1}),this.#p)return;this.#x=!1;let o=Mr(t);this.#e=Hn(o,this.#e);let{reverse:n}=this.#w(r??{});Pt(n,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=Rn(this.#e,this.#o),this.#e=Cr(this.#e)}#F(t,r,o={}){this.#e=Hn(t,this.#e);let{reverse:n,immediate:s}=this.#w(o??{});if(Pt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=Rn(this.#e,this.#o),Pt(s,"immediate "))return this.#l&&this.stop({updateValues:!1}),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#l&&!this.#t;return i&&(this.#t=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#t?this.#t:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#m,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#l}updateVelocity(t){this.#n=Wa(t),this.#T=at(this.#T,{velocity:this.#n})}updatePrecision(t){this.#n=ja(t),this.#T=at(this.#T,{precision:this.#c})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#t&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#t=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var ec=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Xs=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;constructor(t){this.#i=Mv(t?.ease),this.#o=no(t?.duration),this.#n=At(t),this.#c=[],this.#h=[],this.#l=[],this.#s=[],this.#u=[],this.#t="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#n.each>0&&(this.#s.length>0||this.#l.length>0)){let t=or(this.#s,this.#l);if(this.#n.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:Ke,fastestStagger:Ke});this.#s.length>this.#l.length?this.#s=r:this.#l=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#c){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,b=this.#i(t,f,d,this.#o);n.currentValue=Se(b)}let o=Fe(this.#c,"currentValue");u.useNextTick(()=>{ec({each:this.#n.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#l,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#c=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#c=this.#c.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=ao(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#s,this.#u);return this.#s=r,this.#u=n,()=>this.#s=o(this.#s)}getDuration(){return this.#o}getType(){return this.#t}destroy(){this.#c=[],this.#h=[],this.#l=[],this.#s=[],this.#u.forEach(t=>t()),this.#u=[]}};var Ks=class{#i="sequencer";#o;constructor(){this.#o=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#o.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#o.push(t)}inzializeStagger(){this.#o.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#o.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#o.length>0?this.#o[0].getDuration():0}setStretchFactor(t){this.#o.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#o.flatMap(t=>t.getLabels())}resetLastValue(){this.#o.forEach(t=>t.resetLastValue())}disableStagger(){this.#o.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#o.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#o.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#o.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#i}destroy(){this.#o.forEach(t=>{t.destroy()}),this.#o=[]}};var ly=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,toValue:e[r],ease:pt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:pt(t)})),uy=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,fromValue:e[r],ease:pt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:pt(t)})),py=(e,t,r)=>Object.keys(e).map(o=>!jt(t[o])||!jt(e[o])?(Ir(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:pt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:pt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Du={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},my=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Du[o].get]:n},void 0),hy=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var dy=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:x,end:S,values:I}=e[T],C=null;for(let A of I)if(A.prop===o.prop){C=A;break}if(!C||!C.active)continue;let{prop:w}=C;if(hy(e,T,w,r)){n={toValue:C.toValue,fromValue:C.fromValue,start:x,end:S,ease:C.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,b;r>=s&&r<=i?b=l(r-s,h,p-h,f):b=d;let y=Number.isNaN(b)?d:b;o.currentValue=Se(y),o.settled=!0}return t};var Fu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=my(e,o,c,s);return!p&&p!==0?a:{...a,[Du[s].set]:p}});return{...r,values:i}});var Bu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var tc=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Bu(a,"start");return Bu(c,"priority")};var rc=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Qs=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;constructor(t){this.#i=[],this.#o=[],this.#n=[],this.#c=[],this.#h=[],this.#l=[],this.#s=[],this.#u=[],this.#t=no(t?.duration),this.#e="sequencer",this.#m={start:0,end:this.#t,ease:Iv(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=At(t),this.#p=!0,this.#C=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#c.length>0)){let t=or(this.#h,this.#c);if(this.#g.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#l,stagger:this.#g,slowlestStagger:Ke,fastestStagger:Ke});this.#h.length>this.#c.length?this.#h=r:this.#c=r,this.#l=o}this.#C=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#x({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:t,isLastDraw:r,direction:n}))}#x({partial:t=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#r=t,this.#y(t)),!this.#a&&this.#r&&(!o||o===We.NONE)&&(this.#f=t>=this.#r?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#i=dy({timeline:this.#o,valuesState:this.#i,partial:t});let n=Fe(this.#i,"currentValue");ec({each:this.#g.each,useStagger:this.#p,isLastDraw:r,callBackObject:n,callback:this.#c,callbackCache:this.#h,callbackOnStop:this.#l}),this.#b(t),this.#p=!0,this.#r=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#y(t=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:We.FORWARD},s={shouldFire:t<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#b(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&t>o&&this.#r<=o,s=this.#f===We.BACKWARD&&t<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#t;this.#o=[...this.#o].map(o=>{let{start:n,end:s}=o;return{...o,start:Se(n*r),end:Se(s*r)}}),this.#n=[...this.#n].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}})}setData(t={}){return this.#i=Object.entries(t).map(r=>{let[o,n]=r,s=Rv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:pt(he.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#m,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=ly(t,i),c=rc({data:a,values:this.#i}),l=Object.keys(t),p=tc({timeline:this.#o,values:c,start:n,end:s,duration:this.#t,propToFind:"fromValue"});return this.#o=Fu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#m,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=uy(t,i),c=rc({data:a,values:this.#i}),l=Object.keys(t),p=tc({timeline:this.#o,values:c,start:n,end:s,duration:this.#t,propToFind:"toValue"});return this.#o=Fu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#m,...o},{start:s,end:i,ease:a}=n;if(!La({start:s,end:i}))return this;if(!ro(t,r))return oo("sequencer goFromTo:",t,r),this;let c=py(t,r,a),l=rc({data:c,values:this.#i});return this.#o=tc({timeline:this.#o,values:l,start:s,end:i,duration:this.#t,propToFind:""}),this}label(t="",r=0){return this.#n.push({name:t,time:r}),this}getLabels(){return this.#n}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||Cb(t),n||Eb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#c);return this.#c=r,()=>this.#c=o(this.#c)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#h,this.#u);return this.#h=r,this.#u=n,()=>this.#h=o(this.#h)}getDuration(){return this.#t}setDuration(t=0){this.#t=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#p=!1}destroy(){this.#i=[],this.#o=[],this.#c=[],this.#h=[],this.#l=[],this.#s=[],this.#u.forEach(t=>t()),this.#u=[]}};var fy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Se(s)}}return{...n,currentValue:n.fromValue}});var Pr=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;constructor(t){this.#i=Fa(t?.ease),this.#o=Ru(t?.duration),this.#n=so(t?.relative,"tween"),this.#c=At(t??{}),this.#h=u.getUnivoqueId(),this.#l=!1,this.#s=void 0,this.#u=void 0,this.#t=void 0,this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#p=!1,this.#C=0,this.#x=0,this.#y=0,this.#b=!0,this.#T=!0,this.#P=!1,this.#M=!1,this.#R={duration:this.#o,ease:Ba(t?.ease),relative:this.#n,reverse:!1,immediate:!1},this.#I=Ke,this.#A=Ke;let r=t?.data;r&&this.setData(r)}#O(t){this.#l=!0,this.#p&&(this.#y=t-this.#C-this.#x),this.#x=t-this.#C-this.#y,Math.round(this.#x)>=this.#o&&(this.#x=this.#o),this.#e=fy({values:this.#e,timeElapsed:this.#x,duration:this.#o,ease:this.#i});let r=Math.round(this.#x)===this.#o,o=Fe(this.#e,"currentValue");if(this.#p||Ln({stagger:this.#c,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){Dn({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#t=void 0,this.#u=void 0,this.#s=void 0,this.#y=0,this.#p=!1,this.#l=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#c,slowlestStagger:this.#I,fastestStagger:this.#A,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#l&&this.#O(n)})})}#w(t){this.#C=t,this.#O(t)}async#F(){if(Wn(this.#c.each,this.#b,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("tween",t);let r=or(this.#d,this.#a);if(this.#c.grid.col>r.length){Nt(r.length),this.#b=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#c,slowlestStagger:this.#I,fastestStagger:this.#A});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#I=i,this.#A=s,this.#b=!1}return{ready:!0}}async#$(t,r){this.#M||(this.#s=t,this.#u=r,this.#b&&(this.#M=!0,await this.#F(),this.#M=!1),Vn({validationFunction:this.#r,defaultRafInit:o=>this.#w(o)}))}clearCurretPromise(){this.#p||(this.#u?.(u.ANIMATION_STOP_REJECT),this.#t=void 0,this.#u=void 0,this.#s=void 0,this.#l=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#p=!1,r&&(this.#e=Mn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#u&&(this.#u(u.ANIMATION_STOP_REJECT),this.#t=void 0,this.#u=void 0,this.#s=void 0),this.#l=!1}freezeStagger(){this.#P||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#P=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#P&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#P=!1)}pause(){this.#p||(this.#p=!0,this.freezeStagger())}resume(){this.#p&&(this.#p=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#m=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#m)}#k(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#D(t){let r={...this.#R,...t},{ease:o,duration:n,relative:s}=r;return this.#i=Fa(o),this.#n=so(s,"tween"),this.#o=Ru(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(t);return this.#v(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Fn(t);return this.#v(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(t,r))return oo("tween goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#v(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};return this.#v(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#p)return;this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};this.#e=Ou(o,this.#e);let{reverse:s}=this.#D(n);Pt(s,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=fu(this.#e,this.#n),this.#e=Cr(this.#e)}#v(t,r,o={}){this.#e=Ou(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Pt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=fu(this.#e,this.#n),Pt(s,"immediate "))return this.#l&&(this.stop({clearCache:!1,updateValues:!1}),this.#k()),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#l&&!this.#t;return i&&(this.#t=new Promise((a,c)=>{this.#$(a,c)})),i&&this.#t?this.#t:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#m,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#l}updateEase(t){this.#i=Fa(t),this.#R=at(this.#R,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#t&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#t=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var CM=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=Se(o*h),d=Se(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Se(p),end:Se(i+p)}},EM=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===_o)return{start:0,end:Se(e-(i-c))};if(n===$o){let l=(i-c)/2;return{start:Se(l),end:Se(e-l)}}return n==="end"?{start:Se(i-c),end:Se(e)}:{start:0,end:e}},gy=e=>{let t=_v(e?.items),r=At(e),o=no(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,b)=>({item:d,start:0,end:o,index:b}));if(!Ov(t))return i;r.grid?.col>t.length&&(Nt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Vb(n),s=1);let{staggerArray:a}=Ot({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Ke,fastestStagger:Ke}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Fb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,b)=>d-b),h=p.length;return c.map(({item:d,frame:b})=>{let y=p.indexOf(b),T=s*h/n,{start:x,end:S}=r.type===Oo?CM({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===_o||r.type==="end"||r.type===$o?EM({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:x,end:S,index:y}})};function wM(e){return new Xs(e)}function IM(e){return new Qs(e)}function MM(){return new Ks}function RM(e){return gy(e)}function NM(e){return new Pr(e)}function PM(e){return new Tt(e)}function kM(e){return new Nr(e)}var Re={};To(Re,{createAsyncTimeline:()=>OM,createSyncTimeline:()=>AM});var X=()=>{},oc=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var nc=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var uo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?nc({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Vu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):X;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Zs=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;#O;#w;#F;#$;#k;#D;#v;#E;constructor(t){this.#i=Da(t?.repeat),this.#o=de(t?.yoyo,"asyncTimeline: yoyo",!1),this.#n=de(t?.freeMode,"asyncTimeline: freeMode",!1),this.#c=de(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#l=de(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#u=[],this.#t=[],this.#e=!1,this.#m={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#p=1,this.#C=!1,this.#x=!1,this.#y=!1,this.#b=!1,this.#T=!1,this.#P=!1,this.#M=!0,this.#R=0,this.#I=0,this.#A=0,this.#O=!1,this.#w=[],this.#F=!1,this.#$=0,this.#k=[],this.#D=[],this.#v=void 0,this.#E=void 0}#V(){let t=this.#s[this.#g],r=this.#w;if(this.#w=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=nc({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:b}=a,y={...d};delete y.delay;let{active:T,index:x}=this.#a,S=Number.isNaN(x)?!1:T&&x&&this.#g<x;S&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,fb()),this.#w.push({id:b,action:p});let I=r.find(({id:w,action:M})=>w===b&&M===p),C={set:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>I?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(S){w({resolve:!0});return}let M=this.getDirection();l({direction:M,loop:this.#p}),w({resolve:!0})}),addAsync:()=>{this.#P=!0;let w=this.#R;return I?new Promise(M=>M({resolve:!0})):new Promise((M,A)=>{if(S){M({resolve:!0});return}let O=this.getDirection();l({direction:O,loop:this.#p,resolve:()=>{if(w===this.#R){M({resolve:!0});return}A()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(I)return new Promise(A=>A({resolve:!0}));let w=u.checkType(Boolean,l());w||gb(l);let M=w?l():!0;return new Promise(A=>{!S&&M&&(this.#T=!0),A({resolve:!0})})}};return new Promise((w,M)=>{let A=S?!1:d?.delay,O=this.#R;if(A){let $=u.getTime();requestAnimationFrame(()=>{this.#_({start:$,deltaTimeOnpause:0,delay:A,mainReject:M,mainResolve:w,previousSessionId:O,tween:c,stepFunction:C,action:p})});return}Vu({mainReject:M,mainResolve:w,isStopped:()=>this.#M,isInPause:()=>this.#b,addToActiveTween:$=>this.#X($),currentSessionId:()=>this.#R,previousSessionId:O,tween:c,stepFunction:C,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#M)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#q(),this.#p++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#q(),this.#H(),this.#V();return}if(this.#g<this.#s.length-1){this.#g++,this.#V();return}if(this.#p<this.#i||this.#i===-1){if(i&&a===this.#s.length&&!this.#n){let p=this.#t.map(({tween:h})=>{let f=uo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,b)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>b())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#D.forEach(({cb:p})=>p()),this.#M=!0,this.#v&&Xo.add(()=>{Ct.add(()=>{this.#v?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#P=!1})}#_({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#b&&(r=p-this.#A),h-r>=o||this.#M||this.#C){Vu({mainReject:n,mainResolve:s,isStopped:()=>this.#M,isInPause:()=>this.#b,addToActiveTween:f=>this.#X(f),currentSessionId:()=>this.#R,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#_({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#p>0){let t=this.getDirection();this.#k.forEach(({cb:r})=>r({direction:t,loop:this.#p}))}this.#p++,this.#g=0,this.#q(),(this.#o||this.#x)&&this.#H(),this.#x=!1,this.#V()}#X(t){let r=t?.getId&&t.getId();if(!r)return X;let o=this.#I;return this.#I++,this.#u.push({tween:t,uniqueId:r,id:o}),()=>{this.#u=this.#u.filter(({id:n})=>n!==o)}}#H(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#l||(bb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#N(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#j(t){let r=t?.getId?.();if(this.#t.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#t.push(n)}#L(){this.#t.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=this.#h?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#N({...this.#m,id:this.#r,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#j(t),this}goTo(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#l?n:{};return this.#r++,this.#l?this.#N({...this.#m,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#N({...this.#m,id:this.#r,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#j(t),this}goFrom(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#l?n:{};return this.#r++,this.#l?this.#N({...this.#m,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#N({...this.#m,id:this.#r,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#j(t),this}goFromTo(t,r={},o={},n={}){if(!Vs(t))return this;n.delay=Bs(n?.delay);let s=this.#h?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#N({...this.#m,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#j(t),this}add(t=X){let r=io(t,()=>{},"timeline add function");return this.#f?(_n("add"),this):(this.#r++,this.#N({...this.#m,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Vv(t);return this.#f?(_n("addAsync"),this):(this.#r++,this.#N({...this.#m,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(_n("createGroup"),this):(this.#r++,this.#N({...this.#m,id:this.#r,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#N({...this.#m,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(_n("suspend"),this):(this.#r++,this.#N({...this.#m,id:this.#r,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(_n("label"),this):Fv(t?.name,"asyncTimeline label:")?(this.#r++,this.#N({...this.#m,id:this.#r,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#t.forEach(({tween:t})=>{let r=t.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#m,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#t.forEach(({tween:t})=>{let r=uo({timeline:this.#s,tween:t,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#m,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Wv(r),n=jv(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#t.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(Tb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=uo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{Sb()})})}#G(){this.#E&&(this.#E(u.ANIMATION_STOP_REJECT),this.#E=void 0)}async#se(){if(this.#F)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#F=!0,await u.useFps(),this.#F=!1}async playFrom(t){return await this.#se(),this.#Z(t,!1)}async playFromReverse(t){return await this.#se(),this.#Z(t,!0)}#Z(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#P||(this.#y&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Bv(this.#a.index,t),this.#V())}})})}async play(){return await this.#se(),new Promise((t,r)=>{if(this.#c&&this.#U(),this.#n){if(this.#s.length===0||this.#P)return;this.stop(),this.#M=!1,this.#y&&this.#H(),this.#R++,u.useFrameIndex(()=>{this.#E=r,this.#v=t,this.#V()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#M=!1;let o=this.#t.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#E=r,this.#v=t,this.#V()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#se(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#c&&this.#U(),!(this.#s.length===0||this.#P)&&(this.stop(),this.#M=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#p--,this.#R++,u.useFrameIndex(()=>{this.#v=a,this.#E=c,this.#V()},1))})}reverseNext(){this.#C=!0}stop({clearCache:t=!0}={}){this.#M=!0,this.#g=0,this.#p=1,this.#G(),this.#C=!1,this.#q(),this.#x=!1,this.#b=!1,this.#T=!1,this.#P=!1,this.#A=0,this.#t.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#H(),this.#y=!1,this.#n||this.#L()}pause(){this.#b||(this.#b=!0,this.#A=u.getTime(),this.#ie())}resume(){if(this.#b&&(this.#b=!1,this.#A=0,this.#W()),this.#T){if(this.#T=!1,this.#A=0,this.#g<=this.#s.length-2){this.#g++,this.#V();return}this.#g===this.#s.length-1&&(this.#g=this.#o&&!this.#y?1:0,this.#q(),this.#o&&this.#H(),this.#p++,this.#V())}}#ie(){this.#u.forEach(({tween:t})=>{t?.pause?.()})}#W(){this.#u.forEach(({tween:t})=>{t?.resume?.()})}#q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#u}isActive(){return!this.#M}isPaused(){return this.#b}isSuspended(){return this.#T}getDirection(){return this.#M?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(t){this.#k.push({cb:t,id:this.#$});let r=this.#$;return()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#$});let r=this.#$;return this.#$++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#t.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#u=[],this.#D=[],this.#k=[],this.#t=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var ei=class{#i;#o;#n;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;#O;#w;constructor(t={}){this.#i=no(t?.duration),this.#o=de(t?.yoyo,"syncTimeline: yoyo",!1),this.#n=Da(t?.repeat),this.#c=[],this.#h=0,this.#l=0,this.#s=0,this.#u=0,this.#t=0,this.#e=0,this.#m=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#p=!0,this.#C=!1,this.#x=!1,this.#y=!1,this.#b=!1,this.#T=0,this.#P=[],this.#M=[],this.#R=[],this.#I=void 0,this.#A=void 0,this.#O={time:0,direction:We.NONE},this.#w={direction:We.NONE,loop:0}}#F(t,r){if(this.#p||this.#y)return;let o=!this.#n||this.#n>=2&&this.#f===this.#n-1?0:1e3/r/2;this.#b&&(this.#u=t-this.#h-this.#l-this.#e),this.#l=Math.trunc(t-this.#h-this.#u-this.#e);let n=this.#m?this.#t-(this.#l-this.#t):this.#l,s=this.getDirection();if(this.#b||(this.#s=Je(n,0,this.#i),this.#C||(this.#c.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#R.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#i-o&&n>=0+o&&!this.#p){this.#x=!1,this.#$();return}if(this.#S(),this.#a){this.#m=!0,this.#t=0,this.#e=0,this.#a=!1,this.#$();return}if(u.useNextFrame(()=>{!this.#y&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#w.direction=s,this.#w.loop=this.#f,this.#P.forEach(({cb:i})=>i(this.#w)))}),!this.#n||this.#f===this.#n-1&&this.#r>this.#g){let i=this.#s;this.#c.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#p=!0,this.#k(),this.#h=t,this.#m&&(this.#m=!1),this.#M.forEach(({cb:a})=>a()),this.#I&&this.#I(!0);return}if(this.#o){this.reverse(),this.#$();return}if(this.#d){this.#k(),this.#h=t,this.#m||(this.#d=!this.#d),this.#l=this.#i,this.#s=this.#i,this.#u=this.#i,this.#$();return}this.#k(),this.#h=t,this.#m&&(this.#d=!this.#d),this.#$()}#$(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#F(t,r)})})}#k(){this.#l=0,this.#u=0,this.#s=0,this.#t=0,this.#e=0}#D(t){let r=this.#c.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||xb(t),r.time}#v(){this.#A&&(this.#A(u.ANIMATION_STOP_REJECT),this.#A=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#v(),this.#I=o,this.#A=n,!(!this.#p&&!this.#m&&r))){if(!this.#p&&this.#m&&r){this.reverse();return}this.#E()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#v(),this.#I=r,this.#A=o,this.#E(s)})}#E(t=0){this.#S(),this.#k(),this.#s=t,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#y=!0,this.#_(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#v(),this.#I=r,this.#A=o,this.#V(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#v(),this.#I=o,this.#A=n,!(!this.#p&&this.#m&&r))){if(!this.#p&&!this.#m&&r){this.reverse();return}this.#V(this.#i,!0)}})}#V(t=0){this.#S(),this.#l=t,this.#s=t,this.#u=t,this.#t=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#y=!0,this.#_(t)}async#_(t){if(this.#n===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#m=!1,this.#c.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#p=!1,this.#b=!1,this.#f=0,this.#F(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#p||this.#b||this.#y)&&(this.#p=!1,this.#b=!0,t)){this.#c.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#p||!this.#b||this.#y)&&(this.#b=!1,t)){this.#c.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#b&&this.resume(),!(this.#p||this.#y)&&(this.#S(),this.#m=!this.#m,this.#m?this.#t=this.#l:this.#e+=this.#l-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#p=!0,this.#v(),t){this.#c.forEach(r=>{r.cleanCachedId()});return}this.#c.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#i),this.#c.push(t),this}setDuration(t){return this.#i=t,this}#S(){this.#c.forEach(t=>t.resetLastValue())}isActive(){return!this.#p}isPaused(){return this.#b}getDirection(){return this.#p?We.NONE:this.#m?We.BACKWARD:We.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#P.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#P=this.#P.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#M.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#M=this.#M.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#R.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#R=this.#R.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#c.forEach(t=>t.destroy()),this.#c=[],this.#R=[],this.#P=[],this.#M=[]}};function AM(e){return new ei(e)}function OM(e){return new Zs(e)}var Qe={};To(Qe,{createParallax:()=>BM,createScrollTrigger:()=>VM});var _M=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?v.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?v.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?v.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?v.ON_ENTER:v.ON_NOOP;function by({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(_M({prevValue:e,value:t,maxVal:r})){case v.ON_LEAVE:{s&&s();break}case v.ON_ENTER_BACK:{n&&n();break}case v.ON_LEAVE_BACK:{i&&i();break}case v.ON_ENTER:{o&&o();break}}}var $M=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},LM=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},DM=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===v.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},FM=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===v.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},vy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=$M({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=LM({screen:n}),b=DM({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=FM({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...b}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var yy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===v.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var sc=class{#i=0;#o=0;#n=0;#c;#h;#l;#s;#u;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;#O;#w;#F;#$;#k;#D;#v;#E;#V;#_;#S;#X;#H;#N;#j;#L;constructor(){this.#c=void 0,this.#h=0,this.#l=()=>0,this.#s=()=>0,this.#u=v.DIRECTION_VERTICAL,this.#t=0,this.#e=void 0,this.#m=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#p=!1,this.#C=!1,this.#x=()=>{},this.#y=()=>{},this.#b=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#N="left",this.#L=!0,this.#j=!1,this.#P=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#M=["font-size","padding","margin","line-height","white-space"],this.#R=["text-align"],this.#I=["z-index","pointer-events"],this.#A=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#w=!1,this.#F=0,this.#$=0,this.#k=!1,this.#D=1.5,this.#v=!1,this.#E=!1,this.#V=0,this.#_=0,this.#S=!1,this.#X=0,this.#H=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#k=t.animatePin,this.#L=t.anticipatePinOnLoad,this.#v=t.forceTranspond,this.#c=t.invertSide,this.#u=t.direction,this.#l=t.getStart,this.#s=t.getEnd,this.#o=this.#l(),this.#h=this.#s(),this.#$=window.scrollY,this.#i=t?.scrollerHeight,this.#he(),this.#N=this.#u===v.DIRECTION_VERTICAL?"top":"left",this.#w=!0,this.#T=!0,this.#se(),this.#ie(),this.#Z(),this.#U(),this.#y=u.useScrollStart(()=>{this.#w&&this.#f!==globalThis&&this.#p&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#w&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#u===v.DIRECTION_VERTICAL&&this.#he();let o=r-this.#$;if(this.#$=r,this.#p&&this.#r&&this.#m){let{verticalGap:n}=this.#m.get(),s=n-o;this.#m.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#m=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#b=this.#m.subscribe(({collision:t,verticalGap:r})=>{this.#u===v.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${t}px)`:this.#r&&(this.#r.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#r&&this.#m&&this.#m.set({collision:0,verticalGap:0}).catch(()=>{})}#se(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#q(),s=this.#z(),i=yy({marker:this.#d,invertSide:this.#c,direction:this.#u}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#ee()}#Z(){if(!this.#r||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${t}px`,this.#r.style.width=`${r}px`}#ie(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#P.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#W(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#q(){return this.#r?this.#R.map(r=>this.#W(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#ee(){if(this.#v){this.#j=!0;return}this.#j=this.#A.map(t=>{let r=this.#W(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ae(){this.#o=this.#l(),this.#h=this.#s()}#he(){this.#ae(),this.#f!==globalThis&&(this.#o-=this.#u===v.DIRECTION_VERTICAL?xt(this.#f).top:xt(this.#f).left),this.#n=this.#c?this.#o:this.#i-this.#o,this.#t=this.#c?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#w&&(this.#m?.stop?.(),this.#b(),this.#x(),this.#y(),this.#m?.destroy?.(),this.#m=null,this.#V=0,this.#E=!1,this.#C=!1,this.#p=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#w=!1))}#ce(){return this.#a?this.#u===v.DIRECTION_VERTICAL?xt(this.#a).top-this.#n:xt(this.#a).left-this.#n:0}#oe(){let t=this.#ce();this.#be(t)}#de(){let t=this.#c?this.#ce()-this.#h:this.#ce()+this.#h;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#r||!this.#N)return;let r=this.#r?.style??{};r[this.#N]=`${this.#n}px`}),this.#k&&!this.#T&&this.#r&&this.#m&&this.#m.goFrom({collision:t}).then(()=>{this.#ve()}).catch(()=>{})}#ve(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#Q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#K(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#u===v.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#t}px`):(this.#r.style.top="",this.#r.style.left=`${this.#t}px`))})}#Y(){if(!this.#r)return;let t=this.#u===v.DIRECTION_VERTICAL?xt(this.#r).left:xt(this.#r).top,r=this.#u===v.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${t}px`,this.#E=!0,this.#S=!0)})}#z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#I.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#M.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#le(){return this.#M.reduce((t,r)=>({...t,[r]:""}),{})}#B(){if(this.#j){let t=this.#q(),r=this.#z(),o=this.#te();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#fe(){!this.#j||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#le()),this.#a?.append(this.#r))})}#ge(t){let r=this.#S&&this.#X<3?this.#_:Je(Math.abs(t-this.#F),0,250);return this.#S&&this.#X<this.#H?this.#X++:(this.#X=0,this.#S=!1),this.#_=r,r*this.#D}#J(t,r){if(this.#k&&!this.#T||this.#T&&!this.#L)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#ge(t),n=r===v.SCROLL_UP?0:o,s=r===v.SCROLL_UP?0:o*2,i=r===v.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#k&&!this.#T||this.#T&&!this.#L)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#ge(t),n=r===v.SCROLL_UP?o:0,s=r===v.SCROLL_UP?o*2:0,i=r===v.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#w||!this.#a)return;if(this.#E&&this.#V<this.#H){this.#V++;return}else this.#V=0,this.#E=!1;let r=this.#F>t?v.SCROLL_UP:v.SCROLL_DOWN,o=this.#u===v.DIRECTION_VERTICAL?xt(this.#a).top:xt(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#c?this.#ye(t,r):this.#J(t,r),a=this.#c?o<this.#o-n:o>this.#i-this.#o+n,c=this.#c?o>=this.#o-s&&o<=this.#o+i+this.#h:o<=this.#i-this.#o+s&&this.#i-o<=this.#h+i+this.#o;if(a)this.#C||(this.#Q(),this.#fe(),this.#C=!0,this.#p=!1,this.#g=!1);else if(c){if(!this.#p){this.#Y();let l=r===v.SCROLL_DOWN&&!this.#c||r===v.SCROLL_UP&&this.#c;this.#B(),l?this.#oe():this.#de(),this.#C=!1,this.#p=!0,this.#g=!1}}else this.#g||(this.#K(),this.#fe(),this.#C=!1,this.#p=!1,this.#g=!0);this.#F=t,this.#T=!1}};var Ty=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},Sy=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},xy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Wu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),Cy=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},Ey=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,wy=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),Iy=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=Ev(r);if(r&&!o)return Ty(),Wu();if(r&&o===v.VH&&t===v.DIRECTION_HORIZONTAL)return Sy(),Wu();if(r&&o===v.VW&&t===v.DIRECTION_VERTICAL)return xy(),Wu();let n=[v.PLUS_HEIGHT,v.PLUS_HEIGHT_HALF,v.PLUS_WIDTH,v.PLUS_WIDTH_HALF,v.MINUS_HEIGHT,v.MINUS_HEIGHT_HALF,v.MINUS_WIDTH,v.MINUS_WIDTH_HALF],s=e.find(c=>Cu(n,c)),i=[v.POSITION_BOTTOM,v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT],a=e.find(c=>Cu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??v.POSITION_BOTTOM}},My=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=Iy(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===v.PX?{value:p,additionalVal:a,position:_a(c)}:{value:e*p,additionalVal:a,position:_a(c)}},Ry=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=Iy(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,b=_a(h),y=b===v.POSITION_TOP||b===v.POSITION_LEFT;return l===v.PX?{value:Cy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:b}:{value:Ey(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:b}},ju=(e,t,r,o)=>{let n=String(t);return De(n,v.PLUS_HEIGHT_HALF)?e+r/2:De(n,v.PLUS_HEIGHT)?e+r:De(n,v.PLUS_WIDTH_HALF)?e+o/2:De(n,v.PLUS_WIDTH)?e+o:De(n,v.MINUS_HEIGHT_HALF)?e-r/2:De(n,v.MINUS_HEIGHT)?e-r:De(n,v.MINUS_WIDTH_HALF)?e-o/2:De(n,v.MINUS_WIDTH)?e-o:e},Ny=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case v.IN_STOP:return!t&&r>0||t&&r<0?0:r;case v.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case v.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case v.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Py=(e,t)=>e===v.PROP_OPACITY?1-t:-t,zu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var po=class{#i=!1;#o=!1;#n=0;#c=0;#h=0;#l=0;#s=0;#u=0;#t=0;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;#O;#w;#F;#$;#k;#D;#v;#E;#V;#_;#S;#X;#H;#N;#j;#L;#U;#G;#se;#Z;#ie;#W;#q;#ee;#ae;#he;#ce;#oe;#de;#be;#ve;#Q;#K;#Y;#z;#te;#le;#B;#fe;#ge;#J;#ye;#ue;#pe;#ne;#Ce;#Te;#me;#Ee;#Se;#xe;#Re;#re;constructor(t){this.#e=window.innerWidth,this.#m=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#p=()=>{},this.#C=()=>{},this.#x=void 0,this.#y=void 0,this.#b=void 0,this.#T=0,this.#P=!1,this.#M=void 0,this.#R=!0,this.#I=!1,this.#A=!1,this.#O=!1,this.#w=void 0,this.#F="",this.#$=0,this.#k=0,this.#D=()=>{},this.#v=()=>{},this.#N=!1,this.#E=de(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#V=de(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#_=de(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=de(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#X=Va(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Va(t?.end,"Scrolltrigger end propierties error:","top"),this.#j=Va(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#L=t?.dynamicStart?Pu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Pu(t.dynamicEnd,"dynamicEnd"):null,this.#G=zv(t?.dynamicRange),this.#se=de(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#Z=io(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#ie=io(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#W=io(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#q=io(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#ee=io(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ae=Uv(t?.align),this.#he=Gv(t?.onSwitch),this.#ce=de(t?.reverse,"Parallax reverse propierties error:",!1),this.#oe=ku(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#de=ku(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=de(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ve=t?.useWillChange,this.#Q=Hv(t?.tween);let r=this.#Q?.getType&&this.#Q.getType()===v.TWEEN_TIMELINE,o=this.#Q?.getType&&this.#Q.getType()===v.TWEEN_TWEEN;this.#K=$n(t?.item,!1),this.#Y=$n(t?.scroller,!0),this.#z=$n(t?.screen,!0),this.#te=Nu(t?.trigger),this.#le=Nu(t?.applyTo),this.#B=Ws(t?.direction,"Parallax/Scrolltrigger"),this.#fe=de(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#ge=de(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#J=qv(t?.type),this.#ye=kt(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#ue=Do(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#pe=Fo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Yv(t?.propierties,this.#J,o,r);this.#ne=n,this.#Ce=s,this.#Te=s?"100px":Jv(t?.range,this.#J),this.#me=de(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===v.EASE_SPRING&&uv(),this.#Ee=r?v.EASE_LERP:Xv(t?.easeType),this.#Se=Kv(t?.springConfig,this.#J),this.#xe=Qv(t?.lerpConfig,this.#J),this.#Re=this.#Ee===v.EASE_SPRING?{configProps:{precision:v.EASE_PRECISION}}:{precision:v.EASE_PRECISION},this.#re=this.#Ee===v.EASE_SPRING?new Tt:new Nr}init(){if(this.#i){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#i=!0,this.#We(),this.#_e(),this.#Oe(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#ne===v.PROP_TWEEN&&(this.#Te=this.#Q?.getDuration?this.#Q.getDuration():0,this.#G=()=>this.#Te,this.#Q?.inzializeStagger?.()),this.#J==v.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Ae(),this.#Ne()),this.#me&&(this.#g=u.useScrollStart(()=>{this.#fe||(this.#O=!0)}),this.#p=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#Me()})})}),this.#Y===globalThis&&(this.#r=zu({pin:this.#E,ease:this.#me,useThrottle:this.#ge,callback:()=>{this.#Me()}})),this.#Me()),this.#me||(this.#Y===globalThis&&(this.#r=zu({pin:this.#E,ease:this.#me,useThrottle:this.#ge,callback:()=>{this.#Ie(),this.#we()}})),this.#Ie(),this.#we(),this.#p=u.useScrollEnd(()=>{this.#we({forceRender:!0})})),this.#Y!==globalThis&&this.#j&&(this.#C=u.useScroll(()=>{this.#Ne()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#E&&(this.#w=new sc,ve[this.#pe](this.#ue)&&u.useNextTick(()=>{this.#De(),this.#w?.init(this.#ke()),this.#w?.onScroll(this.#u)}))}#ke(){return{item:this.#K,marker:this.#j,screen:this.#z,animatePin:this.#V,anticipatePinOnLoad:this.#S,forceTranspond:this.#_,invertSide:this.#N,direction:this.#B,scrollerHeight:this.#t,getStart:()=>this.#$,getEnd:()=>this.#k}}setScroller(t){this.#Y=$n(t,!0)}setScreen(t){this.#z=$n(t,!0)}setDirection(t){this.#B=Ws(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#ue=Do(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#pe=Fo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#K&&this.#K.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#K.parentNode;Object.assign(r.style,t)}}#We(){let t=v.PROP_SCALE||v.PROP_SCALE_X||v.PROP_SCALE_Y||v.PROP_OPACITY?1:0;switch(this.#re.setData({val:t}),this.#D=this.#re.subscribe(({val:r})=>{r!==this.#b&&(this.#ne===v.PROP_TWEEN&&this.#Q?.draw?(this.#Q.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#b=r,this.#R=!1):this.#Pe(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!0})}))}),this.#v=this.#re.onComplete(({val:r})=>{this.#O=!1,this.#ne===v.PROP_TWEEN&&this.#Q?.draw?this.#Q.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#Pe(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!1})})}),this.#Ee){case v.EASE_LERP:{this.#xe&&"updateVelocity"in this.#re&&this.#re?.updateVelocity?.(this.#xe);break}case v.EASE_SPRING:{this.#Se&&"updateConfig"in this.#re&&this.#re?.updateConfig?.(this.#Se);break}}}#Ae(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#F=v.PX}else{let t=String(this.#Te),r=Zv(t,this.#ne),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#F=wv(r)}}#Ne(){let t=this.#t/100;if(this.#L&&this.#L?.position&&this.#L?.value?.()!==void 0){let{position:l,value:p}=this.#L,h=p();Number.isNaN(h)||(this.#X=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=My(t,this.#X,this.#B);if(this.#N=n===v.POSITION_TOP||n===v.POSITION_LEFT,this.#$=ju(r,o,this.#B===v.DIRECTION_VERTICAL?this.#l:this.#s,this.#B===v.DIRECTION_VERTICAL?this.#s:this.#l),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#H=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=Ry(t,this.#H,this.#$,this.#t,this.#N,this.#B),c=this.#N?a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?-1:1:a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?1:-1;this.#k=ju(s,i,this.#B===v.DIRECTION_VERTICAL?this.#l*c:this.#s*c,this.#B===v.DIRECTION_VERTICAL?this.#s*c:this.#l*c),this.#je(),this.#N&&(this.#$-=this.#l)}#je(){if(this.#j){let{startMarker:t,endMarker:r}=vy({startMarker:this.#x,endMarker:this.#y,startPoint:this.#$,endPoint:this.#k,screen:this.#z,direction:this.#B,invertSide:this.#N,label:this.#j});this.#x=t,this.#y=r}}#Oe(){let t=this.#te??this.#K;if(!t)return;let r=0,o=0,n=0;this.#te&&(r=xo(this.#te)?.x??0,o=xo(this.#te)?.y??0,n=xo(this.#te)?.z??0),t.style.transform="",this.#B===v.DIRECTION_VERTICAL?this.#n=this.#Y===globalThis?Math.trunc(be(t).top):Math.trunc(be(t).top)-be(this.#Y).top:this.#n=this.#Y===globalThis?Math.trunc(be(t).left):Math.trunc(be(t).left)-be(this.#Y).left,this.#z&&this.#z!==globalThis&&(this.#n-=this.#B===v.DIRECTION_VERTICAL?Math.trunc(be(this.#z).top):Math.trunc(xt(this.#z).left)),this.#te&&(r!==0||o!==0||n!==0)&&(this.#te.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#_e(){this.#z===globalThis||!this.#z||(this.#c=this.#B===v.DIRECTION_VERTICAL?Math.trunc(be(this.#z).top):Math.trunc(xt(this.#z).left))}#$e(){let t=this.#te??this.#K;t&&(this.#l=this.#B===v.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#te??this.#K;t&&(this.#s=this.#B===v.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#Y&&(this.#Y===globalThis?this.#u=this.#B===v.DIRECTION_VERTICAL?this.#Y.scrollY:this.#Y.scrollX:this.#u=this.#B===v.DIRECTION_VERTICAL?-be(this.#Y).top:-be(this.#Y).left)}#Fe(){this.#z&&(this.#e=window.innerWidth,this.#m=window.innerHeight,this.#z===globalThis?this.#t=this.#B===v.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#t=this.#B===v.DIRECTION_VERTICAL?Math.trunc(this.#z.offsetHeight):Math.trunc(this.#z.offsetWidth))}refresh(){this.#E&&this.#w&&this.#w.destroy(),this.#_e(),this.#Oe(),this.#$e(),this.#Le(),this.#Fe(),this.#J==v.TYPE_SCROLLTRIGGER&&(this.#Ne(),this.#G&&this.#Ae(),this.#E&&this.#w&&ve[this.#pe](this.#ue)&&this.#w?.init(this.#ke())),this.#b=void 0,this.#R=!0,ve[this.#pe](this.#ue)?this.#me?this.#Me():(this.#Ie(),this.#we({forceRender:!0})):(this.#me&&this.#re?.stop?.(),u.useFrameIndex(()=>{this.#le?(this.#Be(this.#le),Object.assign(this.#le.style,this.#Ve())):(this.#Be(this.#K),this.#K&&Object.assign(this.#K.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ve[this.#pe](this.#ue)||!t)return;this.#A=!0;let o=this.#ze(t);if(this.#me)this.#Me(o);else{this.#Ie(o);let n=this.#I||this.#R||void 0;this.#we({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#me&&(this.#fe||(this.#O=!0))}triggerScrollEnd(){this.#me||this.#we({forceRender:!0})}#ze(t){if(t!==void 0)return this.#z!==globalThis?t+this.#c:t}stopMotion(){this.#re?.stop?.()}#Ie(t){if(!ve[this.#pe](this.#ue)||(t?this.#u=-t:this.#De(),this.#I=wy({offset:this.#n,height:this.#l,gap:this.#a,wScrollTop:this.#u,wHeight:this.#t}),!this.#I&&!this.#be&&this.#J===v.TYPE_PARALLAX))return;this.#E&&this.#w&&this.#w.onScroll(this.#u),this.#J===v.TYPE_SCROLLTRIGGER?this.#h=Se(this.#He()):this.#ne===v.PROP_OPACITY?this.#h=Se(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ae))?Se(this.#qe()/2):Se(this.#Je()/2);let r=this.#ce&&this.#J!==v.TYPE_SCROLLTRIGGER?Py(this.#ne,this.#h):this.#h;this.#h=this.#J===v.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#Me(t){if(!ve[this.#pe](this.#ue)||(this.#Ie(t),!this.#P&&!this.#R&&this.#J===v.TYPE_SCROLLTRIGGER)||!this.#I&&!this.#R&&this.#J===v.TYPE_PARALLAX)return;let r=this.#R&&!this.#se?"set":"goTo";this.#re&&this.#re[r]({val:this.#h},this.#Re).catch(()=>{})}#we({forceRender:t=!1,parentIsMoving:r=!1}={}){ve[this.#pe](this.#ue)&&u.useFrame(()=>{this.#h===this.#b&&!t||!this.#I&&!t||(!this.#fe&&!this.#A&&(this.#O=!t),!this.#fe&&this.#A&&(this.#O=r&&this.#I),this.#ne===v.PROP_TWEEN?(this.#Q.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#b=this.#h,this.#R=!1):this.#Pe(this.#h),u.useNextTick(()=>{this.#ee&&this.#ee({value:this.#h,parentIsMoving:this.#O})}))})}#He(){let t=this.#N?-(this.#u+this.#$+this.#k-(this.#n+this.#k)):-(this.#u+this.#t-this.#$-(this.#n+this.#k)),r=this.#k/100*this.#d,o=t/100*this.#d,n=this.#ce?this.#N?r-o:o:this.#N?o:r-o,s=r>0?-Je(n,0,r):-Je(n,r,0);if(this.#P=this.#M!==s,this.#M=s,!this.#P&&!this.#R)return this.#h;let i=s*100/this.#k;switch((this.#Z||this.#ie||this.#W||this.#q)&&by({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#Z,onEnterBack:this.#ie,onLeave:this.#W,onLeaveBack:this.#q}),this.#T=n,this.#ne){case v.PROP_HORIZONTAL:case v.PROP_VERTICAL:return this.#Ue(i);case v.PROP_SCALE:case v.PROP_SCALE_X:case v.PROP_SCALE_Y:case v.PROP_OPACITY:return 1-i;default:return-i}}#Ue(t){switch(this.#F){case v.VW:return this.#e/100*-t;case v.VH:return this.#m/100*-t;case v.WPERCENT:return this.#B===v.DIRECTION_VERTICAL?this.#s/100*-t:this.#l/100*-t;case v.HPERCENT:return this.#B===v.DIRECTION_VERTICAL?this.#l/100*-t:this.#s/100*-t;default:return-t}}#Ge(){let t=this.#t/100*this.#de,r=this.#t-this.#t/100*this.#oe,o=this.#ae==v.ALIGN_START?-this.#u*-1:(this.#u+t-this.#n)*-1,n=this.#ae==v.ALIGN_START?1-o/this.#n:1-o/(this.#t-r-t);return Je(n,0,1)}#qe(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#B===v.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ae){case v.ALIGN_START:return(this.#u+this.#c)/r;case v.ALIGN_TOP:case v.ALIGN_LEFT:return(this.#u-this.#n)/r;case v.ALIGN_CENTER:return(this.#u+(this.#t/2-this.#l/2)-this.#n)/r;case v.ALIGN_BOTTOM:case v.ALIGN_RIGHT:return(this.#u+(this.#t-this.#l)-this.#n)/r;case v.ALIGN_END:return-(o-(this.#u+this.#t))/r;default:return 0}}#Je(){let t=Number(this.#ae),r=Number(this.#Te);return(this.#u+this.#t/100*t-this.#n)/r}#Ye(t){return Ny({switchPropierties:this.#he,isReverse:this.#ce,value:t})}#Pe(t){this.#b=t,this.#R=!1;let r=this.#le||this.#K;if(!r||this.#Ce)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#o=this.#ve?u.mustMakeSomething():!1;let n=this.#o&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#ne){case v.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case v.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case v.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case v.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case v.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case v.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case v.PROP_OPACITY:{r.style.opacity=`${t}`;break}case v.PROP_SCALE:{let i=this.#J===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case v.PROP_SCALE_X:{let i=this.#J===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case v.PROP_SCALE_Y:{let i=this.#J===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#ne.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#Q&&t&&(t.style="")}#Ve(){if(!this.#Ce)switch(this.#ne){case v.PROP_VERTICAL:case v.PROP_HORIZONTAL:case v.PROP_ROTATE:case v.PROP_ROTATEY:case v.PROP_ROTATEX:case v.PROP_ROTATEZ:case v.PROP_SCALE:return{transform:""};case v.PROP_OPACITY:return{opacity:""};default:return{[this.#ne.toLowerCase()]:""}}}destroy(){this.#re?.stop?.(),this.#r(),this.#g(),this.#p(),this.#f(),this.#D(),this.#v(),this.#C(),this.#re?.destroy?.(),this.#re=null,this.#G=()=>{},this.#L?.value&&(this.#L.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#Z=()=>{},this.#ie=()=>{},this.#W=()=>{},this.#q=()=>{},this.#ee=()=>{},this.#E&&this.#w&&this.#w?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#y&&this.#y?.remove?.(),this.#x=void 0,this.#y=void 0,this.#w=void 0,this.#h=0;let t=this.#le??this.#K;t&&"style"in t&&(t.style=""),this.#K=null,this.#Y=null,this.#z=null,this.#te=null,this.#le=null}};function BM(e){return new po({...e,type:v.TYPE_PARALLAX})}function VM(e){return new po({...e,type:v.TYPE_SCROLLTRIGGER})}var Hu=window.innerHeight,Uu=document.body.offsetHeight,mo=!1,Gu=!0,zt=window.scrollY,ti=!0,Ht=!1,qu=()=>{},Ju=()=>{},ac=()=>{},ic,ky=()=>{document.body.classList.remove("is-whelling")},WM=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var jM=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});ic=t;let o=r.subscribe(({scrollValue:h})=>{Ht||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(h=>{if(Ht)return;h.preventDefault(),ti=!1,WM();let f=h.spinY??0,d=ue.clamp(f*e+zt,0,Uu-Hu);zt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Gu&&h()}),i=u.useMouseWheel(u.debounce(()=>{ky()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!ti)return;let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{Ht||(ky(),r.stop(),zt=window.scrollY,ti=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,Hu=window.innerHeight,Uu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{mo=!1,zt=0,ti=!0,Ht=!1,ic&&(p.unobserve(ic),p.disconnect()),r?.stop(),r?.destroy(),r=null,ic=null,o(),c(),a(),n(),l(),i(),s(),qu=()=>{},Ju=()=>{},ac=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},cc=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{mo||(zt=window.scrollY,mo=!0,Ht=!1,Hu=window.innerHeight,Uu=document.body.offsetHeight,Gu=!0,ti=!1,{destroy:qu,stop:Ju,update:ac}=jM({velocity:e,rootElement:t}))},ir=()=>{!mo||Ht||(Ju(),Ht=!0)},Ut=()=>{!mo||!Ht||(Ht=!1)},ri=()=>{!mo||!Ht||(ac(),zt=window.scrollY,Ht=!1)},Yu=()=>{mo&&ac()},Xu=()=>{qu()},Ay=()=>{Gu=!0};var Oy=()=>mo;var _y="easeOutQuad",oi=new Pr({ease:_y,data:{val:0}}),lc=!1,Ku=!1;oi.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Yu()});var Qu=()=>{Ku&&(document.body.style.overflow=""),oi?.updateEase?.(_y),ri()},Zu=()=>{lc&&(oi.stop(),Qu())};u.useMouseWheel(()=>{Zu()});u.useMouseDown(()=>{Zu()});u.useTouchStart(()=>{Zu()});var kr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?cl(t)||u.checkType(Number,t)?cl(t)?be(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=kt(r?.duration,"bodyScroll: duration",500);return Ku=de(r?.overflow,"bodyScroll: overflow",!1),Ba(r?.ease)&&oi?.updateEase?.(r?.ease),Ku&&(document.body.style.overflow="hidden"),new Promise(s=>{lc=!0,ir(),oi.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Qu(),lc=!1,s(!0)}).catch(()=>{Qu(),lc=!1,s(!0)})})}};var ni={END:"END",START:"START",CENTER:"CENTER"};var zM=e=>{switch(e){case ni.END:return"align-items:flex-end;";case ni.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},$y=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",b=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=zM(h),x=p?`width:${p}vw;`:"",S=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${b};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${x}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,I=document.createElement("div");I.classList.add("scroller-style");let C=document.createElement("style");C.append(document.createTextNode(S)),I.append(C),e.prepend(I)};var si=class{#i=!0;#o=0;#n=!1;#c=0;#h=100;#l=100;#s=!1;#u=0;#t;#e;#m;#a;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R;#I;#A;#O;#w;#F;#$;#k;#D;#v;#E;#V;#_;#S;#X;#H;#N;#j;#L;#U;#G;#se;#Z;#ie;#W;#q;#ee;#ae;#he;#ce;#oe;#de;constructor(t){this.#t=()=>{},this.#de=0,this.#V=t?.container??"",this.#j=[],this.#L=!1,this.#U=0,this.#G={},this.#se=0,this.#Z=t?.children||[],this.#e=de(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#m=kt(t?.threshold,"HorizontalScroller: threshold",30),this.#a=de(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Do(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Fo(t?.queryType,"queryType","horizontalScroller"),this.#r=de(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(t?.addCss,"HorizontalScroller: addCss",!0),this.#p=de(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=de(t?.ease,"HorizontalScroller: ease",!1),this.#x=za(t?.easeType??"","HorizontalScroller"),this.#y=de(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#b=de(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(t?.reverse,"HorizontalScroller: reverse",!1),this.#P=de(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#M=kt(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#R=kt(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#I=t?.columnAlign?t.columnAlign.toUpperCase():ni.START,this.#A=mt(t?.onEnter,"HorizontalScroller: onEnter",X),this.#O=mt(t?.onEnterBack,"HorizontalScroller: onEnterBack",X),this.#w=mt(t?.onLeave,"HorizontalScroller: onLeave",X),this.#F=mt(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",X),this.#$=mt(t?.afterInit,"HorizontalScroller: afterInit",X),this.#k=mt(t?.afterRefresh,"HorizontalScroller: afterRefresh",X),this.#D=mt(t?.afterDestroy,"HorizontalScroller: afterDestroy",X),this.#v=mt(t?.onTick,"HorizontalScroller: onTick",void 0),this.#E=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#E||(this.#i=!1,console.warn("horizontal custom: root node not found")),this.#E.querySelector(this.#V)||(this.#i=!1,console.warn("horizontal custom: container node not found")),this.#_=this.#E.querySelector(t.trigger),this.#_||(this.#i=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#E.querySelector(t.row),this.#S||(this.#i=!1,console.warn("horizontal custom: row node not found")),this.#X=this.#E.querySelectorAll(t.column),this.#X.length===0&&(this.#i=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#E.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#N=o.replace(".",""),this.#j=this.#S.querySelectorAll("a, button"),this.#Z.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&$y({mainContainer:this.#E,queryType:this.#f,breakpoint:this.#d,container:this.#V,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#N,useSticky:this.#y,columnHeight:this.#M,columnWidth:this.#R,columnAlign:this.#I}),this.#ie=n=>{if(!this.#n)return;let{movementX:s}=n,i=this.#T?s:-s;this.#Q(i)},this.#W=()=>{ve[this.#f](this.#d)&&(ir(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#n=!0,this.#de=this.#u)},this.#q=()=>{Ut(),this.#n=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ee=()=>{Ut(),this.#n=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ae=n=>{ve[this.#f](this.#d)&&(ir(),this.#c=-n.touches[0].clientX,this.#n=!0,this.#de=this.#u)},this.#he=()=>{Ut(),this.#n=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#c:s-this.#c;this.#Q(i),this.#c=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#oe=n=>{Math.abs(this.#u-this.#de)>this.#m&&n.preventDefault()}}init(){this.#i&&oc(this.#le.bind(this),this.#te.bind(this),this.#B.bind(this),this.#ge.bind(this))().then(()=>{this.#J(),this.#e&&this.#Y(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#$?.(),this.#Z.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#j].forEach(t=>t.setAttribute("draggable","false"))}#ve(){[...this.#j].forEach(t=>t.removeAttribute("draggable"))}#Q(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#K(){let t=window.scrollY;this.#s=this.#o-this.#l<t&&this.#o+this.#h+this.#U>t+window.innerHeight}#Y(){this.#t=u.useScroll(()=>this.#K()),this.#K(),this.#S.addEventListener("click",this.#oe,{passive:!1}),this.#S.addEventListener("mousedown",this.#W,{passive:!0}),this.#S.addEventListener("mouseup",this.#q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#ee,{passive:!0}),this.#S.addEventListener("touchstart",this.#ae,{passive:!0}),this.#S.addEventListener("touchend",this.#he,{passive:!0}),this.#S.addEventListener("mousemove",this.#ie,{passive:!0}),this.#S.addEventListener("touchmove",this.#ce,{passive:!0})}#z(){this.#t(),this.#S.removeEventListener("click",this.#oe),this.#S.removeEventListener("mousedown",this.#W),this.#S.removeEventListener("mouseup",this.#q),this.#S.removeEventListener("mouseleave",this.#ee),this.#S.removeEventListener("touchstart",this.#ae),this.#S.removeEventListener("touchend",this.#he),this.#S.removeEventListener("mousemove",this.#ie),this.#S.removeEventListener("touchmove",this.#ce)}#te(){return!this.#_||!this.#E||!this.#S?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#se=100*(r-window.innerWidth)/r,r>0&&(this.#_.style.height=`${r}px`,this.#E.style.height=`${r}px`,this.#S.style.width=`${r}px`),t(!0)})})}#le(){return new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){t(!0);return}this.#U=[...this.#X].map(r=>je(r)).reduce((r,o)=>r+o,0),t(!0)})})}#B(){return this.#_?new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#N} ${this.#N}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#N}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#N}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#N}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#N}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#_.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#fe(){this.#_&&(this.#_.innerHTML="")}#ge(){return new Promise(t=>{if(!ve[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#se/100,n=r.dataset.shadow,s=je(r),i=le(this.#S),a=xo(this.#S)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#E.querySelector(`.${this.#N}[data-shadow="${n}"]`),b=d?.querySelector(`.${this.#N}--in-center`),y=d?.querySelector(`.${this.#N}--out-center`),T=d?.querySelector(`.${this.#N}--left`),x=d?.querySelector(`.${this.#N}--end`),S=window.innerWidth>window.innerHeight?window.innerHeight:0,I=window.innerWidth>window.innerHeight?window.innerHeight/2:0,C=c===0?0:h+f/o-p/o,w=(()=>{let O=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:O})(),M=(()=>{let O=s/l,$=(s-s/l)/o;return O+$+w})(),A=M/2+I;this.#y&&(this.#_.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${C}px`),b&&(b.style.height=`${A}px`),y&&(y.style.height=`${A}px`),y&&(y.style.top=`${A}px`),T&&(T.style.height=`${w}px`),x&&(x.style.height=`${M+S}px`),d&&(d.style.height=`${w}px`)}),t(!0))})})}#J(){if(!this.#_||!ve[this.#f](this.#d))return;let t=new po({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#_,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#b,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#P,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#p,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#u=n,this.#v&&this.#v({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#Z.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#A,onEnterBack:this.#O,onLeave:this.#w,onLeaveBack:this.#F});t.init(),this.#L=!0,this.#G=t,this.#o=be(this.#_).top,this.#be()}#ye(){oc(this.#le.bind(this),this.#te.bind(this),this.#B.bind(this),this.#ge.bind(this))().then(()=>{this.#J(),this.#ue()})}#ue(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#k?.(),this.#Z.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#L||!ve[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{oc(this.#le.bind(this),this.#te.bind(this),this.#ge.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#o=be(this.#_).top,this.#L&&(this.#G?.refresh?.(),this.#ue()),t(!0)})})}#pe({destroyAll:t=!1}){(this.#L||t)&&(this.#G?.destroy?.(),this.#G=null,this.#_&&(this.#_.style.height=""),this.#E&&(this.#E.style.height=""),this.#_&&(this.#_.style.marginTop=""),this.#fe(),this.#ve(),this.#L=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),t&&this.#E){this.#e&&this.#z();let r=this.#E.querySelector(".scroller-style");r&&r.remove(),this.#E=null,this.#_=null,this.#S=null,this.#X=[],this.#H=[],this.#$=X,this.#k=X,this.#v=X,this.#A=X,this.#O=X,this.#w=X,this.#F=X,this.#G=null,this.#L=!1,this.#j=[],this.#E=null,this.#V=null,this.#_=null,this.#S=null,u.useNextTick(()=>{this.#D?.(),this.#D=X,this.#Z.forEach(o=>{o?.destroy?.(),o=null}),this.#Z=[]})}},3))}onResize(t){this.#L&&ve[this.#f](this.#d)?t&&this.refresh():!this.#L&&ve[this.#f](this.#d)?this.#ye():this.#L&&!ve[this.#f](this.#d)&&this.#pe({destroyAll:!1})}destroy(){this.#pe({destroyAll:!0})}};var ii=new Map,uc=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},HM=e=>{let t=new Pr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Ar={subscribe:n=>{if(!uc(n))return()=>{};if(ii.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=HM(n);return ii.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),ii.delete(n)}},reset:n=>{uc(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!uc(n))return new Promise(c=>c(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!uc(n))return new Promise(l=>l(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var St=class e{static#i=4e3;#o=!0;#n=0;#c=0;#h=0;#l=0;#s=0;#u=30;#t=0;#e=!1;#m=0;#a=0;#d;#f;#r;#g;#p;#C;#x;#y;#b;#T;#P;#M;#R=()=>Ut();#I;#A;#O;#w;#F;#$;#k;#D;#v;#E;#V;#_;#S;#X;#H;#N;#j;#L;#U;#G;#se=0;#Z=0;#ie;#W;#q=!1;#ee=1;#ae=0;#he=0;#ce=0;#oe=null;#de=u.getTime();#be;#ve;constructor(t){this.#d=X,this.#f=X,this.#r=X,this.#g=X,this.#p=X,this.#C=X,this.#x=X,this.#y=X,this.#b=X,this.#T=X,this.#P=X,this.#M=X,this.#I={updateVelocity:X,subscribe:X,onComplete:X,goTo:()=>Promise.resolve(),set:()=>Promise.resolve(),stop:X,destroy:X},this.#A=X,this.#O=X,this.#w=Ws(t?.direction,"SmoothScroller"),this.#F=!1,this.#$=za(t?.easeType??"","SmoothScroller"),this.#k=Do(t?.breakpoint,"breakpoint","SmoothScroller"),this.#D=Fo(t?.queryType,"queryType","SmoothScroller"),this.#v=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#v||(console.warn("SmoothScroller: scroller node not found"),this.#o=!1),this.#E=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#E||(this.#o=!1,console.warn("SmoothScroller: screen node not found")),this.#V=de(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#_=kt(t?.speed,"SmoothScroller: speed",60),this.#S=de(t?.drag,"SmoothScroller: drag",!1),this.#X=mt(t?.onTick,"SmoothScroller: onTick",X),this.#H=mt(t?.onUpdate,"SmoothScroller: onUpdate",X),this.#ie=de(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#N=mt(t?.afterRefresh,"SmoothScroller: afterRefresh",X),this.#j=mt(t?.afterInit,"SmoothScroller: afterInit",X),this.#W=Dv(t?.snapPoints,"SmoothScroller: snapPoints",[]),this.#be=kt(t?.velocityThreshold,"SmoothScroller: velocityThreshold",3),this.#ve=kt(t?.velocityEasing,"SmoothScroller: velocityEasing",.4),this.#L=t?.children||[],this.#L.forEach(r=>{r.setScroller(this.#v),r.setDirection(this.#w),r.setScreen(this.#E),r.setBreakPoint(this.#k),r.setQueryType(this.#D),r.init()}),this.#U=r=>{this.#K();let{spinY:o}=u.normalizeWheel(r);this.#ge({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#fe({client:{x:o,y:n}})},this.#M=u.useMouseWheel(u.debounce(()=>{this.#Q()},500))}#Q(){this.#v&&this.#v.classList.remove("is-whelling")}#K(){this.#v&&this.#v.classList.add("is-whelling")}#Y(){return this.#t>0}init(){this.#o&&(this.#$===v.EASE_SPRING?this.#I=new Tt({data:{val:0},config:"scroller",configProps:{tension:15}}):(this.#I=new Nr({data:{val:0}}),this.#I.updateVelocity(.1)),this.#V&&(this.#v.addEventListener("wheel",this.#U,{passive:!0}),this.#v.addEventListener("mousemove",this.#G,{passive:!0}),this.#v.addEventListener("touchmove",this.#G,{passive:!0})),this.#V||(this.#y=u.useMouseWheel(t=>{this.#pe(t)}),this.#b=u.useMouseMove(t=>{this.#ue(t)}),this.#T=u.useTouchMove(t=>{this.#ue(t)})),this.#d=u.useResize(()=>this.refresh()),this.#f=u.useScrollStart(()=>this.#B()),this.#r=u.useScrollEnd(()=>this.#B()),this.#g=u.useTouchStart(t=>this.#J(t)),this.#p=u.useTouchEnd(t=>this.#ye(t)),this.#C=u.useMouseDown(t=>this.#J(t)),this.#x=u.useMouseUp(t=>this.#ye(t)),this.#v.addEventListener("mouseleave",this.#R),this.#S&&(this.#P=u.useMouseClick(({target:t,preventDefault:r})=>{this.#Re({target:t,preventDefault:r})})),this.#le(),ve[this.#D](this.#k)&&(this.#z(),this.#B()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#F||(this.#j?.({shouldScroll:this.#Y()}),this.#L.forEach(t=>{t.refresh()}))})},3))}#z(){if(!this.#v)return;this.#v.style["user-select"]="none",[...this.#v.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#te(){if(!this.#v)return;this.#v.style["user-select"]="",[...this.#v.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#le(){this.#I&&(this.#A=this.#I.subscribe(({val:t})=>{this.#v.style.transform=this.#w==v.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#L.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#X({value:-t,percent:this.#c,parentIsMoving:!0}),this.#L.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#O=this.#I.onComplete(({val:t})=>{this.#v.style.transform=this.#w==v.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#X({value:-t,percent:this.#c,parentIsMoving:!1}),this.#L.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#B(){this.#E&&(this.#h=this.#E===document.documentElement?window.innerWidth:je(this.#E),this.#l=this.#E===document.documentElement?window.innerHeight:le(this.#E),this.#t=this.#w===v.DIRECTION_VERTICAL?this.#v.offsetHeight-this.#l:this.#v.offsetWidth-this.#h,this.#Se(),this.#xe())}#fe({client:t}){!this.#e||!this.#S||(this.#m=this.#a,this.#a=this.#re({x:t?.x??0,y:t?.y??0}),this.#n+=Math.round(this.#m-this.#a),this.#n=Je(this.#n,0,this.#t),this.#Se(),this.#xe())}#ge({spinY:t=0}){if(!ve[this.#D](this.#k))return;this.#e=!1,this.#Ce();let r=Je(t,-1,1);if(this.#n+=r*this.#_,this.#n=Je(this.#n,0,this.#t),this.#Se(),this.#W.length>0?this.#Te():!1){this.#ne();return}this.#xe(),this.#W.length>0&&this.#ne()}#J({target:t,client:r}){ve[this.#D](this.#k)&&(t===this.#v||ss(this.#v,t))&&(this.#s=this.#n,this.#e=!0,this.#W.length>0&&this.#Ce(),this.#m=this.#re({x:r?.x??0,y:r?.y??0}),this.#a=this.#re({x:r?.x??0,y:r?.y??0}))}#ye(){this.#e=!1,this.#W.length>0&&(this.#me(),this.#ne())}#ue({target:t,client:r,preventDefault:o}){if((t===this.#v||ss(this.#v,t))&&this.#e&&this.#S){o(),this.#m=this.#a,this.#a=this.#re({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#m-this.#a);this.#n+=n,this.#n=Je(this.#n,0,this.#t),this.#Se(),this.#xe()}}#pe({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#D](this.#k)&&(this.#K(),t===this.#v||ss(this.#v,t))){this.#e=!1,n?.(),ir(),this.#Ce();let s=Math.abs(this.#se-o),i=Math.abs(this.#Z-r),a=this.#ie&&s>i?o:r;if(Math.abs(a)===0)return;if(this.#n+=Je(a,-1,1)*this.#_,this.#n=Je(this.#n,0,this.#t),this.#Se(),this.#W.length>0?this.#Te():!1){this.#ne();return}this.#xe(),this.#Z=r,this.#se=o,this.#W.length>0&&this.#ne()}}#ne(){this.#oe&&clearTimeout(this.#oe),this.#oe=setTimeout(()=>{this.#q=!1,this.#ee=1,this.#oe=null},Math.ceil(e.#i/u.getFps()))}#Ce(){this.#oe&&(clearTimeout(this.#oe),this.#oe=null)}#Te(){if(this.#W.length!==0)return this.#q&&(this.#q=!1),!this.#e&&this.#me()}#me(){if(this.#W.length===0||this.#ee<this.#be||this.#q)return;let t=this.#ce===1?this.#W.find(r=>this.#c<=r):this.#W.findLast(r=>this.#c>=r);if(!(!t&&t!==0))return this.#q=!0,this.#de=u.getTime(),this.move(t),!0}move(t){return ve[this.#D](this.#k)?(this.#c=t,this.#n=Je(this.#c*this.#t/100,0,this.#t),this.#I.goTo({val:this.#n})):new Promise(r=>r())}set(t){ve[this.#D](this.#k)&&(this.#c=t,this.#n=Je(this.#c*this.#t/100,0,this.#t),this.#I.set({val:this.#n}))}#Ee(){let t=u.getTime(),r=t-this.#he,o=this.#n-this.#ae;this.#ce=Math.sign(o);let n=Math.ceil(e.#i/u.getFps());if(r<=n&&o!==0){let i=Math.max(r,16.666666666666668),a=o/i,c=Math.round((Math.abs(a)+1)*1e4)/1e4;this.#ee=Math.max(1,this.#ve*c+(1-this.#ve)*this.#ee)}r>n&&(this.#ee=1),this.#he=t,this.#ae=this.#n}#Se(){if(this.#W.length>0&&this.#q)return;if(this.#W.length>0){let r=u.getTime();if(Math.abs(this.#de-r)<100)return}let t=this.#t>0?this.#n*100/this.#t:0;this.#c=Je(t,0,100),this.#W.length>0&&this.#Ee()}#xe(){this.#W.length>0&&this.#q||(this.#I.goTo({val:this.#n}).catch(()=>{}),this.#H?.({value:-this.#n,percent:this.#c,parentIsMoving:!0}))}#Re({target:t,preventDefault:r}){ve[this.#D](this.#k)&&(t===this.#v||ss(this.#v,t))&&Math.abs(this.#n-this.#s)>this.#u&&r()}#re({x:t,y:r}){return!t||!r?0:this.#w===v.DIRECTION_VERTICAL?r:t}refresh(){if(!ve[this.#D](this.#k)){this.#te(),this.#I?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#v.style.transform=""})});return}this.#B(),this.#z(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#N?.({shouldScroll:this.#Y()}),this.#L.forEach(t=>{t.refresh()})})},2)}destroy(){this.#F=!0,this.#te(),this.#d(),this.#f(),this.#r(),this.#g(),this.#p(),this.#C(),this.#x(),this.#y(),this.#b(),this.#T(),this.#P(),this.#A(),this.#O(),this.#M(),this.#I?.destroy(),this.#I=null,this.#L.forEach(t=>{t?.destroy?.()}),this.#L=[],this.#X=X,this.#H=X,this.#N=X,this.#j=X,this.#oe&&(clearTimeout(this.#oe),this.#oe=null),this.#v.removeEventListener("mouseleave",this.#R),this.#R=X,this.#V&&(this.#v?.removeEventListener("wheel",this.#U),this.#v?.removeEventListener("mousemove",this.#G),this.#v?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#v=null,this.#E=null})},3)}};var Ly=!1,UM=new Set(["scrollerN0","scrollerN1"]),Dy=()=>{let e=document.querySelector("#root");e&&(cc({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{ir(),Ay()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Ly=UM.has(t),u.useFrameIndex(()=>{if(Ly){Xu();return}!Oy()&&cc({rootElement:e}),ri()},30)}))};function Fy(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var oe=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},_t=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Gt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var By=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Vy,Wy={},GM="./asset/svg/icons/",qM=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],ar=()=>Vy,Gn=()=>Wy,jy=async()=>{let{success:e,data:t}=await _t({source:"./data/common.json"});e||console.warn("data fail to load"),Vy=t},zy=async()=>{let e=qM.map(({name:r,source:o})=>oe({source:`${GM}${o}`}).then(n=>({name:r,result:n})));Wy=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Hy=()=>g`
        <div class="error-page">
            <div>
                <h1 class="title title-big">Page not found</h1>
                <a class="link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Uy=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new St({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var JM=e=>e<10?`0${e}`:`${e}`,YM=e=>`link index-${e} ${e%2?"is-odd":"is-even"} `,Gy=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Uy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
        <div class="top">
            <div
                class="top-title"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                ${s.title}
            </div>
        </div>
        <div class="grid">
            <div class="grid-item" ${e("screenElement")}>
                <div
                    class="grid-bottom"
                    ${o({toggleClass:{active:()=>s.isMounted}})}
                ></div>
                <div
                    class="title"
                    ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
                >
                    <h1 class="title-big">${s.title}</h1>
                </div>
                <div
                    class="scrollable-element"
                    ${e("scrollerElement")}
                    ${o({toggleClass:{"use-drag-cursor":()=>s.showControls}})}
                >
                    <ul class="items">
                        ${s.items.map((c,l)=>g`
                                    <li class="item">
                                        <a
                                            class="${YM(l)}"
                                            href="${c.url}"
                                            ${o({toggleClass:{active:()=>s.isMounted}})}
                                        >
                                            <span class="counter index-${l}"
                                                >${JM(l)}</span
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
                class="scroll-label"
                ${o({toggleClass:{active:()=>s.showControls}})}
            >
                Scroll or drag
            </h6>
        </div>
    </div>`};var qy=m.createComponent({tag:"layout-links",component:Gy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([qy]);var pc=async({props:e})=>{let{source:t}=e,{data:r}=await _t({source:t});return g`
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    `};var Jy=()=>g`
        <div class="c-doc-container">
            <div class="left"></div>
            <div class="content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="right">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;var mc=m.createComponent({tag:"doc-container",component:Jy});var Yy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var hc=m.createComponent({tag:"doc-title",component:Yy,state:{}});var Xy=()=>g`
        <div class="l-doc-breadcrumbs">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var dc=m.createComponent({tag:"doc-title-small",component:Xy,state:{}});var bT=AE(gT(),1);var cp=bT.default;var vT="[A-Za-z$_][0-9A-Za-z$_]*",BR=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],VR=["true","false","null","undefined","NaN","Infinity"],yT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],TT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],ST=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],WR=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],jR=[].concat(ST,yT,TT);function xT(e){let t=e.regex,r=(B,{after:V})=>{let F="</"+B[0].slice(1);return B.input.indexOf(F,V)!==-1},o=vT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(B,V)=>{let F=B[0].length+B.index,z=B.input[F];if(z==="<"||z===","){V.ignoreMatch();return}z===">"&&(r(B,{after:F})||V.ignoreMatch());let te,ae=B.input.substring(F);if(te=ae.match(/^\s*=/)){V.ignoreMatch();return}if((te=ae.match(/^\s+extends\s+/))&&te.index===0){V.ignoreMatch();return}}},a={$pattern:vT,keyword:BR,literal:VR,built_in:jR,"variable.language":WR},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},b={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},S={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},I=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,b,y,T,{match:/\$\d+/},h];f.contains=I.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(I)});let C=[].concat(S,f.contains),w=C.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(C)}]),M={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...yT,...TT]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},k={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function _(B){return t.concat("(?!",B.join("|"),")")}let D={match:t.concat(/\b/,_([...ST,"super","import"].map(B=>`${B}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},N={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",R={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,b,y,T,S,{match:/\$\d+/},h,O,{scope:"attr",match:o+t.lookahead(":"),relevance:0},R,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[S,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},k,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},N,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},D,P,A,L,{match:/\$[(.]/}]}}cp.registerLanguage("javascript",xT);var CT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await oe({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,cp.highlightElement(e),e.style.height=""},zR=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),ET=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=zR(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await CT({ref:d,source:a.source}):CT({ref:d,source:a.source}),()=>{}}),g`<div
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
            class="expand ${h}"
            ${!p&&"disabled"}
            ${o({click:()=>{a.isExpanded=!a.isExpanded}})}
        >
            ${i`${()=>a.isExpanded?"close":"expand"}`}
        </button>
    </div>`};var wT=m.createComponent({tag:"mob-snippet",component:ET,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var li="debug_component",yc="debug_filter_list",Tc="debug_overlay",Sc="debug_tree",ui="quick_nav",pi="scroll_down_label",mi="scroll_to",IT="header",xc="mob_navigation",hi="mob_navigation_container",Cc="search_overlay",di="search_overlay_list",Ho="search_overlay_header",Ec="right-sidebar",wc="route-loader";var MT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(mi)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},RT=e=>{m.useMethodByName(mi)?.setActiveLabel?.(e)};function HR({label:e}){return e?.length>0}var UR=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),MT({id:e,label:t,element:r,isSection:o,isNote:n}),$p(r)&&!o&&RT(t)},NT=({getState:e,onMount:t})=>{let{style:r,id:o,label:n,isSection:s,isNote:i}=e();return t(({element:a})=>{HR({label:n})&&UR({id:o,label:n,element:a,isSection:s,isNote:i})}),g`<div id="${o}" class="spacer is-${r}">
        <span></span>
    </div>`};var PT=m.createComponent({tag:"mob-spacer",component:NT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var kT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;kr.to(s)}})}
        >
            ${r}
            <span class="arrows">
                <span class="arrow-start"></span>
                <span class="arrow-end"></span>
            </span>
        </button>
    </div>`};var AT=m.createComponent({tag:"anchor-button",component:kT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var GR=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="arrow-container">
                                  <span class="arrow-start"></span>
                                  <span class="arrow-end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),OT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul-${t} ${s} ${n?"use-links":"use-default"}">
        ${GR({items:o,links:n})}
    </ul>`};var _T=m.createComponent({tag:"mob-list",component:OT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var $T=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p-${t} ${o?"p-boxed":""} ${n?"p-note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var LT=m.createComponent({tag:"mob-paragraph",component:$T,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var qR=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",DT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"u-weight-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${qR(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var FT=m.createComponent({tag:"mob-title",component:DT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var JR=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),YR=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await _t({source:e});return r?o.data:[]},BT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await YR({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${JR({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var XR=async({proxi:e})=>{let{success:t,data:r}=await oe({source:e.url});t&&(e.source=r)},VT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{XR({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var WT=m.createComponent({tag:"doc-svg",component:VT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="loading"> loading image ... </span>`,type:String})}});var Ic=m.createComponent({tag:"html-content",component:BT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[_T,LT,FT,wT,PT,AT,WT]});var jT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var zT=m.createComponent({tag:"scroll-to-button",component:jT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var fi=!1;function KR({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;fi=!0,r.activeLabel=i,await kr.to(c),setTimeout(()=>{fi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var HT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},UT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:b,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:b,isNote:y}])}),s("setActiveLabel",h=>{fi||(c.activeLabel=h)}),e(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:be(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=be(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{fi||HT({proxi:c,direction:l,winHeight:p})},600)):()=>{},b=u.useScrollEnd(()=>{fi||HT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),b(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>KR({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var GT=m.createComponent({tag:"scroll-to",component:UT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[zT]});var Mc=({breadCrumbs:e})=>`<div class="c-breadcrumbs">${e.map((r,o)=>o===e.length-1?g`<a href="${r.url}" class="arrows">
                          <div class="arrow-start"></div>
                          <div class="arrow-end"></div>
                      </a>
                      <a class="link" href="${r.url}">${r.title}</a>`:g`<a class="link" href="${r.url}">${r.title}</a>`).join("")}</div>`;var Rc=e=>{m.useMethodByName(Ec)?.updateList(e??[])};m.useComponent([mc,dc,GT,hc,Ic]);var Be=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await _t({source:t});return Rc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${mi}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([mc,dc,hc,Ic]);var ie=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await _t({source:t});return Rc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var qT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:b})=>{b||d==="backward"||o(2)},1.5).add(({direction:d,isForced:b})=>{b||d==="backward"||o(3)},5.5).add(({direction:d,isForced:b})=>{b||d==="backward"||o(4)},9.5).add(({direction:d,isForced:b})=>{b||d==="forward"||o(1)},1.5).add(({direction:d,isForced:b})=>{b||d==="forward"||o(2)},5).add(({direction:d,isForced:b})=>{b||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:b,bx:y,by:T,cx:x,cy:S,dx:I,dy:C,ex:w,ey:M,fx:A,fy:O,gx:$,gy:k})=>{s.ax=d,s.ay=b,s.bx=y,s.by=T,s.cx=x,s.cy=S,s.dx=I,s.dy=C,s.ex=w,s.ey=M,s.fx=A,s.fy=O,s.gx=$,s.gy=k});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:b,bx:y,by:T,cx:x,cy:S,dx:I,dy:C,ex:w,ey:M,fx:A,fy:O,gx:$,gy:k})=>{i.ax=d,i.ay=b,i.bx=y,i.by=T,i.cx=x,i.cy=S,i.dx=I,i.dy=C,i.ex=w,i.ey=M,i.fx=A,i.fy=O,i.gx=$,i.gy=k});let l=Re.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Gt(-3,3),ay:()=>Gt(-3,3),bx:()=>Gt(-3,3),by:()=>Gt(-3,3),cx:()=>Gt(-3,3),cy:()=>Gt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Gt(-3,3),fy:()=>Gt(-3,3),gx:()=>Gt(-3,3),gy:()=>Gt(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},b={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},x={x:s.ex+i.ex,y:s.ey+i.ey},S={x:s.fx+i.fx,y:s.fy+i.fy},I={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${b.x}% ${b.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${x.x}% ${x.y}%,${S.x}% ${S.y}%,${I.x}% ${I.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Qe.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>je(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>je(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var JT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Qe.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Qe.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var Nc=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Qe.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var YT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h,snapPoints:f})=>{let d=new WeakRef(t),b=new WeakRef(i),y=new WeakRef(a),T=new WeakRef(c),x=new WeakRef(r),S=new WeakRef(e),{pathScroller:I,pathSequencer:C,pathTimeline:w,pathTween:M,stopLoop:A,destroy:O}=qT({weakPathElement:x,weakScrollerElement:d,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:$,title2parallax:k,title1tween:P,title2tween:_}=JT({title_1:n,title_2:s}),{sectionContentScroller:D,destroy:N}=Nc({title:b}),{sectionContentScroller:L,destroy:E}=Nc({title:y}),{sectionContentScroller:R,destroy:B}=Nc({title:T}),V=new St({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"spring",breakpoint:"small",useHorizontalScroll:!0,snapPoints:f,children:[I,$,k,D,L,R],onUpdate:({value:F})=>{p(F),h()}});return V.init(),setTimeout(()=>{V?.refresh?.()},500),{goTo:F=>{!F&&F!==0||V?.move?.(F).catch(()=>{})},destroy:()=>{V.destroy(),V=null,C.destroy(),I.destroy(),w.destroy(),M.destroy(),$.destroy(),k.destroy(),P.destroy(),_.destroy(),D.destroy(),L.destroy(),A(),O(),N(),E(),B()}}};var XT=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var bi=()=>{},gi=e=>Promise.resolve(e),Pc=()=>{},kc={1:0,2:100/3,3:100/3*2,4:100},QR=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
        <section class="section section--first ">
            <div class="section-top u-has-overflow">
                <h1 class="title-big" ${e("title_1")}>${r}</h1>
            </div>
            <div class="section-bottom u-has-overflow">
                <h1 class="title-biggest" ${e("title_2")}>
                    ${o}
                </h1>
            </div>
        </section>
    `},ZR=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
        <section class="section">
            <div class="section-top u-has-overflow">
                <div class="section-left"></div>
                <div class="section-right">
                    <h1 class="title-biggest" ${e("section2_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="section-bottom u-has-overflow">
                <div class="section-right">
                    <p class="section-copy">${o}</p>
                </div>
            </div>
        </section>
    `},eN=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
        <section class="section">
            <div class="section-top u-has-overflow">
                <div class="section-left"></div>
                <div class="section-right">
                    <h1 class="title-biggest" ${e("section3_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="section-bottom u-has-overflow">
                <div class="section-right">
                    <p class="section-copy">${o}</p>
                </div>
            </div>
        </section>
    `},tN=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
        <section class="section section--last">
            <div class="section-top u-has-overflow">
                <h1 class="title-biggest" ${e("section4_title")}>
                    ${r}
                </h1>
            </div>
            <div class="section-bottom u-has-overflow">
                <ul class="section-list">
                    ${o.map(n=>g`
                                <li class="section-list-item">[ ${n} ]</li>
                            `).join("")}
                </ul>
            </div>
        </section>
    `},rN=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="nav-item">
                            <button
                                class="nav-button"
                                ${t({click:()=>{bi(kc[o]),Pc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,oN=()=>g`
        <div class="square">
            <div class="square-legend"><h4>Scroll or Drag</h4></div>
            <span class="square-angle top-left"></span>
            <span class="square-angle top-right"></span>
            <span class="square-angle bottom-left"></span>
            <span class="square-angle bottom-right"></span>
        </div>
    `,KT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:b,title_2:y,section2_title:T,section3_title:x,section4_title:S,pathElement:I}=r(),{svg:C}=o(),w=0,M=!1,A=0,{svgSpring:O,destroySvgSpring:$}=XT({elements:C});gi=async _=>{if(u.shouldMakeSomething()||p){O.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let N=-Math.abs(_/30);Number.isNaN(N)||await O.goTo({x:N}).catch(()=>{})},Pc=()=>{gi(3e3),setTimeout(()=>{gi(0)},500)};let{destroy:k,goTo:P}=YT({screenElement:h,scrollerElement:f,pathElement:I,wrapElement:d,title_1:b,title_2:y,section2_title:T,section3_title:x,section4_title:S,snapPoints:Object.values(kc),setActiveItem:_=>{c.activenavItem=_},onMove:_=>{M||(w=_),M=!0,A=w-_,gi(A)},onScrollEnd:u.useDebounce(()=>{M=!1,A=0,gi(A)},500)});return bi=P,c.isMounted=!0,()=>{bi=()=>{},k(),$()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div>${oN()}</div>
        <span class="background">
            <div class="svg-container svg-container--bottom" ${t("svg")}>
                ${c.aboutSvg}
            </div>
        </span>
        <div class="svg-container svg-container--back" ${t("svg")}>
            ${c.aboutSvg}
        </div>
        <div class="shape" ${t("pathElement")}>
            <div class="svg-container svg-container--front">
                ${c.aboutSvg}
            </div>
        </div>
        <div class="screen" ${t("screenElement")}>
            <div class="scrollable-element" ${t("scrollerElement")}>
                <div class="scollable-container" ${t("wrapElement")}>
                    ${QR({setRef:t,getState:n})}
                    ${ZR({setRef:t,getState:n})}
                    ${eN({setRef:t,getState:n})}
                    ${tN({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{bi(kc[ue.clamp(c.activenavItem-1,1,4)]),Pc()}})}
        ></button>
        ${rN({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{bi(kc[ue.clamp(c.activenavItem+1,1,4)]),Pc()}})}
        ></button>
    </div>`};var QT=m.createComponent({tag:"about-component",component:KT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ue.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([QT]);var ZT=async()=>{let{data:e}=await _t({source:"./data/about/index.json"}),{data:t}=await oe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var eS=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
        class="c-benchmark-fake"
        ${s({toggleClass:{selected:()=>i.isSelected}})}
    >
        <div class="row">
            <strong>id:</strong><br />
            ${n}
        </div>
        <div class="row">
            ${t`<strong>index:</strong><br/> ${()=>i.index}`}
        </div>
        <div class="row">
            ${t`<strong>label:</strong><br/> ${()=>i.label}`}
        </div>
        <div class="row">
            ${t`<strong>counter: </strong><br/> ${()=>i.counter}`}
        </div>
        <div class="row">
            <button
                type="button"
                ${r({click:()=>{i.isSelected=!i.isSelected}})}
            >
                Select
            </button>
        </div>
    </div> `};var Ac=m.createComponent({tag:"benchmark-fake-component",component:eS,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[Ac]});var up=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},vi=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},lp=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?up(vi(t)):vi(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},dt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
        <div
            class="loader"
            ${o({observe:"isLoading",toggleClass:{active:()=>n.isLoading}})}
        >
            generate components
        </div>
        <div class="controls">
            <input
                type="text"
                name="numer-of-component"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);lp({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);lp({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                ${e({click:()=>{lp({proxi:n,value:n.data.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                ${e({click:()=>{n.counter=n.counter+1}})}
            >
                Update counter
            </button>
        </div>
    `;var tS=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Invalidate:</h3>
            <h2>Generate components performance</h2>
            <p>
                Invalidate a large list of components with 5 reactive elements
                inside.<br />
                ( max component <strong>1000</strong> ).
            </p>
            ${dt({setRef:i,getRef:a,proxi:h,delegateEvents:t,bindEffect:l})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${o({observe:()=>h.data,render:()=>{let{data:f}=n();return g`
                        ${f.map(({label:d},b)=>g`
                                    <benchmark-fake-component
                                        ${s({label:d,index:b})}
                                        ${c(()=>({counter:h.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var rS=m.createComponent({tag:"benchmark-invalidate",component:tS,...ht()});var Oc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var oS=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat ( with key ):</h3>
            <h2>Generate components performance</h2>
            ${Oc()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,b)=>({index:b,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var nS=m.createComponent({tag:"benchmark-repeat-key",component:oS,...ht()});var sS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat ( nested with key ):</h3>
            <p>
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${i({observe:()=>p.data,key:"label",useSync:!0,render:({current:h})=>g`<div>
                        <div class="static-item-inner">
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
    </div>`};var iS=m.createComponent({tag:"benchmark-repeat-key-nested",component:sS,...ht(31)});var aS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat ( without key ):</h3>
            <h2>Generate components performance</h2>
            ${Oc()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,b)=>({index:b,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var cS=m.createComponent({tag:"benchmark-repeat-no-key",component:aS,...ht()});var $t=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var pp=({value:e,useShuffle:t=!1})=>{$t.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();$t.set("data",t?up(vi(e)):vi(e)),await m.tick();let n=performance.now()-r;$t.set("time",n),$t.set("isLoading",!1)})},2)},lS=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
        <div
            class="loader"
            ${n({observe:"isLoading",toggleClass:{active:()=>o().isLoading}})}
        >
            generate components
        </div>
        <div class="controls">
            <input
                type="text"
                name="numer-of-component"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);pp({value:i})}}})}
            />
            <button
                type="button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);pp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                ${e({click:()=>{let{data:s}=o();pp({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                ${e({click:()=>{$t.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var uS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),$t.set("data",[]),$t.set("time",0),$t.set("counter",0)}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat bind external store ( without key ):</h3>
            <h2>Generate components performance</h2>
            <p>
                Use extrernal store as state ( bindStore module ).<br />
                ( max value <strong>1000</strong> ).
            </p>
            ${lS({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:h,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:d},b,y)=>({index:y,label:b.label,counter:d})})}
                                  ${h()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var pS=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:uS,bindStore:$t,child:[Ac]});var mS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat ( nested without key ):</h3>
            <p>
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${i({observe:()=>p.data,useSync:!0,render:({current:h})=>g`<div>
                        <div class="static-item-inner">
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
    </div>`};var hS=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:mS,...ht(31)});var _c=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var dS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat no component ( without key ):</h3>
            <h2>Generate vanilla html performance</h2>
            ${_c(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${s({observe:()=>l.data,render:({current:p})=>g`
                        <div
                            class="c-benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="row">
                                <button
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var fS=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:dS,...ht(1001)});var gS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat no component ( with key ):</h3>
            <h2>Generate vanilla html performance</h2>
            ${_c(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${s({observe:()=>l.data,key:"label",render:({current:p})=>g`
                        <div
                            class="c-benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="row">
                                <button
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var bS=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:gS,...ht(1001)});m.useComponent([rS,cS,nS,iS,hS,pS,fS,bS]);var Or=async({props:e})=>{let{rootComponent:t}=e;return g`<${t}></${t}>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ui);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ui);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var ee=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});ee.set("activeNavigationSection","");var ft=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},gt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},fo=e=>"roundRect"in e;var go=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,b=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:b,centerX:d+o/2,centerY:b+n/2,offsetXCenter:nN({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:sN({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},nN=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,sN=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var vS=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,b=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:x}=gt({useOffscreen:h,canvas:e}),S=h?x:b,I=fo(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let C=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,w=i?C.map((P,_)=>({...P,scale:1,rotate:0,hasFill:o.includes(_)})).toSorted(P=>P.hasFill?-1:1).toReversed():C.map((P,_)=>{let D=o.includes(_);return{...P,scale:1,rotate:0,hasFill:D}}),M=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});w.forEach(P=>{M.subscribeCache(({scale:_,rotate:D})=>{P.rotate=D,P.scale=_})});let A=()=>{if(!b)return;let P=e.width,_=e.height,D=h?x:b;D&&(h&&T?(T.width=P,T.height=_):D.reset(),w.forEach(({x:N,y:L,width:E,height:R,rotate:B,scale:V,hasFill:F,offsetXCenter:z,offsetYCenter:te})=>{let ae=Math.PI/180*B,q=Math.cos(ae)*V,ne=Math.sin(ae)*V;D.setTransform(q,ne,-ne,q,Math.floor(z+N),Math.floor(te+L));let re=Math.round(-E/2),ce=Math.round(-R/2);I?(D.beginPath(),D.roundRect(re,ce,E,R,150)):(D.beginPath(),D.rect(re,ce,E,R)),F?(D.fillStyle="#000000",D.fill()):(D.fillStyle="rgba(255, 255, 255, 1)",D.fill())}),bt({useOffscreen:h,offscreen:T,ctx:b}))},O=Re.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&O.goTo(M,{scale:.2,rotate:90},{duration:1e3}).goTo(M,{scale:1},{duration:500}).goTo(M,{rotate:180,scale:1.2},{duration:500}).goTo(M,{scale:.3,rotate:0},{duration:500}).goTo(M,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&O.goTo(M,{scale:.3,rotate:0},{duration:1e3}).goTo(M,{scale:1},{duration:1e3}),O.onLoopEnd(({direction:P,loop:_})=>{console.log(`loop end: ${P}, ${_}`)}),O.play();let $=()=>{A(),d&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let k=ee.watch("navigationIsOpen",P=>{if(P){O?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(O?.resume(),u.useFrame(()=>$()))},500)});return()=>{M.destroy(),O.destroy(),k(),M=null,O=null,b=null,T=null,x=null,C=[],d=!1,w=null,f=null}};var mp=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var hp=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=vS({canvas:t().canvas,...mp[e.currentParamsId].params,disableOffcanvas:!0})};function iN({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return mp.map(({label:n},s)=>g` <li class="controls-item">
                <button
                    type="button"
                    class="controls-button"
                    ${e({click:()=>{r.currentParamsId=s,hp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var yS=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{hp({proxi:i,getRef:r})})});let a=u.useResize(()=>{hp({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="controls-open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${iN({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="l-background-shape">${i.background}</div>
                <div
                    class="canvas-container"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var TS=m.createComponent({tag:"animatedpattern-n0",component:yS,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([TS]);var SS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    `};var dp=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:t}),p=!0,{top:h,left:f}=be(e),d=e.getContext(l,{alpha:!0}),b=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let x=go({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,S=x.map((_,D)=>({..._,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(D)})).toSorted(_=>_.hasFill?-1:1),I=U.createLerp({data:{mouseX:0,mouseY:0}});S.forEach(_=>{I.subscribeCache(({mouseX:D,mouseY:N})=>{_.mouseX=D,_.mouseY=N})});let C=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});S.forEach(_=>{C.subscribeCache(({scale:D})=>{_.scale=D})});let w=()=>{if(!d)return;let _=e.width,D=e.height,N=c?T:d;N&&(c&&y?(y.width=_,y.height=D):N.reset(),S.forEach(({x:L,y:E,width:R,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(!te)return;let ne=V-(e.width-(R+i)*s)/2,re=F-(e.height-(B+i)*n)/2,ce=(L-ne)/250,_e=(E-re)/250,Ye=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(_e),2)),Z=ue.clamp(Math.abs(Ye),0,2),ye=0,Ne=Math.cos(ye)*(Z+z),Oe=Math.sin(ye)*(Z+z);N.setTransform(Ne,Oe,-Oe,Ne,Math.floor(ae+L),Math.floor(q+E)),N.beginPath(),N.rect(Math.floor(-R/2),Math.floor(-B/2),R,B),N.fillStyle="#000000",N.fill()}),N.globalCompositeOperation="destination-out",S.forEach(({x:L,y:E,width:R,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(te)return;let ne=V-(e.width-(R+i)*s)/2,re=F-(e.height-(B+i)*n)/2,ce=(L-ne)/250,_e=(E-re)/250,Ye=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(_e),2)),Z=ue.clamp(Math.abs(Ye),0,2),ye=0,Ne=Math.cos(ye)*(Z+z),Oe=Math.sin(ye)*(Z+z);N.setTransform(Ne,Oe,-Oe,Ne,Math.floor(ae+L),Math.floor(q+E)),N.beginPath(),N.rect(Math.floor(-R/2),Math.floor(-B/2),R,B),N.fill()}),bt({useOffscreen:c,offscreen:y,ctx:d}))},M=Re.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(C,{scale:.3},{duration:1e3});M.play();let A=({x:_,y:D})=>{I.goTo({mouseX:_-f,mouseY:D-h}).catch(()=>{})},O=u.useMouseMove(({client:_})=>{let{x:D,y:N}=_;A({x:D,y:N})}),$=u.useTouchMove(({client:_})=>{let{x:D,y:N}=_;A({x:D,y:N})}),k=()=>{w(),p&&u.useNextFrame(()=>k())};u.useFrame(()=>{k()});let P=ee.watch("navigationIsOpen",_=>{if(_){M?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===b.route&&(M?.play(),u.useFrame(()=>k()))},500)});return()=>{C.destroy(),M.destroy(),I.destroy(),O(),$(),P(),C=null,M=null,I=null,d=null,y=null,T=null,x=[],p=!1,S=null,l=null}};var xS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=dp({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=dp({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="l-background-shape">${i.background}</div>
                <div
                    class="canvas-container"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var CS=m.createComponent({tag:"animatedpattern-n1",component:xS,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([CS]);var ES=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    `};var wS=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:t}),b=!0,y=e.getContext(d,{alpha:!0}),{top:T,left:x}=be(e),S=m.getActiveRoute(),{offscreen:I,offScreenCtx:C}=gt({useOffscreen:f,canvas:e}),w=!0;e.width=e.clientWidth,e.height=e.clientHeight;let M=[...Array.from({length:19}).keys()].map((V,F)=>{let z=F>=9.5?9.5+(9.5-F):F,te=s.includes(F)?1:z*i;return{width:z*o,height:z*n,x:0,y:0,hasFill:s.includes(F),opacity:te,radius:a,rotate:0,relativeIndex:z,scale:1}}),A=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),O=M.map(V=>A.subscribeCache(({rotate:F})=>{V.rotate=F})),$=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});M.forEach(V=>{$.subscribeCache(({x:F,y:z})=>{V.x=F,V.y=z,V.scale=h})});let k=()=>{if(!y)return;let V=e.width,F=e.height,z=e.width/2,te=e.height/2,ae=M.length,q=f?C:y;q&&(f&&I?(I.width=V,I.height=F):q.reset(),M.forEach(({width:ne,height:re,x:ce,y:_e,rotate:Ye,hasFill:Z,opacity:ye,scale:Ne},Oe)=>{let Xe=ae-Oe,$e=Math.max(1,Ne/4),_r=1,Lt=Math.PI/180*Ye,Y=Math.cos(Lt)*_r,$r=Math.sin(Lt)*_r;q.setTransform(Y,$r,-$r,Y,z+ce+Xe*ce/20,te+_e+Xe*_e/20);let Ve=Math.round(-ne/2)*$e,Ce=Math.round(-re/2)*$e;w?(q.beginPath(),q.roundRect(Ve,Ce,ne*$e,re*$e,130)):(q.beginPath(),q.rect(Ve,Ce,ne*$e,re*$e)),Z?q.fillStyle="#000":(q.fillStyle=`rgba(238, 238, 238, ${ye})`,q.strokeStyle=`rgba(0, 0, 0, ${ye})`,q.stroke()),q.fill()}),bt({useOffscreen:f,offscreen:I,ctx:y}))},P=Re.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});P.goTo(A,{rotate:360},{duration:p}),P.play();let _=()=>{k(),b&&u.useNextFrame(()=>_())};u.useFrame(()=>_());let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=be(e).top,x=be(e).left,k()}),N=ue.useVelocity(({speed:V})=>{h=V}),L=({x:V,y:F})=>{let z=window.innerWidth,te=window.innerHeight,ae=V-e.width/2-x,q=F-e.height/2-T;$.goTo({x:ue.clamp(ae,-z/2+400+x,z/2-400-x),y:ue.clamp(q,-te/2+200+T,te/2-200-T)}).catch(()=>{})},E=u.useMouseMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),R=u.useTouchMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),B=ee.watch("navigationIsOpen",V=>{if(V){b=!1,P?.pause(),A?.pause(),$?.pause();return}setTimeout(()=>{b=!0,m.getActiveRoute().route===S.route&&(P?.resume(),A?.resume(),$?.resume(),u.useFrame(()=>_()))},500)});return{destroy:()=>{A.destroy(),$.destroy(),P.destroy(),D(),E(),R(),N(),B(),O.forEach(V=>{V()}),O.length=0,A=null,$=null,P=null,y=null,I=null,C=null,b=!1,M=null,d=null},stopBlackOne:()=>{s.forEach(V=>{O[V]?.()})}}};function aN({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="controls-item">
        <button
            type="button"
            class="controls-button"
            ${e({click:()=>{o.stopBlackOne(),o.blackOneIsStopped=!0}})}
            ${t({toggleAttribute:{disabled:()=>o.blackOneIsStopped}})}
        >
            Stop black one rotation
        </button>
        <p class="controls-status">
            ${r`${()=>o.blackOneIsStopped?"Black one rotation is off":""}`}
        </p>
    </li>`}var IS=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=wS({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="l-background-shape">${a.background}</div>

                <button
                    type="button"
                    class="controls-open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${aN({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="canvas-container"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var MS=m.createComponent({tag:"caterpillar-n1",component:IS,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([MS]);var RS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    `};var fp=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},NS=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:t.disableOffcanvas}),d=!0,b=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:x}=gt({useOffscreen:h,canvas:e}),S=!0,I=[...Array.from({length:20}).keys()].map((k,P)=>{let _=P>=10?10+(10-P):P,D=o+o/3*_,N=n+n/3*_,L=s.includes(P)?1:(20-P)*i;return{width:D,height:N,x:0,y:0,hasFill:s.includes(P),opacity:L,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let C=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:k,direction:P})=>{fp({isForced:k,direction:P,value:1})},1).add(({isForced:k,direction:P})=>{fp({isForced:k,direction:P,value:5})},5).add(({isForced:k,direction:P})=>{fp({isForced:k,direction:P,value:9})},9);I.forEach(k=>{C.subscribeCache(({x:P,rotate:_})=>{let D=P/p,N=2/(3-Math.cos(2*D)),L=N*Math.cos(D)*a,E=N*Math.sin(2*D)/2*c;k.x=L,k.y=E,k.rotate=_})});let w=Re.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(C);w.onLoopEnd(({loop:k,direction:P})=>{console.log(`loop end: ${k} , ${P}`)});let M=()=>{if(!b)return;let k=e.width,P=e.height,_=e.width/2,D=e.height/2,N=h?x:b;N&&(h&&T?(T.width=k,T.height=P):N.reset(),I.forEach(({width:L,height:E,x:R,y:B,rotate:V,hasFill:F,opacity:z})=>{let ae=Math.PI/180*V,q=Math.cos(ae)*1,ne=Math.sin(ae)*1;N.setTransform(q,ne,-ne,q,_+R,D+B);let re=Math.round(-L/2),ce=Math.round(-E/2);S?(N.beginPath(),N.roundRect(re,ce,L,E,[40,40])):(N.beginPath(),N.rect(re,ce,L,E)),F?N.fillStyle="#000000":(N.strokeStyle=`rgba(0, 0, 0, ${z})`,N.fillStyle="rgba(238, 238, 238, 0)",N.stroke()),N.fill()}),bt({useOffscreen:h,offscreen:T,ctx:b}))},A=()=>{M(),d&&u.useNextFrame(()=>A())};u.useFrame(()=>A()),w.play();let O=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,M()}),$=ee.watch("navigationIsOpen",k=>{if(k){d=!1,w?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(w?.resume(),u.useFrame(()=>A()))},500)});return{destroy:()=>{d=!1,O(),$(),C.destroy(),C=null,w.destroy(),w=null,b=null,T=null,x=null,I=null,f=null},play:()=>{w.play()},playReverse:()=>{w.playReverse()},playUseCurrent:()=>{w.play({useCurrent:!0})},playReverseUseCurrent:()=>{w.playReverse({useCurrent:!0})},playFromLabel:()=>{w.playFrom("mylabel")},plaFromLabelReverse:()=>{w.playFromReverse("mylabel")},stop:()=>w.stop(),pause:()=>w.pause(),resume:()=>w.resume(),reverse:()=>w.reverse()}};function cN({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="controls-item">
                <button type="button" class="controls-button ${t}">
                    ${o}
                </button>
            </li>`}).join("")}var PS=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=NS({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,b])=>{let{method:y}=b;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="controls-open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${cN({buttons:a.buttons})}
                    <li class="controls-item">
                        <div class="controls-range">
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
                        <label for=${c} class="controls-range-value">
                            ${i`deg: ${()=>a.rotationlabel}`}
                        </label>
                    </li>
                </ul>

                <div class="l-background-shape is-light">
                    ${a.background}
                </div>
                <div
                    class="canvas-container"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var lN={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},kS=m.createComponent({tag:"caterpillar-n2",component:PS,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:lN,type:"Any"})}});m.useComponent([kS]);var AS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    `};var $c=()=>{m.useMethodByName(pi).update(!0)},Lc=()=>{m.useMethodByName(pi).update(!1)};var OS=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,b=U.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:x,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),I=h?S:y,C=fo(I);I=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=go({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,M=l?w.map((D,N)=>({...D,scale:1,rotate:0,hasFill:p.includes(N)})).toSorted(D=>D.hasFill?-1:1):w.map((D,N)=>({...D,scale:1,rotate:0,hasFill:p.includes(N)})),A=U.createStaggers({items:M,stagger:r}),O=A.map(({item:D,start:N,end:L})=>{let E=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:N,end:L,ease:"easeInOutQuad"}),R=E.subscribe(({scale:B})=>{D.scale=B});return b.add(E),{sequencer:E,unsubscribe:R}}),$=()=>{if(!y)return;let D=e.width,N=e.height,L=h?S:y;L&&(h&&x?(x.width=D,x.height=N):L.reset(),M.forEach(({x:E,y:R,width:B,height:V,rotate:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{let ne=Math.PI/180*F,re=Math.cos(ne)*z,ce=Math.sin(ne)*z;L.setTransform(re,ce,-ce,re,Math.floor(ae+E),Math.floor(q+R));let _e=Math.round(-B/2),Ye=Math.round(-V/2);C?(L.beginPath(),L.roundRect(_e,Ye,B,V,150)):(L.beginPath(),L.rect(_e,Ye,B,V)),te?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),C||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:x,ctx:y}))},k=Qe.createScrollTrigger({trigger:t,propierties:"tween",tween:b,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},reverse:!1,ease:!0,easeType:"lerp"});k.init();let P=()=>{$(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let _=ee.watch("navigationIsOpen",D=>{if(D){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>P())},500)});return()=>{_(),O.forEach(({sequencer:D,unsubscribe:N})=>{D.destroy(),N()}),O=[],b.destroy(),b=null,A=[],k.destroy(),k=null,y=null,x=null,S=null,w=[],d=!1,M=null,f=null}};var gp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var bp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=OS({canvas:t().canvas,canvasScroller:t().canvasScroller,...gp[e.currentParamsId].params,disableOffcanvas:!0})};function uN({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return gp.map(({label:n},s)=>g` <li class="controls-item">
                <button
                    type="button"
                    class="controls-button"
                    ${e({click:()=>{r.currentParamsId=s,bp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var _S=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{$c(),u.useFrame(()=>{u.useNextTick(()=>{bp({proxi:i,getRef:r})})});let a=u.useResize(()=>{bp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},Lc(),a()}}),g`
        <div>
            <div class="c-canvas is-fixed">
                <button
                    type="button"
                    class="controls-open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${uN({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="l-background-shape">${i.background}</div>
                <div
                    class="canvas-container"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var $S=m.createComponent({tag:"scroller-n0",component:_S,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([$S]);var LS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function pN({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function mN({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var DS=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),b=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:p,canvas:e}),x=p?T:d,S=fo(x);x=null,e.width=e.clientWidth,e.height=e.clientHeight;let I=[...Array.from({length:17}).keys()].map((k,P)=>{let _=P>=8.5?8.5+(8.5-P):P;return{width:Math.floor(pN({width:15,relativeIndex:_,amountOfPath:17})),height:Math.floor(mN({height:30,relativeIndex:_,amountOfPath:17})),opacity:_*.09,hasFill:l.has(P),rotate:0,relativeIndex:_,index:P}}),C=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});I.forEach(k=>{C.subscribeCache(({rotate:P})=>{k.rotate=P})});let w=()=>{if(!d)return;let k=e.width,P=e.height,_=e.width/2,D=e.height/2,N=p?T:d;N&&(p&&y?(y.width=k,y.height=P):N.reset(),I.forEach(({width:L,height:E,opacity:R,rotate:B,index:V,hasFill:F})=>{let z=I.length/2-V,te=1,ae=Math.PI/180*(B-33),q=Math.cos(ae)*te,ne=Math.sin(ae)*te;N.setTransform(q,ne,-ne,q,_,D+z*19),S?(N.beginPath(),N.roundRect(-L/2,-E/2+z*19,L,E,150)):(N.beginPath(),N.rect(Math.round(-L/2),Math.round(-E/2),L,E)),F?N.fillStyle="#000":(N.fillStyle=`rgba(238, 238, 238, ${R})`,N.strokeStyle=`rgba(0, 0, 0, ${R})`,N.stroke()),N.fill()}),bt({useOffscreen:p,offscreen:y,ctx:d}))},M=Qe.createScrollTrigger({trigger:t,propierties:"tween",tween:C,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},ease:!0,easeType:"spring"});M.init();let A=()=>{w(),f&&u.useNextFrame(()=>A())};u.useFrame(()=>{A()});let O=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{w()})}),$=ee.watch("navigationIsOpen",k=>{if(k){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===b.route&&u.useFrame(()=>A())},500)});return()=>{C.destroy(),O(),$(),C.destroy(),C=null,M.destroy(),M=null,d=null,y=null,T=null,C=null,f=!1,I=null,h=null}};function hN({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="controls-item">
        <div class="controls-range">
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
        <label for=${o} class="controls-range-value">
            ${r`rotationValue: ${()=>e.rotationlabel}`}
        </label>
    </li>`}var FS=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};$c();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=DS({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),Lc(),c=null}}),g`
        <div>
            <div class="c-canvas is-fixed ">
                <div class="l-background-shape">${a.background}</div>
                <button
                    type="button"
                    class="controls-open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${hN({proxi:a,delegateEvents:s,bindObject:i})}
                </ul>
                <div
                    class="canvas-container"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var BS=m.createComponent({tag:"scroller-n1",component:FS,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([BS]);var VS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    `};var WS=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Yn=m.createComponent({tag:"dynamic-list-button",component:WS,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Dc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],jS=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],zS=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],HS=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Xn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var dN=[{buttonLabel:"sample1",data:jS},{buttonLabel:"salmple2",data:zS},{buttonLabel:"sample3",data:HS},{buttonLabel:"Initial",data:Dc}],fN=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function gN({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return dN.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="dynamic-list-button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function bN({bindProps:e,staticProps:t,proxi:r}){return fN.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var US=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="header">
                <div class="header-top">
                    ${gN({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
                    <dynamic-list-button
                        class="dynamic-list-button"
                        ${t({label:"+ counter ( max: 10 )"})}
                        ${o({click:async()=>{e("counter",c=>c+1)}})}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="dynamic-list-button"
                        ${t({label:"- counter: ( min 0 )"})}
                        ${o({click:async()=>{e("counter",c=>c>0?c-=1:c)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="invalidate">
                <h4 class="invalidate-title">
                    Invalidate component on counter mutation:
                </h4>
                <div>
                    ${n({observe:()=>a.counter,render:()=>g`<div>
                                <dynamic-list-card-inner
                                    ${r(()=>({key:`${a.counter}`}))}
                                ></dynamic-list-card-inner>
                            </div>`})}
                </div>
            </div>

            <div class="counter">
                <h4>List counter</h4>
                <span>${s`${"counter"}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="repeaters-container">
                <div class="repeaters-grid">
                    ${bN({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function vN({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
        <div>
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
    `}var GS=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="repeater-title">${s.label}</h4>
            <div class="repeater-list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>vN({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function yN(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var TN=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        <!-- component -->
        ${yN(r.counter).map(o=>g`
                    <dynamic-list-card-inner
                        ${e({key:`${o}`})}
                        ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                    >
                    </dynamic-list-card-inner>
                `).join("")}
    `,qS=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;return h(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,y,T)=>T.map(({key:x})=>x).indexOf(b.key)===y)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{})),g`
        <div
            class="c-dynamic-card"
            ${l({toggleClass:{active:()=>f.isMounted,"is-selected":()=>f.isSelected}})}
        >
            <div class="card-container">
                <p class="card-title">card content</p>

                <!-- component -->
                <dynamic-list-button
                    class="repeater-card-button"
                    ${s({click:()=>{f.isSelected=!f.isSelected}})}
                    ${o(()=>({active:f.isSelected}))}
                >
                    Select
                </dynamic-list-button>

                <div class="card-info">
                    <p>id: ${n}</p>
                    <p>list index: ${f.parentListId}</p>
                    <p>${c`index: ${"index"}`}</p>
                    <p>${c`label: ${"label"}`}</p>
                    <p>${c`counter: ${"counter"}`}</p>
                    <p>key: ${t.length>0?t:"no-key"}</p>
                </div>

                <!-- component -->
                <div class="card-slot">
                    <mobjs-slot name="card-label-slot"></mobjs-slot>
                </div>

                <!-- component -->
                <div class="card-nested-child">
                    <dynamic-list-empty>
                        <dynamic-list-counter
                            slot="empty-slot"
                            ${r({parentListId:f.parentListId})}
                            ${o(()=>({counter:f.counter}))}
                        />
                    </dynamic-list-empty>
                </div>

                <div class="card-repeaters-wrap">
                    <p><strong>Inner repeater:</strong></p>

                    <!-- component -->
                    <dynamic-list-button
                        class="repeater-card-button"
                        ${s({click:async()=>{d=d<Xn.length-1?d+1:0,f.innerData=Xn[d],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <div class="card-repeater">
                        <!-- component -->
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:b})=>g` <dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- component -->
                    <div class="card-repeater">
                        ${a({observe:()=>f.innerData,render:({current:b})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>
                </div>

                <div class="card-invalidate">
                    <p>
                        <strong
                            >Inner invalidate<br />
                            on counter mutation:</strong
                        >
                    </p>
                    <div>
                        ${i({observe:()=>f.counter,render:()=>TN({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var JS=({bindText:e})=>g`<span class="c-dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var Fc=m.createComponent({tag:"dynamic-list-card-inner",component:JS,props:{key:()=>({value:"",type:String})}});var YS=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="c-dynamic-counter">
        <p class="title">Nested:</p>
        <p class="subtitle">(slotted)</p>
        <p class="list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var XS=m.createComponent({tag:"dynamic-list-counter",component:YS,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var KS=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var QS=m.createComponent({tag:"dynamic-list-empty",component:KS});var ZS=m.createComponent({tag:"dynamic-list-card",component:qS,props:{parentListId:()=>({value:-1,type:Number}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Xn[0],type:Array}),innerDataUnivoque:()=>({value:Xn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[XS,QS,Fc,Yn]});var ex=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p>${e`slotted: ${"label"}`}</p>
    </div>`;var tx=m.createComponent({tag:"dynamic-slotted-label",component:ex,props:{label:()=>({value:"",type:String})}});var rx=m.createComponent({tag:"dynamic-list-repeater",component:GS,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[ZS,tx]});var ox=m.createComponent({tag:"dynamic-list",component:US,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Dc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Yn,rx,Fc]});m.useComponent([ox]);var nx=()=>g` <dynamic-list> </dynamic-list> `;var sx=({refs:e})=>{let t=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Re.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=Re.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=ee.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var SN=async({playIntro:e,playSvg:t})=>{await e(),t()},ix=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=sx({refs:s});return setTimeout(()=>{SN({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var ax=m.createComponent({tag:"home-component",component:ix,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var bo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),By(r)};m.useComponent([ax]);var cx=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>bo({svg:e,id:d}));return g`
        <div>
            <div class="l-background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var lx=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function xN(e){return Math.floor(Math.random()*e)}var Bc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${lx.map(n=>g` <div class="header-col">
                    <dynamic-list-button
                        class="header-button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="header-button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:xN(1e3),value:u.getUnivoqueId()}])}})}
                        >${n.label_plus}</dynamic-list-button
                    >
                    <div class="header-counter">
                        ${r({observe:n.state,render:()=>{let s=o?.[n.state];return g`
                                    Number of items: ${s.length} ( max
                                    ${n.maxItem} )
                                `}})}
                    </div>
                </div>`).join("")}

        <div class="header-col">
            <dynamic-list-button
                class="header-button"
                ${e({click:()=>{t("counter",n=>n+1)}})}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;var Kn=e=>{m.useMethodByName(e).toggleActive()};var ux=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="level level--3">
            ${e({observe:()=>n.level3,render:({current:s})=>{let i=u.getUnivoqueId(),a=u.getUnivoqueId();return g`
                        <div class="level-wrap level-wrap--3">
                            <matrioska-item
                                class="is-3"
                                name="${i}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Kn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="is-3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Kn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var px=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="level level--2">
            ${e({observe:()=>n.level2,render:({current:s})=>g`
                        <div class="level-wrap level-wrap--2">
                            <matrioska-item
                                class="is-2"
                                ${t({level:"level 2"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                            >
                                ${ux({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var mx=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="l-matrioska">
        <div class="header">
            ${Bc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
        </div>
        <h4 class="legend">
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="level level--1">
            ${r({observe:()=>a.level1,render:({current:c})=>g`
                        <div class="level-wrap level-wrap--1">
                            <matrioska-item
                                class="is-1"
                                ${o({level:"level 1"})}
                                ${n(()=>({key:`${c.value.key}`,value:`${c.value.value}`,index:c.index,counter:a.counter}))}
                            >
                                ${px({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    </div>`};var hx=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
        class="c-matrioska-item"
        ${o({toggleClass:{active:()=>s.active}})}
    >
        <div class="info">
            <h4 class="item-level">${s.level}:</h4>
            <h6 class="key">${t`key: <span>${"key"}</span>`}</h6>
            <h6 class="key">${t`index: <span>${"index"}</span>`}</h6>
            <h6 class="value">${t`Value: <span>${"value"}</span>`}</h6>
            <h6 class="value">
                ${t`counter: <span>${"counter"}</span>`}
            </h6>
            <h6 class="value">Component id: <span>${r}</span></h6>
        </div>
        <div class="child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`};var dx=m.createComponent({tag:"matrioska-item",component:hx,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var fx=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="level level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div class="level-wrap level-wrap--3">
                                <matrioska-item
                                    class="is-3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Kn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="is-3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Kn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var gx=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
        <div class="level level--2">
            ${o({observe:()=>n.level2,render:()=>n.level2.map((s,i)=>g`
                                <div class="level-wrap level-wrap--2">
                                    <matrioska-item
                                        class="is-2"
                                        ${e({level:"level 2",index:i,key:`${s.key}`,value:`${s.value}`})}
                                        ${t(()=>({counter:n.counter}))}
                                    >
                                        ${fx({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var bx=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="l-matrioska">
        <div class="header">
            ${Bc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
        </div>
        <h4 class="legend">
            Nested invalidate like matrioska in same component.
        </h4>
        <div class="level level--1">
            ${n({observe:"level1",render:()=>i.level1.map((a,c)=>g`
                                <div class="level-wrap level-wrap--1">
                                    <matrioska-item
                                        class="is-1"
                                        ${r({level:"level 1",key:`${a.key}`,index:c,value:`${a.value}`})}
                                        ${o(()=>({counter:i.counter}))}
                                    >
                                        ${gx({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    </div>`};var CN=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},vx={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?CN(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Yn,dx]},yx=m.createComponent({tag:"page-matrioska-repeat",component:mx,...vx}),Tx=m.createComponent({tag:"page-matrioska-invalidate",component:bx,...vx});m.useComponent([yx,Tx]);var Sx=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,xx=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var vp=0,EN=({indicators:e,proxi:t})=>[...e].map((r,o)=>Qe.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+vp-je(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),Cx=({pins:e})=>{e.forEach(t=>t.refresh())},wN=({titles:e})=>[...e].map(t=>Qe.createParallax({item:t,propierties:"x",reverse:!0,range:9})),Ex=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},wx=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},Ix=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=EN({indicators:e,proxi:n}),a=wN({titles:t}),c=document.querySelector(".js-side-col");vp=je(c)/2;let l=u.useResize(()=>{vp=je(c)/2}),p=new si({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{Cx({pins:i}),Ex({nav:r})},onEnterBack:()=>{Cx({pins:i}),Ex({nav:r})},onLeave:()=>{wx({nav:r})},onLeaveBack:()=>{wx({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var IN=(e,t)=>e===0?1:e===t-1?-1:0,MN=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},RN=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),Mx=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=Ix({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(b,y)=>{let T=c.querySelector(`.shadowClass--section-${b} .shadowClass--in-center`),{top:x}=be(T),S=le(T),I=Number.parseInt(b)===0?window.innerHeight+1:x+S-window.innerHeight,C=Math.max(1,Math.abs(b-y)),w=2e3,A=1+(l-C)/l*.9,O=C/l*w*A;kr.to(I+IN(b,l),{duration:O})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="top">scroll down</div>
        <ul class="nav js-nav" ${n("js_nav")}>
            ${RN({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="js-root" ${n("js_root")}>
            <div class="wrapper js-container" ${n("js_container")}>
                <div class="js-row" ${n("js_root")}>
                    ${MN({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div class="js-trigger" ${n("js_trigger")}></div>
            </div>
        </div>
        <div>scroll up</div>
    </div>`};var Rx=({getProxi:e})=>{let t=e();return g`
        <li class="nav-item">
            <button type="button" data-id="${t.id}" class="nav-button">
                ${t.id}
            </button>
        </li>
    `};var Nx=m.createComponent({tag:"horizontal-scroller-button",component:Rx,props:{id:()=>({value:-1,type:Number})}});var Px=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
        <section class="column js-column" data-shadow="section-${t}">
            <div class="wrap">
                <span class="h-scroller-indicator js-indicator ${r}">
                    <span></span>
                </span>
                <div class="title js-title">
                    <h1>${t}</h1>
                </div>
            </div>
        </section>
    `};var kx=m.createComponent({tag:"horizontal-scroller-section",component:Px,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var Ax=m.createComponent({tag:"horizontal-scroller",component:Mx,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[Nx,kx]});m.useComponent([Ax]);var Ox=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var _x=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var $x=m.createComponent({tag:"svg-star",component:_x,props:{fill:()=>({value:"#000000",type:String})}});var NN=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
        class="controls"
        ${t({toggleClass:{active:()=>o.controlsActive}})}
    >
        <button
            type="button"
            class="close-controls"
            ${e({click:()=>{o.controlsActive=!1}})}
        ></button>
        <div class="controls-block">
            <div class="controls-range">
                <input
                    type="range"
                    value=${o.factor}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="controls-block">
            <div class="controls-range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xDepth=Number(s)}})}
                />
            </div>
            <div>${r`xDepth: ${()=>o.xDepth}`}</div>
        </div>
        <div class="controls-block">
            <div class="controls-range">
                <input
                    type="range"
                    value=${o.xLimit}
                    max=${o.xLimit}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="controls-block">
            <div class="controls-range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yDepth=Number(s)}})}
                />
            </div>
            <div>${r`yDepth: ${()=>o.yDepth}`}</div>
        </div>
        <div class="controls-block">
            <div class="controls-range">
                <input
                    type="range"
                    value=${o.yLimit}
                    max=${o.yLimit}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yLimit=Number(s)}})}
                />
            </div>
            <div>${r`yLimit: ${()=>o.yLimit}`}</div>
        </div>
        <div class="controls-block">
            <button
                type="button"
                class="controls-button"
                ${e({click:()=>{o.debug=!o.debug}})}
            >
                Toggle Debug
            </button>
        </div>
    </div>`,Lx=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div class="l-move3d-page">
        <button
            type="button"
            class="show-controls"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${NN({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var PN=({debug:e,id:t})=>e?g`<span class="debug">${t}</span>`:"",yp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${PN({debug:o,id:s.id})}
                ${yp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var Tp=({element:e})=>({height:le(e),width:je(e),offSetLeft:be(e).left,offSetTop:be(e).top}),Dx=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),Fx=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Qn=()=>{},Bx=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,b=0,y=0,T=0,x=0,S=!1,I=!1,C={x:0,y:0},w=0,M=Qn,A=Qn,O=Qn,$=Qn,k=Qn,P=Qn,_=[],D=U.createSpring({data:{delta:0,ax:0,ay:0}}),N=()=>{S=!1},L=()=>{let{vw:F,vh:z}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},te=C.x,ae=C.y,{xgap:q,ygap:ne}=S?I?(I=!1,{xgap:0,ygap:0}):{xgap:te-b,ygap:ae-T}:{xgap:0,ygap:0};S&&(y+=q,x+=ne);let{xInMotion:re,yInMotion:ce}=S?{xInMotion:y,yInMotion:x}:{xInMotion:te,yInMotion:ae},{ax:_e,ay:Ye}=l.centerToViewoport||l.drag?{ax:-(F/2-re)/l.xDepth,ay:(z/2-ce)/l.yDepth}:{ax:-(F/2-(re-f))/l.xDepth,ay:(z/2-(ce-d))/l.yDepth};b=te,T=ae;let Z=_e>l.xLimit||_e<-l.xLimit,ye=Ye>l.yLimit||Ye<-l.yLimit;Z&&(y-=q),ye&&(x-=ne);let Ne=ue.clamp(_e,-l.xLimit,l.xLimit),Oe=ue.clamp(Ye,-l.yLimit,l.yLimit),Xe=Math.hypot(Math.abs(Oe),Math.abs(Ne));D.goTo({delta:Xe,ax:Ne,ay:Oe}).catch(()=>{}),_.forEach($e=>{$e({delta:Xe,factor:l.factor})})},E=F=>{w!==F&&(C.y-=w,w=F,C.y+=w),L()},R=({page:F})=>F.y>d&&F.y<d+p&&F.x>f&&F.x<f+h,B=({page:F})=>{R({page:F})&&(S=!0,I=!0)},V=()=>{P(),P=l.useScroll?u.useScroll(({scrollY:F})=>{E(F)}):()=>{}};return e(({element:F})=>{let{container:z}=r();l.afterInit(F);let te=D.subscribe(({delta:re,ax:ce,ay:_e})=>{z.style.transform=`translate3D(0,0,0) rotateY(${ce}deg) rotateX(${_e}deg)`,"onUpdate"in l&&l.onUpdate({delta:re,deltaX:ce,deltaY:_e})}),ae=D.onComplete(({ax:re,ay:ce})=>{z.style.transform=`rotateY(${re}deg) rotateX(${ce}deg)`}),q=u.useMouseMove(({page:re})=>{C={x:re.x,y:re.y},L()}),ne=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F}))});return o(()=>l.drag,re=>{if(k(),$(),O(),A(),M(),re){y=window.innerWidth/2,x=window.innerHeight/2,M=u.useTouchStart(({page:ce})=>{B({page:ce})}),A=u.useTouchEnd(()=>{N()}),O=u.useMouseDown(({page:ce})=>{B({page:ce})}),$=u.useMouseUp(()=>{N()}),k=u.useTouchMove(({page:ce})=>{C={x:ce.x,y:ce.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(re,ce)=>{if(re){V();return}re!==ce&&P()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F})),C={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{te(),ae(),ne(),q(),P(),M(),A(),O(),$(),k(),D.destroy(),_=[],D=null,p=null,h=null,f=null,d=null,b=null,y=null,T=null,x=null,S=null,I=null,C=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"use-drag":()=>l.drag}})}
    >
        <div
            class="scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="scene-container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{_=Dx({childrenId:c})},render:()=>yp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var Sp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),Vx=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var kN=e=>e?.tagName.length===0?"":g`
        <div class="component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,AN=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=Sp(l),h=Sp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:b}=Vx(f);a.goTo({depth:c,rotateX:d,rotateY:b}).catch(()=>{})},Wx=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:b,classList:y,component:T}=e(),x=o?"is-root":"is-children",S=`--item-width:${c};`,I=`--item-height:${l};`,C=`--offset-x:${p};`,w=`--offset-y:${h};`,M=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:A,factor:O})=>{s&&AN({delta:A,factor:O,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:M})}),r(({element:A})=>{let O=M.subscribe(({depth:P,rotateX:_,rotateY:D})=>{let N=P+b;A.style.transform=`translate3D(0,0,${N}px) rotateX(${_}deg) rotateY(${D}deg)`}),$=M.onComplete(({depth:P,rotateX:_,rotateY:D})=>{let N=P+b;A.style.transform=`translateZ(${N}px) rotateX(${_}deg) rotateY(${D}deg)`}),k=b;return A.style.transform=`translateZ(${k}px)`,()=>{O(),$(),M.destroy(),M=null}}),g`<div
        class="c-move3d-item ${x} anchor-${n}"
        style="${S}${I}${C}${w}"
    >
        <div class="${y}"></div>
        ${kN({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var jx=m.createComponent({tag:"move-3d-item",component:Wx,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Zn=m.createComponent({tag:"move-3d",component:Bx,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[jx]});var zx=m.createComponent({tag:"move-3d-page",component:Lx,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Zn]});m.useComponent([zx,$x]);var Hx=async({props:e})=>{let{data:t,drag:r,prevRoute:o,nextRoute:n}=e,{data:s}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="l-background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:t,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=Fx({ratio:1980}),Ux=[{props:{id:0,depth:0,anchorPoint:"center",classList:"c-move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"c-move3d-square has-star",component:{tagName:"svg-star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"c-move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"c-move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"c-move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"c-move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"c-move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"c-move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"c-move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"c-move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"c-move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"c-move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"c-move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"c-move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"c-move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"c-move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"c-move3d-square is-small u-bg-white",animate:!0},children:[]}]}]}];var Gx={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:Ux,drag:!0}};var qx=({getState:e})=>{let{content:t}=e();return g`${t}`};var es=m.createComponent({tag:"any-component",component:qx,props:{content:()=>({value:"",type:String})}});var Jx=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,b=d-n,y=f-s;if(Math.hypot(y,b)>10){n=d,s=f;let S=Math.atan2(b,y)*t+180+90-i;for(;S>180;)S-=360;for(;S<-180;)S+=360;i+=S,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var ON=5,Yx=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=Gn(),n=[...Array.from({length:ON}).keys()].map(()=>`<span class='child' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=Jx({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Vc=m.createComponent({tag:"mouse-trail",component:Yx});var Xx=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:b,m3_b:y,m4_b:T,b1_stone:x,m1_stone:S})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:b}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:S}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:x}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var Kx=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await oe({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,b,y,T,x,S,I,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>bo({svg:e,id:w}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="l-background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:Xx({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:b,b3:y,b4:T,b5:x,sign:S,m1_b:a,m3_b:p,m4_b:f,b1_stone:I,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var Qx=()=>ue.mq("min","desktop"),Zx="#home",xp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(xp=m.getActiveParams(),Zx=e)});var e0=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=Qx(),e(()=>{let s=u.useResize(()=>{n.active=Qx()});return o(()=>n.active,i=>{i&&m.loadUrl({url:Zx,params:xp??{}})}),()=>{s(),xp=null}}),g`
        <a
            href="#home"
            class="link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var t0=m.createComponent({tag:"only-desktop-cta",component:e0,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([t0]);var r0=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div class="l-only-desktop">
            <div class="content">
                <div class="l-background-shape">${t}</div>
                <h1>MobProject v0.1</h1>
                <h2>ops...<br /></h2>
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
                <h3>My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="svg">${e}</div>
            </div>
        </div>
    `};var Cp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:e}),l=r?c:s,p=fo(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,b=window.innerHeight/20,T=go({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:b,gutter:1}).items,x=T.map(L=>({...L,scale:1,rotate:0})),S=({row:L,col:E})=>{let R=(f+1)*L;return x[R+E]},C={...S({row:1,col:1}),scale:1,rotate:0},M={...S({row:4,col:5}),scale:1,rotate:0},A=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),O=U.createTimeTween({data:C,duration:1e3,ease:"easeInOutBack"}),$=U.createSpring({data:M});x.forEach(L=>{A.subscribeCache(({scale:E,rotate:R})=>{L.rotate=R,L.scale=E})}),O.subscribe(L=>{C=L}),$.subscribe(L=>{M=L});let k=Re.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});k.goTo(A,{scale:.2,rotate:90},{duration:1e3});let P=Re.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});P.goTo(O,{x:S({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(O,{y:S({row:8,col:8}).y,rotate:180}).goTo($,{y:S({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(O,{x:S({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo($,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(O,{y:S({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo($,{rotate:0,y:S({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let _=()=>{if(!s)return;let L=e.width,E=e.height,R=r?c:s;if(R){r&&a?(a.width=L,a.height=E):R.reset(),x.forEach(({x:B,y:V,width:F,height:z,rotate:te,scale:ae,offsetXCenter:q,offsetYCenter:ne},re)=>{if(re===40){let Ne=Math.PI/180*C.rotate,Oe=Math.cos(Ne)*C.scale,Xe=Math.sin(Ne)*C.scale;R.setTransform(Oe,Xe,-Xe,Oe,Math.floor(C.offsetXCenter+C.x),Math.floor(C.offsetYCenter+C.y)),p?(R.beginPath(),R.roundRect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),C.height,150)):(R.beginPath(),R.rect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),Math.floor(C.height))),R.fillStyle="#000000",R.fill()}let ce=Math.PI/180*te,_e=Math.cos(ce)*ae,Ye=Math.sin(ce)*ae;R.setTransform(_e,Ye,-Ye,_e,Math.floor(q+B),Math.floor(ne+V));let Z=Math.round(-F/2),ye=Math.round(-z/2);p?(R.beginPath(),R.roundRect(Z,ye,F,z,150)):(R.beginPath(),R.rect(Z,ye,F,z)),R.fillStyle="rgba(238, 238, 238, 0.9)",R.fill()});{let B=Math.PI/180*M.rotate,V=Math.cos(B)*M.scale,F=Math.sin(B)*M.scale;R.setTransform(V,F,-F,V,Math.floor(M.offsetXCenter+M.x),Math.floor(M.offsetYCenter+M.y)),p?(R.beginPath(),R.roundRect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height),150)):(R.beginPath(),R.rect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height))),R.fillStyle="#a86464",R.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},D=()=>{_(),n&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let N=ee.watch("navigationIsOpen",u.useDebounce(L=>{if(L){P.pause(),k.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(P.resume(),k.resume(),n=!0,u.useFrame(()=>D()))},200)},200));return{destroy:()=>{N(),s=null,a=null,c=null,T=[],n=!1,A?.destroy?.(),O?.destroy?.(),$?.destroy?.(),P?.destroy?.(),k?.destroy?.(),x=null,C=null,M=null,o=null,A=null,O=null,$=null,P=null,k=null},play:()=>{P.play(),k.isActive()||k.play()},playReverse:()=>{P.playReverse(),k.isActive()||k.play()},playFromLabel:()=>{P.setTween("my-label",[O,$]).then(()=>{P.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),k.isActive()||k.play()},playFromLabelReverse:()=>{P.setTween("my-label",[O,$]).then(()=>{P.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),k.isActive()||k.play()},revertNext:()=>{P.reverseNext()},pause:()=>{P.pause(),k.pause()},resume:()=>{P.resume(),k.resume()},stop:()=>{P.stop(),k.stop()}}};function _N({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="controls-item">
                <button type="button" class="controls-button ${t}">
                    ${o}
                </button>
            </li>`}).join("")}var o0=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=Cp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=Cp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,b])=>{let{method:y}=b;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="controls-open"
                    ${i({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${n({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${i({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${_N({buttons:a.buttons})}
                </ul>

                <div class="l-background-shape">${a.background}</div>
                <div
                    class="canvas-container"
                    ${n({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var $N={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},n0=m.createComponent({tag:"async-timeline",component:o0,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:$N,type:"Any"})}});m.useComponent([n0]);var s0=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    `};var i0=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-center-inner-svg svg-animation-block-01",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var a0=async()=>{let{data:e}=await oe({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(b=>bo({svg:e,id:b}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="l-background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:i0({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var c0=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Qe.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new St({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"spring",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var l0=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=c0({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="screen" ${r("screen")}>
            <div class="scroller-element" ${r("scroller")}>
                <div class="layer">${s}</div>
                <div class="layer" ${r("layer02")}>${n}</div>
            </div>
        </div>
    </div>`};var u0=m.createComponent({tag:"mobbu-2025",component:l0,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([u0]);var p0=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>bo({svg:e,id:n}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="l-background-shape">${t}</div>
        <h3 class="title">Scroll or Drag</h3>
        <mobbu-2025
            ${Ma({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var m0="TOP-LEFT",h0="TOP-RIGHT",d0="BOTTOM-LEFT",f0="BOTTOM-RIGHT",g0="CENTER";var LN=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},b0=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],b=d.map(Z=>{let ye=window.innerWidth,Ne=window.innerHeight,Oe=Z.offsetWidth,Xe=Z.offsetHeight,$e=LN(Z),_r=s-s*Oe/(ye*h)-$e,Lt=s-s*Xe/(Ne*h)-$e;return Math.min(_r,Lt)}),y=()=>{d.forEach((Z,ye)=>{let Ne=S>b[ye];Z.classList.toggle("hide",Ne)})},T=0,x=0,S=0,I=0,C=0,w=r.offsetWidth,M=r.offsetHeight,A=t.offsetWidth,O=t.offsetHeight,$=(w-A)/2,k=(M-O)/2,P={x:0,y:0},_=!1,D=!1,N=30,L=()=>{if(i&&s>0){let Z=s/(s-S);$=(w-A/Z)/2,k=(M-O/Z)/2}else $=(w-A)/2,k=(M-O)/2};L();let E={xValue:0,yValue:0},R=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case m0:{E={xValue:$,yValue:k},x=w,T=M;break}case h0:{E={xValue:-$,yValue:k},x=-w,T=M;break}case d0:{E={xValue:$,yValue:-k},x=w,T=-M;break}case f0:{E={xValue:-$,yValue:-k},x=-w,T=-M;break}}let B=R.subscribe(({x:Z,y:ye,z:Ne})=>{r&&(r.style.transform=`translate3D(${Z}px, ${ye}px, ${Ne}px)`)});R.set({x:E.xValue,y:E.yValue}),[...t.querySelectorAll("a, button")].forEach(Z=>{Z.setAttribute("draggable","false"),Z.style.userSelect="none"});let F=({page:Z})=>{_=!0,D=!0,P={x:Z.x,y:Z.y}},z=({page:Z})=>{let{x:ye,y:Ne}=Z,{xgap:Oe,ygap:Xe}=_?D?(D=!1,{xgap:0,ygap:0}):{xgap:ye-I,ygap:Ne-C}:{xgap:0,ygap:0},$e=$>0?ue.clamp(x+Oe,-$,$):ue.clamp(x+Oe,$,-$),_r=k>0?ue.clamp(T+Xe,-k,k):ue.clamp(T+Xe,k,-k),Lt=_?$e:x,Y=_?_r:T,{xComputed:$r,yComputed:Ve}=_?{xComputed:Lt,yComputed:Y}:{xComputed:ye,yComputed:Ne};x=Lt,T=Y,I=ye,C=Ne,_&&(E={xValue:$r,yValue:Ve},R.goTo({x:$r,y:Ve}).catch(()=>{}))},te=u.useTouchStart(({page:Z,target:ye})=>{F({page:Z,target:ye})}),ae=u.useMouseDown(({page:Z,target:ye})=>{F({page:Z,target:ye})}),q=u.useTouchEnd(()=>{_=!1}),ne=u.useMouseUp(()=>{_=!1}),re=u.useMouseMove(({page:Z})=>{z({page:Z})}),ce=u.useTouchMove(({page:Z})=>{z({page:Z})});f&&f.addEventListener("click",Z=>{let{x:ye,y:Ne}=P,Oe=Math.abs(I-ye)>N,Xe=Math.abs(C-Ne)>N;(Oe||Xe)&&Z.preventDefault()},!1),i&&f&&f.addEventListener("wheel",Z=>{let{spinY:ye}=u.normalizeWheel(Z);S=ue.clamp(S+ye*p,a,c),L(),x=$>0?ue.clamp(x,-$,$):ue.clamp(x,$,-$),T=k>0?ue.clamp(T,-k,k):ue.clamp(T,k,-k),l({depth:S}),R.goTo({x,y:T,z:S}).catch(()=>{})},{passive:!0});let _e=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Ye=u.useResize(()=>{w=r.offsetWidth,M=r.offsetHeight,A=t.offsetWidth,O=t.offsetHeight,L()});return{destroy:()=>{B(),te(),q(),ae(),ne(),re(),ce(),Ye(),_e(),R.destroy(),R=null,f=null,d=null,t=null,r=null}}};var v0=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=b0({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="wrapper"
            ${t("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var y0=m.createComponent({tag:"c-dragger",component:v0,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:g0,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([y0,es]);var T0=!1,S0=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
        <div class="borders">
            <h3 class="title">Drag and zoom</h3>
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
        </div>
    `,o=g`<div class="child-container">
        <div class="child is-1"></div>
        <div class="child is-2"></div>
        <div class="child is-3"></div>
        <div class="child is-4"></div>
        <div class="child is-5"></div>
        <div class="child is-6"></div>
        <div class="child is-7"></div>
        <div class="child is-8"></div>
        <div class="child is-9"></div>
        <div class="child is-10"></div>
        <div class="child is-svg">${e}</div>
    </div>`;return g`<div class="l-dragger">
        <div class="l-background-shape">${t}</div>
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{T0&&console.log(n)},onDepthChange:({depth:n})=>{T0&&console.log(n)}})}
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
    </div>`};var x0=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>le(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let x=y.firstChild;h.subscribeCache(({angleInRadian:S,scale:I})=>{let C=a+c*S,w=C*Math.cos(S),M=C*Math.sin(S);y.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${M-p[T]}px)`,x&&(x.style.scale=`${I}`)})});let f=Re.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,x=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=x;S++){let I=i/x*S,C=a+c*I,w=y+C*Math.cos(I),M=T+C*Math.sin(I);S===0?o.moveTo(w,M):o.lineTo(w,M)}o.stroke()}let b=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),b(),o=null,h=null,f=null,e=null}}};var C0=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(t)/2-100,a=e.map(d=>le(d)/2);e.forEach((d,b)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,x=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[b]}px, ${x-a[b]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,b=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,b,Math.abs(i),0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var E0=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>le(d)/2),s=je(t)/2-100,i=le(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,b)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:x})=>{let S=T/c,I=2/(3-Math.cos(2*S)),C=I*Math.cos(S)*s,w=I*Math.sin(2*S)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${C-n[b]}px, ${w-n[b]}px)`,y&&(y.style.scale=`${x}`)})});let p=Re.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,b=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let x=T/y*2*Math.PI,S=2/(3-Math.cos(2*x)),I=S*Math.cos(x)*s,C=S*Math.sin(2*x)/2*i;T===0?o.moveTo(d+I,b+C):o.lineTo(d+I,b+C)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function DN(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var w0=(e,t)=>t===0?e:w0(t,e%t);function FN(e,t){let r=w0(e,t),o=t/r;return 2*Math.PI*o}var I0=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(t)-100)/2,p=n/s,h=FN(n,s),f=DN(l,p,h),d=i*(f/l),b=e.map(A=>le(A)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],x=0,S=0;for(;S<h&&h>0&&p>0;)S=(Math.PI/2+x*Math.PI)/p,S>=0&&T.push(S),x++;let I=0;T.forEach(A=>{let O=A/h*10,$=Math.abs((O-I)/2);I=O;let k=Math.max(0,O-$),P=O,_=Math.min(10,O+$);_>k&&(y.goTo({scale:0},{start:k,end:P,ease:"easeInQuad"}),y.goTo({scale:1},{start:P,end:_,ease:"easeOutQuad"}))}),e.forEach((A,O)=>{let $=A.firstChild;y.subscribeCache(({angleInRadian:k,scale:P})=>{let _=l*Math.cos(p*k),D=_*Math.cos(k),N=_*Math.sin(k);A.style.transform=`translate3D(0px,0px,0px) translate(${D-b[O]}px, ${N-b[O]}px)`,$&&($.style.scale=`${P}`)})});let C=Re.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function w(){if(!c||!r)return;let A=r.width/2,O=r.height/2,$=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let k=0;k<=$;k++){let P=h/$*k,_=l*Math.cos(p*P),D=A+_*Math.cos(P),N=O+_*Math.sin(P);k===0?c.moveTo(D,N):c.lineTo(D,N)}c.stroke()}let M=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,w()});return w(),{play:()=>{C.play()},resume:()=>{C.resume()},stop:()=>{C.pause()},destroy:()=>{C.stop(),y.destroy(),C.destroy(),M(),c=null,y=null,C=null,e=null}}};var M0=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=je(t)-200,s=le(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(b=>le(b)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((b,y)=>{let T=0,x=b.firstChild,S=-l[y]-n/2;p.subscribeCache(({x:I,scale:C})=>{let w=Math.sign(I-T)||1,M=Math.sin(I/a)*s*w;b.style.transform=`translate3D(0px,0px,0px) translate(${I+S}px, ${M-l[y]}px)`,x&&(x.style.scale=`${C}`),T=I})});let h=Re.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let b=r.width/2,y=r.height/2,T=200,x=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=x;S++){let{x:I,y:C}=(()=>{if(S<=T){let w=S/T*n,M=Math.sin(w/a)*s;return{x:w,y:M}}if(S>T){let M=(x-S)/T*n,A=Math.sin(M/a)*s*-1;return{x:M,y:A}}return{x:0,y:0}})();S===0?o.moveTo(b+I-n/2,y+C):o.lineTo(b+I-n/2,y+C)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var Ep={sin:M0,circle:C0,infinite:E0,archimede:x0,rosaDiGrandi:I0};var R0=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var N0=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,x)=>({size:c-l*x,opacity:1/x})),h=R0(),{destroy:f,play:d,stop:b,resume:y}=h;return s(({element:T})=>{let{target:x}=o(),{canvas:S}=r();u.useFrame(()=>{({destroy:f,play:d,stop:b,resume:y}=Ep[i.name]({targets:x,container:T,canvas:S},...i.args)),d()});let I=u.useResize(()=>{b(),f(),{destroy:f,play:d,stop:b,resume:y}=Ep[i.name]({targets:x,container:T,canvas:S},...i.args),d()});return()=>{f(),I(),f=null,d=null,b=null,y=null}}),g`<div class="c-math">
        <canvas ${t("canvas")}></canvas>
        <div class="nav ${a}">
            <button
                type="button"
                class="play"
                ${n({click:()=>{y()}})}
            ></button>
            <button
                type="button"
                class="stop"
                ${n({click:()=>{b()}})}
            ></button>
        </div>
        <div class="trails">
            ${p.map(({size:T,opacity:x})=>g`<span
                        class="trail-item"
                        ${t("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${x}"
                        ><span class="trail-item-inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Wc=m.createComponent({tag:"math-animation",component:N0,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Wc]);var P0=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                `).join("")}
    </div>`};var BN=({proxi:e,delegateEvents:t,bindObject:r})=>g`
        <li class="controls-item">
            <span for="numerators" class="controls-label">
                ${r`numerators: <strong>${()=>e.numeratorsLabel}</strong>`}
            </span>
            <div class="controls-range">
                <input
                    id="numerators"
                    type="range"
                    class="controls-input"
                    min="0"
                    max="10"
                    value="${e.numerators}"
                    step="1"
                    ${t({input:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numeratorsLabel=Number(s)},change:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numerators=Number(s)}})}
                />
            </div>
        </li>
        <li class="controls-item">
            <span for="denominator" class="controls-label">
                ${r`denominator: <strong>${()=>e.denominatorLabel}</strong>`}
            </span>
            <div class="controls-range">
                <input
                    type="range"
                    id="denominator"
                    class="controls-input"
                    min="0"
                    max="10"
                    value="${e.denominator}"
                    step="1"
                    ${t({input:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominatorLabel=Number(s)},change:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominator=Number(s)}})}
                />
            </div>
        </li>
    `,k0=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
        <button
            type="button"
            class="controls-open"
            ${t({click:()=>{a.controlsActive=!0}})}
        >
            show controls
        </button>
        <ul
            class="controls"
            ${o({toggleClass:{active:()=>a.controlsActive}})}
        >
            <button
                type="button"
                class="controls-close"
                ${t({click:()=>{a.controlsActive=!1}})}
            ></button>
            ${BN({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="animation-container">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var A0=m.createComponent({tag:"rosa-di-grandi-page",component:k0,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Wc]});m.useComponent([A0]);var O0=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var Ip="home",zc="about",Q="template-mobJs-component",ke="template-doc-default",ts="template-listing",lt="template-animation",vt="template-test",Hc=new Set([Q,ke]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Ze=[{url:"./#mobJs-overview",title:"mobJs"}],wp=[{url:"./#mobCore-overview",title:"mobCore"}],cr=[{url:"./#mobMotion-overview",title:"mobMotion"}],jc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],qt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Uc=[{hash:"pageNotFound",layout:Hy,props:{}},{hash:"onlyDesktop",layout:r0,props:{}},{hash:"about",layout:ZT,templateName:zc,props:{}},{hash:"canvas-overview",layout:pc,templateName:ts,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:SS,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:ES,templateName:lt,props:{}},{hash:"caterpillarN1",layout:RS,templateName:lt,props:{}},{hash:"caterpillarN2",layout:AS,templateName:lt,props:{}},{hash:"async-timeline",layout:s0,templateName:lt,props:{}},{hash:"scrollerN0",layout:LS,templateName:lt,props:{}},{hash:"scrollerN1",layout:VS,templateName:lt,props:{}},{hash:"dynamic-list",layout:nx,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Ze,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:Sx,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ze,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:xx,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ze,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:cx,templateName:Ip,props:{}},{hash:"mobCore-overview",layout:Be,skipTransition:!0,templateName:ke,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:jc}},{hash:"mobCore-defaults",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:wp,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-events",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:wp,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-store",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:wp,section:"mobCore",rightSidebar:jc}},{hash:"mobJs-overview",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Ze,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Ze,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Ze,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-defaults",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-utils",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-overview",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-parallax",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sequencer",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-scrolltrigger",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sync-timeline",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-create-stagger",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-async-timeline",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-tween-spring-lerp",layout:Be,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"horizontalScroller",layout:Ox,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:Hx,props:Gx.shape1},{hash:"plugin-dragger",layout:S0,templateName:lt,props:{}},{hash:"math-animation-01",layout:P0,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:O0,templateName:lt,props:{}},{hash:"plugin-overview",layout:pc,templateName:ts,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:pc,templateName:ts,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:Kx,templateName:lt,props:{}},{hash:"mob-02",layout:p0,templateName:lt,props:{}},{hash:"rdp-01",layout:a0,templateName:lt,props:{}}];var _0=0;m.beforeRouteChange(()=>{_0=window.scrollY});var VN=new Set([Q,ke,ts,zc,vt]),WN=new Set([Q,ke,ts,zc,Ip,vt]),$0=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=VN.has(t)?"var(--header-height)":"0",e.style.left=WN.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${_0}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},L0=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Re.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var D0=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},F0=()=>{D0(),u.useResize(()=>{D0()})};var rs="reset",lr="tree",Ti="filter_component";var ur=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new St({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(t),s=le(e),i=je(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var os=u.createStore({currentId:()=>({value:"",type:String})});var B0=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",V0=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),jN=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),zN=e=>e?e.map(t=>`${t}, `).join(""):"",W0=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),HN=({getState:e})=>{let{id:t}=e();if(t===rs)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${B0(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${V0(r.methods)}</div>
        <div><strong>refs:</strong>: ${V0(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="section-title">Children:</h3>
        <div>${jN(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${B0(r?.repeaterInnerWrap?.classList)}
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
        <h3 class="section-title">State:</h3>
        <div>
            <strong>Freezed prop:</strong>
            ${zN(r?.freezedPros)}
        </div>
        <div>
            <h4 class="section-subtitle">States current values:</h4>
            ${W0(r.state.get())}
        </div>
        <div>
            <h4 class="section-subtitle">States current validation:</h4>
            ${W0(r.state.getValidation())}
        </div>
    </div>`:"component not found"},UN=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},j0=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,os.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:b}=UN({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),b(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${n("scrollbar")}
            class="scrollbar"
        />
        <div class="debug-container" ${n("scroller")}>
            ${o({observe:()=>l.id,render:()=>HN({getState:r})})}
        </div>
    </div>`};var z0=m.createComponent({tag:"debug-component",component:j0,state:{id:()=>({value:rs,type:String,skipEqual:!1})}});var H0=e=>{m.useMethodByName(yc)?.refreshList?.({testString:e})};var Mp=async(e="")=>{await m.tick(),H0(e)},U0=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(Mp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="title">Filter by tag</span>
        <input
            type="text"
            value=""
            name="debug-filter"
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;Mp(s)}}})}
        />
        <button
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;Mp(s)}})}
        >
            find
        </button>
    </div>`);var G0=m.createComponent({tag:"debug-filter-head",component:U0});var GN=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},q0=e=>`~${e}`,qN=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${q0(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${q0(c)}`,`<span class="u-match-string">${a}</span>`),s)})(),name:n}))},J0=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},b=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=qN({testString:y}),await m.tick(),d?.(),b?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:b}=await GN({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},b=()=>{},f=()=>{}}}),g`
        <div class="c-debug-filter-list">
            <div class="list" ${t("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${t("scrollbar")}
                    class="scrollbar"
                />
                <span
                    class="status"
                    ${a({toggleClass:{visible:()=>p.isLoading}})}
                    >Generate list</span
                >
                <span
                    class="status"
                    ${a({toggleClass:{visible:()=>p.noResult}})}
                    >no result</span
                >
                <div class="scrollable-element" ${t("scroller")}>
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
    `};var pr=e=>{m.useMethodByName(li)?.updateId(e)},Y0=()=>{m.useMethodByName(li)?.refreshId()};var X0=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
        <div class="c-debug-filter-list-item">
            <span class="id">${s.id}</span> |
            <span class="tag">${t`${"tag"}`}</span> |
            <span class="name">${s.name}</span>
            <button
                type="button"
                class="expand"
                ${e({click:()=>{pr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var K0=m.createComponent({tag:"debug-filter-list-item",component:X0,bindStore:os,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Q0=m.createComponent({tag:"debug-filter-list",component:J0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[K0]});var Z0=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
        <div class="general">
            ${e({observe:()=>r.active,render:()=>r.active?g`
                        <div>
                            <strong> Debug activated: </strong>
                            ${m.getDebugMode()}
                        </div>
                        <div>
                            <strong>Number of component</strong>:
                            ${m.componentMap.size} ( excluded generated
                            debug )
                        </div>
                        <div>
                            <strong>Active repeater: </strong>:
                            ${m.getNumberOfActiveRepeater()}
                        </div>
                        <div>
                            <strong>Active invalidate: </strong>:
                            ${m.getNumberOfActiveInvalidate()}
                        </div>
                    `:""})}
        </div>
        <div class="search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`};var eC=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="label">
                <strong>Search by ID:</strong>
            </span>
            <input
                type="text"
                name="id"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;pr(n??"")}}})}
            />
            <button
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;pr(n??"")}})}
            >
                find
            </button>
        </div>
        <div>
            <span class="label">
                <strong>Search by InstanceName:</strong>
            </span>
            <input
                type="text"
                ${e("instance_input")}
                name="instance"
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);pr(s??"")}}})}
            />
            <button
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);pr(s??"")}})}
            >
                find
            </button>
            <div>
                <span class="label">
                    <strong>Clear:</strong>
                </span>
                <button
                    type="button"
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",pr(rs)}})}
                >
                    clear
                </button>
            </div>
            <div>
                <span class="label">
                    <strong>Refresh:</strong>
                </span>
                <button
                    type="button"
                    ${r({click:()=>{Y0()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var tC=m.createComponent({tag:"debug-search",component:eC});var rC=m.createComponent({tag:"debug-head",component:Z0,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[tC]});var Gc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",Sn),console.log("currentListValueMap",ws),console.log("activeRepeatMap",En),console.log("onMountCallbackMap",Ms),console.log("staticPropsMap",wn),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",qr.size),console.log("invalidateIdsMap",rt),console.log("invalidateInstancesMap",Te),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",ot),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",ld()),console.log("slotPlaceholderSize",ea()),console.log("bindTextPlaceholderMapSize",$d()),console.log("instanceMap",jr)};var oC=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=lr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <button
            type="button"
            class="close"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <div class="grid">
            <button
                type="button"
                class="log"
                ${e({click:()=>{Gc()}})}
            >
                console log
            </button>

            <div class="header">
                <debug-head
                    ${r(()=>({active:a.active}))}
                ></debug-head>
            </div>
            <div class="list">
                <div class="list-header">
                    <div>
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`<div class="list-title">
                                        Tree structure
                                    </div>`:a.listType===Ti&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div>
                        <button
                            type="button"
                            class="list-toggle"
                            ${e({click:()=>{a.listType=lr}})}
                            ${n({toggleClass:{active:()=>a.listType===lr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="list-toggle"
                            ${e({click:()=>{a.listType=Ti}})}
                            ${n({toggleClass:{active:()=>a.listType===Ti}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`
                                    <debug-tree
                                        name="${Sc}"
                                    ></debug-tree>
                                `:a.listType===Ti&&a.active?g`
                                    <debug-filter-list
                                        name="${yc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="single-component">
                <debug-component name="${li}"></debug-component>
            </div>
        </div>
    </div>`};var qc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var JN=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},nC=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await JN({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
        <div class="c-debug-tree">
            <div class="tree-list" ${o("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${o("scrollbar")}
                    class="scrollbar"
                />
                <span
                    class="status"
                    ${i({toggleClass:{visible:()=>c.isLoading}})}
                    >Generate tree</span
                >
                <div class="scollable-element" ${o("scroller")}>
                    ${t({observe:()=>c.data,render:()=>qc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var sC=()=>{m.useMethodByName(Sc)?.refresh()};var YN=e=>e>0?`( ${e} ) `:"",iC=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>iC({id:i,value:t}))},aC=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>iC({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=Ar.subscribe(h);return Ar.reset(h),s(()=>l.isOpen,async d=>{await Ar[d?"down":"up"](h),sC()}),()=>{f()}}),g`<div class="c-debug-tree-item">
        <div
            class="tree-header ${p}"
            ${n({click:()=>{l.isOpen=!l.isOpen}})}
            ${i([{toggleClass:{open:()=>l.isOpen}},{toggleClass:{"has-children-selected":()=>l.hasActiveChildren}}])}
        >
            <span class="tree-id">${l.id}</span> |
            <span class="tree-component">${l.componentName}</span> |
            <span class="tree-instance">${l.instanceName}</span>
            <span>${YN(l.children.length)}</span>
            <button
                type="button"
                class="tree-expand"
                ${n({click:()=>{pr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="tree-selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="tree-content" ${o("content")}>
            ${qc({data:l.children,staticProps:t})}
        </div>
    </div>`};var cC=m.createComponent({tag:"debug-tree-item",component:aC,bindStore:os,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var lC=m.createComponent({tag:"debug-tree",component:nC,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[cC]});var uC=m.createComponent({tag:"debug-overlay",component:oC,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:lr,type:String})},child:[lC,z0,rC,G0,Q0]});var Rp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{},XN=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="label">${n}</p>`:g`<li>
                      <sidebar-links-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></sidebar-links-button>
                  </li>`}).join(""),pC=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=ar(),l=a(),p={[Q]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),b=!1;d.addEventListener("input",()=>{Yc?.(d.value)}),ee.watch("navigationIsOpen",T=>{let{templateName:x}=m.getActiveRoute();x in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:x})=>{let S=p?.[T]??[];if(l.data=S,await m.tick(),l.activeSection=x,S.length>0){if(l.hide=!1,b){Xc();return}({init:Rp,destroy:Jc,move:Yc,updateScroller:Xc}=ur({screen:h,scroller:f,scrollbar:d})),b=!0,Rp(),Xc(),Yc(0)}S.length===0&&(l.hide=!0,Jc?.(),b=!1)});return()=>{Jc?.(),y(),Rp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{}}}),g`<div
        class="c-sidebar-links"
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
            class="scrollbar hide-scrollbar"
        />
        <ul ${t("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>XN({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var mC=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var hC=m.createComponent({tag:"sidebar-links-button",component:mC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var dC=m.createComponent({tag:"side-bar-links",component:pC,child:[hC],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var fC=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:b}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,b.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,b=null}}),g`<div
        class="c-quick-nav-container"
        ${t([{toggleClass:{active:()=>a.active}}])}
    >
        <a
            class="c-quick-nav is-prev"
            ${o("previous")}
            ${t({toggleClass:{"is-disable":()=>!a.prevRoute},toggleAttribute:{href:()=>{let l=a.prevRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav is-back"
            ${o("back")}
            ${t({toggleClass:{"is-disable":()=>!a.backRoute},toggleAttribute:{href:()=>{let l=a.backRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav is-next"
            ${o("next")}
            ${t({toggleClass:{"is-disable":()=>!a.nextRoute},toggleAttribute:{href:()=>{let l=a.nextRoute;return l&&l.length>0?l:null}}})}
        >
        </a>
        <div class="quick-nav-labels">
            <div class="labels" ${o("labels")}>
                <div class="labels-container" ${o("labelList")}>
                    <span>previous item</span>
                    <span>all items</span>
                    <span>next item</span>
                </div>
            </div>
        </div>
    </div>`};var gC=m.createComponent({tag:"quick-nav",component:fC,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var KN=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="item">
                    <a
                        href="${o}"
                        class="link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),bC=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Hc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="left-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="title">Sections:</div>
        <ul class="list">
            ${t({observe:()=>s.data,render:()=>KN({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var vC=m.createComponent({tag:"left-sidebar",component:bC,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var yC=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        ></div>
    `};var TC=m.createComponent({tag:"route-loader",component:yC,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var SC=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var xC=m.createComponent({tag:"scroll-down-label",component:SC,state:{active:()=>({value:!1,type:Boolean})}});var CC=()=>{m.useMethodByName(Ho)?.setInputFocus()},Np=e=>{m.useMethodByName(Ho)?.updateCurrentSearchFromSuggestion(e)},EC=e=>{m.useMethodByName(Ho)?.shouldCloseSuggestion(e)},Kc=()=>{m.useMethodByName(Ho)?.closeSuggestion()};var wC=({proxi:e})=>{e.active=!1,Kc()},QN=({target:e})=>{e&&EC(e)},IC=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="c-search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="background"
            type="button"
            ${t({click:()=>{wC({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="close-button"
            ${t({click:()=>{wC({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="grid"
            ${t({click:a=>{QN({target:a.target})}})}
        >
            <!-- Title -->
            <h2 class="title">Search</h2>

            <!-- Header -->
            <div class="header">
                <search-overlay-header
                    name="${Ho}"
                ></search-overlay-header>
            </div>
            <div class="result-query">
                <p>
                    ${n`search for: <strong>${()=>i.currentSearch}</strong>`}
                </p>
            </div>

            <!-- List -->
            <div class="content">
                <search-overlay-list
                    ${s({updatePrentSearchKey:a=>{i.currentSearch=a}})}
                    name="${di}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var MC=e=>{m.useMethodByName(di)?.update(e)},RC=()=>{m.useMethodByName(di)?.reset()};var ZN=async({currentSearch:e})=>{MC(e)},Pp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;ZN({currentSearch:r})},NC=({getRef:e,proxi:t})=>{RC();let{search_input:r}=e();r.value="",t.suggestionListData=[]},PC=e=>`~${e}`,eP=({currentSearch:e,proxi:t})=>{let o=ar().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${PC(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${PC(p)}`,`<span class="u-match-string">${l}</span>`),a)})()}))},kC=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let b=p.value.split(" "),y=b.length===0?f:`${b.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="c-search-header">
        <div class="search-wrap">
            <input
                type="text"
                class="serach-input"
                name="search_input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Pp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;eP({currentSearch:h,proxi:l})},60)})}
            />
            <div
                class="suggestion-wrap"
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
            class="search-button"
            ${e({click:()=>{Pp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Pp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-button"
            ${e({click:()=>{NC({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&NC({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var AC=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
        <div class="c-search-suggestion">
            <ul class="list">
                ${t({observe:()=>o.list,key:"word",render:({current:n})=>g`
                            <search-overlay-suggestion-item
                                ${r(()=>({word:n.value.word,wordHiglight:n.value.wordHiglight}))}
                            >
                            </search-overlay-suggestion-item>
                        `})}
            </ul>
        </div>
    </div>`};var tP=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){Np(t);return}if(e.toLowerCase()==="escape"){Kc();return}},OC=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li>
            <button
                type="button"
                class="button"
                ${t({click:()=>{Np(o.word)},keydown:n=>{n.preventDefault(),tP({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var _C=m.createComponent({tag:"search-overlay-suggestion-item",component:OC,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var $C=m.createComponent({tag:"search-overlay-suggestion",component:AC,props:{list:()=>({value:[],type:Array})},child:[_C]});var LC=m.createComponent({tag:"search-overlay-header",component:kC,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[$C]});var rP=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},oP=new Set(["mob-title","mob-paragraph","mob-list"]),nP=new Set(["mob-title","mob-paragraph"]),sP=new Set(["mob-list"]),DC=async({currentSearch:e=""})=>{let t=Uc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:rP({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let b=a.reduce((y,T)=>{if(!T)return y;let{component:x}=T;return x?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>oP.has(y)).flatMap(y=>nP.has(y?.component)?y.content:sP.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:b}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((b,y,T)=>{let x=T>0?"/":"";return`${b}${x}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var iP=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},FC=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await DC({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:b,refresh:y}=iP({getRef:o});return h=b,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="c-search-list" ${r("screen")}>
        <span
            class="loader"
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
            class="scrollbar"
        />

        <!-- no result -->
        <div>
            ${c({observe:()=>p.noResult,render:()=>p.noResult?g`
                              <ul>
                                  <li>
                                      <div class="section">
                                          <p><strong>no result</strong></p>
                                      </div>
                                  </li>
                              </ul>
                          `:""})}
        </div>

        <!-- result list -->
        <ul ${r("scroller")}>
            ${t({observe:()=>p.list,render:({current:f})=>g`
                        <search-overlay-list-item
                            ${l(()=>({active:p.activeRoute.route===f.value.uri,uri:f.value.uri,breadCrumbs:f.value.breadCrumbs,count:f.value.count,title:f.value.title}))}
                        >
                        </search-overlay-list-item>
                    `})}
        </ul>
    </div>`};var Qc=()=>{m.useMethodByName(Cc)?.toggle()};var aP=({uri:e})=>{m.loadUrl({url:e}),Qc()},BC=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                ${r({click:()=>{aP({uri:n.uri})}})}
            >
                <div class="item-section">
                    <p>
                        ${o`<strong>${()=>n.breadCrumbs}</strong> (${()=>n.count})`}
                    </p>
                </div>
                <h6>${o`${()=>n.title}`}</h6>
            </button>
        </li>
    `};var VC=m.createComponent({tag:"search-overlay-list-item",component:BC,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var WC=m.createComponent({tag:"search-overlay-list",component:FC,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[VC]});var jC=m.createComponent({tag:"search-overlay",component:IC,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[LC,WC]});var zC=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var HC=m.createComponent({tag:"test-scss-grid",component:zC});var vo=()=>{let{templateName:e}=m.getActiveRoute();return Hc.has(e)?0:40};var UC=()=>{m.useMethodByName(Tc)?.toggle()};var cP=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],lP=()=>g`
        <ul class="bio-cell">
            ${cP.map(e=>g` <li class="bio-item">${e}</li> `).join("")}
        </ul>
    `,GC=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="js-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="grid">
                ${lP()}
                <div class="debug-cell">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{UC()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Gc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var qC=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var JC=m.createComponent({tag:"debug-button",component:qC});var YC=m.createComponent({tag:"mob-footer",component:GC,child:[JC],state:{isMounted:()=>({value:!1,type:Boolean})}});var Zc=()=>{m.useMethodByName(hi)?.scrollTop()},el=()=>{m.useMethodByName(hi)?.refresh()};var ns=({fireCallback:e=!0}={})=>{m.useMethodByName(xc)?.closeAllAccordion({fireCallback:e})};function uP(){m.loadUrl({url:"home"}),ns(),ee.set("navigationIsOpen",!1),Zc()}var XC=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
        <header
            class="js-header"
            ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            <div class="grid">
                <div class="toggle-cell">
                    <mob-header-toggle></mob-header-toggle>
                </div>
                <button
                    class="logo-cell"
                    type="button"
                    ${e({click:()=>{uP()}})}
                >
                    <div class="u-has-overflow">
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
                <div class="menu-cell">
                    <header-main-menu></header-main-menu>
                </div>
                <div
                    class="utils-cell"
                    ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                >
                    <mob-header-utils></mob-header-utils>
                </div>
            </div>
        </header>
    `};var KC=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <button
            class="c-hamburger"
            type="button"
            ${e({click:()=>{ee.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ut()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="wrapper">
                <div class="lines"></div>
            </div>
        </button>
    `};var QC=m.createComponent({tag:"mob-header-toggle",component:KC,bindStore:ee,state:{isMounted:()=>({value:!1,type:Boolean})}});var pP=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),ee.set("navigationIsOpen",!1)};function mP({delegateEvents:e}){let t=ar().header,{links:r}=t,o={github:Gn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li>
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              ${e({click:c=>{pP({event:c})}})}
                          >
                              ${o[s]}
                          </button>
                      `:g`
                          <a href="${i}" target="_blank"> ${o[s]} </a>
                      `}
            </li>`}).join("")}var ZC=({delegateEvents:e})=>g`
        <ul class="l-header-utils">
            <li>
                <search-cta></search-cta>
            </li>
            ${mP({delegateEvents:e})}
        </ul>
    `;var hP=()=>{Qc(),CC()},eE=({delegateEvents:e})=>{let t=Gn().searchIcons;return g`<button
        type="button"
        class="c-search-cta"
        ${e({click:()=>{hP()}})}
    >
        ${t}
    </button>`};var tE=m.createComponent({tag:"search-cta",component:eE});var rE=m.createComponent({tag:"mob-header-utils",component:ZC,child:[tE]});var dP=({delegateEvents:e,staticProps:t})=>ar().footer.nav.map(({label:o,url:n,section:s})=>g`<li>
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),ee.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),oE=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="l-header-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${dP({delegateEvents:e,staticProps:t})}
        </ul>
    `};var nE=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var sE=m.createComponent({tag:"header-main-menu-button",component:nE,bindStore:ee,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var iE=m.createComponent({tag:"header-main-menu",component:oE,child:[sE],state:{isMounted:()=>({value:!1,type:Boolean})}});var aE=m.createComponent({tag:"mob-header",component:XC,state:{isMounted:()=>({value:!1,type:Boolean})},child:[iE,rE,QC]});var kp=0,cE=({root:e})=>{let t=e.querySelector(".js-nav-col"),r=e.querySelector(".js-nav-scroll"),o=e.querySelector(".js-nav-percent"),n=200,s=new St({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=ee.get();a&&(kp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${kp})`)}});return s.init(),ee.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".js-header"),l=document.querySelector(".js-footer"),p=le(r),h=le(c),f=le(l),b=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{ee.getProp("navigationIsOpen")||s.set(b)},400)}),ee.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${kp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function fP({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function gP({main:e,proxi:t}){el(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function bP({main:e}){e.addEventListener("click",()=>{ee.set("navigationIsOpen",!1),Ut()})}var vP=()=>{Zc(),ns();let{navigationIsOpen:e}=ee.get();e||kr.to(0)},lE=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");ee.watch("navigationIsOpen",p=>{if(p&&a){gP({main:a,proxi:s});return}fP({main:a,proxi:s})}),bP({main:a});let{scrollNativationToTop:c,refreshScroller:l}=cE({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
        <div
            class="l-navcontainer"
            ${o({toggleClass:{active:()=>s.isOpen}})}
        >
            <div class="nav-col js-nav-col">
                <div class="scroll-element js-nav-scroll">
                    <mob-navigation
                        name="${xc}"
                    ></mob-navigation>
                </div>
            </div>
            <div
                class="side-col js-side-col"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                <div class="percent js-nav-percent"></div>
                <button
                    class="totop"
                    ${r({click:()=>{vP()}})}
                ></button>
            </div>
        </div>
    `};function yP({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:b}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:h,hide:!!b})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:y=!1})=>{if(y){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li>
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var uE=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=ar();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="list">
                ${yP({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var pE=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var mE=m.createComponent({tag:"mob-navigation-label",component:pE,bindStore:ee,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function TP({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="submenu-item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"is-submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var hE=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return Ar.subscribe(h),Ar.reset(h),o(()=>a.isOpen,async f=>{await Ar[f?"down":"up"](h),el(),!f&&ns({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li>
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"has-arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="submenu" ${n("content")}>
                ${TP({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var dE=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),x=h===-1||T?.activeId===`${h}`,S=d===y&&x,I=f.includes(d);o.isCurrent=S||I,S&&c&&(l(),ee.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="link ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),ee.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var tl=m.createComponent({tag:"mob-navigation-button",component:dE,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var fE=m.createComponent({tag:"mob-navigation-submenu",component:hE,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[tl]});var gE=m.createComponent({tag:"mob-navigation",component:uE,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[mE,fE,tl]});var bE=m.createComponent({tag:"mob-navigation-container",component:lE,child:[gE],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([aE,bE,YC,gC,TC,xC,dC,uC,HC,jC,vC]);var vE=async()=>g`
        ${""}
        <debug-overlay name="${Tc}"></debug-overlay>
        <mob-header name="${IT}"></mob-header>
        <mob-navigation-container
            name="${hi}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ui}"></quick-nav>
        <route-loader name="${wc}"></route-loader>
        <scroll-down-label name="${pi}"></scroll-down-label>
        <side-bar-links></side-bar-links>
        <left-sidebar name="${Ec}"></left-sidebar>
        <search-overlay name="${Cc}"></search-overlay>
    `;var Ap=0,Op=document.querySelector(".js-main-loader-track"),yE=(e=60)=>{let t=()=>{if(Ap++,!Op)return;let r=100*Ap/e;if(Op.style.transform=`scaleX(${r/100})`,Ap>=e){Op=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var TE=e=>{m.useMethodByName(wc).skip(e)};var SE=60,xE=()=>ue.mq("max","desktop"),SP=()=>{u.useResize(()=>{xE()&&m.loadUrl({url:"onlyDesktop"})})},ol=document.body.querySelector(".js-main-loader"),nl=document.body.querySelector(".js-main-loader-background"),rl=U.createTimeTween({data:{opacity:1},duration:1e3});ol&&nl&&[ol,nl].forEach(e=>{rl?.subscribe(({opacity:t})=>{e.style.opacity=t})});var xP=async()=>{await jy(),await zy(),yE(SE),await u.useFps({duration:SE,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:vE,routes:Uc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:$0,pageTransition:L0,afterInit:async()=>{await rl.goTo({opacity:0}),rl.destroy(),rl=null,ol?.remove(),nl?.remove(),ol=null,nl=null,F0(),SP(),TE(!1)},redirect:({route:e})=>xE()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Fy(),ue.setDefault({deferredNextTick:!0,throttle:100}),xP(),Dy()});})();
//# sourceMappingURL=main.js.map
