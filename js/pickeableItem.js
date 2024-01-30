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
            case "eye_coin":
                this.areaZone.setSize(16, 16);
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
        this.body.setAllowGravity(false); // No permitir gravedad
        this.body.setImmovable(true); // Hacer el objeto inmóvil
    }
    setColliders()
    {
        this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            () => {
                console.log("ItemPicked")
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
        console.log("1 coin");
        switch(this.object)
        {
            case "normal_coin":
                this.scene.events.emit('addCoin', 1);
                this.areaZone.body.setEnable(false); 
                this.destroy();
            break;
            case "yoshi_coin":
                this.scene.events.emit('addYoshiCoin');
                this.areaZone.body.setEnable(false); 
                this.destroy();
            break;     
            case "fruit":
                console.log("Get fruit");
                //Si esta en yoshi y yoshi != comiendo
            break;
            case "eye_coin":
                this.anims.play('eyeCoinImpact');
            break;
        }
    }


}