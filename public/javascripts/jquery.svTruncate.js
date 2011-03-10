/*
	jQuery svTruncate plugin v 1.0.0
	Licenced under the MIT License	
	Copyright (c) 2009 
		Sergey Vasilianskiy <svdelphi@list.ru>
	
	svTruncate is a customizable jQuery plugin for the smart truncation of text and HTML!!!

	Basic usage:
		$.svTruncate({maxTextLen: 100});
		
*/ 
(function($) {
	$.fn.svTruncate = function(setOptions) {
		// если задано удаление - убираем svTruncate
		if (typeof setOptions == 'string')  {
			return this.each(function() {
				var obj = $(this);
				if ( (obj.data('svTruncateState') == 'show') || (obj.data('svTruncateState') == 'hidden') ) {
					switch (setOptions) {
						case "unTruncate"	  : obj.data('svTruncateState', '')
													.html(obj.data('htmlJAll') || '')
													.data('htmlJAll', '')
													.data('htmlJShort', '');
												break;
					};
				};
			});
		};
		
		var defaults = {
			maxTextLen: 200,
			maxBlankSearchLen: 20,
			maxBRLen: 3,
			moreText: "more",
			lessText: "less",
			moreHint: 'Show hidden text',
			lessHint: 'Hide long text'
		};

		var options = $.extend(defaults, setOptions);
		
		var moreLinkClick = function(obj) {
			var $truncateA = $('<a href="#" class="truncate_more_link" title=""><span> <</span></a>');
			if ((obj.data('svTruncateState') || '') == 'hidden') {
				obj.data('svTruncateState', 'show')
					.html(obj.data('htmlJAll') || '')
					.append(
						$truncateA
							.attr('title', options.lessHint)
							.attr('alt', options.lessText)
					);
			}else{
				obj.data('svTruncateState', 'hidden')
					.html(obj.data('htmlJShort') || '')
					.append(
						$truncateA
							.attr('title', options.moreHint)
							.attr('alt', options.moreText)
					);
				$truncateA.find('span').html(' >');
			};
			$truncateA
				.bind('truncateToggle', function() {
					moreLinkClick(obj);
				})
				.bind('truncateShort', function() {
					obj.data('svTruncateState', 'show');
					moreLinkClick(obj);
					$('a.truncate_more_link', obj).show();
				})
				.bind('truncateAll', function() {
					obj.data('svTruncateState', 'hidden');
					moreLinkClick(obj);
					$('a.truncate_more_link', obj).hide();
				})
				.one('click', function() {
					$('a.truncate_more_link', obj).trigger('truncateToggle');
					return false;
				});
		};

		return this.each(function() {
			var obj = $(this);
			// сначала сохраняем html
			var pureHtml = String(obj.html());
			if (pureHtml.length > options.maxTextLen) {
				// продолжаем если > установленного значения
				var textCount = 0;
				var brCount = 0;
				var insObj = null;
				
				function svTruncateGetObject(parent, parentBR) {
					// если объект уже найден сохраняем объекты в массиве для удаления
					if (parent.hasChildNodes()) {
						var itemsToRemove = new Array();
						jQuery.each( parent.childNodes, function() {
							// если объект уже найден сохраняем объекты в массиве для удаления
							var child = this;
							if (insObj !== null) {
								itemsToRemove.push(this);
							}else{
								if (this.nodeType == 1) {
									var proceedChilds = true;
									var newParentBR = false;
									switch (this.nodeName.toUpperCase()) {
										case 'LINK'   :
										case 'META'   :
										case 'STYLE'  :
										case 'HEADER' : proceedChilds = false; break; // nothing 
										case 'BR'     : proceedChilds = false;
										case 'P'      :
										case 'H1'     :
										case 'H2'     :
										case 'H3'     :
										case 'H4'     :
										case 'H5'     :
										case 'H6'     :
										case 'HR'     :
										case 'TR'     :
										case 'TABLE'  :
										case 'OL'     :
										case 'UL'     :
										case 'DIV'    : newParentBR = true;
														if ((parentBR || false) !== true) {
															brCount++;
														}else{
															parentBR = false;
														};
														if (brCount > options.maxBRLen) { 
															insObj = this;
															proceedChilds = false;
														};
														break;
									};
									if (proceedChilds) {
										svTruncateGetObject(this, newParentBR);
									};
								}else{
									if ( this.nodeType != 8 ) {
										var text = String(this.nodeValue);
										var nodeValueLen = text.length;
										textCount += nodeValueLen;

										// далее проверяем на превышение макс количества символов
										if (textCount > options.maxTextLen) {
											// это была строка - режем ее
											nodeValueLen = (nodeValueLen - (textCount - options.maxTextLen));
											// желательно разрезать по пробелам
											var str2 = text.substring(nodeValueLen, text.length);
											var str2Len = str2.length, ch;
											// вырезаем начало строки
											text = text.substring(0, nodeValueLen);

											// еще + options.maxBlankSearchLen символов для поиска пробела
											for (var i = 0; i < options.maxBlankSearchLen; i++) {
												if (i < str2Len) {
													ch = str2.charAt(i);
													text += ch;
													if (ch == ' ') { break;	};
												}else{ break; };
											};
											this.nodeValue = text;
											insObj = this;
										};
									};
								};
							};
						});
						// удаляем все ненужные элементы
						jQuery.each( itemsToRemove, function() {
							if (typeof this.parentNode !== 'undefined') {
								this.parentNode.removeChild(this);
							};
						});
					};
				};
				
				// проходимся по объектам
				svTruncateGetObject(obj.get(0), false);
				
				// если нашли текст для trunkate, то нашли и объект
				if (insObj !== null) { 
					obj.hide() // stop flicking
						.data('htmlJAll', pureHtml)
						.data('htmlJShort', String(obj.html()))
						.data('svTruncateState', '');
						
					// добавляем truncate
					moreLinkClick(obj);
					obj.show();
				};
			};
		});
	};
})(jQuery);