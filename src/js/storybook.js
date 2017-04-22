/*
 * RAPID BOARD
 */

const prettifyTaskEstimates = () => {
	$('.ghx-subtask-group .ghx-issue:not(.purdy-dirty)').each(() => {
		const $this = $(this);

		$this.addClass('purdy-dirty');

		const taskEstimate = $('.ghx-extra-field:not(.ghx-fa)', $this).first();

		if(!taskEstimate.length) return;

		$('<aui-badge class="ghx-estimate" />')
  		  	.attr('data-tooltip', taskEstimate.attr('data-field'))
  		  	.text($('.ghx-extra-field-content', taskEstimate).text())
  		  	.insertAfter($('.ghx-stat-fields .ghx-stat-1 .ghx-field', $this).eq(1));
  	  	taskEstimate.remove();
	});
};

$(document).ready(() => $('#gh').on('DOMSubtreeModified', prettifyTaskEstimates));
