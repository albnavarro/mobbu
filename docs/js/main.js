"use strict";(()=>{var TC=Object.create;var Wc=Object.defineProperty;var _C=Object.getOwnPropertyDescriptor;var SC=Object.getOwnPropertyNames;var xC=Object.getPrototypeOf,CC=Object.prototype.hasOwnProperty;var EC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var r in t)Wc(e,r,{get:t[r],enumerable:!0})},wC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of SC(t))!CC.call(e,n)&&n!==r&&Wc(e,n,{get:()=>t[n],enumerable:!(o=_C(t,n))||o.enumerable});return e};var IC=(e,t,r)=>(r=e!=null?TC(xC(e)):{},wC(t||!e||!e.__esModule?Wc(r,"default",{value:e,enumerable:!0}):r,e));var tT=EC((SJ,eT)=>{function jv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&jv(r)}),e}var Ka=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function zv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ho(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var AI="</span>",Lv=e=>!!e.scope,OI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Bu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=zv(t)}openNode(t){if(!Lv(t))return;let r=OI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Lv(t)&&(this.buffer+=AI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Dv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Vu=class e{constructor(){this.rootNode=Dv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Dv({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Wu=class extends Vu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Bu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Us(e){return e?typeof e=="string"?e:e.source:null}function Hv(e){return Wo("(?=",e,")")}function $I(e){return Wo("(?:",e,")*")}function LI(e){return Wo("(?:",e,")?")}function Wo(...e){return e.map(r=>Us(r)).join("")}function DI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function zu(...e){return"("+(DI(e).capture?"":"?:")+e.map(o=>Us(o)).join("|")+")"}function Uv(e){return new RegExp(e.toString()+"|").exec("").length-1}function FI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var BI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Hu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Us(o),i="";for(;s.length>0;){let a=BI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var VI=/\b\B/,Gv="[a-zA-Z]\\w*",Uu="[a-zA-Z_]\\w*",qv="\\b\\d+(\\.\\d+)?",Jv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Yv="\\b(0b[01]+)",WI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Wo(t,/.*\b/,e.binary,/\b.*/)),ho({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Gs={begin:"\\\\[\\s\\S]",relevance:0},zI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Gs]},HI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Gs]},UI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Za=function(e,t,r={}){let o=ho({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=zu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Wo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},GI=Za("//","$"),qI=Za("/\\*","\\*/"),JI=Za("#","$"),YI={scope:"number",begin:qv,relevance:0},XI={scope:"number",begin:Jv,relevance:0},KI={scope:"number",begin:Yv,relevance:0},QI={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Gs,{begin:/\[/,end:/\]/,relevance:0,contains:[Gs]}]},ZI={scope:"title",begin:Gv,relevance:0},eM={scope:"title",begin:Uu,relevance:0},tM={begin:"\\.\\s*"+Uu,relevance:0},rM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Xa=Object.freeze({__proto__:null,APOS_STRING_MODE:zI,BACKSLASH_ESCAPE:Gs,BINARY_NUMBER_MODE:KI,BINARY_NUMBER_RE:Yv,COMMENT:Za,C_BLOCK_COMMENT_MODE:qI,C_LINE_COMMENT_MODE:GI,C_NUMBER_MODE:XI,C_NUMBER_RE:Jv,END_SAME_AS_BEGIN:rM,HASH_COMMENT_MODE:JI,IDENT_RE:Gv,MATCH_NOTHING_RE:VI,METHOD_GUARD:tM,NUMBER_MODE:YI,NUMBER_RE:qv,PHRASAL_WORDS_MODE:UI,QUOTE_STRING_MODE:HI,REGEXP_MODE:QI,RE_STARTERS_RE:WI,SHEBANG:jI,TITLE_MODE:ZI,UNDERSCORE_IDENT_RE:Uu,UNDERSCORE_TITLE_MODE:eM});function oM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function nM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function sM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=oM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function iM(e,t){Array.isArray(e.illegal)&&(e.illegal=zu(...e.illegal))}function aM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function cM(e,t){e.relevance===void 0&&(e.relevance=1)}var lM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Wo(r.beforeMatch,Hv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},uM=["of","and","for","in","not","or","if","then","parent","list","value"],pM="keyword";function Xv(e,t,r=pM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Xv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,mM(c[0],c[1])]})}}function mM(e,t){return t?Number(t):dM(e)?0:1}function dM(e){return uM.includes(e.toLowerCase())}var Fv={},Vo=e=>{console.error(e)},Bv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Hn=(e,t)=>{Fv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Fv[`${e}/${t}`]=!0)},Qa=new Error;function Kv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Uv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function hM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Vo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Qa;if(typeof e.beginScope!="object"||e.beginScope===null)throw Vo("beginScope must be object"),Qa;Kv(e,e.begin,{key:"beginScope"}),e.begin=Hu(e.begin,{joinWith:""})}}function fM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Vo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Qa;if(typeof e.endScope!="object"||e.endScope===null)throw Vo("endScope must be object"),Qa;Kv(e,e.end,{key:"endScope"}),e.end=Hu(e.end,{joinWith:""})}}function gM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function bM(e){gM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),hM(e),fM(e)}function yM(e){function t(i,a){return new RegExp(Us(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Uv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Hu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[nM,aM,bM,lM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[sM,iM,cM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Xv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Us(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return vM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ho(e.classNameAliases||{}),s(e)}function Qv(e){return e?e.endsWithParent||Qv(e.starts):!1}function vM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ho(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Qv(e)?ho(e,{starts:e.starts?ho(e.starts):null}):Object.isFrozen(e)?ho(e):e}var TM="11.11.1",ju=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Fu=zv,Vv=ho,Wv=Symbol("nomatch"),_M=7,Zv=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Wu};function c(E){return a.noHighlightRe.test(E)}function l(E){let R=E.className+" ";R+=E.parentNode?E.parentNode.className:"";let $=a.languageDetectRe.exec(R);if($){let B=A($[1]);return B||(Bv(s.replace("{}",$[1])),Bv("Falling back to no-highlight mode for this block.",E)),B?$[1]:"no-highlight"}return R.split(/\s+/).find(B=>c(B)||A(B))}function p(E,R,$){let B="",V="";typeof R=="object"?(B=E,$=R.ignoreIllegals,V=R.language):(Hn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Hn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=E,B=R),$===void 0&&($=!0);let q={code:B,language:V};D("before:highlight",q);let ee=q.result?q.result:d(q.language,q.code,$);return ee.code=q.code,D("after:highlight",ee),ee}function d(E,R,$,B){let V=Object.create(null);function q(W,U){return W.keywords[U]}function ee(){if(!X.keywords){je.addText(Ie);return}let W=0;X.keywordPatternRe.lastIndex=0;let U=X.keywordPatternRe.exec(Ie),ae="";for(;U;){ae+=Ie.substring(W,U.index);let Ce=Xe.case_insensitive?U[0].toLowerCase():U[0],tt=q(X,Ce);if(tt){let[fr,yC]=tt;if(je.addText(ae),ae="",V[Ce]=(V[Ce]||0)+1,V[Ce]<=_M&&(ii+=yC),fr.startsWith("_"))ae+=U[0];else{let vC=Xe.classNameAliases[fr]||fr;ye(U[0],vC)}}else ae+=U[0];W=X.keywordPatternRe.lastIndex,U=X.keywordPatternRe.exec(Ie)}ae+=Ie.substring(W),je.addText(ae)}function ue(){if(Ie==="")return;let W=null;if(typeof X.subLanguage=="string"){if(!t[X.subLanguage]){je.addText(Ie);return}W=d(X.subLanguage,Ie,!0,ns[X.subLanguage]),ns[X.subLanguage]=W._top}else W=h(Ie,X.subLanguage.length?X.subLanguage:null);X.relevance>0&&(ii+=W.relevance),je.__addSublanguage(W._emitter,W.language)}function re(){X.subLanguage!=null?ue():ee(),Ie=""}function ye(W,U){W!==""&&(je.startScope(U),je.addText(W),je.endScope())}function ve(W,U){let ae=1,Ce=U.length-1;for(;ae<=Ce;){if(!W._emit[ae]){ae++;continue}let tt=Xe.classNameAliases[W[ae]]||W[ae],fr=U[ae];tt?ye(fr,tt):(Ie=fr,ee(),Ie=""),ae++}}function ge(W,U){return W.scope&&typeof W.scope=="string"&&je.openNode(Xe.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ye(Ie,Xe.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Ie=""):W.beginScope._multi&&(ve(W.beginScope,U),Ie="")),X=Object.create(W,{parent:{value:X}}),X}function Ne(W,U,ae){let Ce=FI(W.endRe,ae);if(Ce){if(W["on:end"]){let tt=new Ka(W);W["on:end"](U,tt),tt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Ne(W.parent,U,ae)}function De(W){return X.matcher.regexIndex===0?(Ie+=W[0],1):(Vc=!0,0)}function J(W){let U=W[0],ae=W.rule,Ce=new Ka(ae),tt=[ae.__beforeBegin,ae["on:begin"]];for(let fr of tt)if(fr&&(fr(W,Ce),Ce.isMatchIgnored))return De(U);return ae.skip?Ie+=U:(ae.excludeBegin&&(Ie+=U),re(),!ae.returnBegin&&!ae.excludeBegin&&(Ie=U)),ge(ae,W),ae.returnBegin?0:U.length}function Te(W){let U=W[0],ae=R.substring(W.index),Ce=Ne(X,W,ae);if(!Ce)return Wv;let tt=X;X.endScope&&X.endScope._wrap?(re(),ye(U,X.endScope._wrap)):X.endScope&&X.endScope._multi?(re(),ve(X.endScope,W)):tt.skip?Ie+=U:(tt.returnEnd||tt.excludeEnd||(Ie+=U),re(),tt.excludeEnd&&(Ie=U));do X.scope&&je.closeNode(),!X.skip&&!X.subLanguage&&(ii+=X.relevance),X=X.parent;while(X!==Ce.parent);return Ce.starts&&ge(Ce.starts,W),tt.returnEnd?0:U.length}function Ue(){let W=[];for(let U=X;U!==Xe;U=U.parent)U.scope&&W.unshift(U.scope);W.forEach(U=>je.openNode(U))}let ut={};function St(W,U){let ae=U&&U[0];if(Ie+=W,ae==null)return re(),0;if(ut.type==="begin"&&U.type==="end"&&ut.index===U.index&&ae===""){if(Ie+=R.slice(U.index,U.index+1),!n){let Ce=new Error(`0 width match regex (${E})`);throw Ce.languageName=E,Ce.badRule=ut.rule,Ce}return 1}if(ut=U,U.type==="begin")return J(U);if(U.type==="illegal"&&!$){let Ce=new Error('Illegal lexeme "'+ae+'" for mode "'+(X.scope||"<unnamed>")+'"');throw Ce.mode=X,Ce}else if(U.type==="end"){let Ce=Te(U);if(Ce!==Wv)return Ce}if(U.type==="illegal"&&ae==="")return Ie+=`
`,1;if(Bc>1e5&&Bc>U.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Ie+=ae,ae.length}let Xe=A(E);if(!Xe)throw Vo(s.replace("{}",E)),new Error('Unknown language: "'+E+'"');let os=yM(Xe),Lr="",X=B||os,ns={},je=new a.__emitter(a);Ue();let Ie="",ii=0,vo=0,Bc=0,Vc=!1;try{if(Xe.__emitTokens)Xe.__emitTokens(R,je);else{for(X.matcher.considerAll();;){Bc++,Vc?Vc=!1:X.matcher.considerAll(),X.matcher.lastIndex=vo;let W=X.matcher.exec(R);if(!W)break;let U=R.substring(vo,W.index),ae=St(U,W);vo=W.index+ae}St(R.substring(vo))}return je.finalize(),Lr=je.toHTML(),{language:E,value:Lr,relevance:ii,illegal:!1,_emitter:je,_top:X}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:E,value:Fu(R),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:vo,context:R.slice(vo-100,vo+100),mode:W.mode,resultSoFar:Lr},_emitter:je};if(n)return{language:E,value:Fu(R),illegal:!1,relevance:0,errorRaised:W,_emitter:je,_top:X};throw W}}function f(E){let R={value:Fu(E),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return R._emitter.addText(E),R}function h(E,R){R=R||a.languages||Object.keys(t);let $=f(E),B=R.filter(A).filter(I).map(re=>d(re,E,!1));B.unshift($);let V=B.sort((re,ye)=>{if(re.relevance!==ye.relevance)return ye.relevance-re.relevance;if(re.language&&ye.language){if(A(re.language).supersetOf===ye.language)return 1;if(A(ye.language).supersetOf===re.language)return-1}return 0}),[q,ee]=V,ue=q;return ue.secondBest=ee,ue}function v(E,R,$){let B=R&&r[R]||$;E.classList.add("hljs"),E.classList.add(`language-${B}`)}function y(E){let R=null,$=l(E);if(c($))return;if(D("before:highlightElement",{el:E,language:$}),E.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",E);return}if(E.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(E)),a.throwUnescapedHTML))throw new ju("One of your code blocks includes unescaped HTML.",E.innerHTML);R=E;let B=R.textContent,V=$?p(B,{language:$,ignoreIllegals:!0}):h(B);E.innerHTML=V.value,E.dataset.highlighted="yes",v(E,$,V.language),E.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(E.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),D("after:highlightElement",{el:E,result:V,text:B})}function T(E){a=Vv(a,E)}let S=()=>{x(),Hn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),Hn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let M=!1;function x(){function E(){x()}if(document.readyState==="loading"){M||window.addEventListener("DOMContentLoaded",E,!1),M=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function C(E,R){let $=null;try{$=R(e)}catch(B){if(Vo("Language definition for '{}' could not be registered.".replace("{}",E)),n)Vo(B);else throw B;$=i}$.name||($.name=E),t[E]=$,$.rawDefinition=R.bind(null,e),$.aliases&&L($.aliases,{languageName:E})}function w(E){delete t[E];for(let R of Object.keys(r))r[R]===E&&delete r[R]}function O(){return Object.keys(t)}function A(E){return E=(E||"").toLowerCase(),t[E]||t[r[E]]}function L(E,{languageName:R}){typeof E=="string"&&(E=[E]),E.forEach($=>{r[$.toLowerCase()]=R})}function I(E){let R=A(E);return R&&!R.disableAutodetect}function N(E){E["before:highlightBlock"]&&!E["before:highlightElement"]&&(E["before:highlightElement"]=R=>{E["before:highlightBlock"](Object.assign({block:R.el},R))}),E["after:highlightBlock"]&&!E["after:highlightElement"]&&(E["after:highlightElement"]=R=>{E["after:highlightBlock"](Object.assign({block:R.el},R))})}function P(E){N(E),o.push(E)}function k(E){let R=o.indexOf(E);R!==-1&&o.splice(R,1)}function D(E,R){let $=E;o.forEach(function(B){B[$]&&B[$](R)})}function F(E){return Hn("10.7.0","highlightBlock will be removed entirely in v12.0"),Hn("10.7.0","Please use highlightElement now."),y(E)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:x,highlightElement:y,highlightBlock:F,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:C,unregisterLanguage:w,listLanguages:O,getLanguage:A,registerAliases:L,autoDetection:I,inherit:Vv,addPlugin:P,removePlugin:k}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=TM,e.regex={concat:Wo,lookahead:Hv,either:zu,optional:LI,anyNumberOfTimes:$I};for(let E in Xa)typeof Xa[E]=="object"&&jv(Xa[E]);return Object.assign(e,Xa),e},Un=Zv({});Un.newInstance=()=>Zv({});eT.exports=Un;Un.HighlightJS=Un;Un.default=Un});var u={};To(u,{ANIMATION_STOP_REJECT:()=>nl,checkType:()=>Le,createStore:()=>RE,debounce:()=>_o,getFps:()=>PE,getInstantFps:()=>NE,getTime:()=>qt,getTypeName:()=>is,getUnivoqueId:()=>Me,mustMakeSomething:()=>AE,normalizeWheel:()=>bi,shouldMakeSomething:()=>OE,store:()=>lw,throttle:()=>ai,useCache:()=>WE,useDebounce:()=>_o,useFps:()=>BE,useFrame:()=>$E,useFrameIndex:()=>FE,useLinkedList:()=>uw,useLoad:()=>VE,useMouseClick:()=>HE,useMouseDown:()=>UE,useMouseMove:()=>qE,useMouseUp:()=>YE,useMouseWheel:()=>KE,useNextFrame:()=>DE,useNextLoop:()=>$t,useNextTick:()=>LE,usePointerDown:()=>nw,usePointerLeave:()=>cw,usePointerMove:()=>sw,usePointerOut:()=>aw,usePointerOver:()=>ow,usePointerUp:()=>iw,useResize:()=>jE,useScroll:()=>QE,useScrollEnd:()=>rw,useScrollImmediate:()=>ZE,useScrollStart:()=>tw,useScrollThrottle:()=>ew,useTouchEnd:()=>XE,useTouchMove:()=>JE,useTouchStart:()=>GE,useVisibilityChange:()=>zE});var qt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),vp=16.666666666666668;var ai=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){qt()-o>=t&&(e.apply(n,s),o=qt())},t-(qt()-o))):(e.apply(n,s),o=qt())}};var _o=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function se(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Fe(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function he(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function xt(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ss(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function So(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function jc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var Me=()=>`_${Math.random().toString(36).slice(2,9)}`;function Tp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var zc=(e,t,r)=>Math.min(Math.max(e,t),r);var ci=new Set,$t=e=>{ci.add(e),ci.size===1&&setTimeout(()=>{ci.forEach(t=>{t()}),ci.clear()})};var Hc="UNTYPED",_p="STRING",Sp="NUMBER",xp="OBJECT",Cp="FUNCTION",li="ARRAY",Ep="BOOLEAN",wp="ELEMENT",Ip="HTMLELEMENT",Mp="NODELIST";var Ee={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},is=e=>{switch(e){case String:case _p:return"String";case Number:case Sp:return"Number";case Object:case xp:return"Object";case Function:case Cp:return"Function";case Array:case li:return"Array";case Boolean:case Ep:return"Boolean";case Element:case wp:return"Element";case HTMLElement:case Ip:return"HTMLElement";case NodeList:case Mp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Hc}},Le=(e,t)=>{switch(e){case String:case _p:return Ee.isString(t);case Number:case Sp:return Ee.isNumber(t);case Object:case xp:return Ee.isObject(t);case Function:case Cp:return Ee.isFunction(t);case Array:case li:return Ee.isArray(t);case Boolean:case Ep:return Ee.isBoolean(t);case Element:case wp:return Ee.isElement(t);case HTMLElement:case Ip:return Ee.isHTMLElement(t);case NodeList:case Mp:return Ee.isNodeList(t);case Set:case"SET":return Ee.isSet(t);case Map:case"MAP":return Ee.isMap(t);case"ANY":return!0;default:return!0}};var RC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),NC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),PC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},kp=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(kp(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Uc=(e,t,r)=>{switch(e){case"ANY":return kp(t,r);case li:case Array:return PC(t,r);case"SET":case Set:return NC(t,r);case"MAP":case Map:return RC(t,r);default:return t===r}};var ui="UPDATE";var ke={};To(ke,{extractKeysFromArray:()=>Jc,extractkeyFromProp:()=>Dr,getCurrentDependencies:()=>Gc,getFirstCurrentDependencies:()=>qc,initializeCurrentDependencies:()=>as,setCurrentDependencies:()=>mi});var Ho=[],pi=!1,as=()=>{pi=!0,Ho.length=0},Gc=()=>(pi=!1,[...Ho]),qc=()=>(pi=!1,[...Ho]?.[0]??"missing_prop"),mi=e=>{!pi||!e||Ho.includes(e)||(Ho=[...Ho,e])},Dr=e=>Le(String,e)?e:(as(),e(),qc()),Jc=e=>e.map(t=>Le(String,t)?t:(as(),t(),qc()));var di=new Map,Uo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=di.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;di.set(s,l),$t(()=>{let d=di.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&di.delete(s)})}},Rp=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var AC="padding: 10px;",Be=()=>AC;var gr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=gr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(gr(s,t),gr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(gr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:gr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:gr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Yc="store_shallow_copy",Xc="store_custom_copy",Kc="store_deep_copy",Go=Yc,hi=()=>Go===Xc||Go===Kc;var Ge=new Map,oe=e=>{if(Go===Yc){let t=Ge.get(e);return t?{...t}:void 0}if(Go===Xc){let t=Ge.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Go===Kc){let t=Ge.get(e);return t?{...t,store:gr(t.store),validationStatusObject:gr(t.validationStatusObject)}:void 0}return Ge.get(e)},Pe=(e,t)=>{Ge.set(e,t)},Np=e=>{Ge.delete(e)};var Qc=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Pp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Ap=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Op=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},$p=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${is(r)}`,o)},Lp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Dp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Fp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Bp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Vp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${is(o)}`,n)},Wp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},Zc=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},jp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},zp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},Hp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Up=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},el=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var cs=e=>{if(!Ee.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>cs(r)))+1},Gp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ee.isObject(o)&&t)return[r,Gp(o,!1)];if(Ee.isFunction(o)){let n=o();if(Ee.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),qp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ee.isObject(s)&&o)return[n,qp(s,t,r,!1)];if(Ee.isFunction(s)){let i=s();if(Ee.isObject(i)&&"value"in i&&t in i){let a=Ee.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Jp=({data:e,depth:t,logStyle:r})=>t>2?(Qc(t,r),{}):Gp(e),qo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(Qc(r,o),{}):qp(e,t,n),Yp=({value:e})=>Le(Map,e)?new Map(e):Le(Set,e)?new Set(e):Le(Object,e)?{...e}:Le(Array,e)?[...e]:e,Jo=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var OC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:y}=i,T=Be(),S=a[t]==="ANY";if(Ee.isObject(r)&&!S){Ap(t,r,T);return}if(Ee.isObject(l[t])&&!S){Op(t,T);return}let _=l[t],M=c[t]?.(r,_)??r;if(!Le(a[t],M)){$p(t,M,a[t],T);return}let C=p[t]?.(M,_);!C&&s&&el(t,T),!(d[t]&&!C&&n||(f[t]=C,(h[t]?Uc(a[t],_,M):!1)&&!s))&&(l[t]=M,Pe(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Uo({callBackWatcher:v,prop:t,newValue:M,oldValue:_,validationValue:f[t],instanceId:e}),br({instanceId:e,prop:t}),y.forEach(O=>{br({instanceId:O,prop:t})})))},$C=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:y}=i,T=Be();if(!Ee.isObject(r)){Lp(t,r,T);return}if(!Ee.isObject(a[t])){Dp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(k=>_.includes(k))){Fp(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[D,F]=k,E=a[t][D];return[D,p[t][D]?.(F,E)??F]}));if(!Object.entries(x).map(k=>{let[D,F]=k,E=Le(c[t][D],F);return E||Vp(t,D,F,c[t][D],T),E}).every(k=>k===!0))return;let w=Object.entries(x).map(k=>{let[D,F]=k,E=a[t][D];return l[t][D]&&n?{strictCheck:d[t][D]?.(F,E),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(w.length===0)return;let A=Object.fromEntries(w.map(({item:k})=>k).map(([k,D])=>[k,D]));Object.entries(A).forEach(k=>{let[D,F]=k,E=a[t][D],R=d[t][D]?.(F,E);!R&&s&&el(t,T),R===void 0&&Hp(T,"ANY"),f[t][D]=R});let L=a[t],I={...a[t],...A};Object.keys(A).every(k=>h[t][k]===!0)&&Object.entries(I).every(([k,D])=>{let F=c[t][k]==="ANY";if(cs(D)>1&&!F){Bp(t,x,T);return}return Uc(c[t][k],L[k],D)})&&!s||(a[t]=I,Pe(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Uo({callBackWatcher:v,prop:t,newValue:a[t],oldValue:L,validationValue:f[t],instanceId:e}),br({instanceId:e,prop:t}),y.forEach(k=>{br({instanceId:k,prop:t})})))},yr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=oe(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=Be();if(!(t in l)){Pp(t,d);return}let f=n?Yp({value:l[t]}):l[t],h=i===ui?r(f):r,v=p[t]==="ANY";if(Ee.isObject(f)&&!v){$C({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}OC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},Xp=({instanceId:e,prop:t,value:r})=>{let o=oe(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Pe(e,{...o,store:n}),Uo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},Kp=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=oe(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),LC=e=>{let t=oe(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=Kp({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Pe(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{yr({instanceId:e,prop:l,value:p,action:"SET"})})},br=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Pe(e,{...r,computedPropsQueque:n}),!s)){let i=oe(e);if(!i)return;Pe(e,{...i,computedRunning:!0}),$t(()=>LC(e))}},DC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=oe(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){jp(r,Be());return}s.add({prop:t,keys:r,fn:o}),Pe(e,{...n,callBackComputed:s})},FC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=oe(e);if(!n)return;let{store:s,bindInstance:i}=n,a=Kp({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);yr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},Qp=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(as(),o({}),Gc()):r;FC({instanceId:e,prop:t,keys:n,callback:o}),DC({instanceId:e,prop:t,keys:n,fn:o})};var Zp=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ee.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},em=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;yr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var BC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=Be();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return zp(t,i),{state:void 0,unsubscribeId:""};let a=Me();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},VC=({instanceId:e,unsubscribeId:t})=>{let r=oe(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Pe(e,{...r,callBackWatcher:o}))},tm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=BC({state:n,prop:t,callback:r,wait:o});return s?(Pe(e,s),()=>{VC({instanceId:e,unsubscribeId:i})}):()=>{}},rm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return tm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=oe(p)?.store;return d&&t in d})??"",c=tm({instanceId:a,prop:t,callback:r,wait:o}),l=oe(e);return l?(Pe(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=oe(e);p&&Pe(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var om=e=>{let t=cs(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Jp({data:e,depth:t,logStyle:Be()}),type:qo({data:e,prop:"type",depth:t,logStyle:Be(),fallback:Hc}),fnTransformation:qo({data:e,prop:"transform",depth:t,logStyle:Be(),fallback:r=>r}),fnValidate:qo({data:e,prop:"validate",depth:t,logStyle:Be(),fallback:()=>!0}),strict:qo({data:e,prop:"strict",depth:t,logStyle:Be(),fallback:!1}),skipEqual:qo({data:e,prop:"skipEqual",depth:t,logStyle:Be(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var nm=e=>{let t=oe(e);if(!t)return{};let{store:r}=t;return r??{}},im=e=>{let t=oe(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?nm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(nm(o))))},sm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Wp(t,Be())},am=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return sm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return sm({instanceId:n,prop:t})};var cm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Uo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),br({instanceId:e,prop:t}),i.forEach(a=>{br({instanceId:a,prop:t})})):Zc(t,Be()))},fi=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){cm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";cm({instanceId:n,prop:t})},lm=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Rp({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),br({instanceId:e,prop:t}),i.forEach(a=>{br({instanceId:a,prop:t})}),{success:!0}):(Zc(t,Be()),{success:!1}):{success:!1}},um=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return lm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return lm({instanceId:n,prop:t})};var pm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;return r},mm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{store:r}=t;console.log(r)},dm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},hm=({instanceId:e})=>{let t=oe(e);console.log(t)};var fm=({instanceId:e})=>{let t=Be(),r=Ge.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=hi()?Ge.get(e)?.store??p:p;if(!h)return!1;if(d in h){let v=Jo({instanceId:e,prop:d}),y=s.has(d);return y&&Up(d,t),v||y?!1:(yr({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=hi()?Ge.get(e)?.store??p:p;return!f||!(d in f)?!1:(mi(d),f[d])}});if(!o||o.length===0)return Pe(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=Ge.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,v){let y=hi()?Ge.get(p)?.store??h:h;return!y||!(v in y)?!1:(mi(v),y[v])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(v=>d in v);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Pe(e,{...r,proxiObject:l}),l};var WC=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Pe(t,{...r,bindInstanceBy:n})},gm=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Pe(t,{...r,bindInstanceBy:n})},jC=({bindStores:e,selfStore:t})=>{let o=[...Le(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},bm=({value:e,instanceId:t})=>{let r=oe(t);if(!r)return;jC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Le(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Pe(t,{...r,bindInstance:s}),n.forEach(i=>{WC({selfId:t,bindId:i})})};var ym=e=>{let t=Ge.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{gm({selfId:e,bindId:n})}),Np(e)};var vm=({instanceId:e,values:t})=>{let r=oe(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Pe(e,r)};var gi=(e={})=>{let t=Me(),r=om(e),o=Zp(r);return Pe(t,o),em(t,r),{getId:()=>t,bindStore:n=>{bm({value:n,instanceId:t})},get:()=>im(t),getProp:n=>am({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Dr(n);Jo({instanceId:t,prop:c})||yr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Dr(n);Jo({instanceId:t,prop:l})||yr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:ui})},getProxi:()=>fm({instanceId:t}),quickSetProp:(n,s)=>{Jo({instanceId:t,prop:n})||Xp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Dr(n),l=rm({instanceId:t,prop:c,callback:s,wait:i});return a&&$t(()=>{fi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Dr(n),l=Jc(i);Qp({instanceId:t,prop:c,keys:l,callback:s}),$t(()=>{fi({instanceId:t,prop:c})})},emit:n=>{let s=Dr(n);fi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Dr(n);return um({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{vm({instanceId:t,values:n})},getValidation:()=>pm({instanceId:t}),debug:()=>{hm({instanceId:t})},debugStore:()=>{mm({instanceId:t})},debugValidate:()=>{dm({instanceId:t})},destroy:()=>{ym(t)}}};var _e=gi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var tl=!1,ls=new Map;function Tm(){if(ls.size===0){globalThis.removeEventListener("DOMContentLoaded",Tm),tl=!1;return}for(let e of ls.values())e();ls.clear()}function zC(){tl||(tl=!0,globalThis.addEventListener("DOMContentLoaded",Tm,{passive:!1}))}var HC=e=>{let t=Me();return ls.set(t,e),typeof globalThis<"u"&&zC(),()=>ls.delete(t)},_m=HC;function bi(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function UC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function GC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=_e.get();_e.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=UC({type:c,event:a}),{clientX:d,clientY:f}=GC({type:c,event:a}),h=a.target,v={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=_e.getProp("spinYMaxValue"),T=_e.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:M,pixelY:x}=bi(a);v.spinX=zc(S,-T,T),v.spinY=zc(_,-y,y),v.pixelX=M,v.pixelY=x}for(let y of r.values())y(v)}function s(){t||(t=!0,o=_e.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=Me();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Sm=Br("click"),xm=Br("mousedown"),Cm=Br("touchstart"),Em=Br("mousemove"),wm=Br("touchmove"),Im=Br("mouseup"),Mm=Br("touchend"),km=Br("wheel");var xo=0,Ke=new Map,qC=(e=()=>{})=>{let t=Me();return Ke.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ke.has(t)){let r=Ke.get(t);if(!r)return;let o=r.data.size;if(Ke.delete(t),!o)return;xo=xo-o}}}},JC=({id:e,callBackObject:t,frame:r})=>{if(!Ke.has(e))return;let{currentFrame:o}=_e.get(),n=Ke.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),xo++)},YC=e=>{Ke.has(e)&&Ke.delete(e)},XC=e=>{let t=Ke.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=_e.get();t.freeze={active:!0,atFrame:r}},KC=({id:e,update:t=!0})=>{let r=Ke.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=_e.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},QC=e=>{let t=Ke.get(e);if(!t)return;let r=t.data.size;xo=xo-r,t.data.clear()},ZC=e=>Ke.get(e)??{},eE=e=>{for(let t of Ke.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),xo--)}},tE=({id:e,obj:t={}})=>{if(!Ke.has(e))return;let r=Ke.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},rE=()=>xo,oE=e=>{for(let[t,r]of Ke){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ke.set(t,{data:i,fn:n,freeze:s})}},Yo={add:qC,get:ZC,update:JC,remove:YC,clean:QC,fire:eE,fireObject:tE,getCacheCounter:rE,updateFrameId:oE,freeze:XC,unFreeze:KC};var rl=!1,yi=new Map;function Rm(){if(yi.size===0){globalThis.removeEventListener("visibilitychange",Rm),rl=!1;return}let e={visibilityState:document.visibilityState};for(let t of yi.values())t(e)}function nE(){rl||(rl=!0,globalThis.addEventListener("visibilitychange",Rm,{passive:!1}))}var sE=e=>{let t=Me();return yi.set(t,e),typeof globalThis<"u"&&nE(),()=>yi.delete(t)},vi=sE;var us=[],iE=(e=()=>{},t=100)=>{us.push({cb:e,priority:t})},aE=({time:e,fps:t})=>{us.length!==0&&(us.sort((r,o)=>r.priority-o.priority),us.forEach(({cb:r})=>r({time:e,fps:t})),us.length=0)},Ct={add:iE,fire:aE};var ol=[],cE=e=>{ol.push(e)},lE=()=>{let e=[...ol];return ol.length=0,e},Xo={add:cE,get:lE};var Vr=new Map,uE=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},pE=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},mE=(e,t)=>{let r=t+_e.getProp("currentFrame"),o=Vr.get(r)??[];Vr.set(r,[...o,e]),_e.emit("requestFrame")},dE=()=>Vr.size,Ko={add:mE,fire:pE,updateKeys:uE,getAmountOfFrameToFire:dE};var nl="animationStop",Nm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===nl&&e.preventDefault()})};var Pm=!1,Ti=({force:e=!1,duration:t=30}={})=>{if(Pm&&!e){let{instantFps:r}=_e.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,v=Math.max(h,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){_e.quickSetProp("instantFps",y),Pm=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ti();var sl=1e7,Lm=2e3,ll=!1,Wr=[],Qe=qt(),Am=0,il=0,al=0,ul=0,cl=0,Qo=!1,ot=60,Ei=ot,_i=0,Si=0,vr=0,xi=!1,Ci=!1,hE=()=>ot<Ei/5*3,fE=()=>ot<Ei/5*4,gE=()=>{!hE()||xi||(xi=!0,setTimeout(()=>{xi=!1},4e3))},bE=()=>{!fE()||Ci||(Ci=!0,setTimeout(()=>{Ci=!1},4e3))};vi(({visibilityState:e})=>{Qo=e==="visible"});Nm();_e.watch("requestFrame",()=>{wi()});var Om=()=>{vr===sl&&(vr=0,_e.quickSetProp("currentFrame",vr),Ko.updateKeys(sl),Yo.updateFrameId(sl)),Ct.fire({time:Qe,fps:ot}),Wr=[...Wr,...Xo.get()],ll=!1,Wr.length>0||Ko.getAmountOfFrameToFire()>0||Yo.getCacheCounter()>0||Qe<Lm?wi():(Qo=!0,vr=0,ul=Qe,_e.quickSetProp("currentFrame",vr))},$m=e=>{Qe=e,al=Qe-il,Qo&&(Am+=al),il+=al,Qe=Math.round(il-Am);let t=Math.round(1e3/ot);cl=Math.abs(Qe-ul-t);let r=cl>100?cl:0;Qe=Qe-r,ul=Qe,Qo?(Si=Qe,_i=0,ot=_e.getProp("instantFps")):_i++,Qe>Si+1e3&&!Qo&&(ot=Qe>Lm?Math.round(_i*1e3/(Qe-Si)):_e.getProp("instantFps"),Si=Qe,_i=0,ot=ot<30?_e.getProp("instantFps"):ot),ot>Ei&&(Ei=ot),gE(),bE(),Wr.forEach(n=>n({time:Qe,fps:ot})),Ko.fire({currentFrame:vr,time:Qe,fps:ot}),Yo.fire(vr),vr++,_e.quickSetProp("currentFrame",vr),Wr.length=0,Qo=!1,_e.getProp("deferredNextTick")?$t(()=>Om()):Om()},wi=()=>{ll||(typeof globalThis>"u"?setTimeout(()=>$m(qt()),vp):requestAnimationFrame($m),ll=!0)},Lt={add:s=>{Wr.push(s),wi()},addMultiple:(s=[])=>{Wr=[...Wr,...s],wi()},getFps:()=>ot,mustMakeSomething:()=>xi,shouldMakeSomething:()=>Ci};var pl=!1,Ii=new Map,ml=()=>{},Dm=window.innerHeight,Fm=window.innerWidth;function yE(){if(Ii.size===0){window.removeEventListener("resize",ml),pl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Dm,o=t!==Fm;Dm=e,Fm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Ii.values())s(n)}function vE(){pl||(pl=!0,ml=_o(()=>yE()),window.addEventListener("resize",ml,{passive:!1}))}var TE=e=>{let t=Me();return Ii.set(t,e),typeof globalThis<"u"&&vE(),()=>Ii.delete(t)},Bm=TE;var dl=!1,Mi=new Map,_E="UP",jm="DOWN",Vm=window.scrollY,ps=window.scrollY,hl=jm,Wm={scrollY:ps,direction:hl};function zm(){if(Mi.size===0){window.removeEventListener("scroll",zm),dl=!1;return}Vm=ps,ps=window.scrollY,hl=ps>Vm?jm:_E,Wm={scrollY:ps,direction:hl};for(let e of Mi.values())e(Wm)}function SE(){dl||(dl=!0,window.addEventListener("scroll",zm,{passive:!0}))}var xE=e=>{let t=Me();return Mi.set(t,e),typeof globalThis<"u"&&SE(),()=>Mi.delete(t)},Tr=xE;var fl=!1,ki=new Map,Hm=()=>{};function CE(e){if(ki.size===0){Hm(),fl=!1;return}Lt.add(()=>{Ct.add(()=>{for(let t of ki.values())t(e)},0)})}function EE(){fl||(fl=!0,Hm=Tr(CE))}var wE=e=>{let t=Me();return ki.set(t,e),typeof globalThis<"u"&&EE(),()=>ki.delete(t)},Um=wE;var gl=!1,Ri=new Map,Gm,qm=()=>{};function IE(e){if(Ri.size===0){qm(),gl=!1;return}Lt.add(()=>{Ct.add(()=>{for(let t of Ri.values())t(e)},0)})}function ME(){gl||(gl=!0,Gm=ai(e=>IE(e),_e.getProp("throttle")),qm=Tr(Gm))}var kE=e=>{let t=Me();return Ri.set(t,e),typeof globalThis<"u"&&ME(),()=>Ri.delete(t)},Jm=kE;var Ym=()=>{},Xm=()=>{},Km=()=>{};function Qm(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){Xm(),e==="START"&&Ym(),t=!1;return}Lt.add(()=>{Ct.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,Km=_o(()=>n()),Xm=Tr(Km),e==="START"&&(Ym=Tr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=Me();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Zm=Qm("START"),ed=Qm("END");function Zo(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=Me();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var td=Zo("pointerover"),rd=Zo("pointerdown"),od=Zo("pointermove"),nd=Zo("pointerup"),sd=Zo("pointerout"),id=Zo("pointerleave");var Ve=Symbol("LinkedList.setNext"),We=Symbol("LinkedList.setPrev"),Ni="after",bl="before",en=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Ve](t){this.#n=t}get prev(){return this.#t}[We](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},tn=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new en(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Ve](r),r[We](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new en(t);return this.#l.add(r),this.#n?(r[Ve](this.#n),this.#n[We](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[We](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Ve](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new en(r);return this.#l.add(o),o[We](t),o[Ve](t.next),t.next&&t.next[We](o),t[Ve](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new en(r);return this.#l.add(o),o[Ve](t),o[We](t.prev),t.prev&&t.prev[Ve](o),t[We](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Ni){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Ni&&r.next===t?this:o===bl&&r.prev===t?this:(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Ni&&(t[We](r),t[Ve](r.next),r.next&&r.next[We](t),r[Ve](t),r===this.#t&&(this.#t=t)),o==bl&&(t[We](r.prev),t[Ve](r),r.prev&&r.prev[Ve](t),r[We](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Ni)}moveBefore(t,r){return this.move(t,r,bl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Ve](n),n&&n[We](o),s&&s[Ve](i),i&&i[We](s),t[We](s),t[Ve](i),r[We](o),r[Ve](n),s&&s[Ve](t),i&&i[We](t),o&&o[Ve](r),n&&n[We](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Ve](o),t[We](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function RE(e){return gi(e)}function NE(){return _e.getProp("instantFps")}function PE(){return Lt.getFps()}function AE(){return Lt.mustMakeSomething()}function OE(){return Lt.shouldMakeSomething()}function $E(e=()=>{}){return Lt.add(e)}function LE(e=()=>{}){return Ct.add(e)}function DE(e=()=>{}){return Xo.add(e)}function FE(e=()=>{},t=0){return Ko.add(e,t)}async function BE({force:e=!1,duration:t=30}={}){return await Ti({force:e,duration:t})}function VE(e=()=>{}){return _m(e)}var WE=Yo;function jE(e=()=>{}){return Bm(e)}function zE(e=()=>{}){return vi(e)}function HE(e=()=>{}){return Sm(e)}function UE(e=()=>{}){return xm(e)}function GE(e=()=>{}){return Cm(e)}function qE(e=()=>{}){return Em(e)}function JE(e=()=>{}){return wm(e)}function YE(e=()=>{}){return Im(e)}function XE(e=()=>{}){return Mm(e)}function KE(e=()=>{}){return km(e)}function QE(e=()=>{}){return Um(e)}function ZE(e=()=>{}){return Tr(e)}function ew(e=()=>{}){return Jm(e)}function tw(e=()=>{}){return Zm(e)}function rw(e=()=>{}){return ed(e)}function ow(e=()=>{}){return td(e)}function nw(e=()=>{}){return rd(e)}function sw(e=()=>{}){return od(e)}function iw(e=()=>{}){return nd(e)}function aw(e=()=>{}){return sd(e)}function cw(e=()=>{}){return id(e)}var lw=_e;function uw(){return new tn}var m={};To(m,{afterRouteChange:()=>pd,beforeRouteChange:()=>ud,componentMap:()=>j,createComponent:()=>Yh,eventDelegationMap:()=>_n,getActiveParams:()=>hd,getActiveRoute:()=>dd,getChildrenIdByName:()=>Bi,getComponentNameById:()=>Dd,getDebugMode:()=>Jh,getIdByInstanceName:()=>er,getNumberOfActiveInvalidate:()=>Kg,getNumberOfActiveRepeater:()=>Qg,getParentIdById:()=>fs,getPropsFromParent:()=>ha,getRoot:()=>aa,getStateById:()=>rr,getStateByName:()=>ch,getTree:()=>Wd,inizializeApp:()=>Xg,loadUrl:()=>Yg,mainStore:()=>me,onRouteLoading:()=>md,removeAndDestroyById:()=>st,setStateById:()=>gn,setStateByName:()=>Hh,staticProps:()=>fa,tempDelegateEventMap:()=>Ts,tick:()=>xr,updateStateByName:()=>Gh,useComponent:()=>Ki,useMethodArrayByName:()=>Hd,useMethodByName:()=>un,watchById:()=>Et});var rn="activeRoute",on="activeParams",Co="beforeRouteChange",nn="afterRouteChange",Jt="routeIsLoading",pt="parserAsync",jr="default",ad="repeater",cd="invalidate",ld="render_component";var me=u.createStore({[rn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[on]:()=>({value:{},type:"any",skipEqual:!1}),[Co]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Jt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:jr,type:String,skipEqual:!1})}}),sn=()=>{me.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:jr},{emit:!1})};var ud=e=>me.watch(Co,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),pd=e=>me.watch(nn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),md=e=>me.watch(Jt,t=>{e(t)}),dd=()=>{let{activeRoute:e}=me.get();return e},hd=()=>{let{activeParams:e}=me.get();return e};var j=new Map;var G=new Map;var fd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},gd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},yl=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},bd=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var yd=new WeakMap,vd=({element:e,id:t})=>{yd.set(e,t)},an=({element:e})=>yd.get(e);var Td=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),vd({element:t,id:e}))},ms=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,_d=({element:e})=>e?an({element:e}):"",vl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:yl({repeatId:t}).map(n=>j.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),Tl=({id:e,repeatId:t})=>!e||e===""?[]:yl({repeatId:t}).map(o=>j.get(o)).filter(o=>o!==void 0).map(o=>o.id);var Sd="data-mobjs",Eo="componentid",Pi="bindtextid",Ai="bindobjectid";var cn="staticprops",Oi="bindprops",xd="name",Cd="name",Ed="slot",Dt="repeaterchild";var Yt="currentRepeaterValue",Xt="repeatPropBind",$i="bindevents",Kt="weakbindevents",ln="bindeffect",wd="parentid";var Qt="bindrefid",_r="bindrefname",Li="invalidateid",Di="mobjsrepeat";var Zt={current:{},index:-1},Id="QUEQUE_BINDPROPS",_l="QUEQUE_REPEATER",Sl="QUEQUE_INVALIDATE";var zr=new Map;var ds=({id:e})=>{if(!G.has(e))return;if(zr.has(e)){let r=zr.get(e);r?.removeCustomComponent(),r?.remove(),zr.delete(e)}return G.get(e)?.element};var Fi=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},Md=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Md({rootNode:e,currentNode:t.parentElement})},pw=({rootNode:e,node:t})=>{if(e)return Md({rootNode:e,currentNode:t.parentElement})},Ft=({id:e=""})=>{if(!e||e==="")return Zt;let r=j.get(e)?.currentRepeaterState;return r||Zt};var kd=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=ds({id:t}),s=pw({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},hs=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var Bi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Rd=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=Ft({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Nd="",Pd,Ad=({contentId:e=""})=>{Nd=e};var Od=()=>{Pd=document?.querySelector(Nd)},Vi=()=>Pd;var Hr=new Map,$d=({instanceName:e,id:t})=>{let r=Hr.get(e)??[];Hr.set(e,[...r,t])},Ld=({instanceName:e,id:t})=>{let r=Hr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&Hr.delete(e),o.length>0&&Hr.set(e,o)},xl=({instanceName:e})=>Hr.get(e)??[];var Dd=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Fd=e=>{if(!e)return"name-not-found";let t=an({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},er=(e="")=>e?xl({instanceName:e})?.[0]:void 0,Bd=(e="")=>e?xl({instanceName:e})??[]:[];var Wi=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Vi()?.contains(r):!1};var Vd=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Vd({chunk:l})}]},[]),Wd=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Vd({chunk:e})};var jd=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},zd=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},un=e=>{let t=er(e);if(!t||t==="")return;let r=zd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Hd=e=>Bd(e).map(r=>zd({id:r})).filter(r=>Object.keys(r).length>0);function*tr(e){if(e){yield e;for(let t of e.children)yield*tr(t)}}function mw(e,t){let r=[];for(let o of tr(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Ur=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...mw(n,t)];return r};var wo=new Set,Ud=!1,Gd=e=>{wo.add(e)},qd=e=>{wo.delete(e)},Jd=e=>{let t;for(let r of wo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(wo.delete(t),[t]):[]},Yd=({element:e})=>[...wo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Xd=({element:e})=>[...wo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],Kd=()=>wo.size;var nt=e=>{Ud=e},Bt=()=>Ud;var Qd=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},Zd=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},eh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},ji=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var fs=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},th=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:{...s,...Qd({currentChild:s,id:e,componentName:o})}})},rh=({element:e,id:t})=>{if(!e)return;if(!0){Ur(e,!1).forEach(n=>{n.setParentId(t)});return}Yd({element:e}).forEach(o=>{o.setParentId(t)})},pn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=an({element:t}),r||(t=t.parentNode);return r??""},Cl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Cl({moduleScopeId:o,targetComponentId:t})};var Tt=new Map,gs=new Map;var oh=({componentId:e})=>{if(e)for(let[t,r]of Tt){let{componentId:o}=r;o===e&&Tt.delete(t)}};var Ze=new Map;var be=new Map;var nh=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{be.has(r)&&be.delete(r)}),Ze.delete(e)}};var et=new Map;var sh=({id:e})=>{if(et.has(e)){let t=et.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),et.delete(e)}};var ih=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=j.get(t??"");if(!o)return;let{child:n}=o;!t||!n||j.set(t,{...o,child:{...n,...Zd({currentChild:n,id:e,componentName:r})}})};var mn=new Set;var ah=e=>{mn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),ih({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),nh({id:e}),sh({id:e}),l&&l.length>0&&gd({componentId:e,repeatId:l}),p&&p.length>0&&Ld({instanceName:p,id:e}),d||ah(e),oh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var rr=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var ch=(e="")=>{let t=er(e);return t||console.warn(`component ${e}, not found`),rr(t)};var dn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Gr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Io=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var lh=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),zr.set(e,t)};var uh=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Bt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Di)??"";lh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Map;var ph=({invalidateId:e,host:t})=>{let r=be.get(e);if(!r)return;let o=t.parentNode;be.set(e,{...r,element:o}),qr.set(e,t)};var mh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Li)??"";ph({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Set,dh=e=>{Jr.add(e)},hh=()=>{Jr.clear()},fh=({element:e})=>[...Jr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Jr.delete(t),r}),gh=({name:e,element:t})=>[...Jr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Jr.delete(r),o}),bh=()=>[...Jr],zi=()=>Jr.size;var yh=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Cd))}connectedCallback(){let e=this.shadowRoot?.host;e&&dh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var El=new Set,vh=e=>{El.add(e)},Hi=()=>[...El],Ui=e=>El.delete(e);var Th=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Bt();if(p&&!!1&&vh(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#S}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Bt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#S]=[xd,cn,Oi,"key",$i,Yt,Ed,wd,Dt,Kt,Xt,Qt,_r].map(d=>p.getAttribute(d)??"")),Gd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;qd(l),Ui(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var Et=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Kr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Mo=new Map,Sh=()=>Mo.size===0,wl=1e3,xh=e=>{if(Mo.size>=wl)return console.warn(`maximum loop event reached: (${wl})`),()=>{};let t=u.getUnivoqueId();return Mo.set(t,e),()=>Mo.delete(t)},_h=()=>Mo.size===0||Mo.size>=wl,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Kr(),e&&Mo.forEach(r=>{console.log(r)}),_h()&&t){t();return}return new Promise(r=>{if(_h()){r();return}wt({debug:e,previousResolve:t??r})})};var ko=new Map,Eh=()=>ko.size===0,Il=1e3,wh=e=>{if(ko.size>=Il)return console.warn(`maximum loop event reached: (${Il})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},Ch=()=>ko.size===0||ko.size>=Il,It=async({debug:e=!1,previousResolve:t}={})=>{if(await Kr(),e&&ko.forEach(r=>{console.log(r)}),Ch()&&t){t();return}return new Promise(r=>{if(Ch()){r();return}It({debug:e,previousResolve:t??r})})};var hn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.invalidateId).map(r=>be.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var fn=({id:e})=>{let t=et.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var qi=new Map,Ih=(e,t)=>{qi.set(e,t)},Ji=new Map,Mh=({host:e,componentId:t,bindTextId:r})=>{Ji.set(e,{componentId:t,bindTextId:r})},kh=e=>e.match(/(?<=\[).+?(?=])/g),Rh=e=>e.split("[")?.[0],hw=({previous:e,current:t})=>{let r=kh(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Rh(t)]):e?.[t]},Nh=(e,t,...r)=>{let o=rr(e),n=r.map(s=>s.split(".").reduce((a,c)=>hw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Ph=()=>{[...Ji].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){qi.delete(t);return}let o=qi.get(t);o&&(qi.delete(t),fw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ji.clear()},Ah=()=>Ji.size,fw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=hn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=kh(f),y=h&&h?.length>0?Rh(f):f;if(y)return Et(e,y,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Oh=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Eo)??"",o=t?.getAttribute(Pi)??"";Mh({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Yi=new Map,$h=(e,t)=>{Yi.set(e,t)},Ml=new Map,Lh=({host:e,componentId:t,bindObjectId:r})=>{Ml.set(e,{componentId:t,bindObjectId:r})},Dh=e=>e.map(t=>"observe"in t?ke.extractkeyFromProp(t.observe):(ke.initializeCurrentDependencies(),"value"in t?t?.value():t(),ke.getFirstCurrentDependencies())),Fh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Bh=()=>{[...Ml].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Yi.delete(t);return}let o=Yi.get(t);o&&(Yi.delete(t),gw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ml.clear()},gw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=hn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Et(e,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Vh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Eo)??"",o=t?.getAttribute(Ai)??"";Lh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xi={},Ro=()=>Xi,Wh=new Set,jh=()=>{Xi=Object.fromEntries([...Wh.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(Xi).length}`),Th(Xi),yh(),mh(),uh(),Oh(),Vh()},Ki=e=>{!e||e?.length===0||e.forEach(t=>{Wh.add(t)})};var Qi=({componentName:e,propName:t})=>(Ro()?.[e]?.componentParams?.exportState??[]).includes(t),zh=({componentName:e})=>Ro()?.[e]?.componentParams?.exportState??[];var gn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!Qi({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Hh=(e="")=>{let t=er(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>gn(t,r,o,{emit:n})};var Uh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!Qi({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Gh=(e="")=>{let t=er(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Uh(t,r,o,{emit:n,clone:s})};var kl={scoped:!1,maxParseIteration:5e3,debug:!1},qh=e=>{kl={...kl,...e}},Mt=()=>kl,Jh=()=>{let{debug:e}=Mt();return e},Yh=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(Ki(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var Xh=[],Kh="",Qh="",Zh=e=>{Xh=[...e]},bn=({hash:e=""})=>Xh.find(({hash:t})=>e===t),ef=({hash:e=""})=>{Kh=e},Zi=()=>Kh,tf=({hash:e=""})=>{Qh=e},rf=()=>Qh;function bw(e){let t=[];for(let r of tr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var of=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...bw(o)];return t};function yw(e){let t=[];for(let r of tr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var nf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...yw(o)];return t};function vw(e,t){for(let r of tr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var sf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=vw(o,t);if(n)return n}return null};function Tw(e){for(let t of tr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var af=e=>{let t=e||document.body;for(let r of t.children){let o=Tw(r);if(o)return o}return null};var bs=new Map,No=e=>{let t=u.getUnivoqueId();return bs.set(t,e),t},cf=(e="")=>{if(!e)return Zt;let t=bs.get(e);return bs.delete(e),t??Zt};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var ea=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Yt)||i.deref()?.setAttribute(Yt,No({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Xt)||i.deref()?.setAttribute(Xt,`${o}`),i.deref()?.hasAttribute(Dt)||i.deref()?.setAttribute(Dt,`${n}`)})},ta=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Dt)){Ui(i);return}i.setAttribute(Yt,No({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Xt,`${o}`),i.setAttribute(Dt,`${n}`)})},Qr=({stringDOM:e,parent:t,position:r})=>{nt(!0);let o=document.createRange().createContextualFragment(e);nt(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},ys=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;nt(!0),e.forEach(n=>{n&&o.append(n)}),nt(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var Sw=({element:e,content:t})=>{let{debug:r}=Mt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},xw=({element:e})=>{bh().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},Cw=({element:e})=>{if(!!1&&zi()===0)return;let t=of(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=gh({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Ew=({element:e,content:t})=>{let r=Sw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=fh({element:r});a&&(ys({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||ys({parent:r,elements:[...e.childNodes],position:"afterbegin"}),Cw({element:r}),xw({element:r}),n&&n.length>0&&r.setAttribute(Kt,n),s&&s.length>0&&r.setAttribute(Qt,s),i&&i.length>0&&r.setAttribute(_r,i);let{debug:c}=Mt();c&&r.setAttribute(Sd,o??"")}return e.remove(),r},lf=({element:e,content:t})=>({newElement:Ew({element:e,content:t})});var Rl=0,uf=()=>{Rl+=1},Nl=()=>Rl,pf=()=>{Rl=0},Pl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Jd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var mf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var vs=new Map,df=({id:e,cb:t=()=>{}})=>{vs.set(e,t)},Al=async({id:e,element:t})=>{let o=await vs.get(e)?.({element:t});mf({cb:o,id:e}),vs.delete(e)};var yn=new Map,Ol=1e5,vn=e=>{if(yn.size>=Ol)return console.warn(`maximum loop event reached: (${Ol})`),()=>{};let t=u.getUnivoqueId();return yn.set(t,e),()=>yn.delete(t)},hf=()=>yn.size===0||yn.size>=Ol,xr=async({debug:e=!1,previousResolve:t}={})=>{if(await Kr(),e&&yn.forEach(r=>{console.log(r)}),hf()&&t){t();return}return new Promise(r=>{if(hf()){r();return}xr({debug:e,previousResolve:t??r})})};var $l=!0,ra=()=>{$l=!0},oa=()=>{$l=!1},na=()=>$l;var Tn=new Map,ff=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return Tn.set(r,t),r},gf=({element:e,componentId:t,bindEventsId:r})=>{let o=Tn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!na())return;oa(),await xr(),ra();let c=Ft({id:t});i(a,c?.current,c?.index)})}),Tn.delete(r))},bf=()=>{Tn.clear()};var sa=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},yf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var vf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>ke.extractkeyFromProp(s)):(ke.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),ke.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return Tt.set(n,{...o,componentId:"",propsId:n}),n},ia=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=rr(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Ft({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{gn(e,d,f,{emit:n})})},Tf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=Tt.get(e);o&&(Tt.set(e,{...o,componentId:r}),gs.set(r,e),Ll({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Ll=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=gs.get(e);if(!o)return;r&&gs.delete(e);let n=Tt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||ia({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Eh()&&(await It(),ia({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Sh()&&(await wt(),ia({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>Et(a,d,async()=>{if(await It(),await wt(),l)return;let f=vn({state:d,id:e,type:Id});l=!0,u.useNextLoop(()=>{ia({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(sa({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of Tt){let{componentId:h}=f;h===e&&Tt.delete(d)}},_f=()=>{Tt.clear(),gs.clear()};var or=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else or({id:c,container:t})})};var Dl=new Map,ww=e=>(u.checkType(Array,e)?e:[e]).map(r=>ke.extractkeyFromProp(r)),Iw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(ke.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),ke.getCurrentDependencies()),Ef=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?ww(i):Iw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Dl.set(s,n),s},wf=e=>{[...e.querySelectorAll(`[${ln}]`)].forEach(r=>{let o=r.getAttribute(ln);if(!o)return;let n=Dl.get(o);n&&(r.removeAttribute(ln),Mw({data:n,element:r}),Dl.delete(o))})},Sf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},xf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Cf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Mw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=fn({id:o}),f=hn({id:o});return[...new Set([...i,...d,...f])].map(v=>(a&&u.useFrame(()=>{Sf({ref:r,data:a})}),c&&u.useFrame(()=>{xf({ref:r,data:c})}),l&&u.useFrame(()=>{Cf({ref:r,data:l})}),Et(o,v,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Sf({ref:r,data:a}),c&&r.deref()&&xf({ref:r,data:c}),l&&r.deref()&&Cf({ref:r,data:l}),p=!1})}))})))})};var If=({element:e})=>{let t=e.querySelectorAll(`[${Qt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Qt),i=n.getAttribute(_r);if(n.removeAttribute(Qt),n.removeAttribute(_r),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},kw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Rw=({refs:e,refName:t,element:r})=>({...e,[t]:kw([...e[t],r])}),Mf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Rw({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Fl=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},kf=({id:e})=>{let t=Fl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Rf=document.createElement("div"),Nf=({element:e})=>{Rf=e},aa=()=>Rf;var Pf=":FORCE",Ts=new Map,_n=new WeakMap,Bl=[],Af=[],Of=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return Ts.set(r,t),r},Nw=e=>{let t=e?.parentNode;for(;t;){if(_n.has(t))return{target:t,data:_n.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Pw=e=>{let t=_n.get(e);return t?{target:e,data:t}:Nw(e)};async function Aw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=Pw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!na()&&!a||(oa(),await xr(),ra(),!document.contains(o)))return;let c=_d({element:o}),l=c?Ft({id:c}):Zt;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var $f=async e=>{await It(),await wt(),[...e.parentNode?.querySelectorAll(`[${Kt}]`)??[]].forEach(n=>{let s=n.getAttribute(Kt)??"";n.removeAttribute(Kt);let i=Ts.get(s);Ts.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l,f=p.toUpperCase().endsWith(Pf),h=p.toUpperCase().replaceAll(Pf,"").toLowerCase();return Bl.includes(h)||Bl.push(h),{event:h,callback:d,force:f}}));_n.set(n,a)});let o=aa();Bl.forEach(n=>{Af.includes(n)||(Af.push(n),o.addEventListener(n,Aw.bind(null,n)))})};var Sn="repeater",ca="invalidate",Zr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===Sn?G.entries():be.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Cl({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===Sn?[h]:h})}return i};var Lf=({id:e,repeatId:t})=>{if(!et.has(e))return;let r=et.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),et.set(e,o)};var eo=({id:e,repeatParent:t})=>{Zr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Sn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Lf({id:e,repeatId:n})})};var la=({repeatParent:e,id:t})=>{if(!e)return;Zr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Sn}).forEach(({initializeModule:o})=>{o()})};var Df=({invalidateId:e,unsubscribe:t})=>{let r=be.get(e);r&&be.set(e,{...r,unsubscribe:t})};var Ff=({id:e,invalidateId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);be.has(t)&&be.delete(t),Ze.set(e,o)};var to=({id:e,invalidateParent:t})=>{Zr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:ca}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Ff({id:e,invalidateId:n})})};var Vl=({id:e})=>{if(!be.has(e))return;if(qr.has(e)){let r=qr.get(e);r?.removeCustomComponent(),r?.remove(),qr.delete(e)}return be.get(e)?.element};var ua=({invalidateParent:e,id:t})=>{if(!e)return;Zr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:ca}).forEach(({initializeModule:o})=>{o()})};var Bf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=pn({element:Vl({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;dn({id:n,prop:d});let h=Vl({id:s}),v=vn({state:d,id:n,type:Sl}),y=xh({state:d,id:n,type:Sl});c=!0,u.useNextLoop(async()=>{if(!h){Gr({id:n,prop:d});return}await t(),to({id:n,invalidateParent:h}),eo({id:n,repeatParent:h}),or({id:l??n,container:h}),h.textContent="",Qr({stringDOM:a(),parent:h,position:"afterbegin"}),me.set(pt,{element:h,parentId:l??n,persistent:i,source:cd},{emit:!1}),await me.emitAsync(pt),sn(),c=!1,v(),y(),ua({invalidateParent:h,id:n}),la({repeatParent:h,id:n}),Gr({id:n,prop:d}),r()})}));Df({invalidateId:s,unsubscribe:p})};var Vf=e=>(u.checkType(Array,e)?e:[e]).map(r=>ke.extractkeyFromProp(r));var Wf=({invalidateId:e,initializeModule:t})=>{let r=be.get(e);r&&be.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var jf=({invalidateId:e})=>{let t=be.get(e);t&&be.set(e,{...t,initialized:!0})};var zf=({invalidateId:e,scopeId:t,observe:r})=>{be.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Hf=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var xn=new Set,Uf=({id:e,state:t,container:r})=>{xn.add({id:e,state:t,container:r})},Gf=({id:e,state:t,container:r})=>{r&&xn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&xn.delete(o)})},qf=({id:e="",state:t="",container:r})=>[...xn].some(n=>e===n.id&&t===n.state&&r===n.container);var Yf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Xf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Jf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Kf=({current:e,previous:t,key:r})=>Jf({arr:e,key:r})&&Jf({arr:t,key:r}),pa=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),ma=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=Ft({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=Ft({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var Cn=new Map,da=(e={})=>{let t=u.getUnivoqueId();return Cn.set(t,e),t},ha=(e="")=>{let t=Cn.get(e);return Cn.delete(e),t??{}};var Qf=()=>{Cn.clear()};var fa=(e={})=>`${cn}="${da(e)}"`,ga=(e,t,r)=>Math.min(Math.max(e,t),r);var Wl=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var Ow="index",Po=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Wl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){ke.setCurrentDependencies(e);let f=Wl({repeatId:s}),h=Math.max(f?.length-1,0);if(d===Ow){if(t){let v=f?.findIndex(y=>y[r]===o);return ga(v,0,h)}return ga(n,0,h)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[ga(n,0,h)],c??l)},set(){return!1}})};var Zf=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=Po({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),v=Bt();nt(!0);let y=i.createContextualFragment(h);if(nt(v),!1){let T=Ur(y,!1).map(S=>new WeakRef(S));ea({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return ta({components:Hi(),current:p,index:d,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},$w=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Yt}="${No({current:t,index:e})}"
    ${Xt}="${r}" ${Dt}="${o}"`,eg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=Po({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>$w({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),tg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=Po({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Bt();nt(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(nt(c),!1){let p=Ur(l,!1).map(d=>new WeakRef(d));ea({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return ta({components:Hi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Lw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Xt}="${o}"
    ${Yt}="${No({current:r,index:t})}"
    ${Dt}="${n}"`,rg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=Po({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Lw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},og=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=Po({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=Bt();nt(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(nt(d),!1){let h=Ur(f,!1).map(v=>new WeakRef(v));ea({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return ta({components:Hi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ng=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Yt}="${No({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Xt}="${r}"
                            ${Dt}="${o}"`,p=Po({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var ba=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=rr(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},_s=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var En=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Dw=({element:e,container:t})=>{let r=Fd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},sg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=pa({data:t,key:n});En({repeatId:a,currentData:l});let p=Yf(r,l,n),d=p.map(T=>{let S=T?.[n];return vl({keyValue:S,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let M=hs({id:_}),x=M??S;to({id:s,invalidateParent:x}),eo({id:s,repeatParent:x}),T.forEach(({id:C})=>{st({id:C})}),M&&M.remove()}),f||_s({repeatId:a}).filter(_=>p.map(M=>M?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:M}=_;to({id:s,invalidateParent:M}),eo({id:s,repeatParent:M}),or({id:s,container:M})});let h=Xf(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let M=vl({keyValue:T,repeatId:a}),x=M[0]?.element?hs({id:M[0]?.id??""}):_s({repeatId:a}).find(w=>w.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:M,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:M,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&y.append(x);let L=M?.[0]?.element;!x&&L&&(y.append(L),A&&Dw({element:M[0]?.element,container:o}));return}let C=l?.[_],w=c?rg({currentValue:C,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):tg({currentValue:C,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),O=Bt();if(nt(!0),c){let A=v.createContextualFragment(w);y.append(A)}!c&&w&&y.append(w),nt(O)}),o.append(y),l};var Fw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},ig=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{En({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?eg({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):Zf({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Qr({stringDOM:f,parent:o,position:"beforeend"}),a||ys({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=ma({children:c});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let M=ms({id:_}),x=hs({id:_}),C=x??M;to({id:i,invalidateParent:C}),eo({id:i,repeatParent:C}),st({id:_}),x&&x.remove()})});let{debug:v}=Mt();if(v&&Fw(o),f.length>0)return t;let y=_s({repeatId:s});if(!y)return t;y.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;to({id:i,invalidateParent:_}),eo({id:i,repeatParent:_}),or({id:i,container:_}),_.remove()})}return t};var ag=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let v=(Kf({current:o,previous:n,key:s})?sg:ig)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return me.set(pt,{element:r,parentId:a??i,persistent:t,source:ad},{emit:!1}),await me.emitAsync(pt),sn(),v};var cg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=ms({id:c}),h=ds({id:l}),v=h?pn({element:h})??"":"";return i(),o(e,async(T,S)=>{if(!u.checkType(Array,T))return;let _=ds({id:l}),M=vn({state:e,id:c,type:_l}),x=wh({state:e,id:c,type:_l});if(dn({id:c,prop:e}),qf({id:c,state:e,container:_})){Gr({id:c,prop:e}),t(e,S,{emit:!1}),M(),x();return}let w=Tl({id:c,repeatId:l});f&&await s(),n&&(w.forEach(P=>{st({id:P})}),_&&(_.textContent="")),_&&Uf({id:c,state:e,container:_});let O=await ag({state:e,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:d,currentChildren:n?[]:w}),A=Tl({id:c,repeatId:l}),L=a&&a!=="",I=ma({children:A,previousChildren:w}),N=L?[...Rd({children:I,key:a,current:T,currentUnivoque:O})]:I;N.forEach((P,k)=>{P.forEach(D=>{let F=O?.[k];if(!F)return;let E=L?T.findIndex(R=>`${R?.[a]}`==`${O?.[k]?.[a]}`):k;Fi({id:D,value:{current:F,index:E}})})}),u.useNextLoop(async()=>{f&&i(),Gf({id:c,state:e,container:_}),Gr({id:c,prop:e}),M(),x(),ua({invalidateParent:_,id:c}),la({repeatParent:_,id:c}),N.length===0&&ba({repeatId:l,id:c})})})};var lg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=cg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});Hf({repeatId:e,unsubscribe:h})};var ug=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var pg=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var mg=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var dg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var hg=({repeatId:e,scopeId:t})=>{let r=et.get(t)??[];et.set(t,[...r,{repeatId:e}])};var fg=({invalidateId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{invalidateId:e}])};var gg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(or({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(y,v),me.set(pt,{element:h,parentId:c,persistent:Wi(c),source:ld},{emit:!1}),await me.emitAsync(pt),sn()},getChildren:h=>Bi({id:c,componentName:h}),freezeProp:h=>{let v=ke.extractkeyFromProp(h);return dn({id:c,prop:v.toString()})},unFreezeProp:h=>{let v=ke.extractkeyFromProp(h);return Gr({id:c,prop:v.toString()})},unBind:()=>yf({id:c}),bindProps:h=>{let v="props"in h?h:{props:h};return`${Oi}="${vf({...v,parentId:c})}" `},staticProps:h=>` ${cn}="${da(h)}" `,remove:()=>{st({id:c})},removeDOM:h=>{or({id:c,container:h}),h.textContent=""},getParentId:()=>fs(c),watchParent:(h,v)=>{let y=Et(fs(c),h,v);y&&sa({id:c,unWatchArray:[y]})},onMount:h=>df({id:c,cb:h}),bindEvents:h=>`${$i}="${ff(h)}"`,delegateEvents:h=>`${Kt}="${Of(h)}"`,bindEffect:h=>`${ln}="${Ef({data:h,id:c})}"`,addMethod:(h,v)=>{jd({id:c,name:h,fn:v})},setRef:h=>`${Qt}="${c}" ${_r}="${h}"`,getRef:()=>kf({id:c}),getRefs:()=>Fl({id:c}),bindText:(h,...v)=>{let y=u.getUnivoqueId(),T=()=>Nh(c,h,...v);return Ih(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Eo}="${c}" ${Pi}="${y}"></mobjs-bind-text>${T()}`},bindObject:(h,...v)=>{let y=Dh(v),T=u.getUnivoqueId(),S=()=>Fh(h,...v);return $h(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Eo}="${c}" ${Ai}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:h,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Vf(h),_=u.getUnivoqueId(),M=`${Li}=${_}`,x=()=>v(),C=!1;return fg({invalidateId:_,scopeId:c}),zf({invalidateId:_,scopeId:c,observe:S}),Wf({invalidateId:_,initializeModule:()=>{C||(Bf({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Wi(c),id:c,invalidateId:_,renderFunction:x}),C=!0,jf({invalidateId:_}))}}),`<mobjs-invalidate ${M} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:h,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:M=!1})=>{let x=ke.extractkeyFromProp(h),C=u.getUnivoqueId(),w=S!=="";hg({repeatId:C,scopeId:c}),dg({repeatId:C,scopeId:c,observe:x});let O=e()?.[x],A=w?pa({data:O,key:S}):O;En({repeatId:C,currentData:A});let L=M?ng({currentUnique:A,key:S,observe:x,repeatId:C,hasKey:w,render:_}):"",I=M?[]:og({currentUnique:A,render:_,observe:x,repeatId:C,key:S,hasKey:w}),N=!1;return mg({repeatId:C,initialDOMRender:I}),ug({repeatId:C,initializeModule:()=>{N||(lg({repeatId:C,persistent:Wi(c),state:x,setState:t,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:M}),N=!0,pg({repeatId:C}),bd({repeatId:C})||ba({repeatId:C,id:c}))}}),`<mobjs-repeat ${Di}="${C}" style="display:none;"></mobjs-repeat>${L}`}});var jl=({componentName:e,currentProps:t={}})=>{let o=Ro()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var bg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=pn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),v=ha(h),y={...e.dataset},T=e.getRepeaterPropBind(),S=cf(l);return{element:e,props:{...jl({componentName:f,currentProps:y}),...jl({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var yg=e=>{mn.add(e)};var vg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Zt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:M=""})=>{let x=u.createStore(o);eh({props:r,store:x}),n&&x.bindStore(n),y||yg(_),p&&p.length>0&&fd({componentId:_,repeatId:p}),t&&t.length>0&&$d({instanceName:t,id:_});let C=zh({componentName:M}),w=new Set(C);return x.setProxiReadOnlyProp(C),j.set(_,{element:e,componentName:M,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(O="",A={},{emit:L=!0}={})=>{let I=Io({id:_,prop:O}),N=ke.extractkeyFromProp(O),P=w.has(N);P&&ji({prop:N,componentName:M,action:"updateState"}),!(I||P)&&x.set(N,A,{emit:L??!0,usePropAsString:!0})},updateState:(O="",A=()=>{},{emit:L=!0,clone:I=!1}={})=>{let N=Io({id:_,prop:O}),P=ke.extractkeyFromProp(O),k=w.has(P);k&&ji({prop:P,componentName:M,action:"updateState"}),!(N||k)&&x.update(P,A,{emit:L??!0,clone:I??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(O="")=>x.emit(O),emitAsync:async(O="")=>await x.emitAsync(O),computed:(O="",A=()=>{},L=[])=>{let I=ke.extractkeyFromProp(O);if(w.has(I)){ji({prop:I,componentName:M,action:"computed"});return}return x.computed(I,A,L,{usePropAsString:!0})},watch:(O="",A=()=>{},{wait:L=!1,immediate:I=!1}={})=>x.watch(O,A,{wait:L??!1,immediate:I??!1}),debug:()=>x.debug()}};var Tg=({id:e})=>(Ze.get(e)??[]).map(({invalidateId:r})=>{let o=be.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var _g=({id:e})=>(et.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Sg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=jr})=>{let{debug:n}=Mt();n&&console.log("parse source:",o);let s=Ro(),i=[],a=Pl({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:v,bindStore:y}=h,{props:T,id:S,componentName:_,instanceName:M,key:x,dynamicPropsId:C,currentRepeatValue:w,bindEventsId:O,parentId:A,componentRepeatId:L,repeatPropBind:I}=bg({element:l,parentIdForced:r}),N=h?.state??{},{getState:P,setState:k,updateState:D,getProxi:F,emit:E,emitAsync:R,computed:$,watch:B,debug:V}=vg({element:l,props:T,state:N,id:S,componentName:_,instanceName:M,key:x,repeatPropBind:I,persistent:t,parentId:A,componentRepeatId:L,bindStore:y});th({id:S}),L&&L?.length>0&&(Fi({id:S,value:w}),kd({id:S,repeatId:L,element:l})),Tf({propsId:C,repeatPropBind:I,componentId:S});let q=gg({getState:P,setState:k,updateState:D,getProxi:F,emit:E,emitAsync:R,computed:$,watch:B,id:S,key:x,bindEventsId:O,debug:V}),ee=await f(q),ue=l.classList,{newElement:re}=lf({content:ee,element:l});if(hh(),ue.length>0&&re?.classList.add(...ue),!0,!re)return;Td({id:S,newElement:re});let ye=Tg({id:S}),ve=_g({id:S});O&&gf({element:re,componentId:S,bindEventsId:O});let ge=v??Mt().scoped;ge&&await Al({id:S,element:re}),re?.inizializeCustomComponent?.(q),i.push({onMount:async()=>{ge||await Al({id:S,element:re})},initializeBindPropsWatcher:()=>{Ll({componentId:S,repeatPropBind:I,inizilizeWatcher:!0})},fireInvalidateFunction:ye.length>0?()=>{ye.forEach(({initializeModule:J})=>{J?.()})}:()=>{},fireRepeatFunction:ve.length>0?()=>{ve.forEach(({initializeModule:J})=>{J?.()})}:()=>{}});let Ne=Pl({element:e,currentSelectors:c});c=Ne.parseSourceArray,l=Ne.componentToParse;let De=Nl()===Mt().maxParseIteration;if(uf(),De){console.warn(`dom parse reached max parse limit: ${Nl()}`);break}}let p=If({element:e});Object.keys(p).length>0&&Mf(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:v,fireRepeatFunction:y}=d;await f(),y(),v(),h()}i.length=0,c.length=0,l=null,$f(e),wf(e),Ph(),Bh()};var Ss=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=jr})=>{await Sg({element:e,persistent:t,parentIdForced:r,source:o}),pf()},xg=()=>{me.watch(pt,async({element:e,parentId:t,persistent:r=!1,source:o=jr})=>{await Ss({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Cg=()=>{Qf(),bf(),_f()};var Eg,wg,Ig=({fn:e})=>{e&&(wg=e)},Mg=({fn:e})=>{e&&(Eg=e)},kg=()=>wg,Rg=()=>Eg;var Ng=!0,Pg=e=>{Ng=e},Ag=()=>Ng;var Og=()=>{for(let e of mn)st({id:e})};var $g=new Map,Lg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Dg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{me.set(Jt,!0),await xr();let s=Vi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=me.get(),c=Lg({route:e,params:o}),l=Lg({route:i.route,params:a}),p=window.scrollY;$g.set(l,p);let d=$g.get(c)??0;me.set(Co,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=me.watch(Co,()=>{f=!0});Cg(),me.set(rn,{route:e,templateName:t}),me.set(on,o);let v=bn({hash:e}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=kg(),M=s.cloneNode(!0);_&&M&&!y&&(await _({oldNode:M,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(M,s)),s.replaceChildren(),Og(),Qr({stringDOM:S,parent:s,position:"afterbegin"}),await Ss({element:s}),y||(s.style.visibility=""),f||me.set(nn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Ag()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=Rg();x&&!y&&(await x({oldNode:M,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),M.remove()),M=null,h?.(),me.set(Jt,!1)};var Fg=({route:e})=>e,Bg=e=>{Fg=e},Vg=({route:e})=>{let t=Fg({route:e});return{route:t,isRedirect:t!==e}};var Wg=({hash:e=""})=>{let t=Zi(),r=rf();return e===""?t:bn({hash:e})?e:r},jg=({hash:e=""})=>bn({hash:e})?.templateName??"",zg=({hash:e=""})=>bn({hash:e})?.restoreScroll??!0;var Hg="",Ug=!0,Cr="",Gg="",ro,Hl,xs,Ul=e=>e.replace("?","").replace("/",""),qg=e=>e.replace("#","").replace("/","").replace(".",""),Bw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Ul(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Vw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&me.getProp(Jt)&&e.preventDefault()},{passive:!1});var ya=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=me.get();if(o){globalThis.location.hash=Hg.replace("#","");return}xs||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Vg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Ul(i?.[1]??"");Gg=Cr,Cr=qg(i?.[0]??"");let c=Bw(ro??a),l=ro||Object.keys(a).length>0?`?${ro??a}`:"";ro=void 0;let p=Wg({hash:Cr}),d=jg({hash:Cr&&Cr.length>0?Cr:Zi()}),f=Cr===Gg&&l.length===0&&!Ug;e&&!f&&(Hg=`#${Cr}${l}`,await Dg({route:p,templateName:d,isBrowserNavigation:zg({hash:Cr})&&!!xs,params:c,skipTransition:!!(xs??Hl)})),e||(me.set(rn,{route:p,templateName:d}),me.set(on,c)),Hl=void 0,u.useNextLoop(()=>{Ug=!1})},Jg=()=>{ya(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{xs=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Kr(),ya()})},Yg=({url:e,params:t,skipTransition:r})=>{if(!e||me.getProp(Jt))return;Hl=r;let o=e.split("?"),n=qg(o?.[0]??""),s=Vw(t),i=Ul(o?.[1]??""),a=s??i;ro=a.length>0?a:"",xs=void 0,globalThis.location.hash=ro&&ro.length>0?`${n}?${ro}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Xg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{qh(d);let f=document.querySelector(e),h=await t();Bg(s),!(!r||!f)&&(Ad({contentId:r}),Nf({element:f}),Mg({fn:l}),Ig({fn:c}),Pg(p),xg(),jh(),Zh(o),ef({hash:i}),tf({hash:a}),Qr({stringDOM:h,parent:f,position:"afterbegin"}),Od(),ya({shouldLoadRoute:!1}),await Ss({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Jg())};var Kg=()=>be.size;var Qg=()=>G.size;var le={};To(le,{clamp:()=>rt,getDefault:()=>Kw,mq:()=>Zw,printDefault:()=>Qw,setDefault:()=>Xw});var Ao={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var de={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},ws="min",Zg="max",ql="desktop",Is="easeLinear",Cs="default",Jl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Yl=10,Es=.06,Xl="#ff0000",Kl="#14df3b",Ql=8,Zl=10,eu=1e3,tu=!1,jw=!1,zw=!1,Hw=.01,Uw=.06,eb=e=>{let t=ze({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=ze({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=ze({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Gw(e?.mq??{}),s=ze({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:ql,type:String}),i=ze({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:ws,type:String}),a=ze({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Yl,type:Number}),c=Gl(e?.sequencer?.ease,"sequencer"),l=ze({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Cs,type:String}),p=ze({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Es,type:Number}),d=ze({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Xl,type:String}),f=ze({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:Kl,type:String}),h=ze({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Ql,type:Number}),v=ze({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Cs,type:String}),y=ze({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Es,type:Number}),T=ze({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:Zl,type:Number}),S=Gl(e?.parallaxTween?.ease,"parallaxTween"),_=ze({prop:"tween.duration",value:e?.tween?.duration,defaultValue:eu,type:Number}),M=Gl(e?.tween?.ease,"tween"),x=ze({prop:"tween.relative",value:e?.tween?.relative,defaultValue:tu,type:Boolean}),C=ze({prop:"spring.relative",value:e?.spring?.relative,defaultValue:jw,type:Boolean}),w=ze({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:zw,type:Boolean}),O=ze({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Hw,type:Number}),A=ze({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Uw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:M,relative:x},spring:{relative:C,config:e?.spring?.config?{...Ao,...e.spring.config}:Ao},lerp:{relative:w,precision:O,velocity:A}}},ze=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Gw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Jl},Gl=(e,t)=>{let r=Object.keys(de).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Is};var it=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:it(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=it(Object.assign({},s),i,r):e[n]=i}),e)};function tb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Jl,defaultMq:{value:ql,type:ws},sequencer:{duration:Yl,ease:Is},scrollTrigger:{springConfig:Cs,lerpConfig:Es,markerColor:{startEnd:Xl,item:Kl}},parallax:{defaultRange:Ql,springConfig:Cs,lerpConfig:Es},parallaxTween:{duration:Zl,ease:Is},tween:{duration:eu,ease:Is,relative:tu},spring:{relative:!1,config:Ao},lerp:{relative:!1,precision:.01,velocity:.06}}}var ce=(()=>{let e=tb();return{set:n=>{e=eb(it(tb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var qw=(e="desktop")=>window.innerWidth<ce.get("mq")[e],Jw=(e="desktop")=>window.innerWidth>=ce.get("mq")[e],Yw=(e="desktop")=>ce.get("mq")[e],fe={max:qw,min:Jw,getBreackpoint:Yw};var Se=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},rt=(e,t,r)=>Math.min(Math.max(e,t),r),rb=(e,t,r)=>(1-r)*e+r*t,oo=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ms=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},ob=(e,t)=>e.map(r=>r[t]);function Xw(e){ce.set(e)}function Kw(e){return ce.get(e)}function Qw(){ce.print()}function Zw(e,t){switch(e){case"min":return fe.min(t);case"max":return fe.max(t);case"get":return fe.getBreackpoint(t)}}var H={};To(H,{createLerp:()=>fI,createMasterSequencer:()=>pI,createScrollerTween:()=>lI,createSequencer:()=>uI,createSpring:()=>hI,createStaggers:()=>mI,createTimeTween:()=>dI});var va=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Er=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),wn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),wr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},In=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var ru=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ta="radial",nr="start";var Mn="center",kn="edges",Rn="random",nb="MERGE_FROM_UP",ou="MERGE_FROM_DOWN",Oo="equal",$o="start";var Lo="center",Nn={type:Oo,each:0,waitComplete:!1,from:nr,grid:{col:1,row:1,direction:"col"}},qe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Ir=e=>e.map(t=>`${t} | `).join(""),no=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},kt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Mr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},sb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},ib=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},ab=()=>{console.warn("relative prop is not allowed inside a timeline")},cb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},lb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},ub=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},pb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},mb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},db=()=>{console.warn("setTween fail")},hb=e=>{console.warn(`label ${e} not founded`)},fb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},gb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},nu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},bb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},yb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Do=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},_a=()=>{console.warn("stagger each must be a Number ")},vb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Tb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},_b=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Sb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},xb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Cb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Eb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},wb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Ib=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Mb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},kb=()=>{console.warn("createStaggers error: items array can not be empty")},Rb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Nb=()=>{console.warn(`screateStaggers error: type should be: ${Oo} || ${nr} || ${"end"} || ${Lo}`)},Pb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Ab=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},su=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Ob=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},$b=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Lb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Db=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Fb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},An=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Bb=e=>{console.warn(`${e} value must be a string`)},Vb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Wb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},jb=e=>{console.warn(`${e} not found`)},zb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Hb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},Ub=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Gb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},qb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Jb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Ir(t)} or a Number between 0 and 100`)},Yb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Ir(t)}`)},Xb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Kb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Ir(t)}`)},Qb=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Ir(t)} or a custom css propierites like margin|line-height|...`)},Zb=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Ir(t)}`)},ey=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Ir(t)}`)},ty=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ry=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Ir(t)}`)},oy=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},ny=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},iu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Ir(t)}`)},sy=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},iy=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ay=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},cy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},ly=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},au=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Ir(r)}, es: 45deg|100px|50vw etc..`)},uy=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},py=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Vt={[de.easeLinear]:(e,t,r,o)=>r*e/o+t,[de.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[de.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[de.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[de.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[de.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[de.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[de.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[de.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[de.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[de.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[de.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[de.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[de.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[de.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[de.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[de.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[de.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[de.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[de.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[de.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[de.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[de.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[de.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[de.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[de.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[de.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[de.easeInBounce]:(e,t,r,o)=>r-Vt[de.easeOutBounce](o-e,0,r,o)+t,[de.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[de.easeInOutBounce]:(e,t,r,o)=>e<o/2?Vt[de.easeInBounce](e*2,0,r,o)*.5+t:Vt[de.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var mt=e=>e in Vt?Vt[e]:(Do(e),Vt[ce.get("tween").ease]);var my=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",cu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),dy=e=>/^\d+\.\d+$|^\d+$/.test(e),Ae=(e,t)=>{let r=new RegExp(`^${my(t)}$`,"i");return(e.match(r)||[]).length},sr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},lu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),uu=(e,t)=>e.some(r=>{let o=new RegExp(`^${my(r)}$`,"i");return(t.match(o)||[]).length});var hy=e=>e&&(Ae(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:Ae(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:Ae(e,b.PROP_ROTATE)?b.PROP_ROTATE:Ae(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:Ae(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:Ae(e,b.PROP_OPACITY)?b.PROP_OPACITY:Ae(e,b.PROP_SCALE)?b.PROP_SCALE:Ae(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:Ae(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:Ae(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),fy=e=>{if(e){if(sr(e,b.PX))return b.PX;if(sr(e,b.VH))return b.VH;if(sr(e,b.VW))return b.VW}return""},Sa=e=>Ae(e,b.POSITION_TOP)?b.POSITION_TOP:Ae(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:Ae(e,b.POSITION_LEFT)?b.POSITION_LEFT:Ae(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",gy=e=>sr(e,b.PX)?b.PX:sr(e,b.VH)?b.VH:sr(e,b.VW)?b.VW:sr(e,b.WPERCENT)?b.WPERCENT:sr(e,b.HPERCENT)?b.HPERCENT:sr(e,b.DEGREE)?b.DEGREE:b.PX;var Wt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ca=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||sb(e),o||ib(t),r&&o},so=e=>{let t=u.checkType(Number,e);return!t&&e&&Cb(e),t?e:ce.get("sequencer").duration},Ea=e=>{let t=u.checkType(Number,e);return!t&&e&&wb(e),t&&e?e:1},by=e=>{let t=e&&e in Vt;return!t&&e&&Do(e),t?e:ce.get("sequencer").ease},yy=e=>{let t=e&&e in Vt;return!t&&e&&Do(e),t?mt(e):mt(ce.get("parallaxTween").ease)},vy=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Ib(e),o||Mb(t),r&&o},Ty=e=>{if(!e)return;let t=u.checkType(Number,e);return t||_a(),t},_y=e=>{if(!e)return;let r=[nr,"end",Mn,kn,Rn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||xb(e),s},mu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||vb(e),t},Sy=e=>{if(!e)return;let r=[Ta,"row","col"].includes(e);return r||_b(),r},xy=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Tb(),t},Cy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||kb(),t},Ey=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],wy=e=>{if(!e)return;let r=[Oo,$o,"end",Lo].includes(e);if(!r){Nb();return}return r};var io=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Ab(e,t),r?e:ce.get(t).relative},wa=e=>{let t=e&&e in Vt;return!t&&e&&Do(e),t?mt(e):mt(ce.get("tween").ease)},Ia=e=>{let t=e&&e in Vt;return!t&&e&&Do(e),t?e:ce.get("tween").ease},du=e=>{let{config:t}=ce.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&nu(e),!s&&r&&yb(e),s?t[e]:t.default},Iy=e=>{let{config:t}=ce.get("spring"),r=e&&e in t;return!r&&e&&nu(e),r},hu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&bb(),t?e:{}},fu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Eb(e),o?r:ce.get("tween").duration},Rt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&su(e,t),r&&e===!0},pe=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&su(e,t),o?e:r},Ma=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Ob(e,t),o?e:r},ir=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&$b(e,t),o?e:r},at=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Lb(e,t),o?e:r},ka=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Db(),t?e:ce.get("lerp").velocity},Ra=e=>{let t=u.checkType(Number,e);return!t&&e&&Fb(),t?e:ce.get("lerp").precision},My=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Bb(t),r},Rs=e=>{let t=u.checkType(Number,e);return!t&&e&&Wb(),t?e:void 0},Ns=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Vb(),t},ky=(e,t)=>{e===-1&&jb(t)},ao=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&ly(r,e),o?e:t},Ry=e=>{let t=u.checkType(Function,e);return!t&&e&&zb(e),t?e:({resolve:r})=>{r()}},Ny=e=>{let t=u.checkType(Array,e);return!t&&e&&ub(e),t},Py=e=>{let t=u.checkType(String,e);return!t&&e&&pb(e),t},On=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},gu=e=>u.checkType(Element,e)?e:document.querySelector(e),Ps=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Hb(e,t),o?e:b.DIRECTION_VERTICAL},bu=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Ub(t),i?e:null},Ay=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Gb(),t?e:void 0},Oy=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&qb(),t?e:{}},$y=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Jb(e,t),r?e:b.ALIGN_CENTER},Ly=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&Yb(e,t),r?e:!1},yu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Xb(e,t),o?e:r},Dy=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Kb(t,r),o?t:b.TYPE_PARALLAX},Fy=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=dy(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&oy(e),n?10-e:10-ce.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&ny(e),o?e:"0px"}})(),Fo=(e,t,r)=>{let o=ce.get("defaultMq").value;if(!e)return o;let n=ce.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&iu(e,s,t,r),i?e:o},Bo=(e,t,r)=>{let o=ce.get("defaultMq").type;if(!e)return o;let n=[Zg,ws],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&iu(e,n,t,r),s?e:o},By=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&Qb(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&ay(),(r||o)&&e!==b.PROP_TWEEN&&cy(),a&&sy();let c=a?b.PROP_VERTICAL:e,l=hy(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Vy=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||Zb(e,t);let o=r?e:b.EASE_LERP;return r?e:o},Na=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&ey(e,r,t),o?e:b.EASE_LERP},Wy=(e,t)=>{let r=t===b.TYPE_PARALLAX?ce.get("parallax").springConfig:ce.get("scrollTrigger").springConfig;if(!e)return r;let o=ce.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&ry(e,n),s?e:r},jy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&iy();let o=t===b.TYPE_PARALLAX?ce.get("parallax").lerpConfig:ce.get("scrollTrigger").lerpConfig;return r?e:o},zy=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=lu(r,e);return n||au(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=lu([b.DEGREE],e);return n||au(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=cu(e);return n||py(e,t),n?e:"0"}let o=cu(e);return o||uy(t),o?e:"0"};var Pa=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Nt=e=>({type:wy(e?.stagger?.type)?e.stagger.type:Nn.type,each:Ty(e?.stagger?.each)?e.stagger.each:Nn.each,from:_y(e?.stagger?.from)?e?.stagger?.from:$o,grid:{col:mu(e?.stagger?.grid?.col)?e.stagger.grid.col:Nn.grid.col,row:mu(e?.stagger?.grid?.row)?e.stagger.grid.row:Nn.grid.row,direction:Sy(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:xy(e?.stagger?.waitComplete)?e.stagger.waitComplete:Nn.waitComplete}),ar=(e,t)=>e.length>t.length?e:t;var As=e=>e%2,eI=e=>Math.floor(Math.random()*e),tI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},rI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Pa(s);if(n===Rn)return{index:e,frame:o[eI(o.length)]};if(n===nr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Mn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?As(t)===0&&a-e===1?{index:e,frame:0}:As(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===kn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?As(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:As(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:As(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Le(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Hy=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ms(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...ob(o,a)],[])].flat()}else return e},Uy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Hy(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=Hy(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Ms(c,d),h=f[0];return h.forEach((y,T)=>{let{index:S,frame:_}=rI(T,f[0].length,r,tI(h,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var oI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),nI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Aa(o,r+f,l)&&c.push(o[r+f][l]),Aa(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Aa(o,r-f,l)&&c.push(o[r-f][l]),Aa(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),Aa=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,vu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ms(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=oI(s,o,n),a=nI(i,o,n,s),c=i.reduce((h,v,y)=>{let T=[...i[y],...a[y]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?nb:ou)===ou?c.reduce((h,v,y)=>{if(y<n)return h;if(y===n){let T=[...c[y]];return h.push(T),h}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return h.push(S),h}},[]):c.reduce((h,v,y)=>{if(y>n)return h;if(y===n){let T=[...c[y]];return h.push(T),h}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return h.push(S),h}},[]).toReversed()).reduce((h,v)=>v.length===0?h:[...h,v],[])}};var sI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=vu(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=Pa(r.each),v=d*h;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=vu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},iI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[nr,"end",Mn,kn,Rn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Sb(),r.from=nr),Uy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Pt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Ta?sI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):iI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var $n=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Ln=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},cr=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var co=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return Mr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Dn=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return Mr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=(e,t)=>Object.keys(e).map(r=>{if(!Wt(t[r])||!Wt(e[r]))return Mr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),kr=e=>Object.keys(e).map(t=>{if(!Wt(e[t]))return Mr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Bn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var lo=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Vn=(e,t,r,o)=>(u.checkType(Number,e)||_a(),e>0&&t&&(r.length>0||o.length>0));var Oa=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Oe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Wn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),jn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var zn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Tu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Gy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=rb(s,i,r/t*60),c=Se(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Rr=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;constructor(t){this.#n=Nt(t??{}),this.#t=io(t?.relative,"lerp"),this.#i=ka(t?.velocity),this.#l=Ra(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#S=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=qe,this.#_=qe;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Gy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Oe(this.#e,"currentValue");if(this.#m||$n({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#S}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Oe(this.#e,"toValue");Ln({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#S});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#R(){if(Vn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();lo("lerp",t);let r=ar(this.#h,this.#a);if(this.#n.grid.col>r.length){kt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#x&&(this.#y=!0,await this.#R(),this.#y=!1),Bn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=wn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=va(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Oa((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=io(s,"lerp"),this.#i=ka(o),this.#l=Ra(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=co(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=Dn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#S=!0,!oo(t,r))return no("lerp goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!1;let o=kr(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#S=!1;let o=kr(t);this.#e=zn(o,this.#e);let{reverse:n}=this.#E(r??{});Rt(n,"reverse")&&(this.#e=wr(t,this.#e)),this.#e=In(this.#e,this.#t),this.#e=Er(this.#e)}#N(t,r,o={}){this.#e=zn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Rt(n,"reverse")&&(this.#e=wr(r,this.#e)),this.#e=In(this.#e,this.#t),Rt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Er(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return jn(this.#e)}getToNativeType(){return Wn(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=ka(t),this.#T=it(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Ra(t),this.#T=it(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#h,this.#g);return this.#h=r,this.#g=n,()=>this.#h=o(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var $a=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Os=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=yy(t?.ease),this.#t=so(t?.duration),this.#i=Nt(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=ar(this.#s,this.#u);if(this.#i.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:qe,fastestStagger:qe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,v=this.#n(t,f,h,this.#t);return{...n,currentValue:Se(v)}});let o=Oe(this.#l,"currentValue");u.useNextTick(()=>{$a({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=co(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var $s=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var qy=(e,t)=>Object.keys(e).map(r=>Wt(e[r])?{prop:r,toValue:e[r],ease:mt(t)}:(Mr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:mt(t)})),Jy=(e,t)=>Object.keys(e).map(r=>Wt(e[r])?{prop:r,fromValue:e[r],ease:mt(t)}:(Mr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:mt(t)})),Yy=(e,t,r)=>Object.keys(e).map(o=>!Wt(t[o])||!Wt(e[o])?(Mr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:mt(r)});var He={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var _u={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Xy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[_u[o].get]:n},void 0),Ky=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var Qy=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((S,{start:_,end:M,values:x},C)=>{let w=x.find(({prop:P})=>P===o.prop);if(!w||!w?.active||Object.keys(S).length>0||o.settled)return S;let{prop:O,toValue:A,fromValue:L,ease:I}=w;return Ky(e,C,O,r)?{toValue:A,fromValue:L,start:_,end:M,ease:I}:S},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,v=r>=s&&r<=i?l(r-s,d,p-d,f):h,y=Number.isNaN(v)?h:v,T=Se(y);return{...o,currentValue:T,settled:!0}});var Su=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Xy(e,o,c,s);return!p&&p!==0?a:{...a,[_u[s].set]:p}});return{...r,values:i}});var xu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var La=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=xu(a,"start");return xu(c,"priority")};var Da=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Ls=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=so(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:by(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=Nt(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=ar(this.#d,this.#l);if(this.#g.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:qe,fastestStagger:qe});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=He.NONE}){if(o){this.#S({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#S({partial:t,isLastDraw:r,direction:n}))}#S({partial:t=0,isLastDraw:r=!1,direction:o=He.NONE}){this.#a&&(this.#o=t,this.#v(t)),!this.#a&&this.#o&&(!o||o===He.NONE)&&(this.#f=t>=this.#o?He.FORWARD:He.BACKWARD),!this.#a&&(o===He.BACKWARD||o===He.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=Qy({timeline:this.#t,valuesState:this.#n,partial:t});let n=Oe(this.#n,"currentValue");$a({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#v(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:He.FORWARD},s={shouldFire:t<=o,direction:He.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===He.FORWARD&&t>o&&this.#o<=o,s=this.#f===He.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:Se(n*r),end:Se(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=vy(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(ce.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ca({start:n,end:s}))return this;let a=qy(t,i),c=Da({data:a,values:this.#n}),l=Object.keys(t),p=La({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=Su({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ca({start:n,end:s}))return this;let a=Jy(t,i),c=Da({data:a,values:this.#n}),l=Object.keys(t),p=La({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=Su({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ca({start:s,end:i}))return this;if(!oo(t,r))return no("sequencer goFromTo:",t,r),this;let c=Yy(t,r,a),l=Da({data:c,values:this.#n});return this.#t=La({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||fb(t),n||gb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#d,this.#c);return this.#d=r,this.#c=n,()=>this.#d=o(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Zy=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,v=a+h*1/s,y=Se(v),T=Math.abs(h)<=.1,S=t===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:y,velocity:h,settled:!1}});var jt=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;constructor(t){this.#n=Nt(t??{}),this.#t=io(t?.relative,"spring"),this.#i=du(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#S=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=qe,this.#k=qe;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#d=!0,this.#r=Zy({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Oe(this.#r,"currentValue");if(this.#g||$n({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=Oe(this.#r,"toValue");Ln({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#_(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#A(){if(Vn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();lo("spring",t);let r=ar(this.#a,this.#p);if(this.#n.grid.col>r.length){kt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#A(),this.#v=!1),Bn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=wn(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#S||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#S=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#S&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#S=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=va(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Oa((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=it(this.#r,this.#e)}#O(t){let o=ce.get("spring").config,n=Iy(t?.config)?o?.[t?.config??"default"]??Ao.default:this.#y.configProps,s=hu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=co(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Dn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!oo(t,r))return no("spring goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=kr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=kr(t);this.#r=zn(o,this.#r);let{reverse:n}=this.#O(r??{});Rt(n,"reverse")&&(this.#r=wr(t,this.#r)),this.#r=In(this.#r,this.#t),this.#r=Er(this.#r)}#E(t,r,o={}){this.#r=zn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(Rt(n,"reverse")&&(this.#r=wr(r,this.#r)),this.#r=In(this.#r,this.#t),Rt(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=Er(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#r,"currentValue")}getInitialData(){return Oe(this.#e,"currentValue")}getFrom(){return Oe(this.#r,"fromValue")}getTo(){return Oe(this.#r,"toValue")}getFromNativeType(){return jn(this.#r)}getToNativeType(){return Wn(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=hu(t);this.#i={...this.#i,...r},this.#y=it(this.#y,{configProps:r})}updateConfig(t){this.#i=du(t),this.#y=it(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#a,this.#o);return this.#a=r,this.#o=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var ev=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Se(s)}}return{...n,currentValue:n.fromValue}});var Nr=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;constructor(t){this.#n=wa(t?.ease),this.#t=fu(t?.duration),this.#i=io(t?.relative,"tween"),this.#l=Nt(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#S=0,this.#v=0,this.#y=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:Ia(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=qe,this.#R=qe;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#x-this.#S),this.#S=t-this.#x-this.#v,Math.round(this.#S)>=this.#t&&(this.#S=this.#t),this.#e=ev({values:this.#e,timeElapsed:this.#S,duration:this.#t,ease:this.#n});let r=Math.round(this.#S)===this.#t,o=Oe(this.#e,"currentValue");if(this.#m||$n({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Ln({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(Vn(this.#l.each,this.#y,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();lo("tween",t);let r=ar(this.#h,this.#a);if(this.#l.grid.col>r.length){kt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#R=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#_||(this.#s=t,this.#c=r,this.#y&&(this.#_=!0,await this.#N(),this.#_=!1),Bn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=wn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=wa(o),this.#i=io(s,"tween"),this.#t=fu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=co(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Dn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!oo(t,r))return no("tween goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=kr(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=kr(t),n=r?{...r,duration:1}:{duration:1};this.#e=Tu(o,this.#e);let{reverse:s}=this.#D(n);Rt(s,"reverse")&&(this.#e=wr(t,this.#e)),this.#e=ru(this.#e,this.#i),this.#e=Er(this.#e)}#B(t,r,o={}){this.#e=Tu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Rt(n,"reverse")&&(this.#e=wr(r,this.#e)),this.#e=ru(this.#e,this.#i),Rt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Er(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return jn(this.#e)}getToNativeType(){return Wn(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=wa(t),this.#w=it(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#h,this.#g);return this.#h=r,this.#g=n,()=>this.#h=o(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var aI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=Se(o*d),h=Se(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Se(p),end:Se(i+p)}},cI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===$o)return{start:0,end:Se(e-(i-c))};if(n===Lo){let l=(i-c)/2;return{start:Se(l),end:Se(e-l)}}return n==="end"?{start:Se(i-c),end:Se(e)}:{start:0,end:e}},tv=e=>{let t=Ey(e?.items),r=Nt(e),o=so(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,v)=>({item:h,start:0,end:o,index:v}));if(!Cy(t))return i;r.grid?.col>t.length&&(kt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Pb(n),s=1);let{staggerArray:a}=Pt({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:qe,fastestStagger:qe}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Rb(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,v)=>h-v),d=p.length;return c.map(({item:h,frame:v})=>{let y=p.indexOf(v),T=s*d/n,{start:S,end:_}=r.type===Oo?aI({each:s,duration:o,numItem:d,index:y,eachByNumItem:T}):r.type===$o||r.type==="end"||r.type===Lo?cI({duration:o,numItem:d,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:S,end:_,index:y}})};function lI(e){return new Os(e)}function uI(e){return new Ls(e)}function pI(){return new $s}function mI(e){return tv(e)}function dI(e){return new Nr(e)}function hI(e){return new jt(e)}function fI(e){return new Rr(e)}var we={};To(we,{createAsyncTimeline:()=>bI,createSyncTimeline:()=>gI});var Q=()=>{},Fa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ba=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var uo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?Ba({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Cu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Q;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Ds=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=Ea(t?.repeat),this.#t=pe(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=pe(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=pe(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=pe(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=pe(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#S=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#A=0,this.#R=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=Ba({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:v}=a,y={...h};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,ab()),this.#E.push({id:v,action:p});let M=r.find(({id:C,action:w})=>C===v&&w===p),x={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,y)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,y)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,f,y)),add:()=>M?new Promise(C=>C({resolve:!0})):new Promise(C=>{if(_){C({resolve:!0});return}let w=this.getDirection();l({direction:w,loop:this.#m}),C({resolve:!0})}),addAsync:()=>{this.#k=!0;let C=this.#w;return M?new Promise(w=>w({resolve:!0})):new Promise((w,O)=>{if(_){w({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(C===this.#w){w({resolve:!0});return}O()}})})},createGroup:()=>new Promise(C=>C({resolve:!0})),closeGroup:()=>new Promise(C=>C({resolve:!0})),label:()=>new Promise(C=>C({resolve:!0})),suspend:()=>{if(M)return new Promise(O=>O({resolve:!0}));let C=u.checkType(Boolean,l());C||cb(l);let w=C?l():!0;return new Promise(O=>{!_&&w&&(this.#T=!0),O({resolve:!0})})}};return new Promise((C,w)=>{let O=_?!1:h?.delay,A=this.#w;if(O){let L=u.getTime();requestAnimationFrame(()=>{this.#L({start:L,deltaTimeOnpause:0,delay:O,mainReject:w,mainResolve:C,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}Cu({mainReject:w,mainResolve:C,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:L=>this.#Y(L),currentSessionId:()=>this.#w,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=uo({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,v)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#_=!0,this.#B&&Xo.add(()=>{Ct.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#y&&(r=p-this.#R),d-r>=o||this.#_||this.#x){Cu({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#S)&&this.#H(),this.#S=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Q;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(lb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Ns(t))return this;o.delay=Rs(o?.delay);let n=this.#d?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Ns(t))return this;o.delay=Rs(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Ns(t))return this;o.delay=Rs(o?.delay);let n=uo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Ns(t))return this;n.delay=Rs(n?.delay);let s=this.#d?uo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Q){let r=ao(t,()=>{},"timeline add function");return this.#f?(An("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Ry(t);return this.#f?(An("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(An("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(An("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(An("label"),this):My(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=uo({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Ny(r),n=Py(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(mb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=uo({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{db()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#v&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&ky(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#v&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#S=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#S=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#H(),this.#v=!1,this.#i||this.#$()}pause(){this.#y||(this.#y=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#_?He.NONE:this.#v?He.BACKWARD:He.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Fs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;constructor(t={}){this.#n=so(t?.duration),this.#t=pe(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Ea(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#S=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#A=void 0,this.#R=void 0}#O(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#y||(this.#s=rt(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#S=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#v&&!this.#S&&this.#o>this.#g&&(this.#S=!0,this.#f++,this.#o=0,this.#k.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||hb(t),r.time}#b(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#v=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#v=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();lo("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?He.NONE:this.#p?He.BACKWARD:He.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function gI(e){return new Fs(e)}function bI(e){return new Ds(e)}var Je={};To(Je,{createParallax:()=>xI,createScrollTrigger:()=>CI});var yI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function rv({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[b.ON_LEAVE]:()=>{s&&s()},[b.ON_ENTER_BACK]:()=>{n&&n()},[b.ON_LEAVE_BACK]:()=>{i&&i()},[b.ON_ENTER]:()=>{o&&o()},[b.ON_NOOP]:()=>{}})[yI({prevValue:e,value:t,maxVal:r})]()}var vI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},TI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},_I=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},SI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},ov=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=vI({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=TI({screen:n}),v=_I({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),y=SI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ce.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var nv=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ce.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var Va=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#S=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#H=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#S=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new jt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=nv({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?xt(this.#f).top:xt(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#S(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===b.DIRECTION_VERTICAL?xt(this.#a).top-this.#i:xt(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===b.DIRECTION_VERTICAL?xt(this.#o).left:xt(this.#o).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:rt(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#H){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?xt(this.#a).top:xt(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var sv=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},iv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},av=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Eu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),cv=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},lv=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,uv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),pv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=fy(r);if(r&&!o)return sv(),Eu();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return iv(),Eu();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return av(),Eu();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>uu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>uu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},mv=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=pv(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===b.PX?{value:f*p,additionalVal:a,position:Sa(c)}:{value:e*f*p,additionalVal:a,position:Sa(c)}},dv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=pv(a,s),h=String(c).charAt(0)==="-"?-1:1,y=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=Sa(d),S=T===b.POSITION_TOP||T===b.POSITION_LEFT;return l===b.PX?{value:cv(n?{invert:!0,endValInNumber:y,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:S}:{invert:!1,endValInNumber:y,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:S}),additionalVal:p,position:T}:{value:lv(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:y,isNegative:h,startPoint:r,isFromTopLeft:S}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:y,isNegative:h,startPoint:r,isFromTopLeft:S}),additionalVal:p,position:T}},wu=(e,t,r,o)=>{let n=String(t);return Ae(n,b.PLUS_HEIGHT_HALF)?e+r/2:Ae(n,b.PLUS_HEIGHT)?e+r:Ae(n,b.PLUS_WIDTH_HALF)?e+o/2:Ae(n,b.PLUS_WIDTH)?e+o:Ae(n,b.MINUS_HEIGHT_HALF)?e-r/2:Ae(n,b.MINUS_HEIGHT)?e-r:Ae(n,b.MINUS_WIDTH_HALF)?e-o/2:Ae(n,b.MINUS_WIDTH)?e-o:e},hv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},fv=(e,t)=>e===b.PROP_OPACITY?1-t:-t,Iu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var po=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#z;#ve;#de;#he;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#S=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#A=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=pe(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=pe(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=pe(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=pe(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Ma(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Ma(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Ma(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?bu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?bu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Ay(t?.dynamicRange),this.#re=pe(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=ao(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=ao(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=ao(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=ao(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=ao(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=$y(t?.align),this.#ue=Ly(t?.onSwitch),this.#ce=pe(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=yu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=yu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=pe(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Oy(t?.tween);let r=this.#X?.getType&&this.#X.getType()===b.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===b.TWEEN_TWEEN;this.#q=On(t?.item,!1),this.#J=On(t?.scroller,!0),this.#j=On(t?.screen,!0),this.#Z=gu(t?.trigger),this.#te=gu(t?.applyTo),this.#V=Ps(t?.direction,"Parallax/Scrolltrigger"),this.#ne=pe(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=pe(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=Dy(t?.type),this.#ve=ir(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Fo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=Bo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=By(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Fy(t?.range,this.#z),this.#ye=pe(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&ty(),this.#Ce=r?b.EASE_LERP:Vy(t?.easeType),this.#we=Wy(t?.springConfig,this.#z),this.#Ie=jy(t?.lerpConfig,this.#z),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ae=this.#Ce===b.EASE_SPRING?new jt:new Rr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=Iu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#o=Iu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new Va,fe[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=On(t,!0)}setScreen(t){this.#j=On(t,!0)}setDirection(t){this.#V=Ps(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Fo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=Bo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===b.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=b.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=zy(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=gy(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=mv(t,this.#Y,this.#V);if(this.#M=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#P=wu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#H=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=dv(t,this.#H,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=wu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#ze(),this.#M&&(this.#P-=this.#u)}#ze(){if(this.#W){let{startMarker:t,endMarker:r}=ov({startMarker:this.#S,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#S=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=So(this.#Z)?.x??0,o=So(this.#Z)?.y??0,n=So(this.#Z)?.z??0),t.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(he(t).top):Math.trunc(he(t).top)-he(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(he(t).left):Math.trunc(he(t).left)-he(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(he(this.#j).top):Math.trunc(xt(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(he(this.#j).top):Math.trunc(xt(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-he(this.#J).top:-he(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&fe[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#y=void 0,this.#w=!0,fe[this.#he](this.#de)?this.#ye?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!fe[this.#he](this.#de)||!t)return;this.#R=!0;let o=this.#He(t);if(this.#ye)this.#xe(o);else{this.#Se(o);let n=this.#A||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#_e({forceRender:!0})}#He(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#Se(t){if(!fe[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=uv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#z===b.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===b.TYPE_SCROLLTRIGGER?this.#d=Se(this.#Ue()):this.#le===b.PROP_OPACITY?this.#d=Se(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?Se(this.#Je()/2):Se(this.#Ye()/2);let r=this.#ce&&this.#z!==b.TYPE_SCROLLTRIGGER?fv(this.#le,this.#d):this.#d;this.#d=this.#z===b.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!fe[this.#he](this.#de)||(this.#Se(t),!this.#k&&!this.#w&&this.#z===b.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#z===b.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){fe[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#y&&!t||!this.#A&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#A),this.#le===b.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#d,this.#w=!1):this.#ke(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-rt(n,0,r):-rt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&rv({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ge(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case b.VW:return this.#e/100*-t;case b.VH:return this.#p/100*-t;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return rt(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return hv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#y=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case b.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case b.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case b.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case b.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case b.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case b.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case b.PROP_OPACITY:return{opacity:`${t}`};case b.PROP_SCALE:{let s=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case b.PROP_SCALE_X:{let s=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case b.PROP_SCALE_Y:{let s=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#S&&this.#S?.remove?.(),this.#v&&this.#v?.remove?.(),this.#S=void 0,this.#v=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function xI(e){return new po({...e,type:b.TYPE_PARALLAX})}function CI(e){return new po({...e,type:b.TYPE_SCROLLTRIGGER})}var Mu=window.innerHeight,ku=document.body.offsetHeight,mo=!1,Ru=!0,zt=window.scrollY,Bs=!0,Ht=!1,Nu=()=>{},Pu=()=>{},ja=()=>{},Wa,gv=()=>{document.body.classList.remove("is-whelling")},EI=()=>{document.body.classList.add("is-whelling")};le.setDefault({usePassive:!1});var wI=({velocity:e,rootElement:t})=>{let r=H.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Wa=t;let o=r.subscribe(({scrollValue:d})=>{Ht||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(d=>{if(Ht)return;d.preventDefault(),Bs=!1,EI();let f=d.spinY??0,h=le.clamp(f*e+zt,0,ku-Mu);zt=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{Ru&&d()}),i=u.useMouseWheel(u.debounce(()=>{gv()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;zt=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!Bs)return;let d=window.scrollY;zt=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{Ht||(gv(),r.stop(),zt=window.scrollY,Bs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,Mu=window.innerHeight,ku=document.body.offsetHeight});return p.observe(t),{destroy:()=>{mo=!1,zt=0,Bs=!0,Ht=!1,Wa&&(p.unobserve(Wa),p.disconnect()),r?.stop(),r?.destroy(),r=null,Wa=null,o(),c(),a(),n(),l(),i(),s(),Nu=()=>{},Pu=()=>{},ja=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},za=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{mo||(zt=window.scrollY,mo=!0,Ht=!1,Mu=window.innerHeight,ku=document.body.offsetHeight,Ru=!0,Bs=!1,{destroy:Nu,stop:Pu,update:ja}=wI({velocity:e,rootElement:t}))},lr=()=>{!mo||Ht||(Pu(),Ht=!0)},Ut=()=>{!mo||!Ht||(Ht=!1)},Vs=()=>{!mo||!Ht||(ja(),zt=window.scrollY,Ht=!1)},Au=()=>{mo&&ja()},Ou=()=>{Nu()},bv=()=>{Ru=!0};var yv=()=>mo;var vv="easeOutQuad",Ws=new Nr({ease:vv,data:{val:0}}),Ha=!1,$u=!1;Ws.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Au()});var Lu=()=>{$u&&(document.body.style.overflow=""),Ws?.updateEase?.(vv),Vs()},Du=()=>{Ha&&(Ws.stop(),Lu())};u.useMouseWheel(()=>{Du()});u.useMouseDown(()=>{Du()});u.useTouchStart(()=>{Du()});var Pr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?jc(t)||u.checkType(Number,t)?jc(t)?he(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=ir(r?.duration,"bodyScroll: duration",500);return $u=pe(r?.overflow,"bodyScroll: overflow",!1),Ia(r?.ease)&&Ws?.updateEase?.(r?.ease),$u&&(document.body.style.overflow="hidden"),new Promise(s=>{Ha=!0,lr(),Ws.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Lu(),Ha=!1,s(!0)}).catch(()=>{Lu(),Ha=!1,s(!0)})})}};var js={END:"END",START:"START",CENTER:"CENTER"};var II=e=>{switch(e){case js.END:return"align-items:flex-end;";case js.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Tv=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=fe.getBreackpoint(r),h="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=II(d),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,M=document.createElement("div");M.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),M.append(x),e.prepend(M)};var zs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=pe(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=ir(t?.threshold,"HorizontalScroller: threshold",30),this.#a=pe(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Fo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Bo(t?.queryType,"queryType","horizontalScroller"),this.#o=pe(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=pe(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=pe(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=pe(t?.ease,"HorizontalScroller: ease",!1),this.#S=Na(t?.easeType??"","HorizontalScroller"),this.#v=pe(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=pe(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=pe(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=pe(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=ir(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=ir(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():js.START,this.#R=at(t?.onEnter,"HorizontalScroller: onEnter",Q),this.#O=at(t?.onEnterBack,"HorizontalScroller: onEnterBack",Q),this.#E=at(t?.onLeave,"HorizontalScroller: onLeave",Q),this.#N=at(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Q),this.#P=at(t?.afterInit,"HorizontalScroller: afterInit",Q),this.#b=at(t?.afterRefresh,"HorizontalScroller: afterRefresh",Q),this.#D=at(t?.afterDestroy,"HorizontalScroller: afterDestroy",Q),this.#B=at(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&Tv({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{fe[this.#f](this.#h)&&(lr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{fe[this.#f](this.#h)&&(lr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Ut(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Fa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>Fe(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!fe[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=Fe(r),i=se(this.#C),a=So(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=h?.querySelector(`.${this.#M}--in-center`),y=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),S=h?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,M=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:d+f/o-p/o,C=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),w=(()=>{let A=s/l,L=(s-s/l)/o;return A+L+C})(),O=w/2+M;this.#v&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${x}px`),v&&(v.style.height=`${O}px`),y&&(y.style.height=`${O}px`),y&&(y.style.top=`${O}px`),T&&(T.style.height=`${C}px`),S&&(S.style.height=`${w+_}px`),h&&(h.style.height=`${C}px`)}),t(!0))})})}#z(){if(!this.#L||!fe[this.#f](this.#h))return;let t=new po({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#k,easeType:this.#S,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=he(this.#L).top,this.#be()}#ve(){Fa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!fe[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{Fa(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=he(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#H=[],this.#P=Q,this.#b=Q,this.#B=Q,this.#R=Q,this.#O=Q,this.#E=Q,this.#N=Q,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=Q,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&fe[this.#f](this.#h)?t&&this.refresh():!this.#$&&fe[this.#f](this.#h)?this.#ve():this.#$&&!fe[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var Hs=new Map,Ua=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},MI=e=>{let t=new Nr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Ar={subscribe:n=>{if(!Ua(n))return()=>{};if(Hs.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=MI(n);return Hs.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Hs.delete(n)}},reset:n=>{Ua(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ua(n))return new Promise(c=>c(!0));let s=Hs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=se(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ua(n))return new Promise(l=>l(!0));let s=Hs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=se(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Q,this.#h=Q,this.#f=Q,this.#o=Q,this.#g=Q,this.#m=Q,this.#x=Q,this.#S=Q,this.#v=Q,this.#y=Q,this.#T=Q,this.#k=Q,this.#_={},this.#w=Q,this.#A=Q,this.#R=Ps(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Na(t?.easeType??"","SmoothScroller"),this.#N=Fo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Bo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=pe(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=ir(t?.speed,"SmoothScroller: speed",60),this.#F=pe(t?.drag,"SmoothScroller: drag",!1),this.#L=at(t?.onTick,"SmoothScroller: onTick",Q),this.#C=at(t?.onUpdate,"SmoothScroller: onUpdate",Q),this.#Y=at(t?.onSwipe,"SmoothScroller: onSwipe",Q),this.#ee=pe(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=pe(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=pe(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=at(t?.afterRefresh,"SmoothScroller: afterRefresh",Q),this.#M=at(t?.afterInit,"SmoothScroller: afterInit",Q),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===b.EASE_SPRING?this.#_=new jt:(this.#_=new Rr,this.#_.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#S=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#te(t)),this.#y=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Ut()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),fe[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:Fe(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:se(this.#D),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!fe[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=rt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){fe[this.#P](this.#N)&&(t===this.#b||ss(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||ss(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(fe[this.#P](this.#N)&&(this.#ie(),t===this.#b||ss(this.#b,t))){this.#r=!1,n?.(),lr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=rt(a,-1,1)*this.#I*rt(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return fe[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){fe[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=rt(t,0,100),this.#t=rt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){fe[this.#P](this.#N)&&(t===this.#b||ss(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#R===b.DIRECTION_VERTICAL?r:t}refresh(){if(!fe[this.#P](this.#N)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#S(),this.#v(),this.#y(),this.#T(),this.#w(),this.#A(),this.#k(),this.#_?.destroy(),this.#_=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=Q,this.#C=Q,this.#H=Q,this.#M=Q,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var _v=!1,kI=new Set(["scrollerN0","scrollerN1"]),Sv=()=>{let e=document.querySelector("#root");e&&(za({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{lr(),bv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;_v=kI.has(t),u.useFrameIndex(()=>{if(_v){Ou();return}!yv()&&za({rootElement:e}),Vs()},30)}))};function xv(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},At=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Gt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var Cv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Ev,wv={},RI="./asset/svg/icons/",NI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],ur=()=>Ev,dt=()=>wv,Iv=async()=>{let{success:e,data:t}=await At({source:"./data/common.json"});e||console.warn("data fail to load"),Ev=t},Mv=async()=>{let e=NI.map(({name:r,source:o})=>te({source:`${RI}${o}`}).then(n=>({name:r,result:n})));wv=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var kv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Rv=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var PI=e=>e<10?`0${e}`:`${e}`,Nv=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Rv({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${PI(l)}</span
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
    </div>`};var Pv=m.createComponent({tag:"layout-links",component:Nv,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Pv]);var Ga=async({props:e})=>{let{source:t}=e,{data:r}=await At({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Av=()=>g`
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
    `;var qa=m.createComponent({tag:"doc-container",component:Av});var Ov=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Ja=m.createComponent({tag:"doc-title",component:Ov,state:{}});var $v=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Ya=m.createComponent({tag:"doc-title-small",component:$v,state:{}});var rT=IC(tT(),1);var Gu=rT.default;var oT="[A-Za-z$_][0-9A-Za-z$_]*",SM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],xM=["true","false","null","undefined","NaN","Infinity"],nT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],sT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],iT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],CM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],EM=[].concat(iT,nT,sT);function aT(e){let t=e.regex,r=($,{after:B})=>{let V="</"+$[0].slice(1);return $.input.indexOf(V,B)!==-1},o=oT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:($,B)=>{let V=$[0].length+$.index,q=$.input[V];if(q==="<"||q===","){B.ignoreMatch();return}q===">"&&(r($,{after:V})||B.ignoreMatch());let ee,ue=$.input.substring(V);if(ee=ue.match(/^\s*=/)){B.ignoreMatch();return}if((ee=ue.match(/^\s+extends\s+/))&&ee.index===0){B.ignoreMatch();return}}},a={$pattern:oT,keyword:SM,literal:xM,built_in:EM,"variable.language":CM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},M=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,y,T,{match:/\$\d+/},d];f.contains=M.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(M)});let x=[].concat(_,f.contains),C=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),w={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:C},O={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...nT,...sT]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[w],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function P($){return t.concat("(?!",$.join("|"),")")}let k={match:t.concat(/\b/,P([...iT,"super","import"].map($=>`${$}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},D={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},F={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},w]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",R={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[w]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:C,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,y,T,_,{match:/\$\d+/},d,A,{scope:"attr",match:o+t.lookahead(":"),relevance:0},R,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:C}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[w,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},D,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[w]},k,N,O,F,{match:/\$[(.]/}]}}Gu.registerLanguage("javascript",aT);var cT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Gu.highlightElement(e),e.style.height=""},wM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),lT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=wM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await cT({ref:h,source:a.source}):cT({ref:h,source:a.source}),()=>{}}),g`<div
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
            class="snippet__expand ${d}"
            ${!p&&"disabled"}
            ${o({click:()=>{a.isExpanded=!a.isExpanded}})}
        >
            ${i`${()=>a.isExpanded?"close":"expand"}`}
        </button>
    </div>`};var uT=m.createComponent({tag:"mob-snippet",component:lT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var qs="debug_component",ec="debug_filter_list",tc="debug_overlay",rc="debug_tree",Js="quick_nav",Ys="scroll_down_label",Xs="scroll_to",pT="header",oc="mob_navigation",Ks="mob_navigation_container",nc="search_overlay",Qs="search_overlay_list",jo="search_overlay_header",sc="right-sidebar",ic="route-loader",Gn="custom-history";var mT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(Xs)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},dT=e=>{m.useMethodByName(Xs)?.setActiveLabel?.(e)};function IM({label:e}){return e?.length>0}var MM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),mT({id:e,label:t,element:r,isSection:o,isNote:n}),Tp(r)&&!o&&dT(t)},hT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{IM({label:s})&&MM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var fT=m.createComponent({tag:"mob-spacer",component:hT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var gT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=he(n).top-50;Pr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var bT=m.createComponent({tag:"anchor-button",component:gT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var kM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),yT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${kM({items:o,links:n})}
    </ul>`};var vT=m.createComponent({tag:"mob-list",component:yT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var TT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var _T=m.createComponent({tag:"mob-paragraph",component:TT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var RM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",ST=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${RM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var xT=m.createComponent({tag:"mob-title",component:ST,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var NM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),PM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await At({source:e});return r?o.data:[]},CT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await PM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${NM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var AM=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},ET=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{AM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var wT=m.createComponent({tag:"doc-svg",component:ET,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var ac=m.createComponent({tag:"html-content",component:CT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[vT,_T,xT,uT,fT,bT,wT]});var IT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var MT=m.createComponent({tag:"scroll-to-button",component:IT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var Zs=!1;function OM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:he(a).top-50;Zs=!0,r.activeLabel=i,await Pr.to(c),setTimeout(()=>{Zs=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var kT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},RT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:v,isNote:y}])}),s("setActiveLabel",d=>{Zs||(c.activeLabel=d)}),e(()=>{if(le.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:he(y.element).top})));let d=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(y=>{y.top=he(y.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{Zs||kT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{Zs||kT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>OM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var NT=m.createComponent({tag:"scroll-to",component:RT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[MT]});var cc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var lc=e=>{m.useMethodByName(sc)?.updateList(e??[])};m.useComponent([qa,Ya,NT,Ja,ac]);var $e=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return lc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${cc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${Xs}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([qa,Ya,Ja,ac]);var ne=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return lc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${cc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var PT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=H.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:v})=>{v||h==="backward"||o(2)},1.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(3)},5.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(4)},9.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(1)},1.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(2)},5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:C,ey:w,fx:O,fy:A,gx:L,gy:I})=>{s.ax=h,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=M,s.dy=x,s.ex=C,s.ey=w,s.fx=O,s.fy=A,s.gx=L,s.gy=I});let c=H.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:C,ey:w,fx:O,fy:A,gx:L,gy:I})=>{i.ax=h,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=M,i.dy=x,i.ex=C,i.ey=w,i.fx=O,i.fy=A,i.gx=L,i.gy=I});let l=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Gt(-3,3),ay:()=>Gt(-3,3),bx:()=>Gt(-3,3),by:()=>Gt(-3,3),cx:()=>Gt(-3,3),cy:()=>Gt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Gt(-3,3),fy:()=>Gt(-3,3),gx:()=>Gt(-3,3),gy:()=>Gt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},M={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${M.x}% ${M.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=Je.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Fe(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Fe(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var AT=({title_1:e,title_2:t})=>{let r=H.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Je.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=H.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Je.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var uc=({title:e})=>{let t=H.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Je.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var OT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),v=new WeakRef(a),y=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:M,pathTimeline:x,pathTween:C,stopLoop:w,destroy:O}=PT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:A,title2parallax:L,title1tween:I,title2tween:N}=AT({title_1:n,title_2:s}),{sectionContentScroller:P,destroy:k}=uc({title:h}),{sectionContentScroller:D,destroy:F}=uc({title:v}),{sectionContentScroller:E,destroy:R}=uc({title:y}),$=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,A,L,P,D,E],onUpdate:({value:B})=>{p(B),d()}});return $.init(),setTimeout(()=>{$?.refresh?.()},500),{goTo:B=>{!B&&B!==0||$?.move?.(B).catch(()=>{})},destroy:()=>{$.destroy(),$=null,M.destroy(),_.destroy(),x.destroy(),C.destroy(),A.destroy(),L.destroy(),I.destroy(),N.destroy(),P.destroy(),D.destroy(),w(),O(),k(),F(),R()}}};var $T=({elements:e})=>{let t=H.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var ti=()=>{},ei=e=>Promise.resolve(e),pc=()=>{},qu={1:0,2:100/3,3:100/3*2,4:100},$M=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},LM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},DM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},FM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},BM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{ti(qu[o]),pc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,VM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,LT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:M}=r(),{svg:x}=o(),C=0,w=!1,O=0,{svgSpring:A,destroySvgSpring:L}=$T({elements:x});ei=async P=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let D=-Math.abs(P/30);Number.isNaN(D)||await A.goTo({x:D}).catch(()=>{})},pc=()=>{ei(3e3),setTimeout(()=>{ei(0)},500)};let{destroy:I,goTo:N}=OT({screenElement:d,scrollerElement:f,pathElement:M,wrapElement:h,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,setActiveItem:P=>{c.activenavItem=P},onMove:P=>{w||(C=P),w=!0,O=C-P,ei(O)},onScrollEnd:u.useDebounce(()=>{w=!1,O=0,ei(O)},500)});return ti=N,c.isMounted=!0,()=>{ti=()=>{},I(),L()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${VM()}</div>
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
                    ${$M({setRef:t,getState:n})}
                    ${LM({setRef:t,getState:n})}
                    ${DM({setRef:t,getState:n})}
                    ${FM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{ti(qu[le.clamp(c.activenavItem-1,1,4)]),pc()}})}
        ></button>
        ${BM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{ti(qu[le.clamp(c.activenavItem+1,1,4)]),pc()}})}
        ></button>
    </div>`};var DT=m.createComponent({tag:"about-component",component:LT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>le.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([DT]);var FT=async()=>{let{data:e}=await At({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var BT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var mc=m.createComponent({tag:"benchmark-fake-component",component:BT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[mc]});var Yu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},ri=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Ju=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?Yu(ri(t)):ri(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},ft=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);Ju({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Ju({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ju({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var VT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let d=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${ft({setRef:i,getRef:a,proxi:d,delegateEvents:t,bindEffect:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${o({observe:()=>d.data,render:()=>{let{data:f}=n();return g`
                        ${f.map(({label:h},v)=>g`
                                    <benchmark-fake-component
                                        ${s({label:h,index:v})}
                                        ${c(()=>({counter:d.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var WT=m.createComponent({tag:"benchmark-invalidate",component:VT,...ht()});var dc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var jT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${dc()}
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,v)=>({index:v,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var zT=m.createComponent({tag:"benchmark-repeat-key",component:jT,...ht()});var HT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,key:"label",useSync:!0,render:({current:d})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>d.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,key:"label",render:({sync:f,current:h})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:h.index,label:h.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var UT=m.createComponent({tag:"benchmark-repeat-key-nested",component:HT,...ht(31)});var GT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${dc()}
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,v)=>({index:v,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var qT=m.createComponent({tag:"benchmark-repeat-no-key",component:GT,...ht()});var Ot=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var Xu=({value:e,useShuffle:t=!1})=>{Ot.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ot.set("data",t?Yu(ri(e)):ri(e)),await m.tick();let n=performance.now()-r;Ot.set("time",n),Ot.set("isLoading",!1)})},2)},JT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);Xu({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Xu({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();Xu({value:s.length,useShuffle:!0})}})}
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
    `;var YT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Ot.set("data",[]),Ot.set("time",0),Ot.set("counter",0)}),g`<div class="benchmark">
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
            ${JT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:d,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:h},v,y)=>({index:y,label:v.label,counter:h})})}
                                  ${d()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var XT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:YT,bindStore:Ot,child:[mc]});var KT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,useSync:!0,render:({current:d})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>d.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,render:({sync:f,current:h})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:h.index,label:h.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var QT=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:KT,...ht(31)});var hc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var ZT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${hc(1e3)}
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var e_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:ZT,...ht(1001)});var t_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${hc(1e3)}
            ${ft({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var r_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:t_,...ht(1001)});m.useComponent([WT,qT,zT,UT,QT,XT,e_,r_]);var Or=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(Js);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Js);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var gt=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},bt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},yt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},fo=e=>"roundRect"in e;var go=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,v=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y:v,centerX:h+o/2,centerY:v+n/2,offsetXCenter:WM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:jM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},WM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,jM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var o_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:d,context:f}=gt({disableOffcanvas:n}),h=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=bt({useOffscreen:d,canvas:e}),_=d?S:v,M=fo(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,C=i?x.map((N,P)=>({...N,scale:1,rotate:0,hasFill:o.includes(P)})).toSorted(N=>N.hasFill?-1:1).toReversed():x.map((N,P)=>{let k=o.includes(P);return{...N,scale:1,rotate:0,hasFill:k}}),w=H.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});C.forEach(N=>{w.subscribeCache(({scale:P,rotate:k})=>{N.rotate=k,N.scale=P})});let O=()=>{if(!v)return;d&&T&&(T.width=e.width,T.height=e.height);let N=d?S:v;N&&(e.width=e.width,C.forEach(({x:P,y:k,width:D,height:F,rotate:E,scale:R,hasFill:$,offsetXCenter:B,offsetYCenter:V})=>{let q=Math.PI/180*E,ee=Math.cos(q)*R,ue=Math.sin(q)*R;N.setTransform(ee,ue,-ue,ee,Math.floor(B+P),Math.floor(V+k)),M?(N.beginPath(),N.roundRect(Math.floor(-D/2),Math.floor(-F/2),D,F,150)):(N.beginPath(),N.rect(Math.floor(-D/2),Math.floor(-F/2),D,F)),$?(N.fillStyle="#000000",N.fill()):(N.fillStyle="rgba(255, 255, 255, 1)",N.fill()),N.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:d,offscreen:T,ctx:v}))},A=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(w,{scale:.2,rotate:90},{duration:1e3}).goTo(w,{scale:1},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:.3,rotate:0},{duration:500}).goTo(w,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(w,{scale:.3,rotate:0},{duration:1e3}).goTo(w,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:N,loop:P})=>{console.log(`loop end: ${N}, ${P}`)}),A.play();let L=()=>{O(),h&&u.useNextFrame(()=>L())};u.useFrame(()=>{L()});let I=Z.watch("navigationIsOpen",N=>{if(N){A?.pause(),h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===y.route&&(A?.resume(),u.useFrame(()=>L()))},500)});return()=>{w.destroy(),A.destroy(),I(),w=null,A=null,v=null,T=null,S=null,x=[],h=!1,C=null,f=null}};var Ku=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var Qu=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=o_({canvas:t().canvas,...Ku[e.currentParamsId].params,disableOffcanvas:!0})};function zM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return Ku.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,Qu({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var n_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{Qu({proxi:i,getRef:r})})});let a=u.useResize(()=>{Qu({proxi:i,getRef:r})});return u.useFrame(()=>{i.isMounted=!0}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    ${zM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var s_=m.createComponent({tag:"animatedpattern-n0",component:n_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([s_]);var i_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var Zu=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=gt({disableOffcanvas:t}),p=!0,{top:d,left:f}=he(e),h=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=bt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=go({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((P,k)=>({...P,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(k)})).toSorted(P=>P.hasFill?-1:1),M=H.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(P=>{M.subscribeCache(({mouseX:k,mouseY:D})=>{P.mouseX=k,P.mouseY=D})});let x=H.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(P=>{x.subscribeCache(({scale:k})=>{P.scale=k})});let C=()=>{if(!h)return;c&&y&&(y.width=e.width,y.height=e.height);let P=c?T:h;P&&(e.width=e.width,_.forEach(({x:k,y:D,width:F,height:E,mouseX:R,mouseY:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(!V)return;let ue=R-(e.width-(F+i)*s)/2,re=$-(e.height-(E+i)*n)/2,ye=(k-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),De=0,J=Math.cos(De)*(Ne+B),Te=Math.sin(De)*(Ne+B);P.setTransform(J,Te,-Te,J,Math.floor(q+k),Math.floor(ee+D)),P.beginPath(),P.rect(Math.floor(-F/2),Math.floor(-E/2),F,E),P.fillStyle="#000000",P.fill(),P.setTransform(1,0,0,1,0,0)}),P.globalCompositeOperation="destination-out",_.forEach(({x:k,y:D,width:F,height:E,mouseX:R,mouseY:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(V)return;let ue=R-(e.width-(F+i)*s)/2,re=$-(e.height-(E+i)*n)/2,ye=(k-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),De=0,J=Math.cos(De)*(Ne+B),Te=Math.sin(De)*(Ne+B);P.setTransform(J,Te,-Te,J,Math.floor(q+k),Math.floor(ee+D)),P.beginPath(),P.rect(Math.floor(-F/2),Math.floor(-E/2),F,E),P.fill(),P.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:c,offscreen:y,ctx:h}))},w=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});w.play();let O=({x:P,y:k})=>{M.goTo({mouseX:P-f,mouseY:k-d}).catch(()=>{})},A=u.useMouseMove(({client:P})=>{let{x:k,y:D}=P;O({x:k,y:D})}),L=u.useTouchMove(({client:P})=>{let{x:k,y:D}=P;O({x:k,y:D})}),I=()=>{C(),p&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let N=Z.watch("navigationIsOpen",P=>{if(P){w?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(w?.play(),u.useFrame(()=>I()))},500)});return()=>{x.destroy(),w.destroy(),M.destroy(),A(),L(),N(),x=null,w=null,M=null,h=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var a_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=Zu({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=Zu({canvas:c,...t()})});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),a(),a=null}}),g`
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
    `};var c_=m.createComponent({tag:"animatedpattern-n1",component:a_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([c_]);var l_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var u_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,{useOffscreen:d,context:f}=gt({disableOffcanvas:t}),h=!0,v=e.getContext(f,{alpha:!0}),{top:y,left:T}=he(e),S=m.getActiveRoute(),{offscreen:_,offScreenCtx:M}=bt({useOffscreen:d,canvas:e}),x=!0;e.width=e.clientWidth,e.height=e.clientHeight;let C=[...Array.from({length:19}).keys()].map((R,$)=>{let B=$>=9.5?9.5+(9.5-$):$,V=s.includes($)?1:B*i;return{width:B*o,height:B*n,x:0,y:0,hasFill:s.includes($),opacity:V,radius:a,rotate:0,relativeIndex:B}}),w=H.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),O=[...C].map(R=>w.subscribeCache(({rotate:$})=>{R.rotate=$})),A=H.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...C].forEach(R=>{A.subscribeCache(({x:$,y:B})=>{R.x=$,R.y=B})});let L=()=>{if(!v)return;d&&_&&(_.width=e.width,_.height=e.height);let R=d?M:v;R&&(e.width=e.width,C.forEach(({width:$,height:B,x:V,y:q,rotate:ee,hasFill:ue,opacity:re},ye)=>{let ve=C.length-ye,ge=e.width/2,Ne=e.height/2,De=1,J=Math.PI/180*ee,Te=Math.cos(J)*De,Ue=Math.sin(J)*De;R.setTransform(Te,Ue,-Ue,Te,ge+V+ve*V/20,Ne+q+ve*q/20),x?(R.beginPath(),R.roundRect(Math.round(-$/2),Math.round(-B/2),$,B,130)):(R.beginPath(),R.rect(Math.round(-$/2),Math.round(-B/2),$,B)),ue?R.fillStyle="#000":(R.fillStyle=`rgba(238, 238, 238, ${re})`,R.strokeStyle=`rgba(0, 0, 0, ${re})`,R.stroke()),R.fill(),R.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:d,offscreen:_,ctx:v}))},I=we.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});I.goTo(w,{rotate:360},{duration:p}),I.play();let N=()=>{L(),h&&u.useNextFrame(()=>N())};u.useFrame(()=>N());let P=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,y=he(e).top,T=he(e).left,L()}),k=({x:R,y:$})=>{let B=window.innerWidth,V=window.innerHeight,q=R-e.width/2-T,ee=$-e.height/2-y;A.goTo({x:le.clamp(q,-B/2+400+T,B/2-400-T),y:le.clamp(ee,-V/2+200+y,V/2-200-y)}).catch(()=>{})},D=u.useMouseMove(({client:R})=>{let{x:$,y:B}=R;k({x:$,y:B})}),F=u.useTouchMove(({client:R})=>{let{x:$,y:B}=R;k({x:$,y:B})}),E=Z.watch("navigationIsOpen",R=>{if(R){h=!1,I?.pause(),w?.pause(),A?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===S.route&&(I?.resume(),w?.resume(),A?.resume(),u.useFrame(()=>N()))},500)});return{destroy:()=>{w.destroy(),A.destroy(),I.destroy(),P(),D(),F(),E(),O.forEach(R=>{R()}),O.length=0,w=null,A=null,I=null,v=null,_=null,M=null,h=!1,C=null,f=null},stopBlackOne:()=>{s.forEach(R=>{O[R]?.()})}}};function HM({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
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
    </li>`}var p_=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=u_({canvas:c,...a}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{a.isMounted=!0}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
                    ${HM({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var m_=m.createComponent({tag:"caterpillar-n1",component:p_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([m_]);var d_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var ep=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},h_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:d,context:f}=gt({disableOffcanvas:t.disableOffcanvas}),h=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=bt({useOffscreen:d,canvas:e}),_=!0,M=[...Array.from({length:20}).keys()].map((I,N)=>{let P=N>=10?10+(10-N):N,k=o+o/3*P,D=n+n/3*P,F=s.includes(N)?1:(20-N)*i;return{width:k,height:D,x:0,y:0,hasFill:s.includes(N),opacity:F,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=H.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:I,direction:N})=>{ep({isForced:I,direction:N,value:1})},1).add(({isForced:I,direction:N})=>{ep({isForced:I,direction:N,value:5})},5).add(({isForced:I,direction:N})=>{ep({isForced:I,direction:N,value:9})},9);M.forEach(I=>{x.subscribeCache(({x:N,rotate:P})=>{let k=N/p,D=2/(3-Math.cos(2*k)),F=D*Math.cos(k)*a,E=D*Math.sin(2*k)/2*c;I.x=F,I.y=E,I.rotate=P})});let C=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);C.onLoopEnd(({loop:I,direction:N})=>{console.log(`loop end: ${I} , ${N}`)});let w=()=>{if(!v)return;d&&T&&(T.width=e.width,T.height=e.height);let I=d?S:v;I&&(e.width=e.width,M.forEach(({width:N,height:P,x:k,y:D,rotate:F,hasFill:E,opacity:R})=>{let $=e.width/2,B=e.height/2,V=1,q=Math.PI/180*F,ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,$+k,B+D),_?(I.beginPath(),I.roundRect(Math.round(-N/2),Math.round(-P/2),N,P,[40,40])):(I.beginPath(),I.rect(Math.round(-N/2),Math.round(-P/2),N,P)),E?I.fillStyle="#000000":(I.strokeStyle=`rgba(0, 0, 0, ${R})`,I.fillStyle="rgba(238, 238, 238, 0)",I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:d,offscreen:T,ctx:v}))},O=()=>{w(),h&&u.useNextFrame(()=>O())};u.useFrame(()=>O()),C.play();let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,w()}),L=Z.watch("navigationIsOpen",I=>{if(I){h=!1,C?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===y.route&&(C?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{h=!1,A(),L(),x.destroy(),x=null,C.destroy(),C=null,v=null,T=null,S=null,M=null,f=null},play:()=>{C.play()},playReverse:()=>{C.playReverse()},playUseCurrent:()=>{C.play({useCurrent:!0})},playReverseUseCurrent:()=>{C.playReverse({useCurrent:!0})},playFromLabel:()=>{C.playFrom("mylabel")},plaFromLabelReverse:()=>{C.playFromReverse("mylabel")},stop:()=>C.stop(),pause:()=>C.pause(),resume:()=>C.resume(),reverse:()=>C.reverse()}};function UM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var f_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),d=()=>{},f=h_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:d}=f)})}),Object.entries(a.buttons).forEach(([h,v])=>{let{method:y}=v;l.querySelector(`.${h}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{a.isMounted=!0}),()=>{d(),d=null}}),g`
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
                        ${UM({buttons:a.buttons})}
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
    `};var GM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},g_=m.createComponent({tag:"caterpillar-n2",component:f_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:GM,type:"Any"})}});m.useComponent([g_]);var b_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var fc=()=>{m.useMethodByName(Ys).update(!0)},gc=()=>{m.useMethodByName(Ys).update(!1)};var y_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:d,context:f}=gt({disableOffcanvas:o}),h=!0,v=H.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=bt({useOffscreen:d,canvas:e}),M=d?_:y,x=fo(M);M=null,e.width=e.clientWidth,e.height=e.clientHeight;let C=go({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,w=l?C.map((k,D)=>({...k,scale:1,rotate:0,hasFill:p.includes(D)})).toSorted(k=>k.hasFill?-1:1):C.map((k,D)=>({...k,scale:1,rotate:0,hasFill:p.includes(D)})),O=H.createStaggers({items:w,stagger:r}),A=O.map(({item:k,start:D,end:F})=>{let E=H.createSequencer({data:{scale:1}}).goTo({scale:0},{start:D,end:F,ease:"easeInOutQuad"}),R=E.subscribe(({scale:$})=>{k.scale=$});return v.add(E),{sequencer:E,unsubscribe:R}}),L=()=>{if(!y)return;d&&S&&(S.width=e.width,S.height=e.height);let k=d?_:y;k&&(e.width=e.width,w.forEach(({x:D,y:F,width:E,height:R,rotate:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{let ue=Math.PI/180*$,re=Math.cos(ue)*B,ye=Math.sin(ue)*B;k.setTransform(re,ye,-ye,re,Math.floor(q+D),Math.floor(ee+F)),x?(k.beginPath(),k.roundRect(Math.floor(-E/2),Math.floor(-R/2),E,R,150)):(k.beginPath(),k.rect(Math.floor(-E/2),Math.floor(-R/2),E,R)),V?(k.fillStyle="#000000",k.fill()):(k.strokeStyle="#000",k.fillStyle="rgb(238, 238, 238)",k.fill(),x||(k.strokeStyle="#ccc")),k.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:d,offscreen:S,ctx:y}))},I=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},reverse:!1,ease:!0,easeType:"lerp"});I.init();let N=()=>{L(),h&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let P=Z.watch("navigationIsOpen",k=>{if(k){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>N())},500)});return()=>{P(),A.forEach(({sequencer:k,unsubscribe:D})=>{k.destroy(),D()}),A=[],v.destroy(),v=null,O=[],I.destroy(),I=null,y=null,S=null,_=null,C=[],h=!1,w=null,f=null}};var tp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var rp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=y_({canvas:t().canvas,canvasScroller:t().canvasScroller,...tp[e.currentParamsId].params,disableOffcanvas:!0})};function qM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return tp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,rp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var v_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{fc(),u.useFrame(()=>{u.useNextTick(()=>{rp({proxi:i,getRef:r})})});let a=u.useResize(()=>{rp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{i.isMounted=!0}),()=>{i.destroy(),i.destroy=()=>{},gc(),a()}}),g`
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
                    ${qM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var T_=m.createComponent({tag:"scroller-n0",component:v_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([T_]);var __=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function JM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function YM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var S_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:d}=gt({disableOffcanvas:r}),f=!0,h=e.getContext(d,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=bt({useOffscreen:p,canvas:e}),S=p?T:h,_=fo(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let M=[...Array.from({length:17}).keys()].map((I,N)=>{let P=N>=8.5?8.5+(8.5-N):N;return{width:Math.floor(JM({width:15,relativeIndex:P,amountOfPath:17})),height:Math.floor(YM({height:30,relativeIndex:P,amountOfPath:17})),opacity:P*.09,hasFill:l.has(N),rotate:0,relativeIndex:P,index:N}}),x=H.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});[...M].forEach(I=>{x.subscribeCache(({rotate:N})=>{I.rotate=N})});let C=()=>{if(!h)return;p&&y&&(y.width=e.width,y.height=e.height);let I=p?T:h;if(!I)return;let N=e.width/2,P=e.height/2;e.width=e.width,M.forEach(({width:k,height:D,opacity:F,rotate:E,index:R,hasFill:$})=>{let B=M.length/2-R,V=1,q=Math.PI/180*(E-33),ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,N,P+B*19),_?(I.beginPath(),I.roundRect(-k/2,-D/2+B*19,k,D,150)):(I.beginPath(),I.rect(Math.round(-k/2),Math.round(-D/2),k,D)),$?I.fillStyle="#000":(I.fillStyle=`rgba(238, 238, 238, ${F})`,I.strokeStyle=`rgba(0, 0, 0, ${F})`,I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),yt({useOffscreen:p,offscreen:y,ctx:h})},w=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},ease:!0,easeType:"spring"});w.init();let O=()=>{C(),f&&u.useNextFrame(()=>O())};u.useFrame(()=>{O()});let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{C()})}),L=Z.watch("navigationIsOpen",I=>{if(I){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>O())},500)});return()=>{x.destroy(),A(),L(),x.destroy(),x=null,w.destroy(),w=null,h=null,y=null,T=null,x=null,f=!1,M=null,d=null}};function XM({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
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
    </li>`}var x_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};fc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=S_({canvas:l,canvasScroller:p,...a,proxi:a})})}),u.useFrame(()=>{a.isMounted=!0}),()=>{c(),gc(),c=null}}),g`
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
                    ${XM({proxi:a,delegateEvents:s,bindObject:i})}
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
    `};var C_=m.createComponent({tag:"scroller-n1",component:x_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([C_]);var E_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var w_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var qn=m.createComponent({tag:"dynamic-list-button",component:w_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var bc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],I_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],M_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],k_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Jn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var KM=[{buttonLabel:"sample1",data:I_},{buttonLabel:"salmple2",data:M_},{buttonLabel:"sample3",data:k_},{buttonLabel:"Initial",data:bc}],QM=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function ZM({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return KM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function ek({bindProps:e,staticProps:t,proxi:r}){return QM.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var R_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${ZM({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${ek({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function tk({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var N_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>tk({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function rk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var ok=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${rk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,P_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{h=h<Jn.length-1?h+1:0,f.innerData=Jn[h],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>ok({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var A_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var yc=m.createComponent({tag:"dynamic-list-card-inner",component:A_,props:{key:()=>({value:"",type:String})}});var O_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var $_=m.createComponent({tag:"dynamic-list-counter",component:O_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var L_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var D_=m.createComponent({tag:"dynamic-list-empty",component:L_});var F_=m.createComponent({tag:"dynamic-list-card",component:P_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Jn[0],type:Array}),innerDataUnivoque:()=>({value:Jn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[$_,D_,yc,qn]});var B_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var V_=m.createComponent({tag:"dynamic-slotted-label",component:B_,props:{label:()=>({value:"",type:String})}});var W_=m.createComponent({tag:"dynamic-list-repeater",component:N_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[F_,V_]});var j_=m.createComponent({tag:"dynamic-list",component:R_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:bc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[qn,W_,yc]});m.useComponent([j_]);var z_=()=>g` <dynamic-list> </dynamic-list> `;var H_=({refs:e})=>{let t=H.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=H.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=we.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var nk=async({playIntro:e,playSvg:t})=>{await e(),t()},U_=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=H_({refs:s});return setTimeout(()=>{nk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var G_=m.createComponent({tag:"home-component",component:U_,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var bo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),Cv(r)};m.useComponent([G_]);var q_=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(h=>bo({svg:e,id:h}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,d,f]})}
            ></home-component>
        </div>
    `};var J_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function sk(e){return Math.floor(Math.random()*e)}var vc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${J_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:sk(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Yn=e=>{m.useMethodByName(e).toggleActive()};var Y_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Yn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Yn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var X_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${Y_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var K_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${vc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${X_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var Q_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var Z_=m.createComponent({tag:"matrioska-item",component:Q_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var eS=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Yn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Yn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var tS=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${eS({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var rS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${vc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${tS({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var ik=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},oS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?ik(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[qn,Z_]},nS=m.createComponent({tag:"page-matrioska-repeat",component:K_,...oS}),sS=m.createComponent({tag:"page-matrioska-invalidate",component:rS,...oS});m.useComponent([nS,sS]);var iS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,aS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var op=0,ak=({indicators:e,proxi:t})=>[...e].map((r,o)=>Je.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+op-Fe(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),cS=({pins:e})=>{e.forEach(t=>t.refresh())},ck=({titles:e})=>[...e].map(t=>Je.createParallax({item:t,propierties:"x",reverse:!0,range:9})),lS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},uS=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},pS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=ak({indicators:e,proxi:n}),a=ck({titles:t}),c=document.querySelector(".l-navcontainer__side");op=Fe(c)/2;let l=u.useResize(()=>{op=Fe(c)/2}),p=new zs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{cS({pins:i}),lS({nav:r})},onEnterBack:()=>{cS({pins:i}),lS({nav:r})},onLeave:()=>{uS({nav:r})},onLeaveBack:()=>{uS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var lk=(e,t)=>e===0?1:e===t-1?-1:0,uk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},pk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),mS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(le.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=pS({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=he(T),_=se(T),M=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),C=2e3,O=1+(l-x)/l*.9,A=x/l*C*O;Pr.to(M+lk(v,l),{duration:A})}),()=>{h()}}),le.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${pk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${uk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var dS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var hS=m.createComponent({tag:"horizontal-scroller-button",component:dS,props:{id:()=>({value:-1,type:Number})}});var fS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var gS=m.createComponent({tag:"horizontal-scroller-section",component:fS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var bS=m.createComponent({tag:"horizontal-scroller",component:mS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[hS,gS]});m.useComponent([bS]);var yS=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var vS=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var TS=m.createComponent({tag:"svg-star",component:vS,props:{fill:()=>({value:"#000000",type:String})}});var mk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,_S=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${mk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var dk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",np=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${dk({debug:o,id:s.id})}
                ${np({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var sp=({element:e})=>({height:se(e),width:Fe(e),offSetLeft:he(e).left,offSetTop:he(e).top}),SS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),xS=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Xn=()=>{},CS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,v=0,y=0,T=0,S=0,_=!1,M=!1,x={x:0,y:0},C=0,w=Xn,O=Xn,A=Xn,L=Xn,I=Xn,N=Xn,P=[],k=H.createSpring({data:{delta:0,ax:0,ay:0}}),D=()=>{_=!1},F=()=>{let{vw:V,vh:q}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},ee=x.x,ue=x.y,{xgap:re,ygap:ye}=_?M?(M=!1,{xgap:0,ygap:0}):{xgap:ee-v,ygap:ue-T}:{xgap:0,ygap:0};_&&(y+=re,S+=ye);let{xInMotion:ve,yInMotion:ge}=_?{xInMotion:y,yInMotion:S}:{xInMotion:ee,yInMotion:ue},{ax:Ne,ay:De}=l.centerToViewoport||l.drag?{ax:-(V/2-ve)/l.xDepth,ay:(q/2-ge)/l.yDepth}:{ax:-(V/2-(ve-f))/l.xDepth,ay:(q/2-(ge-h))/l.yDepth};v=ee,T=ue;let J=Ne>l.xLimit||Ne<-l.xLimit,Te=De>l.yLimit||De<-l.yLimit;J&&(y-=re),Te&&(S-=ye);let Ue=le.clamp(Ne,-l.xLimit,l.xLimit),ut=le.clamp(De,-l.yLimit,l.yLimit),St=Math.sqrt(Math.pow(Math.abs(ut),2)+Math.pow(Math.abs(Ue),2));k.goTo({delta:St,ax:Ue,ay:ut}).catch(()=>{}),P.forEach(Xe=>{Xe({delta:St,factor:l.factor})})},E=V=>{C!==V&&(x.y-=C,C=V,x.y+=C),F()},R=({page:V})=>V.y>h&&V.y<h+p&&V.x>f&&V.x<f+d,$=({page:V})=>{R({page:V})&&(_=!0,M=!0)},B=()=>{N(),N=l.useScroll?u.useScroll(({scrollY:V})=>{E(V)}):()=>{}};return e(({element:V})=>{let{container:q}=r();l.afterInit(V);let ee=k.subscribe(({delta:ve,ax:ge,ay:Ne})=>{q.style.transform=`translate3D(0,0,0) rotateY(${ge}deg) rotateX(${Ne}deg)`,l.onUpdate({delta:ve,deltaX:ge,deltaY:Ne})}),ue=k.onComplete(({ax:ve,ay:ge})=>{q.style.transform=`rotateY(${ve}deg) rotateX(${ge}deg)`}),re=u.useMouseMove(({page:ve})=>{x={x:ve.x,y:ve.y},F()}),ye=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=sp({element:V}))});return o(()=>l.drag,ve=>{if(I(),L(),A(),O(),w(),ve){y=window.innerWidth/2,S=window.innerHeight/2,w=u.useTouchStart(({page:ge})=>{$({page:ge})}),O=u.useTouchEnd(()=>{D()}),A=u.useMouseDown(({page:ge})=>{$({page:ge})}),L=u.useMouseUp(()=>{D()}),I=u.useTouchMove(({page:ge})=>{x={x:ge.x,y:ge.y},F()});return}},{immediate:!0}),o(()=>l.useScroll,(ve,ge)=>{if(ve){B();return}ve!==ge&&N()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=sp({element:V})),x={x:window.innerWidth/2,y:window.innerHeight/2},F()}),()=>{ee(),ue(),ye(),re(),N(),w(),O(),A(),L(),I(),k.destroy(),P=[],k=null,p=null,d=null,f=null,h=null,v=null,y=null,T=null,S=null,_=null,M=null,x=null,C=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{P=SS({childrenId:c})},render:()=>np({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var ip=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),ES=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var hk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,fk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=ip(l),d=ip(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:v}=ES(f);a.goTo({depth:c,rotateX:h,rotateY:v}).catch(()=>{})},wS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:v,classList:y,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,M=`--item-height:${l};`,x=`--offset-x:${p};`,C=`--offset-y:${d};`,w=H.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:O,factor:A})=>{s&&fk({delta:O,factor:A,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:w})}),r(({element:O})=>{let A=w.subscribe(({depth:N,rotateX:P,rotateY:k})=>{let D=N+v;O.style.transform=`translate3D(0,0,${D}px) rotateX(${P}deg) rotateY(${k}deg)`}),L=w.onComplete(({depth:N,rotateX:P,rotateY:k})=>{let D=N+v;O.style.transform=`translateZ(${D}px) rotateX(${P}deg) rotateY(${k}deg)`}),I=v;return O.style.transform=`translateZ(${I}px)`,()=>{A(),L(),w.destroy(),w=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${M}${x}${C}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${hk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var IS=m.createComponent({tag:"move-3d-item",component:wS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Kn=m.createComponent({tag:"move-3d",component:CS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[IS]});var MS=m.createComponent({tag:"move-3d-page",component:_S,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Kn]});m.useComponent([MS,TS]);var kS=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e,{data:n}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${n}</div>
        <move-3d-page
            ${m.staticProps({data:t})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:z}=xS({ratio:1980}),RS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var NS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:RS}};var PS=({getState:e})=>{let{content:t}=e();return g`${t}`};var Qn=m.createComponent({tag:"any-component",component:PS,props:{content:()=>({value:"",type:String})}});var AS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=H.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(d=>{a.subscribe(({x:f,y:h})=>{d.style.translate=`${f}px ${h}px`})});let c=H.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(d=>{d&&c.subscribeCache(({rotation:f})=>{d.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:d})=>{let{x:f,y:h}=d,v=h-n,y=f-s;if(Math.hypot(y,v)>10){n=h,s=f;let _=Math.atan2(v,y)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:h-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var gk=5,OS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=dt(),n=[...Array.from({length:gk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=AS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Tc=m.createComponent({tag:"mouse-trail",component:OS});var $S=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Kn,Qn,Tc]);var LS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h,v,y,T,S,_,M,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(C=>bo({svg:e,id:C}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:$S({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:d,b1:h,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:M,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var DS=()=>le.mq("min","desktop"),FS="#home",ap=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(ap=m.getActiveParams(),FS=e)});var BS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=DS(),e(()=>{let s=u.useResize(()=>{n.active=DS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:FS,params:ap??{}})}),()=>{s(),ap=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var VS=m.createComponent({tag:"only-desktop-cta",component:BS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([VS]);var WS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var cp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=gt({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=bt({useOffscreen:r,canvas:e}),l=r?c:s,p=fo(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerWidth/20,v=window.innerHeight/20,T=go({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:v,gutter:1}).items,S=T.map(F=>({...F,scale:1,rotate:0})),_=({row:F,col:E})=>{let R=(f+1)*F;return S[R+E]},x={..._({row:1,col:1}),scale:1,rotate:0},w={..._({row:4,col:5}),scale:1,rotate:0},O=H.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=H.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),L=H.createSpring({data:w});S.forEach(F=>{O.subscribeCache(({scale:E,rotate:R})=>{F.rotate=R,F.scale=E})}),A.subscribe(F=>{x=F}),L.subscribe(F=>{w=F});let I=we.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});I.goTo(O,{scale:.2,rotate:90},{duration:1e3});let N=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});N.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo(L,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo(L,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(L,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let P=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let F=r?c:s;if(F){e.width=e.width,S.forEach(({x:E,y:R,width:$,height:B,rotate:V,scale:q,offsetXCenter:ee,offsetYCenter:ue},re)=>{if(re===40){let Ne=Math.PI/180*x.rotate,De=Math.cos(Ne)*x.scale,J=Math.sin(Ne)*x.scale;F.setTransform(De,J,-J,De,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(F.beginPath(),F.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(F.beginPath(),F.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),F.fillStyle="#000000",F.fill()}let ye=Math.PI/180*V,ve=Math.cos(ye)*q,ge=Math.sin(ye)*q;F.setTransform(ve,ge,-ge,ve,Math.floor(ee+E),Math.floor(ue+R)),p?(F.beginPath(),F.roundRect(Math.floor(-$/2),Math.floor(-B/2),$,B,150)):(F.beginPath(),F.rect(Math.floor(-$/2),Math.floor(-B/2),$,B)),F.fillStyle="rgba(238, 238, 238, 0.9)",F.fill()});{let E=Math.PI/180*w.rotate,R=Math.cos(E)*w.scale,$=Math.sin(E)*w.scale;F.setTransform(R,$,-$,R,Math.floor(w.offsetXCenter+w.x),Math.floor(w.offsetYCenter+w.y)),p?(F.beginPath(),F.roundRect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height),150)):(F.beginPath(),F.rect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height))),F.fillStyle="#a86464",F.fill()}yt({useOffscreen:r,offscreen:a,ctx:s})}},k=()=>{P(),n&&u.useNextFrame(()=>k())};u.useFrame(()=>{k()});let D=Z.watch("navigationIsOpen",u.useDebounce(F=>{if(F){N.pause(),I.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(N.resume(),I.resume(),n=!0,u.useFrame(()=>k()))},200)},200));return{destroy:()=>{D(),s=null,a=null,c=null,T=[],n=!1,O?.destroy?.(),A?.destroy?.(),L?.destroy?.(),N?.destroy?.(),I?.destroy?.(),S=null,x=null,w=null,o=null,O=null,A=null,L=null,N=null,I=null},play:()=>{N.play(),I.isActive()||I.play()},playReverse:()=>{N.playReverse(),I.isActive()||I.play()},playFromLabel:()=>{N.setTween("my-label",[A,L]).then(()=>{N.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},playFromLabelReverse:()=>{N.setTween("my-label",[A,L]).then(()=>{N.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},revertNext:()=>{N.reverseNext()},pause:()=>{N.pause(),I.pause()},resume:()=>{N.resume(),I.resume()},stop:()=>{N.stop(),I.stop()}}};function bk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var jS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=cp({canvas:d,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=cp({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,v])=>{let{method:y}=v;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{a.isMounted=!0}),()=>{f(),l()}}),g`
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
                        ${bk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var yk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},zS=m.createComponent({tag:"async-timeline",component:jS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:yk,type:"Any"})}});m.useComponent([zS]);var HS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var US=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([Kn,Qn,Tc]);var GS=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>bo({svg:e,id:v}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:US({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:d,letter_d_fill:f,letter_p_fill:h}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var qS=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Je.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var JS=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=qS({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var YS=m.createComponent({tag:"mobbu-2025",component:JS,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([YS]);var XS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>bo({svg:e,id:n}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${fa({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var KS="TOP-LEFT",QS="TOP-RIGHT",ZS="BOTTOM-LEFT",ex="BOTTOM-RIGHT",tx="CENTER";var vk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},rx=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:d=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let h=[...f.querySelectorAll(n)],v=h.map(J=>{let Te=window.innerWidth,Ue=window.innerHeight,ut=J.offsetWidth,St=J.offsetHeight,Xe=vk(J),os=s-s*ut/(Te*d)-Xe,Lr=s-s*St/(Ue*d)-Xe;return Math.min(os,Lr)}),y=()=>{h.forEach((J,Te)=>{let Ue=_>v[Te];J.classList.toggle("hide",Ue)})},T=0,S=0,_=0,M=0,x=0,C=r.offsetWidth,w=r.offsetHeight,O=t.offsetWidth,A=t.offsetHeight,L=(C-O)/2,I=(w-A)/2,N={x:0,y:0},P=!1,k=!1,D=30,F=()=>{if(i&&s>0){let J=s/(s-_);L=(C-O/J)/2,I=(w-A/J)/2}else L=(C-O)/2,I=(w-A)/2};F();let E={xValue:0,yValue:0},R=H.createSpring({data:{x:0,y:0,z:0}});switch(e){case KS:{E={xValue:L,yValue:I},S=C,T=w;break}case QS:{E={xValue:-L,yValue:I},S=-C,T=w;break}case ZS:{E={xValue:L,yValue:-I},S=C,T=-w;break}case ex:{E={xValue:-L,yValue:-I},S=-C,T=-w;break}}let $=R.subscribe(({x:J,y:Te,z:Ue})=>{r&&(r.style.transform=`translate3D(${J}px, ${Te}px, ${Ue}px)`)});R.set({x:E.xValue,y:E.yValue}),[...t.querySelectorAll("a, button")].forEach(J=>{J.setAttribute("draggable","false"),J.style.userSelect="none"});let V=({page:J})=>{P=!0,k=!0,N={x:J.x,y:J.y}},q=({page:J})=>{let{x:Te,y:Ue}=J,{xgap:ut,ygap:St}=P?k?(k=!1,{xgap:0,ygap:0}):{xgap:Te-M,ygap:Ue-x}:{xgap:0,ygap:0},Xe=L>0?le.clamp(S+ut,-L,L):le.clamp(S+ut,L,-L),os=I>0?le.clamp(T+St,-I,I):le.clamp(T+St,I,-I),Lr=P?Xe:S,X=P?os:T,{xComputed:ns,yComputed:je}=P?{xComputed:Lr,yComputed:X}:{xComputed:Te,yComputed:Ue};S=Lr,T=X,M=Te,x=Ue,P&&(E={xValue:ns,yValue:je},R.goTo({x:ns,y:je}).catch(()=>{}))},ee=u.useTouchStart(({page:J,target:Te})=>{V({page:J,target:Te})}),ue=u.useMouseDown(({page:J,target:Te})=>{V({page:J,target:Te})}),re=u.useTouchEnd(()=>{P=!1}),ye=u.useMouseUp(()=>{P=!1}),ve=u.useMouseMove(({page:J})=>{q({page:J})}),ge=u.useTouchMove(({page:J})=>{q({page:J})});f&&f.addEventListener("click",J=>{let{x:Te,y:Ue}=N,ut=Math.abs(M-Te)>D,St=Math.abs(x-Ue)>D;(ut||St)&&J.preventDefault()},!1),i&&f&&f.addEventListener("wheel",J=>{let{spinY:Te}=u.normalizeWheel(J);_=le.clamp(_+Te*p,a,c),F(),S=L>0?le.clamp(S,-L,L):le.clamp(S,L,-L),T=I>0?le.clamp(T,-I,I):le.clamp(T,I,-I),l({depth:_}),R.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Ne=u.useMouseWheel(u.useDebounce(()=>{y()},100)),De=u.useResize(()=>{C=r.offsetWidth,w=r.offsetHeight,O=t.offsetWidth,A=t.offsetHeight,F()});return{destroy:()=>{$(),ee(),re(),ue(),ye(),ve(),ge(),De(),Ne(),R.destroy(),R=null,f=null,h=null,t=null,r=null}}};var ox=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=rx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var nx=m.createComponent({tag:"c-dragger",component:ox,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:tx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([nx,Qn]);var sx=!1,ix=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{sx&&console.log(n)},onDepthChange:({depth:n})=>{sx&&console.log(n)}})}
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
    </div>`};var ax=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(se(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>se(y)/2),d=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let S=y.firstChild;d.subscribeCache(({angleInRadian:_,scale:M})=>{let x=a+c*_,C=x*Math.cos(_),w=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${C-p[T]}px, ${w-p[T]}px)`,S&&(S.style.scale=`${M}`)})});let f=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let M=i/S*_,x=a+c*M,C=y+x*Math.cos(M),w=T+x*Math.sin(M);_===0?o.moveTo(C,w):o.lineTo(C,w)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),v(),o=null,d=null,f=null,e=null}}};var cx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=H.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=se(t)/2-100,a=e.map(h=>se(h)/2);e.forEach((h,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let h=60/u.getFps();c+=h,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var lx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>se(h)/2),s=Fe(t)/2-100,i=se(t),a=10,c=a/2/Math.PI,l=H.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,v)=>{let y=h.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,M=2/(3-Math.cos(2*_)),x=M*Math.cos(_)*s,C=M*Math.sin(2*_)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${C-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),M=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(h+M,v+x):o.lineTo(h+M,v+x)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function Tk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),d=l*Math.sin(c),f=p-s,h=d-i;n+=Math.hypot(f,h),s=p,i=d}return n}var ux=(e,t)=>t===0?e:ux(t,e%t);function _k(e,t){let r=ux(e,t),o=t/r;return 2*Math.PI*o}var px=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(se(t)-100)/2,p=n/s,d=_k(n,s),f=Tk(l,p,d),h=i*(f/l),v=e.map(O=>se(O)/2),y=H.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:d},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<d&&d>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let M=0;T.forEach(O=>{let A=O/d*10,L=Math.abs((A-M)/2);M=A;let I=Math.max(0,A-L),N=A,P=Math.min(10,A+L);P>I&&(y.goTo({scale:0},{start:I,end:N,ease:"easeInQuad"}),y.goTo({scale:1},{start:N,end:P,ease:"easeOutQuad"}))}),e.forEach((O,A)=>{let L=O.firstChild;y.subscribeCache(({angleInRadian:I,scale:N})=>{let P=l*Math.cos(p*I),k=P*Math.cos(I),D=P*Math.sin(I);O.style.transform=`translate3D(0px,0px,0px) translate(${k-v[A]}px, ${D-v[A]}px)`,L&&(L.style.scale=`${N}`)})});let x=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:h}).add(y);function C(){if(!c||!r)return;let O=r.width/2,A=r.height/2,L=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let I=0;I<=L;I++){let N=d/L*I,P=l*Math.cos(p*N),k=O+P*Math.cos(N),D=A+P*Math.sin(N);I===0?c.moveTo(k,D):c.lineTo(k,D)}c.stroke()}let w=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,C()});return C(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),w(),c=null,y=null,x=null,e=null}}};var mx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Fe(t)-200,s=se(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>se(v)/2),p=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:M,scale:x})=>{let C=Math.sign(M-T)||1,w=Math.sin(M/a)*s*C;v.style.transform=`translate3D(0px,0px,0px) translate(${M+_}px, ${w-l[y]}px)`,S&&(S.style.scale=`${x}`),T=M})});let d=we.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:M,y:x}=(()=>{if(_<=T){let C=_/T*n,w=Math.sin(C/a)*s;return{x:C,y:w}}if(_>T){let w=(S-_)/T*n,O=Math.sin(w/a)*s*-1;return{x:w,y:O}}return{x:0,y:0}})();_===0?o.moveTo(v+M-n/2,y+x):o.lineTo(v+M-n/2,y+x)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var lp={sin:mx,circle:cx,infinite:lx,archimede:ax,rosaDiGrandi:px};var dx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var hx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),d=dx(),{destroy:f,play:h,stop:v,resume:y}=d;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:h,stop:v,resume:y}=lp[i.name]({targets:S,container:T,canvas:_},...i.args)),h()});let M=u.useResize(()=>{v(),f(),{destroy:f,play:h,stop:v,resume:y}=lp[i.name]({targets:S,container:T,canvas:_},...i.args),h()});return()=>{f(),M(),f=null,h=null,v=null,y=null}}),g`<div class="c-math">
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
    </div>`};var _c=m.createComponent({tag:"math-animation",component:hx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([_c]);var fx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Sk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,gx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Sk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var bx=m.createComponent({tag:"rosa-di-grandi-page",component:gx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[_c]});m.useComponent([bx]);var yx=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var pp="home",xc="about",K="template-mobJs-component",Re="template-doc-default",Zn="template-listing",lt="template-animation",vt="template-test",Cc=new Set([K,Re]),ie=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Ye=[{url:"./#mobJs-overview",title:"mobJs"}],up=[{url:"./#mobCore-overview",title:"mobCore"}],$r=[{url:"./#mobMotion-overview",title:"mobMotion"}],Sc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],Y=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],pr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Ec=[{hash:"pageNotFound",layout:kv,props:{}},{hash:"onlyDesktop",layout:WS,props:{}},{hash:"about",layout:FT,templateName:xc,props:{}},{hash:"canvas-overview",layout:Ga,templateName:Zn,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:i_,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:l_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:d_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:b_,templateName:lt,props:{}},{hash:"async-timeline",layout:HS,templateName:lt,props:{}},{hash:"scrollerN0",layout:__,templateName:lt,props:{}},{hash:"scrollerN1",layout:E_,templateName:lt,props:{}},{hash:"dynamic-list",layout:z_,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Ye,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:iS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:aS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:q_,templateName:pp,props:{}},{hash:"mobCore-overview",layout:$e,skipTransition:!0,templateName:Re,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Sc}},{hash:"mobCore-defaults",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:up,section:"mobCore",rightSidebar:Sc}},{hash:"mobCore-events",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:up,section:"mobCore",rightSidebar:Sc}},{hash:"mobCore-store",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:up,section:"mobCore",rightSidebar:Sc}},{hash:"mobJs-overview",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:Y}},{hash:"mobJs-initialization",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-component",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-routing",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-benchmark-invalidate",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Ye,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Or,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-utils",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-memory-management",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-debug",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-onMount",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getProxi",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watch",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-staticProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-dataAttribute",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-delegateEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindtext",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindObject",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bind-effect",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-methods",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-refs",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-runtime",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-repeat",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-web-component",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-slot",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unBind",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emit",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emitAsync",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-computed",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindStore",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-removeDom",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-remove",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getChildren",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-freezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unFreezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getParentId",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watchParent",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-instanceName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-class-list",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobMotion-stagger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-defaults",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-overview",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-parallax",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-sequencer",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-scrolltrigger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-sync-timeline",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-create-stagger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-async-timeline",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"mobMotion-tween-spring-lerp",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:$r,section:"mobMotion",rightSidebar:pr}},{hash:"horizontalScroller",layout:yS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:kS,props:NS.shape1},{hash:"plugin-dragger",layout:ix,templateName:lt,props:{}},{hash:"math-animation-01",layout:fx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:yx,templateName:lt,props:{}},{hash:"plugin-overview",layout:Ga,templateName:Zn,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Ga,templateName:Zn,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:LS,templateName:lt,props:{}},{hash:"mob-02",layout:XS,templateName:lt,props:{}},{hash:"rdp-01",layout:GS,templateName:lt,props:{}}];var vx=0;m.beforeRouteChange(()=>{vx=window.scrollY});var xk=new Set([K,Re,Zn,xc,vt]),Ck=new Set([K,Re,Zn,xc,pp,vt]),Tx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=xk.has(t)?"var(--header-height)":"0",e.style.left=Ck.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${vx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},_x=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=H.createTimeTween({data:{opacity:1},duration:200}),i=H.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=we.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Sx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},xx=()=>{Sx(),u.useResize(()=>{Sx()})};var ni=!0,Ek=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},Cx=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},wk=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},Ik=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=dt().close,s=dt().previous,i=dt().up,a=dt().swap,c=dt().selectAll;return g`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.prev!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.prev&&(ni=!1,e.currentNode=e.currentNode?.prev)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.next!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.next&&(ni=!1,e.currentNode=e.currentNode?.next)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size>0}})}
                    ${t({click:()=>{Ek({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Cx({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Cx({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{wk({proxi:e,emit:o})}})}
                >
                    ${a}
                </button>
            </li>
            <li class="c-custom-history__select-all">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.linkedList.size>0,"should-add":()=>e.selectAllOn}})}
                    ${t({click:()=>{e.selectAllOn=!e.selectAllOn}})}
                >
                    ${c}
                </button>
            </li>
        </ul>
    `},Ex=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),ni=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(ni&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}ni=!0}),g`
        <div
            class="c-custom-history"
            ${o({toggleClass:{active:()=>p.active}})}
        >
            <div class="custom-history__head">
                <h5>Custom history navigation ( max 20 )</h5>
            </div>
            <button
                class="c-custom-history__close"
                ${i({click:()=>p.active=!1})}
            ></button>
            ${Ik({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var wx=()=>{un(Gn)?.toggle()},Ix=({id:e})=>{un(Gn)?.addRouteWithoutUpdate({id:e})},Mx=({id:e,add:t})=>{un(Gn)?.addSelectedNodes({id:e,add:t})};function Mk(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var kx=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{Mx({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${n.id}"
                ${r({toggleAttribute:{checked:()=>n.checked}})}
                ${t({click:s=>{n.checked=s.currentTarget.checked}})}
            />
            <span class="checkbox-control"></span>
        </div>
        <button
            type="button"
            class="c-history-item__button"
            ${t({click:()=>{Ix({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${Mk(n.url)}
        </button>
    </div>`};var Rx=m.createComponent({tag:"history-item",component:kx,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Nx=m.createComponent({tag:"custom-history",component:Ex,state:{linkedList:()=>({value:new tn,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[Rx]});var es="reset",mr="tree",si="filter_component";var dr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=se(t),s=se(e),i=Fe(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var ts=u.createStore({currentId:()=>({value:"",type:String})});var Px=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Ax=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),kk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Rk=e=>e?e.map(t=>`${t}, `).join(""):"",Ox=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Nk=({getState:e})=>{let{id:t}=e();if(t===es)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Px(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Ax(r.methods)}</div>
        <div><strong>refs:</strong>: ${Ax(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${kk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Px(r?.repeaterInnerWrap?.classList)}
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
            ${Rk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Ox(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Ox(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Pk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},$x=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,ts.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:v}=Pk({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Nk({getState:r})})}
        </div>
    </div>`};var Lx=m.createComponent({tag:"debug-component",component:$x,state:{id:()=>({value:es,type:String,skipEqual:!1})}});var Dx=e=>{m.useMethodByName(ec)?.refreshList?.({testString:e})};var mp=async(e="")=>{await m.tick(),Dx(e)},Fx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(mp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;mp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;mp(s)}})}
        >
            find
        </button>
    </div>`);var Bx=m.createComponent({tag:"debug-filter-head",component:Fx});var Ak=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Vx=e=>`~${e}`,Ok=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Vx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Vx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Wx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Ok({testString:y}),await m.tick(),h?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:v}=await Ak({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},v=()=>{},f=()=>{}}}),g`
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
    `};var hr=e=>{m.useMethodByName(qs)?.updateId(e)},jx=()=>{m.useMethodByName(qs)?.refreshId()};var zx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{hr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Hx=m.createComponent({tag:"debug-filter-list-item",component:zx,bindStore:ts,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Ux=m.createComponent({tag:"debug-filter-list",component:Wx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Hx]});var Gx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var qx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;hr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;hr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);hr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);hr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",hr(es)}})}
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
                    ${r({click:()=>{jx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Jx=m.createComponent({tag:"debug-search",component:qx});var Yx=m.createComponent({tag:"debug-head",component:Gx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Jx]});var wc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",Tn),console.log("currentListValueMap",bs),console.log("activeRepeatMap",xn),console.log("onMountCallbackMap",vs),console.log("staticPropsMap",Cn),console.log("dynamicPropsMap",Tt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",qr.size),console.log("invalidateIdsMap",Ze),console.log("invalidateInstancesMap",be),console.log("repeatIdHostMap",zr),console.log("repeatIdsMap",et),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",Kd()),console.log("slotPlaceholderSize",zi()),console.log("bindTextPlaceholderMapSize",Ah()),console.log("instanceMap",Hr)};var Xx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=mr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=mr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=mr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{wc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===mr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===si&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=mr}})}
                            ${n({toggleClass:{active:()=>a.listType===mr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=si}})}
                            ${n({toggleClass:{active:()=>a.listType===si}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===mr&&a.active?g`
                                    <debug-tree
                                        name="${rc}"
                                    ></debug-tree>
                                `:a.listType===si&&a.active?g`
                                    <debug-filter-list
                                        name="${ec}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${qs}"></debug-component>
            </div>
        </div>
    </div>`};var Ic=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var $k=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=dr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Kx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await $k({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>Ic({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var Qx=()=>{m.useMethodByName(rc)?.refresh()};var Lk=e=>e>0?`( ${e} ) `:"",Zx=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>Zx({id:i,value:t}))},e0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>Zx({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=Ar.subscribe(d);return Ar.reset(d),s(()=>l.isOpen,async h=>{await Ar[h?"down":"up"](d),Qx()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Lk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{hr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${Ic({data:l.children,staticProps:t})}
        </div>
    </div>`};var t0=m.createComponent({tag:"debug-tree-item",component:e0,bindStore:ts,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var r0=m.createComponent({tag:"debug-tree",component:Kx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[t0]});var o0=m.createComponent({tag:"debug-overlay",component:Xx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:mr,type:String})},child:[r0,Lx,Yx,Bx,Ux]});var dp=()=>{},Mc=()=>{},kc=()=>{},Rc=()=>{},Dk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),n0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=ur(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),v=!1;h.addEventListener("input",()=>{kc?.(h.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Rc();return}({init:dp,destroy:Mc,move:kc,updateScroller:Rc}=dr({screen:d,scroller:f,scrollbar:h})),v=!0,dp(),Rc(),kc(0)}_.length===0&&(l.hide=!0,Mc?.(),v=!1)});return()=>{Mc?.(),y(),dp=()=>{},Mc=()=>{},kc=()=>{},Rc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Dk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var s0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var i0=m.createComponent({tag:"links-mobjs-button",component:s0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var a0=m.createComponent({tag:"links-mobjs",component:n0,child:[i0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var c0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=H.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:d,previous:f,labelList:h,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{h.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),d.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,d=null,h=null,v=null}}),g`<div
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
    </div>`};var l0=m.createComponent({tag:"quick-nav",component:c0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Fk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),u0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Cc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Fk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var p0=m.createComponent({tag:"right-sidebar",component:u0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var m0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=H.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var d0=m.createComponent({tag:"route-loader",component:m0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var h0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var f0=m.createComponent({tag:"scroll-down-label",component:h0,state:{active:()=>({value:!1,type:Boolean})}});var g0=()=>{m.useMethodByName(jo)?.setInputFocus()},hp=e=>{m.useMethodByName(jo)?.updateCurrentSearchFromSuggestion(e)},b0=e=>{m.useMethodByName(jo)?.shouldCloseSuggestion(e)},Nc=()=>{m.useMethodByName(jo)?.closeSuggestion()};var y0=({proxi:e})=>{e.active=!1,Nc()},Bk=({target:e})=>{e&&b0(e)},v0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{y0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{y0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Bk({target:a.target})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${jo}"
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
                    name="${Qs}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var T0=e=>{m.useMethodByName(Qs)?.update(e)},_0=()=>{m.useMethodByName(Qs)?.reset()};var Vk=async({currentSearch:e})=>{T0(e)},fp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Vk({currentSearch:r})},S0=({getRef:e,proxi:t})=>{_0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},x0=e=>`~${e}`,Wk=({currentSearch:e,proxi:t})=>{let o=ur().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${x0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${x0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},C0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),fp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.currentTarget.value;Wk({currentSearch:d,proxi:l})},60)})}
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
            ${e({click:()=>{fp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&fp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{S0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&S0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var E0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var jk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){hp(t);return}if(e.toLowerCase()==="escape"){Nc();return}},w0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{hp(o.word)},keydown:n=>{n.preventDefault(),jk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var I0=m.createComponent({tag:"search-overlay-suggestion-item",component:w0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var M0=m.createComponent({tag:"search-overlay-suggestion",component:E0,props:{list:()=>({value:[],type:Array})},child:[I0]});var k0=m.createComponent({tag:"search-overlay-header",component:C0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[M0]});var zk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Hk=new Set(["mob-title","mob-paragraph","mob-list"]),Uk=new Set(["mob-title","mob-paragraph"]),Gk=new Set(["mob-list"]),R0=async({currentSearch:e=""})=>{let t=Ec.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:zk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>Hk.has(y)).flatMap(y=>Uk.has(y?.component)?y.content:Gk.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:d,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var qk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},N0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await R0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:v,refresh:y}=qk({getRef:o});return d=v,s(()=>p.list,async()=>{await m.tick(),y(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Pc=()=>{m.useMethodByName(nc)?.toggle()};var Jk=({uri:e})=>{m.loadUrl({url:e}),Pc()},P0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Jk({uri:n.uri})}})}
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
    `};var A0=m.createComponent({tag:"search-overlay-list-item",component:P0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var O0=m.createComponent({tag:"search-overlay-list",component:N0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[A0]});var $0=m.createComponent({tag:"search-overlay",component:v0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[k0,O0]});var L0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var D0=m.createComponent({tag:"test-scss-grid",component:L0});var yo=()=>{let{templateName:e}=m.getActiveRoute();return Cc.has(e)?0:40};var F0=()=>{m.useMethodByName(tc)?.toggle()};var Yk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Xk=()=>g`
        <ul class="l-footer__bio">
            ${Yk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,B0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Xk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{F0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{wc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var V0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var W0=m.createComponent({tag:"debug-button",component:V0});var j0=m.createComponent({tag:"mob-footer",component:B0,child:[W0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Ac=()=>{m.useMethodByName(Ks)?.scrollTop()},Oc=()=>{m.useMethodByName(Ks)?.refresh()};var rs=({fireCallback:e=!0}={})=>{m.useMethodByName(oc)?.closeAllAccordion({fireCallback:e})};function Kk(){m.loadUrl({url:"home"}),rs(),Z.set("navigationIsOpen",!1),Ac()}var z0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>se(i)),u.useFrameIndex(()=>{s.isMounted=!0},yo())}),g`
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
                        ${e({click:()=>{Kk()}})}
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
    `};var H0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
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
    `};var U0=m.createComponent({tag:"mob-header-toggle",component:H0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var Qk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function Zk({delegateEvents:e}){let t=ur().header,{links:r}=t,o={github:dt().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{Qk({event:c})}})}
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
            </li>`}).join("")}var G0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Zk({delegateEvents:e})}
        </ul>
    `;var eR=()=>{Pc(),g0()},q0=({delegateEvents:e})=>{let t=dt().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{eR()}})}
    >
        ${t}
    </button>`};var J0=m.createComponent({tag:"search-cta",component:q0});var Y0=({delegateEvents:e})=>{let t=dt().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{wx()}})}
    >
        ${t}
    </button>`};var X0=m.createComponent({tag:"history-cta",component:Y0});var K0=m.createComponent({tag:"mob-header-utils",component:G0,child:[J0,X0]});var tR=({delegateEvents:e,staticProps:t})=>ur().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),Q0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${tR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var Z0=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var eC=m.createComponent({tag:"header-main-menu-button",component:Z0,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var tC=m.createComponent({tag:"header-main-menu",component:Q0,child:[eC],state:{isMounted:()=>({value:!1,type:Boolean})}});var rC=m.createComponent({tag:"mob-header",component:z0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[tC,K0,U0]});var gp=0,oC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(gp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${gp})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=se(r),d=se(c),f=se(l),v=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(v)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${gp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function rR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function oR({main:e,proxi:t}){Oc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function nR({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),Ut()})}var sR=()=>{Ac(),rs();let{navigationIsOpen:e}=Z.get();e||Pr.to(0)},nC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){oR({main:a,proxi:s});return}rR({main:a,proxi:s})}),nR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=oC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},yo()),()=>{}}),g`
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
                    ${r({click:()=>{sR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${oc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function iR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:d,scrollToSection:f,forceChildren:h,hide:v}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:d,hide:!!v})}
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
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:h??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var sC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=ur();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${iR({data:i,staticProps:e,bindProps:r,proxi:s})}
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
    `};var aC=m.createComponent({tag:"mob-navigation-label",component:iC,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function aR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var cC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return Ar.subscribe(d),Ar.reset(d),o(()=>a.isOpen,async f=>{await Ar[f?"down":"up"](d),Oc(),!f&&rs({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${aR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var lC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=d===-1||T?.activeId===`${d}`,_=h===y&&S,M=f.includes(h);o.isCurrent=_||M,_&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var $c=m.createComponent({tag:"mob-navigation-button",component:lC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var uC=m.createComponent({tag:"mob-navigation-submenu",component:cC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[$c]});var pC=m.createComponent({tag:"mob-navigation",component:sC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[aC,uC,$c]});var mC=m.createComponent({tag:"mob-navigation-container",component:nC,child:[pC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([rC,mC,j0,l0,d0,f0,a0,o0,D0,$0,p0,Nx]);var dC=async()=>g`
        ${""}
        <custom-history name="${Gn}"></custom-history>
        <debug-overlay name="${tc}"></debug-overlay>
        <mob-header name="${pT}"></mob-header>
        <mob-navigation-container
            name="${Ks}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${Js}"></quick-nav>
        <route-loader name="${ic}"></route-loader>
        <scroll-down-label name="${Ys}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${sc}"></right-sidebar>
        <search-overlay name="${nc}"></search-overlay>
    `;var bp=0,yp=document.querySelector(".js-main-loader-track"),hC=(e=60)=>{let t=()=>{if(bp++,!yp)return;let r=100*bp/e;if(yp.style.transform=`scaleX(${r/100})`,bp>=e){yp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var fC=e=>{m.useMethodByName(ic).skip(e)};var gC=60,bC=()=>le.mq("max","desktop"),cR=()=>{u.useResize(()=>{bC()&&m.loadUrl({url:"onlyDesktop"})})},Dc=document.body.querySelector(".js-main-loader"),Fc=document.body.querySelector(".js-main-loader-background"),Lc=H.createTimeTween({data:{opacity:1},duration:1e3});Dc&&Fc&&[Dc,Fc].forEach(e=>{Lc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var lR=async()=>{await Iv(),await Mv(),hC(gC),await u.useFps({duration:gC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:dC,routes:Ec,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Tx,pageTransition:_x,afterInit:async()=>{await Lc.goTo({opacity:0}),Lc.destroy(),Lc=null,Dc?.remove(),Fc?.remove(),Dc=null,Fc=null,xx(),cR(),fC(!1)},redirect:({route:e})=>bC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{xv(),le.setDefault({deferredNextTick:!0}),lR(),Sv()});})();
//# sourceMappingURL=main.js.map
