var BlockType;
(function (BlockType) {
    BlockType[BlockType["notmove"] = 0] = "notmove";
    BlockType[BlockType["upmove"] = 1] = "upmove";
    BlockType[BlockType["downmove"] = 2] = "downmove";
    BlockType[BlockType["leftmove"] = 3] = "leftmove";
    BlockType[BlockType["rightmove"] = 4] = "rightmove";
    BlockType[BlockType["uproll"] = 5] = "uproll";
    BlockType[BlockType["downroll"] = 6] = "downroll";
    BlockType[BlockType["leftroll"] = 7] = "leftroll";
    BlockType[BlockType["rightroll"] = 8] = "rightroll";
    BlockType[BlockType["upjump"] = 9] = "upjump";
    BlockType[BlockType["downjump"] = 10] = "downjump";
    BlockType[BlockType["leftjump"] = 11] = "leftjump";
    BlockType[BlockType["rightjump"] = 12] = "rightjump";
})(BlockType || (BlockType = {}));
var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle(hero, level, enemyad, x, y) {
        var _this = this;
        _super.call(this);
        this.heropos = new Pos(0, 5);
        this.enemypos = new Pos(5, 0);
        this.battleinfo = new egret.TextField();
        this.heroSkills = [];
        this.heroSkillsinfo = [];
        this._block = [];
        this._blockType = [];
        this._herobody = new egret.Bitmap();
        this._heroHP = new egret.TextField();
        this._heroMP = new egret.TextField();
        this._enemybody = new egret.Bitmap();
        this._enemyHP = new egret.TextField();
        this._enemyMP = new egret.TextField();
        this.timerbar = new egret.TextField();
        this.chance = 0; //该回合行动次数
        var BattleMask = new egret.Shape();
        BattleMask.graphics.beginFill(0x000000, 1);
        BattleMask.graphics.drawRect(0, 0, 640, 1136);
        BattleMask.graphics.endFill();
        BattleMask.width = 640;
        BattleMask.height = 1136;
        this.addChild(BattleMask);
        this.hero = hero;
        this.enemy = setEnemy(level, enemyad);
        this._enemybody.texture = RES.getRes(this.enemy.bodyad);
        this.battleinfo.text = "战斗信息";
        this.battleinfo.size = 20;
        this.addChild(this.battleinfo);
        this.battleinfo.x = 100;
        this.battleinfo.y = 740;
        switch (hero.name) {
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
            this._blockType[i] = new Array();
            for (var j = 0; j < this._numRows; j++) {
                var block = new egret.Bitmap();
                block['i'] = i;
                block['j'] = j;
                this._block[i][j] = block;
                this._block[i][j].width = TileMap.TILE_BATTLE_SIZE;
                this._block[i][j].height = TileMap.TILE_BATTLE_SIZE;
                this._block[i][j].texture = RES.getRes("block2_png");
                this._block[i][j].x = i * TileMap.TILE_BATTLE_SIZE + 80;
                this._block[i][j].y = j * TileMap.TILE_BATTLE_SIZE + 240;
                this.addChild(this._block[i][j]);
                this._block[i][j].touchEnabled = true;
                this._blockType[i][j] = BlockType.notmove;
                this._block[i][j].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    console.log(e.target);
                    console.log(e.target.i, e.target.j);
                    _this.heroTouchMove(e.target.i, e.target.j);
                }, this);
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
        //console.log(this.hero);
        this.updateALLState();
        this.heroTurn();
    }
    var d = __define,c=Battle,p=c.prototype;
    p.heroTurn = function () {
        var _this = this;
        this.chance = 2;
        this.heroSkills[0].touchEnabled = true;
        this.heroSkills[1].touchEnabled = true;
        this.heroSkills[2].touchEnabled = true;
        this.heroSkills[3].touchEnabled = true;
        this.heroSkills[4].touchEnabled = true;
        //egret.setInterval(()=>{this.randommove(this.heropos)},this,2000);
        //egret.setInterval(() => { this.enemyturn() }, this, 3000);
        this.heroSkills[0].addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.heroAttack(_this.hero.skills[0]); }, this);
        this.heroSkills[1].addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.heroAttack(_this.hero.skills[1]); }, this);
        this.heroSkills[2].addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.heroSpecial(_this.hero.skills[2]); }, this);
        this.heroSkills[3].addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.heroBuff(_this.hero.skills[3]); }, this);
        this.heroSkills[4].addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroMove, this);
        this.heroTurnEnd();
    };
    p.heroTurnEnd = function () {
        var _this = this;
        var turn = egret.setInterval(function () {
            if (_this.chance = 0) {
                _this.heroSkills[0].touchEnabled = false;
                _this.heroSkills[1].touchEnabled = false;
                _this.heroSkills[2].touchEnabled = false;
                _this.heroSkills[3].touchEnabled = false;
                _this.heroSkills[4].touchEnabled = false;
            }
            if (_this.judgeEnemyDeath() == true || _this.judgeHeroDeath() == true) {
                console.log("结束战斗");
                egret.clearInterval(turn);
            }
            else {
                _this.enemyTurn();
            }
        }, this, 1000);
    };
    p.upDateBattelMap = function () {
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                var block = this._block[i][j];
                var type = this._blockType[i][j];
                // let config = {
                //     [BlockType.notmove]:"block_0_png",
                //     [BlockType.upmove]:"block_1_png",
                //     [BlockType.notmove]:"block_3_png",
                //     [BlockType.notmove]:"block2_png",
                //     [BlockType.notmove]:"block2_png",
                //     [BlockType.notmove]:"block2_png",
                //     [BlockType.notmove]:"block2_png",
                //     [BlockType.notmove]:"block2_png",
                // }
                //约定优于配置
                var textureName = 'block_' + type + '_png';
                // let textureName = config[type];
                block.texture = RES.getRes(textureName);
                switch (this._blockType[i][j]) {
                    case BlockType.notmove:
                        this._block[i][j].texture = RES.getRes("block2_png");
                        break;
                    case BlockType.upmove:
                        this._block[i][j].texture = RES.getRes("up_png");
                        break;
                    case BlockType.downmove:
                        this._block[i][j].texture = RES.getRes("down_png");
                        break;
                    case BlockType.leftmove:
                        this._block[i][j].texture = RES.getRes("left_png");
                        break;
                    case BlockType.rightmove:
                        this._block[i][j].texture = RES.getRes("right_png");
                        break;
                    case BlockType.uproll:
                        this._block[i][j].texture = RES.getRes("up_png");
                        break;
                    case BlockType.downroll:
                        this._block[i][j].texture = RES.getRes("down_png");
                        break;
                    case BlockType.leftroll:
                        this._block[i][j].texture = RES.getRes("left_png");
                        break;
                    case BlockType.rightroll:
                        this._block[i][j].texture = RES.getRes("right_png");
                        break;
                    case BlockType.upjump:
                        this._block[i][j].texture = RES.getRes("up_png");
                        break;
                    case BlockType.downjump:
                        this._block[i][j].texture = RES.getRes("down_png");
                        break;
                    case BlockType.leftjump:
                        this._block[i][j].texture = RES.getRes("left_png");
                        break;
                    case BlockType.rightjump:
                        this._block[i][j].texture = RES.getRes("right_png");
                        break;
                }
            }
        }
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                if (i == this.enemypos.x && j == this.enemypos.y) {
                    this._block[i][j].texture = RES.getRes(this.enemy.bodyad);
                }
                if (i == this.heropos.x && j == this.heropos.y) {
                    this._block[i][j].texture = RES.getRes(this._herobodyad);
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
            this.heroSkillsinfo[i].text = this.hero.skills[i].name + "\n" + this.hero.skills[i].inf + "\nMP消耗：" + this.hero.skills[i].MPneed;
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
        this.addChild(this.timerbar);
        this.timerbar.x = 200;
        this.timerbar.y = 900;
        this.timerbar.text = "AB:";
        for (var i = 0; i < 25; i++) {
            this._heroHP.text += "|";
            this._heroMP.text += "-";
            this.timerbar.text += "-";
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
            this._enemyMP.text += "-";
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
        var hptemp, mptemp, abtemp;
        hptemp = Math.floor(this.hero.curHP.value / this.hero._maxHP.value * 25);
        mptemp = Math.floor(this.hero.curMP.value / this.hero._maxMP.value * 25);
        this._heroHP.textAlign = "justify";
        this._heroMP.textAlign = "justify";
        // this._heroMP.textAlign = egret.HorizontalAlign.CENTER;
        this._heroHP.text = "HP:" + this.hero.curHP.value + "/" + this.hero._maxHP.value + " ";
        this._heroMP.text = "MP:" + this.hero.curMP.value + "/" + this.hero._maxMP.value + " ";
        ;
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
                this._heroMP.text += "-";
            }
            else {
                this._heroMP.text += ".";
            }
        }
        hptemp = Math.floor(this.enemy.curHP.value / this.enemy._maxHP.value * 25);
        mptemp = Math.floor(this.enemy.curMP.value / this.enemy._maxMP.value * 25);
        this._enemyHP.text = "HP:" + this.enemy.curHP.value + "/" + this.enemy._maxHP.value + " ";
        this._enemyMP.text = "MP:" + this.enemy.curMP.value + "/" + this.enemy._maxMP.value + " ";
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
                this._enemyMP.text += "-";
            }
            else {
                this._enemyMP.text += ".";
            }
        }
    };
    p.heroTouchMove = function (i, j) {
        switch (this._blockType[i][j]) {
            case BlockType.notmove:
                console.log("not move", i, j);
                break;
            case BlockType.upmove:
                this.heropos.y--;
                if (this.hero.name == "三角") {
                    this.hero.curMP.value += 10;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    this.updateALLState();
                }
                break;
            case BlockType.downmove:
                this.heropos.y++;
                if (this.hero.name == "三角") {
                    this.hero.curMP.value += 10;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    this.updateALLState();
                }
                break;
            case BlockType.rightmove:
                this.heropos.x++;
                if (this.hero.name == "三角") {
                    this.hero.curMP.value += 10;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    this.updateALLState();
                }
                break;
            case BlockType.leftmove:
                this.heropos.x--;
                if (this.hero.name == "三角") {
                    this.hero.curMP.value += 10;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    this.updateALLState();
                }
                break;
            case BlockType.uproll:
                this.heropos.y = 0;
                this.hero.curMP.value -= this.hero.skills[2].MPneed;
                if (this.hero.curMP.value > 100) {
                    this.hero.curMP.value = 100;
                }
                this.updateALLState();
                break;
            case BlockType.downroll:
                this.heropos.y = this._numRows - 1;
                this.hero.curMP.value -= this.hero.skills[2].MPneed;
                if (this.hero.curMP.value > 100) {
                    this.hero.curMP.value = 100;
                }
                this.updateALLState();
                break;
            case BlockType.rightroll:
                this.heropos.x = this._numCols - 1;
                this.hero.curMP.value -= this.hero.skills[2].MPneed;
                if (this.hero.curMP.value > 100) {
                    this.hero.curMP.value = 100;
                }
                this.updateALLState();
                break;
            case BlockType.leftroll:
                this.heropos.x = 0;
                this.hero.curMP.value -= this.hero.skills[2].MPneed;
                if (this.hero.curMP.value > 100) {
                    this.hero.curMP.value = 100;
                }
                this.updateALLState();
                break;
            case BlockType.upjump:
                if (this.heropos.y >= 2) {
                    this.heropos.y -= 2;
                }
                else {
                    this.heropos.y--;
                }
                if (this.hero.curMP.value >= this.hero.skills[2].MPneed) {
                    this.hero.curMP.value -= this.hero.skills[2].MPneed;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    if (this.enemypos.x == this.heropos.x && this.enemypos.y == this.heropos.y) {
                        var temp = 0;
                        temp = this.hero.skills[2].ratio * this.hero._ATK.value / 100 - Math.floor(Math.random() * 5);
                        this.enemy.curHP.value -= temp;
                        this.battleinfo.text = this.hero.name + this.hero.skills[2].name + "对" + this.enemy.name + "造成" + temp + "点伤害";
                        this.chance--;
                    }
                }
                else {
                    this.battleinfo.text = "MP不足或者技能释放范围不够";
                }
                this.updateALLState();
                break;
            case BlockType.downjump:
                if (this.heropos.y <= this._numRows - 1)
                    this.heropos.y += 2;
                else {
                    this.heropos.y++;
                }
                if (this.hero.curMP.value >= this.hero.skills[2].MPneed) {
                    this.hero.curMP.value -= this.hero.skills[2].MPneed;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    if (this.enemypos.x == this.heropos.x && this.enemypos.y == this.heropos.y) {
                        var temp = 0;
                        temp = this.hero.skills[2].ratio * this.hero._ATK.value / 100 - Math.floor(Math.random() * 5);
                        this.enemy.curHP.value -= temp;
                        this.battleinfo.text = this.hero.name + this.hero.skills[2].name + "对" + this.enemy.name + "造成" + temp + "点伤害";
                        this.chance--;
                    }
                }
                else {
                    this.battleinfo.text = "MP不足或者技能释放范围不够";
                }
                this.updateALLState();
                break;
            case BlockType.rightjump:
                if (this.heropos.x <= this._numCols - 1) {
                    this.heropos.x += 2;
                }
                else {
                    this.heropos.x++;
                }
                if (this.hero.curMP.value >= this.hero.skills[2].MPneed) {
                    this.hero.curMP.value -= this.hero.skills[2].MPneed;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    if (this.enemypos.x == this.heropos.x && this.enemypos.y == this.heropos.y) {
                        var temp = 0;
                        temp = this.hero.skills[2].ratio * this.hero._ATK.value / 100 - Math.floor(Math.random() * 5);
                        this.enemy.curHP.value -= temp;
                        this.battleinfo.text = this.hero.name + this.hero.skills[2].name + "对" + this.enemy.name + "造成" + temp + "点伤害";
                        this.chance--;
                    }
                }
                else {
                    this.battleinfo.text = "MP不足或者技能释放范围不够";
                }
                break;
            case BlockType.leftjump:
                if (this.heropos.x >= 2) {
                    this.heropos.x -= 2;
                }
                else {
                    this.heropos.x--;
                }
                if (this.hero.curMP.value >= this.hero.skills[2].MPneed) {
                    this.hero.curMP.value -= this.hero.skills[2].MPneed;
                    if (this.hero.curMP.value > 100) {
                        this.hero.curMP.value = 100;
                    }
                    if (this.enemypos.x == this.heropos.x && this.enemypos.y == this.heropos.y) {
                        var temp = 0;
                        temp = this.hero.skills[2].ratio * this.hero._ATK.value / 100 - Math.floor(Math.random() * 5);
                        this.enemy.curHP.value -= temp;
                        this.battleinfo.text = this.hero.name + this.hero.skills[2].name + "对" + this.enemy.name + "造成" + temp + "点伤害";
                        this.chance--;
                    }
                }
                else {
                    this.battleinfo.text = "MP不足或者技能释放范围不够";
                }
                this.updateALLState();
                break;
        }
        for (var a = 0; a < this._numCols; a++) {
            for (var b = 0; b < this._numRows; b++) {
                this._blockType[a][b] = BlockType.notmove;
            }
        }
        this.upDateBattelMap();
        //this._block[i][j].touchEnabled = false;
    };
    p.heroMove = function () {
        if (this.heropos.x + 1 < this._numCols) {
            this._blockType[this.heropos.x + 1][this.heropos.y] = BlockType.rightmove;
        }
        if (this.heropos.x - 1 >= 0) {
            this._blockType[this.heropos.x - 1][this.heropos.y] = BlockType.leftmove;
        }
        if (this.heropos.y + 1 < this._numRows) {
            this._blockType[this.heropos.x][this.heropos.y + 1] = BlockType.downmove;
        }
        if (this.heropos.y - 1 >= 0) {
            this._blockType[this.heropos.x][this.heropos.y - 1] = BlockType.upmove;
        }
        this.upDateBattelMap();
    };
    p.heroRoll = function () {
        if (this.heropos.x + 1 < this._numCols) {
            this._blockType[this.heropos.x + 1][this.heropos.y] = BlockType.rightroll;
        }
        if (this.heropos.x - 1 >= 0) {
            this._blockType[this.heropos.x - 1][this.heropos.y] = BlockType.leftroll;
        }
        if (this.heropos.y + 1 < this._numRows) {
            this._blockType[this.heropos.x][this.heropos.y + 1] = BlockType.downroll;
        }
        if (this.heropos.y - 1 >= 0) {
            this._blockType[this.heropos.x][this.heropos.y - 1] = BlockType.uproll;
        }
        this.upDateBattelMap();
    };
    p.heroJump = function () {
        if (this.heropos.x + 1 < this._numCols) {
            this._blockType[this.heropos.x + 1][this.heropos.y] = BlockType.rightjump;
        }
        if (this.heropos.x - 1 >= 0) {
            this._blockType[this.heropos.x - 1][this.heropos.y] = BlockType.leftjump;
        }
        if (this.heropos.y + 1 < this._numRows) {
            this._blockType[this.heropos.x][this.heropos.y + 1] = BlockType.downjump;
        }
        if (this.heropos.y - 1 >= 0) {
            this._blockType[this.heropos.x][this.heropos.y - 1] = BlockType.upjump;
        }
        this.upDateBattelMap();
    };
    p.judgeDistance = function (skill) {
        if (Math.abs(this.heropos.x - this.enemypos.x) +
            Math.abs(this.heropos.y - this.enemypos.y)
            <= skill.distance) {
            return true;
        }
        else {
            return false;
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
    p.randomMove = function (pos) {
        switch (Math.floor(Math.random() * 100) % 4) {
            case 0:
                if (pos.x + 1 < this._numCols) {
                    pos.x++;
                }
                else {
                    pos.x--;
                }
                break;
            case 1:
                if (pos.y + 1 < this._numCols) {
                    pos.y++;
                }
                else {
                    pos.y--;
                }
                break;
            case 2:
                if (pos.x - 1 >= 0) {
                    pos.x--;
                }
                else {
                    pos.x++;
                }
                break;
            case 3:
                if (pos.y - 1 >= 0) {
                    pos.y--;
                }
                else {
                    pos.y++;
                }
                break;
        }
        this.upDateBattelMap();
    };
    p.heroAttack = function (skill) {
        var temp = 0;
        if (this.judgeDistance(skill) == true && this.hero.curMP.value >= skill.MPneed) {
            temp = Math.floor(skill.ratio * this.hero._ATK.value / 100) - Math.floor(Math.random() * 5);
            this.hero.curMP.value -= skill.MPneed;
            this.enemy.curHP.value -= temp;
            this.battleinfo.text = this.hero.name + skill.name + "对" + this.enemy.name + "造成" + temp + "点伤害";
            this.chance--;
        }
        else {
            this.battleinfo.text = "MP不足或者技能释放范围不够";
        }
        this.updateALLState();
    };
    p.heroBuff = function (skill) {
        if (this.hero.curMP.value >= skill.MPneed) {
            this.chance--;
            this.hero.curMP.value -= skill.MPneed;
            if (this.hero.curMP.value > this.hero._maxMP.value) {
                this.hero.curMP.value = this.hero._maxMP.value;
            }
            switch (skill.type) {
                case SkillType.speedbuff:
                    this.chance += 2;
                    break;
                case SkillType.atkbuff:
                    this.hero._ATK.value = skill.ratio / 100 * this.hero._ATK.value;
                    break;
                case SkillType.HPbuff:
                    this.hero.curHP.value = skill.ratio / 100 * this.hero.curHP.value;
            }
        }
        else {
            this.battleinfo.text = "MP不足";
        }
    };
    p.heroSpecial = function (skill) {
        switch (skill.type) {
            case SkillType.roll:
                this.heroRoll();
                break;
            case SkillType.jump:
                this.heroJump();
                break;
        }
    };
    p.enemyAttack = function () {
        var skill = this.enemy.skills[0];
        var temp = 0;
        if (this.judgeDistance(skill) == true) {
            temp = skill.ratio * this.enemy._ATK.value / 100 - Math.floor(Math.random() * 7);
            this.hero.curHP.value -= temp;
            this.enemy.curMP.value -= skill.MPneed;
            this.battleinfo.text = this.enemy.name + skill.name + "对" + this.hero.name + "造成" + temp + "点伤害";
        }
        this.updateALLState();
    };
    p.enemyTurn = function () {
        var _this = this;
        this.randomMove(this.enemypos);
        egret.setTimeout(function () {
            _this.enemyAttack();
        }, this, 1500);
    };
    p.heroTimer = function () {
        this.hero.SPD.value;
        this.timer = new egret.Timer(100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     if(this.timer.running){
        //         this.timer.stop();
        //     }else{
        //         this.timer.start();
        //     }
        // }, this); 
    };
    p.timerFunc = function (event) {
        this.timetemp++;
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
//  herorightmove() {
//         // if (this.heropos.x + 1 < this._numCols) {
//         //     this._block[this.heropos.x + 1][this.heropos.y].touchEnabled = false;
//         // }
//         // if (this.heropos.x - 1 >= 0) {
//         //     this._block[this.heropos.x - 1][this.heropos.y].touchEnabled = false;
//         // }
//         // if (this.heropos.y + 1 < this._numRows) {
//         //     this._block[this.heropos.x][this.heropos.y + 1].touchEnabled = false;
//         // }
//         // if (this.heropos.y - 1 >= 0) {
//         //     this._block[this.heropos.x][this.heropos.y - 1].touchEnabled = false;
//         // }
//         for (var i = 0; i < this._numCols; i++) {
//             for (var j = 0; j < this._numRows; j++) {
//                 this._block[i][j].touchEnabled = false;
//             }
//         }
//         this.heropos.x++;
//         this.upDateBattelMap();
//         if (this.hero.name == "三角") {
//             this.hero.curMP.value += 10;
//             if (this.hero.curMP.value > 100) {
//                 this.hero.curMP.value = 100;
//             }
//             this.updateALLState();
//         }
//     }
//     heroleftmove() {
//         for (var i = 0; i < this._numCols; i++) {
//             for (var j = 0; j < this._numRows; j++) {
//                 this._block[i][j].touchEnabled = false;
//             }
//         }
//         this.heropos.x--
//         this.upDateBattelMap();
//         if (this.hero.name == "三角") {
//             this.hero.curMP.value += 10;
//             if (this.hero.curMP.value > 100) {
//                 this.hero.curMP.value = 100;
//             }
//             this.updateALLState();
//         }
//     }
//     heroupmove() {
//         for (var i = 0; i < this._numCols; i++) {
//             for (var j = 0; j < this._numRows; j++) {
//                 this._block[i][j].touchEnabled = false;
//             }
//         }
//         this.heropos.y--;
//         this.upDateBattelMap();
//         if (this.hero.name == "三角") {
//             this.hero.curMP.value += 10;
//             if (this.hero.curMP.value > 100) {
//                 this.hero.curMP.value = 100;
//             }
//             this.updateALLState();
//         }
//     }
//     herodownmove() {
//         for (var i = 0; i < this._numCols; i++) {
//             for (var j = 0; j < this._numRows; j++) {
//                 this._block[i][j].touchEnabled = false;
//             }
//         }
//         this.heropos.y++;
//         this.upDateBattelMap();
//         if (this.hero.name == "三角") {
//             this.hero.curMP.value += 10;
//             if (this.hero.curMP.value > 100) {
//                 this.hero.curMP.value = 100;
//             }
//             this.updateALLState();
//         }
//     } 
//# sourceMappingURL=Battle.js.map