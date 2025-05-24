import React from 'react'
import { useGLTF } from '@react-three/drei'

export function FenceGate(props) {
    const { nodes, materials } = useGLTF('/fenceGate.glb')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Gate_lp.geometry} material={materials.Gate_mat} />
        </group>
    )
}

useGLTF.preload('/fenceGate.glb')
