var app = angular.module('app');

app.controller('TrailsController', function ($scope) {
    // TODO: Store in some kind of DB later...

    $scope.trails = {
        "Brothers Creek Loop":
                {
                    href: "brotherscreek",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/brotherscreek.jpg",
                    map: "",
                    time: 2.5,
                    distance: 7,
                    elevation: 350,
                    location: 'West Vancouver',
                    difficulty: 'Easy',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/1b.jpg",
                            description: "From Millstream Road overlooking Downtown Vancouver"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/2.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/2t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/2b.jpg",
                            description: "From Millstream Road overlooking Burrard Inlet"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/3.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/3t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/brotherscreek/3b.jpg",
                            description: "Candelabra Fir"
                        }
                    ]
                },
        "Eagle Bluffs":
                {
                    href: "eaglebluffs",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/eaglebluffs.jpg",
                    map: "",
                    time: 2.5,
                    distance: 8,
                    elevation: 350,
                    location: 'Cypress Mountain',
                    difficulty: 'Intermediate',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/1b.jpg",
                            description: "View from Eagle Bluffs (Vancouver and Richmond visible)"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/2.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/2t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/2b.jpg",
                            description: "View from Eagle Bluffs looking West"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/4.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/4t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/4b.jpg",
                            description: "View from Eagle Bluffs"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/5.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/5t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/5b.jpg",
                            description: "From the top of one of the Cypress ski lifts"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/6.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/6t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/6b.jpg",
                            description: "Cabin Lake"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/7.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/7t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/7b.jpg",
                            description: "From the Yew Lake viewpoint. The Lions peaks are visible."
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/8.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/8t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/8b.jpg",
                            description: "Going down a ski slope back to the parking lot area"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/9.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/9t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/eaglebluffs/9b.jpg",
                            description: "From the Cypress Mountain Lookout. The cities of Vancouver, Richmond, Burnaby, Surrey, and beyond are visible."
                        }
                    ],
                    video: [
                        {
                            video: "http://www.youtube.com/watch?v=zydya4ccRas",
                            title: "Eagle Bluffs"
                        }
                    ]
                },
        "Norvan Falls":
                {
                    href: "norvanfalls",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/norvanfalls.jpg",
                    map: "",
                    time: 3.5,
                    distance: 18,
                    elevation: '~0',
                    location: 'Lynn Canyon (North Vancouver)',
                    difficulty: 'Intermediate',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/1b.jpg",
                            description: "Trees"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/2.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/2t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/2b.jpg",
                            description: "More trees"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/3.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/3t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/3b.jpg",
                            description: "The rugged steel bridge. This is no Capilano Suspension Bridge."
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/4.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/4t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/4b.jpg",
                            description: "Norvan Falls!"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/5.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/5t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/5b.jpg",
                            description: "Not Niagara Falls"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/7.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/7t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/norvanfalls/7b.jpg",
                            description: "Trail cutting from the Headwaters Trail to the upper Lynn Loop Trail"
                        }
                    ],
                    video: [
                        {
                            video: "http://www.youtube.com/watch?v=A3dM5qXP9n0",
                            title: "Middle of a trail towards Norvan Falls"
                        }
                    ]
                },
        "Quarry Rock":
                {
                    href: "quarryrock",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/quarryrock.jpg",
                    map: "",
                    time: 1.5,
                    distance: 3.8,
                    elevation: 100,
                    location: 'North Vancouver',
                    difficulty: 'Easy',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/1b.jpg",
                            description: "View from Quarry Rock"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/4.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/4t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/quarryrock/4b.jpg",
                            description: "Deep Cove"
                        }
                    ]
                },
        "St. Mark's Summit":
                {
                    href: "stmarks",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/stmarks.jpg",
                    map: "",
                    time: 3,
                    distance: 11,
                    elevation: 460,
                    location: 'Cypress Mountain',
                    difficulty: 'Intermediate',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/1b.jpg",
                            description: "View from St. Mark's Summit"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/3.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/3t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/3b.jpg",
                            description: "Bowen Island (back) and Bowyer Island (front)"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/4.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/4t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/4b.jpg",
                            description: "Bowen Island (left). Gambier Island (right) and the Sunshine Coast behind it."
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/5.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/5t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/5b.jpg",
                            description: "Gambier Island (left) and Anvil Island (right)"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/6.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/6t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/stmarks/6b.jpg",
                            description: "Gambier Island (left) and Anvil Island (right)"
                        }
                    ],
                    video: [
                        {
                            video: "http://www.youtube.com/watch?v=gT0ZsF4MpB8",
                            title: "St. Mark's Summit"
                        },
                        {
                            video: "http://www.youtube.com/watch?v=0SGewkldclE",
                            title: "Bowen Lookout",
                            description: "A side trail that can be taken while on the way to St. Mark's Summit"
                        }
                    ]
                },
        "Capilano Canyon":
                {
                    href: "capilanocanyon",
                    banner: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/banner/capilanocanyon.jpg",
                    map: "",
                    time: 1,
                    distance: 2.6,
                    elevation: "100",
                    location: 'North Vancouver',
                    difficulty: 'Easy',
                    images: [
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/1.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/1t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/1b.jpg",
                            description: "Capilano Lake"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/2.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/2t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/2b.jpg",
                            description: "Capilano Lake w/ bench"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/3.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/3t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/3b.jpg",
                            description: "Capilano Lake"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/4.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/4t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/4b.jpg",
                            description: "More of Capilano Lake and the Lions in the distance"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/5.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/5t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/5b.jpg",
                            description: "Map of Capilano River Regional Park and trails"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/6.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/6t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/6b.jpg",
                            description: "Cleveland Dam (not much water)"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/7.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/7t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/7b.jpg",
                            description: "To hatchery!"
                        },
                        {
                            image: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/8.jpg",
                            thumb: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/8t.jpg",
                            big: "https://dl.dropboxusercontent.com/u/11549526/HikeLog/capilanocanyon/8b.jpg",
                            description: "Coho Juveniles (see video below)"
                        }
                    ],
                    video: [
                        {
                            video: "http://www.youtube.com/watch?v=GzoTOEvF0lc",
                            title: "Capilano River Hatchery",
                            description: "Cross-section of a fish ladder with Coho salmon juveniles"
                        }
                    ]
                }
    };
});