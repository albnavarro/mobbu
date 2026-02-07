"use strict";(()=>{var cC=Object.create;var Dc=Object.defineProperty;var lC=Object.getOwnPropertyDescriptor;var uC=Object.getOwnPropertyNames;var pC=Object.getPrototypeOf,mC=Object.prototype.hasOwnProperty;var hC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),vo=(e,t)=>{for(var r in t)Dc(e,r,{get:t[r],enumerable:!0})},dC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of uC(t))!mC.call(e,n)&&n!==r&&Dc(e,n,{get:()=>t[n],enumerable:!(o=lC(t,n))||o.enumerable});return e};var fC=(e,t,r)=>(r=e!=null?cC(pC(e)):{},dC(t||!e||!e.__esModule?Dc(r,"default",{value:e,enumerable:!0}):r,e));var Zv=hC((lJ,Qv)=>{function Vv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Vv(r)}),e}var qa=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Wv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function mo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var xI="</span>",Ov=e=>!!e.scope,CI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Au=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Wv(t)}openNode(t){if(!Ov(t))return;let r=CI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Ov(t)&&(this.buffer+=xI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},$v=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Ou=class e{constructor(){this.rootNode=$v(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=$v({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},$u=class extends Ou{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Au(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function js(e){return e?typeof e=="string"?e:e.source:null}function jv(e){return Wo("(?=",e,")")}function EI(e){return Wo("(?:",e,")*")}function wI(e){return Wo("(?:",e,")?")}function Wo(...e){return e.map(r=>js(r)).join("")}function II(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Du(...e){return"("+(II(e).capture?"":"?:")+e.map(o=>js(o)).join("|")+")"}function zv(e){return new RegExp(e.toString()+"|").exec("").length-1}function MI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var kI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Fu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=js(o),i="";for(;s.length>0;){let a=kI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var RI=/\b\B/,Uv="[a-zA-Z]\\w*",Bu="[a-zA-Z_]\\w*",Hv="\\b\\d+(\\.\\d+)?",Gv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",qv="\\b(0b[01]+)",PI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",NI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Wo(t,/.*\b/,e.binary,/\b.*/)),mo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},zs={begin:"\\\\[\\s\\S]",relevance:0},AI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[zs]},OI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[zs]},$I={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ya=function(e,t,r={}){let o=mo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Du("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Wo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},LI=Ya("//","$"),DI=Ya("/\\*","\\*/"),FI=Ya("#","$"),BI={scope:"number",begin:Hv,relevance:0},VI={scope:"number",begin:Gv,relevance:0},WI={scope:"number",begin:qv,relevance:0},jI={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[zs,{begin:/\[/,end:/\]/,relevance:0,contains:[zs]}]},zI={scope:"title",begin:Uv,relevance:0},UI={scope:"title",begin:Bu,relevance:0},HI={begin:"\\.\\s*"+Bu,relevance:0},GI=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Ga=Object.freeze({__proto__:null,APOS_STRING_MODE:AI,BACKSLASH_ESCAPE:zs,BINARY_NUMBER_MODE:WI,BINARY_NUMBER_RE:qv,COMMENT:Ya,C_BLOCK_COMMENT_MODE:DI,C_LINE_COMMENT_MODE:LI,C_NUMBER_MODE:VI,C_NUMBER_RE:Gv,END_SAME_AS_BEGIN:GI,HASH_COMMENT_MODE:FI,IDENT_RE:Uv,MATCH_NOTHING_RE:RI,METHOD_GUARD:HI,NUMBER_MODE:BI,NUMBER_RE:Hv,PHRASAL_WORDS_MODE:$I,QUOTE_STRING_MODE:OI,REGEXP_MODE:jI,RE_STARTERS_RE:PI,SHEBANG:NI,TITLE_MODE:zI,UNDERSCORE_IDENT_RE:Bu,UNDERSCORE_TITLE_MODE:UI});function qI(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function JI(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function YI(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=qI,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function XI(e,t){Array.isArray(e.illegal)&&(e.illegal=Du(...e.illegal))}function KI(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function QI(e,t){e.relevance===void 0&&(e.relevance=1)}var ZI=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Wo(r.beforeMatch,jv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},eM=["of","and","for","in","not","or","if","then","parent","list","value"],tM="keyword";function Jv(e,t,r=tM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Jv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,rM(c[0],c[1])]})}}function rM(e,t){return t?Number(t):oM(e)?0:1}function oM(e){return eM.includes(e.toLowerCase())}var Lv={},Vo=e=>{console.error(e)},Dv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Wn=(e,t)=>{Lv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Lv[`${e}/${t}`]=!0)},Ja=new Error;function Yv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=zv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function nM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Vo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ja;if(typeof e.beginScope!="object"||e.beginScope===null)throw Vo("beginScope must be object"),Ja;Yv(e,e.begin,{key:"beginScope"}),e.begin=Fu(e.begin,{joinWith:""})}}function sM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Vo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ja;if(typeof e.endScope!="object"||e.endScope===null)throw Vo("endScope must be object"),Ja;Yv(e,e.end,{key:"endScope"}),e.end=Fu(e.end,{joinWith:""})}}function iM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function aM(e){iM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),nM(e),sM(e)}function cM(e){function t(i,a){return new RegExp(js(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=zv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Fu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[JI,KI,aM,ZI].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[YI,XI,QI].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Jv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=js(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return lM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=mo(e.classNameAliases||{}),s(e)}function Xv(e){return e?e.endsWithParent||Xv(e.starts):!1}function lM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return mo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Xv(e)?mo(e,{starts:e.starts?mo(e.starts):null}):Object.isFrozen(e)?mo(e):e}var uM="11.11.1",Lu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Nu=Wv,Fv=mo,Bv=Symbol("nomatch"),pM=7,Kv=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:$u};function c(E){return a.noHighlightRe.test(E)}function l(E){let R=E.className+" ";R+=E.parentNode?E.parentNode.className:"";let $=a.languageDetectRe.exec(R);if($){let B=N($[1]);return B||(Dv(s.replace("{}",$[1])),Dv("Falling back to no-highlight mode for this block.",E)),B?$[1]:"no-highlight"}return R.split(/\s+/).find(B=>c(B)||N(B))}function p(E,R,$){let B="",V="";typeof R=="object"?(B=E,$=R.ignoreIllegals,V=R.language):(Wn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Wn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=E,B=R),$===void 0&&($=!0);let q={code:B,language:V};D("before:highlight",q);let ee=q.result?q.result:h(q.language,q.code,$);return ee.code=q.code,D("after:highlight",ee),ee}function h(E,R,$,B){let V=Object.create(null);function q(W,H){return W.keywords[H]}function ee(){if(!X.keywords){Ue.addText(Me);return}let W=0;X.keywordPatternRe.lastIndex=0;let H=X.keywordPatternRe.exec(Me),ae="";for(;H;){ae+=Me.substring(W,H.index);let Ce=Xe.case_insensitive?H[0].toLowerCase():H[0],tt=q(X,Ce);if(tt){let[dr,iC]=tt;if(Ue.addText(ae),ae="",V[Ce]=(V[Ce]||0)+1,V[Ce]<=pM&&(ri+=iC),dr.startsWith("_"))ae+=H[0];else{let aC=Xe.classNameAliases[dr]||dr;ye(H[0],aC)}}else ae+=H[0];W=X.keywordPatternRe.lastIndex,H=X.keywordPatternRe.exec(Me)}ae+=Me.substring(W),Ue.addText(ae)}function ue(){if(Me==="")return;let W=null;if(typeof X.subLanguage=="string"){if(!t[X.subLanguage]){Ue.addText(Me);return}W=h(X.subLanguage,Me,!0,es[X.subLanguage]),es[X.subLanguage]=W._top}else W=d(Me,X.subLanguage.length?X.subLanguage:null);X.relevance>0&&(ri+=W.relevance),Ue.__addSublanguage(W._emitter,W.language)}function re(){X.subLanguage!=null?ue():ee(),Me=""}function ye(W,H){W!==""&&(Ue.startScope(H),Ue.addText(W),Ue.endScope())}function ve(W,H){let ae=1,Ce=H.length-1;for(;ae<=Ce;){if(!W._emit[ae]){ae++;continue}let tt=Xe.classNameAliases[W[ae]]||W[ae],dr=H[ae];tt?ye(dr,tt):(Me=dr,ee(),Me=""),ae++}}function ge(W,H){return W.scope&&typeof W.scope=="string"&&Ue.openNode(Xe.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ye(Me,Xe.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Me=""):W.beginScope._multi&&(ve(W.beginScope,H),Me="")),X=Object.create(W,{parent:{value:X}}),X}function Ne(W,H,ae){let Ce=MI(W.endRe,ae);if(Ce){if(W["on:end"]){let tt=new qa(W);W["on:end"](H,tt),tt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Ne(W.parent,H,ae)}function Be(W){return X.matcher.regexIndex===0?(Me+=W[0],1):(Lc=!0,0)}function J(W){let H=W[0],ae=W.rule,Ce=new qa(ae),tt=[ae.__beforeBegin,ae["on:begin"]];for(let dr of tt)if(dr&&(dr(W,Ce),Ce.isMatchIgnored))return Be(H);return ae.skip?Me+=H:(ae.excludeBegin&&(Me+=H),re(),!ae.returnBegin&&!ae.excludeBegin&&(Me=H)),ge(ae,W),ae.returnBegin?0:H.length}function Te(W){let H=W[0],ae=R.substring(W.index),Ce=Ne(X,W,ae);if(!Ce)return Bv;let tt=X;X.endScope&&X.endScope._wrap?(re(),ye(H,X.endScope._wrap)):X.endScope&&X.endScope._multi?(re(),ve(X.endScope,W)):tt.skip?Me+=H:(tt.returnEnd||tt.excludeEnd||(Me+=H),re(),tt.excludeEnd&&(Me=H));do X.scope&&Ue.closeNode(),!X.skip&&!X.subLanguage&&(ri+=X.relevance),X=X.parent;while(X!==Ce.parent);return Ce.starts&&ge(Ce.starts,W),tt.returnEnd?0:H.length}function Ge(){let W=[];for(let H=X;H!==Xe;H=H.parent)H.scope&&W.unshift(H.scope);W.forEach(H=>Ue.openNode(H))}let ut={};function _t(W,H){let ae=H&&H[0];if(Me+=W,ae==null)return re(),0;if(ut.type==="begin"&&H.type==="end"&&ut.index===H.index&&ae===""){if(Me+=R.slice(H.index,H.index+1),!n){let Ce=new Error(`0 width match regex (${E})`);throw Ce.languageName=E,Ce.badRule=ut.rule,Ce}return 1}if(ut=H,H.type==="begin")return J(H);if(H.type==="illegal"&&!$){let Ce=new Error('Illegal lexeme "'+ae+'" for mode "'+(X.scope||"<unnamed>")+'"');throw Ce.mode=X,Ce}else if(H.type==="end"){let Ce=Te(H);if(Ce!==Bv)return Ce}if(H.type==="illegal"&&ae==="")return Me+=`
`,1;if($c>1e5&&$c>H.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Me+=ae,ae.length}let Xe=N(E);if(!Xe)throw Vo(s.replace("{}",E)),new Error('Unknown language: "'+E+'"');let Zn=cM(Xe),$r="",X=B||Zn,es={},Ue=new a.__emitter(a);Ge();let Me="",ri=0,yo=0,$c=0,Lc=!1;try{if(Xe.__emitTokens)Xe.__emitTokens(R,Ue);else{for(X.matcher.considerAll();;){$c++,Lc?Lc=!1:X.matcher.considerAll(),X.matcher.lastIndex=yo;let W=X.matcher.exec(R);if(!W)break;let H=R.substring(yo,W.index),ae=_t(H,W);yo=W.index+ae}_t(R.substring(yo))}return Ue.finalize(),$r=Ue.toHTML(),{language:E,value:$r,relevance:ri,illegal:!1,_emitter:Ue,_top:X}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:E,value:Nu(R),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:R.slice(yo-100,yo+100),mode:W.mode,resultSoFar:$r},_emitter:Ue};if(n)return{language:E,value:Nu(R),illegal:!1,relevance:0,errorRaised:W,_emitter:Ue,_top:X};throw W}}function f(E){let R={value:Nu(E),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return R._emitter.addText(E),R}function d(E,R){R=R||a.languages||Object.keys(t);let $=f(E),B=R.filter(N).filter(I).map(re=>h(re,E,!1));B.unshift($);let V=B.sort((re,ye)=>{if(re.relevance!==ye.relevance)return ye.relevance-re.relevance;if(re.language&&ye.language){if(N(re.language).supersetOf===ye.language)return 1;if(N(ye.language).supersetOf===re.language)return-1}return 0}),[q,ee]=V,ue=q;return ue.secondBest=ee,ue}function v(E,R,$){let B=R&&r[R]||$;E.classList.add("hljs"),E.classList.add(`language-${B}`)}function y(E){let R=null,$=l(E);if(c($))return;if(D("before:highlightElement",{el:E,language:$}),E.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",E);return}if(E.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(E)),a.throwUnescapedHTML))throw new Lu("One of your code blocks includes unescaped HTML.",E.innerHTML);R=E;let B=R.textContent,V=$?p(B,{language:$,ignoreIllegals:!0}):d(B);E.innerHTML=V.value,E.dataset.highlighted="yes",v(E,$,V.language),E.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(E.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),D("after:highlightElement",{el:E,result:V,text:B})}function T(E){a=Fv(a,E)}let S=()=>{x(),Wn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),Wn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let M=!1;function x(){function E(){x()}if(document.readyState==="loading"){M||window.addEventListener("DOMContentLoaded",E,!1),M=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function C(E,R){let $=null;try{$=R(e)}catch(B){if(Vo("Language definition for '{}' could not be registered.".replace("{}",E)),n)Vo(B);else throw B;$=i}$.name||($.name=E),t[E]=$,$.rawDefinition=R.bind(null,e),$.aliases&&L($.aliases,{languageName:E})}function w(E){delete t[E];for(let R of Object.keys(r))r[R]===E&&delete r[R]}function O(){return Object.keys(t)}function N(E){return E=(E||"").toLowerCase(),t[E]||t[r[E]]}function L(E,{languageName:R}){typeof E=="string"&&(E=[E]),E.forEach($=>{r[$.toLowerCase()]=R})}function I(E){let R=N(E);return R&&!R.disableAutodetect}function P(E){E["before:highlightBlock"]&&!E["before:highlightElement"]&&(E["before:highlightElement"]=R=>{E["before:highlightBlock"](Object.assign({block:R.el},R))}),E["after:highlightBlock"]&&!E["after:highlightElement"]&&(E["after:highlightElement"]=R=>{E["after:highlightBlock"](Object.assign({block:R.el},R))})}function A(E){P(E),o.push(E)}function k(E){let R=o.indexOf(E);R!==-1&&o.splice(R,1)}function D(E,R){let $=E;o.forEach(function(B){B[$]&&B[$](R)})}function F(E){return Wn("10.7.0","highlightBlock will be removed entirely in v12.0"),Wn("10.7.0","Please use highlightElement now."),y(E)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:y,highlightBlock:F,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:C,unregisterLanguage:w,listLanguages:O,getLanguage:N,registerAliases:L,autoDetection:I,inherit:Fv,addPlugin:A,removePlugin:k}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=uM,e.regex={concat:Wo,lookahead:jv,either:Du,optional:wI,anyNumberOfTimes:EI};for(let E in Ga)typeof Ga[E]=="object"&&Vv(Ga[E]);return Object.assign(e,Ga),e},jn=Kv({});jn.newInstance=()=>Kv({});Qv.exports=jn;jn.HighlightJS=jn;jn.default=jn});var u={};vo(u,{ANIMATION_STOP_REJECT:()=>Qc,checkType:()=>Ie,createStore:()=>TE,debounce:()=>To,getFps:()=>SE,getInstantFps:()=>_E,getTime:()=>Gt,getTypeName:()=>rs,getUnivoqueId:()=>ke,mustMakeSomething:()=>xE,normalizeWheel:()=>mi,shouldMakeSomething:()=>CE,store:()=>ZE,throttle:()=>oi,useCache:()=>PE,useDebounce:()=>To,useFps:()=>kE,useFrame:()=>EE,useFrameIndex:()=>ME,useLinkedList:()=>ew,useLoad:()=>RE,useMouseClick:()=>OE,useMouseDown:()=>$E,useMouseMove:()=>DE,useMouseUp:()=>BE,useMouseWheel:()=>WE,useNextFrame:()=>IE,useNextLoop:()=>Ot,useNextTick:()=>wE,usePointerDown:()=>JE,usePointerLeave:()=>QE,usePointerMove:()=>YE,usePointerOut:()=>KE,usePointerOver:()=>qE,usePointerUp:()=>XE,useResize:()=>NE,useScroll:()=>jE,useScrollEnd:()=>GE,useScrollImmediate:()=>zE,useScrollStart:()=>HE,useScrollThrottle:()=>UE,useTouchEnd:()=>VE,useTouchMove:()=>FE,useTouchStart:()=>LE,useVisibilityChange:()=>AE});var Gt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),hp=16.666666666666668;var oi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Gt()-o>=t&&(e.apply(n,s),o=Gt())},t-(Gt()-o))):(e.apply(n,s),o=Gt())}};var To=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function se(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Ve(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function de(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function St(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ts(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function _o(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Fc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ke=()=>`_${Math.random().toString(36).slice(2,9)}`;function dp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Bc=(e,t,r)=>Math.min(Math.max(e,t),r);var ni=new Set,Ot=e=>{ni.add(e),ni.size===1&&setTimeout(()=>{ni.forEach(t=>{t()}),ni.clear()})};var Vc="UNTYPED",fp="STRING",gp="NUMBER",bp="OBJECT",yp="FUNCTION",si="ARRAY",vp="BOOLEAN",Tp="ELEMENT",_p="HTMLELEMENT",Sp="NODELIST";var Ee={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},rs=e=>{switch(e){case String:case fp:return"String";case Number:case gp:return"Number";case Object:case bp:return"Object";case Function:case yp:return"Function";case Array:case si:return"Array";case Boolean:case vp:return"Boolean";case Element:case Tp:return"Element";case HTMLElement:case _p:return"HTMLElement";case NodeList:case Sp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Vc}},Ie=(e,t)=>{switch(e){case String:case fp:return Ee.isString(t);case Number:case gp:return Ee.isNumber(t);case Object:case bp:return Ee.isObject(t);case Function:case yp:return Ee.isFunction(t);case Array:case si:return Ee.isArray(t);case Boolean:case vp:return Ee.isBoolean(t);case Element:case Tp:return Ee.isElement(t);case HTMLElement:case _p:return Ee.isHTMLElement(t);case NodeList:case Sp:return Ee.isNodeList(t);case Set:case"SET":return Ee.isSet(t);case Map:case"MAP":return Ee.isMap(t);case"ANY":return!0;default:return!0}};var yC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),vC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),TC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},xp=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(xp(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Wc=(e,t,r)=>{switch(e){case"ANY":return xp(t,r);case si:case Array:return TC(t,r);case"SET":case Set:return vC(t,r);case"MAP":case Map:return yC(t,r);default:return t===r}};var ii="UPDATE";var Re={};vo(Re,{extractKeysFromArray:()=>Uc,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>jc,getFirstCurrentDependencies:()=>zc,initializeCurrentDependencies:()=>os,setCurrentDependencies:()=>ci});var Uo=[],ai=!1,os=()=>{ai=!0,Uo.length=0},jc=()=>(ai=!1,[...Uo]),zc=()=>(ai=!1,[...Uo]?.[0]??"missing_prop"),ci=e=>{!ai||!e||Uo.includes(e)||(Uo=[...Uo,e])},Lr=e=>Ie(String,e)?e:(os(),e(),zc()),Uc=e=>e.map(t=>Ie(String,t)?t:(os(),t(),zc()));var ns=new Map,Cp=e=>{ns.delete(e)},Ho=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=ns.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),ns.set(s,l),p&&Ot(()=>{let d=ns.get(s),v=d?.get(t);if(v&&v.newValue!==void 0&&v.newValue!==null)for(let y of v.callbacks)y(v.newValue,v.oldValue,v.validationValue);d?.delete(t),d?.size===0&&ns.delete(s)})}}},Ep=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var _C="padding: 10px;",We=()=>_C;var fr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=fr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(fr(s,t),fr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(fr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:fr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:fr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Hc="store_shallow_copy",wp="store_custom_copy",Ip="store_deep_copy",li=Hc;var De=new Map,oe=e=>{if(li===Hc){let t=De.get(e);return t?{...t}:void 0}if(li===wp){let t=De.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(li===Ip){let t=De.get(e);return t?{...t,store:fr(t.store),validationStatusObject:fr(t.validationStatusObject)}:void 0}return De.get(e)},$e=(e,t)=>{De.set(e,t)},Mp=e=>{De.delete(e)};var Gc=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var kp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Rp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Pp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Np=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${rs(r)}`,o)},Ap=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Op=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},$p=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Lp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Dp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${rs(o)}`,n)},Fp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},qc=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Bp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Vp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},Wp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var jp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},Jc=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var ss=e=>{if(!Ee.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>ss(r)))+1},zp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ee.isObject(o)&&t)return[r,zp(o,!1)];if(Ee.isFunction(o)){let n=o();if(Ee.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),Up=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ee.isObject(s)&&o)return[n,Up(s,t,r,!1)];if(Ee.isFunction(s)){let i=s();if(Ee.isObject(i)&&"value"in i&&t in i){let a=Ee.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Hp=({data:e,depth:t,logStyle:r})=>t>2?(Gc(t,r),{}):zp(e),Go=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(Gc(r,o),{}):Up(e,t,n),Gp=({value:e})=>Ie(Map,e)?new Map(e):Ie(Set,e)?new Set(e):Ie(Object,e)?{...e}:Ie(Array,e)?[...e]:e,Dr=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var SC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=We(),S=a[t]==="ANY";if(Ee.isObject(r)&&!S){Rp(t,r,T);return}if(Ee.isObject(l[t])&&!S){Pp(t,T);return}let _=l[t],M=c[t]?.(r,_)??r;if(!Ie(a[t],M)){Np(t,M,a[t],T);return}let C=p[t]?.(M,_);!C&&s&&Jc(t,T),!(h[t]&&!C&&n||(f[t]=C,(d[t]?Wc(a[t],_,M):!1)&&!s))&&(l[t]=M,$e(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:M,oldValue:_,validationValue:f[t],instanceId:e}),gr({instanceId:e,prop:t}),y.forEach(O=>{gr({instanceId:O,prop:t})})))},xC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=oe(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=We();if(!Ee.isObject(r)){Ap(t,r,T);return}if(!Ee.isObject(a[t])){Op(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(k=>_.includes(k))){$p(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[D,F]=k,E=a[t][D];return[D,p[t][D]?.(F,E)??F]}));if(!Object.entries(x).map(k=>{let[D,F]=k,E=Ie(c[t][D],F);return E||Dp(t,D,F,c[t][D],T),E}).every(k=>k===!0))return;let w=Object.entries(x).map(k=>{let[D,F]=k,E=a[t][D];return l[t][D]&&n?{strictCheck:h[t][D]?.(F,E),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(w.length===0)return;let N=Object.fromEntries(w.map(({item:k})=>k).map(([k,D])=>[k,D]));Object.entries(N).forEach(k=>{let[D,F]=k,E=a[t][D],R=h[t][D]?.(F,E);!R&&s&&Jc(t,T),R===void 0&&Wp(T,"ANY"),f[t][D]=R});let L=a[t],I={...a[t],...N},P=Object.keys(N).every(k=>d[t][k]===!0);for(let[k,D]of Object.entries(N)){let F=c[t][k]==="ANY";if(ss(D)>1&&!F){Lp(t,x,T);return}}P&&Object.entries(I).every(([k,D])=>Wc(c[t][k],L[k],D))&&!s||(a[t]=I,$e(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Ho({watcherByProp:v,prop:t,newValue:a[t],oldValue:L,validationValue:f[t],instanceId:e}),gr({instanceId:e,prop:t}),y.forEach(k=>{gr({instanceId:k,prop:t})})))},br=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=oe(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=We();if(!(t in l)){kp(t,h);return}let f=n?Gp({value:l[t]}):l[t],d=i===ii?r(f):r,v=p[t]==="ANY";if(Ee.isObject(f)&&!v){xC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}SC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},qp=({instanceId:e,prop:t,value:r})=>{let o=oe(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,$e(e,{...o,store:n}),Ho({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},Jp=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=oe(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),CC=e=>{let t=oe(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=Jp({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});$e(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{br({instanceId:e,prop:l,value:p,action:"SET"})})},gr=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),$e(e,{...r,computedPropsQueque:n}),!s)){let i=oe(e);if(!i)return;$e(e,{...i,computedRunning:!0}),Ot(()=>CC(e))}},EC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=oe(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Bp(r,We());return}s.add({prop:t,keys:r,fn:o}),$e(e,{...n,callBackComputed:s})},wC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=oe(e);if(!n)return;let{store:s,bindInstance:i}=n,a=Jp({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);br({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},Yp=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Dr({instanceId:e,prop:t}))return;let s=r.length===0?(os(),o({}),jc()):r;wC({instanceId:e,prop:t,keys:s,callback:o}),EC({instanceId:e,prop:t,keys:s,fn:o})};var Xp=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ee.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},Kp=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;br({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var IC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=We();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Vp(t,a),{state:void 0,unsubscribeId:""};let c=ke();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},MC=({instanceId:e,unsubscribeId:t})=>{let r=oe(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),$e(e,{...r,watcherByProp:o,watcherMetadata:n}))},Qp=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=IC({state:n,prop:t,callback:r,wait:o});return s?($e(e,s),()=>{MC({instanceId:e,unsubscribeId:i})}):()=>{}},Zp=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=oe(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return Qp({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=oe(p)?.store;return h&&t in h})??"",c=Qp({instanceId:a,prop:t,callback:r,wait:o}),l=oe(e);return l?($e(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=oe(e);p&&$e(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var em=e=>{let t=ss(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Hp({data:e,depth:t,logStyle:We()}),type:Go({data:e,prop:"type",depth:t,logStyle:We(),fallback:Vc}),fnTransformation:Go({data:e,prop:"transform",depth:t,logStyle:We(),fallback:r=>r}),fnValidate:Go({data:e,prop:"validate",depth:t,logStyle:We(),fallback:()=>!0}),strict:Go({data:e,prop:"strict",depth:t,logStyle:We(),fallback:!1}),skipEqual:Go({data:e,prop:"skipEqual",depth:t,logStyle:We(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var tm=e=>{let t=oe(e);if(!t)return{};let{store:r}=t;return r??{}},om=e=>{let t=oe(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?tm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(tm(o))))},rm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Fp(t,We())},nm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return rm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";return rm({instanceId:n,prop:t})};var sm=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Ho({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),gr({instanceId:e,prop:t}),i.forEach(a=>{gr({instanceId:a,prop:t})})):qc(t,We()))},ui=({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){sm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";sm({instanceId:n,prop:t})},im=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Ep({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),gr({instanceId:e,prop:t}),i.forEach(a=>{gr({instanceId:a,prop:t})}),{success:!0}):(qc(t,We()),{success:!1}):new Promise(a=>a({success:!1}))},am=async({instanceId:e,prop:t})=>{let r=oe(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return im({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=De.get(s)?.store;return i&&t in i})??"";return im({instanceId:n,prop:t})};var cm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;return r},lm=({instanceId:e})=>{let t=oe(e);if(!t)return;let{store:r}=t;console.log(r)},um=({instanceId:e})=>{let t=oe(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},pm=({instanceId:e})=>{let t=oe(e);console.log(t)};var kC=e=>!(e==null||!Ie(Object,e)||Ie(Map,e)||Ie(Set,e)||Ie(Function,e)),RC=e=>{let t=We();return new Proxy({},{set(r,o,n){let s=De.get(e);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&jp(o,t),i||a?!1:(br({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!De.has(e))return;let n=De.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],ci(o)),!(o in n.store))for(let i of n.bindInstance){let a=De.get(i);if(a&&o in a.store){s=a.store[o],ci(o);break}}if(s!==void 0)return kC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!De.has(e))return!1;let n=De.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=De.get(s);if(i&&o in i.store)return!0}return!1}})},mm=({instanceId:e})=>{let t=De.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=RC(e);return $e(e,{...t,proxiObject:r}),r};var PC=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];$e(t,{...r,bindInstanceBy:n})},hm=({selfId:e,bindId:t})=>{let r=oe(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);$e(t,{...r,bindInstanceBy:n})},NC=({bindStores:e,selfStore:t})=>{let o=[...Ie(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},dm=({value:e,instanceId:t})=>{let r=oe(t);if(!r)return;NC({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Ie(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];$e(t,{...r,bindInstance:l}),s.forEach(p=>{PC({selfId:t,bindId:p})})};var fm=e=>{let t=De.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{hm({selfId:e,bindId:n})}),Cp(e),Mp(e)};var gm=({instanceId:e,values:t})=>{let r=oe(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),$e(e,r)};var pi=(e={})=>{let t=ke(),r=em(e),o=Xp(r);return $e(t,o),Kp(t,r),{getId:()=>t,bindStore:n=>{dm({value:n,instanceId:t})},get:()=>om(t),getProp:n=>nm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:t,prop:c})||br({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:t,prop:l})||br({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:ii})},getProxi:()=>mm({instanceId:t}),quickSetProp:(n,s)=>{Dr({instanceId:t,prop:n})||qp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=Zp({instanceId:t,prop:c,callback:s,wait:i});return a&&Ot(()=>{ui({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=Uc(i);Yp({instanceId:t,prop:c,keys:l,callback:s}),Ot(()=>{ui({instanceId:t,prop:c})})},emit:n=>{let s=Lr(n);ui({instanceId:t,prop:s})},emitAsync:async n=>{let s=Lr(n);return am({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{gm({instanceId:t,values:n})},getValidation:()=>cm({instanceId:t}),debug:()=>{pm({instanceId:t})},debugStore:()=>{lm({instanceId:t})},debugValidate:()=>{um({instanceId:t})},destroy:()=>{fm(t)}}};var _e=pi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var Yc=!1,is=new Map;function bm(){if(is.size===0){globalThis.removeEventListener("DOMContentLoaded",bm),Yc=!1;return}for(let e of is.values())e();is.clear()}function AC(){Yc||(Yc=!0,globalThis.addEventListener("DOMContentLoaded",bm,{passive:!1}))}var OC=e=>{let t=ke();return is.set(t,e),typeof globalThis<"u"&&AC(),()=>is.delete(t)},ym=OC;function mi(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function $C({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function LC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=_e.get();_e.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=$C({type:c,event:a}),{clientX:h,clientY:f}=LC({type:c,event:a}),d=a.target,v={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=_e.getProp("spinYMaxValue"),T=_e.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:M,pixelY:x}=mi(a);v.spinX=Bc(S,-T,T),v.spinY=Bc(_,-y,y),v.pixelX=M,v.pixelY=x}for(let y of r.values())y(v)}function s(){t||(t=!0,o=_e.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var vm=Br("click"),Tm=Br("mousedown"),_m=Br("touchstart"),Sm=Br("mousemove"),xm=Br("touchmove"),Cm=Br("mouseup"),Em=Br("touchend"),wm=Br("wheel");var So=0,Ke=new Map,DC=(e=()=>{})=>{let t=ke();return Ke.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ke.has(t)){let r=Ke.get(t);if(!r)return;let o=r.data.size;if(Ke.delete(t),!o)return;So=So-o}}}},FC=({id:e,callBackObject:t,frame:r})=>{if(!Ke.has(e))return;let{currentFrame:o}=_e.get(),n=Ke.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),So++)},BC=e=>{Ke.has(e)&&Ke.delete(e)},VC=e=>{let t=Ke.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=_e.get();t.freeze={active:!0,atFrame:r}},WC=({id:e,update:t=!0})=>{let r=Ke.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=_e.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},jC=e=>{let t=Ke.get(e);if(!t)return;let r=t.data.size;So=So-r,t.data.clear()},zC=e=>Ke.get(e)??{},UC=e=>{for(let t of Ke.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),So--)}},HC=({id:e,obj:t={}})=>{if(!Ke.has(e))return;let r=Ke.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},GC=()=>So,qC=e=>{for(let[t,r]of Ke){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ke.set(t,{data:i,fn:n,freeze:s})}},qo={add:DC,get:zC,update:FC,remove:BC,clean:jC,fire:UC,fireObject:HC,getCacheCounter:GC,updateFrameId:qC,freeze:VC,unFreeze:WC};var Xc=!1,hi=new Map;function Im(){if(hi.size===0){globalThis.removeEventListener("visibilitychange",Im),Xc=!1;return}let e={visibilityState:document.visibilityState};for(let t of hi.values())t(e)}function JC(){Xc||(Xc=!0,globalThis.addEventListener("visibilitychange",Im,{passive:!1}))}var YC=e=>{let t=ke();return hi.set(t,e),typeof globalThis<"u"&&JC(),()=>hi.delete(t)},di=YC;var as=[],XC=(e=()=>{},t=100)=>{as.push({cb:e,priority:t})},KC=({time:e,fps:t})=>{as.length!==0&&(as.sort((r,o)=>r.priority-o.priority),as.forEach(({cb:r})=>r({time:e,fps:t})),as.length=0)},xt={add:XC,fire:KC};var Kc=[],QC=e=>{Kc.push(e)},ZC=()=>{let e=[...Kc];return Kc.length=0,e},Jo={add:QC,get:ZC};var Vr=new Map,eE=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},tE=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},rE=(e,t)=>{let r=t+_e.getProp("currentFrame"),o=Vr.get(r)??[];Vr.set(r,[...o,e]),_e.emit("requestFrame")},oE=()=>Vr.size,Yo={add:rE,fire:tE,updateKeys:eE,getAmountOfFrameToFire:oE};var Qc="animationStop",Mm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===Qc&&e.preventDefault()})};var km=!1,fi=({force:e=!1,duration:t=30}={})=>{if(km&&!e){let{instantFps:r}=_e.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,v=Math.max(d,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){_e.quickSetProp("instantFps",y),km=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};fi();var Zc=1e7,Am=2e3,ol=!1,xo=[],Qe=Gt(),Rm=0,el=0,tl=0,nl=0,rl=0,Xo=!1,ot=60,Ti=ot,gi=0,bi=0,yr=0,yi=!1,vi=!1,nE=()=>ot<Ti/5*3,sE=()=>ot<Ti/5*4,iE=()=>{!nE()||yi||(yi=!0,setTimeout(()=>{yi=!1},4e3))},aE=()=>{!sE()||vi||(vi=!0,setTimeout(()=>{vi=!1},4e3))};di(({visibilityState:e})=>{Xo=e==="visible"});Mm();_e.watch("requestFrame",()=>{_i()});var Pm=()=>{yr===Zc&&(yr=0,_e.quickSetProp("currentFrame",yr),Yo.updateKeys(Zc),qo.updateFrameId(Zc)),xt.fire({time:Qe,fps:ot});let e=Jo.get();if(e.length>0)for(let t of e)xo.push(t);ol=!1,xo.length>0||Yo.getAmountOfFrameToFire()>0||qo.getCacheCounter()>0||Qe<Am?_i():(Xo=!0,yr=0,nl=Qe,_e.quickSetProp("currentFrame",yr))},Nm=e=>{Qe=e,tl=Qe-el,Xo&&(Rm+=tl),el+=tl,Qe=Math.round(el-Rm);let t=Math.round(1e3/ot);rl=Math.abs(Qe-nl-t);let r=rl>100?rl:0;Qe=Qe-r,nl=Qe,Xo?(bi=Qe,gi=0,ot=_e.getProp("instantFps")):gi++,Qe>bi+1e3&&!Xo&&(ot=Qe>Am?Math.round(gi*1e3/(Qe-bi)):_e.getProp("instantFps"),bi=Qe,gi=0,ot=ot<30?_e.getProp("instantFps"):ot),ot>Ti&&(Ti=ot),iE(),aE(),xo.forEach(n=>n({time:Qe,fps:ot})),Yo.fire({currentFrame:yr,time:Qe,fps:ot}),qo.fire(yr),yr++,_e.quickSetProp("currentFrame",yr),xo.length=0,Xo=!1,_e.getProp("deferredNextTick")?Ot(()=>Pm()):Pm()},_i=()=>{ol||(typeof globalThis>"u"?setTimeout(()=>Nm(Gt()),hp):requestAnimationFrame(Nm),ol=!0)},$t={add:s=>{xo.push(s),_i()},addMultiple:(s=[])=>{xo=[...xo,...s],_i()},getFps:()=>ot,mustMakeSomething:()=>yi,shouldMakeSomething:()=>vi};var sl=!1,Si=new Map,il=()=>{},Om=window.innerHeight,$m=window.innerWidth;function cE(){if(Si.size===0){window.removeEventListener("resize",il),sl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Om,o=t!==$m;Om=e,$m=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Si.values())s(n)}function lE(){sl||(sl=!0,il=To(()=>cE()),window.addEventListener("resize",il,{passive:!1}))}var uE=e=>{let t=ke();return Si.set(t,e),typeof globalThis<"u"&&lE(),()=>Si.delete(t)},Lm=uE;var al=!1,xi=new Map,pE="UP",Bm="DOWN",Dm=window.scrollY,cs=window.scrollY,cl=Bm,Fm={scrollY:cs,direction:cl};function Vm(){if(xi.size===0){window.removeEventListener("scroll",Vm),al=!1;return}Dm=cs,cs=window.scrollY,cl=cs>Dm?Bm:pE,Fm={scrollY:cs,direction:cl};for(let e of xi.values())e(Fm)}function mE(){al||(al=!0,window.addEventListener("scroll",Vm,{passive:!0}))}var hE=e=>{let t=ke();return xi.set(t,e),typeof globalThis<"u"&&mE(),()=>xi.delete(t)},vr=hE;var ll=!1,Ci=new Map,Wm=()=>{};function dE(e){if(Ci.size===0){Wm(),ll=!1;return}$t.add(()=>{xt.add(()=>{for(let t of Ci.values())t(e)},0)})}function fE(){ll||(ll=!0,Wm=vr(dE))}var gE=e=>{let t=ke();return Ci.set(t,e),typeof globalThis<"u"&&fE(),()=>Ci.delete(t)},jm=gE;var ul=!1,Ei=new Map,zm,Um=()=>{};function bE(e){if(Ei.size===0){Um(),ul=!1;return}$t.add(()=>{xt.add(()=>{for(let t of Ei.values())t(e)},0)})}function yE(){ul||(ul=!0,zm=oi(e=>bE(e),_e.getProp("throttle")),Um=vr(zm))}var vE=e=>{let t=ke();return Ei.set(t,e),typeof globalThis<"u"&&yE(),()=>Ei.delete(t)},Hm=vE;var Gm=()=>{},qm=()=>{},Jm=()=>{};function Ym(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){qm(),e==="START"&&Gm(),t=!1;return}$t.add(()=>{xt.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,Jm=To(()=>n()),qm=vr(Jm),e==="START"&&(Gm=vr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Xm=Ym("START"),Km=Ym("END");function Ko(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=ke();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var Qm=Ko("pointerover"),Zm=Ko("pointerdown"),eh=Ko("pointermove"),th=Ko("pointerup"),rh=Ko("pointerout"),oh=Ko("pointerleave");var je=Symbol("LinkedList.setNext"),ze=Symbol("LinkedList.setPrev"),wi="after",pl="before",Qo=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[je](t){this.#n=t}get prev(){return this.#t}[ze](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},Ii=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new Qo(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[je](r),r[ze](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new Qo(t);return this.#l.add(r),this.#n?(r[je](this.#n),this.#n[ze](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[je](t.next),t.next&&t.next[ze](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[ze](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[je](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new Qo(r);return this.#l.add(o),o[ze](t),o[je](t.next),t.next&&t.next[ze](o),t[je](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new Qo(r);return this.#l.add(o),o[je](t),o[ze](t.prev),t.prev&&t.prev[je](o),t[ze](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=wi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===wi&&r.next===t?this:o===pl&&r.prev===t?this:(t.prev&&t.prev[je](t.next),t.next&&t.next[ze](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==wi&&(t[ze](r),t[je](r.next),r.next&&r.next[ze](t),r[je](t),r===this.#t&&(this.#t=t)),o==pl&&(t[ze](r.prev),t[je](r),r.prev&&r.prev[je](t),r[ze](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,wi)}moveBefore(t,r){return this.move(t,r,pl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[je](n),n&&n[ze](o),s&&s[je](i),i&&i[ze](s),t[ze](s),t[je](i),r[ze](o),r[je](n),s&&s[je](t),i&&i[ze](t),o&&o[je](r),n&&n[ze](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[je](o),t[ze](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function TE(e){return pi(e)}function _E(){return _e.getProp("instantFps")}function SE(){return $t.getFps()}function xE(){return $t.mustMakeSomething()}function CE(){return $t.shouldMakeSomething()}function EE(e=()=>{}){return $t.add(e)}function wE(e=()=>{}){return xt.add(e)}function IE(e=()=>{}){return Jo.add(e)}function ME(e=()=>{},t=0){return Yo.add(e,t)}async function kE({force:e=!1,duration:t=30}={}){return await fi({force:e,duration:t})}function RE(e=()=>{}){return ym(e)}var PE=qo;function NE(e=()=>{}){return Lm(e)}function AE(e=()=>{}){return di(e)}function OE(e=()=>{}){return vm(e)}function $E(e=()=>{}){return Tm(e)}function LE(e=()=>{}){return _m(e)}function DE(e=()=>{}){return Sm(e)}function FE(e=()=>{}){return xm(e)}function BE(e=()=>{}){return Cm(e)}function VE(e=()=>{}){return Em(e)}function WE(e=()=>{}){return wm(e)}function jE(e=()=>{}){return jm(e)}function zE(e=()=>{}){return vr(e)}function UE(e=()=>{}){return Hm(e)}function HE(e=()=>{}){return Xm(e)}function GE(e=()=>{}){return Km(e)}function qE(e=()=>{}){return Qm(e)}function JE(e=()=>{}){return Zm(e)}function YE(e=()=>{}){return eh(e)}function XE(e=()=>{}){return th(e)}function KE(e=()=>{}){return rh(e)}function QE(e=()=>{}){return oh(e)}var ZE=_e;function ew(){return new Ii}var m={};vo(m,{afterRouteChange:()=>ch,beforeRouteChange:()=>ah,componentMap:()=>j,createComponent:()=>qd,eventDelegationMap:()=>bn,getActiveParams:()=>ph,getActiveRoute:()=>uh,getChildrenIdByName:()=>$i,getComponentNameById:()=>Oh,getDebugMode:()=>Gd,getIdByInstanceName:()=>Zt,getNumberOfActiveInvalidate:()=>Yg,getNumberOfActiveRepeater:()=>Xg,getParentIdById:()=>ms,getPropsFromParent:()=>ua,getRoot:()=>oa,getStateById:()=>tr,getStateByName:()=>id,getTree:()=>Fh,inizializeApp:()=>Jg,loadUrl:()=>qg,mainStore:()=>me,onRouteLoading:()=>lh,removeAndDestroyById:()=>st,setStateById:()=>mn,setStateByName:()=>jd,staticProps:()=>pa,tempDelegateEventMap:()=>bs,tick:()=>Sr,updateStateByName:()=>Ud,useComponent:()=>qi,useMethodArrayByName:()=>jh,useMethodByName:()=>Wh,watchById:()=>Ct});var Zo="activeRoute",en="activeParams",Co="beforeRouteChange",tn="afterRouteChange",qt="routeIsLoading",pt="parserAsync",Wr="default",nh="repeater",sh="invalidate",ih="render_component";var me=u.createStore({[Zo]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[en]:()=>({value:{},type:"any",skipEqual:!1}),[Co]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[tn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[qt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),rn=()=>{me.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:Wr},{emit:!1})};var ah=e=>me.watch(Co,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),ch=e=>me.watch(tn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),lh=e=>me.watch(qt,t=>{e(t)}),uh=()=>{let{activeRoute:e}=me.get();return e},ph=()=>{let{activeParams:e}=me.get();return e};var j=new Map;var G=new Map;var mh=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},hh=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},ml=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},dh=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var fh=new WeakMap,gh=({element:e,id:t})=>{fh.set(e,t)},on=({element:e})=>fh.get(e);var bh=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),gh({element:t,id:e}))},ls=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,yh=({element:e})=>e?on({element:e}):"",hl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:ml({repeatId:t}).map(n=>j.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),dl=({id:e,repeatId:t})=>!e||e===""?[]:ml({repeatId:t}).map(o=>j.get(o)).filter(o=>o!==void 0).map(o=>o.id);var vh="data-mobjs",Eo="componentid",Mi="bindtextid",ki="bindobjectid";var nn="staticprops",Ri="bindprops",Th="name",_h="name",Sh="slot",Lt="repeaterchild";var Jt="currentRepeaterValue",Yt="repeatPropBind",Pi="bindevents",Xt="weakbindevents",sn="bindeffect",xh="parentid";var Kt="bindrefid",Tr="bindrefname",Ni="invalidateid",Ai="mobjsrepeat";var Qt={current:{},index:-1},Ch="QUEQUE_BINDPROPS",fl="QUEQUE_REPEATER",gl="QUEQUE_INVALIDATE";var jr=new Map;var us=({id:e})=>{if(!G.has(e))return;if(jr.has(e)){let r=jr.get(e);r?.removeCustomComponent(),r?.remove(),jr.delete(e)}return G.get(e)?.element};var Oi=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},Eh=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Eh({rootNode:e,currentNode:t.parentElement})},tw=({rootNode:e,node:t})=>{if(e)return Eh({rootNode:e,currentNode:t.parentElement})},Dt=({id:e=""})=>{if(!e||e==="")return Qt;let r=j.get(e)?.currentRepeaterState;return r||Qt};var wh=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=us({id:t}),s=tw({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},ps=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var $i=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Ih=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:h}=Dt({id:l?.[0]});return{index:p,key:h?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(h=>h[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Mh="",kh,Rh=({contentId:e=""})=>{Mh=e};var Ph=()=>{kh=document?.querySelector(Mh)},Li=()=>kh;var zr=new Map,Nh=({instanceName:e,id:t})=>{let r=zr.get(e)??[];zr.set(e,[...r,t])},Ah=({instanceName:e,id:t})=>{let r=zr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&zr.delete(e),o.length>0&&zr.set(e,o)},bl=({instanceName:e})=>zr.get(e)??[];var Oh=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},$h=e=>{if(!e)return"name-not-found";let t=on({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},Zt=(e="")=>e?bl({instanceName:e})?.[0]:void 0,Lh=(e="")=>e?bl({instanceName:e})??[]:[];var Di=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Li()?.contains(r):!1};var Dh=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Dh({chunk:l})}]},[]),Fh=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Dh({chunk:e})};var Bh=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Vh=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Wh=e=>{let t=Zt(e);if(!t||t==="")return;let r=Vh({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},jh=e=>Lh(e).map(r=>Vh({id:r})).filter(r=>Object.keys(r).length>0);function*er(e){if(e){yield e;for(let t of e.children)yield*er(t)}}function rw(e,t){let r=[];for(let o of er(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Ur=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...rw(n,t)];return r};var wo=new Set,zh=!1,Uh=e=>{wo.add(e)},Hh=e=>{wo.delete(e)},Gh=e=>{let t;for(let r of wo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(wo.delete(t),[t]):[]},qh=({element:e})=>[...wo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Jh=({element:e})=>[...wo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],Yh=()=>wo.size;var nt=e=>{zh=e},Ft=()=>zh;var Xh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},Kh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},Qh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Fi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var ms=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},Zh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:{...s,...Xh({currentChild:s,id:e,componentName:o})}})},ed=({element:e,id:t})=>{if(!e)return;if(!0){Ur(e,!1).forEach(n=>{n.setParentId(t)});return}qh({element:e}).forEach(o=>{o.setParentId(t)})},an=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=on({element:t}),r||(t=t.parentNode);return r??""},yl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return yl({moduleScopeId:o,targetComponentId:t})};var vt=new Map,hs=new Map;var td=({componentId:e})=>{if(e)for(let[t,r]of vt){let{componentId:o}=r;o===e&&vt.delete(t)}};var Ze=new Map;var be=new Map;var rd=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{be.has(r)&&be.delete(r)}),Ze.delete(e)}};var et=new Map;var od=({id:e})=>{if(et.has(e)){let t=et.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),et.delete(e)}};var nd=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=j.get(t??"");if(!o)return;let{child:n}=o;!t||!n||j.set(t,{...o,child:{...n,...Kh({currentChild:n,id:e,componentName:r})}})};var cn=new Set;var sd=e=>{cn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),nd({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),rd({id:e}),od({id:e}),l&&l.length>0&&hh({componentId:e,repeatId:l}),p&&p.length>0&&Ah({instanceName:p,id:e}),h||sd(e),td({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var tr=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var id=(e="")=>{let t=Zt(e);return t||console.warn(`component ${e}, not found`),tr(t)};var ln=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Hr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Io=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var ad=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),jr.set(e,t)};var cd=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Ft())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Ai)??"";ad({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Gr=new Map;var ld=({invalidateId:e,host:t})=>{let r=be.get(e);if(!r)return;let o=t.parentNode;be.set(e,{...r,element:o}),Gr.set(e,t)};var ud=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Ni)??"";ld({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Set,pd=e=>{qr.add(e)},md=()=>{qr.clear()},hd=({element:e})=>[...qr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&qr.delete(t),r}),dd=({name:e,element:t})=>[...qr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&qr.delete(r),o}),fd=()=>[...qr],Bi=()=>qr.size;var gd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(_h))}connectedCallback(){let e=this.shadowRoot?.host;e&&pd(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var vl=new Set,bd=e=>{vl.add(e)},Vi=()=>[...vl],Wi=e=>vl.delete(e);var yd=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Ft();if(p&&!!1&&bd(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Ft()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#x]=[Th,nn,Ri,"key",Pi,Jt,Sh,xh,Lt,Xt,Yt,Kt,Tr].map(h=>p.getAttribute(h)??"")),Uh(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Hh(l),Wi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Ct=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Xr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Mo=new Map,Td=()=>Mo.size===0,Tl=1e3,_d=e=>{if(Mo.size>=Tl)return console.warn(`maximum loop event reached: (${Tl})`),()=>{};let t=u.getUnivoqueId();return Mo.set(t,e),()=>Mo.delete(t)},vd=()=>Mo.size===0||Mo.size>=Tl,Et=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&Mo.forEach(r=>{console.log(r)}),vd()&&t){t();return}return new Promise(r=>{if(vd()){r();return}Et({debug:e,previousResolve:t??r})})};var ko=new Map,xd=()=>ko.size===0,_l=1e3,Cd=e=>{if(ko.size>=_l)return console.warn(`maximum loop event reached: (${_l})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},Sd=()=>ko.size===0||ko.size>=_l,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&ko.forEach(r=>{console.log(r)}),Sd()&&t){t();return}return new Promise(r=>{if(Sd()){r();return}wt({debug:e,previousResolve:t??r})})};var un=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.invalidateId).map(r=>be.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var pn=({id:e})=>{let t=et.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var zi=new Map,Ed=(e,t)=>{zi.set(e,t)},Ui=new Map,wd=({host:e,componentId:t,bindTextId:r})=>{Ui.set(e,{componentId:t,bindTextId:r})},Id=e=>e.match(/(?<=\[).+?(?=])/g),Md=e=>e.split("[")?.[0],nw=({previous:e,current:t})=>{let r=Id(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Md(t)]):e?.[t]},kd=(e,t,...r)=>{let o=tr(e),n=r.map(s=>s.split(".").reduce((a,c)=>nw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Rd=()=>{[...Ui].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){zi.delete(t);return}let o=zi.get(t);o&&(zi.delete(t),sw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ui.clear()},Pd=()=>Ui.size,sw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=pn({id:e}),a=un({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=Id(f),y=d&&d?.length>0?Md(f):f;if(y)return Ct(e,y,async()=>{await wt(),await Et(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Nd=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Eo)??"",o=t?.getAttribute(Mi)??"";wd({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Hi=new Map,Ad=(e,t)=>{Hi.set(e,t)},Sl=new Map,Od=({host:e,componentId:t,bindObjectId:r})=>{Sl.set(e,{componentId:t,bindObjectId:r})},$d=e=>e.map(t=>"observe"in t?Re.extractkeyFromProp(t.observe):(Re.initializeCurrentDependencies(),"value"in t?t?.value():t(),Re.getFirstCurrentDependencies())),Ld=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Dd=()=>{[...Sl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Hi.delete(t);return}let o=Hi.get(t);o&&(Hi.delete(t),iw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Sl.clear()},iw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=pn({id:e}),a=un({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Ct(e,p,async()=>{await wt(),await Et(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Fd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Eo)??"",o=t?.getAttribute(ki)??"";Od({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Gi={},Ro=()=>Gi,Bd=new Set,Vd=()=>{Gi=Object.fromEntries([...Bd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(Gi).length}`),yd(Gi),gd(),ud(),cd(),Nd(),Fd()},qi=e=>{!e||e?.length===0||e.forEach(t=>{Bd.add(t)})};var Ji=({componentName:e,propName:t})=>(Ro()?.[e]?.componentParams?.exportState??[]).includes(t),Wd=({componentName:e})=>Ro()?.[e]?.componentParams?.exportState??[];var mn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!Ji({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var jd=(e="")=>{let t=Zt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>mn(t,r,o,{emit:n})};var zd=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Io({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!Ji({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Ud=(e="")=>{let t=Zt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>zd(t,r,o,{emit:n,clone:s})};var xl={scoped:!1,maxParseIteration:5e3,debug:!1},Hd=e=>{xl={...xl,...e}},It=()=>xl,Gd=()=>{let{debug:e}=It();return e},qd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(qi(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Jd=[],Yd="",Xd="",Kd=e=>{Jd=[...e]},hn=({hash:e=""})=>Jd.find(({hash:t})=>e===t),Qd=({hash:e=""})=>{Yd=e},Yi=()=>Yd,Zd=({hash:e=""})=>{Xd=e},ef=()=>Xd;function aw(e){let t=[];for(let r of er(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var tf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...aw(o)];return t};function cw(e){let t=[];for(let r of er(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var rf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...cw(o)];return t};function lw(e,t){for(let r of er(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var of=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=lw(o,t);if(n)return n}return null};function uw(e){for(let t of er(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var nf=e=>{let t=e||document.body;for(let r of t.children){let o=uw(r);if(o)return o}return null};var ds=new Map,Po=e=>{let t=u.getUnivoqueId();return ds.set(t,e),t},sf=(e="")=>{if(!e)return Qt;let t=ds.get(e);return ds.delete(e),t??Qt};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var Xi=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Jt)||i.deref()?.setAttribute(Jt,Po({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Yt)||i.deref()?.setAttribute(Yt,`${o}`),i.deref()?.hasAttribute(Lt)||i.deref()?.setAttribute(Lt,`${n}`)})},Ki=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Lt)){Wi(i);return}i.setAttribute(Jt,Po({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Yt,`${o}`),i.setAttribute(Lt,`${n}`)})},Kr=({stringDOM:e,parent:t,position:r})=>{nt(!0);let o=document.createRange().createContextualFragment(e);nt(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},fs=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;nt(!0),e.forEach(n=>{n&&o.append(n)}),nt(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var mw=({element:e,content:t})=>{let{debug:r}=It();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},hw=({element:e})=>{fd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},dw=({element:e})=>{if(!!1&&Bi()===0)return;let t=tf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=dd({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},fw=({element:e,content:t})=>{let r=mw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=hd({element:r});a&&(fs({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||fs({parent:r,elements:[...e.childNodes],position:"afterbegin"}),dw({element:r}),hw({element:r}),n&&n.length>0&&r.setAttribute(Xt,n),s&&s.length>0&&r.setAttribute(Kt,s),i&&i.length>0&&r.setAttribute(Tr,i);let{debug:c}=It();c&&r.setAttribute(vh,o??"")}return e.remove(),r},af=({element:e,content:t})=>({newElement:fw({element:e,content:t})});var Cl=0,cf=()=>{Cl+=1},El=()=>Cl,lf=()=>{Cl=0},wl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Gh(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var uf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var gs=new Map,pf=({id:e,cb:t=()=>{}})=>{gs.set(e,t)},Il=async({id:e,element:t})=>{let o=await gs.get(e)?.({element:t});uf({cb:o,id:e}),gs.delete(e)};var dn=new Map,Ml=1e5,fn=e=>{if(dn.size>=Ml)return console.warn(`maximum loop event reached: (${Ml})`),()=>{};let t=u.getUnivoqueId();return dn.set(t,e),()=>dn.delete(t)},mf=()=>dn.size===0||dn.size>=Ml,Sr=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&dn.forEach(r=>{console.log(r)}),mf()&&t){t();return}return new Promise(r=>{if(mf()){r();return}Sr({debug:e,previousResolve:t??r})})};var kl=!0,Qi=()=>{kl=!0},Zi=()=>{kl=!1},ea=()=>kl;var gn=new Map,hf=(e=[])=>{let t=Ie(Object,e)?[e]:e,r=u.getUnivoqueId();return gn.set(r,t),r},df=({element:e,componentId:t,bindEventsId:r})=>{let o=gn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ea())return;Zi(),await Sr(),Qi();let c=Dt({id:t});i(a,c?.current,c?.index)})}),gn.delete(r))},ff=()=>{gn.clear()};var ta=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},gf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var bf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Re.extractkeyFromProp(s)):(Re.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Re.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return vt.set(n,{...o,componentId:"",propsId:n}),n},ra=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=tr(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Dt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{mn(e,h,f,{emit:n})})},yf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=vt.get(e);o&&(vt.set(e,{...o,componentId:r}),hs.set(r,e),Rl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Rl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=hs.get(e);if(!o)return;r&&hs.delete(e);let n=vt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||ra({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!xd()&&(await wt(),ra({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Td()&&(await Et(),ra({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Ct(a,h,async()=>{if(await wt(),await Et(),l)return;let f=fn({state:h,id:e,type:Ch});l=!0,u.useNextLoop(()=>{ra({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ta({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of vt){let{componentId:d}=f;d===e&&vt.delete(h)}},vf=()=>{vt.clear(),hs.clear()};var rr=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else rr({id:c,container:t})})};var Pl=new Map,gw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r)),bw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Re.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Re.getCurrentDependencies()),xf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?gw(i):bw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Pl.set(s,n),s},Cf=e=>{[...e.querySelectorAll(`[${sn}]`)].forEach(r=>{let o=r.getAttribute(sn);if(!o)return;let n=Pl.get(o);n&&(r.removeAttribute(sn),yw({data:n,element:r}),Pl.delete(o))})},Tf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},_f=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Sf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},yw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=pn({id:o}),f=un({id:o});return[...new Set([...i,...h,...f])].map(v=>(a&&u.useFrame(()=>{Tf({ref:r,data:a})}),c&&u.useFrame(()=>{_f({ref:r,data:c})}),l&&u.useFrame(()=>{Sf({ref:r,data:l})}),Ct(o,v,async()=>{if(await wt(),await Et(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Tf({ref:r,data:a}),c&&r.deref()&&_f({ref:r,data:c}),l&&r.deref()&&Sf({ref:r,data:l}),p=!1})}))})))})};var Ef=({element:e})=>{let t=e.querySelectorAll(`[${Kt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Kt),i=n.getAttribute(Tr);if(n.removeAttribute(Kt),n.removeAttribute(Tr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},vw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Tw=({refs:e,refName:t,element:r})=>({...e,[t]:vw([...e[t],r])}),wf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Tw({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Nl=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},If=({id:e})=>{let t=Nl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Mf=document.createElement("div"),kf=({element:e})=>{Mf=e},oa=()=>Mf;var Rf=":FORCE",bs=new Map,bn=new WeakMap,Al=[],Pf=[],Nf=(e=[])=>{let t=Ie(Object,e)?[e]:e,r=u.getUnivoqueId();return bs.set(r,t),r},_w=e=>{let t=e?.parentNode;for(;t;){if(bn.has(t))return{target:t,data:bn.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Sw=e=>{let t=bn.get(e);return t?{target:e,data:t}:_w(e)};async function xw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=Sw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!ea()&&!a||(Zi(),await Sr(),Qi(),!document.contains(o)))return;let c=yh({element:o}),l=c?Dt({id:c}):Qt;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var Af=async e=>{await wt(),await Et(),[...e.parentNode?.querySelectorAll(`[${Xt}]`)??[]].forEach(n=>{let s=n.getAttribute(Xt)??"";n.removeAttribute(Xt);let i=bs.get(s);bs.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Rf),d=p.toUpperCase().replaceAll(Rf,"").toLowerCase();return Al.includes(d)||Al.push(d),{event:d,callback:h,force:f}}));bn.set(n,a)});let o=oa();Al.forEach(n=>{Pf.includes(n)||(Pf.push(n),o.addEventListener(n,xw.bind(null,n)))})};var yn="repeater",na="invalidate",Qr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===yn?G.entries():be.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!yl({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===yn?[d]:d})}return i};var Of=({id:e,repeatId:t})=>{if(!et.has(e))return;let r=et.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),et.set(e,o)};var Zr=({id:e,repeatParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:yn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Of({id:e,repeatId:n})})};var sa=({repeatParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:yn}).forEach(({initializeModule:o})=>{o()})};var $f=({invalidateId:e,unsubscribe:t})=>{let r=be.get(e);r&&be.set(e,{...r,unsubscribe:t})};var Lf=({id:e,invalidateId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);be.has(t)&&be.delete(t),Ze.set(e,o)};var eo=({id:e,invalidateParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:na}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Lf({id:e,invalidateId:n})})};var Ol=({id:e})=>{if(!be.has(e))return;if(Gr.has(e)){let r=Gr.get(e);r?.removeCustomComponent(),r?.remove(),Gr.delete(e)}return be.get(e)?.element};var ia=({invalidateParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:na}).forEach(({initializeModule:o})=>{o()})};var Df=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=an({element:Ol({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;ln({id:n,prop:h});let d=Ol({id:s}),v=fn({state:h,id:n,type:gl}),y=_d({state:h,id:n,type:gl});c=!0,u.useNextLoop(async()=>{if(!d){Hr({id:n,prop:h});return}await t(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),rr({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),me.set(pt,{element:d,parentId:l??n,persistent:i,source:sh},{emit:!1}),await me.emitAsync(pt),rn(),c=!1,v(),y(),ia({invalidateParent:d,id:n}),sa({repeatParent:d,id:n}),Hr({id:n,prop:h}),r()})}));$f({invalidateId:s,unsubscribe:p})};var Ff=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r));var Bf=({invalidateId:e,initializeModule:t})=>{let r=be.get(e);r&&be.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Vf=({invalidateId:e})=>{let t=be.get(e);t&&be.set(e,{...t,initialized:!0})};var Wf=({invalidateId:e,scopeId:t,observe:r})=>{be.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var jf=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var vn=new Set,zf=({id:e,state:t,container:r})=>{vn.add({id:e,state:t,container:r})},Uf=({id:e,state:t,container:r})=>{r&&vn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&vn.delete(o)})},Hf=({id:e="",state:t="",container:r})=>[...vn].some(n=>e===n.id&&t===n.state&&r===n.container);var qf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Jf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Gf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Yf=({current:e,previous:t,key:r})=>Gf({arr:e,key:r})&&Gf({arr:t,key:r}),aa=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),ca=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=Dt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=Dt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var Tn=new Map,la=(e={})=>{let t=u.getUnivoqueId();return Tn.set(t,e),t},ua=(e="")=>{let t=Tn.get(e);return Tn.delete(e),t??{}};var Xf=()=>{Tn.clear()};var pa=(e={})=>`${nn}="${la(e)}"`,ma=(e,t,r)=>Math.min(Math.max(e,t),r);var $l=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var Cw="index",No=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=$l({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Re.setCurrentDependencies(e);let f=$l({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Cw){if(t){let v=f?.findIndex(y=>y[r]===o);return ma(v,0,d)}return ma(n,0,d)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[ma(n,0,d)],c??l)},set(){return!1}})};var Kf=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=No({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),v=Ft();nt(!0);let y=i.createContextualFragment(d);if(nt(v),!1){let T=Ur(y,!1).map(S=>new WeakRef(S));Xi({components:T,current:p,index:h,observe:n,repeatId:s,key:void 0})}return Ki({components:Vi(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},Ew=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Jt}="${Po({current:t,index:e})}"
    ${Yt}="${r}" ${Lt}="${o}"`,Qf=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=No({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Ew({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),Zf=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Ft();nt(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(nt(c),!1){let p=Ur(l,!1).map(h=>new WeakRef(h));Xi({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return Ki({components:Vi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},ww=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Yt}="${o}"
    ${Jt}="${Po({current:r,index:t})}"
    ${Lt}="${n}"`,eg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>ww({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},tg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=No({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Ft();nt(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(nt(h),!1){let d=Ur(f,!1).map(v=>new WeakRef(v));Xi({components:d,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return Ki({components:Vi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},rg=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Jt}="${Po({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Yt}="${r}"
                            ${Lt}="${o}"`,p=No({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var ha=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=tr(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},ys=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var _n=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Iw=({element:e,container:t})=>{let r=$h(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},og=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=aa({data:t,key:n});_n({repeatId:a,currentData:l});let p=qf(r,l,n),h=p.map(T=>{let S=T?.[n];return hl({keyValue:S,repeatId:a})}).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let M=ps({id:_}),x=M??S;eo({id:s,invalidateParent:x}),Zr({id:s,repeatParent:x}),T.forEach(({id:C})=>{st({id:C})}),M&&M.remove()}),f||ys({repeatId:a}).filter(_=>p.map(M=>M?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:M}=_;eo({id:s,invalidateParent:M}),Zr({id:s,repeatParent:M}),rr({id:s,container:M})});let d=Jf(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let M=hl({keyValue:T,repeatId:a}),x=M[0]?.element?ps({id:M[0]?.id??""}):ys({repeatId:a}).find(w=>w.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:M,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:M,persistentDOMwrapper:x})=>{if(!T){let{debug:N}=It();x&&y.append(x);let L=M?.[0]?.element;!x&&L&&(y.append(L),N&&Iw({element:M[0]?.element,container:o}));return}let C=l?.[_],w=c?eg({currentValue:C,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):Zf({currentValue:C,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),O=Ft();if(nt(!0),c){let N=v.createContextualFragment(w);y.append(N)}!c&&w&&y.append(w),nt(O)}),o.append(y),l};var Mw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},ng=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{_n({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?Qf({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):Kf({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||fs({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=ca({children:c});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let M=ls({id:_}),x=ps({id:_}),C=x??M;eo({id:i,invalidateParent:C}),Zr({id:i,repeatParent:C}),st({id:_}),x&&x.remove()})});let{debug:v}=It();if(v&&Mw(o),f.length>0)return t;let y=ys({repeatId:s});if(!y)return t;y.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;eo({id:i,invalidateParent:_}),Zr({id:i,repeatParent:_}),rr({id:i,container:_}),_.remove()})}return t};var sg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:h=[]})=>{let v=(Yf({current:o,previous:n,key:s})?og:ng)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:h});return me.set(pt,{element:r,parentId:a??i,persistent:t,source:nh},{emit:!1}),await me.emitAsync(pt),rn(),v};var ig=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ls({id:c}),d=us({id:l}),v=d?an({element:d})??"":"";return i(),o(e,async(T,S)=>{if(!u.checkType(Array,T))return;let _=us({id:l}),M=fn({state:e,id:c,type:fl}),x=Cd({state:e,id:c,type:fl});if(ln({id:c,prop:e}),Hf({id:c,state:e,container:_})){Hr({id:c,prop:e}),t(e,S,{emit:!1}),M(),x();return}let w=dl({id:c,repeatId:l});f&&await s(),n&&(w.forEach(A=>{st({id:A})}),_&&(_.textContent="")),_&&zf({id:c,state:e,container:_});let O=await sg({state:e,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:h,currentChildren:n?[]:w}),N=dl({id:c,repeatId:l}),L=a&&a!=="",I=ca({children:N,previousChildren:w}),P=L?[...Ih({children:I,key:a,current:T,currentUnivoque:O})]:I;P.forEach((A,k)=>{A.forEach(D=>{let F=O?.[k];if(!F)return;let E=L?T.findIndex(R=>`${R?.[a]}`==`${O?.[k]?.[a]}`):k;Oi({id:D,value:{current:F,index:E}})})}),u.useNextLoop(async()=>{f&&i(),Uf({id:c,state:e,container:_}),Hr({id:c,prop:e}),M(),x(),ia({invalidateParent:_,id:c}),sa({repeatParent:_,id:c}),P.length===0&&ha({repeatId:l,id:c})})})};var ag=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=ig({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});jf({repeatId:e,unsubscribe:d})};var cg=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var lg=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var ug=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var pg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var mg=({repeatId:e,scopeId:t})=>{let r=et.get(t)??[];et.set(t,[...r,{repeatId:e}])};var hg=({invalidateId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{invalidateId:e}])};var dg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(rr({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,v),me.set(pt,{element:d,parentId:c,persistent:Di(c),source:ih},{emit:!1}),await me.emitAsync(pt),rn()},getChildren:d=>$i({id:c,componentName:d}),freezeProp:d=>{let v=Re.extractkeyFromProp(d);return ln({id:c,prop:v.toString()})},unFreezeProp:d=>{let v=Re.extractkeyFromProp(d);return Hr({id:c,prop:v.toString()})},unBind:()=>gf({id:c}),bindProps:d=>{let v="props"in d?d:{props:d};return`${Ri}="${bf({...v,parentId:c})}" `},staticProps:d=>` ${nn}="${la(d)}" `,remove:()=>{st({id:c})},removeDOM:d=>{rr({id:c,container:d}),d.textContent=""},getParentId:()=>ms(c),watchParent:(d,v)=>{let y=Ct(ms(c),d,v);y&&ta({id:c,unWatchArray:[y]})},onMount:d=>pf({id:c,cb:d}),bindEvents:d=>`${Pi}="${hf(d)}"`,delegateEvents:d=>`${Xt}="${Nf(d)}"`,bindEffect:d=>`${sn}="${xf({data:d,id:c})}"`,addMethod:(d,v)=>{Bh({id:c,name:d,fn:v})},setRef:d=>`${Kt}="${c}" ${Tr}="${d}"`,getRef:()=>If({id:c}),getRefs:()=>Nl({id:c}),bindText:(d,...v)=>{let y=u.getUnivoqueId(),T=()=>kd(c,d,...v);return Ed(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Eo}="${c}" ${Mi}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...v)=>{let y=$d(v),T=u.getUnivoqueId(),S=()=>Ld(d,...v);return Ad(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Eo}="${c}" ${ki}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Ff(d),_=u.getUnivoqueId(),M=`${Ni}=${_}`,x=()=>v(),C=!1;return hg({invalidateId:_,scopeId:c}),Wf({invalidateId:_,scopeId:c,observe:S}),Bf({invalidateId:_,initializeModule:()=>{C||(Df({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Di(c),id:c,invalidateId:_,renderFunction:x}),C=!0,Vf({invalidateId:_}))}}),`<mobjs-invalidate ${M} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:M=!1})=>{let x=Re.extractkeyFromProp(d),C=u.getUnivoqueId(),w=S!=="";mg({repeatId:C,scopeId:c}),pg({repeatId:C,scopeId:c,observe:x});let O=e()?.[x],N=w?aa({data:O,key:S}):O;_n({repeatId:C,currentData:N});let L=M?rg({currentUnique:N,key:S,observe:x,repeatId:C,hasKey:w,render:_}):"",I=M?[]:tg({currentUnique:N,render:_,observe:x,repeatId:C,key:S,hasKey:w}),P=!1;return ug({repeatId:C,initialDOMRender:I}),cg({repeatId:C,initializeModule:()=>{P||(ag({repeatId:C,persistent:Di(c),state:x,setState:t,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:M}),P=!0,lg({repeatId:C}),dh({repeatId:C})||ha({repeatId:C,id:c}))}}),`<mobjs-repeat ${Ai}="${C}" style="display:none;"></mobjs-repeat>${L}`}});var Ll=({componentName:e,currentProps:t={}})=>{let o=Ro()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var fg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=an({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),h=e.getCurrentKey()??"",f=e.getComponentName(),d=i?.split(" ").join(""),v=ua(d),y={...e.dataset},T=e.getRepeaterPropBind(),S=sf(l);return{element:e,props:{...Ll({componentName:f,currentProps:y}),...Ll({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:h,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var gg=e=>{cn.add(e)};var bg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Qt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:M=""})=>{let x=u.createStore(o);Qh({props:r,store:x}),n&&x.bindStore(n),y||gg(_),p&&p.length>0&&mh({componentId:_,repeatId:p}),t&&t.length>0&&Nh({instanceName:t,id:_});let C=Wd({componentName:M}),w=new Set(C);return x.setProxiReadOnlyProp(C),j.set(_,{element:e,componentName:M,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(O="",N={},{emit:L=!0}={})=>{let I=Io({id:_,prop:O}),P=Re.extractkeyFromProp(O),A=w.has(P);A&&Fi({prop:P,componentName:M,action:"updateState"}),!(I||A)&&x.set(P,N,{emit:L??!0,usePropAsString:!0})},updateState:(O="",N=()=>({}),{emit:L=!0,clone:I=!1}={})=>{let P=Io({id:_,prop:O}),A=Re.extractkeyFromProp(O),k=w.has(A);k&&Fi({prop:A,componentName:M,action:"updateState"}),!(P||k)&&x.update(A,N,{emit:L??!0,clone:I??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(O="")=>x.emit(O),emitAsync:async(O="")=>await x.emitAsync(O),computed:(O="",N=()=>{},L=[])=>{let I=Re.extractkeyFromProp(O);if(w.has(I)){Fi({prop:I,componentName:M,action:"computed"});return}return x.computed(I,N,L,{usePropAsString:!0})},watch:(O="",N=()=>{},{wait:L=!1,immediate:I=!1}={})=>x.watch(O,N,{wait:L??!1,immediate:I??!1}),debug:()=>x.debug()}};var yg=({id:e})=>(Ze.get(e)??[]).map(({invalidateId:r})=>{let o=be.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var vg=({id:e})=>(et.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Tg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Wr})=>{let{debug:n}=It();n&&console.log("parse source:",o);let s=Ro(),i=[],a=wl({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let h=l.getComponentName(),f=s?.[h]?.componentFunction,d=s?.[h]?.componentParams,{scoped:v,bindStore:y}=d,{props:T,id:S,componentName:_,instanceName:M,key:x,dynamicPropsId:C,currentRepeatValue:w,bindEventsId:O,parentId:N,componentRepeatId:L,repeatPropBind:I}=fg({element:l,parentIdForced:r}),P=d?.state??{},{getState:A,setState:k,updateState:D,getProxi:F,emit:E,emitAsync:R,computed:$,watch:B,debug:V}=bg({element:l,props:T,state:P,id:S,componentName:_,instanceName:M,key:x,repeatPropBind:I,persistent:t,parentId:N,componentRepeatId:L,bindStore:y});Zh({id:S}),L&&L?.length>0&&(Oi({id:S,value:w}),wh({id:S,repeatId:L,element:l})),yf({propsId:C,repeatPropBind:I,componentId:S});let q=dg({getState:A,setState:k,updateState:D,getProxi:F,emit:E,emitAsync:R,computed:$,watch:B,id:S,key:x,bindEventsId:O,debug:V}),ee=await f(q),ue=l.classList,{newElement:re}=af({content:ee,element:l});if(md(),ue.length>0&&re?.classList.add(...ue),!0,!re)return;bh({id:S,newElement:re});let ye=yg({id:S}),ve=vg({id:S});O&&df({element:re,componentId:S,bindEventsId:O});let ge=v??It().scoped;ge&&await Il({id:S,element:re}),re?.inizializeCustomComponent?.(q),i.push({onMount:async()=>{ge||await Il({id:S,element:re})},initializeBindPropsWatcher:()=>{Rl({componentId:S,repeatPropBind:I,inizilizeWatcher:!0})},fireInvalidateFunction:ye.length>0?()=>{ye.forEach(({initializeModule:J})=>{J?.()})}:()=>{},fireRepeatFunction:ve.length>0?()=>{ve.forEach(({initializeModule:J})=>{J?.()})}:()=>{}});let Ne=wl({element:e,currentSelectors:c});c=Ne.parseSourceArray,l=Ne.componentToParse;let Be=El()===It().maxParseIteration;if(cf(),Be){console.warn(`dom parse reached max parse limit: ${El()}`);break}}let p=Ef({element:e});Object.keys(p).length>0&&wf(p);for(let h of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:d,fireInvalidateFunction:v,fireRepeatFunction:y}=h;await f(),y(),v(),d()}i.length=0,c.length=0,l=null,Af(e),Cf(e),Rd(),Dd()};var vs=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Wr})=>{await Tg({element:e,persistent:t,parentIdForced:r,source:o}),lf()},_g=()=>{me.watch(pt,async({element:e,parentId:t,persistent:r=!1,source:o=Wr})=>{await vs({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Sg=()=>{Xf(),ff(),vf()};var xg,Cg,Eg=({fn:e})=>{e&&(Cg=e)},wg=({fn:e})=>{e&&(xg=e)},Ig=()=>Cg,Mg=()=>xg;var kg=!0,Rg=e=>{kg=e},Pg=()=>kg;var Ng=()=>{for(let e of cn)st({id:e})};var Ag=new Map,Og=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),$g=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{me.set(qt,!0),await Sr();let s=Li();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=me.get(),c=Og({route:e,params:o}),l=Og({route:i.route,params:a}),p=window.scrollY;Ag.set(l,p);let h=Ag.get(c)??0;me.set(Co,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=me.watch(Co,()=>{f=!0});Sg(),me.set(Zo,{route:e,templateName:t}),me.set(en,o);let v=hn({hash:e}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Ig(),M=s.cloneNode(!0);_&&M&&!y&&(await _({oldNode:M,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(M,s)),s.replaceChildren(),Ng(),Kr({stringDOM:S,parent:s,position:"afterbegin"}),await vs({element:s}),y||(s.style.visibility=""),f||me.set(tn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Pg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=Mg();x&&!y&&(await x({oldNode:M,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),M.remove()),M=null,d?.(),me.set(qt,!1)};var Lg=({route:e})=>e,Dg=e=>{Lg=e},Fg=({route:e})=>{let t=Lg({route:e});return{route:t,isRedirect:t!==e}};var Bg=({hash:e=""})=>{let t=Yi(),r=ef();return e===""?t:hn({hash:e})?e:r},Vg=({hash:e=""})=>hn({hash:e})?.templateName??"",Wg=({hash:e=""})=>hn({hash:e})?.restoreScroll??!0;var jg="",zg=!0,xr="",Ug="",to,Fl,Ts,Bl=e=>e.replace("?","").replace("/",""),Hg=e=>e.replace("#","").replace("/","").replace(".",""),kw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Bl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Rw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&me.getProp(qt)&&e.preventDefault()},{passive:!1});var da=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=me.get();if(o){globalThis.location.hash=jg.replace("#","");return}Ts||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Fg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Bl(i?.[1]??"");Ug=xr,xr=Hg(i?.[0]??"");let c=kw(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Bg({hash:xr}),h=Vg({hash:xr&&xr.length>0?xr:Yi()}),f=xr===Ug&&l.length===0&&!zg;e&&!f&&(jg=`#${xr}${l}`,await $g({route:p,templateName:h,isBrowserNavigation:Wg({hash:xr})&&!!Ts,params:c,skipTransition:!!(Ts??Fl)})),e||(me.set(Zo,{route:p,templateName:h}),me.set(en,c)),Fl=void 0,u.useNextLoop(()=>{zg=!1})},Gg=()=>{da(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{Ts=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),da()})},qg=({url:e,params:t,skipTransition:r})=>{if(!e||me.getProp(qt))return;Fl=r;let o=e.split("?"),n=Hg(o?.[0]??""),s=Rw(t),i=Bl(o?.[1]??""),a=s??i;to=a.length>0?a:"",Ts=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Jg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Hd(h);let f=document.querySelector(e),d=await t();Dg(s),!(!r||!f)&&(Rh({contentId:r}),kf({element:f}),wg({fn:l}),Eg({fn:c}),Rg(p),_g(),Vd(),Kd(o),Qd({hash:i}),Zd({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),Ph(),da({shouldLoadRoute:!1}),await vs({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Gg())};var Yg=()=>be.size;var Xg=()=>G.size;var le={};vo(le,{clamp:()=>rt,getDefault:()=>Ww,mq:()=>zw,printDefault:()=>jw,setDefault:()=>Vw});var Ao={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var he={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},xs="min",Kg="max",Wl="desktop",Cs="easeLinear",_s="default",jl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},zl=10,Ss=.06,Ul="#ff0000",Hl="#14df3b",Gl=8,ql=10,Jl=1e3,Yl=!1,Nw=!1,Aw=!1,Ow=.01,$w=.06,Qg=e=>{let t=He({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=He({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=He({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Lw(e?.mq??{}),s=He({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Wl,type:String}),i=He({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:xs,type:String}),a=He({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:zl,type:Number}),c=Vl(e?.sequencer?.ease,"sequencer"),l=He({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:_s,type:String}),p=He({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ss,type:Number}),h=He({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Ul,type:String}),f=He({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:Hl,type:String}),d=He({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Gl,type:Number}),v=He({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:_s,type:String}),y=He({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ss,type:Number}),T=He({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:ql,type:Number}),S=Vl(e?.parallaxTween?.ease,"parallaxTween"),_=He({prop:"tween.duration",value:e?.tween?.duration,defaultValue:Jl,type:Number}),M=Vl(e?.tween?.ease,"tween"),x=He({prop:"tween.relative",value:e?.tween?.relative,defaultValue:Yl,type:Boolean}),C=He({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Nw,type:Boolean}),w=He({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Aw,type:Boolean}),O=He({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Ow,type:Number}),N=He({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:$w,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:M,relative:x},spring:{relative:C,config:e?.spring?.config?{...Ao,...e.spring.config}:Ao},lerp:{relative:w,precision:O,velocity:N}}},He=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Lw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:jl},Vl=(e,t)=>{let r=Object.keys(he).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Cs};var it=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:it(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=it(Object.assign({},s),i,r):e[n]=i}),e)};function Zg(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:jl,defaultMq:{value:Wl,type:xs},sequencer:{duration:zl,ease:Cs},scrollTrigger:{springConfig:_s,lerpConfig:Ss,markerColor:{startEnd:Ul,item:Hl}},parallax:{defaultRange:Gl,springConfig:_s,lerpConfig:Ss},parallaxTween:{duration:ql,ease:Cs},tween:{duration:Jl,ease:Cs,relative:Yl},spring:{relative:!1,config:Ao},lerp:{relative:!1,precision:.01,velocity:.06}}}var ce=(()=>{let e=Zg();return{set:n=>{e=Qg(it(Zg(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Dw=(e="desktop")=>window.innerWidth<ce.get("mq")[e],Fw=(e="desktop")=>window.innerWidth>=ce.get("mq")[e],Bw=(e="desktop")=>ce.get("mq")[e],fe={max:Dw,min:Fw,getBreackpoint:Bw};var Se=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},rt=(e,t,r)=>Math.min(Math.max(e,t),r),eb=(e,t,r)=>(1-r)*e+r*t,ro=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Es=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},tb=(e,t)=>e.map(r=>r[t]);function Vw(e){ce.set(e)}function Ww(e){return ce.get(e)}function jw(){ce.print()}function zw(e,t){switch(e){case"min":return fe.min(t);case"max":return fe.max(t);case"get":return fe.getBreackpoint(t)}}var U={};vo(U,{createLerp:()=>sI,createMasterSequencer:()=>tI,createScrollerTween:()=>Zw,createSequencer:()=>eI,createSpring:()=>nI,createStaggers:()=>rI,createTimeTween:()=>oI});var fa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Cr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Sn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Er=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},xn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var Xl=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var ga="radial",or="start";var Cn="center",En="edges",wn="random",rb="MERGE_FROM_UP",Kl="MERGE_FROM_DOWN",Oo="equal",$o="start";var Lo="center",In={type:Oo,each:0,waitComplete:!1,from:or,grid:{col:1,row:1,direction:"col"}},qe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var wr=e=>e.map(t=>`${t} | `).join(""),oo=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Mt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Ir=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},ob=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},nb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},sb=()=>{console.warn("relative prop is not allowed inside a timeline")},ib=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},ab=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},cb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},lb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},ub=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},pb=()=>{console.warn("setTween fail")},mb=e=>{console.warn(`label ${e} not founded`)},hb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},db=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},Ql=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},fb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},gb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Do=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},ba=()=>{console.warn("stagger each must be a Number ")},bb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},yb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},vb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Tb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},_b=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Sb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},xb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Cb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Eb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},wb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Ib=()=>{console.warn("createStaggers error: items array can not be empty")},Mb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},kb=()=>{console.warn(`screateStaggers error: type should be: ${Oo} || ${or} || ${"end"} || ${Lo}`)},Rb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Pb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},Zl=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Nb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Ab=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Ob=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},$b=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Lb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},kn=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Db=e=>{console.warn(`${e} value must be a string`)},Fb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Bb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Vb=e=>{console.warn(`${e} not found`)},Wb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},jb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},zb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Ub=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Hb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Gb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)} or a Number between 0 and 100`)},qb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${wr(t)}`)},Jb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Yb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${wr(t)}`)},Xb=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${wr(t)} or a custom css propierites like margin|line-height|...`)},Kb=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${wr(t)}`)},Qb=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${wr(t)}`)},Zb=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ey=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${wr(t)}`)},ty=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},ry=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},eu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${wr(t)}`)},oy=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},ny=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},sy=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},iy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},ay=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},tu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${wr(r)}, es: 45deg|100px|50vw etc..`)},cy=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},ly=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Bt={[he.easeLinear]:(e,t,r,o)=>r*e/o+t,[he.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[he.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[he.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[he.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[he.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[he.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[he.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[he.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[he.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[he.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[he.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[he.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[he.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[he.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[he.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[he.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[he.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[he.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[he.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[he.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[he.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[he.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[he.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[he.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[he.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[he.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[he.easeInBounce]:(e,t,r,o)=>r-Bt[he.easeOutBounce](o-e,0,r,o)+t,[he.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[he.easeInOutBounce]:(e,t,r,o)=>e<o/2?Bt[he.easeInBounce](e*2,0,r,o)*.5+t:Bt[he.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var mt=e=>e in Bt?Bt[e]:(Do(e),Bt[ce.get("tween").ease]);var uy=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",ru=e=>/^[+-]?\d+(\.\d+)?$/.test(e),py=e=>/^\d+\.\d+$|^\d+$/.test(e),Ae=(e,t)=>{let r=new RegExp(`^${uy(t)}$`,"i");return(e.match(r)||[]).length},nr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},ou=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),nu=(e,t)=>e.some(r=>{let o=new RegExp(`^${uy(r)}$`,"i");return(t.match(o)||[]).length});var my=e=>e&&(Ae(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:Ae(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:Ae(e,b.PROP_ROTATE)?b.PROP_ROTATE:Ae(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:Ae(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:Ae(e,b.PROP_OPACITY)?b.PROP_OPACITY:Ae(e,b.PROP_SCALE)?b.PROP_SCALE:Ae(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:Ae(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:Ae(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),hy=e=>{if(e){if(nr(e,b.PX))return b.PX;if(nr(e,b.VH))return b.VH;if(nr(e,b.VW))return b.VW}return""},ya=e=>Ae(e,b.POSITION_TOP)?b.POSITION_TOP:Ae(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:Ae(e,b.POSITION_LEFT)?b.POSITION_LEFT:Ae(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",dy=e=>nr(e,b.PX)?b.PX:nr(e,b.VH)?b.VH:nr(e,b.VW)?b.VW:nr(e,b.WPERCENT)?b.WPERCENT:nr(e,b.HPERCENT)?b.HPERCENT:nr(e,b.DEGREE)?b.DEGREE:b.PX;var Vt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ta=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||ob(e),o||nb(t),r&&o},no=e=>{let t=u.checkType(Number,e);return!t&&e&&Sb(e),t?e:ce.get("sequencer").duration},_a=e=>{let t=u.checkType(Number,e);return!t&&e&&Cb(e),t&&e?e:1},fy=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?e:ce.get("sequencer").ease},gy=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?mt(e):mt(ce.get("parallaxTween").ease)},by=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Eb(e),o||wb(t),r&&o},yy=e=>{if(!e)return;let t=u.checkType(Number,e);return t||ba(),t},vy=e=>{if(!e)return;let r=[or,"end",Cn,En,wn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||_b(e),s},iu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||bb(e),t},Ty=e=>{if(!e)return;let r=[ga,"row","col"].includes(e);return r||vb(),r},_y=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||yb(),t},Sy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Ib(),t},xy=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],Cy=e=>{if(!e)return;let r=[Oo,$o,"end",Lo].includes(e);if(!r){kb();return}return r};var so=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Pb(e,t),r?e:ce.get(t).relative},Sa=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?mt(e):mt(ce.get("tween").ease)},xa=e=>{let t=e&&e in Bt;return!t&&e&&Do(e),t?e:ce.get("tween").ease},au=e=>{let{config:t}=ce.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&Ql(e),!s&&r&&gb(e),s?t[e]:t.default},Ey=e=>{let{config:t}=ce.get("spring"),r=e&&e in t;return!r&&e&&Ql(e),r},cu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&fb(),t?e:{}},lu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&xb(e),o?r:ce.get("tween").duration},kt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Zl(e,t),r&&e===!0},pe=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&Zl(e,t),o?e:r},Ca=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Nb(e,t),o?e:r},sr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Ab(e,t),o?e:r},at=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Ob(e,t),o?e:r},Ea=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&$b(),t?e:ce.get("lerp").velocity},wa=e=>{let t=u.checkType(Number,e);return!t&&e&&Lb(),t?e:ce.get("lerp").precision},wy=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Db(t),r},Is=e=>{let t=u.checkType(Number,e);return!t&&e&&Bb(),t?e:void 0},Ms=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Fb(),t},Iy=(e,t)=>{e===-1&&Vb(t)},io=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&ay(r,e),o?e:t},My=e=>{let t=u.checkType(Function,e);return!t&&e&&Wb(e),t?e:({resolve:r})=>{r()}},ky=e=>{let t=u.checkType(Array,e);return!t&&e&&cb(e),t},Ry=e=>{let t=u.checkType(String,e);return!t&&e&&lb(e),t},Rn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},uu=e=>u.checkType(Element,e)?e:document.querySelector(e),ks=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&jb(e,t),o?e:b.DIRECTION_VERTICAL},pu=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||zb(t),i?e:null},Py=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Ub(),t?e:void 0},Ny=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&Hb(),t?e:{}},Ay=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Gb(e,t),r?e:b.ALIGN_CENTER},Oy=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&qb(e,t),r?e:!1},mu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Jb(e,t),o?e:r},$y=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Yb(t,r),o?t:b.TYPE_PARALLAX},Ly=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=py(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&ty(e),n?10-e:10-ce.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&ry(e),o?e:"0px"}})(),Fo=(e,t,r)=>{let o=ce.get("defaultMq").value;if(!e)return o;let n=ce.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&eu(e,s,t,r),i?e:o},Bo=(e,t,r)=>{let o=ce.get("defaultMq").type;if(!e)return o;let n=[Kg,xs],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&eu(e,n,t,r),s?e:o},Dy=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&Xb(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&sy(),(r||o)&&e!==b.PROP_TWEEN&&iy(),a&&oy();let c=a?b.PROP_VERTICAL:e,l=my(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Fy=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||Kb(e,t);let o=r?e:b.EASE_LERP;return r?e:o},Ia=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&Qb(e,r,t),o?e:b.EASE_LERP},By=(e,t)=>{let r=t===b.TYPE_PARALLAX?ce.get("parallax").springConfig:ce.get("scrollTrigger").springConfig;if(!e)return r;let o=ce.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&ey(e,n),s?e:r},Vy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&ny();let o=t===b.TYPE_PARALLAX?ce.get("parallax").lerpConfig:ce.get("scrollTrigger").lerpConfig;return r?e:o},Wy=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=ou(r,e);return n||tu(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=ou([b.DEGREE],e);return n||tu(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=ru(e);return n||ly(e,t),n?e:"0"}let o=ru(e);return o||cy(t),o?e:"0"};var Ma=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Rt=e=>({type:Cy(e?.stagger?.type)?e.stagger.type:In.type,each:yy(e?.stagger?.each)?e.stagger.each:In.each,from:vy(e?.stagger?.from)?e?.stagger?.from:$o,grid:{col:iu(e?.stagger?.grid?.col)?e.stagger.grid.col:In.grid.col,row:iu(e?.stagger?.grid?.row)?e.stagger.grid.row:In.grid.row,direction:Ty(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:_y(e?.stagger?.waitComplete)?e.stagger.waitComplete:In.waitComplete}),ir=(e,t)=>e.length>t.length?e:t;var Rs=e=>e%2,Uw=e=>Math.floor(Math.random()*e),Hw=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},Gw=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Ma(s);if(n===wn)return{index:e,frame:o[Uw(o.length)]};if(n===or)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Cn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Rs(t)===0&&a-e===1?{index:e,frame:0}:Rs(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===En){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Rs(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Rs(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Rs(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Ie(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},jy=(e,t,r)=>{if(t.grid.direction==="row"){let o=Es(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...tb(o,a)],[])].flat()}else return e},zy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=jy(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=jy(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Es(c,h),d=f[0];return d.forEach((y,T)=>{let{index:S,frame:_}=Gw(T,f[0].length,r,Hw(d,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var qw=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),Jw=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)ka(o,r+f,l)&&c.push(o[r+f][l]),ka(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(ka(o,r-f,l)&&c.push(o[r-f][l]),ka(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),ka=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,hu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Es(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=qw(s,o,n),a=Jw(i,o,n,s),c=i.reduce((d,v,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?rb:Kl)===Kl?c.reduce((d,v,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return d.push(S),d}},[]):c.reduce((d,v,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return d.push(S),d}},[]).toReversed()).reduce((d,v)=>v.length===0?d:[...d,v],[])}};var Yw=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=hu(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Ma(r.each),v=h*d;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=hu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},Xw=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[or,"end",Cn,En,wn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Tb(),r.from=or),zy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Pt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===ga?Yw({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):Xw({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Pn=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Nn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},ar=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),An=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),On=(e,t)=>Object.keys(e).map(r=>{if(!Vt(t[r])||!Vt(e[r]))return Ir(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Mr=e=>Object.keys(e).map(t=>{if(!Vt(e[t]))return Ir(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var $n=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Ln=(e,t,r,o)=>(u.checkType(Number,e)||ba(),e>0&&t&&(r.length>0||o.length>0));var Ra=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Oe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Dn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Fn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Bn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),du=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Uy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=eb(s,i,r/t*60),c=Se(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var kr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;constructor(t){this.#n=Rt(t??{}),this.#t=so(t?.relative,"lerp"),this.#i=Ea(t?.velocity),this.#l=wa(t?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#x=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=qe,this.#_=qe;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Uy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Oe(this.#e,"currentValue");if(this.#m||Pn({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Oe(this.#e,"toValue");Nn({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#N(t,r){this.#w(t,r)}async#R(){if(Ln(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("lerp",t);let r=ir(this.#d,this.#a);if(this.#n.grid.col>r.length){Mt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#C=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#C&&(this.#y=!0,await this.#R(),this.#y=!1),$n({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#N(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=Sn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=fa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Ra((t,r)=>this.#N(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=so(s,"lerp"),this.#i=Ea(o),this.#l=wa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=ao(t);return this.#A(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=An(t);return this.#A(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ro(t,r))return oo("lerp goFromTo:",t,r),new Promise(s=>s);let n=On(t,r);return this.#A(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Mr(t);return this.#A(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#x=!1;let o=Mr(t);this.#e=Bn(o,this.#e);let{reverse:n}=this.#E(r??{});kt(n,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=xn(this.#e,this.#t),this.#e=Cr(this.#e)}#A(t,r,o={}){this.#e=Bn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(kt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=xn(this.#e,this.#t),kt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Fn(this.#e)}getToNativeType(){return Dn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(t){this.#i=Ea(t),this.#T=it(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=wa(t),this.#T=it(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ar(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Pa=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Ps=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(t){this.#n=gy(t?.ease),this.#t=no(t?.duration),this.#i=Rt(t),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=ir(this.#s,this.#u);if(this.#i.grid.col>t.length){Mt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:qe,fastestStagger:qe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,v=this.#n(t,f,d,this.#t);n.currentValue=Se(v)}let o=Oe(this.#l,"currentValue");u.useNextTick(()=>{Pa({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=ao(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ar(t,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Ns=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var Hy=(e,t)=>Object.keys(e).map(r=>Vt(e[r])?{prop:r,toValue:e[r],ease:mt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:mt(t)})),Gy=(e,t)=>Object.keys(e).map(r=>Vt(e[r])?{prop:r,fromValue:e[r],ease:mt(t)}:(Ir(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:mt(t)})),qy=(e,t,r)=>Object.keys(e).map(o=>!Vt(t[o])||!Vt(e[o])?(Ir(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:mt(r)});var Fe={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var fu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Jy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[fu[o].get]:n},void 0),Yy=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var Xy=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:S,end:_,values:M}=e[T],x=null;for(let O of M)if(O.prop===o.prop){x=O;break}if(!x||!x.active)continue;let{prop:C}=x;if(Yy(e,T,C,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,v;r>=s&&r<=i?v=l(r-s,h,p-h,f):v=d;let y=Number.isNaN(v)?d:v;o.currentValue=Se(y),o.settled=!0}return t};var gu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Jy(e,o,c,s);return!p&&p!==0?a:{...a,[fu[s].set]:p}});return{...r,values:i}});var bu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Na=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=bu(a,"start");return bu(c,"priority")};var Aa=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var As=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=no(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:fy(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Rt(t),this.#m=!0,this.#C=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let t=ir(this.#h,this.#l);if(this.#g.grid.col>t.length){Mt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:qe,fastestStagger:qe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=Fe.NONE}){if(o){this.#x({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:t,isLastDraw:r,direction:n}))}#x({partial:t=0,isLastDraw:r=!1,direction:o=Fe.NONE}){this.#a&&(this.#r=t,this.#v(t)),!this.#a&&this.#r&&(!o||o===Fe.NONE)&&(this.#f=t>=this.#r?Fe.FORWARD:Fe.BACKWARD),!this.#a&&(o===Fe.BACKWARD||o===Fe.FORWARD)&&(this.#f=o),this.#n=Xy({timeline:this.#t,valuesState:this.#n,partial:t});let n=Oe(this.#n,"currentValue");Pa({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#r=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#v(t=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:Fe.FORWARD},s={shouldFire:t<=o,direction:Fe.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===Fe.FORWARD&&t>o&&this.#r<=o,s=this.#f===Fe.BACKWARD&&t<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:Se(n*r),end:Se(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=by(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(ce.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ta({start:n,end:s}))return this;let a=Hy(t,i),c=Aa({data:a,values:this.#n}),l=Object.keys(t),p=Na({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=gu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ta({start:n,end:s}))return this;let a=Gy(t,i),c=Aa({data:a,values:this.#n}),l=Object.keys(t),p=Na({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=gu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ta({start:s,end:i}))return this;if(!ro(t,r))return oo("sequencer goFromTo:",t,r),this;let c=qy(t,r,a),l=Aa({data:c,values:this.#n});return this.#t=Na({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||hb(t),n||db(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ar(t,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(t=0){this.#o=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Ky=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,v=a+d*1/s,y=Se(v),T=Math.abs(d)<=.1,S=t===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Wt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;constructor(t){this.#n=Rt(t??{}),this.#t=so(t?.relative,"spring"),this.#i=au(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#x=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=qe,this.#k=qe;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#h=!0,this.#o=Ky({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Oe(this.#o,"currentValue");if(this.#g||Pn({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=Oe(this.#o,"toValue");Nn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#_(l,p,o,n,s,i)})})}#w(t,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#N(){if(Ln(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();co("spring",t);let r=ir(this.#a,this.#p);if(this.#n.grid.col>r.length){Mt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#N(),this.#v=!1),$n({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=Sn(this.#o)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#x=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=fa(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&Ra((t,r)=>this.#w(t,r)))}setData(t){this.#o=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=it(this.#o,this.#e)}#O(t){let o=ce.get("spring").config,n=Ey(t?.config)?o?.[t?.config??"default"]??Ao.default:this.#y.configProps,s=cu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=ao(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=An(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!ro(t,r))return oo("spring goFromTo:",t,r),new Promise(s=>s);let n=On(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Mr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Mr(t);this.#o=Bn(o,this.#o);let{reverse:n}=this.#O(r??{});kt(n,"reverse")&&(this.#o=Er(t,this.#o)),this.#o=xn(this.#o,this.#t),this.#o=Cr(this.#o)}#E(t,r,o={}){this.#o=Bn(t,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(kt(n,"reverse")&&(this.#o=Er(r,this.#o)),this.#o=xn(this.#o,this.#t),kt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=Cr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#o,"currentValue")}getInitialData(){return Oe(this.#e,"currentValue")}getFrom(){return Oe(this.#o,"fromValue")}getTo(){return Oe(this.#o,"toValue")}getFromNativeType(){return Fn(this.#o)}getToNativeType(){return Dn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(t={}){let r=cu(t);this.#i={...this.#i,...r},this.#y=it(this.#y,{configProps:r})}updateConfig(t){this.#i=au(t),this.#y=it(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ar(t,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(t=>t()),this.#r=[]}};var Qy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Se(s)}}return{...n,currentValue:n.fromValue}});var Rr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;constructor(t){this.#n=Sa(t?.ease),this.#t=lu(t?.duration),this.#i=so(t?.relative,"tween"),this.#l=Rt(t??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#x=0,this.#v=0,this.#y=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:xa(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#N=qe,this.#R=qe;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#C-this.#x),this.#x=t-this.#C-this.#v,Math.round(this.#x)>=this.#t&&(this.#x=this.#t),this.#e=Qy({values:this.#e,timeElapsed:this.#x,duration:this.#t,ease:this.#n});let r=Math.round(this.#x)===this.#t,o=Oe(this.#e,"currentValue");if(this.#m||Pn({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){Nn({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#C=t,this.#O(t)}async#A(){if(Ln(this.#l.each,this.#y,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("tween",t);let r=ir(this.#d,this.#a);if(this.#l.grid.col>r.length){Mt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#N=i,this.#R=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#_||(this.#s=t,this.#c=r,this.#y&&(this.#_=!0,await this.#A(),this.#_=!1),$n({validationFunction:this.#r,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=Sn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#b(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#F(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=Sa(o),this.#i=so(s,"tween"),this.#t=lu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(t);return this.#L(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=An(t);return this.#L(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(t,r))return oo("tween goFromTo:",t,r),new Promise(s=>s);let n=On(t,r);return this.#L(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};return this.#L(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Mr(t),n=r?{...r,duration:1}:{duration:1};this.#e=du(o,this.#e);let{reverse:s}=this.#F(n);kt(s,"reverse")&&(this.#e=Er(t,this.#e)),this.#e=Xl(this.#e,this.#i),this.#e=Cr(this.#e)}#L(t,r,o={}){this.#e=du(t,this.#e);let{reverse:n,immediate:s}=this.#F(o);if(kt(n,"reverse")&&(this.#e=Er(r,this.#e)),this.#e=Xl(this.#e,this.#i),kt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Cr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Fn(this.#e)}getToNativeType(){return Dn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(t){this.#n=Sa(t),this.#w=it(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=ar(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Kw=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=Se(o*h),d=Se(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Se(p),end:Se(i+p)}},Qw=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===$o)return{start:0,end:Se(e-(i-c))};if(n===Lo){let l=(i-c)/2;return{start:Se(l),end:Se(e-l)}}return n==="end"?{start:Se(i-c),end:Se(e)}:{start:0,end:e}},Zy=e=>{let t=xy(e?.items),r=Rt(e),o=no(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,v)=>({item:d,start:0,end:o,index:v}));if(!Sy(t))return i;r.grid?.col>t.length&&(Mt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Rb(n),s=1);let{staggerArray:a}=Pt({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:qe,fastestStagger:qe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Mb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,v)=>d-v),h=p.length;return c.map(({item:d,frame:v})=>{let y=p.indexOf(v),T=s*h/n,{start:S,end:_}=r.type===Oo?Kw({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===$o||r.type==="end"||r.type===Lo?Qw({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:y}})};function Zw(e){return new Ps(e)}function eI(e){return new As(e)}function tI(){return new Ns}function rI(e){return Zy(e)}function oI(e){return new Rr(e)}function nI(e){return new Wt(e)}function sI(e){return new kr(e)}var we={};vo(we,{createAsyncTimeline:()=>aI,createSyncTimeline:()=>iI});var Q=()=>{},Oa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var $a=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var lo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?$a({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var yu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Q;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Os=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;constructor(t){this.#n=_a(t?.repeat),this.#t=pe(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=pe(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=pe(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=pe(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=pe(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#x=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#N=0,this.#R=0,this.#O=!1,this.#E=[],this.#A=!1,this.#P=0,this.#b=[],this.#F=[],this.#L=void 0,this.#I=void 0}#B(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=$a({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:v}=a,y={...d};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,sb()),this.#E.push({id:v,action:p});let M=r.find(({id:C,action:w})=>C===v&&w===p),x={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>M?new Promise(C=>C({resolve:!0})):new Promise(C=>{if(_){C({resolve:!0});return}let w=this.getDirection();l({direction:w,loop:this.#m}),C({resolve:!0})}),addAsync:()=>{this.#k=!0;let C=this.#w;return M?new Promise(w=>w({resolve:!0})):new Promise((w,O)=>{if(_){w({resolve:!0});return}let N=this.getDirection();l({direction:N,loop:this.#m,resolve:()=>{if(C===this.#w){w({resolve:!0});return}O()}})})},createGroup:()=>new Promise(C=>C({resolve:!0})),closeGroup:()=>new Promise(C=>C({resolve:!0})),label:()=>new Promise(C=>C({resolve:!0})),suspend:()=>{if(M)return new Promise(O=>O({resolve:!0}));let C=u.checkType(Boolean,l());C||ib(l);let w=C?l():!0;return new Promise(O=>{!_&&w&&(this.#T=!0),O({resolve:!0})})}};return new Promise((C,w)=>{let O=_?!1:d?.delay,N=this.#w;if(O){let L=u.getTime();requestAnimationFrame(()=>{this.#$({start:L,deltaTimeOnpause:0,delay:O,mainReject:w,mainResolve:C,previousSessionId:N,tween:c,stepFunction:x,action:p})});return}yu({mainReject:w,mainResolve:C,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:L=>this.#Y(L),currentSessionId:()=>this.#w,previousSessionId:N,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#U(),this.#B();return}if(this.#g<this.#s.length-1){this.#g++,this.#B();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=lo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,v)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#F.forEach(({cb:p})=>p()),this.#_=!0,this.#L&&Jo.add(()=>{xt.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#y&&(r=p-this.#R),h-r>=o||this.#_||this.#C){yu({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#x)&&this.#U(),this.#x=!1,this.#B()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Q;let o=this.#N;return this.#N++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#U(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(ab(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#o.push(n)}#D(){this.#o.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Ms(t))return this;o.delay=Is(o?.delay);let n=this.#h?lo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Ms(t))return this;o.delay=Is(o?.delay);let n=lo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Ms(t))return this;o.delay=Is(o?.delay);let n=lo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Ms(t))return this;n.delay=Is(n?.delay);let s=this.#h?lo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Q){let r=io(t,()=>{},"timeline add function");return this.#f?(kn("add"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=My(t);return this.#f?(kn("addAsync"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(kn("createGroup"),this):(this.#r++,this.#M({...this.#p,id:this.#r,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#M({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(kn("suspend"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(kn("label"),this):wy(t?.name,"asyncTimeline label:")?(this.#r++,this.#M({...this.#p,id:this.#r,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#H(){this.#O||(this.#O=!0,this.#o.forEach(({tween:t})=>{let r=t.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:t})=>{let r=lo({timeline:this.#s,tween:t,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=ky(r),n=Ry(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(ub(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=lo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{pb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#te(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(t){return await this.#te(),this.#K(t,!1)}async playFromReverse(t){return await this.#te(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#v&&this.#U(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Iy(this.#a.index,t),this.#B())}})})}async play(){return await this.#te(),new Promise((t,r)=>{if(this.#l&&this.#H(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#v&&this.#U(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#L=t,this.#B()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#L=t,this.#B()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#te(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#H(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#L=a,this.#I=c,this.#B()},1))})}reverseNext(){this.#C=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#C=!1,this.#Q(),this.#x=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#U(),this.#v=!1,this.#i||this.#D()}pause(){this.#y||(this.#y=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#B();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#U(),this.#m++,this.#B())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#_?Fe.NONE:this.#v?Fe.BACKWARD:Fe.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#F.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#F=this.#F.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#F=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var $s=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;constructor(t={}){this.#n=no(t?.duration),this.#t=pe(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=_a(t?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#x=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#N=void 0,this.#R=void 0,this.#O={time:0,direction:Fe.NONE},this.#E={direction:Fe.NONE,loop:0}}#A(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#h-this.#u-this.#e),this.#u=Math.trunc(t-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#y||(this.#s=rt(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#w.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#x=!1,this.#P();return}if(this.#S(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#P();return}if(u.useNextFrame(()=>{!this.#v&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#E.direction=s,this.#E.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#E)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#N&&this.#N(!0);return}if(this.#t){this.reverse(),this.#P();return}if(this.#d){this.#b(),this.#h=t,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#P();return}this.#b(),this.#h=t,this.#p&&(this.#d=!this.#d),this.#P()}#P(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#A(t,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#F(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||mb(t),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#I()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#I(s)})}#I(t=0){this.#S(),this.#b(),this.#s=t,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#v=!0,this.#$(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#S(),this.#u=t,this.#s=t,this.#c=t,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#v=!0,this.#$(t)}async#$(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#S(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#L(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#S(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?Fe.NONE:this.#p?Fe.BACKWARD:Fe.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function iI(e){return new $s(e)}function aI(e){return new Os(e)}var Je={};vo(Je,{createParallax:()=>hI,createScrollTrigger:()=>dI});var cI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function ev({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(cI({prevValue:e,value:t,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var lI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},uI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},pI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},mI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},tv=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=lI({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=uI({screen:n}),v=pI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=mI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:ce.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var rv=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ce.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var La=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#x=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#M="left",this.#D=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#N=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#A=0,this.#P=0,this.#b=!1,this.#F=1.5,this.#L=!1,this.#I=!1,this.#B=0,this.#$=0,this.#S=!1,this.#Y=0,this.#U=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#D=t.anticipatePinOnLoad,this.#L=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#te(),this.#se(),this.#K(),this.#H(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#H(){this.#p=new Wt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${t}px)`:this.#r&&(this.#r.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#te(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=rv({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#re()}#K(){if(!this.#r||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${t}px`,this.#r.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#w.map(r=>this.#ee(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#re(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#h=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#x(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#B=0,this.#I=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#h:this.#ce()+this.#h;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#r||!this.#M)return;let r=this.#r?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#J(){if(!this.#r)return;let t=this.#c===b.DIRECTION_VERTICAL?St(this.#r).left:St(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${t}px`,this.#I=!0,this.#S=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#N.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#oe(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#oe()),this.#a?.append(this.#r))})}#me(t){let r=this.#S&&this.#Y<3?this.#$:rt(Math.abs(t-this.#A),0,250);return this.#S&&this.#Y<this.#U?this.#Y++:(this.#Y=0,this.#S=!1),this.#$=r,r*this.#F}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#B<this.#U){this.#B++;return}else this.#B=0,this.#I=!1;let r=this.#A>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#X(),this.#ne(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=t,this.#T=!1}};var ov=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},nv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},sv=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var vu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),iv=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},av=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,cv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),lv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=hy(r);if(r&&!o)return ov(),vu();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return nv(),vu();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return sv(),vu();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>nu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>nu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},uv=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=lv(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:ya(c)}:{value:e*p,additionalVal:a,position:ya(c)}},pv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=lv(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,v=ya(h),y=v===b.POSITION_TOP||v===b.POSITION_LEFT;return l===b.PX?{value:iv(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}:{value:av(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}},Tu=(e,t,r,o)=>{let n=String(t);return Ae(n,b.PLUS_HEIGHT_HALF)?e+r/2:Ae(n,b.PLUS_HEIGHT)?e+r:Ae(n,b.PLUS_WIDTH_HALF)?e+o/2:Ae(n,b.PLUS_WIDTH)?e+o:Ae(n,b.MINUS_HEIGHT_HALF)?e-r/2:Ae(n,b.MINUS_HEIGHT)?e-r:Ae(n,b.MINUS_WIDTH_HALF)?e-o/2:Ae(n,b.MINUS_WIDTH)?e-o:e},mv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},hv=(e,t)=>e===b.PROP_OPACITY?1-t:-t,_u=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var uo=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;#H;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#oe;#V;#ne;#me;#z;#ve;#he;#de;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#x=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#N=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#A="",this.#P=0,this.#b=0,this.#F=()=>{},this.#L=()=>{},this.#M=!1,this.#I=pe(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#B=pe(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=pe(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=pe(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Ca(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#U=Ca(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Ca(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#D=t?.dynamicStart?pu(t.dynamicStart,"dynamicStart"):null,this.#H=t?.dynamicEnd?pu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Py(t?.dynamicRange),this.#te=pe(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=io(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=io(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=io(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=io(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#re=io(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Ay(t?.align),this.#ue=Oy(t?.onSwitch),this.#ce=pe(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=mu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=mu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=pe(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Ny(t?.tween);let r=this.#X?.getType&&this.#X.getType()===b.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===b.TWEEN_TWEEN;this.#q=Rn(t?.item,!1),this.#J=Rn(t?.scroller,!0),this.#j=Rn(t?.screen,!0),this.#Z=uu(t?.trigger),this.#oe=uu(t?.applyTo),this.#V=ks(t?.direction,"Parallax/Scrolltrigger"),this.#ne=pe(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=pe(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=$y(t?.type),this.#ve=sr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#he=Fo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#de=Bo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Dy(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Ly(t?.range,this.#z),this.#ye=pe(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&Zb(),this.#Ce=r?b.EASE_LERP:Fy(t?.easeType),this.#we=By(t?.springConfig,this.#z),this.#Ie=Vy(t?.lerpConfig,this.#z),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ae=this.#Ce===b.EASE_SPRING?new Wt:new kr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Ne(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#r=_u({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#r=_u({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new La,fe[this.#de](this.#he)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Pe()),this.#E?.onScroll(this.#c)}))}#Pe(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#B,anticipatePinOnLoad:this.#S,forceTranspond:this.#$,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=Rn(t,!0)}setScreen(t){this.#j=Rn(t,!0)}setDirection(t){this.#V=ks(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#he=Fo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#de=Bo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#We(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#F=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===b.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!0})}))}),this.#L=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Ne(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#A=b.PX}else{let t=String(this.#Te),r=Wy(t,this.#le),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#A=dy(r)}}#Me(){let t=this.#o/100;if(this.#D&&this.#D?.position&&this.#D?.value?.()!==void 0){let{position:l,value:p}=this.#D,h=p();Number.isNaN(h)||(this.#Y=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=uv(t,this.#Y,this.#V);if(this.#M=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#P=Tu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#H&&this.#H?.position&&this.#H?.value?.()!==void 0){let{position:l,value:p}=this.#H,h=p();Number.isNaN(h)||(this.#U=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=pv(t,this.#U,this.#P,this.#o,this.#M,this.#V),c=this.#M?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=Tu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#je(),this.#M&&(this.#P-=this.#u)}#je(){if(this.#W){let{startMarker:t,endMarker:r}=tv({startMarker:this.#x,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#x=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=_o(this.#Z)?.x??0,o=_o(this.#Z)?.y??0,n=_o(this.#Z)?.z??0),t.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(de(t).top):Math.trunc(de(t).top)-de(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(de(t).left):Math.trunc(de(t).left)-de(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(de(this.#j).top):Math.trunc(St(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(de(this.#j).top):Math.trunc(St(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-de(this.#J).top:-de(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Ne(),this.#I&&this.#E&&fe[this.#de](this.#he)&&this.#E?.init(this.#Pe())),this.#y=void 0,this.#w=!0,fe[this.#de](this.#he)?this.#ye?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#oe?(this.#Be(this.#oe),Object.assign(this.#oe.style,this.#Ve())):(this.#Be(this.#q),this.#q&&Object.assign(this.#q.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!fe[this.#de](this.#he)||!t)return;this.#R=!0;let o=this.#ze(t);if(this.#ye)this.#xe(o);else{this.#Se(o);let n=this.#N||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#_e({forceRender:!0})}#ze(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#Se(t){if(!fe[this.#de](this.#he)||(t?this.#c=-t:this.#De(),this.#N=cv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#N&&!this.#be&&this.#z===b.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===b.TYPE_SCROLLTRIGGER?this.#h=Se(this.#Ue()):this.#le===b.PROP_OPACITY?this.#h=Se(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?Se(this.#qe()/2):Se(this.#Je()/2);let r=this.#ce&&this.#z!==b.TYPE_SCROLLTRIGGER?hv(this.#le,this.#h):this.#h;this.#h=this.#z===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#xe(t){if(!fe[this.#de](this.#he)||(this.#Se(t),!this.#k&&!this.#w&&this.#z===b.TYPE_SCROLLTRIGGER)||!this.#N&&!this.#w&&this.#z===b.TYPE_PARALLAX)return;let r=this.#w&&!this.#te?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#h},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){fe[this.#de](this.#he)&&u.useFrame(()=>{this.#h===this.#y&&!t||!this.#N&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#N),this.#le===b.PROP_TWEEN?(this.#X.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#h,this.#w=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#re&&this.#re({value:this.#h,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#d,o=t/100*this.#d,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-rt(n,0,r):-rt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#h;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&ev({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#He(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#He(t){switch(this.#A){case b.VW:return this.#e/100*-t;case b.VH:return this.#p/100*-t;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#Ge(){let t=this.#o/100*this.#pe,r=this.#o-this.#o/100*this.#fe,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-t);return rt(n,0,1)}#qe(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#o/100*t-this.#i)/r}#Ye(t){return mv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#y=t,this.#w=!1;let r=this.#oe||this.#q;if(!r||this.#Ee)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${t}`;break}case b.PROP_SCALE:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#le.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#X&&t&&(t.style="")}#Ve(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#F(),this.#L(),this.#C(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#D?.value&&(this.#D.value=()=>0),this.#H?.value&&(this.#H.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#re=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#v&&this.#v?.remove?.(),this.#x=void 0,this.#v=void 0,this.#E=void 0,this.#h=0;let t=this.#oe??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#oe=null}};function hI(e){return new uo({...e,type:b.TYPE_PARALLAX})}function dI(e){return new uo({...e,type:b.TYPE_SCROLLTRIGGER})}var Su=window.innerHeight,xu=document.body.offsetHeight,po=!1,Cu=!0,jt=window.scrollY,Ls=!0,zt=!1,Eu=()=>{},wu=()=>{},Fa=()=>{},Da,dv=()=>{document.body.classList.remove("is-whelling")},fI=()=>{document.body.classList.add("is-whelling")};le.setDefault({usePassive:!1});var gI=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Da=t;let o=r.subscribe(({scrollValue:h})=>{zt||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{jt=window.scrollY});let n=u.useMouseWheel(h=>{if(zt)return;h.preventDefault(),Ls=!1,fI();let f=h.spinY??0,d=le.clamp(f*e+jt,0,xu-Su);jt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Cu&&h()}),i=u.useMouseWheel(u.debounce(()=>{dv()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!Ls)return;let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{zt||(dv(),r.stop(),jt=window.scrollY,Ls=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),jt=window.scrollY,Su=window.innerHeight,xu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{po=!1,jt=0,Ls=!0,zt=!1,Da&&(p.unobserve(Da),p.disconnect()),r?.stop(),r?.destroy(),r=null,Da=null,o(),c(),a(),n(),l(),i(),s(),Eu=()=>{},wu=()=>{},Fa=()=>{}},stop:()=>{r.stop(),jt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Ba=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{po||(jt=window.scrollY,po=!0,zt=!1,Su=window.innerHeight,xu=document.body.offsetHeight,Cu=!0,Ls=!1,{destroy:Eu,stop:wu,update:Fa}=gI({velocity:e,rootElement:t}))},cr=()=>{!po||zt||(wu(),zt=!0)},Ut=()=>{!po||!zt||(zt=!1)},Ds=()=>{!po||!zt||(Fa(),jt=window.scrollY,zt=!1)},Iu=()=>{po&&Fa()},Mu=()=>{Eu()},fv=()=>{Cu=!0};var gv=()=>po;var bv="easeOutQuad",Fs=new Rr({ease:bv,data:{val:0}}),Va=!1,ku=!1;Fs.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Iu()});var Ru=()=>{ku&&(document.body.style.overflow=""),Fs?.updateEase?.(bv),Ds()},Pu=()=>{Va&&(Fs.stop(),Ru())};u.useMouseWheel(()=>{Pu()});u.useMouseDown(()=>{Pu()});u.useTouchStart(()=>{Pu()});var Pr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Fc(t)||u.checkType(Number,t)?Fc(t)?de(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=sr(r?.duration,"bodyScroll: duration",500);return ku=pe(r?.overflow,"bodyScroll: overflow",!1),xa(r?.ease)&&Fs?.updateEase?.(r?.ease),ku&&(document.body.style.overflow="hidden"),new Promise(s=>{Va=!0,cr(),Fs.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Ru(),Va=!1,s(!0)}).catch(()=>{Ru(),Va=!1,s(!0)})})}};var Bs={END:"END",START:"START",CENTER:"CENTER"};var bI=e=>{switch(e){case Bs.END:return"align-items:flex-end;";case Bs.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},yv=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=fe.getBreackpoint(r),d="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=bI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,M=document.createElement("div");M.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),M.append(x),e.prepend(M)};var Vs=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W;#D;#H;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#o=()=>{},this.#pe=0,this.#B=t?.container??"",this.#W=[],this.#D=!1,this.#H=0,this.#G={},this.#te=0,this.#K=t?.children||[],this.#e=pe(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=sr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=pe(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Fo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Bo(t?.queryType,"queryType","horizontalScroller"),this.#r=pe(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=pe(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=pe(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=pe(t?.ease,"HorizontalScroller: ease",!1),this.#x=Ia(t?.easeType??"","HorizontalScroller"),this.#v=pe(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=pe(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=pe(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=pe(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=sr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=sr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#N=t?.columnAlign?t.columnAlign.toUpperCase():Bs.START,this.#R=at(t?.onEnter,"HorizontalScroller: onEnter",Q),this.#O=at(t?.onEnterBack,"HorizontalScroller: onEnterBack",Q),this.#E=at(t?.onLeave,"HorizontalScroller: onLeave",Q),this.#A=at(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Q),this.#P=at(t?.afterInit,"HorizontalScroller: afterInit",Q),this.#b=at(t?.afterRefresh,"HorizontalScroller: afterRefresh",Q),this.#F=at(t?.afterDestroy,"HorizontalScroller: afterDestroy",Q),this.#L=at(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#B)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#I.querySelector(t.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#I.querySelector(t.row),this.#S||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#U=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#S.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&yv({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#d,container:this.#B,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#N}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{fe[this.#f](this.#d)&&(cr(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#re=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ie=n=>{fe[this.#f](this.#d)&&(cr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Ut(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Oa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#h+this.#H>t+window.innerHeight}#J(){this.#o=u.useScroll(()=>this.#q()),this.#q(),this.#S.addEventListener("click",this.#fe,{passive:!1}),this.#S.addEventListener("mousedown",this.#ee,{passive:!0}),this.#S.addEventListener("mouseup",this.#Q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#re,{passive:!0}),this.#S.addEventListener("touchstart",this.#ie,{passive:!0}),this.#S.addEventListener("touchend",this.#ue,{passive:!0}),this.#S.addEventListener("mousemove",this.#se,{passive:!0}),this.#S.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#o(),this.#S.removeEventListener("click",this.#fe),this.#S.removeEventListener("mousedown",this.#ee),this.#S.removeEventListener("mouseup",this.#Q),this.#S.removeEventListener("mouseleave",this.#re),this.#S.removeEventListener("touchstart",this.#ie),this.#S.removeEventListener("touchend",this.#ue),this.#S.removeEventListener("mousemove",this.#se),this.#S.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#$||!this.#I||!this.#S?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#H;this.#te=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#S.style.width=`${r}px`),t(!0)})})}#oe(){return new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#d)){t(!0);return}this.#H=[...this.#Y].map(r=>Ve(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#$?new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#d)||!this.#U){t(!0);return}let r=[...this.#U].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#$.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#$&&(this.#$.innerHTML="")}#me(){return new Promise(t=>{if(!fe[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#U&&([...this.#U].forEach(r=>{let o=this.#te/100,n=r.dataset.shadow,s=Ve(r),i=se(this.#S),a=_o(this.#S)?.x??0,c=this.#T?this.#H-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=d?.querySelector(`.${this.#M}--in-center`),y=d?.querySelector(`.${this.#M}--out-center`),T=d?.querySelector(`.${this.#M}--left`),S=d?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,M=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,C=(()=>{let N=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:N})(),w=(()=>{let N=s/l,L=(s-s/l)/o;return N+L+C})(),O=w/2+M;this.#v&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),v&&(v.style.height=`${O}px`),y&&(y.style.height=`${O}px`),y&&(y.style.top=`${O}px`),T&&(T.style.height=`${C}px`),S&&(S.style.height=`${w+_}px`),d&&(d.style.height=`${C}px`)}),t(!0))})})}#z(){if(!this.#$||!fe[this.#f](this.#d))return;let t=new uo({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#H-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#H},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#H-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#A});t.init(),this.#D=!0,this.#G=t,this.#t=de(this.#$).top,this.#be()}#ve(){Oa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#he()})}#he(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#D||!fe[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{Oa(this.#oe.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=de(this.#$).top,this.#D&&(this.#G?.refresh?.(),this.#he()),t(!0)})})}#de({destroyAll:t=!1}){(this.#D||t)&&(this.#G?.destroy?.(),this.#G=null,this.#$&&(this.#$.style.height=""),this.#I&&(this.#I.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#ne(),this.#ge(),this.#D=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#$=null,this.#S=null,this.#Y=[],this.#U=[],this.#P=Q,this.#b=Q,this.#L=Q,this.#R=Q,this.#O=Q,this.#E=Q,this.#A=Q,this.#G=null,this.#D=!1,this.#W=[],this.#I=null,this.#B=null,this.#$=null,this.#S=null,u.useNextTick(()=>{this.#F?.(),this.#F=Q,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#D&&fe[this.#f](this.#d)?t&&this.refresh():!this.#D&&fe[this.#f](this.#d)?this.#ve():this.#D&&!fe[this.#f](this.#d)&&this.#de({destroyAll:!1})}destroy(){this.#de({destroyAll:!0})}};var Ws=new Map,Wa=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},yI=e=>{let t=new Rr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Nr={subscribe:n=>{if(!Wa(n))return()=>{};if(Ws.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=yI(n);return Ws.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Ws.delete(n)}},reset:n=>{Wa(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Wa(n))return new Promise(c=>c(!0));let s=Ws.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=se(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Wa(n))return new Promise(l=>l(!0));let s=Ws.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=se(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var Tt=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#x;#v;#y;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#U;#M;#W=!1;#D;#H;#G;#te=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Q,this.#d=Q,this.#f=Q,this.#r=Q,this.#g=Q,this.#m=Q,this.#C=Q,this.#x=Q,this.#v=Q,this.#y=Q,this.#T=Q,this.#k=Q,this.#_={},this.#w=Q,this.#N=Q,this.#R=ks(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Ia(t?.easeType??"","SmoothScroller"),this.#A=Fo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Bo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#F=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#F||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=pe(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=sr(t?.speed,"SmoothScroller: speed",60),this.#B=pe(t?.drag,"SmoothScroller: drag",!1),this.#$=at(t?.onTick,"SmoothScroller: onTick",Q),this.#S=at(t?.onUpdate,"SmoothScroller: onUpdate",Q),this.#Y=at(t?.onSwipe,"SmoothScroller: onSwipe",Q),this.#ee=pe(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=pe(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=pe(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#U=at(t?.afterRefresh,"SmoothScroller: afterRefresh",Q),this.#M=at(t?.afterInit,"SmoothScroller: afterInit",Q),this.#D=t?.children||[],this.#D.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#F),r.setBreakPoint(this.#A),r.setQueryType(this.#P),r.init()}),this.#H=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#re()},500))}#re(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===b.EASE_SPRING?this.#_=new Wt:(this.#_=new kr,this.#_.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#H,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#L||(this.#x=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#oe(t)),this.#y=u.useTouchMove(t=>this.#oe(t))),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#r=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#C=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Ut()}),this.#B&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),fe[this.#P](this.#A)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#D.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!0}),this.#D.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#N=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!1}),this.#D.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#F&&(this.#l=this.#F===document.documentElement?window.innerWidth:Ve(this.#F),this.#h=this.#F===document.documentElement?window.innerHeight:se(this.#F),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#o||!this.#B||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080}#J({spinY:t=0}){if(!fe[this.#P](this.#A))return;this.#o=!1;let r=this.#q(),o=rt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){fe[this.#P](this.#A)&&(t===this.#b||ts(this.#b,t))&&(this.#u=this.#t,this.#o=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#o=!1}#oe({target:t,client:r,preventDefault:o}){if((t===this.#b||ts(this.#b,t))&&this.#o&&this.#B){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(fe[this.#P](this.#A)&&(this.#ie(),t===this.#b||ts(this.#b,t))){this.#o=!1,n?.(),cr();let s=Math.abs(this.#te-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=rt(a,-1,1)*this.#I*rt(c,1,10),this.#ne(),this.#K=r,this.#te=o}}move(t){return fe[this.#P](this.#A)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){fe[this.#P](this.#A)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=rt(t,0,100),this.#t=rt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#S?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){fe[this.#P](this.#A)&&(t===this.#b||ts(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#R===b.DIRECTION_VERTICAL?r:t}refresh(){if(!fe[this.#P](this.#A)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#U?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#x(),this.#v(),this.#y(),this.#T(),this.#w(),this.#N(),this.#k(),this.#_?.destroy(),this.#_=null,this.#D.forEach(t=>{t?.destroy?.()}),this.#D=[],this.#$=Q,this.#S=Q,this.#U=Q,this.#M=Q,this.#L&&(this.#b?.removeEventListener("wheel",this.#H),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#F=null})},3)}};var vv=!1,vI=new Set(["scrollerN0","scrollerN1"]),Tv=()=>{let e=document.querySelector("#root");e&&(Ba({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{cr(),fv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;vv=vI.has(t),u.useFrameIndex(()=>{if(vv){Mu();return}!gv()&&Ba({rootElement:e}),Ds()},30)}))};function _v(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Nt=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Ht(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var Sv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var xv,Cv={},TI="./asset/svg/icons/",_I=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],lr=()=>xv,Vn=()=>Cv,Ev=async()=>{let{success:e,data:t}=await Nt({source:"./data/common.json"});e||console.warn("data fail to load"),xv=t},wv=async()=>{let e=_I.map(({name:r,source:o})=>te({source:`${TI}${o}`}).then(n=>({name:r,result:n})));Cv=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Iv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Mv=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new Tt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var SI=e=>e<10?`0${e}`:`${e}`,kv=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Mv({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${SI(l)}</span
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
    </div>`};var Rv=m.createComponent({tag:"layout-links",component:kv,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Rv]);var ja=async({props:e})=>{let{source:t}=e,{data:r}=await Nt({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Pv=()=>g`
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
    `;var za=m.createComponent({tag:"doc-container",component:Pv});var Nv=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Ua=m.createComponent({tag:"doc-title",component:Nv,state:{}});var Av=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Ha=m.createComponent({tag:"doc-title-small",component:Av,state:{}});var eT=fC(Zv(),1);var Vu=eT.default;var tT="[A-Za-z$_][0-9A-Za-z$_]*",mM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],hM=["true","false","null","undefined","NaN","Infinity"],rT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],oT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],dM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],fM=[].concat(nT,rT,oT);function sT(e){let t=e.regex,r=($,{after:B})=>{let V="</"+$[0].slice(1);return $.input.indexOf(V,B)!==-1},o=tT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:($,B)=>{let V=$[0].length+$.index,q=$.input[V];if(q==="<"||q===","){B.ignoreMatch();return}q===">"&&(r($,{after:V})||B.ignoreMatch());let ee,ue=$.input.substring(V);if(ee=ue.match(/^\s*=/)){B.ignoreMatch();return}if((ee=ue.match(/^\s+extends\s+/))&&ee.index===0){B.ignoreMatch();return}}},a={$pattern:tT,keyword:mM,literal:hM,built_in:fM,"variable.language":dM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},M=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,{match:/\$\d+/},h];f.contains=M.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(M)});let x=[].concat(_,f.contains),C=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),w={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:C},O={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},N={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...rT,...oT]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[w],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function A($){return t.concat("(?!",$.join("|"),")")}let k={match:t.concat(/\b/,A([...nT,"super","import"].map($=>`${$}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},D={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},F={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},w]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",R={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[w]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:C,CLASS_REFERENCE:N},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,_,{match:/\$\d+/},h,N,{scope:"attr",match:o+t.lookahead(":"),relevance:0},R,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:C}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[w,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},D,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[w]},k,P,O,F,{match:/\$[(.]/}]}}Vu.registerLanguage("javascript",sT);var iT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Vu.highlightElement(e),e.style.height=""},gM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),aT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=gM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await iT({ref:d,source:a.source}):iT({ref:d,source:a.source}),()=>{}}),g`<div
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
    </div>`};var cT=m.createComponent({tag:"mob-snippet",component:aT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Us="debug_component",Xa="debug_filter_list",Ka="debug_overlay",Qa="debug_tree",Hs="quick_nav",Gs="scroll_down_label",qs="scroll_to",lT="header",Za="mob_navigation",Js="mob_navigation_container",ec="search_overlay",Ys="search_overlay_list",jo="search_overlay_header",tc="right-sidebar",rc="route-loader";var uT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(qs)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},pT=e=>{m.useMethodByName(qs)?.setActiveLabel?.(e)};function bM({label:e}){return e?.length>0}var yM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),uT({id:e,label:t,element:r,isSection:o,isNote:n}),dp(r)&&!o&&pT(t)},mT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{bM({label:s})&&yM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var hT=m.createComponent({tag:"mob-spacer",component:mT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var dT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
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
    </div>`};var fT=m.createComponent({tag:"anchor-button",component:dT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var vM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),gT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${vM({items:o,links:n})}
    </ul>`};var bT=m.createComponent({tag:"mob-list",component:gT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var yT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var vT=m.createComponent({tag:"mob-paragraph",component:yT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var TM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",TT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${TM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var _T=m.createComponent({tag:"mob-title",component:TT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var _M=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),SM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Nt({source:e});return r?o.data:[]},ST=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await SM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${_M({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var xM=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},xT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{xM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var CT=m.createComponent({tag:"doc-svg",component:xT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var oc=m.createComponent({tag:"html-content",component:ST,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[bT,vT,_T,cT,hT,fT,CT]});var ET=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var wT=m.createComponent({tag:"scroll-to-button",component:ET,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var Xs=!1;function CM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:de(a).top-50;Xs=!0,r.activeLabel=i,await Pr.to(c),setTimeout(()=>{Xs=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var IT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},MT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:v,isNote:y}])}),s("setActiveLabel",h=>{Xs||(c.activeLabel=h)}),e(()=>{if(le.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:de(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=de(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{Xs||IT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{Xs||IT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>CM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var kT=m.createComponent({tag:"scroll-to",component:MT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[wT]});var nc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var sc=e=>{m.useMethodByName(tc)?.updateList(e??[])};m.useComponent([za,Ha,kT,Ua,oc]);var Le=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Nt({source:t});return sc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${nc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${qs}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([za,Ha,Ua,oc]);var ne=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Nt({source:t});return sc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${nc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var RT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:v})=>{v||d==="backward"||o(2)},1.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(3)},5.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(4)},9.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(1)},1.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(2)},5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:C,ey:w,fx:O,fy:N,gx:L,gy:I})=>{s.ax=d,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=M,s.dy=x,s.ex=C,s.ey=w,s.fx=O,s.fy=N,s.gx=L,s.gy=I});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:M,dy:x,ex:C,ey:w,fx:O,fy:N,gx:L,gy:I})=>{i.ax=d,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=M,i.dy=x,i.ex=C,i.ey=w,i.fx=O,i.fy=N,i.gx=L,i.gy=I});let l=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Ht(-3,3),ay:()=>Ht(-3,3),bx:()=>Ht(-3,3),by:()=>Ht(-3,3),cx:()=>Ht(-3,3),cy:()=>Ht(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Ht(-3,3),fy:()=>Ht(-3,3),gx:()=>Ht(-3,3),gy:()=>Ht(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},M={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${M.x}% ${M.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Je.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Ve(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Ve(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var PT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Je.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Je.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var ic=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Je.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var NT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h})=>{let f=new WeakRef(t),d=new WeakRef(i),v=new WeakRef(a),y=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:M,pathTimeline:x,pathTween:C,stopLoop:w,destroy:O}=RT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:N,title2parallax:L,title1tween:I,title2tween:P}=PT({title_1:n,title_2:s}),{sectionContentScroller:A,destroy:k}=ic({title:d}),{sectionContentScroller:D,destroy:F}=ic({title:v}),{sectionContentScroller:E,destroy:R}=ic({title:y}),$=new Tt({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,N,L,A,D,E],onUpdate:({value:B})=>{p(B),h()}});return $.init(),setTimeout(()=>{$?.refresh?.()},500),{goTo:B=>{!B&&B!==0||$?.move?.(B).catch(()=>{})},destroy:()=>{$.destroy(),$=null,M.destroy(),_.destroy(),x.destroy(),C.destroy(),N.destroy(),L.destroy(),I.destroy(),P.destroy(),A.destroy(),D.destroy(),w(),O(),k(),F(),R()}}};var AT=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var Qs=()=>{},Ks=e=>Promise.resolve(e),ac=()=>{},Wu={1:0,2:100/3,3:100/3*2,4:100},EM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},wM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},IM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},MM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},kM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{Qs(Wu[o]),ac()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,RM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,OT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:M}=r(),{svg:x}=o(),C=0,w=!1,O=0,{svgSpring:N,destroySvgSpring:L}=AT({elements:x});Ks=async A=>{if(u.shouldMakeSomething()||p){N.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let D=-Math.abs(A/30);Number.isNaN(D)||await N.goTo({x:D}).catch(()=>{})},ac=()=>{Ks(3e3),setTimeout(()=>{Ks(0)},500)};let{destroy:I,goTo:P}=NT({screenElement:h,scrollerElement:f,pathElement:M,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,setActiveItem:A=>{c.activenavItem=A},onMove:A=>{w||(C=A),w=!0,O=C-A,Ks(O)},onScrollEnd:u.useDebounce(()=>{w=!1,O=0,Ks(O)},500)});return Qs=P,c.isMounted=!0,()=>{Qs=()=>{},I(),L()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${RM()}</div>
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
                    ${EM({setRef:t,getState:n})}
                    ${wM({setRef:t,getState:n})}
                    ${IM({setRef:t,getState:n})}
                    ${MM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{Qs(Wu[le.clamp(c.activenavItem-1,1,4)]),ac()}})}
        ></button>
        ${kM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{Qs(Wu[le.clamp(c.activenavItem+1,1,4)]),ac()}})}
        ></button>
    </div>`};var $T=m.createComponent({tag:"about-component",component:OT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>le.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([$T]);var LT=async()=>{let{data:e}=await Nt({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var DT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var cc=m.createComponent({tag:"benchmark-fake-component",component:DT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[cc]});var zu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},Zs=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},ju=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?zu(Zs(t)):Zs(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},dt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);ju({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);ju({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{ju({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var FT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var BT=m.createComponent({tag:"benchmark-invalidate",component:FT,...ht()});var lc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var VT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${lc()}
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
    </div>`};var WT=m.createComponent({tag:"benchmark-repeat-key",component:VT,...ht()});var jT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var zT=m.createComponent({tag:"benchmark-repeat-key-nested",component:jT,...ht(31)});var UT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${lc()}
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
    </div>`};var HT=m.createComponent({tag:"benchmark-repeat-no-key",component:UT,...ht()});var At=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var Uu=({value:e,useShuffle:t=!1})=>{At.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();At.set("data",t?zu(Zs(e)):Zs(e)),await m.tick();let n=performance.now()-r;At.set("time",n),At.set("isLoading",!1)})},2)},GT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);Uu({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Uu({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();Uu({value:s.length,useShuffle:!0})}})}
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
    `;var qT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),At.set("data",[]),At.set("time",0),At.set("counter",0)}),g`<div class="benchmark">
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
            ${GT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

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
    </div>`};var JT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:qT,bindStore:At,child:[cc]});var YT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var XT=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:YT,...ht(31)});var uc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var KT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${uc(1e3)}
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
    </div>`};var QT=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:KT,...ht(1001)});var ZT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${uc(1e3)}
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
    </div>`};var e_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:ZT,...ht(1001)});m.useComponent([BT,HT,WT,zT,XT,JT,QT,e_]);var Ar=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(Hs);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Hs);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var ft=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},gt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},ho=e=>"roundRect"in e;var fo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,v=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:v,centerX:d+o/2,centerY:v+n/2,offsetXCenter:PM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:NM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},PM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,NM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var t_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=h?S:v,M=ho(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=fo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,C=i?x.map((P,A)=>({...P,scale:1,rotate:0,hasFill:o.includes(A)})).toSorted(P=>P.hasFill?-1:1).toReversed():x.map((P,A)=>{let k=o.includes(A);return{...P,scale:1,rotate:0,hasFill:k}}),w=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});C.forEach(P=>{w.subscribeCache(({scale:A,rotate:k})=>{P.rotate=k,P.scale=A})});let O=()=>{if(!v)return;h&&T&&(T.width=e.width,T.height=e.height);let P=h?S:v;P&&(e.width=e.width,C.forEach(({x:A,y:k,width:D,height:F,rotate:E,scale:R,hasFill:$,offsetXCenter:B,offsetYCenter:V})=>{let q=Math.PI/180*E,ee=Math.cos(q)*R,ue=Math.sin(q)*R;P.setTransform(ee,ue,-ue,ee,Math.floor(B+A),Math.floor(V+k)),M?(P.beginPath(),P.roundRect(Math.floor(-D/2),Math.floor(-F/2),D,F,150)):(P.beginPath(),P.rect(Math.floor(-D/2),Math.floor(-F/2),D,F)),$?(P.fillStyle="#000000",P.fill()):(P.fillStyle="rgba(255, 255, 255, 1)",P.fill()),P.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:h,offscreen:T,ctx:v}))},N=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&N.goTo(w,{scale:.2,rotate:90},{duration:1e3}).goTo(w,{scale:1},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:.3,rotate:0},{duration:500}).goTo(w,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&N.goTo(w,{scale:.3,rotate:0},{duration:1e3}).goTo(w,{scale:1},{duration:1e3}),N.onLoopEnd(({direction:P,loop:A})=>{console.log(`loop end: ${P}, ${A}`)}),N.play();let L=()=>{O(),d&&u.useNextFrame(()=>L())};u.useFrame(()=>{L()});let I=Z.watch("navigationIsOpen",P=>{if(P){N?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(N?.resume(),u.useFrame(()=>L()))},500)});return()=>{w.destroy(),N.destroy(),I(),w=null,N=null,v=null,T=null,S=null,x=[],d=!1,C=null,f=null}};var Hu=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var Gu=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=t_({canvas:t().canvas,...Hu[e.currentParamsId].params,disableOffcanvas:!0})};function AM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return Hu.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,Gu({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var r_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{Gu({proxi:i,getRef:r})})});let a=u.useResize(()=>{Gu({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    ${AM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var o_=m.createComponent({tag:"animatedpattern-n0",component:r_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([o_]);var n_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var qu=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:t}),p=!0,{top:h,left:f}=de(e),d=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=fo({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((A,k)=>({...A,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(k)})).toSorted(A=>A.hasFill?-1:1),M=U.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(A=>{M.subscribeCache(({mouseX:k,mouseY:D})=>{A.mouseX=k,A.mouseY=D})});let x=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(A=>{x.subscribeCache(({scale:k})=>{A.scale=k})});let C=()=>{if(!d)return;c&&y&&(y.width=e.width,y.height=e.height);let A=c?T:d;A&&(e.width=e.width,_.forEach(({x:k,y:D,width:F,height:E,mouseX:R,mouseY:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(!V)return;let ue=R-(e.width-(F+i)*s)/2,re=$-(e.height-(E+i)*n)/2,ye=(k-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),Be=0,J=Math.cos(Be)*(Ne+B),Te=Math.sin(Be)*(Ne+B);A.setTransform(J,Te,-Te,J,Math.floor(q+k),Math.floor(ee+D)),A.beginPath(),A.rect(Math.floor(-F/2),Math.floor(-E/2),F,E),A.fillStyle="#000000",A.fill(),A.setTransform(1,0,0,1,0,0)}),A.globalCompositeOperation="destination-out",_.forEach(({x:k,y:D,width:F,height:E,mouseX:R,mouseY:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{if(V)return;let ue=R-(e.width-(F+i)*s)/2,re=$-(e.height-(E+i)*n)/2,ye=(k-ue)/250,ve=(D-re)/250,ge=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(ve),2)),Ne=le.clamp(Math.abs(ge),0,2),Be=0,J=Math.cos(Be)*(Ne+B),Te=Math.sin(Be)*(Ne+B);A.setTransform(J,Te,-Te,J,Math.floor(q+k),Math.floor(ee+D)),A.beginPath(),A.rect(Math.floor(-F/2),Math.floor(-E/2),F,E),A.fill(),A.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:c,offscreen:y,ctx:d}))},w=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});w.play();let O=({x:A,y:k})=>{M.goTo({mouseX:A-f,mouseY:k-h}).catch(()=>{})},N=u.useMouseMove(({client:A})=>{let{x:k,y:D}=A;O({x:k,y:D})}),L=u.useTouchMove(({client:A})=>{let{x:k,y:D}=A;O({x:k,y:D})}),I=()=>{C(),p&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let P=Z.watch("navigationIsOpen",A=>{if(A){w?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(w?.play(),u.useFrame(()=>I()))},500)});return()=>{x.destroy(),w.destroy(),M.destroy(),N(),L(),P(),x=null,w=null,M=null,d=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var s_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=qu({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=qu({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var i_=m.createComponent({tag:"animatedpattern-n1",component:s_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([i_]);var a_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var c_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,{useOffscreen:h,context:f}=ft({disableOffcanvas:t}),d=!0,v=e.getContext(f,{alpha:!0}),{top:y,left:T}=de(e),S=m.getActiveRoute(),{offscreen:_,offScreenCtx:M}=gt({useOffscreen:h,canvas:e}),x=!0;e.width=e.clientWidth,e.height=e.clientHeight;let C=[...Array.from({length:19}).keys()].map((R,$)=>{let B=$>=9.5?9.5+(9.5-$):$,V=s.includes($)?1:B*i;return{width:B*o,height:B*n,x:0,y:0,hasFill:s.includes($),opacity:V,radius:a,rotate:0,relativeIndex:B}}),w=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),O=[...C].map(R=>w.subscribeCache(({rotate:$})=>{R.rotate=$})),N=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...C].forEach(R=>{N.subscribeCache(({x:$,y:B})=>{R.x=$,R.y=B})});let L=()=>{if(!v)return;h&&_&&(_.width=e.width,_.height=e.height);let R=h?M:v;R&&(e.width=e.width,C.forEach(({width:$,height:B,x:V,y:q,rotate:ee,hasFill:ue,opacity:re},ye)=>{let ve=C.length-ye,ge=e.width/2,Ne=e.height/2,Be=1,J=Math.PI/180*ee,Te=Math.cos(J)*Be,Ge=Math.sin(J)*Be;R.setTransform(Te,Ge,-Ge,Te,ge+V+ve*V/20,Ne+q+ve*q/20),x?(R.beginPath(),R.roundRect(Math.round(-$/2),Math.round(-B/2),$,B,130)):(R.beginPath(),R.rect(Math.round(-$/2),Math.round(-B/2),$,B)),ue?R.fillStyle="#000":(R.fillStyle=`rgba(238, 238, 238, ${re})`,R.strokeStyle=`rgba(0, 0, 0, ${re})`,R.stroke()),R.fill(),R.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:h,offscreen:_,ctx:v}))},I=we.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});I.goTo(w,{rotate:360},{duration:p}),I.play();let P=()=>{L(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>P());let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,y=de(e).top,T=de(e).left,L()}),k=({x:R,y:$})=>{let B=window.innerWidth,V=window.innerHeight,q=R-e.width/2-T,ee=$-e.height/2-y;N.goTo({x:le.clamp(q,-B/2+400+T,B/2-400-T),y:le.clamp(ee,-V/2+200+y,V/2-200-y)}).catch(()=>{})},D=u.useMouseMove(({client:R})=>{let{x:$,y:B}=R;k({x:$,y:B})}),F=u.useTouchMove(({client:R})=>{let{x:$,y:B}=R;k({x:$,y:B})}),E=Z.watch("navigationIsOpen",R=>{if(R){d=!1,I?.pause(),w?.pause(),N?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===S.route&&(I?.resume(),w?.resume(),N?.resume(),u.useFrame(()=>P()))},500)});return{destroy:()=>{w.destroy(),N.destroy(),I.destroy(),A(),D(),F(),E(),O.forEach(R=>{R()}),O.length=0,w=null,N=null,I=null,v=null,_=null,M=null,d=!1,C=null,f=null},stopBlackOne:()=>{s.forEach(R=>{O[R]?.()})}}};function OM({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
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
    </li>`}var l_=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=c_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
                    ${OM({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var u_=m.createComponent({tag:"caterpillar-n1",component:l_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([u_]);var p_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var Ju=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},m_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:t.disableOffcanvas}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=!0,M=[...Array.from({length:20}).keys()].map((I,P)=>{let A=P>=10?10+(10-P):P,k=o+o/3*A,D=n+n/3*A,F=s.includes(P)?1:(20-P)*i;return{width:k,height:D,x:0,y:0,hasFill:s.includes(P),opacity:F,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:I,direction:P})=>{Ju({isForced:I,direction:P,value:1})},1).add(({isForced:I,direction:P})=>{Ju({isForced:I,direction:P,value:5})},5).add(({isForced:I,direction:P})=>{Ju({isForced:I,direction:P,value:9})},9);M.forEach(I=>{x.subscribeCache(({x:P,rotate:A})=>{let k=P/p,D=2/(3-Math.cos(2*k)),F=D*Math.cos(k)*a,E=D*Math.sin(2*k)/2*c;I.x=F,I.y=E,I.rotate=A})});let C=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);C.onLoopEnd(({loop:I,direction:P})=>{console.log(`loop end: ${I} , ${P}`)});let w=()=>{if(!v)return;h&&T&&(T.width=e.width,T.height=e.height);let I=h?S:v;I&&(e.width=e.width,M.forEach(({width:P,height:A,x:k,y:D,rotate:F,hasFill:E,opacity:R})=>{let $=e.width/2,B=e.height/2,V=1,q=Math.PI/180*F,ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,$+k,B+D),_?(I.beginPath(),I.roundRect(Math.round(-P/2),Math.round(-A/2),P,A,[40,40])):(I.beginPath(),I.rect(Math.round(-P/2),Math.round(-A/2),P,A)),E?I.fillStyle="#000000":(I.strokeStyle=`rgba(0, 0, 0, ${R})`,I.fillStyle="rgba(238, 238, 238, 0)",I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:h,offscreen:T,ctx:v}))},O=()=>{w(),d&&u.useNextFrame(()=>O())};u.useFrame(()=>O()),C.play();let N=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,w()}),L=Z.watch("navigationIsOpen",I=>{if(I){d=!1,C?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(C?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{d=!1,N(),L(),x.destroy(),x=null,C.destroy(),C=null,v=null,T=null,S=null,M=null,f=null},play:()=>{C.play()},playReverse:()=>{C.playReverse()},playUseCurrent:()=>{C.play({useCurrent:!0})},playReverseUseCurrent:()=>{C.playReverse({useCurrent:!0})},playFromLabel:()=>{C.playFrom("mylabel")},plaFromLabelReverse:()=>{C.playFromReverse("mylabel")},stop:()=>C.stop(),pause:()=>C.pause(),resume:()=>C.resume(),reverse:()=>C.reverse()}};function $M({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var h_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=m_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
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
                        ${$M({buttons:a.buttons})}
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
    `};var LM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},d_=m.createComponent({tag:"caterpillar-n2",component:h_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:LM,type:"Any"})}});m.useComponent([d_]);var f_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var pc=()=>{m.useMethodByName(Gs).update(!0)},mc=()=>{m.useMethodByName(Gs).update(!1)};var g_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,v=U.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:e}),M=h?_:y,x=ho(M);M=null,e.width=e.clientWidth,e.height=e.clientHeight;let C=fo({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,w=l?C.map((k,D)=>({...k,scale:1,rotate:0,hasFill:p.includes(D)})).toSorted(k=>k.hasFill?-1:1):C.map((k,D)=>({...k,scale:1,rotate:0,hasFill:p.includes(D)})),O=U.createStaggers({items:w,stagger:r}),N=O.map(({item:k,start:D,end:F})=>{let E=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:D,end:F,ease:"easeInOutQuad"}),R=E.subscribe(({scale:$})=>{k.scale=$});return v.add(E),{sequencer:E,unsubscribe:R}}),L=()=>{if(!y)return;h&&S&&(S.width=e.width,S.height=e.height);let k=h?_:y;k&&(e.width=e.width,w.forEach(({x:D,y:F,width:E,height:R,rotate:$,scale:B,hasFill:V,offsetXCenter:q,offsetYCenter:ee})=>{let ue=Math.PI/180*$,re=Math.cos(ue)*B,ye=Math.sin(ue)*B;k.setTransform(re,ye,-ye,re,Math.floor(q+D),Math.floor(ee+F)),x?(k.beginPath(),k.roundRect(Math.floor(-E/2),Math.floor(-R/2),E,R,150)):(k.beginPath(),k.rect(Math.floor(-E/2),Math.floor(-R/2),E,R)),V?(k.fillStyle="#000000",k.fill()):(k.strokeStyle="#000",k.fillStyle="rgb(238, 238, 238)",k.fill(),x||(k.strokeStyle="#ccc")),k.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:h,offscreen:S,ctx:y}))},I=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},reverse:!1,ease:!0,easeType:"lerp"});I.init();let P=()=>{L(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let A=Z.watch("navigationIsOpen",k=>{if(k){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>P())},500)});return()=>{A(),N.forEach(({sequencer:k,unsubscribe:D})=>{k.destroy(),D()}),N=[],v.destroy(),v=null,O=[],I.destroy(),I=null,y=null,S=null,_=null,C=[],d=!1,w=null,f=null}};var Yu=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var Xu=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=g_({canvas:t().canvas,canvasScroller:t().canvasScroller,...Yu[e.currentParamsId].params,disableOffcanvas:!0})};function DM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return Yu.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,Xu({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var b_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{pc(),u.useFrame(()=>{u.useNextTick(()=>{Xu({proxi:i,getRef:r})})});let a=u.useResize(()=>{Xu({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},mc(),a()}}),g`
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
                    ${DM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var y_=m.createComponent({tag:"scroller-n0",component:b_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([y_]);var v_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function FM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function BM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var T_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:p,canvas:e}),S=p?T:d,_=ho(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let M=[...Array.from({length:17}).keys()].map((I,P)=>{let A=P>=8.5?8.5+(8.5-P):P;return{width:Math.floor(FM({width:15,relativeIndex:A,amountOfPath:17})),height:Math.floor(BM({height:30,relativeIndex:A,amountOfPath:17})),opacity:A*.09,hasFill:l.has(P),rotate:0,relativeIndex:A,index:P}}),x=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});[...M].forEach(I=>{x.subscribeCache(({rotate:P})=>{I.rotate=P})});let C=()=>{if(!d)return;p&&y&&(y.width=e.width,y.height=e.height);let I=p?T:d;if(!I)return;let P=e.width/2,A=e.height/2;e.width=e.width,M.forEach(({width:k,height:D,opacity:F,rotate:E,index:R,hasFill:$})=>{let B=M.length/2-R,V=1,q=Math.PI/180*(E-33),ee=Math.cos(q)*V,ue=Math.sin(q)*V;I.setTransform(ee,ue,-ue,ee,P,A+B*19),_?(I.beginPath(),I.roundRect(-k/2,-D/2+B*19,k,D,150)):(I.beginPath(),I.rect(Math.round(-k/2),Math.round(-D/2),k,D)),$?I.fillStyle="#000":(I.fillStyle=`rgba(238, 238, 238, ${F})`,I.strokeStyle=`rgba(0, 0, 0, ${F})`,I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),bt({useOffscreen:p,offscreen:y,ctx:d})},w=Je.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>se(t)},ease:!0,easeType:"spring"});w.init();let O=()=>{C(),f&&u.useNextFrame(()=>O())};u.useFrame(()=>{O()});let N=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{C()})}),L=Z.watch("navigationIsOpen",I=>{if(I){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>O())},500)});return()=>{x.destroy(),N(),L(),x.destroy(),x=null,w.destroy(),w=null,d=null,y=null,T=null,x=null,f=!1,M=null,h=null}};function VM({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
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
    </li>`}var __=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};pc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=T_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),mc(),c=null}}),g`
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
                    ${VM({proxi:a,delegateEvents:s,bindObject:i})}
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
    `};var S_=m.createComponent({tag:"scroller-n1",component:__,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([S_]);var x_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var C_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var zn=m.createComponent({tag:"dynamic-list-button",component:C_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var hc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],E_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],w_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],I_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Un=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var WM=[{buttonLabel:"sample1",data:E_},{buttonLabel:"salmple2",data:w_},{buttonLabel:"sample3",data:I_},{buttonLabel:"Initial",data:hc}],jM=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function zM({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return WM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function UM({bindProps:e,staticProps:t,proxi:r}){return jM.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var M_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${zM({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${UM({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function HM({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var k_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>HM({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function GM(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var qM=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${GM(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,R_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{d=d<Un.length-1?d+1:0,f.innerData=Un[d],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>qM({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var P_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var dc=m.createComponent({tag:"dynamic-list-card-inner",component:P_,props:{key:()=>({value:"",type:String})}});var N_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var A_=m.createComponent({tag:"dynamic-list-counter",component:N_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var O_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var $_=m.createComponent({tag:"dynamic-list-empty",component:O_});var L_=m.createComponent({tag:"dynamic-list-card",component:R_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Un[0],type:Array}),innerDataUnivoque:()=>({value:Un[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[A_,$_,dc,zn]});var D_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var F_=m.createComponent({tag:"dynamic-slotted-label",component:D_,props:{label:()=>({value:"",type:String})}});var B_=m.createComponent({tag:"dynamic-list-repeater",component:k_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[L_,F_]});var V_=m.createComponent({tag:"dynamic-list",component:M_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:hc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[zn,B_,dc]});m.useComponent([V_]);var W_=()=>g` <dynamic-list> </dynamic-list> `;var j_=({refs:e})=>{let t=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=we.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var JM=async({playIntro:e,playSvg:t})=>{await e(),t()},z_=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=j_({refs:s});return setTimeout(()=>{JM({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var U_=m.createComponent({tag:"home-component",component:z_,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var go=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),Sv(r)};m.useComponent([U_]);var H_=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>go({svg:e,id:d}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var G_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function YM(e){return Math.floor(Math.random()*e)}var fc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${G_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:YM(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Hn=e=>{m.useMethodByName(e).toggleActive()};var q_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Hn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Hn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var J_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${q_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var Y_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${fc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${J_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var X_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var K_=m.createComponent({tag:"matrioska-item",component:X_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var Q_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Hn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Hn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var Z_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${Q_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var eS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${fc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${Z_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var XM=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},tS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?XM(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[zn,K_]},rS=m.createComponent({tag:"page-matrioska-repeat",component:Y_,...tS}),oS=m.createComponent({tag:"page-matrioska-invalidate",component:eS,...tS});m.useComponent([rS,oS]);var nS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,sS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var Ku=0,KM=({indicators:e,proxi:t})=>[...e].map((r,o)=>Je.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+Ku-Ve(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),iS=({pins:e})=>{e.forEach(t=>t.refresh())},QM=({titles:e})=>[...e].map(t=>Je.createParallax({item:t,propierties:"x",reverse:!0,range:9})),aS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},cS=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},lS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=KM({indicators:e,proxi:n}),a=QM({titles:t}),c=document.querySelector(".l-navcontainer__side");Ku=Ve(c)/2;let l=u.useResize(()=>{Ku=Ve(c)/2}),p=new Vs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{iS({pins:i}),aS({nav:r})},onEnterBack:()=>{iS({pins:i}),aS({nav:r})},onLeave:()=>{cS({nav:r})},onLeaveBack:()=>{cS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var ZM=(e,t)=>e===0?1:e===t-1?-1:0,ek=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},tk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),uS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(le.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=lS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=de(T),_=se(T),M=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),C=2e3,O=1+(l-x)/l*.9,N=x/l*C*O;Pr.to(M+ZM(v,l),{duration:N})}),()=>{d()}}),le.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${tk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${ek({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var pS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var mS=m.createComponent({tag:"horizontal-scroller-button",component:pS,props:{id:()=>({value:-1,type:Number})}});var hS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var dS=m.createComponent({tag:"horizontal-scroller-section",component:hS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var fS=m.createComponent({tag:"horizontal-scroller",component:uS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[mS,dS]});m.useComponent([fS]);var gS=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var bS=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var yS=m.createComponent({tag:"svg-star",component:bS,props:{fill:()=>({value:"#000000",type:String})}});var rk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,vS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${rk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var ok=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",Qu=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${ok({debug:o,id:s.id})}
                ${Qu({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var Zu=({element:e})=>({height:se(e),width:Ve(e),offSetLeft:de(e).left,offSetTop:de(e).top}),TS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),_S=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Gn=()=>{},SS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,v=0,y=0,T=0,S=0,_=!1,M=!1,x={x:0,y:0},C=0,w=Gn,O=Gn,N=Gn,L=Gn,I=Gn,P=Gn,A=[],k=U.createSpring({data:{delta:0,ax:0,ay:0}}),D=()=>{_=!1},F=()=>{let{vw:V,vh:q}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},ee=x.x,ue=x.y,{xgap:re,ygap:ye}=_?M?(M=!1,{xgap:0,ygap:0}):{xgap:ee-v,ygap:ue-T}:{xgap:0,ygap:0};_&&(y+=re,S+=ye);let{xInMotion:ve,yInMotion:ge}=_?{xInMotion:y,yInMotion:S}:{xInMotion:ee,yInMotion:ue},{ax:Ne,ay:Be}=l.centerToViewoport||l.drag?{ax:-(V/2-ve)/l.xDepth,ay:(q/2-ge)/l.yDepth}:{ax:-(V/2-(ve-f))/l.xDepth,ay:(q/2-(ge-d))/l.yDepth};v=ee,T=ue;let J=Ne>l.xLimit||Ne<-l.xLimit,Te=Be>l.yLimit||Be<-l.yLimit;J&&(y-=re),Te&&(S-=ye);let Ge=le.clamp(Ne,-l.xLimit,l.xLimit),ut=le.clamp(Be,-l.yLimit,l.yLimit),_t=Math.sqrt(Math.pow(Math.abs(ut),2)+Math.pow(Math.abs(Ge),2));k.goTo({delta:_t,ax:Ge,ay:ut}).catch(()=>{}),A.forEach(Xe=>{Xe({delta:_t,factor:l.factor})})},E=V=>{C!==V&&(x.y-=C,C=V,x.y+=C),F()},R=({page:V})=>V.y>d&&V.y<d+p&&V.x>f&&V.x<f+h,$=({page:V})=>{R({page:V})&&(_=!0,M=!0)},B=()=>{P(),P=l.useScroll?u.useScroll(({scrollY:V})=>{E(V)}):()=>{}};return e(({element:V})=>{let{container:q}=r();l.afterInit(V);let ee=k.subscribe(({delta:ve,ax:ge,ay:Ne})=>{q.style.transform=`translate3D(0,0,0) rotateY(${ge}deg) rotateX(${Ne}deg)`,"onUpdate"in l&&l.onUpdate({delta:ve,deltaX:ge,deltaY:Ne})}),ue=k.onComplete(({ax:ve,ay:ge})=>{q.style.transform=`rotateY(${ve}deg) rotateX(${ge}deg)`}),re=u.useMouseMove(({page:ve})=>{x={x:ve.x,y:ve.y},F()}),ye=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Zu({element:V}))});return o(()=>l.drag,ve=>{if(I(),L(),N(),O(),w(),ve){y=window.innerWidth/2,S=window.innerHeight/2,w=u.useTouchStart(({page:ge})=>{$({page:ge})}),O=u.useTouchEnd(()=>{D()}),N=u.useMouseDown(({page:ge})=>{$({page:ge})}),L=u.useMouseUp(()=>{D()}),I=u.useTouchMove(({page:ge})=>{x={x:ge.x,y:ge.y},F()});return}},{immediate:!0}),o(()=>l.useScroll,(ve,ge)=>{if(ve){B();return}ve!==ge&&P()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Zu({element:V})),x={x:window.innerWidth/2,y:window.innerHeight/2},F()}),()=>{ee(),ue(),ye(),re(),P(),w(),O(),N(),L(),I(),k.destroy(),A=[],k=null,p=null,h=null,f=null,d=null,v=null,y=null,T=null,S=null,_=null,M=null,x=null,C=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{A=TS({childrenId:c})},render:()=>Qu({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var ep=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),xS=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var nk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,sk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=ep(l),h=ep(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:v}=xS(f);a.goTo({depth:c,rotateX:d,rotateY:v}).catch(()=>{})},CS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:v,classList:y,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,M=`--item-height:${l};`,x=`--offset-x:${p};`,C=`--offset-y:${h};`,w=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:O,factor:N})=>{s&&sk({delta:O,factor:N,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:w})}),r(({element:O})=>{let N=w.subscribe(({depth:P,rotateX:A,rotateY:k})=>{let D=P+v;O.style.transform=`translate3D(0,0,${D}px) rotateX(${A}deg) rotateY(${k}deg)`}),L=w.onComplete(({depth:P,rotateX:A,rotateY:k})=>{let D=P+v;O.style.transform=`translateZ(${D}px) rotateX(${A}deg) rotateY(${k}deg)`}),I=v;return O.style.transform=`translateZ(${I}px)`,()=>{N(),L(),w.destroy(),w=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${M}${x}${C}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${nk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var ES=m.createComponent({tag:"move-3d-item",component:CS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var qn=m.createComponent({tag:"move-3d",component:SS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[ES]});var wS=m.createComponent({tag:"move-3d-page",component:vS,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[qn]});m.useComponent([wS,yS]);var IS=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e,{data:n}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${n}</div>
        <move-3d-page
            ${m.staticProps({data:t})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:z}=_S({ratio:1980}),MS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var kS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:MS}};var RS=({getState:e})=>{let{content:t}=e();return g`${t}`};var Jn=m.createComponent({tag:"any-component",component:RS,props:{content:()=>({value:"",type:String})}});var PS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,v=d-n,y=f-s;if(Math.hypot(y,v)>10){n=d,s=f;let _=Math.atan2(v,y)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var ik=5,NS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=Vn(),n=[...Array.from({length:ik}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=PS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var gc=m.createComponent({tag:"mouse-trail",component:NS});var AS=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([qn,Jn,gc]);var OS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,v,y,T,S,_,M,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(C=>go({svg:e,id:C}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:AS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:M,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var $S=()=>le.mq("min","desktop"),LS="#home",tp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(tp=m.getActiveParams(),LS=e)});var DS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=$S(),e(()=>{let s=u.useResize(()=>{n.active=$S()});return o(()=>n.active,i=>{i&&m.loadUrl({url:LS,params:tp??{}})}),()=>{s(),tp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var FS=m.createComponent({tag:"only-desktop-cta",component:DS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([FS]);var BS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var rp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:e}),l=r?c:s,p=ho(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,v=window.innerHeight/20,T=fo({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:v,gutter:1}).items,S=T.map(F=>({...F,scale:1,rotate:0})),_=({row:F,col:E})=>{let R=(f+1)*F;return S[R+E]},x={..._({row:1,col:1}),scale:1,rotate:0},w={..._({row:4,col:5}),scale:1,rotate:0},O=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),N=U.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),L=U.createSpring({data:w});S.forEach(F=>{O.subscribeCache(({scale:E,rotate:R})=>{F.rotate=R,F.scale=E})}),N.subscribe(F=>{x=F}),L.subscribe(F=>{w=F});let I=we.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});I.goTo(O,{scale:.2,rotate:90},{duration:1e3});let P=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});P.goTo(N,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(N,{y:_({row:8,col:8}).y,rotate:180}).goTo(L,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(N,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo(L,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(N,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(L,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let A=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let F=r?c:s;if(F){e.width=e.width,S.forEach(({x:E,y:R,width:$,height:B,rotate:V,scale:q,offsetXCenter:ee,offsetYCenter:ue},re)=>{if(re===40){let Ne=Math.PI/180*x.rotate,Be=Math.cos(Ne)*x.scale,J=Math.sin(Ne)*x.scale;F.setTransform(Be,J,-J,Be,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(F.beginPath(),F.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(F.beginPath(),F.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),F.fillStyle="#000000",F.fill()}let ye=Math.PI/180*V,ve=Math.cos(ye)*q,ge=Math.sin(ye)*q;F.setTransform(ve,ge,-ge,ve,Math.floor(ee+E),Math.floor(ue+R)),p?(F.beginPath(),F.roundRect(Math.floor(-$/2),Math.floor(-B/2),$,B,150)):(F.beginPath(),F.rect(Math.floor(-$/2),Math.floor(-B/2),$,B)),F.fillStyle="rgba(238, 238, 238, 0.9)",F.fill()});{let E=Math.PI/180*w.rotate,R=Math.cos(E)*w.scale,$=Math.sin(E)*w.scale;F.setTransform(R,$,-$,R,Math.floor(w.offsetXCenter+w.x),Math.floor(w.offsetYCenter+w.y)),p?(F.beginPath(),F.roundRect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height),150)):(F.beginPath(),F.rect(Math.floor(-w.width/2),Math.floor(-w.height/2),Math.floor(w.width),Math.floor(w.height))),F.fillStyle="#a86464",F.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},k=()=>{A(),n&&u.useNextFrame(()=>k())};u.useFrame(()=>{k()});let D=Z.watch("navigationIsOpen",u.useDebounce(F=>{if(F){P.pause(),I.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(P.resume(),I.resume(),n=!0,u.useFrame(()=>k()))},200)},200));return{destroy:()=>{D(),s=null,a=null,c=null,T=[],n=!1,O?.destroy?.(),N?.destroy?.(),L?.destroy?.(),P?.destroy?.(),I?.destroy?.(),S=null,x=null,w=null,o=null,O=null,N=null,L=null,P=null,I=null},play:()=>{P.play(),I.isActive()||I.play()},playReverse:()=>{P.playReverse(),I.isActive()||I.play()},playFromLabel:()=>{P.setTween("my-label",[N,L]).then(()=>{P.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},playFromLabelReverse:()=>{P.setTween("my-label",[N,L]).then(()=>{P.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),I.isActive()||I.play()},revertNext:()=>{P.reverseNext()},pause:()=>{P.pause(),I.pause()},resume:()=>{P.resume(),I.resume()},stop:()=>{P.stop(),I.stop()}}};function ak({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var VS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=rp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=rp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
                        ${ak({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var ck={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},WS=m.createComponent({tag:"async-timeline",component:VS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:ck,type:"Any"})}});m.useComponent([WS]);var jS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var zS=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([qn,Jn,gc]);var US=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>go({svg:e,id:v}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:zS({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var HS=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Je.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new Tt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var GS=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=HS({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var qS=m.createComponent({tag:"mobbu-2025",component:GS,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([qS]);var JS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>go({svg:e,id:n}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${pa({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var YS="TOP-LEFT",XS="TOP-RIGHT",KS="BOTTOM-LEFT",QS="BOTTOM-RIGHT",ZS="CENTER";var lk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},ex=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],v=d.map(J=>{let Te=window.innerWidth,Ge=window.innerHeight,ut=J.offsetWidth,_t=J.offsetHeight,Xe=lk(J),Zn=s-s*ut/(Te*h)-Xe,$r=s-s*_t/(Ge*h)-Xe;return Math.min(Zn,$r)}),y=()=>{d.forEach((J,Te)=>{let Ge=_>v[Te];J.classList.toggle("hide",Ge)})},T=0,S=0,_=0,M=0,x=0,C=r.offsetWidth,w=r.offsetHeight,O=t.offsetWidth,N=t.offsetHeight,L=(C-O)/2,I=(w-N)/2,P={x:0,y:0},A=!1,k=!1,D=30,F=()=>{if(i&&s>0){let J=s/(s-_);L=(C-O/J)/2,I=(w-N/J)/2}else L=(C-O)/2,I=(w-N)/2};F();let E={xValue:0,yValue:0},R=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case YS:{E={xValue:L,yValue:I},S=C,T=w;break}case XS:{E={xValue:-L,yValue:I},S=-C,T=w;break}case KS:{E={xValue:L,yValue:-I},S=C,T=-w;break}case QS:{E={xValue:-L,yValue:-I},S=-C,T=-w;break}}let $=R.subscribe(({x:J,y:Te,z:Ge})=>{r&&(r.style.transform=`translate3D(${J}px, ${Te}px, ${Ge}px)`)});R.set({x:E.xValue,y:E.yValue}),[...t.querySelectorAll("a, button")].forEach(J=>{J.setAttribute("draggable","false"),J.style.userSelect="none"});let V=({page:J})=>{A=!0,k=!0,P={x:J.x,y:J.y}},q=({page:J})=>{let{x:Te,y:Ge}=J,{xgap:ut,ygap:_t}=A?k?(k=!1,{xgap:0,ygap:0}):{xgap:Te-M,ygap:Ge-x}:{xgap:0,ygap:0},Xe=L>0?le.clamp(S+ut,-L,L):le.clamp(S+ut,L,-L),Zn=I>0?le.clamp(T+_t,-I,I):le.clamp(T+_t,I,-I),$r=A?Xe:S,X=A?Zn:T,{xComputed:es,yComputed:Ue}=A?{xComputed:$r,yComputed:X}:{xComputed:Te,yComputed:Ge};S=$r,T=X,M=Te,x=Ge,A&&(E={xValue:es,yValue:Ue},R.goTo({x:es,y:Ue}).catch(()=>{}))},ee=u.useTouchStart(({page:J,target:Te})=>{V({page:J,target:Te})}),ue=u.useMouseDown(({page:J,target:Te})=>{V({page:J,target:Te})}),re=u.useTouchEnd(()=>{A=!1}),ye=u.useMouseUp(()=>{A=!1}),ve=u.useMouseMove(({page:J})=>{q({page:J})}),ge=u.useTouchMove(({page:J})=>{q({page:J})});f&&f.addEventListener("click",J=>{let{x:Te,y:Ge}=P,ut=Math.abs(M-Te)>D,_t=Math.abs(x-Ge)>D;(ut||_t)&&J.preventDefault()},!1),i&&f&&f.addEventListener("wheel",J=>{let{spinY:Te}=u.normalizeWheel(J);_=le.clamp(_+Te*p,a,c),F(),S=L>0?le.clamp(S,-L,L):le.clamp(S,L,-L),T=I>0?le.clamp(T,-I,I):le.clamp(T,I,-I),l({depth:_}),R.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Ne=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Be=u.useResize(()=>{C=r.offsetWidth,w=r.offsetHeight,O=t.offsetWidth,N=t.offsetHeight,F()});return{destroy:()=>{$(),ee(),re(),ue(),ye(),ve(),ge(),Be(),Ne(),R.destroy(),R=null,f=null,d=null,t=null,r=null}}};var tx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=ex({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var rx=m.createComponent({tag:"c-dragger",component:tx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:ZS,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([rx,Jn]);var ox=!1,nx=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{ox&&console.log(n)},onDepthChange:({depth:n})=>{ox&&console.log(n)}})}
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
    </div>`};var sx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(se(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>se(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let S=y.firstChild;h.subscribeCache(({angleInRadian:_,scale:M})=>{let x=a+c*_,C=x*Math.cos(_),w=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${C-p[T]}px, ${w-p[T]}px)`,S&&(S.style.scale=`${M}`)})});let f=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let M=i/S*_,x=a+c*M,C=y+x*Math.cos(M),w=T+x*Math.sin(M);_===0?o.moveTo(C,w):o.lineTo(C,w)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),v(),o=null,h=null,f=null,e=null}}};var ix=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=se(t)/2-100,a=e.map(d=>se(d)/2);e.forEach((d,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var ax=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>se(d)/2),s=Ve(t)/2-100,i=se(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,v)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,M=2/(3-Math.cos(2*_)),x=M*Math.cos(_)*s,C=M*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${C-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),M=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+M,v+x):o.lineTo(d+M,v+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function uk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var cx=(e,t)=>t===0?e:cx(t,e%t);function pk(e,t){let r=cx(e,t),o=t/r;return 2*Math.PI*o}var lx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(se(t)-100)/2,p=n/s,h=pk(n,s),f=uk(l,p,h),d=i*(f/l),v=e.map(O=>se(O)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let M=0;T.forEach(O=>{let N=O/h*10,L=Math.abs((N-M)/2);M=N;let I=Math.max(0,N-L),P=N,A=Math.min(10,N+L);A>I&&(y.goTo({scale:0},{start:I,end:P,ease:"easeInQuad"}),y.goTo({scale:1},{start:P,end:A,ease:"easeOutQuad"}))}),e.forEach((O,N)=>{let L=O.firstChild;y.subscribeCache(({angleInRadian:I,scale:P})=>{let A=l*Math.cos(p*I),k=A*Math.cos(I),D=A*Math.sin(I);O.style.transform=`translate3D(0px,0px,0px) translate(${k-v[N]}px, ${D-v[N]}px)`,L&&(L.style.scale=`${P}`)})});let x=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function C(){if(!c||!r)return;let O=r.width/2,N=r.height/2,L=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let I=0;I<=L;I++){let P=h/L*I,A=l*Math.cos(p*P),k=O+A*Math.cos(P),D=N+A*Math.sin(P);I===0?c.moveTo(k,D):c.lineTo(k,D)}c.stroke()}let w=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,C()});return C(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),w(),c=null,y=null,x=null,e=null}}};var ux=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Ve(t)-200,s=se(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>se(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:M,scale:x})=>{let C=Math.sign(M-T)||1,w=Math.sin(M/a)*s*C;v.style.transform=`translate3D(0px,0px,0px) translate(${M+_}px, ${w-l[y]}px)`,S&&(S.style.scale=`${x}`),T=M})});let h=we.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:M,y:x}=(()=>{if(_<=T){let C=_/T*n,w=Math.sin(C/a)*s;return{x:C,y:w}}if(_>T){let w=(S-_)/T*n,O=Math.sin(w/a)*s*-1;return{x:w,y:O}}return{x:0,y:0}})();_===0?o.moveTo(v+M-n/2,y+x):o.lineTo(v+M-n/2,y+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var op={sin:ux,circle:ix,infinite:ax,archimede:sx,rosaDiGrandi:lx};var px=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var mx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=px(),{destroy:f,play:d,stop:v,resume:y}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:v,resume:y}=op[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let M=u.useResize(()=>{v(),f(),{destroy:f,play:d,stop:v,resume:y}=op[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),M(),f=null,d=null,v=null,y=null}}),g`<div class="c-math">
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
    </div>`};var bc=m.createComponent({tag:"math-animation",component:mx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([bc]);var hx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var mk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,dx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${mk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var fx=m.createComponent({tag:"rosa-di-grandi-page",component:dx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[bc]});m.useComponent([fx]);var gx=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var sp="home",vc="about",K="template-mobJs-component",Pe="template-doc-default",Yn="template-listing",lt="template-animation",yt="template-test",Tc=new Set([K,Pe]),ie=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Ye=[{url:"./#mobJs-overview",title:"mobJs"}],np=[{url:"./#mobCore-overview",title:"mobCore"}],Or=[{url:"./#mobMotion-overview",title:"mobMotion"}],yc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],Y=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],ur=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],_c=[{hash:"pageNotFound",layout:Iv,props:{}},{hash:"onlyDesktop",layout:BS,props:{}},{hash:"about",layout:LT,templateName:vc,props:{}},{hash:"canvas-overview",layout:ja,templateName:Yn,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:n_,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:a_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:p_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:f_,templateName:lt,props:{}},{hash:"async-timeline",layout:jS,templateName:lt,props:{}},{hash:"scrollerN0",layout:v_,templateName:lt,props:{}},{hash:"scrollerN1",layout:x_,templateName:lt,props:{}},{hash:"dynamic-list",layout:W_,templateName:yt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Ye,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:nS,templateName:yt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:sS,templateName:yt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Ye,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:H_,templateName:sp,props:{}},{hash:"mobCore-overview",layout:Le,skipTransition:!0,templateName:Pe,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:yc}},{hash:"mobCore-defaults",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:np,section:"mobCore",rightSidebar:yc}},{hash:"mobCore-events",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:np,section:"mobCore",rightSidebar:yc}},{hash:"mobCore-store",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:np,section:"mobCore",rightSidebar:yc}},{hash:"mobJs-overview",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:Y}},{hash:"mobJs-initialization",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-component",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-routing",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-benchmark-invalidate",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Ye,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Ar,templateName:yt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Ye,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-utils",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-memory-management",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-debug",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Ye,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-onMount",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateState",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getProxi",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watch",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-staticProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-dataAttribute",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindProps",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-delegateEvents",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindtext",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindObject",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bind-effect",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-methods",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-setStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-updateStateByName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-refs",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-runtime",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-repeat",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-web-component",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-slot",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unBind",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emit",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-emitAsync",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-computed",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-bindStore",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-removeDom",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-remove",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getChildren",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-freezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-unFreezeProp",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-getParentId",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-watchParent",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-instanceName",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobJs-class-list",templateName:K,layout:ne,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:ie,section:"mobJs",rightSidebar:Y}},{hash:"mobMotion-stagger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-defaults",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-overview",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-parallax",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-sequencer",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-scrolltrigger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-sync-timeline",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-create-stagger",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-async-timeline",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"mobMotion-tween-spring-lerp",layout:Le,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Or,section:"mobMotion",rightSidebar:ur}},{hash:"horizontalScroller",layout:gS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:IS,props:kS.shape1},{hash:"plugin-dragger",layout:nx,templateName:lt,props:{}},{hash:"math-animation-01",layout:hx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:gx,templateName:lt,props:{}},{hash:"plugin-overview",layout:ja,templateName:Yn,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:ja,templateName:Yn,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:OS,templateName:lt,props:{}},{hash:"mob-02",layout:JS,templateName:lt,props:{}},{hash:"rdp-01",layout:US,templateName:lt,props:{}}];var bx=0;m.beforeRouteChange(()=>{bx=window.scrollY});var hk=new Set([K,Pe,Yn,vc,yt]),dk=new Set([K,Pe,Yn,vc,sp,yt]),yx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=hk.has(t)?"var(--header-height)":"0",e.style.left=dk.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${bx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},vx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=we.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Tx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},_x=()=>{Tx(),u.useResize(()=>{Tx()})};var Xn="reset",pr="tree",ti="filter_component";var mr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new Tt({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=se(t),s=se(e),i=Ve(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var Kn=u.createStore({currentId:()=>({value:"",type:String})});var Sx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",xx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),fk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),gk=e=>e?e.map(t=>`${t}, `).join(""):"",Cx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),bk=({getState:e})=>{let{id:t}=e();if(t===Xn)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Sx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${xx(r.methods)}</div>
        <div><strong>refs:</strong>: ${xx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${fk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Sx(r?.repeaterInnerWrap?.classList)}
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
            ${gk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Cx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Cx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},yk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=mr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Ex=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,Kn.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:v}=yk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>bk({getState:r})})}
        </div>
    </div>`};var wx=m.createComponent({tag:"debug-component",component:Ex,state:{id:()=>({value:Xn,type:String,skipEqual:!1})}});var Ix=e=>{m.useMethodByName(Xa)?.refreshList?.({testString:e})};var ip=async(e="")=>{await m.tick(),Ix(e)},Mx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(ip(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;ip(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;ip(s)}})}
        >
            find
        </button>
    </div>`);var kx=m.createComponent({tag:"debug-filter-head",component:Mx});var vk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=mr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Rx=e=>`~${e}`,Tk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Rx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Rx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Px=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Tk({testString:y}),await m.tick(),d?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:v}=await vk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},v=()=>{},f=()=>{}}}),g`
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
    `};var hr=e=>{m.useMethodByName(Us)?.updateId(e)},Nx=()=>{m.useMethodByName(Us)?.refreshId()};var Ax=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
    `};var Ox=m.createComponent({tag:"debug-filter-list-item",component:Ax,bindStore:Kn,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var $x=m.createComponent({tag:"debug-filter-list",component:Px,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Ox]});var Lx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Dx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",hr(Xn)}})}
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
                    ${r({click:()=>{Nx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Fx=m.createComponent({tag:"debug-search",component:Dx});var Bx=m.createComponent({tag:"debug-head",component:Lx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Fx]});var Sc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",gn),console.log("currentListValueMap",ds),console.log("activeRepeatMap",vn),console.log("onMountCallbackMap",gs),console.log("staticPropsMap",Tn),console.log("dynamicPropsMap",vt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Gr.size),console.log("invalidateIdsMap",Ze),console.log("invalidateInstancesMap",be),console.log("repeatIdHostMap",jr),console.log("repeatIdsMap",et),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",Yh()),console.log("slotPlaceholderSize",Bi()),console.log("bindTextPlaceholderMapSize",Pd()),console.log("instanceMap",zr)};var Vx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=pr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=pr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=pr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{Sc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===pr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===ti&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=pr}})}
                            ${n({toggleClass:{active:()=>a.listType===pr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=ti}})}
                            ${n({toggleClass:{active:()=>a.listType===ti}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===pr&&a.active?g`
                                    <debug-tree
                                        name="${Qa}"
                                    ></debug-tree>
                                `:a.listType===ti&&a.active?g`
                                    <debug-filter-list
                                        name="${Xa}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${Us}"></debug-component>
            </div>
        </div>
    </div>`};var xc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var _k=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=mr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Wx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await _k({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>xc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var jx=()=>{m.useMethodByName(Qa)?.refresh()};var Sk=e=>e>0?`( ${e} ) `:"",zx=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>zx({id:i,value:t}))},Ux=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>zx({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=Nr.subscribe(h);return Nr.reset(h),s(()=>l.isOpen,async d=>{await Nr[d?"down":"up"](h),jx()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Sk(l.children.length)}</span>
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
            ${xc({data:l.children,staticProps:t})}
        </div>
    </div>`};var Hx=m.createComponent({tag:"debug-tree-item",component:Ux,bindStore:Kn,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var Gx=m.createComponent({tag:"debug-tree",component:Wx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[Hx]});var qx=m.createComponent({tag:"debug-overlay",component:Vx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:pr,type:String})},child:[Gx,wx,Bx,kx,$x]});var ap=()=>{},Cc=()=>{},Ec=()=>{},wc=()=>{},xk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),Jx=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=lr(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),v=!1;d.addEventListener("input",()=>{Ec?.(d.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){wc();return}({init:ap,destroy:Cc,move:Ec,updateScroller:wc}=mr({screen:h,scroller:f,scrollbar:d})),v=!0,ap(),wc(),Ec(0)}_.length===0&&(l.hide=!0,Cc?.(),v=!1)});return()=>{Cc?.(),y(),ap=()=>{},Cc=()=>{},Ec=()=>{},wc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>xk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var Yx=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var Xx=m.createComponent({tag:"links-mobjs-button",component:Yx,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Kx=m.createComponent({tag:"links-mobjs",component:Jx,child:[Xx],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var Qx=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,v=null}}),g`<div
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
    </div>`};var Zx=m.createComponent({tag:"quick-nav",component:Qx,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Ck=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),e0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Tc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Ck({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var t0=m.createComponent({tag:"right-sidebar",component:e0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var r0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var o0=m.createComponent({tag:"route-loader",component:r0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var n0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var s0=m.createComponent({tag:"scroll-down-label",component:n0,state:{active:()=>({value:!1,type:Boolean})}});var i0=()=>{m.useMethodByName(jo)?.setInputFocus()},cp=e=>{m.useMethodByName(jo)?.updateCurrentSearchFromSuggestion(e)},a0=e=>{m.useMethodByName(jo)?.shouldCloseSuggestion(e)},Ic=()=>{m.useMethodByName(jo)?.closeSuggestion()};var c0=({proxi:e})=>{e.active=!1,Ic()},Ek=({target:e})=>{e&&a0(e)},l0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{c0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{c0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Ek({target:a.target})}})}
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
                    name="${Ys}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var u0=e=>{m.useMethodByName(Ys)?.update(e)},p0=()=>{m.useMethodByName(Ys)?.reset()};var wk=async({currentSearch:e})=>{u0(e)},lp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;wk({currentSearch:r})},m0=({getRef:e,proxi:t})=>{p0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},h0=e=>`~${e}`,Ik=({currentSearch:e,proxi:t})=>{let o=lr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${h0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${h0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},d0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),lp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Ik({currentSearch:h,proxi:l})},60)})}
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
            ${e({click:()=>{lp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&lp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{m0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&m0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var f0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var Mk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){cp(t);return}if(e.toLowerCase()==="escape"){Ic();return}},g0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{cp(o.word)},keydown:n=>{n.preventDefault(),Mk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var b0=m.createComponent({tag:"search-overlay-suggestion-item",component:g0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var y0=m.createComponent({tag:"search-overlay-suggestion",component:f0,props:{list:()=>({value:[],type:Array})},child:[b0]});var v0=m.createComponent({tag:"search-overlay-header",component:d0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[y0]});var kk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Rk=new Set(["mob-title","mob-paragraph","mob-list"]),Pk=new Set(["mob-title","mob-paragraph"]),Nk=new Set(["mob-list"]),T0=async({currentSearch:e=""})=>{let t=_c.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:kk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>Rk.has(y)).flatMap(y=>Pk.has(y?.component)?y.content:Nk.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var Ak=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=mr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},_0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await T0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:v,refresh:y}=Ak({getRef:o});return h=v,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Mc=()=>{m.useMethodByName(ec)?.toggle()};var Ok=({uri:e})=>{m.loadUrl({url:e}),Mc()},S0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Ok({uri:n.uri})}})}
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
    `};var x0=m.createComponent({tag:"search-overlay-list-item",component:S0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var C0=m.createComponent({tag:"search-overlay-list",component:_0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[x0]});var E0=m.createComponent({tag:"search-overlay",component:l0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[v0,C0]});var w0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var I0=m.createComponent({tag:"test-scss-grid",component:w0});var bo=()=>{let{templateName:e}=m.getActiveRoute();return Tc.has(e)?0:40};var M0=()=>{m.useMethodByName(Ka)?.toggle()};var $k=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Lk=()=>g`
        <ul class="l-footer__bio">
            ${$k.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,k0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Lk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{M0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Sc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var R0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var P0=m.createComponent({tag:"debug-button",component:R0});var N0=m.createComponent({tag:"mob-footer",component:k0,child:[P0],state:{isMounted:()=>({value:!1,type:Boolean})}});var kc=()=>{m.useMethodByName(Js)?.scrollTop()},Rc=()=>{m.useMethodByName(Js)?.refresh()};var Qn=({fireCallback:e=!0}={})=>{m.useMethodByName(Za)?.closeAllAccordion({fireCallback:e})};function Dk(){m.loadUrl({url:"home"}),Qn(),Z.set("navigationIsOpen",!1),kc()}var A0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>se(i)),u.useFrameIndex(()=>{s.isMounted=!0},bo())}),g`
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
                        ${e({click:()=>{Dk()}})}
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
    `};var O0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
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
    `};var $0=m.createComponent({tag:"mob-header-toggle",component:O0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var Fk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function Bk({delegateEvents:e}){let t=lr().header,{links:r}=t,o={github:Vn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{Fk({event:c})}})}
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
            </li>`}).join("")}var L0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Bk({delegateEvents:e})}
        </ul>
    `;var Vk=()=>{Mc(),i0()},D0=({delegateEvents:e})=>{let t=Vn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{Vk()}})}
    >
        ${t}
    </button>`};var F0=m.createComponent({tag:"search-cta",component:D0});var B0=m.createComponent({tag:"mob-header-utils",component:L0,child:[F0]});var Wk=({delegateEvents:e,staticProps:t})=>lr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),V0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${Wk({delegateEvents:e,staticProps:t})}
        </ul>
    `};var W0=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var j0=m.createComponent({tag:"header-main-menu-button",component:W0,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var z0=m.createComponent({tag:"header-main-menu",component:V0,child:[j0],state:{isMounted:()=>({value:!1,type:Boolean})}});var U0=m.createComponent({tag:"mob-header",component:A0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[z0,B0,$0]});var up=0,H0=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new Tt({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(up=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${up})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=se(r),h=se(c),f=se(l),v=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(v)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${up})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function jk({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function zk({main:e,proxi:t}){Rc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function Uk({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),Ut()})}var Hk=()=>{kc(),Qn();let{navigationIsOpen:e}=Z.get();e||Pr.to(0)},G0=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){zk({main:a,proxi:s});return}jk({main:a,proxi:s})}),Uk({main:a});let{scrollNativationToTop:c,refreshScroller:l}=H0({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},bo()),()=>{}}),g`
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
                    ${r({click:()=>{Hk()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${Za}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function Gk({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:v}=n;return p?g`
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
                  `}).join("")}var q0=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=lr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${Gk({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var J0=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var Y0=m.createComponent({tag:"mob-navigation-label",component:J0,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function qk({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var X0=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return Nr.subscribe(h),Nr.reset(h),o(()=>a.isOpen,async f=>{await Nr[f?"down":"up"](h),Rc(),!f&&Qn({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${qk({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var K0=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===y&&S,M=f.includes(d);o.isCurrent=_||M,_&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Pc=m.createComponent({tag:"mob-navigation-button",component:K0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var Q0=m.createComponent({tag:"mob-navigation-submenu",component:X0,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Pc]});var Z0=m.createComponent({tag:"mob-navigation",component:q0,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[Y0,Q0,Pc]});var eC=m.createComponent({tag:"mob-navigation-container",component:G0,child:[Z0],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([U0,eC,N0,Zx,o0,s0,Kx,qx,I0,E0,t0]);var tC=async()=>g`
        ${""}
        <debug-overlay name="${Ka}"></debug-overlay>
        <mob-header name="${lT}"></mob-header>
        <mob-navigation-container
            name="${Js}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${Hs}"></quick-nav>
        <route-loader name="${rc}"></route-loader>
        <scroll-down-label name="${Gs}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${tc}"></right-sidebar>
        <search-overlay name="${ec}"></search-overlay>
    `;var pp=0,mp=document.querySelector(".js-main-loader-track"),rC=(e=60)=>{let t=()=>{if(pp++,!mp)return;let r=100*pp/e;if(mp.style.transform=`scaleX(${r/100})`,pp>=e){mp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var oC=e=>{m.useMethodByName(rc).skip(e)};var nC=60,sC=()=>le.mq("max","desktop"),Jk=()=>{u.useResize(()=>{sC()&&m.loadUrl({url:"onlyDesktop"})})},Ac=document.body.querySelector(".js-main-loader"),Oc=document.body.querySelector(".js-main-loader-background"),Nc=U.createTimeTween({data:{opacity:1},duration:1e3});Ac&&Oc&&[Ac,Oc].forEach(e=>{Nc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var Yk=async()=>{await Ev(),await wv(),rC(nC),await u.useFps({duration:nC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:tC,routes:_c,index:"home",pageNotFound:"pageNotFound",beforePageTransition:yx,pageTransition:vx,afterInit:async()=>{await Nc.goTo({opacity:0}),Nc.destroy(),Nc=null,Ac?.remove(),Oc?.remove(),Ac=null,Oc=null,_x(),Jk(),oC(!1)},redirect:({route:e})=>sC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{_v(),le.setDefault({deferredNextTick:!0}),Yk(),Tv()});})();
//# sourceMappingURL=main.js.map
