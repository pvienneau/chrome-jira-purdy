/*
 * BACKLOG
 */

import debounce from 'lodash.debounce';

let $gh;
let $ghIssues;
const DOMLabelSelector = '.ghx-extra-field[data-tooltip^="Labels"]';

function buildLabels() {
    const $this = $(this);
    const $labels = $(DOMLabelSelector, $this);
    const $ghxSummary = $('.ghx-summary', $this);

    $('.ghx-summary-aui-label', $this).remove();
    $labels.hide();

    if ($('.ghx-extra-field', $this).hasClass('ghx-fa')) return false;

    $labels
        .text()
        .split(',')
        .map((label) => {
            $('<span class="aui-label ghx-summary-aui-label"></span>')
                .text(label.trim().toLowerCase())
                .insertBefore($ghxSummary);
        });
}

function prettifyBacklog() {
    const $this = $(this);

    $('.ghx-backlog-card:not(.purdy-dirty)', $this).each(function() {
        //console.error('found card');
        const $this = $(this);

        $this.one('DOMSubtreeModified', e => e.stopPropagation());

        setTimeout(() => {
            $this
                .addClass('purdy-dirty')
                .find(DOMLabelSelector)
                .on('DOMSubtreeModified', debounce(buildLabels.bind($this), 250));

            buildLabels.call($this);
        });
    });
};

function listenGhIssuesCreate() {
    const $issues = $('.ghx-issues');

    if ($issues.length >= 2) {
        console.log($issues.length);
        $ghIssues = $issues;
        $gh.off('DOMSubtreeModified');

        $ghIssues.on('DOMSubtreeModified', debounce(prettifyBacklog, 250));
        prettifyBacklog.call($ghIssues);
    }
}

$(document).ready(() => {
    $gh = $('#gh')
    $gh.on('DOMSubtreeModified', listenGhIssuesCreate);
});
