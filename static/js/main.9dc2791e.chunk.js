(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{109:function(t,e,n){},110:function(t,e,n){},139:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),i=n(11),r=n.n(i);n(109),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(110);var o,s,d,u=n(180),l=n(193),j=n(176),b=n(181),O=n(182),f=n(178),h=n(183),m=n(184),p=n(19),T=n(32),x=n(7),g=n(82),S=n.n(g).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"api-key":"17966628-b354-4868-a658-bbe1d663b656"}}),y=function(){return S.get("todo-lists")},I=function(t,e){return S.put("todo-lists/".concat(t),{title:e})},v=function(t){return S.post("todo-lists",{title:t})},k=function(t){return S.delete("todo-lists/".concat(t))},E=function(t){return S.get("todo-lists/".concat(t,"/tasks"))},_=function(t,e){return S.post("todo-lists/".concat(t,"/tasks"),{title:e})},A=function(t,e,n){return S.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},C=function(t,e){return S.delete("todo-lists/".concat(t,"/tasks/").concat(e))},w=function(t){return S.post("auth/login",t)},L=function(){return S.delete("auth/login")},D=function(){return S.get("auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(o||(o={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(s||(s={})),function(t){t[t.Succeed=0]="Succeed",t[t.Failed=1]="Failed"}(d||(d={}));var P=function(t,e){t.messages.length?e(Z(t.messages[0])):e(Z("Some error occurred")),e(z("failed"))},N=function(t,e){e(Z(t.message)),e(z("failed"))},R=n(31),K={},U=function(t,e,n){return{type:"SET_TASK_ENTITY_STATUS",todolistId:t,taskId:e,status:n}},F=function(t,e,n){return function(c,a){c(z("loading")),c(U(t,e,"loading"));var i=a().tasks[t].find((function(t){return t.id===e}));i&&A(t,e,Object(x.a)({title:i.title,startDate:i.startDate,priority:i.priority,description:i.description,deadline:i.deadline,status:i.status},n)).then((function(a){a.data.resultCode===d.Succeed?(c(function(t,e,n){return{type:"UPDATE_TASK",todolistId:t,taskId:e,model:n}}(t,e,n)),c(z("succeeded")),c(U(t,e,"succeeded"))):(P(a.data,c),c(U(t,e,"failed")))})).catch((function(n){N(n,c),c(U(t,e,"failed"))}))}},G={isLoggedIn:!1},M=function(t){return{type:"AUTH/SET_IS_LOGGED_IN",isLoggedIn:t}},H={isInitialized:!1,status:"idle",error:null},z=function(t){return{type:"APP/SET-STATUS",status:t}},Z=function(t){return{type:"APP/SET-ERROR",error:t}},V=function(t){return{type:"APP/SET-APP-IS-INITIALIZED",isInitialized:t}},W=[],B=function(t){return{type:"SET_TODOLISTS",todolists:t}},q=function(t,e){return{type:"SET_ENTITY_STATUS",id:t,status:e}},Y=n(170),$=n(141),J=n(43),X=n(185),Q=n(174),tt=n(175),et=n(3),nt=a.a.memo((function(t){var e=Object(c.useState)(""),n=Object(J.a)(e,2),a=n[0],i=n[1],r=Object(c.useState)(null),o=Object(J.a)(r,2),s=o[0],d=o[1],u=function(){a.trim()?(t.addItem(a),i("")):(d("Title is required!"),i(""))};return Object(et.jsx)(Y.a,{spacing:2,children:Object(et.jsxs)(Y.a,{container:!0,children:[Object(et.jsx)(X.a,{disabled:t.disabled,margin:"dense",variant:"outlined",value:a,error:!!s,helperText:s,label:t.title,onChange:function(t){i(t.currentTarget.value),null!==s&&d(null)},onKeyPress:function(t){"Enter"===t.key&&u()}}),Object(et.jsx)(Q.a,{color:"primary",onClick:u,disabled:t.disabled,children:Object(et.jsx)(tt.a,{})})]})})})),ct=n(186),at=n(177),it=a.a.memo((function(t){var e=t.title,n=t.editTitle,a=t.status,i=t.disabled,r=t.entityStatus,s=Object(c.useState)(!1),d=Object(J.a)(s,2),u=d[0],l=d[1],b=Object(c.useState)(""),O=Object(J.a)(b,2),f=O[0],h=O[1],m=Object(c.useState)(null),p=Object(J.a)(m,2),T=p[0],x=p[1],g=function(t){t.trim()?(n(t),l(!1)):(x("Title is required!"),h(""))};return Object(et.jsx)(et.Fragment,{children:"loading"===r?Object(et.jsx)(j.a,{size:20}):u?Object(et.jsx)(X.a,{autoFocus:!0,value:f,error:!!T,helperText:T,onChange:function(t){h(t.currentTarget.value),null!==T&&x(null)},onBlur:function(){g(f)},onKeyPress:function(t){"Enter"!==t.key||t.shiftKey||g(f)}}):Object(et.jsx)(ct.a,{component:"span",m:1,p:1,style:{textDecoration:"".concat(a===o.Completed?"line-through":""),wordBreak:"break-word"},onDoubleClick:function(){!i&&l(!0)},children:e})})})),rt=n(188),ot=a.a.memo((function(t){var e=t.title,n=t.id,a=t.status,i=t.entityTaskStatus,r=t.removeTask,s=t.changeTaskStatus,d=t.changeTaskTitle,u=Object(c.useCallback)((function(t){s(n,t.currentTarget.checked?o.Completed:o.New)}),[s,n]),l=Object(c.useCallback)((function(){r(n)}),[r,n]),j=Object(c.useCallback)((function(t){d(n,t)}),[d,n]);return Object(et.jsxs)(Y.a,{style:{minWidth:"200px",maxWidth:"300px",display:"flex",justifyContent:"space-between"},children:[Object(et.jsx)(rt.a,{color:"primary",onChange:u,checked:a!==o.New,disabled:"loading"===i}),Object(et.jsx)(it,{title:e,editTitle:j,status:a,entityStatus:i,disabled:"loading"===i}),Object(et.jsx)(Q.a,{onClick:l,disabled:"loading"===i,children:Object(et.jsx)(at.a,{})})]},t.key)})),st=a.a.memo((function(t){var e=t.id,n=t.filter,a=t.title,i=t.entityStatus,r=t.changeTodolistTitle,s=t.deleteTodolist,u=t.demo,l=Object(p.c)((function(t){return t.tasks})),j=Object(p.b)();Object(c.useEffect)((function(){var t;u||j((t=e,function(e){e(z("loading")),E(t).then((function(n){n.data.error?(e(Z(n.data.error)),e(z("failed"))):(e(function(t,e){return{type:"SET_TASKS",tasks:t,todolistId:e}}(n.data.items,t)),e(z("succeeded")))})).catch((function(t){return N(t,e)}))}))}),[j]);var b=Object(c.useCallback)((function(t){j(function(t,e){return function(n){n(z("loading")),n(U(t,e,"loading")),C(t,e).then((function(c){c.data.resultCode===d.Succeed?(n(function(t,e){return{type:"REMOVE_TASK",taskId:t,todolistId:e}}(e,t)),n(z("succeeded")),n(U(t,e,"succeeded"))):P(c.data,n)})).catch((function(c){N(c,n),n(U(t,e,"failed"))}))}}(e,t))}),[j,e]),O=Object(c.useCallback)((function(t){j(function(t,e){return function(n){n(z("loading")),n(q(t,"loading")),_(t,e).then((function(e){e.data.resultCode===d.Succeed?(n({type:"ADD_TASK",task:e.data.data.item}),n(z("succeeded")),n(q(t,"succeeded"))):(P(e.data,n),n(q(t,"failed")))})).catch((function(e){N(e,n),n(q(t,"failed"))}))}}(e,t))}),[j,e]),h=Object(c.useCallback)((function(t,n){var c=F(e,t,{status:n});j(c)}),[j,e]),m=Object(c.useCallback)((function(t,n){var c=F(e,t,{title:n});j(c)}),[j,e]),T=function(t){var n=function(t,e){return{type:"CHANGE_TODOLIST_FILTER",filter:e,id:t}}(e,t);j(n)},x=Object(c.useCallback)((function(t){r(e,t)}),[r,e]),g=l[e],S=g;switch(n){case"active":S=g.filter((function(t){return t.status===o.New}));break;case"completed":S=g.filter((function(t){return t.status===o.Completed}))}return Object(et.jsxs)(ct.a,{style:{textAlign:"center"},children:[Object(et.jsxs)("h3",{style:{maxWidth:"300px",textAlign:"center"},children:[Object(et.jsx)(it,{title:a,editTitle:x,disabled:"loading"===i,entityStatus:i}),Object(et.jsx)(Q.a,{onClick:function(){s(e)},disabled:"loading"===i,children:Object(et.jsx)(at.a,{})})]}),Object(et.jsxs)(Y.a,{children:[Object(et.jsx)(f.a,{variant:"all"===n?"contained":"outlined",color:"primary",style:{margin:"5px"},onClick:function(){return T("all")},children:"all"}),Object(et.jsx)(f.a,{variant:"active"===n?"contained":"outlined",color:"primary",style:{margin:"5px"},onClick:function(){return T("active")},children:"active"}),Object(et.jsx)(f.a,{variant:"completed"===n?"contained":"outlined",color:"primary",style:{margin:"5px"},onClick:function(){return T("completed")},children:"completed"})]}),Object(et.jsx)(ct.a,{style:{display:"flex",justifyContent:"center"},children:Object(et.jsx)(nt,{title:"Create new task",addItem:O,disabled:"loading"===i})}),Object(et.jsx)(ct.a,{children:S.map((function(t){return Object(et.jsx)(ot,{id:t.id,title:t.title,status:t.status,entityTaskStatus:t.entityTaskStatus,removeTask:b,changeTaskStatus:h,changeTaskTitle:m},t.id)}))})]})})),dt=n(15),ut=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(p.c)((function(t){return t.todolists})),i=Object(p.c)((function(t){return t.auth.isLoggedIn})),r=Object(p.b)();Object(c.useEffect)((function(){!n&&i&&r((function(t){t(z("loading")),y().then((function(e){t(B(e.data)),t(z("succeeded"))})).catch((function(e){N(e,t)}))}))}),[r,i,n]);var o=Object(c.useCallback)((function(t){r(function(t){return function(e){e(z("loading")),v(t).then((function(t){console.log(t),t.data.resultCode===d.Succeed?(e({type:"ADD_TODOLIST",todolist:t.data.data.item}),e(z("succeeded"))):P(t.data,e)})).catch((function(t){return N(t,e)}))}}(t))}),[r]),s=Object(c.useCallback)((function(t){r(function(t){return function(e){e(z("loading")),e(q(t,"loading")),k(t).then((function(n){n.data.resultCode===d.Succeed?(e(function(t){return{type:"REMOVE_TODOLIST",id:t}}(t)),e(z("succeeded"))):(P(n.data,e),e(q(t,"failed")))})).catch((function(n){N(n,e),e(q(t,"failed"))}))}}(t))}),[r]),u=Object(c.useCallback)((function(t,e){r(function(t,e){return function(n){n(z("loading")),n(q(t,"loading")),I(t,e).then((function(c){c.data.resultCode===d.Succeed?(n(function(t,e){return{type:"CHANGE_TODOLIST_TITLE",title:e,id:t}}(t,e)),n(z("succeeded")),n(q(t,"succeeded"))):(P(c.data,n),n(q(t,"failed")))})).catch((function(e){N(e,n),n(q(t,"failed"))}))}}(t,e))}),[r]);return i?Object(et.jsxs)(et.Fragment,{children:[Object(et.jsx)(Y.a,{container:!0,style:{padding:"20px"},children:Object(et.jsx)(nt,{title:"Create new todolist",addItem:o})}),Object(et.jsx)(Y.a,{container:!0,spacing:3,children:a.map((function(t){return Object(et.jsx)(Y.a,{item:!0,children:Object(et.jsx)($.a,{style:{padding:"10px",minWidth:"300px"},children:Object(et.jsx)(st,{demo:n,id:t.id,title:t.title,filter:t.filter,entityStatus:t.entityStatus,deleteTodolist:s,changeTodolistTitle:u},t.id)})})}))})]}):Object(et.jsx)(dt.a,{to:"login"})},lt=n(190),jt=n(187);function bt(t){return Object(et.jsx)(jt.a,Object(x.a)({elevation:6,variant:"filled"},t))}function Ot(){var t=Object(p.c)((function(t){return t.app.error})),e=Object(p.b)(),n=function(t,n){"clickaway"!==n&&e(Z(null))};return Object(et.jsx)(lt.a,{open:null!==t,autoHideDuration:6e3,onClose:n,children:Object(et.jsx)(bt,{onClose:n,severity:"error",children:t})})}var ft=n(191),ht=n(173),mt=n(179),pt=n(192),Tt=n(90),xt=function(){var t=Object(p.c)((function(t){return t.auth.isLoggedIn})),e=Object(p.b)(),n=Object(Tt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?/^[A-Z0-9._%+-]{2,}$/i.test(t.password)||(e.password="Invalid password"):e.password="Required",e},onSubmit:function(t){var c;e((c=t,function(t){t(z("loading")),t(V(!1)),w(c).then((function(e){e.data.resultCode===d.Succeed?(t(M(!0)),t(z("succeeded")),t(V(!0))):(t(V(!0)),P(e.data,t))})).catch((function(e){t(V(!0)),N(e,t)}))})),n.resetForm()}});return t?Object(et.jsx)(dt.a,{to:"/"}):Object(et.jsx)(Y.a,{container:!0,justify:"center",children:Object(et.jsx)(Y.a,{item:!0,xs:4,children:Object(et.jsx)("form",{onSubmit:n.handleSubmit,children:Object(et.jsxs)(ft.a,{children:[Object(et.jsxs)(ht.a,{children:[Object(et.jsxs)("p",{children:["To log in get registered",Object(et.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:"here"})]}),Object(et.jsx)("p",{children:"or use common test account credentials:"}),Object(et.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(et.jsx)("p",{children:"Password: free"})]}),Object(et.jsxs)(mt.a,{children:[Object(et.jsx)(X.a,Object(x.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(et.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(et.jsx)(X.a,Object(x.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(et.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(et.jsx)(pt.a,{label:"Remember me",control:Object(et.jsx)(rt.a,Object(x.a)(Object(x.a)({},n.getFieldProps("rememberMe")),{},{checked:n.values.rememberMe}))}),Object(et.jsx)(f.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},gt=n(54),St=n.n(gt),yt=function(){return Object(et.jsxs)("div",{className:St.a.container,children:[Object(et.jsx)("div",{className:St.a.number,children:"404"}),Object(et.jsx)("div",{className:St.a.text,children:"Page not found!"}),Object(et.jsx)("div",{className:St.a.smile,children:"\u2014\u0e05/\u1420.\u032b .\u141f\\\u0e05\u2014"})]})},It=Object(u.a)((function(t){return Object(l.a)({root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}})})),vt=function(t){var e=t.demo,n=void 0!==e&&e,a=(It(),Object(p.c)((function(t){return t.app.status}))),i=Object(p.c)((function(t){return t.app.isInitialized})),r=Object(p.c)((function(t){return t.auth.isLoggedIn})),o=Object(p.b)();Object(c.useEffect)((function(){o((function(t){t(z("loading")),D().then((function(e){e.data.resultCode===d.Succeed?(t(M(!0)),t(z("succeeded"))):P(e.data,t),t(V(!0))})).catch((function(e){return N(e,t)}))}))}),[o]);var s=Object(c.useCallback)((function(){o((function(t){t(z("loading")),L().then((function(e){e.data.resultCode===d.Succeed?(t(M(!1)),t(z("succeeded")),t({type:"DELETE_ALL_TASKS"}),t(B([]))):P(e.data,t)})).catch((function(e){return N(e,t)}))}))}),[o]);return i?Object(et.jsxs)("div",{className:"App",children:[Object(et.jsx)(Ot,{}),Object(et.jsxs)(b.a,{position:"static",children:[Object(et.jsxs)(O.a,{children:[Object(et.jsx)("h2",{children:"Create your todo"}),r&&Object(et.jsx)(f.a,{style:{position:"absolute",right:"20px"},color:"inherit",onClick:s,children:"Logout"})]}),"loading"===a&&Object(et.jsx)(h.a,{})]}),Object(et.jsx)(m.a,{fixed:!0,children:Object(et.jsxs)(dt.d,{children:[Object(et.jsx)(dt.b,{exact:!0,path:"/",render:function(){return Object(et.jsx)(ut,{demo:n})}}),Object(et.jsx)(dt.b,{exact:!0,path:"/login",render:function(){return Object(et.jsx)(xt,{})}}),Object(et.jsx)(dt.b,{path:"/Error404",render:function(){return Object(et.jsx)(yt,{})}}),Object(et.jsx)(dt.a,{from:"*",to:"/"})]})})]}):Object(et.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(et.jsx)(j.a,{})})},kt=n(62),Et=n(89),_t=Object(kt.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TODOLISTS":return e.todolists.map((function(t){return Object(x.a)(Object(x.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"ADD_TODOLIST":return[Object(x.a)(Object(x.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(T.a)(t));case"REMOVE_TODOLIST":return Object(T.a)(t.filter((function(t){return t.id!==e.id})));case"CHANGE_TODOLIST_TITLE":return Object(T.a)(t.map((function(t){return t.id===e.id?Object(x.a)(Object(x.a)({},t),{},{title:e.title}):t})));case"CHANGE_TODOLIST_FILTER":return Object(T.a)(t.map((function(t){return t.id===e.id?Object(x.a)(Object(x.a)({},t),{},{filter:e.filter}):t})));case"SET_ENTITY_STATUS":return Object(T.a)(t.map((function(t){return t.id===e.id?Object(x.a)(Object(x.a)({},t),{},{entityStatus:e.status}):t})));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TASKS":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.todolistId,e.tasks.map((function(t){return Object(x.a)(Object(x.a)({},t),{},{entityTaskStatus:"idle"})}))));case"ADD_TASK":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.task.todoListId,[Object(x.a)({},e.task)].concat(Object(T.a)(t[e.task.todoListId]))));case"REMOVE_TASK":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"DELETE_ALL_TASKS":return{};case"UPDATE_TASK":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(x.a)(Object(x.a)({},t),e.model):t}))));case"SET_TASK_ENTITY_STATUS":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.todolistId,Object(T.a)(t[e.todolistId].map((function(t){return t.id===e.taskId?Object(x.a)(Object(x.a)({},t),{},{entityTaskStatus:e.status}):t})))));case"SET_TODOLISTS":var n=Object(x.a)({},t);return e.todolists.forEach((function(t){n[t.id]=[]})),n;case"ADD_TODOLIST":return Object(x.a)(Object(x.a)({},t),{},Object(R.a)({},e.todolist.id,[]));case"REMOVE_TODOLIST":var c=Object(x.a)({},t);return delete c[e.id],c;default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(x.a)(Object(x.a)({},t),{},{status:e.status});case"APP/SET-APP-IS-INITIALIZED":return Object(x.a)(Object(x.a)({},t),{},{isInitialized:e.isInitialized});case"APP/SET-ERROR":return Object(x.a)(Object(x.a)({},t),{},{error:e.error});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"AUTH/SET_IS_LOGGED_IN":return Object(x.a)(Object(x.a)({},t),{},{isLoggedIn:e.isLoggedIn});default:return t}}}),At=Object(kt.c)(_t,Object(kt.a)(Et.a));window.store=At;var Ct=n(49);r.a.render(Object(et.jsx)(p.a,{store:At,children:Object(et.jsx)(Ct.a,{children:Object(et.jsx)(vt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},54:function(t,e,n){t.exports={container:"Error404_container__iZOsP",number:"Error404_number__1XLr-",text:"Error404_text__pzOeC",smile:"Error404_smile__2Nthg"}}},[[139,1,2]]]);
//# sourceMappingURL=main.9dc2791e.chunk.js.map