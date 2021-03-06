'use strict';

let getStrAbility = function (data) {
  if ($.isEmptyObject(data))
    return '';

  return Object.keys(data).map(k => {
    let value = data[k];

    let ability = ATTACK_ABILITIES[k];

    return ability.n + ': ' + ability.type.format(value);

  }).reduce((res, val) => {
    return res + ', ' + val;
  });
};

// --------------------
// ----  Unit Arm  ----
// --------------------

let UnitArm = function (data) {

/*this.getNames = function () {
  return data.names;
};*/

this.getDmg = function () {
  return data.dmg;
};

this.getStrDmg = function () {
  return data.dmg.toLocaleString('en');
};

};

// -----------------------
// ----  Unit Attack  ----
// -----------------------

let UnitAttack = function (data, unitStat) {

let totalDmg = undefined;

this.getTotalDmg = function () {
  if (totalDmg !== undefined)
    return totalDmg;

  if (data.temp) {
    // "temp" means that the total damage is not known.
    totalDmg = null;

  } else {
    let arms = unitStat.getArms();

    totalDmg = data.comp.map(e => {
      let dmg = arms[e.arm].getDmg();
      let nb = e.nb;
      let coef = e.coef || 1;

      return parseInt(dmg * nb * coef);

    }).reduce((r, v) => r + v);
  }

  return totalDmg;
};

this.getStrTotalDmg = function () {
  if (totalDmg === undefined)
    totalDmg = this.getTotalDmg();

  return (totalDmg != null) ? totalDmg.toLocaleString('en') : '?';
}

this.getStrShortAbilities = function () {
  return getStrAbility(data.abilities);
}

};

// -------------------------
// ----  Unit Max Stat  ----
// -------------------------

let UnitMaxStat = function (data) {

let self = this;
let arms = {};
let attacks = {};

Object.keys(data.arms).forEach((k) => {
  let value = data.arms[k];

  arms[k] = new UnitArm(value);
});

Object.keys(data.attacks).forEach((k) => {
  let value = data.attacks[k];

  attacks[k] = new UnitAttack(value, self);
});

// ----------------
// ----  Base  ----
// ----------------

// ID
this.getId = function () {
  return data.base.id;
};

// Name
this.getName = function () {
  return data.base.name;
};

// AP
this.getStrAp = function () {
  return data.base.ap.toLocaleString('en');
};

// HP
this.getStrHp = function () {
  return data.base.hp.toLocaleString('en');
};

// Production Time
this.getStrProd = function () {
  return data.base.prod.toLocaleString('en');
};

this.getStrProdSecond = function () {
  return (Math.ceil(data.base.prod * -.51 / 3) / 10).toLocaleString('en', {minimumFractionDigits: 1, maximumFractionDigits: 1});
};

// Resistance
this.getStrRes = function () {
  return data.base.res.toLocaleString('en');
};

// Movement Speed
this.getStrMov = function () {
  return data.base.mov.toLocaleString('en', {minimumFractionDigits: 2});
};

// Arms
this.getArms = function () {
  return arms;
};

// Attacks
this.getAttacks = function () {
  return attacks;
};

this.getShortHtmlAttack = function (atkType, armType, name) {
  let unitAtk = attacks[atkType];

  if (!unitAtk)
    return '';

  let armDmg = arms[armType] ? arms[armType].getStrDmg() : null;

  let str = name + ': ' + ((armDmg != null) ? armDmg : '');

  let extra = [];

  let nb = (unitAtk != null) ? unitAtk : 1;

  if (nb)
    extra.push('total: ' + unitAtk.getStrTotalDmg());

  let abilities = unitAtk.getStrShortAbilities();

  if (abilities)
    extra.push(abilities);

  if (extra)
    str += ' (' + extra.join(', ') + ')';

  return str;
};

this.getHtmlComment = function () {
  if (!data.comment)
    return '';

  let html = '<br>'
    + '<div class="comment">'
    +   data.comment
    + '</div>';

  return html;
};

this.getShortHtml = function () {
  let atks = [
    { name: 'appear', display: 'Appear' },
    { name: 'moving', display: 'Moving' },
    { name: 'near', n: 'n', display: 'Near'},
    { name: 'far', n: 'f', display: 'Far'},
    { name: 'spe', n: 's', display: 'Spe'},
    { name: 'counter', display: 'Counter' },
    { name: 'evade', display: 'Evade' },
    { name: 'air', display: 'Anti-Air' },
    { name: 'final', n: 'y', display: 'Final' },
  ];

  let atkHtml = atks
    .filter(e => attacks[e.name])
    .map(e => ' / ' + this.getShortHtmlAttack(e.name, e.n, e.display))
    .reduce((res, val) => res + val);

  let comHtml = this.getHtmlComment();

  let html =
      '<div class="unit">'
    +   '<div class="name">#' + this.getId() + ' ' + this.getName() + '</div>'
    +   '<div class="stat">'
    +     'AP: ' + this.getStrAp()
    +     ' / HP: ' + this.getStrHp()
    +     ' / Prod: ' + this.getStrProdSecond() + 's'
    +     ' / Mov: ' + this.getStrMov()
    +     atkHtml
    /*+     (nearHtml.length ? (' / ' + nearHtml) : '')
    +     (farHtml.length ? (' / ' + farHtml) : '')
    +     (speHtml.length ? (' / ' + speHtml) : '')*/
    +   '</div>'
    +   comHtml
    + '</div><br>';

  return html;
};

};