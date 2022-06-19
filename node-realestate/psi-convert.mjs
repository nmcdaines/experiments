
function rowToObject(columnsDef) {
  return function (row) {
    return columnsDef.reduce((acc, val, index) => {
      return {
        ...acc,
        [val]: row[index],
      }
    }, {});
  }
}

export function rowToRecord(row) {
  switch(row[0]) {
    case "A": {
      return rowToObject([
		    "recordType",
        "fileType",
        "districtCode",
        "downloadDate",
        "submitterUid"
      ])(row);
    }
    case "B": {
      return rowToObject([
	    	"recordType",
        "districtCode",
        "propertyId",
        "saleCounter",
        "downloadDate",
        "propertyName",
        "propertyUnitNumber",
        "propertyHouseNumber",
        "propertyStreetName",
        "propertyLocality",
        "propertyPostCode",
        "area",
        "areaType",
        "contractDate",
        "settlementDate",
        "purchasePrice",
        "zoning",
        "natureOfProperty",
        "primaryPurpose",
        "strataLotNumber",
        "componentCode",
        "saleCode",
        "interestOfSale",
        "dealingNumber"
      ])(row); 
    }
    case "C": {
      return rowToObject([
        "recordType",
        "districtCode",
        "propertyId",
        "saleCounter",
        "downloadDate",
        "propertyLegalDescription"
      ])(row);
    }
    case "D": {
      return rowToObject([
        "recordType",
        "districtCode",
        "propertyId",
        "saleCounter",
        "downloadDate",
        "purchaser"
      ])(row);
    }
    case "Z": {
      return rowToObject([
        "recordType",
        "totalRecords",
        "totalBRecords",
        "totalCRecords",
        "totalDRecords" 
      ])(row);
    }
    default: {
      return {};
    }
  }
}

