import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';
import Animated, { interpolate } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const TriviaInfoLoader = () => {

    const MARGIN = 12
    const vWidth = 204 + MARGIN;
    const vHeight = 204 + MARGIN;
    const width = hp('15%');
    const height = hp('15%');

    const pathFull = "M159 79.5C159 123.407 123.407 159 79.5 159C35.5934 159 0 123.407 0 79.5C0 35.5934 35.5934 0 79.5 0C123.407 0 159 35.5934 159 79.5Z"

    const pathQuarter = "M83.2247 25.1106L102 102L23.2675 116.716C29.9692 153.84 62.446 182 101.5 182C145.407 182 181 146.407 181 102.5C181 58.5934 145.407 23 101.5 23C95.211 23 89.0925 23.7303 83.2247 25.1106Z"


    const [ length, setLength ] = useState(0);
    // const transition = useTimingTransition(length, { duration: 3000 })

    // useEffect(() => {

    //     setLength(1);

    // }, [])

    // const animateCircle = interpolate(transition, {
    //     inputRange: [0, 1],
    //     outputRange: [79.5, -79.5]
    // });

    const AnimatedPath = Animated.createAnimatedComponent(Path);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const ref = useRef(null);




    return (
        <View style={styles.container}>
            <Svg
                width={width}
                height={height}
                viewBox={[
                    -MARGIN / 2, 
                    -MARGIN / 2, 
                    vWidth + MARGIN / 2, 
                    vHeight + MARGIN / 2
                ].join(" ")}
            >   
                <Circle cx="102" cy="102" r="96" stroke="#F1040E" strokeWidth="12" />
                <AnimatedPath 
                    d={pathQuarter}
                    fill="#F1040E"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    ref={ref}
                    onLayout={() => {
                        // console.log(ref.current._component.getTotalLength());
                        setLength(ref.current._component.getTotalLength());
                    }}
                    strokeDasharray={length}
                    strokeDashoffset={length * 0.9}
                />
                <Path clipRule=""  />
            </Svg>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});


export default TriviaInfoLoader;