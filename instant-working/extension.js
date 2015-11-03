const Clutter = imports.gi.Clutter;
2	const Lang = imports.lang;
3	const Main = imports.ui.main;
4	
5	function Ext() {
6		this._init.apply(this, arguments);
7	}
8	
9	Ext.prototype = {
10		_init: function(){
11			this._panel = Main.panel;
12			this._panelBinding = null;
13		},
14	
15		disable: function() {
16			if (this._panelBinding) {
17				this._panel.actor.disconnect(this._panelBinding);
18				this._panelBinding = null;
19			}
20		},
21	
22		enable: function() {
23			this._panel.reactive = true;
24			if (this._panelBinding) {
25				// enabled twice in a row? should be impossible
26				this.disable();
27			}
28			this._panelBinding = this._panel.actor.connect('scroll-event', Lang.bind(this, this._onScrollEvent));
29		},
30	
31		_activate : function (index) {
32			let metaWorkspace = global.screen.get_workspace_by_index(index);
33			if (metaWorkspace) metaWorkspace.activate(true);
34		},
35	
36		_onScrollEvent : function(actor, event) {
37			this._activate(0);
38		},
39	}
40	
41	function init(meta) {
42		let ext = new Ext();
43		return ext;
44	}
45	
46	function main() {
47		init().enable();
48	};
