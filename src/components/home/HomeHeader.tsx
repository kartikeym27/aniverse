import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/commonStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/utils/Constants';
import { logoutFromApp } from '@/service/api/authService';
import { useWS } from '@/service/sockets/WSProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeHeader = () => {
    const { disconnect } = useWS()
    const insets = useSafeAreaInsets();
    
    return (
        <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => logoutFromApp(disconnect)}>
                <Image source={require('@/assets/images/logo_t.png')} style={styles.logo} />
            </TouchableOpacity>
            <View style={commonStyles.flexRowGap}>
                <Ionicons name="search-outline" size={24} color={Colors.text} />
                <Ionicons name="notifications-outline" size={24} color={Colors.text} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        width: '100%',
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    }
})

export default HomeHeader