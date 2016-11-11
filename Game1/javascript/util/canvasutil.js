/**
 * Created by arun on 29/6/16.
 */
com.canvasutil = function () {

    var getPixelColor = function (context, prop) {
        var p = context.getImageData(prop.x, prop.y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

        return hex;

    };

    var rgbToHex = function (r, g, b){
        //console.log(rgb[0]+", "+rgb[1] + rgb[2])
        return ((r << 16) | (g << 8) | b ).toString(16);
    };


    return {
        getPixelColor : function (context, prop) {
            return getPixelColor(context, prop);
        }
    }
} ();