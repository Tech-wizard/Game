var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle(hero, level, x, y) {
        _super.call(this);
        this.battleinfo = new egret.TextField();
        this.heroSkills = [];
        this.heroSkillsinfo = [];
        this._block = [];
        this._herobody = new egret.Bitmap();
        this._enemybody = new egret.Bitmap();
        this.hero = hero;
        this.enemy = setEnemy(level);
        this.heropos.x = 0;
        this.heropos.y = 0;
        this.battleinfo.text = "战斗信息";
        this.addChild(this.battleinfo);
        this.battleinfo.x = 50;
        this.battleinfo.y = 700;
        switch (this.hero.name) {
            case "三角":
                this._herobody.texture = RES.getRes("sanjiao_png");
                break;
            case "方块":
                this._herobody.texture = RES.getRes("fangkuai_png");
                break;
            case "正圆":
                this._herobody.texture = RES.getRes("zhengyuan_png");
                break;
        }
        this._enemybody.texture = RES.getRes("enemy_1_png");
        this._numCols = x;
        this._numRows = y;
        for (var i = 0; i < this._numCols; i++) {
            this._block[i] = new Array();
            for (var j = 0; j < this._numRows; j++) {
                this._block[i][j] = new egret.Bitmap();
                this._block[i][j].texture = RES.getRes("block_png");
                this.addChild(this._block[i][j]);
            }
        }
        for (i = 0; i < 5; i++) {
            this.heroSkills[i] = new egret.Bitmap();
        }
        for (i = 0; i < 5; i++) {
            this.heroSkillsinfo[i] = new egret.TextField();
        }
        this.upDateBattelMap();
    }
    var d = __define,c=Battle,p=c.prototype;
    p.upDateBattelMap = function () {
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                if (i == this.heropos.x && j == this.heropos.y) {
                    this._block[i][j] = this._herobody;
                }
                if (i == this.enemy.pos.x && j == this.enemy.pos.y) {
                    this._block[i][j] = this._enemybody;
                }
            }
        }
    };
    p.showSkills = function () {
        for (var i = 0; i < 5; i++) {
            this.heroSkills[i] = RES.getRes(this.hero.skills[i].image);
            this.addChild(this.heroSkills[i]);
            this.heroSkills[i].x = this.hero.skills[i].x;
            this.heroSkills[i].y = this.hero.skills[i].y;
            this.heroSkillsinfo[i].text = this.hero.skills[i].name + "/" + this.hero.skills[i].inf;
            this.addChild(this.heroSkillsinfo[i]);
            this.heroSkillsinfo[i].x = this.hero.skills[i].x - 30;
            this.heroSkillsinfo[i].y = this.hero.skills[i].y - 130;
        }
    };
    p.judgeHeroDeath = function () {
        if (this.hero.curHP.value <= 0)
            return true;
        else
            return false;
    };
    p.judgeEnemyDeath = function () {
        if (this.enemy.curHP.value <= 0)
            return true;
        else
            return false;
    };
    return Battle;
}(egret.DisplayObjectContainer));
egret.registerClass(Battle,'Battle');
var Pos = (function () {
    function Pos(x, y) {
        this.x = x;
        this.y = y;
    }
    var d = __define,c=Pos,p=c.prototype;
    return Pos;
}());
egret.registerClass(Pos,'Pos');
// class BattleMap extends egret.DisplayObjectContainer {
//     _block: egret.Bitmap[][] = [];
//     _herobody:egret.Bitmap;
//     _enemybody:egret.Bitmap;
//     _numCols: number;
//     _numRows: number;
//     constructor(x: number, y: number) {
//         super();
//         this._numCols = x;
//         this._numRows = y;
//         for (var i = 0; i < this._numCols; i++) {
//             this._block[i] = new Array();
//             for (var j = 0; j < this._numRows; j++) {
//                 this._block[i][j] = new egret.Bitmap();
//                 this._block[i][j].texture = RES.getRes("block_png");
//                 this.addChild(this._block[i][j]);
//             }
//         }
//     }
// }
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, str, con, dex, mag, spd, quality) {
        _super.call(this, name, str, con, dex, mag, spd, quality);
    }
    var d = __define,c=Enemy,p=c.prototype;
    return Enemy;
}(Hero));
egret.registerClass(Enemy,'Enemy');
function setEnemy(level) {
    var enemy = new Enemy("不规则几何体", 46 + level * 12 + Math.floor(Math.random() * 6), 80 + level * 2 + Math.floor(Math.random() * 8), 0, 2, 2, 0);
    enemy.skills = [
        { x: 30, y: 900, name: "不规则攻击", image: "", inf: "杂鱼也能打败纯形英雄", ratio: 100, MPneed: 0, distance: 3, type: 0, num: 4 },
        { x: 160, y: 900, name: "不规则移动", image: "", inf: "上下左右一格的范围", ratio: 0, MPneed: 0, distance: 1, type: 4, num: 4 },
    ];
    enemy.pos.x = 3;
    enemy.pos.y = 3;
    return enemy;
}
//# sourceMappingURL=Battle.js.map