/**
 * Lightbox feature for RightJS
 * http://rightjs.org/ui/lightbox
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
var Lightbox=RightJS.Lightbox=function(p,d){var q=d.$,r=d.$$,u=d.$w,h=d.$E,v=d.$ext,w=d.Xhr,x=d.Class,y=d.Object,s=d.Wrapper,j=d.Element,i=d.Browser;i.IE6=i.OLD&&navigator.userAgent.indexOf("MSIE 6")>0;var z=new d.Wrapper(d.Element,{initialize:function(a){this.$super("div",{"class":"rui-spinner"});this.dots=[];for(var b=0;b<(a||4);b++)this.dots.push(new d.Element("div"));this.dots[0].addClass("glowing");this.insert(this.dots);d(this.shift).bind(this).periodical(300)},shift:function(){if(this.visible()){var a=
this.dots.pop();this.dots.unshift(a);this.insert(a,"top")}}}),f=new (function(a,b){if(!b){b=a;a="DIV"}var c=new d.Wrapper(d.Element.Wrappers[a]||d.Element,{initialize:function(e,g){this.key=e;var k=[{"class":"rui-"+e}];this instanceof d.Input||this instanceof d.Form||k.unshift(a);this.$super.apply(this,k);if(d.isString(g))g=d.$(g);if(g instanceof d.Element){this._=g._;if("$listeners"in g)g.$listeners=g.$listeners;g={}}this.setOptions(g,this);return this},setOptions:function(e,g){g=g||this;d.Options.setOptions.call(this,
d.Object.merge(e,eval("("+(g.get("data-"+this.key)||"{}")+")")));return this}});c=new d.Wrapper(c,b);d.Observer.createShortcuts(c.prototype,c.EVENTS||[]);return c})({extend:{version:"2.0.0",EVENTS:u("show hide load"),Options:{fxName:"fade",fxDuration:100,group:null,hideOnEsc:true,hideOnOutClick:true,showCloseButton:true,cssRule:"a[data-lightbox]",mediaWidth:425,mediaHeight:350},i18n:{Close:"Close",Prev:"Previous Image",Next:"Next Image"},Images:/\.(jpg|jpeg|gif|png|bmp)/,Medias:[[/(http:\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)/,
"$1/v/$2","swf"],[/(http:\/\/video.google.com)\/videoplay\?docid=([^&]+)/,"$1/googleplayer.swf?docId=$2","swf"],[/(http:\/\/vimeo\.[a-z]+)\/([0-9]+).*?/,"$1/moogaloop.swf?clip_id=$2","swf"]]},initialize:function(a,b){this.$super("lightbox",{}).setOptions(a,b).insert([this.locker=new A(this.options),this.dialog=new B(this.options)]).on({close:this._close,next:this._next,prev:this._prev})},setOptions:function(a,b){this.$super(a,b);if(b){var c=b.get("rel");if(c&&(c=c.match(/lightbox\[(.+?)\]/)))this.options.group=
c[1]}return this},setTitle:function(a){this.dialog.setTitle(a);return this},show:function(a){return this._showAnd(function(){this.dialog.show(a,!a)})},hide:function(){f.current=null;return this.$super(this.options.fxName,{duration:this.options.fxDuration/3,onFinish:d(function(){this.fire("hide");this.remove()}).bind(this)})},load:function(a,b){return this._showAnd(function(){this.dialog.load(a,b)})},resize:function(a){this.dialog.resize(a);return this},_close:function(a){a.stop();this.hide()},_prev:function(a){a.stop();
l.prev()},_next:function(a){a.stop();l.next()},_showAnd:function(a){if(f.current!==this){f.current=this;r("div.rui-lightbox").each("remove");this.insertTo(p.body);this.dialog.show("",true);if(i.OLD){this.reposition();j.prototype.show.call(this);a.call(this)}else{this.setStyle("display:none");j.prototype.show.call(this,this.options.fxName,{duration:this.options.fxDuration/2,onFinish:d(function(){a.call(this);this.fire("show")}).bind(this)})}}else a.call(this);return this},reposition:function(){if(i.IE6){var a=
q(window);this.setStyle({top:a.scrolls().y+"px",width:a.size().x+"px",height:a.size().y+"px",position:"absolute"})}}});f.extend({hide:function(){f.current&&f.current.hide()},show:function(){return this.inst("show",arguments)},load:function(){return this.inst("load",arguments)},inst:function(a,b){var c=new f;return c[a].apply(c,b)}});var A=new s(j,{initialize:function(a){this.$super("div",{"class":"rui-lightbox-locker"});a.hideOnOutClick&&this.onClick("fire","close")}}),B=new s(j,{initialize:function(a){var b=
f.i18n;this.options=a;this.$super("div",{"class":"rui-lightbox-dialog"});this.insert([this.title=h("div",{"class":"rui-lightbox-title"}),h("div",{"class":"rui-lightbox-body"}).insert(h("div",{"class":"rui-lightbox-body-inner"}).insert([this.locker=h("div",{"class":"rui-lightbox-body-locker"}).insert(new z(4)),this.scroller=h("div",{"class":"rui-lightbox-scroller"}).insert(this.content=h("div",{"class":"rui-lightbox-content"}))])),h("div",{"class":"rui-lightbox-navigation"}).insert([this.closeButton=
h("div",{"class":"close",html:"&times;",title:b.Close}).onClick("fire","close"),this.prevLink=h("div",{"class":"prev",html:"&larr;",title:b.Prev}).onClick("fire","prev"),this.nextLink=h("div",{"class":"next",html:"&rarr;",title:b.Next}).onClick("fire","next")])]);this.prevLink.hide();this.nextLink.hide();a.showCloseButton||this.closeButton.hide()},setTitle:function(a){this.title.update(a||"")},resize:function(a,b){var c=this.parent().size(),e=this.scroller.size(),g=(c.y-this.size().y)/2,k=this.size().x-
e.x;if(a){a=this.scroller.setStyle(a).size();this.scroller.setStyle({width:e.x+"px",height:e.y+"px"})}else a=this.content.size();if(a.x+100>c.x)a.x=c.x-100;if(a.y+100>c.y)a.y=c.y-100;var t=(g*2+e.y-a.y)/2,m=this._.style,n=this.scroller._.style;if(d.Fx&&b&&(a.x!=e.x||a.y!=e.y))v(new d.Fx(this,{duration:this.options.fxDuration,transition:"Lin"}),{render:function(o){n.width=e.x+(a.x-e.x)*o+"px";n.height=e.y+(a.y-e.y)*o+"px";m.top=g+(t-g)*o+"px";if(i.IE6)m.width=k+e.y+(a.y-e.y)*o+"px"}}).onFinish(d(this.unlock).bind(this)).start();
else{n.width=a.x+"px";n.height=a.y+"px";m.top=t+"px";if(i.IE6)m.width=k+a.x+"px";this.request||this.unlock()}return this},show:function(a,b){this.content.update(a||"");this.resize(null,!b)},load:function(a,b){if(a instanceof j){this.setTitle(a.get("title"));a=a.get("href")}l.show(this,a);this.lock().cancel();this.request=new C(a,b,d(function(c,e){this.request=null;this.show(c,e)}).bind(this));return this.resize()},cancel:function(){this.request&&this.request.cancel();return this},lock:function(){this.locker.setStyle("opacity:1");
return this},unlock:function(){this.locker.morph({opacity:0},{duration:this.options.fxDuration*2/3});return this}}),C=new x({initialize:function(a,b,c){if(this.isImage(a,c))f.current.addClass("rui-lightbox-image");else if(this.isMedia(a,c))f.current.addClass("rui-lightbox-media");else this.xhr=(new w(a,y.merge({method:"get"},b))).onComplete(function(){c(this.text)}).send()},cancel:function(){if(this.xhr)this.xhr.cancel();else if(this.img)this.img.onload=function(){}},isImage:function(a,b){if(a.match(f.Images)){var c=
this.img=h("img")._;c.onload=function(){b(c)};c.src=a;return true}},isMedia:function(a,b){var c=d(f.Medias).map(function(e){return a.match(e[0])?this.buildEmbed(a.replace(e[0],e[1]),e[2]):null},this).compact()[0];if(c){b(c,true);return true}},buildEmbed:function(a,b){var c={swf:["D27CDB6E-AE6D-11cf-96B8-444553540000","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0","application/x-shockwave-flash"]},e=f.current?f.current.options:f.Options;e=' width="'+e.mediaWidth+
'" height="'+e.mediaHeight+'"';return'<object classid="clsid:'+c[b][0]+'" codebase="'+c[b][1]+'"'+e+'><param name="src" value="'+a+'" /><embed src="'+a+'" type="'+c[b][2]+'"'+e+" /></object>"}}),l={show:function(a,b){if(a.options.group){this.dialog=a;this.links=this.find(a.options.group);this.link=this.links.first(function(g){return g.get("href")===b});var c=this.links.indexOf(this.link),e=this.links.length;a.prevLink[e&&c>0?"show":"hide"]();a.nextLink[e&&c<e-1?"show":"hide"]()}else this.dialog=null},
prev:function(){if(this.dialog&&!this.timer){var a=this.links[this.links.indexOf(this.link)-1];if(a){this.dialog.load(a);this.timeout()}}},next:function(){if(this.dialog&&!this.timer){var a=this.links[this.links.indexOf(this.link)+1];if(a){this.dialog.load(a);this.timeout()}}},find:function(a){return r("a").filter(function(b){var c=b.get("data-lightbox");b=b.get("rel");return c&&eval("("+c+")").group===a||b&&b.indexOf("lightbox["+a+"]")>-1})},timeout:function(){this.timer=d(function(){l.timer=null}).delay(300)}};
q(p).on({click:function(a){var b=a.find(f.Options.cssRule)||a.find("a[rel^=lightbox]");if(b){a.stop();(new f({},b)).load(b)}},mousewheel:function(a){if(f.current){a.stop();f.current.fire((a._.detail||-a._.wheelDelta)<0?"prev":"next")}},keydown:function(a){var b=f.current,c={27:"close",33:"prev",37:"prev",38:"prev",39:"next",40:"next",34:"next"}[a.keyCode];if(b&&c)if(c!=="close"||b.options.hideOnEsc){a.stop();b.fire(c)}}});q(window).on({resize:function(){if(f.current){f.current.reposition();f.current.dialog.resize()}},
scroll:function(){f.current&&i.IE6&&f.current.reposition()}});p.write('<style type="text/css">div.rui-spinner,div.rui-spinner div{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none;display:inline-block; *display:inline; *zoom:1;border-radius:.12em;-moz-border-radius:.12em;-webkit-border-radius:.12em}div.rui-spinner{text-align:center;white-space:nowrap;background:#EEE;border:1px solid #DDD;height:1.2em;padding:0 .2em}div.rui-spinner div{width:.4em;height:70%;background:#BBB;margin-left:1px}div.rui-spinner div:first-child{margin-left:0}div.rui-spinner div.glowing{background:#777}div.rui-lightbox{position:fixed;top:0;left:0;z-index:9999;float:none;width:100%;height:100%;margin:0;padding:0;background:none;border:none;text-align:center}div.rui-lightbox-locker{position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:#000;opacity:0.8;filter:alpha(opacity=80);cursor:default}div.rui-lightbox-dialog{display:inline-block; *display:inline; *zoom:1;position:relative;text-align:left}div.rui-lightbox-title{height:1.2em;margin-bottom:.1em;white-space:nowrap;color:#DDD;font-weight:bold;font-size:1.6em;font-family:Helvetica;text-shadow:#000 .05em .1em .2em}div.rui-lightbox-body{background-color:white;padding:1em;border-radius:.5em;-moz-border-radius:.5em;-webkit-border-radius:.5em;box-shadow:#000 .1em .2em 1.5em;-moz-box-shadow:#000 .1em .2em 1.5em;-webkit-box-shadow:#000 .1em .2em 1.5em}div.rui-lightbox-body-inner{position:relative}div.rui-lightbox-scroller{overflow:hidden}div.rui-lightbox-content{display:inline-block; *display:inline; *zoom:1;min-height:10em;min-width:10em;_height:10em;_width:10em}div.rui-lightbox-body-locker{background-color:white;position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:999;opacity:0;filter:alpha(opacity=0)}div.rui-lightbox-body-locker div.rui-spinner{position:absolute;right:0;bottom:0;border:none;background:none;font-size:150%}div.rui-lightbox-navigation{color:#888;font-size:150%;font-family:Arial;height:1em;user-select:none;-moz-user-select:none;-webkit-user-select:none}div.rui-lightbox-navigation div{cursor:pointer;position:absolute}div.rui-lightbox-navigation div:hover{color:white}div.rui-lightbox-navigation div.next{left:2em}div.rui-lightbox-navigation div.close{right:0}div.rui-lightbox-image div.rui-lightbox-body,div.rui-lightbox-media div.rui-lightbox-body{padding:0;border:1px solid #777;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px}div.rui-lightbox-image div.rui-lightbox-content,div.rui-lightbox-media div.rui-lightbox-content{min-height:12em;min-width:12em;_height:12em;_width:12em}div.rui-lightbox-image div.rui-lightbox-content img{vertical-align:middle}div.rui-lightbox-image div.rui-lightbox-body,div.rui-lightbox-image div.rui-lightbox-body-locker,div.rui-lightbox-media div.rui-lightbox-body,div.rui-lightbox-media div.rui-lightbox-body-locker{background-color:#DDD}div.rui-lightbox-image div.rui-lightbox-body-locker div.rui-spinner,div.rui-lightbox-media div.rui-lightbox-body-locker div.rui-spinner{bottom:.5em;right:.5em}</style>');
return f}(document,RightJS);
