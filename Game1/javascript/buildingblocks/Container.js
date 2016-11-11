/**
 * Created by arun on 29/6/16.
 */
var Container = function (shape) {
    this.backgroundColor = "#FFFFFF";
    this.drawBorder = function (edge) {
        var dimension = {
            x : 0,
            y : 0,
            width : 100,
            height : 140,
            color : "#FFAA00",
            edge : edge
        }
        shape.drawFrame(dimension);
    };
    this.init = function () {
        this.drawBorder(Constants.DEFAULT_BORDER_WIDTH);
    };

    this.canIMove = function(prop, direction) {
        var status = false;
        var pixel = {};
        switch (direction) {
            case Constants.direction.UP:
                break;
            case Constants.direction.RIGHT:
                pixel.x = prop.x + 4;
                pixel.y = prop.y ;
                status = this.isLocationEmpty(pixel);
                break;
            case Constants.direction.DOWN:
                pixel.x = prop.x;
                pixel.y = prop.y + 4;
                status = this.isLocationEmpty(pixel);
                break;
            case Constants.direction.LEFT:
                pixel.x = prop.x - 4;
                pixel.y = prop.y ;
                status = this.isLocationEmpty(pixel);
                break;
        }
        return status;
    };

    this.isLocationEmpty = function (pixel) {
        var ctx = shape.getContext();
        var color = com.canvasutil.getPixelColor(ctx, pixel);
        return (this.backgroundColor.toLocaleLowerCase() == color.toLowerCase());
    }

    this.dispatchEvent = function (event) {
        shape.getCanvas().dispatchEvent(event);
    }
}