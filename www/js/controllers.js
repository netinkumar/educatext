angular.module('app.controllers', ['ngCordova', 'pdf'])

    .controller('splashCtrl', function ($scope) {

    })

    .controller('loginCtrl', function ($scope, $http, $state, $rootScope, $ionicHistory) {
        $scope.data = {};
        if (localStorage.getItem("userdata") != null) {
            $state.go('menu.home');
        }

        $scope.login = function () {

            $scope.mydata = $scope.data.loginform;
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/userlogin",
                data: $scope.mydata,
            }).success(function (success) {
                console.log(success)
                if (success.msg == "true") {
                    localStorage.setItem("userdata", JSON.stringify(success.user_data[0]));
                    
					
					$ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
					$state.go('menu.home');
					
					
					
                    console.log(JSON.parse(localStorage.getItem("userdata")))
                }





            }).error(function (err) {
                console.log(err)
            })

        }
    })
    .controller('videosCtrl', function ($scope, $http, $state, $rootScope, $window, $stateParams) {
       
        $scope.userdata=JSON.parse(localStorage.getItem("userdata"));
        $scope.user_id=$scope.userdata.id;
        $scope.data = {}
        $scope.buttonClicked = false
        $scope.searchbutton= false;
        $scope.searchbar = function () {
            $scope.buttonClicked = !$scope.buttonClicked;
            if($scope.searchbutton==true){
                $scope.searchbutton= !$scope.searchbutton;
            }
        }

        
////////youtube api uncomment section todisplay youtube video///////////
            var youplayer
            $window.onYouTubeIframeAPIReady = function () {
                console.log('Youtube API is ready');
                youplayer = new YT.Player("player", {
                    height: "100%",
                    width: "100%",
                    videoId: 'eGmrAfEcgSo',
                    playerVars: {
                        rel: 0,
                        showinfo: 1,
                        controls: 1
                    },
                    events: {
                        'onStateChange': onYoutubeStateChange,
                        'onReady': onPlayerReady
                    }
                });
                return youplayer
            };
            function onYoutubeStateChange(event) {
                if (event.data == 0) {
                    $scope.hide_div = {
                        'display': "block"
                    };
                    $scope.hide_poster = {
                        'display': "block"
                    }
                }
                if (event.data == 1) {
                    $scope.hide_div = {
                        'display': "none"
                    };
                }
                $rootScope.$apply();
            }
            function onPlayerReady(event) {
                $scope.imgclick = function () {
                    $scope.hide_poster = {
                        'display': "none"
                    }
                    youplayer.playVideo();
                };

            }
/////////////////////

$scope.iframe = function () {
    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
$scope.iframe();


        $scope.search=function(){
            $scope.searchbutton= !$scope.searchbutton;
            if($scope.buttonClicked==true){
                $scope.buttonClicked = !$scope.buttonClicked;
            }
        }
     $scope.search_video=function(searchterm){
            if(searchterm.length>2){
                $scope.postdata={
                    search: searchterm,
                }
                $http({
                    method: "POST",
                    url: "http://netin.crystalbiltech.com/xamarine/api/catageory/get_searched_videos",
                    data: $scope.postdata
                }).success(function(success){
                    console.log(success)
                    if(success.videos.length>0){
                        $scope.videos=success.videos;
                    }
                 }).error(function(error){
                    console.log(error)
                })
            }


        }

        $scope.getcatageory=function(){
            $http({
                method: "GET",
                url: "http://netin.crystalbiltech.com/xamarine/api/catageory/getcategories",
           
            }).success(function(success){
                console.log(success)
                $scope.video_cat=success.categories;
            }).error(function(error){
                console.log(error)
            })
        }
        $scope.getcatageory();


        $scope.getvodeos=function(){
            $scope.userdata=JSON.parse(localStorage.getItem("userdata"));
            $scope.user_id=$scope.userdata.id;
            $scope.postdata = {
                user_id: $stateParams.stu_id,
            }
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/getvideos",
                data:$scope.postdata
            }).success(function(sucess){
                console.log(sucess)
               $scope.videos=sucess.videos;
               $scope.$broadcast('scroll.refreshComplete');
            }).error(function (error) {
                console.log(error)
                $scope.$broadcast('scroll.refreshComplete');
            })

        }
        $scope.getvodeos();

        $scope.change_video=function(video_id){
            youplayer.loadVideoById(video_id)
        }





        $scope.submiturl = function () {
            
            console.log($scope.data.form1)
         var url =  $scope.data.form1.utubeurl;
            var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid != null) {
           $scope.video_id="https://www.youtube.com/embed/"+videoid[1];
           $scope.postdata = {
            uid: $stateParams.stu_id,
            posturl:  $scope.video_id,
            cat_id: $scope.data.form1.videocat,
            video_id: videoid[1],
        }
        console.log($scope.postdata)
           $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/savevideos",
            data: $scope.postdata,
        }).success(function (sucess) {
            console.log(sucess);
            $scope.data.form1.utubeurl="";
            $scope.buttonClicked = false       
            $scope.getvodeos();
           // alert("Uploaded Sucessfully");
        }).error(function (error) {
            console.log(error)
        })
            } else { 
             alert("The youtube url is not valid.");
            }
  }
 })

    .controller('signUpCtrl', function ($scope, $http, $state, $rootScope) {
        $scope.data = {};
        $scope.errormsg="";
        $scope.register = function () {
            $scope.mydata = $scope.data.formdata;
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/usersave",
                data: $scope.mydata,
            }).success(function (success) {
                console.log(success)
                if (success.user_id.status == "false") {
                    if (angular.isDefined(success.user_id.msg)) {
                        alert(success.user_id.msg)
                        $scope.errormsg=success.user_id.msg;
                    } else {
                        alert("registration unsuccessfull");
                    }

                } else {
                    $state.go('login');
                }
            }).error(function (err) {
                console.log(err)
            })
        }
    })

    .controller('logoutCtrl', function ($scope, $state, $ionicHistory) {
        $scope.data = {};
        $scope.logout = function () {
            alert("Successfully Logout ");
			$ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            $state.go('login');


        }
    })
    .controller('homeCtrl', function ($scope, $http, $rootScope, $state) {
        $scope.userdata = JSON.parse(localStorage.getItem("userdata"));
        $scope.id = $scope.userdata.id;
        $http({
            method: "GET",
            url: 'http://netin.crystalbiltech.com/xamarine/api/authorapi/todaysquote',
        }).then(function (success) {
            console.log(success);
            if (success.data.length > 0) {

                $scope.todayquote = success.data[0].todayquote;
                $scope.authorname = success.data[0].authorfname + " " + success.data[0].authorlname;

            }



        }, function (error) {
            console.log(error);
        })

        $scope.goto = function () {

            $state.go('menu.selectteacher', { student_id: $scope.id })
        }





    })


    .controller('selectteacherCtrl', function ($scope, $http, $stateParams, $rootScope, $state) {
        console.log($stateParams);
        $scope.studentid = $stateParams.student_id;
        $http({
            method: "POST",
            url: 'http://netin.crystalbiltech.com/xamarine/api/Welcomead/getteacherlist',
            data: $stateParams,
        }).then(function (success) {
            console.log(success);
            $scope.list = success.data.alllist;
        }, function (error) {
            console.log(error)
        })

        $scope.follow = function (sid, tid) {
            console.log(sid + "," + tid);
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/followteacher",
                data: { s_id: sid, t_id: tid }
            }).then(function (success) {
                console.log(success)
                $scope.list = success.data.alllist;
            }, function (error) {
                console.log(error)
            })
        }

        $scope.unfollow = function (sid, tid) {
            console.log(sid + "," + tid);
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/unfollowteacher",
                data: { s_id: sid, t_id: tid }
            }).then(function (success) {
                console.log(success)
                $scope.list = success.data.alllist;
            }, function (error) {
                console.log(error)
            })
        }
    })


    .controller('addACategoryCtrl', function ($scope) {

    })

    .controller('selectCategoryCtrl', function ($scope, $http, $rootScope) {
        $scope.noMoreItemsAvailable = false;
        var j = 0;
        $scope.cat_data = [];
        $scope.loadMore = function () {
            j++;
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/getcatageory",
                data: { page: j },
            }).then(function (sucess) {
                console.log(sucess);
                $scope.imagebaseurl = sucess.data.imagebaseurl;
                if (parseInt(sucess.data.totalPages) > 0) {
                    angular.forEach(sucess.data.result, function (value, index) {
                        value.image = $scope.imagebaseurl + value.image;
                        $scope.cat_data.push(value);
                    }, this);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                if (sucess.data.totalPages == j || sucess.data.totalPages == 0) {
                    $scope.noMoreItemsAvailable = true;
                }
            }, function (error) {
                console.log(error)
            })
        }
        $scope.$on('$stateChangeSuccess', function () {
            $scope.loadMore();
        });
        console.log($scope.cat_data);
    })
    .controller('selectGradeCtrl', function ($scope, $http, $rootScope, $stateParams) {
        console.log($stateParams.catid);

        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/getgrade",
            data: { catid: $stateParams.catid },
        }).then(function (success) {
            console.log(success)
            $scope.imagebaseurl = success.data.imagebaseurl;
            $scope.classes = success.data.classes;



        }, function (error) {
            console.log(error);
        })



    })
    .controller('qaCtrl', function ($scope, $http, $rootScope, $stateParams, tagremove, $cordovaSocialSharing) {

        $scope.shareburl = "";
        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/getqa",
            data: $stateParams,
        }).then(function (success) {
            console.log(success)
            $scope.qa = success.data.allqa;
            $scope.shareburl = success.data.sharelink;
        }, function (error) {
            console.log(error)
        })

        $scope.share = function (q, a, id) {
            $scope.msg = "Q." + tagremove.opdata(q) + " A." + tagremove.opdata(a);
            $scope.sharelink = $scope.shareburl + id;
            console.log($scope.sharelink)
            $cordovaSocialSharing.share($scope.msg, null, null, $scope.sharelink).then(function (success) {
                alert(JSON.stringify(success))
            }, function (error) {
                console.log(error);
            })

        }
    })



    .controller('teachalertdataCtrl', function ($scope, $http, $rootScope, $stateParams, $window, tagremove, $ionicPopup, $cordovaSocialSharing) {
        var audioElement = document.createElement('audio');
         audioElement.setAttribute('src', '/android_asset/www/audio/beep.mp3');
         audioElement.play();
console.log($stateParams)

        // $http({
        //     method: "POST",
        //     url: "http://netin.crystalbiltech.com/xamarine/api/welcomead/teachalerts",
        //     data: $stateParams,
        // }).then(function (success) {
        //     console.log(success)
        //     $scope.alerts = success.data.alerts;
        // }, function (error) {
        //     console.log(error)
        // })


$http({
    method: "POST",
    url: "http://netin.crystalbiltech.com/xamarine/api/catageory/getteahalertcat",
}).then(function(success){
    console.log(success.data)
    $scope.catagory=success.data;
}, function(error){
    console.log(error)
})


var popup=""
        $scope.share = function (content) {
             popup = $ionicPopup.show({
                title: 'Send Alert',
                buttons: [
                    {
                        text: 'SMS',
                        onTap: function (e) {
                            $cordovaSocialSharing
                                .shareViaSMS(tagremove.opdata(content), null)
                                .then(function (result) {
                                    // Success!
                                }, function (err) {
                                    // An error occurred. Show a message to the user
                                });
                        }
                    },
                    {
                        text: '<b>Email</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $cordovaSocialSharing
                                .shareViaEmail(tagremove.opdata(content), "TEACH ALERT", null, null, null, null)
                                .then(function (result) {
                                    // Success!
                                }, function (err) {
                                    // An error occurred. Show a message to the user
                                });
                        }
                    },
                    {
                        text: '<b>Cancel</b>',
                        type: 'button-danger',
                        onTap: function (e) {
                           
                        }
                    }
                ]
            })


            console.log(content);
        }

    })

    .controller('vocabularyCtrl', function ($scope) {

    })

    .controller('mathCtrl', function ($scope) {

    })

    .controller('benjaminFranklinCtrl', function ($scope) {

    })

    .controller('selectAuthorCtrl', function ($scope, $stateParams, $http, $rootScope) {
        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/authorapi/getauthorlist",
        }).then(function (success) {
            console.log(success)
            $scope.authorlist = success.data.authors;
        }, function (error) {
            console.log(error)
        })

    })
    .controller('selectAuthorquotesCtrl', function ($scope, $rootScope, $http, $stateParams) {

        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/authorapi/getauthorquotes",
            data: $stateParams,
        }).then(function (success) {
            console.log(success)
            $scope.authorquotes = success.data.quotes;
        }, function (error) {
            console.log(error)
        })



    })
    .controller('radioCtrl', function ($scope) {

    })

    .controller('ebookCtrl', function ($scope, $http, $rootScope, $stateParams) {


        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/getebookcat",
        }).then(function (success) {
            console.log(success)
            $scope.categories = success.data.ebookcat;
        }, function (error) {
            console.log(error)
        })


    })

    .controller('ebookgroupCtrl', function ($scope, $rootScope, $http, $window, $stateParams) {

        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/getebook",
            data: $stateParams,
        }).then(function (success) {
            console.log(success)
            $scope.ebooks = success.data.ebooks;
            $scope.pdfb_url = success.data.pdfb_url;
        }, function (error) {
            console.log(error)
        })

        $scope.OpenLink = function (link) {
            alert(link)
            window.open(link, '_system');
        };
    })
    .controller('audioCtrl', function ($scope, $http, $rootScope, $stateParams, $cordovaMedia) {
        $scope.audiob_url = "";
        $http({
            metod: "GET",
            url: "http://netin.crystalbiltech.com/xamarine/api/Catageory/getaudios",
        }).then(function (success) {
            console.log(success)
            $scope.audios = success.data.audio;
            $scope.audiob_url = success.data.baseurl;
        }, function (error) {
            console.log(error)
        })
        var audioElement = document.createElement('audio');
        $scope.play = function (name) {
            console.log($scope.audiob_url + name);

            audioElement.setAttribute('src', $scope.audiob_url + name);
            audioElement.addEventListener('loadedmetadata', function () {
                audioElement.play();
                $scope.duration = audioElement.duration;
                $scope.currenttime = audioElement.currentTime;
                console.log(audioElement.currentSrc)
                console.log($scope.duration)
            });
        }
        $scope.stop = function () {
            audioElement.pause();
            audioElement.currentTime = 0;
        }


    })


    .controller('noteCtrl',
    function ($scope, $state, $stateParams, $ionicScrollDelegate, $ionicPopup, $timeout, $cordovaFileTransfer) {
        // An alert dialog
        $scope.userdata = JSON.parse(localStorage.getItem("userdata"));
        $scope.stuid = $scope.userdata.id;
    })

    .controller('textnoteCtrl', function ($scope, $http, $state, $stateParams, $ionicScrollDelegate, $ionicPopup, $timeout, $cordovaFileTransfer) {

        $scope.data = {};

        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/getstunotes",
            data: { stu_id: $stateParams.stu_id },
        }).then(function (success) {
            console.log(success)
            $scope.docfiles = success.data.docs;
            $scope.burl = success.data.docbase_url;
        }, function (error) {
            console.log(error)
        })

        $scope.showAlert = function () {
            var myPopup = $ionicPopup.show({
                title: 'Write Note',
                template: '<textarea  class="form-control" placeholder="Enter your message" style="height:155px;padding:10px;" ng-model="data.notes"></textarea>',
                scope: $scope,
                cssClass: 'custombutton3',
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $http({
                                method: "POST",
                                url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/textnotes",
                                data: { note: $scope.data.notes, stu_id: $stateParams.stu_id }
                            }).then(function (success) {
                                alert(JSON.stringify(success))
                                console.log(success)
                            }, function (error) {
                                console.log(error)
                            })
                            console.log($scope.data)
                        }
                    }
                ]
            });

        };
    })



    .controller('docnotesCtrl', function ($scope, $state, $http, $stateParams, $ionicScrollDelegate, $ionicPopup, $timeout, $cordovaFileTransfer) {
        $scope.burl = "";
        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/getstunotes",
            data: { stu_id: $stateParams.stu_id },
        }).then(function (success) {
            console.log(success)
            $scope.docfiles = success.data.docs;
            $scope.burl = success.data.docbase_url;
        }, function (error) {
            console.log(error)
        })
        $scope.choosefile = function () {
            fileChooser.open(function (path) {
                $scope.Data = {
                    student_id: $stateParams.stu_id,
                }

                $scope.option = {
                    fileKey: "fileUpload",
                    fileName: path.substr(path.lastIndexOf('/') + 1),
                    httpMethod: "POST",
                    chunkedMode: false,
                    params: $scope.Data
                }
                $cordovaFileTransfer.upload('http://netin.crystalbiltech.com/xamarine/api/ebookapi/notesupload', path, $scope.option).then(function (success) {

                }, function (eror) {
                    alert(JSON.stringify(eror))
                }, function (progress) {
                    console.log(progress)
                })



            }, function (error) {
                alert(JSON.stringify(error))
            });
        }


        $scope.downloadfile = function (name) {

            var url = $scope.burl + name;

            var targetPath = cordova.file.externalRootDirectory + name;
            var trustHosts = true;

            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function (result) {
                    alert(JSON.stringify(result))
                }, function (err) {
                    alert(JSON.stringify(err))
                }, function (progress) {
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                });

        }



    })

    .controller('contactUsCtrl', function ($scope) {

    })

    .controller('aboutUsCtrl', function ($scope, $stateParams, $rootScope, $http) {

        $http({
            method: "GET",
            url: "http://netin.crystalbiltech.com/xamarine/api/welcomead/getabout",
        }).then(function (success) {
            console.log(success)
            $scope.about = success.data.about;
        }, function (error) {
            console.log(error)
        })



    })

    .controller('albertEinsteinCtrl', function ($scope, $rootScope, $http, $stateParams) {
        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/ebookapi/getsinglebook",
            data: $stateParams,
        }).then(function (success) {
            console.log(success)
            $scope.pdfb_url = success.data.pdfb_url;
            $scope.pdffile = success.data.book;
        }, function (error) {
            console.log(error)
        })


    })
    .controller('profileCtrl', function ($scope, $rootScope, $http) {
        //alert($rootScope.user_id)
        $scope.userdata = JSON.parse(localStorage.getItem("userdata"));
        $scope.id = $scope.userdata.id;
        console.log($scope.id);
        $http({
            method: "POST",
            url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/userprofile",
            data: { userid: $scope.id }
        }).then(function (success) {
            console.log(success)
            $scope.uservalues = success.data.userdata;
            $scope.baseurl = success.data.imgburl;



        }, function (error) {
            console.log(error)
        })


    })
    .controller('editProfileCtrl', function ($scope, $http, $ionicActionSheet, $cordovaCamera) {
        $scope.data = {}
        $scope.userdata = JSON.parse(localStorage.getItem("userdata"));
        $scope.id = $scope.userdata.id;
        console.log($scope.id);
        $scope.userdata = function () {
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/userprofile",
                data: { userid: $scope.id }
            }).then(function (success) {
                console.log(success)
                $scope.uservalues = success.data.userdata;
                $scope.baseurl = success.data.imgburl;
                $scope.data.update = {
                    fname: success.data.userdata[0].f_name,
                    lname: success.data.userdata[0].l_name,
                    email: success.data.userdata[0].email,
                }


            }, function (error) {
                console.log(error)
            })
        }
        $scope.userdata();
        $scope.actionsheet = function () {
            var showActionSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Take Photo' },
                    { text: 'Choose Photo' }
                ],
                titleText: 'Action Sheet',
                cancelText: 'Cancel',

                cancel: function () {
                    // add cancel code...
                },

                buttonClicked: function (index) {
                    if (index === 0) {
                        // add edit 1 code
                        $scope.picture(1)
                        return true;
                    }

                    if (index === 1) {
                        // add edit 2 code
                        $scope.picture(0)
                        return true;
                    }
                }
            });
        }

        $scope.picture = function (a) {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: a,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(function (imagedata) {
                // alert(JSON.stringify(imagedata));
                $http({
                    method: "POST",
                    url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/updateimg",
                    data: { id: $scope.id, image: imagedata }
                }).then(function (success) {
                    if (success.data.status == 1) {
                        $scope.userdata();
                    }
                }, function (error) {
                    alert(JSON.stringify(error))
                })
            })


            //alert(a);
        }
        $scope.eprofile = function () {
            console.log($scope.data.update)

            $scope.data.update.user_id = $scope.id
            $http({
                method: "POST",
                url: "http://netin.crystalbiltech.com/xamarine/api/Welcomead/updateprofile",
                data: { userinfo: $scope.data.update }
            }).then(function (success) {
                console.log(success)
                $scope.uservalues = success.data.userdata;
                $scope.baseurl = success.data.imgburl;
            }, function (error) {
                console.log(error)
            })
        }




    })
    .controller('subjectCtrl', function ($scope, $http, $stateParams) {
        console.log($stateParams)
        $http({
            method: "POST",
            url: 'http://netin.crystalbiltech.com/xamarine/api/Catageory/getsub',
            data: $stateParams,
        }).then(function (success) {
            console.log(success)
            $scope.subjects = success.data.subjects;

        }, function (error) {
            console.log(error)
        })
    })


    .controller('WordsCtrl', function ($scope, $state, $http) {
		
        $scope.data ={};
         $scope.autoshow = function () {
			console.log($scope.data.keyword)
            if ($scope.data.keyword == "") {
                $scope.show = 0;
            }
          
        } 
		  $scope.findword = function () {
				
 console.log($scope.data.keyword)
                var config = {
                    headers: {
                        'X-Mashape-Key': 'VTe1rBKN7ImshuSOEVszOg9mAjhlp17wDEwjsnWvxTa3v0FjGY',
                        "Accept": "application/json"
                    }
                };
                //$scope.data.keyword = 'small'
                console.log($scope.data.keyword);
                $http.get('https://wordsapiv1.p.mashape.com/words/' + $scope.data.keyword, config).success(function (res) {
                    
                    $scope.show = 1;
                    $scope.meaning = res.pronunciation;
                    console.log($scope.meaning);
                    $scope.result = res.results;

                }).error(function(error){
					
				});

            }
    })




