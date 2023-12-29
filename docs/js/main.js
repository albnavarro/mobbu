(()=>{var qh=Object.create;var os=Object.defineProperty;var Uh=Object.getOwnPropertyDescriptor;var Gh=Object.getOwnPropertyNames;var Jh=Object.getPrototypeOf,Yh=Object.prototype.hasOwnProperty;var Xh=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Oi=(e,t)=>{for(var r in t)os(e,r,{get:t[r],enumerable:!0})},Kh=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Gh(t))!Yh.call(e,n)&&n!==r&&os(e,n,{get:()=>t[n],enumerable:!(o=Uh(t,n))||o.enumerable});return e};var Zh=(e,t,r)=>(r=e!=null?qh(Jh(e)):{},Kh(t||!e||!e.__esModule?os(r,"default",{value:e,enumerable:!0}):r,e));var cd=Xh((oP,ld)=>{function Xp(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Xp(r)}),e}var Yn=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Kp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Gt(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var Uf="</span>",Hp=e=>!!e.scope,Gf=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},bi=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Kp(t)}openNode(t){if(!Hp(t))return;let r=Gf(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Hp(t)&&(this.buffer+=Uf)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},qp=(e={})=>{let t={children:[]};return Object.assign(t,e),t},yi=class e{constructor(){this.rootNode=qp(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=qp({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},vi=class extends yi{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new bi(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Mo(e){return e?typeof e=="string"?e:e.source:null}function Zp(e){return ur("(?=",e,")")}function Jf(e){return ur("(?:",e,")*")}function Yf(e){return ur("(?:",e,")?")}function ur(...e){return e.map(r=>Mo(r)).join("")}function Xf(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function wi(...e){return"("+(Xf(e).capture?"":"?:")+e.map(o=>Mo(o)).join("|")+")"}function Qp(e){return new RegExp(e.toString()+"|").exec("").length-1}function Kf(e,t){let r=e&&e.exec(t);return r&&r.index===0}var Zf=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ti(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Mo(o),i="";for(;s.length>0;){let a=Zf.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var Qf=/\b\B/,ed="[a-zA-Z]\\w*",xi="[a-zA-Z_]\\w*",td="\\b\\d+(\\.\\d+)?",rd="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",od="\\b(0b[01]+)",eg="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",tg=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=ur(t,/.*\b/,e.binary,/\b.*/)),Gt({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Lo={begin:"\\\\[\\s\\S]",relevance:0},rg={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Lo]},og={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Lo]},ng={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Kn=function(e,t,r={}){let o=Gt({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=wi("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ur(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},sg=Kn("//","$"),ig=Kn("/\\*","\\*/"),ag=Kn("#","$"),lg={scope:"number",begin:td,relevance:0},cg={scope:"number",begin:rd,relevance:0},ug={scope:"number",begin:od,relevance:0},pg={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Lo,{begin:/\[/,end:/\]/,relevance:0,contains:[Lo]}]},dg={scope:"title",begin:ed,relevance:0},hg={scope:"title",begin:xi,relevance:0},mg={begin:"\\.\\s*"+xi,relevance:0},fg=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Jn=Object.freeze({__proto__:null,APOS_STRING_MODE:rg,BACKSLASH_ESCAPE:Lo,BINARY_NUMBER_MODE:ug,BINARY_NUMBER_RE:od,COMMENT:Kn,C_BLOCK_COMMENT_MODE:ig,C_LINE_COMMENT_MODE:sg,C_NUMBER_MODE:cg,C_NUMBER_RE:rd,END_SAME_AS_BEGIN:fg,HASH_COMMENT_MODE:ag,IDENT_RE:ed,MATCH_NOTHING_RE:Qf,METHOD_GUARD:mg,NUMBER_MODE:lg,NUMBER_RE:td,PHRASAL_WORDS_MODE:ng,QUOTE_STRING_MODE:og,REGEXP_MODE:pg,RE_STARTERS_RE:eg,SHEBANG:tg,TITLE_MODE:dg,UNDERSCORE_IDENT_RE:xi,UNDERSCORE_TITLE_MODE:hg});function gg(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function bg(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function yg(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=gg,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function vg(e,t){Array.isArray(e.illegal)&&(e.illegal=wi(...e.illegal))}function Sg(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function wg(e,t){e.relevance===void 0&&(e.relevance=1)}var Tg=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=ur(r.beforeMatch,Zp(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},xg=["of","and","for","in","not","or","if","then","parent","list","value"],Cg="keyword";function nd(e,t,r=Cg){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,nd(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let l=a.split("|");o[l[0]]=[s,Ig(l[0],l[1])]})}}function Ig(e,t){return t?Number(t):Eg(e)?0:1}function Eg(e){return xg.includes(e.toLowerCase())}var Up={},cr=e=>{console.error(e)},Gp=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Kr=(e,t)=>{Up[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Up[`${e}/${t}`]=!0)},Xn=new Error;function sd(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Qp(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function kg(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw cr("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Xn;if(typeof e.beginScope!="object"||e.beginScope===null)throw cr("beginScope must be object"),Xn;sd(e,e.begin,{key:"beginScope"}),e.begin=Ti(e.begin,{joinWith:""})}}function Rg(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw cr("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Xn;if(typeof e.endScope!="object"||e.endScope===null)throw cr("endScope must be object"),Xn;sd(e,e.end,{key:"endScope"}),e.end=Ti(e.end,{joinWith:""})}}function Pg(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ag(e){Pg(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),kg(e),Rg(e)}function _g(e){function t(i,a){return new RegExp(Mo(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,a]),this.matchAt+=Qp(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(l=>l[1]);this.matcherRe=t(Ti(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(a);if(!l)return null;let p=l.findIndex((m,h)=>h>0&&m!==void 0),u=this.matchIndexes[p];return l.splice(0,p),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let l=new r;return this.rules.slice(a).forEach(([p,u])=>l.addRule(p,u)),l.compile(),this.multiRegexes[a]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,l){this.rules.push([a,l]),l.type==="begin"&&this.count++}exec(a){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let p=l.exec(a);if(this.resumingScanAtSamePosition()&&!(p&&p.index===this.lastIndex)){let u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,p=u.exec(a)}return p&&(this.regexIndex+=p.position+1,this.regexIndex===this.count&&this.considerAll()),p}}function n(i){let a=new o;return i.contains.forEach(l=>a.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let l=i;if(i.isCompiled)return l;[bg,Sg,Ag,Tg].forEach(u=>u(i,a)),e.compilerExtensions.forEach(u=>u(i,a)),i.__beforeBegin=null,[yg,vg,wg].forEach(u=>u(i,a)),i.isCompiled=!0;let p=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),p=i.keywords.$pattern,delete i.keywords.$pattern),p=p||/\w+/,i.keywords&&(i.keywords=nd(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(p,!0),a&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=Mo(l.end)||"",i.endsWithParent&&a.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Og(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,l)}),i.starts&&s(i.starts,a),l.matcher=n(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Gt(e.classNameAliases||{}),s(e)}function id(e){return e?e.endsWithParent||id(e.starts):!1}function Og(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Gt(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:id(e)?Gt(e,{starts:e.starts?Gt(e.starts):null}):Object.isFrozen(e)?Gt(e):e}var Ng="11.9.0",Si=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},gi=Kp,Jp=Gt,Yp=Symbol("nomatch"),Mg=7,ad=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:vi};function l(v){return a.noHighlightRe.test(v)}function p(v){let S=v.className+" ";S+=v.parentNode?v.parentNode.className:"";let R=a.languageDetectRe.exec(S);if(R){let A=W(R[1]);return A||(Gp(s.replace("{}",R[1])),Gp("Falling back to no-highlight mode for this block.",v)),A?R[1]:"no-highlight"}return S.split(/\s+/).find(A=>l(A)||W(A))}function u(v,S,R){let A="",B="";typeof S=="object"?(A=v,R=S.ignoreIllegals,B=S.language):(Kr("10.7.0","highlight(lang, code, ...args) has been deprecated."),Kr("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=v,A=S),R===void 0&&(R=!0);let J={code:A,language:B};j("before:highlight",J);let Q=J.result?J.result:m(J.language,J.code,R);return Q.code=J.code,j("after:highlight",Q),Q}function m(v,S,R,A){let B=Object.create(null);function J(F,z){return F.keywords[z]}function Q(){if(!U.keywords){Ee.addText(me);return}let F=0;U.keywordPatternRe.lastIndex=0;let z=U.keywordPatternRe.exec(me),X="";for(;z;){X+=me.substring(F,z.index);let ce=qe.case_insensitive?z[0].toLowerCase():z[0],Pe=J(U,ce);if(Pe){let[wt,zh]=Pe;if(Ee.addText(X),X="",B[ce]=(B[ce]||0)+1,B[ce]<=Mg&&(Do+=zh),wt.startsWith("_"))X+=z[0];else{let Hh=qe.classNameAliases[wt]||wt;he(z[0],Hh)}}else X+=z[0];F=U.keywordPatternRe.lastIndex,z=U.keywordPatternRe.exec(me)}X+=me.substring(F),Ee.addText(X)}function Ie(){if(me==="")return;let F=null;if(typeof U.subLanguage=="string"){if(!t[U.subLanguage]){Ee.addText(me);return}F=m(U.subLanguage,me,!0,_i[U.subLanguage]),_i[U.subLanguage]=F._top}else F=f(me,U.subLanguage.length?U.subLanguage:null);U.relevance>0&&(Do+=F.relevance),Ee.__addSublanguage(F._emitter,F.language)}function ae(){U.subLanguage!=null?Ie():Q(),me=""}function he(F,z){F!==""&&(Ee.startScope(z),Ee.addText(F),Ee.endScope())}function Me(F,z){let X=1,ce=z.length-1;for(;X<=ce;){if(!F._emit[X]){X++;continue}let Pe=qe.classNameAliases[F[X]]||F[X],wt=z[X];Pe?he(wt,Pe):(me=wt,Q(),me=""),X++}}function De(F,z){return F.scope&&typeof F.scope=="string"&&Ee.openNode(qe.classNameAliases[F.scope]||F.scope),F.beginScope&&(F.beginScope._wrap?(he(me,qe.classNameAliases[F.beginScope._wrap]||F.beginScope._wrap),me=""):F.beginScope._multi&&(Me(F.beginScope,z),me="")),U=Object.create(F,{parent:{value:U}}),U}function Le(F,z,X){let ce=Kf(F.endRe,X);if(ce){if(F["on:end"]){let Pe=new Yn(F);F["on:end"](z,Pe),Pe.isMatchIgnored&&(ce=!1)}if(ce){for(;F.endsParent&&F.parent;)F=F.parent;return F}}if(F.endsWithParent)return Le(F.parent,z,X)}function Ge(F){return U.matcher.regexIndex===0?(me+=F[0],1):(rs=!0,0)}function Je(F){let z=F[0],X=F.rule,ce=new Yn(X),Pe=[X.__beforeBegin,X["on:begin"]];for(let wt of Pe)if(wt&&(wt(F,ce),ce.isMatchIgnored))return Ge(z);return X.skip?me+=z:(X.excludeBegin&&(me+=z),ae(),!X.returnBegin&&!X.excludeBegin&&(me=z)),De(X,F),X.returnBegin?0:z.length}function vt(F){let z=F[0],X=S.substring(F.index),ce=Le(U,F,X);if(!ce)return Yp;let Pe=U;U.endScope&&U.endScope._wrap?(ae(),he(z,U.endScope._wrap)):U.endScope&&U.endScope._multi?(ae(),Me(U.endScope,F)):Pe.skip?me+=z:(Pe.returnEnd||Pe.excludeEnd||(me+=z),ae(),Pe.excludeEnd&&(me=z));do U.scope&&Ee.closeNode(),!U.skip&&!U.subLanguage&&(Do+=U.relevance),U=U.parent;while(U!==ce.parent);return ce.starts&&De(ce.starts,F),Pe.returnEnd?0:z.length}function St(){let F=[];for(let z=U;z!==qe;z=z.parent)z.scope&&F.unshift(z.scope);F.forEach(z=>Ee.openNode(z))}let Jt={};function to(F,z){let X=z&&z[0];if(me+=F,X==null)return ae(),0;if(Jt.type==="begin"&&z.type==="end"&&Jt.index===z.index&&X===""){if(me+=S.slice(z.index,z.index+1),!n){let ce=new Error(`0 width match regex (${v})`);throw ce.languageName=v,ce.badRule=Jt.rule,ce}return 1}if(Jt=z,z.type==="begin")return Je(z);if(z.type==="illegal"&&!R){let ce=new Error('Illegal lexeme "'+X+'" for mode "'+(U.scope||"<unnamed>")+'"');throw ce.mode=U,ce}else if(z.type==="end"){let ce=vt(z);if(ce!==Yp)return ce}if(z.type==="illegal"&&X==="")return 1;if(ts>1e5&&ts>z.index*3)throw new Error("potential infinite loop, way more iterations than matches");return me+=X,X.length}let qe=W(v);if(!qe)throw cr(s.replace("{}",v)),new Error('Unknown language: "'+v+'"');let Fo=_g(qe),es="",U=A||Fo,_i={},Ee=new a.__emitter(a);St();let me="",Do=0,Yt=0,ts=0,rs=!1;try{if(qe.__emitTokens)qe.__emitTokens(S,Ee);else{for(U.matcher.considerAll();;){ts++,rs?rs=!1:U.matcher.considerAll(),U.matcher.lastIndex=Yt;let F=U.matcher.exec(S);if(!F)break;let z=S.substring(Yt,F.index),X=to(z,F);Yt=F.index+X}to(S.substring(Yt))}return Ee.finalize(),es=Ee.toHTML(),{language:v,value:es,relevance:Do,illegal:!1,_emitter:Ee,_top:U}}catch(F){if(F.message&&F.message.includes("Illegal"))return{language:v,value:gi(S),illegal:!0,relevance:0,_illegalBy:{message:F.message,index:Yt,context:S.slice(Yt-100,Yt+100),mode:F.mode,resultSoFar:es},_emitter:Ee};if(n)return{language:v,value:gi(S),illegal:!1,relevance:0,errorRaised:F,_emitter:Ee,_top:U};throw F}}function h(v){let S={value:gi(v),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return S._emitter.addText(v),S}function f(v,S){S=S||a.languages||Object.keys(t);let R=h(v),A=S.filter(W).filter(D).map(ae=>m(ae,v,!1));A.unshift(R);let B=A.sort((ae,he)=>{if(ae.relevance!==he.relevance)return he.relevance-ae.relevance;if(ae.language&&he.language){if(W(ae.language).supersetOf===he.language)return 1;if(W(he.language).supersetOf===ae.language)return-1}return 0}),[J,Q]=B,Ie=J;return Ie.secondBest=Q,Ie}function T(v,S,R){let A=S&&r[S]||R;v.classList.add("hljs"),v.classList.add(`language-${A}`)}function y(v){let S=null,R=p(v);if(l(R))return;if(j("before:highlightElement",{el:v,language:R}),v.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",v);return}if(v.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(v)),a.throwUnescapedHTML))throw new Si("One of your code blocks includes unescaped HTML.",v.innerHTML);S=v;let A=S.textContent,B=R?u(A,{language:R,ignoreIllegals:!0}):f(A);v.innerHTML=B.value,v.dataset.highlighted="yes",T(v,R,B.language),v.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(v.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),j("after:highlightElement",{el:v,result:B,text:A})}function w(v){a=Jp(a,v)}let x=()=>{M(),Kr("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){M(),Kr("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let P=!1;function M(){if(document.readyState==="loading"){P=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function _(){P&&M()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function k(v,S){let R=null;try{R=S(e)}catch(A){if(cr("Language definition for '{}' could not be registered.".replace("{}",v)),n)cr(A);else throw A;R=i}R.name||(R.name=v),t[v]=R,R.rawDefinition=S.bind(null,e),R.aliases&&Y(R.aliases,{languageName:v})}function V(v){delete t[v];for(let S of Object.keys(r))r[S]===v&&delete r[S]}function q(){return Object.keys(t)}function W(v){return v=(v||"").toLowerCase(),t[v]||t[r[v]]}function Y(v,{languageName:S}){typeof v=="string"&&(v=[v]),v.forEach(R=>{r[R.toLowerCase()]=S})}function D(v){let S=W(v);return S&&!S.disableAutodetect}function L(v){v["before:highlightBlock"]&&!v["before:highlightElement"]&&(v["before:highlightElement"]=S=>{v["before:highlightBlock"](Object.assign({block:S.el},S))}),v["after:highlightBlock"]&&!v["after:highlightElement"]&&(v["after:highlightElement"]=S=>{v["after:highlightBlock"](Object.assign({block:S.el},S))})}function G(v){L(v),o.push(v)}function ne(v){let S=o.indexOf(v);S!==-1&&o.splice(S,1)}function j(v,S){let R=v;o.forEach(function(A){A[R]&&A[R](S)})}function N(v){return Kr("10.7.0","highlightBlock will be removed entirely in v12.0"),Kr("10.7.0","Please use highlightElement now."),y(v)}Object.assign(e,{highlight:u,highlightAuto:f,highlightAll:M,highlightElement:y,highlightBlock:N,configure:w,initHighlighting:x,initHighlightingOnLoad:C,registerLanguage:k,unregisterLanguage:V,listLanguages:q,getLanguage:W,registerAliases:Y,autoDetection:D,inherit:Jp,addPlugin:G,removePlugin:ne}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=Ng,e.regex={concat:ur,lookahead:Zp,either:wi,optional:Yf,anyNumberOfTimes:Jf};for(let v in Jn)typeof Jn[v]=="object"&&Xp(Jn[v]);return Object.assign(e,Jn),e},Zr=ad({});Zr.newInstance=()=>ad({});ld.exports=Zr;Zr.HighlightJS=Zr;Zr.default=Zr});var Pi={};Oi(Pi,{animatedPatternN0Def:()=>Db,animatedPatternN1Def:()=>Vb,animationTitleDef:()=>ob,caterpillarN0Def:()=>Bb,caterpillarN1Def:()=>jb,caterpillarN2Def:()=>Ub,codeButtonComponentDef:()=>af,codeOverlayButtonDef:()=>Nf,codeOverlayDef:()=>Of,degubButtonComponentDef:()=>Mf,docScrollDef:()=>Ug,docsContainerComponentDef:()=>Ab,docsTitleComponentDef:()=>_b,docsTitleSmallComponentDef:()=>Ob,dynamicCounterDef:()=>b0,dynamicListButtonDef:()=>y0,dynamicListCardDef:()=>m0,dynamicListDef:()=>h0,dynamicListEmptyDef:()=>g0,dynamicListLabelDef:()=>x0,dynamicListRepeaterDef:()=>T0,dynamicListSlotDef:()=>f0,footerComponentDef:()=>nb,footerNavButtonDef:()=>cb,footerNavDef:()=>lb,headerComponentDef:()=>bb,headerNavComponentDef:()=>yb,headerToggleComponentDef:()=>vb,homePageComponentDef:()=>Xb,horizontalScrollerButtonDef:()=>o0,horizontalScrollerDef:()=>r0,horizontalScrollerSectionDef:()=>n0,htmlContentDef:()=>Bf,listContentDef:()=>qf,loaderDef:()=>Hg,navigationButtonDef:()=>Rb,navigationComponentDef:()=>Ib,navigationDef:()=>Eb,navigationLabelDef:()=>Pb,navigationSubmenuDef:()=>kb,onlyDesktopDef:()=>zg,pageTransitionComponentDef:()=>Df,paragraphContentDef:()=>zf,paramsMobJsButtonDef:()=>Qg,paramsMobJsDef:()=>Zg,quickNavDef:()=>rb,routeLoaderDef:()=>eb,scrollToButtonDef:()=>Yg,scrollToDef:()=>Jg,scrollerN0Def:()=>s0,scrollerN1Def:()=>l0,shapeLeftDef:()=>Fb,shapeRightDef:()=>Lb,snippetContentDef:()=>$g,spacerContentDef:()=>Bg,svgChild:()=>R0,titleContentDef:()=>jf});var ns="animationStop",Ni=()=>{window.addEventListener("unhandledrejection",e=>{e.reason===ns&&e.preventDefault()})};function Se(e){let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function ot(e){let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function ie(e){let t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}}function Ye(e){return e.getBoundingClientRect()}function ro(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function mr(e){let t=window.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function ss(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ve=()=>`_${Math.random().toString(36).slice(2,9)}`;var fr=e=>{setTimeout(()=>e())};var lt="ANY",is="UNTYPED",Mi="STRING",Li="NUMBER",Fi="OBJECT",Di="FUNCTION",Vo="ARRAY",Vi="BOOLEAN",$i="ELEMENT",Wi="HTMLELEMENT",Bi="NODELIST",$o="SET",Wo="MAP",ue={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},oo=e=>{switch(e){case String:case Mi:return"String";case Number:case Li:return"Number";case Object:case Fi:return"Object";case Function:case Di:return"Function";case Array:case Vo:return"Array";case Boolean:case Vi:return"Boolean";case Element:case $i:return"Element";case HTMLElement:case Wi:return"HTMLElement";case NodeList:case Bi:return"NodeList";case Set:case $o:return"Set";case Map:case Wo:return"Map";case lt:return lt;default:return is}},Te=(e,t)=>{switch(e){case String:case Mi:return ue.isString(t);case Number:case Li:return ue.isNumber(t);case Object:case Fi:return ue.isObject(t);case Function:case Di:return ue.isFunction(t);case Array:case Vo:return ue.isArray(t);case Boolean:case Vi:return ue.isBoolean(t);case Element:case $i:return ue.isElement(t);case HTMLElement:case Wi:return ue.isHTMLElement(t);case NodeList:case Bi:return ue.isNodeList(t);case Set:case $o:return ue.isSet(t);case Map:case Wo:return ue.isMap(t);case lt:return!0;default:return!0}};var Qh=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),em=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),tm=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},ji=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].sort()),Array.isArray(t)&&(s=[...t].sort())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let l of i){let p=n[l],u=s[l];if(typeof p=="object"&&typeof u=="object"){if(ji(p,u,r))continue;return!1}if(p!==u)return!1}return!0},as=(e,t,r)=>{switch(e){case lt:return ji(t,r);case Vo:case Array:return tm(t,r);case $o:case Set:return em(t,r);case Wo:case Map:return Qh(t,r);default:return t===r}};var ls=(e,t)=>{console.warn(`%c SimpleStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)},zi=(e,t,r)=>{console.warn(`%c one of this key ${e} defined in computed method of prop to monitor '${t}' prop not exist`,r)},Hi=(e,t)=>{console.warn(`%c SimpleStore, trying to execute set() method: store.${e} not exist`,t)},qi=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object`,r)},Ui=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Gi=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${oo(r)}`,o)},Ji=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Yi=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Xi=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Ki=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Zi=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${oo(o)}`,n)},Qi=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},cs=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},ea=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or one of the keys coincides with the prop to be changed.`,t)},ta=(e,t)=>{console.warn(`%c SimpleStore error: the property ${e} to watch doesn't exist in store`,t)},ra=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Bo=e=>{if(!ue.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>Bo(r)))+1},oa=(e,t=!0)=>Object.entries(e).reduce((r,o)=>{let[n,s]=o,i=ue.isFunction(s)?s():{};return ue.isObject(s)&&t?{...r,[n]:oa(s,!1)}:ue.isFunction(s)&&ue.isObject(i)&&"value"in i&&("validate"in i||"type"in i||"skipEqual"in i)?{...r,[n]:i.value}:{...r,[n]:s}},{}),na=(e,t,r,o=!0)=>Object.entries(e).reduce((n,s)=>{let[i,a]=s,l=ue.isFunction(a)?a():{};if(ue.isObject(a)&&o)return{...n,[i]:na(a,t,r,!1)};if(ue.isFunction(a)&&ue.isObject(l)&&"value"in l&&t in l){let p=ue.isString(l[t])?l[t].toUpperCase():l[t];return{...n,[i]:p}}return{...n,[i]:r}},{}),sa=({data:e,depth:t,logStyle:r})=>t>2?(ls(t,r),{}):oa(e),no=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(ls(r,o),{}):na(e,t,n),ia=({value:e})=>Te(Map,e)?new Map(e):Te(Set,e)?new Set(e):Te(Object,e)?{...e}:Te(Array,e)?[...e]:e;var gr=class{constructor(t={}){this.logStyle="padding: 10px;",this.callBackWatcher=new Map,this.callBackComputed=new Set,this.computedPropFired=new Set,this.computedWaitList=new Set,this.validationStatusObject={},this.dataDepth=Bo(t),this.computedRunning=!1,this.store=sa({data:t,depth:this.dataDepth,logStyle:this.logStyle}),this.type=no({data:t,prop:"type",depth:this.dataDepth,logStyle:this.logStyle,fallback:is}),this.fnValidate=no({data:t,prop:"validate",depth:this.dataDepth,logStyle:this.logStyle,fallback:()=>!0}),this.strict=no({data:t,prop:"strict",depth:this.dataDepth,logStyle:this.logStyle,fallback:!1}),this.skipEqual=no({data:t,prop:"skipEqual",depth:this.dataDepth,logStyle:this.logStyle,fallback:!0}),this.inizializeValidation()}inizializeValidation(){for(let t in this.store)ue.isObject(this.store[t])&&(this.validationStatusObject[t]={});Object.entries(this.store).forEach(t=>{let[r,o]=t;this.set(r,o,!1)})}runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:n}){for(let{prop:s,fn:i}of this.callBackWatcher.values())s===t&&i(r,o,n)}async runCallbackQueqeAsync({prop:t,newValue:r,oldValue:o,validationValue:n}){for(let{prop:s,fn:i}of this.callBackWatcher.values())s===t&&await i(r,o,n)}fireComputed(){this.computedWaitList.forEach(t=>{this.callBackComputed.forEach(r=>{let{prop:o,keys:n,fn:s}=r,i=Object.keys(this.store);if(!n.every(m=>i.includes(m))){zi(n,o,this.logStyle);return}if(!n.includes(t))return;let p=n.map(m=>this.store[m]);if(!this.computedPropFired.has(o)){let m=s(...p);this.set(o,m),this.computedPropFired.add(o)}})}),this.computedPropFired.clear(),this.computedWaitList.clear(),this.computedRunning=!1}addToComputedWaitLsit(t){this.callBackComputed.size!==0&&(this.computedWaitList.add(t),this.computedRunning||(this.computedRunning=!0,fr(()=>this.fireComputed())))}set(t,r,o=!0,n=!1){if(!(t in this.store)){Hi(t,this.logStyle);return}let s=n?ia({value:this.store[t]}):this.store[t],i=Te(Function,r)&&!Te(Function,s)&&this.type[t]!==Function?r(s):r,a=this.type[t]===lt;ue.isObject(s)&&!a?this.setObj(t,i,o):this.setProp(t,i,o)}setProp(t,r,o=!0){let n=this.type[t]===lt;if(ue.isObject(r)&&!n){qi(t,r,this.logStyle);return}if(ue.isObject(this.store[t])&&!n){Ui(t,this.logStyle);return}if(!Te(this.type[t],r)){Gi(t,r,this.type[t],this.logStyle);return}let i=this.store[t],a=this.fnValidate[t]?.(r,i);this.strict[t]&&!a||(this.validationStatusObject[t]=a,this.skipEqual[t]?as(this.type[t],i,r):!1)||(this.store[t]=r,o&&this.runCallbackQueqe({prop:t,newValue:r,oldValue:i,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}setObj(t,r,o=!0){if(!ue.isObject(r)){Ji(t,r,this.logStyle);return}if(!ue.isObject(this.store[t])){Yi(t,this.logStyle);return}let n=Object.keys(r),s=Object.keys(this.store[t]);if(!n.every(y=>s.includes(y))){Xi(n,t,this.logStyle);return}if(!Object.entries(r).map(y=>{let[w,x]=y,C=Te(this.type[t][w],x);return C||Zi(t,w,x,this.type[t][w],this.logStyle),C}).every(y=>y===!0))return;let l=Object.entries(r).map(y=>{let[w,x]=y,C=this.store[t][w];return this.strict[t][w]?{strictCheck:this.fnValidate[t][w]?.(x,C),item:y}:{strictCheck:!0,item:y}}).filter(({strictCheck:y})=>y===!0);if(l.length===0)return;let u=Object.fromEntries(l.map(({item:y})=>y).map(([y,w])=>[y,w]));Object.entries(u).forEach(y=>{let[w,x]=y,C=this.store[t][w],P=this.fnValidate[t][w]?.(x,C);P===void 0&&ra(this.logStyle,lt),this.validationStatusObject[t][w]=P});let m=this.store[t],h={...this.store[t],...u};Object.keys(u).every(y=>this.skipEqual[t][y]===!0)&&Object.entries(h).every(([y,w])=>{let x=this.type[t][y]===lt;if(Bo(w)>1&&!x){Ki(t,r,this.logStyle);return}return as(this.type[t][y],m[y],w)})||(this.store[t]=h,o&&this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:m,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}quickSetProp(t,r){let o=this.store[t];this.store[t]=r,this.runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:!0})}get(){return this.store}getProp(t){if(t in this.store)return this.store[t];Qi(t,this.logStyle)}getValidation(){return this.validationStatusObject}watch(t,r=()=>{}){if(!(t in this.store))return ta(t,this.logStyle),()=>{};let o=ve();return this.callBackWatcher.set(o,{fn:r,prop:t}),()=>this.callBackWatcher.delete(o)}emit(t){t in this.store?this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}):cs(t,this.logStyle)}async emitAsync(t){return t in this.store?(await this.runCallbackQueqeAsync({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}),{success:!0}):(cs(t,this.logStyle),{success:!1})}debugStore(){console.log(this.store)}debugValidate(){console.log(this.validationStatusObject)}setStyle(t){this.logStyle=t}computed(t,r,o){if([...this.callBackComputed,{prop:t,keys:r,fn:o}].flatMap(a=>a.prop).some(a=>r.includes(a))){ea(r,this.logStyle);return}this.callBackComputed.add({prop:t,keys:r,fn:o})}destroy(){this.callBackWatcher.clear(),this.callBackComputed.clear(),this.computedPropFired.clear(),this.computedWaitList.clear(),this.validationStatusObject={},this.store={},this.type={},this.fnValidate={},this.strict={},this.skipEqual={}}};var le=new gr({usePassive:!0,currentFrame:0,instantFps:60,requestFrame:()=>{},fpsScalePercent:()=>({value:{0:1,30:2,50:3},type:"Any"}),useScaleFps:!0,deferredNextTick:!0,throttle:60});var us=!1,so=new Map;function aa(){if(so.size===0){window.removeEventListener("DOMContentLoaded",aa),us=!1;return}for(let e of so.values())e();so.clear()}function rm(){us||(us=!0,window.addEventListener("DOMContentLoaded",aa,{passive:!1}))}var om=e=>{let t=ve();return so.set(t,e),typeof window<"u"&&rm(),()=>so.delete(t)},la=om;function jo(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function nm({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function sm({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function At(e){let t=!1,r=new Map,{usePassive:o}=le.get();le.watch("usePassive",()=>{window.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){window.removeEventListener(e,n),t=!1;return}let l=a.type,{pageX:p,pageY:u}=nm({type:l,e:a}),{clientX:m,clientY:h}=sm({type:l,e:a}),f=a.target,T={page:{x:p,y:u},client:{x:m,y:h},target:f,type:l,preventDefault:()=>o?()=>{}:a.preventDefault()};if(l==="wheel"){let{spinX:y,spinY:w,pixelX:x,pixelY:C}=jo(a);Object.assign(T,{spinX:y,spinY:w,pixelX:x,pixelY:C})}for(let y of r.values())y(T)}function s(){t||(t=!0,o=le.getProp("usePassive"),window.addEventListener(e,n,{passive:o}))}return a=>{let l=ve();return r.set(l,a),typeof window<"u"&&s(),()=>r.delete(l)}}var ca=At("click"),ua=At("mousedown"),pa=At("touchstart"),da=At("mousemove"),ha=At("touchmove"),ma=At("mouseup"),fa=At("touchend"),ga=At("wheel");var ps=0,Xt=0,Ve={},im=(e={},t=()=>{})=>{Ve[ps]={el:e,fn:t,data:{}};let r=ps;return ps++,{id:r,unsubscribe:()=>{if(Ve?.[r]){let o=Object.keys(Ve[r].data).length;Xt=Xt-o,delete Ve[r]}}}},am=({id:e,callBackObject:t,frame:r})=>{if(!Ve[e])return;let{currentFrame:o}=le.get(),{data:n}=Ve[e];n[r+o]||(n[r+o]=t,Xt++)},lm=e=>{e in Ve&&delete Ve[e]},cm=e=>{let t=Ve?.[e];if(!t)return;let r=Object.keys(t.data).length;Xt=Xt-r,t.data={}},um=e=>Ve?.[e]??{},pm=(e,t)=>{Object.values(Ve).forEach(({data:r,fn:o,el:n})=>{let s=r?.[e];s&&(t&&o(s,n),r[e]=null,delete r[e],Xt--)})},dm=({id:e,obj:t={}})=>{if(!Ve?.[e])return;let{el:r,fn:o}=Ve[e];o(t,r)},hm=()=>Xt,mm=e=>{Object.values(Ve).forEach(({data:t})=>{Object.keys(t).forEach(r=>{delete Object.assign(t,{[`${Number.parseInt(r)-e}`]:t[r]})[r]})})},br={add:im,get:um,update:am,remove:lm,clean:cm,fire:pm,fireObject:dm,getCacheCounter:hm,updateFrameId:mm};var ds=!1,zo=new Map;function ba(){if(zo.size===0){window.removeEventListener("visibilitychange",ba),ds=!1;return}let e={visibilityState:document.visibilityState};for(let t of zo.values())t(e)}function fm(){ds||(ds=!0,window.addEventListener("visibilitychange",ba,{passive:!1}))}var gm=e=>{let t=ve();return zo.set(t,e),typeof window<"u"&&fm(),()=>zo.delete(t)},Ho=gm;var io=[],bm=(e=()=>{},t=100)=>{io.push({cb:e,priority:t})},ym=({time:e,fps:t,shouldRender:r})=>{io.length!==0&&(io.sort((o,n)=>o.priority-n.priority),io.forEach(({cb:o})=>o({time:e,fps:t,shouldRender:r})),io.length=0)},ct={add:bm,fire:ym};var hs=[],vm=e=>{hs.push(e)},Sm=()=>{let e=[...hs];return hs.length=0,e},qo={add:vm,get:Sm};var Tt={},Uo=0,wm=e=>{Object.keys(Tt).forEach(t=>{delete Object.assign(Tt,{[`${Number.parseInt(t)-e}`]:Tt[t]})[t]})},Tm=({currentFrame:e,time:t,fps:r,shouldRender:o})=>{let n=Tt[e];n&&(n.forEach(s=>s({time:t,fps:r,shouldRender:o})),Tt[e]=null,delete Tt[e],Uo=Uo-1)},xm=(e,t)=>{let r=t+le.getProp("currentFrame");Tt[r]?Tt[r].push(e):(Tt[r]=[e],Uo++),le.emit("requestFrame")},Cm=()=>Uo,yr={add:xm,fire:Tm,updateKeys:wm,getAmountOfFrameToFire:Cm};var ya=!1,Go=(e=30)=>{if(ya){let{instantFps:t}=le.get();return new Promise(r=>{r({averageFPS:t})})}return new Promise(t=>{let r=[],n=0,s=0,i=0,a=0,l=0,p=u=>{u*=.001;let m=u-a;a=u;let h=Number.isFinite(1/m)?1/m:60,f=Math.max(h,60);i+=f-(r[n]||0),r[n++]=f,s=Math.max(s,n),n%=25;let T=Math.round(i/s);if(l++,l>=e){le.quickSetProp("instantFps",T),ya=!0,t({averageFPS:T});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};var ut=()=>typeof window>"u"?Date.now():window.performance.now(),va=16.666666666666668;Go();var ms=1e7,xa=2e3,vs=!1,_t=[],ke=ut(),Sa=0,fs=0,gs=0,Ss=0,bs=0,vr=!1,Ae=60,wr=Ae,Jo=0,Yo=0,xt=0,ys=-1,Sr=!0,Ca=le.getProp("fpsScalePercent"),Ia=le.getProp("useScaleFps"),Xo=!1,Ko=!1,Im=()=>Ae<wr/5*3,Em=()=>Ae<wr/5*4,km=()=>{!Im()||Xo||(Xo=!0,setTimeout(()=>{Xo=!1},4e3))},Rm=()=>{!Em()||Ko||(Ko=!0,setTimeout(()=>{Ko=!1},4e3))};Ho(({visibilityState:e})=>{vr=e==="visible"});Ni();le.watch("requestFrame",()=>{Zo()});var Pm=()=>{if(!Ia)return!0;let e=Object.entries(Ca).reduce((t,[r,o])=>{let n=Math.abs(wr-Ae);return Math.round(n*100/wr)>Number.parseInt(r)?o:t},1);return ys=(ys+1)%e,ys===0},wa=()=>{xt===ms&&(xt=0,le.quickSetProp("currentFrame",xt),yr.updateKeys(ms),br.updateFrameId(ms)),ct.fire({time:ke,fps:Ae,shouldRender:Sr}),_t=[..._t,...qo.get()],vs=!1,_t.length>0||yr.getAmountOfFrameToFire()>0||br.getCacheCounter()>0||ke<xa?Zo():(vr=!0,xt=0,Ss=ke,le.quickSetProp("currentFrame",xt))},Ta=e=>{ke=e,gs=ke-fs,vr&&(Sa+=gs),fs+=gs,ke=Math.round(fs-Sa);let t=Math.round(1e3/Ae);bs=Math.abs(ke-Ss-t);let r=bs>100?bs:0;ke=ke-r,Ss=ke,vr?(Yo=ke,Jo=0,Ae=le.getProp("instantFps")):Jo++,ke>Yo+1e3&&!vr&&(Ae=ke>xa?Math.round(Jo*1e3/(ke-Yo)):le.getProp("instantFps"),Yo=ke,Jo=0,Ae=Ae<30?le.getProp("instantFps"):Ae,Ca=le.getProp("fpsScalePercent"),Ia=le.getProp("useScaleFps")),Ae>wr&&(wr=Ae),Sr=Pm(),km(),Rm(),_t.forEach(n=>n({time:ke,fps:Ae,shouldRender:Sr})),yr.fire({currentFrame:xt,time:ke,fps:Ae,shouldRender:Sr}),br.fire(xt,Sr),xt++,le.quickSetProp("currentFrame",xt),_t.length=0,vr=!1,le.getProp("deferredNextTick")?fr(()=>wa()):wa()},Zo=()=>{vs||(typeof window>"u"?setTimeout(()=>Ta(ut()),va):requestAnimationFrame(Ta),vs=!0)},Xe={add:i=>{_t.push(i),Zo()},addMultiple:(i=[])=>{_t=[..._t,...i],Zo()},getFps:()=>Ae,mustMakeSomething:()=>Xo,shouldMakeSomething:()=>Ko,getShouldRender:()=>Sr};var Qo=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};var ws=!1,en=new Map,Ts=()=>{},Ea=window.innerHeight,ka=window.innerWidth;function Am(){if(en.size===0){window.removeEventListener("resize",Ts),ws=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Ea,o=t!==ka;Ea=e,ka=t;let n={scrollY:window.pageYOffset,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of en.values())s(n)}function _m(){ws||(ws=!0,Ts=Qo(()=>Am()),window.addEventListener("resize",Ts,{passive:!1}))}var Om=e=>{let t=ve();return en.set(t,e),typeof window<"u"&&_m(),()=>en.delete(t)},Ra=Om;var xs=!1,tn=new Map,Nm="UP",_a="DOWN",Pa=window.pageYOffset,ao=window.pageYOffset,Cs=_a,Aa={scrollY:ao,direction:Cs};function Oa(){if(tn.size===0){window.removeEventListener("scroll",Oa),xs=!1;return}Pa=ao,ao=window.scrollY,Cs=ao>Pa?_a:Nm,Aa={scrollY:ao,direction:Cs};for(let e of tn.values())e(Aa)}function Mm(){xs||(xs=!0,window.addEventListener("scroll",Oa,{passive:!0}))}var Lm=e=>{let t=ve();return tn.set(t,e),typeof window<"u"&&Mm(),()=>tn.delete(t)},Ct=Lm;var Is=!1,rn=new Map,Na=()=>{};function Fm(e){if(rn.size===0){Na(),Is=!1;return}Xe.add(()=>{ct.add(()=>{for(let t of rn.values())t(e)},0)})}function Dm(){Is||(Is=!0,Na=Ct(Fm))}var Vm=e=>{let t=ve();return rn.set(t,e),typeof window<"u"&&Dm(),()=>rn.delete(t)},Ma=Vm;var La=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){ut()-o>=t&&(e.apply(n,s),o=ut())},t-(ut()-o))):(e.apply(n,s),o=ut())}};var Es=!1,on=new Map,Fa,Da=()=>{};function $m(e){if(on.size===0){Da(),Es=!1;return}Xe.add(()=>{ct.add(()=>{for(let t of on.values())t(e)},0)})}function Wm(){Es||(Es=!0,Fa=La(e=>$m(e),le.getProp("throttle")),Da=Ct(Fa))}var Bm=e=>{let t=ve();return on.set(t,e),typeof window<"u"&&Wm(),()=>on.delete(t)},Va=Bm;var $a=()=>{},Wa=()=>{},Ba=()=>{};function ja(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){Wa(),e==="START"&&$a(),t=!1;return}Xe.add(()=>{ct.add(()=>{let a={scrollY:window.pageYOffset};if(e==="END")for(let l of r.values())l(a)},0)})}function s(){t||(t=!0,Ba=Qo(()=>n()),Wa=Ct(Ba),e==="START"&&($a=Ct(({scrollY:a})=>{let l={scrollY:a};if(!o){o=!0;for(let p of r.values())p(l)}})))}return a=>{let l=ve();return r.set(l,a),typeof window<"u"&&s(),()=>r.delete(l)}}var za=ja("START"),Ha=ja("END");var c={createStore(e={}){return new gr(e)},getInstantFps(){return le.getProp("instantFps")},getFps(){return Xe.getFps()},getShouldRender(){return Xe.getShouldRender()},mustMakeSomething(){return Xe.mustMakeSomething()},shouldMakeSomething(){return Xe.shouldMakeSomething()},useFrame(e=()=>{}){return Xe.add(e)},useNextTick(e=()=>{}){return ct.add(e)},useNextFrame(e=()=>{}){return qo.add(e)},useFrameIndex(e=()=>{},t=0){return yr.add(e,t)},async useFps(e=()=>{}){let t=await Go();return e(t),t},useLoad(e=()=>{}){return la(e)},useCache:br,useResize(e=()=>{}){return Ra(e)},useVisibilityChange(e=()=>{}){return Ho(e)},useMouseClick(e=()=>{}){return ca(e)},useMouseDown(e=()=>{}){return ua(e)},useTouchStart(e=()=>{}){return pa(e)},useMouseMove(e=()=>{}){return da(e)},useTouchMove(e=()=>{}){return ha(e)},useMouseUp(e=()=>{}){return ma(e)},useTouchEnd(e=()=>{}){return fa(e)},useMouseWheel(e=()=>{}){return ga(e)},useScroll(e=()=>{}){return Ma(e)},useScrollImmediate(e=()=>{}){return Ct(e)},useScrollThrottle(e=()=>{}){return Va(e)},useScrollStart(e=()=>{}){return za(e)},useScrollEnd(e=()=>{}){return Ha(e)},checkType(e,t){return Te(e,t)},getTypeName(e){return oo(e)},getUnivoqueId(){return ve()},getTime(){return ut()},useNextLoop(e){fr(e)},store:le,normalizeWheel:jo,ANIMATION_STOP_REJECT:ns};var H=new Map;var nn=({id:e="",value:t})=>{if(!e||e==="")return;let r=H.get(e);r&&H.set(e,{...r,currentRepeaterState:t,isRepeater:!0})},Tr=({id:e=""})=>!e||e===""?!1:H.get(e)?.currentRepeaterState;var qa=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=H.get(e);r&&H.set(e,{...r,element:t})},nt=({id:e=""})=>!e||e===""?void 0:H.get(e)?.element,sn=({element:e})=>[...H.values()].find(r=>r?.element===e)?.id??"",an=({key:e="",parentId:t="",container:r=document.createElement("div")})=>{if(!e||e==="")return;let n=[...H.values()].find(({key:s,parentId:i,element:a})=>s===e&&i===t&&r.contains(a))?.element;if(!n){console.warn("getElementByKey failed no element found");return}return n};var ln="data-mobjs",Ua="mobjs",Ot="staticprops",xr="bindprops",Ga="name",Ja="name",Ya="slot",cn="repeatid",Cr="repeaterchild",un="key",Ir="currentlistvalue",pn="bindevents",pt="weakbindevents",Nt="parentid",dn="ref";var Er={current:{},index:-1},dt="UNSET";var O=c.createStore({contentId:()=>({value:"",type:String}),rootElement:()=>({value:document.createElement("div"),type:HTMLElement}),index:()=>({value:"",type:String}),pageNotFound:()=>({value:"",type:String}),componentList:()=>({value:{},type:"any"}),routeList:()=>({value:{},type:"any"}),activeRoute:()=>({value:"",type:String,skipEqual:!1}),beforeRouteLeave:()=>({value:"",type:String,skipEqual:!1}),beforeRouteChange:()=>({value:"",type:String,skipEqual:!1}),atfterRouteChange:()=>({value:"",type:String,skipEqual:!1}),routeIsLoading:()=>({value:!1,type:Boolean}),repeaterParserRoot:()=>({value:document.createElement("div"),type:HTMLElement})});var Xa=({contentId:e=""})=>{O.set("contentId",e)},Ka=()=>{let{contentId:e}=O.get();return e},Za=()=>{let{rootElement:e}=O.get();return e},Qa=({element:e})=>{O.set("rootElement",e)};var kr=new Map,Mt=new WeakMap,ks=[],el=[],tl=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return kr.set(r,t),r},jm=e=>{let t=e?.parentNode;for(;t;){if(Mt.has(t))return{target:t,data:Mt.get(t)};t=t?.parentNode}return{target:null,data:null}},zm=e=>Mt.get(e)?{target:e,data:Mt.get(e)}:jm(e);function Hm(e,t){let r=t.target,{target:o,data:n}=zm(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i}=s,a=sn({element:o}),l=a?Tr({id:a}):Er;Object.defineProperty(t,"target",{value:o}),i(t,l)}var rl=e=>{[...e.parentNode?.querySelectorAll(`[${pt}]`)??[]].forEach(n=>{let s=n.getAttribute(pt)??"";n.removeAttribute(pt);let i=kr.get(s);kr.delete(s);let a=i?.flatMap(l=>Object.entries(l).map(p=>{let[u,m]=p;return ks.includes(u)||ks.push(u),{event:u,callback:m}}));Mt.set(n,a)});let o=Za();ks.forEach(n=>{el.includes(n)||(el.push(n),o.addEventListener(n,Hm.bind(null,n)))})};var Kt=new Map,hn=(e={})=>{let t=c.getUnivoqueId();return Kt.set(t,e),t},mn=(e="")=>{let t=Kt.get(e);return Kt.delete(e),t??{}},ol=({propsId:e})=>{e&&Kt.delete(e)},nl=()=>{Kt.clear()};var g=(e,...t)=>String.raw({raw:e},...t);var Rs={isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:5e3,debug:!1},Ps=e=>{Rs={...Rs,...e}},Lt=()=>Rs,I=({name:e="",component:t=()=>{},state:r={},exportState:o=[],isolateCreation:n=dt,isolateOnMount:s=dt,scoped:i=dt,constructorCallback:a=()=>{},connectedCallback:l=()=>{},disconnectedCallback:p=()=>{},adoptedCallback:u=()=>{},attributeToObserve:m=[],attributeChangedCallback:h=()=>{},style:f=""})=>({[e]:{componentFunction:t,componentParams:{exportState:o,isolateCreation:n,isolateOnMount:s,scoped:i,state:r,constructorCallback:a,connectedCallback:l,disconnectedCallback:p,adoptedCallback:u,attributeToObserve:m,attributeChangedCallback:h,styleSlot:f}}});var Rr=new Map,sl=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return Rr.set(r,t),r},il=({element:e,componentId:t,bindEventsId:r})=>{let o=Rr.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,a=>{let l=Tr({id:t});i(a,l)})}),Rr.delete(r))},al=()=>{Rr.clear()};function*$e(e){if(e){yield e;for(let t of e.children)yield*$e(t)}}function qm(e,t){let r=[];for(let o of $e(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var fn=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...qm(n,t)];return r};var ll=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},cl=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},ul=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})};var Pr=(e="")=>{if(!e||e==="")return;let r=H.get(e)?.parentId;if(r)return r},pl=({id:e=""})=>{if(!e||e==="")return;let t=H.get(e),r=t?.parentId,o=t?.component??"";if(r)for(let[n,s]of H){let{child:i}=s;if(!i)break;n===r&&H.set(n,{...s,child:{...i,...ll({currentChild:i,id:e,componentName:o})}})}},dl=({componentId:e})=>{let t=H.get(e);if(!t)return;let{element:r,parentId:o}=t;if(o&&o.length>0)return;let s=r?.parentNode?.closest(`[${ln}]`),i=s&&(!o||o==="")?{...t,parentId:s?.dataset[Ua]??""}:t;H.set(e,i)},hl=({element:e,id:t})=>{fn(e,!1).forEach(o=>{o.setParentId(t)})};var gn=({id:e="",unWatchArray:t=[]})=>{let r=H.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&H.set(e,{...r,parentPropsWatcher:[...o,...t]})},ml=({id:e=""})=>{if(!e||e==="")return;(H.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var bn=({componentName:e,currentProps:t={}})=>{let{componentList:r}=O.get(),o=r?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})},fl=({componentName:e,propName:t})=>{let{componentList:r}=O.get();return(r?.[e]?.componentParams?.exportState??[]).includes(t)};var yn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=H.get(e);if(!r)return;let{freezedPros:o}=r;o&&H.set(e,{...r,freezedPros:[...o,t]})},lo=({id:e="",prop:t})=>{if(!e||e==="")return;let r=H.get(e);if(!r)return;let{freezedPros:o}=r;o&&H.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},vn=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=H.get(e)?.freezedPros;return o?o.includes(t):!1};var As=(e="")=>!e||e===""?void 0:H.get(e)?.state?.get(),_e=(e="",t="",r,o=!0)=>{if((!e||e==="")&&(!t||t==="")&&!r||vn({id:e,prop:t}))return;let s=H.get(e),i=s?.state,a=s?.component??"";if(!fl({componentName:a,propName:t}))return console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`),null;if(!i)return console.warn(`setStateById failed no id found on prop: ${t}`),null;i.set(t,r,o)};var co=(e="",t="",r=()=>{})=>(!e||e==="")&&(!t||t==="")?void 0:H.get(e)?.state?.watch(t,r);var Ke=new Map,bl=e=>{if(!("bind"in e&&"props"in e)){console.warn("bindProps not valid");return}let r=c.getUnivoqueId();return Ke.set(r,{...e,componentId:"",propsId:r}),r},gl=({componentId:e,bind:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=As(o);if(!s)return;let i=Object.keys(s);t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`);let l=t.map(h=>({[h]:s[h]})).reduce((h,f)=>({...h,...f}),{});if(!H.has(e))return;let u=Tr({id:e}),m=r?.({...l,_current:u.current,_index:u.index});m&&Object.entries(m).forEach(([h,f])=>{_e(e,h,f,n)})},_s=({propsId:e,componentId:t})=>{if(e){for(let[r,o]of Ke)r===e&&Ke.set(r,{...o,componentId:t});Os({componentId:t,inizilizeWatcher:!1})}},yl=({componentId:e})=>{if(e)for(let[t,r]of Ke){let{componentId:o}=r;o===e&&Ke.delete(t)}},vl=({propsId:e})=>{e&&Ke.delete(e)},Os=({componentId:e,inizilizeWatcher:t})=>{let r=[...Ke.values()].filter(o=>o?.componentId===e);if(r&&(r.forEach(o=>{let{bind:n,props:s,parentId:i}=o,a=i??Pr(e);if(!t){gl({componentId:e,bind:n,props:s,currentParentId:a??"",fireCallback:!0});return}let l=!1,p=n.map(u=>co(a,u,()=>{l||(l=!0,c.useNextLoop(()=>{gl({componentId:e,bind:n,props:s,currentParentId:a??"",fireCallback:!0}),l=!1}))}));gn({id:e,unWatchArray:p})}),!!t))for(let[o,n]of Ke){let{componentId:s}=n;s===e&&Ke.delete(o)}},Sl=()=>{Ke.clear()};var Zt=new Map,wl=({repeatId:e,repeaterParentId:t,targetComponent:r})=>{Zt.has(e)||Zt.set(e,{repeatId:e,repeaterParentId:t,targetComponent:r})},Ns=({id:e})=>{let t=Zt.get(e);if(t)return t?.targetComponent},Tl=({id:e})=>{for(let[t,r]of Zt){let{repeaterParentId:o}=r;o===e&&Zt.delete(t)}};var Ze=({id:e=""})=>{if(!e||e==="")return;let t=[...H.values()],{component:r,element:o}=t.find(({id:l})=>l===e)||{};if(!o||!r)return;let s=H.get(e)?.child??{};Object.values(s).flat().forEach(l=>{Ze({id:l})});let a=t.find(({child:l})=>(l?.[r]??[]).includes(e))?.id;for(let[l,p]of H){let{child:u}=p;if(!u)break;if(l===a&&H.set(l,{...p,child:{...u,...cl({currentChild:u,id:e,componentName:r})}}),l===e){let{state:m,destroy:h,parentPropsWatcher:f}=p;h(),m.destroy(),f&&f.forEach(T=>T()),Tl({id:l}),yl({componentId:l})}}H.delete(e),o?.removeCustomComponent?.(),o?.remove()},xl=()=>{[...H.values()].filter(({isCancellable:t})=>t).forEach(({id:t})=>Ze({id:t}))},Ar=()=>{[...H.values()].filter(({element:t,isCancellable:r})=>r&&!document.body.contains(t)).forEach(({id:t})=>Ze({id:t})),nl(),al(),Sl()},Cl=({cb:e=()=>{},id:t=null})=>{if(!t)return;let r=H.get(t);r&&H.set(t,{...r,destroy:e})};var Ms=0,Il=()=>{Ms+=1},Ls=()=>(Ms-=1,Ms);function Um(e){let t=[];for(let r of $e(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var El=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Um(o)];return t};function Gm(e){let t=[];for(let r of $e(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var kl=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Gm(o)];return t};function Jm(e,t){for(let r of $e(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var Rl=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=Jm(o,t);if(n)return n}return null};function Ym(e){for(let t of $e(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var Pl=e=>{let t=e||document.body;for(let r of t.children){let o=Ym(r);if(o)return o}return null};var Xm=({componentParsed:e,content:t})=>{if(e.parentNode)return e.insertAdjacentHTML("afterend",t),e.nextElementSibling},Km=({element:e})=>{kl(e).forEach(r=>{let o=r.getDynamicProps();o!==""&&vl({propsId:o});let n=r.getStaticProps();n!==""&&ol({propsId:n}),r?.removeCustomComponent(),r?.remove()})},Zm=({element:e})=>{let t=El(e);if(t.length===0)return;[...t].map(o=>{let n=o?.getSlotPosition(),s=Rl(e,n);if(!s)return{slot:null,elementMoved:null};s.parentNode?.insertBefore(o,s);let i=s.previousSibling;return{slot:s,elementMoved:i}}).forEach(({slot:o,elementMoved:n})=>{if(!o)return;let s=o.getStaticProps();s&&n?.setPropsFromSlotId?.(s);let i=o.getDynamicProps();i&&n?.setDynamicPropsFromSlotId?.(i),o?.removeCustomComponent(),o?.remove()})},Al=({componentParsed:e,content:t})=>{let r=e.innerHTML,o=Xm({componentParsed:e,content:t});if(o){let n=e.getId(),s=e.getDelegateEventId(),i=Pl(o);i?(i.insertAdjacentHTML("afterend",r),i.remove()):o.insertAdjacentHTML("afterbegin",r),Zm({element:o}),Km({element:o}),s&&o.setAttribute(pt,s);let{debug:a}=Lt();a&&o.setAttribute(ln,n??"")}return e.remove(),o},_l=({componentParsed:e,content:t,isolateCreation:r})=>(r===dt?Lt().isolateCreation:r)?new Promise(n=>{c.useFrame(()=>{let s=Al({componentParsed:e,content:t});c.useNextTick(()=>{n({newElement:s})})})}):new Promise(n=>{let s=Al({componentParsed:e,content:t});n({newElement:s})});var Ol=()=>{customElements.define("mobjs-repeater",class extends HTMLElement{#e;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isRepeater=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(cn))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getRepeatId(){return this.#e}})};var Nl=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#e;#t;#r;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(Ja),this.#t=this.shadowRoot?.host.getAttribute(Ot),this.#r=this.shadowRoot?.host.getAttribute(xr))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#e}getStaticProps(){return this.#t}getDynamicProps(){return this.#r}})};var Ml=e=>{Object.entries(e).forEach(([t,r])=>{let{constructorCallback:o,connectedCallback:n,disconnectedCallback:s,adoptedCallback:i,attributeChangedCallback:a,styleSlot:l,attributeToObserve:p}=r.componentParams;customElements.define(t,class extends HTMLElement{#e;#t;#r;#i;#o;#a;#l;#c;#u;#p;#d;#h;#m;#f;#g;#v;#S;#w;#T;#x;#C;#I;#E;#b;#k;#n;#s;#R;static get observedAttributes(){return p}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=c.getUnivoqueId(),this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#d=()=>{},this.#h=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{},this.#e=t,this.#v=!0,this.#S="",this.#w="",this.#T="",this.#x="",this.#C="",this.#I="",this.#E="",this.#b="",this.#k="",this.#n="",this.#s="",this.isUserComponent=!0;let u=this.shadowRoot.host;if(this.#S=u.getAttribute(Ga),this.#w=u.getAttribute(Ot),this.#T=u.getAttribute(xr),this.#k=u.getAttribute(un),this.#x=u.getAttribute(pn),this.#E=u.getAttribute(Ir),this.#b=u.getAttribute(Ya),this.#n=u.getAttribute(Nt)??"",this.#s=u.getAttribute(Cr),this.#R=u.getAttribute(pt),this.#b&&!this.active&&(this.style.visibility="hidden"),this.#s&&this.#s!==""&&wl({repeatId:this.#s,repeaterParentId:this.#n,targetComponent:this.#e}),this.shadowRoot){let m=document.createElement("style");m.textContent=l,this.shadowRoot.append(m);let h=document.createElement("slot");this.shadowRoot.append(h),o({context:this})}}getComponentName(){return this.#e}setId(u){this.#t=u}getId(){return this.#t}getParentId(){return this.#n}setParentId(u){this.#n=u}getIsPlaceholder(){return this.#v}getInstanceName(){return this.#S}getStaticPropsId(){return this.#w}getDynamicPropsid(){return this.#T}getBindEventsId(){return this.#x}getCurrentKey(){return this.#k}setDynamicPropsFromSlotId(u){this.#C=u}getDynamicPropsFromSlotId(){return this.#C}setPropsFromSlotId(u){this.#I=u}getPropsFromSlotId(){return this.#I}getCurrentListValueId(){return this.#E}getSlotPosition(){return this.#b}getDelegateEventId(){return this.#R}#y(){return{componentId:this.#t,emit:this.#r,emitAsync:this.#i,freezeProp:this.#o,getChildren:this.#a,getParentId:this.#l,getState:this.#c,remove:this.#u,setState:this.#p,unBind:this.#d,unFreezeProp:this.#h,watch:this.#m,watchSync:this.#f,watchParent:this.#g}}resetData(){this.active=!1,this.#t="",this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#d=()=>{},this.#h=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{}}inizializeCustomComponent(u){this.active||(this.active=!0,this.#t=u.id,this.#r=u.emit,this.#i=u.emitAsync,this.#o=u.freezeProp,this.#a=u.getChildren,this.#l=u.getParentId,this.#c=u.getState,this.#u=u.remove,this.#p=u.setState,this.#d=u.unBind,this.#h=u.unFreezeProp,this.#m=u.watch,this.#f=u.watchSync,this.#g=u.watchParent,n({context:this,data:this.#y()}),this.#v=!1)}disconnectedCallback(){!this.shadowRoot||!this.active||(s({context:this,data:this.#y()}),this.resetData())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||i({context:this,data:this.#y()})}attributeChangedCallback(u,m,h){!this.shadowRoot||!this.active||a({name:u,oldValue:m,newValue:h,context:this,data:this.#y()})}})})};var Ll=(e={})=>{let t=Object.values(e).reduce((r,o)=>({...r,...o}),{});O.set("componentList",t),Ml(t),Ol(),Nl()},Fs=()=>{let{componentList:e}=O.get();return e};var Fl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=[...fn(e)],o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var Dl=e=>[...e.querySelectorAll(`[${dn}]`)].reduce((r,o)=>{let n=o.getAttribute(dn);o.removeAttribute(dn);let s=n in r?[...r[n],o]:[o];return{...r,[n]:s}},{}),Vl=e=>Object.entries(e).map(([t,r])=>r.length===1?{[t]:r[0]}:{[t]:r}).reduce((t,r)=>({...t,...r}),{});var uo=new Map,Wl=({id:e,cb:t=()=>{}})=>{uo.set(e,t)},$l=async({id:e,element:t,refsCollection:r})=>{let n=await uo.get(e)?.({element:t,refs:Vl(r)});Cl({cb:n,id:e}),uo.delete(e)};var Ds=({isolateOnMount:e,id:t,element:r,refsCollection:o})=>(e===dt?Lt().isolateOnMount:e)?(async()=>(await $l({id:t,element:r,refsCollection:o}),new Promise(s=>{c.useNextLoop(()=>{c.useFrame(()=>{c.useNextTick(()=>{s({success:!0})})})})})))():$l({id:t,element:r,refsCollection:o});function Qm(e,t){for(let r of $e(e))if(r?.isRepeater&&r?.getRepeatId?.()===t)return r;return null}var Bl=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=Qm(o,t);if(n)return n}return null};var _r=new Set,jl=({id:e,state:t,container:r})=>{_r.add({id:e,state:t,container:r})},zl=({id:e,state:t,container:r})=>{_r.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&_r.delete(o)})},Hl=({id:e="",state:t="",container:r})=>[..._r].some(n=>e===n.id&&t===n.state&&r===n.container);var Sn=({id:e="",component:t=""})=>{if(!e||e==="")return[];let o=H.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])},wn=({id:e,component:t,filterBy:r=[]})=>{if(!nt({id:e}))return;let s=Sn({id:e,component:t}).map(l=>({id:l,element:nt({id:l})})).filter(({element:l})=>r.length>0?r.includes(l):!0).sort(function(l,p){let{element:u}=l,{element:m}=p;return u===m||!u||!m?0:u.compareDocumentPosition(m)&2?1:-1}).map(({id:l})=>l),i=H.get(e);if(!i)return;let{child:a}=i;H.set(e,{...i,child:{...a,[t]:s}})};var Ul=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Gl=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,key:o?.[r],index:n}:{isNewElement:!1,key:o?.[r],index:n}}),ql=({arr:e=[],key:t=""})=>e.every(r=>r?.[t]),Jl=({current:e,previous:t,key:r})=>ql({arr:e,key:r})&&ql({arr:t,key:r}),Yl=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),Ft=({component:e,getChildren:t,element:r})=>{let o=t(e);return!o||!r?[]:[...o].filter(n=>{let s=nt({id:n})??null;return r.contains(s)})};var po=new Map,Tn=e=>{let t=c.getUnivoqueId();return po.set(t,e),t},Xl=(e="")=>{let t=po.get(e);return po.delete(e),t??Er};var ef="beforebegin",tf="afterend";function rf({key:e,currentUnique:t,index:r,render:o,id:n,repeatId:s}){let i=t?.[r],a=` ${un}="${e}"
    ${Ir}="${Tn({current:i,index:r})}"
    ${Cr}="${s}" ${Nt}="${n}"`;return o({sync:a,html:(l,...p)=>g(l,...p)})}var Kl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:n=()=>{},key:s="",id:i="",render:a,repeatId:l})=>{let p=Yl({data:e,key:s}),m=Ul(t,p,s).map(x=>{let C=x?.[s];return an({key:C,parentId:i,container:r})}),h=Gl(p,t,s),f=h.filter(({isNewElement:x})=>!x).map(x=>an({key:x.key,parentId:i,container:r})),T=f[0]?.parentNode??r;T&&(T.innerHTML=""),f.forEach(x=>{T&&x&&T.append(x)}),wn({id:i,component:o,filterBy:f});let y=Ft({component:o,getChildren:n,element:r}),w=h.reduce((x,C)=>C.isNewElement?(x.at(-1).push(C),x):[...x,[C]],[[]]);return w?.[0].length||w.shift(),w.forEach(x=>{let C=x[0],{isNewElement:P}=C,M=P?nt({id:y[0]}):an({key:x[0]?.key,parentId:i,container:r}),_=x.filter(V=>V.isNewElement).map(V=>rf({targetComponent:o,key:V.key,currentUnique:p,index:V.index,render:a,id:i,repeatId:l})).join(""),k=P?ef:tf;M?M.insertAdjacentHTML(k,_):r.insertAdjacentHTML("afterbegin",_)}),m.forEach(x=>{let C=sn({element:x});C&&Ze({id:C})}),p};var Zl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:n=()=>{},render:s,id:i,repeatId:a})=>{let l=e.length,p=t.length,u=l-p;if(u>0&&[...new Array(u).keys()].map((h,f)=>{let T=e?.[f+p],y=f+p,w=`${Ir}="${Tn({current:T,index:y})}"
            ${Cr}="${a}" ${Nt}="${i}"`;return s({sync:w,html:(x,...C)=>g(x,...C)})}).forEach(h=>{r.insertAdjacentHTML("beforeend",h)}),u<0){let m=Ft({component:o,getChildren:n,element:r}),h=m.filter((T,y)=>y>=e.length),f=m.filter((T,y)=>y<e.length);r.textContent="",h.forEach(T=>{Ze({id:T})}),f.forEach(T=>{let y=nt({id:T});y&&r.append(y)})}return e};var Ql=async({containerList:e=document.createElement("div"),targetComponent:t="",current:r=[],previous:o=[],getChildren:n=()=>{},key:s="",id:i,render:a,repeatId:l})=>{let m=(Jl({current:r,previous:o,key:s})?Kl:Zl)({current:r,previous:o,containerList:e,targetComponent:t,getChildren:n,key:s,id:i,render:a,repeatId:l});return O.set("repeaterParserRoot",e,!1),await O.emitAsync("repeaterParserRoot"),wn({id:i,component:t}),m};var ec=({state:e="",setState:t=()=>{},emit:r=()=>{},watch:o=()=>{},props:n={},bindEvents:s=[],clean:i=!1,dynamicProps:a,beforeUpdate:l=()=>{},afterUpdate:p=()=>{},getChildren:u=()=>{},key:m="",id:h="",containerList:f,repeatId:T="",render:y})=>{let w=Bl(f,T);w?.remove(),w?.removeCustomComponent();let x=nt({id:h}),C=!0;return o(e,async(P,M)=>{if(!c.checkType(Array,P))return;if(yn({id:h,prop:e}),Hl({id:h,state:e,container:f})){lo({id:h,prop:e}),t(e,M,!1);return}let k=Ns({id:T});k&&(i||C)&&(Ft({component:k,getChildren:u,element:f}).forEach(D=>{Ze({id:D})}),f.textContent=""),jl({id:h,state:e,container:f}),l({element:x,container:f,childrenId:Ft({component:k,getChildren:u,element:f})});let V=await Ql({state:e,containerList:f,targetComponent:k,current:P,previous:i||C?[]:M,getChildren:u,key:m,props:n,dynamicProps:a,bindEvents:s,id:h,render:y,repeatId:T});C=!1;let q=Ns({id:T}),W=Ft({component:q,getChildren:u,element:f});[...W].forEach((Y,D)=>{let L=V?.[D];L&&nn({id:Y,value:{current:L,index:D}})}),c.useNextLoop(async()=>{p({element:x,container:f,childrenId:W}),zl({id:h,state:e,container:f}),lo({id:h,prop:e}),t(e,V,!1)})}),()=>r(e)};var Or=new Map,tc=({repeatId:e,obj:t})=>{Or.set(e,t)};var rc=({repeatId:e,placeholderListObj:t})=>{if(!e||!t||t.length===0)return;let r=Or.get(e);if(!r)return;let o=t.find(({id:s})=>s===e),n=ec({...r,repeatId:e,containerList:o?.parent??document.createElement("div")});return Or.delete(e),n};var oc=({componentParsed:e,instanceName:t="",props:r={},state:o={},key:n="",currentRepeaterState:s=Er,isRepeater:i=!1,parentPropsWatcher:a=[],destroy:l=()=>{},freezedPros:p=[],isCancellable:u=!0,child:m={},parentId:h="",id:f="",componentName:T=""})=>{let y=c.createStore(o);return ul({props:r,store:y}),H.set(f,{element:e,component:T,instanceName:t,destroy:l,parentPropsWatcher:a,key:n,currentRepeaterState:s,isRepeater:i,isCancellable:u,id:f,parentId:h,freezedPros:p,child:m,state:y}),{getState:()=>y.get(),setState:(w="",x={},C=!0)=>{vn({id:f,prop:w})||y.set(w,x,C)},emit:(w="")=>y.emit(w),emitAsync:async(w="")=>await y.emitAsync(w),computed:(w="",x=[],C=()=>{})=>y.computed(w,x,C),watch:(w="",x=()=>{})=>y.watch(w,x)}};var nc=({component:e})=>{let t=e.getId(),r=e.getInstanceName(),o=e.getParentId(),n=e.getStaticPropsId(),s=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getDynamicPropsFromSlotId(),l=e.getPropsFromSlotId(),p=e.getCurrentListValueId(),u=Xl(p),m=e.getCurrentKey()??"",h=e.getComponentName(),f=n?.split(" ").join(""),T=l?.split(" ").join(""),y=mn(f),w=mn(T),x={...e.dataset};return{component:e,props:{...bn({componentName:h,currentProps:x}),...bn({componentName:h,currentProps:y}),...bn({componentName:h,currentProps:w})},id:t,componentName:h,instanceName:r,key:m,dynamicPropsId:s,dynamicPropsIdFromSlot:a,bindEventsId:i,currentListValueReal:u,parentId:o}};var sc=({component:e,state:t={},isCancellable:r=!0})=>{let{component:o,props:n,id:s,componentName:i,instanceName:a,key:l,dynamicPropsId:p,dynamicPropsIdFromSlot:u,currentListValueReal:m,bindEventsId:h,parentId:f}=nc({component:e}),{getState:T,setState:y,emit:w,emitAsync:x,computed:C,watch:P}=oc({component:e,componentParsed:o,props:n,state:t,destroy:()=>{},id:s,componentName:i,instanceName:a,key:l,isCancellable:r,parentId:f});dl({componentId:s}),pl({id:s});let M=[],_=k=>Sn({id:s,component:k});return m?.index!==-1&&nn({id:s,value:m}),_s({propsId:p,componentId:s}),_s({propsId:u,componentId:s}),{bindEventsId:h,key:l,id:s,componentParsed:o,getState:T,setState:y,emit:w,emitAsync:x,computed:C,watch:P,repeatId:M,getChildren:_,watchSync:(k,V)=>{let q=P(k,V);return w(k),q},freezeProp:k=>yn({id:s,prop:k}),unFreezeProp:k=>lo({id:s,prop:k}),unBind:()=>ml({id:s}),bindProps:k=>`${xr}="${bl({...k,parentId:k?.forceParent?void 0:s})}" `,staticProps:k=>` ${Ot}="${hn(k)}" `,syncParent:` ${Nt}="${s}" `,remove:()=>{Ze({id:s}),Ar()},removeDOM:k=>{k.remove(),Ar()},getParentId:()=>Pr(s),watchParent:(k,V)=>{let q=co(Pr(s),k,V);gn({id:s,unWatchArray:[q]})},html:(k,...V)=>({id:s,content:g(k,...V),componentParsed:o}),onMount:k=>Wl({id:s,cb:k}),bindEvents:k=>`${pn}="${sl(k)}"`,delegateEvents:k=>`${pt}="${tl(k)}"`,repeat:({watch:k,clean:V=!1,beforeUpdate:q=()=>{},afterUpdate:W=()=>{},key:Y,render:D})=>{let L=c.getUnivoqueId();return M.push(L),tc({repeatId:L,obj:{state:k,setState:y,emit:w,watch:P,clean:V,beforeUpdate:q,afterUpdate:W,getChildren:_,key:Y,id:s,render:D}}),`<mobjs-repeater ${cn}="${L}" style="display:none;"/>`}}};function of(e){let t=[];for(let r of $e(e))r?.isRepeater&&r?.getRepeatId?.()&&t.push(r);return t}var ic=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...of(o)];return t};var xn=async({element:e,functionToFireAtTheEnd:t=[],isCancellable:r=!0,currentIterationCounter:o=0,currentSelectors:n=[]})=>{if(!e)return;let s=Fs(),{componentToParse:i,parseSourceArray:a}=Fl({element:e,currentSelectors:n}),l=o===Lt().maxParseIteration;if(l&&console.warn(`dom parse reached max parse limit: ${o}`),!i||l){let D=Ls();for(let L of t.reverse()){let{onMount:G,fireDynamic:ne,fireFirstRepeat:j}=L;await G(),ne(),j()}t.length=0,n.length=0,rl(e);return}let p=i?.getComponentName(),u=s?.[p]?.componentFunction,m=s?.[p]?.componentParams,{isolateOnMount:h,isolateCreation:f,scoped:T}=m;if(!u){console.warn(`${p} component is not registered.`),i.remove(),await xn({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a});return}let y=sc({component:i,...m,isCancellable:r}),{content:w,componentParsed:x,id:C}=await u(y),{newElement:P}=await _l({content:w,componentParsed:x,isolateCreation:f}),M=P?Dl(P):{};if(hl({element:P,id:C}),!P){let D=Ls();return}qa({id:C,newElement:P});let k=[...ic(P)].map(D=>({parent:D.parentNode,id:D.getRepeatId()})),q=(y?.repeatId).map(D=>rc({repeatId:D,placeholderListObj:k})),W=y?.bindEventsId;W&&il({element:P,componentId:C,bindEventsId:W});let Y=T===dt?Lt().scoped:T;Y&&await Ds({isolateOnMount:h,id:C,element:P,refsCollection:M}),P?.inizializeCustomComponent?.(y),t.push({onMount:async()=>{Y||await Ds({isolateOnMount:h,id:C,element:P,refsCollection:M})},fireDynamic:()=>{Os({componentId:C,inizilizeWatcher:!0})},fireFirstRepeat:q.length>0?()=>{q.forEach(D=>{D?.()})}:()=>{}}),await xn({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a})};var Nr=async({element:e,isCancellable:t=!0})=>{Il(),await xn({element:e,isCancellable:t,currentIterationCounter:0})},ac=()=>{O.watch("repeaterParserRoot",async e=>{await Nr({element:e})})},ho=async e=>{await Nr({element:e})};var lc=e=>{let t=Object.entries(e).reduce((r,o)=>{let[n,s]=o;return{...r,[n]:s}},{});O.set("routeList",t)},Cn=()=>{let{routeList:e}=O.get();return e},cc=({routeName:e=""})=>{O.set("index",e)};var uc=({routeName:e=""})=>{O.set("pageNotFound",e)};var pc=async({route:e=""})=>{O.set("routeIsLoading",!0);let t=Ka(),r=document?.querySelector(t),{activeRoute:o}=O.get();O.set("beforeRouteLeave",o),O.set("beforeRouteChange",e);let n=!1,s=O.watch("beforeRouteChange",()=>{n=!0});Ar(),O.set("activeRoute",e);let i=await Cn()?.[e]?.();r.innerHTML="",scrollTo(0,0),xl(),r.insertAdjacentHTML("afterbegin",i),await Nr({element:r}),n||O.set("atfterRouteChange",e),document.body.dataset.route=e,s?.(),O.set("routeIsLoading",!1)};var dc=({url:e=""})=>{let{index:t,pageNotFound:r}=O.get();return e===""?t:e in Cn()?e:r};var Vs="",hc=()=>{let e=window.location.hash.slice(1),{routeIsLoading:t}=O.get();t||pc({route:dc({url:e})})},mc=()=>{hc(),window.addEventListener("hashchange",()=>{hc()})},$s=({url:e=""})=>{window.location.hash=e,(e===Vs||Vs==="")&&window.dispatchEvent(new HashChangeEvent("hashchange")),Vs=e};var fc=()=>{O.watch("beforeRouteLeave",e=>{console.log("----------------"),console.log("before route leave",e)}),O.watch("beforeRouteChange",(e,t)=>{console.log("before route change:"),console.log("previous:",t),console.log("current:",e)}),O.watch("activeRoute",e=>{console.log("active route:",e)}),O.watch("atfterRouteChange",e=>{console.log("after route change",e),console.log("----------------")})};var Ws=async({rootId:e,wrapper:t,contentId:r,components:o={},pages:n={},afterInit:s=()=>{},index:i="home",pageNotFound:a="pageNotFound"})=>{let l=document.querySelector(e),p=t();!r||!l||(Xa({contentId:r}),Qa({element:l}),ac(),Ll(o),lc(n),cc({routeName:i}),uc({routeName:a}),l.insertAdjacentHTML("afterbegin",p),await Nr({element:l,isCancellable:!1}),c.useFrameIndex(()=>{c.useNextTick(()=>{s()})},5),fc(),mc())};var Ue=(e="")=>{if(!e)return;let r=[...H.values()].find(({instanceName:o})=>o===e)?.id;if(!r){console.warn("getIdByName failed no name");return}return r};var b=(e={})=>`${Ot}="${hn(e)}"`;var gc=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <g>
  <path d="m221.2 367.92-102.48-85.684 102.48-85.117c7.2812-6.1602 8.3984-16.801 2.2383-24.078-3.3594-3.9219-8.3984-6.1602-13.441-6.1602-3.9219 0-7.8398 1.1211-11.199 3.9219l-117.6 98.555c-3.9219 3.3594-6.1602 7.8398-6.1602 13.441 0 5.6016 2.2383 10.078 6.1602 13.441l118.16 98.559c3.3594 2.8008 6.7188 3.9219 11.199 3.9219 5.0391 0 10.078-2.2383 13.441-6.1602 5.6016-7.8438 4.4805-18.484-2.8008-24.641z"/>
  <path d="m623.28 288.96c0-5.0391-2.2383-10.078-6.1602-13.441l-118.72-98.559c-3.3594-2.8008-7.2812-3.9219-11.199-3.9219-5.0391 0-10.078 2.2383-13.441 6.1602-6.1602 7.2812-5.0391 17.922 2.2383 24.078l102.48 85.68-101.92 85.684c-7.2812 6.1602-8.3984 16.801-2.2383 24.078 3.3594 3.9219 7.8398 6.1602 13.441 6.1602 3.9219 0 7.8398-1.6797 11.199-3.9219l118.16-98.559c3.918-3.3594 6.1602-8.3984 6.1602-13.438z"/>
  <path d="m408.8 72.801c-1.6797-0.55859-3.3594-0.55859-5.0391-0.55859-7.2812 0-14 4.4805-16.238 12.32l-124.88 399.84c-2.8008 8.9609 2.2383 18.48 11.199 21.281 1.6797 0.55859 3.3594 0.55859 5.0391 0.55859 7.8398 0 14-5.0391 16.238-12.32l124.32-400.4c3.3633-8.3984-1.6758-17.918-10.637-20.719z"/>
 </g>
</svg>
`;var bc=({getState:e,onMount:t,html:r})=>{let{style:o,drawers:n,color:s}=e();return t(({element:i})=>(i.addEventListener("click",()=>{let a=Ue("codeOverlay");_e(a,"urls",n),_e(a,"activeContent","description")}),()=>{i.remove()})),r`
        <button class="c-code-btn c-code-btn--${o} c-code-btn--${s}">
            <span class="c-code-btn__icon">${gc}</span>
        </button>
    `};var af=I({name:"code-button",component:bc,exportState:["drawers","style","color"],state:{drawers:()=>({value:[],type:Array}),style:()=>({value:"",type:"String"}),color:()=>({value:"black",type:String})}});var pe=e=>{if(c.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+new Array(t).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=new Array(t+1).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},Oe=(e,t,r)=>Math.min(Math.max(e,t),r),yc=(e,t,r)=>(1-r)*e+r*t,Dt=(e,t)=>{let r=Object.keys(e).sort(),o=Object.keys(t).sort();return r.length===o.length&&r.every((n,s)=>n===o[s])},mo=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},vc=(e,t)=>e.map(r=>r[t]);var In=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),It=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Mr=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Lr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},En=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var Sc=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Fe=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,l)=>i.length<=l?a:Fe(a,i[l],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=Fe(Object.assign({},s),i,r):e[n]=i}),e)};var fo="row",go="col",kn="radial",ht="start",Fr="end",Dr="center",Vr="edges",$r="random",wc="MERGE_FROM_UP",Bs="MERGE_FROM_DOWN",Qt="equal",er="start",tr="end",rr="center",Wr={type:Qt,each:0,waitComplete:!1,from:ht,grid:{col:1,row:1,direction:go}},xe={index:0,frame:0};var bo={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ee={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},So="min",Tc="max",zs="desktop",wo="easeLinear",yo="default",Hs={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1400},qs=10,vo=.06,Us="#ff0000",Gs="#14df3b",Js=8,Ys=10,Xs=1e3,Ks=!1,lf=!1,cf=!1,uf=.01,pf=.06,xc=e=>{let t=be({prop:"fpsScalePercent",value:e?.fpsScalePercent,defaultValue:c.store.getProp("fpsScalePercent"),type:Object}),r=be({prop:"useScaleFps",value:e?.useScaleFps,defaultValue:c.store.getProp("useScaleFps"),type:Boolean}),o=be({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:c.store.getProp("deferredNextTick"),type:Boolean}),n=be({prop:"usePassive",value:e?.usePassive,defaultValue:c.store.getProp("usePassive"),type:Boolean}),s=be({prop:"throttle",value:e?.throttle,defaultValue:c.store.getProp("throttle"),type:Number}),i=df(e?.mq),a=be({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:zs,type:String}),l=be({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:So,type:String}),p=be({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:qs,type:Number}),u=js(e?.sequencer?.ease,"sequencer"),m=be({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:yo,type:String}),h=be({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:vo,type:Number}),f=be({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Us,type:String}),T=be({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:Gs,type:String}),y=be({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Js,type:Number}),w=be({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:yo,type:String}),x=be({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:vo,type:Number}),C=be({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:Ys,type:Number}),P=js(e?.parallaxTween?.ease,"parallaxTween"),M=be({prop:"tween.duration",value:e?.tween?.duration,defaultValue:Xs,type:Number}),_=js(e?.tween?.ease,"tween"),k=be({prop:"tween.relative",value:e?.tween?.relative,defaultValue:Ks,type:Boolean}),V=be({prop:"spring.relative",value:e?.spring?.relative,defaultValue:lf,type:Boolean}),q=be({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:cf,type:Boolean}),W=be({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:uf,type:Number}),Y=be({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:pf,type:Number});return{fpsScalePercent:t,useScaleFps:r,deferredNextTick:o,throttle:s,usePassive:n,mq:i,defaultMq:{value:a,type:l},sequencer:{duration:p,ease:u},scrollTrigger:{springConfig:m,lerpConfig:h,markerColor:{startEnd:f,item:T}},parallax:{defaultRange:y,springConfig:w,lerpConfig:x},parallaxTween:{duration:C,ease:P},tween:{duration:M,ease:_,relative:k},spring:{relative:V,config:e?.spring?.config?{...bo,...e.spring.config}:bo},lerp:{relative:q,precision:W,velocity:Y}}},be=({prop:e,value:t,defaultValue:r,type:o})=>{let n=c.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${c.getTypeName(o)}`),n?t:r},df=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Hs},js=(e,t)=>{let r=Object.keys(ee).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:wo};function Cc(){return{fpsScalePercent:c.store.getProp("fpsScalePercent"),useScaleFps:c.store.getProp("useScaleFps"),deferredNextTick:c.store.getProp("deferredNextTick"),throttle:c.store.getProp("throttle"),usePassive:c.store.getProp("usePassive"),mq:Hs,defaultMq:{value:zs,type:So},sequencer:{duration:qs,ease:wo},scrollTrigger:{springConfig:yo,lerpConfig:vo,markerColor:{startEnd:Us,item:Gs}},parallax:{defaultRange:Js,springConfig:yo,lerpConfig:vo},parallaxTween:{duration:Ys,ease:wo},tween:{duration:Xs,ease:wo,relative:Ks},spring:{relative:!1,config:bo},lerp:{relative:!1,precision:.01,velocity:.06}}}var K=(()=>{let e=Cc();return{set:n=>{e=xc(Fe(Cc(),n)),"usePassive"in n&&c.store.set("usePassive",e.usePassive),"fpsScalePercent"in n&&c.store.set("fpsScalePercent",e.fpsScalePercent),"useScaleFps"in n&&c.store.set("useScaleFps",e.useScaleFps),"deferredNextTick"in n&&c.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&c.store.set("throttle",e.throttle)},get:n=>{if(n in e)return e[n];console.warn(`handleSetUp: ${n} is not a setup propierties`)},print:()=>{console.log("Writable props:"),console.log(e)}}})();var d={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Et=e=>e.map(t=>`${t} | `).join(""),Vt=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Qe=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},kt=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},Ic=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},Ec=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},kc=()=>{console.warn("relative prop is not allowed inside a timeline")},Rc=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},Pc=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Timeline will stopped.")},Ac=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},_c=e=>{console.warn(`timeline setTween: ${e} is not a string`)},Oc=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},Nc=()=>{console.warn("setTween fail")},Mc=e=>{console.warn(`label ${e} not founded`)},Lc=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Fc=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},Zs=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Dc=()=>{console.warn("Spring configProp: all prop must be a positive Number")},Vc=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},or=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Rn=()=>{console.warn("stagger each must be a Number ")},$c=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Wc=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Bc=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var jc=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},zc=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Hc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},qc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Uc=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Gc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Jc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Yc=()=>{console.warn("createStaggers error: items array can not be empty")},Xc=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Kc=()=>{console.warn(`screateStaggers error: type should be: ${Qt} || ${ht} || ${tr} || ${rr}`)},Zc=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Qc=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},Qs=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},eu=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},tu=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},ru=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},ou=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},nu=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},nr=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},su=e=>{console.warn(`${e} value must be a string`)},iu=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},au=()=>{console.warn("asyncTimeline arror: delay must be a Number")},lu=e=>{console.warn(`${e} not found`)},cu=e=>{console.warn(`timeline add async function, ${e} is not a function `)},uu=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${d.DIRECTION_VERTICAL} | ${d.DIRECTION_HORIZONTAL}`)},pu=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},du=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},hu=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},mu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Et(t)} or a Number between 0 and 100`)},fu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Et(t)}`)},gu=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},bu=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Et(t)}`)},yu=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Et(t)} or a custom css propierites like margin|line-height|...`)},vu=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Et(t)}`)},Su=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Et(t)}`)},wu=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and ParallaxTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},Tu=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Et(t)}`)},xu=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},Cu=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},ei=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Et(t)}`)},Iu=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},Eu=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ku=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},Ru=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},Pu=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},ti=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Et(r)}, es: 45deg|100px|50vw etc..`)},Au=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},_u=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var st={[ee.easeLinear]:(e,t,r,o)=>r*e/o+t,[ee.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[ee.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[ee.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[ee.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[ee.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[ee.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[ee.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[ee.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[ee.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[ee.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[ee.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[ee.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[ee.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[ee.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[ee.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[ee.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[ee.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[ee.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[ee.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[ee.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[ee.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[ee.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[ee.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[ee.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[ee.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[ee.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[ee.easeInBounce]:(e,t,r,o)=>r-st[ee.easeOutBounce](o-e,0,r,o)+t,[ee.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[ee.easeInOutBounce]:(e,t,r,o)=>e<o/2?st[ee.easeInBounce](e*2,0,r,o)*.5+t:st[ee.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var We=e=>e in st?st[e]:(or(e),st[K.get("tween").ease]);var Ou=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,"\\$&"):"",ri=e=>/^[+-]?\d+(\.\d+)?$/.test(e),Nu=e=>/^\d+\.\d+$|^\d+$/.test(e),fe=(e,t)=>{let r=new RegExp(`^${Ou(t)}$`,"i");return(e.match(r)||[]).length},mt=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},oi=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),ni=(e,t)=>e.some(r=>{let o=new RegExp(`^${Ou(r)}$`,"i");return(t.match(o)||[]).length});var Mu=e=>e&&(fe(e,d.PROP_VERTICAL)?d.PROP_VERTICAL:fe(e,d.PROP_HORIZONTAL)?d.PROP_HORIZONTAL:fe(e,d.PROP_ROTATE)?d.PROP_ROTATE:fe(e,d.PROP_ROTATEY)?d.PROP_ROTATEY:fe(e,d.PROP_ROTATEX)?d.PROP_ROTATEX:fe(e,d.PROP_OPACITY)?d.PROP_OPACITY:fe(e,d.PROP_SCALE)?d.PROP_SCALE:fe(e,d.PROP_SCALE_X)?d.PROP_SCALE_X:fe(e,d.PROP_SCALE_Y)?d.PROP_SCALE_Y:fe(e,d.PROP_TWEEN)?d.PROP_TWEEN:e),Lu=e=>{if(e){if(mt(e,d.PX))return d.PX;if(mt(e,d.VH))return d.VH;if(mt(e,d.VW))return d.VW}return""},Pn=e=>fe(e,d.POSITION_TOP)?d.POSITION_TOP:fe(e,d.POSITION_BOTTOM)?d.POSITION_BOTTOM:fe(e,d.POSITION_LEFT)?d.POSITION_LEFT:fe(e,d.POSITION_RIGHT)?d.POSITION_RIGHT:"",Fu=e=>mt(e,d.PX)?d.PX:mt(e,d.VH)?d.VH:mt(e,d.VW)?d.VW:mt(e,d.WPERCENT)?d.WPERCENT:mt(e,d.HPERCENT)?d.HPERCENT:mt(e,d.DEGREE)?d.DEGREE:d.PX;var it=e=>c.checkType(Number,e)||c.checkType(Function,e)&&c.checkType(Number,e()),An=({start:e,end:t})=>{let r=c.checkType(Number,e),o=c.checkType(Number,t);return r||Ic(e),o||Ec(t),r&&o},$t=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&Hc(e),t?e:K.get("sequencer").duration},_n=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&Uc(e),t?e:1},Du=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?e:K.get("sequencer").ease},Vu=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?We(e):We(K.get("parallaxTween").ease)},$u=(e,t)=>{let r=c.checkType(String,e),o=c.checkType(Number,t);return r||Gc(e),o||Jc(t),r&&o},Wu=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||Rn(),t},Bu=e=>{if(!e)return null;let r=[ht,Fr,Dr,Vr,$r].includes(e),o=c.checkType(Number,e),n=c.checkType(Object,e),s=r||o||n;return s||zc(e),s},si=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||$c(e),t},ju=e=>{if(!e)return null;let r=[kn,fo,go].includes(e);return r||Bc(e),r},zu=e=>{if(!e)return null;let t=c.checkType(Boolean,e);return t||Wc(e),t},Hu=(e=[])=>{let t=c.checkType(Array,[...e])&&e.length>0;return t||Yc(),t},qu=(e=[])=>c.checkType(Array,[...e])&&e.length>0?e:[],Uu=e=>{if(!e)return null;let r=[Qt,er,tr,rr].includes(e);return r||Kc()};var Wt=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Qc(e,t),r?e:K.get(t).relative},On=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?We(e):We(K.get("tween").ease)},Nn=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?e:K.get("tween").ease},ii=e=>{let{config:t}=K.get("spring"),r=e in t,o=r?t[e]:{},s=(r?c.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>c.checkType(Number,i)&&i>=0):null;return!r&&e!==void 0&&e!==null&&Zs(e),!s&&r&&Vc(e),s?t[e]:t.default},Gu=e=>{let{config:t}=K.get("spring"),r=e in t;return!r&&e!==void 0&&e!==null&&Zs(e),r},ai=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r)&&r>=0);return!t&&e!==void 0&&e!==null&&Dc(),t?e:{}},li=e=>{let r=c.checkType(Function,e)?e():e,o=c.checkType(Number,r);return!o&&e!==void 0&&e!==null&&qc(e),o?r:K.get("tween").duration},et=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Qs(e,t),r&&e===!0},te=(e,t,r)=>{let o=c.checkType(Boolean,e);return!o&&e!==void 0&&e!==null&&Qs(e,t),o?e:r},Mn=(e,t,r)=>{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&eu(e,t),o?e:r},ft=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&tu(e,t),o?e:r},Be=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&ru(e,t),o?e:r},Ln=e=>{let t=c.checkType(Number,e)&&e>0&&e<=1;return!t&&e!==void 0&&e!==null&&ou(),t?e:K.get("lerp").velocity},Fn=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&nu(),t?e:K.get("lerp").precision},Ju=(e,t)=>{let r=c.checkType(String,e);return!r&&e!==void 0&&e!==null&&su(t),r},To=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&au(),t?e:null},sr=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e!==void 0&&e!==null&&iu(),t},Yu=(e,t)=>{e===-1&&lu(t)},Bt=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&Pu(r,e),o?e:t},Xu=e=>{let t=c.checkType(Function,e);return!t&&e!==void 0&&e!==null&&cu(e),t?e:({resolve:r})=>{r()}},Ku=e=>{let t=c.checkType(Array,e);return!t&&e!==void 0&&e!==null&&Ac(e),t},Zu=e=>{let t=c.checkType(String,e);return!t&&e!==void 0&&e!==null&&_c(e),t},Br=(e,t=!1)=>{let o=c.checkType(Element,e)?e:document.querySelector(e),n=o&&o!==void 0&&o!==null;return t?n?o:window:n?o:document.createElement("div")},ci=e=>{let r=c.checkType(Element,e)?e:document.querySelector(e);return r&&r!==void 0&&r!==null?r:null},xo=(e,t)=>{let o=[d.DIRECTION_VERTICAL,d.DIRECTION_HORIZONTAL].includes(e);return!o&&e!==void 0&&e!==null&&uu(e,t),o?e:d.DIRECTION_VERTICAL},ui=(e,t)=>{let r=[d.POSITION_TOP,d.POSITION_LEFT,d.POSITION_RIGHT,d.POSITION_BOTTOM],o=c.checkType(Object,e),n=o&&c.checkType(String,e?.position)&&r.includes(e.position),s=o&&c.checkType(Function,e.value)&&c.checkType(Number,e.value()),i=o&&n&&s;return i||pu(t),i?e:null},Qu=e=>{let t=c.checkType(Function,e)&&c.checkType(Number,e());return!t&&e!==void 0&&e!==null&&du(),t?e:null},ep=e=>{let t=e?.getType?.()&&(e.getType()===d.TWEEN_TWEEN||e.getType()===d.TWEEN_TIMELINE);return!t&&e!==void 0&&e!==null&&hu(),t?e:{}},tp=e=>{let t=[d.ALIGN_START,d.ALIGN_TOP,d.ALIGN_RIGHT,d.ALIGN_CENTER,d.ALIGN_BOTTOM,d.ALIGN_LEFT,d.ALIGN_END],r=t.includes(e)||c.checkType(Number,Number.parseFloat(e));return!r&&e!==void 0&&e!==null&&mu(e,t),r?e:d.ALIGN_CENTER},rp=e=>{let t=[d.IN_BACK,d.IN_STOP,d.OUT_BACK,d.OUT_STOP],r=t.includes(e);return!r&&e!==void 0&&e!==null&&fu(e,t),r?e:!1},pi=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&gu(e,t),o?e:r},op=e=>{let t=e?e.toLowerCase():null,r=[d.TYPE_PARALLAX,d.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t!==void 0&&t!==null&&bu(t,r),o?t:d.TYPE_PARALLAX},np=(e,t)=>(()=>{if(t===d.TYPE_PARALLAX){let o=Nu(e),n=c.checkType(Number,Number.parseFloat(e))&&o&&e>=0&&e<10;return!n&&e!==void 0&&e!==null&&xu(e),n?10-e:10-K.get("parallax").defaultRange}else{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&Cu(e),o?e:"0px"}})(),ir=(e,t,r)=>{let o=K.get("mq"),n=K.get("defaultMq").value,s=Object.keys(o),i=c.checkType(String,e)&&s.includes(e);return!i&&e!==void 0&&e!==null&&ei(e,s,t,r),i?e:n},ar=(e,t,r)=>{let o=K.get("defaultMq").type,n=[Tc,So],s=c.checkType(String,e)&&n.includes(e);return!s&&e!==void 0&&e!==null&&ei(e,n,t,r),s?e:o},sp=(e,t,r,o)=>{let n=[d.PROP_VERTICAL,d.PROP_HORIZONTAL,d.PROP_ROTATE,d.PROP_ROTATEY,d.PROP_ROTATEX,d.PROP_ROTATEZ,d.PROP_OPACITY,d.PROP_SCALE,d.PROP_SCALE_X,d.PROP_SCALE_Y,d.PROP_TWEEN],s=c.checkType(String,e);!s&&e!==void 0&&e!==null&&yu(e,n);let i=t===d.TYPE_PARALLAX&&e===d.PROP_TWEEN&&!r;!r&&!o&&e===d.PROP_TWEEN&&ku(),(r||o)&&e!==d.PROP_TWEEN&&Ru(),i&&Iu();let a=i?d.PROP_VERTICAL:e,l=Mu(a);return s?l:d.PROP_VERTICAL},ip=(e,t,r)=>{let o=[d.EASE_SPRING,d.EASE_LERP],n=t&&r&&e===d.EASE_SPRING,s=o.includes(e);!s&&e!==void 0&&e!==null&&vu(e,o),n&&wu();let i=s?e:d.EASE_LERP,a=n?d.EASE_LERP:i;return s?e:a},Dn=(e,t)=>{let r=[d.EASE_SPRING,d.EASE_LERP],o=r.includes(e);return!o&&e!==void 0&&e!==null&&Su(e,r,t),o?e:d.EASE_LERP},ap=(e,t)=>{let r=K.get("spring").config,o=Object.keys(r),n=t===d.TYPE_PARALLAX?K.get("parallax").springConfig:K.get("scrollTrigger").springConfig,s=o.includes(e);return!s&&e!==void 0&&e!==null&&Tu(e,o),s?e:n},lp=(e,t)=>{let r=c.checkType(Number,Number.parseFloat(e))&&e>0&&e<=1;!r&&e!==void 0&&e!==null&&Eu();let o=t===d.TYPE_PARALLAX?K.get("parallax").lerpConfig:K.get("scrollTrigger").lerpConfig;return r?Number.parseFloat(e):o},cp=(e,t)=>{let r=[d.PX,d.VW,d.VH,d.WPERCENT,d.HPERCENT];if(t===d.PROP_VERTICAL||t===d.PROP_HORIZONTAL){let n=oi(r,e);return n||ti(e,t,r),n?e:"0px"}if(t===d.PROP_ROTATE||t===d.PROP_ROTATEX||t===d.PROP_ROTATEY||t===d.PROP_ROTATEZ){let n=oi([d.DEGREE],e);return n||ti(e,t,[d.DEGREE]),n?e:"0"}if(t===d.PROP_SCALE||t===d.PROP_SCALE_X||t===d.PROP_SCALE_Y){let n=ri(e);return n||_u(e,t),n?e:"0"}let o=ri(e);return o||Au(t),o?e:"0"};var Vn=e=>{let{instantFps:t}=c.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},tt=e=>({type:Uu(e?.stagger?.type)?e.stagger.type:Wr.type,each:Wu(e?.stagger?.each)?e.stagger.each:Wr.each,from:Bu(e?.stagger?.from)?e?.stagger?.from:er,grid:{col:si(e?.stagger?.grid?.col)?e.stagger.grid.col:Wr.grid.col,row:si(e?.stagger?.grid?.row)?e.stagger.grid.row:Wr.grid.row,direction:ju(e?.stagger?.grid?.direction)?e.stagger.grid.direction:go},waitComplete:zu(e?.stagger?.waitComplete)?e.stagger.waitComplete:Wr.waitComplete}),gt=(e,t)=>e.length>t.length?e:t;var Co=e=>e%2,hf=e=>Math.floor(Math.random()*e),mf=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},ff=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Vn(s);if(n===$r)return{index:e,frame:o[hf(o.length)]};if(n===ht)return{index:e,frame:e*i};if(n===Fr)return{index:e,frame:(t-1-e)*i};if(n===Dr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Co(t)===0&&a-e===1?{index:e,frame:0}:Co(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Vr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Co(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Co(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Co(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Te(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},up=(e,t,r)=>{if(t.grid.direction===fo){let o=mo(e,r);return[...[...new Array(t.grid.col).keys()].reduce((s,i,a)=>[...s,...vc(o,a)],[])].flat()}else return e},pp=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,l=up(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),u=up(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),m=r.grid.direction===fo?i:s,h=mo(l,m),f=h[0];return f.forEach((y,w)=>{let{index:x,frame:C}=ff(w,h[0].length,r,mf(f,r.each,w));y.index=x,y.frame=C,C>=o.frame&&(o={index:x,frame:C}),C<=n.frame&&(n={index:x,frame:C})}),h.forEach(y=>{y.forEach((w,x)=>{w&&(w.index=h[0][x].index,w.frame=h[0][x].frame)})}),h.flat().forEach((y,w)=>{l[w].index=y.index,l[w].frame=y.frame,u.length>0&&(u[w].index=y.index,u[w].frame=y.frame)}),{staggerArray:l,staggerArrayOnComplete:u,fastestStagger:n,slowlestStagger:o}};var gf=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((l,p,u)=>u<t-i||u>t+i?l:[...l,p],[]);return[...o,a]},[]),bf=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),l=[];if(i>=r&&i<=r*2)return[...n,l];let p=t-a,u=t+a;for(let h=0;h<a;h++)$n(o,r+h,p)&&l.push(o[r+h][p]),$n(o,r+h,u)&&l.push(o[r+h][u]),h>0&&($n(o,r-h,p)&&l.push(o[r-h][p]),$n(o,r-h,u)&&l.push(o[r-h][u]));let m=l.filter(h=>h!=null);return[...n,m]},[]),$n=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,di=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=mo(e,r);[...new Array(r).keys()].forEach(()=>{s.push([])});let i=gf(s,o,n),a=bf(i,o,n,s),l=i.reduce((f,T,y)=>{let w=[...i[y],...a[y]];return f.push(w),f},[]),p=l.length;return{cleanArray:((n>=p/2?wc:Bs)===Bs?l.reduce((f,T,y)=>{if(y<n)return f;if(y===n){let w=[...l[y]];return f.push(w),f}else{let w=l[n-(y-n)]??[],x=[...l[y],...w];return f.push(x),f}},[]):l.reduce((f,T,y)=>{if(y>n)return f;if(y===n){let w=[...l[y]];return f.push(w),f}else{let w=l[n+(n-y)]??[],x=[...l[y],...w];return f.push(x),f}},[]).reverse()).reduce((f,T)=>T.length===0?f:[...f,T],[])}};var yf=({arr:e,stagger:t,slowlestStagger:r,fastestStagger:o,endArr:n})=>{c.checkType(Object,t?.from)||(t.from={}),c.checkType(Number,t?.from?.x)||(t.from={...t.from,x:0}),c.checkType(Number,t?.from?.y)||(t.from={...t.from,y:0});let{cleanArray:s}=di(e,t),i=0;s.forEach((u,m)=>{u.forEach(h=>{let f=Vn(t.each),T=m*f;h.index=i,h.frame=T,T>=r.frame&&(r={index:i,frame:T}),T<=o.frame&&(o={index:i,frame:T}),i++})});let a=(()=>{if(n.length>0){let{cleanArray:u}=di(n,t);return u.flat()}else return[]})(),l=s.flat(),p=a.flat();return l.forEach((u,m)=>{p.length>0&&(p[m].index=u.index,p[m].frame=u.frame)}),{staggerArray:l,staggerArrayOnComplete:p,fastestStagger:o,slowlestStagger:r}},vf=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[ht,Fr,Dr,Vr,$r];return(!c.checkType(String,r?.from)&&!c.checkType(Number,r?.from)||c.checkType(String,r?.from)&&!s.includes(r?.from))&&(jc(),r.from=ht),pp({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n})},rt=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===kn?yf({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n}):vf({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,l=s.fastestStagger,p=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:l,slowlestStagger:p}};var jr=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){c.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),c.useFrame(()=>{r.forEach(({cb:s})=>{c.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{c.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{c.useCache.update({id:s,callBackObject:o,frame:i})})},zr=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:l})=>{if(s.each===0||!l){e(),c.useNextFrame(()=>{t.forEach(({cb:p})=>{p(n)}),r.forEach(({cb:p})=>{c.useCache.fireObject({id:p,obj:n})}),o.forEach(({cb:p})=>{p(n)})});return}t.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(s.waitComplete){m===i.index&&(p(n),e());return}m===a.index&&(p(n),e())},u)}),r.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(s.waitComplete){m===i.index&&(c.useCache.fireObject({id:p,obj:n}),e());return}m===a.index&&(c.useCache.fireObject({id:p,obj:n}),e())},u)}),o.forEach(({cb:p,frame:u})=>{c.useFrameIndex(()=>{p(n)},u+1)})};var Io=c.createStore({id:0});var Ce=(e,t)=>{let{id:r}=Io.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Io.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:l,frame:p})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:l,frame:p}))}},bt=(e,t,r,o)=>{let{id:n}=Io.get(),{id:s,unsubscribe:i}=c.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let l=n;return Io.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:p=>(i(),p.map(({id:u,cb:m,index:h,frame:f})=>(u===l&&(m=-1),{id:u,cb:m,index:h,frame:f})))}};var jt=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}}),Hr=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>{},fromIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),settled:!1}}),qr=(e,t)=>Object.keys(e).map(r=>{if(!it(t[r])||!it(e[r]))return kt(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let o=c.checkType(Number,e[r])?e[r]:e[r](),n=c.checkType(Number,t[r])?t[r]:t[r]();return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:c.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:c.checkType(Function,t[r]),settled:!1}}),Ur=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}});var Gr=(e,t,r,o)=>{c.useFrame(()=>{c.useNextTick(({time:n,fps:s})=>{let i=e.map(({cb:a})=>a()).includes(!0);t(n,s,o),i&&r()})})};var zt=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Jr=(e,t,r,o)=>(c.checkType(Number,e)||Rn(),e>0&&t&&(r.length>0||o.length>0));var Wn=(e,t)=>{c.useFrame(()=>{c.useNextTick(({time:r,fps:o})=>{e(r,o,t)})})};var ge=(e,t)=>e.map(r=>({[r.prop]:Number.parseFloat(r[t])})).reduce((r,o)=>({...r,...o}),{}),Yr=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Xr=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Bn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),dp=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Rt=class{constructor(t){this.stagger=tt(t),this.relative=Wt(t?.relative,"lerp"),this.velocity=Ln(t?.velocity),this.precision=Fn(t?.precision),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,velocity:this.velocity,precision:this.precision,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{}){this.isActive=!0,this.values.forEach(i=>{i.settled||(i.currentValue=yc(i.currentValue,i.toValue,this.velocity/r*60),i.currentValue=pe(i.currentValue),i.settled=Number(Math.abs(i.toValue-i.currentValue).toFixed(4))<=this.precision,i.settled&&(i.currentValue=i.toValue))});let n=ge(this.values,"currentValue");if(jr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:n,useStagger:this.useStagger}),this.values.every(i=>i.settled===!0)){let i=()=>{this.isActive=!1,this.values.forEach(l=>{l.fromValue=l.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},a=ge(this.values,"toValue");zr({onComplete:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:a,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:i,fps:a})=>{this.isActive&&this.draw(i,a,o)})})}onReuqestAnim(t,r,o){this.values.forEach(n=>{n.currentValue=Number.parseFloat(n.fromValue)}),this.draw(t,r,o)}async inzializeStagger(){if(Jr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("lerp",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=n,this.slowlestStagger=i,this.fastestStagger=s,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Gr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Mr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=In(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Wn(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Fe(this.values,this.initialData)}mergeProps(t){let r={...this.defaultProps,...t},{velocity:o,precision:n,relative:s}=r;return this.relative=Wt(s,"lerp"),this.velocity=Ln(o),this.precision=Fn(n),r}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=jt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Hr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Dt(t,r))return Vt("lerp goFromTo:",t,r),this.promise;let n=qr(t,r);return this.doAction(n,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Ur(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=Bn(t,this.values);let{reverse:n,immediate:s,immediateNoPromise:i}=this.mergeProps(r);if(et(n,"reverse")&&(this.values=Lr(o,this.values)),this.values=En(this.values,this.relative),et(s,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Xr(this.values)}getToNativeType(){return Yr(this.values)}getType(){return"LERP"}getId(){return this.uniqueId}updateVelocity(t){this.velocity=Ln(t),this.defaultProps=Fe(this.defaultProps,{velocity:this.velocity})}updatePrecision(t){this.velocity=Fn(t),this.defaultProps=Fe(this.defaultProps,{precision:this.precision})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=s,()=>this.callbackCache=n(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var at=class{constructor(t){this.stagger=tt(t),this.relative=Wt(t?.relative,"spring"),this.configProps=ii(t?.config),this.updateConfigProp(t?.configProp),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,configProps:this.configProps,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{},n,s,i,a){this.isActive=!0,this.values.forEach(u=>{let m=-n*(u.currentValue-u.toValue),h=-s*u.velocity,f=(m+h)/i;u.velocity=u.velocity+f*1/r,u.currentValue=u.currentValue+u.velocity*1/r,u.currentValue=pe(u.currentValue);let T=Math.abs(u.velocity)<=.1,y=n===0?!0:Math.abs(u.toValue-u.currentValue.toFixed(4))<=a;u.settled=T&&y});let l=ge(this.values,"currentValue");if(jr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:l,useStagger:this.useStagger}),this.values.every(u=>u.settled===!0)){let u=()=>{this.isActive=!1,this.values.forEach(h=>{h.fromValue=h.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},m=ge(this.values,"toValue");zr({onComplete:u,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:m,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:u,fps:m})=>{this.isActive&&this.draw(u,m,o,n,s,i,a)})})}onReuqestAnim(t,r,o){this.values.forEach(l=>{l.velocity=Math.trunc(this.configProps.velocity)});let n=this.configProps.tension,s=this.configProps.friction,i=Math.max(1,this.configProps.mass),a=this.configProps.precision;this.draw(t,r,o,n,s,i,a)}async inzializeStagger(){if(Jr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("spring",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=n,this.slowlestStagger=i,this.fastestStagger=s,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Gr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Mr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=In(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Wn(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.configProps.velocity,currentValue:n,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Fe(this.values,this.initialData)}mergeProps(t){let o=K.get("spring").config,n=Gu(t?.config)?o[t.config]:this.defaultProps.configProps,s=ai(t?.configProp),i={...n,...s},a={...this.defaultProps,...t,configProps:i},{configProps:l,relative:p}=a;return this.configProps=l,this.relative=p,a}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=jt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Hr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Dt(t,r))return Vt("spring goFromTo:",t,r),this.promise;let n=qr(t,r);return this.doAction(n,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Ur(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=Bn(t,this.values);let{reverse:n,immediate:s,immediateNoPromise:i}=this.mergeProps(r);if(et(n,"reverse")&&(this.values=Lr(o,this.values)),this.values=En(this.values,this.relative),et(s,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Xr(this.values)}getToNativeType(){return Yr(this.values)}getType(){return"SPRING"}getId(){return this.uniqueId}updateConfigProp(t={}){let r=ai(t);this.configProps={...this.configProps,...r},this.defaultProps=Fe(this.defaultProps,{configProps:r})}updateConfig(t){this.configProps=ii(t),this.defaultProps=Fe(this.defaultProps,{configProps:this.configProps})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=s,()=>this.callbackCache=n(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Sf=(e="desktop")=>window.innerWidth<K.get("mq")[e],wf=(e="desktop")=>window.innerWidth>=K.get("mq")[e],Tf=(e="desktop")=>K.get("mq")[e],oe={max:Sf,min:wf,getBreackpoint:Tf};var de=()=>{},jn=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ht=class{constructor(t={}){if(this.propsIsValid=!0,this.endValue=0,this.percent=0,this.screenWidth=0,this.screenHeight=0,this.firstTouchValue=0,this.threshold=30,this.maxValue=0,this.minValue=0,this.dragEnable=null,this.touchend=null,this.touchmove=null,this.prevTouchVal=0,this.touchVal=0,this.onUpdateScrollBar=de,this.subscribeResize=de,this.subscribeScrollStart=de,this.subscribeScrollEnd=de,this.subscribeTouchStart=de,this.subscribeTouchEnd=de,this.subscribeMouseDown=de,this.subscribeMouseUp=de,this.subscribeMouseWheel=de,this.subscribeMouseMove=de,this.subscribeTouchMove=de,this.subscribeMouseClick=de,this.motion=null,this.unsubscribeMotion=de,this.unsubscribeOnComplete=de,this.scrollbarIsRunning=!1,this.direction=xo(t?.direction,"SmoothScroller"),this.easeType=Dn(t?.easeType,"SmoothScroller"),this.breakpoint=ir(t?.breakpoint,"breakpoint","SmoothScroller"),this.queryType=ar(t?.queryType,"queryType","SmoothScroller"),this.scroller=c.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,!this.scroller){console.warn("SmoothScroller: scroller node not found"),this.propsIsValid=!1;return}if(this.screen=t?.screen?c.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,!this.screen){this.propsIsValid=!1,console.warn("SmoothScroller: screen node not found");return}this.scopedEvent=te(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.speed=ft(t?.speed,"SmoothScroller: speed",60),this.drag=te(t?.drag,"SmoothScroller: drag",!1),this.onTickCallback=Be(t?.onTick,"SmoothScroller: onTick",null),this.onUpdateCallback=Be(t?.onUpdate,"SmoothScroller: onUpdate",null),this.onAfterRefresh=Be(t?.afterRefresh,"SmoothScroller: afterRefresh",de),this.afterInit=Be(t?.afterInit,"SmoothScroller: afterInit",de),this.children=t?.children||[],this.children.forEach(r=>{r.setScroller(this.scroller),r.setDirection(this.direction),r.setScreen(this.screen),r.setBreakPoint(this.breakpoint),r.setQueryType(this.queryType),r.init()}),this.scopedWhell=r=>{let{spinY:o}=c.normalizeWheel(r);this.onScopedWhell({target:r.target,spinY:o})},this.scopedTouchMove=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.onScopedTouchMove({client:{x:o,y:n}})}}init(){if(this.propsIsValid){switch(this.easeType){case d.EASE_SPRING:{this.motion=new at;break}default:{this.motion=new Rt;break}}this.scopedEvent?(this.scroller.addEventListener("wheel",this.scopedWhell,{passive:!0}),this.scroller.addEventListener("mousemove",this.scopedTouchMove,{passive:!0}),this.scroller.addEventListener("touchmove",this.scopedTouchMove,{passive:!0})):(this.subscribeMouseWheel=c.useMouseWheel(t=>this.onWhell(t)),this.subscribeMouseMove=c.useMouseMove(t=>this.onTouchMove(t)),this.subscribeTouchMove=c.useTouchMove(t=>this.onTouchMove(t))),this.subscribeResize=c.useResize(()=>this.refresh()),this.subscribeScrollStart=c.useScrollStart(()=>this.refreshScroller()),this.subscribeScrollEnd=c.useScrollEnd(()=>this.refreshScroller()),this.subscribeTouchStart=c.useTouchStart(t=>this.onMouseDown(t)),this.subscribeTouchEnd=c.useTouchEnd(t=>this.onMouseUp(t)),this.subscribeMouseDown=c.useMouseDown(t=>this.onMouseDown(t)),this.subscribeMouseUp=c.useMouseUp(t=>this.onMouseUp(t)),this.drag&&(this.subscribeMouseClick=c.useMouseClick(({target:t,preventDefault:r})=>{this.preventChecker({target:t,preventDefault:r})})),this.initMotion(),oe[this.queryType](this.breakpoint)&&(this.setScrolerStyle(),this.refreshScroller()),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)}}setScrolerStyle(){this.scroller.style["user-select"]="none",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable",!1),r.style["user-select"]="none"})}removeScrolerStyle(){this.scroller.style["user-select"]="",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}initMotion(){this.motion.setData({val:0}),this.unsubscribeMotion=this.motion.subscribe(({val:t})=>{this.scroller.style.transform=this.direction==d.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-t}px)`:`translate3d(0px, 0px, 0px) translateX(${-t}px)`,this.children.forEach(r=>{r.triggerScrollStart()}),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!0}),this.children.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.unsubscribeOnComplete=this.motion.onComplete(({val:t})=>{this.scroller.style.transform=this.direction==d.DIRECTION_VERTICAL?`translateY(${-t}px)`:`translateX(${-t}px)`,c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!1}),this.children.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})})}refreshScroller(){this.screenWidth=this.screen===document.documentElement?window.innerWidth:ot(this.screen),this.screenHeight=this.screen===document.documentElement?window.innerHeight:Se(this.screen),this.maxValue=this.direction===d.DIRECTION_VERTICAL?this.scroller.offsetHeight-this.screenHeight:this.scroller.offsetWidth-this.screenWidth,this.calculateValue()}onScopedTouchMove({client:t}){!this.dragEnable||!this.drag||(this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(t),this.endValue+=Number.parseInt(this.prevTouchVal-this.touchVal),this.calculateValue(),this.scrollbarIsRunning=!1)}onScopedWhell({spinY:t}){oe[this.queryType](this.breakpoint)&&(this.dragEnable=!1,this.endValue+=t*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}onMouseDown({target:t,client:r}){oe[this.queryType](this.breakpoint)&&(t===this.scroller||ro(this.scroller,t))&&(this.firstTouchValue=this.endValue,this.dragEnable=!0,this.prevTouchVal=this.getMousePos(r),this.touchVal=this.getMousePos(r),this.scrollbarIsRunning=!1)}onMouseUp(){this.dragEnable=!1,this.scrollbarIsRunning=!1}onTouchMove({target:t,client:r,preventDefault:o}){if((t===this.scroller||ro(this.scroller,t))&&this.dragEnable&&this.drag){o(),this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(r);let n=Number.parseInt(this.prevTouchVal-this.touchVal);this.endValue+=n,this.calculateValue(),this.scrollbarIsRunning=!1}}onWhell({target:t,spinY:r,preventDefault:o}){let n=document.body.style.overflow==="hidden"&&this.direction===d.DIRECTION_VERTICAL;!oe[this.queryType](this.breakpoint)||n||(t===this.scroller||ro(this.scroller,t))&&(this.dragEnable=!1,o(),this.endValue+=r*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}move(t){oe[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.goTo({val:this.endValue}).catch(()=>{}))}set(t){oe[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.set({val:this.endValue}).catch(()=>{}))}calculateValue(){let t=this.endValue*100/this.maxValue;this.percent=Oe(t,0,100),this.endValue=Oe(this.endValue,0,this.maxValue),this.motion.goTo({val:this.endValue}).catch(()=>{}),this.onUpdateCallback&&this.onUpdateCallback({value:-this.endValue,percent:this.percent,parentIsMoving:!0})}preventChecker({target:t,preventDefault:r}){oe[this.queryType](this.breakpoint)&&(t===this.scroller||ro(this.scroller,t))&&Math.abs(this.endValue-this.firstTouchValue)>this.threshold&&r()}getMousePos(t){let{x:r,y:o}=t;return this.direction===d.DIRECTION_VERTICAL?o:r}refresh(){if(!oe[this.queryType](this.breakpoint)){this.removeScrolerStyle(),this.motion?.stop?.(),c.useFrame(()=>{c.useNextTick(()=>{this.scroller.style.transform=""})});return}this.refreshScroller(),this.setScrolerStyle(),c.useFrameIndex(()=>{c.useNextTick(()=>{this.onAfterRefresh&&this.onAfterRefresh(),this.children.forEach(t=>{t?.refresh?.()})})},2)}destroy(){this.removeScrolerStyle(),this.subscribeResize(),this.subscribeScrollStart(),this.subscribeScrollEnd(),this.subscribeTouchStart(),this.subscribeTouchEnd(),this.subscribeMouseDown(),this.subscribeMouseUp(),this.subscribeMouseWheel(),this.subscribeMouseMove(),this.subscribeTouchMove(),this.subscribeMouseClick(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.onUpdateScrollBar=()=>{},this.motion?.destroy(),this.motion=null,this.children.forEach(t=>{t?.destroy?.(),t=null}),this.children=[],this.onTickCallback=[],this.onUpdateCallback=[],this.onAfterRefresh=[],this.afterInit=[],this.scopedEvent&&(this.scroller.removeEventListener("wheel",this.scopedWhell),this.scroller.removeEventListener("mousemove",this.scopedTouchMove),this.scroller.removeEventListener("touchmove",this.scopedTouchMove)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=[],this.scroller=null,this.screen=null})},3)}};var Pt=class{constructor(t){this.ease=On(t?.ease),this.duration=li(t?.duration),this.relative=Wt(t?.relative,"tween"),this.stagger=tt(t),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.comeFromResume=!1,this.startTime=0,this.isRunning=!1,this.timeElapsed=0,this.pauseTime=0,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={duration:this.duration,ease:Nn(t?.ease),relative:this.relative,reverse:!1,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r=()=>{}){this.isActive=!0,this.pauseStatus&&(this.pauseTime=t-this.startTime-this.timeElapsed),this.timeElapsed=t-this.startTime-this.pauseTime,this.isRunning&&Math.round(this.timeElapsed)>=this.duration&&(this.timeElapsed=this.duration),this.values.forEach(s=>{s.shouldUpdate?(s.currentValue=this.ease(this.timeElapsed,s.fromValue,s.toValProcessed,this.duration),s.currentValue=pe(s.currentValue)):s.currentValue=s.fromValue});let o=Math.round(this.timeElapsed)===this.duration,n=ge(this.values,"currentValue");jr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:n,useStagger:this.useStagger}),this.isRunning=!0,o?zr({onComplete:()=>{this.isActive=!1,this.isRunning=!1,this.pauseTime=0,this.values.forEach(i=>{i.shouldUpdate&&(i.toValue=i.currentValue,i.fromValue=i.currentValue)}),this.pauseStatus||(r(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:n,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger}):c.useFrame(()=>{c.useNextTick(({time:s})=>{this.isActive&&this.draw(s,r)})})}onReuqestAnim(t,r,o){this.startTime=t,this.draw(t,o)}async inzializeStagger(){if(Jr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("tween",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=n,this.slowlestStagger=i,this.fastestStagger=s,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Gr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseTime=0,this.pauseStatus=!1,this.comeFromResume=!1,this.values=Mr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive=!1}pause(){this.pauseStatus||(this.pauseStatus=!0)}resume(){this.pauseStatus&&(this.pauseStatus=!1,this.comeFromResume=!0)}setData(t){this.values=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}))}resetData(){this.values=Fe(this.values,this.initialData)}updateDataWhileRunning(){this.isActive=!1,this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0),this.values.forEach(t=>{t.shouldUpdate&&(t.fromValue=t.currentValue)})}mergeProps(t){let r={...this.defaultProps,...t},{ease:o,duration:n,relative:s}=r;return this.ease=On(o),this.relative=Wt(s,"tween"),this.duration=li(n),r}goTo(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=jt(t);return this.doAction(o,r,t)}goFrom(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=Hr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if((this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0,!Dt(t,r))return Vt("tween goFromTo:",t,r),this.promise;let n=qr(t,r);return this.doAction(n,o,t)}set(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!1;let o=Ur(t);return r.duration=1,this.doAction(o,r,t)}doAction(t,r,o){this.values=dp(t,this.values),this.isActive&&this.updateDataWhileRunning();let{reverse:n,immediate:s,immediateNoPromise:i}=this.mergeProps(r);if(et(n,"reverse")&&(this.value=Lr(o,this.values)),this.values=Sc(this.values,this.relative),et(s,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Xr(this.values)}getToNativeType(){return Yr(this.values)}getType(){return"TWEEN"}getId(){return this.uniqueId}updateEase(t){this.ease=On(t),this.defaultProps=Fe(this.defaultProps,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=s,()=>this.callbackCache=n(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var lr=(()=>{let e="easeOutQuad",t=new Pt({ease:e,data:{val:0}}),r=!1,o=!1,n=e;t.subscribe(({val:a})=>{window.scrollTo({top:a,left:0,behavior:"auto"})});function s(){o&&(document.body.style.overflow=""),n&&t.updateEase(e)}c.useMouseWheel(()=>{r&&(t.stop(),s())}),c.useMouseDown(()=>{r&&(t.stop(),s())}),c.useTouchStart(()=>{r&&(t.stop(),s())});function i(a=null,l={}){if(typeof window<"u"){let p=a?ss(a)||c.checkType(Number,a)?ss(a)?ie(a).top:a:(console.warn(`bodyScroll ${a} is not valid target, must be a node or a number`),0):0,u=ft(l?.duration,"bodyScroll: duration",500);o=te(l?.overflow,"bodyScroll: overflow",!1),n=l?.ease?Nn(l?.ease):null,o&&(document.body.style.overflow="hidden"),n&&t?.updateEase?.(n);let m=window.pageYOffset;return new Promise((h,f)=>{r=!0,t.goFromTo({val:m},{val:p},{duration:u}).then(()=>{s(),r=!1,h()}).catch(()=>{r=!1,f(c.ANIMATION_STOP_REJECT)})})}}return{to:i}})();var Eo=(()=>{let e=[],t=0;function r(l){let p=c.checkType(Element,l);return p||console.warn(`slide utils ${l} is not a valid Dom element`),p}function o(l){let p={};return p.item=l,p.id=t,p.tween=new Pt({ease:"easeOutQuad"}),p.unsubscribe=p.tween.subscribe(({val:u})=>{p.item.style.height=`${u}px`}),p.tween.setData({val:0}),p}function n(l){if(!r(l))return;if(e.find(({item:h})=>h===l)){console.warn(`slide utils ${l} is alredysubscribed`);return}let u=o(l);e.push(u);let m=t;return t++,e.push(u),()=>{u.unsubscribe(),u.tween=null,u.item=null,e=e.filter(({id:h})=>h!==m)}}function s(l){r(l)&&(l.style.height=0,l.style.overflow="hidden")}function i(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:y})=>y===l);m||u(new Error("slide element not exist in slide store"));let{item:h,tween:f}=m,T=Se(h);f.goFromTo({val:T},{val:0},{duration:500}).then(()=>{p()})})}function a(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:w})=>w===l);m||u(new Error("slide element not exist in slide store"));let{item:h,tween:f}=m,{val:T}=f.get();h.style.height="auto";let y=Se(h);h.style.height=`${T}px`,f.goTo({val:y},{duration:500}).then(()=>{h.style.height="auto",p()})})}return{subscribe:n,reset:s,up:i,down:a}})();function hp({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){let a=()=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?d.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?d.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?d.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?d.ON_ENTER:d.ON_NOOP;({[d.ON_LEAVE]:()=>{s&&s()},[d.ON_ENTER_BACK]:()=>{n&&n()},[d.ON_LEAVE_BACK]:()=>{i&&i()},[d.ON_ENTER]:()=>{o&&o()},[d.ON_NOOP]:()=>{}})[a()]()}var xf=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},Cf=({screen:e})=>{if(e===window)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},If=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===d.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},Ef=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===d.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},mp=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:l,lastEndMarkerEl:p}=xf({startMarker:e,endMarker:t,label:a}),{top:u,right:m,bottom:h,left:f}=Cf({screen:n}),T=If({startPoint:r,direction:s,invertSide:i,top:u,bottom:h,left:f,right:m}),y=Ef({startPoint:r,endPoint:o,direction:s,invertSide:i,top:u,bottom:h,left:f,right:m}),w={position:"fixed",zIndex:"99999",background:K.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return c.useFrame(()=>{Object.assign(l?.style,{...w,...T}),Object.assign(p?.style,{...w,...y})}),{startMarker:l,endMarker:p}};var zn=class{constructor(){this.parallaxInstance=void 0,this.trasponderActive=!1,this.scrollerHeight=0,this.start=0,this.startFromTop=0,this.scroller=window,this.invertSide=void 0,this.end=0,this.orientation=d.DIRECTION_VERTICAL,this.compesateValue=0,this.trigger=null,this.item=void 0,this.spring=void 0,this.wrapper=void 0,this.pin=void 0,this.isOver=!1,this.isInner=!1,this.isUnder=!1,this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeSpring=()=>{},this.firstTime=!0,this.itemRequireStyleToWrapper=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.itemRequireStyleWhenTraspond=["font-size","padding","margin","line-height","white-space"],this.parentRequireStyle=["text-align"],this.itemRequireStyleToPin=["z-index","pointer-events"],this.styleToTranspond=["transform","position","translate","rotate","scale"],this.nonRelevantRule=["none","static"],this.isInizialized=!1,this.prevScroll=0,this.prevscrollY=0,this.animatePin=!1,this.anticipateFactor=1.5,this.forceTranspond=!1,this.justPinned=!1,this.afterPinCounter=0,this.lastStep=0,this.afterJustPinned=!1,this.afterJustPinnedCounter=0,this.numeCycleToFreeze=3}init({instance:t}){this.parallaxInstance=t,this.item=t.item,this.marker=t.marker,this.trigger=t.trigger||t.item,this.scroller=t.scroller,this.screen=t.screen,this.animatePin=t.animatePin,this.anticipatePinOnLoad=t.anticipatePinOnLoad,this.forceTranspond=t.forceTranspond,this.invertSide=t.invertSide,this.orientation=t.direction,this.prevscrollY=window.pageYOffset,this.scrollerHeight=t.scrollerHeight,this.refreshCollisionPoint(),this.collisionTranslateProp=this.orientation===d.DIRECTION_VERTICAL?"Y":"X",this.collisionStyleProp=this.orientation===d.DIRECTION_VERTICAL?"top":"left",this.isInizialized=!0,this.firstTime=!0,this.createPin(),this.addStyleFromPinToWrapper(),this.setPinSize(),this.setUpMotion(),this.unsubscribeScrollStart=c.useScrollStart(()=>{if(this.isInizialized&&this.screen!==window&&this.isInner&&this.pin){let r=()=>{this.pin&&(this.pin.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")};c.useFrame(()=>{r()})}}),this.unsubscribeScroll=c.useScroll(({scrollY:r})=>{if(this.isInizialized&&this.screen!==window){this.orientation===d.DIRECTION_VERTICAL&&this.refreshCollisionPoint();let o=r-this.prevscrollY;if(this.prevscrollY=r,this.isInner&&this.pin){let{verticalGap:n}=this.spring.get(),s=n-o;this.spring.setData({collision:0,verticalGap:s}),c.useFrame(()=>{this.pin&&(this.pin.style.transform=`translate(0px,${s}px)`)})}}})}setUpMotion(){this.spring=new at({data:{collision:0,verticalGap:0},config:"wobbly"}),this.unsubscribeSpring=this.spring.subscribe(({collision:t,verticalGap:r})=>{this.orientation===d.DIRECTION_VERTICAL&&this.pin?this.pin.style.transform=`translate(0px, ${t}px)`:this.pin&&(this.pin.style.transform=`translate(${t}px, ${r}px)`)})}resetSpring(){this.pin&&this.spring.set({collision:0,verticalGap:0}).catch(()=>{})}createPin(){this.item||(this.item=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.item?.parentNode;o&&o.insertBefore(t,this.item),r.append(this.item),this.wrapper=this.item.closest(".pin-wrapper"),this.pin=this.item.closest(".pin");let n=this.addRquiredStyle(),s=this.addPinStyleFromItem(),i=(()=>{if(!this.marker)return{};let p=`3px ${K.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return this.orientation===d.DIRECTION_VERTICAL?this.invertSide?{borderBottom:p}:{borderTop:p}:this.invertSide?{borderRight:p}:{borderLeft:p}})(),a={display:"table"};c.useFrame(()=>{!this.pin||!this.wrapper||(Object.assign(this.wrapper.style,{...i}),Object.assign(this.pin.style,{...a,...s,...n}))}),this.checkIfShouldTranspond()}setPinSize(){(()=>{if(!this.pin||!this.wrapper)return;let r=this.wrapper.offsetHeight,o=this.wrapper.offsetWidth;this.wrapper.style.height=`${r}px`,this.wrapper.style.width=`${o}px`,this.pin.style.height=`${r}px`,this.pin.style.width=`${o}px`})()}addStyleFromPinToWrapper(){if(!this.item)return;let t=window.getComputedStyle(this.item),r=this.itemRequireStyleToWrapper.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});c.useFrame(()=>{this.wrapper&&Object.assign(this.wrapper.style,r)})}findStyle(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.nonRelevantRule.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}addRquiredStyle(){return this.pin?this.parentRequireStyle.map(t=>this.findStyle(this.pin,t)).filter(t=>t!==null).reduce((t,r)=>({...t,...r}),{}):{}}checkIfShouldTranspond(){if(this.forceTranspond){this.shoulTranspond=!0;return}this.shoulTranspond=this.styleToTranspond.map(t=>{let r=this.findStyle(this.wrapper,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}refreshCollisionPoint(){this.start=this.parallaxInstance.startPoint,this.screen!==window&&(this.start-=this.parallaxInstance.direction===d.DIRECTION_VERTICAL?Ye(this.screen).top:Ye(this.screen).left),this.startFromTop=this.invertSide?this.start:this.scrollerHeight-this.start,this.end=this.parallaxInstance.endPoint,this.compesateValue=this.invertSide?-Math.trunc(this.end):Math.trunc(this.end)}destroy(){this.isInizialized&&(this.parallaxInstance=null,this.spring.stop(),this.unsubscribeSpring(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.spring.destroy(),this.spring=null,this.afterPinCounter=0,this.justPinned=!1,this.isUnder=!1,this.isInner=!1,this.isOver=!1,this.pin&&this.wrapper&&(this.wrapper.parentNode?.insertBefore(this.item,this.wrapper),this.pin.remove(),this.wrapper.remove(),this.wrapper=void 0,this.pin=void 0,this.isInizialized=!1))}getGap(){return this.wrapper?this.orientation===d.DIRECTION_VERTICAL?Ye(this.wrapper).top-this.startFromTop:Ye(this.wrapper).left-this.startFromTop:0}animateCollision(){let t=this.getGap();this.tween(t)}animateCollisionBack(){let t=this.invertSide?this.getGap()-this.end:this.getGap()+this.end;this.tween(t)}tween(t){let r=()=>{!this.pin||!this.collisionStyleProp||(this.pin.style[this.collisionStyleProp]=`${this.startFromTop}px`)};c.useFrame(()=>r()),this.animatePin&&!this.firstTime&&this.pin&&this.spring.goFrom({collision:t}).then(()=>{this.resetPinTransform()}).catch(()=>{})}resetPinTransform(){let t=()=>{this.pin&&(this.pin.style.transform="translate(0px, 0px)")};c.useFrame(()=>{t()})}resetStyleWhenUnder(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.pin.style.top="",this.pin.style.left="")};c.useFrame(()=>{t()})}resetStyleWhenOver(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.orientation===d.DIRECTION_VERTICAL?(this.pin.style.left="",this.pin.style.top=`${this.compesateValue}px`):(this.pin.style.top="",this.pin.style.left=`${this.compesateValue}px`))};c.useFrame(()=>{t()})}setFixedPosition(){if(!this.pin)return;let t=this.orientation===d.DIRECTION_VERTICAL?Ye(this.pin).left:Ye(this.pin).top,r=this.orientation===d.DIRECTION_VERTICAL?"left":"top",o=()=>{this.pin&&(this.pin.style.position="fixed",this.pin.style[r]=`${t}px`,this.justPinned=!0,this.afterJustPinned=!0)};c.useFrame(()=>{o()})}addPinStyleFromItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleToPin.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}addStyleToItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleWhenTraspond.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}removeStyleToItem(){return this.itemRequireStyleWhenTraspond.reduce((t,r)=>({...t,[r]:""}),{})}activateTrasponder(){if(this.shoulTranspond){let t=this.addRquiredStyle(),r=this.addPinStyleFromItem(),o=this.addStyleToItem(),n=()=>{this.pin&&(Object.assign(this.pin.style,{...r,...t}),this.item&&Object.assign(this.item.style,o),document.body.append(this.pin))};c.useFrame(()=>{n()}),this.trasponderActive=!0}}deactivateTrasponder(){if(!this.shoulTranspond||!this.item||!this.wrapper)return;let t=()=>{this.pin&&(Object.assign(this.item.style,this.removeStyleToItem()),this.wrapper?.append(this.pin))};c.useFrame(()=>{t()}),this.trasponderActive=!1}getAnticipate(t){let r=this.afterJustPinned&&this.afterJustPinnedCounter<3?this.lastStep:Oe(Math.abs(t-this.prevScroll),0,250);return this.afterJustPinned&&this.afterJustPinnedCounter<this.numeCycleToFreeze?this.afterJustPinnedCounter++:(this.afterJustPinnedCounter=0,this.afterJustPinned=!1),this.lastStep=r,r*this.anticipateFactor}getAnticipateValue(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),n=r===d.SCROLL_UP?0:o,s=r===d.SCROLL_UP?0:o*2,i=r===d.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}getAnticipateValueInverted(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),n=r===d.SCROLL_UP?o:0,s=r===d.SCROLL_UP?o*2:0,i=r===d.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.isInizialized||!this.wrapper)return;if(this.justPinned&&this.afterPinCounter<this.numeCycleToFreeze){this.afterPinCounter++;return}else this.afterPinCounter=0,this.justPinned=!1;let r=this.prevScroll>t?d.SCROLL_UP:d.SCROLL_DOWN,o=this.orientation===d.DIRECTION_VERTICAL?Ye(this.wrapper).top:Ye(this.wrapper).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.invertSide?this.getAnticipateValueInverted(t,r):this.getAnticipateValue(t,r),a=this.invertSide?o<this.start-n:o>this.scrollerHeight-this.start+n,l=this.invertSide?o>=this.start-s&&o<=this.start+i+this.end:o<=this.scrollerHeight-this.start+s&&this.scrollerHeight-o<=this.end+i+this.start;if(a)this.isUnder||(this.resetStyleWhenUnder(),this.deactivateTrasponder(),this.isUnder=!0,this.isInner=!1,this.isOver=!1);else if(l){if(!this.isInner){this.setFixedPosition();let p=r===d.SCROLL_DOWN&&!this.invertSide||r===d.SCROLL_UP&&this.invertSide;this.activateTrasponder(),p?this.animateCollision():this.animateCollisionBack(),this.isUnder=!1,this.isInner=!0,this.isOver=!1}}else this.isOver||(this.resetStyleWhenOver(),this.deactivateTrasponder(),this.isUnder=!1,this.isInner=!1,this.isOver=!0);this.prevScroll=t,this.firstTime=!1}};var fp=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},gp=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},bp=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var hi=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),yp=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},vp=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,Sp=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),wp=(e,t)=>{let r=e.find(l=>[...l].some(p=>!Number.isNaN(Number.parseFloat(p)))),o=Lu(r);if(r&&!o)return fp(),hi();if(r&&o===d.VH&&t===d.DIRECTION_HORIZONTAL)return gp(),hi();if(r&&o===d.VW&&t===d.DIRECTION_VERTICAL)return bp(),hi();let n=[d.PLUS_HEIGHT,d.PLUS_HEIGHT_HALF,d.PLUS_WIDTH,d.PLUS_WIDTH_HALF,d.MINUS_HEIGHT,d.MINUS_HEIGHT_HALF,d.MINUS_WIDTH,d.MINUS_WIDTH_HALF],s=e.find(l=>ni(n,l)),i=[d.POSITION_BOTTOM,d.POSITION_TOP,d.POSITION_LEFT,d.POSITION_RIGHT],a=e.find(l=>ni(i,l));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??d.POSITION_BOTTOM}},Tp=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:l}=wp(n,r),u=String(s).charAt(0)==="-"?-1:1,h=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===d.PX?{value:h*u,additionalVal:a,position:Pn(l)}:{value:e*h*u,additionalVal:a,position:Pn(l)}},xp=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:l,unitMisure:p,additionalVal:u,position:m}=wp(a,s),f=String(l).charAt(0)==="-"?-1:1,y=Number.parseFloat(String(l).replaceAll(/^\D+/g,""))??0,w=Pn(m),x=w===d.POSITION_TOP||w===d.POSITION_LEFT;return p===d.PX?{value:yp(n?{invert:!0,endValInNumber:y,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:x}:{invert:!1,endValInNumber:y,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:x}),additionalVal:u,position:w}:{value:vp(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:y,isNegative:f,startPoint:r,isFromTopLeft:x}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:y,isNegative:f,startPoint:r,isFromTopLeft:x}),additionalVal:u,position:w}},mi=(e,t,r,o)=>{let n=String(t);return fe(n,d.PLUS_HEIGHT_HALF)?e+r/2:fe(n,d.PLUS_HEIGHT)?e+r:fe(n,d.PLUS_WIDTH_HALF)?e+o/2:fe(n,d.PLUS_WIDTH)?e+o:fe(n,d.MINUS_HEIGHT_HALF)?e-r/2:fe(n,d.MINUS_HEIGHT)?e-r:fe(n,d.MINUS_WIDTH_HALF)?e-o/2:fe(n,d.MINUS_WIDTH)?e-o:e},Cp=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case d.IN_STOP:return!t&&r>0||t&&r<0?0:r;case d.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case d.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case d.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Ip=(e,t)=>{switch(e){case d.PROP_OPACITY:return 1-t;default:return-t}};var qt=class{constructor(t){this.isInzialized=!1,this.firstScroll=!1,this.willChangeIsActive=!1,this.offset=0,this.screenPosition=0,this.endValue=0,this.height=0,this.width=0,this.scrollerScroll=0,this.scrollerHeight=0,this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.gap=150,this.numericRange=0,this.unsubscribeResize=()=>{},this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeScrollEnd=()=>{},this.unsubscribeMarker=()=>{},this.startMarker=void 0,this.endMarker=void 0,this.lastValue=void 0,this.prevFixedRawValue=0,this.fixedShouldRender=!1,this.prevFixedClamp=void 0,this.firstTime=!0,this.isInViewport=!1,this.iSControlledFromOutside=!1,this.force3D=!1,this.pinInstance=void 0,this.unitMisure="",this.startPoint=0,this.endPoint=0,this.unsubscribeMotion=()=>{},this.unsubscribeOnComplete=()=>{},this.pin=te(t?.pin,"Scrolltrigger pin propierties error:",!1),this.animatePin=te(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.forceTranspond=te(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.anticipatePinOnLoad=te(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.start=Mn(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.end=Mn(t?.end,"Scrolltrigger end propierties error:","top"),this.fromTo=te(t?.fromTo,"Scrolltrigger fromTo propierties error:",!1),this.invertSide=te(t?.invertSide,"Scrolltrigger invertSide propierties error:",!1),this.marker=Mn(t?.marker,"Scrolltrigger marker propierties error:",null),this.dynamicStart=t?.dynamicStart?ui(t.dynamicStart,"dynamicStart"):null,this.dynamicEnd=t?.dynamicEnd?ui(t.dynamicEnd,"dynamicEnd"):null,this.dynamicRange=Qu(t?.dynamicRange),this.animateAtStart=te(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.onEnter=Bt(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.onEnterBack=Bt(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.onLeave=Bt(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.onLeaveBack=Bt(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.onTickCallback=Bt(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.align=tp(t?.align),this.onSwitch=rp(t?.onSwitch),this.reverse=te(t?.reverse,"Parallax reverse propierties error:",!1),this.opacityStart=pi(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.opacityEnd=pi(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.limiterOff=te(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.useWillChange=t?.useWillChange,this.tween=ep(t?.tween);let r=this.tween?.getType&&this.tween.getType()===d.TWEEN_TIMELINE,o=this.tween?.getType&&this.tween.getType()===d.TWEEN_TWEEN;this.item=Br(t?.item,!1),this.scroller=Br(t?.scroller,!0),this.screen=Br(t?.screen,!0),this.trigger=ci(t?.trigger),this.applyTo=ci(t?.applyTo),this.direction=xo(t?.direction,"Parallax/Scrolltrigger"),this.disableForce3D=te(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.useThrottle=te(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.type=op(t?.type),this.range=np(t?.range,this.type),this.perspective=ft(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.breakpoint=ir(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.queryType=ar(t?.queryType,"queryType","parallax/scrolltrigger"),this.propierties=sp(t?.propierties,this.type,o,r),this.ease=te(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),this.easeType=ip(t?.easeType,r,this.type===d.TYPE_SCROLLTRIGGER),this.springConfig=ap(t?.springConfig,this.type),this.lerpConfig=lp(t?.lerpConfig,this.type),this.motionParameters=this.easeType===d.EASE_SPRING?{configProp:{precision:d.EASE_PRECISION}}:{precision:d.EASE_PRECISION},this.motion=(r&&(this.easeType=d.EASE_LERP,this.motionParameters={precision:d.EASE_PRECISION}),this.easeType===d.EASE_SPRING?new at:new Rt)}init(){if(this.isInzialized){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.isInzialized=!0,this.setMotion(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.setPerspective(),this.propierties===d.PROP_TWEEN&&(this.range=this?.tween?.getDuration?this.tween.getDuration():0,this.dynamicRange=()=>this.range,this.tween?.inzializeStagger?.()),this.type==d.TYPE_SCROLLTRIGGER&&(this.limiterOff=!0,this.calcRangeAndUnitMiusure(),this.calcFixedLimit());let t=r=>{if(this.pin)return this.unsubscribeScroll=c.useScrollImmediate(r),c.useScrollImmediate;this.ease&&this.useThrottle?(this.unsubscribeScroll=c.useScrollThrottle(r),c.useScrollThrottle):(this.unsubscribeScroll=c.useScroll(r),c.useScroll)};this.ease?(this.unsubscribeScrollStart=c.useScrollStart(()=>{this.firstScroll=!0,this.disableForce3D||(this.force3D=!0)}),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{c.useFrame(()=>{c.useNextTick(()=>{this.smoothParallaxJs()})})}),this.scroller===window&&t(()=>{!c.getShouldRender()&&!this.firstScroll||(this.firstScroll=!1,this.smoothParallaxJs())}),this.smoothParallaxJs()):(this.scroller===window&&t(()=>{this.computeValue(),this.noEasingRender()}),this.computeValue(),this.noEasingRender(),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{this.noEasingRender({forceRender:!0})})),this.scroller!==window&&this.marker&&(this.unsubscribeMarker=c.useScroll(()=>{this.calcFixedLimit()})),this.unsubscribeResize=c.useResize(({horizontalResize:r})=>{r&&this.refresh()}),this.pin&&(this.pinInstance=new zn,oe[this.queryType](this.breakpoint)&&c.useNextTick(()=>{this.getScrollerOffset(),this.pinInstance?.init({instance:this}),this.pinInstance?.onScroll(this.scrollerScroll)}))}setScroller(t){this.scroller=Br(t,!0)}setScreen(t){this.screen=Br(t,!0)}setDirection(t){this.direction=xo(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.breakpoint=ir(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.queryType=ar(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.perspective&&this.item&&this.item.parentNode){let t={perspective:`${this.perspective}px`,"transform-style":"preserve-3d"},r=this.item.parentNode;Object.assign(r.style,t)}}setMotion(){let t=d.PROP_SCALE||d.PROP_SCALE_X||d.PROP_SCALE_Y||d.PROP_OPACITY?1:0;switch(this.motion.setData({val:t}),this.unsubscribeMotion=this.motion.subscribe(({val:r})=>{r!==this.lastValue&&(this.propierties===d.PROP_TWEEN&&this.tween?.draw?(this.tween.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.lastValue=r,this.firstTime=!1):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!0})}))}),this.unsubscribeOnComplete=this.motion.onComplete(({val:r})=>{this.force3D=!1,this.propierties===d.PROP_TWEEN&&this.tween?.draw?this.tween.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!1})})}),this.easeType){case d.EASE_LERP:{this.lerpConfig&&this.motion.updateVelocity(this.lerpConfig);break}case d.EASE_SPRING:{this.springConfig&&this.motion.updateConfig(this.springConfig);break}}}calcRangeAndUnitMiusure(){if(this.dynamicRange){let t=this.dynamicRange();this.numericRange=Number.isNaN(t)?0:Number.parseFloat(t),this.unitMisure=d.PX}else{let t=String(this.range),o=t.charAt(0)==="-"?-1:1,n=cp(t,this.propierties);this.numericRange=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.unitMisure=Fu(n)}}calcFixedLimit(){let t=this.scrollerHeight/100;if(this.dynamicStart&&this.dynamicStart?.position&&this.dynamicStart?.value?.()){let{position:p,value:u}=this.dynamicStart,m=u();Number.isNaN(m)||(this.start=`${p} ${m}px`)}let{value:r,additionalVal:o,position:n}=Tp(t,this.start,this.direction);if(this.invertSide=n===d.POSITION_TOP||n===d.POSITION_LEFT,this.startPoint=mi(r,o,this.direction===d.DIRECTION_VERTICAL?this.height:this.width,this.direction===d.DIRECTION_VERTICAL?this.width:this.height),this.dynamicEnd&&this.dynamicEnd?.position&&this.dynamicEnd?.value?.()){let{position:p,value:u}=this.dynamicEnd,m=u();Number.isNaN(m)||(this.end=`${p} ${m}px`)}let{value:s,additionalVal:i,position:a}=xp(t,this.end,this.startPoint,this.scrollerHeight,this.invertSide,this.direction),l=this.invertSide?a===d.POSITION_BOTTOM||a===d.POSITION_RIGHT?-1:1:a===d.POSITION_BOTTOM||a===d.POSITION_RIGHT?1:-1;this.endPoint=mi(s,i,this.direction===d.DIRECTION_VERTICAL?this.height*l:this.width*l,this.direction===d.DIRECTION_VERTICAL?this.width*l:this.height*l),this.setMarker(),this.invertSide&&(this.startPoint-=this.height)}setMarker(){if(this.marker){let{startMarker:t,endMarker:r}=mp({startMarker:this.startMarker,endMarker:this.endMarker,startPoint:this.startPoint,endPoint:this.endPoint,screen:this.screen,direction:this.direction,invertSide:this.invertSide,label:this.marker});this.startMarker=t,this.endMarker=r}}calcOffset(){let t=this.trigger===null?this.item:this.trigger;if(!t)return;let r=0,o=0,n=0;this.trigger&&(r=mr(this.trigger).x,o=mr(this.trigger).y,n=mr(this.trigger).z),t.style.transform="",this.direction===d.DIRECTION_VERTICAL?this.offset=this.scroller===window?Math.trunc(ie(t).top):Math.trunc(ie(t).top)-ie(this.scroller).top:this.offset=this.scroller===window?Math.trunc(ie(t).left):Math.trunc(ie(t).left)-ie(this.scroller).left,this.screen!==window&&(this.direction===d.DIRECTION_VERTICAL?this.offset-=Math.trunc(ie(this.screen).top):this.offset-=Math.trunc(Ye(this.screen).left)),this.trigger&&(r!==0||o!==0||n!==0)&&(this.trigger.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}calcScreenPosition(){this.screen!==window&&(this.screenPosition=this.direction===d.DIRECTION_VERTICAL?Number.parseInt(ie(this.screen).top):Number.parseInt(Ye(this.screen).left))}calcHeight(){let t=this.trigger===null?this.item:this.trigger;t&&(this.height=this.direction===d.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}calcWidth(){let t=this.trigger===null?this.item:this.trigger;t&&(this.width=this.direction===d.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}getScrollerOffset(){this.scroller===window?this.scrollerScroll=this.direction===d.DIRECTION_VERTICAL?this.scroller.scrollY:this.scroller.scrollX:this.scrollerScroll=this.direction===d.DIRECTION_VERTICAL?-ie(this.scroller).top:-ie(this.scroller).left}getScreenHeight(){this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.screen===window?this.scrollerHeight=this.direction===d.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.scrollerHeight=this.direction===d.DIRECTION_VERTICAL?Math.trunc(this.screen.offsetHeight):Math.trunc(this.screen.offsetWidth)}refresh(){this.pin&&this.pinInstance&&this.pinInstance.destroy(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.type==d.TYPE_SCROLLTRIGGER&&(this.calcFixedLimit(),this.dynamicRange&&this.calcRangeAndUnitMiusure(),this.pin&&this.pinInstance&&oe[this.queryType](this.breakpoint)&&this.pinInstance.init({instance:this})),this.lastValue=void 0,this.firstTime=!0,this.firstScroll=!1,oe[this.queryType](this.breakpoint)?this.ease?this.smoothParallaxJs():(this.computeValue(),this.noEasingRender({forceRender:!0})):(this.ease&&this.motion?.stop?.(),c.useFrameIndex(()=>{this.applyTo?(this.resetTweenStyle(this.applyTo),Object.assign(this.applyTo.style,this.getResetStyle())):(this.resetTweenStyle(this.item),this.item&&Object.assign(this.item.style,this.getResetStyle()))},3))}move({value:t,parentIsMoving:r=!1}){if(!oe[this.queryType](this.breakpoint)||!t)return;this.iSControlledFromOutside=!0;let o=this.getScrollValueOnMove(t);if(this.ease)this.smoothParallaxJs(o);else{this.computeValue(o);let n=this.isInViewport||this.firstTime||void 0;this.noEasingRender({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.ease&&(this.firstScroll=!0,this.disableForce3D||(this.force3D=!0))}triggerScrollEnd(){this.ease||this.noEasingRender({forceRender:!0})}getScrollValueOnMove(t){if(t!==void 0)return this.screen!==window?t+this.screenPosition:t}stopMotion(){this.motion?.stop?.()}smoothParallaxJs(t){if(!oe[this.queryType](this.breakpoint)||(this.computeValue(t),!this.fixedShouldRender&&!this.firstTime&&this.type===d.TYPE_SCROLLTRIGGER)||!this.isInViewport&&!this.firstTime&&this.type===d.TYPE_PARALLAX)return;let r=this.firstTime&&!this.animateAtStart?"set":"goTo";this.motion&&this.motion[r]({val:this.endValue},this.motionParameters).catch(()=>{})}computeValue(t){if(!oe[this.queryType](this.breakpoint)||(t?this.scrollerScroll=-t:this.getScrollerOffset(),this.isInViewport=Sp({offset:this.offset,height:this.height,gap:this.gap,wScrollTop:this.scrollerScroll,wHeight:this.scrollerHeight}),!this.isInViewport&&!this.limiterOff&&this.type===d.TYPE_PARALLAX))return;switch(this.pin&&this.pinInstance&&this.pinInstance.onScroll(this.scrollerScroll),this.type){case d.TYPE_SCROLLTRIGGER:{this.endValue=pe(this.getFixedValue());break}default:switch(this.propierties){case d.PROP_OPACITY:{this.endValue=pe(this.getOpacityValue());break}default:{this.endValue=Number.isNaN(Number.parseInt(this.align))?pe(this.getIsNaNValue()/2):pe(this.getIsANumberValue()/2);break}}}let r=this.reverse&&this.type!==d.TYPE_SCROLLTRIGGER?Ip(this.propierties,this.endValue):this.endValue;this.endValue=this.type===d.TYPE_SCROLLTRIGGER?r:this.getSwitchAfterZeroValue(r)}noEasingRender({forceRender:t=!1,parentIsMoving:r=!1}={}){oe[this.queryType](this.breakpoint)&&c.useFrame(()=>{this.cleanRender({forceRender:t,parentIsMoving:r})})}cleanRender({forceRender:t=!1,parentIsMoving:r=!1}={}){this.endValue===this.lastValue&&!t||!this.isInViewport&&!t||(!this.disableForce3D&&!this.iSControlledFromOutside&&(this.force3D=!t),!this.disableForce3D&&this.iSControlledFromOutside&&(this.force3D=r&&this.isInViewport),this.propierties===d.PROP_TWEEN?(this.tween.draw({partial:this.endValue,isLastDraw:!this.force3D,useFrame:!1}),this.lastValue=this.endValue,this.firstTime=!1):this.updateStyle(this.endValue),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:this.endValue,parentIsMoving:this.force3D})}))}updateStyle(t){this.applyTo?Object.assign(this.applyTo.style,this.getStyle(t)):this.item&&Object.assign(this.item.style,this.getStyle(t)),this.lastValue=t,this.firstTime=!1}getFixedValue(){let t=this.invertSide?-(this.scrollerScroll+this.startPoint+this.endPoint-(this.offset+this.endPoint)):-(this.scrollerScroll+this.scrollerHeight-this.startPoint-(this.offset+this.endPoint)),r=this.endPoint/100*this.numericRange,o=t/100*this.numericRange,n=this.fromTo?this.invertSide?r-o:o:this.invertSide?o:r-o,s=r>0?-Oe(n,0,r):-Oe(n,r,0);if(this.fixedShouldRender=this.prevFixedClamp!==s,this.prevFixedClamp=s,!this.fixedShouldRender&&!this.firstTime)return this.endValue;let i=s*100/this.endPoint;switch((this.onEnter||this.onEnterBack||this.onLeave||this.onLeaveBack)&&hp({prevValue:this.prevFixedRawValue,value:n,maxVal:r,onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack}),this.prevFixedRawValue=n,this.propierties){case d.PROP_HORIZONTAL:case d.PROP_VERTICAL:return this.getHVval(i);case d.PROP_SCALE:case d.PROP_SCALE_X:case d.PROP_SCALE_Y:case d.PROP_OPACITY:return 1-i;default:return-i}}getHVval(t){switch(this.unitMisure){case d.VW:return this.windowInnerWidth/100*-t;case d.VH:return this.windowInnerHeight/100*-t;case d.WPERCENT:return this.direction===d.DIRECTION_VERTICAL?this.width/100*-t:this.height/100*-t;case d.HPERCENT:return this.direction===d.DIRECTION_VERTICAL?this.height/100*-t:this.width/100*-t;default:return-t}}getOpacityValue(){let t=this.scrollerHeight/100*this.opacityEnd,r=this.scrollerHeight-this.scrollerHeight/100*this.opacityStart,o=this.align==d.ALIGN_START?-this.scrollerScroll*-1:(this.scrollerScroll+t-this.offset)*-1,n=this.align==d.ALIGN_START?1-o/this.offset:1-o/(this.scrollerHeight-r-t);return Oe(n,0,1)}getIsNaNValue(){let t=Number(this.range)??0,r=this.direction===d.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.align){case d.ALIGN_START:return this.scrollerScroll/t;case d.ALIGN_TOP:case d.ALIGN_LEFT:return(this.scrollerScroll-this.offset)/t;case d.ALIGN_CENTER:return(this.scrollerScroll+(this.scrollerHeight/2-this.height/2)-this.offset)/t;case d.ALIGN_BOTTOM:case d.ALIGN_RIGHT:return(this.scrollerScroll+(this.scrollerHeight-this.height)-this.offset)/t;case d.ALIGN_END:return-(r-(this.scrollerScroll+this.scrollerHeight))/t;default:return 0}}getIsANumberValue(){let t=Number(this.align),r=Number(this.range);return(this.scrollerScroll+this.scrollerHeight/100*t-this.offset)/r}getSwitchAfterZeroValue(t){return Cp({switchPropierties:this.onSwitch,isReverse:this.reverse,value:t})}getStyle(t){let r=this.force3D?"translate3D(0px, 0px, 0px)":"";this.willChangeIsActive=this.useWillChange?c.mustMakeSomething():!1;let o=this.willChangeIsActive&&this.force3D?"transform":"",n=c.shouldMakeSomething()?Math.round(t):t;switch(this.propierties){case d.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case d.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case d.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case d.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case d.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case d.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case d.PROP_OPACITY:return{opacity:`${t}`};case d.PROP_SCALE:{let s=this.type===d.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case d.PROP_SCALE_X:{let s=this.type===d.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case d.PROP_SCALE_Y:{let s=this.type===d.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.propierties.toLowerCase()]:`${t}px`}}}resetTweenStyle(t){this.tween&&(t.style="")}getResetStyle(){switch(this.propierties){case d.PROP_VERTICAL:case d.PROP_HORIZONTAL:case d.PROP_ROTATE:case d.PROP_ROTATEY:case d.PROP_ROTATEX:case d.PROP_ROTATEZ:case d.PROP_SCALE:return{transform:""};case d.PROP_OPACITY:return{opacity:""};default:return{[this.propierties.toLowerCase()]:""}}}destroy(){this.motion?.stop?.(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.unsubscribeScrollEnd(),this.unsubscribeResize(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.unsubscribeMarker(),this.motion?.destroy?.(),this.dynamicRange=()=>{},this.onEnter=()=>{},this.onEnterBack=()=>{},this.onLeave=()=>{},this.onLeaveBack=()=>{},this.onTickCallback=()=>{},this.pin&&this.pinInstance&&this.pinInstance?.destroy?.(),this.startMarker&&this.startMarker?.remove?.(),this.endMarker&&this.endMarker?.remove?.(),this.motion=null,this.startMarker=void 0,this.endMarker=void 0,this.pinInstance=null,this.endValue=0;let t=this.applyTo??this.item;t&&"style"in t&&(t.style=""),this.item=null,this.scroller=null,this.screen=null,this.trigger=null,this.applyTo=null}};var ko={END:"END",START:"START",CENTER:"CENTER"};var kf=e=>{switch(e){case ko.END:return"align-items:flex-end;";case ko.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Ep=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:l,columnHeight:p,columnWidth:u,columnAlign:m})=>{let h=oe.getBreackpoint(r),f="user-select:none",T=l?"relative":"absolute",y=l?"position:sticky;top:0;":"",w=kf(m),x=u?`width:${u}vw;`:"",C=`
      @media (${t}-width:${h}px){${o}{position:relative;${f}}}@media (${t}-width:${h}px){${n}{z-index:10;position:${T};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${h}px){${s}{--sectionheight:${p}vh}}@media (${t}-width:${h}px){${s}{display:flex;height:100vh;${y}${w}}}@media (${t}-width:${h}px){${i}{height:var(--sectionheight);flex:0 0 auto;${x}}}.${a}{display:none}@media (${t}-width:${h}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${h}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,P=document.createElement("div");P.classList.add("scroller-style");let M=document.createElement("style");M.append(document.createTextNode(C)),P.append(M),e.prepend(P)};var Ro=class{constructor(t={}){if(this.propsisValid=!0,this.triggerTopPosition=0,this.touchActive=!1,this.lastTouchValueX=0,this.dragSecureAreaBottom=100,this.dragSecureAreaTop=100,this.shouldDragValue=!1,this.button=[],this.scrollValue=0,this.unsubscribeScroll=()=>{},this.useDrag=te(t?.useDrag,"HorizontalScroller: useDrag",!1),this.threshold=ft(t?.threshold,"HorizontalScroller: threshold",30),this.useWillChange=te(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.breakpoint=ir(t?.breakpoint,"breakpoint","horizontalScroller"),this.queryType=ar(t?.queryType,"queryType","horizontalScroller"),this.forceTranspond=te(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.addCss=te(t?.addCss,"HorizontalScroller: addCss",!0),this.animateAtStart=te(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.ease=te(t?.ease,"HorizontalScroller: ease",!1),this.easeType=Dn(t?.easeType,"HorizontalScroller"),this.useSticky=te(t?.useSticky,"HorizontalScroller: useSticky",!1),this.animatePin=te(t?.animatePin,"HorizontalScroller: animatePin",!1),this.reverse=te(t?.reverse,"HorizontalScroller: reverse",!1),this.useThrottle=te(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.columnHeight=ft(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.columnWidth=ft(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.columnAlign=t?.columnAlign?t.columnAlign.toUpperCase():ko.START,this.onEnter=Be(t?.onEnter,"HorizontalScroller: onEnter",de),this.onEnterBack=Be(t?.onEnterBack,"HorizontalScroller: onEnterBack",de),this.onLeave=Be(t?.onLeave,"HorizontalScroller: onLeave",de),this.onLeaveBack=Be(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",de),this.afterInit=Be(t?.afterInit,"HorizontalScroller: afterInit",de),this.afterRefresh=Be(t?.afterRefresh,"HorizontalScroller: afterRefresh",de),this.afterDestroy=Be(t?.afterDestroy,"HorizontalScroller: afterDestroy",de),this.onTick=Be(t?.onTick,"HorizontalScroller: onTick",null),this.mainContainer=document.querySelector(t.root),!this.mainContainer){this.propsisValid=!1,console.warn("horizontal custom: root node not found");return}if(this.container=t?.container,!this.mainContainer.querySelector(this.container)){this.propsisValid=!1,console.warn("horizontal custom: container node not found");return}if(this.trigger=this.mainContainer.querySelector(t.trigger),!this.trigger){this.propsisValid=!1,console.warn("horizontal custom: trigger node not found");return}if(this.row=this.mainContainer.querySelector(t.row),!this.row){this.propsisValid=!1,console.warn("horizontal custom: row node not found");return}if(this.column=this.mainContainer.querySelectorAll(t.column),this.column.length===0){this.propsisValid=!1,console.warn("horizontal custom: column nodeList not found");return}this.shadow=this.mainContainer.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.shadowMainClassTransition=o.replace(".",""),this.button=this.row.querySelectorAll("a, button"),this.moduleisActive=!1,this.horizontalWidth=0,this.scrollTriggerInstance={},this.percentRange=0,this.children=t?.children||[],this.children.forEach(n=>{n.setScroller(this.row),n.setDirection("horizontal"),n.setBreakPoint(this.breakpoint),n.setQueryType(this.queryType),n.init()}),this.addCss&&Ep({mainContainer:this.mainContainer,queryType:this.queryType,breakpoint:this.breakpoint,container:this.container,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.shadowMainClassTransition,useSticky:this.useSticky,columnHeight:this.columnHeight,columnWidth:this.columnWidth,columnAlign:this.columnAlign}),this.onMouseMove=n=>{if(!this.touchActive)return;let{movementX:s}=n,i=this.reverse?s:-s;this.onDrag(i),this.touchStart=!1},this.onMouseDown=()=>{oe[this.queryType](this.breakpoint)&&(this.shouldDragValue&&(this.row.style.cursor="move"),this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onMouseUp=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onMouseLeave=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onTouchStart=n=>{oe[this.queryType](this.breakpoint)&&(this.lastTouchValueX=-n.touches[0].clientX,this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onTouchEnd=()=>{this.touchActive=!1},this.onTouchMove=n=>{let s=-n.touches[0].clientX,i=this.reverse?-s+this.lastTouchValueX:s-this.lastTouchValueX;this.onDrag(i),this.lastTouchValueX=s,this.shouldDragValue&&n.cancelable&&n.preventDefault()},this.preventFireClick=n=>{Math.abs(this.scrollValue-this.firstTouchValue)>this.threshold&&n.preventDefault()}}init(){this.propsisValid&&jn(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.useDrag&&this.addDragListener(),c.useResize(({horizontalResize:t})=>this.onResize(t)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)})}setLinkAttribute(){[...this.button].forEach(t=>t.setAttribute("draggable",!1))}removeLinkAttribute(){[...this.button].forEach(t=>t.removeAttribute("draggable"))}onDrag(t){this.shouldDragValue&&c.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}shouldDrag(){let t=window.scrollY;this.shouldDragValue=this.triggerTopPosition-this.dragSecureAreaTop<t&&this.triggerTopPosition+this.dragSecureAreaBottom+this.horizontalWidth>t+window.innerHeight}addDragListener(){this.unsubscribeScroll=c.useScroll(()=>this.shouldDrag()),this.shouldDrag(),this.row.addEventListener("click",this.preventFireClick,{passive:!1}),this.row.addEventListener("mousedown",this.onMouseDown,{passive:!0}),this.row.addEventListener("mouseup",this.onMouseUp,{passive:!0}),this.row.addEventListener("mouseleave",this.onMouseLeave,{passive:!0}),this.row.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.row.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.row.addEventListener("mousemove",this.onMouseMove,{passive:!0}),this.row.addEventListener("touchmove",this.onTouchMove,{passive:!0})}removeDragListener(){this.unsubscribeScroll(),this.row.removeEventListener("click",this.preventFireClick),this.row.removeEventListener("mousedown",this.onMouseDown),this.row.removeEventListener("mouseup",this.onMouseUp),this.row.removeEventListener("mouseleave",this.onMouseLeave),this.row.removeEventListener("touchstart",this.onTouchStart),this.row.removeEventListener("touchend",this.onTouchEnd),this.row.removeEventListener("mousemove",this.onMouseMove),this.row.removeEventListener("touchmove",this.onTouchMove)}setDimension(){return!this.trigger||!this.mainContainer||!this.row?new Promise(t=>{t()}):new Promise(t=>{c.useFrame(()=>{let r=this.horizontalWidth;this.percentRange=100*(r-window.innerWidth)/r,r>0&&(this.trigger.style.height=`${r}px`,this.mainContainer.style.height=`${r}px`,this.row.style.width=`${r}px`),t()})})}getWidth(){return new Promise(t=>{c.useFrame(()=>{if(!oe[this.queryType](this.breakpoint)){t();return}this.horizontalWidth=[...this.column].map(r=>ot(r)).reduce((r,o)=>r+o,0),t()})})}createShadow(){return this.trigger?new Promise(t=>{c.useFrame(()=>{if(!oe[this.queryType](this.breakpoint)){t();return}let r=[...this.shadow].map(o=>{let n=o.dataset.shadow,s=o.dataset.debug?"debug":"",i=o.dataset.debug?`left left : ${n}`:"",a=o.dataset.debug?`in center : ${n}`:"",l=o.dataset.debug?`center out : ${n}`:"",p=o.dataset.debug?`in out : ${n}`:"";return`
                            <div class='${this.shadowMainClassTransition} ${this.shadowMainClassTransition}--${n}' data-shadow='${n}'>
                                <span class="${this.shadowMainClassTransition}--in-center ${s}">
                                    ${a}
                                </span>
                                <span class="${this.shadowMainClassTransition}--out-center ${s}">
                                    ${l}
                                </span>
                                <span class="${this.shadowMainClassTransition}--left ${s}">
                                    ${i}
                                </span>
                                <span class="${this.shadowMainClassTransition}--end ${s}">
                                    ${p}
                                </span>
                            </div>`}).join("");this.trigger.innerHTML=r,t()})}):new Promise(t=>{t()})}removeShadow(){this.trigger&&(this.trigger.innerHTML="")}updateShadow(){return new Promise(t=>{if(!oe[this.queryType](this.breakpoint)){t();return}c.useFrame(()=>{[...this.shadow].forEach(r=>{let o=this.percentRange/100,n=r.dataset.shadow,s=ot(r),i=Se(this.row),{x:a}=mr(this.row),l=this.reverse?this.horizontalWidth-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,p=window.innerWidth/window.innerHeight,u=window.innerWidth-window.innerHeight,m=l/p,h=l-l/p,f=this.mainContainer.querySelector(`.${this.shadowMainClassTransition}[data-shadow="${n}"]`),T=f.querySelector(`.${this.shadowMainClassTransition}--in-center`),y=f.querySelector(`.${this.shadowMainClassTransition}--out-center`),w=f.querySelector(`.${this.shadowMainClassTransition}--left`),x=f.querySelector(`.${this.shadowMainClassTransition}--end`),C=window.innerWidth>window.innerHeight?window.innerHeight:0,P=window.innerWidth>window.innerHeight?window.innerHeight/2:0,M=(()=>{switch(l){case 0:return 0;default:return m+h/o-u/o}})(),_=(()=>{let q=window.innerWidth>window.innerHeight?u/o:u/o+window.innerWidth/p;switch(l){case 0:return 0;default:return q}})(),k=(()=>{let q=s/p,W=(s-s/p)/o;return q+W+_})(),V=k/2+P;this.useSticky&&(this.trigger.style["margin-top"]=`-${i}px`),f.style.top=`${M}px`,T.style.height=`${V}px`,y.style.height=`${V}px`,y.style.top=`${V}px`,w.style.height=`${_}px`,x.style.height=`${k+C}px`,f.style.height=`${_}px`}),t()})})}initScroller(){if(!this.trigger||!oe[this.queryType](this.breakpoint))return;let t=new qt({type:"scrolltrigger",item:this.row,useWillChange:this.useWillChange,trigger:this.trigger,propierties:"x",breakpoint:"xSmall",pin:!this.useSticky,animatePin:this.animatePin,ease:this.ease,forceTranspond:this.forceTranspond,useThrottle:this.useThrottle,easeType:this.easeType,springConfig:"scroller",animateAtStart:this.animateAtStart,fromTo:this.reverse,dynamicRange:()=>-(this.horizontalWidth-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.horizontalWidth},onTick:({value:r,parentIsMoving:o})=>{let n=Math.abs(-Number.parseInt(r*100/(this.horizontalWidth-window.innerWidth)));this.scrollValue=r,this.onTick&&this.onTick({value:r,parentIsMoving:o,percent:this.reverse?100-n:n}),this.children.forEach(s=>{s.move({value:r,parentIsMoving:o})})},onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack});t.init(),this.moduleisActive=!0,this.scrollTriggerInstance=t,this.triggerTopPosition=ie(this.trigger).top,this.setLinkAttribute()}createScroller(){jn(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.refreshChildren()})}refreshChildren(){c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterRefresh?.(),this.children.forEach(t=>{t?.refresh?.()})})},3)}refresh(){if(!(!this.moduleisActive||!oe[this.queryType](this.breakpoint)))return new Promise(t=>{jn(this.getWidth.bind(this),this.setDimension.bind(this),this.updateShadow.bind(this))().then(()=>{this.scrollTriggerInstance?.stopMotion?.(),this.triggerTopPosition=ie(this.trigger).top,this.moduleisActive&&(this.scrollTriggerInstance?.refresh?.(),this.refreshChildren()),t()})})}killScroller({destroyAll:t=!1}){(this.moduleisActive||t)&&(this.scrollTriggerInstance?.destroy?.(),this.scrollTriggerInstance=null,this.trigger&&(this.trigger.style.height=""),this.mainContainer&&(this.mainContainer.style.height=""),this.trigger&&(this.trigger.style.marginTop=""),this.removeShadow(),this.removeLinkAttribute(),this.moduleisActive=!1,c.useFrameIndex(()=>{if(this.row.style="",t&&this.mainContainer){this.useDrag&&this.removeDragListener();let r=this.mainContainer.querySelector(".scroller-style");r&&r.remove(),this.mainContainer=null,this.trigger=null,this.row=[],this.column=[],this.shadow=[],this.afterInit=null,this.afterRefresh=null,this.onTick=null,this.onEnter=null,this.onEnterBack=null,this.onLeave=null,this.onLeaveBack=null,this.scrollTriggerInstance=null,this.moduleisActive=!1,this.button=[],this.mainContainer=null,this.container=null,this.trigger=null,this.row=null,c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=null,this.children.forEach(o=>{o?.destroy?.(),o=null}),this.children=[]})}},3))}onResize(t){this.moduleisActive&&oe[this.queryType](this.breakpoint)?t&&this.refresh():!this.moduleisActive&&oe[this.queryType](this.breakpoint)?this.createScroller():this.moduleisActive&&!oe[this.queryType](this.breakpoint)&&this.killScroller({destroyAll:!1})}destroy(){this.killScroller({destroyAll:!0})}};var kp=({screen:e,scroller:t,scrollbar:r})=>{let o=new Ht({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"xSmall",onTick:({percent:n})=>{r.value=n}});return o.init(),{updateScroller:()=>{let n=Se(t),s=Se(e),i=ot(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o.refresh()},move:n=>o.move(n),goToTop:()=>o.set(0)}};var Rp=`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Generator: Gravit.io --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 466.726 466.722" width="466.726pt" height="466.722pt"><defs><clipPath id="_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA"><rect width="466.726" height="466.722"/></clipPath></defs><g clip-path="url(#_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA)"><path d=" M 64.164 0 C 28.918 0 0 28.918 0 64.164 L 0 306.614 C 0 341.86 28.918 370.778 64.164 370.778 L 306.614 370.778 C 341.86 370.778 370.778 341.86 370.778 306.614 L 370.778 64.164 C 370.778 28.918 341.86 0 306.614 0 L 64.164 0 Z  M 64.164 34.969 L 306.614 34.969 C 323.075 34.969 335.723 47.703 335.723 64.164 L 335.723 306.614 C 335.723 323.075 323.075 335.723 306.614 335.723 L 64.164 335.723 C 47.703 335.723 34.969 323.075 34.969 306.614 L 34.969 64.164 C 34.969 47.703 47.703 34.969 64.164 34.969 Z " fill-rule="evenodd" /><path d=" M 353.214 95.945 C 348.577 95.949 344.132 97.793 340.855 101.07 C 337.578 104.347 335.734 108.793 335.73 113.429 C 335.734 118.062 337.578 122.507 340.855 125.784 C 344.132 129.061 348.578 130.905 353.214 130.913 L 402.566 130.913 C 418.882 130.913 431.675 143.792 431.675 160.108 L 431.675 402.558 C 431.675 418.874 418.882 431.667 402.566 431.667 L 160.116 431.667 C 143.8 431.667 130.921 418.874 130.921 402.558 L 130.917 353.292 C 130.937 348.643 129.105 344.175 125.823 340.878 C 122.542 337.581 118.085 335.726 113.432 335.722 C 108.78 335.726 104.323 337.581 101.045 340.878 C 97.764 344.175 95.928 348.643 95.948 353.292 L 95.948 402.558 C 95.948 437.792 124.882 466.722 160.112 466.722 L 402.562 466.722 C 437.796 466.722 466.726 437.788 466.726 402.558 L 466.726 160.108 C 466.726 124.874 437.792 95.944 402.562 95.944 L 353.214 95.945 Z " /></g></svg>
`;var Pf=({getState:e})=>{let{rawContent:t}=e();navigator.clipboard.writeText(t)};function Af({sync:e,bindProps:t,setState:r,delegateEvents:o}){return g`
        <code-overlay-button
            ${e}
            ${t({bind:["currentButtonState"],props:({currentButtonState:n,_current:s})=>{let{label:i,source:a}=s;return{key:i,disable:!a||a.length===0,selected:i===n}}})}
            ${o({click:(n,{current:s})=>{let{label:i}=s;r("activeContent",i)}})}
        >
        </code-overlay-button>
    `}var _f=async({setState:e,getState:t,codeEl:r,currentKey:o,updateScroller:n,goToTop:s,syncParent:i})=>{let{urls:a}=t(),p=a.find(({label:m})=>m===o)?.source;if(!p?.length)return;let u=g`<html-content
        ${b({source:p,useMinHeight:!0})}
        ${i}
    ></html-content>`;r.insertAdjacentHTML("afterbegin",u),await ho(r),e("rawContent",r.textContent),n(),s()},Pp=({codeEl:e,removeDOM:t})=>{e.textContent="";let r=e.firstElementChild;r&&t(r)},Ap=({onMount:e,setState:t,getState:r,repeat:o,html:n,bindProps:s,delegateEvents:i,staticProps:a,computed:l,watch:p,removeDOM:u,syncParent:m})=>(e(({element:h,refs:f})=>{let{screenEl:T,scrollerEl:y,codeEl:w,scrollbar:x}=f,{updateScroller:C,move:P,goToTop:M}=kp({screen:T,scroller:y,scrollbar:x});x.addEventListener("input",()=>{P(x.value)}),O.watch("beforeRouteLeave",()=>{t("urls",[])}),l("currentButtonState",["urls","activeContent"],(k,V)=>(k.length>0?(h.classList.add("active"),document.body.style.overflow="hidden"):(h.classList.remove("active"),document.body.style.overflow="",Pp({codeEl:w,removeDOM:u}),t("activeContent",""),M()),V));let _=p("activeContent",k=>{Pp({codeEl:w,removeDOM:u}),_f({setState:t,getState:r,codeEl:w,currentKey:k,updateScroller:C,goToTop:M,staticProps:a,syncParent:m})});return()=>{_()}}),n`
        <div class="code-overlay js-overlay">
            <span
                class="code-overlay__background"
                ${i({click:()=>{t("urls",[])}})}
            ></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="code-overlay__close"
                    ${i({click:()=>{t("urls",[])}})}
                ></button>
                <button
                    type="button"
                    class="code-overlay__copy"
                    ${i({click:()=>{Pf({getState:r})}})}
                >
                    ${Rp}
                </button>
                <div class="code-overlay__header">
                    ${o({clean:!0,watch:"urls",render:({sync:h})=>Af({sync:h,bindProps:s,delegateEvents:i,setState:t})})}
                </div>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ref="scrollbar"
                    class="code-overlay__scrollbar"
                />
                <div class="code-overlay__content" ref="screenEl">
                    <div ref="scrollerEl">
                        <div
                            class="code-overlay__content__description"
                            ref="codeEl"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `);var _p=({onMount:e,watch:t,getState:r,html:o})=>{let{key:n,disable:s}=r();return e(({element:a})=>{let l=t("selected",p=>{a.classList.toggle("selected",p)});return()=>{l()}}),o`
        <button class="code-overlay__button ${s?"disable":""}">${n}</button>
    `};var Of=I({name:"code-overlay",component:Ap,isolateOnMount:!0,isolateCreation:!0,exportState:["urls","activeContent"],state:{urls:()=>({value:[],type:Array,skipEqual:!1}),activeContent:()=>({value:"",type:String,skipEqual:!0}),rawContent:()=>({value:"",type:String}),currentButtonState:()=>({value:String,type:"",skipEqual:!0})}}),Nf=I({name:"code-overlay-button",component:_p,exportState:["key","selected","disable"],state:{key:"",selected:()=>({value:!1,type:Boolean}),disable:()=>({value:!0,type:Boolean})}});var Op=({html:e,delegateEvents:t})=>e`
        <button
            type="button"
            class="c-btn-debug"
            ${t({click:()=>{O.debugStore(),console.log(O),console.log(H),console.log("bindEventMap",Rr),console.log("currentListValueMap",po),console.log("activeRepeatMap",_r),console.log("repeatMap",Or),console.log("onMountCallbackMap",uo),console.log("staticPropsMap",Kt),console.log("dynamicPropsMap",Ke),console.log("repeaterTargetComponent",Zt),console.log("eventDelegationMap",Mt),console.log("tempDelegateEventMap",kr)}})}
        >
            Debug
        </button>
    `;var Mf=I({name:"debug-button",component:Op});var re={setDefault(e){K.set(e)},getDefault(e){return K.get(e)},printDefault(){K.print()},mq(e,t){switch(e){case"min":return oe.min(t);case"max":return oe.max(t);case"get":return oe.getBreackpoint(t)}}};var Hn=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(c.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),c.useFrame(()=>{s.forEach(({cb:a})=>{c.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l)}),s.forEach(({cb:a,frame:l})=>{c.useCache.update({id:a,callBackObject:o,frame:l})})),r&&(e===0||t===!1?c.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l+1)}))};var Po=class{constructor(t){this.ease=Vu(t?.ease),this.duration=$t(t?.duration),this.stagger=tt(t),this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache=[],this.type="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Qe(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=rt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}}draw({partial:t,isLastDraw:r}){let o=()=>{this.values.forEach(s=>{let i=s.toIsFn?s.toFn():s.toValue,a=s.fromIsFn?s.fromFn():s.fromValue,l=i-a;s.currentValue=this.ease(t,a,l,this.duration),s.currentValue=pe(s.currentValue)});let n=ge(this.values,"currentValue");Hn({each:this.stagger.each,useStagger:!0,isLastDraw:r,callBackObject:n,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop})};c.useNextTick(()=>o())}setData(t){let r=Object.entries(t);return this.values=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1}}),this}mergeData(t){this.values=this.values.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=jt(t);return this.mergeData(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=s,()=>this.callbackCache=n(this.callbackCache)}getDuration(){return this.duration}getType(){return this.type}destroy(){this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Ao=class{constructor(){this.type="sequencer",this.children=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.children.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.children.push(t)}inzializeStagger(){this.children.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.children.forEach(r=>{r.setDuration(t)})}getDuration(){return this.children.length>0?this.children[0].getDuration():0}setStretchFactor(t){this.children.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.children.flatMap(t=>t.getLabels())}resetLastValue(){this.children.forEach(t=>t.resetLastValue())}disableStagger(){this.children.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.children.forEach(t=>{t.cleanCachedId()})}getType(){return this.type}destroy(){this.children.forEach(t=>{t.destroy()}),this.children=[]}};var Np=(e,t)=>Object.keys(e).map(r=>it(e[r])?{prop:r,toValue:e[r],ease:We(t)}:(kt(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:We(t)})),Mp=(e,t)=>Object.keys(e).map(r=>it(e[r])?{prop:r,fromValue:e[r],ease:We(t)}:(kt(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:We(t)})),Lp=(e,t,r)=>Object.keys(e).map(o=>!it(t[o])||!it(e[o])?(kt(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:We(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:We(r)});var fi={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"fromValue",set:"toValue"}},Fp=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:l})=>l&&a===r);return i&&n===null?i[fi[o].get]:n},null),Dp=(e,t,r,o)=>e.slice(t+1,e.length).reduce((n,{start:s,values:i})=>i.find(l=>l.prop===r&&l.active)&&s<=o?!1:n,!0);var we={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var _o=class{constructor(t){this.values=[],this.timeline=[],this.labels=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache=[],this.duration=$t(t?.duration),this.type="sequencer",this.defaultProp={start:0,end:this.duration,ease:Du(t?.ease)},this.firstRun=!0,this.forceAddFnAtFirstRun=!0,this.direction=void 0,this.lastPartial=0,this.lastDirection=void 0,this.stagger=tt(t),this.useStagger=!0,this.staggerIsReady=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.staggerIsReady){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Qe(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=rt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}this.staggerIsReady=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=we.NONE}){let s=()=>{this.firstRun&&(this.lastPartial=t,this.actionAtFirstRender(t)),!this.firstRun&&this.lastPartial&&(!n||n===we.NONE)&&(this.direction=t>=this.lastPartial?we.FORWARD:we.BACKWARD),!this.firstRun&&(n===we.BACKWARD||n===we.FORWARD)&&(this.direction=n),this.values.forEach(a=>{a.settled=!1}),this.timeline.forEach(({start:a,end:l,values:p},u)=>{p.forEach(m=>{let h=this.values.find(({prop:C})=>C===m.prop);if(!h||h.settled||!m.active||!Dp(this.timeline,u,m.prop,t))return;let T=c.checkType(Number,m.toValue)?m.toValue:m.toValue(),y=c.checkType(Number,m.fromValue)?m.fromValue:m.fromValue(),w=l-a,x=t<l?y:T;m.currentValue=t>=a&&t<=l?m.ease(t-a,y,T-y,w):x,m.currentValue=pe(m.currentValue),h.currentValue=m.currentValue,h.settled=!0})});let i=ge(this.values,"currentValue");Hn({each:this.stagger.each,useStagger:this.useStagger,isLastDraw:r,callBackObject:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop}),this.fireAddCallBack(t),this.useStagger=!0,this.lastPartial=t,this.lastDirection=this.direction,this.firstRun=!1};o?s():c.useNextTick(()=>s())}resetLastValue(){this.firstRun=!0,this.lastPartial=0,this.lastDirection=void 0}actionAtFirstRender(t=0){this.forceAddFnAtFirstRun&&(this.callbackAdd.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:we.FORWARD},s={shouldFire:t<=o,direction:we.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.forceAddFnAtFirstRun=!1)}fireAddCallBack(t=0){this.callbackAdd.forEach(({fn:r,time:o})=>{let n=this.direction===we.FORWARD&&t>o&&this.lastPartial<=o,s=this.direction===we.BACKWARD&&t<o&&this.lastPartial>=o;(n||s)&&r({direction:this.direction,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.duration;this.timeline.forEach(({start:o,end:n},s)=>{this.timeline[s].start=pe(o*r),this.timeline[s].end=pe(n*r)}),this.labels.forEach(({time:o},n)=>{this.labels[n].time=pe(o*r)}),this.callbackAdd.forEach(({time:o},n)=>{this.callbackAdd[n].time=pe(o*r)})}setData(t={}){return this.values=Object.entries(t).map(r=>{let[o,n]=r,s=$u(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:We(K.get("sequencer").ease)}}),this}mergeArray(t,r){return r.map(o=>{let n=t.find(i=>i.prop===o.prop),s={prop:o.prop,active:!1};return n?{...o,...n,active:!0}:s})}orderByStart(t){return t.sort((r,o)=>r.start-o.start)}setPropFromAncestor(t){this.timeline.forEach(({values:r},o)=>{r.forEach(({prop:n,active:s},i)=>{if(!s)return;let a=Fp(this.timeline,o,n,t);a!==null&&(r[i][fi[t].set]=a)})})}goTo(t,r){let o={...this.defaultProp,...r},{start:n,end:s,ease:i}=o;if(!An({start:n,end:s}))return this;let a=Np(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:n??0,end:s??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("fromValue"),this}goFrom(t,r){let o={...this.defaultProp,...r},{start:n,end:s,ease:i}=o;if(!An({start:n,end:s}))return this;let a=Mp(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:n??0,end:s??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("toValue"),this}goFromTo(t,r,o){let n={...this.defaultProp,...o},{start:s,end:i,ease:a}=n;if(!An({start:s,end:i}))return this;if(!Dt(t,r)){Vt("lerp goFromTo:",t,r);return}let l=Lp(t,r,a),p=this.mergeArray(l,this.values);return this.timeline.push({values:p,start:s??0,end:i??this.duration}),this.timeline=this.orderByStart(this.timeline),this}label(t="",r=0){return this.labels.push({name:t,time:r}),this}getLabels(){return this.labels}add(t=()=>{},r=0){let o=c.checkType(Function,t),n=c.checkType(Number,r),s=o&&n;return o||Lc(t),n||Fc(r),s?(this.callbackAdd.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=s,()=>this.callbackCache=n(this.callbackCache)}getDuration(){return this.duration}setDuration(t=0){this.duration=t}getType(){return this.type}cleanCachedId(){this.callbackCache.forEach(({cb:t})=>c.useCache.clean(t))}disableStagger(){this.useStagger=!1}destroy(){this.values=[],this.timeline=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Lf=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let m=t/r,h=pe(o*m),f=pe(h+m);return{start:h,end:f}}let i=t/r*n,a=t-i,l=r-1>0?r-1:1,u=a/l*o;return{start:pe(u),end:pe(i+u)}},Ff=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,l=(e-(e-i))/t*o;if(n===er)return{start:0,end:pe(e-(i-l))};if(n===rr){let p=(i-l)/2;return{start:pe(p),end:pe(e-p)}}return n===tr?{start:pe(i-l),end:pe(e)}:{start:0,end:e}},Vp=e=>{let t=qu(e?.items),r=tt(e),o=$t(e?.duration),n=10,s=r?.each||1,i=[...t].map((f,T)=>({item:f,start:0,end:o,index:T}));if(!Hu(t))return i;r.grid?.col>t.length&&(Qe(t.length),s=1),c.checkType(Number,s)&&(s>n||s<1)&&(Zc(n),s=1);let{staggerArray:a}=rt({arr:[...t].map(f=>({item:f})),endArr:[],stagger:r,slowlestStagger:xe,fastestStagger:xe}),l=a.filter(({item:f})=>c.checkType(Element,f)||c.checkType(Object,f));if(l.length===0)return Xc(),i;let p=l.map(({frame:f})=>f),u=[...new Set(p)].sort((f,T)=>f-T),m=u.length;return l.map(({item:f,frame:T})=>{let y=u.indexOf(T),w=s*m/n,{start:x,end:C}=r.type===Qt?Lf({each:s,duration:o,numItem:m,index:y,eachByNumItem:w}):r.type===er||r.type===tr||r.type===rr?Ff({duration:o,numItem:m,index:y,eachByNumItem:w,type:r.type}):{start:0,end:o};return{item:f,start:x,end:C,index:y}})};var Z={createScrollerTween(e){return new Po(e)},createSequencer(e){return new _o(e)},createMasterSequencer(){return new Ao},createStaggers(e){return Vp(e)},createTween(e){return new Pt(e)},createSpring(e){return new at(e)},createLerp(e){return new Rt(e)}};var qn=(e,t)=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var Un=(e,t,r)=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{};return e.slice(0,r).reduce((s,i)=>{let a=i[0].data;if(a.action==="sync"){let h=a?.syncProp,f={tween:h.from,id:h.from?.getId?.()},T={tween:h.to,id:h.to?.getId?.()};f.id===o&&(o=T.id)}let p=i.find(({data:h})=>h?.tween?.getId?.()===o);p?.data?.tween?.set?.(p?.data?.valuesTo,{immediateNoPromise:!0});let u=p?.data?.tween?.getToNativeType?.(),m=u&&p?qn(u,p.data.valuesTo):{};return{...s,...m}},n)};var Oo=class{constructor(t){this.repeat=_n(t?.repeat),this.yoyo=te(t?.yoyo,"asyncTimeline: yoyo",!1),this.freeMode=te(t?.freeMode,"asyncTimeline: freeMode",!1),this.autoSet=te(t?.autoSet,"asyncTimeline: autoSet",!1),this.tweenList=[],this.currentTween=[],this.tweenStore=[],this.waitComplete=!1,this.defaultObj={id:-1,tween:void 0,action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},syncProp:{to:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}},from:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}}},labelProps:{}},this.labelState={active:!1,index:-1,isReverse:!1},this.starterFunction={fn:()=>{},active:!1},this.groupCounter=1,this.groupId=void 0,this.currentTweenCounter=0,this.currentIndex=0,this.loopCounter=1,this.isReverseNext=!1,this.forceYoyo=!1,this.isReverse=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.isStopped=!0,this.delayIsRunning=!1,this.startOnDelay=!1,this.actionAfterReject={active:!1,fn:()=>{}},this.sessionId=0,this.activetweenCounter=0,this.timeOnPause=0,this.autoSetIsJustCreated=!1,this.currentAction=[],this.fpsIsInLoading=!1,this.id=0,this.callbackLoop=[],this.callbackComplete=[],this.currentResolve=void 0,this.currentReject=void 0}run(){let t=this.tweenList[this.currentIndex],r=this.currentAction;if(this.currentAction=[],!t)return;this.tweenList[this.currentIndex]=t.map(i=>{let{data:a}=i,{tween:l,valuesTo:p,prevValueSettled:u}=a;if(l&&l?.getToNativeType&&!u){let m=l.getToNativeType(),h=qn(m,p);return{...i,data:{...a,prevValueTo:h,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:l,action:p,valuesFrom:u,valuesTo:m,tweenProps:h,syncProp:f,id:T}=a,y={...h};delete y.delay;let{active:w,index:x}=this.labelState,C=w&&x&&this.currentIndex<x;C&&(y.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,kc()),this.currentAction.push({id:T,action:p});let P=r.find(({id:_,action:k})=>_===T&&k===p),M={set:()=>l?.[p](u,y),goTo:()=>l?.[p](m,y),goFrom:()=>l?.[p](u,y),goFromTo:()=>l?.[p](u,m,y),sync:()=>new Promise(_=>{let{from:k,to:V}=f;V?.set(k?.getToNativeType(),{immediate:!0}).then(()=>_({resolve:!0}))}),add:()=>P?new Promise(_=>_({resolve:!0})):new Promise(_=>{if(C)_({resolve:!0});else{let k=this.getDirection();l({direction:k,loop:this.loopCounter}),_({resolve:!0})}}),addAsync:()=>{this.addAsyncIsActive=!0;let _=this.sessionId;return P?new Promise(k=>k({resolve:!0})):new Promise((k,V)=>{if(C)k({resolve:!0});else{let q=this.getDirection();l({direction:q,loop:this.loopCounter,resolve:()=>{_===this.sessionId?k({resolve:!0}):V()}})}})},createGroup:()=>new Promise(_=>_({resolve:!0})),closeGroup:()=>new Promise(_=>_({resolve:!0})),label:()=>new Promise(_=>_({resolve:!0})),suspend:()=>{if(P)return new Promise(V=>V({resolve:!0}));let _=c.checkType(Boolean,l());_||Rc(l);let k=_?l():!0;return new Promise(V=>{!C&&k&&(this.isInSuspension=!0),V({resolve:!0})})}};return new Promise((_,k)=>{let V=C?!1:h?.delay,q=this.sessionId,W=()=>{if(this.isStopped||this.startOnDelay||q!==this.sessionId){k();return}let Y=this.addToActiveTween(l),D=l&&l?.onStartInPause?l.onStartInPause(()=>this.isInPause):de;M[p]().then(()=>_({resolve:!0})).catch(()=>{}).finally(()=>{Y(),D()})};if(V){let Y=c.getTime();this.delayIsRunning=!0;let D=0,L=()=>{let G=c.getTime(),ne=G-Y;if(this.isInPause&&(D=G-this.timeOnPause),this.actionAfterReject.active&&(D=0,ne=V),ne-D>=V||this.isStopped||this.isReverseNext){this.delayIsRunning=!1,W();return}requestAnimationFrame(L)};requestAnimationFrame(L)}else W()})}),s=this.tweenList[this.currentIndex].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.isInSuspension||this.isStopped)return;let{active:i,index:a,isReverse:l}=this.labelState,{fn:p,active:u}=this.starterFunction;if(u&&i&&this.currentIndex===a-1){this.starterFunction.active=!1,this.disableLabel(),this.loopCounter++,p();return}if(i&&l&&this.currentIndex===a-1&&this.reverseNext(),this.isReverseNext){this.isReverseNext=!1,this.currentIndex=this.tweenList.length-this.currentIndex-1,this.disableLabel(),this.revertTween(),this.run();return}if(this.currentIndex<this.tweenList.length-1){this.currentIndex++,this.run();return}if(this.loopCounter<this.repeat||this.repeat===-1){let m=()=>{if(this.loopCounter>0){let h=this.getDirection();this.callbackLoop.forEach(({cb:f})=>f({direction:h,loop:this.loopCounter}))}this.loopCounter++,this.currentIndex=0,this.disableLabel(),(this.yoyo||this.forceYoyo)&&this.revertTween(),this.forceYoyo=!1,this.run()};if(i&&a===this.tweenList.length&&!this.freeMode){let h=this.tweenStore.map(({tween:f})=>{let T=Un(this.tweenList,f,this.tweenList.length);return new Promise((y,w)=>{f.set(T).then(()=>y({resolve:!0})).catch(()=>w())})});Promise.all(h).then(()=>{m()}).catch(()=>{});return}m();return}this.callbackComplete.forEach(({cb:m})=>m()),this.isStopped=!0,this.currentResolve&&this.currentResolve({resolve:!0})}).catch(()=>{if(this.actionAfterReject.active){console.log("actionAfterReject fired"),this.actionAfterReject.fn(),this.actionAfterReject.fn=()=>{},this.actionAfterReject.active=!1;return}}).finally(()=>{this.addAsyncIsActive=!1})}addToActiveTween(t){let r=t?.getId&&t.getId();if(!r)return de;let o=this.activetweenCounter;return this.activetweenCounter++,this.currentTween.push({tween:t,uniqueId:r,id:o}),()=>{this.currentTween=this.currentTween.filter(({id:n})=>n!==o)}}revertTween(){this.isReverse=!this.isReverse,this.tweenList=this.tweenList.reverse().map(t=>t.reverse().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,syncProp:i,prevValueTo:a,valuesTo:l}=o,p=l,{from:u,to:m}=i;switch(n){case"goTo":return{...r,data:{...o,valuesTo:a,prevValueTo:p}};case"goFromTo":return{...r,data:{...o,valuesFrom:l,valuesTo:s}};case"sync":return{...r,data:{...o,syncProp:{...i,from:m,to:u}}};case"goFrom":Pc(),this.stop()}return r}))}addToMainArray(t){let r=this.tweenList.findIndex(o=>o[0]?.group&&o[0].group===this.groupId);r>=0?this.tweenList[r].push({group:this.groupId,data:t}):this.tweenList.push([{group:this.groupId,data:t}])}addTweenToStore(t){let r=t?.getId?.();if(this.tweenStore.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.tweenStore.push(n)}resetAllTween(){this.tweenStore.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!sr(t))return this;o.delay=To(o?.delay);let n={id:this.currentTweenCounter,tween:t,action:"set",valuesTo:r,valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...n};return this.addToMainArray(s),this.addTweenToStore(t),this}goTo(t,r={},o={}){if(!sr(t))return this;o.delay=To(o?.delay);let n={id:this.currentTweenCounter,tween:t,action:"goTo",valuesTo:r,tweenProps:o??{},groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...n};return this.addToMainArray(s),this.addTweenToStore(t),this}goFrom(t,r={},o={}){if(!sr(t))return this;o.delay=To(o?.delay);let n={id:this.currentTweenCounter,tween:t,action:"goFrom",valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...n};return this.addToMainArray(s),this.addTweenToStore(t),this}goFromTo(t,r={},o={},n={}){if(!sr(t))return this;n.delay=To(n?.delay);let s={id:this.currentTweenCounter,tween:t,action:"goFromTo",valuesFrom:r,valuesTo:o,tweenProps:n,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let i={...this.defaultObj,...s};return this.addToMainArray(i),this.addTweenToStore(t),this}add(t=de){let r=Bt(t,()=>{},"timeline add function");if(this.groupId)return nr("add"),this;let o={id:this.currentTweenCounter,tween:r,action:"add",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...o};return this.addToMainArray(n),this}addAsync(t){let r=Xu(t);if(this.groupId)return nr("addAsync"),this;let o={id:this.currentTweenCounter,tween:r,action:"addAsync",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...o};return this.addToMainArray(n),this}sync(t){if(this.groupId)return nr("sync"),this;let r=sr(t?.from);if(!sr(t?.to)||!r)return this;let n={id:this.currentTweenCounter,action:"sync",groupProps:{waitComplete:this.waitComplete},syncProp:t};this.currentTweenCounter++;let s={...this.defaultObj,...n};return this.addToMainArray(s),this}createGroup(t={}){if(this.groupId)return nr("createGroup"),this;let r={id:this.currentTweenCounter,action:"createGroup",groupProps:t};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this.waitComplete=t?.waitComplete??!1,this.groupId=this.groupCounter++,this}closeGroup(){this.groupId=void 0;let t={id:this.currentTweenCounter,action:"closeGroup"};this.currentTweenCounter++;let r={...this.defaultObj,...t};return this.addToMainArray(r),this.waitComplete=!1,this}suspend(t=()=>!0){if(this.groupId)return nr("suspend"),this;let r={id:this.currentTweenCounter,tween:t,action:"suspend",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}label(t={}){if(this.groupId)return nr("label"),this;if(!Ju(t?.name,"asyncTimeline label:"))return this;let r={id:this.currentTweenCounter,action:"label",labelProps:t,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}addSetBlocks(){this.autoSetIsJustCreated||(this.autoSetIsJustCreated=!0,this.tweenStore.forEach(({tween:t})=>{let r=t.getInitialData(),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...o};this.tweenList=[[{group:void 0,data:n}],...this.tweenList]}),this.tweenStore.forEach(({tween:t})=>{let r=Un(this.tweenList,t,this.tweenList.length),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...o};this.tweenList.push([{group:void 0,data:n}])}))}setTween(t="",r=[]){this.stop();let o=Ku(r),n=Zu(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(l=>l?.getId?.())),i=this.tweenStore.filter(({id:l})=>s.has(l)),a=this.tweenList.findIndex(l=>{let[p]=l;return p.data.labelProps?.name===t});return a===-1?(Oc(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(l=>{let p=i.map(({tween:u})=>{let m=Un(this.tweenList,u,a);return new Promise((h,f)=>{u.set(m).then(()=>h({resolve:!0})).catch(()=>f())})});Promise.all(p).then(()=>{l({resolve:!0})}).catch(()=>{Nc()})})}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(){return new Promise((t,r)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{if(this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks(),this.freeMode){if(this.tweenList.length===0||this.addAsyncIsActive)return;if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.play(),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,this.isReverse&&this.revertTween(),this.sessionId++,c.useFrameIndex(()=>{this.currentReject=r,this.currentResolve=t,this.run()},1)}else{let o=()=>{this.stop(),this.isStopped=!1;let n=this.tweenStore.map(({tween:s})=>{let i=s.getInitialData();return new Promise((a,l)=>{s.set(i).then(()=>a({resolve:!0})).catch(()=>l())})});Promise.all(n).then(()=>{this.currentReject=r,this.currentResolve=t,this.run()}).catch(()=>{})};this.starterFunction.fn=()=>o(),this.starterFunction.active=!0,this.playReverse({forceYoYo:!0})}}))})}playFromLabel({isReverse:t=!1,label:r=null}){this.tweenList.length===0||this.addAsyncIsActive||(this.isReverse&&this.revertTween(),this.currentIndex=0,this.labelState.isReverse=t,this.labelState.active=!0,this.labelState.index=c.checkType(String,r)?this.tweenList.findIndex(o=>{let[n]=o;return n.data.labelProps?.name===r}):r,c.checkType(String,r)&&Yu(this.labelState.index,r),this.run())}playFrom(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!1,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playFromReverse(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!0,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playReverse({forceYoYo:t=!0,resolve:r=null,reject:o=null}={}){return new Promise((n,s)=>{let i=r||n,a=o||s;this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks();let l=t;if(!(this.tweenList.length===0||this.addAsyncIsActive)){if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.playReverse({forceYoYo:l}),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,l&&(this.forceYoyo=!0),this.labelState.active=!0,this.labelState.index=this.tweenList.length,this.loopCounter--,this.sessionId++,c.useFrameIndex(()=>{this.currentResolve=i,this.currentReject=a,this.run()},1)}}))})}reverseNext(){this.isReverseNext=!0}stop({clearCache:t=!0}={}){this.isStopped=!0,this.currentIndex=0,this.loopCounter=1,this.rejectPromise(),this.isReverseNext=!1,this.disableLabel(),this.forceYoyo=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.timeOnPause=0,this.labelState.isReverse=!1,this.tweenStore.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.isReverse&&this.revertTween(),this.isReverse=!1,this.freeMode||this.resetAllTween()}pause(){this.isInPause=!0,this.timeOnPause=c.getTime(),this.currentTween.forEach(({tween:t})=>{t?.pause?.()})}resume(){this.isInPause&&(this.isInPause=!1,this.timeOnPause=0,this.resumeEachTween()),this.isInSuspension&&(this.isInSuspension=!1,this.timeOnPause=0,this.currentIndex<=this.tweenList.length-2?(this.currentIndex++,this.run()):this.currentIndex===this.tweenList.length-1&&(this.currentIndex=this.yoyo&&!this.isReverse?1:0,this.disableLabel(),this.yoyo&&this.revertTween(),this.loopCounter++,this.run()))}disableLabel(){this.labelState.active=!1,this.labelState.index=-1}resumeEachTween(){this.currentTween.forEach(({tween:t})=>{t?.resume?.()})}get(){return this.currentTween}isActive(){return!this.isStopped}isPaused(){return this.isInPause}isSuspended(){return this.isInSuspension}getDirection(){return this.isStopped?we.NONE:this.isReverse?we.BACKWARD:we.FORWARD}onLoopEnd(t){this.callbackLoop.push({cb:t,id:this.id});let r=this.id;return()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t){this.callbackComplete.push({cb:t,id:this.id});let r=this.id;return this.id++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}destroy(){this.tweenStore.forEach(({tween:t})=>{t?.destroy?.()}),this.tweenList=[],this.currentTween=[],this.callbackComplete=[],this.callbackLoop=[],this.tweenStore=[],this.currentIndex=0,this.actionAfterReject={active:!1,fn:()=>{}}}};var No=class{constructor(t={}){this.duration=$t(t?.duration),this.yoyo=te(t?.yoyo,"syncTimeline: yoyo",!1),this.repeat=_n(t?.repeat),this.sequencers=[],this.startTime=0,this.timeElapsed=0,this.currentTime=0,this.pauseTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.isReverse=!1,this.startReverse=!1,this.isPlayngReverse=!1,this.loopCounter=0,this.loopIteration=0,this.minLoopIteration=10,this.isStopped=!0,this.skipFirstRender=!1,this.completed=!1,this.fpsIsInLoading=!1,this.isInPause=!1,this.callbackId=0,this.callbackLoop=[],this.callbackComplete=[],this.callbackOnUpdate=[],this.currentResolve=void 0,this.currentReject=void 0}updateTime(t,r){if(this.isStopped||this.fpsIsInLoading)return;let o=!this.repeat||this.repeat>=2&&this.loopCounter===this.repeat-1?0:1e3/r/2;this.isInPause&&(this.pauseTime=t-this.startTime-this.timeElapsed-this.timeAtReverseBack),this.timeElapsed=Math.trunc(t-this.startTime-this.pauseTime-this.timeAtReverseBack);let n=this.isReverse?this.timeAtReverse-(this.timeElapsed-this.timeAtReverse):this.timeElapsed;if(this.isInPause||(this.currentTime=Oe(n,0,this.duration),this.skipFirstRender||(this.sequencers.forEach(i=>{i.draw({partial:this.currentTime,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.callbackOnUpdate.forEach(({cb:i})=>{i({time:this.currentTime,direction:this.getDirection()})}))),this.skipFirstRender=!1,this.loopIteration++,n<=this.duration-o&&n>=0+o&&!this.isStopped){this.completed=!1,this.goToNextFrame();return}if(this.resetSequencerLastValue(),this.startReverse){this.isReverse=!0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!1,this.goToNextFrame();return}let s=this.getDirection();if(c.useNextFrame(()=>{!this.fpsIsInLoading&&!this.completed&&this.loopIteration>this.minLoopIteration&&(this.completed=!0,this.loopCounter++,this.loopIteration=0,this.callbackLoop.forEach(({cb:i})=>i({direction:s,loop:this.loopCounter})))}),!this.repeat||this.loopCounter===this.repeat-1&&this.loopIteration>this.minLoopIteration){let i=this.currentTime;this.sequencers.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.isStopped=!0,this.resetTime(),this.startTime=t,this.isReverse&&(this.isReverse=!1),this.callbackComplete.forEach(({cb:a})=>a()),this.currentResolve&&this.currentResolve();return}if(this.yoyo){this.reverse(),this.goToNextFrame();return}if(this.isPlayngReverse){this.resetTime(),this.startTime=t,this.isReverse||(this.isPlayngReverse=!this.isPlayngReverse),this.timeElapsed=this.duration,this.currentTime=this.duration,this.pauseTime=this.duration,this.goToNextFrame();return}this.resetTime(),this.startTime=t,this.isReverse&&(this.isPlayngReverse=!this.isPlayngReverse),this.goToNextFrame()}goToNextFrame(){c.useFrame(()=>{c.useNextTick(({time:t,fps:r})=>{this.fpsIsInLoading||this.updateTime(t,r)})})}resetTime(){this.timeElapsed=0,this.pauseTime=0,this.currentTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0}getTimeFromLabel(t){let r=this.sequencers.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||Mc(t),r.time}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(t={}){return new Promise((r,o)=>{let n=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&!this.isReverse&&n))){if(!this.isStopped&&this.isReverse&&n){this.reverse();return}this.playFromTime()}})}playFrom(t=0){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let s=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTime(s)})}playFromTime(t=0){this.resetSequencerLastValue(),this.resetTime(),this.currentTime=t,this.timeAtReverseBack=-this.currentTime,this.isPlayngReverse=!1,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}playFromReverse(t){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let s=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTimeReverse(s,!0)})}playReverse(t={}){return new Promise((r,o)=>{let n=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&this.isReverse&&n))){if(!this.isStopped&&!this.isReverse&&n){this.reverse();return}this.playFromTimeReverse(this.duration,!0)}})}playFromTimeReverse(t=0){this.resetSequencerLastValue(),this.timeElapsed=t,this.currentTime=t,this.pauseTime=t,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!0,this.isPlayngReverse=!0,this.skipFirstRender=!0,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}async startAnimation(t){if(this.repeat===0)return;let{averageFPS:r}=await c.useFps();zt("sequencer",r),this.isReverse=!1,this.sequencers.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),c.useFrame(()=>{c.useNextTick(({time:o,fps:n})=>{this.startTime=o,this.fpsIsInLoading=!1,this.isStopped=!1,this.isInPause=!1,this.loopCounter=0,this.updateTime(o,n)})})}pause(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!0)}resume(){this.isStopped||!this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!1)}reverse(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.resetSequencerLastValue(),this.isReverse=!this.isReverse,this.isReverse?this.timeAtReverse=this.timeElapsed:this.timeAtReverseBack+=this.timeElapsed-this.currentTime)}stop({clearCache:t=!0}={}){if(this.isStopped=!0,this.isInPause=!1,this.rejectPromise(),t){this.sequencers.forEach(r=>{r.cleanCachedId()});return}this.sequencers.forEach(r=>{r.draw({partial:this.currentTime,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.duration),this.sequencers.push(t),this}setDuration(t){return this.duration=t,this}resetSequencerLastValue(){this.sequencers.forEach(t=>t.resetLastValue())}isActive(){return!this.isStopped}isPaused(){return this.isInPause}getDirection(){return this.isStopped?we.NONE:this.isReverse?we.BACKWARD:we.FORWARD}getTime(){return this.currentTime}onLoopEnd(t=()=>{}){this.callbackLoop.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.callbackComplete.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.callbackOnUpdate.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackOnUpdate=this.callbackOnUpdate.filter(o=>o.id!==r)}}destroy(){this.stop(),this.sequencers.forEach(t=>t.destroy()),this.sequencers=[],this.callbackOnUpdate=[],this.callbackLoop=[],this.callbackComplete=[]}};var Ne={createSyncTimeline(e){return new No(e)},createAsyncTimeline(e){return new Oo(e)}};var Ut={createParallax(e){return new qt({...e,type:d.TYPE_PARALLAX})},createScrollTrigger(e){return new qt({...e,type:d.TYPE_SCROLLTRIGGER})}};var $p=({onMount:e,watch:t,html:r})=>(e(({element:o})=>{let n="",s=!1,i=[{xIn:0,xOut:0},{xIn:0,xOut:0}],a=()=>{let{xIn:u}=i[0],{xIn:m}=i[1],{xOut:h}=i[0],{xOut:f}=i[1];o.style.clipPath=`polygon(${h}% 0%, ${u}% 0%, ${m}% 100%, ${f}% 100%)`},l=Z.createTween({data:{xIn:0,xOut:0},stagger:{each:8}});i.forEach(u=>{l.subscribe(({xIn:m,xOut:h})=>{u.xIn=m,u.xOut=h,a()})});let p=Ne.createAsyncTimeline({repeat:1,autoSet:!0});return p.goTo(l,{xIn:100},{ease:"easeInOutCirc",duration:500}).addAsync(({resolve:u})=>{let m=O.watch("atfterRouteChange",()=>{m(),u()});$s({url:n})}).goTo(l,{xOut:100},{ease:"easeInCubic",duration:500}),t("url",async u=>{s||(s=!0,n=u,await p.play(),s=!1)}),()=>{}}),r`<div class="c-page-transiotion"></div>`);var Df=I({name:"page-transition",component:$p,isolateOnMount:!0,isolateCreation:!0,exportState:["url"],state:{url:()=>({value:"",type:String,skipEqual:!1})}});function se(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function Re(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}var Gn=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.text()}:(console.warn(`${e} not found`),{success:!1,data:""})},E=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.json()}:(console.warn(`${e} not found`),{success:!1,data:""})};var Vf=({data:e,staticProps:t})=>e.map(r=>{let{component:o,props:n,content:s}=r;return g`
                <${o} ${t(n)}>
                    ${s??""}
                </${o}>
            `}).join(""),$f=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await E({source:e});return r?o.data:[]},Wf=({data:e,bindProps:t})=>e&&e.length>0?"":g`
        <mob-loader
            ${t({bind:["contentIsLoaded"],props:({contentIsLoaded:r})=>({shouldRemove:r})})}
        ></mob-loader>
    `,Wp=async({html:e,getState:t,setState:r,staticProps:o,bindProps:n,onMount:s})=>{let{source:i,data:a}=t(),l=await $f({source:i,data:a}),{useMinHeight:p,useMaxWidth:u}=t(),m=p?"is-min-100":"",h=u?"is-max-width":"";return s(async({element:f})=>{r("contentIsLoaded",!0),c.useFrame(()=>{f.classList.add("active")})}),e`
        <section class="html-content ${m} ${h}">
            ${Wf({data:a,bindProps:n})}
            ${Vf({data:l,staticProps:o})}
        </section>
    `};var Bf=I({name:"html-content",component:Wp,exportState:["source","useMinHeight","useMaxWidth","data"],state:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),contentIsLoaded:()=>({value:!1,type:Boolean}),useMinHeight:()=>({value:!1,type:Boolean}),useMaxWidth:()=>({value:!1,type:Boolean})}});var Bp=({html:e,getState:t})=>{let{tag:r,color:o,isBold:n}=t(),s=`is-${o}`;return e`<${r} class="mob-title ${s} ${n?"is-bold":""}">
        <mobjs-slot/>
    </${r}>`};var jf=I({name:"mob-title",component:Bp,exportState:["tag","color","isBold"],state:{tag:()=>({value:"h1",type:String}),color:()=>({value:"white",type:String,validate:e=>["white","green"].includes(e)}),isBold:()=>({value:!1,type:Boolean})}});var jp=({html:e,getState:t})=>{let{style:r,color:o}=t(),n=`is-${o}`;return e`<p class="p p--${r} ${n}">
        <mobjs-slot />
    </p>`};var zf=I({name:"mob-paragraph",component:jp,exportState:["style","color"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)})}});var Hf=({items:e})=>e.map(t=>g` <li>${t}</li> `).join(""),zp=({html:e,getState:t})=>{let{style:r,color:o,items:n,dots:s}=t(),i=`is-${o}`;return e`<ul class="ul ul--${r} ${i} ${s?"":"hide-dots"}">
        ${Hf({items:n})}
    </ul>`};var qf=I({name:"mob-list",component:zp,exportState:["style","color","items","dots"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)}),items:()=>({value:[],type:Array})}});var ud=Zh(cd(),1);var Ci=ud.default;var pd="[A-Za-z$_][0-9A-Za-z$_]*",Lg=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Fg=["true","false","null","undefined","NaN","Infinity"],dd=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],hd=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],md=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Dg=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Vg=[].concat(md,dd,hd);function fd(e){let t=e.regex,r=(S,{after:R})=>{let A="</"+S[0].slice(1);return S.input.indexOf(A,R)!==-1},o=pd,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(S,R)=>{let A=S[0].length+S.index,B=S.input[A];if(B==="<"||B===","){R.ignoreMatch();return}B===">"&&(r(S,{after:A})||R.ignoreMatch());let J,Q=S.input.substring(A);if(J=Q.match(/^\s*=/)){R.ignoreMatch();return}if((J=Q.match(/^\s+extends\s+/))&&J.index===0){R.ignoreMatch();return}}},a={$pattern:pd,keyword:Lg,literal:Fg,built_in:Vg,"variable.language":Dg},l="[0-9](_?[0-9])*",p=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${u})((${p})|\\.)?|(${p}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},f={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"xml"}},T={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"css"}},y={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,h]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},P=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,T,y,w,{match:/\$\d+/},m];h.contains=P.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(P)});let M=[].concat(C,h.contains),_=M.concat([{begin:/\(/,end:/\)/,keywords:a,contains:["self"].concat(M)}]),k={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:_},V={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},q={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...dd,...hd]}},W={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Y={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[k],illegal:/%/},D={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function L(S){return t.concat("(?!",S.join("|"),")")}let G={match:t.concat(/\b/,L([...md,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},ne={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},j={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},k]},N="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",v={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(N)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[k]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:q},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),W,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,T,y,w,C,{match:/\$\d+/},m,q,{className:"attr",begin:o+t.lookahead(":"),relevance:0},v,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:N,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},Y,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[k,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},ne,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[k]},G,D,V,j,{match:/\$[(.]/}]}}Ci.registerLanguage("javascript",fd);var gd=async({ref:e,source:t})=>{let{success:r,data:o}=await Gn({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Ci.highlightElement(e,{language:"javascript"}),e.style.minHeight=""},bd=({html:e,onMount:t,getState:r})=>{let{source:o,isFull:n,hasBorder:s,hasOverflow:i,numLines:a,loadOnMount:l}=r(),p=n?"is-full":"",u=s?"has-border":"",m=i?"has-overflow":"";return t(async({refs:h})=>{let{codeEl:f}=h;return l?await gd({ref:f,source:o}):gd({ref:f,source:o}),()=>{}}),e`<div class="snippet">
        <code class="${p} ${u}">
            <pre
                class="${p} ${m}"
                ref="codeEl"
                style="min-height:${a*1.5}rem;"
            >
Loading snippet ...</pre
            >
        </code>
    </div>`};var $g=I({name:"mob-snippet",component:bd,exportState:["source","isFull","hasOverflow","hasBorder","numLines","loadOnMount"],state:{source:()=>({value:"",type:String}),contentIsLoaded:()=>({value:!1,type:Boolean}),isFull:()=>({value:!1,type:Boolean}),hasOverflow:()=>({value:!0,type:Boolean}),hasBorder:()=>({value:!1,type:Boolean}),numLines:()=>({value:1,type:Number}),loadOnMount:()=>({value:!1,type:Boolean})}});function Wg({id:e,label:t}){return e&&e.length>0?`data-scroll=${e} data-label=${t}`:""}var yd=async({html:e,getState:t})=>{let{style:r,line:o,id:n,label:s}=t(),i=o?"spacer--line":"";return e`<div
        ${Wg({id:n,label:s})}
        class="spacer spacer--${r} ${i}"
    ></div>`};var Bg=I({name:"mob-spacer",component:yd,exportState:["style","line","id","label"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String})}});var jg=g`
    <div class="only-desktop">
        <h3>This content is available only on desktop</h3>
        <h4>Need page reload on a screen size up to 1024px</h4>
    </div>
`,vd=({element:e})=>{e.textContent="",!re.mq("min","desktop")&&(e.textContent="",e.insertAdjacentHTML("afterbegin",jg))},Sd=({html:e,onMount:t})=>(t(({element:r})=>{vd({element:r}),c.useResize(()=>{vd({element:r})})}),e` <div class="only-desktop-container" ref="container"></div> `);var zg=I({name:"only-desktop",component:Sd,state:{}});var wd=({onMount:e,html:t,watch:r,remove:o,getState:n})=>{let{position:s}=n();return e(({element:i})=>{let a=Z.createTween({data:{opacity:1,scale:1},duration:500});return a.subscribe(({opacity:l,scale:p})=>{i.style.opacity=l,i.style.transform=`scale(${p})`}),r("shouldRemove",async l=>{l&&(await a.goTo({opacity:0,scale:.9}),o())}),()=>{a.destroy(),a=null}}),t`
        <div class="c-loader ${s}">
            <span class="c-loader__inner"></span>
        </div>
    `};var Hg=I({name:"mob-loader",component:wd,exportState:["position","shouldRemove"],state:{shouldRemove:()=>({value:!1,type:Boolean}),position:()=>({value:"center-viewport",type:String,validate:e=>["center-viewport","center-component"].includes(e)})}});var qg=({scrollY:e,element:t})=>{c.useNextTick(()=>{let r=e,o=document.documentElement.scrollHeight-window.innerHeight,n=Math.round(r/o*100);c.useNextFrame(()=>{t.style.setProperty("--delta",`${n}%`)})})},Td=({html:e,onMount:t})=>(t(({element:r})=>{if(re.mq("max","large"))return;r.style.setProperty("--delta","0");let o=c.useScroll(({scrollY:n})=>{c.useFrame(()=>{qg({scrollY:n,element:r})})});return()=>{o()}}),e` <div class="c-doc-scroll"></div> `);var Ug=I({name:"doc-scroll",component:Td});function Gg({targets:e,delegateEvents:t,syncParent:r,staticProps:o,setState:n,bindProps:s}){return e.map((i,a)=>{let{label:l,scroll:p}=i.dataset;return g`<li>
                <scroll-to-button
                    ${t({click:()=>{let u=p==="start"?0:ie(i).top-50;lr.to(u),n("activeId",a)}})}
                    ${s({bind:["activeId"],props:({activeId:u})=>({active:u===a})})}
                    ${o({label:l})}
                    ${r}
                >
                </scroll-to-button>
            </li> `}).join("")}var xd=({html:e,onMount:t,delegateEvents:r,syncParent:o,staticProps:n,bindProps:s,setState:i})=>(t(({refs:a})=>{if(re.mq("max","large"))return;let{list:l}=a,p=document.querySelectorAll("[data-scroll]");l.insertAdjacentHTML("beforeend",Gg({targets:[...p],delegateEvents:r,syncParent:o,staticProps:n,bindProps:s,setState:i})),ho(l);let u=c.useMouseWheel(()=>{i("activeId",-1)});return()=>{u()}}),e` <div class="c-scroll-to"><ul ref="list"></ul></div> `);var Jg=I({name:"scroll-to",component:xd,exportState:["activeId"],state:{activeId:()=>({value:0,type:Number})}});var Cd=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:n}=t();return r(({element:s})=>{o("active",i=>{s.classList.toggle("active",i)})}),e`
        <button type="button">
            <span> ${n} </span>
        </button>
    `};var Yg=I({name:"scroll-to-button",component:Cd,exportState:["label","active"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Id=[{label:"html",url:"mobJs_html"},{label:"onMount",url:"mobJs_onMount"},{label:"getState",url:"mobJs_getState"},{label:"setState",url:"mobJs_setState"},{label:"watch",url:"mobJs_watch"},{label:"watchSync",url:"mobJs_watchSync"},{label:"staticProps",url:"mobJs_staticProps"},{label:"bindProps",url:"mobJs_bindProps"},{label:"bindEvents",url:"mobJs_bindEvents"},{label:"delegateEvents",url:"mobJs_delegateEvents"},{label:"reactive list: (repeat)",url:"mobJs_repeat"},{label:"unBind",url:"mobJs_unBind"},{label:"emit",url:"mobJs_emit"},{label:"emitAsync",url:"mobJs_emitAsync"},{label:"computed",url:"mobJs_computed"},{label:"remove",url:"mobJs_remove"},{label:"removeDOM",url:"mobJs_removeDom"},{label:"getChildren",url:"mobJs_getChildren"},{label:"freezeProp",url:"mobJs_freezeProp"},{label:"unFreezeProp",url:"mobJs_unFreezeProp"},{label:"getParentId",url:"mobJs_getParentId"},{label:"watchParent",url:"mobJs_watchParent"},{label:"syncParent",url:"mobJs_syncParent"}];var Xg={mobjs:Id},Kg=({data:e,staticProps:t})=>e.map(r=>{let{label:o,url:n}=r;return g`<li>
                <links-mobjs-button
                    ${t({label:o,url:n})}
                ></links-mobjs-button>
            </li>`}).join(""),Ed=({html:e,staticProps:t,getState:r})=>{let{section:o}=r();return e`<div class="c-params-mobjs">
        <ul>
            ${Kg({staticProps:t,data:Xg?.[o]??[]})}
        </ul>
    </div>`};var kd=({html:e,getState:t})=>{let{label:r,url:o}=t(),{activeRoute:n}=O.get();return e`<a href="./#${o}" class="${n===o?"current":""}">${r}</a>`};var Zg=I({name:"links-mobjs",component:Ed,exportState:["section"],state:{section:()=>({value:"",type:String})}}),Qg=I({name:"links-mobjs-button",component:kd,exportState:["label","url"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String})}});var Rd=({html:e,onMount:t})=>(t(({element:r})=>{r.classList.add("disable");let o=Z.createTween({data:{opacity:1,scale:1},duration:500});return o.subscribe(({opacity:n,scale:s})=>{r.style.opacity=n,r.style.transform=`scale(${s})`}),O.watch("beforeRouteChange",()=>{r.classList.remove("disable"),o.goTo({opacity:1,scale:1})}),O.watch("atfterRouteChange",async()=>{await o.goTo({opacity:0,scale:.9}),r.classList.add("disable")}),()=>{o.destroy(),o=null}}),e`
        <div class="c-loader center-viewport">
            <span class="c-loader__inner"></span>
        </div>
    `);var eb=I({name:"route-loader",component:Rd,state:{isLoading:()=>({value:!1,type:Boolean})}});var pr=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg width="50.51" height="51.18" version="1.1" viewBox="0 0 13.364 13.541" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(-6.0855 -4.2559)">
  <path d="m7.5846 9.2554h10.366l-5.1892 7.0421z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>
  <path d="m7.584 7.7559a1.5002 1.5002 0 0 0-1.207 2.3887l5.1758 7.041a1.5002 1.5002 0 0 0 2.416 2e-3l5.1895-7.043a1.5002 1.5002 0 0 0-1.207-2.3887zm2.9648 3h4.4316l-2.2188 3.0117z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m10.712 5.7557h4.1113v4.4858h-4.1113z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>
  <path d="m10.711 4.2559a1.5002 1.5002 0 0 0-1.5 1.5v4.4863a1.5002 1.5002 0 0 0 1.5 1.5h4.1113a1.5002 1.5002 0 0 0 1.5-1.5v-4.4863a1.5002 1.5002 0 0 0-1.5-1.5zm1.5 3h1.1113v1.4863h-1.1113z" color="#000000" style="-inkscape-stroke:none"/>
 </g>
</svg>
`;var Pd=({getState:e,html:t})=>{let{prevRoute:r,nextRoute:o}=e();return t`<div>
        <a
            class="c-quick-nav c-quick-nav--prev ${r===""?"is-disable":""}"
            href="${r}"
            >${pr}</a
        >
        <a
            class="c-quick-nav c-quick-nav--next ${o===""?"is-disable":""}"
            href="${o}"
            >${pr}</a
        >
    </div>`};var rb=I({name:"quick-nav",component:Pd,exportState:["prevRoute","nextRoute"],state:{prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String})}});var Ad=({getState:e,html:t,onMount:r})=>{let{title:o}=e();return r(({refs:n})=>{let{titleEl:s}=n;c.useFrame(()=>{s.classList.add("visible")})}),t`<div class="c-animation-title">
        <h4 ref="titleEl">${o}</h4>
    </div>`};var ob=I({name:"animation-title",component:Ad,exportState:["title"],state:{title:()=>({value:"",type:String})}});var _d=({html:e})=>e`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <mobjs-slot name="debug"></mobjs-slot>
            </div>
        </footer>
    `;var nb=I({name:"mob-footer",component:_d});var $=c.createStore({closeAllAccordion:()=>{},refreshScroller:()=>{},openNavigation:()=>{},closeNavigation:()=>{},goToTop:()=>{},activeSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});var Od=({html:e,onMount:t,getState:r})=>{let{label:o,section:n}=r();return t(({element:s})=>{$.watch("activeSection",i=>{let a=i===n;s.classList.toggle("current",a)})}),e`
        <button type="button" class="footer-nav__button">${o}</button>
    `};var sb=[{label:"About",url:"about",section:"about"},{label:"Canvas 2d",url:"canvas_overview",section:"canvas"},{label:"Illustration",url:"svg_overview",section:"svg"},{label:"MobCore",url:"mobCore_overview",section:"mobCore"},{label:"MobJs",url:"mobJs_overview",section:"mobJs"},{label:"MobMotion",url:"mobMotion_overview",section:"mobMotion"},{label:"Plugin",url:"plugin_overview",section:"plugin"}];function ib({url:e}){let t=Ue("page-transition");_e(t,"url",e)}var ab=({delegateEvents:e,staticProps:t})=>sb.map(({label:r,url:o,section:n})=>g`<li class="footer-nav__item">
                <footer-nav-button
                    ${e({click:()=>{ib({url:o})}})}
                    ${t({label:r,section:n})}
                ></footer-nav-button>
            </li> `).join(""),Nd=({html:e,delegateEvents:t,staticProps:r})=>re.mq("max","desktop")?e` <span></span> `:e`
        <ul class="footer-nav">
            ${ab({delegateEvents:t,staticProps:r})}
        </ul>
    `;var lb=I({name:"footer-nav",component:Nd}),cb=I({name:"footer-nav-button",component:Od,exportState:["label","section"],state:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})}});function ub({navInfo:e}){c.useFrame(()=>{e.classList.add("open")})}function pb({navInfo:e}){c.useFrame(()=>{e.classList.remove("open")})}function db(){let e=Ue("page-transition");_e(e,"url","#home"),$.set("navigationIsOpen",!1),$.emit("closeNavigation"),$.emit("closeAllAccordion"),$.emit("goToTop")}var Md=({html:e,onMount:t,delegateEvents:r})=>(t(({refs:o})=>{let{navInfo:n,title:s,beta:i}=o;return $.watch("openNavigation",()=>ub({navInfo:n})),$.watch("closeNavigation",()=>pb({navInfo:n})),O.watch("beforeRouteChange",a=>{s.classList.toggle("visible",a!=="home"),i.classList.toggle("visible",a!=="home")}),()=>{}}),e`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ref="titleLink"
                        ${r({click:()=>{db()}})}
                    >
                        <div class="l-header__title-container">
                            <h3 ref="title"><span>Mob</span>Project</h3>
                            <h5 ref="beta">beta 0.0.1</h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ref="navInfo">
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `);var Ld=`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>

`;var Fd={},Dd={},Zn=()=>Fd,ye=()=>Dd,Vd=async()=>{Fd=await fetch("./data/common.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e)),Dd=await fetch("./data/legend.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e))};var $d={github:Ld},mb=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t.dataset,o=Ue("page-transition");_e(o,"url",r);let{navigationIsOpen:n}=$.get();n&&($.set("navigationIsOpen",!1),$.emit("closeNavigation"))};function fb({delegateEvents:e}){let{header:t}=Zn(),{links:r}=t;return r.map(o=>{let{svg:n,url:s,internal:i}=o;return g`<li class="l-header__sidenav__item">
                ${i?g`
                          <button
                              type="button"
                              data-url="${s}"
                              class="l-header__sidenav__link"
                              ${e({click:a=>{console.log("click"),mb({event:a})}})}
                          >
                              ${$d[n]}
                          </button>
                      `:g`
                          <a
                              href="${s}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${$d[n]}
                          </a>
                      `}
            </li>`}).join("")}var Wd=({html:e,delegateEvents:t})=>e`
        <ul class="l-header__sidenav">
            ${fb({delegateEvents:t})}
        </ul>
    `;var gb=()=>{let{navigationIsOpen:e}=$.get("navigationIsOpen");if($.set("navigationIsOpen",t=>!t),e){$.emit("closeNavigation");return}$.emit("openNavigation")},Bd=({onMount:e,html:t,delegateEvents:r})=>(e(({element:o})=>{$.watch("closeNavigation",()=>{c.useFrame(()=>{o.classList.remove("is-open")})}),$.watch("openNavigation",()=>{c.useFrame(()=>{o.classList.add("is-open")})})}),t`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${r({click:()=>gb()})}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `);var bb=I({name:"mob-header",component:Md}),yb=I({name:"mob-header-nav",component:Wd}),vb=I({name:"mob-header-toggle",component:Bd});var Ii=0,jd=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new Ht({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"tablet",onUpdate:({percent:i})=>{let{navigationIsOpen:a}=$.get();a&&(Ii=Number.parseInt(i)/100,o.style.transform=`translateZ(0) scaleX(${Ii})`)}});s.init(),$.watch("activeSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let l=document.querySelector(".l-header"),p=Se(r),u=Se(l),m=100*a.offsetTop/(p-window.innerHeight+u),h=Math.min(m,100);s.move(h)}),$.watch("refreshScroller",()=>s.refresh()),$.watch("closeNavigation",()=>{o.style.transform="translateZ(0) scaleX(0)"}),$.watch("openNavigation",()=>{o.style.transform=`translateZ(0) scaleX(${Ii})`}),$.watch("goToTop",()=>{setTimeout(()=>{s.move(0),$.set("activeSection","no-section")},n)})};function Sb({element:e,main:t}){c.useFrame(()=>{document.body.style.overflow="",e.classList.remove("active"),t.classList.remove("shift")})}function wb({element:e,main:t}){$.emit("refreshScroller"),c.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("active"),t.classList.add("shift")})}function Tb({main:e,toTopBtn:t}){e.addEventListener("click",()=>{let{navigationIsOpen:r}=$.get();r&&($.set("navigationIsOpen",!1),$.emit("closeNavigation"))}),t.addEventListener("click",()=>{$.emit("closeAllAccordion"),$.emit("goToTop");let{navigationIsOpen:r}=$.get();r||lr.to(0)})}var zd=({html:e,onMount:t})=>(t(({element:r,refs:o})=>{let n=document.querySelector("main.main"),s="",{toTopBtn:i,wrap:a}=o;return $.watch("openNavigation",()=>wb({element:r,main:n})),$.watch("closeNavigation",()=>Sb({element:r,main:n})),c.useResize(()=>{let p=re.mq("max","desktop")?"desk":"mob";p!==s&&a.scrollTo(0,0),s=p}),Tb({main:n,toTopBtn:i}),jd({root:r}),()=>{}}),e`
        <div class="l-navcontainer">
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent"></div>
                <button class="l-navcontainer__totop" ref="toTopBtn"></button>
            </div>
            <div class="l-navcontainer__wrap" ref="wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `);function xb({data:e,staticProps:t,setState:r,bindProps:o,bindEvents:n}){return e.map((s,i)=>{let{label:a,url:l,children:p,section:u,sectioName:m,scrollToSection:h}=s;return u?g`
                    <mob-navigation-label
                        ${t({label:a,sectioName:m})}
                    ></mob-navigation-label>
                `:p?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:a,url:l},children:p,callback:()=>r("currentAccordionId",i)})}
                          ${o({bind:["currentAccordionId"],props:({currentAccordionId:f})=>({isOpen:f===i})})}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${n({click:()=>{}})}
                              ${t({label:a,url:l,scrollToSection:h??"no-scroll"})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var Hd=({html:e,staticProps:t,setState:r,bindProps:o,bindEvents:n})=>{let{navigation:s}=Zn();return $.watch("closeAllAccordion",()=>{r("currentAccordionId",-1)}),e`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${xb({data:s,staticProps:t,setState:r,bindProps:o,bindEvents:n})}
            </ul>
        </nav>
    `};var qd=({getState:e,html:t,onMount:r,watch:o,delegateEvents:n})=>{let{label:s,url:i,arrowClass:a,subMenuClass:l,fireRoute:p,callback:u,scrollToSection:m}=e();return r(({element:h})=>(o("isOpen",f=>{c.useFrame(()=>{h.classList.toggle("active",f)})}),O.watch("activeRoute",f=>{c.useFrame(()=>{let T=f===i;h.classList.toggle("current",T),T&&p&&(u(),$.set("activeSection",m))})}),()=>{})),t`
        <button
            type="button"
            class="l-navigation__link  ${a} ${l}"
            ${n({click:()=>{if(u(),!p)return;let h=Ue("page-transition");_e(h,"url",i),$.set("navigationIsOpen",!1),$.emit("closeNavigation")}})}
        >
            ${s}
        </button>
    `};var Ud=({getState:e,html:t})=>{let{label:r,sectioName:o}=e();return t`
        <div class="l-navigation__label" data-sectionname="${o}">
            ${r}
        </div>
    `};function Cb({children:e,staticProps:t,callback:r}){return e.map(o=>{let{label:n,url:s,scrollToSection:i}=o;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({callback:r,label:n,url:s,subMenuClass:"l-navigation__link--submenu",scrollToSection:i})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var Gd=({onMount:e,html:t,getState:r,setState:o,staticProps:n,bindProps:s,watch:i})=>{let{children:a,headerButton:l,callback:p}=r(),{label:u,url:m}=l;return e(({refs:h})=>{let{content:f}=h;return Eo.subscribe(f),Eo.reset(f),i("isOpen",async T=>{if(await Eo[T?"down":"up"](f),$.emit("refreshScroller"),!T){let w=Ue("main_navigation");_e(w,"currentAccordionId",-1,!1)}}),()=>{}}),t`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${n({label:u,url:m,arrowClass:"l-navigation__link--arrow",fireRoute:!1,callback:()=>{o("isOpen",f=>!f);let{isOpen:h}=r("isOpen");h&&p()}})}
                ${s({bind:["isOpen"],props:({isOpen:h})=>({isOpen:h})})}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ref="content">
                ${Cb({children:a,staticProps:n,callback:p})}
            </ul>
        </li>
    `};var Ib=I({name:"mob-navigation-container",component:zd,isolateOnMount:!0,isolateCreation:!0}),Eb=I({name:"mob-navigation",component:Hd,exportState:["currentAccordionId"],state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})}}),kb=I({name:"mob-navigation-submenu",component:Gd,isolateOnMount:!0,isolateCreation:!0,exportState:["children","headerButton","isOpen","callback"],state:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})}}),Rb=I({name:"mob-navigation-button",type:"button",component:qd,exportState:["label","url","arrowClass","subMenuClass","fireRoute","callback","isOpen","scrollToSection"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),scrollToSection:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean})}}),Pb=I({name:"mob-navigation-label",component:Ud,exportState:["label","sectioName"],state:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String})}});var Jd=({html:e,onMount:t})=>(t(({refs:r})=>{window.scrollTo(0,0);let{side:o}=r;o.classList.add("active")}),e`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side" ref="side">
                <doc-scroll></doc-scroll>
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `);var Ab=I({name:"doc-container",component:Jd});var Yd=({html:e})=>e`
        <div class="c-doc-title">
            <h2><mobjs-slot /></h2>
        </div>
    `;var _b=I({name:"doc-title",component:Yd,state:{}});var Xd=({html:e})=>e`
        <div class="c-doc-title-small">
            <mobjs-slot />
        </div>
    `;var Ob=I({name:"doc-title-small",component:Xd,state:{}});var Kd=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg width="1200" height="980" version="1.1" viewBox="0 0 317.5 259.29" xmlns="http://www.w3.org/2000/svg">
 <path d="m82.777 196.81 0.04201-1.6119 65.328 35.861-3.9842 0.28156z" fill="#679138"/>
 <g>
  <path d="m82.684 193.66-24.746 4.1152 50.205 48.047 80.357 18.064 0.58008-2.582-79.641-17.902-46.581-43.607 19.959-4.6029 121.13 66.812 1.2559-2.3281z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m63.402 202.94-2.7953 16.491 36.959 39.379 80.752 2.918 0.0137 0.10156 0.68945-0.0977-0.13867-2.6309-80.133-2.8965-36.254-36.861 2.1846-11.659 43.266 37.944 1.6914-2.0352z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m170.92 223.54-4.0976 9.0078 1.4239 1.2379 3.8222-8.1363 36.371 6.6265 14.486 4.7988-4.4995-4.8896-8.6653-2.5226z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m184.36 218.49-5.5636 6.4433 2.0584 0.6014 4.309-5.05 26.675 7.6553 13.745 17.417-6.3872 4.2907 1.2559 3.4121 1.8008-0.66407-0.68945-1.8691 6.3965-3.5586-13.723-21.125z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m35.473 166.01-16.016 1.7363-39.809 45.324 28.905-39.173-11.879-0.18164-173.8 88.117 0.61914 2.502 193.58-2.9004-0.0059-0.37109c0.4768 0.42118 2.0535 1.8816 2.3105 2.0957l1.6934-2.0332c-1.4101-1.1744-8.5557-7.6939-15.211-13.807-6.2499-5.7405-11.438-10.535-12.135-11.178zm-6.0401 4.3716-39.079 66.251 0.78711 0.72656s6.269 5.7922 12.928 11.908c4.5809 4.2075 7.479 6.8074 10.531 9.5566l-185.43 2.7793 167.14-85.105 7.0527-0.0362-38.539 52.109 2.0469 1.6699 53.879-59.975z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m27.087 205.5-17.999 1.2065-0.62774 1.5525 17.668-0.69577 18.445 34.536-28.138 16.842 1.2383 2.3379 31.598-16.74z" color="#000000" style="-inkscape-stroke:none"/>
 </g>
 <g>
  <path d="m308.91 262.8c-3.7734-1.0583-92.499-32.951-92.499-32.951l-4.6535 4.0576-15.385 6.9598-4.4338 9.0258-29.328-20.186-66.174 5.0788 8.5106 7.0647-19.764 9.3302-24.362 11.195-16.604-16.262-49.121-5.8524-29.204-10.902s-9.6718-15.155-10.656-14.931c-0.98444 0.22427-83.131 16.984-83.131 16.984l-239.72 47.353z"/>
  <path d="m132.87 232.26c0-0.78961-0.26303-10.354-0.26303-10.354l1.3093-0.56359 25.47 8.6587z"/>
  <path d="m60.606 219.43 0.9847 3.7105 9.3217 10.839 2.2749-1.1724z" fill="#9ece6a"/>
  <path d="m62.495 219.35 2.1846-11.659 0.18885 3.1177-1.2356 9.8154z" fill="#9ece6a"/>
  <path d="m64.869 210.8-0.18885-3.1177 39.283 34.624-1.1243 0.55476z" fill="#679138"/>
  <path d="m54.572 244.27 0.75484 4.1206-0.1956 8.6305-1.6208-1.8673z" fill="#9ece6a"/>
  <path d="m54.572 244.27 19.592-10.447-0.10361 1.7638-18.733 12.803z" fill="#679138"/>
  <path d="m74.06 235.58 0.10361-1.7638 14.721 15.663-2.1186 0.97175z" fill="#557333"/>
 </g>
 <path d="m74.241 232.25-21.461 10.672-3.3086 15.23 3.5332 1.14 1.5671-15.028 20.175-10.739z" color="#000000" style="-inkscape-stroke:none"/>
 <g>
  <path d="m168.36 233.55 3.7046-7.9083 0.0681 2.8506-2.8602 5.6838z" fill="#9ece6a"/>
  <path d="m172.07 225.65 0.0681 2.8506 35.817 5.4851 0.48528-1.7091z" fill="#679138"/>
  <path d="m207.95 233.98 0.48528-1.7091 4.3418 1.372-2.8874 1.1447z" fill="#557333"/>
  <path d="m181.24 225.06 3.9256-4.5767-0.0899 1.8923-2.7391 2.851z" fill="#9ece6a"/>
  <path d="m185.17 220.49-0.0899 1.8923 26.682 7.274 0.0821-1.511z" fill="#679138"/>
  <path d="m211.76 229.65 0.0821-1.511 2.2345 2.7987-1.3019-0.39007z" fill="#557333"/>
  <path d="m57.938 197.78 1.8028 4.9778 3.1253 3.3876 0.53516-3.2z" fill="#9ece6a"/>
  <path d="m62.86 199.8 19.959-4.6029-0.04201 1.6119-17.983 4.804z" fill="#9ece6a"/>
  <path d="m35.473 166.01-24.198 40.594 1.8576-0.15949s21.242-33.389 21.242-33.891 1.0989-6.5433 1.0989-6.5433z" fill="#679138"/>
  <path d="m-32.796 229.84 53.547-59.576 0.074 2.2742-51.086 58.302z" fill="#679138"/>
  <path d="m20.825 172.54-0.074-2.2742 8.6825 0.11383-1.2578 2.1067z" fill="#9ece6a"/>
  <path d="m10.37 208.18-0.04034 2.2909 15.534-0.0406 0.26409-2.8647z" fill="#9ece6a"/>
  <path d="m25.863 210.43 0.26409-2.8646 18.445 34.536-2.8 1.7541z" fill="#557333"/>
  <path d="m-6.2746 236.14 16.644-27.963-0.04034 2.2909-15.82 26.395z" fill="#679138"/>
  <path d="m8.5536 173.9-28.905 39.173 9.1887-10.463 18.778-24.834z" fill="#557333"/>
  <path d="m-101.22 226.05c0.78197-0.1659 97.53-49.548 97.53-49.548l-0.051849 1.8488-87.094 45.517z" fill="#679138"/>
  <path d="m-3.6886 176.5 7.0527-0.0362-1.3412 1.8136-5.7633 0.0714z" fill="#9ece6a"/>
 </g>
</svg>
`;var Zd=({html:e,onMount:t})=>(t(({refs:r})=>{let{shape:o}=r;c.useFrame(()=>{o.classList.add("active")})}),e`
        <div>
            <div class="shape shape-left" ref="shape">${Kd}</div>
        </div>
    `);var Qd=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg width="1200" height="980" version="1.1" viewBox="0 0 317.5 259.29" xmlns="http://www.w3.org/2000/svg">
 <g stroke="#050a00" stroke-width=".26458">
  <circle cx="349.6" cy="88.869" r="0"/>
  <circle cx="349.6" cy="88.869" r="0"/>
  <circle cx="328.35" cy="134.83" r="0"/>
  <circle cx="328.35" cy="134.83" r="0"/>
 </g>
 <g>
  <path d="m28.238 260.65c-0.3255 0.16275-0.51902 0.26769-0.65039 0.33008-0.13137 0.0624-0.18876 0.0806-0.28125 0.0859-0.18498 0.0106-0.52913-0.0566-1.5918-0.0566v0.26562c1.0513 0 1.3511 0.0692 1.6055 0.0547 0.12717-7e-3 0.23675-0.0409 0.38086-0.10937 0.14411-0.0684 0.33415-0.17294 0.65625-0.33399z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m310.35 166.43-7.3691 62.881-27.609-59.113-4.5762 18.93 12.809 41.584-70.994 9.0293 12.928-35.07-13.283-16.855-43.551 52.678-149.17 21.092-0.05908 1.3297 151.31-18.709 41.539-53.535 11.163 13.853-16.858 39.979 79.667-11.777-12.592-43.73 2.8412-12.804 27.836 60.329z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m197.13 168.51-66.23 68.701-37.824 9.0859-9.748 7.498 4.5071-0.14014 6.1497-5.7814 40.043-8.7697 63.648-68.76 17.923 4.5515-47.499 66.341 3.2832 2.2285 47.131-69.373z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m217.78 221.83-1.0602 2.8922-5.3592 16.696 26.127-3.6632 1.2513-0.13012-7.793-10.664z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m234.6 220.01-10.734 5.2285 1.1555 0.82552 9.7291-4.7741 30.012 14.566 1.0449-2.4316z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m278.47 211.23c-0.44002 0.79881-2.1458 3.4295-3.6797 5.7402-1.5339 2.3107-2.9375 4.3828-2.9375 4.3828l-0.15429 0.22851-2.4277 12.953 2.6016 0.48633 11.734-4.3066-3.6106-17.251z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m293.47 211.58 0.38623 1.6573 9.9539 19.148 0.40184-11.901 1.5538-2.6361-3.173-5.862z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m143.85 219.82-28.883 9.0996-5.2683 14.921 2.7452-0.80307 3.8192-12.988 27.016-8.9112 3.7966 3.6554 0.20933-1.1297z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m114.94 231.78-8.0801 1.7832-4.4726 11.346 2.9244-0.34294 3.124-9.5391 6.7445-1.9711z" color="#000000" style="-inkscape-stroke:none"/>
 </g>
 <path d="m170.78 244.21 41.539-53.535-0.15507 4.9649-40.194 52.31z" fill="#9ece6a"/>
 <path d="m212.32 190.67 11.163 13.853-0.67945 1.7456-10.639-10.634z" fill="#679138"/>
 <path d="m90.208 251.45 3.7785-3.5747 0.41947 2.113-2.4378 1.4327z" fill="none"/>
 <g>
  <path d="m89.968 251.64 4.019-3.7664 0.41947 2.113-2.2712 1.3366z" fill="#9ece6a"/>
  <path d="m170.78 244.21-151.31 18.709 0.71397 0.24358 151.78-15.212z" fill="#679138"/>
  <path d="m93.987 247.87 40.043-8.7697 1.1594 4.3959-40.782 6.4868z" fill="#679138"/>
  <path d="m134.03 239.1 63.648-68.76-0.0532 1.9678-62.436 71.188z" fill="#9ece6a"/>
  <path d="m197.68 170.34 17.923 4.5515-1.9266 2.6452-16.05-5.2289z" fill="#679138"/>
  <path d="m195.05 208.63 23.468-34.538-0.74405 4.7424-9.8705 14.251z" fill="#679138"/>
  <path d="m105.68 243.3 2.7624-8.277 0.47214 3.1386-1.179 4.6217z" fill="#9ece6a"/>
  <path d="m108.44 235.02 0.47214 3.1386 3.2422-1.2584 1.1871-3.3025z" fill="#679138"/>
  <path d="m112.82 241.58 3.4403-11.529 0.47997 3.3183-2.2256 7.8212z" fill="#9ece6a"/>
  <path d="m116.26 230.05 27.016-8.9112-0.12467 1.8196-26.412 10.41z" fill="#679138"/>
  <path d="m143.15 222.96 0.12467-1.8196 1.7204 1.5876-1.0987 1.0933z" fill="#5d8134"/>
  <path d="m88.589 252.15 3.8635-4.0612 40.853-10.409s10.878-10.55 11.209-9.8636 6.0888 9.1762 6.0888 9.1762l-0.25942 6.2472z"/>
  <path d="m20.19 263.16s139.43-18.876 140.44-17.708c1.0063 1.1678 30.598 11.871 30.598 11.871l81.055 2.563-252.81 3.0307z"/>
  <path d="m225.54 204.67 0.27622 5.6959-3.5352 13.215-3.3032-1.2151z" fill="#9ece6a"/>
  <path d="m188.15 250.63 22.866-16.093-4.3844 9.9674 8.963-1.7121 79.754-11.446-7.9309 28.585-105.52-0.41444z"/>
  <path d="m226.57 225.28 8.1764-3.991 0.21868 2.5082c0.23141-0.13735-5.8475 2.4693-5.8475 2.4693z" fill="#9ece6a"/>
  <path d="m234.75 221.29 0.21868 2.5082 21.476 10.391 3.8514-0.49969z" fill="#679138"/>
  <path d="m286.29 232.72-12.592-43.73 1.3618 2.7028 13.212 40.662z" fill="#9ece6a"/>
  <path d="m273.7 188.99 2.8412-12.804 0.6558 1.5479-2.1352 13.959z" fill="#679138"/>
  <path d="m294.71 211.63-19.337-41.432 1.9924 2.4302 20.698 39.175z" fill="#9ece6a"/>
  <path d="m310.35 166.43-5.9721 70.09 2.4397-3.553 3.8425-62.614z" fill="#679138"/>
  <path d="m297.59 221.53-2.2429 9.8127-16.908 22.668-27.062 5.848 66.693-0.21851 68.105 1.38-59.426-26.716-20.351-25.308-2.0067 25.574z"/>
 </g>
</svg>
`;var eh=({html:e,onMount:t})=>(t(({refs:r})=>{let{shape:o}=r;c.useFrame(()=>{o.classList.add("active")})}),e`
        <div>
            <div class="shape shape-right" ref="shape">${Qd}</div>
        </div>
    `);var Lb=I({name:"shape-right",component:eh}),Fb=I({name:"shape-left",component:Zd});var je=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in window&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},ze=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},He=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},yt=e=>"roundRect"in e,th=(e,t,r,o,n,s)=>{o<2*s&&(s=o/2),n<2*s&&(s=n/2),e.beginPath(),e.moveTo(t+s,r),e.arcTo(t+o,r,t+o,r+n,s),e.arcTo(t+o,r+n,t,r+n,s),e.arcTo(t,r+n,t,r,s),e.arcTo(t,r,t+o,r,s),e.closePath()},Qr=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>[...new Array(t*r+t).keys()].reduce(i=>{let{row:a,col:l,items:p}=i,u=l<r?l+1:0,m=u===0?a+1:a,h=(o+s)*u,f=(n+s)*m;return{row:m,col:u,items:[...p,{width:o,height:n,x:h,y:f,centerX:h+o/2,centerY:f+n/2,offsetXCenter:dr({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:hr({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},{row:0,col:-1,items:[]}),dr=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2-t/2,hr=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2-t/2;var rh=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a,stagger:l,reorder:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:a}),h=!0,f=[],T=[],y={},w={},x=e.getContext(m,{alpha:!1}),C="#000",P="#fff",{activeRoute:M}=O.get(),{offscreen:_,offScreenCtx:k}=ze({useOffscreen:u,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,f=Qr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,T=p?f.map((L,G)=>({...L,scale:1,rotate:0,hasFill:i.includes(G)})).sort(L=>L.hasFill?-1:1).reverse():f.map((L,G)=>{let ne=i.includes(G);return{...L,scale:1,rotate:0,hasFill:ne}}),y=Z.createTween({ease:"easeInOutQuad",stagger:l,data:{scale:1,rotate:0}}),T.forEach(L=>{y.subscribeCache(L,({scale:G,rotate:ne})=>{L.rotate=ne,L.scale=G})});let V=()=>{if(!x)return;u&&(_.width=e.width,_.height=e.height);let L=u?k:x;L.fillStyle="#1a1b26",L.fillRect(0,0,e.width,e.height),T.forEach(({x:G,y:ne,centerX:j,centerY:N,width:v,height:S,rotate:R,scale:A,hasFill:B,offsetXCenter:J,offsetYCenter:Q})=>{let Ie=Math.PI/180*R,ae=Math.cos(Ie)*A,he=Math.sin(Ie)*A;L.setTransform(ae,he,-he,ae,Math.round(j+J),Math.round(N+Q)),L.beginPath(),L.rect(Math.round(-j+G),Math.round(-N+ne),v,S),L.fillStyle=B?P:C,L.fill(),L.setTransform(1,0,0,1,0,0)}),He({useOffscreen:u,offscreen:_,ctx:x})};w=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).label({name:"label1"}).goTo(y,{scale:1.5,rotate:90},{duration:1e3}).goTo(y,{scale:.5},{duration:500}).goTo(y,{rotate:180,scale:1.2},{duration:500}).goTo(y,{scale:1.3},{duration:500}).goTo(y,{scale:1},{duration:1200}),w.onLoopEnd(({direction:L,loop:G})=>{console.log(`loop end: ${L}, ${G}`)}),w.play();let q=()=>{V(),h&&c.useNextFrame(()=>q())};c.useFrame(({time:L})=>{q({time:L})});let W=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T.forEach(L=>{let{width:G,height:ne,gutter:j,numberOfColumn:N}=L;L.offsetXCenter=dr({canvasWidth:e.width,width:G,gutter:j,numberOfColumn:N}),L.offsetYCenter=hr({canvasHeight:e.height,height:ne,gutter:j,numberOfRow:t})}),c.useFrame(()=>V())}),Y=$.watch("openNavigation",()=>{w?.stop(),h=!1}),D=$.watch("closeNavigation",()=>setTimeout(async()=>{h=!0;let{activeRoute:L}=O.get();L===M&&(w?.play(),c.useFrame(()=>q()))},500));return()=>{y.destroy(),w.destroy(),W(),D(),Y(),y=null,w=null,x=null,_=null,k=null,f=[],T=[],h=!1}};var oh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(re.mq("max","desktop"))return;let{wrap:a,canvas:l}=i,p=rh({canvas:l,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{p()}});let{animatedPatternN0:n}=ye(),{source:s}=n;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Db=I({name:"animatedpattern-n0",component:oh,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(Re()||se())}});var nh=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a})=>{let{useOffscreen:l,context:p}=je({disableOffcanvas:a}),u=!0,m=[],h=[],f={},T={},y={},{top:w,left:x}=ie(e),C=e.getContext(p,{alpha:!1}),P="#000",M="#fff",{activeRoute:_}=O.get(),{offscreen:k,offScreenCtx:V}=ze({useOffscreen:l,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,m=Qr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,h=m.map((N,v)=>({...N,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(v)})).sort(N=>N.hasFill?-1:1),f=Z.createLerp({data:{mouseX:0,mouseY:0}}),h.forEach(N=>{f.subscribeCache(N,({mouseX:v,mouseY:S})=>{N.mouseX=v,N.mouseY=S})}),T=Z.createTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}}),h.forEach(N=>{T.subscribeCache(N,({scale:v})=>{N.scale=v})});let q=()=>{if(!C)return;l&&(k.width=e.width,k.height=e.height);let N=l?V:C;N.fillStyle="#1a1b26",N.fillRect(0,0,e.width,e.height),h.forEach(({x:v,y:S,centerX:R,centerY:A,width:B,height:J,mouseX:Q,mouseY:Ie,scale:ae,hasFill:he,offsetXCenter:Me,offsetYCenter:De})=>{let Le=Q-(e.width-(B+s)*r)/2,Ge=Ie-(e.height-(J+s)*t)/2,Je=(v-Le)/250,vt=(S-Ge)/250,St=Math.sqrt(Math.pow(Math.abs(Je),2)+Math.pow(Math.abs(vt),2)),Jt=Oe(Math.abs(St),0,2),to=0,qe=Math.cos(to)*(Jt+ae),Fo=Math.sin(to)*(Jt+ae);N.setTransform(qe,Fo,-Fo,qe,Math.round(R+Me),Math.round(A+De)),N.beginPath(),N.rect(Math.round(-R+v),Math.round(-A+S),B,J),N.fillStyle=he?M:P,N.fill(),N.setTransform(1,0,0,1,0,0)}),He({useOffscreen:l,offscreen:k,ctx:C})};y=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).goTo(T,{scale:.3},{duration:1e3}),y.play();let W=({x:N,y:v})=>{f.goTo({mouseX:N-x,mouseY:v-w})},Y=c.useMouseMove(({client:N})=>{let{x:v,y:S}=N;W({x:v,y:S})}),D=c.useTouchMove(({client:N})=>{let{x:v,y:S}=N;W({x:v,y:S})}),L=()=>{q(),u&&c.useNextFrame(()=>L())};c.useFrame(({time:N})=>{L({time:N})});let G=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,w=ie(e).top,x=ie(e).left,h.forEach(N=>{let{width:v,height:S,gutter:R,numberOfColumn:A}=N;N.offsetXCenter=dr({canvasWidth:e.width,width:v,gutter:R,numberOfColumn:A}),N.offsetYCenter=hr({canvasHeight:e.height,height:S,gutter:R,numberOfRow:t})}),c.useFrame(()=>q())}),ne=$.watch("openNavigation",()=>{y?.stop(),u=!1}),j=$.watch("closeNavigation",()=>setTimeout(async()=>{u=!0;let{activeRoute:N}=O.get();N===_&&(y?.play(),c.useFrame(()=>L()))},500));return()=>{T.destroy(),y.destroy(),f.destroy(),G(),Y(),D(),j(),ne(),T=null,y=null,f=null,C=null,k=null,V=null,m=[],h=[],u=!1}};var sh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(re.mq("max","desktop"))return;let{wrap:a,canvas:l}=i,p=nh({canvas:l,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{p()}});let{animatedPatternN1:n}=ye(),{source:s}=n;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Vb=I({name:"animatedpattern-n1",component:sh,isolateCreation:!0,isolateOnMount:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","disableOffcanvas"],state:{numberOfRow:7,numberOfColumn:15,cellWidth:70,cellHeight:70,gutter:10,fill:[21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,66],disableOffcanvas:!!(Re()||se())}});function $b({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function Wb({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var ih=({canvas:e,amountOfPath:t,width:r,height:o,fill:n,stroke:s,opacity:i,spacerY:a,intialRotation:l,perpetualRatio:p,mouseMoveRatio:u,disableOffcanvas:m})=>{let{useOffscreen:h,context:f}=je({disableOffcanvas:m}),T=!0,y=e.getContext(f,{alpha:!1}),w=[],x=[],C={},{left:P}=ie(e),{activeRoute:M}=O.get(),{offscreen:_,offScreenCtx:k}=ze({useOffscreen:h,canvas:e}),V=h?k:y,q=yt(V)&&!se();V=null,e.width=e.clientWidth,e.height=e.clientHeight,w=[...new Array(t).keys()].map((v,S)=>{let R=S,A=R<t/2?t-R:R,B=A-(t-A);return{width:Math.floor($b({width:r,relativeIndex:B,amountOfPath:t})),height:Math.floor(Wb({height:o,relativeIndex:B,amountOfPath:t})),fill:n,stroke:s,opacity:B*i,rotate:0,y:0,relativeIndex:B,index:S}}),x=w.splice(0,w.length/2).concat(w.reverse()),C=Z.createSpring({data:{rotate:0,y:0},stagger:{each:5,from:"center"}}),[...x].forEach(v=>{C.subscribeCache(v,({rotate:S})=>{v.rotate=S})});let W=({time:v=0})=>{if(!y)return;h&&(_.width=e.width,_.height=e.height);let S=h?k:y,R=e.width/2,A=e.height/2;S.fillStyle="#1a1b26",S.fillRect(0,0,e.width,e.height),x.forEach(({width:B,height:J,opacity:Q,rotate:Ie,relativeIndex:ae,index:he})=>{let Me=Math.sin(v/1e3)*p*ae,De=he<t/2?Me+15*ae/2:-Me-15*ae/2,Le=he<t/2?-1:1,Ge=1,Je=Math.PI/180*(Ie-l),vt=Math.cos(Je)*Ge,St=Math.sin(Je)*Ge;S.setTransform(vt,St,-St,vt,R,A+J/2),q?(S.beginPath(),S.roundRect(-(B*Le)/2,-J/2+De+a(he<t/2),B,J,[200,0])):(S.beginPath(),S.rect(-(B*Le)/2,-J/2+De+a(he<t/2),B,J)),S.strokeStyle=`rgba(255, 255, 255, ${Q})`,S.fillStyle=`rgba(26, 27, 38, ${Q})`,S.stroke(),S.fill(),S.setTransform(1,0,0,1,0,0)}),He({useOffscreen:h,offscreen:_,ctx:y})},Y=({time:v=0})=>{W({time:v}),T&&c.useNextFrame(({time:S})=>Y({time:S}))};c.useFrame(({time:v})=>{Y({time:v})});let D=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,P=ie(e).left,c.useFrame(({time:v})=>{W({time:v})})}),L=({x:v})=>{let S=v-e.width/2-P;C.goTo({rotate:S/u})},G=c.useMouseMove(({client:v})=>{let{x:S}=v;L({x:S})}),ne=c.useTouchMove(({client:v})=>{let{x:S}=v;L({x:S})}),j=$.watch("openNavigation",()=>{T=!1}),N=$.watch("closeNavigation",()=>{setTimeout(()=>{T=!0;let{activeRoute:v}=O.get();v===M&&c.useFrame(({time:S})=>Y({time:S}))},500)});return()=>{C.destroy(),D(),G(),ne(),N(),j(),y=null,_=null,k=null,C=null,x=[],w=[],T=!1}};var ah=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(re.mq("max","desktop"))return;let{wrap:l,canvas:p}=a,u=ih({canvas:p,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{u()}});let{caterpillarN0:n}=ye(),{source:s}=n,i=se()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Bb=I({name:"caterpillar-n0",component:ah,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","fill","stroke","opacity","spacerY","intialRotation","perpetualRatio","mouseMoveRatio","disableOffcanvas"],state:{amountOfPath:17,width:Re()||se()?30:40,height:Re()||se()?30:40,radius:0,fill:"",stroke:"#fff",opacity:.05,spacerY:e=>e?300:-400,intialRotation:33,perpetualRatio:6,mouseMoveRatio:10,disableOffcanvas:!!(Re()||se())}});var lh=({canvas:e,numItems:t,width:r,height:o,fill:n,opacity:s,radius:i,rotationDuration:a,rotationEach:l,centerEach:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:h}=je({disableOffcanvas:u}),f=!0,T=e.getContext(h,{alpha:!1}),y=[],w={},x={},C={},{top:P,left:M}=ie(e),{activeRoute:_}=O.get(),{offscreen:k,offScreenCtx:V}=ze({useOffscreen:m,canvas:e}),q=m?V:T,W=yt(q)&&!se();q=null,e.width=e.clientWidth,e.height=e.clientHeight,y=[...new Array(t).keys()].map((S,R)=>{let A=R>=t/2?t/2+(t/2-R):R,B=n.includes(R)?1:A*s;return{width:A*r,height:A*o,x:0,y:0,hasFill:n.includes(R),opacity:B,radius:i,rotate:0,relativeIndex:A}}),w=Z.createTween({data:{rotate:0},stagger:{each:l,from:"center"},ease:"easeLinear",relative:!0}),[...y].forEach(S=>{w.subscribeCache(S,({rotate:R})=>{S.rotate=R})}),x=Z.createSpring({data:{x:0,y:0},stagger:{each:p,from:"end"}}),[...y].forEach(S=>{x.subscribeCache(S,({x:R,y:A})=>{S.x=R,S.y=A})});let Y=()=>{if(!T)return;m&&(k.width=e.width,k.height=e.height);let S=m?V:T;S.fillStyle="#1a1b26",S.fillRect(0,0,e.width,e.height),y.forEach(({width:R,height:A,x:B,y:J,opacity:Q,rotate:Ie,hasFill:ae},he)=>{let Me=y.length-he,De=e.width/2,Le=e.height/2,Ge=1,Je=Math.PI/180*Ie,vt=Math.cos(Je)*Ge,St=Math.sin(Je)*Ge;S.setTransform(vt,St,-St,vt,De+B+Me*B/20,Le+J+Me*J/20),W?(S.beginPath(),S.roundRect(Number.parseInt(-R/2),Number.parseInt(-A/2),R,A,[200,0])):(S.beginPath(),S.rect(Number.parseInt(-R/2),Number.parseInt(-A/2),R,A)),ae?S.fillStyle="rgba(255, 255, 255, 1)":(S.fillStyle=`rgba(26, 27, 38, ${Q})`,S.strokeStyle=`rgba(255, 255, 255, ${Q})`,S.stroke()),S.fill(),S.setTransform(1,0,0,1,0,0)}),He({useOffscreen:m,offscreen:k,ctx:T})};C=Ne.createAsyncTimeline({repeat:-1,yoyo:!1}),C.goTo(w,{rotate:360},{duration:a}),C.play();let D=()=>{Y(),f&&c.useNextFrame(()=>D())};c.useFrame(()=>D());let L=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,P=ie(e).top,M=ie(e).left,Y()}),G=({x:S,y:R})=>{let A=window.innerWidth,B=window.innerHeight,J=S-e.width/2-M,Q=R-e.height/2-P;x.goTo({x:Oe(J,-A/2+400+M,A/2-400-M),y:Oe(Q,-B/2+200+P,B/2-200-P)})},ne=c.useMouseMove(({client:S})=>{let{x:R,y:A}=S;G({x:R,y:A})}),j=c.useTouchMove(({client:S})=>{let{x:R,y:A}=S;G({x:R,y:A})}),N=$.watch("openNavigation",()=>{f=!1,C?.pause()}),v=$.watch("closeNavigation",()=>setTimeout(()=>{f=!0;let{activeRoute:S}=O.get();S===_&&(C?.resume(),c.useFrame(()=>D()))},500));return()=>{w.destroy(),x.destroy(),C.destroy(),L(),ne(),j(),N(),v(),w=null,x=null,C=null,T=null,k=null,V=null,y=[],f=!1}};var ch=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(re.mq("max","desktop"))return;let{wrap:l,canvas:p}=a,u=lh({canvas:p,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{u()}});let{caterpillarN1:n}=ye(),{source:s}=n,i=se()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var jb=I({name:"caterpillar-n1",component:ch,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","fill","opacity","radius","rotationEach","centerEach","rotationDuration","disableOffcanvas"],state:{numItems:20,width:40,height:40,fill:[14],opacity:.05,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:!!(Re()||se())}});var Ei=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},uh=({canvas:e,numItems:t,width:r,height:o,radius:n,fill:s,opacity:i,xAmplitude:a,yAmplitude:l,duration:p,friction:u,rotationDefault:m,disableOffcanvas:h})=>{let{useOffscreen:f,context:T}=je({disableOffcanvas:h}),y=!0,w=e.getContext(T,{alpha:!1}),x=[],C=m,{activeRoute:P}=O.get(),{offscreen:M,offScreenCtx:_}=ze({useOffscreen:f,canvas:e}),k=f?_:w,V=yt(k)&&!se();k=null,x=[...new Array(t).keys()].map((j,N)=>{let v=N>=t/2?t/2+(t/2-N):N,S=r+r/3*v,R=o+o/3*v,A=s.includes(N)?1:(t-N)*i;return{width:S,height:R,x:0,y:0,hasFill:s.includes(N),opacity:A,radius:n,rotate:0}}),e.width=e.clientWidth,e.height=e.clientHeight;let q=Z.createSequencer({stagger:{each:6},data:{x:p/4,rotate:0},duration:p}).goTo({x:p+p/4},{start:0,end:p,ease:"easeLinear"}).goTo({rotate:()=>-C},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:p,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:j,direction:N})=>{Ei({isForced:j,direction:N,value:1})},1).add(({isForced:j,direction:N})=>{Ei({isForced:j,direction:N,value:5})},5).add(({isForced:j,direction:N})=>{Ei({isForced:j,direction:N,value:9})},9);x.forEach(j=>{q.subscribeCache(j,({x:N,rotate:v})=>{let S=N/u,R=2/(3-Math.cos(2*S)),A=R*Math.cos(S)*a,B=R*Math.sin(2*S)/2*l;j.x=A,j.y=B,j.rotate=v})});let W=Ne.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(q);W.onLoopEnd(({loop:j,direction:N})=>{console.log(`loop end: ${j} , ${N}`)});let Y=()=>{if(!w)return;f&&(M.width=e.width,M.height=e.height);let j=f?_:w;j.fillStyle="#1a1b26",j.fillRect(0,0,e.width,e.height),x.forEach(({width:N,height:v,x:S,y:R,radius:A,rotate:B,hasFill:J,opacity:Q})=>{let Ie=e.width/2,ae=e.height/2,he=1,Me=Math.PI/180*B,De=Math.cos(Me)*he,Le=Math.sin(Me)*he;j.setTransform(De,Le,-Le,De,Ie+S,ae+R),V?(j.beginPath(),j.roundRect(Number.parseInt(-N/2),Number.parseInt(-v/2),N,v,[150,0])):(j.beginPath(),j.rect(Number.parseInt(-N/2),Number.parseInt(-v/2),N,v,A)),J?j.fillStyle="rgba(255, 255, 255, 1)":(j.fillStyle=`rgba(26, 27, 38, ${Q})`,j.strokeStyle=`rgba(255, 255, 255, ${Q})`,j.stroke()),j.fill(),j.setTransform(1,0,0,1,0,0)}),He({useOffscreen:f,offscreen:M,ctx:w})},D=()=>{Y(),y&&c.useNextFrame(()=>D())};c.useFrame(()=>D()),W.play();let L=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,Y()}),G=$.watch("openNavigation",()=>{y=!1,W?.pause()}),ne=$.watch("closeNavigation",()=>setTimeout(()=>{y=!0;let{activeRoute:j}=O.get();j===P&&(W?.resume(),c.useFrame(()=>D()))},500));return{destroy:()=>{y=!1,L(),G(),ne(),q.destroy(),W.destroy(),w=null,M=null,_=null,x=[]},play:()=>{W.stop(),W.play()},playReverse:()=>{W.stop(),W.playReverse()},playUseCurrent:()=>W.play({useCurrent:!0}),playReverseUseCurrent:()=>W.playReverse({useCurrent:!0}),playFromLabel:()=>{W.stop(),W.playFrom("mylabel")},plaFromLabelReverse:()=>{W.stop(),W.playFromReverse("mylabel")},stop:()=>W.stop(),pause:()=>W.pause(),resume:()=>W.resume(),reverse:()=>W.reverse(),setRotation:j=>C=j}};function zb({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var ph=({onMount:e,html:t,getState:r,staticProps:o})=>{let{buttons:n,rotationDefault:s}=r();e(({element:p,refs:u})=>{if(re.mq("max","desktop"))return;let{wrap:m,canvas:h,rangeValue:f,rotationButton:T}=u,y=uh({canvas:h,...r()}),{destroy:w,setRotation:x}=y;return Object.entries(n).forEach(([C,P])=>{let{method:M}=P;p.querySelector(`.${C}`).addEventListener("click",()=>y?.[M]())}),T.addEventListener("change",()=>{let C=T.value;x(C),f.textContent=C}),c.useFrame(()=>{m.classList.add("active")}),()=>{w()}});let{caterpillarN2:i}=ye(),{source:a}=i,l=se()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:a.description},{label:"definition",source:a.definition},{label:"component",source:a.component},{label:"animation",source:a.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <ul class="c-canvas__controls">
                    ${zb({buttons:n})}
                    <li class="c-canvas__controls__item">
                        <label class="c-canvas__controls__label">
                            change rotation:
                            <span class="js-range-value" ref="rangeValue"
                                >${s}</span
                            >
                        </label>
                        <div class="c-canvas__controls__range">
                            <input
                                type="range"
                                min="0"
                                max="720"
                                value="${s}"
                                step="1"
                                ref="rotationButton"
                            />
                        </div>
                    </li>
                </ul>
                <div class="c-canvas__wrap ${l}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Hb=10,qb={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},Ub=I({name:"caterpillar-n2",component:ph,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","radius","fill","opacity","xAmplitude","yAmplitude","duration","rotationDefault","friction","disableOffcanvas"],state:{numItems:Re()||se()?20:30,width:80,height:80,radius:0,fill:[2],opacity:.02,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:360,friction:Hb/2/Math.PI,disableOffcanvas:!!(Re()||se()),buttons:()=>({value:qb,type:"Any"})}});var dh=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Generator: Gravit.io -->

<svg
   style="isolation:isolate"
   viewBox="0 0 258.50191 139.49488"
   width="258.50192pt"
   height="139.49487pt"
   version="1.1"
   id="svg314"
   sodipodi:docname="logo2.svg"
   inkscape:version="1.1.1 (3bf5ae0d25, 2021-09-20)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview316"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:document-units="pt"
     showgrid="false"
     inkscape:zoom="2.8284271"
     inkscape:cx="179.7819"
     inkscape:cy="112.42998"
     inkscape:window-width="1920"
     inkscape:window-height="1011"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="block10" />
  <defs
     id="defs195">
    <clipPath
       id="_clipPath_VL4lQNFTekCiBlrKs3lIcRmLPUe8LF3L">
      <rect
         width="257.70001"
         height="131.14999"
         id="rect192"
         x="0"
         y="0" />
    </clipPath>
  </defs>
  <g
     inkscape:groupmode="layer"
     id="layer1"
     inkscape:label="background"
     style="display:none"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true">
    <rect
       style="fill:#a0a0b1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.775327"
       id="rect421"
       width="258.50269"
       height="140.24139"
       x="-0.80192417"
       y="-0.34883055" />
  </g>
  <g
     clip-path="url(#_clipPath_VL4lQNFTekCiBlrKs3lIcRmLPUe8LF3L)"
     id="g312"
     transform="translate(0.80192417,0.34883055)">
    <clipPath
       id="_clipPath_2R05YMjZbD0UgsZZwA9G1NSyA91KCKEh">
      <rect
         x="0"
         y="0"
         width="257.70001"
         height="131.14999"
         fill="#ffffff"
         id="rect199" />
    </clipPath>
    <g
       clip-path="url(#_clipPath_2R05YMjZbD0UgsZZwA9G1NSyA91KCKEh)"
       id="g294">
      <g
         id="g292">
        <g
           id="g274">
          <g
             id="g272">
            <g
               id="g206" />
            <g
               id="g214" />
            <g
               id="g228" />
            <g
               id="g234" />
            <g
               id="g240" />
            <g
               id="g246" />
            <g
               id="g252" />
            <g
               id="g258" />
            <g
               id="g264" />
            <g
               id="g270" />
          </g>
        </g>
      </g>
    </g>
  </g>
  <g
     inkscape:groupmode="layer"
     id="block4"
     inkscape:label="green right c"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block1">
    <path
       d="m 226.941,40.239 -0.675,37.949 2.425,-3.449 q 0.25,-0.437 0.187,-0.937 -0.062,-0.5 -1.937,-33.563 z"
       fill="#000000"
       id="path260"
       style="display:inline;isolation:isolate" />
    <path
       d="M 227.003,40.227 V 75.88 l 2,-2 7,-33.653 z"
       fill="#9ece6a"
       id="path262"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block3"
     inkscape:label="green right b"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block2">
    <path
       d="m 215.972,40.27 -0.281,1.032 7.059,42.932 2.222,-6.839 -0.188,-1.031 z"
       fill="#000000"
       id="path254"
       style="display:inline;isolation:isolate" />
    <path
       d="m 216.003,40.227 7,40.653 2,-4 V 40.227 Z"
       fill="#9ece6a"
       id="path256"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block2"
     inkscape:label="green right a"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block3">
    <path
       d="m 204.253,40.114 -0.125,1.438 q 15.505,46.697 15.669,47.182 l 2.081,-5.245 v -1.375 z"
       fill="#000000"
       id="path248"
       style="display:inline;isolation:isolate" />
    <path
       d="m 204.003,39.88 16,46.154 2,-3.654 -9,-42.5 z"
       fill="#9ece6a"
       id="path250"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block1"
     inkscape:label="green right"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block4">
    <path
       d="M 146.46212,93.889417 178.003,75.38 v -6 l -5,2 1,-6 21,-31 c 3.38867,2.111333 5.05533,3.444667 5,4 -0.018,0.182667 5.982,16.67 18,49.462 l -2,3.538 -6,-3.846 -66.747,14.73873 z"
       fill="#9ece6a"
       id="path202"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccccccc" />
    <path
       d="m 143.256,102.27273 0.52664,1.61634 66.34536,-15.27507 5.75,2.625 -5.625,-3.75 c -22.33127,4.933316 -66.997,14.78373 -66.997,14.78373 z"
       fill="#000000"
       id="path204"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccc" />
    <path
       d="m 169.825,75.638 q -10.737,6.278 -10.831,6.278 0.153,0.014 0.305,0.029 c 19.312,1.818 28.926,2.716 28.843,2.693 z"
       fill="#8ab55d"
       id="path266"
       style="isolation:isolate" />
    <path
       d="m 159.025,81.912 0.772,1.719 3.644,0.258 2.262,-1.336 z"
       fill="#000000"
       id="path288"
       style="isolation:isolate" />
    <path
       d="m 173,71.381 1.063,1.532 3.937,-1.61 0.063,-2.078 z"
       fill="#080000"
       id="path290"
       style="isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block8"
     inkscape:label="green left c"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block5">
    <path
       d="m 56.55,124.505 3.078,1.734 7.75,-2.906 15.82,-31.078 -0.257,-2.297 z"
       fill="#000000"
       id="path230"
       style="display:inline;isolation:isolate" />
    <path
       d="m 83.003,89.88 -16.5,31.539 -10,3 23.5,-33.539 z"
       fill="#9ece6a"
       id="path232"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block7"
     inkscape:label="green left b"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block6">
    <path
       d="m 68.081,120.848 1.36,2.016 9.046,-3.141 0.808,-2.276 9.692,-27.302 -0.093,-2.203 z"
       fill="#000000"
       id="path242"
       style="display:inline;isolation:isolate" />
    <path
       d="m 89.003,87.842 -11,30.038 -10,3 16.32,-31.438 z"
       fill="#9ece6a"
       id="path244"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block6"
     inkscape:label="green left a"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block7">
    <path
       d="m 79.191,117.567 0.75,1.922 8.906,-3.141 5.156,-28.218 0.047,-1.688 z"
       fill="#000000"
       id="path236"
       style="display:inline;isolation:isolate" />
    <path
       d="m 94.003,86.38 -5.437,28.234 -9.422,2.953 10.859,-30.033 z"
       fill="#9ece6a"
       id="path238"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block5"
     inkscape:label="green left"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block8">
    <path
       d="M 91.089733,59.564906 120.93928,78.788936 107.99979,107.81712 90.795969,114.07214 96.003,86.38 l 6,-4 -15.779206,-22.760093 z"
       fill="#9ece6a"
       id="path218"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 90.795969,114.07214 0.460815,1.54784 17.425356,-6.58819 -0.68235,-1.21467 z"
       fill="#0f0000"
       id="path222"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccc" />
    <path
       d="M 86.223794,59.619907 102.054,82.45 101.43222,82.787669 86.552529,60.731257 Z"
       fill="#000000"
       id="path224"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccc" />
    <path
       style="fill:#0f0000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 107.99979,107.81712 c 0,0 12.93949,-29.028186 12.93949,-29.028186 l 0.0463,1.038075 -12.30341,29.204781 z"
       id="path17874" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block9"
     inkscape:label="M-left"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="M_left">
    <path
       d="m 132.60144,68.324268 1.19925,0.711139 L 86.77,78.08 63.36,108.95 70.927966,113.93207 -0.29,131.63 -0.08,87.41 6.4,84.87 l 4.45,3.17 51.11,-15.63 4.47,4.92 59.97,-11.32 7.33,-20.11 7.73,-6.53 -7.65931,29.665407 -1.19925,-0.711139 L 140.35,41.63 134.58,46.49 127.15,66.88 66.07,78.42 61.65,73.56 10.67,89.14 6.26,85.99 0.92,88.09 0.71,130.35 68.424083,113.58302 61.94,109.16 86.2,77.17 Z"
       fill="#ffffff"
       id="path308"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccccccccccccccccccccccccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m -0.29,131.63 12.442143,4.078 73.471952,-12.47364 -14.696129,-9.30229 z"
       id="path24700"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0.971079"
       d="M 74.117472,116.07143 88.55736,82.292835 86.769998,78.080002 63.36,108.95 Z"
       id="path25252"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 88.55736,82.292835 44.89722,-11.478017 0.34611,-1.779411 -47.030692,9.044595 z"
       id="path25254"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 142.26193,39.718831 1.5687,2.320079 -9.57413,29.124739 0.34611,-1.779411 z"
       id="path102660"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 127.15,66.88 7.43,-20.39 5.77,-4.86 -7.74856,26.694268 -46.401437,8.845731 -5.060032,6.590303 -6.816415,1.888909 -5.449455,-3.431757 -6.460677,0.628969 L 58.64704,74.517854 61.65,73.56 l 4.42,4.86 17.015736,-3.221712 z"
       id="path14922"
       sodipodi:nodetypes="cccccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 58.64704,74.517854 3.766384,8.328565 6.460677,-0.628965 5.449457,3.43176 6.816413,-1.888912 -1.283484,1.837883 -5.486064,1.484941 -5.426177,-3.683604 -6.565477,0.34834 z"
       id="path16710"
       sodipodi:nodetypes="cccccccccc" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block10"
     inkscape:label="M-right"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="M_right">
    <path
       d="m 147.516,80.156 47.487,45.724 -2,4 h 62 l -57,-49 -3,3 v 4.154 l -33,-16.154 20,-59 v -7 L 165.688,36.5 165.25,35.25 183,1.85 V 13.04 L 163.23,71.37 194,86.43 v -2.96 l 3.95,-3.95 20.873,17.942 38.877,33.418 h -66.31 l 2.41,-4.82 -46.706,-44.779 z"
       fill="#ffffff"
       id="path208"
       style="isolation:isolate" />
    <path
       d="m 149.122,77.19 -2.356,-2.659 18.047,-36.187 -19.407,36.281 3.212,3.488 z"
       fill="#ffffff"
       id="path210"
       style="isolation:isolate" />
    <path
       d="m 133.43,104.198 1.589,-0.318 16.54,-31.698 -15.873,32.588 -2.878,0.575 z"
       fill="#ffffff"
       id="path278"
       style="isolation:isolate" />
    <path
       d="M 128.37035,79.348672 145.452,35.507 155.871,31.039 144.773,69.258 140.17735,79.053435 154.195,33.047 l -8.07,3.578 z"
       fill="#ffffff"
       id="path298"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 164.78,65.29 -0.32,-0.38 0.76,-0.65 0.33,0.39 5.8,6.87 0.22,3.76 0.03,0.49 -1,0.06 -0.03,-0.5 -0.2,-3.42 z"
       fill="#ffffff"
       id="path306"
       style="isolation:isolate" />
    <path
       d="m 142,74.125 21.969,-42.437 2.594,6.75 -2.761,-4.846 -23.62465,45.461435 z"
       fill="#ffffff"
       id="path276"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 183.80192,13.38883 -0.31998,6.28036 -14.19744,48.810436 -3.26258,-3.870795 z"
       id="path94622"
       transform="translate(-0.80192417,-0.34883055)"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 258.50192,131.22883 -5.22567,4.25823 -59.06214,4.00781 -2.02218,-8.26604 z"
       id="path68566"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 148.6615,82.384643 45.94042,44.024187 -1.90625,3.83703 -44.46532,-46.934067 z"
       id="path72600"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 156.67292,31.387831 -11.098,38.219 4.60965,-9.545491 7.54395,-23.38092 z"
       id="path68384"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 108.12793,127.53083 1.57037,3.87664 9.46967,-1.57305 -1.14705,-3.75459 z"
       id="path46914"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 123.20192,117.45883 1.54995,4.4326 4.59687,-1.46013 -0.57781,-4.84046 z"
       id="path54417"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 128.77093,115.59084 4.95949,-9.92294 0.72197,1.79328 -5.10365,12.97012 z"
       id="path58189"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 133.73042,105.6679 0.72197,1.79328 2.97545,-0.38407 -0.93992,-1.95829 z"
       id="path62263"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 136.48793,105.11883 11.408,-23.489002 0.76557,0.754815 -11.23366,24.692467 z"
       id="path65322"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 146.125,36.625 8.07,-3.578 -14.01765,46.006437 -6.55873,3.124498 -22.37032,43.171535 -1.7713,0.22853 z"
       id="path9034"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 111.2483,125.34947 1.35607,-0.24557 22.00413,-41.706112 4.92465,-2.447944 0.6442,-1.896377 -6.55873,3.1245 z"
       id="path12512"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="M 166.563,38.438 165.688,36.5 182.003,5.88 v 7 l -20,59 27.82452,13.629235 -1.40776,0.299722 -30.07458,-12.03997 -4.26477,-6.369893 -4.4944,1.301645 L 164.813,38.344 146.3228,72.884339 146.3162,67.166374 163.802,33.592 Z"
       id="path22020"
       sodipodi:nodetypes="ccccccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 148.28413,71.521199 1.30188,-2.82046 4.4944,-1.301645 4.26477,6.369893 30.07458,12.03997 1.40776,-0.299723 v 0 l -1.5e-4,0.477398 -1.44158,0.458025 -30.66964,-11.722778 -4.4531,-5.257495 z"
       id="path28971"
       sodipodi:nodetypes="cccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 146.3162,67.166374 -0.46239,0.867793 0.0431,5.741758 0.42584,-0.891586 z"
       id="path36474"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 119.16797,129.83442 4.9773,-9.52463 -0.94335,-2.85096 -0.0923,0.01 9.33888,-19.181722 -14.42759,27.793022 z"
       id="path51124"
       sodipodi:nodetypes="ccccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       d="m 140.484,90.211 -12.515,25.031 -5.569,1.868 10.13564,-20.940641 v 0 L 124.219,115.172 l 3.328,-1.125 z"
       fill="#ffffff"
       id="path296"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 132.53564,96.169359 v 0 L 126.46896,109.01183 117.219,125.731 107.326,127.182 132.60144,68.324268 146.125,36.625 l -36.648,88.953 7.171,-1.055 z"
       fill="#ffffff"
       id="path300"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccccc" />
    <path
       style="color:#000000;fill:#ffffff;-inkscape-stroke:none"
       d="m 133.21875,67.802734 -0.69922,0.15625 -12.66797,2.826172 0.91797,11.494141 3.99414,3.30664 0.85356,0.663188 z m -1.23438,1.042969 -6.61132,16.273438 -0.13086,-0.109375 -3.75,-3.105469 L 120.65234,71.375 Z"
       id="path23708"
       sodipodi:nodetypes="ccccccccccccc" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 131.98437,68.845703 c -0.27047,0 -11.33203,2.529297 -11.33203,2.529297 l 0.29558,3.960799 5.43467,2.371403 2.27682,-0.648195 z"
       id="path24120"
       sodipodi:nodetypes="cccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 120.94792,75.335799 5.43467,2.371403 2.27682,-0.648195 -0.51727,1.205107 -1.78794,0.819675 -5.30456,-2.583075 z"
       id="path32756"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 120.76448,82.281693 0.75208,3.713594 2.12823,3.186817 1.41676,-3.362979 z"
       id="path33282"
       sodipodi:nodetypes="ccccc" />
  </g>
</svg>
`;var ki=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: Gravit.io -->
<svg width="284.24pt" height="233.03pt" style="isolation:isolate" inkscape:version="1.1.1 (3bf5ae0d25, 2021-09-20)" sodipodi:docname="piece-arrow.svg" version="1.1" viewBox="0 0 284.24 233.03" xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
 <sodipodi:namedview bordercolor="#666666" borderopacity="1.0" inkscape:current-layer="layer7" inkscape:cx="162.01632" inkscape:cy="179.9568" inkscape:document-units="pt" inkscape:pagecheckerboard="0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:window-height="1011" inkscape:window-maximized="1" inkscape:window-width="1920" inkscape:window-x="0" inkscape:window-y="0" inkscape:zoom="1.8115459" pagecolor="#ffffff" showgrid="false"/>
 <g inkscape:groupmode="layer" inkscape:label="arrow 1" ref="around" sodipodi:insensitive="true">
  <g style="isolation:isolate">
   <path d="m211.03 87.241-42.935-65.658c-0.194-1.657 6.209-8.036 18.17-9.225q19.63-1.403 36.821 18.292 17.692 22.733 13.584 61.622-2.968 21.509 7.863 25.16l0.509-5.517 8.032-0.505 31.164 34.127-6.421 4.378-39.845-4.648-0.906-7.733 4.397-4.39q-20.026-10.604-14.335-40.928 3.313-29.648-10.952-46.566-13.09-14.289-21.02-7.988-1.506 1.173-2.405 2.79c-4.718 8.494 9.385 25.057 23.908 48.772z"/>
  </g>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="main" ref="around" sodipodi:insensitive="true">
  <path d="m166.44 14.353 78.094 103.08-27.817 85.879-124.74 18.388-91.093-41.101 14-113.5 68-67z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece1" ref="around" sodipodi:insensitive="true">
  <path d="m92.944 223.39 123.56-18.187-2.625 8.25-117.38 12z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece2" ref="around" sodipodi:insensitive="true">
  <path d="m106.56 226.25 106.5-11.505-2.522 6.984-100.99 6.407z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece3" ref="around" sodipodi:insensitive="true">
  <path d="m115.27 229.72 94.158-5.6234-2.513 6.0363-89.099 1.372z" stroke-width=".88056" style="isolation:isolate"/>
 </g>
</svg>
`;var hh=({logoRefs:e,around:t})=>{let r=e.map(p=>{let[u,m]=Object.entries(p)[0];return{key:u,item:m}}),o=Z.createTween({data:{opacity:0,scale:.5,x:-10},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),n=Z.createTween({data:{scale:1,x:0},duration:4e3,ease:"easeInOutQuad",stagger:{each:40,from:"end"}}),s=Z.createTween({data:{scale:.5,opacity:0},duration:1e3,ease:"easeInOutQuad",stagger:{each:4}}),i=Z.createTween({data:{scale:1},duration:4e3,ease:"easeInOutQuad",stagger:{each:20}});r.forEach(({key:p,item:u})=>{n.subscribe(({scale:m,x:h})=>{if(u.style.scale=`${m}`,p!=="M_right"&&p!=="M_left")return;let f=p==="M_right"?-h:h;u.style.translate=`${f}px 0px`})}),r.forEach(({key:p,item:u})=>{o.subscribe(({scale:m,x:h,opacity:f})=>{if(u.style.scale=`${m}`,u.style.opacity=f,p!=="M_right"&&p!=="M_left")return;let T=p==="M_right"?-h:h;u.style.translate=`${T}px 0px`})}),t.forEach(p=>{s.subscribe(({scale:u,opacity:m})=>{p.style.scale=`${u}`,p.style.opacity=m})}),t.forEach(p=>{i.subscribe(({scale:u})=>{p.style.scale=`${u}`})});let a=Ne.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(o,{opacity:1,scale:1,x:0}).goTo(s,{opacity:1,scale:1}).closeGroup(),l=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).createGroup({waitComplete:!1}).goTo(n,{scale:.95,x:.5}).goTo(i,{scale:.95}).closeGroup().createGroup({waitComplete:!1}).goTo(n,{scale:1.05,x:-.5}).goTo(i,{scale:1.05}).closeGroup();return{playIntro:async()=>a.play(),playSvg:()=>l.play(),destroySvg:()=>{l.stop(),n.destroy(),l.destroy(),a.destroy(),s.destroy(),n=null,o=null,i=null,s=null,l=null,a=null}}};var mh=({refs:e})=>{let t=Z.createTween({data:{y:100},duration:500,ease:"easeOutCubic",stagger:{each:10}});return e.forEach(r=>{t.subscribe(({y:o})=>{r.style.translate=`0px ${o}%`})}),{playText:()=>t.goTo({y:0}),destroyText:()=>{t.destroy(),t=null}}};var Yb=async({playText:e,playIntro:t,playSvg:r})=>{e(),await t(),r()},fh=({html:e,onMount:t,staticProps:r})=>{t(({element:s,refs:i})=>{let{textStagger:a,block1:l,block2:p,block3:u,block4:m,block5:h,block6:f,block7:T,block8:y,M_left:w,M_right:x,around:C}=i,{playIntro:P,playSvg:M,destroySvg:_}=hh({element:s,logoRefs:[{block1:l},{block2:p},{block3:u},{block4:m},{block5:h},{block6:f},{block7:T},{block8:y},{M_left:w},{M_right:x}],around:C}),{playText:k,destroyText:V}=mh({refs:a});return Yb({playText:k,playIntro:P,playSvg:M}),()=>{_(),V()}});let{home:o}=ye(),{source:n}=o;return e`<div>
        <code-button
            ${r({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"Logo animation",source:n.logoAnimation},{label:"text animation",source:n.textAnimation}],style:"legend"})}
        >
        </code-button>
        <div class="l-index__content">
            <a class="l-index__item" href="./#mobCore_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Core
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        store & window events
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobJs_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Js
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js component library
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobMotion_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Motion
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js animation library
                    </h2>
                </div>
            </a>
        </div>

        <div class="l-index__top-left">${ki}</div>
        <div class="l-index__logo">${dh}</div>
        <div class="l-index__top-right">${ki}</div>
    </div>`};var Xb=I({name:"home-component",component:fh});var Ri=0,Kb=({indicators:e,setState:t})=>[...e].map((r,o)=>Ut.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,range:"0.1px",animatePin:!0,dynamicStart:{position:"right",value:()=>window.innerWidth+Ri-ot(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t("currentId",-1),t("currentIdFromScroll",o)},onLeaveBack:()=>{t("currentIdFromScroll",o-1)}})),Zb=({pins:e})=>{e.forEach(t=>t.refresh())},Qb=({titles:e})=>[...e].map(t=>Ut.createParallax({item:t,propierties:"x",reverse:!0,range:9})),gh=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},bh=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},yh=({indicators:e,titles:t,nav:r,animatePin:o,setState:n})=>{let s=Kb({indicators:e,setState:n}),i=Qb({titles:t}),a=document.querySelector(".l-navcontainer__side");Ri=ot(a)/2;let l=c.useResize(()=>{Ri=ot(a)/2}),p=new Ro({root:".js-root",container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,animateAtStart:!1,ease:!0,addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",pin:o,animatePin:o,breakpoint:"tablet",children:[...s,...i],onEnter:()=>{gh({nav:r,indicators:e})},onEnterBack:()=>{Zb({pins:s}),gh({nav:r,indicators:e})},onLeave:()=>{bh({nav:r,indicators:e})},onLeaveBack:()=>{bh({nav:r,indicators:e})}});return p.init(),{destroy:()=>{s.forEach(u=>{u?.destroy()}),s=[],i.forEach(u=>{u?.destroy()}),i=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var e0=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...new Array(e).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},t0=({numOfCol:e,setState:t,bindProps:r,staticProps:o,delegateEvents:n})=>[...new Array(e).keys()].map((s,i)=>g`
                <horizontal-scroller-button
                    ${o({id:i})}
                    ${n({click:()=>t("currentId",i)})}
                    ${r({bind:["currentId","currentIdFromScroll"],props:({currentId:a,currentIdFromScroll:l})=>({active:a===i||l===i})})}
                ></horizontal-scroller-button>
            `).join(""),vh=({onMount:e,html:t,getState:r,setState:o,watch:n,staticProps:s,bindProps:i,delegateEvents:a})=>{let{animatePin:l}=r();e(({element:m})=>{if(re.mq("max","desktop"))return;let h=m.querySelectorAll(".js-indicator"),f=m.querySelector(".js-nav"),T=m.querySelectorAll(".js-title h1"),{destroy:y}=yh({indicators:h,titles:T,nav:f,...r(),setState:o});return window.scrollTo(0,0),n("currentId",w=>{if(w===-1)return;let x=m.querySelector(`.shadowClass--section-${w} .shadowClass--in-center`),{top:C}=ie(x),P=Se(x),M=Number.parseInt(w)===0?window.innerHeight+1:C+P-window.innerHeight;lr.to(M,{duration:2e3})}),()=>{y()}});let{horizontalScroller:p}=ye(),{source:u}=p;return re.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <code-button
            ${s({drawers:[{label:"description",source:u.description},{label:"definition",source:u.definition},{label:"scroller",source:u.scroller},{label:"section",source:u.section},{label:"buttons",source:u.buttons},{label:"animation",source:u.animation}],style:"legend",color:"green"})}
        >
        </code-button>
        <ul class="l-h-scroller__nav js-nav">
            ${t0({numOfCol:10,setState:o,bindProps:i,staticProps:s,delegateEvents:a})}
        </ul>
        <div class="l-h-scroller__root js-root">
            <div class="l-h-scroller__container js-container">
                <div class="l-h-scroller__row js-row">
                    ${e0({numOfCol:10,pinIsVisible:!l,staticProps:s})}
                    <section
                        class="l-h-scroller__fakeColumn js-column"
                    ></section>
                </div>
                <div class="l-h-scroller__trigger js-trigger"></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>

        <shape-right></shape-right>
        <shape-left></shape-left>
    </div>`};var r0=I({name:"horizontal-scroller",component:vh,isolateOnMount:!0,isolateCreation:!0,exportState:["currentId","currentIdFromScroll","animatePin"],state:{currentId:()=>({value:0,type:Number}),currentIdFromScroll:()=>({value:0,type:Number}),animatePin:()=>({value:!1,type:Boolean})}});var Sh=({getState:e,watch:t,html:r,onMount:o})=>{let{id:n}=e();return o(({element:s})=>{let i=s.querySelector(".js-nav-button");return t("active",a=>{i.classList.toggle("active",a)}),()=>{}}),r`
        <li>
            <button
                type="button"
                data-id="${n}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${n}
            </button>
        </li>
    `};var o0=I({name:"horizontal-scroller-button",component:Sh,exportState:["id","active"],state:{id:()=>({value:-1,type:Number}),active:()=>({value:!1,type:Boolean})}});var wh=({html:e,getState:t})=>{let{id:r,pinClass:o}=t();return e`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${r}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${o}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${r}</h1>
                </div>
            </div>
        </section>
    `};var n0=I({name:"horizontal-scroller-section",component:wh,exportState:["id","pinClass"],state:{id:()=>({id:-1,type:Number}),pinClass:()=>({id:"",type:String})}});var Th=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i,fill:a,stagger:l,reorder:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:h}=je({disableOffcanvas:u}),f=!0,T=[],y=[],w=Z.createMasterSequencer(),x=e.getContext(h,{alpha:!1}),C="#000",P="#fff",{activeRoute:M}=O.get(),{offscreen:_,offScreenCtx:k}=ze({useOffscreen:m,canvas:e}),V=m?k:x,q=yt(V);V=null,e.width=e.clientWidth,e.height=e.clientHeight,T=Qr({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i}).items,y=p?T.map((v,S)=>({...v,scale:0,rotate:0,hasFill:a.includes(S)})).sort(v=>v.hasFill?-1:1):T.map((v,S)=>({...v,scale:0,rotate:0,hasFill:a.includes(S)}));let W=Z.createStaggers({items:y,stagger:l}),Y=W.map(({item:v,start:S,end:R})=>{let A=v.hasFill?1.1:1,B=Z.createSequencer({data:{scale:0}}).goTo({scale:A},{start:S,end:R,ease:"easeOutBack"}),J=B.subscribe(({scale:Q})=>{v.scale=Q});return w.add(B),{sequencer:B,unsubscribe:J}}),D=()=>{if(!x)return;m&&(_.width=e.width,_.height=e.height);let v=m?k:x;v.fillStyle="#1a1b26",v.fillRect(0,0,e.width,e.height),y.forEach(({x:S,y:R,centerX:A,centerY:B,width:J,height:Q,rotate:Ie,scale:ae,hasFill:he,offsetXCenter:Me,offsetYCenter:De})=>{let Le=Math.PI/180*Ie,Ge=Math.cos(Le)*ae,Je=Math.sin(Le)*ae;v.setTransform(Ge,Je,-Je,Ge,Math.round(A+Me),Math.round(B+De)),th(v,Math.round(-A+S),Math.round(-B+R),J,Q,5),q?(v.beginPath(),v.roundRect(Math.round(-A+S),Math.round(-B+R),J,Q,5)):(v.beginPath(),v.rect(Math.round(-A+S),Math.round(-B+R),J,Q)),v.fillStyle=he?P:C,v.fill(),v.setTransform(1,0,0,1,0,0)}),He({useOffscreen:m,offscreen:_,ctx:x})},L=Ut.createScrollTrigger({trigger:t,propierties:"tween",tween:w,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>Se(t)},ease:!0,easeType:"lerp"});L.init();let G=()=>{D(),f&&c.useNextFrame(()=>G())};c.useFrame(({time:v})=>{G({time:v})});let ne=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,y.forEach(v=>{let{width:S,height:R,gutter:A,numberOfColumn:B}=v;v.offsetXCenter=dr({canvasWidth:e.width,width:S,gutter:A,numberOfColumn:B}),v.offsetYCenter=hr({canvasHeight:e.height,height:R,gutter:A,numberOfRow:r})}),c.useFrame(()=>D())}),j=$.watch("openNavigation",()=>{f=!1}),N=$.watch("closeNavigation",()=>setTimeout(async()=>{f=!0;let{activeRoute:v}=O.get();v===M&&c.useFrame(()=>G())},500));return()=>{ne(),N(),j(),Y.forEach(({sequencer:v,unsubscribe:S})=>{v.destroy(),S()}),Y=[],w.destroy(),w=null,W=[],L.destroy(),L=null,x=null,_=null,k=null,T=[],y=[],f=!1}};var xh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(re.mq("max","desktop"))return;let{wrap:a,canvas:l,canvasScroller:p}=i;window.scrollTo(0,0);let u=Th({canvas:l,canvasScroller:p,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{u()}});let{scrollerN0:n}=ye(),{source:s}=n;return re.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
                >
                </code-button>
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
                ${pr}
            </div>
        </div>
    `};var s0=I({name:"scroller-n0",component:xh,isolateOnMount:!0,isolateCreation:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(Re()||se())}});function i0({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function a0({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var Ch=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:n,radius:s,opacity:i,intialRotation:a,endRotation:l,disableOffcanvas:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:p}),h=!0,f=e.getContext(m,{alpha:!1}),T=[],{activeRoute:y}=O.get(),{offscreen:w,offScreenCtx:x}=ze({useOffscreen:u,canvas:e}),C=u?x:f,P=yt(C)&&!se();C=null,e.width=e.clientWidth,e.height=e.clientHeight,T=[...new Array(r).keys()].map((D,L)=>{let G=L>=r/2?r/2+(r/2-L):L;return{width:Math.floor(i0({width:o,relativeIndex:G,amountOfPath:r})),height:Math.floor(a0({height:n,relativeIndex:G,amountOfPath:r})),opacity:G*i,rotate:0,relativeIndex:G,index:L}});let M=Z.createScrollerTween({from:{rotate:0},to:{rotate:l},stagger:{each:5,from:"center"}});[...T].forEach(D=>{M.subscribeCache(D,({rotate:L})=>{D.rotate=L})});let _=()=>{if(!f)return;u&&(w.width=e.width,w.height=e.height);let D=u?x:f,L=e.width/2,G=e.height/2;D.fillStyle="#1a1b26",D.fillRect(0,0,e.width,e.height),T.forEach(({width:ne,height:j,opacity:N,rotate:v,index:S})=>{let R=T.length/2-S,A=1,B=Math.PI/180*(v-a),J=Math.cos(B)*A,Q=Math.sin(B)*A;D.setTransform(J,Q,-Q,J,L,G+R*19),P?(D.beginPath(),D.roundRect(-ne/2,-j/2+R*19,ne,j,150)):(D.beginPath(),D.rect(Number.parseInt(-ne/2),Number.parseInt(-j/2),ne,j,s)),D.strokeStyle=`rgba(255, 255, 255, ${N})`,D.fillStyle=`rgba(26, 27, 38, ${N})`,D.stroke(),D.fill(),D.setTransform(1,0,0,1,0,0)}),He({useOffscreen:u,offscreen:w,ctx:f})},k=Ut.createScrollTrigger({trigger:t,propierties:"tween",tween:M,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>Se(t)},ease:!0,easeType:"spring"});k.init();let V=({time:D=0})=>{_({time:D}),h&&c.useNextFrame(({time:L})=>V({time:L}))};c.useFrame(({time:D})=>{V({time:D})});let q=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,c.useFrame(()=>{_()})}),W=$.watch("openNavigation",()=>{h=!1}),Y=$.watch("closeNavigation",()=>{setTimeout(()=>{h=!0;let{activeRoute:D}=O.get();D===y&&c.useFrame(({time:L})=>V({time:L}))},500)});return()=>{M.destroy(),q(),Y(),W(),M.destroy(),M=null,k.destroy(),k=null,f=null,w=null,x=null,M=null,T=[],h=!1}};var Ih=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(re.mq("max","desktop"))return;let{wrap:l,canvas:p,canvasScroller:u}=a,m=Ch({canvas:p,canvasScroller:u,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{m()}});let{scrollerN1:n}=ye(),{source:s}=n,i=se()?"c-canvas__wrap--wrapped":"";return re.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"animation",source:s.animation}],style:"legend",color:"green"})}
                >
                </code-button>
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
                ${pr}
            </div>
        </div>
    `};var l0=I({name:"caterpillar-n3",component:Ih,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","opacity","intialRotation","endRotation","disableOffcanvas"],state:{amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:!!(Re()||se())}});var Qn=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],Eh=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],kh=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],Rh=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}];var c0=[{buttonLabel:"sample1",data:Eh},{buttonLabel:"salmple2",data:kh},{buttonLabel:"sample3",data:Rh},{buttonLabel:"Initial",data:Qn}],u0=[{label:"dynamic list with key",key:"key",clean:!1},{label:"dynamic list without key",key:"",clean:!1},{label:"dynamic list clear",key:"",clean:!0}];function p0({setState:e,staticProps:t,delegateEvents:r,bindProps:o}){return c0.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    ${t({label:a})}
                    ${r({click:()=>{e("data",i),e("activeSample",s)}})}
                    ${o({bind:["activeSample"],props:({activeSample:l})=>({active:s===l})})}
                ></dynamic-list-button>
            `}).join("")}function d0({bindProps:e,staticProps:t}){return u0.map((r,o)=>{let{key:n,clean:s,label:i}=r;return g`
                <dynamic-list-repeater
                    ${t({listId:o,key:n,clean:s,label:i})}
                    ${e({bind:["data","counter"],props:({data:a,counter:l})=>({data:a,counter:l})})}
                ></dynamic-list-repeater>
            `}).join("")}var Ph=async({setState:e,html:t,onMount:r,staticProps:o,bindProps:n,delegateEvents:s,watchSync:i})=>{r(({refs:p})=>{let{counterEl:u}=p;i("counter",m=>{u.textContent=m})});let{repeater:a}=ye(),{source:l}=a;return t`
        <div class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    ${p0({setState:e,delegateEvents:s,staticProps:o,bindProps:n})}
                    <dynamic-list-button
                        ${o({label:"increase counter"})}
                        ${s({click:()=>{e("counter",p=>p+=1)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span ref="counterEl"></span>
            </div>

            <div class="dynamic-list__container">
                <div class="dynamic-list__grid">
                    ${d0({bindProps:n,staticProps:o})}
                </div>
            </div>

            <code-button
                ${o({drawers:[{label:"description",source:l.description},{label:"definition",source:l.definition},{label:"main",source:l.mainComponent},{label:"repeater",source:l.repeaters},{label:"buttons",source:l.buttons},{label:"cards",source:l.cards},{label:"data",source:l.data}],style:"legend"})}
            >
            </code-button>
        </div>
    `};var h0=I({name:"dynamic-list",component:Ph,state:{counter:()=>({value:0,type:Number}),data:()=>({value:Qn,type:Array}),activeSample:()=>({value:3,type:Number})}});function eo(e,t){return`${e}: ${t}`}var Ah=async({getState:e,html:t,onMount:r,key:o,staticProps:n,bindProps:s,watch:i,id:a})=>{let{isFull:l,parentListId:p,index:u,label:m,counter:h}=e();return r(({element:T,refs:y})=>{let{indexEl:w,labelEl:x,counterEl:C}=y;T.addEventListener("click",()=>{T.classList.toggle("is-selected")}),i("index",P=>{w.textContent=eo("index",P)}),i("label",P=>{x.textContent=eo("label",P)}),i("counter",P=>{C.textContent=eo("counter",P)}),c.useFrame(()=>{T.classList.add("active")})}),t`
        <div class="dynamic-card ${l?"is-full":""}">
            <div class="dynamic-card__container">
                <p class="dynamic-card__title">card content</p>
                <div class="id">id: ${a}</div>
                <div class="parentId">list index: ${p}</div>
                <div class="index" ref="indexEl">
                    ${eo("index",u)}
                </div>
                <div class="label" ref="labelEl">
                    ${eo("label",m)}
                </div>
                <div class="counter" ref="counterEl">
                    ${eo("counter",h)}
                </div>
                <div class="key">key: ${o.length>0?o:"no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <mobjs-slot
                    name="card-slot"
                    ${n({staticFromSlot:"static prop from card"})}
                    ${s({bind:["counter","label","index"],props:()=>({parentState:`${JSON.stringify(e(),null,4)}`})})}
                ></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${n({parentListId:p})}
                        ${s({bind:["counter"],props:({counter:T})=>({counter:T})})}
                    />
                </dynamic-list-empty>
            </div>
        </div>
    `};var m0=I({name:"dynamic-list-card",component:Ah,exportState:["isFull","label","index","counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});function _h(e){return g`<pre>${e}</pre>`}var Oh=({getState:e,html:t,onMount:r,watchSync:o})=>{let{staticFromSlot:n,staticFromComponent:s}=e();return r(({refs:i})=>{let{tEl:a,t2El:l}=i;o("parentParentState",p=>{a.textContent="",a.insertAdjacentHTML("afterbegin",_h(p))}),o("parentState",p=>{l.textContent="",l.insertAdjacentHTML("afterbegin",_h(p))})}),t`
        <div class="dynamic-slot">
            <h3 class="dynamic-slot__label">Component inside slot</h3>
            <div>${n}</div>
            <div>${s}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div ref="tEl"></div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div ref="t2El"></div>
        </div>
    `};var f0=I({name:"dynamic-list-slot",component:Oh,exportState:["staticFromSlot","staticFromComponent","parentParentState","parentState"],state:{staticFromSlot:()=>({value:"",type:"any"}),staticFromComponent:()=>({value:"",type:"any"}),parentParentState:()=>({value:"",type:"any"}),parentState:()=>({value:"",type:"any"})}});var Nh=async({html:e})=>e`<div class="dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var g0=I({name:"dynamic-list-empty",component:Nh});var Mh=async({watch:e,onMount:t,html:r,getState:o})=>{let{parentListId:n,counter:s}=o();return t(({refs:i})=>{let{counterValueEl:a}=i;e("counter",l=>{a.textContent=l})}),r`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__subtitle">(slotted)</p>
        <p class="dynamic-counter__list">list index: ${n}</p>
        <span ref="counterValueEl">${s}</span>
    </div>`};var b0=I({name:"dynamic-list-counter",component:Mh,exportState:["counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var Lh=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:n}=t();return r(({element:s})=>{o("active",i=>{s.classList.toggle("active",i)})}),e`
        <button type="button" class="dynamic-list-button">${n}</button>
    `};var y0=I({name:"dynamic-list-button",component:Lh,exportState:["active","label"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});function v0({sync:e,staticProps:t,bindProps:r,listId:o,delegateEvents:n}){return g`
        <dynamic-list-card
            ${t({parentListId:o})}
            ${r({bind:["counter","data"],props:({counter:s,_current:i,_index:a})=>({counter:s,label:i.label,index:a})})}
            ${n({mousedown:(s,{current:i,index:a})=>console.log(i,a)})}
            ${e}
        >
            <dynamic-slotted-label
                slot="card-label-slot"
                ${r({bind:["label"],forceParent:!0,props:({label:s})=>({label:s})})}
            >
            </dynamic-slotted-label>
        </dynamic-list-card>
    `}function S0(e){return`<strong>Current cards id:</strong> ${e.join(",").replaceAll(","," | ")}`}function w0({element:e,className:t,childrenId:r}){let o=e.querySelector(t);o.textContent="",o.insertAdjacentHTML("afterbegin",S0(r))}var Fh=({getState:e,html:t,repeat:r,staticProps:o,bindProps:n,delegateEvents:s})=>{let{listId:i,key:a,clean:l,label:p}=e(),u=a.length>0?a:null;return t`
        <div class="dynamic-list-repeater">
            <h4 class="dynamic-list-repeater__title">${p}</h4>
            <p class="dynamic-list-repeater__new js-list"></p>
            <div class="dynamic-list-repeater__list">
                ${r({watch:"data",clean:l,key:u,afterUpdate:({childrenId:m,element:h})=>{w0({className:".js-list",childrenId:m,element:h})},render:({sync:m})=>v0({sync:m,staticProps:o,bindProps:n,delegateEvents:s,listId:i})})}
            </div>
        </div>
    `};var T0=I({name:"dynamic-list-repeater",component:Fh,exportState:["label","clean","data","listId","key","listId","counter"],state:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})}});function Dh(e){return`slotted: ${e}`}var Vh=async({html:e,onMount:t,watch:r,getState:o})=>{let{label:n}=o();return t(({refs:s})=>{let{contentEl:i}=s;r("label",a=>{i.textContent=Dh(a)})}),e`<div class="dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${Dh(n)}</p>
    </div>`};var x0=I({name:"dynamic-slotted-label",component:Vh,exportState:["label"],state:{label:()=>({value:void 0,type:"Any"})}});var $h=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="400"
   height="400"
   viewBox="0 0 105.83333 105.83334"
   version="1.1"
   id="svg1713"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
    <path
       d="M 314.66331,372.25958 93.889916,264.46734 -120.06656,385.22612 -85.772782,141.94851 -266.73739,-24.219674 -24.76928,-66.781266 77.344916,-290.23763 192.59565,-73.264538 436.67031,-45.199981 265.93107,131.45836 Z"
       transform="matrix(0.13816225,0,0,0.13816225,41.19189,46.490067)" />
</svg>
`;var Wh=({groups:e,trails:t})=>{let r=180/Math.PI,o=window.innerWidth,n=window.innerHeight,s=0,i=0,a=0,l=0,p=!1,u=t.map(C=>C.querySelector("svg")),m=Z.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});t.forEach(C=>{m.subscribe(({x:P,y:M})=>{C.style.translate=`${P}px ${M}px`})});let h=Z.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});u.forEach(C=>{h.subscribeCache(C,({rotation:P})=>{C.style.rotate=`${P}deg`})});let f=Z.createTween({data:{opacity:0,scale:1.4}});t.forEach(C=>{f.subscribe(({scale:P,opacity:M})=>{C.style.scale=`${P}`,C.style.opacity=M})});let T=c.useResize(()=>{o=window.innerWidth,n=window.innerHeight}),y=c.useMouseMove(({client:C})=>{if(!p)return;let{x:P,y:M}=C,_=M-s,k=P-i;if(Math.abs(k)>10||Math.abs(_)>10){s=M,i=P;let q=Math.atan2(_,k)*r+180,W=Math.abs(a-q);W>180&&a<q&&(l-=360),W>180&&a>q&&(l+=360);let Y=q+l+90;h.goTo({rotation:Y}),a=q}m.goTo({x:P-o/2,y:M-n/2})}),w=Z.createTween({data:{opacity:0,scale:.95},duration:2e3,ease:"easeOutQuart",stagger:{waitComplete:!0,each:5,from:"center"}});e.forEach(C=>{w.subscribeCache(C,({scale:P,opacity:M})=>{C.style.scale=`${P}`,C.style.opacity=M})});let x=Ne.createAsyncTimeline({repeat:1}).createGroup().goTo(w,{opacity:1,scale:1}).goTo(f,{scale:1,opacity:1}).closeGroup();return{playIntro:async()=>x.play().then(()=>{p=!0}),destroy:()=>{w.destroy(),w=null,x.destroy(),x=null,m.destroy(),m=null,h.destroy(),h=null,f.destroy(),f=null,T(),y(),o=null,n=null,s=null,i=null,a=null,l=null,u=null}}};var I0=10,E0=async({playIntro:e})=>{await e()},k0=()=>[...new Array(I0).keys()].map((e,t)=>g`
                <div
                    class="child-trail child-trail--${t}"
                    ref="trail${t}"
                >
                    ${$h}
                </div>
            `).join(""),Bh=({onMount:e,html:t,getState:r,staticProps:o})=>{let n=re.mq("min","desktop"),{svg:s}=n?r():"",{child:i}=ye(),{source:a}=i;return e(({refs:l})=>{if(!n)return;let{trail0:p,trail1:u,trail2:m,trail3:h,trail4:f,trail5:T,trail6:y,trail7:w,trail8:x,trail9:C,black:P,body:M,bottom_green:_,collo:k,dark_shadow:V,gambe:q,green_top:W,head:Y,light_shadow:D,head_bg:L,body_bg:G,head_green:ne,highlight:j}=l,N=Wh({groups:[P,M,_,k,V,q,W,Y,D,L,G,ne,j],trails:[p,u,m,h,f,T,y,w,x,C]}),{playIntro:v,destroy:S}=N;return E0({playIntro:v}),()=>{S()}}),t`<div class="svg-child-container">
        <only-desktop></only-desktop>
        <div class="svg-child">${s}</div>
        ${k0()}
        <code-button
            ${o({drawers:[{label:"description",source:a.description},{label:"definition",source:a.definition},{label:"component",source:a.component},{label:"animation",source:a.animation}],style:"legend",color:"green"})}
        >
        </code-button>
    </div>`};var R0=I({name:"svg-child",component:Bh,exportState:["svg"],state:{svg:()=>({value:"",type:String})}});var Ai={};Oi(Ai,{about:()=>j0,animatedPatternN0v1:()=>A0,animatedPatternN0v2:()=>_0,animatedPatternN0v3:()=>O0,animatedPatternN0v4:()=>N0,animatedPatternN0v5:()=>M0,animatedPatternN0v6:()=>L0,animatedPatternN0v7:()=>F0,animatedPatternN1:()=>D0,canvas_overview:()=>U0,caterpillarN0:()=>V0,caterpillarN1:()=>$0,caterpillarN2:()=>W0,child:()=>Yy,dynamic_list:()=>Q0,home:()=>B0,horizontalScrollerV1:()=>H0,horizontalScrollerV2:()=>q0,mobCore_defaults:()=>Dy,mobCore_events:()=>Ly,mobCore_overview:()=>My,mobCore_store:()=>Fy,mobJs_bindEvents:()=>Cy,mobJs_bindProps:()=>wy,mobJs_component:()=>oy,mobJs_computed:()=>uy,mobJs_debug:()=>_y,mobJs_delegateEvents:()=>Iy,mobJs_emit:()=>ly,mobJs_emitAsync:()=>cy,mobJs_freezeProp:()=>gy,mobJs_getChildren:()=>fy,mobJs_getParentId:()=>yy,mobJs_getState:()=>iy,mobJs_html:()=>ny,mobJs_initialization:()=>ty,mobJs_instanceName:()=>Ny,mobJs_onMount:()=>sy,mobJs_overview:()=>ey,mobJs_refs:()=>ky,mobJs_remove:()=>hy,mobJs_removeDom:()=>my,mobJs_repeat:()=>Ey,mobJs_routing:()=>ry,mobJs_runtime:()=>Oy,mobJs_setState:()=>ay,mobJs_slot:()=>Ry,mobJs_staticProps:()=>Sy,mobJs_syncParent:()=>xy,mobJs_unBind:()=>Ty,mobJs_unFreezeProp:()=>by,mobJs_utils:()=>Py,mobJs_watch:()=>py,mobJs_watchParent:()=>vy,mobJs_watchSync:()=>dy,mobJs_web_component:()=>Ay,mobMotion_async_timeline:()=>Vy,mobMotion_create_stagger:()=>$y,mobMotion_defaults:()=>Gy,mobMotion_overview:()=>Wy,mobMotion_parallax:()=>By,mobMotion_scrolltrigger:()=>jy,mobMotion_sequencer:()=>zy,mobMotion_stagger:()=>Hy,mobMotion_sync_timeline:()=>qy,mobMotion_tween_spring_lerp:()=>Uy,pageNotFound:()=>P0,plugin_overview:()=>z0,scrollerN0v1:()=>G0,scrollerN0v2:()=>J0,scrollerN0v3:()=>Y0,scrollerN0v4:()=>X0,scrollerN0v5:()=>K0,scrollerN1:()=>Z0,svg_overview:()=>Jy});var P0=()=>g`
        <div class="page-not-found">
            <mob-title ${b({tag:"h3",color:"green"})}>
                Page not found
            </mob-title>
            <a href="./#home">back to home</a>
        </div>
    `;var A0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v0"})}
        ></animation-title>
        <animatedpattern-n0></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0v2"})}
        ></quick-nav>
    </div>`;var _0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v1"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v1",nextRoute:"#animatedPatternN0v3"})}
        ></quick-nav>
    </div>`;var O0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v3"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v2",nextRoute:"#animatedPatternN0v4"})}
        ></quick-nav>
    </div>`;var N0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v4"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v3",nextRoute:"#animatedPatternN0v5"})}
        ></quick-nav>
    </div>`;var M0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v5"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"row"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v4",nextRoute:"#animatedPatternN0v6"})}
        ></quick-nav>
    </div>`;var L0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v6"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"col"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v5",nextRoute:"#animatedPatternN0v7"})}
        ></quick-nav>
    </div>`;var F0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.0 v7"})}
        ></animation-title>
        <animatedpattern-n0
            ${b({fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:50,cellHeight:50,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v6",nextRoute:"#animatedPatternN1"})}
        ></quick-nav>
    </div>`;var D0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Animated pattern N.1"})}
        ></animation-title>
        <animatedpattern-n1></animatedpattern-n1>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN0v7",nextRoute:"#scrollerN0v1"})}
        ></quick-nav>
    </div>`;var V0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Caterpillar N.0"})}
        ></animation-title>
        <caterpillar-n0></caterpillar-n0>
        <quick-nav
            ${b({prevRoute:"",nextRoute:"#caterpillarN1"})}
        ></quick-nav>
    </div>`;var $0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Caterpillar N.1"})}
        ></animation-title>
        <caterpillar-n1></caterpillar-n1>
        <quick-nav
            ${b({prevRoute:"#caterpillarN0",nextRoute:"#caterpillarN2"})}
        ></quick-nav>
    </div>`;var W0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Caterpillar N.2"})}
        ></animation-title>
        <caterpillar-n2></caterpillar-n2>
        <quick-nav
            ${b({prevRoute:"#caterpillarN1",nextRoute:"#animatedPatternN0v1"})}
        ></quick-nav>
    </div>`;var B0=()=>g`<div class="l-index">
        <home-component></home-component>
    </div>`;var j0=async()=>{let{success:e,data:t}=await E({source:"./data/about.json"});return e?g`<doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >About 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">About</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var z0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${b({source:"./data/plugin/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Plugin 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Plugin</doc-title>
    </doc-container>`;var H0=()=>g`<div>
        <horizontal-scroller></horizontal-scroller>
    </div>`;var q0=()=>g`<div>
        <horizontal-scroller
            ${b({animatePin:!0})}
        ></horizontal-scroller>
    </div>`;var U0=async()=>{let{success:e,data:t}=await E({source:"./data/canvas/overview.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Canvas 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var G0=()=>g`<div>
        <animation-title
            ${b({title:"Scroller N.0 v1"})}
        ></animation-title>
        <scroller-n0></scroller-n0>
        <quick-nav
            ${b({prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN0v2"})}
        ></quick-nav>
    </div>`;var J0=()=>g`<div>
        <animation-title
            ${b({title:"Scroller N.0 v2"})}
        ></animation-title>
        <scroller-n0
            ${b({stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1})}
        ></scroller-n0>
        <quick-nav
            ${b({prevRoute:"#scrollerN0v1",nextRoute:"#scrollerN0v3"})}
        ></quick-nav>
    </div>`;var Y0=()=>g`<div>
        <animation-title
            ${b({title:"Scroller N.0 v3"})}
        ></animation-title>
        <scroller-n0
            ${b({stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1})}
        ></scroller-n0>
        <quick-nav
            ${b({prevRoute:"#scrollerN0v2",nextRoute:"#scrollerN0v4"})}
        ></quick-nav>
    </div>`;var X0=()=>g`<div>
        <animation-title
            ${b({title:"Scroller N.0 v4"})}
        ></animation-title>
        <scroller-n0
            ${b({stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1})}
        ></scroller-n0>
        <quick-nav
            ${b({prevRoute:"#scrollerN0v3",nextRoute:"#scrollerN0v5"})}
        ></quick-nav>
    </div>`;var K0=()=>g`<div>
        <animation-title
            ${b({title:"Scroller N.0 v5"})}
        ></animation-title>
        <scroller-n0
            ${b({stagger:{type:"equal",each:3,from:"end"},reorder:!1})}
        ></scroller-n0>
        <quick-nav
            ${b({prevRoute:"#scrollerN0v4",nextRoute:"#scrollerN1"})}
        ></quick-nav>
    </div>`;var Z0=()=>g`<div class="l-padding">
        <animation-title
            ${b({title:"Scroller N.1"})}
        ></animation-title>
        <caterpillar-n3></caterpillar-n3>
        <quick-nav
            ${b({prevRoute:"#scrollerN0v4",nextRoute:""})}
        ></quick-nav>
    </div>`;var Q0=()=>g` <dynamic-list> </dynamic-list> `;var ey=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/overview.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobJs</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ty=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/initialization.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>initialization</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ry=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/routing.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>routing</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">routing</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var oy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/component.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>component</span>
        </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Component</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ny=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/html.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>html</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">HTML</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var sy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/onMount.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>onMount</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">onMount</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var iy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getState.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getState</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getState</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ay=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/setState.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>setState</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">setState</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ly=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/emit.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emit</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emit</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var cy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/emitAsync.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emitAsync</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emitAsync</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var uy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/computed.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>computed</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">computed</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var py=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watch.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watch</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watch</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var dy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watchSync.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchSync</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchSync</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var hy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/remove.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>remove</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">remove</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var my=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/removeDom.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>removeDom</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">removeDom</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var fy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getChildren.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getChildren</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getChildren</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var gy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/freezeProp.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>freezeProp</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">freezeProp</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var by=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/unFreezeProp.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unFreezeProp</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unFreezeProp</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var yy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getParentId.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getParentId</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getParentId</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var vy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watchParent.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchParent</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchParent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Sy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/staticProps.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>staticProps</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">staticProps</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var wy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/bindProps.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindProps</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindProps</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ty=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/unBind.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unBind</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unBind</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var xy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/syncParent.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>syncParent</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">syncParent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Cy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/bindEvents.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindEvents</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindEvents</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Iy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/delegateEvents.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>delegateEvents</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">delegateEvents</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ey=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/repeat.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>repeat</span></doc-title-small
        >
        <links-mobjs
            ${b({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">repeat</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ky=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/refs.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>refs</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">refs</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ry=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/slot.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>slot</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">slot</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Py=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/utils.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>utils</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Utils</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ay=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/webComponent.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>webComponent</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">WebComponent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var _y=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/debug.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>debug</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Debug</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Oy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/runtime.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>runtime</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Runtime</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ny=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/instanceName.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>instanceName</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">InstanceName</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var My=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/overview.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobCore 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ly=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/events.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Events</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Fy=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/store.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Store</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Store</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Dy=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/defaults.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Defaults</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Vy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/asyncTimeline.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Async timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Async timeline</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var $y=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/createStagger.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>CreateStagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">CreateStagger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Wy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/overview.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobMotion 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobMotion</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var By=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/parallax.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Parallax</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Parallax</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var jy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/scrollTrigger.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>ScrollTrigger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">ScrollTrigger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var zy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/sequencer.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sequencer</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sequencer</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Hy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/stagger.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Stagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Stagger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var qy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/syncTimeline.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sync timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sync timeline</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Uy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/tweenSpringLerp.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Tween Spring Lerp</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Tweens</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Gy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/defaults.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Defaults</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Jy=async()=>{let{success:e,data:t}=await E({source:"./data/svg/overview.json"});return e?g` <doc-container>
        <html-content
            slot="docs"
            ${b({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Svg
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Svg</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Yy=async()=>{let{success:e,data:t}=await Gn({source:"./asset/svg/child.svg"});return e?g`<div>
        <animation-title
            ${b({title:"Child svg"})}
        ></animation-title>
        <svg-child ${b({svg:t})}></svg-child>
    </div>`:(console.warn("fetch data fail"),[])};var jh=()=>g`
        <code-overlay name="codeOverlay"></code-overlay>
        <mob-header></mob-header>
        <mob-navigation-container></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer>
            <debug-button slot="debug"></debug-button>
        </mob-footer>
        <page-transition name="page-transition"></page-transition>
        <route-loader></route-loader>
    `;c.useLoad(()=>{c.store.set("fpsScalePercent",{0:1,50:2,70:3}),re.setDefault({deferredNextTick:!0,useScaleFps:!0,usePassive:!0,mq:{desktop:1024},spring:{config:{customSpring:{friction:1,mass:1,precision:.01,tension:180,velocity:0}}}}),re.printDefault(),(async()=>{let t=document.body.querySelector(".js-main-loader"),r=document.body.querySelector(".js-main-loader-background"),o=Z.createTween({data:{opacity:1,scale:1},duration:1e3});t&&r&&[t,r].forEach(n=>{o.subscribe(({opacity:s,scale:i})=>{n.style.opacity=s,n.style.transform=`scale(${i})`})}),await Vd(),Ps({isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:1e3,debug:!0}),Ws({rootId:"#root",contentId:"#content",wrapper:jh,components:Pi,pages:Ai,index:"home",pageNotFound:"pageNotFound",afterInit:async()=>{await o.goTo({opacity:0,scale:.9}),t?.remove(),r?.remove(),o=null}})})()});})();
//# sourceMappingURL=main.js.map
