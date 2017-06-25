var app = angular.module("eventApp", ['ngRoute','mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module', 'ui.grid', 'ngMaterial', 'ngMessages']);

app.config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
     $routeProvider
         .when('/home', {
            templateUrl: '/static/js/angularjs/templates/myHome.html',
            controller: 'myHomeController as vm'
        })
        .when('/my_events', {
            templateUrl: '/static/js/angularjs/templates/myEvents.html',
            controller: 'myEventsController as vm'
        })
        .when('/my_calendar', {
            templateUrl: '/static/js/angularjs/templates/myCalendar.html',
            controller: 'myCalendarController as vm'
        })
        .when('/my_new_task', {
            templateUrl: '/static/js/angularjs/templates/newEvent.html',
            controller: 'newEventController as vm'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

app.service('APIService', function() {
    this.getEvents = function (type) {
        var events = [
            {
                "name": "Tiger Nixon",
                "position": "System\nArchitect",
                "office": "Edinburgh",
                "age": 61,
                "start date": '2011/04/25',
                "salary": '$320,800'
            },
            {
                "name": "Tiger Nixon",
                "position": "System Architect",
                "office": "Edinburgh",
                "age": 61,
                "start date": '2011/04/25',
                "salary": '$320,800'
            },
            {
                "name": "Tiger Nixon",
                "position": "System Architect",
                "office": "Edinburgh",
                "age": 61,
                "start date": '2011/04/25',
                "salary": '$320,800'
            }
        ];
        return events;
    };
    this.getAppearingForValues = function(){
        var allAppForValues = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
            Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
            Wisconsin, Wyoming';
        return allAppForValues;
    };

    this.getStageValues = function(){
        var allStages = '1, 2, 3, 4, 5, Colorado, Connecticut, Delaware,\
            Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
            Wisconsin, Wyoming';
        return allStages;
    };
});
//
app.controller('myHomeController', function($scope) {
    console.log('Home page');
});

app.controller('myEventsController', function($scope, APIService) {
    console.log('My Events');
    var vm = this;
    vm.showTable = true;
    vm.todayEvents = APIService.getEvents('Today');
    vm.upComingEvents = [];
    vm.pastEvents = [];
    vm.clickedTab = function(tab){
        switch(tab) {
            case 'Today Events':
                vm.todayEvents = APIService.getEvents(tab);
                break;
            case 'Upcoming Events':
                vm.upComingEvents = APIService.getEvents(tab);
                break;
            case 'Past Events':
                vm.pastEvents = APIService.getEvents(tab);
                break;
            default:
                return [];
        };
    }
});

app.controller('myCalendarController', function($scope, moment, calendarConfig) {
    console.log('My Calendar');
    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.cellIsOpen = false;
    vm.events = [
        {
            title: 'An event',
            color: {'primary': 'red', 'secondary': 'black'},
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            //        actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            color: calendarConfig.colorTypes.info,
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            //        actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            //        actions: actions
        }
    ];

    vm.addEvent = function() {
        vm.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

    vm.eventClicked = function(event) {
        alert('Clicked', event);
    };

    vm.eventEdited = function(event) {
        alert('Edited', event);
    };

    vm.eventDeleted = function(event) {
        alert('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
        alert('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {
        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }
    };
});

app.controller('navCtrl', function($scope, $mdDialog) {
//    console.log('New Event');
    var self = this;
//    self.openDialog = function($event) {
//      $mdDialog.show({
//        controller: DialogCtrl,
//        controllerAs: 'ctrl',
//        templateUrl: '/static/js/angularjs/templates/newEvent.html',
//        parent: angular.element(document.body),
//        targetEvent: $event,
//        clickOutsideToClose:true
//      })
//    }
//    function DialogCtrl ($timeout, $q, $scope, $mdDialog) {
//        var self = this;
//
//        // list of `state` value/display objects
//        self.states        = loadAll();
//        self.querySearch   = querySearch;
//
//        // ******************************
//        // Template methods
//        // ******************************
//
//        self.close = function($event) {
//          $mdDialog.cancel();
//        };
//        self.Add = function($event) {
//            alert('Saved');
////          $mdDialog.hide();
//        };
//
//        // ******************************
//        // Internal methods
//        // ******************************
//
//        /**
//         * Search for states... use $timeout to simulate
//         * remote dataservice call.
//         */
//        function querySearch (query) {
//          return query ? self.states.filter( createFilterFor(query) ) : self.states;
//        }
//
//        /**
//         * Build `states` list of key/value pairs
//         */
//        function loadAll() {
//          var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//                  Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//                  Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//                  Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//                  North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//                  South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//                  Wisconsin, Wyoming';
//
//          return allStates.split(/, +/g).map( function (state) {
//            return {
//              value: state.toLowerCase(),
//              display: state
//            };
//          });
//        }
//
//        /**
//         * Create filter function for a query string
//         */
//        function createFilterFor(query) {
//          var lowercaseQuery = angular.lowercase(query);
//
//          return function filterFn(state) {
//            return (state.value.indexOf(lowercaseQuery) === 0);
//          };
//
//        }
//    }
});

app.controller('newEventController', function($scope, APIService) {
    console.log('New Event');
    var vm = this;
    vm.selectedAll = false;
    vm.newEvent = {
        'parties': []
    }

    vm.addParty = function(){

        vm.newEvent.parties.push({
            'selected': false,
            'name': '',
            'mobile': '',
            'email': ''
        });
        vm.selectedAll = false;
    };

    vm.removeParty = function(){
        var parties = [];
        for(var p=0; p<vm.newEvent.parties.length; p++){
            if(vm.newEvent.parties[p].selected==false){
                parties.push(vm.newEvent.parties[p]);
            }
        }
        vm.newEvent.parties = parties;
    };

    vm.checkAll = function(){
        for(var q=0; q<vm.newEvent.parties.length; q++){
            vm.newEvent.parties[q].selected = !vm.selectedAll;
        }
    };

    vm.updateSelectedAll = function(index, selected){
        var sel_array = [];
        for(var r=0; r<vm.newEvent.parties.length; r++){
            sel_array.push(vm.newEvent.parties[r].selected);
        }
        sel_array[index] = !selected;
        if(sel_array.indexOf(false)== -1){
            vm.selectedAll = true;
        }else{
            vm.selectedAll = false;
        }
    }

    // For AUTOCOMPLETE  Appearing For
    vm.appearing_for = getAppearingValues();
    vm.appForQuerySearch   = function(query) {
        return query ? vm.appearing_for.filter( createFilterFor(query) ) : vm.appearing_for;
    };
    function getAppearingValues() {
        var allAppValues =  APIService.getAppearingForValues();
        return allAppValues.split(/, +/g).map( function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    };

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    };

    // For AUTOCOMPLETE  Stage
    vm.stage = getStageValues();
    vm.StageQuerySearch   = function(query) {
        return query ? vm.stage.filter( createFilterFor(query) ) : vm.stage;
    };
    function getStageValues() {
        var allStageValues =  APIService.getStageValues();
        return allStageValues.split(/, +/g).map( function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    };

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    };
});

