/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useDispatch } from 'react-redux';
import { retrieveBookData } from '../actions/bookData/bookData';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
         <RootNavigator />
      </NavigationContainer>
   );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
         <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
         <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
         </Stack.Group>
      </Stack.Navigator>
   );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const contractedSearchWidth = 185
const expandedSearchWidth = 250


function BottomTabNavigator() {
   const colorScheme = useColorScheme();
   const [searchQuery, setSearchQuery] = React.useState<string>("")
   const [searchExpanded, setSearchExpanded] = React.useState<boolean>(false)

   const searchWidth = useSharedValue(contractedSearchWidth)

   const dispatch = useDispatch()


   const onChangeSearch = (text: string) => {
      setSearchQuery(text)
   }

   const handleOnSubmit = () => {
      dispatch(retrieveBookData(searchQuery))
   }

   const handleOnFocus = () => {
      setSearchExpanded(true)
      searchWidth.value = expandedSearchWidth
   }

   const handleEndEditing = () => {
      setSearchExpanded(false)
      searchWidth.value = contractedSearchWidth
   }

   const animatedStyles = useAnimatedStyle(() => {
      return {
         width: withSpring(searchWidth.value)
      }
   })

   return (
      <BottomTab.Navigator
         initialRouteName="Explore"
         screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme].tint,
         }}>
         <BottomTab.Screen
            name="Explore"
            component={TabOneScreen}
            options={({ navigation }: RootTabScreenProps<'Explore'>) => ({
               title: 'Explore',
               // headerShown: false,
               tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
               headerRight: () =>
                  <Animated.View
                     style={animatedStyles}
                  >
                     <Searchbar
                        style={styles.scrollBar}
                        placeholder={"Search"}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onSubmitEditing={handleOnSubmit}
                        onFocus={handleOnFocus}
                        onEndEditing={handleEndEditing}
                     />
                  </Animated.View>
            })}
         />
         <BottomTab.Screen
            name="Library"
            component={TabTwoScreen}
            options={{
               title: 'My Library',
               tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
            }}
         />
      </BottomTab.Navigator>
   );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
}) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


const styles = StyleSheet.create({
   scrollBar: {
      marginRight: 10,
   }
});