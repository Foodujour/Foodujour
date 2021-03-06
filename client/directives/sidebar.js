// sidebar directive component for re-use
// used on all state views of site, excluding landing page
app.directive('sidebar', function() {
  return  {
    // use as attribute or element
    restrict: 'E',
    // use sidebar view as template
    templateUrl: '../views/sidebar.html',
    controller: 'SidebarController'
  };
});
