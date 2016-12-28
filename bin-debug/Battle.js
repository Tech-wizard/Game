var Battle = (function () {
    function Battle() {
    }
    var d = __define,c=Battle,p=c.prototype;
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
}());
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
    return enemy;
}
//# sourceMappingURL=Battle.js.map