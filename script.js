console.log("MOODIFY is running! 🧠");


// =========================================
// GLOBAL VARIABLES
// =========================================

let model;

let currentObject = null;

let currentDiagnosis = null;

let lastSpeechText = "";

let lastPersonality = "";


// =========================================
// LOAD AI MODEL
// =========================================

async function loadModel() {

    try {

        console.log("Loading COCO-SSD model...");


        model = await cocoSsd.load();


        console.log(
            "COCO-SSD model loaded successfully! 🤖"
        );


        console.log(
            "Object detection is ready!"
        );

    }

    catch (error) {

        console.error(
            "Error loading AI model:",
            error
        );


        result.textContent =

            "⚠️ AI model could not load. Please refresh the page.";

    }

}


loadModel();


// =========================================
// GET HTML ELEMENTS
// =========================================

const result =
    document.getElementById("result");


const speakButton =
    document.getElementById("speakButton");


const imageUpload =
    document.getElementById("imageUpload");


const uploadedImage =
    document.getElementById("uploadedImage");


const goToTherapy =
    document.getElementById("goToTherapy");


const appointmentResult =
    document.getElementById("appointmentResult");


// =========================================
// GET MOOD RESULT
// =========================================

function getFinalMoodResult(objectName) {

    const moodResult =
        getObjectMood(objectName);


    return {

        object:
            moodResult.object,


        personality:
            moodResult.personality,


        mood:
            moodResult.mood,


        dialogue:
            moodResult.dialogue

    };

}


// =========================================
// TEXT TO SPEECH
// =========================================

function speakDiagnosis(
    personality = lastPersonality
) {


    if (!lastSpeechText) {

        console.log(
            "No diagnosis available for speech."
        );

        return;

    }


    // Stop previous speech

    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            lastSpeechText
        );


    // Default settings

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;


    // =====================================
    // EMOTIONAL VOICE SETTINGS
    // =====================================

    switch (personality) {


        case "energetic":

            speech.rate = 1.18;

            speech.pitch = 1.35;

            speech.volume = 1;

            break;


        case "dramatic":

            speech.rate = 0.72;

            speech.pitch = 0.75;

            speech.volume = 0.75;

            break;


        case "lazy":

            speech.rate = 0.68;

            speech.pitch = 0.8;

            speech.volume = 0.8;

            break;


        case "angry":

            speech.rate = 1.08;

            speech.pitch = 0.7;

            speech.volume = 1;

            break;


        case "sarcastic":

            speech.rate = 0.82;

            speech.pitch = 0.9;

            speech.volume = 0.95;

            break;


        case "mysterious":

            speech.rate = 0.7;

            speech.pitch = 0.65;

            speech.volume = 0.8;

            break;

    }


    // Speak

    window.speechSynthesis.speak(
        speech
    );


    console.log(
        "🔊 Speaking diagnosis with personality:",
        personality
    );

}


// =========================================
// SPEAK DIAGNOSIS BUTTON
// =========================================

speakButton.addEventListener(

    "click",

    () => {

        speakDiagnosis(
            lastPersonality
        );

    }

);


// =========================================
// DISPLAY DIAGNOSIS
// =========================================

function analyzeObjectMood(objectName) {


    const finalResult =
        getFinalMoodResult(
            objectName
        );


    // Save diagnosis

   currentDiagnosis = {

    ...finalResult,

    image:
        uploadedImage.src

};


    currentObject =
        finalResult.object;


    console.log(
        "🤖 MOODIFY Diagnosis:",
        finalResult
    );


    // =====================================
    // DISPLAY RESULT
    // =====================================

    result.innerHTML =

        "🎯 Object detected: <b>" +

        finalResult.object +

        "</b><br><br>" +


        "🎭 Personality: <b>" +

        finalResult.personality +

        "</b><br><br>" +


        "😊 Mood: <b>" +

        finalResult.mood +

        "</b><br><br>" +


        "💬 <b>Patient says:</b><br>" +

        "\"" +

        finalResult.dialogue +

        "\"";


    // =====================================
    // SAVE PERSONALITY
    // =====================================

    lastPersonality =
        finalResult.personality;


    // =====================================
    // CREATE SPEECH TEXT
    // =====================================

    lastSpeechText =

        "Hmm... " +

        "I have finished analyzing the " +

        finalResult.object +

        ". " +


        "Its personality appears to be " +

        finalResult.personality +

        ". " +


        "Its current emotional condition is " +

        finalResult.mood +

        ". " +


        "And the patient says... " +

        finalResult.dialogue;


    // =====================================
    // ENABLE BUTTONS
    // =====================================

    speakButton.disabled =
        false;


    goToTherapy.disabled =
        false;


    // =====================================
    // UPDATE THERAPY STATUS
    // =====================================

    appointmentResult.innerHTML =

        "🧾 <b>" +

        finalResult.object +

        "</b> has been admitted to the clinic.<br><br>" +

        "🍌 Dr. MOODIFY is waiting in the therapy room.<br>" +

        "The doctor is a banana. This is apparently fine. 😭";


    // Automatically speak diagnosis

    speakDiagnosis(
        finalResult.personality
    );


    return finalResult;

}


