import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonItem,
  IonLabel,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { OtplessManager } from 'otpless-ionic';
import { Clipboard } from '@capacitor/clipboard';

const Home: React.FC = () => {
  const history = useHistory();
  const module = new OtplessManager();

  const [otplessResponse, setOtplessResponse] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);
  const writeToClipboard = async () => {
    await Clipboard.write({
      string: otplessResponse
    });
    setShowToast(true);
  };

  const showOtplessLoginPage = () => {
    let request = {
      appId: 'ZTDR74HFNT0L7CP504ZF',
    };
    module.showOtplessLoginPage(request)
      .then(data => {
        let response: string = '';
        if (data.data === null || data.data === undefined) {
          response = data.errorMessage;
        } else {
          response = JSON.stringify(data.data);
        }
        setOtplessResponse(response);
      });
  };

  const buttonStyle = {
    backgroundColor: '#007AFF',
    color: 'white',
    width: '90%',
    padding: '10px',
    borderRadius: '30px',
    margin: '10px',
    textAlign: 'center' as const,
    marginStart: '10px'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Otpless Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={containerStyle}>
        <IonText className="sectionTitle" color="dark">
          <h2 style={{marginLeft: 10}}>Choose Your Test Mode</h2>
        </IonText>
        <div style={buttonStyle} onClick={showOtplessLoginPage}>
          Pre Built UI
        </div>
        <div
          style={buttonStyle}
          onClick={() => {
            history.push('/headless');
          }}
        >
          Headless
        </div>

        {otplessResponse && otplessResponse.length > 0 && (
          <div>
          <IonItem lines='none'>
            <IonLabel>Otpless Response</IonLabel>
            <IonButton className='ion-button' expand="block" onClick={writeToClipboard}>Copy Response</IonButton>
          </IonItem>
         <IonText className='response'>{otplessResponse}</IonText>
        </div>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Response copied to clipboard."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
