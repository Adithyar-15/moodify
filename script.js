console.log("MOODIFY is running! 🧠");


// =========================================
// GLOBAL VARIABLES
// =========================================

let model = null;

let currentObject = null;

let currentDiagnosis = null;

let lastSpeechText = "";

let lastPersonality = "";


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


const emptyScanner =
    document.querySelector(".empty-scanner");


// =========================================
// LOAD AI MODEL
// =========================================

async function loadModel() {

    try {

        console.log(
            "Loading COCO-SSD model..."
        );


        model =
            await cocoSsd.load();


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
// LOAD AVAILABLE VOICES
// =========================================

function loadVoices() {

    const voices =
        window.speechSynthesis.getVoices();


    console.log(
        "🔊 Available voices:",
        voices.map(
            voice => ({
                name: voice.name,
                lang: voice.lang
            })
        )
    );


    return voices;

}


// Load immediately

loadVoices();


// Some browsers load voices later

window.speechSynthesis.onvoiceschanged =
    () => {

        console.log(
            "🔊 Voice list updated!"
        );


        loadVoices();

    };


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


        // English text for display

        dialogue:
            moodResult.dialogue,


        // Malayalam text for voice

        malayalamDialogue:
            moodResult.malayalamDialogue

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


    // =========================================
    // DEFAULT SETTINGS
    // =========================================

    speech.rate = 0.95;

    speech.pitch = 1;

    speech.volume = 1;


    // =========================================
    // GET VOICES
    // =========================================

    const voices =
        window.speechSynthesis.getVoices();


    console.log(
        "🔊 Searching for Malayalam voice..."
    );


    // =========================================
    // FIND MALAYALAM VOICE
    // =========================================

    const malayalamVoice =

        voices.find(

            voice =>
                voice.lang === "ml-IN"

        ) ||

        voices.find(

            voice =>
                voice.lang &&
                voice.lang.startsWith("ml")

        );


    // =========================================
    // SELECT VOICE
    // =========================================

    if (malayalamVoice) {

        speech.voice =
            malayalamVoice;


        speech.lang =
            malayalamVoice.lang;


        console.log(
            "✅ Malayalam voice found:",
            malayalamVoice.name
        );

    }

    else {

        // Do not prevent speech completely

        console.warn(
            "⚠️ Malayalam voice not found on this device."
        );


        // Try Indian English fallback

        const indianEnglishVoice =

            voices.find(

                voice =>
                    voice.lang === "en-IN"

            );


        if (indianEnglishVoice) {

            speech.voice =
                indianEnglishVoice;

        }


        speech.lang =
            "en-IN";

    }


    // =========================================
    // PERSONALITY-BASED EMOTIONS
    // =========================================

    switch (personality) {


        case "energetic":

            speech.rate = 1.15;

            speech.pitch = 1.25;

            speech.volume = 1;

            break;


        case "dramatic":

            speech.rate = 0.82;

            speech.pitch = 0.85;

            speech.volume = 0.9;

            break;


        case "lazy":

            speech.rate = 0.72;

            speech.pitch = 0.9;

            speech.volume = 0.85;

            break;


        case "angry":

            speech.rate = 1.08;

            speech.pitch = 0.75;

            speech.volume = 1;

            break;


        case "sarcastic":

            speech.rate = 0.9;

            speech.pitch = 0.88;

            speech.volume = 0.9;

            break;


        case "mysterious":

            speech.rate = 0.78;

            speech.pitch = 0.8;

            speech.volume = 0.85;

            break;

    }


    // =========================================
    // SPEECH EVENTS
    // =========================================

    speech.onstart =
        () => {

            console.log(
                "🔊 Speech started!"
            );

        };


    speech.onend =
        () => {

            console.log(
                "🔇 Speech finished."
            );

        };


    speech.onerror =
        (event) => {

            console.error(
                "❌ Speech error:",
                event.error
            );

        };


    // =========================================
    // SPEAK
    // =========================================

    window.speechSynthesis.speak(
        speech
    );


    console.log(
        "🔊 Speaking:",
        lastSpeechText
    );


    console.log(
        "🎭 Personality:",
        personality
    );

}


// =========================================
// SPEAK BUTTON
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


    currentDiagnosis = {

        ...finalResult,


        image:
            uploadedImage.src

    };


    currentObject =
        finalResult.object;


    console.log(
        "🤖 MOODIFY Diagnosis:",
        currentDiagnosis
    );


    // =========================================
    // DISPLAY RESULT IN ENGLISH
    // =========================================

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


    // =========================================
    // SAVE PERSONALITY
    // =========================================

    lastPersonality =
        finalResult.personality;


    // =========================================
    // SAVE MALAYALAM FOR VOICE
    // =========================================

    lastSpeechText =

        finalResult.malayalamDialogue ||

        finalResult.dialogue;


    console.log(
        "Malayalam speech text:",
        lastSpeechText
    );


    // =========================================
    // ENABLE BUTTONS
    // =========================================

    speakButton.disabled =
        false;


    goToTherapy.disabled =
        false;


    // =========================================
    // APPOINTMENT + QUALIFICATIONS
    // =========================================

    appointmentResult.innerHTML =

        "🧾 <b>" +

        finalResult.object +

        "</b> has been admitted to the clinic.<br><br>" +


        "🍌 <b>Your Therapist: Dr. MOODIFY</b><br>" +

        "Chief Object Therapist<br><br>" +


        "🎓 <b>Qualifications:</b><br><br>" +


        "🍌 <b>MBBS*</b><br>" +

        "Master of Banana Behaviour Studies<br><br>" +


        "🧠 <b>PhD</b><br>" +

        "Pretending to Listen Professionally<br><br>" +


        "🛋️ <b>Certified</b><br>" +

        "Emotional Furniture Specialist<br><br>" +


        "🏆 <b>Experience:</b><br>" +

        "0% Success Rate, 100% Confidence<br><br>" +


        "<small>" +

        "*Qualifications may be emotionally imaginary. 😭" +

        "</small><br><br>" +


        "🍌 Dr. MOODIFY is waiting in the therapy room.<br>" +

        "Please escort the patient carefully. 😭";


    // =========================================
    // SPEAK AUTOMATICALLY
    // =========================================

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


        speakButton.disabled =
            true;


        goToTherapy.disabled =
            true;


        appointmentResult.textContent =

            "🕒 Waiting for the patient to be identified.";


        result.textContent =

            "🧠 Patient admitted. AI is examining the emotional situation...";


        // =====================================
        // SHOW IMAGE IMMEDIATELY
        // =====================================

        const imageURL =
            URL.createObjectURL(
                file
            );


        uploadedImage.style.display =
            "block";


        if (emptyScanner) {

            emptyScanner.style.display =
                "none";

        }


        uploadedImage.onload =

            async () => {


                console.log(
                    "Patient image loaded successfully!"
                );


                // =================================
                // CONVERT IMAGE TO BASE64
                // =================================

                const reader =
                    new FileReader();


                reader.onload =

                    async () => {


                        const base64Image =
                            reader.result;


                        uploadedImage.dataset.base64 =
                            base64Image;


                        // =================================
                        // CHECK MODEL
                        // =================================

                        if (!model) {

                            result.textContent =

                                "🤖 AI model is still loading. Please wait a moment and upload the patient again.";

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
                            // FILTER OBJECTS
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


                                analyzeObjectMood(
                                    currentObject
                                );


                                // Save BASE64 image

                                currentDiagnosis.image =
                                    base64Image;

                            }


                            // =================================
                            // OBJECT NOT FOUND
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

                                "⚠️ Error analysing the patient image.";


                            appointmentResult.textContent =

                                "❌ The clinic experienced an emotional technical failure.";

                        }


                    };


                reader.readAsDataURL(
                    file
                );


            };


        uploadedImage.src =
            imageURL;


    }

);


// =========================================
// GO TO THERAPY
// =========================================

goToTherapy.addEventListener(

    "click",

    () => {


        if (!currentDiagnosis) {


            appointmentResult.textContent =

                "❌ Please upload and diagnose a patient first.";


            return;

        }


        window.speechSynthesis.cancel();


        try {


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


        }


        catch (error) {


            console.error(

                "Could not save patient:",

                error

            );


            appointmentResult.textContent =

                "❌ The patient file could not be transferred to therapy.";


            return;

        }


        appointmentResult.innerHTML =

            "🛋️ <b>THERAPY SESSION APPROVED!</b><br><br>" +

            "🍌 Dr. MOODIFY is preparing the therapy room...<br>" +

            "Please escort the patient carefully. 😭";


        setTimeout(

            () => {


                window.location.href =

                    "therapy.html";


            },

            800

        );


    }

);