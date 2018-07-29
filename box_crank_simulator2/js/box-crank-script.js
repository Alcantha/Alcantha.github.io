$(document).ready(() => {

'use strict';

var MEDAL_COST = 1500;
var NB_PLAY = 10;
var TOTAL_NB_BOX = NB_PLAY * 25;

var $btn10Play = $('#btn-10-play');

var $seed = $('#seed');
var $checkIgnoreSR = $('#ignore-sr');
var $checkIgnoreRare = $('#ignore-rare');
var $checkIgnoreNormal = $('#ignore-normal');

var $medalsSpent = $('#medals-spent');
var $nbTotalPlay = $('#nb-play');

var $seedValue = $('#seed-value');

var $boxListContainer = $('#box-list-container');

var $listUnitParts = $('#list-unit-parts');

var baseEngine = 0;

var boxList = [];
var boxCount = 0;

var medalsSpent = 0;
var nbCurrentPlay = 0;
var nbTotalPlay = 0;

var listBoxIndex = [];

function addBoxCrankUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 80 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 5 });
    boxList.push({ id: e, parts: 5 });

    units[e]['order'] = ++boxCount;
  });
}

function addPrevBoxCrankUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 5 });
    boxList.push({ id: e, parts: 5 });

    units[e]['order'] = ++boxCount;
  });
}

/*
function addBoxCrankReturnUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 30 });

    units[e]['order'] = ++boxCount;
  });

  listId.forEach(e => {
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 5 });
    boxList.push({ id: e, parts: 5 });
  });
}
//*/

function addSuperRareUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 30 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });

    units[e]['order'] = ++boxCount;
  });
}

function addRareUnitOnce(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 5 });

    units[e]['order'] = ++boxCount;
  });
}

function addRareUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 30 });
    boxList.push({ id: e, parts: 20 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 5 });

    units[e]['order'] = ++boxCount;
  });
}

/*
function addNormalUnit(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });

    units[e]['order'] = ++boxCount;
  });
}

function addNormalUnitLow(listId) {
  listId.forEach(e => {
    boxList.push({ id: e, parts: 10 });
    boxList.push({ id: e, parts: 10 });

    units[e]['order'] = ++boxCount;
  });
}
//*/

function initBoxList(boxCrankListUnitId) {
  var functAddUnit = [
    null,
    addBoxCrankUnit, // 1
    addPrevBoxCrankUnit, // 2
    addSuperRareUnit, // 3
    addRareUnitOnce, // 4
    addRareUnit, // 5
  ];
  var len = functAddUnit.length

  boxCrankListUnitId
    .filter(o => o.type > 0 && o.type <= len)
    .forEach(o => functAddUnit[o.type](o.listUnitId));
}

function initHtmlTable() {
  var str = '';
  var i = 0;

  boxList.forEach(e => {
    var id = e.id;
    var parts = e.parts;
    var name = units[id].name;

    str += '<tr data-index="' + i + '" data-id="' + id + '">'
      + '<th scope="row">' + (i + 1) + '</th>'
      + '<td>' + name + '</td>'
      + '<td>' + parts + '</td>';
      + '</tr>';

    i++;
  }); 

  $boxListContainer.append(str);
}

function initListIndex() {
  listBoxIndex = [];

  for (var i = 0; i < TOTAL_NB_BOX; i++)
    listBoxIndex.push(i);

  var boxSeed = Random.integer(1, 1000000000)(baseEngine);

  var boxEngine = Random.engines.mt19937().seed(boxSeed);

  Random.shuffle(boxEngine, listBoxIndex);

  $btn10Play.attr('disabled', null);

  $seedValue.text(getSeed());
}

// Random

function getSeed() {
  var strVal = $seed.val();

  return isNaN(strVal) ? 0 : parseInt(strVal);
}

function initBaseEngine(seed) {
  baseEngine = Random.engines.mt19937().seed(seed);
}

// Box List Result

