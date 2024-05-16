


// import * as Tone from "tone";
// import $ from 'jquery';
// import $ from 'jquery';


//option divs
const wordCol = document.getElementById("wordCol");
const quotesCol = document.getElementById("quotesCol");
const howToCol = document.getElementById("howTo");
const whyCol = document.getElementById("why");
const firstOptions = document.getElementById("firstOptions");

//initial sort buttons
const whisperbtn = document.getElementById("whisper");
const spitbtn = document.getElementById("spit");
const reflectbtn = document.getElementById("reflect");
const wonderbtn = document.getElementById("wonder");

//columns
const topOne = document.getElementById("topOne");
const topTwo = document.getElementById("topTwo");
const topThree = document.getElementById("topThree");
const topFour = document.getElementById("topFour");
const topFive = document.getElementById("topFive");
const topSix = document.getElementById("topSix");
const etc = document.getElementById("etc");

topTwo.style.display = "none";
topThree.style.display = "none";
topFour.style.display = "none";
topFive.style.display = "none";
topSix.style.display = "none";
etc.style.display = "none";

function showElementsWithDelay(elements, delay) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.display = 'block';
        }, index * delay);
    });
}
// const wordModules = [];
const whisperModules = [];
const spitModules = [];
const reflectModules = [];
const wonderModules = [];

