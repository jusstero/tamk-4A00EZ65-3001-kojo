import React, {useState} from "react";
import {View, Text, Button} from "react-native";

const ClickCounter = () => {
    const [count, setCount] = useState(0);

    const onButtonPressHandler = () => {
        setCount(count + 1);
    };

    return (
        <View>
            <Text>You have clicked {count} times</Text>
            <Button onPress={onButtonPressHandler} title="Increase" />
        </View>
    );
};

export default ClickCounter;