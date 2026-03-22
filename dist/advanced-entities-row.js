/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$2,getOwnPropertyDescriptor:h$2,getOwnPropertyNames:r$2,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$2=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$2 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$2(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const t=this.properties,s=[...r$2(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$2.elementStyles=[],y$2.shadowRootOptions={mode:"open"},y$2[d$2("elementProperties")]=new Map,y$2[d$2("finalized")]=new Map,p$1?.({ReactiveElement:y$2}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t=>t,s$1=t$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h$1="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$1=`<${n$2}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d$1=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y$1=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m$1:void 0!==u[2]?(y$1.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m$1?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$1:d>=0?(e.push(a),s.slice(0,d)+h$1+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h$1)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y$1.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d$1(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$3(t).nextSibling;i$3(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$2 = class i extends y$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$2._$litElement$=true,i$2["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$2});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$2});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o=e(class extends i$1{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return E}});

const NORMALISED_ACTION = 'tap_action';

// Polymer legacy event helpers used courtesy of the Polymer project.
//
// Copyright (c) 2017 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param {{ bubbles: (boolean|undefined),
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
const deepEqual = (a, b) => {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) {
            return false;
        }
        let i;
        let length;
        if (Array.isArray(a)) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!deepEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) {
                return false;
            }
            for (i of a.entries()) {
                if (!b.has(i[0])) {
                    return false;
                }
            }
            for (i of a.entries()) {
                if (!deepEqual(i[1], b.get(i[0]))) {
                    return false;
                }
            }
            return true;
        }
        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) {
                return false;
            }
            for (i of a.entries()) {
                if (!b.has(i[0])) {
                    return false;
                }
            }
            return true;
        }
        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            // eslint-disable-next-line
            // @ts-ignore
            length = a.length;
            // eslint-disable-next-line
            // @ts-ignore
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        if (a.constructor === RegExp) {
            return a.source === b.source && a.flags === b.flags;
        }
        if (a.valueOf !== Object.prototype.valueOf) {
            return a.valueOf() === b.valueOf();
        }
        if (a.toString !== Object.prototype.toString) {
            return a.toString() === b.toString();
        }
        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) {
            return false;
        }
        for (i = length; i-- !== 0;) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }
        for (i = length; i-- !== 0;) {
            const key = keys[i];
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    // true if both NaN, false otherwise
    return a !== a && b !== b;
};