fetch('data.json')
    .then(response => response.json())
    .then((list) => {
        list.forEach(item =>{
            const wordModule = document.createElement('div');
            const word = item.word;
            const definition = item.definition;
            // wordModules.push(wordModule);
            console.log(typeof wordModule);


            // "quotes" data
            const authorDivs = [];
            item.quotes.forEach(element => {
                const author = element.author;
                const source = element.source;
                const quote = element.quote;
            
                // Create divs for each piece of info
                const authorDiv = document.createElement('div');
                const sourceDiv = document.createElement('div');
                const quotesDiv = document.createElement('div');
            
                authorDiv.textContent = `${author}:`;
                sourceDiv.textContent = `${source}`;
                quotesDiv.textContent = `${quote}`;
            
                // Add classes for styling
                quotesDiv.classList.add("quote");
                authorDiv.classList.add("module");
                sourceDiv.classList.add("source");
            
                // Append everything to authorDiv
                authorDiv.appendChild(sourceDiv);
                authorDiv.appendChild(quotesDiv);
                quotesCol.appendChild(authorDiv);
            
                // Initially hide authorDiv
                authorDiv.style.display = "none";
            
                // Store reference to authorDiv in the array
                authorDivs.push(authorDiv);
            });


            //"how-to" data
            const titleDivsHow = [];
            item.howTo.forEach(element=>{
                const title = element.title;
                const desc = element.description;

                //making divs
                const titleDiv = document.createElement('div');
                const descDiv = document.createElement('div');

                let titleModule = document.createTextNode(`${title}`);
                let descModule = document.createTextNode(`${desc}`);

                //styling
                titleDiv.classList.add("module");
                descDiv.classList.add("quote");

                //appending
                titleDiv.appendChild(titleModule);
                descDiv.appendChild(descModule);
                titleDiv.appendChild(descDiv);
                howToCol.appendChild(titleDiv);

                //initially hide
                titleDiv.style.display = "none";

                // Store reference to titleDivsHow in the array
                titleDivsHow.push(titleDiv);

            });


            //"why" data
            const titleDivsWhy = [];
            item.purpose.forEach(element=>{
                const title = element.title;
                const desc = element.description;

                //making divs
                const titleDiv = document.createElement('div');
                const descDiv = document.createElement('div');

                let titleModule = document.createTextNode(`${title}`);
                let descModule = document.createTextNode(`${desc}`);

                //styling
                titleDiv.classList.add("module");
                descDiv.classList.add("quote");

                //appending
                titleDiv.appendChild(titleModule);
                descDiv.appendChild(descModule);
                titleDiv.appendChild(descDiv);
                whyCol.appendChild(titleDiv);

                //initially hide
                titleDiv.style.display = "none";

                // Store reference to titleDivsWhy in the array
                titleDivsWhy.push(titleDiv);
            });
            
                        // Add wordModule to the corresponding array based on item.type
                        switch (item.type) {
                            case "whisper":
                                whisperModules.push(wordModule);
                                break;
                            case "spit":
                                spitModules.push(wordModule);
                                break;
                            case "reflect":
                                reflectModules.push(wordModule);
                                break;
                            case "wonder":
                                wonderModules.push(wordModule);
                                break;
                            default:
                                break;
                        }


            wordModule.innerHTML = `
                <div class="module">
                    <div class="word">${word}</div>
                    <div class="define">${definition}</div>
                </div>`
            wordCol.appendChild(wordModule);

            //initially hide
            wordModule.style.display = "none";


            var volume = new Tone.Volume(-25); 
            var louder = new Tone.Volume(-10); 
            const synth = new Tone.Synth().chain(volume, Tone.Destination); 
            const louderSynth = new Tone.Synth().chain(louder, Tone.Destination); 


            function showElementsWithSound(elements, delay, pitchFunction) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        showElementsWithDelay([element], delay);
                        const pitch = pitchFunction(index); // Calculate pitch using the provided function
                        synth.triggerAttackRelease(pitch, "8n");
                    }, delay * index);
                });
            }
            
            function louderVolume(elements, delay, pitchFunction) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        showElementsWithDelay([element], delay);
                        const pitch = pitchFunction(index); // Calculate pitch using the provided function
                        louderSynth.triggerAttackRelease(pitch, "8n");
                    }, delay * index);
                });
            }

            function disableButton(parentDiv) {
                const children = parentDiv.children;
                for (let i = 0; i < children.length; i++) {
                  children[i].style.pointerEvents = 'none'; // Disable pointer events for each child div
                }            
            }

            //make the text of the button that wasnt clicked disappear
                function fadeOutOtherButtons(clickedButton) {
                    const buttons = [whisperbtn, spitbtn, reflectbtn, wonderbtn];
                    buttons.forEach(button => {
                        if (button !== clickedButton) {
                            button.style.color = 'rgba(0, 0, 0, 0)'; 
                        }
                    });
                }

            let selectedPitchFunction; // Variable to store the selected pitch function

            whisperbtn.addEventListener("click", () => {
                fadeOutOtherButtons(whisperbtn);
                disableButton(firstOptions);

                selectedPitchFunction = softPitch; // Store softPitch function
                showElementsWithSound(whisperModules, 150, selectedPitchFunction);

                topTwo.innerHTML = "TO BE WHISPERED";
                topTwo.style.display = "block"; 
                document.documentElement.style.setProperty('--main-bg-color', '#F2F2F2');
                document.documentElement.style.setProperty('--main-border-color', '#487AC4');
            });
            
            spitbtn.addEventListener("click", () => {
                fadeOutOtherButtons(spitbtn);
                disableButton(firstOptions);

                selectedPitchFunction = harshPitch; // Store softPitch function
                showElementsWithSound(whisperModules, 150, selectedPitchFunction);
                
                topTwo.innerHTML = "TO BE SPIT OUT";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#000000');
                document.documentElement.style.setProperty('--main-border-color', '#A48D8D');
            });
            
            reflectbtn.addEventListener("click", () => {
                fadeOutOtherButtons(reflectbtn);
                disableButton(firstOptions);

                selectedPitchFunction = randomPitch; // Store softPitch function
                showElementsWithSound(whisperModules, 150, selectedPitchFunction);
                
                topTwo.innerHTML = "TO BE REFLECTED ON";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#000000');
                document.documentElement.style.setProperty('--main-border-color', '#FF5959');
            });
            
            wonderbtn.addEventListener("click", () => {
                fadeOutOtherButtons(wonderbtn);
                disableButton(firstOptions);

                selectedPitchFunction = metalSynth; // Store softPitch function
                showElementsWithSound(whisperModules, 150, selectedPitchFunction);
                
                topTwo.innerHTML = "TO BE WONDERED";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#FFFFFF');
                document.documentElement.style.setProperty('--main-border-color', '#CB00AB');
            });
            

            function fadeOutOtherDivs(clickedDiv, divs) {
                divs.forEach(div => {
                    if (div !== clickedDiv) {
                        div.style.color = 'rgba(0, 0, 0, 0)'; // Make the text transparent
                    }
                });
            }

            // Filtering to associated quotes
            wordModule.addEventListener('click', () => {
                disableButton(wordCol);
                louderVolume(authorDivs, 150, selectedPitchFunction); // Use softPitch for whisperbtn

                switch (item.type) {
                    case "whisper":
                        hideOtherModules(whisperModules, wordModule);
                        break;
                    case "spit":
                        hideOtherModules(spitModules, wordModule);
                        break;
                    case "reflect":
                        hideOtherModules(reflectModules, wordModule);
                        break;
                    case "wonder":
                        hideOtherModules(wonderModules, wordModule);
                        break;
                    default:
                        break;
                }
                
                authorDivs.forEach(authorDiv => {
                    authorDiv.addEventListener('click', () => {
                        disableButton(quotesCol);
                        fadeOutOtherDivs(authorDiv, authorDivs);
                        louderVolume(titleDivsHow, 150,selectedPitchFunction);

                        titleDivsHow.forEach(titleDiv => {
                            titleDiv.addEventListener('click', () => {
                                disableButton(howToCol);
                                fadeOutOtherDivs(titleDiv, titleDivsHow);
                                louderVolume(titleDivsWhy, 150,selectedPitchFunction);

                                titleDivsWhy.forEach(whyDiv => {
                                    whyDiv.addEventListener('click', () => {
                                        disableButton(whyCol);
                                        fadeOutOtherDivs(whyDiv, titleDivsWhy);
                                        topSix.style.display = 'block';
                                        etc.style.display = 'block';
                                    });
                                });

                                topFive.style.display = 'block';
                            });
                        });

                        topFour.style.display = 'block';
                    });
                });

                topThree.style.display = 'block';
            });


        });
    });

    function hideOtherModules(moduleArray, clickedModule) {
        moduleArray.forEach(module => {
            if (module !== clickedModule) {
                // Find the text element within the module (assuming it's a direct child)
                const textElement = module.querySelector('.word'); 
                const defineElement = module.querySelector('.define'); 

                if (textElement && defineElement) {
                    textElement.style.opacity = '0'; // Hide the text content
                    defineElement.style.opacity ='0';
                }
            }
        });
    }
    

    function softPitch(index) {
        const baseNote = "D4";
        const semitoneOffset = index * 2; //increase by 2 semitones per note
        const pitch = Tone.Frequency(baseNote).transpose(semitoneOffset); //calculate pitch
        return pitch.toNote(); 
    }

    function harshPitch(index) {
        const baseNote = "D4"; 
        const semitoneOffset = -index * 2; 
        const pitch = Tone.Frequency(baseNote).transpose(semitoneOffset); 
        return pitch.toNote(); 
    }

    function randomPitch() {
        const baseNotes = ["C4", "E4","G4",];
        const randomNote = baseNotes[Math.floor(Math.random() * baseNotes.length)];
        const pitch = Tone.Frequency(randomNote);
        return pitch.toNote();
    }
    
    const amSynth = new Tone.AMSynth().toDestination();
    amSynth.volume.value = -20;
    
    function metalSynth(index) {
        const baseNote = "C4"; 
        const semitoneOffset = index * 2; 
        const pitch = Tone.Frequency(baseNote).transpose(semitoneOffset); 
            amSynth.triggerAttackRelease(pitch, "8n");
        return pitch.toNote();
    }
