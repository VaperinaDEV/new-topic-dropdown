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
          const newTopicDropHeader = document.querySelector(".new-topic-dropdown .select-kit-header");
          if (!this.selectKit.isExpanded) {
            newTopicDropHeader.addEventListener("click", () => {
              document.body.classList.add("new-topic-dropdown-expanded");
            });
          } else if (this.selectKit.isExpanded) {
            document.body.classList.remove("new-topic-dropdown-expanded");
          }
        
          if (!this.selectKit.isExpanded || !this.selectKit.mainElement()) {
            return;
          }
      
          if (this.selectKit.mainElement().contains(event.target)) {
            return;
          }
      
          this.selectKit.close(event);
        },
      });
    });
  },
};
