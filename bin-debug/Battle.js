var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle(hero, level, x, y) {
        _super.call(this);
        this.heropos = new Pos(0, 5);
        this.enemypos = new Pos(5, 0);
        this.battleinfo = new egret.TextField();
        this.heroSkills = [];
        this.heroSkillsinfo = [];
        this._block = [];
        this._herobody = new egret.Bitmap();
        this._heroHP = new egret.TextField();
        this._heroMP = new egret.TextField();
        this._enemybody = new egret.Bitmap();
        this._enemyHP = new egret.TextField();
        this._enemyMP = new egret.TextField();
        this.hero = hero;
        this.enemy = setEnemy(level, "enemy_1_png");
        this._enemybody.texture = RES.getRes(this.enemy.bodyad);
        this.battleinfo.text = "战斗信息";
        this.addChild(this.battleinfo);
        this.battleinfo.x = 100;
        this.battleinfo.y = 700;
        switch (this.hero.name) {
            case "三角":
                this._herobody.texture = RES.getRes("sanjiao_png");
                this._herobodyad = "sanjiao_png";
                break;
            case "方块":
                this._herobody.texture = RES.getRes("fangkuai_png");
                this._herobodyad = "fangkuai_png";
                break;
            case "正圆":
                this._herobody.texture = RES.getRes("zhengyuan_png");
                this._herobodyad = "zhengyuan_png";
                break;
        }
        this._numCols = x;
        this._numRows = y;
        for (var i = 0; i < this._numCols; i++) {
            this._block[i] = new Array();
            for (var j = 0; j < this._numRows; j++) {
                this._block[i][j] = new egret.Bitmap();
                this._block[i][j].width = TileMap.TILE_SIZE;
                this._block[i][j].height = TileMap.TILE_SIZE;
                this._block[i][j].texture = RES.getRes("block2_png");
                this._block[i][j].x = i * TileMap.TILE_SIZE + 170;
                this._block[i][j].y = j * TileMap.TILE_SIZE + 300;
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
        this.showSkills();
        this.showALLState();
    }
    var d = __define,c=Battle,p=c.prototype;
    p.upDateBattelMap = function () {
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                if (i == this.heropos.x && j == this.heropos.y) {
                    this._block[i][j].texture = RES.getRes(this._herobodyad);
                }
                if (i == this.enemypos.x && j == this.enemypos.y) {
                    this._block[i][j].texture = RES.getRes(this.enemy.bodyad);
                }
            }
        }
    };
    p.showSkills = function () {
        for (var i = 0; i < 5; i++) {
            this.heroSkills[i].texture = RES.getRes(this.hero.skills[i].image);
            this.heroSkills[i].x = this.hero.skills[i].x - 40;
            this.heroSkills[i].y = this.hero.skills[i].y;
            this.addChild(this.heroSkills[i]);
            this.heroSkillsinfo[i].text = this.hero.skills[i].name + "\n" + this.hero.skills[i].inf;
            this.heroSkillsinfo[i].size = 18;
            this.heroSkillsinfo[i].x = this.hero.skills[i].x - 28;
            this.heroSkillsinfo[i].y = this.hero.skills[i].y + 20;
            this.addChild(this.heroSkillsinfo[i]);
        }
    };
    p.showALLState = function () {
        this._herobody.x = 20;
        this._herobody.y = 800;
        this._herobody.width = 150;
        this._herobody.height = 150;
        this._heroHP.text = "HP:";
        this._heroMP.text = "MP:";
        for (var i = 0; i < 25; i++) {
            this._heroHP.text += "|";
            this._heroMP.text += "|";
        }
        this._heroHP.x = 200;
        this._heroHP.y = 800;
        this._heroMP.x = 200;
        this._heroMP.y = 840;
        this.addChild(this._herobody);
        this.addChild(this._heroHP);
        this.addChild(this._heroMP);
        this._enemybody.x = 20;
        this._enemybody.y = 80;
        this._enemybody.width = 150;
        this._enemybody.height = 150;
        this._enemyHP.text = "HP:";
        this._enemyMP.text = "MP:";
        for (var i = 0; i < 25; i++) {
            this._enemyHP.text += "|";
            this._enemyMP.text += "|";
        }
        this._enemyHP.x = 200;
        this._enemyHP.y = 80;
        this._enemyMP.x = 200;
        this._enemyMP.y = 120;
        this.addChild(this._enemybody);
        this.addChild(this._enemyHP);
        this.addChild(this._enemyMP);
    };
    p.updateALLState = function () {
        var hptemp, mptemp;
        hptemp = Math.floor(this.hero.curHP.value / this.hero._maxHP.value * 25);
        mptemp = Math.floor(this.hero.curMP.value / this.hero._maxMP.value * 25);
        this._heroHP.text = "";
        this._heroMP.text = "";
        for (var i = 0; i < 25; i++) {
            if (i < hptemp) {
                this._heroHP.text += "|";
            }
            else {
                this._heroHP.text += ".";
            }
        }
        for (var j = 0; j < 25; j++) {
            if (j < mptemp) {
                this._heroMP.text += "|";
            }
            else {
                this._heroMP.text += ".";
            }
        }
        hptemp = Math.floor(this.enemy.curHP.value / this.enemy._maxHP.value * 25);
        mptemp = Math.floor(this.enemy.curMP.value / this.enemy._maxMP.value * 25);
        this._enemyHP.text = "";
        this._enemyMP.text = "";
        for (i = 0; i < 25; i++) {
            if (i < hptemp) {
                this._enemyHP.text += "|";
            }
            else {
                this._enemyHP.text += ".";
            }
        }
        for (j = 0; j < 25; j++) {
            if (j < mptemp) {
                this._enemyMP.text += "*";
            }
            else {
                this._enemyMP.text += ".";
            }
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
    function Enemy(name, ad, str, con, dex, mag, spd, quality) {
        _super.call(this, name, str, con, dex, mag, spd, quality);
        this.bodyad = ad;
    }
    var d = __define,c=Enemy,p=c.prototype;
    return Enemy;
}(Hero));
egret.registerClass(Enemy,'Enemy');
function setEnemy(level, ad) {
    var enemy = new Enemy("不规则几何体", ad, 46 + level * 12 + Math.floor(Math.random() * 6), 80 + level * 2 + Math.floor(Math.random() * 8), 0, 2, 2, 0);
    enemy.skills = [
        { x: 30, y: 900, name: "<不规则攻击>", image: "", inf: "杂鱼也能打败纯形英雄", ratio: 100, MPneed: 0, distance: 3, type: 0, num: 4 },
        { x: 160, y: 900, name: "<不规则移动>", image: "", inf: "上下左右一格的范围", ratio: 0, MPneed: 0, distance: 1, type: 4, num: 4 },
    ];
    return enemy;
}
//# sourceMappingURL=Battle.js.map