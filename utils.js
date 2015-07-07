/**
 * returns the value of property in the following record object
 * @param {Object} record 
 * @param {String} property
 */
exports.getJsonProperty = function (record, property) {
  if(record[property] !== undefined && record[property]){
      return record[property];
  }else{
      return "";
  }
};

/**
 * returns the value of levelTwoProperty from the levelOneProperty Value object of the following record 
 * @param {Object} record 
 * @param {String} levelOneProperty
 * @param {String} levelTwoProperty
 */
exports.getLevelTwoJsonProperty = function (record, levelOneProperty, levelTwoProperty) {
  if(record[levelOneProperty] !== undefined && record[levelOneProperty] && record[levelOneProperty][levelTwoProperty] !== undefined && record[levelOneProperty][levelTwoProperty]){
      return record[levelOneProperty][levelTwoProperty];
  }else{
      return "";
  }
};

/**
 * returns whether the record is valid or not
 * @param {Object} record 
 */
exports.isValidRecord = function(record){    
    if(record.drm && record.episodeCount && record.episodeCount > 0){
        return true;
    }
    return false;
}

/**
 * returns the reponse record format
 */
exports.getResponseRecordFormat = function () {
  return {
    image : "",
    slug : "",
    title : ""
  };
};

