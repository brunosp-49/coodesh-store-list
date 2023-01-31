import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props{
    edit: boolean,
    deleting: boolean,
    setEdit: (e: boolean) => void,
    setDelete: (e: boolean) => void,
}

export const MenuCard: FC<Props> = ({edit, setEdit, setDelete, deleting}) => {
    const editPost = () => {
        setEdit(true)
    }

    const deletePost = () => {
        setDelete(true)
    }

    return (
        <OptionMenu
            customButton={<Ionicons name="ios-ellipsis-horizontal" size={30} color="black" />}
            destructiveIndex={1}
            propsOptions={["Edit", "Delete", "Cancel"]}
            actions={[editPost, deletePost]} />
    );
};

interface OptionMenu {
    customButton: any,
    destructiveIndex: number,
    propsOptions: any[],
    actions: any[]
}


const OptionMenu: FC<OptionMenu> = ({ actions, customButton, destructiveIndex, propsOptions }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (index: number) => {
        let options = propsOptions;
        for (var i = 0; i < options.length; i++) {
            if (index === i) {
                if (index === options.length - 1) {
                    const open = false;
                    setOpen(open);
                } else {
                    if (actions[i] !== null) {
                        actions[i]();
                    }
                }
            }
        }
        setOpen(false)
    }

    return (
        <TouchableOpacity style={style.container} onPress={() => {
            setOpen(!open)
        }}>
            <Ionicons name="ios-ellipsis-horizontal" size={24} color="black" />
            {!open
                ?
                null
                :
                <View
                    style={style.option}
                >
                    {propsOptions.map((option: string, index: number) => {
                        return (
                            <View key={option}>
                                <TouchableOpacity
                                    style={{ padding: 10 }}
                                    onPress={() => handleClick(index)}
                                >
                                    <Text style={{ textAlign: "center" }}>{option}</Text>
                                </TouchableOpacity>

                                {index < propsOptions.length - 1 && (
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: "lightgray"
                                        }}
                                    />
                                )}
                            </View>
                        );
                    })}
                </View>
            }
        </TouchableOpacity >
    )
}

const style = StyleSheet.create({
    container: {
        height: '35%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 2
    },
    option: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        flex: 1,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderRadius: 5,
        backgroundColor: 'white',
        width: 150,
    },
})