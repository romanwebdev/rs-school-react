import { Component } from 'react';

type ErrorFallbackProps = {
  error?: Error;
};

export default class ErrorFallback extends Component<ErrorFallbackProps> {
  render() {
    return <p>{this.props.error?.message || 'Unknown error'}</p>;
  }
}
