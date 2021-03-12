(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],[,function(e,t,a){e.exports={container:"TodoList_container__jh5k5",title:"TodoList_title__3Wzs4",btnWrapper:"TodoList_btnWrapper__2TgUc",titleBtn:"TodoList_titleBtn__1I_8D",formContainer:"TodoList_formContainer__9Abx5",btn:"TodoList_btn__1e3c4",selected:"TodoList_selected__2TSX6",glowing:"TodoList_glowing__2wdO0",filter:"TodoList_filter__1a1j9"}},,function(e,t,a){e.exports={main:"AddItemForm_main__3aSK9",input:"AddItemForm_input__3jfJJ",addBtn:"AddItemForm_addBtn__14xMj",glowing:"AddItemForm_glowing__iEcxA",error:"AddItemForm_error__5qbYd",errorWrapper:"AddItemForm_errorWrapper__2C1KW",errorMessage:"AddItemForm_errorMessage__dY6zR"}},,function(e,t,a){e.exports={item:"TodoListTask_item__2lF31",label:"TodoListTask_label__7jE84",checkbox:"TodoListTask_checkbox__1h7jy",btnContainer:"TodoListTask_btnContainer__2WNxB",span:"TodoListTask_span__BamPx"}},,,,function(e,t,a){e.exports={input:"EditableSpan_input__12Iyi",text:"EditableSpan_text__F0Qlf",selected:"EditableSpan_selected__1L7KZ"}},,,function(e,t,a){e.exports=a(19)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(11),o=a.n(c),r=(a(17),a(4)),l=a(7),s=a(2),d=(a(18),a(5)),u=a.n(d),m=a(9),f=a.n(m),_=function(e){var t=e.title,a=e.editTitle,c=e.isDone,o=Object(n.useState)(!1),r=Object(s.a)(o,2),l=r[0],d=r[1],u=Object(n.useState)(""),m=Object(s.a)(u,2),_=m[0],b=m[1],p=c?f.a.selected:"";return i.a.createElement(i.a.Fragment,null,l?i.a.createElement("input",{className:f.a.input,autoFocus:!0,value:_,onChange:function(e){b(e.currentTarget.value)},onBlur:function(e){b(e.currentTarget.value),a(_),d(!1)}}):i.a.createElement("span",{onDoubleClick:function(){d(!0)},className:"".concat(f.a.text," ").concat(p)},t))};var b=function(e){return i.a.createElement("div",{key:e.key},i.a.createElement("span",{className:u.a.item},i.a.createElement("label",{className:u.a.label},i.a.createElement("input",{className:u.a.checkbox,type:"checkbox",onChange:function(t){e.changeChecked(e.id,t.currentTarget.checked,e.todolistId)},checked:e.isDone})),i.a.createElement(_,{title:e.title,editTitle:function(t){e.changeTaskTitle(e.todolistId,e.id,t)},isDone:e.isDone}),i.a.createElement("div",{className:u.a.btnContainer},i.a.createElement("button",{className:u.a.span,onClick:function(){e.removeTask(e.id,e.todolistId)}}))))},p=a(1),T=a.n(p),k=a(3),h=a.n(k),v=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)(null),l=Object(s.a)(r,2),d=l[0],u=l[1],m=function(){c.trim()?(e.addItem(c),o("")):(u("Title is required!"),o(""))};return i.a.createElement("div",{className:h.a.main},i.a.createElement("input",{placeholder:e.title,className:"".concat(h.a.input," ").concat(d?h.a.error:""),value:c,onChange:function(e){o(e.currentTarget.value),u(null)},onKeyPress:function(e){"Enter"===e.key&&m()},onBlur:function(){return u("")}}),i.a.createElement("button",{className:h.a.addBtn,onClick:m},"Add"),i.a.createElement("div",{className:h.a.errorWrapper},d&&i.a.createElement("div",{className:h.a.errorMessage},d)))};var g=function(e){return i.a.createElement("div",{className:T.a.container},i.a.createElement("h3",{className:T.a.title},i.a.createElement(_,{title:e.title,editTitle:function(t){e.changeTodolistTitle(e.id,t)}}),i.a.createElement("span",{className:T.a.btnWrapper},i.a.createElement("button",{className:T.a.titleBtn,onClick:function(){e.deleteTodolist(e.id)}}))),i.a.createElement("div",{className:T.a.formContainer},i.a.createElement(v,{title:"Create new task",addItem:function(t){e.addTask(t,e.id)}})),i.a.createElement("div",{className:T.a.filter},i.a.createElement("button",{className:"all"!==e.filter?T.a.selected:T.a.btn,onClick:function(){return e.changeFilter("all",e.id)}},"all"),i.a.createElement("button",{className:"active"!==e.filter?T.a.selected:T.a.btn,onClick:function(){return e.changeFilter("active",e.id)}},"active"),i.a.createElement("button",{className:"completed"!==e.filter?T.a.selected:T.a.btn,onClick:function(){return e.changeFilter("completed",e.id)}},"completed")),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement(b,{key:t.id,id:t.id,todolistId:e.id,title:t.title,isDone:t.isDone,removeTask:e.removeTask,changeChecked:e.changeChecked,changeTaskTitle:e.changeTaskTitle})}))))},E=a(21);var j=function(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)({}),d=Object(s.a)(o,2),u=d[0],m=d[1],f=function(e,t){var a={id:Object(E.a)(),title:e,isDone:!1};u[t]=[a].concat(Object(l.a)(u[t])),m(Object(r.a)({},u))},_=function(e,t){u[t]=u[t].filter((function(t){return t.id!==e})),m(Object(r.a)({},u))},b=function(e,t,a){var n=u[a].find((function(t){return t.id===e}));n&&(n.isDone=t,m(Object(r.a)({},u)))},p=function(e,t){var n=a.find((function(e){return e.id===t}));n&&(n.filter=e),c(Object(l.a)(a))},T=function(e){a=a.filter((function(t){return t.id!==e})),c(a),delete u[e],m(Object(r.a)({},u))},k=function(e,t){var n=a.find((function(t){return t.id===e}));n&&(n.title=t),c(Object(l.a)(a))},h=function(e,t,a){var n=u[e].find((function(e){return e.id===t}));n&&(n.title=a),m(Object(r.a)({},u))};return i.a.createElement("div",{className:"App"},i.a.createElement(v,{title:"Create new todolist",addItem:function(e){var t=Object(E.a)();c([{id:t,title:e,filter:"all"}].concat(Object(l.a)(a))),u[t]=[],m(Object(r.a)({},u))}}),a.map((function(e){var t=u[e.id],a=t;switch(e.filter){case"active":a=t.filter((function(e){return!e.isDone}));break;case"completed":a=t.filter((function(e){return e.isDone}))}return i.a.createElement(g,{key:e.id,id:e.id,title:e.title,tasks:a,filter:e.filter,addTask:f,removeTask:_,changeChecked:b,changeFilter:p,deleteTodolist:T,changeTodolistTitle:k,changeTaskTitle:h})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[12,1,2]]]);
//# sourceMappingURL=main.3bef078b.chunk.js.map