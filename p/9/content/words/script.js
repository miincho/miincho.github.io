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

//empty arrays to store the words in their respective categories
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

            // "quotes" data
            const authorDivs = [];
            item.quotes.forEach(element => {
                const author = element.author;
                const source = element.source;
                const quote = element.quote;
            
                //create divs for each piece of info
                const authorDiv = document.createElement('div');
                const sourceDiv = document.createElement('div');
                const quotesDiv = document.createElement('div');
                authorDiv.textContent = `${author}:`;
                sourceDiv.textContent = `${source}`;
                quotesDiv.textContent = `${quote}`;
            
                //add classes for styling
                quotesDiv.classList.add("quote");
                authorDiv.classList.add("module");
                sourceDiv.classList.add("source");
            
                //append  to authorDiv
                authorDiv.appendChild(sourceDiv);
                authorDiv.appendChild(quotesDiv);
                quotesCol.appendChild(authorDiv);
            
                //hide and push to array
                authorDiv.style.display = "none";
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

                //hide and push to array
                titleDiv.style.display = "none";
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

                //hide and push to array
                titleDiv.style.display = "none";
                titleDivsWhy.push(titleDiv);
            });
            
            // Add words to their corresponding array based on their type
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
            wordModule.style.display = "none";

            //setting volume and synths for sound effects
            var volume = new Tone.Volume(-25); 
            var louder = new Tone.Volume(-10);  
            const synth = new Tone.Synth().chain(volume, Tone.Destination); 
            const louderSynth = new Tone.Synth().chain(louder, Tone.Destination); 

            //makes each div with a delay
            function elementDelay(elements, delay) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.display = 'block';
                    }, index * delay);
                });
            }           

            //adding a sound effect for each div that appears
            function elementSound(elements, delay, pitchFunction) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        elementDelay([element], delay);
                        const pitch = pitchFunction(index); 
                        synth.triggerAttackRelease(pitch, "8n");
                    }, delay * index);
                });
            }
            
            //same as the function above but with a louder volume; the volume originally gets quieter after the first click and I wasnt sure how to fix it
            function louderVolume(elements, delay, pitchFunction) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        elementDelay([element], delay);
                        const pitch = pitchFunction(index); 
                        louderSynth.triggerAttackRelease(pitch, "8n");
                    }, delay * index);
                });
            }

            //disabling pointer events for each child div so the same column cant be clicked twice
            function disableButton(parentDiv) {
                const child = parentDiv.child;
                for (let i = 0; i < child.length; i++) {
                    child[i].style.pointerEvents = 'none'; 
                }            
            }

            //make the text of the button that wasnt clicked disappear
            function fadeOutBtns(clickedButton) {
                const buttons = [whisperbtn, spitbtn, reflectbtn, wonderbtn];
                buttons.forEach(button => {
                    if (button !== clickedButton) {
                        button.style.color = 'rgba(0, 0, 0, 0)'; 
                    }
                });
            }

            //make the word and definition in second colum disappear if unselected
            function hideOthers(moduleArray, clickedModule) {
                moduleArray.forEach(module => {
                    if (module !== clickedModule) {
                        //hide the words in second column- word & definition
                        const textElement = module.querySelector('.word'); 
                        const defineElement = module.querySelector('.define'); 
            
                        if (textElement && defineElement) {
                            textElement.style.opacity = '0'; 
                            defineElement.style.opacity ='0';
                        }
                    }
                });
            }

             //store selected pitch so it can be reused for wordModules
            let selectedPitch;

            whisperbtn.addEventListener("click", () => {
                fadeOutBtns(whisperbtn); //make other choices disappear
                disableButton(firstOptions); //prevent from clicking same category twice 
                selectedPitch = softPitch; // Store softPitch function
                elementSound(whisperModules, 150, selectedPitch); //store the specific pitch so it can be reused for next columns

                //create and display column title 
                topTwo.innerHTML = "TO BE WHISPERED";
                topTwo.style.display = "block"; 

                //change background and text color 
                document.documentElement.style.setProperty('--main-bg-color', '#F2F2F2'); 
                document.documentElement.style.setProperty('--main-border-color', '#487AC4');
            });
            
            spitbtn.addEventListener("click", () => {
                fadeOutBtns(spitbtn);
                disableButton(firstOptions);
                selectedPitch = harshPitch; 
                elementSound(spitModules, 150, selectedPitch);
                topTwo.innerHTML = "TO BE SPIT OUT";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#000000');
                document.documentElement.style.setProperty('--main-border-color', '#A48D8D');
            });
            
            reflectbtn.addEventListener("click", () => {
                fadeOutBtns(reflectbtn);
                disableButton(firstOptions);
                selectedPitch = randomPitch; 
                elementSound(reflectModules, 150, selectedPitch);
                topTwo.innerHTML = "TO BE REFLECTED ON";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#000000');
                document.documentElement.style.setProperty('--main-border-color', '#FF5959');
            });
            
            wonderbtn.addEventListener("click", () => {
                fadeOutBtns(wonderbtn);
                disableButton(firstOptions);
                selectedPitch = metalSynth;
                elementSound(wonderModules, 150, selectedPitch);
                topTwo.innerHTML = "TO BE WONDERED";
                topTwo.style.display = "block";
                document.documentElement.style.setProperty('--main-bg-color', '#FFFFFF');
                document.documentElement.style.setProperty('--main-border-color', '#CB00AB');
            });
            

            // Make the text transparent for modules that weren't clicked
            function fadeOut(clickedDiv, divs) {
                divs.forEach(div => {
                    if (div !== clickedDiv) {
                        div.style.color = 'rgba(0, 0, 0, 0)'; 
                    }
                });
            }

            // Filtering to associated quotes
            wordModule.addEventListener('click', () => {
                disableButton(wordCol);
                louderVolume(authorDivs, 150, selectedPitch); 

                //to make unselected divs disappear 
                switch (item.type) {
                    case "whisper":
                        hideOthers(whisperModules, wordModule);
                        break;
                    case "spit":
                        hideOthers(spitModules, wordModule);
                        break;
                    case "reflect":
                        hideOthers(reflectModules, wordModule);
                        break;
                    case "wonder":
                        hideOthers(wonderModules, wordModule);
                        break;
                    default:
                        break;
                }
                
                authorDivs.forEach(authorDiv => {
                    authorDiv.addEventListener('click', () => {
                        disableButton(quotesCol); //prevent column from being clicked again
                        fadeOut(authorDiv, authorDivs); //make unselected divs disappear
                        louderVolume(titleDivsHow, 150,selectedPitch); //add delay and sound effects

                        titleDivsHow.forEach(titleDiv => {
                            titleDiv.addEventListener('click', () => {
                                disableButton(howToCol);
                                fadeOut(titleDiv, titleDivsHow);
                                louderVolume(titleDivsWhy, 150,selectedPitch);

                                titleDivsWhy.forEach(whyDiv => {
                                    whyDiv.addEventListener('click', () => {
                                        disableButton(whyCol);
                                        fadeOut(whyDiv, titleDivsWhy);
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

    //different sound effects for each category
    function softPitch(index) {
        const baseNote = "D4";
        const semitoneOffset = index * 2; //increase by 2 semitones per note
        const pitch = Tone.Frequency(baseNote).transpose(semitoneOffset); //pitch calculation
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
    
    const amSynth = new Tone.AMSynth().toDestination(); //metal synth 
    amSynth.volume.value = -20;
    
    function metalSynth(index) {
        const baseNote = "C4"; 
        const semitoneOffset = index * 2; 
        const pitch = Tone.Frequency(baseNote).transpose(semitoneOffset); 
            amSynth.triggerAttackRelease(pitch, "8n");
        return pitch.toNote();
    }

    //reset btn to refresh page
    const reset = document.getElementById("reset");
    reset.addEventListener("click", ()=>{
        location.reload();
    });