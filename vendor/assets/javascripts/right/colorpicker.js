/**
 * RightJS-UI Colorpicker v2.2.1
 * http://rightjs.org/ui/colorpicker
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
var Colorpicker=RightJS.Colorpicker=function(a,b,c,d){function i(a,b,e){var f=this.reAnchor||(this.reAnchor=new d.Element("div",{"class":"rui-re-anchor"})).insert(this),g=f.insertTo(a,"after").position(),h=a.dimensions(),i=this,j=c(a.getStyle("borderTopWidth")),k=c(a.getStyle("borderLeftWidth")),l=c(a.getStyle("borderRightWidth")),m=c(a.getStyle("borderBottomWidth")),n=h.top-g.y+j,o=h.left-g.x+k,p=h.width-k-l,q=h.height-j-m;i.setStyle("visibility:hidden").show(null),b==="right"?o+=p-i.size().x:n+=q,i.moveTo(o,n),e&&(b==="left"||b==="right"?i.setHeight(q):i.setWidth(p)),i.setStyle("visibility:visible").hide(null)}function h(a,b,c,e){d.Fx&&(c===undefined&&(c=a.options.fxName,e===undefined&&(e={duration:a.options.fxDuration,onFinish:d(a.fire).bind(a,b)},b==="hide"&&(e.duration=(d.Fx.Durations[e.duration]||e.duration)/2)))),(!d.Fx||!c)&&a.fire(b);return a.$super(c,e)}function e(a,b){b||(b=a,a="DIV");var c=new d.Class(d.Element.Wrappers[a]||d.Element,{initialize:function(b,c){this.key=b;var e=[{"class":"rui-"+b}];this instanceof d.Input||this instanceof d.Form||e.unshift(a),this.$super.apply(this,e),d.isString(c)&&(c=d.$(c)),c instanceof d.Element&&(this._=c._,"$listeners"in c&&(c.$listeners=c.$listeners),c={}),this.setOptions(c,this);return d.Wrapper.Cache[d.$uid(this._)]=this},setOptions:function(a,b){b&&(a=d.Object.merge(a,(new Function("return "+(b.get("data-"+this.key)||"{}")))())),a&&d.Options.setOptions.call(this,d.Object.merge(this.options,a));return this}}),e=new d.Class(c,b);d.Observer.createShortcuts(e.prototype,e.EVENTS||d([]));return e}var f=new d.Class(d.Element,{initialize:function(a,b){this.$super("div",b),this._.innerHTML=a,this.addClass("rui-button"),this.on("selectstart","stopEvent")},disable:function(){return this.addClass("rui-button-disabled")},enable:function(){return this.removeClass("rui-button-disabled")},disabled:function(){return this.hasClass("rui-button-disabled")},enabled:function(){return!this.disabled()},fire:function(){this.enabled()&&this.$super.apply(this,arguments);return this}}),g={show:function(a,b){this.constructor.current=this;return h(this,"show",a,b)},hide:function(a,b){this.constructor.current=null;return h(this,"show",a,b)},showAt:function(a,b,c){this.hide(null).shownAt=a=d.$(a),i.call(this,a,b,c);return this.show()},toggleAt:function(a,b,c){return this.hidden()?this.showAt(a,b,c):this.hide()}},j={assignTo:function(a,b){a=d.$(a),b=d.$(b),b?(b[this.key]=this,b.assignedInput=a):a[this.key]=this;var c=d(function(){this.visible()&&(!this.showAt||this.shownAt===a)&&this.setValue(a.value())}).bind(this);a.on({keyup:c,change:c}),this.onChange(function(){(!this.showAt||this.shownAt===a)&&a.setValue(this.getValue())});return this}},k=d,l=d.$,m=d.$w,n=d.$$,o=d.$E,p=d.$A,q=d.isArray,r=d.Class,s=d.Element,t=d.Input,u=new e({include:[g,j],extend:{version:"2.2.1",EVENTS:m("change show hide done"),Options:{format:"hex",update:null,updateBg:null,updateBorder:null,updateColor:null,trigger:null,fxName:"fade",fxDuration:"short",cssRule:"*[data-colorpicker]"},i18n:{Done:"Done"},hideAll:function(){n("div.rui-colorpicker").each(function(a){a instanceof u&&!a.inlined()&&a.hide()})}},initialize:function(a){this.$super("colorpicker",a).addClass("rui-panel").insert([this.field=new v,this.colors=new w,this.controls=new x]).on({mousedown:this.startTrack,keyup:this.recalc,blur:this.update,focus:this.cancelTimer,done:this.done}),this.options.update&&this.assignTo(this.options.update,this.options.trigger),this.options.updateBg&&this.updateBg(this.options.updateBg),this.options.updateBorder&&this.updateBorder(this.options.updateBorder),this.options.updateColor&&this.updateColor(this.options.updateColor),this.tint=k([1,0,0]),this.satur=0,this.bright=1,this.color=k([255,255,255]),this.recalc().update()},setValue:function(a){var b=q(a)?a:this.toColor(a);b&&b.length===3&&(b=b.map(function(a){return this.bound(c(""+a),0,255)},this),this.color=b,this.color2tint().update(),this.colors.size().y||this.update.bind(this).delay(20));return this},getValue:function(a){return a?this.color:this[this.options.format==="rgb"?"toRgb":"toHex"]()},updateBg:function(a){var b=l(a);b&&this.onChange(k(function(a){b._.style.backgroundColor=this.toRgb()}).bind(this));return this},updateColor:function(a){var b=l(a);b&&this.onChange(k(function(a){b._.style.color=this.toRgb()}).bind(this));return this},updateBorder:function(a){var b=l(a);b&&this.onChange(k(function(a){b._.style.borderColor=this.toRgb()}).bind(this));return this},insertTo:function(a,b){return this.$super(a,b).addClass("rui-colorpicker-inline")},inlined:function(){return this.hasClass("rui-colorpicker-inline")},done:function(){this.inlined()||this.hide();return this},setOptions:function(a){a=a||{},this.$super(a,l(a.trigger||a.update))},update:function(){this.field._.style.backgroundColor="rgb("+this.tint.map(function(a){return b.round(a*255)})+")";var a=this.color,c=this.controls;c.preview._.style.backgroundColor=c.display._.value=this.toHex(),c.rDisplay._.value=a[0],c.gDisplay._.value=a[1],c.bDisplay._.value=a[2];var d=this.field.pointer._.style,e=this.field.size(),f=e.y-this.bright*e.y-2,g=this.satur*e.x-2;d.top=this.bound(f,0,e.y-5)+"px",d.left=this.bound(g,0,e.x-5)+"px";var h=this.tint,i;e=this.colors.size(),h[1]==0?i=h[0]==1?h[2]:2-h[0]:h[0]==0?i=2+(h[2]==1?h[1]:2-h[2]):i=4+(h[1]==1?h[0]:2-h[1]),i=i/6*e.y,this.colors.pointer._.style.top=this.bound(i,0,e.y-4)+"px",this.prevColor!==""+this.color&&(this.fire("change",{value:this.color}),this.prevColor=""+this.color);return this},recalc:function(a){if(a){var b=a.target,c=b._.value,d=p(this.color),e=!1;b===this.controls.display&&/#\w{6}/.test(c)?e=d=this.toColor(c):/^\d+$/.test(c)&&(d[b._.cIndex]=c,e=!0),e&&this.setValue(d)}else this.tint2color();return this},startTrack:function(a){this.stopTrack(),this.cancelTimer(),a.target===this.field.pointer?a.target=this.field:a.target===this.colors.pointer&&(a.target=this.colors);if(a.target===this.field||a.target===this.colors)a.stop(),u.tracking=this,a.target.tracking=!0,this.trackMove(a)},stopTrack:function(){u.tracking=!1,this.field.tracking=!1,this.colors.tracking=!1},trackMove:function(a){var b,c=a.position(),d,e;this.field.tracking?b=this.field.dimensions():this.colors.tracking&&(b=this.colors.dimensions());if(b){d=this.bound(c.y-b.top,0,b.height),e=this.bound(c.x-b.left,0,b.width);if(this.field.tracking)this.satur=e/b.width,this.bright=1-d/b.height;else if(this.colors.tracking){d==b.height&&(d=b.height-.1);var f=b.height/6,g=this.tint=[0,0,0],h=d%f/f,i=1-h;d<f?(g[0]=1,g[2]=h):d<f*2?(g[0]=i,g[2]=1):d<f*3?(g[2]=1,g[1]=h):d<f*4?(g[2]=i,g[1]=1):d<f*5?(g[1]=1,g[0]=h):(g[1]=i,g[0]=1)}this.recalc().update()}},cancelTimer:function(a){k(function(){this._hide_delay&&(this._hide_delay.cancel(),this._hide_delay=null)}).bind(this).delay(10)}}),v=new r(s,{initialize:function(a){this.$super("div",{"class":"field"}),this.insert(this.pointer=o("div",{"class":"pointer"}))}}),w=new r(s,{initialize:function(){this.$super("div",{"class":"colors"}),this.insert(this.pointer=o("div",{"class":"pointer"}))}}),x=new r(s,{initialize:function(){this.$super("div",{"class":"controls"}),this.insert([this.preview=o("div",{"class":"preview",html:"&nbsp;"}),this.display=o("input",{type:"text","class":"display",maxlength:7}),o("div",{"class":"rgb-display"}).insert([o("div").insert([o("label",{html:"R:"}),this.rDisplay=o("input",{maxlength:3,cIndex:0})]),o("div").insert([o("label",{html:"G:"}),this.gDisplay=o("input",{maxlength:3,cIndex:1})]),o("div").insert([o("label",{html:"B:"}),this.bDisplay=o("input",{maxlength:3,cIndex:2})])]),this.button=(new f(u.i18n.Done)).onClick("fire","done")])}});u.include({toRgb:function(a){return"rgb("+this.color.join(",")+")"},toHex:function(a){return"#"+this.color.map(function(a){return(a<16?"0":"")+a.toString(16)}).join("")},toColor:function(a){var b=a.toLowerCase(),d;if(d=/rgb\((\d+),(\d+),(\d+)\)/.exec(b))return[d[1],d[2],d[3]].map(c);if(/#[\da-f]+/.test(b)){if(d=/^#([\da-f])([\da-f])([\da-f])$/.exec(b))b="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3];if(d=/#([\da-f]{2})([\da-f]{2})([\da-f]{2})/.exec(b))return[d[1],d[2],d[3]].map(function(a){return c(a,16)})}},color2tint:function(){var a=p(this.color).sort(function(a,b){return a-b}),b=a[0],c=a[2];this.bright=c/255,this.satur=1-b/(c||1),this.tint.each(function(a,d){this.tint[d]=!b&&!c||b==c?d==0?1:0:(this.color[d]-b)/(c-b);return this.tint[d]},this);return this},tint2color:function(){var a=this.tint,c=this.color;for(var d=0;d<3;d++)c[d]=1+this.satur*(a[d]-1),c[d]=b.round(255*c[d]*this.bright);return this},bound:function(a,b,c){var d=a;b<c?d=d<b?b:d>c?c:d:(d>c&&(d=c),d<b&&(d=b));return d}}),l(a).on({mouseup:function(){u.tracking&&u.tracking.stopTrack()},mousemove:function(a){u.tracking&&u.tracking.trackMove(a)},focus:function(a){var b=a.target instanceof t?a.target:null;u.hideAll(),b&&(b.colorpicker||b.match(u.Options.cssRule))&&(b.colorpicker||new u({update:b})).setValue(b.value()).showAt(b)},blur:function(a){var b=a.target,c=b.colorpicker;c&&(c._hide_delay=k(function(){c.hide()}).delay(200))},click:function(a){var b=a.target instanceof s?a.target:null;b&&(b.colorpicker||b.match(u.Options.cssRule))?b instanceof t||(a.stop(),(b.colorpicker||new u({trigger:b})).hide(null).toggleAt(b.assignedInput)):a.find("div.rui-colorpicker")||u.hideAll()},keydown:function(a){var b=u.current,c=({27:"hide",13:"done"})[a.keyCode];c&&b&&b.visible()&&(a.stop(),b[c]())}});var y=a.createElement("style"),z=a.createTextNode("*.rui-button{display:inline-block; *display:inline; *zoom:1;height:1em;line-height:1em;margin:0;padding:.2em .5em;text-align:center;border:1px solid #CCC;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;cursor:pointer;color:#333;background-color:#FFF;user-select:none;-moz-user-select:none;-webkit-user-select:none} *.rui-button:hover{color:#111;border-color:#999;background-color:#DDD;box-shadow:#888 0 0 .1em;-moz-box-shadow:#888 0 0 .1em;-webkit-box-shadow:#888 0 0 .1em} *.rui-button:active{color:#000;border-color:#777;text-indent:1px;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none} *.rui-button-disabled, *.rui-button-disabled:hover, *.rui-button-disabled:active{color:#888;background:#DDD;border-color:#CCC;cursor:default;text-indent:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none}div.rui-re-anchor{margin:0;padding:0;background:none;border:none;float:none;display:inline;position:absolute;z-index:9999}.rui-panel{margin:0;padding:.5em;position:relative;background-color:#EEE;border:1px solid #BBB;border-radius:.3em;-moz-border-radius:.3em;-webkit-border-radius:.3em;box-shadow:.15em .3em .5em #BBB;-moz-box-shadow:.15em .3em .5em #BBB;-webkit-box-shadow:.15em .3em .5em #BBB;cursor:default}div.rui-colorpicker .field,div.rui-colorpicker .field *,div.rui-colorpicker .colors,div.rui-colorpicker .colors *{border:none;background:none;width:auto;height:auto;position:static;float:none;top:none;left:none;right:none;bottom:none;margin:0;padding:0;display:block;font-weight:normal;vertical-align:center}div.rui-colorpicker div.field,div.rui-colorpicker div.field div.pointer,div.rui-colorpicker div.colors,div.rui-colorpicker div.colors div.pointer{background:url(/assets/rightjs-ui/colorpicker.png) no-repeat 0 0}div.rui-colorpicker div.field,div.rui-colorpicker div.colors,div.rui-colorpicker div.controls{display:inline-block; *display:inline; *zoom:1;position:relative;vertical-align:top;height:150px}div.rui-colorpicker div.field div.pointer,div.rui-colorpicker div.colors div.pointer{position:absolute;top:0px;left:0;width:9px;height:9px}div.rui-colorpicker input.display,div.rui-colorpicker div.preview,div.rui-colorpicker div.rgb-display,div.rui-colorpicker input.rui-ui-button{font-size:100%;display:block;width:auto;padding:0 .2em}div.rui-colorpicker input.display,div.rui-colorpicker div.preview,div.rui-colorpicker div.rgb-display input,div.rui-colorpicker input.rui-ui-button{border:1px solid #AAA;-moz-border-radius:.2em;-webkit-border-radius:.2em}div.rui-colorpicker div.field{width:150px;background-color:red;cursor:crosshair;margin-right:1.2em}div.rui-colorpicker div.field div.pointer{background-position:-170px 0;margin-left:-2px;margin-top:-2px}div.rui-colorpicker div.colors{width:16px;background-position:-150px 0;border-color:#EEE;cursor:pointer;margin-right:.6em}div.rui-colorpicker div.colors div.pointer{cursor:default;background-position:-170px -20px;margin-left:-8px;margin-top:-3px}div.rui-colorpicker div.controls{width:5em}div.rui-colorpicker div.preview{height:2em;background:white;border-color:#BBB}div.rui-colorpicker input.display{margin-top:.5em;background:#FFF;width:4.5em}div.rui-colorpicker div.rgb-display{padding:0;text-align:right;margin-top:.5em}div.rui-colorpicker div.rgb-display label{display:inline}div.rui-colorpicker div.rgb-display label:after{content:none}div.rui-colorpicker div.rgb-display input{vertical-align:top;font-size:100%;width:2em;text-align:right;margin-left:.2em;padding:0 .2em;background:#FFF;margin-bottom:1px;display:inline}div.rui-colorpicker div.rui-button{cursor:pointer;position:absolute;bottom:0;right:0;width:4em}div.rui-colorpicker-inline{display:inline-block; *display:inline; *zoom:1;position:relative;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;z-index:auto}");y.type="text/css",a.getElementsByTagName("head")[0].appendChild(y),y.styleSheet?y.styleSheet.cssText=z.nodeValue:y.appendChild(z);return u}(document,Math,parseInt,RightJS)