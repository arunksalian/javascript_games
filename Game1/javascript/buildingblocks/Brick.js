/**
 * Created by arun on 28/6/16.
 */

var Brick = function (ctx, container) {
    this.width = 10;
    this.height = 10;
    this.shape = new Shape();
    this.prop = {
        x : 48,
        y : 4,
        width : 4,
        height : 4,
        color : "#FFFFFF",
        borderColor : "#0000FF",
        edge : 0.5
    };
    this.IS_ALIVE = true;
    this.IS_RECYCLED = false;
    this.create = function (isChild) {
        this.shape.setContext(ctx);
        this.refresh();
        var current = this
        if (isChild == undefined) {
            window.addEventListener("keydown", function (event) {
                current.keyListener(event);
            }, false);
        }
    };

    this.move = function (horizontal, vertical) {
        var prop = this.prop;
        var pixel  = {
            x      : prop.x,
            y     :prop.y,
            width : prop.width,
            height : prop.height
        }
        ctx.clearRect(pixel.x, pixel.y, pixel.width, pixel.height, 150);
        prop.x += horizontal;
        prop.y += vertical;
        this.refresh();
        ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height, prop.color);
    };
    this.clearMe = function () {
        var prop = this.prop;
        var pixel  = {
            x      : prop.x,
            y     :prop.y,
            width : prop.width,
            height : prop.height
        };
        ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height, prop.color);
    }
    this.refresh = function () {
        var prope = this.prop;
        var edge = this.prop.edge;
        this.shape.fillRectangle(prope.x, prope.y, prope.width, prope.height, prope.borderColor);
        this.shape.fillRectangle(prope.x+edge, prope.y+edge, prope.width-(2*edge), prope.height-(2*edge), prope.color);
    };


    this.sideShift = function (shift) {
           this.move(shift, 0)
    };

    this.downShift = function (shift) {
        this.move(0, shift)
    };

    this.keyListener = function (event) {
        if (!this.IS_ALIVE) {
            return;
        }
        var code = event.keyCode;
        var current = this;
        switch (code) {
            case 37: {
                if (container.canIMove(this.prop, Constants.direction.LEFT) === false)  {
                    return
                }
                this.sideShift (-1 * Constants.DEFAULT_SHIFT);
                break; //Left key
            }
            case 38: {

                break; //Up key
            }
            case 39: {
                if (container.canIMove(this.prop, Constants.direction.RIGHT) === false)  {
                    return
                }
                this.sideShift (Constants.DEFAULT_SHIFT);
                console.log("Right");
                break;
            }//Right key
            case 40: {
                if (this.prop.y >= Constants.MAX_HEIGHT -2) {
                    return
                }
                this.downShift (Constants.DEFAULT_SHIFT);
                break; //Down key
            }
            default: console.log(code);
        }
    };

    this.canIMove = function (direction) {
        return container.canIMove(this.prop, direction)
    };

    this.fall = function () {
        var prop = this.prop;
        if (container.canIMove(prop, Constants.direction.DOWN) === false) {
            this.IS_ALIVE = false;
            var event = new CustomEvent(Constants.event.ELEMENT_GROUNDED, {target : this});
            container.dispatchEvent(event)
            return;

        }
        this.move(0,  4)
        var brick = this;
        setTimeout(function(){
            brick.fall ();
        }, 500);
    };

    this.blindFall = function () {
        var prop = this.prop;
        this.move(0,  4)
        var brick = this;
        setTimeout(function(){
            brick.fall ();
        }, 500);
    };

    this.amInLine = function (lineNumber) {
        if (this.prop.y == Constants.MAX_HEIGHT -(lineNumber * Constants.DEFAULT_BORDER_WIDTH)) {
            return true;
        }
        return false;
    };

    this.moveOneStep = function (lineNumber) {
        var myLineNumber = this.getMyLineNumber();
        if (myLineNumber >= lineNumber && this.IS_RECYCLED == false) {
            this.move(0, Constants.DEFAULT_SHIFT);
        }
        if (myLineNumber <= 0 ) {
            this.IS_RECYCLED = true;
        }
    };

    this.getMyLineNumber = function () {
        return ( Constants.MAX_HEIGHT - this.prop.y )/Constants.DEFAULT_BORDER_WIDTH;
    };

    this.amInFloor = function () {
        if (this.prop.y >= Constants.MAX_HEIGHT -2) {
            return true;
        }
        return false;
    }

}
