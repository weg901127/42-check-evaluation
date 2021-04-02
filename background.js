function validateCheck(arr) {
	let newArr = arr.slice()
	if (newArr.includes(undefined)) {
		let idx = newArr.findIndex(el => el === undefined);
		newArr = newArr.slice(idx);
		if (newArr.includes(true)) return false;
	}
	return true;
}

function checkres() {
  var bodyHTML = document.querySelector("body");
  var amount = bodyHTML.innerHTML.match(new RegExp('scale-question-answers','gi')).length;
  var arr = new Array(amount);

	for(var i = 0 ; i < amount ; i++)
	{
		var k = document.getElementsByName('[scale_team][answers_attributes]['+i+'][value]');
		k.forEach((node) => {
			if(node.checked && node.id.match(new RegExp('true'))){
				arr[i] = true;
			}
		})
	}

	if (validateCheck(arr)) {
		arr = arr.filter(function (n){
			return n == true;
		});
		document.getElementsByClassName('btn btn-primary btn-block font-weight-bold')[0].value = "You checked " + arr.length + " of " + amount + " ,right?";
	} else {
		document.getElementsByClassName('btn btn-primary btn-block font-weight-bold')[0].value = "You cannot mark as correct after the wrong question.";
	}
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: checkres
  });
});
