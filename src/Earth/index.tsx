import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Earth = () => {
  const initThree = () => {
    //定义渲染尺寸
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    //初始化渲染器
    const canvas = document.querySelector('canvas.webgl');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    scene.fog = new THREE.Fog(0x1a1a1a, 1, 1000);
    //初始化相机
    const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height);
    scene.add(camera);
    camera.position.set(20, 100, 450);
    //页面缩放时间监听
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      //更新渲染
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      //更新相机
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    });
    //初始化控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    //添加光源
    const light = new THREE.AmbientLight(0xdeedff, 1.5);
    scene.add(light);
    //创建星球
    const SphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x03c03c,
      wireframe: true,
    });
    const SphereGeometry = new THREE.SphereGeometry(80, 32, 32);
    const planet = new THREE.Mesh(SphereGeometry, SphereMaterial);
    scene.add(planet);
    //创建星球轨道环
    const TorusGeometry = new THREE.TorusGeometry(150, 8, 2, 120);
    const TorusMaterial = new THREE.MeshLambertMaterial({
      color: 0x40a9ff,
      wireframe: true,
    });
    const ring = new THREE.Mesh(TorusGeometry, TorusMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = -0.1 * (Math.PI / 2);
    scene.add(ring);
    //创建卫星
    const IcoGeometry = new THREE.IcosahedronGeometry(5, 0);
    const IcoMaterial = new THREE.MeshToonMaterial({ color: 0xfffc00 });
    const satellite = new THREE.Mesh(IcoGeometry, IcoMaterial);
    scene.add(satellite);
    //创建星星
    const stars = new THREE.Group();
    for (let i = 0; i < 500; i++) {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 2, 0);
      const material = new THREE.MeshToonMaterial({ color: 0xeeeeee });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 700;
      mesh.position.y = (Math.random() - 0.5) * 700;
      mesh.position.z = (Math.random() - 0.5) * 700;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      stars.add(mesh);
    }
    scene.add(stars);
    //动画更新
    let rot = 0;
    //动画
    const axis = new THREE.Vector3(0, 0, 1);
    const tick = () => {
      //更新渲染器
      renderer.render(scene, camera);
      //给网络模型添加一个转动动画
      rot += Math.random() * 0.8;
      const radian = (rot * Math.PI) / 180;
      //星球位置动画
      planet && (planet.rotation.y += 0.005);
      //星球轨道环位置动画
      ring && ring.rotateOnAxis(axis, Math.PI / 400);
      //卫星位置动画
      satellite.position.x = 250 * Math.sin(radian);
      satellite.position.y = 100 * Math.cos(radian);
      satellite.position.z = -100 * Math.cos(radian);
      satellite.rotation.x += 0.005;
      satellite.rotation.y += 0.005;
      satellite.rotation.z -= 0.005;
      //星星动画
      controls.update();
      //页面重绘时调用自身
      window.requestAnimationFrame(tick);
    };
    tick();
  };
  React.useEffect(() => {
    initThree();
  });
  return (
    <canvas
      className="webgl"
      style={{ position: 'fixed', top: '0', left: '0', outline: 'none' }}
    ></canvas>
  );
};
export default Earth;
