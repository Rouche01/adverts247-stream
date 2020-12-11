import React, { useRef, useState } from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const colors = ["#e3342f", "#38c172"]

const AnimatedStroke = ({ d, transition, transition2, transition3 }) => {

    const [ length, setLength ] = useState(0);
    const ref = useRef(null);

    const strokeDashoffset = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [length, 0]
    });

    const strokeDashoffsetBg = interpolate (transition2, {
        inputRange: [0, 1],
        outputRange: [length, 0]
    });

    const strokeDashoffsetBg2 = interpolate (transition3, {
        inputRange: [0, 1],
        outputRange: [length, 0]
    })

    

    return (
        <>
            <AnimatedPath
                d={d} 
                stroke="#38c172" 
                strokeWidth={25} 
                strokeDasharray={length}
                strokeDashoffset={strokeDashoffsetBg2}
            />
            <AnimatedPath
                d={d} 
                stroke="#3490dc" 
                strokeWidth={25} 
                strokeDasharray={length}
                strokeDashoffset={strokeDashoffsetBg}
            />
            <AnimatedPath
                ref={ref}
                onLayout={() => {
                    setLength(ref.current._component.getTotalLength())
                }} 
                d={d} 
                stroke="#e3342f" 
                strokeWidth={25} 
                strokeDasharray={length}
                strokeDashoffset={strokeDashoffset}
            />
        </>
    )
}

export default AnimatedStroke;