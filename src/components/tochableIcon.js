import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TochableIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
        <Icon name={props.name} color={props.color} width={props.width} size={props.size} />
    </TouchableOpacity>
  );
}

export default TochableIcon;

