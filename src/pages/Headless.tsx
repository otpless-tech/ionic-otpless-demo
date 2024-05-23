import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonList,
  IonText,
  IonRow,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { OtplessManager } from 'otpless-ionic';
import './Variables.css'; 
import { Clipboard } from '@capacitor/clipboard';

const module = new OtplessManager();

const HeadlessScreen: React.FC = () => {
  const history = useHistory();
  let [selectedTab, setSelectedTab] = useState(0);
  let [otplessResponse, setOtplessResponse] = useState("");
  let [countryCode, setCountryCode] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [otp, setOtp] = useState('');
  let [email, setEmail] = useState('');
  let [channelType, setChannelType] = useState('');
  let [areChannelsVisible, setChannelVisiblity] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    module.initHeadless("ZTDR74HFNT0L7CP504ZF");
    module.setHeadlessCallback(onHeadlessResult);
    return () => {
      module.clearListener();
    }
  }, []);

  const onHeadlessResult = (data: any) => {
    let dataStr = JSON.stringify(data);
    setOtplessResponse(dataStr);
  }

  const handleTabSelection = (tab: number) => {
    if (tab === selectedTab) {
      return;
    }
    setSelectedTab(tab);
    setOtplessResponse("");
    setPhoneNumber("")
    setOtp("")
    setEmail("")
    setChannelType("")
    setCountryCode("")
  }

  const startPhoneAuth = async ()=> {
    let headlessRequest = {}
    if(otp.length > 0) {
        headlessRequest = {
            "countryCode": countryCode,
            "phone": phoneNumber,
            "otp": otp
        }
    } else {
        headlessRequest = {
            "countryCode": countryCode,
            "phone": phoneNumber,
        }
    }
    console.log(headlessRequest)
    await module.startHeadless(headlessRequest)
  };

  const startEmailAuth = async ()=> {
    let headlessRequest = {}
    if (otp.length > 0) {
        headlessRequest = {
            "email": email,
            "otp": otp
        }
    } else {
        headlessRequest = {
            "email": email
        }
    }

    await module.startHeadless(headlessRequest)
  }

  const writeToClipboard = async () => {
    await Clipboard.write({
      string: otplessResponse
    });
    setShowToast(true);
  };

  const startSSOAuth = async ()=> {
    let headlessRequest = {
        "channelType": channelType
    }
    await module.startHeadless(headlessRequest)
  }

  const toggleChannelTypesVisiblity = () => {
    setChannelVisiblity(!areChannelsVisible);
  };

  const closeMenu = () => {
    setChannelVisiblity(false);
  };

  const handleSelectedChannel = (selectedChannel: string) => {
    setChannelType(selectedChannel);
    closeMenu();
  };

  const channelTypes = [
    "WHATSAPP", "GMAIL", "APPLE", "TWITTER", "DISCORD", "SLACK",
    "FACEBOOK", "LINKEDIN", "MICROSOFT", "LINE", "LINEAR", "NOTION",
    "TWITCH", "GITHUB", "BITBUCKET", "ATLASSIAN", "GITLAB"
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Headless</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="none">
          <IonLabel>Select Test Mode</IonLabel>
        </IonItem>
        <IonRow className='full-width-item'>
            <IonButton
                className={`auth-selector-button ${selectedTab === 0 ? 'selected' : ''}`}
                expand="block"
                fill="clear"
                onClick={() => handleTabSelection(0)}
            >
                Phone
            </IonButton>
            <IonButton
                className={`auth-selector-button ${selectedTab === 1 ? 'selected' : ''}`}
                expand="block"
                fill="clear"
                onClick={() => handleTabSelection(1)}
            >
                Email
            </IonButton>
            <IonButton
                className={`auth-selector-button ${selectedTab === 2 ? 'selected' : ''}`}
                expand="block"
                fill="clear"
                onClick={() => handleTabSelection(2)}
            >
                Social Sign In
            </IonButton>
        </IonRow>

        <div className="divider"></div>

        {selectedTab === 0 && (
          <div>
            <IonItem lines='none'>
              <IonLabel position="stacked">Country Code</IonLabel>
              <IonInput inputmode="numeric" value={countryCode} placeholder="Enter Country Code" onIonInput={(e) => setCountryCode(e.detail.value!)} />
            </IonItem>

            <IonRow className='full-width-item'>
                <IonItem lines='none'>
                <IonLabel position="stacked">Phone Number</IonLabel>
                    <IonInput inputmode="numeric" value={phoneNumber} placeholder="Enter Phone Number" onIonInput={(e) => setPhoneNumber(e.detail.value!)} />
                </IonItem>
                <IonItem lines='none'>
                    <IonButton className='ion-button' expand="block" onClick={startPhoneAuth}>Start</IonButton>
                </IonItem>
            </IonRow>

            <IonRow className='full-width-item'>
                <IonItem lines='none'>
                    <IonLabel position="stacked">OTP</IonLabel>
                    <IonInput inputmode="numeric" value={otp} placeholder="Enter OTP" onIonInput={(e) => setOtp(e.detail.value!)} />
                </IonItem>
                <IonItem lines='none'>
                    <IonButton className='ion-button' expand="block" onClick={startPhoneAuth}>Verify</IonButton>
                </IonItem>
            </IonRow>
          </div>
        )}

        {selectedTab === 1 && (
          <div>
            <IonRow className='full-width-item'>
                <IonItem lines='none'>
                <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={email} placeholder="Enter Email" onIonInput={(e) => setEmail(e.detail.value!)} />
                </IonItem>
                <IonItem lines='none'>
                    <IonButton className='ion-button' expand="block" onClick={startEmailAuth}>Start</IonButton>
                </IonItem>
            </IonRow>
           
           <IonRow className='full-width-item'>
            <IonItem lines='none'>
                <IonLabel position="stacked">OTP</IonLabel>
                <IonInput value={otp} placeholder="Enter OTP" onIonInput={(e) => setOtp(e.detail.value!)} />
            </IonItem>
            <IonItem lines='none'>
                <IonButton className='ion-button' expand="block" onClick={startEmailAuth}>Verify</IonButton>
            </IonItem>
           </IonRow>
          </div>
        )}

        {selectedTab === 2 && (
          <div>
            <IonItem lines='none'>
              <IonButton className='sso-button' expand="block" onClick={toggleChannelTypesVisiblity}>Select Channel</IonButton>
            </IonItem>
            <IonModal isOpen={areChannelsVisible} onDidDismiss={closeMenu}>
              <IonContent>
                <IonList>
                  {channelTypes.map((item, index) => (
                    <IonItem key={index} button onClick={() => handleSelectedChannel(item)}>
                      <IonLabel>{item}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
                <IonButton className='sso-button' expand="block" onClick={closeMenu}>Close</IonButton>
              </IonContent>
            </IonModal>
            <IonItem>
              <IonButton className='sso-button' expand="block" onClick={startSSOAuth}>Start</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Selected Channel Type - {channelType}</IonLabel>
            </IonItem>
          </div>
        )}

        {otplessResponse.length > 0 && (
          <div style={{margin: 10}}>
            <IonItem lines='none'>
              <IonLabel>Otpless Response</IonLabel>
              <IonButton className='ion-button' expand="block" onClick={writeToClipboard}>Copy Response</IonButton>
            </IonItem>
           <IonText className='response'>{otplessResponse}</IonText>
          </div>
        )}
      </IonContent>
      <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Response copied to clipboard."
          duration={2000}
        />
    </IonPage>
  );
};

export default HeadlessScreen;
