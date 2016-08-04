Template.editor.helpers({
  docid(){
    getDoc();
    return Session.get("docId");
  },
  config(){
    return function(editor){
      editor.setOption("lineNumbers", true);
      editor.setOption("theme", "cobalt");

      //get the text from the editor
      editor.on("change", function(cm_editor, info){

        //find the iframe and get its html content
        var iframe_html_content = $("#viewer_iframe").contents().find("html");

        //inject the html of the iframe with the text
        //we get from the editor
        iframe_html_content.html(cm_editor.getValue());

        Meteor.call("addEditingUser");
      }); //end of editor.on()
    }; //end of return
  }
});

Template.editingUsers.helpers({
  users(){
    var doc, eusers, users;
    doc = Documents.findOne();
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

function getDoc(){
  var doc;
  if(!Session.get("docId")){
     doc = Documents.findOne();
     if(doc){
       Session.set("docId", doc._id);
     }
  }
}

function fixObjectKeys(obj){
  var newObj = {};
  for(key in obj){
    newObj[key.replace("-", "")] = obj[key];
  }
  return newObj;
}

Template.navbar.helpers({
  docs(){
    return Documents.find({});
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

Template.docMeta.helpers({
  doc(){
    return Documents.findOne({_id: Session.get("docId")});
  }
});

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
