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
        this.load.setPath('assets/sounds')
        this.load.setPath('assets/fonts');
        this.load.bitmapFont('UIfont', 'Unnamed.png', 'Unnamed.xml');
    }

    create()
    {
        this.bg = this.add.sprite(0, 0, 'bg_black').setOrigin(0, 0);
        this.createTexts();
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


    loadMusic()
    {

    }

    startMenu()
    {
        this.cameraFade();
    }

    cameraFade()
    {
        this.cameras.main.fadeOut(2000);
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
