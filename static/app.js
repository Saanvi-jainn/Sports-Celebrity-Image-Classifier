Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/classify_image", // Updated URL
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Drop an image here or click to upload",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        // Ensure only one file is uploaded
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL; // This should be like "data:image/jpeg;base64,<base64_data>"
        console.log("Sending image data:", imageData); // Log it for debugging

        var url = "/classify_image"; // Ensure it points to the same path

        // Use AJAX to send the base64 data to the server
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json", // Ensure the content type is set to JSON
            data: JSON.stringify({ image_data: imageData }), // Stringify the JSON object
            success: function(data) {
                console.log(data);
                if (!data || data.length == 0) {
                    $("#resultHolder").hide();
                    $("#divClassTable").hide();                
                    $("#error").show();
                    return;
                }

                let players = ["lionel_messi", "maria_sharapova", "roger_federer", "serena_williams", "virat_kohli"];
                
                let match = null;
                let bestScore = -1;
                for (let i = 0; i < data.length; ++i) {
                    let maxScoreForThisClass = Math.max(...data[i].class_probability);
                    if (maxScoreForThisClass > bestScore) {
                        match = data[i];
                        bestScore = maxScoreForThisClass;
                    }
                }

                if (match) {
                    $("#error").hide();
                    $("#resultHolder").show();
                    $("#divClassTable").show();
                    $("#resultHolder").html($(`[data-player="${match.class}"]`).html());
                    let classDictionary = match.class_dictionary;
                    for (let personName in classDictionary) {
                        let index = classDictionary[personName];
                        let probabilityScore = match.class_probability[index];
                        let elementName = "#score_" + personName;
                        $(elementName).html(probabilityScore);
                    }
                }
            },
            error: function(err) {
                console.error("Error:", err);
                $("#error").show(); // Show an error message if the request fails
            }
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log("ready!");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    init();
});
