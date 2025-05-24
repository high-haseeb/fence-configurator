// written by high-haseeb

"use client";
import { Environment, OrbitControls, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Configurator } from "./Configurator";
import Image from "next/image";
import Fence from "./Fence";
import { createXRStore, XR } from "@react-three/xr";

const store = createXRStore({ emulate: false});
export const Experience = () => {
    return (
        <div className="w-full h-screen md:grid grid-cols-1 md:grid-cols-4">
            <div className="h-1/2 md:h-full md:col-span-3 relative">
                <Canvas className="w-full h-full" camera={{fov: 22, position:[ 32, 32, 32 ]}} shadows>
                    {/* <fog attach="fog" near={60.0} far={100} color={"black"} /> */}
                    <PresentationControls polar={[0, 0]}>
                    {/*     <XR store={store}> */}
                            <Fence />
                        {/* </XR> */}
                    {/* <OrbitControls/> */}
                        <Ground/>
                    </PresentationControls>
                    <Environment preset="city"/>
                    <ambientLight intensity={0.5}/>
                    <directionalLight
                        castShadow
                        position={[50, 50, 0]}
                        intensity={3}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-left={-50}
                        shadow-camera-right={50}
                        shadow-camera-top={50}
                        shadow-camera-bottom={-50}
                    />
                </Canvas>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <button className="bg-primary p-4 rounded-full flex items-center justify-center hover:bg-primary/80 cursor-pointer" title="take screenshot">
                        <Image src="/icons/camera.svg" width={28} height={28} alt="take screenshot"/>
                    </button>
                    <button className="bg-primary p-4 rounded-full flex items-center justify-center hover:bg-primary/80 cursor-pointer" title="take screenshot">
                        <Image src="/icons/360.svg" width={28} height={28} alt="oribt around"/>
                    </button>
                    <button className="bg-primary p-4 rounded-full flex items-center justify-center hover:bg-primary/80 cursor-pointer" title="take screenshot">
                        <Image src="/icons/zoom.svg" width={28} height={28} alt="zoom in/out"/>
                    </button>
                    <button className="bg-primary p-4 rounded-full flex items-center justify-center hover:bg-primary/80 cursor-pointer" title="enter XR" onClick={() => store.enterAR()}>
                        <Image src="/icons/ar.svg" width={28} height={28} alt="enter XR"/>
                    </button>
                </div>
            </div>
            <div className="md:col-span-1 bg-white/80 md:bg-white w-full rounded-t-2xl md:rounded-none sm:h-max absolute md:relative bottom-0 md:h-screen shadow-lg">
                <Configurator />
            </div>
        </div>
    );
}

const Ground = () => {

    // const map = useTexture({
    //     aoMap: "/brown_mud/arm.png",
    //     map: "/brown_mud/diff.png",
    //     displacementMap:  "/brown_mud/disp.png",
    //     roughnessMap:  "/brown_mud/arm.png",
    //     metalnessMap:  "/brown_mud/arm.png",
    // });
    //
    // Object.values(map).forEach((texture) => {
    //     if (texture) {
    //         texture.wrapS = THREE.RepeatWrapping;
    //         texture.wrapT = THREE.RepeatWrapping;
    //         texture.repeat.set(4, 4);
    //     }
    // });

    return (
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[100, 100, 1, 1]}/>
            <meshStandardMaterial color="#efefef" roughness={0.5}/>
            {/* <planeGeometry args={[70, 70, 100, 100]}/> */}
            {/* <meshStandardMaterial {...map} /> */}
        </mesh>
    )
}


// preload ground assets
// useTexture.preload("/brown_mud/arm.png");
// useTexture.preload("/brown_mud/diff.png");
// useTexture.preload("/brown_mud/disp.png");
