function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function' ){
		window.onload = func
	} else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


function addClass(element,value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += "";
		newClassName += value;
		element.className = newClassName;
	}
}


/*
	内部导航效果的实现
 */
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id")!=id){
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0 ) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId =	links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function () {
			showSection(this.destination);
			return false;
		}
	}
}

addLoadEvent(prepareInternalnav);


/*
photos页面的占位图片
 */
function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return true;
	var soutce = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",soutce);
	if(!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");	
	} else {
		var text = " ";
	}

	var description = document.getElementById("description");
	if(description.firstChild.nodeType == 3){
		description.firstChild.nodeValue = text;
	}
	return false;
}

function prearePlaceholder() {
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","../images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");

	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery  = document.getElementById("imagegallery");
	insertAfter(description, gallery);
	insertAfter(placeholder,description);

}

function prepareGallery() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery  = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function () {
			return showPic(this);
		}
	}
}

addLoadEvent(prearePlaceholder);
addLoadEvent(prepareGallery);