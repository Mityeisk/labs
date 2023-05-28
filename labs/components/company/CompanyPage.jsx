import { useEffect, useState } from 'react';
import { StyleSheet, View, Picker, Switch } from 'react-native';
import { Text, TextInput, Button, ListItem } from "@react-native-material/core";
import { postCompany } from '../../services/company.service';
//import { Switch } from '@mui/material/Switch';

const MOCKED_FORMS = [
  'Беларусь',
  'Россия',
  'Польша'
]

const MOCKED_FORMS2 = [
  'Десктопное',
  'Мобильное',
  'Веб'
]

export const CompanyPage = () => {
  const [screen, setScreen] = useState(0)
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [owner, setOwner] = useState('')
  const [form, setForm] = useState(MOCKED_FORMS[0])
  const [form2, setForm2] = useState(MOCKED_FORMS2[0])
  const [companyAddress, setCompanyAddress] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [urlToInst, setUrlToInst] = useState('')
  const [phone, setPhone] = useState('')
  const [checked, setChecked] = useState(false)

  const saveCompany = () => {
    postCompany({
      id: companyId,
      name: companyName,
      owner: owner,
      form: form,
      address: companyAddress,
      siteUrl: siteUrl,
    })
  }

  useEffect(() => {
    if (screen === 4) {
      setIsSaveEnabled(!(companyId && companyName && owner && form && companyAddress && siteUrl && phone && email))
    } else {
      setIsSaveEnabled(false)
    }
  }, [screen, companyId, companyName, owner, form, companyAddress, siteUrl])

  const renderScreen = () => {
    switch (screen) {
      case 0:
        return <>
          <TextInput label='Название приложения' value={companyName} onChangeText={(value) => setCompanyName(value)} />
          <TextInput label='Автор' value={companyId} onChangeText={(value) => setCompanyId(value)} />
          <Text variant='capture'>Тип приложения</Text>
          <Picker style={styles.select} onValueChange={(value) => setForm2(value)} label="Тип приложения" value={form}>
            {MOCKED_FORMS2.map((option, index) => {
              return <Picker.Item label={option} value={option} key={index} />
            })}
          </Picker>
          {/* <Switch value={checked} onValueChange={() => setChecked(!checked)} /> */}
          

        </>
      case 1:
        return <>
          <TextInput label='Исп-е языки программирования' value={owner} onChangeText={(value) => setOwner(value)} />
          
          <ListItem
            title="Приложение коммерческое"
            trailing={
              <Switch value={checked} onValueChange={() => setChecked(!checked)} />
            }
            onPress={() => setChecked(!checked)}
          />

        </>
      case 2:
        return <>
          <TextInput label='Адрес' value={companyAddress} onChangeText={(value) => setCompanyAddress(value)} />
          <TextInput label='Веб-сайт' value={siteUrl} onChangeText={(value) => setSiteUrl(value)} />
          <Text variant='capture'>Страна регистрации</Text>
          <Picker style={styles.select} onValueChange={(value) => setForm(value)} label="Форма Занятости" value={form}>
            {MOCKED_FORMS.map((option, index) => {
              return <Picker.Item label={option} value={option} key={index} />
            })}
          </Picker>
        </>

      case 3:
        return <>
          <TextInput label='Телефон' value={phone} onChangeText={(value) => setPhone(value)} />
          <TextInput label='Email' value={email} onChangeText={(value) => setEmail(value)} />
        </>
      case 4:
        return <>
          <Text variant='caption'>Компания: <Text style={{ fontWeight: 600 }}>{companyName}</Text></Text>
          <Text variant='caption'>Регистрационный Номер: <Text style={{ fontWeight: 600 }}>{companyId}</Text></Text>
          <Text variant='caption'>ФИО Владельца: <Text style={{ fontWeight: 600 }}>{owner}</Text></Text>
          <Text variant='caption'>Форма Собственности: <Text style={{ fontWeight: 600 }}>{form}</Text></Text>
          <Text variant='caption'>Адрес: <Text style={{ fontWeight: 600 }}>{companyAddress}</Text></Text>
          <Text variant='caption'>Веб-Сайт: <Text style={{ fontWeight: 600 }}>{siteUrl}</Text></Text>
          <Text variant='caption'>Номер Телефона: <Text style={{ fontWeight: 600 }}>{phone}</Text></Text>
          <Text variant='caption'>Email: <Text style={{ fontWeight: 600 }}>{email}</Text></Text>
        </>
    }
  }
  return (
    <View style={styles.company}>
      <Text variant='h6' style={styles.title}>Регистрация Приложения</Text>
      {renderScreen()}

      <View style={styles.buttons}>
        <Button disabled={(screen <= 0)} onPress={() => setScreen(value => value - 1)} title="Назад" />
        <Button disabled={isSaveEnabled} onPress={() => (screen === 3) ? saveCompany() : setScreen(value => value + 1)} title={(screen >= 3) ? 'Зарегистрировать' : 'Далее'} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 600,
  },
  company: {
    display: "grid",
    gap: "12px",
    padding: "8px"
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
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});