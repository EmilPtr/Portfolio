import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

const models = ['arm.gltf', 'bot.gltf', 'code'];
const CYCLE_DURATION = 8000;
const FADE_DURATION = 1500;

import { Html } from '@react-three/drei';
import BackgroundCode from './BackgroundCode';
import { useEffects } from './EffectsContext';

function Model({ url, visible, fadeOpacity, effectsEnabled }: { url: string; visible: boolean; fadeOpacity: number; effectsEnabled: boolean }) {
  if (url === 'code') {
    return visible ? (
      <Html fullscreen zIndexRange={[10, 0]} className="pointer-events-none flex items-center justify-center" style={{ opacity: fadeOpacity }}>
        <div className="w-full h-full relative">
          <BackgroundCode forceEffectsEnabled={effectsEnabled} />
        </div>
      </Html>
    ) : null;
  }

  const { scene } = useGLTF(`/models/${url}`);
  
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

    meshes.forEach((mesh) => {
      // Create solid translucent material
      const solidMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a0505, // Dark red tint
        transparent: true,
        opacity: 0,
        roughness: 0.3,
        metalness: 0.6,
      });

      // Create wireframe material
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xdc2626, // Tailwind red-600
        wireframe: true,
        transparent: true,
        opacity: 0,
      });

      mesh.material = solidMaterial;

      // Add wireframe
      const wireframeMesh = new THREE.Mesh(mesh.geometry, wireframeMaterial);
      // Important: copy transforms and link it to the child
      wireframeMesh.name = "WireframeOverlay";
      mesh.add(wireframeMesh);
    });
    
    return clone;
  }, [scene]);

  // Update opacities on frame change instead of recreating the scene
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name !== "WireframeOverlay") {
        if (child.material instanceof THREE.Material) {
          child.material.opacity = effectsEnabled ? 0.85 * fadeOpacity : 0.5 * fadeOpacity;
        }
      }
      if (child instanceof THREE.Mesh && child.name === "WireframeOverlay") {
        if (child.material instanceof THREE.Material) {
          child.material.opacity = effectsEnabled ? 0.4 * fadeOpacity : 0.15 * fadeOpacity;
        }
      }
    });
  }, [clonedScene, fadeOpacity, effectsEnabled]);

  return visible ? (
    <Center>
      <primitive object={clonedScene} />
    </Center>
  ) : null;
}

// Preload models
models.forEach((url) => {
  if (url !== 'code') {
    useGLTF.preload(`/models/${url}`);
  }
});

function SceneContent({ effectsEnabled }: { effectsEnabled: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeValue, setFadeValue] = useState(1);
  
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      const startTime = Date.now();
      
      const transition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / FADE_DURATION, 1);
        
        setFadeValue(1 - progress);

        if (progress < 1) {
          requestAnimationFrame(transition);
        } else {
          setCurrentIndex((prev) => (prev + 1) % models.length);
          setNextIndex((prev) => (prev + 1) % models.length);
          setFadeValue(1);
        }
      };
      
      requestAnimationFrame(transition);
    }, CYCLE_DURATION);

    return () => clearInterval(cycleInterval);
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
          let opacity = 0;
          let visible = false;
          
          if (i === currentIndex) {
            opacity = fadeValue;
            visible = opacity > 0;
          } else if (i === nextIndex && fadeValue < 1) {
            opacity = 1 - fadeValue;
            visible = opacity > 0;
          }

          return (
            <Model 
              key={url} 
              url={url} 
              visible={visible} 
              fadeOpacity={opacity} 
              effectsEnabled={effectsEnabled}
            />
          );
        })}
      </group>
    </>
  );
}

export default function ModelViewer() {
  const { effectsEnabled } = useEffects();
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <SceneContent effectsEnabled={effectsEnabled} />
    </Canvas>
  );
}
