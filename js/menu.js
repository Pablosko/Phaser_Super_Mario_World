class menu extends Phaser.Scene 
{
    constructor()
    {
        super({key:"menu"});
    }

    preload()
    {
        this.cameras.main.fadeIn(1000);

        //Load backgrounds
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg_nocolor', 'bg_menu_nocolor.png');
        this.load.image('bg_black', 'bg_menu_black.png');
        
        //Load sounds
        this.load.setPath('assets/sounds');
        this.load.audio('music_title', 'title.mp3');

        this.load.setPath('assets/fonts');
        this.load.bitmapFont('UIfont', 'Unnamed.png', 'Unnamed.xml');
    }

    create()
    {
        this.bg = this.add.sprite(0, 0, 'bg_black').setOrigin(0, 0);
        this.createTexts();
        this.backgroundMusic = this.sound.add('music_title', { loop: true });
        
        this.timerEvent = this.time.addEvent({
            delay: 100,  
            callback: () => { this.backgroundMusic.play(); },  
            callbackScope: this,
            loop: false  
        });
        
    }

    createTexts()
    {
        this.menuText = this.add.bitmapText(128, 170, 'UIfont', 'Press to start', 12).setDepth(5).setOrigin(0.5);
        this.menuText.setInteractive({userHandCursor: true}).on 
        (
            'pointerdown',
            this.startMenu,
            this            
        ).on
        (
            'pointerout',
            this.pointerOut,
            this
        ).on
        (
            'pointerover',
            this.pointerOver,
            this
        )
    }

    startMenu()
    {
        this.cameraFade();
    }

    cameraFade()
    {
        this.cameras.main.fadeOut(1500);
        
        this.tweens.add({
            targets:  this.backgroundMusic,
            volume:   0,
            duration: 1100
        });
        this.cameras.main.once('camerafadeoutcomplete', () => {this.scene.start('main_scene'); this.scene.start('UIScene');});
    }

    pointerOut()
    {
        this.menuText.setScale(1);
    }

    pointerOver()
    {
        this.menuText.setScale(1.5);
    }
}
