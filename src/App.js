import React from 'react'
import AuthLoading from './AuthLoading'
import Home from './Home'
import Login from './Login'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'


const AuthNav = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Home: Home,
    Login: Login,
  },
  {
    initialRouteName: 'AuthLoading',

    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }
);

export default createAppContainer(AuthNav)