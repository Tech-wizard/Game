//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        

        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        console.log(stageW,stageH);
        var BlackMask = new egret.Shape();
        BlackMask.graphics.beginFill(0x000000, 1);
        BlackMask.graphics.drawRect(0, 0, stageW, stageH);
        BlackMask.graphics.endFill();
        BlackMask.width = stageW;
        BlackMask.height = stageH;
        this.addChild(BlackMask);

        var scene = new GameScene();
        GameScene.replaceScene(scene);
        GameScene.getCurrentScene().main = this;
         var pickscene = new PickHeroScene();
        PickHeroScene.replaceScene(pickscene);

          PickHeroScene.getCurrentScene().hero = SetTriangle();
          var battle = new Battle(PickHeroScene.getCurrentScene().hero,1,"npc_2_png",6,6);
         GameScene.getCurrentScene().main.addChild(battle);

        var WhiteMask = new egret.Shape();
        WhiteMask.graphics.beginFill(0xFFFFFF, 1);
        WhiteMask.graphics.drawRect(0, 0, stageW, stageH);
        WhiteMask.graphics.endFill();
        WhiteMask.width = stageW;
        WhiteMask.height = stageH;
        //this.addChild(WhiteMask);
        //WhiteMask.alpha = 0;

        // var back: egret.Bitmap = RES.getRes("menu_jpg");
        // this.addChild(back);
        // var stageW: number = this.stage.stageWidth;
        // var stageH: number = this.stage.stageHeight;
        // back.width = stageW;
        // back.height = stageH;
        // back.y = -150;
        // var count = 0;
        // egret.Ticker.getInstance().register(() => {
        //     if (count < 5) {
        //         back.scaleY *= 1.005;
        //     }
        //     else if (count < 10 || count >= 5) {
        //         back.scaleY /= 1.005;
        //     }
        //     count += 0.5;
        //     if (count >= 10) {
        //         count = 0;
        //     }

        // }, this);



        // // var icon:egret.Bitmap = this.createBitmapByName("egret_icon_png");
        // // this.addChild(icon);
        // // icon.x = 26;
        // // icon.y = 33;

        // // var line = new egret.Shape();
        // // line.graphics.lineStyle(2,0xffffff);
        // // line.graphics.moveTo(0,0);
        // // line.graphics.lineTo(0,117);
        // // line.graphics.endFill();
        // // line.x = 172;
        // // line.y = 61;
        // // this.addChild(line);


        // var Title = new egret.TextField();
        // Title.textColor = 0xffffff;
        // Title.width = stageW - 172;
        // Title.textAlign = "center";
        // Title.text = "二维位面之纯形争霸";
        // Title.size = 50;
        // Title.fontFamily = '黑体';
        // Title.x = 100;
        // Title.y = 100;
        // this.addChild(Title);

        // var start = new egret.TextField();
        // start.textColor = 0xffffff;
        // start.width = stageW - 172;
        // start.textAlign = "center";
        // start.text = "开始游戏";
        // start.size = 40;
        // start.fontFamily = '黑体';
        // start.x = 90;
        // start.y = 800;
        // this.addChild(start);

        // var material = new egret.TextField();
        // material.textColor = 0xffffff;
        // material.width = stageW - 172;
        // material.textAlign = "center";
        // material.text = "背景资料";
        // material.size = 40;
        // material.fontFamily = '黑体';
        // material.x = 90;
        // material.y = 850;
        // this.addChild(material);

        // var about = new egret.TextField();
        // about.textColor = 0xffffff;
        // about.width = stageW - 172;
        // about.textAlign = "center";
        // about.text = "游戏理念";
        // about.size = 40;
        // about.fontFamily = '黑体';
        // about.x = 90;
        // about.y = 900;
        // this.addChild(about);

   
       
       

        // start.touchEnabled = true;
        // start.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     this.removeChild(start);
        //     this.removeChild(material);
        //     this.removeChild(about);
        //     this.removeChild(Title);
        //     this.removeChild(back);
        //     //BlackMask.alpha = 0;
        //     //WhiteMask.alpha = 1;
        //     PickHeroScene.getCurrentScene().showPick(stageW, this);


            
        // }, this);

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    
}


