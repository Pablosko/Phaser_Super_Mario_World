class normalBlock extends Phaser.GameObjects.Sprite  {
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block.posX, block.posY, block.spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this.setCollider();
        this.setFrame(block.frame);
        
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
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    resetMarioJump()
    {
        this.scene.mario.currentJumpFrames = 0;
        this.scene.mario.jumping = false;
        this.scene.mario.spining = false;
        this.scene.mario.body.checkCollision.up = false;
    }
}
