class CustomJSON {
  static stringify(data) {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error("Error in stringify:", error);
      return null;
    }
  }

  static parse(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error in parse:", error);
      return null;
    }
  }

  static validate(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  static merge(jsonObj1, jsonObj2) {
    return { ...jsonObj1, ...jsonObj2 };
  }

  static getKeys(jsonObject) {
    return Object.keys(jsonObject);
  }

  static getValues(jsonObject) {
    return Object.values(jsonObject);
  }

  static getValue(jsonObject, key) {
    return jsonObject[key];
  }

  static setValue(jsonObject, key, value) {
    jsonObject[key] = value;
  }

  static removeKey(jsonObject, key) {
    delete jsonObject[key];
  }

  static hasKey(jsonObject, key) {
    return jsonObject.hasOwnProperty(key);
  }

  static isEmpty(jsonObject) {
    return Object.keys(jsonObject).length === 0;
  }

  static deepClone(jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
  }

  static flatten(jsonObject) {
    const result = {};
  
    function recurse(current, property) {
      if (Object(current) !== current) {
        result[property] = current;
      } else if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          recurse(current[i], property + "[" + i + "]");
        }
        if (current.length == 0) {
          result[property] = [];
        }
      } else {
        let isEmpty = true;
        for (const p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + "." + p : p);
        }
        if (isEmpty && property) {
          result[property] = {};
        }
      }
    }
  
    recurse(jsonObject, "");
    return result;
  }

  static unflatten(flatObject) {
    const result = {};
  
    for (const key in flatObject) {
      const keys = key.split('.');
      let current = result;
  
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        current = current[k] = current[k] || {};
      }
  
      current[keys[keys.length - 1]] = flatObject[key];
    }
  
    return result;
  }


  static sortByKey(jsonObject) {
    const sortedObj = {};
    Object.keys(jsonObject).sort().forEach(key => {
      sortedObj[key] = jsonObject[key];
    });
    return sortedObj;
  }

  static prettyPrint(jsonObject) {
    return JSON.stringify(jsonObject, null, 2);
  }

  static filter(jsonObject, predicate) {
    const result = {};
    for (const key in jsonObject) {
      if (predicate(jsonObject[key], key, jsonObject)) {
        result[key] = jsonObject[key];
      }
    }
    return result;
  }
  
  
  static map(jsonObject, mapper) {
    const result = {};
    for (const key in jsonObject) {
      result[key] = mapper(jsonObject[key], key, jsonObject);
    }
    return result;
  }


  static reduce(jsonObject, reducer, initialValue) {
    let accumulator = initialValue;
    for (const key in jsonObject) {
      accumulator = reducer(accumulator, jsonObject[key], key, jsonObject);
    }
    return accumulator;
  }


  static toJsonArray(jsonObject) {
    return Object.entries(jsonObject);
  }

  static fromJsonArray(jsonArray) {
    return Object.fromEntries(jsonArray);
  }
}
