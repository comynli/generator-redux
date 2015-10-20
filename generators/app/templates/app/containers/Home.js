import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { changeName } from '../actions';
import User from '../components/User';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
    this.props.changeName(nextValue)
  }

  componentWillMount() {
    const {changeName, inputValue} = this.props;
    changeName(inputValue);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      nextProps.changeName(nextProps.inputValue);
    }

  }

  render() {
    const { user,  inputValue } = this.props;

    return (
      <div>
        <User value={inputValue} onChange={this.handleChange} />
        <p>name is {user.name}</p>
      </div>
    )
  }

}

Home.propTypes = {
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    inputValue: state.router.location.pathname.substring(1),
    user: state.user
  };
}

export default connect(mapStateToProps, {pushState, changeName})(Home);
