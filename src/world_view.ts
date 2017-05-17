import * as THREE from 'three';
import {Stats} from 'stats';

export class WorldView 
{

    private camera: THREE.OrthographicCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private container: HTMLDivElement;

    public Start(): void
    {
        this.scene = new THREE.Scene();
        this.SetupCamera(this.scene);
        this.CreateObjects(this.scene);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( 0xf0f0f0 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        this.container = document.createElement( 'div' );
        this.container.appendChild(this.renderer.domElement);

        var stats = new Stats();
		this.container.appendChild( stats.dom );

        this.animate();
    }

    public GetDomElement() : HTMLDivElement{
        return this.container;
    }   

    public onResize(innerWidth:number, innerHeight:number):void {
        this.camera.left = innerWidth / - 2;
        this.camera.right = innerWidth / 2;
        this.camera.top = innerHeight / 2;
        this.camera.bottom = innerHeight / - 2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( innerWidth, innerHeight );
    }

    public animate():void {
        console.log("render");
        requestAnimationFrame( this.animate );
        // roda a camera ao redor de Z
        //var timer = Date.now() * 0.0001;
        //camera.position.x = Math.cos( timer ) * 200;
        //camera.position.z = Math.sin( timer ) * 200;
        this.renderer.render( this.scene, this.camera );
    }


    private SetupCamera(scene: THREE.Scene) : void {
        this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
        this.camera.position.x = 200;
        this.camera.position.y = 100;
        this.camera.position.z = 200;    
        this.camera.lookAt( scene.position );
    }

    private CreateObjects(scene: THREE.Scene) 
    {
        var crate_texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        var crate_material = new THREE.MeshBasicMaterial( { map: crate_texture } );

        /*var crate_geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
        var mesh = new THREE.Mesh( crate_geometry, crate_material );
        scene.add( mesh );*/

        /**********************GRID**********************/
        var size = 500, step = 50;
        var grid_geometry = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step ) {
            grid_geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
            grid_geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
            grid_geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
            grid_geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
        }
        var grid_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
        var line = new THREE.LineSegments( grid_geometry, grid_material );
        scene.add( line );


        /**********************CUBES**********************/
        var cubes_geometry = new THREE.BoxGeometry( 50, 50, 50 );
        var cubes_material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
        for ( var i = 0; i < 100; i ++ ) {
            var cube = new THREE.Mesh( cubes_geometry, cubes_material );
            cube.scale.y = Math.floor( Math.random() * 2 + 1 );
            cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
            cube.position.y = ( cube.scale.y * 50 ) / 2;
            cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
            this.scene.add( cube );
        }

        /**********************LIGHTS**********************/
        var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
        this.scene.add( ambientLight );

        var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        this.scene.add( directionalLight );

        var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        this.scene.add( directionalLight );
    }
}