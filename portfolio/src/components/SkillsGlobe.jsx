import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./SkillsGlobe.css";

/* Globo 3D de tecnologias.
   - Os pontos seguem uma espiral de Fibonacci (distribuição uniforme na esfera).
   - A grade é desenhada em WebGL; os ícones são HTML comum (links acessíveis)
     reposicionados a cada frame a partir da projeção 3D → tela.
   - A cor vem da variável --globo (SkillsGlobe.css) e acompanha o tema. */

const ICON_PX = 40; // largura do .skills-globe__item no CSS
const RADIUS = 3.3;
const DRAG_THRESHOLD = 6; // px: acima disso o clique vira arrasto e não abre o link

function fibonacciSphere(n, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius);
  });
}

const _dir = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _view = new THREE.Vector3();

function Globe({ count, items, accent, light }) {
  const points = useMemo(() => fibonacciSphere(count, RADIUS), [count]);
  const shell = RADIUS * 0.85;
  const iconWorld = THREE.MathUtils.clamp((RADIUS * 0.9) / Math.sqrt(count), 0.45, 0.8);

  useFrame(({ camera, size }) => {
    camera.updateMatrixWorld();
    _camDir.copy(camera.position).normalize();
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    points.forEach((p, i) => {
      const el = items.current[i];
      if (!el) return;

      // 1 = de frente para a câmera, 0 = atrás do globo
      const t = THREE.MathUtils.clamp((_dir.copy(p).normalize().dot(_camDir) - 0.1) * 2, 0, 1);

      _ndc.copy(p).project(camera);
      const x = (_ndc.x + 1) * 0.5 * size.width;
      const y = (1 - _ndc.y) * 0.5 * size.height;
      const depth = -_view.copy(p).applyMatrix4(camera.matrixWorldInverse).z;
      const pxPerUnit = size.height / (2 * tanHalfFov * depth); // longe = menor
      const scale = ((iconWorld * pxPerUnit) / ICON_PX) * (0.8 + 0.4 * t);

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(t);
      el.style.zIndex = String(Math.round(t * 100));
      el.style.pointerEvents = t > 0.8 ? "auto" : "none";
      el.style.visibility = t < 0.02 ? "hidden" : "visible"; // sai da ordem do Tab
    });
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={light ? 0.55 : 0.4} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={light ? 0.14 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={light ? 0.04 : 0.06} />
      </mesh>
    </group>
  );
}

// Afasta a câmera até o globo caber inteiro (inclusive em telas estreitas)
function FitCamera({ radius }) {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);

  useLayoutEffect(() => {
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    camera.position.setLength(radius / Math.sin(Math.min(vFov, hFov) / 2));
  }, [camera, aspect, radius]);

  return null;
}

// Giro com o mouse/dedo. Escuta o container (e não só o canvas) para que
// arrastar em cima de um ícone também gire o globo.
function Controls({ element, motion }) {
  const camera = useThree((s) => s.camera);
  const controls = useRef(null);

  useEffect(() => {
    const c = new OrbitControls(camera, element);
    c.enableZoom = false;
    c.enablePan = false;
    c.autoRotate = motion;
    c.autoRotateSpeed = 1;
    c.minPolarAngle = Math.PI / 3;
    c.maxPolarAngle = Math.PI / 1.5;
    controls.current = c;
    return () => c.dispose();
  }, [camera, element, motion]);

  useFrame((_, delta) => controls.current?.update(delta));
  return null;
}

export default function SkillsGlobe({ skills, dica }) {
  const container = useRef(null);
  const items = useRef([]);
  const dragStart = useRef(null);
  const [accent, setAccent] = useState("#111111");
  const [light, setLight] = useState(true);
  const [visible, setVisible] = useState(true);
  const [element, setElement] = useState(null);
  const [motion] = useState(
    () => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  // Lê a cor do tema atual e acompanha o botão de tema claro/escuro
  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;
    setElement(el);
    const ler = () => {
      setAccent(getComputedStyle(el).getPropertyValue("--globo").trim() || "#111111");
      setLight(document.documentElement.dataset.tema !== "escuro");
    };
    ler();
    const observer = new MutationObserver(ler);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-tema"],
    });
    return () => observer.disconnect();
  }, []);

  // Fora da tela, para de renderizar (economiza bateria)
  useEffect(() => {
    const el = container.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Arrastar em cima de um ícone gira o globo; só abre o link num clique "parado"
  const onPointerDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onClickCapture = (e) => {
    const start = dragStart.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="skills-globe">
      <div
        ref={container}
        className="skills-globe__stage"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        <Canvas
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0, 9], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
        >
          <FitCamera radius={RADIUS * 1.2} />
          <Globe count={skills.length} items={items} accent={accent} light={light} />
          {element && <Controls element={element} motion={motion} />}
        </Canvas>

        <ul className="skills-globe__layer">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <li key={skill.name} className="skills-globe__li">
                <a
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  className="skills-globe__item"
                  style={{ "--skill": skill.color }}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  aria-label={skill.name}
                >
                  <Icon className="skills-globe__icon" aria-hidden="true" />
                  <span className="skills-globe__label">{skill.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="skills-globe__hint">{dica}</p>
    </div>
  );
}