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
        //Why isn't this working?
        //let projectDiv = $('<div>')
        //$(".project-container").append(projectDiv)

        title.text(project.title)
        image.attr('src', project.image).addClass('project-img')
        description.text(project.description)
        url.text(project.url)
        $('.project-container').append(title, image, description, url)
    })
}