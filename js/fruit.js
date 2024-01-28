class fruit extends pickeableItem
{
    constructor(_scene, _zone, _spriteTag)
    { //instanciar el objeto
        super(_scene, _zone, _spriteTag);      
    }
    pickItem()
    {
        console.log("pick fruit");
    }
}