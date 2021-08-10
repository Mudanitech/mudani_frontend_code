import React from 'react';
import { Text, View, } from 'react-native';
import { LinkExit, } from 'react-native-plaid-link-sdk';

var styles = require('../../utils/style1');


const ExitScreen = ({ route, navigation }: any) => {
  const linkExit : LinkExit = route.params;
  console.log(linkExit);


React.useEffect(() => {

    setTimeout(()=>{
     // alert('dk')
     navigation.goBack()

    },5000)
  }, []);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    
        <Text style={styles.titleText}>
         Please wait....

        </Text>
     
      {/* <View style={styles.body}>
        <Text style={styles.baseText}>
          {' '}
          Below is the error returned.
          {'\n'}
          {'\n'}
          <Text style={(styles.bold, { color: '#000000' })}>
            {JSON.stringify(linkExit)}
          </Text>
        </Text>
      </View> */}
    </View>
  );
};

export default ExitScreen;