//end of first section






                // quotesModule.innerHTML=`
                // <div class="module">
                //     <div class="author">${author},</div>
                // </div>`


    //using for loop and innerhtml wouldnt work for showing up but changing it to textnode works?
            // for(let i=0;i<item.quotes.length;i++){
            //     const author = item.quotes[i].author;
            //     const source = item.quotes[i].source;
            //     const quote = item.quotes[i].quote;    
            //     console.log(author);
            //     quotesModule.innerHTML=`
            //     <div class="module">
            //         <div class="author">${author},</div>
            //         <div class="source">${source}</div>
            //         <div class="quote">${quote}</div>
            //     </div>`
            //     quotesCol.appendChild(quotesModule);
            // }


            ///initial formatting of quotes data but couldnt access author div in the wordmodule function
// //"quotes" data
// for(const element of item.quotes){
//     const author = element.author;
//     const source = element.source;
//     const quote = element.quote;
    
//     //create divs for each piece of info
//     const authorDiv = document.createElement('div');
//     const sourceDiv = document.createElement('div');
//     const quotesDiv = document.createElement('div');

//     let authorModule = document.createTextNode(`${author}:`);
//     let sourceModule = document.createTextNode(`${source}`);
//     let quoteModule = document.createTextNode(`${quote}`);

//     //add styling to the divs
//     quotesDiv.classList.add("quote");
//     authorDiv.classList.add("module");
//     sourceDiv.classList.add("source");

//     //append everything to quotesCol
//     sourceDiv.appendChild(sourceModule);
//     quotesDiv.appendChild(quoteModule);
//     authorDiv.appendChild(authorModule);
//     authorDiv.appendChild(sourceDiv);
//     authorDiv.appendChild(quotesDiv);
//     quotesCol.appendChild(authorDiv)

//     //initially hide
//     authorDiv.style.display = "none";

