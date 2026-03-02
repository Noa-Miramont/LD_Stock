'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

// Fonction pour obtenir le chemin du modèle de conteneur selon la taille
function getContainerModelPath(size: string): { path: string, scale?: [number, number, number] } {
  const sizeNumber = parseInt(size.replace(' pieds', ''))
  
  switch (sizeNumber) {
    case 6:
      return { path: '/models/container/container_6foot/scene.gltf' }
    case 8:
      return { path: '/models/container/container_8foot/scene.gltf' }
    case 10:
      return { path: '/models/container/container_10foot/scene.gltf' }
    case 15:
      // Utiliser le modèle 20 pieds avec scale réduit sur l'axe X (longueur)
      // 15/20 = 0.75
      return { path: '/models/container/container_20foot/scene.glb', scale: [0.75, 1, 1] }
    case 20:
      return { path: '/models/container/container_20foot/scene.glb' }
    case 40:
      return { path: '/models/container/container_40foot/scene.glb' }
    default:
      return { path: '/models/container/container_20foot/scene.glb' }
  }
}

// Fonction pour calculer l'offset du personnage selon la taille du conteneur
function getPersonOffset(size: string): number {
  const sizeNumber = parseInt(size.replace(' pieds', ''))
  
  if (sizeNumber >= 40) {
    return 3
  } else if (sizeNumber >= 20) {
    return 3
  } else if (sizeNumber >= 15) {
    return 2.5
  } else if (sizeNumber >= 10) {
    return 2.2
  } else {
    return 2
  }
}

// Fonction pour obtenir les dimensions réelles du conteneur en mètres
function getContainerRealDimensions(size: string): { length: number, width: number, height: number } {
  const sizeNumber = parseInt(size.replace(' pieds', ''))
  
  // Dimensions réelles en mètres selon les données du fichier containers.ts
  switch (sizeNumber) {
    case 6:
      return { length: 1.8, width: 1.75, height: 1.9 }
    case 8:
      return { length: 2.43, width: 2.2, height: 2.26 }
    case 10:
      return { length: 2.99, width: 2.43, height: 2.59 }
    case 15:
      return { length: 4.5, width: 2.43, height: 2.59 }
    case 20:
      return { length: 6.05, width: 2.43, height: 2.59 }
    case 40:
      return { length: 12.19, width: 2.43, height: 2.59 }
    default:
      return { length: 6.05, width: 2.43, height: 2.59 }
  }
}

