var unitsStats = [];

var $lastUpdate = $('.last-update');
var $listUnit = $('.list-unit');

$(document).ready(function () {

function ajaxLoadUnitsMaxStat(url) {
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json'
  }).done(function (data) {
    setLastUpdate(data);
    loadUnitsMaxStat(data);

  }).fail(function (a, b, c) {
    console.log(c.message);
  });
}

function setLastUpdate(data) {
  var text = 'Last update: ' + data.lastUpdate;

  $lastUpdate.text(text);
}

function loadUnitsMaxStat(data) {
  unitsMaxStat = data.units.map((e) => new UnitMaxStat(e));

  unitsMaxStat.forEach((e) => {
    $listUnit.prepend(e.getShortHtml());
  });
}

ajaxLoadUnitsMaxStat('units-max-stat.json');

});