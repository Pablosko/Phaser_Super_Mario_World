class buttonPBlock extends block
{
    constructor(_scene, block)
    {
        super(_scene, block);
        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        this.setFrame(block.frame);
        this.blocks = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.pressed = false;
    }
    setCollider()
    {
        super.setCollider();
        this.collider = this.scene.physics.add.collider
        (
            this,
            this.scene.walls,
            this.onCollideMario,
            null,
            this
        );
    }

    onCollideFloor()
    {
        super.onCollideFloor();
        if(this.pressed)
            return;
        this.convertBlocks()
        this.scene.time.delayedCall(5000, () => {

            this.body.setEnable(true);
            this.anims.stop();
            this.setFrame(0);
            this.convertToCoins();
        });
    }
    
    convertBlocks() {
        this.pressed = true;
        this.setFrame(1);
        this.scene.coinsGroup.getChildren().forEach((element) => {
            const data = { posX: element.x, posY: element.y, spriteTag: 'blocks', frame: 1 };
            console.log(element.y);
            this.blocks.add(new normalBlock(this.scene, data));
            element.enable(false);
        });
    }
    convertToCoins()
    {
        this.pressed = false;
        this.setFrame(0);
        this.blocks.getChildren().forEach(function (element) {

            this.destroy(element)
        });
        this.scene.coinsGroup.getChildren().forEach(function (element) {

            element.enable(true);
        });
    }
}