class Battle {

    hero: Hero;
    heropos: Pos;
    
    enemy: Enemy;


    judgeHeroDeath(): boolean {
        if (this.hero.curHP.value <= 0)
            return true;
        else
            return false;
    }

    judgeEnemyDeath(): boolean {
        if (this.enemy.curHP.value <= 0)  
            return true;
        else
            return false;
    }
}

class Pos {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Enemy extends Hero {

    pos: Pos;

    constructor(name: string, str: number, con: number, dex: number, mag: number, spd: number, quality: number) {

        super(name, str, con, dex, mag, spd, quality);

    }
}

function setEnemy(level: number): Enemy {

    var enemy = new Enemy("不规则几何体", 46 + level * 12 + Math.floor(Math.random() * 6), 80 + level * 2 + Math.floor(Math.random() * 8), 0, 2, 2, 0);
    enemy.skills = [
     {x:30,y:900,name:"不规则攻击",image:"",inf:"杂鱼也能打败纯形英雄",ratio:100,MPneed:0,distance:3,type:0,num:4},
     {x:160,y:900,name:"不规则移动",image:"",inf:"上下左右一格的范围",ratio:0,MPneed:0,distance:1,type:4,num:4},
    ]
    return enemy;
}



