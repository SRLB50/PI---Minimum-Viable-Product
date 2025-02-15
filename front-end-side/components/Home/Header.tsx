import { useEffect, useState } from "react"
import { View, Text } from "react-native"

type HeaderProps = {
    name: string
}


const Header = ({ name }: HeaderProps) => {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembo", "Outubro", "Novembro", "Dezembro"
    ]

    const [date, setDate] = useState<string>("")

    useEffect(() => {
        const actualDate = new Date()

        const dateString = `${actualDate.getDay()} de ${months[actualDate.getMonth()]} de ${actualDate.getFullYear()}`

        setDate(dateString)
    })

    return (
        <View id="header" className="bg-black flex-row items-end justify-around h-[130] py-[15] px-[10px] border-solid border-[#7FCCFF] border-b-[7px]">
            <View className="flex-row items-baseline justify-around w-full" >
                <Text className="text-[#FFF] text-[1.8rem]">Olá, {name}</Text>
                <Text className="text-[#FFF] text-[1rem]">{date}</Text>
            </View>
        </View>
    )
}

export default Header