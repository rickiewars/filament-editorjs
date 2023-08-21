import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";
import Delimiter from "@editorjs/delimiter";
import { StyleInlineTool } from "editorjs-style";
import DragDrop from "editorjs-drag-drop";

document.addEventListener("alpine:init", () => {
  Alpine.data(
    "editorjs",
    ({ state, statePath, placeholder, readOnly, debugEnabled, tools, toolsOptions, minHeight }) => ({
      instance: null,
      state: state,
      tools: tools,
      uploadImage: function (blob) {
        return new Promise((resolve) => {
          this.$wire.upload(
            `componentFileAttachments.${statePath}`,
            blob,
            (uploadedFilename) => {
              this.$wire
                .getComponentFileAttachmentUrl(statePath)
                .then((url) => {
                  if (!url) {
                    return resolve({
                      success: 0,
                    });
                  }
                  return resolve({
                    success: 1,
                    file: {
                      url: url,
                    },
                  });
                });
            }
          );
        });
      },
      log: (...args) => debugEnabled && console.log(...args),
      init() {
        let enabledTools = {};

        this.log('EditorJS Alpine component initialized');
        this.log('State path:', statePath);
        this.log('State:', state);
        this.log('Placeholder:', placeholder);
        this.log('Read only:', readOnly);
        this.log('Tools:', tools);
        this.log('Tools options:', toolsOptions);
        this.log('Min height:', minHeight);

        if (this.tools.includes("header")) {
          enabledTools.header = {
            class: Header,
            inlineToolbar: true,
          };
        }
        if (this.tools.includes("image")) {
          const imageToolConfig = toolsOptions.hasOwnProperty('image') ? toolsOptions.image : {};
          const defaultConfig = {
            uploader: {
              uploadByFile: (file) => this.uploadImage(file),
              uploadByUrl: (url) => {
                return new Promise(async (resolve) => {
                  return fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => resolve(this.uploadImage(blob)));
                });
              },
            },
          };

          if (imageToolConfig.hasOwnProperty('endpoints')) {
            delete imageToolConfig.uploader;
          }

          enabledTools.image = {
            class: ImageTool,
            config: {
              ...defaultConfig,
              ...imageToolConfig,
            },
          };
        }
        if (this.tools.includes("delimiter"))
          enabledTools.delimiter = Delimiter;
        if (this.tools.includes("list")) {
          enabledTools.list = {
            class: List,
            inlineToolbar: true,
          };
        }
        if (this.tools.includes("underline"))
          enabledTools.underline = Underline;
        if (this.tools.includes("quote")) {
          enabledTools.quote = {
            class: Quote,
            inlineToolbar: true,
          };
        }
        if (this.tools.includes("table")) {
          enabledTools.table = {
            class: Table,
            inlineToolbar: true,
          };
        }
        if (this.tools.includes("raw")) enabledTools.raw = RawTool;
        if (this.tools.includes("code")) enabledTools.code = Code;
        if (this.tools.includes("inline-code"))
          enabledTools.inlineCode = InlineCode;
        if (this.tools.includes("style")) enabledTools.style = StyleInlineTool;
        this.instance = new EditorJS({
          holder: this.$el,
          minHeight: minHeight,
          data: this.state,
          placeholder: placeholder,
          readOnly: readOnly,
          tools: enabledTools,

          onChange: () => {
            this.instance.save().then((outputData) => {
              this.state = outputData;
            });
          },
          onReady: () => {
            new DragDrop(this.instance);
          },
        });
      },
    })
  );
});
