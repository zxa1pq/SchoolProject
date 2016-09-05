/// <reference path="~/js/jquery.js"/>
/// <reference path="jquery.cookie.js"/>

(function () {
    "use strict";

    var $notificationElem = $('<div id="cookie-notification">' +
                                  '<div class="page-wrap container">' +
                                      '<div class="row">' +
                                          '<div class="col-md-10">' +
                                              '<p>' +
                                                  '<i class="fa fa-fw fa-lg fa-info-circle text-info"></i>' +
                                                  'Vi anvender cookies til teknisk funktionalitet, webstatistik og for at forbedre brugervenligheden. Når du benytter vores website, giver du samtykke til anvendelsen af cookies. Læs mere om cookies og hvordan de fjernes ' +
                                                  '<a id="cookie-notification-description-link" href="' + cbx.config.cookieNotificationLink + '" target="_blank">' +
                                                      'her.' +
                                                  '</a>' +
                                              '</p>' +
                                          '</div>' +
                                          '<div class="col-md-2">' +
                                              '<a id="cookie-notification-close-link" class="btn btn-primary pull-right" href="#">' +
                                                  'Ok' +
                                              '</a>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>');

    // cookies haven't been accepted
    if ($.cookie('cbx_cookies_accepted') !== '1') {

        // first time display?
        if ($.cookie('cbx_cookies_accepted') !== '0') {
            // display notification with animation
            setTimeout(function () {
                $($notificationElem).appendTo('body').css({ 'left': 0, 'margin-bottom': -$notificationElem.outerHeight() + 'px' }).animate({ 'margin-bottom': '0' }, 500);
            }, 500);
        } else {
            // display notification without animation
            $($notificationElem).appendTo('body').css('left', 0);
        }

        // store acceptance value: default to not accepted
        $.cookie('cbx_cookies_accepted', '0', { expires: 365, path: '/' });

        $('body').on('click', '#cookie-notification-close-link', function (e) {
            // store acceptance value: accepted
            $.cookie('cbx_cookies_accepted', '1', { expires: 365, path: '/' });
            // destroy notification with animation
            $notificationElem.animate({ 'margin-bottom': -$notificationElem.outerHeight() + 'px' }, 200, function () {
                $notificationElem.remove();
            });
            e.preventDefault();
        });
    }

})();