// @ts-ignore
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
class ActionHandlerImpl extends HTMLElement {
    constructor() {
        super(...arguments);
        this.holdTime = 500;
        this.held = false;
        this.cancelled = false;
        this.isRepeating = false;
        this.repeatCount = 0;
    }
    connectedCallback() {
        Object.assign(this.style, {
            position: 'fixed',
            width: isTouch ? '100px' : '50px',
            height: isTouch ? '100px' : '50px',
            transform: 'translate(-50%, -50%) scale(0)',
            pointerEvents: 'none',
            zIndex: '999',
            background: 'var(--primary-color)',
            display: null,
            opacity: '0.2',
            borderRadius: '50%',
            transition: 'transform 180ms ease-in-out',
        });
        ['touchcancel', 'mouseout', 'mouseup', 'touchmove', 'mousewheel', 'wheel', 'scroll'].forEach((ev) => {
            document.addEventListener(ev, () => {
                this.cancelled = true;
                if (this.timer) {
                    this.stopAnimation();
                    clearTimeout(this.timer);
                    this.timer = undefined;
                    if (this.isRepeating && this.repeatTimeout) {
                        clearInterval(this.repeatTimeout);
                        this.isRepeating = false;
                    }
                }
            }, { passive: true });
        });
    }
    bind(element, options = {}) {
        if (element.actionHandler && deepEqual(options, element.actionHandler.options)) {
            return;
        }
        if (element.actionHandler) {
            element.removeEventListener('touchstart', element.actionHandler.start);
            element.removeEventListener('touchend', element.actionHandler.end);
            element.removeEventListener('touchcancel', element.actionHandler.end);
            element.removeEventListener('mousedown', element.actionHandler.start);
            element.removeEventListener('click', element.actionHandler.end);
            element.removeEventListener('keydown', element.actionHandler.handleKeyDown);
        }
        else {
            element.addEventListener('contextmenu', (ev) => {
                const e = ev || window.event;
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
                e.returnValue = false;
                return false;
            });
        }
        element.actionHandler = { options };
        if (options.disabled) {
            return;
        }
        element.actionHandler.start = (ev) => {
            var _a;
            if ((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.ignore) {
                return;
            }
            this.cancelled = false;
            let x;
            let y;
            if (ev.touches) {
                x = ev.touches[0].clientX;
                y = ev.touches[0].clientY;
            }
            else {
                x = ev.clientX;
                y = ev.clientY;
            }
            if (options.hasHold) {
                this.held = false;
                this.timer = window.setTimeout(() => {
                    this.startAnimation(x, y);
                    this.held = true;
                    if (options.repeat && !this.isRepeating) {
                        this.repeatCount = 0;
                        this.isRepeating = true;
                        this.repeatTimeout = setInterval(() => {
                            fireEvent(element, 'action', { action: 'hold' });
                            this.repeatCount++;
                            if (this.repeatTimeout && options.repeatLimit && this.repeatCount >= options.repeatLimit) {
                                clearInterval(this.repeatTimeout);
                                this.isRepeating = false;
                            }
                        }, options.repeat);
                    }
                }, this.holdTime);
            }
        };
        element.actionHandler.end = (ev) => {
            var _a;
            if ((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.ignore) {
                return;
            }
            if (['touchend', 'touchcancel'].includes(ev.type) && this.cancelled) {
                if (this.isRepeating && this.repeatTimeout) {
                    clearInterval(this.repeatTimeout);
                    this.isRepeating = false;
                }
                return;
            }
            if (ev.type == 'touchcancel') {
                return;
            }
            const target = ev.target;
            if (ev.cancelable) {
                ev.preventDefault();
            }
            if (options.hasHold) {
                clearTimeout(this.timer);
                if (this.isRepeating && this.repeatTimeout) {
                    clearInterval(this.repeatTimeout);
                }
                this.isRepeating = false;
                this.stopAnimation();
                this.timer = undefined;
            }
            if (options.hasHold && this.held) {
                if (!options.repeat) {
                    fireEvent(target, 'action', { action: 'hold' });
                }
            }
            else if (options.hasDoubleClick) {
                if ((ev.type === 'click' && ev.detail < 2) || !this.dblClickTimeout) {
                    this.dblClickTimeout = window.setTimeout(() => {
                        this.dblClickTimeout = undefined;
                        fireEvent(target, 'action', { action: 'tap' });
                    }, 250);
                }
                else {
                    clearTimeout(this.dblClickTimeout);
                    this.dblClickTimeout = undefined;
                    fireEvent(target, 'action', { action: 'double_tap' });
                }
            }
            else {
                fireEvent(target, 'action', { action: 'tap' });
            }
        };
        element.actionHandler.handleTouchMove = (ev) => {
            if (ev.type == 'touchmove' && options.hasHold && this.held) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        };
        element.actionHandler.handleKeyDown = (ev) => {
            if (!['Enter', ' '].includes(ev.key)) {
                return;
            }
            ev.currentTarget.actionHandler.end(ev);
        };
        element.addEventListener('touchstart', element.actionHandler.start, { passive: true });
        element.addEventListener('touchmove', element.actionHandler.handleTouchMove);
        element.addEventListener('touchend', element.actionHandler.end);
        element.addEventListener('touchcancel', element.actionHandler.end);
        element.addEventListener('mousedown', element.actionHandler.start, { passive: true });
        element.addEventListener('click', element.actionHandler.end);
        element.addEventListener('keydown', element.actionHandler.handleKeyDown);
    }
    startAnimation(x, y) {
        Object.assign(this.style, {
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%) scale(1)',
        });
    }
    stopAnimation() {
        Object.assign(this.style, {
            left: null,
            top: null,
            transform: 'translate(-50%, -50%) scale(0)',
        });
    }
}
customElements.define('advanced-entities-action-handler', ActionHandlerImpl);
const getActionHandler = () => {
    const body = document.body;
    if (body.querySelector('advanced-entities-action-handler')) {
        return body.querySelector('advanced-entities-action-handler');
    }
    const actionhandler = document.createElement('advanced-entities-action-handler');
    body.appendChild(actionhandler);
    return actionhandler;
};
const actionHandlerBind = (element, options = {}) => {
    const actionhandler = getActionHandler();
    if (!actionhandler) {
        return;
    }
    actionhandler.bind(element, options);
};
const actionHandler = e(class extends i$1 {
    update(part, [options]) {
        actionHandlerBind(part.element, options);
        return E;
    }
    render(_options) { }
});

const handleAction = async (node, _hass, config, action) => {
    fireEvent(node, 'hass-action', { config, action });
};

const forwardHaptic = (node, hapticType) => {
    fireEvent(node, 'haptic', hapticType);
};

const styles = i$5 `
  :host {
    display: flex;
    align-items: center;
  }
  .icon-small {
    width: auto;
  }
  .entity {
    text-align: right;
    cursor: pointer;
  }
  .entity span {
    font-size: 10px;
    color: var(--secondary-text-color);
  }
  .entities-row {
    flex-direction: row;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
  .entities-row .entity {
    margin-right: 16px;
  }
  .entities-row .entity:last-of-type {
    margin-right: 0;
  }
  .entities-column {
    flex-direction: column;
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: space-evenly;
  }
  .entities-column .entity div {
    display: inline-block;
    vertical-align: middle;
  }
  .state {
    white-space: nowrap;
  }
  .warning {
    color: var(--error-color);
    padding: 8px;
  }
`;

const DOMAINS_TOGGLE = new Set(['fan', 'input_boolean', 'light', 'switch', 'group', 'automation', 'humidifier']);

function computeDomain(entityId) {
    return entityId.substr(0, entityId.indexOf('.'));
}
function computeEntity(entityId) {
    return entityId.substr(entityId.indexOf('.') + 1);
}
function mergeDeep(...objects) {
    const isObject = (obj) => obj && typeof obj === 'object';
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}
function mergeStatesById(intoStates, fromStates) {
    let resultStateConfigs = [];
    if (intoStates) {
        intoStates.forEach((intoState) => {
            let localState = intoState;
            if (fromStates) {
                fromStates.forEach((fromState) => {
                    if (fromState.id && intoState.id && fromState.id == intoState.id)
                        localState = mergeDeep(localState, fromState);
                });
            }
            resultStateConfigs.push(localState);
        });
    }
    if (fromStates) {
        resultStateConfigs = resultStateConfigs.concat(fromStates.filter((x) => (!intoStates ? true : !intoStates.find((y) => (y.id && x.id ? y.id == x.id : false)))));
    }
    return resultStateConfigs;
}
function getLovelaceCast() {
    var _a;
    let root = document.querySelector('hc-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('hc-lovelace');
    root = root && root.shadowRoot;
    root = root && (root.querySelector('hui-view') || root.querySelector('hui-panel-view'));
    if (root) {
        const ll = root.lovelace;
        ll.current_view = (_a = root === null || root === void 0 ? void 0 : root._curView) !== null && _a !== void 0 ? _a : 0;
        return ll;
    }
    return null;
}
function getLovelace() {
    var _a;
    let root = document.querySelector('home-assistant');
    root = root && root.shadowRoot;
    root = root && root.querySelector('home-assistant-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('ha-panel-lovelace');
    root = root && root.shadowRoot;
    root = root && root.querySelector('hui-root');
    if (root) {
        const ll = root.lovelace;
        ll.current_view = (_a = root === null || root === void 0 ? void 0 : root._curView) !== null && _a !== void 0 ? _a : 0;
        return ll;
    }
    return null;
}
const leftPad$1 = (num) => (num < 10 ? `0${num}` : num);
function secondsToDuration(d) {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    if (h > 0) {
        return `${h}:${leftPad$1(m)}:${leftPad$1(s)}`;
    }
    if (m > 0) {
        return `${m}:${leftPad$1(s)}`;
    }
    if (s > 0) {
        return '' + s;
    }
    return null;
}
function isNumericFromAttributes(attributes) {
    return !!attributes.unit_of_measurement || !!attributes.state_class;
}
const UNAVAILABLE_STATES = ['unavailable', 'unknown'];
const isUnavailable = (stateObj) => !stateObj || UNAVAILABLE_STATES.includes(stateObj.state);

var NumberFormat;
(function (NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
})(NumberFormat || (NumberFormat = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
})(TimeFormat || (TimeFormat = {}));
var TimeZone;
(function (TimeZone) {
    TimeZone["local"] = "local";
    TimeZone["server"] = "server";
})(TimeZone || (TimeZone = {}));
var DateFormat;
(function (DateFormat) {
    DateFormat["language"] = "language";
    DateFormat["system"] = "system";
    DateFormat["DMY"] = "DMY";
    DateFormat["MDY"] = "MDY";
    DateFormat["YMD"] = "YMD";
})(DateFormat || (DateFormat = {}));
var FirstWeekday;
(function (FirstWeekday) {
    FirstWeekday["language"] = "language";
    FirstWeekday["monday"] = "monday";
    FirstWeekday["tuesday"] = "tuesday";
    FirstWeekday["wednesday"] = "wednesday";
    FirstWeekday["thursday"] = "thursday";
    FirstWeekday["friday"] = "friday";
    FirstWeekday["saturday"] = "saturday";
    FirstWeekday["sunday"] = "sunday";
})(FirstWeekday || (FirstWeekday = {}));

// Logic based on https://en.wikipedia.org/wiki/Percent_sign#Form_and_spacing
const blankBeforePercent = (localeOptions) => {
    switch (localeOptions.language) {
        case 'cz':
        case 'de':
        case 'fi':
        case 'fr':
        case 'sk':
        case 'sv':
            return ' ';
        default:
            return '';
    }
};
const round = (value, precision = 2) => Math.round(value * 10 ** precision) / 10 ** precision;
const numberFormatToLocale = (localeOptions) => {
    switch (localeOptions.number_format) {
        case NumberFormat.comma_decimal:
            return ['en-US', 'en']; // Use United States with fallback to English formatting 1,234,567.89
        case NumberFormat.decimal_comma:
            return ['de', 'es', 'it']; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
        case NumberFormat.space_comma:
            return ['fr', 'sv', 'cs']; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
        case NumberFormat.system:
            return undefined;
        default:
            return localeOptions.language;
    }
};
/**
 * Formats a number based on the user's preference with thousands separator(s) and decimal character for better legibility.
 *
 * @param num The number to format
 * @param localeOptions The user-selected language and formatting, from `hass.locale`
 * @param options Intl.NumberFormatOptions to use
 */
const formatNumber = (num, localeOptions, options) => {
    const locale = localeOptions ? numberFormatToLocale(localeOptions) : undefined;
    // Polyfill for Number.isNaN, which is more reliable than the global isNaN()
    Number.isNaN =
        Number.isNaN ||
            function isNaN(input) {
                return typeof input === 'number' && isNaN(input);
            };
    if ((localeOptions === null || localeOptions === void 0 ? void 0 : localeOptions.number_format) !== NumberFormat.none && !Number.isNaN(Number(num)) && Intl) {
        try {
            return new Intl.NumberFormat(locale, getDefaultFormatOptions(num, options)).format(Number(num));
        }
        catch (err) {
            // Don't fail when using "TEST" language
            // eslint-disable-next-line no-console
            console.error(err);
            return new Intl.NumberFormat(undefined, getDefaultFormatOptions(num, options)).format(Number(num));
        }
    }
    if (typeof num === 'string') {
        return num;
    }
    return `${round(num, options === null || options === void 0 ? void 0 : options.maximumFractionDigits).toString()}${(options === null || options === void 0 ? void 0 : options.style) === 'currency' ? ` ${options.currency}` : ''}`;
};
/**
 * Checks if the current entity state should be formatted as an integer based on the `state` and `step` attribute and returns the appropriate `Intl.NumberFormatOptions` object with `maximumFractionDigits` set
 * @param entityState The state object of the entity
 * @returns An `Intl.NumberFormatOptions` object with `maximumFractionDigits` set to 0, or `undefined`
 */
const getNumberFormatOptions = (entityState, numeric_precision, entity) => {
    var _a;
    let precision = entity === null || entity === void 0 ? void 0 : entity.display_precision;
    if (numeric_precision !== undefined) {
        precision = numeric_precision;
    }
    if (precision != null) {
        return {
            maximumFractionDigits: precision,
            minimumFractionDigits: precision,
        };
    }
    if (Number.isInteger(Number((_a = entityState.attributes) === null || _a === void 0 ? void 0 : _a.step)) && Number.isInteger(Number(entityState.state))) {
        return { maximumFractionDigits: 0 };
    }
    if (entityState.attributes.step != null) {
        return { maximumFractionDigits: Math.ceil(Math.log10(1 / entityState.attributes.step)) };
    }
    return undefined;
};
/**
 * Generates default options for Intl.NumberFormat
 * @param num The number to be formatted
 * @param options The Intl.NumberFormatOptions that should be included in the returned options
 */
const getDefaultFormatOptions = (num, options) => {
    const defaultOptions = Object.assign({ maximumFractionDigits: 2 }, options);
    if (typeof num !== 'string') {
        return defaultOptions;
    }
    // Keep decimal trailing zeros if they are present in a string numeric value
    if (!options || (options.minimumFractionDigits === undefined && options.maximumFractionDigits === undefined)) {
        const digits = num.indexOf('.') > -1 ? num.split('.')[1].length : 0;
        defaultOptions.minimumFractionDigits = digits;
        defaultOptions.maximumFractionDigits = digits;
    }
    return defaultOptions;
};

const DAY_IN_MILLISECONDS = 86400000;
const leftPad = (num, digits = 2) => {
    let paddedNum = '' + num;
    for (let i = 1; i < digits; i++) {
        paddedNum = parseInt(paddedNum) < 10 ** i ? `0${paddedNum}` : paddedNum;
    }
    return paddedNum;
};
function millisecondsToDuration(d) {
    const h = Math.floor(d / 1000 / 3600);
    const m = Math.floor(((d / 1000) % 3600) / 60);
    const s = Math.floor(((d / 1000) % 3600) % 60);
    const ms = Math.floor(d % 1000);
    if (h > 0) {
        return `${h}:${leftPad(m)}:${leftPad(s)}`;
    }
    if (m > 0) {
        return `${m}:${leftPad(s)}`;
    }
    if (s > 0 || ms > 0) {
        return `${s}${ms > 0 ? `.${leftPad(ms, 3)}` : ``}`;
    }
    return null;
}
const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;
const SECOND_IN_MILLISECONDS = 1000;
const UNIT_TO_MILLISECOND_CONVERT = {
    ms: 1,
    s: SECOND_IN_MILLISECONDS,
    min: MINUTE_IN_MILLISECONDS,
    h: HOUR_IN_MILLISECONDS,
    d: DAY_IN_MILLISECONDS,
};
const formatDuration = (duration, units) => millisecondsToDuration(parseFloat(duration) * UNIT_TO_MILLISECOND_CONVERT[units]) || '0';

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

// Tuesday, August 10
const formatDateWeekdayDay = (dateObj, locale, config) => formatDateWeekdayDayMem(locale, config.time_zone).format(dateObj);
const formatDateWeekdayDayMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// August 10, 2021
const formatDate = (dateObj, locale, config) => formatDateMem(locale, config.time_zone).format(dateObj);
const formatDateMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// 10/08/2021
const formatDateNumeric = (dateObj, locale, config) => {
    var _a, _b, _c, _d;
    const formatter = formatDateNumericMem(locale, config.time_zone);
    if (locale.date_format === DateFormat.language || locale.date_format === DateFormat.system) {
        return formatter.format(dateObj);
    }
    const parts = formatter.formatToParts(dateObj);
    const literal = (_a = parts.find((value) => value.type === 'literal')) === null || _a === void 0 ? void 0 : _a.value;
    const day = (_b = parts.find((value) => value.type === 'day')) === null || _b === void 0 ? void 0 : _b.value;
    const month = (_c = parts.find((value) => value.type === 'month')) === null || _c === void 0 ? void 0 : _c.value;
    const year = (_d = parts.find((value) => value.type === 'year')) === null || _d === void 0 ? void 0 : _d.value;
    const lastPart = parts[parts.length - 1];
    let lastLiteral = (lastPart === null || lastPart === void 0 ? void 0 : lastPart.type) === 'literal' ? lastPart === null || lastPart === void 0 ? void 0 : lastPart.value : '';
    if (locale.language === 'bg' && locale.date_format === DateFormat.YMD) {
        lastLiteral = '';
    }
    const formats = {
        [DateFormat.DMY]: `${day}${literal}${month}${literal}${year}${lastLiteral}`,
        [DateFormat.MDY]: `${month}${literal}${day}${literal}${year}${lastLiteral}`,
        [DateFormat.YMD]: `${year}${literal}${month}${literal}${day}${lastLiteral}`,
    };
    return formats[locale.date_format];
};
const formatDateNumericMem = memoizeOne((locale, serverTimeZone) => {
    const localeString = locale.date_format === DateFormat.system ? undefined : locale.language;
    if (locale.date_format === DateFormat.language || locale.date_format === DateFormat.system) {
        return new Intl.DateTimeFormat(localeString, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
        });
    }
    return new Intl.DateTimeFormat(localeString, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
    });
});
// Aug 10
const formatDateShort = (dateObj, locale, config) => formatDateShortMem(locale, config.time_zone).format(dateObj);
const formatDateShortMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    day: 'numeric',
    month: 'short',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// August 2021
const formatDateMonthYear = (dateObj, locale, config) => formatDateMonthYearMem(locale, config.time_zone).format(dateObj);
const formatDateMonthYearMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    month: 'long',
    year: 'numeric',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// August
const formatDateMonth = (dateObj, locale, config) => formatDateMonthMem(locale, config.time_zone).format(dateObj);
const formatDateMonthMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    month: 'long',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// 2021
const formatDateYear = (dateObj, locale, config) => formatDateYearMem(locale, config.time_zone).format(dateObj);
const formatDateYearMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    year: 'numeric',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// Monday
const formatDateWeekday = (dateObj, locale, config) => formatDateWeekdayMem(locale, config.time_zone).format(dateObj);
const formatDateWeekdayMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    weekday: 'long',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// Mon
const formatDateWeekdayShort = (dateObj, locale, config) => formatDateWeekdayShortMem(locale, config.time_zone).format(dateObj);
const formatDateWeekdayShortMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language, {
    weekday: 'short',
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));

