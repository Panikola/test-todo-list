<template lang="pug">
  div.form
    div.loading( v-if="loading" ) {{ dataChanged ? "Saving..." : "Loading..." }}
    template(v-if="task")
      label.form-item(ref="title") Title
        input(v-model="task.title")
      label.form-item Description
        textarea(rows="5" v-model="task.description")
      label.form-item Status
        select.select( v-model="task.status")
          option(
            v-for="status in statuses"
            :key="status.id"
            :value="status.id"
            :selected="task.status === status.id"
          ) {{ status.title }}
      label.form-item Created date
        input(readonly="" v-model="task.created_date")
      div.form-footer
        button.button( @click="deleteTask" :disabled="deleting" )
         | {{ deleting ? "Deleting..." : "Delete"}}
</template>

<script>
import { deleteTask, fetchTask, saveTask } from "@/api/tasks";
import statuses from "@/constants/statuses";

export default {
  name: "TaskView",
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      statuses,
      loading: false,
      deleting: false,
      dataChanged: false,
      task: null
    };
  },
  methods: {
    async deleteTask() {
      this.deleting = true;

      try {
        this.dataChanged = false;
        await deleteTask(this.id);
      } catch (e) {
        console.log(e);
      }

      this.deleting = false;
      this.$router.replace({ name: "home" });
    },
    async saveTask() {
      this.loading = true;

      try {
        await saveTask(this.id, this.task);
      } catch (e) {
        console.log(e);
      }

      this.loading = false;
    },
    async fetchTask() {
      this.loading = true;

      try {
        this.task = await fetchTask(this.id);
      } catch (e) {
        console.log(e);
      }

      this.loading = false;
    }
  },
  computed: {
    // для определения изменения вложеных свойства task
    taskTOCompare() {
      return JSON.stringify(this.task);
    }
  },
  watch: {
    // для определения изменения вложеных свойства task
    taskTOCompare(newValue, oldValue) {
      if (oldValue !== "null" && newValue !== oldValue) {
        this.dataChanged = true;
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => await this.fetchTask(),
      { immediate: true }
    );
  },
  async beforeRouteLeave(to, from, next) {
    if (this.dataChanged) {
      if (this.task.title.length) {
        await this.saveTask();
        next();
      } else {
        this.$toasted.show("Title is required");
        this.$refs.title.focus()
      }
    } else {
      next();
    }
  }
};
</script>
<style scoped lang="sass">
@import "../sass/mixins"
.form
  @include page
  .form-item
    @include page-item
    .select
      @include select
  .form-footer
    @include page-footer
  .button
    @include button
    width: 50%
  .loading
    @include page-item
</style>
