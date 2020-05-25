var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seeds = [
    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1588850635356-414f55bb4258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        description: "Bacon ipsum dolor amet shoulder tenderloin pork chop pancetta biltong flank cow burgdoggen, boudin pig. Prosciutto andouille salami, venison shankle sirloin jowl. Rump biltong tongue jerky porchetta. Sirloin chislic tail leberkas ground round capicola andouille pork loin venison short loin. Kevin picanha shankle, filet mignon ribeye burgdoggen doner kielbasa drumstick landjaeger.",
        author: {
            id: "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1588849907631-dae5cc477555?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80",
        description: "Bacon ipsum dolor amet shoulder tenderloin pork chop pancetta biltong flank cow burgdoggen, boudin pig. Prosciutto andouille salami, venison shankle sirloin jowl. Rump biltong tongue jerky porchetta. Sirloin chislic tail leberkas ground round capicola andouille pork loin venison short loin. Kevin picanha shankle, filet mignon ribeye burgdoggen doner kielbasa drumstick landjaeger.",
        author: {
            id: "588c2e092403d111454fff77",
            username: "Jill"
        }
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1588793560205-51131343c4a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80",
        description: "Bacon ipsum dolor amet shoulder tenderloin pork chop pancetta biltong flank cow burgdoggen, boudin pig. Prosciutto andouille salami, venison shankle sirloin jowl. Rump biltong tongue jerky porchetta. Sirloin chislic tail leberkas ground round capicola andouille pork loin venison short loin. Kevin picanha shankle, filet mignon ribeye burgdoggen doner kielbasa drumstick landjaeger.",
        author: {
            id: "588c2e092403d111454fff71",
            username: "Jeremy"
        }
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        err ? console.log(err) : console.log("removed campgrounds");
        // add a few campgrounds
        seeds.forEach(function (seed) {
            Campground.create(seed, function (err, addedSeed) {
                if (err)
                    console.log(err)
                else {
                    console.log("added a campground");
                    // Comment.create(
                    //     {
                    //         text: "This place is great! I wanted internet tho",
                    //         author: "Homer"
                    //     }, function (err, comment) {
                    //         if (err)
                    //             console.log(err);
                    //         else {
                    //             addedSeed.comments.push(comment);
                    //             addedSeed.save();
                    //             console.log("added a comment");
                    //         }
                    //     });
                    addedSeed.save();
                }
            });
        });
    });
}

module.exports = seedDB;