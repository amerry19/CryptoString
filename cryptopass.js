$("#input").keyup(function (event) {
  if (event.keyCode === 13) {
      var $inputValue = $(this).val();
      var hash = CryptoJS.SHA3($inputValue, { outputLength: 512 }).toString();
      var middle = Math.floor(hash.length / 4);
      var shortHash = hash.substr(0, middle);
      window.top.prompt("Encrypted!" + "\n\n" + "Copy to clipboard: Ctrl+C, Enter", shortHash);
    }   
});