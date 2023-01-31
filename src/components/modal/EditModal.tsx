import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { items, status, updateItem } from '../../redux/slices/listSlice';
import { FC, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector, useUnits } from '../../redux/hooks';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

interface Props {
    item: items,
    close: Function,
    refresh: Function,
}

const units = useUnits()

export const EditModal: FC<Props> = ({ item, close, refresh }) => {
    const [typeOptions, setTypeOptions] = useState(['bakery', 'dairy', 'fruit', 'vegetable', 'vegan', 'meat'])
    const [title, setTitle] = useState(item.title)
    const [type, setType] = useState(item.type)
    const [typeSearch, setTypeSearch] = useState('')
    const [price, setPrice] = useState(String(item.price))
    const dispatch = useAppDispatch()
    const listStatus = useAppSelector(status)
    const [snackBar, setSnackBar] = useState(false)

    const onSave = async () => {
        if (listStatus == 'completed') {
            dispatch(updateItem({ item, price: Number(price), title, type })).then(()=>{
                setSnackBar(true)
            }).catch(()=>{
                setSnackBar(true)
            })
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
            <TextInput disabled={listStatus == 'completed' ? false : true} mode='outlined' activeOutlineColor='#063991' style={style.input} label='Title' value={title} onChangeText={(text) => setTitle(text)} />
            <SelectDropdown
                disabled={listStatus == 'completed' ? false : true}
                data={typeOptions}
                onSelect={(selectedItem, index) => setType(selectedItem)}
                onChangeSearchInputText={(search) => setTypeSearch(search)}
                defaultValue={type}
                defaultButtonText={'Select type'}
                buttonStyle={style.dropdown1BtnStyle}
                buttonTextStyle={style.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <Entypo name="chevron-down" size={24} color="black" />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={style.dropdown1DropdownStyle}
                rowStyle={style.dropdown1RowStyle}
                rowTextStyle={style.dropdown1RowTxtStyle}
            />
            <TextInput disabled={listStatus == 'completed' ? false : true} mode='outlined' activeOutlineColor='#063991' style={style.input} label='Price' keyboardType='decimal-pad' textContentType='telephoneNumber' value={price} onChangeText={(text) => setPrice(text)} />
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.cancelButton} onPress={() => onCancel()}>
                    <Text style={{ fontWeight: 'bold', color: '#4F4F4F' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.saveButton} onPress={() => onSave()}>
                    <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Salve</Text>
                </TouchableOpacity>
            </View>
            <Snackbar
                visible={snackBar}
                onDismiss={() => setSnackBar(false)}
                action={{
                    label: 'Close',
                    onPress: () => setSnackBar(false)
                }}>
                Hey there! I'm a Snackbar.
            </Snackbar>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: units.vh * 50,
        backgroundColor: 'white',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        justifyContent: 'space-between',
        borderRadius: 2
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'blue'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonContainer: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    dropdown1BtnStyle: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {
        color: '#444', textAlign: 'left'
    },
    dropdown1DropdownStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 4
    },
    dropdown1RowStyle: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: {
        color: '#444', textAlign: 'left'
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4F4F4F',
        borderWidth: 1,
        width: '40%',
        height: '40%',
        borderRadius: 4
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1267fc',
        width: '40%',
        height: '40%',
        borderRadius: 4,
    }
})