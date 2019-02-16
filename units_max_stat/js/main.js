let unitsStats = [];

let $lastUpdate = $('.last-update');
let $listUnit = $('.list-unit');

$(document).ready(function () {

function ajaxLoadUnitsMaxStat(url) {
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json'
  }).done(data => {
    if (data.lastUpdate) {
      setLastUpdate(data.lastUpdate);
    }

    loadUnitsMaxStat(data);

  }).fail((a, b, c) => {
    console.log(c.message);
  });
}

function setLastUpdate(lastUpdate) {
  let text = 'Last update: ' + lastUpdate;

  $lastUpdate.text(text);
}

function loadUnitsMaxStat(data) {
  unitsMaxStat = data.units.map((e) => new UnitMaxStat(e));

  unitsMaxStat.forEach(e => {
    $listUnit.prepend(e.getShortHtml());
  });
}

ajaxLoadUnitsMaxStat('units-max-stat-551_600.json');
ajaxLoadUnitsMaxStat('units-max-stat-601_650.json');
ajaxLoadUnitsMaxStat('units-max-stat.json');

});