
class TileMap extends egret.DisplayObjectContainer {

    public static TILE_SIZE: number = 53;
    public static TILE_BATTLE_SIZE: number = 80;

    _player: Player;
    _speed: number = 3;
    _block: egret.Bitmap;
    _astar: AStar;
    public _i: number;
    moveX: number[] = [];
    moveY: number[] = [];


    constructor(player: Player) {
        super();
        this.init();
        this._player = player;
        this._i = 0;
    }

    // public playerMove() {


    // }


    private init() {


        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
        }


        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            var localX = e.localX;
            var localY = e.localY;

            // var playerX = Math.floor(this._player._body.x / TileMap.TILE_SIZE);
            // var playerY = Math.floor(this._player._body.y / TileMap.TILE_SIZE);

            // // var playerX: number = 0;
            // // var playerY: number = 0;
            var gridX = Math.floor(localX / TileMap.TILE_SIZE);
            var gridY = Math.floor(localY / TileMap.TILE_SIZE);
            // this._astar = new AStar();
            // var grid = new Grid(12, 16, config);
            // grid.setStartNode(playerX, playerY);
            // grid.setEndNode(gridX, gridY);
            // //console.log(grid._nodes);
            // if (this._astar.findPath(grid)) {
            //     this._astar._path.map((tile) => {
            //         console.log(`x:${tile.x},y:${tile.y}`)
            //     });


            //     var path = this._astar._path;
            //     var current = path.shift();

            //     let ticker = () => {
            //         playerX = Math.floor(this._player._body.x / TileMap.TILE_SIZE);
            //         playerY = Math.floor(this._player._body.y / TileMap.TILE_SIZE);
            //         this._player._body.x += this._speed * (current.x - playerX);
            //         this._player._body.y += this._speed * (current.y - playerY);
            //         if (playerX == current.x && playerY == current.y) {
            //             this._player._body.x = current.x * TileMap.TILE_SIZE;
            //             this._player._body.y = current.y * TileMap.TILE_SIZE;

            //             if (this._astar._path.length == 0) {
            //                 egret.Ticker.getInstance().unregister(ticker, this);
            //             }
            //             else {
            //                 current = path.shift();
            //             }
            //         }
            //     }


            //     egret.Ticker.getInstance().register(ticker, this);
                 if (SceneService.getInstance().list.length!=0) {
                SceneService.getInstance().list.cancel();
                }
                SceneService.getInstance().list.addCommand(new WalkCommand(gridX,gridY));
                SceneService.getInstance().list.execute();

                // &&
                //                      this._player._body.x <= current.x * TileMap.TILE_SIZE + this._speed &&
                //                       this._player._body.x >= current.x * TileMap.TILE_SIZE - this._speed &&
                //                       this._player._body.y <= current.y * TileMap.TILE_SIZE + this._speed &&
                //                       this._player._body.y >= current.y * TileMap.TILE_SIZE - this._speed)


                // this._i = 1;
                // this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                // this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                // this._player.move(this.moveX[this._i], this.moveY[this._i]);
                // egret.Tween.get(this._player._body).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._player.idle() }, this);

                // var timer: egret.Timer = new egret.Timer(1000, this._astar._path.length - 2);
                // //注册事件侦听器
                // timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
                // //开始计时
                // timer.start();
            //}
        }, this);






    }

    private timerFunc() {
        this._i++;
        this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
        this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;

        this._player.move(this.moveX[this._i], this.moveY[this._i]);
        egret.Tween.get(this._player._body).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._player.idle() }, this);

    }
    private timerComFunc() {
        console.log("计时结束");
    }
}






