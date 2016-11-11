/**
 * Created by arun on 1/7/16.
 */
var RecycleManager = function (stack) {
    this.clean = function () {
        for (var i =0; i< 15; i++) {
            this.scanAndClean (i);
        }


    };

    this.scanAndClean = function (lineNumber) {
        var lastLine = [];
        for (var i in stack) {
            var bricks = stack[i].getBrcksInLine(lineNumber);
            lastLine = lastLine.concat(bricks);
            //clearMe
            console.log(lastLine.length);
        }
        if (lastLine.length == 23) {
            for (var i in lastLine) {
                var bricks = lastLine[i];
                bricks.IS_RECYCLED = true;
                bricks.clearMe();

            }
            this.moveAllByStep(lineNumber);
        }
    }
    this.moveAllByStep = function (lineNumber) {
        for (var i in stack) {
            var block = stack[i];
            block.moveOneStep(lineNumber);

        }
    }
}
