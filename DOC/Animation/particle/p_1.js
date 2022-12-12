//Load Event:will make sure that the entire webite including all //
//dependant resources such as stylesheets and images is fully loaded and available before we run any JavaScript code//


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

//particle system is a collection of small object.//
// Each particle is a small graphical element, it can be an image or a shape.//
//We can program these particles to look and behave in a certain way to simulate all different kinds effects.//
// It could be fire, fog, bouncing balls, swarms of enemies in a game or many other things.//
    //JavaScript classes are blueprints to create many similar objects.//
    // A prototype based language//
    //Classes in JavaScript are so called"syntactical sugar."//
    //it's a cleaner and more elegant syntax built over native JavaScript prototype basedd inheritance,that mimics classes from other programming languages.//



    class Particle {
        //particle class as a blueprint to creat individual particle objects//
        constructor(effect){
            this.effect = effect;
            //every particle will be a piece of an image a pixel so it will need to sit at a very specific position.//
            // and all the particle combined will make up the whole image that means it will need X and Y coordinates so that JavaScript knows where on canvas to draw it. //
            this.x = Math.random() * this.effect.width;
            //horizontal x-axis going from 0 pixels on the left and increasing as we move right.//
            this.y = Math.random() * this.effect.height;
            //vertical y-axis starting at the zero pixels up top and increasing as we go down.//
            this.size = 10;
            //can set the speed vx(velocity x) & vy(velocity y)from 0 to 10// //
            this.vx = Math.random() * 2 - 1;
            this.vx = Math.random() * 2 - 1;//If we want to set the particle to move in all possible direction not just right and down// 
            //-----------this line means a random number between -1 and plus one // 
            //we can push the speed range to start from negative numbers//
        }
        draw(context){
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    class Effect{
        //effect class to handle all particle at the same time.//
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
        }
        // The push method adds one or more elements to the end of the array.//
        init(){
            /*for (let i = 0; i < 100; i++){
                this.particlesArray.push(new Particle(this));
            }*/
            
        }
        draw(context){
            //The forEach method executes a provided funtion once for each array element.//
            //es6 Ro funtion//
            this.particlesArray.forEach(particle => particle.draw(context));
            context.drawImage(this.image, this.x, this.y);
        }
        update(){
            this.particlesArray.forEach(particle => particle.update());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();
   
    // creat a new variable like this // 
    // The new keyword is a special command in JavaScript it will look for a class with that name//
    //it will find that class  on line 9 and it will automatically trigger its Constuctor method //
    //Constructor will creat one new blank object and it will assign it properties based on the blueprint inside //
            //--const particle1 = new Particle();//
            //-- particle1.draw(); but this  would not be very efficient// 

    function animate(){
        //animation Loop to make it all animated and interactive.//
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update(); 
        window.requestAnimationFrame(animate);
    }
    animate();
    //Take CTX variable from line 3 .//
    //that holds an instance cnavas 2D drawing API.//
    //It expects four arguments X and Y position where to draw it.// 
        //--ctx.fillRect(120, 150, 100, 200);--//
        //--ctx.drawImage(image1, 300,100,500, 500);--//
});

