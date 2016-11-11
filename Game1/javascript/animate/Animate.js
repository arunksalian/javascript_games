/**
 * Created by arun on 30/6/16.
 */
var Animate = function (block) {
    this.rotate = function () {
        block.direction = ((block.direction )%4) + 1;
        var delta;
        var direction = block.direction;
        if (block.type == Constants.blockType.TYPE_L) {
            delta = 2;
            switch (direction) {
                case 1 :
                    block.xMode = [-1,0,1,1];
                    block.yMode = [-2,-2,-2,-1];
                    break;
                case 2 :
                    block.xMode = [-1,-1,-1,-2];
                    block.yMode = [-1,0,1,1];
                    break;
                case 3 :
                    block.xMode = [0,0,1,2];
                    block.yMode = [-2,-1,-1,-1];
                    break;
                case 4:
                    block.xMode = [1,0,0,0];
                    block.yMode = [-1,-1,0,1];
                    break;
            }
        } else if (block.type == Constants.blockType.TYPE_T) {
            delta = 2;
            switch (direction) {
                case 1 :
                    block.xMode = [-1,0,1,0];
                    block.yMode = [-2, -2, -2, -1];
                    break;
                case 2 :
                    block.xMode = [0,0,0,-1];
                    block.yMode = [-1,0,1,0];
                    break;
                case 3 :
                    block.xMode = [-1,0,1,0];
                    block.yMode = [-1, -1, -1, -2];
                    break;
                case 4:
                    block.xMode = [1,1,1,2];
                    block.yMode = [-1,0,1,0];
                    break;
            }
        } else if (block.type == Constants.blockType.TYPE_FOUR) {
            delta = 2;
            switch (direction) {
                case 1 :
                    block.xMode = [-1,0,0,1];
                    block.yMode = [-2, -2, -1, -1];
                    break;
                case 2 :
                    block.xMode = [1,1,0,0];
                    block.yMode = [-1,0,0,1];
                    break;
                case 3 :
                    block.xMode = [-1,0,0,1];
                    block.yMode = [-2, -2, -1, -1];
                    break;
                case 4:
                    block.xMode = [1,1,0,0];
                    block.yMode = [-1,0,0,1];
                    break;
            }
        } else if (block.type == Constants.blockType.TYPE_LINE) {
            delta = 2;
            switch (direction) {
                case 1 :
                    block.xMode = [-2,-1,0,1];
                    block.yMode = [-2, -2, -2, -2];
                    break;
                case 2 :
                    block.xMode = [1,1,1,1];
                    block.yMode = [-1,0,1,2];
                    break;
                case 3 :
                    block.xMode = [-2,-1,0,1];
                    block.yMode = [-2, -2, -2, -2];
                    break;
                case 4:
                    block.xMode = [1,1,1,1];
                    block.yMode = [-1,0,1,2];
                    break;
            }

        }
        if (Constants.MAX_RIGHT <= block.getX(false)) {
            for (var i = 0; i < 4; i++) {
                block.xMode [i] -= delta;
            }
        } else if (Constants.MIN_LEFT >= block.getX(true)) {
            for (var i = 0; i < 4; i++) {
                block.xMode [i] += delta;
            }
        }
    }
}