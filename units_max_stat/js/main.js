let $lastUpdate = $('.last-update');
let $listUnit = $('.list-unit');

$(document).ready(function () {

let listUnitMaxStatJson = [
  'units-max-stat-551_600.json',
  'units-max-stat-601_650.json',
  'units-max-stat.json',
];

let indexLoad = listUnitMaxStatJson.length - 1;

function loadNextUnitMaxStat() {
  if (indexLoad < 0)
    return;

  ajaxLoadUnitsMaxStat(listUnitMaxStatJson[indexLoad]);
  indexLoad -= 1;
}

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

  unitsMaxStat
    .reverse()
    .forEach(appendUnitStat);
}

function appendUnitStat(e) {
  $listUnit.append(e.getShortHtml());
}

// Load more when the bottom page is reached.
$(window).scroll(function () {
  let top = $(window).scrollTop();
  let windowHeight = window.innerHeight;
  let docHeight = $(document).height();

   if (top + windowHeight == docHeight) {
     loadNextUnitMaxStat();
   }
});

// Relocate at the top page to avoid reloading units stat.
$(this).scrollTop(0);

loadNextUnitMaxStat();

});