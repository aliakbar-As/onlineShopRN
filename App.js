import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import RouterComponent from './src/Router/Routes';


const App = () => {
  useEffect(() => {


    console.disableYellowBox = true;
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'#BE2C2C'}
        barStyle={'light-content'}
        translucent={false}
      />

      <RouterComponent />
    </View>
  );
}

export default App;