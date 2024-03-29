import { action } from "@ember/object";
import { getOwner } from "discourse-common/lib/get-owner";
import Composer from "discourse/models/composer";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";
import { computed } from "@ember/object";
                                
export default DropdownSelectBoxComponent.extend({
  classNames: ["new-topic-dropdown"],

  selectKitOptions: {
    showFullTitle: false,
    autoFilterable: false,
    filterable: false,
    showCaret: true,
    none: "topic.create",
  },
  
  content: computed(function () {
    
    const hideForNewUser = this.currentUser && this.currentUser.trust_level > 0;
    
    const items = [
      {
        id: "new_question",
        name: "Kérdésed van?",
        description: "Ne habozz, itt mindenki szívesen segít...",
        icon: "question-circle",
      },
    ];
    items.push({
      id: "new_comment",
      name: "Társalgó",
      description: "Dobj fel egy érdekes témát...",
      icon: "comment",
    });
    items.push({
      id: "new_handcheck",
      name: "Handcheck",
      description: "Vapemail? Na, hadd lássuk...",
      icon: "camera",
    });
    if (hideForNewUser) {
      items.push({
        id: "new_ad",
        name: "Hirdetésfeladás",
        description: "Hirdess gyorsan, egyszerűen...",
        icon: "tags",
      });
    }
    items.push({
      id: "new_off",
      name: "OFF-Topik",
      description: "Nem vape téma? Ide jöhet...",
      icon: "power-off",
    });
    return items;
  }),

  @action
  onChange(selectedAction) {
  
    if (selectedAction === "new_question") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 49;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  
    if (selectedAction === "new_comment") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 7;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  
    if (selectedAction === "new_handcheck") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 5;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  
    if (selectedAction === "new_ad") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 31;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  
    if (selectedAction === "new_off") {
      const composerController = getOwner(this).lookup("controller:composer");
      let categoryId = 58;
      
      composerController.open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
        categoryId: categoryId,
      });
    }
  },
});
