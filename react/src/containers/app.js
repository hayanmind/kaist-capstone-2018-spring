import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

import { loadApp } from 'actions/app';
import styles from './app.css';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      asrResult: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(loadApp());
  }

  props: Props;

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div className={styles.container}>
        <FlatButton
          label="Default"
          onClick={() => {
            axios.get('/api/speech-to-text').then((response) => {
              const data = response.data;
              this.setState({
                asrResult: data,
              });
            });
          }}
        />
        {
          this.state.asrResult == null
            ? ''
            : this.state.asrResult
        }
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded
  };
}

export default connect(mapStateToProperties)(AppContainer);
