/**
 * Created by arun on 28/6/16.
 */
var Designer = function () {
    this.shape ;
    this.container;
    this.init = function (id) {
        this.shape = new Shape(id);
        this.shape.init();
        this.canvasId = id;
        this.container = new Container(this.shape);
        this.container.init();
        this.startGame();
    };

    this.startGame = function () {
        var shape = this.shape;
        var tetrisManager = new TetrisManager(this.container);
        tetrisManager.init(shape.getContext(), shape.getCanvas());
    }

}
