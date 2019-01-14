
function toggle_magic(context, l, r, if_first)
{
	var range = ":lt(" + r.toString() + "):gt(" + (l-1).toString() + ")";
	context.find(".gutter").find(".line" + range).toggle();
	context.find(".gutter").find("br" + range).toggle();
	context.find(".code").find(".line" + range).toggle();
	context.find(".code").find("br" + range).toggle();
	var fir = ":eq(" + (l-1).toString() + ")";
	
	var a = context.find(".gutter").find(".line" + fir);
	var b = context.find(".code").find(".line" + fir)
	//a.toggleClass("with-magic");
	b.toggleClass("with-magic");
	
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
		$(id).find(".gutter").find(".line" + filter).click(function(){
			toggle_magic($(id), l, r, false);
		});
		$(id).find(".code").find(".line" + filter).click(function(){
			toggle_magic($(id), l, r, false);
		});
	});
}
