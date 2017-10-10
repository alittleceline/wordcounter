/* Celine Coelho
 * 2017 Front End technical excercise */
// Reusable selectors
const form = document.querySelector('.count-words-form');
const resultListing = document.querySelector('.count-display-list');
const resultSection = document.querySelector('.count-display-block');
const alertElement = form.querySelector('.alert');

form.addEventListener('submit',  countWordOccurrences);

function countWordOccurrences(e) {
    // Stop form behavior
    e.preventDefault();

    //If result block is displayed, hide it
    resultListing.innerHTML = "";

    //If alert block is displayed, hide it
    alertElement.classList.add('d-none');

    //Get text from textarea
    const myText = document.querySelector('.count-words-textfield').value;

    // Put all 3+ letter words from myText into an array
    const myRegEx = /[\wéèêëàâäîïôöûüç]{3,}/g;
    const myTextLowerCase = myText.toLowerCase();
    const wordsArray = myTextLowerCase.match(myRegEx);

    // Create the final array of objects that will take values from initial word array
    const wordsCount = [];

    // If initial word array is truthy, loop into it
    if(wordsArray) {
        wordsArray.forEach(function(myWord){

            // If my final array is empty, create the first element
            if (wordsCount.length < 1) {
                const firstLineToPush = {
                    word : myWord,
                    counter : 1
                };
                wordsCount.push(firstLineToPush);

            } else {
            // If my final array already has elements (words) check if the current one exists
                const existingWord = wordsCount.find(function(item, index, array){
                    return (item.word === myWord)
                });
                // If is does, increment its counter
                if (existingWord) {
                    existingWord.counter = existingWord.counter + 1;
                } else {
                // If is doesn't, add it to the word list
                    const lineToPush = {
                        word : myWord,
                        counter : 1
                    };
                    wordsCount.push(lineToPush);
                }
            }
        });
    } else {
        //If the texterea is empty when the form is submited, display alert
        alertElement.classList.remove('d-none');
        return;
    }

// When the final list is complete, display the
displayWordCount(wordsCount);
}



function displayWordCount(wordList) {
    resultSection.classList.remove('d-none');
    wordList.forEach(function(item, index){
        const lineToInsert = `<li class="list-group-item"><span>${item.word}</span> ${item.counter} ${item.counter > 1 ? 'times' : 'time'}</li>`;
        resultListing.insertAdjacentHTML('beforeend', lineToInsert);
    });
}