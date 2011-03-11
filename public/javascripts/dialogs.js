$(document).ready(function(){
});
function openDialog(elem,url,title){
	elem.dialog({
		modal:true,
		title:title,
		buttons:{
			"Ok":function(){
				if($('form.formtastic').valid()){
					$.post($('form.formtastic').attr('action'),$('form.formtastic').serialize())
					.success(function(){elem.dialog('close');window.location.reload();})
					.error(function(){alert('error');})
				}
			},
			"Avbryt":function(){
				elem.dialog('close');
			}


		}
	});

	$.ajax({
		url:url,
		dataType:'text',
		processData:false,
		success:function(data){
			elem.html(data);
			elem.dialog("open");
			validateForm();
		},
		error:function(msg,type){
			alert(msg+', '+type);
		}

	});
/*	elem.load(url, function(){
		  elem.dialog("open");
	});
*/
	return false;
}
function validateForm(){
	$.validator.setDefaults({
		/*submitHandler:function(){
			alert("Submitted");
			return true;
		},*/
		highlight: function(input) {
			$(input).addClass("ui-state-error");
			//$(input).addClass("ui-state-highlight");
		},
		unhighlight: function(input) {
			$(input).removeClass("ui-state-error");
			//$(input).removeClass("ui-state-highlight");
		}
	});
	return $('form.formtastic').validate({
		rules: {
			'contact[firstname]': {
				required: true,
				minlength: 2
			},
			'contact[lastname]': {
				required: true,
				minlength: 2
			}
		},
		messages: {
			'contact[firstname]': {
				required: "Skriv in Förnamn",
				minlength: "Förnamnet skall vara mer än 2 bokstäver"
			},
			'contact[lastname]': {
				required: "Skriv in efternamn",
				minlength: "Efternamnet skall vara mer än 2 bokstäver"
			}
		}
	});
}