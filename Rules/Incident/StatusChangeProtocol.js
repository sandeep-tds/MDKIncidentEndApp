/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function StatusChangeProtocol(clientAPI) {
    //Get the Sectioned Table based on the name
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable0');
    //Get the section based on the name
    const fcsection = sectionedTable.getSection('SectionFormCell0');
    //Get the control based on the name
    const fcAttachment = fcsection.getControl('FCDeviceImage');
    const fcSignatureCapture = fcsection.getControl('FCCustomerSignature');
    const selectedValue = clientAPI.getValue()[0].ReturnValue;
    if (selectedValue == "In Process") {
        fcAttachment.setVisible(false);
        fcSignatureCapture.setVisible(false);
    } else if (selectedValue == "Closed") {
        fcAttachment.setVisible(true);
        fcSignatureCapture.setVisible(true);
    }
}