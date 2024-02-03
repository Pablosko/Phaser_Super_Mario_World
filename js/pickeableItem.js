class pickeableItem extends Phaser.GameObjects.Sprite
{
    constructor(_scene, posX, posY, id, _spriteTag)
    {
        super(_scene, posX, posY, _spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;
        _scene.physics.world.enable(this);
        this.events = new Phaser.Events.EventEmitter();
        //Create Zone, la size se tiene que poner antes de hacer enable
        this.areaZone = this.scene.add.zone(posX, posY);     
        switch(id)
        {
            case "normal_coin":
                this.anims.play('normalCoinIdle');
                this.areaZone.setSize(16,16);
            break;
            case "yoshi_coin":
                this.anims.play('yoshiCoinIdle');
                this.areaZone.setSize(16,32);
            break;
            case "fruit":
                this.anims.play('appleIdle');
                this.areaZone.setSize(16,16);
            break;
            case "mushroom":
                this.setFrame(2);
                this.areaZone.setSize(16,16);
            break;
            default:
                this.areaZone.setSize(16, 16);
            break;
        }
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.setAllowGravity(false);
        this.areaZone.body.debugBodyColor = 0xffffff;

        this.setColliders();
        this.object = id;
        this.body.setAllowGravity(false); 
        this.body.setImmovable(true);
        this.setAudios();
    }

    setAudios()
    {
        this.normalCoinSound = this.scene.sound.add('sound_pick_coin', { loop: false });
        this.pickMushroom = this.scene.sound.add('sound_pick_mushroom', { loop: false });
        this.pickPowerUp = this.scene.sound.add('sound_pick_power_up', { loop: false });
    }

    setColliders()
    {
        this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            () => {
                this.pickItem();
            },
            null,
            this
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    pickItem()
    {
        switch(this.object)
        {
            case "normal_coin":
                this.scene.events.emit('addCoin', 1);
                this.normalCoinSound.play();
                this.areaZone.body.setEnable(false); 
                this.destroy();
            break;
            case "yoshi_coin":
                this.scene.events.emit('addYoshiCoin');
                this.normalCoinSound.play();
                this.areaZone.body.setEnable(false); 
                this.destroy();
            break;     
            case "fruit":
                if(this.scene.mario.isOnYoshi)
                {
                    console.log("Eat");
                    this.areaZone.body.setEnable(false);
                    this.destroy();
                }
            break;
            case "eye_coin":
                this.anims.play('eyeCoinImpact');
            break;
            case "mushroom":
                this.pickMushroom.play();
                if(!this.scene.mario.isBigMario)
                {
                    this.scene.mario.convertToBigMario();
                }
                this.areaZone.body.setEnable(false); 
                this.destroy();
            break;
        }
    }
    enable(state)
    {
        this.areaZone.body.setEnable(state);
        this.visible = state;
    }


}