function tenPlayBoxListResult() {
  var offset = nbCurrentPlay;

  for (var i = 0; i < NB_PLAY; i++) {
    var index = listBoxIndex[offset + i];

    var id = boxList[index].id;
    var parts = boxList[index].parts;
    var unit = units[id];

    var name = unit.name;
    var rarity = unit.rarity;
    var order = unit.order;

    var $result = $listUnitParts.find('.unit-parts[data-id='+id+']');

    if ($result.length) {
      var currentParts = parseInt($result.data('parts')) || 0;

      currentParts += parts;

      $result.data('parts', currentParts);

      $result.find('.parts').text(currentParts);

    } else {
      var attrDataType = '';
      var ignored = false;

      if (rarity == 1) {
        ignored = $checkIgnoreNormal.is(':checked');
      } else if (rarity == 2) {
        ignored = $checkIgnoreRare.is(':checked');
      } else if (rarity == 3) {
        attrDataType = ' data-type="' + unit.type + '"';
        ignored = (unit.type == 1) && $checkIgnoreSR.is(':checked');
      }

      var classHide = ignored ? ' hide' : '';

      var html = '<div class="col-lg-6' + classHide + '"'
        +' data-rarity="' + rarity + '"'
        + attrDataType
        + ' style="order: ' + order + '">'
        + '<div class="unit-parts" data-id="' + id + '" data-parts="' + parts + '">'
        + '<div class="name">' + name + '</div>'
        + '<div class="parts">' + parts + '</div>'
        + '</div>'
        + '</div>';

      $listUnitParts.append(html);
    }
  }
}

function resetAllBoxListResult() {
  $listUnitParts.empty();
}

// Box List Container

function tenPlayBoxListContainer() {
  var offset = nbCurrentPlay;

  for (var i = 0; i < NB_PLAY; i++) {
    var index = listBoxIndex[offset + i];

    var $line = $boxListContainer.find('tr[data-index='+index+']');

    $line.addClass('table-success');
  }
}

function boxResetBoxListContainer() {
  $boxListContainer.find('tr.table-success').removeClass('table-success');
}

// Result

function updateResult() {
  $medalsSpent.text(medalsSpent);
  $nbTotalPlay.text(nbTotalPlay);
}

function tenPlayResult() {
  if (nbTotalPlay > 0) {
    medalsSpent += MEDAL_COST;
  }

  nbCurrentPlay += NB_PLAY;
  nbTotalPlay += NB_PLAY;

  updateResult();
}

function boxResetResult() {
  nbCurrentPlay = 0;
}

function resetAllResult() {
  medalsSpent = 0;

  nbCurrentPlay = 0;
  nbTotalPlay = 0;

  updateResult();
}

// Buttons event

$btn10Play.click(() => {
  if (nbCurrentPlay < TOTAL_NB_BOX) {
    // Box List Container
    tenPlayBoxListContainer();

    // Box List Result
    tenPlayBoxListResult();

    // Result
    tenPlayResult();

    if (nbCurrentPlay >= TOTAL_NB_BOX) {
      $btn10Play.attr('disabled', '');
    }
  }
});

$('#btn-box-reset').click(() => {
  // Box List Container
  boxResetBoxListContainer();

  // Box List Result
  boxResetResult();

  initListIndex();
});

$('#btn-reset-all').click(() => {
  // Box List Container
  boxResetBoxListContainer();

  // Box List Result
  resetAllBoxListResult();

  // Result
  resetAllResult();

  // Engine
  initBaseEngine(getSeed());

  initListIndex();
});

// Parameters

$checkIgnoreSR.click(() => {
  var c = $checkIgnoreSR.is(':checked');

  $('#list-unit-parts > div[data-rarity="3"][data-type="1"]').toggleClass('hide', c);
});

$checkIgnoreRare.click(() => {
  var c = $checkIgnoreRare.is(':checked');

  $('#list-unit-parts > div[data-rarity="2"]').toggleClass('hide', c);
});

$checkIgnoreNormal.click(() => {
  var c = $checkIgnoreNormal.is(':checked');

  $('#list-unit-parts > div[data-rarity="1"]').toggleClass('hide', c);
});

// Initialization
var seedVal = Random.integer(1, 1000000000)(Random.engines.mt19937().autoSeed());

$seed.val(seedVal);
$checkIgnoreSR.prop('checked', true);
$checkIgnoreRare.prop('checked', true);
$checkIgnoreNormal.prop('checked', true);

// Random
initBaseEngine(getSeed());

// Box List Unit
initBoxList(boxCrankListUnitId);

// HTML table
initHtmlTable();

initListIndex();

});