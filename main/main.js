module.exports=function(e){var o={};function t(n){if(o[n])return o[n].exports;var s=o[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)t.d(n,s,function(o){return e[o]}.bind(null,s));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="/",t(t.s=1)}([function(e,o){e.exports=require("express")},function(e,o,t){e.exports=t(2)},function(e,o,t){console.log("Gateway is running"),t(3),t(6),new(t(17))},function(e,o,t){const n=t(4).execSync,s=t(5);let r=0,i=500,c=!0;n("echo 6 > /sys/class/gpio/export"),n("echo out > /sys/class/gpio/gpio6/direction"),n("echo 7 > /sys/class/gpio/export"),n("echo in > /sys/class/gpio/gpio7/direction"),async function(){for(;;)n("echo 1 > /sys/class/gpio/gpio6/value"),await s.delay(i),n("echo 0 > /sys/class/gpio/gpio6/value"),await s.delay(i)}(),async function(e){for(;c;){let e=n("cat /sys/class/gpio/gpio7/value");await s.delay(1e3),"0"==String.fromCharCode(e[0])?r++:r=0,r>=5?(i=50,c=!1,setTimeout(()=>{n("echo 0 > /sys/class/gpio/gpio6/value"),n("reboot")},3e3)):i=500}}()},function(e,o){e.exports=require("child_process")},function(e,o){e.exports=require("bluebird")},function(e,o,t){const n=t(0),s=t(7),r=t(8),i=t(9),c=t(10),u=t(11),a=t(12),l=t(13),p=n();p.use(s()),p.use(r()),p.use(i.json()),p.use("/",n.static("../web")),p.get("/state",(e,o)=>{o.json({state:"ok"})}),p.get("/date",(e,o)=>{o.json({date:(new Date).toISOString()})}),p.use("/config",c),p.use("/devices",u),p.use("/nets",a),p.use("/access",l);let f=8e3;f=80,p.listen(f,function(){console.log("WebServer is running on port",f)}),e.exports=p},function(e,o){e.exports=require("compression")},function(e,o){e.exports=require("cors")},function(e,o){e.exports=require("body-parser")},function(e,o,t){var n=t(0).Router();n.get("/",(e,o)=>{o.json({config:"config"})}),e.exports=n},function(e,o,t){var n=t(0).Router();n.get("/",(e,o)=>{o.json({a:1})}),e.exports=n},function(e,o,t){var n=t(0).Router();n.get("/",(e,o)=>{o.json({b:1})}),n.post("/eth0",(e,o)=>{o.end()}),n.post("/wlan0",(e,o)=>{o.end()}),n.post("/ppp0",(e,o)=>{o.end()}),e.exports=n},function(e,o,t){var n=t(0).Router(),s=t(14);n.get("/",(e,o)=>{o.json(s.get("access").value())}),n.post("/",(e,o)=>{var t=Object.assign({},s.get("access").value(),e.body);s.set("access",t).write(),o.json(s.get("access").value())}),e.exports=n},function(e,o,t){let n=null;const s=t(15)(n=new(t(16))("/etc/gateway.conf"));s.defaults({serverState:"offline",access:{}}).write(),e.exports=s},function(e,o){e.exports=require("lowdb")},function(e,o){e.exports=require("lowdb/adapters/FileSync")},function(e,o){e.exports=class{constructor(){console.log("Agent is running")}}}]);