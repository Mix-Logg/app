import React from "react";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import twrnc from "twrnc";

export default function Button({children, handle, background = ''}){
    return (
        <Pressable style={twrnc`px-2 py-1 text-white items-center ${background} justify-center rounded-lg flex-row gap-1 `}
            onPress={handle}
        >
            {children}
        </Pressable>
    )
}