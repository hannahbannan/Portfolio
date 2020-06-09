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
function app(projectsArr) {
    console.log('app - projectsArr', projectsArr)
    projectsArr.forEach( project => {
        let title = $('<h4>')
        let image = $('<img>')
        let description = $('<p>')
        let url = $('<a>')
        let projectDiv = $('<div>')
        title.text(project.title)
        image.attr('src', project.image).addClass('project-img')
        description.text(project.description)
        url.attr('href', project.url).text('Check it out')
        projectDiv.addClass(project.title).append(title, image, description, url)
        $(".project-container").append(projectDiv)
        //$(".project-container").append(title, image, description, url)
    })
//I want to: for each item in projectsArr, create a div to contain the projectArr element. Then get the text, image, description, and url for each project and append them to their respective divs. Each of the divs will eb appended to the project container.
        
}