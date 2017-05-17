import { WorldView } from './world_view';

let world = new WorldView();
world.Start();

document.body.appendChild( world.GetDomElement() );

window.addEventListener( 'resize', function () {
    world.onResize(window.innerWidth, window.innerHeight);
}, false);

//world.animate();
	