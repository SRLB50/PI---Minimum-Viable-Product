import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ServicoProps = {
    status: string
    titulo: string
    cliente: string
    endereco: string
    data: string
}

const Servico = ({ status, titulo, cliente, endereco, data }: ServicoProps) => {
    const colorStatus = (statusAtend: string) => {
        switch (statusAtend) {
            case "Finalizado":
                return "#78CA25"
            case "Cancelado":
                return "#FF4747"
            case "Pendente":
                return "#FFB947"
            default:
                return "#2C2C2C"
        }
    }

    const [statusColor, setStatusColor] = useState<string>("")

    const [month, setMonth] = useState<string>("")
    const [day, setDay] = useState<string>("")
    const [hours, setHours] = useState<string>("")

    useEffect(() => {
        const [date, hours] = data.split(" ")
        const [day, month, year] = date.split("/")

        const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)))

        setMonth(monthName.charAt(0).toUpperCase() + monthName.slice(1))
        setDay(day)
        setHours(hours)
    }, [])

    useEffect(() => {
        setStatusColor(colorStatus(status))
    }, [status])

    return (
        <View className="bg-[#FFFFFF] p-6 rounded-[15] my-[10] flex-row justify-between items-center h-[115] ">
            <View className="gap-[6]">
                <View className={`w-[80] p-[2px] rounded-[15] flex-row items-center justify-center`} style={{backgroundColor: statusColor}}>
                    <Text className="text-[#FFF] text-[0.9rem] font-medium">{status}</Text>
                </View>
                <Text className="text-[1.4rem]">{titulo}</Text>
                <Text className="text-[#8D8D8D] text-[0.9rem]">
                    <FontAwesome name="user" color={"#8D8D8D"} /> {cliente}
                </Text>
                <Text className="text-[#B3B3B3]">
                    <FontAwesome name="map-marker" color={"#B3B3B3"} /> {endereco}
                </Text>
            </View>
            <View className="items-center gap-[5] border-l-2 border-[#e8e8e8] pl-6">
                <Text className="font-medium text-[#2C2C2C]">{month}</Text>
                <Text className="text-[2.3rem] font-medium text-[#2C2C2C]">{day}</Text>
                <Text className="font-medium text-[#2C2C2C]">{hours}</Text>
            </View>
        </View>
    )
}

export default Servico
