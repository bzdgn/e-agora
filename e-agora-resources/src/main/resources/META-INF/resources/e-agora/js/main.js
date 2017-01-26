"use strict";

var $headers = $("#headers");
var $mainWindow = $("#main-window");
var $mainPage = $("#main-page");


prepareMainPage();

$mainPage.on("click", function() {
	prepareWelcomeMainWindow();
	registerHeaderListClass();
});


function prepareMainPage() {
	prepareHeaders();
	prepareWelcomeMainWindow();
	registerHeaderListClass();
}

function registerHeaderListClass() {
	var $headerList = $(".header");
	$headerList.on("click", function() {
		var header = this.innerText;
		updateMainWindow(header);
	});
}

function prepareHeaders() {
	clearHeaderList();
	$(headers).each(function(index) {
		$headers.append("<p class=\"header\" >" + headers[index] + "</p>");
	});
}

function updateMainWindow(header) {
	clearMainWindow();
	
	for(var e in entries) {
		if(entries[e].header === header) {
			appendEntryMainWindow(header, entries[e].content);
		}
	}
}

function notFoundMainWindow(header) {
	clearMainWindow();
	
	$mainWindow.append("<h3>" + header + "</h3>");
	$mainWindow.append("<p> Yok boyle birsey !</p>");
	$mainWindow.append("<hr>");
}

function clearMainWindow() {
	$mainWindow.empty();
}

function clearHeaderList() {
	$headers.empty();
}

function prepareWelcomeMainWindow() {
	clearMainWindow();
	for(var e in entries) {
		appendEntryMainWindow(entries[e].header, entries[e].content);
	}
}

function appendEntryMainWindow(header, entry) {
	$mainWindow.append("<h3>" + header + "</h3>");
	$mainWindow.append("<p>" + entry + "</p>");
	$mainWindow.append("<hr>");
}

// search
var $search = $("#search-box");

// no need! FOR TEST ONLY
// http://stackoverflow.com/a/12518467/3128926
$search.keypress(function(e) {
	if(e.which == 13) {
		e.preventDefault();
		e.stopPropagation();
		handleSearch();
		return false;
	}
});

// default behaviour ! FOR PRODUCTION
//var $searchForm = $("#search-form");
//
//$searchForm.submit(function(e) {
//	handleSearch();
//	e.preventDefault();
//});

function handleSearch() {
	var header = $search.val();
	var count = findHeader(header);
	if(count > 0) {
		updateMainWindow(header)
	} else {
		$search.trigger( "focusout" );
		notFoundMainWindow(header);
	}
}

function applySearchHeader(header, count) {
	clearHeaderList();
	$headers.append("<p class=\"header\" >" + header + "</p>");
}

function findHeader(header) {
	var count = 0;
	
	for(var e in entries) {
		if(entries[e].header === header) {
			count++;
		}
	}
	
	return count;
}
