import{t as p,i as l,c as Pe,a as s,b as W,d as G,e as fe,u as y,f as K,m as P,g as k,h as z,s as h,j as st,F as V,o as g,k as R,l as Wn,P as ie,S as q,n as Kn,p as lt,M as Te,q as pn,r as Gn,v as jn}from"./vendor.5fbe6ce5.js";const Yn=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}};Yn();const Jn=p("<code></code>"),zn=p("<pre></pre>"),pe=e=>({displayValue:e,value:e}),Ae=[pe("apple"),pe("apricot"),pe("orange"),pe("peach"),pe("pineapple"),pe("watermelon")],f=e=>(()=>{const t=Jn.cloneNode(!0);return l(t,()=>e.children),Pe(()=>t.className=`language-${e.language||"tsx"}`),t})(),C=e=>(()=>{const t=zn.cloneNode(!0);return l(t,s(f,{get language(){return e.language},get children(){return e.children}})),t})(),qn=p(`<section><h2 id="Background">Background</h2><p>Solid UI is a low-level library for declaratively building accessible, composable UI components using reactive primitives/hooks built with SolidJS. Rather than expose pre-built components, Solid UI gives you simple, consistent hooks which take care of managing the props, effect, and internal state needed to build UI components that follow WAI-ARIA accessibility recommendations.</p><p>Solid UI is still actively being built, and many of the component hooks below are not feature complete, are untested, and not considered not ready for production use.</p><p>This library was written as part of the SolidJS "SolidHack 2022" community hackathon. These docs reference components as being available as part of the <!> NPM package, though this library is not actually hosted yet.</p><h3>Installation</h3><p>For each component, you have the option of importing hooks individually:</p><p>or all at once from the component's default import:</p><h3>General API</h3><p>Every hook, for every component, returns an object with the same API:</p><h3></h3><p>The props needed for the component. This object needs to be spread out onto the underlying root element of the component.</p><h3></h3><p>This function creates any effects needed by the component using functions from SolidJS such as <!> and <!>.</p><p> needs to be called when the underlying element/component with our <!> <strong>mounts</strong>, and <strong>not</strong> when the parent component mounts. This is because <!> may contain <!> hooks that expect the element with <!> to have been rendered to the DOM.</p><p>For example, the following won't properly register effects:</p><p>as <!> is called when <!> mounts, and <strong>not</strong> when the <!> mounts. This can be easily fixed by wrapping the <!> call in <!>:</p><p>If the component does not require any effects, it will not provide an <!> property.</p><h3></h3><p>An object that exposes certain pieces of internal sate, or callbacks to manually change that state. For example, the context for <!> is:</p><p>The first two properties are <!>s that return pieces of internal state, while the last two properties can alter that state by manually opening or closing the <!>.</p><p>Often, in components written with libraries like React, you will see internal context being exposed through a "render prop" pattern, where the <!> of the component is supplied as a function which can receive parameters from the parent component:</p><p>As component functions in SolidJS only get called once, the "render prop" pattern becomes tricky to use (as our render prop function would only get called once).</p><p>Instead, Solid UI returns a <!> object from its component hooks, whose properties are either callbacks or SolidJS reactive primitives:</p><h3>Component stores and provider components</h3><p>Every Solid UI component relies on a SolidJS <!> being provided using SolidJS <!>.</p><p>Stores can be created using a component's "createStore" hook and provided using the corresponding component Context provider:</p><p>The only components that Solid UI exports directly are context provider components. Every composable Solid UI component relies on SolidJS context, and each component's context needs to be provided so that its sub-components can communicate.</p><p>Because this is such a common pattern, Solid UI exports simple provider components which implement this pattern:</p><h3>Provider components can use their own <!>!</h3><p>Because we want every component (even provider components) to have access to the component context, if needed, Solid UI provider components are implemented so that every provider component takes in an optional <!> prop, which is a function that gets passed the component's context as a parameter. Think of it like a function <!> or a render prop, where the function gives you access to the internal context so you can save it for later.</p></section>`),Xn=p('<a href="#Background">Background</a>');function at(){return(()=>{const e=qn.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling,r=i.firstChild,c=r.nextSibling;c.nextSibling;const a=i.nextSibling,u=a.nextSibling,d=u.nextSibling,b=d.nextSibling,I=b.nextSibling,E=I.nextSibling,H=E.nextSibling,O=H.nextSibling,F=O.nextSibling,B=F.firstChild,_=B.nextSibling,ee=_.nextSibling,te=ee.nextSibling;te.nextSibling;const T=F.nextSibling,w=T.firstChild,j=w.nextSibling,ne=j.nextSibling,be=ne.nextSibling,M=be.nextSibling,A=M.nextSibling,U=A.nextSibling,_e=U.nextSibling,we=_e.nextSibling,Me=we.nextSibling,De=Me.nextSibling,ke=De.nextSibling;ke.nextSibling;const tt=T.nextSibling,J=tt.nextSibling,In=J.firstChild,Ot=In.nextSibling,Sn=Ot.nextSibling,Ft=Sn.nextSibling,$n=Ft.nextSibling,_n=$n.nextSibling,wn=_n.nextSibling,Tt=wn.nextSibling,Mn=Tt.nextSibling,At=Mn.nextSibling,Dn=At.nextSibling,Vt=Dn.nextSibling;Vt.nextSibling;const Le=J.nextSibling,kn=Le.firstChild,Rt=kn.nextSibling;Rt.nextSibling;const Nt=Le.nextSibling,nt=Nt.nextSibling,Ln=nt.firstChild,Ht=Ln.nextSibling;Ht.nextSibling;const xe=nt.nextSibling,En=xe.firstChild,Bt=En.nextSibling,On=Bt.nextSibling,Ut=On.nextSibling;Ut.nextSibling;const ot=xe.nextSibling,Fn=ot.firstChild,Wt=Fn.nextSibling;Wt.nextSibling;const Kt=ot.nextSibling,rt=Kt.nextSibling,Tn=rt.firstChild,Gt=Tn.nextSibling;Gt.nextSibling;const jt=rt.nextSibling,Ee=jt.nextSibling,An=Ee.firstChild,Yt=An.nextSibling,Vn=Yt.nextSibling,Jt=Vn.nextSibling;Jt.nextSibling;const Rn=Ee.nextSibling,zt=Rn.nextSibling,Nn=zt.nextSibling,Oe=Nn.nextSibling,Hn=Oe.firstChild,qt=Hn.nextSibling;qt.nextSibling;const it=Oe.nextSibling,Bn=it.firstChild,Xt=Bn.nextSibling,Un=Xt.nextSibling,Qt=Un.nextSibling;return Qt.nextSibling,l(i,s(f,{children:"@solid-ui"}),c),l(e,s(C,{children:"import { createTrigger, createPanel } from '@solid-ui/popover';"}),d),l(e,s(C,{children:Qn}),b),l(e,s(C,{children:Zn}),E),l(E,s(f,{children:"props"})),l(O,s(f,{children:"effects"})),l(F,s(f,{children:"createEffect"}),_),l(F,s(f,{children:"onMount"}),te),l(T,s(f,{children:"effects"}),w),l(T,s(f,{children:"props"}),j),l(T,s(f,{children:"effects"}),_e),l(T,s(f,{children:"onMount"}),Me),l(T,s(f,{children:"props"}),ke),l(e,s(C,{children:eo}),J),l(J,s(f,{children:"effects()"}),Ot),l(J,s(f,{children:"PopoverPanel"}),Ft),l(J,s(f,{children:"<div {...panelProps} />"}),Tt),l(J,s(f,{children:"effects()"}),At),l(J,s(f,{children:"createEffect"}),Vt),l(e,s(C,{children:to}),Le),l(Le,s(f,{children:"effects"}),Rt),l(Nt,s(f,{children:"context"})),l(nt,s(f,{children:"Popover"}),Ht),l(e,s(C,{children:no}),xe),l(xe,s(f,{children:"Accessor"}),Bt),l(xe,s(f,{children:"Popover"}),Ut),l(ot,s(f,{children:"children"}),Wt),l(e,s(C,{children:oo}),Kt),l(rt,s(f,{children:"context"}),Gt),l(e,s(C,{children:ro}),jt),l(Ee,s(f,{children:"store"}),Yt),l(Ee,s(f,{children:"context"}),Jt),l(e,s(C,{children:io}),zt),l(e,s(C,{children:so}),Oe),l(Oe,s(f,{children:"context"}),qt),l(it,s(f,{children:"context"}),Xt),l(it,s(f,{children:"ref"}),Qt),l(e,s(C,{children:lo}),null),e})()}at.Link=()=>Xn.cloneNode(!0);const Qn=`import Popover from '@solid-ui/popover';

const trigger = Popover.createTrigger();
const panel = Popover.createPanel();`,Zn=`import Popover from '@solid-ui/popover';

function PopoverTrigger() {
  const { props, effects, context } = Popover.createTrigger();

  effects();

  return <button { ...props }>{ context.isPopoverOpen() ? 'Close' : 'Open' }</button>
}`,eo=`import { Component, Show } from 'solid-js';

const PopoverPanel: Component = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  effects();

  return (
    <Show when={context.isPopoverOpen()}>
      <div {...panelProps}>{props.children}</div>
    </Show>
  );
};`,to=`import { Component, createEffect, Show } from 'solid-js';

const PopoverPanel: Component = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects(); // 'effects' is now called after the 'div' mounts
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <div {...panelProps}>{props.children}</div>
    </Show>
  );
};`,no=`import { Accessor } from 'solid-js';

export type PopoverContext = Readonly<{
  isPopoverOpen: Accessor<boolean>;
  isOverlayOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;`,oo=`import SomeComponent from 'some-react-library';

function ReactRenderProps() {
  return (
    <SomeComponent>
      {({ isActive }) => <div style={{ background: isActive ? 'red' : 'blue' }}></div>}
    </SomeComponent>
  );
}`,ro=`function SolidUIContext() {
  const { props, context } = SomeComponent.createPart();

  return <div {...props} style={{ background: context.isActive() ? 'red' : 'blue' }}></div>;
}`,io=`import { PopoverStoreContext, createPopoverStore } from '@solid-ui/popover';

() => {
  const store = createPopoverStore();
  return (
    <PopoverStoreContext.Provider value={store}></PopoverStoreContext.Provider>
  );
}`,so=`function PopoverProvider(props) {
  const store = createPopoverStore();

  // An "IIFE" works here because SolidJS defers evaluating children until they are needed,
  // so "usePopoverContext" won't be called until the store context is available.
  // This anonymous function is only ever invoked once.
  return (
    <PopoverStoreContext.Provider value={store}>
      {(() => {
        props.context?.(usePopoverContext());
        return props.children;
      })()}
    </PopoverStoreContext.Provider>
  );
}

import Popover, { PopoverProvider } from '@solid-ui/popover';

<PopoverProvider></PopoverProvider> // creates the store and provides it via the component store context
<Popover></Popover> // the main function of the default export IS the "PopoverProvider"`,lo=`import Popover from '@solid-ui/popover';

let context;
<Popover context={(ctx) => {
  context = ctx; // we now have access to the context object that Popover itself provides!
}}></Popover>`,Fe=new Map;function m(e){return Fe.set(e,Fe.has(e)?Fe.get(e)+1:1),`${e}-${Fe.get(e)}`}const v=e=>e?{[`data-${e}`]:""}:{};function ao(e,t){const n=new Date(e,t),o=n.getDay(),i=new Date(e,t+1,0),r=6-i.getDay(),c=i.getDate()+o+r;n.setDate(n.getDate()-o),i.setDate(i.getDate()+r);const a=[];for(let u=0;u<c/7;u++){const d=[];for(let b=0;b<7;b++){const I=new Date(n);I.setDate(I.getDate()+u*7+b),d.push(I)}a.push(d)}return a}function co(e){const t=new Date(e.value?.()),[n,o]=W({activeDate:t,visibleMonth:t.getMonth(),visibleYear:t.getFullYear(),ariaLabel:null,isActiveDateFromUserInteraction:!1,deferredDateClick:null}),i=new Intl.DateTimeFormat([],{month:"long",year:"numeric"}),r={selectDate(a){o({activeDate:a,visibleMonth:a.getMonth(),visibleYear:a.getFullYear(),ariaLabel:i.format(a),isActiveDateFromUserInteraction:!0})},viewCalendarMonth(a,u){const d=new Date(a,u);o({activeDate:d,visibleMonth:u,visibleYear:a,ariaLabel:i.format(d),isActiveDateFromUserInteraction:!1})},goTo(a,u){const d=a==="next"?1:-1,b=new Date(n.activeDate);u==="day"?b.setDate(n.activeDate.getDate()+d):u==="month"?b.setMonth(n.activeDate.getMonth()+d):u==="week"?b.setDate(n.activeDate.getDate()+d*7):u==="year"&&b.setFullYear(n.activeDate.getFullYear()+d),r.selectDate(b)},view(a,u){const d=a==="next"?1:-1;r.viewCalendarMonth(n.activeDate.getFullYear()+(u==="year"?d:0),n.activeDate.getMonth()+(u==="month"?d:0))},viewToday(){const a=new Date;r.viewCalendarMonth(a.getFullYear(),a.getMonth())},selectVisibleMonth(a){r.viewCalendarMonth(n.activeDate.getFullYear(),a)},selectVisibleYear(a){r.viewCalendarMonth(a,n.activeDate.getMonth())},onCancel(){e.onCancel?.()},onDateConfirm(){e.onChange(n.activeDate)},onDateClick(a){r.selectDate(a),o({deferredDateClick:null}),r.onDateConfirm()},onDeferredDateClick(a){o({deferredDateClick:a})}},c={isActive:G(()=>n.activeDate,(a,u)=>a.toDateString()===u.toDateString()),isInDateRange:()=>!1,isInVisibleMonth:G(()=>n.visibleMonth,(a,u)=>a.getMonth()===u),isSelected:G(()=>e.value?.(),(a,u)=>a.toDateString()===u.toDateString()),isToday:a=>a.toDateString()===new Date().toDateString(),visibleYear:()=>n.visibleYear,visibleMonth:()=>n.visibleMonth,visibleWeeks:fe(()=>ao(n.visibleYear,n.visibleMonth))};return[n,r,c]}const Ne=K();function He(){return y(Ne)[0]}function se(){return y(Ne)[1]}function Be(){return y(Ne)[2]}function N(){return{...Be()}}function uo(e={}){const t=po(e),n=fo(e);return{props:P(t,n)}}function po(e={}){const{idPrefix:t="solid-ui-calendar-cancel"}=e,n=m(t);return{...v(t),"data-solid-ui-button":"",id:n}}function fo(e={}){const t=se();return{onClick:o=>{t.onCancel(),e.onClick?.(o)}}}function ho(e={}){const t=mo(e),n=go(e);return{props:P(t,n)}}function mo(e={}){const{idPrefix:t="solid-ui-calendar-save"}=e,n=m(t);return{...v(t),"data-solid-ui-button":"",id:n}}function go(e={}){const t=se();return{onClick:o=>{t.onDateConfirm(),e.onClick?.(o)}}}function vo(e={}){return{props:bo(e)}}function bo(e={}){const{idPrefix:t="solid-ui-calendar-root"}=e,n=m(t),o=He();return{get["aria-label"](){return o.ariaLabel},"aria-modal":e["aria-modal"],...v(t),"solid-ui-calendar-root":"",id:n,role:e.role,...e.modal?{"aria-modal":!0,role:"dialog"}:{}}}function xo(e={}){return{props:Po(e),context:N()}}function Po(e={}){const{idPrefix:t="solid-ui-calendar-month-body"}=e,n=m(t);return{...v(t),id:n}}function ye(e){return t=>{e[t.key]?e[t.key](t):e.default?.(t)}}function yo(e){const t=Co(e),n=Io(e);return{props:P(t,n),effects:()=>So({...e,id:t.id}),context:N()}}function Co(e){const{idPrefix:t="solid-ui-calendar-month-body-day"}=e,n=m(t),o=Be();return{...v(t),"data-solid-ui-calendar-day":"",get["data-active"](){return o.isActive(e.date())?"":void 0},get["data-date-range"](){return o.isInDateRange(e.date())?"":void 0},get["data-selected"](){return o.isSelected(e.date())?"":void 0},get["data-today"](){return o.isToday(e.date())?"":void 0},get["data-visible-month"](){return o.isInVisibleMonth(e.date())?"":void 0},id:n,get tabIndex(){return o.isActive(e.date())?0:-1}}}function Io(e){const t=se(),n=Be(),o=u=>{n.isInVisibleMonth(e.date())||t.onDeferredDateClick(e.date()),e.onMouseDown?.(u)},i=u=>{n.isActive(e.date())&&t.onDateClick(e.date()),e.onClick?.(u)},r=()=>{n.isActive(e.date())||t.selectDate(e.date())},c=ye({ArrowUp(u){u.preventDefault(),t.goTo("previous","week")},ArrowDown(u){u.preventDefault(),t.goTo("next","week")},ArrowLeft(){t.goTo("previous","day")},ArrowRight(){t.goTo("next","day")},Enter(){t.onDateClick(e.date())},[" "](u){u.preventDefault(),t.onDateClick(e.date())}});return{onClick:i,onFocus:r,onKeyDown:u=>{c(u),e.onKeyDown?.(u)},onMouseDown:o}}function So(e){const t=He(),n=se(),o=Be();k(()=>{o.isActive(e.date())&&t.isActiveDateFromUserInteraction&&(document.getElementById(e.id)?.focus(),t.deferredDateClick?.getTime()===e.date().getTime()&&n.onDateClick(t.deferredDateClick))})}function $o(e={}){return{props:_o(e),context:N()}}function _o(e={}){const{idPrefix:t="solid-ui-calendar-month-body-week"}=e,n=m(t);return{...v(t),id:n}}function wo(e){return{props:Mo(e),context:N()}}function Mo(e){const{idPrefix:t="solid-ui-calendar-month-head-day"}=e,n=m(t);return{abbr:new Intl.DateTimeFormat([],{weekday:"long"}).format(e.date()),...v(t),"data-solid-ui-calendar-day":"",id:n,scope:"col"}}function Do(e={}){return{props:ko(e),context:N()}}function ko(e={}){const{idPrefix:t="solid-ui-calendar-month-head"}=e,n=m(t);return{...v(t),id:n}}function Lo(e={}){const t=Eo(e),n=new Date,o=[0,1,2,3,4,5,6].map(i=>{const r=new Date(n);return r.setDate(n.getDate()-n.getDay()+i),r});return{props:t,context:{...N(),headerDates:()=>o}}}function Eo(e={}){const{idPrefix:t="solid-ui-calendar-month-head-week"}=e,n=m(t);return{...v(t),id:n}}function Oo(e={}){return{props:Fo(e),context:N()}}function Fo(e={}){const{idPrefix:t="solid-ui-calendar-month",role:n="grid"}=e,o=m(t),i=He();return{get["aria-label"](){return i.ariaLabel},...v(t),id:o,role:n}}function To(e){const t=Ao(e),n=Vo(e);return{props:P(t,n),context:N()}}function Ao(e){const{"aria-label":t=`view ${e.direction} ${e.unit}`,idPrefix:n=`solid-ui-calendar-${e.direction}-${e.unit}`}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-button":"",id:o}}function Vo(e){const t=se();return{onClick:o=>{t.view(e.direction,e.unit),e.onClick?.(o)}}}function Ro(e){const t=No(e),n=Ho(e),o=He();return{props:P(t,n),context:{...N(),value:()=>e.unit==="month"?o.visibleMonth:o.visibleYear,options:()=>e.unit==="month"?[...Array(12).keys()]:[...Array(101).keys()].map(i=>i+o.visibleYear-50)}}}function No(e){const{"aria-label":t=`view calendar ${e.unit}`,idPrefix:n=`solid-ui-calendar-select-${e.unit}`}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-select":"",id:o}}function Ho(e){const t=se();return{onChange:o=>{(e.unit==="year"?t.selectVisibleYear:t.selectVisibleMonth)(o),e.onChange?.(o)}}}function Bo(e={}){const t=Uo(e),n=Wo(e);return{props:P(t,n),context:N()}}function Uo(e={}){const{"aria-label":t="go to today",idPrefix:n="solid-ui-calendar-view-today"}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-button":"",id:o}}function Wo(e={}){const t=se();return{onClick:o=>{t.viewToday(),e.onClick?.(o)}}}function Ko(e){const t=co({value:()=>e.value,onCancel:e.onCancel,onChange:e.onChange});return s(Ne.Provider,{value:t,get children(){return(()=>(e.context?.(N()),e.children))()}})}const S=Object.assign(Ko,{createRoot:vo,Actions:{createCancel:uo,createSave:ho},Navigation:{createNav:To,createSelect:Ro,createToday:Bo},Month:{createMonth:Oo,Head:{createHead:Do,createWeek:Lo,createDay:wo},Body:{createBody:xo,createWeek:$o,createDay:yo}}}),Go=p("<div></div>"),jo=p("<div><button>&lt;&lt;</button><button>&lt;</button><span><select></select><select></select></span><button>></button><button>>></button></div>"),Zt=p("<option></option>"),Yo=p("<table><thead><tr></tr></thead><tbody></tbody></table>"),Jo=p("<th></th>"),zo=p("<tr></tr>"),qo=p("<td></td>"),Xo=p("<div><button>Today</button><span><button>Cancel</button><button>Save</button></span></div>"),Qo=p("<div><div>Selected date: </div></div>"),Zo=p(`<section><h1 id="Calendar">Calendar</h1><p>That's right, Solid UI comes with hooks for creating a completely composable calendar date picker! It comes with hooks for creating a table-based calendar widget, including navigation and action components.</p><h3>Example</h3><h3>Code</h3></section>`),er=p('<a href="#Calendar">Calendar</a>'),tr=e=>s(S,P(e,{get children(){return(()=>{const{props:t}=S.createRoot();return e.context?.(N()),(()=>{const n=Go.cloneNode(!0);return h(n,t,!1,!0),n.style.setProperty("display","inline-flex"),n.style.setProperty("flex-direction","column"),n.style.setProperty("border","var(--border)"),n.style.setProperty("border-radius","var(--border-radius)"),n.style.setProperty("padding","1rem"),n.style.setProperty("margin-top","1rem"),l(n,()=>e.children),n})()})()}})),nr=()=>{const{props:e}=S.Navigation.createNav({direction:"previous",unit:"year"}),{props:t}=S.Navigation.createNav({direction:"previous",unit:"month"}),{props:n,context:{value:o,options:i}}=S.Navigation.createSelect({unit:"month"}),[r,c]=st(n,["onChange"]),a=_=>{r.onChange(Number(_.currentTarget.value))},{props:u,context:{value:d,options:b}}=S.Navigation.createSelect({unit:"year"}),[I,E]=st(u,["onChange"]),H=_=>{I.onChange(Number(_.currentTarget.value))},{props:O}=S.Navigation.createNav({direction:"next",unit:"month"}),{props:F}=S.Navigation.createNav({direction:"next",unit:"year"}),B=new Intl.DateTimeFormat([],{month:"long"});return(()=>{const _=jo.cloneNode(!0),ee=_.firstChild,te=ee.nextSibling,T=te.nextSibling,w=T.firstChild,j=w.nextSibling,ne=T.nextSibling,be=ne.nextSibling;return _.style.setProperty("display","flex"),_.style.setProperty("justify-content","space-between"),_.style.setProperty("align-items","center"),h(ee,e,!1,!0),h(te,t,!1,!0),w.addEventListener("change",a),h(w,c,!1,!0),l(w,s(V,{get each(){return i()},children:M=>{const A=new Date;return A.setMonth(M),(()=>{const U=Zt.cloneNode(!0);return U.value=M,l(U,()=>B.format(A)),U})()}})),j.addEventListener("change",H),h(j,E,!1,!0),l(j,s(V,{get each(){return b()},children:M=>(()=>{const A=Zt.cloneNode(!0);return A.value=M,l(A,M),A})()})),h(ne,O,!1,!0),h(be,F,!1,!0),Pe(M=>{const A=o(),U=d();return A!==M._v$&&(w.value=M._v$=A),U!==M._v$2&&(j.value=M._v$2=U),M},{_v$:void 0,_v$2:void 0}),_})()},or=()=>{const{props:e}=S.Month.createMonth(),{props:t}=S.Month.Head.createHead(),{props:n,context:{headerDates:o}}=S.Month.Head.createWeek(),{props:i,context:{visibleWeeks:r}}=S.Month.Body.createBody();return(()=>{const c=Yo.cloneNode(!0),a=c.firstChild,u=a.firstChild,d=a.nextSibling;return h(c,e,!1,!0),h(a,t,!1,!0),h(u,n,!1,!0),l(u,s(V,{get each(){return o()},children:b=>s(ir,{date:b})})),h(d,i,!1,!0),l(d,s(V,{get each(){return r()},children:b=>s(sr,{week:b})})),c})()},rr=new Intl.DateTimeFormat([],{weekday:"narrow"}),ir=e=>{const{props:t}=S.Month.Head.createDay({date:()=>e.date});return(()=>{const n=Jo.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>rr.format(e.date)),n})()},sr=e=>{const{props:t}=S.Month.Body.createWeek();return(()=>{const n=zo.cloneNode(!0);return h(n,t,!1,!0),l(n,s(V,{get each(){return e.week},children:o=>s(lr,{date:o})})),n})()},lr=e=>{const{props:t,effects:n}=S.Month.Body.createDay({date:()=>e.date});return n(),(()=>{const o=qo.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.date.getDate()),o})()},ar=()=>{const{props:e}=S.Navigation.createToday(),{props:t}=S.Actions.createCancel(),{props:n}=S.Actions.createSave();return(()=>{const o=Xo.cloneNode(!0),i=o.firstChild,r=i.nextSibling,c=r.firstChild,a=c.nextSibling;return o.style.setProperty("display","flex"),o.style.setProperty("justify-content","space-between"),o.style.setProperty("margin-top","0.5rem"),h(i,e,!1,!0),r.style.setProperty("display","flex"),r.style.setProperty("gap","0.25rem"),h(c,t,!1,!0),h(a,n,!1,!0),o})()},cr=()=>{const[e,t]=z(new Date);function n(o){t(o)}return(()=>{const o=Qo.cloneNode(!0),i=o.firstChild;return i.firstChild,l(i,()=>e().toDateString(),null),l(o,s(tr,{get value(){return e()},onChange:n,get children(){return[s(nr,{}),s(or,{}),s(ar,{})]}}),null),o})()};function ct(){return(()=>{const e=Zo.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(cr,{}),i),l(e,s(C,{children:ur}),null),e})()}ct.Link=()=>er.cloneNode(!0);const ur=`import { Component, createSignal, For, JSX, splitProps } from 'solid-js';
import Calendar, { CalendarContextProp, useCalendarContext } from '@solid-ui/calendar';

const CalendarRoot: Component<
  { value: Date; onChange: (newDate: Date) => void } & CalendarContextProp
> = (props) => {
  return (
    <Calendar {...props}>
      {(() => {
        const { props: rootProps } = Calendar.createRoot();
        props.context?.(useCalendarContext());
        return (
          <div
            {...rootProps}
            style={{
              display: 'inline-flex',
              'flex-direction': 'column',
              border: 'var(--border)',
              'border-radius': 'var(--border-radius)',
              padding: '1rem',
              'margin-top': '1rem',
            }}
          >
            {props.children}
          </div>;
      })()}
    </Calendar>
  );
};

const CalendarNav: Component = () => {
  const { props: previousYearProps } = Calendar.Navigation.createNav({
    direction: 'previous',
    unit: 'year',
  });
  const { props: previousMonthProps } = Calendar.Navigation.createNav({
    direction: 'previous',
    unit: 'month',
  });

  const {
    props: selectMonthProps,
    context: { value: visibleMonth, options: monthOptions },
  } = Calendar.Navigation.createSelect({ unit: 'month' });

  const [localSelectMonthProps, otherSelectMonthProps] = splitProps(selectMonthProps, ['onChange']);
  const handleMonthChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectMonthProps.onChange(Number(event.currentTarget.value));
  };

  const {
    props: selectYearProps,
    context: { value: visibleYear, options: yearOptions },
  } = Calendar.Navigation.createSelect({ unit: 'year' });

  const [localSelectYearProps, otherSelectYearProps] = splitProps(selectYearProps, ['onChange']);
  const handleYearChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectYearProps.onChange(Number(event.currentTarget.value));
  };

  const { props: nextMonthProps } = Calendar.Navigation.createNav({
    direction: 'next',
    unit: 'month',
  });
  const { props: nextYearProps } = Calendar.Navigation.createNav({
    direction: 'next',
    unit: 'year',
  });

  const monthFormatter = new Intl.DateTimeFormat([], { month: 'long' });

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
      <button {...previousYearProps}>{'<<'}</button>
      <button {...previousMonthProps}>{'<'}</button>

      <span>
        <select {...otherSelectMonthProps} value={visibleMonth()} onChange={handleMonthChange}>
          <For each={monthOptions()}>
            {(month) => {
              const date = new Date();
              date.setMonth(month);
              return <option value={month}>{monthFormatter.format(date)}</option>;
            }}
          </For>
        </select>
        <select {...otherSelectYearProps} value={visibleYear()} onChange={handleYearChange}>
          <For each={yearOptions()}>{(year) => <option value={year}>{year}</option>}</For>
        </select>
      </span>
      <button {...nextMonthProps}>{'>'}</button>
      <button {...nextYearProps}>{'>>'}</button>
    </div>
  );
};

