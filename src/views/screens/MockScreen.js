import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const MockScreen = ({route}) => {
  const [code, setCode] = useState([]);

  useEffect(() => {
    setCode(route.params?.code);
  }, [route.params?.code]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {console.log(code)}
      <Text>This is Mock Screen code from previous screen = {code}</Text>
    </View>
  );
};

export default MockScreen;
