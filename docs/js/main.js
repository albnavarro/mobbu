"use strict";(()=>{var EC=Object.create;var Hc=Object.defineProperty;var wC=Object.getOwnPropertyDescriptor;var IC=Object.getOwnPropertyNames;var MC=Object.getPrototypeOf,kC=Object.prototype.hasOwnProperty;var RC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),So=(e,t)=>{for(var r in t)Hc(e,r,{get:t[r],enumerable:!0})},NC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of IC(t))!kC.call(e,n)&&n!==r&&Hc(e,n,{get:()=>t[n],enumerable:!(o=wC(t,n))||o.enumerable});return e};var PC=(e,t,r)=>(r=e!=null?EC(MC(e)):{},NC(t||!e||!e.__esModule?Hc(r,"default",{value:e,enumerable:!0}):r,e));var tT=RC((EJ,eT)=>{function jv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&jv(r)}),e}var ec=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function zv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function bo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var FI="</span>",Lv=e=>!!e.scope,BI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},ju=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=zv(t)}openNode(t){if(!Lv(t))return;let r=BI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Lv(t)&&(this.buffer+=FI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Dv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},zu=class e{constructor(){this.rootNode=Dv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Dv({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Hu=class extends zu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new ju(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Ys(e){return e?typeof e=="string"?e:e.source:null}function Hv(e){return Ho("(?=",e,")")}function VI(e){return Ho("(?:",e,")*")}function WI(e){return Ho("(?:",e,")?")}function Ho(...e){return e.map(r=>Ys(r)).join("")}function jI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Gu(...e){return"("+(jI(e).capture?"":"?:")+e.map(o=>Ys(o)).join("|")+")"}function Uv(e){return new RegExp(e.toString()+"|").exec("").length-1}function zI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var HI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Ys(o),i="";for(;s.length>0;){let a=HI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var UI=/\b\B/,Gv="[a-zA-Z]\\w*",Ju="[a-zA-Z_]\\w*",qv="\\b\\d+(\\.\\d+)?",Jv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Yv="\\b(0b[01]+)",GI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",qI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Ho(t,/.*\b/,e.binary,/\b.*/)),bo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Xs={begin:"\\\\[\\s\\S]",relevance:0},JI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Xs]},YI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Xs]},XI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},rc=function(e,t,r={}){let o=bo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Gu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Ho(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},KI=rc("//","$"),QI=rc("/\\*","\\*/"),ZI=rc("#","$"),eM={scope:"number",begin:qv,relevance:0},tM={scope:"number",begin:Jv,relevance:0},rM={scope:"number",begin:Yv,relevance:0},oM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Xs,{begin:/\[/,end:/\]/,relevance:0,contains:[Xs]}]},nM={scope:"title",begin:Gv,relevance:0},sM={scope:"title",begin:Ju,relevance:0},iM={begin:"\\.\\s*"+Ju,relevance:0},aM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Za=Object.freeze({__proto__:null,APOS_STRING_MODE:JI,BACKSLASH_ESCAPE:Xs,BINARY_NUMBER_MODE:rM,BINARY_NUMBER_RE:Yv,COMMENT:rc,C_BLOCK_COMMENT_MODE:QI,C_LINE_COMMENT_MODE:KI,C_NUMBER_MODE:tM,C_NUMBER_RE:Jv,END_SAME_AS_BEGIN:aM,HASH_COMMENT_MODE:ZI,IDENT_RE:Gv,MATCH_NOTHING_RE:UI,METHOD_GUARD:iM,NUMBER_MODE:eM,NUMBER_RE:qv,PHRASAL_WORDS_MODE:XI,QUOTE_STRING_MODE:YI,REGEXP_MODE:oM,RE_STARTERS_RE:GI,SHEBANG:qI,TITLE_MODE:nM,UNDERSCORE_IDENT_RE:Ju,UNDERSCORE_TITLE_MODE:sM});function cM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function lM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function uM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=cM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function pM(e,t){Array.isArray(e.illegal)&&(e.illegal=Gu(...e.illegal))}function mM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function dM(e,t){e.relevance===void 0&&(e.relevance=1)}var hM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Ho(r.beforeMatch,Hv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},fM=["of","and","for","in","not","or","if","then","parent","list","value"],gM="keyword";function Xv(e,t,r=gM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Xv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,bM(c[0],c[1])]})}}function bM(e,t){return t?Number(t):yM(e)?0:1}function yM(e){return fM.includes(e.toLowerCase())}var Fv={},zo=e=>{console.error(e)},Bv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Jn=(e,t)=>{Fv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Fv[`${e}/${t}`]=!0)},tc=new Error;function Kv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Uv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function vM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw zo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),tc;if(typeof e.beginScope!="object"||e.beginScope===null)throw zo("beginScope must be object"),tc;Kv(e,e.begin,{key:"beginScope"}),e.begin=qu(e.begin,{joinWith:""})}}function TM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw zo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),tc;if(typeof e.endScope!="object"||e.endScope===null)throw zo("endScope must be object"),tc;Kv(e,e.end,{key:"endScope"}),e.end=qu(e.end,{joinWith:""})}}function SM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function _M(e){SM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),vM(e),TM(e)}function xM(e){function t(i,a){return new RegExp(Ys(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Uv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(qu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[lM,mM,_M,hM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[uM,pM,dM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Xv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ys(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return CM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=bo(e.classNameAliases||{}),s(e)}function Qv(e){return e?e.endsWithParent||Qv(e.starts):!1}function CM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return bo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Qv(e)?bo(e,{starts:e.starts?bo(e.starts):null}):Object.isFrozen(e)?bo(e):e}var EM="11.11.1",Uu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Wu=zv,Vv=bo,Wv=Symbol("nomatch"),wM=7,Zv=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Hu};function c(_){return a.noHighlightRe.test(_)}function l(_){let k=_.className+" ";k+=_.parentNode?_.parentNode.className:"";let A=a.languageDetectRe.exec(k);if(A){let F=P(A[1]);return F||(Bv(s.replace("{}",A[1])),Bv("Falling back to no-highlight mode for this block.",_)),F?A[1]:"no-highlight"}return k.split(/\s+/).find(F=>c(F)||P(F))}function p(_,k,A){let F="",B="";typeof k=="object"?(F=_,A=k.ignoreIllegals,B=k.language):(Jn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Jn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=_,F=k),A===void 0&&(A=!0);let Q={code:F,language:B};R("before:highlight",Q);let H=Q.result?Q.result:d(Q.language,Q.code,A);return H.code=Q.code,R("after:highlight",H),H}function d(_,k,A,F){let B=Object.create(null);function Q(V,G){return V.keywords[G]}function H(){if(!oe.keywords){Ye.addText(Ee);return}let V=0;oe.keywordPatternRe.lastIndex=0;let G=oe.keywordPatternRe.exec(Ee),ce="";for(;G;){ce+=Ee.substring(V,G.index);let _e=Et.case_insensitive?G[0].toLowerCase():G[0],et=Q(oe,_e);if(et){let[vr,xC]=et;if(Ye.addText(ce),ce="",B[_e]=(B[_e]||0)+1,B[_e]<=wM&&(li+=xC),vr.startsWith("_"))ce+=G[0];else{let CC=Et.classNameAliases[vr]||vr;te(G[0],CC)}}else ce+=G[0];V=oe.keywordPatternRe.lastIndex,G=oe.keywordPatternRe.exec(Ee)}ce+=Ee.substring(V),Ye.addText(ce)}function J(){if(Ee==="")return;let V=null;if(typeof oe.subLanguage=="string"){if(!t[oe.subLanguage]){Ye.addText(Ee);return}V=d(oe.subLanguage,Ee,!0,vp[oe.subLanguage]),vp[oe.subLanguage]=V._top}else V=h(Ee,oe.subLanguage.length?oe.subLanguage:null);oe.relevance>0&&(li+=V.relevance),Ye.__addSublanguage(V._emitter,V.language)}function q(){oe.subLanguage!=null?J():H(),Ee=""}function te(V,G){V!==""&&(Ye.startScope(G),Ye.addText(V),Ye.endScope())}function re(V,G){let ce=1,_e=G.length-1;for(;ce<=_e;){if(!V._emit[ce]){ce++;continue}let et=Et.classNameAliases[V[ce]]||V[ce],vr=G[ce];et?te(vr,et):(Ee=vr,H(),Ee=""),ce++}}function ae(V,G){return V.scope&&typeof V.scope=="string"&&Ye.openNode(Et.classNameAliases[V.scope]||V.scope),V.beginScope&&(V.beginScope._wrap?(te(Ee,Et.classNameAliases[V.beginScope._wrap]||V.beginScope._wrap),Ee=""):V.beginScope._multi&&(re(V.beginScope,G),Ee="")),oe=Object.create(V,{parent:{value:oe}}),oe}function ye(V,G,ce){let _e=zI(V.endRe,ce);if(_e){if(V["on:end"]){let et=new ec(V);V["on:end"](G,et),et.isMatchIgnored&&(_e=!1)}if(_e){for(;V.endsParent&&V.parent;)V=V.parent;return V}}if(V.endsWithParent)return ye(V.parent,G,ce)}function Ae(V){return oe.matcher.regexIndex===0?(Ee+=V[0],1):(zc=!0,0)}function Oe(V){let G=V[0],ce=V.rule,_e=new ec(ce),et=[ce.__beforeBegin,ce["on:begin"]];for(let vr of et)if(vr&&(vr(V,_e),_e.isMatchIgnored))return Ae(G);return ce.skip?Ee+=G:(ce.excludeBegin&&(Ee+=G),q(),!ce.returnBegin&&!ce.excludeBegin&&(Ee=G)),ae(ce,V),ce.returnBegin?0:G.length}function Ue(V){let G=V[0],ce=k.substring(V.index),_e=ye(oe,V,ce);if(!_e)return Wv;let et=oe;oe.endScope&&oe.endScope._wrap?(q(),te(G,oe.endScope._wrap)):oe.endScope&&oe.endScope._multi?(q(),re(oe.endScope,V)):et.skip?Ee+=G:(et.returnEnd||et.excludeEnd||(Ee+=G),q(),et.excludeEnd&&(Ee=G));do oe.scope&&Ye.closeNode(),!oe.skip&&!oe.subLanguage&&(li+=oe.relevance),oe=oe.parent;while(oe!==_e.parent);return _e.starts&&ae(_e.starts,V),et.returnEnd?0:G.length}function St(){let V=[];for(let G=oe;G!==Et;G=G.parent)G.scope&&V.unshift(G.scope);V.forEach(G=>Ye.openNode(G))}let _t={};function Ft(V,G){let ce=G&&G[0];if(Ee+=V,ce==null)return q(),0;if(_t.type==="begin"&&G.type==="end"&&_t.index===G.index&&ce===""){if(Ee+=k.slice(G.index,G.index+1),!n){let _e=new Error(`0 width match regex (${_})`);throw _e.languageName=_,_e.badRule=_t.rule,_e}return 1}if(_t=G,G.type==="begin")return Oe(G);if(G.type==="illegal"&&!A){let _e=new Error('Illegal lexeme "'+ce+'" for mode "'+(oe.scope||"<unnamed>")+'"');throw _e.mode=oe,_e}else if(G.type==="end"){let _e=Ue(G);if(_e!==Wv)return _e}if(G.type==="illegal"&&ce==="")return Ee+=`
`,1;if(jc>1e5&&jc>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Ee+=ce,ce.length}let Et=P(_);if(!Et)throw zo(s.replace("{}",_)),new Error('Unknown language: "'+_+'"');let _C=xM(Et),Wc="",oe=F||_C,vp={},Ye=new a.__emitter(a);St();let Ee="",li=0,To=0,jc=0,zc=!1;try{if(Et.__emitTokens)Et.__emitTokens(k,Ye);else{for(oe.matcher.considerAll();;){jc++,zc?zc=!1:oe.matcher.considerAll(),oe.matcher.lastIndex=To;let V=oe.matcher.exec(k);if(!V)break;let G=k.substring(To,V.index),ce=Ft(G,V);To=V.index+ce}Ft(k.substring(To))}return Ye.finalize(),Wc=Ye.toHTML(),{language:_,value:Wc,relevance:li,illegal:!1,_emitter:Ye,_top:oe}}catch(V){if(V.message&&V.message.includes("Illegal"))return{language:_,value:Wu(k),illegal:!0,relevance:0,_illegalBy:{message:V.message,index:To,context:k.slice(To-100,To+100),mode:V.mode,resultSoFar:Wc},_emitter:Ye};if(n)return{language:_,value:Wu(k),illegal:!1,relevance:0,errorRaised:V,_emitter:Ye,_top:oe};throw V}}function f(_){let k={value:Wu(_),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return k._emitter.addText(_),k}function h(_,k){k=k||a.languages||Object.keys(t);let A=f(_),F=k.filter(P).filter(D).map(q=>d(q,_,!1));F.unshift(A);let B=F.sort((q,te)=>{if(q.relevance!==te.relevance)return te.relevance-q.relevance;if(q.language&&te.language){if(P(q.language).supersetOf===te.language)return 1;if(P(te.language).supersetOf===q.language)return-1}return 0}),[Q,H]=B,J=Q;return J.secondBest=H,J}function v(_,k,A){let F=k&&r[k]||A;_.classList.add("hljs"),_.classList.add(`language-${F}`)}function b(_){let k=null,A=l(_);if(c(A))return;if(R("before:highlightElement",{el:_,language:A}),_.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",_);return}if(_.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(_)),a.throwUnescapedHTML))throw new Uu("One of your code blocks includes unescaped HTML.",_.innerHTML);k=_;let F=k.textContent,B=A?p(F,{language:A,ignoreIllegals:!0}):h(F);_.innerHTML=B.value,_.dataset.highlighted="yes",v(_,A,B.language),_.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(_.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),R("after:highlightElement",{el:_,result:B,text:F})}function T(_){a=Vv(a,_)}let x=()=>{E(),Jn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function S(){E(),Jn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function E(){function _(){E()}if(document.readyState==="loading"){C||window.addEventListener("DOMContentLoaded",_,!1),C=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function w(_,k){let A=null;try{A=k(e)}catch(F){if(zo("Language definition for '{}' could not be registered.".replace("{}",_)),n)zo(F);else throw F;A=i}A.name||(A.name=_),t[_]=A,A.rawDefinition=k.bind(null,e),A.aliases&&L(A.aliases,{languageName:_})}function M(_){delete t[_];for(let k of Object.keys(r))r[k]===_&&delete r[k]}function O(){return Object.keys(t)}function P(_){return _=(_||"").toLowerCase(),t[_]||t[r[_]]}function L(_,{languageName:k}){typeof _=="string"&&(_=[_]),_.forEach(A=>{r[A.toLowerCase()]=k})}function D(_){let k=P(_);return k&&!k.disableAutodetect}function $(_){_["before:highlightBlock"]&&!_["before:highlightElement"]&&(_["before:highlightElement"]=k=>{_["before:highlightBlock"](Object.assign({block:k.el},k))}),_["after:highlightBlock"]&&!_["after:highlightElement"]&&(_["after:highlightElement"]=k=>{_["after:highlightBlock"](Object.assign({block:k.el},k))})}function j(_){$(_),o.push(_)}function I(_){let k=o.indexOf(_);k!==-1&&o.splice(k,1)}function R(_,k){let A=_;o.forEach(function(F){F[A]&&F[A](k)})}function N(_){return Jn("10.7.0","highlightBlock will be removed entirely in v12.0"),Jn("10.7.0","Please use highlightElement now."),b(_)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:E,highlightElement:b,highlightBlock:N,configure:T,initHighlighting:x,initHighlightingOnLoad:S,registerLanguage:w,unregisterLanguage:M,listLanguages:O,getLanguage:P,registerAliases:L,autoDetection:D,inherit:Vv,addPlugin:j,removePlugin:I}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=EM,e.regex={concat:Ho,lookahead:Hv,either:Gu,optional:WI,anyNumberOfTimes:VI};for(let _ in Za)typeof Za[_]=="object"&&jv(Za[_]);return Object.assign(e,Za),e},Yn=Zv({});Yn.newInstance=()=>Zv({});eT.exports=Yn;Yn.HighlightJS=Yn;Yn.default=Yn});var u={};So(u,{ANIMATION_STOP_REJECT:()=>al,checkType:()=>Le,createStore:()=>$E,debounce:()=>_o,getFps:()=>DE,getInstantFps:()=>LE,getTime:()=>Kt,getTypeName:()=>ls,getUnivoqueId:()=>we,mustMakeSomething:()=>FE,normalizeWheel:()=>Ti,shouldMakeSomething:()=>BE,store:()=>hw,throttle:()=>ui,useCache:()=>GE,useDebounce:()=>_o,useFps:()=>HE,useFrame:()=>VE,useFrameIndex:()=>zE,useLinkedList:()=>fw,useLoad:()=>UE,useMouseClick:()=>YE,useMouseDown:()=>XE,useMouseMove:()=>QE,useMouseUp:()=>ew,useMouseWheel:()=>rw,useNextFrame:()=>jE,useNextLoop:()=>Bt,useNextTick:()=>WE,usePointerDown:()=>lw,usePointerLeave:()=>dw,usePointerMove:()=>uw,usePointerOut:()=>mw,usePointerOver:()=>cw,usePointerUp:()=>pw,useResize:()=>qE,useScroll:()=>ow,useScrollEnd:()=>aw,useScrollImmediate:()=>nw,useScrollStart:()=>iw,useScrollThrottle:()=>sw,useTouchEnd:()=>tw,useTouchMove:()=>ZE,useTouchStart:()=>KE,useVisibilityChange:()=>JE});var Kt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Tp=16.666666666666668;var ui=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Kt()-o>=t&&(e.apply(n,s),o=Kt())},t-(Kt()-o))):(e.apply(n,s),o=Kt())}};var _o=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function me(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function De(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function le(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function wt(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function xo(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function Co(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Uc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function Sp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Gc=(e,t,r)=>Math.min(Math.max(e,t),r);var pi=new Set,Bt=e=>{pi.add(e),pi.size===1&&setTimeout(()=>{pi.forEach(t=>{t()}),pi.clear()})};var qc="UNTYPED",_p="STRING",xp="NUMBER",Cp="OBJECT",Ep="FUNCTION",mi="ARRAY",wp="BOOLEAN",Ip="ELEMENT",Mp="HTMLELEMENT",kp="NODELIST";var Ce={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ls=e=>{switch(e){case String:case _p:return"String";case Number:case xp:return"Number";case Object:case Cp:return"Object";case Function:case Ep:return"Function";case Array:case mi:return"Array";case Boolean:case wp:return"Boolean";case Element:case Ip:return"Element";case HTMLElement:case Mp:return"HTMLElement";case NodeList:case kp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return qc}},Le=(e,t)=>{switch(e){case String:case _p:return Ce.isString(t);case Number:case xp:return Ce.isNumber(t);case Object:case Cp:return Ce.isObject(t);case Function:case Ep:return Ce.isFunction(t);case Array:case mi:return Ce.isArray(t);case Boolean:case wp:return Ce.isBoolean(t);case Element:case Ip:return Ce.isElement(t);case HTMLElement:case Mp:return Ce.isHTMLElement(t);case NodeList:case kp:return Ce.isNodeList(t);case Set:case"SET":return Ce.isSet(t);case Map:case"MAP":return Ce.isMap(t);case"ANY":return!0;default:return!0}};var $C=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),LC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),DC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},Rp=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(Rp(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Jc=(e,t,r)=>{switch(e){case"ANY":return Rp(t,r);case mi:case Array:return DC(t,r);case"SET":case Set:return LC(t,r);case"MAP":case Map:return $C(t,r);default:return t===r}};var di="UPDATE";var Ie={};So(Ie,{extractKeysFromArray:()=>Kc,extractkeyFromProp:()=>Vr,getCurrentDependencies:()=>Yc,getFirstCurrentDependencies:()=>Xc,initializeCurrentDependencies:()=>us,setCurrentDependencies:()=>fi});var Yo=[],hi=!1,us=()=>{hi=!0,Yo.length=0},Yc=()=>(hi=!1,[...Yo]),Xc=()=>(hi=!1,[...Yo]?.[0]??"missing_prop"),fi=e=>{!hi||!e||Yo.includes(e)||(Yo=[...Yo,e])},Vr=e=>Le(String,e)?e:(us(),e(),Xc()),Kc=e=>e.map(t=>Le(String,t)?t:(us(),t(),Xc()));var gi=new Map,Xo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=gi.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;gi.set(s,l),Bt(()=>{let d=gi.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&gi.delete(s)})}},Np=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var FC="padding: 10px;",Fe=()=>FC;var Tr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=Tr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(Tr(s,t),Tr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(Tr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:Tr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:Tr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Qc="store_shallow_copy",Zc="store_custom_copy",el="store_deep_copy",Ko=Qc,bi=()=>Ko===Zc||Ko===el;var He=new Map,ne=e=>{if(Ko===Qc){let t=He.get(e);return t?{...t}:void 0}if(Ko===Zc){let t=He.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Ko===el){let t=He.get(e);return t?{...t,store:Tr(t.store),validationStatusObject:Tr(t.validationStatusObject)}:void 0}return He.get(e)},Re=(e,t)=>{He.set(e,t)},Pp=e=>{He.delete(e)};var tl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Ap=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Op=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},$p=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Lp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ls(r)}`,o)},Dp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Fp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Bp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Vp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Wp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ls(o)}`,n)},jp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},rl=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},zp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Hp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},Up=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Gp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},ol=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var ps=e=>{if(!Ce.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>ps(r)))+1},qp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ce.isObject(o)&&t)return[r,qp(o,!1)];if(Ce.isFunction(o)){let n=o();if(Ce.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),Jp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ce.isObject(s)&&o)return[n,Jp(s,t,r,!1)];if(Ce.isFunction(s)){let i=s();if(Ce.isObject(i)&&"value"in i&&t in i){let a=Ce.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Yp=({data:e,depth:t,logStyle:r})=>t>2?(tl(t,r),{}):qp(e),Qo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(tl(r,o),{}):Jp(e,t,n),Xp=({value:e})=>Le(Map,e)?new Map(e):Le(Set,e)?new Set(e):Le(Object,e)?{...e}:Le(Array,e)?[...e]:e,Zo=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var BC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ne(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Fe(),x=a[t]==="ANY";if(Ce.isObject(r)&&!x){Op(t,r,T);return}if(Ce.isObject(l[t])&&!x){$p(t,T);return}let S=l[t],C=c[t]?.(r,S)??r;if(!Le(a[t],C)){Lp(t,C,a[t],T);return}let w=p[t]?.(C,S);!w&&s&&ol(t,T),!(d[t]&&!w&&n||(f[t]=w,(h[t]?Jc(a[t],S,C):!1)&&!s))&&(l[t]=C,Re(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Xo({callBackWatcher:v,prop:t,newValue:C,oldValue:S,validationValue:f[t],instanceId:e}),Sr({instanceId:e,prop:t}),b.forEach(O=>{Sr({instanceId:O,prop:t})})))},VC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ne(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Fe();if(!Ce.isObject(r)){Dp(t,r,T);return}if(!Ce.isObject(a[t])){Fp(t,T);return}let x=Object.keys(r),S=Object.keys(a[t]);if(!x.every(I=>S.includes(I))){Bp(x,t,T);return}let E=Object.fromEntries(Object.entries(r).map(I=>{let[R,N]=I,_=a[t][R];return[R,p[t][R]?.(N,_)??N]}));if(!Object.entries(E).map(I=>{let[R,N]=I,_=Le(c[t][R],N);return _||Wp(t,R,N,c[t][R],T),_}).every(I=>I===!0))return;let M=Object.entries(E).map(I=>{let[R,N]=I,_=a[t][R];return l[t][R]&&n?{strictCheck:d[t][R]?.(N,_),item:I}:{strictCheck:!0,item:I}}).filter(({strictCheck:I})=>I===!0);if(M.length===0)return;let P=Object.fromEntries(M.map(({item:I})=>I).map(([I,R])=>[I,R]));Object.entries(P).forEach(I=>{let[R,N]=I,_=a[t][R],k=d[t][R]?.(N,_);!k&&s&&ol(t,T),k===void 0&&Up(T,"ANY"),f[t][R]=k});let L=a[t],D={...a[t],...P};Object.keys(P).every(I=>h[t][I]===!0)&&Object.entries(D).every(([I,R])=>{let N=c[t][I]==="ANY";if(ps(R)>1&&!N){Vp(t,E,T);return}return Jc(c[t][I],L[I],R)})&&!s||(a[t]=D,Re(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Xo({callBackWatcher:v,prop:t,newValue:a[t],oldValue:L,validationValue:f[t],instanceId:e}),Sr({instanceId:e,prop:t}),b.forEach(I=>{Sr({instanceId:I,prop:t})})))},_r=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=ne(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=Fe();if(!(t in l)){Ap(t,d);return}let f=n?Xp({value:l[t]}):l[t],h=i===di?r(f):r,v=p[t]==="ANY";if(Ce.isObject(f)&&!v){VC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}BC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},Kp=({instanceId:e,prop:t,value:r})=>{let o=ne(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Re(e,{...o,store:n}),Xo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},Qp=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=ne(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),WC=e=>{let t=ne(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=Qp({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Re(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{_r({instanceId:e,prop:l,value:p,action:"SET"})})},Sr=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Re(e,{...r,computedPropsQueque:n}),!s)){let i=ne(e);if(!i)return;Re(e,{...i,computedRunning:!0}),Bt(()=>WC(e))}},jC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=ne(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){zp(r,Fe());return}s.add({prop:t,keys:r,fn:o}),Re(e,{...n,callBackComputed:s})},zC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=ne(e);if(!n)return;let{store:s,bindInstance:i}=n,a=Qp({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);_r({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},Zp=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(us(),o({}),Yc()):r;zC({instanceId:e,prop:t,keys:n,callback:o}),jC({instanceId:e,prop:t,keys:n,fn:o})};var em=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ce.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},tm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;_r({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var HC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=Fe();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Hp(t,i),{state:void 0,unsubscribeId:""};let a=we();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},UC=({instanceId:e,unsubscribeId:t})=>{let r=ne(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Re(e,{...r,callBackWatcher:o}))},rm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ne(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=HC({state:n,prop:t,callback:r,wait:o});return s?(Re(e,s),()=>{UC({instanceId:e,unsubscribeId:i})}):()=>{}},om=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ne(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return rm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=ne(p)?.store;return d&&t in d})??"",c=rm({instanceId:a,prop:t,callback:r,wait:o}),l=ne(e);return l?(Re(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=ne(e);p&&Re(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var nm=e=>{let t=ps(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Yp({data:e,depth:t,logStyle:Fe()}),type:Qo({data:e,prop:"type",depth:t,logStyle:Fe(),fallback:qc}),fnTransformation:Qo({data:e,prop:"transform",depth:t,logStyle:Fe(),fallback:r=>r}),fnValidate:Qo({data:e,prop:"validate",depth:t,logStyle:Fe(),fallback:()=>!0}),strict:Qo({data:e,prop:"strict",depth:t,logStyle:Fe(),fallback:!1}),skipEqual:Qo({data:e,prop:"skipEqual",depth:t,logStyle:Fe(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var sm=e=>{let t=ne(e);if(!t)return{};let{store:r}=t;return r??{}},am=e=>{let t=ne(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?sm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(sm(o))))},im=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];jp(t,Fe())},cm=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return im({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";return im({instanceId:n,prop:t})};var lm=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Xo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Sr({instanceId:e,prop:t}),i.forEach(a=>{Sr({instanceId:a,prop:t})})):rl(t,Fe()))},yi=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){lm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";lm({instanceId:n,prop:t})},um=async({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Np({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Sr({instanceId:e,prop:t}),i.forEach(a=>{Sr({instanceId:a,prop:t})}),{success:!0}):(rl(t,Fe()),{success:!1}):{success:!1}},pm=async({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return um({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";return um({instanceId:n,prop:t})};var mm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{validationStatusObject:r}=t;return r},dm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{store:r}=t;console.log(r)},hm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},fm=({instanceId:e})=>{let t=ne(e);console.log(t)};var gm=({instanceId:e})=>{let t=Fe(),r=He.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=bi()?He.get(e)?.store??p:p;if(!h)return!1;if(d in h){let v=Zo({instanceId:e,prop:d}),b=s.has(d);return b&&Gp(d,t),v||b?!1:(_r({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=bi()?He.get(e)?.store??p:p;return!f||!(d in f)?!1:(fi(d),f[d])}});if(!o||o.length===0)return Re(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=He.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,v){let b=bi()?He.get(p)?.store??h:h;return!b||!(v in b)?!1:(fi(v),b[v])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(v=>d in v);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Re(e,{...r,proxiObject:l}),l};var GC=({selfId:e,bindId:t})=>{let r=ne(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Re(t,{...r,bindInstanceBy:n})},bm=({selfId:e,bindId:t})=>{let r=ne(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Re(t,{...r,bindInstanceBy:n})},qC=({bindStores:e,selfStore:t})=>{let o=[...Le(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},ym=({value:e,instanceId:t})=>{let r=ne(t);if(!r)return;qC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Le(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Re(t,{...r,bindInstance:s}),n.forEach(i=>{GC({selfId:t,bindId:i})})};var vm=e=>{let t=He.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{bm({selfId:e,bindId:n})}),Pp(e)};var Tm=({instanceId:e,values:t})=>{let r=ne(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Re(e,r)};var vi=(e={})=>{let t=we(),r=nm(e),o=em(r);return Re(t,o),tm(t,r),{getId:()=>t,bindStore:n=>{ym({value:n,instanceId:t})},get:()=>am(t),getProp:n=>cm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Vr(n);Zo({instanceId:t,prop:c})||_r({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Vr(n);Zo({instanceId:t,prop:l})||_r({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:di})},getProxi:()=>gm({instanceId:t}),quickSetProp:(n,s)=>{Zo({instanceId:t,prop:n})||Kp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Vr(n),l=om({instanceId:t,prop:c,callback:s,wait:i});return a&&Bt(()=>{yi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Vr(n),l=Kc(i);Zp({instanceId:t,prop:c,keys:l,callback:s}),Bt(()=>{yi({instanceId:t,prop:c})})},emit:n=>{let s=Vr(n);yi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Vr(n);return pm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Tm({instanceId:t,values:n})},getValidation:()=>mm({instanceId:t}),debug:()=>{fm({instanceId:t})},debugStore:()=>{dm({instanceId:t})},debugValidate:()=>{hm({instanceId:t})},destroy:()=>{vm(t)}}};var ve=vi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var nl=!1,ms=new Map;function Sm(){if(ms.size===0){globalThis.removeEventListener("DOMContentLoaded",Sm),nl=!1;return}for(let e of ms.values())e();ms.clear()}function JC(){nl||(nl=!0,globalThis.addEventListener("DOMContentLoaded",Sm,{passive:!1}))}var YC=e=>{let t=we();return ms.set(t,e),typeof globalThis<"u"&&JC(),()=>ms.delete(t)},_m=YC;function Ti(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function XC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function KC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function jr(e){let t=!1,r=new Map,{usePassive:o}=ve.get();ve.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=XC({type:c,event:a}),{clientX:d,clientY:f}=KC({type:c,event:a}),h=a.target,v={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault()};if(c==="wheel"){let b=ve.getProp("spinYMaxValue"),T=ve.getProp("spinXMaxValue"),{spinX:x,spinY:S,pixelX:C,pixelY:E}=Ti(a);Object.assign(v,{spinX:Gc(x,-T,T),spinY:Gc(S,-b,b),pixelX:C,pixelY:E})}for(let b of r.values())b(v)}function s(){t||(t=!0,o=ve.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=we();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var xm=jr("click"),Cm=jr("mousedown"),Em=jr("touchstart"),wm=jr("mousemove"),Im=jr("touchmove"),Mm=jr("mouseup"),km=jr("touchend"),Rm=jr("wheel");var Eo=0,Xe=new Map,QC=(e={},t=()=>{})=>{let r=we();return Xe.set(r,{el:e,fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:r,unsubscribe:()=>{if(Xe.has(r)){let o=Xe.get(r);if(!o)return;let n=o.data.size;if(Xe.delete(r),!n)return;Eo=Eo-n}}}},ZC=({id:e,callBackObject:t,frame:r})=>{if(!Xe.has(e))return;let{currentFrame:o}=ve.get(),n=Xe.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),Eo++)},eE=e=>{Xe.has(e)&&Xe.delete(e)},tE=e=>{let t=Xe.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=ve.get();t.freeze={active:!0,atFrame:r}},rE=({id:e,update:t=!0})=>{let r=Xe.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=ve.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},oE=e=>{let t=Xe.get(e);if(!t)return;let r=t.data.size;Eo=Eo-r,t.data.clear()},nE=e=>Xe.get(e)??{},sE=e=>{for(let t of Xe.values()){let{data:r,fn:o,el:n,freeze:s}=t,i=r.get(e);i&&!s.active&&(o(i,n),r.delete(e),Eo--)}},iE=({id:e,obj:t={}})=>{if(!Xe.has(e))return;let r=Xe.get(e);if(!r)return;let{el:o,fn:n,freeze:s}=r;s.active||n(t,o)},aE=()=>Eo,cE=e=>{for(let[t,r]of Xe){let{data:o,fn:n,el:s,freeze:i}=r,a=new Map;for(let[c,l]of o)a.set(c-e,l),o.delete(c);Xe.set(t,{data:a,fn:n,el:s,freeze:i})}},en={add:QC,get:nE,update:ZC,remove:eE,clean:oE,fire:sE,fireObject:iE,getCacheCounter:aE,updateFrameId:cE,freeze:tE,unFreeze:rE};var sl=!1,Si=new Map;function Nm(){if(Si.size===0){globalThis.removeEventListener("visibilitychange",Nm),sl=!1;return}let e={visibilityState:document.visibilityState};for(let t of Si.values())t(e)}function lE(){sl||(sl=!0,globalThis.addEventListener("visibilitychange",Nm,{passive:!1}))}var uE=e=>{let t=we();return Si.set(t,e),typeof globalThis<"u"&&lE(),()=>Si.delete(t)},_i=uE;var ds=[],pE=(e=()=>{},t=100)=>{ds.push({cb:e,priority:t})},mE=({time:e,fps:t})=>{ds.length!==0&&(ds.sort((r,o)=>r.priority-o.priority),ds.forEach(({cb:r})=>r({time:e,fps:t})),ds.length=0)},It={add:pE,fire:mE};var il=[],dE=e=>{il.push(e)},hE=()=>{let e=[...il];return il.length=0,e},tn={add:dE,get:hE};var zr=new Map,fE=e=>{let t=[...zr.entries()];zr.clear(),t.forEach(([r,o])=>{zr.set(r-e,o)})},gE=({currentFrame:e,time:t,fps:r})=>{let o=zr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),zr.delete(e))},bE=(e,t)=>{let r=t+ve.getProp("currentFrame"),o=zr.get(r)??[];zr.set(r,[...o,e]),ve.emit("requestFrame")},yE=()=>zr.size,rn={add:bE,fire:gE,updateKeys:fE,getAmountOfFrameToFire:yE};var al="animationStop",Pm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===al&&e.preventDefault()})};var Am=!1,xi=({force:e=!1,duration:t=30}={})=>{if(Am&&!e){let{instantFps:r}=ve.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,v=Math.max(h,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let b=Math.round(a/i);if(l++,l>=t){ve.quickSetProp("instantFps",b),Am=!0,r({averageFPS:b});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};xi();var cl=1e7,Dm=2e3,ml=!1,Hr=[],Ke=Kt(),Om=0,ll=0,ul=0,dl=0,pl=0,on=!1,lt=60,Mi=lt,Ci=0,Ei=0,xr=0,wi=!1,Ii=!1,vE=()=>lt<Mi/5*3,TE=()=>lt<Mi/5*4,SE=()=>{!vE()||wi||(wi=!0,setTimeout(()=>{wi=!1},4e3))},_E=()=>{!TE()||Ii||(Ii=!0,setTimeout(()=>{Ii=!1},4e3))};_i(({visibilityState:e})=>{on=e==="visible"});Pm();ve.watch("requestFrame",()=>{ki()});var $m=()=>{xr===cl&&(xr=0,ve.quickSetProp("currentFrame",xr),rn.updateKeys(cl),en.updateFrameId(cl)),It.fire({time:Ke,fps:lt}),Hr=[...Hr,...tn.get()],ml=!1,Hr.length>0||rn.getAmountOfFrameToFire()>0||en.getCacheCounter()>0||Ke<Dm?ki():(on=!0,xr=0,dl=Ke,ve.quickSetProp("currentFrame",xr))},Lm=e=>{Ke=e,ul=Ke-ll,on&&(Om+=ul),ll+=ul,Ke=Math.round(ll-Om);let t=Math.round(1e3/lt);pl=Math.abs(Ke-dl-t);let r=pl>100?pl:0;Ke=Ke-r,dl=Ke,on?(Ei=Ke,Ci=0,lt=ve.getProp("instantFps")):Ci++,Ke>Ei+1e3&&!on&&(lt=Ke>Dm?Math.round(Ci*1e3/(Ke-Ei)):ve.getProp("instantFps"),Ei=Ke,Ci=0,lt=lt<30?ve.getProp("instantFps"):lt),lt>Mi&&(Mi=lt),SE(),_E(),Hr.forEach(n=>n({time:Ke,fps:lt})),rn.fire({currentFrame:xr,time:Ke,fps:lt}),en.fire(xr),xr++,ve.quickSetProp("currentFrame",xr),Hr.length=0,on=!1,ve.getProp("deferredNextTick")?Bt(()=>$m()):$m()},ki=()=>{ml||(typeof globalThis>"u"?setTimeout(()=>Lm(Kt()),Tp):requestAnimationFrame(Lm),ml=!0)},Vt={add:s=>{Hr.push(s),ki()},addMultiple:(s=[])=>{Hr=[...Hr,...s],ki()},getFps:()=>lt,mustMakeSomething:()=>wi,shouldMakeSomething:()=>Ii};var hl=!1,Ri=new Map,fl=()=>{},Fm=window.innerHeight,Bm=window.innerWidth;function xE(){if(Ri.size===0){window.removeEventListener("resize",fl),hl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Fm,o=t!==Bm;Fm=e,Bm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Ri.values())s(n)}function CE(){hl||(hl=!0,fl=_o(()=>xE()),window.addEventListener("resize",fl,{passive:!1}))}var EE=e=>{let t=we();return Ri.set(t,e),typeof globalThis<"u"&&CE(),()=>Ri.delete(t)},Vm=EE;var gl=!1,Ni=new Map,wE="UP",zm="DOWN",Wm=window.scrollY,hs=window.scrollY,bl=zm,jm={scrollY:hs,direction:bl};function Hm(){if(Ni.size===0){window.removeEventListener("scroll",Hm),gl=!1;return}Wm=hs,hs=window.scrollY,bl=hs>Wm?zm:wE,jm={scrollY:hs,direction:bl};for(let e of Ni.values())e(jm)}function IE(){gl||(gl=!0,window.addEventListener("scroll",Hm,{passive:!0}))}var ME=e=>{let t=we();return Ni.set(t,e),typeof globalThis<"u"&&IE(),()=>Ni.delete(t)},Cr=ME;var yl=!1,Pi=new Map,Um=()=>{};function kE(e){if(Pi.size===0){Um(),yl=!1;return}Vt.add(()=>{It.add(()=>{for(let t of Pi.values())t(e)},0)})}function RE(){yl||(yl=!0,Um=Cr(kE))}var NE=e=>{let t=we();return Pi.set(t,e),typeof globalThis<"u"&&RE(),()=>Pi.delete(t)},Gm=NE;var vl=!1,Ai=new Map,qm,Jm=()=>{};function PE(e){if(Ai.size===0){Jm(),vl=!1;return}Vt.add(()=>{It.add(()=>{for(let t of Ai.values())t(e)},0)})}function AE(){vl||(vl=!0,qm=ui(e=>PE(e),ve.getProp("throttle")),Jm=Cr(qm))}var OE=e=>{let t=we();return Ai.set(t,e),typeof globalThis<"u"&&AE(),()=>Ai.delete(t)},Ym=OE;var Xm=()=>{},Km=()=>{},Qm=()=>{};function Zm(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){Km(),e==="START"&&Xm(),t=!1;return}Vt.add(()=>{It.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,Qm=_o(()=>n()),Km=Cr(Qm),e==="START"&&(Xm=Cr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=we();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var ed=Zm("START"),td=Zm("END");function nn(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=we();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var rd=nn("pointerover"),od=nn("pointerdown"),nd=nn("pointermove"),sd=nn("pointerup"),id=nn("pointerout"),ad=nn("pointerleave");var Be=Symbol("LinkedList.setNext"),Ve=Symbol("LinkedList.setPrev"),Oi="after",Tl="before",sn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Be](t){this.#n=t}get prev(){return this.#t}[Ve](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},an=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new sn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Be](r),r[Ve](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new sn(t);return this.#l.add(r),this.#n?(r[Be](this.#n),this.#n[Ve](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Be](t.next),t.next&&t.next[Ve](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ve](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Be](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new sn(r);return this.#l.add(o),o[Ve](t),o[Be](t.next),t.next&&t.next[Ve](o),t[Be](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new sn(r);return this.#l.add(o),o[Be](t),o[Ve](t.prev),t.prev&&t.prev[Be](o),t[Ve](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Oi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Oi&&r.next===t?this:o===Tl&&r.prev===t?this:(t.prev&&t.prev[Be](t.next),t.next&&t.next[Ve](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Oi&&(t[Ve](r),t[Be](r.next),r.next&&r.next[Ve](t),r[Be](t),r===this.#t&&(this.#t=t)),o==Tl&&(t[Ve](r.prev),t[Be](r),r.prev&&r.prev[Be](t),r[Ve](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Oi)}moveBefore(t,r){return this.move(t,r,Tl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Be](n),n&&n[Ve](o),s&&s[Be](i),i&&i[Ve](s),t[Ve](s),t[Be](i),r[Ve](o),r[Be](n),s&&s[Be](t),i&&i[Ve](t),o&&o[Be](r),n&&n[Ve](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Be](o),t[Ve](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function $E(e){return vi(e)}function LE(){return ve.getProp("instantFps")}function DE(){return Vt.getFps()}function FE(){return Vt.mustMakeSomething()}function BE(){return Vt.shouldMakeSomething()}function VE(e=()=>{}){return Vt.add(e)}function WE(e=()=>{}){return It.add(e)}function jE(e=()=>{}){return tn.add(e)}function zE(e=()=>{},t=0){return rn.add(e,t)}async function HE({force:e=!1,duration:t=30}={}){return await xi({force:e,duration:t})}function UE(e=()=>{}){return _m(e)}var GE=en;function qE(e=()=>{}){return Vm(e)}function JE(e=()=>{}){return _i(e)}function YE(e=()=>{}){return xm(e)}function XE(e=()=>{}){return Cm(e)}function KE(e=()=>{}){return Em(e)}function QE(e=()=>{}){return wm(e)}function ZE(e=()=>{}){return Im(e)}function ew(e=()=>{}){return Mm(e)}function tw(e=()=>{}){return km(e)}function rw(e=()=>{}){return Rm(e)}function ow(e=()=>{}){return Gm(e)}function nw(e=()=>{}){return Cr(e)}function sw(e=()=>{}){return Ym(e)}function iw(e=()=>{}){return ed(e)}function aw(e=()=>{}){return td(e)}function cw(e=()=>{}){return rd(e)}function lw(e=()=>{}){return od(e)}function uw(e=()=>{}){return nd(e)}function pw(e=()=>{}){return sd(e)}function mw(e=()=>{}){return id(e)}function dw(e=()=>{}){return ad(e)}var hw=ve;function fw(){return new an}var m={};So(m,{afterRouteChange:()=>md,beforeRouteChange:()=>pd,componentMap:()=>W,createComponent:()=>Xh,eventDelegationMap:()=>Oo,getActiveParams:()=>fd,getActiveRoute:()=>hd,getChildrenIdByName:()=>ji,getComponentNameById:()=>Fd,getDebugMode:()=>Yh,getIdByInstanceName:()=>nr,getNumberOfActiveInvalidate:()=>Kg,getNumberOfActiveRepeater:()=>Qg,getParentIdById:()=>ys,getPropsFromParent:()=>ba,getRoot:()=>ua,getStateById:()=>ir,getStateByName:()=>lh,getTree:()=>jd,inizializeApp:()=>Xg,loadUrl:()=>Yg,mainStore:()=>de,onRouteLoading:()=>dd,removeAndDestroyById:()=>pt,setStateById:()=>Sn,setStateByName:()=>Uh,staticProps:()=>ya,tempDelegateEventMap:()=>xs,tick:()=>Ir,updateStateByName:()=>qh,useComponent:()=>ea,useMethodArrayByName:()=>Ud,useMethodByName:()=>fn,watchById:()=>Mt});var cn="activeRoute",ln="activeParams",wo="beforeRouteChange",un="afterRouteChange",Qt="routeIsLoading",gt="parserAsync",Ur="default",cd="repeater",ld="invalidate",ud="render_component";var de=u.createStore({[cn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[ln]:()=>({value:{},type:"any",skipEqual:!1}),[wo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[un]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Qt]:()=>({value:!1,type:Boolean}),[gt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Ur,type:String,skipEqual:!1})}}),pn=()=>{de.set(gt,{element:document.createElement("div"),parentId:"",persistent:!1,source:Ur},{emit:!1})};var pd=e=>de.watch(wo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),md=e=>de.watch(un,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),dd=e=>de.watch(Qt,t=>{e(t)}),hd=()=>{let{activeRoute:e}=de.get();return e},fd=()=>{let{activeParams:e}=de.get();return e};var W=new Map;var Y=new Map;var gd=({componentId:e,repeatId:t})=>{let r=Y.get(t);if(!r)return;let{componentChildren:o}=r;Y.set(t,{...r,componentChildren:[...o,e]})},bd=({componentId:e,repeatId:t})=>{let r=Y.get(t);if(!r)return;let{componentChildren:o}=r;Y.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},Sl=({repeatId:e})=>{let t=Y.get(e);if(!t)return[];let{componentChildren:r}=t;return r},yd=({repeatId:e})=>{let t=Y.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var vd=new WeakMap,Td=({element:e,id:t})=>{vd.set(e,t)},mn=({element:e})=>vd.get(e);var Sd=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=W.get(e);r&&(W.set(e,{...r,element:t}),Td({element:t,id:e}))},fs=({id:e=""})=>!e||e===""?void 0:W.get(e)?.element,_d=({element:e})=>e?mn({element:e}):"",_l=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:Sl({repeatId:t}).map(n=>W.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),xl=({id:e,repeatId:t})=>!e||e===""?[]:Sl({repeatId:t}).map(o=>W.get(o)).filter(o=>o!==void 0).map(o=>o.id);var xd="data-mobjs",Io="componentid",$i="bindtextid",Li="bindobjectid";var dn="staticprops",Di="bindprops",Cd="name",Ed="name",wd="slot",Wt="repeaterchild";var Zt="currentRepeaterValue",er="repeatPropBind",Fi="bindevents",tr="weakbindevents",hn="bindeffect",Id="parentid";var rr="bindrefid",Er="bindrefname",Bi="invalidateid",Vi="mobjsrepeat";var or={current:{},index:-1},Md="QUEQUE_BINDPROPS",Cl="QUEQUE_REPEATER",El="QUEQUE_INVALIDATE";var Gr=new Map;var gs=({id:e})=>{if(!Y.has(e))return;if(Gr.has(e)){let r=Gr.get(e);r?.removeCustomComponent(),r?.remove(),Gr.delete(e)}return Y.get(e)?.element};var Wi=({id:e="",value:t})=>{if(!e||e==="")return;let r=W.get(e);r&&W.set(e,{...r,currentRepeaterState:t})},kd=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:kd({rootNode:e,currentNode:t.parentElement})},gw=({rootNode:e,node:t})=>{if(e)return kd({rootNode:e,currentNode:t.parentElement})},jt=({id:e=""})=>{if(!e||e==="")return or;let r=W.get(e)?.currentRepeaterState;return r||or};var Rd=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=W.get(e);if(!o)return;let n=gs({id:t}),s=gw({rootNode:n,node:r});W.set(e,{...o,repeaterInnerWrap:s})},bs=({id:e})=>!e||e===""?void 0:W.get(e)?.repeaterInnerWrap;var ji=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=W.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Nd=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=jt({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Pd="",Ad,Od=({contentId:e=""})=>{Pd=e};var $d=()=>{Ad=document?.querySelector(Pd)},zi=()=>Ad;var qr=new Map,Ld=({instanceName:e,id:t})=>{let r=qr.get(e)??[];qr.set(e,[...r,t])},Dd=({instanceName:e,id:t})=>{let r=qr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&qr.delete(e),o.length>0&&qr.set(e,o)},wl=({instanceName:e})=>qr.get(e)??[];var Fd=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Bd=e=>{if(!e)return"name-not-found";let t=mn({element:e})??"",r=W.get(t);return r?r.componentName:"name-not-found"},nr=(e="")=>e?wl({instanceName:e})?.[0]:void 0,Vd=(e="")=>e?wl({instanceName:e})??[]:[];var Hi=(e="")=>{if(!e||e==="")return!1;let r=W.get(e)?.element;return r?!zi()?.contains(r):!1};var Wd=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of W.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Wd({chunk:l})}]},[]),jd=()=>{let e=[...W.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Wd({chunk:e})};var zd=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=W.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}W.set(e,{...o,methods:{...n,[t]:r}})}},Hd=({id:e})=>{if(!e||e==="")return{};let r=W.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},fn=e=>{let t=nr(e);if(!t||t==="")return;let r=Hd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Ud=e=>Vd(e).map(r=>Hd({id:r})).filter(r=>Object.keys(r).length>0);function*sr(e){if(e){yield e;for(let t of e.children)yield*sr(t)}}function bw(e,t){let r=[];for(let o of sr(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Jr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...bw(n,t)];return r};var Mo=new Set,Gd=!1,qd=e=>{Mo.add(e)},Jd=e=>{Mo.delete(e)},Yd=e=>{let t;for(let r of Mo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Mo.delete(t),[t]):[]},Xd=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Kd=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],Qd=()=>Mo.size;var ut=e=>{Gd=e},zt=()=>Gd;var Zd=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},eh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},th=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Ui=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var ys=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.parentId;if(r)return r},rh=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=W.get(r);if(!n)return;let{child:s}=n;s&&W.set(r,{...n,child:{...s,...Zd({currentChild:s,id:e,componentName:o})}})},oh=({element:e,id:t})=>{if(!e)return;if(!0){Jr(e,!1).forEach(n=>{n.setParentId(t)});return}Xd({element:e}).forEach(o=>{o.setParentId(t)})},gn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=mn({element:t}),r||(t=t.parentNode);return r??""},Il=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=W.get(e);if(!r)return!1;let o=r?.parentId??"";return Il({moduleScopeId:o,targetComponentId:t})};var xt=new Map,vs=new Map;var nh=({componentId:e})=>{if(e)for(let[t,r]of xt){let{componentId:o}=r;o===e&&xt.delete(t)}};var Qe=new Map;var ge=new Map;var sh=({id:e})=>{if(Qe.has(e)){let t=Qe.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{ge.has(r)&&ge.delete(r)}),Qe.delete(e)}};var Ze=new Map;var ih=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({repeatId:r})=>{Y.has(r)&&Y.delete(r)}),Ze.delete(e)}};var ah=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=W.get(t??"");if(!o)return;let{child:n}=o;!t||!n||W.set(t,{...o,child:{...n,...eh({currentChild:n,id:e,componentName:r})}})};var bn=new Set;var ch=e=>{bn.delete(e)};var pt=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{pt({id:f})}),ah({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),sh({id:e}),ih({id:e}),l&&l.length>0&&bd({componentId:e,repeatId:l}),p&&p.length>0&&Dd({instanceName:p,id:e}),d||ch(e),nh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,W.delete(e)};var ir=(e="")=>!e||e===""?void 0:W.get(e)?.state?.get();var lh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),ir(t)};var yn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Yr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},ko=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=W.get(e)?.freezedPros;return o?o.includes(t):!1};var uh=({repeatId:e,host:t})=>{let r=Y.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),Y.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Gr.set(e,t)};var ph=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(zt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Vi)??"";uh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xr=new Map;var mh=({invalidateId:e,host:t})=>{let r=ge.get(e);if(!r)return;let o=t.parentNode;ge.set(e,{...r,element:o}),Xr.set(e,t)};var dh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Bi)??"";mh({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Kr=new Set,hh=e=>{Kr.add(e)},fh=()=>{Kr.clear()},gh=({element:e})=>[...Kr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Kr.delete(t),r}),bh=({name:e,element:t})=>[...Kr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Kr.delete(r),o}),yh=()=>[...Kr],Gi=()=>Kr.size;var vh=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Ed))}connectedCallback(){let e=this.shadowRoot?.host;e&&hh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Ml=new Set,Th=e=>{Ml.add(e)},qi=()=>[...Ml],Ji=e=>Ml.delete(e);var Sh=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=zt();if(p&&!!1&&Th(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#_}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!zt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#_]=[Cd,dn,Di,"key",Fi,Zt,wd,Id,Wt,tr,er,rr,Er].map(d=>p.getAttribute(d)??"")),qd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Jd(l),Ji(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var Mt=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:W.get(e)?.state?.watch(t,r,{wait:o??!1});function eo(){return new Promise(e=>u.useNextLoop(()=>e()))}var Ro=new Map,xh=()=>Ro.size===0,kl=1e3,Ch=e=>{if(Ro.size>=kl)return console.warn(`maximum loop event reached: (${kl})`),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},_h=()=>Ro.size===0||Ro.size>=kl,kt=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&Ro.forEach(r=>{console.log(r)}),_h()&&t){t();return}return new Promise(r=>{if(_h()){r();return}kt({debug:e,previousResolve:t??r})})};var No=new Map,wh=()=>No.size===0,Rl=1e3,Ih=e=>{if(No.size>=Rl)return console.warn(`maximum loop event reached: (${Rl})`),()=>{};let t=u.getUnivoqueId();return No.set(t,e),()=>No.delete(t)},Eh=()=>No.size===0||No.size>=Rl,Rt=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&No.forEach(r=>{console.log(r)}),Eh()&&t){t();return}return new Promise(r=>{if(Eh()){r();return}Rt({debug:e,previousResolve:t??r})})};var vn=({id:e})=>{let t=Qe.get(e);return t?t.map(r=>r.invalidateId).map(r=>ge.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var Tn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.repeatId).map(r=>Y.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var Xi=new Map,Mh=(e,t)=>{Xi.set(e,t)},Ki=new Map,kh=({host:e,componentId:t,bindTextId:r})=>{Ki.set(e,{componentId:t,bindTextId:r})},Rh=e=>e.match(/(?<=\[).+?(?=])/g),Nh=e=>e.split("[")?.[0],vw=({previous:e,current:t})=>{let r=Rh(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Nh(t)]):e?.[t]},Ph=(e,t,...r)=>{let o=ir(e),n=r.map(s=>s.split(".").reduce((a,c)=>vw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Ah=()=>{[...Ki].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){Xi.delete(t);return}let o=Xi.get(t);o&&(Xi.delete(t),Tw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ki.clear()},Oh=()=>Ki.size,Tw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=Tn({id:e}),a=vn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=Rh(f),b=h&&h?.length>0?Nh(f):f;if(b)return Mt(e,b,async()=>{await Rt(),await kt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var $h=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute($i)??"";kh({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Qi=new Map,Lh=(e,t)=>{Qi.set(e,t)},Nl=new Map,Dh=({host:e,componentId:t,bindObjectId:r})=>{Nl.set(e,{componentId:t,bindObjectId:r})},Fh=e=>e.map(t=>"observe"in t?Ie.extractkeyFromProp(t.observe):(Ie.initializeCurrentDependencies(),"value"in t?t?.value():t(),Ie.getFirstCurrentDependencies())),Bh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Vh=()=>{[...Nl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Qi.delete(t);return}let o=Qi.get(t);o&&(Qi.delete(t),Sw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Nl.clear()},Sw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=Tn({id:e}),a=vn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Mt(e,p,async()=>{await Rt(),await kt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Wh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Li)??"";Dh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Zi={},Po=()=>Zi,jh=new Set,zh=()=>{Zi=[...jh.values()].reduce((e,t)=>({...e,...t}),{}),console.log(`component loaded:${Object.keys(Zi).length}`),Sh(Zi),vh(),dh(),ph(),$h(),Wh()},ea=e=>{!e||e?.length===0||e.forEach(t=>{jh.add(t)})};var ta=({componentName:e,propName:t})=>(Po()?.[e]?.componentParams?.exportState??[]).includes(t),Hh=({componentName:e})=>Po()?.[e]?.componentParams?.exportState??[];var Sn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let s=W.get(e),i=s?.state,a=s?.componentName??"";if(!ta({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Uh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>Sn(t,r,o,{emit:n})};var Gh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let i=W.get(e),a=i?.state,c=i?.componentName??"";if(!ta({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var qh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Gh(t,r,o,{emit:n,clone:s})};var Pl={scoped:!1,maxParseIteration:5e3,debug:!1},Jh=e=>{Pl={...Pl,...e}},Nt=()=>Pl,Yh=()=>{let{debug:e}=Nt();return e},Xh=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(ea(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var Kh=[],Qh="",Zh="",ef=e=>{Kh=[...e]},_n=({hash:e=""})=>Kh.find(({hash:t})=>e===t),tf=({hash:e=""})=>{Qh=e},ra=()=>Qh,rf=({hash:e=""})=>{Zh=e},of=()=>Zh;function _w(e){let t=[];for(let r of sr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var nf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,..._w(o)];return t};function xw(e){let t=[];for(let r of sr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var sf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...xw(o)];return t};function Cw(e,t){for(let r of sr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var af=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=Cw(o,t);if(n)return n}return null};function Ew(e){for(let t of sr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var cf=e=>{let t=e||document.body;for(let r of t.children){let o=Ew(r);if(o)return o}return null};var Ts=new Map,Ao=e=>{let t=u.getUnivoqueId();return Ts.set(t,e),t},lf=(e="")=>{if(!e)return or;let t=Ts.get(e);return Ts.delete(e),t??or};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var oa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Zt)||i.deref()?.setAttribute(Zt,Ao({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(er)||i.deref()?.setAttribute(er,`${o}`),i.deref()?.hasAttribute(Wt)||i.deref()?.setAttribute(Wt,`${n}`)})},na=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Wt)){Ji(i);return}i.setAttribute(Zt,Ao({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(er,`${o}`),i.setAttribute(Wt,`${n}`)})},to=({stringDOM:e,parent:t,position:r})=>{ut(!0);let o=document.createRange().createContextualFragment(e);ut(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Ss=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;ut(!0),e.forEach(n=>{n&&o.append(n)}),ut(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var Iw=({element:e,content:t})=>{let{debug:r}=Nt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Mw=({element:e})=>{yh().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},kw=({element:e})=>{if(!!1&&Gi()===0)return;let t=nf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=bh({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Rw=({element:e,content:t})=>{let r=Iw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=gh({element:r});a&&(Ss({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Ss({parent:r,elements:[...e.childNodes],position:"afterbegin"}),kw({element:r}),Mw({element:r}),n&&n.length>0&&r.setAttribute(tr,n),s&&s.length>0&&r.setAttribute(rr,s),i&&i.length>0&&r.setAttribute(Er,i);let{debug:c}=Nt();c&&r.setAttribute(xd,o??"")}return e.remove(),r},uf=({element:e,content:t})=>({newElement:Rw({element:e,content:t})});var Al=0,pf=()=>{Al+=1},Ol=()=>Al,mf=()=>{Al=0},$l=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Yd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var df=({cb:e=()=>{},id:t})=>{if(!t)return;let r=W.get(t);r&&W.set(t,{...r,destroy:e})};var _s=new Map,hf=({id:e,cb:t=()=>{}})=>{_s.set(e,t)},Ll=async({id:e,element:t})=>{let o=await _s.get(e)?.({element:t});df({cb:o,id:e}),_s.delete(e)};var xn=new Map,Dl=1e5,Cn=e=>{if(xn.size>=Dl)return console.warn(`maximum loop event reached: (${Dl})`),()=>{};let t=u.getUnivoqueId();return xn.set(t,e),()=>xn.delete(t)},ff=()=>xn.size===0||xn.size>=Dl,Ir=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&xn.forEach(r=>{console.log(r)}),ff()&&t){t();return}return new Promise(r=>{if(ff()){r();return}Ir({debug:e,previousResolve:t??r})})};var Fl=!0,sa=()=>{Fl=!0},ia=()=>{Fl=!1},aa=()=>Fl;var En=new Map,gf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return En.set(r,t),r},bf=({element:e,componentId:t,bindEventsId:r})=>{let o=En.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!aa())return;ia(),await Ir(),sa();let c=jt({id:t});i(a,c?.current,c?.index)})}),En.delete(r))},yf=()=>{En.clear()};var ca=({id:e="",unWatchArray:t=[]})=>{let r=W.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&W.set(e,{...r,parentPropsWatcher:[...o,...t]})},vf=({id:e=""})=>{if(!e||e==="")return;(W.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var Tf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Ie.extractkeyFromProp(s)):(Ie.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Ie.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return xt.set(n,{...o,componentId:"",propsId:n}),n},la=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=ir(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!W.has(e))return;let l=jt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{Sn(e,d,f,{emit:n})})},Sf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=xt.get(e);o&&(xt.set(e,{...o,componentId:r}),vs.set(r,e),Bl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Bl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=vs.get(e);if(!o)return;r&&vs.delete(e);let n=xt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!wh()&&(await Rt(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!xh()&&(await kt(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>Mt(a,d,async()=>{if(await Rt(),await kt(),l)return;let f=Cn({state:d,id:e,type:Md});l=!0,u.useNextLoop(()=>{la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ca({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of xt){let{componentId:h}=f;h===e&&xt.delete(d)}},_f=()=>{xt.clear(),vs.clear()};var ar=({id:e,container:t})=>{let o=W.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=W.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){pt({id:s});return}else ar({id:c,container:t})})};var Vl=new Map,Nw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ie.extractkeyFromProp(r)),Pw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Ie.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Ie.getCurrentDependencies()),wf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Nw(i):Pw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Vl.set(s,n),s},If=e=>{[...e.querySelectorAll(`[${hn}]`)].forEach(r=>{let o=r.getAttribute(hn);if(!o)return;let n=Vl.get(o);n&&(r.removeAttribute(hn),Aw({data:n,element:r}),Vl.delete(o))})},xf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},Cf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Ef=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Aw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=Tn({id:o}),f=vn({id:o});return[...new Set([...i,...d,...f])].map(v=>(a&&u.useFrame(()=>{xf({ref:r,data:a})}),c&&u.useFrame(()=>{Cf({ref:r,data:c})}),l&&u.useFrame(()=>{Ef({ref:r,data:l})}),Mt(o,v,async()=>{if(await Rt(),await kt(),r.deref()&&!r.deref()?.isConnected){s.forEach(b=>{b&&b()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&xf({ref:r,data:a}),c&&r.deref()&&Cf({ref:r,data:c}),l&&r.deref()&&Ef({ref:r,data:l}),p=!1})}))})))})};var Mf=({element:e})=>{let t=e.querySelectorAll(`[${rr}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(rr),i=n.getAttribute(Er);if(n.removeAttribute(rr),n.removeAttribute(Er),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Ow=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],$w=({refs:e,refName:t,element:r})=>({...e,[t]:Ow([...e[t],r])}),kf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=W.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?$w({refs:i,refName:t,element:o}):{...i,[t]:[o]};W.set(n,{...s,refs:a})})})},Wl=({id:e})=>{let t=W.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return W.set(e,{...t,refs:n}),n},Rf=({id:e})=>{let t=Wl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Nf=document.createElement("div"),Pf=({element:e})=>{Nf=e},ua=()=>Nf;var xs=new Map,Oo=new WeakMap,jl=[],Af=[],Of=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return xs.set(r,t),r},Lw=e=>{let t=e?.parentNode;for(;t;){if(Oo.has(t))return{target:t,data:Oo.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Dw=e=>Oo.get(e)?{target:e,data:Oo.get(e)}:Lw(e);async function Fw(e,t){let r=t?.target;if(!r||!aa())return;ia(),await Ir(),sa();let{target:o,data:n}=Dw(r);if(!n||!document.contains(o))return;let s=n.find(({event:l})=>l===e);if(!s)return;let{callback:i}=s,a=_d({element:o}),c=a?jt({id:a}):or;Object.defineProperty(t,"target",{value:o}),Object.defineProperty(t,"currentTarget",{value:r}),i(t,c?.current,c?.index)}var $f=async e=>{await Rt(),await kt(),[...e.parentNode?.querySelectorAll(`[${tr}]`)??[]].forEach(n=>{let s=n.getAttribute(tr)??"";n.removeAttribute(tr);let i=xs.get(s);xs.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l;return jl.includes(p)||jl.push(p),{event:p,callback:d}}));Oo.set(n,a)});let o=ua();jl.forEach(n=>{Af.includes(n)||(Af.push(n),o.addEventListener(n,Fw.bind(null,n)))})};var wn="repeater",pa="invalidate",ro=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===wn?Y.entries():ge.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Il({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===wn?[h]:h})}return i};var Lf=({id:e,repeatId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);Y.has(t)&&Y.delete(t),Ze.set(e,o)};var oo=({id:e,repeatParent:t})=>{ro({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:wn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Lf({id:e,repeatId:n})})};var ma=({repeatParent:e,id:t})=>{if(!e)return;ro({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:wn}).forEach(({initializeModule:o})=>{o()})};var Df=({invalidateId:e,unsubscribe:t})=>{let r=ge.get(e);r&&ge.set(e,{...r,unsubscribe:t})};var Ff=({id:e,invalidateId:t})=>{if(!Qe.has(e))return;let r=Qe.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);ge.has(t)&&ge.delete(t),Qe.set(e,o)};var no=({id:e,invalidateParent:t})=>{ro({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:pa}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Ff({id:e,invalidateId:n})})};var zl=({id:e})=>{if(!ge.has(e))return;if(Xr.has(e)){let r=Xr.get(e);r?.removeCustomComponent(),r?.remove(),Xr.delete(e)}return ge.get(e)?.element};var da=({invalidateParent:e,id:t})=>{if(!e)return;ro({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:pa}).forEach(({initializeModule:o})=>{o()})};var Bf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=gn({element:zl({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;yn({id:n,prop:d});let h=zl({id:s}),v=Cn({state:d,id:n,type:El}),b=Ch({state:d,id:n,type:El});c=!0,u.useNextLoop(async()=>{if(!h){Yr({id:n,prop:d});return}await t(),no({id:n,invalidateParent:h}),oo({id:n,repeatParent:h}),ar({id:l??n,container:h}),h.textContent="",to({stringDOM:a(),parent:h,position:"afterbegin"}),de.set(gt,{element:h,parentId:l??n,persistent:i,source:ld},{emit:!1}),await de.emitAsync(gt),pn(),c=!1,v(),b(),da({invalidateParent:h,id:n}),ma({repeatParent:h,id:n}),Yr({id:n,prop:d}),r()})}));Df({invalidateId:s,unsubscribe:p})};var Vf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ie.extractkeyFromProp(r));var Wf=({invalidateId:e,initializeModule:t})=>{let r=ge.get(e);r&&ge.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var jf=({invalidateId:e})=>{let t=ge.get(e);t&&ge.set(e,{...t,initialized:!0})};var zf=({invalidateId:e,scopeId:t,observe:r})=>{ge.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Hf=({repeatId:e,unsubscribe:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,unsubscribe:t})};var In=new Set,Uf=({id:e,state:t,container:r})=>{In.add({id:e,state:t,container:r})},Gf=({id:e,state:t,container:r})=>{r&&In.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&In.delete(o)})},qf=({id:e="",state:t="",container:r})=>[...In].some(n=>e===n.id&&t===n.state&&r===n.container);var Yf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Xf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Jf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Kf=({current:e,previous:t,key:r})=>Jf({arr:e,key:r})&&Jf({arr:t,key:r}),ha=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),fa=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=jt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=jt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var Mn=new Map,ga=(e={})=>{let t=u.getUnivoqueId();return Mn.set(t,e),t},ba=(e="")=>{let t=Mn.get(e);return Mn.delete(e),t??{}};var Qf=()=>{Mn.clear()};var ya=(e={})=>`${dn}="${ga(e)}"`,va=(e,t,r)=>Math.min(Math.max(e,t),r);var Hl=({repeatId:e})=>{let t=Y.get(e);return t?t.currentData:[]};var Bw="index",$o=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Hl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){Ie.setCurrentDependencies(e);let f=Hl({repeatId:s}),h=Math.max(f?.length-1,0);if(d===Bw){if(t){let v=f?.findIndex(b=>b[r]===o);return va(v,0,h)}return va(n,0,h)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[va(n,0,h)],c??l)},set(){return!1}})};var Zf=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=$o({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),v=zt();ut(!0);let b=i.createContextualFragment(h);if(ut(v),!1){let T=Jr(b,!1).map(x=>new WeakRef(x));oa({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return na({components:qi(),current:p,index:d,observe:n,repeatId:s,key:void 0}),b.firstElementChild}).filter(c=>c!==null)},Vw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Zt}="${Ao({current:t,index:e})}"
    ${er}="${r}" ${Wt}="${o}"`,eg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=$o({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Vw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),tg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=zt();ut(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(ut(c),!1){let p=Jr(l,!1).map(d=>new WeakRef(d));oa({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return na({components:qi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Ww=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${er}="${o}"
    ${Zt}="${Ao({current:r,index:t})}"
    ${Wt}="${n}"`,rg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Ww({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},og=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=$o({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=zt();ut(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(ut(d),!1){let h=Jr(f,!1).map(v=>new WeakRef(v));oa({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return na({components:qi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ng=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Zt}="${Ao({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${er}="${r}"
                            ${Wt}="${o}"`,p=$o({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Ta=({repeatId:e,id:t})=>{let r=Y.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=ir(t)[n];Y.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Cs=({repeatId:e})=>{let t=Y.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var kn=({repeatId:e,currentData:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,currentData:t})};var jw=({element:e,container:t})=>{let r=Bd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},sg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=ha({data:t,key:n});kn({repeatId:a,currentData:l});let p=Yf(r,l,n),d=p.map(T=>{let x=T?.[n];return _l({keyValue:x,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let x=T[0].element,S=T[0].id;if(!S)return;let C=bs({id:S}),E=C??x;no({id:s,invalidateParent:E}),oo({id:s,repeatParent:E}),T.forEach(({id:w})=>{pt({id:w})}),C&&C.remove()}),f||Cs({repeatId:a}).filter(S=>p.map(C=>C?.[n]).includes(S.value?.[n])).forEach(S=>{let{element:C}=S;no({id:s,invalidateParent:C}),oo({id:s,repeatParent:C}),ar({id:s,container:C})});let h=Xf(l,r,n).map(({keyValue:T,isNewElement:x,index:S})=>{if(x)return{keyValue:T,isNewElement:x,index:S,wrapper:void 0};let C=_l({keyValue:T,repeatId:a}),E=C[0]?.element?bs({id:C[0]?.id??""}):Cs({repeatId:a}).find(M=>M.value?.[n]===T)?.element;return{keyValue:T,isNewElement:x,index:S,persistentElement:C,persistentDOMwrapper:E}});o.replaceChildren();let v=document.createRange(),b=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:x,index:S,persistentElement:C,persistentDOMwrapper:E})=>{if(!T){let{debug:P}=Nt();E&&b.append(E);let L=C?.[0]?.element;!E&&L&&(b.append(L),P&&jw({element:C[0]?.element,container:o}));return}let w=l?.[S],M=c?rg({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:x,render:i}):tg({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:x,render:i}),O=zt();if(ut(!0),c){let P=v.createContextualFragment(M);b.append(P)}!c&&M&&b.append(M),ut(O)}),o.append(b),l};var zw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},ig=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{kn({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?eg({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):Zf({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&to({stringDOM:f,parent:o,position:"beforeend"}),a||Ss({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=fa({children:c});f.filter((x,S)=>S>=t.length).forEach(x=>{x.forEach(S=>{let C=fs({id:S}),E=bs({id:S}),w=E??C;no({id:i,invalidateParent:w}),oo({id:i,repeatParent:w}),pt({id:S}),E&&E.remove()})});let{debug:v}=Nt();if(v&&zw(o),f.length>0)return t;let b=Cs({repeatId:s});if(!b)return t;b.filter(({index:x})=>x>=t.length).forEach(x=>{let{element:S}=x;no({id:i,invalidateParent:S}),oo({id:i,repeatParent:S}),ar({id:i,container:S}),S.remove()})}return t};var ag=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let v=(Kf({current:o,previous:n,key:s})?sg:ig)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return de.set(gt,{element:r,parentId:a??i,persistent:t,source:cd},{emit:!1}),await de.emitAsync(gt),pn(),v};var cg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=fs({id:c}),h=gs({id:l}),v=h?gn({element:h})??"":"";return i(),o(e,async(T,x)=>{if(!u.checkType(Array,T))return;let S=gs({id:l}),C=Cn({state:e,id:c,type:Cl}),E=Ih({state:e,id:c,type:Cl});if(yn({id:c,prop:e}),qf({id:c,state:e,container:S})){Yr({id:c,prop:e}),t(e,x,{emit:!1}),C(),E();return}let M=xl({id:c,repeatId:l});f&&await s(),n&&(M.forEach(j=>{pt({id:j})}),S&&(S.textContent="")),S&&Uf({id:c,state:e,container:S});let O=await ag({state:e,persistent:r,repeaterParentElement:S??document.createElement("div"),current:T,previous:n?[]:x,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:d,currentChildren:n?[]:M}),P=xl({id:c,repeatId:l}),L=a&&a!=="",D=fa({children:P,previousChildren:M}),$=L?[...Nd({children:D,key:a,current:T,currentUnivoque:O})]:D;$.forEach((j,I)=>{j.forEach(R=>{let N=O?.[I];if(!N)return;let _=L?T.findIndex(k=>`${k?.[a]}`==`${O?.[I]?.[a]}`):I;Wi({id:R,value:{current:N,index:_}})})}),u.useNextLoop(async()=>{f&&i(),Gf({id:c,state:e,container:S}),Yr({id:c,prop:e}),C(),E(),da({invalidateParent:S,id:c}),ma({repeatParent:S,id:c}),$.length===0&&Ta({repeatId:l,id:c})})})};var lg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=cg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});Hf({repeatId:e,unsubscribe:h})};var ug=({repeatId:e,initializeModule:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var pg=({repeatId:e})=>{let t=Y.get(e);t&&Y.set(e,{...t,initialized:!0})};var mg=({repeatId:e,initialDOMRender:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,initialRenderWithoutSync:t})};var dg=({repeatId:e,scopeId:t,observe:r})=>{Y.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var hg=({repeatId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{repeatId:e}])};var fg=({invalidateId:e,scopeId:t})=>{let r=Qe.get(t)??[];Qe.set(t,[...r,{invalidateId:e}])};var gg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:v,position:b="afterbegin",clean:T=!0})=>{T&&(ar({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(b,v),de.set(gt,{element:h,parentId:c,persistent:Hi(c),source:ud},{emit:!1}),await de.emitAsync(gt),pn()},getChildren:h=>ji({id:c,componentName:h}),freezeProp:h=>{let v=Ie.extractkeyFromProp(h);return yn({id:c,prop:v.toString()})},unFreezeProp:h=>{let v=Ie.extractkeyFromProp(h);return Yr({id:c,prop:v.toString()})},unBind:()=>vf({id:c}),bindProps:h=>{let v="props"in h?h:{props:h};return`${Di}="${Tf({...v,parentId:c})}" `},staticProps:h=>` ${dn}="${ga(h)}" `,remove:()=>{pt({id:c})},removeDOM:h=>{ar({id:c,container:h}),h.textContent=""},getParentId:()=>ys(c),watchParent:(h,v)=>{let b=Mt(ys(c),h,v);b&&ca({id:c,unWatchArray:[b]})},onMount:h=>hf({id:c,cb:h}),bindEvents:h=>`${Fi}="${gf(h)}"`,delegateEvents:h=>`${tr}="${Of(h)}"`,bindEffect:h=>`${hn}="${wf({data:h,id:c})}"`,addMethod:(h,v)=>{zd({id:c,name:h,fn:v})},setRef:h=>`${rr}="${c}" ${Er}="${h}"`,getRef:()=>Rf({id:c}),getRefs:()=>Wl({id:c}),bindText:(h,...v)=>{let b=u.getUnivoqueId(),T=()=>Ph(c,h,...v);return Mh(b,{id:c,render:T,props:v}),`<mobjs-bind-text ${Io}="${c}" ${$i}="${b}"></mobjs-bind-text>${T()}`},bindObject:(h,...v)=>{let b=Fh(v),T=u.getUnivoqueId(),x=()=>Bh(h,...v);return Lh(T,{id:c,keys:b,render:x}),`<mobjs-bind-object ${Io}="${c}" ${Li}="${T}"></mobjs-bind-object>${x()}`},invalidate:({observe:h,render:v,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let x=Vf(h),S=u.getUnivoqueId(),C=`${Bi}=${S}`,E=()=>v(),w=!1;return fg({invalidateId:S,scopeId:c}),zf({invalidateId:S,scopeId:c,observe:x}),Wf({invalidateId:S,initializeModule:()=>{w||(Bf({observe:x,watch:a,beforeUpdate:b,afterUpdate:T,persistent:Hi(c),id:c,invalidateId:S,renderFunction:E}),w=!0,jf({invalidateId:S}))}}),`<mobjs-invalidate ${C} style="display:none;"></mobjs-invalidate>${E()}`},repeat:({observe:h,clean:v=!1,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{},key:x="",render:S,useSync:C=!1})=>{let E=Ie.extractkeyFromProp(h),w=u.getUnivoqueId(),M=x!=="";hg({repeatId:w,scopeId:c}),dg({repeatId:w,scopeId:c,observe:E});let O=e()?.[E],P=M?ha({data:O,key:x}):O;kn({repeatId:w,currentData:P});let L=C?ng({currentUnique:P,key:x,observe:E,repeatId:w,hasKey:M,render:S}):"",D=C?[]:og({currentUnique:P,render:S,observe:E,repeatId:w,key:x,hasKey:M}),$=!1;return mg({repeatId:w,initialDOMRender:D}),ug({repeatId:w,initializeModule:()=>{$||(lg({repeatId:w,persistent:Hi(c),state:E,setState:t,emit:n,watch:a,clean:v,beforeUpdate:b,afterUpdate:T,key:x,id:c,render:S,useSync:C}),$=!0,pg({repeatId:w}),yd({repeatId:w})||Ta({repeatId:w,id:c}))}}),`<mobjs-repeat ${Vi}="${w}" style="display:none;"></mobjs-repeat>${L}`}});var Ul=({componentName:e,currentProps:t={}})=>{let o=Po()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var bg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=gn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),v=ba(h),b={...e.dataset},T=e.getRepeaterPropBind(),x=lf(l);return{element:e,props:{...Ul({componentName:f,currentProps:b}),...Ul({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:x,parentId:s,componentRepeatId:p}};var yg=e=>{bn.add(e)};var vg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=or,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:v=[],persistent:b=!1,child:T={},parentId:x="",id:S="",componentName:C=""})=>{let E=u.createStore(o);th({props:r,store:E}),n&&E.bindStore(n),b||yg(S),p&&p.length>0&&gd({componentId:S,repeatId:p}),t&&t.length>0&&Ld({instanceName:t,id:S});let w=Hh({componentName:C}),M=new Set(w);return E.setProxiReadOnlyProp(w),W.set(S,{element:e,componentName:C,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:b,id:S,parentId:x,freezedPros:v,child:T,state:E}),{getState:()=>E.get(),setState:(O="",P={},{emit:L=!0}={})=>{let D=ko({id:S,prop:O}),$=Ie.extractkeyFromProp(O),j=M.has($);j&&Ui({prop:$,componentName:C,action:"updateState"}),!(D||j)&&E.set($,P,{emit:L??!0,usePropAsString:!0})},updateState:(O="",P=()=>{},{emit:L=!0,clone:D=!1}={})=>{let $=ko({id:S,prop:O}),j=Ie.extractkeyFromProp(O),I=M.has(j);I&&Ui({prop:j,componentName:C,action:"updateState"}),!($||I)&&E.update(j,P,{emit:L??!0,clone:D??!1,usePropAsString:!0})},getProxi:()=>E.getProxi(),emit:(O="")=>E.emit(O),emitAsync:async(O="")=>await E.emitAsync(O),computed:(O="",P=()=>{},L=[])=>{let D=Ie.extractkeyFromProp(O);if(M.has(D)){Ui({prop:D,componentName:C,action:"computed"});return}return E.computed(D,P,L,{usePropAsString:!0})},watch:(O="",P=()=>{},{wait:L=!1,immediate:D=!1}={})=>E.watch(O,P,{wait:L??!1,immediate:D??!1}),debug:()=>E.debug()}};var Tg=({id:e})=>(Qe.get(e)??[]).map(({invalidateId:r})=>{let o=ge.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Sg=({id:e})=>(Ze.get(e)??[]).map(({repeatId:r})=>{let o=Y.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var _g=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Ur})=>{let{debug:n}=Nt();n&&console.log("parse source:",o);let s=Po(),i=[],a=$l({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:v,bindStore:b}=h,{props:T,id:x,componentName:S,instanceName:C,key:E,dynamicPropsId:w,currentRepeatValue:M,bindEventsId:O,parentId:P,componentRepeatId:L,repeatPropBind:D}=bg({element:l,parentIdForced:r}),$=h?.state??{},{getState:j,setState:I,updateState:R,getProxi:N,emit:_,emitAsync:k,computed:A,watch:F,debug:B}=vg({element:l,props:T,state:$,id:x,componentName:S,instanceName:C,key:E,repeatPropBind:D,persistent:t,parentId:P,componentRepeatId:L,bindStore:b});rh({id:x}),L&&L?.length>0&&(Wi({id:x,value:M}),Rd({id:x,repeatId:L,element:l})),Sf({propsId:w,repeatPropBind:D,componentId:x});let Q=gg({getState:j,setState:I,updateState:R,getProxi:N,emit:_,emitAsync:k,computed:A,watch:F,id:x,key:E,bindEventsId:O,debug:B}),H=await f(Q),J=l.classList,{newElement:q}=uf({content:H,element:l});if(fh(),J.length>0&&q?.classList.add(...J),!0,!q)return;Sd({id:x,newElement:q});let te=Tg({id:x}),re=Sg({id:x});O&&bf({element:q,componentId:x,bindEventsId:O});let ae=v??Nt().scoped;ae&&await Ll({id:x,element:q}),q?.inizializeCustomComponent?.(Q),i.push({onMount:async()=>{ae||await Ll({id:x,element:q})},initializeBindPropsWatcher:()=>{Bl({componentId:x,repeatPropBind:D,inizilizeWatcher:!0})},fireInvalidateFunction:te.length>0?()=>{te.forEach(({initializeModule:Oe})=>{Oe?.()})}:()=>{},fireRepeatFunction:re.length>0?()=>{re.forEach(({initializeModule:Oe})=>{Oe?.()})}:()=>{}});let ye=$l({element:e,currentSelectors:c});c=ye.parseSourceArray,l=ye.componentToParse;let Ae=Ol()===Nt().maxParseIteration;if(pf(),Ae){console.warn(`dom parse reached max parse limit: ${Ol()}`);break}}let p=Mf({element:e});Object.keys(p).length>0&&kf(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:v,fireRepeatFunction:b}=d;await f(),b(),v(),h()}i.length=0,c.length=0,l=null,$f(e),If(e),Ah(),Vh()};var Es=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Ur})=>{await _g({element:e,persistent:t,parentIdForced:r,source:o}),mf()},xg=()=>{de.watch(gt,async({element:e,parentId:t,persistent:r=!1,source:o=Ur})=>{await Es({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Cg=()=>{Qf(),yf(),_f()};var Eg,wg,Ig=({fn:e})=>{e&&(wg=e)},Mg=({fn:e})=>{e&&(Eg=e)},kg=()=>wg,Rg=()=>Eg;var Ng=!0,Pg=e=>{Ng=e},Ag=()=>Ng;var Og=()=>{for(let e of bn)pt({id:e})};var $g=new Map,Lg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Dg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{de.set(Qt,!0),await Ir();let s=zi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=de.get(),c=Lg({route:e,params:o}),l=Lg({route:i.route,params:a}),p=window.scrollY;$g.set(l,p);let d=$g.get(c)??0;de.set(wo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=de.watch(wo,()=>{f=!0});Cg(),de.set(cn,{route:e,templateName:t}),de.set(ln,o);let v=_n({hash:e}),b=n||v?.skipTransition,T=v?.props??{},x=await v?.layout?.({params:o,props:T})??"",S=kg(),C=s.cloneNode(!0);S&&C&&!b&&(await S({oldNode:C,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(C,s)),s.replaceChildren(),Og(),to({stringDOM:x,parent:s,position:"afterbegin"}),await Es({element:s}),b||(s.style.visibility=""),f||de.set(un,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Ag()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let E=Rg();E&&!b&&(await E({oldNode:C,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),C.remove()),C=null,h?.(),de.set(Qt,!1)};var Fg=({route:e})=>e,Bg=e=>{Fg=e},Vg=({route:e})=>{let t=Fg({route:e});return{route:t,isRedirect:t!==e}};var Wg=({hash:e=""})=>{let t=ra(),r=of();return e===""?t:_n({hash:e})?e:r},jg=({hash:e=""})=>_n({hash:e})?.templateName??"",zg=({hash:e=""})=>_n({hash:e})?.restoreScroll??!0;var Hg="",Ug=!0,Mr="",Gg="",so,ql,ws,Jl=e=>e.replace("?","").replace("/",""),qg=e=>e.replace("#","").replace("/","").replace(".",""),Hw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Jl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Uw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&de.getProp(Qt)&&e.preventDefault()},{passive:!1});var Sa=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=de.get();if(o){globalThis.location.hash=Hg.replace("#","");return}ws||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Vg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Jl(i?.[1]??"");Gg=Mr,Mr=qg(i?.[0]??"");let c=Hw(so??a),l=so||Object.keys(a).length>0?`?${so??a}`:"";so=void 0;let p=Wg({hash:Mr}),d=jg({hash:Mr&&Mr.length>0?Mr:ra()}),f=Mr===Gg&&l.length===0&&!Ug;e&&!f&&(Hg=`#${Mr}${l}`,await Dg({route:p,templateName:d,isBrowserNavigation:zg({hash:Mr})&&!!ws,params:c,skipTransition:!!(ws??ql)})),e||(de.set(cn,{route:p,templateName:d}),de.set(ln,c)),ql=void 0,u.useNextLoop(()=>{Ug=!1})},Jg=()=>{Sa(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ws=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await eo(),Sa()})},Yg=({url:e,params:t,skipTransition:r})=>{if(!e||de.getProp(Qt))return;ql=r;let o=e.split("?"),n=qg(o?.[0]??""),s=Uw(t),i=Jl(o?.[1]??""),a=s??i;so=a.length>0?a:"",ws=void 0,globalThis.location.hash=so&&so.length>0?`${n}?${so}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Xg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Jh(d);let f=document.querySelector(e),h=await t();Bg(s),!(!r||!f)&&(Od({contentId:r}),Pf({element:f}),Mg({fn:l}),Ig({fn:c}),Pg(p),xg(),zh(),ef(o),tf({hash:i}),rf({hash:a}),to({stringDOM:h,parent:f,position:"afterbegin"}),$d(),Sa({shouldLoadRoute:!1}),await Es({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Jg())};var Kg=()=>ge.size;var Qg=()=>Y.size;var be={};So(be,{clamp:()=>tt,getDefault:()=>rI,mq:()=>nI,printDefault:()=>oI,setDefault:()=>tI});var Lo={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var he={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},ks="min",Zg="max",Xl="desktop",Rs="easeLinear",Is="default",Kl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Ql=10,Ms=.06,Zl="#ff0000",eu="#14df3b",tu=8,ru=10,ou=1e3,nu=!1,qw=!1,Jw=!1,Yw=.01,Xw=.06,eb=e=>{let t=We({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=We({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=We({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Kw(e?.mq??{}),s=We({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Xl,type:String}),i=We({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:ks,type:String}),a=We({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Ql,type:Number}),c=Yl(e?.sequencer?.ease,"sequencer"),l=We({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Is,type:String}),p=We({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ms,type:Number}),d=We({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Zl,type:String}),f=We({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:eu,type:String}),h=We({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:tu,type:Number}),v=We({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Is,type:String}),b=We({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ms,type:Number}),T=We({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:ru,type:Number}),x=Yl(e?.parallaxTween?.ease,"parallaxTween"),S=We({prop:"tween.duration",value:e?.tween?.duration,defaultValue:ou,type:Number}),C=Yl(e?.tween?.ease,"tween"),E=We({prop:"tween.relative",value:e?.tween?.relative,defaultValue:nu,type:Boolean}),w=We({prop:"spring.relative",value:e?.spring?.relative,defaultValue:qw,type:Boolean}),M=We({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Jw,type:Boolean}),O=We({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Yw,type:Number}),P=We({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Xw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:v,lerpConfig:b},parallaxTween:{duration:T,ease:x},tween:{duration:S,ease:C,relative:E},spring:{relative:w,config:e?.spring?.config?{...Lo,...e.spring.config}:Lo},lerp:{relative:M,precision:O,velocity:P}}},We=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Kw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Kl},Yl=(e,t)=>{let r=Object.keys(he).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Rs};var mt=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:mt(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=mt(Object.assign({},s),i,r):e[n]=i}),e)};function tb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Kl,defaultMq:{value:Xl,type:ks},sequencer:{duration:Ql,ease:Rs},scrollTrigger:{springConfig:Is,lerpConfig:Ms,markerColor:{startEnd:Zl,item:eu}},parallax:{defaultRange:tu,springConfig:Is,lerpConfig:Ms},parallaxTween:{duration:ru,ease:Rs},tween:{duration:ou,ease:Rs,relative:nu},spring:{relative:!1,config:Lo},lerp:{relative:!1,precision:.01,velocity:.06}}}var ue=(()=>{let e=tb();return{set:n=>{e=eb(mt(tb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Qw=(e="desktop")=>window.innerWidth<ue.get("mq")[e],Zw=(e="desktop")=>window.innerWidth>=ue.get("mq")[e],eI=(e="desktop")=>ue.get("mq")[e],fe={max:Qw,min:Zw,getBreackpoint:eI};var Te=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},tt=(e,t,r)=>Math.min(Math.max(e,t),r),rb=(e,t,r)=>(1-r)*e+r*t,io=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ns=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},ob=(e,t)=>e.map(r=>r[t]);function tI(e){ue.set(e)}function rI(e){return ue.get(e)}function oI(){ue.print()}function nI(e,t){switch(e){case"min":return fe.min(t);case"max":return fe.max(t);case"get":return fe.getBreackpoint(t)}}var U={};So(U,{createLerp:()=>TI,createMasterSequencer:()=>gI,createScrollerTween:()=>hI,createSequencer:()=>fI,createSpring:()=>vI,createStaggers:()=>bI,createTimeTween:()=>yI});var _a=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),kr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Rn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Rr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Nn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var su=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var xa="radial",cr="start";var Pn="center",An="edges",On="random",nb="MERGE_FROM_UP",iu="MERGE_FROM_DOWN",Do="equal",Fo="start";var Bo="center",$n={type:Do,each:0,waitComplete:!1,from:cr,grid:{col:1,row:1,direction:"col"}},Ge={index:0,frame:0};var y={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Nr=e=>e.map(t=>`${t} | `).join(""),ao=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Pt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Pr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},sb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},ib=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},ab=()=>{console.warn("relative prop is not allowed inside a timeline")},cb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},lb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},ub=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},pb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},mb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},db=()=>{console.warn("setTween fail")},hb=e=>{console.warn(`label ${e} not founded`)},fb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},gb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},au=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},bb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},yb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Vo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ca=()=>{console.warn("stagger each must be a Number ")},vb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Tb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Sb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var _b=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},xb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Cb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Eb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},wb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Ib=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Mb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},kb=()=>{console.warn("createStaggers error: items array can not be empty")},Rb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Nb=()=>{console.warn(`screateStaggers error: type should be: ${Do} || ${cr} || ${"end"} || ${Bo}`)},Pb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Ab=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},cu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Ob=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},$b=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Lb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Db=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Fb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Dn=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Bb=e=>{console.warn(`${e} value must be a string`)},Vb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Wb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},jb=e=>{console.warn(`${e} not found`)},zb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Hb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${y.DIRECTION_VERTICAL} | ${y.DIRECTION_HORIZONTAL}`)},Ub=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Gb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},qb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Jb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Nr(t)} or a Number between 0 and 100`)},Yb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Nr(t)}`)},Xb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Kb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Nr(t)}`)},Qb=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Nr(t)} or a custom css propierites like margin|line-height|...`)},Zb=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Nr(t)}`)},ey=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Nr(t)}`)},ty=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ry=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Nr(t)}`)},oy=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},ny=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},lu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Nr(t)}`)},sy=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},iy=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ay=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},cy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},ly=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},uu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Nr(r)}, es: 45deg|100px|50vw etc..`)},uy=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},py=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Ht={[he.easeLinear]:(e,t,r,o)=>r*e/o+t,[he.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[he.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[he.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[he.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[he.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[he.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[he.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[he.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[he.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[he.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[he.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[he.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[he.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[he.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[he.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[he.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[he.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[he.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[he.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[he.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[he.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[he.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[he.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[he.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[he.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[he.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[he.easeInBounce]:(e,t,r,o)=>r-Ht[he.easeOutBounce](o-e,0,r,o)+t,[he.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[he.easeInOutBounce]:(e,t,r,o)=>e<o/2?Ht[he.easeInBounce](e*2,0,r,o)*.5+t:Ht[he.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var bt=e=>e in Ht?Ht[e]:(Vo(e),Ht[ue.get("tween").ease]);var my=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",pu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),dy=e=>/^\d+\.\d+$|^\d+$/.test(e),Ne=(e,t)=>{let r=new RegExp(`^${my(t)}$`,"i");return(e.match(r)||[]).length},lr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},mu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),du=(e,t)=>e.some(r=>{let o=new RegExp(`^${my(r)}$`,"i");return(t.match(o)||[]).length});var hy=e=>e&&(Ne(e,y.PROP_VERTICAL)?y.PROP_VERTICAL:Ne(e,y.PROP_HORIZONTAL)?y.PROP_HORIZONTAL:Ne(e,y.PROP_ROTATE)?y.PROP_ROTATE:Ne(e,y.PROP_ROTATEY)?y.PROP_ROTATEY:Ne(e,y.PROP_ROTATEX)?y.PROP_ROTATEX:Ne(e,y.PROP_OPACITY)?y.PROP_OPACITY:Ne(e,y.PROP_SCALE)?y.PROP_SCALE:Ne(e,y.PROP_SCALE_X)?y.PROP_SCALE_X:Ne(e,y.PROP_SCALE_Y)?y.PROP_SCALE_Y:Ne(e,y.PROP_TWEEN)?y.PROP_TWEEN:e),fy=e=>{if(e){if(lr(e,y.PX))return y.PX;if(lr(e,y.VH))return y.VH;if(lr(e,y.VW))return y.VW}return""},Ea=e=>Ne(e,y.POSITION_TOP)?y.POSITION_TOP:Ne(e,y.POSITION_BOTTOM)?y.POSITION_BOTTOM:Ne(e,y.POSITION_LEFT)?y.POSITION_LEFT:Ne(e,y.POSITION_RIGHT)?y.POSITION_RIGHT:"",gy=e=>lr(e,y.PX)?y.PX:lr(e,y.VH)?y.VH:lr(e,y.VW)?y.VW:lr(e,y.WPERCENT)?y.WPERCENT:lr(e,y.HPERCENT)?y.HPERCENT:lr(e,y.DEGREE)?y.DEGREE:y.PX;var Ut=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ia=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||sb(e),o||ib(t),r&&o},co=e=>{let t=u.checkType(Number,e);return!t&&e&&Cb(e),t?e:ue.get("sequencer").duration},Ma=e=>{let t=u.checkType(Number,e);return!t&&e&&wb(e),t&&e?e:1},by=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?e:ue.get("sequencer").ease},yy=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?bt(e):bt(ue.get("parallaxTween").ease)},vy=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Ib(e),o||Mb(t),r&&o},Ty=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ca(),t},Sy=e=>{if(!e)return;let r=[cr,"end",Pn,An,On].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||xb(e),s},fu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||vb(e),t},_y=e=>{if(!e)return;let r=[xa,"row","col"].includes(e);return r||Sb(),r},xy=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Tb(),t},Cy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||kb(),t},Ey=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],wy=e=>{if(!e)return;let r=[Do,Fo,"end",Bo].includes(e);if(!r){Nb();return}return r};var lo=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Ab(e,t),r?e:ue.get(t).relative},ka=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?bt(e):bt(ue.get("tween").ease)},Ra=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?e:ue.get("tween").ease},gu=e=>{let{config:t}=ue.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&au(e),!s&&r&&yb(e),s?t[e]:t.default},Iy=e=>{let{config:t}=ue.get("spring"),r=e&&e in t;return!r&&e&&au(e),r},bu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&bb(),t?e:{}},yu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Eb(e),o?r:ue.get("tween").duration},At=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&cu(e,t),r&&e===!0},pe=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&cu(e,t),o?e:r},Na=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Ob(e,t),o?e:r},ur=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&$b(e,t),o?e:r},dt=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Lb(e,t),o?e:r},Pa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Db(),t?e:ue.get("lerp").velocity},Aa=e=>{let t=u.checkType(Number,e);return!t&&e&&Fb(),t?e:ue.get("lerp").precision},My=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Bb(t),r},As=e=>{let t=u.checkType(Number,e);return!t&&e&&Wb(),t?e:void 0},Os=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Vb(),t},ky=(e,t)=>{e===-1&&jb(t)},uo=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&ly(r,e),o?e:t},Ry=e=>{let t=u.checkType(Function,e);return!t&&e&&zb(e),t?e:({resolve:r})=>{r()}},Ny=e=>{let t=u.checkType(Array,e);return!t&&e&&ub(e),t},Py=e=>{let t=u.checkType(String,e);return!t&&e&&pb(e),t},Fn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},vu=e=>u.checkType(Element,e)?e:document.querySelector(e),$s=(e,t)=>{if(!e)return y.DIRECTION_VERTICAL;let o=[y.DIRECTION_VERTICAL,y.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Hb(e,t),o?e:y.DIRECTION_VERTICAL},Tu=(e,t)=>{let r=[y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT,y.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Ub(t),i?e:null},Ay=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Gb(),t?e:void 0},Oy=e=>{let t=e?.getType?.()&&(e.getType()===y.TWEEN_TWEEN||e.getType()===y.TWEEN_TIMELINE);return!t&&e&&qb(),t?e:{}},$y=e=>{if(!e&&e!==0)return y.ALIGN_CENTER;let t=[y.ALIGN_START,y.ALIGN_TOP,y.ALIGN_RIGHT,y.ALIGN_CENTER,y.ALIGN_BOTTOM,y.ALIGN_LEFT,y.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Jb(e,t),r?e:y.ALIGN_CENTER},Ly=e=>{if(!e)return!1;let t=[y.IN_BACK,y.IN_STOP,y.OUT_BACK,y.OUT_STOP],r=t.includes(e);return!r&&e&&Yb(e,t),r?e:!1},Su=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Xb(e,t),o?e:r},Dy=e=>{if(!e)return y.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[y.TYPE_PARALLAX,y.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Kb(t,r),o?t:y.TYPE_PARALLAX},Fy=(e,t)=>(()=>{if(t===y.TYPE_PARALLAX){let o=dy(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&oy(e),n?10-e:10-ue.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&ny(e),o?e:"0px"}})(),Wo=(e,t,r)=>{let o=ue.get("defaultMq").value;if(!e)return o;let n=ue.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&lu(e,s,t,r),i?e:o},jo=(e,t,r)=>{let o=ue.get("defaultMq").type;if(!e)return o;let n=[Zg,ks],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&lu(e,n,t,r),s?e:o},By=(e,t,r,o)=>{if(!e&&o)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===y.TYPE_SCROLLTRIGGER&&!e,s=[y.PROP_VERTICAL,y.PROP_HORIZONTAL,y.PROP_ROTATE,y.PROP_ROTATEY,y.PROP_ROTATEX,y.PROP_ROTATEZ,y.PROP_OPACITY,y.PROP_SCALE,y.PROP_SCALE_X,y.PROP_SCALE_Y,y.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&Qb(e,s);let a=t===y.TYPE_PARALLAX&&e===y.PROP_TWEEN&&!r;!r&&!o&&e===y.PROP_TWEEN&&ay(),(r||o)&&e!==y.PROP_TWEEN&&cy(),a&&sy();let c=a?y.PROP_VERTICAL:e,l=hy(c);return{propierties:i?l??y.PROP_VERTICAL:y.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Vy=e=>{if(!e)return y.EASE_LERP;let t=[y.EASE_SPRING,y.EASE_LERP],r=t.includes(e);r||Zb(e,t);let o=r?e:y.EASE_LERP;return r?e:o},Oa=(e,t)=>{let r=[y.EASE_SPRING,y.EASE_LERP],o=r.includes(e);return!o&&e&&ey(e,r,t),o?e:y.EASE_LERP},Wy=(e,t)=>{let r=t===y.TYPE_PARALLAX?ue.get("parallax").springConfig:ue.get("scrollTrigger").springConfig;if(!e)return r;let o=ue.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&ry(e,n),s?e:r},jy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&iy();let o=t===y.TYPE_PARALLAX?ue.get("parallax").lerpConfig:ue.get("scrollTrigger").lerpConfig;return r?e:o},zy=(e,t)=>{let r=[y.PX,y.VW,y.VH,y.WPERCENT,y.HPERCENT];if(t===y.PROP_VERTICAL||t===y.PROP_HORIZONTAL){let n=mu(r,e);return n||uu(e,t,r),n?e:"0px"}if(t===y.PROP_ROTATE||t===y.PROP_ROTATEX||t===y.PROP_ROTATEY||t===y.PROP_ROTATEZ){let n=mu([y.DEGREE],e);return n||uu(e,t,[y.DEGREE]),n?e:"0"}if(t===y.PROP_SCALE||t===y.PROP_SCALE_X||t===y.PROP_SCALE_Y){let n=pu(e);return n||py(e,t),n?e:"0"}let o=pu(e);return o||uy(t),o?e:"0"};var $a=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Ot=e=>({type:wy(e?.stagger?.type)?e.stagger.type:$n.type,each:Ty(e?.stagger?.each)?e.stagger.each:$n.each,from:Sy(e?.stagger?.from)?e?.stagger?.from:Fo,grid:{col:fu(e?.stagger?.grid?.col)?e.stagger.grid.col:$n.grid.col,row:fu(e?.stagger?.grid?.row)?e.stagger.grid.row:$n.grid.row,direction:_y(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:xy(e?.stagger?.waitComplete)?e.stagger.waitComplete:$n.waitComplete}),pr=(e,t)=>e.length>t.length?e:t;var Ls=e=>e%2,sI=e=>Math.floor(Math.random()*e),iI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},aI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=$a(s);if(n===On)return{index:e,frame:o[sI(o.length)]};if(n===cr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Pn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:0}:Ls(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===An){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Ls(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Ls(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Le(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Hy=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ns(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...ob(o,a)],[])].flat()}else return e},Uy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Hy(e,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),p=Hy(t,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Ns(c,d),h=f[0];return h.forEach((b,T)=>{let{index:x,frame:S}=aI(T,f[0].length,r,iI(h,r.each,T));b.index=x,b.frame=S,S>=o.frame&&(o={index:x,frame:S}),S<=n.frame&&(n={index:x,frame:S})}),f.forEach(b=>{b.forEach((T,x)=>{T&&(T.index=f[0][x].index,T.frame=f[0][x].frame)})}),f.flat().forEach((b,T)=>{c[T].index=b.index,c[T].frame=b.frame,p.length>0&&(p[T].index=b.index,p[T].frame=b.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var cI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),lI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)La(o,r+f,l)&&c.push(o[r+f][l]),La(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(La(o,r-f,l)&&c.push(o[r-f][l]),La(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),La=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,_u=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ns(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=cI(s,o,n),a=lI(i,o,n,s),c=i.reduce((h,v,b)=>{let T=[...i[b],...a[b]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?nb:iu)===iu?c.reduce((h,v,b)=>{if(b<n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n-(b-n)]??[],x=[...c[b],...T];return h.push(x),h}},[]):c.reduce((h,v,b)=>{if(b>n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n+(n-b)]??[],x=[...c[b],...T];return h.push(x),h}},[]).toReversed()).reduce((h,v)=>v.length===0?h:[...h,v],[])}};var uI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=_u(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=$a(r.each),v=d*h;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=_u(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},pI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[cr,"end",Pn,An,On];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(_b(),r.from=cr),Uy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},$t=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===xa?uI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):pI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Bn=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Vn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var Ds=u.createStore({id:0});var ht=(e,t)=>{let{id:r}=Ds.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Ds.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:c,frame:l})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:c,frame:l}))}},mr=(e,t,r,o)=>{let{id:n}=Ds.get(),{id:s,unsubscribe:i}=u.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let c=n;return Ds.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:l=>(i(),l.map(({id:p,cb:d,index:f,frame:h})=>(p===c&&(d=""),{id:p,cb:d,index:f,frame:h})))}};var po=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Wn=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),jn=(e,t)=>Object.keys(e).map(r=>{if(!Ut(t[r])||!Ut(e[r]))return Pr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Ar=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var zn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var mo=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Hn=(e,t,r,o)=>(u.checkType(Number,e)||Ca(),e>0&&t&&(r.length>0||o.length>0));var Da=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Pe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Un=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Gn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var qn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),xu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Gy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=rb(s,i,r/t*60),c=Te(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Or=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;constructor(t){this.#n=Ot(t??{}),this.#t=lo(t?.relative,"lerp"),this.#i=Pa(t?.velocity),this.#l=Aa(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#_=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Ge,this.#S=Ge;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Gy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Pe(this.#e,"currentValue");if(this.#m||Bn({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#_}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Pe(this.#e,"toValue");Vn({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S,useStagger:this.#_});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#R(){if(Hn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();mo("lerp",t);let r=pr(this.#h,this.#a);if(this.#n.grid.col>r.length){Pt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#k=i,this.#S=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#x&&(this.#y=!0,await this.#R(),this.#y=!1),zn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=_a(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Da((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=mt(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=lo(s,"lerp"),this.#i=Pa(o),this.#l=Aa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=po(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=Wn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#_=!0,!io(t,r))return ao("lerp goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!1;let o=Ar(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#_=!1;let o=Ar(t);this.#e=qn(o,this.#e);let{reverse:n}=this.#E(r??{});At(n,"reverse")&&(this.#e=Rr(t,this.#e)),this.#e=Nn(this.#e,this.#t),this.#e=kr(this.#e)}#N(t,r,o={}){this.#e=qn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(At(n,"reverse")&&(this.#e=Rr(r,this.#e)),this.#e=Nn(this.#e,this.#t),At(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=kr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Pe(this.#e,"currentValue")}getInitialData(){return Pe(this.#p,"currentValue")}getFrom(){return Pe(this.#e,"fromValue")}getTo(){return Pe(this.#e,"toValue")}getFromNativeType(){return Gn(this.#e)}getToNativeType(){return Un(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=Pa(t),this.#T=mt(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Aa(t),this.#T=mt(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Fa=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Fs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=yy(t?.ease),this.#t=co(t?.duration),this.#i=Ot(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=pr(this.#s,this.#u);if(this.#i.grid.col>t.length){Pt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=$t({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:Ge,fastestStagger:Ge});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,v=this.#n(t,f,h,this.#t);return{...n,currentValue:Te(v)}});let o=Pe(this.#l,"currentValue");u.useNextTick(()=>{Fa({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=po(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#s,this.#c);return this.#s=o,this.#c=s,()=>this.#s=n(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Bs=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var qy=(e,t)=>Object.keys(e).map(r=>Ut(e[r])?{prop:r,toValue:e[r],ease:bt(t)}:(Pr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:bt(t)})),Jy=(e,t)=>Object.keys(e).map(r=>Ut(e[r])?{prop:r,fromValue:e[r],ease:bt(t)}:(Pr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:bt(t)})),Yy=(e,t,r)=>Object.keys(e).map(o=>!Ut(t[o])||!Ut(e[o])?(Pr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:bt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:bt(r)});var je={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Cu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Xy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Cu[o].get]:n},void 0),Ky=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var Qy=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((x,{start:S,end:C,values:E},w)=>{let M=E.find(({prop:j})=>j===o.prop);if(!M||!M?.active||Object.keys(x).length>0||o.settled)return x;let{prop:O,toValue:P,fromValue:L,ease:D}=M;return Ky(e,w,O,r)?{toValue:P,fromValue:L,start:S,end:C,ease:D}:x},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,v=r>=s&&r<=i?l(r-s,d,p-d,f):h,b=Number.isNaN(v)?h:v,T=Te(b);return{...o,currentValue:T,settled:!0}});var Eu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Xy(e,o,c,s);return!p&&p!==0?a:{...a,[Cu[s].set]:p}});return{...r,values:i}});var wu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Ba=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=wu(a,"start");return wu(c,"priority")};var Va=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Vs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=co(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:by(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=Ot(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=pr(this.#d,this.#l);if(this.#g.grid.col>t.length){Pt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=$t({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Ge,fastestStagger:Ge});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=je.NONE}){if(o){this.#_({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#_({partial:t,isLastDraw:r,direction:n}))}#_({partial:t=0,isLastDraw:r=!1,direction:o=je.NONE}){this.#a&&(this.#o=t,this.#v(t)),!this.#a&&this.#o&&(!o||o===je.NONE)&&(this.#f=t>=this.#o?je.FORWARD:je.BACKWARD),!this.#a&&(o===je.BACKWARD||o===je.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=Qy({timeline:this.#t,valuesState:this.#n,partial:t});let n=Pe(this.#n,"currentValue");Fa({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#v(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:je.FORWARD},s={shouldFire:t<=o,direction:je.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===je.FORWARD&&t>o&&this.#o<=o,s=this.#f===je.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:Te(n*r),end:Te(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:Te(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Te(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=vy(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:bt(ue.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=qy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=Eu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=Jy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=Eu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ia({start:s,end:i}))return this;if(!io(t,r))return ao("sequencer goFromTo:",t,r),this;let c=Yy(t,r,a),l=Va({data:c,values:this.#n});return this.#t=Ba({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||fb(t),n||gb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#d,this.#c);return this.#d=o,this.#c=s,()=>this.#d=n(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Zy=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,v=a+h*1/s,b=Te(v),T=Math.abs(h)<=.1,x=t===0?!0:Math.abs(c-b)<=n;return T&&x?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:b,velocity:h,settled:!1}});var Gt=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;constructor(t){this.#n=Ot(t??{}),this.#t=lo(t?.relative,"spring"),this.#i=gu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#_=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Ge,this.#k=Ge;let r=t?.data;r&&this.setData(r)}#S(t,r,o,n,s,i){this.#d=!0,this.#r=Zy({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Pe(this.#r,"currentValue");if(this.#g||Bn({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=Pe(this.#r,"toValue");Vn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#S(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#S(t,r,o,n,s,i)}async#A(){if(Hn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();mo("spring",t);let r=pr(this.#a,this.#p);if(this.#n.grid.col>r.length){Pt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#A(),this.#v=!1),zn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=Rn(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#_||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#_=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#_&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#_=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=_a(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Da((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=mt(this.#r,this.#e)}#O(t){let o=ue.get("spring").config,n=Iy(t?.config)?o?.[t?.config??"default"]??Lo.default:this.#y.configProps,s=bu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=po(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Wn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!io(t,r))return ao("spring goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Ar(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Ar(t);this.#r=qn(o,this.#r);let{reverse:n}=this.#O(r??{});At(n,"reverse")&&(this.#r=Rr(t,this.#r)),this.#r=Nn(this.#r,this.#t),this.#r=kr(this.#r)}#E(t,r,o={}){this.#r=qn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(At(n,"reverse")&&(this.#r=Rr(r,this.#r)),this.#r=Nn(this.#r,this.#t),At(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=kr(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Pe(this.#r,"currentValue")}getInitialData(){return Pe(this.#e,"currentValue")}getFrom(){return Pe(this.#r,"fromValue")}getTo(){return Pe(this.#r,"toValue")}getFromNativeType(){return Gn(this.#r)}getToNativeType(){return Un(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=bu(t);this.#i={...this.#i,...r},this.#y=mt(this.#y,{configProps:r})}updateConfig(t){this.#i=gu(t),this.#y=mt(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#a,this.#o);return this.#a=o,this.#o=s,()=>this.#a=n(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var ev=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Te(s)}}return{...n,currentValue:n.fromValue}});var $r=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;constructor(t){this.#n=ka(t?.ease),this.#t=yu(t?.duration),this.#i=lo(t?.relative,"tween"),this.#l=Ot(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#_=0,this.#v=0,this.#y=!0,this.#T=!0,this.#k=!1,this.#S=!1,this.#w={duration:this.#t,ease:Ra(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=Ge,this.#R=Ge;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#x-this.#_),this.#_=t-this.#x-this.#v,Math.round(this.#_)>=this.#t&&(this.#_=this.#t),this.#e=ev({values:this.#e,timeElapsed:this.#_,duration:this.#t,ease:this.#n});let r=Math.round(this.#_)===this.#t,o=Pe(this.#e,"currentValue");if(this.#m||Bn({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Vn({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(Hn(this.#l.each,this.#y,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();mo("tween",t);let r=pr(this.#h,this.#a);if(this.#l.grid.col>r.length){Pt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#R=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#S||(this.#s=t,this.#c=r,this.#y&&(this.#S=!0,await this.#N(),this.#S=!1),zn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=mt(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=ka(o),this.#i=lo(s,"tween"),this.#t=yu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=po(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Wn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!io(t,r))return ao("tween goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Ar(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Ar(t),n=r?{...r,duration:1}:{duration:1};this.#e=xu(o,this.#e);let{reverse:s}=this.#D(n);At(s,"reverse")&&(this.#e=Rr(t,this.#e)),this.#e=su(this.#e,this.#i),this.#e=kr(this.#e)}#B(t,r,o={}){this.#e=xu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(At(n,"reverse")&&(this.#e=Rr(r,this.#e)),this.#e=su(this.#e,this.#i),At(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=kr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Pe(this.#e,"currentValue")}getInitialData(){return Pe(this.#p,"currentValue")}getFrom(){return Pe(this.#e,"fromValue")}getTo(){return Pe(this.#e,"toValue")}getFromNativeType(){return Gn(this.#e)}getToNativeType(){return Un(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=ka(t),this.#w=mt(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var mI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=Te(o*d),h=Te(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Te(p),end:Te(i+p)}},dI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Fo)return{start:0,end:Te(e-(i-c))};if(n===Bo){let l=(i-c)/2;return{start:Te(l),end:Te(e-l)}}return n==="end"?{start:Te(i-c),end:Te(e)}:{start:0,end:e}},tv=e=>{let t=Ey(e?.items),r=Ot(e),o=co(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,v)=>({item:h,start:0,end:o,index:v}));if(!Cy(t))return i;r.grid?.col>t.length&&(Pt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Pb(n),s=1);let{staggerArray:a}=$t({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:Ge,fastestStagger:Ge}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Rb(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,v)=>h-v),d=p.length;return c.map(({item:h,frame:v})=>{let b=p.indexOf(v),T=s*d/n,{start:x,end:S}=r.type===Do?mI({each:s,duration:o,numItem:d,index:b,eachByNumItem:T}):r.type===Fo||r.type==="end"||r.type===Bo?dI({duration:o,numItem:d,index:b,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:x,end:S,index:b}})};function hI(e){return new Fs(e)}function fI(e){return new Vs(e)}function gI(){return new Bs}function bI(e){return tv(e)}function yI(e){return new $r(e)}function vI(e){return new Gt(e)}function TI(e){return new Or(e)}var Me={};So(Me,{createAsyncTimeline:()=>_I,createSyncTimeline:()=>SI});var ee=()=>{},Wa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var ja=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var ho=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?ja({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Iu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):ee;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Ws=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=Ma(t?.repeat),this.#t=pe(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=pe(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=pe(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=pe(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=pe(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#_=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#S=!0,this.#w=0,this.#A=0,this.#R=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=ja({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:v}=a,b={...h};delete b.delay;let{active:T,index:x}=this.#a,S=Number.isNaN(x)?!1:T&&x&&this.#g<x;S&&(b.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,ab()),this.#E.push({id:v,action:p});let C=r.find(({id:w,action:M})=>w===v&&M===p),E={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,b)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,f,b)),add:()=>C?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(S){w({resolve:!0});return}let M=this.getDirection();l({direction:M,loop:this.#m}),w({resolve:!0})}),addAsync:()=>{this.#k=!0;let w=this.#w;return C?new Promise(M=>M({resolve:!0})):new Promise((M,O)=>{if(S){M({resolve:!0});return}let P=this.getDirection();l({direction:P,loop:this.#m,resolve:()=>{if(w===this.#w){M({resolve:!0});return}O()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(C)return new Promise(O=>O({resolve:!0}));let w=u.checkType(Boolean,l());w||cb(l);let M=w?l():!0;return new Promise(O=>{!S&&M&&(this.#T=!0),O({resolve:!0})})}};return new Promise((w,M)=>{let O=S?!1:h?.delay,P=this.#w;if(O){let L=u.getTime();requestAnimationFrame(()=>{this.#L({start:L,deltaTimeOnpause:0,delay:O,mainReject:M,mainResolve:w,previousSessionId:P,tween:c,stepFunction:E,action:p})});return}Iu({mainReject:M,mainResolve:w,isStopped:()=>this.#S,isInPause:()=>this.#y,addToActiveTween:L=>this.#Y(L),currentSessionId:()=>this.#w,previousSessionId:P,tween:c,stepFunction:E,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#S)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=ho({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,v)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#S=!0,this.#B&&tn.add(()=>{It.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#y&&(r=p-this.#R),d-r>=o||this.#S||this.#x){Iu({mainReject:n,mainResolve:s,isStopped:()=>this.#S,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#_)&&this.#H(),this.#_=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return ee;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(lb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=this.#d?ho({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=ho({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=ho({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Os(t))return this;n.delay=As(n?.delay);let s=this.#d?ho({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=ee){let r=uo(t,()=>{},"timeline add function");return this.#f?(Dn("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Ry(t);return this.#f?(Dn("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(Dn("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(Dn("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(Dn("label"),this):My(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=ho({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Ny(r),n=Py(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(mb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=ho({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{db()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#v&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&ky(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#S=!1,this.#v&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#S=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#S=!1,l&&(this.#_=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#S=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#_=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#H(),this.#v=!1,this.#i||this.#$()}pause(){this.#y||(this.#y=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#S}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#S?je.NONE:this.#v?je.BACKWARD:je.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var js=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;constructor(t={}){this.#n=co(t?.duration),this.#t=pe(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Ma(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#_=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#k=[],this.#S=[],this.#w=[],this.#A=void 0,this.#R=void 0}#O(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#y||(this.#s=tt(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#_=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#v&&!this.#_&&this.#o>this.#g&&(this.#_=!0,this.#f++,this.#o=0,this.#k.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#S.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||hb(t),r.time}#b(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#v=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#v=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();mo("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?je.NONE:this.#p?je.BACKWARD:je.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#S.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#S=this.#S.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#S=[]}};function SI(e){return new js(e)}function _I(e){return new Ws(e)}var ze={};So(ze,{createParallax:()=>MI,createScrollTrigger:()=>kI});var xI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?y.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?y.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?y.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?y.ON_ENTER:y.ON_NOOP;function rv({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[y.ON_LEAVE]:()=>{s&&s()},[y.ON_ENTER_BACK]:()=>{n&&n()},[y.ON_LEAVE_BACK]:()=>{i&&i()},[y.ON_ENTER]:()=>{o&&o()},[y.ON_NOOP]:()=>{}})[xI({prevValue:e,value:t,maxVal:r})]()}var CI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},EI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},wI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===y.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},II=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===y.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},ov=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=CI({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=EI({screen:n}),v=wI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),b=II({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ue.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...b})}),{startMarker:c,endMarker:l}};var nv=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ue.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===y.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var za=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=y.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#_=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#S=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#H=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===y.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#_=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===y.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Gt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===y.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=nv({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===y.DIRECTION_VERTICAL?wt(this.#f).top:wt(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#_(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===y.DIRECTION_VERTICAL?wt(this.#a).top-this.#i:wt(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===y.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===y.DIRECTION_VERTICAL?wt(this.#o).left:wt(this.#o).top,r=this.#c===y.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#S.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#S.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:tt(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?0:o,s=r===y.SCROLL_UP?0:o*2,i=r===y.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?o:0,s=r===y.SCROLL_UP?o*2:0,i=r===y.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#H){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?y.SCROLL_UP:y.SCROLL_DOWN,o=this.#c===y.DIRECTION_VERTICAL?wt(this.#a).top:wt(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===y.SCROLL_DOWN&&!this.#l||r===y.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var sv=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},iv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},av=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Mu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),cv=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},lv=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,uv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),pv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=fy(r);if(r&&!o)return sv(),Mu();if(r&&o===y.VH&&t===y.DIRECTION_HORIZONTAL)return iv(),Mu();if(r&&o===y.VW&&t===y.DIRECTION_VERTICAL)return av(),Mu();let n=[y.PLUS_HEIGHT,y.PLUS_HEIGHT_HALF,y.PLUS_WIDTH,y.PLUS_WIDTH_HALF,y.MINUS_HEIGHT,y.MINUS_HEIGHT_HALF,y.MINUS_WIDTH,y.MINUS_WIDTH_HALF],s=e.find(c=>du(n,c)),i=[y.POSITION_BOTTOM,y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT],a=e.find(c=>du(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??y.POSITION_BOTTOM}},mv=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=pv(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===y.PX?{value:f*p,additionalVal:a,position:Ea(c)}:{value:e*f*p,additionalVal:a,position:Ea(c)}},dv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=pv(a,s),h=String(c).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=Ea(d),x=T===y.POSITION_TOP||T===y.POSITION_LEFT;return l===y.PX?{value:cv(n?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:x}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:x}),additionalVal:p,position:T}:{value:lv(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:x}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:x}),additionalVal:p,position:T}},ku=(e,t,r,o)=>{let n=String(t);return Ne(n,y.PLUS_HEIGHT_HALF)?e+r/2:Ne(n,y.PLUS_HEIGHT)?e+r:Ne(n,y.PLUS_WIDTH_HALF)?e+o/2:Ne(n,y.PLUS_WIDTH)?e+o:Ne(n,y.MINUS_HEIGHT_HALF)?e-r/2:Ne(n,y.MINUS_HEIGHT)?e-r:Ne(n,y.MINUS_WIDTH_HALF)?e-o/2:Ne(n,y.MINUS_WIDTH)?e-o:e},hv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case y.IN_STOP:return!t&&r>0||t&&r<0?0:r;case y.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case y.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case y.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},fv=(e,t)=>e===y.PROP_OPACITY?1-t:-t,Ru=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var fo=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#z;#ve;#de;#he;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#_=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#k=!1,this.#S=void 0,this.#w=!0,this.#A=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=pe(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=pe(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=pe(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=pe(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Na(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Na(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Na(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?Tu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Tu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Ay(t?.dynamicRange),this.#re=pe(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=uo(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=uo(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=uo(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=uo(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=uo(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=$y(t?.align),this.#ue=Ly(t?.onSwitch),this.#ce=pe(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=Su(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=Su(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=pe(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Oy(t?.tween);let r=this.#X?.getType&&this.#X.getType()===y.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===y.TWEEN_TWEEN;this.#q=Fn(t?.item,!1),this.#J=Fn(t?.scroller,!0),this.#j=Fn(t?.screen,!0),this.#Z=vu(t?.trigger),this.#te=vu(t?.applyTo),this.#V=$s(t?.direction,"Parallax/Scrolltrigger"),this.#ne=pe(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=pe(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=Dy(t?.type),this.#ve=ur(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Wo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=jo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=By(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Fy(t?.range,this.#z),this.#ye=pe(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===y.EASE_SPRING&&ty(),this.#Ce=r?y.EASE_LERP:Vy(t?.easeType),this.#we=Wy(t?.springConfig,this.#z),this.#Ie=jy(t?.lerpConfig,this.#z),this.#Re=this.#Ce===y.EASE_SPRING?{configProps:{precision:y.EASE_PRECISION}}:{precision:y.EASE_PRECISION},this.#ae=this.#Ce===y.EASE_SPRING?new Gt:new Or}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===y.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==y.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=Ru({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#o=Ru({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#_e(),this.#Se()}})),this.#_e(),this.#Se(),this.#m=u.useScrollEnd(()=>{this.#Se({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new za,fe[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=Fn(t,!0)}setScreen(t){this.#j=Fn(t,!0)}setDirection(t){this.#V=$s(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Wo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=jo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=y.PROP_SCALE||y.PROP_SCALE_X||y.PROP_SCALE_Y||y.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===y.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===y.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case y.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case y.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=y.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=zy(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=gy(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=mv(t,this.#Y,this.#V);if(this.#M=n===y.POSITION_TOP||n===y.POSITION_LEFT,this.#P=ku(r,o,this.#V===y.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===y.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#H=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=dv(t,this.#H,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?-1:1:a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?1:-1;this.#b=ku(s,i,this.#V===y.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===y.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#ze(),this.#M&&(this.#P-=this.#u)}#ze(){if(this.#W){let{startMarker:t,endMarker:r}=ov({startMarker:this.#_,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#_=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=Co(this.#Z)?.x??0,o=Co(this.#Z)?.y??0,n=Co(this.#Z)?.z??0),t.style.transform="",this.#V===y.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(le(t).top):Math.trunc(le(t).top)-le(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(le(t).left):Math.trunc(le(t).left)-le(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===y.DIRECTION_VERTICAL?Math.trunc(le(this.#j).top):Math.trunc(wt(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===y.DIRECTION_VERTICAL?Math.trunc(le(this.#j).top):Math.trunc(wt(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===y.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===y.DIRECTION_VERTICAL?-le(this.#J).top:-le(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===y.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===y.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==y.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&fe[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#y=void 0,this.#w=!0,fe[this.#he](this.#de)?this.#ye?this.#xe():(this.#_e(),this.#Se({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!fe[this.#he](this.#de)||!t)return;this.#R=!0;let o=this.#He(t);if(this.#ye)this.#xe(o);else{this.#_e(o);let n=this.#A||this.#w||void 0;this.#Se({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#Se({forceRender:!0})}#He(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#_e(t){if(!fe[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=uv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#z===y.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===y.TYPE_SCROLLTRIGGER?this.#d=Te(this.#Ue()):this.#le===y.PROP_OPACITY?this.#d=Te(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?Te(this.#Je()/2):Te(this.#Ye()/2);let r=this.#ce&&this.#z!==y.TYPE_SCROLLTRIGGER?fv(this.#le,this.#d):this.#d;this.#d=this.#z===y.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!fe[this.#he](this.#de)||(this.#_e(t),!this.#k&&!this.#w&&this.#z===y.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#z===y.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#Re).catch(()=>{})}#Se({forceRender:t=!1,parentIsMoving:r=!1}={}){fe[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#y&&!t||!this.#A&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#A),this.#le===y.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#d,this.#w=!1):this.#ke(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-tt(n,0,r):-tt(n,r,0);if(this.#k=this.#S!==s,this.#S=s,!this.#k&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&rv({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case y.PROP_HORIZONTAL:case y.PROP_VERTICAL:return this.#Ge(i);case y.PROP_SCALE:case y.PROP_SCALE_X:case y.PROP_SCALE_Y:case y.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case y.VW:return this.#e/100*-t;case y.VH:return this.#p/100*-t;case y.WPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case y.HPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==y.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==y.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return tt(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===y.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case y.ALIGN_START:return(this.#c+this.#l)/r;case y.ALIGN_TOP:case y.ALIGN_LEFT:return(this.#c-this.#i)/r;case y.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case y.ALIGN_BOTTOM:case y.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case y.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return hv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#y=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case y.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case y.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case y.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case y.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case y.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case y.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case y.PROP_OPACITY:return{opacity:`${t}`};case y.PROP_SCALE:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case y.PROP_SCALE_X:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case y.PROP_SCALE_Y:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case y.PROP_VERTICAL:case y.PROP_HORIZONTAL:case y.PROP_ROTATE:case y.PROP_ROTATEY:case y.PROP_ROTATEX:case y.PROP_ROTATEZ:case y.PROP_SCALE:return{transform:""};case y.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#_&&this.#_?.remove?.(),this.#v&&this.#v?.remove?.(),this.#_=void 0,this.#v=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function MI(e){return new fo({...e,type:y.TYPE_PARALLAX})}function kI(e){return new fo({...e,type:y.TYPE_SCROLLTRIGGER})}var Nu=window.innerHeight,Pu=document.body.offsetHeight,go=!1,Au=!0,qt=window.scrollY,zs=!0,Jt=!1,Ou=()=>{},$u=()=>{},Ua=()=>{},Ha,gv=()=>{document.body.classList.remove("is-whelling")},RI=()=>{document.body.classList.add("is-whelling")};be.setDefault({usePassive:!1});var NI=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ha=t;let o=r.subscribe(({scrollValue:d})=>{Jt||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{qt=window.scrollY});let n=u.useMouseWheel(d=>{if(Jt)return;d.preventDefault(),zs=!1,RI();let f=d.spinY??0,h=be.clamp(f*e+qt,0,Pu-Nu);qt=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{Au&&d()}),i=u.useMouseWheel(u.debounce(()=>{gv()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;qt=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!zs)return;let d=window.scrollY;qt=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{Jt||(gv(),r.stop(),qt=window.scrollY,zs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),qt=window.scrollY,Nu=window.innerHeight,Pu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{go=!1,qt=0,zs=!0,Jt=!1,Ha&&(p.unobserve(Ha),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ha=null,o(),c(),a(),n(),l(),i(),s(),Ou=()=>{},$u=()=>{},Ua=()=>{}},stop:()=>{r.stop(),qt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Ga=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{go||(qt=window.scrollY,go=!0,Jt=!1,Nu=window.innerHeight,Pu=document.body.offsetHeight,Au=!0,zs=!1,{destroy:Ou,stop:$u,update:Ua}=NI({velocity:e,rootElement:t}))},dr=()=>{!go||Jt||($u(),Jt=!0)},Yt=()=>{!go||!Jt||(Jt=!1)},Hs=()=>{!go||!Jt||(Ua(),qt=window.scrollY,Jt=!1)},Lu=()=>{go&&Ua()},Du=()=>{Ou()},bv=()=>{Au=!0};var yv=()=>go;var vv="easeOutQuad",Us=new $r({ease:vv,data:{val:0}}),qa=!1,Fu=!1;Us.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Lu()});var Bu=()=>{Fu&&(document.body.style.overflow=""),Us?.updateEase?.(vv),Hs()},Vu=()=>{qa&&(Us.stop(),Bu())};u.useMouseWheel(()=>{Vu()});u.useMouseDown(()=>{Vu()});u.useTouchStart(()=>{Vu()});var Lr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Uc(t)||u.checkType(Number,t)?Uc(t)?le(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=ur(r?.duration,"bodyScroll: duration",500);return Fu=pe(r?.overflow,"bodyScroll: overflow",!1),Ra(r?.ease)&&Us?.updateEase?.(r?.ease),Fu&&(document.body.style.overflow="hidden"),new Promise(s=>{qa=!0,dr(),Us.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Bu(),qa=!1,s(!0)}).catch(()=>{Bu(),qa=!1,s(!0)})})}};var Gs={END:"END",START:"START",CENTER:"CENTER"};var PI=e=>{switch(e){case Gs.END:return"align-items:flex-end;";case Gs.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Tv=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=fe.getBreackpoint(r),h="user-select:none",v=c?"relative":"absolute",b=c?"position:sticky;top:0;":"",T=PI(d),x=p?`width:${p}vw;`:"",S=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${b}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${x}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,C=document.createElement("div");C.classList.add("scroller-style");let E=document.createElement("style");E.append(document.createTextNode(S)),C.append(E),e.prepend(C)};var qs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=pe(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=ur(t?.threshold,"HorizontalScroller: threshold",30),this.#a=pe(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Wo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=jo(t?.queryType,"queryType","horizontalScroller"),this.#o=pe(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=pe(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=pe(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=pe(t?.ease,"HorizontalScroller: ease",!1),this.#_=Oa(t?.easeType??"","HorizontalScroller"),this.#v=pe(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=pe(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=pe(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=pe(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#S=ur(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=ur(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():Gs.START,this.#R=dt(t?.onEnter,"HorizontalScroller: onEnter",ee),this.#O=dt(t?.onEnterBack,"HorizontalScroller: onEnterBack",ee),this.#E=dt(t?.onLeave,"HorizontalScroller: onLeave",ee),this.#N=dt(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",ee),this.#P=dt(t?.afterInit,"HorizontalScroller: afterInit",ee),this.#b=dt(t?.afterRefresh,"HorizontalScroller: afterRefresh",ee),this.#D=dt(t?.afterDestroy,"HorizontalScroller: afterDestroy",ee),this.#B=dt(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&Tv({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#S,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{fe[this.#f](this.#h)&&(dr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Yt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{Yt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{fe[this.#f](this.#h)&&(dr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Yt(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Wa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>De(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!fe[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=De(r),i=me(this.#C),a=Co(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=h?.querySelector(`.${this.#M}--in-center`),b=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),x=h?.querySelector(`.${this.#M}--end`),S=window.innerWidth>window.innerHeight?window.innerHeight:0,C=window.innerWidth>window.innerHeight?window.innerHeight/2:0,E=c===0?0:d+f/o-p/o,w=(()=>{let P=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:P})(),M=(()=>{let P=s/l,L=(s-s/l)/o;return P+L+w})(),O=M/2+C;this.#v&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${E}px`),v&&(v.style.height=`${O}px`),b&&(b.style.height=`${O}px`),b&&(b.style.top=`${O}px`),T&&(T.style.height=`${w}px`),x&&(x.style.height=`${M+S}px`),h&&(h.style.height=`${w}px`)}),t(!0))})})}#z(){if(!this.#L||!fe[this.#f](this.#h))return;let t=new fo({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#k,easeType:this.#_,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=le(this.#L).top,this.#be()}#ve(){Wa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!fe[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{Wa(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=le(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#H=[],this.#P=ee,this.#b=ee,this.#B=ee,this.#R=ee,this.#O=ee,this.#E=ee,this.#N=ee,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=ee,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&fe[this.#f](this.#h)?t&&this.refresh():!this.#$&&fe[this.#f](this.#h)?this.#ve():this.#$&&!fe[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var Js=new Map,Ja=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},AI=e=>{let t=new $r({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Dr={subscribe:n=>{if(!Ja(n))return()=>{};if(Js.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=AI(n);return Js.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Js.delete(n)}},reset:n=>{Ja(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ja(n))return new Promise(c=>c(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=me(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ja(n))return new Promise(l=>l(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=me(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var Ct=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=ee,this.#h=ee,this.#f=ee,this.#o=ee,this.#g=ee,this.#m=ee,this.#x=ee,this.#_=ee,this.#v=ee,this.#y=ee,this.#T=ee,this.#k=ee,this.#S={},this.#w=ee,this.#A=ee,this.#R=$s(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Oa(t?.easeType??"","SmoothScroller"),this.#N=Wo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=jo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=pe(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=ur(t?.speed,"SmoothScroller: speed",60),this.#F=pe(t?.drag,"SmoothScroller: drag",!1),this.#L=dt(t?.onTick,"SmoothScroller: onTick",ee),this.#C=dt(t?.onUpdate,"SmoothScroller: onUpdate",ee),this.#Y=dt(t?.onSwipe,"SmoothScroller: onSwipe",ee),this.#ee=pe(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=pe(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=pe(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=dt(t?.afterRefresh,"SmoothScroller: afterRefresh",ee),this.#M=dt(t?.afterInit,"SmoothScroller: afterInit",ee),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===y.EASE_SPRING?this.#S=new Gt:(this.#S=new Or,this.#S.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#_=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#te(t)),this.#y=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Yt()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),fe[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#S&&(this.#S.setData({val:0}),this.#w=this.#S.subscribe(({val:t})=>{this.#b.style.transform=this.#R==y.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#S.onComplete(({val:t})=>{this.#b.style.transform=this.#R==y.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:De(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:me(this.#D),this.#c=this.#R===y.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===y.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!fe[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=tt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){fe[this.#P](this.#N)&&(t===this.#b||xo(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||xo(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(fe[this.#P](this.#N)&&(this.#ie(),t===this.#b||xo(this.#b,t))){this.#r=!1,n?.(),dr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=tt(a,-1,1)*this.#I*tt(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return fe[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.goTo({val:this.#t})):new Promise(r=>r())}set(t){fe[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=tt(t,0,100),this.#t=tt(this.#t,0,this.#c),this.#S.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){fe[this.#P](this.#N)&&(t===this.#b||xo(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#R===y.DIRECTION_VERTICAL?r:t}refresh(){if(!fe[this.#P](this.#N)){this.#pe(),this.#S?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#_(),this.#v(),this.#y(),this.#T(),this.#w(),this.#A(),this.#k(),this.#S?.destroy(),this.#S=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=ee,this.#C=ee,this.#H=ee,this.#M=ee,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Sv=!1,OI=new Set(["scrollerN0","scrollerN1"]),_v=()=>{let e=document.querySelector("#root");e&&(Ga({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{dr(),bv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Sv=OI.has(t),u.useFrameIndex(()=>{if(Sv){Du();return}!yv()&&Ga({rootElement:e}),Hs()},30)}))};function rt(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function ot(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}function xv(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var qe=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Lt=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Xt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var Cv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Ev,wv={},$I="./asset/svg/icons/",LI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"scrollIcon",source:"scroll_arrow.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],hr=()=>Ev,nt=()=>wv,Iv=async()=>{let{success:e,data:t}=await Lt({source:"./data/common.json"});e||console.warn("data fail to load"),Ev=t},Mv=async()=>{let e=LI.map(({name:r,source:o})=>qe({source:`${$I}${o}`}).then(n=>({name:r,result:n})));wv=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var kv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Rv=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var DI=e=>e<10?`0${e}`:`${e}`,Nv=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Rv({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${DI(l)}</span
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
    </div>`};var Pv=m.createComponent({tag:"layout-links",component:Nv,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Pv]);var Ya=async({props:e})=>{let{source:t}=e,{data:r}=await Lt({source:t});return g` <div class="l-links">
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
    `;var Xa=m.createComponent({tag:"doc-container",component:Av});var Ov=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Ka=m.createComponent({tag:"doc-title",component:Ov,state:{}});var $v=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Qa=m.createComponent({tag:"doc-title-small",component:$v,state:{}});var rT=PC(tT(),1);var Yu=rT.default;var oT="[A-Za-z$_][0-9A-Za-z$_]*",IM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],MM=["true","false","null","undefined","NaN","Infinity"],nT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],sT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],iT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],kM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],RM=[].concat(iT,nT,sT);function aT(e){let t=e.regex,r=(A,{after:F})=>{let B="</"+A[0].slice(1);return A.input.indexOf(B,F)!==-1},o=oT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(A,F)=>{let B=A[0].length+A.index,Q=A.input[B];if(Q==="<"||Q===","){F.ignoreMatch();return}Q===">"&&(r(A,{after:B})||F.ignoreMatch());let H,J=A.input.substring(B);if(H=J.match(/^\s*=/)){F.ignoreMatch();return}if((H=J.match(/^\s+extends\s+/))&&H.index===0){F.ignoreMatch();return}}},a={$pattern:oT,keyword:IM,literal:MM,built_in:RM,"variable.language":kM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},b={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},S={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,{match:/\$\d+/},d];f.contains=C.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(C)});let E=[].concat(S,f.contains),w=E.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(E)}]),M={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},O={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},P={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...nT,...sT]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},D={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(A){return t.concat("(?!",A.join("|"),")")}let I={match:t.concat(/\b/,j([...iT,"super","import"].map(A=>`${A}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},R={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},N={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},_="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",k={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(_)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:P},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,S,{match:/\$\d+/},d,P,{scope:"attr",match:o+t.lookahead(":"),relevance:0},k,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[S,e.REGEXP_MODE,{className:"function",begin:_,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},D,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},R,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},I,$,O,N,{match:/\$[(.]/}]}}Yu.registerLanguage("javascript",aT);var cT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await qe({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Yu.highlightElement(e),e.style.height=""},NM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),lT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=NM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await cT({ref:h,source:a.source}):cT({ref:h,source:a.source}),()=>{}}),g`<div
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
    </div>`};var uT=m.createComponent({tag:"mob-snippet",component:lT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Ks="debug_component",oc="debug_filter_list",nc="debug_overlay",sc="debug_tree",Qs="quick_nav",Zs="scroll_down_label",ei="scroll_to",pT="header",ic="mob_navigation",ti="mob_navigation_container",ac="search_overlay",ri="search_overlay_list",Uo="search_overlay_header",cc="right-sidebar",lc="animation-description",uc="route-loader",Xn="custom-history";var mT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(ei)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},dT=e=>{m.useMethodByName(ei)?.setActiveLabel?.(e)};function PM({label:e}){return e?.length>0}var AM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),mT({id:e,label:t,element:r,isSection:o,isNote:n}),Sp(r)&&!o&&dT(t)},hT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{PM({label:s})&&AM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var fT=m.createComponent({tag:"mob-spacer",component:hT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var gT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=le(n).top-50;Lr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var bT=m.createComponent({tag:"anchor-button",component:gT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var OM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),yT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${OM({items:o,links:n})}
    </ul>`};var vT=m.createComponent({tag:"mob-list",component:yT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var TT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var ST=m.createComponent({tag:"mob-paragraph",component:TT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var $M=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",_T=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${$M(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var xT=m.createComponent({tag:"mob-title",component:_T,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var LM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),DM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Lt({source:e});return r?o.data:[]},CT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await DM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${LM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var FM=async({proxi:e})=>{let{success:t,data:r}=await qe({source:e.url});t&&(e.source=r)},ET=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{FM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var wT=m.createComponent({tag:"doc-svg",component:ET,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var pc=m.createComponent({tag:"html-content",component:CT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[vT,ST,xT,uT,fT,bT,wT]});var IT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var MT=m.createComponent({tag:"scroll-to-button",component:IT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var oi=!1;function BM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:le(a).top-50;oi=!0,r.activeLabel=i,await Lr.to(c),setTimeout(()=>{oi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var kT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},RT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:v,isNote:b})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:v,isNote:b}])}),s("setActiveLabel",d=>{oi||(c.activeLabel=d)}),e(()=>{if(be.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(b=>({...b,top:le(b.element).top})));let d=u.useScrollThrottle(({direction:b})=>l=b),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(b=>{b.top=le(b.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{oi||kT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{oi||kT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>BM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var NT=m.createComponent({tag:"scroll-to",component:RT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[MT]});var mc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var dc=e=>{m.useMethodByName(cc)?.updateList(e??[])};m.useComponent([Xa,Qa,NT,Ka,pc]);var $e=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Lt({source:t});return dc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${ei}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([Xa,Qa,Ka,pc]);var se=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Lt({source:t});return dc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var PT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:v})=>{v||h==="backward"||o(2)},1.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(3)},5.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(4)},9.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(1)},1.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(2)},5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:v,bx:b,by:T,cx:x,cy:S,dx:C,dy:E,ex:w,ey:M,fx:O,fy:P,gx:L,gy:D})=>{s.ax=h,s.ay=v,s.bx=b,s.by=T,s.cx=x,s.cy=S,s.dx=C,s.dy=E,s.ex=w,s.ey=M,s.fx=O,s.fy=P,s.gx=L,s.gy=D});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:v,bx:b,by:T,cx:x,cy:S,dx:C,dy:E,ex:w,ey:M,fx:O,fy:P,gx:L,gy:D})=>{i.ax=h,i.ay=v,i.bx=b,i.by=T,i.cx=x,i.cy=S,i.dx=C,i.dy=E,i.ex=w,i.ey=M,i.fx=O,i.fy=P,i.gx=L,i.gy=D});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Xt(-3,3),ay:()=>Xt(-3,3),bx:()=>Xt(-3,3),by:()=>Xt(-3,3),cx:()=>Xt(-3,3),cy:()=>Xt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Xt(-3,3),fy:()=>Xt(-3,3),gx:()=>Xt(-3,3),gy:()=>Xt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},b={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},x={x:s.ex+i.ex,y:s.ey+i.ey},S={x:s.fx+i.fx,y:s.fy+i.fy},C={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${v.x}% ${v.y}%, ${b.x}% ${b.y}%, ${T.x}% ${T.y}%,${x.x}% ${x.y}%,${S.x}% ${S.y}%,${C.x}% ${C.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=ze.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>De(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>De(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var AT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=ze.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=ze.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var hc=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=ze.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var OT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),v=new WeakRef(a),b=new WeakRef(c),T=new WeakRef(r),x=new WeakRef(e),{pathScroller:S,pathSequencer:C,pathTimeline:E,pathTween:w,stopLoop:M,destroy:O}=PT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:x}),{title1parallax:P,title2parallax:L,title1tween:D,title2tween:$}=AT({title_1:n,title_2:s}),{sectionContentScroller:j,destroy:I}=hc({title:h}),{sectionContentScroller:R,destroy:N}=hc({title:v}),{sectionContentScroller:_,destroy:k}=hc({title:b}),A=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[S,P,L,j,R,_],onUpdate:({value:F})=>{p(F),d()}});return A.init(),setTimeout(()=>{A?.refresh?.()},500),{goTo:F=>{A?.move?.(F).catch(()=>{})},destroy:()=>{A.destroy(),A=null,C.destroy(),S.destroy(),E.destroy(),w.destroy(),P.destroy(),L.destroy(),D.destroy(),$.destroy(),j.destroy(),R.destroy(),M(),O(),I(),N(),k()}}};var $T=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var Xu=()=>{},ni=e=>Promise.resolve(e),LT=()=>{},VM={1:0,2:100/3,3:100/3*2,4:100},WM=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">github</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">linkedin</a>'],jM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},zM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},HM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},UM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},GM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{Xu(VM[o]),LT()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                [ ${n} ]
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,qM=()=>g`
        <ul class="l-about__bio">
            <li class="l-about__bio__item">[</li>
            ${WM.map(e=>g` <li class="l-about__bio__item">${e}</li> `).join("")}
            <li class="l-about__bio__item">]</li>
        </ul>
    `,JM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,DT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:x,section4_title:S,pathElement:C}=r(),{svg:E}=o(),w=0,M=!1,O=0,{svgSpring:P,destroySvgSpring:L}=$T({elements:E});ni=async j=>{if(u.shouldMakeSomething()||p){P.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let R=-Math.abs(j/30);await P.goTo({x:R}).catch(()=>{})},LT=()=>{ni(3e3),setTimeout(()=>{ni(0)},500)};let{destroy:D,goTo:$}=OT({screenElement:d,scrollerElement:f,pathElement:C,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:x,section4_title:S,setActiveItem:j=>{c.activenavItem=j},onMove:j=>{M||(w=j),M=!0,O=w-j,ni(O)},onScrollEnd:u.useDebounce(()=>{M=!1,O=0,ni(O)},500)});return Xu=$,c.isMounted=!0,()=>{Xu=()=>{},D(),L()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div>${qM()}</div>
        <div class="l-about__sqaure-container">${JM()}</div>
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
                    ${jM({setRef:t,getState:n})}
                    ${zM({setRef:t,getState:n})}
                    ${HM({setRef:t,getState:n})}
                    ${UM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        ${GM({bindEffect:s,delegateEvents:i,proxi:c})}
    </div>`};var FT=m.createComponent({tag:"about-component",component:DT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>be.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([FT]);var BT=async()=>{let{data:e}=await Lt({source:"./data/about/index.json"}),{data:t}=await qe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var VT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var fc=m.createComponent({tag:"benchmark-fake-component",component:VT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var yt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[fc]});var Qu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},si=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Ku=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?Qu(si(t)):si(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},vt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.target?.value??0);Ku({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Ku({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ku({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var WT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let d=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${vt({setRef:i,getRef:a,proxi:d,delegateEvents:t,bindEffect:l})}

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
    </div>`};var jT=m.createComponent({tag:"benchmark-invalidate",component:WT,...yt()});var gc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var zT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var HT=m.createComponent({tag:"benchmark-repeat-key",component:zT,...yt()});var UT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var GT=m.createComponent({tag:"benchmark-repeat-key-nested",component:UT,...yt(31)});var qT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var JT=m.createComponent({tag:"benchmark-repeat-no-key",component:qT,...yt()});var Dt=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var Zu=({value:e,useShuffle:t=!1})=>{Dt.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Dt.set("data",t?Qu(si(e)):si(e)),await m.tick();let n=performance.now()-r;Dt.set("time",n),Dt.set("isLoading",!1)})},2)},YT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.target?.value??0);Zu({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Zu({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();Zu({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Dt.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var XT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Dt.set("data",[]),Dt.set("time",0),Dt.set("counter",0)}),g`<div class="benchmark">
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
            ${YT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:d,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:h},v,b)=>({index:b,label:v.label,counter:h})})}
                                  ${d()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var KT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:XT,bindStore:Dt,child:[fc]});var QT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var ZT=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:QT,...yt(31)});var bc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var eS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var tS=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:eS,...yt(1001)});var rS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var oS=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:rS,...yt(1001)});m.useComponent([jT,JT,HT,GT,ZT,KT,tS,oS]);var Fr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var Se=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o="",color:n="black"})=>{let s=m.useMethodByName(Qs);s.update("active",e),s.update("nextRoute",t),s.update("prevRoute",r),s.update("backRoute",o),s.update("color",n)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Qs);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute",""),e.update("color","black")});var st="rgba(255, 255, 255, 0)",it=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},at=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},ct=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},Kn=e=>"roundRect"in e,nS=(e,t,r,o,n,s)=>{o<2*s&&(s=o/2),n<2*s&&(s=n/2),e.beginPath(),e.moveTo(t+s,r),e.arcTo(t+o,r,t+o,r+n,s),e.arcTo(t+o,r+n,t,r+n,s),e.arcTo(t,r+n,t,r,s),e.arcTo(t,r,t+o,r,s),e.closePath()},yo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,v=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y:v,centerX:h+o/2,centerY:v+n/2,offsetXCenter:Go({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:qo({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},Go=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2-t/2,qo=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2-t/2;var X=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});X.set("activeNavigationSection","");var sS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a,stagger:c,reorder:l})=>{let{useOffscreen:p,context:d}=it({disableOffcanvas:a}),f=!0,h=e.getContext(d,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=at({useOffscreen:p,canvas:e}),x=p?T:h,S=Kn(x);x=null,e.width=e.clientWidth,e.height=e.clientHeight;let C=yo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,E=l?C.map(($,j)=>({...$,scale:1,rotate:0,hasFill:i.includes(j)})).toSorted($=>$.hasFill?-1:1).toReversed():C.map(($,j)=>{let I=i.includes(j);return{...$,scale:1,rotate:0,hasFill:I}}),w=U.createTimeTween({ease:"easeInOutQuad",stagger:c,data:{scale:1,rotate:0}});E.forEach($=>{w.subscribeCache($,({scale:j,rotate:I})=>{$.rotate=I,$.scale=j})});let M=()=>{if(!h)return;p&&b&&(b.width=e.width,b.height=e.height);let $=p?T:h;$&&(e.width=e.width,E.forEach(({x:j,y:I,centerX:R,centerY:N,width:_,height:k,rotate:A,scale:F,hasFill:B,offsetXCenter:Q,offsetYCenter:H})=>{let J=Math.PI/180*A,q=Math.cos(J)*F,te=Math.sin(J)*F;$.setTransform(q,te,-te,q,Math.round(R+Q),Math.round(N+H)),S?($.beginPath(),$.roundRect(Math.round(-R+j),Math.round(-N+I),_,k,5)):($.beginPath(),$.rect(Math.round(-R+j),Math.round(-N+I),_,k)),B?($.fillStyle="#000000",$.fill()):($.strokeStyle="#000",$.fillStyle="rgba(238, 238, 238, 0.9)",$.stroke(),$.fill()),$.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:p,offscreen:b,ctx:h}))},O=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"}).goTo(w,{scale:1.5,rotate:90},{duration:1e3}).goTo(w,{scale:.5},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:1.3},{duration:500}).goTo(w,{scale:1},{duration:1200});O.onLoopEnd(({direction:$,loop:j})=>{console.log(`loop end: ${$}, ${j}`)}),O.play();let P=()=>{M(),f&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let L=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,E.forEach($=>{let{width:j,height:I,gutter:R,numberOfColumn:N}=$;$.offsetXCenter=Go({canvasWidth:e.width,width:j,gutter:R,numberOfColumn:N}),$.offsetYCenter=qo({canvasHeight:e.height,height:I,gutter:R,numberOfRow:t})}),u.useFrame(()=>M())}),D=X.watch("navigationIsOpen",$=>{if($){O?.pause(),f=!1;return}setTimeout(async()=>{f=!0,m.getActiveRoute().route===v.route&&(O?.resume(),u.useFrame(()=>P()))},500)});return()=>{w.destroy(),O.destroy(),L(),D(),w=null,O=null,h=null,b=null,T=null,C=[],f=!1,E=null,d=null}};var iS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{let{canvas:a}=o(),c=sS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var aS=m.createComponent({tag:"animatedpattern-n0",component:iS,props:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});var ep=[{animation:{},description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v0",nav:{prevRoute:"#async-timeline",nextRoute:"#animatedPatternN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v1",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:window.innerHeight/18,cellHeight:window.innerHeight/18,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=0&activeId=0",nextRoute:"#animatedPatternN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v2",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=1&activeId=1",nextRoute:"#animatedPatternN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v3",animation:{fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:window.innerHeight/22,cellHeight:window.innerHeight/22,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=2&activeId=2",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}}];var xe=e=>{m.useMethodByName(lc)?.updateRawContent?.(e)};m.beforeRouteChange(()=>{xe("")});m.useComponent([aS]);var cS=({params:e})=>{let{version:t}=e,r=ep[Math.max(0,Math.min(Number(t),ep.length-1))];return r?(Se({active:!0,prevRoute:r.nav.prevRoute,nextRoute:r.nav.nextRoute,backRoute:r.nav.backRoute,color:"black"}),xe(r.description),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({...r.animation})}
        ></animatedpattern-n0>
    </div>`):""};var lS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a})=>{let{useOffscreen:c,context:l}=it({disableOffcanvas:a}),p=!0,{top:d,left:f}=le(e),h=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=at({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let x=yo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,S=x.map((I,R)=>({...I,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(R)})).toSorted(I=>I.hasFill?-1:1),C=U.createLerp({data:{mouseX:0,mouseY:0}});S.forEach(I=>{C.subscribeCache(I,({mouseX:R,mouseY:N})=>{I.mouseX=R,I.mouseY=N})});let E=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});S.forEach(I=>{E.subscribeCache(I,({scale:R})=>{I.scale=R})});let w=()=>{if(!h)return;c&&b&&(b.width=e.width,b.height=e.height);let I=c?T:h;I&&(e.width=e.width,S.forEach(({x:R,y:N,centerX:_,centerY:k,width:A,height:F,mouseX:B,mouseY:Q,scale:H,hasFill:J,offsetXCenter:q,offsetYCenter:te})=>{if(!J)return;let re=B-(e.width-(A+s)*r)/2,ae=Q-(e.height-(F+s)*t)/2,ye=(R-re)/250,Ae=(N-ae)/250,Oe=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(Ae),2)),Ue=be.clamp(Math.abs(Oe),0,2),St=0,_t=Math.cos(St)*(Ue+H),Ft=Math.sin(St)*(Ue+H);I.setTransform(_t,Ft,-Ft,_t,Math.round(_+q),Math.round(k+te)),I.beginPath(),I.rect(Math.round(-_+R),Math.round(-k+N),A,F),I.fillStyle="#000000",I.fill(),I.setTransform(1,0,0,1,0,0)}),I.globalCompositeOperation="destination-out",S.forEach(({x:R,y:N,centerX:_,centerY:k,width:A,height:F,mouseX:B,mouseY:Q,scale:H,hasFill:J,offsetXCenter:q,offsetYCenter:te})=>{if(J)return;let re=B-(e.width-(A+s)*r)/2,ae=Q-(e.height-(F+s)*t)/2,ye=(R-re)/250,Ae=(N-ae)/250,Oe=Math.sqrt(Math.pow(Math.abs(ye),2)+Math.pow(Math.abs(Ae),2)),Ue=be.clamp(Math.abs(Oe),0,2),St=0,_t=Math.cos(St)*(Ue+H),Ft=Math.sin(St)*(Ue+H);I.setTransform(_t,Ft,-Ft,_t,Math.round(_+q),Math.round(k+te)),I.beginPath(),I.rect(Math.round(-_+R),Math.round(-k+N),A,F),I.fill(),I.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:c,offscreen:b,ctx:h}))},M=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(E,{scale:.3},{duration:1e3});M.play();let O=({x:I,y:R})=>{C.goTo({mouseX:I-f,mouseY:R-d}).catch(()=>{})},P=u.useMouseMove(({client:I})=>{let{x:R,y:N}=I;O({x:R,y:N})}),L=u.useTouchMove(({client:I})=>{let{x:R,y:N}=I;O({x:R,y:N})}),D=()=>{w(),p&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,d=le(e).top,f=le(e).left,S.forEach(I=>{let{width:R,height:N,gutter:_,numberOfColumn:k}=I;I.offsetXCenter=Go({canvasWidth:e.width,width:R,gutter:_,numberOfColumn:k}),I.offsetYCenter=qo({canvasHeight:e.height,height:N,gutter:_,numberOfRow:t})}),u.useFrame(()=>w())}),j=X.watch("navigationIsOpen",I=>{if(I){M?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(M?.play(),u.useFrame(()=>D()))},500)});return()=>{E.destroy(),M.destroy(),C.destroy(),$(),P(),L(),j(),E=null,M=null,C=null,h=null,b=null,T=null,x=[],p=!1,S=null,l=null}};var uS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{let{canvas:a}=o(),c=lS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{document.body.style.background="",c()}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var pS=m.createComponent({tag:"animatedpattern-n1",component:uS,props:{numberOfRow:7,numberOfColumn:15,cellWidth:window.innerHeight/13,cellHeight:window.innerHeight/13,gutter:window.innerHeight/150,fill:[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,66],disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([pS]);var mS=()=>(Se({active:!0,prevRoute:"#animatedPatternN0?version=3&activeId=3",nextRoute:"#scrollerN0?version=0&activeId=0",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: TimeTween Lerp & AsyncTimeline"),g`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`);function YM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function XM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var dS=({canvas:e,amountOfPath:t,width:r,height:o,fill:n,stroke:s,opacity:i,spacerY:a,intialRotation:c,perpetualRatio:l,mouseMoveRatio:p,disableOffcanvas:d})=>{let{useOffscreen:f,context:h}=it({disableOffcanvas:d}),v=!0,b=e.getContext(h,{alpha:!0}),{left:T}=le(e),x=m.getActiveRoute(),{offscreen:S,offScreenCtx:C}=at({useOffscreen:f,canvas:e}),E=!1;e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:t}).keys()].map((N,_)=>{let k=_,A=k<t/2?t-k:k,F=A-(t-A);return{width:Math.floor(YM({width:r,relativeIndex:F,amountOfPath:t})),height:Math.floor(XM({height:o,relativeIndex:F,amountOfPath:t})),fill:n,stroke:s,opacity:F*i,rotate:0,y:0,relativeIndex:F,index:_}}),M=w.splice(0,w.length/2).concat(w.toReversed()),O=U.createSpring({data:{rotate:0,y:0},stagger:{each:5,from:"center"}});[...M].forEach(N=>{O.subscribeCache(N,({rotate:_})=>{N.rotate=_})});let P=({time:N=0})=>{if(!b)return;f&&S&&(S.width=e.width,S.height=e.height);let _=f?C:b;if(!_)return;let k=e.width/2,A=e.height/2;e.width=e.width,M.forEach(({width:F,height:B,opacity:Q,rotate:H,relativeIndex:J,index:q})=>{let te=Math.sin(N/1e3)*l*J,re=q<t/2?te+15*J/2:-te-15*J/2,ae=q<t/2?-1:1,ye=1,Ae=Math.PI/180*(H-c),Oe=Math.cos(Ae)*ye,Ue=Math.sin(Ae)*ye;_.setTransform(Oe,Ue,-Ue,Oe,k,A+B/2),E?(_.beginPath(),_.roundRect(-(F*ae)/2,-B/2+re+a(q<t/2),F,B,[200,0])):(_.beginPath(),_.rect(-(F*ae)/2,-B/2+re+a(q<t/2),F,B)),_.strokeStyle=`rgba(0, 0, 0, ${Q})`,_.fillStyle="rgba(238, 238, 238, 0)",_.stroke(),_.fill(),_.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:f,offscreen:S,ctx:b})},L=({time:N=0})=>{P({time:N}),v&&u.useNextFrame(({time:_})=>L({time:_}))};u.useFrame(({time:N})=>{L({time:N})});let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=le(e).left,u.useFrame(({time:N})=>{P({time:N})})}),$=({x:N})=>{let _=N-e.width/2-T;O.goTo({rotate:_/p}).catch(()=>{})},j=u.useMouseMove(({client:N})=>{let{x:_}=N;$({x:_})}),I=u.useTouchMove(({client:N})=>{let{x:_}=N;$({x:_})}),R=X.watch("navigationIsOpen",N=>{if(N){O?.pause(),v=!1;return}setTimeout(()=>{v=!0,O?.resume(),m.getActiveRoute().route===x.route&&u.useFrame(({time:k})=>L({time:k}))},500)});return()=>{O.destroy(),D(),j(),I(),R(),b=null,S=null,C=null,O=null,w=[],v=!1,M=null,h=null}};var hS=({onMount:e,setRef:t,getRef:r,getState:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{let{canvas:a}=r(),c=dS({canvas:a,...o()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var fS=m.createComponent({tag:"caterpillar-n0",component:hS,props:{nextRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),amountOfPath:17,width:window.innerHeight/30,height:window.innerHeight/30,radius:0,fill:[-1],stroke:"#000",opacity:.05,spacerY:e=>e?300:-400,intialRotation:33,perpetualRatio:6,mouseMoveRatio:10,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([fS]);var gS=()=>(Se({active:!0,prevRoute:"",nextRoute:"#caterpillarN1",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: spring animation"),g`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`);var bS=({canvas:e,numItems:t,width:r,height:o,fill:n,opacity:s,radius:i,rotationDuration:a,rotationEach:c,centerEach:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=it({disableOffcanvas:p}),h=!0,v=e.getContext(f,{alpha:!0}),{top:b,left:T}=le(e),x=m.getActiveRoute(),{offscreen:S,offScreenCtx:C}=at({useOffscreen:d,canvas:e}),E=!0;e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:t}).keys()].map((_,k)=>{let A=k>=t/2?t/2+(t/2-k):k,F=n.includes(k)?1:A*s;return{width:A*r,height:A*o,x:0,y:0,hasFill:n.includes(k),opacity:F,radius:i,rotate:0,relativeIndex:A}}),M=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0});[...w].forEach(_=>{M.subscribeCache(_,({rotate:k})=>{_.rotate=k})});let O=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...w].forEach(_=>{O.subscribeCache(_,({x:k,y:A})=>{_.x=k,_.y=A})});let P=()=>{if(!v)return;d&&S&&(S.width=e.width,S.height=e.height);let _=d?C:v;_&&(e.width=e.width,w.forEach(({width:k,height:A,x:F,y:B,rotate:Q,hasFill:H,opacity:J},q)=>{let te=w.length-q,re=e.width/2,ae=e.height/2,ye=1,Ae=Math.PI/180*Q,Oe=Math.cos(Ae)*ye,Ue=Math.sin(Ae)*ye;_.setTransform(Oe,Ue,-Ue,Oe,re+F+te*F/20,ae+B+te*B/20),E?(_.beginPath(),_.roundRect(Math.round(-k/2),Math.round(-A/2),k,A,[40,40])):(_.beginPath(),_.rect(Math.round(-k/2),Math.round(-A/2),k,A)),H?_.fillStyle="#000":(_.strokeStyle="#000",_.fillStyle=`rgba(238, 238, 238, ${J})`,_.stroke()),_.fill(),_.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:d,offscreen:S,ctx:v}))},L=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});L.goTo(M,{rotate:360},{duration:a}),L.play();let D=()=>{P(),h&&u.useNextFrame(()=>D())};u.useFrame(()=>D());let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b=le(e).top,T=le(e).left,P()}),j=({x:_,y:k})=>{let A=window.innerWidth,F=window.innerHeight,B=_-e.width/2-T,Q=k-e.height/2-b;O.goTo({x:be.clamp(B,-A/2+400+T,A/2-400-T),y:be.clamp(Q,-F/2+200+b,F/2-200-b)}).catch(()=>{})},I=u.useMouseMove(({client:_})=>{let{x:k,y:A}=_;j({x:k,y:A})}),R=u.useTouchMove(({client:_})=>{let{x:k,y:A}=_;j({x:k,y:A})}),N=X.watch("navigationIsOpen",_=>{if(_){h=!1,L?.pause(),M?.pause(),O?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===x.route&&(L?.resume(),M?.resume(),O?.resume(),u.useFrame(()=>D()))},500)});return()=>{M.destroy(),O.destroy(),L.destroy(),$(),I(),R(),N(),M=null,O=null,L=null,v=null,S=null,C=null,h=!1,w=null,f=null}};var yS=({onMount:e,getState:t,getRef:r,setRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{let{canvas:a}=r(),c=bS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${o("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var vS=m.createComponent({tag:"caterpillar-n1",component:yS,props:{numItems:20,width:window.innerHeight/30,height:window.innerHeight/30,fill:[14],opacity:1,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([vS]);var TS=()=>(Se({active:!0,prevRoute:"#caterpillarN0",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: Spring & AnsyncTimeline"),g`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`);var tp=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},SS=({canvas:e,numItems:t,width:r,height:o,radius:n,fill:s,opacity:i,xAmplitude:a,yAmplitude:c,duration:l,friction:p,rotationDefault:d,disableOffcanvas:f})=>{let{useOffscreen:h,context:v}=it({disableOffcanvas:f}),b=!0,T=e.getContext(v,{alpha:!0}),x=d,S=m.getActiveRoute(),{offscreen:C,offScreenCtx:E}=at({useOffscreen:h,canvas:e}),w=!0,M=[...Array.from({length:t}).keys()].map((I,R)=>{let N=R>=t/2?t/2+(t/2-R):R,_=r+r/3*N,k=o+o/3*N,A=s.includes(R)?1:(t-R)*i;return{width:_,height:k,x:0,y:0,hasFill:s.includes(R),opacity:A,radius:n,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let O=U.createSequencer({stagger:{each:6},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-x},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:1})},1).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:5})},5).add(({isForced:I,direction:R})=>{tp({isForced:I,direction:R,value:9})},9);M.forEach(I=>{O.subscribeCache(I,({x:R,rotate:N})=>{let _=R/p,k=2/(3-Math.cos(2*_)),A=k*Math.cos(_)*a,F=k*Math.sin(2*_)/2*c;I.x=A,I.y=F,I.rotate=N})});let P=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(O);P.onLoopEnd(({loop:I,direction:R})=>{console.log(`loop end: ${I} , ${R}`)});let L=()=>{if(!T)return;h&&C&&(C.width=e.width,C.height=e.height);let I=h?E:T;I&&(e.width=e.width,M.forEach(({width:R,height:N,x:_,y:k,rotate:A,hasFill:F,opacity:B})=>{let Q=e.width/2,H=e.height/2,J=1,q=Math.PI/180*A,te=Math.cos(q)*J,re=Math.sin(q)*J;I.setTransform(te,re,-re,te,Q+_,H+k),w?(I.beginPath(),I.roundRect(Math.round(-R/2),Math.round(-N/2),R,N,[40,40])):(I.beginPath(),I.rect(Math.round(-R/2),Math.round(-N/2),R,N)),F?I.fillStyle="#000000":(I.strokeStyle="#000",I.fillStyle=`rgba(238, 238, 238, ${B})`,I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:h,offscreen:C,ctx:T}))},D=()=>{L(),b&&u.useNextFrame(()=>D())};u.useFrame(()=>D()),P.play();let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,L()}),j=X.watch("navigationIsOpen",I=>{if(I){b=!1,P?.pause();return}setTimeout(()=>{b=!0,m.getActiveRoute().route===S.route&&(P?.resume(),u.useFrame(()=>D()))},500)});return{destroy:()=>{b=!1,$(),j(),O.destroy(),O=null,P.destroy(),P=null,T=null,C=null,E=null,M=null,v=null},play:()=>{P.play()},playReverse:()=>{P.playReverse()},playUseCurrent:()=>{P.play({useCurrent:!0})},playReverseUseCurrent:()=>{P.playReverse({useCurrent:!0})},playFromLabel:()=>{P.playFrom("mylabel")},plaFromLabelReverse:()=>{P.playFromReverse("mylabel")},stop:()=>P.stop(),pause:()=>P.pause(),resume:()=>P.resume(),reverse:()=>P.reverse(),setRotation:I=>x=I}};function KM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var _S=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();return document.body.style.background=st,e(({element:c})=>{let{canvas:l,rangeValue:p,rotationButton:d}=o(),f=SS({canvas:l,...t()}),{destroy:h,setRotation:v}=f;return Object.entries(a.buttons).forEach(([b,T])=>{let{method:x}=T;c.querySelector(`.${b}`)?.addEventListener("click",()=>f?.[x]())}),d.addEventListener("change",()=>{let b=d.value;v(Number(b)),p.textContent=b}),u.useFrame(()=>{a.isMounted=!0}),()=>{document.body.style.background="",h()}}),g`
        <div>
            <div class="c-canvas">
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
                        ${KM({buttons:a.buttons})}
                        <li class="c-canvas__controls__item is-like-button">
                            <label class="c-canvas__controls__label">
                                deg:
                                <span
                                    class="js-range-value"
                                    ${r("rangeValue")}
                                    >${a.rotationDefault}</span
                                >
                            </label>
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${a.rotationDefault}"
                                    step="1"
                                    ${r("rotationButton")}
                                />
                            </div>
                        </li>
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var QM=10,ZM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},xS=m.createComponent({tag:"caterpillar-n2",component:_S,props:{numItems:20,width:window.innerHeight/13,height:window.innerHeight/13,radius:0,fill:[2],opacity:1,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:166,friction:QM/2/Math.PI,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:ZM,type:"Any"})}});m.useComponent([xS]);var CS=()=>(Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: Sequencer & SyncTimeline"),g`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`);var yc=()=>{m.useMethodByName(Zs).update(!0)},vc=()=>{m.useMethodByName(Zs).update(!1)};var ES=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i,fill:a,stagger:c,reorder:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=it({disableOffcanvas:p}),h=!0,v=U.createMasterSequencer(),b=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:x,offScreenCtx:S}=at({useOffscreen:d,canvas:e}),C=d?S:b,E=Kn(C);C=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=yo({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i}).items,M=l?w.map((R,N)=>({...R,scale:0,rotate:0,hasFill:a.includes(N)})).toSorted(R=>R.hasFill?-1:1):w.map((R,N)=>({...R,scale:0,rotate:0,hasFill:a.includes(N)})),O=U.createStaggers({items:M,stagger:c}),P=O.map(({item:R,start:N,end:_})=>{let k=R.hasFill?1.1:1,A=U.createSequencer({data:{scale:0}}).goTo({scale:k},{start:N,end:_,ease:"easeInOutQuad"}),F=A.subscribe(({scale:B})=>{R.scale=B});return v.add(A),{sequencer:A,unsubscribe:F}}),L=()=>{if(!b)return;d&&x&&(x.width=e.width,x.height=e.height);let R=d?S:b;R&&(e.width=e.width,M.forEach(({x:N,y:_,centerX:k,centerY:A,width:F,height:B,rotate:Q,scale:H,hasFill:J,offsetXCenter:q,offsetYCenter:te})=>{let re=Math.PI/180*Q,ae=Math.cos(re)*H,ye=Math.sin(re)*H;R.setTransform(ae,ye,-ye,ae,Math.round(k+q),Math.round(A+te)),nS(R,Math.round(-k+N),Math.round(-A+_),F,B,5),E?(R.beginPath(),R.roundRect(Math.round(-k+N),Math.round(-A+_),F,B,5)):(R.beginPath(),R.rect(Math.round(-k+N),Math.round(-A+_),F,B)),J?(R.fillStyle="#000000",R.fill()):(R.strokeStyle="#000",R.fillStyle="rgb(238, 238, 238)",R.fill(),E||(R.strokeStyle="#ccc")),R.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:d,offscreen:x,ctx:b}))},D=ze.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>me(t)},reverse:!0,ease:!0,easeType:"lerp"});D.init();let $=()=>{L(),h&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let j=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,M.forEach(R=>{let{width:N,height:_,gutter:k,numberOfColumn:A}=R;R.offsetXCenter=Go({canvasWidth:e.width,width:N,gutter:k,numberOfColumn:A}),R.offsetYCenter=qo({canvasHeight:e.height,height:_,gutter:k,numberOfRow:r})}),u.useFrame(()=>L())}),I=X.watch("navigationIsOpen",R=>{if(R){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>$())},500)});return()=>{j(),I(),P.forEach(({sequencer:R,unsubscribe:N})=>{R.destroy(),N()}),P=[],v.destroy(),v=null,O=[],D.destroy(),D=null,b=null,x=null,S=null,w=[],h=!1,M=null,f=null}};var wS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{yc();let{canvas:a,canvasScroller:c}=o();window.scrollTo(0,0);let l=ES({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),vc(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${r("canvasScroller")}></div>
        </div>
    `};var IS=m.createComponent({tag:"scroller-n0",component:wS,props:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});var rp=[{animation:{},description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v0",nav:{prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v1",animation:{stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=0&activeId=0",nextRoute:"#scrollerN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v2",animation:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=1&activeId=1",nextRoute:"#scrollerN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v3",animation:{stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=2&activeId=2",nextRoute:"#scrollerN0?version=4&activeId=4",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v4",animation:{stagger:{type:"equal",each:2,from:"end"},reorder:!1},nav:{prevRoute:"#scrollerN0?version=3&activeId=3",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}}];m.useComponent([IS]);var MS=({params:e})=>{let{version:t}=e,r=rp[Math.max(0,Math.min(Number(t),rp.length-1))];return r?(Se({active:!0,prevRoute:r.nav.prevRoute,nextRoute:r.nav.nextRoute,backRoute:r.nav.backRoute,color:"black"}),xe(r.description),g`<div>
        <scroller-n0
            ${m.staticProps({...r.animation})}
        ></scroller-n0>
    </div>`):""};function ek({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function tk({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var kS=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:n,opacity:s,intialRotation:i,endRotation:a,disableOffcanvas:c})=>{let{useOffscreen:l,context:p}=it({disableOffcanvas:c}),d=!0,f=e.getContext(p,{alpha:!0}),h=m.getActiveRoute(),{offscreen:v,offScreenCtx:b}=at({useOffscreen:l,canvas:e}),T=!1;e.width=e.clientWidth,e.height=e.clientHeight;let x=[...Array.from({length:r}).keys()].map((P,L)=>{let D=L>=r/2?r/2+(r/2-L):L;return{width:Math.floor(ek({width:o,relativeIndex:D,amountOfPath:r})),height:Math.floor(tk({height:n,relativeIndex:D,amountOfPath:r})),opacity:D*s,rotate:0,relativeIndex:D,index:L}}),S=U.createScrollerTween({from:{rotate:0},to:{rotate:a},stagger:{each:5,from:"center"}});[...x].forEach(P=>{S.subscribeCache(P,({rotate:L})=>{P.rotate=L})});let C=()=>{if(!f)return;l&&v&&(v.width=e.width,v.height=e.height);let P=l?b:f;if(!P)return;let L=e.width/2,D=e.height/2;e.width=e.width,x.forEach(({width:$,height:j,opacity:I,rotate:R,index:N})=>{let _=x.length/2-N,k=1,A=Math.PI/180*(R-i),F=Math.cos(A)*k,B=Math.sin(A)*k;P.setTransform(F,B,-B,F,L,D+_*19),T?(P.beginPath(),P.roundRect(-$/2,-j/2+_*19,$,j,150)):(P.beginPath(),P.rect(Math.round(-$/2),Math.round(-j/2),$,j)),P.strokeStyle="#000",P.fillStyle=`rgba(238, 238, 238, ${I})`,P.stroke(),P.fill(),P.setTransform(1,0,0,1,0,0)}),ct({useOffscreen:l,offscreen:v,ctx:f})},E=ze.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>me(t)},ease:!0,easeType:"spring"});E.init();let w=()=>{C(),d&&u.useNextFrame(()=>w())};u.useFrame(()=>{w()});let M=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{C()})}),O=X.watch("navigationIsOpen",P=>{if(P){d=!1;return}setTimeout(()=>{d=!0,m.getActiveRoute().route===h.route&&u.useFrame(()=>w())},500)});return()=>{S.destroy(),M(),O(),S.destroy(),S=null,E.destroy(),E=null,f=null,v=null,b=null,S=null,d=!1,x=null,p=null}};var RS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=st,e(()=>{yc();let{canvas:a,canvasScroller:c}=o(),l=kS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),vc(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${r("canvasScroller")}></div>
        </div>
    `};var NS=m.createComponent({tag:"scroller-n1",component:RS,props:{amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([NS]);var PS=()=>(Se({active:!0,prevRoute:"#scrollerN0?version=4&activeId=4",nextRoute:"",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: ScrollTrigger"),g`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`);var AS=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Qn=m.createComponent({tag:"dynamic-list-button",component:AS,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Tc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],OS=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],$S=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],LS=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Zn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var rk=[{buttonLabel:"sample1",data:OS},{buttonLabel:"salmple2",data:$S},{buttonLabel:"sample3",data:LS},{buttonLabel:"Initial",data:Tc}],ok=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function nk({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return rk.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function sk({bindProps:e,staticProps:t,proxi:r}){return ok.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var DS=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${nk({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${sk({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function ik({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var FS=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>ik({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function ak(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var ck=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${ak(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,BS=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,T,x)=>x.map(({key:S})=>S).indexOf(b.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{h=h<Zn.length-1?h+1:0,f.innerData=Zn[h],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:b})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerData,render:({current:b})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
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
                        ${i({observe:()=>f.counter,render:()=>ck({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var VS=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var Sc=m.createComponent({tag:"dynamic-list-card-inner",component:VS,props:{key:()=>({value:"",type:String})}});var WS=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var jS=m.createComponent({tag:"dynamic-list-counter",component:WS,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var zS=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var HS=m.createComponent({tag:"dynamic-list-empty",component:zS});var US=m.createComponent({tag:"dynamic-list-card",component:BS,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Zn[0],type:Array}),innerDataUnivoque:()=>({value:Zn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[jS,HS,Sc,Qn]});var GS=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var qS=m.createComponent({tag:"dynamic-slotted-label",component:GS,props:{label:()=>({value:"",type:String})}});var JS=m.createComponent({tag:"dynamic-list-repeater",component:FS,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[US,qS]});var YS=m.createComponent({tag:"dynamic-list",component:DS,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Tc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Qn,JS,Sc]});m.useComponent([YS]);var XS=()=>g` <dynamic-list> </dynamic-list> `;var KS=({refs:e})=>{let t=U.createTimeTween({data:{opacity:0,scale:.5},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(i,({scale:a,opacity:c})=>{i.style.scale=`${a}`,i.style.opacity=`${c}`}),r.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{opacity:1,scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=X.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var lk=async({playIntro:e,playSvg:t})=>{await e(),t()},QS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll('[ref="svg_group"]')],{destroy:i,playIntro:a,playSvg:c}=KS({refs:s});return setTimeout(()=>{lk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">${o}</div>
    </div>`};var ZS=m.createComponent({tag:"home-component",component:QS,props:{svg:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([ZS]);var e_=async()=>{let{data:e}=await qe({source:"./asset/svg/ms_nord.svg?v=1.3"});return g`
        <home-component
            ${m.staticProps({svg:e})}
        ></home-component>
    `};var t_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function uk(e){return Math.floor(Math.random()*e)}var _c=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${t_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:uk(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var es=e=>{m.useMethodByName(e).toggleActive()};var r_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{es(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{es(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var o_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${r_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var n_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${_c({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${o_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var s_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var i_=m.createComponent({tag:"matrioska-item",component:s_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var a_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{es(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{es(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var c_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${a_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var l_=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${_c({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${c_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var pk=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},u_={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?pk(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Qn,i_]},p_=m.createComponent({tag:"page-matrioska-repeat",component:n_,...u_}),m_=m.createComponent({tag:"page-matrioska-invalidate",component:l_,...u_});m.useComponent([p_,m_]);var d_=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,h_=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var op=0,mk=({indicators:e,proxi:t})=>[...e].map((r,o)=>ze.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+op-De(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),f_=({pins:e})=>{e.forEach(t=>t.refresh())},dk=({titles:e})=>[...e].map(t=>ze.createParallax({item:t,propierties:"x",reverse:!0,range:9})),g_=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},b_=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},y_=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=mk({indicators:e,proxi:n}),a=dk({titles:t}),c=document.querySelector(".l-navcontainer__side");op=De(c)/2;let l=u.useResize(()=>{op=De(c)/2}),p=new qs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!1,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{f_({pins:i}),g_({nav:r})},onEnterBack:()=>{f_({pins:i}),g_({nav:r})},onLeave:()=>{b_({nav:r})},onLeaveBack:()=>{b_({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var hk=(e,t)=>e===0?1:e===t-1?-1:0,fk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},gk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),v_=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(be.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=y_({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,b)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:x}=le(T),S=me(T),C=Number.parseInt(v)===0?window.innerHeight+1:x+S-window.innerHeight,E=Math.max(1,Math.abs(v-b)),w=2e3,O=1+(l-E)/l*.9,P=E/l*w*O;Lr.to(C+hk(v,l),{duration:P})}),()=>{h()}}),be.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${gk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${fk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var T_=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var S_=m.createComponent({tag:"horizontal-scroller-button",component:T_,props:{id:()=>({value:-1,type:Number})}});var __=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var x_=m.createComponent({tag:"horizontal-scroller-section",component:__,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var C_=m.createComponent({tag:"horizontal-scroller",component:v_,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[S_,x_]});m.useComponent([C_]);var E_=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:"",color:"black"}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var w_=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var I_=m.createComponent({tag:"svg-star",component:w_,props:{fill:()=>({value:"#000000",type:String})}});var bk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
                    ${e({input:n=>{let s=n.target.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${e({input:n=>{let s=n.target.value??0;o.xDepth=Number(s)}})}
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
                    ${e({input:n=>{let s=n.target.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${e({input:n=>{let s=n.target.value??0;o.yDepth=Number(s)}})}
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
                    ${e({input:n=>{let s=n.target.value??0;o.yLimit=Number(s)}})}
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
    </div>`,M_=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${bk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var yk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",np=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${yk({debug:o,id:s.id})}
                ${np({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var sp=({element:e})=>({height:me(e),width:De(e),offSetLeft:le(e).left,offSetTop:le(e).top}),k_=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),R_=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var ts=()=>{},N_=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,v=0,b=0,T=0,x=0,S=!1,C=!1,E={x:0,y:0},w=0,M=ts,O=ts,P=ts,L=ts,D=ts,$=ts,j=[],I=U.createSpring({data:{delta:0,ax:0,ay:0}}),R=()=>{S=!1},N=()=>{let{vw:B,vh:Q}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},H=E.x,J=E.y,{xgap:q,ygap:te}=S?C?(C=!1,{xgap:0,ygap:0}):{xgap:H-v,ygap:J-T}:{xgap:0,ygap:0};S&&(b+=q,x+=te);let{xInMotion:re,yInMotion:ae}=S?{xInMotion:b,yInMotion:x}:{xInMotion:H,yInMotion:J},{ax:ye,ay:Ae}=l.centerToViewoport||l.drag?{ax:-(B/2-re)/l.xDepth,ay:(Q/2-ae)/l.yDepth}:{ax:-(B/2-(re-f))/l.xDepth,ay:(Q/2-(ae-h))/l.yDepth};v=H,T=J;let Oe=ye>l.xLimit||ye<-l.xLimit,Ue=Ae>l.yLimit||Ae<-l.yLimit;Oe&&(b-=q),Ue&&(x-=te);let St=be.clamp(ye,-l.xLimit,l.xLimit),_t=be.clamp(Ae,-l.yLimit,l.yLimit),Ft=Math.sqrt(Math.pow(Math.abs(_t),2)+Math.pow(Math.abs(St),2));I.goTo({delta:Ft,ax:St,ay:_t}).catch(()=>{}),j.forEach(Et=>{Et({delta:Ft,factor:l.factor})})},_=B=>{w!==B&&(E.y-=w,w=B,E.y+=w),N()},k=({page:B})=>B.y>h&&B.y<h+p&&B.x>f&&B.x<f+d,A=({page:B})=>{k({page:B})&&(S=!0,C=!0)},F=()=>{$(),$=l.useScroll?u.useScroll(({scrollY:B})=>{_(B)}):()=>{}};return e(({element:B})=>{let{container:Q}=r();l.afterInit(B);let H=I.subscribe(({delta:re,ax:ae,ay:ye})=>{Q.style.transform=`translate3D(0,0,0) rotateY(${ae}deg) rotateX(${ye}deg)`,l.onUpdate({delta:re,deltaX:ae,deltaY:ye})}),J=I.onComplete(({ax:re,ay:ae})=>{Q.style.transform=`rotateY(${re}deg) rotateX(${ae}deg)`}),q=u.useMouseMove(({page:re})=>{E={x:re.x,y:re.y},N()}),te=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=sp({element:B}))});return o(()=>l.drag,re=>{if(D(),L(),P(),O(),M(),re){b=window.innerWidth/2,x=window.innerHeight/2,M=u.useTouchStart(({page:ae})=>{A({page:ae})}),O=u.useTouchEnd(()=>{R()}),P=u.useMouseDown(({page:ae})=>{A({page:ae})}),L=u.useMouseUp(()=>{R()}),D=u.useTouchMove(({page:ae})=>{E={x:ae.x,y:ae.y},N()});return}},{immediate:!0}),o(()=>l.useScroll,(re,ae)=>{if(re){F();return}re!==ae&&$()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=sp({element:B})),E={x:window.innerWidth/2,y:window.innerHeight/2},N()}),()=>{H(),J(),te(),q(),$(),M(),O(),P(),L(),D(),I.destroy(),j=[],I=null,p=null,d=null,f=null,h=null,v=null,b=null,T=null,x=null,S=null,C=null,E=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{j=k_({childrenId:c})},render:()=>np({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var ip=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),P_=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var vk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,Tk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=ip(l),d=ip(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:v}=P_(f);a.goTo({depth:c,rotateX:h,rotateY:v}).catch(()=>{})},A_=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:v,classList:b,component:T}=e(),x=o?"is-root":"is-children",S=`--item-width:${c};`,C=`--item-height:${l};`,E=`--offset-x:${p};`,w=`--offset-y:${d};`,M=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:O,factor:P})=>{s&&Tk({delta:O,factor:P,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:M})}),r(({element:O})=>{let P=M.subscribe(({depth:$,rotateX:j,rotateY:I})=>{let R=$+v;O.style.transform=`translate3D(0,0,${R}px) rotateX(${j}deg) rotateY(${I}deg)`}),L=M.onComplete(({depth:$,rotateX:j,rotateY:I})=>{let R=$+v;O.style.transform=`translateZ(${R}px) rotateX(${j}deg) rotateY(${I}deg)`}),D=v;return O.style.transform=`translateZ(${D}px)`,()=>{P(),L(),M.destroy(),M=null}}),g`<div
        class="c-move3d-item ${x} anchor-${n}"
        style="${S}${C}${E}${w}"
    >
        <div class="c-move3d-item__content ${b}"></div>
        ${vk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var O_=m.createComponent({tag:"move-3d-item",component:A_,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var rs=m.createComponent({tag:"move-3d",component:N_,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[O_]});var $_=m.createComponent({tag:"move-3d-page",component:M_,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[rs]});m.useComponent([$_,I_]);var L_=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e;return Se({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview",color:"black"}),xe("<strong>Move#d:</strong> css && js 3d shape"),g`<move-3d-page
        ${m.staticProps({data:t})}
    ></move-3d-page> `};var{get3dItemUnit:z}=R_({ratio:1980}),D_=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var F_={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:D_}};var B_=({getState:e})=>{let{content:t}=e();return g`${t}`};var os=m.createComponent({tag:"any-component",component:B_,props:{content:()=>({value:"",type:String})}});var V_=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=0,c=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(f=>{c.subscribe(({x:h,y:v})=>{f.style.translate=`${h}px ${v}px`})});let l=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(f=>{f&&l.subscribeCache(f,({rotation:h})=>{f.style.rotate=`${h}deg`})});let p=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),d=u.useMouseMove(({client:f})=>{let{x:h,y:v}=f,b=v-n,T=h-s;if(Math.abs(T)>10||Math.abs(b)>10){n=v,s=h;let S=Math.atan2(b,T)*t+180,C=Math.abs(i-S);C>180&&i<S&&(a-=C),C>180&&i>S&&(a+=C);let E=S+a+90;l.goTo({rotation:E}),i=S}c.goTo({x:h-r/2,y:v-o/2})});return{destroy:()=>{c.destroy(),c=null,l.destroy(),l=null,p(),d(),r=null,o=null,n=null,s=null,i=null,a=null}}};var Sk=5,W_=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=nt(),n=[...Array.from({length:Sk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=V_({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var xc=m.createComponent({tag:"mouse-trail",component:W_});var ns=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),Cv(r)};var j_=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:v,m3_b:b,m4_b:T,b1_stone:x,m1_stone:S})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[]},{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:170,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:b}}},children:[]},{props:{id:6,depth:50,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:x}}},children:[]},{props:{id:8,depth:100,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}];m.useComponent([rs,os,xc]);var z_=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),[t,r,o,n,s,i,a,c,l,p,d,f,h,v,b,T,x,S,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>ns({svg:e,id:w}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview",color:"black"}),xe("<strong>Svg</strong>: Mob lettering"),g`<div class="l-mob-01">
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:j_({u0:t,u1:r,o,o_b:n,m1:s,m2:a,m3:c,m4:p,b1:f,b1_b:h,b3:v,b4:b,b5:T,sign:x,m1_b:i,m3_b:l,m4_b:d,b1_stone:S,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var H_=()=>be.mq("min","desktop"),U_="#home",ap=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(ap=m.getActiveParams(),U_=e)});var G_=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=H_(),e(()=>{let s=u.useResize(()=>{n.active=H_()});return o(()=>n.active,i=>{i&&m.loadUrl({url:U_,params:ap??{}})}),()=>{s(),ap=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var q_=m.createComponent({tag:"only-desktop-cta",component:G_,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([q_]);var J_=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"});return g`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <h2 class="l-only-desktop__title">ops...<br /></h2>
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
                <h3 class="l-only-desktop__title">My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${e}</div>
            </div>
        </div>
    `};var cp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=it({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=at({useOffscreen:r,canvas:e}),l=r?c:s,p=Kn(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerHeight/18,v=window.innerHeight/18,T=yo({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:v,gutter:1}).items,x=T.map(N=>({...N,scale:1,rotate:0})),S=({row:N,col:_})=>{let k=(f+1)*N;return x[k+_]},E={...S({row:1,col:1}),scale:1,rotate:0},M={...S({row:4,col:5}),scale:1,rotate:0},O=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),P=U.createTimeTween({data:E,duration:1e3,ease:"easeInOutBack"}),L=U.createSpring({data:M});x.forEach(N=>{O.subscribeCache(N,({scale:_,rotate:k})=>{N.rotate=k,N.scale=_})}),P.subscribe(N=>{E=N}),L.subscribe(N=>{M=N});let D=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});D.goTo(O,{scale:.2,rotate:90},{duration:1e3});let $=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});$.goTo(P,{x:S({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(P,{y:S({row:8,col:8}).y,rotate:180}).goTo(L,{y:S({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(P,{x:S({row:8,col:1}).x,rotate:0,scale:1}).goTo(L,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(P,{y:S({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(L,{rotate:0,y:S({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let j=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let N=r?c:s;if(N){e.width=e.width,x.forEach(({x:_,y:k,width:A,height:F,rotate:B,scale:Q,offsetXCenter:H,offsetYCenter:J},q)=>{if(q===40){let ye=Math.PI/180*E.rotate,Ae=Math.cos(ye)*E.scale,Oe=Math.sin(ye)*E.scale;N.setTransform(Ae,Oe,-Oe,Ae,Math.floor(E.offsetXCenter+E.x),Math.floor(E.offsetYCenter+E.y)),p?(N.beginPath(),N.roundRect(Math.floor(-E.width/2),Math.floor(-E.height/2),Math.floor(E.width),E.height,5)):(N.beginPath(),N.rect(Math.floor(-E.width/2),Math.floor(-E.height/2),Math.floor(E.width),Math.floor(E.height))),N.fillStyle="#000000",N.fill()}let te=Math.PI/180*B,re=Math.cos(te)*Q,ae=Math.sin(te)*Q;N.setTransform(re,ae,-ae,re,Math.floor(H+_),Math.floor(J+k)),p?(N.beginPath(),N.roundRect(Math.floor(-A/2),Math.floor(-F/2),A,F,5)):(N.beginPath(),N.rect(Math.floor(-A/2),Math.floor(-F/2),A,F)),N.fillStyle="rgba(238, 238, 238, 0.9)",N.fill()});{let _=Math.PI/180*M.rotate,k=Math.cos(_)*M.scale,A=Math.sin(_)*M.scale;N.setTransform(k,A,-A,k,Math.floor(M.offsetXCenter+M.x),Math.floor(M.offsetYCenter+M.y)),p?(N.beginPath(),N.roundRect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height),5)):(N.beginPath(),N.rect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height))),N.fillStyle="#a86464",N.fill()}ct({useOffscreen:r,offscreen:a,ctx:s})}},I=()=>{j(),n&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let R=X.watch("navigationIsOpen",u.useDebounce(N=>{if(N){$.pause(),D.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&($.resume(),D.resume(),n=!0,u.useFrame(()=>I()))},200)},200));return{destroy:()=>{R(),s=null,a=null,c=null,T=[],n=!1,O?.destroy?.(),P?.destroy?.(),L?.destroy?.(),$?.destroy?.(),D?.destroy?.(),x=null,E=null,M=null,o=null,O=null,P=null,L=null,$=null,D=null},play:()=>{$.play(),D.isActive()||D.play()},playReverse:()=>{$.playReverse(),D.isActive()||D.play()},playFromLabel:()=>{$.setTween("my-label",[P,L]).then(()=>{$.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),D.isActive()||D.play()},playFromLabelReverse:()=>{$.setTween("my-label",[P,L]).then(()=>{$.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),D.isActive()||D.play()},revertNext:()=>{$.reverseNext()},pause:()=>{$.pause(),D.pause()},resume:()=>{$.resume(),D.resume()},stop:()=>{$.stop(),D.stop()}}};function _k({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var Y_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();document.body.style.background=st;let c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();c=cp({canvas:d,...t()}),l=c.destroy;let f=u.useResize(()=>{l(),c=cp({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,v])=>{let{method:b}=v;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[b]())}),u.useFrame(()=>{a.isMounted=!0}),c?.play?.(),()=>{f(),l(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
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
                        ${_k({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var xk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},X_=m.createComponent({tag:"async-timeline",component:Y_,props:{disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:xk,type:"Any"})}});m.useComponent([X_]);var K_=()=>(Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview",color:"black"}),xe("<strong>Canvas</strong>: TimeTween Spring & AsyncTimeline"),g`<div class="l-padding">
        <async-timeline></async-timeline>
    </div>`);var Q_=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([rs,os,xc]);var Z_=async()=>{let{data:e}=await qe({source:"./asset/svg/rdp.svg?v=0.4"}),[t,r,o,n,s,i,a,c,l,p,d,f]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>ns({svg:e,id:v}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview",color:"black"}),xe("<strong>Svg</strong>: RDP lettering"),g`<div class="l-rdp-01">
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:Q_({letter_d:t,letter_r:r,letter_p:o,letter_r_shadow:n,letter_d_shadow:s,letter_p_shadow:i,letter_r_pieces:a,letter_d_pieces:c,letter_p_pieces:l,letter_r_fill:p,letter_d_fill:d,letter_p_fill:f}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var ex=({screenElement:e,scrollerElement:t,layer01:r,layer02:o,layer04:n})=>{let s=ze.createParallax({item:r,align:"center",range:3,propierties:"x",ease:!1}),i=ze.createParallax({item:o,align:"center",range:5,propierties:"x",ease:!1}),a=ze.createParallax({item:n,align:"center",range:7,propierties:"x",ease:!1}),c=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[s,i,a]});return c.init(),c.set(55),{destroy:()=>{c.destroy(),s.destroy(),i.destroy(),a.destroy(),c=null,s=null,i=null,a=null}}};var tx=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer01:n,layer02:s,layer03:i,layer04:a}=e();return t(()=>{let{screen:c,scroller:l,layer01:p,layer02:d,layer04:f}=o(),{destroy:h}=ex({screenElement:c,scrollerElement:l,layer01:p,layer02:d,layer04:f});return()=>{h()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer04")}
                >
                    ${a}
                </div>
                <div class="mobbu2025__layer">${i}</div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer02")}
                >
                    ${s}
                </div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer01")}
                >
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var rx=m.createComponent({tag:"mobbu-2025",component:tx,props:{layer01:()=>({value:"",type:String}),layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String}),layer04:()=>({value:"",type:String})}});m.useComponent([rx]);var ox=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob-2025.svg?v=0.9"}),[t,r,o,n]=["layer-01","layer-02","layer-03","layer-04"].map(i=>ns({svg:e,id:i}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview",color:"black"}),xe("<strong>Svg</strong>: Mobbu2025 parallax /  <strong>[ drag or scroll ]</strong>"),g`<div class="l-mob-02">
        <mobbu-2025
            ${ya({layer01:t,layer02:r,layer03:o,layer04:n})}
        ></mobbu-2025>
    </div>`};var nx="TOP-LEFT",sx="TOP-RIGHT",ix="BOTTOM-LEFT",ax="BOTTOM-RIGHT",cx="CENTER";var lx=({align:e,root:t,child:r,perspective:o,usePrespective:n,maxLowDepth:s=-200,maxHightDepth:i=200,onDepthChange:a=()=>{},depthFactor:c=30})=>{let l=0,p=0,d=0,f=0,h=0,v=r.offsetWidth,b=r.offsetHeight,T=t.offsetWidth,x=t.offsetHeight,S=(v-T)/2,C=(b-x)/2,E={x:0,y:0},w=!1,M=!1,O=30,P=()=>{if(n&&o>0){let H=o/(o-d);S=(v-T/H)/2,C=(b-x/H)/2}else S=(v-T)/2,C=(b-x)/2};P();let L={xValue:0,yValue:0},D=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case nx:{L={xValue:S,yValue:C},p=v,l=b;break}case sx:{L={xValue:-S,yValue:C},p=-v,l=b;break}case ix:{L={xValue:S,yValue:-C},p=v,l=-b;break}case ax:{L={xValue:-S,yValue:-C},p=-v,l=-b;break}}let $=D.subscribe(({x:H,y:J,z:q})=>{r&&(r.style.transform=`translate3D(${H}px, ${J}px, ${q}px)`)});D.set({x:L.xValue,y:L.yValue}),[...t.querySelectorAll("a, button")].forEach(H=>{H.setAttribute("draggable","false"),H.style.userSelect="none"});let I=({page:H,target:J})=>{(J===r||xo(r,J))&&(w=!0,M=!0,E={x:H.x,y:H.y})},R=({page:H})=>{let{x:J,y:q}=H,{xgap:te,ygap:re}=w?M?(M=!1,{xgap:0,ygap:0}):{xgap:J-f,ygap:q-h}:{xgap:0,ygap:0},ae=S>0?be.clamp(p+te,-S,S):be.clamp(p+te,S,-S),ye=C>0?be.clamp(l+re,-C,C):be.clamp(l+re,C,-C),Ae=w?ae:p,Oe=w?ye:l,{xComputed:Ue,yComputed:St}=w?{xComputed:Ae,yComputed:Oe}:{xComputed:J,yComputed:q};p=Ae,l=Oe,f=J,h=q,w&&(L={xValue:Ue,yValue:St},D.goTo({x:Ue,y:St}).catch(()=>{}))},N=u.useTouchStart(({page:H,target:J})=>{I({page:H,target:J})}),_=u.useMouseDown(({page:H,target:J})=>{I({page:H,target:J})}),k=u.useTouchEnd(()=>{w=!1}),A=u.useMouseUp(()=>{w=!1}),F=u.useMouseMove(({page:H})=>{R({page:H})}),B=u.useTouchMove(({page:H})=>{R({page:H})});t.addEventListener("click",H=>{let{x:J,y:q}=E,te=Math.abs(f-J)>O,re=Math.abs(h-q)>O;(te||re)&&H.preventDefault()},!1),n&&r.addEventListener("wheel",H=>{let{spinY:J}=u.normalizeWheel(H);d=be.clamp(d+J*c,s,i),P(),a({depth:d}),D.goTo({z:d}).catch(()=>{})},{passive:!0});let Q=u.useResize(()=>{v=r.offsetWidth,b=r.offsetHeight,T=t.offsetWidth,x=t.offsetHeight,P()});return{destroy:()=>{$(),N(),k(),_(),A(),F(),B(),Q(),D.destroy(),D=null,t=null,r=null}}};var ux=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=lx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange});return s.afterInit({root:i}),()=>{l.destroy(),c=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper ${s.childClass}"
            ${t("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var px=m.createComponent({tag:"c-dragger",component:ux,props:{rootClass:()=>({value:"",type:String}),childClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:cx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([px,os]);var mx=!1,dx=()=>{Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview",color:"black"});let e=g`
        <div class="dragger-border">
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `,t=g`<div class="dragger-child">
        <div class="dragger-child-1">
            <a class="dragger-child__link" href="#">link test</a>
            <span class="dragger-child-1__diagonal"> </span>
        </div>
        <div class="dragger-child-2">
            <span class="dragger-child-2__diagonal"> </span>
        </div>
    </div>`;return xe("<strong>Dragger:</strong> Drag and zoom"),g`<div class="l-dragger">
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",childClass:"",align:"CENTER",maxHightDepth:200,maxLowDepth:-1e3,afterInit:({root:o})=>{mx&&console.log(o)},onDepthChange:({depth:o})=>{mx&&console.log(o)}})}
        >
            <!-- Root border -->
            <any-component
                slot="root-slot"
                ${m.staticProps({content:e})}
            ></any-component>

            <!-- Child -->
            <any-component
                slot="child-slot"
                ${m.staticProps({content:t})}
            ></any-component>
        </c-dragger>
    </div>`};var hx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(me(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(b=>me(b)/2),d=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((b,T)=>{let x=b.firstChild;d.subscribeCache(b,({angleInRadian:S,scale:C})=>{let E=a+c*S,w=E*Math.cos(S),M=E*Math.sin(S);b.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${M-p[T]}px)`,x&&(x.style.scale=`${C}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let b=r.width/2,T=r.height/2,x=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=x;S++){let C=i/x*S,E=a+c*C,w=b+E*Math.cos(C),M=T+E*Math.sin(C);S===0?o.moveTo(w,M):o.lineTo(w,M)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),v(),o=null,d=null,f=null,e=null}}};var fx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=me(t)/2-100,a=e.map(h=>me(h)/2);e.forEach((h,v)=>{n.subscribeCache(h,({x:b})=>{let T=Math.sin(b*s)*i,x=Math.cos(b*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${x-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{c++,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var gx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>me(h)/2),s=De(t)/2-100,i=me(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,v)=>{let b=h.firstChild;l.subscribeCache(h,({x:T,scale:x})=>{let S=T/c,C=2/(3-Math.cos(2*S)),E=C*Math.cos(S)*s,w=C*Math.sin(2*S)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${E-n[v]}px, ${w-n[v]}px)`,b&&(b.style.scale=`${x}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2,b=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=b;T++){let x=T/b*2*Math.PI,S=2/(3-Math.cos(2*x)),C=S*Math.cos(x)*s,E=S*Math.sin(2*x)/2*i;T===0?o.moveTo(h+C,v+E):o.lineTo(h+C,v+E)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};var bx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=De(t)-200,s=me(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>me(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,b)=>{let T=0,x=v.firstChild,S=-l[b]-n/2;p.subscribeCache(v,({x:C,scale:E})=>{let w=Math.sign(C-T)||1,M=Math.sin(C/a)*s*w;v.style.transform=`translate3D(0px,0px,0px) translate(${C+S}px, ${M-l[b]}px)`,x&&(x.style.scale=`${E}`),T=C})});let d=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,b=r.height/2,T=200,x=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=x;S++){let{x:C,y:E}=(()=>{if(S<=T){let w=S/T*n,M=Math.sin(w/a)*s;return{x:w,y:M}}if(S>T){let M=(x-S)/T*n,O=Math.sin(M/a)*s*-1;return{x:M,y:O}}return{x:0,y:0}})();S===0?o.moveTo(v+C-n/2,b+E):o.lineTo(v+C-n/2,b+E)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var lp={sin:bx,circle:fx,infinite:gx,archimede:hx};var yx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var vx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=Array.from({length:5}),c=yx(),{destroy:l,play:p,stop:d,resume:f}=c;return s(({element:h})=>{let{target:v}=o(),{canvas:b}=r();u.useFrame(()=>{({destroy:l,play:p,stop:d,resume:f}=lp[i.name]({targets:v,container:h,canvas:b})),p()});let T=u.useResize(()=>{d(),l(),{destroy:l,play:p,stop:d,resume:f}=lp[i.name]({targets:v,container:h,canvas:b}),p()});return()=>{l(),T(),l=null,p=null,d=null,f=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${t("canvas")}></canvas>
        <div class="c-math__nav">
            <button
                type="button"
                class="c-math__play"
                ${n({click:()=>{f()}})}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${n({click:()=>{d()}})}
            ></button>
        </div>
        <div class="c-math__circle-container">
            ${a.map((h,v)=>g`<span
                        class="c-math__circle"
                        data-index="${v+1}"
                        ${t("target")}
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Tx=m.createComponent({tag:"math-animation",component:vx,props:{name:()=>({value:"",type:String})}});m.useComponent([Tx]);var Sx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"",backRoute:"#plugin-overview",color:"black"}),xe("<strong>Math:</strong> trigonometry based animation"),g`<div class="l-math">
        ${t.map(o=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:o})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var pp="home",Ec="about",Z="template-mobJs-component",ke="template-doc-default",ss="template-listing",ft="template-animation",Tt="template-test",wc=new Set([Z,ke]),ie=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Je=[{url:"./#mobJs-overview",title:"mobJs"}],up=[{url:"./#mobCore-overview",title:"mobCore"}],Br=[{url:"./#mobMotion-overview",title:"mobMotion"}],Cc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],fr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Ic=[{hash:"pageNotFound",layout:kv,props:{}},{hash:"onlyDesktop",layout:J_,props:{}},{hash:"about",layout:BT,templateName:Ec,props:{}},{hash:"canvas-overview",layout:Ya,templateName:ss,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:cS,templateName:ft,props:{}},{hash:"animatedPatternN1",layout:mS,templateName:ft,props:{}},{hash:"caterpillarN0",layout:gS,templateName:ft,props:{}},{hash:"caterpillarN1",layout:TS,templateName:ft,props:{}},{hash:"caterpillarN2",layout:CS,templateName:ft,props:{}},{hash:"async-timeline",layout:K_,templateName:ft,props:{}},{hash:"scrollerN0",layout:MS,templateName:ft,props:{}},{hash:"scrollerN1",layout:PS,templateName:ft,props:{}},{hash:"dynamic-list",layout:XS,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Je,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:d_,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:h_,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:e_,templateName:pp,props:{}},{hash:"mobCore-overview",layout:$e,skipTransition:!0,templateName:ke,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Cc}},{hash:"mobCore-defaults",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:up,section:"mobCore",rightSidebar:Cc}},{hash:"mobCore-events",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:up,section:"mobCore",rightSidebar:Cc}},{hash:"mobCore-store",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:up,section:"mobCore",rightSidebar:Cc}},{hash:"mobJs-overview",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Je,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Fr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:ie,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-defaults",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-overview",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-parallax",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-sequencer",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-scrolltrigger",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-sync-timeline",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-create-stagger",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-async-timeline",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-tween-spring-lerp",layout:$e,templateName:ke,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"horizontalScroller",layout:E_,templateName:ft,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ft,layout:L_,props:F_.shape1},{hash:"plugin-dragger",layout:dx,templateName:ft,props:{}},{hash:"math-animation-01",layout:Sx,templateName:ft,props:{names:["circle","sin","infinite","archimede"]}},{hash:"plugin-overview",layout:Ya,templateName:ss,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Ya,templateName:ss,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:z_,templateName:ft,props:{}},{hash:"mob-02",layout:ox,templateName:ft,props:{}},{hash:"rdp-01",layout:Z_,templateName:ft,props:{}}];var _x=0;m.beforeRouteChange(()=>{_x=window.scrollY});var Ck=new Set([Z,ke,ss,Ec,Tt]),Ek=new Set([Z,ke,ss,Ec,pp,Tt]),xx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Ck.has(t)?"var(--header-height)":"0",e.style.left=Ek.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${_x}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Cx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Ex=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},wx=()=>{Ex(),u.useResize(()=>{Ex()})};var Ix=({getProxi:e,bindEffect:t,bindText:r,watch:o,addMethod:n})=>{let s=e();return n("updateRawContent",i=>{s.rawContent=i.length===0?"":`${i} | <strong>fps: ${u.getInstantFps()}</strong>`}),o(()=>s.rawContent,i=>{let a=i.length>0;if(!a){s.visible=!1,s.content="";return}s.content=`${i}`,a&&(s.visible=!0)},{immediate:!0}),g`<p
        class="animation-description"
        ${t({toggleClass:{visible:()=>s.visible&&!s.navigationIsOpen}})}
    >
        ${r`${"content"}`}
    </p>`};var Mx=m.createComponent({tag:"animation-description",component:Ix,bindStore:X,state:{rawContent:()=>({value:"",type:String}),content:()=>({value:"",type:String}),visible:()=>({value:!0,type:Boolean})}});var ai=!0,wk=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},kx=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},Ik=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},Mk=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=nt().close,s=nt().previous,i=nt().up,a=nt().swap,c=nt().selectAll;return g`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.prev!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.prev&&(ai=!1,e.currentNode=e.currentNode?.prev)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.next!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.next&&(ai=!1,e.currentNode=e.currentNode?.next)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size>0}})}
                    ${t({click:()=>{wk({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{kx({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{kx({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{Ik({proxi:e,emit:o})}})}
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
    `},Rx=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),ai=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(ai&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}ai=!0}),g`
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
            ${Mk({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var Nx=()=>{fn(Xn)?.toggle()},Px=({id:e})=>{fn(Xn)?.addRouteWithoutUpdate({id:e})},Ax=({id:e,add:t})=>{fn(Xn)?.addSelectedNodes({id:e,add:t})};function kk(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var Ox=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{Ax({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${n.id}"
                ${r({toggleAttribute:{checked:()=>n.checked}})}
                ${t({click:s=>{n.checked=s.target.checked}})}
            />
            <span class="checkbox-control"></span>
        </div>
        <button
            type="button"
            class="c-history-item__button"
            ${t({click:()=>{Px({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${kk(n.url)}
        </button>
    </div>`};var $x=m.createComponent({tag:"history-item",component:Ox,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Lx=m.createComponent({tag:"custom-history",component:Rx,state:{linkedList:()=>({value:new an,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[$x]});var is="reset",gr="tree",ci="filter_component";var br=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new Ct({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=me(t),s=me(e),i=De(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var as=u.createStore({currentId:()=>({value:"",type:String})});var Dx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Fx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Rk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Nk=e=>e?e.map(t=>`${t}, `).join(""):"",Bx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Pk=({getState:e})=>{let{id:t}=e();if(t===is)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Dx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Fx(r.methods)}</div>
        <div><strong>refs:</strong>: ${Fx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${Rk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Dx(r?.repeaterInnerWrap?.classList)}
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
            ${Nk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Bx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Bx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Ak=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Vx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,as.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:v}=Ak({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Pk({getState:r})})}
        </div>
    </div>`};var Wx=m.createComponent({tag:"debug-component",component:Vx,state:{id:()=>({value:is,type:String,skipEqual:!1})}});var jx=e=>{m.useMethodByName(oc)?.refreshList?.({testString:e})};var mp=async(e="")=>{await m.tick(),jx(e)},zx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(mp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.target.value;mp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;mp(s)}})}
        >
            find
        </button>
    </div>`);var Hx=m.createComponent({tag:"debug-filter-head",component:zx});var Ok=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Ux=e=>`~${e}`,$k=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Ux(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Ux(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Gx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:b})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=$k({testString:b}),await m.tick(),h?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:b}=r();return b.addEventListener("input",()=>{f(b.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:v}=await Ok({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},v=()=>{},f=()=>{}}}),g`
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
                    ${n({observe:()=>p.data,key:"id",useSync:!0,render:({sync:b,current:T})=>g`
                                <debug-filter-list-item
                                    ${s({id:T.value.id,name:T.value.name})}
                                    ${i(()=>({tag:T.value.tag}))}
                                    ${b()}
                                ></debug-filter-list-item>
                            `})}
                </div>
            </div>
        </div>
    `};var yr=e=>{m.useMethodByName(Ks)?.updateId(e)},qx=()=>{m.useMethodByName(Ks)?.refreshId()};var Jx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{yr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Yx=m.createComponent({tag:"debug-filter-list-item",component:Jx,bindStore:as,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Xx=m.createComponent({tag:"debug-filter-list",component:Gx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Yx]});var Kx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Qx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value;yr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;yr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value,s=m.getIdByInstanceName(n);yr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);yr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",yr(is)}})}
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
                    ${r({click:()=>{qx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Zx=m.createComponent({tag:"debug-search",component:Qx});var e0=m.createComponent({tag:"debug-head",component:Kx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Zx]});var Mc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",En),console.log("currentListValueMap",Ts),console.log("activeRepeatMap",In),console.log("onMountCallbackMap",_s),console.log("staticPropsMap",Mn),console.log("dynamicPropsMap",xt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Xr.size),console.log("invalidateIdsMap",Qe),console.log("invalidateInstancesMap",ge),console.log("repeatIdHostMap",Gr),console.log("repeatIdsMap",Ze),console.log("repeatInstancesMap",Y),console.log("userChildPlaceholderSize",Qd()),console.log("slotPlaceholderSize",Gi()),console.log("bindTextPlaceholderMapSize",Oh()),console.log("instanceMap",qr)};var t0=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=gr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=gr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=gr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{Mc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===gr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===ci&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=gr}})}
                            ${n({toggleClass:{active:()=>a.listType===gr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=ci}})}
                            ${n({toggleClass:{active:()=>a.listType===ci}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===gr&&a.active?g`
                                    <debug-tree
                                        name="${sc}"
                                    ></debug-tree>
                                `:a.listType===ci&&a.active?g`
                                    <debug-filter-list
                                        name="${oc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${Ks}"></debug-component>
            </div>
        </div>
    </div>`};var kc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var Lk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=br({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},r0=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await Lk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>kc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var o0=()=>{m.useMethodByName(sc)?.refresh()};var Dk=e=>e>0?`( ${e} ) `:"",n0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>n0({id:i,value:t}))},s0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>n0({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=Dr.subscribe(d);return Dr.reset(d),s(()=>l.isOpen,async h=>{await Dr[h?"down":"up"](d),o0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Dk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{yr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${kc({data:l.children,staticProps:t})}
        </div>
    </div>`};var i0=m.createComponent({tag:"debug-tree-item",component:s0,bindStore:as,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var a0=m.createComponent({tag:"debug-tree",component:r0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[i0]});var c0=m.createComponent({tag:"debug-overlay",component:t0,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:gr,type:String})},child:[a0,Wx,e0,Hx,Xx]});var dp=()=>{},Rc=()=>{},Nc=()=>{},Pc=()=>{},Fk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),l0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=hr(),l=a(),p={[Z]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),v=!1;h.addEventListener("input",()=>{Nc?.(h.value)}),X.watch("navigationIsOpen",T=>{let{templateName:x}=m.getActiveRoute();x in p&&(l.shift=T)});let b=m.afterRouteChange(async({currentTemplate:T,currentRoute:x})=>{let S=p?.[T]??[];if(l.data=S,await m.tick(),l.activeSection=x,S.length>0){if(l.hide=!1,v){Pc();return}({init:dp,destroy:Rc,move:Nc,updateScroller:Pc}=br({screen:d,scroller:f,scrollbar:h})),v=!0,dp(),Pc(),Nc(0)}S.length===0&&(l.hide=!0,Rc?.(),v=!1)});return()=>{Rc?.(),b(),dp=()=>{},Rc=()=>{},Nc=()=>{},Pc=()=>{}}}),g`<div
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
            class="c-params-mobjs__scrollbar"
        />
        <ul ${t("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>Fk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var u0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var p0=m.createComponent({tag:"links-mobjs-button",component:u0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var m0=m.createComponent({tag:"links-mobjs",component:l0,child:[p0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var d0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e(),n=nt().scrollIcon;return r("update",(s,i)=>{o[s]=i}),g`<div
        class="c-quick-nav-container"
        ${t([{toggleClass:{active:()=>o.active}},{toggleClass:{"fill-white":()=>o.color==="white","fill-black":()=>o.color==="black"}}])}
    >
        <a
            class="c-quick-nav c-quick-nav--back"
            ${t({toggleClass:{"is-disable":()=>!o.backRoute},toggleAttribute:{href:()=>{let s=o.backRoute;return s.length>0?s:null}}})}
            >${n}</a
        >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${t({toggleClass:{"is-disable":()=>!o.prevRoute},toggleAttribute:{href:()=>{let s=o.prevRoute;return s.length>0?s:null}}})}
            >${n}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next"
            ${t({toggleClass:{"is-disable":()=>!o.nextRoute},toggleAttribute:{href:()=>{let s=o.nextRoute;return s&&s.length>0?s:null}}})}
            >${n}</a
        >
    </div>`};var h0=m.createComponent({tag:"quick-nav",component:d0,state:{color:()=>({value:"black",type:String,validate:e=>["white","black"].includes(e)}),active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String})}});var Bk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),f0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{wc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Bk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var g0=m.createComponent({tag:"right-sidebar",component:f0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var b0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var y0=m.createComponent({tag:"route-loader",component:b0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var v0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var T0=m.createComponent({tag:"scroll-down-label",component:v0,state:{active:()=>({value:!1,type:Boolean})}});var S0=()=>{m.useMethodByName(Uo)?.setInputFocus()},hp=e=>{m.useMethodByName(Uo)?.updateCurrentSearchFromSuggestion(e)},_0=e=>{m.useMethodByName(Uo)?.shouldCloseSuggestion(e)},Ac=()=>{m.useMethodByName(Uo)?.closeSuggestion()};var x0=({proxi:e})=>{e.active=!1,Ac()},Vk=({currentTarget:e})=>{e&&_0(e)},C0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{x0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{x0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Vk({currentTarget:a.currentTarget})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${Uo}"
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
                    name="${ri}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var E0=e=>{m.useMethodByName(ri)?.update(e)},w0=()=>{m.useMethodByName(ri)?.reset()};var Wk=async({currentSearch:e})=>{E0(e)},fp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Wk({currentSearch:r})},I0=({getRef:e,proxi:t})=>{w0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},M0=e=>`~${e}`,jk=({currentSearch:e,proxi:t})=>{let o=hr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${M0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${M0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},k0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),b=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=b.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),fp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.target.value;jk({currentSearch:d,proxi:l})},60)})}
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
            ${e({click:()=>{I0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&I0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var R0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var zk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){hp(t);return}if(e.toLowerCase()==="escape"){Ac();return}},N0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{hp(o.word)},keydown:n=>{n.preventDefault(),zk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var P0=m.createComponent({tag:"search-overlay-suggestion-item",component:N0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var A0=m.createComponent({tag:"search-overlay-suggestion",component:R0,props:{list:()=>({value:[],type:Array})},child:[P0]});var O0=m.createComponent({tag:"search-overlay-header",component:k0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[A0]});var Hk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Uk=new Set(["mob-title","mob-paragraph","mob-list"]),Gk=new Set(["mob-title","mob-paragraph"]),qk=new Set(["mob-list"]),$0=async({currentSearch:e=""})=>{let t=Ic.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Hk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let v=a.reduce((b,T)=>{if(!T)return b;let{component:x}=T;return x?T.component==="html-content"?T?.props?.data?[...b,T.props.data]:b:[...b,T]:b},o).flat().filter(({component:b})=>Uk.has(b)).flatMap(b=>Gk.has(b?.component)?b.content:qk.has(b?.component)?b?.props?.links?b.props.items.map(({label:T})=>T):b.props.items:b);return{uri:c,title:l,section:p,breadCrumbs:d,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((v,b,T)=>{let x=T>0?"/":"";return`${v}${x}${b.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var Jk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},L0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await $0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:v,refresh:b}=Jk({getRef:o});return d=v,s(()=>p.list,async()=>{await m.tick(),b(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Oc=()=>{m.useMethodByName(ac)?.toggle()};var Yk=({uri:e})=>{m.loadUrl({url:e}),Oc()},D0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Yk({uri:n.uri})}})}
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
    `};var F0=m.createComponent({tag:"search-overlay-list-item",component:D0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var B0=m.createComponent({tag:"search-overlay-list",component:L0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[F0]});var V0=m.createComponent({tag:"search-overlay",component:C0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[O0,B0]});var W0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var j0=m.createComponent({tag:"test-scss-grid",component:W0});var vo=()=>{let{templateName:e}=m.getActiveRoute();return wc.has(e)?0:40};var z0=()=>{m.useMethodByName(nc)?.toggle()};var H0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{z0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Mc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var U0=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="footer-nav__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var Xk=({delegateEvents:e,staticProps:t})=>hr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="footer-nav__item">
                <footer-nav-button
                    ${e({click:()=>{m.loadUrl({url:n}),X.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></footer-nav-button>
            </li> `).join(""),G0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="footer-nav"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${Xk({delegateEvents:e,staticProps:t})}
        </ul>
    `};var Kk=m.createComponent({tag:"footer-nav-button",component:U0,bindStore:X,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}}),q0=m.createComponent({tag:"footer-nav",component:G0,child:[Kk],state:{isMounted:()=>({value:!1,type:Boolean})}});var J0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var Y0=m.createComponent({tag:"debug-button",component:J0});var X0=m.createComponent({tag:"mob-footer",component:H0,child:[q0,Y0],state:{isMounted:()=>({value:!1,type:Boolean})}});var $c=()=>{m.useMethodByName(ti)?.scrollTop()},Lc=()=>{m.useMethodByName(ti)?.refresh()};var cs=({fireCallback:e=!0}={})=>{m.useMethodByName(ic)?.closeAllAccordion({fireCallback:e})};function Qk(){m.loadUrl({url:"home"}),cs(),X.set("navigationIsOpen",!1),$c()}var K0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>me(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
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
                        ${e({click:()=>{Qk()}})}
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
                    <div
                        class="l-header__utils"
                        ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                    >
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
            </div>
        </header>
    `};var Q0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${e({click:()=>{X.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Yt()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-visible":()=>n.isMounted}}])}
        >
            <div
                class="hamburger__box"
                ${t([{toggleClass:{"is-visible":()=>n.isMounted}}])}
            >
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var Z0=m.createComponent({tag:"mob-header-toggle",component:Q0,bindStore:X,state:{isMounted:()=>({value:!1,type:Boolean})}});var Zk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),X.set("navigationIsOpen",!1)};function eR({delegateEvents:e}){let t=hr().header,{links:r}=t,o={github:nt().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{Zk({event:c})}})}
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
            </li>`}).join("")}var eC=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${eR({delegateEvents:e})}
        </ul>
    `;var tR=()=>{Oc(),S0()},tC=({delegateEvents:e})=>{let t=nt().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{tR()}})}
    >
        ${t}
    </button>`};var rC=m.createComponent({tag:"search-cta",component:tC});var oC=({delegateEvents:e})=>{let t=nt().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{Nx()}})}
    >
        ${t}
    </button>`};var nC=m.createComponent({tag:"history-cta",component:oC});var sC=m.createComponent({tag:"mob-header-nav",component:eC,child:[rC,nC]});var iC=m.createComponent({tag:"mob-header",component:K0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[sC,Z0]});var gp=0,aC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new Ct({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=X.get();a&&(gp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${gp})`)}});return s.init(),X.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=me(r),d=me(c),f=me(l),v=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{X.getProp("navigationIsOpen")||s.set(v)},400)}),X.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${gp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function rR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function oR({main:e,proxi:t}){Lc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function nR({main:e}){e.addEventListener("click",()=>{X.set("navigationIsOpen",!1),Yt()})}var sR=()=>{$c(),cs();let{navigationIsOpen:e}=X.get();e||Lr.to(0)},cC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");X.watch("navigationIsOpen",p=>{if(p&&a){oR({main:a,proxi:s});return}rR({main:a,proxi:s})}),nR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=aC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
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
                        name="${ic}"
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
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:b=!1})=>{if(b){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:h??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var lC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=hr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${iR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var uC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var pC=m.createComponent({tag:"mob-navigation-label",component:uC,bindStore:X,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function aR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var mC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return Dr.subscribe(d),Dr.reset(d),o(()=>a.isOpen,async f=>{await Dr[f?"down":"up"](d),Lc(),!f&&cs({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${aR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var dC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let b=s.split("?")?.[0]??"",T=m.getActiveParams(),x=d===-1||T?.activeId===`${d}`,S=h===b&&x,C=f.includes(h);o.isCurrent=S||C,S&&c&&(l(),X.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),X.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Dc=m.createComponent({tag:"mob-navigation-button",component:dC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var hC=m.createComponent({tag:"mob-navigation-submenu",component:mC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Dc]});var fC=m.createComponent({tag:"mob-navigation",component:lC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[pC,hC,Dc]});var gC=m.createComponent({tag:"mob-navigation-container",component:cC,child:[fC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([iC,gC,X0,h0,y0,T0,m0,c0,j0,V0,g0,Mx,Lx]);var bC=async()=>g`
        ${""}
        <custom-history name="${Xn}"></custom-history>
        <debug-overlay name="${nc}"></debug-overlay>
        <mob-header name="${pT}"></mob-header>
        <mob-navigation-container
            name="${ti}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${Qs}"></quick-nav>
        <route-loader name="${uc}"></route-loader>
        <scroll-down-label name="${Zs}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${cc}"></right-sidebar>
        <search-overlay name="${ac}"></search-overlay>
        <animation-description
            name="${lc}"
        ></animation-description>
    `;var bp=0,yp=document.querySelector(".js-main-loader-track"),yC=(e=60)=>{let t=()=>{if(bp++,!yp)return;let r=100*bp/e;if(yp.style.transform=`scaleX(${r/100})`,bp>=e){yp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var vC=e=>{m.useMethodByName(uc).skip(e)};var TC=60,SC=()=>be.mq("max","desktop"),cR=()=>{u.useResize(()=>{SC()&&m.loadUrl({url:"onlyDesktop"})})},Bc=document.body.querySelector(".js-main-loader"),Vc=document.body.querySelector(".js-main-loader-background"),Fc=U.createTimeTween({data:{opacity:1},duration:1e3});Bc&&Vc&&[Bc,Vc].forEach(e=>{Fc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var lR=async()=>{await Iv(),await Mv(),yC(TC),await u.useFps({duration:TC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:bC,routes:Ic,index:"home",pageNotFound:"pageNotFound",beforePageTransition:xx,pageTransition:Cx,afterInit:async()=>{await Fc.goTo({opacity:0}),Fc.destroy(),Fc=null,Bc?.remove(),Vc?.remove(),Bc=null,Vc=null,wx(),cR(),vC(!1)},redirect:({route:e})=>SC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{xv(),be.setDefault({deferredNextTick:!0}),lR(),_v()});})();
//# sourceMappingURL=main.js.map
