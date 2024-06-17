import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

const CanvasTextureBox = ({ children }) => {
  const captureRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const captureElement = captureRef.current;

    html2canvas(captureElement).then((canvas) => {
      // Create a texture from the canvas
      const texture = new THREE.CanvasTexture(canvas);

      // Create materials for the box
      const materials = [
        new THREE.MeshBasicMaterial({ map: texture }), // right face
        new THREE.MeshBasicMaterial({ map: texture }), // left face
        new THREE.MeshBasicMaterial({ color: 0xcccccc }), // top face
        new THREE.MeshBasicMaterial({ color: 0xcccccc }), // bottom face
        new THREE.MeshBasicMaterial({ map: texture }), // front face
        new THREE.MeshBasicMaterial({ map: texture }),  // back face
      ];

      // Create the 3D geometry and mesh
      const geometry = new THREE.BoxGeometry(0.05, 5, 3);
      const plane = new THREE.Mesh(geometry, materials);

      // Set up the scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Add the mesh to the scene
      scene.add(plane);

      // Position the camera
      camera.position.x = 5;

      // Render loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    }).catch((error) => {
      console.error('Error converting div to canvas:', error);
    });

  }, []);

  return (
    <div>
      <div id="capture" ref={captureRef}>
        {children}
      </div>
      <div ref={mountRef}></div>
    </div>
  );
};

export default CanvasTextureBox;
