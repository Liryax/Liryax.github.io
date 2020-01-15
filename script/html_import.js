function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


function importHTML(name){
	var div = document.getElementById(name+"_import")
	if(div){
		div.innerHTML = loadFile("tmp/"+name+".html")
		var jsFile = loadFile("script/"+name+".js")
		if(jsFile){
			var scriptTag = document.createElement("script")
			scriptTag.innerHTML = jsFile
			document.head.appendChild(scriptTag)
		}
	}
}
