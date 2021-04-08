function getNewAllMessagesss_Local(threads,account) {
    var removed = getRemovedEmails();//getContent(removedFileId);
    var theAllObjects = {}
    var account = account;//
    var counter = 0;
    for (var thread of threads) {
        var msgs = thread.getMessages();
        for (var msg of msgs) {
            var emailId, emailAddress, status, timestamp, value, organizatin;
            var emailNo = counter;
            emailAddress = (msg.getFrom()).toString().match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
            emailAddress = unique(emailAddress);
            for (var email of emailAddress) {
                if ((removed.indexOf(email) === -1) && isValidEmail(email)) {
                    emailId = "";
                    emailAddress = email;
                    account = account;
                    status = "NotActive";
                    timestamp = msg.getDate().getTime();
                    value = 0;
                    organizatin = "";
                    var theDetailedObject = fillObject_(emailId, emailNo, emailAddress, account, status, timestamp, value, organizatin);
                    if (!theAllObjects[email]) {
                        theAllObjects[email] = theDetailedObject;
                        counter++;
                    }
                }
            }
        }
    }
    return theAllObjects;
}

//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
//---------------------------------------------------------------------------------------------------------------------------------------------
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕

function setJsonObjectOnFileOnDrive(jsonObject, fileID) {
    DriveApp.getFileById(fileID).setContent(JSON.stringify(jsonObject));
}


//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
//---------------------------------------------------------------------------------------------------------------------------------------------
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
function getJsonFromFileOnDrive(fileID) {
    var stringData = DriveApp.getFileById(fileID).getBlob().getDataAsString();
    return JSON.parse(stringData);
}
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
//---------------------------------------------------------------------------------------------------------------------------------------------
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
function getListOfEmailsObjectsSortedBy(theJson, crateriea) {
    var values = Object.values(theJson);
    return values.sort(function (a, b) { return (a[crateriea] < b[crateriea]) ? -1 : (a[crateriea] > b[crateriea]) ? 1 : 0; });
}


