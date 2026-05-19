import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import Postcode from '@actbase/react-daum-postcode';

interface AddressInputModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectAddress: (data:any) => void;
}

const AddressInputModal: React.FC<AddressInputModalProps> = ({ isVisible, onClose, onSelectAddress }) => {
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  
    const handleComplete = (data: any) => {
      const fullAddress = data.address;
      const detailAddress = data.buildingName;
      const bnameAddress = data.bname;
      onSelectAddress(data);
      // console.log(data);
      onClose();
    };
  
    return (
      <View>
        {isVisible && (
          <Postcode            
            onSelected={handleComplete}
            style={{ position:"relative", width: '100%', height: '92%' }}
            onError={function (error: unknown): void {
                throw new Error('Function not implemented.');
            }}
          />
        )}
      </View>
    );
  };
  
  export default AddressInputModal;