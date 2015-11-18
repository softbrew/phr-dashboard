import React, { PropTypes } from 'react';
// Stores
import appsStore from '../../stores/AppsStore';
// Components
import Card from './Card';

class CardList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            appList: props.appList
        };
    }

    render () {
        var cards = this.props.appList.map((card, index) => {
            return <li className="media" key={index}>
                <Card card={card}></Card>
            </li>;
        });

        return (
            <div className="row">
                <div className="media-list">
                    {cards}
                </div>
            </div>
        );
    }
}

CardList.defaultProps = {
    appList: appsStore.getAll()
};

export default CardList;
