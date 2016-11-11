/**
 * Created by arun on 29/6/16.
 */
var TetrisManager = function (container) {
    this.canvas;
    this.ctx;
    this.CURRENT_BLOCK = [];
    this.recycleManager ;
    this.init = function (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.recycleManager = new RecycleManager(this.CURRENT_BLOCK);
        this.registerEventLister(this.canvas);
       /* var block = new Block(Constants.blockType.TYPE_FOUR,this.ctx, container );
        block.create();
        block.fall();*/
        this.addBlock ();


    };

    this.hasLiveBlocks = function () {
        var blocks = this.CURRENT_BLOCK;
        if (blocks.length > 0) {

            for (var i=0; i< blocks.length; i++) {
                var block = blocks[i];
                if (block.IS_ALIVE) {
                    return true;
                }
            }
        }
        return false;
    };
    this.addBlock = function ( ) {
        if (!this.hasLiveBlocks()) {
            this.recycleManager.clean();
            var block = new Block(Utils.random(),this.ctx, container );
            this.CURRENT_BLOCK.push(block)
            block.create();
            block.fall();
        }

    };

    this.addBricks = function ( ) {

        var brick = new Brick(this.ctx, container);

        brick.create();
        brick.fall();
    };

    this.registerEventLister = function (element) {
        var current = this;
        element.addEventListener (Constants.event.BLOCK_GROUNDED, function (event) {
            
            current.addBlock();
        }, false);
    }
}
