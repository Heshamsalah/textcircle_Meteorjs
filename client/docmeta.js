Template.docMeta.helpers({
  doc(){
    return Documents.findOne({_id: Session.get("docId")});
  },
  canEdit(){
    var doc = Documents.findOne({_id: Session.get("docId")});
    if(doc.owner == Meteor.userId()){
      return true;
    }
    else {
      return false;
    }
  }
});
Template.docMeta.events({
  'click .js-tog-private'(event){
    console.log(event.target.checked);
    var doc = {_id: Session.get("docId"), isPrivate: event.target.checked};
    Meteor.call("updateDocPrivacy", doc);
  }
});
