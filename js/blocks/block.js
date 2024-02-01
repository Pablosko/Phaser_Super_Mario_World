class block extends Phaser.GameObjects.Sprite  {
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block.posX, block.posY, block.spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setCollider();
        
    }

    setCollider()
    {
        this.collider = this.scene.physics.add.collider
        (
            this,
            this.scene.mario,
            this.onCollideMario,
            null,
            this
        );
    }
    
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
    onCollideMario()
    {
        if (this.scene.mario.body.touching.down && this.body.touching.up)
        {
            this.onCollideFloor()
        }
        if (this.scene.mario.body.touching.up && this.body.touching.down)
        {
            this.onCollideCeil()
        }
    }
    onCollideCeil()
    {
        this.scene.mario.canJump = false
        this.scene.mario.body.setVelocityY(50);
    }
    onCollideFloor()
    {
        this.resetMarioJump()
    }
    resetMarioJump()
    {
        this.scene.mario.currentJumpFrames = 0;
        this.scene.mario.jumping = false;
        this.scene.mario.spining = false;
        this.scene.mario.body.checkCollision.up = false;
    }
}
