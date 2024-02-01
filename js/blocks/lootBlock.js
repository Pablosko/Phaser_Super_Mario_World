class lootBlock extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'lootBlock');
        _scene.add.existing(this);
        this.scene = _scene;
        this.areaZone = this.scene.add.zone(_posX, _posY + 8);     
        this.areaZone.setSize(12,5);
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.setAllowGravity(false);
        this.areaZone.body.debugBodyColor = 0xffffff;
        this.setCollider();
        this.anims.play('lootBlockAnimation');
    }

    setCollider()
    {
        this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            () => {
                console.log("Collision detected!");
                this.openLootBox();
            },
            null,
            this
        );
    }

    openLootBox()
    {
        this.anims.stop();
        this.setTexture('blocks');
        this.setFrame(1);
        
        let randomNumber = Phaser.Math.Between(1, 4);
        if(randomNumber <= 1)
        {
            this.loot = new pickeableItem(this.scene, this.x, this.y - this.height * 1.5, "normal_coin", 'normalCoin');
        }
        else
        {
            this.loot2 = new mushroomPickeable(this.scene, this.x, this.y - this.height * 1.8, "mushroom", 'powerUps')
        }
        this.areaZone.body.setEnable(false); 
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}