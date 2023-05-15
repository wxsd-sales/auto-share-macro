# Auto Share Macro

This Cisco Webex Device Macro is simple. It will create a single button on your touch device that will dial a specified SIP URI and once the call has been connected, it will automatically present from a specified source input port.

Once the call has ended, the presentation share preview will also automatically be closed.

Setup Instructions:

1. Customise the initial values at the beginning of the macro. Specify your devices presentation input number, SIP URI and UI icon needs.
2. Load the Macro on your Cisco Webex device running RoomOS or CE
3. The Macro will automatically add the icon on your devices touch device once it runs.

Screenshot of macro icon on a Webex Touch Interface:
![AutoShare](https://user-images.githubusercontent.com/21026209/136816656-96957943-e0a2-488d-8537-600e36550778.png)

## Requirements

1. Webex Device running RoomOS 9.15.x or above.
2. Device Web Admin or Control Hub access to enable and upload the Macro.

## Setup

1. Download the ``auto-share.js`` file and upload it to your Webex Room device.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro.

## Validation

Validated Hardware:

* Webex Room Kit Pro
* Webex Desk Pro

  
## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).



## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=auto-share-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
