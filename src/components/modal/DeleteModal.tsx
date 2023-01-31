import { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector, useUnits } from '../../redux/hooks';
import { deleteItem, status } from '../../redux/slices/listSlice';

interface Props {
    id: number,
    close: Function,
    refresh: Function,
}

const units = useUnits()

export const DeleteModal: FC<Props> = ({ close, id, refresh }) => {

    const listStatus = useAppSelector(status)
    const dispatch = useAppDispatch()


    const onDelete = () => {
        if (listStatus == 'completed') {
            dispatch(deleteItem({id}))
            close()
            refresh()
        }
    }

    const onCancel = () => {
        if (listStatus == 'completed') {
            close()
        }
    }

    return (
        <View style={style.container}>
            <Text style={style.question}>Confirm file deletion?</Text>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.cancelButton} onPress={() => onCancel()}>
                    <Text style={{ fontWeight: 'bold', color: '#4F4F4F' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.saveButton} onPress={() => onDelete()}>
                    <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: units.vh * 20,
        backgroundColor: 'white',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2
    },
    question: {
        fontSize: 20
    },
    buttonContainer: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4F4F4F',
        borderWidth: 1,
        width: '40%',
        height: '75%',
        borderRadius: 4
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ed2d2d',
        width: '40%',
        height: '75%',
        borderRadius: 4,
    }
})