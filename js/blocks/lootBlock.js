class lootBlock extends block
{
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block);
        this.anims.play('lootBlockAnimation');
        this.content = block.content.find(prop => prop.name === 'content').value;
        this.looted = false;
    }
    
    onCollideCeil()
    {
    
        super.onCollideCeil();
        if(this.looted)
             return;
        this.anims.stop();
        this.setTexture('blocks');
        this.setFrame(1);
        this.loot;
        console.log(this.content)
        if(this.content == "mushroom")
        {
            this.loot = new mushroomPickeable(this.scene, this.x, this.y - this.height * 1.8, "mushroom", 'powerUps')
        }else if(this.content == "yoshi")
        {
            this.loot = new yoshi(this.scene, this.x, this.y - this.height * 1.5, "yoshi", 'egg');
        }
        else
        {
            this.loot = new pickeableItem(this.scene, this.x, this.y - this.height * 1.5, "normal_coin", 'normalCoin');
        }
        this.looted = true;
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}