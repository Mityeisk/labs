import { useEffect, useState } from 'react';
import { Picker, StyleSheet, View, TextInput } from 'react-native';

export const UnitSelect = ({ options, isEditable, value, onChange }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={value} onChangeText={(_value) => { onChange(Number(_value))}} editable={isEditable} />
            <Picker style={styles.select} label="Средний расход топлива на 100км">
                {options.map((option, index) => {
                    return <Picker.Item label={option} value={index} key={index} />
                })}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    select: {
        width: "10%",
        minWidth: "100px",
        backgroundColor: "gray",
        textAlign: "center"
    },
    input: {
        border: "1px solid gray",
        width: "90%"
    },
    container: {
        display: "flex",
        flexDirection: "row"
    }
});