const CalendarMonth: Component = () => {
  const { props: monthProps } = Calendar.Month.createMonth();
  const { props: headerProps } = Calendar.Month.Head.createHead();
  const {
    props: headerWeekProps,
    context: { headerDates },
  } = Calendar.Month.Head.createWeek();

  const {
    props: bodyProps,
    context: { visibleWeeks },
  } = Calendar.Month.Body.createBody();

  return (
    <table {...monthProps}>
      <thead {...headerProps}>
        <tr {...headerWeekProps}>
          <For each={headerDates()}>{(date) => <CalendarHeaderDate date={date} />}</For>
        </tr>
      </thead>
      <tbody {...bodyProps}>
        <For each={visibleWeeks()}>{(week) => <CalendarWeek week={week} />}</For>
      </tbody>
    </table>
  );
};

const headerDateFormatter = new Intl.DateTimeFormat([], { weekday: 'narrow' });
const CalendarHeaderDate: Component<{ date: Date }> = (props) => {
  const { props: dateProps } = Calendar.Month.Head.createDay({ date: () => props.date });

  return <th {...dateProps}>{headerDateFormatter.format(props.date)}</th>;
};

const CalendarWeek: Component<{ week: Date[] }> = (props) => {
  const { props: weekProps } = Calendar.Month.Body.createWeek();
  return (
    <tr {...weekProps}>
      <For each={props.week}>{(date) => <CalendarDay date={date} />}</For>
    </tr>
  );
};

