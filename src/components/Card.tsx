import { View, Text, StyleSheet, Image } from 'react-native'
import { FC, useState } from 'react';
import { items } from '../redux/slices/listSlice';
import { useUnits } from '../redux/hooks';
import { Ionicons } from '@expo/vector-icons';
import { RatingBox } from './RatingBox';
import moment from 'moment';
import { MenuCard } from './MenuCard';
import Modal from 'react-native-modal';
import { EditModal } from './modal/EditModal';
import { DeleteModal } from './modal/DeleteModal';

interface Props {
    index: number,
    item: items,
    refresh: Function
}

const units = useUnits()

export const Card: FC<Props> = ({ index, item, refresh }) => {
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <View key={index} style={style.container}>
            <Modal
                isVisible={editModal}
                useNativeDriver={true}
            >
                <EditModal item={item} close={()=> setEditModal(false)} refresh={refresh}/>
            </Modal>
            <Modal
                isVisible={deleteModal}
                useNativeDriver={true}
            >
                <DeleteModal id={item.id} close={()=> setDeleteModal(false)} refresh={refresh}/>
            </Modal>
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
                <Text style={style.text} numberOfLines={1}>{item.title}</Text>
                <Text style={style.text} numberOfLines={1}>{item.type}</Text>
                <Text style={[style.text, {color: '#939393'}]} numberOfLines={1}>{moment(new Date(item.create_date)).format('DD/MM/YYYY')}</Text>
                <RatingBox rate={item.rating} />
            </View>
            <View style={style.rightBox}>
                <MenuCard edit={editModal} setEdit={(e) => setEditModal(e)} deleting={deleteModal} setDelete={(e) => setDeleteModal(e)} />
                <Text style={{fontWeight: '900'}}>R$ {parseFloat(item.price.toString()).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
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
        borderWidth: 0.5,
        elevation: 1,
        height: units.vh * 18,
        flexDirection: 'row',
        backgroundColor: '#f7f7f7'
    },
    text:{
        height: '25%', 
        textAlignVertical: 'center'
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