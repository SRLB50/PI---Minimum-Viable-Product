import { View, Text } from 'react-native'

type DashProps = {
  value: number
  description: string
  bg: string
}
const Dashboard = ({ value, description, bg }: DashProps) => {
  return (
    <View className={bg + ' w-[47%] h-[140] rounded-[15px] p-[10] justify-center items-center'}>
      <Text className='text-white text-[4rem] font-medium'>{value}</Text>
      <Text className='text-white font-medium'>{description}</Text>
    </View>
  )
}

export default Dashboard