const CalendarDay: Component<{ date: Date }> = (props) => {
  const { props: dayProps, effects } = Calendar.Month.Body.createDay({
    date: () => props.date,
  });

  effects();

  return <td {...dayProps}>{props.date.getDate()}</td>;
};

const CalendarActions: Component = () => {
  const { props: todayProps } = Calendar.Navigation.createToday();
  const { props: cancelProps } = Calendar.Actions.createCancel();
  const { props: saveProps } = Calendar.Actions.createSave();

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'margin-top': '0.5rem' }}>
      <button {...todayProps}>Today</button>
      <span style={{ display: 'flex', gap: '0.25rem' }}>
        <button {...cancelProps}>Cancel</button>
        <button {...saveProps}>Save</button>
      </span>
    </div>
  );
};

export const MyCalendar: Component = () => {
  const [date, setDate] = createSignal(new Date());

  function handleChange(newDate: Date) {
    setDate(newDate);
  }

  return (
    <div style={{ border: '2px solid #888' }}>
      <div>Selected date: {date().toDateString()}</div>
      <CalendarRoot value={date()} onChange={handleChange}>
        <CalendarNav />
        <CalendarMonth />
        <CalendarActions />
      </CalendarRoot>
    </div>
  );
};`;function Ue(e,t={}){const n=i=>i.items.findIndex(r=>r===i.activeItemId);let o;return{addItem(i){e("items",r=>[...r,i])},removeItem(i){e(r=>({items:r.items.filter(c=>c!==i),activeItemId:i===r.activeItemId?void 0:r.activeItemId}))},initializeItemFocus(){e(i=>{if(t.getInitialFocusedItem){const r=i.items.find(c=>t.getInitialFocusedItem(c,i.items));return r?{activeItemId:r}:i}return i})},focusNextItem(){e(i=>{let r=n(i);if(t.shouldWrap&&r===i.items.length-1&&(r=-1),r<i.items.length-1)return{activeItemId:i.items[r+1]}})},focusPreviousItem(){e(i=>{let r=n(i);return t.shouldWrap&&r===0&&(r=i.items.length),r===-1?{activeItemId:i.items[i.items.length-1]}:r>0?{activeItemId:i.items[r-1]}:i})},focusFirstItem(){e(i=>({activeItemId:i.items[0]}))},focusLastItem(){e(i=>({activeItemId:i.items[i.items.length-1]}))},focusTypeaheadItem(i){clearTimeout(o),e(r=>{const c=r.search+i,a=n(r),u=r.items.slice(a+1).concat(r.items.slice(0,a)),d=c.toLocaleLowerCase(),b=u.find(I=>document.getElementById(I).textContent.toLocaleLowerCase().startsWith(d));return b?{activeItemId:b,search:c}:{search:c}}),o=setTimeout(()=>{e("search","")},500)},focusItem(i){e("activeItemId",i)},clearItemFocus(){e("activeItemId",null)}}}const fn=':is(button, [href], input, select, textarea, [tabindex]):not([tabindex="-1"])';function dr(e){const t=Array.from(e.querySelectorAll(fn)).filter(n=>n.tabIndex!==-1);return t.length===0&&t.push(e),t}function pr(e){return e.querySelector(fn)||e}function Ce(e){k(()=>{const{isEnabled:t=()=>!0}=e;if(!t())return;const n=document.getElementById(e.containerId),o=dr(n),i=e.initialFocusIds?.()?.map(a=>document.getElementById(a))||[];o.unshift(...i);function r(a){if(a.key!=="Tab"||!o.includes(document.activeElement))return;const u=o.findIndex(d=>d===document.activeElement);a.shiftKey?(o[u>0?u-1:o.length-1]?.focus(),a.preventDefault()):(o[u<o.length-1?u+1:0]?.focus(),a.preventDefault())}function c(a){n.contains(document.activeElement)&&!n.contains(a.target)&&a.preventDefault()}document.addEventListener("keydown",r),document.addEventListener("mousedown",c),R(()=>{document.removeEventListener("keydown",r),document.removeEventListener("mousedown",c)})})}function Ie(e){g(()=>{const t=document.getElementById(e.containerId);(document.getElementById(e.initialFocusId)||pr(t))?.focus({preventScroll:!0})})}function le(e){k(()=>{const t=document.getElementById(e.containerId);function n(o){const{isEnabled:i=()=>!0}=e;!i()||!t.contains(o.target)&&!e.exceptionIds().some(r=>document.getElementById(r)===o.target)&&e.onClickAway()}document.addEventListener("mouseup",n),R(()=>{document.removeEventListener("mouseup",n)})})}function Pt(e){return{openPopover(){e("shouldShowPanel",!0)},closePopover(){e("shouldShowPanel",!1)},togglePopover(){e("shouldShowPanel",t=>!t)},onOverlayMount(){e({isOverlayMounted:!0})},onOverlayCleanup(){e({isOverlayMounted:!1})}}}function fr(e={}){const[t,n]=W({triggerId:null,overlayId:null,panelId:null,get role(){return e.role?.()},shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1});return[t,{setElementId(i,r){n({[i]:r})},openPopover(){n("shouldShowPanel",!0)},closePopover(){n("shouldShowPanel",!1)},togglePopover(){n("shouldShowPanel",i=>!i)},onOverlayMount(){n({isOverlayMounted:!0})},onOverlayCleanup(){n({isOverlayMounted:!1})}}]}const yt=K();function X(){return y(yt)[0]}function Q(){return y(yt)[1]}function We(){const e=X(),t=Q();return{isPopoverOpen:()=>e.isPanelOpen,isOverlayOpen:()=>e.shouldShowPanel,open:()=>t.openPopover(),close:()=>t.closePopover()}}function hr(e={}){const t=mr(e),n=gr(e);return{props:P(t,n),effects:()=>vr({id:t.id}),context:We()}}function mr(e={}){const{idPrefix:t="solid-ui-popover-panel"}=e,n=m(t),o=X();return{"data-solid-ui-panel":"",...v(t),id:n,get role(){return o.role},tabIndex:0}}function gr(e={}){const t=Q();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function vr(e){const t=X(),n=Q();br(e),Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function br(e){g(()=>{Q().setElementId("panelId",e.id)})}function xr(e={}){const t=Pr(e);return{props:t,effects:()=>Ir({id:t.id}),context:We()}}function Pr(e={}){const{idPrefix:t="solid-ui-popover-overlay"}=e,n=m(t);return{"data-solid-ui-overlay":"",...v(t),id:n,ref(){}}}function yr(e){const t=Q();g(()=>t.setElementId("overlayId",e.id))}function Cr(){const e=Q();g(e.onOverlayMount),R(e.onOverlayCleanup)}function Ir(e){yr(e),Cr()}function Sr(e){const t=fr({role:()=>e.role});return s(yt.Provider,{value:t,get children(){return(()=>(e.context?.(We()),e.children))()}})}function $r(e={}){const t=X();e.primary=e.primary??!t.triggerId;const n=_r(e),o=wr(e);return{props:P(n,o),effects:()=>Mr({id:n.id,primary:e.primary}),context:We()}}function _r(e={}){const t=X(),{idPrefix:n="solid-ui-popover-trigger",primary:o=!t.triggerId}=e,i=m(n);return{get["aria-controls"](){return o?t.panelId:void 0},get["aria-expanded"](){return o?t.isPanelOpen:void 0},get["aria-haspopup"](){return o?t.role:void 0},"data-solid-ui-button":"",...v(n),id:i}}function wr(e){const t=X(),n=Q();return{onClick:r=>{n.togglePopover(),e.onClick?.(r)},onKeyUp:r=>{r.key==="Escape"?n.closePopover():(t.role==="menu"||t.role==="listbox")&&(r.key==="ArrowDown"||r.key==="ArrowUp")&&n.openPopover(),e.onKeyUp?.(r)}}}function Mr(e){e.primary&&(Dr(e),kr(e))}function Dr(e){g(()=>{const t=X(),n=Q();t.triggerId||n.setElementId("triggerId",e.id)})}function kr(e){const t=X();k(n=>(n&&!t.isPanelOpen&&e.id===t.triggerId&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const Ke=Object.assign(Sr,{createTrigger:$r,createOverlay:xr,createPanel:hr});function Lr(e={}){const{orientation:t=()=>"vertical"}=e,[n,o]=W({inputId:null,labelId:null,listId:null,overlayId:null,panelId:null,triggerId:null,shouldShowPanel:!1,get isPanelOpen(){return n.shouldShowPanel&&(!n.overlayId||n.isOverlayMounted)},isOverlayMounted:!1,get orientation(){return t()},items:[],activeItemId:null,search:"",inputValue:"",getInputDisplayValue:a=>String(a)}),i={},r={...Ue(o,{getInitialFocusedItem:a=>i[a]===e.value?.()}),...Pt(o),setElementId(a,u){o({[a]:u})},addItem(a){o("items",u=>{const d=[...u,a];return e.sortOptions?d.sort((b,I)=>e.sortOptions(i[b],i[I])):d})},addValue(a,u){i[a]=u},removeValue(a){delete i[a]},chooseValue(a){const u=i[a];a&&(o("inputValue",n.getInputDisplayValue(u)),u!==e.value?.()&&e.onChange?.(u)),r.closePopover()},clearValue(){e.value?.()!==null&&e.onChange?.(null)},setInputValue(a){o("inputValue",a),a||r.clearValue()},registerGetInputDisplayValue(a){o("getInputDisplayValue",()=>a)}},c={isActive:G(()=>n.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[n,r,c]}const Ge=K();function Z(){return y(Ge)[0]}function $(){return y(Ge)[1]}function je(){return y(Ge)[2]}function ae(){const e=Z(),t=$(),n=je();return{isActive:o=>n.isActive(o),isSelected:o=>n.isSelected(o),isOpen:()=>e.isPanelOpen,open:()=>t.openPopover(),close:()=>t.closePopover()}}function Er(e={}){const t=Or(e),n=Fr(e);return{props:P(t,n),effects:()=>Tr({id:t.id,...e}),context:ae()}}function Or(e={}){const{idPrefix:t="solid-ui-combobox-input"}=e,n=m(t),o=Z();return{get["aria-activedescendent"](){return o.activeItemId},"aria-autocomplete":"list",get["aria-controls"](){return o.panelId||o.listId},get["aria-labelledby"](){return o.labelId},"data-solid-ui-input":"",...v(t),id:n,role:"combobox",type:"text",get value(){return e.value?e.value():o.inputValue}}}function Fr(e={}){const t=Z(),n=$(),o=()=>{n.closePopover(),n.clearItemFocus()},i=d=>{n.setInputValue(d.currentTarget.value),e.onInput?.(d),t.inputValue&&!t.isPanelOpen&&n.openPopover()},r=ye({ArrowUp(d){d.preventDefault(),t.isPanelOpen?n.focusPreviousItem():(n.openPopover(),t.activeItemId||n.focusLastItem())},ArrowDown(d){d.preventDefault(),t.isPanelOpen?n.focusNextItem():(n.openPopover(),t.activeItemId||n.focusFirstItem())},End(d){t.isPanelOpen&&(d.preventDefault(),n.focusLastItem())},Enter(){n.chooseValue(t.activeItemId),o()},Escape(){o()},Home(d){t.isPanelOpen&&(d.preventDefault(),n.focusFirstItem())},Tab(){o()},default(d){d.key.length===1&&!d.shiftKey&&!d.ctrlKey&&!d.metaKey&&n.openPopover()}}),c=je();return{onBlur:d=>{n.setInputValue(t.getInputDisplayValue(c.selectedValue)),e.onBlur?.(d)},onInput:i,onKeyDown:d=>{r(d),e.onKeyDown?.(d)}}}function Tr(e){Ar(e),Vr(e)}function Ar(e){const t=$();g(()=>{t.setElementId("inputId",e.id)})}function Vr(e){const t=$();k(()=>{e.getDisplayValue?.()&&t.registerGetInputDisplayValue(e.getDisplayValue())})}function Rr(e={}){const t=Nr(e);return{props:t,effects:()=>Hr({id:t.id}),context:ae()}}function Nr(e={}){const{idPrefix:t="solid-ui-combobox-label"}=e;return{id:m(t)}}function Hr(e){Br(e)}function Br(e){const t=$();g(()=>{t.setElementId("labelId",e.id)})}function Ur(e={}){const t=Wr(e);return{props:t,effects:()=>Kr({id:t.id}),context:ae()}}function Wr(e={}){const{idPrefix:t="solid-ui-combobox-list"}=e,n=m(t),o=Z();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"listbox",tabIndex:0}}function Kr(e){const t=Z(),n=$();Gr(e),t.panelId||le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen}),jr()}function Gr(e){const t=$();g(()=>{t.setElementId("listId",e.id)})}function jr(){const e=$();g(()=>{e.initializeItemFocus()})}function Yr(e={}){const t=Jr(e),n=zr({id:t.id,...e}),o=je(),i={...ae(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value())};return{props:P(t,n),effects:()=>qr({id:t.id,value:e.value}),context:i}}function Jr(e){const{idPrefix:t="solid-ui-combobox-option"}=e,n=m(t),o=je();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},get["data-selected"](){return o.isSelected(e.value?.())?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"option",tabIndex:-1}}function zr(e){const t=$();return{onClick:c=>{t.chooseValue(e.id),e.onClick?.(c)},onMouseDown:c=>{c.preventDefault(),e.onMouseDown?.(c)},onMouseEnter:c=>{t.focusItem(e.id),e.onMouseEnter?.(c)},onMouseLeave:c=>{t.clearItemFocus(),e.onMouseLeave?.(c)}}}function qr(e){Zr(e),ei(e),Xr(e),Qr(e)}function Xr(e){const t=$();g(()=>{t.addItem(e.id)})}function Qr(e){const t=$();R(()=>{t.removeItem(e.id)})}function Zr(e){const t=$();g(()=>{t.addValue(e.id,e.value())})}function ei(e){const t=$();R(()=>{t.removeValue(e.id)})}function ti(e={}){const t=ni(e),n=oi(e);return{props:P(t,n),effects:()=>ri({id:t.id}),context:ae()}}function ni(e){const{idPrefix:t="solid-ui-combobox-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function oi(e){const t=$();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function ri(e){const t=Z(),n=$();ii({id:e.id}),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen})}function ii(e){const t=$();g(()=>{t.setElementId("panelId",e.id)})}function si(e){e=P({orientation:"vertical"},e);const t=Lr({onChange:e.onChange,orientation:()=>e.orientation,sortOptions:e.sortOptions,value:()=>e.value});return s(Ge.Provider,{value:t,get children(){return(()=>(e.context?.(ae()),e.children))()}})}function li(e={}){const t=ai(e),n=ci(e);return{props:P(t,n),effects:()=>ui({id:t.id}),context:ae()}}function ai(e={}){const t=Z(),{idPrefix:n="solid-ui-combobox-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"listbox",get["aria-labelledby"](){return t.labelId},"data-solid-ui-button":"",...v(n),id:o,tabIndex:-1}}function ci(e={}){const t=Z(),n=$();return{onClick:r=>{n.togglePopover(),document.getElementById(t.inputId)?.focus({preventScroll:!0}),e.onClick?.(r)},onMouseDown:r=>{r.preventDefault(),e.onMouseDown?.(r)}}}function ui(e){di(e)}function di(e){const t=$();g(()=>{t.setElementId("triggerId",e.id)})}const he=Object.assign(si,{createInput:Er,createLabel:Rr,createList:Ur,createOption:Yr,createPanel:ti,createTrigger:li}),hn=K(),mn=()=>y(hn);function pi(e){const[t,n]=st(e,["children"]),o=mi(n);return s(hn.Provider,{value:o,get children(){return t.children}})}function fi(e){mn()?.setRef("anchor",e)}function hi(e){mn()?.setRef("popper",e)}function mi(e={}){const[t,n]=W({anchor:null,popper:null});let o;return k(()=>{if(o?.destroy(),t.anchor&&t.popper){const{placement:i="bottom-start",...r}=e;o=Wn(t.anchor,t.popper,{placement:i,...r,modifiers:[...r.modifiers||[],{name:"offset",options:{offset:[0,4]}}]})}}),{refs:t,setRef:(i,r)=>{n({[i]:r})}}}const x=Object.assign(pi,{AnchorRef:fi,PopperRef:hi}),gi=p("<label></label>"),vi=p("<input>"),bi=p("<button></button>");p("<div></div>");const xi=p("<ul></ul>"),Pi=p("<li></li>"),yi=p('<section><h2 id="Combobox">Combobox</h2><p>A combobox is a text field with suggestions that appear when the user types. Here, we are in charge of rendering all options, giving you complete control over how and when options should be filtered.</p><h3>Example</h3><h3>Code</h3></section>'),Ci=p('<a href="#Combobox">Combobox</a>');function Ii(e){const{props:t,effects:n}=he.createLabel();return n(),(()=>{const o=gi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Si(e){const{props:t,effects:n}=he.createInput({onInput:e.onInput,getDisplayValue:e.getDisplayValue?()=>e.getDisplayValue:void 0});return n(),(()=>{const o=vi.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!1),o})()}function $i(e){const{props:t,effects:n}=he.createTrigger();return n(),(()=>{const o=bi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function _i(e){const{props:t,effects:n,context:o}=he.createList();return k(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(ie,{get children(){const i=xi.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}function wi(e){const{props:t,effects:n,context:o}=he.createOption({value:()=>e.value});return n(),(()=>{const i=Pi.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),i})()}function Mi(){const[e,t]=z(null),[n,o]=z(""),i=fe(()=>Ae.filter(r=>r.displayValue.includes(n())));return s(x,{get children(){return s(he,{get value(){return e()},onChange:r=>t(r),sortOptions:(r,c)=>i().indexOf(r)-i().indexOf(c),get children(){return[s(Ii,{children:"Choose a fruit: "}),s(Si,{getDisplayValue:r=>r?.displayValue??"",onInput:r=>o(r.currentTarget.value),ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r}}),s($i,{children:"Open"}),s(_i,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return s(V,{get each(){return i()},children:r=>s(wi,{value:r,get children(){return r.displayValue}})})}})]}})}})}function ut(){return(()=>{const e=yi.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(Mi,{}),i),l(e,s(C,{children:Di}),null),e})()}ut.Link=()=>Ci.cloneNode(!0);const Di=`import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  PropsWithChildren,
  Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '@solid-ui/types';
