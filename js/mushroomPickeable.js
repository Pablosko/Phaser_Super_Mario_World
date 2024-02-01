
class mushroomPickeable extends pickeableItem 
{
    constructor(_scene, posX, posY, id, _spriteTag)
    {
        super(_scene, posX, posY, id, _spriteTag);
        this.areaZone.body.setImmovable(false);
        this.body.setSize(this.width * 0.7, this.height);
        this.body.setImmovable(false);
        this.body.setAllowGravity(true); 
        this.setColliders();
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        this.x += .2;
        this.areaZone.x = this.x;
        this.areaZone.y = this.y;
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


     this.scene.physics.add.collider
        (
            this,
            this.scene.walls,
            this.cosa,
            null,
            this
        );
        this.scene.physics.add.collider
        (
            this,
            this.scene.pipes,
            this.cosa,
            null,
            this
        );

        this.scene.physics.add.collider
        (
            this,
            this.scene.lootBlocks,
            this.cosa,
            null,
            this
        );
    }


    cosa()
    {

    }
}