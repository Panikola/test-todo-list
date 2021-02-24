<template lang="pug">
  div.create-form
    label.form-item Title
      input(v-model="title")
    label.form-item Description
      textarea(rows="5" v-model="description")
    div.form-footer
      button.button(
        :disabled="!title.length || submitting"
        @click:enter="submit"
        @click="submit"
      ) {{ submitting ? "Creating..." : "Create"}}
</template>

<script>
import { createTask } from "@/api/tasks";
import statuses from "@/constants/statuses";
import { format } from "date-fns";

export default {
  name: "TaskCreate",
  data() {
    return {
      title: "",
      description: "",
      submitting: false
    };
  },
  methods: {
    async submit() {
      this.submitting = true;
      const resp = await createTask({
        title: this.title,
        description: this.description,
        status: statuses.find(status => status.title === "to do").id,
        created_date: format(new Date(), "yyyy-MM-dd HH:mm")
      });
      this.submitting = false;
      if (resp.id) {
        this.$router.replace({ name: "view", params: { id: resp.id } });
      }
    }
  }
};
</script>
<style scoped lang="sass">
@import "../sass/mixins"
.create-form
  @include page
  .form-item
    @include page-item
  .form-footer
    @include page-footer
  .button
    @include button
    width: 50%
</style>