import Combobox from '@solid-ui/combobox';
import Popper from '@solid-ui/popper';

function ComboboxLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = Combobox.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function ComboboxInput(props: {
  getDisplayValue?: (value: any) => string;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  ref?: ComponentRef<HTMLInputElement>;
}) {
  const { props: inputProps, effects } = Combobox.createInput({
    onInput: props.onInput,
    getDisplayValue: props.getDisplayValue ? () => props.getDisplayValue : undefined,
  });

  effects();

  return <input ref={props.ref} {...inputProps} />;
}

function ComboboxTrigger(props: PropsWithChildren) {
  const { props: triggerProps, effects } = Combobox.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
}

function ComboboxPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const { props: panelProps, effects, context } = Combobox.createPanel();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

function ComboboxList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
  const { props: listProps, effects, context } = Combobox.createList();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Portal>
    </Show>
  );
}

function ComboboxOption(props: PropsWithChildren<{ value?: any }>) {
  const {
    props: optionProps,
    effects,
    context,
  } = Combobox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
}

export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];

function MyCombobox() {
  const [value, setValue] = createSignal<{ displayValue: string; value: string }>(null);
  const [inputValue, setInputValue] = createSignal('');
  const filteredFruits = createMemo(() =>
    fruits.filter((fruit) => fruit.displayValue.includes(inputValue()))
  );

  return (
    <Popper>
      <Combobox
        value={value()}
        onChange={(newValue) => setValue(newValue)}
        sortOptions={(a, b) => filteredFruits().indexOf(a) - filteredFruits().indexOf(b)}
      >
        <ComboboxLabel>Choose a fruit: </ComboboxLabel>
        <ComboboxInput
          getDisplayValue={(value: Fruit) => value?.displayValue ?? ''}
          onInput={(event) => setInputValue(event.currentTarget.value)}
          ref={Popper.AnchorRef}
        />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxList ref={Popper.PopperRef}>
          <For each={filteredFruits()}>
            {(fruit) => <ComboboxOption value={fruit}>{fruit.displayValue}</ComboboxOption>}
          </For>
        </ComboboxList>
      </Combobox>
    </Popper>
  );
}`;function ki(){const[e,t]=W({triggerId:null,contentId:null,isShowingContent:!1});return[e,{setElementId(o,i){t({[o]:i})},showContent(){t("isShowingContent",!0)},hideContent(){t("isShowingContent",!1)},toggleContent(){t("isShowingContent",o=>!o)}}]}const Ct=K();function Ye(){return y(Ct)[0]}function Je(){return y(Ct)[1]}function It(){const e=Ye(),t=Je();return{isShowingContent:()=>e.isShowingContent,show:()=>t.showContent(),hide:()=>t.hideContent()}}function Li(e={}){const t=Ei(e);return{props:t,effects:()=>Oi({id:t.id}),context:It()}}function Ei(e){const{idPrefix:t="solid-ui-disclosure-content"}=e,n=m(t);return{...v(t),id:n}}function Oi(e){Fi(e)}function Fi(e){g(()=>{Je().setElementId("contentId",e.id)})}function Ti(e){const t=ki();return s(Ct.Provider,{value:t,get children(){return(()=>(e.context?.(It()),e.children))()}})}function Ai(e={}){const t=Ye();e.primary=e.primary??!t.triggerId;const n=Vi(e),o=Ri(e);return{props:P(n,o),effects:()=>Ni({id:n.id,primary:e.primary}),context:It()}}function Vi(e={}){const t=Ye(),{idPrefix:n="solid-ui-disclosure-trigger",primary:o=!t.triggerId}=e,i=m(n);return{get["aria-controls"](){return o?t.contentId:void 0},get["aria-expanded"](){return o?t.isShowingContent:void 0},"data-solid-ui-button":"",...v(n),id:i}}function Ri(e){const t=Je();return{onClick:o=>{t.toggleContent(),e.onClick?.(o)}}}function Ni(e){e.primary&&Hi(e)}function Hi(e){g(()=>{const t=Ye(),n=Je();t.triggerId||n.setElementId("triggerId",e.id)})}const St=Object.assign(Ti,{createTrigger:Ai,createContent:Li}),Bi=p("<button></button>"),Ui=p("<div></div>"),Wi=p('<section><h2 id="Disclosure">Disclosure</h2><p>A disclosure is a simple pattern for showing and hiding content. It differs from a popover in that the content should appear in the flow of the document and not as a floating panel.</p><h3>Example</h3><h3>Code</h3></section>'),Ki=p('<a href="#Disclosure">Disclosure</a>'),Gi=e=>{const{props:t,effects:n}=St.createTrigger();return n(),(()=>{const o=Bi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},ji=e=>{const{props:t,effects:n,context:o}=St.createContent();return n(),(()=>{const i=Ui.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),Pe(()=>i.style.setProperty("display",o.isShowingContent()?"block":"none")),i})()},Yi=()=>s(St,{get children(){return[s(Gi,{children:"Disclosure"}),s(ji,{children:"This is the disclosure content."})]}});function dt(){return(()=>{const e=Wi.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(Yi,{}),i),l(e,s(C,{children:Ji}),null),e})()}dt.Link=()=>Ki.cloneNode(!0);const Ji=`import { Component } from 'solid-js';
import Disclosure from '@solid-ui/disclosure';