const useAmPm = memoizeOne((locale) => {
    if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
        const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
        const test = new Date().toLocaleString(testLanguage);
        return test.includes('AM') || test.includes('PM');
    }
    return locale.time_format === TimeFormat.am_pm;
});
const formatTime = (dateObj, locale, config) => formatTimeMem(locale, config.time_zone).format(dateObj);
const formatTimeMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// 9:15:24 PM || 21:15:24
const formatTimeWithSeconds = (dateObj, locale, config) => formatTimeWithSecondsMem(locale, config.time_zone).format(dateObj);
const formatTimeWithSecondsMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// Tuesday 7:00 PM || Tuesday 19:00
const formatTimeWeekday = (dateObj, locale, config) => formatTimeWeekdayMem(locale, config.time_zone).format(dateObj);
const formatTimeWeekdayMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    weekday: 'long',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// 21:15
const formatTime24h = (dateObj, locale, config) => formatTime24hMem(locale, config.time_zone).format(dateObj);
const formatTime24hMem = memoizeOne((locale, serverTimeZone) => 
// en-GB to fix Chrome 24:59 to 0:59 https://stackoverflow.com/a/60898146
new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));

// August 9, 2021, 8:23 AM
const formatDateTime = (dateObj, locale, config) => formatDateTimeMem(locale, config.time_zone).format(dateObj);
const formatDateTimeMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// Aug 9, 2021, 8:23 AM
const formatShortDateTimeWithYear = (dateObj, locale, config) => formatShortDateTimeWithYearMem(locale, config.time_zone).format(dateObj);
const formatShortDateTimeWithYearMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// Aug 9, 8:23 AM
const formatShortDateTime = (dateObj, locale, config) => formatShortDateTimeMem(locale, config.time_zone).format(dateObj);
const formatShortDateTimeMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    month: 'short',
    day: 'numeric',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// August 9, 2021, 8:23:15 AM
const formatDateTimeWithSeconds = (dateObj, locale, config) => formatDateTimeWithSecondsMem(locale, config.time_zone).format(dateObj);
const formatDateTimeWithSecondsMem = memoizeOne((locale, serverTimeZone) => new Intl.DateTimeFormat(locale.language === 'en' && !useAmPm(locale) ? 'en-u-hc-h23' : locale.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: useAmPm(locale) ? 'numeric' : '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: useAmPm(locale),
    timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
}));
// 9/8/2021, 8:23 AM
const formatDateTimeNumeric = (dateObj, locale, config) => `${formatDateNumeric(dateObj, locale, config)}, ${formatTime(dateObj, locale, config)}`;

const supportsFeatureFromAttributes = (attributes, feature) => 
// eslint-disable-next-line no-bitwise, @typescript-eslint/no-non-null-assertion
(attributes.supported_features & feature) !== 0;

const UPDATE_SUPPORT_PROGRESS = 4;
const updateUsesProgressFromAttributes = (attributes) => supportsFeatureFromAttributes(attributes, UPDATE_SUPPORT_PROGRESS) && typeof attributes.in_progress === 'number';
const updateIsInstallingFromAttributes = (attributes) => updateUsesProgressFromAttributes(attributes) || !!attributes.in_progress;

const UNAVAILABLE = 'unavailable';
const UNKNOWN = 'unknown';
const computeStateDisplay = (localize, stateObj, locale, config, entities, buttonConfig, state) => {
    const entity = entities[stateObj.entity_id];
    return computeStateDisplayFromEntityAttributes(localize, locale, config, entity, stateObj.entity_id, stateObj.attributes, buttonConfig, state !== undefined ? state : stateObj.state);
};
const computeStateDisplayFromEntityAttributes = (localize, locale, config, entity, entityId, attributes, buttonConfig, state) => {
    var _a;
    if (state === UNKNOWN || state === UNAVAILABLE) {
        return localize(`state.default.${state}`);
    }
    // Entities with a `unit_of_measurement` or `state_class` are numeric values and should use `formatNumber`
    if (isNumericFromAttributes(attributes)) {
        // state is duration
        if (attributes.device_class === 'duration' &&
            attributes.unit_of_measurement &&
            UNIT_TO_MILLISECOND_CONVERT[attributes.unit_of_measurement]) {
            try {
                return formatDuration(state, attributes.unit_of_measurement);
            }
            catch (_err) {
                // fallback to default
            }
        }
        if (attributes.device_class === 'monetary') {
            try {
                return formatNumber(state, locale, Object.assign({ style: 'currency', currency: (buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.units) || attributes.unit_of_measurement, minimumFractionDigits: 2 }, getNumberFormatOptions({ state, attributes }, buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.numeric_precision, entity)));
            }
            catch (_err) {
                // fallback to default
            }
        }
        const localOrConfigUnit = (buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.show_units)
            ? (buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.units)
                ? buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.units
                : attributes.unit_of_measurement
            : undefined;
        const unit = !localOrConfigUnit
            ? ''
            : localOrConfigUnit === '%'
                ? blankBeforePercent(locale) + '%'
                : ` ${localOrConfigUnit}`;
        return `${formatNumber(state, locale, getNumberFormatOptions({ state, attributes }, buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.numeric_precision, entity))}${unit}`;
    }
    const domain = computeDomain(entityId);
    if (domain === 'datetime') {
        const time = new Date(state);
        return formatDateTime(time, locale, config);
    }
    if (['date', 'input_datetime', 'time'].includes(domain)) {
        // If trying to display an explicit state, need to parse the explicit state to `Date` then format.
        // Attributes aren't available, we have to use `state`.
        // These are timezone agnostic, so we should NOT use the system timezone here.
        try {
            const components = state.split(' ');
            if (components.length === 2) {
                // Date and time.
                return formatDateTime(new Date(components.join('T')), Object.assign(Object.assign({}, locale), { time_zone: TimeZone.local }), config);
            }
            if (components.length === 1) {
                if (state.includes('-')) {
                    // Date only.
                    return formatDate(new Date(`${state}T00:00`), Object.assign(Object.assign({}, locale), { time_zone: TimeZone.local }), config);
                }
                if (state.includes(':')) {
                    // Time only.
                    const now = new Date();
                    return formatTime(new Date(`${now.toISOString().split('T')[0]}T${state}`), Object.assign(Object.assign({}, locale), { time_zone: TimeZone.local }), config);
                }
            }
            return state;
        }
        catch (_e) {
            // Formatting methods may throw error if date parsing doesn't go well,
            // just return the state string in that case.
            return state;
        }
    }
    // `counter` `number` and `input_number` domains do not have a unit of measurement but should still use `formatNumber`
    if (domain === 'counter' || domain === 'number' || domain === 'input_number') {
        // Format as an integer if the value and step are integers
        return formatNumber(state, locale, getNumberFormatOptions({ state, attributes }, buttonConfig === null || buttonConfig === void 0 ? void 0 : buttonConfig.numeric_precision, entity));
    }
    // state is a timestamp
    if (['button', 'event', 'input_button', 'scene', 'stt', 'tts'].includes(domain) ||
        (domain === 'sensor' && attributes.device_class === 'timestamp')) {
        try {
            return formatDateTime(new Date(state), locale, config);
        }
        catch (_err) {
            return state;
        }
    }
    if (domain === 'update') {
        // When updating, and entity does not support % show "Installing"
        // When updating, and entity does support % show "Installing (xx%)"
        // When update available, show the version
        // When the latest version is skipped, show the latest version
        // When update is not available, show "Up-to-date"
        // When update is not available and there is no latest_version show "Unavailable"
        return state === 'on'
            ? updateIsInstallingFromAttributes(attributes)
                ? supportsFeatureFromAttributes(attributes, UPDATE_SUPPORT_PROGRESS) &&
                    typeof attributes.in_progress === 'number'
                    ? localize('ui.card.update.installing_with_progress', {
                        progress: attributes.in_progress,
                    })
                    : localize('ui.card.update.installing')
                : attributes.latest_version
            : attributes.skipped_version === attributes.latest_version
                ? (_a = attributes.latest_version) !== null && _a !== void 0 ? _a : localize('state.default.unavailable')
                : localize('ui.card.update.up_to_date');
    }
    return (((entity === null || entity === void 0 ? void 0 : entity.translation_key) &&
        localize(`component.${entity.platform}.entity.${domain}.${entity.translation_key}.state.${state}`)) ||
        // Return device class translation
        (attributes.device_class &&
            localize(`component.${domain}.entity_component.${attributes.device_class}.state.${state}`)) ||
        // Return default translation
        localize(`component.${domain}.entity_component._.state.${state}`) ||
        // We don't know! Return the raw state.
        state);
};

var toStringFunction = Function.prototype.toString;
var create = Object.create;
var toStringObject = Object.prototype.toString;
/**
 * @classdesc Fallback cache for when WeakMap is not natively supported
 */
var LegacyCache = /** @class */ (function () {
    function LegacyCache() {
        this._keys = [];
        this._values = [];
    }
    LegacyCache.prototype.has = function (key) {
        return !!~this._keys.indexOf(key);
    };
    LegacyCache.prototype.get = function (key) {
        return this._values[this._keys.indexOf(key)];
    };
    LegacyCache.prototype.set = function (key, value) {
        this._keys.push(key);
        this._values.push(value);
    };
    return LegacyCache;
}());
function createCacheLegacy() {
    return new LegacyCache();
}
function createCacheModern() {
    return new WeakMap();
}
/**
 * Get a new cache object to prevent circular references.
 */
var createCache = typeof WeakMap !== 'undefined' ? createCacheModern : createCacheLegacy;
/**
 * Get an empty version of the object with the same prototype it has.
 */
