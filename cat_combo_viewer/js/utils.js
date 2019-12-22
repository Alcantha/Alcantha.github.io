'use strict';

const SMALL_ICON = '0';
const MEDIUM_ICON = '1';
const LARGE_ICON = '2';

const getCssBgPositionY = function (id) {
  return `calc(var(--icon-height) * -${id - 1})`;
};

const toggleIconSize = function ($element, iconSize) {
  const toggleMediumIcon = (iconSize === MEDIUM_ICON);
  const toggleLargeIcon = (iconSize === LARGE_ICON);

  $element.toggleClass('medium', toggleMediumIcon);
  $element.toggleClass('large', toggleLargeIcon);
};

export {
  SMALL_ICON,
  MEDIUM_ICON,
  LARGE_ICON,
  getCssBgPositionY,
  toggleIconSize,
};