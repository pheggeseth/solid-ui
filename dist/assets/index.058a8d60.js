import{t as p,i as l,c as Pe,a as s,b as U,d as G,e as he,u as C,f as W,m as P,g as L,h as z,s as h,j as it,F as V,o as g,k as R,l as Nn,P as re,S as q,n as Hn,p as st,M as Fe,q as un,r as Bn,v as Un}from"./vendor.5fbe6ce5.js";const Wn=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}};Wn();const Kn=p("<code></code>"),Gn=p("<pre></pre>"),fe=e=>({displayValue:e,value:e}),Te=[fe("apple"),fe("apricot"),fe("orange"),fe("peach"),fe("pineapple"),fe("watermelon")],f=e=>(()=>{const t=Kn.cloneNode(!0);return l(t,()=>e.children),Pe(()=>t.className=`language-${e.language||"tsx"}`),t})(),I=e=>(()=>{const t=Gn.cloneNode(!0);return l(t,s(f,{get language(){return e.language},get children(){return e.children}})),t})(),jn=p(`<section><h2 id="Background">Background</h2><p>Solid UI is a low-level library for declaratively building accessible, composable UI components using reactive primitives/hooks built with SolidJS. Rather than expose pre-built components, Solid UI gives you simple, consistent hooks which take care of managing the props, effect, and internal state needed to build UI components that follow WAI-ARIA accessibility recommendations.</p><h3>Installation</h3><p>For each component, you have the option of importing hooks individually:</p><p>or all at once from the component's default import:</p><h3>General API</h3><p>Every hook, for every component, returns an object with the same API:</p><h3></h3><p>The props needed for the component. This object needs to be spread out onto the underlying root element of the component.</p><h3></h3><p>This function creates any effects needed by the component using functions from SolidJS such as <!> and <!>.</p><p> needs to be called when the underlying element/component with our <!> <strong>mounts</strong>, and <strong>not</strong> when the parent component mounts. This is because <!> may contain <!> hooks that expect the element with <!> to have been rendered to the DOM.</p><p>For example, the following won't properly register effects:</p><p>as <!> is called when <!> mounts, and <strong>not</strong> when the <!> mounts. This can be easily fixed by wrapping the <!> call in <!>:</p><p>If the component does not require any effects, it will not provide an <!> property.</p><h3></h3><p>An object that exposes certain pieces of internal sate, or callbacks to manually change that state. For example, the context for <!> is:</p><p>The first two properties are <!>s that return pieces of internal state, while the last two properties can alter that state by manually opening or closing the <!>.</p><p>Often, in components written with libraries like React, you will see internal context being exposed through a "render prop" pattern, where the <!> of the component is supplied as a function which can receive parameters from the parent component:</p><p>As component functions in SolidJS only get called once, the "render prop" pattern becomes tricky to use (as our render prop function would only get called once).</p><p>Instead, Solid UI returns a <!> object from its component hooks, whose properties are either callbacks or SolidJS reactive primitives:</p><h3>Component stores and provider components</h3><p>Every Solid UI component relies on a SolidJS <!> being provided using SolidJS <!>.</p><p>Stores can be created using a component's "createStore" hook and provided using the corresponding component Context provider:</p><p>The only components that Solid UI exports directly are context provider components. Every composable Solid UI component relies on SolidJS context, and each component's context needs to be provided so that its sub-components can communicate.</p><p>Because this is such a common pattern, Solid UI exports simple provider components which implement this pattern:</p><h3>Provider components can use their own <!>!</h3><p>Because we want every component (even provider components) to have access to the component context, if needed, Solid UI provider components are implemented so that every provider component takes in an optional <!> prop, which is a function that gets passed the component's context as a parameter. Think of it like a function <!> or a render prop, where the function gives you access to the internal context so you can save it for later.</p></section>`),Yn=p('<a href="#Background">Background</a>');function lt(){return(()=>{const e=jn.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling,a=c.nextSibling,u=a.nextSibling,d=u.nextSibling,b=d.nextSibling,y=b.nextSibling,T=y.firstChild,A=T.nextSibling,F=A.nextSibling,H=F.nextSibling;H.nextSibling;const _=y.nextSibling,w=_.firstChild,Y=w.nextSibling,de=Y.nextSibling,ee=de.nextSibling,k=ee.nextSibling,J=k.nextSibling,te=J.nextSibling,pe=te.nextSibling,M=pe.nextSibling,O=M.nextSibling,B=O.nextSibling,_e=B.nextSibling;_e.nextSibling;const we=_.nextSibling,K=we.nextSibling,Me=K.firstChild,De=Me.nextSibling,et=De.nextSibling,Et=et.nextSibling,yn=Et.nextSibling,Cn=yn.nextSibling,In=Cn.nextSibling,Ot=In.nextSibling,Sn=Ot.nextSibling,Ft=Sn.nextSibling,$n=Ft.nextSibling,Tt=$n.nextSibling;Tt.nextSibling;const ke=K.nextSibling,_n=ke.firstChild,At=_n.nextSibling;At.nextSibling;const Vt=ke.nextSibling,tt=Vt.nextSibling,wn=tt.firstChild,Rt=wn.nextSibling;Rt.nextSibling;const xe=tt.nextSibling,Mn=xe.firstChild,Nt=Mn.nextSibling,Dn=Nt.nextSibling,Ht=Dn.nextSibling;Ht.nextSibling;const nt=xe.nextSibling,kn=nt.firstChild,Bt=kn.nextSibling;Bt.nextSibling;const Ut=nt.nextSibling,ot=Ut.nextSibling,Ln=ot.firstChild,Wt=Ln.nextSibling;Wt.nextSibling;const Kt=ot.nextSibling,Le=Kt.nextSibling,En=Le.firstChild,Gt=En.nextSibling,On=Gt.nextSibling,jt=On.nextSibling;jt.nextSibling;const Fn=Le.nextSibling,Yt=Fn.nextSibling,Tn=Yt.nextSibling,Ee=Tn.nextSibling,An=Ee.firstChild,Jt=An.nextSibling;Jt.nextSibling;const rt=Ee.nextSibling,Vn=rt.firstChild,zt=Vn.nextSibling,Rn=zt.nextSibling,qt=Rn.nextSibling;return qt.nextSibling,l(e,s(I,{children:"import { createTrigger, createPanel } from '@solid-ui/popover';"}),r),l(e,s(I,{children:Jn}),c),l(e,s(I,{children:zn}),u),l(u,s(f,{children:"props"})),l(b,s(f,{children:"effects"})),l(y,s(f,{children:"createEffect"}),A),l(y,s(f,{children:"onMount"}),H),l(_,s(f,{children:"effects"}),w),l(_,s(f,{children:"props"}),Y),l(_,s(f,{children:"effects"}),pe),l(_,s(f,{children:"onMount"}),O),l(_,s(f,{children:"props"}),_e),l(e,s(I,{children:qn}),K),l(K,s(f,{children:"effects()"}),De),l(K,s(f,{children:"PopoverPanel"}),Et),l(K,s(f,{children:"<div {...panelProps} />"}),Ot),l(K,s(f,{children:"effects()"}),Ft),l(K,s(f,{children:"createEffect"}),Tt),l(e,s(I,{children:Xn}),ke),l(ke,s(f,{children:"effects"}),At),l(Vt,s(f,{children:"context"})),l(tt,s(f,{children:"Popover"}),Rt),l(e,s(I,{children:Qn}),xe),l(xe,s(f,{children:"Accessor"}),Nt),l(xe,s(f,{children:"Popover"}),Ht),l(nt,s(f,{children:"children"}),Bt),l(e,s(I,{children:Zn}),Ut),l(ot,s(f,{children:"context"}),Wt),l(e,s(I,{children:eo}),Kt),l(Le,s(f,{children:"store"}),Gt),l(Le,s(f,{children:"context"}),jt),l(e,s(I,{children:to}),Yt),l(e,s(I,{children:no}),Ee),l(Ee,s(f,{children:"context"}),Jt),l(rt,s(f,{children:"context"}),zt),l(rt,s(f,{children:"ref"}),qt),l(e,s(I,{children:oo}),null),e})()}lt.Link=()=>Yn.cloneNode(!0);const Jn=`import Popover from '@solid-ui/popover';

const trigger = Popover.createTrigger();
const panel = Popover.createPanel();`,zn=`import Popover from '@solid-ui/popover';

function PopoverTrigger() {
  const { props, effects, context } = Popover.createTrigger();

  effects();

  return <button { ...props }>{ context.isPopoverOpen() ? 'Close' : 'Open' }</button>
}`,qn=`import { Component, Show } from 'solid-js';

const PopoverPanel: Component = (props) => {
  const { props: panelProps, effects, context } = Popover.createPanel();

  effects();

  return (
    <Show when={context.isPopoverOpen()}>
      <div {...panelProps}>{props.children}</div>
    </Show>
  );
};`,Xn=`import { Component, createEffect, Show } from 'solid-js';

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
};`,Qn=`import { Accessor } from 'solid-js';

export type PopoverContext = Readonly<{
  isPopoverOpen: Accessor<boolean>;
  isOverlayOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;`,Zn=`import SomeComponent from 'some-react-library';

function ReactRenderProps() {
  return (
    <SomeComponent>
      {({ isActive }) => <div style={{ background: isActive ? 'red' : 'blue' }}></div>}
    </SomeComponent>
  );
}`,eo=`function SolidUIContext() {
  const { props, context } = SomeComponent.createPart();

  return <div {...props} style={{ background: context.isActive() ? 'red' : 'blue' }}></div>;
}`,to=`import { PopoverStoreContext, createPopoverStore } from '@solid-ui/popover';

() => {
  const store = createPopoverStore();
  return (
    <PopoverStoreContext.Provider value={store}></PopoverStoreContext.Provider>
  );
}`,no=`function PopoverProvider(props) {
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
<Popover></Popover> // the main function of the default export IS the "PopoverProvider"`,oo=`import Popover from '@solid-ui/popover';

let context;
<Popover context={(ctx) => {
  context = ctx; // we now have access to the context object that Popover itself provides!
}}></Popover>`,Oe=new Map;function m(e){return Oe.set(e,Oe.has(e)?Oe.get(e)+1:1),`${e}-${Oe.get(e)}`}const v=e=>e?{[`data-${e}`]:""}:{};function ro(e,t){const n=new Date(e,t),o=n.getDay(),i=new Date(e,t+1,0),r=6-i.getDay(),c=i.getDate()+o+r;n.setDate(n.getDate()-o),i.setDate(i.getDate()+r);const a=[];for(let u=0;u<c/7;u++){const d=[];for(let b=0;b<7;b++){const y=new Date(n);y.setDate(y.getDate()+u*7+b),d.push(y)}a.push(d)}return a}function io(e){const t=new Date(e.value?.()),[n,o]=U({activeDate:t,visibleMonth:t.getMonth(),visibleYear:t.getFullYear(),ariaLabel:null,isActiveDateFromUserInteraction:!1,deferredDateClick:null}),i=new Intl.DateTimeFormat([],{month:"long",year:"numeric"}),r={selectDate(a){o({activeDate:a,visibleMonth:a.getMonth(),visibleYear:a.getFullYear(),ariaLabel:i.format(a),isActiveDateFromUserInteraction:!0})},viewCalendarMonth(a,u){const d=new Date(a,u);o({activeDate:d,visibleMonth:u,visibleYear:a,ariaLabel:i.format(d),isActiveDateFromUserInteraction:!1})},goTo(a,u){const d=a==="next"?1:-1,b=new Date(n.activeDate);u==="day"?b.setDate(n.activeDate.getDate()+d):u==="month"?b.setMonth(n.activeDate.getMonth()+d):u==="week"?b.setDate(n.activeDate.getDate()+d*7):u==="year"&&b.setFullYear(n.activeDate.getFullYear()+d),r.selectDate(b)},view(a,u){const d=a==="next"?1:-1;r.viewCalendarMonth(n.activeDate.getFullYear()+(u==="year"?d:0),n.activeDate.getMonth()+(u==="month"?d:0))},viewToday(){const a=new Date;r.viewCalendarMonth(a.getFullYear(),a.getMonth())},selectVisibleMonth(a){r.viewCalendarMonth(n.activeDate.getFullYear(),a)},selectVisibleYear(a){r.viewCalendarMonth(a,n.activeDate.getMonth())},onCancel(){e.onCancel?.()},onDateConfirm(){e.onChange(n.activeDate)},onDateClick(a){r.selectDate(a),o({deferredDateClick:null}),r.onDateConfirm()},onDeferredDateClick(a){o({deferredDateClick:a})}},c={isActive:G(()=>n.activeDate,(a,u)=>a.toDateString()===u.toDateString()),isInDateRange:()=>!1,isInVisibleMonth:G(()=>n.visibleMonth,(a,u)=>a.getMonth()===u),isSelected:G(()=>e.value?.(),(a,u)=>a.toDateString()===u.toDateString()),isToday:a=>a.toDateString()===new Date().toDateString(),visibleYear:()=>n.visibleYear,visibleMonth:()=>n.visibleMonth,visibleWeeks:he(()=>ro(n.visibleYear,n.visibleMonth))};return[n,r,c]}const Re=W();function Ne(){return C(Re)[0]}function ie(){return C(Re)[1]}function He(){return C(Re)[2]}function N(){return{...He()}}function so(e={}){const t=lo(e),n=ao(e);return{props:P(t,n)}}function lo(e={}){const{idPrefix:t="solid-ui-calendar-cancel"}=e,n=m(t);return{...v(t),"data-solid-ui-button":"",id:n}}function ao(e={}){const t=ie();return{onClick:o=>{t.onCancel(),e.onClick?.(o)}}}function co(e={}){const t=uo(e),n=po(e);return{props:P(t,n)}}function uo(e={}){const{idPrefix:t="solid-ui-calendar-save"}=e,n=m(t);return{...v(t),"data-solid-ui-button":"",id:n}}function po(e={}){const t=ie();return{onClick:o=>{t.onDateConfirm(),e.onClick?.(o)}}}function fo(e={}){return{props:ho(e)}}function ho(e={}){const{idPrefix:t="solid-ui-calendar-root"}=e,n=m(t),o=Ne();return{get["aria-label"](){return o.ariaLabel},"aria-modal":e["aria-modal"],...v(t),"solid-ui-calendar-root":"",id:n,role:e.role,...e.modal?{"aria-modal":!0,role:"dialog"}:{}}}function mo(e={}){return{props:go(e),context:N()}}function go(e={}){const{idPrefix:t="solid-ui-calendar-month-body"}=e,n=m(t);return{...v(t),id:n}}function ye(e){return t=>{e[t.key]?e[t.key](t):e.default?.(t)}}function vo(e){const t=bo(e),n=xo(e);return{props:P(t,n),effects:()=>Po({...e,id:t.id}),context:N()}}function bo(e){const{idPrefix:t="solid-ui-calendar-month-body-day"}=e,n=m(t),o=He();return{...v(t),"data-solid-ui-calendar-day":"",get["data-active"](){return o.isActive(e.date())?"":void 0},get["data-date-range"](){return o.isInDateRange(e.date())?"":void 0},get["data-selected"](){return o.isSelected(e.date())?"":void 0},get["data-today"](){return o.isToday(e.date())?"":void 0},get["data-visible-month"](){return o.isInVisibleMonth(e.date())?"":void 0},id:n,get tabIndex(){return o.isActive(e.date())?0:-1}}}function xo(e){const t=ie(),n=He(),o=u=>{n.isInVisibleMonth(e.date())||t.onDeferredDateClick(e.date()),e.onMouseDown?.(u)},i=u=>{n.isActive(e.date())&&t.onDateClick(e.date()),e.onClick?.(u)},r=()=>{n.isActive(e.date())||t.selectDate(e.date())},c=ye({ArrowUp(u){u.preventDefault(),t.goTo("previous","week")},ArrowDown(u){u.preventDefault(),t.goTo("next","week")},ArrowLeft(){t.goTo("previous","day")},ArrowRight(){t.goTo("next","day")},Enter(){t.onDateClick(e.date())},[" "](u){u.preventDefault(),t.onDateClick(e.date())}});return{onClick:i,onFocus:r,onKeyDown:u=>{c(u),e.onKeyDown?.(u)},onMouseDown:o}}function Po(e){const t=Ne(),n=ie(),o=He();L(()=>{o.isActive(e.date())&&t.isActiveDateFromUserInteraction&&(document.getElementById(e.id)?.focus(),t.deferredDateClick?.getTime()===e.date().getTime()&&n.onDateClick(t.deferredDateClick))})}function yo(e={}){return{props:Co(e),context:N()}}function Co(e={}){const{idPrefix:t="solid-ui-calendar-month-body-week"}=e,n=m(t);return{...v(t),id:n}}function Io(e){return{props:So(e),context:N()}}function So(e){const{idPrefix:t="solid-ui-calendar-month-head-day"}=e,n=m(t);return{abbr:new Intl.DateTimeFormat([],{weekday:"long"}).format(e.date()),...v(t),"data-solid-ui-calendar-day":"",id:n,scope:"col"}}function $o(e={}){return{props:_o(e),context:N()}}function _o(e={}){const{idPrefix:t="solid-ui-calendar-month-head"}=e,n=m(t);return{...v(t),id:n}}function wo(e={}){const t=Mo(e),n=new Date,o=[0,1,2,3,4,5,6].map(i=>{const r=new Date(n);return r.setDate(n.getDate()-n.getDay()+i),r});return{props:t,context:{...N(),headerDates:()=>o}}}function Mo(e={}){const{idPrefix:t="solid-ui-calendar-month-head-week"}=e,n=m(t);return{...v(t),id:n}}function Do(e={}){return{props:ko(e),context:N()}}function ko(e={}){const{idPrefix:t="solid-ui-calendar-month",role:n="grid"}=e,o=m(t),i=Ne();return{get["aria-label"](){return i.ariaLabel},...v(t),id:o,role:n}}function Lo(e){const t=Eo(e),n=Oo(e);return{props:P(t,n),context:N()}}function Eo(e){const{"aria-label":t=`view ${e.direction} ${e.unit}`,idPrefix:n=`solid-ui-calendar-${e.direction}-${e.unit}`}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-button":"",id:o}}function Oo(e){const t=ie();return{onClick:o=>{t.view(e.direction,e.unit),e.onClick?.(o)}}}function Fo(e){const t=To(e),n=Ao(e),o=Ne();return{props:P(t,n),context:{...N(),value:()=>e.unit==="month"?o.visibleMonth:o.visibleYear,options:()=>e.unit==="month"?[...Array(12).keys()]:[...Array(101).keys()].map(i=>i+o.visibleYear-50)}}}function To(e){const{"aria-label":t=`view calendar ${e.unit}`,idPrefix:n=`solid-ui-calendar-select-${e.unit}`}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-select":"",id:o}}function Ao(e){const t=ie();return{onChange:o=>{(e.unit==="year"?t.selectVisibleYear:t.selectVisibleMonth)(o),e.onChange?.(o)}}}function Vo(e={}){const t=Ro(e),n=No(e);return{props:P(t,n),context:N()}}function Ro(e={}){const{"aria-label":t="go to today",idPrefix:n="solid-ui-calendar-view-today"}=e,o=m(n);return{"aria-label":t,...v(n),"data-solid-ui-button":"",id:o}}function No(e={}){const t=ie();return{onClick:o=>{t.viewToday(),e.onClick?.(o)}}}function Ho(e){const t=io({value:()=>e.value,onCancel:e.onCancel,onChange:e.onChange});return s(Re.Provider,{value:t,get children(){return(()=>(e.context?.(N()),e.children))()}})}const S=Object.assign(Ho,{createRoot:fo,Actions:{createCancel:so,createSave:co},Navigation:{createNav:Lo,createSelect:Fo,createToday:Vo},Month:{createMonth:Do,Head:{createHead:$o,createWeek:wo,createDay:Io},Body:{createBody:mo,createWeek:yo,createDay:vo}}}),Bo=p("<div></div>"),Uo=p("<div><button>&lt;&lt;</button><button>&lt;</button><span><select></select><select></select></span><button>></button><button>>></button></div>"),Xt=p("<option></option>"),Wo=p("<table><thead><tr></tr></thead><tbody></tbody></table>"),Ko=p("<th></th>"),Go=p("<tr></tr>"),jo=p("<td></td>"),Yo=p("<div><button>Today</button><span><button>Cancel</button><button>Save</button></span></div>"),Jo=p("<div><div>Selected date: </div></div>"),zo=p(`<section><h1 id="Calendar">Calendar</h1><p>That's right, Solid UI comes with hooks for creating a completely composable calendar date picker! It comes with hooks for creating a table-based calendar widget, including navigation and action components.</p><h3>Example</h3><h3>Code</h3></section>`),qo=p('<a href="#Calendar">Calendar</a>'),Xo=e=>s(S,P(e,{get children(){return(()=>{const{props:t}=S.createRoot();return e.context?.(N()),(()=>{const n=Bo.cloneNode(!0);return h(n,t,!1,!0),n.style.setProperty("display","inline-flex"),n.style.setProperty("flex-direction","column"),n.style.setProperty("border","var(--border)"),n.style.setProperty("border-radius","var(--border-radius)"),n.style.setProperty("padding","1rem"),n.style.setProperty("margin-top","1rem"),l(n,()=>e.children),n})()})()}})),Qo=()=>{const{props:e}=S.Navigation.createNav({direction:"previous",unit:"year"}),{props:t}=S.Navigation.createNav({direction:"previous",unit:"month"}),{props:n,context:{value:o,options:i}}=S.Navigation.createSelect({unit:"month"}),[r,c]=it(n,["onChange"]),a=w=>{r.onChange(Number(w.currentTarget.value))},{props:u,context:{value:d,options:b}}=S.Navigation.createSelect({unit:"year"}),[y,T]=it(u,["onChange"]),A=w=>{y.onChange(Number(w.currentTarget.value))},{props:F}=S.Navigation.createNav({direction:"next",unit:"month"}),{props:H}=S.Navigation.createNav({direction:"next",unit:"year"}),_=new Intl.DateTimeFormat([],{month:"long"});return(()=>{const w=Uo.cloneNode(!0),Y=w.firstChild,de=Y.nextSibling,ee=de.nextSibling,k=ee.firstChild,J=k.nextSibling,te=ee.nextSibling,pe=te.nextSibling;return w.style.setProperty("display","flex"),w.style.setProperty("justify-content","space-between"),w.style.setProperty("align-items","center"),h(Y,e,!1,!0),h(de,t,!1,!0),k.addEventListener("change",a),h(k,c,!1,!0),l(k,s(V,{get each(){return i()},children:M=>{const O=new Date;return O.setMonth(M),(()=>{const B=Xt.cloneNode(!0);return B.value=M,l(B,()=>_.format(O)),B})()}})),J.addEventListener("change",A),h(J,T,!1,!0),l(J,s(V,{get each(){return b()},children:M=>(()=>{const O=Xt.cloneNode(!0);return O.value=M,l(O,M),O})()})),h(te,F,!1,!0),h(pe,H,!1,!0),Pe(M=>{const O=o(),B=d();return O!==M._v$&&(k.value=M._v$=O),B!==M._v$2&&(J.value=M._v$2=B),M},{_v$:void 0,_v$2:void 0}),w})()},Zo=()=>{const{props:e}=S.Month.createMonth(),{props:t}=S.Month.Head.createHead(),{props:n,context:{headerDates:o}}=S.Month.Head.createWeek(),{props:i,context:{visibleWeeks:r}}=S.Month.Body.createBody();return(()=>{const c=Wo.cloneNode(!0),a=c.firstChild,u=a.firstChild,d=a.nextSibling;return h(c,e,!1,!0),h(a,t,!1,!0),h(u,n,!1,!0),l(u,s(V,{get each(){return o()},children:b=>s(tr,{date:b})})),h(d,i,!1,!0),l(d,s(V,{get each(){return r()},children:b=>s(nr,{week:b})})),c})()},er=new Intl.DateTimeFormat([],{weekday:"narrow"}),tr=e=>{const{props:t}=S.Month.Head.createDay({date:()=>e.date});return(()=>{const n=Ko.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>er.format(e.date)),n})()},nr=e=>{const{props:t}=S.Month.Body.createWeek();return(()=>{const n=Go.cloneNode(!0);return h(n,t,!1,!0),l(n,s(V,{get each(){return e.week},children:o=>s(or,{date:o})})),n})()},or=e=>{const{props:t,effects:n}=S.Month.Body.createDay({date:()=>e.date});return n(),(()=>{const o=jo.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.date.getDate()),o})()},rr=()=>{const{props:e}=S.Navigation.createToday(),{props:t}=S.Actions.createCancel(),{props:n}=S.Actions.createSave();return(()=>{const o=Yo.cloneNode(!0),i=o.firstChild,r=i.nextSibling,c=r.firstChild,a=c.nextSibling;return o.style.setProperty("display","flex"),o.style.setProperty("justify-content","space-between"),o.style.setProperty("margin-top","0.5rem"),h(i,e,!1,!0),r.style.setProperty("display","flex"),r.style.setProperty("gap","0.25rem"),h(c,t,!1,!0),h(a,n,!1,!0),o})()},ir=()=>{const[e,t]=z(new Date);function n(o){t(o)}return(()=>{const o=Jo.cloneNode(!0),i=o.firstChild;return i.firstChild,l(i,()=>e().toDateString(),null),l(o,s(Xo,{get value(){return e()},onChange:n,get children(){return[s(Qo,{}),s(Zo,{}),s(rr,{})]}}),null),o})()};function at(){return(()=>{const e=zo.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(ir,{}),i),l(e,s(I,{children:sr}),null),e})()}at.Link=()=>qo.cloneNode(!0);const sr=`import { Component, createSignal, For, JSX, splitProps } from 'solid-js';
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
};`;function Be(e,t={}){const n=i=>i.items.findIndex(r=>r===i.activeItemId);let o;return{addItem(i){e("items",r=>[...r,i])},removeItem(i){e(r=>({items:r.items.filter(c=>c!==i),activeItemId:i===r.activeItemId?void 0:r.activeItemId}))},initializeItemFocus(){e(i=>{if(t.getInitialFocusedItem){const r=i.items.find(c=>t.getInitialFocusedItem(c,i.items));return r?{activeItemId:r}:i}return i})},focusNextItem(){e(i=>{let r=n(i);if(t.shouldWrap&&r===i.items.length-1&&(r=-1),r<i.items.length-1)return{activeItemId:i.items[r+1]}})},focusPreviousItem(){e(i=>{let r=n(i);return t.shouldWrap&&r===0&&(r=i.items.length),r===-1?{activeItemId:i.items[i.items.length-1]}:r>0?{activeItemId:i.items[r-1]}:i})},focusFirstItem(){e(i=>({activeItemId:i.items[0]}))},focusLastItem(){e(i=>({activeItemId:i.items[i.items.length-1]}))},focusTypeaheadItem(i){clearTimeout(o),e(r=>{const c=r.search+i,a=n(r),u=r.items.slice(a+1).concat(r.items.slice(0,a)),d=c.toLocaleLowerCase(),b=u.find(y=>document.getElementById(y).textContent.toLocaleLowerCase().startsWith(d));return b?{activeItemId:b,search:c}:{search:c}}),o=setTimeout(()=>{e("search","")},500)},focusItem(i){e("activeItemId",i)},clearItemFocus(){e("activeItemId",null)}}}const dn=':is(button, [href], input, select, textarea, [tabindex]):not([tabindex="-1"])';function lr(e){const t=Array.from(e.querySelectorAll(dn)).filter(n=>n.tabIndex!==-1);return t.length===0&&t.push(e),t}function ar(e){return e.querySelector(dn)||e}function Ce(e){L(()=>{const{isEnabled:t=()=>!0}=e;if(!t())return;const n=document.getElementById(e.containerId),o=lr(n),i=e.initialFocusIds?.()?.map(a=>document.getElementById(a))||[];o.unshift(...i);function r(a){if(a.key!=="Tab"||!o.includes(document.activeElement))return;const u=o.findIndex(d=>d===document.activeElement);a.shiftKey?(o[u>0?u-1:o.length-1]?.focus(),a.preventDefault()):(o[u<o.length-1?u+1:0]?.focus(),a.preventDefault())}function c(a){n.contains(document.activeElement)&&!n.contains(a.target)&&a.preventDefault()}document.addEventListener("keydown",r),document.addEventListener("mousedown",c),R(()=>{document.removeEventListener("keydown",r),document.removeEventListener("mousedown",c)})})}function Ie(e){g(()=>{const t=document.getElementById(e.containerId);(document.getElementById(e.initialFocusId)||ar(t))?.focus({preventScroll:!0})})}function se(e){L(()=>{const t=document.getElementById(e.containerId);function n(o){const{isEnabled:i=()=>!0}=e;!i()||!t.contains(o.target)&&!e.exceptionIds().some(r=>document.getElementById(r)===o.target)&&e.onClickAway()}document.addEventListener("mouseup",n),R(()=>{document.removeEventListener("mouseup",n)})})}function xt(e){return{openPopover(){e("shouldShowPanel",!0)},closePopover(){e("shouldShowPanel",!1)},togglePopover(){e("shouldShowPanel",t=>!t)},onOverlayMount(){e({isOverlayMounted:!0})},onOverlayCleanup(){e({isOverlayMounted:!1})}}}function cr(e={}){const[t,n]=U({triggerId:null,overlayId:null,panelId:null,get role(){return e.role?.()},shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1});return[t,{setElementId(i,r){n({[i]:r})},openPopover(){n("shouldShowPanel",!0)},closePopover(){n("shouldShowPanel",!1)},togglePopover(){n("shouldShowPanel",i=>!i)},onOverlayMount(){n({isOverlayMounted:!0})},onOverlayCleanup(){n({isOverlayMounted:!1})}}]}const Pt=W();function X(){return C(Pt)[0]}function Q(){return C(Pt)[1]}function Ue(){const e=X(),t=Q();return{isPopoverOpen:()=>e.isPanelOpen,isOverlayOpen:()=>e.shouldShowPanel,open:()=>t.openPopover(),close:()=>t.closePopover()}}function ur(e={}){const t=dr(e),n=pr(e);return{props:P(t,n),effects:()=>fr({id:t.id}),context:Ue()}}function dr(e={}){const{idPrefix:t="solid-ui-popover-panel"}=e,n=m(t),o=X();return{"data-solid-ui-panel":"",...v(t),id:n,get role(){return o.role},tabIndex:0}}function pr(e={}){const t=Q();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function fr(e){const t=X(),n=Q();hr(e),Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function hr(e){g(()=>{Q().setElementId("panelId",e.id)})}function mr(e={}){const t=gr(e);return{props:t,effects:()=>xr({id:t.id}),context:Ue()}}function gr(e={}){const{idPrefix:t="solid-ui-popover-overlay"}=e,n=m(t);return{"data-solid-ui-overlay":"",...v(t),id:n,ref(){}}}function vr(e){const t=Q();g(()=>t.setElementId("overlayId",e.id))}function br(){const e=Q();g(e.onOverlayMount),R(e.onOverlayCleanup)}function xr(e){vr(e),br()}function Pr(e){const t=cr({role:()=>e.role});return s(Pt.Provider,{value:t,get children(){return(()=>(e.context?.(Ue()),e.children))()}})}function yr(e={}){const t=X();e.primary=e.primary??!t.triggerId;const n=Cr(e),o=Ir(e);return{props:P(n,o),effects:()=>Sr({id:n.id,primary:e.primary}),context:Ue()}}function Cr(e={}){const t=X(),{idPrefix:n="solid-ui-popover-trigger",primary:o=!t.triggerId}=e,i=m(n);return{get["aria-controls"](){return o?t.panelId:void 0},get["aria-expanded"](){return o?t.isPanelOpen:void 0},get["aria-haspopup"](){return o?t.role:void 0},"data-solid-ui-button":"",...v(n),id:i}}function Ir(e){const t=X(),n=Q();return{onClick:r=>{n.togglePopover(),e.onClick?.(r)},onKeyUp:r=>{r.key==="Escape"?n.closePopover():(t.role==="menu"||t.role==="listbox")&&(r.key==="ArrowDown"||r.key==="ArrowUp")&&n.openPopover(),e.onKeyUp?.(r)}}}function Sr(e){e.primary&&($r(e),_r(e))}function $r(e){g(()=>{const t=X(),n=Q();t.triggerId||n.setElementId("triggerId",e.id)})}function _r(e){const t=X();L(n=>(n&&!t.isPanelOpen&&e.id===t.triggerId&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const We=Object.assign(Pr,{createTrigger:yr,createOverlay:mr,createPanel:ur});function wr(e={}){const{orientation:t=()=>"vertical"}=e,[n,o]=U({inputId:null,labelId:null,listId:null,overlayId:null,panelId:null,triggerId:null,shouldShowPanel:!1,get isPanelOpen(){return n.shouldShowPanel&&(!n.overlayId||n.isOverlayMounted)},isOverlayMounted:!1,get orientation(){return t()},items:[],activeItemId:null,search:"",inputValue:"",getInputDisplayValue:a=>String(a)}),i={},r={...Be(o,{getInitialFocusedItem:a=>i[a]===e.value?.()}),...xt(o),setElementId(a,u){o({[a]:u})},addItem(a){o("items",u=>{const d=[...u,a];return e.sortOptions?d.sort((b,y)=>e.sortOptions(i[b],i[y])):d})},addValue(a,u){i[a]=u},removeValue(a){delete i[a]},chooseValue(a){const u=i[a];a&&(o("inputValue",n.getInputDisplayValue(u)),u!==e.value?.()&&e.onChange?.(u)),r.closePopover()},clearValue(){e.value?.()!==null&&e.onChange?.(null)},setInputValue(a){o("inputValue",a),a||r.clearValue()},registerGetInputDisplayValue(a){o("getInputDisplayValue",()=>a)}},c={isActive:G(()=>n.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[n,r,c]}const Ke=W();function Z(){return C(Ke)[0]}function $(){return C(Ke)[1]}function Ge(){return C(Ke)[2]}function le(){const e=Z(),t=$(),n=Ge();return{isActive:o=>n.isActive(o),isSelected:o=>n.isSelected(o),isOpen:()=>e.isPanelOpen,open:()=>t.openPopover(),close:()=>t.closePopover()}}function Mr(e={}){const t=Dr(e),n=kr(e);return{props:P(t,n),effects:()=>Lr({id:t.id,...e}),context:le()}}function Dr(e={}){const{idPrefix:t="solid-ui-combobox-input"}=e,n=m(t),o=Z();return{get["aria-activedescendent"](){return o.activeItemId},"aria-autocomplete":"list",get["aria-controls"](){return o.panelId||o.listId},get["aria-labelledby"](){return o.labelId},"data-solid-ui-input":"",...v(t),id:n,role:"combobox",type:"text",get value(){return e.value?e.value():o.inputValue}}}function kr(e={}){const t=Z(),n=$(),o=()=>{n.closePopover(),n.clearItemFocus()},i=d=>{n.setInputValue(d.currentTarget.value),e.onInput?.(d),t.inputValue&&!t.isPanelOpen&&n.openPopover()},r=ye({ArrowUp(d){d.preventDefault(),t.isPanelOpen?n.focusPreviousItem():(n.openPopover(),t.activeItemId||n.focusLastItem())},ArrowDown(d){d.preventDefault(),t.isPanelOpen?n.focusNextItem():(n.openPopover(),t.activeItemId||n.focusFirstItem())},End(d){t.isPanelOpen&&(d.preventDefault(),n.focusLastItem())},Enter(){n.chooseValue(t.activeItemId),o()},Escape(){o()},Home(d){t.isPanelOpen&&(d.preventDefault(),n.focusFirstItem())},Tab(){o()},default(d){d.key.length===1&&!d.shiftKey&&!d.ctrlKey&&!d.metaKey&&n.openPopover()}}),c=Ge();return{onBlur:d=>{n.setInputValue(t.getInputDisplayValue(c.selectedValue)),e.onBlur?.(d)},onInput:i,onKeyDown:d=>{r(d),e.onKeyDown?.(d)}}}function Lr(e){Er(e),Or(e)}function Er(e){const t=$();g(()=>{t.setElementId("inputId",e.id)})}function Or(e){const t=$();L(()=>{e.getDisplayValue?.()&&t.registerGetInputDisplayValue(e.getDisplayValue())})}function Fr(e={}){const t=Tr(e);return{props:t,effects:()=>Ar({id:t.id}),context:le()}}function Tr(e={}){const{idPrefix:t="solid-ui-combobox-label"}=e;return{id:m(t)}}function Ar(e){Vr(e)}function Vr(e){const t=$();g(()=>{t.setElementId("labelId",e.id)})}function Rr(e={}){const t=Nr(e);return{props:t,effects:()=>Hr({id:t.id}),context:le()}}function Nr(e={}){const{idPrefix:t="solid-ui-combobox-list"}=e,n=m(t),o=Z();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"listbox",tabIndex:0}}function Hr(e){const t=Z(),n=$();Br(e),t.panelId||se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen}),Ur()}function Br(e){const t=$();g(()=>{t.setElementId("listId",e.id)})}function Ur(){const e=$();g(()=>{e.initializeItemFocus()})}function Wr(e={}){const t=Kr(e),n=Gr({id:t.id,...e}),o=Ge(),i={...le(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value())};return{props:P(t,n),effects:()=>jr({id:t.id,value:e.value}),context:i}}function Kr(e){const{idPrefix:t="solid-ui-combobox-option"}=e,n=m(t),o=Ge();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},get["data-selected"](){return o.isSelected(e.value?.())?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"option",tabIndex:-1}}function Gr(e){const t=$();return{onClick:c=>{t.chooseValue(e.id),e.onClick?.(c)},onMouseDown:c=>{c.preventDefault(),e.onMouseDown?.(c)},onMouseEnter:c=>{t.focusItem(e.id),e.onMouseEnter?.(c)},onMouseLeave:c=>{t.clearItemFocus(),e.onMouseLeave?.(c)}}}function jr(e){zr(e),qr(e),Yr(e),Jr(e)}function Yr(e){const t=$();g(()=>{t.addItem(e.id)})}function Jr(e){const t=$();R(()=>{t.removeItem(e.id)})}function zr(e){const t=$();g(()=>{t.addValue(e.id,e.value())})}function qr(e){const t=$();R(()=>{t.removeValue(e.id)})}function Xr(e={}){const t=Qr(e),n=Zr(e);return{props:P(t,n),effects:()=>ei({id:t.id}),context:le()}}function Qr(e){const{idPrefix:t="solid-ui-combobox-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function Zr(e){const t=$();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function ei(e){const t=Z(),n=$();ti({id:e.id}),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen})}function ti(e){const t=$();g(()=>{t.setElementId("panelId",e.id)})}function ni(e){e=P({orientation:"vertical"},e);const t=wr({onChange:e.onChange,orientation:()=>e.orientation,sortOptions:e.sortOptions,value:()=>e.value});return s(Ke.Provider,{value:t,get children(){return(()=>(e.context?.(le()),e.children))()}})}function oi(e={}){const t=ri(e),n=ii(e);return{props:P(t,n),effects:()=>si({id:t.id}),context:le()}}function ri(e={}){const t=Z(),{idPrefix:n="solid-ui-combobox-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"listbox",get["aria-labelledby"](){return t.labelId},"data-solid-ui-button":"",...v(n),id:o,tabIndex:-1}}function ii(e={}){const t=Z(),n=$();return{onClick:r=>{n.togglePopover(),document.getElementById(t.inputId)?.focus({preventScroll:!0}),e.onClick?.(r)},onMouseDown:r=>{r.preventDefault(),e.onMouseDown?.(r)}}}function si(e){li(e)}function li(e){const t=$();g(()=>{t.setElementId("triggerId",e.id)})}const me=Object.assign(ni,{createInput:Mr,createLabel:Fr,createList:Rr,createOption:Wr,createPanel:Xr,createTrigger:oi}),pn=W(),fn=()=>C(pn);function ai(e){const[t,n]=it(e,["children"]),o=di(n);return s(pn.Provider,{value:o,get children(){return t.children}})}function ci(e){fn()?.setRef("anchor",e)}function ui(e){fn()?.setRef("popper",e)}function di(e={}){const[t,n]=U({anchor:null,popper:null});let o;return L(()=>{if(o?.destroy(),t.anchor&&t.popper){const{placement:i="bottom-start",...r}=e;o=Nn(t.anchor,t.popper,{placement:i,...r,modifiers:[...r.modifiers||[],{name:"offset",options:{offset:[0,4]}}]})}}),{refs:t,setRef:(i,r)=>{n({[i]:r})}}}const x=Object.assign(ai,{AnchorRef:ci,PopperRef:ui}),pi=p("<label></label>"),fi=p("<input>"),hi=p("<button></button>");p("<div></div>");const mi=p("<ul></ul>"),gi=p("<li></li>"),vi=p('<section><h2 id="Combobox">Combobox</h2><p>A combobox is a text field with suggestions that appear when the user types. Here, we are in charge of rendering all options, giving you complete control over how and when options should be filtered.</p><h3>Example</h3><h3>Code</h3></section>'),bi=p('<a href="#Combobox">Combobox</a>');function xi(e){const{props:t,effects:n}=me.createLabel();return n(),(()=>{const o=pi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Pi(e){const{props:t,effects:n}=me.createInput({onInput:e.onInput,getDisplayValue:e.getDisplayValue?()=>e.getDisplayValue:void 0});return n(),(()=>{const o=fi.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!1),o})()}function yi(e){const{props:t,effects:n}=me.createTrigger();return n(),(()=>{const o=hi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ci(e){const{props:t,effects:n,context:o}=me.createList();return L(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(re,{get children(){const i=mi.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}function Ii(e){const{props:t,effects:n,context:o}=me.createOption({value:()=>e.value});return n(),(()=>{const i=gi.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),i})()}function Si(){const[e,t]=z(null),[n,o]=z(""),i=he(()=>Te.filter(r=>r.displayValue.includes(n())));return s(x,{get children(){return s(me,{get value(){return e()},onChange:r=>t(r),sortOptions:(r,c)=>i().indexOf(r)-i().indexOf(c),get children(){return[s(xi,{children:"Choose a fruit: "}),s(Pi,{getDisplayValue:r=>r?.displayValue??"",onInput:r=>o(r.currentTarget.value),ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r}}),s(yi,{children:"Open"}),s(Ci,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return s(V,{get each(){return i()},children:r=>s(Ii,{value:r,get children(){return r.displayValue}})})}})]}})}})}function ct(){return(()=>{const e=vi.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(Si,{}),i),l(e,s(I,{children:$i}),null),e})()}ct.Link=()=>bi.cloneNode(!0);const $i=`import {
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
}`;function _i(){const[e,t]=U({triggerId:null,contentId:null,isShowingContent:!1});return[e,{setElementId(o,i){t({[o]:i})},showContent(){t("isShowingContent",!0)},hideContent(){t("isShowingContent",!1)},toggleContent(){t("isShowingContent",o=>!o)}}]}const yt=W();function je(){return C(yt)[0]}function Ye(){return C(yt)[1]}function Ct(){const e=je(),t=Ye();return{isShowingContent:()=>e.isShowingContent,show:()=>t.showContent(),hide:()=>t.hideContent()}}function wi(e={}){const t=Mi(e);return{props:t,effects:()=>Di({id:t.id}),context:Ct()}}function Mi(e){const{idPrefix:t="solid-ui-disclosure-content"}=e,n=m(t);return{...v(t),id:n}}function Di(e){ki(e)}function ki(e){g(()=>{Ye().setElementId("contentId",e.id)})}function Li(e){const t=_i();return s(yt.Provider,{value:t,get children(){return(()=>(e.context?.(Ct()),e.children))()}})}function Ei(e={}){const t=je();e.primary=e.primary??!t.triggerId;const n=Oi(e),o=Fi(e);return{props:P(n,o),effects:()=>Ti({id:n.id,primary:e.primary}),context:Ct()}}function Oi(e={}){const t=je(),{idPrefix:n="solid-ui-disclosure-trigger",primary:o=!t.triggerId}=e,i=m(n);return{get["aria-controls"](){return o?t.contentId:void 0},get["aria-expanded"](){return o?t.isShowingContent:void 0},"data-solid-ui-button":"",...v(n),id:i}}function Fi(e){const t=Ye();return{onClick:o=>{t.toggleContent(),e.onClick?.(o)}}}function Ti(e){e.primary&&Ai(e)}function Ai(e){g(()=>{const t=je(),n=Ye();t.triggerId||n.setElementId("triggerId",e.id)})}const It=Object.assign(Li,{createTrigger:Ei,createContent:wi}),Vi=p("<button></button>"),Ri=p("<div></div>"),Ni=p('<section><h2 id="Disclosure">Disclosure</h2><p>A disclosure is a simple pattern for showing and hiding content. It differs from a popover in that the content should appear in the flow of the document and not as a floating panel.</p><h3>Example</h3><h3>Code</h3></section>'),Hi=p('<a href="#Disclosure">Disclosure</a>'),Bi=e=>{const{props:t,effects:n}=It.createTrigger();return n(),(()=>{const o=Vi.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},Ui=e=>{const{props:t,effects:n,context:o}=It.createContent();return n(),(()=>{const i=Ri.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),Pe(()=>i.style.setProperty("display",o.isShowingContent()?"block":"none")),i})()},Wi=()=>s(It,{get children(){return[s(Bi,{children:"Disclosure"}),s(Ui,{children:"This is the disclosure content."})]}});function ut(){return(()=>{const e=Ni.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(Wi,{}),i),l(e,s(I,{children:Ki}),null),e})()}ut.Link=()=>Hi.cloneNode(!0);const Ki=`import { Component } from 'solid-js';
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
};`;function Gi(){return{props:ji()}}function ji(){return{"data-solid-ui-form-control":"",role:"group"}}function Yi(e={}){const[t,n]=U({labelId:null,fieldId:null,helperTextId:null,errorMessageId:null,errors:[],hasFocus:!1,isTouched:!1}),o={setElementId(r,c){n({[r]:c})},setHasFocus(r){n("hasFocus",r)},setIsTouched(r){n("isTouched",r)},setErrors(r){n("errors",r)}},i={fieldId:he(()=>e.id??t.fieldId),isDisabled:()=>e.isDisabled,isInvalid:he(()=>e.isInvalid??Boolean(t.errors.length>0)),isRequired:()=>e.isRequired,isTouched:he(()=>e.isTouched??t.isTouched)};return[t,o,i]}const Je=W();function ge(){return C(Je)[0]}function ve(){return C(Je)[1]}function hn(){return C(Je)[2]}function Se(){const e=ge(),t=hn();return{errors:()=>e.errors,isInvalid:t.isInvalid,isTouched:()=>e.isTouched}}function Ji(e={}){const t=zi(e);return{props:t,effects:()=>qi({id:t.id}),context:Se()}}function zi(e={}){const{idPrefix:t="solid-ui-form-error-message"}=e,n=m(t);return{...v(t),id:n}}function qi(e){Xi(e)}function Xi(e){const t=ve();g(()=>{t.setElementId("errorMessageId",e.id)})}function Qi(){const[e,t]=U({errors:{},isSubmitting:!1}),n={setFieldErrors(i,r){t("errors",i,r)},startSubmit(){t({isSubmitting:!0})},endSubmit(){t({isSubmitting:!1})}},o={isInvalid:he(()=>Object.values(e.errors).some(i=>i.length>0))};return[e,n,o]}const mn=W();function St(){return C(mn)}function gn(){return St()[0]}function vn(){return St()[1]}function $t(){return St()[2]}function _t(){const e=gn(),t=$t();return{errors:()=>e.errors,isInvalid:t.isInvalid,isSubmitting:()=>e.isSubmitting}}function Zi(e){const t=ge(),n=ve(),o=vn(),i=es(e);function r(a){if(e.validators){const u=e.validators.reduce((d,b)=>{const y=b(a);return y&&d.push(y),d},[]);n.setErrors(u),o?.setFieldErrors(e.name,u)}else t.errors.length>0&&n.setErrors([])}function c(){n.setIsTouched(!0)}return{props:i,effects:()=>ts({id:i.id,validate:r,initialValue:e.initialValue}),context:Se(),validate:r,touch:c}}function es(e){const{idPrefix:t="solid-ui-form-control-field"}=e,n=m(t),o=ge(),i=hn();return{get["aria-describedby"](){return[o.helperTextId,i.isInvalid()&&o.errorMessageId].filter(Boolean).join(" ")||void 0},get["aria-invalid"](){return i.isInvalid()||void 0},get["aria-labelledby"](){return o.labelId},get["aria-required"](){return i.isRequired()||void 0},...v(t),get disabled(){return i.isDisabled()||void 0},id:n,get name(){return e.name}}}function ts(e){ns(e),os(e),rs(e)}function ns(e){const t=ve();g(()=>{t.setElementId("fieldId",e.id)})}function os(e){g(()=>{e.validate(e.initialValue)})}function rs(e){const t=ge(),n=ve();function o(){document.activeElement.id===e.id&&!t.hasFocus&&n.setHasFocus(!0)}function i(){t.hasFocus&&n.setHasFocus(!1)}g(()=>{document.addEventListener("focusin",o),document.addEventListener("focusout",i)}),R(()=>{document.removeEventListener("focusin",o),document.removeEventListener("focusout",i)})}function is(e={}){const t=ss(e);return{props:t,effects:()=>ls({id:t.id}),context:Se()}}function ss(e){const{idPrefix:t="solid-ui-form-helper-text"}=e,n=m(t),o=ge();return{get["data-focused"](){return o.hasFocus?"":void 0},...v(t),id:n}}function ls(e){as(e)}function as(e){const t=ve();g(()=>{t.setElementId("helperTextId",e.id)})}function cs(e={}){const t=us(e);return{props:t,effects:()=>ds({id:t.id}),context:Se()}}function us(e){const{idPrefix:t="solid-ui-form-control-label"}=e,n=m(t),o=ge();return{get["data-focused"](){return o.hasFocus?"":void 0},...v(t),get for(){return o.fieldId},id:n}}function ds(e){ps(e)}function ps(e){const t=ve();g(()=>{t.setElementId("labelId",e.id)})}function fs(e){const t=Yi(e);return s(Je.Provider,{value:t,get children(){return(()=>(e.context?.(Se()),e.children))()}})}const hs=Object.assign(fs,{createControl:Gi,createErrorMessage:Ji,createField:Zi,createHelperText:is,createLabel:cs});function ms(e={}){return{props:gs(e)}}function gs(e){const t=$t(),n=vn();return{onSubmit:i=>{t.isInvalid()||(n.startSubmit(),e.onSubmit?.(i,n.endSubmit))}}}function vs(e){const t=Qi();return s(mn.Provider,{value:t,get children(){return(()=>(e.context?.(_t()),e.children))()}})}function bs(e={}){return{props:xs(e),context:_t()}}function xs(e){const{idPrefix:t="solid-ui-form-control-submit"}=e,n=m(t),o=gn(),i=$t();return{"data-solid-ui-button":"",...v(t),get disabled(){return e.isDisabled?e.isDisabled():i.isInvalid()||o.isSubmitting},id:n,type:"submit"}}const j=Object.assign(vs,{Control:hs,createForm:ms,createSubmit:bs}),Ps=p("<form></form>"),Ae=p("<div></div>"),ys=p("<label></label>"),Cs=p('<input type="text" data-solid-ui-input="">'),Is=p("<button></button>"),Ss=p(`<section><h2 id="Form">Form</h2><p>Solid UI's form component hooks allow you to easily and declaratively validate forms. The <!> hook takes in the field <!>, <!>, and an optional array of <!>. In addition to the normal "props, effects, context" returned from Solid UI component hooks, <!> also returns <!> and <!> Call <!> whenever you want the value of your field to re-validate, and call <!> whenever you consider the field to have been visited by the user.</p><p>If none of the fields in the form have errors, then the submit button created by <!> will be enabled. Clicking it calls the <!> handler supplied to the <!> hook. When you're done, call the <!> callback provided to <!> as the second argument to toggle the form's submitting state to false.</p><h3>Example</h3><h3>Code</h3></section>`),$s=p('<a href="#Form">Form</a>');function _s(e){return s(j,{get children(){return(()=>{const{props:t}=j.createForm(e);return e.context?.(_t()),(()=>{const n=Ps.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>e.children),n})()})()}})}function ws(e){return s(j.Control,{get children(){return(()=>{const{props:t}=j.Control.createControl();return(()=>{const n=Ae.cloneNode(!0);return h(n,t,!1,!0),l(n,()=>e.children),n})()})()}})}function Ms(e){const{props:t,effects:n}=j.Control.createLabel();return n(),(()=>{const o=ys.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ds(e){const{props:t,effects:n,validate:o,touch:i}=j.Control.createField({name:e.name,initialValue:"",validators:[d=>d.length<5&&"Value must be at least 5 characters long.",d=>!d.includes("a")&&'Value must include the character "a".']});n();const[r,c]=z(""),a=()=>{i()},u=d=>{c(d.currentTarget.value),o(r())};return(()=>{const d=Cs.cloneNode(!0);return d.$$input=u,d.addEventListener("blur",a),h(d,t,!1,!1),Pe(()=>d.value=r()),d})()}function ks(e){const{props:t,effects:n}=j.Control.createHelperText();return n(),(()=>{const o=Ae.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ls(){const{props:e,effects:t,context:n}=j.Control.createErrorMessage();return t(),s(q,{get when(){return st(()=>!!n.isTouched(),!0)()&&n.isInvalid()},get children(){const o=Ae.cloneNode(!0);return h(o,e,!1,!0),l(o,s(V,{get each(){return n.errors()},children:i=>(()=>{const r=Ae.cloneNode(!0);return l(r,i),r})()})),o}})}function Es(){const{props:e,context:t}=j.createSubmit();return(()=>{const n=Is.cloneNode(!0);return h(n,e,!1,!0),l(n,()=>t.isSubmitting()?"Submitting...":"Submit"),n})()}function Os(){return s(_s,{onSubmit:(e,t)=>{e.preventDefault(),setTimeout(t,1e3)},get children(){return[s(ws,{get children(){return[s(Ms,{children:"Field 1"}),s(Ds,{name:"field1"}),s(ks,{children:"This is the helper text."}),s(Ls,{})]}}),s(Es,{})]}})}function dt(){return(()=>{const e=Ss.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling,a=c.nextSibling,u=a.nextSibling,d=u.nextSibling,b=d.nextSibling,y=b.nextSibling,T=y.nextSibling,A=T.nextSibling,F=A.nextSibling,H=F.nextSibling,_=H.nextSibling,w=_.nextSibling,Y=w.nextSibling,de=Y.nextSibling,ee=de.nextSibling;ee.nextSibling;const k=n.nextSibling,J=k.firstChild,te=J.nextSibling,pe=te.nextSibling,M=pe.nextSibling,O=M.nextSibling,B=O.nextSibling,_e=B.nextSibling,we=_e.nextSibling,K=we.nextSibling,Me=K.nextSibling;Me.nextSibling;const De=k.nextSibling,et=De.nextSibling;return l(n,s(f,{children:"createField()"}),i),l(n,s(f,{children:"name"}),c),l(n,s(f,{children:"initialValue"}),u),l(n,s(f,{children:"validators"}),b),l(n,s(f,{children:"createField()"}),T),l(n,s(f,{children:"validate()"}),F),l(n,s(f,{children:"touch()."}),_),l(n,s(f,{children:"validate()"}),Y),l(n,s(f,{children:"touch()"}),ee),l(k,s(f,{children:"createSubmit()"}),te),l(k,s(f,{children:"onSubmit()"}),M),l(k,s(f,{children:"createForm()"}),B),l(k,s(f,{children:"onSubmitEnd()"}),we),l(k,s(f,{children:"onSubmit()"}),Me),l(e,s(Os,{}),et),l(e,s(I,{children:Fs}),null),e})()}dt.Link=()=>$s.cloneNode(!0);const Fs=`import { createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
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
}`;Hn(["input"]);function Ts(e={orientation:()=>"vertical"}){const[t,n]=U({labelId:null,listId:null,overlayId:null,panelId:null,triggerId:null,shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1,get orientation(){return e.orientation()},items:[],activeItemId:null,search:""}),o={},i={...Be(n,{getInitialFocusedItem:c=>o[c]===e.value?.()}),...xt(n),setElementId(c,a){n({[c]:a})},addValue(c,a){o[c]=a},removeValue(c){delete o[c]},chooseValue(c){const a=o[c];c&&a!==e.value()&&e.onChange?.(a),i.closePopover()}},r={isActive:G(()=>t.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[t,i,r]}const ze=W();function ae(){return C(ze)[0]}function D(){return C(ze)[1]}function wt(){return C(ze)[2]}function be(){const e=ae(),t=D(),n=wt();return{isActive:o=>n.isActive(o),isSelected:o=>n.isSelected(o),isOpen:()=>e.isPanelOpen,hasPanel:()=>!!e.panelId,open:()=>t.openPopover(),close:()=>t.closePopover()}}function As(e={}){const t=Vs(e);return{props:t,effects:()=>Rs({id:t.id}),context:be()}}function Vs(e={}){const{idPrefix:t="solid-ui-listbox-label"}=e;return{id:m(t)}}function Rs(e){Ns(e)}function Ns(e){const t=D();g(()=>{t.setElementId("labelId",e.id)})}function Hs(e={}){const t=Bs(e),n=Us();return{props:P(t,n),effects:()=>Ws({id:t.id}),context:be()}}function Bs(e={}){const{idPrefix:t="solid-ui-listbox-list"}=e,n=m(t),o=ae();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"listbox",tabIndex:0}}function Us(e={}){const t=ae(),n=D(),o=ye({ArrowUp(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusPreviousItem())},ArrowDown(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusNextItem())},ArrowLeft(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusPreviousItem())},ArrowRight(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusNextItem())},Home(r){r.preventDefault(),n.focusFirstItem()},End(r){r.preventDefault(),n.focusLastItem()},Enter(r){r.preventDefault(),n.chooseValue(t.activeItemId)},Escape(){t.panelId||n.closePopover()},default(r){r.key.length===1&&(!t.search&&r.key===" "?(r.preventDefault(),n.chooseValue(t.activeItemId)):n.focusTypeaheadItem(r.key))}});return{onKeyDown:r=>{o(r),e.onKeyDown?.(r)}}}function Ws(e){const t=ae(),n=D();Ks(e),t.panelId||(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})),Gs()}function Ks(e){const t=D();g(()=>{t.setElementId("listId",e.id)})}function Gs(){const e=D();g(()=>{e.initializeItemFocus()})}function js(e={}){const t=Ys(e),n=Js({id:t.id,...e}),o=wt(),i={...be(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value?.())};return{props:P(t,n),effects:()=>zs({id:t.id,value:e.value}),context:i}}function Ys(e){const{idPrefix:t="solid-ui-listbox-option"}=e,n=m(t),o=wt();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},get["data-selected"](){return o.isSelected(e.value?.())?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"option",tabIndex:-1}}function Js(e){const t=D();return{onClick:r=>{t.chooseValue(e.id),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function zs(e){qs(e),Xs(e),Qs(e),Zs(e)}function qs(e){const t=D();g(()=>{t.addItem(e.id)})}function Xs(e){const t=D();R(()=>{t.removeItem(e.id)})}function Qs(e){const t=D();g(()=>{t.addValue(e.id,e.value())})}function Zs(e){const t=D();R(()=>{t.removeValue(e.id)})}function el(e={}){const t=tl(e),n=nl(e);return{props:P(t,n),effects:()=>ol({id:t.id}),context:be()}}function tl(e){const{idPrefix:t="solid-ui-listbox-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function nl(e){const t=D();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function ol(e){const t=ae(),n=D();rl({id:e.id}),t.listId&&(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id})),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function rl(e){const t=D();g(()=>{t.setElementId("panelId",e.id)})}function il(e){e=P({orientation:"vertical"},e);const t=Ts({onChange:e.onChange,orientation:()=>e.orientation,value:()=>e.value});return s(ze.Provider,{value:t,get children(){return(()=>(e.context?.(be()),e.children))()}})}function sl(e={}){const t=ll(e),n=al(e);return{props:P(t,n),effects:()=>cl({id:t.id}),context:be()}}function ll(e={}){const t=ae(),{idPrefix:n="solid-ui-listbox-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"listbox",get["aria-labelledby"](){return t.labelId},"data-solid-ui-button":"",...v(n),id:o}}function al(e={}){const t=D();return{onClick:i=>{t.togglePopover(),e.onClick?.(i)},onKeyDown:i=>{i.key==="Escape"?t.closePopover():(i.key==="ArrowDown"||i.key==="ArrowUp")&&(i.preventDefault(),t.openPopover()),e.onKeyDown?.(i)}}}function cl(e){ul(e),dl(e)}function ul(e){const t=D();g(()=>{t.setElementId("triggerId",e.id)})}function dl(e){const t=ae();L(n=>(n&&!t.isPanelOpen&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const ne=Object.assign(il,{createLabel:As,createList:Hs,createOption:js,createPanel:el,createTrigger:sl}),pl=p("<label></label>"),fl=p("<button></button>"),hl=p("<div></div>"),Qt=p("<ul></ul>"),ml=p("<li></li>"),gl=p("<div><div></div><div></div></div>"),vl=p('<section><h2 id="Listbox">Listbox</h2><p>Listbox lets you build custom single-select dropdowns.</p><p>Menu can either directly render a list with <!>, or can first render a parent panel with <!>.</p><h3>Example</h3><h3>Code</h3></section>'),bl=p('<a href="#Listbox">Listbox</a>');function Zt(e){const{props:t,effects:n}=ne.createLabel();return n(),(()=>{const o=pl.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function en(e){const{props:t,effects:n}=ne.createTrigger();return n(),(()=>{const o=fl.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),l(o,()=>e.children),o})()}function xl(e){const{props:t,effects:n,context:o}=ne.createPanel();return L(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(re,{get children(){const i=hl.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}function tn(e){const{props:t,effects:n,context:o}=ne.createList();return L(()=>{o.isOpen()&&n()}),s(un,{get children(){return[s(Fe,{get when(){return o.hasPanel()},get children(){const i=Qt.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}}),s(Fe,{get when(){return!o.hasPanel()},get children(){return s(q,{get when(){return o.isOpen()},get children(){return s(re,{get children(){const i=Qt.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}})]}})}function nn(e){const{props:t,effects:n}=ne.createOption({value:()=>e.value});return n(),(()=>{const o=ml.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Pl(){const[e,t]=z();return(()=>{const n=gl.cloneNode(!0),o=n.firstChild,i=o.nextSibling;return o.style.setProperty("margin-bottom","1rem"),l(o,s(x,{get children(){return s(ne,{get value(){return e()},onChange:t,get children(){return[s(Zt,{children:"Choose a fruit: "}),s(en,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},get children(){return["Listbox: ",st(()=>e()?.displayValue)]}}),s(tn,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return s(V,{each:Te,children:r=>s(nn,{value:r,get children(){return r.displayValue}})})}})]}})}})),l(i,s(x,{get children(){return s(ne,{get value(){return e()},onChange:t,get children(){return[s(Zt,{children:"Choose a fruit: "}),s(en,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},get children(){return["Listbox: ",st(()=>e()?.displayValue)]}}),s(xl,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return["Fruit Options:",s(tn,{get children(){return s(V,{each:Te,children:r=>s(nn,{value:r,get children(){return r.displayValue}})})}})]}})]}})}})),n})()}function pt(){return(()=>{const e=vl.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.firstChild,r=i.nextSibling,c=r.nextSibling,a=c.nextSibling;a.nextSibling;const u=o.nextSibling,d=u.nextSibling;return l(o,s(f,{children:"createList()"}),r),l(o,s(f,{children:"createPanel()"}),a),l(e,s(Pl,{}),d),l(e,s(I,{children:yl}),null),e})()}pt.Link=()=>bl.cloneNode(!0);const yl=`import { createEffect, createSignal, For, Match, PropsWithChildren, Show, Switch } from 'solid-js';
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
}`;function Cl(e={orientation:()=>"vertical",getInitialFocusedItem:(t,n)=>n.indexOf(t)===0}){const[t,n]=U({triggerId:null,listId:null,overlayId:null,panelId:null,shouldShowPanel:!1,get isPanelOpen(){return t.shouldShowPanel&&(!t.overlayId||t.isOverlayMounted)},isOverlayMounted:!1,items:[],activeItemId:null,search:"",get orientation(){return e.orientation()},menuActions:{}}),o={...Be(n,e),...xt(n),addMenuAction(r,c){n("menuActions",a=>({...a,[r]:c}))},removeMenuAction(r){n("menuActions",c=>({...c,[r]:void 0}))},performMenuAction(r,c){if(r){if(t.menuActions[r])t.menuActions[r]();else if(c!=="mouse"){const a=document.getElementById(r);a&&(a.$$click||a.onclick||["BUTTON","A"].includes(a.tagName))&&a.click()}}o.closePopover()},setElementId(r,c){n({[r]:c})}},i={isActive:G(()=>t.activeItemId)};return[t,o,i]}const qe=W();function ce(){return C(qe)[0]}function E(){return C(qe)[1]}function Mt(){return C(qe)[2]}function $e(){const e=ce(),t=E(),n=Mt();return{isActive:o=>n.isActive(o),isOpen:()=>e.isPanelOpen,open:()=>t.openPopover(),close:()=>t.closePopover(),hasPanel:()=>!!e.panelId}}function Il(e={}){const t=Sl(e),n=$l({id:t.id,...e}),o=Mt(),i={...$e(),isActive:()=>o.isActive(t.id)};return{props:P(t,n),effects:()=>_l({id:t.id,action:e.action}),context:i}}function Sl(e){const{idPrefix:t="solid-ui-menu-item"}=e,n=m(t),o=Mt();return{get["aria-selected"](){return o.isActive(n)||void 0},get["data-active"](){return o.isActive(n)?"":void 0},"data-solid-ui-list-item":"",...v(t),id:n,role:"menuitem",tabIndex:-1}}function $l(e){const t=E();return{onClick:r=>{t.performMenuAction(e.id,"mouse"),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function _l(e){wl(e),Ml(e),Dl(e),kl(e)}function wl(e){const t=E();g(()=>{t.addItem(e.id)})}function Ml(e){const t=E();R(()=>{t.removeItem(e.id)})}function Dl(e){const t=E();g(()=>{t.addMenuAction(e.id,e.action)})}function kl(e){const t=E();R(()=>{t.removeMenuAction(e.id)})}function Ll(e={}){const t=El(e),n=Ol();return{props:P(t,n),effects:()=>Fl({id:t.id}),context:$e()}}function El(e={}){const{idPrefix:t="solid-ui-menu-list"}=e,n=m(t),o=ce();return{get["aria-activedescendent"](){return o.activeItemId},get["data-solid-ui-panel"](){return o.panelId?void 0:""},"data-solid-ui-list":"",...v(t),id:n,role:"menu",tabIndex:0}}function Ol(e={}){const t=ce(),n=E(),o=ye({ArrowUp(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusPreviousItem())},ArrowDown(r){t.orientation==="vertical"&&(r.preventDefault(),n.focusNextItem())},ArrowLeft(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusPreviousItem())},ArrowRight(r){t.orientation==="horizontal"&&(r.preventDefault(),n.focusNextItem())},Home(r){r.preventDefault(),n.focusFirstItem()},End(r){r.preventDefault(),n.focusLastItem()},Enter(r){r.preventDefault(),n.performMenuAction(t.activeItemId,"keyboard")},Escape(){t.panelId||n.closePopover()},default(r){r.key.length===1&&(!t.search&&r.key===" "?(r.preventDefault(),n.performMenuAction(t.activeItemId,"keyboard")):n.focusTypeaheadItem(r.key))}});return{onKeyDown:r=>{o(r),e.onKeyDown?.(r)}}}function Fl(e){const t=ce(),n=E();Tl(e),t.panelId||(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id}),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})),Al()}function Tl(e){g(()=>{E().setElementId("listId",e.id)})}function Al(){const e=E();g(()=>{e.initializeItemFocus()})}function Vl(e={}){const t=Rl(e),n=Nl(e);return{props:P(t,n),effects:()=>Hl({id:t.id}),context:$e()}}function Rl(e){const{idPrefix:t="solid-ui-menu-panel"}=e,n=m(t);return{"data-solid-ui-panel":"",...v(t),id:n,tabIndex:-1}}function Nl(e){const t=E();return{onKeyUp:o=>{o.key==="Escape"&&t.closePopover(),e.onKeyUp?.(o)}}}function Hl(e){const t=ce(),n=E();Bl({id:e.id}),t.listId&&(Ce({containerId:e.id,isEnabled:()=>t.isPanelOpen}),Ie({containerId:e.id})),se({containerId:e.id,exceptionIds:()=>[t.triggerId],onClickAway:n.closePopover,isEnabled:()=>t.isPanelOpen&&document.getElementById(e.id).contains(document.activeElement)})}function Bl(e){const t=E();g(()=>{t.setElementId("panelId",e.id)})}function Ul(e){e=P({orientation:"vertical"},e);const t=Cl({orientation:()=>e.orientation,getInitialFocusedItem:(n,o)=>o.indexOf(n)===0});return s(qe.Provider,{value:t,get children(){return(()=>(e.context?.($e()),e.children))()}})}function Wl(e={}){const t=Kl(e),n=Gl(e);return{props:P(t,n),effects:()=>jl({id:t.id}),context:$e()}}function Kl(e={}){const t=ce(),{idPrefix:n="solid-ui-menu-trigger"}=e,o=m(n);return{get["aria-controls"](){return t.panelId||t.listId},get["aria-expanded"](){return t.isPanelOpen},["aria-haspopup"]:"menu","data-solid-ui-button":"",...v(n),id:o}}function Gl(e={}){const t=E();return{onClick:i=>{t.togglePopover(),e.onClick?.(i)},onKeyDown:i=>{i.key==="Escape"?t.closePopover():(i.key==="ArrowDown"||i.key==="ArrowUp")&&(i.preventDefault(),t.openPopover()),e.onKeyDown?.(i)}}}function jl(e){Yl(e),Jl(e)}function Yl(e){g(()=>{E().setElementId("triggerId",e.id)})}function Jl(e){const t=ce();L(n=>(n&&!t.isPanelOpen&&document.getElementById(e.id)?.focus({preventScroll:!0}),t.isPanelOpen))}const oe=Object.assign(Ul,{createItem:Il,createList:Ll,createPanel:Vl,createTrigger:Wl}),zl=p("<button></button>"),ql=p("<div></div>"),on=p("<ul></ul>"),Xl=p("<li></li>"),Ql=p("<a></a>"),Zl=p("<div><div>Last menu item clicked: </div></div>"),ea=p('<section><h2 id="Menu">Menu</h2><p>Menu lets you build dropdowns with items that can perform an <!> when selected, or rely on their native click behavior when selected (like navigating to a new page with a link).</p><p>Menu can either directly render a list with <!>, or can first render a parent panel with <!>.</p><h3>Example</h3><h3>Code</h3></section>'),ta=p('<a href="#Menu">Menu</a>'),rn=e=>{const{props:t,effects:n}=oe.createTrigger();return n(),(()=>{const o=zl.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),o.style.setProperty("margin-right","1rem"),l(o,()=>e.children),o})()},na=e=>{const{props:t,effects:n,context:o}=oe.createPanel();return L(()=>{o.isOpen()&&n()}),s(q,{get when(){return o.isOpen()},get children(){return s(re,{get children(){const i=ql.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})},sn=e=>{const{props:t,effects:n,context:o}=oe.createList();return L(()=>{(o.hasPanel()||o.isOpen())&&n()}),s(un,{get children(){return[s(Fe,{get when(){return o.hasPanel()},get children(){const i=on.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}}),s(Fe,{get when(){return!o.hasPanel()},get children(){return s(q,{get when(){return o.isOpen()},get children(){return s(re,{get children(){const i=on.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})}})]}})},ln=e=>{const{props:t,effects:n}=oe.createItem({action:e.action});return n(),(()=>{const o=Xl.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},an=e=>{const{props:t,effects:n}=oe.createItem();return n(),(()=>{const o=Ql.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),Pe(()=>Bn(o,"href",e.href)),o})()};function oa(){const e=["Item 1","Item 2","Item 3"],[t,n]=z("");return(()=>{const o=Zl.cloneNode(!0),i=o.firstChild;return i.firstChild,l(i,t,null),l(o,s(x,{get children(){return s(oe,{get children(){return[s(rn,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},children:"Menu"}),s(sn,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return[s(V,{each:e,children:r=>s(ln,{action:()=>n(r),children:r})}),s(an,{href:"/",children:"Go to Homepage"})]}})]}})}}),null),l(o,s(x,{get children(){return s(oe,{get children(){return[s(rn,{ref(r){const c=x.AnchorRef;typeof c=="function"?c(r):x.AnchorRef=r},children:"Menu"}),s(na,{ref(r){const c=x.PopperRef;typeof c=="function"?c(r):x.PopperRef=r},get children(){return["Choose an item:",s(sn,{get children(){return[s(V,{each:e,children:r=>s(ln,{action:()=>n(r),children:r})}),s(an,{href:"/",children:"Go to Homepage"})]}})]}})]}})}}),null),o})()}function ft(){return(()=>{const e=ea.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling;i.nextSibling;const r=n.nextSibling,c=r.firstChild,a=c.nextSibling,u=a.nextSibling,d=u.nextSibling;d.nextSibling;const b=r.nextSibling,y=b.nextSibling;return l(n,s(f,{children:"action()"}),i),l(r,s(f,{children:"createList()"}),a),l(r,s(f,{children:"createPanel()"}),d),l(e,s(oa,{}),y),l(e,s(I,{children:ra}),null),e})()}ft.Link=()=>ta.cloneNode(!0);const ra=`import { Component, createEffect, createSignal, For, Match, Show, Switch } from 'solid-js';
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
}`,ia=p("<button></button>"),bn=p("<div></div>"),sa=p("<span>This is the content of the popover.</span>"),la=p('<section><h2 id="Popover">Popover</h2><p>A popover is a floating panel that appears near an anchor point.</p><h3>Example</h3><h3>Code</h3></section>'),aa=p('<li><a href="#Popover">Popover</a></li>'),cn=e=>{const{props:t,effects:n}=We.createTrigger();return n(),(()=>{const o=ia.cloneNode(!0),i=e.ref;return typeof i=="function"?i(o):e.ref=o,h(o,t,!1,!0),l(o,()=>e.children),o})()},ca=e=>{const{props:t,effects:n,context:o}=We.createOverlay();return L(()=>{o.isOverlayOpen()&&n()}),s(q,{get when(){return o.isOverlayOpen()},get children(){return s(re,{get children(){const i=bn.cloneNode(!0);return h(i,t,!1,!0),l(i,()=>e.children),i}})}})},ua=e=>{const{props:t,effects:n,context:o}=We.createPanel();return L(()=>{o.isPopoverOpen()&&n()}),s(q,{get when(){return o.isPopoverOpen()},get children(){return s(re,{get children(){const i=bn.cloneNode(!0),r=e.ref;return typeof r=="function"?r(i):e.ref=i,h(i,t,!1,!0),l(i,()=>e.children),i}})}})},da=()=>s(x,{get children(){return s(We,{get children(){return[s(cn,{ref(e){const t=x.AnchorRef;typeof t=="function"?t(e):x.AnchorRef=e},children:"Open popover"}),s(ca,{}),s(ua,{ref(e){const t=x.PopperRef;typeof t=="function"?t(e):x.PopperRef=e},get children(){return[(()=>{const e=sa.cloneNode(!0);return e.style.setProperty("margin-right","20px"),e})(),s(cn,{children:"X"})]}})]}})}}),ht=()=>(()=>{const e=la.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(da,{}),i),l(e,s(I,{children:pa}),null),e})();ht.Link=()=>aa.cloneNode(!0);const pa=`import { Component, createEffect, Show } from 'solid-js';
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
};`;function fa(e){const[t,n]=U({labelId:null,activeItemId:null,items:[],search:""}),o={},i={...Be(n,{getInitialFocusedItem:(c,a)=>[null,void 0].includes(e.value?.())?a.indexOf(c)===0:o[c]===e.value?.(),shouldWrap:!0}),setElementId(c,a){n({[c]:a})},addValue(c,a){o[c]=a},removeValue(c){delete o[c]},chooseValue(c){const a=o[c];c&&a!==e.value()&&e.onChange?.(a)}},r={isActive:G(()=>t.activeItemId),isSelected:G(e.value),get selectedValue(){return e.value?.()}};return[t,i,r]}const Xe=W();function xn(){return C(Xe)[0]}function ue(){return C(Xe)[1]}function Dt(){return C(Xe)[2]}function Qe(){const e=Dt();return{isActive:t=>e.isActive(t),isSelected:t=>e.isSelected(t)}}function ha(e={}){const t=ma(e);return{props:t,effects:()=>ga({id:t.id}),context:Qe()}}function ma(e={}){const{idPrefix:t="solid-ui-radiogroup-label"}=e;return{id:m(t)}}function ga(e){va(e)}function va(e){const t=ue();g(()=>{t.setElementId("labelId",e.id)})}function ba(e){const t=fa({onChange:e.onChange,shouldWrap:!0,value:()=>e.value});return s(Xe.Provider,{value:t,get children(){return(()=>(e.context?.(Qe()),e.children))()}})}function xa(e={}){const t=Pa(e),n=ya({id:t.id,...e}),o=Dt(),i={...Qe(),isActive:()=>o.isActive(t.id),isSelected:()=>o.isSelected(e.value?.())};return{props:P(t,n),effects:()=>Ca({id:t.id,value:e.value}),context:i}}function Pa(e){const{idPrefix:t="solid-ui-radiogroup-radio"}=e,n=m(t),o=Dt();return{get["aria-checked"](){return o.isSelected(e.value?.())},get["data-active"](){return o.isActive(n)?"":void 0},get["data-checked"](){return o.isSelected(e.value?.())?"":void 0},...v(t),id:n,role:"radio",tabIndex:-1}}function ya(e){const t=ue();return{onClick:r=>{t.chooseValue(e.id),e.onClick?.(r)},onMouseEnter:r=>{t.focusItem(e.id),e.onMouseEnter?.(r)},onMouseLeave:r=>{t.clearItemFocus(),e.onMouseLeave?.(r)}}}function Ca(e){Ia(e),Sa(e),$a(e),_a(e)}function Ia(e){const t=ue();g(()=>{t.addItem(e.id)})}function Sa(e){const t=ue();R(()=>{t.removeItem(e.id)})}function $a(e){const t=ue();g(()=>{t.addValue(e.id,e.value())})}function _a(e){const t=ue();R(()=>{t.removeValue(e.id)})}function wa(e={}){const t=Ma(e),n=Da(e);return{props:P(t,n),effects:()=>void 0,context:Qe()}}function Ma(e={}){const{idPrefix:t="solid-ui-radiogroup"}=e,n=m(t),o=xn();return{get["aria-activedescendent"](){return o.activeItemId},get["aria-labelledby"](){return o.labelId},...v(t),id:n,role:"radiogroup",tabIndex:0}}function Da(e={}){const t=xn(),n=ue(),o=a=>{n.clearItemFocus(),e.onBlur?.(a)},i=a=>{n.initializeItemFocus(),e.onFocus?.(a)},r=ye({ArrowUp(a){a.preventDefault(),n.focusPreviousItem(),n.chooseValue(t.activeItemId)},ArrowDown(a){a.preventDefault(),n.focusNextItem(),n.chooseValue(t.activeItemId)},ArrowLeft(a){a.preventDefault(),n.focusPreviousItem(),n.chooseValue(t.activeItemId)},ArrowRight(a){a.preventDefault(),n.focusNextItem(),n.chooseValue(t.activeItemId)},[" "](a){a.preventDefault(),n.chooseValue(t.activeItemId)}});return{onBlur:o,onFocus:i,onKeyDown:a=>{r(a),e.onKeyDown?.(a)}}}const Ve=Object.assign(ba,{createLabel:ha,createRadio:xa,createRadioGroup:wa}),ka=p("<label></label>"),La=p("<ul></ul>"),Ea=p("<li></li>"),Oa=p('<section><h2 id="Radio Group">Radio Group</h2><p>Radio groups function just like a <!> with <!> elements in it, but without any of the styling.</p><h3>Example</h3><h3>Code</h3></section>'),Fa=p('<a href="#Radio Group">Radio Group</a>');function Ta(e){const{props:t,effects:n}=Ve.createLabel();return n(),(()=>{const o=ka.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Aa(e){return s(Ve,P(e,{get children(){return(()=>{const{props:t,effects:n}=Ve.createRadioGroup();return n(),(()=>{const o=La.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()})()}}))}function Va(e){const{props:t,effects:n}=Ve.createRadio({value:()=>e.value});return n(),(()=>{const o=Ea.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()}function Ra(){const[e,t]=z();return s(Aa,{get value(){return e()},onChange:n=>{console.log(n),t(n)},get children(){return[s(Ta,{children:"Choose a fruit: "}),s(V,{each:Te,children:n=>s(Va,{value:n,get children(){return n.displayValue}})})]}})}function mt(){return(()=>{const e=Oa.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling;c.nextSibling;const a=n.nextSibling,u=a.nextSibling;return l(n,s(f,{language:"html",children:"<fieldset>"}),i),l(n,s(f,{language:"html",children:'<input type="radio" />'}),c),l(e,s(Ra,{}),u),l(e,s(I,{children:Na}),null),e})()}mt.Link=()=>Fa.cloneNode(!0);const Na=`import { createSignal, For, PropsWithChildren } from 'solid-js';
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
}`;function Ha(){const[e,t]=U({descriptionId:null,labelId:null,switchId:null});return[e,{setElementId(o,i){t({[o]:i})}}]}const kt=W();function Pn(){return C(kt)[0]}function Lt(){return C(kt)[1]}function Ba(e={}){const t=Ua(e);return{props:t,effects:()=>Wa({id:t.id})}}function Ua(e={}){const{idPrefix:t="solid-ui-switch-description"}=e;return{id:m(t)}}function Wa(e){Ka(e)}function Ka(e){const t=Lt();g(()=>{t.setElementId("descriptionId",e.id)})}function Ga(e={}){const t=ja(e),n=Ya(e);return{props:P(t,n),effects:()=>Ja({id:t.id})}}function ja(e={}){const{idPrefix:t="solid-ui-switch-label"}=e,n=m(t);return{...v(t),id:n}}function Ya(e={}){const t=Pn();return{onClick:o=>{e.passive||document.getElementById(t.labelId)?.click(),e.onClick?.(o)}}}function Ja(e){za(e)}function za(e){const t=Lt();g(()=>{t.setElementId("labelId",e.id)})}function qa(e){const t=Ha();return s(kt.Provider,{value:t,get children(){return e.children}})}function Xa(e={}){const t=Qa(e),n=Za(e);return{props:P(t,n),effects:()=>ec({id:t.id})}}function Qa(e){const{idPrefix:t="solid-ui-switch"}=e,n=m(t),o=Pn();return{get["aria-checked"](){return e.checked()},get["aria-describedby"](){return o.descriptionId},get["aria-labelledby"](){return o.labelId},...v(t),get["data-checked"](){return e.checked()?"":void 0},id:n,role:"switch",tabIndex:0}}function Za(e={}){const t=()=>e.onChange?.(!e.checked?.());return{onClick:r=>{t(),e.onClick?.(r)},onKeyPress:r=>{r.preventDefault(),e.onKeyPress?.(r)},onKeyUp:r=>{r.key!=="Tab"&&r.preventDefault(),r.key===" "&&t(),e.onKeyUp?.(r)}}}function ec(e){tc(e)}function tc(e){const t=Lt();g(()=>{t.setElementId("switchId",e.id)})}const Ze=Object.assign(qa,{createDescription:Ba,createLabel:Ga,createSwitch:Xa}),nc=p('<button type="button"></button>'),oc=p("<p></p>"),rc=p("<label></label>"),ic=p('<section><h2 id="Switch">Switch</h2><p>A switch functions just like a native checkbox, but has switch semantics applied to it instead.</p><h3>Example</h3><h3>Code</h3></section>'),sc=p('<a href="#Switch">Switch</a>'),lc=e=>{const{props:t,effects:n}=Ze.createSwitch({checked:()=>e.checked,onChange:e.onChange});return n(),(()=>{const o=nc.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},ac=e=>{const{props:t,effects:n}=Ze.createDescription();return n(),(()=>{const o=oc.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},cc=e=>{const{props:t,effects:n}=Ze.createLabel();return n(),(()=>{const o=rc.cloneNode(!0);return h(o,t,!1,!0),l(o,()=>e.children),o})()},uc=()=>{const[e,t]=z(!1);return s(Ze,{get children(){return[s(cc,{children:"Enable feature flag: "}),s(lc,{get checked(){return e()},onChange:t}),s(ac,{children:"This is the description of the switch."})]}})};function gt(){return(()=>{const e=ic.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling;return l(e,s(uc,{}),i),l(e,s(I,{children:dc}),null),e})()}gt.Link=()=>sc.cloneNode(!0);const dc=`import { Component, createSignal, PropsWithChildren } from 'solid-js';
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
};`;const pc=p('<section><h2 id="Extensions">Extensions</h2><p>By default, Solid UI makes no assumptions as to how you want to do things like position a popover near an anchor point. As <a href="https://popper.js.org/">PopperJS</a> is a popular positioning library, Solid UI comes with a built-in <!> component:</p></section>'),fc=p('<a href="#Extensions">Extensions</a>');function vt(){return(()=>{const e=pc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=r.nextSibling;return c.nextSibling,l(n,s(f,{children:"Popper"}),c),l(e,s(I,{children:hc}),null),e})()}vt.Link=()=>fc.cloneNode(!0);const hc=`import Popper from '@solid-ui/popper';

function MyPopover() {
  return (
    <Popper>
      <MyTrigger ref={Popper.AnchorRef} />
      <MyPopover ref={Popper.PopperRef} />
    </Popper>
  )
}`,mc=p(`<section><h2 id="Styling">Styling</h2><p>As Solid UI provides hooks for creating components, and not components themselves, Solid UI components are "unstyled" and only include the styles that you add. Solid UI includes separate component hooks for each part of a component, so styles can easily and declaratively be applied to every part of the component.</p><h3>Data attributes</h3><p>Each Solid UI component does include a unique <!> attribute that can be used to apply styles with CSS:</p><p>If you would like to override these data attributed and supply your own, every component hook includes an optional <!> property:</p><p>Some generic data attributes are also added for elements that are common among many Solid UI components, such as <!> for buttons. Providing styles for this attribute will apply the same styling to all Solid UI components that are intended to be buttons:</p><h3>Default Styles</h3><p>As a starting point, Solid UI also comes with a set of default styles (like the ones on this page), which can be added by importing <!>:</p><p>All default styles rely on Solid UI's default data attributes and use the lowest specificity possible, so they are easy to override.</p></section>`),gc=p('<a href="#Styling">Styling</a>');function bt(){return(()=>{const e=mc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling,r=i.firstChild,c=r.nextSibling;c.nextSibling;const a=i.nextSibling,u=a.firstChild,d=u.nextSibling;d.nextSibling;const b=a.nextSibling,y=b.firstChild,T=y.nextSibling;T.nextSibling;const A=b.nextSibling,F=A.nextSibling,H=F.firstChild,_=H.nextSibling;_.nextSibling;const w=F.nextSibling;return l(i,s(f,{language:"html",children:"[data-solid-ui-*]"}),c),l(e,s(I,{language:"css",children:vc}),a),l(a,s(f,{children:"isPrefix"}),d),l(e,s(I,{children:bc}),b),l(b,s(f,{language:"html",children:"[data-solid-ui-button]"}),T),l(e,s(I,{language:"css",children:xc}),A),l(F,s(f,{children:"styles.css"}),_),l(e,s(I,{children:"import '@solid-ui/styles.css';"}),w),e})()}bt.Link=()=>gc.cloneNode(!0);const vc=`[data-solid-ui-popover-trigger] {
  background: red;
}

[data-solid-ui-popover-trigger]:hover {
  background: blue;
}`,bc=`const { props } = Popover.createTrigger({ idPrefix: 'my-trigger' });
// trigger data attribute is now "data-my-trigger"`,xc=`[data-solid-ui-button]:hover {
  background: green;
}`,Pc=p('<nav><header><h1><a href="#Home">Solid UI</a></h1></header><ul><li></li><li></li><li></li></ul><hr aria-hidden="true"><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></nav>'),yc=p('<main><h1 id="Home">Solid UI</h1><p>Hooks for building declarative, accessible, composable UI components with SolidJS.</p><p>Solid UI is still actively being built, and many of the component hooks below are not feature complete, are untested, and not considered not ready for production use.</p><p>This library was written as part of the SolidJS "SolidHack 2022" community hackathon. These docs reference components as being available as part of the <!> NPM package, though this library is not actually hosted yet.</p></main>');function Cc(){return[(()=>{const e=Pc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.firstChild,i=o.nextSibling,r=i.nextSibling,c=n.nextSibling,a=c.nextSibling,u=a.firstChild,d=u.nextSibling,b=d.nextSibling,y=b.nextSibling,T=y.nextSibling,A=T.nextSibling,F=A.nextSibling,H=F.nextSibling,_=H.nextSibling;return l(o,s(lt.Link,{})),l(i,s(bt.Link,{})),l(r,s(vt.Link,{})),l(u,s(ht.Link,{})),l(d,s(ut.Link,{})),l(b,s(ft.Link,{})),l(y,s(pt.Link,{})),l(T,s(ct.Link,{})),l(A,s(mt.Link,{})),l(F,s(dt.Link,{})),l(H,s(gt.Link,{})),l(_,s(at.Link,{})),e})(),(()=>{const e=yc.cloneNode(!0),t=e.firstChild,n=t.nextSibling,o=n.nextSibling,i=o.nextSibling,r=i.firstChild,c=r.nextSibling;return c.nextSibling,l(i,s(f,{children:"@solid-ui"}),c),l(e,s(lt,{}),null),l(e,s(bt,{}),null),l(e,s(vt,{}),null),l(e,s(ht,{}),null),l(e,s(ut,{}),null),l(e,s(ft,{}),null),l(e,s(pt,{}),null),l(e,s(ct,{}),null),l(e,s(mt,{}),null),l(e,s(dt,{}),null),l(e,s(gt,{}),null),l(e,s(at,{}),null),e})()]}const Ic=()=>s(Cc,{});Un(()=>s(Ic,{}),document.getElementById("root"));
