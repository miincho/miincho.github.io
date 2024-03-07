let data = [
    //[keyword, question, answer]
    ['color', 'whats your favorite color?', 'green'],
    ['scare', 'what scares you?', 'creaking doors terrify me'],
    ['day', 'describe your perfect day', 'the perfect day involves sunrise skydiving'],
    ['inspiration', 'where do you get inspiration?', 'baked bread, fireflies, and ancient tree groves']
];

// let input = prompt("ask me a question"); 
class Bot {
    constructor() {
        //separate each data value in its own array
        this.keywords = data.map(entry => entry[0]);
        this.questions = data.map(entry => entry[1]);
        this.answers = data.map(entry => entry[2]);
    }
    search(x) {
        //callback to find if input includes keyword
        let foundKeyword = this.keywords.find(keyword=>x.includes(keyword));

        if (foundKeyword) {
            //match index of keyword to index of answer
            let keywordIndex = this.keywords.indexOf(foundKeyword);
            return this.answers[keywordIndex];
        } else {
            return `sorry, I don't know`;
        }
    }
}
const questionBot = new Bot();
// console.log(questionBot.search(input));


const form = document.forms.quest;
const output = document.getElementById('output');
const topic1 = document.getElementById('topicOne');
const topic2 = document.getElementById('topicTwo');
const topic3 = document.getElementById('topicThree');
const topic4 = document.getElementById('topicFour');
const input = document.getElementById('myInput');

form.addEventListener("submit", function(){
    const textValue = document.getElementById('myInput').value;
    if(textValue !== ""){
        const result = questionBot.search(textValue);
        output.innerHTML = `<p>${result}</p>`;  
        output.style.border = "2px solid #FB8469";
        output.style.fontSize = "0.9em";
        output.style.padding = "25px" 
    }
    else{
        output.innerHTML = `<p> Please ask a question :[ </p>`;
    }
});

topic1.addEventListener("click", function(){
    input.value = `Describe your perfect day.`;
    output.innerHTML = '';
});

topic2.addEventListener("click", function(){
    input.value = `Where do you get inspiration?`;
    output.innerHTML = '';
});

topic3.addEventListener("click", function(){
    input.value = `What's your favorite color?`;
    output.innerHTML = '';
});

topic4.addEventListener("click", function(){
    input.value = `What scares you?`;
    output.innerHTML = '';
});


