import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "new-topic-float",
  
  initialize() {
    withPluginApi("0.8.7", (api) => {
      const site = api.container.lookup("site:main");

      if (!site.mobileView) {
        return;
      }
      
      api.onPageChange((url, title) => {
        const newTopicDropdown = document.querySelector(".new-topic-dropdown .select-kit-header");
        const isExpanded = document.querySelector.classList.contains(".new-topic-dropdown.is-expanded");
        
        newTopicDropdown.addEventListener("click", () => {
          document.body.classList.toggle("new-topic-dropdown-expanded");
        });
        if (isExpanded) {
          newTopicDropdown.addEventListener("blur", () => {
            document.body.classList.remove("new-topic-dropdown-expanded");
          });
        }
      });
    });
  },
};
