class normalBlock extends block {
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block);
        _scene.add.existing(this);
        this.scene = _scene;
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this.setCollider();
        this.setFrame(block.frame);
        
    }

   
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}
