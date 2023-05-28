import { useEffect, useState } from 'react';
import { Text, View, Picker, StyleSheet, TextInput, Button } from 'react-native';
import { UnitSelect } from '../unitSelect/unitSelect';

export const Navigator = ({ navigation, route }) => {
    return (
        <View style={styles.navigator}>
            <Button title="Kredit Calculator"
                onPress={() => navigation.push('Calculator')}> </Button>
            <Button title="App" onPress={() => navigation.push('Company')}> </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    navigator: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: '12px'
    }
});