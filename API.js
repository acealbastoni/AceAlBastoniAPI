//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function setContent(emailsArray, FileId) {
  var str = getDate();
  for (var i = 0; i < emailsArray.length; i++) {
    str = str + i + ". " + emailsArray[i] + "\n";
  }
  var fileName = DriveApp.getFileById(FileId).getName(); //getKeyByValue(map,FileId);
  var account = Session.getUser().getEmail();
  console.log("Updating File: (" + fileName + ") @Account: " + account);
  DriveApp.getFileById(FileId).setContent(str);
}
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
//---------------------------------------------------------------------------------------------------------------------------------------------
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
function getDate() {
  var date = new Date();
  date = +"\n" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "\t" + ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes(); // formatting as: "13/12/2020	4:41"
  var dtlengt = date.length + 30;
  date = date + "\n";
  var counter = 0;
  while (++counter < dtlengt) {
    date = date + "═";
  }
  return "Last automated Run Was at : " + date + "   The File was generated automatically by Mohammed AbdElhamid Ali Gamea\n";
}

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
Array.prototype.contains = function (v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function () {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function getNewAllMessages(threads) {
  var arr = []
  var i = 0;
  for (var thread of threads) {
    var msgs = thread.getMessages()
    for (var msg of msgs) {
      var cell = "----------------------------------------------(  " + i + "  )------------------------------------------ \n" +
        "From: \n" + msg.getFrom() + " \n" +
        "Date: \n" + msg.getDate() + " \n" +
        "Subject: \n" + msg.getSubject() + " \n" +
        "Plained Body Is: \n" + msg.getPlainBody() + " \n";
      i++;
      arr.push(cell);
    }
  }
  return arr;
}

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function getStart() {
  var today = PropertiesService.getUserProperties().getProperty("today");
  if (!today) { today = 0; }
  PropertiesService.getUserProperties().setProperty("today", Number(today) + 500);
  if (today >= 19500) {
    PropertiesService.getUserProperties().setProperty("today", 0);
  }
  return today;
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
//removes the emails that have more than "dot" or ".@" 
function isValidEmail(email) {
  let notValidEmailRegex = /\.+\.+|\.@/gi;
  let result = email.match(notValidEmailRegex);
  if (result) {
    return false;
  }
  return true;
}
//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function rename(fileId, name) {
  DriveApp.getFileById(fileId).setName(name);
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function unique(emailsList) {
  emailsList = emailsList.map(item => item.toLowerCase());
  let unique = emailsList.filter((item, i, ar) => ar.indexOf(item) === i);
  return unique;
}

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function getContent(fileId) {
 return (DriveApp.getFileById(fileId).getBlob().getDataAsString()).match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
  }

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function getNamePostfix() {
  var date = new Date();
  date = "_" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "_" + ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes(); // formatting as: "13/12/2020	4:41"
  return date;
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	

function fillObject_(emailId, emailNo, emailAddress, account, status, timestamp, value, organizatin) {
  return { "emailId": emailId, "emailNo": emailNo, "emailAddress": emailAddress, "@account": account, "status": status, "timestamp": timestamp, "value": value, "organizatin": organizatin };
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
// new Functionality written on:  5 jan 2021  not used until now 
function getEmailsFromTo(from, to, objectStationID) {
  from = new Date(from).getTime();
   to = new Date(to).getTime();
   //from = new Date("2021/1/8");
  //to = new Date("2021/1/9");
  var json = getJsonFromFileOnDrive(objectStationID);
  var values = Object.values(json);
  var result = values.filter(obj => (obj.timestamp >= from) && (obj.timestamp <=(to)));
  //console.log(result)
  return result;
}




//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
//written on 6 jan 2021   //last updated on : 9 Jan 2020  // IDs Are Dummy IDs .. 
var EmailsFileId = {
  'aboarram1@gmail.com': '1guyji7UzNqyjWKHJbvk88TX6Jod5gPw8xey0n',
  'elhlawy@gmail.com': '1KAlN7mk0nwG2wSaktby0sxkH9OEm5kZDvBa_',
  'acealbastoni@gmail.com': 'k1nNkVOLsrXDdOTkiQkkja1okxDKgvzkTFyWsY7k',
  'java.developer.mohamed@gmail.com': 'k1CeOhgyEPA3jMhah-VuAwxZwZiuphdAptBvfBg',
  'emergency@qmedichealth.com': '1pd42c6YZy6rsK2dhdQHQ64cgNohxJtpJcxeh'
}


function getEmailsFileId() {
  return EmailsFileId[Session.getActiveUser().getEmail()];
}

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
// written on 6 jan 2021    all IDs Are Dummy IDs that i uploded on github .. 
var JsonFileId = {
  'acealbastoni@gmail.com': '1XLqaih4ofqrWv0f9mSqsNfjGg4gbwPVbDW',
  'elhlawy@gmail.com': '1H1djkRzBg3LrTW4Dak4xo7N8Of_WtKRSB',
  'java.developer.mohamed@gmail.com': '10gStH72_ce5v0N32NlWc1QYWfq6E7sfIa',
  'aboarram1@gmail.com': '',
  'emergency@qmedichealth.com': ''
}

function getObjectStationId(account) {
  return JsonFileId[account];
}



//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
// written on 11 jan 2021 
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}



//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
function _convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('/') //+ "  "+d.getHours() +":"+d.getMinutes()*/;
}


//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	

function getLastFailedMessages(lastMessages) {
  lastMessages = lastMessages.map(
    function (item) {
      if (item) {
        var actualBody = item.getPlainBody();
        var body =
            item.getHeader('X-Failed-Recipients')
        || (actualBody.match(/^Action:\s*(.+)/m) && 
            actualBody.match(/^Status:\s*([.\d]+)/m) && 
            actualBody.match(/^Diagnostic-Code:\s*(.+)\s*;\s*(.+)/m) && 
            actualBody.match(/[.\w-]+@([\w-]+\.)+[\w-]+/g))
        || '█';
        return (JSON.stringify(body)).toLowerCase();
      }
    })
  .filter(function (item) { return item && item.indexOf('█') === -1 });
  lastMessages = (JSON.stringify(lastMessages)).match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
  return lastMessages.filter(function (elem, pos) { return lastMessages.indexOf(elem) === pos; });
}

//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
// 1-April-2021
/*it creates a Local spreadSheet For First Time Only for the Participant.
if the function is called twice or more it will not create any thing 
the Singleton design pattern is implemented effeciently on the AcAlBastoniAPI 
and it is synchronized, if more than Participant call the function in the 
same time it will be locked. so Admin which is AceAlBastnoi it is the only person that allowed to do that for other reasons that related
to my own business logic*/
function createLocal_Spreadsheet(account) {
    let name = "Local Spreadsheet";
    let foldersArray = DriveApp.getFoldersByName(account)
    let accountFolderId = foldersArray.hasNext() ? foldersArray.next().getId() : null;
    var Local_Spreadsheet_onAccountFolder = DriveApp.getFolderById(accountFolderId).getFilesByName(name).hasNext();
                                           
    var Local_Spreadsheet_onRootFolder = DriveApp.getRootFolder().getFilesByName(name).hasNext();

    if (!(Local_Spreadsheet_onAccountFolder || Local_Spreadsheet_onRootFolder)) {
        var SpreadsheetId = SpreadsheetApp.create(name).getId();
        var UrL = DriveApp.getFileById(SpreadsheetId)
            .moveTo(DriveApp.getFolderById(accountFolderId))
            .addEditor("aboarram1@gmail.com").getUrl();
        console.log(name + " is Created Successfully for First Time");
        let createdFileDetails = { "account": account ,"FileId": SpreadsheetId,"creationDate": new Date().getTime(),"name": name,"Url": UrL}
        console.log(createdFileDetails);
        SpreadsheetApp.openById(metadata_spreadsheet)
       .getSheetByName('local Spreadsheet meta data').appendRow(Object.values(createdFileDetails)) ;
        return createdFileDetails;
    }

}

















//▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬	▬▬▬▬▬▬██████████████████████████████████████████████
