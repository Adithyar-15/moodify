const moodData = {

    dramatic: {
        moods: [
            {
                mood: "Emotionally Damaged 😭",

                dialogue:
                    "ഞാൻ ഒരുപാട് കാര്യങ്ങളിലൂടെ കടന്നുപോയിട്ടുണ്ട്. പ്രത്യേകിച്ച് മനുഷ്യർ എന്നെ താഴെ ഇടുന്നതിലൂടെ."
            },
            {
                mood: "Overthinking Everything 🥲",

                dialogue:
                    "ഞാൻ ശരിക്കും ഒരു വസ്തുവാണോ? അതോ എല്ലാവർക്കും മനസ്സിലാകാത്ത ഒരു വികാരജീവിയാണോ?"
            },
            {
                mood: "Feeling Ignored 😔",

                dialogue:
                    "നിങ്ങൾക്ക് എന്നെ ആവശ്യമുള്ളപ്പോൾ മാത്രമാണ് നിങ്ങൾ എന്നെ ശ്രദ്ധിക്കുന്നത്."
            }
        ]
    },


    energetic: {
        moods: [
            {
                mood: "Extremely Excited 🤩",

                dialogue:
                    "ഹലോ മനുഷ്യാ! എന്തോ സംഭവിക്കുന്നു! എന്താണെന്ന് എനിക്കറിയില്ല, പക്ഷേ ഞാൻ റെഡിയാണ്!"
            },
            {
                mood: "Too Much Energy ⚡",

                dialogue:
                    "എനിക്ക് ഒരുപാട് എനർജി ഉണ്ട്! പക്ഷേ അത് എന്ത് ചെയ്യണമെന്ന് എനിക്ക് യാതൊരു ഐഡിയയും ഇല്ല!"
            },
            {
                mood: "Ready for Nothing 🚀",

                dialogue:
                    "ഞാൻ റെഡിയാണ്! എന്തിനാണെന്ന് ചോദിക്കരുത്. എനിക്കും അറിയില്ല!"
            }
        ]
    },


    lazy: {
        moods: [
            {
                mood: "Very Tired 😴",

                dialogue:
                    "ഇത് നമുക്ക് നാളെ തുടരാമോ? ഇന്ന് എനിക്ക് അതിനുള്ള മാനസിക ശേഷിയില്ല."
            },
            {
                mood: "Avoiding Responsibilities 🛋️",

                dialogue:
                    "ഞാൻ പ്രശ്നം കണ്ടു. പിന്നെ അത് എന്റെ പ്രശ്നമല്ലെന്ന് തീരുമാനിച്ചു."
            },
            {
                mood: "Mentally Offline 🫠",

                dialogue:
                    "ബീപ്പിന് ശേഷം ഒരു സന്ദേശം വിടൂ. അല്ലെങ്കിൽ വേണ്ട, എന്നെ വെറുതെ വിടൂ."
            }
        ]
    },


    angry: {
        moods: [
            {
                mood: "Angry 😡",

                dialogue:
                    "ദയവായി എന്നെ തൊടരുത്. ഞാൻ ഇപ്പോൾ എന്റെ വികാരങ്ങൾ പ്രോസസ് ചെയ്യുകയാണ്."
            },
            {
                mood: "Annoyed 🙄",

                dialogue:
                    "ഓഹ് കൊള്ളാം. വീണ്ടും ഒരു മനുഷ്യനുമായുള്ള ഇന്ററാക്ഷൻ."
            },
            {
                mood: "Don't Touch Me 😤",

                dialogue:
                    "കുറച്ച് പേഴ്സണൽ സ്പേസ് വേണം! വസ്തുക്കൾക്കും അതിരുകൾ ഉണ്ട്!"
            }
        ]
    },


    sarcastic: {
        moods: [
            {
                mood: "Judging You 🙄",

                dialogue:
                    "വളരെ ഇന്ററസ്റ്റിംഗ് ചോയ്സ്. ഞാൻ ആയിരുന്നെങ്കിൽ ഇതല്ലാതെ എന്തും ചെയ്തേനെ."
            },
            {
                mood: "Not Impressed 😒",

                dialogue:
                    "അതാണ് നിന്റെ ബെസ്റ്റ് ശ്രമം? വളരെ രസകരം."
            },
            {
                mood: "Questioning Your Life Choices 🤨",

                dialogue:
                    "എനിക്ക് കുറച്ച് ചോദ്യങ്ങളുണ്ട്. പക്ഷേ അതിന്റെ ഉത്തരങ്ങൾ നിനക്ക് ഇഷ്ടപ്പെടുമെന്ന് തോന്നുന്നില്ല."
            }
        ]
    },


    mysterious: {
        moods: [
            {
                mood: "Suspiciously Quiet 👀",

                dialogue:
                    "എനിക്ക് എന്തോ അറിയാം. പക്ഷേ അത് എന്താണെന്ന് ഞാൻ നിനക്ക് പറയില്ല."
            },
            {
                mood: "Keeping Secrets 🤫",

                dialogue:
                    "ഞാൻ പറഞ്ഞാൽ അത് പിന്നെ രഹസ്യമാകില്ലല്ലോ."
            },
            {
                mood: "Existentially Confused 🌌",

                dialogue:
                    "ഞാൻ എന്തിനാണ് ഇവിടെ? നീ എന്തിനാണ് ഇവിടെ? എന്തിനാണ് എന്തെങ്കിലും ഇവിടെ?"
            }
        ]
    }

};


// =========================================
// GET RANDOM PERSONALITY, MOOD AND DIALOGUE
// =========================================

function getObjectMood(objectName) {

    const personalities =
        Object.keys(moodData);


    const personality =

        personalities[
            Math.floor(
                Math.random() *
                personalities.length
            )
        ];


    const moodList =
        moodData[personality].moods;


    const selectedMood =

        moodList[
            Math.floor(
                Math.random() *
                moodList.length
            )
        ];


    return {

        object:
            objectName,


        personality:
            personality,


        mood:
            selectedMood.mood,


        dialogue:
            selectedMood.dialogue

    };

}