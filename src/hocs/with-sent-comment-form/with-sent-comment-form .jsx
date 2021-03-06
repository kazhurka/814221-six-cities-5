import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchCommentsByOffer, sendComment} from "../../store/api-actions";
const withSentCommentForm = (Component) => {
  class WithSentCommentForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        review: ``,
        rating: ``,
        isSending: false,
      };
      this.sendForm = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
    }
    handleSubmit(evt) {
      evt.preventDefault();
      this.setState({
        isSending: true,
      });
      this.props.onSubmit({
        comment: this.state.review,
        rating: this.state.rating,
        id: this.props.id,
      });

      this.setState({
        isSending: false,
        review: ``,
        rating: ``,
      });
    }

    handleFieldChange(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value});
    }

    render() {
      return (
        <Component
          handleSubmit={this.handleSubmit}
          handleFieldChange={this.handleFieldChange}
          isSending={this.state.isSending}
          formComment={this.state.review}
          formRating={this.state.rating}
        ></Component>
      );
    }
  }

  WithSentCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  };
  const mapDispatchToProps = (dispatch) => ({
    onSubmit(authData) {
      dispatch(sendComment(authData));
      dispatch(fetchCommentsByOffer(authData.id));
    },
  });
  const commentForm = connect(null, mapDispatchToProps)(WithSentCommentForm);
  return commentForm;
};

export default withSentCommentForm;
