$("#textToggle").click(function (event) {
	CloakText();
});

function Hash(){
	$("#input").keyup(function (event) {
	  if (event.keyCode === 13) {
	      var $inputValue = $(this).val();
	      var $output = $("#output");
	      if ($inputValue.length < 1){
	      	ToggleResult(false);
	      } else {
	        var hash = CryptoJS.SHA3($inputValue, { outputLength: 512 }).toString();
	        var middle = Math.floor(hash.length / 4);
	        var shortHash = hash.substr(0, middle);
	        
	        ToggleResult(true);
	        $output.prepend(shortHash);
	        SelectText("output");
	      }
	    }   
	});
}
Hash();

function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function CloakText() {
  var checked = $("#textToggle:checked").length;
  var text = $("#input").val();
  if (checked === 1) {
  	var type = "password";
  	ReplaceInput(text, type);
  }else{
  	var type = "text";
  	ReplaceInput(text, type);
  }
  // Reassign focus to input
  $("#input").focus();
  // Move cursor to end of string after refocusing
  $("#input").val($("#input").val());
};
CloakText();

function ToggleResult(flag) {
	var $result = $(".result");
	$("#output").empty();
	flag ? $result.show() : $result.hide();
}

function ReplaceInput(text, typeVal) {
	var element = "<input id=\"input\" autofocus size=\"50\" type=\"" + typeVal + "\" value=\"" + text + "\" />";
	$("#input").remove();
	$("#inputPlaceholder").append(element);
	Hash();
}

setTimeout(function() {
    $("#input").focus();
}, 350);