import { Plane, Text, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Light = () => {
    const lightRef = useRef<THREE.DirectionalLight>(null);

    useHelper(
        lightRef as React.RefObject<THREE.DirectionalLight>,
        THREE.DirectionalLightHelper,
        1, // 헬퍼크기
        0xff00ff // 헬퍼색상
    )

    return (
        <directionalLight
            ref = {lightRef}
            position={[0,1,0]}
            intensity={5}
            castShadow
        />
    )
}

const Three02 = () => {
  return (
    <>
        <div className='h-screen'>
            <Canvas>
                {/* <ambientLight intensity={10} /> */}

                {/* 점 조명 (전구) */}
                {/* <pointLight
                    color={'#0000ff'}
                    position={[0,1,0]}
                    intensity={100} // 강도
                    distance={10} // 거리
                    decay={1} // 감쇠
                    castShadow
                    receiveShadow
                /> */}

                {/* 원뿔조명 */}
                {/* <spotLight 
                    position={[0,1,0]}
                    angle={(Math.PI/180 *90)}
                    intensity={10}
                    penumbra={0.5}
                /> */}

                {/* 태양광 */}
                {/* <directionalLight
                    position={[0,1,0]}
                    intensity={5}
                /> */}

                <Light />

                {/* 텍스트 생성 */}
                <Text>HELLO</Text>

                {/* 평면 객체(바닥이나 벽) */}
                <Plane
                    args={[5,5]}
                    rotation={[-Math.PI/180 * 90 ,0 ,0]}
                    position={[0,-0.5,0]}
                >
                    <meshStandardMaterial color='green' />
                </Plane>
            </Canvas>
        </div>
    </>
  )
}

export default Three02