function getCleanClone(prototype) {
    if (!prototype) {
        return create(null);
    }
    var Constructor = prototype.constructor;
    if (Constructor === Object) {
        return prototype === Object.prototype ? {} : create(prototype);
    }
    if (Constructor &&
        ~toStringFunction.call(Constructor).indexOf('[native code]')) {
        try {
            return new Constructor();
        }
        catch (_a) { }
    }
    return create(prototype);
}
function getRegExpFlagsLegacy(regExp) {
    var flags = '';
    if (regExp.global) {
        flags += 'g';
    }
    if (regExp.ignoreCase) {
        flags += 'i';
    }
    if (regExp.multiline) {
        flags += 'm';
    }
    if (regExp.unicode) {
        flags += 'u';
    }
    if (regExp.sticky) {
        flags += 'y';
    }
    return flags;
}
function getRegExpFlagsModern(regExp) {
    return regExp.flags;
}
/**
 * Get the flags to apply to the copied regexp.
 */
var getRegExpFlags = /test/g.flags === 'g' ? getRegExpFlagsModern : getRegExpFlagsLegacy;
function getTagLegacy(value) {
    var type = toStringObject.call(value);
    return type.substring(8, type.length - 1);
}
function getTagModern(value) {
    return value[Symbol.toStringTag] || getTagLegacy(value);
}
/**
 * Get the tag of the value passed, so that the correct copier can be used.
 */
var getTag = typeof Symbol !== 'undefined' ? getTagModern : getTagLegacy;

var defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var _a = Object.prototype, hasOwnProperty = _a.hasOwnProperty, propertyIsEnumerable = _a.propertyIsEnumerable;
var SUPPORTS_SYMBOL = typeof getOwnPropertySymbols === 'function';
function getStrictPropertiesModern(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
 * Get the properites used when copying objects strictly. This includes both keys and symbols.
 */
var getStrictProperties = SUPPORTS_SYMBOL
    ? getStrictPropertiesModern
    : getOwnPropertyNames;
/**
 * Striclty copy all properties contained on the object.
 */
function copyOwnPropertiesStrict(value, clone, state) {
    var properties = getStrictProperties(value);
    for (var index = 0, length_1 = properties.length, property = void 0, descriptor = void 0; index < length_1; ++index) {
        property = properties[index];
        if (property === 'callee' || property === 'caller') {
            continue;
        }
        descriptor = getOwnPropertyDescriptor(value, property);
        if (!descriptor) {
            // In extra edge cases where the property descriptor cannot be retrived, fall back to
            // the loose assignment.
            clone[property] = state.copier(value[property], state);
            continue;
        }
        // Only clone the value if actually a value, not a getter / setter.
        if (!descriptor.get && !descriptor.set) {
            descriptor.value = state.copier(descriptor.value, state);
        }
        try {
            defineProperty(clone, property, descriptor);
        }
        catch (error) {
            // Tee above can fail on node in edge cases, so fall back to the loose assignment.
            clone[property] = descriptor.value;
        }
    }
    return clone;
}
/**
 * Deeply copy the indexed values in the array.
 */
function copyArrayLoose(array, state) {
    var clone = new state.Constructor();
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(array, clone);
    for (var index = 0, length_2 = array.length; index < length_2; ++index) {
        clone[index] = state.copier(array[index], state);
    }
    return clone;
}
/**
 * Deeply copy the indexed values in the array, as well as any custom properties.
 */
function copyArrayStrict(array, state) {
    var clone = new state.Constructor();
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(array, clone);
    return copyOwnPropertiesStrict(array, clone, state);
}
/**
 * Copy the contents of the ArrayBuffer.
 */
function copyArrayBuffer(arrayBuffer, _state) {
    return arrayBuffer.slice(0);
}
/**
 * Create a new Blob with the contents of the original.
 */
function copyBlob(blob, _state) {
    return blob.slice(0, blob.size, blob.type);
}
/**
 * Create a new DataView with the contents of the original.
 */
function copyDataView(dataView, state) {
    return new state.Constructor(copyArrayBuffer(dataView.buffer));
}
/**
 * Create a new Date based on the time of the original.
 */
function copyDate(date, state) {
    return new state.Constructor(date.getTime());
}
/**
 * Deeply copy the keys and values of the original.
 */
function copyMapLoose(map, state) {
    var clone = new state.Constructor();
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(map, clone);
    map.forEach(function (value, key) {
        clone.set(key, state.copier(value, state));
    });
    return clone;
}
/**
 * Deeply copy the keys and values of the original, as well as any custom properties.
 */
function copyMapStrict(map, state) {
    return copyOwnPropertiesStrict(map, copyMapLoose(map, state), state);
}
function copyObjectLooseLegacy(object, state) {
    var clone = getCleanClone(state.prototype);
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(object, clone);
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            clone[key] = state.copier(object[key], state);
        }
    }
    return clone;
}
function copyObjectLooseModern(object, state) {
    var clone = getCleanClone(state.prototype);
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(object, clone);
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            clone[key] = state.copier(object[key], state);
        }
    }
    var symbols = getOwnPropertySymbols(object);
    for (var index = 0, length_3 = symbols.length, symbol = void 0; index < length_3; ++index) {
        symbol = symbols[index];
        if (propertyIsEnumerable.call(object, symbol)) {
            clone[symbol] = state.copier(object[symbol], state);
        }
    }
    return clone;
}
/**
 * Deeply copy the properties (keys and symbols) and values of the original.
 */
var copyObjectLoose = SUPPORTS_SYMBOL
    ? copyObjectLooseModern
    : copyObjectLooseLegacy;
/**
 * Deeply copy the properties (keys and symbols) and values of the original, as well
 * as any hidden or non-enumerable properties.
 */
function copyObjectStrict(object, state) {
    var clone = getCleanClone(state.prototype);
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(object, clone);
    return copyOwnPropertiesStrict(object, clone, state);
}
/**
 * Create a new primitive wrapper from the value of the original.
 */
function copyPrimitiveWrapper(primitiveObject, state) {
    return new state.Constructor(primitiveObject.valueOf());
}
/**
 * Create a new RegExp based on the value and flags of the original.
 */
function copyRegExp(regExp, state) {
    var clone = new state.Constructor(regExp.source, getRegExpFlags(regExp));
    clone.lastIndex = regExp.lastIndex;
    return clone;
}
/**
 * Return the original value (an identity function).
 *
 * @note
 * THis is used for objects that cannot be copied, such as WeakMap.
 */
function copySelf(value, _state) {
    return value;
}
/**
 * Deeply copy the values of the original.
 */
function copySetLoose(set, state) {
    var clone = new state.Constructor();
    // set in the cache immediately to be able to reuse the object recursively
    state.cache.set(set, clone);
    set.forEach(function (value) {
        clone.add(state.copier(value, state));
    });
    return clone;
}
/**
 * Deeply copy the values of the original, as well as any custom properties.
 */
function copySetStrict(set, state) {
    return copyOwnPropertiesStrict(set, copySetLoose(set, state), state);
}

var isArray = Array.isArray;
var assign = Object.assign;
var getPrototypeOf = Object.getPrototypeOf || (function (obj) { return obj.__proto__; });
var DEFAULT_LOOSE_OPTIONS = {
    array: copyArrayLoose,
    arrayBuffer: copyArrayBuffer,
    blob: copyBlob,
    dataView: copyDataView,
    date: copyDate,
    error: copySelf,
    map: copyMapLoose,
    object: copyObjectLoose,
    regExp: copyRegExp,
    set: copySetLoose,
};
var DEFAULT_STRICT_OPTIONS = assign({}, DEFAULT_LOOSE_OPTIONS, {
    array: copyArrayStrict,
    map: copyMapStrict,
    object: copyObjectStrict,
    set: copySetStrict,
});
/**
 * Get the copiers used for each specific object tag.
 */
function getTagSpecificCopiers(options) {
    return {
        Arguments: options.object,
        Array: options.array,
        ArrayBuffer: options.arrayBuffer,
        Blob: options.blob,
        Boolean: copyPrimitiveWrapper,
        DataView: options.dataView,
        Date: options.date,
        Error: options.error,
        Float32Array: options.arrayBuffer,
        Float64Array: options.arrayBuffer,
        Int8Array: options.arrayBuffer,
        Int16Array: options.arrayBuffer,
        Int32Array: options.arrayBuffer,
        Map: options.map,
        Number: copyPrimitiveWrapper,
        Object: options.object,
        Promise: copySelf,
        RegExp: options.regExp,
        Set: options.set,
        String: copyPrimitiveWrapper,
        WeakMap: copySelf,
        WeakSet: copySelf,
        Uint8Array: options.arrayBuffer,
        Uint8ClampedArray: options.arrayBuffer,
        Uint16Array: options.arrayBuffer,
        Uint32Array: options.arrayBuffer,
        Uint64Array: options.arrayBuffer,
    };
}
/**
 * Create a custom copier based on the object-specific copy methods passed.
 */
function createCopier(options) {
    var normalizedOptions = assign({}, DEFAULT_LOOSE_OPTIONS, options);
    var tagSpecificCopiers = getTagSpecificCopiers(normalizedOptions);
    var array = tagSpecificCopiers.Array, object = tagSpecificCopiers.Object;
    function copier(value, state) {
        state.prototype = state.Constructor = undefined;
        if (!value || typeof value !== 'object') {
            return value;
        }
        if (state.cache.has(value)) {
            return state.cache.get(value);
        }
        state.prototype = getPrototypeOf(value);
        state.Constructor = state.prototype && state.prototype.constructor;
        // plain objects
        if (!state.Constructor || state.Constructor === Object) {
            return object(value, state);
        }
        // arrays
        if (isArray(value)) {
            return array(value, state);
        }
        var tagSpecificCopier = tagSpecificCopiers[getTag(value)];
        if (tagSpecificCopier) {
            return tagSpecificCopier(value, state);
        }
        return typeof value.then === 'function' ? value : object(value, state);
    }
    return function copy(value) {
        return copier(value, {
            Constructor: undefined,
            cache: createCache(),
            copier: copier,
            prototype: undefined,
        });
    };
}
/**
 * Create a custom copier based on the object-specific copy methods passed, defaulting to the
 * same internals as `copyStrict`.
 */
function createStrictCopier(options) {
    return createCopier(assign({}, DEFAULT_STRICT_OPTIONS, options));
}
/**
 * Copy an value deeply as much as possible, where strict recreation of object properties
 * are maintained. All properties (including non-enumerable ones) are copied with their
 * original property descriptors on both objects and arrays.
 */
createStrictCopier({});
/**
 * Copy an value deeply as much as possible.
 */
var index = createCopier({});

const unit$7 = Object.create(null);
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25;

unit$7.year = unit$7.yr = unit$7.y = y;
unit$7.month = unit$7.mo = unit$7.mth = y / 12;
unit$7.week = unit$7.wk = unit$7.w = d * 7;
unit$7.day = unit$7.d = d;
unit$7.hour = unit$7.hr = unit$7.h = h;
unit$7.minute = unit$7.min = unit$7.m = m;
unit$7.second = unit$7.sec = unit$7.s = 1000;
unit$7.millisecond = unit$7.millisec = unit$7.ms = 1;
unit$7.microsecond = unit$7.microsec =  unit$7.us = unit$7.µs = 1e-3;
unit$7.nanosecond = unit$7.nanosec = unit$7.ns = 1e-6;

