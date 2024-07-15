import { View,Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function About(){
    const insets = useSafeAreaInsets();
    return(
        <View style={{paddingBottom: insets.bottom, paddingTop: insets.top }}>
            <Text>
                HOME
            </Text>
        </View>
    )
}