// Composant pour charger et afficher le conteneur
function ContainerModel({ size }: { size: string }) {
  const { path, scale: customScale } = getContainerModelPath(size)
  const { scene } = useGLTF(path)
  
  // Cloner la scène pour éviter les problèmes de réutilisation
  const clonedScene = scene.clone()
  
  // Obtenir les dimensions réelles du conteneur en mètres
  const realDimensions = getContainerRealDimensions(size)
  
  // Calculer la bounding box du modèle original
  const boxOriginal = new THREE.Box3().setFromObject(clonedScene)
  const sizeOriginal = boxOriginal.getSize(new THREE.Vector3())
  
  // Appliquer le scale personnalisé si nécessaire (pour le 15 pieds)
  let adjustedDimensions = { ...realDimensions }
  if (customScale) {
    adjustedDimensions.length *= customScale[0]
  }
  
  // Détecter automatiquement l'orientation du modèle
  // La longueur est la plus grande dimension, la hauteur est généralement Y
  // On compare les dimensions pour déterminer quel axe correspond à quoi
  const isXLongest = sizeOriginal.x >= sizeOriginal.z
  const isZLongest = sizeOriginal.z >= sizeOriginal.x
  
  // Calculer les scales pour chaque axe
  // Si X est la longueur : X=length, Y=height, Z=width
  // Si Z est la longueur : Z=length, Y=height, X=width
  let scaleX: number, scaleY: number, scaleZ: number
  
  if (isXLongest) {
    // X = longueur, Y = hauteur, Z = largeur
    scaleX = adjustedDimensions.length / sizeOriginal.x
    scaleY = realDimensions.height / sizeOriginal.y
    scaleZ = realDimensions.width / sizeOriginal.z
  } else {
    // Z = longueur, Y = hauteur, X = largeur
    scaleX = realDimensions.width / sizeOriginal.x
    scaleY = realDimensions.height / sizeOriginal.y
    scaleZ = adjustedDimensions.length / sizeOriginal.z
  }
  
  // Appliquer le scale au conteneur
  clonedScene.scale.set(scaleX, scaleY, scaleZ)
  
  // Recalculer la bounding box après le scale
  const box = new THREE.Box3().setFromObject(clonedScene)
  const center = box.getCenter(new THREE.Vector3())
  const sizeVec = box.getSize(new THREE.Vector3())
  
  // Calculer la largeur du conteneur pour positionner le personnage
  const containerWidth = sizeVec.x
  const sizeNumber = parseInt(size.replace(' pieds', ''))

  // Pour 15, 20 et 40 pieds le personnage doit être plus proche (offset fixe)
  // Pour les autres tailles, on garde la position basée sur la largeur
  const personOffset = (sizeNumber === 15 || sizeNumber === 20 || sizeNumber === 40)
    ? getPersonOffset(size)
    : containerWidth / 1
  
  // Positionner le conteneur centré sur le sol
  const containerY = -center.y + sizeVec.y / 2
  
  // Rotation de 70 degrés sur l'axe Y pour afficher le conteneur de profil
  const rotationY = (70 * Math.PI) / 180
  
  return (
    <group>
      <primitive 
        object={clonedScene} 
        position={[0, containerY, 0]}
        rotation={[0, rotationY, 0]}
      />
      {/* Personnage positionné à côté du conteneur */}
      <Suspense fallback={null}>
        <PersonModel offset={personOffset} />
      </Suspense>
    </group>
  )
}

// Composant pour charger et afficher le personnage
function PersonModel({ offset }: { offset: number }) {
  const { scene } = useGLTF('/models/low_poly_person/scene.gltf')
  
  // Cloner la scène pour éviter les problèmes de réutilisation
  const clonedScene = scene.clone()
  
  // Calculer la bounding box pour obtenir la hauteur actuelle
  const box = new THREE.Box3().setFromObject(clonedScene)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  
  // Hauteur cible : 1.7 unités (1m70)
  const targetHeight = 1.7
  const currentHeight = size.y
  
  // Calculer le scale pour que le personnage fasse exactement 1.7 unités de hauteur
  const personScale = targetHeight / currentHeight
  
  // Appliquer le scale uniformément
  clonedScene.scale.multiplyScalar(personScale)
  
  // Recalculer la bounding box après le scale
  const boxScaled = new THREE.Box3().setFromObject(clonedScene)
  const centerScaled = boxScaled.getCenter(new THREE.Vector3())
  const sizeScaled = boxScaled.getSize(new THREE.Vector3())
  
  // Positionner le personnage à côté du conteneur, centré sur le sol
  return (
    <primitive 
      object={clonedScene} 
      position={[offset, -centerScaled.y + sizeScaled.y / 2, 0]}
    />
  )
}


// Composant principal de la scène
function SceneContent({ containerSize }: { containerSize: string }) {
  return (
    <>
      <color attach="background" args={['#E3E3E3']} />
      {/* Éclairage */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      
      {/* Conteneur avec personnage */}
      <Suspense fallback={null}>
        <ContainerModel size={containerSize} />
      </Suspense>
      
      {/* Contrôles de la caméra */}
      <OrbitControls 
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        target={[0, 1.5, 0]}
      />
      
      {/* Environnement */}
      <Environment preset="sunset" />
    </>
  )
}

// Composant principal exporté
export default function ContainerScene({ containerSize }: { containerSize: string }) {
  const is40Foot = containerSize.includes('40')
  const cameraPosition: [number, number, number] = is40Foot ? [7.5, 10, 7.5] : [6, 8, 6]
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <SceneContent containerSize={containerSize} />
        </Suspense>
      </Canvas>
    </div>
  )
}
