export default function ContactScroll(el) {
  function checkScroll() {
    if (el.getBoundingClientRect().top <= window.innerHeight - 200) {
      $(el).addClass('scrolled-in');
      $(window).off('scroll', checkScroll);
    }
  }

  $(window).on('scroll', checkScroll).scroll();
}
