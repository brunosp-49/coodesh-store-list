import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components/Card";
import { LoadingRect, SortCard } from "../components/Skeleton";
import { useAppDispatch, useAppSelector, useUnits } from "../redux/hooks";
import { count, getLists, list, setAdding, setLoading, status } from "../redux/slices/listSlice";
import FlashMessage from "react-native-flash-message";

const units = useUnits()

export default function Home() {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const items = useAppSelector(list)
    const listStatus = useAppSelector(status)
    const totalCount = useAppSelector(count)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getLists({ page }))
    }, [])

    useEffect(() => {
        console.log({ items, listStatus })
    }, [items, listStatus])

    const clearStates = async () => {
        setPage(0);
    };


    async function onRefresh() {
        if (listStatus == 'loading' || listStatus == 'reloading') {
            return;
        }
        await clearStates();
        dispatch(setLoading())
        dispatch(getLists({ page: 0 }))
    }

    async function onEndReached() {
        if (
            listStatus == 'loading' ||
            listStatus == 'reloading' ||
            listStatus == 'loadingMore' ||
            Math.ceil(totalCount / 10) === page
        ) {
            console.log({ math: Math.ceil(totalCount / 10), page: page });
            return;
        } else {
            dispatch(setAdding())
            dispatch(getLists({ page: page + 1, lastIndex: items[items.length -1].id }))
            setPage(page + 1);
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.upScreen}>
                <Image source={require('../img/logo.png')} style={style.logo} />
            </View>
            <View style={style.downScreen}>
                <FlatList
                    data={items}
                    onEndReachedThreshold={0.8}
                    onEndReached={onEndReached}
                    refreshing={listStatus == 'reloading'}
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <Card index={index} item={item} key={index} refresh={onRefresh}/>
                    )}
                    ListHeaderComponent={() => (
                        <View style={{ marginVertical: 1 * units.vh }} />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ marginVertical: 1 * units.vh }} />
                    )}
                    ListFooterComponent={() => (
                        <View style={{ height: 30 * units.vh, alignItems: 'center', justifyContent: 'flex-start', paddingTop: '5%' }} >
                            {listStatus == 'loadingMore'
                                ?
                                <Image source={require('../img/loading.gif')} style={{ width: '15%', height: '15%' }} />
                                :
                                null
                            }
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <>
                            {listStatus == 'loading' || listStatus == 'reloading'
                                ?
                                <View style={{ minHeight: units.vh * 80, backgroundColor: 'white' }}>
                                    <SortCard />
                                </View>
                                : items.length == 0 && listStatus == 'completed'
                                    ?
                                    <View>
                                        <Text>empty</Text>
                                    </View>
                                    : null
                            }
                        </>
                    )}
                />
            </View>
            <Text>fdsf</Text>
            <FlashMessage position='center' style={{ height: units.vh * 10, width: units.vw * 70, justifyContent: 'center', alignItems: 'center'}}/> 
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    upScreen: {
        height: units.vh * 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    downScreen: {
        minHeight: units.vh * 88,
    },
    logo: {
        height: '55%',
        width: '75%'
    }
})