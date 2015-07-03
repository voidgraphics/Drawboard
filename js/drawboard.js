( function(){

	"use strict";

	window.Drawboard = function( oApp ){

		var ctx = oApp.context,
			oSourceCanvasRect = oApp.canvas.getBoundingClientRect(),
			bIsClicked = false,
			oSocket = window.io();

		var draw = function( oEvent ){
			var iBrushSize = 10;
			var iBrushX = oEvent.clientX - oSourceCanvasRect.left - ( iBrushSize / 2 );
			var iBrushY = oEvent.clientY - oSourceCanvasRect.top - ( iBrushSize / 2 );
			ctx.beginPath();
			ctx.arc( iBrushX, iBrushY, iBrushSize, 0, Math.PI * 2 );
			ctx.closePath();
			ctx.fillStyle = "crimson";
			ctx.fill();
		};

		oApp.canvas.addEventListener( "mousedown", function( e ){
			bIsClicked = true;
			draw( e );
			oSocket.emit( "draw", { "X": e.clientX, "Y": e.clientY } );
		} );

		oApp.canvas.addEventListener( "mousemove", function( e ){
			if( bIsClicked ){
				draw( e );
				oSocket.emit( "draw", { "X": e.clientX, "Y": e.clientY } );
			}
		} );

		oApp.canvas.addEventListener( "mouseup", function(){
			bIsClicked = false;
		} );

		oSocket.on( "userDrew", function( data ){
			var oData = {
				"clientX": data.X,
				"clientY": data.Y
			}
			draw( oData );
		} );

	}

} )()