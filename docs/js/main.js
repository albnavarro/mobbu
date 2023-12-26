(()=>{var zd=Object.create;var rn=Object.defineProperty;var Hd=Object.getOwnPropertyDescriptor;var Ud=Object.getOwnPropertyNames;var qd=Object.getPrototypeOf,Gd=Object.prototype.hasOwnProperty;var Jd=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Oi=(e,t)=>{for(var r in t)rn(e,r,{get:t[r],enumerable:!0})},Yd=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ud(t))!Gd.call(e,s)&&s!==r&&rn(e,s,{get:()=>t[s],enumerable:!(o=Hd(t,s))||o.enumerable});return e};var Xd=(e,t,r)=>(r=e!=null?zd(qd(e)):{},Yd(t||!e||!e.__esModule?rn(r,"default",{value:e,enumerable:!0}):r,e));var ch=Jd((KR,lh)=>{function Xp(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Xp(r)}),e}var Gs=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Kp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Jt(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let s in o)r[s]=o[s]}),r}var Hf="</span>",Hp=e=>!!e.scope,Uf=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,s)=>`${o}${"_".repeat(s+1)}`)].join(" ")}return`${t}${e}`},bi=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Kp(t)}openNode(t){if(!Hp(t))return;let r=Uf(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Hp(t)&&(this.buffer+=Hf)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Up=(e={})=>{let t={children:[]};return Object.assign(t,e),t},yi=class e{constructor(){this.rootNode=Up(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Up({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},vi=class extends yi{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new bi(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function No(e){return e?typeof e=="string"?e:e.source:null}function Zp(e){return ur("(?=",e,")")}function qf(e){return ur("(?:",e,")*")}function Gf(e){return ur("(?:",e,")?")}function ur(...e){return e.map(r=>No(r)).join("")}function Jf(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function wi(...e){return"("+(Jf(e).capture?"":"?:")+e.map(o=>No(o)).join("|")+")"}function Qp(e){return new RegExp(e.toString()+"|").exec("").length-1}function Yf(e,t){let r=e&&e.exec(t);return r&&r.index===0}var Xf=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ti(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let s=r,n=No(o),i="";for(;n.length>0;){let a=Xf.exec(n);if(!a){i+=n;break}i+=n.substring(0,a.index),n=n.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+s):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var Kf=/\b\B/,eh="[a-zA-Z]\\w*",xi="[a-zA-Z_]\\w*",th="\\b\\d+(\\.\\d+)?",rh="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",oh="\\b(0b[01]+)",Zf="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Qf=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=ur(t,/.*\b/,e.binary,/\b.*/)),Jt({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Mo={begin:"\\\\[\\s\\S]",relevance:0},eg={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Mo]},tg={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Mo]},rg={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ys=function(e,t,r={}){let o=Jt({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let s=wi("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ur(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},og=Ys("//","$"),sg=Ys("/\\*","\\*/"),ng=Ys("#","$"),ig={scope:"number",begin:th,relevance:0},ag={scope:"number",begin:rh,relevance:0},lg={scope:"number",begin:oh,relevance:0},cg={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Mo,{begin:/\[/,end:/\]/,relevance:0,contains:[Mo]}]},ug={scope:"title",begin:eh,relevance:0},pg={scope:"title",begin:xi,relevance:0},hg={begin:"\\.\\s*"+xi,relevance:0},dg=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},qs=Object.freeze({__proto__:null,APOS_STRING_MODE:eg,BACKSLASH_ESCAPE:Mo,BINARY_NUMBER_MODE:lg,BINARY_NUMBER_RE:oh,COMMENT:Ys,C_BLOCK_COMMENT_MODE:sg,C_LINE_COMMENT_MODE:og,C_NUMBER_MODE:ag,C_NUMBER_RE:rh,END_SAME_AS_BEGIN:dg,HASH_COMMENT_MODE:ng,IDENT_RE:eh,MATCH_NOTHING_RE:Kf,METHOD_GUARD:hg,NUMBER_MODE:ig,NUMBER_RE:th,PHRASAL_WORDS_MODE:rg,QUOTE_STRING_MODE:tg,REGEXP_MODE:cg,RE_STARTERS_RE:Zf,SHEBANG:Qf,TITLE_MODE:ug,UNDERSCORE_IDENT_RE:xi,UNDERSCORE_TITLE_MODE:pg});function mg(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function fg(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function gg(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=mg,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function bg(e,t){Array.isArray(e.illegal)&&(e.illegal=wi(...e.illegal))}function yg(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function vg(e,t){e.relevance===void 0&&(e.relevance=1)}var Sg=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=ur(r.beforeMatch,Zp(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},wg=["of","and","for","in","not","or","if","then","parent","list","value"],Tg="keyword";function sh(e,t,r=Tg){let o=Object.create(null);return typeof e=="string"?s(r,e.split(" ")):Array.isArray(e)?s(r,e):Object.keys(e).forEach(function(n){Object.assign(o,sh(e[n],t,n))}),o;function s(n,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let l=a.split("|");o[l[0]]=[n,xg(l[0],l[1])]})}}function xg(e,t){return t?Number(t):Cg(e)?0:1}function Cg(e){return wg.includes(e.toLowerCase())}var qp={},cr=e=>{console.error(e)},Gp=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Xr=(e,t)=>{qp[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),qp[`${e}/${t}`]=!0)},Js=new Error;function nh(e,t,{key:r}){let o=0,s=e[r],n={},i={};for(let a=1;a<=t.length;a++)i[a+o]=s[a],n[a+o]=!0,o+=Qp(t[a-1]);e[r]=i,e[r]._emit=n,e[r]._multi=!0}function Ig(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw cr("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Js;if(typeof e.beginScope!="object"||e.beginScope===null)throw cr("beginScope must be object"),Js;nh(e,e.begin,{key:"beginScope"}),e.begin=Ti(e.begin,{joinWith:""})}}function Eg(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw cr("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Js;if(typeof e.endScope!="object"||e.endScope===null)throw cr("endScope must be object"),Js;nh(e,e.end,{key:"endScope"}),e.end=Ti(e.end,{joinWith:""})}}function kg(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Rg(e){kg(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Ig(e),Eg(e)}function Pg(e){function t(i,a){return new RegExp(No(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,a]),this.matchAt+=Qp(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(l=>l[1]);this.matcherRe=t(Ti(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(a);if(!l)return null;let p=l.findIndex((m,d)=>d>0&&m!==void 0),u=this.matchIndexes[p];return l.splice(0,p),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let l=new r;return this.rules.slice(a).forEach(([p,u])=>l.addRule(p,u)),l.compile(),this.multiRegexes[a]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,l){this.rules.push([a,l]),l.type==="begin"&&this.count++}exec(a){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let p=l.exec(a);if(this.resumingScanAtSamePosition()&&!(p&&p.index===this.lastIndex)){let u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,p=u.exec(a)}return p&&(this.regexIndex+=p.position+1,this.regexIndex===this.count&&this.considerAll()),p}}function s(i){let a=new o;return i.contains.forEach(l=>a.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function n(i,a){let l=i;if(i.isCompiled)return l;[fg,yg,Rg,Sg].forEach(u=>u(i,a)),e.compilerExtensions.forEach(u=>u(i,a)),i.__beforeBegin=null,[gg,bg,vg].forEach(u=>u(i,a)),i.isCompiled=!0;let p=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),p=i.keywords.$pattern,delete i.keywords.$pattern),p=p||/\w+/,i.keywords&&(i.keywords=sh(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(p,!0),a&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=No(l.end)||"",i.endsWithParent&&a.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ag(u==="self"?i:u)})),i.contains.forEach(function(u){n(u,l)}),i.starts&&n(i.starts,a),l.matcher=s(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Jt(e.classNameAliases||{}),n(e)}function ih(e){return e?e.endsWithParent||ih(e.starts):!1}function Ag(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Jt(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:ih(e)?Jt(e,{starts:e.starts?Jt(e.starts):null}):Object.isFrozen(e)?Jt(e):e}var _g="11.9.0",Si=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},gi=Kp,Jp=Jt,Yp=Symbol("nomatch"),Og=7,ah=function(e){let t=Object.create(null),r=Object.create(null),o=[],s=!0,n="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:vi};function l(y){return a.noHighlightRe.test(y)}function p(y){let v=y.className+" ";v+=y.parentNode?y.parentNode.className:"";let R=a.languageDetectRe.exec(v);if(R){let P=W(R[1]);return P||(Gp(n.replace("{}",R[1])),Gp("Falling back to no-highlight mode for this block.",y)),P?R[1]:"no-highlight"}return v.split(/\s+/).find(P=>l(P)||W(P))}function u(y,v,R){let P="",B="";typeof v=="object"?(P=y,R=v.ignoreIllegals,B=v.language):(Xr("10.7.0","highlight(lang, code, ...args) has been deprecated."),Xr("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=y,P=v),R===void 0&&(R=!0);let J={code:P,language:B};j("before:highlight",J);let ee=J.result?J.result:m(J.language,J.code,R);return ee.code=J.code,j("after:highlight",ee),ee}function m(y,v,R,P){let B=Object.create(null);function J(F,z){return F.keywords[z]}function ee(){if(!G.keywords){Ee.addText(me);return}let F=0;G.keywordPatternRe.lastIndex=0;let z=G.keywordPatternRe.exec(me),X="";for(;z;){X+=me.substring(F,z.index);let ce=Ue.case_insensitive?z[0].toLowerCase():z[0],Pe=J(G,ce);if(Pe){let[wt,Bd]=Pe;if(Ee.addText(X),X="",B[ce]=(B[ce]||0)+1,B[ce]<=Og&&(Fo+=Bd),wt.startsWith("_"))X+=z[0];else{let jd=Ue.classNameAliases[wt]||wt;de(z[0],jd)}}else X+=z[0];F=G.keywordPatternRe.lastIndex,z=G.keywordPatternRe.exec(me)}X+=me.substring(F),Ee.addText(X)}function Ie(){if(me==="")return;let F=null;if(typeof G.subLanguage=="string"){if(!t[G.subLanguage]){Ee.addText(me);return}F=m(G.subLanguage,me,!0,_i[G.subLanguage]),_i[G.subLanguage]=F._top}else F=f(me,G.subLanguage.length?G.subLanguage:null);G.relevance>0&&(Fo+=F.relevance),Ee.__addSublanguage(F._emitter,F.language)}function ae(){G.subLanguage!=null?Ie():ee(),me=""}function de(F,z){F!==""&&(Ee.startScope(z),Ee.addText(F),Ee.endScope())}function Me(F,z){let X=1,ce=z.length-1;for(;X<=ce;){if(!F._emit[X]){X++;continue}let Pe=Ue.classNameAliases[F[X]]||F[X],wt=z[X];Pe?de(wt,Pe):(me=wt,ee(),me=""),X++}}function De(F,z){return F.scope&&typeof F.scope=="string"&&Ee.openNode(Ue.classNameAliases[F.scope]||F.scope),F.beginScope&&(F.beginScope._wrap?(de(me,Ue.classNameAliases[F.beginScope._wrap]||F.beginScope._wrap),me=""):F.beginScope._multi&&(Me(F.beginScope,z),me="")),G=Object.create(F,{parent:{value:G}}),G}function Le(F,z,X){let ce=Yf(F.endRe,X);if(ce){if(F["on:end"]){let Pe=new Gs(F);F["on:end"](z,Pe),Pe.isMatchIgnored&&(ce=!1)}if(ce){for(;F.endsParent&&F.parent;)F=F.parent;return F}}if(F.endsWithParent)return Le(F.parent,z,X)}function Ge(F){return G.matcher.regexIndex===0?(me+=F[0],1):(tn=!0,0)}function Je(F){let z=F[0],X=F.rule,ce=new Gs(X),Pe=[X.__beforeBegin,X["on:begin"]];for(let wt of Pe)if(wt&&(wt(F,ce),ce.isMatchIgnored))return Ge(z);return X.skip?me+=z:(X.excludeBegin&&(me+=z),ae(),!X.returnBegin&&!X.excludeBegin&&(me=z)),De(X,F),X.returnBegin?0:z.length}function vt(F){let z=F[0],X=v.substring(F.index),ce=Le(G,F,X);if(!ce)return Yp;let Pe=G;G.endScope&&G.endScope._wrap?(ae(),de(z,G.endScope._wrap)):G.endScope&&G.endScope._multi?(ae(),Me(G.endScope,F)):Pe.skip?me+=z:(Pe.returnEnd||Pe.excludeEnd||(me+=z),ae(),Pe.excludeEnd&&(me=z));do G.scope&&Ee.closeNode(),!G.skip&&!G.subLanguage&&(Fo+=G.relevance),G=G.parent;while(G!==ce.parent);return ce.starts&&De(ce.starts,F),Pe.returnEnd?0:z.length}function St(){let F=[];for(let z=G;z!==Ue;z=z.parent)z.scope&&F.unshift(z.scope);F.forEach(z=>Ee.openNode(z))}let Yt={};function eo(F,z){let X=z&&z[0];if(me+=F,X==null)return ae(),0;if(Yt.type==="begin"&&z.type==="end"&&Yt.index===z.index&&X===""){if(me+=v.slice(z.index,z.index+1),!s){let ce=new Error(`0 width match regex (${y})`);throw ce.languageName=y,ce.badRule=Yt.rule,ce}return 1}if(Yt=z,z.type==="begin")return Je(z);if(z.type==="illegal"&&!R){let ce=new Error('Illegal lexeme "'+X+'" for mode "'+(G.scope||"<unnamed>")+'"');throw ce.mode=G,ce}else if(z.type==="end"){let ce=vt(z);if(ce!==Yp)return ce}if(z.type==="illegal"&&X==="")return 1;if(en>1e5&&en>z.index*3)throw new Error("potential infinite loop, way more iterations than matches");return me+=X,X.length}let Ue=W(y);if(!Ue)throw cr(n.replace("{}",y)),new Error('Unknown language: "'+y+'"');let Lo=Pg(Ue),Qs="",G=P||Lo,_i={},Ee=new a.__emitter(a);St();let me="",Fo=0,Xt=0,en=0,tn=!1;try{if(Ue.__emitTokens)Ue.__emitTokens(v,Ee);else{for(G.matcher.considerAll();;){en++,tn?tn=!1:G.matcher.considerAll(),G.matcher.lastIndex=Xt;let F=G.matcher.exec(v);if(!F)break;let z=v.substring(Xt,F.index),X=eo(z,F);Xt=F.index+X}eo(v.substring(Xt))}return Ee.finalize(),Qs=Ee.toHTML(),{language:y,value:Qs,relevance:Fo,illegal:!1,_emitter:Ee,_top:G}}catch(F){if(F.message&&F.message.includes("Illegal"))return{language:y,value:gi(v),illegal:!0,relevance:0,_illegalBy:{message:F.message,index:Xt,context:v.slice(Xt-100,Xt+100),mode:F.mode,resultSoFar:Qs},_emitter:Ee};if(s)return{language:y,value:gi(v),illegal:!1,relevance:0,errorRaised:F,_emitter:Ee,_top:G};throw F}}function d(y){let v={value:gi(y),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return v._emitter.addText(y),v}function f(y,v){v=v||a.languages||Object.keys(t);let R=d(y),P=v.filter(W).filter(D).map(ae=>m(ae,y,!1));P.unshift(R);let B=P.sort((ae,de)=>{if(ae.relevance!==de.relevance)return de.relevance-ae.relevance;if(ae.language&&de.language){if(W(ae.language).supersetOf===de.language)return 1;if(W(de.language).supersetOf===ae.language)return-1}return 0}),[J,ee]=B,Ie=J;return Ie.secondBest=ee,Ie}function T(y,v,R){let P=v&&r[v]||R;y.classList.add("hljs"),y.classList.add(`language-${P}`)}function g(y){let v=null,R=p(y);if(l(R))return;if(j("before:highlightElement",{el:y,language:R}),y.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",y);return}if(y.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(y)),a.throwUnescapedHTML))throw new Si("One of your code blocks includes unescaped HTML.",y.innerHTML);v=y;let P=v.textContent,B=R?u(P,{language:R,ignoreIllegals:!0}):f(P);y.innerHTML=B.value,y.dataset.highlighted="yes",T(y,R,B.language),y.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(y.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),j("after:highlightElement",{el:y,result:B,text:P})}function S(y){a=Jp(a,y)}let x=()=>{M(),Xr("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){M(),Xr("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let _=!1;function M(){if(document.readyState==="loading"){_=!0;return}document.querySelectorAll(a.cssSelector).forEach(g)}function A(){_&&M()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function I(y,v){let R=null;try{R=v(e)}catch(P){if(cr("Language definition for '{}' could not be registered.".replace("{}",y)),s)cr(P);else throw P;R=i}R.name||(R.name=y),t[y]=R,R.rawDefinition=v.bind(null,e),R.aliases&&Y(R.aliases,{languageName:y})}function V(y){delete t[y];for(let v of Object.keys(r))r[v]===y&&delete r[v]}function U(){return Object.keys(t)}function W(y){return y=(y||"").toLowerCase(),t[y]||t[r[y]]}function Y(y,{languageName:v}){typeof y=="string"&&(y=[y]),y.forEach(R=>{r[R.toLowerCase()]=v})}function D(y){let v=W(y);return v&&!v.disableAutodetect}function O(y){y["before:highlightBlock"]&&!y["before:highlightElement"]&&(y["before:highlightElement"]=v=>{y["before:highlightBlock"](Object.assign({block:v.el},v))}),y["after:highlightBlock"]&&!y["after:highlightElement"]&&(y["after:highlightElement"]=v=>{y["after:highlightBlock"](Object.assign({block:v.el},v))})}function q(y){O(y),o.push(y)}function Q(y){let v=o.indexOf(y);v!==-1&&o.splice(v,1)}function j(y,v){let R=y;o.forEach(function(P){P[R]&&P[R](v)})}function L(y){return Xr("10.7.0","highlightBlock will be removed entirely in v12.0"),Xr("10.7.0","Please use highlightElement now."),g(y)}Object.assign(e,{highlight:u,highlightAuto:f,highlightAll:M,highlightElement:g,highlightBlock:L,configure:S,initHighlighting:x,initHighlightingOnLoad:C,registerLanguage:I,unregisterLanguage:V,listLanguages:U,getLanguage:W,registerAliases:Y,autoDetection:D,inherit:Jp,addPlugin:q,removePlugin:Q}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString=_g,e.regex={concat:ur,lookahead:Zp,either:wi,optional:Gf,anyNumberOfTimes:qf};for(let y in qs)typeof qs[y]=="object"&&Xp(qs[y]);return Object.assign(e,qs),e},Kr=ah({});Kr.newInstance=()=>ah({});lh.exports=Kr;Kr.HighlightJS=Kr;Kr.default=Kr});var Pi={};Oi(Pi,{animatedPatternN0Def:()=>Nb,animatedPatternN1Def:()=>Mb,caterpillarN0Def:()=>Db,caterpillarN1Def:()=>Vb,caterpillarN2Def:()=>jb,codeButtonComponentDef:()=>sf,codeOverlayButtonDef:()=>_f,codeOverlayDef:()=>Af,degubButtonComponentDef:()=>Of,docScrollDef:()=>Hg,docTopDef:()=>Ug,docsContainerComponentDef:()=>Eb,docsTitleComponentDef:()=>kb,docsTitleSmallComponentDef:()=>Rb,dynamicCounterDef:()=>m0,dynamicListButtonDef:()=>f0,dynamicListCardDef:()=>p0,dynamicListDef:()=>u0,dynamicListEmptyDef:()=>d0,dynamicListLabelDef:()=>S0,dynamicListRepeaterDef:()=>v0,dynamicListSlotDef:()=>h0,footerComponentDef:()=>eb,footerNavButtonDef:()=>nb,footerNavDef:()=>sb,headerComponentDef:()=>db,headerNavComponentDef:()=>mb,headerToggleComponentDef:()=>fb,homePageComponentDef:()=>qb,horizontalScrollerButtonDef:()=>Qb,horizontalScrollerDef:()=>Zb,horizontalScrollerSectionDef:()=>e0,htmlContentDef:()=>$f,listContentDef:()=>zf,loaderDef:()=>jg,navigationButtonDef:()=>Cb,navigationComponentDef:()=>wb,navigationDef:()=>Tb,navigationLabelDef:()=>Ib,navigationSubmenuDef:()=>xb,onlyDesktopDef:()=>Bg,pageTransitionComponentDef:()=>Lf,paragraphContentDef:()=>Bf,paramsMobJsButtonDef:()=>Zg,paramsMobJsDef:()=>Kg,routeLoaderDef:()=>Qg,scrollToButtonDef:()=>Jg,scrollToDef:()=>Gg,scrollerN0Def:()=>r0,scrollerN1Def:()=>n0,shapeLeftDef:()=>Ob,shapeRightDef:()=>_b,snippetContentDef:()=>Dg,spacerContentDef:()=>$g,svgChild:()=>T0,titleContentDef:()=>Wf});var on="animationStop",Ni=()=>{window.addEventListener("unhandledrejection",e=>{e.reason===on&&e.preventDefault()})};function Se(e){let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function ot(e){let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function ie(e){let t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}}function Ye(e){return e.getBoundingClientRect()}function to(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function dr(e){let t=window.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",s=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:s[4],y:s[5],z:0};if(o==="3d")return{x:s[12],y:s[13],z:s[14]}}function sn(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ve=()=>`_${Math.random().toString(36).slice(2,9)}`;var mr=e=>{setTimeout(()=>e())};var lt="ANY",nn="UNTYPED",Mi="STRING",Li="NUMBER",Fi="OBJECT",Di="FUNCTION",Do="ARRAY",Vi="BOOLEAN",$i="ELEMENT",Wi="HTMLELEMENT",Bi="NODELIST",Vo="SET",$o="MAP",ue={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ro=e=>{switch(e){case String:case Mi:return"String";case Number:case Li:return"Number";case Object:case Fi:return"Object";case Function:case Di:return"Function";case Array:case Do:return"Array";case Boolean:case Vi:return"Boolean";case Element:case $i:return"Element";case HTMLElement:case Wi:return"HTMLElement";case NodeList:case Bi:return"NodeList";case Set:case Vo:return"Set";case Map:case $o:return"Map";case lt:return lt;default:return nn}},Te=(e,t)=>{switch(e){case String:case Mi:return ue.isString(t);case Number:case Li:return ue.isNumber(t);case Object:case Fi:return ue.isObject(t);case Function:case Di:return ue.isFunction(t);case Array:case Do:return ue.isArray(t);case Boolean:case Vi:return ue.isBoolean(t);case Element:case $i:return ue.isElement(t);case HTMLElement:case Wi:return ue.isHTMLElement(t);case NodeList:case Bi:return ue.isNodeList(t);case Set:case Vo:return ue.isSet(t);case Map:case $o:return ue.isMap(t);case lt:return!0;default:return!0}};var Kd=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),Zd=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),Qd=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let s=e.filter(i=>i===o).length,n=t.filter(i=>i===o).length;if(s!==n)return!1}return!0},ji=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let s=e,n=t;if(r||(Array.isArray(e)&&(s=[...e].sort()),Array.isArray(t)&&(n=[...t].sort())),typeof s!="object"||typeof n!="object")return s===n;let i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertyNames(n);if(i.length!==a.length)return!1;for(let l of i){let p=s[l],u=n[l];if(typeof p=="object"&&typeof u=="object"){if(ji(p,u,r))continue;return!1}if(p!==u)return!1}return!0},an=(e,t,r)=>{switch(e){case lt:return ji(t,r);case Do:case Array:return Qd(t,r);case Vo:case Set:return Zd(t,r);case $o:case Map:return Kd(t,r);default:return t===r}};var ln=(e,t)=>{console.warn(`%c SimpleStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)},zi=(e,t,r)=>{console.warn(`%c one of this key ${e} defined in computed method of prop to monitor '${t}' prop not exist`,r)},Hi=(e,t)=>{console.warn(`%c SimpleStore, trying to execute set() method: store.${e} not exist`,t)},Ui=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object`,r)},qi=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Gi=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ro(r)}`,o)},Ji=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Yi=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Xi=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Ki=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Zi=(e,t,r,o,s)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ro(o)}`,s)},Qi=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},cn=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},ea=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or one of the keys coincides with the prop to be changed.`,t)},ta=(e,t)=>{console.warn(`%c SimpleStore error: the property ${e} to watch doesn't exist in store`,t)},ra=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Wo=e=>{if(!ue.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>Wo(r)))+1},oa=(e,t=!0)=>Object.entries(e).reduce((r,o)=>{let[s,n]=o,i=ue.isFunction(n)?n():{};return ue.isObject(n)&&t?{...r,[s]:oa(n,!1)}:ue.isFunction(n)&&ue.isObject(i)&&"value"in i&&("validate"in i||"type"in i||"skipEqual"in i)?{...r,[s]:i.value}:{...r,[s]:n}},{}),sa=(e,t,r,o=!0)=>Object.entries(e).reduce((s,n)=>{let[i,a]=n,l=ue.isFunction(a)?a():{};if(ue.isObject(a)&&o)return{...s,[i]:sa(a,t,r,!1)};if(ue.isFunction(a)&&ue.isObject(l)&&"value"in l&&t in l){let p=ue.isString(l[t])?l[t].toUpperCase():l[t];return{...s,[i]:p}}return{...s,[i]:r}},{}),na=({data:e,depth:t,logStyle:r})=>t>2?(ln(t,r),{}):oa(e),oo=({data:e,prop:t,depth:r,logStyle:o,fallback:s})=>r>2?(ln(r,o),{}):sa(e,t,s),ia=({value:e})=>Te(Map,e)?new Map(e):Te(Set,e)?new Set(e):Te(Object,e)?{...e}:Te(Array,e)?[...e]:e;var fr=class{constructor(t={}){this.logStyle="padding: 10px;",this.callBackWatcher=new Map,this.callBackComputed=new Set,this.computedPropFired=new Set,this.computedWaitList=new Set,this.validationStatusObject={},this.dataDepth=Wo(t),this.computedRunning=!1,this.store=na({data:t,depth:this.dataDepth,logStyle:this.logStyle}),this.type=oo({data:t,prop:"type",depth:this.dataDepth,logStyle:this.logStyle,fallback:nn}),this.fnValidate=oo({data:t,prop:"validate",depth:this.dataDepth,logStyle:this.logStyle,fallback:()=>!0}),this.strict=oo({data:t,prop:"strict",depth:this.dataDepth,logStyle:this.logStyle,fallback:!1}),this.skipEqual=oo({data:t,prop:"skipEqual",depth:this.dataDepth,logStyle:this.logStyle,fallback:!0}),this.inizializeValidation()}inizializeValidation(){for(let t in this.store)ue.isObject(this.store[t])&&(this.validationStatusObject[t]={});Object.entries(this.store).forEach(t=>{let[r,o]=t;this.set(r,o,!1)})}runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:s}){for(let{prop:n,fn:i}of this.callBackWatcher.values())n===t&&i(r,o,s)}async runCallbackQueqeAsync({prop:t,newValue:r,oldValue:o,validationValue:s}){for(let{prop:n,fn:i}of this.callBackWatcher.values())n===t&&await i(r,o,s)}fireComputed(){this.computedWaitList.forEach(t=>{this.callBackComputed.forEach(r=>{let{prop:o,keys:s,fn:n}=r,i=Object.keys(this.store);if(!s.every(m=>i.includes(m))){zi(s,o,this.logStyle);return}if(!s.includes(t))return;let p=s.map(m=>this.store[m]);if(!this.computedPropFired.has(o)){let m=n(...p);this.set(o,m),this.computedPropFired.add(o)}})}),this.computedPropFired.clear(),this.computedWaitList.clear(),this.computedRunning=!1}addToComputedWaitLsit(t){this.callBackComputed.size!==0&&(this.computedWaitList.add(t),this.computedRunning||(this.computedRunning=!0,mr(()=>this.fireComputed())))}set(t,r,o=!0,s=!1){if(!(t in this.store)){Hi(t,this.logStyle);return}let n=s?ia({value:this.store[t]}):this.store[t],i=Te(Function,r)&&!Te(Function,n)&&this.type[t]!==Function?r(n):r,a=this.type[t]===lt;ue.isObject(n)&&!a?this.setObj(t,i,o):this.setProp(t,i,o)}setProp(t,r,o=!0){let s=this.type[t]===lt;if(ue.isObject(r)&&!s){Ui(t,r,this.logStyle);return}if(ue.isObject(this.store[t])&&!s){qi(t,this.logStyle);return}if(!Te(this.type[t],r)){Gi(t,r,this.type[t],this.logStyle);return}let i=this.store[t],a=this.fnValidate[t]?.(r,i);this.strict[t]&&!a||(this.validationStatusObject[t]=a,this.skipEqual[t]?an(this.type[t],i,r):!1)||(this.store[t]=r,o&&this.runCallbackQueqe({prop:t,newValue:r,oldValue:i,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}setObj(t,r,o=!0){if(!ue.isObject(r)){Ji(t,r,this.logStyle);return}if(!ue.isObject(this.store[t])){Yi(t,this.logStyle);return}let s=Object.keys(r),n=Object.keys(this.store[t]);if(!s.every(g=>n.includes(g))){Xi(s,t,this.logStyle);return}if(!Object.entries(r).map(g=>{let[S,x]=g,C=Te(this.type[t][S],x);return C||Zi(t,S,x,this.type[t][S],this.logStyle),C}).every(g=>g===!0))return;let l=Object.entries(r).map(g=>{let[S,x]=g,C=this.store[t][S];return this.strict[t][S]?{strictCheck:this.fnValidate[t][S]?.(x,C),item:g}:{strictCheck:!0,item:g}}).filter(({strictCheck:g})=>g===!0);if(l.length===0)return;let u=Object.fromEntries(l.map(({item:g})=>g).map(([g,S])=>[g,S]));Object.entries(u).forEach(g=>{let[S,x]=g,C=this.store[t][S],_=this.fnValidate[t][S]?.(x,C);_===void 0&&ra(this.logStyle,lt),this.validationStatusObject[t][S]=_});let m=this.store[t],d={...this.store[t],...u};Object.keys(u).every(g=>this.skipEqual[t][g]===!0)&&Object.entries(d).every(([g,S])=>{let x=this.type[t][g]===lt;if(Wo(S)>1&&!x){Ki(t,r,this.logStyle);return}return an(this.type[t][g],m[g],S)})||(this.store[t]=d,o&&this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:m,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}quickSetProp(t,r){let o=this.store[t];this.store[t]=r,this.runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:!0})}get(){return this.store}getProp(t){if(t in this.store)return this.store[t];Qi(t,this.logStyle)}getValidation(){return this.validationStatusObject}watch(t,r=()=>{}){if(!(t in this.store))return ta(t,this.logStyle),()=>{};let o=ve();return this.callBackWatcher.set(o,{fn:r,prop:t}),()=>this.callBackWatcher.delete(o)}emit(t){t in this.store?this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}):cn(t,this.logStyle)}async emitAsync(t){return t in this.store?(await this.runCallbackQueqeAsync({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}),{success:!0}):(cn(t,this.logStyle),{success:!1})}debugStore(){console.log(this.store)}debugValidate(){console.log(this.validationStatusObject)}setStyle(t){this.logStyle=t}computed(t,r,o){if([...this.callBackComputed,{prop:t,keys:r,fn:o}].flatMap(a=>a.prop).some(a=>r.includes(a))){ea(r,this.logStyle);return}this.callBackComputed.add({prop:t,keys:r,fn:o})}destroy(){this.callBackWatcher.clear(),this.callBackComputed.clear(),this.computedPropFired.clear(),this.computedWaitList.clear(),this.validationStatusObject={},this.store={},this.type={},this.fnValidate={},this.strict={},this.skipEqual={}}};var le=new fr({usePassive:!0,currentFrame:0,instantFps:60,requestFrame:()=>{},fpsScalePercent:()=>({value:{0:1,30:2,50:3},type:"Any"}),useScaleFps:!0,deferredNextTick:!0,throttle:60});var un=!1,so=new Map;function aa(){if(so.size===0){window.removeEventListener("DOMContentLoaded",aa),un=!1;return}for(let e of so.values())e();so.clear()}function em(){un||(un=!0,window.addEventListener("DOMContentLoaded",aa,{passive:!1}))}var tm=e=>{let t=ve();return so.set(t,e),typeof window<"u"&&em(),()=>so.delete(t)},la=tm;function Bo(e){let t=0,r=0,o=0,s=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,s=r*10,"deltaY"in e&&(s=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||s)&&e.deltaMode&&(e.deltaMode==1?(o*=40,s*=40):(o*=800,s*=800)),o&&!t&&(t=o<1?-1:1),s&&!r&&(r=s<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:s}}function rm({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function om({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function _t(e){let t=!1,r=new Map,{usePassive:o}=le.get();le.watch("usePassive",()=>{window.removeEventListener(e,s),t=!1,n()});function s(a){if(r.size===0){window.removeEventListener(e,s),t=!1;return}let l=a.type,{pageX:p,pageY:u}=rm({type:l,e:a}),{clientX:m,clientY:d}=om({type:l,e:a}),f=a.target,T={page:{x:p,y:u},client:{x:m,y:d},target:f,type:l,preventDefault:()=>o?()=>{}:a.preventDefault()};if(l==="wheel"){let{spinX:g,spinY:S,pixelX:x,pixelY:C}=Bo(a);Object.assign(T,{spinX:g,spinY:S,pixelX:x,pixelY:C})}for(let g of r.values())g(T)}function n(){t||(t=!0,o=le.getProp("usePassive"),window.addEventListener(e,s,{passive:o}))}return a=>{let l=ve();return r.set(l,a),typeof window<"u"&&n(),()=>r.delete(l)}}var ca=_t("click"),ua=_t("mousedown"),pa=_t("touchstart"),ha=_t("mousemove"),da=_t("touchmove"),ma=_t("mouseup"),fa=_t("touchend"),ga=_t("wheel");var pn=0,Kt=0,Ve={},sm=(e={},t=()=>{})=>{Ve[pn]={el:e,fn:t,data:{}};let r=pn;return pn++,{id:r,unsubscribe:()=>{if(Ve?.[r]){let o=Object.keys(Ve[r].data).length;Kt=Kt-o,delete Ve[r]}}}},nm=({id:e,callBackObject:t,frame:r})=>{if(!Ve[e])return;let{currentFrame:o}=le.get(),{data:s}=Ve[e];s[r+o]||(s[r+o]=t,Kt++)},im=e=>{e in Ve&&delete Ve[e]},am=e=>{let t=Ve?.[e];if(!t)return;let r=Object.keys(t.data).length;Kt=Kt-r,t.data={}},lm=e=>Ve?.[e]??{},cm=(e,t)=>{Object.values(Ve).forEach(({data:r,fn:o,el:s})=>{let n=r?.[e];n&&(t&&o(n,s),r[e]=null,delete r[e],Kt--)})},um=({id:e,obj:t={}})=>{if(!Ve?.[e])return;let{el:r,fn:o}=Ve[e];o(t,r)},pm=()=>Kt,hm=e=>{Object.values(Ve).forEach(({data:t})=>{Object.keys(t).forEach(r=>{delete Object.assign(t,{[`${Number.parseInt(r)-e}`]:t[r]})[r]})})},gr={add:sm,get:lm,update:nm,remove:im,clean:am,fire:cm,fireObject:um,getCacheCounter:pm,updateFrameId:hm};var hn=!1,jo=new Map;function ba(){if(jo.size===0){window.removeEventListener("visibilitychange",ba),hn=!1;return}let e={visibilityState:document.visibilityState};for(let t of jo.values())t(e)}function dm(){hn||(hn=!0,window.addEventListener("visibilitychange",ba,{passive:!1}))}var mm=e=>{let t=ve();return jo.set(t,e),typeof window<"u"&&dm(),()=>jo.delete(t)},zo=mm;var no=[],fm=(e=()=>{},t=100)=>{no.push({cb:e,priority:t})},gm=({time:e,fps:t,shouldRender:r})=>{no.length!==0&&(no.sort((o,s)=>o.priority-s.priority),no.forEach(({cb:o})=>o({time:e,fps:t,shouldRender:r})),no.length=0)},ct={add:fm,fire:gm};var dn=[],bm=e=>{dn.push(e)},ym=()=>{let e=[...dn];return dn.length=0,e},Ho={add:bm,get:ym};var Tt={},Uo=0,vm=e=>{Object.keys(Tt).forEach(t=>{delete Object.assign(Tt,{[`${Number.parseInt(t)-e}`]:Tt[t]})[t]})},Sm=({currentFrame:e,time:t,fps:r,shouldRender:o})=>{let s=Tt[e];s&&(s.forEach(n=>n({time:t,fps:r,shouldRender:o})),Tt[e]=null,delete Tt[e],Uo=Uo-1)},wm=(e,t)=>{let r=t+le.getProp("currentFrame");Tt[r]?Tt[r].push(e):(Tt[r]=[e],Uo++),le.emit("requestFrame")},Tm=()=>Uo,br={add:wm,fire:Sm,updateKeys:vm,getAmountOfFrameToFire:Tm};var ya=!1,qo=(e=30)=>{if(ya){let{instantFps:t}=le.get();return new Promise(r=>{r({averageFPS:t})})}return new Promise(t=>{let r=[],s=0,n=0,i=0,a=0,l=0,p=u=>{u*=.001;let m=u-a;a=u;let d=Number.isFinite(1/m)?1/m:60,f=Math.max(d,60);i+=f-(r[s]||0),r[s++]=f,n=Math.max(n,s),s%=25;let T=Math.round(i/n);if(l++,l>=e){le.quickSetProp("instantFps",T),ya=!0,t({averageFPS:T});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};var ut=()=>typeof window>"u"?Date.now():window.performance.now(),va=16.666666666666668;qo();var mn=1e7,xa=2e3,vn=!1,Ot=[],ke=ut(),Sa=0,fn=0,gn=0,Sn=0,bn=0,yr=!1,Ae=60,Sr=Ae,Go=0,Jo=0,xt=0,yn=-1,vr=!0,Ca=le.getProp("fpsScalePercent"),Ia=le.getProp("useScaleFps"),Yo=!1,Xo=!1,xm=()=>Ae<Sr/5*3,Cm=()=>Ae<Sr/5*4,Im=()=>{!xm()||Yo||(Yo=!0,setTimeout(()=>{Yo=!1},4e3))},Em=()=>{!Cm()||Xo||(Xo=!0,setTimeout(()=>{Xo=!1},4e3))};zo(({visibilityState:e})=>{yr=e==="visible"});Ni();le.watch("requestFrame",()=>{Ko()});var km=()=>{if(!Ia)return!0;let e=Object.entries(Ca).reduce((t,[r,o])=>{let s=Math.abs(Sr-Ae);return Math.round(s*100/Sr)>Number.parseInt(r)?o:t},1);return yn=(yn+1)%e,yn===0},wa=()=>{xt===mn&&(xt=0,le.quickSetProp("currentFrame",xt),br.updateKeys(mn),gr.updateFrameId(mn)),ct.fire({time:ke,fps:Ae,shouldRender:vr}),Ot=[...Ot,...Ho.get()],vn=!1,Ot.length>0||br.getAmountOfFrameToFire()>0||gr.getCacheCounter()>0||ke<xa?Ko():(yr=!0,xt=0,Sn=ke,le.quickSetProp("currentFrame",xt))},Ta=e=>{ke=e,gn=ke-fn,yr&&(Sa+=gn),fn+=gn,ke=Math.round(fn-Sa);let t=Math.round(1e3/Ae);bn=Math.abs(ke-Sn-t);let r=bn>100?bn:0;ke=ke-r,Sn=ke,yr?(Jo=ke,Go=0,Ae=le.getProp("instantFps")):Go++,ke>Jo+1e3&&!yr&&(Ae=ke>xa?Math.round(Go*1e3/(ke-Jo)):le.getProp("instantFps"),Jo=ke,Go=0,Ae=Ae<30?le.getProp("instantFps"):Ae,Ca=le.getProp("fpsScalePercent"),Ia=le.getProp("useScaleFps")),Ae>Sr&&(Sr=Ae),vr=km(),Im(),Em(),Ot.forEach(s=>s({time:ke,fps:Ae,shouldRender:vr})),br.fire({currentFrame:xt,time:ke,fps:Ae,shouldRender:vr}),gr.fire(xt,vr),xt++,le.quickSetProp("currentFrame",xt),Ot.length=0,yr=!1,le.getProp("deferredNextTick")?mr(()=>wa()):wa()},Ko=()=>{vn||(typeof window>"u"?setTimeout(()=>Ta(ut()),va):requestAnimationFrame(Ta),vn=!0)},Xe={add:i=>{Ot.push(i),Ko()},addMultiple:(i=[])=>{Ot=[...Ot,...i],Ko()},getFps:()=>Ae,mustMakeSomething:()=>Yo,shouldMakeSomething:()=>Xo,getShouldRender:()=>vr};var Zo=function(t,r=200){let o;return function(){let s=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(s,r)}};var wn=!1,Qo=new Map,Tn=()=>{},Ea=window.innerHeight,ka=window.innerWidth;function Rm(){if(Qo.size===0){window.removeEventListener("resize",Tn),wn=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Ea,o=t!==ka;Ea=e,ka=t;let s={scrollY:window.pageYOffset,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let n of Qo.values())n(s)}function Pm(){wn||(wn=!0,Tn=Zo(()=>Rm()),window.addEventListener("resize",Tn,{passive:!1}))}var Am=e=>{let t=ve();return Qo.set(t,e),typeof window<"u"&&Pm(),()=>Qo.delete(t)},Ra=Am;var xn=!1,es=new Map,_m="UP",_a="DOWN",Pa=window.pageYOffset,io=window.pageYOffset,Cn=_a,Aa={scrollY:io,direction:Cn};function Oa(){if(es.size===0){window.removeEventListener("scroll",Oa),xn=!1;return}Pa=io,io=window.scrollY,Cn=io>Pa?_a:_m,Aa={scrollY:io,direction:Cn};for(let e of es.values())e(Aa)}function Om(){xn||(xn=!0,window.addEventListener("scroll",Oa,{passive:!0}))}var Nm=e=>{let t=ve();return es.set(t,e),typeof window<"u"&&Om(),()=>es.delete(t)},Ct=Nm;var In=!1,ts=new Map,Na=()=>{};function Mm(e){if(ts.size===0){Na(),In=!1;return}Xe.add(()=>{ct.add(()=>{for(let t of ts.values())t(e)},0)})}function Lm(){In||(In=!0,Na=Ct(Mm))}var Fm=e=>{let t=ve();return ts.set(t,e),typeof window<"u"&&Lm(),()=>ts.delete(t)},Ma=Fm;var La=(e,t)=>{let r,o;return function(){let s=this,n=arguments;o?(clearTimeout(r),r=setTimeout(function(){ut()-o>=t&&(e.apply(s,n),o=ut())},t-(ut()-o))):(e.apply(s,n),o=ut())}};var En=!1,rs=new Map,Fa,Da=()=>{};function Dm(e){if(rs.size===0){Da(),En=!1;return}Xe.add(()=>{ct.add(()=>{for(let t of rs.values())t(e)},0)})}function Vm(){En||(En=!0,Fa=La(e=>Dm(e),le.getProp("throttle")),Da=Ct(Fa))}var $m=e=>{let t=ve();return rs.set(t,e),typeof window<"u"&&Vm(),()=>rs.delete(t)},Va=$m;var $a=()=>{},Wa=()=>{},Ba=()=>{};function ja(e){let t=!1,r=new Map,o=!1;function s(){if(o=!1,r.size===0){Wa(),e==="START"&&$a(),t=!1;return}Xe.add(()=>{ct.add(()=>{let a={scrollY:window.pageYOffset};if(e==="END")for(let l of r.values())l(a)},0)})}function n(){t||(t=!0,Ba=Zo(()=>s()),Wa=Ct(Ba),e==="START"&&($a=Ct(({scrollY:a})=>{let l={scrollY:a};if(!o){o=!0;for(let p of r.values())p(l)}})))}return a=>{let l=ve();return r.set(l,a),typeof window<"u"&&n(),()=>r.delete(l)}}var za=ja("START"),Ha=ja("END");var c={createStore(e={}){return new fr(e)},getInstantFps(){return le.getProp("instantFps")},getFps(){return Xe.getFps()},getShouldRender(){return Xe.getShouldRender()},mustMakeSomething(){return Xe.mustMakeSomething()},shouldMakeSomething(){return Xe.shouldMakeSomething()},useFrame(e=()=>{}){return Xe.add(e)},useNextTick(e=()=>{}){return ct.add(e)},useNextFrame(e=()=>{}){return Ho.add(e)},useFrameIndex(e=()=>{},t=0){return br.add(e,t)},async useFps(e=()=>{}){let t=await qo();return e(t),t},useLoad(e=()=>{}){return la(e)},useCache:gr,useResize(e=()=>{}){return Ra(e)},useVisibilityChange(e=()=>{}){return zo(e)},useMouseClick(e=()=>{}){return ca(e)},useMouseDown(e=()=>{}){return ua(e)},useTouchStart(e=()=>{}){return pa(e)},useMouseMove(e=()=>{}){return ha(e)},useTouchMove(e=()=>{}){return da(e)},useMouseUp(e=()=>{}){return ma(e)},useTouchEnd(e=()=>{}){return fa(e)},useMouseWheel(e=()=>{}){return ga(e)},useScroll(e=()=>{}){return Ma(e)},useScrollImmediate(e=()=>{}){return Ct(e)},useScrollThrottle(e=()=>{}){return Va(e)},useScrollStart(e=()=>{}){return za(e)},useScrollEnd(e=()=>{}){return Ha(e)},checkType(e,t){return Te(e,t)},getTypeName(e){return ro(e)},getUnivoqueId(){return ve()},getTime(){return ut()},useNextLoop(e){mr(e)},store:le,normalizeWheel:Bo,ANIMATION_STOP_REJECT:on};var H=new Map;var os=({id:e="",value:t})=>{if(!e||e==="")return;let r=H.get(e);r&&H.set(e,{...r,currentRepeaterState:t,isRepeater:!0})},wr=({id:e=""})=>!e||e===""?!1:H.get(e)?.currentRepeaterState;var Ua=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=H.get(e);r&&H.set(e,{...r,element:t})},st=({id:e=""})=>!e||e===""?void 0:H.get(e)?.element,ss=({element:e})=>[...H.values()].find(r=>r?.element===e)?.id??"",ns=({key:e="",parentId:t="",container:r=document.createElement("div")})=>{if(!e||e==="")return;let s=[...H.values()].find(({key:n,parentId:i,element:a})=>n===e&&i===t&&r.contains(a))?.element;if(!s){console.warn("getElementByKey failed no element found");return}return s};var is="data-mobjs",qa="mobjs",Nt="staticprops",Tr="bindprops",Ga="name",Ja="name",Ya="slot",as="repeatid",xr="repeaterchild",ls="key",Cr="currentlistvalue",cs="bindevents",pt="weakbindevents",Mt="parentid",us="ref";var Ir={current:{},index:-1},ht="UNSET";var N=c.createStore({contentId:()=>({value:"",type:String}),rootElement:()=>({value:document.createElement("div"),type:HTMLElement}),index:()=>({value:"",type:String}),pageNotFound:()=>({value:"",type:String}),componentList:()=>({value:{},type:"any"}),routeList:()=>({value:{},type:"any"}),activeRoute:()=>({value:"",type:String,skipEqual:!1}),beforeRouteLeave:()=>({value:"",type:String,skipEqual:!1}),beforeRouteChange:()=>({value:"",type:String,skipEqual:!1}),atfterRouteChange:()=>({value:"",type:String,skipEqual:!1}),routeIsLoading:()=>({value:!1,type:Boolean}),repeaterParserRoot:()=>({value:document.createElement("div"),type:HTMLElement})});var Xa=({contentId:e=""})=>{N.set("contentId",e)},Ka=()=>{let{contentId:e}=N.get();return e},Za=()=>{let{rootElement:e}=N.get();return e},Qa=({element:e})=>{N.set("rootElement",e)};var Er=new Map,Lt=new WeakMap,kn=[],el=[],tl=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return Er.set(r,t),r},Wm=e=>{let t=e?.parentNode;for(;t;){if(Lt.has(t))return{target:t,data:Lt.get(t)};t=t?.parentNode}return{target:null,data:null}},Bm=e=>Lt.get(e)?{target:e,data:Lt.get(e)}:Wm(e);function jm(e,t){let r=t.target,{target:o,data:s}=Bm(r);if(!s||!document.contains(o))return;let n=s.find(({event:p})=>p===e);if(!n)return;let{callback:i}=n,a=ss({element:o}),l=a?wr({id:a}):Ir;Object.defineProperty(t,"target",{value:o}),i(t,l)}var rl=e=>{[...e.parentNode?.querySelectorAll(`[${pt}]`)??[]].forEach(s=>{let n=s.getAttribute(pt)??"";s.removeAttribute(pt);let i=Er.get(n);Er.delete(n);let a=i?.flatMap(l=>Object.entries(l).map(p=>{let[u,m]=p;return kn.includes(u)||kn.push(u),{event:u,callback:m}}));Lt.set(s,a)});let o=Za();kn.forEach(s=>{el.includes(s)||(el.push(s),o.addEventListener(s,jm.bind(null,s)))})};var Zt=new Map,ps=(e={})=>{let t=c.getUnivoqueId();return Zt.set(t,e),t},hs=(e="")=>{let t=Zt.get(e);return Zt.delete(e),t??{}},ol=({propsId:e})=>{e&&Zt.delete(e)},sl=()=>{Zt.clear()};var b=(e,...t)=>String.raw({raw:e},...t);var Rn={isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:5e3,debug:!1},Pn=e=>{Rn={...Rn,...e}},Ft=()=>Rn,k=({name:e="",component:t=()=>{},state:r={},exportState:o=[],isolateCreation:s=ht,isolateOnMount:n=ht,scoped:i=ht,constructorCallback:a=()=>{},connectedCallback:l=()=>{},disconnectedCallback:p=()=>{},adoptedCallback:u=()=>{},attributeToObserve:m=[],attributeChangedCallback:d=()=>{},style:f=""})=>({[e]:{componentFunction:t,componentParams:{exportState:o,isolateCreation:s,isolateOnMount:n,scoped:i,state:r,constructorCallback:a,connectedCallback:l,disconnectedCallback:p,adoptedCallback:u,attributeToObserve:m,attributeChangedCallback:d,styleSlot:f}}});var kr=new Map,nl=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return kr.set(r,t),r},il=({element:e,componentId:t,bindEventsId:r})=>{let o=kr.get(r);o&&(o.forEach(s=>{let[n]=Object.keys(s),[i]=Object.values(s);!n||!i||e.addEventListener(n,a=>{let l=wr({id:t});i(a,l)})}),kr.delete(r))},al=()=>{kr.clear()};function*$e(e){if(e){yield e;for(let t of e.children)yield*$e(t)}}function zm(e,t){let r=[];for(let o of $e(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var ds=(e,t=!0)=>{let r=[],o=e||document.body;for(let s of o.children)r=[...r,...zm(s,t)];return r};var ll=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},cl=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(s=>t!==s),e},ul=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})};var Rr=(e="")=>{if(!e||e==="")return;let r=H.get(e)?.parentId;if(r)return r},pl=({id:e=""})=>{if(!e||e==="")return;let t=H.get(e),r=t?.parentId,o=t?.component??"";if(r)for(let[s,n]of H){let{child:i}=n;if(!i)break;s===r&&H.set(s,{...n,child:{...i,...ll({currentChild:i,id:e,componentName:o})}})}},hl=({componentId:e})=>{let t=H.get(e);if(!t)return;let{element:r,parentId:o}=t;if(o&&o.length>0)return;let n=r?.parentNode?.closest(`[${is}]`),i=n&&(!o||o==="")?{...t,parentId:n?.dataset[qa]??""}:t;H.set(e,i)},dl=({element:e,id:t})=>{ds(e,!1).forEach(o=>{o.setParentId(t)})};var ms=({id:e="",unWatchArray:t=[]})=>{let r=H.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&H.set(e,{...r,parentPropsWatcher:[...o,...t]})},ml=({id:e=""})=>{if(!e||e==="")return;(H.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var fs=({componentName:e,currentProps:t={}})=>{let{componentList:r}=N.get(),o=r?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([s])=>o.includes(s)).reduce((s,n)=>{let[i,a]=n;return{...s,[i]:a}},{})},fl=({componentName:e,propName:t})=>{let{componentList:r}=N.get();return(r?.[e]?.componentParams?.exportState??[]).includes(t)};var gs=({id:e="",prop:t})=>{if(!e||e==="")return;let r=H.get(e);if(!r)return;let{freezedPros:o}=r;o&&H.set(e,{...r,freezedPros:[...o,t]})},ao=({id:e="",prop:t})=>{if(!e||e==="")return;let r=H.get(e);if(!r)return;let{freezedPros:o}=r;o&&H.set(e,{...r,freezedPros:o.filter(s=>s!==t)})},bs=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=H.get(e)?.freezedPros;return o?o.includes(t):!1};var An=(e="")=>!e||e===""?void 0:H.get(e)?.state?.get(),_e=(e="",t="",r,o=!0)=>{if((!e||e==="")&&(!t||t==="")&&!r||bs({id:e,prop:t}))return;let n=H.get(e),i=n?.state,a=n?.component??"";if(!fl({componentName:a,propName:t}))return console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`),null;if(!i)return console.warn(`setStateById failed no id found on prop: ${t}`),null;i.set(t,r,o)};var lo=(e="",t="",r=()=>{})=>(!e||e==="")&&(!t||t==="")?void 0:H.get(e)?.state?.watch(t,r);var Ke=new Map,bl=e=>{if(!("bind"in e&&"props"in e)){console.warn("bindProps not valid");return}let r=c.getUnivoqueId();return Ke.set(r,{...e,componentId:"",propsId:r}),r},gl=({componentId:e,bind:t,props:r,currentParentId:o,fireCallback:s})=>{if(!o)return;let n=An(o);if(!n)return;let i=Object.keys(n);t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`);let l=t.map(d=>({[d]:n[d]})).reduce((d,f)=>({...d,...f}),{});if(!H.has(e))return;let u=wr({id:e}),m=r?.({...l,_current:u.current,_index:u.index});m&&Object.entries(m).forEach(([d,f])=>{_e(e,d,f,s)})},_n=({propsId:e,componentId:t})=>{if(e){for(let[r,o]of Ke)r===e&&Ke.set(r,{...o,componentId:t});On({componentId:t,inizilizeWatcher:!1})}},yl=({componentId:e})=>{if(e)for(let[t,r]of Ke){let{componentId:o}=r;o===e&&Ke.delete(t)}},vl=({propsId:e})=>{e&&Ke.delete(e)},On=({componentId:e,inizilizeWatcher:t})=>{let r=[...Ke.values()].filter(o=>o?.componentId===e);if(r&&(r.forEach(o=>{let{bind:s,props:n,parentId:i}=o,a=i??Rr(e);if(!t){gl({componentId:e,bind:s,props:n,currentParentId:a??"",fireCallback:!0});return}let l=!1,p=s.map(u=>lo(a,u,()=>{l||(l=!0,c.useNextLoop(()=>{gl({componentId:e,bind:s,props:n,currentParentId:a??"",fireCallback:!0}),l=!1}))}));ms({id:e,unWatchArray:p})}),!!t))for(let[o,s]of Ke){let{componentId:n}=s;n===e&&Ke.delete(o)}},Sl=()=>{Ke.clear()};var Qt=new Map,wl=({repeatId:e,repeaterParentId:t,targetComponent:r})=>{Qt.has(e)||Qt.set(e,{repeatId:e,repeaterParentId:t,targetComponent:r})},Nn=({id:e})=>{let t=Qt.get(e);if(t)return t?.targetComponent},Tl=({id:e})=>{for(let[t,r]of Qt){let{repeaterParentId:o}=r;o===e&&Qt.delete(t)}};var Ze=({id:e=""})=>{if(!e||e==="")return;let t=[...H.values()],{component:r,element:o}=t.find(({id:l})=>l===e)||{};if(!o||!r)return;let n=H.get(e)?.child??{};Object.values(n).flat().forEach(l=>{Ze({id:l})});let a=t.find(({child:l})=>(l?.[r]??[]).includes(e))?.id;for(let[l,p]of H){let{child:u}=p;if(!u)break;if(l===a&&H.set(l,{...p,child:{...u,...cl({currentChild:u,id:e,componentName:r})}}),l===e){let{state:m,destroy:d,parentPropsWatcher:f}=p;d(),m.destroy(),f&&f.forEach(T=>T()),Tl({id:l}),yl({componentId:l})}}H.delete(e),o?.removeCustomComponent?.(),o?.remove()},xl=()=>{[...H.values()].filter(({isCancellable:t})=>t).forEach(({id:t})=>Ze({id:t}))},Pr=()=>{[...H.values()].filter(({element:t,isCancellable:r})=>r&&!document.body.contains(t)).forEach(({id:t})=>Ze({id:t})),sl(),al(),Sl()},Cl=({cb:e=()=>{},id:t=null})=>{if(!t)return;let r=H.get(t);r&&H.set(t,{...r,destroy:e})};var Mn=0,Il=()=>{Mn+=1},Ln=()=>(Mn-=1,Mn);function Hm(e){let t=[];for(let r of $e(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var El=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Hm(o)];return t};function Um(e){let t=[];for(let r of $e(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var kl=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Um(o)];return t};function qm(e,t){for(let r of $e(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var Rl=(e,t)=>{let r=e||document.body;for(let o of r.children){let s=qm(o,t);if(s)return s}return null};function Gm(e){for(let t of $e(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var Pl=e=>{let t=e||document.body;for(let r of t.children){let o=Gm(r);if(o)return o}return null};var Jm=({componentParsed:e,content:t})=>{if(e.parentNode)return e.insertAdjacentHTML("afterend",t),e.nextElementSibling},Ym=({element:e})=>{kl(e).forEach(r=>{let o=r.getDynamicProps();o!==""&&vl({propsId:o});let s=r.getStaticProps();s!==""&&ol({propsId:s}),r?.removeCustomComponent(),r?.remove()})},Xm=({element:e})=>{let t=El(e);if(t.length===0)return;[...t].map(o=>{let s=o?.getSlotPosition(),n=Rl(e,s);if(!n)return{slot:null,elementMoved:null};n.parentNode?.insertBefore(o,n);let i=n.previousSibling;return{slot:n,elementMoved:i}}).forEach(({slot:o,elementMoved:s})=>{if(!o)return;let n=o.getStaticProps();n&&s?.setPropsFromSlotId?.(n);let i=o.getDynamicProps();i&&s?.setDynamicPropsFromSlotId?.(i),o?.removeCustomComponent(),o?.remove()})},Al=({componentParsed:e,content:t})=>{let r=e.innerHTML,o=Jm({componentParsed:e,content:t});if(o){let s=e.getId(),n=e.getDelegateEventId(),i=Pl(o);i?(i.insertAdjacentHTML("afterend",r),i.remove()):o.insertAdjacentHTML("afterbegin",r),Xm({element:o}),Ym({element:o}),n&&o.setAttribute(pt,n);let{debug:a}=Ft();a&&o.setAttribute(is,s??"")}return e.remove(),o},_l=({componentParsed:e,content:t,isolateCreation:r})=>(r===ht?Ft().isolateCreation:r)?new Promise(s=>{c.useFrame(()=>{let n=Al({componentParsed:e,content:t});c.useNextTick(()=>{s({newElement:n})})})}):new Promise(s=>{let n=Al({componentParsed:e,content:t});s({newElement:n})});var Ol=()=>{customElements.define("mobjs-repeater",class extends HTMLElement{#e;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isRepeater=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(as))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getRepeatId(){return this.#e}})};var Nl=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#e;#t;#r;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(Ja),this.#t=this.shadowRoot?.host.getAttribute(Nt),this.#r=this.shadowRoot?.host.getAttribute(Tr))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#e}getStaticProps(){return this.#t}getDynamicProps(){return this.#r}})};var Ml=e=>{Object.entries(e).forEach(([t,r])=>{let{constructorCallback:o,connectedCallback:s,disconnectedCallback:n,adoptedCallback:i,attributeChangedCallback:a,styleSlot:l,attributeToObserve:p}=r.componentParams;customElements.define(t,class extends HTMLElement{#e;#t;#r;#i;#o;#a;#l;#c;#u;#p;#h;#d;#m;#f;#g;#v;#S;#w;#T;#x;#C;#I;#E;#b;#k;#s;#n;#R;static get observedAttributes(){return p}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=c.getUnivoqueId(),this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#h=()=>{},this.#d=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{},this.#e=t,this.#v=!0,this.#S="",this.#w="",this.#T="",this.#x="",this.#C="",this.#I="",this.#E="",this.#b="",this.#k="",this.#s="",this.#n="",this.isUserComponent=!0;let u=this.shadowRoot.host;if(this.#S=u.getAttribute(Ga),this.#w=u.getAttribute(Nt),this.#T=u.getAttribute(Tr),this.#k=u.getAttribute(ls),this.#x=u.getAttribute(cs),this.#E=u.getAttribute(Cr),this.#b=u.getAttribute(Ya),this.#s=u.getAttribute(Mt)??"",this.#n=u.getAttribute(xr),this.#R=u.getAttribute(pt),this.#b&&!this.active&&(this.style.visibility="hidden"),this.#n&&this.#n!==""&&wl({repeatId:this.#n,repeaterParentId:this.#s,targetComponent:this.#e}),this.shadowRoot){let m=document.createElement("style");m.textContent=l,this.shadowRoot.append(m);let d=document.createElement("slot");this.shadowRoot.append(d),o({context:this})}}getComponentName(){return this.#e}setId(u){this.#t=u}getId(){return this.#t}getParentId(){return this.#s}setParentId(u){this.#s=u}getIsPlaceholder(){return this.#v}getInstanceName(){return this.#S}getStaticPropsId(){return this.#w}getDynamicPropsid(){return this.#T}getBindEventsId(){return this.#x}getCurrentKey(){return this.#k}setDynamicPropsFromSlotId(u){this.#C=u}getDynamicPropsFromSlotId(){return this.#C}setPropsFromSlotId(u){this.#I=u}getPropsFromSlotId(){return this.#I}getCurrentListValueId(){return this.#E}getSlotPosition(){return this.#b}getDelegateEventId(){return this.#R}#y(){return{componentId:this.#t,emit:this.#r,emitAsync:this.#i,freezeProp:this.#o,getChildren:this.#a,getParentId:this.#l,getState:this.#c,remove:this.#u,setState:this.#p,unBind:this.#h,unFreezeProp:this.#d,watch:this.#m,watchSync:this.#f,watchParent:this.#g}}resetData(){this.active=!1,this.#t="",this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#h=()=>{},this.#d=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{}}inizializeCustomComponent(u){this.active||(this.active=!0,this.#t=u.id,this.#r=u.emit,this.#i=u.emitAsync,this.#o=u.freezeProp,this.#a=u.getChildren,this.#l=u.getParentId,this.#c=u.getState,this.#u=u.remove,this.#p=u.setState,this.#h=u.unBind,this.#d=u.unFreezeProp,this.#m=u.watch,this.#f=u.watchSync,this.#g=u.watchParent,s({context:this,data:this.#y()}),this.#v=!1)}disconnectedCallback(){!this.shadowRoot||!this.active||(n({context:this,data:this.#y()}),this.resetData())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||i({context:this,data:this.#y()})}attributeChangedCallback(u,m,d){!this.shadowRoot||!this.active||a({name:u,oldValue:m,newValue:d,context:this,data:this.#y()})}})})};var Ll=(e={})=>{let t=Object.values(e).reduce((r,o)=>({...r,...o}),{});N.set("componentList",t),Ml(t),Ol(),Nl()},Fn=()=>{let{componentList:e}=N.get();return e};var Fl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=[...ds(e)],o=r?.[0],s=r.slice(1);return{componentToParse:o,parseSourceArray:s}}};var Dl=e=>[...e.querySelectorAll(`[${us}]`)].reduce((r,o)=>{let s=o.getAttribute(us);o.removeAttribute(us);let n=s in r?[...r[s],o]:[o];return{...r,[s]:n}},{}),Vl=e=>Object.entries(e).map(([t,r])=>r.length===1?{[t]:r[0]}:{[t]:r}).reduce((t,r)=>({...t,...r}),{});var co=new Map,Wl=({id:e,cb:t=()=>{}})=>{co.set(e,t)},$l=async({id:e,element:t,refsCollection:r})=>{let s=await co.get(e)?.({element:t,refs:Vl(r)});Cl({cb:s,id:e}),co.delete(e)};var Dn=({isolateOnMount:e,id:t,element:r,refsCollection:o})=>(e===ht?Ft().isolateOnMount:e)?(async()=>(await $l({id:t,element:r,refsCollection:o}),new Promise(n=>{c.useNextLoop(()=>{c.useFrame(()=>{c.useNextTick(()=>{n({success:!0})})})})})))():$l({id:t,element:r,refsCollection:o});function Km(e,t){for(let r of $e(e))if(r?.isRepeater&&r?.getRepeatId?.()===t)return r;return null}var Bl=(e,t)=>{let r=e||document.body;for(let o of r.children){let s=Km(o,t);if(s)return s}return null};var Ar=new Set,jl=({id:e,state:t,container:r})=>{Ar.add({id:e,state:t,container:r})},zl=({id:e,state:t,container:r})=>{Ar.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Ar.delete(o)})},Hl=({id:e="",state:t="",container:r})=>[...Ar].some(s=>e===s.id&&t===s.state&&r===s.container);var ys=({id:e="",component:t=""})=>{if(!e||e==="")return[];let o=H.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])},vs=({id:e,component:t,filterBy:r=[]})=>{if(!st({id:e}))return;let n=ys({id:e,component:t}).map(l=>({id:l,element:st({id:l})})).filter(({element:l})=>r.length>0?r.includes(l):!0).sort(function(l,p){let{element:u}=l,{element:m}=p;return u===m||!u||!m?0:u.compareDocumentPosition(m)&2?1:-1}).map(({id:l})=>l),i=H.get(e);if(!i)return;let{child:a}=i;H.set(e,{...i,child:{...a,[t]:n}})};var ql=(e=[],t=[],r="")=>e.filter(o=>{let s=o?.[r];return!t.some(n=>n?.[r]===s)}),Gl=(e,t,r)=>e.map((o,s)=>{let n=o?.[r];return!t.some(a=>a?.[r]===n)?{isNewElement:!0,key:o?.[r],index:s}:{isNewElement:!1,key:o?.[r],index:s}}),Ul=({arr:e=[],key:t=""})=>e.every(r=>r?.[t]),Jl=({current:e,previous:t,key:r})=>Ul({arr:e,key:r})&&Ul({arr:t,key:r}),Yl=({data:e=[],key:t=""})=>e.filter((r,o,s)=>s.findIndex(n=>n?.[t]===r?.[t])===o),Dt=({component:e,getChildren:t,element:r})=>{let o=t(e);return!o||!r?[]:[...o].filter(s=>{let n=st({id:s})??null;return r.contains(n)})};var uo=new Map,Ss=e=>{let t=c.getUnivoqueId();return uo.set(t,e),t},Xl=(e="")=>{let t=uo.get(e);return uo.delete(e),t??Ir};var Zm="beforebegin",Qm="afterend";function ef({key:e,currentUnique:t,index:r,render:o,id:s,repeatId:n}){let i=t?.[r],a=` ${ls}="${e}"
    ${Cr}="${Ss({current:i,index:r})}"
    ${xr}="${n}" ${Mt}="${s}"`;return o({sync:a,html:(l,...p)=>b(l,...p)})}var Kl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:s=()=>{},key:n="",id:i="",render:a,repeatId:l})=>{let p=Yl({data:e,key:n}),m=ql(t,p,n).map(x=>{let C=x?.[n];return ns({key:C,parentId:i,container:r})}),d=Gl(p,t,n),f=d.filter(({isNewElement:x})=>!x).map(x=>ns({key:x.key,parentId:i,container:r})),T=f[0]?.parentNode??r;T&&(T.innerHTML=""),f.forEach(x=>{T&&x&&T.append(x)}),vs({id:i,component:o,filterBy:f});let g=Dt({component:o,getChildren:s,element:r}),S=d.reduce((x,C)=>C.isNewElement?(x.at(-1).push(C),x):[...x,[C]],[[]]);return S?.[0].length||S.shift(),S.forEach(x=>{let C=x[0],{isNewElement:_}=C,M=_?st({id:g[0]}):ns({key:x[0]?.key,parentId:i,container:r}),A=x.filter(V=>V.isNewElement).map(V=>ef({targetComponent:o,key:V.key,currentUnique:p,index:V.index,render:a,id:i,repeatId:l})).join(""),I=_?Zm:Qm;M?M.insertAdjacentHTML(I,A):r.insertAdjacentHTML("afterbegin",A)}),m.forEach(x=>{let C=ss({element:x});C&&Ze({id:C})}),p};var Zl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:s=()=>{},render:n,id:i,repeatId:a})=>{let l=e.length,p=t.length,u=l-p;if(u>0&&[...new Array(u).keys()].map((d,f)=>{let T=e?.[f+p],g=f+p,S=`${Cr}="${Ss({current:T,index:g})}"
            ${xr}="${a}" ${Mt}="${i}"`;return n({sync:S,html:(x,...C)=>b(x,...C)})}).forEach(d=>{r.insertAdjacentHTML("beforeend",d)}),u<0){let m=Dt({component:o,getChildren:s,element:r}),d=m.filter((T,g)=>g>=e.length),f=m.filter((T,g)=>g<e.length);r.textContent="",d.forEach(T=>{Ze({id:T})}),f.forEach(T=>{let g=st({id:T});g&&r.append(g)})}return e};var Ql=async({containerList:e=document.createElement("div"),targetComponent:t="",current:r=[],previous:o=[],getChildren:s=()=>{},key:n="",id:i,render:a,repeatId:l})=>{let m=(Jl({current:r,previous:o,key:n})?Kl:Zl)({current:r,previous:o,containerList:e,targetComponent:t,getChildren:s,key:n,id:i,render:a,repeatId:l});return N.set("repeaterParserRoot",e,!1),await N.emitAsync("repeaterParserRoot"),vs({id:i,component:t}),m};var ec=({state:e="",setState:t=()=>{},emit:r=()=>{},watch:o=()=>{},props:s={},bindEvents:n=[],clean:i=!1,dynamicProps:a,beforeUpdate:l=()=>{},afterUpdate:p=()=>{},getChildren:u=()=>{},key:m="",id:d="",containerList:f,repeatId:T="",render:g})=>{let S=Bl(f,T);S?.remove(),S?.removeCustomComponent();let x=st({id:d}),C=!0;return o(e,async(_,M)=>{if(!c.checkType(Array,_))return;if(gs({id:d,prop:e}),Hl({id:d,state:e,container:f})){ao({id:d,prop:e}),t(e,M,!1);return}let I=Nn({id:T});I&&(i||C)&&(Dt({component:I,getChildren:u,element:f}).forEach(D=>{Ze({id:D})}),f.textContent=""),jl({id:d,state:e,container:f}),l({element:x,container:f,childrenId:Dt({component:I,getChildren:u,element:f})});let V=await Ql({state:e,containerList:f,targetComponent:I,current:_,previous:i||C?[]:M,getChildren:u,key:m,props:s,dynamicProps:a,bindEvents:n,id:d,render:g,repeatId:T});C=!1;let U=Nn({id:T}),W=Dt({component:U,getChildren:u,element:f});[...W].forEach((Y,D)=>{let O=V?.[D];O&&os({id:Y,value:{current:O,index:D}})}),c.useNextLoop(async()=>{p({element:x,container:f,childrenId:W}),zl({id:d,state:e,container:f}),ao({id:d,prop:e}),t(e,V,!1)})}),()=>r(e)};var _r=new Map,tc=({repeatId:e,obj:t})=>{_r.set(e,t)};var rc=({repeatId:e,placeholderListObj:t})=>{if(!e||!t||t.length===0)return;let r=_r.get(e);if(!r)return;let o=t.find(({id:n})=>n===e),s=ec({...r,repeatId:e,containerList:o?.parent??document.createElement("div")});return _r.delete(e),s};var oc=({componentParsed:e,instanceName:t="",props:r={},state:o={},key:s="",currentRepeaterState:n=Ir,isRepeater:i=!1,parentPropsWatcher:a=[],destroy:l=()=>{},freezedPros:p=[],isCancellable:u=!0,child:m={},parentId:d="",id:f="",componentName:T=""})=>{let g=c.createStore(o);return ul({props:r,store:g}),H.set(f,{element:e,component:T,instanceName:t,destroy:l,parentPropsWatcher:a,key:s,currentRepeaterState:n,isRepeater:i,isCancellable:u,id:f,parentId:d,freezedPros:p,child:m,state:g}),{getState:()=>g.get(),setState:(S="",x={},C=!0)=>{bs({id:f,prop:S})||g.set(S,x,C)},emit:(S="")=>g.emit(S),emitAsync:async(S="")=>await g.emitAsync(S),computed:(S="",x=[],C=()=>{})=>g.computed(S,x,C),watch:(S="",x=()=>{})=>g.watch(S,x)}};var sc=({component:e})=>{let t=e.getId(),r=e.getInstanceName(),o=e.getParentId(),s=e.getStaticPropsId(),n=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getDynamicPropsFromSlotId(),l=e.getPropsFromSlotId(),p=e.getCurrentListValueId(),u=Xl(p),m=e.getCurrentKey()??"",d=e.getComponentName(),f=s?.split(" ").join(""),T=l?.split(" ").join(""),g=hs(f),S=hs(T),x={...e.dataset};return{component:e,props:{...fs({componentName:d,currentProps:x}),...fs({componentName:d,currentProps:g}),...fs({componentName:d,currentProps:S})},id:t,componentName:d,instanceName:r,key:m,dynamicPropsId:n,dynamicPropsIdFromSlot:a,bindEventsId:i,currentListValueReal:u,parentId:o}};var nc=({component:e,state:t={},isCancellable:r=!0})=>{let{component:o,props:s,id:n,componentName:i,instanceName:a,key:l,dynamicPropsId:p,dynamicPropsIdFromSlot:u,currentListValueReal:m,bindEventsId:d,parentId:f}=sc({component:e}),{getState:T,setState:g,emit:S,emitAsync:x,computed:C,watch:_}=oc({component:e,componentParsed:o,props:s,state:t,destroy:()=>{},id:n,componentName:i,instanceName:a,key:l,isCancellable:r,parentId:f});hl({componentId:n}),pl({id:n});let M=[],A=I=>ys({id:n,component:I});return m?.index!==-1&&os({id:n,value:m}),_n({propsId:p,componentId:n}),_n({propsId:u,componentId:n}),{bindEventsId:d,key:l,id:n,componentParsed:o,getState:T,setState:g,emit:S,emitAsync:x,computed:C,watch:_,repeatId:M,getChildren:A,watchSync:(I,V)=>{let U=_(I,V);return S(I),U},freezeProp:I=>gs({id:n,prop:I}),unFreezeProp:I=>ao({id:n,prop:I}),unBind:()=>ml({id:n}),bindProps:I=>`${Tr}="${bl({...I,parentId:I?.forceParent?void 0:n})}" `,staticProps:I=>` ${Nt}="${ps(I)}" `,syncParent:` ${Mt}="${n}" `,remove:()=>{Ze({id:n}),Pr()},removeDOM:I=>{I.remove(),Pr()},getParentId:()=>Rr(n),watchParent:(I,V)=>{let U=lo(Rr(n),I,V);ms({id:n,unWatchArray:[U]})},html:(I,...V)=>({id:n,content:b(I,...V),componentParsed:o}),onMount:I=>Wl({id:n,cb:I}),bindEvents:I=>`${cs}="${nl(I)}"`,delegateEvents:I=>`${pt}="${tl(I)}"`,repeat:({watch:I,clean:V=!1,beforeUpdate:U=()=>{},afterUpdate:W=()=>{},key:Y,render:D})=>{let O=c.getUnivoqueId();return M.push(O),tc({repeatId:O,obj:{state:I,setState:g,emit:S,watch:_,clean:V,beforeUpdate:U,afterUpdate:W,getChildren:A,key:Y,id:n,render:D}}),`<mobjs-repeater ${as}="${O}" style="display:none;"/>`}}};function tf(e){let t=[];for(let r of $e(e))r?.isRepeater&&r?.getRepeatId?.()&&t.push(r);return t}var ic=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...tf(o)];return t};var ws=async({element:e,functionToFireAtTheEnd:t=[],isCancellable:r=!0,currentIterationCounter:o=0,currentSelectors:s=[]})=>{if(!e)return;let n=Fn(),{componentToParse:i,parseSourceArray:a}=Fl({element:e,currentSelectors:s}),l=o===Ft().maxParseIteration;if(l&&console.warn(`dom parse reached max parse limit: ${o}`),!i||l){let D=Ln();for(let O of t.reverse()){let{onMount:q,fireDynamic:Q,fireFirstRepeat:j}=O;await q(),Q(),j()}t.length=0,s.length=0,rl(e);return}let p=i?.getComponentName(),u=n?.[p]?.componentFunction,m=n?.[p]?.componentParams,{isolateOnMount:d,isolateCreation:f,scoped:T}=m;if(!u){console.warn(`${p} component is not registered.`),i.remove(),await ws({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a});return}let g=nc({component:i,...m,isCancellable:r}),{content:S,componentParsed:x,id:C}=await u(g),{newElement:_}=await _l({content:S,componentParsed:x,isolateCreation:f}),M=_?Dl(_):{};if(dl({element:_,id:C}),!_){let D=Ln();return}Ua({id:C,newElement:_});let I=[...ic(_)].map(D=>({parent:D.parentNode,id:D.getRepeatId()})),U=(g?.repeatId).map(D=>rc({repeatId:D,placeholderListObj:I})),W=g?.bindEventsId;W&&il({element:_,componentId:C,bindEventsId:W});let Y=T===ht?Ft().scoped:T;Y&&await Dn({isolateOnMount:d,id:C,element:_,refsCollection:M}),_?.inizializeCustomComponent?.(g),t.push({onMount:async()=>{Y||await Dn({isolateOnMount:d,id:C,element:_,refsCollection:M})},fireDynamic:()=>{On({componentId:C,inizilizeWatcher:!0})},fireFirstRepeat:U.length>0?()=>{U.forEach(D=>{D?.()})}:()=>{}}),await ws({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a})};var Or=async({element:e,isCancellable:t=!0})=>{Il(),await ws({element:e,isCancellable:t,currentIterationCounter:0})},ac=()=>{N.watch("repeaterParserRoot",async e=>{await Or({element:e})})},po=async e=>{await Or({element:e})};var lc=e=>{let t=Object.entries(e).reduce((r,o)=>{let[s,n]=o;return{...r,[s]:n}},{});N.set("routeList",t)},Ts=()=>{let{routeList:e}=N.get();return e},cc=({routeName:e=""})=>{N.set("index",e)};var uc=({routeName:e=""})=>{N.set("pageNotFound",e)};var pc=async({route:e=""})=>{N.set("routeIsLoading",!0);let t=Ka(),r=document?.querySelector(t),{activeRoute:o}=N.get();N.set("beforeRouteLeave",o),N.set("beforeRouteChange",e);let s=!1,n=N.watch("beforeRouteChange",()=>{s=!0});Pr(),N.set("activeRoute",e);let i=await Ts()?.[e]?.();r.innerHTML="",scrollTo(0,0),xl(),r.insertAdjacentHTML("afterbegin",i),await Or({element:r}),s||N.set("atfterRouteChange",e),document.body.dataset.route=e,n?.(),N.set("routeIsLoading",!1)};var hc=({url:e=""})=>{let{index:t,pageNotFound:r}=N.get();return e===""?t:e in Ts()?e:r};var Vn="",dc=()=>{let e=window.location.hash.slice(1),{routeIsLoading:t}=N.get();t||pc({route:hc({url:e})})},mc=()=>{dc(),window.addEventListener("hashchange",()=>{dc()})},$n=({url:e=""})=>{window.location.hash=e,(e===Vn||Vn==="")&&window.dispatchEvent(new HashChangeEvent("hashchange")),Vn=e};var fc=()=>{N.watch("beforeRouteLeave",e=>{console.log("----------------"),console.log("before route leave",e)}),N.watch("beforeRouteChange",(e,t)=>{console.log("before route change:"),console.log("previous:",t),console.log("current:",e)}),N.watch("activeRoute",e=>{console.log("active route:",e)}),N.watch("atfterRouteChange",e=>{console.log("after route change",e),console.log("----------------")})};var Wn=async({rootId:e,wrapper:t,contentId:r,components:o={},pages:s={},afterInit:n=()=>{},index:i="home",pageNotFound:a="pageNotFound"})=>{let l=document.querySelector(e),p=t();!r||!l||(Xa({contentId:r}),Qa({element:l}),ac(),Ll(o),lc(s),cc({routeName:i}),uc({routeName:a}),l.insertAdjacentHTML("afterbegin",p),await Or({element:l,isCancellable:!1}),c.useFrameIndex(()=>{c.useNextTick(()=>{n()})},5),fc(),mc())};var qe=(e="")=>{if(!e)return;let r=[...H.values()].find(({instanceName:o})=>o===e)?.id;if(!r){console.warn("getIdByName failed no name");return}return r};var w=(e={})=>`${Nt}="${ps(e)}"`;var gc=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <g>
  <path d="m221.2 367.92-102.48-85.684 102.48-85.117c7.2812-6.1602 8.3984-16.801 2.2383-24.078-3.3594-3.9219-8.3984-6.1602-13.441-6.1602-3.9219 0-7.8398 1.1211-11.199 3.9219l-117.6 98.555c-3.9219 3.3594-6.1602 7.8398-6.1602 13.441 0 5.6016 2.2383 10.078 6.1602 13.441l118.16 98.559c3.3594 2.8008 6.7188 3.9219 11.199 3.9219 5.0391 0 10.078-2.2383 13.441-6.1602 5.6016-7.8438 4.4805-18.484-2.8008-24.641z"/>
  <path d="m623.28 288.96c0-5.0391-2.2383-10.078-6.1602-13.441l-118.72-98.559c-3.3594-2.8008-7.2812-3.9219-11.199-3.9219-5.0391 0-10.078 2.2383-13.441 6.1602-6.1602 7.2812-5.0391 17.922 2.2383 24.078l102.48 85.68-101.92 85.684c-7.2812 6.1602-8.3984 16.801-2.2383 24.078 3.3594 3.9219 7.8398 6.1602 13.441 6.1602 3.9219 0 7.8398-1.6797 11.199-3.9219l118.16-98.559c3.918-3.3594 6.1602-8.3984 6.1602-13.438z"/>
  <path d="m408.8 72.801c-1.6797-0.55859-3.3594-0.55859-5.0391-0.55859-7.2812 0-14 4.4805-16.238 12.32l-124.88 399.84c-2.8008 8.9609 2.2383 18.48 11.199 21.281 1.6797 0.55859 3.3594 0.55859 5.0391 0.55859 7.8398 0 14-5.0391 16.238-12.32l124.32-400.4c3.3633-8.3984-1.6758-17.918-10.637-20.719z"/>
 </g>
</svg>
`;var bc=({getState:e,onMount:t,html:r})=>{let{style:o,drawers:s,color:n}=e();return t(({element:i})=>(i.addEventListener("click",()=>{let a=qe("codeOverlay");_e(a,"urls",s),_e(a,"activeContent","description")}),()=>{i.remove()})),r`
        <button class="c-code-btn c-code-btn--${o} c-code-btn--${n}">
            <span class="c-code-btn__icon">${gc}</span>
        </button>
    `};var sf=k({name:"code-button",component:bc,exportState:["drawers","style","color"],state:{drawers:()=>({value:[],type:Array}),style:()=>({value:"",type:"String"}),color:()=>({value:"black",type:String})}});var pe=e=>{if(c.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+new Array(t).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=new Array(t+1).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},Oe=(e,t,r)=>Math.min(Math.max(e,t),r),yc=(e,t,r)=>(1-r)*e+r*t,Vt=(e,t)=>{let r=Object.keys(e).sort(),o=Object.keys(t).sort();return r.length===o.length&&r.every((s,n)=>s===o[n])},ho=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let s=e.slice(o,o+t);r.push(s)}return r},vc=(e,t)=>e.map(r=>r[t]);var xs=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),It=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Nr=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Mr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let s=o.fromValue,n=o.toValue;o.fromValue=n,o.toValue=s}return o})},Cs=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var Sc=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Fe=(e,t,r=!0)=>{e=(s=>{let n;try{n=JSON.parse(JSON.stringify(s))}catch{n=Object.assign({},s)}return n})(e);let o=s=>s&&typeof s=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(s=>{let n=e[s],i=t[s];Array.isArray(n)&&Array.isArray(i)?r?(e[s]=n.map((a,l)=>i.length<=l?a:Fe(a,i[l],r)),i.length>n.length&&(e[s]=e[s].concat(i.slice(n.length)))):e[s]=n.concat(i):o(n)&&o(i)?e[s]=Fe(Object.assign({},n),i,r):e[s]=i}),e)};var mo="row",fo="col",Is="radial",dt="start",Lr="end",Fr="center",Dr="edges",Vr="random",wc="MERGE_FROM_UP",Bn="MERGE_FROM_DOWN",er="equal",tr="start",rr="end",or="center",$r={type:er,each:0,waitComplete:!1,from:dt,grid:{col:1,row:1,direction:fo}},xe={index:0,frame:0};var go={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var te={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},vo="min",Tc="max",zn="desktop",So="easeLinear",bo="default",Hn={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1400},Un=10,yo=.06,qn="#ff0000",Gn="#14df3b",Jn=8,Yn=10,Xn=1e3,Kn=!1,nf=!1,af=!1,lf=.01,cf=.06,xc=e=>{let t=be({prop:"fpsScalePercent",value:e?.fpsScalePercent,defaultValue:c.store.getProp("fpsScalePercent"),type:Object}),r=be({prop:"useScaleFps",value:e?.useScaleFps,defaultValue:c.store.getProp("useScaleFps"),type:Boolean}),o=be({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:c.store.getProp("deferredNextTick"),type:Boolean}),s=be({prop:"usePassive",value:e?.usePassive,defaultValue:c.store.getProp("usePassive"),type:Boolean}),n=be({prop:"throttle",value:e?.throttle,defaultValue:c.store.getProp("throttle"),type:Number}),i=uf(e?.mq),a=be({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:zn,type:String}),l=be({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:vo,type:String}),p=be({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Un,type:Number}),u=jn(e?.sequencer?.ease,"sequencer"),m=be({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:bo,type:String}),d=be({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:yo,type:Number}),f=be({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:qn,type:String}),T=be({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:Gn,type:String}),g=be({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Jn,type:Number}),S=be({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:bo,type:String}),x=be({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:yo,type:Number}),C=be({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:Yn,type:Number}),_=jn(e?.parallaxTween?.ease,"parallaxTween"),M=be({prop:"tween.duration",value:e?.tween?.duration,defaultValue:Xn,type:Number}),A=jn(e?.tween?.ease,"tween"),I=be({prop:"tween.relative",value:e?.tween?.relative,defaultValue:Kn,type:Boolean}),V=be({prop:"spring.relative",value:e?.spring?.relative,defaultValue:nf,type:Boolean}),U=be({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:af,type:Boolean}),W=be({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:lf,type:Number}),Y=be({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:cf,type:Number});return{fpsScalePercent:t,useScaleFps:r,deferredNextTick:o,throttle:n,usePassive:s,mq:i,defaultMq:{value:a,type:l},sequencer:{duration:p,ease:u},scrollTrigger:{springConfig:m,lerpConfig:d,markerColor:{startEnd:f,item:T}},parallax:{defaultRange:g,springConfig:S,lerpConfig:x},parallaxTween:{duration:C,ease:_},tween:{duration:M,ease:A,relative:I},spring:{relative:V,config:e?.spring?.config?{...go,...e.spring.config}:go},lerp:{relative:U,precision:W,velocity:Y}}},be=({prop:e,value:t,defaultValue:r,type:o})=>{let s=c.checkType(o,t);return s||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${c.getTypeName(o)}`),s?t:r},uf=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Hn},jn=(e,t)=>{let r=Object.keys(te).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:So};function Cc(){return{fpsScalePercent:c.store.getProp("fpsScalePercent"),useScaleFps:c.store.getProp("useScaleFps"),deferredNextTick:c.store.getProp("deferredNextTick"),throttle:c.store.getProp("throttle"),usePassive:c.store.getProp("usePassive"),mq:Hn,defaultMq:{value:zn,type:vo},sequencer:{duration:Un,ease:So},scrollTrigger:{springConfig:bo,lerpConfig:yo,markerColor:{startEnd:qn,item:Gn}},parallax:{defaultRange:Jn,springConfig:bo,lerpConfig:yo},parallaxTween:{duration:Yn,ease:So},tween:{duration:Xn,ease:So,relative:Kn},spring:{relative:!1,config:go},lerp:{relative:!1,precision:.01,velocity:.06}}}var K=(()=>{let e=Cc();return{set:s=>{e=xc(Fe(Cc(),s)),"usePassive"in s&&c.store.set("usePassive",e.usePassive),"fpsScalePercent"in s&&c.store.set("fpsScalePercent",e.fpsScalePercent),"useScaleFps"in s&&c.store.set("useScaleFps",e.useScaleFps),"deferredNextTick"in s&&c.store.set("deferredNextTick",e.deferredNextTick),"throttle"in s&&c.store.set("throttle",e.throttle)},get:s=>{if(s in e)return e[s];console.warn(`handleSetUp: ${s} is not a setup propierties`)},print:()=>{console.log("Writable props:"),console.log(e)}}})();var h={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Et=e=>e.map(t=>`${t} | `).join(""),$t=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Qe=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},kt=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},Ic=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},Ec=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},kc=()=>{console.warn("relative prop is not allowed inside a timeline")},Rc=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},Pc=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Timeline will stopped.")},Ac=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},_c=e=>{console.warn(`timeline setTween: ${e} is not a string`)},Oc=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},Nc=()=>{console.warn("setTween fail")},Mc=e=>{console.warn(`label ${e} not founded`)},Lc=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Fc=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},Zn=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Dc=()=>{console.warn("Spring configProp: all prop must be a positive Number")},Vc=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},sr=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Es=()=>{console.warn("stagger each must be a Number ")},$c=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Wc=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Bc=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var jc=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},zc=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Hc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Uc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},qc=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Gc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Jc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Yc=()=>{console.warn("createStaggers error: items array can not be empty")},Xc=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Kc=()=>{console.warn(`screateStaggers error: type should be: ${er} || ${dt} || ${rr} || ${or}`)},Zc=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Qc=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},Qn=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},eu=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},tu=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},ru=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},ou=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},su=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},nr=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},nu=e=>{console.warn(`${e} value must be a string`)},iu=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},au=()=>{console.warn("asyncTimeline arror: delay must be a Number")},lu=e=>{console.warn(`${e} not found`)},cu=e=>{console.warn(`timeline add async function, ${e} is not a function `)},uu=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${h.DIRECTION_VERTICAL} | ${h.DIRECTION_HORIZONTAL}`)},pu=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},hu=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},du=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},mu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Et(t)} or a Number between 0 and 100`)},fu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Et(t)}`)},gu=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},bu=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Et(t)}`)},yu=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Et(t)} or a custom css propierites like margin|line-height|...`)},vu=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Et(t)}`)},Su=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Et(t)}`)},wu=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and ParallaxTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},Tu=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Et(t)}`)},xu=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},Cu=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},ei=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Et(t)}`)},Iu=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},Eu=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ku=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},Ru=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},Pu=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},ti=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Et(r)}, es: 45deg|100px|50vw etc..`)},Au=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},_u=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var nt={[te.easeLinear]:(e,t,r,o)=>r*e/o+t,[te.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[te.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[te.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[te.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[te.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[te.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[te.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[te.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[te.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[te.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[te.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[te.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[te.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[te.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[te.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[te.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[te.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[te.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[te.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[te.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[te.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[te.easeInElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o)===1?t+r:(n||(n=o*.3),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n))+t)},[te.easeOutElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o)===1?t+r:(n||(n=o*.3),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-s)*(2*Math.PI)/n)+r+t)},[te.easeInOutElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(n||(n=o*(.3*1.5)),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n)*.5+r+t)},[te.easeInBack]:(e,t,r,o,s=1.70158)=>r*(e/=o)*e*((s+1)*e-s)+t,[te.easeOutBack]:(e,t,r,o,s=1.70158)=>r*((e=e/o-1)*e*((s+1)*e+s)+1)+t,easeInOutBack:(e,t,r,o,s=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((s*=1.525)+1)*e-s))+t:r/2*((e-=2)*e*(((s*=1.525)+1)*e+s)+2)+t,[te.easeInBounce]:(e,t,r,o)=>r-nt[te.easeOutBounce](o-e,0,r,o)+t,[te.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[te.easeInOutBounce]:(e,t,r,o)=>e<o/2?nt[te.easeInBounce](e*2,0,r,o)*.5+t:nt[te.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var We=e=>e in nt?nt[e]:(sr(e),nt[K.get("tween").ease]);var Ou=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,"\\$&"):"",ri=e=>/^[+-]?\d+(\.\d+)?$/.test(e),Nu=e=>/^\d+\.\d+$|^\d+$/.test(e),fe=(e,t)=>{let r=new RegExp(`^${Ou(t)}$`,"i");return(e.match(r)||[]).length},mt=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},oi=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),si=(e,t)=>e.some(r=>{let o=new RegExp(`^${Ou(r)}$`,"i");return(t.match(o)||[]).length});var Mu=e=>e&&(fe(e,h.PROP_VERTICAL)?h.PROP_VERTICAL:fe(e,h.PROP_HORIZONTAL)?h.PROP_HORIZONTAL:fe(e,h.PROP_ROTATE)?h.PROP_ROTATE:fe(e,h.PROP_ROTATEY)?h.PROP_ROTATEY:fe(e,h.PROP_ROTATEX)?h.PROP_ROTATEX:fe(e,h.PROP_OPACITY)?h.PROP_OPACITY:fe(e,h.PROP_SCALE)?h.PROP_SCALE:fe(e,h.PROP_SCALE_X)?h.PROP_SCALE_X:fe(e,h.PROP_SCALE_Y)?h.PROP_SCALE_Y:fe(e,h.PROP_TWEEN)?h.PROP_TWEEN:e),Lu=e=>{if(e){if(mt(e,h.PX))return h.PX;if(mt(e,h.VH))return h.VH;if(mt(e,h.VW))return h.VW}return""},ks=e=>fe(e,h.POSITION_TOP)?h.POSITION_TOP:fe(e,h.POSITION_BOTTOM)?h.POSITION_BOTTOM:fe(e,h.POSITION_LEFT)?h.POSITION_LEFT:fe(e,h.POSITION_RIGHT)?h.POSITION_RIGHT:"",Fu=e=>mt(e,h.PX)?h.PX:mt(e,h.VH)?h.VH:mt(e,h.VW)?h.VW:mt(e,h.WPERCENT)?h.WPERCENT:mt(e,h.HPERCENT)?h.HPERCENT:mt(e,h.DEGREE)?h.DEGREE:h.PX;var it=e=>c.checkType(Number,e)||c.checkType(Function,e)&&c.checkType(Number,e()),Rs=({start:e,end:t})=>{let r=c.checkType(Number,e),o=c.checkType(Number,t);return r||Ic(e),o||Ec(t),r&&o},Wt=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&Hc(e),t?e:K.get("sequencer").duration},Ps=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&qc(e),t?e:1},Du=e=>{let t=e in nt;return!t&&e!==void 0&&e!==null&&sr(e),t?e:K.get("sequencer").ease},Vu=e=>{let t=e in nt;return!t&&e!==void 0&&e!==null&&sr(e),t?We(e):We(K.get("parallaxTween").ease)},$u=(e,t)=>{let r=c.checkType(String,e),o=c.checkType(Number,t);return r||Gc(e),o||Jc(t),r&&o},Wu=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||Es(),t},Bu=e=>{if(!e)return null;let r=[dt,Lr,Fr,Dr,Vr].includes(e),o=c.checkType(Number,e),s=c.checkType(Object,e),n=r||o||s;return n||zc(e),n},ni=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||$c(e),t},ju=e=>{if(!e)return null;let r=[Is,mo,fo].includes(e);return r||Bc(e),r},zu=e=>{if(!e)return null;let t=c.checkType(Boolean,e);return t||Wc(e),t},Hu=(e=[])=>{let t=c.checkType(Array,[...e])&&e.length>0;return t||Yc(),t},Uu=(e=[])=>c.checkType(Array,[...e])&&e.length>0?e:[],qu=e=>{if(!e)return null;let r=[er,tr,rr,or].includes(e);return r||Kc()};var Bt=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Qc(e,t),r?e:K.get(t).relative},As=e=>{let t=e in nt;return!t&&e!==void 0&&e!==null&&sr(e),t?We(e):We(K.get("tween").ease)},_s=e=>{let t=e in nt;return!t&&e!==void 0&&e!==null&&sr(e),t?e:K.get("tween").ease},ii=e=>{let{config:t}=K.get("spring"),r=e in t,o=r?t[e]:{},n=(r?c.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>c.checkType(Number,i)&&i>=0):null;return!r&&e!==void 0&&e!==null&&Zn(e),!n&&r&&Vc(e),n?t[e]:t.default},Gu=e=>{let{config:t}=K.get("spring"),r=e in t;return!r&&e!==void 0&&e!==null&&Zn(e),r},ai=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r)&&r>=0);return!t&&e!==void 0&&e!==null&&Dc(),t?e:{}},li=e=>{let r=c.checkType(Function,e)?e():e,o=c.checkType(Number,r);return!o&&e!==void 0&&e!==null&&Uc(e),o?r:K.get("tween").duration},et=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Qn(e,t),r&&e===!0},re=(e,t,r)=>{let o=c.checkType(Boolean,e);return!o&&e!==void 0&&e!==null&&Qn(e,t),o?e:r},Os=(e,t,r)=>{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&eu(e,t),o?e:r},ft=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&tu(e,t),o?e:r},Be=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&ru(e,t),o?e:r},Ns=e=>{let t=c.checkType(Number,e)&&e>0&&e<=1;return!t&&e!==void 0&&e!==null&&ou(),t?e:K.get("lerp").velocity},Ms=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&su(),t?e:K.get("lerp").precision},Ju=(e,t)=>{let r=c.checkType(String,e);return!r&&e!==void 0&&e!==null&&nu(t),r},wo=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&au(),t?e:null},ir=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e!==void 0&&e!==null&&iu(),t},Yu=(e,t)=>{e===-1&&lu(t)},jt=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&Pu(r,e),o?e:t},Xu=e=>{let t=c.checkType(Function,e);return!t&&e!==void 0&&e!==null&&cu(e),t?e:({resolve:r})=>{r()}},Ku=e=>{let t=c.checkType(Array,e);return!t&&e!==void 0&&e!==null&&Ac(e),t},Zu=e=>{let t=c.checkType(String,e);return!t&&e!==void 0&&e!==null&&_c(e),t},Wr=(e,t=!1)=>{let o=c.checkType(Element,e)?e:document.querySelector(e),s=o&&o!==void 0&&o!==null;return t?s?o:window:s?o:document.createElement("div")},ci=e=>{let r=c.checkType(Element,e)?e:document.querySelector(e);return r&&r!==void 0&&r!==null?r:null},To=(e,t)=>{let o=[h.DIRECTION_VERTICAL,h.DIRECTION_HORIZONTAL].includes(e);return!o&&e!==void 0&&e!==null&&uu(e,t),o?e:h.DIRECTION_VERTICAL},ui=(e,t)=>{let r=[h.POSITION_TOP,h.POSITION_LEFT,h.POSITION_RIGHT,h.POSITION_BOTTOM],o=c.checkType(Object,e),s=o&&c.checkType(String,e?.position)&&r.includes(e.position),n=o&&c.checkType(Function,e.value)&&c.checkType(Number,e.value()),i=o&&s&&n;return i||pu(t),i?e:null},Qu=e=>{let t=c.checkType(Function,e)&&c.checkType(Number,e());return!t&&e!==void 0&&e!==null&&hu(),t?e:null},ep=e=>{let t=e?.getType?.()&&(e.getType()===h.TWEEN_TWEEN||e.getType()===h.TWEEN_TIMELINE);return!t&&e!==void 0&&e!==null&&du(),t?e:{}},tp=e=>{let t=[h.ALIGN_START,h.ALIGN_TOP,h.ALIGN_RIGHT,h.ALIGN_CENTER,h.ALIGN_BOTTOM,h.ALIGN_LEFT,h.ALIGN_END],r=t.includes(e)||c.checkType(Number,Number.parseFloat(e));return!r&&e!==void 0&&e!==null&&mu(e,t),r?e:h.ALIGN_CENTER},rp=e=>{let t=[h.IN_BACK,h.IN_STOP,h.OUT_BACK,h.OUT_STOP],r=t.includes(e);return!r&&e!==void 0&&e!==null&&fu(e,t),r?e:!1},pi=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&gu(e,t),o?e:r},op=e=>{let t=e?e.toLowerCase():null,r=[h.TYPE_PARALLAX,h.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t!==void 0&&t!==null&&bu(t,r),o?t:h.TYPE_PARALLAX},sp=(e,t)=>(()=>{if(t===h.TYPE_PARALLAX){let o=Nu(e),s=c.checkType(Number,Number.parseFloat(e))&&o&&e>=0&&e<10;return!s&&e!==void 0&&e!==null&&xu(e),s?10-e:10-K.get("parallax").defaultRange}else{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&Cu(e),o?e:"0px"}})(),ar=(e,t,r)=>{let o=K.get("mq"),s=K.get("defaultMq").value,n=Object.keys(o),i=c.checkType(String,e)&&n.includes(e);return!i&&e!==void 0&&e!==null&&ei(e,n,t,r),i?e:s},lr=(e,t,r)=>{let o=K.get("defaultMq").type,s=[Tc,vo],n=c.checkType(String,e)&&s.includes(e);return!n&&e!==void 0&&e!==null&&ei(e,s,t,r),n?e:o},np=(e,t,r,o)=>{let s=[h.PROP_VERTICAL,h.PROP_HORIZONTAL,h.PROP_ROTATE,h.PROP_ROTATEY,h.PROP_ROTATEX,h.PROP_ROTATEZ,h.PROP_OPACITY,h.PROP_SCALE,h.PROP_SCALE_X,h.PROP_SCALE_Y,h.PROP_TWEEN],n=c.checkType(String,e);!n&&e!==void 0&&e!==null&&yu(e,s);let i=t===h.TYPE_PARALLAX&&e===h.PROP_TWEEN&&!r;!r&&!o&&e===h.PROP_TWEEN&&ku(),(r||o)&&e!==h.PROP_TWEEN&&Ru(),i&&Iu();let a=i?h.PROP_VERTICAL:e,l=Mu(a);return n?l:h.PROP_VERTICAL},ip=(e,t,r)=>{let o=[h.EASE_SPRING,h.EASE_LERP],s=t&&r&&e===h.EASE_SPRING,n=o.includes(e);!n&&e!==void 0&&e!==null&&vu(e,o),s&&wu();let i=n?e:h.EASE_LERP,a=s?h.EASE_LERP:i;return n?e:a},Ls=(e,t)=>{let r=[h.EASE_SPRING,h.EASE_LERP],o=r.includes(e);return!o&&e!==void 0&&e!==null&&Su(e,r,t),o?e:h.EASE_LERP},ap=(e,t)=>{let r=K.get("spring").config,o=Object.keys(r),s=t===h.TYPE_PARALLAX?K.get("parallax").springConfig:K.get("scrollTrigger").springConfig,n=o.includes(e);return!n&&e!==void 0&&e!==null&&Tu(e,o),n?e:s},lp=(e,t)=>{let r=c.checkType(Number,Number.parseFloat(e))&&e>0&&e<=1;!r&&e!==void 0&&e!==null&&Eu();let o=t===h.TYPE_PARALLAX?K.get("parallax").lerpConfig:K.get("scrollTrigger").lerpConfig;return r?Number.parseFloat(e):o},cp=(e,t)=>{let r=[h.PX,h.VW,h.VH,h.WPERCENT,h.HPERCENT];if(t===h.PROP_VERTICAL||t===h.PROP_HORIZONTAL){let s=oi(r,e);return s||ti(e,t,r),s?e:"0px"}if(t===h.PROP_ROTATE||t===h.PROP_ROTATEX||t===h.PROP_ROTATEY||t===h.PROP_ROTATEZ){let s=oi([h.DEGREE],e);return s||ti(e,t,[h.DEGREE]),s?e:"0"}if(t===h.PROP_SCALE||t===h.PROP_SCALE_X||t===h.PROP_SCALE_Y){let s=ri(e);return s||_u(e,t),s?e:"0"}let o=ri(e);return o||Au(t),o?e:"0"};var Fs=e=>{let{instantFps:t}=c.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},tt=e=>({type:qu(e?.stagger?.type)?e.stagger.type:$r.type,each:Wu(e?.stagger?.each)?e.stagger.each:$r.each,from:Bu(e?.stagger?.from)?e?.stagger?.from:tr,grid:{col:ni(e?.stagger?.grid?.col)?e.stagger.grid.col:$r.grid.col,row:ni(e?.stagger?.grid?.row)?e.stagger.grid.row:$r.grid.row,direction:ju(e?.stagger?.grid?.direction)?e.stagger.grid.direction:fo},waitComplete:zu(e?.stagger?.waitComplete)?e.stagger.waitComplete:$r.waitComplete}),gt=(e,t)=>e.length>t.length?e:t;var xo=e=>e%2,pf=e=>Math.floor(Math.random()*e),hf=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},df=(e,t,r,o=[])=>{let{from:s,each:n}=r,i=Fs(n);if(s===Vr)return{index:e,frame:o[pf(o.length)]};if(s===dt)return{index:e,frame:e*i};if(s===Lr)return{index:e,frame:(t-1-e)*i};if(s===Fr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?xo(t)===0&&a-e===1?{index:e,frame:0}:xo(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(s===Dr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?xo(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:xo(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:xo(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(s&&Te(Number,s)){let a=s>=t?t-1:s;return e>a?{index:e,frame:(e-a)*n}:e<a?{index:e,frame:(a-e)*n}:{index:e,frame:0}}return{index:0,frame:0}},up=(e,t,r)=>{if(t.grid.direction===mo){let o=ho(e,r);return[...[...new Array(t.grid.col).keys()].reduce((n,i,a)=>[...n,...vc(o,a)],[])].flat()}else return e},pp=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,l=up(e,r,n).map(g=>g&&g!==void 0?g:{index:0,frame:0}),u=up(t,r,n).map(g=>g&&g!==void 0?g:{index:0,frame:0}),m=r.grid.direction===mo?i:n,d=ho(l,m),f=d[0];return f.forEach((g,S)=>{let{index:x,frame:C}=df(S,d[0].length,r,hf(f,r.each,S));g.index=x,g.frame=C,C>=o.frame&&(o={index:x,frame:C}),C<=s.frame&&(s={index:x,frame:C})}),d.forEach(g=>{g.forEach((S,x)=>{S&&(S.index=d[0][x].index,S.frame=d[0][x].frame)})}),d.flat().forEach((g,S)=>{l[S].index=g.index,l[S].frame=g.frame,u.length>0&&(u[S].index=g.index,u[S].frame=g.frame)}),{staggerArray:l,staggerArrayOnComplete:u,fastestStagger:s,slowlestStagger:o}};var mf=(e,t,r)=>e.reduce((o,s,n)=>{let i=Math.abs(n-r),a=s.reduce((l,p,u)=>u<t-i||u>t+i?l:[...l,p],[]);return[...o,a]},[]),ff=(e,t,r,o)=>e.reduce((s,n,i)=>{let a=Math.abs(i-r),l=[];if(i>=r&&i<=r*2)return[...s,l];let p=t-a,u=t+a;for(let d=0;d<a;d++)Ds(o,r+d,p)&&l.push(o[r+d][p]),Ds(o,r+d,u)&&l.push(o[r+d][u]),d>0&&(Ds(o,r-d,p)&&l.push(o[r-d][p]),Ds(o,r-d,u)&&l.push(o[r-d][u]));let m=l.filter(d=>d!=null);return[...s,m]},[]),Ds=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,hi=(e,t)=>{let{col:r}=t.grid,{x:o,y:s}=t.from,n=ho(e,r);[...new Array(r).keys()].forEach(()=>{n.push([])});let i=mf(n,o,s),a=ff(i,o,s,n),l=i.reduce((f,T,g)=>{let S=[...i[g],...a[g]];return f.push(S),f},[]),p=l.length;return{cleanArray:((s>=p/2?wc:Bn)===Bn?l.reduce((f,T,g)=>{if(g<s)return f;if(g===s){let S=[...l[g]];return f.push(S),f}else{let S=l[s-(g-s)]??[],x=[...l[g],...S];return f.push(x),f}},[]):l.reduce((f,T,g)=>{if(g>s)return f;if(g===s){let S=[...l[g]];return f.push(S),f}else{let S=l[s+(s-g)]??[],x=[...l[g],...S];return f.push(x),f}},[]).reverse()).reduce((f,T)=>T.length===0?f:[...f,T],[])}};var gf=({arr:e,stagger:t,slowlestStagger:r,fastestStagger:o,endArr:s})=>{c.checkType(Object,t?.from)||(t.from={}),c.checkType(Number,t?.from?.x)||(t.from={...t.from,x:0}),c.checkType(Number,t?.from?.y)||(t.from={...t.from,y:0});let{cleanArray:n}=hi(e,t),i=0;n.forEach((u,m)=>{u.forEach(d=>{let f=Fs(t.each),T=m*f;d.index=i,d.frame=T,T>=r.frame&&(r={index:i,frame:T}),T<=o.frame&&(o={index:i,frame:T}),i++})});let a=(()=>{if(s.length>0){let{cleanArray:u}=hi(s,t);return u.flat()}else return[]})(),l=n.flat(),p=a.flat();return l.forEach((u,m)=>{p.length>0&&(p[m].index=u.index,p[m].frame=u.frame)}),{staggerArray:l,staggerArrayOnComplete:p,fastestStagger:o,slowlestStagger:r}},bf=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=[dt,Lr,Fr,Dr,Vr];return(!c.checkType(String,r?.from)&&!c.checkType(Number,r?.from)||c.checkType(String,r?.from)&&!n.includes(r?.from))&&(jc(),r.from=dt),pp({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})},rt=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=r?.grid?.direction===Is?gf({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s}):bf({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s}),i=n.staggerArray,a=n.staggerArrayOnComplete,l=n.fastestStagger,p=n.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:l,slowlestStagger:p}};var Br=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:s})=>{if(e.each===0||!s){c.useFrame(()=>{t.forEach(({cb:n})=>{n(o)})}),c.useFrame(()=>{r.forEach(({cb:n})=>{c.useCache.fireObject({id:n,obj:o})})});return}t.forEach(({cb:n,frame:i})=>{c.useFrameIndex(()=>{n(o)},i)}),r.forEach(({cb:n,frame:i})=>{c.useCache.update({id:n,callBackObject:o,frame:i})})},jr=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:s,stagger:n,slowlestStagger:i,fastestStagger:a,useStagger:l})=>{if(n.each===0||!l){e(),c.useNextFrame(()=>{t.forEach(({cb:p})=>{p(s)}),r.forEach(({cb:p})=>{c.useCache.fireObject({id:p,obj:s})}),o.forEach(({cb:p})=>{p(s)})});return}t.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(n.waitComplete){m===i.index&&(p(s),e());return}m===a.index&&(p(s),e())},u)}),r.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(n.waitComplete){m===i.index&&(c.useCache.fireObject({id:p,obj:s}),e());return}m===a.index&&(c.useCache.fireObject({id:p,obj:s}),e())},u)}),o.forEach(({cb:p,frame:u})=>{c.useFrameIndex(()=>{p(s)},u+1)})};var Co=c.createStore({id:0});var Ce=(e,t)=>{let{id:r}=Co.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],s=r;return Co.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:n=>n.map(({id:i,cb:a,index:l,frame:p})=>(i===s&&(a=()=>{}),{id:i,cb:a,index:l,frame:p}))}},bt=(e,t,r,o)=>{let{id:s}=Co.get(),{id:n,unsubscribe:i}=c.useCache.add(e,t),a=[...r,{cb:n,id:s,index:-1,frame:-1}];o.push(i);let l=s;return Co.quickSetProp("id",s+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:p=>(i(),p.map(({id:u,cb:m,index:d,frame:f})=>(u===l&&(m=-1),{id:u,cb:m,index:d,frame:f})))}};var zt=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}}),zr=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>{},fromIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),settled:!1}}),Hr=(e,t)=>Object.keys(e).map(r=>{if(!it(t[r])||!it(e[r]))return kt(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let o=c.checkType(Number,e[r])?e[r]:e[r](),s=c.checkType(Number,t[r])?t[r]:t[r]();return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:c.checkType(Function,e[r]),currentValue:o,toValue:s,toFn:t[r],toIsFn:c.checkType(Function,t[r]),settled:!1}}),Ur=e=>Object.keys(e).map(t=>{if(!it(e[t]))return kt(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}});var qr=(e,t,r,o)=>{c.useFrame(()=>{c.useNextTick(({time:s,fps:n})=>{let i=e.map(({cb:a})=>a()).includes(!0);t(s,n,o),i&&r()})})};var Ht=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Gr=(e,t,r,o)=>(c.checkType(Number,e)||Es(),e>0&&t&&(r.length>0||o.length>0));var Vs=(e,t)=>{c.useFrame(()=>{c.useNextTick(({time:r,fps:o})=>{e(r,o,t)})})};var ge=(e,t)=>e.map(r=>({[r.prop]:Number.parseFloat(r[t])})).reduce((r,o)=>({...r,...o}),{}),Jr=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Yr=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var $s=(e,t)=>t.map(r=>{let o=e.find(s=>s.prop===r.prop);return o?{...r,...o}:r}),hp=(e,t)=>t.map(r=>{let o=e.find(s=>s.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Rt=class{constructor(t){this.stagger=tt(t),this.relative=Bt(t?.relative,"lerp"),this.velocity=Ns(t?.velocity),this.precision=Ms(t?.precision),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,velocity:this.velocity,precision:this.precision,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{}){this.isActive=!0,this.values.forEach(i=>{i.settled||(i.currentValue=yc(i.currentValue,i.toValue,this.velocity/r*60),i.currentValue=pe(i.currentValue),i.settled=Number(Math.abs(i.toValue-i.currentValue).toFixed(4))<=this.precision,i.settled&&(i.currentValue=i.toValue))});let s=ge(this.values,"currentValue");if(Br({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:s,useStagger:this.useStagger}),this.values.every(i=>i.settled===!0)){let i=()=>{this.isActive=!1,this.values.forEach(l=>{l.fromValue=l.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},a=ge(this.values,"toValue");jr({onComplete:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:a,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:i,fps:a})=>{this.isActive&&this.draw(i,a,o)})})}onReuqestAnim(t,r,o){this.values.forEach(s=>{s.currentValue=Number.parseFloat(s.fromValue)}),this.draw(t,r,o)}async inzializeStagger(){if(Gr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();Ht("lerp",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),qr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Nr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=xs(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Vs(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,fromValue:s,currentValue:s,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Fe(this.values,this.initialData)}mergeProps(t){let r={...this.defaultProps,...t},{velocity:o,precision:s,relative:n}=r;return this.relative=Bt(n,"lerp"),this.velocity=Ns(o),this.precision=Ms(s),r}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=zt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=zr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Vt(t,r))return $t("lerp goFromTo:",t,r),this.promise;let s=Hr(t,r);return this.doAction(s,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Ur(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=$s(t,this.values);let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(et(s,"reverse")&&(this.values=Mr(o,this.values)),this.values=Cs(this.values,this.relative),et(n,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Yr(this.values)}getToNativeType(){return Jr(this.values)}getType(){return"LERP"}getId(){return this.uniqueId}updateVelocity(t){this.velocity=Ns(t),this.defaultProps=Fe(this.defaultProps,{velocity:this.velocity})}updatePrecision(t){this.velocity=Ms(t),this.defaultProps=Fe(this.defaultProps,{precision:this.precision})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var at=class{constructor(t){this.stagger=tt(t),this.relative=Bt(t?.relative,"spring"),this.configProps=ii(t?.config),this.updateConfigProp(t?.configProp),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,configProps:this.configProps,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{},s,n,i,a){this.isActive=!0,this.values.forEach(u=>{let m=-s*(u.currentValue-u.toValue),d=-n*u.velocity,f=(m+d)/i;u.velocity=u.velocity+f*1/r,u.currentValue=u.currentValue+u.velocity*1/r,u.currentValue=pe(u.currentValue);let T=Math.abs(u.velocity)<=.1,g=s===0?!0:Math.abs(u.toValue-u.currentValue.toFixed(4))<=a;u.settled=T&&g});let l=ge(this.values,"currentValue");if(Br({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:l,useStagger:this.useStagger}),this.values.every(u=>u.settled===!0)){let u=()=>{this.isActive=!1,this.values.forEach(d=>{d.fromValue=d.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},m=ge(this.values,"toValue");jr({onComplete:u,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:m,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:u,fps:m})=>{this.isActive&&this.draw(u,m,o,s,n,i,a)})})}onReuqestAnim(t,r,o){this.values.forEach(l=>{l.velocity=Math.trunc(this.configProps.velocity)});let s=this.configProps.tension,n=this.configProps.friction,i=Math.max(1,this.configProps.mass),a=this.configProps.precision;this.draw(t,r,o,s,n,i,a)}async inzializeStagger(){if(Gr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();Ht("spring",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),qr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Nr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=xs(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Vs(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,fromValue:s,velocity:this.configProps.velocity,currentValue:s,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Fe(this.values,this.initialData)}mergeProps(t){let o=K.get("spring").config,s=Gu(t?.config)?o[t.config]:this.defaultProps.configProps,n=ai(t?.configProp),i={...s,...n},a={...this.defaultProps,...t,configProps:i},{configProps:l,relative:p}=a;return this.configProps=l,this.relative=p,a}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=zt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=zr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Vt(t,r))return $t("spring goFromTo:",t,r),this.promise;let s=Hr(t,r);return this.doAction(s,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Ur(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=$s(t,this.values);let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(et(s,"reverse")&&(this.values=Mr(o,this.values)),this.values=Cs(this.values,this.relative),et(n,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Yr(this.values)}getToNativeType(){return Jr(this.values)}getType(){return"SPRING"}getId(){return this.uniqueId}updateConfigProp(t={}){let r=ai(t);this.configProps={...this.configProps,...r},this.defaultProps=Fe(this.defaultProps,{configProps:r})}updateConfig(t){this.configProps=ii(t),this.defaultProps=Fe(this.defaultProps,{configProps:this.configProps})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var yf=(e="desktop")=>window.innerWidth<K.get("mq")[e],vf=(e="desktop")=>window.innerWidth>=K.get("mq")[e],Sf=(e="desktop")=>K.get("mq")[e],oe={max:yf,min:vf,getBreackpoint:Sf};var he=()=>{},Ws=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ut=class{constructor(t={}){if(this.propsIsValid=!0,this.endValue=0,this.percent=0,this.screenWidth=0,this.screenHeight=0,this.firstTouchValue=0,this.threshold=30,this.maxValue=0,this.minValue=0,this.dragEnable=null,this.touchend=null,this.touchmove=null,this.prevTouchVal=0,this.touchVal=0,this.onUpdateScrollBar=he,this.subscribeResize=he,this.subscribeScrollStart=he,this.subscribeScrollEnd=he,this.subscribeTouchStart=he,this.subscribeTouchEnd=he,this.subscribeMouseDown=he,this.subscribeMouseUp=he,this.subscribeMouseWheel=he,this.subscribeMouseMove=he,this.subscribeTouchMove=he,this.subscribeMouseClick=he,this.motion=null,this.unsubscribeMotion=he,this.unsubscribeOnComplete=he,this.scrollbarIsRunning=!1,this.direction=To(t?.direction,"SmoothScroller"),this.easeType=Ls(t?.easeType,"SmoothScroller"),this.breakpoint=ar(t?.breakpoint,"breakpoint","SmoothScroller"),this.queryType=lr(t?.queryType,"queryType","SmoothScroller"),this.scroller=c.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,!this.scroller){console.warn("SmoothScroller: scroller node not found"),this.propsIsValid=!1;return}if(this.screen=t?.screen?c.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,!this.screen){this.propsIsValid=!1,console.warn("SmoothScroller: screen node not found");return}this.scopedEvent=re(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.speed=ft(t?.speed,"SmoothScroller: speed",60),this.drag=re(t?.drag,"SmoothScroller: drag",!1),this.onTickCallback=Be(t?.onTick,"SmoothScroller: onTick",null),this.onUpdateCallback=Be(t?.onUpdate,"SmoothScroller: onUpdate",null),this.onAfterRefresh=Be(t?.afterRefresh,"SmoothScroller: afterRefresh",he),this.afterInit=Be(t?.afterInit,"SmoothScroller: afterInit",he),this.children=t?.children||[],this.children.forEach(r=>{r.setScroller(this.scroller),r.setDirection(this.direction),r.setScreen(this.screen),r.setBreakPoint(this.breakpoint),r.setQueryType(this.queryType),r.init()}),this.scopedWhell=r=>{let{spinY:o}=c.normalizeWheel(r);this.onScopedWhell({target:r.target,spinY:o})},this.scopedTouchMove=r=>{let{clientX:o,clientY:s}=r.touches?r.touches[0]:r;this.onScopedTouchMove({client:{x:o,y:s}})}}init(){if(this.propsIsValid){switch(this.easeType){case h.EASE_SPRING:{this.motion=new at;break}default:{this.motion=new Rt;break}}this.scopedEvent?(this.scroller.addEventListener("wheel",this.scopedWhell,{passive:!0}),this.scroller.addEventListener("mousemove",this.scopedTouchMove,{passive:!0}),this.scroller.addEventListener("touchmove",this.scopedTouchMove,{passive:!0})):(this.subscribeMouseWheel=c.useMouseWheel(t=>this.onWhell(t)),this.subscribeMouseMove=c.useMouseMove(t=>this.onTouchMove(t)),this.subscribeTouchMove=c.useTouchMove(t=>this.onTouchMove(t))),this.subscribeResize=c.useResize(()=>this.refresh()),this.subscribeScrollStart=c.useScrollStart(()=>this.refreshScroller()),this.subscribeScrollEnd=c.useScrollEnd(()=>this.refreshScroller()),this.subscribeTouchStart=c.useTouchStart(t=>this.onMouseDown(t)),this.subscribeTouchEnd=c.useTouchEnd(t=>this.onMouseUp(t)),this.subscribeMouseDown=c.useMouseDown(t=>this.onMouseDown(t)),this.subscribeMouseUp=c.useMouseUp(t=>this.onMouseUp(t)),this.drag&&(this.subscribeMouseClick=c.useMouseClick(({target:t,preventDefault:r})=>{this.preventChecker({target:t,preventDefault:r})})),this.initMotion(),oe[this.queryType](this.breakpoint)&&(this.setScrolerStyle(),this.refreshScroller()),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)}}setScrolerStyle(){this.scroller.style["user-select"]="none",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable",!1),r.style["user-select"]="none"})}removeScrolerStyle(){this.scroller.style["user-select"]="",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}initMotion(){this.motion.setData({val:0}),this.unsubscribeMotion=this.motion.subscribe(({val:t})=>{this.scroller.style.transform=this.direction==h.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-t}px)`:`translate3d(0px, 0px, 0px) translateX(${-t}px)`,this.children.forEach(r=>{r.triggerScrollStart()}),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!0}),this.children.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.unsubscribeOnComplete=this.motion.onComplete(({val:t})=>{this.scroller.style.transform=this.direction==h.DIRECTION_VERTICAL?`translateY(${-t}px)`:`translateX(${-t}px)`,c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!1}),this.children.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})})}refreshScroller(){this.screenWidth=this.screen===document.documentElement?window.innerWidth:ot(this.screen),this.screenHeight=this.screen===document.documentElement?window.innerHeight:Se(this.screen),this.maxValue=this.direction===h.DIRECTION_VERTICAL?this.scroller.offsetHeight-this.screenHeight:this.scroller.offsetWidth-this.screenWidth,this.calculateValue()}onScopedTouchMove({client:t}){!this.dragEnable||!this.drag||(this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(t),this.endValue+=Number.parseInt(this.prevTouchVal-this.touchVal),this.calculateValue(),this.scrollbarIsRunning=!1)}onScopedWhell({spinY:t}){oe[this.queryType](this.breakpoint)&&(this.dragEnable=!1,this.endValue+=t*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}onMouseDown({target:t,client:r}){oe[this.queryType](this.breakpoint)&&(t===this.scroller||to(this.scroller,t))&&(this.firstTouchValue=this.endValue,this.dragEnable=!0,this.prevTouchVal=this.getMousePos(r),this.touchVal=this.getMousePos(r),this.scrollbarIsRunning=!1)}onMouseUp(){this.dragEnable=!1,this.scrollbarIsRunning=!1}onTouchMove({target:t,client:r,preventDefault:o}){if((t===this.scroller||to(this.scroller,t))&&this.dragEnable&&this.drag){o(),this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(r);let s=Number.parseInt(this.prevTouchVal-this.touchVal);this.endValue+=s,this.calculateValue(),this.scrollbarIsRunning=!1}}onWhell({target:t,spinY:r,preventDefault:o}){let s=document.body.style.overflow==="hidden"&&this.direction===h.DIRECTION_VERTICAL;!oe[this.queryType](this.breakpoint)||s||(t===this.scroller||to(this.scroller,t))&&(this.dragEnable=!1,o(),this.endValue+=r*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}move(t){oe[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.goTo({val:this.endValue}).catch(()=>{}))}set(t){oe[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.set({val:this.endValue}).catch(()=>{}))}calculateValue(){let t=this.endValue*100/this.maxValue;this.percent=Oe(t,0,100),this.endValue=Oe(this.endValue,0,this.maxValue),this.motion.goTo({val:this.endValue}).catch(()=>{}),this.onUpdateCallback&&this.onUpdateCallback({value:-this.endValue,percent:this.percent,parentIsMoving:!0})}preventChecker({target:t,preventDefault:r}){oe[this.queryType](this.breakpoint)&&(t===this.scroller||to(this.scroller,t))&&Math.abs(this.endValue-this.firstTouchValue)>this.threshold&&r()}getMousePos(t){let{x:r,y:o}=t;return this.direction===h.DIRECTION_VERTICAL?o:r}refresh(){if(!oe[this.queryType](this.breakpoint)){this.removeScrolerStyle(),this.motion?.stop?.(),c.useFrame(()=>{c.useNextTick(()=>{this.scroller.style.transform=""})});return}this.refreshScroller(),this.setScrolerStyle(),c.useFrameIndex(()=>{c.useNextTick(()=>{this.onAfterRefresh&&this.onAfterRefresh(),this.children.forEach(t=>{t?.refresh?.()})})},2)}destroy(){this.removeScrolerStyle(),this.subscribeResize(),this.subscribeScrollStart(),this.subscribeScrollEnd(),this.subscribeTouchStart(),this.subscribeTouchEnd(),this.subscribeMouseDown(),this.subscribeMouseUp(),this.subscribeMouseWheel(),this.subscribeMouseMove(),this.subscribeTouchMove(),this.subscribeMouseClick(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.onUpdateScrollBar=()=>{},this.motion?.destroy(),this.motion=null,this.children.forEach(t=>{t?.destroy?.(),t=null}),this.children=[],this.onTickCallback=[],this.onUpdateCallback=[],this.onAfterRefresh=[],this.afterInit=[],this.scopedEvent&&(this.scroller.removeEventListener("wheel",this.scopedWhell),this.scroller.removeEventListener("mousemove",this.scopedTouchMove),this.scroller.removeEventListener("touchmove",this.scopedTouchMove)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=[],this.scroller=null,this.screen=null})},3)}};var Pt=class{constructor(t){this.ease=As(t?.ease),this.duration=li(t?.duration),this.relative=Bt(t?.relative,"tween"),this.stagger=tt(t),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.comeFromResume=!1,this.startTime=0,this.isRunning=!1,this.timeElapsed=0,this.pauseTime=0,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={duration:this.duration,ease:_s(t?.ease),relative:this.relative,reverse:!1,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r=()=>{}){this.isActive=!0,this.pauseStatus&&(this.pauseTime=t-this.startTime-this.timeElapsed),this.timeElapsed=t-this.startTime-this.pauseTime,this.isRunning&&Math.round(this.timeElapsed)>=this.duration&&(this.timeElapsed=this.duration),this.values.forEach(n=>{n.shouldUpdate?(n.currentValue=this.ease(this.timeElapsed,n.fromValue,n.toValProcessed,this.duration),n.currentValue=pe(n.currentValue)):n.currentValue=n.fromValue});let o=Math.round(this.timeElapsed)===this.duration,s=ge(this.values,"currentValue");Br({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:s,useStagger:this.useStagger}),this.isRunning=!0,o?jr({onComplete:()=>{this.isActive=!1,this.isRunning=!1,this.pauseTime=0,this.values.forEach(i=>{i.shouldUpdate&&(i.toValue=i.currentValue,i.fromValue=i.currentValue)}),this.pauseStatus||(r(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:s,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger}):c.useFrame(()=>{c.useNextTick(({time:n})=>{this.isActive&&this.draw(n,r)})})}onReuqestAnim(t,r,o){this.startTime=t,this.draw(t,o)}async inzializeStagger(){if(Gr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();Ht("tween",t);let r=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Qe(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=rt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),qr(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseTime=0,this.pauseStatus=!1,this.comeFromResume=!1,this.values=Nr(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive=!1}pause(){this.pauseStatus||(this.pauseStatus=!0)}resume(){this.pauseStatus&&(this.pauseStatus=!1,this.comeFromResume=!0)}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,toValueOnPause:s,toValProcessed:s,fromValue:s,currentValue:s,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}))}resetData(){this.values=Fe(this.values,this.initialData)}updateDataWhileRunning(){this.isActive=!1,this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0),this.values.forEach(t=>{t.shouldUpdate&&(t.fromValue=t.currentValue)})}mergeProps(t){let r={...this.defaultProps,...t},{ease:o,duration:s,relative:n}=r;return this.ease=As(o),this.relative=Bt(n,"tween"),this.duration=li(s),r}goTo(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=zt(t);return this.doAction(o,r,t)}goFrom(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=zr(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if((this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0,!Vt(t,r))return $t("tween goFromTo:",t,r),this.promise;let s=Hr(t,r);return this.doAction(s,o,t)}set(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!1;let o=Ur(t);return r.duration=1,this.doAction(o,r,t)}doAction(t,r,o){this.values=hp(t,this.values),this.isActive&&this.updateDataWhileRunning();let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(et(s,"reverse")&&(this.value=Mr(o,this.values)),this.values=Sc(this.values,this.relative),et(n,"immediate "))return this.isActive=!1,this.values=It(this.values),Promise.resolve();if(et(i,"immediateNoPromise")){this.isActive=!1,this.values=It(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return ge(this.values,"currentValue")}getInitialData(){return ge(this.initialData,"currentValue")}getFrom(){return ge(this.values,"fromValue")}getTo(){return ge(this.values,"toValue")}getFromNativeType(){return Yr(this.values)}getToNativeType(){return Jr(this.values)}getType(){return"TWEEN"}getId(){return this.uniqueId}updateEase(t){this.ease=As(t),this.defaultProps=Fe(this.defaultProps,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=Ce(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var At=(()=>{let e="easeOutQuad",t=new Pt({ease:e,data:{val:0}}),r=!1,o=!1,s=e;t.subscribe(({val:a})=>{window.scrollTo({top:a,left:0,behavior:"auto"})});function n(){o&&(document.body.style.overflow=""),s&&t.updateEase(e)}c.useMouseWheel(()=>{r&&(t.stop(),n())}),c.useMouseDown(()=>{r&&(t.stop(),n())}),c.useTouchStart(()=>{r&&(t.stop(),n())});function i(a=null,l={}){if(typeof window<"u"){let p=a?sn(a)||c.checkType(Number,a)?sn(a)?ie(a).top:a:(console.warn(`bodyScroll ${a} is not valid target, must be a node or a number`),0):0,u=ft(l?.duration,"bodyScroll: duration",500);o=re(l?.overflow,"bodyScroll: overflow",!1),s=l?.ease?_s(l?.ease):null,o&&(document.body.style.overflow="hidden"),s&&t?.updateEase?.(s);let m=window.pageYOffset;return new Promise((d,f)=>{r=!0,t.goFromTo({val:m},{val:p},{duration:u}).then(()=>{n(),r=!1,d()}).catch(()=>{r=!1,f(c.ANIMATION_STOP_REJECT)})})}}return{to:i}})();var Io=(()=>{let e=[],t=0;function r(l){let p=c.checkType(Element,l);return p||console.warn(`slide utils ${l} is not a valid Dom element`),p}function o(l){let p={};return p.item=l,p.id=t,p.tween=new Pt({ease:"easeOutQuad"}),p.unsubscribe=p.tween.subscribe(({val:u})=>{p.item.style.height=`${u}px`}),p.tween.setData({val:0}),p}function s(l){if(!r(l))return;if(e.find(({item:d})=>d===l)){console.warn(`slide utils ${l} is alredysubscribed`);return}let u=o(l);e.push(u);let m=t;return t++,e.push(u),()=>{u.unsubscribe(),u.tween=null,u.item=null,e=e.filter(({id:d})=>d!==m)}}function n(l){r(l)&&(l.style.height=0,l.style.overflow="hidden")}function i(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:g})=>g===l);m||u(new Error("slide element not exist in slide store"));let{item:d,tween:f}=m,T=Se(d);f.goFromTo({val:T},{val:0},{duration:500}).then(()=>{p()})})}function a(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:S})=>S===l);m||u(new Error("slide element not exist in slide store"));let{item:d,tween:f}=m,{val:T}=f.get();d.style.height="auto";let g=Se(d);d.style.height=`${T}px`,f.goTo({val:g},{duration:500}).then(()=>{d.style.height="auto",p()})})}return{subscribe:s,reset:n,up:i,down:a}})();function dp({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:s,onLeave:n,onLeaveBack:i}){let a=()=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?h.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?h.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?h.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?h.ON_ENTER:h.ON_NOOP;({[h.ON_LEAVE]:()=>{n&&n()},[h.ON_ENTER_BACK]:()=>{s&&s()},[h.ON_LEAVE_BACK]:()=>{i&&i()},[h.ON_ENTER]:()=>{o&&o()},[h.ON_NOOP]:()=>{}})[a()]()}var wf=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),s=document.createElement("span");s.className+=`p-marker p-marker--start  p-marker-${o}`,s.innerHTML=`start ${o}`;let n=document.createElement("span");n.className+=`p-marker p-marker--end  p-marker-${o}`,n.innerHTML=`end ${o}`,document.body.append(s),document.body.append(n);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},Tf=({screen:e})=>{if(e===window)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},xf=({startPoint:e,direction:t,invertSide:r,top:o,bottom:s,left:n,right:i})=>t===h.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+s}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+n}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},Cf=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:s,bottom:n,left:i,right:a})=>r===h.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},mp=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:s,direction:n,invertSide:i,label:a})=>{let{lastStartMarker:l,lastEndMarkerEl:p}=wf({startMarker:e,endMarker:t,label:a}),{top:u,right:m,bottom:d,left:f}=Tf({screen:s}),T=xf({startPoint:r,direction:n,invertSide:i,top:u,bottom:d,left:f,right:m}),g=Cf({startPoint:r,endPoint:o,direction:n,invertSide:i,top:u,bottom:d,left:f,right:m}),S={position:"fixed",zIndex:"99999",background:K.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return c.useFrame(()=>{Object.assign(l?.style,{...S,...T}),Object.assign(p?.style,{...S,...g})}),{startMarker:l,endMarker:p}};var Bs=class{constructor(){this.parallaxInstance=void 0,this.trasponderActive=!1,this.scrollerHeight=0,this.start=0,this.startFromTop=0,this.scroller=window,this.invertSide=void 0,this.end=0,this.orientation=h.DIRECTION_VERTICAL,this.compesateValue=0,this.trigger=null,this.item=void 0,this.spring=void 0,this.wrapper=void 0,this.pin=void 0,this.isOver=!1,this.isInner=!1,this.isUnder=!1,this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeSpring=()=>{},this.firstTime=!0,this.itemRequireStyleToWrapper=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.itemRequireStyleWhenTraspond=["font-size","padding","margin","line-height","white-space"],this.parentRequireStyle=["text-align"],this.itemRequireStyleToPin=["z-index","pointer-events"],this.styleToTranspond=["transform","position","translate","rotate","scale"],this.nonRelevantRule=["none","static"],this.isInizialized=!1,this.prevScroll=0,this.prevscrollY=0,this.animatePin=!1,this.anticipateFactor=1.5,this.forceTranspond=!1,this.justPinned=!1,this.afterPinCounter=0,this.lastStep=0,this.afterJustPinned=!1,this.afterJustPinnedCounter=0,this.numeCycleToFreeze=3}init({instance:t}){this.parallaxInstance=t,this.item=t.item,this.marker=t.marker,this.trigger=t.trigger||t.item,this.scroller=t.scroller,this.screen=t.screen,this.animatePin=t.animatePin,this.anticipatePinOnLoad=t.anticipatePinOnLoad,this.forceTranspond=t.forceTranspond,this.invertSide=t.invertSide,this.orientation=t.direction,this.prevscrollY=window.pageYOffset,this.scrollerHeight=t.scrollerHeight,this.refreshCollisionPoint(),this.collisionTranslateProp=this.orientation===h.DIRECTION_VERTICAL?"Y":"X",this.collisionStyleProp=this.orientation===h.DIRECTION_VERTICAL?"top":"left",this.isInizialized=!0,this.firstTime=!0,this.createPin(),this.addStyleFromPinToWrapper(),this.setPinSize(),this.setUpMotion(),this.unsubscribeScrollStart=c.useScrollStart(()=>{if(this.isInizialized&&this.screen!==window&&this.isInner&&this.pin){let r=()=>{this.pin&&(this.pin.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")};c.useFrame(()=>{r()})}}),this.unsubscribeScroll=c.useScroll(({scrollY:r})=>{if(this.isInizialized&&this.screen!==window){this.orientation===h.DIRECTION_VERTICAL&&this.refreshCollisionPoint();let o=r-this.prevscrollY;if(this.prevscrollY=r,this.isInner&&this.pin){let{verticalGap:s}=this.spring.get(),n=s-o;this.spring.setData({collision:0,verticalGap:n}),c.useFrame(()=>{this.pin&&(this.pin.style.transform=`translate(0px,${n}px)`)})}}})}setUpMotion(){this.spring=new at({data:{collision:0,verticalGap:0},config:"wobbly"}),this.unsubscribeSpring=this.spring.subscribe(({collision:t,verticalGap:r})=>{this.orientation===h.DIRECTION_VERTICAL&&this.pin?this.pin.style.transform=`translate(0px, ${t}px)`:this.pin&&(this.pin.style.transform=`translate(${t}px, ${r}px)`)})}resetSpring(){this.pin&&this.spring.set({collision:0,verticalGap:0}).catch(()=>{})}createPin(){this.item||(this.item=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.item?.parentNode;o&&o.insertBefore(t,this.item),r.append(this.item),this.wrapper=this.item.closest(".pin-wrapper"),this.pin=this.item.closest(".pin");let s=this.addRquiredStyle(),n=this.addPinStyleFromItem(),i=(()=>{if(!this.marker)return{};let p=`3px ${K.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return this.orientation===h.DIRECTION_VERTICAL?this.invertSide?{borderBottom:p}:{borderTop:p}:this.invertSide?{borderRight:p}:{borderLeft:p}})(),a={display:"table"};c.useFrame(()=>{!this.pin||!this.wrapper||(Object.assign(this.wrapper.style,{...i}),Object.assign(this.pin.style,{...a,...n,...s}))}),this.checkIfShouldTranspond()}setPinSize(){(()=>{if(!this.pin||!this.wrapper)return;let r=this.wrapper.offsetHeight,o=this.wrapper.offsetWidth;this.wrapper.style.height=`${r}px`,this.wrapper.style.width=`${o}px`,this.pin.style.height=`${r}px`,this.pin.style.width=`${o}px`})()}addStyleFromPinToWrapper(){if(!this.item)return;let t=window.getComputedStyle(this.item),r=this.itemRequireStyleToWrapper.reduce((o,s)=>({...o,[s]:t.getPropertyValue(s)}),{});c.useFrame(()=>{this.wrapper&&Object.assign(this.wrapper.style,r)})}findStyle(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let s=getComputedStyle(o);if(s[r]&&!this.nonRelevantRule.includes(s[r]))return{[r]:s[r]};o=o.parentNode}}addRquiredStyle(){return this.pin?this.parentRequireStyle.map(t=>this.findStyle(this.pin,t)).filter(t=>t!==null).reduce((t,r)=>({...t,...r}),{}):{}}checkIfShouldTranspond(){if(this.forceTranspond){this.shoulTranspond=!0;return}this.shoulTranspond=this.styleToTranspond.map(t=>{let r=this.findStyle(this.wrapper,t);if(!r)return!1;let[o]=Object.keys(r),[s]=Object.values(r);return o==="position"?s==="fixed"||s==="absolute":!0}).includes(!0)}refreshCollisionPoint(){this.start=this.parallaxInstance.startPoint,this.screen!==window&&(this.start-=this.parallaxInstance.direction===h.DIRECTION_VERTICAL?Ye(this.screen).top:Ye(this.screen).left),this.startFromTop=this.invertSide?this.start:this.scrollerHeight-this.start,this.end=this.parallaxInstance.endPoint,this.compesateValue=this.invertSide?-Math.trunc(this.end):Math.trunc(this.end)}destroy(){this.isInizialized&&(this.parallaxInstance=null,this.spring.stop(),this.unsubscribeSpring(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.spring.destroy(),this.spring=null,this.afterPinCounter=0,this.justPinned=!1,this.isUnder=!1,this.isInner=!1,this.isOver=!1,this.pin&&this.wrapper&&(this.wrapper.parentNode?.insertBefore(this.item,this.wrapper),this.pin.remove(),this.wrapper.remove(),this.wrapper=void 0,this.pin=void 0,this.isInizialized=!1))}getGap(){return this.wrapper?this.orientation===h.DIRECTION_VERTICAL?Ye(this.wrapper).top-this.startFromTop:Ye(this.wrapper).left-this.startFromTop:0}animateCollision(){let t=this.getGap();this.tween(t)}animateCollisionBack(){let t=this.invertSide?this.getGap()-this.end:this.getGap()+this.end;this.tween(t)}tween(t){let r=()=>{!this.pin||!this.collisionStyleProp||(this.pin.style[this.collisionStyleProp]=`${this.startFromTop}px`)};c.useFrame(()=>r()),this.animatePin&&!this.firstTime&&this.pin&&this.spring.goFrom({collision:t}).then(()=>{this.resetPinTransform()}).catch(()=>{})}resetPinTransform(){let t=()=>{this.pin&&(this.pin.style.transform="translate(0px, 0px)")};c.useFrame(()=>{t()})}resetStyleWhenUnder(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.pin.style.top="",this.pin.style.left="")};c.useFrame(()=>{t()})}resetStyleWhenOver(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.orientation===h.DIRECTION_VERTICAL?(this.pin.style.left="",this.pin.style.top=`${this.compesateValue}px`):(this.pin.style.top="",this.pin.style.left=`${this.compesateValue}px`))};c.useFrame(()=>{t()})}setFixedPosition(){if(!this.pin)return;let t=this.orientation===h.DIRECTION_VERTICAL?Ye(this.pin).left:Ye(this.pin).top,r=this.orientation===h.DIRECTION_VERTICAL?"left":"top",o=()=>{this.pin&&(this.pin.style.position="fixed",this.pin.style[r]=`${t}px`,this.justPinned=!0,this.afterJustPinned=!0)};c.useFrame(()=>{o()})}addPinStyleFromItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleToPin.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}addStyleToItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleWhenTraspond.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}removeStyleToItem(){return this.itemRequireStyleWhenTraspond.reduce((t,r)=>({...t,[r]:""}),{})}activateTrasponder(){if(this.shoulTranspond){let t=this.addRquiredStyle(),r=this.addPinStyleFromItem(),o=this.addStyleToItem(),s=()=>{this.pin&&(Object.assign(this.pin.style,{...r,...t}),this.item&&Object.assign(this.item.style,o),document.body.append(this.pin))};c.useFrame(()=>{s()}),this.trasponderActive=!0}}deactivateTrasponder(){if(!this.shoulTranspond||!this.item||!this.wrapper)return;let t=()=>{this.pin&&(Object.assign(this.item.style,this.removeStyleToItem()),this.wrapper?.append(this.pin))};c.useFrame(()=>{t()}),this.trasponderActive=!1}getAnticipate(t){let r=this.afterJustPinned&&this.afterJustPinnedCounter<3?this.lastStep:Oe(Math.abs(t-this.prevScroll),0,250);return this.afterJustPinned&&this.afterJustPinnedCounter<this.numeCycleToFreeze?this.afterJustPinnedCounter++:(this.afterJustPinnedCounter=0,this.afterJustPinned=!1),this.lastStep=r,r*this.anticipateFactor}getAnticipateValue(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),s=r===h.SCROLL_UP?0:o,n=r===h.SCROLL_UP?0:o*2,i=r===h.SCROLL_UP?o:0;return{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}}getAnticipateValueInverted(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),s=r===h.SCROLL_UP?o:0,n=r===h.SCROLL_UP?o*2:0,i=r===h.SCROLL_UP?0:o;return{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}}onScroll(t){if(!this.isInizialized||!this.wrapper)return;if(this.justPinned&&this.afterPinCounter<this.numeCycleToFreeze){this.afterPinCounter++;return}else this.afterPinCounter=0,this.justPinned=!1;let r=this.prevScroll>t?h.SCROLL_UP:h.SCROLL_DOWN,o=this.orientation===h.DIRECTION_VERTICAL?Ye(this.wrapper).top:Ye(this.wrapper).left,{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}=this.invertSide?this.getAnticipateValueInverted(t,r):this.getAnticipateValue(t,r),a=this.invertSide?o<this.start-s:o>this.scrollerHeight-this.start+s,l=this.invertSide?o>=this.start-n&&o<=this.start+i+this.end:o<=this.scrollerHeight-this.start+n&&this.scrollerHeight-o<=this.end+i+this.start;if(a)this.isUnder||(this.resetStyleWhenUnder(),this.deactivateTrasponder(),this.isUnder=!0,this.isInner=!1,this.isOver=!1);else if(l){if(!this.isInner){this.setFixedPosition();let p=r===h.SCROLL_DOWN&&!this.invertSide||r===h.SCROLL_UP&&this.invertSide;this.activateTrasponder(),p?this.animateCollision():this.animateCollisionBack(),this.isUnder=!1,this.isInner=!0,this.isOver=!1}}else this.isOver||(this.resetStyleWhenOver(),this.deactivateTrasponder(),this.isUnder=!1,this.isInner=!1,this.isOver=!0);this.prevScroll=t,this.firstTime=!1}};var fp=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},gp=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},bp=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var di=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),yp=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:s,isFromTopLeft:n})=>{let i=t*o-s,a=r-t*o-s;return e?n?i:a:n?a:i},vp=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:s,startPoint:n,isFromTopLeft:i})=>e?i?t-r*(100-o*s)-n:r*(100-o*s)-n:i?t-r*o*s-n:r*o*s-n,Sp=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:s})=>e+t>o-r&&e<o+(s+r),wp=(e,t)=>{let r=e.find(l=>[...l].some(p=>!Number.isNaN(Number.parseFloat(p)))),o=Lu(r);if(r&&!o)return fp(),di();if(r&&o===h.VH&&t===h.DIRECTION_HORIZONTAL)return gp(),di();if(r&&o===h.VW&&t===h.DIRECTION_VERTICAL)return bp(),di();let s=[h.PLUS_HEIGHT,h.PLUS_HEIGHT_HALF,h.PLUS_WIDTH,h.PLUS_WIDTH_HALF,h.MINUS_HEIGHT,h.MINUS_HEIGHT_HALF,h.MINUS_WIDTH,h.MINUS_WIDTH_HALF],n=e.find(l=>si(s,l)),i=[h.POSITION_BOTTOM,h.POSITION_TOP,h.POSITION_LEFT,h.POSITION_RIGHT],a=e.find(l=>si(i,l));return{numberVal:r||0,unitMisure:o,additionalVal:n??"",position:a??h.POSITION_BOTTOM}},Tp=(e,t,r)=>{let s=String(t).split(" "),{numberVal:n,unitMisure:i,additionalVal:a,position:l}=wp(s,r),u=String(n).charAt(0)==="-"?-1:1,d=Number.parseFloat(String(n).replaceAll(/^\D+/g,""))??0;return i===h.PX?{value:d*u,additionalVal:a,position:ks(l)}:{value:e*d*u,additionalVal:a,position:ks(l)}},xp=(e,t,r,o,s,n)=>{let a=String(t).split(" "),{numberVal:l,unitMisure:p,additionalVal:u,position:m}=wp(a,n),f=String(l).charAt(0)==="-"?-1:1,g=Number.parseFloat(String(l).replaceAll(/^\D+/g,""))??0,S=ks(m),x=S===h.POSITION_TOP||S===h.POSITION_LEFT;return p===h.PX?{value:yp(s?{invert:!0,endValInNumber:g,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:x}:{invert:!1,endValInNumber:g,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:x}),additionalVal:u,position:S}:{value:vp(s?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:g,isNegative:f,startPoint:r,isFromTopLeft:x}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:g,isNegative:f,startPoint:r,isFromTopLeft:x}),additionalVal:u,position:S}},mi=(e,t,r,o)=>{let s=String(t);return fe(s,h.PLUS_HEIGHT_HALF)?e+r/2:fe(s,h.PLUS_HEIGHT)?e+r:fe(s,h.PLUS_WIDTH_HALF)?e+o/2:fe(s,h.PLUS_WIDTH)?e+o:fe(s,h.MINUS_HEIGHT_HALF)?e-r/2:fe(s,h.MINUS_HEIGHT)?e-r:fe(s,h.MINUS_WIDTH_HALF)?e-o/2:fe(s,h.MINUS_WIDTH)?e-o:e},Cp=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case h.IN_STOP:return!t&&r>0||t&&r<0?0:r;case h.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case h.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case h.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Ip=(e,t)=>{switch(e){case h.PROP_OPACITY:return 1-t;default:return-t}};var qt=class{constructor(t){this.isInzialized=!1,this.firstScroll=!1,this.willChangeIsActive=!1,this.offset=0,this.screenPosition=0,this.endValue=0,this.height=0,this.width=0,this.scrollerScroll=0,this.scrollerHeight=0,this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.gap=150,this.numericRange=0,this.unsubscribeResize=()=>{},this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeScrollEnd=()=>{},this.unsubscribeMarker=()=>{},this.startMarker=void 0,this.endMarker=void 0,this.lastValue=void 0,this.prevFixedRawValue=0,this.fixedShouldRender=!1,this.prevFixedClamp=void 0,this.firstTime=!0,this.isInViewport=!1,this.iSControlledFromOutside=!1,this.force3D=!1,this.pinInstance=void 0,this.unitMisure="",this.startPoint=0,this.endPoint=0,this.unsubscribeMotion=()=>{},this.unsubscribeOnComplete=()=>{},this.pin=re(t?.pin,"Scrolltrigger pin propierties error:",!1),this.animatePin=re(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.forceTranspond=re(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.anticipatePinOnLoad=re(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.start=Os(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.end=Os(t?.end,"Scrolltrigger end propierties error:","top"),this.fromTo=re(t?.fromTo,"Scrolltrigger fromTo propierties error:",!1),this.invertSide=re(t?.invertSide,"Scrolltrigger invertSide propierties error:",!1),this.marker=Os(t?.marker,"Scrolltrigger marker propierties error:",null),this.dynamicStart=t?.dynamicStart?ui(t.dynamicStart,"dynamicStart"):null,this.dynamicEnd=t?.dynamicEnd?ui(t.dynamicEnd,"dynamicEnd"):null,this.dynamicRange=Qu(t?.dynamicRange),this.animateAtStart=re(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.onEnter=jt(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.onEnterBack=jt(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.onLeave=jt(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.onLeaveBack=jt(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.onTickCallback=jt(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.align=tp(t?.align),this.onSwitch=rp(t?.onSwitch),this.reverse=re(t?.reverse,"Parallax reverse propierties error:",!1),this.opacityStart=pi(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.opacityEnd=pi(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.limiterOff=re(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.useWillChange=t?.useWillChange,this.tween=ep(t?.tween);let r=this.tween?.getType&&this.tween.getType()===h.TWEEN_TIMELINE,o=this.tween?.getType&&this.tween.getType()===h.TWEEN_TWEEN;this.item=Wr(t?.item,!1),this.scroller=Wr(t?.scroller,!0),this.screen=Wr(t?.screen,!0),this.trigger=ci(t?.trigger),this.applyTo=ci(t?.applyTo),this.direction=To(t?.direction,"Parallax/Scrolltrigger"),this.disableForce3D=re(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.useThrottle=re(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.type=op(t?.type),this.range=sp(t?.range,this.type),this.perspective=ft(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.breakpoint=ar(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.queryType=lr(t?.queryType,"queryType","parallax/scrolltrigger"),this.propierties=np(t?.propierties,this.type,o,r),this.ease=re(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),this.easeType=ip(t?.easeType,r,this.type===h.TYPE_SCROLLTRIGGER),this.springConfig=ap(t?.springConfig,this.type),this.lerpConfig=lp(t?.lerpConfig,this.type),this.motionParameters=this.easeType===h.EASE_SPRING?{configProp:{precision:h.EASE_PRECISION}}:{precision:h.EASE_PRECISION},this.motion=(r&&(this.easeType=h.EASE_LERP,this.motionParameters={precision:h.EASE_PRECISION}),this.easeType===h.EASE_SPRING?new at:new Rt)}init(){if(this.isInzialized){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.isInzialized=!0,this.setMotion(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.setPerspective(),this.propierties===h.PROP_TWEEN&&(this.range=this?.tween?.getDuration?this.tween.getDuration():0,this.dynamicRange=()=>this.range,this.tween?.inzializeStagger?.()),this.type==h.TYPE_SCROLLTRIGGER&&(this.limiterOff=!0,this.calcRangeAndUnitMiusure(),this.calcFixedLimit());let t=r=>{if(this.pin)return this.unsubscribeScroll=c.useScrollImmediate(r),c.useScrollImmediate;this.ease&&this.useThrottle?(this.unsubscribeScroll=c.useScrollThrottle(r),c.useScrollThrottle):(this.unsubscribeScroll=c.useScroll(r),c.useScroll)};this.ease?(this.unsubscribeScrollStart=c.useScrollStart(()=>{this.firstScroll=!0,this.disableForce3D||(this.force3D=!0)}),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{c.useFrame(()=>{c.useNextTick(()=>{this.smoothParallaxJs()})})}),this.scroller===window&&t(()=>{!c.getShouldRender()&&!this.firstScroll||(this.firstScroll=!1,this.smoothParallaxJs())}),this.smoothParallaxJs()):(this.scroller===window&&t(()=>{this.computeValue(),this.noEasingRender()}),this.computeValue(),this.noEasingRender(),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{this.noEasingRender({forceRender:!0})})),this.scroller!==window&&this.marker&&(this.unsubscribeMarker=c.useScroll(()=>{this.calcFixedLimit()})),this.unsubscribeResize=c.useResize(({horizontalResize:r})=>{r&&this.refresh()}),this.pin&&(this.pinInstance=new Bs,oe[this.queryType](this.breakpoint)&&c.useNextTick(()=>{this.getScrollerOffset(),this.pinInstance?.init({instance:this}),this.pinInstance?.onScroll(this.scrollerScroll)}))}setScroller(t){this.scroller=Wr(t,!0)}setScreen(t){this.screen=Wr(t,!0)}setDirection(t){this.direction=To(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.breakpoint=ar(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.queryType=lr(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.perspective&&this.item&&this.item.parentNode){let t={perspective:`${this.perspective}px`,"transform-style":"preserve-3d"},r=this.item.parentNode;Object.assign(r.style,t)}}setMotion(){let t=h.PROP_SCALE||h.PROP_SCALE_X||h.PROP_SCALE_Y||h.PROP_OPACITY?1:0;switch(this.motion.setData({val:t}),this.unsubscribeMotion=this.motion.subscribe(({val:r})=>{r!==this.lastValue&&(this.propierties===h.PROP_TWEEN&&this.tween?.draw?(this.tween.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.lastValue=r,this.firstTime=!1):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!0})}))}),this.unsubscribeOnComplete=this.motion.onComplete(({val:r})=>{this.force3D=!1,this.propierties===h.PROP_TWEEN&&this.tween?.draw?this.tween.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!1})})}),this.easeType){case h.EASE_LERP:{this.lerpConfig&&this.motion.updateVelocity(this.lerpConfig);break}case h.EASE_SPRING:{this.springConfig&&this.motion.updateConfig(this.springConfig);break}}}calcRangeAndUnitMiusure(){if(this.dynamicRange){let t=this.dynamicRange();this.numericRange=Number.isNaN(t)?0:Number.parseFloat(t),this.unitMisure=h.PX}else{let t=String(this.range),o=t.charAt(0)==="-"?-1:1,s=cp(t,this.propierties);this.numericRange=Number.parseFloat(s.replaceAll(/^\D+/g,""))*o,this.unitMisure=Fu(s)}}calcFixedLimit(){let t=this.scrollerHeight/100;if(this.dynamicStart&&this.dynamicStart?.position&&this.dynamicStart?.value?.()){let{position:p,value:u}=this.dynamicStart,m=u();Number.isNaN(m)||(this.start=`${p} ${m}px`)}let{value:r,additionalVal:o,position:s}=Tp(t,this.start,this.direction);if(this.invertSide=s===h.POSITION_TOP||s===h.POSITION_LEFT,this.startPoint=mi(r,o,this.direction===h.DIRECTION_VERTICAL?this.height:this.width,this.direction===h.DIRECTION_VERTICAL?this.width:this.height),this.dynamicEnd&&this.dynamicEnd?.position&&this.dynamicEnd?.value?.()){let{position:p,value:u}=this.dynamicEnd,m=u();Number.isNaN(m)||(this.end=`${p} ${m}px`)}let{value:n,additionalVal:i,position:a}=xp(t,this.end,this.startPoint,this.scrollerHeight,this.invertSide,this.direction),l=this.invertSide?a===h.POSITION_BOTTOM||a===h.POSITION_RIGHT?-1:1:a===h.POSITION_BOTTOM||a===h.POSITION_RIGHT?1:-1;this.endPoint=mi(n,i,this.direction===h.DIRECTION_VERTICAL?this.height*l:this.width*l,this.direction===h.DIRECTION_VERTICAL?this.width*l:this.height*l),this.setMarker(),this.invertSide&&(this.startPoint-=this.height)}setMarker(){if(this.marker){let{startMarker:t,endMarker:r}=mp({startMarker:this.startMarker,endMarker:this.endMarker,startPoint:this.startPoint,endPoint:this.endPoint,screen:this.screen,direction:this.direction,invertSide:this.invertSide,label:this.marker});this.startMarker=t,this.endMarker=r}}calcOffset(){let t=this.trigger===null?this.item:this.trigger;if(!t)return;let r=0,o=0,s=0;this.trigger&&(r=dr(this.trigger).x,o=dr(this.trigger).y,s=dr(this.trigger).z),t.style.transform="",this.direction===h.DIRECTION_VERTICAL?this.offset=this.scroller===window?Math.trunc(ie(t).top):Math.trunc(ie(t).top)-ie(this.scroller).top:this.offset=this.scroller===window?Math.trunc(ie(t).left):Math.trunc(ie(t).left)-ie(this.scroller).left,this.screen!==window&&(this.direction===h.DIRECTION_VERTICAL?this.offset-=Math.trunc(ie(this.screen).top):this.offset-=Math.trunc(Ye(this.screen).left)),this.trigger&&(r!==0||o!==0||s!==0)&&(this.trigger.style.transform=`translate3D(${r}px, ${o}px, ${s}px)`)}calcScreenPosition(){this.screen!==window&&(this.screenPosition=this.direction===h.DIRECTION_VERTICAL?Number.parseInt(ie(this.screen).top):Number.parseInt(Ye(this.screen).left))}calcHeight(){let t=this.trigger===null?this.item:this.trigger;t&&(this.height=this.direction===h.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}calcWidth(){let t=this.trigger===null?this.item:this.trigger;t&&(this.width=this.direction===h.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}getScrollerOffset(){this.scroller===window?this.scrollerScroll=this.direction===h.DIRECTION_VERTICAL?this.scroller.scrollY:this.scroller.scrollX:this.scrollerScroll=this.direction===h.DIRECTION_VERTICAL?-ie(this.scroller).top:-ie(this.scroller).left}getScreenHeight(){this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.screen===window?this.scrollerHeight=this.direction===h.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.scrollerHeight=this.direction===h.DIRECTION_VERTICAL?Math.trunc(this.screen.offsetHeight):Math.trunc(this.screen.offsetWidth)}refresh(){this.pin&&this.pinInstance&&this.pinInstance.destroy(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.type==h.TYPE_SCROLLTRIGGER&&(this.calcFixedLimit(),this.dynamicRange&&this.calcRangeAndUnitMiusure(),this.pin&&this.pinInstance&&oe[this.queryType](this.breakpoint)&&this.pinInstance.init({instance:this})),this.lastValue=void 0,this.firstTime=!0,this.firstScroll=!1,oe[this.queryType](this.breakpoint)?this.ease?this.smoothParallaxJs():(this.computeValue(),this.noEasingRender({forceRender:!0})):(this.ease&&this.motion?.stop?.(),c.useFrameIndex(()=>{this.applyTo?(this.resetTweenStyle(this.applyTo),Object.assign(this.applyTo.style,this.getResetStyle())):(this.resetTweenStyle(this.item),this.item&&Object.assign(this.item.style,this.getResetStyle()))},3))}move({value:t,parentIsMoving:r=!1}){if(!oe[this.queryType](this.breakpoint)||!t)return;this.iSControlledFromOutside=!0;let o=this.getScrollValueOnMove(t);if(this.ease)this.smoothParallaxJs(o);else{this.computeValue(o);let s=this.isInViewport||this.firstTime||void 0;this.noEasingRender({forceRender:s,parentIsMoving:r})}}triggerScrollStart(){this.ease&&(this.firstScroll=!0,this.disableForce3D||(this.force3D=!0))}triggerScrollEnd(){this.ease||this.noEasingRender({forceRender:!0})}getScrollValueOnMove(t){if(t!==void 0)return this.screen!==window?t+this.screenPosition:t}stopMotion(){this.motion?.stop?.()}smoothParallaxJs(t){if(!oe[this.queryType](this.breakpoint)||(this.computeValue(t),!this.fixedShouldRender&&!this.firstTime&&this.type===h.TYPE_SCROLLTRIGGER)||!this.isInViewport&&!this.firstTime&&this.type===h.TYPE_PARALLAX)return;let r=this.firstTime&&!this.animateAtStart?"set":"goTo";this.motion&&this.motion[r]({val:this.endValue},this.motionParameters).catch(()=>{})}computeValue(t){if(!oe[this.queryType](this.breakpoint)||(t?this.scrollerScroll=-t:this.getScrollerOffset(),this.isInViewport=Sp({offset:this.offset,height:this.height,gap:this.gap,wScrollTop:this.scrollerScroll,wHeight:this.scrollerHeight}),!this.isInViewport&&!this.limiterOff&&this.type===h.TYPE_PARALLAX))return;switch(this.pin&&this.pinInstance&&this.pinInstance.onScroll(this.scrollerScroll),this.type){case h.TYPE_SCROLLTRIGGER:{this.endValue=pe(this.getFixedValue());break}default:switch(this.propierties){case h.PROP_OPACITY:{this.endValue=pe(this.getOpacityValue());break}default:{this.endValue=Number.isNaN(Number.parseInt(this.align))?pe(this.getIsNaNValue()/2):pe(this.getIsANumberValue()/2);break}}}let r=this.reverse&&this.type!==h.TYPE_SCROLLTRIGGER?Ip(this.propierties,this.endValue):this.endValue;this.endValue=this.type===h.TYPE_SCROLLTRIGGER?r:this.getSwitchAfterZeroValue(r)}noEasingRender({forceRender:t=!1,parentIsMoving:r=!1}={}){oe[this.queryType](this.breakpoint)&&c.useFrame(()=>{this.cleanRender({forceRender:t,parentIsMoving:r})})}cleanRender({forceRender:t=!1,parentIsMoving:r=!1}={}){this.endValue===this.lastValue&&!t||!this.isInViewport&&!t||(!this.disableForce3D&&!this.iSControlledFromOutside&&(this.force3D=!t),!this.disableForce3D&&this.iSControlledFromOutside&&(this.force3D=r&&this.isInViewport),this.propierties===h.PROP_TWEEN?(this.tween.draw({partial:this.endValue,isLastDraw:!this.force3D,useFrame:!1}),this.lastValue=this.endValue,this.firstTime=!1):this.updateStyle(this.endValue),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:this.endValue,parentIsMoving:this.force3D})}))}updateStyle(t){this.applyTo?Object.assign(this.applyTo.style,this.getStyle(t)):this.item&&Object.assign(this.item.style,this.getStyle(t)),this.lastValue=t,this.firstTime=!1}getFixedValue(){let t=this.invertSide?-(this.scrollerScroll+this.startPoint+this.endPoint-(this.offset+this.endPoint)):-(this.scrollerScroll+this.scrollerHeight-this.startPoint-(this.offset+this.endPoint)),r=this.endPoint/100*this.numericRange,o=t/100*this.numericRange,s=this.fromTo?this.invertSide?r-o:o:this.invertSide?o:r-o,n=r>0?-Oe(s,0,r):-Oe(s,r,0);if(this.fixedShouldRender=this.prevFixedClamp!==n,this.prevFixedClamp=n,!this.fixedShouldRender&&!this.firstTime)return this.endValue;let i=n*100/this.endPoint;switch((this.onEnter||this.onEnterBack||this.onLeave||this.onLeaveBack)&&dp({prevValue:this.prevFixedRawValue,value:s,maxVal:r,onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack}),this.prevFixedRawValue=s,this.propierties){case h.PROP_HORIZONTAL:case h.PROP_VERTICAL:return this.getHVval(i);case h.PROP_SCALE:case h.PROP_SCALE_X:case h.PROP_SCALE_Y:case h.PROP_OPACITY:return 1-i;default:return-i}}getHVval(t){switch(this.unitMisure){case h.VW:return this.windowInnerWidth/100*-t;case h.VH:return this.windowInnerHeight/100*-t;case h.WPERCENT:return this.direction===h.DIRECTION_VERTICAL?this.width/100*-t:this.height/100*-t;case h.HPERCENT:return this.direction===h.DIRECTION_VERTICAL?this.height/100*-t:this.width/100*-t;default:return-t}}getOpacityValue(){let t=this.scrollerHeight/100*this.opacityEnd,r=this.scrollerHeight-this.scrollerHeight/100*this.opacityStart,o=this.align==h.ALIGN_START?-this.scrollerScroll*-1:(this.scrollerScroll+t-this.offset)*-1,s=this.align==h.ALIGN_START?1-o/this.offset:1-o/(this.scrollerHeight-r-t);return Oe(s,0,1)}getIsNaNValue(){let t=Number(this.range)??0,r=this.direction===h.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.align){case h.ALIGN_START:return this.scrollerScroll/t;case h.ALIGN_TOP:case h.ALIGN_LEFT:return(this.scrollerScroll-this.offset)/t;case h.ALIGN_CENTER:return(this.scrollerScroll+(this.scrollerHeight/2-this.height/2)-this.offset)/t;case h.ALIGN_BOTTOM:case h.ALIGN_RIGHT:return(this.scrollerScroll+(this.scrollerHeight-this.height)-this.offset)/t;case h.ALIGN_END:return-(r-(this.scrollerScroll+this.scrollerHeight))/t;default:return 0}}getIsANumberValue(){let t=Number(this.align),r=Number(this.range);return(this.scrollerScroll+this.scrollerHeight/100*t-this.offset)/r}getSwitchAfterZeroValue(t){return Cp({switchPropierties:this.onSwitch,isReverse:this.reverse,value:t})}getStyle(t){let r=this.force3D?"translate3D(0px, 0px, 0px)":"";this.willChangeIsActive=this.useWillChange?c.mustMakeSomething():!1;let o=this.willChangeIsActive&&this.force3D?"transform":"",s=c.shouldMakeSomething()?Math.round(t):t;switch(this.propierties){case h.PROP_VERTICAL:return{transform:`${r} translateY(${s}px)`,willChange:o};case h.PROP_HORIZONTAL:return{transform:`${r} translateX(${s}px)`,willChange:o};case h.PROP_ROTATE:return{transform:`${r} rotate(${s}deg)`,willChange:o};case h.PROP_ROTATEY:return{transform:`${r} rotateY(${s}deg)`,willChange:o};case h.PROP_ROTATEX:return{transform:`${r} rotateX(${s}deg)`,willChange:o};case h.PROP_ROTATEZ:return{transform:`${r} rotateZ(${s}deg)`,willChange:o};case h.PROP_OPACITY:return{opacity:`${t}`};case h.PROP_SCALE:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${n})`,willChange:o}}case h.PROP_SCALE_X:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${n})`,willChange:o}}case h.PROP_SCALE_Y:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${n})`,willChange:o}}default:return{[this.propierties.toLowerCase()]:`${t}px`}}}resetTweenStyle(t){this.tween&&(t.style="")}getResetStyle(){switch(this.propierties){case h.PROP_VERTICAL:case h.PROP_HORIZONTAL:case h.PROP_ROTATE:case h.PROP_ROTATEY:case h.PROP_ROTATEX:case h.PROP_ROTATEZ:case h.PROP_SCALE:return{transform:""};case h.PROP_OPACITY:return{opacity:""};default:return{[this.propierties.toLowerCase()]:""}}}destroy(){this.motion?.stop?.(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.unsubscribeScrollEnd(),this.unsubscribeResize(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.unsubscribeMarker(),this.motion?.destroy?.(),this.dynamicRange=()=>{},this.onEnter=()=>{},this.onEnterBack=()=>{},this.onLeave=()=>{},this.onLeaveBack=()=>{},this.onTickCallback=()=>{},this.pin&&this.pinInstance&&this.pinInstance?.destroy?.(),this.startMarker&&this.startMarker?.remove?.(),this.endMarker&&this.endMarker?.remove?.(),this.motion=null,this.startMarker=void 0,this.endMarker=void 0,this.pinInstance=null,this.endValue=0;let t=this.applyTo??this.item;t&&"style"in t&&(t.style=""),this.item=null,this.scroller=null,this.screen=null,this.trigger=null,this.applyTo=null}};var Eo={END:"END",START:"START",CENTER:"CENTER"};var If=e=>{switch(e){case Eo.END:return"align-items:flex-end;";case Eo.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Ep=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:s,row:n,column:i,shadow:a,useSticky:l,columnHeight:p,columnWidth:u,columnAlign:m})=>{let d=oe.getBreackpoint(r),f="user-select:none",T=l?"relative":"absolute",g=l?"position:sticky;top:0;":"",S=If(m),x=u?`width:${u}vw;`:"",C=`
      @media (${t}-width:${d}px){${o}{position:relative;${f}}}@media (${t}-width:${d}px){${s}{z-index:10;position:${T};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${d}px){${n}{--sectionheight:${p}vh}}@media (${t}-width:${d}px){${n}{display:flex;height:100vh;${g}${S}}}@media (${t}-width:${d}px){${i}{height:var(--sectionheight);flex:0 0 auto;${x}}}.${a}{display:none}@media (${t}-width:${d}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${d}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,_=document.createElement("div");_.classList.add("scroller-style");let M=document.createElement("style");M.append(document.createTextNode(C)),_.append(M),e.prepend(_)};var ko=class{constructor(t={}){if(this.propsisValid=!0,this.triggerTopPosition=0,this.touchActive=!1,this.lastTouchValueX=0,this.dragSecureAreaBottom=100,this.dragSecureAreaTop=100,this.shouldDragValue=!1,this.button=[],this.scrollValue=0,this.unsubscribeScroll=()=>{},this.useDrag=re(t?.useDrag,"HorizontalScroller: useDrag",!1),this.threshold=ft(t?.threshold,"HorizontalScroller: threshold",30),this.useWillChange=re(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.breakpoint=ar(t?.breakpoint,"breakpoint","horizontalScroller"),this.queryType=lr(t?.queryType,"queryType","horizontalScroller"),this.forceTranspond=re(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.addCss=re(t?.addCss,"HorizontalScroller: addCss",!0),this.animateAtStart=re(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.ease=re(t?.ease,"HorizontalScroller: ease",!1),this.easeType=Ls(t?.easeType,"HorizontalScroller"),this.useSticky=re(t?.useSticky,"HorizontalScroller: useSticky",!1),this.animatePin=re(t?.animatePin,"HorizontalScroller: animatePin",!1),this.reverse=re(t?.reverse,"HorizontalScroller: reverse",!1),this.useThrottle=re(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.columnHeight=ft(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.columnWidth=ft(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.columnAlign=t?.columnAlign?t.columnAlign.toUpperCase():Eo.START,this.onEnter=Be(t?.onEnter,"HorizontalScroller: onEnter",he),this.onEnterBack=Be(t?.onEnterBack,"HorizontalScroller: onEnterBack",he),this.onLeave=Be(t?.onLeave,"HorizontalScroller: onLeave",he),this.onLeaveBack=Be(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",he),this.afterInit=Be(t?.afterInit,"HorizontalScroller: afterInit",he),this.afterRefresh=Be(t?.afterRefresh,"HorizontalScroller: afterRefresh",he),this.afterDestroy=Be(t?.afterDestroy,"HorizontalScroller: afterDestroy",he),this.onTick=Be(t?.onTick,"HorizontalScroller: onTick",null),this.mainContainer=document.querySelector(t.root),!this.mainContainer){this.propsisValid=!1,console.warn("horizontal custom: root node not found");return}if(this.container=t?.container,!this.mainContainer.querySelector(this.container)){this.propsisValid=!1,console.warn("horizontal custom: container node not found");return}if(this.trigger=this.mainContainer.querySelector(t.trigger),!this.trigger){this.propsisValid=!1,console.warn("horizontal custom: trigger node not found");return}if(this.row=this.mainContainer.querySelector(t.row),!this.row){this.propsisValid=!1,console.warn("horizontal custom: row node not found");return}if(this.column=this.mainContainer.querySelectorAll(t.column),this.column.length===0){this.propsisValid=!1,console.warn("horizontal custom: column nodeList not found");return}this.shadow=this.mainContainer.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.shadowMainClassTransition=o.replace(".",""),this.button=this.row.querySelectorAll("a, button"),this.moduleisActive=!1,this.horizontalWidth=0,this.scrollTriggerInstance={},this.percentRange=0,this.children=t?.children||[],this.children.forEach(s=>{s.setScroller(this.row),s.setDirection("horizontal"),s.setBreakPoint(this.breakpoint),s.setQueryType(this.queryType),s.init()}),this.addCss&&Ep({mainContainer:this.mainContainer,queryType:this.queryType,breakpoint:this.breakpoint,container:this.container,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.shadowMainClassTransition,useSticky:this.useSticky,columnHeight:this.columnHeight,columnWidth:this.columnWidth,columnAlign:this.columnAlign}),this.onMouseMove=s=>{if(!this.touchActive)return;let{movementX:n}=s,i=this.reverse?n:-n;this.onDrag(i),this.touchStart=!1},this.onMouseDown=()=>{oe[this.queryType](this.breakpoint)&&(this.shouldDragValue&&(this.row.style.cursor="move"),this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onMouseUp=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onMouseLeave=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onTouchStart=s=>{oe[this.queryType](this.breakpoint)&&(this.lastTouchValueX=-s.touches[0].clientX,this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onTouchEnd=()=>{this.touchActive=!1},this.onTouchMove=s=>{let n=-s.touches[0].clientX,i=this.reverse?-n+this.lastTouchValueX:n-this.lastTouchValueX;this.onDrag(i),this.lastTouchValueX=n,this.shouldDragValue&&s.cancelable&&s.preventDefault()},this.preventFireClick=s=>{Math.abs(this.scrollValue-this.firstTouchValue)>this.threshold&&s.preventDefault()}}init(){this.propsisValid&&Ws(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.useDrag&&this.addDragListener(),c.useResize(({horizontalResize:t})=>this.onResize(t)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)})}setLinkAttribute(){[...this.button].forEach(t=>t.setAttribute("draggable",!1))}removeLinkAttribute(){[...this.button].forEach(t=>t.removeAttribute("draggable"))}onDrag(t){this.shouldDragValue&&c.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}shouldDrag(){let t=window.scrollY;this.shouldDragValue=this.triggerTopPosition-this.dragSecureAreaTop<t&&this.triggerTopPosition+this.dragSecureAreaBottom+this.horizontalWidth>t+window.innerHeight}addDragListener(){this.unsubscribeScroll=c.useScroll(()=>this.shouldDrag()),this.shouldDrag(),this.row.addEventListener("click",this.preventFireClick,{passive:!1}),this.row.addEventListener("mousedown",this.onMouseDown,{passive:!0}),this.row.addEventListener("mouseup",this.onMouseUp,{passive:!0}),this.row.addEventListener("mouseleave",this.onMouseLeave,{passive:!0}),this.row.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.row.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.row.addEventListener("mousemove",this.onMouseMove,{passive:!0}),this.row.addEventListener("touchmove",this.onTouchMove,{passive:!0})}removeDragListener(){this.unsubscribeScroll(),this.row.removeEventListener("click",this.preventFireClick),this.row.removeEventListener("mousedown",this.onMouseDown),this.row.removeEventListener("mouseup",this.onMouseUp),this.row.removeEventListener("mouseleave",this.onMouseLeave),this.row.removeEventListener("touchstart",this.onTouchStart),this.row.removeEventListener("touchend",this.onTouchEnd),this.row.removeEventListener("mousemove",this.onMouseMove),this.row.removeEventListener("touchmove",this.onTouchMove)}setDimension(){return!this.trigger||!this.mainContainer||!this.row?new Promise(t=>{t()}):new Promise(t=>{c.useFrame(()=>{let r=this.horizontalWidth;this.percentRange=100*(r-window.innerWidth)/r,r>0&&(this.trigger.style.height=`${r}px`,this.mainContainer.style.height=`${r}px`,this.row.style.width=`${r}px`),t()})})}getWidth(){return new Promise(t=>{c.useFrame(()=>{if(!oe[this.queryType](this.breakpoint)){t();return}this.horizontalWidth=[...this.column].map(r=>ot(r)).reduce((r,o)=>r+o,0),t()})})}createShadow(){return this.trigger?new Promise(t=>{c.useFrame(()=>{if(!oe[this.queryType](this.breakpoint)){t();return}let r=[...this.shadow].map(o=>{let s=o.dataset.shadow,n=o.dataset.debug?"debug":"",i=o.dataset.debug?`left left : ${s}`:"",a=o.dataset.debug?`in center : ${s}`:"",l=o.dataset.debug?`center out : ${s}`:"",p=o.dataset.debug?`in out : ${s}`:"";return`
                            <div class='${this.shadowMainClassTransition} ${this.shadowMainClassTransition}--${s}' data-shadow='${s}'>
                                <span class="${this.shadowMainClassTransition}--in-center ${n}">
                                    ${a}
                                </span>
                                <span class="${this.shadowMainClassTransition}--out-center ${n}">
                                    ${l}
                                </span>
                                <span class="${this.shadowMainClassTransition}--left ${n}">
                                    ${i}
                                </span>
                                <span class="${this.shadowMainClassTransition}--end ${n}">
                                    ${p}
                                </span>
                            </div>`}).join("");this.trigger.innerHTML=r,t()})}):new Promise(t=>{t()})}removeShadow(){this.trigger&&(this.trigger.innerHTML="")}updateShadow(){return new Promise(t=>{if(!oe[this.queryType](this.breakpoint)){t();return}c.useFrame(()=>{[...this.shadow].forEach(r=>{let o=this.percentRange/100,s=r.dataset.shadow,n=ot(r),i=Se(this.row),{x:a}=dr(this.row),l=this.reverse?this.horizontalWidth-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,p=window.innerWidth/window.innerHeight,u=window.innerWidth-window.innerHeight,m=l/p,d=l-l/p,f=this.mainContainer.querySelector(`.${this.shadowMainClassTransition}[data-shadow="${s}"]`),T=f.querySelector(`.${this.shadowMainClassTransition}--in-center`),g=f.querySelector(`.${this.shadowMainClassTransition}--out-center`),S=f.querySelector(`.${this.shadowMainClassTransition}--left`),x=f.querySelector(`.${this.shadowMainClassTransition}--end`),C=window.innerWidth>window.innerHeight?window.innerHeight:0,_=window.innerWidth>window.innerHeight?window.innerHeight/2:0,M=(()=>{switch(l){case 0:return 0;default:return m+d/o-u/o}})(),A=(()=>{let U=window.innerWidth>window.innerHeight?u/o:u/o+window.innerWidth/p;switch(l){case 0:return 0;default:return U}})(),I=(()=>{let U=n/p,W=(n-n/p)/o;return U+W+A})(),V=I/2+_;this.useSticky&&(this.trigger.style["margin-top"]=`-${i}px`),f.style.top=`${M}px`,T.style.height=`${V}px`,g.style.height=`${V}px`,g.style.top=`${V}px`,S.style.height=`${A}px`,x.style.height=`${I+C}px`,f.style.height=`${A}px`}),t()})})}initScroller(){if(!this.trigger||!oe[this.queryType](this.breakpoint))return;let t=new qt({type:"scrolltrigger",item:this.row,useWillChange:this.useWillChange,trigger:this.trigger,propierties:"x",breakpoint:"xSmall",pin:!this.useSticky,animatePin:this.animatePin,ease:this.ease,forceTranspond:this.forceTranspond,useThrottle:this.useThrottle,easeType:this.easeType,springConfig:"scroller",animateAtStart:this.animateAtStart,fromTo:this.reverse,dynamicRange:()=>-(this.horizontalWidth-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.horizontalWidth},onTick:({value:r,parentIsMoving:o})=>{let s=Math.abs(-Number.parseInt(r*100/(this.horizontalWidth-window.innerWidth)));this.scrollValue=r,this.onTick&&this.onTick({value:r,parentIsMoving:o,percent:this.reverse?100-s:s}),this.children.forEach(n=>{n.move({value:r,parentIsMoving:o})})},onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack});t.init(),this.moduleisActive=!0,this.scrollTriggerInstance=t,this.triggerTopPosition=ie(this.trigger).top,this.setLinkAttribute()}createScroller(){Ws(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.refreshChildren()})}refreshChildren(){c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterRefresh?.(),this.children.forEach(t=>{t?.refresh?.()})})},3)}refresh(){if(!(!this.moduleisActive||!oe[this.queryType](this.breakpoint)))return new Promise(t=>{Ws(this.getWidth.bind(this),this.setDimension.bind(this),this.updateShadow.bind(this))().then(()=>{this.scrollTriggerInstance?.stopMotion?.(),this.triggerTopPosition=ie(this.trigger).top,this.moduleisActive&&(this.scrollTriggerInstance?.refresh?.(),this.refreshChildren()),t()})})}killScroller({destroyAll:t=!1}){(this.moduleisActive||t)&&(this.scrollTriggerInstance?.destroy?.(),this.scrollTriggerInstance=null,this.trigger&&(this.trigger.style.height=""),this.mainContainer&&(this.mainContainer.style.height=""),this.trigger&&(this.trigger.style.marginTop=""),this.removeShadow(),this.removeLinkAttribute(),this.moduleisActive=!1,c.useFrameIndex(()=>{if(this.row.style="",t&&this.mainContainer){this.useDrag&&this.removeDragListener();let r=this.mainContainer.querySelector(".scroller-style");r&&r.remove(),this.mainContainer=null,this.trigger=null,this.row=[],this.column=[],this.shadow=[],this.afterInit=null,this.afterRefresh=null,this.onTick=null,this.onEnter=null,this.onEnterBack=null,this.onLeave=null,this.onLeaveBack=null,this.scrollTriggerInstance=null,this.moduleisActive=!1,this.button=[],this.mainContainer=null,this.container=null,this.trigger=null,this.row=null,c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=null,this.children.forEach(o=>{o?.destroy?.(),o=null}),this.children=[]})}},3))}onResize(t){this.moduleisActive&&oe[this.queryType](this.breakpoint)?t&&this.refresh():!this.moduleisActive&&oe[this.queryType](this.breakpoint)?this.createScroller():this.moduleisActive&&!oe[this.queryType](this.breakpoint)&&this.killScroller({destroyAll:!1})}destroy(){this.killScroller({destroyAll:!0})}};var kp=({screen:e,scroller:t,scrollbar:r})=>{let o=new Ut({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"xSmall",onTick:({percent:s})=>{r.value=s}});return o.init(),{updateScroller:()=>{let s=Se(t),n=Se(e),i=ot(r),a=n/s*i;r.style.setProperty("--thumb-width",`${a}px`),o.refresh()},move:s=>o.move(s),goToTop:()=>o.set(0)}};var Rp=`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Generator: Gravit.io --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 466.726 466.722" width="466.726pt" height="466.722pt"><defs><clipPath id="_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA"><rect width="466.726" height="466.722"/></clipPath></defs><g clip-path="url(#_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA)"><path d=" M 64.164 0 C 28.918 0 0 28.918 0 64.164 L 0 306.614 C 0 341.86 28.918 370.778 64.164 370.778 L 306.614 370.778 C 341.86 370.778 370.778 341.86 370.778 306.614 L 370.778 64.164 C 370.778 28.918 341.86 0 306.614 0 L 64.164 0 Z  M 64.164 34.969 L 306.614 34.969 C 323.075 34.969 335.723 47.703 335.723 64.164 L 335.723 306.614 C 335.723 323.075 323.075 335.723 306.614 335.723 L 64.164 335.723 C 47.703 335.723 34.969 323.075 34.969 306.614 L 34.969 64.164 C 34.969 47.703 47.703 34.969 64.164 34.969 Z " fill-rule="evenodd" /><path d=" M 353.214 95.945 C 348.577 95.949 344.132 97.793 340.855 101.07 C 337.578 104.347 335.734 108.793 335.73 113.429 C 335.734 118.062 337.578 122.507 340.855 125.784 C 344.132 129.061 348.578 130.905 353.214 130.913 L 402.566 130.913 C 418.882 130.913 431.675 143.792 431.675 160.108 L 431.675 402.558 C 431.675 418.874 418.882 431.667 402.566 431.667 L 160.116 431.667 C 143.8 431.667 130.921 418.874 130.921 402.558 L 130.917 353.292 C 130.937 348.643 129.105 344.175 125.823 340.878 C 122.542 337.581 118.085 335.726 113.432 335.722 C 108.78 335.726 104.323 337.581 101.045 340.878 C 97.764 344.175 95.928 348.643 95.948 353.292 L 95.948 402.558 C 95.948 437.792 124.882 466.722 160.112 466.722 L 402.562 466.722 C 437.796 466.722 466.726 437.788 466.726 402.558 L 466.726 160.108 C 466.726 124.874 437.792 95.944 402.562 95.944 L 353.214 95.945 Z " /></g></svg>
`;var kf=({getState:e})=>{let{rawContent:t}=e();navigator.clipboard.writeText(t)};function Rf({sync:e,bindProps:t,setState:r,delegateEvents:o}){return b`
        <code-overlay-button
            ${e}
            ${t({bind:["currentButtonState"],props:({currentButtonState:s,_current:n})=>{let{label:i,source:a}=n;return{key:i,disable:!a||a.length===0,selected:i===s}}})}
            ${o({click:(s,{current:n})=>{let{label:i}=n;r("activeContent",i)}})}
        >
        </code-overlay-button>
    `}var Pf=async({setState:e,getState:t,codeEl:r,currentKey:o,updateScroller:s,goToTop:n,syncParent:i})=>{let{urls:a}=t(),p=a.find(({label:m})=>m===o)?.source;if(!p?.length)return;let u=b`<html-content
        ${w({source:p,useMinHeight:!0})}
        ${i}
    ></html-content>`;r.insertAdjacentHTML("afterbegin",u),await po(r),e("rawContent",r.textContent),s(),n()},Pp=({codeEl:e,removeDOM:t})=>{e.textContent="";let r=e.firstElementChild;r&&t(r)},Ap=({onMount:e,setState:t,getState:r,repeat:o,html:s,bindProps:n,delegateEvents:i,staticProps:a,computed:l,watch:p,removeDOM:u,syncParent:m})=>(e(({element:d,refs:f})=>{let{screenEl:T,scrollerEl:g,codeEl:S,scrollbar:x}=f,{updateScroller:C,move:_,goToTop:M}=kp({screen:T,scroller:g,scrollbar:x});x.addEventListener("input",()=>{_(x.value)}),N.watch("beforeRouteLeave",()=>{t("urls",[])}),l("currentButtonState",["urls","activeContent"],(I,V)=>(I.length>0?(d.classList.add("active"),document.body.style.overflow="hidden"):(d.classList.remove("active"),document.body.style.overflow="",Pp({codeEl:S,removeDOM:u}),t("activeContent",""),M()),V));let A=p("activeContent",I=>{Pp({codeEl:S,removeDOM:u}),Pf({setState:t,getState:r,codeEl:S,currentKey:I,updateScroller:C,goToTop:M,staticProps:a,syncParent:m})});return()=>{A()}}),s`
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
                    ${i({click:()=>{kf({getState:r})}})}
                >
                    ${Rp}
                </button>
                <div class="code-overlay__header">
                    ${o({clean:!0,watch:"urls",render:({sync:d})=>Rf({sync:d,bindProps:n,delegateEvents:i,setState:t})})}
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
    `);var _p=({onMount:e,watch:t,getState:r,html:o})=>{let{key:s,disable:n}=r();return e(({element:a})=>{let l=t("selected",p=>{a.classList.toggle("selected",p)});return()=>{l()}}),o`
        <button class="code-overlay__button ${n?"disable":""}">${s}</button>
    `};var Af=k({name:"code-overlay",component:Ap,isolateOnMount:!0,isolateCreation:!0,exportState:["urls","activeContent"],state:{urls:()=>({value:[],type:Array,skipEqual:!1}),activeContent:()=>({value:"",type:String,skipEqual:!0}),rawContent:()=>({value:"",type:String}),currentButtonState:()=>({value:String,type:"",skipEqual:!0})}}),_f=k({name:"code-overlay-button",component:_p,exportState:["key","selected","disable"],state:{key:"",selected:()=>({value:!1,type:Boolean}),disable:()=>({value:!0,type:Boolean})}});var Op=({html:e,delegateEvents:t})=>e`
        <button
            type="button"
            class="c-btn-debug"
            ${t({click:()=>{N.debugStore(),console.log(N),console.log(H),console.log("bindEventMap",kr),console.log("currentListValueMap",uo),console.log("activeRepeatMap",Ar),console.log("repeatMap",_r),console.log("onMountCallbackMap",co),console.log("staticPropsMap",Zt),console.log("dynamicPropsMap",Ke),console.log("repeaterTargetComponent",Qt),console.log("eventDelegationMap",Lt),console.log("tempDelegateEventMap",Er)}})}
        >
            Debug
        </button>
    `;var Of=k({name:"debug-button",component:Op});var se={setDefault(e){K.set(e)},getDefault(e){return K.get(e)},printDefault(){K.print()},mq(e,t){switch(e){case"min":return oe.min(t);case"max":return oe.max(t);case"get":return oe.getBreackpoint(t)}}};var js=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:s,callbackCache:n,callbackOnStop:i})=>{e===0||t===!1?(c.useFrame(()=>{s.forEach(({cb:a})=>a(o))}),c.useFrame(()=>{n.forEach(({cb:a})=>{c.useCache.fireObject({id:a,obj:o})})})):(s.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l)}),n.forEach(({cb:a,frame:l})=>{c.useCache.update({id:a,callBackObject:o,frame:l})})),r&&(e===0||t===!1?c.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l+1)}))};var Ro=class{constructor(t){this.ease=Vu(t?.ease),this.duration=Wt(t?.duration),this.stagger=tt(t),this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache=[],this.type="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Qe(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=rt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}}draw({partial:t,isLastDraw:r}){let o=()=>{this.values.forEach(n=>{let i=n.toIsFn?n.toFn():n.toValue,a=n.fromIsFn?n.fromFn():n.fromValue,l=i-a;n.currentValue=this.ease(t,a,l,this.duration),n.currentValue=pe(n.currentValue)});let s=ge(this.values,"currentValue");js({each:this.stagger.each,useStagger:!0,isLastDraw:r,callBackObject:s,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop})};c.useNextTick(()=>o())}setData(t){let r=Object.entries(t);return this.values=r.map(o=>{let[s,n]=o;return{prop:s,toValue:n,toValProcessed:n,fromValue:n,currentValue:n,settled:!1}}),this}mergeData(t){this.values=this.values.map(r=>{let o=t.find(s=>s.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=zt(t);return this.mergeData(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}getDuration(){return this.duration}getType(){return this.type}destroy(){this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Po=class{constructor(){this.type="sequencer",this.children=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.children.forEach(s=>{s.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.children.push(t)}inzializeStagger(){this.children.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.children.forEach(r=>{r.setDuration(t)})}getDuration(){return this.children.length>0?this.children[0].getDuration():0}setStretchFactor(t){this.children.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.children.flatMap(t=>t.getLabels())}resetLastValue(){this.children.forEach(t=>t.resetLastValue())}disableStagger(){this.children.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.children.forEach(t=>{t.cleanCachedId()})}getType(){return this.type}destroy(){this.children.forEach(t=>{t.destroy()}),this.children=[]}};var Np=(e,t)=>Object.keys(e).map(r=>it(e[r])?{prop:r,toValue:e[r],ease:We(t)}:(kt(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:We(t)})),Mp=(e,t)=>Object.keys(e).map(r=>it(e[r])?{prop:r,fromValue:e[r],ease:We(t)}:(kt(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:We(t)})),Lp=(e,t,r)=>Object.keys(e).map(o=>!it(t[o])||!it(e[o])?(kt(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:We(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:We(r)});var fi={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"fromValue",set:"toValue"}},Fp=(e,t,r,o)=>e.slice(0,t).reduceRight((s,{values:n})=>{let i=n.find(({prop:a,active:l})=>l&&a===r);return i&&s===null?i[fi[o].get]:s},null),Dp=(e,t,r,o)=>e.slice(t+1,e.length).reduce((s,{start:n,values:i})=>i.find(l=>l.prop===r&&l.active)&&n<=o?!1:s,!0);var we={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Ao=class{constructor(t){this.values=[],this.timeline=[],this.labels=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache=[],this.duration=Wt(t?.duration),this.type="sequencer",this.defaultProp={start:0,end:this.duration,ease:Du(t?.ease)},this.firstRun=!0,this.forceAddFnAtFirstRun=!0,this.direction=void 0,this.lastPartial=0,this.lastDirection=void 0,this.stagger=tt(t),this.useStagger=!0,this.staggerIsReady=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.staggerIsReady){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=gt(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Qe(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=rt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}this.staggerIsReady=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:s=we.NONE}){let n=()=>{this.firstRun&&(this.lastPartial=t,this.actionAtFirstRender(t)),!this.firstRun&&this.lastPartial&&(!s||s===we.NONE)&&(this.direction=t>=this.lastPartial?we.FORWARD:we.BACKWARD),!this.firstRun&&(s===we.BACKWARD||s===we.FORWARD)&&(this.direction=s),this.values.forEach(a=>{a.settled=!1}),this.timeline.forEach(({start:a,end:l,values:p},u)=>{p.forEach(m=>{let d=this.values.find(({prop:C})=>C===m.prop);if(!d||d.settled||!m.active||!Dp(this.timeline,u,m.prop,t))return;let T=c.checkType(Number,m.toValue)?m.toValue:m.toValue(),g=c.checkType(Number,m.fromValue)?m.fromValue:m.fromValue(),S=l-a,x=t<l?g:T;m.currentValue=t>=a&&t<=l?m.ease(t-a,g,T-g,S):x,m.currentValue=pe(m.currentValue),d.currentValue=m.currentValue,d.settled=!0})});let i=ge(this.values,"currentValue");js({each:this.stagger.each,useStagger:this.useStagger,isLastDraw:r,callBackObject:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop}),this.fireAddCallBack(t),this.useStagger=!0,this.lastPartial=t,this.lastDirection=this.direction,this.firstRun=!1};o?n():c.useNextTick(()=>n())}resetLastValue(){this.firstRun=!0,this.lastPartial=0,this.lastDirection=void 0}actionAtFirstRender(t=0){this.forceAddFnAtFirstRun&&(this.callbackAdd.forEach(({fn:r,time:o})=>{let s={shouldFire:t>=o,direction:we.FORWARD},n={shouldFire:t<=o,direction:we.BACKWARD};if(!(s.shouldFire||n.shouldFire))return;let a=s.shouldFire?s.direction:n.direction;r({direction:a,value:t,isForced:!0})}),this.forceAddFnAtFirstRun=!1)}fireAddCallBack(t=0){this.callbackAdd.forEach(({fn:r,time:o})=>{let s=this.direction===we.FORWARD&&t>o&&this.lastPartial<=o,n=this.direction===we.BACKWARD&&t<o&&this.lastPartial>=o;(s||n)&&r({direction:this.direction,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.duration;this.timeline.forEach(({start:o,end:s},n)=>{this.timeline[n].start=pe(o*r),this.timeline[n].end=pe(s*r)}),this.labels.forEach(({time:o},s)=>{this.labels[s].time=pe(o*r)}),this.callbackAdd.forEach(({time:o},s)=>{this.callbackAdd[s].time=pe(o*r)})}setData(t={}){return this.values=Object.entries(t).map(r=>{let[o,s]=r,n=$u(o,s),i=n?s:0;return{prop:n?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:We(K.get("sequencer").ease)}}),this}mergeArray(t,r){return r.map(o=>{let s=t.find(i=>i.prop===o.prop),n={prop:o.prop,active:!1};return s?{...o,...s,active:!0}:n})}orderByStart(t){return t.sort((r,o)=>r.start-o.start)}setPropFromAncestor(t){this.timeline.forEach(({values:r},o)=>{r.forEach(({prop:s,active:n},i)=>{if(!n)return;let a=Fp(this.timeline,o,s,t);a!==null&&(r[i][fi[t].set]=a)})})}goTo(t,r){let o={...this.defaultProp,...r},{start:s,end:n,ease:i}=o;if(!Rs({start:s,end:n}))return this;let a=Np(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:s??0,end:n??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("fromValue"),this}goFrom(t,r){let o={...this.defaultProp,...r},{start:s,end:n,ease:i}=o;if(!Rs({start:s,end:n}))return this;let a=Mp(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:s??0,end:n??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("toValue"),this}goFromTo(t,r,o){let s={...this.defaultProp,...o},{start:n,end:i,ease:a}=s;if(!Rs({start:n,end:i}))return this;if(!Vt(t,r)){$t("lerp goFromTo:",t,r);return}let l=Lp(t,r,a),p=this.mergeArray(l,this.values);return this.timeline.push({values:p,start:n??0,end:i??this.duration}),this.timeline=this.orderByStart(this.timeline),this}label(t="",r=0){return this.labels.push({name:t,time:r}),this}getLabels(){return this.labels}add(t=()=>{},r=0){let o=c.checkType(Function,t),s=c.checkType(Number,r),n=o&&s;return o||Lc(t),s||Fc(r),n?(this.callbackAdd.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=Ce(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=bt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}getDuration(){return this.duration}setDuration(t=0){this.duration=t}getType(){return this.type}cleanCachedId(){this.callbackCache.forEach(({cb:t})=>c.useCache.clean(t))}disableStagger(){this.useStagger=!1}destroy(){this.values=[],this.timeline=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Nf=({each:e,duration:t,numItem:r,index:o,eachByNumItem:s})=>{if(e===1){let m=t/r,d=pe(o*m),f=pe(d+m);return{start:d,end:f}}let i=t/r*s,a=t-i,l=r-1>0?r-1:1,u=a/l*o;return{start:pe(u),end:pe(i+u)}},Mf=({duration:e,numItem:t,index:r,eachByNumItem:o,type:s})=>{let i=e/t*r,l=(e-(e-i))/t*o;if(s===tr)return{start:0,end:pe(e-(i-l))};if(s===or){let p=(i-l)/2;return{start:pe(p),end:pe(e-p)}}return s===rr?{start:pe(i-l),end:pe(e)}:{start:0,end:e}},Vp=e=>{let t=Uu(e?.items),r=tt(e),o=Wt(e?.duration),s=10,n=r?.each||1,i=[...t].map((f,T)=>({item:f,start:0,end:o,index:T}));if(!Hu(t))return i;r.grid?.col>t.length&&(Qe(t.length),n=1),c.checkType(Number,n)&&(n>s||n<1)&&(Zc(s),n=1);let{staggerArray:a}=rt({arr:[...t].map(f=>({item:f})),endArr:[],stagger:r,slowlestStagger:xe,fastestStagger:xe}),l=a.filter(({item:f})=>c.checkType(Element,f)||c.checkType(Object,f));if(l.length===0)return Xc(),i;let p=l.map(({frame:f})=>f),u=[...new Set(p)].sort((f,T)=>f-T),m=u.length;return l.map(({item:f,frame:T})=>{let g=u.indexOf(T),S=n*m/s,{start:x,end:C}=r.type===er?Nf({each:n,duration:o,numItem:m,index:g,eachByNumItem:S}):r.type===tr||r.type===rr||r.type===or?Mf({duration:o,numItem:m,index:g,eachByNumItem:S,type:r.type}):{start:0,end:o};return{item:f,start:x,end:C,index:g}})};var Z={createScrollerTween(e){return new Ro(e)},createSequencer(e){return new Ao(e)},createMasterSequencer(){return new Po},createStaggers(e){return Vp(e)},createTween(e){return new Pt(e)},createSpring(e){return new at(e)},createLerp(e){return new Rt(e)}};var zs=(e,t)=>Object.entries(e).map(r=>{let[o,s]=r,n=o in t;return{data:{[o]:s},active:n}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var Hs=(e,t,r)=>{let o=t?.getId?.(),s=t?.getInitialData?.()||{};return e.slice(0,r).reduce((n,i)=>{let a=i[0].data;if(a.action==="sync"){let d=a?.syncProp,f={tween:d.from,id:d.from?.getId?.()},T={tween:d.to,id:d.to?.getId?.()};f.id===o&&(o=T.id)}let p=i.find(({data:d})=>d?.tween?.getId?.()===o);p?.data?.tween?.set?.(p?.data?.valuesTo,{immediateNoPromise:!0});let u=p?.data?.tween?.getToNativeType?.(),m=u&&p?zs(u,p.data.valuesTo):{};return{...n,...m}},s)};var _o=class{constructor(t){this.repeat=Ps(t?.repeat),this.yoyo=re(t?.yoyo,"asyncTimeline: yoyo",!1),this.freeMode=re(t?.freeMode,"asyncTimeline: freeMode",!1),this.autoSet=re(t?.autoSet,"asyncTimeline: autoSet",!1),this.tweenList=[],this.currentTween=[],this.tweenStore=[],this.waitComplete=!1,this.defaultObj={id:-1,tween:void 0,action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},syncProp:{to:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}},from:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}}},labelProps:{}},this.labelState={active:!1,index:-1,isReverse:!1},this.starterFunction={fn:()=>{},active:!1},this.groupCounter=1,this.groupId=void 0,this.currentTweenCounter=0,this.currentIndex=0,this.loopCounter=1,this.isReverseNext=!1,this.forceYoyo=!1,this.isReverse=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.isStopped=!0,this.delayIsRunning=!1,this.startOnDelay=!1,this.actionAfterReject={active:!1,fn:()=>{}},this.sessionId=0,this.activetweenCounter=0,this.timeOnPause=0,this.autoSetIsJustCreated=!1,this.currentAction=[],this.fpsIsInLoading=!1,this.id=0,this.callbackLoop=[],this.callbackComplete=[],this.currentResolve=void 0,this.currentReject=void 0}run(){let t=this.tweenList[this.currentIndex],r=this.currentAction;if(this.currentAction=[],!t)return;this.tweenList[this.currentIndex]=t.map(i=>{let{data:a}=i,{tween:l,valuesTo:p,prevValueSettled:u}=a;if(l&&l?.getToNativeType&&!u){let m=l.getToNativeType(),d=zs(m,p);return{...i,data:{...a,prevValueTo:d,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:l,action:p,valuesFrom:u,valuesTo:m,tweenProps:d,syncProp:f,id:T}=a,g={...d};delete g.delay;let{active:S,index:x}=this.labelState,C=S&&x&&this.currentIndex<x;C&&(g.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,kc()),this.currentAction.push({id:T,action:p});let _=r.find(({id:A,action:I})=>A===T&&I===p),M={set:()=>l?.[p](u,g),goTo:()=>l?.[p](m,g),goFrom:()=>l?.[p](u,g),goFromTo:()=>l?.[p](u,m,g),sync:()=>new Promise(A=>{let{from:I,to:V}=f;V?.set(I?.getToNativeType(),{immediate:!0}).then(()=>A({resolve:!0}))}),add:()=>_?new Promise(A=>A({resolve:!0})):new Promise(A=>{if(C)A({resolve:!0});else{let I=this.getDirection();l({direction:I,loop:this.loopCounter}),A({resolve:!0})}}),addAsync:()=>{this.addAsyncIsActive=!0;let A=this.sessionId;return _?new Promise(I=>I({resolve:!0})):new Promise((I,V)=>{if(C)I({resolve:!0});else{let U=this.getDirection();l({direction:U,loop:this.loopCounter,resolve:()=>{A===this.sessionId?I({resolve:!0}):V()}})}})},createGroup:()=>new Promise(A=>A({resolve:!0})),closeGroup:()=>new Promise(A=>A({resolve:!0})),label:()=>new Promise(A=>A({resolve:!0})),suspend:()=>{if(_)return new Promise(V=>V({resolve:!0}));let A=c.checkType(Boolean,l());A||Rc(l);let I=A?l():!0;return new Promise(V=>{!C&&I&&(this.isInSuspension=!0),V({resolve:!0})})}};return new Promise((A,I)=>{let V=C?!1:d?.delay,U=this.sessionId,W=()=>{if(this.isStopped||this.startOnDelay||U!==this.sessionId){I();return}let Y=this.addToActiveTween(l),D=l&&l?.onStartInPause?l.onStartInPause(()=>this.isInPause):he;M[p]().then(()=>A({resolve:!0})).catch(()=>{}).finally(()=>{Y(),D()})};if(V){let Y=c.getTime();this.delayIsRunning=!0;let D=0,O=()=>{let q=c.getTime(),Q=q-Y;if(this.isInPause&&(D=q-this.timeOnPause),this.actionAfterReject.active&&(D=0,Q=V),Q-D>=V||this.isStopped||this.isReverseNext){this.delayIsRunning=!1,W();return}requestAnimationFrame(O)};requestAnimationFrame(O)}else W()})}),n=this.tweenList[this.currentIndex].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[n](o).then(()=>{if(this.isInSuspension||this.isStopped)return;let{active:i,index:a,isReverse:l}=this.labelState,{fn:p,active:u}=this.starterFunction;if(u&&i&&this.currentIndex===a-1){this.starterFunction.active=!1,this.disableLabel(),this.loopCounter++,p();return}if(i&&l&&this.currentIndex===a-1&&this.reverseNext(),this.isReverseNext){this.isReverseNext=!1,this.currentIndex=this.tweenList.length-this.currentIndex-1,this.disableLabel(),this.revertTween(),this.run();return}if(this.currentIndex<this.tweenList.length-1){this.currentIndex++,this.run();return}if(this.loopCounter<this.repeat||this.repeat===-1){let m=()=>{if(this.loopCounter>0){let d=this.getDirection();this.callbackLoop.forEach(({cb:f})=>f({direction:d,loop:this.loopCounter}))}this.loopCounter++,this.currentIndex=0,this.disableLabel(),(this.yoyo||this.forceYoyo)&&this.revertTween(),this.forceYoyo=!1,this.run()};if(i&&a===this.tweenList.length&&!this.freeMode){let d=this.tweenStore.map(({tween:f})=>{let T=Hs(this.tweenList,f,this.tweenList.length);return new Promise((g,S)=>{f.set(T).then(()=>g({resolve:!0})).catch(()=>S())})});Promise.all(d).then(()=>{m()}).catch(()=>{});return}m();return}this.callbackComplete.forEach(({cb:m})=>m()),this.isStopped=!0,this.currentResolve&&this.currentResolve({resolve:!0})}).catch(()=>{if(this.actionAfterReject.active){console.log("actionAfterReject fired"),this.actionAfterReject.fn(),this.actionAfterReject.fn=()=>{},this.actionAfterReject.active=!1;return}}).finally(()=>{this.addAsyncIsActive=!1})}addToActiveTween(t){let r=t?.getId&&t.getId();if(!r)return he;let o=this.activetweenCounter;return this.activetweenCounter++,this.currentTween.push({tween:t,uniqueId:r,id:o}),()=>{this.currentTween=this.currentTween.filter(({id:s})=>s!==o)}}revertTween(){this.isReverse=!this.isReverse,this.tweenList=this.tweenList.reverse().map(t=>t.reverse().map(r=>{let{data:o}=r,{action:s,valuesFrom:n,syncProp:i,prevValueTo:a,valuesTo:l}=o,p=l,{from:u,to:m}=i;switch(s){case"goTo":return{...r,data:{...o,valuesTo:a,prevValueTo:p}};case"goFromTo":return{...r,data:{...o,valuesFrom:l,valuesTo:n}};case"sync":return{...r,data:{...o,syncProp:{...i,from:m,to:u}}};case"goFrom":Pc(),this.stop()}return r}))}addToMainArray(t){let r=this.tweenList.findIndex(o=>o[0]?.group&&o[0].group===this.groupId);r>=0?this.tweenList[r].push({group:this.groupId,data:t}):this.tweenList.push([{group:this.groupId,data:t}])}addTweenToStore(t){let r=t?.getId?.();if(this.tweenStore.find(({id:n})=>n===r))return;let s={id:r,tween:t};this.tweenStore.push(s)}resetAllTween(){this.tweenStore.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!ir(t))return this;o.delay=wo(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"set",valuesTo:r,valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goTo(t,r={},o={}){if(!ir(t))return this;o.delay=wo(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"goTo",valuesTo:r,tweenProps:o??{},groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goFrom(t,r={},o={}){if(!ir(t))return this;o.delay=wo(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"goFrom",valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goFromTo(t,r={},o={},s={}){if(!ir(t))return this;s.delay=wo(s?.delay);let n={id:this.currentTweenCounter,tween:t,action:"goFromTo",valuesFrom:r,valuesTo:o,tweenProps:s,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let i={...this.defaultObj,...n};return this.addToMainArray(i),this.addTweenToStore(t),this}add(t=he){let r=jt(t,()=>{},"timeline add function");if(this.groupId)return nr("add"),this;let o={id:this.currentTweenCounter,tween:r,action:"add",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};return this.addToMainArray(s),this}addAsync(t){let r=Xu(t);if(this.groupId)return nr("addAsync"),this;let o={id:this.currentTweenCounter,tween:r,action:"addAsync",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};return this.addToMainArray(s),this}sync(t){if(this.groupId)return nr("sync"),this;let r=ir(t?.from);if(!ir(t?.to)||!r)return this;let s={id:this.currentTweenCounter,action:"sync",groupProps:{waitComplete:this.waitComplete},syncProp:t};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this}createGroup(t={}){if(this.groupId)return nr("createGroup"),this;let r={id:this.currentTweenCounter,action:"createGroup",groupProps:t};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this.waitComplete=t?.waitComplete??!1,this.groupId=this.groupCounter++,this}closeGroup(){this.groupId=void 0;let t={id:this.currentTweenCounter,action:"closeGroup"};this.currentTweenCounter++;let r={...this.defaultObj,...t};return this.addToMainArray(r),this.waitComplete=!1,this}suspend(t=()=>!0){if(this.groupId)return nr("suspend"),this;let r={id:this.currentTweenCounter,tween:t,action:"suspend",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}label(t={}){if(this.groupId)return nr("label"),this;if(!Ju(t?.name,"asyncTimeline label:"))return this;let r={id:this.currentTweenCounter,action:"label",labelProps:t,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}addSetBlocks(){this.autoSetIsJustCreated||(this.autoSetIsJustCreated=!0,this.tweenStore.forEach(({tween:t})=>{let r=t.getInitialData(),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};this.tweenList=[[{group:void 0,data:s}],...this.tweenList]}),this.tweenStore.forEach(({tween:t})=>{let r=Hs(this.tweenList,t,this.tweenList.length),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};this.tweenList.push([{group:void 0,data:s}])}))}setTween(t="",r=[]){this.stop();let o=Ku(r),s=Zu(t);if(!o||!s)return Promise.reject(new Error("timeline setTween: props is wrong"));let n=new Set(r.map(l=>l?.getId?.())),i=this.tweenStore.filter(({id:l})=>n.has(l)),a=this.tweenList.findIndex(l=>{let[p]=l;return p.data.labelProps?.name===t});return a===-1?(Oc(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(l=>{let p=i.map(({tween:u})=>{let m=Hs(this.tweenList,u,a);return new Promise((d,f)=>{u.set(m).then(()=>d({resolve:!0})).catch(()=>f())})});Promise.all(p).then(()=>{l({resolve:!0})}).catch(()=>{Nc()})})}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(){return new Promise((t,r)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{if(this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks(),this.freeMode){if(this.tweenList.length===0||this.addAsyncIsActive)return;if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.play(),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,this.isReverse&&this.revertTween(),this.sessionId++,c.useFrameIndex(()=>{this.currentReject=r,this.currentResolve=t,this.run()},1)}else{let o=()=>{this.stop(),this.isStopped=!1;let s=this.tweenStore.map(({tween:n})=>{let i=n.getInitialData();return new Promise((a,l)=>{n.set(i).then(()=>a({resolve:!0})).catch(()=>l())})});Promise.all(s).then(()=>{this.currentReject=r,this.currentResolve=t,this.run()}).catch(()=>{})};this.starterFunction.fn=()=>o(),this.starterFunction.active=!0,this.playReverse({forceYoYo:!0})}}))})}playFromLabel({isReverse:t=!1,label:r=null}){this.tweenList.length===0||this.addAsyncIsActive||(this.isReverse&&this.revertTween(),this.currentIndex=0,this.labelState.isReverse=t,this.labelState.active=!0,this.labelState.index=c.checkType(String,r)?this.tweenList.findIndex(o=>{let[s]=o;return s.data.labelProps?.name===r}):r,c.checkType(String,r)&&Yu(this.labelState.index,r),this.run())}playFrom(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!1,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playFromReverse(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!0,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playReverse({forceYoYo:t=!0,resolve:r=null,reject:o=null}={}){return new Promise((s,n)=>{let i=r||s,a=o||n;this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks();let l=t;if(!(this.tweenList.length===0||this.addAsyncIsActive)){if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.playReverse({forceYoYo:l}),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,l&&(this.forceYoyo=!0),this.labelState.active=!0,this.labelState.index=this.tweenList.length,this.loopCounter--,this.sessionId++,c.useFrameIndex(()=>{this.currentResolve=i,this.currentReject=a,this.run()},1)}}))})}reverseNext(){this.isReverseNext=!0}stop({clearCache:t=!0}={}){this.isStopped=!0,this.currentIndex=0,this.loopCounter=1,this.rejectPromise(),this.isReverseNext=!1,this.disableLabel(),this.forceYoyo=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.timeOnPause=0,this.labelState.isReverse=!1,this.tweenStore.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.isReverse&&this.revertTween(),this.isReverse=!1,this.freeMode||this.resetAllTween()}pause(){this.isInPause=!0,this.timeOnPause=c.getTime(),this.currentTween.forEach(({tween:t})=>{t?.pause?.()})}resume(){this.isInPause&&(this.isInPause=!1,this.timeOnPause=0,this.resumeEachTween()),this.isInSuspension&&(this.isInSuspension=!1,this.timeOnPause=0,this.currentIndex<=this.tweenList.length-2?(this.currentIndex++,this.run()):this.currentIndex===this.tweenList.length-1&&(this.currentIndex=this.yoyo&&!this.isReverse?1:0,this.disableLabel(),this.yoyo&&this.revertTween(),this.loopCounter++,this.run()))}disableLabel(){this.labelState.active=!1,this.labelState.index=-1}resumeEachTween(){this.currentTween.forEach(({tween:t})=>{t?.resume?.()})}get(){return this.currentTween}isActive(){return!this.isStopped}isPaused(){return this.isInPause}isSuspended(){return this.isInSuspension}getDirection(){return this.isStopped?we.NONE:this.isReverse?we.BACKWARD:we.FORWARD}onLoopEnd(t){this.callbackLoop.push({cb:t,id:this.id});let r=this.id;return()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t){this.callbackComplete.push({cb:t,id:this.id});let r=this.id;return this.id++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}destroy(){this.tweenStore.forEach(({tween:t})=>{t?.destroy?.()}),this.tweenList=[],this.currentTween=[],this.callbackComplete=[],this.callbackLoop=[],this.tweenStore=[],this.currentIndex=0,this.actionAfterReject={active:!1,fn:()=>{}}}};var Oo=class{constructor(t={}){this.duration=Wt(t?.duration),this.yoyo=re(t?.yoyo,"syncTimeline: yoyo",!1),this.repeat=Ps(t?.repeat),this.sequencers=[],this.startTime=0,this.timeElapsed=0,this.currentTime=0,this.pauseTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.isReverse=!1,this.startReverse=!1,this.isPlayngReverse=!1,this.loopCounter=0,this.loopIteration=0,this.minLoopIteration=10,this.isStopped=!0,this.skipFirstRender=!1,this.completed=!1,this.fpsIsInLoading=!1,this.isInPause=!1,this.callbackId=0,this.callbackLoop=[],this.callbackComplete=[],this.callbackOnUpdate=[],this.currentResolve=void 0,this.currentReject=void 0}updateTime(t,r){if(this.isStopped||this.fpsIsInLoading)return;let o=!this.repeat||this.repeat>=2&&this.loopCounter===this.repeat-1?0:1e3/r/2;this.isInPause&&(this.pauseTime=t-this.startTime-this.timeElapsed-this.timeAtReverseBack),this.timeElapsed=Math.trunc(t-this.startTime-this.pauseTime-this.timeAtReverseBack);let s=this.isReverse?this.timeAtReverse-(this.timeElapsed-this.timeAtReverse):this.timeElapsed;if(this.isInPause||(this.currentTime=Oe(s,0,this.duration),this.skipFirstRender||(this.sequencers.forEach(i=>{i.draw({partial:this.currentTime,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.callbackOnUpdate.forEach(({cb:i})=>{i({time:this.currentTime,direction:this.getDirection()})}))),this.skipFirstRender=!1,this.loopIteration++,s<=this.duration-o&&s>=0+o&&!this.isStopped){this.completed=!1,this.goToNextFrame();return}if(this.resetSequencerLastValue(),this.startReverse){this.isReverse=!0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!1,this.goToNextFrame();return}let n=this.getDirection();if(c.useNextFrame(()=>{!this.fpsIsInLoading&&!this.completed&&this.loopIteration>this.minLoopIteration&&(this.completed=!0,this.loopCounter++,this.loopIteration=0,this.callbackLoop.forEach(({cb:i})=>i({direction:n,loop:this.loopCounter})))}),!this.repeat||this.loopCounter===this.repeat-1&&this.loopIteration>this.minLoopIteration){let i=this.currentTime;this.sequencers.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.isStopped=!0,this.resetTime(),this.startTime=t,this.isReverse&&(this.isReverse=!1),this.callbackComplete.forEach(({cb:a})=>a()),this.currentResolve&&this.currentResolve();return}if(this.yoyo){this.reverse(),this.goToNextFrame();return}if(this.isPlayngReverse){this.resetTime(),this.startTime=t,this.isReverse||(this.isPlayngReverse=!this.isPlayngReverse),this.timeElapsed=this.duration,this.currentTime=this.duration,this.pauseTime=this.duration,this.goToNextFrame();return}this.resetTime(),this.startTime=t,this.isReverse&&(this.isPlayngReverse=!this.isPlayngReverse),this.goToNextFrame()}goToNextFrame(){c.useFrame(()=>{c.useNextTick(({time:t,fps:r})=>{this.fpsIsInLoading||this.updateTime(t,r)})})}resetTime(){this.timeElapsed=0,this.pauseTime=0,this.currentTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0}getTimeFromLabel(t){let r=this.sequencers.reduce((o,s)=>s.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||Mc(t),r.time}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(t={}){return new Promise((r,o)=>{let s=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&!this.isReverse&&s))){if(!this.isStopped&&this.isReverse&&s){this.reverse();return}this.playFromTime()}})}playFrom(t=0){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let n=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTime(n)})}playFromTime(t=0){this.resetSequencerLastValue(),this.resetTime(),this.currentTime=t,this.timeAtReverseBack=-this.currentTime,this.isPlayngReverse=!1,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}playFromReverse(t){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let n=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTimeReverse(n,!0)})}playReverse(t={}){return new Promise((r,o)=>{let s=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&this.isReverse&&s))){if(!this.isStopped&&!this.isReverse&&s){this.reverse();return}this.playFromTimeReverse(this.duration,!0)}})}playFromTimeReverse(t=0){this.resetSequencerLastValue(),this.timeElapsed=t,this.currentTime=t,this.pauseTime=t,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!0,this.isPlayngReverse=!0,this.skipFirstRender=!0,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}async startAnimation(t){if(this.repeat===0)return;let{averageFPS:r}=await c.useFps();Ht("sequencer",r),this.isReverse=!1,this.sequencers.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),c.useFrame(()=>{c.useNextTick(({time:o,fps:s})=>{this.startTime=o,this.fpsIsInLoading=!1,this.isStopped=!1,this.isInPause=!1,this.loopCounter=0,this.updateTime(o,s)})})}pause(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!0)}resume(){this.isStopped||!this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!1)}reverse(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.resetSequencerLastValue(),this.isReverse=!this.isReverse,this.isReverse?this.timeAtReverse=this.timeElapsed:this.timeAtReverseBack+=this.timeElapsed-this.currentTime)}stop({clearCache:t=!0}={}){if(this.isStopped=!0,this.isInPause=!1,this.rejectPromise(),t){this.sequencers.forEach(r=>{r.cleanCachedId()});return}this.sequencers.forEach(r=>{r.draw({partial:this.currentTime,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.duration),this.sequencers.push(t),this}setDuration(t){return this.duration=t,this}resetSequencerLastValue(){this.sequencers.forEach(t=>t.resetLastValue())}isActive(){return!this.isStopped}isPaused(){return this.isInPause}getDirection(){return this.isStopped?we.NONE:this.isReverse?we.BACKWARD:we.FORWARD}getTime(){return this.currentTime}onLoopEnd(t=()=>{}){this.callbackLoop.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.callbackComplete.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.callbackOnUpdate.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackOnUpdate=this.callbackOnUpdate.filter(o=>o.id!==r)}}destroy(){this.stop(),this.sequencers.forEach(t=>t.destroy()),this.sequencers=[],this.callbackOnUpdate=[],this.callbackLoop=[],this.callbackComplete=[]}};var Ne={createSyncTimeline(e){return new Oo(e)},createAsyncTimeline(e){return new _o(e)}};var Gt={createParallax(e){return new qt({...e,type:h.TYPE_PARALLAX})},createScrollTrigger(e){return new qt({...e,type:h.TYPE_SCROLLTRIGGER})}};var $p=({onMount:e,watch:t,html:r})=>(e(({element:o})=>{let s="",n=!1,i=[{xIn:0,xOut:0},{xIn:0,xOut:0}],a=()=>{let{xIn:u}=i[0],{xIn:m}=i[1],{xOut:d}=i[0],{xOut:f}=i[1];o.style.clipPath=`polygon(${d}% 0%, ${u}% 0%, ${m}% 100%, ${f}% 100%)`},l=Z.createTween({data:{xIn:0,xOut:0},stagger:{each:8}});i.forEach(u=>{l.subscribe(({xIn:m,xOut:d})=>{u.xIn=m,u.xOut=d,a()})});let p=Ne.createAsyncTimeline({repeat:1,autoSet:!0});return p.goTo(l,{xIn:100},{ease:"easeInOutCirc",duration:500}).addAsync(({resolve:u})=>{let m=N.watch("atfterRouteChange",()=>{m(),u()});$n({url:s})}).goTo(l,{xOut:100},{ease:"easeInCubic",duration:500}),t("url",async u=>{n||(n=!0,s=u,await p.play(),n=!1)}),()=>{}}),r`<div class="c-page-transiotion"></div>`);var Lf=k({name:"page-transition",component:$p,isolateOnMount:!0,isolateCreation:!0,exportState:["url"],state:{url:()=>({value:"",type:String,skipEqual:!1})}});function ne(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function Re(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}var Us=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.text()}:(console.warn(`${e} not found`),{success:!1,data:""})},E=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.json()}:(console.warn(`${e} not found`),{success:!1,data:""})};var Ff=({data:e,staticProps:t})=>e.map(r=>{let{component:o,props:s,content:n}=r;return b`
                <${o} ${t(s)}>
                    ${n??""}
                </${o}>
            `}).join(""),Df=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await E({source:e});return r?o.data:[]},Vf=({data:e,bindProps:t})=>e&&e.length>0?"":b`
        <mob-loader
            ${t({bind:["contentIsLoaded"],props:({contentIsLoaded:r})=>({shouldRemove:r})})}
        ></mob-loader>
    `,Wp=async({html:e,getState:t,setState:r,staticProps:o,bindProps:s,onMount:n})=>{let{source:i,data:a}=t(),l=await Df({source:i,data:a}),{useMinHeight:p,useMaxWidth:u}=t(),m=p?"is-min-100":"",d=u?"is-max-width":"";return n(async({element:f})=>{r("contentIsLoaded",!0),c.useFrame(()=>{f.classList.add("active")})}),e`
        <section class="html-content ${m} ${d}">
            ${Vf({data:a,bindProps:s})}
            ${Ff({data:l,staticProps:o})}
        </section>
    `};var $f=k({name:"html-content",component:Wp,exportState:["source","useMinHeight","useMaxWidth","data"],state:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),contentIsLoaded:()=>({value:!1,type:Boolean}),useMinHeight:()=>({value:!1,type:Boolean}),useMaxWidth:()=>({value:!1,type:Boolean})}});var Bp=({html:e,getState:t})=>{let{tag:r,color:o,isBold:s}=t(),n=`is-${o}`;return e`<${r} class="mob-title ${n} ${s?"is-bold":""}">
        <mobjs-slot/>
    </${r}>`};var Wf=k({name:"mob-title",component:Bp,exportState:["tag","color","isBold"],state:{tag:()=>({value:"h1",type:String}),color:()=>({value:"white",type:String,validate:e=>["white","green"].includes(e)}),isBold:()=>({value:!1,type:Boolean})}});var jp=({html:e,getState:t})=>{let{style:r,color:o}=t(),s=`is-${o}`;return e`<p class="p p--${r} ${s}">
        <mobjs-slot />
    </p>`};var Bf=k({name:"mob-paragraph",component:jp,exportState:["style","color"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)})}});var jf=({items:e})=>e.map(t=>b` <li>${t}</li> `).join(""),zp=({html:e,getState:t})=>{let{style:r,color:o,items:s,dots:n}=t(),i=`is-${o}`;return e`<ul class="ul ul--${r} ${i} ${n?"":"hide-dots"}">
        ${jf({items:s})}
    </ul>`};var zf=k({name:"mob-list",component:zp,exportState:["style","color","items","dots"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)}),items:()=>({value:[],type:Array})}});var uh=Xd(ch(),1);var Ci=uh.default;var ph="[A-Za-z$_][0-9A-Za-z$_]*",Ng=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Mg=["true","false","null","undefined","NaN","Infinity"],hh=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],dh=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],mh=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Lg=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Fg=[].concat(mh,hh,dh);function fh(e){let t=e.regex,r=(v,{after:R})=>{let P="</"+v[0].slice(1);return v.input.indexOf(P,R)!==-1},o=ph,s={begin:"<>",end:"</>"},n=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,R)=>{let P=v[0].length+v.index,B=v.input[P];if(B==="<"||B===","){R.ignoreMatch();return}B===">"&&(r(v,{after:P})||R.ignoreMatch());let J,ee=v.input.substring(P);if(J=ee.match(/^\s*=/)){R.ignoreMatch();return}if((J=ee.match(/^\s+extends\s+/))&&J.index===0){R.ignoreMatch();return}}},a={$pattern:ph,keyword:Ng,literal:Mg,built_in:Fg,"variable.language":Lg},l="[0-9](_?[0-9])*",p=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${u})((${p})|\\.)?|(${p}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},f={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},T={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},_=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,T,g,S,{match:/\$\d+/},m];d.contains=_.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(_)});let M=[].concat(C,d.contains),A=M.concat([{begin:/\(/,end:/\)/,keywords:a,contains:["self"].concat(M)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:A},V={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},U={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...hh,...dh]}},W={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Y={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},D={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function O(v){return t.concat("(?!",v.join("|"),")")}let q={match:t.concat(/\b/,O([...mh,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},Q={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},j={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},L="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",y={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(L)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:U},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),W,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,T,g,S,C,{match:/\$\d+/},m,U,{className:"attr",begin:o+t.lookahead(":"),relevance:0},y,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:L,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:n},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},Y,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},Q,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},q,D,V,j,{match:/\$[(.]/}]}}Ci.registerLanguage("javascript",fh);var gh=async({ref:e,source:t})=>{let{success:r,data:o}=await Us({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Ci.highlightElement(e,{language:"javascript"}),e.style.minHeight=""},bh=({html:e,onMount:t,getState:r})=>{let{source:o,isFull:s,hasBorder:n,hasOverflow:i,numLines:a,loadOnMount:l}=r(),p=s?"is-full":"",u=n?"has-border":"",m=i?"has-overflow":"";return t(async({refs:d})=>{let{codeEl:f}=d;return l?await gh({ref:f,source:o}):gh({ref:f,source:o}),()=>{}}),e`<div class="snippet">
        <code class="${p} ${u}">
            <pre
                class="${p} ${m}"
                ref="codeEl"
                style="min-height:${a*1.5}rem;"
            >
Loading snippet ...</pre
            >
        </code>
    </div>`};var Dg=k({name:"mob-snippet",component:bh,exportState:["source","isFull","hasOverflow","hasBorder","numLines","loadOnMount"],state:{source:()=>({value:"",type:String}),contentIsLoaded:()=>({value:!1,type:Boolean}),isFull:()=>({value:!1,type:Boolean}),hasOverflow:()=>({value:!0,type:Boolean}),hasBorder:()=>({value:!1,type:Boolean}),numLines:()=>({value:1,type:Number}),loadOnMount:()=>({value:!1,type:Boolean})}});function Vg({id:e,label:t}){return e&&e.length>0?`data-scroll=${e} data-label=${t}`:""}var yh=async({html:e,getState:t})=>{let{style:r,line:o,id:s,label:n}=t(),i=o?"spacer--line":"";return e`<div
        ${Vg({id:s,label:n})}
        class="spacer spacer--${r} ${i}"
    ></div>`};var $g=k({name:"mob-spacer",component:yh,exportState:["style","line","id","label"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String})}});var Wg=b`
    <div class="only-desktop">
        <h3>This content is available only on desktop</h3>
        <h4>Need page reload on a screen size up to 1024px</h4>
    </div>
`,vh=({element:e})=>{e.textContent="",!se.mq("min","desktop")&&(e.textContent="",e.insertAdjacentHTML("afterbegin",Wg))},Sh=({html:e,onMount:t})=>(t(({element:r})=>{vh({element:r}),c.useResize(()=>{vh({element:r})})}),e` <div class="only-desktop-container" ref="container"></div> `);var Bg=k({name:"only-desktop",component:Sh,state:{}});var wh=({onMount:e,html:t,watch:r,remove:o,getState:s})=>{let{position:n}=s();return e(({element:i})=>{let a=Z.createTween({data:{opacity:1,scale:1},duration:500});return a.subscribe(({opacity:l,scale:p})=>{i.style.opacity=l,i.style.transform=`scale(${p})`}),r("shouldRemove",async l=>{l&&(await a.goTo({opacity:0,scale:.9}),o())}),()=>{a.destroy(),a=null}}),t`
        <div class="c-loader ${n}">
            <span class="c-loader__inner"></span>
        </div>
    `};var jg=k({name:"mob-loader",component:wh,exportState:["position","shouldRemove"],state:{shouldRemove:()=>({value:!1,type:Boolean}),position:()=>({value:"center-viewport",type:String,validate:e=>["center-viewport","center-component"].includes(e)})}});var zg=({scrollY:e,element:t})=>{c.useNextTick(()=>{let r=e,o=document.documentElement.scrollHeight-window.innerHeight,s=Math.round(r/o*100);c.useNextFrame(()=>{t.style.setProperty("--delta",`${s}%`)})})},Th=({html:e,onMount:t})=>(t(({element:r})=>{if(se.mq("max","large"))return;r.style.setProperty("--delta","0");let o=c.useScroll(({scrollY:s})=>{c.useFrame(()=>{zg({scrollY:s,element:r})})});return()=>{o()}}),e` <div class="c-doc-scroll"></div> `);var Hg=k({name:"doc-scroll",component:Th});var xh=({html:e,delegateEvents:t})=>e`
        <div
            class="c-doc-top"
            ${t({click:()=>At.to(0,{duration:2e3})})}
        ></div>
    `;var Ug=k({name:"doc-top",component:xh});function qg({targets:e,delegateEvents:t,syncParent:r,staticProps:o,setState:s,bindProps:n}){return e.map((i,a)=>{let{label:l,scroll:p}=i.dataset;return b`<li>
                <scroll-to-button
                    ${t({click:()=>{let u=p==="start"?0:ie(i).top-50;At.to(u),s("activeId",a)}})}
                    ${n({bind:["activeId"],props:({activeId:u})=>({active:u===a})})}
                    ${o({label:l})}
                    ${r}
                >
                </scroll-to-button>
            </li> `}).join("")}var Ch=({html:e,onMount:t,delegateEvents:r,syncParent:o,staticProps:s,bindProps:n,setState:i})=>(t(({refs:a})=>{if(se.mq("max","large"))return;let{list:l}=a,p=document.querySelectorAll("[data-scroll]");l.insertAdjacentHTML("beforeend",qg({targets:[...p],delegateEvents:r,syncParent:o,staticProps:s,bindProps:n,setState:i})),po(l);let u=c.useMouseWheel(()=>{i("activeId",-1)});return()=>{u()}}),e` <div class="c-scroll-to"><ul ref="list"></ul></div> `);var Gg=k({name:"scroll-to",component:Ch,exportState:["activeId"],state:{activeId:()=>({value:0,type:Number})}});var Ih=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:s}=t();return r(({element:n})=>{o("active",i=>{n.classList.toggle("active",i)})}),e`
        <button type="button">
            <span> ${s} </span>
        </button>
    `};var Jg=k({name:"scroll-to-button",component:Ih,exportState:["label","active"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Eh=[{label:"html",url:"mobJs_html"},{label:"onMount",url:"mobJs_onMount"},{label:"getState",url:"mobJs_getState"},{label:"setState",url:"mobJs_setState"},{label:"watch",url:"mobJs_watch"},{label:"watchSync",url:"mobJs_watchSync"},{label:"staticProps",url:"mobJs_staticProps"},{label:"bindProps",url:"mobJs_bindProps"},{label:"bindEvents",url:"mobJs_bindEvents"},{label:"delegateEvents",url:"mobJs_delegateEvents"},{label:"reactive list: (repeat)",url:"mobJs_repeat"},{label:"unBind",url:"mobJs_unBind"},{label:"emit",url:"mobJs_emit"},{label:"emitAsync",url:"mobJs_emitAsync"},{label:"computed",url:"mobJs_computed"},{label:"remove",url:"mobJs_remove"},{label:"removeDOM",url:"mobJs_removeDom"},{label:"getChildren",url:"mobJs_getChildren"},{label:"freezeProp",url:"mobJs_freezeProp"},{label:"unFreezeProp",url:"mobJs_unFreezeProp"},{label:"getParentId",url:"mobJs_getParentId"},{label:"watchParent",url:"mobJs_watchParent"},{label:"syncParent",url:"mobJs_syncParent"}];var Yg={mobjs:Eh},Xg=({data:e,staticProps:t})=>e.map(r=>{let{label:o,url:s}=r;return b`<li>
                <links-mobjs-button
                    ${t({label:o,url:s})}
                ></links-mobjs-button>
            </li>`}).join(""),kh=({html:e,staticProps:t,getState:r})=>{let{section:o}=r();return e`<div class="c-params-mobjs">
        <ul>
            ${Xg({staticProps:t,data:Yg?.[o]??[]})}
        </ul>
    </div>`};var Rh=({html:e,getState:t})=>{let{label:r,url:o}=t(),{activeRoute:s}=N.get();return e`<a href="./#${o}" class="${s===o?"current":""}">${r}</a>`};var Kg=k({name:"links-mobjs",component:kh,exportState:["section"],state:{section:()=>({value:"",type:String})}}),Zg=k({name:"links-mobjs-button",component:Rh,exportState:["label","url"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String})}});var Ph=({html:e,onMount:t})=>(t(({element:r})=>{r.classList.add("disable");let o=Z.createTween({data:{opacity:1,scale:1},duration:500});return o.subscribe(({opacity:s,scale:n})=>{r.style.opacity=s,r.style.transform=`scale(${n})`}),N.watch("beforeRouteChange",()=>{r.classList.remove("disable"),o.goTo({opacity:1,scale:1})}),N.watch("atfterRouteChange",async()=>{await o.goTo({opacity:0,scale:.9}),r.classList.add("disable")}),()=>{o.destroy(),o=null}}),e`
        <div class="c-loader center-viewport">
            <span class="c-loader__inner"></span>
        </div>
    `);var Qg=k({name:"route-loader",component:Ph,state:{isLoading:()=>({value:!1,type:Boolean})}});var Ah=({html:e})=>e`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <mobjs-slot name="debug"></mobjs-slot>
            </div>
        </footer>
    `;var eb=k({name:"mob-footer",component:Ah});var $=c.createStore({closeAllAccordion:()=>{},refreshScroller:()=>{},openNavigation:()=>{},closeNavigation:()=>{},goToTop:()=>{},activeSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});var _h=({html:e,onMount:t,getState:r})=>{let{label:o,section:s}=r();return t(({element:n})=>{$.watch("activeSection",i=>{let a=i===s;n.classList.toggle("current",a)})}),e`
        <button type="button" class="footer-nav__button">${o}</button>
    `};var tb=[{label:"About",url:"about",section:"about"},{label:"Canvas 2d",url:"canvas_overview",section:"canvas"},{label:"Illustration",url:"svg_overview",section:"svg"},{label:"MobCore",url:"mobCore_overview",section:"mobCore"},{label:"MobJs",url:"mobJs_overview",section:"mobJs"},{label:"MobMotion",url:"mobMotion_overview",section:"mobMotion"},{label:"Plugin",url:"plugin_overview",section:"plugin"}];function rb({url:e}){let t=qe("page-transition");_e(t,"url",e)}var ob=({delegateEvents:e,staticProps:t})=>tb.map(({label:r,url:o,section:s})=>b`<li class="footer-nav__item">
                <footer-nav-button
                    ${e({click:()=>{rb({url:o})}})}
                    ${t({label:r,section:s})}
                ></footer-nav-button>
            </li> `).join(""),Oh=({html:e,delegateEvents:t,staticProps:r})=>se.mq("max","desktop")?e` <span></span> `:e`
        <ul class="footer-nav">
            ${ob({delegateEvents:t,staticProps:r})}
        </ul>
    `;var sb=k({name:"footer-nav",component:Oh}),nb=k({name:"footer-nav-button",component:_h,exportState:["label","section"],state:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})}});function ib({navInfo:e}){c.useFrame(()=>{e.classList.add("open")})}function ab({navInfo:e}){c.useFrame(()=>{e.classList.remove("open")})}function lb(){let e=qe("page-transition");_e(e,"url","#home"),$.set("navigationIsOpen",!1),$.emit("closeNavigation"),$.emit("closeAllAccordion"),$.emit("goToTop")}var Nh=({html:e,onMount:t,delegateEvents:r})=>(t(({refs:o})=>{let{navInfo:s,title:n,beta:i}=o;return $.watch("openNavigation",()=>ib({navInfo:s})),$.watch("closeNavigation",()=>ab({navInfo:s})),N.watch("beforeRouteChange",a=>{n.classList.toggle("visible",a!=="home"),i.classList.toggle("visible",a!=="home")}),()=>{}}),e`
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
                        ${r({click:()=>{lb()}})}
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
    `);var Mh=`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>

`;var Lh={},Fh={},Xs=()=>Lh,ye=()=>Fh,Dh=async()=>{Lh=await fetch("./data/common.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e)),Fh=await fetch("./data/legend.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e))};var Vh={github:Mh},ub=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t.dataset,o=qe("page-transition");_e(o,"url",r);let{navigationIsOpen:s}=$.get();s&&($.set("navigationIsOpen",!1),$.emit("closeNavigation"))};function pb({delegateEvents:e}){let{header:t}=Xs(),{links:r}=t;return r.map(o=>{let{svg:s,url:n,internal:i}=o;return b`<li class="l-header__sidenav__item">
                ${i?b`
                          <button
                              type="button"
                              data-url="${n}"
                              class="l-header__sidenav__link"
                              ${e({click:a=>{console.log("click"),ub({event:a})}})}
                          >
                              ${Vh[s]}
                          </button>
                      `:b`
                          <a
                              href="${n}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${Vh[s]}
                          </a>
                      `}
            </li>`}).join("")}var $h=({html:e,delegateEvents:t})=>e`
        <ul class="l-header__sidenav">
            ${pb({delegateEvents:t})}
        </ul>
    `;var hb=()=>{let{navigationIsOpen:e}=$.get("navigationIsOpen");if($.set("navigationIsOpen",t=>!t),e){$.emit("closeNavigation");return}$.emit("openNavigation")},Wh=({onMount:e,html:t,delegateEvents:r})=>(e(({element:o})=>{$.watch("closeNavigation",()=>{c.useFrame(()=>{o.classList.remove("is-open")})}),$.watch("openNavigation",()=>{c.useFrame(()=>{o.classList.add("is-open")})})}),t`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${r({click:()=>hb()})}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `);var db=k({name:"mob-header",component:Nh}),mb=k({name:"mob-header-nav",component:$h}),fb=k({name:"mob-header-toggle",component:Wh});var Ii=0,Bh=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),s=200,n=new Ut({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"tablet",onUpdate:({percent:i})=>{let{navigationIsOpen:a}=$.get();a&&(Ii=Number.parseInt(i)/100,o.style.transform=`translateZ(0) scaleX(${Ii})`)}});n.init(),$.watch("activeSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let l=document.querySelector(".l-header"),p=Se(r),u=Se(l),m=100*a.offsetTop/(p-window.innerHeight+u),d=Math.min(m,100);n.move(d)}),$.watch("refreshScroller",()=>n.refresh()),$.watch("closeNavigation",()=>{o.style.transform="translateZ(0) scaleX(0)"}),$.watch("openNavigation",()=>{o.style.transform=`translateZ(0) scaleX(${Ii})`}),$.watch("goToTop",()=>{setTimeout(()=>{n.set(0),$.set("activeSection","no-section")},s)})};function gb({element:e,main:t}){c.useFrame(()=>{document.body.style.overflow="",e.classList.remove("active"),t.classList.remove("shift")})}function bb({element:e,main:t}){$.emit("refreshScroller"),c.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("active"),t.classList.add("shift")})}function yb({main:e,toTopBtn:t}){e.addEventListener("click",()=>{let{navigationIsOpen:r}=$.get();r&&($.set("navigationIsOpen",!1),$.emit("closeNavigation"))}),t.addEventListener("click",()=>{$.emit("closeAllAccordion"),$.emit("goToTop");let{navigationIsOpen:r}=$.get();r||At.to(0)})}var jh=({html:e,onMount:t})=>(t(({element:r,refs:o})=>{let s=document.querySelector("main.main"),n="",{toTopBtn:i,wrap:a}=o;return $.watch("openNavigation",()=>bb({element:r,main:s})),$.watch("closeNavigation",()=>gb({element:r,main:s})),c.useResize(()=>{let p=se.mq("max","desktop")?"desk":"mob";p!==n&&a.scrollTo(0,0),n=p}),yb({main:s,toTopBtn:i}),Bh({root:r}),()=>{}}),e`
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
    `);function vb({data:e,staticProps:t,setState:r,bindProps:o,bindEvents:s}){return e.map((n,i)=>{let{label:a,url:l,children:p,section:u,sectioName:m,scrollToSection:d}=n;return u?b`
                    <mob-navigation-label
                        ${t({label:a,sectioName:m})}
                    ></mob-navigation-label>
                `:p?b`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:a,url:l},children:p,callback:()=>r("currentAccordionId",i)})}
                          ${o({bind:["currentAccordionId"],props:({currentAccordionId:f})=>({isOpen:f===i})})}
                      >
                      </mob-navigation-submenu>
                  `:b`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${s({click:()=>{}})}
                              ${t({label:a,url:l,scrollToSection:d??"no-scroll"})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var zh=({html:e,staticProps:t,setState:r,bindProps:o,bindEvents:s})=>{let{navigation:n}=Xs();return $.watch("closeAllAccordion",()=>{r("currentAccordionId",-1)}),e`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${vb({data:n,staticProps:t,setState:r,bindProps:o,bindEvents:s})}
            </ul>
        </nav>
    `};var Hh=({getState:e,html:t,onMount:r,watch:o,delegateEvents:s})=>{let{label:n,url:i,arrowClass:a,subMenuClass:l,fireRoute:p,callback:u,scrollToSection:m}=e();return r(({element:d})=>(o("isOpen",f=>{c.useFrame(()=>{d.classList.toggle("active",f)})}),N.watch("activeRoute",f=>{c.useFrame(()=>{let T=f===i;d.classList.toggle("current",T),T&&p&&(u(),$.set("activeSection",m))})}),()=>{})),t`
        <button
            type="button"
            class="l-navigation__link  ${a} ${l}"
            ${s({click:()=>{if(u(),!p)return;let d=qe("page-transition");_e(d,"url",i),$.set("navigationIsOpen",!1),$.emit("closeNavigation")}})}
        >
            ${n}
        </button>
    `};var Uh=({getState:e,html:t})=>{let{label:r,sectioName:o}=e();return t`
        <div class="l-navigation__label" data-sectionname="${o}">
            ${r}
        </div>
    `};function Sb({children:e,staticProps:t,callback:r}){return e.map(o=>{let{label:s,url:n,scrollToSection:i}=o;return b`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({callback:r,label:s,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:i})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var qh=({onMount:e,html:t,getState:r,setState:o,staticProps:s,bindProps:n,watch:i})=>{let{children:a,headerButton:l,callback:p}=r(),{label:u,url:m}=l;return e(({refs:d})=>{let{content:f}=d;return Io.subscribe(f),Io.reset(f),i("isOpen",async T=>{if(await Io[T?"down":"up"](f),$.emit("refreshScroller"),!T){let S=qe("main_navigation");_e(S,"currentAccordionId",-1,!1)}}),()=>{}}),t`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${s({label:u,url:m,arrowClass:"l-navigation__link--arrow",fireRoute:!1,callback:()=>{o("isOpen",f=>!f);let{isOpen:d}=r("isOpen");d&&p()}})}
                ${n({bind:["isOpen"],props:({isOpen:d})=>({isOpen:d})})}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ref="content">
                ${Sb({children:a,staticProps:s,callback:p})}
            </ul>
        </li>
    `};var wb=k({name:"mob-navigation-container",component:jh,isolateOnMount:!0,isolateCreation:!0}),Tb=k({name:"mob-navigation",component:zh,exportState:["currentAccordionId"],state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})}}),xb=k({name:"mob-navigation-submenu",component:qh,isolateOnMount:!0,isolateCreation:!0,exportState:["children","headerButton","isOpen","callback"],state:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})}}),Cb=k({name:"mob-navigation-button",type:"button",component:Hh,exportState:["label","url","arrowClass","subMenuClass","fireRoute","callback","isOpen","scrollToSection"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),scrollToSection:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean})}}),Ib=k({name:"mob-navigation-label",component:Uh,exportState:["label","sectioName"],state:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String})}});var Gh=({html:e,onMount:t})=>(t(({refs:r})=>{window.scrollTo(0,0);let{side:o}=r;o.classList.add("active")}),e`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side" ref="side">
                <doc-scroll></doc-scroll>
                <doc-top></doc-top>
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `);var Eb=k({name:"doc-container",component:Gh});var Jh=({html:e})=>e`
        <div class="c-doc-title">
            <h2><mobjs-slot /></h2>
        </div>
    `;var kb=k({name:"doc-title",component:Jh,state:{}});var Yh=({html:e})=>e`
        <div class="c-doc-title-small">
            <mobjs-slot />
        </div>
    `;var Rb=k({name:"doc-title-small",component:Yh,state:{}});var Xh=`<?xml version="1.0" encoding="UTF-8"?>
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
`;var Kh=({html:e,onMount:t})=>(t(({refs:r})=>{let{shape:o}=r;c.useFrame(()=>{o.classList.add("active")})}),e`
        <div>
            <div class="shape shape-left" ref="shape">${Xh}</div>
        </div>
    `);var Zh=`<?xml version="1.0" encoding="UTF-8"?>
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
`;var Qh=({html:e,onMount:t})=>(t(({refs:r})=>{let{shape:o}=r;c.useFrame(()=>{o.classList.add("active")})}),e`
        <div>
            <div class="shape shape-right" ref="shape">${Zh}</div>
        </div>
    `);var _b=k({name:"shape-right",component:Qh}),Ob=k({name:"shape-left",component:Kh});var je=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in window&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},ze=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},He=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},yt=e=>"roundRect"in e,ed=(e,t,r,o,s,n)=>{o<2*n&&(n=o/2),s<2*n&&(n=s/2),e.beginPath(),e.moveTo(t+n,r),e.arcTo(t+o,r,t+o,r+s,n),e.arcTo(t+o,r+s,t,r+s,n),e.arcTo(t,r+s,t,r,n),e.arcTo(t,r,t+o,r,n),e.closePath()},Zr=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n})=>[...new Array(t*r+t).keys()].reduce(i=>{let{row:a,col:l,items:p}=i,u=l<r?l+1:0,m=u===0?a+1:a,d=(o+n)*u,f=(s+n)*m;return{row:m,col:u,items:[...p,{width:o,height:s,x:d,y:f,centerX:d+o/2,centerY:f+s/2,offsetXCenter:pr({canvasWidth:e.width,width:o,gutter:n,numberOfColumn:r}),offsetYCenter:hr({canvasHeight:e.height,height:s,gutter:n,numberOfRow:t}),gutter:n,numberOfColumn:r}]}},{row:0,col:-1,items:[]}),pr=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2-t/2,hr=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2-t/2;var td=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n,fill:i,disableOffcanvas:a,stagger:l,reorder:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:a}),d=!0,f=[],T=[],g={},S={},x=e.getContext(m,{alpha:!1}),C="#000",_="#fff",{activeRoute:M}=N.get(),{offscreen:A,offScreenCtx:I}=ze({useOffscreen:u,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,f=Zr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n}).items,T=p?f.map((O,q)=>({...O,scale:1,rotate:0,hasFill:i.includes(q)})).sort(O=>O.hasFill?-1:1).reverse():f.map((O,q)=>{let Q=i.includes(q);return{...O,scale:1,rotate:0,hasFill:Q}}),g=Z.createTween({ease:"easeInOutQuad",stagger:l,data:{scale:1,rotate:0}}),T.forEach(O=>{g.subscribeCache(O,({scale:q,rotate:Q})=>{O.rotate=Q,O.scale=q})});let V=()=>{if(!x)return;u&&(A.width=e.width,A.height=e.height);let O=u?I:x;O.fillStyle="#1a1b26",O.fillRect(0,0,e.width,e.height),T.forEach(({x:q,y:Q,centerX:j,centerY:L,width:y,height:v,rotate:R,scale:P,hasFill:B,offsetXCenter:J,offsetYCenter:ee})=>{let Ie=Math.PI/180*R,ae=Math.cos(Ie)*P,de=Math.sin(Ie)*P;O.setTransform(ae,de,-de,ae,Math.round(j+J),Math.round(L+ee)),O.beginPath(),O.rect(Math.round(-j+q),Math.round(-L+Q),y,v),O.fillStyle=B?_:C,O.fill(),O.setTransform(1,0,0,1,0,0)}),He({useOffscreen:u,offscreen:A,ctx:x})};S=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).label({name:"label1"}).goTo(g,{scale:1.5,rotate:90},{duration:1e3}).goTo(g,{scale:.5},{duration:500}).goTo(g,{rotate:180,scale:1.2},{duration:500}).goTo(g,{scale:1.3},{duration:500}).goTo(g,{scale:1},{duration:1200}),S.onLoopEnd(({direction:O,loop:q})=>{console.log(`loop end: ${O}, ${q}`)}),S.play();let U=()=>{V(),d&&c.useNextFrame(()=>U())};c.useFrame(({time:O})=>{U({time:O})});let W=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T.forEach(O=>{let{width:q,height:Q,gutter:j,numberOfColumn:L}=O;O.offsetXCenter=pr({canvasWidth:e.width,width:q,gutter:j,numberOfColumn:L}),O.offsetYCenter=hr({canvasHeight:e.height,height:Q,gutter:j,numberOfRow:t})}),c.useFrame(()=>V())}),Y=$.watch("openNavigation",()=>{S?.stop(),d=!1}),D=$.watch("closeNavigation",()=>setTimeout(async()=>{d=!0;let{activeRoute:O}=N.get();O===M&&(S?.play(),c.useFrame(()=>U()))},500));return()=>{g.destroy(),S.destroy(),W(),D(),Y(),g=null,S=null,x=null,A=null,I=null,f=[],T=[],d=!1}};var rd=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(se.mq("max","desktop"))return;let{wrap:a,canvas:l}=i,p=td({canvas:l,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{p()}});let{animatedPatternN0:s}=ye(),{source:n}=s;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Nb=k({name:"animatedpattern-n0",component:rd,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(Re()||ne())}});var od=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n,fill:i,disableOffcanvas:a})=>{let{useOffscreen:l,context:p}=je({disableOffcanvas:a}),u=!0,m=[],d=[],f={},T={},g={},{top:S,left:x}=ie(e),C=e.getContext(p,{alpha:!1}),_="#000",M="#fff",{activeRoute:A}=N.get(),{offscreen:I,offScreenCtx:V}=ze({useOffscreen:l,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,m=Zr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n}).items,d=m.map((L,y)=>({...L,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(y)})).sort(L=>L.hasFill?-1:1),f=Z.createLerp({data:{mouseX:0,mouseY:0}}),d.forEach(L=>{f.subscribeCache(L,({mouseX:y,mouseY:v})=>{L.mouseX=y,L.mouseY=v})}),T=Z.createTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}}),d.forEach(L=>{T.subscribeCache(L,({scale:y})=>{L.scale=y})});let U=()=>{if(!C)return;l&&(I.width=e.width,I.height=e.height);let L=l?V:C;L.fillStyle="#1a1b26",L.fillRect(0,0,e.width,e.height),d.forEach(({x:y,y:v,centerX:R,centerY:P,width:B,height:J,mouseX:ee,mouseY:Ie,scale:ae,hasFill:de,offsetXCenter:Me,offsetYCenter:De})=>{let Le=ee-(e.width-(B+n)*r)/2,Ge=Ie-(e.height-(J+n)*t)/2,Je=(y-Le)/250,vt=(v-Ge)/250,St=Math.sqrt(Math.pow(Math.abs(Je),2)+Math.pow(Math.abs(vt),2)),Yt=Oe(Math.abs(St),0,2),eo=0,Ue=Math.cos(eo)*(Yt+ae),Lo=Math.sin(eo)*(Yt+ae);L.setTransform(Ue,Lo,-Lo,Ue,Math.round(R+Me),Math.round(P+De)),L.beginPath(),L.rect(Math.round(-R+y),Math.round(-P+v),B,J),L.fillStyle=de?M:_,L.fill(),L.setTransform(1,0,0,1,0,0)}),He({useOffscreen:l,offscreen:I,ctx:C})};g=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).goTo(T,{scale:.3},{duration:1e3}),g.play();let W=({x:L,y})=>{f.goTo({mouseX:L-x,mouseY:y-S})},Y=c.useMouseMove(({client:L})=>{let{x:y,y:v}=L;W({x:y,y:v})}),D=c.useTouchMove(({client:L})=>{let{x:y,y:v}=L;W({x:y,y:v})}),O=()=>{U(),u&&c.useNextFrame(()=>O())};c.useFrame(({time:L})=>{O({time:L})});let q=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,S=ie(e).top,x=ie(e).left,d.forEach(L=>{let{width:y,height:v,gutter:R,numberOfColumn:P}=L;L.offsetXCenter=pr({canvasWidth:e.width,width:y,gutter:R,numberOfColumn:P}),L.offsetYCenter=hr({canvasHeight:e.height,height:v,gutter:R,numberOfRow:t})}),c.useFrame(()=>U())}),Q=$.watch("openNavigation",()=>{g?.stop(),u=!1}),j=$.watch("closeNavigation",()=>setTimeout(async()=>{u=!0;let{activeRoute:L}=N.get();L===A&&(g?.play(),c.useFrame(()=>O()))},500));return()=>{T.destroy(),g.destroy(),f.destroy(),q(),Y(),D(),j(),Q(),T=null,g=null,f=null,C=null,I=null,V=null,m=[],d=[],u=!1}};var sd=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(se.mq("max","desktop"))return;let{wrap:a,canvas:l}=i,p=od({canvas:l,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{p()}});let{animatedPatternN1:s}=ye(),{source:n}=s;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Mb=k({name:"animatedpattern-n1",component:sd,isolateCreation:!0,isolateOnMount:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","disableOffcanvas"],state:{numberOfRow:7,numberOfColumn:15,cellWidth:70,cellHeight:70,gutter:10,fill:[21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,66],disableOffcanvas:!!(Re()||ne())}});function Lb({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function Fb({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var nd=({canvas:e,amountOfPath:t,width:r,height:o,fill:s,stroke:n,opacity:i,spacerY:a,intialRotation:l,perpetualRatio:p,mouseMoveRatio:u,disableOffcanvas:m})=>{let{useOffscreen:d,context:f}=je({disableOffcanvas:m}),T=!0,g=e.getContext(f,{alpha:!1}),S=[],x=[],C={},{left:_}=ie(e),{activeRoute:M}=N.get(),{offscreen:A,offScreenCtx:I}=ze({useOffscreen:d,canvas:e}),V=d?I:g,U=yt(V)&&!ne();V=null,e.width=e.clientWidth,e.height=e.clientHeight,S=[...new Array(t).keys()].map((y,v)=>{let R=v,P=R<t/2?t-R:R,B=P-(t-P);return{width:Math.floor(Lb({width:r,relativeIndex:B,amountOfPath:t})),height:Math.floor(Fb({height:o,relativeIndex:B,amountOfPath:t})),fill:s,stroke:n,opacity:B*i,rotate:0,y:0,relativeIndex:B,index:v}}),x=S.splice(0,S.length/2).concat(S.reverse()),C=Z.createSpring({data:{rotate:0,y:0},stagger:{each:5,from:"center"}}),[...x].forEach(y=>{C.subscribeCache(y,({rotate:v})=>{y.rotate=v})});let W=({time:y=0})=>{if(!g)return;d&&(A.width=e.width,A.height=e.height);let v=d?I:g,R=e.width/2,P=e.height/2;v.fillStyle="#1a1b26",v.fillRect(0,0,e.width,e.height),x.forEach(({width:B,height:J,opacity:ee,rotate:Ie,relativeIndex:ae,index:de})=>{let Me=Math.sin(y/1e3)*p*ae,De=de<t/2?Me+15*ae/2:-Me-15*ae/2,Le=de<t/2?-1:1,Ge=1,Je=Math.PI/180*(Ie-l),vt=Math.cos(Je)*Ge,St=Math.sin(Je)*Ge;v.setTransform(vt,St,-St,vt,R,P+J/2),U?(v.beginPath(),v.roundRect(-(B*Le)/2,-J/2+De+a(de<t/2),B,J,[200,0])):(v.beginPath(),v.rect(-(B*Le)/2,-J/2+De+a(de<t/2),B,J)),v.strokeStyle=`rgba(255, 255, 255, ${ee})`,v.fillStyle=`rgba(26, 27, 38, ${ee})`,v.stroke(),v.fill(),v.setTransform(1,0,0,1,0,0)}),He({useOffscreen:d,offscreen:A,ctx:g})},Y=({time:y=0})=>{W({time:y}),T&&c.useNextFrame(({time:v})=>Y({time:v}))};c.useFrame(({time:y})=>{Y({time:y})});let D=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,_=ie(e).left,c.useFrame(({time:y})=>{W({time:y})})}),O=({x:y})=>{let v=y-e.width/2-_;C.goTo({rotate:v/u})},q=c.useMouseMove(({client:y})=>{let{x:v}=y;O({x:v})}),Q=c.useTouchMove(({client:y})=>{let{x:v}=y;O({x:v})}),j=$.watch("openNavigation",()=>{T=!1}),L=$.watch("closeNavigation",()=>{setTimeout(()=>{T=!0;let{activeRoute:y}=N.get();y===M&&c.useFrame(({time:v})=>Y({time:v}))},500)});return()=>{C.destroy(),D(),q(),Q(),L(),j(),g=null,A=null,I=null,C=null,x=[],S=[],T=!1}};var id=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(se.mq("max","desktop"))return;let{wrap:l,canvas:p}=a,u=nd({canvas:p,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{u()}});let{caterpillarN0:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Db=k({name:"caterpillar-n0",component:id,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","fill","stroke","opacity","spacerY","intialRotation","perpetualRatio","mouseMoveRatio","disableOffcanvas"],state:{amountOfPath:17,width:Re()||ne()?30:40,height:Re()||ne()?30:40,radius:0,fill:"",stroke:"#fff",opacity:.05,spacerY:e=>e?300:-400,intialRotation:33,perpetualRatio:6,mouseMoveRatio:10,disableOffcanvas:!!(Re()||ne())}});var ad=({canvas:e,numItems:t,width:r,height:o,fill:s,opacity:n,radius:i,rotationDuration:a,rotationEach:l,centerEach:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:d}=je({disableOffcanvas:u}),f=!0,T=e.getContext(d,{alpha:!1}),g=[],S={},x={},C={},{top:_,left:M}=ie(e),{activeRoute:A}=N.get(),{offscreen:I,offScreenCtx:V}=ze({useOffscreen:m,canvas:e}),U=m?V:T,W=yt(U)&&!ne();U=null,e.width=e.clientWidth,e.height=e.clientHeight,g=[...new Array(t).keys()].map((v,R)=>{let P=R>=t/2?t/2+(t/2-R):R,B=s.includes(R)?1:P*n;return{width:P*r,height:P*o,x:0,y:0,hasFill:s.includes(R),opacity:B,radius:i,rotate:0,relativeIndex:P}}),S=Z.createTween({data:{rotate:0},stagger:{each:l,from:"center"},ease:"easeLinear",relative:!0}),[...g].forEach(v=>{S.subscribeCache(v,({rotate:R})=>{v.rotate=R})}),x=Z.createSpring({data:{x:0,y:0},stagger:{each:p,from:"end"}}),[...g].forEach(v=>{x.subscribeCache(v,({x:R,y:P})=>{v.x=R,v.y=P})});let Y=()=>{if(!T)return;m&&(I.width=e.width,I.height=e.height);let v=m?V:T;v.fillStyle="#1a1b26",v.fillRect(0,0,e.width,e.height),g.forEach(({width:R,height:P,x:B,y:J,opacity:ee,rotate:Ie,hasFill:ae},de)=>{let Me=g.length-de,De=e.width/2,Le=e.height/2,Ge=1,Je=Math.PI/180*Ie,vt=Math.cos(Je)*Ge,St=Math.sin(Je)*Ge;v.setTransform(vt,St,-St,vt,De+B+Me*B/20,Le+J+Me*J/20),W?(v.beginPath(),v.roundRect(Number.parseInt(-R/2),Number.parseInt(-P/2),R,P,[200,0])):(v.beginPath(),v.rect(Number.parseInt(-R/2),Number.parseInt(-P/2),R,P)),ae?v.fillStyle="rgba(255, 255, 255, 1)":(v.fillStyle=`rgba(26, 27, 38, ${ee})`,v.strokeStyle=`rgba(255, 255, 255, ${ee})`,v.stroke()),v.fill(),v.setTransform(1,0,0,1,0,0)}),He({useOffscreen:m,offscreen:I,ctx:T})};C=Ne.createAsyncTimeline({repeat:-1,yoyo:!1}),C.goTo(S,{rotate:360},{duration:a}),C.play();let D=()=>{Y(),f&&c.useNextFrame(()=>D())};c.useFrame(()=>D());let O=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,_=ie(e).top,M=ie(e).left,Y()}),q=({x:v,y:R})=>{let P=window.innerWidth,B=window.innerHeight,J=v-e.width/2-M,ee=R-e.height/2-_;x.goTo({x:Oe(J,-P/2+400+M,P/2-400-M),y:Oe(ee,-B/2+200+_,B/2-200-_)})},Q=c.useMouseMove(({client:v})=>{let{x:R,y:P}=v;q({x:R,y:P})}),j=c.useTouchMove(({client:v})=>{let{x:R,y:P}=v;q({x:R,y:P})}),L=$.watch("openNavigation",()=>{f=!1,C?.pause()}),y=$.watch("closeNavigation",()=>setTimeout(()=>{f=!0;let{activeRoute:v}=N.get();v===A&&(C?.resume(),c.useFrame(()=>D()))},500));return()=>{S.destroy(),x.destroy(),C.destroy(),O(),Q(),j(),L(),y(),S=null,x=null,C=null,T=null,I=null,V=null,g=[],f=!1}};var ld=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(se.mq("max","desktop"))return;let{wrap:l,canvas:p}=a,u=ad({canvas:p,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{u()}});let{caterpillarN1:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Vb=k({name:"caterpillar-n1",component:ld,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","fill","opacity","radius","rotationEach","centerEach","rotationDuration","disableOffcanvas"],state:{numItems:20,width:40,height:40,fill:[14],opacity:.05,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:!!(Re()||ne())}});var Ei=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},cd=({canvas:e,numItems:t,width:r,height:o,radius:s,fill:n,opacity:i,xAmplitude:a,yAmplitude:l,duration:p,friction:u,rotationDefault:m,disableOffcanvas:d})=>{let{useOffscreen:f,context:T}=je({disableOffcanvas:d}),g=!0,S=e.getContext(T,{alpha:!1}),x=[],C=m,{activeRoute:_}=N.get(),{offscreen:M,offScreenCtx:A}=ze({useOffscreen:f,canvas:e}),I=f?A:S,V=yt(I)&&!ne();I=null,x=[...new Array(t).keys()].map((j,L)=>{let y=L>=t/2?t/2+(t/2-L):L,v=r+r/3*y,R=o+o/3*y,P=n.includes(L)?1:(t-L)*i;return{width:v,height:R,x:0,y:0,hasFill:n.includes(L),opacity:P,radius:s,rotate:0}}),e.width=e.clientWidth,e.height=e.clientHeight;let U=Z.createSequencer({stagger:{each:6},data:{x:p/4,rotate:0},duration:p}).goTo({x:p+p/4},{start:0,end:p,ease:"easeLinear"}).goTo({rotate:()=>-C},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:p,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:j,direction:L})=>{Ei({isForced:j,direction:L,value:1})},1).add(({isForced:j,direction:L})=>{Ei({isForced:j,direction:L,value:5})},5).add(({isForced:j,direction:L})=>{Ei({isForced:j,direction:L,value:9})},9);x.forEach(j=>{U.subscribeCache(j,({x:L,rotate:y})=>{let v=L/u,R=2/(3-Math.cos(2*v)),P=R*Math.cos(v)*a,B=R*Math.sin(2*v)/2*l;j.x=P,j.y=B,j.rotate=y})});let W=Ne.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(U);W.onLoopEnd(({loop:j,direction:L})=>{console.log(`loop end: ${j} , ${L}`)});let Y=()=>{if(!S)return;f&&(M.width=e.width,M.height=e.height);let j=f?A:S;j.fillStyle="#1a1b26",j.fillRect(0,0,e.width,e.height),x.forEach(({width:L,height:y,x:v,y:R,radius:P,rotate:B,hasFill:J,opacity:ee})=>{let Ie=e.width/2,ae=e.height/2,de=1,Me=Math.PI/180*B,De=Math.cos(Me)*de,Le=Math.sin(Me)*de;j.setTransform(De,Le,-Le,De,Ie+v,ae+R),V?(j.beginPath(),j.roundRect(Number.parseInt(-L/2),Number.parseInt(-y/2),L,y,[150,0])):(j.beginPath(),j.rect(Number.parseInt(-L/2),Number.parseInt(-y/2),L,y,P)),J?j.fillStyle="rgba(255, 255, 255, 1)":(j.fillStyle=`rgba(26, 27, 38, ${ee})`,j.strokeStyle=`rgba(255, 255, 255, ${ee})`,j.stroke()),j.fill(),j.setTransform(1,0,0,1,0,0)}),He({useOffscreen:f,offscreen:M,ctx:S})},D=()=>{Y(),g&&c.useNextFrame(()=>D())};c.useFrame(()=>D()),W.play();let O=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,Y()}),q=$.watch("openNavigation",()=>{g=!1,W?.pause()}),Q=$.watch("closeNavigation",()=>setTimeout(()=>{g=!0;let{activeRoute:j}=N.get();j===_&&(W?.resume(),c.useFrame(()=>D()))},500));return{destroy:()=>{g=!1,O(),q(),Q(),U.destroy(),W.destroy(),S=null,M=null,A=null,x=[]},play:()=>{W.stop(),W.play()},playReverse:()=>{W.stop(),W.playReverse()},playUseCurrent:()=>W.play({useCurrent:!0}),playReverseUseCurrent:()=>W.playReverse({useCurrent:!0}),playFromLabel:()=>{W.stop(),W.playFrom("mylabel")},plaFromLabelReverse:()=>{W.stop(),W.playFromReverse("mylabel")},stop:()=>W.stop(),pause:()=>W.pause(),resume:()=>W.resume(),reverse:()=>W.reverse(),setRotation:j=>C=j}};function $b({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return b` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var ud=({onMount:e,html:t,getState:r,staticProps:o})=>{let{buttons:s,rotationDefault:n}=r();e(({element:p,refs:u})=>{if(se.mq("max","desktop"))return;let{wrap:m,canvas:d,rangeValue:f,rotationButton:T}=u,g=cd({canvas:d,...r()}),{destroy:S,setRotation:x}=g;return Object.entries(s).forEach(([C,_])=>{let{method:M}=_;p.querySelector(`.${C}`).addEventListener("click",()=>g?.[M]())}),T.addEventListener("change",()=>{let C=T.value;x(C),f.textContent=C}),c.useFrame(()=>{m.classList.add("active")}),()=>{S()}});let{caterpillarN2:i}=ye(),{source:a}=i,l=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:a.description},{label:"definition",source:a.definition},{label:"component",source:a.component},{label:"animation",source:a.animation}],style:"legend",color:"green"})}
            >
            </code-button>
            <div class="c-canvas">
                <ul class="c-canvas__controls">
                    ${$b({buttons:s})}
                    <li class="c-canvas__controls__item">
                        <label class="c-canvas__controls__label">
                            change rotation:
                            <span class="js-range-value" ref="rangeValue"
                                >${n}</span
                            >
                        </label>
                        <div class="c-canvas__controls__range">
                            <input
                                type="range"
                                min="0"
                                max="720"
                                value="${n}"
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
    `};var Wb=10,Bb={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},jb=k({name:"caterpillar-n2",component:ud,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","radius","fill","opacity","xAmplitude","yAmplitude","duration","rotationDefault","friction","disableOffcanvas"],state:{numItems:Re()||ne()?20:30,width:80,height:80,radius:0,fill:[2],opacity:.02,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:360,friction:Wb/2/Math.PI,disableOffcanvas:!!(Re()||ne()),buttons:()=>({value:Bb,type:"Any"})}});var pd=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`;var hd=({logoRefs:e,around:t})=>{let r=e.map(p=>{let[u,m]=Object.entries(p)[0];return{key:u,item:m}}),o=Z.createTween({data:{opacity:0,scale:.5,x:-10},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),s=Z.createTween({data:{scale:1,x:0},duration:4e3,ease:"easeInOutQuad",stagger:{each:40,from:"end"}}),n=Z.createTween({data:{scale:.5,opacity:0},duration:1e3,ease:"easeInOutQuad",stagger:{each:4}}),i=Z.createTween({data:{scale:1},duration:4e3,ease:"easeInOutQuad",stagger:{each:20}});r.forEach(({key:p,item:u})=>{s.subscribe(({scale:m,x:d})=>{if(u.style.scale=`${m}`,p!=="M_right"&&p!=="M_left")return;let f=p==="M_right"?-d:d;u.style.translate=`${f}px 0px`})}),r.forEach(({key:p,item:u})=>{o.subscribe(({scale:m,x:d,opacity:f})=>{if(u.style.scale=`${m}`,u.style.opacity=f,p!=="M_right"&&p!=="M_left")return;let T=p==="M_right"?-d:d;u.style.translate=`${T}px 0px`})}),t.forEach(p=>{n.subscribe(({scale:u,opacity:m})=>{p.style.scale=`${u}`,p.style.opacity=m})}),t.forEach(p=>{i.subscribe(({scale:u})=>{p.style.scale=`${u}`})});let a=Ne.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(o,{opacity:1,scale:1,x:0}).goTo(n,{opacity:1,scale:1}).closeGroup(),l=Ne.createAsyncTimeline({repeat:-1,yoyo:!0}).createGroup({waitComplete:!1}).goTo(s,{scale:.95,x:.5}).goTo(i,{scale:.95}).closeGroup().createGroup({waitComplete:!1}).goTo(s,{scale:1.05,x:-.5}).goTo(i,{scale:1.05}).closeGroup();return{playIntro:async()=>a.play(),playSvg:()=>l.play(),destroySvg:()=>{l.stop(),s.destroy(),l.destroy(),a.destroy(),n.destroy(),s=null,o=null,i=null,n=null,l=null,a=null}}};var dd=({refs:e})=>{let t=Z.createTween({data:{y:100},duration:500,ease:"easeOutCubic",stagger:{each:10}});return e.forEach(r=>{t.subscribe(({y:o})=>{r.style.translate=`0px ${o}%`})}),{playText:()=>t.goTo({y:0}),destroyText:()=>{t.destroy(),t=null}}};var Ub=async({playText:e,playIntro:t,playSvg:r})=>{e(),await t(),r()},md=({html:e,onMount:t,staticProps:r})=>{t(({element:n,refs:i})=>{let{textStagger:a,block1:l,block2:p,block3:u,block4:m,block5:d,block6:f,block7:T,block8:g,M_left:S,M_right:x,around:C}=i,{playIntro:_,playSvg:M,destroySvg:A}=hd({element:n,logoRefs:[{block1:l},{block2:p},{block3:u},{block4:m},{block5:d},{block6:f},{block7:T},{block8:g},{M_left:S},{M_right:x}],around:C}),{playText:I,destroyText:V}=dd({refs:a});return Ub({playText:I,playIntro:_,playSvg:M}),()=>{A(),V()}});let{home:o}=ye(),{source:s}=o;return e`<div>
        <code-button
            ${r({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"Logo animation",source:s.logoAnimation},{label:"text animation",source:s.textAnimation}],style:"legend"})}
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
        <div class="l-index__logo">${pd}</div>
        <div class="l-index__top-right">${ki}</div>
    </div>`};var qb=k({name:"home-component",component:md});var Ri=0,Gb=({indicators:e,setState:t})=>[...e].map((r,o)=>Gt.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,range:"0.1px",animatePin:!0,dynamicStart:{position:"right",value:()=>window.innerWidth+Ri-ot(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let s=e.length-(o-2);return window.innerWidth/10*9*s}},onEnter:()=>{t("currentId",-1),t("currentIdFromScroll",o)},onLeaveBack:()=>{t("currentIdFromScroll",o-1)}})),Jb=({pins:e})=>{e.forEach(t=>t.refresh())},Yb=({titles:e})=>[...e].map(t=>Gt.createParallax({item:t,propierties:"x",reverse:!0,range:9})),fd=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},gd=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},bd=({indicators:e,titles:t,nav:r,animatePin:o,setState:s})=>{let n=Gb({indicators:e,setState:s}),i=Yb({titles:t}),a=document.querySelector(".l-navcontainer__side");Ri=ot(a)/2;let l=c.useResize(()=>{Ri=ot(a)/2}),p=new ko({root:".js-root",container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,animateAtStart:!1,ease:!0,addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",pin:o,animatePin:o,breakpoint:"tablet",children:[...n,...i],onEnter:()=>{fd({nav:r,indicators:e})},onEnterBack:()=>{Jb({pins:n}),fd({nav:r,indicators:e})},onLeave:()=>{gd({nav:r,indicators:e})},onLeaveBack:()=>{gd({nav:r,indicators:e})}});return p.init(),{destroy:()=>{n.forEach(u=>{u?.destroy()}),n=[],i.forEach(u=>{u?.destroy()}),i=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Xb=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...new Array(e).keys()].map((s,n)=>b`
                <horizontal-scroller-section
                    ${r({id:n,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Kb=({numOfCol:e,setState:t,bindProps:r,staticProps:o,delegateEvents:s})=>[...new Array(e).keys()].map((n,i)=>b`
                <horizontal-scroller-button
                    ${o({id:i})}
                    ${s({click:()=>t("currentId",i)})}
                    ${r({bind:["currentId","currentIdFromScroll"],props:({currentId:a,currentIdFromScroll:l})=>({active:a===i||l===i})})}
                ></horizontal-scroller-button>
            `).join(""),yd=({onMount:e,html:t,getState:r,setState:o,watch:s,staticProps:n,bindProps:i,delegateEvents:a})=>{let{animatePin:l}=r();e(({element:m})=>{if(se.mq("max","desktop"))return;let d=m.querySelectorAll(".js-indicator"),f=m.querySelector(".js-nav"),T=m.querySelectorAll(".js-title h1"),{destroy:g}=bd({indicators:d,titles:T,nav:f,...r(),setState:o});return window.scrollTo(0,0),s("currentId",S=>{if(S===-1)return;let x=m.querySelector(`.shadowClass--section-${S} .shadowClass--in-center`),{top:C}=ie(x),_=Se(x),M=Number.parseInt(S)===0?window.innerHeight+1:C+_-window.innerHeight;At.to(M,{duration:2e3})}),()=>{g()}});let{horizontalScroller:p}=ye(),{source:u}=p;return se.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <code-button
            ${n({drawers:[{label:"description",source:u.description},{label:"definition",source:u.definition},{label:"scroller",source:u.scroller},{label:"section",source:u.section},{label:"buttons",source:u.buttons},{label:"animation",source:u.animation}],style:"legend",color:"green"})}
        >
        </code-button>
        <ul class="l-h-scroller__nav js-nav">
            ${Kb({numOfCol:10,setState:o,bindProps:i,staticProps:n,delegateEvents:a})}
        </ul>
        <div class="l-h-scroller__root js-root">
            <div class="l-h-scroller__container js-container">
                <div class="l-h-scroller__row js-row">
                    ${Xb({numOfCol:10,pinIsVisible:!l,staticProps:n})}
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
    </div>`};var Zb=k({name:"horizontal-scroller",component:yd,isolateOnMount:!0,isolateCreation:!0,exportState:["currentId","currentIdFromScroll","animatePin"],state:{currentId:()=>({value:0,type:Number}),currentIdFromScroll:()=>({value:0,type:Number}),animatePin:()=>({value:!1,type:Boolean})}});var vd=({getState:e,watch:t,html:r,onMount:o})=>{let{id:s}=e();return o(({element:n})=>{let i=n.querySelector(".js-nav-button");return t("active",a=>{i.classList.toggle("active",a)}),()=>{}}),r`
        <li>
            <button
                type="button"
                data-id="${s}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${s}
            </button>
        </li>
    `};var Qb=k({name:"horizontal-scroller-button",component:vd,exportState:["id","active"],state:{id:()=>({value:-1,type:Number}),active:()=>({value:!1,type:Boolean})}});var Sd=({html:e,getState:t})=>{let{id:r,pinClass:o}=t();return e`
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
    `};var e0=k({name:"horizontal-scroller-section",component:Sd,exportState:["id","pinClass"],state:{id:()=>({id:-1,type:Number}),pinClass:()=>({id:"",type:String})}});var Ks=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg width="50.51" height="51.18" version="1.1" viewBox="0 0 13.364 13.541" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(-6.0855 -4.2559)">
  <path d="m7.5846 9.2554h10.366l-5.1892 7.0421z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>
  <path d="m7.584 7.7559a1.5002 1.5002 0 0 0-1.207 2.3887l5.1758 7.041a1.5002 1.5002 0 0 0 2.416 2e-3l5.1895-7.043a1.5002 1.5002 0 0 0-1.207-2.3887zm2.9648 3h4.4316l-2.2188 3.0117z" color="#000000" style="-inkscape-stroke:none"/>
  <path d="m10.712 5.7557h4.1113v4.4858h-4.1113z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>
  <path d="m10.711 4.2559a1.5002 1.5002 0 0 0-1.5 1.5v4.4863a1.5002 1.5002 0 0 0 1.5 1.5h4.1113a1.5002 1.5002 0 0 0 1.5-1.5v-4.4863a1.5002 1.5002 0 0 0-1.5-1.5zm1.5 3h1.1113v1.4863h-1.1113z" color="#000000" style="-inkscape-stroke:none"/>
 </g>
</svg>
`;var wd=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:s,cellHeight:n,gutter:i,fill:a,stagger:l,reorder:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:d}=je({disableOffcanvas:u}),f=!0,T=[],g=[],S=Z.createMasterSequencer(),x=e.getContext(d,{alpha:!1}),C="#000",_="#fff",{activeRoute:M}=N.get(),{offscreen:A,offScreenCtx:I}=ze({useOffscreen:m,canvas:e}),V=m?I:x,U=yt(V);V=null,e.width=e.clientWidth,e.height=e.clientHeight,T=Zr({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:s,cellHeight:n,gutter:i}).items,g=p?T.map((y,v)=>({...y,scale:0,rotate:0,hasFill:a.includes(v)})).sort(y=>y.hasFill?-1:1):T.map((y,v)=>({...y,scale:0,rotate:0,hasFill:a.includes(v)}));let W=Z.createStaggers({items:g,stagger:l}),Y=W.map(({item:y,start:v,end:R})=>{let P=y.hasFill?1.1:1,B=Z.createSequencer({data:{scale:0}}).goTo({scale:P},{start:v,end:R,ease:"easeOutBack"}),J=B.subscribe(({scale:ee})=>{y.scale=ee});return S.add(B),{sequencer:B,unsubscribe:J}}),D=()=>{if(!x)return;m&&(A.width=e.width,A.height=e.height);let y=m?I:x;y.fillStyle="#1a1b26",y.fillRect(0,0,e.width,e.height),g.forEach(({x:v,y:R,centerX:P,centerY:B,width:J,height:ee,rotate:Ie,scale:ae,hasFill:de,offsetXCenter:Me,offsetYCenter:De})=>{let Le=Math.PI/180*Ie,Ge=Math.cos(Le)*ae,Je=Math.sin(Le)*ae;y.setTransform(Ge,Je,-Je,Ge,Math.round(P+Me),Math.round(B+De)),ed(y,Math.round(-P+v),Math.round(-B+R),J,ee,5),U?(y.beginPath(),y.roundRect(Math.round(-P+v),Math.round(-B+R),J,ee,5)):(y.beginPath(),y.rect(Math.round(-P+v),Math.round(-B+R),J,ee)),y.fillStyle=de?_:C,y.fill(),y.setTransform(1,0,0,1,0,0)}),He({useOffscreen:m,offscreen:A,ctx:x})},O=Gt.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>Se(t)},ease:!0,easeType:"lerp"});O.init();let q=()=>{D(),f&&c.useNextFrame(()=>q())};c.useFrame(({time:y})=>{q({time:y})});let Q=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,g.forEach(y=>{let{width:v,height:R,gutter:P,numberOfColumn:B}=y;y.offsetXCenter=pr({canvasWidth:e.width,width:v,gutter:P,numberOfColumn:B}),y.offsetYCenter=hr({canvasHeight:e.height,height:R,gutter:P,numberOfRow:r})}),c.useFrame(()=>D())}),j=$.watch("openNavigation",()=>{f=!1}),L=$.watch("closeNavigation",()=>setTimeout(async()=>{f=!0;let{activeRoute:y}=N.get();y===M&&c.useFrame(()=>q())},500));return()=>{Q(),L(),j(),Y.forEach(({sequencer:y,unsubscribe:v})=>{y.destroy(),v()}),Y=[],S.destroy(),S=null,W=[],O.destroy(),O=null,x=null,A=null,I=null,T=[],g=[],f=!1}};var Td=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(se.mq("max","desktop"))return;let{wrap:a,canvas:l,canvasScroller:p}=i;window.scrollTo(0,0);let u=wd({canvas:l,canvasScroller:p,...r()});return c.useFrame(()=>{a.classList.add("active")}),()=>{u()}});let{scrollerN0:s}=ye(),{source:n}=s;return se.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
                >
                </code-button>
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
                ${Ks}
            </div>
        </div>
    `};var r0=k({name:"scroller-n0",component:Td,isolateOnMount:!0,isolateCreation:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(Re()||ne())}});function o0({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function s0({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var xd=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:s,radius:n,opacity:i,intialRotation:a,endRotation:l,disableOffcanvas:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:p}),d=!0,f=e.getContext(m,{alpha:!1}),T=[],{activeRoute:g}=N.get(),{offscreen:S,offScreenCtx:x}=ze({useOffscreen:u,canvas:e}),C=u?x:f,_=yt(C)&&!ne();C=null,e.width=e.clientWidth,e.height=e.clientHeight,T=[...new Array(r).keys()].map((D,O)=>{let q=O>=r/2?r/2+(r/2-O):O;return{width:Math.floor(o0({width:o,relativeIndex:q,amountOfPath:r})),height:Math.floor(s0({height:s,relativeIndex:q,amountOfPath:r})),opacity:q*i,rotate:0,relativeIndex:q,index:O}});let M=Z.createScrollerTween({from:{rotate:0},to:{rotate:l},stagger:{each:5,from:"center"}});[...T].forEach(D=>{M.subscribeCache(D,({rotate:O})=>{D.rotate=O})});let A=()=>{if(!f)return;u&&(S.width=e.width,S.height=e.height);let D=u?x:f,O=e.width/2,q=e.height/2;D.fillStyle="#1a1b26",D.fillRect(0,0,e.width,e.height),T.forEach(({width:Q,height:j,opacity:L,rotate:y,index:v})=>{let R=T.length/2-v,P=1,B=Math.PI/180*(y-a),J=Math.cos(B)*P,ee=Math.sin(B)*P;D.setTransform(J,ee,-ee,J,O,q+R*19),_?(D.beginPath(),D.roundRect(-Q/2,-j/2+R*19,Q,j,150)):(D.beginPath(),D.rect(Number.parseInt(-Q/2),Number.parseInt(-j/2),Q,j,n)),D.strokeStyle=`rgba(255, 255, 255, ${L})`,D.fillStyle=`rgba(26, 27, 38, ${L})`,D.stroke(),D.fill(),D.setTransform(1,0,0,1,0,0)}),He({useOffscreen:u,offscreen:S,ctx:f})},I=Gt.createScrollTrigger({trigger:t,propierties:"tween",tween:M,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>Se(t)},ease:!0,easeType:"spring"});I.init();let V=({time:D=0})=>{A({time:D}),d&&c.useNextFrame(({time:O})=>V({time:O}))};c.useFrame(({time:D})=>{V({time:D})});let U=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,c.useFrame(()=>{A()})}),W=$.watch("openNavigation",()=>{d=!1}),Y=$.watch("closeNavigation",()=>{setTimeout(()=>{d=!0;let{activeRoute:D}=N.get();D===g&&c.useFrame(({time:O})=>V({time:O}))},500)});return()=>{M.destroy(),U(),Y(),W(),M.destroy(),M=null,I.destroy(),I=null,f=null,S=null,x=null,M=null,T=[],d=!1}};var Cd=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(se.mq("max","desktop"))return;let{wrap:l,canvas:p,canvasScroller:u}=a,m=xd({canvas:p,canvasScroller:u,...r()});return c.useFrame(()=>{l.classList.add("active")}),()=>{m()}});let{scrollerN1:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return se.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend",color:"green"})}
                >
                </code-button>
                <div class="c-canvas__wrap ${i}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
                ${Ks}
            </div>
        </div>
    `};var n0=k({name:"caterpillar-n3",component:Cd,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","opacity","intialRotation","endRotation","disableOffcanvas"],state:{amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:!!(Re()||ne())}});var Zs=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],Id=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],Ed=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],kd=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}];var i0=[{buttonLabel:"sample1",data:Id},{buttonLabel:"salmple2",data:Ed},{buttonLabel:"sample3",data:kd},{buttonLabel:"Initial",data:Zs}],a0=[{label:"dynamic list with key",key:"key",clean:!1},{label:"dynamic list without key",key:"",clean:!1},{label:"dynamic list clear",key:"",clean:!0}];function l0({setState:e,staticProps:t,delegateEvents:r,bindProps:o}){return i0.map((s,n)=>{let{data:i,buttonLabel:a}=s;return b`
                <dynamic-list-button
                    ${t({label:a})}
                    ${r({click:()=>{e("data",i),e("activeSample",n)}})}
                    ${o({bind:["activeSample"],props:({activeSample:l})=>({active:n===l})})}
                ></dynamic-list-button>
            `}).join("")}function c0({bindProps:e,staticProps:t}){return a0.map((r,o)=>{let{key:s,clean:n,label:i}=r;return b`
                <dynamic-list-repeater
                    ${t({listId:o,key:s,clean:n,label:i})}
                    ${e({bind:["data","counter"],props:({data:a,counter:l})=>({data:a,counter:l})})}
                ></dynamic-list-repeater>
            `}).join("")}var Rd=async({setState:e,html:t,onMount:r,staticProps:o,bindProps:s,delegateEvents:n,watchSync:i})=>{r(({refs:p})=>{let{counterEl:u}=p;i("counter",m=>{u.textContent=m})});let{repeater:a}=ye(),{source:l}=a;return t`
        <div class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    ${l0({setState:e,delegateEvents:n,staticProps:o,bindProps:s})}
                    <dynamic-list-button
                        ${o({label:"increase counter"})}
                        ${n({click:()=>{e("counter",p=>p+=1)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span ref="counterEl"></span>
            </div>

            <div class="dynamic-list__container">
                <div class="dynamic-list__grid">
                    ${c0({bindProps:s,staticProps:o})}
                </div>
            </div>

            <code-button
                ${o({drawers:[{label:"description",source:l.description},{label:"definition",source:l.definition},{label:"main",source:l.mainComponent},{label:"repeater",source:l.repeaters},{label:"buttons",source:l.buttons},{label:"cards",source:l.cards},{label:"data",source:l.data}],style:"legend"})}
            >
            </code-button>
        </div>
    `};var u0=k({name:"dynamic-list",component:Rd,state:{counter:()=>({value:0,type:Number}),data:()=>({value:Zs,type:Array}),activeSample:()=>({value:3,type:Number})}});function Qr(e,t){return`${e}: ${t}`}var Pd=async({getState:e,html:t,onMount:r,key:o,staticProps:s,bindProps:n,watch:i,id:a})=>{let{isFull:l,parentListId:p,index:u,label:m,counter:d}=e();return r(({element:T,refs:g})=>{let{indexEl:S,labelEl:x,counterEl:C}=g;T.addEventListener("click",()=>{T.classList.toggle("is-selected")}),i("index",_=>{S.textContent=Qr("index",_)}),i("label",_=>{x.textContent=Qr("label",_)}),i("counter",_=>{C.textContent=Qr("counter",_)}),c.useFrame(()=>{T.classList.add("active")})}),t`
        <div class="dynamic-card ${l?"is-full":""}">
            <div class="dynamic-card__container">
                <p class="dynamic-card__title">card content</p>
                <div class="id">id: ${a}</div>
                <div class="parentId">list index: ${p}</div>
                <div class="index" ref="indexEl">
                    ${Qr("index",u)}
                </div>
                <div class="label" ref="labelEl">
                    ${Qr("label",m)}
                </div>
                <div class="counter" ref="counterEl">
                    ${Qr("counter",d)}
                </div>
                <div class="key">key: ${o.length>0?o:"no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <mobjs-slot
                    name="card-slot"
                    ${s({staticFromSlot:"static prop from card"})}
                    ${n({bind:["counter","label","index"],props:()=>({parentState:`${JSON.stringify(e(),null,4)}`})})}
                ></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${s({parentListId:p})}
                        ${n({bind:["counter"],props:({counter:T})=>({counter:T})})}
                    />
                </dynamic-list-empty>
            </div>
        </div>
    `};var p0=k({name:"dynamic-list-card",component:Pd,exportState:["isFull","label","index","counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});function Ad(e){return b`<pre>${e}</pre>`}var _d=({getState:e,html:t,onMount:r,watchSync:o})=>{let{staticFromSlot:s,staticFromComponent:n}=e();return r(({refs:i})=>{let{tEl:a,t2El:l}=i;o("parentParentState",p=>{a.textContent="",a.insertAdjacentHTML("afterbegin",Ad(p))}),o("parentState",p=>{l.textContent="",l.insertAdjacentHTML("afterbegin",Ad(p))})}),t`
        <div class="dynamic-slot">
            <h3 class="dynamic-slot__label">Component inside slot</h3>
            <div>${s}</div>
            <div>${n}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div ref="tEl"></div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div ref="t2El"></div>
        </div>
    `};var h0=k({name:"dynamic-list-slot",component:_d,exportState:["staticFromSlot","staticFromComponent","parentParentState","parentState"],state:{staticFromSlot:()=>({value:"",type:"any"}),staticFromComponent:()=>({value:"",type:"any"}),parentParentState:()=>({value:"",type:"any"}),parentState:()=>({value:"",type:"any"})}});var Od=async({html:e})=>e`<div class="dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var d0=k({name:"dynamic-list-empty",component:Od});var Nd=async({watch:e,onMount:t,html:r,getState:o})=>{let{parentListId:s,counter:n}=o();return t(({refs:i})=>{let{counterValueEl:a}=i;e("counter",l=>{a.textContent=l})}),r`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__subtitle">(slotted)</p>
        <p class="dynamic-counter__list">list index: ${s}</p>
        <span ref="counterValueEl">${n}</span>
    </div>`};var m0=k({name:"dynamic-list-counter",component:Nd,exportState:["counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var Md=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:s}=t();return r(({element:n})=>{o("active",i=>{n.classList.toggle("active",i)})}),e`
        <button type="button" class="dynamic-list-button">${s}</button>
    `};var f0=k({name:"dynamic-list-button",component:Md,exportState:["active","label"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});function g0({sync:e,staticProps:t,bindProps:r,listId:o,delegateEvents:s}){return b`
        <dynamic-list-card
            ${t({parentListId:o})}
            ${r({bind:["counter","data"],props:({counter:n,_current:i,_index:a})=>({counter:n,label:i.label,index:a})})}
            ${s({mousedown:(n,{current:i,index:a})=>console.log(i,a)})}
            ${e}
        >
            <dynamic-slotted-label
                slot="card-label-slot"
                ${r({bind:["label"],forceParent:!0,props:({label:n})=>({label:n})})}
            >
            </dynamic-slotted-label>
        </dynamic-list-card>
    `}function b0(e){return`<strong>Current cards id:</strong> ${e.join(",").replaceAll(","," | ")}`}function y0({element:e,className:t,childrenId:r}){let o=e.querySelector(t);o.textContent="",o.insertAdjacentHTML("afterbegin",b0(r))}var Ld=({getState:e,html:t,repeat:r,staticProps:o,bindProps:s,delegateEvents:n})=>{let{listId:i,key:a,clean:l,label:p}=e(),u=a.length>0?a:null;return t`
        <div class="dynamic-list-repeater">
            <h4 class="dynamic-list-repeater__title">${p}</h4>
            <p class="dynamic-list-repeater__new js-list"></p>
            <div class="dynamic-list-repeater__list">
                ${r({watch:"data",clean:l,key:u,afterUpdate:({childrenId:m,element:d})=>{y0({className:".js-list",childrenId:m,element:d})},render:({sync:m})=>g0({sync:m,staticProps:o,bindProps:s,delegateEvents:n,listId:i})})}
            </div>
        </div>
    `};var v0=k({name:"dynamic-list-repeater",component:Ld,exportState:["label","clean","data","listId","key","listId","counter"],state:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})}});function Fd(e){return`slotted: ${e}`}var Dd=async({html:e,onMount:t,watch:r,getState:o})=>{let{label:s}=o();return t(({refs:n})=>{let{contentEl:i}=n;r("label",a=>{i.textContent=Fd(a)})}),e`<div class="dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${Fd(s)}</p>
    </div>`};var S0=k({name:"dynamic-slotted-label",component:Dd,exportState:["label"],state:{label:()=>({value:void 0,type:"Any"})}});var Vd=({groups:e,trails:t,boxWidth:r,boxHeight:o,svg:s})=>{let n=window.innerWidth,i=window.innerHeight,a=s.clientWidth,l=s.clientHeight,p=0,u=0,m=0,d=0,f=t.map(M=>M.querySelector("path")),T=Z.createSpring({data:{x:0,y:0},stagger:{each:2,from:"start"}});t.forEach(M=>{T.subscribe(({x:A,y:I})=>{M.style.transform=`translate(${A}px, ${I}px)`})});let g=Z.createSpring({data:{rotation:0},stagger:{each:5,from:"start"}});f.forEach(M=>{g.subscribeCache(M,({rotation:A})=>{M.style.rotate=`${A}deg`})});let S=c.useResize(()=>{n=window.innerWidth,i=window.innerHeight,a=s.clientWidth,l=s.clientHeight}),x=c.useMouseMove(({client:M})=>{let{x:A,y:I}=M,W=(A*r/n-r/2)*n/a,O=(I*o/i-o/2)*i/l,q=180/Math.PI,Q=O-p,j=W-u;if(Math.abs(j)>10||Math.abs(Q)>10){p=O,u=W;let y=Math.atan2(Q,j)*q+180,v=Math.abs(m-y);v>180&&m<y&&(d-=360),v>180&&m>y&&(d+=360);let R=y+d+90;g.goTo({rotation:R}),m=y}T.goTo({x:W,y:O})}),C=Z.createTween({data:{opacity:0,scale:.95},duration:2e3,ease:"easeOutQuart",stagger:{each:5,from:"center"}});e.forEach(M=>{C.subscribe(({scale:A,opacity:I})=>{M.style.scale=`${A}`,M.style.opacity=I})});let _=Ne.createAsyncTimeline({repeat:1}).goTo(C,{opacity:1,scale:1});return{playIntro:async()=>_.play(),destroy:()=>{C.destroy(),C=null,_.destroy(),_=null,T.destroy(),T=null,g.destroy(),g=null,S(),x(),n=null,i=null,a=null,l=null,p=null,u=null,m=null,d=null,f=null}}};var w0=async({playIntro:e})=>{await e()},$d=({onMount:e,html:t,getState:r,staticProps:o})=>{let{svg:s}=r(),{child:n}=ye(),{source:i}=n;return e(({element:a,refs:l})=>{let p=a.querySelector("svg"),{width:u,height:m}=p.viewBox.baseVal,{trail1:d,trail2:f,trail3:T,trail4:g,black:S,body:x,bottom_green:C,collo:_,dark_shadow:M,gambe:A,green_top:I,head:V,light_shadow:U,head_bg:W,body_bg:Y,head_green:D}=l,O=Vd({groups:[S,x,C,_,M,A,I,V,U,W,Y,D],trails:[d,f,T,g],boxWidth:u,boxHeight:m,svg:p}),{playIntro:q,destroy:Q}=O;return w0({playIntro:q}),()=>{Q()}}),t`<div class="svg-child-container">
        <div class="svg-child">${s}</div>
        <code-button
            ${o({drawers:[{label:"description",source:i.description},{label:"definition",source:i.definition},{label:"component",source:i.component},{label:"animation",source:i.animation}],style:"legend",color:"green"})}
        >
        </code-button>
    </div>`};var T0=k({name:"svg-child",component:$d,exportState:["svg"],state:{svg:()=>({value:"",type:String})}});var Ai={};Oi(Ai,{about:()=>F0,animatedPatternN0v1:()=>C0,animatedPatternN0v2:()=>I0,animatedPatternN0v3:()=>E0,animatedPatternN0v4:()=>k0,animatedPatternN0v5:()=>R0,animatedPatternN0v6:()=>P0,animatedPatternN0v7:()=>A0,animatedPatternN1:()=>_0,canvas_overview:()=>W0,caterpillarN0:()=>O0,caterpillarN1:()=>N0,caterpillarN2:()=>M0,child:()=>zy,dynamic_list:()=>G0,home:()=>L0,horizontalScrollerV1:()=>V0,horizontalScrollerV2:()=>$0,mobCore_defaults:()=>_y,mobCore_events:()=>Py,mobCore_overview:()=>Ry,mobCore_store:()=>Ay,mobJs_bindEvents:()=>yy,mobJs_bindProps:()=>fy,mobJs_component:()=>K0,mobJs_computed:()=>sy,mobJs_debug:()=>Iy,mobJs_delegateEvents:()=>vy,mobJs_emit:()=>ry,mobJs_emitAsync:()=>oy,mobJs_freezeProp:()=>uy,mobJs_getChildren:()=>cy,mobJs_getParentId:()=>hy,mobJs_getState:()=>ey,mobJs_html:()=>Z0,mobJs_initialization:()=>Y0,mobJs_instanceName:()=>ky,mobJs_onMount:()=>Q0,mobJs_overview:()=>J0,mobJs_refs:()=>wy,mobJs_remove:()=>ay,mobJs_removeDom:()=>ly,mobJs_repeat:()=>Sy,mobJs_routing:()=>X0,mobJs_runtime:()=>Ey,mobJs_setState:()=>ty,mobJs_slot:()=>Ty,mobJs_staticProps:()=>my,mobJs_syncParent:()=>by,mobJs_unBind:()=>gy,mobJs_unFreezeProp:()=>py,mobJs_utils:()=>xy,mobJs_watch:()=>ny,mobJs_watchParent:()=>dy,mobJs_watchSync:()=>iy,mobJs_web_component:()=>Cy,mobMotion_async_timeline:()=>Oy,mobMotion_create_stagger:()=>Ny,mobMotion_defaults:()=>By,mobMotion_overview:()=>My,mobMotion_parallax:()=>Ly,mobMotion_scrolltrigger:()=>Fy,mobMotion_sequencer:()=>Dy,mobMotion_stagger:()=>Vy,mobMotion_sync_timeline:()=>$y,mobMotion_tween_spring_lerp:()=>Wy,pageNotFound:()=>x0,plugin_overview:()=>D0,scrollerN0v1:()=>B0,scrollerN0v2:()=>j0,scrollerN0v3:()=>z0,scrollerN0v4:()=>H0,scrollerN0v5:()=>U0,scrollerN1:()=>q0,svg_overview:()=>jy});var x0=()=>b`
        <div class="page-not-found">
            <mob-title ${w({tag:"h3",color:"green"})}>
                Page not found
            </mob-title>
            <a href="./#home">back to home</a>
        </div>
    `;var C0=()=>b`<div class="l-padding">
        <animatedpattern-n0></animatedpattern-n0>
    </div>`;var I0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var E0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var k0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var R0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"row"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var P0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"col"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var A0=()=>b`<div class="l-padding">
        <animatedpattern-n0
            ${w({fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:50,cellHeight:50,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var _0=()=>b`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;var O0=()=>b`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;var N0=()=>b`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;var M0=()=>b`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;var L0=()=>b`<div class="l-index">
        <home-component></home-component>
    </div>`;var F0=async()=>{let{success:e,data:t}=await E({source:"./data/about.json"});return e?b`<doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >About 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">About</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var D0=()=>b` <doc-container>
        <html-content
            slot="docs"
            ${w({source:"./data/plugin/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Plugin 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Plugin</doc-title>
    </doc-container>`;var V0=()=>b`<div>
        <horizontal-scroller></horizontal-scroller>
    </div>`;var $0=()=>b`<div>
        <horizontal-scroller
            ${w({animatePin:!0})}
        ></horizontal-scroller>
    </div>`;var W0=async()=>{let{success:e,data:t}=await E({source:"./data/canvas/overview.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Canvas 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var B0=()=>b`<div>
        <scroller-n0></scroller-n0>
    </div>`;var j0=()=>b`<div>
        <scroller-n0
            ${w({stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var z0=()=>b`<div>
        <scroller-n0
            ${w({stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var H0=()=>b`<div>
        <scroller-n0
            ${w({stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var U0=()=>b`<div>
        <scroller-n0
            ${w({stagger:{type:"equal",each:3,from:"end"},reorder:!1})}
        ></scroller-n0>
    </div>`;var q0=()=>b`<div class="l-padding">
        <caterpillar-n3></caterpillar-n3>
    </div>`;var G0=()=>b` <dynamic-list> </dynamic-list> `;var J0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/overview.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobJs</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Y0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/initialization.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>initialization</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var X0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/routing.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>routing</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">routing</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var K0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/component.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>component</span>
        </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Component</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Z0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/html.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>html</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">HTML</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Q0=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/onMount.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>onMount</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">onMount</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ey=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getState.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getState</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getState</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ty=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/setState.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>setState</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">setState</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ry=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/emit.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emit</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emit</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var oy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/emitAsync.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emitAsync</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emitAsync</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var sy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/computed.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>computed</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">computed</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ny=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watch.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watch</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watch</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var iy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watchSync.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchSync</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchSync</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ay=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/remove.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>remove</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">remove</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ly=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/removeDom.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>removeDom</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">removeDom</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var cy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getChildren.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getChildren</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getChildren</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var uy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/freezeProp.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>freezeProp</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">freezeProp</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var py=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/unFreezeProp.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unFreezeProp</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unFreezeProp</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var hy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/getParentId.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getParentId</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getParentId</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var dy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/watchParent.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchParent</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchParent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var my=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/staticProps.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>staticProps</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">staticProps</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var fy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/bindProps.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindProps</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindProps</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var gy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/unBind.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unBind</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unBind</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var by=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/syncParent.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>syncParent</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">syncParent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var yy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/bindEvents.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindEvents</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindEvents</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var vy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/delegateEvents.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>delegateEvents</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">delegateEvents</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Sy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/repeat.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>repeat</span></doc-title-small
        >
        <links-mobjs
            ${w({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">repeat</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var wy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/refs.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>refs</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">refs</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ty=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/slot.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>slot</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">slot</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var xy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/utils.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>utils</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Utils</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Cy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/webComponent.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>webComponent</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">WebComponent</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Iy=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/debug.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>debug</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Debug</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ey=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/runtime.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>runtime</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Runtime</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var ky=async()=>{let{success:e,data:t}=await E({source:"./data/mobJs/instanceName.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>instanceName</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">InstanceName</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ry=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/overview.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobCore 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Py=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/events.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Events</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ay=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/store.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Store</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Store</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var _y=async()=>{let{success:e,data:t}=await E({source:"./data/mobCore/defaults.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Defaults</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Oy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/asyncTimeline.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Async timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Async timeline</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ny=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/createStagger.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>CreateStagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">CreateStagger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var My=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/overview.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobMotion 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobMotion</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Ly=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/parallax.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Parallax</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Parallax</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Fy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/scrollTrigger.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>ScrollTrigger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">ScrollTrigger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Dy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/sequencer.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sequencer</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sequencer</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Vy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/stagger.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Stagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Stagger</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var $y=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/syncTimeline.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sync timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sync timeline</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var Wy=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/tweenSpringLerp.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Tween Spring Lerp</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Tweens</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var By=async()=>{let{success:e,data:t}=await E({source:"./data/mobMotion/defaults.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Defaults</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var jy=async()=>{let{success:e,data:t}=await E({source:"./data/svg/overview.json"});return e?b` <doc-container>
        <html-content
            slot="docs"
            ${w({data:t.data,useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Svg
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Svg</doc-title>
    </doc-container>`:(console.warn("fetch data fail"),[])};var zy=async()=>{let{success:e,data:t}=await Us({source:"./asset/svg/child.svg"});return e?b`<div>
        <svg-child ${w({svg:t})}></svg-child>
    </div>`:(console.warn("fetch data fail"),[])};var Wd=()=>b`
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
    `;c.useLoad(()=>{c.store.set("fpsScalePercent",{0:1,50:2,70:3}),se.setDefault({deferredNextTick:!0,useScaleFps:!0,usePassive:!0,mq:{desktop:1024},spring:{config:{customSpring:{friction:1,mass:1,precision:.01,tension:180,velocity:0}}}}),se.printDefault(),(async()=>{let t=document.body.querySelector(".js-main-loader"),r=document.body.querySelector(".js-main-loader-background"),o=Z.createTween({data:{opacity:1,scale:1},duration:1e3});t&&r&&[t,r].forEach(s=>{o.subscribe(({opacity:n,scale:i})=>{s.style.opacity=n,s.style.transform=`scale(${i})`})}),await Dh(),Pn({isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:1e3,debug:!0}),Wn({rootId:"#root",contentId:"#content",wrapper:Wd,components:Pi,pages:Ai,index:"home",pageNotFound:"pageNotFound",afterInit:async()=>{await o.goTo({opacity:0,scale:.9}),t?.remove(),r?.remove(),o=null}})})()});})();
//# sourceMappingURL=main.js.map
