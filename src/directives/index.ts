import { App, Directive } from "vue";
import { ClickOutside } from "./ClickOutside";
type DirectiveItem = {
  name: string;
  directive: Directive;
};
const directives: Array<DirectiveItem> = [
  {
    name: "clickOutside",
    directive: ClickOutside,
  },
];

export function install(app: App<Element>) {
  for (let i = 0; i < directives.length; i++) {
    let { name, directive } = directives[i];
    app.directive(name, directive);
  }
}
