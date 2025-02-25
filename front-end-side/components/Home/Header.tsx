import { View, Text } from "react-native"

type HeaderProps = {
    name: string
}


const Header = ({ name }: HeaderProps) => {

    return (
        <View id="header" className="bg-black flex-row items-end justify-around h-[130] py-[15] px-[10px] border-solid border-[#7FCCFF] border-b-[7px]">
            <View className="flex-row items-baseline justify-around w-full" >
                <Text className="text-[#FFF] text-[1.8rem]">Olá, {name}</Text>
                <Text className="text-[#FFF] text-[1rem]">{new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }).format(new Date())}</Text>
            </View>
        </View>
    )
}

export default Header