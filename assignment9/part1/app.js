

  function AppViewModel() {
      var self = this;
 
    self.people = ko.observableArray([]);
 
   this.userComment = ko.observable();
    this.updateVal = function() {
       
        var currentVal = this.userComment();        // Read the current value
         self.people.push({ name: currentVal});
         this.userComment("");
    };
}
 
// Activates knockout.js
ko.applyBindings(new AppViewModel());