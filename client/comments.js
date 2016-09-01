Template.commentList.helpers({
  comments(){
    return Comments.find({docid: Session.get("docId")});
  }
});
