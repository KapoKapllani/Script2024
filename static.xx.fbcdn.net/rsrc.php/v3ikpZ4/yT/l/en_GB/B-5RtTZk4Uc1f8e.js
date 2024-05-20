;/*FB_PKG_DELIM*/

__d("deepCompare",[],(function(a,b,c,d,e,f){"use strict";function g(a,b){if(a===b)return!0;if(!(a instanceof Object)||!(b instanceof Object))return!1;if(a.constructor!==b.constructor)return!1;if(Array.isArray(a)&&Array.isArray(b)){if(a.length!==b.length)return!1;var c={},d=0;for(var e=0,f=a.length;e<f;e++){var h=d;for(var i=0,j=b.length;i<j&&h===d;i++){if(c[i])continue;g(a[e],b[i])&&(c[i]=!0,d++)}}return d===a.length}else{h=a;i=b;for(j in h){if(!Object.prototype.hasOwnProperty.call(h,j))continue;if(!Object.prototype.hasOwnProperty.call(i,j))return!1;if(h[j]===i[j])continue;if(typeof h[j]!=="object")return!1;if(!g(h[j],i[j]))return!1}for(j in i)if(Object.prototype.hasOwnProperty.call(i,j)&&!Object.prototype.hasOwnProperty.call(h,j))return!1}return!0}f["default"]=g}),66);
__d("AccessibleLayer",["fbt","DOM","Event","Focus"],(function(a,b,c,d,e,f,g){a=function(){"use strict";function a(a){this._layer=a,this._listener=null}var c=a.prototype;c.enable=function(){this._afterShowSubscription=this._layer.subscribe("aftershow",this._onAfterShow.bind(this)),this._afterHideSubscription=this._layer.subscribe("hide",this._onAfterHide.bind(this))};c.disable=function(){this._listener&&this._listener.remove(),this._afterShowSubscription.unsubscribe(),this._listener=this._afterShowSubscription=null};c._closeListener=function(a){a=this._layer.getCausalElement();a&&(a.tabIndex==null?(a.tabIndex=-1,b("Focus").setWithoutOutline(a)):b("Focus").set(a));this._layer.hide()};c._setupCloseButton=function(){var a=this._layer.getContentRoot();if(b("DOM").scry(a,'[role="dialog"]').length<=0&&(b("DOM").scry(a,'[role="listbox"]').length>0||b("DOM").scry(a,'[role="menu"]').length>0))return;var c=b("DOM").scry(a,".layer_close_elem")[0];c||(c=b("DOM").create("a",{className:"accessible_elem layer_close_elem",href:"#",role:"button"},[g._("Close pop-up and return")]),b("DOM").appendContent(a,c));this._listener=b("Event").listen(c,"click",this._closeListener.bind(this))};c._onAfterShow=function(){this._listener||this._setupCloseButton()};c._onAfterHide=function(){this._listener&&this._listener.remove(),this._listener=null};return a}();e.exports=a}),null);
__d("ContextualDialogARIA",["DOM","getOrCreateDOMID"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscription=this._layer.subscribe("beforeshow",this._addAriaAttribute.bind(this))};c.disable=function(){this._subscription.unsubscribe(),this._subscription=null};c._addAriaAttribute=function(){var a=this._layer.getCausalElement();if(!a)return;var c=b("DOM").scry(this._layer.getRoot(),".accessible_elem");c.length&&a.setAttribute("aria-describedby",b("getOrCreateDOMID")(c[0]))};return a}();e.exports=a}),null);
__d("ContextualDialogDefaultTheme",["cx"],(function(a,b,c,d,e,f,g,h){a="_53ip";b={offset:15,length:16};g.wrapperClassName=a;g.arrowDimensions=b}),98);
__d("ContextualDialogFitInViewport_PUSHSAFE",["Style","Vector"],(function(a,b,c,d,e,f){var g=50,h=10;a=function(){"use strict";function a(a){this._layer=a,this._contentHeight=null,this._contextY=null}var c=a.prototype;c.enable=function(){var a=this,b=this._layer.getArrowDimensions();this._arrowOffset=b.offset;b=b.length;this._arrowBuffer=this._arrowOffset+b;this._subscription=this._layer.subscribe(["reposition"],function(b,c){if(!a._layer.isFixed()||c.isVertical())return;a._adjustPosition()})};c.disable=function(){this._subscription.unsubscribe(),this._subscription=null};c._getContentHeight=function(){return b("Vector").getElementDimensions(this._layer._contentWrapper).y};c._getContextY=function(){return b("Vector").getElementPosition(this._layer.getContext(),"viewport").y};c._adjustPosition=function(){var a=this._getContextY(),c=this._getContentHeight();if(a===this._contextY&&c===this._contentHeight)return;this._contextY=a;this._contentHeight=c;var d=b("Vector").getViewportDimensions().y;d=Math.min(Math.max(0,a+c+h-d),Math.max(0,a-g),c-this._arrowOffset-this._arrowBuffer);b("Style").set(this._layer.getContent(),"top",-d+"px")};return a}();e.exports=a}),null);
__d("AbstractContextualDialogKeepInViewportBehavior",["ContextualLayerDimensions","Event","Vector","abstractMethod","throttle"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this._layer=a,this._listeners=[],this._subscription=null,this._minimumTop=null}var c=a.prototype;c.enable=function(){var a=this,b=this._layer.getArrowDimensions();this._arrowOffset=b.offset;b=b.length;this._arrowBuffer=this._arrowOffset+b;this._subscription=this._layer.subscribe(["show","hide","reposition"],function(b,c){if(a._layer.isFixed())return;b=="reposition"?(a._calculateMinimumTop(c),a._adjustForScroll()):b=="show"?(a._attachScroll(),a._adjustForScroll()):a._detachScroll()});this._layer.isShown()&&this._attachScroll()};c.disable=function(){this._layer.isShown()&&this._detachScroll(),this._subscription.unsubscribe(),this._subscription=null};c.__adjustForScroll=function(a,c){return b("abstractMethod")("AbstractContextualDialogArrowBehavior","__adjustForScroll")};c._attachScroll=function(){var a=b("throttle")(this._adjustForScroll.bind(this)),c=this._layer.getContextScrollParent()||window;this._listeners=[b("Event").listen(c,"scroll",a),b("Event").listen(window,"resize",a)]};c._detachScroll=function(){while(this._listeners.length)this._listeners.pop().remove();this._listeners=[]};c._getContentHeight=function(){return!this._layer._contentWrapper?0:b("Vector").getElementDimensions(this._layer._contentWrapper).y};c._getContextY=function(){return b("Vector").getElementPosition(this._layer.getContext()).y};c._calculateMinimumTop=function(a){if(a.isVertical())return;this._minimumTop=this._getContextY()-(this._getContentHeight()-this._arrowBuffer)+a.getOffsetY()};c._adjustForScroll=function(){var a=this._layer.getOrientation(),c=this._layer.getContent();if(a.isVertical()||!c)return;a=b("ContextualLayerDimensions").getViewportRect(this._layer);c=a.b-this._minimumTop;if(c<0)return;a=this._getContentHeight();var d=a-(this._arrowBuffer+this._arrowOffset);d=Math.max(0,Math.min(d,d-(c-a)));this.__adjustForScroll(this._layer,d)};return a}();e.exports=a}),null);
__d("ContextualDialogKeepInViewport",["AbstractContextualDialogKeepInViewportBehavior","Style"],(function(a,b,c,d,e,f){a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.__adjustForScroll=function(a,c){a=a.getContent();b("Style").set(a,"top",-c+"px")};return c}(b("AbstractContextualDialogKeepInViewportBehavior"));e.exports=a}),null);
__d("LayerMouseHooks",["Arbiter","ContextualThing","Event","Layer"],(function(a,b,c,d,e,f){var g=new(b("Arbiter"))();a=function(){"use strict";function a(a){this._layer=a,this._subscriptions=[],this._currentlyActive=!1}var c=a.prototype;c.enable=function(){var a=this;this._subscriptions=[g.subscribe("mouseenter",this._handleActive.bind(this)),g.subscribe("mouseleave",this._handleInactive.bind(this)),this._layer.subscribe("hide",function(){a._currentlyActive=!1})]};c.disable=function(){while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();this._subscriptions=[];this._currentlyActive=!1};c._handleActive=function(a,b){!this._currentlyActive&&this._isNodeWithinStack(b)&&(this._layer.inform("mouseenter",b),this._currentlyActive=!0)};c._handleInactive=function(a,b){this._currentlyActive&&((!b||!this._isNodeWithinStack(b))&&(this._layer.inform("mouseleave",b),this._currentlyActive=!1))};c._isNodeWithinStack=function(a){return b("ContextualThing").containsIncludingLayers(this._layer.getContentRoot(),a)};return a}();b("Layer").subscribe("show",function(a,c){var d=c.getContentRoot(),e=[b("Event").listen(d,"mouseenter",function(){g.inform("mouseenter",d)}),b("Event").listen(d,"mouseleave",function(a){g.inform("mouseleave",a.getRelatedTarget())})],f=c.subscribe("hide",function(){while(e.length)e.pop().remove();f.unsubscribe();e=f=null})});e.exports=a}),null);
__d("ContextualDialog",["csx","cx","invariant","AccessibleLayer","CSS","ContextualDialogARIA","ContextualDialogArrow","ContextualDialogDefaultTheme","ContextualDialogFitInViewport_PUSHSAFE","ContextualDialogKeepInViewport","ContextualLayer","DOM","Event","JSXDOM","LayerButtons","LayerFormHooks","LayerMouseHooks","LayerRefocusOnHide","Style","cr:971473","removeFromArray","shield"],(function(a,b,c,d,e,f,g,h,i,j){var k=0,l=300;a=function(a){babelHelpers.inheritsLoose(e,a);function e(b,c){b=a.call(this,b,c)||this;b._footer=null;return b}var f=e.prototype;f._configure=function(b,e){Object.assign(b,b.theme||d("ContextualDialogDefaultTheme"));var f=b.arrowBehavior||c("ContextualDialogArrow");b.addedBehaviors=b.addedBehaviors||[];b.addedBehaviors.push(f);a.prototype._configure.call(this,b,e);this._footer=c("DOM").scry(e,"div._572u")[0];this._footer&&(this._footer.children.length===1&&this._footer.children[0].nodeName==="DIV"&&this._footer.children[0].children.length===0?this._footer.parentNode.removeChild(this._footer):d("CSS").addClass(this.getContentRoot(),"_kc"));b.hoverContext&&this._registerHoverHandlers(b.hoverContext,b.hoverShowDelay,b.hoverHideDelay)};f._registerHoverHandlers=function(a,b,d){var e=this,f=b,g=d;f==null&&(f=k);g==null&&(g=l);var h,i;b=function(a){window.clearTimeout(i),h=window.setTimeout(c("shield")(e.show,e),f)};d=function(a){if(e._isHoverLocked())return;window.clearTimeout(h);i=window.setTimeout(e.hide.bind(e),g)};var j=c("Event").listen(a,"mouseenter",b),m=c("Event").listen(a,"mouseleave",d),n=this.subscribe("mouseenter",b),o=this.subscribe("mouseleave",d);this.subscribe("destroy",function(){window.clearTimeout(i),window.clearTimeout(h),j.remove(),m.remove(),n.unsubscribe(),o.unsubscribe()})};f._getDefaultBehaviors=function(){var d=a.prototype._getDefaultBehaviors.call(this);b("cr:971473")!=null&&c("removeFromArray")(d,b("cr:971473"));return d.concat([c("AccessibleLayer"),c("LayerRefocusOnHide"),c("ContextualDialogKeepInViewport"),c("ContextualDialogFitInViewport_PUSHSAFE"),c("LayerButtons"),c("LayerFormHooks"),c("LayerMouseHooks"),c("ContextualDialogARIA")])};f._buildWrapper=function(b,e){this._innerWrapper=c("JSXDOM").div(null,e);var f=a.prototype._buildWrapper.call(this,b,this._innerWrapper);if(b.wrapperClassName){var g=b.wrapperClassName.split(/\s+/);for(var g=g,h=Array.isArray(g),i=0,g=h?g:g[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var k;if(h){if(i>=g.length)break;k=g[i++]}else{i=g.next();if(i.done)break;k=i.value}k=k;d("CSS").addClass(f,k)}}this.replaceEntireLayerContents(e);this.getContent()===e||j(0,5783);this.setWidth(b.width);return f};f.getContentRoot=function(){!this._innerWrapper&&j(0,5784);return this._innerWrapper};f.setContent=function(a){j(0,5785)};f.replaceEntireLayerContents=function(a){this._content=null,c("DOM").empty(this.getContentRoot()),this.setInnerContent(a)};f.setInnerContent=function(a){d("CSS").addClass(a,"_53ij"),this.getContent()?c("DOM").replace(this.getContent(),a):c("DOM").appendContent(this.getContentRoot(),a),this._content=a,this.isShown()&&this.updatePosition()};f.setWidth=function(a){c("Style").set(this.getContentRoot(),"width",a?Math.floor(a)+"px":"");return this};f.getFooter=function(){return this._footer};f.lockHover=function(){this._hoverLocked=!0;return this};f.unlockHover=function(){this._hoverLocked=!1;return this};f._isHoverLocked=function(){return!!this._hoverLocked};e.setContext=function(a,b){a.setContext(b)};return e}(c("ContextualLayer"));g["default"]=a}),98);
__d("ReactAbstractContextualDialog",["ContextualDialog","ContextualDialogArrow","ContextualDialogKeepInViewport","LayerAutoFocus","LayerHideOnBlur","LayerHideOnEscape","LayerRefocusOnHide","ReactDOM","prop-types"],(function(a,b,c,d,e,f){a={createSpec:function(a){var c;return{displayName:a.displayName,propTypes:{position:(c=b("prop-types")).oneOf(["above","below","left","right"]),alignment:c.oneOf(["left","center","right"]),offsetX:c.number,offsetY:c.number,width:c.number,autoFocus:c.bool,focusContextOnHide:c.bool,arrowBehavior:c.func,behaviors:c.object,shown:c.bool,context:c.object,contextRef:c.func,dialogRole:c.oneOf(["dialog","region","alert"]),hoverContext:c.object,hoverContextRef:c.func,hoverShowDelay:c.number,hoverHideDelay:c.number,hideOnBlur:c.bool,hideOnEscape:c.bool,insertParent:c.object,keepInViewport:c.bool,label:c.node,labelledBy:c.string,onBeforeHide:c.func,onToggle:c.func,hasActionableContext:c.bool,"data-testid":c.string},immutableProps:{modal:null},createLayer:function(c){var d=this.props.context||b("ReactDOM").findDOMNode(this.props.contextRef()),e=this.props.hoverContext||this.props.hoverContextRef&&b("ReactDOM").findDOMNode(this.props.hoverContextRef());this.isHoverContextSet=e!=null;e=babelHelpers["extends"]({context:d,hoverContext:e,hoverShowDelay:this.props.hoverShowDelay,hoverHideDelay:this.props.hoverHideDelay,position:this.props.position,alignment:this.props.alignment,offsetX:this.props.offsetX,offsetY:this.props.offsetY,width:this.props.width,dialogRole:this.props.dialogRole,label:this.props.label,labelledBy:this.props.labelledBy,shouldSetARIAProperties:!this.props.hasActionableContext,arrowBehavior:this.props.arrowBehavior||b("ContextualDialogArrow"),addedBehaviors:this.enumerateBehaviors(this.props.behaviors),"data-testid":this.props["data-testid"]},a||{});e=new(b("ContextualDialog"))(e,c);this.props.contextBounds&&e.setContextWithBounds(d,this.props.contextBounds);this.props.autoFocus!==!1&&e.enableBehavior(b("LayerAutoFocus"));this.props.hideOnBlur===!0&&e.enableBehavior(b("LayerHideOnBlur"));this.props.hideOnEscape===!0&&e.enableBehavior(b("LayerHideOnEscape"));this.props.focusContextOnHide===!1&&e.disableBehavior(b("LayerRefocusOnHide"));this.props.keepInViewport===!1&&e.disableBehavior(b("ContextualDialogKeepInViewport"));this.props.onBeforeHide&&(this._onBeforeHideSubscription=e.subscribe("beforehide",this.props.onBeforeHide));this.props.insertParent&&e.setInsertParent(this.props.insertParent);e.conditionShow(this.props.shown);return e},receiveProps:function(a,c){this.updateBehaviors(c.behaviors,a.behaviors);var d=a.context||a.contextRef&&b("ReactDOM").findDOMNode(a.contextRef());d&&(a.contextBounds?this.layer.setContextWithBounds(d,a.contextBounds):this.layer.setContext(d));c.hideOnEscape!==a.hideOnEscape&&(a.hideOnEscape?this.layer.enableBehavior(b("LayerHideOnEscape")):this.layer.disableBehavior(b("LayerHideOnEscape")));c.onBeforeHide!==a.onBeforeHide&&(this.layer.unsubscribe(this._onBeforeHideSubscription),this._onBeforeHideSubscription=this.layer.subscribe("beforehide",a.onBeforeHide));this.layer.setPosition(a.position).setAlignment(a.alignment).setOffsetX(a.offsetX).setOffsetY(a.offsetY).setWidth(a.width);(!this.isHoverContextSet||a.shown!==void 0)&&this.layer.conditionShow(a.shown)}}}};e.exports=a}),null);
__d("XUIBlock",["cx","prop-types"],(function(a,b,c,d,e,f,g,h){d={background:c("prop-types").oneOf(["base-wash","light-wash","white","highlight","transparent"])};function a(){return{background:"transparent"}}function b(a){return(a.background==="base-wash"?"_4-u5":"")+(a.background==="light-wash"?" _57d8":"")+(a.background==="white"?" _4-u8":"")+(a.background==="highlight"?" _4-u7":"")}g.propTypes=d;g.getDefaultProps=a;g.getBackgroundClass=b}),98);
__d("XUICard.react",["cx","XUIBlock","joinClasses","react"],(function(a,b,c,d,e,f,g,h){var i=d("react");a=function(a){babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}var e=b.prototype;e.render=function(){var a=this.props;a.background;var b=a.children,e=a.className;a=babelHelpers.objectWithoutPropertiesLoose(a,["background","children","className"]);e=c("joinClasses")(e,"_4-u2",d("XUIBlock").getBackgroundClass(this.props));return i.jsx("div",babelHelpers["extends"]({},a,{className:e,children:b}))};return b}(i.Component);a.defaultProps=babelHelpers["extends"]({},d("XUIBlock").getDefaultProps(),{background:"white"});g["default"]=a}),98);
__d("XUIAmbientNUXBody.react",["cx","XUICloseButton.react","joinClasses","react"],(function(a,b,c,d,e,f,g,h){var i=d("react");a=function(a){babelHelpers.inheritsLoose(b,a);function b(){return a.apply(this,arguments)||this}var d=b.prototype;d.render=function(){var a=c("joinClasses")("_21es",this.props.className,this.props.noCloseButton?"_izg":null),b=this.props.noCloseButton?null:i.jsx(c("XUICloseButton.react"),{"data-testid":void 0,shade:"light",className:"layer_close_elem _36gl",onClick:this.props.onCloseButtonClick,onFocus:this.props.onFocus});return i.jsxs("div",{className:a,ref:this.props.bodyRef,children:[b,i.jsx("div",{className:"__xn",children:this.props.children})]})};return b}(i.Component);a.defaultProps={noCloseButton:!1};g["default"]=a}),98);
__d("XUIAmbientNUXDarkTheme",["cx"],(function(a,b,c,d,e,f,g,h){a="_6dh- _2x6q";b={offset:14,length:18};g.wrapperClassName=a;g.arrowDimensions=b}),98);
__d("XUIAmbientNUXTheme",["cx"],(function(a,b,c,d,e,f,g,h){a="_2x6q";b={offset:14,length:18};g.wrapperClassName=a;g.arrowDimensions=b}),98);
__d("XUIAmbientNUX.react",["fbt","ReactAbstractContextualDialog","ReactLayer","XUIAmbientNUXBody.react","XUIAmbientNUXDarkTheme","XUIAmbientNUXTheme","react","uniqueID"],(function(a,b,c,d,e,f,g,h){var i=d("react"),j=300,k=380,l=d("ReactLayer").createClass(d("ReactAbstractContextualDialog").createSpec({displayName:"XUIAmbientNUX",theme:d("XUIAmbientNUXTheme")})),m=d("ReactLayer").createClass(d("ReactAbstractContextualDialog").createSpec({displayName:"XUIAmbientNUX",theme:d("XUIAmbientNUXDarkTheme")}));a=function(a){babelHelpers.inheritsLoose(b,a);function b(){var b,d;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(b=d=a.call.apply(a,[this].concat(f))||this,d.$1=c("uniqueID")(),d.$2=c("uniqueID")(),b)||babelHelpers.assertThisInitialized(d)}var d=b.prototype;d.$3=function(){switch(this.props.width){case"wide":return k;case"custom":return this.props.customwidth;case"auto":return null;default:return j}};d.$4=function(){return h._("Learn about this new feature")};d.render=function(){var a=this.props.labelledBy,b=null,d=null;a||(b=i.jsx("div",{style:{clip:"rect(0, 0, 0, 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",width:1},id:this.$2,children:this.props.label||this.$4()},this.$2),a=this.$2);var e=h._("Close");d=i.jsx("a",{className:"layer_close_elem accessible_elem",href:"#",id:this.$1,"aria-label":e,"aria-labelledby":this.$1+" "+a,role:"button"},this.$1);e=this.props.useDarkMode?m:l;return i.jsx(e,{alignment:this.props.alignment,autoFocus:!1,behaviors:this.props.behaviors,context:this.props.context,contextRef:this.props.contextRef,dialogRole:"region",focusContextOnHide:!1,hasActionableContext:this.props.hasActionableContext,hideOnBlur:this.props.hideOnBlur,insertParent:this.props.insertParent,labelledBy:a,offsetX:this.props.offsetX,offsetY:this.props.offsetY,onBeforeHide:this.props.onBeforeHide,position:this.props.position,shown:this.props.shown,width:this.$3(),children:i.jsxs(c("XUIAmbientNUXBody.react"),{bodyRef:this.props.bodyRef,className:this.props.className,noCloseButton:this.props.noCloseButton,onCloseButtonClick:this.props.onCloseButtonClick,onFocus:this.props.onFocus,children:[this.props.children,b,this.props.noCloseButton?d:null]})})};return b}(i.Component);a.defaultProps={hasActionableContext:!1,hideOnBlur:!1,noCloseButton:!1,shown:!1,useDarkMode:!1,width:"normal"};g["default"]=a}),98);
__d("XUIDialog.react",["csx","AbstractDialog.react","LayerFadeOnShow","ReactLayer"],(function(a,b,c,d,e,f,g){a=b("ReactLayer").createClass(b("AbstractDialog.react").createSpec({displayName:"XUIDialog",addedBehaviors:{LayerFadeOnShow:b("LayerFadeOnShow")},titleClass:"._52c9",hideOnEscape:!0}));e.exports=a}),null);
__d("ContextualLayerHideOnScrollOut",["Event","SubscriptionsHandler"],(function(a,b,c,d,e,f,g){a=function(){function a(a){this.$1=a}var b=a.prototype;b.enable=function(){this.$4==null&&(this.$4=new(c("SubscriptionsHandler"))(),this.$4.addSubscriptions(this.$1.subscribe("contextchange",this.$5.bind(this)),this.$1.subscribe("show",this.$6.bind(this)),this.$1.subscribe("hide",this.$7.bind(this))))};b.disable=function(){this.$4!=null&&(this.$4.release(),this.$4=null),this.$7()};b.$6=function(){if(this.$2==null){this.$3=this.$1.getContextScrollParent();if(this.$3===window)return;this.$2=c("Event").listen(this.$3,"scroll",this.$8.bind(this))}};b.$7=function(){this.$2&&(this.$2.remove(),this.$2=null,this.$3=null)};b.$8=function(){var a=this.$3,b=this.$1;if(a==null||b==null)return;var c=b.getContent().getBoundingClientRect();a=a.getBoundingClientRect();var d=c.bottom<=a.top||c.top>=a.bottom;c=c.right<=a.left||c.left>=a.right;(d||c)&&b.hide()};b.$5=function(){this.detach!==null&&this.detach(),this.attach!=null&&this.$1.isShown()&&this.attach()};return a}();g["default"]=a}),98);
__d("ContextualDialogXUITheme",["cx"],(function(a,b,c,d,e,f,g,h){a="_53ii";b={offset:12,length:16};g.wrapperClassName=a;g.arrowDimensions=b}),98);
__d("OnVisible.react",["FBLogger","ReactDOM","intersectionObserverEntryIsIntersecting","observeIntersection","react"],(function(a,b,c,d,e,f,g){"use strict";var h=d("react");a=function(a){babelHelpers.inheritsLoose(b,a);function b(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.$1=null,c.$2=!1,c.$3=null,c.state={visible:!1},b)||babelHelpers.assertThisInitialized(c)}var e=b.prototype;e.componentDidMount=function(){this.$2=!0,this.$4()};e.componentDidUpdate=function(a){this.$4(a)};e.componentWillUnmount=function(){this.$2=!1,this.$5()};e.$4=function(a){var b=this,e;try{e=d("ReactDOM").findDOMNode(this)}catch(a){return}this.$3&&(!a||a.buffer!==this.props.buffer||e!==this.$1)&&this.$5();if(!this.$3){if(!(e instanceof Element)){this.$1=null;return}this.$1=e;this.$3=c("observeIntersection")(e,function(a){a=c("intersectionObserverEntryIsIntersecting")(a);var d=a?b.props.onVisible:b.props.onHidden;b.setState({visible:a});d&&d()},{rootMargin:this.props.buffer!=null?this.props.buffer+"px":"0px"})}};e.$5=function(){this.$3&&(this.$3.remove(),this.$3=null)};e.check=function(){c("FBLogger")("onvisible").mustfix("Deprecated method `check()` was called. Remove the call immediately.")};e.reset=function(){if(this.$2===!1)return;this.$5();this.$4()};e.render=function(){var a=this.props.children;a=typeof a==="function"?a(this.state.visible):a;return h.Children.only(a)};return b}(h.Component);g["default"]=a}),98);
__d("pullObject",[],(function(a,b,c,d,e,f){"use strict";function a(a,b,c){return a.reduce(function(a,d,e){a[c(d,e)]=b(d,e);return a},{})}f["default"]=a}),66);
__d("XBasicFBNuxGenShouldShowController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("ajax/megaphone/should_show_fbnux/index.html",{nux_id:{type:"Int",required:!0},should_log_view:{type:"Bool",defaultValue:!0},dependencies:{type:"IntVector"}})}),null);