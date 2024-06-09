import React from 'react';
import { IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import "./buttons.css"

interface ButtonsProps {
    className?: string;
    buttonName?: string;
    maxWidth?: string;
    fillType?: "solid" | "clear" | "outline";
    shape?: "round" | "square";
    onClick?: () => void;
    path?: string;
    icon?: string;
    style?: React.CSSProperties; 
    color?: string;
}

const Buttons: React.FC<ButtonsProps> = (props) => {
    return (
        <>
            <Link to={props.path || '#'} style={{ textDecoration: 'none' }}> 
                <IonButton 
                    id='button' 
                    expand='block' 
                    fill={props.fillType} 
                    style={{...props.style, maxWidth: props.maxWidth}}
                    onClick={props.onClick}
                    color={props.color} 
                    
                >
                    {props.buttonName}
                </IonButton>
            </Link>
        </>
    );
};

export default Buttons;

