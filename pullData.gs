function importCSVFromWeb() {

  // Provide the full URL of the CSV file.
  //https://data.edmonton.ca/resource/eunm-re6n.csv?$limit=500
  var csvLines = getLines();
  var csvUrl = "https://data.edmonton.ca/resource/rwuh-apwg.csv?$select=latitude,longitude,building_type,PERMIT_DATE,PERMIT_NUMBER,units_added,construction_value,address,neighbourhood_numberr,job_category&$where=permit_date>'2015-01-01'&$limit=" + csvLines;
  var url = encodeURI(csvUrl);
  var csvContent = UrlFetchApp.fetch(url).getContentText();
  var csvData = Utilities.parseCsv(csvContent);

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);

}


function countLines(){
  var csvLines = getLines();
  var csvUrl = "https://data.edmonton.ca/resource/eunm-re6n.csv?$limit=55000";
  var csvContent = UrlFetchApp.fetch(csvUrl).getContentText();
  var csvData = Utilities.parseCsv(csvContent);

  return csvData.length;
}

function get(){
 var url = "https://data.edmonton.ca/resource/rwuh-apwg.csv?$select=count(*)&$where=permit_date>'2015-01-01'&$limit=100";
 var cellFunction = '=IMPORTDATA("https://data.edmonton.ca/resource/rwuh-apwg.csv?$select=count(*)&$where=permit_date>\'2015-01-01\'&$limit=100")';
 var sheet = SpreadsheetApp.getActiveSheet();
 sheet.getRange('A5').setValue(cellFunction);
}

function getLines(){
  var csvLines = "https://data.edmonton.ca/resource/rwuh-apwg.csv?$select=count(*)&$where=permit_date>'2015-01-01'";
  var url = encodeURI(csvLines);
  var contents = UrlFetchApp.fetch(url).getContentText();
  var csvData = Utilities.parseCsv(contents);

  return csvData[1];

}
