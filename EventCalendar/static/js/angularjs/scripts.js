var myCalendarApp = angular.module('myCalendarApp', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']).controller('calendarCtrl', calendarCtrl);

myCalendarApp.config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

function calendarCtrl($scope, moment, calendarConfig)
{
    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.cellIsOpen = false;
    vm.dateEvents = [];
    vm.events = [
//        {
//            title: 'An event',
//            color: {'primary': 'red', 'secondary': 'black'},
//            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
//            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
//            draggable: true,
//            resizable: true,
//            //        actions: actions
//        }, {
//            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
//            color: calendarConfig.colorTypes.info,
//            startsAt: moment().subtract(1, 'day').toDate(),
//            endsAt: moment().add(5, 'days').toDate(),
//            draggable: true,
//            resizable: true,
//            //        actions: actions
//        }, {
//            title: 'This is a really long event title that occurs on every year',
//            color: calendarConfig.colorTypes.important,
//            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
//            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
//            recursOn: 'year',
//            draggable: true,
//            resizable: true,
//            //        actions: actions
//        }
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
        vm.dateEvents = cell.events;
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
};

//myCalendarApp.config(function($routeProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl : "main.htm"
//    })
//});