const DisclosureTrigger: Component = (props) => {
  const { props: triggerProps, effects } = Disclosure.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
};

const DisclosureContent: Component = (props) => {
  const { props: contentProps, effects, context } = Disclosure.createContent();

  effects();

  return (
    <div {...contentProps} style={{ display: context.isShowingContent() ? 'block' : 'none' }}>
      {props.children}
    </div>
  );
};

const DisclosureExample = () => {
  return (
    <Disclosure>
      <DisclosureTrigger>Disclosure</DisclosureTrigger>
      <DisclosureContent>This is the disclosure content.</DisclosureContent>
    </Disclosure>
  );
};`;function zi(){return{props:qi()}}function qi(){return{"data-solid-ui-form-control":"",role:"group"}}function Xi(e={}){const[t,n]=W({labelId:null,fieldId:null,helperTextId:null,errorMessageId:null,errors:[],hasFocus:!1,isTouched:!1}),o={setElementId(r,c){n({[r]:c})},setHasFocus(r){n("hasFocus",r)},setIsTouched(r){n("isTouched",r)},setErrors(r){n("errors",r)}},i={fieldId:fe(()=>e.id??t.fieldId),isDisabled:()=>e.isDisabled,isInvalid:fe(()=>e.isInvalid??Boolean(t.errors.length>0)),isRequired:()=>e.isRequired,isTouched:fe(()=>e.isTouched??t.isTouched)};return[t,o,i]}const ze=K();function me(){return y(ze)[0]}function ge(){return y(ze)[1]}function gn(){return y(ze)[2]}function Se(){const e=me(),t=gn();return{errors:()=>e.errors,isInvalid:t.isInvalid,isTouched:()=>e.isTouched}}function Qi(e={}){const t=Zi(e);return{props:t,effects:()=>es({id:t.id}),context:Se()}}function Zi(e={}){const{idPrefix:t="solid-ui-form-error-message"}=e,n=m(t);return{...v(t),id:n}}function es(e){ts(e)}function ts(e){const t=ge();g(()=>{t.setElementId("errorMessageId",e.id)})}function ns(){const[e,t]=W({errors:{},isSubmitting:!1}),n={setFieldErrors(i,r){t("errors",i,r)},startSubmit(){t({isSubmitting:!0})},endSubmit(){t({isSubmitting:!1})}},o={isInvalid:fe(()=>Object.values(e.errors).some(i=>i.length>0))};return[e,n,o]}const vn=K();function $t(){return y(vn)}function bn(){return $t()[0]}function xn(){return $t()[1]}function _t(){return $t()[2]}function wt(){const e=bn(),t=_t();return{errors:()=>e.errors,isInvalid:t.isInvalid,isSubmitting:()=>e.isSubmitting}}function os(e){const t=me(),n=ge(),o=xn(),i=rs(e);function r(a){if(e.validators){const u=e.validators.reduce((d,b)=>{const I=b(a);return I&&d.push(I),d},[]);n.setErrors(u),o?.setFieldErrors(e.name,u)}else t.errors.length>0&&n.setErrors([])}function c(){n.setIsTouched(!0)}return{props:i,effects:()=>is({id:i.id,validate:r,initialValue:e.initialValue}),context:Se(),validate:r,touch:c}}function rs(e){const{idPrefix:t="solid-ui-form-control-field"}=e,n=m(t),o=me(),i=gn();return{get["aria-describedby"](){return[o.helperTextId,i.isInvalid()&&o.errorMessageId].filter(Boolean).join(" ")||void 0},get["aria-invalid"](){return i.isInvalid()||void 0},get["aria-labelledby"](){return o.labelId},get["aria-required"](){return i.isRequired()||void 0},...v(t),get disabled(){return i.isDisabled()||void 0},id:n,get name(){return e.name}}}function is(e){ss(e),ls(e),as(e)}function ss(e){const t=ge();g(()=>{t.setElementId("fieldId",e.id)})}function ls(e){g(()=>{e.validate(e.initialValue)})}function as(e){const t=me(),n=ge();function o(){document.activeElement.id===e.id&&!t.hasFocus&&n.setHasFocus(!0)}function i(){t.hasFocus&&n.setHasFocus(!1)}g(()=>{document.addEventListener("focusin",o),document.addEventListener("focusout",i)}),R(()=>{document.removeEventListener("focusin",o),document.removeEventListener("focusout",i)})}function cs(e={}){const t=us(e);return{props:t,effects:()=>ds({id:t.id}),context:Se()}}function us(e){const{idPrefix:t="solid-ui-form-helper-text"}=e,n=m(t),o=me();return{get["data-focused"](){return o.hasFocus?"":void 0},...v(t),id:n}}function ds(e){ps(e)}function ps(e){const t=ge();g(()=>{t.setElementId("helperTextId",e.id)})}function fs(e={}){const t=hs(e);return{props:t,effects:()=>ms({id:t.id}),context:Se()}}function hs(e){const{idPrefix:t="solid-ui-form-control-label"}=e,n=m(t),o=me();return{get["data-focused"](){return o.hasFocus?"":void 0},...v(t),get for(){return o.fieldId},id:n}}function ms(e){gs(e)}function gs(e){const t=ge();g(()=>{t.setElementId("labelId",e.id)})}function vs(e){const t=Xi(e);return s(ze.Provider,{value:t,get children(){return(()=>(e.context?.(Se()),e.children))()}})}const bs=Object.assign(vs,{createControl:zi,createErrorMessage:Qi,createField:os,createHelperText:cs,createLabel:fs});function xs(e={}){return{props:Ps(e)}}function Ps(e){const t=_t(),n=xn();return{onSubmit:i=>{t.isInvalid()||(n.startSubmit(),e.onSubmit?.(i,n.endSubmit))}}}function ys(e){const t=ns();return s(vn.Provider,{value:t,get children(){return(()=>(e.context?.(wt()),e.children))()}})}function Cs(e={}){return{props:Is(e),context:wt()}}function Is(e){const{idPrefix:t="solid-ui-form-control-submit"}=e,n=m(t),o=bn(),i=_t();return{"data-solid-ui-button":"",...v(t),get disabled(){return e.isDisabled?e.isDisabled():i.isInvalid()||o.isSubmitting},id:n,type:"submit"}}const Y=Object.assign(ys,{Control:bs,createForm:xs,createSubmit:Cs}),Ss=p("<form></form>"),Ve=p("<div></div>"),$s=p("<label></label>"),_s=p('<input type="text" data-solid-ui-input="">'),ws=p("<button></button>"),Ms=p(`<section><h2 id="Form">Form</h2><p>Solid UI's form component hooks allow you to easily and declaratively validate forms. The <!> hook takes in the field <!>, <!>, and an optional array of <!>. In addition to the normal "props, effects, context" returned from Solid UI component hooks, <!> also returns <!> and <!> Call <!> whenever you want the value of your field to re-validate, and call <!> whenever you consider the field to have been visited by the user.</p><p>If none of the fields in the form have errors, then the submit button created by <!> will be enabled. Clicking it calls the <!> handler supplied to the <!> hook. When you're done, call the <!> callback provided to <!> as the second argument to toggle the form's submitting state to false.</p><h3>Example</h3><h3>Code</h3></section>`),Ds=p('<a href="#Form">Form</a>');function ks(e){return s(Y,{get children(){return(()=>{const{props:t}=Y.createForm(e);return e.context?.(wt()),(()=>{const n=Ss.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>e.children),n})()})()}})}function Ls(e){return s(Y.Control,{get children(){return(()=>{const{props:t}=Y.Control.createControl();return(()=>{const n=Ve.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>e.children),n})()})()}})}function Es(e){const{props:t,effects:n}=Y.Control.createLabel();return n(),(()=>{const o=$s.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Os(e){const{props:t,effects:n,validate:o,touch:i}=Y.Control.createField({name:e.name,initialValue:"",validators:[d=>d.length<5&&"Value must be at least 5 characters long.",d=>!d.includes("a")&&'Value must include the character "a".']});n();const[r,c]=z(""),a=()=>{i()},u=d=>{c(d.currentTarget.value),o(r())};return(()=>{const d=_s.cloneNode(!0);return d.$$input=u,d.addEventListener("blur",a),h(d,t,!1,!1),Pe(()=>d.value=r()),d})()}function Fs(e){const{props:t,effects:n}=Y.Control.createHelperText();return n(),(()=>{const o=Ve.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ts(){const{props:e,effects:t,context:n}=Y.Control.createErrorMessage();return t(),s(q,{get when(){return lt(()=>!!n.isTouched(),!0)()&&n.isInvalid()},get children(){const o=Ve.cloneNode(!0);return h(o,e,!1,!0),l(o,s(V,{get each(){return n.errors()},children:i=>(()=>{const r=Ve.cloneNode(!0);return l(r,i),r})()})),o}})}function As(){const{props:e,context:t}=Y.createSubmit();return(()=>{const n=ws.cloneNode(!0);return h(n,e,!1,!0),l(n,()=>t.isSubmitting()?"Submitting...":"Submit"),n})()}function Vs(){return s(ks,{onSubmit:(e,t)=>{e.preventDefault(),setTimeout(t,1e3)},get children(){return[s(Ls,{get children(){return[s(Es,{children:"Field 1"}),s(Os,{name:"field1"}),s(Fs,{children:"This is the helper text."}),s(Ts,{})]}}),s(As,{})]}})}function pt(){return(()=>{const e=Ms.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling,a=c.nextSibling,u=a.nextSibling,d=u.nextSibling,b=d.nextSibling,I=b.nextSibling,E=I.nextSibling,H=E.nextSibling,O=H.nextSibling,F=O.nextSibling,B=F.nextSibling,_=B.nextSibling,ee=_.nextSibling,te=ee.nextSibling,T=te.nextSibling;T.nextSibling;const w=n.nextSibling,j=w.firstChild,ne=j.nextSibling,be=ne.nextSibling,M=be.nextSibling,A=M.nextSibling,U=A.nextSibling,_e=U.nextSibling,we=_e.nextSibling,Me=we.nextSibling,De=Me.nextSibling;De.nextSibling;const ke=w.nextSibling,tt=ke.nextSibling;return l(n,s(f,{children:"createField()"}),i),l(n,s(f,{children:"name"}),c),l(n,s(f,{children:"initialValue"}),u),l(n,s(f,{children:"validators"}),b),l(n,s(f,{children:"createField()"}),E),l(n,s(f,{children:"validate()"}),O),l(n,s(f,{children:"touch()."}),B),l(n,s(f,{children:"validate()"}),ee),l(n,s(f,{children:"touch()"}),T),l(w,s(f,{children:"createSubmit()"}),ne),l(w,s(f,{children:"onSubmit()"}),M),l(w,s(f,{children:"createForm()"}),U),l(w,s(f,{children:"onSubmitEnd()"}),we),l(w,s(f,{children:"onSubmit()"}),De),l(e,s(Vs,{}),tt),l(e,s(C,{children:Rs}),null),e})()}pt.Link=()=>Ds.cloneNode(!0);const Rs=`import { createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
import Form, { CreateFormConfig, FormContextProp, useFormContext } from '@solid-ui/form';

export function FormRoot(props: PropsWithChildren<CreateFormConfig & FormContextProp>) {
  return (
    <Form>
      {(() => {
        const { props: formProps } = Form.createForm(props);
        props.context?.(useFormContext());
        return <form {...formProps}>{props.children}</form>;
      })()}
    </Form>
  );
}

export function FormControl(props: PropsWithChildren) {
  return (
    <Form.Control>
      {(() => {
        const { props: formControlProps } = Form.Control.createControl();
        return <div {...formControlProps}>{props.children}</div>;
      })()}
    </Form.Control>
  );
}

