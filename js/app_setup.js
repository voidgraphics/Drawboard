( function(){

	"use strict";

	var app = {
		"canvas": null,
		"context": null,
		"width": null,
		"height": null
	}

	var _isCanvasSupported = function( $canvasElt ){
		return !!$canvasElt.getContext;
	}

	app.setup = function(){
		this.canvas = document.getElementById( "drawboard" );

		if( !_isCanvasSupported( this.canvas ) ){
			return console.error( "Canvas isn't supported!" );
		}

		this.context = this.canvas.getContext( "2d" );
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		var drawboard = new window.Drawboard( this );

	}

	app.setup();

} )()