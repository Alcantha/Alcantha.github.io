'use strict';

const SMALL_ICON = '0';
const MEDIUM_ICON = '1';
const LARGE_ICON = '2';

const getCssBgPositionY = function (offset) {
  return `calc(var(--icon-height) * -${offset})`;
};

const toggleIconSize = function (element, iconSize) {
  const toggleMediumIcon = (iconSize === MEDIUM_ICON);
  const toggleLargeIcon = (iconSize === LARGE_ICON);

  element.classList.toggle('medium', toggleMediumIcon);
  element.classList.toggle('large', toggleLargeIcon);
};

const getListPath = function (event) {
  return event.path || (event.composedPath && event.composedPath()) || [];
};

export {
  SMALL_ICON,
  MEDIUM_ICON,
  LARGE_ICON,
  getCssBgPositionY,
  toggleIconSize,
  getListPath,
};