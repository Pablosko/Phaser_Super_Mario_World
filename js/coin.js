
class coinPickeable extends pickeableItem
{
    constructor(_scene, _zone, _spriteTag)
    {
        super(_scene, _zone, _spriteTag);
    }

    pickItem()
    {
        console.log("1 coin");
    }
}