'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

const BUNGALOW_URL = '/models/bungalow/scene.gltf'
const PERSON_URL = '/models/low_poly_person/scene.gltf'

useGLTF.preload(BUNGALOW_URL)
useGLTF.preload(PERSON_URL)

function BungalowModel() {
  const { scene } = useGLTF(BUNGALOW_URL)
  const groupRef = useRef<THREE.Group>(null)
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    const box = new THREE.Box3().setFromObject(group)
    const center = box.getCenter(new THREE.Vector3())
    group.position.sub(center)
    group.position.y += 4.25
  }, [clonedScene])

  return (
    <group ref={groupRef} scale={[0.1, 0.1, 0.1]} position={[0, 10, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

function PersonModel() {
  const { scene } = useGLTF(PERSON_URL)
  const { clonedScene, position } = useMemo(() => {
    const clone = scene.clone()
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const targetHeight = 0.2
    const personScale = targetHeight / size.y
    clone.scale.multiplyScalar(personScale)
    const boxScaled = new THREE.Box3().setFromObject(clone)
    const centerScaled = boxScaled.getCenter(new THREE.Vector3())
    const sizeScaled = boxScaled.getSize(new THREE.Vector3())
    const baseY = -centerScaled.y + sizeScaled.y / 2
    const liftedY = baseY + 1.275
    // Décaler plus à droite (axe X positif)
    const x = 0.4
    return { clonedScene: clone, position: [x, liftedY, 0] as [number, number, number] }
  }, [scene])

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={[0, Math.PI, 0]}
    />
  )
}

function BungalowSceneContent() {
  return (
    <>
      <color attach="background" args={['#E3E3E3']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <BungalowModel />
        <PersonModel />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableRotate
        enableZoom={false}
        target={[0, 1.5, 0]}
      />
      <Environment preset="sunset" />
    </>
  )
}

export default function BungalowScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [1, 2, 1], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <BungalowSceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}