export function Label(props: PropsWithChildren) {
  const { props: labelProps, effects } = Form.Control.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

export function Input(props: PropsWithChildren<{ name: string }>) {
  const {
    props: fieldProps,
    effects,
    validate,
    touch,
  } = Form.Control.createField({
    name: props.name,
    initialValue: '',
    validators: [
      (value) => value.length < 5 && 'Value must be at least 5 characters long.',
      (value) => !value.includes('a') && 'Value must include the character "a".',
    ],
  });

  effects();

  const [value, setValue] = createSignal('');

  const handleBlur = () => {
    touch();
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value);
    validate(value());
  };

  return (
    <input
      type="text"
      {...fieldProps}
      data-solid-ui-input=""
      value={value()}
      onBlur={handleBlur}
      onInput={handleInput}
    />
  );
}

export function HelperText(props: PropsWithChildren) {
  const { props: helperTextProps, effects } = Form.Control.createHelperText();

  effects();

  return <div {...helperTextProps}>{props.children}</div>;
}

export function ErrorMessage() {
  const { props: errorMessageProps, effects, context } = Form.Control.createErrorMessage();

  effects();

  return (
    <Show when={context.isTouched() && context.isInvalid()}>
      <div {...errorMessageProps}>
        <For each={context.errors()}>{(errorMessage) => <div>{errorMessage}</div>}</For>
      </div>
    </Show>
  );
}

function FormSubmit() {
  const { props: submitProps, context } = Form.createSubmit();
  return <button {...submitProps}>{context.isSubmitting() ? 'Submitting...' : 'Submit'}</button>;
}

function MyForm() {
  return (
    <FormRoot
      onSubmit={(event, onSubmitEnd) => {
        event.preventDefault();
        setTimeout(onSubmitEnd, 1000);
      }}
    >
      <FormControl>
        <Label>Field 1</Label>
        <Input name="field1" />
        <HelperText>This is the helper text.</HelperText>
        <ErrorMessage />
      </FormControl>
      <FormSubmit />
    </FormRoot>
  );
}`;Kn(["input"]);function Ns(e={orientation:()=>"vertical"}){const[t,n]=W({labelId:null,listId:null,overlayId:null,panelId:null,triggerId:null,shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1,get orientation(){return e.orientation()},items:[],activeItemId:null,search:""}),o={},i={...Ue(n,{getInitialFocusedItem:c=>o[c]===e.value?.()}),...Pt(n),setElementId(c,a){n({[c]:a})},addValue(c,a){o[c]=a},removeValue(c){delete o[c]},chooseValue(c){const a=o[c];c&&a!==e.value()&&e.onChange?.(a),i.closePopover()}},r={isActive:G(()=>t.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[t,i,r]}const qe=K();function ce(){return y(qe)[0]}function D(){return y(qe)[1]}function Mt(){return y(qe)[2]}function ve(){const e=ce(),t=D(),n=Mt();return{isActive:o=>n.isActive(o),isSelected:o=>n.isSelected(o),isOpen:()=>e.isPanelOpen,hasPanel:()=>!!e.panelId,open:()=>t.openPopover(),close:()=>t.closePopover()}}function Hs(e={}){const t=Bs(e);return{props:t,effects:()=>Us({id:t.id}),context:ve()}}function Bs(e={}){const{idPrefix:t="solid-ui-listbox-label"}=e;return{id:m(t)}}function Us(e){Ws(e)}function Ws(e){const t=D();g(()=>{t.setElementId("labelId",e.id)})}function Ks(e={}){const t=Gs(e),n=js();return{props:P(t,n),effects:()=>Ys({id:t.id}),context:ve()}}function Gs(e={}){const{idPrefix:t="solid-ui-listbox-list"}=e,n=m(t),o=ce();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"listbox",tabIndex:0}}function js(e={}){const t=ce(),n=D(),o=ye({ArrowUp(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusPreviousItem())},ArrowDown(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusNextItem())},ArrowLeft(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusPreviousItem())},ArrowRight(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusNextItem())},Home(r){r.preventDefault(),n.focusFirstItem()},End(r){r.preventDefault(),n.focusLastItem()},Enter(r){r.preventDefault(),n.chooseValue(t.activeItemId)},Escape(){t.panelId||n.closePopover()},default(r){r.key.length===1&&(!t.search&&r.key===" "?(r.preventDefault(),n.chooseValue(t.activeItemId)):n.focusTypeaheadItem(r.key))}});return{onKeyDown:r=>{o(r),e.onKeyDown?.(r)}}}function Ys(e){const t=ce(),n=D();Js(e),t.panelId||(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})),zs()}function Js(e){const t=D();g(()=>{t.setElementId("listId",e.id)})}function zs(){const e=D();g(()=>{e.initializeItemFocus()})}function qs(e={}){const t=Xs(e),n=Qs({id:t.id,...e}),o=Mt(),i={...ve(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value?.())};return{props:P(t,n),effects:()=>Zs({id:t.id,value:e.value}),context:i}}function Xs(e){const{idPrefix:t="solid-ui-listbox-option"}=e,n=m(t),o=Mt();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},get["data-selected"](){return o.isSelected(e.value?.())?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"option",tabIndex:-1}}function Qs(e){const t=D();return{onClick:r=>{t.chooseValue(e.id),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function Zs(e){el(e),tl(e),nl(e),ol(e)}function el(e){const t=D();g(()=>{t.addItem(e.id)})}function tl(e){const t=D();R(()=>{t.removeItem(e.id)})}function nl(e){const t=D();g(()=>{t.addValue(e.id,e.value())})}function ol(e){const t=D();R(()=>{t.removeValue(e.id)})}function rl(e={}){const t=il(e),n=sl(e);return{props:P(t,n),effects:()=>ll({id:t.id}),context:ve()}}function il(e){const{idPrefix:t="solid-ui-listbox-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function sl(e){const t=D();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function ll(e){const t=ce(),n=D();al({id:e.id}),t.listId&&(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id})),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function al(e){const t=D();g(()=>{t.setElementId("panelId",e.id)})}function cl(e){e=P({orientation:"vertical"},e);const t=Ns({onChange:e.onChange,orientation:()=>e.orientation,value:()=>e.value});return s(qe.Provider,{value:t,get children(){return(()=>(e.context?.(ve()),e.children))()}})}function ul(e={}){const t=dl(e),n=pl(e);return{props:P(t,n),effects:()=>fl({id:t.id}),context:ve()}}function dl(e={}){const t=ce(),{idPrefix:n="solid-ui-listbox-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"listbox",get["aria-labelledby"](){return t.labelId},"data-solid-ui-button":"",...v(n),id:o}}function pl(e={}){const t=D();return{onClick:i=>{t.togglePopover(),e.onClick?.(i)},onKeyDown:i=>{i.key==="Escape"?t.closePopover():(i.key==="ArrowDown"||i.key==="ArrowUp")&&(i.preventDefault(),t.openPopover()),e.onKeyDown?.(i)}}}function fl(e){hl(e),ml(e)}function hl(e){const t=D();g(()=>{t.setElementId("triggerId",e.id)})}function ml(e){const t=ce();k(n=>(n&&!t.isPanelOpen&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const oe=Object.assign(cl,{createLabel:Hs,createList:Ks,createOption:qs,createPanel:rl,createTrigger:ul}),gl=p("<label></label>"),vl=p("<button></button>"),bl=p("<div></div>"),en=p("<ul></ul>"),xl=p("<li></li>"),Pl=p("<div><div></div><div></div></div>"),yl=p('<section><h2 id="Listbox">Listbox</h2><p>Listbox lets you build custom single-select dropdowns.</p><p>Menu can either directly render a list with <!>, or can first render a parent panel with <!>.</p><h3>Example</h3><h3>Code</h3></section>'),Cl=p('<a href="#Listbox">Listbox</a>');function tn(e){const{props:t,effects:n}=oe.createLabel();return n(),(()=>{const o=gl.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function nn(e){const{props:t,effects:n}=oe.createTrigger();return n(),(()=>{const o=vl.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),l(o,()=>e.children),o})()}function Il(e){const{props:t,effects:n,context:o}=oe.createPanel();return k(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(ie,{get children(){const i=bl.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}function on(e){const{props:t,effects:n,context:o}=oe.createList();return k(()=>{o.isOpen()&&n()}),s(pn,{get children(){return[s(Te,{get when(){return o.hasPanel()},get children(){const i=en.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}}),s(Te,{get when(){return!o.hasPanel()},get children(){return s(q,{get when(){return o.isOpen()},get children(){return s(ie,{get children(){const i=en.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}})]}})}function rn(e){const{props:t,effects:n}=oe.createOption({value:()=>e.value});return n(),(()=>{const o=xl.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Sl(){const[e,t]=z();return(()=>{const n=Pl.cloneNode(!0),o=n.firstChild,i=o.nextSibling;return o.style.setProperty("margin-bottom","1rem"),l(o,s(x,{get children(){return s(oe,{get value(){return e()},onChange:t,get children(){return[s(tn,{children:"Choose a fruit: "}),s(nn,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},get children(){return["Listbox: ",lt(()=>e()?.displayValue)]}}),s(on,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return s(V,{each:Ae,children:r=>s(rn,{value:r,get children(){return r.displayValue}})})}})]}})}})),l(i,s(x,{get children(){return s(oe,{get value(){return e()},onChange:t,get children(){return[s(tn,{children:"Choose a fruit: "}),s(nn,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},get children(){return["Listbox: ",lt(()=>e()?.displayValue)]}}),s(Il,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return["Fruit Options:",s(on,{get children(){return s(V,{each:Ae,children:r=>s(rn,{value:r,get children(){return r.displayValue}})})}})]}})]}})}})),n})()}function ft(){return(()=>{const e=yl.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.firstChild,r=i.nextSibling,c=r.nextSibling,a=c.nextSibling;a.nextSibling;const u=o.nextSibling,d=u.nextSibling;return l(o,s(f,{children:"createList()"}),r),l(o,s(f,{children:"createPanel()"}),a),l(e,s(Sl,{}),d),l(e,s(C,{children:$l}),null),e})()}ft.Link=()=>Cl.cloneNode(!0);const $l=`import { createEffect, createSignal, For, Match, PropsWithChildren, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '@solid-ui/popper';
import { ComponentRef } from '~/types';
import Listbox from '@solid-ui/listbox';

function ListboxLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = Listbox.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function ListboxTrigger(props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>) {
  const { props: triggerProps, effects } = Listbox.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
}

function ListboxPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const { props: panelProps, effects, context } = Listbox.createPanel();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

function ListboxList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
  const { props: listProps, effects, context } = Listbox.createList();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Switch>
      <Match when={context.hasPanel()}>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Match>
      <Match when={!context.hasPanel()}>
        <Show when={context.isOpen()}>
          <Portal>
            <ul ref={props.ref} {...listProps}>
              {props.children}
            </ul>
          </Portal>
        </Show>
      </Match>
    </Switch>
  );
}

function ListboxOption<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const { props: optionProps, effects } = Listbox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
}

export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];

