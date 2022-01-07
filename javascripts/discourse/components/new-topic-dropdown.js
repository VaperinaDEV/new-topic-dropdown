import { action } from "@ember/object";
import { getOwner } from "discourse-common/lib/get-owner";
import Composer from "discourse/models/composer";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";
import { computed } from "@ember/object";

export default DropdownSelectBoxComponent.extend({
  classNames: ["new-topic-dropdown"],

  selectKitOptions: {
    icons: ["th-list"],
    showFullTitle: false,
    autoFilterable: false,
    filterable: false,
    showCaret: true,
    none: "topic.create",
  },

  content: computed(function () {
    const hideForNewUser =
        settings.hide_from_new_users &&
        this.currentUser &&
        this.currentUser.trust_level === 0;
    const hideForAnon = settings.hide_from_anons && !this.currentUser;
    
    const items = [
      {
        id: "new_question",
        name: "Kérdésed van?",
        description: "Ne habozz, itt mindenki szívesen segít...",
        icon: "question-circle",
      },
    ];
    if (hideForNewUser || hideForAnon) {
      items.push({
        id: "new_ad",
        name: "Eladnál? Esetleg vennél?",
        description: "Hirdess gyorsan, egyszerűen...",
        icon: "tags",
      });
    }
    return items;
  }),

  @action
  onChange(selectedAction) {
  
    if (selectedAction === "new_question") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 16;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  
    if (selectedAction === "new_ad") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 1;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  },
});
