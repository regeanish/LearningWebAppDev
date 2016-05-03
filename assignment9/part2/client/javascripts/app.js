/*globals ko*/
/*globals $*/

var Tabname = function (name, selected) {
    this.name = name;
    this.ifActive = ko.computed(function () {
        return this === selected();
    }, this);
};
function ToDoObj(data) {
    this.description = ko.observable(data.description);
    this.tags = ko.observableArray(data.tags);
}

function AppViewModel() {
    var self = this;

    self.activeTab = ko.observable();

    self.tabs = ko.observableArray([
        new Tabname('freshItem', self.activeTab),
        new Tabname('oldItem', self.activeTab),
        new Tabname('tagDesp', self.activeTab),
        new Tabname('addItem', self.activeTab)
    ]);
    
    self.activeTab(self.tabs()[0]);

    self.todos = ko.observableArray([]);
    self.new_description = ko.observable("");
    self.new_tags = ko.observable("");
    self.todoTags = ko.observable([]);

    function TagItems() {
        var tags = [];

        self.todos().forEach(function (toDo) {
            toDo.tags().forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        var tagObjects = tags.map(function (tag) {
            var updateTag = [];

            self.todos().forEach(function (toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    updateTag.push(toDo.description);
                }
            });

            return { "name": tag, "toDos": updateTag };
        });
        self.todoTags(tagObjects);
    }

    $.getJSON("/todos.json", function (data) {
        var Todos = $.map(data, function (item) { return new ToDoObj(item); });
        self.todos(Todos);
        TagItems();
    });

    self.addItem = function () {
        var description = self.new_description,
            tags = self.new_tags,
            new_tags = tags().split(','),
            newList = { "description": description, "tags": new_tags };

        if (description() !== "" && tags() !== "") {
            $.post("/todos", newList, function (data) {
                var Todos = $.map(data, function (item) { return new ToDoObj(item); });
                self.todos(Todos);
                TagItems();
            });
        }
        self.new_description("");
        self.new_tags("");
    };
}

ko.applyBindings(new AppViewModel());

