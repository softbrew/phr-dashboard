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
            return <Card card={card} key={index}></Card>;
        });
        var cardsList = [];
        for(let i =0; i < cards.length/2;i++) {
            cardsList.push(<div className="row" key={i}>
                <div className="col-md-4 col-md-offset-1">
                    {cards[i * 2]}
                </div>
                <div className="col-md-4 col-md-offset-1">
                    {cards[i *2 + 1]}
                </div>
            </div>);
        }

        return (
            <div className="row">
                {cardsList}
            </div>
        );
    }
}

CardList.defaultProps = {
    appList: appsStore.getAll()
};

export default CardList;