unit$7.group = ',';
unit$7.decimal = '.';
unit$7.placeholder = ' _';

const durationRE = /((?:\d{1,16}(?:\.\d{1,16})?|\.\d{1,16})(?:[eE][-+]?\d{1,4})?)\s?([\p{L}]{0,14})/gu;

parse.unit = unit$7;

/**
 * convert `str` to ms
 *
 * @param {string} str
 * @param {string} format
 * @return {number|null}
 */
function parse(str = '', format = 'ms') {
  let result = null, prevUnits;

  String(str)
    .replace(new RegExp(`(\\d)[${parse.unit.placeholder}${parse.unit.group}](\\d)`, 'g'), '$1$2')  // clean up group separators / placeholders
    .replace(parse.unit.decimal, '.') // normalize decimal separator
    .replace(durationRE, (_, n, units) => {
    // if no units, find next smallest units or fall back to format value
    // eg. 1h30 -> 1h30m
    if (!units) {
      if (prevUnits) {
        for (const u in parse.unit) if (parse.unit[u] < prevUnits) { units = u; break }
      }
      else units = format;
    }
    else units = units.toLowerCase();

    prevUnits = units = parse.unit[units] || parse.unit[units.replace(/s$/, '')];

    if (units) result = (result || 0) + n * units;
  });

  return result && ((result / (parse.unit[format] || 1)) * (str[0] === '-' ? -1 : 1))
}

const unit$6 = Object.create(unit$7);

unit$6.jahr = unit$6.j = unit$7.y;
unit$6.monat = unit$7.mo;
unit$6.woche = unit$7.w;
unit$6.tag = unit$6.t = unit$7.d;
unit$6.stunde = unit$7.h;
unit$6.minute = unit$7.m;
unit$6.sekunde = unit$7.s;
unit$6.millisekunde = unit$7.ms;
unit$6.mikrosekunde = unit$7.us;
unit$6.nanosekunde = unit$7.ns;

unit$6.group = '.';
unit$6.decimal = ',';

const unit$5 = Object.create(unit$7);

unit$5.año = unit$5.a = unit$7.y;
unit$5.mes = unit$7.mo;
unit$5.semana = unit$7.w;
unit$5.día = unit$7.d;
unit$5.hora = unit$7.h;
unit$5.minuto = unit$7.m;
unit$5.segundo = unit$7.s;
unit$5.milisegundo = unit$7.ms;
unit$5.microsegundo = unit$7.us;
unit$5.nanosegundo = unit$7.ns;

unit$5.group = '.';
unit$5.decimal = ',';

const unit$4 = Object.create(unit$7);

unit$4.année = unit$4.an = unit$4.a = unit$7.y;
unit$4.mois = unit$7.mo;
unit$4.semaine = unit$4.sem = unit$7.w;
unit$4.jour = unit$4.j = unit$7.d;
unit$4.heure = unit$7.h;
unit$4.minute = unit$7.m;
unit$4.seconde = unit$7.s;
unit$4.milliseconde = unit$7.ms;
unit$4.microseconde = unit$7.us;
unit$4.nanoseconde = unit$7.ns;

unit$4.group = ' ';
unit$4.decimal = ',';

const unit$3 = Object.create(unit$7);

unit$3.年 = unit$3.年間 = unit$7.y;
unit$3.月 = unit$3.ヶ月 = unit$7.mo;
unit$3.週 = unit$3.週間 = unit$7.w;
unit$3.日 = unit$7.d;
unit$3.時間 = unit$3.時 = unit$7.h;
unit$3.分 = unit$3.分間 = unit$7.m;
unit$3.秒 = unit$3.秒間 = unit$7.s;
unit$3.ミリ秒 = unit$7.ms;
unit$3.マイクロ秒 = unit$7.us;
unit$3.ナノ秒 = unit$7.ns;

unit$3.group = ',';
unit$3.decimal = '.';

const unit$2 = Object.create(unit$7);

unit$2.ano = unit$2.a = unit$7.y;
unit$2.mês = unit$2.mes = unit$7.mo;
unit$2.semana = unit$2.sem = unit$7.w;
unit$2.dia = unit$7.d;
unit$2.hora = unit$7.h;
unit$2.minuto = unit$7.m;
unit$2.segundo = unit$2.seg = unit$7.s;
unit$2.milissegundo = unit$7.ms;
unit$2.microssegundo = unit$7.us;
unit$2.nanossegundo = unit$7.ns;

unit$2.group = '.';
unit$2.decimal = ',';

const unit$1 = Object.create(unit$7);

unit$1.год = unit$1.г = unit$7.y;
unit$1.месяц = unit$1.мес = unit$7.mo;
unit$1.неделя = unit$1.нед = unit$7.w;
unit$1.день = unit$1.д = unit$7.d;
unit$1.час = unit$1.ч = unit$7.h;
unit$1.минута = unit$1.мин = unit$7.m;
unit$1.секунда = unit$1.сек = unit$7.s;
unit$1.миллисекунда = unit$1.мс = unit$7.ms;
unit$1.микросекунда = unit$1.мкс = unit$7.us;
unit$1.наносекунда = unit$1.нс = unit$7.ns;

unit$1.group = ' ';
unit$1.decimal = ',';

const unit = Object.create(unit$7);

unit.年 = unit$7.y;
unit.月 = unit$7.mo;
unit.周 = unit.星期 = unit$7.w;
unit.天 = unit.日 = unit$7.d;
unit.小时 = unit.时 = unit$7.h;
unit.分钟 = unit.分 = unit$7.m;
unit.秒 = unit.秒钟 = unit$7.s;
unit.毫秒 = unit$7.ms;
unit.微秒 = unit$7.us;
unit.纳秒 = unit$7.ns;

unit.group = ',';
unit.decimal = '.';

const units = {
    de: unit$6,
    en: unit$7,
    es: unit$5,
    fr: unit$4,
    ja: unit$3,
    pt: unit$2,
    ru: unit$1,
    zh: unit,
};
const parseDuration = (input, format, locale) => {
    if (input === undefined)
        return undefined;
    locale = locale.toLocaleLowerCase();
    locale = locale.startsWith('en') ? 'en' : locale;
    if (locale && locale in units) {
        parse.unit = units[locale];
    }
    else {
        console.warn(`button-card: parseDuration does not support locale '${locale}'`);
    }
    const result = parse(input, format);
    return result !== null && result !== void 0 ? result : undefined;
};

