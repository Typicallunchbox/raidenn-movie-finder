import React, {useEffect} from 'react'
import { MeshReflectorMaterial} from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ground(){

    const [roughness, normal, displacement] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/rough.png",
        process.env.PUBLIC_URL + "textures/normal.png",
        process.env.PUBLIC_URL + "textures/bump.png",

    ]);

    useEffect(() => {
      [normal, roughness, displacement].forEach((t)=>{
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(5, 5)
      });

      normal.encoding = LinearEncoding;
      displacement.encoding = LinearEncoding;

    //   Normally want this encoding for roughness but looks better in this scene without
    //   roughness.encoding = LinearEncoding;
    }, [normal, roughness, displacement])
    

    
    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30, 30, 30]} />
            <MeshReflectorMaterial 
              envMapIntensity={1}
              normalMap={normal}
              normalScale={[0.15, 0.15]}
              roughnessMap={roughness}
              bumpMap={displacement}
              bumpScale={1}
              dithering={true}
              color={[0.015, 0.015, 0.015, 1]}
              roughness={0.7}
              blur={[1000, 400]}
              mixBlur={30}
              mixStrength={80}
              mixContrast={1}
              resolution={1024}
              mirror={0}
              depthScale={0.01}
              minDepthThreshold={0.9}
              maxDepthThreshold = {1}
              depthToBlurRatioBias={0.25}
              debug={0}
              reflectorOffset={0.2}
            />
        </mesh>
    )
}