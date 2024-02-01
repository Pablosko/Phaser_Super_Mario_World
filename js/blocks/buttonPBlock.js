class buttonPBlock extends Phaser.GameObjects.Sprite
{
    constructor(_scene, block)
    {
        super(_scene, block.posX, block.posY, block.spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        //Create Area Zone
        this.areaZone = this.scene.add.zone(block.posX, block.posY);     
        this.areaZone.setSize(16,16);
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.setAllowGravity(false);
        this.areaZone.body.debugBodyColor = 0xffffff;

        this.setFrame(block.frame);
    }

    setZoneCollider()
    {
        this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            () => {
                this.onTriggerEnter();
            },
            null,
            this
        );
    }

    setCollider()
    {
        this.collider = this.scene.physics.add.collider
        (
            this,
            this.scene.mario,
            this.resetMarioJump,
            null,
            this
        );
        this.destroy(this.areaZone);
    }

    onTriggerEnter()
    {
        //Drop to ground
        //Si caes encima
        this.setCollider();
    }

    onJumpUp()
    {
        this.setFrame(1);
        //convert coins into blocks
    }
}