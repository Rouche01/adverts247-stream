import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import { 
        Easing, 
        useCode, 
        startClock, 
        set, 
        block, 
        Value, 
        timing, 
        cond, 
        eq, 
        not 
    } from 'react-native-reanimated';
import { useClock, useValue } from 'react-native-redash/lib/module/v1';
import AnimatedStroke from './AnimationStroke';


const LoaderAnimation = ({}) => {

    const MARGIN = 25
    const vWidth = 159 + MARGIN;
    const vHeight = 159 + MARGIN;
    const width = 60;
    const height = 60;
    const path = "M159 79.5C159 123.407 123.407 159 79.5 159C35.5934 159 0 123.407 0 79.5C0 35.5934 35.5934 0 79.5 0C123.407 0 159 35.5934 159 79.5Z"

    const runTiming = (clock, x1, y1, x2, y2 ) => {
        const state = { 
            finished: new Value(0), 
            position: new Value(0), 
            frameTime: new Value(0), 
            time: new Value(0) 
        };

        const config = { 
            toValue: new Value(1), 
            duration: 1000, 
            easing: Easing.bezier(x1, y1, x2, y2) 
        };

        return block([
            timing(clock, state, config), 
            cond(eq(state.finished, 1), [
                set(state.finished, 0),
                set(state.frameTime, 0),
                set(state.time, 0),
                set(state.position, 0),
            ]),
            state.position
        ]);
    }

    const clock = useClock();
    const progress = useValue(0);
    const progress2 = useValue(0)
    const progress3 = useValue(0);

    useCode(() => [
        startClock(clock),
        set(progress, runTiming(clock, 0.65, 0, 0.35, 1)),
        set(progress2, runTiming(clock, 0.61, 1, 0.88, 1)),
        set(progress3, runTiming(clock, 0.22, 1, 0.36, 1)),
    ],[])
    // const [ progress, setProgress ] = useState(0)


    return (
        <View style={styles.layer}>
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
                <AnimatedStroke 
                    d={path} 
                    transition={progress} 
                    transition2={progress2}
                    transition3={progress3} 
                />
            </Svg>
        </View>
    );
}


const styles = StyleSheet.create({
    layer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default LoaderAnimation;