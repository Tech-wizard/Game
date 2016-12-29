var User = (function () {
    // pet: pet;
    function User(name) {
        this.cash = 0;
        this.gold = 0;
        this.exp = 0;
        this.totalExp = 0;
        this.level = 1;
        this.heros = [];
        this._herosInTeam = [];
        this.name = name;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "herosInTeam"
        ,function () {
            return this.heros.filter(function (hero) { return hero.isInTeam; });
        }
    );
    //@Cache
    p.getFightPower = function () {
        var result = 0;
        this.herosInTeam.map(function (hero) { return result += hero.getFightPower(); });
        // result += this.pet.getFightPower();
        return result;
    };
    p.changeHeroTeam = function (heroToUp, heroToDown) {
    };
    p.mountEquipment = function (equip, hero) {
        //User.packages.remove(equip);       //单例
        hero.mount(equip);
    };
    return User;
}());
egret.registerClass(User,'User');
var Package = (function () {
    function Package() {
    }
    var d = __define,c=Package,p=c.prototype;
    return Package;
}());
egret.registerClass(Package,'Package');
var qualityType;
(function (qualityType) {
    qualityType[qualityType["C"] = 0] = "C";
    qualityType[qualityType["B"] = 1] = "B";
    qualityType[qualityType["A"] = 2] = "A";
    qualityType[qualityType["S"] = 3] = "S";
    qualityType[qualityType["SS"] = 4] = "SS";
})(qualityType || (qualityType = {}));
var equipmentType;
(function (equipmentType) {
    equipmentType[equipmentType["weapon"] = 0] = "weapon";
    equipmentType[equipmentType["cloth"] = 1] = "cloth";
    equipmentType[equipmentType["accessorie"] = 2] = "accessorie";
})(equipmentType || (equipmentType = {}));
var occupationType;
(function (occupationType) {
})(occupationType || (occupationType = {}));
var Hero = (function () {
    function Hero(name, str, con, dex, mag, spd, quality) {
        this.skills = [];
        this.isInTeam = false;
        this.equipments = [];
        this.level = 1;
        this.curHP = new Property("当前血量", null);
        this._maxHP = new Property("最大血量", null);
        this.curMP = new Property("当前魔量", null);
        this._maxMP = new Property("最大魔量", null);
        this._ATK = new Property("伤害", null);
        this._CRIT = new Property("暴击", null);
        this._EV = new Property("闪避", null);
        this._HIT = new Property("命中", null);
        this.name = name;
        this.STR = new Property("力量", str);
        this.CON = new Property("体力", con);
        this.DEX = new Property("技巧", dex);
        this.MAG = new Property("魔力", mag);
        this.SPD = new Property("速度", spd);
        this.quality = new Property("成长", quality);
        this.heroInformationUpdate();
    }
    var d = __define,c=Hero,p=c.prototype;
    p.mount = function (equip) {
    };
    p.equip = function (equipment) {
        this.equipments.push(equipment);
        this.heroInformationUpdate();
    };
    d(p, "maxHp"
        ,function () {
            return this.CON.value * 10;
        }
    );
    d(p, "maxMp"
        ,function () {
            return this.MAG.value * 10;
        }
    );
    d(p, "HIT"
        ,function () {
            return this.DEX.value * 7 + this.SPD.value * 2;
        }
    );
    d(p, "CRIT"
        ,function () {
            return this.DEX.value * 11;
        }
    );
    d(p, "EV"
        ,function () {
            return this.DEX.value * 5 + this.SPD.value * 7;
        }
    );
    d(p, "ATK"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e._attack; });
            result += this.STR.value;
            return result;
        }
    );
    d(p, "fightPower"
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this._ATK.value * 5 + this.SPD.value * 4 + this.STR.value * 10 + this.MAG.value * 8 + this.CON.value * 6 + this.DEX.value * 11;
    };
    p.levelup = function () {
        this.level++;
        this.STR.value += this.STRUP;
        this.CON.value += this.CONUP;
        this.heroInformationUpdate();
    };
    p.heroInformationUpdate = function () {
        var _this = this;
        this.equipments.forEach(function (e) { return _this.STR.value += e.STR; });
        this.equipments.forEach(function (e) { return _this.CON.value += e.CON; });
        this.equipments.forEach(function (e) { return _this.DEX.value += e.DEX; });
        this.equipments.forEach(function (e) { return _this.MAG.value += e.MAG; });
        this.equipments.forEach(function (e) { return _this.SPD.value += e.SPD; });
        this._ATK.value = this.ATK;
        this._CRIT.value = this.CRIT;
        this._EV.value = this.EV;
        this._HIT.value = this.HIT;
        this._maxHP.value = this.maxHp;
        this.curHP.value = this._maxHP.value;
        this._maxMP.value = this.maxMp;
        this.curMP.value = this._maxMP.value / 2;
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(name, type, atk, runes) {
        //jewels: jewel[] = [];
        this.STR = 0; //力量
        this.CON = 0; //体力
        this.DEX = 0; //技巧
        this.MAG = 0; //魔力
        this.SPD = 0; //速度
        this.runes = [];
        this.name = name;
        this.equipmentType = type;
        this._attack = atk;
        this.runes = runes;
        this.equipmentUpdate();
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.equipmentUpdate = function () {
        var _this = this;
        this.runes.forEach(function (e) { return _this.STR += e.STR; });
        this.runes.forEach(function (e) { return _this.CON += e.CON; });
        this.runes.forEach(function (e) { return _this.DEX += e.DEX; });
        this.runes.forEach(function (e) { return _this.SPD += e.SPD; });
        this.runes.forEach(function (e) { return _this.MAG += e.MAG; });
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
// class jewel {
// }
var rune = (function () {
    function rune(quality) {
        this.STR = 0; //力量
        this.CON = 0; //体力
        this.DEX = 0; //技巧
        this.MAG = 0; //魔力
        this.SPD = 0; //速度
        this.quality = quality;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                this.STR += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 1:
                this.CON += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 2:
                this.DEX += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 3:
                this.MAG += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 4:
                this.SPD += Math.floor(Math.random() * 12) * this.quality;
                break;
        }
    }
    var d = __define,c=rune,p=c.prototype;
    return rune;
}());
egret.registerClass(rune,'rune');
function SetTriangle() {
    var sanjiao = new Hero("三角", 47, 77, 0, 10, 2, 0);
    sanjiao.CONUP = 7;
    sanjiao.STRUP = 7;
    sanjiao.skills = [
        { x: 40, y: 1000, name: "<射击>", image: "Skill_1_png", inf: "普通的\n远程攻击", ratio: 100, MPneed: 5, distance: 2, type: 0, num: 1 },
        { x: 170 - 2, y: 1000, name: "<轰击>", image: "Skill_1_png", inf: "聚集锋芒的\n重型远程攻击", ratio: 350, MPneed: 70, distance: 3, type: 0, num: 1 },
        { x: 300 - 4, y: 1000, name: "<划击>", image: "Skill_1_png", inf: "不擅长的\n近战攻击", ratio: 80, MPneed: 0, distance: 1, type: 0, num: 1 },
        { x: 430 - 6, y: 1000, name: "<尖锐化>", image: "Skill_1_png", inf: "三角高速旋转\n本次战斗中\n永久提升速度", ratio: 100, MPneed: 100, distance: 0, type: 1, num: 1 },
        { x: 560 - 8, y: 1000, name: "<三角移动>", image: "Skill_1_png", inf: "移动一格\n并回复10MP", ratio: 0, MPneed: -10, distance: 1, type: 4, num: 1 },
    ];
    return sanjiao;
}
function SetSquare() {
    var fangkuai = new Hero("方块", 50, 100, 0, 10, 2, 0);
    fangkuai.CONUP = 10;
    fangkuai.STRUP = 10;
    fangkuai.skills = [
        { x: 30, y: 800, name: "<棱刮>", image: "Skill_1_png", inf: "普通的\n近战攻击", ratio: 100, MPneed: 0, distance: 1, type: 0, num: 2 },
        { x: 160, y: 800, name: "<格式打击>", image: "Skill_1_png", inf: "猛扑的\n对敌人造成重创", ratio: 250, MPneed: 50, distance: 1, type: 0, num: 2 },
        { x: 290, y: 800, name: "<空格>", image: "Skill_1_png", inf: "向所指方向\n跳跃一格\n并撞击敌人", ratio: 125, MPneed: 30, distance: 2, type: 6, num: 2 },
        { x: 420, y: 800, name: "<栅格化>", image: "Skill_1_png", inf: "方块变得\n更方了\n本次战斗中\n永久提升攻击力", ratio: 150, MPneed: 5, distance: 2, type: 0, num: 2 },
        { x: 550, y: 800, name: "<方块移动>", image: "Skill_1_png", inf: "上下左右\n一格的范围", ratio: 0, MPneed: 0, distance: 1, type: 4, num: 2 }
    ];
    return fangkuai;
}
function SetCircle() {
    var zhengyuan = new Hero("正圆", 48, 120, 0, 10, 2, 0);
    zhengyuan.CONUP = 12;
    zhengyuan.STRUP = 8;
    zhengyuan.skills = [
        { x: 30, y: 800, name: "<碾压>", image: "Skill_1_png", inf: "普通攻击，命中后回复8MP", ratio: 125, MPneed: -8, distance: 1, type: 0, num: 3 },
        { x: 160, y: 800, name: "<飞盘>", image: "Skill_1_png", inf: "正圆自身的投影攻击远程攻击，命中后回复5MP", ratio: 100, MPneed: -5, distance: 2, type: 0, num: 3 },
        { x: 290, y: 800, name: "<翻滚>", image: "Skill_1_png", inf: "直线大幅度移动，回复2MP", ratio: 0, MPneed: 5, distance: 5, type: 5, num: 3 },
        { x: 420, y: 800, name: "<圆滑化>", image: "Skill_1_png", inf: "正圆变得更加圆润光滑，按当前比例增长HP", ratio: 150, MPneed: 100, distance: 2, type: 0, num: 3 },
        { x: 550, y: 800, name: "<正圆移动>", image: "Skill_1_png", inf: "上下左右一格的范围", ratio: 0, MPneed: 0, distance: 1, type: 4, num: 3 },
    ];
    return zhengyuan;
}
//# sourceMappingURL=User.js.map