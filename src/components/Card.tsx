import { View, Text, StyleSheet, Image } from 'react-native'
import { FC } from 'react';
import { items } from '../redux/slices/listSlice';
import { useUnits } from '../redux/hooks';
import { Ionicons } from '@expo/vector-icons';
import { RatingBox } from './RatingBox';
import moment from 'moment';
import { MenuCard } from './MenuCard';

interface Props {
    index: number,
    item: items
}

const units = useUnits()

export const Card: FC<Props> = ({ index, item }) => {
    return (
        <View key={index} style={style.container}>
            <View style={style.leftBox}>
                {item.url_image
                    ?
                    <Image source={{ uri: item.url_image }} style={style.image} />
                    :
                    <View style={[{ backgroundColor: '#dfe6ed', justifyContent: 'center', alignItems: 'center' }, style.image]}>
                        <Ionicons name="ios-image" size={55} color="#9eadba" />
                    </View>
                }
            </View>
            <View style={style.centerBox}>
                <Text style={{ height: '25%', textAlignVertical: 'center' }} numberOfLines={1}>{item.title}</Text>
                <Text style={{ height: '25%', textAlignVertical: 'center' }} numberOfLines={1}>{item.type}</Text>
                <Text style={{ height: '25%', textAlignVertical: 'center' }} numberOfLines={1}>{moment(new Date(item.create_date)).format('DD/MM/YYYY')}</Text>
                <RatingBox rate={item.rating} />
            </View>
            <View style={style.rightBox}>
                <MenuCard />
                <Text>R$ {parseFloat(item.price.toString()).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 4,
        borderColor: '#c3cfd9',
        borderWidth: 1,
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
        paddingVertical: '5%',
        justifyContent: 'space-between'
    },
    rightBox: {
        flex: 0.6,
        justifyContent: 'space-between',
        paddingBottom: '5%'
    },
    image: {
        width: '80%',
        height: '80%'
    }
})