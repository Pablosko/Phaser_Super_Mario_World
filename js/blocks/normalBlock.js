class normalBlock extends block {
    constructor(_scene, block)
    {
        super(_scene, block);
        this.setFrame(block.frame);        
    }

    setCollider()
    {
        super.setCollider();

    }
    

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}
