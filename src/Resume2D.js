import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";

const App = (props) => {
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ));
  const renderer = useRef(new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }));
  const controls = useRef(null);

  useEffect(() => {
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.current.domElement);
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);

    const captureCanvas = async () => {
      try {
        const canvas = await html2canvas(document.getElementById("resume"));
        const texture = new THREE.CanvasTexture(canvas);

        const materials = [
          new THREE.MeshBasicMaterial({ map: texture }), // right face
          new THREE.MeshBasicMaterial({ map: texture }), // left face
          new THREE.MeshBasicMaterial({ color: 0xcccccc }), // top face
          new THREE.MeshBasicMaterial({ color: 0xcccccc }), // bottom face
          new THREE.MeshBasicMaterial({ map: texture }), // front face
          new THREE.MeshBasicMaterial({ map: texture }), // back face
        ];

        const geometry = new THREE.BoxGeometry(0.05, 5, 3);
        const plane = new THREE.Mesh(geometry, materials);

        scene.current.add(plane);
        camera.current.position.x = 5;
        animate();
      } catch (error) {
        console.error("Lỗi khi chuyển đổi thẻ div thành canvas:", error);
      }
    };

    captureCanvas();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
    };

    return () => {
      document.body.removeChild(renderer.current.domElement);
    };
  }, [props.data]);
  return (
    <div>
      <header id="resume" >
      <div dangerouslySetInnerHTML={{ __html: props.data }}></div>
      {/* <div className="bg-red-500">hello</div> */}
      </header>
    </div>
  );
};

export default App;
