import React, { PropTypes } from 'react';

class Card extends React.Component {

    render () {
        const spanStyle = {
            position:'absolute',
            width:'100%',
            height:'100%',
            top:0,
            left: 0
        };

        return (
            <div className="row well" style={{height:120}}>
                <div className="col-md-4">
                    <a href={"#/apps/" + this.props.card.appId}>
                        <img src={this.props.card.coverImage.small} style={{ maxHeight:100 }}
                            className="img-responsive center-block" alt="Responsive image"/>
                    </a>
                </div>
                <div className="col-md-8">
                    <h4 className="media-heading">
                        <a href={"#/apps/" + this.props.card.appId} style={{color: "black"}}>{this.props.card.title}</a>
                    </h4>
                    <h6 className="media-heading">
                        <a href={"#/apps/" + this.props.card.devId} style={{color: "#8d8d8d"}}>{this.props.card.subtitle}</a>
                    </h6>
                    <h5 style={{position:'relative'}}>
                        <small>{this.props.card.description.substr(0,150)}</small>
                        <a href={"#/apps/" + this.props.card.appId}><span style={spanStyle}></span></a>
                    </h5>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired
};

export default Card;
