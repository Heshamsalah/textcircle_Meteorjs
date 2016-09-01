this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");
Comments = new Mongo.Collection("comments");
j = new Mongo.Collection("jjjjjj");

Comments.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  body: {
    type: String,
    label: "Comment",
    max: 1000
  },
  docid: {
    type: String
  },
  owner: {
    type: String
  }
}));





Meteor.methods({
  addEditingUser(docid){
    var doc, user, eusers;
    doc = Documents.findOne({_id: docid});
    if(!doc){return;}
    if(!this.userId){return;}
    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({docid: doc._id});
    if(!eusers){
      eusers = {
        docid: doc._id,
        users: {},
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;
    EditingUsers.upsert({_id: eusers._id},eusers);
  },
  addDoc(){
    var doc;
    if(!this.userId){
      return;
    }
    else {
      doc = {owner: this.userId, createdOn: new Date(), title: "My new Doc"};
      var id = Documents.insert(doc);
      return id;
    }
  },
  updateDocPrivacy(doc){
    var realDoc = Documents.findOne({_id: doc._id, owner: this.userId});
    if(realDoc){
      realDoc.isPrivate = doc.isPrivate;
      Documents.update({_id: doc._id}, realDoc);
    }
  },
  addComment(comment){
    if(this.userId){
      console.log(comment);
      console.log(this.userId);
      comment.owner = this.userId;
      comment.createdOn = new Date();
      comment.userId = this.userId;
      return Comments.insert(comment);
    }
    return;
  }
});
