(self.webpackChunkui=self.webpackChunkui||[]).push([[4],{9341:(e,t,r)=>{"use strict";function n(e,t,r,n,o,s,a){try{var i=e[s](a),u=i.value}catch(c){return void r(c)}i.done?t(u):Promise.resolve(u).then(n,o)}r.d(t,{J:()=>p});var o=r(639),s=r(1841),a=r(6215),i=r(2340);let u=(()=>{class e{constructor(e){this.http=e,this.auth=""}setHeaders(){return{headers:new s.WM({"Content-Type":"application/json",Accept:"application/json"}),reportProgress:!0,withCredentials:!0}}general(e){const t=new s.aW(e.type,`${i.n}${e.version}${e.endpoint}`,e.toServer);return this.http.request(t)}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(s.eN))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var c=r(6653);let p=(()=>{class e{constructor(e,t){this._api=e,this._route=t,this.epd=new o.vpe,this.eiui=new o.vpe,this.$button=new a.X(0),this.multiOffers=new a.X(0),this.$temp=new a.X(0)}HttpEventResponse(e){switch(e.type){case s.dt.Sent:case s.dt.ResponseHeader:break;case s.dt.DownloadProgress:this.loading=Math.round(e.loaded/1024);break;case s.dt.Response:return e.body}}callGeneral(e){"login"==e.func||"register"==e.func||"forgotpassword"==e.func?this.common(e):"offers"==e.func?this.offers(e):"upInvoice"==e.func?this.upInvoice(e):"userinvoices"==e.func&&this.getUserInvoices(e)}getUserInvoices(e){this._api.general(e).subscribe(e=>{let t=this.HttpEventResponse(e);4===e.type&&console.log(t)},e=>{})}common(e){let t;"login"==e.func&&(t="upload"),"register"==e.func&&(t="dashboard"),"forgotpassword"==e.func&&(t="check-email"),this._api.general(e).subscribe(r=>{let n=this.HttpEventResponse(r);if(4===r.type){const r=n;"login"!=e.func&&"register"!=e.func||localStorage.setItem("token",r.t),this.$button.next({arr:r,loaded:1,_route:t})}},e=>{this.$button.next({error:e.error.error,loaded:0})})}profile(e){this._api.general(e).subscribe(e=>{let t=this.HttpEventResponse(e);if(4===e.type){const e=t;this.epd.emit({arr:e,loaded:1}),console.log(e)}},e=>{this.epd.emit({error:e.error.error,loaded:0})})}offers(e){var t=this;this._api.general(e).subscribe(function(){var e,r=(e=function*(e){let r=t.HttpEventResponse(e);if(4===e.type){const e=yield t.doExpandJSON(r);t.multiOffers.next({arr:e,loaded:1})}},function(){var t=this,r=arguments;return new Promise(function(o,s){var a=e.apply(t,r);function i(e){n(a,o,s,i,u,"next",e)}function u(e){n(a,o,s,i,u,"throw",e)}i(void 0)})});return function(e){return r.apply(this,arguments)}}(),e=>{this.multiOffers.next({error:e.error.error,loaded:0})})}upInvoice(e){this._api.general(e).subscribe(e=>{let t=this.HttpEventResponse(e);4===e.type&&(this.eiui.emit({arr:t,loaded:1}),this._route.navigate(["/dashboard"]))},e=>{this.eiui.emit({error:e.error.error,loaded:0})})}doExpandJSON(e){let t={},r=[],n=e.n.split("~");return e.d.map(e=>{t={};for(let r=0;r<n.length;r++){let o=e.split("~")[r];if("_"==n[r].substr(n[r].length-1)){const e=o.split("*");")"==e[e.length-1].substr(e[e.length-1].length-1)&&console.log(e),t[n[r]]=o.split("*")}else t[n[r]]=o}r.push(t)}),r}npmIdbLib(e){}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(u),o.LFG(c.F0))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},1004:(e,t,r)=>{"use strict";r.r(t),r.d(t,{HomeModule:()=>l});var n=r(8583),o=r(6653),s=r(639),a=r(9341);let i=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-card"]],decls:1,vars:0,template:function(e,t){1&e&&s._uU(0," app card works\n")},styles:[""]}),e})();function u(e,t){if(1&e&&(s.ynx(0),s.TgZ(1,"span",11),s._uU(2),s.qZA(),s.BQk()),2&e){const e=t.$implicit;s.xp6(2),s.hij(" ",e," ")}}function c(e,t){if(1&e){const e=s.EpF();s.ynx(0),s.TgZ(1,"div",9),s.NdJ("click",function(){const t=s.CHM(e),r=t.$implicit,n=t.index;return s.oxw().goToOffers(r,n)}),s.TgZ(2,"p"),s._uU(3,"BUY THESE ITEMS"),s.qZA(),s.TgZ(4,"div",10),s.YNc(5,u,3,1,"ng-container",8),s.qZA(),s.TgZ(6,"p"),s.TgZ(7,"sup"),s._uU(8,"GET "),s.qZA(),s.TgZ(9,"span"),s._uU(10),s.qZA(),s._UZ(11,"br"),s._uU(12,"Assured Cashback*"),s.qZA(),s.qZA(),s.BQk()}if(2&e){const e=t.$implicit;s.xp6(5),s.Q6J("ngForOf",e.category_),s.xp6(5),s.hij("",null==e?null:e.cashback,"%")}}const p=[{path:"",component:(()=>{class e{constructor(e,t){this._mid=e,this._route=t,this.usData=this._mid.multiOffers.subscribe(e=>{e.loaded&&(this.data=e.arr)})}ngOnInit(){this._mid.offers({type:"GET",endpoint:"/affiliate/amazon",version:"/v1",func:"",toServer:{key:"value"},headers:{}})}goToOffers(e,t){this._mid.$temp.next({d:e,i:t}),this._route.navigate([`/offer/${t}`])}ngOnDestroy(){this.usData.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(a.J),s.Y36(o.F0))},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-home"]],decls:36,vars:1,consts:[[1,"flex-container"],[1,"usp"],["data-aos","fade-up","data-aos-duration","800",1,"h1"],["data-aos","fade-up","data-aos-duration","1000"],["href","https://www.amazon.in/","target","_blank"],["data-aos","fade-up","data-aos-duration","1200",1,"h5"],["data-aos","fade-up","data-aos-duration","1400",1,""],["routerLink","/login",1,"cta"],[4,"ngFor","ngForOf"],["data-aos","fade-up","data-aos-duration","2000",1,"flex-item","pointers","width-res",3,"click"],[1,"min-hieght"],[1,"sub-category"]],template:function(e,t){1&e&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"h1",2),s._uU(3," CASHBACK \xa0EARNINGS\xa0 MADE\xa0 EASY "),s.qZA(),s.TgZ(4,"p",3),s._uU(5," We are trying to make this a better place by providing cashback as much as we can to our users who work hard and try to save money while shopping online. At this time replying is not possible to every user but we do read all our users feedback sent to us. "),s._UZ(6,"br"),s._UZ(7,"br"),s._uU(8,"If you have recently visited "),s.TgZ(9,"a",4),s._uU(10,"Amazon.in"),s.qZA(),s._uU(11," from our website and purchased a product from "),s.TgZ(12,"a",4),s._uU(13,"Amazon.in"),s.qZA(),s._uU(14,". You may entitle to receive cashback from us. "),s._UZ(15,"br"),s._uU(16,"Upload a copy of your bill and follow the simple steps to receive cashback in your bank account "),s._UZ(17,"br"),s._uU(18,"Happy shopping! "),s.qZA(),s._UZ(19,"br"),s._UZ(20,"br"),s.TgZ(21,"h5",5),s.TgZ(22,"span"),s._uU(23,"+5000"),s.qZA(),s._uU(24," Happy Customers "),s.TgZ(25,"span"),s._uU(26,"+3.2Lacs"),s.qZA(),s._uU(27," Cashback Earned "),s.TgZ(28,"span"),s._uU(29," directly to"),s.qZA(),s._uU(30," BANK "),s.qZA(),s.TgZ(31,"div",6),s.TgZ(32,"a",7),s._uU(33,"Upload A Bill"),s.qZA(),s.qZA(),s.qZA(),s._UZ(34,"app-card"),s.YNc(35,c,13,2,"ng-container",8),s.qZA()),2&e&&(s.xp6(35),s.Q6J("ngForOf",t.data))},directives:[o.yS,i,n.sg],styles:[""]}),e})()}];let d=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[o.Bz.forChild(p)],o.Bz]}),e})(),l=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[n.ez,d]]}),e})()}}]);