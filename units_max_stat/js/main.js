var unitsStats = [];

var $listUnit = $('.list-unit');

$(document).ready(function () {

function ajaxLoadUnitsMaxStat(url) {
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json'
  }).done(function (data) {
    loadUnitsMaxStat(data);

  }).fail(function (a, b, c) {
    console.log(c.message);
  });
}

function loadUnitsMaxStat(data) {
  unitsMaxStat = data.units.map((e) => new UnitMaxStat(e));

  unitsMaxStat.forEach((e) => {
    $listUnit.append(e.getShortHtml());
  });
}

ajaxLoadUnitsMaxStat('units-max-stat.json');

});