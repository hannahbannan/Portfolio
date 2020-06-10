console.log('app.js', $)

//shared url to the google sheet
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1f4Xh7IL-57E7tII3vUKQxjf3kzUFpSU-yfOxxpYaCbQ/edit?usp=sharing'
//JSON link
const sheetAsJSON = 'https://spreadsheets.google.com/feeds/list/1f4Xh7IL-57E7tII3vUKQxjf3kzUFpSU-yfOxxpYaCbQ/od6/public/values?alt=json'

console.log('running before ajax')

$.ajax({
    url: sheetAsJSON,
}).then((data) => {
    console.log('data', data);
    const projects = data.feed.entry.map(project => {
        return {
            title: project.gsx$title.$t,
            description: project.gsx$description.$t,
            image: project.gsx$image.$t,
            url: project.gsx$url.$t
        } 
    }) 
    app(projects)
})
.catch((err) => console.log('err', err))

console.log('running after ajax')


//make data into an array, and add the elements onto the page using jquery
//I created a large projectDiv with class = project title. I appended the prject image to each project div. Then I created a nested div to shot up when you hover over the project div.
function app(projectsArr) {
    console.log('app - projectsArr', projectsArr)
    projectsArr.forEach( project => {
        let title = $('<h4>')
        let image = $('<img>')
        let description = $('<p>')
        let url = $('<a>')
        let projectDiv = $('<div>')
        let projectHover = $('<div>')
        title.text(project.title)
        image.attr('src', project.image).addClass('project-img')
        description.text(project.description)
        url.attr('href', project.url).text('Check it out').addClass('checkButton')
        projectHover.addClass('project-hover').append(title,description,url)
        projectDiv.addClass(project.title).append(image,projectHover)
        $(".project-container").append(projectDiv)
    })

        
}


//hamburger nav toggle for different screen sizes

window.addEventListener("resize", resize);

function resize() {
    console.log(window.innerWidth)
    if (window.innerWidth<=768) {
    const $navButton = $('.toggle');
    const $nav = $('.disappear');
    $navButton.on('click', () => {
        $nav.toggleClass('open');
    })
}
}


$(() => {
    console.log(window.innerWidth)
    if (window.innerWidth<=768) {
    const $navButton = $('.toggle');
    const $nav = $('.disappear');
    $navButton.on('click', () => {
        $nav.toggleClass('open');
    })
}
})

