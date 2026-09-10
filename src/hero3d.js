import * as THREE from '../assets/vendor/three.module.min.js';
const fallback=document.querySelector('.money-hero-art');
const canvas=fallback?.parentElement?.insertBefore(Object.assign(document.createElement('canvas'),{id:'money-hero-3d',className:'money-hero-3d',hidden:true,ariaHidden:'true'}),fallback.nextSibling);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, constrained=navigator.connection?.saveData||innerWidth<760;
if(canvas&&!reduce&&!constrained&&globalThis.WebGLRenderingContext){try{
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,4.6,10);camera.lookAt(0,0,0);const group=new THREE.Group();scene.add(group);
 const colors=[0x07505a,0x36bda7,0xe58b2b];[2.9,2.18,1.5].forEach((radius,i)=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.055,12,96),new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.78}));ring.rotation.x=Math.PI/2;ring.position.y=(i-1)*.72;group.add(ring);for(let n=0;n<7-i;n++){const a=n*Math.PI*2/(7-i)+i*.35,dot=new THREE.Mesh(new THREE.IcosahedronGeometry(.12,1),new THREE.MeshBasicMaterial({color:colors[i]}));dot.position.set(Math.cos(a)*radius,(i-1)*.72,Math.sin(a)*radius);group.add(dot)}});
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.48,2),new THREE.MeshBasicMaterial({color:0xe58b2b,wireframe:true}));core.position.y=.72;group.add(core);
 let tx=0,ty=0,raf=0,visible=true;const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()};
 const animate=t=>{if(!visible)return;group.rotation.y+=(ty-group.rotation.y)*.035;group.rotation.x+=(tx-group.rotation.x)*.035;core.rotation.y=t*.00035;renderer.render(scene,camera);raf=requestAnimationFrame(animate)};
 new ResizeObserver(resize).observe(canvas);new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf)raf=requestAnimationFrame(animate);if(!visible){cancelAnimationFrame(raf);raf=0}}).observe(canvas);
 canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();ty=((e.clientX-r.left)/r.width-.5)*.22;tx=((e.clientY-r.top)/r.height-.5)*.1},{passive:true});canvas.addEventListener('pointerleave',()=>{tx=ty=0},{passive:true});
 resize();canvas.hidden=false;canvas.classList.add('is-ready');fallback?.classList.add('is-3d-ready');raf=requestAnimationFrame(animate);
}catch(e){canvas.hidden=true}}
