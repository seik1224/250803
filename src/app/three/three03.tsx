import { Box, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// 기본위치 0,0,5 바라보는 위치 0,0,0
const Camera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(()=>{
        if(cameraRef.current){
            cameraRef.current.rotation.y += 0.01
        }
    })

    return (
        <PerspectiveCamera
            ref= {cameraRef}
            makeDefault // 기본카메라로 설정
            position={[0,2,5]}
            rotation={[(-Math.PI/180) *10, 0, 0]}
            fov={75} // 시야각
            near={0.1} // 가까운 클리핑 거리
            far={1000} // 먼 클리핑 거리
        />
    )

}

// 항상 특정 지점을 바라보는 카메라
const TwoNodeCamera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    const targetPosition = new THREE.Vector3(0,2,0)

    useFrame(()=>{
        if(cameraRef.current){
            cameraRef.current.lookAt(targetPosition)
            cameraRef.current.position.x += 0.01
            cameraRef.current.position.y += 0.01
        }
    })

    return (
        <PerspectiveCamera
            ref= {cameraRef}
            makeDefault // 기본카메라로 설정
            position={[0,2,5]}
            rotation={[(-Math.PI/180) *10, 0, 0]}
            fov={75}
            near={0.1} 
            far={1000}
        />
    )
}


const PivotCamera = () => {
    const pivotRef = useRef<THREE.Group>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);


    useFrame(()=>{
        if(pivotRef.current){
            pivotRef.current.rotation.y += 0.01;
        }
    })

    return (
        <group ref={pivotRef} position={[0,2,0]}>
            <PerspectiveCamera
                ref= {cameraRef}
                makeDefault
                position={[0,0,5]}
                fov={75}
                near={0.1} 
                far={1000}
            />
        </group>
    )
}

const ThreeCamera = () => {
    /*
        [ useThree ]
        PerspectiveCamera를 만들지 않고 현재 활성화된 카메라를 참조
        카메라에 접근하는 두번째 방법
    */
    const { camera, set } = useThree();

    useEffect(()=>{
        // 카메라 초기 설정
        camera.position.set(0, 2, 5);
        camera.rotation.x = (-Math.PI / 180) * 10;
        camera.updateProjectionMatrix();

        // 기본 카메라로 설정
        set({camera})
    }, [camera, set]);

    useFrame(()=>{
        camera.rotation.y += 0.01
    })

    return null;
}



const Three03 = () => {
  return (
    <>
        <div className='h-screen'>
            <Canvas>

                <ambientLight intensity={10} />

                {/* <Camera /> */}
                {/* <TwoNodeCamera /> */}
                {/* <PivotCamera /> */}
                <ThreeCamera />
                
                <Box position={[0,0,0]} args={[1,1,1]}>
                    <meshStandardMaterial color={'orange'} />
                </Box>

            </Canvas>
        </div>
    </>
  )
}

export default Three03