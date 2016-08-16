Template.navbar.helpers({
  docs(){
    return Documents.find();
  }
});

Template.navbar.events({
  'click .js-add-doc'(event){
    event.preventDefault();
    if(!Meteor.user()){
      alert("You need to login first!");
    }
    else {
      Meteor.call("addDoc", function(err, res){
        if(!err){
          Session.set("docId", res);
        }
      });
    }
  },
  'click .js-load-doc'(event){
    event.preventDefault();
    Session.set("docId", this._id);
  }
});
