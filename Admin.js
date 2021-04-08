
function setHeaderHorizental() {
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName('dates_1');
  //sheet.clear();
  var start = new Date("2021/1/1");
  var end = new Date("2021/1/31");
  var loop = new Date(start);
  //var dates = [[]];
  var dates = [['Number Of New Emails', 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]];
  dates = dates[0];
  dates = dates.map(item => item.toString());
  dates = [dates]
  /*while (loop <= end) {
     dates[0].push(_convertDate(loop).toString())
     var newDate = loop.setDate(loop.getDate() + 1);
     loop = new Date(newDate);
   }*/
  sheet.getRange(1, 2, 1, dates[0].length).setValues(dates);
  sheet.setFrozenRows(1);

}


function setHeaderVertical() {
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName('dates_1');
  //sheet.clear();
  //var dates = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  var dates = [];
  var start = new Date("2021/1/1");
  var end = new Date("2022/12/31");
  var loop = new Date(start);
  var dates = [];
  while (loop <= end) {
    dates.push(_convertDate(loop).toString())
    var newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
  }
  dates = dates.map(item => [item]);
  sheet.getRange(2, 1, dates.length, 1).setValues(dates);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);
}



function updateInSheet(Field, date, countOfEmails, color) {

  date = new Date(date);
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName('dates_1');

  var headerHorizon = sheet.getDataRange().getValues()[0];
  var dateColumnNumber = headerHorizon.indexOf(Field.toString()) + 1;

  var LastRow = sheet.getDataRange().getLastRow();

  var headerVertival = sheet.getRange(1, 1, LastRow).getValues();
  headerVertival = headerVertival.map(item => item[0].toString());
  var FieldNumber = headerVertival.indexOf(date.toString()) + 1;
  //const color = Math.floor(Math.random()*16777215).toString(16);
  sheet.getRange(FieldNumber, dateColumnNumber).setValue(countOfEmails).setBackground(/*'#'+*/color);
  

  
}
//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
//Written on 26 jan 2021 
function getRemovedEmails() {
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName('Removed_4');
  return sheet.getDataRange().getValues().toString().match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
}



//█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████	
//Written on 5 Feb 2021 
function getEmailsOf(sheetName){
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName(sheetName);
  return sheet.getDataRange().getValues().toString().match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
}


//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕
//---------------------------------------------------------------------------------------------------------------------------------------------
//	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕	↕


//Written on 26 Feb 2021 
/*
 returns key/value pairs Object of Columns for Ex:
 "Date/Header" Represents keys,
 and column "Number Of New Emails" Represent Values.
 For Example {"2021/01/01":6}
*/
function get_KVP_Object(sheetName, columnName_asKey, columnName_asValue){
   
    var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName(sheetName);
    var dataRange = sheet.getDataRange().getValues();
    var keyNum = dataRange[0].indexOf(columnName_asKey);
    var valueNum = dataRange[0].indexOf(columnName_asValue);
    var ob = {};
    for (var arr of dataRange) {
        let key = _convertDate(arr[keyNum]);
        let value = arr[valueNum]
        
        var falsy = [null,undefined,'']
        if (dataRange.indexOf(arr) == 0  ||falsy.indexOf(key) >= 0 || falsy.indexOf(value)>=0) {
            continue;
        }
       
        ob[key] = value
    }
  return ob;
}






////////

function updateRemovedSheet(notFoundEmails) {
  
  var removedEmails = getRemovedEmails();   
  removedEmails =  removedEmails.concat(notFoundEmails?notFoundEmails:removedEmails);
  removedEmails  = unique(removedEmails);
  
  removedEmails = removedEmails.map(item=>[item])
  var sheet = SpreadsheetApp.openById(AceAlBastoni_Spreadsheet).getSheetByName('Removed_4');
  sheet.clear()
   var last =  sheet.getDataRange().getLastRow()+1;
  sheet.getRange(last, 1, removedEmails.length, 1).setValues(removedEmails);
  
  
  return       //.toString().match(/[.\w-]+@([\w-]+\.)+[\w-]+/g);
}

















