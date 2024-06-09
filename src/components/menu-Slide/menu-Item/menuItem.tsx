import React from 'react';
import { IonItem, IonIcon } from '@ionic/react';

import "./menuItem.css"

interface MenuItemProps {
    iconItem: string;
    iconItemFill: string;
    content: string;
    route: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconItem, iconItemFill, content, route }) => {
    return (
        <IonItem button className='item-menu' routerLink={route}>
            <div className='item-edit'>
                <IonIcon icon={iconItem} slot='start' className='item-icon'></IonIcon>
                {content}
            </div>
        </IonItem>
    );
};

export default MenuItem;