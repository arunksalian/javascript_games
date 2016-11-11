/**
 * Created by arun on 29/6/16.
 */
var Block = function (type, ctx, container) {
    var current = this;
    var d = Constants.DEFAULT_BORDER_WIDTH;
    var xMode;
    var yMode;
    switch (type) {
        case Constants.blockType.TYPE_SQURE : {
            current.bricks = [];
            xMode = [0,1,1,0];
            yMode = [0,0,1,1];

            break ;
        };
        case Constants.blockType.TYPE_L : {
            current.bricks = [];
            xMode = [0,1,2,2];
            yMode = [0,0,0,1];

            break ;
        };
        case Constants.blockType.TYPE_T : {
            current.bricks = [];
            xMode = [0,1,2,1];
            yMode = [0,0,0,1];

            break ;
        };
        case Constants.blockType.TYPE_FOUR : {
            current.bricks = [];
            xMode = [0,1,1,2];
            yMode = [0,0,1,1];

            break ;
        };
        case Constants.blockType.TYPE_LINE : {
            current.bricks = [];
            xMode = [-1,0,1,2];
            yMode = [0,0,0,0];
        }
    }


    this.type = type;
    this.bricks;
    this.xMode = xMode;
    this.yMode = yMode;
    this.direction = 1;
    this.IS_ALIVE = true;
    this.IS_RECYCLED = false;
    this.animation;
    this.createBricks = function () {
        var firstX, firstY;

        for(var i=0;i<4;i++) {
            var brick;
            if (this.bricks[i] !== undefined) {
                brick = this.bricks[i];
                if (i == 0) {
                   firstX = brick.prop.x;
                   firstY = brick.prop.y;

                } else {
                    brick.prop.x = firstX;
                    brick.prop.y = firstY;
                }
            } else {
                brick = new Brick(ctx, container);
                this.bricks.push(brick)
            }

            brick.prop.x += d *this.xMode[i];
            brick.prop.y += d *this.yMode[i];

        }
        this.bricks.sort(function (a, b) {
            return a.prop.y < b.prop.y ?  1 : -1;
        })
    };

    this.getX = function (isMin) {
        var x = this.bricks[0].prop.x;
        for(var i=1;i<4;i++) {
            var tmpX = this.bricks[i].prop.x;
            if (isMin === true && x > tmpX) {
                x = tmpX;
            } else if (isMin === false && x < tmpX) {
                x = tmpX;
            }
        }
        return x;
    };

    this.getY = function (isMin) {
        var y = this.bricks[0].prop.y;
        for(var i=1;i<4;i++) {
            var tmpY = this.bricks[i].prop.y;
            if (isMin === true && y > tmpY) {
                y = tmpY;
            } else if (isMin === false && y < tmpY) {
                y = tmpY;
            }
        }
        return y;
    };

    this.create = function () {
        this.createBricks();
        var isChild = true;
        var current = this

        this.animation = new Animate(this);
        for(var i=0;i<4;i++) {
            this.bricks[i].create(isChild);
        }
        this.refresh();
        window.addEventListener("keydown", function (event) {
            current.keyListener(event);
        }, false);
    };

    this.fall = function () {
        try {
            this.bricks.sort(function (a, b) {
                return a.prop.y < b.prop.y ? 1 : -1;
            })
            for (var i = 0; i < 4; i++) {
                var brick = this.bricks[i];
                if (brick.canIMove(Constants.direction.DOWN) == true) {
                    brick.move(0, Constants.DEFAULT_SHIFT);
                } else {
                    this.IS_ALIVE = false;
                    break;
                }
            }
            if (this.IS_ALIVE === false) {
                var event = new CustomEvent(Constants.event.BLOCK_GROUNDED, {target: this});
                container.dispatchEvent(event)
                return;
            }
            var current = this;
            setTimeout(function () {
                current.fall();
            }, 500);
        }catch (error) {
            console.log("error:"+error)
        }

    };

    this.refresh = function () {
        for(var i=0;i<4;i++) {
            console.log(this.bricks[i].prop.x+","+this.bricks[i].prop.y)
            this.bricks[i].refresh();
        }
    };

    this.sideShift = function (shift) {
        if (shift < 0) {
            this.bricks.sort(function (a, b) {
                return a.prop.x > b.prop.x ?  1 : -1;
            })
        } else {
            this.bricks.sort(function (a, b) {
                return a.prop.x < b.prop.x ?  1 : -1;
            })
        }
        for(var i=0;i<4;i++) {
            this.bricks[i].move(shift, 0);
        }

    };

    this.clearMe = function () {
        for(var i=0;i<4;i++) {
            this.bricks[i].clearMe();
        }
    }

    this.rotate = function () {
        this.clearMe ();
        this.animation.rotate();
        this.createBricks();
        this.refresh();
    };

    this.downShift = function (shift) {
        this.fall()
    };

    this.keyListener = function (event) {
        if (!this.IS_ALIVE) {
            return;
        }
        var code = event.keyCode;
        var current = this;
        switch (code) {
            case 37: {
                var prop = {
                    x : current.getX(true),
                    y : current.getY(false)
                };
                if (container.canIMove(prop, Constants.direction.LEFT) === false)  {
                    return
                }
                this.sideShift (-1 * Constants.DEFAULT_SHIFT);
                break; //Left key
            }
            case 38: {
                this.rotate();
                break; //Up key
            }
            case 39: {
                var prop = {
                    x : current.getX(false),
                    y : current.getY(false)
                };
                if (container.canIMove(prop, Constants.direction.RIGHT) === false)  {
                    return
                }
                current.sideShift (Constants.DEFAULT_SHIFT);
                console.log("Right");
                break;
            }//Right key
            case 40: {
                var prop = {
                    x : current.getX(false),
                    y : current.getY(false)
                };
                if (prop.y >= Constants.MAX_HEIGHT -2) {
                    return
                }
                current.downShift (Constants.DEFAULT_SHIFT);
                break; //Down key
            }
            default: console.log(code);
        }
    };

    this.getBrcksInLine = function (lineNumber) {
        var floorBricks = [];
        for (var i in this.bricks) {
            var brick = this.bricks[i];
            if (brick.amInLine(lineNumber) == true && brick.IS_RECYCLED == false){
                floorBricks.push(brick);
            }
        }
        return floorBricks;
    };

    this.moveOneStep = function (lineNumber) {
        var recycleCount = 0
        for (var i = 0; i < 4; i++) {
            var brick = this.bricks[i];
            if (brick.IS_RECYCLED == false) {
                brick.move(0, Constants.DEFAULT_SHIFT);
            } else {
                recycleCount++;
            }
        }
        if (recycleCount == 4) {
            this.IS_RECYCLED = true;
        }
    }

}