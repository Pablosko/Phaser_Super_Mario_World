
class coinPickeable extends pickeableItem
{
    constructor(_scene, _zone, id, _spriteTag)
    {
        super(_scene, _zone, _spriteTag);
        this.setDepth(50);

        switch(id)
        {
            case "normal_coin":
                //play normalCoin Animation
                this.anims.play('normalCoinIdle');
            break;
            case "yoshi_coin":
                this.anims.play('yoshiCoinIdle');
            break;
        }
        this.object = id;
    }
    pickItem()
    {
        console.log("1 coin");
        switch(this.object)
        {
            case "normal_coin":
                console.log("get normal coin");
            break;
            case "yoshi_coin":
                console.log("Get yoshi coin");
            break;     
        }
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}