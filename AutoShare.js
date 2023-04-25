/*********************************************************
 * 
 * Author:           William Mills
 *                   Technical Solutions Specialist 
 *                   wimills@cisco.com
 *                   Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 09/20/21
 * 
 * This Cisco Webex Device Macro will create a single button on your
 * Webex Devices touch interface will when tapped will dial a specified 
 * SIP URI and once the call has been connected, it will automatically 
 * start sending a remote presentation from a specified source input
 * video source.
 * 
 * Full Readme and source code available on Github:
 * https://github.com/wxsd-sales/auto-share-macro
 * 
 ********************************************************/

import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/

const config = {
  target: 'user@example.com', // The target SIP address to dial
  source: 3,  // The Input Video Source which is auto shared
  button: {   // Button Configuration
    name: 'Auto Share',
    icon: 'Handset',
    color: '#CF7900',
    panelId: 'auto-share'
  }
}

/*********************************************************
 * Below are the functions of this macro which process
 * call and user interface events.
**********************************************************/

// Create our button based off config
createPanel(config.button)

// Subscribe to call status, panel clicks and presentation events
xapi.Status.Call.on(monitorCall);
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(processClicks)

// State handling varibles
let callId;

function processClicks(event) {
  if (event.PanelId != config.button.panelId) return;
  console.log(`Button [${config.button.panelId}] clicked, dialling [${config.target}]`)
  xapi.Command.Dial({ Number: config.target })
  .then(result => {callId = result.CallId})
}

// This function will start and stop presentations for calls which 
// this macro has started
function monitorCall(event) {
  if(event.id != callId) return;
  if( event.hasOwnProperty('Status') && event.Status == 'Connected'){
    console.log(`Starting presentation from source [${config.source}]`)
    xapi.Command.Presentation.Start({PresentationSource: config.source});
  } else if( event.hasOwnProperty('ghost') ){
    console.log('Call ended, stopping presentation')
    xapi.Command.Presentation.Stop();
  }
}

function createPanel(button) {
  const panel = 
  `<Extensions>
      <Panel>
        <Type>Statusbar</Type>
        <Location>HomeScreen</Location>
        <Icon>${button.icon}</Icon>
        <Color>#CF7900</Color>
        <Name>${button.name}</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`;

  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: button.panelId }, panel )
}
