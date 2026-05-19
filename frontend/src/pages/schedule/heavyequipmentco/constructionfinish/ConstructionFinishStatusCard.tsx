import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

interface VisitCardProps {
  requestId: string;
  customerName: string;
  customerAddress: string;
  detailAddress: string;
  visitTime: string;
  workFloor: string;
  workContent: string;
  requestedDate: string;
}

export default function ConstructionFinishStatusCard(
  props: VisitCardProps,
): JSX.Element {
  const {
    requestId,
    customerName,
    customerAddress,
    detailAddress,
    visitTime,
    workFloor,
    workContent,
    requestedDate
  } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontWeight: 'bold',
            }}>
            {requestedDate}
          </Text>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: 45,
                    gap: 15,
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: 50,
                    gap: 15,
                  }
            }>
            <View style={{height: '100%', paddingTop: 5}}>
              
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                  fontWeight: '600',
                }}>
                  <Image
                style={{width: 12, height: 18}}
                source={require('@/assets/images/03-main-icon/02-upperloc.png')}
              />
                {customerAddress}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                  fontWeight: '600',
                }}>
                {detailAddress}
              </Text>
            </View>
            <View
              style={{
                height: WINDOW_HEIGHT * 0.05,
                justifyContent: 'flex-end',
              }}>
              <Image source={require('@/assets/images/08-company/02-copy.png')} />
            </View>
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: '#656565',
              fontWeight: '600',
            }}>
            {visitTime.split(' ')[1]}
          </Text>
        </View>

        <View style={[styles.visitTimeBox, {marginTop: '5%'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
              gap: 20,
              width: '80%',
              justifyContent: 'center',
            }}>
            <Image
              style={
                Platform.OS === 'android'
                  ? {width: 57, height: 57}
                  : {
                      width: 50,
                      height: 50,
                    }
              }
              source={require('@/assets/images/08-company/10-chattalkbtn.png')}
            />
            <View style={{gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2.2),
                    color: '#000',
                    letterSpacing: -0.7,
                  }}>
                  {customerName} 고객님
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2)}}>작업층수</Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>{workFloor}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.visitTimeBox,
              {
                borderTopWidth: 1,
                borderTopColor: '#F1F1F5',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '3%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View style={{gap: 15, alignItems: 'center', padding: '5%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(2),
                      color: '#000',
                    }}>
                    작업내용
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text style={{fontSize: responsiveFontSize(1.8)}}>
                    {workContent}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10%',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.6),
                color: '#2CB07B',
                fontWeight: 'bold',
              }}>
              임대완료
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer:
    Platform.OS === 'ios'
      ? {
          width: Dimensions.get('window').width * 0.9,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 10,
        }
      : {
          width: Dimensions.get('window').width * 0.9,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 10,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.02,
  },
  customerInfoContainer: {
    width: '90%',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageBox: {
  },
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7%',
    gap: 15,
  },
  modifyVisitTime: {
    width: '25%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyButton: {
    width: '85%',
    height: '90%',
    backgroundColor: '#e9edef',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
