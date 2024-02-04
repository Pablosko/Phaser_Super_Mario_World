
class trasparentBlock extends block{
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block);
        this.setFrame(block.frame);        
    }
    
    setCollider()
    {

    }
   
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}