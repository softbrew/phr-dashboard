var React = require('react');
var PropTypes = React.PropTypes;

var Notes = React.createClass({
    propTypes: {
        username: PropTypes.string.isRequired,
        notes: PropTypes.array.isRequired,
    },

    render: function() {
        return (
            <div>Notes</div>
        );
    }

});

module.exports = Notes;
