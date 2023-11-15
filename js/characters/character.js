class character extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.character = this;
        this.setColliders();
    }
    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.floor,
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}