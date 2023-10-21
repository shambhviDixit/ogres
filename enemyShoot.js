AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet(), 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1=new THREE.vector3();
            var position2=new THREE.vector3();

            //Get enemy and player position using Three.js methods
            var enemy=els[i].object3D;
            var player=document.querySelector("#weapon").object3D;
        
            //set the velocity and it's direction
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            var direction=new THREE.vector3();
            direction.subVectors(position1,position2).normalize();

            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0",
            });
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10)
            );
              
            var element=document.querySelector("#countLife")
            var playerLife=parseInt(element.getAttribute("text.value"))

            //Get text attribute
            

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(playerLife>0){
                        playerLife -=1;
                        element.setAttribute("text",{
                           value:playerLife,   
                        });
           }
             else if(playerLife<=0){
                var text=document.querySelector("#over");
                text.setAttribute("visible",true);
                var tankE1=document.querySelectorAll(".enemy");
                for(var i=0; i<tankE1.length; i++){
                    scene.removeChild(tankE1[i]);
                    
                }
             };

                }
            });

        }
    },

});