class barsCheckPoints extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag, object, isEnding)
    { 
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.target = object;
        this.body.setAllowGravity(false);
        this.isEnd = isEnding;
        this.areaZone = this.scene.add.zone(_posX, _posY);     
        this.areaZone.setSize(this.width + 20,this.height + 20);
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setAllowGravity(false);
        this.setPosition(_posX, _posY);
        this.setCollider();

        this.moveTween = this.scene.tweens.add({
            targets: this,
            y: this.target.y - this.target.height / 2,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

    }

    setCollider()
    {
        this.scene.physics.add.overlap(
            this.areaZone,
            this.scene.mario,
            () => {
                this.setTrigger();
            },
            null,
            this
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);

    }

    setTrigger()
    {
        if(this.isEnd)
        {
            this.scene.showWinMenu();
        }
        else
        {
         //   this.scene.mario.checkPointPosition.x = this.x;
         //   this.scale.mario.checkPointPosition.y = this.y;
            this.destroy();
        }
    }
}