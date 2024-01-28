class pickeableItem extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _zone, _spriteTag)
    {
        super(_scene, _zone.posX, _zone._posY, _spriteTag);
        this.scene = _scene;
        this.areaZone = this.scene.add.zone(_zone.posX, _zone._posY);
        /*
        switch(_zone.id)
        {
            case "coin":
                this.areaZone.setSize(32, 32);
            break;
            case "apple":
                this.areaZone.setSize(32, 32);
            break;
            default:
            break;
        }*/
        this.areaZone.setSize(32,32);

        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.debugBodyColor = 0xffffff;
        this.setColliders();
        this.zone = _zone;
        this.zone.areaZone = this.areaZone;
    }

    setColliders()
    {
        this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            function() {
                console.log("ItemPicked")
                this.pickItem();
            },
            null,
            this
        );
    }

    pickItem()
    {

    }
}