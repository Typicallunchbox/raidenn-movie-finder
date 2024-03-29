import React, {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import './style.scss';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import { Ground } from './Ground';

function CarShow(){
    return (
        <>
            <OrbitControls target={[0, 0.85, 0]} maxPolarAngle={1.45} enableZoom={false} enablePan={false}/>
            <PerspectiveCamera makeDefault fov={70} position={[3, 2, 5]} />

            {/* let color = new Color(0, 0, 0) */}
            <color args={[0, 0, 0]} attach="background" />

            {/* let spotlight = new spotlight();
            spotlight.intensity = 1.5;
            spotlight.position.set(...) */}
            <spotLight 
             color={[0.3, 0.25, 0.7]}
             intensity={1.5}
             angle={0.6}
             penumbra={0.5}
             position={[5, 5, 0]}
             castShadow
             shadow-bias={-0.0001}
            />

            <spotLight 
             color={[0.14, 0.5, 1]}
             intensity={2}
             angle={0.6}
             penumbra={0.5}
             position={[-5, 5, 0]}
             castShadow
             shadow-bias={-0.0001}
            />

            <Ground />
        </>
    )
}

function ThreeJsFiberScreen (){
    return(
        <Suspense fallback={null}>
            <Canvas shadows>
                <CarShow />
            </Canvas>
        </Suspense>
    )
}
export default ThreeJsFiberScreen;