(function ($) {

    var methods = {
        init: function (options) {
            return this.each(function () {
                renderelements($(this));
                $(this).parent().find('span').bind('click', (function (event) {
                    event.stopPropagation();
                    if ($(this).data("disabled") != true) {
                        $('.fancyselect ul').hide();
                        $(event.currentTarget.parentElement).find('ul').slideToggle('fast');
                    }
                }));

                var fancySelect = $(this).parent();
                $('html').bind('click.fancyselect', function () {
                    fancySelect.find('ul:visible').hide();
                });
            });
        },
        addItem: function (text, value) {
            return this.each(function () {
                var len = $(this.parentElement).find("li").length;
                if (len == 0) {
                    $(this.parentElement).find("ul").append($('<li>' + text + '</li>').data("val", value).click(specialSelectClicked));
                    $(this.parentElement).find('span').html(text);
                    $(this.parentElement).find('input').val(value);
                }
                else {
                    $(this.parentElement).find("ul").append($('<li>' + text + '</li>').data("val", value).click(specialSelectClicked));
                }
            });
        },
        clearItems: function () {
            return this.each(function () {
                if ($(this.parentElement).find("ul li").length > 0) {
                    $(this.parentElement).find("ul").empty();
                    $(this.parentElement).find("span").html("");
                    $(this).val('');
                    //$(this).change();
                }
            });
        },
        disabled: function (isDisabled) {
            return this.each(function () {
                $(this.parentElement).find("span").data("disabled", isDisabled);
            });
        },
        change: function (inputFunction) {
            return this.each(function () {
                $(this).bind('change', inputFunction);
            });
        },
        selectIndex: function (index) {
            return this.each(function () {
                var li = $($(this.parentElement).find("ul li")[index]);
                $(this.parentElement).find('span').html(li.html());
                $(this.parentElement).find('input').val(li.data('val'));
            });
        },
        selectValue: function (value) {
            return this.each(function () {
                var li = $(this.parentElement).find("ul li");
                $.each(li, function (index, item) {
                    if ($(item).data('val') == value) {
                        $(this.parentElement.parentElement).find('span').html($(item).html());
                        $(this.parentElement.parentElement).find('input').val(value);
                    }
                });

            });
        }
    };

    $.fn.specialSelectDropDown = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };

    function renderelements(select) {
        var div = $('<div />');
        div.attr({
            'class': "fancyselect",
            'style': select.attr("style")
        });
        div = select.wrap(div).parent("div");
        div.append(select);
        div.append('<span></span>');
        div.append($('<ul></ul>').css("min-width", div.css("width")));
        select.hide();
    }

    function specialSelectClicked(event) {
        var divSelect = $(event.currentTarget.parentElement.parentElement)
        divSelect.find('ul').slideToggle({
            duration: 'fast', complete: function () {
                var li = $(event.currentTarget);
                divSelect.find('span').html(li.html());
                divSelect.find('input').val(li.data('val'));
                divSelect.find('input').change();
            }
        });
    }

})(jQuery);