import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFenceStore } from "@/store/fenceStore"
import { FenceGate } from "./FenceGate"
import { RailingGate } from "./RailingGate"

const Fence = () => {
    const {
        fenceLength,
        fenceWidth,
        numberOfSides,
        fenceHeight,
        enableGates,
        gateLength,
        fenceColor,
        gateType,
        fenceType,
        // barWidth // <- NEW: adjustable spacing
    } = useFenceStore()
    const barWidth = 2.4;

    const meshRef = useRef<THREE.InstancedMesh>(null)
    const totalPosts = 2 * (fenceWidth + fenceLength) - 4
    const activeSides = numberOfSides ?? 4
    const groupRef = useRef<THREE.Group>(null)

    const gateStart = Math.floor((fenceWidth - gateLength) / 2) * barWidth

    useEffect(() => {
        const mesh = meshRef.current
        if (!mesh) return

        const dummy = new THREE.Object3D()
        let index = 0

        // Bottom side (+X)
        if (activeSides >= 1) {
            for (let i = 0; i < fenceWidth -1; i++) {
                const x = i * barWidth;
                if (x >= gateStart && x < gateStart + gateLength * barWidth && enableGates) continue
                dummy.position.set(x, 0, 0);
                dummy.scale.set(1, fenceHeight, 1);
                dummy.rotation.y = Math.PI / 2
                dummy.updateMatrix()
                mesh.setMatrixAt(index++, dummy.matrix)
            }
        }

        // Right side (+Z)
        if (activeSides >= 2) {
            for (let i = 0; i < fenceLength - 1; i++) {
                const z = i * barWidth;
                dummy.position.set((fenceWidth - 1) * barWidth, 0, z)
                dummy.rotation.y = 0
                dummy.updateMatrix()
                mesh.setMatrixAt(index++, dummy.matrix)
            }
        }

        // Top side (-X)
        if (activeSides >= 3) {
            for (let i = fenceWidth - 1; i > 0; i--) {
                const x = i * barWidth
                dummy.position.set(x, 0, (fenceLength - 1) * barWidth)
                dummy.rotation.y = -Math.PI / 2
                dummy.updateMatrix()
                mesh.setMatrixAt(index++, dummy.matrix)
            }
        }

        // Left side (-Z)
        if (activeSides === 4) {
            for (let i = 1; i < fenceLength; i++) {
                const z = i * barWidth;
                dummy.position.set(0, 0, z)
                dummy.rotation.y = Math.PI
                dummy.updateMatrix()
                mesh.setMatrixAt(index++, dummy.matrix)
            }
        }

        mesh.count = index
        mesh.instanceMatrix.needsUpdate = true
    }, [fenceLength, fenceWidth, numberOfSides, fenceHeight, enableGates, gateLength, fenceColor, fenceType, gateType, barWidth])

    const barHeight = 0.2
    const barY = -fenceHeight - 0.9
    // const { nodes } = useGLTF('/fenceBar.glb')
    let modelPath = "/railingFence.glb";
    if (fenceType == "combs") {
        modelPath = "/fenceBar.glb";
    }
    const { nodes, materials } = useGLTF(modelPath);

    return (
        <group
            position={[
                -(fenceWidth * barWidth) / 2,
                -1,
                -(fenceLength * barWidth) / 2
            ]}
            ref={groupRef}
        >
            <instancedMesh
                ref={meshRef}
                key={totalPosts}
                args={[
                    fenceType != "combs" ? nodes.Fence_01_Canal_LOD0_Fence_01_Main_0002.geometry : nodes.Fence_lp001.geometry,
                    new THREE.MeshStandardMaterial({ color: fenceColor }),
                    totalPosts
                ]}
                castShadow
            />

            {/* Side Bars */}
            {activeSides >= 1 && (
                <mesh position={[(fenceWidth * barWidth) / 2 - barWidth / 2, barY, 0]} castShadow>
                    <boxGeometry args={[fenceWidth * barWidth - barWidth, barHeight, 0.1]} />
                    <meshStandardMaterial color={fenceColor} />
                </mesh>
            )}
            {activeSides >= 2 && (
                <mesh position={[(fenceWidth - 1) * barWidth, barY, (fenceLength * barWidth) / 2 - barWidth / 2]} castShadow>
                    <boxGeometry args={[0.1, barHeight, fenceLength * barWidth - barWidth]} />
                    <meshStandardMaterial color={fenceColor} />
                </mesh>
            )}
            {activeSides >= 3 && (
                <mesh position={[(fenceWidth * barWidth) / 2 - barWidth / 2, barY, (fenceLength - 1) * barWidth]} castShadow>
                    <boxGeometry args={[fenceWidth * barWidth - barWidth, barHeight, 0.1]} />
                    <meshStandardMaterial color={fenceColor} />
                </mesh>
            )}
            {activeSides === 4 && (
                <mesh position={[0, barY, (fenceLength * barWidth) / 2 - barWidth / 2]} castShadow>
                    <boxGeometry args={[0.1, barHeight, fenceLength * barWidth - barWidth]} />
                    <meshStandardMaterial color={fenceColor} />
                </mesh>
            )}

            {/* Gate */}
            {activeSides >= 1 && enableGates && (
            <>
                {
                fenceType == "combs" ?
                <FenceGate
                    position={[gateStart + (gateLength * barWidth) / 2 - barWidth / 2, 0, 0]}
                    scale={[1, fenceHeight, 1]}
                    castShadow
                /> :
                <RailingGate
                    position={[gateStart + (gateLength * barWidth) / 2 - barWidth / 2, 0, 0]}
                    scale={[1, fenceHeight, 1]}
                    castShadow
                />
                }
</>
            )}
        </group>
    )
}

export default Fence;
