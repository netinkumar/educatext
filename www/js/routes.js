angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $sceDelegateProvider.resourceUrlWhitelist(['self',"https://youtu.be/**",  "https://www.google.com/maps/embed/v1/place**", new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'), "http://vjs.zencdn.net/v/oceans**", "http://www.youtube.com/iframe_api**"]);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('login', {
    url: '/page2',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
  })

  .state('menu.signUp', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signUp.html',
        controller: 'signUpCtrl'
      }
    }
  })

  .state('menu.home', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('addACategory', {
    url: '/page5',
    templateUrl: 'templates/addACategory.html',
    controller: 'addACategoryCtrl'
  })

  .state('menu.selectCategory', {
    url: '/selectCategory',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectCategory.html',
        controller: 'selectCategoryCtrl'
      }
    }
  })
  .state('menu.selectGrade', {
    url: '/selectGrade/:catid',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectGrade.html',
        controller: 'selectGradeCtrl'
      }
    }
  })
  .state('menu.subject', {
    url: '/subject/:catid/:classid',
    views: {
      'side-menu21': {
        templateUrl: 'templates/subject.html',
        controller: 'subjectCtrl'
      }
    }
  })
  
    .state('menu.qa', {
    url: '/qa/:sub_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/qa.html',
        controller: 'qaCtrl'
      }
    }
  })

  .state('vocabulary', {
    url: '/page8',
    templateUrl: 'templates/vocabulary.html',
    controller: 'vocabularyCtrl'
  })

  .state('math', {
    url: '/page17',
    templateUrl: 'templates/math.html',
    controller: 'mathCtrl'
  })

  .state('benjaminFranklin', {
    url: '/page9',
    templateUrl: 'templates/benjaminFranklin.html',
    controller: 'benjaminFranklinCtrl'
  })

  .state('menu.selectAuthor', {
    url: '/selectAuthor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectAuthor.html',
        controller: 'selectAuthorCtrl'
      }
    }
  })

  .state('radio', {
    url: '/page10',
    templateUrl: 'templates/radio.html',
    controller: 'radioCtrl'
  })

  

.state('menu.ebook', {
    url: '/ebook',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ebook.html',
        controller: 'ebookCtrl'
      }
    }
  })

  .state('teachAlerts', {
    url: '/page13',
    templateUrl: 'templates/teachAlerts.html',
    controller: 'teachAlertsCtrl'
  })

  
  .state('menu.contactUs', {
    url: '/contactUs',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactUs.html',
        controller: 'contactUsCtrl'
      }
    }
  })
  

  
  
  .state('menu.aboutUs', {
    url: '/aboutUs',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'
      }
    }
  })

  .state('albertEinstein', {
    url: '/page16/:book_id',
    templateUrl: 'templates/albertEinstein.html',
    controller: 'albertEinsteinCtrl'
  })
  
  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('menu.editProfile', {
    url: '/editProfile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.Words', {
    url: '/Words',
    views: {
      'side-menu21': {
        templateUrl: 'templates/Words.html',
        controller: 'WordsCtrl'
      }
    }
  })
   .state('menu.audio', {
    url: '/audio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/audio.html',
        controller: 'audioCtrl'
      }
    }
  })
  .state('menu.ebookgroup', {
    url: '/ebookgroup/:cat_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ebookgroup.html',
        controller: 'ebookgroupCtrl'
      }
    }
  })
  .state('menu.selectAuthorquotes', {
    url: '/selectAuthorquotes/:author_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectAuthorquotes.html',
        controller: 'selectAuthorquotesCtrl'
      }
    }
  })
  .state('menu.selectteacher', {
    url: '/selectteacher/:student_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectteacher.html',
        controller: 'selectteacherCtrl'
      }
    }
  })
   .state('menu.teachalertdata', {
    cache: false,
    url: '/teachalertdata/:student_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/teachalertdata.html',
        controller: 'teachalertdataCtrl'
      }
    }
  })
    .state('menu.note', {
    url: '/note',
    views: {
      'side-menu21': {
        templateUrl: 'templates/note.html',
        controller: 'noteCtrl'
      }
    }
  })
     .state('menu.docnotes', {
    url: '/docnotes/:stu_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/docnotes.html',
        controller: 'docnotesCtrl'
      }
    }
  })
      .state('menu.textnote', {
    url: '/textnote/:stu_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/textnote.html',
        controller: 'textnoteCtrl'
      }
    }
  })
  
  .state('menu.videos', {
    url: '/videos/:stu_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/videos.html',
        controller: 'videosCtrl'
      }
    }
  })
  

$urlRouterProvider.otherwise('/page2')

  

});