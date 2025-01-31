export default {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
          align: null
        },
        content: [
          {
            type: "text",
            text: "Hello"
          }
        ]
      },
      {
        type: "paragraph",
        attrs: {
          align: null
        },
        content: [
          {
            type: "text",
            text: "This is editable text. "
          },
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "#d93f0b"
                }
              }
            ],
            text: "You can focus it and start typing"
          },
          {
            type: "text",
            text: "."
          }
        ]
      },
        {
          type: "paragraph",
          attrs: {
            align: null
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "code"
                }
              ],
              text: "code block"
            }
          ]
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              attrs: {
                align: null
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "strong"
                    }
                  ],
                  text: "Lorem Ipsum"
                },
                {
                  type: "text",
                  text: " is "
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "text_background_color",
                      attrs: {
                        backgroundColor: "#fbca04"
                      }
                    }
                  ],
                  text: "simply dummy"
                },
                {
                  type: "text",
                  text: " text of the printing and typesetting industry. "
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "em"
                    }
                  ],
                  text:
                    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                },
                {
                  type: "text",
                  text:
                    ", when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          attrs: {
            level: 2,
            align: null
          },
          content: [
            {
              type: "text",
              text: "The code block is a code editor"
            }
          ]
        },
        {
          type: "paragraph",
          attrs: {
            align: null
          },
          content: [
            {
              type: "text",
              text:
                "This editor has been wired up to render code blocks as instances of the "
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://codemirror.net",
                    title: "https://codemirror.net",
                    target: "_blank"
                  }
                }
              ],
              text: "CodeMirror"
            },
            {
              type: "text",
              text: " code editor, which provides "
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://en.wikipedia.org",
                    title: "",
                    target: "_blank"
                  }
                }
              ],
              text: "syntax highlighting"
            },
            {
              type: "text",
              text: ", auto-indentation, and similar."
            }
          ]
        },
        {
          type: "code_block",
          content: [
            {
              type: "text",
              text: "function max(a, b) {\n  return a > b ? a : b\n}"
            }
          ]
        },
        {
          type: "paragraph",
          attrs: {
            align: null
          },
          content: [
            {
              type: "text",
              text:
                "The content of the code editor is kept in sync with the content of the code block in the rich text editor, so that it is as if you're directly editing the outer document, using a more convenient interface."
            }
          ]
        },
        {
          type: "heading",
          attrs: {
            level: 4,
            align: "center"
          },
          content: [
            {
              type: "text",
              text: "Mr. Bean"
            }
          ]
        },
        {
          type: "paragraph",
          attrs: {
            align: "center"
          },
          content: [
            {
              type: "text",
              text: "The image is resizable. Include "
            },
            {
              type: "text",
              marks: [
                {
                  type: "strong"
                }
              ],
              text: "image"
            },
            {
              type: "text",
              text: " plugin to enable image resizing"
            }
          ]
        },
        {
          type: "heading",
          attrs: {
            level: 3,
            align: "center"
          },
          content: [
            {
              type: "image",
              attrs: {
                src: "https://wallpapercave.com/wp/wp2318909.png",
                alt: "Bean",
                title: "Mr. Bean",
                width: "98px"
              }
            }
          ]
        }
    ]
  };
  