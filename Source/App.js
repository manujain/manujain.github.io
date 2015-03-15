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
