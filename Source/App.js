var cesiumWidget = new Cesium.Viewer('cesiumContainer', {
	/*Terrain is provided i.e 3D view of terrains.
	  Type 'death valley' in the search box.
	  Now change the camera view using 'ctrl + mouse movement' to look it from sideway.
	  You can see uphills and downhills terrain.
	*/
	terrainProvider : new Cesium.CesiumTerrainProvider({
        url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
    }),
    baseLayerPicker : false
});

var scene = cesiumWidget.scene;
var canvas = cesiumWidget.canvas;
canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = scene.globe.ellipsoid;

// disable the default event handlers
scene.screenSpaceCameraController.enableRotate = true;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = false;
scene.screenSpaceCameraController.enableTilt = true;
scene.screenSpaceCameraController.enableLook = false;

var startMousePosition;
var mousePosition;
var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};

var handler = new Cesium.ScreenSpaceEventHandler(canvas);

/*handler.setInputAction(function(movement) {
    flags.looking = true;
    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

handler.setInputAction(function(movement) {
    mousePosition = movement.endPosition;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function(position) {
    flags.looking = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);
*/
function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
    case 38://charCodeAt(0):
        return 'moveForward';
    case 40://charCodeAt(0):
        return 'moveBackward';
    case 'W'.charCodeAt(0):
        return 'moveUp';
    case 'S'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    default:
        return undefined;
    }
}

document.addEventListener('keydown', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}, false);

document.addEventListener('keyup', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}, false);

cesiumWidget.clock.onTick.addEventListener(function(clock) {
    var camera = cesiumWidget.camera;

    /*if (flags.looking) {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        var x = (mousePosition.x - startMousePosition.x) / width;
        var y = -(mousePosition.y - startMousePosition.y) / height;

        var lookFactor = 0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
    }*/

    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
    var moveRate = cameraHeight / 100.0;

    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
});
