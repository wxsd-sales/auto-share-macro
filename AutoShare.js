import xapi from 'xapi';


// Specify the URI you wish to have the button dial
const URI = 'myURI@example.com';

// Specify the video input source you would like to auto share
// This will be different depending on the model of video endpoint
const SOURCE = 3;

// Specify the name of the button you would like to appear on the touch interface
const BUTTON_NAME = 'Auto Share'

const BUTTON_ICON = 'Handset'


///////////////////////////////////
// Do not change anything below
///////////////////////////////////


// State handling varibles
let currentMacro = false;
let sharing = false;

// Add the Button to the touch panel
xapi.command('UserInterface Extensions Panel Save', {
    PanelId: 'auto_present'
    }, `<Extensions>
      <Version>1.8</Version>
      <Panel>
        <Order>1</Order>
        <Type>Statusbar</Type>
        <Icon>`+BUTTON_ICON+`</Icon>
        <Color>#CF7900</Color>
        <Name>`+BUTTON_NAME+`</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`);

// Listen for the auto_present panel press
xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId == 'auto_present'){
      console.log('Auto Present Pressed')

      // Initallise the macro
      currentMacro = true;

      xapi.Command.Dial(
        { 
          Number: URI
        });

    }
});

// This function will check we are in a call and it was established by this macro
// before starting the presentation share automatically
function detectCallAnswered(event){

  // Log all Call Answerstate events
  console.log(event);
  
  // Check that it is Answered and that currentMarco is true
  if(event == 'Answered' && currentMacro){
    
    console.log('Sharing');

    xapi.Command.Presentation.Start(
      { Instance: 1,
        PresentationSource: SOURCE});

    // Reset the macro state
    currentMacro = false;

    // Sharing is now true
    sharing = true;
  }
  else{
    
    console.log('Not sharing');
  }

}

// This fuction ensures the Presentation Preview is ended quickly after
// this macro based call has ended. It should not affect other calls
function ensurePresentationEnds(event){

  console.log(event);

  if(event.Cause == 'restartPreviewAfterCallEnded' && sharing){
    
    console.log('Preview has started, lets end it quickly');

    xapi.Command.Presentation.Stop(
      { Instance: 1,
        PresentationSource: SOURCE});

    // Reset the macro state
    sharing = false;
  }

}

// Subscribe to the Call AnswerState Status and send it to our custom function
xapi.Status.Call.AnswerState.on(detectCallAnswered);

// Subscribe to the Presentation Preview Start event and send it to our custom function
xapi.Event.PresentationPreviewStarted.on(ensurePresentationEnds);
