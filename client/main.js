Meteor.subscribe("documents");
Meteor.subscribe("editingUsers");

Template.editingUsers.helpers({
  users(){
    var doc, eusers, users;
    doc = Documents.findOne({_id: Session.get("docId")});
    if(!doc){return;}
    eusers = EditingUsers.findOne({docid: doc._id});
    if(!eusers){return;}
    users = new Array();
    var i =0;
    for(var user_id in eusers.users){
      users[i] = fixObjectKeys(eusers.users[user_id]);
      i++;
    }
    return users;
  }
});



function fixObjectKeys(obj){
  var newObj = {};
  for(key in obj){
    newObj[key.replace("-", "")] = obj[key];
  }
  return newObj;
}



Template.editableText.helpers({
  userCanEdit(doc, Collection){
    doc = Documents.findOne({_id: Session.get("docId"), owner: Meteor.userId()});
    if(doc){
      return true;
    }
    else {
      return false;
    }
  }
});
