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
        this.maxHp = 2;
        this.hp = this.maxHp;
    }
    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.floor,
        );
    }
    getDamage(damage,body)
    {
        this.hp-= damage
        if(this.hp <= 0)
            this.destroy(this);
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}