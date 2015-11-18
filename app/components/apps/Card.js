import React, { PropTypes } from 'react';

class Card extends React.Component {
    render () {
        return (
            <div className="col-md-4">
                <div className="col-md-2">
                    <div className="media">
                        <div className="media-left media-middle">
                            <a href="#">
                                <img className="media-object" src={this.props.card.coverImage.small} width="170" height="170" alt="..."/>
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{this.props.card.title}</h4>
                            <h6 className="media-heading">{this.props.card.subtitle}</h6>
                            {this.props.card.description}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired
};

export default Card;
