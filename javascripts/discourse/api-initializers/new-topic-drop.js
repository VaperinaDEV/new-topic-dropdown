import { withPluginApi } from "discourse/lib/plugin-api";
import { bind } from "discourse-common/utils/decorators";
import { schedule } from "@ember/runloop";

export default {
  name: "new-topic-float",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      const site = api.container.lookup("site:main");

      if (!site.mobileView) {
        return;
      }

      api.modifyClass("component:select-kit/select-kit-body", {
        pluginId: "select-kit-expanded",
        
        @bind
        handleClick(event) {

          const newTopicDropHeader = document.querySelector(".select-kit.new-topic-dropdown .select-kit-header");
          if (
            newTopicDropHeader && 
            !this.selectKit.isExpanded
          ) {
            newTopicDropHeader.addEventListener("click", () => {
              document.body.classList.add("new-topic-dropdown-expanded");
            });
          }

          const newTopicDropExpanded = document.body.classList.contains("new-topic-dropdown-expanded");
          if (
            newTopicDropExpanded && 
            this.selectKit.isExpanded &&
            !this.selectKit.mainElement().contains(event.target)
          ) {
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

      api.onPageChange((url, title) => {
        const newTopicDropExpanded = document.body.classList.contains("new-topic-dropdown-expanded");
        if (newTopicDropExpanded) {
          document.body.classList.remove("new-topic-dropdown-expanded");
        }
      });

      api.onAppEvent("composer:opened", () => {
        const newTopicDropExpanded = document.body.classList.contains("new-topic-dropdown-expanded");
        if (newTopicDropExpanded) {
          document.body.classList.remove("new-topic-dropdown-expanded");
        }
      });
    });
  },
};
