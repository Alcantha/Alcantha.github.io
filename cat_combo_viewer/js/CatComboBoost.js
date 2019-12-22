'use strict';

const CatComboBoost = function ({ id, name }) {
  this.getId = function () {
    return id;
  };

  this.getName = function () {
    return name;
  };
};

export default CatComboBoost;