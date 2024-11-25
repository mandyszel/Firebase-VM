import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./HomeScreen";
import CachorroManter from "./CachorroManter";
import CachorroListar from "./CachorroListar";

const Drawer = createDrawerNavigator();

export default function Menu () {
    return(
        <Drawer.Navigator initialRouteName="Página Inicial">
            <Drawer.Screen name="Página Inicial" component={Home}/>
            <Drawer.Screen name="Cachorro Manter" component={CachorroManter}/>
            <Drawer.Screen name="Cachorro Listar" component={CachorroListar}/>
        </Drawer.Navigator>
    )
}