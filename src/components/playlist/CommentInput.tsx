import { View, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import React, { FC, useState } from 'react';
import { Colors } from '@/utils/Constants';
import { interactionStyles } from '@/styles/interactionStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SocketProps } from './LikeCount';
import { useWS } from '@/service/sockets/WSProvider';
import { useAuthStore } from '@/service/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommentInput: FC<SocketProps> = ({ initialValue, setInitialValue }) => {
  const [value, setValue] = useState('');
  const socketService = useWS();
  const { user } = useAuthStore()

  const handleSendComment = () => {
    if (value.trim()) {
      socketService.emit('NEW_COMMENT', { animeId: initialValue._id, comment: value });
      setValue('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={[
        interactionStyles.inputContainer,
        {
          paddingBottom: 0,
          flexDirection: 'column',
          alignItems: 'stretch'
        }
      ]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
    >
      <SafeAreaView edges={['bottom']} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0, paddingTop: 10 }}>
        <Image source={{ uri: user?.picture }} style={interactionStyles.avatar} />
        <TextInput
          placeholder='Write here....'
          textAlignVertical='top'
          placeholderTextColor={'#666'}
          style={interactionStyles.input}
          multiline
          maxLength={120}
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity onPress={handleSendComment}>
          <MaterialIcons name="send" size={RFValue(20)} color={Colors.theme} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;
