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
    showCaret: false,
    none: "topic.create",
  },

  content: computed(function () {
    
     const items = [
      {
        id: "new_question",
        name: "Kérdésed van?",
        description: "Ne habozz, itt mindenki szívesen segít...",
        icon: "question-circle",
      },
    ];

    items.push({
      id: "new_ad",
      name: "Eladnál? Esetleg vennél?",
      description: "Hirdess gyorsan, egyszerűen...",
      icon: "tag",
    });

    return items;
  }),

  @action
  onChange(selectedAction) {
    const composerController = getOwner(this).lookup("controller:composer");

    let tags = null;
    let categoryId = this.category ? this.category.id : null;

    if (selectedAction === "new_question") {
      categoryId = "49";
    }

    if (selectedAction === "new_ad") {
      categoryId = "31";
    }

    composerController.open({
      action: Composer.CREATE_TOPIC,
      draftKey: Composer.draft_key || Composer.NEW_TOPIC_KEY,
      categoryId: categoryId,
      tags: tags,
    });
  },
});