// =========================================
// IMAGE UPLOAD
// =========================================

imageUpload.addEventListener(

    "change",

    (event) => {


        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        // =====================================
        // RESET OLD SESSION
        // =====================================

        window.speechSynthesis.cancel();


        currentObject =
            null;


        currentDiagnosis =
            null;


        lastSpeechText =
            "";


        lastPersonality =
            "";


        // Disable buttons while analyzing

        speakButton.disabled =
            true;


        goToTherapy.disabled =
            true;


        // Reset therapy status

        appointmentResult.textContent =

            "🕒 Waiting for the patient to be identified.";


        // =====================================
        // CREATE IMAGE URL
        // =====================================

        const imageURL =
            URL.createObjectURL(
                file
            );


        // Show uploaded image

        uploadedImage.src =
            imageURL;


        uploadedImage.style.display =
            "block";


        // Show analyzing message

        result.textContent =

            "🧠 Patient admitted. AI is examining the emotional situation...";


        // =====================================
        // WHEN IMAGE LOADS
        // =====================================

        uploadedImage.onload =

            async () => {


                // Check AI model

                if (!model) {


                    result.textContent =

                        "🤖 AI model is still loading. Please wait a moment and try again.";


                    return;

                }


                try {


                    console.log(
                        "Analyzing uploaded patient..."
                    );


                    const predictions =

                        await model.detect(
                            uploadedImage
                        );


                    console.log(
                        "AI predictions:",
                        predictions
                    );


                    // =================================
                    // FILTER DETECTED OBJECTS
                    // =================================

                    const objects =

                        predictions

                            .filter(

                                prediction =>

                                    prediction.score >
                                    0.50

                            )

                            .filter(

                                prediction =>

                                    prediction.class !==
                                    "person"

                            );


                    // =================================
                    // OBJECT FOUND
                    // =================================

                    if (
                        objects.length > 0
                    ) {


                        objects.sort(

                            (a, b) =>

                                b.score -

                                a.score

                        );


                        const bestObject =
                            objects[0];


                        currentObject =
                            bestObject.class;


                        console.log(

                            "🎯 Object detected:",

                            currentObject,

                            "Confidence:",

                            bestObject.score

                        );


                        // Analyze emotional condition

                        analyzeObjectMood(
                            currentObject
                        );

                    }


                    // =================================
                    // NO OBJECT FOUND
                    // =================================

                    else {


                        result.innerHTML =

                            "🤔 <b>Patient could not be identified.</b><br><br>" +

                            "MOODIFY stared at the image for several seconds and now needs emotional support.";


                        appointmentResult.textContent =

                            "❌ Therapy cannot begin until a patient is identified.";

                    }

                }


                catch (error) {


                    console.error(
                        "Image detection error:",
                        error
                    );


                    result.textContent =

                        "⚠️ Error analyzing the patient image.";


                    appointmentResult.textContent =

                        "❌ The clinic experienced an emotional technical failure.";

                }

            };

    }

);


// =========================================
// GO TO THERAPY
// =========================================

goToTherapy.addEventListener(

    "click",

    () => {


        // Check if patient exists

        if (!currentDiagnosis) {


            appointmentResult.textContent =

                "❌ Please upload and diagnose a patient first.";


            return;

        }


        // Stop diagnosis speech

        window.speechSynthesis.cancel();


        // =====================================
        // SAVE PATIENT FOR THERAPY PAGE
        // =====================================

        localStorage.setItem(

            "moodifyPatient",

            JSON.stringify(
                currentDiagnosis
            )

        );


        console.log(

            "🛋️ Patient sent to therapy:",

            currentDiagnosis

        );


        // =====================================
        // SHOW TRANSITION MESSAGE
        // =====================================

        appointmentResult.innerHTML =

            "🛋️ <b>THERAPY SESSION APPROVED!</b><br><br>" +

            "🍌 Dr. MOODIFY is preparing the therapy room...<br>" +

            "Please escort the patient carefully. 😭";


        // =====================================
        // OPEN THERAPY PAGE
        // =====================================

        setTimeout(

            () => {


                window.location.href =

                    "therapy.html";


            },

            800

        );

    }

);