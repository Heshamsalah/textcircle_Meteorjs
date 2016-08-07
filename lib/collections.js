this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

Meteor.methods({
  addEditingUser(){
    var doc, user, eusers;
    doc = Documents.findOne();
    if(!doc){return;}
    console.log(this.userId + " " + Meteor.userId() + "m m" + Meteor.user()._id);
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
  }
});
