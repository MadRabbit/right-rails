/**
 * Drag'n'Drop module for RightJS
 * http://rightjs.org/plugins/drag-n-drop
 *
 * Copyright (C) 2009-2010 Nikolay Nemshilov
 */
(function(q,r,f){var k=f.$,t=f.$w,u=f.Class,w=f.isHash,x=f.isArray,s=f.Element,v=f.Observer,j=new u(v,{extend:{EVENTS:t("before start drag stop drop"),Options:{handle:null,snap:0,axis:null,range:null,dragClass:"dragging",clone:false,revert:false,revertDuration:"normal",scroll:true,scrollSensitivity:32,zIndex:1E7,moveOut:false,relName:"draggable"},current:null,rescan:function(a){var c=this.Options.relName;(k(a)||k(r)).select('*[rel^="'+c+'"]').each(function(b){if(!b.draggable){var e=b.get("data-"+
c+"-options");new this(b,eval("("+e+")")||{})}},this)}},initialize:function(a,c){this.element=k(a);this.$super(c);this.element.draggable=this.init()},destroy:function(){this.handle.stopObserving("mousedown",this._dragStart);delete this.element.draggable;return this},setOptions:function(a){this.$super(a);this.handle=this.options.handle?k(this.options.handle):this.element;if(x(this.options.snap)){this.snapX=this.options.snap[0];this.snapY=this.options.snap[1]}else this.snapX=this.snapY=this.options.snap;
return this},revert:function(){var a=this.clone.position();a={top:a.y+this.ryDiff+"px",left:a.x+this.rxDiff+"px"};if(this.options.revertDuration&&this.element.morph)this.element.morph(a,{duration:this.options.revertDuration,onFinish:f(this.swapBack).bind(this)});else{this.element.setStyle(a);this.swapBack()}return this},init:function(){this._dragStart=f(this.dragStart).bind(this);this.handle.onMousedown(this._dragStart);return this},dragStart:function(a){this.fire("before",this,a.stop());var c=this.element.position();
this.xDiff=a.pageX-c.x;this.yDiff=a.pageY-c.y;var b={y:f(this.element.getStyle("top")).toFloat(),x:f(this.element.getStyle("left")).toFloat()};this.rxDiff=isNaN(b.x)?0:b.x-c.x;this.ryDiff=isNaN(b.y)?0:b.y-c.y;b={x:this.element.getStyle("width"),y:this.element.getStyle("height")};if(b.x=="auto")b.x=this.element._.offsetWidth+"px";if(b.y=="auto")b.y=this.element._.offsetHeight+"px";if(this.options.clone||this.options.revert)this.clone=(new s(this.element._.cloneNode(true))).setStyle({visibility:this.options.clone?
"visible":"hidden"}).insertTo(this.element,"before");this.element.setStyle({position:"absolute",zIndex:j.Options.zIndex++,top:c.y+this.ryDiff+"px",left:c.x+this.rxDiff+"px",width:b.x,height:b.y}).addClass(this.options.dragClass);this.options.moveOut&&this.element.insertTo(r.body);this.winScrolls=k(q).scrolls();this.winSizes=k(q).size();j.current=this.calcConstraints().fire("start",this,a);this.style=this.element._.style},dragProcess:function(a){var c=a.pageX,b=a.pageY,e=c-this.xDiff,h=b-this.yDiff;
if(this.ranged){if(this.minX>e)e=this.minX;if(this.maxX<e)e=this.maxX;if(this.minY>h)h=this.minY;if(this.maxY<h)h=this.maxY}if(this.options.scroll){var d={x:this.winScrolls.x,y:this.winScrolls.y},g=this.options.scrollSensitivity;if(b-d.y<g)d.y=b-g;else if(d.y+this.winSizes.y-b<g)d.y=b-this.winSizes.y+g;if(c-d.x<g)d.x=c-g;else if(d.x+this.winSizes.x-c<g)d.x=c-this.winSizes.x+g;if(d.y<0)d.y=0;if(d.x<0)d.x=0;if(d.y<this.winScrolls.y||d.y>this.winScrolls.y||d.x<this.winScrolls.x||d.x>this.winScrolls.x)k(q).scrollTo(this.winScrolls=
d)}if(this.snapX)e-=e%this.snapX;if(this.snapY)h-=h%this.snapY;if(!this.axisY)this.style.left=e+this.rxDiff+"px";if(!this.axisX)this.style.top=h+this.ryDiff+"px";this.fire("drag",this,a)},dragStop:function(a){this.element.removeClass(this.options.dragClass);n.checkDrop(a,this);this.options.revert&&this.revert();j.current=null;this.fire("stop",this,a)},swapBack:function(){if(this.clone)this.clone.replace(this.element.setStyle({width:this.clone.getStyle("width"),height:this.clone.getStyle("height"),
position:this.clone.getStyle("position"),zIndex:this.clone.getStyle("zIndex")||""}))},calcConstraints:function(){var a=this.options.axis;this.axisX=f(["x","horizontal"]).include(a);this.axisY=f(["y","vertical"]).include(a);this.ranged=false;if(a=this.options.range){this.ranged=true;var c=k(a);if(c instanceof s){a=c.dimensions();a={x:[a.left,a.left+a.width],y:[a.top,a.top+a.height]}}if(w(a)){c=this.element.size();if(a.x){this.minX=a.x[0];this.maxX=a.x[1]-c.x}if(a.y){this.minY=a.y[0];this.maxY=a.y[1]-
c.y}}}return this}}),n=new u(v,{extend:{EVENTS:t("drop hover leave"),Options:{accept:"*",containment:null,overlap:null,overlapSize:0.5,allowClass:"droppable-allow",denyClass:"droppable-deny",relName:"droppable"},rescan:eval("["+j.rescan.toString().replace(/\.draggable/g,".droppable")+"]")[0],checkHover:function(a,c){for(var b=0,e=this.active.length;b<e;b++)this.active[b].checkHover(a,c)},checkDrop:function(a,c){for(var b=0,e=this.active.length;b<e;b++)this.active[b].checkDrop(a,c)},active:[]},initialize:function(a,
c){this.element=k(a);this.$super(c);n.active.push(this.element._droppable=this)},destroy:function(){n.active=n.active.without(this);delete this.element.droppable;return this},checkHover:function(a,c){if(this.hoveredBy(a,c)){if(!this._hovered){this._hovered=true;this.element.addClass(this.options[this.allows(c)?"allowClass":"denyClass"]);this.fire("hover",c,this,a)}}else if(this._hovered){this._hovered=false;this.reset().fire("leave",c,this,a)}},checkDrop:function(a,c){this.reset();if(this.hoveredBy(a,
c)&&this.allows(c)){c.fire("drop",this,c,a);this.fire("drop",c,this,a)}},reset:function(){this.element.removeClass(this.options.allowClass).removeClass(this.options.denyClass);return this},hoveredBy:function(a,c){var b=this.element.dimensions(),e=b.top,h=b.left,d=b.left+b.width,g=b.top+b.height,l=a.pageX,m=a.pageY;if(this.options.overlap){var i=c.element.dimensions();l=this.options.overlapSize;m=i.top;var o=i.left,p=i.left+i.width;i=i.top+i.height;switch(this.options.overlap){case "x":case "horizontal":return(m>
e&&m<g||i>e&&i<g)&&(o>h&&o<d-b.width*l||p<d&&p>h+b.width*l);case "y":case "vertical":return(o>h&&o<d||p>h&&p<d)&&(m>e&&m<g-b.height*l||i<g&&i>e+b.height*l);default:return(o>h&&o<d-b.width*l||p<d&&p>h+b.width*l)&&(m>e&&m<g-b.height*l||i<g&&i>e+b.height*l)}}else return l>h&&l<d&&m>e&&m<g},allows:function(a){if(this.options.containment&&!this._scanned){this.options.containment=f(this.options.containment).map(k);this._scanned=true}return(this.options.containment?this.options.containment.includes(a.element):
true)&&(this.options.accept=="*"?true:a.element.match(this.options.accept))}});k(r).on({ready:function(){j.rescan();n.rescan()},mousemove:function(a){if(j.current!==null){j.current.dragProcess(a);n.checkHover(a,j.current)}},mouseup:function(a){j.current!==null&&j.current.dragStop(a)}});s.include({makeDraggable:function(a){new j(this,a);return this},undoDraggable:function(){"draggable"in this&&this.draggable.destroy();return this},makeDroppable:function(a){new n(this,a);return this},undoDroppable:function(){"droppable"in
this&&this.droppable.destroy();return this}});q.Draggable=f.Draggable=j;q.Droppable=f.Droppable=n})(window,document,RightJS);