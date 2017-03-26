exports.handler = (event, context, callback) => {
    const https = require("https");
    const http = require("http");


    console.log(event);


    try {

        if (event.session.new) {
            // New session
            console.log("New session");
        }

        console.log("Type: ", event.request.type);

        switch (event.request.type) {
            case "LaunchRequest": {
                // Launch request
                console.log("Launch request");
                generateResponse(
                    buildSpeechletResponse("Hello world", false),
                    {}
                );
                break;
            }






            case "IntentRequest": {
                // Intent request
                console.log("Intent request");
                console.log(event.request.intent.name);

                switch (event.request.intent.name) {
                    case "PenguinLocation" : {
                        context.succeed (
                            generateResponse(
                                buildSpeechletResponse("Penguinsss", true),
                                {}
                            )
                        );

                        break;
                    }

                    default : {
                        endSessionHandler("Default hit: Intent");
                    }
                }


                break;
            }

            case "SessionEndRequest": {
                // Session end request
                break;
            }

            default: {
                endSessionHandler("Default hit");
            }
        }

    } catch(error) {
        endSessionHandler("Catch hit");
        // context.fail("Failed due to some unknown error");
    }

    function endSessionHandler(speech) {
        if (typeof speech === "undefined") {
            speech = "Good bye from the penguin finder.";
        }
        context.succeed(
            generateResponse(
                buildSpeechletResponse(speech, true),
                {}
            )
        );
    }
};



// Helper functions
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }
};

generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
};