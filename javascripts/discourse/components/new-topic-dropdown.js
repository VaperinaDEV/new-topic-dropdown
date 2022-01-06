import { action } from "@ember/object";
import { getOwner } from "discourse-common/lib/get-owner";
import Composer from "discourse/models/composer";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";
import { computed } from "@ember/object";

export default DropdownSelectBoxComponent.extend({
  classNames: ["new-topic-dropdown"],

  selectKitOptions: {
    icons: ["plus"],
    showFullTitle: false,
    autoFilterable: false,
    filterable: false,
    showCaret: true,
    none: "topic.create",
  },

  content: computed(function () {
    
     const items = [
      {
        id: "new_question",
        name: "Kérdés",
        description: "Hirdess gyorsan, egyszerűen...",
        icon: "question-circle",
      },
    ];

    items.push({
      id: "new_ad",
      name: "Hirdetésfeladás",
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
      categoryId = "2";
    }

    if (selectedAction === "new_ad") {
      categoryId = "Junk";
    }

    composerController.open({
      action: Composer.CREATE_TOPIC,
      draftKey: Composer.DRAFT,
      categoryId: categoryId,
      tags: tags,
    });
  },
});