function getTemplateHelpers(ctx) {
    const localize = (stateObj, state, _numeric_precision, show_units = true, units) => {
        return computeStateDisplay(ctx.hass.localize, stateObj, ctx.hass.locale, ctx.hass.config, ctx.hass.entities, { show_units, units }, state);
    };
    return {
        localize,
        formatDateTime: (datetime) => formatDateTime(new Date(datetime), ctx.hass.locale, ctx.hass.config),
        formatShortDateTimeWithYear: (datetime) => formatShortDateTimeWithYear(new Date(datetime), ctx.hass.locale, ctx.hass.config),
        formatShortDateTime: (datetime) => formatShortDateTime(new Date(datetime), ctx.hass.locale, ctx.hass.config),
        formatDateTimeWithSeconds: (datetime) => formatDateTimeWithSeconds(new Date(datetime), ctx.hass.locale, ctx.hass.config),
        formatDateTimeNumeric: (datetime) => formatDateTimeNumeric(new Date(datetime), ctx.hass.locale, ctx.hass.config),
        relativeTime: (date) => {
            if (date) {
                return b `<ha-relative-time
          .hass="${ctx.hass}"
          .datetime="${date}"
          capitalize
        ></ha-relative-time>`;
            }
            return '';
        },
        formatTime: (time) => formatTime(new Date(time), ctx.hass.locale, ctx.hass.config),
        formatTimeWithSeconds: (time) => formatTimeWithSeconds(new Date(time), ctx.hass.locale, ctx.hass.config),
        formatTimeWeekday: (time) => formatTimeWeekday(new Date(time), ctx.hass.locale, ctx.hass.config),
        formatTime24h: (time) => formatTime24h(new Date(time), ctx.hass.locale, ctx.hass.config),
        formatDateWeekdayDay: (date) => formatDateWeekdayDay(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDate: (date) => formatDate(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateNumeric: (date) => formatDateNumeric(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateShort: (date) => formatDateShort(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateMonthYear: (date) => formatDateMonthYear(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateMonth: (date) => formatDateMonth(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateYear: (date) => formatDateYear(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateWeekday: (date) => formatDateWeekday(new Date(date), ctx.hass.locale, ctx.hass.config),
        formatDateWeekdayShort: (date) => formatDateWeekdayShort(new Date(date), ctx.hass.locale, ctx.hass.config),
        parseDuration: (duration, format, locale) => { var _a; if (format === void 0) { format = 'ms'; } if (locale === void 0) { locale = (_a = ctx.hass.locale) === null || _a === void 0 ? void 0 : _a.language; } return parseDuration(duration, format, locale); },
    };
}
function evalTemplate(ctx, state, func) {
    try {
        return new Function('states', 'entity', 'user', 'hass', 'variables', 'html', 'helpers', `'use strict'; ${func}`).call(null, ctx.pStates, state, ctx.hass.user, ctx.pHass, ctx.pVariables, b, getTemplateHelpers(ctx));
    }
    catch (e) {
        const funcTrimmed = func.length <= 100 ? func.trim() : `${func.trim().substring(0, 98)}...`;
        e.message = `${e.name}: ${e.message} in '${funcTrimmed}'`;
        e.name = 'AdvancedEntitiesJSTemplateError';
        throw e;
    }
}
function getTemplateOrValue(ctx, state, value) {
    if (['number', 'boolean', 'function'].includes(typeof value))
        return value;
    if (!value)
        return value;
    if (typeof value === 'object') {
        Object.keys(value).forEach((key) => {
            value[key] = getTemplateOrValue(ctx, state, value[key]);
        });
        return value;
    }
    const trimmed = value.trim();
    const rx = new RegExp('^(\\[{3,})(.*?)(\\]{3,})$', 's');
    const match = trimmed.match(rx);
    if (match && match.length === 4) {
        if (match[1].length === 3 && match[3].length === 3) {
            return evalTemplate(ctx, state, match[2]);
        }
        else if (match[1].length === match[3].length) {
            return trimmed.slice(1, -1);
        }
        else {
            return value;
        }
    }
    else {
        return value;
    }
}
function objectEvalTemplate(ctx, state, obj) {
    const objClone = index(obj);
    return getTemplateOrValue(ctx, state, objClone);
}

function configFromTemplates(ll, config) {
    const tpl = config.template;
    let result = {};
    if (!tpl) {
        result = index(config);
    }
    else {
        let mergedStateConfig;
        const tpls = tpl && Array.isArray(tpl) ? tpl : [tpl];
        tpls === null || tpls === void 0 ? void 0 : tpls.forEach((template) => {
            var _a, _b;
            // Support both advanced_entities_templates and button_card_templates
            const templates = ((_a = ll === null || ll === void 0 ? void 0 : ll.config) === null || _a === void 0 ? void 0 : _a.advanced_entities_templates) ||
                ((_b = ll === null || ll === void 0 ? void 0 : ll.config) === null || _b === void 0 ? void 0 : _b.button_card_templates);
            if (!(templates === null || templates === void 0 ? void 0 : templates[template]))
                throw new Error(`advanced-entities: template '${template}' is missing!`);
            const res = configFromTemplates(ll, templates[template]);
            result = mergeDeep(result, res);
            mergedStateConfig = mergeStatesById(mergedStateConfig, res.state);
        });
        result = mergeDeep(result, config);
        result.state = mergeStatesById(mergedStateConfig, config.state);
    }
    return result;
}
function resolveConfig(config) {
    var _a;
    const ll = getLovelace() || getLovelaceCast();
    let resolved = index(config);
    // Resolve templates for the main row config
    resolved = configFromTemplates(ll, resolved);
    // Resolve templates for each sub-entity
    if (resolved.entities) {
        resolved.entities = resolved.entities.map((entity) => {
            if (typeof entity === 'string')
                return entity;
            if (entity.template) {
                return configFromTemplates(ll, entity);
            }
            return entity;
        });
    }
    // Resolve templates for secondary_info if it's an object with a template
    if (typeof resolved.secondary_info === 'object' && ((_a = resolved.secondary_info) === null || _a === void 0 ? void 0 : _a.template)) {
        resolved.secondary_info = configFromTemplates(ll, resolved.secondary_info);
    }
    return resolved;
}

function getMatchingConfigState(ctx, stateConfigs, state) {
    if (!stateConfigs) {
        return undefined;
    }
    const hasTemplate = stateConfigs.find((elt) => elt.operator === 'template');
    if (!state && !hasTemplate) {
        return undefined;
    }
    let def;
    const retval = stateConfigs.find((elt) => {
        if (elt.operator) {
            switch (elt.operator) {
                case '==':
                    return state && state.state == getTemplateOrValue(ctx, state, elt.value);
                case '<=':
                    return state && state.state <= getTemplateOrValue(ctx, state, elt.value);
                case '<':
                    return state && state.state < getTemplateOrValue(ctx, state, elt.value);
                case '>=':
                    return state && state.state >= getTemplateOrValue(ctx, state, elt.value);
                case '>':
                    return state && state.state > getTemplateOrValue(ctx, state, elt.value);
                case '!=':
                    return state && state.state != getTemplateOrValue(ctx, state, elt.value);
                case 'regex': {
                    const matches = state && state.state.match(getTemplateOrValue(ctx, state, elt.value)) ? true : false;
                    return matches;
                }
                case 'template': {
                    return getTemplateOrValue(ctx, state, elt.value);
                }
                case 'default':
                    def = elt;
                    return false;
                default:
                    return false;
            }
        }
        else {
            return state && getTemplateOrValue(ctx, state, elt.value) == state.state;
        }
    });
    if (!retval && def) {
        return def;
    }
    return retval;
}

function buildStyleGeneric(ctx, state, baseStyles, configState, styleType) {
    var _a;
    let style = {};
    if (baseStyles === null || baseStyles === void 0 ? void 0 : baseStyles[styleType]) {
        style = Object.assign(style, ...baseStyles[styleType]);
    }
    if ((_a = configState === null || configState === void 0 ? void 0 : configState.styles) === null || _a === void 0 ? void 0 : _a[styleType]) {
        let configStateStyle = {};
        configStateStyle = Object.assign(configStateStyle, ...configState.styles[styleType]);
        style = Object.assign(Object.assign({}, style), configStateStyle);
    }
    Object.keys(style).forEach((key) => {
        style[key] = getTemplateOrValue(ctx, state, style[key]);
    });
    return style;
}

const VERSION = '1.0.0';
console.info(`%c ADVANCED-ENTITIES %c v${VERSION} `, 'color: cyan; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'advanced-entities-row',
    name: 'Advanced Entities Row',
    preview: false,
    description: 'An advanced entities row with template support, state conditions, and button-card styling',
});
// Register custom action handler for javascript/multi-actions/toast
if (!window.advancedEntitiesCustomActionsHandler) {
    window.advancedEntitiesCustomActionsHandler = function (ev) {
        var _a;
        if (ev.detail.advancedEntitiesCustomAction) {
            (_a = ev.detail.advancedEntitiesCustomAction) === null || _a === void 0 ? void 0 : _a.callback(ev);
        }
    };
    document.body.addEventListener('ll-custom', window.advancedEntitiesCustomActionsHandler);
}
const SECONDARY_INFO_VALUES = ['last-changed', 'last-updated', 'last-triggered', 'position', 'tilt-position', 'brightness'];
const TIMESTAMP_FORMATS = ['relative', 'total', 'date', 'time', 'datetime'];
const LAST_CHANGED = 'last-changed';
const LAST_UPDATED = 'last-updated';
let AdvancedEntitiesRow = class AdvancedEntitiesRow extends i$2 {
    constructor() {
        super(...arguments);
        this._evaluatedVariables = {};
        this._monitoredEntities = [];
        this._entityIds = [];
        this._initialSetupComplete = false;
        this._entities = [];
    }
    static get styles() {
        return styles;
    }
    setConfig(config) {
        if (!config || !config.entity) {
            throw new Error('Please define a main entity.');
        }
        // Validate sub-entities
        if (config.entities) {
            config.entities.forEach((entity) => {
                if (typeof entity === 'object' && !(entity.entity || entity.attribute || entity.icon)) {
                    throw new Error(`Entity object requires at least one 'entity', 'attribute' or 'icon'.`);
                }
                else if (typeof entity === 'string' && entity === '') {
                    throw new Error('Entity ID string must not be blank.');
                }
            });
        }
        // Resolve templates
        const resolved = resolveConfig(config);
        this._entityIds = this._getEntityIds(resolved);
        this._config = Object.assign(Object.assign({}, resolved), { name: resolved.name === false ? ' ' : resolved.name });
        this._initialSetupComplete = false;
    }
    set hass(hass) {
        this._hass = hass;
        if (!this._pStates) {
            this._pStates = this._createStateProxy();
        }
        this._pHass = Object.assign(Object.assign({}, hass), { states: this._pStates });
        if (!this._initialSetupComplete) {
            this._finishSetup();
        }
        if (hass && this._config) {
            this._stateObj = hass.states[this._config.entity];
            // Resolve secondary info state object
            if (typeof this._config.secondary_info === 'object') {
                const secInfo = this._config.secondary_info;
                this._info = secInfo.entity ? hass.states[secInfo.entity] : this._stateObj;
            }
            // Resolve sub-entity state objects
            this._entities = (this._config.entities || []).map((config) => {
                const conf = typeof config === 'string' ? { entity: config } : config;
                return Object.assign(Object.assign({}, conf), { stateObj: conf.entity ? hass.states[conf.entity] : this._stateObj });
            });
        }
    }
    _finishSetup() {
        if (!this._hass || !this._config || this._initialSetupComplete)
            return;
        this._pVariables = this._createVariablesProxy(index(this._config.variables));
        // Set default tap_action based on entity domain
        if (!this._config.tap_action) {
            if (this._config.entity && DOMAINS_TOGGLE.has(computeDomain(this._config.entity))) {
                this._config = Object.assign({ tap_action: { action: 'toggle' } }, this._config);
            }
            else if (this._config.entity) {
                this._config = Object.assign({ tap_action: { action: 'more-info' } }, this._config);
            }
            else {
                this._config = Object.assign({ tap_action: { action: 'none' } }, this._config);
            }
        }
        if (!this._config.hold_action) {
            this._config.hold_action = { action: 'none' };
        }
        if (!this._config.double_tap_action) {
            this._config.double_tap_action = { action: 'none' };
        }
        this._initialSetupComplete = true;
    }
    _createStateProxy() {
        return new Proxy({}, {
            get: (__target, prop) => {
                var _a, _b;
                if (prop.includes('.') && !this._monitoredEntities.includes(prop)) {
                    this._monitoredEntities.push(prop);
                }
                return (_b = (_a = this._hass) === null || _a === void 0 ? void 0 : _a.states) === null || _b === void 0 ? void 0 : _b[prop];
            },
            has: (__target, prop) => {
                var _a, _b;
                return !!((_b = (_a = this._hass) === null || _a === void 0 ? void 0 : _a.states) === null || _b === void 0 ? void 0 : _b[prop]);
            },
            ownKeys: () => {
                if (!this._hass || !this._hass.states)
                    return [];
                return Object.keys(this._hass.states);
            },
            getOwnPropertyDescriptor: (__target, prop) => {
                var _a, _b;
                return {
                    value: (_b = (_a = this._hass) === null || _a === void 0 ? void 0 : _a.states) === null || _b === void 0 ? void 0 : _b[prop],
                    enumerable: true,
                    configurable: true,
                };
            },
        });
    }
    _createVariablesProxy(variables) {
        if (!variables)
            return {};
        this._evaluatedVariables = {};
        return new Proxy(variables, {
            get: (__target, prop) => {
                var _a;
                if (prop in this._evaluatedVariables && 'value' in this._evaluatedVariables[prop]) {
                    return this._evaluatedVariables[prop].value;
                }
                else if (prop in __target) {
                    if ((_a = this._evaluatedVariables[prop]) === null || _a === void 0 ? void 0 : _a.loop) {
                        throw new Error(`advanced-entities: Detected a loop while evaluating variable "${prop}"`);
                    }
                    this._evaluatedVariables[prop] = { loop: true };
                    const origin = Reflect.get(__target, prop);
                    const ctx = this._getTemplateContext();
                    if (typeof origin === 'object' && origin !== null && 'value' in origin) {
                        this._evaluatedVariables[prop].value = objectEvalTemplate(ctx, this._stateObj, origin.value);
                    }
                    else {
                        this._evaluatedVariables[prop].value = objectEvalTemplate(ctx, this._stateObj, origin);
                    }
                    delete this._evaluatedVariables[prop].loop;
                    return this._evaluatedVariables[prop].value;
                }
                else {
                    return undefined;
                }
            },
        });
    }
    _getTemplateContext() {
        return {
            hass: this._hass,
            pHass: this._pHass,
            pStates: this._pStates,
            stateObj: this._stateObj,
            pVariables: this._pVariables,
            evaluatedVariables: this._evaluatedVariables,
        };
    }
    _getEntityIds(config) {
        var _a;
        const ids = [config.entity];
        if (typeof config.secondary_info === 'object' && ((_a = config.secondary_info) === null || _a === void 0 ? void 0 : _a.entity)) {
            ids.push(config.secondary_info.entity);
        }
        if (config.entities) {
            config.entities.forEach((entity) => {
                if (typeof entity === 'string') {
                    ids.push(entity);
                }
                else if (entity.entity) {
                    ids.push(entity.entity);
                }
            });
        }
        return ids.filter(Boolean);
    }
    shouldUpdate(changedProps) {
        if (changedProps.has('_config')) {
            return true;
        }
        const oldHass = changedProps.get('_hass');
        if (oldHass) {
            // Check static entity IDs
            if (this._entityIds.some((entity) => oldHass.states[entity] !== this._hass.states[entity])) {
                return true;
            }
            // Check dynamically monitored entities (from templates)
            if (this._monitoredEntities.some((entity) => oldHass.states[entity] !== this._hass.states[entity])) {
                return true;
            }
        }
        return false;
    }
    render() {
        if (!this._hass || !this._config)
            return b ``;
        if (!this._stateObj)
            return this._renderWarning();
        const ctx = this._getTemplateContext();
        const configState = getMatchingConfigState(ctx, this._config.state, this._stateObj);
        // Build styles for various parts of the row
        const rowStyle = buildStyleGeneric(ctx, this._stateObj, this._config.styles, configState, 'row');
        // Build the config to pass to hui-generic-entity-row
        // Override name/icon from configState or templates
        const rowConfig = this._buildRowConfig(ctx, configState);
        return b `<hui-generic-entity-row
      .hass="${this._hass}"
      .config="${rowConfig}"
      .secondaryText="${this._renderSecondaryInfo(ctx)}"
      .catchInteraction=${false}
      style=${o(rowStyle)}
    >
      <div class="${this._config.column ? 'entities-column' : 'entities-row'}">
        ${this._entities.map((entity) => this._renderEntity(ctx, entity.stateObj, entity))}
        ${this._renderMainEntity(ctx, configState)}
      </div>
    </hui-generic-entity-row>`;
    }
    _buildRowConfig(ctx, configState) {
        const config = Object.assign({}, this._config);
        // Apply name from state condition or template
        if (configState === null || configState === void 0 ? void 0 : configState.name) {
            config.name = getTemplateOrValue(ctx, this._stateObj, configState.name);
        }
        else if (config.name && config.name !== ' ') {
            config.name = getTemplateOrValue(ctx, this._stateObj, config.name);
        }
        // Apply icon from state condition or template
        if (configState === null || configState === void 0 ? void 0 : configState.icon) {
            config.icon = getTemplateOrValue(ctx, this._stateObj, configState.icon);
        }
        else if (config.icon) {
            config.icon = getTemplateOrValue(ctx, this._stateObj, config.icon);
        }
        return config;
    }
    _renderSecondaryInfo(ctx) {
        var _a;
        if (!((_a = this._config) === null || _a === void 0 ? void 0 : _a.secondary_info))
            return null;
        // Standard HA secondary info types
        if (typeof this._config.secondary_info === 'string') {
            if (SECONDARY_INFO_VALUES.includes(this._config.secondary_info)) {
                return null; // Let hui-generic-entity-row handle it
            }
            // It's a custom string - evaluate as template
            return b `${getTemplateOrValue(ctx, this._stateObj, this._config.secondary_info)}`;
        }
        const secConfig = this._config.secondary_info;
        if (!this._info || this._hideIf(this._info, secConfig))
            return null;
        const name = this._entityName(this._info, secConfig);
        const value = this._entityStateDisplay(this._info, secConfig);
        // Apply secondary_info styles
        const secConfigState = secConfig.state
            ? getMatchingConfigState(ctx, secConfig.state, this._info)
            : undefined;
        const secStyle = buildStyleGeneric(ctx, this._info, secConfig.styles, secConfigState, 'secondary_info');
        return b `<span style=${o(secStyle)}>${name ? `${name} ` : ''}${value}</span>`;
    }
    _renderMainEntity(ctx, configState) {
        if (this._config.show_state === false)
            return null;
        const stateStyle = buildStyleGeneric(ctx, this._stateObj, this._config.styles, configState, 'state');
        // State display: configState.state_display > config.state_display > computed state
        let stateDisplay;
        if (configState === null || configState === void 0 ? void 0 : configState.state_display) {
            stateDisplay = getTemplateOrValue(ctx, this._stateObj, configState.state_display);
        }
        else if (this._config.state_display) {
            stateDisplay = getTemplateOrValue(ctx, this._stateObj, this._config.state_display);
        }
        this._buildMainActionConfig();
        return b `<div
      class="state entity"
      style=${o(stateStyle)}
      .actionHandler=${actionHandler({
            hasHold: this._isActionDoingSomething(this._config.hold_action),
            hasDoubleClick: this._isActionDoingSomething(this._config.double_tap_action),
        })}
      @action=${(ev) => this._handleAction(ev, this._config)}
    >
      ${this._config.state_header && b `<span>${this._config.state_header}</span>`}
      <div>${stateDisplay !== undefined ? stateDisplay : this._renderValue(this._stateObj, this._config)}</div>
    </div>`;
    }
    _renderEntity(ctx, stateObj, config) {
        if (!stateObj || this._hideIf(stateObj, config)) {
            if (config.default) {
                return b `<div class="entity">
          <span>${config.name}</span>
          <div>${config.default}</div>
        </div>`;
            }
            return null;
        }
        // Get matching state config for this sub-entity
        const subConfigState = config.state
            ? getMatchingConfigState(ctx, config.state, stateObj)
            : undefined;
        // Build styles for this sub-entity
        const containerStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'container');
        const nameStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'name');
        const valueStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'value');
        const iconStyle = buildStyleGeneric(ctx, stateObj, config.styles, subConfigState, 'icon');
        // Resolve name from state config or template
        let entityNameStr = this._entityName(stateObj, config);
        if (subConfigState === null || subConfigState === void 0 ? void 0 : subConfigState.name) {
            entityNameStr = getTemplateOrValue(ctx, stateObj, subConfigState.name);
        }
        // Resolve icon from state config
        let entityIcon = config.icon;
        if (subConfigState === null || subConfigState === void 0 ? void 0 : subConfigState.icon) {
            entityIcon = getTemplateOrValue(ctx, stateObj, subConfigState.icon);
        }
        // State display override
        let stateDisplay;
        if (subConfigState === null || subConfigState === void 0 ? void 0 : subConfigState.state_display) {
            stateDisplay = getTemplateOrValue(ctx, stateObj, subConfigState.state_display);
        }
        else if (config.state_display) {
            stateDisplay = getTemplateOrValue(ctx, stateObj, config.state_display);
        }
        const hasActions = this._isActionDoingSomething(config.tap_action) ||
            this._isActionDoingSomething(config.hold_action) ||
            this._isActionDoingSomething(config.double_tap_action);
        return b `<div
      class="entity"
      style=${o(containerStyle)}
      .actionHandler=${actionHandler({
            hasHold: this._isActionDoingSomething(config.hold_action),
            hasDoubleClick: this._isActionDoingSomething(config.double_tap_action),
            disabled: !hasActions && !stateObj.entity_id,
        })}
      @action=${(ev) => this._handleSubEntityAction(ev, config, stateObj)}
    >
      <span style=${o(nameStyle)}>${entityNameStr}</span>
      <div style=${o(valueStyle)}>
        ${stateDisplay !== undefined
            ? stateDisplay
            : entityIcon
                ? this._renderIcon(stateObj, config, entityIcon, iconStyle)
                : this._renderValue(stateObj, config)}
      </div>
    </div>`;
    }
    _renderValue(stateObj, config) {
        var _a, _b;
        if (config.toggle === true) {
            return b `<ha-entity-toggle .stateObj="${stateObj}" .hass="${this._hass}"></ha-entity-toggle>`;
        }
        if (config.attribute && [LAST_CHANGED, LAST_UPDATED].includes(config.attribute)) {
            return b `<ha-relative-time
        .hass=${this._hass}
        .datetime=${stateObj[(_a = config.attribute) === null || _a === void 0 ? void 0 : _a.replace('-', '_')]}
        capitalize
      ></ha-relative-time>`;
        }
        if (config.format && TIMESTAMP_FORMATS.includes(config.format)) {
            const value = config.attribute
                ? (_b = stateObj.attributes[config.attribute]) !== null && _b !== void 0 ? _b : stateObj[config.attribute]
                : stateObj.state;
            const timestamp = new Date(value);
            if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
                return value;
            }
            return b `<hui-timestamp-display
        .hass=${this._hass}
        .ts=${timestamp}
        .format=${config.format}
        capitalize
      ></hui-timestamp-display>`;
        }
        return this._entityStateDisplay(stateObj, config);
    }
    _renderIcon(stateObj, config, icon, iconStyle) {
        const resolvedIcon = icon === true
            ? stateObj.attributes.icon || null
            : icon;
        return b `<state-badge
      class="icon-small"
      .hass=${this._hass}
      .stateObj="${stateObj}"
      .overrideIcon="${resolvedIcon}"
      .stateColor="${config.state_color}"
      style=${o(iconStyle)}
    ></state-badge>`;
    }
    _renderWarning() {
        return b `<hui-warning>
      ${this._hass.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this._config.entity)}
    </hui-warning>`;
    }
    // ============================================================================
    // Entity helpers (adapted from multiple-entity-row)
    // ============================================================================
    _entityName(stateObj, config) {
        var _a;
        if (config.name === false)
            return null;
        return (config.name ||
            (config.entity
                ? ((_a = stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) || computeEntity((stateObj === null || stateObj === void 0 ? void 0 : stateObj.entity_id) || '')
                : null) ||
            null);
    }
    _entityStateDisplay(stateObj, config) {
        if (isUnavailable(stateObj)) {
            return this._hass.localize(`state.default.${stateObj.state}`);
        }
        let value = config.attribute ? stateObj.attributes[config.attribute] : stateObj.state;
        let unit = config.unit === false
            ? undefined
            : config.attribute !== undefined
                ? config.unit
                : config.unit || stateObj.attributes.unit_of_measurement;
        if (config.format) {
            if (isNaN(parseFloat(value)) || !isFinite(value)) ;
            else if (config.format === 'brightness') {
                value = Math.round((value / 255) * 100);
                unit = '%';
            }
            else if (config.format === 'duration') {
                value = secondsToDuration(value);
                unit = undefined;
            }
            else if (config.format === 'duration-m') {
                value = secondsToDuration(value / 1000);
                unit = undefined;
            }
            else if (config.format === 'duration-h') {
                value = secondsToDuration(value * 3600);
                unit = undefined;
            }
            else if (config.format.startsWith('precision')) {
                const precision = parseInt(config.format.slice(-1), 10);
                value = parseFloat(value).toFixed(precision);
            }
            else if (config.format === 'kilo') {
                value = (value / 1000).toFixed(2);
            }
            else if (config.format === 'invert') {
                value = (value - value * 2).toString();
            }
            else if (config.format === 'position') {
                value = (100 - value).toString();
            }
            return `${value}${unit ? ` ${unit}` : ''}`;
        }
        if (config.attribute) {
            return `${isNaN(value) ? value : value}${unit ? ` ${unit}` : ''}`;
        }
        const modifiedStateObj = Object.assign(Object.assign({}, stateObj), { attributes: Object.assign(Object.assign({}, stateObj.attributes), { unit_of_measurement: unit }) });
        return computeStateDisplay(this._hass.localize, modifiedStateObj, this._hass.locale, this._hass.config, this._hass.entities, undefined);
    }
    // ============================================================================
    // Hide logic (from multiple-entity-row)
    // ============================================================================
    _hideIf(stateObj, config) {
        if (config.hide_unavailable && isUnavailable(stateObj)) {
            return true;
        }
        if (config.hide_unavailable && config.attribute &&
            ![LAST_CHANGED, LAST_UPDATED].includes(config.attribute) &&
            (stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes[config.attribute]) === undefined) {
            return true;
        }
        if (config.hide_if === undefined)
            return false;
        const value = config.attribute ? stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes[config.attribute] : stateObj === null || stateObj === void 0 ? void 0 : stateObj.state;
        let hideValues = [];
        if (typeof config.hide_if === 'object' && !Array.isArray(config.hide_if)) {
            const hideObj = config.hide_if;
            if (hideObj.below !== undefined && value < hideObj.below)
                return true;
            if (hideObj.above !== undefined && value > hideObj.above)
                return true;
            if (hideObj.value) {
                hideValues = hideValues.concat(hideObj.value);
            }
        }
        else {
            hideValues = hideValues.concat(config.hide_if);
        }
        return hideValues.some((hideValue) => typeof hideValue === 'number' ? hideValue === +value : hideValue === value);
    }
    // ============================================================================
    // Action handling (from button-card)
    // ============================================================================
    _isActionDoingSomething(action) {
        if (!action)
            return false;
        if (typeof action === 'string')
            return true;
        return action.action !== 'none';
    }
    _buildMainActionConfig() {
        const config = this._config;
        if (!config.tap_action || !this._isActionDoingSomething(config.tap_action)) {
            // Default: more-info for the entity
            return {
                entity: config.entity,
                [NORMALISED_ACTION]: { action: 'more-info' },
            };
        }
        return this._evalActions(config, config.tap_action);
    }
    _handleAction(ev, config) {
        var _a;
        if (!((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.action))
            return;
        const action = ev.detail.action;
        const actionKey = `${action}_action`;
        const actionConfig = config[actionKey];
        if (actionConfig && this._isActionDoingSomething(actionConfig)) {
            const localAction = this._evalActions(config, actionConfig);
            this._executeAction(localAction);
        }
    }
    _handleSubEntityAction(ev, config, stateObj) {
        var _a;
        if (!((_a = ev.detail) === null || _a === void 0 ? void 0 : _a.action))
            return;
        const action = ev.detail.action;
        const actionKey = `${action}_action`;
        const actionConfig = config[actionKey];
        if (actionConfig && this._isActionDoingSomething(actionConfig)) {
            const localAction = this._evalActions(config, actionConfig);
            this._executeAction(localAction);
        }
        else if (action === 'tap' && stateObj.entity_id) {
            // Default: more-info
            fireEvent(this, 'hass-action', {
                config: { entity: stateObj.entity_id, tap_action: { action: 'more-info' } },
                action: 'tap',
            });
        }
    }
    _evalActions(config, action) {
        var _a, _b;
        const ctx = this._getTemplateContext();
        let evaledActionConfig;
        if (typeof action === 'string') {
            evaledActionConfig = objectEvalTemplate(ctx, this._stateObj, action);
        }
        else {
            evaledActionConfig = index(action);
        }
        const actionType = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.action);
        if (actionType === 'none' || !actionType) {
            const noAction = {};
            noAction[NORMALISED_ACTION] = { action: 'none' };
            return noAction;
        }
        const repeat = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.repeat);
        const repeat_limit = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.repeat_limit);
        const sound = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.sound);
        let confirmation = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.confirmation);
        if (!confirmation && config.confirmation) {
            confirmation = objectEvalTemplate(ctx, this._stateObj, config.confirmation);
        }
        const haptic = getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.haptic);
        const actionData = {};
        switch (actionType) {
            case 'javascript':
                actionData[NORMALISED_ACTION] = {
                    action: 'fire-dom-event',
                    advancedEntitiesCustomAction: {
                        callback: this._customActionsCallback.bind(this),
                        type: 'javascript',
                        data: {
                            javascript: evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.javascript,
                        },
                    },
                };
                break;
            case 'multi-actions':
                actionData[NORMALISED_ACTION] = {
                    action: 'fire-dom-event',
                    advancedEntitiesCustomAction: {
                        callback: this._customActionsCallback.bind(this),
                        type: 'multi-actions',
                        data: {
                            multiActions: evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.actions,
                        },
                    },
                };
                break;
            case 'toast':
                actionData[NORMALISED_ACTION] = {
                    action: 'fire-dom-event',
                    advancedEntitiesCustomAction: {
                        callback: this._customActionsCallback.bind(this),
                        type: 'toast',
                        data: {
                            toast: evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.toast,
                        },
                    },
                };
                break;
            case 'toggle':
                actionData.entity =
                    getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.entity) ||
                        getTemplateOrValue(ctx, this._stateObj, config.entity);
                actionData[NORMALISED_ACTION] = { action: 'toggle' };
                break;
            case 'more-info':
                actionData.entity =
                    getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.entity) ||
                        getTemplateOrValue(ctx, this._stateObj, config.entity);
                actionData[NORMALISED_ACTION] = { action: 'more-info' };
                break;
            case 'navigate':
                actionData[NORMALISED_ACTION] = {
                    action: 'navigate',
                    navigation_path: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.navigation_path),
                    navigation_replace: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.navigation_replace),
                };
                break;
            case 'url':
                actionData[NORMALISED_ACTION] = {
                    action: 'url',
                    url_path: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.url_path),
                };
                break;
            case 'perform-action':
            case 'call-service':
                actionData[NORMALISED_ACTION] = {
                    action: 'perform-action',
                    perform_action: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.perform_action) ||
                        getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.service),
                    data: objectEvalTemplate(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.data) ||
                        objectEvalTemplate(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.service_data),
                    target: objectEvalTemplate(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.target),
                };
                if (((_b = (_a = actionData[NORMALISED_ACTION]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.entity_id) === 'entity') {
                    actionData[NORMALISED_ACTION].data.entity_id = getTemplateOrValue(ctx, this._stateObj, config.entity);
                }
                break;
            case 'assist':
                actionData[NORMALISED_ACTION] = {
                    action: 'assist',
                    pipeline_id: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.pipeline_id),
                    start_listening: getTemplateOrValue(ctx, this._stateObj, evaledActionConfig === null || evaledActionConfig === void 0 ? void 0 : evaledActionConfig.start_listening),
                };
                break;
            case 'fire-dom-event':
                actionData[NORMALISED_ACTION] = Object.assign({ action: 'fire-dom-event' }, objectEvalTemplate(ctx, this._stateObj, evaledActionConfig));
                break;
            default:
                return { [NORMALISED_ACTION]: { action: 'none' } };
        }
        actionData[NORMALISED_ACTION] = Object.assign(Object.assign({}, actionData[NORMALISED_ACTION]), { repeat,
            repeat_limit,
            sound,
            haptic,
            confirmation });
        return actionData;
    }
    _executeAction(actionData) {
        var _a;
        const action = actionData[NORMALISED_ACTION];
        if (!action || action.action === 'none')
            return;
        // Play sound if specified
        if (action.sound) {
            const sound = new Audio(action.sound);
            sound.play().catch(() => { });
        }
        // Haptic feedback
        if (action.haptic && action.haptic !== 'none') {
            forwardHaptic(this, action.haptic);
        }
        // Confirmation dialog
        if (action.confirmation) {
            const text = typeof action.confirmation === 'string'
                ? action.confirmation
                : ((_a = action.confirmation) === null || _a === void 0 ? void 0 : _a.text) || 'Are you sure?';
            if (!confirm(text))
                return;
        }
        // Fire the action via hass-action
        handleAction(this, this._hass, actionData, 'tap');
    }
    _customActionsCallback(ev) {
        var _a, _b, _c;
        const customAction = ev.detail.advancedEntitiesCustomAction;
        if (!customAction)
            return;
        const ctx = this._getTemplateContext();
        if (customAction.type === 'javascript') {
            const javascript = getTemplateOrValue(ctx, this._stateObj, (_a = customAction.data) === null || _a === void 0 ? void 0 : _a.javascript);
            if (javascript) {
                // eslint-disable-next-line no-new-func
                new Function('states', 'entity', 'user', 'hass', 'variables', 'html', `'use strict'; ${javascript}`).call(null, this._pStates, this._stateObj, this._hass.user, this._pHass, this._pVariables, b);
            }
        }
        else if (customAction.type === 'multi-actions') {
            let multiActions = (_b = customAction.data) === null || _b === void 0 ? void 0 : _b.multiActions;
            if (multiActions) {
                multiActions = objectEvalTemplate(ctx, this._stateObj, multiActions);
                this._executeMultiActions(multiActions);
            }
        }
        else if (customAction.type === 'toast') {
            let toast = (_c = customAction.data) === null || _c === void 0 ? void 0 : _c.toast;
            if (toast) {
                toast = objectEvalTemplate(ctx, this._stateObj, toast);
                this._sendToastMessage(toast);
            }
        }
    }
    async _executeMultiActions(actions) {
        const ctx = this._getTemplateContext();
        for (const actionConfig of actions) {
            if (actionConfig.delay !== undefined) {
                const delayConfig = actionConfig;
                let delay = getTemplateOrValue(ctx, this._stateObj, delayConfig.delay);
                if (typeof delay === 'string') {
                    delay = parseDuration(delay, 'ms', 'en') || 0;
                }
                const timeout = getTemplateOrValue(ctx, this._stateObj, delayConfig.timeout);
                if (!getTemplateOrValue(ctx, this._stateObj, delayConfig.wait_completion)) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
                else {
                    await new Promise((resolve) => setTimeout(resolve, timeout ? (typeof timeout === 'string' ? parseDuration(timeout, 'ms', 'en') || delay : timeout) : delay));
                }
            }
            else {
                const actionData = this._evalActions(this._config, actionConfig);
                this._executeAction(actionData);
            }
        }
    }
    _sendToastMessage(params) {
        fireEvent(this, 'hass-notification', {
            message: params.message || '',
            duration: params.duration || 3000,
            dismissable: params.dismissable !== false,
        });
    }
};
__decorate([
    n$1()
], AdvancedEntitiesRow.prototype, "_hass", void 0);
__decorate([
    n$1()
], AdvancedEntitiesRow.prototype, "_config", void 0);
AdvancedEntitiesRow = __decorate([
    t$1('advanced-entities-row')
], AdvancedEntitiesRow);
//# sourceMappingURL=advanced-entities-row.js.map
