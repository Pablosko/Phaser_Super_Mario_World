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
    onCollideCeil()
    {
        super.onCollideCeil();

        this.anims.play('eyeCoinImpact');
        this.body.setEnable(false);
        this.scene.time.delayedCall(5000, () => {

            this.body.setEnable(true);
            this.anims.stop();
            this.setFrame(0);
        });
    }
}
