import React, { FC } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    rate: number
}

export const RatingBox: FC<Props> = ({ rate }) => {

    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                <MaterialIcons
                    name={rate >= 1 ? 'star' : 'star-border'}
                    size={20}
                    style={rate >= 1 ? styles.starSelected : styles.starUnselected}
                />
                <MaterialIcons
                    name={rate >= 2 ? 'star' : 'star-border'}
                    size={20}
                    style={rate >= 2 ? styles.starSelected : styles.starUnselected}
                />
                <MaterialIcons
                    name={rate >= 3 ? 'star' : 'star-border'}
                    size={20}
                    style={rate >= 3 ? styles.starSelected : styles.starUnselected}
                />
                <MaterialIcons
                    name={rate >= 4 ? 'star' : 'star-border'}
                    size={20}
                    style={rate >= 4 ? styles.starSelected : styles.starUnselected}
                />
                <MaterialIcons
                    name={rate >= 5 ? 'star' : 'star-border'}
                    size={20}
                    style={rate >= 5 ? styles.starSelected : styles.starUnselected}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '30%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
});