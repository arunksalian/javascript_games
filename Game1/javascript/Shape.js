/**
 * Created by arun on 28/6/16.
 */
var Shape = function (id ) {
    this.canvas;
    this.context;
    this.whiteSpace = "#FFFFFF";
    this.init = function () {
        this.canvas = document.getElementById(id);
        this.ctx=this.canvas.getContext("2d");
        

    };
    this.setContext = function (context) {
        this.ctx = context;
    };

    this.getContext = function () {
        return this.ctx ;
    };
    this.getCanvas = function () {
        return this.canvas;
    };
    this.drawRectangle = function (x, y, width, height) {
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke()
    };

    this.fillRectangle = function (x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

    };

    this.drawFrame = function (dimension) {
        var edge = dimension.edge;
        var color = dimension.color;

        this.fillRectangle(dimension.x, dimension.y, dimension.width, dimension.height, color);
        this.fillRectangle(dimension.x + edge, dimension.y + edge, dimension.width - (2* edge), dimension.height - (2* edge), this.whiteSpace);
    }

}