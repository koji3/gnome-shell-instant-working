const Clutter = imports.gi.Clutter;
	const Lang = imports.lang;
	const Main = imports.ui.main;
	
	function Ext() {
		this._init.apply(this, arguments);
	}
	
	Ext.prototype = {
		_init: function(){
			this._panel = Main.panel;
			this._panelBinding = null;
		},
	
		disable: function() {
			if (this._panelBinding) {
				this._panel.actor.disconnect(this._panelBinding);
				this._panelBinding = null;
			}
		},
	
		enable: function() {
			this._panel.reactive = true;
			if (this._panelBinding) {
			// enabled twice in a row? should be impossible
				this.disable();
			}
			this._panelBinding = this._panel.actor.connect('scroll-event', Lang.bind(this, this._onScrollEvent));
		},
	
		_activate : function (index) {
			let metaWorkspace = global.screen.get_workspace_by_index(index);
			if (metaWorkspace) metaWorkspace.activate(true);
		},
	
		_onScrollEvent : function(actor, event) {
			this._activate(0);
		},
	}
	
	function init(meta) {
		let ext = new Ext();
		return ext;
	}
	
	function main() {
		init().enable();
	};