var config: TileData[] = [

    { x: 0, y: 0, walkable: true, image: "Black_png" },
    { x: 1, y: 0, walkable: true, image: "Black_png" },
    { x: 2, y: 0, walkable: true, image: "Black_png" },
    { x: 3, y: 0, walkable: false, image: "White_png" },
    { x: 4, y: 0, walkable: true, image: "Black_png" },
    { x: 5, y: 0, walkable: true, image: "Black_png" },
    { x: 6, y: 0, walkable: true, image: "Black_png" },
    { x: 7, y: 0, walkable: false, image: "White_png" },
    { x: 8, y: 0, walkable: false, image: "White_png" },
    { x: 9, y: 0, walkable: true, image: "Black_png" },
    { x: 10, y: 0, walkable: true, image: "Black_png" },
    { x: 11, y: 0, walkable: true, image: "Black_png" },

    { x: 0, y: 1, walkable: true, image: "Black_png" },
    { x: 1, y: 1, walkable: false, image: "White_png" },
    { x: 2, y: 1, walkable: true, image: "Black_png" },
    { x: 3, y: 1, walkable: true, image: "Black_png" },
    { x: 4, y: 1, walkable: true, image: "Black_png" },
    { x: 5, y: 1, walkable: false, image: "White_png" },
    { x: 6, y: 1, walkable: true, image: "Black_png" },
    { x: 7, y: 1, walkable: false, image: "White_png" },
    { x: 8, y: 1, walkable: false, image: "White_png" },
    { x: 9, y: 1, walkable: true, image: "Black_png" },
    { x: 10, y: 1, walkable: false, image: "White_png" },
    { x: 11, y: 1, walkable: false, image: "White_png" },


    { x: 0, y: 2, walkable: true, image: "Black_png" },
    { x: 1, y: 2, walkable: true, image: "Black_png" },
    { x: 2, y: 2, walkable: true, image: "Black_png" },
    { x: 3, y: 2, walkable: false, image: "White_png" },
    { x: 4, y: 2, walkable: true, image: "Black_png" },
    { x: 5, y: 2, walkable: true, image: "Black_png" },
    { x: 6, y: 2, walkable: true, image: "Black_png" },
    { x: 7, y: 2, walkable: false, image: "White_png" },
    { x: 8, y: 2, walkable: false, image: "White_png" },
    { x: 9, y: 2, walkable: true, image: "Black_png" },
    { x: 10, y: 2, walkable: true, image: "Black_png" },
    { x: 11, y: 2, walkable: true, image: "Black_png" },

    { x: 0, y: 3, walkable: true, image: "Black_png" },
    { x: 1, y: 3, walkable: false, image: "White_png" },
    { x: 2, y: 3, walkable: true, image: "Black_png" },
    { x: 3, y: 3, walkable: true, image: "Black_png" },
    { x: 4, y: 3, walkable: true, image: "Black_png" },
    { x: 5, y: 3, walkable: false, image: "White_png" },
    { x: 6, y: 3, walkable: true, image: "Black_png" },
    { x: 7, y: 3, walkable: true, image: "Black_png" },
    { x: 8, y: 3, walkable: false, image: "White_png" },
    { x: 9, y: 3, walkable: false, image: "White_png" },
    { x: 10, y: 3, walkable: false, image: "White_png" },
    { x: 11, y: 3, walkable: true, image: "Black_png" },

    { x: 0, y: 4, walkable: true, image: "Black_png" },
    { x: 1, y: 4, walkable: true, image: "Black_png" },
    { x: 2, y: 4, walkable: true, image: "Black_png" },
    { x: 3, y: 4, walkable: false, image: "White_png" },
    { x: 4, y: 4, walkable: true, image: "Black_png" },
    { x: 5, y: 4, walkable: false, image: "White_png" },
    { x: 6, y: 4, walkable: true, image: "Black_png" },
    { x: 7, y: 4, walkable: true, image: "Black_png" },
    { x: 8, y: 4, walkable: false, image: "White_png" },
    { x: 9, y: 4, walkable: true, image: "Black_png" },
    { x: 10, y: 4, walkable: true, image: "Black_png" },
    { x: 11, y: 4, walkable: true, image: "Black_png" },

    { x: 0, y: 5, walkable: false, image: "White_png" },
    { x: 1, y: 5, walkable: false, image: "White_png" },
    { x: 2, y: 5, walkable: false, image: "White_png" },
    { x: 3, y: 5, walkable: false, image: "White_png" },
    { x: 4, y: 5, walkable: false, image: "White_png" },
    { x: 5, y: 5, walkable: false, image: "White_png" },
    { x: 6, y: 5, walkable: true, image: "Black_png" },
    { x: 7, y: 5, walkable: false, image: "White_png" },
    { x: 8, y: 5, walkable: false, image: "White_png" },
    { x: 9, y: 5, walkable: true, image: "Black_png" },
    { x: 10, y: 5, walkable: false, image: "White_png" },
    { x: 11, y: 5, walkable: false, image: "White_png" },

    { x: 0, y: 6, walkable: true, image: "Black_png" },
    { x: 1, y: 6, walkable: true, image: "Black_png" },
    { x: 2, y: 6, walkable: true, image: "Black_png" },
    { x: 3, y: 6, walkable: true, image: "Black_png" },
    { x: 4, y: 6, walkable: true, image: "Black_png" },
    { x: 5, y: 6, walkable: true, image: "Black_png" },
    { x: 6, y: 6, walkable: true, image: "Black_png" },
    { x: 7, y: 6, walkable: true, image: "Black_png" },
    { x: 8, y: 6, walkable: true, image: "Black_png" },
    { x: 9, y: 6, walkable: true, image: "Black_png" },
    { x: 10, y: 6, walkable: true, image: "Black_png" },
    { x: 11, y: 6, walkable: true, image: "Black_png" },

    { x: 0, y: 7, walkable: false, image: "White_png" },
    { x: 1, y: 7, walkable: false, image: "White_png" },
    { x: 2, y: 7, walkable: false, image: "White_png" },
    { x: 3, y: 7, walkable: false, image: "White_png" },
    { x: 4, y: 7, walkable: true, image: "Black_png" },
    { x: 5, y: 7, walkable: false, image: "White_png" },
    { x: 6, y: 7, walkable: false, image: "White_png" },
    { x: 7, y: 7, walkable: true, image: "Black_png" },
    { x: 8, y: 7, walkable: false, image: "White_png" },
    { x: 9, y: 7, walkable: true, image: "Black_png" },
    { x: 10, y: 7, walkable: false, image: "White_png" },
    { x: 11, y: 7, walkable: false, image: "White_png" },

    { x: 0, y: 8, walkable: true, image: "Black_png" },
    { x: 1, y: 8, walkable: false, image: "White_png" },
    { x: 2, y: 8, walkable: true, image: "Black_png" },
    { x: 3, y: 8, walkable: true, image: "Black_png" },
    { x: 4, y: 8, walkable: false, image: "White_png" },
    { x: 5, y: 8, walkable: true, image: "Black_png" },
    { x: 6, y: 8, walkable: false, image: "White_png" },
    { x: 7, y: 8, walkable: true, image: "Black_png" },
    { x: 8, y: 8, walkable: false, image: "White_png" },
    { x: 9, y: 8, walkable: true, image: "Black_png" },
    { x: 10, y: 8, walkable: false, image: "White_png" },
    { x: 11, y: 8, walkable: true, image: "Black_png" },

    { x: 0, y: 9, walkable: true, image: "Black_png" },
    { x: 1, y: 9, walkable: false, image: "White_png" },
    { x: 2, y: 9, walkable: true, image: "Black_png" },
    { x: 3, y: 9, walkable: false, image: "White_png" },
    { x: 4, y: 9, walkable: false, image: "White_png" },
    { x: 5, y: 9, walkable: true, image: "Black_png" },
    { x: 6, y: 9, walkable: true, image: "Black_png" },
    { x: 7, y: 9, walkable: true, image: "Black_png" },
    { x: 8, y: 9, walkable: false, image: "White_png" },
    { x: 9, y: 9, walkable: true, image: "Black_png" },
    { x: 10, y: 9, walkable: true, image: "Black_png" },
    { x: 11, y: 9, walkable: true, image: "Black_png" },

    { x: 0, y: 10, walkable: true, image: "Black_png" },
    { x: 1, y: 10, walkable: false, image: "White_png" },
    { x: 2, y: 10, walkable: true, image: "Black_png" },
    { x: 3, y: 10, walkable: true, image: "Black_png" },
    { x: 4, y: 10, walkable: true, image: "Black_png" },
    { x: 5, y: 10, walkable: true, image: "Black_png" },
    { x: 6, y: 10, walkable: false, image: "White_png" },
    { x: 7, y: 10, walkable: true, image: "Black_png" },
    { x: 8, y: 10, walkable: false, image: "White_png" },
    { x: 9, y: 10, walkable: false, image: "White_png" },
    { x: 10, y: 10, walkable: false, image: "White_png" },
    { x: 11, y: 10, walkable: true, image: "Black_png" },

    { x: 0, y: 11, walkable: true, image: "Black_png" },
    { x: 1, y: 11, walkable: true, image: "Black_png" },
    { x: 2, y: 11, walkable: true, image: "Black_png" },
    { x: 3, y: 11, walkable: true, image: "Black_png" },
    { x: 4, y: 11, walkable: true, image: "Black_png" },
    { x: 5, y: 11, walkable: true, image: "Black_png" },
    { x: 6, y: 11, walkable: true, image: "Black_png" },
    { x: 7, y: 11, walkable: true, image: "Black_png" },
    { x: 8, y: 11, walkable: false, image: "White_png" },
    { x: 9, y: 11, walkable: true, image: "Black_png" },
    { x: 10, y: 11, walkable: true, image: "Black_png" },
    { x: 11, y: 11, walkable: true, image: "Black_png" },

    { x: 0, y: 12, walkable: true, image: "Black_png" },
    { x: 1, y: 12, walkable: true, image: "Black_png" },
    { x: 2, y: 12, walkable: true, image: "Black_png" },
    { x: 3, y: 12, walkable: true, image: "Black_png" },
    { x: 4, y: 12, walkable: true, image: "Black_png" },
    { x: 5, y: 12, walkable: true, image: "Black_png" },
    { x: 6, y: 12, walkable: true, image: "Black_png" },
    { x: 7, y: 12, walkable: true, image: "Black_png" },
    { x: 8, y: 12, walkable: false, image: "White_png" },
    { x: 9, y: 12, walkable: true, image: "Black_png" },
    { x: 10, y: 12, walkable: true, image: "Black_png" },
    { x: 11, y: 12, walkable: true, image: "Black_png" },

    { x: 0, y: 13, walkable: true, image: "Black_png" },
    { x: 1, y: 13, walkable: true, image: "Black_png" },
    { x: 2, y: 13, walkable: true, image: "Black_png" },
    { x: 3, y: 13, walkable: true, image: "Black_png" },
    { x: 4, y: 13, walkable: true, image: "Black_png" },
    { x: 5, y: 13, walkable: true, image: "Black_png" },
    { x: 6, y: 13, walkable: true, image: "Black_png" },
    { x: 7, y: 13, walkable: true, image: "Black_png" },
    { x: 8, y: 13, walkable: false, image: "White_png" },
    { x: 9, y: 13, walkable: true, image: "Black_png" },
    { x: 10, y: 13, walkable: true, image: "Black_png" },
    { x: 11, y: 13, walkable: true, image: "Black_png" },

    { x: 0, y: 14, walkable: true, image: "Black_png" },
    { x: 1, y: 14, walkable: true, image: "Black_png" },
    { x: 2, y: 14, walkable: true, image: "Black_png" },
    { x: 3, y: 14, walkable: true, image: "Black_png" },
    { x: 4, y: 14, walkable: true, image: "Black_png" },
    { x: 5, y: 14, walkable: true, image: "Black_png" },
    { x: 6, y: 14, walkable: true, image: "Black_png" },
    { x: 7, y: 14, walkable: true, image: "Black_png" },
    { x: 8, y: 14, walkable: false, image: "White_png" },
    { x: 9, y: 14, walkable: true, image: "Black_png" },
    { x: 10, y: 14, walkable: true, image: "Black_png" },
    { x: 11, y: 14, walkable: true, image: "Black_png" },

    { x: 0, y: 15, walkable: true, image: "Black_png" },
    { x: 1, y: 15, walkable: true, image: "Black_png" },
    { x: 2, y: 15, walkable: true, image: "Black_png" },
    { x: 3, y: 15, walkable: true, image: "Black_png" },
    { x: 4, y: 15, walkable: true, image: "Black_png" },
    { x: 5, y: 15, walkable: true, image: "Black_png" },
    { x: 6, y: 15, walkable: true, image: "Black_png" },
    { x: 7, y: 15, walkable: true, image: "Black_png" },
    { x: 8, y: 15, walkable: false, image: "White_png" },
    { x: 9, y: 15, walkable: true, image: "Black_png" },
    { x: 10, y: 15, walkable: true, image: "Black_png" },
    { x: 11, y: 15, walkable: true, image: "Black_png" },
]



interface TileData {
    x: number;
    y: number;
    walkable: boolean;
    image: string;

}

class Tile extends egret.DisplayObjectContainer {

    data: TileData;

    constructor(data: TileData) {
        super();
        this.data = data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(data.image);
        bitmap.width = TileMap.TILE_SIZE;
        bitmap.height = TileMap.TILE_SIZE;
        this.x = data.x * TileMap.TILE_SIZE;
        this.y = data.y * TileMap.TILE_SIZE;
        this.addChild(bitmap);

    }


}




