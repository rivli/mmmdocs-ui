<template>
  <v-dialog v-model="dialog" scrollable max-width="900px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>Quik tutorial</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>Quik Tutorial</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <v-container>
          <p>
            Here are some examples of markdown syntax. More information can be
            found
            <a
              href="https://guides.github.com/features/mastering-markdown/"
              target="blacn"
              >here</a
            >.
          </p>
          <h2 class=" my-3">Headers</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                # Big header <br />
                ## Smaller one <br />
                ### Smallest
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="# Biggest
## Smaller one
### Smallest"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Emphasis</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                *This text will be italic* <br />
                _This will also be italic_ <br />**This text will be bold**
                <br />
                __This will also be bold__ <br />
                _You **can** combine them_
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Lists</h2>
          <h3>Ordered</h3>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                1. Item 1 <br />
                1. Item 2 <br />
                1. Item 3 <br />
                1. Item 3a <br />
                1. Item 3b <br />
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <h3>Unordered</h3>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                * Item 1 <br />
                * Item 2 <br />
                * Item 2a <br />
                * Item 2b <br />
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="* Item 1
* Item 2
  * Item 2a
  * Item 2b"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Images</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                ![success](https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80)
                <br />
                <br />
                Format: ![Alt Text](url)
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="![success](https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80)
Format: ![Alt Text](url)
"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Links</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                http://github.com - automatic! <br />
                [GitHub](http://github.com)
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="http://github.com - automatic!
[GitHub](http://github.com)"
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Blockquotes</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                As Kanye West said:
                <br />
                > We're living the future so <br />
                > the present is our past.
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="As Kanye West said:

> We're living the future so
> the present is our past."
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <h2 class=" my-3">Inline code</h2>
          <v-row class="py-3">
            <v-col cols="12" sm="6">
              <code>
                I think you should use an `code here` element here instead.
              </code>
            </v-col>
            <v-col cols="12" sm="6">
              <VueShowdown
                markdown="I think you should use an
`code here` element here instead."
                flavor="github"
                :options="{ emoji: true }"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn color="pink" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueShowdown } from "vue-showdown";
export default {
  name: "quik-tutorial",
  props: ["text"],
  components: { VueShowdown },
  data() {
    return {
      dialogm1: "",
      dialog: false,
    };
  },
};
</script>

<style></style>