// }


            // //"how-to" data
            // for(const element of item.howTo){
            //     const title = element.title;
            //     const desc = element.description;

            //     //making divs
            //     const titleDiv = document.createElement('div');
            //     const descDiv = document.createElement('div');

            //     let titleModule = document.createTextNode(`${title}`);
            //     let descModule = document.createTextNode(`${desc}`);

            //     //styling
            //     titleDiv.classList.add("module");
            //     descDiv.classList.add("quote");

            //     //appending
            //     titleDiv.appendChild(titleModule);
            //     descDiv.appendChild(descModule);
            //     titleDiv.appendChild(descDiv);
            //     howToCol.appendChild(titleDiv);

            //     //initially hide
            //     titleDiv.style.display = "none";
            // }

            // //"why" data
            // for(const element of item.purpose){
            //     const title = element.title;
            //     const desc = element.description;

            //     //making divs
            //     const titleDiv = document.createElement('div');
            //     const descDiv = document.createElement('div');

            //     let titleModule = document.createTextNode(`${title}`);
            //     let descModule = document.createTextNode(`${desc}`);

            //     //styling
            //     titleDiv.classList.add("module");
            //     descDiv.classList.add("quote");

            //     //appending
            //     titleDiv.appendChild(titleModule);
            //     descDiv.appendChild(descModule);
            //     titleDiv.appendChild(descDiv);
            //     whyCol.appendChild(titleDiv);

            //     //initially hide
            //     titleDiv.style.display = "none";
            // }




            // make these into constructors???


            // Assuming you have your column containers defined like:
// const wordCol = document.getElementById('word-col');
// const quotesCol = document.getElementById('quotes-col');
// const howToCol = document.getElementById('how-to-col');
// const whyCol = document.getElementById('why-col');

// // Fetch data from JSON
// fetch('data.json')
//     .then(response => response.json())
//     .then(list => {
//         list.forEach(item => {
//             // Create word module
//             const wordModule = createWordModule(item.word, item.definition);
//             wordCol.appendChild(wordModule);

//             // Store references to related elements
//             const authorDivs = [];
//             const titleDivsHow = [];
//             const titleDivsWhy = [];

//             // Create quotes
//             item.quotes.forEach(element => {
//                 const authorDiv = createQuoteElement(element.author, element.source, element.quote);
//                 quotesCol.appendChild(authorDiv);
//                 authorDivs.push(authorDiv);
//             });

//             // Create "how-to" sections
//             item.howTo.forEach(element => {
//                 const titleDiv = createHowToElement(element.title, element.description);
//                 howToCol.appendChild(titleDiv);
//                 titleDivsHow.push(titleDiv);
//             });

//             // Create "why" sections
//             item.purpose.forEach(element => {
//                 const titleDiv = createWhyElement(element.title, element.description);
//                 whyCol.appendChild(titleDiv);
//                 titleDivsWhy.push(titleDiv);
//             });

//             // Attach filtering event to word module
//             wordModule.addEventListener('click', () => {
//                 authorDivs.forEach(authorDiv => {
//                     authorDiv.style.display = 'block';
//                 });
//             });

//             // Event delegation for quotes to "how-to" sections
//             quotesCol.addEventListener('click', (event) => {
//                 const clickedQuote = event.target;
//                 if (clickedQuote.classList.contains('quote')) {
//                     titleDivsHow.forEach(titleDiv => {
//                         titleDiv.style.display = 'block';
//                     });
//                 }
//             });

//             // Event delegation for "how-to" sections to "why" sections
//             howToCol.addEventListener('click', (event) => {
//                 const clickedHowTo = event.target;
//                 if (clickedHowTo.classList.contains('module')) {
//                     titleDivsWhy.forEach(titleDivWhy => {
//                         titleDivWhy.style.display = 'block';
//                     });
//                 }
//             });
//         });
//     });

// // Helper functions to create elements
// function createWordModule(word, definition) {
//     const wordModule = document.createElement('div');
//     wordModule.classList.add('module');
//     wordModule.innerHTML = `
//         <div class="word">${word}</div>
//         <div class="define">${definition}</div>`;
//     return wordModule;
// }

// function createQuoteElement(author, source, quote) {
//     const authorDiv = document.createElement('div');
//     authorDiv.classList.add('module');
//     authorDiv.textContent = `${author}:`;
//     const sourceDiv = document.createElement('div');
//     sourceDiv.textContent = `${source}`;
//     const quotesDiv = document.createElement('div');
//     quotesDiv.textContent = `${quote}`;
//     quotesDiv.classList.add('quote');
//     authorDiv.appendChild(sourceDiv);
//     authorDiv.appendChild(quotesDiv);
//     authorDiv.style.display = 'none';
//     return authorDiv;
// }

// function createHowToElement(title, description) {
//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('module');
//     titleDiv.textContent = `${title}`;
//     const descDiv = document.createElement('div');
//     descDiv.textContent = `${description}`;
//     descDiv.classList.add('quote');
//     titleDiv.appendChild(descDiv);
//     titleDiv.style.display = 'none';
//     return titleDiv;
// }

// function createWhyElement(title, description) {
//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('module');
//     titleDiv.textContent = `${title}`;
//     const descDiv = document.createElement('div');
//     descDiv.textContent = `${description}`;
//     descDiv.classList.add('quote');
//     titleDiv.appendChild(descDiv);
//     titleDiv.style.display = 'none';
//     return titleDiv;
// }