import { useEffect, useRef, useMemo, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

const models = ['arm.gltf', 'bot.gltf', 'code'];
const CYCLE_DURATION = 8000;
const FADE_DURATION = 1500;

import { Html } from '@react-three/drei';
import BackgroundCode from './BackgroundCode';
import { useEffects } from './EffectsContext';

// Shared materials to avoid creating them per-mesh
const solidMaterialCache = new THREE.MeshStandardMaterial({
  color: 0x1a0505,
  transparent: true,
  opacity: 0,
  roughness: 0.3,
  metalness: 0.6,
});

const wireframeMaterialCache = new THREE.MeshBasicMaterial({
  color: 0xdc2626,
  wireframe: true,
  transparent: true,
  opacity: 0,
});

const CodeModel = memo(({ index, currentIndexRef, fadeProgress, effectsEnabled }: { index: number; currentIndexRef: React.MutableRefObject<number>; fadeProgress: React.MutableRefObject<number>; effectsEnabled: boolean }) => {
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (htmlRef.current) {
      const active = index === currentIndexRef.current;
      const isNext = index === (currentIndexRef.current + 1) % models.length;
      
      let currentOpacity = 0;
      if (active) currentOpacity = fadeProgress.current;
      else if (isNext) currentOpacity = 1 - fadeProgress.current;
      
      // Add a tiny bit of rounding to prevent floating point CSS bugs
      const roundedOpacity = Math.max(0, Math.min(1, currentOpacity)).toFixed(3);
      htmlRef.current.style.opacity = roundedOpacity;
    }
  });

  return (
    <Html fullscreen zIndexRange={[10, 0]} className="pointer-events-none flex items-center justify-center">
      <div ref={htmlRef} className="w-full h-full relative" style={{ opacity: 0 }}>
        <BackgroundCode forceEffectsEnabled={effectsEnabled} />
      </div>
    </Html>
  );
});

const GLTFModel = memo(({ url, index, currentIndexRef, fadeProgress, effectsEnabled }: { url: string; index: number; currentIndexRef: React.MutableRefObject<number>; fadeProgress: React.MutableRefObject<number>; effectsEnabled: boolean }) => {
  const { scene } = useGLTF(`/models/${url}`);
  const modelRef = useRef<THREE.Group>(null);
  
  // Clone scene to avoid mutating the cached GLTF (do this only once per model)
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    // Calculate bounding box and scale to fit a standard size
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Target size we want all models to roughly match
    const targetSize = 4;
    const scale = targetSize / maxDim;
    
    clone.scale.set(scale, scale, scale);
    
    // Setup materials initially
    const meshes: THREE.Mesh[] = [];
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    // Share materials across all instances of the same model
    meshes.forEach((mesh) => {
      mesh.material = solidMaterialCache.clone();

      const wireframeMesh = new THREE.Mesh(mesh.geometry, wireframeMaterialCache.clone());
      wireframeMesh.name = "WireframeOverlay";
      mesh.add(wireframeMesh);
    });
    
    return clone;
  }, [scene]);

  useFrame(() => {
    if (!modelRef.current) return;
    
    const active = index === currentIndexRef.current;
    const isNext = index === (currentIndexRef.current + 1) % models.length;

    let currentOpacity = 0;
    if (active) currentOpacity = fadeProgress.current;
    else if (isNext) currentOpacity = 1 - fadeProgress.current;

    // Aggressively cull invisible objects completely
    if (currentOpacity <= 0.01) {
      if (modelRef.current.visible) modelRef.current.visible = false;
      return;
    }
    
    if (!modelRef.current.visible) modelRef.current.visible = true;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.Material) {
          if (child.name === "WireframeOverlay") {
            child.material.opacity = effectsEnabled ? 0.4 * currentOpacity : 0.15 * currentOpacity;
          } else {
            child.material.opacity = effectsEnabled ? 0.85 * currentOpacity : 0.5 * currentOpacity;
          }
        }
      }
    });
  });

  return (
    <Center ref={modelRef} visible={false}>
      <primitive object={clonedScene} />
    </Center>
  );
});

// Preload models
models.forEach((url) => {
  if (url !== 'code') {
    useGLTF.preload(`/models/${url}`);
  }
});

function SceneContent({ effectsEnabled }: { effectsEnabled: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  // Use a ref for the index instead of state to prevent ANY re-renders in the children
  const currentIndexRef = useRef(0);
  const fadeProgress = useRef(1); // 1 means fully visible

  useEffect(() => {
    let cycleTimeout: number;
    
    const startCycle = () => {
      cycleTimeout = window.setTimeout(() => {
        const startTime = Date.now();
        
        const transition = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / FADE_DURATION, 1);
          
          fadeProgress.current = 1 - progress;

          if (progress < 1) {
            requestAnimationFrame(transition);
          } else {
            currentIndexRef.current = (currentIndexRef.current + 1) % models.length;
            fadeProgress.current = 1;
            startCycle();
          }
        };
        
        requestAnimationFrame(transition);
      }, CYCLE_DURATION - FADE_DURATION); // Start fading before cycle ends
    };

    startCycle();
    return () => clearTimeout(cycleTimeout);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3375;
      
      const targetX = (pointer.x * Math.PI) / 8;
      const targetY = (pointer.y * Math.PI) / 8;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      
      <group ref={groupRef}>
        {models.map((url, i) => {
          if (url === 'code') return null; // We render code model outside the rotating group
          return (
            <GLTFModel 
              key={url} 
              url={url} 
              index={i}
              currentIndexRef={currentIndexRef}
              fadeProgress={fadeProgress} 
              effectsEnabled={effectsEnabled}
            />
          );
        })}
      </group>
      
      {/* CodeModel rendered outside the rotating group so the HTML doesn't jump as it rotates */}
      <CodeModel 
        key="code" 
        index={models.indexOf('code')}
        currentIndexRef={currentIndexRef}
        fadeProgress={fadeProgress} 
        effectsEnabled={effectsEnabled}
      />
    </>
  );
}

export default function ModelViewer() {
  const { effectsEnabled } = useEffects();
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <SceneContent effectsEnabled={effectsEnabled} />
    </Canvas>
  );
}
