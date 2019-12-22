'use strict';

// ID

const ID_NOT_FOUND = '-1';
const ID_NONE = '0';

// Form

const FORM_NONE = '';
const FORM_NORMAL = '0';
const FORM_EVOLVED = '1';
const FORM_TRUE_FORM = '2';
const DEFAULT_FORM = FORM_NORMAL;

const LIST_FORM = [
  FORM_NORMAL,
  FORM_EVOLVED,
  FORM_TRUE_FORM,
];

// Rarity

const RARITY_NORMAL = 1;
const RARITY_EX = 2;
const RARITY_RARE = 3;
const RARITY_SR = 4;
const RARITY_UBER = 5;
const RARITY_LEGEND = 6;

const LIST_RARITY = [
  RARITY_NORMAL,
  RARITY_EX,
  RARITY_RARE,
  RARITY_SR,
  RARITY_UBER,
  RARITY_LEGEND,
];

// Boost

const DEFAULT_BOOST = 1;

export {
  // ID
  ID_NOT_FOUND,
  ID_NONE,

  // Form
  FORM_NONE,
  FORM_NORMAL,
  FORM_EVOLVED,
  FORM_TRUE_FORM,
  DEFAULT_FORM,
  LIST_FORM,

  // Rarity
  RARITY_NORMAL,
  RARITY_EX,
  RARITY_RARE,
  RARITY_SR,
  RARITY_UBER,
  RARITY_LEGEND,
  LIST_RARITY,

  // Boost
  DEFAULT_BOOST,
};