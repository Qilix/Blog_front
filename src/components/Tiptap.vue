<template>
  <div
      class="example">

    <quill-editor
        class="editor"
        ref="myTextEditor"
        :value="content"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
    />

  </div>
</template>

<script>
import dedent
  from "dedent";
import hljs
  from "highlight.js";
import debounce
  from "debounce";
import {quillEditor} from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

export default {
  name: "quill-example-snow",
  title: "Theme: snow",
  components: {
    quillEditor,
  },

  props: {
    content: String,
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{header: 1}, {header: 2}],
            [{list: "ordered"}, {list: "bullet"}],
            [{script: "sub"}, {script: "super"}],
            [{size: ["small", false, "large"]}],
            [{color: []}, {background: []}],
            ["clean"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: dedent``,
    };
  },

  methods: {
    onEditorChange: debounce(function (value) {
      this.content = value.html;
      this.$emit('customChange', this.content)
    }, 466),
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },

  mounted() {
    console.log(this.content)
    console.log("this is Quill instance:", this.editor);
  },
};
</script>

<style
    lang="scss"
    scoped>
.example {
  display: flex;
  flex-direction: column;

  .editor {
    height: 40rem;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>