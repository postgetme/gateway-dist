module.exports=function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=1)}([function(e,t){e.exports=require("express")},function(e,t,o){e.exports=o(2)},function(e,t,o){console.log("Gateway is running"),o(3),o(6),new(o(17))},function(e,t,o){const n=o(4).execSync,r=o(5);let s=0,c=500,i=!0;!function(){try{n("echo 6 > /sys/class/gpio/export"),n("echo out > /sys/class/gpio/gpio6/direction")}catch(e){}try{n("echo 7 > /sys/class/gpio/export"),n("echo in > /sys/class/gpio/gpio7/direction")}catch(e){}}(),async function(){for(;;)n("echo 1 > /sys/class/gpio/gpio6/value"),await r.delay(c),n("echo 0 > /sys/class/gpio/gpio6/value"),await r.delay(c)}(),async function(e){for(;i;){let e=n("cat /sys/class/gpio/gpio7/value");await r.delay(1e3),"0"==String.fromCharCode(e[0])?s++:s=0,s>=5?(c=50,i=!1,setTimeout(()=>{n("echo 0 > /sys/class/gpio/gpio6/value"),n("reboot")},2e3)):c=500}}()},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("bluebird")},function(e,t,o){const n=o(0),r=o(7),s=o(8),c=o(9),i=o(10),u=o(11),a=o(12),l=o(13),p=n();p.use(r()),p.use(s()),p.use(c.json()),p.use("/",n.static("../web")),p.get("/state",(e,t)=>{t.json({state:"ok"})}),p.get("/date",(e,t)=>{t.json({date:(new Date).toISOString()})}),p.use("/config",i),p.use("/devices",u),p.use("/nets",a),p.use("/access",l);let f=8e3;f=80,p.listen(f,function(){console.log("WebServer is running on port",f)}),e.exports=p},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("body-parser")},function(e,t,o){var n=o(0).Router();n.get("/",(e,t)=>{t.json({config:"config"})}),e.exports=n},function(e,t,o){var n=o(0).Router();n.get("/",(e,t)=>{t.json({a:1})}),e.exports=n},function(e,t,o){var n=o(0).Router();n.get("/",(e,t)=>{t.json({b:1})}),n.post("/eth0",(e,t)=>{t.end()}),n.post("/wlan0",(e,t)=>{t.end()}),n.post("/ppp0",(e,t)=>{t.end()}),e.exports=n},function(e,t,o){var n=o(0).Router(),r=o(14);n.get("/",(e,t)=>{t.json(r.get("access").value())}),n.post("/",(e,t)=>{var o=Object.assign({},r.get("access").value(),e.body);r.set("access",o).write(),t.json(r.get("access").value())}),e.exports=n},function(e,t,o){let n=null;const r=o(15)(n=new(o(16))("/etc/gateway.conf"));r.defaults({serverState:"offline",access:{}}).write(),e.exports=r},function(e,t){e.exports=require("lowdb")},function(e,t){e.exports=require("lowdb/adapters/FileSync")},function(e,t){e.exports=class{constructor(){console.log("Agent is running")}}}]);