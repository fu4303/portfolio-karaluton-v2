import $ from 'wee-dom';
import $events from 'wee-events';
import { tween } from 'shifty';
import { _win, _body } from 'core/variables';
import { $nav, $aboutMe } from './elements';
import { active } from '../../scripts/classes';
import { RouteHandler } from 'wee-routes';
import { scrollToAnchor } from '../../scripts/helpers';

const $win = $(_win);
const $body = $(_body);

function fixNav() {
    let topOfNav = $nav.offset().top;

    $events.on($win, 'scroll.fixnav', () => {
        if ($win.scrollTop() >= topOfNav) {
            $aboutMe.css('padding-top', $nav.height() + 'px');
            $nav.addClass(active);
        } else {
            $aboutMe.css('padding-top', 0);
            $nav.removeClass(active);
        }
    });
}

function smoothScroll() {
    $events.on('.js-anchor', 'click', (e, el) => {
        scrollToAnchor($(el).attr('href'));

        e.preventDefault();
    });
}

export default new RouteHandler({
    init() {
        fixNav();
        smoothScroll();
    },
    unload: 'fixnav'
});