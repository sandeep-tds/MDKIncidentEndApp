/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function EditOptionVisibility(clientAPI) {
    let currentStatus = clientAPI.binding.Status;
    if (currentStatus == "Closed") {
        return false;
    }
    else {
        return true;
    }
}