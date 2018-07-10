$(document).ready(function(){
    let topics = ['alligator', 'crocodile', 'dinosaur', 'cow', 'elephant', 'shark', 'kangaroo', 'wallaby', 'python', 'cobra', 'sloth']

    function displayAnimalGifs(event) {
        $('#animals').empty()
        console.log(event.target)
        let animalName = $(this).attr('data-name')
        let apiKey = 'd4d526Bu9TK7tTQfpXVTMMJTYUfuh7jG'
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${animalName}&limit=10&api_key=${apiKey}`
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response)
            for (i=0; i < 10; i++){

            
            let rating = response.data[i].rating
            let cardDiv = $('<div>').addClass('card')
            let ratingDiv = $('<div>').addClass('card-body')
            ratingDiv.text(`Rating: ${rating.toUpperCase()}`)
            cardDiv.addClass('col-lg-4')
            cardDiv.addClass('text-center')
            $('#animals').append(cardDiv)
            cardDiv.append(ratingDiv)

            let gifURL = response.data[i].images.fixed_height.url
            let gifOne = $("<img>").attr('src', gifURL).attr('alt', 'gif')
            
            gifOne.addClass('text-center')
            cardDiv.append(gifOne)

            

            }

        })
    
        // $('#animals').text(animalName)
    }

    function renderButtons() {
        let animalButtons = $('#animalButtons')

        animalButtons.empty()

        topics.forEach(function(topic){
            let button = $('<button>')
            button.addClass('btn')
            button.addClass('movie-btn')
            button.attr('data-name', topic)
            animalButtons.append(button.text(topic))
        })
    }
    
    $('#addAnimal').on('click', function(event){
        event.preventDefault()

        let animal = $('#animalInput').val().trim()
        
        topics.push(animal)

        renderButtons()
    })

    $(document).on('click','.movie-btn', displayAnimalGifs)
    
    renderButtons()

})