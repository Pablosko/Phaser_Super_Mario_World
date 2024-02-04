class enredaderaBlock extends block
{
    constructor(_scene, block)
    { //instanciar el objeto
        super(_scene, block);
        this.setFrame(block.frame);    
        this.areaZone = this.scene.add.zone(block.posX, block.posY);     
        this.areaZone.setSize(16,16);
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.setAllowGravity(false);
        this.areaZone.body.debugBodyColor = 0xffffff;
        this.marioGoUp = false;
        this.setCollider();
        this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    
    setCollider()
    {

    }
   
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.mario.getBounds(), this.areaZone.getBounds())) {
            if (this.upKey.isDown) {
                this.scene.mario.body.setAllowGravity(false);
                this.scene.mario.body.setVelocityY(-100); // Ajusta la velocidad según tus necesidades
            } else {
                this.scene.mario.body.setAllowGravity(true);
            }
        } else {
            this.scene.mario.body.setAllowGravity(true);
        }
    }
}