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
        console.log("开始移动");
        egret.setTimeout(function () {
            console.log("结束移动");
            callback();
        }, this, 500);
    };
    p.stopMove = function (callback) {
        console.log("取消移动");
        callback();
    };
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
        var NPC_1 = new NPC("NPC_1", "npc_1_png", 23.5 + 106, 23.5 + 5 * 53, Dpanel_1);
        var NPC_2 = new NPC("NPC_2", "npc_2_png", 23.5 + 5 * 53, 23.5 + 12 * 53, Dpanel_2);
        Dpanel_1.linkNPC = NPC_1;
        Dpanel_2.linkNPC = NPC_2;
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
        task_1.desc = "击败下方的几何体";
        task_1.NPCTaskTalk = "哈哈哈哈哈，放荡不羁";
        task_1.total = 1;
        task_1.status = TaskStatus.UNACCEPTABLE;
        TaskService.getInstance().addTask(task_0);
        TaskService.getInstance().addTask(task_1);
        var mainPanel = new TaskPanel(50, 500);
        TaskService.getInstance().addObserver(mainPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
        Dpanel_1.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
        Dpanel_2.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
        // var monster_1: MockKillMonsterButton = new MockKillMonsterButton("egret_icon_png", "001");
        // this.addChild(monster_1);
        // monster_1.body.x = 350;
        // monster_1.body.y = 600;
        //var scenceService:SceneService = new SceneService();
        //SceneService.getInstance().addObserver(monster_1);
        SceneService.getInstance().addObserver(task_1.condition);
        var player = new Player(this.ad);
        var map = new TileMap(player);
        main.addChild(map);
        main.addChild(player);
        player.idle();
        main.addChild(mainPanel);
        main.addChild(NPC_1);
        main.addChild(NPC_2);
        main.addChild(Dpanel_1);
        main.addChild(Dpanel_2);
    };
    return PickHeroScene;
}());
egret.registerClass(PickHeroScene,'PickHeroScene');
//# sourceMappingURL=Scene.js.map