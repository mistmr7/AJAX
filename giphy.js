$(document).ready(function(){
    let topics = ['alligator', 'crocodile', 'dinosaur', 'cow', 'elephant', 'shark', 'kangaroo', 'wallaby', 'python', 'cobra', 'sloth']

    function displayAnimalGifs(event) {
        $('#animals').empty()
        console.log(event.target)
        let animalName = $(this).attr('data-name')
        let offset = $(this).offset
        offset = Math.floor(Math.random() * 25)
        let apiKey = 'd4d526Bu9TK7tTQfpXVTMMJTYUfuh7jG'
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${animalName}&limit=25&offset=${offset}&api_key=${apiKey}`
        

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            //log the object to the console for data retrieval
            console.log(response)
            
            //set a loop to set up 10 gif images
            for (i=0; i < 10; i++){    
            
            // set some variables and make cards to add the rating and the image to        
            let rating = response.data[i].rating
            let cardDiv = $('<div>').addClass('card')
            let ratingDiv = $('<div>').addClass('card-body')

            //change the rating text to uppercase lettering
            ratingDiv.text(`Rating: ${rating.toUpperCase()}`)
            
            //add some classes to make it fit in rows and center the text
            cardDiv.addClass('col-lg-4')
            cardDiv.addClass('text-center')

            //append the card to the animals Div and append the rating to the card
            $('#animals').append(cardDiv)
            cardDiv.append(ratingDiv)

            // set variables to grab the images both still and moving. Created an image tag and gave it new source
            let gifURL = response.data[i].images.fixed_height.url
            let gifOne = $("<img>").attr('src', gifURL).attr('alt', 'gif')
            let gifPause = response.data[i].images.fixed_height_still.url
            
            // style the text to the center
            gifOne.addClass('text-center')

            // append the image gif to the card, also add a class to the image
            cardDiv.append(gifOne)
            gifOne.addClass('gif')

            //write the code for setting the attributes based on the image state
            gifOne.attr('data-still', gifPause)
            gifOne.attr('data-animate', gifURL)
            gifOne.attr('data-state', 'animate')
            }
        })
    
    }

    // function to pause and start the gifs
    function pauseAnimateGifs () {
        let state = $(this).attr('data-state')
        if (state === 'still') {
            $(this).attr('data-state', 'animate')
            $(this).attr('src', $(this).attr('data-animate'))
          } else if (state === 'animate') {
            $(this).attr('data-state', 'still')
            $(this).attr('src', $(this).attr('data-still'))
          }
    }

    // function to make all of the buttons
    function renderButtons() {
        let animalButtons = $('#animalButtons')

        animalButtons.empty()

        //sort through the array and add a button for each, including adding classes and attribute properties
        topics.forEach(function(topic){
            let button = $('<button>')
            button.addClass('btn')
            button.addClass('animal-btn')
            button.attr('data-name', topic)
            animalButtons.append(button.text(topic))
        })
    }
    
    // Add a new animal button
    $('#addAnimal').on('click', function(event){
        // prevent the form submit default
        event.preventDefault()

        // the button will be the value of the input
        let animal = $('#animalInput').val().trim()
        
        //add the new animal to the array
        topics.push(animal)

        //run the function to make the buttons
        renderButtons()
    })
    // set a click function for the button to display the animal Gifs
    $(document).on('click','.animal-btn', displayAnimalGifs)
    $(document).on('click', '.gif', pauseAnimateGifs)
    
    renderButtons()
})