// magic tag
function toggle_magic(context, l, r, if_first)
{
	var range = ":lt(" + r.toString() + "):gt(" + (l-1).toString() + ")";
	context.find(".gutter").find(".line" + range).toggle();
	context.find(".gutter").find("br" + range).toggle();
	context.find(".code").find(".line" + range).toggle();
	context.find(".code").find("br" + range).toggle();
	var fir = ":eq(" + (l-1).toString() + ")";
	
	var a = context.find(".gutter").find(".line" + fir);
	var b = context.find(".code").find(".line" + fir);
	//a.toggleClass("with-magic");
	b.toggleClass("magic-on");
	
	var a_t = a.text(); var b_h = b.html();
	var hint = "<span class='comment'> /* click to expand */</span>";
	var hint2 = "<span class='comment'> /* click to hide */</span>";
	if(a_t == "..")
	{
		a.text(l.toString());
		//alert(b_h);
		//alert(b_h.substr(0, b_h.length-hint.length));
		b.html(b_h.substr(0, b_h.length-hint.length) + hint2);
		
	}
	else
	{
		a.text("..");
		if(if_first) b.html(b_h + hint);
		else b.html(b_h.substr(0, b_h.length-hint2.length) + hint);
	}
}

function enable_magic(id, l, r)
{
	var filter = ":eq(" + (l-1).toString() + ")";
	$(document).ready(function(){
		toggle_magic($(id), l, r, true);
		var a = $(id).find(".gutter").find(".line" + filter),
			b = $(id).find(".code").find(".line" + filter);
		a.click(function(){toggle_magic($(id), l, r, false);});
		a.toggleClass("with-magic");
		b.click(function(){toggle_magic($(id), l, r, false);});
		b.toggleClass("with-magic");
	});
}

// myfold tag
$(document).ready(function(){
    $(document).on('click', '.fold_hider', function(){
        $('>.fold', this.parentNode).slideToggle();
        $('>:first', this).toggleClass('open');
    });
    //默认情况下折叠
    $("div.fold").css("display","none");
});


function enable_foldall()
{
	$(document).ready(function(){
		var element1 = "<span class='line special-line'>..</span>";
		var element2 = "<span class='line special-line'><span class='meta'>\"\"\"click me (or caption above) to view the code :D\"\"\"</span></span>";
		$('.fold-code .gutter>pre').append(element1);
		$('.fold-code .code>pre').append(element2);
		// alert('hello');

		$(document).on('click', '.fold-code figcaption', function(){
			$('pre>*', this.parentNode).toggle();
			// $('br', this.parentNode).slideToggle();
			// $('.code .line', this.parentNode).slideToggle();
		});
		$(document).on('click', '.fold-code .special-line', function(){
			$('figure pre>*', $(this).parent().closest('.fold-code')).toggle();
		});
		$(".fold-code .special-line").css("display","none");
		$('.fold-code pre>*').toggle();
	});
};

$(document).on('pjax:end', function(){
	alert('trigger pjax:end');
});
