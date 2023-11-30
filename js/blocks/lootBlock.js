class lootBlock extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'lootBlock');
        _scene.add.existing(this);
        this.scene = _scene;

      
        this.anims.play('lootBlockAnimation');
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}