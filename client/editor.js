function getDoc(){
  var doc;
  if(!Session.get("docId")){
     doc = Documents.findOne();
     if(doc){
       Session.set("docId", doc._id);
     }
  }
}

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

        Meteor.call("addEditingUser", Session.get("docId"));
      }); //end of editor.on()
    }; //end of return
  }
});
