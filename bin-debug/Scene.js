var SceneService = (function () {
    function SceneService() {
        this.observerList = [];
        SceneService.count++;
        if (SceneService.count > 1) {
            throw "singleton!!!";
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.addObserver = function (observer) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (observer == this.observerList[i])
                return ErrorCode.REPEAT_OBSERVER;
        }
        this.observerList.push(observer);
    };
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    SceneService.count = 0;
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService',["EventEmitter"]);
var GameScene = (function () {
    function GameScene() {
    }
    var d = __define,c=GameScene,p=c.prototype;
    GameScene.replaceScene = function (scene) {
        GameScene.scene = scene;
    };
    GameScene.getCurrentScene = function () {
        return GameScene.scene;
    };
    p.moveTo = function (x, y, callback) {
        var _this = this;
        console.log("开始移动");
        var playerX = Math.floor(GameScene.getCurrentScene().player._body.x / TileMap.TILE_SIZE);
        var playerY = Math.floor(GameScene.getCurrentScene().player._body.y / TileMap.TILE_SIZE);
        // var playerX: number = 0;
        // var playerY: number = 0;
        var gridX = x;
        var gridY = y;
        var astar = new AStar();
        var grid = new Grid(12, 16, config);
        grid.setStartNode(playerX, playerY);
        grid.setEndNode(gridX, gridY);
        //console.log(grid._nodes);
        if (astar.findPath(grid)) {
            astar._path.map(function (tile) {
                console.log("x:" + tile.x + ",y:" + tile.y);
            });
            var path = astar._path;
            var current = path.shift();
            var ticker_1 = function () {
                playerX = Math.floor(GameScene.getCurrentScene().player._body.x / TileMap.TILE_SIZE);
                playerY = Math.floor(GameScene.getCurrentScene().player._body.y / TileMap.TILE_SIZE);
                GameScene.getCurrentScene().player._body.x += 3 * (current.x - playerX);
                GameScene.getCurrentScene().player._body.y += 3 * (current.y - playerY);
                if (playerX == current.x && playerY == current.y) {
                    GameScene.getCurrentScene().player._body.x = current.x * TileMap.TILE_SIZE;
                    GameScene.getCurrentScene().player._body.y = current.y * TileMap.TILE_SIZE;
                    if (astar._path.length == 0) {
                        console.log("寻路完毕");
                        egret.Ticker.getInstance().unregister(ticker_1, _this);
                        egret.setTimeout(function () {
                            console.log("结束移动");
                            callback();
                        }, _this, 500);
                    }
                    else {
                        current = path.shift();
                    }
                }
            };
            egret.Ticker.getInstance().register(ticker_1, this);
        }
    };
    p.stopMove = function (callback) {
        console.log("取消移动");
        callback();
    };
    GameScene.scene = new GameScene();
    return GameScene;
}());
egret.registerClass(GameScene,'GameScene');
var PickHeroScene = (function () {
    function PickHeroScene() {
    }
    var d = __define,c=PickHeroScene,p=c.prototype;
    PickHeroScene.replaceScene = function (scene) {
        PickHeroScene.scene = scene;
    };
    PickHeroScene.getCurrentScene = function () {
        return PickHeroScene.scene;
    };
    p.showPick = function (stageW, main) {
        var _this = this;
        var pick = new egret.TextField();
        pick.textColor = 0xffffff;
        pick.width = stageW - 172;
        pick.textAlign = "center";
        pick.text = "选择进入一名纯形战士视角";
        pick.size = 36;
        pick.fontFamily = '黑体';
        pick.x = 90;
        pick.y = 400;
        main.addChild(pick);
        var sanjiao = new egret.TextField();
        sanjiao.textColor = 0xffffff;
        sanjiao.width = stageW - 172;
        sanjiao.textAlign = "center";
        sanjiao.text = "▲三角（善于迂回和远程输出）";
        sanjiao.size = 30;
        sanjiao.fontFamily = '黑体';
        sanjiao.x = 90;
        sanjiao.y = 600;
        main.addChild(sanjiao);
        sanjiao.touchEnabled = true;
        sanjiao.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.ad = "sanjiao_png";
            main.removeChild(pick);
            main.removeChild(sanjiao);
            main.removeChild(fangkuai);
            main.removeChild(zhengyuan);
            _this.gamestart(main);
        }, this);
        var fangkuai = new egret.TextField();
        fangkuai.textColor = 0xffffff;
        fangkuai.width = stageW - 172;
        fangkuai.textAlign = "center";
        fangkuai.text = "■方块（侵略性强并善于近战）";
        fangkuai.size = 30;
        fangkuai.fontFamily = '黑体';
        fangkuai.x = 90;
        fangkuai.y = 650;
        main.addChild(fangkuai);
        fangkuai.touchEnabled = true;
        fangkuai.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.ad = "fangkuai_png";
            main.removeChild(pick);
            main.removeChild(sanjiao);
            main.removeChild(fangkuai);
            main.removeChild(zhengyuan);
            _this.gamestart(main);
        }, this);
        var zhengyuan = new egret.TextField();
        zhengyuan.textColor = 0xffffff;
        zhengyuan.width = stageW - 172;
        zhengyuan.textAlign = "center";
        zhengyuan.text = "●正圆（兼具灵活性和消耗战）";
        zhengyuan.size = 30;
        zhengyuan.fontFamily = '黑体';
        zhengyuan.x = 90;
        zhengyuan.y = 700;
        main.addChild(zhengyuan);
        zhengyuan.touchEnabled = true;
        zhengyuan.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.ad = "zhengyuan_png";
            main.removeChild(pick);
            main.removeChild(sanjiao);
            main.removeChild(fangkuai);
            main.removeChild(zhengyuan);
            _this.gamestart(main);
        }, this);
    };
    p.gamestart = function (main) {
        var Dpanel_1 = new DialoguePanel("年轻纯种的纯形战士，我已经被腐化了，去找还有希望被拯救的形状吧");
        var Dpanel_2 = new DialoguePanel("我还有救，但变得不规则好像也没什么不好，先跟我较量看看吧");
        this.dp1 = Dpanel_1;
        this.dp2 = Dpanel_2;
        var NPC_1 = new NPC("NPC_1", "npc_1_png", TileMap.TILE_SIZE * 4, TileMap.TILE_SIZE * 4, this.dp1);
        var NPC_2 = new NPC("NPC_2", "npc_2_png", TileMap.TILE_SIZE * 6, TileMap.TILE_SIZE * 12, this.dp2);
        this.dp1.linkNPC = NPC_1;
        this.dp2.linkNPC = NPC_2;
        var task_0 = new Task("000", "对话任务", new NPCTalkTaskCondition());
        task_0.fromNpcId = "NPC_1";
        task_0.toNpcId = "NPC_2";
        task_0.desc = "救援伤残纯形几何体";
        task_0.NPCTaskTalk = "不要管我了，我不行了";
        task_0.total = 1;
        task_0.status = TaskStatus.ACCEPTABLE;
        var task_1 = new Task("001", "杀怪任务", new KillMonsterTaskCondition());
        task_1.fromNpcId = "NPC_2";
        task_1.toNpcId = "NPC_2";
        task_1.desc = "探寻下方的几何体";
        task_1.NPCTaskTalk = "哈哈哈哈哈，放荡不羁";
        task_1.total = 1;
        task_1.status = TaskStatus.UNACCEPTABLE;
        TaskService.getInstance().addTask(task_0);
        TaskService.getInstance().addTask(task_1);
        var mainPanel = new TaskPanel(50, 850);
        TaskService.getInstance().addObserver(mainPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
        this.dp1.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
        this.dp2.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
        // var monster_1: MockKillMonsterButton = new MockKillMonsterButton("egret_icon_png", "001");
        // this.addChild(monster_1);
        // monster_1.body.x = 350;
        // monster_1.body.y = 600;
        //var scenceService:SceneService = new SceneService();
        //SceneService.getInstance().addObserver(monster_1);
        SceneService.getInstance().addObserver(task_1.condition);
        var player = new Player(this.ad);
        GameScene.getCurrentScene().player = player;
        var map = new TileMap(GameScene.getCurrentScene().player);
        main.addChild(map);
        main.addChild(GameScene.getCurrentScene().player);
        GameScene.getCurrentScene().player.idle();
        main.addChild(mainPanel);
        main.addChild(NPC_1);
        main.addChild(NPC_2);
        main.addChild(this.dp1);
        main.addChild(this.dp2);
    };
    return PickHeroScene;
}());
egret.registerClass(PickHeroScene,'PickHeroScene');
//# sourceMappingURL=Scene.js.map