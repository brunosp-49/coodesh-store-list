import { FC, useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useUnits } from "../redux/hooks";

const units = useUnits()

export const LoadingRect = (props: {
    width: string | number;
    height: string | number;
    style?: StyleProp<ViewStyle>;
}) => {
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const sharedAnimationConfig = {
            duration: 1000,
            useNativeDriver: true,
        };
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    ...sharedAnimationConfig,
                    toValue: 1,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(pulseAnim, {
                    ...sharedAnimationConfig,
                    toValue: 0,
                    easing: Easing.in(Easing.ease),
                }),
            ])
        ).start();

        return () => {
            // cleanup
            pulseAnim.stopAnimation();
        };
    }, []);

    const opacityAnim = pulseAnim.interpolate({
        inputRange: [0.2, 1],
        outputRange: [0.05, 0.15],
    });

    return (
        <Animated.View
            style={[
                { width: props.width, height: props.height },
                { opacity: opacityAnim, backgroundColor: 'black' },
                props.style,
            ]}
        />
    );
};


export const SortCard = () => {
    return (
        <View style={style.card}>
            {Array.from({ length: 10 }, (v, k) => k).map((element: any, index: number) => (
                <View key={index} style={{ width: units.vw * 95, height: units.vh * 18, marginVertical: units.vh * 1, backgroundColor: '#ebeced', elevation: 2 }}>
                    <View style={style.container}>
                        <View style={style.leftBox}>
                            <LoadingRect width={'80%'} height={'80%'} />
                        </View>
                        <View style={style.centerBox}>
                            <LoadingRect width={'80%'} height={'15%'} />
                            <LoadingRect width={'80%'} height={'15%'} />
                            <LoadingRect width={'80%'} height={'15%'} />
                            <LoadingRect width={'80%'} height={'25%'} />
                        </View>
                        <View style={style.rightBox}>
                            <LoadingRect width={'40%'} height={'15%'} style={{alignSelf: 'flex-end', marginRight: '15%'}}/>
                            <LoadingRect width={'100%'} height={'20%'} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};


const style = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 4,
        height: units.vh * 18,
        flexDirection: 'row'
    },
    leftBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '5%',
        justifyContent: 'space-between'
    },
    rightBox: {
        flex: 0.6,
        justifyContent: 'space-between',
        paddingVertical: '5%'
    },
    image: {
        width: '80%',
        height: '80%'
    }
})