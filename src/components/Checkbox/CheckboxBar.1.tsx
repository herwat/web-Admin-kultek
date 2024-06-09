import React, { ReactNode } from 'react'; 
import { IonCheckbox, IonLabel } from '@ionic/react';

type CheckboxBarProps = {
  maxWidth: string;
  boxName: ReactNode; 
  reminder: boolean;
  onReminderChange: (checked: boolean) => void;
  style?: React.CSSProperties; 
};

export const CheckboxBar: React.FC<CheckboxBarProps> = (props) => {
  return (
    <div style={{ maxWidth: props.maxWidth }}>
      <IonLabel>{props.boxName}</IonLabel>
      <IonCheckbox
        id='boxs'
        checked={props.reminder}
        onIonChange={(e) => props.onReminderChange(!!e.detail.checked)} />
    </div>
  );
};
