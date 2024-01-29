class fruit extends pickeableItem
{
    constructor(_scene, _zone, _spriteTag)
    { //instanciar el objeto
        super(_scene, _zone, _spriteTag);      
        this.setDepth(50);
    }

    pickItem()
    {
        console.log("pick fruit");
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}