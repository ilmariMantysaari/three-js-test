import * as three from 'three';
import { log } from 'three';

const bulju = require('./textures/bulju.png')

class Game {

    scene: three.Scene;
    camera: three.Camera;
    renderer: three.Renderer;
    k = 0;
    l = 0;
    meshes: three.Mesh[] = [];

    constructor() {
        this.camera = new three.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;

        this.scene = new three.Scene();

        this.renderer = new three.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        
        this.initObjects();
        this.animate();
    }
    
    initObjects = () => {
        const texture = new three.TextureLoader().load(bulju );
        const geometry = new three.BoxGeometry( 0.1, 0.1, 0.1 );
        const material = new three.MeshNormalMaterial();

        const start = -0.7;
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                const buljuMesh = new three.Mesh( geometry,
                    new three.MeshBasicMaterial( { map: texture, side: three.DoubleSide } ) )
                buljuMesh.position.setX(start + (i * 0.15));
                buljuMesh.position.setY(start + (j * 0.15));
                this.meshes.push(buljuMesh);
            }
        }

        this.meshes.forEach(m => this.scene.add( m ));
    }

    animate = () => {
        requestAnimationFrame( this.animate );
        this.k += 0.03;
        this.l += 0.03;

        this.meshes.map(m => {
            m.rotation.y += Math.cos(this.k) / 10;
            m.rotation.z += Math.sin(this.l) / 10;

            m.position.x += Math.sin(this.l) / 500;
            m.position.y += Math.cos(this.l) / 500;
        });

        this.renderer.render( this.scene, this.camera );
    }
}

const game = new Game();