function MyListbox() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <>
      <Popper>
        <Listbox value={value()} onChange={setValue}>
          <ListboxLabel>Choose a fruit: </ListboxLabel>
          <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
          <ListboxList ref={Popper.PopperRef}>
            <For each={fruits}>
              {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
            </For>
          </ListboxList>
        </Listbox>
      </Popper>
      <Popper>
        <Listbox value={value()} onChange={setValue}>
          <ListboxLabel>Choose a fruit: </ListboxLabel>
          <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
          <ListboxPanel ref={Popper.PopperRef}>
            Fruit Options:
            <ListboxList>
              <For each={fruits}>
                {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
              </For>
            </ListboxList>
          </ListboxPanel>
        </Listbox>
      </Popper>
    </>
  );
}`;function _l(e={orientation:()=>"vertical",getInitialFocusedItem:(t,n)=>n.indexOf(t)===0}){const[t,n]=W({triggerId:null,listId:null,overlayId:null,panelId:null,shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1,items:[],activeItemId:null,search:"",get orientation(){return e.orientation()},menuActions:{}}),o={...Ue(n,e),...Pt(n),addMenuAction(r,c){n("menuActions",a=>({...a,[r]:c}))},removeMenuAction(r){n("menuActions",c=>({...c,[r]:void 0}))},performMenuAction(r,c){if(r){if(t.menuActions[r])t.menuActions[r]();else if(c!=="mouse"){const a=document.getElementById(r);a&&(a.$$click||a.onclick||["BUTTON","A"].includes(a.tagName))&&a.click()}}o.closePopover()},setElementId(r,c){n({[r]:c})}},i={isActive:G(()=>t.activeItemId)};return[t,o,i]}const Xe=K();function ue(){return y(Xe)[0]}function L(){return y(Xe)[1]}function Dt(){return y(Xe)[2]}function $e(){const e=ue(),t=L(),n=Dt();return{isActive:o=>n.isActive(o),isOpen:()=>e.isPanelOpen,open:()=>t.openPopover(),close:()=>t.closePopover(),hasPanel:()=>!!e.panelId}}function wl(e={}){const t=Ml(e),n=Dl({id:t.id,...e}),o=Dt(),i={...$e(),isActive:()=>o.isActive(t.id)};return{props:P(t,n),effects:()=>kl({id:t.id,action:e.action}),context:i}}function Ml(e){const{idPrefix:t="solid-ui-menu-item"}=e,n=m(t),o=Dt();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"menuitem",tabIndex:-1}}function Dl(e){const t=L();return{onClick:r=>{t.performMenuAction(e.id,"mouse"),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function kl(e){Ll(e),El(e),Ol(e),Fl(e)}function Ll(e){const t=L();g(()=>{t.addItem(e.id)})}function El(e){const t=L();R(()=>{t.removeItem(e.id)})}function Ol(e){const t=L();g(()=>{t.addMenuAction(e.id,e.action)})}function Fl(e){const t=L();R(()=>{t.removeMenuAction(e.id)})}function Tl(e={}){const t=Al(e),n=Vl();return{props:P(t,n),effects:()=>Rl({id:t.id}),context:$e()}}function Al(e={}){const{idPrefix:t="solid-ui-menu-list"}=e,n=m(t),o=ue();return{get["aria-activedescendent"](){return o.activeItemId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"menu",tabIndex:0}}function Vl(e={}){const t=ue(),n=L(),o=ye({ArrowUp(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusPreviousItem())},ArrowDown(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusNextItem())},ArrowLeft(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusPreviousItem())},ArrowRight(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusNextItem())},Home(r){r.preventDefault(),n.focusFirstItem()},End(r){r.preventDefault(),n.focusLastItem()},Enter(r){r.preventDefault(),n.performMenuAction(t.activeItemId,"keyboard")},Escape(){t.panelId||n.closePopover()},default(r){r.key.length===1&&(!t.search&&r.key===" "?(r.preventDefault(),n.performMenuAction(t.activeItemId,"keyboard")):n.focusTypeaheadItem(r.key))}});return{onKeyDown:r=>{o(r),e.onKeyDown?.(r)}}}function Rl(e){const t=ue(),n=L();Nl(e),t.panelId||(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})),Hl()}function Nl(e){g(()=>{L().setElementId("listId",e.id)})}function Hl(){const e=L();g(()=>{e.initializeItemFocus()})}function Bl(e={}){const t=Ul(e),n=Wl(e);return{props:P(t,n),effects:()=>Kl({id:t.id}),context:$e()}}function Ul(e){const{idPrefix:t="solid-ui-menu-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function Wl(e){const t=L();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function Kl(e){const t=ue(),n=L();Gl({id:e.id}),t.listId&&(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id})),le({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function Gl(e){const t=L();g(()=>{t.setElementId("panelId",e.id)})}function jl(e){e=P({orientation:"vertical"},e);const t=_l({orientation:()=>e.orientation,getInitialFocusedItem:(n,o)=>o.indexOf(n)===0});return s(Xe.Provider,{value:t,get children(){return(()=>(e.context?.($e()),e.children))()}})}function Yl(e={}){const t=Jl(e),n=zl(e);return{props:P(t,n),effects:()=>ql({id:t.id}),context:$e()}}function Jl(e={}){const t=ue(),{idPrefix:n="solid-ui-menu-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"menu","data-solid-ui-button":"",...v(n),id:o}}function zl(e={}){const t=L();return{onClick:i=>{t.togglePopover(),e.onClick?.(i)},onKeyDown:i=>{i.key==="Escape"?t.closePopover():(i.key==="ArrowDown"||i.key==="ArrowUp")&&(i.preventDefault(),t.openPopover()),e.onKeyDown?.(i)}}}function ql(e){Xl(e),Ql(e)}function Xl(e){g(()=>{L().setElementId("triggerId",e.id)})}function Ql(e){const t=ue();k(n=>(n&&!t.isPanelOpen&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const re=Object.assign(jl,{createItem:wl,createList:Tl,createPanel:Bl,createTrigger:Yl}),Zl=p("<button></button>"),ea=p("<div></div>"),sn=p("<ul></ul>"),ta=p("<li></li>"),na=p("<a></a>"),oa=p("<div><div>Last menu item clicked: </div></div>"),ra=p('<section><h2 id="Menu">Menu</h2><p>Menu lets you build dropdowns with items that can perform an <!> when selected, or rely on their native click behavior when selected (like navigating to a new page with a link).</p><p>Menu can either directly render a list with <!>, or can first render a parent panel with <!>.</p><h3>Example</h3><h3>Code</h3></section>'),ia=p('<a href="#Menu">Menu</a>'),ln=e=>{const{props:t,effects:n}=re.createTrigger();return n(),(()=>{const o=Zl.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),o.style.setProperty("margin-right","1rem"),l(o,()=>e.children),o})()},sa=e=>{const{props:t,effects:n,context:o}=re.createPanel();return k(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(ie,{get children(){const i=ea.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})},an=e=>{const{props:t,effects:n,context:o}=re.createList();return k(()=>{(o.hasPanel()||o.isOpen())&&n()}),s(pn,{get children(){return[s(Te,{get when(){return o.hasPanel()},get children(){const i=sn.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}}),s(Te,{get when(){return!o.hasPanel()},get children(){return s(q,{get when(){return o.isOpen()},get children(){return s(ie,{get children(){const i=sn.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}})]}})},cn=e=>{const{props:t,effects:n}=re.createItem({action:e.action});return n(),(()=>{const o=ta.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},un=e=>{const{props:t,effects:n}=re.createItem();return n(),(()=>{const o=na.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),Pe(()=>Gn(o,"href",e.href)),o})()};function la(){const e=["Item 1","Item 2","Item 3"],[t,n]=z("");return(()=>{const o=oa.cloneNode(!0),i=o.firstChild;return i.firstChild,l(i,t,null),l(o,s(x,{get children(){return s(re,{get children(){return[s(ln,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},children:"Menu"}),s(an,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return[s(V,{each:e,children:r=>s(cn,{action:()=>n(r),children:r})}),s(un,{href:"/",children:"Go to Homepage"})]}})]}})}}),null),l(o,s(x,{get children(){return s(re,{get children(){return[s(ln,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},children:"Menu"}),s(sa,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return["Choose an item:",s(an,{get children(){return[s(V,{each:e,children:r=>s(cn,{action:()=>n(r),children:r})}),s(un,{href:"/",children:"Go to Homepage"})]}})]}})]}})}}),null),o})()}function ht(){return(()=>{const e=ra.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling;i.nextSibling;const r=n.nextSibling,c=r.firstChild,a=c.nextSibling,u=a.nextSibling,d=u.nextSibling;d.nextSibling;const b=r.nextSibling,I=b.nextSibling;return l(n,s(f,{children:"action()"}),i),l(r,s(f,{children:"createList()"}),a),l(r,s(f,{children:"createPanel()"}),d),l(e,s(la,{}),I),l(e,s(C,{children:aa}),null),e})()}ht.Link=()=>ia.cloneNode(!0);const aa=`import { Component, createEffect, createSignal, For, Match, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '@solid-ui/popper';
import { ComponentRef } from '@solid-ui/types';
import Menu from '@solid-ui/menu';

const MenuTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Menu.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps} style={{ 'margin-right': '1rem' }}>
      {props.children}
    </button>
  );
};

const MenuPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Menu.createPanel();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

const MenuList: Component<{ ref?: ComponentRef<HTMLUListElement> }> = (props) => {
  const { props: listProps, effects, context } = Menu.createList();

  createEffect(() => {
    if (context.hasPanel() || context.isOpen()) {
      effects();
    }
  });

  return (
    <Switch>
      <Match when={context.hasPanel()}>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Match>
      <Match when={!context.hasPanel()}>
        <Show when={context.isOpen()}>
          <Portal>
            <ul ref={props.ref} {...listProps}>
              {props.children}
            </ul>
          </Portal>
        </Show>
      </Match>
    </Switch>
  );
};

const MenuItem: Component<{ action: () => void }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem({ action: props.action });

  effects();

  return <li {...itemProps}>{props.children}</li>;
};

const MenuItemLink: Component<{ href: string }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem();

  effects();

  return (
    <a {...itemProps} href={props.href}>
      {props.children}
    </a>
  );
};

function MyMenu() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const [itemClicked, setItemClicked] = createSignal('');

  return (
    <div>
      <div>Last menu item clicked: {itemClicked()}</div>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuList ref={Popper.PopperRef}>
            <For each={items}>
              {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
            </For>
            <MenuItemLink href="/">Go to Homepage</MenuItemLink>
          </MenuList>
        </Menu>
      </Popper>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuPanel ref={Popper.PopperRef}>
            Choose an item:
            <MenuList>
              <For each={items}>
                {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
              </For>
              <MenuItemLink href="/">Go to Homepage</MenuItemLink>
            </MenuList>
          </MenuPanel>
        </Menu>
      </Popper>
    </div>
  );
}`,ca=p("<button></button>"),Pn=p("<div></div>"),ua=p("<span>This is the content of the popover.</span>"),da=p('<section><h2 id="Popover">Popover</h2><p>A popover is a floating panel that appears near an anchor point.</p><h3>Example</h3><h3>Code</h3></section>'),pa=p('<li><a href="#Popover">Popover</a></li>'),dn=e=>{const{props:t,effects:n}=Ke.createTrigger();return n(),(()=>{const o=ca.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),l(o,()=>e.children),o})()},fa=e=>{const{props:t,effects:n,context:o}=Ke.createOverlay();return k(()=>{o.isOverlayOpen()&&n()}),s(q,{get when(){return o.isOverlayOpen()},get children(){return s(ie,{get children(){const i=Pn.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),i}})}})},ha=e=>{const{props:t,effects:n,context:o}=Ke.createPanel();return k(()=>{o.isPopoverOpen()&&n()}),s(q,{get when(){return o.isPopoverOpen()},get children(){return s(ie,{get children(){const i=Pn.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})},ma=()=>s(x,{get children(){return s(Ke,{get children(){return[s(dn,{ref(e){const t=x.AnchorRef;typeof t=="function"?t(e):x.AnchorRef=e},children:"Open popover"}),s(fa,{}),s(ha,{ref(e){const t=x.PopperRef;typeof t=="function"?t(e):x.PopperRef=e},get children(){return[(()=>{const e=ua.cloneNode(!0);return e.style.setProperty("margin-right","20px"),e})(),s(dn,{children:"X"})]}})]}})}}),mt=()=>(()=>{const e=da.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(ma,{}),i),l(e,s(C,{children:ga}),null),e})();mt.Link=()=>pa.cloneNode(!0);const ga=`import { Component, createEffect, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '@solid-ui/types';
import Popover from '@solid-ui/popover';
import Popper from '@solid-ui/popper';

const PopoverTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Popover.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
};

const PopoverOverlay: Component = (props) => {
  const { props: overlayProps, effects, context } = Popover.createOverlay();

  createEffect(() => {
    if (context.isOverlayOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOverlayOpen()}>
      <Portal>
        <div {...overlayProps}>{props.children}</div>
      </Portal>
    </Show>
  );
};

const PopoverPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

const MyPopover: Component = () => {
  return (
    <Popper>
      <Popover>
        <PopoverTrigger ref={Popper.AnchorRef}>Open popover</PopoverTrigger>
        <PopoverOverlay />
        <PopoverPanel ref={Popper.PopperRef}>
          <span style={{ 'margin-right': '20px' }}>This is the content of the popover.</span>
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverPanel>
      </Popover>
    </Popper>
  );
};`;function va(e){const[t,n]=W({labelId:null,activeItemId:null,items:[],search:""}),o={},i={...Ue(n,{getInitialFocusedItem:(c,a)=>[null,void 0].includes(e.value?.())?a.indexOf(c)===0:o[c]===e.value?.(),shouldWrap:!0}),setElementId(c,a){n({[c]:a})},addValue(c,a){o[c]=a},removeValue(c){delete o[c]},chooseValue(c){const a=o[c];c&&a!==e.value()&&e.onChange?.(a)}},r={isActive:G(()=>t.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[t,i,r]}const Qe=K();function yn(){return y(Qe)[0]}function de(){return y(Qe)[1]}function kt(){return y(Qe)[2]}function Ze(){const e=kt();return{isActive:t=>e.isActive(t),isSelected:t=>e.isSelected(t)}}function ba(e={}){const t=xa(e);return{props:t,effects:()=>Pa({id:t.id}),context:Ze()}}function xa(e={}){const{idPrefix:t="solid-ui-radiogroup-label"}=e;return{id:m(t)}}function Pa(e){ya(e)}function ya(e){const t=de();g(()=>{t.setElementId("labelId",e.id)})}function Ca(e){const t=va({onChange:e.onChange,shouldWrap:!0,value:()=>e.value});return s(Qe.Provider,{value:t,get children(){return(()=>(e.context?.(Ze()),e.children))()}})}function Ia(e={}){const t=Sa(e),n=$a({id:t.id,...e}),o=kt(),i={...Ze(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value?.())};return{props:P(t,n),effects:()=>_a({id:t.id,value:e.value}),context:i}}function Sa(e){const{idPrefix:t="solid-ui-radiogroup-radio"}=e,n=m(t),o=kt();return{get["aria-checked"](){return o.isSelected(e.value?.())},get["data-active"](){return o.isActive(n)?"":void 0},get["data-checked"](){return o.isSelected(e.value?.())?"":void 0},...v(t),id:n,role:"radio",tabIndex:-1}}function $a(e){const t=de();return{onClick:r=>{t.chooseValue(e.id),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function _a(e){wa(e),Ma(e),Da(e),ka(e)}function wa(e){const t=de();g(()=>{t.addItem(e.id)})}function Ma(e){const t=de();R(()=>{t.removeItem(e.id)})}function Da(e){const t=de();g(()=>{t.addValue(e.id,e.value())})}function ka(e){const t=de();R(()=>{t.removeValue(e.id)})}function La(e={}){const t=Ea(e),n=Oa(e);return{props:P(t,n),effects:()=>void 0,context:Ze()}}function Ea(e={}){const{idPrefix:t="solid-ui-radiogroup"}=e,n=m(t),o=yn();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},...v(t),id:n,role:"radiogroup",tabIndex:0}}function Oa(e={}){const t=yn(),n=de(),o=a=>{n.clearItemFocus(),e.onBlur?.(a)},i=a=>{n.initializeItemFocus(),e.onFocus?.(a)},r=ye({ArrowUp(a){a.preventDefault(),n.focusPreviousItem(),n.chooseValue(t.activeItemId)},ArrowDown(a){a.preventDefault(),n.focusNextItem(),n.chooseValue(t.activeItemId)},ArrowLeft(a){a.preventDefault(),n.focusPreviousItem(),n.chooseValue(t.activeItemId)},ArrowRight(a){a.preventDefault(),n.focusNextItem(),n.chooseValue(t.activeItemId)},[" "](a){a.preventDefault(),n.chooseValue(t.activeItemId)}});return{onBlur:o,onFocus:i,onKeyDown:a=>{r(a),e.onKeyDown?.(a)}}}const Re=Object.assign(Ca,{createLabel:ba,createRadio:Ia,createRadioGroup:La}),Fa=p("<label></label>"),Ta=p("<ul></ul>"),Aa=p("<li></li>"),Va=p('<section><h2 id="Radio Group">Radio Group</h2><p>Radio groups function just like a <!> with <!> elements in it, but without any of the styling.</p><h3>Example</h3><h3>Code</h3></section>'),Ra=p('<a href="#Radio Group">Radio Group</a>');function Na(e){const{props:t,effects:n}=Re.createLabel();return n(),(()=>{const o=Fa.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ha(e){return s(Re,P(e,{get children(){return(()=>{const{props:t,effects:n}=Re.createRadioGroup();return n(),(()=>{const o=Ta.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()})()}}))}function Ba(e){const{props:t,effects:n}=Re.createRadio({value:()=>e.value});return n(),(()=>{const o=Aa.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ua(){const[e,t]=z();return s(Ha,{get value(){return e()},onChange:n=>{console.log(n),t(n)},get children(){return[s(Na,{children:"Choose a fruit: "}),s(V,{each:Ae,children:n=>s(Ba,{value:n,get children(){return n.displayValue}})})]}})}function gt(){return(()=>{const e=Va.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling;c.nextSibling;const a=n.nextSibling,u=a.nextSibling;return l(n,s(f,{language:"html",children:"<fieldset>"}),i),l(n,s(f,{language:"html",children:'<input type="radio" />'}),c),l(e,s(Ua,{}),u),l(e,s(C,{children:Wa}),null),e})()}gt.Link=()=>Ra.cloneNode(!0);const Wa=`import { createSignal, For, PropsWithChildren } from 'solid-js';
import RadioGroupComponent, { RadioGroupProviderProps } from '@solid-ui/radiogroup';

function RadioGroupLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = RadioGroupComponent.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function RadioGroup<Value>(props: PropsWithChildren<RadioGroupProviderProps<Value>>) {
  return (
    <RadioGroupComponent {...props}>
      {(() => {
        const { props: radioGroupProps, effects } = RadioGroupComponent.createRadioGroup();
        effects();
        return <ul {...radioGroupProps}>{props.children}</ul>;
      })()}
    </RadioGroupComponent>
  );
}

function Radio<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const { props: radioProps, effects } = RadioGroupComponent.createRadio<Value>({
    value: () => props.value,
  });

  effects();

  return <li {...radioProps}>{props.children}</li>;
}

export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];

