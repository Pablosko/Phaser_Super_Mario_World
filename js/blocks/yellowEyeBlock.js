class yellowEyeBlock extends block {
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block);
        this.setFrame(block.frame);
    }
   
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
    
    setCollider()
    {
        super.setCollider();
        this.collider = this.scene.physics.add.collider
        (
            this,
            this.scene.pblocks,
            this.onCollideMario,
            null,
            this
        );
    }
    onCollideCeil()
    {
        super.onCollideCeil();

        this.anims.play('eyeCoinImpact');
        this.body.setEnable(false);
        this.collider.active = false;
        this.scene.time.delayedCall(5000, () => {

            this.body.setEnable(true);
            this.collider.active = true;
            this.anims.stop();
            this.setFrame(0);
        });
    }
}
