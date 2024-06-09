import React from 'react';
import { IonSearchbar } from '@ionic/react';
import "./searchBar.css"

interface SearchBarProps {
    placeHolder?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    return (
        <div style={{ maxWidth: '400px', width: '200px' }}>
            <IonSearchbar id='search-bar' placeholder={props.placeHolder} />
        </div >
    );
};

export default SearchBar;
