(this["webpackJsonpfanci-chat-client"]=this["webpackJsonpfanci-chat-client"]||[]).push([[0],{10:function(e,t,a){e.exports={Room:"Room_Room__1zXI-",centerInstructions:"Room_centerInstructions__3U8cI",RoomList:"Room_RoomList__F2UT9",RoomHeader:"Room_RoomHeader__14aQ5",messageIsUsers:"Room_messageIsUsers__2HLsG",form:"Room_form__3pPci",opacityZero:"Room_opacityZero__398_O",menuButton:"Room_menuButton__1v-sH",BottomAnchor:"Room_BottomAnchor__3sF71",repeatedUserMessage:"Room_repeatedUserMessage__poVxm",openMenu:"Room_openMenu__2RjSh",popUpMenu:"Room_popUpMenu__23XqC"}},133:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(38),c=a.n(r),l=(a(98),a(6)),s=a(13),i=a(7),m=a(5),u=a(76),d=a.n(u),E=(a(133),a(77)),f=a(78),p=a(92),v=a(90),b=a(15),g=a.n(b),_=a(1);var h=function(e){return o.a.createElement("div",{className:g.a.Nav},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(s.c,{activeClassName:g.a.selected,to:"/home",id:"home",className:g.a.Link},o.a.createElement(_.a,{icon:["fa","home"]}))),o.a.createElement("li",null,o.a.createElement(s.c,{activeClassName:g.a.selected,to:"/profile",id:"profile",className:g.a.Link},o.a.createElement(_.a,{icon:["fa","user-cog"]}))),o.a.createElement("li",null,o.a.createElement(s.c,{activeClassName:g.a.selected,to:"/rooms",id:"rooms",className:g.a.Link},o.a.createElement(_.a,{icon:["fa","comments"]})))),o.a.createElement("div",{className:g.a.themeToggle,title:"Toggles between Light and Dark mode",onClick:function(t){var a=t.currentTarget;a.classList.contains(g.a.themeToggleAnimation)?a.classList.remove(g.a.themeToggleAnimation):a.classList.add(g.a.themeToggleAnimation),e.toggleTheme()}},o.a.createElement(_.a,{icon:["fa","moon"]})))},R=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(){return Object(E.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(h,{click:this.props.click,toggleTheme:this.props.toggleTheme}),o.a.createElement("main",null,this.props.children))}}]),a}(n.Component),k=a(79),N=a.n(k),S=(a(73),Object(m.b)((function(e){return{connectRoom:e.room}}))((function(e){var t=null;return e.connectRoom&&e.connectRoom.roomID===e.room.roomID&&(t="card-selected"),o.a.createElement("li",{title:"Click to join ".concat(e.room.roomName),className:"card ".concat(t," ").concat(N.a.RoomCard),id:e.room.roomID,key:e.room.roomID,onClick:e.clicked},o.a.createElement("div",{className:"card-online-status"}),o.a.createElement(_.a,{icon:e.room.icon}),o.a.createElement("div",{className:"card-info"},o.a.createElement("h3",null,e.room.roomName),o.a.createElement("p",null,e.room.numberOnline," Online")),e.room.private?o.a.createElement(_.a,{icon:"lock"}):null,e.room.hasSheild?o.a.createElement(_.a,{icon:"shield-alt"}):null)}))),O=a(16),y=a.n(O),C=(a(37),a(74),a(49),a(50),a(80)),I=a.n(C);var j=Object(m.b)((function(e){return{rooms:e.rooms,socket:e.socket,room:e.room}}))((function(e){var t=Object(n.useState)(null),a=Object(l.a)(t,2),r=a[0],c=a[1],s=null,i=null;e.rooms&&(s=e.rooms.filter((function(e){return!1===e.private})),i=e.rooms.filter((function(e){return!0===e.private})));var m=null,u=null;function d(t){e.room?e.room.roomID!==t.roomID&&(e.socket.emit("leaveRoom",null),t.private?e.joinRoomHandler(null,!0,t):e.socket.emit("joinRoom",t.roomID)):e.room||(t.private?e.joinRoomHandler(null,!0,t):e.socket.emit("joinRoom",t.roomID))}s&&0!==s.length&&(m=(s=s.filter((function(e){var t=e.roomName.toLowerCase().replace(/\s+/g,""),a=null;return null!=r&&(a=r.toLowerCase().replace(/\s+/g,"")),!(null!=r&&!t.includes(a))}))).map((function(e){return o.a.createElement(S,{room:e,clicked:function(){d(e)},key:e.roomID})}))),(null===m||m.length<1)&&(m=o.a.createElement("p",{className:y.a.noRoomInfo},"No Public Rooms Available")),i&&0!==i.length&&(u=(i=i.filter((function(e){var t=e.roomName.toLowerCase().replace(/\s+/g,""),a=null;return null!=r&&(a=r.toLowerCase().replace(/\s+/g,"")),!(null!=r&&!t.includes(a))}))).map((function(e){return o.a.createElement(S,{room:e,clicked:function(){d(e)},key:e.roomID})}))),(null===u||u.length<1)&&(u=o.a.createElement("p",{className:y.a.noRoomInfo},"No Private Rooms Available"));var E=o.a.createElement("p",{className:y.a.privateInfoMsg},o.a.createElement(_.a,{icon:"key"}),"Private rooms need passwords to enter");return o.a.createElement("div",{className:y.a.RoomNav},o.a.createElement("div",{className:"header"},o.a.createElement("h1",null,"Chat Rooms"),o.a.createElement("button",{className:y.a.addButton,onClick:e.createRoomHandler}," ","Create Room ",o.a.createElement("img",{src:I.a,alt:"+"})," ")),o.a.createElement("div",{className:y.a.roomType},o.a.createElement("button",{onClick:function(){return e.toggleSections("public")},className:"".concat(e.isSectionPublic?"buttonActive":null," button")},o.a.createElement(_.a,{icon:"users"})," Public"),o.a.createElement("button",{onClick:function(){return e.toggleSections("private")},className:"".concat(e.isSectionPublic?null:"buttonActive"," button")},o.a.createElement(_.a,{icon:"lock"})," Private")),o.a.createElement("div",{className:y.a.roomsList},o.a.createElement("div",{className:y.a.searchBar},o.a.createElement("label",{htmlFor:"Search"},o.a.createElement(_.a,{icon:"search"})),o.a.createElement("input",{placeholder:"Search..",type:"text",name:"search",value:r||"",autoComplete:"off",onChange:function(e){var t=e.currentTarget.value;""===t&&(t=null),c(t)}}),o.a.createElement("p",{className:null!=r&&""!=r?y.a.searchBarTyping:null,onClick:function(){return c("")}},o.a.createElement(_.a,{icon:"times"}))),e.isSectionPublic?null:E,o.a.createElement("ul",{className:y.a.roomsListElement},e.isSectionPublic?m:u),o.a.createElement("div",{onClick:function(){e.socket.emit("getRooms",null)},className:y.a.ReloadIcon,title:"Update Rooms"},o.a.createElement(_.a,{icon:"sync"}))),o.a.createElement("div",{className:"infoBottom"},o.a.createElement(_.a,{icon:"shield-alt"}),o.a.createElement("p",null,"Rooms marked with this symbol are static and will never disappear")))})),M=a(10),T=a.n(M),U=function(e){return o.a.createElement("li",{className:e.isUser?T.a.messageIsUsers:""},o.a.createElement("div",{onMouseOut:e.hideTime?null:function(e){e.currentTarget.parentNode.lastChild.className=""},onMouseOver:e.hideTime?null:function(e){e.currentTarget.parentNode.lastChild.className=T.a.opacityZero},className:e.hideTime?T.a.repeatedUserMessage:null},o.a.createElement("p",null,e.hideUsername?null:e.user),o.a.createElement("p",null,e.message)),o.a.createElement("p",null,e.hideTime?null:e.time))},w=(a(137),a(138),a(81)),A=a.n(w),P=a(54),D=a.n(P),L=function(e){return o.a.createElement(o.a.Fragment,null,e.children,o.a.createElement("div",{className:"".concat(D.a.Backdrop," ").concat(e.isTransparent?D.a.transparent:null),onClick:e.click}))};var x=Object(m.b)((function(e){return{room:e.room,msgs:e.messages,socket:e.socket}}))((function(e){var t=Object(n.useState)(!1),a=Object(l.a)(t,2),r=a[0],c=a[1],s=[];e.msgs.forEach((function(t,a){var n=!1,r=e.msgs[a-1],c=e.msgs[a-2];if(a-1>-1&&r.user===t.user&&null!=r.user){n=!0,s.pop();var l=!1;a-2>-1&&c.user===r.user&&null!=c.user&&(l=!0),s.push(o.a.createElement(U,{user:r.user,message:r.message,time:r.time,isUser:r.isUser,key:r.key,hideUsername:l,hideTime:!0}))}s.push(o.a.createElement(U,{user:t.user,message:t.message,time:t.time,isUser:t.isUser,key:t.key,hideUsername:n,hideTime:!1}))}));var i=o.a.createElement("h2",{className:T.a.centerInstructions},"Please select a room to join"),m=Object(n.useRef)(null),u=function(e){console.log(i);var t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)};Object(n.useEffect)((function(){e.room&&d(E)}));var d=function(e){return e.current.scrollIntoView({behavior:"smooth"})},E=Object(n.useRef)(null);return e.room&&(i=o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:T.a.RoomHeader},o.a.createElement(_.a,{icon:e.room.icon}),o.a.createElement("h1",null,e.room.roomName),o.a.createElement("div",{onClick:function(e){c(!0),m.current.style.top=e.pageY+"px",m.current.style.left=e.pageX+"px"},className:T.a.menuButton},o.a.createElement("button",{className:"menuIcon"}))),o.a.createElement("ul",{className:T.a.RoomList},s,o.a.createElement("li",{ref:E,className:T.a.BottomAnchor})),o.a.createElement("div",null,o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var a=t.currentTarget[0].value;""!==a.trim(" ")&&(t.currentTarget[0].value="",e.socket.emit("sendMessage",a))},className:T.a.form},o.a.createElement("input",{type:"text",placeholder:"Type a message here..."}),o.a.createElement("button",{type:"submit"},o.a.createElement("img",{src:A.a,alt:"Send"})))))),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:T.a.Room},i),o.a.createElement("div",{className:"".concat(r?null:T.a.openMenu," ").concat(T.a.popUpMenu)},o.a.createElement(L,{click:function(){return c(!1)},isTransparent:!0},o.a.createElement("ul",{className:"menuPopUp",ref:m},o.a.createElement("li",null,o.a.createElement("div",{onClick:function(){e.socket.emit("leaveRoom",null),c(!1)}},o.a.createElement(_.a,{icon:"sign-out-alt"}),o.a.createElement("p",null,"Leave Room"))),e.room&&e.room.private?o.a.createElement("li",null,o.a.createElement("div",{onClick:function(){return u(e.room.password)}},o.a.createElement(_.a,{icon:"key"}),o.a.createElement("p",null,"Copy Password"))):null,o.a.createElement("li",null,o.a.createElement("div",{onClick:function(){return u(e.room.roomName)}},o.a.createElement(_.a,{icon:"copy"}),o.a.createElement("p",null,"Copy Room Name")))))))})),B=a(82),H=a.n(B),G=a(83),F=a.n(G);var J=function(e){return o.a.createElement("li",{className:"card"},o.a.createElement("div",{className:"card-online-status"}),o.a.createElement(_.a,{icon:e.icon}),o.a.createElement("div",{className:"card-info"},o.a.createElement("h3",null,e.name)),e.inSameRoom?o.a.createElement(_.a,{className:F.a.inRoom,icon:e.inSameRoom}):null)};var q=Object(m.b)((function(e){return{name:e.name,icon:e.icon,room:e.room,users:e.users}}))((function(e){var t=e.users.map((function(t){var a=!1;return null!=t.room&&null!=e.room&&t.room.roomID===e.room.roomID&&(a=!0),o.a.createElement(J,{icon:t.icon||"user-circle",name:t.name||"Guest",inSameRoom:a?"door-open":null,key:Math.random()})}));return o.a.createElement(o.a.Fragment,null,t)}));var W=Object(m.b)((function(e){return{hiddenUsers:e.hiddenUsers}}))((function(e){return o.a.createElement("div",{className:H.a.OnlineList},o.a.createElement("div",{className:"header"},o.a.createElement("h1",null,"Users Online")),o.a.createElement("ul",null,o.a.createElement(q,null)),o.a.createElement("div",{className:"infoBottom"},o.a.createElement(_.a,{icon:"user-secret"}),o.a.createElement("p",null,"Other Hidden Online Users: ",o.a.createElement("span",null,e.hiddenUsers))))})),V=a(55),X=a.n(V),Z=["users","coffee","couch","code","gamepad","icons","chess-rook","book","star","biohazard"],K=function(e){var t=Z.map((function(t){return o.a.createElement("div",{className:e.isSelected===t?X.a.RoomIconListActive:null,onClick:function(){return e.select(t)},key:t},o.a.createElement(_.a,{icon:t}))}));return o.a.createElement("div",{className:X.a.RoomIconList},t)},Y=a(21),z=a.n(Y),Q=Object(m.b)((function(e){return{socket:e.socket}}))((function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(""),i=Object(l.a)(s,2),m=i[0],u=i[1],d=Object(n.useState)(!1),E=Object(l.a)(d,2),f=E[0],p=E[1],v=Object(n.useState)("users"),b=Object(l.a)(v,2),g=b[0],h=b[1],R=Object(n.useRef)(null);function k(e,t){e.preventDefault(),p(t),R.current.disabled=!t}return o.a.createElement(L,{click:e.createRoomHandler},o.a.createElement("div",{className:z.a.CreateRoom},o.a.createElement("button",{className:z.a.ClosePopup,onClick:function(t){return e.createRoomHandler(t,!1)}},o.a.createElement(_.a,{icon:"times"})),o.a.createElement("div",{className:z.a.CreateRoomInfo},o.a.createElement("h2",null,"Create Room"),o.a.createElement(_.a,{icon:"door-open"}),o.a.createElement("p",null,"Room is not permanent, it will delete after you leave it. Users can join public rooms and they are visible to the public. Private rooms are visible to the public but need a password to enter.")),o.a.createElement("form",{className:z.a.CreateRoomInput},o.a.createElement("div",{className:z.a.controls},o.a.createElement("div",null,o.a.createElement("h4",null,"Room Type:"),o.a.createElement("h4",null,"Room Name:"),o.a.createElement("h4",{className:f?null:z.a.disabledText},"Room Password:")),o.a.createElement("div",null,o.a.createElement("div",{className:z.a.buttons},o.a.createElement("button",{className:"button ".concat(f?null:"buttonActive"),onClick:function(e){return k(e,!1)}},"Public"),o.a.createElement("button",{className:"button ".concat(f?"buttonActive":null),onClick:function(e){return k(e,!0)}},"Private")),o.a.createElement("input",{type:"text",placeholder:"Type a room name here...",onChange:function(e){var t=e.currentTarget.value;c(t.substr(0,18))},value:r}),o.a.createElement("input",{type:"text",placeholder:"Type password here...",onChange:function(e){var t=e.currentTarget.value;u(t.substr(0,18))},ref:R,disabled:!0,value:m}))),o.a.createElement(K,{select:function(e){h(e)},isSelected:g}),o.a.createElement("div",{className:z.a.createRoom},o.a.createElement("button",{className:"button cancelButton",onClick:function(t){return e.createRoomHandler(t,!1)}},"Cancel"),o.a.createElement("button",{className:"button",type:"submit",onClick:function(t){t.preventDefault();var a={icon:g,roomName:r,private:f};e.socket.emit("createRoom",a,m),e.createRoomHandler(t,!1)}},"Create Room")))))})),$=a(84),ee=a.n($),te=a(85),ae=a.n(te),ne=function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),r=a[0],c=a[1];return o.a.createElement(L,{click:e.joinRoomHandler},o.a.createElement("form",{className:ae.a.JoiningRoom},o.a.createElement("div",null,o.a.createElement("h2",null,"Joining Private Room"),o.a.createElement("h3",null,e.roomName)),o.a.createElement("div",null,o.a.createElement("label",null,"Room Password:"),o.a.createElement("input",{type:"text",placeholder:"Type password here...",value:r,onChange:function(e){var t=e.currentTarget.value;c(t.substr(0,18))}})),o.a.createElement("div",null,o.a.createElement("button",{className:"button cancelButton",onClick:e.joinRoomHandler},"Cancel"),o.a.createElement("button",{className:"button",onClick:function(t){return e.click(t,r)},type:"submit"},"Join"))))};var oe=Object(m.b)((function(e){return{socket:e.socket,room:e.room}}))((function(e){var t=Object(n.useState)(!1),a=Object(l.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(!1),i=Object(l.a)(s,2),m=i[0],u=i[1],d=Object(n.useState)(null),E=Object(l.a)(d,2),f=E[0],p=E[1],v=Object(n.useState)(!0)||null,b=Object(l.a)(v,2),g=b[0],_=b[1];function h(e,t){e.preventDefault(),c(t||!r)}function R(e,t,a){e&&e.preventDefault(),u(t||!m),a&&p(a)}return Object(n.useEffect)((function(){e.socket&&e.socket.on("successfulJoinPrivateRoom",(function(){u(!1)}))}),[e.socket]),Object(n.useEffect)((function(){e.room&&(!0===e.room.private&&g?_(!1):!1!==e.room.private||g||_(!0))}),[e.room]),o.a.createElement("div",{className:ee.a.Rooms},r?o.a.createElement(Q,{createRoomHandler:h}):null,m?o.a.createElement(ne,{joinRoomHandler:R,click:function(t,a){t.preventDefault(),e.socket.emit("joinRoom",f.roomID,a)},roomName:f.roomName}):null,o.a.createElement(j,{createRoomHandler:h,joinRoomHandler:R,toggleSections:function(e){_("public"===e?function(){return!0}:function(){return!1})},isSectionPublic:g}),o.a.createElement(x,null),o.a.createElement(W,null))})),re=a(25),ce=a.n(re),le=a(86),se=a.n(le);var ie=function(){return o.a.createElement("div",{className:ce.a.About},o.a.createElement("div",{className:ce.a.section},o.a.createElement("div",{className:ce.a.info},o.a.createElement("h2",null,"Our Platform"),o.a.createElement("p",null,"A messaging platform that doesn\u2019t store any messages.  Securely chat with your friends using our platform. "),o.a.createElement("p",null,"Join Public rooms where you can meet new people or talk privately with a few friends in our private rooms.  Private rooms are created with a key and an ID. To join a private room you will need to get the key from someone in a private message."),o.a.createElement("p",null,"Our site uses cookies to store you name so when you come back your name will be the same as you left it.  Your name will be temporally stored on the Server until you disconnect.  We store your name to allow other users to view who is currently online.   "))),o.a.createElement("div",{className:ce.a.section},o.a.createElement("img",{src:se.a,alt:"Send",draggable:!1}),o.a.createElement("h1",null,"Nate Grift"),o.a.createElement("div",{className:ce.a.links},o.a.createElement("a",{href:"https://github.com/nategrift/"},o.a.createElement(_.a,{icon:["fab","github"]})),o.a.createElement("a",{href:"https://www.instagram.com/nategrift/"},o.a.createElement(_.a,{icon:["fab","instagram"]})),o.a.createElement("a",{href:"https://www.nategrift.com/"},o.a.createElement(_.a,{icon:["fa","globe-americas"]}))),o.a.createElement("p",null,"Hello, I created Fanci Chat to test my skills with web development.  The entire website was designed, coded, and created by me.  I created this website as a messaging application that wouldn\u2019t save any messages to any databases.  Everything you send is passed through server but we don\u2019t collect any information about your messages.  We only keep track of accounts for displaying users.  Thank you so much for checking out this chat program. ")),o.a.createElement(s.b,{to:"/home",className:"subButton"},"Home"))},me=a(87),ue=a.n(me),de=a(88),Ee=a.n(de);var fe=function(e){return o.a.createElement("div",{className:ue.a.HomeInfo},o.a.createElement("h3",null,"Welcome to"),o.a.createElement("h1",null,"Fanci Chat"),o.a.createElement("img",{src:Ee.a,alt:"Send",draggable:!1}),o.a.createElement("p",null,"A messaging platform that doesn\u2019t store any messages. Securely chat with your friends"),o.a.createElement(s.b,{to:"/rooms"},"Start Messaging"),o.a.createElement(s.b,{to:"home/about",className:"subButton"},"About Us"))};var pe=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.d,null,o.a.createElement(i.b,{path:e.match.url+"/about",exact:!0,component:ie}),o.a.createElement(i.b,{path:"/",component:fe})))},ve=a(56),be=a.n(ve);var ge=function(e){var t=["user-circle","user-secret","user-astronaut","user-graduate","user-ninja","user-tie","angry","frown","meh","poo"].map((function(t){return o.a.createElement("button",{onClick:e.click,key:t,id:t,className:"".concat(e.icon===t?be.a.active:null," ").concat(be.a.Icon," button")},o.a.createElement(_.a,{icon:t}))}));return o.a.createElement(o.a.Fragment,null,t)},_e=a(30),he=a.n(_e);var Re=Object(m.b)((function(e){return{name:e.name,icon:e.icon,visable:e.visable}}))((function(e){var t,a=localStorage.getItem("visable")||!0;t="true"===a||!0===a;var r=localStorage.getItem("name")||"Guest",c=localStorage.getItem("icon")||"user-circle",s=t,i=Object(n.useState)(r),m=Object(l.a)(i,2),u=m[0],d=m[1],E=Object(n.useState)(c),f=Object(l.a)(E,2),p=f[0],v=f[1],b=Object(n.useState)(!1),g=Object(l.a)(b,2),_=g[0],h=g[1],R=Object(n.useState)(s),k=Object(l.a)(R,2),N=k[0],S=k[1];function O(e){var t;t="true"===e.currentTarget.id,S(t),y(u,p,t)}function y(t,a,n){t===e.name&&a===e.icon&&n===e.visable?h(!1):h(!0)}return o.a.createElement("div",{className:he.a.Profile},o.a.createElement("div",{className:he.a.editProfile},o.a.createElement("div",{className:"header"},o.a.createElement("h1",null,"Edit Profile")),o.a.createElement("section",null,o.a.createElement("h2",null,"Edit name:"),o.a.createElement("input",{onChange:function(e){var t=e.currentTarget.value.substr(0,18);d(t),y(t,p,N)},value:u,type:"text"}),o.a.createElement("p",null,"Our site uses cookies to store you name so when you come back your name will be the same as you left it.  Your name will be temporally stored on the Server until you disconnect.  We store your name to allow other users to view who is currently online.   ")),o.a.createElement("section",null,o.a.createElement("h2",null,"Profile visable to other users:"),o.a.createElement("div",null,o.a.createElement("button",{onClick:O,id:"true",className:"".concat(N?"buttonActive":null," button")},"Visable"),o.a.createElement("button",{onClick:O,id:"false",className:"".concat(N?null:"buttonActive"," button")},"Hidden")),o.a.createElement("p",null,"If this is turned to Hidden your account name will not be visible in side panel however in the bottom it will display the number of hidden active users.")),o.a.createElement("section",null,o.a.createElement("h2",null,"Update your Icon:"),o.a.createElement("div",{className:he.a.Icons},o.a.createElement(ge,{click:function(e){v(e.currentTarget.id),y(u,e.currentTarget.id,N)},icon:p}))),o.a.createElement("section",null,_?o.a.createElement("button",{className:"button ".concat(he.a.buttonOpacity),onClick:function(){e.clicked(u,p,N),h(!1)}},"Save"):null)),o.a.createElement(W,null))})),ke=a(89),Ne=a.n(ke),Se=a(31),Oe=a.n(Se),ye=Object(m.b)(null,(function(e){return{removeStatusMessage:function(t){return e({type:"REMOVE_STATE_MESSAGE",statusMessage:t})}}}))((function(e){var t=null;switch(e.msg.status){case"ERROR":t=Oe.a.error;break;case"SUCCESS":t=Oe.a.success;break;default:t=Oe.a.update}return Object(n.useEffect)((function(){var t=setTimeout((function(){e.removeStatusMessage(e.msg)}),4e3);return function(){clearInterval(t)}}),[]),o.a.createElement("div",{onClick:function(){e.removeStatusMessage(e.msg)},className:"".concat(Oe.a.StatusMessage," ").concat(t)},o.a.createElement(_.a,{icon:e.msg.icon}),o.a.createElement("div",null,o.a.createElement("p",null,e.msg.title),o.a.createElement("p",null,e.msg.desc)))})),Ce=Object(m.b)((function(e){return{statusMessages:e.statusMessages}}))((function(e){return o.a.createElement("div",{className:Ne.a.StatusMessages},e.statusMessages?o.a.createElement(ye,{msg:e.statusMessages,key:Math.random()}):null)}));var Ie=Object(m.b)((function(e){return{socket:e.socket,name:e.name,icon:e.icon,visable:e.visable}}),(function(e){return{updateSocket:function(t){return e({type:"UPDATE_SOCKET",socket:t})},updateUsers:function(t,a){return e({type:"UPDATE_USERS",users:t,hiddenUsers:a})},updateCurrentUser:function(t,a,n){return e({type:"UPDATE_CURRENT_USER",name:t,icon:a,visable:n})},updateRooms:function(t){return e({type:"UPDATE_ROOMS",rooms:t})},updateCurrentRoom:function(t){return e({type:"UPDATE_CURRENT_ROOM",room:t})},addMessage:function(t){return e({type:"ADD_MESSAGE",message:t})},clearMessages:function(){return e({type:"CLEAR_MESSAGES"})},leaveRoom:function(){return e({type:"LEAVE_ROOM"})},addStatusMessage:function(t){return e({type:"ADD_STATUS_MESSAGE",statusMessage:t})}}}))((function(e){var t=Object(n.useState)(localStorage.getItem("theme")||"dark"),a=Object(l.a)(t,2),r=a[0],c=a[1];function m(t,a,n){var o={name:t,icon:a,visable:n};e.socket.emit("updateUser",o)}return Object(n.useEffect)((function(){var t=d()("/fanci");e.updateSocket(t),t.on("connect",(function(){var a=localStorage.getItem("UniqueSessionID")||null,n={name:e.name,icon:e.icon,visable:e.visable,UniqueSessionID:a};t.emit("createUser",n),t.emit("getRooms",null)})),t.on("statusMsg",(function(t){e.addStatusMessage(t)})),t.on("connect_failed",(function(){e.addStatusMessage({title:"Connection Error",desc:"Unable to connect to server",icon:"times",status:"ERROR"})})),t.on("disconnect",(function(){e.updateCurrentRoom(null),e.addStatusMessage({title:"Disconected from server",desc:"Reconnecting to server...",icon:"bell",status:"UPDATE"})})),t.on("reconnect_failed",(function(){e.addStatusMessage({title:"Connection Failed",desc:"Please try again later",icon:"times",status:"ERROR"})})),t.on("updateUsers",(function(t,a){e.updateUsers(t,a)})),t.on("updateUserState",(function(t){localStorage.setItem("name",t.name),localStorage.setItem("icon",t.icon),localStorage.setItem("visable",t.visable),e.updateCurrentUser(t.name,t.icon,t.visable)})),t.on("updateRooms",(function(t){e.updateRooms(t)})),t.on("joinedRoom",(function(t){e.updateCurrentRoom(t)})),t.on("receiveMessage",(function(t){e.addMessage(t)})),t.on("leftRoom",(function(){e.leaveRoom(),e.clearMessages(),t.emit("getRooms",null)})),t.on("setUniqueSessionID",(function(e){localStorage.setItem("UniqueSessionID",e)}));var a=setInterval((function(){t.emit("getRooms",null)}),5e3);return function(){t.disconnect(),a.clearInterval()}}),[]),o.a.createElement(s.a,null,o.a.createElement("div",{className:"".concat(r)},o.a.createElement(R,{toggleTheme:function(){"light"===r?(c("dark"),localStorage.setItem("theme","dark")):(c("light"),localStorage.setItem("theme","light"))}},o.a.createElement(Ce,null),o.a.createElement(i.d,null,o.a.createElement(i.b,{path:"/rooms",component:oe}),o.a.createElement(i.b,{path:"/profile",exact:!0,render:function(){return o.a.createElement(Re,{clicked:m})}}),o.a.createElement(i.b,{path:"/home",component:pe}),o.a.createElement(i.a,{from:"/",to:"/home"})))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var je,Me=a(41),Te=a(91),Ue=a(8),we=localStorage.getItem("visable")||!0;je="true"===we||!0===we;var Ae={socket:null,name:localStorage.getItem("name")||"Guest",icon:localStorage.getItem("icon")||"user-circle",visable:je,room:null,users:[],hiddenUsers:0,rooms:null,messages:[],statusMessages:null},Pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SOCKET":return Object(Ue.a)(Object(Ue.a)({},e),{},{socket:t.socket});case"UPDATE_USERS":var a=t.users;return Object(Ue.a)(Object(Ue.a)({},e),{},{users:a,hiddenUsers:t.hiddenUsers});case"UPDATE_CURRENT_USER":return Object(Ue.a)(Object(Ue.a)({},e),{},{name:t.name,icon:t.icon,visable:t.visable});case"UPDATE_ROOMS":return Object(Ue.a)(Object(Ue.a)({},e),{},{rooms:t.rooms});case"UPDATE_CURRENT_ROOM":return Object(Ue.a)(Object(Ue.a)({},e),{},{room:t.room});case"ADD_MESSAGE":var n=Object(Te.a)(e.messages);return n.push(t.message),Object(Ue.a)(Object(Ue.a)({},e),{},{messages:n});case"LEAVE_ROOM":return Object(Ue.a)(Object(Ue.a)({},e),{},{room:null});case"CLEAR_MESSAGES":var o=[];return Object(Ue.a)(Object(Ue.a)({},e),{},{messages:o});case"ADD_STATUS_MESSAGE":return Object(Ue.a)(Object(Ue.a)({},e),{},{statusMessages:t.statusMessage});case"REMOVE_STATE_MESSAGE":return Object(Ue.a)(Object(Ue.a)({},e),{},{statusMessages:null});default:return e}},De=a(29),Le=a(2),xe=a(57);De.b.add(Le.q,Le.i,Le.F,Le.v,Le.K,Le.t,Le.y,Le.r,Le.o,Le.d,Le.z,xe.a,xe.b,Le.p,Le.E,Le.I,Le.D,Le.G,Le.H,Le.a,Le.J,Le.u,Le.w,Le.n,Le.B,Le.m,Le.e,Le.b,Le.C,Le.s,Le.h,Le.k,Le.g,Le.f,Le.A,Le.c,Le.l,Le.x,Le.j);var Be=Object(Me.b)(Pe);c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(m.a,{store:Be},o.a.createElement(Ie,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},15:function(e,t,a){e.exports={Nav:"MainNav_Nav___C55w",selected:"MainNav_selected__3uRxe",Link:"MainNav_Link__2v1Wd",themeToggle:"MainNav_themeToggle__2pH9z",themeToggleAnimation:"MainNav_themeToggleAnimation__2sowT"}},16:function(e,t,a){e.exports={RoomNav:"RoomNav_RoomNav__29SLZ",roomType:"RoomNav_roomType__CYwLM",roomsList:"RoomNav_roomsList__1MGsJ",roomsListElement:"RoomNav_roomsListElement__1iaxU",ReloadIcon:"RoomNav_ReloadIcon__2gPeX",privateInfoMsg:"RoomNav_privateInfoMsg__2GjOd",addButton:"RoomNav_addButton__PvZXb",noRoomInfo:"RoomNav_noRoomInfo__1Wr1l",searchBar:"RoomNav_searchBar__14_gW",searchBarTyping:"RoomNav_searchBarTyping__253dS"}},21:function(e,t,a){e.exports={CreateRoom:"CreateRoom_CreateRoom__CzX-a",animateIn:"CreateRoom_animateIn__12OwB",CreateRoomInfo:"CreateRoom_CreateRoomInfo__3CRPM",CreateRoomInput:"CreateRoom_CreateRoomInput__3Uns0",controls:"CreateRoom_controls__1RxTm",disabledText:"CreateRoom_disabledText__vPe3F",createRoom:"CreateRoom_createRoom__voavj",buttons:"CreateRoom_buttons__3bfCZ",ClosePopup:"CreateRoom_ClosePopup__5TFGh"}},25:function(e,t,a){e.exports={About:"About_About__2o60y",section:"About_section__EmVLQ",info:"About_info__1ly3E",links:"About_links__381Rr"}},30:function(e,t,a){e.exports={Profile:"Profile_Profile__2vSJb",editProfile:"Profile_editProfile__3Kuke",buttonOpacity:"Profile_buttonOpacity__sZ-xU",opacity:"Profile_opacity__2BOMH"}},31:function(e,t,a){e.exports={StatusMessage:"StatusMessage_StatusMessage__VHDTl",animateInandOut:"StatusMessage_animateInandOut__1ynrM",ActiveMessage:"StatusMessage_ActiveMessage__3URUf",error:"StatusMessage_error__2SQIu",update:"StatusMessage_update__2pBJR",success:"StatusMessage_success__1yBwQ"}},37:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},54:function(e,t,a){e.exports={Backdrop:"Backdrop_Backdrop__2O1l9",animateIn:"Backdrop_animateIn__1H1oq",transparent:"Backdrop_transparent__-kJYh"}},55:function(e,t,a){e.exports={RoomIconList:"RoomIconList_RoomIconList__3dIqq",RoomIconListActive:"RoomIconList_RoomIconListActive__33d_Y"}},56:function(e,t,a){e.exports={Icon:"IconList_Icon__2s6U-",active:"IconList_active__2XwhP"}},73:function(e,t,a){},74:function(e,t,a){},79:function(e,t,a){e.exports={RoomCard:"RoomCard_RoomCard__3T7y2"}},80:function(e,t,a){e.exports=a.p+"static/media/add-icon.7decaf06.svg"},81:function(e,t,a){e.exports=a.p+"static/media/send-icon.313f1b71.svg"},82:function(e,t,a){e.exports={OnlineList:"OnlineList_OnlineList__1Fn-3"}},83:function(e,t,a){e.exports={inRoom:"OnlineCard_inRoom__3HHIc"}},84:function(e,t,a){e.exports={Rooms:"Rooms_Rooms__2KIGJ"}},85:function(e,t,a){e.exports={JoiningRoom:"JoiningRoom_JoiningRoom__hql7K",animateIn:"JoiningRoom_animateIn__1BLOr"}},86:function(e,t,a){e.exports=a.p+"static/media/nate-profile.180800f1.png"},87:function(e,t,a){e.exports={HomeInfo:"HomeInfo_HomeInfo__33g8W"}},88:function(e,t,a){e.exports=a.p+"static/media/home-graphic.b7674fa1.png"},89:function(e,t,a){e.exports={StatusMessages:"StatusMessages_StatusMessages__3XZI3"}},93:function(e,t,a){e.exports=a(139)},98:function(e,t,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.859a50ae.chunk.js.map