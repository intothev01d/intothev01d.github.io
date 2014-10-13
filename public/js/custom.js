$(function () {
  $('.icons a').hover(toggleAnimate, toggleAnimate);
});

function toggleAnimate(el) {
  $(el.target).toggleClass('animated pulse');
}
