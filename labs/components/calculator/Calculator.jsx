import { useEffect, useState } from 'react';
import { Text, View, Picker, StyleSheet, TextInput } from 'react-native';
import { UnitSelect } from '../unitSelect/unitSelect';

export const Calculator = () => {
  const [payPerMonth, setPayPerMonth] = useState(0);
  const [ostatok, setOstatok] = useState(0);
  const [monthPercent, setMonthPercent] = useState(12);
  const [month, setMonth] = useState(36);
  const [PS, setPS] = useState(0);
  const [finalSum, setFinalSum] = useState(0);
  const [kredit, setKredit] = useState(20000);

  // const [fuelConsumption, setFuelConsumption] = useState(0);
  // const [kmCost, setKmCost] = useState(0);

  // useEffect(() => {
  //   if (!fuelUsed || !distance) {
  //     return
  //   }

  //   const fuelConsumptionPerKm = (fuelUsed / distance)
  //   const _fuelConsumption = fuelConsumptionPerKm * 100
  //   setFuelConsumption(_fuelConsumption)

  //   if (fuelCost) {
  //     setKmCost(fuelConsumptionPerKm * fuelCost)
  //   }
  // }, [fuelUsed, distance, fuelCost])

  useEffect(() => {
    const PS = monthPercent / (100 * 12);
    const PP = 1 - (1 / Math.pow((1 + PS), month));
    const _payPerMonth = kredit * (PS / PP)
    setPayPerMonth(_payPerMonth);
    setFinalSum(_payPerMonth * month);
    console.log(payPerMonth);
  }, [monthPercent, kredit, month])

  return (
    <View style={styles.calculator}>
      <Text style={styles.title}>Выберите срок кредита</Text>
      <Picker label="" onValueChange={(value) => { setMonth(value) }}>
        {/* //<Picker.Item label="12 месяцев" value={12} /> */}
        <Picker.Item label="36 месяцев" value={36} />
        <Picker.Item label="120 месяцев" value={120} />
        <Picker.Item label="240 месяцев" value={240} />
      </Picker>
      <View style={styles.line} />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.title} > Расчёт по ежемесячному аннуитетному платежу</Text>
          <Text style={styles.title} > Введите исходные данные</Text>

          <View>
            <Text>Сумма кредита</Text>
            <UnitSelect value={kredit} onChange={setKredit} isEditable={true} options={['BYN']} />
          </View>

          <View>
            <Text>Процентная ставка</Text>
            <UnitSelect value={monthPercent} onChange={setMonthPercent} isEditable={true} options={['%']} />
          </View>


        </View>
        <View style={styles.column}>
          <View style={styles.row}>            
            <Text>Ежемесячный платеж </Text>
            <Text>{payPerMonth}</Text>
            <Text>Общая сумма выплат </Text>
            <Text>{finalSum}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 600,
  },
  calculator: {
    display: "grid",
    gap: "12px"
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "12px"
  },
  input: {
    border: "1px solid gray"
  },
  column: {
    gap: "12px",
    minWidth: "200px"
  }
});