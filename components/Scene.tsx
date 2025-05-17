"use client";
import { useRef, useEffect, useState } from "react";
import { Environment, PresentationControls, useTexture } from "@react-three/drei";
import { Canvas  } from "@react-three/fiber";
import * as THREE from "three";

export const Experience = () => {

    const [sides, setSides] = useState(4);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);

    return (
        <div className="w-full h-screen md:grid grid-cols-1 md:grid-cols-4">
            <Canvas className="h-1/2 md:h-full md:col-span-3" camera={{fov: 22, position:[ 32, 32, 32 ]}} shadows>
                {/* <fog attach="fog" near={60.0} far={100} color={"black"} /> */}
                <PresentationControls polar={[0, 0]}>
                    <Fence width={width} height={height} sides={sides}/>
                    <Ground/>
                </PresentationControls>
                <Environment preset="city"/>
                <ambientLight intensity={0.5}/>
                <directionalLight
                    castShadow
                    position={[50, 50, 0]}
                    intensity={1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-left={-50}
                    shadow-camera-right={50}
                    shadow-camera-top={50}
                    shadow-camera-bottom={-50}
                />
            </Canvas>
            <div className="md:col-span-1 bg-white/80 md:bg-white w-full rounded-t-2xl md:rounded-none sm:h-max absolute md:relative bottom-0 md:h-screen shadow-lg">
                <Configurator setSides={setSides} activeSides={sides} setWidth={setWidth} setHeight={setHeight} width={width} height={height}/>
            </div>
        </div>
    );
}

interface ConfiguratorProps {
    setSides: (sides: number) => void;
    activeSides: number;
    width: number;
    setWidth: (w: number) => void;
    height: number;
    setHeight: (h: number) => void;
}

interface ConfiguratorProps {
    setSides: (sides: number) => void;
    activeSides: number;
    width: number;
    setWidth: (w: number) => void;
    height: number;
    setHeight: (h: number) => void;
}

const Configurator: React.FC<ConfiguratorProps> = ({
    setSides,
    activeSides,
    width,
    setWidth,
    height,
    setHeight,
}) => {
    return (
        <div className="flex flex-col gap-8 p-8 text-gray-900 w-full">
            <section>
                <h2 className="text-lg font-semibold mb-3">Select the number of sides</h2>
                <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => {
                        const sidesNum = i + 1;
                        const isActive = activeSides === sidesNum;
                        return (
                            <button
                                key={`set-sides-${i}-button`}
                                onClick={() => setSides(sidesNum)}
                                className={` px-4 py-2 rounded-md text-sm font-medium
transition-colors ${ isActive ? "bg-orange-500 text-white shadow-md"
: "bg-gray-100 text-gray-700 hover:bg-orange-100" } `}
                                aria-pressed={isActive}
                            >
                                {sidesNum}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section>
                <label
                    htmlFor="width-slider"
                    className="block mb-1 font-medium text-gray-700"
                >
                    Width: <span className="font-semibold">{width}</span>
                </label>
                <input
                    id="width-slider"
                    type="range"
                    min={1}
                    max={50}
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                    accent-orange-500 hover:accent-orange-600"
                />
            </section>

            <section>
                <label
                    htmlFor="height-slider"
                    className="block mb-1 font-medium text-gray-700"
                >
                    Height: <span className="font-semibold">{height}</span>
                </label>
                <input
                    id="height-slider"
                    type="range"
                    min={1}
                    max={50}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                    accent-orange-500 hover:accent-orange-600"
                />
            </section>
            <section>
                <div className="text-center italic">More options coming soon...</div>
            </section>
        </div>
    );
};
const Ground = () => {

    const map = useTexture({
        aoMap: "/brown_mud/arm.png",
        map: "/brown_mud/diff.png",
        displacementMap:  "/brown_mud/disp.png",
        roughnessMap:  "/brown_mud/arm.png",
        metalnessMap:  "/brown_mud/arm.png",
    });

    Object.values(map).forEach((texture) => {
        if (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
        }
    });

    return (
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[70, 70, 100, 100]}/>
            <meshStandardMaterial {...map} />
        </mesh>
    )
}


interface FenceProps {
    width: number;
    height: number;
    sides?: number;
}

const Fence: React.FC<FenceProps> = ({ width, height, sides }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const totalPosts = 2 * (width + height) - 4;
    const activeSides = sides ?? 4;

    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const dummy = new THREE.Object3D();
        let index = 0;

        // Bottom side (+X)
        if (activeSides >= 1) {
            for (let x = 0; x < width; x++) {
                dummy.position.set(x, 0, 0);
                dummy.scale.set(0.15, 4, 0.2);
                dummy.updateMatrix();
                mesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        // Right side (+Z)
        if (activeSides >= 2) {
            for (let z = 1; z < height - 1; z++) {  // starts at 1 and ends before height-1
                dummy.position.set(width - 1, 0, z);
                dummy.updateMatrix();
                mesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        // Top side (-X)
        if (activeSides >= 3) {
            for (let x = width - 1; x >= 0; x--) {
                dummy.position.set(x, 0, height - 1);
                dummy.updateMatrix();
                mesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        // Left side (-Z)
        if (activeSides === 4) {
            for (let z = height - 2; z > 0; z--) { // ends at 1
                dummy.position.set(0, 0, z);
                dummy.updateMatrix();
                mesh.setMatrixAt(index++, dummy.matrix);
            }
        }

        mesh.count = index;
        mesh.instanceMatrix.needsUpdate = true;
    }, [width, height, activeSides]);

    const barHeight = 0.2;
    const barY = -1.9;

    return (
        <group position={[-width / 2, 1.3, -height / 2]}>

            <instancedMesh ref={meshRef} key={totalPosts} args={[undefined, undefined, totalPosts]} castShadow>
                <boxGeometry />
                <meshStandardMaterial  color="#888888" metalness={0.5} roughness={0.3} />
            </instancedMesh>

            {activeSides >= 1 && (
                <mesh position={[width / 2 - 0.5, barY, 0]} castShadow>
                    <boxGeometry args={[width - 1, barHeight, 0.1]} />
                    <meshStandardMaterial color="dimgray" />
                </mesh>
            )}

            {activeSides >= 2 && (
                <mesh position={[width - 1, barY, height / 2 - 0.5]} castShadow>
                    <boxGeometry args={[0.1, barHeight, height - 1]} />
                    <meshStandardMaterial color="dimgray" />
                </mesh>
            )}

            {activeSides >= 3 && (
                <mesh position={[width / 2 - 0.5, barY, height - 1]} castShadow>
                    <boxGeometry args={[width - 1, barHeight, 0.1]} />
                    <meshStandardMaterial color="dimgray" />
                </mesh>
            )}

            {activeSides === 4 && (
                <mesh position={[0, barY, height / 2 - 0.5]} castShadow>
                    <boxGeometry args={[0.1, barHeight, height - 1]} />
                    <meshStandardMaterial color="dimgray" />
                </mesh>
            )}
        </group>
    );
};

useTexture.preload("/brown_mud/arm.png");
useTexture.preload("/brown_mud/diff.png");
useTexture.preload("/brown_mud/disp.png");
