import { Component } from 'react';
import styles from './ErrorAction.module.css';

type ErrorActionProps = {
  showError: () => void;
};

export default class ErrorAction extends Component<ErrorActionProps> {
  render() {
    return (
      <div className={styles.wrap}>
        <button onClick={this.props.showError}>Send Error</button>
      </div>
    );
  }
}
