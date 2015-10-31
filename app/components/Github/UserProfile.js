var React = require('react');
var PropTypes = React.PropTypes;

var UserProfile = React.createClass({
    propTypes: {
        username: PropTypes.string.isRequired,
        bio: PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                User Profile <br/>
                Username: {this.props.username} <br/>
                Bio: {JSON.stringify(this.props.bio)}
            </div>
        )
    }

});

module.exports = UserProfile;
