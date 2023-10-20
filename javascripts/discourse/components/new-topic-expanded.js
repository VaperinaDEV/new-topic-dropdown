import Component from "@ember/component";
import { action, computed } from "@ember/object";
import { not } from "@ember/object/computed";
import { isPresent } from "@ember/utils";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "discourse-i18n";
import UtilsMixin from "select-kit/mixins/utils";

export default Component.extend(UtilsMixin, {
  classNames: ["new-topic-drop"],
  classNameBindings: ["isExpanded:is-expanded"],
  attributeBindings: ["role"],
  tabIndex: -1,

  isHidden: computed(
    "selectKit.options.{filterable,allowAny,autoFilterable}",
    "content.[]",
    function () {
      return (
        !this.selectKit.options.filterable &&
        !this.selectKit.options.allowAny &&
        !this.selectKit.options.autoFilterable
      );
    }
  ),

  isExpanded: not("isHidden"),

  @action
  onClick() {
    if (this.selectKit.isExpanded) {
      document.body.classList.add("new-topic-dropdown-expandedg");
    } else {
      document.body.classList.remove("new-topic-dropdown-expandedg");
    }
  }
});
