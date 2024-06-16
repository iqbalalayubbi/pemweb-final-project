/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@editorjs/nested-list@1.4.2/dist/nested-list.umd.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.cdx-nested-list{margin:0;padding:0;outline:none;counter-reset:item;list-style:none}.cdx-nested-list__item{line-height:1.6em;display:flex;margin:2px 0}.cdx-nested-list__item [contenteditable]{outline:none}.cdx-nested-list__item-body{flex-grow:2}.cdx-nested-list__item-content,.cdx-nested-list__item-children{flex-basis:100%}.cdx-nested-list__item-content{word-break:break-word;white-space:pre-wrap}.cdx-nested-list__item:before{counter-increment:item;margin-right:5px;white-space:nowrap}.cdx-nested-list--ordered>.cdx-nested-list__item:before{content:counters(item,".") ". "}.cdx-nested-list--unordered>.cdx-nested-list__item:before{content:"•"}.cdx-nested-list__settings{display:flex}.cdx-nested-list__settings .cdx-settings-button{width:50%}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
(function(a,u){typeof exports=="object"&&typeof module<"u"?module.exports=u():typeof define=="function"&&define.amd?define(u):(a=typeof globalThis<"u"?globalThis:a||self,a.NestedList=u())})(this,function(){"use strict";function a(h,e=null,t={}){const r=document.createElement(h);Array.isArray(e)?r.classList.add(...e):e&&r.classList.add(e);for(const n in t)r[n]=t[n];return r}function u(h){const e=a("div");return e.appendChild(h),e.innerHTML}function g(h){let e;return h.nodeType!==Node.ELEMENT_NODE?e=h.textContent:(e=h.innerHTML,e=e.replaceAll("<br>","")),e.trim().length===0}class d{constructor(){this.savedFakeCaret=void 0}save(){const e=d.range,t=a("span");t.hidden=!0,e.insertNode(t),this.savedFakeCaret=t}restore(){if(!this.savedFakeCaret)return;const e=window.getSelection(),t=new Range;t.setStartAfter(this.savedFakeCaret),t.setEndAfter(this.savedFakeCaret),e.removeAllRanges(),e.addRange(t),setTimeout(()=>{this.savedFakeCaret.remove()},150)}static get range(){const e=window.getSelection();return e&&e.rangeCount?e.getRangeAt(0):null}static extractFragmentFromCaretPositionTillTheEnd(){const e=window.getSelection();if(!e.rangeCount)return;const t=e.getRangeAt(0);let r=t.startContainer;r.nodeType!==Node.ELEMENT_NODE&&(r=r.parentNode);const n=r.closest("[contenteditable]");t.deleteContents();const s=t.cloneRange();return s.selectNodeContents(n),s.setStart(t.endContainer,t.endOffset),s.extractContents()}static focus(e,t=!0){const r=document.createRange(),n=window.getSelection();r.selectNodeContents(e),r.collapse(t),n.removeAllRanges(),n.addRange(r)}static isAtStart(){const e=window.getSelection();if(e.focusOffset>0)return!1;const t=e.focusNode;return d.getHigherLevelSiblings(t,"left").every(s=>g(s))}static getHigherLevelSiblings(e,t="left"){let r=e;const n=[];for(;r.parentNode&&r.parentNode.contentEditable!=="true";)r=r.parentNode;const s=t==="left"?"previousSibling":"nextSibling";for(;r[s];)r=r[s],n.push(r);return n}}const C='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="9" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 17H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 12H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 7H4.99002"/></svg>',S='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="12" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.79999 14L7.79999 7.2135C7.79999 7.12872 7.7011 7.0824 7.63597 7.13668L4.79999 9.5"/></svg>',w="";class m{static get isReadOnlySupported(){return!0}static get enableLineBreaks(){return!0}static get toolbox(){return{icon:S,title:"List"}}constructor({data:e,config:t,api:r,readOnly:n}){this.nodes={wrapper:null},this.api=r,this.readOnly=n,this.config=t,this.defaultListStyle=this.config.defaultStyle==="ordered"?"ordered":"unordered";const s={style:this.defaultListStyle,items:[]};this.data=e&&Object.keys(e).length?e:s,this.caret=new d}render(){return this.nodes.wrapper=this.makeListWrapper(this.data.style,[this.CSS.baseBlock]),this.data.items.length?this.appendItems(this.data.items,this.nodes.wrapper):this.appendItems([{content:"",items:[]}],this.nodes.wrapper),this.readOnly||this.nodes.wrapper.addEventListener("keydown",e=>{switch(e.key){case"Enter":this.enterPressed(e);break;case"Backspace":this.backspace(e);break;case"Tab":e.shiftKey?this.shiftTab(e):this.addTab(e);break}},!1),this.nodes.wrapper}renderSettings(){return[{name:"unordered",label:this.api.i18n.t("Unordered"),icon:C},{name:"ordered",label:this.api.i18n.t("Ordered"),icon:S}].map(t=>({name:t.name,icon:t.icon,label:t.label,isActive:this.data.style===t.name,closeOnActivate:!0,onActivate:()=>{this.listStyle=t.name}}))}static get pasteConfig(){return{tags:["OL","UL","LI"]}}onPaste(e){const t=e.detail.data;this.data=this.pasteHandler(t);const r=this.nodes.wrapper;r&&r.parentNode.replaceChild(this.render(),r)}pasteHandler(e){const{tagName:t}=e;let r,n;switch(t){case"OL":r="ordered",n="ol";break;case"UL":case"LI":r="unordered",n="ul"}const s={style:r,items:[]},o=c=>Array.from(c.querySelectorAll(":scope > li")).map(i=>{var f;const l=i.querySelector(`:scope > ${n}`),y=l?o(l):[];return{content:((f=i==null?void 0:i.firstChild)==null?void 0:f.textContent)||"",items:y}});return s.items=o(e),s}appendItems(e,t){e.forEach(r=>{const n=this.createItem(r.content,r.items);t.appendChild(n)})}createItem(e,t=[]){const r=a("li",this.CSS.item),n=a("div",this.CSS.itemBody),s=a("div",this.CSS.itemContent,{innerHTML:e,contentEditable:!this.readOnly});return n.appendChild(s),r.appendChild(n),t&&t.length>0&&this.addChildrenList(r,t),r}save(){const e=t=>Array.from(t.querySelectorAll(`:scope > .${this.CSS.item}`)).map(n=>{const s=n.querySelector(`.${this.CSS.itemChildren}`),o=this.getItemContent(n),c=s?e(s):[];return{content:o,items:c}});return{style:this.data.style,items:e(this.nodes.wrapper)}}addChildrenList(e,t){const r=e.querySelector(`.${this.CSS.itemBody}`),n=this.makeListWrapper(void 0,[this.CSS.itemChildren]);this.appendItems(t,n),r.appendChild(n)}makeListWrapper(e=this.listStyle,t=[]){const r=e==="ordered"?"ol":"ul",n=e==="ordered"?this.CSS.wrapperOrdered:this.CSS.wrapperUnordered;return t.push(n),a(r,[this.CSS.wrapper,...t])}get CSS(){return{baseBlock:this.api.styles.block,wrapper:"cdx-nested-list",wrapperOrdered:"cdx-nested-list--ordered",wrapperUnordered:"cdx-nested-list--unordered",item:"cdx-nested-list__item",itemBody:"cdx-nested-list__item-body",itemContent:"cdx-nested-list__item-content",itemChildren:"cdx-nested-list__item-children",settingsWrapper:"cdx-nested-list__settings",settingsButton:this.api.styles.settingsButton,settingsButtonActive:this.api.styles.settingsButtonActive}}get listStyle(){return this.data.style||this.defaultListStyle}set listStyle(e){const t=Array.from(this.nodes.wrapper.querySelectorAll(`.${this.CSS.wrapper}`));t.push(this.nodes.wrapper),t.forEach(r=>{r.classList.toggle(this.CSS.wrapperUnordered,e==="unordered"),r.classList.toggle(this.CSS.wrapperOrdered,e==="ordered")}),this.data.style=e}get currentItem(){let e=window.getSelection().anchorNode;return e.nodeType!==Node.ELEMENT_NODE&&(e=e.parentNode),e.closest(`.${this.CSS.item}`)}enterPressed(e){const t=this.currentItem;if(e.stopPropagation(),e.preventDefault(),e.isComposing)return;const r=this.getItemContent(t).trim().length===0,n=t.parentNode===this.nodes.wrapper,s=t.nextElementSibling===null;if(n&&s&&r){this.getOutOfList();return}else if(s&&r){this.unshiftItem();return}const o=d.extractFragmentFromCaretPositionTillTheEnd(),c=u(o),p=t.querySelector(`.${this.CSS.itemChildren}`),i=this.createItem(c,void 0);p&&Array.from(p.querySelectorAll(`.${this.CSS.item}`)).length>0?p.prepend(i):t.after(i),this.focusItem(i)}unshiftItem(){const e=this.currentItem,t=e.parentNode.closest(`.${this.CSS.item}`);if(!t)return;this.caret.save(),t.after(e),this.caret.restore();const r=t.querySelector(`.${this.CSS.itemChildren}`);r.children.length===0&&r.remove()}getItemContent(e){const t=e.querySelector(`.${this.CSS.itemContent}`);return g(t)?"":t.innerHTML}focusItem(e,t=!0){const r=e.querySelector(`.${this.CSS.itemContent}`);d.focus(r,t)}getOutOfList(){this.currentItem.remove(),this.api.blocks.insert(),this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex())}backspace(e){if(!d.isAtStart())return;e.preventDefault();const t=this.currentItem,r=t.previousSibling,n=t.parentNode.closest(`.${this.CSS.item}`);if(!r&&!n)return;e.stopPropagation();let s;if(r){const l=r.querySelectorAll(`.${this.CSS.item}`);s=Array.from(l).pop()||r}else s=n;const o=d.extractFragmentFromCaretPositionTillTheEnd(),c=u(o),p=s.querySelector(`.${this.CSS.itemContent}`);d.focus(p,!1),this.caret.save(),p.insertAdjacentHTML("beforeend",c);let i=t.querySelectorAll(`.${this.CSS.itemChildren} > .${this.CSS.item}`);i=Array.from(i),i=i.filter(l=>l.parentNode.closest(`.${this.CSS.item}`)===t),i.reverse().forEach(l=>{r?s.after(l):t.after(l)}),t.remove(),this.caret.restore()}addTab(e){e.stopPropagation(),e.preventDefault();const t=this.currentItem,r=t.previousSibling;if(!r)return;const s=r.querySelector(`.${this.CSS.itemChildren}`);if(this.caret.save(),s)s.appendChild(t);else{const o=this.makeListWrapper(void 0,[this.CSS.itemChildren]),c=r.querySelector(`.${this.CSS.itemBody}`);o.appendChild(t),c.appendChild(o)}this.caret.restore()}shiftTab(e){e.stopPropagation(),e.preventDefault(),this.unshiftItem()}static joinRecursive(e){return e.items.map(t=>`${t.content} ${m.joinRecursive(t)}`).join("")}static get conversionConfig(){return{export:e=>m.joinRecursive(e),import:e=>({items:[{content:e,items:[]}],style:"unordered"})}}}return m});
