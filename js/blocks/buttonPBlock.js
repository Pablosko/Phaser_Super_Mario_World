class buttonPBlock extends block
{
    constructor(_scene, block)
    {
        super(_scene, block);
        this.setFrame(block.frame);
        this.blocks = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.pressed = false;
        this.body.setAllowGravity(true);
        this.body.immovable = false;
        this.colliding = false;
    }
    setCollider()
    {
        super.setCollider();
        this.collider2 = this.scene.physics.add.collider
        (
            this,
            this.scene.walls,
            () => { this.body.immovable = true;},
            null,
            this
        );
     
      
    }

    onCollideFloor()
    {
        super.onCollideFloor();
        if(this.pressed)
            return;
        this.setFrame(1);
        this.convertBlocks()
        this.body.enable =false;
        this.collider.active = false;
        this.scene.time.delayedCall(250, () => {
            this.setVisible(false);
        });
        this.scene.time.delayedCall(1000, () => {

            this.body.setEnable(true);
            this.anims.stop();
            this.setFrame(0);
            this.convertToCoins();
        });
    }
    
    convertBlocks() {
        this.pressed = true;
        this.scene.coinsGroup.getChildren().forEach((element) => {
            const data = { posX: element.x, posY: element.y, spriteTag: 'blocks', frame: 1 };
            console.log(element.y);
            this.blocks.add(new normalBlock(this.scene, data));
            element.enable(false);
        });
    }
    convertToCoins() {
        this.setFrame(0);

        // Destruir todos los elementos dentro del grupo 'blocks'
        this.blocks.clear(true, true);

        if (this.scene && this.scene.coinsGroup) {
            this.scene.coinsGroup.getChildren().forEach((element) => {
                element.enable(true);
            });
        }
    }
    preUpdate(time,delta)
    {
    }
}