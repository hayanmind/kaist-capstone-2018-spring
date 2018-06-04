import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import styles from './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { loadApp } from 'actions/app';


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
        <link rel="stylesheet" 
         href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
         crossorigin="anonymous"/>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" 
         integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
         crossorigin="anonymous"></script>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <h1 className={styles.headline}>발표 피드백 플랫폼</h1>
        <p></p> &nbsp; &nbsp; &nbsp; &nbsp;
        <button 
          type="button" 
          class="btn btn-primary buttons"
          onClick={() => {
            axios.get('/api/speech-to-text').then((response) => {
              const data = response.data;
              this.setState({
                asrResult: data,
              });
            });
          }}
        >분석 시작</button>
        <p> </p>
        <h1 className={styles.title}>Script</h1>
        <p> </p>
        <div className={styles.content}>
        {
          this.state.asrResult == null
            ? ''
            : this.state.asrResult
        }</div>
        <p></p>
        <h3 className={styles.legend}>범례</h3>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <span class="badge badge-pill badge-primary">톤의 급격한 변화</span> &nbsp;
        <span class="badge badge-pill badge-secondary">말끝 흐림</span> &nbsp;
        <span class="badge badge-pill badge-success">속도 빠른 구간</span> &nbsp;
        <span class="badge badge-pill badge-danger">데시벨 큰 구간</span>
        <h3 className={styles.recommend}>추천 동영상</h3>
        <p></p>
        {
          this.state.asrResult == null
            ? ''
            : <iframe className={styles.video} 
              src="https://www.youtube.com/embed/hoRfsTvnpWM" 
              frameborder="0" allowfullscreen></iframe>
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
