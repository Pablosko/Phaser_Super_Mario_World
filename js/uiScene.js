class uiScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'UIScene'});
    }

    preload()
    {
        this.load.setPath('assets/img/ui');
        this.load.image('baseUI', 'ui_base.png');
        this.load.image('finalLevel', 'ui_finallevel.png');
        this.load.spritesheet('coin', 'ui_coin.png', 
        {frameWidth:8, frameHeight:8});
        this.load.spritesheet('powerups', 'ui_powerups.png', 
        {frameWidth:28, frameHeight:28});
    }
    create()
    {
        //Set variables
        this.currentYoshiCoins = 0;
        this.currentPoints = 0;
        this.currentCoins = 0;
        this.currentTime = 400;

        this.base_ui = this.add.sprite(5, 0, 'baseUI').setOrigin(0, 0);
        this.yoshiCoins = this.add.group();
        this.createYoshiCoins();
        this.createTexts();
        this.createEvents();

        this.timerEvent = this.time.addEvent({
            delay: 1000,  
            callback: this.updateTimer,  
            callbackScope: this,
            loop: true  
        });
    }

    createYoshiCoins()
    {
        this.coin0 = this.yoshiCoins.create(config.width * 0.30, config.height * 0.1, 'coin');
        this.coin1 = this.yoshiCoins.create(config.width * 0.34, config.height * 0.1, 'coin');
        this.coin2 = this.yoshiCoins.create(config.width * 0.38, config.height * 0.1, 'coin');
        this.coin3 = this.yoshiCoins.create(config.width * 0.42, config.height * 0.1, 'coin');
        this.coin0.setVisible(false);
        this.coin1.setVisible(false);
        this.coin2.setVisible(false);
        this.coin3.setVisible(false);
    }

    createTexts()
    {
        this.normalCoinsText = this.add.bitmapText(config.width * 0.89, config.height * 0.09, 'UIfont', '0', 9).setDepth(5);
        this.timeText = this.add.bitmapText(config.width * 0.62, config.height * 0.13, 'UIfont', '400', 9).setDepth(5);
        this.textPoints = this.add.bitmapText(config.width * 0.8, config.height * 0.13, 'UIfont', '0', 9).setDepth(5);
        this.textTotalYoshiCoins = this.add.bitmapText(config.width * 0.155, config.height * 0.125, 'UIfont', '0', 10).setDepth(5);
    }

    createEvents()
    {
        const gameState = this.scene.get('main_scene');
        gameState.events.on('addYoshiCoin', this.updateYoshiCoin, this);
        gameState.events.on('addCoin', this.updateNormalCoin, this);
        gameState.events.on('addPoints', this.updatePoints, this);
    }

    updateYoshiCoin()
    {
        console.log("Add coin");
        this.currentYoshiCoins += 1;
        this.yoshiCoins.children.iterate((coin, index) => {
            coin.setVisible(index < this.currentYoshiCoins);
        });
        this.textTotalYoshiCoins.setText("" + this.currentYoshiCoins);
    }

    updatePoints(points)
    {
        console.log("Add Points");
        this.currentPoints += points;
        this.textPoints.setText("" + this.currentPoints);
    }

    updateNormalCoin(coins)
    {
        console.log("Add Coins");
        this.currentCoins += coins;
        this.normalCoinsText.setText("" + this.currentCoins);
    }

    updateTimer()
    {
        this.currentTime -= 1;
        this.timeText.setText("" + this.currentTime);
        if(this.currentTime <= 0)
        {
            //SetGame Over
        }
    }
}