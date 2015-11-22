import React, { PropTypes } from 'react';

class Card extends React.Component {
    render () {
        return (
            <div className="row well" style={{height:120}}>
                <div className="col-md-4">
                    <img src={this.props.card.coverImage.small} style={{ maxHeight:100 }}
                        className="img-responsive center-block" alt="Responsive image"/>
                </div>
                <div className="col-md-8">
                    <h4 className="media-heading">{this.props.card.title}</h4>
                    <h6 className="media-heading">{this.props.card.subtitle}</h6>
                    <h5><small>{this.props.card.description.substr(0,150)}</small></h5>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired
};

export default Card;
