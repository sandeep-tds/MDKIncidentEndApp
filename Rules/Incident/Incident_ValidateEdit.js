/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function Incident_ValidateEdit(clientAPI) {
    var attachments = clientAPI.getPageProxy().getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCDeviceImage').getValue();
    var statusPicker = clientAPI.getPageProxy().getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCStatus').getValue();
    var currentStatus;
    if (statusPicker.length > 0 && statusPicker[0].ReturnValue) {
        currentStatus = statusPicker[0].ReturnValue;
    }
    var customerSignature = clientAPI.getPageProxy().getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCCustomerSignature').getValue();
    var deviceID = clientAPI.getPageProxy().getControl('SectionedTable0').getSection('SectionFormCell0').getControl('FCDeviceID').getValue();
    if (!currentStatus) {
        return clientAPI.executeAction({
            "Name": '/MDKApp/Actions/GenericMessageBox.action',
            "Properties": {
                "Message": "Please select status",
                "Title": "Validation"
            }
        })
    }
    if (!deviceID) {
        return clientAPI.executeAction({
            "Name": '/MDKApp/Actions/GenericMessageBox.action',
            "Properties": {
                "Message": "Device ID is required",
                "Title": "Validation"
            }
        })
    }
    if (currentStatus === "Closed" && attachments.length !== 1) {
        return clientAPI.executeAction({
            "Name": '/MDKApp/Actions/GenericMessageBox.action',
            "Properties": {
                "Message": attachments.length < 1 ? "Please add 1 device image" : "Max. 1 image allowed for the device",
                "Title": "Validation"
            }
        })
    }
    if (currentStatus === "Closed" && !customerSignature) {
        return clientAPI.executeAction({
            "Name": '/MDKApp/Actions/GenericMessageBox.action',
            "Properties": {
                "Message": "Customer Signature is required",
                "Title": "Validation"
            }
        })
    }
    return clientAPI.executeAction({
        "Name": '/MDKApp/Actions/Incident/Incident_UpdateEntity.action',
        "Properties": {
            "OnSuccess": currentStatus === "Closed" ? "/MDKApp/Actions/Incident/Incident_UploadStream.action" : "/MDKApp/Actions/CloseModalPage_Complete.action"
        }
    })
}
