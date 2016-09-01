import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if(!Documents.findOne()){
    Documents.insert({title: "my document"});
  }
});

Meteor.publish("documents", function(){
  return Documents.find({
    $or: [
      {isPrivate: {$ne: true}}, //$ne => not equal to
      {owner: this.userId}
    ]
    });
});
Meteor.publish("editingUsers", function(){
  return EditingUsers.find({});
});

Meteor.publish("comments", function(){
  return Comments.find({});
});
