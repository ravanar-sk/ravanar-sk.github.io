
const projectTypes = [
    "web", // Website without any framework
    "web-react", // Website with ReactJS framework
    "web-angular", // Website with Angular framework
    "mobile", // Mobile application without any framework
    "mobile-ios", // Mobile application for iOS without any framework
    "mobile-android", // Mobile application for Android without any framework
    "react-native", // Cross-platform mobile application with React Native
    "react-native-ios", // Cross-platform mobile application with React Native for iOS
    "react-native-android", // Cross-platform mobile application with React Native for Android
    "flutter", // Cross-platform mobile application with Flutter
    "flutter-ios", // Cross-platform mobile application with Flutter for iOS
    "flutter-android", // Cross-platform mobile application with Flutter for Android
    "electron", // Desktop application with Electron
]

const projectBuildMethods = {
    ai: "Built using AI",
    mortals: "Built by mortals",
    "mortals-and-ai": "Built by mortals & AI",
}

const projects = [
    {
        priority: 0,
        isPersonal: true,
        buildMethod: "mortals-and-ai",
        title: "My Profile",
        description: "A website created out of passion and love as a portfolio of myself.",
        website: "https://ravanar-sk.github.io/",
        icon: null,
        bannerImage: null,
        projectData: {
            type: "web",
            web: {
                url: "https://ravanar-sk.github.io",
            }
        }
    },
    {
        priority: 1,
        isPersonal: false,
        buildMethod: "mortals",
        title: "MATCHBOXX",
        description: "A social networking iOS application where you could meet sport enthusiasts, such as Coach, Teams, Fans and interact with them over personal and group chat, post on their feeds, follow them, comment on their feeds and most importantly you could schedule matches between users or teams.",
        website: null,
        icon: "./app/resources/images/projects/appIconMatchboxx.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 2,
        isPersonal: false,
        buildMethod: "mortals",
        title: "PLANSMILE",
        description: "An iOS offline medical application used to analyze, and provide treatment solutions in the form of PDF reports.",
        website: null,
        icon: null,
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 3,
        isPersonal: false,
        buildMethod: "mortals",
        title: "BIZCLIPS",
        description: "A professional social networking iOS application where you could publicize job openings if you are an entrepreneur, or market your skills as a job seeker using Videos as the media of communication.",
        website: null,
        icon: "./app/resources/images/projects/appIconBizclips.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "https://apps.apple.com/us/app/bizclips/id1315696803",
            },
        }
    },
    {
        priority: 4,
        isPersonal: false,
        buildMethod: "mortals",
        title: "SAP",
        description: "An iOS application used to authenticate users in a SAP technical event using QR code and REST API authentication.",
        website: null,
        icon: "./app/resources/images/projects/appIconSAP.png",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 5,
        isPersonal: false,
        buildMethod: "mortals",
        title: "HASANAT",
        description: "An application used for donation based crowdfunding for middle east location. It includes features like Payment Gateway.",
        website: null,
        icon: "./app/resources/images/projects/appIconHasanat.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "",
            },
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 6,
        isPersonal: false,
        buildMethod: "mortals",
        title: "EDUCATION ABOVE ALL",
        description: "An application used for donation based crowdfunding for middle east location. It includes features like Payment Gateway.",
        website: "https://educationaboveall.org/",
        icon: "./app/resources/images/projects/appIconEAA.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.applab.EAA&hl=en_IN",
            },
            ios: {
                url: "https://apps.apple.com/th/app/education-above-all/id1560639221",
            },
        }
    },
    {
        priority: 7,
        isPersonal: false,
        buildMethod: "mortals",
        title: "QATAR CANCER SOCIETY",
        description: "An application used for donation based crowdfunding for middle east location. It includes features like Payment Gateway.",
        website: "https://www.qcs.qa/en/",
        icon: "./app/resources/images/projects/appIconQCS.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.applab.QCS",
            },
            ios: {
                url: "https://apps.apple.com/au/app/qatar-cancer-society/id1448365698",
            },
        }
    },
    {
        priority: 8,
        isPersonal: false,
        buildMethod: "mortals",
        title: "YOU GOT A GIFT",
        description: "An iOS application to send gift cards to your friends and family to use in authorised stores.",
        website: "https://yougotagift.com/",
        icon: "./app/resources/images/projects/appIconYouGotAGift.webp",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "https://apps.apple.com/ae/app/yougotagift-com/id1003784085",
            },
        }
    },
    {
        priority: 9,
        isPersonal: false,
        buildMethod: "mortals",
        title: "DIETHUB",
        description: "A client application for customers who are subscribed to DietHub services. It includes a private virtual online coach to monitor your health and diet. Also includes personal chat.",
        website: "http://diethubapp.com/",
        icon: "./app/resources/images/projects/appIconDiethub.webp",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.makers.diethub",
            },
            ios: {
                url: "https://apps.apple.com/qa/app/diethub/id1220736852",
            },
        }
    },
    {
        priority: 10,
        isPersonal: false,
        buildMethod: "mortals",
        title: "DIETHUB Coach",
        description: "",
        website: "http://diethubapp.com/",
        icon: "./app/resources/images/projects/appIconDiethubCoach.webp",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.makers.diethubcoach",
            },
            ios: {
                url: "https://apps.apple.com/qa/app/diethub-coach/id1257393544",
            },
        }
    },
    {
        priority: 11,
        isPersonal: false,
        buildMethod: "mortals",
        title: "DHI Cubes",
        description: "Design and Develop UI pages for websites using DHI Cubes, an interactive customizable web front end design and development tool. Languages used: Java, Javascript, C++",
        website: "https://www.dhisigma.com/",
        icon: "./app/resources/images/projects/appIconDhiCubes.png",
        bannerImage: null,
        projectData: {
            type: "web",
            web: {
                url: "",
            }
        }
    },
    {
        priority: 12,
        isPersonal: false,
        buildMethod: "mortals",
        title: "ONEPORT",
        description: "An iOS application to be used by employees and residents of OnePort settlements in Qatar for flat maintenance.",
        website: null,
        icon: "./app/resources/images/projects/appIconOneport.webp",
        bannerImage: null,
        projectData: {
            type: "mobile",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.applab.oneport&hl=en_IN&gl=US"
            },
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 13,
        isPersonal: false,
        buildMethod: "mortals",
        title: "AL JNOUB",
        description: "A React-Native application to reserve camping ground in the southern reserve of Qatar.",
        website: "https://www.aljnoub.qa/",
        icon: "./app/resources/images/projects/appIconAlJnoub.webp",
        bannerImage: null,
        projectData: {
            type: "react-native",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.applab.aljnoub",
            },
            ios: {
                url: "https://apps.apple.com/qa/app/id1440043523",
            },
        }
    },
    {
        priority: 14,
        isPersonal: false,
        buildMethod: "mortals",
        title: "EMPORIUM",
        description: "An e-commerce React-Native application for GCC by emporium group.",
        website: null,
        icon: null,
        bannerImage: null,
        projectData: {
            type: "react-native",
            android: {
                url: "",
            },
            ios: {
                url: "",
            },
        }
    },
    {
        priority: 15,
        isPersonal: true,
        buildMethod: "mortals",
        title: "Developer Options Shortcut",
        description: "A lightweight Android utility that opens Developer Options in one tap, giving developers and testers quick access to debugging and advanced system settings.",
        website: null,
        icon: "./app/resources/images/projects/appIconDeveloperOptions.png",
        bannerImage: null,
        projectData: {
            type: "mobile-android",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.developeroptions",
            }
        }
    },
    {
        priority: 16,
        isPersonal: true,
        buildMethod: "mortals",
        title: "Language Shortcut",
        description: "A simple Android shortcut to the system language settings, making it easier to switch languages when device menus are unfamiliar.",
        website: null,
        icon: "./app/resources/images/projects/appIconLanguageShortcut.png",
        bannerImage: null,
        projectData: {
            type: "mobile-android",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.languageselector",
            }
        }
    },
    {
        priority: 17,
        isPersonal: true,
        buildMethod: "ai",
        title: "Turkey History",
        description: "An offline guide to Turkish history, from ancient Anatolia and the Byzantine, Seljuk, and Ottoman eras to the modern republic. Includes timelines, quizzes, bookmarks, and multilingual reading.",
        website: null,
        icon: "./app/resources/images/projects/appIconTurkeyHistory.png",
        bannerImage: null,
        projectData: {
            type: "flutter",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.history.turkey",
            },
            ios: {
                url: "https://apps.apple.com/us/app/turkey-history/id6783285691",
            }
        }
    },
    {
        priority: 18,
        isPersonal: true,
        buildMethod: "ai",
        title: "Egypt History",
        description: "An offline history companion covering Egypt's eras, pharaohs, monuments, and major events, with quizzes, reading progress, and English and Arabic support.",
        website: null,
        icon: "./app/resources/images/projects/appIconEgyptHistory.png",
        bannerImage: null,
        projectData: {
            type: "flutter",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.history.egypt",
            },
            ios: {
                url: "https://apps.apple.com/us/app/egypt-history/id6783285413",
            }
        }
    },
    {
        priority: 19,
        isPersonal: true,
        buildMethod: "ai",
        title: "Qatar History",
        description: "An offline guide to Qatar's rulers, culture, historic events, and landmarks, with illustrated articles, English and Arabic support, and light and dark themes.",
        website: null,
        icon: "./app/resources/images/projects/appIconQatarHistory.png",
        bannerImage: null,
        projectData: {
            type: "flutter",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.history.qatar",
            },
            ios: {
                url: "https://apps.apple.com/us/app/qatar-history/id6781732718",
            }
        }
    },
    {
        priority: 20,
        isPersonal: true,
        buildMethod: "ai",
        title: "QWERTY Warrior",
        description: "A fast-paced typing game that challenges players to enter words before time runs out. Includes three difficulty levels, streak scoring, and leaderboards.",
        website: null,
        icon: "./app/resources/images/projects/appIconQwertyWarrior.png",
        bannerImage: null,
        projectData: {
            type: "flutter",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.keyboardwarrior",
            },
            ios: {
                url: "https://apps.apple.com/us/app/qwerty-warrior/id6779200182",
            }
        }
    },
    {
        priority: 21,
        isPersonal: true,
        buildMethod: "ai",
        title: "Kanakk",
        description: "A mental math game with Time Attack, Endless, and Survival modes. Practice arithmetic and percentages across three difficulty levels, build streaks, and improve your high score.",
        website: null,
        icon: "./app/resources/images/projects/appIconKanakk.png",
        bannerImage: null,
        projectData: {
            type: "flutter",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.mathy",
            },
            ios: {
                url: "https://apps.apple.com/us/app/kanakk/id6773100563",
            }
        }
    },
    {
        priority: 22,
        isPersonal: true,
        buildMethod: "mortals",
        title: "Movie Info",
        description: "A React Native app for exploring movies and TV series, including cast and crew information with images.",
        website: null,
        icon: "./app/resources/images/projects/appIconMovieInfo.png",
        bannerImage: null,
        projectData: {
            type: "react-native-android",
            android: {
                url: "https://play.google.com/store/apps/details?id=com.ravanar.tmdb.rn",
            }
        }
    },
    {
        priority: 23,
        isPersonal: true,
        buildMethod: "ai",
        title: "Badminton Score Tracking",
        description: "An offline badminton scoring app for singles and doubles, with live court positioning, automatic serving rotations, undo, player profiles, and match history. Includes an Apple Watch companion for scoring from the wrist.",
        website: null,
        icon: "./app/resources/images/projects/appIconBadmintonScoreTracking.jpeg",
        bannerImage: null,
        projectData: {
            type: "react-native-ios",
            ios: {
                url: "https://apps.apple.com/us/app/badminton-score-tracking/id6820491477",
            }
        }
    },
    {
        priority: 24,
        isPersonal: true,
        buildMethod: "mortals",
        title: "Bingo - Offline",
        description: "An offline multiplayer bingo game that lets players connect over the same Wi-Fi network or a mobile hotspot, making it easy to play together without internet access.",
        website: null,
        icon: "./app/resources/images/projects/appIconBingoOffline.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "https://apps.apple.com/us/app/bingo-offline/id6759448617",
            }
        }
    },
    {
        priority: 25,
        isPersonal: true,
        buildMethod: "mortals",
        title: "bidNplay",
        description: "A tournament management app for organizing competitions, player and team auctions, fixtures, registrations, and live match updates. Includes team and player profiles with performance information.",
        website: null,
        icon: "./app/resources/images/projects/appIconBidnPlay.jpeg",
        bannerImage: null,
        projectData: {
            type: "mobile-ios",
            ios: {
                url: "https://apps.apple.com/us/app/bidnplay/id6743826141",
            }
        }
    },
]
