class redPlant extends enemy{
    constructor(_scene,_posX,_posY,_type) {
        super(_scene,_posX,_posY,'redPlant');
        this.anims.play('plantRedIdle')
        this.type = _type;

        this.setColliders();

        this.moveTween = this.scene.tweens.add({
            targets: this,
            y:  this.y - 100,
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
    }


    setColliders()
    {

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    CollideWithPlayer(enemie,player)
    {
        if(enemie.body == undefined)
            return;
        super.CollideWithPlayer(enemie,player);
    }


    getDamage(damage,body)
    {
    }
}