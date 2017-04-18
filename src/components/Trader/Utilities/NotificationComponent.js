import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
};

export class NotificationComponent extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

    const {notifications} = this.props;

    return (
      <div>
        <Notifications notifications={notifications} />
      </div>
    );
  }
}
