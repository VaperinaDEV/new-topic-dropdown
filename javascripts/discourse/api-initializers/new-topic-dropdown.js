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
        const newTopicDrop = document.querySelector(".select-kit.new-topic-dropdown");
        const newTopicDropHeader = document.querySelector(".select-kit.new-topic-dropdown .select-kit-header");
        
        newTopicDropHeader.addEventListener("click", () => {
          document.body.classList.toggle("new-topic-dropdown-expanded");
        });
        !newTopicDropHeader.addEventListener("click", () => {
          document.body.classList.remove("new-topic-dropdown-expanded");
        });
      });
    });
  },
};
