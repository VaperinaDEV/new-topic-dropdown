import { withPluginApi } from "discourse/lib/plugin-api";
import { bind } from "discourse-common/utils/decorators";

export default {
  name: "new-topic-float",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      const site = api.container.lookup("site:main");

      if (!site.mobileView) {
        return;
      }

      api.modifyClass("component:select-kit/select-kit-body", {
        pluginId: "select-kit-b",
        @bind
        handleClick(event) {
          this._super(...arguments);
        
          const newTopicDrop = document.querySelector(".new-topic-dropdown");
          if (newTopicDrop && !this.selectKit.isExpanded) {
            document.body.classList.add("new-topic-dropdown-expanded");
          } else if (newTopicDrop && this.selectKit.isExpanded) {
            document.body.classList.remove("new-topic-dropdown-expanded");
          }
        },
      });
    });
  },
};
