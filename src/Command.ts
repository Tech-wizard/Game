
interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private x;
    private y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {
        GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        })
    }

    cancel(callback: Function) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        })
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    private _hasBeenCancelled = false;

    execute(callback: Function): void {

        console.log("开始战斗")
        egret.setTimeout(() => {
            if (!this._hasBeenCancelled) {
                console.log("结束战斗")
                callback();
            }
        }, this, 500)
    }

    cancel(callback: Function) {
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100)

    }
}

class TalkCommand implements Command {

  npcid:string;
  constructor(npcad:string){
  this.npcid = npcad;
  }

    execute(callback: Function): void {
         
        if(this.npcid=="NPC_1"){
        PickHeroScene.getCurrentScene().dp1.showDpanel();
        }
         if(this.npcid=="NPC_2"){
        PickHeroScene.getCurrentScene().dp2.showDpanel();
        }
        console.log("打开对话框");
        egret.setTimeout(function () {
            console.log("结束对话");
            callback();
        }, this, 500)
    }

    cancel(callback: Function) {
       if(this.npcid=="NPC_1"){
        PickHeroScene.getCurrentScene().dp1.disshowDpanel();
        }
         if(this.npcid=="NPC_2"){
        PickHeroScene.getCurrentScene().dp2.disshowDpanel();
        }
        console.log("关闭对话框");
    }
}

class CommandList {

    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(() => {
            if (this._frozen) {
                this._frozen = false;
            }

        }, this, 2000);
        if (command) {
            command.cancel(() => {
                this._frozen = false;
            });
            this._list = [];
        }

    }

    execute() {
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command)
            command.execute(() => {
                this.execute();
            })

        }
        else {
            console.log("全部命令执行完毕")
        }
    }

}