var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap(player) {
        _super.call(this);
        this._speed = 3;
        this.moveX = [];
        this.moveY = [];
        this.init();
        this._player = player;
        this._i = 0;
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.init = function () {
        randomMap(testmap);
        //createMap(testmap);
        // console.log(testmap);
        for (var i = 0; i < testmap.length; i++) {
            var data = testmap[i];
            var tile = new Tile(data);
            this.addChild(tile);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var localX = e.localX;
            var localY = e.localY;
            var gridX = Math.floor(localX / TileMap.TILE_SIZE);
            var gridY = Math.floor(localY / TileMap.TILE_SIZE);
            if (SceneService.getInstance().list.length != 0) {
                SceneService.getInstance().list.cancel();
            }
            SceneService.getInstance().list.addCommand(new WalkCommand(gridX, gridY));
            SceneService.getInstance().list.execute();
            // 
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
    };
    // private timerFunc() {
    //     this._i++;
    //     this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
    //     this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
    //     this._player.move(this.moveX[this._i], this.moveY[this._i]);
    //     egret.Tween.get(this._player._body).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._player.idle() }, this);
    // }
    // private timerComFunc() {
    //     console.log("计时结束");
    // }
    p.addMonster = function () {
    };
    p.replaceMap = function (object) {
        var monstersXY;
        for (var i = 0; i < testmap.length; i++) {
            if (testmap[i].walkable == false && testmap[i].x == object.x / TileMap.TILE_SIZE && testmap[i].y == object.y / TileMap.TILE_SIZE) {
                testmap[i].walkable = true;
                testmap[i].image = "Black_png";
            }
        }
    };
    TileMap.TILE_SIZE = 53;
    TileMap.TILE_BATTLE_SIZE = 80;
    TileMap.TILE_SPEED = 4;
    TileMap.TILE_X = 11;
    TileMap.TILE_Y = 15;
    return TileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(TileMap,'TileMap');
function randomnum(a, b) {
    return a + Math.floor(Math.random() * b);
}
function checkNeighborWalls(tileData) {
    var count = 0;
    if (tileData.x == 0 || tileData.x == TileMap.TILE_X) {
        count++;
    }
    if (tileData.y == 0 || tileData.y == TileMap.TILE_Y) {
        count++;
    }
    if (tileData.x == 0 && tileData.y == 0) {
        count++;
    }
    if (tileData.x == 0 && tileData.y == TileMap.TILE_Y) {
        count++;
    }
    if (tileData.x == TileMap.TILE_X && tileData.y == 0) {
        count++;
    }
    if (tileData.x == TileMap.TILE_X && tileData.y == TileMap.TILE_Y) {
        count++;
    }
    config.forEach(function (element) {
        if (tileData.x > 0 && tileData.y > 0 && tileData.x < 11 && tileData.y < 15) {
            if (element.x == tileData.x + 1 && element.y == tileData.y && element.walkable == false) {
                count++;
            }
            if (element.x == tileData.x + 1 && element.y == tileData.y + 1 && element.walkable == false) {
                count++;
            }
            if (element.x == tileData.x && element.y == tileData.y + 1 && element.walkable == false) {
                count++;
            }
            if (element.x == tileData.x - 1 && element.y == tileData.y && element.walkable == false) {
                count++;
            }
            if (element.x == tileData.x - 1 && element.y == tileData.y - 1 && element.walkable == false) {
                count++;
            }
            if (element.x == tileData.x && element.y == tileData.y - 1 && element.walkable == false) {
                count++;
            }
        }
    });
    return count;
}
function randomMap(map) {
    map.forEach(function (element) {
        switch (Math.floor(Math.random() * 100) % 5) {
            case 0:
                element.walkable = true;
                element.image = "Black_png";
                break;
            case 1:
                element.walkable = true;
                element.image = "Black_png";
                break;
            case 2:
                element.walkable = true;
                element.image = "Black_png";
                break;
            case 3:
                element.walkable = false;
                element.image = "White_png";
                break;
            case 4:
                element.walkable = true;
                element.image = "Black_png";
                break;
        }
        if (element.x == 0 && element.y == 0) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == 1 && element.y == 1) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == 1 && element.y == 0) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == 0 && element.y == 1) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == UIScene.getCurrentScene().NPC_1.x / TileMap.TILE_SIZE && element.y == UIScene.getCurrentScene().NPC_1.y / TileMap.TILE_SIZE) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == UIScene.getCurrentScene().NPC_2.x / TileMap.TILE_SIZE && element.y == UIScene.getCurrentScene().NPC_2.y / TileMap.TILE_SIZE) {
            element.walkable = true;
            element.image = "Black_png";
        }
        if (element.x == 10 && element.y == 1) {
            element.walkable = true;
            element.image = "Black_png";
        }
    });
}
function createMap(map) {
    map.forEach(function (element) {
        var count = checkNeighborWalls(element);
        console.log(count);
        if (element.walkable == false) {
            if (count >= 4) {
                element.walkable = false;
                element.image = "White_png";
            }
            else {
                element.walkable = true;
                element.image = "Black_png";
            }
        }
        if (element.walkable == true) {
            if (count >= 5) {
                element.walkable = false;
                element.image = "White_png";
            }
        }
    });
}
function createWay(map, x, y) {
}
var testmap = [
    { x: 0, y: 0, walkable: true, image: "Black_png" },
    { x: 1, y: 0, walkable: true, image: "Black_png" },
    { x: 2, y: 0, walkable: true, image: "Black_png" },
    { x: 3, y: 0, walkable: true, image: "Black_png" },
    { x: 4, y: 0, walkable: true, image: "Black_png" },
    { x: 5, y: 0, walkable: true, image: "Black_png" },
    { x: 6, y: 0, walkable: true, image: "Black_png" },
    { x: 7, y: 0, walkable: true, image: "Black_png" },
    { x: 8, y: 0, walkable: true, image: "Black_png" },
    { x: 9, y: 0, walkable: true, image: "Black_png" },
    { x: 10, y: 0, walkable: true, image: "Black_png" },
    { x: 11, y: 0, walkable: true, image: "Black_png" },
    { x: 0, y: 1, walkable: true, image: "Black_png" },
    { x: 1, y: 1, walkable: true, image: "Black_png" },
    { x: 2, y: 1, walkable: true, image: "Black_png" },
    { x: 3, y: 1, walkable: true, image: "Black_png" },
    { x: 4, y: 1, walkable: true, image: "Black_png" },
    { x: 5, y: 1, walkable: true, image: "Black_png" },
    { x: 6, y: 1, walkable: true, image: "Black_png" },
    { x: 7, y: 1, walkable: true, image: "Black_png" },
    { x: 8, y: 1, walkable: true, image: "Black_png" },
    { x: 9, y: 1, walkable: true, image: "Black_png" },
    { x: 10, y: 1, walkable: true, image: "Black_png" },
    { x: 11, y: 1, walkable: true, image: "Black_png" },
    { x: 0, y: 2, walkable: true, image: "Black_png" },
    { x: 1, y: 2, walkable: true, image: "Black_png" },
    { x: 2, y: 2, walkable: true, image: "Black_png" },
    { x: 3, y: 2, walkable: true, image: "Black_png" },
    { x: 4, y: 2, walkable: true, image: "Black_png" },
    { x: 5, y: 2, walkable: true, image: "Black_png" },
    { x: 6, y: 2, walkable: true, image: "Black_png" },
    { x: 7, y: 2, walkable: true, image: "Black_png" },
    { x: 8, y: 2, walkable: true, image: "Black_png" },
    { x: 9, y: 2, walkable: true, image: "Black_png" },
    { x: 10, y: 2, walkable: true, image: "Black_png" },
    { x: 11, y: 2, walkable: true, image: "Black_png" },
    { x: 0, y: 3, walkable: true, image: "Black_png" },
    { x: 1, y: 3, walkable: true, image: "Black_png" },
    { x: 2, y: 3, walkable: true, image: "Black_png" },
    { x: 3, y: 3, walkable: true, image: "Black_png" },
    { x: 4, y: 3, walkable: true, image: "Black_png" },
    { x: 5, y: 3, walkable: true, image: "Black_png" },
    { x: 6, y: 3, walkable: true, image: "Black_png" },
    { x: 7, y: 3, walkable: true, image: "Black_png" },
    { x: 8, y: 3, walkable: true, image: "Black_png" },
    { x: 9, y: 3, walkable: true, image: "Black_png" },
    { x: 10, y: 3, walkable: true, image: "Black_png" },
    { x: 11, y: 3, walkable: true, image: "Black_png" },
    { x: 0, y: 4, walkable: true, image: "Black_png" },
    { x: 1, y: 4, walkable: true, image: "Black_png" },
    { x: 2, y: 4, walkable: true, image: "Black_png" },
    { x: 3, y: 4, walkable: true, image: "Black_png" },
    { x: 4, y: 4, walkable: true, image: "Black_png" },
    { x: 5, y: 4, walkable: true, image: "Black_png" },
    { x: 6, y: 4, walkable: true, image: "Black_png" },
    { x: 7, y: 4, walkable: true, image: "Black_png" },
    { x: 8, y: 4, walkable: true, image: "Black_png" },
    { x: 9, y: 4, walkable: true, image: "Black_png" },
    { x: 10, y: 4, walkable: true, image: "Black_png" },
    { x: 11, y: 4, walkable: true, image: "Black_png" },
    { x: 0, y: 5, walkable: true, image: "Black_png" },
    { x: 1, y: 5, walkable: true, image: "Black_png" },
    { x: 2, y: 5, walkable: true, image: "Black_png" },
    { x: 3, y: 5, walkable: true, image: "Black_png" },
    { x: 4, y: 5, walkable: true, image: "Black_png" },
    { x: 5, y: 5, walkable: true, image: "Black_png" },
    { x: 6, y: 5, walkable: true, image: "Black_png" },
    { x: 7, y: 5, walkable: true, image: "Black_png" },
    { x: 8, y: 5, walkable: true, image: "Black_png" },
    { x: 9, y: 5, walkable: true, image: "Black_png" },
    { x: 10, y: 5, walkable: true, image: "Black_png" },
    { x: 11, y: 5, walkable: true, image: "Black_png" },
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
    { x: 0, y: 7, walkable: true, image: "Black_png" },
    { x: 1, y: 7, walkable: true, image: "Black_png" },
    { x: 2, y: 7, walkable: true, image: "Black_png" },
    { x: 3, y: 7, walkable: true, image: "Black_png" },
    { x: 4, y: 7, walkable: true, image: "Black_png" },
    { x: 5, y: 7, walkable: true, image: "Black_png" },
    { x: 6, y: 7, walkable: true, image: "Black_png" },
    { x: 7, y: 7, walkable: true, image: "Black_png" },
    { x: 8, y: 7, walkable: true, image: "Black_png" },
    { x: 9, y: 7, walkable: true, image: "Black_png" },
    { x: 10, y: 7, walkable: true, image: "Black_png" },
    { x: 11, y: 7, walkable: true, image: "Black_png" },
    { x: 0, y: 8, walkable: true, image: "Black_png" },
    { x: 1, y: 8, walkable: true, image: "Black_png" },
    { x: 2, y: 8, walkable: true, image: "Black_png" },
    { x: 3, y: 8, walkable: true, image: "Black_png" },
    { x: 4, y: 8, walkable: true, image: "Black_png" },
    { x: 5, y: 8, walkable: true, image: "Black_png" },
    { x: 6, y: 8, walkable: true, image: "Black_png" },
    { x: 7, y: 8, walkable: true, image: "Black_png" },
    { x: 8, y: 8, walkable: true, image: "Black_png" },
    { x: 9, y: 8, walkable: true, image: "Black_png" },
    { x: 10, y: 8, walkable: true, image: "Black_png" },
    { x: 11, y: 8, walkable: true, image: "Black_png" },
    { x: 0, y: 9, walkable: true, image: "Black_png" },
    { x: 1, y: 9, walkable: true, image: "Black_png" },
    { x: 2, y: 9, walkable: true, image: "Black_png" },
    { x: 3, y: 9, walkable: true, image: "Black_png" },
    { x: 4, y: 9, walkable: true, image: "Black_png" },
    { x: 5, y: 9, walkable: true, image: "Black_png" },
    { x: 6, y: 9, walkable: true, image: "Black_png" },
    { x: 7, y: 9, walkable: true, image: "Black_png" },
    { x: 8, y: 9, walkable: true, image: "Black_png" },
    { x: 9, y: 9, walkable: true, image: "Black_png" },
    { x: 10, y: 9, walkable: true, image: "Black_png" },
    { x: 11, y: 9, walkable: true, image: "Black_png" },
    { x: 0, y: 10, walkable: true, image: "Black_png" },
    { x: 1, y: 10, walkable: true, image: "Black_png" },
    { x: 2, y: 10, walkable: true, image: "Black_png" },
    { x: 3, y: 10, walkable: true, image: "Black_png" },
    { x: 4, y: 10, walkable: true, image: "Black_png" },
    { x: 5, y: 10, walkable: true, image: "Black_png" },
    { x: 6, y: 10, walkable: true, image: "Black_png" },
    { x: 7, y: 10, walkable: true, image: "Black_png" },
    { x: 8, y: 10, walkable: true, image: "Black_png" },
    { x: 9, y: 10, walkable: true, image: "Black_png" },
    { x: 10, y: 10, walkable: true, image: "Black_png" },
    { x: 11, y: 10, walkable: true, image: "Black_png" },
    { x: 0, y: 11, walkable: true, image: "Black_png" },
    { x: 1, y: 11, walkable: true, image: "Black_png" },
    { x: 2, y: 11, walkable: true, image: "Black_png" },
    { x: 3, y: 11, walkable: true, image: "Black_png" },
    { x: 4, y: 11, walkable: true, image: "Black_png" },
    { x: 5, y: 11, walkable: true, image: "Black_png" },
    { x: 6, y: 11, walkable: true, image: "Black_png" },
    { x: 7, y: 11, walkable: true, image: "Black_png" },
    { x: 8, y: 11, walkable: true, image: "Black_png" },
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
    { x: 8, y: 12, walkable: true, image: "Black_png" },
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
    { x: 8, y: 13, walkable: true, image: "Black_png" },
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
    { x: 8, y: 14, walkable: true, image: "Black_png" },
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
    { x: 8, y: 15, walkable: true, image: "Black_png" },
    { x: 9, y: 15, walkable: true, image: "Black_png" },
    { x: 10, y: 15, walkable: true, image: "Black_png" },
    { x: 11, y: 15, walkable: true, image: "Black_png" },
];
var config = [
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
    { x: 8, y: 4, walkable: true, image: "Black_png" },
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
    { x: 8, y: 5, walkable: true, image: "Black_png" },
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
];
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(data) {
        _super.call(this);
        this.data = data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(data.image);
        bitmap.width = TileMap.TILE_SIZE;
        bitmap.height = TileMap.TILE_SIZE;
        this.x = data.x * TileMap.TILE_SIZE;
        this.y = data.y * TileMap.TILE_SIZE;
        this.addChild(bitmap);
    }
    var d = __define,c=Tile,p=c.prototype;
    return Tile;
}(egret.DisplayObjectContainer));
egret.registerClass(Tile,'Tile');
//# sourceMappingURL=Map.js.map