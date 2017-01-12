var Item = (function (_super) {
    __extends(Item, _super);
    function Item(name, ad, atk, x, y) {
        var _this = this;
        _super.call(this);
        this._body = new egret.Bitmap();
        this._body.texture = RES.getRes(ad);
        this._body.width = TileMap.TILE_SIZE;
        this._body.height = TileMap.TILE_SIZE;
        this.name = name;
        this.ad = ad;
        this.atk = atk;
        this.x = x;
        this.y = y;
        this.addChild(this._body);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onItemClick();
        }, this);
    }
    var d = __define,c=Item,p=c.prototype;
    p.onChange = function () {
    };
    p.onItemClick = function () {
        if (SceneService.getInstance().list, length != 0) {
            SceneService.getInstance().list.cancel();
        }
        SceneService.getInstance().list.addCommand(new WalkCommand(Math.floor(this.x / TileMap.TILE_SIZE), Math.floor(this.y / TileMap.TILE_SIZE)));
        SceneService.getInstance().list.addCommand(new EquipCommand(this.name, this.ad, this.atk));
        SceneService.getInstance().list.execute();
    };
    return Item;
}(egret.DisplayObjectContainer));
egret.registerClass(Item,'Item',["Observer"]);
var NPC = (function (_super) {
    __extends(NPC, _super);
    //public NPCTalk:string;
    // public task:Task;
    function NPC(id, ad, x, y, dia) {
        _super.call(this);
        this.fighted = false;
        this.dialoguePanel = dia;
        this._body = new egret.Bitmap();
        this._emoji = new egret.Bitmap();
        this._body.texture = RES.getRes(ad);
        this._emoji.texture = RES.getRes("notice_png");
        this._id = id;
        this.x = x;
        this.y = y;
        this._body.width = this._body.width / 2;
        this._body.height = this._body.height / 2;
        this._emoji.width = 70;
        this._emoji.height = 70;
        this._emoji.y = -60;
        this._emoji.x = -5;
        this._emoji.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNPCClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE && this._id == task.fromNpcId) {
            this._emoji.texture = RES.getRes("notice_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.DURING && this._id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.DURING && this._id == task.toNpcId) {
            this._emoji.texture = RES.getRes("question_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.fromNpcId) {
            this._emoji.texture = RES.getRes("question_png");
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this._id == task.toNpcId) {
            this._emoji.texture = RES.getRes("question_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.SUBMITED && this._id == task.toNpcId) {
            this._emoji.alpha = 0;
        }
    };
    p.onNPCClick = function () {
        TaskService.getInstance().accept();
        if (SceneService.getInstance().list, length != 0) {
            SceneService.getInstance().list.cancel();
        }
        SceneService.getInstance().list.addCommand(new WalkCommand(Math.floor(this.x / TileMap.TILE_SIZE), Math.floor(this.y / TileMap.TILE_SIZE)));
        SceneService.getInstance().list.addCommand(new TalkCommand(this._id));
        SceneService.getInstance().list.execute();
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    //task:Task
    function TaskPanel(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0x000000, 0.4);
        this.body.graphics.drawRect(0, 0, 600, 100);
        this.body.graphics.endFill();
        this.textField = new egret.TextField();
        this.textField.text = "   任务进程    ";
        this.textField.x = 0;
        this.textField.x = 0;
        this.textField2 = new egret.TextField();
        this.textField2.text = "  任务状态    ";
        this.textField2.x = 0;
        this.textField2.y = 30;
        this.textField3 = new egret.TextField();
        this.textField2.text = "      ";
        this.textField3.x = 0;
        this.textField3.y = 55;
        this.addChild(this.body);
        this.addChild(this.textField);
        this.addChild(this.textField2);
        this.addChild(this.textField3);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        console.log(task);
        this.textField.text = task.desc;
        var tf;
        switch (task.status) {
            case 0:
                tf = "未可接受";
                break;
            case 1:
                tf = "可接受";
                break;
            case 2:
                tf = "进行中";
                break;
            case 3:
                tf = "可完成";
                break;
            case 4:
                tf = "已完成";
                break;
        }
        this.textField2.text = task.name + " :" + tf;
        if (task.type == TaskType.Kill) {
            this.textField3.text = task.name + " :" + task.getcurrent() + "/" + task.total;
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(talk) {
        _super.call(this);
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0x000000, 0.7);
        this.body.graphics.drawRect(0, 0, 600, 172);
        this.body.graphics.endFill();
        this.body.y = 450;
        this.textField = new egret.TextField();
        this.textField.text = talk;
        this.button = new Button("close_png");
        this.textField.x = 80;
        this.textField.y = 500;
        this.button.width = 40;
        this.button.height = 40;
        this.button.x = 500;
        this.button.y = 550;
        this.button.touchEnabled = true;
        this.body.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.showDpanel = function () {
        this.addChild(this.body);
        this.addChild(this.button);
        this.addChild(this.textField);
    };
    p.updateViewByTask = function (task) {
        this.currentTask = task;
        if (this.currentTask.id == "001" && this.linkNPC._id == "NPC_2") {
            this.textField.text = "变得不规则挺好的，哈哈哈，来跳舞吧！";
        }
        if (this.currentTask.status == TaskStatus.CAN_SUBMIT && this.currentTask.status == TaskStatus.SUBMITED) {
            this.textField.text = this.currentTask.NPCTaskTalk;
        }
    };
    p.disshowDpanel = function () {
        this.removeChild(this.body);
        this.removeChild(this.button);
        this.removeChild(this.textField);
    };
    p.onButtonClick = function () {
        this.disshowDpanel();
        switch (this.currentTask.status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept(this.currentTask.id);
                // if (this.currentTask.id == "000") {
                //     TaskService.getInstance().finish(this.currentTask.id);
                //     if (TaskService.getInstance().getNextTask() != null) {
                //         TaskService.getInstance().getNextTask().status = TaskStatus.ACCEPTABLE;
                //         TaskService.getInstance().notify(TaskService.getInstance().getNextTask());
                //     }
                //     if (TaskService.getInstance().getTaskByCustomRule() != null) {
                //         this.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
                //         TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
                //     }
                // }
                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish(this.currentTask.id);
                if (TaskService.getInstance().getNextTask() != null) {
                    TaskService.getInstance().getNextTask().status = TaskStatus.ACCEPTABLE;
                }
                if (TaskService.getInstance().getTaskByCustomRule() != null) {
                    console.log(TaskService.getInstance().getTaskByCustomRule());
                    this.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
                    TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
                }
                break;
            default:
                break;
        }
        if (this.linkNPC._id == "NPC_2" && this.linkNPC.fighted == false) {
            if (SceneService.getInstance().list, length != 0) {
                SceneService.getInstance().list.cancel();
            }
            SceneService.getInstance().list.addCommand(new FightCommand("npc_2_png"));
            SceneService.getInstance().list.execute();
        }
        else {
            this.textField.text = "我投降";
        }
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(ad, linkTask) {
        var _this = this;
        _super.call(this);
        this.count = 0;
        this.ad = ad;
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.body.width = TileMap.TILE_SIZE;
        this.body.height = TileMap.TILE_SIZE;
        this.linkTask = linkTask;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
        this.addChild(this.body);
        egret.Ticker.getInstance().register(function () {
            if (_this.count < 5) {
                _this.body.scaleY *= 1.01;
            }
            else if (_this.count < 10 || _this.count >= 5) {
                _this.body.scaleY /= 1.01;
            }
            _this.count += 0.5;
            if (_this.count >= 10) {
                _this.count = 0;
            }
        }, this);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.onButtonClick = function () {
        if (SceneService.getInstance().list, length != 0) {
            SceneService.getInstance().list.cancel();
        }
        SceneService.getInstance().list.addCommand(new WalkCommand(Math.floor(this.x / TileMap.TILE_SIZE), Math.floor(this.y / TileMap.TILE_SIZE)));
        SceneService.getInstance().list.addCommand(new FightCommand(this.ad));
        SceneService.getInstance().list.execute();
    };
    p.onChange = function () {
        if (this.linkTask != null) {
            if (TaskService.getInstance().taskList[this.linkTask].status == TaskStatus.DURING) {
                SceneService.getInstance().notify(TaskService.getInstance().taskList[this.linkTask]);
            }
        }
    };
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster',["Observer"]);
//# sourceMappingURL=Observer.js.map