function MyRadioGroup() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <RadioGroup
      value={value()}
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
    >
      <RadioGroupLabel>Choose a fruit: </RadioGroupLabel>
      <For each={fruits}>{(fruit) => <Radio value={fruit}>{fruit.displayValue}</Radio>}</For>
    </RadioGroup>
  );
}`;function Ka(){const[e,t]=W({descriptionId:null,labelId:null,switchId:null});return[e,{setElementId(o,i){t({[o]:i})}}]}const Lt=K();function Cn(){return y(Lt)[0]}function Et(){return y(Lt)[1]}function Ga(e={}){const t=ja(e);return{props:t,effects:()=>Ya({id:t.id})}}function ja(e={}){const{idPrefix:t="solid-ui-switch-description"}=e;return{id:m(t)}}function Ya(e){Ja(e)}function Ja(e){const t=Et();g(()=>{t.setElementId("descriptionId",e.id)})}function za(e={}){const t=qa(e),n=Xa(e);return{props:P(t,n),effects:()=>Qa({id:t.id})}}function qa(e={}){const{idPrefix:t="solid-ui-switch-label"}=e,n=m(t);return{...v(t),id:n}}function Xa(e={}){const t=Cn();return{onClick:o=>{e.passive||document.getElementById(t.labelId)?.click(),e.onClick?.(o)}}}function Qa(e){Za(e)}function Za(e){const t=Et();g(()=>{t.setElementId("labelId",e.id)})}function ec(e){const t=Ka();return s(Lt.Provider,{value:t,get children(){return e.children}})}function tc(e={}){const t=nc(e),n=oc(e);return{props:P(t,n),effects:()=>rc({id:t.id})}}function nc(e){const{idPrefix:t="solid-ui-switch"}=e,n=m(t),o=Cn();return{get["aria-checked"](){return e.checked()},get["aria-describedby"](){return o.descriptionId},get["aria-labelledby"](){return o.labelId},...v(t),get["data-checked"](){return e.checked()?"":void 0},id:n,role:"switch",tabIndex:0}}function oc(e={}){const t=()=>e.onChange?.(!e.checked?.());return{onClick:r=>{t(),e.onClick?.(r)},onKeyPress:r=>{r.preventDefault(),e.onKeyPress?.(r)},onKeyUp:r=>{r.key!=="Tab"&&r.preventDefault(),r.key===" "&&t(),e.onKeyUp?.(r)}}}function rc(e){ic(e)}function ic(e){const t=Et();g(()=>{t.setElementId("switchId",e.id)})}const et=Object.assign(ec,{createDescription:Ga,createLabel:za,createSwitch:tc}),sc=p('<button type="button"></button>'),lc=p("<p></p>"),ac=p("<label></label>"),cc=p('<section><h2 id="Switch">Switch</h2><p>A switch functions just like a native checkbox, but has switch semantics applied to it instead.</p><h3>Example</h3><h3>Code</h3></section>'),uc=p('<a href="#Switch">Switch</a>'),dc=e=>{const{props:t,effects:n}=et.createSwitch({checked:()=>e.checked,onChange:e.onChange});return n(),(()=>{const o=sc.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},pc=e=>{const{props:t,effects:n}=et.createDescription();return n(),(()=>{const o=lc.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},fc=e=>{const{props:t,effects:n}=et.createLabel();return n(),(()=>{const o=ac.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},hc=()=>{const[e,t]=z(!1);return s(et,{get children(){return[s(fc,{children:"Enable feature flag: "}),s(dc,{get checked(){return e()},onChange:t}),s(pc,{children:"This is the description of the switch."})]}})};function vt(){return(()=>{const e=cc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(hc,{}),i),l(e,s(C,{children:mc}),null),e})()}vt.Link=()=>uc.cloneNode(!0);const mc=`import { Component, createSignal, PropsWithChildren } from 'solid-js';
import Switch from '@solid-ui/switch';

const SwitchButton: Component<{ checked: boolean; onChange: (checked: boolean) => void }> = (
  props
) => {
  const { props: switchProps, effects } = Switch.createSwitch({
    checked: () => props.checked,
    onChange: props.onChange,
  });

  effects();

  return (
    <button type="button" {...switchProps}>
      {props.children}
    </button>
  );
};

const SwitchDescription: Component = (props: PropsWithChildren) => {
  const { props: descriptionProps, effects } = Switch.createDescription();

  effects();

  return <p {...descriptionProps}>{props.children}</p>;
};

const SwitchLabel: Component = (props) => {
  const { props: labelProps, effects } = Switch.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
};

const MySwitch: Component = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch>
      <SwitchLabel>Enable feature flag: </SwitchLabel>
      <SwitchButton checked={checked()} onChange={setChecked} />
      <SwitchDescription>This is the description of the switch.</SwitchDescription>
    </Switch>
  );
};`;const gc=p('<section><h2 id="Extensions">Extensions</h2><p>By default, Solid UI makes no assumptions as to how you want to do things like position a popover near an anchor point. As <a href="https://popper.js.org/">PopperJS</a> is a popular positioning library, Solid UI comes with a built-in <!> component:</p></section>'),vc=p('<a href="#Extensions">Extensions</a>');function bt(){return(()=>{const e=gc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling;return c.nextSibling,l(n,s(f,{children:"Popper"}),c),l(e,s(C,{children:bc}),null),e})()}bt.Link=()=>vc.cloneNode(!0);const bc=`import Popper from '@solid-ui/popper';

function MyPopover() {
  return (
    <Popper>
      <MyTrigger ref={Popper.AnchorRef} />
      <MyPopover ref={Popper.PopperRef} />
    </Popper>
  )
}`,xc=p(`<section><h2 id="Styling">Styling</h2><p>As Solid UI provides hooks for creating components, and not components themselves, Solid UI components are "unstyled" and only include the styles that you add. Solid UI includes separate component hooks for each part of a component, so styles can easily and declaratively be applied to every part of the component.</p><h3>Data attributes</h3><p>Each Solid UI component does include a unique <!> attribute that can be used to apply styles with CSS:</p><p>If you would like to override these data attributed and supply your own, every component hook includes an optional <!> property:</p><p>Some generic data attributes are also added for elements that are common among many Solid UI components, such as <!> for buttons. Providing styles for this attribute will apply the same styling to all Solid UI components that are intended to be buttons:</p><h3>Default Styles</h3><p>As a starting point, Solid UI also comes with a set of default styles (like the ones on this page), which can be added by importing <!>:</p><p>All default styles rely on Solid UI's default data attributes and use the lowest specificity possible, so they are easy to override.</p></section>`),Pc=p('<a href="#Styling">Styling</a>');function xt(){return(()=>{const e=xc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling,r=i.firstChild,c=r.nextSibling;c.nextSibling;const a=i.nextSibling,u=a.firstChild,d=u.nextSibling;d.nextSibling;const b=a.nextSibling,I=b.firstChild,E=I.nextSibling;E.nextSibling;const H=b.nextSibling,O=H.nextSibling,F=O.firstChild,B=F.nextSibling;B.nextSibling;const _=O.nextSibling;return l(i,s(f,{language:"html",children:"[data-solid-ui-*]"}),c),l(e,s(C,{language:"css",children:yc}),a),l(a,s(f,{children:"isPrefix"}),d),l(e,s(C,{children:Cc}),b),l(b,s(f,{language:"html",children:"[data-solid-ui-button]"}),E),l(e,s(C,{language:"css",children:Ic}),H),l(O,s(f,{children:"styles.css"}),B),l(e,s(C,{children:"import '@solid-ui/styles.css';"}),_),e})()}xt.Link=()=>Pc.cloneNode(!0);const yc=`[data-solid-ui-popover-trigger] {
  background: red;
}

[data-solid-ui-popover-trigger]:hover {
  background: blue;
}`,Cc=`const { props } = Popover.createTrigger({ idPrefix: 'my-trigger' });
// trigger data attribute is now "data-my-trigger"`,Ic=`[data-solid-ui-button]:hover {
  background: green;
}`,Sc=p('<nav><header><h1><a href="#Home">SOLID<strong>UI</strong></a></h1></header><ul><li></li><li></li><li></li></ul><hr aria-hidden="true"><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></nav>'),$c=p('<main><h1 id="Home">SOLID<strong>UI</strong></h1><p>Hooks for building declarative, accessible, composable UI components with SolidJS.</p></main>');function _c(){return[(()=>{const e=Sc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=n.nextSibling,a=c.nextSibling,u=a.firstChild,d=u.nextSibling,b=d.nextSibling,I=b.nextSibling,E=I.nextSibling,H=E.nextSibling,O=H.nextSibling,F=O.nextSibling,B=F.nextSibling;return l(o,s(at.Link,{})),l(i,s(xt.Link,{})),l(r,s(bt.Link,{})),l(u,s(mt.Link,{})),l(d,s(dt.Link,{})),l(b,s(ht.Link,{})),l(I,s(ft.Link,{})),l(E,s(ut.Link,{})),l(H,s(gt.Link,{})),l(O,s(pt.Link,{})),l(F,s(vt.Link,{})),l(B,s(ct.Link,{})),e})(),(()=>{const e=$c.cloneNode(!0);return e.firstChild.nextSibling,l(e,s(at,{}),null),l(e,s(xt,{}),null),l(e,s(bt,{}),null),l(e,s(mt,{}),null),l(e,s(dt,{}),null),l(e,s(ht,{}),null),l(e,s(ft,{}),null),l(e,s(ut,{}),null),l(e,s(gt,{}),null),l(e,s(pt,{}),null),l(e,s(vt,{}),null),l(e,s(ct,{}),null),e})()]}const wc=()=>s(_c,{});jn(()=>s(wc,{}),document.getElementById("root"));
