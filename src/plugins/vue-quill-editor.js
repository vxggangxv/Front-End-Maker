import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

var toolbarOptions = [
  // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  // ['blockquote', 'code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],

  // ['clean'] 

  [
    'bold', 
    'italic', 
    'underline', 
    'strike', 
    'blockquote', 
    'code-block', 
    { 'list': 'ordered'}, 
    { 'list': 'bullet' }, 
    { 'indent': '-1'}, 
    { 'indent': '+1' }, 
    { 'direction': 'rtl' },
    { 'size': ['small', false, 'large', 'huge'] },
    { 'header': [1, 2, 3, 4, 5, 6, false] },
    { 'color': [] }, { 'background': [] },
    { 'align': [] },
    'image',
  ],
  ['clean'],
  // [{ 'header': 1 }, { 'header': 2 }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],
  // [{ 'font': [] }],
];

var editorOption = {
  modules: {
   toolbar: {
     // container: '#toolbar',
     container: toolbarOptions,
    //  container: [
    //   ['bold', 'italic', 'underline', 'strike'],
    //   [{ 'header': 1 }, { 'header': 2 }],
    //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //   [{ 'script': 'sub'}, { 'script': 'super' }],
    //   [{ 'indent': '-1'}, { 'indent': '+1' }],
    //   [{ 'direction': 'rtl' }],
    //   [{ 'size': ['small', false, 'large', 'huge'] }],
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //   [{ 'color': [] }, { 'background': [] }],
    //   [{ 'font': [] }],
    //   [{ 'align': [] }],
    //   ['image'],
    // ],
    handlers: {
     'image': function(){
       console.log('hi');
        document.getElementById('getFile').click()
     }
    }
   } 
  }
}

Vue.use(VueQuillEditor, editorOption)
// Vue.use(VueQuillEditor)